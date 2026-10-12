Esta es una copia de una conversación de Slack en la que Andrew explica por qué Rosetta no funciona en GPU y qué haría falta para lograrlo:

Steven Lewis [15:14] 
Sé que la razón principal por la que Rosetta no está en GPU es que nuestros algoritmos se traducen pésimamente a los requisitos de las GPU y que llevaría muchísimo trabajo adaptarlos.  ¿Alguien ha escrito alguna vez una explicación extensa de esto?  En particular, con detalles sobre los algoritmos problemáticos.  Etiqueto a @aleaverfay, que probablemente lo sabe, y a @weitzner, que puede preguntarle a Luki (que parece no estar en slack)


Andrew Leaver-Fay [09:28] 
@steven_lewis creo que la explicación extensa empieza con un gran suspiro


[09:30] 
Bien, las GPU. No admiten funciones virtuales (no pueden admitirlas), porque necesitan conocer en tiempo de compilación los requisitos de recursos de cada kernel que van a ejecutar. Así que el proceso de puntuar un Pose con nuestra función de puntuación actual presenta este dilema:


[09:31] 
¿Puntúas un término a la vez, de modo que cada término pueda lanzar su propio kernel, PERO cada término va a cargar los mismos datos de coordenadas de residuos en el almacenamiento local del hilo desde la memoria global (con un retraso de 100 ciclos por carga)


[09:35] 
o cargas una sola vez los datos del par de residuos en el almacenamiento local del hilo y luego evalúas todos los términos para ese par de residuos, PERO entonces este único kernel incluye ahora todos los términos de Rosetta (o una fracción grande de ellos) y tiene una comprobación «if» antes de cada término para asegurarse de que está activo, y este kernel monolítico es lo más distinto de la programación orientada a objetos que se puede ser, y no está claro qué datos necesitas cargar en el almacenamiento local del hilo al principio, porque no todos los términos necesitan los mismos datos?


[09:37] 
Ahora bien, toda la evaluación de puntuaciones y derivadas y el replegamiento del árbol de átomos tienen que ocurrir en la GPU. Podría ser posible seguir ejecutando la minimización en la CPU, haciendo que la GPU devuelva el vector gradiente en el espacio de torsiones y las puntuaciones.

[09:38] 
Pero ninguna de las puntuaciones se puede evaluar en la CPU: todos los términos que quieras evaluar tienen que vivir en la GPU, porque comunicar de ida y vuelta entre las dos es demasiado caro


[09:38] 
Hablemos ahora de las restricciones:


[09:38] 
las restricciones en Rosetta son maravillosamente flexibles.


[09:38] 
Tienes la clase virtual Constraint y la clase virtual Func


[09:38] 
y puedes combinar cualquier par

[09:39] 
eso se vuelve imposiblemente complicado en la GPU, donde quizá tendrías que intentar evaluar cada par N x M de N clases Constraint y M clases Func para cada par de residuos, haya o no restricciones sobre él.


[09:40] 
Así que, básicamente, el problema de «por dónde empezar siquiera» es bastante intimidante


[09:40] 
Hablemos ahora del mantenimiento del código


[09:40] 
todo en la GPU es feo. Feo al estilo Fortran.


[09:41] 
Tus funciones tienen 30 argumentos y todos son arreglos

Andrew Leaver-Fay [09:42] 
Y tenemos que asegurarnos de que la versión de la GPU coincida exactamente con la versión de la CPU


[09:42] 
así que cada vez que alguien edite la versión de la CPU, también tendrá que editar la versión de la GPU


[09:43] 
y eso significa docenas de desarrolladores metiendo mano en el funcionamiento interno de código increíblemente sensible, un código en el que alterar la disposición exacta de cualquier objeto puede producir una enorme ralentización


[09:45] 
Ahora bien, quizá estoy siendo demasiado pesimista


[09:47] 
Quizá un estudiante de posgrado joven y entusiasta, con suficiente paciencia (más de la que tengo yo, digamos), podría sentarse y resolver la evaluación de la función de puntuación en la GPU si es su proyecto principal (a menudo me veo tirado de un lado a otro por distintos proyectos que me impiden dedicarme al 100% a un proyecto de GPU)


[09:47] 
Lo que me desconcierta es que he trabajado con muchos estudiantes de posgrado e investigadores así y todos y cada uno de ellos se rindió sin haber logrado hacer funcionar un solo término en la GPU.

(Y podría quejarme un poco de que invertí mucho tiempo en intentar formar a estos estudiantes de posgrado sobre cómo funciona Rosetta, y esa inversión de tiempo no dio ningún fruto)

_____

Adiciones de Luki:



* Las GPU son mejores con kernels pequeños y simples. Un kernel básicamente reemplaza un
bloque de código con un par de bucles anidados y los ejecuta en paralelo.
Esto funciona mejor si hay más de 10K puntos de datos (iteraciones del bucle exterior)
y todo el kernel tarda unos 50-500 ms en ejecutarse, no 1 ms ni
10 segundos. Con tiempos de ejecución demasiado cortos, la sobrecarga de transferencia de datos
anulará cualquier ganancia de rendimiento (sobre todo por la latencia). Los kernels de larga duración
suelen implicar más código, y eso es difícil de depurar y optimizar.

* Usa las bibliotecas de aceleración de GPU ya disponibles (FFT, BLAS, RAND,
SOLVER...) cuando corresponda. El fabricante hizo el trabajo duro de optimizar
las rutinas, y conoce su hardware y sus limitaciones mejor
que tú.

* Si intentas hacer cosas más complicadas en la GPU por tu cuenta,
probablemente lo estás haciendo mal. Es mi opinión. El código se vuelve difícil de
mantener y optimizar.

* Por eso, personalmente creo que no necesitamos compatibilidad con funciones
virtuales ni con todas las cosas sofisticadas de C++ en la GPU. Es demasiado complicado.
Realmente necesitas código simple que trabaje con arreglos simples, y no con listas
enlazadas, etc.

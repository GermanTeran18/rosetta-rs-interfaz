#Datos globales en Rosetta
###¿Qué son los datos globales?

Los datos globales son datos visibles para todas las partes del programa o, entendido en sentido más amplio, datos de los que existe una sola copia para todo el programa.

###¿Qué cuenta como dato global?

* Los datos declarados en el ámbito de un espacio de nombres, ya sea con la palabra clave "static", con "extern" o sin ninguna de las dos. 
Si está en el ámbito de un espacio de nombres, es un dato global.

* Los datos declarados como "static" en el ámbito de una función.

* Los datos declarados como "static" en el ámbito de una clase.

###¿Qué tienen de malo los datos globales?

El problema de los datos globales es que solo existe una copia por programa.  En un programa multihilo, si dos hilos intentan interactuar con los datos al mismo tiempo, podrían hacer que el programa se caiga o generar un resultado incorrecto.  Cuando dos hilos interactúan con los mismos datos al mismo tiempo, esto se conoce como *condición de carrera.*  La mejor manera de evitar las condiciones de carrera es evitar los datos globales.

###¿Cuándo es aceptable usar datos globales?

Para los Tracers, siempre que se declaren "static thread_local".  (NOTA: si vas a escribir en un Tracer con cierta regularidad -- es decir, más de una vez por segundo -- debes comprobar siempre que el Tracer esté visible antes de enviarle salida).

Para los singletons, siempre que:
1. haya un único puntero estático privado a sí mismo y, aparte de los mutex, ningún otro dato estático,

2. la clase sea constante a nivel de bits (bitwise const) una vez inicializada, o bien, como el ScoringManager, o como el ChemicalManager, gestione un comportamiento tipo singleton para otras clases, pero esas clases sean constantes a nivel de bits tras su inicialización.  (Lamentablemente esto no se cumple actualmente para el ChemicalManager, ya que modificamos ResidueTypeSets existentes después de construirlos).

Para los mutex.  Los mutex sirven para controlar el acceso a datos globales como los singletons, de modo que todas las interacciones con mutex son seguras para hilos.

###¿Cuándo debo usar la palabra clave "static"?

Para datos, solo al declarar tracers, singletons o mutex; nada más es aceptable.  No declares datos estáticos dentro de una función.  No implementes singletons poniendo un puntero estático a la instancia dentro de una función.  En su lugar, los singletons deben derivar de la clase utility::SingletonBase.  Más información sobre los singletons más abajo.

Hay casos raros en los que podrías querer declarar algo como "static thread_local", pero no asumas que la solución a tu problema es esa.  Habla conmigo antes de recurrir a esa solución.

Las funciones estáticas son distintas de los datos estáticos y casi siempre son aceptables.  Las funciones estáticas pueden interactuar con los datos estáticos de una clase, pero mientras no haya datos estáticos en la clase, no hay peligro.  Quizá te preocupe que un dato declarado en el ámbito de una función dentro de una función estática sea un dato global; no lo es. Un dato declarado dentro de una función estática no es un dato estático.  Por ejemplo:
```
 class MyClass {
    static void some_static_function() {
       int myint = 0; /*perfectly safe*/
       ...
    }
 };
```
el entero ''myint'' puede vivir dentro de una función estática, pero él mismo no es una variable estática: cada invocación de some_static_function asignará una instancia distinta de myint.

###¿Qué son los singletons y cómo se deben declarar?

Los [[Singletons]] son clases de las que solo debe haber una instancia por programa.  Se accede a ellos mediante una función estática, "get_instance", que devuelve acceso a la única instancia.  El patrón de diseño singleton resuelve varios problemas habituales de los datos globales -- en particular, el "static initialization order fiasco" y la necesidad de asegurar que los datos globales se inicialicen una sola vez -- y por eso se usa con frecuencia.

Los singletons suelen implementarse con las cuatro características siguientes:
* un puntero estático privado a la clase, que suele llamarse "instance_"
* una función pública estática get_instance() que devuelve el puntero instance_ una vez construida la instancia
* un constructor por defecto privado (nadie salvo la propia clase puede construir una instancia de la clase)
* un constructor de copia y operadores de asignación privados y sin implementar (nadie, ni siquiera la propia clase, debe copiar la clase)

Aparte del puntero a la instancia, ningún otro dato de la clase singleton debe ser estático.

Los singletons de Rosetta deben derivar de la clase utility::SingletonBase mediante el patrón de diseño "CRTP".  Es decir, la clase X debe declararse así:
```
 class X : public utility::SingletonBase< X >
 {
   ...
 };
```
de modo que derive de una clase que es una plantilla de sí misma.  La clase base declarará la función get_instance() y el miembro de datos instance_. 

La clase X debe definir una función estática privada
```
 static
 X *
 create_singleton_instance();
```
que no recibe parámetros y devuelve un puntero a una X.  La función get_instance() de SingletonBase la invocará; la función de la clase base garantiza que la clase se construya de forma segura para hilos.
Para que la clase base pueda invocar esta función, debe declararse como friend de la clase derivada.
```
 class X : public utility::SingletonBase< X > {
 public:
    friend class utility::SingletonBase< X >;
 private:
    static X * create_singleton_instance();
 };
```

La clase SingletonBase declara el constructor de copia y el operador de asignación como eliminados (deleted), por lo que deberían quedar eliminados automáticamente de tu clase singleton derivada. 
(Obtendrás un error si intentas definir el operador de asignación o si defines correctamente el constructor de copia. Quizá puedas definir un constructor de copia de forma incorrecta, pero NO lo hagas.)

###¿Puedo cambiar o reiniciar un singleton después de construido, por ejemplo cuando termina un trabajo y antes de que empiece el siguiente, o en respuesta a algún evento que ocurre mientras se ejecuta un trabajo?

No. Eso impediría que dos trabajos interactúen con el singleton al mismo tiempo.  Si un trabajo reiniciara el singleton mientras un segundo trabajo intenta usar sus datos, el segundo trabajo se caería.

###¿Y si tengo un problema y la única solución son los datos globales?

Habla primero conmigo (Andrew Leaver-Fay).  Casi seguro que hay otra forma de resolverlo.

###¿Y si hay datos grandes, costosos de cargar o de almacenar, que necesito cargar para cada trabajo pero que más de un trabajo puede aprovechar, por ejemplo los fragmentos?

Entonces podrías usar el [[ResourceManager]] para gestionar la creación de esos datos.  NOTA: el ResourceManager no te permitirá cambiar los datos una vez creados, porque si dos trabajos en dos hilos intentan usar esos datos, es muy probable que quieran cambiarlos de formas distintas, o que intenten cambiarlos al mismo tiempo y los corrompan.  Si necesitas cambiar datos durante la ejecución, cada trabajo tendrá que cargarlos por su cuenta.

Si usas [[RosettaScripts]] y quieres cargar datos no constantes por trabajo, puedes añadir nuevos "DataLoaders" para cargar esos datos en el DataMap.  Por ejemplo, el ScoreFunctionLoader carga objetos ScoreFunction en el DataMap.


##Véase también

* [[Coding Conventions]]: Más información sobre las mejores prácticas de programación en Rosetta
* [[Singletons]]: Pautas para usar clases singleton en Rosetta
* [[Common Errors]]: Errores que encuentran con frecuencia los desarrolladores de Rosetta

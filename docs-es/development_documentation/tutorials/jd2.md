#Nuevo README del distribuidor de trabajos

Autor: Steven Lewis

última actualización: 31/8/10

-   autor (del README): Steven Lewis (smlewi@gmail.com)
-   autores (del código): Steven Lewis, Andrew Leaver-Fay
-   autores de la E/S de SilentFile: James Thompson, Oliver Lange
-   autor de las clases concretas del Parser: Sarel Fleishman
-   autores de los distribuidores de trabajos MPI: Doug Renfrew, Oliver Lange

¿Estoy usando jd2?
===============

Abre el código del ejecutable y busca las letras "jd2". Si aparecen, probablemente estás usando jd2 y esta documentación se aplica a tu caso. Si encuentras protocols::jobdist en su lugar, es probable que esta documentación no se aplique.

¿Qué trabajo debe hacerse? Gestor singleton y JobDistributor polimórfico
==========================================================================

A) Este distribuidor de trabajos (JD) está pensado para determinar automáticamente, a partir de las opciones de compilación y de ejecución, qué tipo de trabajo hay que hacer, e instanciar un distribuidor de trabajos capaz de hacerlo. El JD es un objeto singleton, lo que significa que (en ejecuciones de un solo procesador) se creará como máximo un objeto JD. Los entornos con varios procesadores siguen usando un patrón singleton, con algunas salvedades sobre la seguridad entre hilos. MPI pone un JD en cada procesador, con comunicación entre ellos.

Una clase JobDistributorFactory es responsable de determinar qué JD debe existir y de crearlo en la primera solicitud (mediante la interfaz singleton) del JD. Por eso JobDistributorFactory.cc contiene la lógica que determina qué clase JobDistributor se instancia realmente en cada ejecución de un ejecutable. Es un código fácil de leer y, por definición, está actualizado, mientras que este documento podría no estarlo (¡así que consúltalo si estas instrucciones fallan!).

Una clase concreta es FileSystemJobDistributor, que distribuye los trabajos a un solo procesador. Puede coordinar ejecutables independientes marcando en el sistema de archivos los trabajos en curso. Este distribuidor es compatible con ejecutar trabajos distintos en directorios distintos, o con muchas instancias de una misma línea de comandos (nstruct grande) en el mismo directorio, con la opción -run::multiple\_processes\_writing\_to\_one\_directory. Es el distribuidor básico y por defecto.

Existe ShuffleJobDistributor; este autor no está seguro de su propósito. Creo que sirve para aleatorizar el orden de ejecución de los trabajos, algo útil para su clase hija BOINCJobDistributor. BOINC se usa en el proyecto Rosetta; configurar BOINC para que use este distribuidor queda fuera del alcance de esta documentación.

Distribuidores de trabajos MPI
====================

1) Este es MPI solo de nombre. Se activa con jd2::mpi\_work\_partition\_job\_distributor. Aquí, cada procesador examina la lista de trabajos y determina cuáles son suyos según cuántos procesadores más hay (en otras palabras, divide el número de trabajos entre el número de procesadores; cada procesador hace esa cantidad). Sus archivos contienen un ejemplo. Este JD tiene el mayor potencial de eficiencia con MPI, pero no sirve para trabajos grandes, porque tienes que equilibrar la carga tú mismo configurándolo de modo que (njobs % nprocs) sea cero o esté cerca de nprocs. Se recomienda solo para trabajos pequeños o con tiempos de ejecución muy controlados. Yo lo uso para generar un número pequeño de trayectorias (100 trabajos en 100 procesadores) con el fin de decidir dónde colocar mis filtros, y luego ejecuto los trabajos grandes con el siguiente JD.

2) MPIWorkPoolJobDistributor: es el predeterminado en modo MPI. Aquí, un nodo no hace trabajo de Rosetta y en su lugar controla a todos los demás nodos. Los demás nodos piden trabajos al nodo principal, los hacen, informan y reciben uno nuevo hasta que se terminan todos los trabajos. Si solo tienes un procesador, tendrás únicamente un nodo principal y no se hará ningún trabajo: ¡asegúrate de usar MPI correctamente! Este tiene salida "bloqueante": solo un trabajo puede escribir en disco a la vez, para evitar que los silent files se corrompan. Es una buena opción si el tiempo de ejecución de cada trabajo individual es relativamente largo, de modo que la salida ocurra de forma esporádica (porque entonces el bloqueo no importa). Si tus trabajos son muy cortos y escriben a disco con frecuencia, o tienes un número enorme de procesadores que escriben a menudo solo por ser tantos, este distribuidor de trabajos será ineficiente. Al momento de escribir esto, es el distribuidor de trabajos preferido cuando se escriben archivos PDB.

3) MPIFileBufJobDistributor: es el otro predeterminado para MPI. Asigna dos nodos a tareas que no son de Rosetta: un nodo principal como antes y un nodo dedicado a gestionar la salida. No es bloqueante, así que es la mejor opción si los trabajos terminan con frecuencia en relación con lo que tardan las escrituras en el sistema de archivos (trabajos cortos, un número enorme de procesadores o ambos). Por ahora solo funciona con salida en silent files. Es la mejor opción si tienes trabajos cortos o muchos (miles de) procesadores. (Piensa en ab initio).

4) Hay otro llamado MPIArchiveJobDistributor; quizá Oliver añada documentación sobre él.

Batching: ¡existe! No sé cómo usarlo. Quizá Oliver añada documentación sobre él.

¿Qué tipo de E/S? ¿Cómo se separa del JobDistributor?
==============================================================

B) Queremos muchos tipos de E/S en Rosetta. Para evitar un problema combinatorio entre los JobDistributors y la E/S, la E/S se gestiona en dos clases: JobInputter y JobOutputter. El JobDistributor mantiene OP a una de cada una de estas clases, y todas las clases JobInputter/Outputter deberían ser (idealmente) compatibles con cualquier JobDistributor.

El JobInputter es responsable de determinar qué trabajos pueden existir y de crear Poses a partir de objetos Job. La clase más simple es PDBJobInputter, que gestiona PDB o PDB comprimidos con gzip desde el disco. Determina qué trabajos deberían existir a partir de -s/-l y -nstruct. Existen otros JobInputters: uno basado en silent files y otro que no tiene estructuras iniciales para ab initio. (También existe threading; no sé qué hace.)

El JobOutputter es responsable de escribir los resultados de los trabajos. Esta clase se comunica tanto con el JobDistributor como con los protocolos reales. Sus tres responsabilidades son A) determinar el nombre de un trabajo y/o dónde se almacenan sus resultados, B) saber si el trabajo ya tiene datos completados almacenados (de una ejecución anterior o de otra ejecución simultánea) y por tanto no debe reintentarse, y C) gestionar el almacenamiento de los resultados de los protocolos completados (Poses y otros datos).

Las clases JobOutputter escribirán Poses con puntuación y archivos de puntuación como quieras. Sin embargo, estas clases NO conocen ni les importan las funciones de puntuación: imprimen las energías basándose solo en lo que está almacenado en el Pose (es decir, el objeto Energies). TU MOVER es responsable de preparar estos repositorios de puntuaciones. Las puntuaciones almacenadas en el objeto Energies (lo que se haya puesto ahí la última vez que se puntuó el Pose) pueden imprimirse. Se pueden imprimir puntuaciones y datos adicionales mediante el objeto Job (véase más abajo).

¿Qué hay en un Job?
================

C) Los Jobs tienen tres capas. Una capa es el Pose inicial, la siguiente es nstruct y la última son los datos de salida relevantes para el trabajo. Las primeras capas contienen dos datos: uno es toda la información necesaria para crear un Pose e iniciar un protocolo; el otro es qué índice de nstruct es el trabajo. Para evitar duplicar masivamente el primero (que es costoso), hay dos capas. Los objetos Job contienen un índice de nstruct y un puntero a un InnerJob; el InnerJob contiene la información más pesada. InnerJob tiene un PoseCOP, una cadena de entrada que indica dónde buscar un PDB, un silent file, etc., y el nstruct máximo de ese InnerJob. Esto puede haber cambiado un poco; en algunos casos el JobInputter conserva el PoseCOP en lugar del InnerJob.

La tercera capa son los datos de salida. Estos "datos accesorios" son información adicional que quieres volcar al final del PDB, como en Rosetta++. Todo lo que cargues en el Job se adjuntará de algún modo al Pose final (en el silent file, el PDB, el archivo de puntuación, etc.). Si estás imprimiendo Poses intermedios, también tendrán estos datos adjuntos; puedes cambiarlo creando un objeto Job temporal para el Pose intermedio (el JobDistributor lo ignorará, es un objeto local), rellenándolo y entregándolo al JobOutputter (véase el ejemplo en jd2test.cc). Las funciones para añadir datos adicionales son Job-\>add\_string(), add\_string\_string\_pair y add\_string\_real\_pair().

¿Qué puedo distribuir?
======================

D) Puedes trabajar con las clases hijas de la clase Mover normal. Los dos cambios significativos en Mover son A) una operación especial parecida a una copia, llamada fresh\_instance(), que permite al JD recrear el mover desde cero para cada trabajo si se desea, junto con algunas funciones que devuelven un bool indicando si eso es deseable, y B) una función de estado que devuelve un tipo enumerado que indica el éxito o el fallo del último apply() (MoverStatus). Cualquier Mover funcionará sin modificaciones, pero tendrás que añadir código para aprovechar todas las funciones.

¿Qué hay de nuevo?
===========

E) El nuevo marco de trabajo permite dos novedades importantes, además de otras que no están documentadas aquí o que solo son medio nuevas: a) los protocolos pueden escribir Poses e información etiquetados con el identificador del Job a mitad del protocolo. Esto significa que puedes obtener myjob\_0001.pdb al final, más centroid\_myjob\_0001.pdb al final de la fase centroid de tu protocolo. Activa estas funciones mediante JobOutputter-\>other\_pose().

b) Los Movers pueden filtrar automáticamente sus resultados y decirle al distribuidor de trabajos: "bueno, esta ejecución fue un desperdicio; no incrementes el contador de trabajos e inténtalo de nuevo". Activa el filtrado mediante la función set\_last\_move\_status de la clase Mover; debe establecerse en el Mover más externo, el que el distribuidor de trabajos ejecuta directamente.

Uso
===

F) Usa apps/pilot/JD2/jd2test.cc, una aplicación que usa el nuevo JD; básicamente es un apaño que emplea SidechainMover y PackRotamersMover y demuestra algunas de las funciones nuevas. También sirve como prueba de integración que garantiza el funcionamiento correcto. apps/public/scenarios/FloppyTail.cc se construyó desde cero pensando en el nuevo distribuidor de trabajos y usa algunas de sus funciones avanzadas.

Parser
======

G) Se ha incluido una interfaz para una clase Parser. El Parser toma archivos XML y crea tu mover en tiempo de ejecución a partir de las instrucciones de ese archivo. Consulta la [[Guía del desarrollador de RosettaScripts|RosettaScripts Developer Guide]] para más información.

Salida EMPTY\_JOB\_use\_jd2
====================

H)  ¿Qué ocurrirá si un mover intenta consultar al distribuidor de trabajos, pero en realidad no se está ejecutando dentro de la función `go` del distribuidor de trabajos? Esto puede pasar si estás depurando código, o quizá si has tomado prestado el mover de otra persona sin examinarlo con atención. El estado inicial del JobDistributor contiene un objeto Job ficticio; el JobDistributor se comportará como si todos los trabajos fueran ese objeto. Si obtienes una salida etiquetada como EMPTY\_JOB\_use\_jd2, de aquí viene.

Quiero entradas adicionales por trayectoria (dos Poses por nstruct, etc.)
==============================================================

I) Mucha gente ha preguntado cómo pasar datos de entrada adicionales arbitrarios por cada trayectoria: un resfile nuevo con cada Pose de entrada, o fragmentos distintos, o dos Poses como entrada, o lo que sea.

La interfaz de Mover permite una y solo una entrada por trayectoria: un Pose inicial. Esta es una limitación de la interfaz de Mover. Alterar otros datos por trayectoria requiere usar funciones de Mover que no son de la clase base (y por tanto es algo que JD2 no puede hacer).

La solución alternativa es crear una subclase de JobInputter. Uno de los principales propósitos de su modularidad orientada a objetos es facilitar la creación de subclases. Crea una subclase de JobInputter llamada my\_special\_protocol\_JobInputter y haz que organice tus datos adicionales.

¿Dónde van los datos adicionales? Un lugar sería el propio Pose, en el DataCache. Otra opción sería crear también una subclase del objeto Job y ponerlos ahí. En ambos casos tendrás que hacer conversiones de puntero para extraer los datos.

Como alternativa, el [[ResourceManager]] funciona con JD2 para facilitar el acceso a recursos de datos adicionales desde dentro de un protocolo. En RosettaScripts, consulta la documentación del [[MultiplePoseMover]].

##Véase también

* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: la página de inicio de la documentación de desarrollo
* [[Rosetta tests]]: enlaces a páginas sobre cómo ejecutar y escribir pruebas en Rosetta
* [[Rosetta overview]]: visión general de los conceptos principales de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos adicionales de Rosetta.
* [[Glossary]]: define los términos clave de Rosetta

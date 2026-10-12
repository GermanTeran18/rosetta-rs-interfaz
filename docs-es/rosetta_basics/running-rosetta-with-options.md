#Cómo ejecutar Rosetta

[[_TOC_]]

## Referencias iniciales

Puede que te interese leer [[Getting Started]]. 
Encontrarás más recomendaciones similares al final de esta página, en la sección Véase también.

Leaver-Fay, A., et al., ROSETTA3: an object-oriented software suite for the simulation and design of macromolecules. Methods in enzymology, 2011. 487: p. 545.

Kaufmann, K.W., et al., Practically useful: what the Rosetta protein modeling
suite can do for you. Biochemistry, 2010. 49(14): p. 2987-98.

##Servidores 
Existen muchos servidores para ejecutar diversos protocolos de Rosetta. Puedes encontrar descripciones de estos
servidores en la página [[Rosetta Servers]].

* [ROSIE](http://rosie.rosettacommons.org)
* [Robetta](http://robetta.bakerlab.org)

##Ejemplo de línea de comandos
Las aplicaciones de Rosetta (incluido RosettaScripts) se ejecutan normalmente desde una ventana de terminal. La línea de comandos consta de dos partes principales. Primero, se necesita la ruta a un ejecutable de la aplicación; la segunda parte es una lista de opciones para la simulación concreta de Rosetta. Por ejemplo:

```
path_to/some_rosetta_app.linuxgccrelease -database path/to/rosetta/Rosetta/main/database other\_flags
```

Para ver algunos ejemplos, consulta la página [[commands collection]].

##Ubicación de los ejecutables de Rosetta
Después de [[compilar | build_documentation/Build-Documentation ]] Rosetta, los enlaces a los ejecutables binarios se copian en el directorio Rosetta/main/source/bin. (Es el directorio bin/ dentro del directorio donde compilaste el código.) Al ejecutar Rosetta hay que indicar las **rutas completas** a estos ejecutables, _a menos que_ este directorio se añada a la variable **PATH** en el perfil de tu shell (~/.bashrc (linux), ~/.bash_profile (mac), etc.). <code> export PATH=$PATH:/path/to/rosetta/bin </code>


##[[Base de datos de Rosetta|database]]
La base de datos de Rosetta contiene archivos de datos importantes que Rosetta usa durante las ejecuciones (por ejemplo, las definiciones de qué átomos tiene la alanina, las cargas atómicas, los radios de Lennard-Jones, los archivos de pesos de la función de puntuación, las longitudes y ángulos de enlace ideales, las bibliotecas de rotámeros, etc.).  Rosetta debe conocer de algún modo la ruta a este directorio. 

### Detección automática de la ruta de la base de datos

Si tienes los directorios del código y de la base de datos de Rosetta dispuestos de la forma estándar (p. ej., main/source/bin/ y main/database/), Rosetta a menudo puede determinar automáticamente dónde debería estar el directorio de la base de datos. Si esto no te funciona, o si reubicas o creas enlaces simbólicos de los ejecutables o de la base de datos, puede que tengas que establecer la base de datos explícitamente, como se describe más abajo. Establecer explícitamente la ruta de la base de datos en la línea de comandos o con una variable de entorno tiene prioridad sobre la ruta detectada automáticamente.

### Cómo establecer la base de datos para una _única_ ejecución de Rosetta

Si usas una compilación antigua de Rosetta y la variable de entorno ROSETTA3_DB no está definida (o tu base de datos se ha movido de la ubicación relativa de instalación típica), debes especificar la ruta a este directorio de la base de datos en la línea de comandos para ejecutar simulaciones de Rosetta. Por ejemplo: 
* <code>rosetta.linuxgccrelease -database path/to/rosetta/main/database other\_flags</code>

Como con todas las opciones de Rosetta, esto también se puede proporcionar con un archivo de opciones.

### Cómo establecer la base de datos para _varias_ ejecuciones de Rosetta

Rosetta comprobará automáticamente la variable de entorno <code>$ROSETTA3_DB</code>.  Si está presente, no hace falta establecer la opción <code>-database</code>. Para definirla temporalmente en tu sesión de shell: 

* <code>ROSETTA3_DB=path_to_rosetta_db</code>

Define la variable en el archivo de configuración de usuario de tu shell (que se ejecuta cada vez que abres una terminal), como <code>$HOME/.bashrc</code> en linux y <code>$HOME/.bash_profile</code> en mac para el shell bash predeterminado.  Asegúrate de cargar este archivo con source <code> $HOME/.bashrc </code> o abre una pestaña nueva para que la variable quede definida.  

Si la opción -database está presente en la línea de comandos o en un archivo de opciones, el valor especificado allí anulará cualquier valor de la variable de entorno ROSETTA3_DB.

#Cómo especificar opciones

##En la línea de comandos
```
fixbb.macgccrelease -in:file:s myinput.pdb -database mypath
```

Las opciones y sus argumentos se separan con espacios en blanco. Se usan dos puntos simples o dobles para precisar las opciones mediante OptionGroups cuando hay varias opciones distintas con el mismo nombre. Puede que hagan falta varios niveles de dos puntos.


##En la línea de comandos mediante un archivo de opciones

Las opciones también se pueden escribir en un archivo de opciones (también llamado archivo de flags). En este archivo, pon una opción en cada línea, usando igualmente los dos puntos simples o dobles para especificar los niveles. A continuación se muestra un ejemplo de archivo de opciones.

```
 -database /home/yiliu/Programing/branches/Rosetta/main/database
 -in:file:s 1l2y_centroid.pdb
 -in:centroid_input
 -score:weights centroid_des.wts

```

Si este archivo se llamara «flags», se usaría así (fíjate en el símbolo @): <code> fixbb.macgccrelease @ flags </code>

Ten en cuenta que se pueden seguir estableciendo otras opciones antes o después de especificar el archivo de opciones, y que se pueden usar VARIOS archivos de opciones, por ejemplo <code> @ flags1 @ flags2 @ flags3 </code>.  Esto combinará esencialmente flags1 a flags3, anulando cada vez las opciones establecidas en el archivo anterior.  Para establecer varios archivos de opciones en una ejecución por _lotes_, consulta la opción <code> -run:batches </code> descrita en las opciones de ejecución.

Opciones comunes y configuración de usuario predeterminada
=============================================
Desde marzo de 2018, Rosetta se puede ejecutar con un archivo de configuración de usuario. 
Este archivo es básicamente un archivo de opciones que se carga al inicio de cada ejecución de Rosetta. 
Para empezar, ve a tu directorio personal y crea un directorio que contendrá cualquier configuración de Rosetta. 
`mkdir .rosetta && mkdir .rosetta/flags`

Rosetta buscará ahora en ese directorio cada vez que se ejecute. Si se encuentra un archivo llamado `common` en `$HOME/.rosetta/flags`, o si está(n) en el directorio de trabajo actual, usamos ese en su lugar. Puedes establecer cualquier número de configuraciones de opciones con la opción `-fconfig`. Por defecto (no necesitas pasarla), tenemos:
```
   -fconfig common
```

 Esta opción `-fconfig` también es útil si tienes un conjunto de opciones para distintos fines (como diseño, glicanos y anticuerpos), así que podrías hacer algo como:

```
  -fconfig common antibody 
```

 Eso cargaría las configuraciones common y antibody (que, de nuevo, son archivos de opciones en `.rosetta/flags`)


 Si tienes un archivo de opciones common que quieres ignorar en una ejecución concreta, puedes omitir su carga con una opción
```
  -no_fconfig  
```

Por último, las opciones que se cargan de estos archivos se escriben en el registro de Rosetta al iniciar.

Ejecución de Rosetta con varios hilos <a name="multithreading" />
========================
Históricamente, cada instancia de Rosetta aprovechaba un único núcleo de procesador.  El muestreo en paralelo se lograba normalmente lanzando muchos procesos independientes de Rosetta.  Esto permitía realizar trabajos separados simultáneamente, pero hay muchas circunstancias en las que se puede querer completar un _único_ trabajo de Rosetta _más rápido_ usando varios núcleos.  Recientemente (desde el 5 de noviembre de 2019) se ha añadido a Rosetta compatibilidad con multihilo.  La mayoría de los módulos de Rosetta aún no admiten multihilo, pero algunos algoritmos centrales se han paralelizado.  Para aprovechar el multihilo, es importante tener en cuenta lo siguiente:

1.  Rosetta debe compilarse con la opción `extras=cxx11thread` añadida al comando `scons`.  Esto producirá ejecutables de Rosetta llamados <app name>.cxx11thread.<operating system><compiler><release/debug>.

2.  Las aplicaciones de Rosetta compiladas con compatibilidad de hilos lanzarán por defecto un hilo.  Para lanzar más, hay que especificar el número deseado con la opción `-multithreading:total_threads #`.  Un valor de 0 lanzará un hilo por cada núcleo (o hilo de hardware, en nodos con hyper-threading) disponible en un nodo.  En portátiles y ordenadores personales en los que solo se ejecuta una instancia de Rosetta, esto suele ser lo ideal.  Ten en cuenta que en nodos grandes con muchos núcleos, puede que prefieras lanzar muchos procesos de Rosetta, cada uno de los cuales lance un número pequeño de hilos; por ejemplo, podrías lanzar 16 procesos de Rosetta con 4 hilos cada uno en un nodo de 64 núcleos.    (Ten en cuenta que si el multihilo se usa junto con el paralelismo a nivel de proceso de MPI, la opción `-multithreading:total_threads` limita el número de hilos lanzados _por proceso_).

4.  Los módulos individuales de Rosetta que admiten multihilo intentarán por defecto usar todos los hilos disponibles por orden de llegada.  Por ejemplo, supongamos que el módulo A llama al módulo B, y ambos intentan usar hilos.  Supongamos también que hay 16 hilos en total.  El módulo A solicitará por defecto que su trabajo se reparta entre los 16 hilos, cada uno de los cuales puede invocar al módulo B.  El módulo B también solicitará que su trabajo se reparta entre hilos, pero no encontrará hilos libres y, por tanto, tendrá que realizar su trabajo en el hilo que lo llama.  Como a los módulos «internos» se les da menor prioridad que a los «externos», un usuario puede limitar manualmente el número de hilos que solicita un módulo con las opciones de línea de comandos, las opciones de RosettaScripts o las opciones de PyRosetta apropiadas (véase más abajo).  En el ejemplo anterior, se podría restringir el módulo A a 4 hilos y el módulo B a 4 hilos.  En ese caso, cada uno de los 4 hilos asignados al módulo A puede invocar al módulo B, y a cada una de las 4 invocaciones del módulo B se le pueden asignar 4 hilos (16 en total).  Ten en cuenta que a un módulo siempre se le asigna al menos un hilo (el hilo que lo solicita) y, como máximo, el menor entre el número total de hilos y el número solicitado.

5.  Actualmente, los siguientes módulos y tareas son multihilo.  El número de hilos que pueden solicitar se puede controlar como se describe en la siguiente tabla:

| Módulo | Tarea | Control por línea de comandos | Control en RosettaScripts | Control en PyRosetta |
| ------ | ---- | ------------------- | ---------------------- | ----------------- |
| Packer | Precálculo del grafo de interacción. | -multithreading:interaction_graph_threads <number> | operación de tarea [[RestrictInteractionGraphThreadsOperation]] | operación de tarea [[RestrictInteractionGraphThreadsOperation]] |

Si eres desarrollador, consulta la página sobre el [[RosettaThreadManager]] para ver información sobre cómo hacer multihilo tu módulo favorito de Rosetta.

## Problemas conocidos del multihilo

- La función de puntuación `score12` actualmente no es segura para hilos (threadsafe).  En algún momento corregiremos el término de puntuación que esté causando problemas.

Ejecución de Rosetta mediante MPI <a name="mpi" />
========================
Mientras que los hilos son un medio útil de paralelizar la ejecución de bloques de código que implican muchas tareas pequeñas que comparten memoria, en un número limitado de núcleos de un solo nodo, la comunicación cruzada a nivel de proceso también puede ser útil para el paralelismo a nivel de trabajo.  La mayoría de las aplicaciones de Rosetta admiten el paralelismo a nivel de trabajo mediante MPI (Message Passing Interface).  MPI permite que muchos procesos se comuniquen entre sí pasándose mensajes.  Esto es ventajoso frente a procesos totalmente independientes, ya que permite el equilibrado de carga (los procesos que terminan antes su trabajo pueden hacer el trabajo que de otro modo esperaría en la cola de un proceso más lento) y, en algunos casos, la reducción y el análisis de datos antes de la salida (véase, por ejemplo, la aplicación [[simple_cycpep_predict]]).  Si los ejecutables MPI de Rosetta se compilaron (por ejemplo, con la opción `extras=mpi` de `scons`), en el directorio de ejecutables habrá un conjunto adicional de ejecutables específicos para MPI, por ejemplo <code>fixbb.mpi.linuxgccrelease </code>.  Si aún no se han compilado, consulta la página [[Setting Up Rosetta 3| Build-Documentation#MPI]] para más información. Para ejecutar estos ejecutables, basta con lanzarlos mediante mpiexec (o mpirun en implementaciones de mpi más antiguas): 

<code> mpiexec -np 16 fixbb.mpi.linuxgccrelease -database /path/to/database @ flags </code>

Aunque se usa normalmente en grandes clústeres de computadoras, MPI se puede instalar en máquinas linux y mac multiprocesador.  Si tienes un flamante equipo de escritorio de 8 núcleos, deberías poder usar MPI.  Hay muchas variantes de MPI, pero openmpi parece funcionar bien tanto en Ubuntu como en MacOSX.


La mayoría de las aplicaciones son actualmente compatibles con MPI a través del [[distribuidor de trabajos |jd2]]. Consulta la sección sobre el JobDistributor de MPI para ver cómo controlar con precisión el uso de MPI por parte de Rosetta en tu ejecución.

Una opción útil al ejecutar Rosetta mediante mpi es <code> -mpi_tracer_to_file path/to/log/dir </code>.  Esto separará la salida de cada procesador en archivos distintos.  

Este es un ejemplo del comando general que pongo en un script bash para ejecutar mediante Qsub usando variables de entorno en ejecuciones en clústeres:

<pre>
mpiexec -np $np --machinefile $HOME/dna.machinefile $program.mpi.linuxgccrelease -database
$ROSETTA3/database -nstruct $nstruct -ex1 -add_orbitals -ex2 -use_input_sc -ignore_unrecognized_res @
$flag -mpi_tracer_to_file $HOME/rosetta_run_logs/debug/$debug_log
</pre>

Ten en cuenta que la distribución de trabajos basada en MPI se puede usar junto con el multihilo si ambas opciones se especifican durante la compilación (`extras=cxx11thread,mpi`).  En ese caso, es importante limitar el producto del número de procesos por nodo y el número de hilos por proceso para que sea igual al número de núcleos por nodo: el comportamiento predeterminado de la compilación multihilo es lanzar un hilo por núcleo del nodo y por proceso, lo que provocaría sobresuscripción si se lanza más de un proceso por nodo.  Consulta la sección sobre multihilo, más arriba, para ver información sobre cómo limitar el total de hilos por proceso.

Como nota final, se recomienda encarecidamente habilitar el extra `serialization` siempre que Rosetta se compile con compatibilidad con MPI (`extras=mpi,cxx11thread,serialization` o `extras=mpi,serialization`).  Esto es necesario para ciertos tipos de comunicación entre procesos.

Grupos de opciones y niveles
=========================

Las opciones de Rosetta se agrupan por su uso funcional y de protocolo. Cada grupo tiene al menos un nivel, el nivel padre. La mayoría de los grupos tienen uno o más subniveles que contienen varias opciones. Puedes usar dos puntos simples o dobles para separar los niveles.  Si la opción es única, como _nstruct_, no hace falta especificar los grupos; Rosetta te avisará si lo haces pero en realidad hay varias opciones con el mismo nombre.

Por ejemplo:

```
fixbb.linuxgccrelease -in:file:s myinput.pdb -out:file:o myoutput
fixbb.linuxgccrelease -in::file::s myinput.pdb -packing::ex1
```

Tipos de opciones
============

Todos los tipos de opciones están predefinidos, y puedes averiguar el tipo de parámetros de cada opción leyendo los tipos de opción. Esta es una lista de los tipos de opciones de Rosetta:

1.  Boolean, BooleanVector
2.  Integer, IntegerVector
3.  Real, RealVector
4.  String, StringVector
5.  File, FileVector
6.  Path, PathVector

Por ejemplo: la opción «database» es de tipo Path, así que va seguida de parámetros con formato de ruta, como

```
-database yourpath/Rosetta/main/database
```

La opción «ex1» es de tipo Boolean y está establecida en false por defecto, así que puedes activarla así

```
-packing:ex1
```

La opción «nstruct» es de tipo Integer; puedes usarla así

```
-nstruct 10
```

La opción «backrub:pivot_residues» es de tipo IntegerVector, así que

```
-backrub:pivot_residues 10 11 12 13
```

Cómo obtener ayuda con las opciones
=========================

Hay unos cuantos buenos lugares donde buscar ayuda. 

1. Tanto la [[documentación general | rosetta_basics/Rosetta-Basics]] como la [[documentación específica de cada aplicación |application_documentation/Application-Documentation]] son extremadamente útiles.

2. Si pasas <code>-help</code> como opción en la línea de comandos, Rosetta mostrará todas las opciones existentes y después terminará (ignorando las demás opciones).  

3. Echa un vistazo a las demostraciones y a las capturas de protocolos para obtener ayuda con aplicaciones concretas.  Son demostraciones seleccionadas de cómo usar una aplicación determinada, con opciones, recomendaciones generales, archivos de entrada, etc.  Estas demostraciones son especialmente útiles para los protocolos que usan RosettaScripts.

4. El material suplementario de los artículos más recientes sobre Rosetta debería incluir la línea de comandos completa que hay que usar y todas las opciones que se utilizaron para generar los datos a los que se refiere el artículo.  Aunque puede haber cierta deriva en los nombres de las opciones con el tiempo, estos artículos de investigación son un excelente punto de partida.  

5. Si todavía necesitas ayuda para ejecutar una aplicación o protocolo concreto de Rosetta, visita www.rosettacommons.org/forum para más información.  El autor correspondiente de la aplicación o del protocolo también puede ayudarte.

Consejos generales para ejecutar Rosetta
=========================
* La mayoría de las aplicaciones usan las opciones -s y -l para especificar un único PDB de entrada o un archivo que enumera PDB, comúnmente llamado PDBLIST.  El archivo PDBList debe especificar la ruta completa al PDB (uno en cada línea), a menos que se especifique <code>-in:path:pdb directory/to/pdb/files</code>.  Consulta [[esta página | input-options]] para ver más opciones de entrada comunes.
<br>
<br>
* Si tienes un archivo de puntuaciones de salida y quieres encontrar la estructura de menor energía, usa el comando <code>sort</code>.  Puedes ordenar por una columna concreta con la opción -kx. Consulta [esta página](http://www.skorks.com/2010/05/sort-files-like-a-master-with-the-linux-sort-command-bash/) para saber más.
 - Ordenar por puntuación total: <code>sort my_score_file.sc</code> 
 - Ordenar por término de energía: <code>sort -k5 my_score_file.sc</code>, que ordenaría por la 5.ª columna, o el 4.º término de puntuación.
<br>
<br>
* Por defecto, Rosetta ignorará los átomos de un PDB de entrada cuya ocupación sea 0.  Si te faltan residuos o átomos durante una ejecución, lo más probable es que esa sea la causa.  Para que Rosetta lea de todos modos esos átomos, pasa la opción <code>-ignore_zero_occupancy false</code>
<br>
<br>
* Por defecto, Rosetta no cargará un PDB si hay residuos o ligandos que no reconoce, aunque puede que existan parámetros para esos tipos de residuo.  Esto se debe a la memoria que haría falta para entender todos estos tipos de residuo y sus posibles modificaciones químicas (sí, los ligandos son un tipo de residuo.  Rosetta está centrado en los residuos).  Probablemente Rosetta tenga parámetros para tu tipo de residuo concreto. Para activar estos tipos de residuo, consulta [[esta página | How-to-turn-on-residue-types-that-are-off-by-default]].  Para ignorarlos, pasa la opción <code>-ignore_unrecognized_res</code>
<br>
<br>
* Por defecto, Rosetta no cargará un PDB con aguas.  Esto es intencionado, ya que la mayoría de las aplicaciones de Rosetta no manejan bien las moléculas de agua y la función de puntuación predeterminada usa solvatación implícita. Para que Rosetta lea el tipo común WAT, pasa la opción <code>-ignore_waters false</code>


[[Opciones comunes y útiles de Rosetta|options-overview]]
=========================

Rosetta es un software muy versátil, y tanto su sistema de opciones como su sistema de scripting contribuyen a esa versatilidad. Muchas aplicaciones de Rosetta comparten opciones comunes, sobre todo en lo relativo a la entrada y la salida (ya que la mayoría comparten un distribuidor de trabajos común, JD2).  Es buena idea revisar algunas de estas opciones y ver cómo pueden serte útiles. 

- [[Opciones de entrada|Input options]]
- [[Opciones de salida|Output options]]
- [[Opciones de bases de datos relacionales | Database-options]]
- [[Opciones de ejecución|Run options]]
- [[Opciones de puntuación|Score options]]
- [[Opciones de empaquetado|Packing options]]
- [[Opciones renombradas y obsoletas|Renamed and Deprecated Options]]


##Véase también

* [[Fixing errors]]: solución de problemas con errores comunes de Rosetta
* [[Getting Started]]: una página para quienes empiezan con Rosetta. Los usuarios nuevos deben empezar aquí.
* [[Build Documentation]]: información sobre la instalación de Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[TACC]]: información para ejecutar Rosetta en el clúster TACC/Stampede.
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar archivos ejecutables de Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Scripting Documentation]]: interfaces de scripting de Rosetta
* [[Resources for learning biophysics and computational modeling]]
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Using the ResourceManager|ResourceManager]]
* [[Non-protein Residues]]: información sobre cómo ejecutar Rosetta con residuos que no son proteínas y ligandos

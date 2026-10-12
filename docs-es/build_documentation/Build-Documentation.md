<!-- --- title: Setting up Rosetta 3 -->

###Si eres nuevo en Rosetta, empieza [[aquí|Getting-Started]].

Esta página describe cómo instalar, compilar y probar Rosetta 3 (antes llamado "Mini") en tu propia estación de trabajo o en un directorio de usuario de un clúster científico.

Configuración de Rosetta 3
====================

Esta página describe cómo instalar, compilar y probar Rosetta 3 [[antes llamado "Mini"|Rosetta-Timeline]] en una [[plataforma compatible|platforms]].

[[_TOC_]]

##Configuración básica
Las instrucciones para configurar el entorno de compilación en la mayoría de las situaciones se encuentran en la página [[Getting Started|Getting-Started#local-installation-and-use-of-rosetta]]. 

## Clústeres de acceso público con Rosetta preinstalado

* Como parte de la iniciativa XSEDE, el clúster [[TACC/Stampede|TACC]] tiene Rosetta y PyRosetta instalados de forma centralizada para los usuarios autorizados. Consulta la página [[TACC]] para más detalles.

##Configuración alternativa para estaciones de trabajo individuales

El sistema de compilación actual se basa en la herramienta [[SCons|Scons-Overview-and-Specifics]] ("Software Constructor") con algunas extensiones. `     scons.py    ` está implementado como un script de Python.

###SCons (Mac/Linux)

Tienes varias opciones para compilar Rosetta 3 con SCons. Puedes compilar solo las bibliotecas del núcleo o tanto las bibliotecas como los ejecutables. Rosetta 3 se puede compilar en dos modos principales:

-   Modo debug — para desarrollo — sin la opción `      mode     `, o con `mode=debug`
-   Modo release — más rápido, probado y listo para usar &mdashl `      mode=release     `

1.  Cambia al directorio `      main/source     `.
2.  Escribe uno de los siguientes comandos:

    -    Compilar todos los binarios

        -   `          ./scons.py -j<number_of_processors_to_use> bin         `
        -   `          ./scons.py -j<number_of_processors_to_use> mode=release bin         `

    -    Compilar un binario concreto

        Basta con pasar el nombre:
        -   `          ./scons.py -j<num_of_proc> mode=release extras=hdf5 rosetta_scripts         `

        Si especificas la ruta con `bin/`, también debes pasar la extensión correcta:
        -   `          ./scons.py -j<num_of_proc> bin/rosetta_scripts.linuxgccdebug         `
        -   `          ./scons.py -j<num_of_proc> mode=release bin/rosetta_scripts.linuxgccrelease         `

    - Compilar solo las bibliotecas

        -   `          ./scons.py -j<number_of_processors_to_use>         `
        -   `          ./scons.py -j<number_of_processors_to_use> mode=release         `

La opción `     -j8    ` significaría "usa como máximo 8 procesos para compilar" y se puede fijar razonablemente al número de procesadores libres de tu máquina. Ten en cuenta que fijar `     -j    ` en un valor muy alto hará que el sistema operativo tenga dificultades para planificar los trabajos.

Por defecto, scons calcula el hash y procesa todos los archivos del árbol antes de realizar una compilación. En un árbol grande (p. ej., rosetta) y con un sistema de archivos de alta latencia de E/S (p. ej., NFS o GPFS), esto produce tiempos de compilación ridículamente lentos. Para mejorar los tiempos de compilación, desactiva el cálculo de hash de archivos y permite el almacenamiento en caché de los metadatos de dependencias de la compilación. Añade las siguientes líneas al archivo SConscript raíz del proyecto:

Decider('MD5-timestamp')
SetOption('implicit_cache', 1)

Estos ajustes se describen en la página [scons gofast](http://www.scons.org/wiki/GoFastButton).

Por defecto, `     scons    ` usa GCC para compilar. Para usar otro compilador, como CLang, usa la opción `     cxx    `:

`      ./scons.py -j<number_of_processors_to_use> cxx=clang     `


Para usar otra versión del compilador, puedes usar la opción `     cxx_ver    ` con la versión que tengas (aquí 4.5):

`      ./scons.py -j<number_of_processors_to_use> cxx=clang cxx_ver=4.5     `

Para ver más opciones de compilación, como compilar un solo ejecutable o apbs, consulta el archivo SConstruct en main/source

Si obtienes un error como `     /usr/bin/ld: cannot find -lz    `, SCons puede estar buscando bibliotecas de 32 bits en una máquina de 64 bits. Busca cómo instalar la dependencia que falta; en este caso, `     sudo apt-get install lib32z1-dev    ` instala la biblioteca necesaria.

<!--- BEGIN_INTERNAL -->
#### Pilot Apps
Puedes compilar solo las pilot apps que quieras copiando (en el directorio <code>src</code>) <code>pilot_apps.src.settings.template</code> a <code>pilot_apps.src.settings.my</code> y rellenando después las rutas de tus aplicaciones tal como aparecen en el archivo <code>pilot_apps.src.settings.all</code>. Puede que necesites crear un archivo <code>src/devel.src.settings.my</code> (puedes copiarlo de <code>devel.src.settings.template</code>).

##### Scons
Tendrás que pasar un 'my' después de 'bin' para que la maquinaria de compilación use este archivo, por ejemplo:
<code>python scons.py bin my mode=release -j7 cxx=clang</code>

##### CMake
Por lo que entiendo, CMake debería detectar automáticamente tu archivo my y usarlo. 

<!--- END_INTERNAL -->

###Compilar Rosetta con el proyecto Xcode de Rosetta (Mac)

> Si actualizas Xcode, asegúrate de reinstalar las herramientas de línea de comandos:  
> ```xcode-select --install```

El proyecto Xcode de Rosetta es compatible con las versiones 2.4 y posteriores de Xcode. Puedes usarlo para compilar, ejecutar, depurar, explorar y editar el código fuente. Hay cuatro destinos de compilación entre los que elegir:

```
Libraries: Rosetta libraries upon which apps are based
Test: Unit tests for components of Rosetta Libraries & Test: Both of the above
Libraries & Apps: Libraries and executable apps in rosetta-X.X/main/source/bin
```

Hay dos configuraciones principales, Debug y Release. Cada una de ellas tiene dos subconfiguraciones. El modo "static" compila binarios estáticos, en lugar de binarios basados en las bibliotecas compartidas. Esto puede ser útil para copiar y ejecutar las aplicaciones en otros sistemas Mac OS X. El modo "graphics" habilita los gráficos OpenGL para las aplicaciones que los admiten.

Los comandos de compilar y limpiar de Xcode le indican a scons que realice las acciones correspondientes. Por defecto, Xcode le indica a scons que use 2 procesadores para la compilación. Para cambiar ese número, haz doble clic en el icono "Rosetta" del panel "Groups & Files". Después ve a la pestaña "Build" y cambia el ajuste "NUM\_PROCESSORS" al número de procesadores deseado.

Para ejecutar o depurar Rosetta desde Xcode, tendrás que añadir un ejecutable al proyecto. Para ello, selecciona "New Custom Executable..." en el menú "Project". Xcode no te permitirá especificar como ejecutable los enlaces simbólicos del directorio

```
rosetta-X.X/main/source/bin
```

En su lugar, tendrás que hacer referencia a los binarios reales, que están en lo profundo de los subdirectorios de

```
rosetta-X.X/main/source/build
```
Consulta la documentación de Xcode para obtener información sobre cómo especificar los argumentos de línea de comandos y el directorio de trabajo.

Si quieres establecer puntos de interrupción desde Xcode para depurar, tienes que indicarle al depurador que cargue todas las bibliotecas de usuario. Para ello, ve al elemento de menú "Run-\>Show-\>Shared Libraries...". Cambia el menú emergente "User Libraries:" de "Default (External)" a "All".


###Compilar Rosetta en Windows
===============================

No se recomienda compilar Rosetta directamente en sistemas Windows.

Alternativas:
* Instala software de [[máquina virtual|http://en.wikipedia.org/wiki/Virtual_machine]] y ejecuta Linux dentro de ella. 
* Arranque dual con [Linux](https://help.ubuntu.com/community/WindowsDualBoot). (normalmente la mejor opción) 

Ha habido algunos informes de éxito al usar los binarios de Linux precompilados con el subsistema Linux de Windows 10. Ese uso debe considerarse "altamente experimental".

_Quizá_ puedas compilar Rosetta usando cygwin para Windows ( [http://www.cygwin.com/](http://www.cygwin.com/) ). Los desarrolladores de Rosetta no han probado ese uso y puede que no funcione.

### CMake

Rosetta también se puede compilar con CMake. Actualmente está menos probado y no admite algunas características, como las opciones "extras". Sin embargo, CMake es más rápido que SCons, lo que puede ser una ventaja en ciclos rápidos de compilación y depuración.

Para compilar con CMake...

1.  Desde el directorio base de Rosetta 3, cambia al directorio de compilación de CMake y crea los archivos de compilación de CMake:

        cd cmake       
        ./make_project.py all

2.  A continuación, cambia a un directorio de compilación

        cd build_<mode>   

3.  y compila Rosetta 3

        cmake -G Ninja
        ninja       

    Si no tienes ninja, puedes obtenerlo con 

        git clone git://github.com/martine/ninja.git

    O puedes usar `make`, que es algo más lento al recompilar:

        cmake .       
        make -j`nproc` # replace `nproc` with number of cores to use


Los modos disponibles actualmente son debug y release, en combinación con varios extras y compiladores. Para crear un nuevo tipo de compilación, copia un archivo `CMakeLists.txt` existente de un directorio de compilación y modifica los ajustes y las opciones del compilador según corresponda. En particular, quienes quieran compilar solo las bibliotecas o un subconjunto de las aplicaciones deben eliminar estas líneas de `CMakeLists.txt`:

    INCLUDE( ../build/apps.all.cmake )
    INCLUDE( ../build/pilot_apps.all.cmake )

Se pueden sustituir por una lista explícita de aplicaciones, como:

    INCLUDE( ../build/apps/minirosetta.cmake)

Los comandos `     make_project.py    ` y `     cmake    ` deben ejecutarse siempre que se añadan o eliminen archivos de los archivos `     rosetta_source/src/*.src.settings    `. La opción `     -j8    ` de `     cmake    ` tiene la misma interpretación que la opción `     -j8    ` de `     scons    `. El comando `     cmake .    ` genera un "makefile", lo que significa que se pueden usar programas alternativos como [distcc](https://wiki.rosettacommons.org/index.php/Distcc "Distcc") para compilar Rosetta 3. (El script `     ninja_build.py     ` de `     rosetta_source     ` automatiza el proceso combinado de cmake/ninja y responde a abreviaturas de compilación como 'r' para 'release'.)

Se pueden especificar compiladores de C++ alternativos (como Clang++ o distcc) en la línea de comandos sustituyendo este comando,

`      cmake .     `

por este comando,

``       cmake . -DCMAKE_CXX_COMPILER=`which clang++`      ``

Si quieres compilar Rosetta con un IDE como CLion, simplemente importa Rosetta y elige como raíz uno de los directorios de compilación de source/cmake/build/<build_directory> (p. ej., build_debug).

###Message Passing Interface (MPI)

MPI (la **M**essage **P**assing **I**nterface) es un estándar para la paralelización a nivel de proceso. Los procesos independientes pueden coordinar lo que hacen enviándose mensajes entre sí, pero no pueden acceder al mismo espacio de memoria ni interferir directamente en la ejecución de los demás. Aunque la mayor parte de Rosetta no se ha paralelizado, algunas aplicaciones (como rosetta\_scripts) están preparadas al menos para el paralelismo a nivel de trabajo (que permite distribuir automáticamente los trabajos entre los procesos disponibles), y algunas pilot apps especializadas (como vmullig/design\_cycpeptide\_MPI) aprovechan el procesamiento paralelo de una forma no trivial.

Para compilar ejecutables MPI, añade la opción "extras=mpi" y copia main/source/tools/build/site.settings.topsail a main/source/tools/build/site.settings. Puede que tengas que hacer ediciones adicionales en el archivo site.settings si tus bibliotecas MPI no están en las ubicaciones estándar. Consulta esta publicación para obtener ayuda con la configuración de MPI en Ubuntu Linux. Después compila con extras=mpi:

```
./scons.py bin mode=release extras=mpi
```

####Instalar MPI
Por supuesto, necesitas instalar MPI.  Cómo se hace varía de un sistema a otro.  En Ubuntu, probablemente necesitarás ```sudo apt-get install openmpi openmpi-dev``` o algo similar.  Es necesario instalar el paquete -dev *antes* de intentar compilar Rosetta con MPI.

##Dependencias y solución de problemas

<a name="dependencies"/>
Rosetta requiere un compilador (los gcc o clang más recientes sirven, pero consulta [[Cxx11Support]] para más detalles) y el paquete de desarrollo de la biblioteca de compresión zlib. Las instrucciones para obtener cualquiera de los dos están más abajo, ordenadas según el tipo de mensajes de error que dan cuando faltan.

**"sh: 1: o: not found"**

Esto indica que no tienes un compilador instalado, o que Rosetta no puede encontrar el compilador que tienes instalado.

En la línea de comandos, ejecuta `g++ --version` y `clang --version`. Si uno de ellos funciona, puedes intentar especificar ese compilador explícitamente en la línea de comandos de scons con `cxx=gcc` o `cxx=clang`. (Es una etiqueta, no el comando del compilador, así que no admite entradas arbitrarias.)

--> **Ya hay un compilador instalado**:

Si sabes que tienes un compilador instalado y está en tu PATH, puedes copiar `main/source/tools/build/site.settings.topsail` a `main/source/tools/build/site.settings`. También puedes editar las líneas:
```
"overrides" : {
},
```
para que queden algo así:
```
"overrides" : {
"cc" : "<C compiler command>",
"cxx" : "<C++ compiler command>",
},
```
sustituyendo los comandos del compilador según corresponda.

--> **Instalar un compilador**:


Muchas instalaciones por defecto de Mac y Linux no incluyen un compilador, así que tendrás que instalar uno por separado. (Ten en cuenta que lo siguiente solo se aplica si tienes derechos de administrador en tu máquina. Si no, habla con tu administrador de sistemas sobre la instalación de un compilador.)

Rosetta requiere un compilador con compatibilidad con C++11. La mayoría de las versiones recientes de compiladores incluyen compatibilidad con C++11, pero los compiladores más antiguos pueden no tenerla. Consulta [[Cxx11Support]] para más detalles.

En Mac, instala los paquetes de desarrollo de XCode. Aunque no vayas a compilar Rosetta a través de XCode, instalarlo también instalará un compilador. (Clang, en las versiones recientes de MacOS.)

En Linux, querrás instalar el paquete del compilador desde tu sistema de gestión de paquetes. En Ubuntu y sistemas similares, el paquete "build-essential", instalado con un comando como `sudo apt-get install build-essential`, prepara tu sistema para la compilación.

**"error: unrecognized command line option "-std=c++11""**

Rosetta requiere un compilador con compatibilidad con C++11. Este mensaje se debe a que el compilador que estás usando actualmente no tiene suficiente compatibilidad con C++11. Consulta [[Cxx11Support]] para más detalles sobre los compiladores que debes usar, o consulta la entrada "sh: 1: o: not found" sobre cómo cambiar de compilador.

**"error: '...' names constructor"/"

GCC 4.7, aunque admite muchas de las características de C++11, no las admite todas; este mensaje proviene de una característica que usamos y que GCC 4.7 no admite. Consulta [[Cxx11Support]] para más detalles sobre los compiladores que debes usar, o consulta la entrada "sh: 1: o: not found" sobre cómo cambiar de compilador.

**"no member named 'declval' in namespace 'std'"**
**"error: unknown type name 'type_info'"**

Rosetta requiere un compilador y una biblioteca estándar de C++ con compatibilidad con C++11. Estos mensajes indican que, aunque tu compilador pueda tener compatibilidad con C++11, la biblioteca estándar que usa puede no tenerla. Consulta [[Cxx11Support]] para más detalles sobre compiladores y bibliotecas estándar, o consulta la entrada "sh: 1: o: not found" sobre cómo cambiar de compilador.

**"cannot find -lz"**

Rosetta requiere que la biblioteca de compresión zlib esté instalada en tu ordenador para poder compilar correctamente. Habla con tu administrador de sistemas sobre la instalación de la versión de desarrollo de la biblioteca zlib. (Se necesita la versión de "desarrollo" de la biblioteca para que Rosetta pueda compilar con ella.) 

En Ubuntu y distribuciones relacionadas, instala el paquete zlib1g-dev (p. ej., con `sudo apt-get install zlib1g-dev`)

##Pruebas

Hay dos conjuntos de pruebas que ejecutar para asegurarse de que todo funciona correctamente: pruebas unitarias y pruebas de integración. (Consulta [[Testing Rosetta|rosetta-tests]].)

####MPI
La compilación en modo MPI permite usar JobDistributors especializados; el funcionamiento de estos JobDistributors, y su integración con otros componentes de Rosetta, solo se puede probar ejecutando pruebas de integración especiales en modo MPI, pasando la opción ```--mpi-tests``` a integration.py. Un fallo selectivo de estas pruebas probablemente significa que los JobDistributors paralelos se han roto de alguna manera.

La prueba de compilación en modo MPI simplemente intenta compilar Rosetta pasando la opción ```-extras=mpi``` a scons. Un fallo selectivo de esta compilación significa que el código rodeado por las líneas ```#ifdef USEMPI ... #endif``` tiene errores.

##Limpieza 
`cd Rosetta/main/source/ && rm -r build/* && rm .sconsign.dblite` eliminará los binarios antiguos.

## Obtener archivos adicionales

#### PDB Chemical Components Dictionary 

Para ayudar a cargar automáticamente residuos no reconocidos a partir de archivos, la opción `-in:file:load_PDB_components` activa la consulta de una versión en formato mmCIF del Chemical Components Dictionary. Desde finales de 2017, se distribuye con Rosetta una versión de este archivo, dividida en fragmentos que se mantienen por debajo del límite de tamaño de archivo de 50 Mb de GitHub. 

Si trabajas con una versión anterior de Rosetta sin archivos en `database/chemical/components/*cif.gz`, o si quieres obtener la última versión semanal del PDB, puedes descargar el archivo del [wwwPDB](http://www.wwpdb.org/data/ccd). (Como alternativa, los miembros de RosettaCommons pueden hablar con el gatekeeper de su laboratorio sobre el git-lfs de RosettaCommons).

Para usarlo con Rosetta, descarga el archivo de componentes y colócalo en el directorio de la base de datos de Rosetta (Rosetta/main/database/):

```
ftp -o $ROSETTA_DATABASE/chemical/components.cif.gz ftp://ftp.wwpdb.org/pub/pdb/data/monomers/components.cif.gz
```

Pasa el archivo `components.cif` o la ruta absoluta del archivo a la opción `-in:file:PDB_components_file`. El "Protonation Variants Companion Dictionary" y el "Chemical Component Model data file" no son necesarios. 


## Véase también

* [[Getting Started]]
* [[Platforms]]: plataformas compatibles con Rosetta
* [[Scons Overview and Specifics]]: información detallada sobre el sistema de compilación Scons

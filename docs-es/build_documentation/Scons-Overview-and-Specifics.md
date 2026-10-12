#Introducción a Scons

Autor original: Jared Adolf-Bryfogle (jadolfbr@gmail.com)

## Explorar el sistema de compilación:
Se recomienda cargar el directorio de código fuente como un proyecto de PyCharm.  PyCharm es un excelente IDE gratuito para Python.  A continuación, añade los siguientes tipos de archivo en File->Settings->File Types [Python], en los ajustes del IDE:
* <code>SConscript*</code>
* <code>SConstruct*</code>
* <code>*.settings</code>
* <code>*.src</code>

## Archivos importantes y qué hacen
Cada _proyecto_ tiene asociado un SConscript. Estos SConscripts se encargan de configurar los ajustes específicos de cada proyecto. Los ajustes se cargan mediante clases de <code>main/source/tools/build/settings.py</code>. Cada clase es un diccionario y las demás clases heredan de la clase Settings. 

Las clases incluyen:
* Settings(dict)
* BuildOptionsSupported (Settings)
* BuildOptions (Settings)
* BuildFlags (Settings)
* BuildSettings (Settings)
* BuildSettingsCombined (Settings)
* ProjectSettings (Settings)

### SConscripts:
Cada _proyecto_ tiene asociado un SConscript. Estos SConscripts se encargan de configurar los ajustes específicos de cada proyecto. 

#### Main:
Estos archivos se encargan de configurar la compilación. 

* <code>main/source/SConstruct</code>, que llama a <code>main/source/tools/build/setup.py</code> y después a SConscript.  
* <code>main/source/SConscript</code>


#### Apps/Src:
Estos archivos se encargan de analizar los archivos xxx.apps.settings y xxx.src.settings, como pilot_apps.src.settings y core1.src.settings, a través de las clases de settings.py.  
En cada archivo .settings de aquí se analizan 5 categorías.  Son: sources, include_path, library_path, libraries, subprojects.

Estos archivos son:
* <code>main/source/src/SConscript.src</code>
* <code>main/source/src/SConscript.apps</code>

#### External
Se encarga principalmente de configurar los ajustes de compilación de las bibliotecas externas sqlite3 y cppdb.
* <code>main/source/external/SConscript.external</code>

### Ajustes

#### site.settings
Los archivos site.settings de <code>main/source/tools/build</code> te permiten sobrescribir cualquiera de los ajustes del sistema de compilación scons.  Esto te permite añadir bibliotecas concretas, rutas de inclusión o sobrescribir ajustes de compilación muy específicos. Tanto los archivos .settings de site como los de user se cargan mediante <code>main/source/tools/setup.py</code> desde el archivo SConstruct principal.  

#### basic.settings
El archivo basic.settings de <code>main/source/tools/build </code> controla los ajustes de plataformas y compiladores concretos.  Si se publica una nueva versión de tu compilador favorito y requiere ajustes específicos, aquí es donde editarías lo que usa para cc, cxx, los ajustes de enlazado, etc.  Este archivo también lo carga <code>main/source/tools/setup.py</code>

#### options.settings
El archivo options.settings de <code>main/source/tools/build</code> es una recopilación de lo que realmente admite el sistema de compilación de Rosetta.  Los compiladores, modos, extras y sistemas admitidos se cargan primero desde aquí mediante <code>main/source/tools/setup.py</code>

#### platforms
Las plataformas se configuran inicialmente mediante funciones del archivo <code>main/source/tools/build/setup_platforms</code>.  Si se está probando una nueva arquitectura de ordenador, añádela primero aquí.  

##Véase también

* [[Build Documentation]]: información sobre cómo configurar Rosetta
* [[Getting Started]]: una página para quienes son nuevos en Rosetta. Los usuarios nuevos empiezan aquí.
* [[TACC]]: información para ejecutar Rosetta en el clúster TACC/Stampede.
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar archivos ejecutables de Rosetta
* [[Platforms]]: plataformas compatibles con Rosetta

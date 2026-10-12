Versiones de compilador compatibles
===================

### Probar tu compilador

Para ayudar a determinar qué compiladores pueden dar soporte a Rosetta, hemos preparado un script de prueba, 
que se puede descargar de <https://raw.githubusercontent.com/RosettaCommons/rosetta_clone_tools/master/rosetta_compiler_test.py> 
Ejecútalo con la opción `-h` para ver ayuda sobre cómo usarlo.

El script somete al compilador designado a unas cuantas pruebas para ver si el compilador (y su biblioteca asociada) pueden compilar las construcciones de C++11 que usa Rosetta.
Si tu compilador falla alguna de las "Main Tests", ese compilador es demasiado antiguo para compilar Rosetta con éxito.

### Versiones de compilador

Rosetta requiere un compilador lo bastante reciente como para tener compatibilidad con C++11.

Para ver si tu compilador tiene compatibilidad con C++11, ejecútalo solo con la opción `--version`
para que imprima el número de versión. Hazlo con cada uno de los compiladores que quieras usar con Rosetta.

```
g++ --version
clang++ --version
icc++ --version
mpiCC --version
```

Versiones aceptables:

* GCC/g++: versión 4.8 o posterior
* Clang/llvm en Linux: versión 3.3 o posterior (con salvedades. Consulta más abajo la compatibilidad con la biblioteca estándar)
* Apple clang/llvm en Mac: versión 5.0 o posterior (el clang que proporciona Apple tiene un esquema de versiones distinto del clang "principal".)
* Intel/ICC: versión 14 o posterior (versión 15 o posterior si necesitas compatibilidad con hilos).
* Otros compiladores: consulta la documentación de tu compilador para obtener información sobre la compatibilidad con C++11.

### Compatibilidad con la biblioteca estándar

La compatibilidad de un compilador con C++11 tiene dos formas distintas pero relacionadas. No solo el propio compilador debe admitir C++11,
sino que la biblioteca estándar de C++ que usa también debe admitir C++11. 
Los números de versión anteriores se refieren estrictamente al compilador en sí y pueden representar o no la compatibilidad de la biblioteca estándar que usan.

En general, los compiladores basados en GCC incluyen su propia biblioteca estándar de C++, de modo que un compilador compatible tendrá una biblioteca estándar compatible. Otros compiladores (como clang e ICC) pueden usar una biblioteca estándar de C++ externa, por lo que una versión compatible podría usar una biblioteca estándar de C++ antigua y no compatible. (Pueden usar la biblioteca estándar del compilador con el que ellos mismos se compilaron, así que para obtener una instalación de Clang totalmente compatible con C++11 en Linux, por lo general hay que instalar y compilar el propio clang con una instalación de GCC totalmente compatible con C++11.)

Actualmente hay dos bibliotecas estándar de C++ principales en uso en los sistemas en los que suele ejecutarse Rosetta. 

* `libstdc++`: hecha por los desarrolladores de GCC y se incluye con GCC. También la usan los compiladores Clang e ICC en sistemas Linux cuando se instalan con gcc (lo habitual). Rosetta requiere la versión asociada a la versión 4.8 de gcc o posterior.
* `libc++`: hecha por los desarrolladores de Clang. Es la predeterminada en los sistemas Mac. (También se puede usar con clang en sistemas Linux, mediante una compilación especial.) Rosetta requiere la versión asociada a la versión 3.3 de clang o posterior.


Qué hacer si tu compilador es demasiado antiguo
---------------------------------------

### Usar los binarios precompilados (lo mejor, si funcionan en tu sistema)

En la página de descargas de Rosetta, RosettaCommons ofrece versiones precompiladas de Rosetta para algunos (pero no todos) de los principales sistemas operativos que admite Rosetta. 
Estas descargas ya están compiladas en modo release y listas para ejecutarse. 
Por desgracia, debido a la variedad de sistemas operativos, no se puede ofrecer todas las distribuciones y versiones. 

### Usar otro compilador que ya esté instalado en tu máquina. (Lo mejor)

Lo más sencillo es simplemente usar otro compilador que ya esté instalado. Por ejemplo, si tu compilador gcc es demasiado antiguo, tu compilador clang puede ser aceptable (pero consulta la sección "Compatibilidad con la biblioteca estándar" para ver las salvedades).

A menudo los ordenadores tienen varias versiones distintas del mismo tipo de compilador. Por ejemplo, si el gcc predeterminado es demasiado antiguo, puede haber una versión más reciente de gcc instalada en otra parte del sistema. Puedes encontrarlas con el comando `which -a` (`which -a g++`), o puedes preguntar a tu administrador de sistemas si hay otra versión disponible.

Sobre todo en los clústeres, a menudo hay versiones más recientes de compiladores disponibles mediante "módulos" o "paquetes" que se pueden cargar y descargar con comandos de la línea de comandos (p. ej., `module load gcc_4.8` o `setpkg -a gcc_compiler_4.9.0`). Cada clúster tiene mecanismos distintos para cargar paquetes. Consulta la documentación de tu clúster o habla con el administrador del clúster para ver qué compiladores hay disponibles en tu sistema.

### Instalar otro compilador. (Bien)

Si todos los compiladores instalados actualmente son insuficientes, lo más sencillo es enviar una solicitud a tu administrador de sistemas para que instale un compilador actualizado. No hace falta que el compilador actualizado se instale como compilador predeterminado del sistema. Instalarlo como módulo o en un directorio no predeterminado también es aceptable para usarlo con Rosetta.

(NOTA: al enviar la solicitud, asegúrate de mencionar el problema de la compatibilidad con la biblioteca estándar, sobre todo si van a instalar una versión actualizada de Clang o ICC. Puede que haya que ajustar los procedimientos de instalación para que también se instale la biblioteca estándar debidamente actualizada.)

### No consigo que mi administrador de sistemas instale un compilador más reciente (Aceptable)

Rosetta no requiere que el compilador esté instalado en una ubicación central. Es perfectamente aceptable instalar un compilador en tu directorio personal. (Además, una vez instalado el compilador en el directorio de un usuario, otros usuarios con acceso a ese directorio también pueden usarlo. Así no todos los miembros de un laboratorio necesitan instalar el compilador.)

* GCC: el directorio de instalación final se puede especificar con la opción `--prefix` del script de configuración de GCC.
* Clang: el directorio de instalación final se puede especificar con la opción `-DCMAKE_INSTALL_PREFIX` en el comando de CMake durante la compilación. - Ten en cuenta que las últimas versiones de Clang también requieren compiladores bastante recientes para instalarse. Quizá prefieras instalar la versión 3.3 o 3.4.2

Una vez más, tener un compilador de la versión adecuada no basta: hay que instalarlo de forma que también tenga compatibilidad completa con la biblioteca de C++11.

#### Instalar binarios de compilador precompilados (Puede que funcione o no)

Clang ofrece binarios precompilados de su compilador para ciertos sistemas. [Página de descargas](http://llvm.org/releases/download.html) Algunas de estas versiones precompiladas tienen libc++ instalada, aunque otras no. (Busca la salida del comando `find <clang_directory> -name 'cstddef'` y de `find <clang_directory> -name '*libc++*'`) Puede que tengas que usar el compilador de una descarga y la biblioteca estándar de otra.

Para determinar con qué distribución y sistema operativo estás trabajando, prueba a ejecutar el comando `sw_vers; lsb_release -a; uname -a; cat /etc/*release; cat /etc/*version; cat /proc/version;` Puede que tengas que "traducir" una distribución o versión a otra relacionada. (p. ej., Linux Mint se basa en Ubuntu; CentOS, Scientific Linux y Red Hat están relacionados con Fedora, etc.)

### No es posible instalar ningún compilador en el sistema (Aceptable)

Si no puedes (o no quieres) instalar un compilador más reciente en un sistema, siempre existe la posibilidad de compilar Rosetta de forma estática en otra máquina (similar) y luego copiar los programas compilados y la base de datos al nuevo ordenador.

Añade "extras=static" a la línea de comandos de scons para compilar la versión estática de Rosetta. 

Especificar el uso de un compilador no predeterminado
-------------------------------------------

Si compilas con Scons, tienes que ajustar tu archivo user.settings.

Copia rosetta/main/source/tools/build/user.settings.template a rosetta/main/source/tools/build/user.settings

Para especificar un compilador no predeterminado, tendrás que sobrescribir los ajustes cxx y cc

```
        "overrides" : {
                "cxx" : "/home/user/downloaded_clang/bin/clang++",
                "cc" : "/home/user/downloaded_clang/bin/clang",
        },
```

Es posible que tu compilador pueda o no localizar la biblioteca estándar asociada. (GCC y las versiones de clang instaladas en el sistema suelen funcionar bien con esto; las versiones de clang precompiladas definitivamente necesitan ayuda.) Si no se encuentra automáticamente, tendrás que añadir la ruta de las bibliotecas en el bloque prepends.

```
        "prepends" : {
                "include_path" : ["/home/user/downloaded_clang/include/c++/v1/", ],
                "library_path" : ["/home/user/downloaded_clang/lib/"],
                "flags" : {
                        "link" : ["Wl,-rpath=/home/user/downloaded_clang/lib/"]
                }
        },
```

El directorio include_path es donde se encuentran archivos como `cstddef`. Los directorios library_path y link son donde se encuentran archivos como libc++.so o libstdc++.so.

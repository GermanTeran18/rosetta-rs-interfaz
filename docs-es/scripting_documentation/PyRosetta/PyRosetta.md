# PyRosetta

PyRosetta es una interfaz interactiva de Rosetta basada en Python, que permite a los usuarios crear algoritmos personalizados de modelado molecular con las funciones de muestreo y puntuación de Rosetta mediante scripts de Python. PyRosetta se escribió para Python 2.6, mientras que el más reciente PyRosetta-4 requiere Python 3.

PyRosetta está disponible como una descarga independiente (separada de Rosetta en C++). Consulta <http://www.pyrosetta.org/> para más detalles. Si eres desarrollador, también se puede compilar a partir del código fuente.

[[_TOC_]]


## Instalar y usar PyRosetta-4
Para los detalles sobre cómo obtener e instalar PyRosetta-4, consulta nuestro sitio web principal en [http://www.pyrosetta.org](http://www.pyrosetta.org)

## [OBSOLETO] PyRosetta-3 ##
3. Desde el directorio principal de PyRosetta, ejecuta `$ source SetPyRosettaEnvironment.sh` o añádelo a tu archivo .bashrc y ejecuta source sobre ese archivo.
4. Prueba tu instalación de PyRosetta ejecutando en Python la línea `import rosetta; rosetta.init()`. La salida debería mostrar la versión de PyRosetta y la semilla aleatoria.
    - Salir del directorio de PyRosetta antes de ejecutar Python ayuda a evitar problemas de rutas o a confirmar que tu ruta está bien configurada.


**PyRosetta-3, namespace frente a monolith:** Según Sergey, en la compilación namespace cada espacio de nombres de C++ tiene su propia biblioteca compartida que el kernel debe cargar, resolviendo símbolos y demás. 
Por tanto, importar en la compilación namespace requiere mucha E/S, pero poca memoria.
La compilación monolith, en cambio, tiene todos los espacios de nombres de C++ definidos en una sola biblioteca de C++.
Por ejemplo, importar rosetta (mediante PyRosetta) en la compilación namespace en Stampede (NFS con alta latencia) podía tardar hasta 20 minutos.
Hacer lo mismo con la compilación monolith requeriría unos 7 segundos. 
La recomendación actual es usar namespace en máquinas con limitaciones de memoria (por ejemplo, menos de 4 GB por hilo) o para el desarrollo local. 
Para ejecuciones de producción en clústeres (que normalmente usan el sistema de archivos NFS), usa monolith. 

**PyRosetta-4, namespace frente a monolith:** La versión monolith es la única versión de PyRosetta-4. Esta versión monolith ocupa una huella de memoria muy pequeña en comparación con la versión monolith de PyRosetta-3, además de numerosas otras mejoras.

<!--- BEGIN_INTERNAL -->

IMPORTANTE: DESARROLLADORES, POR FAVOR NO AÑADAN DOCUMENTACIÓN GENERAL DE PyRosetta a las secciones anteriores; toda esa documentación debe colocarse en PyRosetta.org para evitar problemas de sincronización cuando evolucione el código.

## Compilar PyRosetta-4 desde el código fuente

Con el cambio a C++11 a principios de septiembre de 2016, PyRosetta ahora solo se puede compilar con el esquema de compilación de PyRosetta-4.

__Requisitos previos__: Necesitas tener instalados Clang, CMake (versión > 2.8.12.2) y Ninja.

__Para compilar PyRosetta__:

```
cd main/source/src/python/PyRosetta
python build.py -j8 --create-package path/to/package

cd `build.py --print-build-root`/setup
sudo python setup.py install
```
Consulta [la wiki para desarrolladores](https://wiki.rosettacommons.org/index.php/PyRosetta:build) para más información.

__Para compilar con Conda__:

Para compilar con Conda, primero crea el entorno en el que quieres instalar PyRosetta, incluyendo la versión de Python que deseas usar. Luego sigue las instrucciones anteriores. 

Puede ocurrir que el script de compilación necesite ayuda para encontrar los archivos de inclusión y las bibliotecas de Python («Could not find requested Python version»). Cuando eso pase, puedes indicar la ruta al script build.py

```
python build.py -j8 --python-include-dir ${CONDA_PREFIX}/include/python* --python-lib ${CONDA_PREFIX}/lib/python* --create-package path/to/package
```

Ten en cuenta que no necesitas ejecutar setup.py con sudo si tu entorno de conda es una instalación a nivel de usuario.

__Enlazar tipos de datos complejos con PyRosetta__

Si ejecutas un script de PyRosetta y encuentras este error u otro similar, «TypeError: Unable to convert value to a Python type!», significa que la compilación de PyRosetta no enlazó el tipo concreto de variable al que intentas acceder. Esto ocurre con estructuras de datos complejas que pueden contener otras estructuras de datos (como un std::map, std::vector, std::list, utility::vector1, etc.). La solución es declarar un `struct` que herede de este tipo de datos complejo dentro del espacio de nombres y del archivo de cabecera donde se usan.  

Por ejemplo, en `class FragmentStore` tenemos variables miembro de tipo `std::map<std::string, std::vector<numeric::Size>> int64_groups`, `std::map<std::string, std::vector<numeric::Real>> real_groups` y `std::map<std::string, std::vector< std::vector<numeric::Real>>> realVector_groups`. Al acceder a estas variables con `fragment_store.int64_groups["Key"]` en PyRosetta recibimos el error anterior. La solución es declarar lo siguiente fuera de la clase, pero dentro del espacio de nombres `protocols::indexed_structure_store`:

```
struct map_std_string_std_vector_unsigned_long_std_allocator_unsigned_long_t : public std::map<std::string, std::vector<numeric::Size> > {};
struct map_std_string_std_vector_double_std_allocator_double_t : public std::map<std::string, std::vector<numeric::Real> > {};
struct map_std_string_std_vector_std_vector_double_std_allocator_double_std_allocator_std_vector_double_std_allocator_double_t : public std::map<std::string, std::vector<std::vector<numeric::Real>> > {};
```

Ahora el script de PyRosetta puede acceder a esas variables miembro de `FragmentStore` y modificarlas.

##Ubicaciones de las aplicaciones de PyRosetta

### PyRosetta-4 ###
Desconocido por el momento.

### PyRosetta-3 ###
Los desarrolladores de Rosetta que creen nuevas aplicaciones de PyRosetta deben colocar las aplicaciones públicas en `main/source/src/python/bindings/app/` para que se empaqueten y distribuyan con PyRosetta. Estas aplicaciones públicas también deben tener pruebas de integración. Los scripts privados deben colocarse en `main/source/scripts/pyrosetta/pilot/<user_name>`. 

<!--- END_INTERNAL -->

##Documentación adicional
Hay documentación más extensa específica de PyRosetta:
* <http://www.pyrosetta.org/documentation>: la página principal de documentación de PyRosetta (completa, pero no muy útil para principiantes)
* <http://www.pyrosetta.org/faq>: preguntas frecuentes sobre PyRosetta
* <http://www.pyrosetta.org/documentation/tutorials>: tutoriales sobre cómo usar PyRosetta (**lo mejor para empezar**)
* <http://www.pyrosetta.org/documentation/scripts>: scripts de ejemplo que usan PyRosetta (algo útiles)
* <http://www.pyrosetta.org/home/what-is-pyrosetta>: descripción general breve de PyRosetta
* <http://www.pyrosetta.org/downloads>: enlace para descargar PyRosetta; las instrucciones de instalación están al final de la página.

Puedes encontrar una descripción general de la estructura y organización de los objetos de Rosetta aquí: http://www.ncbi.nlm.nih.gov/pmc/articles/PMC4083816/

## El PyRosetta Toolkit

El [[PyRosetta Toolkit GUI]] es una interfaz gráfica para PyRosetta escrita en Python. Puedes encontrar un tutorial y una descripción general del código base, y de cómo extenderlo para tus propios usos, [[aquí | PyRosetta Toolkit]].

Ten en cuenta que, actualmente, el PyRosetta Toolkit y otras aplicaciones publicadas solo se distribuyen con __PyRosetta-3__

##Véase también

* [[PyRosetta Toolkit GUI]]: información sobre la interfaz de usuario del PyRosetta Toolkit
* [[Tutorial de PyRosetta Toolkit | PyRosetta Toolkit]]: tutoriales para usar o modificar la GUI del PyRosetta Toolkit
* [[PyMOL]]: más información sobre PyMOL
* [[Extending the PyMol Viewer]]: cómo añadir nueva funcionalidad al Mover de PyMOL de Rosetta
* [[Sitio web de PyRosetta (externo)|http://www.pyrosetta.org]]

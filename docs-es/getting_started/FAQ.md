# Preguntas frecuentes
## Preguntas frecuentes (FAQ)

Esta es una lista de algunas de las preguntas más frecuentes sobre Rosetta.

Véase también:
* [[Infrequently Asked Questions]]: preguntas menos frecuentes. 
* [Tutorial introductorio de Rosetta](https://www.rosettacommons.org/demos/latest/Home#tutorials): un buen lugar para aprender Rosetta
* [[Glossary]]: definiciones breves de términos relacionados con Rosetta.
* [[RosettaEncyclopedia]]: explicaciones más extensas de conceptos relacionados con Rosetta. 

[[_TOC_]]

#### ¿Cómo puedo obtener una licencia del software Rosetta?

Rosetta está disponible para investigadores académicos y comerciales mediante una licencia. Las licencias académicas son gratuitas. Consulta <https://www.rosettacommons.org/software/license-and-download> para obtener la licencia y descargar Rosetta.

#### ¿El software Rosetta viene como ejecutables precompilados o como código fuente, y en qué lenguaje?

Distribuimos el código fuente en C++ y los usuarios tienen que compilarlo ellos mismos.

#### ¿Cuáles son los requisitos mínimos y recomendados de hardware para el software Rosetta?

Rosetta requiere un sistema operativo tipo Unix, como Linux o MacOS; no se ejecutará fácilmente en un equipo con Windows.

Para obtener el muestreo necesario en la mayoría de los protocolos de Rosetta, lo mejor es ejecutar Rosetta en un clúster de cómputo multiprocesador. Aun así, la mayoría de los protocolos de Rosetta son trivialmente paralelizables y pueden ejecutarse en un solo procesador, a costa de tiempos de ejecución mucho más largos.

La mayoría de los procesadores modernos deberían ser adecuados. La única limitación con la que podrías toparte es la memoria. Recomendamos al menos 1 GB de memoria por cada CPU que ejecute Rosetta para obtener el mejor rendimiento.

#### ¿Cómo compilo Rosetta?

Consulta la página [[Build Documentation]] o el [tutorial de instalación](https://www.rosettacommons.org/demos/latest/tutorials/install_build/install_build) para obtener instrucciones sobre cómo compilar e instalar Rosetta.

#### ¿Dónde puedo aprender a usar Rosetta?

Un buen punto de partida será la serie de [tutoriales introductorios](https://www.rosettacommons.org/demos/latest/Home#tutorials).

#### ¿Qué es RosettaCommons?

RosettaCommons es un conjunto de más de 40 grupos e instituciones de todo el mundo que trabajan juntos para desarrollar y dar soporte a Rosetta. Consulta <https://www.rosettacommons.org/about> para más información.


#### ¿Qué son ROSIE y Robetta?

Hay varios servidores accesibles públicamente en la web que permiten a los investigadores ejecutar ciertos protocolos de Rosetta sin instalar Rosetta localmente.

[Robetta](http://www.robetta.org/) es el servidor web original de Rosetta.

[ROSIE](http://rosie.rosettacommons.org/) (Rosetta Online Server that Includes Everyone) es un sitio nuevo y centralizado para servidores web de Rosetta, e incluye varios protocolos.

También existen otros servidores web.

#### ¿Qué es PyRosetta?

PyRosetta es un envoltorio de las bibliotecas de C++ de Rosetta que permite usarlas desde scripts de Python escritos por el usuario. Consulta <http://pyrosetta.org> para más detalles.

#### ¿Qué es CSRosetta?

CSRosetta es un conjunto de scripts y ajustes a la plataforma estándar de Rosetta que facilita el trabajo con todos los datos de RMN (no solo los desplazamientos químicos). Consulta <http://www.csrosetta.org> para más información.

#### ¿Qué es el plegamiento _ab inito_?

El plegamiento de proteínas ab initio consiste en predecir modelos estructurales 3D de una molécula de proteína a partir de la información de su secuencia. Visita nuestro servidor de predicción de la estructura de proteínas de cadena completa: Robetta: <http://robetta.org/>

#### ¿Cuál es la diferencia entre el modelado _ab initio_ y el modelado _de novo_?

La predicción de estructuras ab initio se refiere clásicamente a la predicción de estructuras usando únicamente primeros principios (es decir, la física). De novo es un término más general que se refiere a la categoría más amplia de métodos que no usan plantillas de estructuras homólogas del PDB. Como Rosetta usa fragmentos de estructuras existentes del PDB para guiar la búsqueda junto con funciones de energía, hay una discusión semántica sobre si es realmente "ab initio" (aunque lo mismo podría decirse de cualquier función de energía derivada estadísticamente). En resumen: llámalo como quieras, ¡pero prepárate para un debate!

#### ¿Qué son las bibliotecas de fragmentos?

Las bibliotecas de fragmentos son las piezas de estructuras determinadas experimentalmente que Rosetta usa para guiar la búsqueda en el espacio conformacional al predecir estructuras con el protocolo ab initio, así como conformaciones de loops más largos en modelos de homología.

#### ¿Cómo interpreto las energías que da Rosetta en la salida?

Consulta [[scoring explained]] y [[analyzing results]] para más información.

#### ¿Cómo citar Rosetta en artículos?

Ha habido un gran número de artículos sobre Rosetta, así que encontrar el adecuado para citar puede ser un desafío.

Por lo general, debes citar el artículo que presentó el protocolo que usas en tu artículo. A menudo las publicaciones relevantes figuran en la página de documentación de la aplicación que usaste. 

También puedes consultar el [[Rosetta canon]] para ver los artículos principales.

#### ¿Dónde está la documentación del software Rosetta?

La página principal de documentación de Rosetta está en <http://www.rosettacommons.org/docs/latest/>. El contenido de este sitio web también está disponible en el directorio documentation/ de la versión descargada de Rosetta.

También tenemos demostraciones ejecutables de protocolos de Rosetta en el directorio demos/ de las demos de Rosetta. El contenido de texto de estas demos está disponible en línea en <http://www.rosettacommons.org/demos/latest/>.

Si te interesa modificar Rosetta para implementar nuevos protocolos, puedes encontrar recursos en <https://www.rosettacommons.org/dev>.

#### ¿Por qué Rosetta elimina algunos de mis residuos?

Rosetta eliminará los residuos a los que les faltan demasiados átomos de la cadena principal. 
"Faltan" incluye los átomos marcados con ocupación cero en el PDB.
Añade la opción "-ignore_zero_occupancy false" para cambiar este comportamiento.

Si faltan por completo los átomos de la cadena principal, usa el protocolo [[loopmodel]] para construir los residuos.  

#### ¿Hay algún lugar donde pueda ver las opciones/argumentos de los comandos de Rosetta?

La documentación de cada aplicación debería enumerar la mayoría de las opciones relevantes para esa aplicación.

El [[options overview]] debería enumerar las opciones que afectan a la mayoría de los protocolos de Rosetta.


Una lista de casi todas las opciones que Rosetta reconoce está en la [[full options list]]. (Aunque no todos los protocolos entienden todas las opciones).


#### ¿Rosetta admite ejecutarse con MPI? ¿O tengo que lanzar varios trabajos en serie?


Esto depende mucho del protocolo. Hay unos pocos protocolos que aprovechan por completo la comunicación MPI y requieren MPI para ejecutarse.
Sin embargo, la mayoría de los protocolos de Rosetta son intrínsecamente seriales para cada estructura de salida, pero pueden ejecutarse bajo MPI haciendo que cada procesador trabaje en una sola estructura de salida. Consulta [[MPI]] para más detalles.

#### ¿Cómo puedo crear un archivo de fragmentos?

Recomendamos encarecidamente usar el servidor Robetta para crear el archivo de fragmentos. <http://old.robetta.org/> Es posible ejecutar la selección de fragmentos localmente, pero requiere instalar varias dependencias y no es trivial.

#### ¿Qué es un "residuo no reconocido"?

Rosetta requiere una especificación química de cada residuo y de cómo se comporta. Por defecto puede reconocer un número considerable de los residuos importantes, pero no entiende cosas como los ligandos. Consulta [[preparing ligands]] para saber cómo lograr que Rosetta reconozca tu residuo.

#### ¿Qué es el empaquetado? ¿Qué es el diseño?

El empaquetado es el proceso de colocar cadenas laterales sobre una cadena principal, u optimizar la conformación de las cadenas laterales. 
Rosetta usa un conjunto de "rotámeros" (muestras discretas de conformaciones de cadenas laterales derivadas de estructuras determinadas experimentalmente) y un proceso de recocido simulado de Monte Carlo con criterio de Metropolis para determinar qué combinación de rotámeros produce la menor energía para una cadena principal dada.

El diseño en Rosetta usa la misma maquinaria de empaquetado que la optimización de cadenas laterales, pero en lugar de optimizar dentro de los rotámeros de un solo aminoácido, considera los rotámeros de varias identidades de aminoácidos distintas. 

#### La ejecución termina sin generar ninguna estructura. ¿Por qué?

Consulta [[fixing errors]] para más información.

#### ¿Cómo informa Rosetta el RMSD respecto a la estructura nativa cuando no hay estructura nativa?

La mayoría de los protocolos pueden usar la estructura de entrada como una estructura "nativa simulada".

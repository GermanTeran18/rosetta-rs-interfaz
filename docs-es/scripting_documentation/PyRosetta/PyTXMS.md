# Espectrometría de masas de entrecruzamiento dirigida (PyTXMS)

## Metadatos
Autores: Hamed Khakzad (hamed.khakzad@uzh.ch), Lars Malmström (lars.malmstroem@uzh.ch)

Última edición el 12 de marzo de 2019 por Hamed Khakzad (hamed.khakzad@uzh.ch).


## Tabla de contenidos
* Metadatos
* Código y demostración
* Referencias
* Propósito de la aplicación
* Algoritmo
* Archivos de entrada
* Opciones estándar
* Consejos
* Restricciones
* Salidas esperadas
* Posprocesamiento

 
## Código y demostración
**Nota: Hemos proporcionado un contenedor de Singularity en Zenodo.org ([DOI: 10.5281/zenodo.2593626](https://zenodo.org/record/2593626#.XIp1QS-ZPUI)) en el que están instaladas y probadas todas las dependencias necesarias. El enlace de descarga del contenedor se concede a quien tenga una licencia válida del software Rosetta. Puedes solicitarlo a través de Zenodo o enviarnos un correo con los datos de tu licencia.**

**A continuación se ofrece la documentación paso a paso por si quieres crear tu propio protocolo con PyRosetta.**

El código está escrito en Python 2.7 sobre PyRosetta-4. PyRosetta es una interfaz interactiva de la suite de modelado molecular Rosetta, basada en Python, que ayuda a diseñar algoritmos personalizados que aprovechan los protocolos y las funciones de energía de Rosetta. PyTXMS usa RosettaDock (tanto los protocolos de baja como de alta resolución) para generar modelos de docking, RosettaCM para el modelado comparativo y fragment-picker para generar los fragmentos necesarios de una secuencia de proteína. El paquete está envuelto por applicake, que está diseñado para el desarrollo de marcos de trabajo. Debes instalar applicake de la siguiente manera:
* applicake

`pip install applicake`

Para analizar datos de espectrometría de masas, hay que instalar en Python los siguientes paquetes:

* scikit-learn; para implementar algoritmos de aprendizaje automático.

`pip install -U scikit-learn`

* pyteomics v 3.5.1; para analizar espectros MS/MS.

`sudo apt-get install python-setuptools python-dev build-essential
sudo easy_install pip
sudo pip install lxml numpy matplotlib pyteomics`


* pdb-tools; para limpiar archivos PDB

`pip install pdb-tools`

Para convertir datos entre distintas versiones de formatos de MS (de RAW a mzML o de mzML a mgf), se pueden usar herramientas como MSConvert de ProteoWizard o el fileconverter de OpenMS.

* MSConvert de ProteoWizard

[http://proteowizard.sourceforge.net/download.html](http://proteowizard.sourceforge.net/download.html)

* OpenMS

http://www.openms.de/
	
* Dinosaur y Taxlink

[https://github.com/fickludd/dinosaur](https://github.com/fickludd/dinosaur)

[https://github.com/fickludd/taxlink](https://github.com/fickludd/taxlink)


Una vez instaladas todas las dependencias, debes clonar el repositorio de GitHub de PyTXMS y colocarlo en el nodo applicake/appliapps/. La carpeta metanode contiene cheetah_wf.py, que es el nodo principal para ejecutar todo el protocolo. Para ejecutarlo, debes proporcionar un archivo input.ini (consulta las secciones de archivos de entrada y opciones estándar más abajo). Luego puedes ejecutarlo con el siguiente comando:

`apl metanode.cheetah_wf --WORKDIR . --INPUT input.ini --OUTPUT vars.ini`

Ten en cuenta que el directorio de trabajo debe contener todos los archivos necesarios mencionados en input.ini.

## Referencias
Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de PyTXMS:

* Hauri, S., Khakzad, H., Happonen, L., Teleman, J., Malmström, J., & Malmström, L. (2019). Rapid determination of quaternary protein structures in complex biological samples. Nature communications, 10(1), 192. doi:10.1038/s41467-018-07986-1


## Propósito de la aplicación
* Determinación de la interacción proteína-proteína y de la(s) interfaz(ces) de unión en muestras biológicas complejas.
* Modelado de la estructura terciaria de proteínas usando datos de espectrometría de masas de entrecruzamiento.
* Análisis de datos de espectrometría de masas (hrMS1 y DDA)


## Algoritmo
PyTXMS es una versión modificada en Python de TX-MS [artículo de referencia anterior], implementada sobre PyRosetta. La principal modificación consiste en reducir de forma inteligente el número de modelos de docking para disminuir el tiempo de cómputo y la complejidad. PyTXMS puede analizar una interacción proteína-proteína típica (según los datos de espectrometría de masas) por hora.

PyTXMS contiene varios modos (según los datos, los recursos computacionales y el tiempo disponible). Parte de dos o más secuencias y de una (o varias) muestras experimentales de espectrometría de masas. En la primera versión admite muestras hrMS1 y DDA (en la versión principal de TX-MS también se admiten datos DIA, véase el artículo de referencia anterior, y se añadirán a PyTXMS en el futuro).

La primera etapa (preprocesamiento) comienza con un algoritmo de aprendizaje automático basado en hrMS1. Literalmente encuentra péptidos potenciales para las interfaces de unión (BI) a partir de los datos de hrMS1 y de un gran conjunto de entrenamiento proporcionado previamente, elaborado con datos reales de varias estructuras cristalinas.

En la segunda etapa se generan unos pocos modelos de docking de baja resolución y se puntúan según la función de energía de Rosetta y los péptidos de BI potenciales. Se selecciona el mejor modelo y se generan todos los entrecruzamientos (XL) computacionales para enviarlos a la siguiente etapa.

En la tercera etapa, los XL computacionales de la etapa anterior se analizan según sus espectros MS/MS usando datos DDA, y el modelo recibe una puntuación general según el número de XL válidos y su longitud (considerando una función de distribución normal). Después, el algoritmo se repite hasta converger en la puntuación máxima (basada principalmente en el número de XL válidos).

Por último, en la etapa final se generan unos pocos modelos de alta resolución a partir del mejor modelo seleccionado, y el mejor de ellos (según la función de energía de Rosetta) se presenta como modelo final.

Nota: Si no se proporciona información estructural, PyTXMS puede modelar cada secuencia a partir de su información de homólogos y usando los datos de entrecruzamiento como filtro. Este paso se realiza antes de que empiece el algoritmo principal y es posible ejecutarlo como un protocolo independiente, ya que requiere mucha potencia de cálculo. Actualmente este paso está en desarrollo y hace uso del protocolo RosettaCM y de las restricciones de entrecruzamiento de MS.

## Archivos de entrada
La lista de archivos de entrada es la siguiente:
* Datos estructurales de las proteínas (PDB o modelos).
* Secuencias de las proteínas (si no hay datos estructurales disponibles).
* Muestras de espectrometría de masas en el formato correcto (formato mzML tanto para hrMS1 como para DDA). Consulta la sección «Código y demostración» para obtener ayuda con la conversión de datos.

## Opciones estándar

|      Parámetro     |  Valor (predeterminado)  | Descripción                                                                       |
|:------------------:|:-----------------:|-----------------------------------------------------------------------------------|
|       k-fold       |    5,10,20 (10)   | Número de pliegues de la validación cruzada k-fold para probar la exactitud del aprendizaje automático sobre los datos de entrenamiento. |
|      ensemble      |     2~100 (2)     | Número de clasificadores del algoritmo de aprendizaje por conjuntos.                            |
|        delta       | 0.01 ~ 0.1 (0.01) | Ventana delta para comparar valores de masa monoisotópica/z.                               |
|      intensity     |   1000~5000 (0)   | Filtra los picos de iones con un valor de intensidad inferior a este umbral.                    |
|  number-of-models  |   2 ~ 100K (20)   | Número de modelos de docking de baja resolución.                                          |
| num-of-top-filters |    2 ~ 10K (5)    | Número de mejores modelos seleccionados para la segunda ronda de análisis con datos de MS2.     |
|       cut-off      |     15~40 (32)    | Valor umbral para considerar los XL en la estructura.                                 |
Ten en cuenta que también debes indicar todas las carpetas de ejecutables del software necesario instalado. Según la dirección que proporciones en el archivo input.ini, esas aplicaciones se ejecutarán y se usarán en el protocolo.

## Consejos
* PyTXMS contiene varios protocolos. Sin embargo, se pueden clasificar en dos grandes grupos: 1) modelado de proteínas con datos de entrecruzamiento y 2) interacción proteína-proteína con datos de entrecruzamiento. Aunque es posible tener un único flujo de trabajo que contenga ambos protocolos, recomendamos encarecidamente usar estos dos protocolos por separado y asegurarse de la entrada de cada paso.

* El análisis MS/MS en PyTXMS se puede hacer automáticamente considerando los umbrales predeterminados (delta = 0.01 y número de fragmentos > 20). También es posible inspeccionar visualmente los espectros anotados (todos se proporcionan como figuras PNG en la salida) y distinguir los espectros reales del ruido.

## Restricciones
PyTXMS está diseñado para encontrar datos de entrecruzamiento que puedan usarse como restricciones sólidas en el modelado de proteínas o en la predicción de la(s) interfaz(ces) de unión en redes de interacción proteína-proteína.

## Salidas esperadas
Esta es la lista de salidas esperadas. Evidentemente, algunas de ellas no se producen según el protocolo seleccionado:
* Un archivo PDB: el modelo final.
* Una sesión de PyMOL que contiene el PDB y todos los XL mapeados en él.
* Figuras PNG de los espectros anotados en el análisis MS/MS.
* Una tabla SQLite con todos los detalles del análisis de MS2.
* La lista de todos los XL seleccionados en un archivo .txt.

## Posprocesamiento
Los XL seleccionados pueden validarse un paso más con el enfoque de análisis DIA (proporcionado en el protocolo principal de TX-MS de referencia) y usarse de nuevo para el modelado. Sin embargo, solo es necesario si se obtiene poca información y los espectros seleccionados no serían fiables.

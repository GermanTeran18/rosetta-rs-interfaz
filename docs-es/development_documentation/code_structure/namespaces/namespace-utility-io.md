#Referencia del espacio de nombres utility::io

Clases de entrada y salida con flujos de archivos, sobre todo para datos comprimidos.

Descripción detallada
---------------------

El paquete utility::io proporciona clases de entrada y salida con flujos de archivos que admiten archivos de datos comprimidos con gzip o sin comprimir mediante una interfaz unificada, de modo que se puedan aplicar las mismas operaciones de flujo con independencia de si el archivo está comprimido o no. Usan una versión modernizada del sistema zipstream creado por Jonathan de Halleux para la entrada y salida con gzip.

La clase izstream gestiona la entrada con flujos de archivos gzip y sin comprimir. La interfaz de izstream es muy similar a la de std::ifstream, salvo que los archivos cuyo nombre termina en ".gz" se abrirán como archivos comprimidos con gzip, e izstream intentará abrir los demás archivos como archivos gzip añadiendo .gz al nombre antes de abrirlos como archivos sin comprimir con el nombre especificado.

La clase orstream proporciona la interfaz de las clases de flujo de salida. Hace falta una jerarquía para la salida, con el fin de que las salidas std::endl hacia archivos gzip se intercepten y se sustituyan por saltos de línea que no vacían el búfer (ya que los archivos gzip no se pueden vaciar hasta que se cierran), y a la vez se ofrezca un mecanismo para que canales de flujo predefinidos como std::cout sigan admitiendo el vaciado. La clase ocstream se usa para admitir ostreams generales y proporciona "canales" de salida ocstream predefinidos cout, cerr y clog que envuelven los canales correspondientes del espacio de nombres std. Las funciones escritas para la interfaz abstracta orstream pueden funcionar con ozstreams, ostreams generales o canales ocstream predefinidos.

Se puede añadir con facilidad compatibilidad con bzip2 a este sistema si se desea.

##Véase también

* [[Espacio de nombres utility|namespace-utility]]
  * [[utility::factory|namespace-utility-factory]] **YA NO EXISTE**
  * [[utility::keys|namespace-utility-keys]]
  * [[utility::options|namespace-utility-options]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores

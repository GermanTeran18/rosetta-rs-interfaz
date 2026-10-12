# ExternalPackerResultLoader
*Volver a la página de [[Movers de RosettaScripts|Movers-RosettaScripts]].*
## ExternalPackerResultLoader

Autor: Vikram K. Mulligan (vmulligan@flatironinstitute.org)
Página creada el 22 de diciembre de 2018.

[[_TOC_]]

## Descripción

ExternalPackerResultLoader toma como entrada un archivo de problema del packer, que contiene información sobre una Pose de entrada, un conjunto de rotámeros para esa Pose, la energía de un cuerpo de cada rotámero y las energías de dos cuerpos de cada par de rotámeros que interactúan, y un segundo archivo que define una solución del packer, y los usa para reconstruir una Pose con la solución aplicada sobre ella. Ten en cuenta que este mover descarta la Pose de entrada. Está pensado para usarse junto con [[InteractionGraphSummaryMetric]], que genera descripciones de problemas de empaquetado, y con recocedores u optimizadores externos. Permite que Rosetta plantee un problema de empaquetado usando la función de energía de Rosetta, que un recocedor u optimizador externo encuentre la solución ideal y que Rosetta reconstruya la Pose con la solución encontrada externamente, de modo que puedan realizarse operaciones de refinamiento adicionales.

## Opciones

[[include:mover_ExternalPackerResultLoader_type]]

## Formatos de entrada

### Formato de entrada del problema del packer

El formato de entrada del problema del packer debe coincidir con el formato de salida de [[InteractionGraphSummaryMetric]]. Consulta [[la documentación de InteractionGraphSummaryMetric|InteractionGraphSummaryMetric]] para ver los detalles. Ten en cuenta que se necesita la salida _completa_ (incluida la información de la Pose y de la geometría de los rotámeros).

### Formato de entrada de la solución del packer

El archivo de solución del packer debe tener formato de serie de líneas, una por cada posición diseñable del problema del packer, cada una con dos columnas separadas por espacios en blanco. La primera debe especificar la posición de la secuencia en la Pose y la segunda debe especificar el índice del rotámero seleccionado para esa posición de la secuencia como solución del problema del packer. No puede repetirse la posición de la secuencia de ningún residuo diseñable. Así, por ejemplo, si las posiciones 3, 5 y 6 de una Pose son diseñables y los índices de rotámero 7, 14 y 3 en esas posiciones, respectivamente, se eligieron como las soluciones óptimas de un problema de empaquetado, el archivo tendría este aspecto:

```
3     7
5     14
6     3
```

Este formato de archivo está pensado para que sea fácil programar recocedores externos que lo escriban.

## Véase también

* [[SimpleMetrics]] -- módulos de Rosetta que permiten calcular propiedades de una Pose y escribirlas en el archivo de registro, o guardarlas en caché en la Pose para su salida con los archivos de estructura.
* [[Operaciones de tarea|TaskOperations-RosettaScripts]] -- módulos de Rosetta que restringen los rotámeros considerados en cada posición al empaquetar.
* [[PackRotamersMover]] -- un mover que llama al packer de Rosetta para optimizar los rotámeros de las cadenas laterales.
* [[InteractionGraphSummaryMetric]] -- una métrica simple que escribe una descripción de un problema de empaquetado para usarla en optimizadores o recocedores externos, en un formato compatible con este mover.
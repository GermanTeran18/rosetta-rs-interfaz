# Cómo corregir errores

## Cómo abordar los errores en Rosetta 

Les pasa incluso a los desarrolladores de Rosetta con experiencia. Preparas una ejecución de Rosetta, la lanzas y... falla. Sin salida, sin resultados útiles, solo un mensaje de error críptico (si tienes suerte). ¿Qué haces ahora?

## Cómo encontrar el mensaje de error

El primer paso para corregir los errores de tu ejecución es localizar los mensajes de error de diagnóstico relevantes. Rosetta imprime los mensajes de error en el tracer (el texto que se imprime en la salida estándar o en la terminal). Si has silenciado la salida del tracer con opciones de línea de comandos, el primer paso es volver a ejecutar el protocolo con los tracers activados para obtener todas las salidas de diagnóstico.

Entre la voluminosa salida que produce Rosetta, busca las líneas con mensajes de «warning» y «error». Las advertencias (warnings) son mensajes sobre condiciones que no son necesariamente malas, pero que pueden indicar que hace falta prestar más atención. Los «errores» indican condiciones muy sospechosas que probablemente haya que corregir. Aunque el error que detuvo la ejecución se imprime al final de la salida del tracer, a veces antes se imprimen advertencias que señalan condiciones que causarán problemas más adelante. Revisa todas las advertencias y errores impresos para hacerte una idea de qué puede estar fallando.

## Pasos para depurar tu ejecución

#### Revisa tu línea de comandos.

Echa un vistazo a la línea de comandos que usaste para lanzar Rosetta. ¿Tienes todas las opciones que necesitas? ¿Falta alguna? ¿Cada opción que toma valores tiene el número correcto de valores? ¿Todos los nombres de archivo están bien especificados? ¿Tienes las rutas correctas respecto al directorio desde el que ejecutas? (Prueba a usar rutas absolutas en lugar de relativas.) Si tienes un archivo de opciones, revisa también las opciones que contiene. ¿Usas guiones normales al comienzo de las opciones o son rayas (en-dash o em-dash)?

#### Revisa tus archivos de entrada.

¿Tus archivos de entrada están en el formato correcto? ¿Estás pasando archivos PDB a una opción que espera un silent file, o un archivo FASTA a una opción que espera un archivo de alineamiento en formato Grishin?

Revisa la alineación y el espaciado del contenido. ¿Usas espacios o tabuladores para la sangría? (Mezclar ambos suele ser mala idea.) Ciertos formatos, como el PDB, se basan en columnas: cada entrada debe estar a un número determinado de caracteres desde el comienzo del archivo. Otros se separan por espacios en blanco: cada entrada se separa de las demás con uno o más espacios o tabuladores.

Revisa los finales de línea de tus archivos. Las máquinas con Windows usan un estilo de final de línea distinto del de las máquinas con Linux y MacOS. Usar un archivo que se editó en una máquina con Windows (o que pasó por una) puede causar problemas debido a los finales de línea ligeramente distintos. El programa `dos2unix` puede convertir los archivos al estándar de tipo Unix. 

Busca otros caracteres ocultos (no imprimibles) u otros caracteres no estándar. Rosetta, en general, espera que todos los archivos contengan solo caracteres ASCII imprimibles y espacios en blanco. Usar un procesador de texto en lugar de un editor de texto para editar archivos puede hacer que se inserten caracteres especiales (comillas tipográficas, rayas, etc.). El comando `grep '[^[:graph:][:blank:]]' <filename>` puede servir para ver qué líneas, si las hay, tienen caracteres inadecuados. 

#### Revisa tus directorios. 

Rosetta no creará directorios que no existan. Si vas a escribir la salida en un directorio, comprueba que el directorio exista antes de iniciar Rosetta.

#### Cuidado con las expansiones del shell (en particular «~»).

Ciertas cosas, como los comodines y el atajo de tilde para el directorio personal, las gestiona el shell, no Rosetta. Pasárselas directamente a Rosetta, por ejemplo en un archivo de opciones, no funcionará, porque Rosetta no sabe expandirlas. Si Rosetta imprime un «cannot find file» con una tilde o un comodín en el nombre del archivo, tendrás que expandir esos caracteres a la ruta completa manualmente.

## Pasos para sortear los errores de Rosetta

Rosetta no es perfecto. Aunque se ha probado que funciona en numerosas condiciones, tiene errores conocidos y desconocidos. Las siguientes son técnicas para sortear los errores de Rosetta.

#### Revisa las suposiciones que hace el protocolo.

La mayoría de los errores de Rosetta están relacionados con las suposiciones implícitas que el protocolo hace sobre los sistemas con los que trabaja. Por ejemplo, un protocolo de docking podría suponer que un Pose tiene solo dos cadenas, o un protocolo de predicción de estructuras puede suponer que la estructura no tiene residuos que no sean de proteína.

Revisa con atención la documentación y los ejemplos del protocolo que usas. ¿En qué se diferencian los ejemplos de tu sistema? 

Los puntos de conflicto relevantes incluyen (entre otros):
* Número de residuos
* Número de cadenas
* Etiquetado de las cadenas (A/B/C)
* Presencia y número de ligandos
* Presencia de ADN o ARN
* Sistemas simétricos/asimétricos
* Sistemas de membrana frente a sistemas sin membrana
* Restricciones adicionales o tipos de puntuación

La causa de tu error puede estar relacionada con el uso de un tipo de sistema con el que el protocolo no se probó. Esto no significa que el protocolo no pueda ejecutarse con tu sistema (aunque podría ser el caso). Solo significa que quizá tengas que experimentar mucho con los parámetros que usas para determinar qué cambios hay que hacer para adaptarlo a tu sistema. También puedes publicar una pregunta en <https://www.rosettacommons.org/forum> para ver si la gente de allí puede ayudarte.

#### Examina el traceback.

A menudo el mensaje de error exacto que se imprime es oscuro. Si observas el traceback que imprime Rosetta y el camino a través del código que llevó a él, puedes hacerte una idea de qué falla.

Por ejemplo, si las funciones que produjeron el error tienen que ver con «silentfile_reader» o algo similar, puede haber un problema al leer un silent file.

## Mensajes de error comunes y cómo abordarlos

#### ERROR: Value of inactive option accessed:

El programa espera que hayas pasado una opción que no estaba presente en la línea de comandos ni en el archivo de opciones. Añade la opción indicada a la línea de comandos con el valor apropiado para tu sistema.

#### Assertion Error

Los desarrolladores los ponen para otros desarrolladores. Se ponen bajo la suposición de que nunca deberían encontrarse en ejecuciones de producción. Normalmente significan que se ha incumplido una de las suposiciones que hace el protocolo.

Ten en cuenta que la prueba que se imprime es la prueba que ha *fallado*. Por ejemplo, `ERROR: 0 < seqpos` significa que seqpos **no** era mayor que cero.

#### Segfault

Los fallos de segmentación (segfaults) son uno de los errores más difíciles de depurar. Con más frecuencia los causa un desarrollador de Rosetta que supuso algo sobre tu sistema que no debía haber supuesto (por ejemplo, que la proteína siempre será una sola cadena, que no tienes puentes disulfuro en la proteína, o ) 

Comprueba que todas tus entradas sean correctas y que no haya errores evidentes en tu configuración. Además, la comprobación adicional de errores del modo debug (por ejemplo, relax.linuxgccdebug) a menudo puede convertir un segfault en un assertion error. Aun así, con frecuencia averiguar la causa de un segfault requiere ejecutar Rosetta bajo un depurador y la atención de un desarrollador.

Ánimo, sin embargo. Idealmente, Rosetta nunca debería producir un segfault. Como mínimo, el desarrollador debería haber comprobado los errores e impreso un mensaje de error interpretable. Si te encuentras con un segfault, envía un informe de error al rastreador de incidencias de Rosetta <https://github.com/RosettaCommons/rosetta/issues> o al foro de discusión de Rosetta <https://github.com/RosettaCommons/rosetta/discussions>.


##Véase también

* [[Running Rosetta with options]]
* [[MPI]]: información sobre cómo ejecutar Rosetta en modo MPI
* [[Solución de problemas del desarrollo de Rosetta|Common errors]]

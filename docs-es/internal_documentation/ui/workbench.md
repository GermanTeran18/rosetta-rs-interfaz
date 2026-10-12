#La aplicación Workbench UI

Autor: Sergey Lyskov

Propósito de la aplicación
===================
Ofrecer un medio para enviar trabajos al clúster de Rosetta desde un cliente de escritorio Mac/Linux


Descarga
========
Para usar esta aplicación necesitas descargar la última compilación para las plataformas compatibles desde http://graylab.jhu.edu/download/ui/archive/ui/ (pide las credenciales en el [canal #ui de Slack de RosettaCommons](https://rosettacommons.slack.com/messages/C449T2QSJ/details/)) y descomprimir el archivo en tu equipo de escritorio.

Configuración
=====
Al ejecutar la aplicación por primera vez, abre el menú `Preferences` (command-,) y configura el nombre de usuario y la contraseña de Rosetta Cloud, así como tu visor de PDB preferido. (Si todavía no tienes una cuenta de Rosetta Cloud, pídela en el [canal #ui de Slack de RosettaCommons](https://rosettacommons.slack.com/messages/C449T2QSJ/details/) )

Descripción general
--------
La aplicación Workbench te permite enviar una Task (tarea) formada por una lista de ejecuciones individuales de trabajos de Rosetta para una versión concreta de Rosetta. Cada trabajo se ejecuta de forma secuencial, desde la pestaña situada más a la izquierda hasta la situada más a la derecha, y se garantiza que todos los trabajos anteriores hayan terminado antes de que empiece el siguiente.

Versión de Rosetta
---------------
El campo de versión de Rosetta del diálogo TaskSubmit puede tomar los siguientes valores:
* El nombre de la rama, como `master`. En este caso, el proceso del servidor usará una compilación relativamente reciente de esa rama (o compilará la versión más reciente de la rama si no hay ninguna compilación previa). Se garantiza que la compilación usada no tendrá más de cinco días de antigüedad.
* El nombre de la rama con dos puntos al final, como `release:`. En este caso, el servidor usará siempre la confirmación _más reciente_ disponible de la rama indicada.

* Un SHA1 de Git, como `bdd325a0ef3d5d53deef57c12be5ebc859c47304`. En este caso, el servidor intentará compilar la revisión indicada.


Estructura de directorios de una Task durante la ejecución en HPC
------------------------------------------
Cuando la Task enviada empieza, todos los archivos de entrada se colocan en el directorio `input/`. Así, por ejemplo, si incluiste el archivo `my-pdb.pdb` en tu conjunto de archivos de entrada, puedes referirte a él en tu archivo de opciones como `input/my-pdb.pdb`. La salida de los trabajos ya completados se coloca en el directorio `<job-name>/`. Así, si envías una Task de varias etapas con etapas llamadas `1`, `2`, `3`, puedes acceder a los resultados de los trabajos ya completados como `1/result-of-job-1-file.extension`, `2/result-of-job-2-file.extension`, `3/result-of-job-3-file.extension`.


Consejos
====
- para ver un archivo PDB en el visor de PDB configurado, haz clic con el botón derecho sobre el archivo y elige `open` en el menú emergente, o haz doble clic sobre él
- para abrir el gráfico de ScoreFile de los archivos `*.score`: haz clic con el botón derecho sobre el archivo y elige `open` en el menú emergente, o haz doble clic sobre él. En ScoreView puedes elegir qué término de energía usar en los ejes X/Y, pasar el cursor sobre los puntos para ver las puntuaciones individuales y hacer doble clic sobre un punto para abrir ese decoy en tu visor de PDB.
- para guardar uno o varios archivos en el disco: selecciona los archivos, haz clic con el botón derecho sobre la selección y elige `save-as`
- para exportar todos los archivos de una Task a un directorio, usa el botón `export all files` de la página TaskView
- para cambiar el orden de ejecución de los trabajos, haz clic en la pestaña de un trabajo con el ratón y arrástrala a la posición deseada
- la cola actual de Tasks puede verse en https://ui.graylab.jhu.edu/queue (necesitarás tu usuario y contraseña de RosettaCloud para acceder a ella)
- puedes automatizar con scripts el envío, la sincronización y la cancelación de Tasks desde Python usando el script `rosetta_cloud.py` de https://github.com/RosettaCommons/tools.devel/tree/master/rosetta_cloud (consulta el readme del script para ver cómo usarlo)

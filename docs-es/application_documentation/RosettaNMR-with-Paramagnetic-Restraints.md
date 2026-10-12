**Captura del protocolo del manuscrito &quot;Integrative protein modeling in RosettaNMR from sparse paramagnetic restraints&quot;**

Georg Kuenze, Julia Koehler Leman, Richard Bonneau, Jens Meiler (enviado)

La captura del protocolo también está disponible en el repositorio de demos, en `Rosetta/demos/public/rosettanmr_w_paramagnetic_restraints`.

# Descripción general

Este documento es una captura del protocolo del manuscrito &quot;Integrative protein modeling in RosettaNMR from sparse paramagnetic restraints&quot; de Kuenze G. et al. Para seguir los pasos de esta captura del protocolo, se recomienda que el usuario descargue la versión semanal **v2019.02-dev60579**, que está disponible en [https://www.rosettacommons.org/software/license-and-download](https://www.rosettacommons.org/software/license-and-download).

Las instrucciones sobre cómo instalar Rosetta, la información sobre las dependencias de software y los tiempos de instalación, y cómo empezar a usar el programa se encuentran en [[Build-Documentation]] y [[Getting-Started]].

Esta captura del protocolo contiene instrucciones para aplicar restricciones paramagnéticas en el marco de RosettaNMR a cuatro tareas de modelado distintas: predicción de estructuras de proteínas _de novo_ (_protocolo 1_), modelado de proteínas simétricas (_protocolo 2_), docking proteína-ligando (_protocolo 3_) y docking proteína-proteína (_protocolo 4_). Todos los archivos de entrada necesarios para ejecutar esos cálculos de RosettaNMR se encuentran en el directorio que acompaña a esta captura del protocolo. Copia el archivo **protocol\_capture\_rosettanmr\_inputfiles.tar.gz** a la ubicación que prefieras, y extrae y descomprime el directorio de archivos de entrada con el comando:

<code>tar -xzvf protocol\_capture\_rosettanmr\_inputfiles.tar.gz</code>

En toda la captura del protocolo se usan las siguientes convenciones: **Los nombres de directorios se resaltan en negrita.** _Los nombres de archivos se escriben en cursiva._ <code>Y el texto de ancho fijo indica que es un comando que se debe escribir en la terminal.</code>


# 1) Predicción de estructuras de novo

Este protocolo presenta la predicción de estructuras de proteínas _de novo_ en el marco de RosettaNMR con datos de PCS, RDC y PRE. Como sistema de ejemplo se usa la proteína ubiquitina (ID de PDB 1D3Z), de la que se publicaron datos experimentales de PCS, RDC [1] y PRE [2].

Ve a la carpeta **1\_denovo**. Allí hay seis subcarpetas: una **input**, una **output** y otras cuatro, una por cada uno de los cuatro pasos de este protocolo:

- selección de fragmentos con desplazamientos químicos (**1\_fragments**)
- creación de decoys con Rosetta AbRelax sin datos de RMN (**2\_abrelax**)
- puntuación de decoys con datos de PCS, RDC y PRE y cálculo del peso de la puntuación de restricciones, tanto en modo centroid como all-atom (**3\_rescore**)
- predicción de estructuras con Rosetta AbRelax con datos de PCS, RDC y PRE (**4\_abrelax\_nmr**)

En la carpeta **input** ya tienes preparados los siguientes archivos:

- Archivos de fragmentos (_1d3z.200.3mers_, _1d3z.200.9mers_) (se crearán durante el paso 1.1)
- Archivo de checkpoint de Blast (_1d3z.checkpoint_) (se creará durante el paso 1.1)
- Lista de IDs de PDB de proteínas homólogas; esta lista se puede usar para excluir proteínas de la selección de fragmentos, por ejemplo con fines de benchmarking (_1d3z.deniedpdbs.txt_)
- Secuencia de 1D3Z en formato Fasta (_1d3z.fasta_)
- Estructura de 1D3Z en formato PDB; solo el primer modelo del conjunto de RMN (_1d3z.pdb_)
- Archivo de configuración del topology broker (_1d3z.tbp_)
- Archivo de entrada de PCS (_1d3z.pcs.inp_)
- Archivo de entrada de RDC (_1d3z.rdc.inp_)
- Archivo de entrada de PRE (_1d3z.pre.inp_)
- Archivos de datos de PCS (en formato Rosetta); ubicados en el subdirectorio **pcs**; un archivo de datos por cada variante marcada con spin (T12C y S57C) y por cada ion lantánido (Tb<sup>3+</sup> y Tm<sup>3+</sup>)
- Archivos de datos de RDC (en formato Rosetta); ubicados en el subdirectorio **rdc**; un archivo de datos por cada variante marcada con spin (T12C y S57C) y por cada ion lantánido (Tb<sup>3+</sup> y Tm<sup>3+</sup>)
- Archivo de datos de PRE (en formato Rosetta); ubicado en el directorio **pre**; un archivo de datos de PRE de <sup>1</sup>H-R<sub>2</sub> para la variante K48C marcada con MTSL
- Archivos de parche de la función de puntuación para PCS, RDC y PRE (_pcs.wts\_patch_, _rdc.wts\_patch_, _pre.wts\_patch_) (se crearán durante el paso 1.3)
- Archivo de parche de la función de puntuación para todos los datos de RMN (_nmr.wts\_patch_) (se creará en el paso 1.5)
- Tabla de desplazamientos químicos en formato TALOS+ (_cs/1d3z.tab_); la información sobre el formato de la tabla se encuentra en [https://spin.niddk.nih.gov/NMRPipe/talos/](https://spin.niddk.nih.gov/NMRPipe/talos/)
- Archivo de predicción de estructura secundaria de TALOS+ (_cs/1d3z.predSS.tab_) (se creará durante el paso 1.1)
- Archivo de predicción de ángulos de torsión phi/psi de TALOS+ (_cs/1d3z.pred.tab_) (se creará durante el paso 1.1)

La carpeta **output** contiene:

- Silent file binario con 1000 decoys de 1D3Z (_1d3z\_abrelax.out_) generados sin datos de RMN, para usarlos en la puntuación y en el cálculo del peso de la puntuación de RMN en el paso 1.3.

## 1.1) Selección de fragmentos con desplazamientos químicos

Ve a la subcarpeta **1\_fragments**. En este directorio se proporcionan un archivo de opciones (_fragment\_picker.options_) y un archivo de pesos (_fragment\_picker.wts_) para la aplicación fragment picker de Rosetta. En el archivo de opciones, ajusta las rutas a la base de datos de Rosetta y a la base de datos de fragmentos vall según el lugar donde se encuentren en tu sistema. Asegúrate también de que la ruta a todos los demás archivos del directorio **input** esté bien fijada.

Ten en cuenta que el archivo de checkpoint de PSI-BLAST ya está en el directorio **input**. Este archivo se puede crear ejecutando los dos comandos siguientes, con blastpgp versión 2.2.18 y suponiendo que PSI-BLAST está bien instalado y que la ruta a la base de datos de PSI-BLAST está bien configurada.
<pre>
<code>blastpgp –b 0 –j 3 –h 0.001 –d path_to_PSI-BLAST_database –i 1d3z.fasta –C 1d3z.chk –Q 1d3z.ascii</code>
</pre>
<code>../../scripts/convert\_chk.pl 1d3z.fasta 1d3z.chk</code>

El último comando convierte el archivo de checkpoint de un formato binario (_1d3z.chk_) a un formato legible para humanos (_1d3z.checkpoint_) que Rosetta puede leer.

Los archivos de predicción de estructura secundaria y de ángulos phi/psi también están en el directorio **input**. Si quieres preparar esos archivos tú mismo a partir de la tabla de desplazamientos químicos, usa el programa TALOS+, que se puede descargar gratis ([https://spin.niddk.nih.gov/NMRPipe/talos/](https://spin.niddk.nih.gov/NMRPipe/talos/)). Suponiendo que TALOS+ está bien instalado, basta con ejecutar el siguiente comando en la terminal:

<code>talos+ -in 1d3z.tab</code>

Los resultados de la predicción se pueden inspeccionar y refinar más mediante la interfaz gráfica rama+.

<code>rama+ -in 1d3z.tab</code>

Puedes encontrar más información sobre cómo seleccionar predicciones consistentes en: [https://spin.niddk.nih.gov/NMRPipe/talos/](https://spin.niddk.nih.gov/NMRPipe/talos/). Como alternativa, también puedes enviar el archivo de desplazamientos químicos al servidor web TALOS+ del grupo de Bax ([https://spin.niddk.nih.gov/bax/nmrserver/talos/](https://spin.niddk.nih.gov/bax/nmrserver/talos/)) para crear los archivos de predicción de estructura secundaria y de ángulos phi/psi.

Desde la carpeta **1\_fragments**, ejecuta la aplicación fragment picker de Rosetta escribiendo:

<code>~/Rosetta/main/source/bin/fragment\_picker.linuxgccrelease @ fragment\_picker.options</code>

Esto creará los archivos de fragmentos de 3 y de 9 residuos (_1d3z.200.3mers_, _1d3z.200.9mers_) y los archivos de puntuación de fragmentos (_1d3z.fsc.200.3mers_, _1d3z.fsc.200.9mers_). Por comodidad, esos archivos también están disponibles en el directorio **input**. Puedes encontrar más información sobre las opciones de fragment picker en [3].

## 1.2) Creación de decoys con Rosetta AbRelax sin datos de RMN

Ve a la subcarpeta **2\_abrelax**. En este directorio se proporciona un archivo de opciones (_abrelax.options_). Con los ajustes proporcionados se creará un modelo de salida. Cambia la opción <code>-out:nstruct</code> al número de modelos que desees si quieres crear más. Normalmente, para la predicción de estructuras _de novo_ se crean más de 1000 modelos y los cálculos se ejecutan en varias CPU de un clúster.

Ejecuta la aplicación Minirosetta escribiendo:
<pre>
<code>~/Rosetta/main/source/bin/minirosetta.linuxgccrelease -database ~/Rosetta/main/database/ @ abrelax.options</code>
</pre>
Esto creará un modelo de salida en formato silent file de Rosetta (_1d3z\_abrelax.out_) y un scorefile de Rosetta (_1d3z\_abrelax.sc_). Extrae el modelo de 1D3Z como archivo PDB escribiendo:

<code>~/Rosetta/main/source/bin/extract\_pdbs.linuxgccrelease -in:file:silent 1d3z\_abrelax.out</code>

Ten en cuenta que en el directorio **output** se proporciona un silent file de Rosetta (_1d3z\_abrelax.out_) con 1000 modelos de 1D3Z creados sin restricciones paramagnéticas pero con fragmentos seleccionados a partir de desplazamientos químicos. Si quieres, puedes usar ese archivo para continuar con el siguiente paso.

## 1.3) Puntuación de decoys con datos de PCS, RDC y PRE

Ve a la subcarpeta **3\_rescore**. En este directorio hay archivos de configuración individuales para puntuar con PCS (_rescore.pcs.options_), con RDC (_rescore.rdc.options_) o con PRE (_rescore.pre.options_). Además, se proporcionan dos scripts XML de Rosetta: para puntuar con la función de energía centroid score3 usa el script _rescore.cen.xml_, y para puntuar con la función de energía all-atom ref2015 de Rosetta usa el script _rescore.fa.xml_.

Para ejecutar la predicción de estructuras con el protocolo AbRelax (paso 1.4), usaremos un peso de la puntuación de PCS, RDC y PRE optimizado respecto de la energía score3, y para la puntuación y selección finales de los modelos el peso se ajustará respecto de la energía total de ref2015. Para calcular el peso se usa la siguiente fórmula:

**w<sub>NMR</sub> = (E<sub>Rosettahigh</sub> − E<sub>Rosettalow</sub>) / (E<sub>NMRhigh</sub> − E<sub>NMRlow</sub>)** (1)

donde E<sub>Rosettahigh</sub> y E<sub>Rosettalow</sub> son el promedio del 10 % de los valores más altos y más bajos de la puntuación de Rosetta, y E<sub>NMRhigh</sub> y E<sub>NMRlow</sub> son el promedio del 10 % de los valores más altos y más bajos de la puntuación de PCS, RDC o PRE, respectivamente.

Echa un vistazo a los archivos de opciones de PCS, RDC y PRE abriéndolos en un editor de texto. Los parámetros más importantes que controlan cómo se calcula la puntuación de PCS, RDC o PRE están escritos en archivos de entrada separados (llamados _1d3z.pcs.inp_, _1d3z.rdc.inp_ y _1d3z.pre.inp_, respectivamente, y ubicados en el directorio **input**). Echa un vistazo a estos archivos de entrada abriéndolos en otra ventana del editor de texto. Los conjuntos de datos de PCS y PRE medidos en distintos sitios de marcaje con spin o con distintos tipos de marcas de spin, y los conjuntos de datos de RDC recogidos con distintos medios de alineamiento, se agrupan en secciones separadas del archivo de entrada. Cada sección debe comenzar con la palabra clave **MULTISET** y terminar con la palabra **END**. Los parámetros de cálculo se especifican como pares clave-valor, y cada par debe estar separado por un signo igual (&quot;=&quot;). Lee los comentarios de los archivos de entrada para una breve descripción del significado y del formato de los parámetros de cálculo. Ten en cuenta que dentro de la sección MULTISET se permiten líneas en blanco y comentarios (que empiezan con el signo #), pero no en la misma línea que un parámetro de cálculo. El formato de cada tipo de archivo de entrada y la lista completa de parámetros se explican con más detalle en la **Tabla 1** del **Apéndice** al final de este documento. Además, una colección de opciones adicionales ofrece un control extra sobre cómo se calculan las puntuaciones respectivas. Esas opciones y su significado se resumen en la **Tabla 2** del **Apéndice**.

Los valores experimentales de PCS, RDC y PRE se encuentran en los archivos de datos de los directorios **input/pcs**, **input/rdc** e **input/pre**, respectivamente. Los archivos de datos siguen un formato específico de Rosetta que se explica en el encabezado de cada archivo. En resumen, cada valor experimental debe ir en una línea nueva. El átomo al que se refiere un valor medido de PCS, RDC o PRE se define por su nombre, su número de residuo y el ID de cadena. Esta definición del átomo debe ir entre paréntesis y aparecer delante del valor experimental. Los dos últimos elementos de cada línea son el valor experimental y el error en ppm (PCS) o Hz (RDC o PRE).

Ten en cuenta que los archivos de opciones de PCS, RDC y PRE contienen una opción llamada <code>-multiset\_weights</code>, seguida de un vector de números de coma flotante. Esos números representan factores de ponderación que especifican cuánto contribuyen a la puntuación global los valores de puntuación calculados para cada sitio de marcaje o medio de alineamiento. Así, se puede asignar un peso mayor o menor a distintos conjuntos de datos experimentales para reflejar nuestras decisiones sobre su calidad o su importancia para el cálculo. Hay que mencionar dos observaciones importantes sobre el formato de entrada de esta opción: (1) el tamaño del vector debe ser igual al número de MULTISET de PCS, PRE o RDC, es decir, 2, 1 y 4 en este ejemplo, y (2) el orden en que se aplican los factores de ponderación será el mismo en que aparecen los MULTISET en el archivo de entrada de RMN.

Para puntuar se usa la aplicación RosettaScripts. Ejecuta el siguiente comando en la terminal:
<pre>
<code>~/Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease -database ~/Rosetta/main/database/ -parser:protocol rescore.cen.xml \
@ rescore.pcs.options -in:file:silent 1d3z_abrelax.out -out:file:scorefile 1d3z_abrelax_pcs_score3.sc</code>
</pre>

Si añades la opción <code>-in:file:tags</code> al comando anterior, seguida de una o más etiquetas de modelo, se pueden seleccionar modelos específicos para puntuarlos (p. ej., <code>-in:file:tags 1d3z\_abrelax\_1\_S\_0001</code>).

Repite la puntuación con los pesos de score3 para PRE y RDC.

Repite la puntuación con la función de puntuación ref2015. Para ello, en el archivo de opciones, quita el signo de número (#) delante de las opciones específicas de ref2015 y comenta las opciones específicas de la función de puntuación score3. Por ejemplo, las líneas correspondientes de tu archivo de opciones de PCS deberían verse así:

<pre>
<code>
#Use the following options for scoring with Rosetta high resolution score function
-parser:script_vars sfxn=ref2015 nmr_sc_type=nmr_pcs nmr_sc_wt=1.0
-score:weights ref2015.wts
#Use the following options for scoring with Rosetta low resolution score function
#-parser:script_vars sfxn=score3.wts nmr_sc_type=nmr_pcs nmr_sc_wt=1.0
#-score:weights score3.wts
</code>
</pre>

Ahora escribe el siguiente comando:
<pre>
<code>~/Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease -database ~/Rosetta/main/database/ -parser:protocol rescore.fa.xml \
@ rescore.pcs.options -in:file:silent 1d3z_abrelax.out -out:file:scorefile 1d3z_abrelax_pcs_ref2015.sc</code>
</pre>

Repite la puntuación con los pesos de ref2015 para PRE y RDC.

_Paso opcional:_ si has dividido el cálculo de la estructura _de novo_ entre varias CPU, has creado varios silent files de salida y has puntuado cada uno por separado con los comandos anteriores, concatena todos los scorefiles separados en un único archivo de texto que contenga las puntuaciones de todos los modelos. Por ejemplo:

<code>cat 1d3z\_abrelax\_\*\_pcs\_ref2015.sc > 1d3z\_abrelax\_pcs\_ref2015.sc</code>

Calcula el peso de PCS, RDC o PRE para el protocolo AbRelax ejecutando el script _calc\_nmr\_wt.py_ del directorio scripts con los scorefiles obtenidos al puntuar con el conjunto de pesos score3. El script requiere como argumentos el nombre del scorefile de Rosetta y al menos un tipo de puntuación de RMN (_pcs_, _rdc_ o _pre_).
<pre>
<code>
../../scripts/calc_nmr_wt.py 1d3z_abrelax_pcs_score3.sc --nmr_scoretypes pcs
../../scripts/calc_nmr_wt.py 1d3z_abrelax_rdc_score3.sc --nmr_scoretypes rdc
../../scripts/calc_nmr_wt.py 1d3z_abrelax_pre_score3.sc --nmr_scoretypes pre
</code>
</pre>
Nota: al copiar este comando, asegúrate de que el editor no reemplace el guion corto (-) por un guion largo (--) delante de la opción <code>--nmr\_scoretypes</code>, ya que esto podría causar un error en el script.

Se escribirá en la terminal un breve mensaje con el peso calculado, p. ej.: <code>nmr\_rdc = 0.0727</code>.

Además, calcula el peso de PCS, RDC o PRE que se usará para la puntuación y selección finales de los modelos ejecutando el script _calc\_nmr\_wt.py_ con los scorefiles obtenidos al puntuar con el conjunto de pesos ref2015:
<pre>
<code>
../../scripts/calc_nmr_wt.py 1d3z_abrelax_pcs_ref2015.sc --nmr_scoretypes pcs
../../scripts/calc_nmr_wt.py 1d3z_abrelax_rdc_ref2015.sc --nmr_scoretypes rdc
../../scripts/calc_nmr_wt.py 1d3z_abrelax_pre_ref2015.sc --nmr_scoretypes pre
</code>
</pre>
## 1.4) Predicción de estructuras _de novo_ con Rosetta AbRelax y PCS, RDC y PRE

Ve a la subcarpeta **4\_abrelax\_nmr**. En este directorio hay ocho archivos de opciones: cuatro para ejecutar AbRelax y cuatro para volver a puntuar. Los archivos de opciones llamados _abrelax.pcs.options_, _abrelax.rdc.options_ y _abrelax.pre.options_ sirven para ejecutar AbRelax con PCS, RDC y PRE, respectivamente, y el archivo de opciones llamado _abrelax.nmr.options_ se puede usar para la predicción de estructuras con los tres tipos de datos de RMN aplicados a la vez.

Echa un vistazo a estos archivos abriéndolos en un editor de texto y compáralos con el archivo _abrelax.options_ de la carpeta **2\_abrelax**. Las restricciones de PCS, RDC y PRE se aplican en las etapas 1 – 4 de Abinitio fijando el peso de estos términos de puntuación en la función de puntuación de Rosetta. Esto se hace cambiando sus pesos en los archivos de parche que los acompañan (_pcs.wts\_patch_, _rdc.wts\_patch_, _pre.wts\_patch_, en la carpeta **input**) a los valores que se determinaron para el modo centroid en el paso anterior. Por ejemplo, la línea del archivo _pcs.wts\_patch_:

<code>nmr\_pcs = 3.0</code>

fija el peso de la puntuación de PCS en 3.0.

Después de modificar los archivos de parche de la función de puntuación respectivos, ejecuta la aplicación Minirosetta con restricciones de PCS, RDC o PRE escribiendo:
<pre>
<code>~/Rosetta/main/source/bin/minirosetta.linuxgccrelease -database ~/Rosetta/main/database/ @ abrelax.pcs.options</code>
</pre>

Esto creará un modelo de salida en formato silent file de Rosetta (_1d3z\_abrelax\_pcs.out_) y un scorefile de Rosetta (_1d3z\_abrelax\_pcs.sc_). Aumenta el valor de la opción <code>-out:nstruct</code> para crear más modelos. Normalmente, para la predicción de estructuras _de novo_ se crean más de 1000 modelos y los cálculos se ejecutan en varias CPU de un clúster.

Para la selección final de modelos, vuelve a puntuar los modelos con datos de PCS, RDC o PRE. En este paso podemos usar la aplicación de línea de comandos _score\_jd2_ de Rosetta. En los archivos de opciones proporcionados (_rescore.pcs.options_, _rescore.rdc.options_, _rescore.pre.options_), cambia el peso de la puntuación de PCS, RDC o PRE al valor determinado para la función de puntuación ref2015 de Rosetta en el paso 1.3. Por ejemplo, la siguiente línea del archivo _rescore.pcs.options_ fija el peso de la puntuación de PCS en 2.6:

<code>-score:set\_weights nmr\_pcs 2.6</code>

Luego, ejecuta los siguientes comandos en la terminal:
<pre>
<code>
~/Rosetta/main/source/bin/score_jd2.linuxgccrelease -database ~/Rosetta/main/database/ @ rescore.pcs.options \
-in:file:silent 1d3z_abrelax_pcs.out -out:file:scorefile 1d3z_abrelax_pcs_rescored.sc

~/Rosetta/main/source/bin/score_jd2.linuxgccrelease -database ~/Rosetta/main/database/ @ rescore.rdc.options \
-in:file:silent 1d3z_abrelax_rdc.out -out:file:scorefile 1d3z_abrelax_rdc_rescored.sc

~/Rosetta/main/source/bin/score_jd2.linuxgccrelease -database ~/Rosetta/main/database/ @ rescore.pre.options \
-in:file:silent 1d3z_abrelax_pre.out -out:file:scorefile 1d3z_abrelax_pre_rescored.sc
</code>
</pre>
Por último, la puntuación de Rosetta y de RMN y el RMSD del modelo respecto de la estructura experimental de 1D3Z se pueden extraer del scorefile con el script de python _extract\_scores.py_ del directorio de scripts. El script escribe una tabla de datos separada por comas para crear fácilmente gráficos de Score frente a RMSD. Requiere dos argumentos de línea de comandos como entrada: 1) el nombre del scorefile y 2) una lista de etiquetas de columnas que se extraerán del scorefile.
<pre>
<code>
../../scripts/extract_scores.py 1d3z_abrelax_pcs_rescored.sc --columns score nmr_pcs rms description \
&amp;&amp; mv scores.csv scores_pcs.csv

../../scripts/extract_scores.py 1d3z_abrelax_rdc_rescored.sc --columns score nmr_rdc rms description \
&amp;&amp; mv scores.csv scores_rdc.csv

../../scripts/extract_scores.py 1d3z_abrelax_pcs_rescored.sc --columns score nmr_pre rms description \
&amp;&amp; mv scores.csv scores_pre.csv
</code>
</pre>
Nota: al copiar este comando, asegúrate de que el editor no reemplace el guion corto (-) por un guion largo (--) delante de la opción <code>--columns</code>, ya que esto podría causar un error en el script.

Como alternativa, se puede seleccionar el modelo de menor puntuación y usarlo como modelo de referencia para el cálculo del RMSD. Por ejemplo, suponiendo que la etiqueta del modelo con mejor puntuación es 1d3z\_abrelax\_pcs\_S\_0010, el siguiente comando extraerá este modelo como archivo PDB del silent file de Rosetta respectivo:
<pre>
<code>~/Rosetta/main/source/bin/extract_pdbs.linuxgccrelease -in:file:silent 1d3z_abrelax_pcs.out -in:file:tags 1d3z_abrelax_pcs_S_0010</code>
</pre>

##1.5) Paso opcional: repetir la predicción de estructuras con Rosetta AbRelax usando juntos todos los datos de RMN

Combinar PCS, RDC y PRE en el marco de RosettaNMR es tan fácil como combinar sus opciones respectivas. Para ejecutar AbRelax con todos los datos de RMN, se ha preparado para ti otro archivo de opciones, llamado _abrelax.nmr.options_, en **4\_abrelax\_nmr**. Además, dentro del directorio **input**, crea un nuevo archivo de parche, llamado _nmr.wts\_patch_, que contenga el peso de cada uno de los tres términos de puntuación que se usarán en el cálculo de AbRelax:

<pre>
<code>
nmr_pcs = 1.000
nmr_rdc = 0.024
nmr_pre = 0.005
</code>
</pre>

Existen distintas formas de repartir los pesos entre los tres términos de puntuación. Aquí elegimos fijar el peso de cada puntuación de RMN en 1/3 de su valor original, que fue el usado cuando PCS, RDC y PRE se aplicaron por separado. Otra posibilidad es ajustar los pesos de modo que su razón sea proporcional al logaritmo del número de valores de PCS, RDC y PRE. Además, puedes decidir ajustar esos pesos para reflejar tus consideraciones sobre otros factores, como la confianza en los datos experimentales o el contenido de información estructural de cada tipo de dato de RMN.

Vuelve a ejecutar Rosetta AbRelax con PCS, RDC y PRE, y vuelve a puntuar los modelos con la función de puntuación ref2015 y los datos de RMN:
<pre>
<code>
~/Rosetta/main/source/bin/minirosetta.linuxgccrelease -database ~/Rosetta/main/database/ @ abrelax.nmr.options

~/Rosetta/main/source/bin/score_jd2.linuxgccrelease -database ~/Rosetta/main/database/ @ rescore.nmr.options \
–score:set_weights nmr_pcs 0.870 nmr_rdc 0.021 nmr_pre 0.006 -in:file:silent 1d3z_abrelax_nmr.out \
-out:file:scorefile 1d3z_abrelax_nmr_rescored.sc
</code>
</pre>


# 2) Modelado de proteínas simétricas

Este protocolo presenta la predicción de estructuras _de novo_ de proteínas simétricas con el marco de RosettaNMR usando desplazamientos químicos y datos de RDC. Como ejemplo se usa la proteína 2JWK, simétrica C2, de la que se publicaron datos experimentales de RDC [4].

Ve a la carpeta **2\_symmetry**. Allí hay seis subcarpetas: una **input**, una **output** y otras cuatro, una por cada uno de los cuatro pasos de este protocolo:

- selección de fragmentos con desplazamientos químicos (**1\_fragments**)
- creación de decoys con Rosetta Fold-and-Dock (**2\_folddock**)
- puntuación de decoys con RDC y cálculo del peso de la puntuación de RDC (**3\_rescore**)
- predicción de estructuras con Rosetta Fold-and-Dock y RDC (**4\_folddock\_nmr**)

En la carpeta **input** ya tienes preparados los siguientes archivos:

- Archivos de fragmentos (_2jwk.200.3mers_, _2jwk.200.9mers_) (se crearán durante el paso 2.1)
- Archivo de checkpoint de Blast (_2jwk.checkpoint_) (se creará durante el paso 2.1)
- Lista de IDs de PDB de proteínas homólogas; esas proteínas se pueden excluir de la selección de fragmentos, por ejemplo con fines de benchmarking (_2jwk.deniedpdbs.txt_)
- Secuencia de la cadena A de 2JWK en formato Fasta (_2jwk.fasta_)
- Estructura de 2JWK en formato PDB; solo el primer modelo del conjunto de RMN (_2jwk.AB.pdb_)
- Archivo de configuración del topology broker (_2jwk.tbp_)
- Archivo de definición de simetría C2 (_2jwk.symm_) (se creará durante el paso 2.2)
- Archivo de entrada de RDC (_2jwk.rdc.inp_)
- Archivos de datos de RDC (en formato Rosetta); ubicados en el subdirectorio **rdc**; un archivo de datos de RDC por cada uno de los siguientes tipos de átomos: CA-CO, N-H, CA-HA y N-CO.
- Archivo de desplazamientos químicos en formato TALOS+ (_cs/2jwk.tab_); la información sobre el formato de la tabla se encuentra en [https://spin.niddk.nih.gov/NMRPipe/talos/](https://spin.niddk.nih.gov/NMRPipe/talos/)
- Archivo de predicción de estructura secundaria de TALOS+ (_cs/2jwk.predSS.tab_) (se creará durante el paso 2.1)
- Archivo de predicción de ángulos de torsión phi/psi de TALOS+ (_cs/2jwk.pred.tab_) (se creará durante el paso 2.1)
- Archivo de parche de la función de puntuación para RDC (_rdc.wts\_patch_) (se creará durante el paso 2.3)

La carpeta **output** contiene:

- Silent file binario con 1000 decoys de 2JWK (_2jwk\_folddock.out_) generados sin datos de RMN, para usarlos en la puntuación y en el cálculo del peso de la puntuación de RDC en el paso 2.2.

## 2.1) Selección de fragmentos con desplazamientos químicos

Ve a la subcarpeta **1\_fragments**. En este directorio se proporcionan un archivo de opciones (_fragment\_picker.options_) y un archivo de pesos (_fragment\_picker.wts_). En el archivo de opciones, ajusta las rutas a la base de datos de Rosetta y a la base de datos de fragmentos vall según el lugar donde se encuentren en tu sistema. Asegúrate también de que las rutas a todos los demás archivos del directorio **input** estén bien fijadas. Los archivos de predicción de estructura secundaria y de ángulos phi/psi se crearon con ayuda de los desplazamientos químicos usando el programa TALOS+, como se explicó en el protocolo anterior (paso 1.1). El archivo de checkpoint de PSI-BLAST se puede crear ejecutando los dos comandos siguientes, suponiendo que PSI-BLAST está bien instalado y que la ruta a la base de datos de PSI-BLAST está bien configurada. Por comodidad, este archivo también se ha preparado en el directorio **input**.

<pre>
<code>blastpgp –b 0 –j 3 –h 0.001 –d path_to_PSI-BLAST_database –i 1d3z.fasta –C 1d3z.chk –Q 1d3z.ascii</code>
</pre>
<code>../../scripts/convert\_chk.pl 1d3z.fasta 1d3z.chk</code>

Ejecuta la aplicación fragment picker de Rosetta:

<code>~/Rosetta/main/source/bin/fragment\_picker.linuxgccrelease @ fragment\_picker.options</code>

Esto creará los archivos de fragmentos de 3 y de 9 residuos (_2jwk.200.3mers_, _2jwk.200.9mers_) y los archivos de puntuación de fragmentos (_2jwk.fsc.200.3mers_, _2jwk.fsc.200.9mers_).

## 2.2) Creación de decoys con Rosetta Fold-and-Dock

Ve al subdirectorio **2\_folddock**. Echa un vistazo al archivo de opciones que está en este directorio. La última opción al final del archivo es la ruta al archivo de definición de simetría, que se necesita para modelar proteínas simétricas. Contiene toda la información que Rosetta necesita saber sobre la simetría del sistema, p. ej., cómo puntuar la estructura simétrica, cómo mantener la simetría en las perturbaciones de cuerpo rígido, qué grados de libertad se pueden mover, cómo configurar inicialmente el sistema simétrico y cómo perturbarlo.

Crea un archivo de definición de simetría C2 para una proteína con dos subunidades y simetría cíclica ejecutando el siguiente comando de python. Cambia el nombre del archivo de salida a _2jwk.symm_.
<pre>
<code>~/Rosetta/main/source/src/apps/public/symmetry/make_symmdef_file_denovo.py -symm_type cn -nsub 2</code>
</pre>
Ejecuta este script sin ningún argumento para ver una lista completa de todas las opciones posibles. Para más información sobre la simetría en Rosetta, se remite al usuario a la referencia [5].

Para la predicción de estructuras se usa el protocolo Fold-and-Dock de Rosetta, que puede modelar proteínas con topología entrelazada. Inicia Fold-and-Dock ejecutando la aplicación Minirosetta:
<pre>
<code>~/Rosetta/main/source/bin/minirosetta.linuxgccrelease -database ~/Rosetta/main/database/ @ folddock.options</code>
</pre>
Esto creará un modelo de salida en formato silent file de Rosetta. Si quieres producir más modelos, aumenta el valor de la opción <code>-out:nstruct</code>. Normalmente, para la predicción de estructuras _de novo_ se crean más de 1000 modelos y los cálculos se ejecutan en varias CPU de un clúster.

En el directorio **output** se proporciona un silent file de Rosetta (_2jwk\_folddock.out_) con 1000 modelos de 2JWK creados sin RDC pero con fragmentos seleccionados con desplazamientos químicos.

## 2.3) Puntuación de decoys con datos de RDC

Ve al directorio **3\_rescore**. Se proporcionan un archivo de opciones (_rescore.rdc.sym.options_) y dos scripts XML de Rosetta (_rescore.cen.sym.xml, rescore.fa.sym.xml_) para determinar la puntuación de RDC, así como la energía ref2015 y score3 de Rosetta. El peso de la puntuación de RDC se calcula según la ecuación 1, como se explicó en el protocolo anterior. Para la predicción de estructuras con Fold-and-Dock se ajustará respecto de la energía score3, y para la puntuación y selección finales de modelos, respecto de la energía ref2015.

En el marco de RosettaNMR, la puntuación de RDC de proteínas simétricas se puede calcular exigiendo que uno de los ejes del tensor de alineamiento coincida con el eje de simetría del sistema. Esta suposición se cumple en proteínas con simetría cíclica y diédrica. En este caso, la puntuación de RDC se calcula considerando todas las copias simétricas del protómero. Sin embargo, como los residuos idénticos de subunidades simétricas comparten el mismo valor experimental de RDC, solo es necesario incluir en el archivo de entrada de datos los RDC de la unidad asimétrica. Echa un vistazo a uno de los archivos de datos de RDC (p. ej., _2jwk.nh.dat_ en **input/rdc**) para asegurarte de que los valores de RDC se asignan solo a residuos de la cadena A. Además, la opción <code>-nmr:rdc:use\_symmetry\_calc</code> debe fijarse en true en el archivo de opciones, lo que activa el modo simétrico del cálculo de RDC.

El cálculo simétrico de la puntuación de RDC requiere conocer la orientación del eje de simetría y la transformación de cuerpo rígido entre subunidades simétricas. Por desgracia, esta información no se puede recuperar fácilmente del silent file de Rosetta una vez que se ha producido un modelo. Para restaurar esta información, empleamos el DetectSymmetry Mover en el script de Rosetta, que inicializa un sistema simétrico a partir de un archivo PDB. Actualmente funciona para todas las simetrías cíclicas de C2 a C99.

Primero, extrae todos los modelos de proteína del silent file y crea archivos PDB:

<code>~/Rosetta/main/source/bin/extract\_pdbs.linuxgccrelease -in:file:silent 2jwk\_folddock.out</code>

Luego, ejecuta la aplicación RosettaScripts para volver a puntuar los modelos. Usa el archivo de opciones proporcionado _rescore.rdc.sym.options._ Asegúrate de quitar cualquier signo de número delante de las siguientes líneas:
<pre>
<code>
-parser:script_vars sfxn=score3 nmr_sc_type=nmr_rdc nmr_sc_wt=1.0
-score:weights score3.wts
</code>
</pre>
y comenta las líneas respectivas de la función de puntuación ref2015. Para puntuar con la función de puntuación centroid score3, escribe:
<pre>
<code>~/Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease -parser:protocol rescore.cen.sym.xml \
@ rescore.rdc.sym.options -in:file:s 2jwk_folddock_*.pdb -out:file:scorefile 2jwk_folddock_rdc_score3.sc</code>
</pre>

Para puntuar con la función de puntuación all-atom ref2015, asegúrate de quitar cualquier signo de número delante de las siguientes líneas del archivo de opciones:
<pre>
<code>
-parser:script_vars sfxn=ref2015 nmr_sc_type=nmr_rdc nmr_sc_wt=1.0
-score:weights ref2015.wts
</code>
</pre>

y comenta las líneas respectivas de la función de puntuación score3. Luego escribe
<pre>
<code>~/Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease -parser:protocol rescore.fa.sym.xml \
@ rescore.rdc.sym.options -in:file:s 2jwk_folddock_*.pdb -out:file:scorefile 2jwk_folddock_rdc_ref2015.sc</code>
</pre>

Calcula el peso de RDC para el protocolo Fold-and-Dock ejecutando el script _calc\_nmr\_wt.py_ del directorio scripts con el scorefile obtenido al puntuar con el conjunto de pesos score3. El script requiere dos argumentos: 1) el nombre del scorefile de Rosetta y 2) el tipo de restricciones de RMN (_rdc_).

<code>../../scripts/calc\_nmr\_wt.py 2jwk\_folddock\_rdc\_score3.sc --nmr\_scoretypes rdc</code>

Además, calcula el peso de RDC que se usará para la puntuación y selección finales de los modelos ejecutando el script _calc\_nmr\_wt.py_ con el scorefile obtenido al puntuar con la función de puntuación ref2015:

<code>../../scripts/calc\_nmr\_wt.py 2jwk\_folddock\_rdc\_ref2015.sc --nmr\_scoretypes rdc</code>

## 2.4) Predicción de estructuras _de novo_ con Rosetta Fold-and-Dock y RDC

Ve al subdirectorio **4\_folddock\_nmr**. Echa un vistazo al archivo de opciones proporcionado (_folddock.rdc.options_). Los RDC se aplican en las etapas 1 – 4 de Abinitio fijando su peso de puntuación en la función de puntuación de Rosetta en el valor determinado para el modo centroid en el paso anterior. Debes modificar el archivo de parche que los acompaña, _rdc.wts\_patch_, en el directorio **input** para reflejar este cambio, p. ej.:

<code>nmr\_rdc = 0.020</code>

Ejecuta la aplicación Minirosetta para iniciar Fold-and-Dock con RDC.
<pre>
<code>~/Rosetta/main/source/bin/minirosetta.linuxgccrelease -database ~/Rosetta/main/database/ @ folddock.rdc.options</code>
</pre>

El silent file de salida de Rosetta (_2jwk\_folddock\_rdc.out_) y el scorefile (_2jwk\_folddock\_rdc.sc_) contendrán un modelo. Aumenta el valor de la opción <code>-out:nstruct</code> para crear más modelos si lo deseas.

Cuando termine la ejecución de la predicción de estructuras, vuelve a puntuar los modelos con RDC como se describe en el paso 2.3). Copia los archivos _rescore.fa.sym.xml_ y _rescore.rdc.sym.options_ de la carpeta **3\_rescore** al directorio actual. Asegúrate de cambiar el peso de RDC al valor determinado respecto del conjunto de pesos ref2015. Por ejemplo, la siguiente línea del archivo de opciones fija el peso de la puntuación de RDC en 0.02:

<code>-parser:script\_vars sfxn=ref2015 nmr\_sc\_type=nmr\_rdc nmr\_sc\_wt=0.02</code>

Primero, extrae los modelos del silent file y crea archivos PDB:
<pre>
<code>~/Rosetta/main/source/bin/extract_pdbs.linuxgccrelease -in:file:silent 2jwk_folddock_rdc.out</code>
</pre>
Luego, ejecuta la aplicación RosettaScripts:
<pre>
<code>~/Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease -parser:protocol rescore.fa.sym.xml \
@ rescore.rdc.sym.options -in:file:s 2jwk_folddock_rdc_*.pdb -out:file:scorefile 2jwk_folddock_rdc_rescored.sc</code>
</pre>
Por último, la puntuación de Rosetta y de RDC y el RMSD simétrico del modelo respecto de la estructura experimental de 2JWK se pueden extraer del scorefile con el script de python _extract\_scores.py_, que escribe una tabla de datos separada por comas para crear fácilmente gráficos de Score frente a RMSD. El script requiere dos argumentos de línea de comandos como entrada: 1) el scorefile de Rosetta y 2) una lista de etiquetas de columnas de puntuaciones u otras métricas que se deben extraer.
<pre>
<code>../../scripts/extract_scores.py 2jwk_folddock_rdc_rescored.sc --columns score nmr_rdc symmetric_rms description</code>
</pre>

Como alternativa, se puede seleccionar el modelo de menor puntuación y usarlo como modelo de referencia para el cálculo del RMSD. Por ejemplo, suponiendo que la etiqueta del modelo de menor puntuación es 2jwk\_folddock\_rdc\_S\_0010, el siguiente comando extraerá este modelo como archivo PDB del silent file de Rosetta respectivo:
<pre>
<code>~/Rosetta/main/source/bin/extract_pdbs.linuxgccrelease -in:file:silent 2jwk_folddock_rdc.out -in:file:tags 2jwk_folddock_rdc_S_0010</code>
</pre>

# 3) Docking proteína-ligando

Este protocolo presenta cómo usar RosettaNMR junto con PCS para el docking proteína-ligando. Como sistema de ejemplo se usa un complejo entre el dominio SH2 de la proteína GRB2 y un tripéptido fosforilado pYTN. Para comparar, se usa la estructura de rayos X de GRB2 SH2 con un nonapéptido fosforilado relacionado que tiene el mismo motivo de reconocimiento de 3 residuos (ID de PDB 1JYR).

Ve a la carpeta **3\_ligand\_docking**. En este directorio hay seis subcarpetas: una **input**, una **output** y otras cuatro, una por cada uno de los cuatro pasos de este protocolo:

- creación de los parámetros del ligando (**1\_ligand\_params**)
- determinación del tensor &Delta;&chi; (**2\_tensor\_fit**)
- búsqueda en rejilla del cuerpo rígido del ligando con PCS (**3\_rbsearch**)
- docking proteína-ligando completamente flexible con PCS (**4\_docking**)

El directorio **input** proporciona los siguientes archivos de entrada:

- Estructura de rayos X de GRB2 SH2 sin el ligando pYTN (_GRB2.pdb_); úsala para las ejecuciones de docking
- Estructura de rayos X de GRB2 SH2 con el ligando pYTN (_GRB2\_YTN.pdb_); úsala para comparar los resultados del docking y calcular el RMSD del ligando; este PDB se creó superponiendo pYTN sobre los residuos correspondientes del ligando nonapéptido de la estructura experimental (ID de PDB 1JYR) y reemplazando el ligando peptídico nativo. El residuo del ligando se etiqueta con un ID de cadena distinto del de la proteína, normalmente la cadena X.
- Archivo PDB de pYTN (_YTN.pdb_)
- Archivo SDF de pYTN (_YTN.sdf_)
- Archivo SDF con 1000 conformaciones de pYTN (_YTN\_confs.sdf_) (se creará durante el paso 3.1)
- Archivo de parámetros de residuo de Rosetta para pYTN (_YTN.params_) (se creará durante el paso 3.1)
- Biblioteca de confórmeros de Rosetta para pYTN (_YTN\_conformers.pdb_) (se creará durante el paso 3.1)
- Parámetros adicionales para torsiones impropias (opcional) (_YTN.tors_) (se creará durante el paso 3.1)
- Archivo de entrada de PCS para GRB2 SH2 (_grb2\_pcs.inp_) (los parámetros del tensor &Delta;&chi; se determinarán en el paso 3.2)
- Archivo de entrada de PCS para pYTN (_ytn\_pcs.inp_) (los parámetros del tensor &Delta;&chi; se determinarán en el paso 3.2)
- Archivos de datos de PCS (en formato Rosetta); ubicados en el subdirectorio **pcs**; cuatro archivos de datos de PCS para GRB2 SH2 (uno por cada lantánido: Tm<sup>3+</sup>, Tb<sup>3+</sup>, Dy<sup>3+</sup>, Er<sup>3+</sup>) y tres archivos de datos de PCS para pYTN (uno por cada lantánido: Tm<sup>3+</sup>, Tb<sup>3+</sup>, Dy<sup>3+</sup>)

El directorio **output** contiene:

- Valores del tensor &Delta;&chi; para los lantánidos Tm<sup>3+</sup>, Tb<sup>3+</sup>, Dy<sup>3+</sup>, Er<sup>3+</sup> (_pcs\_tensor.info_)
- Archivo PDB con las coordenadas del centro de masa de pYTN después de ejecutar la búsqueda en rejilla con PCS (_YTN\_rbseach\_centroids.pdb_); este archivo se usa como entrada de RosettaLigand y se pasa al StartFromMover.

## 3.1) Creación de los parámetros del ligando

Ve al directorio **1\_ligand\_params**. Crea un archivo SDF con las conformaciones de pYTN (_YTN\_confs.sdf_). Este archivo también se proporciona en el directorio de entrada. Este conjunto de conformaciones se creó con la BioChemicalLibrary del laboratorio Meiler (BCL v3.6.1, [http://www.meilerlab.org/bclcommons](http://www.meilerlab.org/bclcommons)) ejecutando el comando siguiente. Ten en cuenta que la versión de BCL puede diferir en tu sistema; usa el comando de ayuda para imprimir la lista de opciones de entrada de la aplicación ConformerGenerator.
<pre>
<code>
~/BCL/bcl.exe molecule:ConformerGenerator -rotamer_library cod -top_models 1000 -max_iterations 30000 -add_h \
-ensemble_filenames ../input/YTN.sdf -conformation_comparer SymmetryRMSD 0.250 -generate_3D -conformers_single_file YTN_confs.sdf
</code>
</pre>

Los archivos de parámetros contienen información sobre los tipos de residuo de Rosetta, como los tipos de átomo, las cargas parciales de los átomos, la conectividad de los átomos y la conformación del residuo en coordenadas internas. Escribe el siguiente comando en la terminal:
<pre>
<code>~/Rosetta/main/source/scripts/python/public/molfile_to_params.py -n YTN -p YTN --conformers-in-one-file ../input/YTN_confs.sdf --extra_torsion_output --recharge=-1</code>
</pre>

Esto creará un archivo de parámetros (_YTN.params_) para un residuo con el código de tres letras YTN. El programa lee todas las conformaciones del ligando pYTN almacenadas en el archivo _YTN\_confs.sdf_ y crea una biblioteca de confórmeros en formato Rosetta (_YTN\_conformers.pdb_). La primera conformación del ligando se escribe en un archivo PDB llamado _YTN.pdb_. Además, se genera un archivo de texto con torsiones impropias adicionales (_YTN.tors_). La carga total del ligando se fija en -1 y todas las cargas atómicas se desplazan en consecuencia.

Por comodidad, todos los archivos creados en este paso también están disponibles en el directorio **input**, de modo que puedas continuar con los pasos siguientes si surge algún problema al crear los parámetros del ligando.

## 3.2) Determinación del tensor &Delta;&chi; a partir de los PCS de la proteína

La posición del ligando durante el docking se puede puntuar calculando sus PCS en las coordenadas actuales, usando como entrada un tensor &Delta;&chi; predefinido, y comparando los PCS calculados con los experimentales. Los valores del tensor &Delta;&chi; se determinan en este paso ajustando los PCS a la estructura conocida de la proteína. Esto tiene la ventaja de que los PCS de la proteína son más numerosos que los del ligando y, por tanto, el tensor &Delta;&chi; se puede determinar con mayor precisión.

Ve a la subcarpeta **2\_tensor\_fit** y ejecuta la siguiente aplicación de línea de comandos con el archivo de opciones que se proporciona en este directorio. Asegúrate de que la ruta al archivo PDB y al archivo de entrada de PCS de GRB2 SH2, que están ambos en el directorio **input**, sea correcta.

<code>~/Rosetta/main/source/bin/calc\_nmr\_tensor.linuxgccrelease @ fit.options</code>

Para mostrar una lista de todas las opciones relevantes que puede aceptar esta aplicación, vuelve a ejecutar el comando anterior sin el archivo de opciones y solo con la opción <code>-help</code>.

La aplicación crea dos archivos de salida: una tabla de valores de PCS experimentales frente a calculados se escribe en el archivo _GRB2\_pcs\_pred.txt_, y los valores del tensor &Delta;&chi; de cada ion lantánido se escriben en el archivo _pcs\_tensor.info_ (ver abajo).
<pre>
<code>
----------------------------------------------------------------------------------------------------
Position Metal Experiments PCSs      Xax      Xrh    alpha     beta    gamma      xM      yM      zM
-------- ----- ----------- ---- -------- -------- -------- -------- -------- ------- ------- -------
18          Tb           1   56   23.966   15.288   79.312   68.199  151.578   7.585  24.964   8.048

18          Tm           1   56   19.071    6.842  162.631  113.645  170.187   7.585  24.964   8.048

18          Dy           1   55  -21.164  -11.060  131.562  136.607  140.271   7.585  24.964   8.048

18          Er           1   57    8.102    3.451  151.963  121.910  174.273   7.585  24.964   8.048
----------------------------------------------------------------------------------------------------
</code>
</pre>
Xax y Xrh son las componentes axial y rómbica del tensor &Delta;&chi;; &alpha;, &beta; y &gamma; son los tres ángulos de Euler que orientan el sistema de referencia del tensor respecto del sistema de referencia del PDB; y xM, yM y zM son las coordenadas cartesianas del ion metálico en el sistema de referencia del PDB. Además, se creará otro archivo de texto (_GRB2\_pcs\_pred.txt_) con los valores de PCS predichos de GRB2. La última columna de este archivo de predicción indica la desviación entre los valores predichos y los experimentales, y señala las posiciones en las que la desviación es mayor que el error indicado en el archivo de datos de PCS.

En el archivo de entrada de PCS del ligando (_ytn\_pcs.inp_), cambia ahora los valores del tensor &Delta;&chi; para Tm<sup>3+</sup>, Tb<sup>3+</sup> y Dy<sup>3+</sup> en el vector del conjunto de datos por los valores determinados en el ajuste. Los valores del tensor &Delta;&chi; corresponden a los últimos ocho campos del vector del conjunto de datos y tienen el siguiente orden, de izquierda a derecha: xM, yM, zM, Xax, Xrh, &alpha;, &beta;, &gamma;. Ten en cuenta que la palabra clave <code>fixed\_tensor</code> del archivo de entrada está fijada en true, lo que significa que los valores del tensor &Delta;&chi; se leen del archivo de entrada y no se hará ningún ajuste durante el docking del ligando. El archivo de entrada de PCS del ligando debería verse así:
<pre>
<code>
MULTISET
spinlabel_position = 18
chain_id = A
gridsearch = [CA, CB, 10.0, 4.0, 0.0, 20.0]
fixed_tensor = TRUE
dataset = [../input/pcs/ytn_tb_pcs.dat, Tb, 1.0, CONST, MEAN, SVD, 7.585, 24.964, 8.048,  23.966,  15.288,  79.312,  68.199, 151.578]
dataset = [../input/pcs/ytn_tm_pcs.dat, Tm, 1.0, CONST, MEAN, SVD, 7.585, 24.964, 8.048,  19.071,   6.842, 162.631, 113.645, 170.187]
dataset = [../input/pcs/ytn_dy_pcs.dat, Dy, 1.0, CONST, MEAN, SVD, 7.585, 24.964, 8.048, -21.164, -11.060, 131.562, 136.607, 140.271]
END
</code>
</pre>

## 3.3) Búsqueda en rejilla del cuerpo rígido del ligando con PCS

En este protocolo se intenta un docking global del ligando, que es una tarea notoriamente difícil. Para aprovechar todo el potencial de los PCS para restringir el espacio de búsqueda conformacional y acotar el docking del ligando a unas pocas regiones de unión favorables con baja puntuación de PCS, se realiza una búsqueda en rejilla de los grados de libertad de cuerpo rígido del ligando en una capa alrededor de la proteína. Además, se prueban distintas conformaciones del ligando (20 en esta captura del protocolo). Los nodos de la rejilla correspondientes a los centros de masa del ligando con la menor puntuación de PCS se escriben en un archivo PDB, que luego sirve de entrada para RosettaLigand en el siguiente paso del protocolo. Opcionalmente, la búsqueda en rejilla del cuerpo rígido puede ir seguida de un breve paso de docking de alta resolución con el fin de crear un modelo all-atom físicamente realista del complejo de encuentro proteína-ligando.

Ve al subdirectorio **3\_rbsearch** y ejecuta la aplicación de línea de comandos _ligand\_transform\_with\_pcs_.

<code>~/Rosetta/main/source/bin/ligand\_transform\_with\_pcs.linuxgccrelease -help</code>

Esto imprimirá las opciones relevantes de esta aplicación junto con sus descripciones y valores por defecto. Ahora ejecuta la aplicación con el archivo de opciones proporcionado (_rbsearch.options_). Asegúrate de que la ruta al archivo PDB, al de PCS y al de parámetros de residuo de pYTN, que están los tres en el directorio **input**, sea correcta.

<code>~/Rosetta/main/source/bin/ligand\_transform\_with\_pcs.linuxgccrelease @ rbsearch.options</code>

Por defecto se realizan 20 trayectorias independientes con magnitudes de traslación y de rotación de 4 Å y 20°, respectivamente, y las coordenadas de GRB2 y de pYTN se escriben como archivos PDB. Además, los centros de masa (COM) de las poses de docking de pYTN al final de cada cálculo se guardan como registros HETATM en el archivo PDB _YTN\_centroids\_pcs\_dock.pdb_. Ten en cuenta que los COM de pYTN están situados cerca unos de otros, lo que indica que la búsqueda en rejilla con PCS ha encontrado una posición de docking favorable con baja puntuación de PCS.

## 3.4) Ejecución del docking proteína-ligando de Rosetta con PCS

Ve al subdirectorio **4\_docking**, desde el que ejecutarás RosettaLigand. Usa los ajustes por defecto indicados en el archivo de opciones (_ligdock.options_) y en el script XML de Rosetta (_ligdock.pcs.xml_). Para una descripción detallada de los distintos componentes del protocolo RosettaLigand tal como está implementado en Rosetta Scripts, remitimos al lector a las referencias [6] y [7]. Asegúrate de que la ruta al archivo PDB con los COM de pYTN del paso anterior se pase correctamente al StartFromMover. Además, la ruta al archivo de entrada de PCS de pYTN debe darse como argumento al PCSMultiGrid en la sección &lt;SCORINGGRIDS&gt; del script de Rosetta. El peso de la puntuación de rejilla de PCS del ligando (p. ej., 20 en esta captura del protocolo) se determinó de forma similar a los protocolos 1) y 2), optimizándolo respecto de la puntuación de rejilla total del ligando (<code>total\_score\_X</code>). El peso de la puntuación de PCS en la función de puntuación all-atom del ligando, definida al comienzo del script XML de Rosetta en la sección &lt;SCOREFXNS&gt;, se fija en 1/10 de la puntuación de rejilla de PCS del ligando:

<code>
&lt;Reweight scoretype=&quot;nmr\_pcs&quot; weight=&quot;2.00&quot;/&gt;
</code>

Inicia RosettaLigand escribiendo en la terminal:
<pre>
<code>~/Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease -parser:protocol ligdock.pcs.xml @ ligdock.options</code>
</pre>
Se creará un silent file de Rosetta (_GRB2\_YTN\_dock\_pcs.out_) y un scorefile (_GRB2\_YTN\_dock\_pcs.sc_) con 10 modelos de GRB2 con pYTN. Aumenta el valor de la opción <code>-out:nstruct</code> si quieres crear más modelos. Normalmente, para el docking proteína-ligando se generan entre 10,000 y 100,000 modelos y los cálculos se ejecutan en varias CPU de un clúster. Si quieres extraer los modelos de docking como archivos PDB del silent file, puedes usar de nuevo la aplicación _extract\_pdbs_ de Rosetta. Esta vez también debes proporcionar el archivo params de pYTN con la opción <code>-in:file:extra\_res\_fa</code>.

Por último, la puntuación de interfaz del ligando, la puntuación de PCS y el RMSD del ligando sin superposición respecto de la estructura de rayos X de GRB2-pYTN se pueden extraer del scorefile con el script de python _extract\_scores.py._ Luego se pueden graficar los valores para crear gráficos de Score frente a RMSD.
<pre>
<code>../../scripts/extract_scores.py GRB2_YTN_dock_pcs.sc --columns interface_delta_X nmr_pcs ligand_rms_no_super_X description</code>
</pre>
Como alternativa, el RMSD del ligando se puede calcular respecto de la solución de docking de menor puntuación extrayendo el mejor modelo del silent file y pasándolo como PDB nativo al InterfaceScoreCalculatorMover en el script XML de Rosetta.

# 4) Docking proteína-proteína

Este protocolo presenta cómo usar RosettaNMR junto con PCS para el docking proteína-proteína. Como sistema de ejemplo se usa un complejo proteico heterodimérico formado por las subunidades &epsilon; y &theta; de la ADN polimerasa III de _E. coli_. Un modelo estructural del complejo (PDB 2XY8) se determinó previamente a partir de datos de PCS [8]. La proteína presenta un sitio natural de unión a metales formado por los residuos D12, E14 y D167, que se empleó para marcar con iones lantánidos.

Ve a la carpeta **4\_protein\_docking**. En este directorio hay cuatro subcarpetas: una carpeta **input** y otras tres, una por cada uno de los tres pasos de este protocolo:

- preempaquetado de los compañeros de docking de la proteína (**1\_prepack**)
- docking proteína-proteína con PCS (**2\_docking**)
- nueva puntuación de los modelos de docking con PCS (**3\_rescore**)

El directorio **input** contiene los siguientes archivos:

- Estructura de 2XY8 en formato PDB; solo el primer modelo del conjunto de RMN (_2xy8.pdb_)
- Archivo de entrada de PCS (_2xy8.pcs.inp_)
- Archivos de datos de PCS (en formato Rosetta); ubicados en el directorio **pcs**; un archivo de datos por cada uno de los tres lantánidos (Tb<sup>3+</sup>, Dy<sup>3+</sup>, Er<sup>3+</sup>)

Ten en cuenta que la secuencia de la proteína se ha renumerado para ajustarse al esquema de numeración de Pose de Rosetta, según el cual la secuencia de la proteína comienza en la posición 1 y todos los residuos se numeran de forma consecutiva. La subunidad &epsilon; es la cadena A (residuos 1-174) y la subunidad &theta; es la cadena B (residuos 175-235). El ion calcio del archivo PDB se ha eliminado por las dificultades actuales para ejecutar el docking de Rosetta en la etapa centroid de baja resolución con residuos de iones metálicos. La eliminación de iones metálicos y otros ligandos del archivo PDB, y la renumeración de los residuos, se pueden hacer con el script _clean\_pdb.py_ de Rosetta, que se encuentra en el repositorio de herramientas de Rosetta, en **~/Rosetta/tools/protein\_tools/scripts/clean\_pdb.py**. Para puntuar con PCS no es necesario que el ion metálico forme parte del modelo estructural, y podemos definir un residuo de la proteína que lo coordine como centro de la búsqueda en rejilla al determinar la posición del tensor &Delta;&chi;.

## 4.1) Preempaquetado de los compañeros de docking de la proteína

Para preparar las dos cadenas de proteína para el docking con Rosetta, se ejecuta la aplicación Docking Prepack, que optimiza las conformaciones de las cadenas laterales mediante empaquetado de rotámeros. Con esto se asegura de que las cadenas laterales fuera de la interfaz de docking tengan conformaciones de baja energía, lo que es esencial para la puntuación de los modelos.

Ve al subdirectorio **1\_prepack** y ejecuta Docking Prepack escribiendo el siguiente comando en la terminal:

<code>~/Rosetta/main/source/bin/docking\_prepack\_protocol.linuxgccrelease @ prepack.options</code>

Usa las opciones proporcionadas en el archivo de texto _prepack.options_.

## 4.2) Ejecución del docking proteína-proteína de Rosetta con PCS

Ve al directorio **2\_docking**. Para ejecutar el docking proteína-proteína de Rosetta con PCS se usa la aplicación Rosetta Scripts. En este directorio se han preparado para ti un script XML de entrada de Rosetta (_docking.pcs.xml_) y un archivo de opciones (_docking.options_). Echa un vistazo al archivo de opciones. Como estamos ejecutando un docking global, la orientación de los dos compañeros de docking, especificados con la opción <code>-docking:partners</code>, se aleatoriza al comienzo de cada trayectoria. Las opciones <code>-docking:randomize1</code> y <code>-docking:randomize2</code> del archivo de opciones aleatorizan la orientación del primer y del segundo compañero de docking, respectivamente. Si no quieres hacer un docking proteína-proteína global, no uses esas opciones. Además, se realiza otra perturbación inicial de cuerpo rígido de las dos subunidades de la proteína, con una magnitud de traslación y de rotación de 3 Å y 8°, respectivamente (consulta la opción <code>-docking:dock\_pert 3 8</code> del archivo de opciones).

Usa el peso de la puntuación de PCS tal como se indica en la sección &lt;SCOREFXNS&gt; del script XML de Rosetta. Se determinó de manera similar a lo descrito antes en los protocolos 1) y 2): primero se crean 10000 decoys sin PCS y luego se vuelven a puntuar con PCS. El peso de la puntuación de PCS se optimizó así respecto de la energía de unión tras separar y reempaquetar ambos compañeros de docking (es decir, la puntuación ddg de Rosetta) con el conjunto de pesos ref2015.

Ejecuta el docking proteína-proteína de Rosetta escribiendo el siguiente comando en la terminal:
<pre>
<code>~/Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease -parser:protocol docking.pcs.xml @ docking.options</code>
</pre>

que ejecutará el docking sobre el modelo preempaquetado del paso 4.1) y creará 3 modelos de salida (_2xy8\_docking.out_). Como alternativa, el docking se puede iniciar a partir de un conjunto de distintas estructuras de entrada especificadas en un archivo de lista (<code>-in:file:l</code>), y el número de modelos de salida se puede aumentar fijando la opción <code>-out:nstruct</code> en un valor mayor. Normalmente, para el docking proteína-proteína se crean entre 10,000 y 100,000 modelos y los cálculos se ejecutan en varias CPU de un clúster.

## 4.3) Nueva puntuación de los modelos de docking con PCS

Cuando termine la ejecución del docking, vuelve a puntuar los modelos de salida con los datos de PCS. Este paso es necesario porque la puntuación de PCS que se informó en el scorefile al final del protocolo de docking se evaluó al calcular la energía de unión de Rosetta (ddg). Como el cálculo del ddg se hace separando los dos compañeros de unión, la puntuación de PCS es incorrecta, porque debe evaluarse sobre el complejo proteico completo en estado unido.

Para volver a puntuar los modelos de docking con PCS, usa la aplicación _score\_jd2_ de Rosetta:
<pre>
<code>~/Rosetta/main/source/bin/score_jd2.linuxgccrelease @ rescore.pcs.options \
-in:file:silent ../2\_docking/2xy8_docking.out -out:file:scorefile 2xy8_docking_pcs_rescored.sc</code>
</pre>

Por último, la energía de unión (ddg), la puntuación de PCS y el RMSD de interfaz del modelo respecto de la estructura experimental de 2XY8 se pueden extraer del scorefile con el script de python _extract\_scores.py,_ y los valores se grafican para crear gráficos de Score frente a RMSD.
<pre>
<code>../../scripts/extract_scores.py 2xy8_docking_pcs_rescored.sc --columns ddg nmr_pcs Irmsd description</code>
</pre>

# 5) Apéndice

## 5.1) Descripción del formato de los archivos de entrada de PCS, RDC y PRE

Los conjuntos de datos de PCS y de PRE medidos con distintos tipos de marcas de spin o en distintos sitios de marcaje, y los conjuntos de datos de RDC recogidos con distintos medios de alineamiento (o iones metálicos), deben colocarse en secciones separadas del archivo de entrada. Cada sección debe comenzar con la palabra clave **MULTISET** y terminar con la palabra clave **END**. Los conjuntos de datos de PCS obtenidos con distintos iones metálicos pero en el mismo sitio de marcaje deben agruparse dentro de la misma sección MULTISET, porque durante el cálculo se optimizan juntas las coordenadas de sus iones metálicos. En el caso de los RDC, los conjuntos de datos de distintos tipos de átomos (p. ej., N-H, CA-HA) medidos con el mismo tipo de medio de alineamiento deben agruparse en la misma sección MULTISET, porque comparten el mismo tensor de alineamiento. Y para los PRE, la sección MULTISET incluye los conjuntos de datos de PRE recogidos con el mismo ion metálico o radical en el mismo sitio de marcaje. También se recomienda colocar los datos de relajación R<sub>1</sub> y R<sub>2</sub> en MULTISET separados o aplicar un preescalado, porque sus valores suelen diferir en varios órdenes de magnitud. Además, los datos de relajación medidos en distintas condiciones experimentales (temperatura, masa de la proteína, viscosidad) también deben colocarse en secciones MULTISET separadas, ya que los tiempos de correlación de la marca de spin y de la proteína serán distintos.

Cada sección MULTISET contiene una colección de pares clave-valor. Cada par debe estar separado por un signo igual (=) y colocarse en una línea nueva. El valor puede ser un valor numérico, un carácter, una cadena literal o una lista de cualquiera de los tipos anteriores. Los valores múltiples se agrupan en un vector, entre corchetes ([ ]) y separados por comas. En la **Tabla 1** se proporciona una lista de las palabras clave posibles de MULTISET para cada uno de los tres tipos de archivos de entrada.

Una observación adicional sobre los tipos de pesos que se pueden aplicar a los datos de entrada en la puntuación. Además de los pesos globales de PCS, RDC o PRE que se fijan mediante la función de puntuación de Rosetta, es posible ponderar los datos de RMN de entrada en otros tres niveles:

- Pesos de MULTISET (esta opción está disponible para PCS, RDC y PRE y los pesos se asignan mediante una opción de línea de comandos, p. ej., <code>-nmr:pcs:multiset</code>)
- Pesos de SINGLESET (a conjuntos de datos o experimentos individuales de PCS o PRE obtenidos con distintos iones metálicos pero que pertenecen al mismo MULTISET se les pueden asignar pesos distintos mediante un argumento posicional del vector del conjunto de datos en el archivo de entrada; consulta la **Tabla 1** más abajo)
- A cada punto de datos individual se le asigna un peso que depende de su error y de su magnitud (los modos posibles son **CONST**, **SIGMA** u **OBSIG**; consulta las explicaciones en la nota al pie de la **Tabla 1**)

**Tabla 1: Palabras clave del archivo de entrada de PCS, RDC y PRE.**

**Archivo de entrada de PCS**
<pre>
------------------------------------------------------------------------------------------------------------------------------------------------
**Palabra clave**     **Explicación**                                                          **¿Obligatorio?**  **Ejemplo**
--------------------- ------------------------------------------------------------------------ ------------------ ---------------------------------
spinlabel_position    Número de residuo del sitio de la marca de spin. Este residuo se         Sí                 spinlabel_position = 58
                      convierte en el punto de anclaje de la búsqueda en rejilla de las
                      coordenadas del ion metálico. Como alternativa, si se da un valor para
                      la palabra clave spinlabel_type, la búsqueda en rejilla se reemplazará
                      por un residuo ficticio de marca de spin que se modela en esta posición
                      de la proteína para determinar las coordenadas del ion metálico.

chain_id              El ID de la cadena de la proteína que incluye el sitio de la marca de    Sí                 chain_id = A
                      spin.

gridsearch            Vector de parámetros que definen la búsqueda en rejilla del ion          Sí                 gridsearch =
                      metálico. Los elementos de este vector van en el siguiente orden:                           [CA, CB, 10.0, 4.0, 0.0, 20.0]
                      nombres de los átomos 1 y 2, que se usan para definir el centro de la
                      búsqueda en rejilla, la distancia entre el átomo 1 y el centro de la
                      búsqueda en rejilla (en A), el tamaño de paso de la búsqueda en rejilla
                      (en A), y el radio mínimo y máximo de la búsqueda en rejilla (en A). El
                      centro de la búsqueda en rejilla se encuentra en una recta que pasa por
                      los átomos 1 y 2 y está situado a una distancia definida del átomo 1. La
                      posición del ion metálico con la menor puntuación de PCS se busca dentro
                      de un rango entre el radio mínimo y el máximo alrededor del centro de la
                      búsqueda en rejilla.

spinlabel_type        Código de tres letras del tipo de residuo de la marca de spin, tal como  Sí, pero se puede  spinlabel_type = R1A
                      está guardado en la base de datos de Rosetta. Por ejemplo, R1A es el     reemplazar por
                      código del residuo de la marca de spin MTSL. (Consulta                   gridsearch
                      ~/Rosetta/main/database/scoring/nmr/spinlabel/spinlabel_properties.txt
                      para ver una lista de los tipos de residuos de marcas de spin
                      disponibles actualmente en Rosetta)

dataset               Vector de parámetros de entrada para un único conjunto de datos de PCS   Sí                 dataset =
                      recogido con un ion metálico. El vector debe contener exactamente 14                        [2k61_dapk_exp_pcs_dy.txt,
                      elementos en el siguiente orden: nombre y ubicación del archivo de datos                    Dy, 1.0, CONST, MEAN, SVD, 10.0,
                      de PCS, etiqueta del ion metálico, factor de ponderación de este                            10.0, 10.0, 40.0, 4.0, 10.0,
                      conjunto de datos de PCS, tipo de ponderación de los PCS individuales                       10.0, 10.0]
                      (ver las explicaciones más abajo*), tipo de promedio para un valor de
                      PCS asignado a un grupo de átomos (MEAN o SUM), tipo de ajuste del
                      tensor &Delta;&chi; (SVD = descomposición en valores singulares, NLS =
                      ajuste por mínimos cuadrados no lineales) y los ocho parámetros del
                      tensor &Delta;&chi; (xM, yM, zM, χax, χrh, &alpha;, &beta;, &gamma;). En
                      muchos casos, p. ej., en la predicción de estructuras de novo, los
                      parámetros del tensor se pueden fijar en valores aleatorios, ya que se
                      determinarán automáticamente durante el cálculo. Sin embargo, otros
                      protocolos, p. ej., el docking de ligandos con PCS, requieren que los
                      parámetros del tensor se determinen antes del cálculo de Rosetta y se
                      introduzcan en el vector del conjunto de datos.

fixed_tensor          No ajusta el tensor &Delta;&chi;, sino que calcula la puntuación de PCS  Opcional           fixed_tensor = true
                      a partir de los valores del tensor introducidos en la lista del conjunto
                      de datos. Esto se necesita para el docking proteína-ligando (Por
                      defecto: false).
------------------------------------------------------------------------------------------------------------------------------------------------
</pre>
**Archivo de entrada de PRE**
<pre>
------------------------------------------------------------------------------------------------------------------------------------------------
**Palabra clave**     **Explicación**                                                          **¿Obligatorio?**  **Ejemplo**
--------------------- ------------------------------------------------------------------------ ------------------ ---------------------------------
spinlabel_position    Consulta la explicación de esta palabra clave en el archivo de entrada   Sí                 spinlabel_position = 58
                      de PCS más arriba.

chain_id              Consulta la explicación de esta palabra clave en el archivo de entrada   Sí                 chain_id = A
                      de PCS más arriba.

spinlabel_type        Consulta la explicación de esta palabra clave en el archivo de entrada   Sí, pero se puede  spinlabel_type = R1A
                      de PCS más arriba.                                                       reemplazar por
                                                                                               gridsearch

gridsearch            Consulta la explicación de esta palabra clave en el archivo de entrada   Sí, pero se puede  gridsearch =
                      de PCS más arriba.                                                       reemplazar por     [CA, CB, 10.0, 4.0, 0.0, 20.0]
                                                                                               spinlabel_type

ion_type              Nombre del átomo radical o del ion paramagnético, tal como está guardado Sí                 ion_type = Cu2+
                      en la base de datos de Rosetta (consulta
                      ~/Rosetta/main/database/chemical/element_sets/default/para_ion_properties.txt
                      como referencia)

protein_mass          Masa molecular de la proteína (en kDa).                                  Sí                 protein_mass = 6.2

temperature           Temperatura a la que se registraron los conjuntos de datos de PRE (en    Sí                 temperature = 278.0
                      Kelvin).

dataset               Vector de parámetros de entrada para un único conjunto de datos de PRE.  Sí                 dataset =
                      Debe contener exactamente cinco elementos en el siguiente orden: nombre                     [8c_edta_cu2_nr1_alt.txt,
                      y ubicación del archivo de datos de PRE, factor de ponderación de este                      1.0, CONST, R1, 500]
                      conjunto de datos de PRE, tipo de ponderación de los PRE individuales
                      (ver las explicaciones más abajo\*), tipo de datos de relajación (R1 o
                      R2) e intensidad del campo magnético en MHz.

averaging             Tipo de promedio para un valor de PRE asignado a un grupo de átomos. Los Opcional           averaging = MEAN
                      valores posibles son MEAN y SUM (Por defecto: MEAN).

tauc_min              Límite inferior de tauc$ (en ns).                                        Opcional           tauc_min = 1.0

tauc_max              Límite superior de tauc$ (en ns).                                        Opcional           tauc_max = 15.0
------------------------------------------------------------------------------------------------------------------------------------------------
</pre>
**Archivo de entrada de RDC**
<pre>
------------------------------------------------------------------------------------------------------------------------------------------------
**Palabra clave**     **Explicación**                                                          **¿Obligatorio?**  **Ejemplo**
--------------------- ------------------------------------------------------------------------ ------------------ ---------------------------------
alignment_medium      Nombre del medio de alineamiento. Este valor no se usa realmente en el   Sí                 alignment_medium = phage
                      cálculo, sino que tiene un propósito puramente descriptivo.

computation_type      Tipo de ajuste del tensor de alineamiento. Las opciones posibles son:    Sí                 computation_type = SVD
                      SVD (descomposición en valores singulares), NLS (ajuste por mínimos
                      cuadrados no lineales), NLSDA (NLS con valor fijo de la magnitud de
                      alineamiento Da), NLSR (NLS con valor fijo de la rombicidad R), NLSDAR
                      (NLS con valor fijo de Da y R). Ten en cuenta que, para los tipos de
                      cálculo NLSDA, NLSR y NLSDAR, la magnitud de alineamiento Da y/o la
                      rombicidad R también deben darse en el archivo de entrada.

dataset               Vector de parámetros de entrada para un único conjunto de datos de RDC   Sí                 dataset =
                      recogido para un tipo de átomo. El vector debe contener exactamente tres                    [2k61_dapk_nh.txt,1.0,SIGMA]
                      elementos en el siguiente orden: nombre y ubicación del archivo de datos
                      de RDC, factor de ponderación de este conjunto de datos de RDC, tipo de
                      ponderación de los RDC individuales (ver las explicaciones más abajo\*).

alignment_tensor      Vector de los cinco valores del tensor de alineamiento en el siguiente   Sí                 alignment_tensor =
                      orden: Da, R, &alpha;, &beta;, &gamma;. Si se elige uno de los tipos de                     [-14.217, 0.530, 10.0, 10.0, 10.0]
                      cálculo NLSDA, NLSR o NLSDAR, el valor de Da y/o R se leerá de este
                      vector. Todos los demás valores se volverán a determinar durante el
                      cálculo y se pueden fijar en valores iniciales aleatorios.

averaging             Tipo de promedio de un valor de RDC si la asignación abarca un grupo de  Opcional           averaging = MEAN
                      pares de átomos. Los valores posibles son MEAN y SUM (Por defecto:
                      MEAN).

fixed_tensor          No ajusta el tensor de alineamiento, sino que calcula la puntuación de   Opcional           fixed_tensor = true
                      RDC a partir de los valores dados en la lista alignment_tensor (Por
                      defecto: false).
------------------------------------------------------------------------------------------------------------------------------------------------
</pre>
\*Existen tres opciones para ponderar la contribución de los puntos de datos individuales a la puntuación total:

**CONST**: todos los puntos de datos tienen el mismo peso, es decir, w=1.0

**SIGMA**: los puntos de datos tienen un peso proporcional al inverso de su error, es decir, w=1/&sigma;<sup>2</sup>

**OBSIG**: los puntos de datos tienen un peso proporcional al inverso de su error y a su magnitud relativa al valor máximo observado, es decir, w=1/(&sigma;<sup>2</sup>)*(&delta;<sub>obs</sub>/&delta;<sub>obs,max</sub>)

$Consulta la referencia [9] para la definición de estos tiempos de correlación.

**Tabla 2: Opciones de PCS, RDC y PRE.**
<pre>
------------------------------------------------------------------------------------------------------------------------------------------------
**Opciones de PCS**                           **Explicación**
--------------------------------------------- --------------------------------------------------------------------------------------------------
-nmr:pcs:input_file                           Nombre del archivo de entrada de PCS (la única opción obligatoria; ver la descripción del formato
                                              más arriba).

nmr:pcs:optimize_tensor                       Optimiza la posición del ion metálico y los demás valores del tensor &Delta;&chi; después de la
                                              búsqueda en rejilla inicial (Por defecto: false).

-nmr:pcs:nls_repeats                          Número de repeticiones en el ajuste por mínimos cuadrados no lineales del tensor &Delta;&chi; (Por
                                              defecto: 5).

-nmr:pcs:multiset_weights                     Vector de pesos por los que se multiplican las puntuaciones de distintos multiconjuntos de PCS. Un
                                              multiconjunto incluye todos los conjuntos de datos de PCS recogidos en el mismo sitio de marcaje
                                              de spin pero con distintos iones metálicos. Si no se fija explícitamente, queda como un vector de
                                              1.0.

-nmr:pcs:normalize_data                       Normaliza los valores de PCS de cada conjunto de datos por su desviación estándar (Por defecto:
                                              false).

-nmr:pcs:use_symmetry_calc                    Calcula la puntuación de PCS considerando las contribuciones de todas las subunidades simétricas
                                              (Por defecto: false). Los valores de PCS deben asignarse solo a los átomos de la subunidad
                                              asimétrica en el archivo de entrada de datos. Ten en cuenta que esta opción se desarrolló para
                                              casos de simetría Cn y Dn, pero no se ha probado en sistemas con otros tipos de simetría.

-nmr:pcs:show_info                            Muestra el tensor &Delta;&chi; y una tabla de valores de PCS experimentales frente a calculados en
                                              cada paso de puntuación (Por defecto: false). Ten en cuenta que, para imprimir esta información en
                                              pantalla o en el archivo de registro, también se requiere que el nivel de salida del tracer
                                              (-out:level) esté fijado en 500 (modo debug). Ten cuidado: ¡esto hará que el archivo de registro
                                              sea muy grande!
------------------------------------------------------------------------------------------------------------------------------------------------
</pre>
<pre>
------------------------------------------------------------------------------------------------------------------------------------------------
**Opciones de RDC**                           **Explicación**
--------------------------------------------- --------------------------------------------------------------------------------------------------
-nmr:rdc:input_file                           Nombre del archivo de entrada de RDC (la única opción obligatoria; ver la descripción del formato
                                              más arriba).

-nmr:rdc:nls_repeats                          Número de repeticiones en el ajuste por mínimos cuadrados no lineales del tensor de alineamiento
                                              (Por defecto: 5).

-nmr:rdc:multiset_weights                     Vector de pesos por los que se multiplican las puntuaciones de distintos multiconjuntos de RDC. Un
                                              multiconjunto incluye todos los conjuntos de datos de RDC recogidos con el mismo medio de
                                              alineamiento o ion lantánido y con varios tipos de átomos distintos (p. ej., N-H, CA-HA). Si no se
                                              fija explícitamente, queda como un vector de 1.0.

-nmr:rdc:normalization_type                   Aplica un escalado a los valores de RDC de entrada respecto de los de un tipo de átomo elegido.
                                              Las opciones posibles son NH, CH o none. Por defecto, no se espera que los RDC estén normalizados
                                              y se escalarán respecto de la constante de acoplamiento dipolar de NH (opción &quot;NH&quot;).
                                              Como alternativa, los RDC de entrada se pueden escalar respecto de la constante de acoplamiento
                                              dipolar de CA-HA (opción &quot;CH&quot;) o dejarse sin modificar (opción &quot;none&quot;).

-nmr:rdc:correct_sign                         Usa el signo correcto de la razón giromagnética de 15N y, por tanto, de las constantes de
                                              acoplamiento dipolar, es decir, positivo para NC y NH y negativo para CH (Por defecto: false). Usa
                                              esta opción si los acoplamientos de entrada tienen signos distintos. Por defecto, la razón
                                              giromagnética de 15N se trata como positiva y las constantes de acoplamiento dipolar tienen el
                                              mismo signo.

-nmr:rdc:use_symmetry_calc                    Calcula la puntuación de RDC considerando las contribuciones de todas las subunidades simétricas
                                              (Por defecto: false). Los valores de RDC deben asignarse solo a los átomos de la subunidad
                                              asimétrica en el archivo de entrada de datos. Ten en cuenta que esta opción se desarrolló para
                                              casos con simetría Cn y Dn, pero no se ha probado en sistemas con otros tipos de simetría.

-nmr:rdc:show_info                            Muestra el tensor de alineamiento y una tabla de valores de RDC experimentales frente a calculados
                                              en cada paso de puntuación (Por defecto: false). Ten en cuenta que, para imprimir esta información
                                              en pantalla o en el archivo de registro, también se requiere que el nivel de salida del tracer
                                              (-out:level) esté fijado en 500 (modo debug). Ten cuidado: ¡esto hará que el archivo de registro
                                              sea muy grande!
------------------------------------------------------------------------------------------------------------------------------------------------
</pre>
<pre>
------------------------------------------------------------------------------------------------------------------------------------------------
**Opciones de PRE**                           **Explicación**
--------------------------------------------- --------------------------------------------------------------------------------------------------
-nmr:pre:input_file                           Nombre del archivo de entrada de PRE (la única opción obligatoria; ver la descripción del formato
                                              más arriba).

-nmr:pre:nls_repeats                          Número de repeticiones en el ajuste por mínimos cuadrados no lineales del tiempo de correlación de
                                              la marca de spin (Por defecto: 3).

-nmr:pre:multiset_weights                     Vector de pesos por los que se multiplican las puntuaciones de distintos multiconjuntos de PRE. Un
                                              multiconjunto incluye todos los conjuntos de datos de PRE recogidos en el mismo sitio de marcaje
                                              de spin con el mismo tipo de marca de spin o de ion metálico. Si no se fija explícitamente, queda
                                              como un vector de 1.0.

-nmr:pre:normalize_data                       Normaliza los valores de PRE de cada conjunto de datos por su desviación estándar (Por defecto:
                                              false).

-nmr:pre:use_symmetry_calc                    Calcula la puntuación de PRE considerando las contribuciones de todas las subunidades simétricas
                                              (Por defecto: false). Los valores de PRE deben asignarse solo a los átomos de la subunidad
                                              asimétrica en el archivo de entrada de datos. Ten en cuenta que esta opción se desarrolló para
                                              casos con simetría Cn y Dn, pero no se ha probado en sistemas con otros tipos de simetría.

-nmr:pre:show_info                            Muestra una tabla de valores de PRE experimentales frente a calculados en cada paso de puntuación
                                              (Por defecto: false). Ten en cuenta que, para imprimir esta información en pantalla o en el
                                              archivo de registro, también se requiere que el nivel de salida del tracer (-out:level) esté
                                              fijado en 500 (modo debug). Ten cuidado: ¡esto hará que el archivo de registro sea muy grande!
------------------------------------------------------------------------------------------------------------------------------------------------
</pre>
<pre>
------------------------------------------------------------------------------------------------------------------------------------------------
**Opciones de la marca de spin**              **Explicación**
--------------------------------------------- --------------------------------------------------------------------------------------------------
-nmr:spinlabel:max_ensemble_size              Número máximo de rotámeros de la marca de spin para representar el conjunto (Por defecto: 20). Si
                                              el tamaño del conjunto supera este umbral, los rotámeros se agrupan por el RMSD de su cadena
                                              lateral. Esto sirve para acelerar el cálculo.

-nmr:spinlabel:highres_conformer_filter_type  Tipo de detección de choques de los confórmeros de la marca de spin con los residuos vecinos de la
                                              proteína en el modo all-atom de Rosetta. Los valores posibles son DISTANCE y BUMP_ENERGY. En el
                                              primer caso, se considera que un confórmero tiene un choque si cualquiera de los átomos pesados de
                                              su cadena lateral está dentro del radio de vecindad de cualquiera de los residuos de aminoácido
                                              vecinos. En el segundo método, los choques se detectan calculando la energía de bump de un
                                              confórmero de la marca de spin con su entorno proteico. El valor por defecto es BUMP_ENERGY,
                                              mientras que en la etapa centroid de Rosetta el método DISTANCE es el único disponible. (Por
                                              defecto: BUMP_ENERGY).

-nmr:spinlabel:elaborate_rotamer_clash_check  Realiza una comprobación elaborada de choques de cada átomo pesado de todos los rotámeros de la
                                              marca de spin con los átomos pesados de los residuos circundantes (Por defecto: false). Si todos
                                              los rotámeros producen al menos un choque, devuelve el rotámero con el menor número de choques
                                              atómicos. Si es false, considera solo los átomos pesados de los rotámeros sin choques y devuelve
                                              un rotámero aleatorio de la marca de spin en caso de que no queden rotámeros sin choques.

-nmr:spinlabel:boltzmann_kt                   Factor de escala para la ponderación de Boltzmann de las probabilidades de los confórmeros de la
                                              marca de spin (Por defecto: 2.0).
------------------------------------------------------------------------------------------------------------------------------------------------
</pre>

# 6) Referencias

1. Peters, F., et al., _Cys-Ph-TAHA: a lanthanide binding tag for RDC and PCS enhanced protein NMR._ J Biomol NMR, 2011. **51** (3): p. 329-37.

2. Olivieri, C., et al., _Simultaneous detection of intra- and inter-molecular paramagnetic relaxation enhancements in protein complexes._ J Biomol NMR, 2018. **70** (3): p. 133-140.

3. Gront, D., et al., _Generalized fragment picking in Rosetta: design, protocols and applications._ PLoS One, 2011. **6** (8): p. e23294.

4. Parsons, L.M., A. Grishaev, and A. Bax, _The periplasmic domain of TolR from Haemophilus influenzae forms a dimer with a large hydrophobic groove: NMR solution structure and comparison to SAXS data._ Biochemistry, 2008. **47** (10): p. 3131-42.

5. Dimaio, F., et al., _Modeling symmetric macromolecular structures in rosetta3._ PLoS One, 2011. **6** (6): p. e20450.

6. Lemmon, G. and J. Meiler, _Rosetta Ligand docking with flexible XML protocols._ Methods Mol Biol, 2012. **819** : p. 143-55.

7. DeLuca, S., K. Khar, and J. Meiler, _Fully Flexible Docking of Medium Sized Ligand Libraries with RosettaLigand._ PLoS One, 2015. **10** (7): p. e0132508.

8. Schmitz, C. and A.M. Bonvin, _Protein-protein HADDocking using exclusively pseudocontact shifts._ J Biomol NMR, 2011. **50** (3): p. 263-6.

9. Iwahara, J., C.D. Schwieters, and G.M. Clore, _Ensemble approach for NMR structure refinement against_ <sup>_1_</sup>_H paramagnetic relaxation enhancement data arising from a flexible paramagnetic group attached to a macromolecule._ J Am Chem Soc, 2004. **126** (18): p. 5879-96.

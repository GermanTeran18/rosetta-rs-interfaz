Documentación creada por Brahm Yachnin (brahm.yachnin@rutgers.edu), laboratorio Khare, y Chris Bailey-Kellogg (cbk@cs.dartmouth.edu).
Última edición: 24 de mayo de 2021.

[[_TOC_]]

## Propósito

Las `mhc_energy_tools` son scripts de Python complementarios para usar con el [[término de guía orientado al diseño|design-guidance-terms]] [[MHCEpitopeEnergy]].  En resumen, el script `mhc_score.py` se usa para analizar secuencias de proteínas existentes, archivos PDB o listas de péptidos con el fin de identificar secuencias inmunogénicas críticas.  El script `mhc_gen_db.py` se usa para generar una base de datos SQL a partir de un archivo FASTA o PDB, con varios métodos para indicar los residuos diseñables y sus identidades.  Estas bases de datos se pueden usar luego para puntuar Poses durante el empaquetado con un término `mhc_energy` y el predictor `MHCEpitopePredictorExternal` (consulta [[MHCEpitopeEnergy]] para más detalles).

## Información de citación

Si usas las herramientas de Python, ya sea en el contexto de mhc_epitope o de forma independiente, cita los artículos correspondientes como se describe aquí.

El método de energía MHCEpitopeEnergy, el término de puntuación mhc_epitope, las herramientas mhc energy tools y el benchmark se describen en la siguiente publicación.  Si los usas, cita el siguiente artículo:

Yachnin BJ, Mulligan VK, Khare SD, and Bailey-Kellogg C.  (2021).  MHCEpitopeEnergy, a flexible Rosetta-based biotherapeutic deimmunization platform.  J Chem Inf Model 61(5):2368-2382.  doi: 10.1021/acs.jcim.1c00056.  https://pubmed.ncbi.nlm.nih.gov/33900750/

Además de la funcionalidad de Rosetta, mhc_epitope hace uso de varios recursos de desinmunización desarrollados fuera de la comunidad de Rosetta.  Como condición para usar este código, es imprescindible que los recursos que uses se citen de manera apropiada en cualquier publicación resultante.

### ProPred

Las matrices de ProPred se proporcionan en la base de datos de Rosetta (`/main/database/scoring/score_functions/mhc_epitope/propred8.txt`) y las usa el archivo de configuración «predeterminado», `propred8_5.mhc`.

Las matrices se obtienen de http://crdd.osdd.net/raghava/propred/  Si usas resultados basados en estas predicciones, cita Singh, H. and Raghava, G.P.S. (2001) ProPred: Prediction of DR binding sites. Bioinformatics, 17(12):1236-37.  http://www.ncbi.nlm.nih.gov/pubmed/11751237

### NetMHCII

NetMHCII se puede incorporar a bases de datos externas con las [[mhc-energy-tools]].  Si usas NetMHCII, cita Improved methods for predicting peptide binding affinity to MHC class II molecules.  Jensen KK, Andreatta M, Marcatili P, Buus S, Greenbaum JA, Yan Z, Sette A, Peters B, Nielsen M. Immunology. 2018 Jan 6. doi: 10.1111/imm.12889

### IEDB
IEDB es una base de datos pública de epítopos inmunitarios validados experimentalmente.  El archivo `iedb_data.mhc` hace referencia al archivo de base de datos `iedb_data.db`, que contiene datos derivados de la IEDB.  Si usas cualquiera de estos archivos, debes citar la IEDB.  Además, las [[mhc-energy-tools]] proporcionan recursos para actualizar y construir archivos de base de datos personalizados basados en datos de la IEDB.

Consulta las siguientes instrucciones de la IEDB relativas al uso de cualquiera de estos recursos:

Se pide a los usuarios que citen la IEDB cuando presenten información obtenida de la IEDB: http://www.iedb.org. La referencia de la revista para la IEDB se actualizó en 2018 y debe citarse como: Vita R, Mahajan S, Overton JA, Dhanda SK, Martini S, Cantrell JR, Wheeler DK, Sette A, Peters B. The Immune Epitope Database (IEDB): 2018 update. Nucleic Acids Res. 2019 Jan 8;47(D1):D339-D343. doi: 10.1093/nar/gky1006. PMID: 30357391

Todas las publicaciones o presentaciones que hagan referencia a datos generados con las herramientas de análisis de recursos de la IEDB deben incluir citas de las referencias pertinentes, que se encuentran en http://tools.iedb.org/main/references/

## mhc_score.py

### Secuencias de entrada

`mhc_score.py` puede aceptar varios tipos de entrada para puntuar.

- Se puede proporcionar una secuencia como argumento posicional en la línea de comandos.  Por ejemplo, `mhc_score.py ILVEQACFPSL`.
- `--fa mysequence.fas` indica un archivo en formato tipo FASTA con **UNA SOLA** secuencia para usar como entrada.  La línea de título `>` es opcional.
- `--fsa sequences.fas` indica un archivo en formato tipo FASTA con **VARIAS** secuencias para usar como entrada.  La línea de título `>` es obligatoria para cada secuencia.
- `--pdb myprotein.pdb` indica un archivo PDB, del cual se extraerá la secuencia para usarla como entrada.
 - `--chain X` especifica qué cadena del archivo PDB considerar.  Si no se especifica, se puntuará todo el archivo PDB.
- `--pep peptides.txt` indica un archivo con una secuencia por línea.  Cada línea se usará como una secuencia de entrada.
- Si no se da ninguna entrada, el usuario puede escribir secuencias individuales en el terminal.  Cada secuencia se puntuará antes de introducir la siguiente.

Notas adicionales:
- Solo usa una fuente de secuencias, comprobando en este orden: línea de comandos, archivo de entrada especificado, stdin
- Las secuencias pueden incluir caracteres '_', que se tratan como no canónicos y que, en la implementación actual, fuerzan a que los péptidos que los contienen no sean epítopos
- El encabezado «tipo FASTA» puede terminar en «@pos» para iniciar ahí la numeración de residuos; por defecto 1
- Manejo bastante rudimentario de archivos PDB: rellena los residuos faltantes con '_' (es decir, sin epítopos) y en general solo trata los veinte códigos de aminoácidos de 3 letras estándar
- En todos los casos, si la secuencia es más corta que la longitud del péptido epítopo de ese predictor (9 para Propred, 15 para NetMHCII), se devolverá una puntuación de 0.

### Predictores

Los predictores determinan cómo puntuar las secuencias.

- `--propred` usa las matrices de Propred para puntuar las secuencias.  Este es el comportamiento predeterminado.  Buscará primero en el directorio actual y luego en la base de datos de Rosetta.  Intentará buscar la base de datos de Rosetta primero con rutas relativas, suponiendo que `tools` y `main` están clonados en el mismo directorio.  Si eso falla y existe la variable de entorno `$ROSETTA`, supondrá que `main` está clonado dentro de ese directorio y buscará la base de datos allí.
- `--matrix MATRIX` usa el archivo `MATRIX` para puntuar las secuencias.
- `--netmhcii` usa el ejecutable netmhcII, indicado por la variable de entorno `$NMHOME`, para puntuar las secuencias.
- `--db DB` usa una base de datos SQL precalculada, generada con `mhc_gen_db.py`, para puntuar las secuencias.
- `--csv CSV` usa un archivo CSV precalculado, generado con `mhc_gen_db.py`, para puntuar las secuencias.

### Detalles de la puntuación

- `--allele_set SET` le indica al predictor que use `SET` como el conjunto de alelos.
 - Con Propred, solo se permiten `all`, `southwood98` o `test`.  Si se usa `test`, solo se usará el alelo DRB1_0101.  El valor predeterminado (`--allele_set all`) es usar todos los alelos especificados en la matriz.
 - Con NetMHCII hay cuatro opciones: `test` puntuará solo el alelo DRB1_0101, y `greenbaum11` (27 alelos), `southwood98` (8 alelos) y `paul15` (7 alelos) usarán listas de alelos publicadas.  `all` usará los 61 alelos disponibles.  `test` es el valor predeterminado.  Más alelos tardan más (no es un gran problema con una sola secuencia de proteína), pero pueden ser más precisos.
- `--alleles ALLELE_LIST` permite proporcionar una lista personalizada de alelos para usar.  No se usa por defecto.
- `--epi_thresh EPI_THRESH` fija el umbral de lo que constituye un «acierto».  Por defecto es 5.00, lo que significa que el 5% superior de las uniones se consideran aciertos.
- `--noncanon {error,warn,silent}` permite especificar el comportamiento si se encuentra un residuo distinto de los 20 aminoácidos canónicos (por ejemplo, ligandos, aminoácidos no canónicos, etc.).  Las opciones son `error` (el script termina), `warn` (se imprime una advertencia) o `silent`.  ¿CÓMO SE TRATAN AQUÍ LOS AMINOÁCIDOS NO CANÓNICOS?  ¿COMO RUPTURAS DE CADENA?  ¿CUÁL ES EL COMPORTAMIENTO PREDETERMINADO?
- `--netmhcii_score {rank,absolute}` especifica si se usa la puntuación por rango (es decir, si está entre el X% superior de las uniones) o la puntuación absoluta (es decir, la afinidad de unión) para determinar si algo es un acierto.  Esto tendrá un impacto en el parámetro `--epi_thresh`.  Por defecto se usa `rank`.
- `--db_unseen {error,warn,score}` especifica, en un predictor de base de datos, qué hacer si se encuentra un péptido que no está en la base de datos.  Las opciones son `error` (el script termina), `warn` (se imprime una advertencia y se asigna una puntuación de 0 a ese péptido) o `score` (el péptido se puntuará con `--db_unseen_score`).  `warn` es el valor predeterminado.  ¿ES ESTA UNA DESCRIPCIÓN PRECISA DEL COMPORTAMIENTO?
 - `--db_unseen_score SCORE` especifica la penalización que se aplica si encontramos un péptido «no visto» y estamos usando `--db_unseen score`.  El valor predeterminado es una penalización de 100.

### Salida

Los resultados de la puntuación se pueden generar de varias maneras.  En cualquier caso en que se especifique un nombre de archivo, el carácter `$` se sustituirá por el nombre de la secuencia cuando se puntúen varias secuencias.

- `--report {total,hits,full}` especifica qué tipo de informe enviar a la salida estándar.  `total` dará la puntuación total de cada secuencia.  `hits` dará un informe por alelo de cada péptido identificado como acierto (es decir, puntuación > 0).  `full` dará un informe por alelo de todos los péptidos de la secuencia.  El valor predeterminado es `total`.
 - `--report_file FILE` enviará el informe generado por `--report` a un archivo en formato CSV.  Si se usan varias secuencias, el símbolo `$` en el nombre del archivo se sustituirá por el nombre o número de la secuencia.
- `--plot_hits_file FILE` enviará los resultados a un formato de archivo gráfico.  Para que esto funcione debe estar instalado `matplotlib`.  El formato del gráfico se determinará por la extensión del nombre de archivo dado.

### Ejemplos

Añadir algunos ejemplos, probablemente de las demos.

## mhc_gen_db.py

El script `mhc_gen_db.py` usa buena parte de la misma maquinaria que `mhc_score.py`, por lo que muchas de las mismas opciones funcionan de la misma manera descrita arriba.

### Secuencias de entrada

Las opciones de entrada funcionan igual que en `mhc_score.py`, pero solo se puede usar una secuencia.  Esto significa que las únicas opciones disponibles son las siguientes:
- `--fa`
- `--pdb`/`--chain`

No puedes especificar un archivo multi-FASTA (`--fsa`), un archivo de péptidos (`--pep`) ni secuencias desde la entrada estándar o la línea de comandos.

La opción `--firstres` permite especificar el número de residuo del primer residuo de tu archivo PDB.  En los casos en que tengas una PSSM basada en la secuencia del PDB (que no necesariamente empieza en el residuo 1), la necesitarás para corregir el desfase en la cadena.

### Control del espacio de diseño

Al hacer una base de datos de puntuaciones es inherente la necesidad de determinar cuál debe ser tu espacio de diseño. Es una cuestión compleja por los aspectos combinatorios de los péptidos de ventana deslizante, como se explica en detalle [[aquí|MHCEpitopeEnergy#how-to-generate-an-external-database_why-external-databases_the-combinatorial-problem]].  Como es imposible puntuar todo el espacio de diseño incluso en una región muy pequeña, ofrecemos varias maneras de describir qué aminoácidos permitir en cada posición y qué posiciones muestrear.

Ten en cuenta que, independientemente de estas opciones, toda la secuencia de entrada se puntuará y se almacenará en la base de datos.

####Diversidad de aminoácidos

Puedes usar una (y solo una) de las siguientes maneras de especificar qué aminoácidos probar en cada posición.

- `--aa_csv CSV_FILE` especifica un archivo CSV en el que cada línea incluye un número de posición seguido de todos los aminoácidos permitidos (código de una letra) en cada posición, separados por comas.  (El tipo silvestre se añade automáticamente si falta.)  Consulta `tools/mhc_energy_tools/demo/in/2sak_A.region_muts.csv` para ver un ejemplo.
- `--pssm PSSM_FILE` especifica una PSSM para usar.  Se admiten oficialmente dos formatos de PSSM, aunque el script intentará analizar también formatos no admitidos.  Los dos formatos son la salida de las versiones web y de línea de comandos de PSIBLAST.  Para más detalles sobre cómo hacer una PSSM, consulta [[aquí|MHCEpitopeEnergy#how-to-generate-an-external-database_how-to-make-a-pssm]].  Para ver ejemplos de PSSM admitidas, consulta `tools/mhc_energy_tools/pssm_examples`.
 - `--pssm_thresh PSSM_THRESH` fija el umbral de la PSSM por encima del cual se permitirá un residuo.  La PSSM debe contener el logaritmo (base 2) de la frecuencia de sustitución observada en una posición dada dividida por la frecuencia de sustitución esperada en esa posición.  Una puntuación > 1 significa que el residuo se observa con más frecuencia de la que se esperaría al azar.  El valor predeterminado es 1, aunque esto puede llevar a tamaños de base de datos muy grandes si no se aumenta.

####Posiciones que se muestrean

Hay dos opciones para limitar qué posiciones se muestrean.  Esto es útil si, por ejemplo, tienes una PSSM de toda la proteína, pero solo quieres puntuar epítopos en regiones específicas.

- `--positions` permite especificar qué regiones se permite mutar.  Todo lo que no se incluya no se puntuará (salvo la secuencia de tipo silvestre).  Debe tener el siguiente formato: `--positions 3-30` para una sola región (residuos 3-30, ambos incluidos) y `--positions 3-30,113-142` para varias regiones (residuos 3-30 y 113-142, ambos incluidos).
- `--lock` impide que ciertas regiones muten.  Se especifica con el mismo formato que `--positions`.
- Si se especifican tanto `--positions` como `--lock`, `--lock` prevalece sobre `--positions`.  Una posición con `lock` no mutará aunque `--positions` la especifique.

### Predictores

Todos los predictores disponibles en `mhc_score.py` están disponibles con `mhc_gen_db.py` y se configuran de la misma manera.  En concreto:
- `--propred`
- `--netmhcii`
- `--matrix`

Además, la opción `--netmhcii_raw NETMHC_OUTPUT` permite usar como entrada la salida sin procesar de una ejecución de NetMHCII.

También puedes usar como predictor una base de datos SQL o un archivo CSV generado por este script.  Para ello, proporciona la ruta de esa base de datos/archivo CSV con las opciones `--db_in` o `--csv_in`.

### Detalles de la puntuación

Todas las opciones de `mhc_score.py` para configurar los predictores están disponibles con `mhc_gen_db.py`, excepto `--db_unseen`.  En concreto:
- `--allele_set`
- `--alleles`
- `--epi_thresh`
- `--noncanon`
- `--netmhcii_score` (solo para NetMHCII)

### Salida

La base de datos se enviará a un archivo especificado con las opciones `--db` o `--csv`.  Si el archivo ya existe en esa ubicación, el script normalmente fallará.  Puedes indicar que se añada a la base de datos existente proporcionando el argumento `--augment`, solo para bases de datos SQL.  Si lo haces, verificará que la base de datos use el mismo tipo de predictor y la misma lista de alelos.  Si es así, añadirá a la base de datos los péptidos que le falten.  Tanto para bases de datos SQL como CSV, puedes especificar el comando `--overwrite` para eliminar el archivo existente y empezar desde cero.

Si no se da ninguna base de datos, el script se ejecutará siguiendo las instrucciones de las opciones de salida adicionales, sin puntuar ni guardar la base de datos.

Opciones de salida adicionales:
- `--estimate_size` calculará el número de péptidos que se puntuarán con la configuración dada.  Es una buena comprobación antes de crear realmente tu base de datos, para hacerte una idea de cuán grande será.  Puedes obtener una estimación «a ojo» del tamaño de una base de datos SQL multiplicando el número de péptidos por 100, lo que da un tamaño aproximado de archivo en bytes para una base de datos de 7 alelos.  Una base de datos que contenga 3 millones de péptidos será de unos 300 MB, por ejemplo.  La base de datos en archivo CSV será aproximadamente la mitad de grande.
- `--peps_out PEPTIDE.TXT` guardará todos los péptidos que se van a puntuar en `PEPTIDES.TXT`, con un péptido por línea.
- `--res_out RESFILE.RES` generará un resfile basado en el espacio de diseño especificado.  Solo se listarán en el resfile las posiciones con más de un aminoácido permitido, usando PIKAA para listarlas.  Recuerda que el tipo silvestre siempre está permitido, así que esto lista líneas PIKAA para todas las posiciones que permiten muestrear al menos un aminoácido no nativo.
 - `--chain X`, además de especificar qué cadena usar cuando se usa un archivo PDB como entrada, decidirá qué ID de cadena usar en el resfile si se usa un archivo FASTA como entrada.  Si la entrada usa `--fa`, `--chain` es obligatorio.
 - `--res_header COMMAND` aplica `COMMAND` al encabezado del resfile, encima de la palabra clave `start`, lo que aplicará ese comando a todos los residuos no especificados.  Por defecto no se incluye ningún encabezado.
 - Si usas una PSSM para especificar la diversidad de aminoácidos y esta PSSM se generó a partir de la secuencia de un archivo PDB (en lugar de la secuencia tal como se tradujo), es posible que la PSSM suponga incorrectamente que el primer residuo es el residuo 1.  Si este NO es el caso, se puede usar el parámetro `--firstres` para especificar el número real del primer residuo, lo que permite que la numeración de la PSSM y la de la secuencia del PDB coincidan.

### Multiprocesamiento

Como NetMHCII es lento en comparación con la puntuación basada en matrices, se permite repartir el cálculo de las bases de datos de NetMHCII entre varios procesadores.  Usa los siguientes comandos para controlar la generación de bases de datos con varios procesadores:
- `--nproc #` determina el número de procesadores que se usarán.  Por defecto usa 1 (sin multiprocesamiento).
- `--batch #` determina el número de péptidos que se pasan a cada procesador cada vez.  NetMHCII puntuará ese lote y luego se enviará otro lote a ese procesador hasta que se hayan puntuado todos los péptidos.

### Ejemplos

Añadir algunos ejemplos, probablemente de las demos.

## mhc_data_db.py

El script `mhc_data_db.py` es similar a `mhc_gen_db.py`, pero usa la base de datos IEDB de epítopos validados experimentalmente para construir la base de datos.  El usuario debe descargar la IEDB a un servidor mysql local (se puede hacer con este script) o como archivos CSV y proporcionarla como entrada.

### Descarga de la base de datos IEDB
Si tienes un servidor mysql en funcionamiento, la manera más fácil de obtener la IEDB es descargarla con este script.  Puedes hacerlo con las siguientes opciones:
- `--iedb_fresh_mysql DATABASE_NAME` indica que quieres descargar una copia nueva de la IEDB.  DATABASE_NAME es una base de datos mysql local en la que puedes escribir.  ¡Ten en cuenta que si esta base de datos existe, se sobrescribirá!  Por defecto se usará «iedb» como nombre de la base de datos.
- `--mysql_user USER` y `--mysql_pw PASSWORD` son el nombre de usuario y la contraseña necesarios para acceder a la base de datos mysql local.  Por defecto serán «root» y sin contraseña.

Alternativamente, puedes descargar la IEDB como archivos CSV desde su sitio web.

### Acceso a la base de datos IEDB
Al generar tu base de datos/archivo CSV para usar con Rosetta, debes especificar cómo acceder a la IEDB.

Si usas una base de datos mysql local, proporciona las siguientes opciones:
- `iedb_mysql DATABASE_NAME` da el nombre de la base de datos mysql local (descargada como se describió arriba).
- `--mysql_user USER` y `--mysql_pw PASSWORD` son el nombre de usuario y la contraseña necesarios para acceder a la base de datos mysql local.  Por defecto serán «root» y sin contraseña.

Si usas un archivo CSV de la IEDB, proporciona la siguiente opción:
- `iedb_csv CSV_FILE`, donde CSV_FILE es el nombre del archivo CSV de la IEDB.

### Qué datos usar

Puedes especificar qué alelos usar.  Se admiten cuatro conjuntos de alelos: test, greenbaum11, paul15, southwood98 y hlaII.  Se pueden seleccionar con la opción `--allele_set`.  Alternativamente, se pueden especificar alelos individuales con la opción `--alleles` (solo si no se usa un predictor, véase más abajo).

La IEDB tiene datos de unión de ligandos del MHC y también datos de elución de ligandos del MHC.  Si usas una base de datos mysql local, puedes especificar que se use uno, el otro o ambos:
- `--assay_mhc_ligand_binding` controla si se incluyen los datos de unión de ligandos.  Puede ser `all` para usarlos o `none` para dejarlos fuera.
- `--assay_mhc_ligand_elution` controla si se incluyen los datos de unión de ligandos.  Puede ser `all` para usarlos o `none` para dejarlos fuera.

Si usas un archivo CSV de la IEDB, debes depurar tú mismo el CSV de manera apropiada.

Además, la IEDB contiene datos con péptidos de longitud arbitraria.  Para trabajar con `mhc_epitope`, debemos reducirlos a un tamaño apropiado de 9-mero.  Esto se puede hacer de una de tres maneras:
- `--cores all` añadirá todos los 9-meros del péptido.  Por ejemplo, si el péptido es un 11-mero, se añadirán tres entradas a la base de datos: una que abarca las posiciones 1-9, otra de 2-10 y otra de 3-11.
- `--cores predicted_good` significa que se añadirá a la base de datos cualquier 9-mero que supere cierto umbral, según un predictor (véase más abajo).
- `--cores predicted_best` no está implementado por ahora, pero añadirá el mejor 9-mero (el de unión más fuerte), según un predictor (véase más abajo).
- `--cores full` pondrá en la base de datos el péptido completo, sea cual sea su longitud.  Este comportamiento no se admite en Rosetta, pero podría ser útil para otras aplicaciones.

Si eliges seleccionar núcleos (es decir, `predicted_good` o `predicted_best`), debes especificar un predictor para puntuarlos/clasificarlos.  Por ahora puedes usar los siguientes:
- `--propred` para usar Propred.
- `--pred_csv CSV_FILE` para usar un archivo CSV precalculado, generado por este script o por `mhc_gen_db.py`.
- `--pred_db SQL_DB_FILE` para usar un archivo de base de datos SQL precalculado, generado por este script o por `mhc_gen_db.py`.
- `--matrix MATRIX_FILE` para usar una matriz de puntuación genérica.

Ten en cuenta que se usará con tu predictor el mismo `allele_set` especificado para la IEDB.

Además, puedes pasar opciones para controlar el predictor:
- `--epi_thresh THRESH` fija el umbral del predictor para contar un péptido como de unión.  Por defecto es 5.0.
- `--noncanon` fija cómo tratar los residuos no canónicos.

### Salida

La base de datos se enviará a un archivo especificado con las opciones `--db` o `--csv`.  Si el archivo ya existe en esa ubicación, el script normalmente fallará.  Puedes indicar que se añada a la base de datos existente proporcionando el argumento `--augment`, solo para bases de datos SQL.  Si lo haces, verificará que la base de datos use el mismo tipo de predictor y la misma lista de alelos.  Si es así, añadirá a la base de datos los péptidos que le falten.  Tanto para bases de datos SQL como CSV, puedes especificar el comando `--overwrite` para eliminar el archivo existente y empezar desde cero.

### Ejemplos

Añadir algunos ejemplos, probablemente de las demos.

## Uso de NetMHCII

Pendiente (instalación y configuración del entorno)

## Lista de alelos

La siguiente es la lista completa de alelos admitidos por cada predictor.  Entre paréntesis se indica en qué allele_sets aparece (test, paul15, greenbaum11).

- El conjunto paul15 se toma de [Paul+2015](https://www.ncbi.nlm.nih.gov/pubmed/25862607).
- El conjunto greenbaum11 se toma de [Greenbaum+2011](https://www.ncbi.nlm.nih.gov/pubmed/21305276).

### Propred

- DRB1_0101 (test)
- DRB1_0301
- DRB1_0401
- DRB1_0701
- DRB1_0801
- DRB1_1101
- DRB1_1301
- DRB1_1501

### NetMHCII

- DRB1_0101 (test, greenbaum11)
- DRB1_0103
- DRB1_0301 (paul15, greenbaum11)
- DRB1_0401 (greenbaum11)
- DRB1_0402
- DRB1_0403
- DRB1_0404
- DRB1_0405 (greenbaum11)
- DRB1_0701 (paul15, greenbaum11)
- DRB1_0801
- DRB1_0802 (greenbaum11)
- DRB1_0901 (greenbaum11)
- DRB1_1001
- DRB1_1101 (greenbaum11)
- DRB1_1201 (greenbaum11)
- DRB1_1301
- DRB1_1302 (greenbaum11)
- DRB1_1501 (paul15, greenbaum11)
- DRB1_1602
- DRB3_0101 (paul15, greenbaum11)
- DRB3_0202 (paul15, greenbaum11)
- DRB3_0301
- DRB4_0101 (paul15, greenbaum11)
- DRB4_0103
- DRB5_0101 (paul15, greenbaum11)
- H-2-IAb
- H-2-IAd
- H-2-IAk
- H-2-IAs
- H-2-IAu
- H-2-IEd
- H-2-IEk
- HLA-DPA10103-DPB10201 (greenbaum11)
- HLA-DPA10103-DPB10301
- HLA-DPA10103-DPB10401 (greenbaum11)
- HLA-DPA10103-DPB10402
- HLA-DPA10103-DPB10601
- HLA-DPA10201-DPB10101 (greenbaum11)
- HLA-DPA10201-DPB10501 (greenbaum11)
- HLA-DPA10201-DPB11401 (greenbaum11)
- HLA-DPA10301-DPB10402 (greenbaum11)
- HLA-DQA10101-DQB10501 (greenbaum11)
- HLA-DQA10102-DQB10501
- HLA-DQA10102-DQB10502
- HLA-DQA10102-DQB10602 (greenbaum11)
- HLA-DQA10103-DQB10603
- HLA-DQA10104-DQB10503
- HLA-DQA10201-DQB10202
- HLA-DQA10201-DQB10301
- HLA-DQA10201-DQB10303
- HLA-DQA10201-DQB10402
- HLA-DQA10301-DQB10301
- HLA-DQA10301-DQB10302 (greenbaum11)
- HLA-DQA10303-DQB10402
- HLA-DQA10401-DQB10402 (greenbaum11)
- HLA-DQA10501-DQB10201 (greenbaum11)
- HLA-DQA10501-DQB10301 (greenbaum11)
- HLA-DQA10501-DQB10302
- HLA-DQA10501-DQB10303
- HLA-DQA10501-DQB10402
- HLA-DQA10601-DQB10402

##Véase también

* [[MHCEpitopeEnergy]]
* [[AddMHCEpitopeConstraintMover]]
* [[Términos de guía para el diseño|design-guidance-terms]]

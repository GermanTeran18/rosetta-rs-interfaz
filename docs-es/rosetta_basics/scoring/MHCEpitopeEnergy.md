## Energía de epítopos del MHC (mhc_epitope)

Documentación creada por Brahm Yachnin (brahm.yachnin@rutgers.edu), laboratorio Khare, y Chris Bailey-Kellogg (cbk@cs.dartmouth.edu).  Partes de esta documentación están copiadas o adaptadas de la documentación sobre guía centrada en el diseño de Vikram K. Mulligan (vmullig@uw.edu).
Última edición: 24 de mayo de 2021.

[[_TOC_]]

## Propósito y algoritmo

Un obstáculo importante para la aplicación clínica de proteínas con funciones terapéuticas potencialmente beneficiosas es el hecho de que las macromoléculas están sujetas a vigilancia inmunitaria, y el reconocimiento inicial de una proteína terapéutica por parte de las células presentadoras de antígeno y las células T puede dar lugar a una potente respuesta de anticuerpos antifármaco que puede reducir la eficacia o incluso causar complicaciones potencialmente mortales ([Griswold+2016](https://www.ncbi.nlm.nih.gov/pubmed/27322891)). Un paso clave en el desarrollo de esta respuesta inmunitaria es la unión, por parte de las moléculas del MHC, de péptidos que han sido procesados proteolíticamente a partir de la proteína. La premisa de la desinmunización por eliminación de epítopos es que la modificación mutagénica de la proteína para reducir el reconocimiento de sus péptidos constituyentes por el MHC puede evitar la activación de las células T que, a su vez, prestan ayuda en el desarrollo de potentes anticuerpos antifármaco. La maduración de los predictores computacionales de unión al MHC, combinada con métodos para evaluar y optimizar los efectos de las mutaciones sobre la estructura y la función de las proteínas, ha permitido el desarrollo y la aplicación con éxito de métodos de desinmunización de proteínas dirigidos computacionalmente, tanto con Rosetta ([Choi+2013](https://www.ncbi.nlm.nih.gov/pubmed/23299435), [King+2014](https://www.ncbi.nlm.nih.gov/pubmed/24843166)) como con otras plataformas de diseño de proteínas ([Parker+2013](https://www.ncbi.nlm.nih.gov/pubmed/23384000), [Zhao+2015](https://www.ncbi.nlm.nih.gov/pubmed/26000749), [Salvat+2017](https://www.ncbi.nlm.nih.gov/pubmed/28607051), etc.).

Rosetta admite con facilidad la eliminación de epítopos al incorporar a su puntuación una evaluación del contenido de epítopos de una secuencia proteica. Esto permite, de forma natural, empujar el empaquetado y el diseño hacia secuencias con menor contenido de epítopos. El término de puntuación mhc_epitope respalda este proceso aprovechando los cambios de Alex Ford en el packer que permiten usar términos de puntuación de cálculo rápido pero no descomponibles por pares. El término mhc_epitope se calcula recorriendo los péptidos constituyentes de la secuencia de un Pose y aplicando uno (o más) de varios algoritmos de predicción de epítopos para evaluar cada péptido de forma independiente. Al considerar una mutación propuesta, el término de puntuación solo vuelve a evaluar las contribuciones de los péptidos que contienen la mutación. Además de admitir la evaluación y el diseño globales del contenido de epítopos, mhc_epitope se puede aplicar de forma diferencial a regiones distintas (p. ej., centrándose en «puntos calientes» identificados o predichos) empleándolo como restricción sobre los residuos definidos por selectores.

## Predicción de epítopos

Un predictor de epítopos toma como entrada un péptido y devuelve una evaluación de su riesgo relativo de unirse al MHC, normalmente en forma de alguna afinidad de unión predicha o de un rango relativo respecto a una distribución (véase, p. ej., [Wang+2008](https://www.ncbi.nlm.nih.gov/pubmed/18389056)). Las predicciones son específicas del alelo del MHC y, aunque hay miles de alelos distintos, debido a su degeneración en la unión de péptidos se puede usar un conjunto representativo relativamente pequeño para captar la diversidad de la población (p. ej., [Southwood+1998](http://www.ncbi.nlm.nih.gov/pubmed/9531296), [Greenbaum+2011](https://www.ncbi.nlm.nih.gov/pubmed/21305276), [Paul+2015](https://www.ncbi.nlm.nih.gov/pubmed/25862607)). La unidad central de unión al MHC-II es de 9 aminoácidos, definida por el surco del MHC-II y los bolsillos en los que acomoda las cadenas laterales del péptido. Los aminoácidos que sobresalen también pueden contribuir. Algunos predictores de epítopos se centran solo en el 9-mero central, mientras que otros usan péptidos más largos (15-meros) para captar los extremos salientes, así como el efecto combinado de múltiples marcos o registros de unión a medida que el 9-mero central se desliza arriba y abajo por el surco.

Como el contenido de epítopos se evalúa repetidamente durante el diseño (para varios péptidos por cada mutación propuesta), mhc_epitope debe ser eficiente en su uso de la predicción de epítopos. Una forma de lograrlo es con una matriz de puntuación específica de posición, p. ej., el método de perfil de bolsillos Propred ([Singh+2001](http://www.ncbi.nlm.nih.gov/pubmed/11751237)), que se basó en TEPITOPE ([Sturniolo+1999](https://www.ncbi.nlm.nih.gov/pubmed/10385319)). La implementación actual incluye el conjunto representativo de matrices de Propred de [Southwood+1998](http://www.ncbi.nlm.nih.gov/pubmed/9531296), descargado del [sitio de Propred](http://crdd.osdd.net/raghava/propred/) por cortesía del Dr. Raghava. Otra forma de permitir una predicción eficiente de epítopos dentro del ciclo de diseño, incluso cuando hay que invocar un programa externo independiente, es precalcular y guardar en caché las predicciones. La implementación actual lo admite usando una base de datos sqlite de epítopos predichos, que se puede precalcular (p. ej., con NetMHCII ([Jensen+2018](https://www.ncbi.nlm.nih.gov/pubmed/29315598))) usando los scripts de python que se describen más abajo. También está disponible el método SVM desarrollado anteriormente por ([King+2014](https://www.ncbi.nlm.nih.gov/pubmed/24843166)) para la desinmunización basada en Rosetta, aunque las SVM disponibles actualmente son algo lentas en el contexto del packer.  Aun así, desde el punto de vista de la velocidad, sigue siendo muy razonable usar el predictor basado en SVM con mhc_epitope durante la puntuación.

## Información de citación

El método de energía MHCEpitopeEnergy, el término de puntuación mhc_epitope y el benchmark se describen en la siguiente publicación.  Si lo usas, cita el siguiente artículo:

Yachnin BJ, Mulligan VK, Khare SD, and Bailey-Kellogg C.  (2021).  MHCEpitopeEnergy, a flexible Rosetta-based biotherapeutic deimmunization platform.  J Chem Inf Model 61(5):2368-2382.  doi: 10.1021/acs.jcim.1c00056.  https://pubmed.ncbi.nlm.nih.gov/33900750/

Además de la funcionalidad de Rosetta, mhc_epitope hace uso de varios recursos de desinmunización desarrollados fuera de la comunidad de Rosetta.  Como condición para usar este código, es imprescindible que los recursos que uses se citen adecuadamente en cualquier publicación resultante.

### ProPred

Las matrices de ProPred se proporcionan en la base de datos de Rosetta (`/main/database/scoring/score_functions/mhc_epitope/propred8.txt`) y las usa el archivo de configuración «predeterminado», `propred8_5.mhc`.

Las matrices se obtienen de http://crdd.osdd.net/raghava/propred/  Si usas resultados basados en estas predicciones, cita Singh, H. and Raghava, G.P.S. (2001) ProPred: Prediction of DR binding sites. Bioinformatics, 17(12):1236-37.  http://www.ncbi.nlm.nih.gov/pubmed/11751237

### NetMHCII

NetMHCII se puede incorporar a bases de datos externas mediante las [[mhc-energy-tools]].  Si usas NetMHCII, cita Improved methods for predicting peptide binding affinity to MHC class II molecules.  Jensen KK, Andreatta M, Marcatili P, Buus S, Greenbaum JA, Yan Z, Sette A, Peters B, Nielsen M. Immunology. 2018 Jan 6. doi: 10.1111/imm.12889

### NMer
nmer es un predictor de epítopos existente que se ejecuta dentro de Rosetta.  A diferencia de mhc_epitope, en su forma original no es compatible con el packer.  mhc_epitope ahora puede usar nmer como predictor.

Si usas nmer dentro de mhc_epitope, cita el artículo original:
King C, Garza EN, Mazor R, Linehan JL, Pastan I, Pepper M, Baker D. Removing T-cell epitopes with computational protein design. Proc Natl Acad Sci U S A 2014;111:8577–82. https://doi.org/10.1073/pnas.1321126111

### IEDB
IEDB es una base de datos pública de epítopos inmunitarios validados experimentalmente.  El archivo `iedb_data.mhc`, disponible en la base de datos de Rosetta, hace referencia al archivo de base de datos `iedb_data.db`, que contiene datos derivados de la IEDB.  Si usas cualquiera de estos archivos, debes citar la IEDB.  Además, las [[mhc-energy-tools]] ofrecen recursos para actualizar y construir archivos de bases de datos personalizados basados en datos de la IEDB.

Consulta las siguientes instrucciones de la IEDB relativas al uso de cualquiera de estos recursos:

Se pide a los usuarios que citen la IEDB cuando presenten información obtenida de ella: http://www.iedb.org. La referencia de revista de la IEDB se actualizó en 2018 y debe citarse como: Vita R, Mahajan S, Overton JA, Dhanda SK, Martini S, Cantrell JR, Wheeler DK, Sette A, Peters B. The Immune Epitope Database (IEDB): 2018 update. Nucleic Acids Res. 2019 Jan 8;47(D1):D339-D343. doi: 10.1093/nar/gky1006. PMID: 30357391

Todas las publicaciones o presentaciones que se refieran a datos generados mediante el uso de las herramientas de análisis de recursos de la IEDB deben incluir citas de las referencias relevantes, que se encuentran en http://tools.iedb.org/main/references/

## Control por parte del usuario

Este término de puntuación se controla mediante archivos ```.mhc```, que definen el protocolo de desinmunización y los ajustes deseados.  El archivo ```.mhc``` se pasa a la función de puntuación con la etiqueta ```<Set>``` en la función de puntuación:
```xml
<SCOREFXNS>
	<ScoreFunction name="ref_deimm" weights="ref2015.wts">
		<Reweight scoretype="mhc_epitope" weight="1"/>
		<Set mhc_epitope_setup_file="propred8_5.mhc"/>
	</ScoreFunction>
</SCOREFXNS>
```

Como alternativa, el usuario puede aplicar el archivo ```.mhc``` como restricción con el mover ```<AddMHCEpitopeConstraintMover>```.  El mecanismo de restricciones permite usar varios predictores de epítopos o predictores dirigidos.
```xml
<SCOREFXNS>
	<ScoreFunction name="ref_deimm" weights="ref2015.wts">
		<Reweight scoretype="mhc_epitope" weight="1"/>
	</ScoreFunction>
</SCOREFXNS>
<MOVERS>
	<AddMHCEpitopeConstraintMover name="mhc_csts" filename="propred8_5.mhc" selector="my_residue_selectors" weight="1.0"/>
</MOVERS>
```
Ten en cuenta que, para que se aplique el término `mhc_epitope`, con tu mover hay que usar una función de puntuación en la que `mhc_epitope` tenga un peso distinto de cero, incluso si solo aplicas este término de puntuación mediante el mover de restricciones.  Tanto la función de puntuación como la restricción tendrán un peso asociado; para averiguar el «peso neto» de la restricción, debes multiplicar ambos pesos.  Por ejemplo, si la función de puntuación tiene un peso de 0.5 y el mover de restricciones tiene un peso de 3.0, el peso de la restricción será 1.5.

En su forma más sencilla, puedes usar mhc_epitope simplemente estableciendo el peso de mhc_epitope en 1 en tu función de puntuación y usando ```<Set mhc_epitope_setup_file="propred8_5.mhc"/>``` en la definición de tu función de puntuación, como en el primer ejemplo anterior.  En cualquier mover que use esa función de puntuación, se usarán las matrices de ProPred proporcionadas con Rosetta para desinmunizar todo el Pose (diseñable).

## Cómo preparar tus archivos .mhc

Si quieres empezar a usar ```mhc_epitope``` de inmediato, echa un vistazo a los archivos ```.mhc``` de ejemplo que figuran más abajo y luego consulta las opciones relevantes aquí para entender cómo funcionan.  Después puedes personalizar tu configuración según sea necesario.

Cada archivo ```.mhc``` debe empezar con una línea ```method```.  La sintaxis es la palabra clave ```method```, seguida del método de predicción y luego del nombre del archivo de entrada.  Actualmente se admiten tres métodos de predicción:
- ```method matrix``` usa una matriz para puntuar cada péptido.  Por ejemplo, las matrices de propred se pueden usar para puntuar cualquier péptido sin precalcular puntuaciones de epítopos.  ```method matrix propred8``` usa las matrices de puntuación de propred8 (es decir, los 8 alelos representativos mencionados arriba)
- ```method external``` usa una base de datos sqlite precalculada para puntuar cada péptido.  El nombre de archivo debe ser el de la base de datos sqlite.  Por ejemplo, ```method external yfp_netmhcii.db```.
- ```method preloaded``` también usa una base de datos precalculada, como ```method external```.  A diferencia de ```external```, ```preloaded``` carga todo el contenido de la base de datos en memoria.  Esto acelerará tus trayectorias, a costa de una mayor huella de memoria.  ```preloaded``` también acepta archivos CSV con la información de epítopos, por lo que el nombre de archivo debe ir precedido de las palabras clave ```db``` o ```csv``` para indicar una base de datos sqlite o un archivo CSV.  El nombre de archivo debe ser el de la base de datos, en el formato apropiado.  Por ejemplo, ```method preloaded db yfp_netmhcii.db``` o ```method preloaded csv yfp_netmhcii.csv```.
- Más abajo se describen ```method svm``` y ```method svm_rank```.
- Ten en cuenta que se pueden implementar fácilmente métodos de predicción adicionales escribiendo nuevas clases derivadas de MHCEpitopePredictor.

Las líneas siguientes del archivo ```.mhc``` son opcionales y controlan cómo se realiza la puntuación.
- ```alleles``` se puede usar para seleccionar un subconjunto de los alelos presentes en tu matriz o base de datos.  Esta opción no está admitida actualmente, salvo para seleccionar todos los alelos (el valor por defecto).  Para seleccionar todos los alelos, usa ```alleles *```.
- ```threshold``` se aplica solo a los predictores basados en matrices.  Esta opción establece el corte de percentil de unión que se considera un acierto.  Por ejemplo, un umbral de 2 significa que el 2% superior de los que se unen son aciertos.  El valor por defecto es ```threshold 5.0```.  Para las matrices de Propred (actualmente el único tipo de matriz admitido), el umbral debe ser un entero de 1 a 10.
- ```unseen``` se aplica solo a los predictores externos o precargados.  Como estos predictores usan una base de datos externa que no incluye necesariamente todos los péptidos posibles, esta opción establece el comportamiento para cualquier péptido que no se encuentre en la base de datos (es decir, que sea «no visto»).  Esta opción puede tomar distintos gestores, que deciden cómo tratar los péptidos no vistos.  El valor por defecto es ```unseen score 100```.
 - ```score``` o ```penalize``` (que son idénticos) añade una puntuación de penalización específica y constante a cualquier péptido que no se encuentre en la base de datos, desalentando así que Rosetta diseñe hacia estas secuencias.  El valor por defecto (```unseen score 100```) suma 100 a la puntuación si se encuentra un péptido desconocido.
 - ```ignore``` simplemente ignora cualquier péptido que no esté presente en la base de datos, y es una abreviatura de ```unseen score 0```.  Es adecuado para bases de datos de péptidos «malos» confirmados.
- ```xform``` transforma la puntuación devuelta por el predictor.  En cualquier caso, si la puntuación transformada es menor que 0, se usa una puntuación de 0.  Puede funcionar en uno de tres modos:
 - ```raw``` es el predeterminado.  Toma la puntuación bruta y le resta un desplazamiento.  El valor por defecto es ```xform raw 0```.
 - ```relative+``` es una puntuación relativa a la secuencia nativa, en modo aditivo.  La puntuación se calcula como (puntuación bruta - puntuación nativa + desplazamiento).  Por ejemplo, ```raw relative+ 5``` significa que una puntuación que sea 5 unidades peor que la nativa, o mejor, obtendrá una puntuación de 0.
 - ```relative*``` es una puntuación relativa a la secuencia nativa, en modo multiplicativo.  La puntuación se calcula como (puntuación bruta - puntuación nativa * factor).  Por ejemplo, ```raw relative* 1.2``` significa que cualquier puntuación que sea como máximo un 20% más alta que la nativa obtendrá una puntuación de 0.
 - Ten en cuenta que la secuencia «nativa» es la secuencia cuando el packer arranca por primera vez, no la secuencia tal como se leyó.  En un protocolo que usa varios movers, su secuencia «nativa» cambiará a lo largo del protocolo.

También se puede usar en el contexto del término de puntuación `mhc_epitope` un Predictor adicional, basado en los términos NMerSVMEnergy introducidos en el artículo de [King+2014](https://www.ncbi.nlm.nih.gov/pubmed/24843166).  Su configuración es ligeramente distinta de la de los demás Predictores, por lo que se describirá por separado aquí.

 - Hay dos configuraciones a nivel de método disponibles: ```method svm``` y ```method svm_rank```.  Esta última usa puntuaciones SVM por rangos, mientras que la primera no.  Todos los demás ajustes de configuración son opcionales.
 - ```svm_file``` permite al usuario especificar una lista de archivos SVM que se usarán, separados por espacios en blanco.  Más abajo se muestran los ajustes por defecto (equivalentes a la opción de línea de comandos -nmer_svm_list).
 - ```svm_rank``` permite al usuario especificar una lista de archivos de rangos que se usarán, separados por espacios en blanco.  Más abajo se muestran los ajustes por defecto (equivalentes a la opción de línea de comandos -nmer_svm_rank_list).
 - ```svm_pssm_features``` permite al usuario especificar una lista de archivos PSSM que se usarán, separados por espacios en blanco.  Más abajo se muestran los ajustes por defecto.  Si no quieres usar PSSM, la configuración debe establecerse en ```svm_pssm_features off```  (equivalente a la opción de línea de comandos -nmer_pssm_list).
 - ```svm_sequence_length``` permite al usuario especificar la longitud del péptido central y de los péptidos salientes.  El primer número es la longitud del núcleo y el segundo es la longitud del extremo saliente.  El valor por defecto es ```svm_sequence_length 9 3```, que indica un 9-mero central con un 3-mero saliente a ambos lados, para un total de 15 residuos: OOOCCCCCCCCCOOO (O = saliente, C = núcleo).  No lo cambies a menos que sepas lo que haces  (equivalente a las opciones de línea de comandos -nmer_ref_seq_length y -nmer_svm_term_length).
 - ```svm_aa_matrix``` permite especificar una matriz de codificación de aminoácidos.  El valor por defecto es ```svm_aa_matrix sequence/substitution_matrix/BLOSUM62.prob.rescale``` (equivalente a la opción de línea de comandos -nmer_svm_aa_matrix).
 - ```xform``` se puede usar exactamente como se describió arriba.  Por este motivo, las opciones de nmer ```nmer_svm_scorecut``` y ```nmer_gate_svm_scores``` están desactivadas en este contexto.
 - ```svm_file``` por defecto:
  - sequence/mhc_svms/HLA-DRB10101_nooverlap.libsvm.dat.noscale.nu0.5.min_mse.model
  - sequence/mhc_svms/HLA-DRB10301_nooverlap.libsvm.dat.noscale.nu0.5.min_mse.model
  - sequence/mhc_svms/HLA-DRB10401_nooverlap.libsvm.dat.noscale.nu0.5.min_mse.model
  - sequence/mhc_svms/HLA-DRB10701_nooverlap.libsvm.dat.noscale.nu0.5.min_mse.model
  - sequence/mhc_svms/HLA-DRB10802_nooverlap.libsvm.dat.noscale.nu0.5.min_mse.model
  - sequence/mhc_svms/HLA-DRB11101_nooverlap.libsvm.dat.noscale.nu0.5.min_mse.model
  - sequence/mhc_svms/HLA-DRB11302_nooverlap.libsvm.dat.noscale.nu0.5.min_mse.model
  - sequence/mhc_svms/HLA-DRB11501_nooverlap.libsvm.dat.noscale.nu0.5.min_mse.model
 - ```svm_rank``` por defecto (o vacío si se usa ```method svm```):
  - sequence/mhc_rank_svm_scores/HLA-DRB10101.libsvm.test.out.sort.gz
  - sequence/mhc_rank_svm_scores/HLA-DRB10301.libsvm.test.out.sort.gz
  - sequence/mhc_rank_svm_scores/HLA-DRB10401.libsvm.test.out.sort.gz
  - sequence/mhc_rank_svm_scores/HLA-DRB10701.libsvm.test.out.sort.gz
  - sequence/mhc_rank_svm_scores/HLA-DRB10802.libsvm.test.out.sort.gz
  - sequence/mhc_rank_svm_scores/HLA-DRB11101.libsvm.test.out.sort.gz
  - sequence/mhc_rank_svm_scores/HLA-DRB11302.libsvm.test.out.sort.gz
  - sequence/mhc_rank_svm_scores/HLA-DRB11501.libsvm.test.out.sort.gz
 - ```svm_pssm_features``` por defecto:
  - sequence/mhc_pssms/HLA-DRB10101_nooverlap.9mer.norm.pssm
  - sequence/mhc_pssms/HLA-DRB10301_nooverlap.9mer.norm.pssm
  - sequence/mhc_pssms/HLA-DRB10401_nooverlap.9mer.norm.pssm
  - sequence/mhc_pssms/HLA-DRB10701_nooverlap.9mer.norm.pssm
  - sequence/mhc_pssms/HLA-DRB10802_nooverlap.9mer.norm.pssm
  - sequence/mhc_pssms/HLA-DRB11101_nooverlap.9mer.norm.pssm
  - sequence/mhc_pssms/HLA-DRB11302_nooverlap.9mer.norm.pssm
  - sequence/mhc_pssms/HLA-DRB11501_nooverlap.9mer.norm.pssm

### Ejemplos de archivos ```.mhc```

Este es un archivo ```.mhc``` que se proporciona con Rosetta (```database/scoring/score_functions/mhc_epitope/propred8_5.mhc```).  Usará las matrices de ProPred proporcionadas (```database/scoring/score_functions/mhc_epitope/propred8.txt```) con un umbral de 5:
```
method matrix propred8
alleles *
threshold 5
```

Otro archivo ```.mhc``` que se proporciona con Rosetta (```database/scoring/score_functions/mhc_epitope/iedb_data.mhc```) penaliza los péptidos que se encuentran en la base de datos pública IEDB, mientras ignora (puntuación 0) todos los demás péptidos:
```
method preloaded db iedb_data.db
unseen ignore
```
Este archivo ```.mhc``` hace referencia a una base de datos compatible con Rosetta derivada de la IEDB (```database/scoring/score_functions/mhc_epitope/iedb_data.db```), que se describe con más detalle en el archivo ```database/scoring/score_functions/mhc_epitope/iedb_data.info```.

Este es un archivo ```.mhc``` que usa una base de datos externa proporcionada por el usuario.  A cualquier péptido que encuentre el packer y que no esté en la base de datos se le asignará una penalización de puntuación de 100.
```
method external user_sql_database.db
unseen score 100
```

Este es un archivo ```.mhc``` que precarga una base de datos basada en CSV proporcionada por el usuario.  A cualquier péptido que encuentre el packer y que no esté en la base de datos se le asignará una penalización de puntuación de 0.
```
method preloaded csv user_csv_database.csv
unseen ignore
```

## Restricciones de MHCEpitope

Un archivo de configuración ```.mhc``` pasado a la función de puntuación en el bloque ```<SCOREFXNS>``` se aplicará a todo el Pose.  Es posible que, además de aplicar la configuración ```.mhc``` a todo el Pose, o en lugar de ello, quieras dirigirte a regiones concretas, por ejemplo aquellas que se sabe o se predice que son muy inmunogénicas.  Esto se puede lograr con el [[AddMHCEpitopeConstraintMover]], que acepta un archivo de configuración ```.mhc``` así como un selector de residuos y un término de ponderación opcionales.  Se puede aplicar un número arbitrario de [[AddMHCEpitopeConstraintMover]]s.

Si solo quieres usar restricciones para desinmunizar tu proteína, no necesitas pasar un archivo de configuración ```.mhc``` en la sección ```<SCOREFXNS>```.  Ten en cuenta que _aun así debes activar el término ```mhc_epitope``` en la función de puntuación_ para que las restricciones funcionen, incluso si no tienes un archivo ```.mhc``` aplicado globalmente.

## Cómo generar una base de datos externa

### ¿Por qué bases de datos externas?

Propred ([Singh+2001](http://www.ncbi.nlm.nih.gov/pubmed/11751237)) es un método de predicción de epítopos basado en perfiles de bolsillos, que permite predecir la unión péptido-MHC de los péptidos constituyentes de una proteína de una forma lo bastante rápida como para usarla dentro del packer y lo bastante fiable como para haber permitido otros esfuerzos de desinmunización (y de diseño de vacunas). Por eso, con Rosetta se suministran matrices para algunos alelos representativos. Puede que te preguntes, en ese caso, para qué sirve generar una base de datos externa.

Aunque Propred sigue siendo una herramienta de predicción de epítopos muy útil, y fue uno de los mejores predictores en un benchmark importante ([Wang+2008](https://www.ncbi.nlm.nih.gov/pubmed/18389056)), tiene casi 20 años, y ahora hay disponibles métodos de predicción de epítopos más sofisticados, entrenados con la gran cantidad de datos de unión péptido-MHC disponibles en la [IEDB](http://www.iedb.org). NetMHCII ([Jensen+2018](https://www.ncbi.nlm.nih.gov/pubmed/29315598)), el otro predictor que respaldan principalmente las ```mhc_energy_tools```, requiere el uso de un ejecutable externo para predecir epítopos en un péptido. Por ello, es demasiado lento para usarlo «sobre la marcha» con el packer.

Para lograr un compromiso entre una predicción de epítopos a la velocidad del packer y un predictor de última generación, ```mhc_epitope``` admite el uso de una base de datos externa que se puede precalcular con los péptidos relevantes para tu proteína de interés.  Como la longitud del péptido es de 15 residuos, claramente hay que elegir un subconjunto de todos los residuos posibles, y solo se pueden considerar regiones específicas de la proteína.  Recomendamos usar una PSSM generada por PSIBLAST para determinar las sustituciones probables que se van a considerar, y generar una base de datos que contenga todos esos péptidos con la herramienta ```mhc_gen_db.py``` que se proporciona.  De este modo, puedes dirigirte a los puntos calientes de tu proteína con NetMHCII y usar Propred para puntuar el resto de la proteína.

Como alternativa, se pueden enumerar sustituciones elegidas a mano con un formato CSV, o se podría derivar una PSSM de otra manera.  Prácticamente cualquier método sensato de restringir el espacio de diseño (computacional o experimental) podría ser apropiado, según tus circunstancias. El objetivo es llegar a un subconjunto de identidades de residuos que sea poco probable que «rompa» la proteína durante la desinmunización. Recomendamos PSIBLAST como solución general, ya que es aplicable a cualquier proteína objetivo, pero de ningún modo es la única opción.

#### El problema combinatorio

Los usuarios de Rosetta suelen conocer el problema combinatorio estándar de las secuencias de proteínas: una proteína de longitud N tiene 20^N secuencias posibles.  Sin embargo, como aquí tratamos con una situación de ventana deslizante, la cosa se pone aún peor.  Si queremos muestrear 5 identidades en una posición, eso nos da 5 secuencias únicas.  Pero con una ventana deslizante de 15 residuos, eso significa que tendremos 5 secuencias en cada una de las 15 ventanas que incluyen esa posición.  En otras palabras, 15 x 5 = 75 péptidos para cubrir la variabilidad en esa única posición.

Ahora bien, si añadimos otras 5 identidades que muestrear en la posición adyacente, tendrás que muestrear 5x5 = 25 posibilidades para cada ventana peptídica que contenga ambas posiciones (todas menos la primera y la última, es decir, 13), y 5 posibilidades para las posiciones que contengan solo una de ellas.  Para nuestra situación hipotética, eso produce 5 + 13 x 25 + 5 = 335 péptidos únicos.

Incluso con una base de datos precalculada, aún tendrás que ser selectivo en cuanto al número de posiciones y de identidades que se van a muestrear, para evitar tener que prepuntuar millones de péptidos.

### Cómo hacer una PSSM

La forma más fácil de hacer una PSSM es con PSIBLAST:

1. Ejecuta blastp con el algoritmo PSI-BLAST.  Tendrás que ejecutar al menos dos iteraciones para obtener una PSSM.  En la primera página de resultados, haz clic en el botón ```Go``` junto a ```Run PSI-Blast iteration N``` para iniciar la segunda iteración o una posterior.

2. Una vez completada tu iteración final de PSI-BLAST, descarga la PSSM en formato ASN haciendo clic en ```Download```-->```PSSM```.

3. Convierte la PSSM en formato ASN a la forma de matriz yendo a https://www.ncbi.nlm.nih.gov/Class/Structure/pssm/pssm_viewer.cgi, introduciendo el archivo ASN como «Scoremat file» en el recuadro 1 y haciendo clic en ```Matrix view```.  Puedes descargar la matriz haciendo clic en ```Download Matrix to File```.


Como alternativa, puedes descargar PSI-BLAST y la base de datos apropiada y ejecutarlo localmente:

1. Descarga la suite blast y la base de datos apropiada.

2. Ejecuta el siguiente comando:
```
psiblast -db /path/to/blast/database -query my_sequence.fas -num_iterations N -out_ascii_pssm pssm_matrix.txt -out logfile.log
```

   -```my_sequence.fas``` es tu archivo fasta

   -```N``` es el número de iteraciones (>=2)

   -```pssm_matrix``` es tu matriz de salida, y ```logfile.log``` es el registro de psiblast.

### Generación de la base de datos

Una vez que tengas una PSSM (u otra forma de determinar qué secuencias examinar), tienes que generar tu base de datos con ```mhc_gen_db.py```, ubicado en ```tools/mhc_energy_tools/```.  Para ver la documentación completa de estas herramientas, consulta [[la documentación de las herramientas|mhc-energy-tools]].

Ten en cuenta que probablemente querrás usarlo en modo «restricción» para examinar las regiones de puntos calientes de tu proteína, ya que hacer una base de datos que cubra toda la secuencia de la proteína probablemente sea prohibitivamente caro.  Para cubrir las regiones que no son puntos calientes, probablemente las matrices de Propred sean suficientes para asegurar que la inmunogenicidad se mantenga baja.

Suponiendo que quieres usar NetMHCII como predictor, primero tendrás que descargar e instalar NetMHCII (https://services.healthtech.dtu.dk/services/NetMHCII-2.3/) y establecer la variable de entorno ```NMHOME``` en la ubicación del binario de NetMHCII.

Especialmente al usar una PSSM, debes tener mucho cuidado para evitar una explosión combinatoria de péptidos que procesar.  Considera los siguientes consejos:

-Selecciona solo aquellas regiones que hayas determinado previamente que tienen una unión fuerte y mantén esas regiones lo más pequeñas posible (mínimo 15, la longitud del péptido).  Usa los parámetros ```--positions``` y ```--lock``` para identificar solo las regiones a las que quieres dirigirte desde la PSSM.

-El valor por defecto de ```--pssm_thresh``` es 1, lo que en la práctica significa que se muestreará cualquier residuo que aparezca más de lo esperable al azar.  Aumentar este número a 2 o incluso 3 reducirá mucho el número de péptidos que muestrear.  Sin embargo, el inconveniente es que se reduce el posible espacio de diseño.  (Normalmente, penalizarás cualquier secuencia que no esté presente en la base de datos con el parámetro ```unseen penalize``` del archivo ```.mhc```.)

-De los tres conjuntos de alelos que se pueden probar, el conjunto ```paul15``` ([Paul+2015](https://www.ncbi.nlm.nih.gov/pubmed/25862607)) es más pequeño que el conjunto ```greenbaum11``` ([Greenbaum+2011](https://www.ncbi.nlm.nih.gov/pubmed/21305276)) y puede ser casi igual de bueno. Esto reduce el tiempo que se tarda en cada péptido.

A modo de ejemplo, así es como podrías querer generar tu base de datos, suponiendo que tu secuencia proteica está en un archivo ```sequence.fas```, tu PSSM está en ```pssm.txt``` y quieres examinar las secuencias 15-31 y 90-110:
```
mhc_gen_db.py --fa sequence.fas --positions 15-31,90-110 --pssm pssm.txt --pssm_thresh 2 --peps_out list_of_peptides.txt --netmhcii --allele_set paul15 mydatabase.db
```

Si también quieres generar un resfile para limitar el espacio de diseño en las regiones que no cubre la base de datos, puedes usar lo siguiente (suponiendo que la proteína es la cadena A):
```
mhc_gen_db.py --fa sequence.fas --positions 15-31,90-110 --pssm pssm.txt --pssm_thresh 2 --peps_out list_of_peptides.txt --netmhcii --allele_set paul15 --chain A --res_out myresfile.res mydatabase.db
```

Ten en cuenta que una base de datos también se puede usar para aportar epítopos conocidos experimentalmente, a los que se puede imponer una penalización alta.

### Limitaciones de las bases de datos

- Las bases de datos externas son significativamente más lentas que los predictores basados en matrices, ya que durante el empaquetado hay que acceder continuamente a la base de datos desde el disco.
- Si varios procesos acceden a la misma base de datos, esto creará una ralentización adicional, ya que varios procesos accederán continuamente a la base de datos durante el empaquetado.  Si las limitaciones de almacenamiento no son un problema, considera hacer temporalmente una copia de la base de datos para cada proceso.
- Una solución a esto es usar el predictor precargado para cargar toda la base de datos en la RAM.  El inconveniente es que las bases de datos grandes deben residir en memoria, lo que puede aumentar mucho la huella de memoria de Rosetta.
- El predictor de bases de datos está actualmente desactivado en situaciones de multihilo.  Si quieres usar una base de datos externa en una ejecución de Rosetta con varios hilos, ponte en contacto con Brahm (brahm.yachnin@rutgers.edu) o con Chris (cbk@cs.dartmouth.edu), ya que nos interesaría averiguar cómo hacerlo posible.  (Puedes intentarlo por tu cuenta eliminando la línea `utility_exit_with_message()` en `core/scoring/mhc_epitope_energy/MHCEpitopeEnergySetup.cc` (~línea 229), pero no lo hemos probado.)  Ten en cuenta que las bases de datos precargadas se pueden usar en un entorno multihilo.

## Estrategias y pautas para la desinmunización en Rosetta

Hemos desarrollado un benchmark científico y hemos probado varias configuraciones de trayectorias de MHCEpitopeEnergy para construir un punto de partida recomendado para la desinmunización.  En última instancia, la desinmunización es un equilibrio entre obtener proteínas de tipo nativo y totalmente activas y la eliminación de secuencias que se predice que serán inmunogénicas.  Nuestra configuración recomendada busca equilibrar estos dos objetivos ortogonales.

Podemos hacer algunas sugerencias:
- Usar Propred como Predictor es rápido y se ha demostrado anteriormente que es bastante eficaz, aunque no tan completo como otros Predictores.  El Predictor Propred predeterminado es un buen punto de partida para la desinmunización.
- Para Propred, unos pesos de mhc_epitope de 0.5-1.5 producen un buen equilibrio entre desinmunización y buenas puntuaciones de Rosetta.  Este peso se puede ajustar para determinar con qué «agresividad» quieres desinmunizar.  Ten en cuenta que las puntuaciones de mhc_epitope escalan con el número de alelos que se consideran.  Mientras que Propred usa hasta 8 alelos, NetMHCII puede usar hasta 27, lo que puede inflar significativamente las puntuaciones.  Si se considera un gran número de alelos, deben usarse pesos de mhc_epitope más bajos.
- Casi con seguridad deberías usar [[FavorNativeResidue|FavorNativeResidueMover]] o restricciones similares para evitar mutaciones espurias.
- El diseño debe desactivarse para cualquier residuo que se sepa que es importante para la estructura y la función.  Siempre que sea un número relativamente pequeño de residuos, la desinmunización no debería verse muy influida por estas restricciones.
- Se puede usar una PSSM generada con PSI-BLAST para restringir el espacio de diseño a sustituciones de aminoácidos conservadas en la evolución.  Hemos comprobado que permitir residuos con una puntuación PSSM de 1 o mayor de una PSSM de PSI-BLAST genera resultados similares en cuanto a calidad de la estructura y grado de desinmunización, a la vez que preserva las características de tipo nativo y reduce mucho el tiempo de ejecución.  La documentación anterior describe cómo hacer una PSSM de PSI-BLAST.  Las herramientas de bases de datos se pueden usar para generar un resfile que limite el espacio de diseño al especificado por la PSSM.
- Un problema común de la desinmunización es la fuerte tendencia a introducir residuos ácidos.  Hay que vigilar la carga total de la proteína.  Recomendamos usar [[AACompositionEnergy]] como medio para restringir por separado las cargas positivas (Arg+Lys) y negativas (Glu+Asp).  La siguiente configuración de un archivo AAComposition, con un peso de aa_composition de 0.5, es un punto de partida razonable:
```
PENALTY_DEFINITION
PROPERTIES POSITIVE_CHARGE
ABSOLUTE <enter the number of arg+lys residues in the native structure here>
PENALTIES 3 2 1 0 1 2 3
DELTA_START -3
DELTA_END 3
END_PENALTY_DEFINITION

PENALTY_DEFINITION
PROPERTIES NEGATIVE_CHARGE
ABSOLUTE <enter the number of asp+glu residues in the native structure here>
PENALTIES 3 2 1 0 1 2 3
DELTA_START -3
DELTA_END 3
END_PENALTY_DEFINITION
```
- Como alternativa, se puede usar [[NetChargeEnergy]] para vigilar la carga neta global, en lugar de gestionar por separado las cargas positivas y negativas.  Aunque esto es muy eficaz, ten en cuenta que la tendencia es a aumentar el número de cargas positivas y negativas manteniendo la carga neta global.
- Las pruebas iniciales muestran que desinmunizar con Propred no elimina necesariamente de forma eficaz todos los epítopos predichos, por ejemplo, por NetMHCII.  Para problemas de desinmunización complejos, recomendamos dirigirse a las regiones de puntos calientes con un enfoque basado en restricciones y una base de datos de NetMHCII para esas regiones.
- La forma más eficaz de desinmunizar proteínas es dirigirse a los puntos calientes más fuertes (es decir, los que dan aciertos en el mayor número de alelos) y dejar en paz las regiones que solo dan aciertos en uno o dos alelos.  Esto se puede lograr usando un desplazamiento de xform o usando restricciones.

Estos detalles se tratan extensamente en nuestro manuscrito.  La prueba científica, disponible en el [[servidor de benchmarks|https://benchmark.graylab.jhu.edu/]], también da acceso a nuestro enfoque recomendado actual, ejecutado en la versión más reciente de desarrollo de Rosetta, y a los resultados correspondientes.

Para evaluar si tus trayectorias tienen éxito, recomendamos vigilar los siguientes parámetros:
- Las puntuaciones de inmunogenicidad, en comparación con la nativa.  Debes volver a puntuar con Propred y NetMHCII (usa las [[herramientas|mhc-energy-tools]] para ello) y evaluar ambas, con independencia de qué Predictores se hayan usado durante el diseño.
- El total_score de Rosetta, respecto al nativo, eliminando las contribuciones de mhc_epitope y de otras restricciones.
- packstat, respecto al nativo, como métrica adicional de la calidad de la estructura.
- La recuperación de secuencia o la similitud de secuencia, como métrica del carácter «nativo» de tu proteína.
- Los enlaces de hidrógeno enterrados no satisfechos, respecto al nativo.  Como la desinmunización tiende a sustituir residuos hidrofóbicos por residuos cargados, esto puede aumentar.
- La carga neta y el número de cargas positivas y negativas, respecto al nativo.

## Uso con simetría
El término de puntuación ```mhc_energy``` debería ser totalmente compatible con la simetría.  Cada subunidad contribuirá a ```mhc_energy``` (aunque, por eficiencia, el cálculo se realiza solo en las unidades asimétricas y se escala de forma apropiada).

## Organización del código

- El término de puntuación reside en ```core/scoring/mhc_energy/MHCEpitopeEnergy.cc``` y ```core/scoring/mhc_energy/MHCEpitopeEnergy.hh```.
- El término gestiona la actualización de las energías al proponer una mutación, llamando a un predictor de epítopos para los péptidos afectados. La clase base para la predicción de epítopos es ```core/scoring/mhc_energy/MHCEpitopePredictor.hh```, y las implementaciones actuales incluyen ```core/scoring/mhc_energy/MHCEpitopePredictorMatrix.cc``` y ```core/scoring/mhc_energy/MHCEpitopePredictorExternal.cc```. El método central de un predictor de epítopos es ```score()```, que recibe una cadena de péptido y devuelve una puntuación.
- Como cualquier energía de cuerpo completo, la clase MHCEpitopeEnergy implementa una función ```finalize_total_energy()``` que recibe un Pose.  Esta calcula la puntuación.  Internamente, llama a ```full_rescore()```, que recibe un vector de punteros propietarios a Residues (a la que se puede llamar directamente durante el empaquetado).
- Al inicializarse, el término crea un objeto interno MHCEpitopeEnergySetup que almacena la configuración definida por el usuario a partir del archivo ```.mhc```.  Esta clase está definida en ```core/scoring/mhc_energy/MHCEpitopeEnergySetup.cc``` y ```core/scoring/mhc_energy/MHCEpitopeEnergySetup.hh```.  Los objetos MHCEpitopeEnergySetup también se pueden almacenar en MHCEpitopeConstraint asociadas a un Pose.  En el momento de la puntuación o del empaquetado, el MHCEpitopeEnergy construye un vector de punteros propietarios a sus objetos MHCEpitopeEnergySetup internos y a todos los almacenados en el Pose, y usa todos ellos para la puntuación.
- Hay un archivo ```.mhc``` ubicado en ```/database/scoring/score_functions/mhc_epitope/```.

## Integración con aplicaciones de C++

En general, cualquier aplicación que admita el uso de funciones de puntuación personalizadas mediante la línea de comandos debería poder usar MHCEpitopeEnergy.  Para ello, los usuarios deben establecer ```-mhc_epitope_setup_file``` apuntando al archivo de configuración que quieran usar, y activar también el término de puntuación `mhc_epitope` con ```-score:set_weights mhc_epitope 0.75``` (si quisieran un peso de 0.75).  Consulta la documentación de la aplicación concreta para ver si se admiten funciones de puntuación personalizadas.

## Integración con PyRosetta

MHCEpitopeEnergy debería estar ampliamente respaldado con PyRosetta.  Como con las aplicaciones de C++, se puede establecer un archivo de configuración global pasando ```-mhc_epitope_setup_file``` a ```init()``` al iniciar Pyrosetta, y después establecer el peso en tu función de puntuación:
```
pyrosetta.init("-mhc_epitope_setup_file my_config_file.mhc")  # Will apply to all sfxns with non-zero mhc_epitope weights
default_scorefxn = pyrosetta.get_fa_scorefxn()
custom_scorefxn = pyrosetta.get_fa_scorefxn()
custom_scorefxn.set_weight(pyrosetta.rosetta.core.scoring.score_type_from_name("mhc_epitope", 0.5))  # Will apply to custom_scorefxn, but not default_scorefxn.
```

Como alternativa, puedes asociar distintos archivos de configuración a distintas funciones de puntuación mediante la configuración de ```EnergyMethodOptions```:
```
pyrosetta.init()
options = pyrosetta.rosetta.core.scoring.methods.EnergyMethodOptions()
config = pyrosetta.rosetta.utility.vector1_string()
config.append("my_config_file.mhc")
options.set_mhc_epitope_setup_files(config)

custom_scorefxn = pyrosetta.get_fa_scorefxn()
custom_scorefxn.set_energy_method_options(options)  # Associate the custom options with custom_scorefxn only
custom_scorefxn.set_weight(pyrosetta.rosetta.core.scoring.score_type_from_name("mhc_epitope"), 0.5)  # Will apply to custom_scorefxn, but not default_scorefxn.
```

##Véase también

* [[AddMHCEpitopeConstraintMover]]
* [[mhc-energy-tools]]
* [[Scoring explained]]
* [[Funciones de puntuación y tipos de puntuación |score-types]]
* [[Cómo añadir un nuevo método de energía a Rosetta|new-energy-method]]
* [[Términos de guía centrados en el diseño|design-guidance-terms]]

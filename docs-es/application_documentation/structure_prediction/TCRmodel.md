# Modelado de TCR

# Metadatos
Este documento se actualizó por última vez el 2 de abril de 2019, por Ragul Gowthaman (ragul@umd.edu).
El investigador principal responsable es Brian Pierce (pierce@umd.edu).
[[_TOC_]]

# Modelado de TCR

## Referencias

Ragul Gowthaman, Brian G Pierce; TCRmodel: high resolution modeling of T cell receptors from sequence, Nucleic Acids Research, Volume 46, Issue W1, 2 July 2018, Pages W396–W401, https://doi.org/10.1093/nar/gky432

##Introducción

Los receptores de células T, o TCR, son receptores inmunitarios de tipo inmunoglobulina presentes en las células T, y se estima que cada persona posee millones de TCR únicos. Como los anticuerpos, los TCR son heterodímeros, y la diversidad se manifiesta sobre todo en loops llamados loops de regiones determinantes de complementariedad (CDR), que se unen a antígenos extraños. En el caso de los TCR, suelen ser péptidos presentados por proteínas del complejo mayor de histocompatibilidad (MHC). Los TCR son un elemento clave de la respuesta inmunitaria celular y tienen importantes implicaciones en el diseño de vacunas, en las enfermedades autoinmunes y como inmunoterapia contra el cáncer.

Para responder a la creciente necesidad de obtener información estructural de los TCR a partir de sus secuencias, en parte por los avances en la secuenciación de repertorios inmunitarios y el enorme aumento de datos de secuencias de TCR, hemos creado RosettaTCR dentro del potente programa de modelado de proteínas Rosetta. De forma análoga al programa RosettaAntibody para el modelado de anticuerpos, RosettaTCR se construye usando todas las estructuras de TCR conocidas como plantillas y con optimizaciones para modelar correctamente las arquitecturas de los TCR. 

##Algoritmo

El servidor TCRmodel tiene tres etapas principales:

- Identificación de plantillas: se identifican estructuras de plantilla a partir de loops CDR y regiones marco de TCR conocidos
- Injerto: los modelos se ensamblan injertando los loops de plantilla identificados en las regiones marco
- Refinamiento: las cadenas laterales y la cadena principal de los modelos se minimizan con el protocolo "relax" rápido de Rosetta y, si el usuario lo especifica, los loops CDR3 se someten a ciclos adicionales de refinamiento de la cadena principal, usando modelado de loops por cierre cinemático (Refine: refinamiento, Remodel: reconstrucción + refinamiento)

La base de datos de estructuras de TCR de plantilla se actualiza mensualmente desde el Protein Data Bank y actualmente incluye varios cientos de estructuras cristalinas que representan más de 100 TCR únicos. Si no se identifica ninguna plantilla entre las estructuras de TCR, los loops CDR se obtienen de estructuras cristalinas de anticuerpos o se modelan de novo. 

## Instrucciones para ejecutar el protocolo de modelado de TCR
### Archivos de entrada

Las secuencias de TCR que se quieren modelar pueden enviarse como secuencias de aminoácidos de las cadenas alfa y beta, que incluyan como mínimo los dominios variables del TCR. El programa identificará automáticamente los genes de línea germinal en las secuencias de entrada, si hay una coincidencia exacta en la base de datos.

**Base de datos de plantillas**

La base de datos de plantillas de TCR, necesaria para ejecutar la aplicación, no está disponible por defecto en las versiones semanales de Rosetta. El directorio de la base de datos de plantillas de TCR está en "Rosetta/database/additional_protocol_data/tcr" en el código base. Los usuarios pueden clonar o descargar la base de datos de plantillas como parte del directorio "Rosetta/database/additional_protocol_data". 

Por ejemplo:

git clone git@github.com:RosettaCommons/additional_protocol_data.git

o

git clone https://github.com/RosettaCommons/additional_protocol_data.git

La base de datos de plantillas también se puede descargar desde el servidor web TCRmodel en esta página: https://tcrmodel.ibbr.umd.edu/links

La ubicación por defecto de la ruta de la base de datos es "Rosetta/database/additional_protocol_data/tcr". Si se coloca en otra ubicación, usa la opción "-tcr_template_db_path" para dar la ruta de la base de datos de plantillas.


### Archivos de salida

Tras enviar las secuencias de TCR, los resultados mostrarán al usuario las secuencias de los loops CDR analizadas y las plantillas identificadas, junto con la proteína modelada como archivo PDB.

### Opciones básicas
-------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-alpha|Secuencia de aminoácidos de la cadena alfa del TCR.|String|
|-beta|Secuencia de aminoácidos de la cadena beta del TCR.|String|
|-minimize_model|Minimiza el modelo de salida.Default:True|Boolean|
|-relax_model|Minimiza el modelo de salida.Default:False|Boolean|
|-refine_tcr_cdr3_loops|Refina los loops CDR3 de las cadenas alfa y beta.Default:False|Boolean|
|-remodel_tcr_cdr3_loops|Reconstruye los loops CDR3 de las cadenas alfa y beta.Default:False|Boolean|
|-remodel_tcr_cdr3a_loop|Reconstruye el loop CDR3 de la cadena alfa. Útil si solo se requiere reconstruir el loop CDR3 de la cadena alfa. Default:False.|Boolean|
|-remodel_tcr_cdr3b_loop|Reconstruye el loop CDR3 de la cadena beta. Útil si solo se requiere reconstruir el loop CDR3 de la cadena beta.Default:False.|Boolean|
|-refine_all_tcr_cdr_loops|Refina todos los loops CDR. El refinamiento incluye los loops CDR1, CDR2, CDR3 y HV4 de las cadenas alfa y beta. Default:False.|Boolean|


### Opciones avanzadas
---------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-include_ab_templates|Incluye plantillas de anticuerpos para el modelado.  Default false.|Boolean|
|-ab_template_db_path|Ruta de la base de datos de plantillas de anticuerpos.|String|
|-dump_templates|Vuelca todos los archivos pdb de plantillas, Default:False|Boolean|
|-tcr_template_db_path|Ruta de la base de datos de plantillas de TCR, Default:Usa la base de datos de plantillas de TCR ubicada en '$Rosetta/database/additional_protocol_data/tcr'|String|
|-template_similarity_cutoff|Umbral de similitud para ignorar secuencias de plantilla similares de la base de datos de plantillas. Default:100|Real|
|-template_identity_cutoff|Umbral de identidad para ignorar secuencias de plantilla similares de la base de datos de plantillas.Default:100|Real|
|-blastp_identity_cutoff|Umbral de identidad para ignorar secuencias de plantilla similares de la base de datos de plantillas.Default:100|Real|
|-ignore_list|Lista de ID de PDB que se ignoran como plantillas.Default:None|File|
|-use_alpha_germline_templates|Usa plantillas de línea germinal para la cadena alfa; por defecto, las plantillas de línea germinal o de región marco se eligen por coincidencia de secuencia. Default=False|Boolean|
|-use_beta_germline_templates|Usa plantillas de línea germinal para la cadena beta; por defecto, las plantillas de línea germinal o de región marco se eligen por coincidencia de secuencia. Default:False|Boolean|
|-use_user_templates|Usa plantillas proporcionadas por el usuario para los segmentos del TCR; útil para pruebas y pruebas de integración. Default:false|Boolean|
|-alpha_framework_template_id|ID de PDB de la plantilla, con cadena, para el segmento de región marco de la cadena alfa, p. ej. 1kgc_D. Default:None|String|
|-beta_framework_template_id|ID de PDB de la plantilla, con cadena, para el segmento de región marco de la cadena alfa, p. ej. 1kgc_E. Default:None|String|
|-alpha_germline_template_id|ID de PDB de la plantilla, con cadena, para el segmento de línea germinal de la cadena alfa, p. ej. 1kgc_D. Default:None|String
|-beta_germline_template_id|ID de PDB de la plantilla, con cadena, para el segmento de línea germinal de la cadena alfa, p. ej. 1kgc_E. Default:None|String|
|-alpha_cdr1_template_id|ID de PDB de la plantilla, con cadena, para el segmento CDR1 de la cadena alfa, p. ej. 1kgc_D. Default:None|String|
|-beta_cdr1_template_id|ID de PDB de la plantilla, con cadena, para el segmento CDR1 de la cadena alfa, p. ej. 1kgc_E. Default:None|String|
|-alpha_cdr2_template_id|ID de PDB de la plantilla, con cadena, para el segmento CDR2 de la cadena alfa, p. ej. 1kgc_D. Default:None|String|
|-beta_cdr2_template_id|ID de PDB de la plantilla, con cadena, para el segmento CDR2 de la cadena alfa, p. ej. 1kgc_E. Default:None|String|
|-alpha_cdr3_template_id|ID de PDB de la plantilla, con cadena, para el segmento CDR3 de la cadena alfa, p. ej. 1kgc_D. Default:None|String|
|-beta_cdr3_template_id|ID de PDB de la plantilla, con cadena, para el segmento CDR3 de la cadena alfa, p. ej. 1kgc_E. Default:None|String|
|-alpha_orientation_template_id|ID de PDB de la plantilla, con cadena, para la orientación de la cadena alfa; úsalo junto con beta_orientation_template_id, p. ej. 1kgc_D. Default:None|String|
|-beta_orientation_template_id|ID de PDB de la plantilla, con cadena, para la orientación de la cadena beta; úsalo junto con -alpha_orientation_template_id, p. ej. 1kgc_E. Default:None|String|
|-alpha_framework_template_pdb|Archivo PDB de plantilla para el segmento de región marco de la cadena alfa. Default:None|String|
|-beta_framework_template_pdb|Archivo PDB de plantilla para el segmento de región marco de la cadena alfa. Default:None|String|
|-alpha_germline_template_pdb|Archivo PDB de plantilla para el segmento de línea germinal de la cadena alfa. Default:None|String|
|-beta_germline_template_pdb|Archivo PDB de plantilla para el segmento de línea germinal de la cadena alfa. Default:None|String|
|-alpha_cdr1_template_pdb|Archivo PDB de plantilla para el segmento CDR1 de la cadena alfa. Default:None|String|
|-beta_cdr1_template_pdb|Archivo PDB de plantilla para el segmento CDR1 de la cadena alfa. Default:None|String|
|-alpha_cdr2_template_pdb|Archivo PDB de plantilla para el segmento CDR2 de la cadena alfa. Default:None|String|
|-beta_cdr2_template_pdb|Archivo PDB de plantilla para el segmento CDR2 de la cadena alfa. Default:None|String|
|-alpha_cdr3_template_pdb|Archivo PDB de plantilla para el segmento CDR3 de la cadena alfa. Default:None|String|
|-beta_cdr3_template_pdb|Archivo PDB de plantilla para el segmento CDR3 de la cadena alfa. Default:None|String|
|-alpha_orientation_template_pdb|Archivo PDB de plantilla para la orientación de la cadena alfa. Default:None|String|
|-beta_orientation_template_pdb|Archivo PDB de plantilla para la orientación de la cadena beta. Default:None|String|
|-num_cter_overhang_res|Número de residuos salientes C-terminales que se usan para el alineamiento del injerto. Default:3|Integer|
|-num_nter_overhang_res|Número de residuos salientes N-terminales que se usan para el alineamiento del injerto. Default:3|Integer|

### Ejemplo: comandos para una ejecución de ejemplo del modelado de un receptor de células T humano, PDB:1AO7

###Modelado básico
$ Rosetta/main/source/bin/tcrmodel.macosclangrelease -database Rosetta/main/database -alpha VEQNSGPLSVPEGAIASLNCTYSDRGSQSFFWYRQYSGKSPELIMSIYSNGDKEDGRFTAQLNKASQYVSLLIRDSQPSDSATYLCAVTTDSWGKLQFGAGTQVVVT -beta VTQTPKFQVLKTGQSMTLQCAQDMNHEYMSWYRQDPGMGLRLIHYSVGAGITDQGEVPNGYNVSRSTTEDFPLRLLSAAPSQTSVYFCASRPGLAGGRPEQYFGPGTRLTVT

###Modelado avanzado con reconstrucción de loops
$ Rosetta/main/source/bin/tcrmodel.macosclangrelease -database Rosetta/main/database -alpha VEQNSGPLSVPEGAIASLNCTYSDRGSQSFFWYRQYSGKSPELIMSIYSNGDKEDGRFTAQLNKASQYVSLLIRDSQPSDSATYLCAVTTDSWGKLQFGAGTQVVVT -beta VTQTPKFQVLKTGQSMTLQCAQDMNHEYMSWYRQDPGMGLRLIHYSVGAGITDQGEVPNGYNVSRSTTEDFPLRLLSAAPSQTSVYFCASRPGLAGGRPEQYFGPGTRLTVT -remodel_tcr_cdr3_loops -refine_tcr_cdr3_loops

###Modelado con plantillas proporcionadas por el usuario
$ Rosetta/main/source/bin/tcr.macosclangrelease -database Rosetta/main/database -alpha VEQNSGPLSVPEGAIASLNCTYSDRGSQSFFWYRQYSGKSPELIMSIYSNGDKEDGRFTAQLNKASQYVSLLIRDSQPSDSATYLCAVTTDSWGKLQFGAGTQVVVT -beta VTQTPKFQVLKTGQSMTLQCAQDMNHEYMSWYRQDPGMGLRLIHYSVGAGITDQGEVPNGYNVSRSTTEDFPLRLLSAAPSQTSVYFCASRPGLAGGRPEQYFGPGTRLTVT -alpha_germline_template_pdb gma_tmplt_piece.pdb -beta_germline_template_pdb gmb_tmplt_piece.pdb -alpha_cdr3_template_pdb cdr3a_tmplt_piece.pdb -beta_cdr3_template_pdb cdr3b_tmplt_piece.pdb -alpha_orientation_template_pdb ora_tmplt_piece.pdb -beta_orientation_template_pdb orb_tmplt_piece.pdb -use_alpha_germline_templates -use_beta_germline_templates 


###Salida
- Archivos de salida:
La ejecución de la aplicación de modelado de TCR producirá los siguientes archivos de salida en formato PDB. La opción -out::prefix se puede usar para añadir un prefijo a los nombres de los archivos de salida.
    * tcrmodel.pdb El modelo final refinado.
    * tcr_graftmodel.pdb El modelo injertado en bruto, sin refinamiento.
    * tcr_loopmodel.pdb El modelo tras aplicar el modelado de loops o el refinamiento opcionales.

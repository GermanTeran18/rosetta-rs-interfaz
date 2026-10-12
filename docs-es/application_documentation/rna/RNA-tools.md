Herramientas de RNA
===========================================

Propósito de la aplicación
===========================================

Una colección de herramientas para editar PDB, enviar trabajos a clústeres, procesar «silent files» y preparar trabajos de rna_denovo y ERRASER. 

En desarrollo activo por el laboratorio Das (Stanford). 

Código
======

Este documento describe cómo configurar el código de:

`tools/rna_tools/bin`

Configuración
=============
*Nota: estas instrucciones de configuración son para bash. Si usas otro shell, tendrás que adaptar los comandos en consecuencia.*  

**Paso 1:** añade las siguientes líneas a tu `.bashrc` (puede ser `.bash_profile` en algunos sistemas), reemplazando `YOUR_PATH_TO_ROSETTA` por tu ruta real a Rosetta (por ejemplo: `/home/src/rosetta/`):

```
export ROSETTA='YOUR_PATH_TO_ROSETTA'
export RNA_TOOLS=$ROSETTA/tools/rna_tools/
export PATH=$RNA_TOOLS/bin/:$PATH
export PYTHONPATH=$PYTHONPATH:$RNA_TOOLS/bin/
```

**Paso 2:** escribe `source ~/.bashrc` (o, si editaste `.bash_profile`, escribe en su lugar `source ~/.bash_profile`) para activar estas rutas y herramientas.  

**Paso 3:** escribe `python $RNA_TOOLS/sym_link.py`.  

**Paso 4:** verifica la configuración escribiendo `rna_helix.py -h`. Esto debería imprimir las instrucciones de uso de `rna_helix.py`.   

Algunas herramientas útiles
===========================
A continuación se muestran líneas de comando de ejemplo de varias de estas herramientas basadas en Python:

Utilidades de PDB
-----------------
Para cambiar los números de residuo y las cadenas de un archivo:

`renumber_pdb_in_place.py mymodel.pdb A:1-4 B:5-9`

o

`renumber_pdb_in_place.py mymodel.pdb 1-4 5-9`

Para generar un archivo fasta con las secuencias de un PDB:

`pdb2fasta.py mymodel.pdb  [ > mymodel.fasta ]`

Para extraer una cadena concreta de un archivo PDB:

`extract_chain.py mymodel.pdb A `

Para recortar residuos concretos de un archivo PDB:

`pdbslice.py mymodel.pdb -subset 1-5 9-12  mysubset_ `

El último argumento es un prefijo para el archivo PDB recortado.

Para extirpar residuos concretos de un archivo PDB:

`pdbslice.py mymodel.pdb -excise 6-8  excised_ `

De nuevo, el último argumento es un prefijo para el archivo PDB recortado.


Utilidades de silent files
--------------------------
Los «silent files» usan el formato de archivo comprimido de Rosetta, que concatena las puntuaciones de cada modelo junto con las coordenadas del modelo (a veces en un formato comprimido codificado en UU que parece ininteligible).

Para obtener rápidamente el número que corresponde a cada columna de puntuación (útil antes de hacer gráficos de dispersión en `gnuplot`), 

`fields.py mysilentfile.out`

Para encontrar los 20 modelos de menor energía dentro del silent file y ejecutar el ejecutable `extract_pdbs` de Rosetta para extraerlos:

`extract_lowscore_decoys.py mysilentfile.out 20`

Para crear un nuevo silent file solo con los 20 modelos de menor energía:

`extract_lowscore_decoys_outfile.py mysilentfile.out -out 20`

Para concatenar varios archivos de salida, renombrando las etiquetas de los modelos para que sean únicas:

`cat_outfiles.py mysilentfile1.out mysilentfile2.out [ ... ]`


Utilidades de modelado de ARN
-----------------------------

* **Para generar una hélice de ARN de forma A casi ideal** con buena energía de Rosetta (requiere que el ejecutable `rna_helix` de Rosetta esté compilado):
```
rna_helix.py -seq aacg cguu -o myhelix.pdb [ -resnum A:5-8 A:20-23 -extension static.linuxgccrelease ]
```
La `extension` es la extensión de tu ejecutable `rna_helix`. Para averiguarla, escribe `ls $ROSETTA/main/source/bin/rna_helix*` (requiere que la variable de entorno `ROSETTA` esté definida, consulta [Configuración](#setup)). Esto imprimirá algo así en la pantalla:
```
/YOUR_PATH_TO_ROSETTA/main/source/bin/rna_helix.static.linuxgccrelease
```
La extensión es todo lo que viene después de `rna_helix.`, así que aquí la extensión sería `static.linuxgccrelease`. Si el ejecutable se llama simplemente `/YOUR_PATH_TO_ROSETTA/main/source/bin/rna_helix`, no necesitas indicar la opción de extensión a `rna_helix.py`.

* **Para eliminar los residuos** y HETATM que no se reconocen como ARN de un archivo PDB:
`make_rna_rosetta_ready.py rawmodel.pdb`

* **Heredado** [_Las siguientes funcionalidades ya están disponibles directamente en la aplicación `rna_denovo`_]: para preparar los archivos de un trabajo de RNA denovo (ensamblaje de fragmentos de ARN con refinamiento de todos los átomos, FARFAR):
```
rna_denovo_setup.py -fasta mysequence.fasta -secstruct_file mysecstruct.txt
```
Véase también: [[rna_denovo_setup|rna-denovo-setup]].


Configuración de clústeres
--------------------------
Estas herramientas están pensadas sobre todo para los clústeres que usa el laboratorio Das (stampede y otros recursos de XSEDE; el equipo BioX<sup>3</sup> de Stanford), pero se han diseñado para generalizarse fácilmente a otros nuevos.

Para crear archivos de envío para un conjunto de líneas de comando de Rosetta en un archivo `README`:

`rosetta_submit.py README OUTDIR 40 [number of hours]`

El directorio `OUTDIR` contendrá los directorios `0/`, `1/`, hasta `39/` para 40 trabajos. Tu línea de comando debe tener una opción como `-out:file:silent mymodels.out`, que se ampliará a opciones como `-out:file:silent OUTDIR/0/mymodels.out` en los 40 trabajos, de modo que sus archivos de salida vayan a subdirectorios separados y se eviten conflictos de entrada/salida de archivos.  

En el directorio aparecerán scripts de envío para Condor, LSF, PBS y SLURM (stampede) junto con (con suerte) una sugerencia sobre cómo ejecutarlos en tu clúster. El número de horas predeterminado es 16, pero se puede cambiar en el comando anterior. **Si configuras un clúster nuevo, actualiza rosetta_submit.py para que otros puedan aprovechar tu trabajo.**

Mientras se ejecutan o después de que terminen, reúne los modelos de los distintos archivos de salida en un único silent file con:

`easy_cat.py OUTDIR`



##Véase también

* [[RNA applications]]: la página principal de las aplicaciones de ARN
* [[Utilities Applications]]: lista de aplicaciones de utilidades
* [[Tools]]: herramientas basadas en Python para usar en Rosetta
* [[RNA]]: guía para trabajar con ARN en Rosetta
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
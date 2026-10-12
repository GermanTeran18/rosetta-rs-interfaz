#RosettaCM - Modelado comparativo con Rosetta

## Metadatos

Documentación de Frank DiMaio (dimaio@u.washington.edu), Sebastian Rämisch (raemisch@scripps.edu) y Jared Adolf-Bryfogle (jadolfbr@gmail.com)

## Propósito

Este protocolo sirve para crear un modelo por homología a partir de archivos PDB que corresponden a una o más estructuras de plantilla.  Se usa para el modelado comparativo de proteínas.  

## Referencias

[High-resolution comparative modeling with RosettaCM](http://www.sciencedirect.com/science/article/pii/S0969212613002979).  
Song Y, DiMaio F, Wang RY, Kim D, Miles C, Brunette T, Thompson J, Baker D.,
Structure. 2013 Oct 8;21(10):1735-42. doi:10.1016/j.str.2013.08.005. Epub 2013 Sep 12.

## Algoritmo

A grandes rasgos, el algoritmo consiste en una larga trayectoria de Monte Carlo que parte de una plantilla elegida al azar.  La trayectoria de MC emplea los siguientes movimientos: a) inserción de fragmentos en las regiones no alineadas, b) sustitución de un segmento elegido al azar por el de otra estructura de plantilla y c) minimización en el espacio cartesiano con una versión suave (diferenciable) de la función de energía [[centroide|centroid-vs-fullatom ]] de Rosetta.  Por último, sigue una optimización de todos los átomos.

## Ejecución del protocolo RosettaCM

Paso 1 - Crear uno o varios modelos con threading  
Paso 2 - Ejecutar el mover Hybridize


### Paso 1: Crear un modelo con threading

Alternativa 1 - Ejecutar el script setup_CM.py  
Alternativa 2 - Preparar manualmente el modelo de plantilla con threading

### Ejecución del script setup_CM.py

_Advertencia: este script es experimental y puede dar problemas.  ¡Verifica los alineamientos de entrada y de salida después de ejecutarlo!_

La forma más directa de ejecutar el protocolo es mediante el script de rosetta_tools protein_tools/scripts/setup_rosettacm.py. Como entrada necesitas lo siguiente:
* Un archivo de alineamiento de secuencias en uno de los formatos admitidos (véase más abajo)
* Uno o más archivos PDB de plantilla
* Un archivo fasta con la secuencia objetivo

Se ejecuta así:

    Rosetta/tools/protein_tools/scripts/setup_RosettaCM.py [-h] --fasta FASTA
                          [--alignment ALIGNMENT]
                          [--alignment_format ALIGNMENT_FORMAT]
                          [--templates [TEMPLATES [TEMPLATES ...]]]
                          [--rosetta_bin ROSETTA_BIN] [--build BUILD]
                          [--platform PLATFORM] [--compiler COMPILER]
                          [--compiling_mode COMPILING_MODE]
                          [--setup_script SETUP_SCRIPT] [-j J] [--run]
                          [--keep_files] [--run_dir RUN_DIR] [--equal_weight]
                          [--use_dna] [--verbose]

Con las siguientes opciones importantes:

    --alignment ALIGNMENT --alignment_format ALIGNMENT_FORMAT

El archivo de alineamiento debe pasarse como entrada y hay que especificar el formato.  Los formatos válidos son: _grishin_, _modeller_, _vie_, _hhsearch_, _clustalw_, _fasta_.

    --templates [TEMPLATES [TEMPLATES ...]]]

Una lista de PDB de estructuras de plantilla.  Las "etiquetas" del archivo de alineamiento deben coincidir con los nombres de los archivos PDB de plantilla.

    --rosetta_bin ROSETTA_BIN

La ruta al directorio _bin_ de Rosetta.

Tras preparar un trabajo, entra en el directorio _rosetta_cm_ y ejecuta (apuntando a la ubicación de Rosetta instalado):

    Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease @flags -database Rosetta/main/database -nstruct 10

### Preparación manual de un trabajo de RosettaCM

Como alternativa, puede ser preferible preparar manualmente un trabajo de RosettaCM.  Si quieres usar funciones no estándar (por ejemplo, datos de densidad electrónica o restricciones definidas por el usuario), se recomienda esto.  

Dada la secuencia fasta de la proteína que se va a modelar, un alineamiento múltiple de secuencias y los PDB de las estructuras de plantilla, el primer paso del protocolo es hacer threading de la misma secuencia sobre una o varias plantillas.  Estas plantillas pueden ser proteínas homólogas o la misma proteína de varias estructuras cristalinas.  El segundo paso es usar el [[HybridizeMover]] mediante [[RosettaScripts]] para crear un único modelo a partir de las plantillas.

Primero debemos producir archivos PDB de plantilla para Rosetta haciendo threading de la secuencia objetivo sobre una o varias estructuras de proteínas de plantilla.  Como entrada necesitas lo siguiente:
* Un archivo de alineamiento de secuencias en formato Grishin
* Uno o más archivos PDB de plantilla
* Un archivo fasta con la secuencia objetivo

[[Una visión general del formato de archivo Grishin|Grishan-format-alignment]]

El modelo con threading se crea con el siguiente comando:

    Rosetta/main/source/bin/partial_thread.linuxgccrelease \
         -database Rosetta/main/database \
         -in:file:fasta target.fasta \
         -in:file:alignment alignment.aln \
         -in:file:template_pdb 1k3d.pdb 1y12.pdb \
         -ignore_unrecognized_res

Esta aplicación solo debería tardar unos segundos.

**NOTA** Puede ser necesario ejecutarla para cada archivo PDB individual, usando archivos de alineamiento con un solo alineamiento cada uno.
Parece que dar varios archivos PDB con ```-in:file:template_pdb``` no siempre funciona.


### Paso 2: Ejecutar el mover Hybridize

En este paso se realiza el modelado.

Como entrada necesitas lo siguiente:
* Un archivo XML de RosettaScripts
* El archivo fasta con la secuencia objetivo
* Los archivos PDB de plantilla con threading del Paso 1

A continuación se muestra un XML sencillo para realizar el modelado (consulta [[RosettaScripts]] para una guía de la sintaxis XML en Rosetta).  Las opciones más avanzadas se especifican en la página de [[HybridizeMover]].

    <ROSETTASCRIPTS>
    <SCOREFXNS>
        <stage1 weights=score3 symmetric=0>
            <Reweight scoretype=atom_pair_constraint weight=0.5/>
        </stage1>
        <stage2 weights=score4_smooth_cart symmetric=0>
            <Reweight scoretype=atom_pair_constraint weight=0.5/>
        </stage2>
        <fullatom weights=talaris2013_cart symmetric=0>
            <Reweight scoretype=atom_pair_constraint weight=0.5/>
        </fullatom>
    </SCOREFXNS>
    <MOVERS>
        <Hybridize name=hybridize stage1_scorefxn=stage1 stage2_scorefxn=stage2 fa_scorefxn=fullatom batch=1 stage1_increase_cycles=1.0 stage2_increase_cycles=1.0>
            <Template pdb="1k3d_templ.pdb" cst_file="AUTO" weight="1.000" />
            <Template pdb="1y12_templ.pdb" cst_file="AUTO" weight="1.000" />
        </Hybridize>
    <FastRelax name="relax" scorefxn=talaris2013  />
    </MOVERS>
    <PROTOCOLS>
        <Add mover=hybridize/>
        <Add mover=relax/>
    </PROTOCOLS>
    <OUTPUT scorefxn=talaris2013 />
    </ROSETTASCRIPTS>

Guarda el XML anterior como **hybridize.xml**.  Luego, RosettaCM se ejecuta con el siguiente comando:

    Rosetta/main/source/bin/rosetta_scripts.linuxclangrelease \
         -database Rosetta/main/database \
         -in:file:fasta target.fasta \
         -parser:protocol **hybridize.xml** \
         -default_max_cycles 200 \
         -dualspace

En el directorio tools/protein_tools/scripts/ está el script RosettaEnzCM.py, que genera restricciones atómicas por pares para los residuos catalíticos previstos. Para usar este script necesitarás:

* Un archivo fasta alineado con todas las secuencias de las plantillas y la secuencia objetivo
* Los PDB de las plantillas
* Un archivo que contenga la información de los residuos catalíticos de tus plantillas

Para ejecutar el script, escribe:

    python RosettaEnzCM.py -c "Cat. Res. File" -a "Aligned.fasta" -n "Output-Name (Optional)"

### Posprocesamiento

Consulta [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta

### Otros consejos

**¿Cómo puedo modelar con varias cadenas?**

En el archivo fasta de entrada, separa las secuencias de cada cadena con el carácter '/'.

**¿Cómo puedo modelar con ligandos/ácidos nucleicos?**

Brevemente:

1. Añade la etiqueta **add_hetatm=1** a la línea del mover Hybridize.
2. Asegúrate de que tu comando de ejecución y tu archivo de opciones no incluyan la opción `-ignore_unrecognized_res`
3. Añade opciones a tu comando de ejecución o a tu archivo de opciones para leer los archivos `.params` centroide y de todos los átomos, y un archivo `.tors`, de tu ligando

Al añadir la etiqueta **add_hetatm=1** a la línea del mover Hybridize, los ligandos/ácidos nucleicos que quieras modelar se tomarán automáticamente de todas las plantillas con peso distinto de cero en el archivo XML.

**Nota:**  ¡Los ligandos deben añadirse a _todas_ las plantillas con peso distinto de cero en el archivo XML!

Para los ligandos, los archivos `.params` y `.tors` deben generarse con el script [[molfile_to_params|preparing-ligands]], con algunas opciones no estándar.

Ten en cuenta que el script `molfile_to_params.py` funciona con los formatos de archivo `.mol`, `.sdf` y `.mol2`, y la sintaxis del comando es la misma para todos. Puedes encontrar archivos `.sdf` de algunos de los ligandos más comunes (por ejemplo, ATP: http://www.rcsb.org/ligand/ATP ) mediante la interfaz de búsqueda avanzada de rcsb.org. Este [tutorial](https://www.rosettacommons.org/demos/latest/tutorials/prepare_ligand/prepare_ligand_tutorial) tiene más información.

Dado un archivo `.mol2` del ligando en cuestión, `XXX.mol2`, ejecuta:

    python Rosetta/main/source/scripts/python/public/molfile_to_params.py \
       XXX.mol2 \
       --keep-names \
       --clobber \
       --extra_torsion_output \
       --centroid  \
       -p XXX -n XXX

Y además hay que dar las siguientes opciones:

    -extra_res_cen XXX.cen.params
    -extra_res_fa  XXX.fa.params
    -extra_improper_file XXX.tors

**¿Cómo puedo modelar con simetría?**

Si las plantillas de entrada son simétricas, CM puede ejecutarse usando la simetría de la plantilla.  Consulta [[symmetry]] para crear un archivo de definición de simetría.  Luego hay que hacer dos modificaciones sencillas en el archivo XML:

Cambia:

    <stage1 weights=score3 symmetric=0>
    <stage2 weights=score4_smooth_cart symmetric=0>
    <fullatom weights=talaris2013_cart symmetric=0>

Por: 

    <stage1 weights=score3 symmetric=1>
    <stage2 weights=score4_smooth_cart symmetric=1>
    <fullatom weights=talaris2013_cart symmetric=1>

Y añade el archivo symmdef de cada plantilla, cambiando:

    <Template pdb="1k3d_templ.pdb" cst_file="AUTO" weight=1.000 />
    <Template pdb="1y12_templ.pdb" cst_file="AUTO" weight=1.000 />

Por:

    <Template pdb="1k3d_templ.pdb" cst_file="AUTO" weight=1.000 symmdef="dimer_1k3d.symm"/>
    <Template pdb="1y12_templ.pdb" cst_file="AUTO" weight=1.000 symmdef="dimer_1y12.symm"/>

**Nota:**  Igual que con los ligandos, si se usa simetría, _todas_ las plantillas con peso distinto de cero deben tener un archivo de definición de simetría especificado.

## Véase también

* La documentación de [[RosettaScripts]]
* [[HybridizeMover]]: El mover Hybridize que usa RosettaCM
* [[Structure prediction applications]]: Una lista de otras aplicaciones que se usan para predecir estructuras
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta

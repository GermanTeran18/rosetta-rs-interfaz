#MultistageRosettaScripts

#Máquina del tiempo

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

- Escrito por Jack Maguire; envía tus preguntas a jackmaguire1444@gmail.com
- Toda la información de aquí es válida a fecha del 2 de febrero de 2018

[[_TOC_]]

Una de las consecuencias de
[[archivar los resultados de los trabajos en disco|RunningMRS#running-multistage-rosetta-scripts_relevant-commandline-flags_archive_on_disk]]
es que los resultados siguen existiendo cuando termina el programa.
Por supuesto, esto suele significar solo que tienes que hacer la tarea extra de
borrar estos binarios cuando termines de ejecutar,
pero también hay ventajas:

###Anécdota

Supón que tus resultados finales tienen un rasgo que no esperabas
y quieres averiguar cómo se introdujo ese rasgo.
Por ejemplo, una vez ejecuté un protocolo con 1 stage de DockingProtocol
seguido de 5 stages de FastRelax (similar al [[ejemplo de relax por lotes|BatchRelaxExample]]).
Las estructuras finales estaban completamente desplegadas
y quise averiguar en qué punto había salido mal.
Cargué los 5 estados intermedios desde sus archivos
y pude ver cada estructura en PyMOL.
La proteína estaba plegada después del stage de docking,
pero estaba desplegada después del primer stage de FastRelax.
Una inspección más detallada mostró que el producto del DockingProtocol
tenía muchos choques de cadenas laterales que no estaban en la estructura de entrada.
El uso de esta función de máquina del tiempo me permitió descubrir rápidamente que
no estaba usando correctamente el [[SaveAndRetrieveSidechainsMover|SaveAndRetrieveSidechainsMover]].

###Ejemplo de juguete

Juguemos con un protocolo de 3 stages que hace Docking, PackRotamersMover y MinMover:

```xml
<JobDefinitionFile>
    <Job>
        <Input>
            <PDB filename="3U3B.pdb"/>
        </Input>
    </Job>

    <Common>

        <TASKOPERATIONS>
            <RestrictToRepacking name="rtr"/>
        </TASKOPERATIONS>

        <SCOREFXNS>
            <ScoreFunction name="sfxn" weights="ref2015_cart.wts"/>
            <ScoreFunction name="sfxn_lowres" weights="interchain_cen.wts"/>
        </SCOREFXNS>

        <FILTERS>
            <ScoreType name="sfxn_filter" score_type="total_score" scorefxn="sfxn" threshold="999999" />
        </FILTERS>

        <MOVERS>
            <DockingProtocol docking_score_low="sfxn_lowres" partners="A_B" low_res_protocol_only="true" name="dock" />
            <SwitchResidueTypeSetMover name="to_fa" set="fa_standard" />
            <SaveAndRetrieveSidechains allsc="1" multi_use="0" name="save_retrieve" two_step="1" />

            <PackRotamersMover scorefxn="sfxn" name="pack_rot" task_operations="rtr"/>

            <MinMover scorefxn="sfxn" name="min_mover" chi="1" bb="0"/>
        </MOVERS>

        <PROTOCOLS>
            <Stage num_runs_per_input_struct="100" total_num_results_to_keep="5">
                <Add mover_name="save_retrieve"/>
                <Add mover_name="dock"/>
                <Add mover_name="to_fa"/>
                <Add mover_name="save_retrieve"/>
                <Sort filter_name="sfxn_filter"/>
            </Stage>

            <Stage num_runs_per_input_struct="2" total_num_results_to_keep="5">
                <Add mover_name="pack_rot"/>
                <Sort filter_name="sfxn_filter"/>
            </Stage>

            <Stage num_runs_per_input_struct="1" total_num_results_to_keep="3">
                <Add mover_name="min_mover"/>
                <Sort filter_name="sfxn_filter"/>
            </Stage>

        </PROTOCOLS>

    </Common>
</JobDefinitionFile>
```

Si lo estás siguiendo, uso el archivo 3U3B
directamente de RCSB ([[enlace|https://files.rcsb.org/view/3U3B.pdb]]).
Mi comando de ejecución fue así:

####Ejecutar Rosetta

```sh
$ ls
3U3B.pdb  job_def.xml
$ mkdir archives
$ mpirun -n 12 multistage_rosetta_scripts.mpiserialization.linuxgccrelease -job_definition_file job_def.xml -archive_on_disk archives -n_archive_nodes 1 -mpi_tracer_to_file mpi
$ ls
3U3B_0111_0001.pdb  3U3B_0112_0001.pdb  3U3B_0114_0001.pdb  3U3B.pdb  archives  job_def.xml  mpi_0  mpi_1  mpi_10  mpi_11  mpi_2  mpi_3  mpi_4  mpi_5  mpi_6  mpi_7  mpi_8  mpi_9  score.sc.1  score.sc.2
```

####Encontrar los estados intermedios

Tenemos 3 archivos de salida, como se esperaba.
Imaginemos que hemos mirado los 3 y que 3U3B_0112_0001.pdb tiene un rasgo especial que nos interesa.
Queremos ver las instantáneas de la trayectoria que creó ese archivo,
pero primero tenemos que averiguar qué archivos de archivo hay que mirar.
Para ello, mira el final de la salida del nodo principal de la siguiente forma:

```sh
$ tail mpi_0 
protocols.multistage_rosetta_scripts.MRSJobQueen: (0) Job Genealogy:
protocols.multistage_rosetta_scripts.MRSJobQueen: (0) ((((JR_113_1)JR_107_1,(JR_114_1)JR_108_1)JR_54_1,((JR_111_1)JR_101_1,(JR_112_1)JR_102_1)JR_77_1,(JR_105_1)JR_97_1)input_source_1)all
protocols.jd3.job_distributors.MPIWorkPoolJobDistributor: (0) Sending output to archive 1
protocols.jd3.job_distributors.MPIWorkPoolJobDistributor: (0) Pushing back output into queue for archive 1
protocols.jd3.job_distributors.MPIWorkPoolJobDistributor: (0) Sending output spec for 112 1 with output_id 112 1 to node 2
protocols.jd3.job_distributors.MPIWorkPoolJobDistributor: (0) Remote 1 has completed an output
protocols.jd3.job_distributors.MPIWorkPoolJobDistributor: (0) Sending remote 1 an output archived on another node, if available.
protocols.jd3.job_distributors.MPIWorkPoolJobDistributor: (0) ... output work was NOT available
protocols.jd3.job_distributors.MPIWorkPoolJobDistributor: (0) Exiting go_master
```

o

```sh
$ grep ')all' mpi_0
protocols.multistage_rosetta_scripts.MRSJobQueen: (0) ((((JR_113_1)JR_107_1,(JR_114_1)JR_108_1)JR_54_1,((JR_111_1)JR_101_1,(JR_112_1)JR_102_1)JR_77_1,(JR_105_1)JR_97_1)input_source_1)all
```

Esto nos da el linaje de los archivos en
[[formato de árbol Newick|https://en.wikipedia.org/wiki/Newick_format]].
Queremos encontrar la hoja JR_112_1 (los números coinciden con el nombre de archivo pdb 3U3B_0112_0001.pdb)
y anotar las ramas ascendentes.
Es un poco difícil hacerlo directamente a partir del texto,
por lo que quizá quieras usar algún visor de árboles filogenéticos
(o la herramienta que se describe en la siguiente sección).
El árbol tiene este aspecto:

```
input_source_1 - | JR_54_1 - | JR_107_1 - | JR_113_1
	         | 	     | 		  
	         |	     | JR_108_1 - | JR_114_1
	         |	     
		 | JR_77_1 - | JR_101_1 - | JR_111_1
		 | 	     |
		 |	     | JR_102_1 - | JR_112_1
		 |
		 | JR_97_1 - | JR_105_1
```

En este árbol puedes ver que JR_102_1 y JR_77_1 son los dos antecesores inmediatos de JR_112_1.
Ahora busquemos archivos de archivo con números coincidentes (tanto el primer como el segundo número deben coincidir;
el segundo número no siempre es 1) y desarchivémoslos con el siguiente comando:

####Explicación de cómo leer las etiquetas del árbol Newick
Por desgracia, los nombres de archivo de los archivos de archivo y de salida
no están disponibles para la clase que crea el árbol Newick.
Es una limitación evitable, pero quise esperar a que JD3
estuviera más consolidado antes de implementar el proceso de correspondencia de nombres.
Por eso 3U3B_0112_0001.pdb tuvo que etiquetarse como JR_112_1
y 3U3B.pdb tuvo que etiquetarse como input_source_1.

El primer y el segundo número del
archivo de salida (112 y 1 en 3U3B_0112_0001.pdb) y
del archivo de archivo (102 y 1 en archive.102.1) siempre coincidirán
con los números del resultado del trabajo que aparece en el árbol Newick
(JR_112_1 y JR_102_1, respectivamente).

Las fuentes de entrada se numeran según el orden en que
aparecen en el job_definition_file.
Puedes tener dos etiquetas `<Job/>`, cada una definiendo PDBLists de longitud 10,
lo que da 20 fuentes de entrada.

####Herramienta de análisis de árboles

Este formato de árbol Newick puede resultar bastante ilegible para el ojo humano,
especialmente en un árbol del tamaño de una ejecución de producción.
Añadí algunos scripts auxiliares en tools/rosetta_scripts (quizá tengas que hacer pull de master).

Si le proporcionas al script el objetivo que quieres rastrear y una copia del árbol pegada,
imprimirá el linaje de ese trabajo desde el final hasta el principio.

`extract_path_from_newick_tree.py`:
```sh
$ python extract_path_from_newick_tree.py JR_112_1 '((((JR_113_1)JR_107_1,(JR_114_1)JR_108_1)JR_54_1,((JR_111_1)JR_101_1,(JR_112_1)JR_102_1)JR_77_1,(JR_105_1)JR_97_1)input_source_1)all'
JR_112_1
JR_102_1
JR_77_1
input_source_1
```

Usa `extract_path_from_newick_tree_python3.py` si ya has actualizado a Python 3:
```sh
$ python3 extract_path_from_newick_tree_python3.py JR_112_1 '((((JR_113_1)JR_107_1,(JR_114_1)JR_108_1)JR_54_1,((JR_111_1)JR_101_1,(JR_112_1)JR_102_1)JR_77_1,(JR_105_1)JR_97_1)input_source_1)all'
JR_112_1
JR_102_1
JR_77_1
input_source_1
```

####Salida final

```sh
$ ls archives/
archive.101.1  archive.102.1  archive.108.1  archive.54.1  archive.77.1
$ multistage_rosetta_scripts.mpiserialization.linuxgccrelease -unarchive archives/archive.77.1 archives/archive.102.1
...
$ ls archives/
archive.101.1  archive.102.1  archive.102.1.pdb  archive.108.1  archive.54.1  archive.77.1  archive.77.1.pdb
```

Ahora tenemos los siguientes archivos .pdb:

| Nombre de archivo  | Estado                                               |
| ------------------ | ---------------------------------------------------- |
| 3U3B.pdb           | archivo de entrada                                   |
| archive.77.1.pdb   | estado intermedio tras DockingProtocol (stage 1)     |
| archive.102.1.pdb  | estado intermedio tras PackRotamersMover (stage 2)   |
| 3U3B_0112_0001.pdb | estado final tras MinMover (stage 3)                 |


####Letra pequeña
Quizá notes que el árbol tiene elementos extra que no se escribieron como salida.
El motivo no me resulta evidente.
Mi suposición es que el último elemento «malo» no se elimina hasta después de imprimir el árbol.
No creo que este error provoque que falte un elemento que debería estar presente.


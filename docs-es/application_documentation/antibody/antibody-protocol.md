RosettaAntibody3: flujo de trabajo del protocolo
================================================

Metadatos
---------

Autores: Jianqing Xu (xubest@gmail.com), Daisuke Kuroda (dkuroda1981@gmail.com), Oana Lungu (olungu@utexas.edu), Jeffrey Gray (jgray@jhu.edu)

Investigador principal responsable: Jeffrey Gray (jgray@jhu.edu).

Última edición el 17/5/2020 por Jeliazko Jeliazkov (jeliazkov@jhu.edu) y el 29/5/2020 por Rahel Frick (rahel.frick@jhu.edu)

Referencias
-----------

Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaAntibody:

-   B. D. Weitzner\*, J. R. Jeliazkov\*, S. Lyskov\*, N. M. Marze, D. Kuroda, R. Frick, J. Adolf-Bryfogle, N. Biswas, R. L. Dunbrack Jr., and J. J. Gray, "Modeling and docking of antibody structures with Rosetta." Nature Protocols 12, 401&ndash;416 (2017)

-   B. D. Weitzner, D. Kuroda, N. M. Marze, J. Xu & J. J. Gray, "Blind prediction performance of RosettaAntibody 3.0: Grafting, relaxation, kinematic loop modeling, and full CDR optimization." Proteins 82(8), 1611&ndash;1623 (2014)


-   A. Sivasubramanian,\* A. Sircar,\* S. Chaudhury & J. J. Gray, "Toward high-resolution homology modeling of antibody Fv regions and application to antibody-antigen docking," Proteins 74(2), 497&ndash;514 (2009)

Visión general
--------------

**Ten en cuenta que esta visión general sirve para que ejecutes el protocolo lo antes posible con el mínimo de conocimientos. Para los detalles de cada paso, consulta:**

* [[Aplicación RosettaAntibody3: modelado de anticuerpos por homología|antibody-cc]]
* [[Aplicación RosettaAntibody3: protocolo Antibody Modeler (CDR H3 y VL-VH)|antibody-model-CDR-H3]]

Rosetta Antibody puede modelar tanto anticuerpos (formados por las regiones variables de las cadenas pesada y ligera) como nanocuerpos (formados solo por la región variable de la cadena pesada). Para ejecutar el protocolo se necesita:

1. La secuencia de interés en formato FASTA, con una línea de descripción antes de la secuencia que indique ">heavy" o ">light".
2. NCBI BLAST+ (versión 2.2.28 o posterior).
3. Rosetta (la más reciente si es posible; oficialmente compatible desde la 3.7).
4. La base de datos de anticuerpos incluida en el repositorio Rosetta/tools (lo más actualizada posible).

En Rosetta, el modelado de anticuerpos es un proceso de dos etapas. 

**Ejecutable: antibody**

Primero, las secuencias se dividen en regiones estructuralmente conservadas (FRH, H1, H2, H3, FRL, L1, L2 y L3) y se seleccionan plantillas de la base de datos según la puntuación de BLAST+. Como alternativa, se pueden especificar plantillas manualmente mediante el código PDB y la opción -antibody:{region}_template, por ejemplo: `-antibody:l1_template 1rzi`. Ten en cuenta que las plantillas deben estar presentes en la base de datos. Tras la selección, las regiones determinantes de complementariedad (CDR) de las plantillas se injertan sobre los marcos de las plantillas, y los marcos se ensamblan según una orientación VH&ndash;VL de plantilla (predecir esta orientación es difícil, por lo que se usan diez orientaciones de plantilla). Se recomienda mucho, aunque es opcional, un FastRelax con restricciones para aliviar los choques introducidos por el injerto. 

Línea de comandos de ejemplo: `antibody.macosclangrelease -fasta antibody_chains.fasta | tee grafting.log`.

Aquí `antibody_chains.fasta` tiene este aspecto:
```
>heavy
VKLEESGGGLVQPGGSMKLSCATSGFRFADYWMDWVRQSPEKGLEWVAEIRNKANNHATYYAESVKGRFTISRDDSKRRVYLQMNTLRAEDTGIYYCTLIAYHYPWFAYWGQGTLVTVS
>light
DVVMTQTPLSLPVSLGNQASISCRSSQSLVHSNGNTYLHWYLQKPGQSPKLLIYKVSNRFSGVPDRFSGSGSGTDFTLKISRVEAEDLGVYFCSQSTHVPFTFGSGTKLEIKR
```

También se pueden modelar anticuerpos de solo cadena pesada especificando únicamente una cadena pesada y la opción `-vhh_only`.

El tiempo de ejecución habitual, con FastRelax, es de ~20 minutos por modelo o ~3 horas para 10 modelos.

Desde el 27 de abril de 2019 hay una **nueva base de datos** en `additional_protocol_data`, con algunos cambios leves de formato respecto a la anterior. Cambiar a la nueva base de datos es fácil: basta ejecutar `git submodule update --init --recursive` en la versión de Rosetta controlada con git. Es de suponer que el repositorio de datos adicionales también se puede descargar para los usuarios en general.

**Ejecutable: antibody_H3**

A continuación, para cada modelo injertado, el CDR H3 se modela de novo y la orientación relativa VH&ndash;VL se refina mediante docking local. Las opciones se dividen en un conjunto de simulación y un conjunto de modelado de loops. Ambos conjuntos se muestran abajo (las opciones de modelado de loops también se encuentran en tools/antibody/abH3.flags). Si el modelado de loops es lento, se puede acelerar reduciendo el muestreo KIC con las opciones `-loops:refine_outer_cycles 2` y `-loops:max_inner_cycles 20`; sin embargo, estas opciones no se han evaluado con benchmarks. Si usas varias orientaciones VH&ndash;VL, recomendamos generar 1000 estructuras para el mejor modelo injertado (normalmente model-0.relaxed.pdb) y 200 estructuras para las demás orientaciones.

Línea de comandos de ejemplo (a 17 de mayo de 2020): `antibody_H3.macosclangrelease @flags`.

flags:
```
# input grafted model
-s grafting/model-0.relaxed.pdb

# recommended number of structs
-nstruct 1000 

# constraints are enabled by default, so flags are shown just to indicate that they can be turned off
# recommended as kink is present in 90% of Abs and as VH-VL Q-Q is present in 808%
-antibody:h3_loop_csts_lr true
-antibody:h3_loop_csts_hr true
-antibody:auto_generate_h3_kink_constraint true
-antibody:constrain_vlvh_qq true
-constraints:cst_weight 1.0

# standard settings, for packages used by antibody_H3
-ex1
-ex2
-extrachi_cutoff 0

# necessary if running multiple procs w/o MPI
-multiple_processes_writing_to_one_directory 

# specify output file
-out:file:scorefile H3_modeling_scores.fasc 

# specify output folder
-out:path:pdb H3_modeling 
```

El tiempo de ejecución varía según la longitud del CDR H3 (debido a KIC). En nuestro benchmark, el tiempo fue de ~1 hora por modelo. Recomendamos encarecidamente usar un clúster para acelerar los cálculos. 

Además, conviene validar que los modelos tengan una orientación VH&ndash;VL razonable. Esto se puede hacer con el siguiente comando: `python $ROSETTA/main/source/scripts/python/public/plot_VL_VH_orientational_coordinates/plot_LHOC.py`.

**Opciones anteriores al 17 de mayo de 2020**
Línea de comandos de ejemplo (a 24 de junio de 2019): `antibody_H3.macosclangrelease @flags`.

flags:
```
# input grafted model
-s grafting/model-0.relaxed.pdb

# recommended number of structs
-nstruct 1000 

# enable contraints (probably should just detect weight in future)
-antibody:constrain_cter
-constraints:cst_weight 1.0

# recommended kink cst, kink present in 90% of Abs
-antibody:auto_generate_kink_constraint 
-antibody:all_atom_mode_kink_constraint

# recommended VH-VL Q-Q constraint, you must manually specify the file (see integration test)
-antibody:constrain_vlvh_qq

# standard settings, for packages used by antibody_H3
-ex1
-ex2
-extrachi_cutoff 0

# necessary if running multiple procs w/o MPI
-multiple_processes_writing_to_one_directory 

# specify output file
-out:file:scorefile H3_modeling_scores.fasc 

# specify output folder
-out:path:pdb H3_modeling 
```


Posprocesamiento
----------------

Puedes usar un conjunto de decoys simultáneamente en simulaciones de docking anticuerpo-antígeno, como SnugDock y EnsembleDock.

##Véase también

* [[General Antibody Options and Tips]]
* [[Antibody Applications]]: página principal de las aplicaciones de anticuerpos
    - [[RosettaAntibodyDesign]]: diseño de anticuerpos y complejos anticuerpo-antígeno
    - [[Docking de anticuerpos camélidos|antibody-mode-camelid]]: docking de anticuerpos camélidos con sus antígenos.
    - [[SnugDock | snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
    * [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar o comparar estrategias de diseño de anticuerpos.
    * [[CDR Cluster Identification]]: una aplicación que asigna cada CDR de un anticuerpo a los clústeres de CDR de North/Dunbrack según la menor distancia diedra al centro de cada clúster.
    * [[CDR Cluster Constrained Relax]]: una aplicación para relajar CDR mediante restricciones armónicas circulares basadas en los clústeres de CDR identificados.
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta

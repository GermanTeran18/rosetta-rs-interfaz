#Modelado cinemático de loops de nueva generación y muestreo restringido por torsiones

Metadatos
========

Autora: Amelie Stein

Documentación y código de Amelie Stein. La investigadora principal correspondiente a esta aplicación es Tanja Kortemme (kortemme@cgl.ucsf.edu). Este documento fue actualizado por última vez en diciembre de 2015 por Jared Adolf-Bryfogle. 

Puedes encontrar un tutorial introductorio sobre modelado de loops [aquí](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling).

Código y demo
=============

La aplicación actual para este método (en Rosetta 3.5) es `       bin/loopmodel.<my_os>gccrelease      ` . La implementación del cierre analítico se describe en la documentación del cierre cinemático de loops. Las principales adiciones de KIC de nueva generación (NGK) son los nuevos perturbadores en `       src/protocols/loops/loop_closure/kinematic_closure/KinematicPerturber      ` y el TabooMap en `       src/protocols/loops/loop_closure/kinematic_closure/KinematicMover      ` , que lleva la cuenta de los vectores de bins de torsión que se han muestreado en la trayectoria actual. Las tablas generales y específicas de bins de torsión para el muestreo phi/psi de los residuos no pivote están implementadas en `       src/core/scoring/Ramachandran</core> for residue-specific distributions and               src/core/scoring/Ramachandran2B</core> for residue- and neighbor-specific distributions. A basic usage example that briefly remodels an 8-residue loop is the                 next_generation_KIC        ` prueba de integración, que se encuentra en `         main/tests/integration/tests/next_generation_KIC        ` .


Referencias
==========

KIC de nueva generación se describe y se compara con el modelado de loops KIC estándar en 

-   Stein A, Kortemme T. (2013). [Improvements to robotics-inspired conformational sampling in rosetta.](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0063090) PLoS One. 2013 May 21;8(5)

Las definiciones de bins de torsión usadas por TabooSampling y TorsionRestrictedSampling se basan en

-   Kim DE, Blum B, Bradley P, Baker D. (2009). Sampling bottlenecks in de novo protein structure prediction. *J Mol Biol* . 393(1):249-260.

Las distribuciones de Ramachandran dependientes de los vecinos usadas para el muestreo de residuos no pivote se describen en

-   Ting D, Wang G, Shapovalov M, Mitra R, Jordan MI, Dunbrack RL Jr. (2010). Neighbor-dependent Ramachandran probability distributions of amino acids developed from a hierarchical Dirichlet process model. *PLoS Comput Biol* . 6(4):e1000763.

Las mejores opciones actuales y las capturas de protocolo se pueden encontrar [aquí](https://guybrush.ucsf.edu/benchmarks/benchmarks/loop_modeling)

Limitaciones
===========

Por definición, los movimientos KIC son perturbaciones locales, así que los átomos C-alfa de los residuos inicial y final de las definiciones de loop permanecen fijos. Las definiciones de loop pueden incluir los extremos N y/o C de proteínas monoméricas, y los átomos C-alfa de los extremos permanecerán fijos (es decir, el modelado de loops NGK no se puede usar para muestrear las conformaciones de los propios residuos terminales sin añadir residuos «virtuales» a los extremos).

Archivos de entrada
===========

Los siguientes archivos son necesarios para el modelado cinemático de loops:

-   Archivo PDB inicial, especificado con `    -in:file:s       ` . La estructura inicial debe tener coordenadas reales para todos los residuos fuera de la definición del loop, además del primer y el último residuo de cada región de loop.

-   Archivo de definición de loops, especificado con ` -loops:loop_file` y compartido por todos los protocolos de modelado de loops. Para cada loop que se vaya a modelar, incluye lo siguiente en una línea:

    ```
    column1  "LOOP":     The loop file identify tag
    column2  "integer":  Loop start residue number
    column3  "integer":  Loop end residue number
    column4  "integer":  Cut point residue number, >=startRes, <=endRes. default - let the loop modeling code choose cutpoint. 
                         Note: Setting the cut point outside the loop can lead to a segmentation fault. 
    column5  "float":    Skip rate. default - never skip
    column6  "boolean":  Extend loop. Default false. Setting this flag to 1 leads to randomization of the loop conformation before NGK sampling, 
                         using idealized bond lengths and angles. This is important for loop reconstruction benchmarks to ensure a starting loop 
                         conformation that is different from the original one, as well as for de novo loop construction/insertion with KIC, 
                         to create a connected starting loop conformation from single unconnected loop residues 
                         (see tutorial at rosetta/demos/public/model_missing_loop). 
    ```

    Puedes encontrar un ejemplo de archivo de definición de loops en `    rosetta/main/tests/integration/tests/next_generation_KIC/input/4fxn.loop`, que tiene este aspecto:

    ```
    LOOP 88 95 92 0 1
    ```

**NOTA:** Los índices de residuos en los archivos de definición de loops se refieren a la *numeración de Rosetta* (numerada de forma continua desde '1', incluso entre cadenas en proteínas de varias cadenas). Puede ser útil renumerar las estructuras iniciales con la numeración de Rosetta para que las definiciones de loop y los índices de residuos del PDB coincidan.

Opciones
=======

Consulta [Rosetta Benchmark](https://guybrush.ucsf.edu/benchmarks/benchmarks/loop_modeling) para ver las mejores prácticas actuales para ejecutar NGK.

-   Las siguientes opciones sirven para activar NGK y deben estar presentes en la línea de comandos. Se requiere una de las dos, o ambas, entre `    -loops:remodel   ` (etapa centroid, necesaria para la reconstrucción *de novo* de loops) y `    -loops:refine   ` (etapa de todos los átomos):

    ```
    -database                       Path to the Rosetta database. [Path]
    -loops:remodel                  Selects a protocol for the centroid remodeling stage.
                                    Legal values: 'perturb_kic','perturb_ccd','quick_ccd','quick_ccd_moves','old_loop_relax','no'.
                                    default = 'quick_ccd'. For KIC and NGK, use 'perturb_kic'. [String]
    -loops:refine                   Selects the all-atom refinement stage protocol.
                                    Legal values: 'refine_kic','refine_ccd','no'. default = 'no'. For KIC and NGK, use 'refine_kic'. [String]
    -loops:taboo_sampling           Taboo Sampling: keep track of sampled torsion bins for each loop position and promote diversity among models by sampling non-torsion pivots from currently underrepresented bins. Perturb/remodel stage only.
    -loops:kic_rama2b               Use neighbor-dependent Ramachandran distributions for phi/psi sampling of non-pivot torsions instead of the standard Ramachandran distributions. Perturb and refine stages. Note that this increases the memory footprint to about 6G.
    -loops:ramp_fa_rep              Ramp the weight of fa_rep over outer loops in refinement. It is recommended to use 5 or more outer loops for smoother ramp effects. 
    -loops:ramp_rama                Ramp the weight of rama (or rama2b, if using -loops:kic_rama2b) over outer loops in refinement. It is recommended to use 5 or more outer loops for smoother ramp effects. 
    -loops:loop_file                Path/name of loop definition file. default = 'loop_file'. [File]
    ```

-   Las siguientes opciones generales de Rosetta se usan habitualmente con NGK:

    ```
    -in:file:s                      Path/name of input pdb file. [File]
    -in:file:native                 Path/name of native pdb file. Backbone rmsd to this structure will be reported in each output decoy.
                                    If no native structure is provided, the protocol will return an rmsd of 0. [File]
    -in:file:fullatom               Read the input structure in full-atom mode. Set this flag to avoid discarding the native side chains and repacking the input structure
                                    before modeling (KIC refine alway begins by repacking the loop side-chains,
                                    including the neighboring side-chains if -loops:fix_natsc is 'false'). default = 'false'. [Boolean]
    -loops:fix_natsc                Don't repack, rotamer trial, or minimize loop residue neighbors. default = 'false'. [Bolean]
    -ex1 (-ex2, -ex3, -ex4)         Include extra chi1 rotamers (or also chi2, chi3, chi4).
    -extrachi_cutoff 0              Set to 0 to include extra rotamers regardless of number of neighbors
    -extra_res_cen                  Path to centroid parameters file for non-protein atoms or ligands. Note that this is required for structures with ligands even if only full-atom remodeling is performed.
    -extra_res_fa                   Path to all-atom parameters file for non-protein atoms or ligands
    -overwrite                      Overwrite existing models (Rosetta will not output without this flag if same-named model exists)
    -out:pdb_gz                     Create compressed output PDB files (using gzip), which saves a lot of space. These files can still be 
                                    visualized normally with software such as Pymol. 
    ```

-   Consulta también las «opciones avanzadas» en la documentación de KIC.

Muestreo restringido por torsiones
===========================

Para un muestreo intensivo en partes concretas del espacio conformacional, p. ej., cuando se dispone de información sobre la estructura secundaria, usa las opciones siguientes. La cadena de bins de torsión debe tener la misma longitud que el loop remodelado. Actualmente esto solo está implementado para remodelar un loop cada vez. Usa `X` (mayúscula) para bins de torsión arbitrarios (es decir, la distribución de Ramachandran completa).  Las opciones válidas son `ABEGUX`, pero la clase que lo implementa no explica qué son en realidad.  

```
-loops:restrict_kic_sampling_to_torsion_string    Only sample phi/psi for non-pivot torsions from the provided torsion bin string. [String]
-loops:derive_torsion_string_from_native_pose     Only sample phi/psi for non-pivot torsions within the torsion bins in the native (or, if -in:file:native isn't provided, input) structure.
```

Novedades desde la última versión
=============================

Rosetta 3.5 es la primera versión que incluye KIC de nueva generación.

##Véase también

* [Tutorial de modelado de loops](https://www.rosettacommons.org/demos/latest/tutorials/loop_modeling/loop_modeling)
* [[Loopmodel]]: La página principal de la aplicación loopmodel
* [Rosetta Benchmarks](https://guybrush.ucsf.edu/benchmarks/benchmarks/loop_modeling): Benchmarks actuales de NGK
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura, incluido el modelado de loops
* [[Fragment file]]: Formato de archivo de fragmentos (necesario para la predicción de estructura ab initio)
* [[Loops file]]: Formato de archivo para especificar loops en el modelado de loops
* [[Loop modeling algorithms|loopmodel-algorithms]]
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta

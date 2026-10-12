#Colección de líneas de comandos para aplicaciones piloto y públicas

Metadatos
=========

Este documento fue editado el 10 de noviembre de 2008 por Yi Liu. Los créditos son para los desarrolladores que me ayudaron a reunir estas líneas de comandos tan útiles.

Instrucciones
=============

-   Todavía no hay ejemplos específicos para todas las aplicaciones piloto del trunk de Rosetta.
-   Asegúrate de tener la aplicación en pilot\_apps.src.settings.
-   O bien, puedes compilar todas las aplicaciones piloto con la opción de scons pilot\_apps\_all

Líneas de comandos aportadas por Firas
======================================

Consulta la lista de opciones para encontrar la descripción de cada opción de los comandos

-   backrub:

    ```
    path/to/rosetta/source/bin/backrub.linuxgccrelease -s 1cc8_model15.pdb -ex1 -ex2aro -ex1aro -backrub:pivot_residues 10 11 12 13 14 15 -packing:resfile Resfile -backrub:ntrials 5000 -backrub:mc_kt 1.0 -database path/to/rosetta/main/database/ -out:nstruct 1000
    ```

-   puntuación con rosetta:

    ```
    path/to/rosetta/source/bin/backrub.linuxgccrelease -s 1cc8_model15.pdb -ex1 -ex2aro -ex1aro -backrub:pivot_residues 10 11 12 13 14 15 -packing:resfile Resfile -backrub:ntrials 5000 -backrub:mc_kt 1.0 -database path/to/rosetta/main/database/ -out:nstruct 1000
    ```

-   puntuación con rosetta:

    ```
    path/to/rosetta/source/bin/backrub.linuxgccrelease -s 1cc8_model15.pdb -ex1 -ex2aro -ex1aro -backrub:pivot_residues 10 11 12 13 14 15 -packing:resfile Resfile -backrub:ntrials 5000 -backrub:mc_kt 1.0 -database path/to/rosetta/main/database/ -out:nstruct 1000
    ```

-   relax con rosetta:

    ```
    path/to/rosetta/source/bin/relax.linuxgccrelease -database /path/to/rosetta/main/database/  -score:weights score13_env_hb -out:pdb -out:prefix relaxed -out:nstruct 100 -in:file:s 1utg_model39.pdb 
    ```

-   relax con restricciones en rosetta:

    ```
    /path/to/rosetta/source/bin/relax.linuxgccrelease -database path/to/rosetta/main/database/  -score:weights score13_env_hb -out:pdb -out:prefix constrained -constraints:cst_file constraints_file -constraints:cst_weight 2.0 -out:nstruct 100 -in:file:s 1utg_model39f.pdb
    ```

-   modelado de loops con restricciones:

    ```
    add -constraints:cst_fa_file and -constraints:cst_fa_weight
    cst_weight can be higher (up to 10, even 100), sample constraints file:
    AtomPair CZ 64 CA 8 GAUSSIANFUNC 6.39 2.0
    ```

-   construir un loop

    ```
    path/to/rosetta/source/bin/minirosetta.linuxgccrelease @args
    ```
    con el archivo de argumentos:
    ```
    -in::file::s  threaded-model.pdb
    -database /path/to/rosetta/main/database/
    -loops::frag_sizes 9 3 1
    -loops::frag_files aat000_09_05.200_v1_3 aat000_03_05.200_v1_3 none
    -loops::loop_file t000_.loopfile
    -score:weights score13_env_hb
    -psipred_ss2 fragments/t000_.psipred_ss2
    -run::protocol looprelax
    -loops::remodel quick_ccd
    -loops::relax fullrelax
    -out::nstruct 100
    -in:file:fullatom
    -out::pdb
    -out::prefix lr_decoys
    ```

-   packstate:

    ```
    /path/to/rosetta/source/bin/packstat.linuxgccrelease -database /path/to/rosetta/main/database -packstat:packstat_pdb -s 1shf.pdb
    ```

Líneas de comandos aportadas por Steven Lewis
=============================================

####A continuación se muestran archivos de opciones de ejemplo. Las aplicaciones asociadas están obsoletas, están documentadas en otro lugar o no están disponibles para uso público; se ofrecen solo como ejemplos genéricos.

-   archivo de opciones para pilot/rjha/MatchFilter.cc

    ```
    -database /path/to/rosetta/main/database
    -options::user
    -run::version
    -mute core
    -l pdblist
    ```

-   archivo de opciones para pilot/rjha/MetalInterfaceStructureCreator.cc

    ```
    -database /path/to/rosetta/main/database
    -s NE2.pdb
    -run::version
    -options::user
    -resfile resfile
    ```

-   archivo de opciones para pilot/rjha/MetalInterfaceStructureCreator.cc

    ```
    -database /path/to/rosetta/main/database
    -s NE2.pdb
    -run::version
    -options::user
    -resfile resfile
    -ex1
    -ex2
    -extrachi_cutoff 1
    -use_input_sc
    -run::min_type dfpmin_armijo_nonmonotone
    -nstruct 1
    -AnchoredDesign::perturb_temp 1.0
    -AnchoredDesign::perturb_cycles 500
    -AnchoredDesign::perturb_show
    -AnchoredDesign::refine_cycles 1
    -pose_metrics::interface_cutoff 10
    local options:
    -MetalInterface::partner1 (partner 1, defaults to ank.pdb)
    -MetalInterface::partner2 (partner 2, defaults to ubc12.pdb)
    -MetalInterface::partner2_residue (which residue on ubc12 to replace,defaults to 62)
    -skip_sitegraft_repack
    ```

-   archivo de opciones para pilot/smlewis/AnchoredDesign.cc

    ```
    -database /path/to/rosetta/main/database
    -mute core.chemical core.scoring.etable core.io.database
    core.io.pdb.file_data core.conformation core.pack.pack_rotamers
    core.pack.task
    -run::version
    -options::user
    -s /netscr/smlewis/18_1F11_design_132cut/1F11_t-1QWF.pdb
    -loops::loop_file loopsfile
    -in::file::frag3/netscr/smlewis/18_1F11_design_132cut/aat000_03_05.200_v1_3.plusSH3.gz
    -resfile /netscr/smlewis/18_1F11_design_132cut/resfile/netscr/smlewis/18_1F11_design_132cut/resfile2
    -ex1
    -ex2 #only later
    -use_input_sc
    -run::min_type dfpmin_armijo_nonmonotone
    -AnchoredDesign::anchor /netscr/smlewis/18_1F11_design_132cut/anchor
    -AnchoredDesign::debug
    -AnchoredDesign::refine_only
    -AnchoredDesign::perturb_show
    -AnchoredDesign::perturb_report 1
    -AnchoredDesign::perturb_temp
    -AnchoredDesign::refine_report 1
    -AnchoredDesign::refine_temp
    -AnchoredDesign::refine_repack_cycles 30
    -constant_seed
    -jran !!!
    -AnchoredDesign::perturb_cycles 300
    -AnchoredDesign::refine_cycles 1000
    -nstruct 334
    ```

Líneas de comandos aportadas por Ben Stranges
=============================================

-   dock\_design\_parser de Sarel

    ```
    -database ../database  (path to database)
    -s pdbname.pdb  (structure to dock/design)
    -parser:protocol protocol_name.protocol  (the file that contains the XML formatted protocol to use)
    -parser:ntrials 10  (number of total times the parser is run)
    -nstruct 5  (total number of possible structures (pdbs) output)
    -parser:view  (gives graphics of protocol; need to compile with extras=graphics for this to work)
    ```

##Véase también

* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Scripting Documentation]]: interfaces de scripting para Rosetta
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[TACC]]: información para ejecutar Rosetta en el clúster TACC/Stampede.

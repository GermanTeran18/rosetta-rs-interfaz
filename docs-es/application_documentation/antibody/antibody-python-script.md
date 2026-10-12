# RosettaAntibody3: el script de preprocesamiento en Python

Metadatos
=========

Autores: Jianqing Xu (xubest@gmail.com), Daisuke Kuroda (dkuroda1981@gmail.com), Oana Lungu (olungu@utexas.edu), Jeffrey Gray (jgray@jhu.edu)

Investigador principal responsable: Jeffrey Gray (jgray@jhu.edu).

Última edición el 28/9/2014 por Jared Adolf-Bryfogle. 

Referencias
===========

Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaDock:

-   J. Xu, D. Kuroda & J. J. Gray, “RosettaAntibody3: Object-Oriented Designed Protocol and Improved Antibody Homology Modeling.” (2013) in preparation
-   A. Sivasubramanian,\* A. Sircar,\* S. Chaudhury & J. J. Gray, "Toward high-resolution homology modeling of antibody Fv regions and application to antibody-antigen docking," Proteins 74(2), 497-514 (2009)

Propósito de la aplicación
===========================================

Este es un script de Python para el preprocesamiento del protocolo de anticuerpos (repositorio solo para desarrolladores): [https://svn.rosettacommons.org/source/trunk/antibody/scripts.v2/](https://svn.rosettacommons.org/source/trunk/antibody/scripts.v2/)

El script consta de 3 pasos principales:

1.  selección de plantillas mediante BLAST,
2.  injerto mediante un ejecutable de Rosetta,
3.  optimización del modelo injertado mediante protocolos de Rosetta. En el paso 3 se usa FastRelax con restricciones de todos los átomos. Este paso mejora los valores Phi/Psi de las plantillas.

**Entradas:**

1.  Secuencia del Fv de la cadena ligera en formato FASTA
2.  Secuencia del Fv de la cadena pesada en formato FASTA

También puedes especificar plantillas con las opciones –L1=\<PDB ID 1\>, –L2=\<PDB ID 2\>, etc. Consulta todas las opciones más abajo.

**Salidas:**

1.  PDB del Fv con la secuencia injertada y refinado: grafted.pdb, grafted.relaxed.pdb
2.  Archivo de restricciones para uso opcional en el paso 3: cter\_constraint

**Uso mínimo:**

```
./antibody.py --light-chain <input_l.fasta> --heavy-chain <input_h.fasta> --blast=<blast> --blast-database=<blast_database>
```

Las salidas finales son las siguientes. En este caso, tienes que injertar las plantillas tú mismo. FR.pdb (plantilla del FR y coordenadas ficticias de los CDR), L1.pdb, L2.pdb, L3.pdb, H1.pdb, H2.pdb, H3.pdb (plantilla de cada CDR)

**Uso completo para el injerto:**

```
./antibody.py --light-chain <input_l.fasta> --heavy-chain <input_h.fasta> --profit=<ProFit> --blast=<blast> --blast-database=<blast_database> --antibody-database=<antibody_database> --rosetta-bin=<rosetta/rosetta_sourse/bin> --rosetta-database=<rosetta_database> 
```

Las salidas finales son las siguientes.

1.  grafted.pdb (modelo injertado)
2.  grafted.relaxed.pdb (modelo injertado y relajado)
3.  cter\_constraint (archivo de restricciones de kink/extend)

Opciones
========

```
Usage: antibody.py [OPTIONS] [TESTS]

 Script for preparing detecting antibodys and preparing info for Rosetta
protocol.

Options:
  -h, --help            show this help message and exit
  -L LIGHT_CHAIN, --light-chain=LIGHT_CHAIN
                        Specify file with the light chain - pure IUPAC ASCII
                        letter sequence, no FASTA headers.
  -H HEAVY_CHAIN, --heavy-chain=HEAVY_CHAIN
                        Specify file with the heavy chain - pure IUPAC ASCII
                        letter sequence, no FASTA headers.
  --prefix=PREFIX       Prefix for output files (directory name). Default is
                        grafting/.
  --blast=BLAST         Specify path+name for 'blastall' executable. Default
                        is blastp [blast+].
  --superimpose-profit=SUPERIMPOSE_PROFIT
                        (default).  Add full path as argument if necessary.
  --superimpose-PyRosetta, --superimpose-pyrosetta
                        Use PyRosetta to superimpose interface (boolean)
  --blast-database=BLAST_DATABASE
                        Specify path of blast database dir.
  --antibody-database=ANTIBODY_DATABASE
                        Specify path of antibody database dir. Default:
                        script_dir/antibody_database.
  --rosetta-database=ROSETTA_DATABASE
                        Specify path of rosetta database dir.
  -x, --exclude-homologs
                        Exclude homologs with default cutoffs
  --homolog_exclusion=HOMOLOG_EXCLUSION
                        Specify the cut-off for homolog exclusion during CDR
                        or FR template selections.
  --homolog_exclusion_cdr=HOMOLOG_EXCLUSION_CDR
                        Specify the cut-off for homolog exclusion during CDR
                        template selections.
  --homolog_exclusion_fr=HOMOLOG_EXCLUSION_FR
                        Specify the cut-off for homolog exclusion during FR
                        template selections.
  --rosetta-bin=ROSETTA_BIN
                        Specify path to 'rosetta/source/bin' directory,
                        expected to harbor 'antibody_graft', 'idealize' and
                        'relax' executables. Default is
                        '$ROSETTA/main/source/bin, then <script location>/bin'
                        (place symlink there). If a particular executable is
                        not found and that is non-critical, corresponding
                        steps will be skipped.
  --rosetta-platform=ROSETTA_PLATFORM
                        Specify full extra+compiler+build type for rosetta
                        binaries found in --rosetta-bin. For example use
                        static.linuxgccrelease for static build on Linux.
                        Default are dynamic GCC release builds of the OS
                        executing the script.
  --idealize            Use idealize protocol on final model.
  --constant-seed       Use constant-seed flag in Rosetta grafting run (for
                        debugging).
  --idealizeoff, --noidealize
                        Do not use idealize protocol on final model. (default)
  --relax               Use relax protocol on final model. (default)
  --relaxoff, --norelax
                        Do not use relax protocol on final model.
  --skip-kink-constraints
                        Skip generation of kink constraints file (require
                        PyRosetta). Default is True.
  --timeout=TIMEOUT     Maximum runtime for rosetta relax run (use 0 for
                        unlimit), default is 900 - 15min limit
  -q, --quick           Specify fast run (structure will have clashes).
                        Prevents stem optimization and turns off relax,
                        idealize.
  --FRL=FRL             Specify path or PDB code for FRL template. If
                        specified this will overwrite blast selection.
  --FRH=FRH             Specify path or PDB code for FRH template. If
                        specified this will overwrite blast selection.
  --light=LIGHT         Specify path or PDB code for light template. If
                        specified this will overwrite blast selection.
  --heavy=HEAVY         Specify path or PDB code for heavy template. If
                        specified this will overwrite blast selection.
  --L1=L1               Specify path or PDB code for L1 template. If specified
                        this will overwrite blast selection.
  --L2=L2               Specify path or PDB code for L2 template. If specified
                        this will overwrite blast selection.
  --L3=L3               Specify path or PDB code for L3 template. If specified
                        this will overwrite blast selection.
  --H1=H1               Specify path or PDB code for H1 template. If specified
                        this will overwrite blast selection.
  --H2=H2               Specify path or PDB code for H2 template. If specified
                        this will overwrite blast selection.
  --H3=H3               Specify path or PDB code for H3 template. If specified
                        this will overwrite blast selection.
  --light_heavy=LIGHT_HEAVY
                        Specify path or PDB code for light_heavy template. If
                        specified this will overwrite blast selection.
  --self-test           Perform self test by using data in test/ dir and exit.
  --self-test-dir=SELF_TEST_DIR
                        Specify path for self test dir [default:self-test/].
  -v, --verbose         Generate verbose output.
  --filter-by-outlier=FILTER_BY_OUTLIER
                        Boolean option [0/1] that control filetering results
                        with filter_by_outlier function.
  --filter-by-sequence-length=FILTER_BY_SEQUENCE_LENGTH
                        Boolean option [0/1] that control filetering results
                        with filter_by_sequence_length function.
  --filter-by-alignment-length=FILTER_BY_ALIGNMENT_LENGTH
                        Boolean option [0/1] that control filetering results
                        with filter_by_alignment_length function.
  --filter-by-template-resolution=FILTER_BY_TEMPLATE_RESOLUTION
                        Boolean option [0/1] that control filetering results
                        with filter_by_template_resolution function.
  --filter-by-sequence-homolog=FILTER_BY_SEQUENCE_HOMOLOG
                        Boolean option [0/1] that control filetering results
                        with filter_by_sequence_homolog function.
  --filter-by-template-bfactor=FILTER_BY_TEMPLATE_BFACTOR
                        Boolean option [0/1] that control filetering results
                        with filter_by_template_bfactor function.

```

Novedades desde la última versión
=================================

Esta es la primera versión pública en Rosetta3

-   Admite el distribuidor de trabajos moderno (jd2).
-   Admite [[restricciones|constraint-file]] .

##Véase también

* [[Antibody protocol]]: aplicación asociada a este script
* [[General Antibody Options and Tips]]
* [[Antibody Applications]]: página principal de las aplicaciones de anticuerpos
    * [[Injerto de loops de CDR|antibody-assemble-cdrs]]: injerta las plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo aproximado del anticuerpo.  
    * [[Modelado del CDR H3|antibody-model-CDR-H3]]: determina estructuras de anticuerpos combinando el docking VL-VH y el modelado del loop H3.
    - [[Docking de anticuerpos camélidos|antibody-mode-camelid]]: docking de anticuerpos camélidos con sus antígenos.
    - [[SnugDock | snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
    * [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar o comparar estrategias de diseño de anticuerpos.

    * [[CDR Cluster Identification]]: una aplicación que asigna cada CDR de un anticuerpo a los clústeres de CDR de North/Dunbrack según la menor distancia diedra al centro de cada clúster.

     * [[CDR Cluster Constrained Relax]]: una aplicación para relajar CDR mediante restricciones armónicas circulares basadas en los clústeres de CDR identificados.
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta

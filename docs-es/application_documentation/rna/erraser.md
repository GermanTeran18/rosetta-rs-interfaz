# Remodelado de modelos cristalográficos de ARN con restricción de densidad electrónica (ERRASER: Enumerative Real-Space Refinement ASsitted by Electron density under Rosetta)

Metadatos
=========

Autor: Fang-Chieh Chou

Mar. 2012, por Fang-Chieh Chou (fcchou [at] stanford.edu).

Código y demo
=============

## No recomendamos ejecutar ERRASER con las versiones actuales de Rosetta (posteriores a 2016) ni junto con las versiones actuales de PHENIX.

### Usa versiones anteriores de Rosetta (se han probado las ~3.4 y 3.5, que funcionan bien) con el PHENIX contemporáneo o, preferiblemente, usa el servidor ROSIE en https://rosie.graylab.jhu.edu/erraser, que te permite mantener tus datos totalmente privados si lo deseas.

La canalización completa de ERRASER está controlada por un conjunto de códigos en python en `       src/apps/public/ERRASER/      ` . Las aplicaciones principales que se usan son *erraser\_minimizer* , *swa\_rna\_analytical\_closure* y *swa\_rna\_main* . Los códigos centrales de las aplicaciones SWA (StepWise Assembly) están en `       src/protocols/stepwise/legacy/rna/      ` . La función de puntuación de densidad electrónica que se usa en ERRASER está en `       src/core/scoring/electron_density_atomwise/      ` .

Para una demostración mínima de ERRASER, consulta: `       demos/public/ERRASER/      `

Referencias
===========

Chou, F.C., Sripakdeevong, P., Dibrov, S.M., Hermann, T., and Das, R. Correcting pervasive errors in RNA crystallography with Rosetta, arXiv:1110.0276. [Para ERRASER. Pendiente de publicación] [Preprint](http://arxiv.org/abs/1110.0276)

Sripakdeevong, P., Kladwang, W., and Das, R. (2011) "An enumerative stepwise ansatz enables atomic-accuracy RNA loop modeling", PNAS 108:20573-20578. [Para el algoritmo de stepwise assembly (SWA)] [Artículo](http://www.stanford.edu/~rhiju/Sripakdeevong_StepwiseAnsatz_2011.pdf) [Enlace](http://dx.doi.org/10.1073/pnas.1106516108)

Propósito de la aplicación
===========================================

Este código se usa para mejorar un modelo cristalográfico de ARN dado y reducir el número de posibles errores del modelo (que puede evaluarse con Molprobity), bajo la restricción del mapa experimental de densidad electrónica.

Algoritmo
=========

Este método encadena la minimización de todos los átomos de Rosetta con la reconstrucción por stepwise assembly de residuos individuales para mejorar un modelo cristalográfico de ARN dado. Durante el modelado se usa la puntuación de densidad electrónica para restringir el modelo.

Limitaciones
============

-   Por ahora, ERRASER solo funciona con ARN. Las demás partes del modelo cristalográfico, incluidas las proteínas, las bases modificadas y los ligandos, no se modelan. El remodelado de residuos de ARN que están en contacto estrecho con estos componentes puede ser problemático. Planeamos abordar estos problemas en el futuro, pero por ahora ERRASER parece funcionar bien con la mayoría de los residuos de ARN. Los residuos en contacto estrecho con componentes que no son ARN también se pueden mantener fijos en ERRASER para evitar reconstrucciones problemáticas.

-   Por ahora no se modelan los contactos cristalinos, lo cual se sabe que causa problemas en algunos casos de prueba cuando el ARN interactúa con fuerza con su compañero de empaquetamiento cristalino (p. ej., apareamiento de bases y apilamiento de bases). Por ahora este problema se puede resolver añadiendo manualmente el compañero de empaquetamiento cristalino al archivo pdb de partida. Planeamos modelar el empaquetamiento cristalino en el futuro.

-   El paquete de refinamiento PHENIX es necesario para la canalización de ERRASER. Los usuarios pueden descargar PHENIX desde [http://www.phenix-online.org](http://www.phenix-online.org) (gratuito para uso académico)

Modos
=====

Por ahora solo hay un modo de ejecutar ERRASER.

Archivos de entrada
===================

Archivos obligatorios
---------------------

Necesitas dos archivos:

-   La estructura de partida en formato pdb estándar. ERRASER toma directamente el archivo pdb estándar y lo convierte automáticamente al formato de Rosetta, por lo que no se requiere ningún preprocesamiento.

-   Un archivo de mapa de densidad electrónica CCP4. Puede crearse con PHENIX u otros paquetes de refinamiento. El mapa de entrada debe ser un mapa CCP4 2mFo-DFc. Para evitar el sobreajuste, las reflexiones de Rfree deben excluirse al crear el archivo del mapa.

Archivos adicionales opcionales:
--------------------------------

-   ERRASER no necesita ningún archivo opcional adicional.

Cómo ejecutar el trabajo
------------------------

Antes de ejecutar ERRASER, se requiere la siguiente configuración:

1.  Descarga e instala PHENIX desde [http://www.phenix-online.org/](http://www.phenix-online.org/) . PHENIX es gratuito para usuarios académicos.
2.  Asegúrate de haber configurado PHENIX correctamente. Como comprobación, ejecuta el siguiente comando y comprueba si funciona:

    ```
    phenix.rna_validate
    ```

3.  Comprueba si tienes instalado el python más reciente (v2.7). Si no, ve a la carpeta `        rosetta/rosetta_tools/ERRASER/       ` y ejecuta

    ```
    ./convert_to_phenix.python
    ```

    Esto cambiará el python predeterminado que usa el código por el python integrado en phenix, en lugar de usar el python del sistema.

4.  Define la variable de entorno «\$ROSETTA» apuntando a la carpeta de Rosetta. Si usas bash, añade las siguientes líneas a `        ~/.bashrc       ` :

    ```
    ROSETTA=<YOUR_ROSETTA_PATH>; export ROSETTA
    ```

    Añade también la carpeta de scripts de ERRASER a \$PATH. Aquí tienes un ejemplo en bash:

    ```
    PATH=$PATH:<YOUR_ROSETTA_PATH>/rosetta_tools/ERRASER/
    ```

¡Ya estás listo!

ERRASER se puede ejecutar simplemente con el script de python `       erraser.py      ` del directorio `       rosetta_tools/ERRASER/      `. Si seguiste las instrucciones de configuración anteriores, ahora deberías poder ejecutar ERRASER directamente desde la línea de comando:

```
erraser.py -pdb 1U8D_cut.pdb -map 1U8D_cell.ccp4 -map_reso 1.95 -fixed_res A33-37 A61 A65 
```

Los dos primeros argumentos son obligatorios: el archivo pdb de entrada y el archivo de mapa CCP4. Los dos últimos argumentos son opcionales; indican la resolución del mapa y los residuos que deben permanecer fijos durante la reconstrucción.

Puedes ver ejemplos del archivo pdb de salida en `       example_output/      ` .

Líneas de comando con algo más de detalle.
---------------------------------------------

El flujo de trabajo anterior debería funcionar, pero conviene ver las líneas de comando de Rosetta que llaman los scripts de python para entender lo que ocurre.

El paso de minimización:

```
erraser_minimizer.<exe> -database <path to database> -native <input pdb> -out_pdb <output pdb> 
-score::weights rna/rna_hires_elec_dens -score:rna_torsion_potential RNA09_based_2012_new 
-vary_geometry true -fixed_res <fixed residue list> 
-edensity:mapfile <map file> -edensity:mapreso 2.0 -edensity:realign no
```

El paso de reconstrucción con cierre de loop:

```
swa_rna_analytical_closure.<exe> -database <path to database> -algorithm rna_resample_test -s <input pdb> -native <native pdb> 
-out:file:silent blah.out -sampler_extra_syn_chi_rotamer true -sampler_cluster_rmsd 0.3 -native_edensity_score_cutoff 0.9 
-sampler_native_rmsd_screen true -sampler_native_screen_rmsd_cutoff 2.0 -sampler_num_pose_kept 30 -PBP_clustering_at_chain_closure true 
-allow_chain_boundary_jump_partner_right_at_fixed_BP true -add_virt_root true -sample_res 2 -cutpoint_closed 2  
-fasta fasta -input_res 1 3-4 -fixed_res 1 3-4 -jump_point_pairs NOT_ASSERT_IN_FIXED_RES 1-4 -alignment_res 1-4 -rmsd_res 4 
-score:weights rna/rna_hires_elec_dens -edensity:mapfile <map file> -edensity:mapreso 2.0 -edensity:realign no 
-score:rna_torsion_potential RNA09_based_2012_new
```

El paso de reconstrucción en el residuo terminal:

```
swa_rna_main.<exe> -database <path to database> -algorithm rna_resample_test -s <input pdb> -native <native pdb> 
-out:file:silent blah.out -sampler_extra_syn_chi_rotamer true -sampler_cluster_rmsd 0.3 -native_edensity_score_cutoff 0.9 
-sampler_native_rmsd_screen true -sampler_native_screen_rmsd_cutoff 2.0 -sampler_num_pose_kept 30 -PBP_clustering_at_chain_closure true 
-allow_chain_boundary_jump_partner_right_at_fixed_BP true -add_virt_root true -sample_res 2 -cutpoint_closed 2 
-fasta fasta -input_res 1-4 -fixed_res 2-4 -jump_point_pairs NOT_ASSERT_IN_FIXED_RES 1-4 -alignment_res 1-4 -rmsd_res 4 
-score:weights rna/rna_hires_elec_dens -edensity:mapfile <map file> -edensity:mapreso 2.0 -edensity:realign no 
-score:rna_torsion_potential RNA09_based_2012_new
```

Opciones
========

A continuación se muestra una lista de los argumentos disponibles para `       erraser.py      ` .

```
Required:

-pdb
Format: -pdb <input pdb>
The starting structure in standard pdb format.

-map
Format: -map <map file>
2mFo-DFc map file in CCP4 format. Rfree should be excluded.

Commonly used:

-map_reso
Format: -map_reso <float> / Default: 2.0
The resolution of the input density map. It is highly recommanded to input the map 
resolution whenever possible for better result.

-out_pdb
Format: -out_pdb <string> / Default: <input pdb name>_erraser.pdb.
The user can output to other name using this option.

-n_iterate
Format: -n_iterate <int> / Default: 1
The number of rebuild-minimization iteration in ERRASER. The user can increase the
number to achieve best performance. Usually 2-3 rounds will be enough. Alternatively,
the user can also take a ERRASER-refined model as the input for a next ERRASER run to
achieve mannual iteration.

-fixed_res
Format: -fixed_res <list> / Default: <empty>
(Example: A1 A14-19 B9 B10-13  #chain ID followed by residue numbers)
This allows users ton fix selected RNA residues during ERRASER. For example, because
protein and ligands are not modeled in ERRASER, we recommand to fix RNA residues 
that interacts strongly with these unmodeled atoms. ERRASER will automatically 
detect residues covalently bonded to removed atoms and hold them fixed during the 
rebuild, but users need to specify residues having non-covalent interaction with 
removed atoms mannually.

-kept_temp_folder
Format: -kept_temp_folder <True/False> / Default: False
Enable this option allows user to examine intermediate output files storing in the 
temp folder. The default is to remove the temp folder after job completion.

Other: 

-rebuild_extra_res
Format/Default: Same as -fixed_res
This allows users to specify extra residues and force ERRASER to rebuild them. 
ERRASER will automatically pick out incorrect residues, but the user may be able 
to find some particular residues that was not fixed after one ERRASER run. The user 
can then re-run ERRASER with -rebuild_extra_res argument, and force ERRASER to 
remodel these residues.

-cutpoint_open
Format/Default: Same as -fixed_res
This allows users to specify cutpoints (where the nucleotide next to it is not 
connected to itself) in the starting model. Since ERRASER will detect cutpoints in 
the model automatically, the users usually do not need to specify this option.

-use_existing_temp_folder
Format: -use_existing_temp_folder <True/False> / Default: True
When is True, ERRASER will use any previous data stored in the existing temp folder 
and skip steps that has been done.Useful when the job stopped abnormally and the 
user try to re-run the same job. Disable it for a fresh run without using previously 
computed data.

-rebuild_all
Format: -rebuild_all <True/False> / Default: False
When is True, ERRASER will rebuild all the residues instead of just rebuilding 
errorenous ones. Residues in "-fixed_res" (see below) are still kept fixed during 
rebuilding. It is more time consuming but not necessary leads to better result. 
Standard rebuilding with more iteration cycles is usually prefered.

-native_screen_RMSD
Format: -native_screen_RMSD <float> / Default: 2.0
In ERRASER default rebuilding, we only samples conformations that are within 2.0 A to 
the starting model (which is the "native" here). The user can modify the RMSD cutoff. 
If the value of native_screen_RMSD is larger than 10.0, the RMSD screening will be turned off.
```

Salidas esperadas
=================

Al final obtendrás un archivo pdb de salida en formato pdb estándar. El archivo de salida está en formato PDB estándar y hereda todos los ligandos, metales y aguas del pdb de entrada. Después puedes seguir refinando el modelo de salida directamente con PHENIX u otros paquetes de refinamiento, sin ningún posprocesamiento.

Novedades desde la última versión
=================================

* Todas las aplicaciones que se usan aquí (*erraser\_minimizer* , *swa\_rna\_analytical\_closure* y *swa\_rna\_main*) son nuevas desde Rosetta 3.4. En ERRASER se usa un nuevo método de puntuación de densidad electrónica, `       elec_dens_atomwise      `. ERRASER también usa un potencial torsional de ARN actualizado basado en el conjunto de datos RNA09. 
* Se han hecho recientemente actualizaciones y correcciones en la base de código de ERRASER para resolver posibles imprecisiones debidas a errores. Para obtener los mejores resultados, todos los usuarios de ERRASER deben descargar e instalar una compilación semanal de Rosetta 2015.35 (publicada el 24 de septiembre de 2015) o posterior.


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
* [RiboKit](http://ribokit.github.io/): paquetes de modelado y análisis de ARN mantenidos por el laboratorio Das
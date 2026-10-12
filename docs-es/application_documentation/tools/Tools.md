#Herramientas


Esta página es una lista de scripts auxiliares que resultan útiles para trabajar con la entrada y la salida de Rosetta y con la ejecución de trabajos.

Muchos de estos scripts tienen más opciones de ayuda. 
Prueba a ejecutarlos sin ningún argumento o con la opción '-h' para obtener más información.
<!--- BEGIN_INTERNAL -->

**NOTA PARA DESARROLLADORES:**
El repositorio `tools` está pensado para scripts de propósito general con fines de desarrollo (generar o procesar archivos de entrada, etc.). Los scripts de Python con fines científicos deben colocarse en el repositorio `main` para que se mantengan sincronizados con el código base de Rosetta. Los scripts científicos de Python para uso público deben colocarse en `main/source/scripts/python/public/` y deben tener pruebas de integración que los acompañen. Los scripts privados deben colocarse en `main/source/scripts/python/pilot/<user_name>`.  

Los scripts de todas estas categorías deben aparecer en esta página con una breve descripción. Los scripts científicos públicos pensados para usarse como aplicaciones independientes también deben tener una página de documentación de aplicación aparte (consulta la página [[How to write documentation]] para ver notas sobre cómo dar formato a la documentación de aplicaciones).

<!--- END_INTERNAL -->
[[_TOC_]]

## Herramientas generales de Rosetta

### Preparación de entradas

#### PDB

* Consulta también [[preparing structures]].

tools/protein_tools/scripts/clean_pdb.py    
&#8195; - Prepara PDBs para Rosetta limpiándolos y renumerando los residuos. 

tools/renumber_pdb.py    
&#8195; - Renumera un PDB de modo que la numeración del PDB coincida con la numeración del Pose. 

tools/protein_tools/scripts/pdb_renumber.py    
&#8195; - Renumera un PDB de modo que la numeración del PDB coincida con la numeración del Pose.

tools/convert_hatm_names.py    
&#8195; - Convierte la convención de nombres de hidrógenos de todos los PDBs de un directorio a las convenciones de Rosetta. 

tools/protein_tools/scripts/remove_loop_coords.py    
&#8195; - Pone a cero las coordenadas de los átomos marcados como loop en un archivo de loops. 

#### Ligandos

* Consulta también [[preparing ligands]].

main/source/scripts/python/public/molfile_to_params.py    
&#8195; - Crea archivos *.params de Rosetta. 

main/source/scripts/python/public/rename_params.py    
&#8195; - Renombra archivos params para que ninguno entre en conflicto con otro.

main/source/scripts/python/public/batch_molfile_to_params.py    
&#8195; - Crea archivos *.params de Rosetta para un gran número de entradas.

main/source/src/apps/public/ligand_docking/[[assign_charges.py|ligand-dock]]    
&#8195; - Asigna cargas AM1-BCC a ligandos.

tools/protein_tools/scripts/calculate_ligand_rmsd.py
&#8195; - Script basado en Pymol para calcular RMSD de moléculas pequeñas

tools/protein_tools/scripts/visualize_ligand.py
&#8195; - Genera una sesión de Pymol para visualizar el bolsillo de unión del ligando

#### Simetría

* Consulta [[Symmetry]] para más información.

main/source/src/apps/public/symmetry/[[make_symmdef_file_denovo.py|make-symmdef-file-denovo]]    
&#8195; - Crea un archivo de simetría. 

main/source/src/apps/public/symmetry/[[make_symmdef_file.pl|make-symmdef-file]]    
&#8195; - Crea un archivo de simetría para un PDB existente.


#### Membrana

* Puedes ver ejemplos de uso de los scripts en la página [[membrane abinitio]].

main/source/src/apps/public/membrane_abinitio/[[octopus2span.pl|spanfile]]    
&#8195; - Convierte un archivo de topología de Octopus en un archivo span de Rosetta.

main/source/src/apps/public/membrane_abinitio/[[run_lips.pl|lipsfile]]    
&#8195; - Ejecuta predicciones de lipofilicidad.

main/source/src/apps/public/membrane_abinitio/alignblast.pl    
&#8195; - Extrae un alineamiento múltiple de resultados de la salida de Blast o PsiBlast.


#### RosettaMembrane Framework

* Consulta [[RosettaMembrane Framework Overview]] para una descripción general, y
[[RosettaMembrane:-Scripts-and-Tools]] para más detalles sobre los scripts.

tools/membrane_tools/prep_mpdb.py    
&#8195; - Prepara todos los archivos de datos necesarios para el marco RosettaMembrane Framework.

tools/membrane_tools/[[octopus2span.pl|spanfile]]    
&#8195; - Convierte un archivo de topología de Octopus en un archivo span de Rosetta.

tools/membrane_tools/[[run_lips.pl|lipsfile]]    
&#8195; - Genera un archivo de accesibilidad a lípidos.

tools/membrane_tools/alignblast.pl    
&#8195; - Genera un archivo de alineamiento múltiple a partir de la salida de Blast; es una dependencia de run_lips.pl.

tools/membrane_tools/write_mp_xml.py    
&#8195; - Escribe una plantilla de archivo de definición de recursos para los protocolos del marco de membrana. 

tools/membrane_tools/mptest_ut.py    
&#8195; - Ejecuta la prueba unitaria del código de RosettaMembrane Framework.

tools/membrane_tools/check_spanfile_in_pymol.pl    
&#8195; - Colorea el modelo PDB por regiones de rangos de residuos, tal como se definen en el spanfile de membrana.


#### Densidad electrónica

* Consulta [[density map scoring]] para más información.

main/source/src/apps/public/electron_density/[[prepare_template_for_MR.pl|prepare-template-for-mr]]   
&#8195; - 


#### Mapas de contactos

tools/analysis/contactMapTools.py    
&#8195; - 


#### Fragmentos

* Para más información, consulta [[app-fragment-picker]] y [[Fragment file]].

tools/fragment_tools/make_fragments.pl    
&#8195; - Genera fragmentos a partir de un archivo fasta.

tools/fragment_tools/install_dependencies.pl    
&#8195; - Instala las dependencias para la selección de fragmentos.

tools/fragment_tools/ss_pred_converter.py    
&#8195; - Convierte predicciones de estructura secundaria al formato PsiPred-SS2.

tools/fragment_tools/update_revdat.pl    
&#8195; - Actualiza el archivo revdat para los puntos de corte de los benchmarks. 

#### Archivos de restricciones

tools/protein_tools/scripts/generate_atom_pair_constraint_file.py
&#8195; - Genera un archivo de restricciones de Rosetta para restringir distancias entre pares de átomos a partir de un archivo PDB.

tools/analysis/constraints/calc_exp_viol.pl    
&#8195; - Crea un listado de la distancia real y de la violación de cada restricción de pares de átomos, dados un archivo PDB y un archivo de restricciones.

tools/analysis/constraints/calc_exp_viol_spline.pl    
&#8195; - Crea un listado de las distancias reales y de las violaciones de un conjunto de restricciones de distancia de EPR, dados un archivo PDB y un archivo de restricciones. 

### Ejecución de trabajos

main/source/scripts/python/public/parallel.py    
&#8195; - Utilidad para ejecutar en paralelo un gran número de líneas de comando.


### Manipulación de la salida


#### Silent files

* Consulta [[silent file]] para más información.

main/source/scripts/python/public/pymol_silent.py    
&#8195; - Un complemento de pymol para leer silent files.

tools/analysis/extract_pdbs_from_pdbsilent_by_tags.py    
&#8195; - Extrae estructuras concretas de un silent file según sus etiquetas. 


#### Archivos de puntuaciones

* Consulta [[score file]] para más información.

main/source/scripts/python/public/column.sh    
&#8195; - Selecciona solo ciertas columnas de un archivo.

main/source/scripts/python/public/sd.py    
&#8195; - Extrae datos de silent files.

main/source/tools/scorefile.py    
&#8195; - Analiza y extrae datos de archivos de puntuaciones en formato JSON. 

main/source/src/apps/public/enzdes/[[DesignSelect.pl|enzyme-design]]    
&#8195; - Selecciona solo las filas de un formato tabular cuyas columnas cumplen los requisitos.


#### PDBs

main/source/scripts/python/public/pdb2fasta.py    
&#8195; - Extrae una secuencia en formato FASTA de un PDB.

tools/protein_tools/scripts/get_fasta_from_pdb.py    
&#8195; - Extrae una secuencia en formato FASTA de un PDB. 


#### Análisis de varias estructuras 

tools/protein_tools/scripts/SequenceProfile.py    
&#8195; - Crea un perfil de secuencia a partir de una lista de PDBs. 


#### Utilidades de gráficos

main/source/scripts/python/public/rmsd_score_pymol_plotter/rmsd_score_pymol_plotter.py    
&#8195; - Crea gráficos de puntuación frente a rmsd (embudo).

main/source/scripts/python/public/rmsd_score_pymol_plotter/rmsd_score_pymol_plotter_generator.pl    
&#8195; - Crea gráficos de puntuación frente a rmsd (embudo).

tools/protein_tools/scripts/score_vs_rmsd_full.py    
&#8195; - Crea gráficos de puntuación frente a rmsd (embudo). 

tools/protein_tools/scripts/score_vs_rmsd.py    
&#8195; - Crea gráficos de puntuación frente a rmsd (embudo).

tools/protein_tools/scripts/score_scatter_plot.py    
&#8195; - Crea gráficos de dispersión de un término de puntuación frente a otro.

tools/protein_tools/scripts/score_vs_rmsCore.R    
&#8195; - Crea un gráfico de dispersión de puntuación frente a RMSD a partir de un archivo de puntuaciones. El RMSD se calcula para la región del núcleo de la proteína y el scorefile debe contener una columna 'rms_core'.

tools/protein_tools/scripts/score_vs_rmsTM.R    
&#8195; - Crea un gráfico de dispersión de puntuación frente a RMSD a partir de un archivo de puntuaciones. El RMSD se calcula para la región transmembrana de la proteína y el scorefile debe contener una columna 'rms_TM'.

tools/analysis/numeric/MultiDimensionalHistogram.R    
&#8195; - 

tools/analysis/protocols/moves/DOFHistogramRecorder.R    
&#8195; - 

tools/analysis/constraints/score_vs_atom_pair_constraint.R    
&#8195; - Crea un gráfico de dispersión de la puntuación total frente a atom_pair_constraint.

#### Utilidades de agrupamiento

* Consulta también [[cluster]].

tools/protein_tools/scripts/clustering.py    
&#8195; - Ejecuta y analiza el agrupamiento de Rosetta. 


#### Sin clasificar

main/source/scripts/python/public/color_pdb.py    
&#8195; - 

main/source/scripts/python/public/color_pdb_byatom.py    
&#8195; - 

main/source/scripts/python/public/get_pdb.py    
&#8195; -  

main/source/src/utility/make_static_database.py    
&#8195; - 

tools/protein_tools/scripts/best_models.py    
&#8195; - 

tools/protein_tools/scripts/sequence_recovery.py    
&#8195; - 

tools/protein_tools/scripts/small_molecule_rmsd_table.py    
&#8195; - 

tools/protein_tools/scripts/tabbed_to_bcl.py    
&#8195; - 

tools/protein_tools/scripts/thread_pdb_from_alignment.py    
&#8195; - 

tools/protein_tools/scripts/top_n_percent.py    
&#8195; - 

tools/protein_tools/setup.py    
&#8195; - 

tools/perl_tools/addChain.pl    
&#8195; - 

tools/perl_tools/cleanPdbCA.pl    
&#8195; - 

tools/perl_tools/createTemplate.pl    
&#8195; - 

tools/perl_tools/getCAcoords.pl    
&#8195; - 

tools/perl_tools/getFastaFromCoords.pl    
&#8195; - 

tools/perl_tools/getFirstChain.pl    
&#8195; - 

tools/perl_tools/getPdb.pl    
&#8195; - 

tools/perl_tools/removeChain.pl    
&#8195; - 

tools/perl_tools/removeExtendedChain.pl    
&#8195; - 

tools/perl_tools/removeTERs.pl    
&#8195; - 

tools/python_pdb_structure/compare_sequences.py    
&#8195; - 

tools/python_pdb_structure/create_matcher_gridlig.py    
&#8195; - 

tools/python_pdb_structure/find_neighbors.py    
&#8195; - 

tools/python_pdb_structure/hist.py    
&#8195; - 

tools/python_pdb_structure/intdef_basics.py    
&#8195; - 

tools/python_pdb_structure/pdb_structure.py    
&#8195; - 

tools/python_pdb_structure/sequence_profile.py    
&#8195; - 

tools/python_pdb_structure/test_compare_sequences.py    
&#8195; - 

tools/python_pdb_structure/test_sequence_profile.py    
&#8195; - 

tools/python_pdb_structure/vector3d.py    
&#8195; - 


## Scripts específicos de aplicaciones


### Docking de ligandos

* Consulta [[Ligand dock]] para una descripción general.

main/source/src/apps/public/ligand_docking/[[arls.py|ligand-dock]]    
&#8195; - Preparación automática de RosettaLigand.

main/source/src/apps/public/ligand_docking/[[best_ifaceE.py|extract-atomtree-diffs]]    
&#8195; - Imprime las etiquetas de las «mejores» estructuras de una ejecución de docking de ligandos.

main/source/src/apps/public/ligand_docking/pdb_to_molfile.py    
&#8195; - Extrae coordenadas de un archivo PDB para regenerar archivos mol/sdf/mol2.

main/source/src/apps/public/ligand_docking/prune_atdiff_top5pct.py    
&#8195; - Extrae el 5 % superior por puntuación total de un archivo AtomTreeDiff.

main/source/src/apps/public/ligand_docking/[[get_scores.py|extract-atomtree-diffs]]    
&#8195; - Extrae la línea SCORES de un archivo AtomTreeDiff en formato tabular.

main/source/src/apps/public/ligand_docking/plot_funnels.R    
&#8195; - 


### Anticuerpos

* Consulta [[Antibody Protocol]] para más información.

tools/antibody/[[antibody.py|antibody-python-script]]    
&#8195; - Script de preprocesamiento para el protocolo de anticuerpos.

tools/antibody/antibody_repertoire.py    
&#8195; - Procesa un archivo fasta de un repertorio de anticuerpos para crear una base de datos de estructuras.

tools/antibody/convert_pdb_to_antibody_numbering_scheme.py    
&#8195; - Script para convertir la secuencia de un PDB a un esquema canónico de numeración de anticuerpos. 

tools/antibody/chothia_mapping_v2.pl    
&#8195; - Script para asignar la secuencia de PDB dada a la numeración de Chothia. 

tools/antibody/chothia_renumber_v2.pl    
&#8195; - Script para renumerar archivos PDB según el esquema de Chothia.

tools/antibody/classification_H3.pl    
&#8195; - 

tools/antibody/colorcdr.pml    
&#8195; - 

tools/antibody/kink_constraints.py    
&#8195; - Genera archivos de restricciones del kink para un conjunto de anticuerpos. 

tools/antibody/kink_geom.py    
&#8195; - Calcula la geometría del kink para un conjunto de anticuerpos. 

tools/antibody/kink_plots.R    
&#8195; - Grafica la geometría del kink de H3.

tools/antibody/make_angle_distances.py    
&#8195; - Calcula la distancia orientacional entre todos los anticuerpos de la base de datos. 

tools/antibody/superimpose_interface.py    
&#8195; - 


### Relax con restricciones

main/source/src/apps/public/relax_w_allatom_cst/clean_pdb_keep_ligand.py    
&#8195; - Limpia el PDB conservando el ligando

main/source/src/apps/public/relax_w_allatom_cst/sidechain_cst_3.py    
&#8195; - Crea un archivo de restricciones para los átomos pesados de las cadenas laterales.

main/source/src/apps/public/relax_w_allatom_cst/amino_acids.py    
&#8195; - Script de datos de utilidad.


### RosettaCM

tools/protein_tools/scripts/setup_RosettaCM.py    
&#8195; - Un script para preparar el modelado con RosettaCM.

tools/protein_tools/scripts/RosettaEnzCM.py    
&#8195; - Genera restricciones de distancia atómica para residuos catalíticos predichos a partir de residuos conocidos de la plantilla.


### ARN

* Consulta [[RNA tools]] para más información.

tools/rna_tools/bin/amino_acids.py    
&#8195; - 

tools/rna_tools/bin/biox3_jobsub.py    
&#8195; - 

tools/rna_tools/bin/cat_outfiles.py    
&#8195; - 

tools/rna_tools/bin/check_cutpoints.py    
&#8195; - 

tools/rna_tools/bin/cluster_info.py    
&#8195; - 

tools/rna_tools/bin/easy_cat.py    
&#8195; - 

tools/rna_tools/bin/extract_chain.py    
&#8195; - 

tools/rna_tools/bin/extract_lowscore_decoys_outfile.py    
&#8195; - 

tools/rna_tools/bin/extract_lowscore_decoys.py    
&#8195; - 

tools/rna_tools/bin/fetch_pdb.py    
&#8195; - 

tools/rna_tools/bin/fields.py    
&#8195; - 

tools/rna_tools/bin/fix_chainbreaks_with_erraser.py    
&#8195; - 

tools/rna_tools/bin/get_res_num.py    
&#8195; - 

tools/rna_tools/bin/get_sequence.py    
&#8195; - 

tools/rna_tools/bin/get_surrounding_res.py    
&#8195; - 

tools/rna_tools/bin/helix_preassemble_setup.py    
&#8195; - 

tools/rna_tools/bin/make_rna_rosetta_ready.py    
&#8195; - [[rna-denovo]]

tools/rna_tools/bin/make_tag.py    
&#8195; - 

tools/rna_tools/bin/mpi4py_jobsub.py    
&#8195; - 

tools/rna_tools/bin/parallel_min_setup.py    
&#8195; - 

tools/rna_tools/bin/parse_options.py    
&#8195; - 

tools/rna_tools/bin/parse_tag.py    
&#8195; - 

tools/rna_tools/bin/pdb2fasta.py    
&#8195; - 

tools/rna_tools/bin/pdbslice.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/bin/pdbsubset.py    
&#8195; - 

tools/rna_tools/bin/pp_jobsub.py    
&#8195; - 

tools/rna_tools/bin/pp_util.py    
&#8195; - 

tools/rna_tools/bin/prepare_rna_puzzle_submissions.py    
&#8195; - 

tools/rna_tools/bin/qsub_torque.py    
&#8195; - 

tools/rna_tools/bin/read_pdb.py    
&#8195; - 

tools/rna_tools/bin/renumber_pdb_in_place.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/bin/reorder_pdb.py    
&#8195; - 

tools/rna_tools/bin/reorder_to_standard_pdb.py    
&#8195; - 

tools/rna_tools/bin/replace_chain_inplace.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/bin/replace_chain.py    
&#8195; - 

tools/rna_tools/bin/rna_denovo_jobscript.py    
&#8195; - 

tools/rna_tools/bin/rna_denovo_setup.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/bin/rna_helix.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/bin/rna_server_conversions.py    
&#8195; - 

tools/rna_tools/bin/rosetta_exe.py    
&#8195; - 

tools/rna_tools/bin/rosetta_submit.py    
&#8195; - 

tools/rna_tools/bin/rsync_from_cluster.py    
&#8195; - 

tools/rna_tools/bin/rsync_to_cluster.py    
&#8195; - 

tools/rna_tools/bin/silent_file_sort_and_select.py    
&#8195; - 

tools/rna_tools/cluster_setup/biox3_jobsub.py    
&#8195; - 

tools/rna_tools/cluster_setup/cluster_info.py    
&#8195; - 

tools/rna_tools/cluster_setup/easy_cat.py    
&#8195; - 

tools/rna_tools/cluster_setup/mpi4py_jobsub.py    
&#8195; - 

tools/rna_tools/cluster_setup/pp_jobsub.py    
&#8195; - 

tools/rna_tools/cluster_setup/pp_util.py    
&#8195; - 

tools/rna_tools/cluster_setup/qsub_torque.py    
&#8195; - 

tools/rna_tools/cluster_setup/rosetta_submit.py    
&#8195; - 

tools/rna_tools/cluster_setup/rsync_from_cluster.py    
&#8195; - 

tools/rna_tools/cluster_setup/rsync_to_cluster.py    
&#8195; - 

tools/rna_tools/job_setup/helix_preassemble_setup.py    
&#8195; - 

tools/rna_tools/job_setup/make_tag.py    
&#8195; - 

tools/rna_tools/job_setup/parallel_min_setup.py    
&#8195; - 

tools/rna_tools/job_setup/parse_options.py    
&#8195; - 

tools/rna_tools/job_setup/parse_tag.py    
&#8195; - 

tools/rna_tools/job_setup/rna_denovo_jobscript.py    
&#8195; - 

tools/rna_tools/job_setup/rna_denovo_setup.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/job_setup/rna_server_conversions.py    
&#8195; - 

tools/rna_tools/job_setup/rosetta_exe.py    
&#8195; - 

tools/rna_tools/pdb_util/amino_acids.py    
&#8195; - 

tools/rna_tools/pdb_util/check_cutpoints.py    
&#8195; - 

tools/rna_tools/pdb_util/extract_chain.py    
&#8195; - 

tools/rna_tools/pdb_util/fetch_pdb.py    
&#8195; - 

tools/rna_tools/pdb_util/fix_chainbreaks_with_erraser.py    
&#8195; - 

tools/rna_tools/pdb_util/get_res_num.py    
&#8195; - 

tools/rna_tools/pdb_util/get_sequence.py    
&#8195; - 

tools/rna_tools/pdb_util/get_surrounding_res.py    
&#8195; - 

tools/rna_tools/pdb_util/make_rna_rosetta_ready.py    
&#8195; - 

tools/rna_tools/pdb_util/pdb2fasta.py    
&#8195; - 

tools/rna_tools/pdb_util/pdbslice.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/pdb_util/pdbsubset.py    
&#8195; - 

tools/rna_tools/pdb_util/plot_contour.py    
&#8195; - [[Sample-around-nucleobase]]

tools/rna_tools/pdb_util/prepare_rna_puzzle_submissions.py    
&#8195; - 

tools/rna_tools/pdb_util/read_pdb.py    
&#8195; - 

tools/rna_tools/pdb_util/renumber_pdb_in_place.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/pdb_util/reorder_pdb.py    
&#8195; - 

tools/rna_tools/pdb_util/reorder_to_standard_pdb.py    
&#8195; - 

tools/rna_tools/pdb_util/replace_chain_inplace.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/pdb_util/replace_chain.py    
&#8195; - 

tools/rna_tools/pdb_util/rna_helix.py    
&#8195; - [[rna-denovo-setup]]

tools/rna_tools/silent_util/cat_outfiles.py    
&#8195; - 

tools/rna_tools/silent_util/extract_lowscore_decoys_outfile.py    
&#8195; - 

tools/rna_tools/silent_util/extract_lowscore_decoys.py    
&#8195; - 

tools/rna_tools/silent_util/fields.py    
&#8195; - 

tools/rna_tools/silent_util/silent_file_sort_and_select.py    
&#8195; - 

tools/rna_tools/sym_link.py    
&#8195; - 

### Ensamblaje stepwise

tools/SWA_protein_python/generate_dag/generate_CA_constraints.py    
&#8195; - [[swa-protein-main]] [[swa-protein-long-loop]]

tools/SWA_protein_python/generate_dag/generate_constraints.py    
&#8195; - 

tools/SWA_protein_python/generate_dag/generate_swa_protein_dag.py    
&#8195; - [[swa-protein-long-loop]]

tools/SWA_protein_python/generate_dag/get_sequence.py    
&#8195; - 

tools/SWA_protein_python/generate_dag/make_tag.py    
&#8195; - 

tools/SWA_protein_python/generate_dag/parse_options.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/extract_lowscore_decoys_outfile.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/parse_options.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/stepwise_post_process_cluster.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/stepwise_post_process_combine_and_filter_outfiles.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/stepwise_pre_process_setup_dirs.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/SWA_condor_test.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/SWA_dagman_LSF_continuous.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/SWA_dagman_slave.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/SWA_kick_off_slave_jobs.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/SWA_parse_options.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/SWA_pseudo_dagman_continuous.py    
&#8195; - [[swa-protein-long-loop]]

tools/SWA_protein_python/run_dag_on_cluster/SWA_sampling_post_process.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/SWA_sampling_pre_process.py    
&#8195; - 

tools/SWA_protein_python/run_dag_on_cluster/SWA_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/benchmark_command.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/benchmark_command_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/DAG_continuous.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/DAG_continuous_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/DAG_general_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/DAG_generic_silent_file_reducer.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/DAG_reducer.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/DAG_slave.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/generic_empty_reducer.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/dagman/submit_DAG_job.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/database/SWA_amino_acids.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/FARFAR_dag_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/FARFAR_easy_cat.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/FARFAR_filterer.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/FARFAR_final_filter_dag.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/FARFAR_pre_process.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/FARFAR_rna_build_dagman.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/FARFAR_rna_build_dagman_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/setup_FARFAR_job_files_parse_options.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/setup_FARFAR_job_files.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/FARFAR_DAG/setup_FARFAR_job_files_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/calculate_pairwise_RMSD.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/calculate_RMSD.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/check_mapper_files_exist.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/cluster_rotamers.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/combine_pdb.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/count_molprobity_clash_atoms.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_benchmark_job_files.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_benchmark_table.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_benchmark_table_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_gnuplot_script.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_idealize_helix_general.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_idealize_helix.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_local_dag.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_RNA_primer_simple.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_score_vs_rmsd_plot.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_torsion_database_check_length.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/create_torsion_database.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/ensure_rna_rosetta_ready.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/extend_silent_struct_with_idealized_helix.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/extract_C1_P_atom_from_PDB.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/extract_FR3D_data.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/extract_hbond_stat.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/extract_MC_annotate_data.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/extract_torsions_from_pdb.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/fields.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/find_sequence.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/fix_pymol_output_pdb.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/get_OLLM_chain_closure_only_regions.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/invert_chain_sequence.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/line_counts.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/lower_sequence.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/minimize_pdb.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/path_check_gnuplot.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/pdb2seqlist.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/pdb_to_silent_file.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/remove_columns.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/remove_duplicate_sequence_line_in_silent_file.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/remove_hydrogen_from_pdb.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/renumber_pdb_in_place.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/replace_chain_inplace.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/replace_silent_scoreline.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/Reposition_pdb_atom_name.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/reweight_chem_shift_score.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/reweight_silent_file_SCORE.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/Rosetta_all_atom_derivative_check.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/Rosetta_import_and_dump_pdb.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/Rosetta_to_standard_PDB.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/select_models_silentfile.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/slice_pdb_list.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/slice_sample_res_and_surrounding.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_add_hydrogen.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_align_pdb.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_all_rna_rosetta_ready.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_cat_outfiles.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_cat_outfiles_wrapper.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_cluster.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_copy_non_full_length_regions.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_extract_pdb.py    
&#8195; - [[swa-rna-loop]]

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_filter_outfile_wrapper.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_filter_silent_file.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_make_rna_rosetta_ready.py    
&#8195; - [[swa-rna-loop]]

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_mutate_residues.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_pdb2fasta.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_pdbslice.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_pdb_slice_wrapper.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_plot_region_FINALs.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_SS_LOOP_create_benchmark_table.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_SS_LOOP_create_benchmark_table_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_trace_pathway.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/misc/SWA_trace_pathway_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/benchmark_command.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/benchmark_command_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/DAG_continuous_MPI_wrapper.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/DAG_continuous.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/DAG_continuous_qsub.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/DAG_continuous_qsub_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/DAG_continuous_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/DAG_generic_silent_file_reducer.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/DAG_reducer.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/DAG_slave.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/generic_empty_reducer.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/old_dagman_works_with_condor/submit_DAG_job.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/parser/SWA_parse_benchmark.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/parser/SWA_parse_internal_arguments.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/parser/SWA_parse_options.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/parser/SWA_parse_rosetta_options.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/infinite_loop.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/kill_all_slave_jobs.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/LSF_scheduler.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/MPI_helloword.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/MPI_PBS_scheduler.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/MPI_SGE_scheduler.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/PBS_scheduler.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/print_queued_jobs.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/scheduler_build_test.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/scheduler_common.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/scheduler_queue_job.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/scheduler_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/scheduler/simple_test_script.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/create_dag_job_files.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/DAG_rebuild_bulge_pre_process.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/DAG_rebuild_bulge.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/DAG_rebuild_bulge_reducer.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/DAG_rebuild_bulge_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/setup_SWA_RNA_dag_job_files.py    
&#8195; - [[swa-rna-loop]]

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/submit_SWA_rna_minimize_benchmark.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_DAG_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_rna_build_dagman.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_rna_build_dagman_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_rna_minimize.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_rna_minimize_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_sample_virt_ribose_reducer.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_sampling_combine_long_loop_pre_process.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_sampling_post_process.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_sampling_post_process_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/SWA_DAG/SWA_sampling_pre_process.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/swa_revival/plot_silent_file_scores.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/swa_revival/SWA_rna_build_commands_from_dagman.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/swa_revival/SWA_rna_build_dag_parse.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/swa_revival/SWA_rna_serial_hack.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/swa_revival/SWA_rna_setup_inputs.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/swa_revival/SWA_setup_benchmark.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/swa_revival/SWA_setup_benchmark_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/chemical_shift_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/DAGMAN_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/error_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/extract_FR3D_data_functions.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/extract_MC_annotate_data_functions.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/list_operations.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/master_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/PATHS.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/PDB_operations.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/RNA_BP_and_BS_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/RNA_sequence.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/Rosetta_to_standard_PDB_functions.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/silent_file_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/SWA_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/torsion_database_util.py    
&#8195; - 

tools/SWA_RNA_python/SWA_dagman_python/utility/USER_PATHS.py    
&#8195; - 


### RECCES

* Consulta [[RECCES]] para más información.

tools/recces/data.py    
&#8195; - 

tools/recces/min_func.py    
&#8195; - 

tools/recces/util.py    
&#8195; - 


### Remodel

Consulta también la documentación de [[Remodel]] y [[RosettaRemodel]].

tools/remodel/getBluePrintFromCoords.pl    
&#8195; - 


### ddG monomer

* Consulta [[ddg-monomer]] para más información.

main/source/src/apps/public/ddg/[[convert_to_cst_file.sh|ddg-monomer]]    
&#8195; - Convierte un archivo de registro de ddG en un archivo de restricciones.


### Pepspec

* Consulta [[Pepspec]] para más información.

tools/analysis/apps/gen_pepspec_pwm.py    
&#8195; - Genera una matriz de pesos de posición a partir de la salida de PepSpec. 


### Péptidos beta

tools/beta-peptide/create_beta_peptide_params.py    
&#8195; -  

tools/beta-peptide/make_beta_peptide_bbdep.py    
&#8195; - 


### Docking de alto rendimiento

tools/hts_tools/add_activity_tags_to_database.py    
&#8195; - 

tools/hts_tools/add_hydrogens.py    
&#8195; - 

tools/hts_tools/add_ligands_to_job_file.py    
&#8195; - 

tools/hts_tools/clean_pdb.py    
&#8195; - 

tools/hts_tools/compress_ligands.py    
&#8195; - 

tools/hts_tools/get_descriptor_data.py    
&#8195; - 

tools/hts_tools/hts_util.py    
&#8195; - 

tools/hts_tools/ligand_database.py    
&#8195; - 

tools/hts_tools/make_evenly_grouped_jobs.py    
&#8195; - 

tools/hts_tools/make_ligand_centroid_pdb.py    
&#8195; - 

tools/hts_tools/make_params.py    
&#8195; - 

tools/hts_tools/make_startfom_files.py    
&#8195; - 

tools/hts_tools/prepare_sdfs_for_bcl.py    
&#8195; - 

tools/hts_tools/sdf_parser/MolFile.py    
&#8195; - 

tools/hts_tools/sdf_parser/MolFileTests.py    
&#8195; - 

tools/hts_tools/sdf_parser/SdfFile.py    
&#8195; - 

tools/hts_tools/sdf_parser/SdfTest.py    
&#8195; - 

tools/hts_tools/sdf_split_organize.py    
&#8195; - 

tools/hts_tools/setup_screening_project.py    
&#8195; - 


### Difracción de fibras

tools/fragment_tools/pdb2vall/pdb2vall.py    
&#8195; - 

tools/fiber_diffraction/layer_line_pruner.py    
&#8195; - Elimina puntos vecinos de los conjuntos libre o de trabajo. 

tools/fiber_diffraction/make_helix_denovo_cnsm.py    
&#8195; - Generador de archivos de definición de simetría de hélices de novo.

tools/fiber_diffraction/make_helix_denovo.py    
&#8195; - Generador de archivos de definición de simetría de hélices de novo.


### Generación de Vall

tools/fragment_tools/pdb2vall/amino_acids.py    
&#8195; - 

tools/fragment_tools/pdb2vall/database/rcsb_data/get_ss_dis.sh    
&#8195; - 

tools/fragment_tools/pdb2vall/database/rcsb_data/rsyncPDB.sh    
&#8195; - 

tools/fragment_tools/pdb2vall/database/rcsb_data/update_rcsb_data.pl    
&#8195; - 

tools/fragment_tools/pdb2vall/get_missing_den_from_disss.py    
&#8195; - 

tools/fragment_tools/pdb2vall/jump_over_missing_density.py    
&#8195; - 

tools/fragment_tools/pdb2vall/numbering_back_to_pdbseqres.py    
&#8195; - 

tools/fragment_tools/pdb2vall/parse_dssp_results.py    
&#8195; - 

tools/fragment_tools/pdb2vall/pdb_scripts/amino_acids.py    
&#8195; - 

tools/fragment_tools/pdb2vall/pdb_scripts/clean_pdb.py    
&#8195; - 

tools/fragment_tools/pdb2vall/pdb_scripts/fetch_raw_pdb.py    
&#8195; - 

tools/fragment_tools/pdb2vall/pdb_scripts/get_pdb_new.py    
&#8195; - 

tools/fragment_tools/pdb2vall/pdb_scripts/maxsprout/test/runmaxsprout.pl    
&#8195; - 

tools/fragment_tools/pdb2vall/pdb_scripts/pdb2fasta.py    
&#8195; - 

tools/fragment_tools/pdb2vall/pdb_scripts/rebuild_pdb_from_CA.sh    
&#8195; - 

tools/fragment_tools/pdb2vall/renumber_structure_profile_checkpoint_back_to_seqres.py    
&#8195; - 

tools/fragment_tools/pdb2vall/sequence_profile_scripts/run_psiblast_filtnr_tight.pl    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/create_checkpoint_from_fasta_alignment.pl    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/DEPTH-CLONE-2.8.7/doc/example.sh    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/DEPTH-CLONE-2.8.7/par/background-map.py    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/DEPTH-CLONE-2.8.7/src/pdb_T_modifier.py    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/dssp2threestateSS.pl    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/generate_struct_profile.rb    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/get_structure_profile_checkpoint.py    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/make_alignment_from_fragfile.pl    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/make_alignment_from_fragfile_rmsCutoff.pl    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/make_depthfile.py    
&#8195; - 

tools/fragment_tools/pdb2vall/structure_profile_scripts/make_sequence_fragments.pl    
&#8195; - 


### Herramientas de análisis de diseño 

tools/protein_tools/scripts/design_analysis/analysis_tools.py    
&#8195; - 

tools/protein_tools/scripts/design_analysis/argument_parsing.py    
&#8195; - 

tools/protein_tools/scripts/design_analysis/design_analysis.py    
&#8195; - 

tools/protein_tools/scripts/design_analysis/scoretable.py    
&#8195; - 

tools/protein_tools/scripts/design_analysis/sequence_analysis.py    
&#8195; - 



### Redes neuronales artificiales para moléculas pequeñas

tools/ann_tools/cat_sdfs.py    
&#8195; - 

tools/ann_tools/compute_csv_tables.py    
&#8195; - 

tools/ann_tools/make_bcl_inputs_for_plotting.py    
&#8195; - 

tools/ann_tools/make_bcl_roc_plots.py    
&#8195; - 

tools/ann_tools/make_datasets.py    
&#8195; - 

tools/ann_tools/score_sdf.py    
&#8195; - 

tools/ann_tools/sort_sdfs.py    
&#8195; - 

### Herramientas de predicción de epítopos

Hemos incluido herramientas para predecir epítopos con matrices Propred o NetMHCII, y también para crear bases de datos que permitan evaluar secuencias con rapidez en Rosetta.  Consulta [[MHCEpitopeEnergy]] para más detalles sobre la puntuación de inmunogenicidad en Rosetta.  Consulta [[la documentación de las herramientas|mhc-energy-tools]] para ver cómo usar `mhc_energy_tools`.

`tools/mhc_energy_tools/mhc_score.py` para realizar la puntuación de epítopos en FASTA, PDB o péptidos en bruto, con capacidades básicas de informe y gráficos.
`tools/mhc_energy_tools/mhc_gen_db.py` para generar bases de datos SQL a partir de archivos FASTA o PDB, con el espacio de diseño especificado desde un archivo CSV o una PSSM.

### AMBRose (intercompatibilidad con la dinámica molecular de AMBER)

AMBRose es un paquete de PyRosetta para trabajar fácilmente con AMBER. Su documentación se puede encontrar [aquí,](https://www.rosettacommons.org/docs/wiki/AMBRose) y el paquete en sí está en `tools/AmbRose/ambrose`.

### Sin clasificar

main/source/external/R/BranchAngleOptimizer.R    
&#8195; - 

main/source/scripts/python/public/orbitals_pretty.pml    
&#8195; 

main/tests/integration/tests/inv_kin_lig_loop_design/showme.pml    
&#8195; 

tools/analysis/apps/sequence_tolerance.R    
&#8195; - 


## Scripts de compilación

* Consulta [[Build Documentation]] para más información.

main/source/[[scons.py|Build Documentation]]    
&#8195; - Script principal para la compilación de Rosetta.

main/source/ninja_build.py    
&#8195; - Script para el sistema de compilación alternativo CMake+ninja.


## Scripts de prueba

main/source/test/[[run.py|run-unit-test]]    
&#8195; - Ejecuta las pruebas unitarias.

main/tests/integration/[[integration.py|integration-tests]]    
&#8195; - Ejecuta las pruebas de integración.

main/tests/benchmark/[[benchmark.py|testing-server]]    
&#8195; - Ejecuta localmente las pruebas del servidor de benchmarks.

main/tests/sfxn_fingerprint/sfxn_fingerprint.py    
&#8195; - Ejecuta la prueba de huella de la función de puntuación.

main/tests/profile/profile.py    
&#8195; - Ejecuta las pruebas de perfil.

main/tests/profile/compare_results.py    
&#8195; - Compara los resultados de las pruebas de perfil.

main/tests/FeatureExtraction/features.py    
&#8195; - 


## Utilidades de scripting

main/source/scripts/python/public/amino_acids.py    
&#8195; - Datos sobre los aminoácidos y sus propiedades.

tools/protein_tools/scripts/amino_acids.py    
&#8195; - Datos sobre los aminoácidos y sus propiedades. 

tools/python_pdb_structure/amino_acids.py    
&#8195; - Datos sobre los aminoácidos y sus propiedades. 

main/source/scripts/python/public/param_utils.py    
&#8195; - Funciones para manipular archivos params.

main/source/scripts/python/public/rosetta_py/io/pdb.py    
&#8195; - Utilidades para leer archivos PDB.

main/source/scripts/python/public/rosetta_py/io/mdl_molfile.py    
&#8195; - Utilidades para leer archivos sdf/mol/mol2.

main/source/scripts/python/public/rosetta_py/utility/rankorder.py    
&#8195; - Funciones para ordenar datos.

main/source/scripts/python/public/rosetta_py/utility/ForkManager.py    
&#8195; - Utilidades para gestionar el multiprocesamiento.

main/source/scripts/python/public/rosetta_py/utility/r3.py    
&#8195; - Una clase de vector 3D para python.

tools/protein_tools/rosettautil/bcl/file_formats.py    
&#8195; - 

tools/protein_tools/rosettautil/graphics/plotting.py    
&#8195; - 

tools/protein_tools/rosettautil/protein/alignment.py    
&#8195; - 

tools/protein_tools/rosettautil/protein/naccess.py    
&#8195; - 

tools/protein_tools/rosettautil/protein/pdbStat.py    
&#8195; - 

tools/protein_tools/rosettautil/protein/PSSM.py    
&#8195; - 

tools/protein_tools/rosettautil/protein/util.py    
&#8195; - 

tools/protein_tools/rosettautil/rosetta/loops.py    
&#8195; - 

tools/protein_tools/rosettautil/rosetta/map_pdb_residues.py    
&#8195; - 

tools/protein_tools/rosettautil/rosetta/params.py    
&#8195; - 

tools/protein_tools/rosettautil/rosetta/resfile.py    
&#8195; - 

tools/protein_tools/rosettautil/rosetta/rosettaScore_beta.py    
&#8195; - 

tools/protein_tools/rosettautil/rosetta/rosettaScore.py    
&#8195; - 

tools/protein_tools/rosettautil/rosetta/weights.py    
&#8195; - 

tools/protein_tools/rosettautil/util/fileutil.py    
&#8195; - 


## Herramientas de programación

main/source/make_ctags.sh    
&#8195; - Crea un archivo ctag para editores de código.

tools/Check_header_guards_and_copyright.py    
&#8195; - Comprueba que el encabezado de copyright de cada archivo de Rosetta sea correcto. 

tools/coding_util/remove_dead_code.py    
&#8195; - Elimina los archivos que no se necesitan para la compilación. 

tools/code_coverage.py    
&#8195; - Calcula la cobertura de código de las pruebas de integración y unitarias. 

tools/git_revision_parser.py    
&#8195; - Intenta encontrar las designaciones de revisión relevantes a partir de un commit de git. 

tools/coding_util/generate_warnings_list.py    
&#8195; - Encuentra advertencias del compilador en el código de Rosetta. 

main/source/src/utility/tools/make_templates.py    
&#8195; - 

tools/perl_util/compiler.pl    
&#8195; - 

tools/perl_util/diff_int.pl    
&#8195; - 

tools/perl_util/find_includes.pl    
&#8195; - 

tools/perl_util/grep_source.pl    
&#8195; - 

tools/perl_util/hack_replace.pl    
&#8195; - 

tools/perl_util/include_guard.pl    
&#8195; - 

tools/perl_util/promote_lib.pl    
&#8195; - 

tools/perl_util/ralph-build.pl    
&#8195; - 

tools/perl_util/remove_trailing_whitespace.pl    
&#8195; - 

tools/perl_util/scons_to_makefile.pl    
&#8195; - 

tools/perl_util/spaces2tabs.pl    
&#8195; - 

tools/perl_util/suggest_compilation_fixes.pl    
&#8195; - 

tools/coding_util/artistic_spacing.py    
&#8195; - 

tools/coding_util/create_rosetta_class.py    
&#8195; - 

tools/coding_util/create_rosetta_mover.py    
&#8195; - 

tools/coding_util/create_variables_for_class.py    
&#8195; - 

tools/coding_util/fix_AUTO_REMOVE.py    
&#8195; - 

tools/coding_util/fixes/DNA_RNA_atom_rename.sh    
&#8195; - 

tools/coding_util/fixes/DNA_RNA_residue_rename_pdb.py    
&#8195; - 

tools/coding_util/fixes/DNA_RNA_residue_rename.sh    
&#8195; - 

tools/coding_util/fixes/fix_general_to_align.py    
&#8195; - 

tools/coding_util/fixes/fix_namespace_scopes.py    
&#8195; - 

tools/coding_util/fixes/fix_swa_rna_Output.py    
&#8195; - 

tools/coding_util/fixes/fix_tracer_names.py    
&#8195; - 

tools/coding_util/fixes/func_fixup.sh    
&#8195; - 

tools/coding_util/fixes/remove_Contain_seq_num.py    
&#8195; - 

tools/coding_util/fixes/remove_VIRT.py    
&#8195; - 

tools/coding_util/fixes/rename_rU.sh    
&#8195; - 

tools/coding_util/fixes/swa_rna_add_tracer_to_output.py    
&#8195; - 

tools/coding_util/fixes/swa_rna_fix_underscores.sh    
&#8195; - 

tools/coding_util/fixes/switch_DNA_hydrogens.sh    
&#8195; - 

tools/coding_util/fixes/switch_OP1_OP2.sh    
&#8195; - 

tools/coding_util/fixes/switch_RNA_hydrogens_H2.sh    
&#8195; - 

tools/coding_util/fixes/switch_RNA_hydrogens_H4.sh    
&#8195; - 

tools/coding_util/fixes/switch_RNA_hydrogens.sh    
&#8195; - 

tools/coding_util/fixes/update_swm_options2.sh    
&#8195; - 

tools/coding_util/fixes/update_swm_options.sh    
&#8195; - 


## Sin clasificar

main/source/GUIs/rosetta_flag_file_builder/*    
&#8195; - 

main/source/src/python/packaged_bindings/*    
&#8195; - 

main/source/src/python/bindings/*    
&#8195; - 

tools/AmbRose/[[AmbRose.py|AmbRose]]   
&#8195; - Módulo de Python para la interconversión entre Poses de Rosetta y de Amber

tools/clang/clang.py    
&#8195; - 

tools/clang_ast_transform/*    
&#8195; - 

tools/PyRosetta.develop/DeployPyRosetta.py    
&#8195; - 

tools/python_cc_reader/*    
&#8195; -

tools/willclang/*    


##Véase también

* [[Utilities Applications]]
* [[Analysis Applications]]
* [[Application Documentation]]: Página principal de las aplicaciones
* [[Instrucciones para configurar R|FeaturesTutorialRBasics]]
* [[PyMOL]]
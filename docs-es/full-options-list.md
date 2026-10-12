# Lista de opciones de línea de comandos de Rosetta.

_(Este archivo se genera automáticamente; ¡no lo edites!)_
Generado: 2026-07-02

_Ten en cuenta que es posible que algunas opciones específicas de cada aplicación no aparezcan en esta lista._

[[_TOC_]]
+ <h2>-in</h2>
<dl>
<dt><b>-in</b> \<Boolean\></dt>
<dd>grupo de opciones in<br/></dd>
<dt><b>-fconfig</b> \<FileVector\></dt>
<dd>Lista de configuraciones de opciones que se deben buscar. Pueden estar en tu directorio de trabajo o en el directorio $HOME/.rosetta/flags. Ej.: -fconfig common design<br/>Default: ['"common"']<br/></dd>
<dt><b>-no_fconfig</b> \<Boolean\></dt>
<dd>No cargar el archivo de configuración [common] si existe. <br/>Default: false<br/></dd>
<dt><b>-skip_classic_cart_setup</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-skip_new_cart_setup</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-Ntermini</b> \<String\></dt>
<dd>Poner los extremos N-terminales completos en el Pose<br/>Default: "ALL"<br/></dd>
<dt><b>-Ctermini</b> \<String\></dt>
<dd>Poner los extremos C-terminales completos en el Pose<br/>Default: "ALL"<br/></dd>
<dt><b>-use_truncated_termini</b> \<Boolean\></dt>
<dd>No añadirá OXT/H adicionales en los extremos si no están en la estructura de entrada<br/>Default: false<br/></dd>
<dt><b>-ignore_unrecognized_res</b> \<Boolean\></dt>
<dd>No abortar si se encuentran residuos desconocidos en el archivo PDB; en su lugar, ignorarlos. Ten en cuenta que esto implica -in:ignore_waters<br/>Default: false<br/></dd>
<dt><b>-ignore_waters</b> \<Boolean\></dt>
<dd>Ignorar los residuos HOH encontrados en el archivo PDB. Nota: los residuos HOH, y las aguas en general, son incompatibles con el modelo de solvatación por defecto (LK). Usa -beta en su lugar.<br/>Default: true<br/></dd>
<dt><b>-water_type_if_unspecified</b> \<String\></dt>
<dd>El nombre del tipo de residuo de agua que se usará si el tipo específico de agua no se indica en el archivo de entrada.<br/>Default: ""<br/></dd>
<dt><b>-guarantee_no_DNA</b> \<Boolean\></dt>
<dd>No renombrar A/C/G a DA/DC/DG aunque les falte el hidroxilo 2'; el conocimiento experto indica que esta estructura no contiene ADN.<br/>Default: false<br/></dd>
<dt><b>-add_orbitals</b> \<Boolean\></dt>
<dd>Añadirá orbitales solo a los residuos. No incluye orbitales en los ligandos. Se hace mediante la lectura del archivo params.<br/>Default: false<br/></dd>
<dt><b>-show_all_fixes</b> \<Boolean\></dt>
<dd>Mostrar todas las correcciones de nombres de residuos y átomos<br/>Default: false<br/></dd>
<dt><b>-include_sugars</b> \<Boolean\></dt>
<dd>Define si los residuos de carbohidratos se cargarán o no en Rosetta. El valor por defecto es false.<br/>Default: false<br/></dd>
<dt><b>-include_lipids</b> \<Boolean\></dt>
<dd>Define si los residuos de lípidos se cargarán o no en Rosetta. El valor por defecto es false.<br/>Default: false<br/></dd>
<dt><b>-include_surfaces</b> \<Boolean\></dt>
<dd>Define si los residuos de superficies minerales se cargarán o no en Rosetta. El valor por defecto es false.<br/>Default: false<br/></dd>
<dt><b>-read_only_ATOM_entries</b> \<Boolean\></dt>
<dd>Define si se ignora todo excepto las entradas ATOM.<br/>Default: false<br/></dd>
<dt><b>-auto_detect_glycan_connections</b> \<Boolean\></dt>
<dd>Define si se buscan conexiones no proteicas usando las coordenadas del PDB y se generan registros LINK.<br/>Default: false<br/></dd>
<dt><b>-max_bond_length</b> \<Real\></dt>
<dd>Define la distancia O-C máxima para la búsqueda de conexiones de glicanos. El valor por defecto es 1.65 Å.<br/>Default: 1.65<br/></dd>
<dt><b>-min_bond_length</b> \<Real\></dt>
<dd>Define la distancia O-C mínima para la búsqueda de conexiones de glicanos. El valor por defecto es 1.15 Å.<br/>Default: 1.15<br/></dd>
<dt><b>-glycan_virtual_offset</b> \<Real\></dt>
<dd>Aplica un desplazamiento muy pequeño a las posiciones virtuales de los glicanos para evitar la colinealidad en la minimización de ángulos.<br/>Default: 0<br/></dd>
<dt><b>-membrane</b> \<Boolean\></dt>
<dd>Inicializar el Pose como una proteína de membrana usando los parámetros de membrana especificados. El valor por defecto es false<br/>Default: false<br/></dd>
<dt><b>-tuning_param</b> \<Real\></dt>
<dd>Especifica el parámetro de ajuste para modular las funciones de puntuación de baja y alta resolución.<br/>Default: 1.0<br/></dd>
<dt><b>-remember_unrecognized_res</b> \<Boolean\></dt>
<dd>Ignorar los residuos no reconocidos, pero recordarlos en PDBInfo.<br/>Default: false<br/></dd>
<dt><b>-remember_unrecognized_water</b> \<Boolean\></dt>
<dd>Recordar las aguas junto con los demás residuos no reconocidos.<br/>Default: false<br/></dd>
<dt><b>-preserve_crystinfo</b> \<Boolean\></dt>
<dd>Conservar la información importante para el refinamiento cristalográfico (factores B y línea CRYST1)<br/>Default: false<br/></dd>
<dt><b>-fast_restyping</b> \<Boolean\></dt>
<dd>Usar una versión más rápida de la asignación de tipos de residuo al leer los archivos de entrada. Esto supone que el código de tres letras corresponde al tipo de residuo «estándar», o que el tipo correcto se ha especificado en los registros HETNAM. Debería funcionar con las salidas de Rosetta y con la mayoría de las estructuras tomadas directamente del wwPDB (sin editar ni limpiar), con ciertas salvedades.<br/>Default: false<br/></dd>
<dt><b>-detect_oops</b> \<Boolean\></dt>
<dd>Detectar oligooxopiperazinas (oops) y añadir las restricciones necesarias<br/>Default: false<br/></dd>
<dt><b>-obey_ssbond</b> \<Boolean\></dt>
<dd>Si es true, se usan los registros SSBOND del PDB para especificar los puentes disulfuro. Si es false, se usan los ajustes de -detect_disulf para determinar los puentes disulfuro.<br/>Default: false<br/></dd>
<dt><b>-detect_disulf</b> \<Boolean\></dt>
<dd>Activar o desactivar a la fuerza la detección de puentes disulfuro. Si no se especifica, Rosetta detecta de forma conservadora los puentes disulfuro en entradas de todos los átomos según la distancia SG, pero no formará puentes disulfuro en centroide. Con '-detect_disulf true' se fuerza una detección agresiva de puentes disulfuro en Poses centroide según la distancia CB. Con '-detect_disulf false' se desactiva toda detección, incluso en Poses de todos los átomos. Ten en cuenta que desactivar los puentes disulfuro provoca choques graves en los puentes disulfuro nativos.<br/></dd>
<dt><b>-detect_disulf_tolerance</b> \<Real\></dt>
<dd>tolerancia de los puentes disulfuro<br/>Default: 0.5<br/></dd>
<dt><b>-constraints_from_link_records</b> \<Boolean\></dt>
<dd>Convertir los registros link en restricciones de par de átomos y de ángulo<br/>Default: false<br/></dd>
<dt><b>-auto_setup_metals</b> \<Boolean\></dt>
<dd>Al importar el PDB, añade automáticamente enlaces covalentes a los iones metálicos unidos, además de restricciones de par de átomos y de ángulo para mantener los iones en su lugar. También fija en 1.0 los pesos de atom_pair_constraint y angle_constraint de la función de puntuación por defecto. False por defecto.<br/>Default: false<br/></dd>
<dt><b>-prevent_auto_setup_metal_bb_variants</b> \<Boolean\></dt>
<dd>Al configurar los metales automáticamente, en los casos en que se detecta un enlace entre un metal y un átomo pesado de la cadena principal (por ejemplo, un oxígeno carbonilo de la cadena principal), Rosetta configura por defecto tipos de variante con enlace para el residuo actual y para todos los demás tipos de residuo con un átomo pesado equivalente en la cadena principal, a fin de permitir mutaciones. Si esta opción es true, eso no ocurre. False por defecto.<br/>Default: false<br/></dd>
<dt><b>-metals_detection_LJ_multiplier</b> \<Real\></dt>
<dd>Cuando se usa -auto_setup_metals, el criterio con el que se detectan los enlaces covalentes es el solapamiento entre los átomos del metal y los átomos que se unen al metal. Los radios de Lennard-Jones de los átomos se pueden multiplicar por un factor constante para detectar enlaces más largos con iones metálicos. Valor por defecto: 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-metals_distance_constraint_multiplier</b> \<Real\></dt>
<dd>Las distancias entre los metales y los átomos que se unen a ellos se restringen con potenciales armónicos, escalados por este multiplicador. Valor por defecto: 1.0. Usa 0.0 para no añadir restricciones de distancia.<br/>Default: 1.0<br/></dd>
<dt><b>-metals_angle_constraint_multiplier</b> \<Real\></dt>
<dd>Los ángulos entre los metales, los átomos que se unen al metal y los átomos padre de estos se restringen con potenciales armónicos circulares, escalados por este multiplicador. Valor por defecto: 1.0. Usa 0.0 para no añadir restricciones de ángulo.<br/>Default: 1.0<br/></dd>
<dt><b>-name3_property_codes</b> \<StringVector\></dt>
<dd>Archivo que describe la correspondencia entre name3 y propiedades para corregir la asignación de átomos<br/>Default: utility::vector1<std::string>(1,"code_properties.codes")<br/></dd>
<dt><b>-alternate_3_letter_codes</b> \<StringVector\></dt>
<dd>Especifica el nombre o nombres de archivos *.codes que incluyen una lista de códigos alternativos de 3 letras. El directorio por defecto es database/input_output/3-letter_codes/, pero se puede indicar cualquier ruta. Los códigos duplicados en archivos sucesivos sobrescriben los anteriores.<br/>Default: utility::vector1<std::string>(1,"default.codes")<br/></dd>
<dt><b>-maintain_links</b> \<Boolean\></dt>
<dd>Conserva los registros link del PDB al usar auto_detect_glycans<br/>Default: false<br/></dd>
<dt><b>-fix_disulf</b> \<File\></dt>
<dd>Especifica la conectividad de los puentes disulfuro mediante un archivo. Los puentes disulfuro se indican con dos índices de residuo separados por espacios en blanco en cada línea. Esta opción reemplaza la antigua opción '-run:fix_disulf'.<br/></dd>
<dt><b>-missing_density_to_jump</b> \<Boolean\></dt>
<dd>Si se encuentra densidad ausente en los PDB de entrada, reemplazarla con un salto<br/>Default: false<br/></dd>
<dt><b>-target_residues</b> \<IntegerVector\></dt>
<dd>qué números de residuo se pasan a getDistConstraints<br/></dd>
<dt><b>-replonly_residues</b> \<IntegerVector\></dt>
<dd>números de residuo que se consideran residuos solo repulsivos<br/></dd>
<dt><b>-replonly_loops</b> \<Boolean\></dt>
<dd>todos los loops se considerarán solo repulsivos<br/>Default: false<br/></dd>
<dt><b>-use_database</b> \<Boolean\></dt>
<dd>Leer estructuras desde la base de datos. Especifica la base de datos con -inout:dbms:database_name y las estructuras deseadas con -in:file:tags o select_structures_from_database<br/></dd>
<dt><b>-select_structures_from_database</b> \<StringVector\></dt>
<dd>especifica una consulta SQL para determinar qué estructuras se leen de una base de datos indicada con -inout:dbms:database_name. La consulta SELECT debe devolver structures.tag<br/></dd>
</dl>
+ <h3>-in:dbms</h3>
<dl>
<dt><b>-dbms</b> \<Boolean\></dt>
<dd>grupo de opciones dbms<br/></dd>
<dt><b>-struct_ids</b> \<StringVector\></dt>
<dd>Lista de struct_ids (representación hexadecimal) que usará el inputter de trabajos de base de datos<br/></dd>
</dl>
+ <h3>-in:path</h3>
<dl>
<dt><b>-path</b> \<PathVector\></dt>
<dd>Rutas donde buscar archivos de entrada (se revisan después de las rutas específicas por tipo)<br/>Default: "."<br/></dd>
<dt><b>-fragments</b> \<PathVector\></dt>
<dd>Rutas de búsqueda de archivos de fragmentos de entrada<br/></dd>
<dt><b>-pdb</b> \<PathVector\></dt>
<dd>Rutas de búsqueda de archivos PDB de entrada<br/></dd>
<dt><b>-database</b> \<PathVector\></dt>
<dd>Rutas de búsqueda de archivos de la base de datos de entrada. Si no se encuentra la base de datos, se prueba con la variable de entorno ROSETTA3_DB.<br/></dd>
<dt><b>-database_cache_dir</b> \<Path\></dt>
<dd>Directorio que se usará para guardar en caché los archivos de base de datos procesados.<br/></dd>
<dt><b>-bcl</b> \<PathVector\></dt>
<dd>Ruta al submódulo BCL en Rosetta. Debe llevar a un submódulo BCL válido. Si no se encuentra el BCL, se intenta resolver la ruta relativa a la base de datos de Rosetta.<br/></dd>
</dl>
+ <h3>-in:file</h3>
<dl>
<dt><b>-file</b> \<Boolean\></dt>
<dd>Grupo de opciones de archivos de entrada<br/></dd>
<dt><b>-s</b> \<FileVector\></dt>
<dd>Nombre o nombres de los archivos PDB individuales que se procesarán<br/>Default: []<br/></dd>
<dt><b>-t</b> \<FileVector\></dt>
<dd>Nombre o nombres de los segundos archivos PDB que se procesarán (se emparejan con -s)<br/></dd>
<dt><b>-l</b> \<FileVector\></dt>
<dd>Archivo o archivos que contienen listas de archivos PDB que se procesarán<br/></dd>
<dt><b>-job_definition_file</b> \<File\></dt>
<dd>Archivo que usa JD3 en el que se pueden especificar varios trabajos con entradas distintas<br/></dd>
<dt><b>-list</b> \<FileVector\></dt>
<dd>Archivo o archivos que contienen listas de archivos PDB. Los PDB que están en la misma línea forman un solo Pose<br/></dd>
<dt><b>-srlz</b> \<Boolean\></dt>
<dd>Poses serializados de entrada (en lugar de archivos PDB)<br/>Default: false<br/></dd>
<dt><b>-srlz_override</b> \<Boolean\></dt>
<dd>Idéntica a in:file:srlz, salvo que no termina si el archivo de entrada fue generado por otra versión de Rosetta.<br/>Default: false<br/></dd>
<dt><b>-screening_list</b> \<FileVector\></dt>
<dd>Archivos que contienen listas de archivos PDB. Todas las permutaciones de los archivos de la lista se convierten en Poses<br/></dd>
<dt><b>-screening_job_file</b> \<File\></dt>
<dd>Un archivo JSON con grupos de ligandos y proteínas para cribar<br/></dd>
<dt><b>-shuffle_screening_jobs</b> \<Boolean\></dt>
<dd>Aleatorizar el orden de los trabajos de entrada indicados con -in:file:screening_job_file<br/>Default: false<br/></dd>
<dt><b>-native</b> \<File\></dt>
<dd>Nombre del archivo PDB nativo<br/></dd>
<dt><b>-torsion_bin_probs</b> \<File\></dt>
<dd>Archivo que describe las probabilidades sobre los intervalos de torsión A,B,E,G,O<br/>Default: "empty"<br/></dd>
<dt><b>-PCS_frag_cst</b> \<File\></dt>
<dd>Archivo que contiene restricciones PCS para usar en la selección de fragmentos<br/></dd>
<dt><b>-talos_phi_psi</b> \<File\></dt>
<dd>Archivo que proporciona los ángulos Phi-Psi en formato Talos+<br/></dd>
<dt><b>-talos_cs</b> \<File\></dt>
<dd>Archivo que proporciona los desplazamientos químicos en formato Talos<br/></dd>
<dt><b>-ambig_talos_cs_A</b> \<File\></dt>
<dd>Archivo que proporciona el primer conjunto de opciones de desplazamientos químicos ambiguos en formato Talos<br/></dd>
<dt><b>-ambig_talos_cs_B</b> \<File\></dt>
<dd>Archivo que proporciona el segundo conjunto de opciones de desplazamientos químicos ambiguos en formato Talos<br/></dd>
<dt><b>-native_exclude_res</b> \<IntegerVector\></dt>
<dd>Números de residuo que se excluyen del cálculo del RMS<br/></dd>
<dt><b>-no_detect_pseudobonds</b> \<Boolean\></dt>
<dd>Por defecto, Rosetta detecta automáticamente los pseudoenlaces al importar el archivo. Si esta opción es true, esa detección automática se desactiva. False por defecto.<br/>Default: false<br/></dd>
<dt><b>-tags</b> \<StringVector\></dt>
<dd>Etiqueta o etiquetas de las estructuras que se usarán del silent file<br/></dd>
<dt><b>-user_tags</b> \<StringVector\></dt>
<dd>user_tag o user_tags de las estructuras que se usarán del silent file<br/></dd>
<dt><b>-tagfile</b> \<File\></dt>
<dd>Archivo con la lista de etiquetas que se usarán del silent file. (un -in:file:l para las etiquetas de silent file.)<br/>Default: "TAGS"<br/></dd>
<dt><b>-frag_files</b> \<FileVector\></dt>
<dd>Nombres de los archivos de fragmentos de entrada<br/>Default: []<br/></dd>
<dt><b>-remap_pdb_atom_names_for</b> \<StringVector\></dt>
<dd>Al leer PDB, usa la geometría para renombrar los átomos de los residuos con los códigos de tres letras indicados.<br/></dd>
<dt><b>-extra_res</b> \<FileVector\></dt>
<dd>Archivo o archivos .params para nuevos tipos de residuo (p. ej., ligandos)<br/>Default: []<br/></dd>
<dt><b>-extra_res_fa</b> \<FileVector\></dt>
<dd>Archivo o archivos .params para nuevos tipos de residuo de todos los átomos (p. ej., ligandos)<br/>Default: []<br/></dd>
<dt><b>-override_database_params</b> \<Boolean\></dt>
<dd>Usar los archivos .params de entrada en lugar de la base de datos si el nombre del residuo se encuentra en el conjunto de residuos<br/>Default: false<br/></dd>
<dt><b>-extra_res_mol</b> \<FileVector\></dt>
<dd>Archivo o archivos .mol para nuevos tipos de residuo de todos los átomos (p. ej., ligandos)<br/>Default: []<br/></dd>
<dt><b>-extra_res_mmCIF</b> \<FileVector\></dt>
<dd>Archivo o archivos .mmCIF del diccionario de componentes para tipos de residuo (p. ej., ligandos)<br/>Default: []<br/></dd>
<dt><b>-load_PDB_components</b> \<Boolean\></dt>
<dd>Usar las definiciones de ligandos del PDB para cargar todas las descripciones estándar de residuos.<br/>Default: true<br/></dd>
<dt><b>-PDB_components_directory</b> \<String\></dt>
<dd>El directorio que almacena una colección de archivos en formato mmCIF del Chemical Components Dictionary, con nombres como 'components.?.cif'<br/>Default: "chemical/pdb_components"<br/></dd>
<dt><b>-PDB_components_overrides</b> \<StringVector\></dt>
<dd>Cualquier archivo CIF complementario desde el que cargar las definiciones de componentes del PDB. Tienen la máxima prioridad y se pueden usar para corregir el directorio.<br/>Default: []<br/></dd>
<dt><b>-check_all_PDB_components</b> \<Boolean\></dt>
<dd>Si es false, ignora los componentes del PDB cuyo name3 coincide con un tipo de la base de datos de Rosetta, aunque sean químicamente distintos.<br/>Default: true<br/></dd>
<dt><b>-extra_res_database</b> \<String\></dt>
<dd>el nombre de una base de datos que contiene tipos de residuo de todos los átomos (p. ej., ligandos)<br/></dd>
<dt><b>-extra_res_pq_schema</b> \<String\></dt>
<dd>el nombre de un esquema de PostgreSQL de la base de datos que contiene tipos de residuo de todos los átomos (p. ej., ligandos)<br/>Default: ""<br/></dd>
<dt><b>-extra_res_database_mode</b> \<String\></dt>
<dd>El tipo de controlador de base de datos que se usará para -in:file:extra_res_database.<br/>Default: "sqlite3"<br/></dd>
<dt><b>-extra_res_database_resname_list</b> \<File\></dt>
<dd>Ruta a una lista de nombres de residuo que se leerán de la base de datos de residuos. La lista debe tener un nombre de residuo por línea<br/></dd>
<dt><b>-extra_res_cen</b> \<FileVector\></dt>
<dd>Archivo o archivos .params para nuevos tipos de residuo centroide (p. ej., ligandos)<br/>Default: []<br/></dd>
<dt><b>-extra_res_path</b> \<PathVector\></dt>
<dd>directorios con archivos .params. Solo se elegirán los archivos que contengan 'param'<br/>Default: []<br/></dd>
<dt><b>-extra_rot_lib_path</b> \<PathVector\></dt>
<dd>directorios con archivos de rotámeros de aminoácidos no canónicos (NCAA).<br/>Default: []<br/></dd>
<dt><b>-override_rot_lib_path</b> \<PathVector\></dt>
<dd>si se encuentran bibliotecas de rotámeros en este directorio, se priorizan sobre las demás<br/>Default: []<br/></dd>
<dt><b>-extra_res_batch_path</b> \<PathVector\></dt>
<dd>directorios generados por src/python/apps/public/batch_molfile_to_params.py. Solo se elegirán los archivos que contengan 'param'<br/>Default: []<br/></dd>
<dt><b>-extra_patch_fa</b> \<FileVector\></dt>
<dd>archivos de parche para variantes de todos los átomos no especificadas en la base de datos<br/>Default: []<br/></dd>
<dt><b>-extra_patch_cen</b> \<FileVector\></dt>
<dd>archivos de parche para variantes de átomos centroide no especificadas en la base de datos<br/>Default: []<br/></dd>
<dt><b>-frag3</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-frag9</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-fragA</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-fragB</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-surface_vectors</b> \<String\></dt>
<dd>Archivo de entrada con tres conjuntos de coordenadas xyz que definen el plano y la periodicidad de la superficie sólida<br/></dd>
<dt><b>-xyz</b> \<String\></dt>
<dd>Coordenadas de entrada en formato XYZ sin procesar (tres columnas)<br/></dd>
<dt><b>-keep_input_scores</b> \<Boolean\></dt>
<dd>Conservar o no las puntuaciones del archivo de entrada en el Pose.<br/>Default: true<br/></dd>
<dt><b>-lazy_silent</b> \<Boolean\></dt>
<dd>Activar LazySilentFileJobInputter<br/>Default: false<br/></dd>
<dt><b>-silent</b> \<FileVector\></dt>
<dd>nombre o nombres de los silent files de entrada<br/>Default: []<br/></dd>
<dt><b>-force_silent_bitflip_on_read</b> \<Boolean\></dt>
<dd>Forzar el cambio de bits al leer silent files binarios. Es útil si los archivos se producen en un sistema little-endian y se leen en uno big-endian.<br/>Default: false<br/></dd>
<dt><b>-atom_tree_diff</b> \<FileVector\></dt>
<dd>nombre o nombres de los archivos atom_tree_diff de entrada<br/></dd>
<dt><b>-zip</b> \<String\></dt>
<dd>archivo comprimido de entrada, usado para la base de datos de BOINC<br/></dd>
<dt><b>-boinc_wu_zip</b> \<FileVector\></dt>
<dd>archivo comprimido de entrada con los archivos de una unidad de trabajo específica de BOINC<br/></dd>
<dt><b>-fullatom</b> \<Boolean\></dt>
<dd>Activar la entrada de todos los átomos de estructuras PDB o centroide<br/>Default: false<br/></dd>
<dt><b>-centroid_input</b> \<Boolean\></dt>
<dd>¿por qué «input» aparece dos veces en el nombre? in:file:centroid_input Activa las entradas centroide de PDB<br/>Default: false<br/></dd>
<dt><b>-centroid</b> \<Boolean\></dt>
<dd>Activar las entradas centroide de PDB<br/>Default: false<br/></dd>
<dt><b>-assign_gasteiger_atom_types</b> \<Boolean\></dt>
<dd>Asignar automáticamente GasteigerAtomTypes a todos los residuos del ResidueTypeSet<br/>Default: false<br/></dd>
<dt><b>-treat_residues_in_these_chains_as_separate_chemical_entities</b> \<String\></dt>
<dd>Crear un salto químico para cada residuo de estas cadenas (cadena de IDs de cadena de 1 letra)<br/>Default: " "<br/></dd>
<dt><b>-residue_type_set</b> \<String\></dt>
<dd>ResidueTypeSet para los archivos de entrada<br/>Default: "fa_standard"<br/></dd>
<dt><b>-pca</b> \<File\></dt>
<dd>calcular proyecciones PCA<br/>Default: ""<br/></dd>
<dt><b>-silent_energy_cut</b> \<Real\></dt>
<dd>corte de energía para los silent files<br/>Default: 1.0<br/></dd>
<dt><b>-silent_list</b> \<FileVector\></dt>
<dd>Lista o listas de nombres de silent files de entrada, como -l es a -s <br/></dd>
<dt><b>-silent_renumber</b> \<Boolean\></dt>
<dd>renumerar o no los decoys en not_universal_main<br/>Default: false<br/></dd>
<dt><b>-silent_struct_type</b> \<String\></dt>
<dd>Tipo de objeto SilentStruct que se usará en la entrada de silent files<br/>Default: "protein"<br/></dd>
<dt><b>-silent_read_through_errors</b> \<Boolean\></dt>
<dd>ignorará los decoys con errores y seguirá leyendo<br/>Default: false<br/></dd>
<dt><b>-silent_score_prefix</b> \<String\></dt>
<dd>Prefijo que se antepone a todas las puntuaciones leídas de un silent file<br/>Default: ""<br/></dd>
<dt><b>-silent_select_random</b> \<Integer\></dt>
<dd>Seleccionar un subconjunto aleatorio con este número de decoys de cada silent file leído<br/>Default: 0<br/></dd>
<dt><b>-silent_select_range_start</b> \<Integer\></dt>
<dd>Seleccionar un subconjunto por rango de decoys de cada silent file leído. Empieza en este decoy.<br/>Default: -1<br/></dd>
<dt><b>-silent_select_range_mul</b> \<Integer\></dt>
<dd>Seleccionar un multiplicador del tamaño de bloque. Este parámetro multiplica -silent_select_range_start. Por ejemplo, si se fija en 5, -silent_select_range_start 0,1,2,3,4 hará que los decoys se lean empezando desde 0,5,10,15,20<br/>Default: 1<br/></dd>
<dt><b>-silent_select_range_len</b> \<Integer\></dt>
<dd>Seleccionar un subconjunto por rango de decoys de cada silent file leído. Empieza en este decoy.<br/>Default: 1<br/></dd>
<dt><b>-skip_failed_simulations</b> \<Boolean\></dt>
<dd>Ignorar las simulaciones fallidas (con prefijo W_) durante la entrada de silent files. De forma predeterminada se conserva el comportamiento existente.<br/>Default: false<br/></dd>
<dt><b>-silent_scores_wanted</b> \<StringVector\></dt>
<dd>Poner en el Pose solo estas puntuaciones del silent file.<br/></dd>
<dt><b>-fasta</b> \<FileVector\></dt>
<dd>Archivo de secuencia en formato FASTA<br/>Default: []<br/></dd>
<dt><b>-pssm</b> \<FileVector\></dt>
<dd>Matriz de puntuación específica de posición en formato NCBI BLAST<br/></dd>
<dt><b>-seq</b> \<StringVector\></dt>
<dd>Lista de archivos de entrada para construir secuencias<br/></dd>
<dt><b>-checkpoint</b> \<File\></dt>
<dd>Perfil de secuencia (formato de archivo de texto plano) preparado por NCBI BLAST<br/></dd>
<dt><b>-binary_chk</b> \<File\></dt>
<dd>Perfil de secuencia (formato de archivo binario) preparado por NCBI BLAST<br/></dd>
<dt><b>-alignment</b> \<FileVector\></dt>
<dd>Archivo de entrada para el alineamiento de secuencias<br/></dd>
<dt><b>-alignment2</b> \<FileVector\></dt>
<dd>Archivo de entrada para el segundo alineamiento de secuencias <br/></dd>
<dt><b>-rama2b_map</b> \<File\></dt>
<dd>Archivo de Ramachandran usado por rama2b<br/>Default: "scoring/score_functions/rama/Rama08.dat"<br/></dd>
<dt><b>-psipred_ss2</b> \<File\></dt>
<dd>archivo de definición de estructura secundaria de psipred_ss2<br/>Default: "tt"<br/></dd>
<dt><b>-dssp</b> \<File\></dt>
<dd>archivo de definición de estructura secundaria de dssp<br/>Default: "tt"<br/></dd>
<dt><b>-fail_on_bad_hbond</b> \<Boolean\></dt>
<dd>salir si se detecta un error de enlaces de hidrógeno<br/>Default: true<br/></dd>
<dt><b>-movemap</b> \<File\></dt>
<dd>Sin descripción<br/>Default: "default.movemap"<br/></dd>
<dt><b>-repair_sidechains</b> \<Boolean\></dt>
<dd>Intentar un reempaquetado/minimización para reparar problemas de cadenas laterales, como la geometría de la prolina y la tautomerización de la His<br/>Default: false<br/></dd>
<dt><b>-no_binary_dunlib</b> \<Boolean\></dt>
<dd>No intentar leer ni escribir un archivo binario para la biblioteca de Dunbrack<br/></dd>
<dt><b>-extended_pose</b> \<Integer\></dt>
<dd>número de Poses extendidos que se procesarán en not_universal_main<br/>Default: 1<br/></dd>
<dt><b>-template_pdb</b> \<FileVector\></dt>
<dd>Nombre de los archivos PDB de plantilla de entrada para el modelado comparativo<br/></dd>
<dt><b>-template_silent</b> \<File\></dt>
<dd>plantillas de entrada para el modelado comparativo: la etiqueta debe coincidir con el id del alineamiento<br/></dd>
<dt><b>-rdc</b> \<FileVector\></dt>
<dd>Archivo experimental de acoplamiento dipolar residual (RDC) de RMN: un archivo por medio de alineamiento<br/></dd>
<dt><b>-csa</b> \<FileVector\></dt>
<dd>Archivo experimental de anisotropía del desplazamiento químico (CSA) de RMN<br/></dd>
<dt><b>-dc</b> \<FileVector\></dt>
<dd>Archivo experimental de acoplamiento dipolar de RMN<br/></dd>
<dt><b>-burial</b> \<FileVector\></dt>
<dd>Predicción de enterramiento en formato WESA<br/></dd>
<dt><b>-hrf_ms_labeling</b> \<File\></dt>
<dd>Datos experimentales de marcaje HRF por espectrometría de masas<br/></dd>
<dt><b>-vall</b> \<FileVector\></dt>
<dd>Archivo de la base de datos de fragmentos, p. ej. vall.dat.2006-05-05<br/>Default: "/sampling/filtered.vall.dat.2006-05-05"<br/></dd>
<dt><b>-rescore</b> \<Boolean\></dt>
<dd>Controla si los Poses de entrada se vuelven a puntuar o no en not_universal_main; por defecto es false.<br/>Default: false<br/></dd>
<dt><b>-spanfile</b> \<String\></dt>
<dd>Archivo de segmentos que atraviesan la membrana<br/></dd>
<dt><b>-lipofile</b> \<String\></dt>
<dd>Archivo de exposición de la membrana<br/></dd>
<dt><b>-HDX</b> \<String\></dt>
<dd>Archivo de datos de intercambio de hidrógeno (HDX)<br/></dd>
<dt><b>-d2h_sa_reweight</b> \<Real\></dt>
<dd>reponderación de d2h_sa<br/>Default: 1.00<br/></dd>
<dt><b>-sucker_params</b> \<File\></dt>
<dd>Archivo de parámetros que contiene los parámetros de SplineEnergy<br/>Default: "scoring/spline_energy_functions/sucker.params"<br/></dd>
<dt><b>-fold_tree</b> \<File\></dt>
<dd>FoldTree definido por el usuario que se impondrá al Pose después de leerlo del disco<br/></dd>
<dt><b>-obey_ENDMDL</b> \<Boolean\></dt>
<dd>Dejar de leer un PDB después de la tarjeta ENDMDL; en la práctica, lee solo el primer modelo de los PDB de RMN con varios modelos<br/>Default: false<br/></dd>
<dt><b>-new_chain_order</b> \<Boolean\></dt>
<dd>garantiza que las cadenas de registros MODEL distintos tengan mini cadenas distintas<br/>Default: false<br/></dd>
<dt><b>-ddg_predictions_file</b> \<File\></dt>
<dd>Archivo que contiene información de ddG de mutaciones. Lo usan la operación de tarea y el filtro de ddG.<br/>Default: ""<br/></dd>
<dt><b>-input_res</b> \<ResidueChainVector\></dt>
<dd>Residuos ya presentes en el archivo inicial<br/>Default: []<br/></dd>
<dt><b>-minimize_res</b> \<IntegerVector\></dt>
<dd>Residuos que se minimizarán<br/>Default: []<br/></dd>
<dt><b>-md_schfile</b> \<String\></dt>
<dd>Nombre del archivo que contiene el calendario de MD<br/></dd>
<dt><b>-native_contacts</b> \<File\></dt>
<dd>lista de pares de contactos nativos para el cálculo de fnat/fnon-nat en docking<br/></dd>
</dl>
+ <h3>-in:rdf</h3>
<dl>
<dt><b>-rdf</b> \<Boolean\></dt>
<dd>grupo de opciones rdf<br/></dd>
<dt><b>-sep_bb_ss</b> \<Boolean\></dt>
<dd>separar las RDF por estructura secundaria para los tipos de átomo de la cadena principal <br/>Default: true<br/></dd>
</dl>
+ <h2>-inout</h2>
<dl>
<dt><b>-inout</b> \<Boolean\></dt>
<dd>grupo de opciones Ouput<br/></dd>
<dt><b>-fold_tree_io</b> \<Boolean\></dt>
<dd>Ignorar el archivo 'CHECKPOINT' y sobrescribir los archivos PDB<br/></dd>
<dt><b>-skip_connect_info</b> \<Boolean\></dt>
<dd>Si es true, no escribe la información CONECT en los archivos PDB. False por defecto (escribe registros CONECT).<br/>Default: false<br/></dd>
<dt><b>-write_all_connect_info</b> \<Boolean\></dt>
<dd>Por defecto, la información CONECT se escribe para todos los residuos no canónicos y HETATM, excepto las aguas. Si esta opción es true, se escribirá para TODOS los residuos, sujeta al corte de distancia (-inout:connect_info_cufoff) y anulada por -inout:skip_connect_info.<br/>Default: false<br/></dd>
<dt><b>-connect_info_cutoff</b> \<Real\></dt>
<dd>El corte de separación atómica por encima del cual los átomos enlazados tienen registros CONECT explícitos, para que programas como PyMOL conozcan la conectividad atómica. Valor por defecto: 0.0 Å (escribir todos los registros).<br/>Default: 0.0<br/></dd>
<dt><b>-mmtf_extra_data_io</b> \<Boolean\></dt>
<dd>Al leer o escribir mmTF, leer o escribir datos adicionales, incluidos pdb_comments, puntuaciones adicionales y SimpleMetrics<br/>Default: true<br/></dd>
<dt><b>-output_alternate_atomids</b> \<Boolean\></dt>
<dd>Usar los IDs alternativos de átomos almacenados en los archivos params cuando estén disponibles<br/>Default: false<br/></dd>
</dl>
+ <h3>-inout:dbms</h3>
<dl>
<dt><b>-dbms</b> \<Boolean\></dt>
<dd>grupo de opciones database<br/></dd>
<dt><b>-mode</b> \<String\></dt>
<dd>Qué backend usar por defecto para acceder a la base de datos. Nota: usar 'mysql' requiere compilar con 'extras=mysql' y usar 'postgres' requiere compilar con 'extras=postgres'<br/>Default: "sqlite3"<br/></dd>
<dt><b>-database_name</b> \<String\></dt>
<dd>nombre de la base de datos. En las bases de datos sqlite3 es una ruta del sistema de archivos, normalmente con la extensión '.db3'.<br/></dd>
<dt><b>-pq_schema</b> \<String\></dt>
<dd>En las bases de datos postgres, especifica el esquema por defecto de la base de datos. En una base de datos PostgreSQL, los esquemas son como espacios de nombres.<br/>Default: ""<br/></dd>
<dt><b>-host</b> \<String\></dt>
<dd>nombre de host por defecto del servidor de base de datos<br/></dd>
<dt><b>-user</b> \<String\></dt>
<dd>nombre de usuario por defecto para acceder al servidor de base de datos<br/></dd>
<dt><b>-password</b> \<String\></dt>
<dd>contraseña por defecto para acceder al servidor de base de datos<br/></dd>
<dt><b>-port</b> \<Integer\></dt>
<dd>puerto por defecto para acceder al servidor de base de datos<br/></dd>
<dt><b>-readonly</b> \<Boolean\></dt>
<dd>abrir por defecto la base de datos sqlite3 en modo de solo lectura<br/>Default: false<br/></dd>
<dt><b>-separate_db_per_mpi_process</b> \<Boolean\></dt>
<dd>En modo MPI, abre una base de datos sqlite3 aparte para cada proceso con la extensión _<mpi_rank> y escribe en ella un esquema particionado.<br/>Default: false<br/></dd>
<dt><b>-database_partition</b> \<Integer\></dt>
<dd>Abre una base de datos sqlite3 aparte con la extensión _<partition> y escribe en ella un esquema particionado.<br/>Default: -1<br/></dd>
<dt><b>-use_compact_residue_schema</b> \<Boolean\></dt>
<dd>Almacena todos los átomos de un residuo en un blob al estilo de un silent file binario. Sacrifica la capacidad de análisis a cambio de escalabilidad. Si no sabes si lo quieres, probablemente no lo quieras.<br/>Default: false<br/></dd>
<dt><b>-retry_failed_reads</b> \<Boolean\></dt>
<dd>Si falla una lectura de la base de datos por una causa desconocida, reintentar varias veces antes de rendirse<br/>Default: false<br/></dd>
<dt><b>-path</b> \<Path\></dt>
<dd>Directorio desde el que se leerá o al que se exportará la base de datos.<br/>Default: "."<br/></dd>
</dl>
+ <h2>-out</h2>
<dl>
<dt><b>-out</b> \<Boolean\></dt>
<dd>grupo de opciones Ouput<br/></dd>
<dt><b>-overwrite</b> \<Boolean\></dt>
<dd>Ignorar el archivo 'CHECKPOINT' y sobrescribir los archivos PDB y silent files<br/></dd>
<dt><b>-nstruct</b> \<Integer\></dt>
<dd>Número de veces que se procesa cada PDB de entrada<br/>Default: 1<br/></dd>
<dt><b>-shuffle_nstruct</b> \<Integer\></dt>
<dd>número total de decoys que se producirán<br/>Default: 1<br/></dd>
<dt><b>-prefix</b> \<String\></dt>
<dd>Prefijo de los nombres de las estructuras de salida, como el antiguo código -series<br/>Default: ""<br/></dd>
<dt><b>-suffix</b> \<String\></dt>
<dd>Sufijo de los nombres de las estructuras de salida<br/>Default: ""<br/></dd>
<dt><b>-mover_controlled_output_name</b> \<Boolean\></dt>
<dd>permite que el mover controle el nombre de salida<br/>Default: false<br/></dd>
<dt><b>-no_nstruct_label</b> \<Boolean\></dt>
<dd>No etiquetar la primera estructura de salida con _0001<br/>Default: false<br/></dd>
<dt><b>-pdb_gz</b> \<Boolean\></dt>
<dd>Comprimir (gzip) los PDB de salida<br/>Default: false<br/></dd>
<dt><b>-pdb</b> \<Boolean\></dt>
<dd>PDB de salida<br/>Default: false<br/></dd>
<dt><b>-silent_gz</b> \<Boolean\></dt>
<dd>Usar salida comprimida con gzip (nivel de ejecución silent)<br/>Default: false<br/></dd>
<dt><b>-membrane_pdb</b> \<Boolean\></dt>
<dd>Escribir la membrana en el PDB: activado/desactivado.<br/></dd>
<dt><b>-membrane_pdb_thickness</b> \<Real\></dt>
<dd>Grosor de la membrana escrita en el archivo PDB. Usar esta opción activa automáticamente -out:membrane_pdb. Si no se indica, se usa el valor por defecto (30) o el de la opción -mp:thickness.<br/></dd>
<dt><b>-mmCIF</b> \<Boolean\></dt>
<dd>escribir archivos mmCIF (en general, en lugar de archivos PDB)<br/>Default: false<br/></dd>
<dt><b>-mmCIF_gz</b> \<Boolean\></dt>
<dd>si se escriben archivos mmCIF, comprimirlos con gzip<br/>Default: false<br/></dd>
<dt><b>-mmtf</b> \<Boolean\></dt>
<dd>escribir archivos mmtf (en general, en lugar de archivos PDB)<br/>Default: false<br/></dd>
<dt><b>-mmtf_gz</b> \<Boolean\></dt>
<dd>si se escriben archivos mmtf, comprimirlos con gzip<br/>Default: false<br/></dd>
<dt><b>-use_database</b> \<Boolean\></dt>
<dd>Escribir las estructuras en la base de datos. Especifica la base de datos con -inout:dbms:database_name y las estructuras deseadas con -in:file:tags<br/></dd>
<dt><b>-database_protocol_id</b> \<Integer\></dt>
<dd>Especificar manualmente un ID de protocolo para la salida a la base de datos. Solo conviene usarlo en trabajos distribuidos con MPI. Es una solución temporal a una limitación del distribuidor de MPI<br/></dd>
<dt><b>-database_filter</b> \<StringVector\></dt>
<dd>Filtro que se usará con la salida a la base de datos. Los argumentos del filtro van después del nombre del filtro<br/></dd>
<dt><b>-resume_batch</b> \<IntegerVector\></dt>
<dd>Especifica uno o más IDs de lote para terminar un protocolo incompleto. Solo funciona con DatabaseJobOutputter. Los nuevos trabajos se generarán bajo un nuevo ID de protocolo y de lote<br/></dd>
<dt><b>-nooutput</b> \<Boolean\></dt>
<dd>Suprimir los archivos de salida<br/>Default: false<br/></dd>
<dt><b>-output</b> \<Boolean\></dt>
<dd>Forzar los archivos de salida<br/>Default: false<br/></dd>
<dt><b>-scorecut</b> \<Real\></dt>
<dd>Producir solo la fracción de estructuras con menor energía; por defecto 1.0, es decir, producirlas todas <br/>Default: 1.0<br/></dd>
<dt><b>-show_accessed_options</b> \<Boolean\></dt>
<dd>Al final de la ejecución, mostrar las opciones a las que se ha accedido.<br/>Default: false<br/></dd>
<dt><b>-show_unused_options</b> \<Boolean\></dt>
<dd>Al final de la ejecución, mostrar las opciones que el usuario fijó pero a las que nunca se accedió. (Ocurre automáticamente en los protocolos JD2.)<br/>Default: false<br/></dd>
<dt><b>-sf</b> \<File\></dt>
<dd>nombre de archivo para la salida de puntuaciones<br/>Default: "score.fsc"<br/></dd>
<dt><b>-mute</b> \<StringVector\></dt>
<dd>Silenciar los canales de Tracer indicados; especifica 'all' para silenciarlos todos.<br/></dd>
<dt><b>-unmute</b> \<StringVector\></dt>
<dd>Dejar de silenciar los canales de Tracer indicados; especifica 'all' para dejar de silenciarlos todos.<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>Nivel de salida de Tracer; todo lo que esté por encima se silencia. Niveles disponibles: 0 - fatal, 100 - error, 200 - warning, 300 - info, 400 - debug, 500 - trace. Para más información consulta: src/basic/Tracer.hh y la página de documentación 'Tracer, tool for debug IO'. El nivel de salida por defecto es 'info': 300<br/>Default: 300<br/></dd>
<dt><b>-levels</b> \<StringVector\></dt>
<dd>Niveles jerárquicos de silenciamiento para canales individuales, con este formato: -levels all:300 core.pose:500. Los valores numéricos se pueden sustituir por nombres de nivel como debug, info, error, etc. Ten en cuenta que all:<num> es sinónimo de -level:<num><br/></dd>
<dt><b>-no_color</b> \<Boolean\></dt>
<dd>Suprimir el uso de códigos de color de Tracer, que pueden aparecer como '^[[0m' en los archivos de registro<br/>Default: false<br/></dd>
<dt><b>-chname</b> \<Boolean\></dt>
<dd>Añadir a la salida los nombres de los canales de Tracer<br/>Default: true<br/></dd>
<dt><b>-chtimestamp</b> \<Boolean\></dt>
<dd>Añadir una marca de tiempo al nombre del canal de Tracer<br/>Default: false<br/></dd>
<dt><b>-dry_run</b> \<Boolean\></dt>
<dd>Si se activa, ComparingTracer no generará ninguna aserción y guardará toda la salida de Tracer en un archivo<br/>Default: false<br/></dd>
<dt><b>-mpi_tracer_to_file</b> \<String\></dt>
<dd>SOLO MPI: redirige toda la salida de Tracer a este archivo, con '_<mpi_rank>' añadido como sufijo<br/>Default: "tracer.out"<br/></dd>
<dt><b>-std_IO_exit_error_code</b> \<Integer\></dt>
<dd>Especifica el código de error con el que se saldrá si se detecta un error de E/S estándar. Es útil si quieres detectar situaciones como: la salida de Rosetta se redirigió a un archivo pero el disco se llenó, etc. El valor por defecto es 0, lo que significa que el código de detección de errores está desactivado.<br/>Default: 0<br/></dd>
<dt><b>-user_tag</b> \<String\></dt>
<dd>añadir esta etiqueta a las etiquetas de las estructuras: por ejemplo, un ID de proceso<br/>Default: ""<br/></dd>
<dt><b>-output_tag</b> \<String\></dt>
<dd>Poner este prefijo a los archivos de salida, si el código lo comprueba<br/>Default: ""<br/></dd>
<dt><b>-save_times</b> \<Boolean\></dt>
<dd>Guardar el tiempo de modelado de cada modelo en segundos<br/>Default: false<br/></dd>
</dl>
+ <h3>-out:file</h3>
<dl>
<dt><b>-file</b> \<Boolean\></dt>
<dd>Grupo de opciones de archivos de salida<br/></dd>
<dt><b>-o</b> \<String\></dt>
<dd>Nombre del archivo de salida<br/></dd>
<dt><b>-design_contrast</b> \<File\></dt>
<dd>escribir una lista que compara la secuencia de diseño con la secuencia nativa<br/>Default: "redesign"<br/></dd>
<dt><b>-residue_type_set</b> \<String\></dt>
<dd>ResidueTypeSet para los archivos de salida<br/>Default: "fa_standard"<br/></dd>
<dt><b>-srlz</b> \<Boolean\></dt>
<dd>escribir Poses serializados (en lugar de archivos PDB)<br/>Default: false<br/></dd>
<dt><b>-atom_tree_diff</b> \<String\></dt>
<dd>Usar salida en archivo atom_tree_diff; usa el nombre de archivo que sigue a esta opción<br/>Default: "default.out"<br/></dd>
<dt><b>-atom_tree_diff_bb</b> \<Integer\></dt>
<dd>Para la salida atom_tree_diff, cuántos dígitos de precisión usar en los diedros de la cadena principal<br/>Default: 6<br/></dd>
<dt><b>-atom_tree_diff_sc</b> \<Integer\></dt>
<dd>Para la salida atom_tree_diff, cuántos dígitos de precisión usar en los diedros de las cadenas laterales<br/>Default: 4<br/></dd>
<dt><b>-atom_tree_diff_bl</b> \<Integer\></dt>
<dd>Para la salida atom_tree_diff, cuántos dígitos de precisión usar en las longitudes de enlace<br/>Default: 2<br/></dd>
<dt><b>-alignment</b> \<String\></dt>
<dd>Archivo de salida para el alineamiento de secuencias<br/>Default: "out.align"<br/></dd>
<dt><b>-score_only</b> \<String\></dt>
<dd>Producir solo puntuaciones, sin silent files ni archivos PDB<br/>Default: "default.sc"<br/></dd>
<dt><b>-scorefile</b> \<String\></dt>
<dd>Escribir un archivo de puntuaciones con el nombre indicado<br/>Default: "default.sc"<br/></dd>
<dt><b>-scorefile_format</b> \<String\></dt>
<dd>Formato del archivo de puntuaciones: text, json<br/>Default: "text"<br/></dd>
<dt><b>-silent</b> \<String\></dt>
<dd>Usar salida en silent file; usa el nombre de archivo que sigue a esta opción<br/>Default: "default.out"<br/></dd>
<dt><b>-silent_struct_type</b> \<String\></dt>
<dd>Tipo de objeto SilentStruct que se usará en la salida de silent files<br/>Default: "protein"<br/></dd>
<dt><b>-silent_print_all_score_headers</b> \<Boolean\></dt>
<dd>Imprimir un encabezado SCORE para cada SilentStruct de un silent file<br/>Default: false<br/></dd>
<dt><b>-raw</b> \<Boolean\></dt>
<dd>Usar salida en archivo de tipo silent<br/>Default: false<br/></dd>
<dt><b>-weight_silent_scores</b> \<Boolean\></dt>
<dd>Ponderar las puntuaciones en la salida de silent files.<br/>Default: true<br/></dd>
<dt><b>-silent_preserve_H</b> \<Boolean\></dt>
<dd>Conservar los hidrógenos en el formato PDB de silent file.<br/>Default: false<br/></dd>
<dt><b>-fullatom</b> \<Boolean\></dt>
<dd>Activar la salida de todos los átomos de estructuras PDB o centroide<br/>Default: false<br/></dd>
<dt><b>-suppress_zero_occ_pdb_output</b> \<Boolean\></dt>
<dd>Suprimir la salida de átomos con ocupación cero (o negativa)<br/>Default: false<br/></dd>
<dt><b>-output_ligands_as_separate_chains</b> \<Boolean\></dt>
<dd>Define si los ligandos se escriben con IDs de cadena únicos, aunque compartan ID de cadena con alguna de las cadenas peptídicas de la estructura de entrada. El valor por defecto es false.<br/>Default: false<br/></dd>
<dt><b>-output_virtual</b> \<Boolean\></dt>
<dd>Escribir los átomos virtuales en la salida PDB<br/>Default: false<br/></dd>
<dt><b>-output_virtual_zero_occ</b> \<Boolean\></dt>
<dd>Fijar la ocupación en 0.0 para los átomos virtuales en la salida PDB<br/>Default: false<br/></dd>
<dt><b>-no_chainend_ter</b> \<Boolean\></dt>
<dd>Si es true, no se escriben registros TER al final de las cadenas en los archivos PDB, solo al final de todos los registros ATOM (el comportamiento heredado de Rosetta). False por defecto (lo que escribe registros TER al final de cada cadena).<br/>Default: false<br/></dd>
<dt><b>-no_output_cen</b> \<Boolean\></dt>
<dd>Omitir la salida de centroides<br/>Default: false<br/></dd>
<dt><b>-output_orbitals</b> \<Boolean\></dt>
<dd>Escribir todos los orbitales en el PDB.<br/>Default: false<br/></dd>
<dt><b>-renumber_pdb</b> \<Boolean\></dt>
<dd>Usar la numeración de residuos de Rosetta y etiquetas de cadena arbitrarias en la salida PDB.<br/>Default: false<br/></dd>
<dt><b>-pdb_parents</b> \<Boolean\></dt>
<dd>Si el Pose contiene un comentario llamado template, imprimirlo como REMARK en el archivo PDB<br/>Default: false<br/></dd>
<dt><b>-per_chain_renumbering</b> \<Boolean\></dt>
<dd>Usado junto con renumber_pdb, reinicia la numeración de residuos en cada cadena.<br/>Default: false<br/></dd>
<dt><b>-output_secondary_structure</b> \<Boolean\></dt>
<dd>escribir registros HELIX y SHEET en StructFileRep / PDB<br/>Default: false<br/></dd>
<dt><b>-do_not_autoassign_SS</b> \<Boolean\></dt>
<dd>Depende de -out:file:output_secondary_structure. Si se escribe la estructura secundaria y esta opción es true, NO se generará automáticamente la estructura secundaria; se asumirá que la cadena secstruct del Pose es correcta<br/>Default: false<br/></dd>
<dt><b>-output_torsions</b> \<Boolean\></dt>
<dd>Escribir las torsiones phi, psi y omega en la salida PDB si el Pose es ideal.<br/>Default: false<br/></dd>
<dt><b>-use_occurrence_data</b> \<Boolean\></dt>
<dd>si la opción es true, lee la matriz de probabilidades del archivo pssm.<br/>Default: false<br/></dd>
<dt><b>-pdb_comments</b> \<Boolean\></dt>
<dd>Si el Pose contiene algún comentario, imprimirlo como COMMENT en el archivo PDB.<br/>Default: false<br/></dd>
<dt><b>-force_nonideal_structure</b> \<Boolean\></dt>
<dd>Forzar a ResidueConformationFeatures a tratar la estructura como no ideal. Si sabes que todas tus estructuras son no ideales, esto reduce el tiempo de salida del Pose<br/>Default: true<br/></dd>
<dt><b>-set_pdb_author</b> \<String\></dt>
<dd>Fija el nombre o nombres de autor que se escribirán en la sección de título del .pdb. La lista de nombres debe estar delimitada por comas.<br/>Default: ""<br/></dd>
<dt><b>-write_pdb_title_section_records</b> \<Boolean\></dt>
<dd>Define si se escriben o no los registros de la sección de título en los archivos PDB. La sección de título incluye los registros HEADER, EXPDTA, AUTHOR y REMARK. El valor por defecto es true.<br/>Default: true<br/></dd>
<dt><b>-write_pdb_link_records</b> \<Boolean\></dt>
<dd>Define si se escriben o no los registros LINK en los archivos PDB. El valor por defecto es true.<br/>Default: true<br/></dd>
<dt><b>-use_pdb_format_HETNAM_records</b> \<Boolean\></dt>
<dd>Define si los registros HETNAM de los archivos PDB se escriben en el formato PDB estándar, con un solo registro por código de 3 letras. El valor por defecto es false, lo que significa que el archivo usará el formato de Rosetta, que proporciona un registro HETNAM único para cada residuo.<br/>Default: false<br/></dd>
<dt><b>-write_pdb_parametric_info</b> \<Boolean\></dt>
<dd>Si es true, los Poses paramétricos incluyen su información de parámetros en las líneas REMARK del archivo PDB de salida. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-write_glycan_pdb_codes</b> \<Boolean\></dt>
<dd>Si es true, los glicanos se escriben según los códigos del PDB en lugar de los nombres de Rosetta<br/>Default: false<br/></dd>
<dt><b>-write_seqres_records</b> \<Boolean\></dt>
<dd>Define si se escriben o no los registros SEQRES en los archivos PDB. El valor por defecto es false.<br/>Default: false<br/></dd>
<dt><b>-output_pose_energies_table</b> \<Boolean\></dt>
<dd>Escribir la tabla de energías del Pose. Se puede anular<br/>Default: true<br/></dd>
<dt><b>-output_pose_cache_data</b> \<Boolean\></dt>
<dd>Escribir la caché del Pose.<br/>Default: true<br/></dd>
<dt><b>-output_pose_fold_tree</b> \<Boolean\></dt>
<dd>Escribir el FoldTree del Pose. En los archivos cif irá en la columna rosetta_additional.<br/>Default: false<br/></dd>
<dt><b>-output_only_asymmetric_unit</b> \<Boolean\></dt>
<dd>En los Poses simétricos, des-simetriza el Pose antes de escribirlo para producir solo la subunidad maestra. Las energías se seguirán escribiendo como simétricas. No funciona con silent files.<br/>Default: false<br/></dd>
<dt><b>-cif_extra_data_separate_file</b> \<Boolean\></dt>
<dd>Al escribir mmCIF, escribir los datos adicionales y las energías en archivos aparte (JOBNAME.extradata y JOBNAME.eneriges)<br/>Default: false<br/></dd>
<dt><b>-dont_rewrite_dunbrack_database</b> \<Boolean\></dt>
<dd>Desactiva el comportamiento por defecto de reescribir la biblioteca de Dunrack en formato binario si no se encuentra una versión binaria<br/></dd>
<dt><b>-frag_prefix</b> \<String\></dt>
<dd>Prefijo para la salida de fragmentos<br/>Default: "default.frags"<br/></dd>
<dt><b>-no_extra_sdf_data</b> \<Boolean\></dt>
<dd>No añadir datos adicionales de ida y vuelta a la salida de archivos SDF<br/>Default: false<br/></dd>
<dt><b>-no_scores_in_pdb</b> \<Boolean\></dt>
<dd>Opción obsoleta. Consulta -output_pose_energies_table y -output_pose_cache_data<br/></dd>
</dl>
+ <h3>-out:path</h3>
<dl>
<dt><b>-all</b> \<Path\></dt>
<dd>Ruta de salida de archivos por defecto<br/>Default: "."<br/></dd>
<dt><b>-path</b> \<Path\></dt>
<dd>Ruta de salida de archivos por defecto<br/>Default: "."<br/></dd>
<dt><b>-pdb</b> \<Path\></dt>
<dd>Ruta de salida de archivos PDB<br/></dd>
<dt><b>-db</b> \<Path\></dt>
<dd>Ruta de salida de archivos de la base de datos si se usan FeatureReporters o la salida a base de datos<br/>Default: "."<br/></dd>
<dt><b>-score</b> \<Path\></dt>
<dd>Ruta de salida de archivos de puntuaciones<br/></dd>
<dt><b>-scratch</b> \<Path\></dt>
<dd>usar esta ruta como disco temporal<br/>Default: ['"/scratch/USERS/"']<br/></dd>
<dt><b>-mpi_rank_dir</b> \<Boolean\></dt>
<dd>Poner los archivos de salida silent en directorios individuales según el rango de MPI<br/>Default: false<br/></dd>
<dt><b>-mmCIF</b> \<Path\></dt>
<dd>si se escriben mmCIF, ruta de salida de los archivos mmCIF<br/></dd>
<dt><b>-mmtf</b> \<Path\></dt>
<dd>ruta de salida de los archivos mmtf<br/></dd>
</dl>
+ <h2>-run</h2>
<dl>
<dt><b>-run</b> \<Boolean\></dt>
<dd>grupo de opciones Run<br/></dd>
<dt><b>-batches</b> \<FileVector\></dt>
<dd>batch_flag_files<br/>Default: ""<br/></dd>
<dt><b>-no_prof_info_in_silentout</b> \<Boolean\></dt>
<dd>no aparecen columnas de tiempo en los archivos de puntuaciones ni en los silent files<br/>Default: false<br/></dd>
<dt><b>-archive</b> \<Boolean\></dt>
<dd>ejecutar MPIArchiveJobDistributor<br/>Default: false<br/></dd>
<dt><b>-n_replica</b> \<Integer\></dt>
<dd>ejecutar MPIMultiCommJobDistributor con n_replica procesos por trabajo<br/>Default: 1<br/></dd>
<dt><b>-shuffle</b> \<Boolean\></dt>
<dd>Barajar el orden de los trabajos<br/>Default: false<br/></dd>
<dt><b>-n_cycles</b> \<Integer\></dt>
<dd>Opción para controlar ciclos varios dentro de los protocolos. No tiene un significado central: busca reducir la proliferación de opciones evitando que cada protocolo defina opciones de ciclos propias. Consulta la documentación de tu protocolo para ver si se usa.<br/>Rango: 1-<br/>Default: 1<br/></dd>
<dt><b>-repeat</b> \<Integer\></dt>
<dd>Repetir el mover N veces<br/>Rango: 0-<br/>Default: 1<br/></dd>
<dt><b>-max_min_iter</b> \<Integer\></dt>
<dd>Número máximo de iteraciones de dfpmin<br/>Default: 200<br/></dd>
<dt><b>-maxruntime</b> \<Integer\></dt>
<dd>Tiempo de ejecución máximo en segundos. JobDistributor indicará el fin si se supera el tiempo, sin importar cuántos trabajos se hayan terminado.<br/>Default: -1<br/></dd>
<dt><b>-maxruntime_bufferfactor</b> \<Real\></dt>
<dd>Si se activa, JobDistributor intentará detenerse si no parece haber tiempo suficiente para `maxruntime_bufferfactor` trabajos antes de que llegue maxruntime.<br/>Default: 0<br/></dd>
<dt><b>-write_failures</b> \<Boolean\></dt>
<dd>escribir en la salida las estructuras fallidas<br/>Default: false<br/></dd>
<dt><b>-benchmark</b> \<Boolean\></dt>
<dd>Ejecutar en modo benchmark<br/></dd>
<dt><b>-test_cycles</b> \<Boolean\></dt>
<dd>Al ejecutar pruebas, usar ciclos reducidos. Los ciclos deben estar definidos en el propio código<br/>Default: false<br/></dd>
<dt><b>-memory_test_cycles</b> \<Boolean\></dt>
<dd>usar junto con test_cycles para mantener el número de copias de cualquier cosa tan alto como en modo de producción<br/>Default: false<br/></dd>
<dt><b>-dry_run</b> \<Boolean\></dt>
<dd>Recorrer estructuras/tareas/etc. omitiendo el paso de cálculo real, para probar la E/S o la configuración<br/>Default: false<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>Ejecutar en modo de depuración<br/></dd>
<dt><b>-profile</b> \<Boolean\></dt>
<dd>Ejecutar en modo de perfilado<br/>Default: false<br/></dd>
<dt><b>-max_retry_job</b> \<Integer\></dt>
<dd>Si un trabajo falla con FAIL_RETRY, reintentar como máximo este número de veces<br/>Default: 10<br/></dd>
<dt><b>-version</b> \<Boolean\></dt>
<dd>escribir información detallada de la versión, si estaba disponible al compilar<br/>Default: false<br/></dd>
<dt><b>-nodelay</b> \<Boolean\></dt>
<dd>No retrasar el lanzamiento de minirosetta<br/></dd>
<dt><b>-delay</b> \<Integer\></dt>
<dd>Esperar N segundos antes de hacer nada. Útil para escalonar trabajos en un clúster.<br/>Default: 0<br/></dd>
<dt><b>-random_delay</b> \<Integer\></dt>
<dd>Esperar una cantidad aleatoria de 0..N segundos antes de hacer nada. Útil para escalonar trabajos en un clúster.<br/>Default: 0<br/></dd>
<dt><b>-timer</b> \<Boolean\></dt>
<dd>escribir en el archivo de puntuaciones el tiempo por decoy en minutos<br/></dd>
<dt><b>-chain</b> \<String\></dt>
<dd>-chain <chain_id><br/>Default: "-"<br/></dd>
<dt><b>-score_only</b> \<Boolean\></dt>
<dd>calcular solo la puntuación y salir<br/>Default: false<br/></dd>
<dt><b>-decoystats</b> \<Boolean\></dt>
<dd>calcular los valores de una serie de propiedades estructurales adicionales, incluido el recuento de donadores y aceptores de enlaces de hidrógeno enterrados no satisfechos, SASApack, etc. La salida adicional asociada a esta opción se escribe tanto en stdout como en los archivos PDB de salida<br/></dd>
<dt><b>-output_hbond_info</b> \<Boolean\></dt>
<dd>imprimir información de enlaces de hidrógeno en la sección de estadísticas de los archivos PDB escritos<br/></dd>
<dt><b>-wide_nblist_extension</b> \<Real\></dt>
<dd>Cantidad en que se extiende la lista de vecinos ancha<br/>Default: 2.0<br/></dd>
<dt><b>-constant_seed</b> \<Boolean\></dt>
<dd>Usar una semilla constante (1111111 salvo que se indique otra)<br/></dd>
<dt><b>-jran</b> \<Integer\></dt>
<dd>Especificar la semilla (requiere -constant_seed)<br/>Default: 1111111<br/></dd>
<dt><b>-use_time_as_seed</b> \<Boolean\></dt>
<dd>Usar la hora como semilla de números aleatorios en lugar del dispositivo de semilla por defecto del generador.<br/></dd>
<dt><b>-rng_seed_device</b> \<String\></dt>
<dd>Obtener la semilla de números aleatorios del dispositivo indicado.<br/>Default: "/dev/urandom"<br/></dd>
<dt><b>-seed_offset</b> \<Integer\></dt>
<dd>Este valor se sumará a la semilla de números aleatorios. Útil cuando se usa la hora como semilla 			y se envían muchos trabajos a clústeres. Usar el ID de trabajo de condor obliga a que los trabajos iniciados en el mismo segundo tengan semillas iniciales distintas<br/>Default: 0<br/></dd>
<dt><b>-rng</b> \<String\></dt>
<dd>Algoritmo de generación de números aleatorios: por ahora solo se acepta mt19937<br/>Default: "mt19937"<br/></dd>
<dt><b>-rebuild_disulf</b> \<Boolean\></dt>
<dd>Intentar construir una geometría correcta de los puentes disulfuro al convertir un Pose centroide en un Pose de todos los átomos. Los puentes disulfuro deben estar anotados previamente, ya sea activando -detect_disulf o especificando un archivo en -fix_disulf.<br/>Default: false<br/></dd>
<dt><b>-preserve_header</b> \<Boolean\></dt>
<dd>Mantener la información de encabezado del PDB de entrada al escribir los PDB de salida<br/>Default: false<br/></dd>
<dt><b>-suppress_checkpoints</b> \<Boolean\></dt>
<dd>Anular y desactivar los puntos de control.<br/></dd>
<dt><b>-checkpoint</b> \<Boolean\></dt>
<dd>Activar los puntos de control<br/></dd>
<dt><b>-delete_checkpoints</b> \<Boolean\></dt>
<dd>borrar los puntos de control después de usarlos<br/>Default: true<br/></dd>
<dt><b>-checkpoint_interval</b> \<Integer\></dt>
<dd>Intervalo de tiempo entre puntos de control en segundos<br/>Rango: 10-<br/>Default: 600<br/></dd>
<dt><b>-protocol</b> \<String\></dt>
<dd>Qué protocolo ejecutar, para el envoltorio de Rosetta@home<br/>Default: "abrelax"<br/></dd>
<dt><b>-remove_ss_length_screen</b> \<Boolean\></dt>
<dd>Pone en false la opción use_ss_length_screen del Fragment Mover<br/></dd>
<dt><b>-min_type</b> \<String\></dt>
<dd>tipo de minimizador que se usará<br/>Default: "lbfgs_armijo_nonmonotone"<br/></dd>
<dt><b>-min_tolerance</b> \<Real\></dt>
<dd>tolerancia del minimizador<br/>Default: 0.000001<br/></dd>
<dt><b>-nblist_autoupdate</b> \<Boolean\></dt>
<dd>Activar la actualización automática de la lista de vecinos en todas las minimizaciones<br/>Default: false<br/></dd>
<dt><b>-nblist_autoupdate_narrow</b> \<Real\></dt>
<dd>Con la actualización automática de nblist: el alcance en Å de la lista de vecinos estrecha<br/>Default: 0.5<br/></dd>
<dt><b>-nblist_autoupdate_wide</b> \<Real\></dt>
<dd>Con la actualización automática de nblist: el alcance en Å de la lista de vecinos ancha<br/>Default: 2.0<br/></dd>
<dt><b>-skip_set_reasonable_fold_tree</b> \<Boolean\></dt>
<dd>No ejecutar set_reasonable_fold_tree al crear un Pose a partir de un PDB. Útil para PDB poco razonables en los que el usuario fija el FoldTree explícitamente.<br/>Default: false<br/></dd>
<dt><b>-randomize_missing_coords</b> \<Boolean\></dt>
<dd>Insertar coordenadas aleatorias para los átomos con densidad ausente (ocupación cero) y para cualquier átomo con ocupación negativa; la aleatorización de coordenadas se hace por defecto<br/>Default: false<br/></dd>
<dt><b>-ignore_zero_occupancy</b> \<Boolean\></dt>
<dd>descartar la información de coordenadas de los átomos con densidad ausente (ocupación cero) definidos en las estructuras de entrada. Por defecto se conservan esas coordenadas, porque es un problema recurrente para los usuarios<br/>Default: true<br/></dd>
<dt><b>-cycles_outer</b> \<Integer\></dt>
<dd>número de ciclos externos<br/>Rango: 1-<br/>Default: 1<br/></dd>
<dt><b>-cycles_inner</b> \<Integer\></dt>
<dd>número de ciclos internos<br/>Rango: 1-<br/>Default: 1<br/></dd>
<dt><b>-repack_rate</b> \<Integer\></dt>
<dd>reempaquetar cada [valor] ciclos durante ciertos protocolos<br/>Rango: 1-<br/>Default: 10<br/></dd>
<dt><b>-reinitialize_mover_for_each_job</b> \<Boolean\></dt>
<dd>el distribuidor de trabajos generará una copia nueva de su mover antes de cada apply (una vez por trabajo)<br/>Default: false<br/></dd>
<dt><b>-reinitialize_mover_for_new_input</b> \<Boolean\></dt>
<dd>el distribuidor de trabajos generará una copia nueva de su mover cada vez que el Pose que se pasa al mover vaya a cambiar (p. ej., el siguiente PDB de -l)<br/>Default: false<br/></dd>
<dt><b>-multiple_processes_writing_to_one_directory</b> \<Boolean\></dt>
<dd>activa los archivos .in_progress que se usan para comunicar entre procesos independientes que un trabajo está en curso. NO ES SEGURO, pero puede ser cómodo.<br/>Default: false<br/></dd>
<dt><b>-jobdist_miscfile_ext</b> \<String\></dt>
<dd>extensión para la función file() de JobOutputter (salida de archivos varios).<br/>Default: ".data"<br/></dd>
<dt><b>-no_scorefile</b> \<Boolean\></dt>
<dd>no escribir archivos de puntuaciones<br/>Default: false<br/></dd>
<dt><b>-other_pose_to_scorefile</b> \<Boolean\></dt>
<dd>escribir other_pose (JobOutputter) en un archivo de puntuaciones; la ruta se indica con other_pose_scorefile; ten cuidado: puedes obtener basura si las funciones de puntuación de los Poses no coinciden. Anulada por no_scorefile<br/>Default: false<br/></dd>
<dt><b>-other_pose_scorefile</b> \<File\></dt>
<dd>Ruta a los archivos de puntuaciones de other_pose (JobOutputter). Por defecto es el mismo archivo de puntuaciones que el de los Poses de resultado normales. El valor por defecto causará problemas si tus Poses de salida se puntuaron con funciones de puntuación distintas.<br/>Default: ""<br/></dd>
<dt><b>-intermediate_scorefiles</b> \<Boolean\></dt>
<dd>escribir evaluaciones intermedias en disco (que ocurra y con qué frecuencia depende de tu protocolo)<br/>Default: false<br/></dd>
<dt><b>-intermediate_structures</b> \<Boolean\></dt>
<dd>escribir las estructuras junto con las evaluaciones intermedias<br/>Default: false<br/></dd>
<dt><b>-idealize_before_protocol</b> \<Boolean\></dt>
<dd>ejecutar idealize primero, antes de lo que sea que se ejecute.<br/></dd>
<dt><b>-interactive</b> \<Boolean\></dt>
<dd>Indica que Rosetta se ejecuta como biblioteca en una aplicación interactiva. En particular, ante entradas incorrectas se prefiere lanzar excepciones en lugar de salir.<br/>Default: false<br/></dd>
<dt><b>-nosignal</b> \<Boolean\></dt>
<dd>No instalar el manejador de señales que captura los segfaults, etc. en el reporte de fallos. Útil para ejecutar bajo un depurador.<br/>Default: false<br/></dd>
<dt><b>-crash_to_console</b> \<Boolean\></dt>
<dd>Mostrar el backtrace en la consola/tracer además del archivo del reporte de fallos.<br/>Default: false<br/></dd>
<dt><b>-condor</b> \<Boolean\></dt>
<dd>si es condor, indicar que sí: el conteo de proc_id empieza en 0<br/>Default: false<br/></dd>
<dt><b>-nproc</b> \<Integer\></dt>
<dd>número de procesos... necesario si se especifica proc_id<br/>Default: 0<br/></dd>
<dt><b>-proc_id</b> \<Integer\></dt>
<dd>indicar el número de proceso... JobDistributor solo trabajará en la parte del trabajo correspondiente a proc_id mod nproc <br/>Default: 0<br/></dd>
<dt><b>-exit_if_missing_heavy_atoms</b> \<Boolean\></dt>
<dd>salir si faltan átomos pesados en el PDB<br/>Default: false<br/></dd>
<dt><b>-show_simulation_in_pymol</b> \<Real\></dt>
<dd>Conectar un observador de PyMOL al Pose al inicio de la simulación. Espera al menos [argumento] segundos antes de enviar el Pose si algo ha cambiado; por defecto 5. ¡Un valor de 0 indica no omitir ningún paquete en el envío! No olvides ejecutar el script PyMOLPyRosettaServer.py dentro de PyMOL.<br/>Default: 5.0<br/></dd>
<dt><b>-update_pymol_on_energy_changes_only</b> \<Boolean\></dt>
<dd>Actualizar la simulación solo cuando cambie la energía. Útil si el observador de PyMOL da segfault con los cambios de longitud.<br/>Default: false<br/></dd>
<dt><b>-update_pymol_on_conformation_changes_only</b> \<Boolean\></dt>
<dd>Actualizar la simulación en PyMOL solo cuando cambie la conformación.<br/>Default: false<br/></dd>
<dt><b>-keep_pymol_simulation_history</b> \<Boolean\></dt>
<dd>¿Conservar el historial al usar la opción show_simulation_in_pymol?<br/>Default: false<br/></dd>
</dl>
+ <h3>-run:PyMOLMover</h3>
<dl>
<dt><b>-PyMOLMover</b> \<Boolean\></dt>
<dd>grupo de opciones PyMOLMover<br/></dd>
<dt><b>-address</b> \<String\></dt>
<dd>Dirección de puerto TCP que se usará al inicializar PyMOLMover<br/>Default: ""<br/></dd>
<dt><b>-port</b> \<Integer\></dt>
<dd>Puerto TCP que se usará al inicializar PyMOLMover<br/>Default: 0<br/></dd>
<dt><b>-max_packet_size</b> \<Integer\></dt>
<dd>Tamaño máximo del paquete que se envía a PyMOL. El valor por defecto depende de la dirección: para 127.0.0.1 será 7678 y para cualquier otra dirección, 1500.<br/>Default: 0<br/></dd>
</dl>
+ <h2>-parser</h2>
<dl>
<dt><b>-parser</b> \<Boolean\></dt>
<dd>grupo de opciones parser<br/></dd>
<dt><b>-protocol</b> \<String\></dt>
<dd>El protocolo que se va a ejecutar. (Archivo XML de entrada<br/></dd>
<dt><b>-script_vars</b> \<StringVector\></dt>
<dd>Sustituciones de variables para el analizador de XML, con la forma nombre=valor<br/></dd>
<dt><b>-view</b> \<Boolean\></dt>
<dd>¿Usar el visor?<br/></dd>
<dt><b>-info</b> \<StringVector\></dt>
<dd>Hace que la aplicación rosetta_scripts imprima las opciones accesibles por XML de un mover, filtro, operación de tarea o selector de residuos dado, y luego salga.<br/></dd>
<dt><b>-output_schema</b> \<String\></dt>
<dd>Hace que la aplicación rosetta_scripts escriba su esquema XML en el archivo indicado y luego salga.<br/></dd>
<dt><b>-validate_and_exit</b> \<Boolean\></dt>
<dd>Salir una vez terminada la validación del esquema XML<br/></dd>
<dt><b>-never_rerun_filters</b> \<Boolean\></dt>
<dd>Interpretar todos los elementos <Add filter=foo/> como <Add filter=foo never_rerun_filter=true/> en rosetta_scripts. Los filtros se ejecutan una sola vez, al momento del apply.<br/>Default: false<br/></dd>
<dt><b>-patchdock</b> \<String\></dt>
<dd>Nombre del archivo de salida de Patchdock.<br/></dd>
<dt><b>-patchdock_random_entry</b> \<IntegerVector\></dt>
<dd>Elegir una entrada de Patchdock al azar entre dos números de entrada, inclusive<br/></dd>
<dt><b>-inclusion_recursion_limit</b> \<Integer\></dt>
<dd>Cuántas recursiones realizar al analizar un archivo XML con inclusiones<br/>Default: 8<br/></dd>
</dl>
+ <h2>-jd3</h2>
<dl>
<dt><b>-jd3</b> \<Boolean\></dt>
<dd>grupo de opciones jd3<br/></dd>
<dt><b>-mpi_work_partition_job_distributor</b> \<Boolean\></dt>
<dd>determinar si se debe usar el distribuidor de trabajos WorkPartition<br/>Default: false<br/></dd>
<dt><b>-job_definition_schema</b> \<File\></dt>
<dd>Si se indica en la línea de comandos, el distribuidor de trabajos escribirá en disco el esquema XML del archivo de definición de trabajos de la aplicación y luego saldrá<br/></dd>
<dt><b>-mpi_fast_nonblocking_output</b> \<Boolean\></dt>
<dd>Por defecto, el nodo maestro se bloquea mientras un nodo esclavo escribe su salida, para evitar que dos esclavos escriban a la vez en un archivo de puntuaciones o en un silent file; si pones esto en true, esa función se desactiva<br/>Default: false<br/></dd>
<dt><b>-n_archive_nodes</b> \<Integer\></dt>
<dd>El número de nodos que deben desempeñar solo funciones de archivo. Esta opción solo la usa MPIWorkPoolJobDistributor<br/>Default: 0<br/></dd>
<dt><b>-do_not_archive_on_node0</b> \<Boolean\></dt>
<dd>¿Debe el nodo maestro de MPIWorkPoolJobDistributor archivar JobResults? Solo es relevante en compilaciones MPI al usar -n_archive_nodes<br/>Default: false<br/></dd>
<dt><b>-mpi_fraction_outputters</b> \<Real\></dt>
<dd>Fracción de los nodos MPI que node0 puede usar para escribir los resultados de los trabajos; los nodos que no son de archivo y que escriben resultados también harán trabajo normal además de su trabajo de salida. Esta opción debe estar entre 0 y 1. Ten en cuenta que node0 nunca escribe resultados, así que, incluso si esto se pone en 0, un nodo se designará como nodo de salida.<br/>Default: 0.01<br/></dd>
<dt><b>-nthreads</b> \<Integer\></dt>
<dd>En el distribuidor de trabajos multihilo, cuántos hilos se ejecutan al mismo tiempo<br/></dd>
<dt><b>-archive_on_disk</b> \<String\></dt>
<dd>A veces los resultados de los trabajos usan muchísima memoria. Esta opción le indica a Rosetta que almacene los resultados de los trabajos en disco en lugar de en memoria. La cadena que pases aquí debe ser el nombre de un directorio (de preferencia vacío) donde podamos poner todos nuestros archivos temporales. Puedes borrar este directorio y todo su contenido cuando Rosetta termine de ejecutarse.<br/>Default: "null"<br/></dd>
<dt><b>-compress_job_results</b> \<Boolean\></dt>
<dd>A veces los resultados de los trabajos usan muchísima memoria. Esta opción le indica a Rosetta que comprima todos los resultados de los trabajos para que usen menos memoria.<br/>Default: true<br/></dd>
<dt><b>-resource_definition_files</b> \<FileVector\></dt>
<dd>Especificar todos los recursos disponibles para los trabajos en ejecución.<br/></dd>
<dt><b>-resource_definition_schema</b> \<File\></dt>
<dd>Si se indica en la línea de comandos, el distribuidor de trabajos escribirá en disco el esquema XML del archivo de definición de recursos de la aplicación y luego saldrá<br/></dd>
<dt><b>-load_input_poses_only_once</b> \<Boolean\></dt>
<dd>Si el mismo Pose se usa como entrada de varios trabajos (lo que solo puede ocurrir cuando se proporciona un archivo de definición de trabajos, pero los Poses de entrada vienen de la línea de comandos), conserva esos Poses de entrada en memoria hasta que no se vayan a usar en ningún trabajo futuro. Esto implica necesariamente un mayor uso de memoria y probablemente no sea deseable si el número de trabajos es grande.<br/></dd>
<dt><b>-checkpoint</b> \<Boolean\></dt>
<dd>¿Debemos guardar puntos de control del progreso de los trabajos? Usa los valores por defecto de checkpoint_period y checkpoint_directory<br/></dd>
<dt><b>-checkpoint_period</b> \<Integer\></dt>
<dd>El número aproximado de minutos entre puntos de control. Si el usuario indica esta opción, se guardarán puntos de control aunque la opción -checkpoint no esté en la línea de comandos.<br/>Default: 30<br/></dd>
<dt><b>-checkpoint_directory</b> \<String\></dt>
<dd>¿En qué directorio se deben escribir los puntos de control? Si el usuario indica esta opción, se guardarán puntos de control aunque la opción -checkpoint no esté en la línea de comandos.<br/>Default: "checkpoints"<br/></dd>
<dt><b>-restore_from_checkpoint</b> \<Boolean\></dt>
<dd>¿Debe usarse el contenido del directorio de puntos de control para reiniciar un trabajo ejecutado anteriormente que se interrumpió antes de completarse? Si esta opción no está en la línea de comandos al intentar volver a ejecutar un trabajo previo interrumpido, Rosetta no intentará restaurar el trabajo desde el archivo de punto de control. Esto protege contra restaurar por accidente desde un punto de control generado por otra ejecución del código.<br/></dd>
<dt><b>-continue_past_failed_checkpoint_restoration</b> \<Boolean\></dt>
<dd>¿Debemos seguir adelante aunque no se haya podido restaurar desde un punto de control como se pidió? Úsalo si te parece bien la posibilidad de empezar de nuevo desde el principio, o si esperas relanzar el trabajo varias veces y quieres usar simplemente la misma línea de comandos cada vez, incluida la primera vez que lanzas el trabajo, cuando aún no hay puntos de control desde los que restaurar.<br/></dd>
<dt><b>-keep_all_checkpoints</b> \<Boolean\></dt>
<dd>Permitir que se acumulen en disco los puntos de control antiguos. No se puede combinar con -archive_on_disk. Usar esta opción podría consumir mucho espacio en disco sin necesidad. Si esta opción no está en la línea de comandos, los puntos de control creados anteriormente se borrarán cuando se creen los siguientes. Ten en cuenta que, por defecto, el distribuidor de trabajos borra el punto de control anterior después de escribir el siguiente en disco.<br/></dd>
<dt><b>-keep_checkpoint</b> \<Integer\></dt>
<dd>Evitar que JobDistributor borre un punto de control concreto; quizá sea útil si intentas depurar un evento poco frecuente y quieres reiniciar repetidamente desde un punto de control determinado sin preocuparte de que JobDistributor borre tu punto de partida.<br/></dd>
<dt><b>-job_definition_script_vars</b> \<StringVector\></dt>
<dd>Sustituciones de variables para el analizador de XML, con la forma nombre=valor<br/></dd>
</dl>
+ <h2>-jd2</h2>
<dl>
<dt><b>-jd2</b> \<Boolean\></dt>
<dd>grupo de opciones jd2<br/></dd>
<dt><b>-pose_input_stream</b> \<Boolean\></dt>
<dd>Usar clases PoseInputStream para la entrada de Poses<br/>Default: false<br/></dd>
<dt><b>-lazy_silent_file_reader</b> \<Boolean\></dt>
<dd>usar el lector perezoso de silent files en el distribuidor de trabajos, leyendo una estructura solo cuando se necesita<br/>Default: false<br/></dd>
<dt><b>-mpi_nowait_for_remaining_jobs</b> \<Boolean\></dt>
<dd>salir de inmediato (sin elegancia, sin completar) si ya se envió el último trabajo<br/>Default: false<br/></dd>
<dt><b>-mpi_timeout_factor</b> \<Real\></dt>
<dd>el tiempo de espera es X veces el tiempo promedio de finalización de un trabajo; pon 0 para desactivarlo<br/>Default: 0<br/></dd>
<dt><b>-mpi_work_partition_job_distributor</b> \<Boolean\></dt>
<dd>determinar si se debe usar el distribuidor de trabajos WorkPartition<br/>Default: false<br/></dd>
<dt><b>-mpi_file_buf_job_distributor</b> \<Boolean\></dt>
<dd>determinar si se debe usar MPIFileBufJobDistributor (advertencia: solo salida silent)<br/>Default: true<br/></dd>
<dt><b>-mpi_filebuf_jobdistributor</b> \<Boolean\></dt>
<dd>igual que mpi_file_buf_job_distributor pero con un espaciado más intuitivo... determinar si se debe usar MPIFileBufJobDistributor (advertencia: solo salida silent)<br/>Default: true<br/></dd>
<dt><b>-mpi_fast_nonblocking_output</b> \<Boolean\></dt>
<dd>Por defecto, el nodo maestro se bloquea mientras un nodo esclavo escribe su salida, para evitar que dos esclavos escriban a la vez en un archivo de puntuaciones o en un silent file; si pones esto en true, esa función se desactiva<br/>Default: false<br/></dd>
<dt><b>-input_empty_pose</b> \<Boolean\></dt>
<dd>Dar un Pose vacío al distribuidor de trabajos.<br/>Default: false<br/></dd>
<dt><b>-dd_parser</b> \<Boolean\></dt>
<dd>determinar si se debe usar dock_design_parser<br/>Default: false<br/></dd>
<dt><b>-ntrials</b> \<Integer\></dt>
<dd>número de intentos de crear un archivo de salida por cada nstruct. Por ejemplo, ntrials 3 y nstruct 10 significaría que cada una de las 10 trayectorias intentaría escribir un archivo de salida 3 veces y, si no lo logra, fallaría.<br/>Default: 1<br/></dd>
<dt><b>-generic_job_name</b> \<String\></dt>
<dd>nombre del trabajo al usar GenericJobInputter (es decir, abinitio)<br/>Default: "S"<br/></dd>
<dt><b>-no_output</b> \<Boolean\></dt>
<dd>usar NoOutputJobOutputter; no guardar el Pose tras una ejecución (sin silent file ni archivo de puntuaciones)<br/>Default: false<br/></dd>
<dt><b>-enzdes_out</b> \<Boolean\></dt>
<dd>hace que se escriba un archivo de puntuaciones al estilo enzdes (con información sobre los residuos catalíticos y algunas métricas del Pose) en lugar del archivo de puntuaciones normal<br/>Default: false<br/></dd>
<dt><b>-buffer_silent_output</b> \<Integer\></dt>
<dd>escribir las estructuras en silent files en bloques de N estructuras<br/>Default: 1<br/></dd>
<dt><b>-buffer_flush_frequency</b> \<Real\></dt>
<dd>cuando se reúnen N estructuras (buffer_silent_output), volcarlas al archivo con probabilidad X<br/>Default: 1.0<br/></dd>
<dt><b>-delete_old_poses</b> \<Boolean\></dt>
<dd>Eliminar los Poses después de procesarlos. En trabajos que procesan muchas estructuras, la memoria que ocupan los Poses antiguos se desperdicia. True por defecto, ya que no hay una buena razón para perder memoria de hecho.<br/>Default: true<br/></dd>
<dt><b>-checkpoint_file</b> \<File\></dt>
<dd>escribir/leer archivos de punto de control basados en nstruct en el nombre de archivo indicado.<br/></dd>
<dt><b>-failed_job_exception</b> \<Boolean\></dt>
<dd>Si JD2 encuentra un error durante la ejecución de un trabajo, lanzar una excepción al final de la ejecución<br/>Default: true<br/></dd>
<dt><b>-max_nstruct_in_memory</b> \<Integer\></dt>
<dd>Si nstruct se fija por encima de este número, JD2 conservará en memoria solo esta cantidad de trabajos en la lista de trabajos en cada momento (para evitar que la lista llene la memoria). A medida que los trabajos se completan, se eliminan y la lista se rellena con trabajos nuevos. Esta opción está pensada para ejecuciones extremadamente grandes en sistemas como el supercomputador Blue Gene/Q. Para desactivar este tipo de gestión de memoria, pon esta opción en 0.<br/>Default: 1000000<br/></dd>
<dt><b>-sequential_mpi_job_distribution</b> \<Boolean\></dt>
<dd>Si se especifica, las versiones MPI de JobDistributor envían trabajos a cada esclavo en secuencia (esclavo1, esclavo2, esclavo3, etc.). False por defecto. Ten en cuenta que NO debe usarse en ejecuciones de producción; está pensado solo para pruebas de regresión en las que una distribución de trabajos no secuencial produciría variaciones estocásticas.<br/>Default: false<br/></dd>
<dt><b>-grid_ensemble</b> \<Boolean\></dt>
<dd>Realizar una búsqueda por conjuntos (ensemble) en la que cada PDB de entrada se usa para una búsqueda basada en el conjunto. En lugar de que cada archivo de entrada produzca nstruct estructuras, se usan los archivos de entrada para generar un total de nstruct entre todas las entradas<br/>Default: false<br/></dd>
<dt><b>-seed_ensemble</b> \<Boolean\></dt>
<dd>Realizar una búsqueda por conjuntos como en grid_search, pero eligiendo las semillas al azar entre las entradas. Consulta seed_ensemble_weights para ponderar las entradas<br/>Default: false<br/></dd>
<dt><b>-seed_ensemble_weights</b> \<RealVector\></dt>
<dd>Especifica los pesos del conjunto con semillas. Debe coincidir con el número de entradas. Consulta también: -seed_ensemble_weights_file<br/></dd>
<dt><b>-seed_ensemble_weights_file</b> \<File\></dt>
<dd>Un archivo que especifica los pesos que se usarán para cada estructura de entrada. Dos columnas: nombre base con extensión (o ruta relativa o ruta completa), peso<br/></dd>
<dt><b>-HOSTNAME_in_jobname</b> \<Boolean\></dt>
<dd>Antepone a los trabajos la variable de entorno $HOSTNAME; útil para saber de qué servidor proviene un trabajo. Al ejecutar en pods de k8s, hace que los trabajos sean distintos si todos son _0001<br/></dd>
<dt><b>-parse_script_once_only</b> \<Boolean\></dt>
<dd>¿Omitir el nuevo análisis del XML para cada entrada y usar los movers tal como están? Algunos movers podrían no funcionar correctamente con esto activado.<br/>Default: false<br/></dd>
</dl>
+ <h2>-view</h2>
<dl>
<dt><b>-view</b> \<Boolean\></dt>
<dd>grupo de opciones view<br/></dd>
<dt><b>-show_virtual_residues</b> \<Boolean\></dt>
<dd>¿Mostrar residuos virtuales?<br/>Default: true<br/></dd>
<dt><b>-single_glycan_color</b> \<Boolean\></dt>
<dd>Mostrar los glicanos de un solo color en lugar del color por defecto<br/>Default: true<br/></dd>
</dl>
+ <h2>-score</h2>
<dl>
<dt><b>-score_pose_cutpoint_variants</b> \<Boolean\></dt>
<dd>Incluir variantes de cutpoint en el Pose durante el chainbreak lineal<br/>Default: false<br/></dd>
<dt><b>-score</b> \<Boolean\></dt>
<dd>grupo de opciones scorefunction<br/></dd>
<dt><b>-lowres_weights</b> \<String\></dt>
<dd>Nombre del archivo de pesos de baja resolución (sin la extensión .wts)<br/>Default: "interchain_cen"<br/></dd>
<dt><b>-weights</b> \<String\></dt>
<dd>Nombre del archivo de pesos (sin la extensión .wts)<br/>Default: "ref2015"<br/></dd>
<dt><b>-set_weights</b> \<StringVector\></dt>
<dd>Modificación de los pesos desde la línea de comandos. Se aplica en ScoreFunctionFactory::create_score_function, dentro de la función apply_user_defined_reweighting_. Formato: una lista de cadenas por pares: -score::set_weights <score_type1> <setting1> <score_type2> <setting2> ...<br/></dd>
<dt><b>-pack_weights</b> \<String\></dt>
<dd>Nombre del archivo de pesos de empaquetado (sin la extensión .wts)<br/>Default: "ref2015"<br/></dd>
<dt><b>-soft_wts</b> \<String\></dt>
<dd>Nombre del archivo de pesos «soft», para los protocolos que lo usan.<br/>Default: "soft_rep"<br/></dd>
<dt><b>-docking_interface_score</b> \<Boolean\></dt>
<dd>la puntuación se calcula como la diferencia entre el Pose unido y el no unido<br/>Default: false<br/></dd>
<dt><b>-min_score_score</b> \<Real\></dt>
<dd>no considerar puntuaciones inferiores a min-score en el criterio de Monte Carlo<br/>Default: 0.0<br/></dd>
<dt><b>-custom_atom_pair</b> \<String\></dt>
<dd>nombre de archivo para restricciones personalizadas de pares de átomos<br/>Default: "empty"<br/></dd>
<dt><b>-patch</b> \<FileVector\></dt>
<dd>Nombre del archivo de parche (sin extensión)<br/>Default: ""<br/></dd>
<dt><b>-empty</b> \<Boolean\></dt>
<dd>Hacer una puntuación vacía, es decir, SIN puntuación<br/></dd>
<dt><b>-fa_max_dis</b> \<Real\></dt>
<dd>¿Hasta qué distancia llega el potencial de pares de todos los átomos (FA)?<br/>Default: 6.0<br/></dd>
<dt><b>-fa_Hatr</b> \<Boolean\></dt>
<dd>Activar el término atractivo de Lennard-Jones para los átomos de hidrógeno<br/>Default: true<br/></dd>
<dt><b>-no_smooth_etables</b> \<Boolean\></dt>
<dd>Volver a las etables al estilo antiguo<br/></dd>
<dt><b>-count_pair_hybrid</b> \<Boolean\></dt>
<dd>Usar el count-pair estándar para lo que no sean ligandos y cp3 con 1-4 de peso completo para los ligandos<br/>Default: false<br/></dd>
<dt><b>-count_pair_full</b> \<Boolean\></dt>
<dd>Usar cp3 con 1-4 de peso completo para todo<br/>Default: false<br/></dd>
<dt><b>-no_lk_polar_desolvation</b> \<Boolean\></dt>
<dd>Desactivar el componente de desolvatación polar del modelo de solvatación LK; en la práctica, fija dGfree en 0 para los átomos polares<br/></dd>
<dt><b>-lk_polar_without_proline_N</b> \<Boolean\></dt>
<dd>Forzar a la clase LK_PolarNonPolarEnergy a tratar el átomo N de la prolina como no polar<br/>Default: false<br/></dd>
<dt><b>-input_etables</b> \<String\></dt>
<dd>Leer las etables de archivos con el prefijo indicado<br/></dd>
<dt><b>-output_etables</b> \<String\></dt>
<dd>Escribir las etables en archivos con el prefijo indicado<br/></dd>
<dt><b>-analytic_etable_evaluation</b> \<Boolean\></dt>
<dd>En lugar de interpolar entre intervalos, usar una evaluación analítica de las energías de Lennard-Jones y de solvatación<br/>Default: true<br/></dd>
<dt><b>-put_intra_into_total</b> \<Boolean\></dt>
<dd>Poner los términos intrarresiduo dentro de hbond, geom_sol_fast y fa_atr. (Las contribuciones no aparecerán en hbond_intra ni en fa_atr_intra_xover4.) Desactivado por defecto en proteínas.<br/>Default: false<br/></dd>
<dt><b>-include_intra_res_protein</b> \<Boolean\></dt>
<dd>Incluir el cálculo de términos intrarresiduo en proteínas.<br/>Default: false<br/></dd>
<dt><b>-fa_stack_base_base_only</b> \<Boolean\></dt>
<dd>Calcular fa_stack solo para base/base de ARN.<br/>Default: true<br/></dd>
<dt><b>-fa_stack_include_rna_protein</b> \<Boolean\></dt>
<dd>Calcular fa_stack para ARN/proteína<br/>Default: true<br/></dd>
<dt><b>-fa_stack_sol_prefactor</b> \<Real\></dt>
<dd>Intensidad de la penalización sol en fa_stack_sol.<br/>Default: 0.1<br/></dd>
<dt><b>-fa_stack_sol_stack_cutoff</b> \<Real\></dt>
<dd>las distancias inferiores a este valor reciben el stack sol completo.<br/>Default: 5.5<br/></dd>
<dt><b>-fa_stack_sol_dist_cutoff</b> \<Real\></dt>
<dd>las distancias inferiores a este valor reciben algo de stack sol.<br/>Default: 6.5<br/></dd>
<dt><b>-fa_stack_lr_prefactor</b> \<Real\></dt>
<dd>Intensidad de la penalización lr en fa_stack_lr.<br/>Default: -0.05<br/></dd>
<dt><b>-fa_stack_lr_stack_cutoff</b> \<Real\></dt>
<dd>las distancias inferiores a este valor reciben el stack lr completo.<br/>Default: 6.5<br/></dd>
<dt><b>-fa_stack_lr_dist_cutoff</b> \<Real\></dt>
<dd>las distancias inferiores a este valor reciben algo de stack lr.<br/>Default: 7.5<br/></dd>
<dt><b>-geom_sol_interres_path_distance_cutoff</b> \<Integer\></dt>
<dd>Número mínimo de enlaces entre átomos de residuos distintos para calcular geom_sol<br/>Default: 0<br/></dd>
<dt><b>-geom_sol_intrares_path_distance_cutoff</b> \<Integer\></dt>
<dd>Número mínimo de enlaces entre átomos del mismo residuo para calcular geom_sol<br/>Default: 6<br/></dd>
<dt><b>-rms_target</b> \<Real\></dt>
<dd>Objetivo de la optimización de RMS para el EnergyMethod RMS_Energy<br/>Default: 0.0<br/></dd>
<dt><b>-ramaneighbors</b> \<Boolean\></dt>
<dd>Usa mapas de Ramachandran dependientes de los vecinos<br/>Default: false<br/></dd>
<dt><b>-optH_weights</b> \<String\></dt>
<dd>Nombre del archivo de pesos (sin la extensión .wts) que se usará durante optH<br/></dd>
<dt><b>-optH_patch</b> \<String\></dt>
<dd>Nombre del archivo de pesos (sin la extensión .wts) que se usará durante optH<br/></dd>
<dt><b>-hb_don_strength</b> \<StringVector\></dt>
<dd>Modificación de las intensidades de los átomos donadores de enlaces de hidrógeno; anula los ajustes de cualquier archivo de la base de datos. Formato: -hb_don_strength <atm1>:<wt1> <atm2>:<wt2> ...   Por ejemplo: -hb_don_strength hbdon_IND:1.5 hbdon_AHX:0.5<br/></dd>
<dt><b>-hb_acc_strength</b> \<StringVector\></dt>
<dd>Modificación de las intensidades de los átomos aceptores de enlaces de hidrógeno; anula los ajustes de cualquier archivo de la base de datos. Formato: -hb_acc_strength <atm1>:<wt1> <atm2>:<wt2> ...   Por ejemplo: -hb_acc_strength hbacc_CXA:1.5 hbdon_HXL:0.5<br/></dd>
<dt><b>-hbe_for_dH2O_aGEN_SP3SC_ssother</b> \<String\></dt>
<dd>HBEvalType para HBEvalTuple(hbdon_H2O, hbacc_GENERIC_SP3SC, seq_sep_other)<br/>Default: "hbe_dH2OaHXL"<br/></dd>
<dt><b>-hb_max_energy</b> \<Real\></dt>
<dd>Energía máxima posible de un enlace de hidrógeno. En casi todas las circunstancias debe fijarse en 0.0.<br/>Default: 0.0<br/></dd>
<dt><b>-hbond_params</b> \<String\></dt>
<dd>Nombre del directorio de la base de datos que indica qué parámetros de enlaces de hidrógeno usar.<br/>Default: "ref2015_params"<br/></dd>
<dt><b>-hbond_bb_per_residue_energy</b> \<Boolean\></dt>
<dd>En las tablas de puntuación, separar las energías de los enlaces de hidrógeno de la cadena principal por residuo. Por defecto, los enlaces de hidrógeno de la cadena principal se incluyen en la energía total, pero no en las energías por residuo<br/>Default: false<br/></dd>
<dt><b>-hbond_disable_bbsc_exclusion_rule</b> \<Boolean\></dt>
<dd>Desactivar la regla que excluye los enlaces de hidrógeno cadena principal/cadena lateral de la proteína si el grupo de la cadena principal ya forma un enlace de hidrógeno con otro grupo de la cadena principal; con esta opción no se excluye ningún enlace de hidrógeno<br/>Default: false<br/></dd>
<dt><b>-use_hb_env_dep</b> \<Boolean\></dt>
<dd>Usar la dependencia del entorno de los enlaces de hidrógeno. Menor en la superficie de la proteína.<br/>Default: true<br/></dd>
<dt><b>-water_hybrid_sf</b> \<Boolean\></dt>
<dd>Usar una función de puntuación híbrida, que incluye los términos de energía hbond_wat y wat_entropy.<br/>Default: false<br/></dd>
<dt><b>-show_etable_contributions</b> \<Boolean\></dt>
<dd>Muestra las contribuciones átomo-átomo y residuo-residuo a las energías de Lennard-Jones y de solvatación al puntuar.<br/>Default: false<br/></dd>
<dt><b>-symE_units</b> \<Integer\></dt>
<dd>Número de unidades simétricas en el diseño, para usar con la puntuación symE<br/>Default: -1<br/></dd>
<dt><b>-symE_bonus</b> \<Real\></dt>
<dd>Bonificación de energía por coincidencia, para usar con la puntuación symE<br/>Default: 0.0<br/></dd>
<dt><b>-symmetric_gly_tables</b> \<Boolean\></dt>
<dd>Si es true, las tablas de Ramachandran y P_AA_PP de la glicina se simetrizarán al cargarlas. Si es false (el valor por defecto), se usarán las tablas estadísticas, que son asimétricas por la contribución de los aminoácidos quirales.<br/>Default: false<br/></dd>
<dt><b>-NV_lbound</b> \<Real\></dt>
<dd>Límite inferior para la puntuación de vectores de vecinos<br/>Default: 3.3<br/></dd>
<dt><b>-NV_ubound</b> \<Real\></dt>
<dd>Límite superior para la puntuación de vectores de vecinos<br/>Default: 11.1<br/></dd>
<dt><b>-NV_table</b> \<String\></dt>
<dd>Ruta de la tabla de consulta del potencial<br/>Default: "scoring/score_functions/NV/neighbor_vector_score.histogram"<br/></dd>
<dt><b>-find_neighbors_3dgrid</b> \<Boolean\></dt>
<dd>Usar una tabla de consulta 3D para los cálculos de vecinos. Para conformaciones esféricas y bien distribuidas, detección de vecinos en O(N) en lugar de O(NlgN) general<br/>Default: false<br/></dd>
<dt><b>-find_neighbors_stripehash</b> \<Boolean\></dt>
<dd>debería ser más rápido que 3dgrid y usar 1/8 de la memoria<br/>Default: false<br/></dd>
<dt><b>-seqdep_refene_fname</b> \<String\></dt>
<dd>Nombre de archivo de la tabla que contiene las energías de referencia dependientes de la secuencia<br/></dd>
<dt><b>-secondary_seqdep_refene_fname</b> \<String\></dt>
<dd>Nombre de archivo adicional de la tabla que contiene las energías de referencia dependientes de la secuencia<br/></dd>
<dt><b>-exact_occ_pairwise</b> \<Boolean\></dt>
<dd>Al usar occ_sol_exact, calcular las energías sujetas a aditividad por pares (no recomendado; pensado para parametrización y evaluación)<br/>Default: false<br/></dd>
<dt><b>-exact_occ_skip_Hbonders</b> \<Boolean\></dt>
<dd>Al usar occ_sol_exact, no contar las contribuciones de los grupos oclusores que forman enlaces de hidrógeno con el grupo polar de interés<br/>Default: true<br/></dd>
<dt><b>-exact_occ_pairwise_by_res</b> \<Boolean\></dt>
<dd>Al usar occ_sol_exact, calcular las energías sujetas a aditividad por pares de residuos (no recomendado; pensado para parametrización y evaluación)<br/>Default: false<br/></dd>
<dt><b>-exact_occ_split_between_res</b> \<Boolean\></dt>
<dd>Al usar occ_sol_exact con la opción exact_occ_pairwise, repartir las energías entre los dos residuos que contribuyen en lugar de asignarlas solo al residuo polar (no recomendado; pensado para parametrización y evaluación)<br/>Default: false<br/></dd>
<dt><b>-exact_occ_self_res_no_occ</b> \<Boolean\></dt>
<dd>Poner esto en false significa que el propio residuo SÍ puede ocluir al usar el modelo ODO exacto, lo que puede provocar doble conteo con la energía de Dunbrack pero da mejores resultados en la discriminación de loops.<br/>Default: false<br/></dd>
<dt><b>-exact_occ_radius_scaling</b> \<Real\></dt>
<dd>Al usar occ_sol_exact, escalar los radios de los átomos oclusores por este factor (pensado para parametrización y evaluación)<br/>Default: 1.0<br/></dd>
<dt><b>-ref_offsets</b> \<StringVector\></dt>
<dd>desplazar las energías de referencia usando tipos de residuo de 3 caracteres (ejemplo: TRP 0.9 HIS 0.3)<br/></dd>
<dt><b>-ref_offset</b> \<Real\></dt>
<dd>desplazar todas las energías de referencia en esta cantidad<br/>Default: 0.0<br/></dd>
<dt><b>-output_residue_energies</b> \<Boolean\></dt>
<dd>Escribir la energía de cada residuo<br/>Default: false<br/></dd>
<dt><b>-fa_custom_pair_distance_file</b> \<String\></dt>
<dd>Nombre del archivo personalizado de energía de distancia entre pares<br/>Default: ""<br/></dd>
<dt><b>-disulf_matching_probe</b> \<Real\></dt>
<dd>Tamaño de la sonda que se usará en la puntuación de coincidencia de puentes disulfuro<br/>Default: 2.5<br/></dd>
<dt><b>-bonded_params</b> \<RealVector\></dt>
<dd>Constantes de resorte por defecto para los parámetros de enlace [longitud,ángulo,torsión,torsión-protón,torsión-impropia]<br/></dd>
<dt><b>-bonded_params_dir</b> \<String\></dt>
<dd>Constantes de resorte para los parámetros de enlace [longitud,ángulo,torsión,torsión-protón,torsión-impropia]<br/>Default: "scoring/score_functions/bondlength_bondangle"<br/></dd>
<dt><b>-extra_mm_params_dir</b> \<StringVector\></dt>
<dd>Directorio o directorios con archivos de parámetros adicionales para los términos de puntuación mm. (Busca mm_torsion_params.txt, mm_bond_angle_params.txt y mm_bond_length_params.txt)<br/></dd>
<dt><b>-gen_bonded_params_file</b> \<String\></dt>
<dd>Parámetros de [longitud,ángulo,torsión,torsión-impropia]<br/>Default: "scoring/score_functions/generic_potential/generic_bonded.round6p.txt"<br/></dd>
<dt><b>-torsion_distr_params_file</b> \<String\></dt>
<dd>Parámetros de las funciones gaussianas de las distribuciones de torsión<br/>Default: "scoring/score_functions/generic_potential/torsion_distribution.round6p.gz.v1.txt"<br/></dd>
<dt><b>-gen_bonded_exclude_def_file</b> \<String\></dt>
<dd>Definiciones de los parámetros de doble conteo con otros términos de energía<br/>Default: "scoring/score_functions/generic_potential/params_exclude.txt"<br/></dd>
<dt><b>-genbonded_score_full</b> \<Boolean\></dt>
<dd>Activar el término gen_bonded para todos los tipos de residuo (p. ej., aminoácidos canónicos)<br/>Default: false<br/></dd>
<dt><b>-genbonded_score_hybrid</b> \<Boolean\></dt>
<dd>Activar el término gen_bonded solo para las partes que faltan (p. ej., ligandos, torsiones no cubiertas por rama/fa_dun, ...)<br/>Default: false<br/></dd>
<dt><b>-extra_improper_file</b> \<String\></dt>
<dd>Añadir parámetros adicionales para las torsiones impropias<br/></dd>
<dt><b>-cart_bonded_skip_cutpoints</b> \<Boolean\></dt>
<dd>omitir la evaluación de cart_bonded si res1-2 están definidos como cutpoint<br/>Default: true<br/></dd>
<dt><b>-pro_close_planar_constraint</b> \<Real\></dt>
<dd>desviación estándar de la restricción trigonal plana de CD,N,CA,prevC en el método de energía pro_close<br/>Default: 0.1<br/></dd>
<dt><b>-no_pro_close_ring_closure</b> \<Boolean\></dt>
<dd>El término pro_close mantiene cerrado el anillo de la prolina, pero también tiene cierta energía entre residuos asociada al valor psi del residuo anterior. Si esta opción se pone en 'true', el término SOLO se ocupa de la parte de torsiones: no mantiene cerrado el anillo. Para usar con cart_bonded o ring_close. False por defecto.<br/>Default: false<br/></dd>
<dt><b>-ring_close_shadow_constraint</b> \<Real\></dt>
<dd>Desviación estándar del potencial armónico que se usa para mantener los átomos sombra sobre los átomos reales y así mantener cerrados los anillos con el término de puntuación ring_close. Análoga a la opción pro_close_planar_constraint del término de energía pro_close.<br/>Default: 0.1<br/></dd>
<dt><b>-linear_bonded_potential</b> \<Boolean\></dt>
<dd>usar un potencial de enlace lineal (en lugar de cuadrático)<br/>Default: false<br/></dd>
<dt><b>-free_side_chain_bonus</b> \<Real\></dt>
<dd>Cantidad con la que se premia la virtualización de una cadena lateral de proteína, por chi libre<br/>Default: -0.5<br/></dd>
<dt><b>-compute_mg_sol_for_hydrogens</b> \<Boolean\></dt>
<dd>mg_sol incluye penalizaciones por hidrógenos cerca de Mg(2+)<br/>Default: false<br/></dd>
<dt><b>-rg_local_span</b> \<IntegerVector\></dt>
<dd>Primer y último residuo de rg_local. Por ejemplo, para calcular rg_local del 1 al 20 sería 1,20<br/>Default: 0<br/></dd>
<dt><b>-unmodifypot</b> \<Boolean\></dt>
<dd>No llamar a modify pot para añadir interacciones repulsivas adicionales entre los tipos de átomo Obb/Obb a distancias inferiores a 3.6 Å<br/>Default: true<br/></dd>
<dt><b>-conc</b> \<Real\></dt>
<dd>concentración intermolecular que se usará en el término intermol (en M)<br/>Default: 1.0<br/></dd>
<dt><b>-sidechain_buried</b> \<IntegerVector\></dt>
<dd>contar los residuos enterrados (aplicación piloto de rvernon)<br/>Default: -1<br/></dd>
<dt><b>-sidechain_exposed</b> \<IntegerVector\></dt>
<dd>contar los residuos expuestos (aplicación piloto de rvernon)<br/>Default: -1<br/></dd>
<dt><b>-aa_composition_setup_file</b> \<StringVector\></dt>
<dd>El nombre de archivo de uno o más archivos de configuración del término de puntuación aa_composition. (Se pueden indicar varios archivos, separados por un espacio.) La ubicación por defecto de estos archivos (que tienen extensión .comp) es /database/scoring/score_functions/aa_composition/.<br/></dd>
<dt><b>-aa_repeat_energy_penalty_file</b> \<String\></dt>
<dd>El nombre de archivo de un archivo de penalizaciones para el término de energía aa_repeat_energy. El archivo de penalizaciones debe ser una serie de números en una sola línea, que representan la penalización por tener una repetición de 1, 2, 3, etc. del mismo residuo. Los archivos de penalizaciones se guardan en database/scoring/score_functions/aa_repeat_energy/ y deben tener el sufijo .rpt_pen. El valor por defecto es default_repeat_penalty_table.rpt_pen.<br/>Default: "default_repeat_penalty_table.rpt_pen"<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_hbond_energy_threshold</b> \<Real\></dt>
<dd>Umbral de energía para que un enlace de hidrógeno se considere satisfactor de un polar enterrado. Debe ser un número negativo. (Poner -0.001 será mucho más rápido en tiempo de ejecución que 0)<br/>Default: -0.25<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_burial_atomic_depth</b> \<Real\></dt>
<dd>El corte de profundidad atómica para determinar si un átomo polar está enterrado o no. Se mide desde la superficie Sasa.<br/>Default: 4.5f<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_burial_probe_radius</b> \<Real\></dt>
<dd>El radio de sonda para el cálculo de la profundidad atómica.<br/>Default: 2.3f<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_burial_resolution</b> \<Real\></dt>
<dd>La resolución para el cálculo de la profundidad atómica.<br/>Default: 0.5f<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_oversat_penalty</b> \<Real\></dt>
<dd>La penalización entre átomos que satisfacen ambos al mismo átomo. Si X = weight_of_approximate_buried_unsat_penalty, en general un átomo enterrado no satisfecho vale X, uno satisfecho vale 0, uno doblemente satisfecho vale X * ( valor-1.0 ), uno triplemente satisfecho vale X * ( -2 + 3 * valor ) y uno N veces satisfecho vale X * ( 1 - N + 0.5 * N * (N - 1) ).<br/>Default: 1.0<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_assume_const_backbone</b> \<Boolean\></dt>
<dd>¿Debemos suponer que los átomos de la cadena principal no cambiarán durante una trayectoria de empaquetado? (es decir, que no hay posiciones que incluyan aminoácido normal y prolina o n-metilo) Si se pone en false, este método de energía tarda más en calcularse. (~ el doble)<br/>Default: true<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_natural_corrections1</b> \<Boolean\></dt>
<dd>Aplicar las siguientes correcciones a la penalización por átomos enterrados no satisfechos: nh2_wants_2, nh1_wants_1, hydroxyl_wants_h, carboxyl_wants_2<br/>Default: false<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_hbond_bonus_cross_chain</b> \<Real\></dt>
<dd>Aplicar un factor de bonificación a los enlaces de hidrógeno entre cadenas. Recuerda ponerlo negativo.<br/>Default: 0<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_hbond_bonus_ser_to_helix_bb</b> \<Real\></dt>
<dd>Aplicar un factor de bonificación al enlace de hidrógeno clásico SER/THR i - i-4, OG/OG1 - O. Ponlo positivo para penalizar.<br/>Default: 0<br/></dd>
<dt><b>-approximate_buried_unsat_penalty_lys_ok_with_1</b> \<Boolean\></dt>
<dd>Hacer que el N de la LYS funcione como el O carbonilo, que prefiere 1 o 2 enlaces de hidrógeno.<br/>Default: false<br/></dd>
<dt><b>-target_clash_pdb</b> \<String\></dt>
<dd>El archivo PDB objetivo para la comprobación de choques con el término de puntuación target_clash.<br/>Default: ""<br/></dd>
<dt><b>-aspartimide_penalty_value</b> \<Real\></dt>
<dd>La penalización por cada secuencia de dos residuos formadora de aspartimida encontrada, cuando el peso del término de puntuación aspartimide_penalty es 1.0. El valor por defecto es 25.0.<br/>Default: 25.0<br/></dd>
<dt><b>-buried_unsatisfied_penalty_cone_angle_exponent</b> \<Real\></dt>
<dd>El exponente del ángulo para calcular el enterramiento con el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty.<br/>Default: 2.0<br/></dd>
<dt><b>-buried_unsatisfied_penalty_cone_angle_shift_factor</b> \<Real\></dt>
<dd>El factor de desplazamiento del ángulo para calcular el enterramiento con el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty.<br/>Default: 0.25<br/></dd>
<dt><b>-buried_unsatisfied_penalty_cone_dist_exponent</b> \<Real\></dt>
<dd>El exponente de la distancia para calcular el enterramiento con el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty.<br/>Default: 1.0<br/></dd>
<dt><b>-buried_unsatisfied_penalty_cone_dist_midpoint</b> \<Real\></dt>
<dd>El punto medio de la distancia para calcular el enterramiento con el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty.<br/>Default: 9.0<br/></dd>
<dt><b>-buried_unsatisfied_penalty_burial_threshold</b> \<Real\></dt>
<dd>El número de conos en los que debe estar un punto para considerarse enterrado con el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty.<br/>Default: 5.0<br/></dd>
<dt><b>-buried_unsatisfied_penalty_hbond_energy_threshold</b> \<Real\></dt>
<dd>El umbral de energía por encima del cual no se cuenta un enlace de hidrógeno, usado por la energía BuriedUnsatPenalty.<br/>Default: -0.25<br/></dd>
<dt><b>-covalent_labeling_input</b> \<File\></dt>
<dd>Datos de marcaje covalente de entrada en forma de recuentos de vecinos<br/></dd>
<dt><b>-hrf_dynamics_input</b> \<File\></dt>
<dd>Datos de marcaje covalente de entrada en forma de factores de protección para FA<br/></dd>
<dt><b>-covalent_labeling_fa_input</b> \<File\></dt>
<dd>Datos de marcaje covalente de entrada en forma de recuentos de vecinos para FA<br/></dd>
<dt><b>-depc_ms_input</b> \<File\></dt>
<dd>Datos de EM de marcaje covalente con DEPC de entrada, en forma de números de residuo de His/Lys/Ser/Thr/Tyr y estado de marcaje: marcado (L) o no marcado (U)<br/></dd>
<dt><b>-elec_min_dis</b> \<Real\></dt>
<dd>cambia el corte de distancia mínima de la energía hack-elec<br/>Default: 1.6<br/></dd>
<dt><b>-elec_max_dis</b> \<Real\></dt>
<dd>cambia el corte de distancia máxima de la energía hack-elec<br/>Default: 5.5<br/></dd>
<dt><b>-elec_die</b> \<Real\></dt>
<dd>cambia la constante dieléctrica de la energía hack-elec<br/>Default: 10.0<br/></dd>
<dt><b>-elec_r_option</b> \<Boolean\></dt>
<dd>cambia el dieléctrico de dependiente de la distancia a independiente de la distancia<br/>Default: false<br/></dd>
<dt><b>-elec_sigmoidal_die</b> \<Boolean\></dt>
<dd>cambia el dieléctrico de dependiente de la distancia a sigmoidal<br/>Default: true<br/></dd>
<dt><b>-elec_sigmoidal_die_D</b> \<Real\></dt>
<dd>parámetro D del dieléctrico sigmoidal<br/>Default: 80.0<br/></dd>
<dt><b>-elec_sigmoidal_die_D0</b> \<Real\></dt>
<dd>parámetro D0 del dieléctrico sigmoidal<br/>Default: 6.0<br/></dd>
<dt><b>-elec_sigmoidal_die_S</b> \<Real\></dt>
<dd>parámetro S del dieléctrico sigmoidal<br/>Default: 0.4<br/></dd>
<dt><b>-stack_elec_sigmoidal_die</b> \<Boolean\></dt>
<dd>anulación de -elec_sigmoidal_die para stack_elec<br/>Default: false<br/></dd>
<dt><b>-elec_representative_cp</b> \<Boolean\></dt>
<dd>Usar átomos representativos para countpair y evitar divisiones de dipolos<br/>Default: true<br/></dd>
<dt><b>-elec_representative_cp_flip</b> \<Boolean\></dt>
<dd>Activar elec_representative_cp, pero INVIRTIENDO el orden en la tabla<br/>Default: true<br/></dd>
<dt><b>-eval_intrares_elec_ST_only</b> \<Boolean\></dt>
<dd>Elec intrarresiduo solo para los átomos de grados de libertad libres en Ser/Thr<br/>Default: false<br/></dd>
<dt><b>-smooth_fa_elec</b> \<Boolean\></dt>
<dd>Suavizar las discontinuidades de la función de energía elec con un término sigmoidal<br/>Default: true<br/></dd>
<dt><b>-grpelec_fade_type</b> \<String\></dt>
<dd>usar la forma estándar (función shift/switch) de la función de Coulomb para fa_grpelec<br/>Default: "false"<br/></dd>
<dt><b>-grpelec_fade_param1</b> \<Real\></dt>
<dd>distancia de atenuación para shift/switch<br/>Default: 1.0<br/></dd>
<dt><b>-grpelec_fade_param2</b> \<Real\></dt>
<dd>exponente para shift<br/>Default: 1.0<br/></dd>
<dt><b>-elec_group_file</b> \<String\></dt>
<dd>archivo donde se guarda la información de grupos<br/>Default: "/scoring/score_functions/elec_group_def.dat"<br/></dd>
<dt><b>-elec_group_extrafile</b> \<String\></dt>
<dd>archivo donde se guarda la información de grupos de extra_res<br/>Default: ""<br/></dd>
<dt><b>-grpelec_fade_hbond</b> \<Boolean\></dt>
<dd>atenuar grpelec para el grupo que forma enlaces de hidrógeno<br/>Default: false<br/></dd>
<dt><b>-grpelec_max_qeps</b> \<RealVector\></dt>
<dd>Carga absoluta máxima para los tipos de grupo, usada al atenuar los enlaces de hidrógeno [apolar/polar/cargado]<br/>Default: ['0', '0.10', '0.25', '0.5']<br/></dd>
<dt><b>-grpelec_context_dependent</b> \<Boolean\></dt>
<dd>si grpelec depende del contexto<br/>Default: false<br/></dd>
<dt><b>-grp_cpfxn</b> \<Boolean\></dt>
<dd>regla para probar cpfxn en el grupo<br/>Default: true<br/></dd>
<dt><b>-grpelec_cpfxn_weight</b> \<RealVector\></dt>
<dd>peso de cpfxn en el grupo (1-4/1-5/>1-5)<br/>Default: ['0.0', '0.2', '1.0']<br/></dd>
<dt><b>-hbnet_bonus_function_ramping</b> \<String\></dt>
<dd>La función de bonificación del término de puntuación hbnet puede escalar de distintas formas a medida que crece el tamaño de una red. El valor por defecto es crecimiento cuadrático, aunque también se permiten el crecimiento lineal, logarítmico y de raíz cuadrada.<br/>Default: "quadratic"<br/></dd>
<dt><b>-hbnet_max_network_size</b> \<Integer\></dt>
<dd>Este es el tamaño máximo de la red de enlaces de hidrógeno, a partir del cual el término de puntuación hbnet no dará más bonificación. Por defecto es 0, lo que significa sin límite.<br/>Default: 0<br/></dd>
<dt><b>-elec_context_minstrength</b> \<Real\></dt>
<dd>intensidad con el enterramiento mínimo <br/>Default: 0.2<br/></dd>
<dt><b>-elec_context_minburial</b> \<Real\></dt>
<dd>número de cb asignado como enterramiento mínimo <br/>Default: 7.0<br/></dd>
<dt><b>-elec_context_maxburial</b> \<Real\></dt>
<dd>número de cb asignado como enterramiento máximo<br/>Default: 24.0<br/></dd>
<dt><b>-use_polarization</b> \<Boolean\></dt>
<dd>si la electrostática multipolar incluye la polarización (dipolos inducidos)<br/>Default: true<br/></dd>
<dt><b>-use_gen_kirkwood</b> \<Boolean\></dt>
<dd>si la electrostática multipolar incluye el tratamiento del campo de reacción<br/>Default: true<br/></dd>
<dt><b>-protein_dielectric</b> \<Real\></dt>
<dd>constante dieléctrica de la proteína en el tratamiento de Kirkwood generalizado del campo de reacción<br/>Default: 1.0<br/></dd>
<dt><b>-water_dielectric</b> \<Real\></dt>
<dd>constante dieléctrica del agua en el tratamiento de Kirkwood generalizado del campo de reacción<br/>Default: 78.3<br/></dd>
<dt><b>-facts_GBpair_cut</b> \<Real\></dt>
<dd>Corte de distancia de interacción de GBpair (igual que elec_max_dis)<br/>Default: 10.0<br/></dd>
<dt><b>-facts_kappa</b> \<Real\></dt>
<dd>Factor de apantallamiento de la interacción de GBpair<br/>Default: 12.0<br/></dd>
<dt><b>-facts_asp_patch</b> \<Integer\></dt>
<dd>Conjunto de AtomicSolvationParameter para la interacción apolar en FACTS<br/>Default: 3<br/></dd>
<dt><b>-facts_plane_to_self</b> \<Boolean\></dt>
<dd>Añadir átomos del mismo plano a los pares de energía propia<br/>Default: true<br/></dd>
<dt><b>-facts_saltbridge_correction</b> \<Real\></dt>
<dd>Factor de escala del parámetro de energía propia de FACTS para H polar<br/>Default: 1.0<br/></dd>
<dt><b>-facts_dshift</b> \<RealVector\></dt>
<dd>Desplazamiento de la distancia del denominador del término de pares de FACTS [bb/bbsc/scsc/puente salino]<br/>Default: ['0.0', '1.5', '1.5', '1.5']<br/></dd>
<dt><b>-facts_die</b> \<Real\></dt>
<dd>Constante dieléctrica de FACTS<br/>Default: 1.0<br/></dd>
<dt><b>-facts_binding_affinity</b> \<Boolean\></dt>
<dd>Activar las opciones de FACTS para el cálculo de afinidad de unión<br/>Default: false<br/></dd>
<dt><b>-facts_intrascale_by_level</b> \<Boolean\></dt>
<dd>¿Aplicar escalado interno por path_dist a CA? (la definición de abajo pasa a G/D/E/Z/>Z<br/>Default: false<br/></dd>
<dt><b>-facts_intbb_elec_scale</b> \<RealVector\></dt>
<dd>Escala de Coulomb de FACTS para pares enlazados intrarresiduo: [1-4, 1-5, >1-5]<br/>Default: ['0.0', '0.2', '0.0']<br/></dd>
<dt><b>-facts_intbb_solv_scale</b> \<RealVector\></dt>
<dd>Escala GB de FACTS para pares enlazados bb-bb intrarresiduo: [1-4, 1-5, >1-5]<br/>Default: ['0.4', '0.4', '0.0']<br/></dd>
<dt><b>-facts_adjbb_elec_scale</b> \<RealVector\></dt>
<dd>Escala de Coulomb de FACTS para pares enlazados bb-bb adyacentes: [1-4, 1-5, 1-6, 2res-acoplado, 1res-desacoplado]<br/>Default: ['0.0', '0.2', '1.0', '0.5', '0.5']<br/></dd>
<dt><b>-facts_adjbb_solv_scale</b> \<RealVector\></dt>
<dd>Escala GB de FACTS para pares enlazados bb-bb adyacentes: [1-4, 1-5, 1-6, 2res-acoplado, 1res-desacoplado]<br/>Default: ['0.0', '0.2', '1.0', '0.5', '0.5']<br/></dd>
<dt><b>-facts_intbs_elec_scale</b> \<RealVector\></dt>
<dd>Escala de Coulomb de FACTS para pares enlazados bb-sc intrarresiduo: [1-4, 1-5, 1-6, >1-6, dumm]<br/>Default: ['0.2', '0.2', '0.2', '0.2', '0.0']<br/></dd>
<dt><b>-facts_intbs_solv_scale</b> \<RealVector\></dt>
<dd>Escala GB de FACTS para pares enlazados bb-sc intrarresiduo: [1-4, 1-5, 1-6, >1-6, dumm]<br/>Default: ['1.0', '0.6', '0.6', '0.6', '0.0']<br/></dd>
<dt><b>-facts_adjbs_elec_scale</b> \<RealVector\></dt>
<dd>Escala de Coulomb de FACTS para pares enlazados bb-sc adyacentes: [1-4, 1-5, 1-6, 1-7, >1-7]<br/>Default: ['0.0', '0.2', '0.2', '0.2', '0.2']<br/></dd>
<dt><b>-facts_adjbs_solv_scale</b> \<RealVector\></dt>
<dd>Escala GB de FACTS para pares enlazados bb-sc adyacentes: [1-4, 1-5, 1-6, 1-7, >1-7]<br/>Default: ['1.0', '0.6', '0.6', '0.6', '0.6']<br/></dd>
<dt><b>-facts_intsc_elec_scale</b> \<RealVector\></dt>
<dd>Escala de Coulomb de FACTS para pares sc-sc intrarresiduo: [1-4, 1-5, >1-5]<br/>Default: ['0.0', '0.0', '0.0']<br/></dd>
<dt><b>-facts_intsc_solv_scale</b> \<RealVector\></dt>
<dd>Escala GB de FACTS para pares sc-sc intrarresiduo: [1-4, 1-5, >1-5]<br/>Default: ['1.0', '0.0', '0.0']<br/></dd>
<dt><b>-facts_charge_dir</b> \<String\></dt>
<dd>directorio donde se guardan los archivos de topología de residuos para las cargas de FACTS<br/>Default: "scoring/score_functions/facts"<br/></dd>
<dt><b>-facts_eff_charge_dir</b> \<String\></dt>
<dd>directorio donde se guardan los archivos de topología de residuos para las cargas de FACTS<br/>Default: "scoring/score_functions/facts/eff"<br/></dd>
<dt><b>-facts_plane_aa</b> \<StringVector\></dt>
<dd>aminoácidos a los que se aplica la regla del plano<br/></dd>
<dt><b>-facts_eq_type</b> \<String\></dt>
<dd>tipo de ecuación de FACTS<br/>Default: "exact"<br/></dd>
<dt><b>-ignore_terminal_ss_elements</b> \<Integer\></dt>
<dd>número de elementos de estructura secundaria que se ignorarán<br/>Default: 0<br/></dd>
<dt><b>-length_dep_srbb</b> \<Boolean\></dt>
<dd>Activar enlaces de hidrógeno de corto alcance de la cadena principal que dependen de la longitud de la hélice<br/>Default: false<br/></dd>
<dt><b>-ldsrbb_low_scale</b> \<Real\></dt>
<dd>Escalado dependiente de la longitud de la hélice en minlength.<br/>Default: 0.5<br/></dd>
<dt><b>-ldsrbb_high_scale</b> \<Real\></dt>
<dd>Escalado dependiente de la longitud de la hélice en maxlength.<br/>Default: 2.0<br/></dd>
<dt><b>-ldsrbb_minlength</b> \<Integer\></dt>
<dd>Longitud mínima (minlength) del escalado dependiente de la longitud de la hélice.<br/>Default: 4<br/></dd>
<dt><b>-ldsrbb_maxlength</b> \<Integer\></dt>
<dd>Longitud máxima (maxlength) del escalado dependiente de la longitud de la hélice.<br/>Default: 17<br/></dd>
<dt><b>-max_motif_per_res</b> \<Real\></dt>
<dd>valor máximo para los motivos<br/>Default: 3.0<br/></dd>
<dt><b>-max_contacting_ss</b> \<Integer\></dt>
<dd>número máximo de elementos de estructura secundaria interconectados<br/>Default: 4<br/></dd>
<dt><b>-motif_ignore_symmmetry</b> \<Boolean\></dt>
<dd>solo cuenta los motivos dentro del monómero<br/>Default: true<br/></dd>
<dt><b>-motif_residues</b> \<IntegerVector\></dt>
<dd>qué números de residuo se usan para calcular los motivos<br/></dd>
<dt><b>-netcharge_setup_file</b> \<StringVector\></dt>
<dd>El nombre de archivo de uno o más archivos de configuración del término de puntuación netcharge. (Se pueden indicar varios archivos, separados por un espacio.) La ubicación por defecto de estos archivos (que tienen extensión .charge) es /database/scoring/score_functions/netcharge/.<br/></dd>
<dt><b>-mhc_epitope_setup_file</b> \<StringVector\></dt>
<dd>El nombre de archivo de uno o más archivos de configuración del término de puntuación mhc_epitope. (Se pueden indicar varios archivos, separados por un espacio.) La ubicación por defecto de estos archivos (que tienen extensión .mhc) es /database/scoring/score_functions/mhc_epitope/.<br/></dd>
<dt><b>-ms_dist_midpoint</b> \<Real\></dt>
<dd>punto medio de distancia del factor de distancia para el término de puntuación HRF_MSLabeling<br/>Default: 9.0<br/></dd>
<dt><b>-ms_dist_exponent</b> \<Real\></dt>
<dd>exponente de distancia del factor de distancia para el término de puntuación HRF_MSLabeling<br/>Default: 0.1<br/></dd>
<dt><b>-ms_fit_slope</b> \<Real\></dt>
<dd>pendiente de la medida de enterramiento calculada a partir de lnPF para el término de puntuación HRF_MSlabeling<br/>Default: 3.827<br/></dd>
<dt><b>-ms_fit_intercept</b> \<Real\></dt>
<dd>intercepto de la medida de enterramiento calculada a partir de lnPF para el término de puntuación HRF_MSlabeling<br/>Default: 36.202<br/></dd>
<dt><b>-ms_fade_outer</b> \<Real\></dt>
<dd>límite exterior de FadeFunc en el término de puntuación HRF_MSLabeling<br/>Default: 10.0<br/></dd>
<dt><b>-ms_fade_dist</b> \<Real\></dt>
<dd>distancia de atenuación de FadeFunc en el término de puntuación HRF_MSLabeling<br/>Default: 5.0<br/></dd>
<dt><b>-ccs_exp</b> \<Real\></dt>
<dd>Datos experimentales de CCS, en Å cuadrados, de IMMS para el término de puntuación CCS_IMMSEnergy; el usuario debe proporcionar esta entrada<br/></dd>
<dt><b>-ccs_prad</b> \<Real\></dt>
<dd>Radio de la sonda, en Å, para el cálculo de CCS del término de puntuación CCS_IMMSEnergy; por defecto se usa 1.0 Å para predecir CCS en condiciones de gas tampón de helio<br/>Default: 1.0<br/></dd>
<dt><b>-ccs_nrots</b> \<Integer\></dt>
<dd>Número de rotaciones aleatorias, deben ser enteros, para el cálculo de CCS del término de puntuación CCS_IMMSEnergy<br/>Default: 300<br/></dd>
<dt><b>-nmer_ref_energies</b> \<String\></dt>
<dd>nombre de archivo de la base de datos de energías de referencia de nmer<br/></dd>
<dt><b>-nmer_ref_energies_list</b> \<String\></dt>
<dd>lista de nombres de archivo de la base de datos de energías de referencia de nmer<br/></dd>
<dt><b>-nmer_pssm</b> \<String\></dt>
<dd>nombre de archivo de la base de datos pssm de nmer<br/></dd>
<dt><b>-nmer_pssm_list</b> \<String\></dt>
<dd>lista de nombres de archivo de la base de datos pssm de nmer<br/></dd>
<dt><b>-nmer_pssm_scorecut</b> \<Real\></dt>
<dd>umbral de puntuación pssm de nmer para ignorar nmers de baja puntuación<br/>Default: 0.0<br/></dd>
<dt><b>-nmer_svm</b> \<String\></dt>
<dd>nombre de archivo svm de nmer (libsvm)<br/>Default: ""<br/></dd>
<dt><b>-nmer_svm_list</b> \<String\></dt>
<dd>lista de nombres de archivo svm de nmer (libsvm)<br/>Default: ""<br/></dd>
<dt><b>-nmer_svm_rank</b> \<String\></dt>
<dd>nombre de archivo de puntuaciones de rango svm de nmer (libsvm)<br/>Default: ""<br/></dd>
<dt><b>-nmer_svm_rank_list</b> \<String\></dt>
<dd>lista de nombres de archivo de puntuaciones de rango svm de nmer (libsvm)<br/>Default: ""<br/></dd>
<dt><b>-nmer_svm_scorecut</b> \<Real\></dt>
<dd>umbral de puntuación svm de nmer para ignorar nmers de baja puntuación<br/>Default: 0.0<br/></dd>
<dt><b>-nmer_svm_aa_matrix</b> \<String\></dt>
<dd>nombre de archivo de la matriz de codificación de secuencia svm de nmer<br/></dd>
<dt><b>-nmer_svm_term_length</b> \<Integer\></dt>
<dd>cuántos residuos corriente arriba/abajo se promedian e incluyen en la codificación de secuencia svm<br/>Default: 3<br/></dd>
<dt><b>-nmer_svm_pssm_feat</b> \<Boolean\></dt>
<dd>¿añadir características pssm a la codificación svm?<br/>Default: true<br/></dd>
<dt><b>-nmer_svm_avg_rank_as_energy</b> \<Boolean\></dt>
<dd>usar el promedio de los rangos de puntuación svm como energía del residuo para el método de puntuación NmerSVM, útil para normalizar entre alelos de mhc/hla<br/>Default: false<br/></dd>
<dt><b>-nmer_ref_seq_length</b> \<Integer\></dt>
<dd>longitud de los nmers en la puntuación nmer_ref<br/>Default: 9<br/></dd>
<dt><b>-just_calc_rmsd</b> \<Boolean\></dt>
<dd>En rna_score, calcular solo el rmsd, sin reemplazar la puntuación.<br/>Default: false<br/></dd>
<dt><b>-envsmooth_zero_negatives</b> \<Boolean\></dt>
<dd>usar una tabla envsmooth alternativa con un piso de 0.0 (envsmooth no otorga bonificación de energía)<br/>Default: false<br/></dd>
<dt><b>-rama_power</b> \<Real\></dt>
<dd>Si rama > 0.0, elevarlo a la n-ésima potencia. Ha sido útil para el diseño en Foldit. Ten en cuenta que esto crea discontinuidades en la derivada, así que debe usarse con precaución. Si no se especifica, se conserva el comportamiento por defecto de rama (sin función de potencia).<br/>Default: 1.0<br/></dd>
<dt><b>-ideal_sugars</b> \<Boolean\></dt>
<dd>Activa la carga de solo las conformaciones de silla ideales de azúcares con anillos de 6 miembros.<br/>Default: false<br/></dd>
<dt><b>-hbond_fade</b> \<Real\></dt>
<dd>fade_factor para el softmax de la geometría de los enlaces de hidrógeno<br/>Default: 2.5<br/></dd>
<dt><b>-hbond_new_sp3_acc</b> \<Boolean\></dt>
<dd>fade_factor para el softmax de la geometría de los enlaces de hidrógeno<br/>Default: false<br/></dd>
<dt><b>-alignment_sharpness</b> \<Real\></dt>
<dd>Al calcular una función armónica del RMSD para la puntuación del alineamiento, ¿cuál debe ser la desviación estándar?<br/>Default: 1.0<br/></dd>
<dt><b>-rna_torsion_potential</b> \<String\></dt>
<dd>En el cálculo de torsiones de ARN, directorio que contiene los potenciales torsionales 1D<br/>Default: "ps_04282011"<br/></dd>
<dt><b>-arg_cation_pi_his_can_be_pi</b> \<Boolean\></dt>
<dd>Para el término de puntuación arg_cation_pi. ¿Puede la histidina ser el lado pi de una interacción catión-pi de arginina?<br/>Default: true<br/></dd>
<dt><b>-mc_optimize_dG</b> \<Boolean\></dt>
<dd>Optimizar el dG durante MonteCarlo. No es posible hacerlo dentro de la puntuación global, 			pero donde sea posible, se hace durante las llamadas a MC. Esta opción no usa globalmente el objeto MonteCarloInterface, sino que es específica de cada protocolo. 			Esto se debe a que necesita conocer la interfaz sobre la que se usará. 			El dG se mide con InterfaceAnalyzerMover. 			El código compatible por ahora es RosettaAntibodyDesign y RosettaDock<br/>Default: false<br/></dd>
<dt><b>-mc_interface_weight</b> \<Real\></dt>
<dd>Peso de la puntuación de interfaz si se usa MonteCarloInterface con un protocolo concreto.<br/>Default: 1.0<br/></dd>
<dt><b>-mc_total_weight</b> \<Real\></dt>
<dd>Peso de la puntuación total si se usa MonteCarloInterface con un protocolo concreto<br/>Default: 0.0<br/></dd>
<dt><b>-force_sugar_bb_zero</b> \<Boolean\></dt>
<dd>Forzar que el peso de SugarBB sea cero desde get_score_function. 			Al usar include_sugars, el peso sugar_bb se añade automáticamente. 			Esto lo anula con fines de benchmark<br/>Default: false<br/></dd>
<dt><b>-voids_penalty_energy_containing_cones_cutoff</b> \<Integer\></dt>
<dd>Un parámetro del término de puntuación voids_penalty. El número mínimo de conos proyectados desde las cadenas laterales en los que debe estar un vóxel para considerarlo enterrado. Por defecto, 6 conos.<br/>Default: 6<br/></dd>
<dt><b>-voids_penalty_energy_cone_dotproduct_cutoff</b> \<Real\></dt>
<dd>Un parámetro del término de puntuación voids_penalty. El valor de corte del producto escalar entre el vector de un cono y el vector de un punto de prueba de la base del cono, por debajo del cual se declara que el punto de prueba no está dentro del cono. En la práctica, es el ancho del cono. Los valores menores hacen conos más anchos. Por defecto, 0.1. Puede ir de 1.0 (cono infinitamente delgado) a -1.0 (volumen esférico completo), y 0.0 representa todos los puntos de un lado del plano perpendicular al vector del cono.<br/>Default: 0.1<br/></dd>
<dt><b>-voids_penalty_energy_cone_distance_cutoff</b> \<Real\></dt>
<dd>Un parámetro del término de puntuación voids_penalty. El valor de corte de la distancia desde la base del cono a partir de la cual se considera que ya no se está dentro del cono. Por defecto, 8.0 Å.<br/>Default: 8.0<br/></dd>
<dt><b>-voids_penalty_energy_disabled_except_during_packing</b> \<Boolean\></dt>
<dd>Si es true, el término voids_penalty solo se evalúa durante el empaquetado (no durante la puntuación ni la minimización). Si es false, se evalúa durante el empaquetado y la puntuación (pero no durante la minimización). True por defecto. Se puede anular en una ScoreFunction concreta, instancia por instancia.<br/>Default: true<br/></dd>
<dt><b>-voids_penalty_energy_voxel_size</b> \<Real\></dt>
<dd>El tamaño, en Å, de los vóxeles de la rejilla de vóxeles para la energía voids_penalty. Por defecto, 0.5 Å (un cubo de 0.5 Å de lado).<br/>Default: 0.5<br/></dd>
<dt><b>-voids_penalty_energy_voxel_grid_padding</b> \<Real\></dt>
<dd>Un parámetro de la energía voids_penalty. Es el agrandamiento (en todos los lados) de la caja delimitadora del Pose al configurar la rejilla de vóxeles. Por defecto, un margen de 1.0 Å en todos los lados.<br/>Default: 1.0<br/></dd>
</dl>
+ <h3>-score:rna</h3>
<dl>
<dt><b>-rna</b> \<Boolean\></dt>
<dd>grupo de opciones rna<br/></dd>
<dt><b>-rna_base_pair_xy_filename</b> \<String\></dt>
<dd>Nombre del archivo donde se define el potencial XY de pares de bases de ARN<br/>Default: "scoring/rna/rna_base_pair_xy.dat"<br/></dd>
<dt><b>-disable_orientation_dependent_rna_ch_o_bonds</b> \<Boolean\></dt>
<dd>No usar el potencial dependiente de la orientación para los enlaces de hidrógeno carbono-hidrógeno del ARN<br/>Default: false<br/></dd>
<dt><b>-rna_suite_potential</b> \<String\></dt>
<dd>En el cálculo de ARN, directorio que contiene los potenciales de suite<br/>Default: "Richardson"<br/></dd>
<dt><b>-suiteness_bonus</b> \<String\></dt>
<dd>En el cálculo de ARN, directorio que contiene la definición de la bonificación de suiteness<br/>Default: "Richardson"<br/></dd>
<dt><b>-rna_torsion_skip_chainbreak</b> \<Boolean\></dt>
<dd>No puntuar las torsiones de ARN situadas en los chain_breaks (aparte de las que se cerrarán)<br/>Default: true<br/></dd>
<dt><b>-rna_chemical_shift_verbose</b> \<Boolean\></dt>
<dd>imprimir los desplazamientos químicos; útil para depurar<br/>Default: false<br/></dd>
<dt><b>-rna_chemical_shift_larmord</b> \<Boolean\></dt>
<dd>Usar LARMORD para calcular los desplazamientos químicos de 1H<br/>Default: false<br/></dd>
<dt><b>-rna_chemical_shift_exp_data</b> \<String\></dt>
<dd>rna_chemical_shift_exp_data<br/>Default: ""<br/></dd>
<dt><b>-rna_chemical_shift_larmord_par</b> \<String\></dt>
<dd>archivo de parámetros de larmord<br/>Default: "larmord_1.0_nocut_parameters.dat"<br/></dd>
<dt><b>-rna_chemical_shift_larmord_wt</b> \<String\></dt>
<dd>archivo de precisión esperada de larmord<br/>Default: "larmord_noweights.txt"<br/></dd>
<dt><b>-rna_chemical_shift_larmord_ref</b> \<String\></dt>
<dd>archivo de desplazamientos químicos de referencia de larmord<br/>Default: "larmord_1.0_reference_shifts.dat"<br/></dd>
<dt><b>-rna_chemical_shift_larmord_nei</b> \<String\></dt>
<dd>archivo de desplazamientos de átomos vecinos de larmord<br/>Default: "larmord_1.0_neighbor_atoms.dat"<br/></dd>
<dt><b>-rna_chemical_shift_larmord_cut</b> \<Real\></dt>
<dd>corte de distancia de larmord<br/>Default: 9999.9<br/></dd>
<dt><b>-rna_chemical_shift_larmord_beta</b> \<Real\></dt>
<dd>valor beta de larmord (el exponente)<br/>Default: -3.0<br/></dd>
<dt><b>-rna_chemical_shift_H5_prime_mode</b> \<String\></dt>
<dd>rna_chemical_shift_H5_prime_mode<br/>Default: ""<br/></dd>
<dt><b>-rna_chemical_shift_include_res</b> \<IntegerVector\></dt>
<dd>rna_chemical_shift_include_res<br/></dd>
<dt><b>-DMS_separate_features</b> \<Boolean\></dt>
<dd>en la puntuación DMS de ARN, calcular las puntuaciones de enlace a N1, ocupación y energía de unión como si fueran características no correlacionadas y sumar las puntuaciones. <br/>Default: false<br/></dd>
<dt><b>-DMS_careful_base_pair_classifier</b> \<Boolean\></dt>
<dd>en la puntuación DMS de ARN de baja resolución, usar una clasificación detallada de pares de bases para evaluar la puntuación de baja resolución <br/>Default: false<br/></dd>
<dt><b>-rna_chem_map_lores_weight</b> \<Real\></dt>
<dd>En la puntuación de mapeo químico de ARN de baja resolución, intensidad final del término rna_chem_map_lores cuando se especifica -data_file.<br/>Default: 0.0<br/></dd>
<dt><b>-use_2prime_OH_potential</b> \<Boolean\></dt>
<dd>Usar un potencial torsional para el OH 2' del ARN.<br/>Default: true<br/></dd>
<dt><b>-use_rna_chi_potential</b> \<Boolean\></dt>
<dd>Usar un potencial chi para la torsión glicosídica del ARN.<br/>Default: true<br/></dd>
<dt><b>-include_neighbor_base_stacks</b> \<Boolean\></dt>
<dd>En el cálculo de puntuación de ARN, incluir los apilamientos entre i,i+1<br/>Default: false<br/></dd>
<dt><b>-FA_low_res_rnp_scoring</b> \<Boolean\></dt>
<dd>Puntuación de baja resolución de ARN/proteína usando residuos de proteína de todos los átomos<br/>Default: false<br/></dd>
<dt><b>-free_suite_bonus</b> \<Real\></dt>
<dd>Cantidad con la que se premia la virtualización de una suite de nucleótido<br/>Default: -1.0<br/></dd>
<dt><b>-free_sugar_bonus</b> \<Real\></dt>
<dd>Cantidad con la que se premia la virtualización de un azúcar/ribosa<br/>Default: -1.0<br/></dd>
<dt><b>-free_2HOprime_bonus</b> \<Real\></dt>
<dd>Cantidad con la que se premia la virtualización de un 2'-OH<br/>Default: -0.5<br/></dd>
<dt><b>-syn_G_potential_bonus</b> \<Real\></dt>
<dd>Cantidad con la que se premia la conformación chi syn de la guanosina<br/>Default: 0.0<br/></dd>
<dt><b>-rna_bulge_bonus_once_per_loop</b> \<Boolean\></dt>
<dd>Para el término stepwise heredado rna_bulge en ejecuciones SWM, calcular la bonificación de bulge por loop, en lugar de una bonificación por cada residuo virtual.<br/>Default: true<br/></dd>
<dt><b>-pack_phosphate_penalty</b> \<Real\></dt>
<dd>Cantidad con la que se penaliza la instanciación de un fosfato 5' o 3'<br/>Default: 0.25<br/></dd>
</dl>
+ <h3>-score:saxs</h3>
<dl>
<dt><b>-saxs</b> \<Boolean\></dt>
<dd>grupo de opciones saxs<br/></dd>
<dt><b>-min_score</b> \<Real\></dt>
<dd>valor mínimo de la puntuación saxs; el parámetro se usa para aplanar el embudo de energía en torno a su mínimo<br/>Default: -5<br/></dd>
<dt><b>-custom_ff</b> \<String\></dt>
<dd>Nombre del archivo de configuración que proporciona factores de forma adicionales<br/>Default: ""<br/></dd>
<dt><b>-print_i_calc</b> \<String\></dt>
<dd>Archivo donde escribir opcionalmente los espectros calculados escalados<br/>Default: ""<br/></dd>
<dt><b>-ref_fa_spectrum</b> \<File\></dt>
<dd>lee de un archivo el espectro de referencia de todos los átomos<br/></dd>
<dt><b>-ref_cen_spectrum</b> \<File\></dt>
<dd>lee de un archivo el espectro de referencia centroide<br/></dd>
<dt><b>-ref_spectrum</b> \<File\></dt>
<dd>lee de un archivo el espectro de referencia<br/></dd>
<dt><b>-ref_pddf</b> \<File\></dt>
<dd>lee la función de distribución de distancias entre pares de referencia<br/></dd>
<dt><b>-d_min</b> \<Real\></dt>
<dd>valor mínimo de distancia usado en la evaluación de la puntuación PDDF (en [A])<br/>Default: 5.0<br/></dd>
<dt><b>-d_max</b> \<Real\></dt>
<dd>valor máximo de distancia usado en la evaluación de la puntuación PDDF (en [A])<br/>Default: 100.0<br/></dd>
<dt><b>-d_step</b> \<Real\></dt>
<dd>paso de distancia usado en la evaluación de la puntuación PDDF (en [A])<br/>Default: 0.1<br/></dd>
<dt><b>-q_min</b> \<Real\></dt>
<dd>valor mínimo de q usado en los cálculos de espectros (en [A^-1])<br/>Default: 0.01<br/></dd>
<dt><b>-q_max</b> \<Real\></dt>
<dd>valor máximo de q usado en los cálculos de espectros (en [A^-1])<br/>Default: 0.25<br/></dd>
<dt><b>-q_step</b> \<Real\></dt>
<dd>paso de q usado en los cálculos de espectros (en [A^-1])<br/>Default: 0.01<br/></dd>
<dt><b>-fit_pddf_area</b> \<Boolean\></dt>
<dd>la curva PDDF de un Pose puntuado se normalizará para que coincida con el área bajo la curva PDDF de referencia<br/>Default: false<br/></dd>
</dl>
+ <h3>-score:fiber_diffraction</h3>
<dl>
<dt><b>-fiber_diffraction</b> \<Boolean\></dt>
<dd>grupo de opciones fiber_diffraction<br/></dd>
<dt><b>-layer_lines</b> \<File\></dt>
<dd>lee las líneas de capa (layer_lines) de un archivo<br/></dd>
<dt><b>-a</b> \<Real\></dt>
<dd>número de subunidades por repetición<br/>Default: 0<br/></dd>
<dt><b>-b</b> \<Real\></dt>
<dd>número de vueltas por repetición<br/>Default: 0<br/></dd>
<dt><b>-p</b> \<Real\></dt>
<dd>elevación de la subunidad<br/>Default: 0<br/></dd>
<dt><b>-radius</b> \<Real\></dt>
<dd>radio helicoidal<br/>Default: 0<br/></dd>
<dt><b>-resolution_cutoff_low</b> \<Real\></dt>
<dd>ignorar los datos de intensidad por debajo de este punto<br/>Default: 0.05<br/></dd>
<dt><b>-resolution_cutoff_high</b> \<Real\></dt>
<dd>ignorar los datos de intensidad por encima de este punto<br/>Default: 0.5<br/></dd>
<dt><b>-max_bessel_order</b> \<Integer\></dt>
<dd>número máximo de órdenes de Bessel usados en las simulaciones<br/>Default: 50<br/></dd>
<dt><b>-cn_symmetry</b> \<Integer\></dt>
<dd>simetría cn en un nivel z (a lo largo del eje fibrilar)<br/>Default: 0<br/></dd>
<dt><b>-b_factor</b> \<Real\></dt>
<dd>valor de b_factor<br/>Default: 20<br/></dd>
<dt><b>-b_factor_solv</b> \<Real\></dt>
<dd>valor de b_factor_solv<br/>Default: 400<br/></dd>
<dt><b>-b_factor_solv_K</b> \<Real\></dt>
<dd>valor de b_factor_solv_K<br/>Default: 0.4<br/></dd>
<dt><b>-grid_reso</b> \<Real\></dt>
<dd>resolución para el muestreo de densidad en la rejilla<br/>Default: 0.5<br/></dd>
<dt><b>-grid_r</b> \<Integer\></dt>
<dd>número de puntos de la rejilla a lo largo de r<br/>Default: 256<br/></dd>
<dt><b>-grid_phi</b> \<Integer\></dt>
<dd>número de puntos de la rejilla a lo largo de phi<br/>Default: 128<br/></dd>
<dt><b>-grid_z</b> \<Integer\></dt>
<dd>número de puntos de la rejilla a lo largo de z<br/>Default: 256<br/></dd>
<dt><b>-qfht_K1</b> \<Real\></dt>
<dd>valor de K1 para el muestreo de Hankel<br/>Default: 2.0<br/></dd>
<dt><b>-qfht_K2</b> \<Real\></dt>
<dd>valor de K2 para el muestreo de Hankel<br/>Default: 2.2<br/></dd>
<dt><b>-chi_iterations</b> \<Integer\></dt>
<dd>número de iteraciones para calcular chi, p. ej., el número de líneas de capa<br/>Default: 0<br/></dd>
<dt><b>-rfactor_refinement</b> \<Boolean\></dt>
<dd>refinamiento del factor R<br/>Default: false<br/></dd>
<dt><b>-output_fiber_spectra</b> \<Boolean\></dt>
<dd>Intensidad de salida, R recíproco, línea de capa<br/>Default: false<br/></dd>
<dt><b>-gpu_processor</b> \<Integer\></dt>
<dd>número del procesador GPU, para sistemas con más de uno<br/>Default: 0<br/></dd>
<dt><b>-centroid_density_mass</b> \<Real\></dt>
<dd>masa de densidad del centroide<br/>Default: 0.0<br/></dd>
</dl>
+ <h3>-score:occ_sol_fitted</h3>
<dl>
<dt><b>-occ_sol_fitted</b> \<Boolean\></dt>
<dd>grupo de opciones occ_sol_fitted<br/></dd>
<dt><b>-Ntrp_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos Ntrp<br/>Default: 1.0<br/></dd>
<dt><b>-NH2O_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos NH2O<br/>Default: 1.0<br/></dd>
<dt><b>-Nlys_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos Nlys<br/>Default: 1.0<br/></dd>
<dt><b>-Narg_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos Narg<br/>Default: 1.0<br/></dd>
<dt><b>-Nbb_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos Nbb<br/>Default: 1.0<br/></dd>
<dt><b>-Nhis_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos Nhis<br/>Default: 1.0<br/></dd>
<dt><b>-OH_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos OH<br/>Default: 1.0<br/></dd>
<dt><b>-ONH2_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos ONH2<br/>Default: 1.0<br/></dd>
<dt><b>-OOC_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos OOC<br/>Default: 1.0<br/></dd>
<dt><b>-Oaro_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos Oaro<br/>Default: 1.0<br/></dd>
<dt><b>-Oet2_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos Oet2<br/>Default: 1.0<br/></dd>
<dt><b>-Oet3_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos Oet3<br/>Default: 1.0<br/></dd>
<dt><b>-OCbb_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos OCbb<br/>Default: 1.0<br/></dd>
<dt><b>-HOH_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos HOH<br/>Default: 1.0<br/></dd>
<dt><b>-OPha_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos OPha<br/>Default: 1.0<br/></dd>
<dt><b>-OHha_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos OHha<br/>Default: 1.0<br/></dd>
<dt><b>-OC3_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos OC3<br/>Default: 1.0<br/></dd>
<dt><b>-OSi_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos OSi<br/>Default: 1.0<br/></dd>
<dt><b>-Oice_amp_scaling</b> \<Real\></dt>
<dd>factor de escala de la amplitud de la gaussiana de los átomos Oice<br/>Default: 1.0<br/></dd>
</dl>
+ <h3>-score:loop_close</h3>
<dl>
<dt><b>-loop_close</b> \<Boolean\></dt>
<dd>grupo de opciones loop_close<br/></dd>
<dt><b>-loop_fixed_cost</b> \<Real\></dt>
<dd>Para el término loop_close, un costo fijo de instanciar un extremo de una cadena gaussiana; calibrado con datos de bulges/loops de ARN<br/>Default: -0.29<br/></dd>
<dt><b>-allow_complex_loop_graph</b> \<Boolean\></dt>
<dd>Truco de LoopGraph: permitir compartir loops entre ciclos<br/>Default: true<br/></dd>
<dt><b>-use_6D_potential</b> \<Boolean\></dt>
<dd>para el modelado implícito de loops de ARN, usar potenciales 6D en lugar del modelo simple de cadena gaussiana 1D<br/>Default: false<br/></dd>
<dt><b>-force_6D_potential_file</b> \<String\></dt>
<dd>usar este potencial 6D para todos los loop_close en lugar de los archivos de la base de datos (¡solo para pruebas!)<br/>Default: ""<br/></dd>
<dt><b>-use_cubic_interp</b> \<Boolean\></dt>
<dd>interpolación cúbica para el potencial 6D, en lugar de polilineal<br/>Default: true<br/></dd>
</dl>
+ <h2>-multithreading</h2>
<dl>
<dt><b>-multithreading</b> \<Boolean\></dt>
<dd>grupo de opciones multithreading<br/></dd>
<dt><b>-total_threads</b> \<Integer\></dt>
<dd>El número de hilos que se lanzan en el grupo de hilos global. Todo el trabajo paralelizado por hilos se distribuirá entre estos hilos. Por defecto se lanza 1 hilo por proceso. Poner esto en 0 significa que se usarán todos los hilos disponibles en la compilación multihilo. La compilación por defecto (de un solo hilo) solo usa 1 hilo. IMPORTANTE: PARA APROVECHAR EL MULTIHILO, DEBES COMPILAR CON extras=cxx11thead Y DEBES PONER ESTO EN UN VALOR DISTINTO DE 1. Los valores superiores a 4 aproximadamente producen rendimientos decrecientes.<br/>Default: 1<br/></dd>
<dt><b>-interaction_graph_threads</b> \<Integer\></dt>
<dd>El número de hilos que el packer solicitará por defecto al calcular el grafo de interacciones. Esta opción solo se usa en la compilación multihilo (extras=cxx11thread) de Rosetta. Ten en cuenta que el número total de hilos debe fijarse con la opción -multi_threading:total_threads. A un trabajo de empaquetado concreto se le pueden asignar menos hilos de los solicitados, según la disponibilidad. Los protocolos también pueden anular la solicitud por defecto. El valor por defecto (0) significa que se usarán todos los hilos disponibles.<br/>Default: 0<br/></dd>
</dl>
+ <h2>-recon</h2>
<dl>
<dt><b>-recon</b> \<Boolean\></dt>
<dd>grupo de opciones recon<br/></dd>
<dt><b>-randomize</b> \<Boolean\></dt>
<dd>Aleatorizar el orden de los Poses de entrada para RECON MSD<br/>Default: false<br/></dd>
</dl>
+ <h2>-packing</h2>
<dl>
<dt><b>-packing</b> \<Boolean\></dt>
<dd>grupo de opciones Packing<br/></dd>
<dt><b>-repack_only</b> \<Boolean\></dt>
<dd>Desactivar el diseño en todas las posiciones<br/>Default: false<br/></dd>
<dt><b>-prevent_repacking</b> \<Boolean\></dt>
<dd>Desactivar el reempaquetado (o el diseño) en todas las posiciones<br/>Default: false<br/></dd>
<dt><b>-cenrot_cutoff</b> \<Real\></dt>
<dd>Corte para generar rotámeros centroide<br/>Default: 0.16<br/></dd>
<dt><b>-ignore_ligand_chi</b> \<Boolean\></dt>
<dd>Desactivar la generación de rotámeros basada en ángulos chi del archivo params en SingleLigandRotamerLibrary<br/>Default: false<br/></dd>
<dt><b>-quasisymmetry</b> \<Boolean\></dt>
<dd>Activar el empaquetado cuasisimétrico al usar RotamerLinks<br/>Default: false<br/></dd>
<dt><b>-ndruns</b> \<Integer\></dt>
<dd>Número de iteraciones de empaquetado fixbb. Cada vez que se empaqueta, se empaquetará este número de veces y se devolverá solo el mejor resultado. Se implementa a nivel de PackRotamersMover.<br/>Rango: 1-<br/>Default: 1<br/></dd>
<dt><b>-soft_rep_design</b> \<Boolean\></dt>
<dd>Usar radios LJ mayores para un potencial más suave<br/></dd>
<dt><b>-mainchain_h_rebuild_threshold</b> \<Real\></dt>
<dd>Corte para reconstruir los hidrógenos de la cadena principal durante la generación de rotámeros en el empaquetado. Si la posición del hidrógeno está a menos del umbral de su posición ideal, no se reconstruye. Por defecto, 0.75 Å.<br/>Default: 0.75<br/></dd>
<dt><b>-use_electrostatic_repulsion</b> \<Boolean\></dt>
<dd>Usar repulsión electrostática<br/></dd>
<dt><b>-dump_rotamer_sets</b> \<Boolean\></dt>
<dd>Escribir PDB de estilo RMN con los conjuntos de rotámeros usados durante el empaquetado<br/>Default: false<br/></dd>
<dt><b>-dunbrack_prob_buried</b> \<Real\></dt>
<dd>fracción de los rotámeros de Dunbrack posibles que se incluyen en cada conjunto de rotámeros de un solo residuo, para los residuos 'enterrados' de RotamericSingleResidueDunbrackLibrary<br/>Rango: 0-1<br/>Default: 0.98<br/></dd>
<dt><b>-dunbrack_prob_nonburied</b> \<Real\></dt>
<dd>fracción de los rotámeros de Dunbrack posibles que se incluyen en cada conjunto de rotámeros de un solo residuo, para los residuos 'no enterrados' de RotamericSingleResidueDunbrackLibrary<br/>Rango: 0-1<br/>Default: 0.95<br/></dd>
<dt><b>-dunbrack_prob_buried_semi</b> \<Real\></dt>
<dd>fracción de los rotámeros de Dunbrack posibles que se incluyen en cada conjunto de rotámeros de un solo residuo, para los residuos 'enterrados' de SemiRotamericSingleResidueDunbrackLibrary<br/>Rango: 0-1<br/>Default: 0.95<br/></dd>
<dt><b>-dunbrack_prob_nonburied_semi</b> \<Real\></dt>
<dd>fracción de los rotámeros de Dunbrack posibles que se incluyen en cada conjunto de rotámeros de un solo residuo, para los residuos 'no enterrados' de SemiRotamericSingleResidueDunbrackLibrary<br/>Rango: 0-1<br/>Default: 0.87<br/></dd>
<dt><b>-no_optH</b> \<Boolean\></dt>
<dd>No optimizar la colocación de hidrógenos al cargar un PDB<br/>Default: true<br/></dd>
<dt><b>-optH_MCA</b> \<Boolean\></dt>
<dd>Si se ejecuta optH, usar el Multi-Cool Annealer (más consistente, pero más lento)<br/>Default: false<br/></dd>
<dt><b>-pack_missing_sidechains</b> \<Boolean\></dt>
<dd>Ejecutar el packer para corregir los residuos con densidad de cadena lateral ausente al cargar el PDB<br/>Default: true<br/></dd>
<dt><b>-preserve_c_beta</b> \<Boolean\></dt>
<dd>Conservar las posiciones de los c-beta durante la construcción de rotámeros<br/></dd>
<dt><b>-flip_HNQ</b> \<Boolean\></dt>
<dd>Considerar el volteo de HIS, ASN y GLN durante la optimización de la colocación de hidrógenos (hay que desactivar -no_optimizeH)<br/></dd>
<dt><b>-fix_his_tautomer</b> \<IntegerVector\></dt>
<dd>números seqpos de los residuos de His cuyo tautómero debe fijarse durante el reempaquetado<br/>Default: []<br/></dd>
<dt><b>-print_pymol_selection</b> \<Boolean\></dt>
<dd>incluir selecciones al estilo de PyMOL al imprimir un PackerTask<br/>Default: false<br/></dd>
<dt><b>-extrachi_cutoff</b> \<Integer\></dt>
<dd>número de vecinos que debe tener un residuo antes de usar rotámeros adicionales. Por defecto: 18<br/>Default: 18<br/></dd>
<dt><b>-resfile</b> \<FileVector\></dt>
<dd>nombre o nombres de resfile. La mayoría de los protocolos usan solo el primero e ignoran el resto; no se sincroniza automáticamente con -s ni con -l.<br/>Default: ['"resfile"']<br/></dd>
<dt><b>-sc_branch_rotamers</b> \<Boolean\></dt>
<dd>construir rotámeros para cadenas laterales conjugadas. Advertencia: deforma la longitud y los ángulos del enlace de conjugación, por lo que debe seguirse de alguna corrección<br/>Default: ['false']<br/></dd>
<dt><b>-outeriterations_scaling</b> \<Real\></dt>
<dd>Multiplicador del número de iteraciones externas<br/>Default: 1.0<br/></dd>
<dt><b>-inneriterations_scaling</b> \<Real\></dt>
<dd>Multiplicador del número de iteraciones internas<br/>Default: 1.0<br/></dd>
<dt><b>-adducts</b> \<StringVector\></dt>
<dd>Da la lista de nombres de aductos que se generarán para las definiciones de residuos. 			Cada nombre de aducto puede ir seguido de un 			entero opcional, que da el número máximo de aductos 			de ese tipo que se generarán.<br/></dd>
<dt><b>-use_input_sc</b> \<Boolean\></dt>
<dd>Usar los rotámeros de la estructura de entrada en el empaquetado. 			Por defecto, las coordenadas de las cadenas laterales de entrada NO 			se incluyen en el conjunto de rotámeros, sino que se descartan 			antes del empaquetado inicial; con esta opción, 			los rotámeros de entrada NO se descartarán. 			Ten en cuenta que, una vez que los rotámeros iniciales 			se reemplazan por cualquier mecanismo, ya no se 			incluyen en el conjunto de rotámeros 			(rotámeros incluidos por coordenadas)<br/></dd>
<dt><b>-unboundrot</b> \<FileVector\></dt>
<dd>Leer rotámeros 'nativos' de los PDB suministrados. 			A diferencia de -use_input_sc, estos rotámeros no se perderán durante los reempaquetados. 			Esta opción requiere soporte específico del protocolo; 			NO está integrada en PackerTask.initialize_from_command_line()<br/></dd>
<dt><b>-max_rotbump_energy</b> \<Real\></dt>
<dd>descartar los rotámeros con malas interacciones con el fondo usando 				el corte indicado. Los valores deben estar en el rango de 0 a 5.0.<br/>Default: 5.0<br/></dd>
<dt><b>-lazy_ig</b> \<Boolean\></dt>
<dd>Forzar al packer a reservar siempre el almacenamiento de energías de pares, pero posponer 				el cálculo de energías hasta que se necesite cada RPE; cada RPE se 				calcula como máximo una vez. El uso de memoria es cuadrático en los rotámeros por residuo. 				InteractionGraphFactory preferirá el grafo de interacciones de memoria lineal 				al grafo de interacciones Lazy, así que indicar a la vez linmem_ig y lazy_ig 				resulta en el uso del grafo de interacciones de memoria lineal. Los IG de la serie Surface 				(cuando el peso de surface en la función de puntuación no es cero) también anulan este IG.<br/>Default: false<br/></dd>
<dt><b>-double_lazy_ig</b> \<Boolean\></dt>
<dd>Forzar al packer a posponer siempre la reserva de memoria Y el cálculo de energías 				hasta que se necesite cada RPE; cada RPE se calcula como máximo una vez. 				InteractionGraphFactory preferirá el grafo de interacciones de memoria lineal 				al grafo de interacciones DoubleLazy, así que indicar a la vez linmem_ig y lazy_ig 				resulta en el uso del grafo de interacciones de memoria lineal. Los IG de la serie Surface (cuando el peso 				de surface en la función de puntuación no es cero) también anulan este IG.<br/>Default: false<br/></dd>
<dt><b>-linmem_ig</b> \<Integer\></dt>
<dd>Forzar al packer a usar el grafo de interacciones de memoria lineal; cada 				RPE puede calcularse más de una vez, pero los RPE calculados recientemente 				se reutilizan. El parámetro entero especifica el número 				de rotámeros recientes para los que se guardan RPE. Se recomienda 10. 				El uso de memoria escala linealmente con el número de 				rotámeros, a unos 200 bytes por rotámero por cada rotámero reciente para el que 				se guardan RPE (~4 KB por rotámero por defecto)<br/>Default: 10<br/></dd>
<dt><b>-precompute_ig</b> \<Boolean\></dt>
<dd>Solicitar explícitamente el grafo de interacciones O(N^2), que precalcula todas las energías de dos cuerpos. Esta opción es anulada por linmem_ig.<br/>Default: false<br/></dd>
<dt><b>-multi_cool_annealer</b> \<Integer\></dt>
<dd>Annealer alternativo para el empaquetado. Ejecuta varios ciclos de quench en una primera etapa de enfriamiento y registra 			los N mejores estados de red que observa. Luego ejecuta sustituciones de rotámeros a baja temperatura con quench repetido 			a partir de cada uno de esos N mejores estados de red. Se recomienda 10.<br/></dd>
<dt><b>-sequence_symmetric_annealer</b> \<Boolean\></dt>
<dd>Si se usa, el packer hará que todas las cadenas terminen con la misma secuencia. 			Usa la información del pdb para enlazar residuos, 			de modo que todos los residuos con el mismo número de pdb serán el mismo aminoácido al final. 			Si un residuo no tiene pareja en todas las cadenas, no se le permitirá mutar. 			Como en la simetría tradicional, esto supone que todas las cadenas forman parte del mismo sistema simétrico. 			Es imposible tener, por ejemplo, las cadenas A+B+C donde A+B son simétricas y C es independiente.<br/>Default: false<br/></dd>
<dt><b>-smart_annealer</b> \<Boolean\></dt>
<dd>(requiere extras=tensorflow) Usa IA para guiar tu protocolo de empaquetado. Por ahora no se puede usar con multi_cool_annealer, pero quizá pronto sí.<br/>Default: false<br/></dd>
<dt><b>-smart_annealer_model</b> \<String\></dt>
<dd>(requiere extras=tensorflow) Elige qué red neuronal usar para el smart annealer. Consulta database/protocol_data/tensorflow_graphs/smart_annealer/ para ver las opciones. Indicar esta opción activa '-smart_annealer'<br/>Default: "jack3.07.1"<br/></dd>
<dt><b>-smart_annealer_cutoff</b> \<Real\></dt>
<dd>(requiere extras=tensorflow) Elige un número de 0 a 1 para ajustar qué tan agresivo es el smart annealer. Los números más altos son más agresivos (arriesgados) pero con una aceleración potencialmente mayor (la aceleración requiere -smart_annealer_pick_again false). Indicar esta opción activa '-smart_annealer'<br/>Default: 0.25<br/></dd>
<dt><b>-smart_annealer_pick_again</b> \<Boolean\></dt>
<dd>(requiere extras=tensorflow) Si está desactivada, el smart annealer simplemente omite los aminoácidos poco prometedores. Al activar esta opción, el annealer elige un rotámero prometedor para muestrear en esta ronda en lugar de omitirla. No da una aceleración, pero puede dar un mejor resultado final. Indicar esta opción activa '-smart_annealer'<br/>Default: true<br/></dd>
<dt><b>-smart_annealer_disable_during_quench</b> \<Boolean\></dt>
<dd>(requiere extras=tensorflow) Ejecutar la etapa final de quench de forma normal, sin importar cuán malo sea un aminoácido. Indicar esta opción activa '-smart_annealer'<br/>Default: true<br/></dd>
<dt><b>-minpack_temp_schedule</b> \<RealVector\></dt>
<dd>Programa de annealing alternativo para min_pack.<br/></dd>
<dt><b>-minpack_inner_iteration_scale</b> \<Integer\></dt>
<dd>El número de iteraciones internas por rotámero que se ejecutan a cada temperatura en min pack.<br/></dd>
<dt><b>-minpack_disable_bumpcheck</b> \<Boolean\></dt>
<dd>Desactivar la comprobación de choques en min pack (es decir, incluir rotámeros que chocan con el fondo.<br/></dd>
</dl>
+ <h3>-packing:ex1</h3>
<dl>
<dt><b>-ex1</b> \<Boolean\></dt>
<dd>usar subrotámeros chi1 adicionales para todos los residuos que superen el extrachi_cutoff<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>usar subrotámeros chi1 adicionales para todos los residuos que superen el extrachi_cutoff Los enteros que siguen a las opciones ex especifican el patrón de muestreo de los ángulos diedros chi. Actualmente hay 8 opciones; todas incluyen el ángulo diedro chi original. NO_EXTRA_CHI_SAMPLES          0          solo el diedro original; igual que no usar ninguna opción EX_ONE_STDDEV                 1 Por defecto  +/- una desviación estándar (sd); 3 muestras EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 muestras EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 muestras EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 muestras EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 muestras EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 muestras EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 muestras<br/>Default: 1<br/></dd>
<dt><b>-operate</b> \<Boolean\></dt>
<dd>aplicar operaciones especiales (consulta la clase RotamerOperation) a los rotámeros ex1<br/></dd>
</dl>
+ <h3>-packing:ex2</h3>
<dl>
<dt><b>-ex2</b> \<Boolean\></dt>
<dd>usar subrotámeros chi2 adicionales para todos los residuos que superen el extrachi_cutoff<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>usar subrotámeros chi2 adicionales para todos los residuos que superen el extrachi_cutoff Los enteros que siguen a las opciones ex especifican el patrón de muestreo de los ángulos diedros chi. Actualmente hay 8 opciones; todas incluyen el ángulo diedro chi original. NO_EXTRA_CHI_SAMPLES          0          solo el diedro original; igual que no usar ninguna opción EX_ONE_STDDEV                 1 Por defecto  +/- una desviación estándar (sd); 3 muestras EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 muestras EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 muestras EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 muestras EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 muestras EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 muestras EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 muestras<br/>Default: 1<br/></dd>
<dt><b>-operate</b> \<Boolean\></dt>
<dd>aplicar operaciones especiales (consulta la clase RotamerOperation) a los rotámeros ex2<br/></dd>
</dl>
+ <h3>-packing:ex3</h3>
<dl>
<dt><b>-ex3</b> \<Boolean\></dt>
<dd>usar subrotámeros chi1 adicionales para todos los residuos que superen el extrachi_cutoff<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>usar subrotámeros chi3 adicionales para todos los residuos que superen el extrachi_cutoff Los enteros que siguen a las opciones ex especifican el patrón de muestreo de los ángulos diedros chi. Actualmente hay 8 opciones; todas incluyen el ángulo diedro chi original. NO_EXTRA_CHI_SAMPLES          0          solo el diedro original; igual que no usar ninguna opción EX_ONE_STDDEV                 1 Por defecto  +/- una desviación estándar (sd); 3 muestras EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 muestras EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 muestras EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 muestras EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 muestras EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 muestras EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 muestras<br/>Default: 1<br/></dd>
<dt><b>-operate</b> \<Boolean\></dt>
<dd>aplicar operaciones especiales (consulta la clase RotamerOperation) a los rotámeros ex3<br/></dd>
</dl>
+ <h3>-packing:ex4</h3>
<dl>
<dt><b>-ex4</b> \<Boolean\></dt>
<dd>usar subrotámeros chi1 adicionales para todos los residuos que superen el extrachi_cutoff<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>usar subrotámeros chi4 adicionales para todos los residuos que superen el extrachi_cutoff Los enteros que siguen a las opciones ex especifican el patrón de muestreo de los ángulos diedros chi. Actualmente hay 8 opciones; todas incluyen el ángulo diedro chi original. NO_EXTRA_CHI_SAMPLES          0          solo el diedro original; igual que no usar ninguna opción EX_ONE_STDDEV                 1 Por defecto  +/- una desviación estándar (sd); 3 muestras EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 muestras EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 muestras EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 muestras EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 muestras EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 muestras EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 muestras<br/>Default: 1<br/></dd>
<dt><b>-operate</b> \<Boolean\></dt>
<dd>aplicar operaciones especiales (consulta la clase RotamerOperation) a los rotámeros ex4<br/></dd>
</dl>
+ <h3>-packing:ex1aro</h3>
<dl>
<dt><b>-ex1aro</b> \<Boolean\></dt>
<dd>usar subrotámeros chi1 adicionales para los residuos aromáticos que superen el extrachi_cutoff<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>usar subrotámeros chi1 adicionales para todos los residuos que superen el extrachi_cutoff Los enteros que siguen a las opciones ex especifican el patrón de muestreo de los ángulos diedros chi. Actualmente hay 8 opciones; todas incluyen el ángulo diedro chi original. NO_EXTRA_CHI_SAMPLES          0          solo el diedro original; igual que no usar ninguna opción EX_ONE_STDDEV                 1 Por defecto  +/- una desviación estándar (sd); 3 muestras EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 muestras EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 muestras EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 muestras EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 muestras EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 muestras EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 muestras<br/>Default: 1<br/></dd>
</dl>
+ <h3>-packing:ex2aro</h3>
<dl>
<dt><b>-ex2aro</b> \<Boolean\></dt>
<dd>usar subrotámeros chi1 adicionales para los residuos aromáticos que superen el extrachi_cutoff<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>usar subrotámeros chi2 adicionales para todos los residuos que superen el extrachi_cutoff Los enteros que siguen a las opciones ex especifican el patrón de muestreo de los ángulos diedros chi. Actualmente hay 8 opciones; todas incluyen el ángulo diedro chi original. NO_EXTRA_CHI_SAMPLES          0          solo el diedro original; igual que no usar ninguna opción EX_ONE_STDDEV                 1 Por defecto  +/- una desviación estándar (sd); 3 muestras EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 muestras EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 muestras EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 muestras EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 muestras EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 muestras EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 muestras<br/>Default: 1<br/></dd>
</dl>
+ <h3>-packing:ex1aro_exposed</h3>
<dl>
<dt><b>-ex1aro_exposed</b> \<Boolean\></dt>
<dd>usar subrotámeros chi1 adicionales para todos los residuos aromáticos<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>usar subrotámeros chi1 adicionales para todos los residuos aromáticos Los enteros que siguen a las opciones ex especifican el patrón de muestreo de los ángulos diedros chi. Actualmente hay 8 opciones; todas incluyen el ángulo diedro chi original. NO_EXTRA_CHI_SAMPLES          0          solo el diedro original; igual que no usar ninguna opción EX_ONE_STDDEV                 1 Por defecto  +/- una desviación estándar (sd); 3 muestras EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 muestras EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 muestras EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 muestras EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 muestras EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 muestras EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 muestras<br/>Default: 1<br/></dd>
</dl>
+ <h3>-packing:ex2aro_exposed</h3>
<dl>
<dt><b>-ex2aro_exposed</b> \<Boolean\></dt>
<dd>usar subrotámeros chi2 adicionales para todos los residuos aromáticos<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>usar subrotámeros chi2 adicionales para todos los residuos aromáticos Los enteros que siguen a las opciones ex especifican el patrón de muestreo de los ángulos diedros chi. Actualmente hay 8 opciones; todas incluyen el ángulo diedro chi original. NO_EXTRA_CHI_SAMPLES          0          solo el diedro original; igual que no usar ninguna opción EX_ONE_STDDEV                 1 Por defecto  +/- una desviación estándar (sd); 3 muestras EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 muestras EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 muestras EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 muestras EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 muestras EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 muestras EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 muestras<br/>Default: 1<br/></dd>
</dl>
+ <h3>-packing:exdna</h3>
<dl>
<dt><b>-exdna</b> \<Boolean\></dt>
<dd>usar rotámeros de ADN adicionales<br/></dd>
<dt><b>-level</b> \<Integer\></dt>
<dd>nivel de muestreo de rotámeros de ADN adicionales: rotbuilder lo convierte de 0-7 a un número<br/>Default: 1<br/></dd>
</dl>
+ <h3>-packing:packer_palette</h3>
<dl>
<dt><b>-packer_palette</b> \<Boolean\></dt>
<dd>grupo de opciones packer_palette<br/></dd>
<dt><b>-extra_base_type_file</b> \<File\></dt>
<dd>Las PackerPalettes definen el conjunto de tipos de residuo con los que se diseña, y las TaskOperations permiten desactivar tipos en posiciones concretas. La PackerPalette por defecto incluye los veinte aminoácidos canónicos. Si se usa esta opción para proporcionar un archivo con una lista de nombres de tipos de residuo separados por espacios en blanco, la PackerPalette por defecto incluirá esos tipos de residuo adicionales.<br/></dd>
<dt><b>-NCAA_expanded</b> \<Boolean\></dt>
<dd>Diseñar posiciones como beta-AA, oligoureas y poliaramidas con un conjunto de opciones por defecto<br/></dd>
</dl>
+ <h2>-archive</h2>
<dl>
<dt><b>-archive</b> \<Boolean\></dt>
<dd>grupo de opciones archive<br/></dd>
<dt><b>-reread_all_structures</b> \<Boolean\></dt>
<dd>ignorar el archivo pool... volver a leer de los lotes<br/>Default: false<br/></dd>
<dt><b>-completion_notify_frequency</b> \<Integer\></dt>
<dd>indicarle a Archive cada X decoys completados<br/>Default: 100<br/></dd>
</dl>
+ <h2>-carbohydrates</h2>
<dl>
<dt><b>-carbohydrates</b> \<Boolean\></dt>
<dd>grupo de opciones carbohydrates<br/></dd>
<dt><b>-glycam_pdb_format</b> \<Boolean\></dt>
<dd>Indica que los archivos PDB de entrada fueron generados por GLYCAM y, por lo tanto, une cualquier \"residuo\" HO- o RO- con el siguiente, ya que Rosetta es lo bastante inteligente para parchear los extremos reductores. El valor por defecto es false.<br/>Default: false<br/></dd>
<dt><b>-linkage_conformer_data_file</b> \<String\></dt>
<dd>Especifica el archivo donde se guardan los datos estadísticos de ángulos de torsión de los confórmeros de enlaces glicosídicos. El directorio por defecto es database/chemical/carbohydrates/linkage_conformers/, pero se puede indicar cualquier ruta. El nombre de archivo por defecto es default.table<br/>Default: "default.table"<br/></dd>
<dt><b>-saccharide_sequence</b> \<String\></dt>
<dd>Secuencia de sacáridos de entrada que se va a construir.<br/></dd>
</dl>
+ <h3>-carbohydrates:glycopeptide_docking</h3>
<dl>
<dt><b>-glycopeptide_docking</b> \<Boolean\></dt>
<dd>grupo de opciones glycopeptide_docking<br/></dd>
<dt><b>-residue_to_glycosylate</b> \<String\></dt>
<dd>Indica al protocolo de glicosilación qué residuo se está glicosilando.<br/></dd>
<dt><b>-anchor_residue</b> \<String\></dt>
<dd>Indica al protocolo de glicosilación qué residuo se está glicosilando.<br/></dd>
<dt><b>-low_res</b> \<Boolean\></dt>
<dd>Indica al protocolo de glicosilación si debe realizar un refinamiento de baja resolución del sustrato.<br/>Default: false<br/></dd>
<dt><b>-high_res_outer_cycles</b> \<Integer\></dt>
<dd>Cuántos ciclos externos de MC ejecutar con el refinamiento de alta resolución.<br/>Default: 10<br/></dd>
<dt><b>-low_res_outer_cycles</b> \<Integer\></dt>
<dd>Cuántos ciclos externos de MC ejecutar con el refinamiento de baja resolución.<br/>Default: 30<br/></dd>
<dt><b>-low_res_inner_cycles</b> \<Integer\></dt>
<dd>Cuántos ciclos internos de muestreo de torsiones ejecutar con el refinamiento de baja resolución.<br/>Default: 50<br/></dd>
<dt><b>-high_res</b> \<Boolean\></dt>
<dd>Indica al protocolo de glicosilación si debe realizar un refinamiento de alta resolución del sustrato.<br/>Default: true<br/></dd>
<dt><b>-substrate_type</b> \<String\></dt>
<dd>Indica el tipo de sustrato que se está glicosilando, es decir, péptido, proteína, lípido, etc.<br/>Default: "peptide"<br/></dd>
<dt><b>-tree_type</b> \<String\></dt>
<dd>Indica el tipo de FoldTree que se usará, es decir, outward o downstream<br/>Default: "outward"<br/></dd>
<dt><b>-randomize_substrate_torsions</b> \<Boolean\></dt>
<dd>Aleatorizar las torsiones del sustrato antes de ejecutar el protocolo. Siempre activado en el docking ab initio. Se puede activar para el refinamiento.<br/>Default: false<br/></dd>
<dt><b>-enable_backbone_moves_pp</b> \<Boolean\></dt>
<dd>Activar movimientos de la cadena principal para el sustrato peptídico.<br/>Default: true<br/></dd>
<dt><b>-prevent_anchor_repacking</b> \<Boolean\></dt>
<dd>Impedir que el residuo glicosilado del sustrato se reempaquete.<br/>Default: true<br/></dd>
<dt><b>-sugardonor_residue</b> \<String\></dt>
<dd>Número de residuo de UDPGalNac (u otra entidad donadora de azúcar) en la numeración de Rosetta, para calcular la distancia con el carbono anomérico<br/>Default: "-1"<br/></dd>
<dt><b>-output_debug_pdbs</b> \<Boolean\></dt>
<dd>escribe un gran número de conformaciones intermedias de los protocolos de baja y alta resolución<br/>Default: false<br/></dd>
<dt><b>-fix_weights</b> \<Boolean\></dt>
<dd>el valor inicial del peso repulsivo se aumenta por error en lugar de disminuirse: corregirlo<br/>Default: true<br/></dd>
<dt><b>-nevery_interface</b> \<String\></dt>
<dd>Cada N-ésimo movimiento en el modo de alta resolución para reempaquetar los residuos de la interfaz<br/>Default: "8"<br/></dd>
<dt><b>-ntotal_backbone</b> \<String\></dt>
<dd>Total de movimientos de la cadena principal/rígidos en el modo de alta resolución<br/>Default: "16"<br/></dd>
<dt><b>-allow_glycan_torsion_moves</b> \<Boolean\></dt>
<dd>Añadir el glicano al MoveMap de torsiones en alta resolución<br/>Default: false<br/></dd>
<dt><b>-interface_distance</b> \<Real\></dt>
<dd>Distancia de interfaz para el reempaquetado de cadenas laterales en el modo de alta resolución<br/>Default: 8.0<br/></dd>
<dt><b>-score_only</b> \<Boolean\></dt>
<dd>Omitir el docking. Solo puntuar, con todas las métricas de docking de glicopéptidos/péptidos.<br/>Default: false<br/></dd>
<dt><b>-output_distance_metrics</b> \<Boolean\></dt>
<dd>Escribir métricas de distancia adicionales.<br/>Default: false<br/></dd>
<dt><b>-preglycosylate_residues</b> \<String\></dt>
<dd>Posiciones de residuos separadas por comas, en la numeración interna de Rosetta.<br/></dd>
<dt><b>-preglycosylate_sugar_names</b> \<String\></dt>
<dd>Nombres de azúcares separados por comas (p. ej., GalpNAc). Su número debe coincidir con el de la opción -glycopeptide_docking:preglycosylate_residues<br/></dd>
</dl>
+ <h3>-carbohydrates:glycan_sampler</h3>
<dl>
<dt><b>-glycan_sampler</b> \<Boolean\></dt>
<dd>grupo de opciones glycan_sampler<br/></dd>
<dt><b>-glycan_sampler_test</b> \<Boolean\></dt>
<dd>Indica que se entre en modo de prueba para Glycan Relax. Probará todas las torsiones de un PDB dado de forma lineal<br/>Default: false<br/></dd>
<dt><b>-glycan_sampler_rounds</b> \<Integer\></dt>
<dd>Número de rondas que se usarán en Glycan Relax. El total de rondas es este número por el número de residuos de glicano en el MoveMap<br/>Default: 100<br/></dd>
<dt><b>-min_rings</b> \<Boolean\></dt>
<dd>¿Minimizar los anillos de carbohidratos durante la minimización? De lo contrario, se mantienen en sus valores de entrada (lo recomendado).<br/>Default: false<br/></dd>
<dt><b>-final_min_glycans</b> \<Boolean\></dt>
<dd>¿Hacer una minimización final de los glicanos tras el protocolo glycan relax?<br/>Default: true<br/></dd>
<dt><b>-glycan_sampler_movie</b> \<Boolean\></dt>
<dd>Hacer una película de las aceptaciones y los intentos (enviar a pymol)<br/>Default: false<br/></dd>
<dt><b>-glycan_sampler_kt</b> \<Real\></dt>
<dd>KT para GlycanRelaxMover<br/>Default: 2.0<br/></dd>
<dt><b>-glycan_sampler_refine</b> \<Boolean\></dt>
<dd>Configura el protocolo para que no parta de una conformación aleatoria, sino que refine la estructura.<br/>Default: false<br/></dd>
<dt><b>-cartmin</b> \<Boolean\></dt>
<dd>Usar minimización en espacio cartesiano en lugar de diedra<br/>Default: false<br/></dd>
<dt><b>-tree_based_min_pack</b> \<Boolean\></dt>
<dd>Usar un método basado en árbol aleatorio para minimizar y empaquetar, en lugar de minimizar y empaquetar todos los glicanos durante la selección aleatoria del mover. Esto hace que la velocidad del algoritmo sea casi lineal al añadir más glicanos y se pierde menos tiempo empaquetando y minimizando<br/>Default: true<br/></dd>
<dt><b>-population_based_conformer_sampling</b> \<Boolean\></dt>
<dd>Usar las poblaciones de los confórmeros como probabilidades durante el muestreo de confórmeros de enlaces. Esto dificulta superar las barreras de energía con los confórmeros más raros<br/>Default: false<br/></dd>
<dt><b>-use_gaussian_sampling</b> \<Boolean\></dt>
<dd>Define si las torsiones de los confórmeros se construyen con una gaussiana del ángulo o con un muestreo uniforme de hasta 1 SD (por defecto)<br/>Default: true<br/></dd>
</dl>
+ <h3>-carbohydrates:glycan_dock</h3>
<dl>
<dt><b>-glycan_dock</b> \<Boolean\></dt>
<dd>grupo de opciones glycan_dock<br/></dd>
<dt><b>-n_repeats</b> \<Integer\></dt>
<dd>Número de veces que se reinicia el algoritmo GlycanDock empezando en la Etapa 2 si el modelo acoplado final no pasa el filtro de calidad (< 0 de energía de interacción de Rosetta). Por defecto = 3<br/>Default: 3<br/></dd>
<dt><b>-refine_only</b> \<Boolean\></dt>
<dd>Realizar solo el refinamiento del complejo putativo de entrada. Omite la Etapa 1 (inicialización conformacional mediante una perturbación aleatoria) y, durante la Etapa 2, no realiza perturbaciones grandes en el espacio de ángulos de torsión glicosídicos. Por defecto = false<br/>Default: false<br/></dd>
<dt><b>-prepack_only</b> \<Boolean\></dt>
<dd>Realizar solo el pre-empaquetado de la Etapa 0 del complejo putativo de entrada. Separa el glicoligando de su receptor proteico y optimiza todas las conformaciones de rotámeros de las cadenas laterales. Por defecto = false<br/>Default: false<br/></dd>
<dt><b>-rand_glycan_jump_res</b> \<Boolean\></dt>
<dd>Usar un residuo aleatorio del glicoligando que no sea punto de ramificación como residuo de salto (Jump) para el FoldTree de docking. Por defecto = true. False = FoldTree de docking en el que el residuo más cercano al centro de masa del glicoligando actúa como residuo de salto<br/>Default: true<br/></dd>
<dt><b>-stage1_rotate_glycan_about_com</b> \<Boolean\></dt>
<dd>Durante la inicialización conformacional de la Etapa 1, rotar el glicoligando alrededor de su centro de masa en un espacio 3D uniforme. Por defecto = false. Se recomienda ponerlo en true si la confianza en la orientación de cuerpo rígido del glicoligando en el sitio de unión putativo es baja.<br/>Default: false<br/></dd>
<dt><b>-stage1_perturb_glycan_com_trans_mag</b> \<Real\></dt>
<dd>Durante la inicialización conformacional de la Etapa 1, esta es la magnitud con la que se realiza una perturbación gaussiana traslacional aleatoria del centro de masa del glicoligando. Por defecto = 0.5 (Å)<br/>Default: 0.5<br/></dd>
<dt><b>-stage1_perturb_glycan_com_rot_mag</b> \<Real\></dt>
<dd>Durante la inicialización conformacional de la Etapa 1, esta es la magnitud con la que se realiza una perturbación gaussiana rotacional aleatoria del centro de masa del glicoligando. Por defecto = 7.5 (grados)<br/>Default: 7.5<br/></dd>
<dt><b>-stage1_torsion_uniform_pert_mag</b> \<Real\></dt>
<dd>Durante la inicialización conformacional de la Etapa 1, la magnitud usada para realizar una perturbación uniforme de cada ángulo de torsión glicosídico phi, psi y omega. Por defecto = 12.5 (grados). stage1_use_LinkageConformerMover debe ser false.<br/>Default: 12.5<br/></dd>
<dt><b>-mc_kt</b> \<Real\></dt>
<dd>Durante el docking y el refinamiento de la Etapa 2, el valor de kT usado para aceptar o rechazar movimientos según el criterio de Metropolis. Por defecto = 0.6<br/>Default: 0.6<br/></dd>
<dt><b>-n_rigid_body_rounds</b> \<Integer\></dt>
<dd>Durante el docking y el refinamiento de la Etapa 2, el número de rondas de muestreo de cuerpo rígido que se realizan en cada ciclo. Por defecto = 8<br/>Default: 8<br/></dd>
<dt><b>-slide_glycan_into_contact</b> \<Boolean\></dt>
<dd>Durante el docking y el refinamiento de la Etapa 2, deslizar ocasionalmente el glicoligando hacia el centro de masa de la proteína. Ayuda a garantizar que el glicoligando no se aleje de la superficie del receptor proteico durante el docking. Por defecto = true. Nota: si el receptor proteico tiene varios IDs de cadena, su centro de masa puede hacer que el glicoligando se aleje mucho de su ubicación inicial. Se recomienda que el receptor proteico tenga un solo ID de cadena (p. ej., la cadena A) o poner esto en false.<br/>Default: true<br/></dd>
<dt><b>-stage2_trans_mag</b> \<Real\></dt>
<dd>Durante el docking y el refinamiento de la Etapa 2, esta es la magnitud con la que se realiza una perturbación gaussiana traslacional del centro de masa del glicoligando. La perturbación se acepta o se rechaza según el criterio de Metropolis. Por defecto = 0.5 (Å)<br/>Default: 0.5<br/></dd>
<dt><b>-stage2_rot_mag</b> \<Real\></dt>
<dd>Durante el docking y el refinamiento de la Etapa 2, esta es la magnitud con la que se realiza una perturbación gaussiana rotacional del centro de masa del glicoligando. La perturbación se acepta o se rechaza según el criterio de Metropolis. Por defecto = 7.5 (grados)<br/>Default: 7.5<br/></dd>
<dt><b>-n_torsion_rounds</b> \<Integer\></dt>
<dd>Durante el docking y el refinamiento de la Etapa 2, el número de rondas de muestreo de ángulos de torsión glicosídicos que se realizan en cada ciclo. Por defecto = 8<br/>Default: 8<br/></dd>
<dt><b>-full_packing_frequency</b> \<Integer\></dt>
<dd>Durante el docking y el refinamiento de la Etapa 2, la frecuencia con la que se aplica una operación de empaquetado completo mediante PackRotamersMover. Por defecto = 8. Debe ser un factor de n_rigid_body_rounds y n_torsion_rounds. Cuando no se realiza un empaquetado completo, se aplica el más rápido EnergyCutRotamerTrialsMover.<br/>Default: 8<br/></dd>
<dt><b>-interface_packing_distance</b> \<Real\></dt>
<dd>Durante el docking y el refinamiento de la Etapa 2, la distancia usada para definir los residuos de la interfaz proteína-glicoligando para el empaquetado. Por defecto = 16 (Å). Se usa para la operación de tarea RestrictToInterface.<br/>Default: 16<br/></dd>
<dt><b>-ramp_scorefxn</b> \<Boolean\></dt>
<dd>Durante el docking y el refinamiento de la Etapa 2, aumentar gradualmente los términos de puntuación fa_atr y fa_rep. fa_atr se fija alto y fa_rep bajo, y luego se llevan de forma incremental a sus pesos iniciales a lo largo de n_cycles. Por defecto = true. Se usa para favorecer el muestreo al no imponer estrictamente la estérica rígida en las primeras etapas del protocolo.<br/>Default: true<br/></dd>
<dt><b>-watch_in_pymol</b> \<Boolean\></dt>
<dd>¿Ver el protocolo GlycanDock en PyMOL? Envía el Pose a PyMOL en pasos específicos fijados en el código. Por defecto = false. Se usa como alternativa a -show_simulation_in_pymol.<br/>Default: false<br/></dd>
</dl>
+ <h3>-carbohydrates:clash_check</h3>
<dl>
<dt><b>-clash_check</b> \<Boolean\></dt>
<dd>grupo de opciones clash_check<br/></dd>
<dt><b>-glycan_branches</b> \<StringVector\></dt>
<dd>Obligatorio. Vector de ramas de glicano. Numeración de residuos de Rosetta o tipo PDB como en RosettaScripts<br/></dd>
<dt><b>-check_chains</b> \<StringVector\></dt>
<dd>Obligatorio. Una lista de cadenas para calcular choques basados en cadenas. Si no se indica, ¡solo se calcularán los choques glicano-glicano!<br/></dd>
<dt><b>-soft_clash</b> \<Real\></dt>
<dd>Cuando calculamos distancias átomo-átomo con VDW, hay choque si la distancia < (atomI_vdw + atomJ_vdw)*(1 - soft_clash)<br/>Default: 0.33<br/></dd>
<dt><b>-cb_clash_distance</b> \<Real\></dt>
<dd>ACTUALMENTE NO SE USA. Distancia para la comprobación de choques por distancia CB. Un residuo choca si al menos 1 átomo está a menos de esta distancia<br/></dd>
<dt><b>-ignore_hydrogens</b> \<Boolean\></dt>
<dd>¿Debemos calcular solo los choques entre átomos pesados?<br/>Default: false<br/></dd>
<dt><b>-ignore_full_res_output</b> \<Boolean\></dt>
<dd>¿Debemos escribir en el archivo de puntuaciones la información de choques de cada residuo de glicano? Si se ignora, el archivo de puntuaciones será algo más pequeño.<br/>Default: false<br/></dd>
<dt><b>-output_per_glycan_data</b> \<Boolean\></dt>
<dd>¿Debemos escribir los datos por rama de glicano? Es fácil de calcular después si la salida por residuo completo está activada. <br/>Default: false<br/></dd>
</dl>
+ <h2>-rings</h2>
<dl>
<dt><b>-rings</b> \<Boolean\></dt>
<dd>grupo de opciones rings<br/></dd>
<dt><b>-ring_conformer_dbpath</b> \<File\></dt>
<dd>Ruta a los confórmeros de anillo en la base de datos de Rosetta<br/>Default: "chemical/ring_conformer_sets"<br/></dd>
<dt><b>-lock_rings</b> \<Boolean\></dt>
<dd>Define si el protocolo muestreará conformaciones alternativas de anillo (p. ej., volteos o plegamientos de anillo). Solo se muestrearán los confórmeros de baja energía, si se conocen. De lo contrario, se muestrearán todos los confórmeros de anillo ideales. El valor por defecto es false.<br/>Default: false<br/></dd>
<dt><b>-idealize_rings</b> \<Boolean\></dt>
<dd>Define si las conformaciones de anillo de los Poses de entrada se idealizan (se fijan en el confórmero de anillo de menor energía, según el archivo de topología de ese residuo). El valor por defecto es false: se usarán las conformaciones de anillo de entrada.<br/>Default: false<br/></dd>
<dt><b>-sample_high_energy_conformers</b> \<Boolean\></dt>
<dd>Define si el protocolo muestreará incluso las conformaciones de anillo que son máximos de energía. El valor por defecto es false; sin embargo, si los confórmeros de anillo de baja energía no figuran en los archivos de topología, se muestrearán de todos modos todos los confórmeros de anillo ideales.<br/>Default: false<br/></dd>
</dl>
+ <h2>-chemical</h2>
<dl>
<dt><b>-chemical</b> \<Boolean\></dt>
<dd>grupo de opciones chemical<br/></dd>
<dt><b>-exclude_patches</b> \<StringVector\></dt>
<dd>Nombres de los parches del conjunto de tipos de residuo que no deben aplicarse; si sabes qué parches no necesitas para una ejecución concreta, esta opción puede reducir el uso de memoria<br/></dd>
<dt><b>-include_patches</b> \<StringVector\></dt>
<dd>Nombres de los parches del conjunto de tipos de residuo que deben aplicarse aunque estén excluidos o comentados en patches.txt; útil para probar parches no predeterminados<br/></dd>
<dt><b>-add_atom_type_set_parameters</b> \<StringVector\></dt>
<dd>Archivos adicionales de parámetros extra de AtomTypeSet que deben leerse; el formato es una secuencia de cadenas por pares: <atom-type-set-tag1> <filename1> <atom-type-set-tag2> <filename2> ...<br/></dd>
<dt><b>-add_atom_types</b> \<StringVector\></dt>
<dd>Añade tipos de átomo adicionales a un AtomTypeSet usando archivos con el formato de atom_properties.txt; el formato de entrada es una secuencia de cadenas por pares: <atom-type-set-tag1> <filename1> <atom-type-set-tag2> <filename2> ...<br/></dd>
<dt><b>-add_mm_atom_type_set_parameters</b> \<StringVector\></dt>
<dd>Archivos adicionales de parámetros extra de MMAtomTypeSet que deben leerse; el formato es una secuencia de cadenas por pares: <mm-atom-type-set-tag1> <filename1> <mm-atom-type-set-tag2> <filename2> ...<br/></dd>
<dt><b>-set_atom_properties</b> \<StringVector\></dt>
<dd>Modifica las propiedades de los átomos (las de <atom-set>/atom_properties.txt) desde la línea de comandos. Ocurre al crear el AtomTypeSet dentro de ChemicalManager.cc. Formato: -chemical:set_atom_properties <atom-set1>:<atom_name1>:<param1>:<setting1> <atom-set2>:<atom2>:<param2>:<setting2> ... Por ejemplo: '-chemical:set_atom_properties fa_standard:OOC:LK_DGFREE:-5 fa_standard:ONH2:LJ_RADIUS:0.5' <br/></dd>
<dt><b>-patch_selectors</b> \<StringVector\></dt>
<dd>permite activar con esta opción los archivos de parche que tienen etiquetas CMDLINE_SELECTOR<br/>Default: []<br/></dd>
<dt><b>-override_rsd_type_limit</b> \<Boolean\></dt>
<dd>anular el límite del número de tipos de residuo.<br/>Default: false<br/></dd>
<dt><b>-clone_atom_types</b> \<StringVector\></dt>
<dd>Opcionalmente clona tipos de átomo; copia todas las propiedades, que luego pueden divergir mediante -set_atom_properties. El formato de -clone_atom_types debe ser: -clone_atom_types <set1>:<atomname1>:<cloned-atomname1> <set2>:<atomname2>:<cloned-atomname2> ...; por ejemplo: '-chemical:clone_atom_types fa_standard:OOC:OOC2' <br/></dd>
<dt><b>-reassign_atom_types</b> \<StringVector\></dt>
<dd>Cambia la asignación de tipos de átomo de los átomos de los tipos de residuo indicados. Útil junto con -clone_atom_types. El formato de -reassign_atom_types debe ser: -reassign_atom_types <rsd-type-set1-name>:<rsd-type1-name>:<atom-type1-name>:<new-atom-type1-name>   <rsd-type-set2-name>:<rsd-type2-name>:<atom-type2-name>:<new-atom-type2-name> ...; por ejemplo: '-chemical:reassign_atom_types fa_standard:ARG:NE:NtpR' <br/></dd>
<dt><b>-reassign_icoor</b> \<StringVector\></dt>
<dd>Actualiza los parámetros icoor de los tipos de átomo indicados. El formato de -reassign_icoor debe ser: -reassign_icoor <rsd-type-set1-name>:<rsd-type1-name>:<atom1-name>:<the-six-icoor-params-as-a-comma-separated-list>   <rsd-type-set2-name>:<rsd-type2-name>:<atom2-name>:<icoorparams2> ...; por ejemplo: -chemical:reassign_icoor fa_standard:ADE:UPPER:-180,60,1.6,O3',C3',C4' <br/></dd>
<dt><b>-set_atomic_charge</b> \<StringVector\></dt>
<dd>Modifica la carga atómica desde la línea de comandos. Ocurre al leer el archivo params, por lo que los cambios se propagarán a las versiones con parche del tipo de residuo. Formato: -chemical:set_atomic_charge <rsd-type-set1-name>:<rsd-type1-name>:<atom1-name>:<new-charge> <rsd-type-set2-name>:<rsd-type2-name>:<atom2-name>:<new-charge>  ... Por ejemplo: '-chemical:set_atomic_charge fa_standard:ARG:NE:-1' <br/></dd>
<dt><b>-set_patch_atomic_charge</b> \<StringVector\></dt>
<dd>Modifica la carga atómica de un parche desde la línea de comandos. Ocurre al leer el archivo de parche, por lo que los cambios se propagarán a las versiones con parche del tipo de residuo. Usa una versión simplificada del selector de residuos, así que probablemente no funcione con parches de lógica de selección compleja. El formato debe ser:  -chemical:set_patch_atomic_charge <rsd-type-set1-name>:<rsd-type1-name>:<patch-name>:<atom1-name>:<new-charge> ... Por ejemplo: '-chemical:set_atomic_charge fa_standard:PRO:NtermProteinFull:1H:-1' <br/></dd>
<dt><b>-enlarge_H_lj</b> \<Boolean\></dt>
<dd>Usar un LJ_WDEPTH mayor para los H y evitar choques en ARN<br/>Default: false<br/></dd>
<dt><b>-no_hbonds_to_ether_oxygens</b> \<Boolean\></dt>
<dd>sin enlaces de hidrógeno a los oxígenos éter de los ácidos nucleicos O3', O4', O5' -- obsoleto<br/>Default: false<br/></dd>
<dt><b>-unset_acceptor_ether_oxygens</b> \<Boolean\></dt>
<dd>los oxígenos éter de los ácidos nucleicos O3', O4', O5' no se cuentan como aceptores<br/>Default: false<br/></dd>
</dl>
+ <h2>-constraints</h2>
<dl>
<dt><b>-constraints</b> \<Boolean\></dt>
<dd>grupo de opciones constraints<br/></dd>
<dt><b>-exit_on_bad_read</b> \<Boolean\></dt>
<dd>salir si se encuentra un error al leer las restricciones<br/>Default: true<br/></dd>
<dt><b>-cst_file</b> \<StringVector\></dt>
<dd>nombre o nombres de archivos de restricciones (para proteínas, se aplican en modo centroide; si se indican varios archivos, se elegirá uno *aleatorio*).<br/></dd>
<dt><b>-cst_weight</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1.0<br/></dd>
<dt><b>-max_cst_dist</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 12.0<br/></dd>
<dt><b>-cst_fa_file</b> \<StringVector\></dt>
<dd>nombre o nombres de archivos de restricciones para todos los átomos. Si se indican varios archivos, se elegirá uno *aleatorio*.<br/></dd>
<dt><b>-cst_fa_weight</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1.0<br/></dd>
<dt><b>-normalize_mixture_func</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-penalize_mixture_func</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-forest_file</b> \<File\></dt>
<dd>archivo con constraintforest<br/>Default: ""<br/></dd>
<dt><b>-compute_total_dist_cst</b> \<Boolean\></dt>
<dd>solo relevante para depurar: atom_pair_constraints durante abinito depende de seq_sep; esto calcula también la puntuación sin tener en cuenta seq_sep<br/>Default: false<br/></dd>
<dt><b>-cull_with_native</b> \<Integer\></dt>
<dd>si se activa la opción, se descartan todas las restricciones que violan la estructura nativa en más de X<br/>Default: 1<br/></dd>
<dt><b>-dump_cst_set</b> \<File\></dt>
<dd>volcar el cstset_ a un archivo <br/>Default: ""<br/></dd>
<dt><b>-evaluate_max_seq_sep</b> \<IntegerVector\></dt>
<dd>evaluar las restricciones hasta esta seq-sep [vector]<br/>Default: 0<br/></dd>
<dt><b>-named</b> \<Boolean\></dt>
<dd>activar restricciones con nombre para evitar problemas con el cambio de tipos de residuo, p. ej., variantes de cutpoint<br/>Default: false<br/></dd>
<dt><b>-no_cst_in_relax</b> \<Boolean\></dt>
<dd>quitar las restricciones para relax<br/>Default: false<br/></dd>
<dt><b>-no_linearize_bounded</b> \<Boolean\></dt>
<dd>no pasar a lineal en la función BOUNDED<br/>Default: false<br/></dd>
<dt><b>-pocket_constraint_weight</b> \<Real\></dt>
<dd>Peso de la restricción de bolsillo (Pocket Constraint)<br/>Default: 0<br/></dd>
<dt><b>-pocket_zero_derivatives</b> \<Boolean\></dt>
<dd>Devolver cero en las derivadas de PocketConstaint<br/>Default: false<br/></dd>
<dt><b>-viol</b> \<Boolean\></dt>
<dd>mostrar las violaciones<br/>Default: false<br/></dd>
<dt><b>-viol_level</b> \<Integer\></dt>
<dd>cuánto detalle en la salida de violaciones<br/>Default: 1<br/></dd>
<dt><b>-viol_type</b> \<String\></dt>
<dd>trabajar solo con estos tipos de restricciones<br/>Default: ""<br/></dd>
<dt><b>-sog_cst_param</b> \<Real\></dt>
<dd>parámetro de peso para las restricciones SOGFunc<br/>Default: 0.0<br/></dd>
<dt><b>-sog_upper_bound</b> \<Real\></dt>
<dd>Corte superior para las restricciones SOGFunc<br/>Default: 10.0<br/></dd>
<dt><b>-epr_distance</b> \<Boolean\></dt>
<dd>usar el potencial de distancia EPR<br/>Default: false<br/></dd>
<dt><b>-combine</b> \<Integer\></dt>
<dd>combinar restricciones aleatoriamente en grupos conectados por OR (ambiguos). N->1<br/>Default: 1<br/></dd>
<dt><b>-combine_exclude_region</b> \<File\></dt>
<dd>archivo de definición del núcleo: no combinar restricciones que sean núcleo-núcleo<br/></dd>
<dt><b>-skip_redundant</b> \<Boolean\></dt>
<dd>omitir restricciones redundantes<br/>Default: false<br/></dd>
<dt><b>-skip_redundant_width</b> \<Integer\></dt>
<dd>radio de influencia de las restricciones redundantes<br/>Default: 2<br/></dd>
<dt><b>-force_pdb_info_mapping</b> \<BooleanVector\></dt>
<dd>forzar el mapeo de información PDB para los residuos del archivo cst, usando " " como cadena por defecto.<br/>Default: []<br/></dd>
</dl>
+ <h2>-corrections</h2>
<dl>
<dt><b>-corrections</b> \<Boolean\></dt>
<dd>grupo de opciones corrections<br/></dd>
<dt><b>-beta</b> \<Boolean\></dt>
<dd>Usar la función de puntuación beta más reciente (actualmente de enero de 2025)<br/>Default: false<br/></dd>
<dt><b>-beta_cart</b> \<Boolean\></dt>
<dd>Usar la función de puntuación beta más reciente (actualmente de enero de 2025) para la optimización no ideal<br/>Default: false<br/></dd>
<dt><b>-beta_jan25</b> \<Boolean\></dt>
<dd>Usar la función de puntuación beta de enero de 2025<br/>Default: false<br/></dd>
<dt><b>-beta_jan25_cart</b> \<Boolean\></dt>
<dd>Usar la función de puntuación beta de enero de 2025 para la optimización no ideal<br/>Default: false<br/></dd>
<dt><b>-beta_nov16</b> \<Boolean\></dt>
<dd>Usar la función de puntuación beta de noviembre de 2015<br/>Default: false<br/></dd>
<dt><b>-beta_nov16_cart</b> \<Boolean\></dt>
<dd>Usar la función de puntuación beta de noviembre de 2015 para la optimización no ideal<br/>Default: false<br/></dd>
<dt><b>-beta_july15</b> \<Boolean\></dt>
<dd>Usar la función de puntuación beta de julio de 2015<br/>Default: false<br/></dd>
<dt><b>-beta_july15_cart</b> \<Boolean\></dt>
<dd>Usar la función de puntuación beta de julio de 2015 para la optimización no ideal<br/>Default: false<br/></dd>
<dt><b>-gen_potential</b> \<Boolean\></dt>
<dd>Usar el potencial generalizado de abril de 2018<br/>Default: false<br/></dd>
<dt><b>-newdna</b> \<Boolean\></dt>
<dd>Aplicar algunas modificaciones específicas de ADN a la química y la puntuación (para pruebas)<br/>Default: false<br/></dd>
<dt><b>-restore_talaris_behavior</b> \<Boolean\></dt>
<dd>Usar la función de puntuación talaris y el residue_type_set<br/>Default: false<br/></dd>
<dt><b>-correct</b> \<Boolean\></dt>
<dd>activar las correcciones por defecto: consulta src/core/init/score_function_corrections.cc. Ten en cuenta que esta es una opción de la antigua función de puntuación score12, que NO debe usarse con talaris2013, talaris2014, ref2015 ni las funciones de puntuación beta.<br/>Default: false<br/></dd>
<dt><b>-hbond_sp2_correction</b> \<Boolean\></dt>
<dd>activar la corrección de enlaces de hidrógeno Sp2 con una sola opción; usar con sp2_correction.wts. Nota: estos conjuntos de pesos se eligen automáticamente por defecto. -score::hb_sp2_chipen -hb_sp2_BAH180_rise 0.75 -hb_sp2_outer_width 0.357 -hb_fade_energy -hbond_measure_sp3acc_BAH_from_hvy -lj_hbond_hdis 1.75 -lj_hbond_OH_donor_dis 2.6 -hbond_params sp2_elec_params -expand_st_chi2sampling -smooth_fa_elec -elec_min_dis 1.6 -elec_r_option false -chemical::set_atom_properties fa_standard:ONH2:LK_DGFREE:-5.85 fa_standard:NH2O:LK_DGFREE:-7.8 fa_standard:Narg:LK_DGFREE:-10.0 fa_standard:OH:LK_DGFREE:-6.70<br/></dd>
<dt><b>-facts_default</b> \<Boolean\></dt>
<dd>activar las opciones por defecto para FACTS; usar con scorefacts.wts. Incompatible con la opción hbond_sp2_correction. -correct -lj_hbond_hdis 2.3 -lj_hbond_OH_donor_dis 3.4 -use_bicubic_interpolation  -hbond_params sp2_elec_params -hb_sp2_chipen  -hbond_measure_sp3acc_BAH_from_hby -facts_GBpair_cut 10.0 -facts_min_dis 1.5 -facts_dshift 1.4 -facts_die 1.0 -facts_kappa 12.0 -facts_asp_patch 3 -facts_intrares_scale 0.4 -facts_elec_sh_exponent 1.8<br/>Default: false<br/></dd>
</dl>
+ <h3>-corrections:score</h3>
<dl>
<dt><b>-score</b> \<Boolean\></dt>
<dd>grupo de opciones score<br/></dd>
<dt><b>-bbdep_omega</b> \<Boolean\></dt>
<dd>Activar omega dependiente de phi-psi<br/>Default: true<br/></dd>
<dt><b>-bbdep_bond_params</b> \<Boolean\></dt>
<dd>Activar longitudes y ángulos de enlace dependientes de phi-psi<br/></dd>
<dt><b>-bbdep_bond_devs</b> \<Boolean\></dt>
<dd>Activar desviaciones dependientes de phi-psi para las longitudes y los ángulos de enlace<br/></dd>
<dt><b>-fa_dun_canonicals_use_voronoi</b> \<Boolean\></dt>
<dd>Si es true, los aminoácidos canónicos usan una detección de estilo Voronoi del pozo de rotámero más cercano durante la puntuación fa_dun, en lugar de definiciones de pozos de rotámero fijadas en el código. False por defecto (es decir, por defecto se usan las definiciones fijadas en el código).<br/>Default: false<br/></dd>
<dt><b>-fa_dun_noncanonicals_use_voronoi</b> \<Boolean\></dt>
<dd>Si es true, los aminoácidos no canónicos y otros bloques de construcción de polímeros usan una detección de estilo Voronoi del pozo de rotámero más cercano durante la puntuación fa_dun, en lugar de definiciones de pozos de rotámero fijadas en el código. True por defecto (es decir, por defecto se usa la detección de estilo Voronoi). Ponerlo en false crea problemas con muchos no canónicos cuyos pozos de rotámero no son simples pozos gauche+/gauche-/anti.<br/>Default: true<br/></dd>
<dt><b>-fa_dun_correct_rotamer_well_order</b> \<Boolean\></dt>
<dd>Si es true, el orden de los pozos de rotámero de los archivos de rotámeros se corrige automáticamente a la convención de Rosetta, de menor a mayor en el rango [0,360). False por defecto.<br/>Default: false<br/></dd>
<dt><b>-fa_dun_correct_achiral_peptoid_libraries</b> \<Boolean\></dt>
<dd>Si es true, las bibliotecas de rotámeros de los peptoides con cadenas laterales aquirales se simetrizan (para que las conformaciones especulares obtengan la misma puntuación). La generación de bibliotecas de rotámeros puede producir ligeras asimetrías, y esta es una forma fácil de evitar ese problema. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-no_his_his_pairE</b> \<Boolean\></dt>
<dd>Poner en cero el término de pares para His-His<br/></dd>
<dt><b>-no_his_DE_pairE</b> \<Boolean\></dt>
<dd>Poner en cero el término de pares para His-Glu e His-Asp<br/></dd>
<dt><b>-p_aa_pp</b> \<String\></dt>
<dd>Nombre del archivo de potencial scoring/score_functions/P_AA_pp/P_AA_PP (se busca primero en el directorio local y luego en la base de datos)<br/>Default: "scoring/score_functions/P_AA_pp/P_AA_pp"<br/></dd>
<dt><b>-p_aa_pp_nogridshift</b> \<Boolean\></dt>
<dd>el formato de p_aa_pp cambió de usar i*10+5 (5, 15, etc.) a i*10 (0, 10, etc.) como puntos de la rejilla<br/></dd>
<dt><b>-rama_not_squared</b> \<Boolean\></dt>
<dd>Potencial de Rama calculado como entrada tanto para rama como para rama2b. Por defecto, el potencial es cuadrado para (rama + entropía) > 1.0<br/></dd>
<dt><b>-rama_map</b> \<File\></dt>
<dd>Archivo de Ramachandran usado por rama<br/>Default: "scoring/score_functions/rama/Rama_smooth_dyn.dat_ss_6.4"<br/></dd>
<dt><b>-rama_pp_map</b> \<File\></dt>
<dd>Directorio de Ramachandran usado por rama_prepro<br/>Default: "scoring/score_functions/rama/fd"<br/></dd>
<dt><b>-rama_map_average_L_flat</b> \<File\></dt>
<dd>Mapa de Ramachandran que es el promedio de todos los L-aminoácidos canónicos, aplanado para dar igual probabilidad a la región permitida. Se carga de forma perezosa; solo para muestreo.<br/>Default: "scoring/score_functions/rama/flat/avg_L_rama.dat"<br/></dd>
<dt><b>-rama_map_sym_average_L_flat</b> \<File\></dt>
<dd>Mapa de Ramachandran que es el promedio de todos los L-aminoácidos canónicos, aplanado para dar igual probabilidad a la región permitida, y simetrizado. Se carga de forma perezosa; solo para muestreo.<br/>Default: "scoring/score_functions/rama/flat/sym_all_rama.dat"<br/></dd>
<dt><b>-rama_map_sym_gly_flat</b> \<File\></dt>
<dd>Mapa de Ramachandran de la glicina, aplanado para dar igual probabilidad a la región permitida y simetrizado. Se carga de forma perezosa; solo para muestreo.<br/>Default: "scoring/score_functions/rama/flat/sym_G_rama.dat"<br/></dd>
<dt><b>-rama_map_sym_pro_flat</b> \<File\></dt>
<dd>Mapa de Ramachandran de la prolina, aplanado para dar igual probabilidad a la región permitida y simetrizado. Se carga de forma perezosa; solo para muestreo.<br/>Default: "scoring/score_functions/rama/flat/sym_P_rama.dat"<br/></dd>
<dt><b>-rama_map_average_L_flat_stringent</b> \<File\></dt>
<dd>Mapa de Ramachandran que es el promedio de todos los L-aminoácidos canónicos, aplanado para dar igual probabilidad a la región permitida, con la región permitida seleccionada con alta rigurosidad. Se carga de forma perezosa; solo para muestreo.<br/>Default: "scoring/score_functions/rama/flat/avg_L_rama_str.dat"<br/></dd>
<dt><b>-rama_map_sym_average_L_flat_stringent</b> \<File\></dt>
<dd>Mapa de Ramachandran que es el promedio de todos los L-aminoácidos canónicos, aplanado para dar igual probabilidad a la región permitida, con la región permitida seleccionada con alta rigurosidad, y simetrizado. Se carga de forma perezosa; solo para muestreo.<br/>Default: "scoring/score_functions/rama/flat/sym_all_rama_str.dat"<br/></dd>
<dt><b>-rama_map_sym_gly_flat_stringent</b> \<File\></dt>
<dd>Mapa de Ramachandran de la glicina, aplanado para dar igual probabilidad a la región permitida, con la región permitida seleccionada con alta rigurosidad, y simetrizado. Se carga de forma perezosa; solo para muestreo.<br/>Default: "scoring/score_functions/rama/flat/sym_G_rama_str.dat"<br/></dd>
<dt><b>-rama_map_sym_pro_flat_stringent</b> \<File\></dt>
<dd>Mapa de Ramachandran de la prolina, aplanado para dar igual probabilidad a la región permitida, con la región permitida seleccionada con alta rigurosidad, y simetrizado. Se carga de forma perezosa; solo para muestreo.<br/>Default: "scoring/score_functions/rama/flat/sym_P_rama_str.dat"<br/></dd>
<dt><b>-rama_prepro_steep</b> \<Boolean\></dt>
<dd>Usar la biblioteca rama_prepro empinada (steep)<br/>Default: false<br/></dd>
<dt><b>-rama_prepro_nobidentate</b> \<Boolean\></dt>
<dd>Usar la biblioteca rama_prepro derivada de excluir los residuos de loops con enlaces de hidrógeno bidentados<br/>Default: false<br/></dd>
<dt><b>-cenrot</b> \<Boolean\></dt>
<dd>Usar el modelo de rotámeros centroide.<br/>Default: false<br/></dd>
<dt><b>-dun10</b> \<Boolean\></dt>
<dd>Usar la biblioteca de Dunbrack de 2010 en lugar de la de 2002.<br/>Default: true<br/></dd>
<dt><b>-dun10_dir</b> \<String\></dt>
<dd>Nombre del directorio dun10<br/>Default: "rotamer/ExtendedOpt1-5"<br/></dd>
<dt><b>-dun02_file</b> \<String\></dt>
<dd>Nombre del archivo de entrada dun02<br/>Default: "rotamer/bbdep02.May.sortlib"<br/></dd>
<dt><b>-ch_o_bond_potential</b> \<String\></dt>
<dd>Nombre del archivo de potencial ch_o_bond (se busca primero en el directorio local y luego en la base de datos)<br/>Default: "scoring/score_functions/carbon_hbond/ch_o_bond_potential.dat"<br/></dd>
<dt><b>-lj_hbond_hdis</b> \<Real\></dt>
<dd>Valor sigma de Lennard Jones para los átomos de hidrógeno; clásicamente ha sido 1.95, pero la distancia A-H promedio de los enlaces de hidrógeno en estructuras cristalinas es 1.75. (momeara)<br/>Default: 1.75<br/></dd>
<dt><b>-lj_hbond_OH_donor_dis</b> \<Real\></dt>
<dd>Valor sigma de Lennard Jones para el O de los grupos donadores OH. Clásicamente ha sido 3.0, pero las distancias promedio en estructuras cristalinas son 2.6 (momeara)<br/>Default: 2.6<br/></dd>
<dt><b>-score12prime</b> \<Boolean\></dt>
<dd>Restablecer los parámetros de la función de puntuación a los de score12 y hacer que getScoreFuntion devuelva score12prime.wts. score12prime.wts difiere de standard.wts + score12.wts_patch en que las energías de referencia se han optimizado con optE para recuperar el perfil de secuencia<br/>Default: false<br/></dd>
<dt><b>-hbond_energy_shift</b> \<Real\></dt>
<dd>El desplazamiento hacia arriba (por suma) de la profundidad del pozo de los polinomios de enlaces de hidrógeno; este desplazamiento se aplica antes de aplicar los pesos.<br/>Default: 0.0<br/></dd>
<dt><b>-hb_sp2_BAH180_rise</b> \<Real\></dt>
<dd>El aumento sobre -0.5 del valor BAH=180 del potencial sp2 aditivo chi/BAH<br/>Default: 0.75<br/></dd>
<dt><b>-hb_sp2_outer_width</b> \<Real\></dt>
<dd>El ancho entre el pico cuando CHI=0 y BAH=120 y el punto en que BAH es máximo (unidades: pi * radianes. Por ejemplo, 1/3 significa que los enlaces de hidrógeno se desactivan cuando BAH < 60; los valores mayores implican un potencial más ancho). Usa 0.357 junto con la opción hb_energy_fade.<br/>Default: 0.357<br/></dd>
<dt><b>-hb_sp2_chipen</b> \<Boolean\></dt>
<dd>Término experimental para los enlaces de hidrógeno a aceptores sp2: penaliza la geometría fuera del plano en un 67%<br/>Default: true<br/></dd>
<dt><b>-hbond_measure_sp3acc_BAH_from_hvy</b> \<Boolean\></dt>
<dd>Si es true, el ángulo BAH de los aceptores sp3 (es decir, hidroxilo) se mide donador-hidrógeno--aceptor-átomo pesado--base-átomo pesado, en lugar de donador-hidrógeno--aceptor-átomo pesado--hidroxilo-hidrógeno<br/>Default: true<br/></dd>
<dt><b>-hb_fade_energy</b> \<Boolean\></dt>
<dd>En lugar de tener un corte estricto de la definición de enlace de hidrógeno en 0, atenuar la energía suavemente en el rango [-0.1, 0.1]. Es necesario para evitar una discontinuidad en la derivada cuando E=0, que surge por la forma aditiva de la función de enlace de hidrógeno.<br/>Default: true<br/></dd>
<dt><b>-hb_exclude_ether_oxygens</b> \<Boolean\></dt>
<dd>sin enlaces de hidrógeno a los oxígenos éter de los ácidos nucleicos O3', O4', O5'<br/>Default: false<br/></dd>
<dt><b>-hb_cen_soft</b> \<Boolean\></dt>
<dd>Usar una versión más suave del término cen_hb<br/>Default: false<br/></dd>
<dt><b>-use_bicubic_interpolation</b> \<Boolean\></dt>
<dd>En lugar de usar interpolación bilineal para evaluar los potenciales de Ramachandran, P_AA_pp y Dunbrack, usar interpolación bicúbica. Evita las acumulaciones en los bordes de la rejilla, donde las discontinuidades de las derivadas frustran al minimizador<br/>Default: true<br/></dd>
<dt><b>-dun_normsd</b> \<Boolean\></dt>
<dd>Usar distribuciones gaussianas normalizadas por altura para modelar p(chi|phi,psi) en lugar de gaussianas sin normalizar por altura<br/>Default: false<br/></dd>
<dt><b>-dun_entropy_correction</b> \<Boolean\></dt>
<dd>Añadir una corrección de entropía de Shannon a la energía del rotámero: E = -logP + S<br/>Default: false<br/></dd>
<dt><b>-no_autogen_cart_improper</b> \<Boolean\></dt>
<dd>Ignorar la generación automática de parámetros de torsiones impropias (torsiones indefinidas) en CartesianBondedEnergy, generate_impropers_map_res.<br/></dd>
<dt><b>-gridscore_outbox_penalty_weight</b> \<Real\></dt>
<dd>El peso de la penalización por salirse de la caja en gridscorer, es decir, out_of_bound_e_<br/>Default: 100<br/></dd>
</dl>
+ <h3>-corrections:chemical</h3>
<dl>
<dt><b>-chemical</b> \<Boolean\></dt>
<dd>grupo de opciones chemical<br/></dd>
<dt><b>-icoor_05_2009</b> \<Boolean\></dt>
<dd>Nuevo conjunto de coordenadas idealizadas para todos los átomos, 05-2009<br/></dd>
<dt><b>-parse_charge</b> \<Boolean\></dt>
<dd>Usar el conjunto de cargas PARSE.<br/></dd>
<dt><b>-expand_st_chi2sampling</b> \<Boolean\></dt>
<dd>Parche temporal feo. Expande el muestreo de chi2 de serina y treonina en el conjunto de tipos de residuo fa_standard para que se tomen muestras cada 20 grados (en lugar de cada 60 grados). Pronto esto se cambiará en los propios archivos params de SER y THR. Esta opción puede usarse con cualquier conjunto de tipos de residuo (incluida la versión fa_standard anterior a s, y la versión fa_standard_05.2009_icoor), pero es innecesaria para la versión talaris2013 (actualmente llamada fa_standard), ya que el muestreo expandido de SER y THR ya está codificado en los archivos .params de estos dos residuos<br/>Default: false<br/></dd>
<dt><b>-alternate_fullatom_ats</b> \<String\></dt>
<dd>Especifica un directorio alternativo para el conjunto de tipos de átomo de todos los átomos<br/></dd>
</dl>
+ <h3>-corrections:genpotential</h3>
<dl>
<dt><b>-genpotential</b> \<Boolean\></dt>
<dd>grupo de opciones genpotential<br/></dd>
<dt><b>-quick_lookup</b> \<Boolean\></dt>
<dd>Usar búsqueda rápida en lookup_tors_params<br/>Default: false<br/></dd>
<dt><b>-set_torsion_params</b> \<StringVector\></dt>
<dd>Modifica los parámetros de torsión de generic_bonded_potential (los de generic_bonded.round6p.txt) desde la línea de comandos. Formato: -corrections:genpotential:set_torsion_params <atom-set1>:<atom_name1>:<atom_name2>:<atom_name3>:<atom_name4><param1>:<setting1>:<param2>:<setting2> ... Por ejemplo: '-corrections:genpotential:set_torsion_params fa_standard:C*:CS:CS:C*:k1:0.0:k2:0.0:k3:0.077 fa_standard:CD:CS:CS:CD:k1:0.435:k2:0.039:k3:0.070' <br/></dd>
<dt><b>-set_special_torsion_params</b> \<StringVector\></dt>
<dd>Modifica los parámetros de torsión especiales de generic_bonded_potential (los de generic_bonded.round6p.txt) desde la línea de comandos. Formato: -corrections:genpotential:set_special_torsion_params <atom-set1>:<atom_name1>:<atom_name2>:<atom_name3>:<atom_name4><param1>:<setting1>:<param2>:<setting2> ... Por ejemplo: '-corrections:genpotential:set_special_torsion_params fa_standard:X:CRb:CRb:X:k1:0.000:k2:-0.226:k3:0.000:k4:0.093:k8:0.000 ' <br/></dd>
</dl>
+ <h2>-corrections</h2>
<dl>
<dt><b>-shapovalov_lib_fixes_enable</b> \<Boolean\></dt>
<dd>Aplicar el nuevo código de Maxim Shapovalov del Dunbrack Lab, por ejemplo para leer y usar bibliotecas dun, rama y prop en el nuevo formato y opciones para aplicar distintas correcciones de errores. El valor false empleará las bibliotecas y el código antiguos.<br/>Default: true<br/></dd>
</dl>
+ <h3>-corrections:shapovalov_lib</h3>
<dl>
<dt><b>-shapovalov_lib</b> \<Boolean\></dt>
<dd>grupo de opciones shapovalov_lib<br/></dd>
<dt><b>-shap_dun10_enable</b> \<Boolean\></dt>
<dd>Activar la nueva corrección dun10 de Shapovalov si la opción general shapovalov_lib_fixes está activada<br/>Default: true<br/></dd>
<dt><b>-shap_dun10_smooth_level</b> \<String\></dt>
<dd>Nivel de suavizado, numérico o con palabra clave; los valores posibles son 1 o lowest_smooth, 2 o lower_smooth, 3 o low_smooth, 4 o average_smooth, 5 o higher_smooth, 6 o highest_smooth.<br/>Default: "1"<br/></dd>
<dt><b>-shap_dun10_dir</b> \<String\></dt>
<dd>Nombre del directorio dun10 en el nuevo formato<br/>Default: "rotamer/shapovalov/StpDwn_5-5-5"<br/></dd>
<dt><b>-shap_dun10_use_minus_log_P_ignore_P</b> \<Boolean\></dt>
<dd>Usar solo menos log P de las bibliotecas de texto e ignorar cualquier P.<br/>Default: false<br/></dd>
<dt><b>-shap_rama_enable</b> \<Boolean\></dt>
<dd>Activar la nueva corrección de Rama de Shapovalov si la opción general shapovalov_lib_fixes está activada<br/>Default: true<br/></dd>
<dt><b>-shap_rama_smooth_level</b> \<String\></dt>
<dd>Nivel de suavizado, numérico o con palabra clave; los valores posibles son 1 o lowest_smooth, 2 o lower_smooth, 3 o higher_smooth, 4 o highest_smooth.<br/>Default: "4"<br/></dd>
<dt><b>-shap_rama_map</b> \<File\></dt>
<dd>Nuevo archivo de Ramachandran en el nuevo formato usado por rama<br/>Default: "scoring/score_functions/rama/shapovalov/kappa25/all.ramaProb"<br/></dd>
<dt><b>-shap_rama_nogridshift</b> \<Boolean\></dt>
<dd>Con la opción correct hay un error. Se usa Rama09_noEH_kernel25_it08.dat, donde los valores de probabilidad se reportan exactamente en la rejilla de 10 grados, mientras que Rama_smooth_dyn.dat_ss_6.4 tiene valores reportados en el medio de los intervalos. No hace falta el desplazamiento de 5 grados para los mapas Rama más nuevos con valores reportados en la rejilla.<br/>Default: true<br/></dd>
<dt><b>-shap_p_aa_pp_enable</b> \<Boolean\></dt>
<dd>Activar la nueva corrección del mapa de propensión de Shapovalov si la opción general shapovalov_lib_fixes está activada<br/>Default: true<br/></dd>
<dt><b>-shap_p_aa_pp_smooth_level</b> \<String\></dt>
<dd>Nivel de suavizado, numérico o con palabra clave; los valores posibles son 1 o low_smooth, 2 o high_smooth.<br/>Default: "1"<br/></dd>
<dt><b>-shap_p_aa_pp</b> \<String\></dt>
<dd>Nombre del nuevo archivo de potencial P_AA_PP de Shapovalov (se busca primero en el directorio local y luego en la base de datos)<br/>Default: "scoring/score_functions/P_AA_pp/shapovalov/10deg/kappa50/a20.prop"<br/></dd>
</dl>
+ <h3>-corrections:water</h3>
<dl>
<dt><b>-water</b> \<Boolean\></dt>
<dd>grupo de opciones water<br/></dd>
<dt><b>-water_bump_check</b> \<Boolean\></dt>
<dd>excluir los rotámeros de agua que no pasan la comprobación de choques de energía<br/>Default: false<br/></dd>
<dt><b>-lkb_overlap_distance</b> \<Real\></dt>
<dd>distancia de intersección al solvatar con sitios lkball<br/>Default: 0.750<br/></dd>
<dt><b>-lkb_cluster_radius</b> \<Real\></dt>
<dd>radio para agrupar sitios lkball superpuestos<br/>Default: 1.000<br/></dd>
<dt><b>-lkb_rotset_radius</b> \<Real\></dt>
<dd>radio para agrupar sitios de agua agrupados en conjuntos de rotámeros<br/>Default: 3.000<br/></dd>
<dt><b>-wat_rot_params</b> \<String\></dt>
<dd>para la colocación basada en estadística de posiciones potenciales de agua<br/>Default: "sampling/waterrots/water.rots"<br/></dd>
<dt><b>-dwell_cutoff</b> \<Real\></dt>
<dd>valor de corte del tiempo de permanencia para los rotámeros PWAT conservados tras normalizar por el número de pasos de MC<br/>Default: 0.02<br/></dd>
<dt><b>-cluster_radius</b> \<Real\></dt>
<dd>radio desde el centroide ponderado por permanencia para hacer crecer los agrupamientos de rotámeros PWAT<br/>Default: 1.52<br/></dd>
<dt><b>-cluster_cutoff</b> \<Real\></dt>
<dd>eliminar el agrupamiento si no se alcanza el tiempo de permanencia acumulado<br/>Default: 0.179<br/></dd>
<dt><b>-watlim_scale</b> \<Real\></dt>
<dd>factor de escala para las aguas conservadas si se usa limit_water: factor de escala * n.º de residuos fundidos (molten)<br/>Default: 0.0<br/></dd>
<dt><b>-pointwater_params</b> \<String\></dt>
<dd>PWAT: nombre del directorio de las bases de datos de potenciales de agua puntual<br/>Default: "norm_trunc6"<br/></dd>
<dt><b>-ordered_pt_wat_penalty</b> \<Real\></dt>
<dd>PWAT: penalización por añadir una agua puntual ordenada. Se implementa mediante el término de puntuación pointwater.<br/>Default: 2.709<br/></dd>
<dt><b>-pointwat_wat_bonus</b> \<Real\></dt>
<dd>PWAT: bonificación agua-agua para residuos PWAT cercanos<br/>Default: 0.52<br/></dd>
<dt><b>-pointwat_wat_bonus_width</b> \<Real\></dt>
<dd>PWAT: factor que determina el ancho de la función exponencial de la bonificación agua-agua<br/>Default: 17.1<br/></dd>
<dt><b>-ordered_wat_penalty</b> \<Real\></dt>
<dd>HOH: penalización por añadir una agua ordenada; se implementa mediante el término de puntuación ref<br/>Default: 1.221<br/></dd>
<dt><b>-wat_rot_sampling</b> \<Real\></dt>
<dd>Tamaño de paso (en grados) de las aguas rotables<br/>Default: 30.0<br/></dd>
<dt><b>-wat_axis_sampling</b> \<Boolean\></dt>
<dd>alinear el vector O-H1 con el O cercano de la cadena principal y muestrear alrededor de los ejes O-O<br/>Default: true<br/></dd>
<dt><b>-axis_rot_sampling</b> \<Real\></dt>
<dd>Tamaño de paso (en grados) de las aguas rotables cuando se usa wat_axis_sampling<br/>Default: 15.0<br/></dd>
<dt><b>-include_vrt</b> \<Boolean\></dt>
<dd>permitir la virtualización de aguas<br/>Default: true<br/></dd>
</dl>
+ <h2>-enzymes</h2>
<dl>
<dt><b>-enzymes</b> \<Boolean\></dt>
<dd>grupo de opciones enzymes<br/></dd>
<dt><b>-species</b> \<String\></dt>
<dd>Fijar el nombre de la especie limita el comportamiento de la enzima o enzimas simuladas que se usan en este protocolo a las reacciones que se sabe que ocurren en la especie dada. El nombre de la especie debe tener el formato \"e_coli\" o \"h_sapiens\" (nota los guiones bajos), y también debe corresponder a un directorio de la base de datos de Rosetta, p. ej., \"database/virtual_enzymes/<enzyme_family>/h_sapiens/\".<br/>Default: "h_sapiens"<br/></dd>
<dt><b>-enzyme</b> \<String\></dt>
<dd>Si se fija, la enzima simulada que se usa en este protocolo usará detalles enzimáticos específicos de esta reacción tomados de la base de datos. Si no se ha fijado el nombre de la especie, se asume una enzima \"genérica\" de la familia general usada en este protocolo. El nombre de la enzima debe ser como aparece en un archivo de enzimas adecuado en \"database/virtual_enzymes/<enzyme_family>/<species_name_>/\".<br/>Default: "generic"<br/></dd>
<dt><b>-efficiency</b> \<Real\></dt>
<dd>Si se fija, la enzima simulada que se usa en este protocolo tendrá la eficiencia indicada, donde 1.00 es 100%. Una enzima virtual con una eficiencia de 0.50 realizará su reacción en un sitio dado el 50% de las veces. Si no se fija, se usará el valor que da la base de datos para esta enzima. Los datos de eficiencia de las enzimas se encuentran en \"database/virtual_enzymes/<enzyme_family>/<species_name_>/\".<br/></dd>
</dl>
+ <h2>-evaluation</h2>
<dl>
<dt><b>-evaluation</b> \<Boolean\></dt>
<dd>grupo de opciones evaluation<br/></dd>
<dt><b>-rmsd_target</b> \<FileVector\></dt>
<dd>[vector] determinar el rmsd respecto a esta o estas estructuras<br/></dd>
<dt><b>-rmsd_column</b> \<StringVector\></dt>
<dd>[vector] usar xxx como nombre de columna: rms_xxx<br/></dd>
<dt><b>-rmsd_select</b> \<FileVector\></dt>
<dd>[vector] varios archivos de loops que producen rmsd con las etiquetas: rms_XXX, donde XXX es el nombre base del archivo<br/></dd>
<dt><b>-align_rmsd_target</b> \<FileVector\></dt>
<dd>[vector] determinar el rmsd respecto a esta o estas estructuras usando un alineamiento de secuencia simple<br/></dd>
<dt><b>-structural_similarity</b> \<FileVector\></dt>
<dd>[vector] medir la similitud promedio respecto a estas estructuras (la opción especifica un silent file)<br/></dd>
<dt><b>-contact_map</b> \<Boolean\></dt>
<dd>Calcular la similitud del mapa de contactos usando el nativo dado<br/></dd>
<dt><b>-jscore_evaluator</b> \<StringVector\></dt>
<dd>Calcular puntuaciones usando los archivos de pesos de funciones de puntuación dados y los nombres de conjuntos de tipos de residuo (p. ej. score12 fa_standard score3 centroid)<br/></dd>
<dt><b>-align_rmsd_column</b> \<StringVector\></dt>
<dd>[vector] usar xxx como nombre de columna para align_rmsd_target: rms_xxx<br/></dd>
<dt><b>-align_rmsd_fns</b> \<FileVector\></dt>
<dd>[vector] de alineamientos de secuencia usados para los archivos align_rmsd<br/></dd>
<dt><b>-align_rmsd_format</b> \<String\></dt>
<dd>formato del alineamiento de secuencia entre las estructuras usadas en la evaluación<br/>Default: "grishin"<br/></dd>
<dt><b>-rms_type</b> \<String\></dt>
<dd>RNP si quieres el RMSD de proteína y ARN a la vez; en blanco para proteína<br/>Default: ""<br/></dd>
<dt><b>-predicted_burial_fn</b> \<String\></dt>
<dd>archivo de predicciones de enterramiento<br/>Default: ""<br/></dd>
<dt><b>-pool</b> \<File\></dt>
<dd>buscar la estructura más parecida en este conjunto e informar la etiqueta y el rmsd<br/></dd>
<dt><b>-rmsd</b> \<FileVector\></dt>
<dd>[vector/pares] tripletas: rmsd_target (o NATIVE / IRMS) col_name selection_file (o FULL)<br/></dd>
<dt><b>-chirmsd</b> \<FileVector\></dt>
<dd>[vector/tripletas]: rmsd_target (o NATIVE / IRMS ) col_name selection_file ( o FULL) <br/></dd>
<dt><b>-gdtmm</b> \<Boolean\></dt>
<dd>por cada evaluador de rmsd se crea también un evaluador de gdtmm<br/>Default: false<br/></dd>
<dt><b>-gdttm</b> \<Boolean\></dt>
<dd>por cada evaluador de rmsd se crea también un evaluador de gdttm<br/>Default: false<br/></dd>
<dt><b>-score_with_rmsd</b> \<Boolean\></dt>
<dd>puntuar el Pose sobre el mismo subconjunto de átomos que en los Poses de rmsd<br/></dd>
<dt><b>-constraints</b> \<FileVector\></dt>
<dd>[vector] evaluar frente a estos conjuntos de restricciones<br/></dd>
<dt><b>-constraints_column</b> \<FileVector\></dt>
<dd>[vector] usar xxx como nombre de columna: cst_xxx<br/></dd>
<dt><b>-combined_constraints</b> \<FileVector\></dt>
<dd>[vector] usar xxx como archivo cst, pero combinando las restricciones antes de aplicarlas<br/></dd>
<dt><b>-combined_constraints_column</b> \<FileVector\></dt>
<dd>[vector] usar xxx como archivo cst, pero combinando las restricciones antes de aplicarlas<br/></dd>
<dt><b>-combine_statistics</b> \<Integer\></dt>
<dd>repetir la evaluación de restricciones X veces para obtener estadísticas de la combinación de restricciones<br/>Default: 10<br/></dd>
<dt><b>-chemical_shifts</b> \<StringVector\></dt>
<dd>calcular la puntuación de desplazamientos químicos con SPARTA+ usando tuplas: talos_file [cs]_column_name  (ATENCIÓN: usa el sistema de archivos)<br/></dd>
<dt><b>-sparta_dir</b> \<String\></dt>
<dd>[opcional] apuntar a un recurso externo para el directorio de sparta (en lugar de minirosetta_database)<br/>Default: "SPARTA+"<br/></dd>
<dt><b>-cam_shifts</b> \<StringVector\></dt>
<dd>calcular la puntuación de desplazamientos químicos con Camshift talos_file [cs]_column_name  (ATENCIÓN: usa el sistema de archivos)<br/></dd>
<dt><b>-pales</b> \<StringVector\></dt>
<dd>calcular acoplamientos dipolares residuales (RDC) con el programa PALES (ATENCIÓN: usa el sistema de archivos)<br/></dd>
<dt><b>-extra_score</b> \<FileVector\></dt>
<dd>[vector] proporcionar archivos .wts para generar columnas adicionales<br/></dd>
<dt><b>-extra_score_patch</b> \<FileVector\></dt>
<dd>[vector] proporcionar archivos .patch; poner NOPATCH en las columnas sin parche<br/></dd>
<dt><b>-extra_score_column</b> \<StringVector\></dt>
<dd>[vector] usar xxx como nombre de columna: score_xxx<br/></dd>
<dt><b>-extra_score_select</b> \<FileVector\></dt>
<dd>[vector] archivos /rigid/ para la selección; usar SELECT_ALL como marcador de posición<br/></dd>
<dt><b>-rdc_target</b> \<FileVector\></dt>
<dd>[vector] como rmsd_target/columna, proporcionar un PDB con densidad ausente para calcular la puntuación RDC en los residuos seleccionados<br/></dd>
<dt><b>-symmetric_rmsd</b> \<Boolean\></dt>
<dd>calcular el rmsd de forma simétrica comprobando todos los órdenes de cadenas<br/></dd>
<dt><b>-rdc_column</b> \<StringVector\></dt>
<dd>[vector] nombres de columna para rdc_select<br/></dd>
<dt><b>-rdc</b> \<StringVector\></dt>
<dd>[vector] archivos rdc y nombres de columna para el cálculo de RDC<br/></dd>
<dt><b>-built_in_rdc</b> \<String\></dt>
<dd>evaluar rdc de -in:file:rdc con la función de puntuación estándar y guardar bajo la columna xxx<br/></dd>
<dt><b>-jump_nr</b> \<Boolean\></dt>
<dd>añade el JumpNrEvaluator para la columna nrjumps<br/>Default: false<br/></dd>
<dt><b>-score_exclude_res</b> \<IntegerVector\></dt>
<dd>Calcula una columna select_score basada en todos los residuos no excluidos por el vector de la línea de comandos<br/></dd>
<dt><b>-score_sscore_short_helix</b> \<Integer\></dt>
<dd>define la longitud máxima de una hélice que no se puntúa si termina un loop<br/>Default: 5<br/></dd>
<dt><b>-score_sscore_maxloop</b> \<Integer\></dt>
<dd>define la longitud máxima de un loop que aún se considera para la puntuación sscore<br/>Default: 3<br/></dd>
<dt><b>-window_size</b> \<Integer\></dt>
<dd>Tamaño de ventana para los cálculos de RMSD local en la aplicación windowed_rmsd<br/>Default: 5<br/></dd>
<dt><b>-I_sc</b> \<String\></dt>
<dd>nombre de la función de puntuación usada para calcular I_sc<br/>Default: "score12"<br/></dd>
<dt><b>-Irms</b> \<Boolean\></dt>
<dd>calculará el rmsd de la interfaz de docking<br/>Default: false<br/></dd>
<dt><b>-Ca_Irms</b> \<Boolean\></dt>
<dd>calculará el rmsd de la interfaz de docking con átomos Ca<br/>Default: false<br/></dd>
<dt><b>-Fnat</b> \<Boolean\></dt>
<dd>calculará la fracción recuperada de contactos nativos del docking<br/>Default: false<br/></dd>
<dt><b>-Lrmsd</b> \<Boolean\></dt>
<dd>calculará el rmsd del ligando del docking<br/>Default: false<br/></dd>
<dt><b>-Fnonnat</b> \<Boolean\></dt>
<dd>calculará la fracción de contactos no nativos para el docking<br/>Default: false<br/></dd>
<dt><b>-DockMetrics</b> \<Boolean\></dt>
<dd>calculará todas las métricas de docking (por ahora I_sc/Irms/Fnat/Lrmsd) para el docking de réplicas<br/>Default: false<br/></dd>
</dl>
+ <h2>-filters</h2>
<dl>
<dt><b>-filters</b> \<Boolean\></dt>
<dd>grupo de opciones filters<br/></dd>
<dt><b>-disable_all_filters</b> \<Boolean\></dt>
<dd>desactivar todos los filtros centroide: RG, CO y Sheet<br/>Default: false<br/></dd>
<dt><b>-disable_rg_filter</b> \<Boolean\></dt>
<dd>desactivar el filtro RG<br/>Default: false<br/></dd>
<dt><b>-disable_co_filter</b> \<Boolean\></dt>
<dd>desactivar el filtro de orden de contactos<br/>Default: false<br/></dd>
<dt><b>-disable_sheet_filter</b> \<Boolean\></dt>
<dd>desactivar el filtro de láminas<br/>Default: false<br/></dd>
<dt><b>-set_pddf_filter</b> \<Real\></dt>
<dd>Activa el filtro PDDF con un corte de puntuación dado<br/>Default: 5.0<br/></dd>
<dt><b>-set_saxs_filter</b> \<Real\></dt>
<dd>Activa el filtro de energía SAXS con un corte de puntuación dado<br/>Default: -3<br/></dd>
</dl>
+ <h2>-gpu</h2>
<dl>
<dt><b>-gpu</b> \<Boolean\></dt>
<dd>Activar/desactivar el soporte de GPU<br/>Default: true<br/></dd>
<dt><b>-device</b> \<Integer\></dt>
<dd>Dispositivo GPU que se usará<br/>Default: 1<br/></dd>
<dt><b>-threads</b> \<Integer\></dt>
<dd>Máximo de hilos de GPU que se usarán<br/>Default: 2048<br/></dd>
</dl>
+ <h2>-jumps</h2>
<dl>
<dt><b>-jumps</b> \<Boolean\></dt>
<dd>grupo de opciones jumps<br/></dd>
<dt><b>-evaluate</b> \<Boolean\></dt>
<dd>evaluar la geometría N-CA-C para todos los saltos del FoldTree<br/>Default: false<br/></dd>
<dt><b>-extra_frags_for_ss</b> \<File\></dt>
<dd>usar la definición de estructura secundaria de este conjunto de fragmentos<br/>Default: ""<br/></dd>
<dt><b>-fix_chainbreak</b> \<Boolean\></dt>
<dd>minimizar para corregir ccd en las reejecuciones<br/>Default: false<br/></dd>
<dt><b>-fix_jumps</b> \<File\></dt>
<dd>leer jump_file<br/>Default: ""<br/></dd>
<dt><b>-jump_lib</b> \<File\></dt>
<dd>leer jump_library_file para saltos automáticos<br/>Default: ""<br/></dd>
<dt><b>-loop_definition_from_file</b> \<File\></dt>
<dd>usar la definición de estructura secundaria de este archivo<br/>Default: ""<br/></dd>
<dt><b>-no_chainbreak_in_relax</b> \<Boolean\></dt>
<dd>no penalizar el chainbreak en relax<br/>Default: false<br/></dd>
<dt><b>-pairing_file</b> \<File\></dt>
<dd>archivo con emparejamientos<br/>Default: ""<br/></dd>
<dt><b>-random_sheets</b> \<IntegerVector\></dt>
<dd>topología de lámina aleatoria--> reemplaza -sheet1 -sheet2 ...; selecciona al azar hasta N láminas con hasta -sheet_i emparejamientos para la lámina i<br/>Default: 1<br/></dd>
<dt><b>-residue_pair_jump_file</b> \<File\></dt>
<dd>un archivo para definir el salto de un par de residuos<br/>Default: ""<br/></dd>
<dt><b>-sheets</b> \<IntegerVector\></dt>
<dd>topología de láminas--> reemplaza -sheet1 -sheet2 ... -sheetN<br/>Default: 1<br/></dd>
<dt><b>-topology_file</b> \<File\></dt>
<dd>leer un archivo con información de topología ( PairingStats )<br/>Default: ""<br/></dd>
<dt><b>-bb_moves</b> \<Boolean\></dt>
<dd>Aplicar bb_moves ( wobble, small, shear) durante las etapas 3 y 4.<br/>Default: false<br/></dd>
<dt><b>-no_wobble</b> \<Boolean\></dt>
<dd>No aplicar el inútil wobble durante las etapas 3 y 4.<br/>Default: false<br/></dd>
<dt><b>-no_shear</b> \<Boolean\></dt>
<dd>No aplicar el inútil shear durante las etapas 3 y 4.<br/>Default: false<br/></dd>
<dt><b>-no_sample_ss_jumps</b> \<Boolean\></dt>
<dd>muestrear fragmentos de salto durante el plegamiento<br/>Default: false<br/></dd>
<dt><b>-invrate_jump_move</b> \<Integer\></dt>
<dd>poner 5 aquí para tener 5 movimientos de torsión por cada movimiento de salto<br/>Default: 10<br/></dd>
<dt><b>-chainbreak_weight_stage1</b> \<Real\></dt>
<dd>el peso de los chainbreaks<br/>Default: 1.0<br/></dd>
<dt><b>-chainbreak_weight_stage2</b> \<Real\></dt>
<dd>el peso de los chainbreaks<br/>Default: 1.0<br/></dd>
<dt><b>-chainbreak_weight_stage3</b> \<Real\></dt>
<dd>el peso de los chainbreaks<br/>Default: 1.0<br/></dd>
<dt><b>-chainbreak_weight_stage4</b> \<Real\></dt>
<dd>el peso de los chainbreaks<br/>Default: 1.0<br/></dd>
<dt><b>-ramp_chainbreaks</b> \<Boolean\></dt>
<dd>aumentar gradualmente el peso del chainbreak: etapa1 0, etapa2 0.25, etapa3 alternando 0.5..2.5, etapa4 2.5..4<br/>Default: true<br/></dd>
<dt><b>-increase_chainbreak</b> \<Real\></dt>
<dd>multiplicar el peso de chainbreak aumentado gradualmente por esta cantidad<br/>Default: 1.0<br/></dd>
<dt><b>-overlap_chainbreak</b> \<Boolean\></dt>
<dd>usar el término de chainbreak de solapamiento en la etapa4<br/>Default: false<br/></dd>
<dt><b>-sep_switch_accelerate</b> \<Real\></dt>
<dd>las restricciones y el chainbreak dependen de la separación dentro de la cadena. Acelerar su aplicación 1+num_cuts()*<este_factor><br/>Default: 0.4<br/></dd>
<dt><b>-dump_frags</b> \<Boolean\></dt>
<dd>volcar los jump_fragments <br/>Default: false<br/></dd>
<dt><b>-njumps</b> \<Integer\></dt>
<dd>number_of_jumps que se seleccionan de la biblioteca para cada trayectoria (modo de membrana)<br/>Default: 1<br/></dd>
<dt><b>-max_strand_gap_allowed</b> \<Integer\></dt>
<dd>unir hebras si tienen menos de X residuos pero el mismo registro<br/>Default: 2<br/></dd>
<dt><b>-contact_score</b> \<Real\></dt>
<dd>el peso de las hebras tendrá un componente peso * orden de contactos<br/>Default: 0.0<br/></dd>
<dt><b>-filter_templates</b> \<Boolean\></dt>
<dd>filtrar las plantillas del protocolo de hibridación<br/>Default: false<br/></dd>
</dl>
+ <h2>-loops</h2>
<dl>
<dt><b>-loops</b> \<Boolean\></dt>
<dd>grupo de opciones de modelado de loops<br/>Default: true<br/></dd>
<dt><b>-cen_weights</b> \<String\></dt>
<dd>archivo de pesos de ScoreFunction para la fase centroide del modelado de loops<br/>Default: "cen_std"<br/></dd>
<dt><b>-cen_patch</b> \<String\></dt>
<dd>parche de ScoreFunction para la fase centroide del modelado de loops<br/>Default: "score4L"<br/></dd>
<dt><b>-input_pdb</b> \<File\></dt>
<dd>archivo pdb de plantilla<br/>Default: "input_pdb"<br/></dd>
<dt><b>-loop_file</b> \<StringVector\></dt>
<dd>Archivo o archivos de definición de loops. Si se indican varios archivos, cada vez que se solicite este parámetro se elegirá uno *aleatorio*.<br/></dd>
<dt><b>-extended_loop_file</b> \<File\></dt>
<dd>archivo de definición de loops para los loops que se van a extender (usado en abrelax)<br/>Default: "loop_file"<br/></dd>
<dt><b>-mm_loop_file</b> \<File\></dt>
<dd>archivo de definición de loops<br/>Default: "loop_file"<br/></dd>
<dt><b>-fix_natsc</b> \<Boolean\></dt>
<dd>fijar las cadenas laterales de la región de plantilla en el modelado de loops<br/>Default: false<br/></dd>
<dt><b>-refine_only</b> \<Boolean\></dt>
<dd>realizar el refinamiento de todos los átomos solo en los loops<br/>Default: false<br/></dd>
<dt><b>-fast</b> \<Boolean\></dt>
<dd>reducir el número de ciclos de simulación en el modelado de loops<br/>Default: false<br/></dd>
<dt><b>-vall_file</b> \<File\></dt>
<dd>archivo de la base de datos vall<br/>Default: "vall_file"<br/></dd>
<dt><b>-frag_sizes</b> \<IntegerVector\></dt>
<dd>longitudes de los fragmentos que se usarán en el modelado de loops<br/>Default: ['9', '3', '1']<br/></dd>
<dt><b>-frag_files</b> \<FileVector\></dt>
<dd>archivos de bibliotecas de fragmentos<br/>Default: ['"frag9"', '"frag3"', '"frag1"']<br/></dd>
<dt><b>-output_pdb</b> \<File\></dt>
<dd>archivo pdb del modelo de salida<br/>Default: "output.pdb"<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-build_initial</b> \<Boolean\></dt>
<dd>Preceder el modelado de loops con una ronda inicial que solo elimina las densidades ausentes y construye loops simples<br/>Default: false<br/></dd>
<dt><b>-extended</b> \<Boolean\></dt>
<dd>Forzar extendido en los loops, independientemente del archivo de entrada de loops<br/>Default: false<br/></dd>
<dt><b>-remove_extended_loops</b> \<Boolean\></dt>
<dd>Antes de construir ningún loop, eliminar todos los loops marcados como extendidos<br/>Default: false<br/></dd>
<dt><b>-idealize_after_loop_close</b> \<Boolean\></dt>
<dd>Pasar la estructura por el idealizador después de cerrar los loops<br/>Default: true<br/></dd>
<dt><b>-idealize_before_loop_close</b> \<Boolean\></dt>
<dd>Pasar la estructura por el idealizador antes de cerrar los loops<br/>Default: true<br/></dd>
<dt><b>-select_best_loop_from</b> \<Integer\></dt>
<dd>Seguir construyendo loops hasta N y elegir el mejor (por puntuación)<br/>Default: 1<br/></dd>
<dt><b>-build_attempts</b> \<Integer\></dt>
<dd>Intentos de construcción por intento de crecimiento<br/>Default: 3<br/></dd>
<dt><b>-grow_attempts</b> \<Integer\></dt>
<dd>Intentos totales de crecimiento de loops<br/>Default: 7<br/></dd>
<dt><b>-random_grow_loops_by</b> \<Real\></dt>
<dd>Hacer crecer los loops al azar hasta este número de residuos a cada lado.<br/>Default: 0.0<br/></dd>
<dt><b>-accept_aborted_loops</b> \<Boolean\></dt>
<dd>aceptar loops abortados      <br/>Default: false<br/></dd>
<dt><b>-strict_loops</b> \<Boolean\></dt>
<dd>No permitir el crecimiento de loops<br/>Default: false<br/></dd>
<dt><b>-superimpose_native</b> \<Boolean\></dt>
<dd>Superponer el nativo sobre el núcleo antes de calcular looprms<br/>Default: false<br/></dd>
<dt><b>-build_specific_loops</b> \<IntegerVector\></dt>
<dd>Números de los loops que se construirán<br/></dd>
<dt><b>-random_order</b> \<Boolean\></dt>
<dd>construir en orden aleatorio     <br/>Default: true<br/></dd>
<dt><b>-build_all_loops</b> \<Boolean\></dt>
<dd>construir todos los loops (sin omitir)  <br/>Default: false<br/></dd>
<dt><b>-fa_closure_protocol</b> \<Boolean\></dt>
<dd>Abrelax usa FASlidingWindowLoopClosure... <br/>Default: false<br/></dd>
<dt><b>-combine_rate</b> \<Real\></dt>
<dd>Combinar loops sucesivos a esta tasa<br/>Default: 0.0<br/></dd>
<dt><b>-skip_initial_loop_build</b> \<Boolean\></dt>
<dd>Omitir el paso inicial de construcción de loops en el que se descartan las torsiones existentes del loop y se construye desde cero. <br/>Default: false<br/></dd>
<dt><b>-remodel</b> \<String\></dt>
<dd><br/>Default: "no"<br/></dd>
<dt><b>-intermedrelax</b> \<String\></dt>
<dd><br/>Default: "no"<br/></dd>
<dt><b>-refine</b> \<String\></dt>
<dd>método para realizar el refinamiento de todos los átomos en los loops<br/>Default: "no"<br/></dd>
<dt><b>-relax</b> \<String\></dt>
<dd><br/>Default: "no"<br/></dd>
<dt><b>-final_clean_fastrelax</b> \<Boolean\></dt>
<dd>Añadir un fastrelax final sin restricciones<br/>Default: false<br/></dd>
<dt><b>-relax_with_foldtree</b> \<Boolean\></dt>
<dd>mantener el FoldTree durante relax<br/>Default: false<br/></dd>
<dt><b>-constrain_rigid_segments</b> \<Real\></dt>
<dd>Usar restricciones de coordenadas en las regiones que no son loops<br/>Default: 0.0<br/></dd>
<dt><b>-loopscores</b> \<String\></dt>
<dd>Calcular las puntuaciones de loop individualmente para estos loops (ruta al archivo de loops)<br/></dd>
<dt><b>-timer</b> \<Boolean\></dt>
<dd>Escribir el tiempo empleado en segundos en cada trabajo de modelado de loops<br/>Default: false<br/></dd>
<dt><b>-vicinity_sampling</b> \<Boolean\></dt>
<dd>muestrear solo dentro de una cierta región de los valores de torsión actuales<br/>Default: false<br/></dd>
<dt><b>-vicinity_degree</b> \<Real\></dt>
<dd>número de grados dentro de los valores de torsión actuales en los que se muestrea para el muestreo de vecindad<br/>Default: 1.0<br/></dd>
<dt><b>-neighbor_dist</b> \<Real\></dt>
<dd>Corte de distancia CB para el reempaquetado, las pruebas de rotámeros y la minimización de cadenas laterales durante el modelado de loops. NOTA: los valores superiores a 10.0 se reducen en la práctica a 10.0<br/>Default: 10.0<br/></dd>
<dt><b>-kic_max_seglen</b> \<Integer\></dt>
<dd>tamaño máximo de los segmentos de residuos usados en los cálculos de cierre cinemático<br/>Default: 12<br/></dd>
<dt><b>-kic_recover_last</b> \<Boolean\></dt>
<dd>Si es true, no recuperar el Pose de menor puntuación después de cada ciclo externo ni al final del protocolo en el remodelado y refinamiento kic<br/>Default: false<br/></dd>
<dt><b>-kic_min_after_repack</b> \<Boolean\></dt>
<dd>¿Debe el protocolo de refinamiento de cierre cinemático minimizar después de los pasos de reempaquetado?<br/>Default: true<br/></dd>
<dt><b>-optimize_only_kic_region_sidechains_after_move</b> \<Boolean\></dt>
<dd>¿Debemos realizar pruebas de rotámeros y minimización después de cada movimiento KIC, pero solo dentro de loops:neighbor_dist de los residuos del segmento KIC movido? Útil para acelerar cuando se usan definiciones de loops muy grandes (como cuando se usan cadenas enteras para generar conjuntos).<br/>Default: false<br/></dd>
<dt><b>-max_kic_build_attempts</b> \<Integer\></dt>
<dd>Número de intentos de construcción inicial de loops por cierre cinemático<br/>Default: 10000<br/></dd>
<dt><b>-remodel_kic_attempts</b> \<Integer\></dt>
<dd>Número de intentos kic por ciclo interno durante el protocolo perturb_kic<br/>Default: 300<br/></dd>
<dt><b>-max_kic_perturber_samples</b> \<Integer\></dt>
<dd>Número máximo de muestras del perturbador cinemático<br/>Default: 2000<br/></dd>
<dt><b>-nonpivot_torsion_sampling</b> \<Boolean\></dt>
<dd>activa el muestreo de las torsiones de residuos que no son pivote cuando la longitud del segmento de cierre cinemático de loops es > 3<br/>Default: true<br/></dd>
<dt><b>-fix_ca_bond_angles</b> \<Boolean\></dt>
<dd>Congela los ángulos de enlace N-CA-C en el muestreo de loops KIC<br/>Default: false<br/></dd>
<dt><b>-kic_use_linear_chainbreak</b> \<Boolean\></dt>
<dd>Usar linear_chainbreak en lugar de chainbreak (armónico) en el muestreo de loops KIC<br/>Default: false<br/></dd>
<dt><b>-sample_omega_at_pre_prolines</b> \<Boolean\></dt>
<dd>Muestrear omega en el muestreo de loops KIC<br/>Default: false<br/></dd>
<dt><b>-allow_omega_move</b> \<Boolean\></dt>
<dd>Permitir que omega del loop se minimice durante el modelado de loops<br/>Default: false<br/></dd>
<dt><b>-kic_with_cartmin</b> \<Boolean\></dt>
<dd>Usar minimización cartesiana en el modelado de loops KIC<br/>Default: false<br/></dd>
<dt><b>-allow_takeoff_torsion_move</b> \<Boolean\></dt>
<dd>Permitir que phi/psi de despegue se muevan durante el modelado de loops<br/>Default: false<br/></dd>
<dt><b>-extend_length</b> \<Integer\></dt>
<dd>Número de residuos de alanina que se añaden después del cutpoint en la aplicación loopextend<br/>Rango: 0-<br/>Default: 0<br/></dd>
<dt><b>-perturb_outer_cycles</b> \<Integer\></dt>
<dd>número de ciclos externos en la etapa de perturbación (centroide)<br/>Rango: 1-<br/>Default: 5<br/></dd>
<dt><b>-refine_outer_cycles</b> \<Integer\></dt>
<dd>número de ciclos externos en la etapa de refinamiento de todos los átomos<br/>Rango: 1-<br/>Default: 5<br/></dd>
<dt><b>-max_inner_cycles</b> \<Integer\></dt>
<dd>número máximo de ciclos internos en el refinamiento de loops de todos los átomos<br/>Rango: 1-<br/>Default: 1<br/></dd>
<dt><b>-repack_period</b> \<Integer\></dt>
<dd>periodo de reempaquetado durante el refinamiento de loops de todos los átomos<br/>Rango: 1-<br/>Default: 20<br/></dd>
<dt><b>-remodel_init_temp</b> \<Real\></dt>
<dd>Temperatura inicial para la reconstrucción de loops. Por ahora solo es compatible en el modo cinemático (KIC)<br/>Default: 2.0<br/></dd>
<dt><b>-remodel_final_temp</b> \<Real\></dt>
<dd>Temperatura final para la reconstrucción de loops. Por ahora solo es compatible en el modo cinemático (KIC)<br/>Default: 1.0<br/></dd>
<dt><b>-refine_init_temp</b> \<Real\></dt>
<dd>Temperatura inicial para el refinamiento de loops. Por ahora solo es compatible en el modo cinemático (KIC)<br/>Default: 1.5<br/></dd>
<dt><b>-refine_final_temp</b> \<Real\></dt>
<dd>Temperatura final para el refinamiento de loops. Por ahora solo es compatible en el modo cinemático (KIC)<br/>Default: 0.5<br/></dd>
<dt><b>-gapspan</b> \<Integer\></dt>
<dd>al identificar automáticamente las regiones de loops, esta es la longitud máxima de hueco para un solo loop<br/>Rango: 1-<br/>Default: 6<br/></dd>
<dt><b>-spread</b> \<Integer\></dt>
<dd>al identificar automáticamente las regiones de loops, este es el número de residuos vecinos con el que se extienden las regiones de loops<br/>Rango: 1-<br/>Default: 2<br/></dd>
<dt><b>-kinematic_wrapper_cycles</b> \<Integer\></dt>
<dd>número máximo de intentos de apply() de KinematicMover por cada apply() de KinematicWrapper<br/>Default: 20<br/></dd>
<dt><b>-kic_num_rotamer_trials</b> \<Integer\></dt>
<dd>número de iteraciones de RotamerTrial en cada ciclo KIC; por defecto es 1<br/>Default: 1<br/></dd>
<dt><b>-kic_omega_sampling</b> \<Boolean\></dt>
<dd>Muestrear los ángulos omega alrededor de 179.6 para trans, e incluyendo 0 para pre-prolinas; por defecto false, por razones heredadas<br/>Default: false<br/></dd>
<dt><b>-kic_bump_overlap_factor</b> \<Real\></dt>
<dd>permitir cierto solapamiento atómico en los cierres de loops iniciales (debería remediarse en el reempaquetado y la minimización posteriores)<br/>Default: 0.36<br/></dd>
<dt><b>-minimize_max_iter</b> \<Integer\></dt>
<dd>Iteración máxima de minimización durante MC<br/>Default: 200<br/></dd>
<dt><b>-restrict_kic_sampling_to_torsion_string</b> \<String\></dt>
<dd>restringir el muestreo de cierre cinemático de loops a los ángulos phi/psi especificados en la cadena de torsiones<br/>Default: ""<br/></dd>
<dt><b>-derive_torsion_string_from_native_pose</b> \<Boolean\></dt>
<dd>aplicar muestreo restringido por torsiones y derivar la cadena de torsiones de la estructura nativa [o, si no se proporciona, de la inicial]<br/>Default: false<br/></dd>
<dt><b>-always_remodel_full_loop</b> \<Boolean\></dt>
<dd>remodelar siempre el segmento completo del loop (es decir, los pivotes externos son siempre el inicio y el final del loop); por ahora solo se aplica a la etapa de perturbación -- EXPERIMENTAL<br/>Default: false<br/></dd>
<dt><b>-taboo_sampling</b> \<Boolean\></dt>
<dd>aumentar la diversidad del muestreo KIC generando previamente distintos intervalos de torsión y muestreando dentro de ellos; esta opción activa el muestreo Taboo en la etapa de perturbación<br/>Default: false<br/></dd>
<dt><b>-taboo_in_fa</b> \<Boolean\></dt>
<dd>aumentar la diversidad del muestreo KIC generando previamente distintos intervalos de torsión y muestreando dentro de ellos; esta opción activa el muestreo Taboo en la primera mitad de la etapa de todos los átomos; usar en combinación con -loops:taboo_sampling o -kic_leave_centroid_after_initial_closure<br/>Default: false<br/></dd>
<dt><b>-ramp_fa_rep</b> \<Boolean\></dt>
<dd>aumentar gradualmente el peso de fa_rep a lo largo de los ciclos externos del refinamiento<br/>Default: false<br/></dd>
<dt><b>-ramp_rama</b> \<Boolean\></dt>
<dd>aumentar gradualmente el peso de rama a lo largo de los ciclos externos del refinamiento<br/>Default: false<br/></dd>
<dt><b>-kic_rama2b</b> \<Boolean\></dt>
<dd>usar distribuciones de Ramachandran dependientes de los vecinos en el muestreo aleatorio de ángulos de torsión<br/>Default: false<br/></dd>
<dt><b>-kic_leave_centroid_after_initial_closure</b> \<Boolean\></dt>
<dd>usar el modo centroide solo para el cierre inicial de loops; todos los cierres posteriores se harán con todos los átomos<br/>Default: false<br/></dd>
<dt><b>-legacy_kic</b> \<Boolean\></dt>
<dd>seleccionar siempre primero el pivote inicial y luego el final; sesga el muestreo hacia la parte C-terminal del loop (false por defecto)<br/>Default: false<br/></dd>
<dt><b>-alternative_closure_protocol</b> \<Boolean\></dt>
<dd>usar WidthFirstSliding...<br/>Default: false<br/></dd>
<dt><b>-chainbreak_max_accept</b> \<Real\></dt>
<dd>aceptar todos los loops con una puntuación de chainbreak acumulada menor (lineal, cuadrática (si existe) y de solapamiento)<br/>Default: 2.0<br/></dd>
<dt><b>-debug_loop_closure</b> \<Boolean\></dt>
<dd>volcar las estructuras antes y después del cierre de loops<br/>Default: false<br/></dd>
<dt><b>-non_ideal_loop_closing</b> \<Boolean\></dt>
<dd>permitir pequeñas no idealidades en el residuo del chainbreak tras el cierre del loop; requiere salida silent binaria<br/>Default: false<br/></dd>
<dt><b>-scored_frag_cycles</b> \<Real\></dt>
<dd>proporción de ciclos para scored_frag_cycles ( loop_size<10 ) después de jumping-abinitio<br/>Default: 1.0<br/></dd>
<dt><b>-short_frag_cycles</b> \<Real\></dt>
<dd>proporción de ciclos para short_frag_cycles ( loop_size<10 ) después de jumping-abinitio<br/>Default: 1.0<br/></dd>
<dt><b>-rmsd_tol</b> \<Real\></dt>
<dd>tolerancia de rmsd para desviarse del Pose original<br/>Default: 10000.0<br/></dd>
<dt><b>-chain_break_tol</b> \<Real\></dt>
<dd>tolerancia aceptable para la puntuación de chain break<br/>Default: 0.2<br/></dd>
<dt><b>-random_loop</b> \<Boolean\></dt>
<dd>aleatorizar las posiciones de los stubs de loops<br/>Default: false<br/></dd>
<dt><b>-stealfrags</b> \<FileVector\></dt>
<dd>StealFragPDBS<br/></dd>
<dt><b>-stealfrags_times</b> \<Integer\></dt>
<dd>StealFragPDBS ¿cuántas veces?<br/>Default: 1<br/></dd>
<dt><b>-coord_cst</b> \<Real\></dt>
<dd>restraintweight<br/>Default: 0.0<br/></dd>
<dt><b>-skip_1mers</b> \<Real\></dt>
<dd>tasa a la que se debe omitir una inserción de 1-mer<br/>Default: 0.0<br/></dd>
<dt><b>-skip_3mers</b> \<Real\></dt>
<dd>tasa a la que se debe omitir una inserción de 3-mer<br/>Default: 0.0<br/></dd>
<dt><b>-skip_9mers</b> \<Real\></dt>
<dd>tasa a la que se debe omitir una inserción de 9-mer<br/>Default: 0.0<br/></dd>
<dt><b>-loop_model</b> \<Boolean\></dt>
<dd>opción de modelado de loops<br/>Default: false<br/></dd>
<dt><b>-score_filter_cutoff</b> \<Real\></dt>
<dd>valor para el filtro de puntuación<br/>Default: 1.0<br/></dd>
<dt><b>-ccd_closure</b> \<Boolean\></dt>
<dd>aplicar cierre ccd<br/>Default: false<br/></dd>
<dt><b>-skip_ccd_moves</b> \<Boolean\></dt>
<dd>al ejecutar en modo ccd_moves, no hacer realmente ccd_moves, solo inserciones de fragmentos<br/>Default: false<br/></dd>
<dt><b>-no_randomize_loop</b> \<Boolean\></dt>
<dd>Dejar el loop como está<br/>Default: false<br/></dd>
<dt><b>-loops_subset</b> \<Boolean\></dt>
<dd>elegir un subconjunto de los loops deseados<br/>Default: false<br/></dd>
<dt><b>-num_desired_loops</b> \<Integer\></dt>
<dd>número de loops deseados<br/>Default: 1<br/></dd>
<dt><b>-loop_combine_rate</b> \<Real\></dt>
<dd>tasa de omisión para no combinar un loop elegido<br/>Default: 0.0<br/></dd>
<dt><b>-final_score_filter</b> \<Real\></dt>
<dd>Escribir solo las estructuras que puntúen mejor que esto<br/>Default: 1000000.0<br/></dd>
<dt><b>-no_combine_if_fail</b> \<Boolean\></dt>
<dd>combinar loops si falla el modelado de loops<br/>Default: true<br/></dd>
<dt><b>-shorten_long_terminal_loop</b> \<Boolean\></dt>
<dd>acortar los loops largos<br/>Default: false<br/></dd>
<dt><b>-backrub_trials</b> \<Integer\></dt>
<dd>número de pasos de backrub que se hacen en el loop relax<br/>Default: 10<br/></dd>
<dt><b>-looprlx_cycle_ratio</b> \<Real\></dt>
<dd>fracción del total de ciclos de looprlx<br/>Default: 1.0<br/></dd>
<dt><b>-extended_beta</b> \<Real\></dt>
<dd>Tempfactor extendido: extensión estocástica: p_ext = exp( - beta * longitud ) <br/>Default: -1.0<br/></dd>
<dt><b>-no_looprebuild</b> \<Boolean\></dt>
<dd>no reconstruir los loops<br/>Default: false<br/></dd>
<dt><b>-allow_lig_move</b> \<Boolean\></dt>
<dd>permitir que los ligandos se muevan durante el modelado de loops<br/>Default: false<br/></dd>
<dt><b>-keep_natro</b> \<File\></dt>
<dd>lista de residuos cuyos rotámeros se mantienen fijos<br/>Default: "keep_natro"<br/></dd>
<dt><b>-refine_design_iterations</b> \<Integer\></dt>
<dd>iteraciones de refinamiento y diseño<br/>Default: 1<br/></dd>
</dl>
+ <h3>-loops:ccd</h3>
<dl>
<dt><b>-ccd</b> \<Boolean\></dt>
<dd>grupo de opciones ccd<br/></dd>
<dt><b>-max_rama_score_increase</b> \<Real\></dt>
<dd>Aumento máximo de la puntuación de Ramachandran que se tolerará.<br/>Default: 2.0<br/></dd>
<dt><b>-max_torsion_delta_per_move</b> \<RealVector\></dt>
<dd>Desviación máxima absoluta de torsión para un solo residuo en un movimiento dado. Deben indicarse desviaciones distintas para los residuos en conformaciones helicoidal, extendida o coil (en ese orden).<br/>Default: ['1.0', '5.0', '10.0']<br/></dd>
<dt><b>-max_torsion_delta</b> \<RealVector\></dt>
<dd>Desviación máxima absoluta de torsión para un solo residuo durante todo el cierre CCD. Deben indicarse desviaciones distintas para los residuos en conformaciones helicoidal, extendida o coil (en ese orden).<br/>Default: ['10.0', '50.0', '75.0']<br/></dd>
<dt><b>-tolerance</b> \<Real\></dt>
<dd>RMSD máximo (en Å) de los átomos duplicados a través del cutpoint que se considerará un cierre exitoso.<br/>Default: 0.08<br/></dd>
<dt><b>-max_cycles</b> \<Integer\></dt>
<dd>Número máximo de iteraciones de CCD que se intentarán. CCD se detendrá si el loop se cierra en menos ciclos que el máximo.<br/>Default: 100<br/></dd>
<dt><b>-check_rama_scores</b> \<Boolean\></dt>
<dd>Sesgo hacia los movimientos que mejoran la puntuación de Ramachandran del residuo que se mueve.<br/>Default: true<br/></dd>
<dt><b>-rama_2b</b> \<Boolean\></dt>
<dd>Usar la puntuación de Ramachandran de dos cuerpos (dependiente de los vecinos).<br/>Default: false<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>Temperatura (aproximadamente en unidades de kT) que se usa al aceptar un movimiento que no mejora la puntuación de Ramachandran.<br/>Default: 0.25<br/></dd>
</dl>
+ <h2>-intf</h2>
<dl>
<dt><b>-intf</b> \<Boolean\></dt>
<dd>grupo de opciones intf<br/></dd>
<dt><b>-chains</b> \<String\></dt>
<dd>Cadenas sobre las que se toman las estadísticas; pueden ser varias. Ejemplo: 'AEF'. Si no se indica, toma estadísticas sobre las cadenas únicas del PDB.<br/></dd>
</dl>
+ <h2>-machine_learning</h2>
<dl>
<dt><b>-machine_learning</b> \<Boolean\></dt>
<dd>grupo de opciones machine_learning<br/></dd>
<dt><b>-auto_download</b> \<Boolean\></dt>
<dd>Descargar automáticamente los modelos de aprendizaje automático si faltan. Por defecto es false.<br/>Default: false<br/></dd>
</dl>
+ <h2>-mp</h2>
<dl>
<dt><b>-mp</b> \<Boolean\></dt>
<dd>grupo de opciones mp<br/></dd>
<dt><b>-restore_lazaridis_imm_behavior</b> \<Boolean\></dt>
<dd>Restaurar el comportamiento de la función de energía a Lazaridis IMM1<br/>Default: false<br/></dd>
<dt><b>-thickness</b> \<Real\></dt>
<dd>Grosor de la membrana usada por la función de puntuación de alta resolución. Sobrescribe el grosor por defecto de 30 Å.<br/></dd>
<dt><b>-membrane_core</b> \<Real\></dt>
<dd>fijar el grosor del núcleo de la membrana para Lazaridis-Karplus. El valor por defecto es 10 Å, es decir, (-10, 10)<br/></dd>
<dt><b>-steepness</b> \<Real\></dt>
<dd>Controla la región de transición entre las fases polar y apolar del modelo de membrana usado por la función de energía de alta resolución. Por defecto = 10, lo que da una región de transición de 6 Å.<br/></dd>
<dt><b>-geometry</b> \<String\></dt>
<dd>Geometría de la membrana implícita; por defecto es slab (placa). Otras opciones son bicelle, vesicle y double_vesicle. Para una geometría tipo micela, puedes poner el inner_radius de la geometría bicelle (con -mp:geo:bicelle_radius) en un valor relativamente pequeño. Consulta la descripción de -mp:geo:bicelle_radius para más información.<br/></dd>
<dt><b>-center_start</b> \<RealVector\></dt>
<dd>Punto de partida para la búsqueda del centro. Ejemplo: 3 2 4.<br/></dd>
<dt><b>-center_delta</b> \<Real\></dt>
<dd>Perturbación del centro en Å.<br/></dd>
<dt><b>-center_search_cycles</b> \<Real\></dt>
<dd>Iteraciones para la búsqueda del centro.<br/></dd>
<dt><b>-normal_start</b> \<RealVector\></dt>
<dd>Vector base para la búsqueda de la normal. Los ángulos parten de ese vector.<br/></dd>
<dt><b>-normal_angle_start</b> \<Real\></dt>
<dd>Ángulo inicial respecto al vector base para la búsqueda de la normal. Grados.<br/></dd>
<dt><b>-normal_angle_delta</b> \<Real\></dt>
<dd>Perturbación del ángulo de la normal en grados.<br/></dd>
<dt><b>-normal_search_cycles</b> \<Real\></dt>
<dd>Número de iteraciones para la búsqueda de la normal.<br/></dd>
<dt><b>-chain_normal_angle_max</b> \<Real\></dt>
<dd>Máximo del ángulo de la normal respecto a normal_start para el embebido de cadenas. Grados.<br/></dd>
<dt><b>-pose_normal_angle_max</b> \<Real\></dt>
<dd>Máximo del ángulo de la normal respecto a normal_start para el embebido del Pose. Grados.<br/></dd>
<dt><b>-no_interpolate_Mpair</b> \<Boolean\></dt>
<dd>del código antiguo.<br/></dd>
<dt><b>-Hbond_depth_correction</b> \<Boolean\></dt>
<dd>del código antiguo.<br/></dd>
<dt><b>-TMprojection</b> \<Boolean\></dt>
<dd>Activar/desactivar la penalización por desajuste hidrofóbico.<br/></dd>
<dt><b>-wt_TMprojection</b> \<Real\></dt>
<dd>Peso de la penalización por desajuste hidrofóbico.<br/></dd>
<dt><b>-non_helix</b> \<Boolean\></dt>
<dd>Activar/desactivar la penalización por residuos que no son hélice dentro de la membrana.<br/></dd>
<dt><b>-wt_non_helix</b> \<Real\></dt>
<dd>Peso de la penalización por residuos que no son hélice. <br/></dd>
<dt><b>-termini</b> \<Boolean\></dt>
<dd>Activar/desactivar la penalización por extremos terminales dentro de la membrana.<br/></dd>
<dt><b>-wt_termini</b> \<Real\></dt>
<dd>Peso de la penalización por extremos terminales.<br/></dd>
<dt><b>-secstruct</b> \<Boolean\></dt>
<dd>Activar/desactivar la penalización si la estructura secundaria basada en la estructura no coincide con la predicha<br/></dd>
<dt><b>-wt_secstruct</b> \<Real\></dt>
<dd>Peso de la penalización por estructura secundaria.<br/></dd>
<dt><b>-spanning</b> \<Boolean\></dt>
<dd>Activar/desactivar la penalización si los segmentos transmembrana basados en la estructura no coinciden con el spanfile.<br/></dd>
<dt><b>-wt_spanning</b> \<Real\></dt>
<dd>Peso de la penalización por segmentos transmembrana.<br/></dd>
</dl>
+ <h3>-mp:lipids</h3>
<dl>
<dt><b>-lipids</b> \<Boolean\></dt>
<dd>grupo de opciones lipids<br/></dd>
<dt><b>-composition</b> \<String\></dt>
<dd>Tipo de lípidos que se usarán en la representación del modelo implícito.<br/>Default: "DLPC"<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>Temperatura a la que se midieron los parámetros de composición lipídica<br/>Default: 37.0<br/></dd>
<dt><b>-has_pore</b> \<Boolean\></dt>
<dd>Anulación manual: no usar la estimación de poros<br/></dd>
</dl>
+ <h3>-mp:viewer</h3>
<dl>
<dt><b>-viewer</b> \<Boolean\></dt>
<dd>grupo de opciones viewer<br/></dd>
<dt><b>-thickness</b> \<Real\></dt>
<dd>Grosor de la membrana que se visualizará<br/>Default: 15<br/></dd>
<dt><b>-num_points</b> \<Integer\></dt>
<dd>Número de puntos para definir los planos de la membrana. x >= 3<br/></dd>
</dl>
+ <h3>-mp:visualize</h3>
<dl>
<dt><b>-visualize</b> \<Boolean\></dt>
<dd>grupo de opciones visualize<br/></dd>
<dt><b>-embedding</b> \<Boolean\></dt>
<dd>Visualizar los centros y las normales de embebido de cada elemento del Pose<br/>Default: true<br/></dd>
<dt><b>-spacing</b> \<Real\></dt>
<dd>Espaciado de los residuos virtuales de membrana que representan los planos de la membrana<br/>Default: 5<br/></dd>
<dt><b>-width</b> \<Real\></dt>
<dd>Ancho de los planos de membrana para un plano de n por n<br/>Default: 100<br/></dd>
<dt><b>-thickness</b> \<Real\></dt>
<dd>Grosor de la membrana que se visualizará<br/>Default: 15<br/></dd>
<dt><b>-plane_radius</b> \<Real\></dt>
<dd>Radio de los planos de membrana que se dibujan en PyMOL; parte del plugin visor de PyMOL<br/></dd>
</dl>
+ <h3>-mp:scoring</h3>
<dl>
<dt><b>-scoring</b> \<Boolean\></dt>
<dd>grupo de opciones scoring<br/></dd>
<dt><b>-hbond</b> \<Boolean\></dt>
<dd>Corrección de energía de enlaces de hidrógeno para proteínas de membrana<br/>Default: false<br/></dd>
<dt><b>-analytic_membetable_evaluation</b> \<Boolean\></dt>
<dd>Si es true, las energías de solvatación de la membrana se calcularán analíticamente, en lugar de calcularse de antemano y guardarse en memb_etable<br/>Default: true<br/></dd>
</dl>
+ <h3>-mp:setup</h3>
<dl>
<dt><b>-setup</b> \<Boolean\></dt>
<dd>grupo de opciones setup<br/></dd>
<dt><b>-spanfiles</b> \<StringVector\></dt>
<dd>Archivo de topología transmembrana de Octopus<br/></dd>
<dt><b>-span1</b> \<String\></dt>
<dd>Archivo de topología transmembrana para el socio 1<br/></dd>
<dt><b>-span2</b> \<String\></dt>
<dd>Archivo de topología transmembrana para el socio 2<br/></dd>
<dt><b>-spans_from_structure</b> \<Boolean\></dt>
<dd>Usa la topología transmembrana calculada a partir del PDB; ¡requiere que la proteína se transforme al sistema de coordenadas de la membrana!<br/></dd>
<dt><b>-lipsfile</b> \<String\></dt>
<dd>Lista de archivos lips por cadena<br/>Default: "mypdb.lips4"<br/></dd>
<dt><b>-center</b> \<RealVector\></dt>
<dd>centro de la membrana x,y,z<br/></dd>
<dt><b>-normal</b> \<RealVector\></dt>
<dd>normal de la membrana x,y,z<br/></dd>
<dt><b>-membrane_rsd</b> \<Real\></dt>
<dd>número de residuo de la membrana<br/></dd>
<dt><b>-transform_into_membrane</b> \<Boolean\></dt>
<dd>score_jd2: transformar la proteína en la membrana fija antes de puntuar; requiere spanfile<br/></dd>
<dt><b>-position_from_topo</b> \<Boolean\></dt>
<dd>determinar la posición en la membrana a partir de los segmentos transmembrana de la proteína<br/></dd>
<dt><b>-optimize1</b> \<Boolean\></dt>
<dd>Optimizar la posición en la membrana del socio 1 usando la función de puntuación de membrana.<br/>Default: false<br/></dd>
<dt><b>-optimize2</b> \<Boolean\></dt>
<dd>Optimizar la posición en la membrana del socio 2 usando la función de puntuación de membrana.<br/>Default: false<br/></dd>
</dl>
+ <h3>-mp:lipid_acc</h3>
<dl>
<dt><b>-lipid_acc</b> \<Boolean\></dt>
<dd>grupo de opciones lipid_acc<br/></dd>
<dt><b>-angle_cutoff</b> \<Real\></dt>
<dd>Corte del ángulo CA-CB-COM para identificar residuos accesibles a los lípidos, en grados. <90 mira hacia el COM, >90 mira en dirección contraria al COM.<br/>Default: 65<br/></dd>
<dt><b>-slice_width</b> \<Real\></dt>
<dd>Ancho de la rebanada en Å para calcular el casco (hull).<br/>Default: 10.0<br/></dd>
<dt><b>-shell_radius</b> \<Real\></dt>
<dd>Radio de la capa de los átomos más externos que todavía se cuentan como frontera, es decir, qué grosor tiene la capa expuesta a lípidos desde el exterior.<br/>Default: 5.0<br/></dd>
<dt><b>-dist_cutoff</b> \<Real\></dt>
<dd>Las distancias entre átomos de frontera mayores que este corte (en 2D) se recortarán. Todo lo que sea mayor se conservará como átomos de frontera.<br/>Default: 5.0<br/></dd>
<dt><b>-tm_alpha</b> \<Boolean\></dt>
<dd>¿La estructura secundaria principal en la membrana es helicoidal?<br/>Default: true<br/></dd>
</dl>
+ <h3>-mp:geo</h3>
<dl>
<dt><b>-geo</b> \<Boolean\></dt>
<dd>grupo de opciones geo<br/></dd>
<dt><b>-bicelle_radius</b> \<Real\></dt>
<dd>Radio interno de la bicelle. El inner_radius de la bicelle es el radio del cilindro plano de la forma de bicelle; el radio externo es inner_radius+grosor de la membrana. Poner bicelle_radius en 0 crearía un elipsoide con radio = grosor de la membrana (por defecto 15). Ten en cuenta que, al fijar bicelle_radius, el tamaño de la bicelle creada no depende del tamaño de la proteína. Conviene que tengas en cuenta el tamaño de tu proteína al fijar bicelle_radius.<br/></dd>
<dt><b>-vesicle_radius</b> \<Real\></dt>
<dd>Radio de la vesícula. Distancia desde el centro de la vesícula/esfera hasta el centro de la membrana.<br/></dd>
<dt><b>-double_vesicle_inner_radius</b> \<Real\></dt>
<dd>Fija el radio de la vesícula interna. Es la distancia desde el centro de la vesícula hasta el centro de la membrana interna. El radio externo lo determina la opción double_vesicle_distance.<br/></dd>
<dt><b>-double_vesicle_distance</b> \<Real\></dt>
<dd>Distancia entre el borde exterior de la membrana de la vesícula interna y el borde interior de la membrana de la vesícula externa. <br/></dd>
</dl>
+ <h3>-mp:transform</h3>
<dl>
<dt><b>-transform</b> \<Boolean\></dt>
<dd>grupo de opciones transform<br/></dd>
<dt><b>-optimize_embedding</b> \<Boolean\></dt>
<dd>Usar la función de puntuación para optimizar el embebido después de un ajuste inicial de grano grueso<br/></dd>
</dl>
+ <h3>-mp:assembly</h3>
<dl>
<dt><b>-assembly</b> \<Boolean\></dt>
<dd>grupo de opciones assembly<br/></dd>
<dt><b>-TM_pose_number</b> \<Integer\></dt>
<dd>Número del archivo PDB de la lista -in:file:l que está ubicado en la membrana. Entero<br/></dd>
<dt><b>-poses</b> \<StringVector\></dt>
<dd>Nombres de los archivos PDB que se considerarán. StringVector.<br/></dd>
</dl>
+ <h3>-mp:dock</h3>
<dl>
<dt><b>-dock</b> \<Boolean\></dt>
<dd>grupo de opciones dock<br/></dd>
<dt><b>-weights_cen</b> \<String\></dt>
<dd>Función de puntuación para el paso de baja resolución.<br/></dd>
<dt><b>-weights_fa</b> \<String\></dt>
<dd>Función de puntuación para el paso de alta resolución.<br/></dd>
<dt><b>-lowres</b> \<Boolean\></dt>
<dd>Usar la función de puntuación centroide para encontrar la interfaz.<br/></dd>
<dt><b>-allow_flips</b> \<Boolean\></dt>
<dd>Permitir que el socio 2 se voltee en la membrana durante la búsqueda global. Por defecto: sí.<br/></dd>
<dt><b>-flexible_bb</b> \<Boolean\></dt>
<dd>Hacer un docking con cadena principal flexible: ejecuta relax antes y después del docking.<br/></dd>
<dt><b>-flexible_sc</b> \<Boolean\></dt>
<dd>Hacer un docking con cadenas laterales flexibles: reempaqueta antes y después del docking.<br/></dd>
<dt><b>-slide_threshold</b> \<Real\></dt>
<dd>Umbral del término de puntuación para definir la cercanía de los socios en SlideIntoContact.<br/></dd>
</dl>
+ <h3>-mp:quickrelax</h3>
<dl>
<dt><b>-quickrelax</b> \<Boolean\></dt>
<dd>grupo de opciones quickrelax<br/></dd>
<dt><b>-angle_max</b> \<Real\></dt>
<dd>Cambio máximo permitido en los ángulos diedros. Los valores típicos rondan 1.<br/></dd>
<dt><b>-nmoves</b> \<String\></dt>
<dd>Número de movimientos permitidos. El valor típico es cercano al número de residuos de la proteína: [nres] es un valor permitido. <br/></dd>
<dt><b>-repack_again</b> \<Boolean\></dt>
<dd>Hacer una ronda adicional de reempaquetado de cadenas laterales, incluyendo todas las cadenas laterales a la vez.<br/></dd>
</dl>
+ <h3>-mp:mutate_relax</h3>
<dl>
<dt><b>-mutate_relax</b> \<Boolean\></dt>
<dd>grupo de opciones mutate_relax<br/></dd>
<dt><b>-mutation</b> \<StringVector\></dt>
<dd>Vector de mutaciones individuales. Formato: código de una letra / número de residuo / código de una letra. Ejemplo: A163F<br/></dd>
<dt><b>-mutant_file</b> \<String\></dt>
<dd>Archivo de entrada que contiene mutaciones<br/></dd>
<dt><b>-nmodels</b> \<Integer\></dt>
<dd>Número de modelos que se producen por construcción. Típicamente entre 50 y 1,000.<br/></dd>
<dt><b>-repack_mutation_only</b> \<Boolean\></dt>
<dd>Booleano: solo reempaquetar el o los residuos mutados, sin relax.<br/></dd>
<dt><b>-repack_radius</b> \<Real\></dt>
<dd>Decimal: reempaquetar dentro de un radio de X Å del o los residuos mutados.<br/></dd>
<dt><b>-relax</b> \<Boolean\></dt>
<dd>Booleano: hacer una ejecución completa de relax con minimización de la cadena principal y reempaquetado.<br/></dd>
</dl>
+ <h3>-mp:benchmark</h3>
<dl>
<dt><b>-benchmark</b> \<Boolean\></dt>
<dd>grupo de opciones benchmark<br/></dd>
</dl>
+ <h4>-mp:benchmark:ideal_helix</h4>
<dl>
<dt><b>-ideal_helix</b> \<Boolean\></dt>
<dd>grupo de opciones ideal_helix<br/></dd>
<dt><b>-helix_start</b> \<Real\></dt>
<dd>Posición inicial de los ángulos diedros de hélice ideal<br/></dd>
<dt><b>-helix_end</b> \<Real\></dt>
<dd>Posición final de los ángulos diedros de hélice ideal<br/></dd>
</dl>
+ <h4>-mp:benchmark:tilt_angle</h4>
<dl>
<dt><b>-tilt_angle</b> \<Boolean\></dt>
<dd>grupo de opciones tilt_angle<br/></dd>
<dt><b>-output</b> \<String\></dt>
<dd>Ruta al archivo de salida de ángulo de inclinación frente a puntuación<br/></dd>
</dl>
+ <h3>-mp:output</h3>
<dl>
<dt><b>-output</b> \<Boolean\></dt>
<dd>grupo de opciones output<br/></dd>
<dt><b>-normalize_to_thk</b> \<Boolean\></dt>
<dd>Escribir en el PDB un dato adicional de residuo MEM en el que la normal de la membrana se escala para coincidir con el grosor actual de la membrana (tiene sentido para modelos IMM)<br/></dd>
<dt><b>-output_mem_to_pdb</b> \<Boolean\></dt>
<dd>No escribir un residuo MEM en el PDB de salida<br/></dd>
</dl>
+ <h2>-membrane</h2>
<dl>
<dt><b>-membrane</b> \<Boolean\></dt>
<dd>grupo de opciones membrane<br/></dd>
<dt><b>-normal_cycles</b> \<Integer\></dt>
<dd>número de ciclos de la normal de la membrana<br/>Default: 100<br/></dd>
<dt><b>-normal_mag</b> \<Real\></dt>
<dd>magnitud de la búsqueda del ángulo de la normal de la membrana (grados)<br/>Default: 5<br/></dd>
<dt><b>-center_mag</b> \<Real\></dt>
<dd>magnitud de la búsqueda del centro de la normal de la membrana (Å)<br/>Default: 1<br/></dd>
<dt><b>-smooth_move_frac</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.5<br/></dd>
<dt><b>-no_interpolate_Mpair</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-Menv_penalties</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-Membed_init</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-Fa_Membed_update</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-center_search</b> \<Boolean\></dt>
<dd>realizar la búsqueda del centro de la membrana<br/>Default: false<br/></dd>
<dt><b>-normal_search</b> \<Boolean\></dt>
<dd>realizar la búsqueda de la normal de la membrana<br/>Default: false<br/></dd>
<dt><b>-center_max_delta</b> \<Integer\></dt>
<dd>magnitud de la desviación máxima del ancho de la membrana durante la búsqueda del centro de la membrana (Å)<br/>Default: 5<br/></dd>
<dt><b>-normal_start_angle</b> \<Integer\></dt>
<dd>magnitud del ángulo inicial durante la búsqueda de la normal de la membrana (grados)<br/>Default: 10<br/></dd>
<dt><b>-normal_delta_angle</b> \<Integer\></dt>
<dd>magnitud de la desviación angular durante la búsqueda de la normal de la membrana (grados)<br/>Default: 10<br/></dd>
<dt><b>-normal_max_angle</b> \<Integer\></dt>
<dd>magnitud de la desviación angular máxima durante la búsqueda de la normal de la membrana (grados)<br/>Default: 40<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-fixed_membrane</b> \<Boolean\></dt>
<dd>fijar la posición de la membrana; por defecto el centro está en [0,0,0] y la normal de la membrana es el eje z<br/>Default: false<br/></dd>
<dt><b>-membrane_center</b> \<RealVector\></dt>
<dd>centro de la membrana x,y,z<br/></dd>
<dt><b>-membrane_normal</b> \<RealVector\></dt>
<dd>normal de la membrana x,y,z<br/></dd>
<dt><b>-view</b> \<Boolean\></dt>
<dd>ver el Pose durante el protocolo<br/>Default: false<br/></dd>
<dt><b>-Mhbond_depth</b> \<Boolean\></dt>
<dd>corrección del potencial de enlaces de hidrógeno dependiente de la profundidad en la membrana<br/>Default: false<br/></dd>
<dt><b>-thickness</b> \<Real\></dt>
<dd>grosor de hidrocarburo de una hoja para los cálculos de solvatación (Å)<br/>Default: 15<br/></dd>
</dl>
+ <h2>-mistakes</h2>
<dl>
<dt><b>-mistakes</b> \<Boolean\></dt>
<dd>grupo de opciones mistakes<br/></dd>
<dt><b>-restore_pre_talaris_2013_behavior</b> \<Boolean\></dt>
<dd>Restaurar el conjunto de valores por defecto que estaban vigentes antes de que los parámetros de Talaris2013 pasaran a ser los predeterminados. Es una opción general que fija las siguientes opciones si no se han fijado en la línea de comandos a algún otro valor -mistakes::chemical::pre_talaris2013_geometries true -corrections::score::dun10 false -corrections::score::use_bicubic_interpolation false -corrections::score:hb_sp2_chipen false -corrections::score::hb_fade_energy false -corrections::score::hbond_measure_sp3acc_BAH_from_hvy false -corrections::score::lj_hbond_hdis 1.95 -corrections::score::lj_hbond_OH_donor_dis 3.0 -corrections::chemical::expand_st_chi2sampling false -score::weights pre_talaris_2013_standard.wts -score::patch score12.wts_patch -score::analytic_etable_evaluation false -score::hbond_params score12_params -score::smooth_fa_elec false -score::elec_min_dis 1.5 -chemical::set_atom_properties fa_standard:ONH2:LK_DGFREE:-10.0 fa_standard:NH2O:LK_DGFREE:-10.0 fa_standard:Narg:LK_DGFREE:-11.0 fa_standard:OH:LK_DGFREE:-6.77<br/>Default: false<br/></dd>
</dl>
+ <h3>-mistakes:chemical</h3>
<dl>
<dt><b>-chemical</b> \<Boolean\></dt>
<dd>grupo de opciones chemical<br/></dd>
<dt><b>-pre_talaris2013_geometries</b> \<Boolean\></dt>
<dd>Usar la versión de las geometrías fa_standard que estaba activa antes de que los parámetros de Talaris2013 pasaran a ser los predeterminados<br/>Default: false<br/></dd>
</dl>
+ <h2>-MonteCarlo</h2>
<dl>
<dt><b>-MonteCarlo</b> \<Boolean\></dt>
<dd>grupo de opciones MonteCarlo<br/></dd>
<dt><b>-temp_initial</b> \<Real\></dt>
<dd>temperatura inicial para las consideraciones de Monte Carlo<br/>Rango: 0.001-<br/>Default: 2<br/></dd>
<dt><b>-temp_final</b> \<Real\></dt>
<dd>temperatura final para las consideraciones de Monte Carlo<br/>Rango: 0.001-<br/>Default: 0.6<br/></dd>
</dl>
+ <h2>-optimization</h2>
<dl>
<dt><b>-optimization</b> \<Boolean\></dt>
<dd>grupo de opciones optimization<br/></dd>
<dt><b>-default_max_cycles</b> \<Integer\></dt>
<dd>ciclos máximos para MinimizerOptions<br/>Default: 2000<br/></dd>
<dt><b>-armijo_min_stepsize</b> \<Real\></dt>
<dd>tamaño de paso mínimo en el minimizador armijo<br/>Default: 1e-8<br/></dd>
<dt><b>-scale_normalmode_dampen</b> \<Real\></dt>
<dd>escala de amortiguación sobre el índice de modo normal, usada por NormalModeMinimizer<br/>Default: 0.05<br/></dd>
<dt><b>-lbfgs_M</b> \<Integer\></dt>
<dd>número de correcciones para aproximar la matriz hessiana inversa.<br/>Default: 128<br/></dd>
<dt><b>-scale_d</b> \<Real\></dt>
<dd>ciclos máximos para MinimizerOptions<br/>Default: 1<br/></dd>
<dt><b>-scale_theta</b> \<Real\></dt>
<dd>ciclos máximos para MinimizerOptions<br/>Default: 1<br/></dd>
<dt><b>-scale_rb</b> \<Real\></dt>
<dd>ciclos máximos para MinimizerOptions<br/>Default: 10<br/></dd>
<dt><b>-scale_rbangle</b> \<Real\></dt>
<dd>ciclos máximos para MinimizerOptions<br/>Default: 1<br/></dd>
<dt><b>-scmin_nonideal</b> \<Boolean\></dt>
<dd>¿Permitimos la no idealidad de las cadenas laterales durante scmin (p. ej., rtmin y min_pack)?<br/>Default: false<br/></dd>
<dt><b>-scmin_cartesian</b> \<Boolean\></dt>
<dd>Activar/desactivar la minimización en espacio cartesiano durante scmin (p. ej., rmin y min_pack)<br/>Default: false<br/></dd>
<dt><b>-nonideal</b> \<Boolean\></dt>
<dd>Permitir que las geometrías de enlace varíen respecto a los valores ideales<br/>Default: false<br/></dd>
<dt><b>-old_sym_min</b> \<Boolean\></dt>
<dd>Usar el enfoque antiguo de minimización simétrica<br/>Default: false<br/></dd>
<dt><b>-debug_inaccurate_G</b> \<Boolean\></dt>
<dd>Depurar mensajes de G inexacto<br/>Default: false<br/></dd>
<dt><b>-cmaes_rgsigma</b> \<Real\></dt>
<dd>Desviación estándar inicial por coordenada de CMAES (tamaño de paso)<br/>Default: 0.3<br/></dd>
<dt><b>-cmaes_lambda</b> \<Integer\></dt>
<dd>Tamaño de población de CMAES; por defecto se define en función de la dimensión (N) (es decir, 4+(int)(3*log((double)N))); para usar el valor por defecto, pon un valor < 2<br/>Default: 0<br/></dd>
</dl>
+ <h2>-orbitals</h2>
<dl>
<dt><b>-orbitals</b> \<Boolean\></dt>
<dd>grupo de opciones orbitals<br/></dd>
<dt><b>-Hpol</b> \<Boolean\></dt>
<dd>considerar solo las interacciones de hidrógenos polares<br/>Default: false<br/></dd>
<dt><b>-Haro</b> \<Boolean\></dt>
<dd>considerar solo las interacciones de hidrógenos aromáticos<br/>Default: false<br/></dd>
<dt><b>-bb_stats</b> \<Boolean\></dt>
<dd>considerar las estadísticas de orbitales de la cadena principal<br/>Default: false<br/></dd>
<dt><b>-sc_stats</b> \<Boolean\></dt>
<dd>considerar las estadísticas de orbitales de cadenas laterales<br/>Default: false<br/></dd>
</dl>
+ <h2>-pose_metrics</h2>
<dl>
<dt><b>-pose_metrics</b> \<Boolean\></dt>
<dd>grupo de opciones pose_metrics<br/></dd>
<dt><b>-atomic_burial_cutoff</b> \<Real\></dt>
<dd> SASA máxima permitida para que un átomo cuente como enterrado en BuriedUnsatisfiedPolarsCalculator<br/>Default: 0.3<br/></dd>
<dt><b>-sasa_calculator_probe_radius</b> \<Real\></dt>
<dd> el radio de sonda usado en el calculador de SASA (y, por tanto, implícitamente en BuriedUnsatisfiedPolarsCalculator<br/>Default: 1.4<br/></dd>
<dt><b>-interface_cutoff</b> \<Real\></dt>
<dd>distancia en Å (por defecto 10.0) para calcular qué residuos están en una interfaz mediante InterfaceNeighborDefinitionCalculator<br/>Default: 10.0<br/></dd>
<dt><b>-min_sequence_separation</b> \<Integer\></dt>
<dd> número mínimo de posiciones de secuencia que deben separar a dos residuos para contar como no locales en NonlocalContactsCalculator<br/>Default: 6<br/></dd>
<dt><b>-contact_cutoffE</b> \<Real\></dt>
<dd> energía de interacción máxima permitida entre dos residuos para contar como contacto en NonlocalContactsCalculator<br/>Default: -1.0<br/></dd>
<dt><b>-neighbor_by_distance_cutoff</b> \<Real\></dt>
<dd>distancia en Å (por defecto 10.0) para calcular los vecinos de un residuo mediante NeighborByDistanceCalculator<br/>Default: 10.0<br/></dd>
<dt><b>-inter_group_neighbors_cutoff</b> \<Real\></dt>
<dd>distancia en Å (por defecto 10.0) para calcular las interfaces entre dominios con InterGroupNeighborsCalculator<br/>Default: 10.0<br/></dd>
<dt><b>-semiex_water_burial_cutoff</b> \<Real\></dt>
<dd>corte de la fracción de estados de enlaces de hidrógeno de aguas para SemiExplicitWaterUnsatisfiedPolarsCalculator (0.0,1.0)<br/>Default: 0.25<br/></dd>
</dl>
+ <h3>-pose_metrics:shobuns</h3>
<dl>
<dt><b>-shobuns</b> \<Boolean\></dt>
<dd>grupo de opciones shobuns<br/></dd>
<dt><b>-tgt_amino</b> \<String\></dt>
<dd>Tipo de aminoácido objetivo<br/>Default: "_none_"<br/></dd>
<dt><b>-tgt_atom</b> \<String\></dt>
<dd>Nombre del átomo objetivo<br/>Default: "_none_"<br/></dd>
<dt><b>-tgt_res</b> \<File\></dt>
<dd>Archivo que especifica un subconjunto de residuos objetivo<br/>Default: ""<br/></dd>
<dt><b>-sho_cutoff</b> \<Real\></dt>
<dd>valor SHO máximo para que un átomo se considere expuesto al solvente<br/>Default: 4.9<br/></dd>
</dl>
+ <h2>-rigid</h2>
<dl>
<dt><b>-rigid</b> \<Boolean\></dt>
<dd>grupo de opciones rigid<br/></dd>
<dt><b>-chainbreak_bias</b> \<Real\></dt>
<dd>Intensidad del sesgo aplicado al componente de traslación de los movimientos de cuerpo rígido para cerrar el chainbreak<br/>Default: 0.00<br/></dd>
<dt><b>-close_loops</b> \<Boolean\></dt>
<dd>Realizar el cierre de loops al final de medal<br/>Default: true<br/></dd>
<dt><b>-fragment_cycles</b> \<Integer\></dt>
<dd>Número de ciclos de inserción de fragmentos/cuerpo rígido<br/>Default: 10000<br/></dd>
<dt><b>-log_accepted_moves</b> \<Boolean\></dt>
<dd>Escribir los movimientos aceptados en la salida silent<br/>Default: false<br/></dd>
<dt><b>-max_ca_ca_dist</b> \<Real\></dt>
<dd>Distancia máxima entre átomos CA consecutivos antes de que se produzca la partición en trozos<br/>Default: 5.0<br/></dd>
<dt><b>-patch</b> \<File\></dt>
<dd>Archivo de parche que contiene los términos de energía y sus pesos respectivos<br/></dd>
<dt><b>-residues_backbone_move</b> \<Integer\></dt>
<dd>Número de residuos perturbados por un movimiento de la cadena principal<br/>Default: 5<br/></dd>
<dt><b>-rotation</b> \<Real\></dt>
<dd>Magnitud de rotación<br/>Default: 2.5<br/></dd>
<dt><b>-sampling_prob</b> \<File\></dt>
<dd>Probabilidades de muestreo por residuo, normalizadas<br/></dd>
<dt><b>-score</b> \<String\></dt>
<dd>Función de puntuación de nivel centroide<br/>Default: "score3"<br/></dd>
<dt><b>-sequence_separation</b> \<Integer\></dt>
<dd>Separación máxima de secuencia para puntuar chainbreaks<br/>Default: 20<br/></dd>
<dt><b>-small_cycles</b> \<Integer\></dt>
<dd>Número de ciclos small/shear<br/>Default: 8000<br/></dd>
<dt><b>-stages</b> \<Integer\></dt>
<dd>Número de etapas a lo largo de las cuales se interpolan los valores graduales<br/>Default: 4<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>Temperatura de Monte Carlo<br/>Default: 2.0<br/></dd>
<dt><b>-translation</b> \<Real\></dt>
<dd>Magnitud de traslación<br/>Default: 0.5<br/></dd>
</dl>
+ <h2>-sasa</h2>
<dl>
<dt><b>-sasa</b> \<Boolean\></dt>
<dd>grupo de opciones sasa<br/></dd>
<dt><b>-method</b> \<String\></dt>
<dd>El método usado para calcular la sasa. Ojalá se añadan más en el futuro.<br/>Default: "LeGrand"<br/></dd>
<dt><b>-include_hydrogens_explicitly</b> \<Boolean\></dt>
<dd>Incluir hidrógenos de forma explícita en el cálculo. Los cálculos explícitos e implícitos usan conjuntos de radios distintos. Estos conjuntos por defecto se pueden controlar desde la línea de comandos. Históricamente, los cálculos incluían los hidrógenos de forma implícita. Algunos protocolos pueden sobrescribir este ajuste según sus necesidades.<br/>Default: true<br/></dd>
<dt><b>-probe_radius</b> \<Real\></dt>
<dd>Radio de sonda usado por SasaCalc. Por defecto es el radio del agua. También se usa comúnmente 1.2.<br/>Default: 1.4<br/></dd>
<dt><b>-include_probe_radius_in_atom_radii</b> \<Boolean\></dt>
<dd>Esto se hace normalmente en el cálculo de SASA y, de hecho, es una de sus características definitorias. Desactívalo para calcular el área superficial en su lugar.<br/>Default: true<br/></dd>
<dt><b>-include_only_C_S_in_hsasa</b> \<Boolean\></dt>
<dd>Incluir solo carbono o azufre en el cálculo de hsasa. Es lo habitual. Solo vuelve a false si excluyes los átomos polares por carga; de lo contrario, todo se contará como hidrofóbico. Ten en cuenta que los hidrógenos se manejan automáticamente.<br/>Default: true<br/></dd>
<dt><b>-exclude_polar_atoms_by_charge_in_hsasa</b> \<Boolean\></dt>
<dd>Los carbonos polares y otros átomos no deben incluirse en la hSASA hidrofóbica, aunque históricamente sí se incluían. Ponlo en false para obtener la hsasa histórica<br/>Default: false<br/></dd>
<dt><b>-polar_charge_cutoff</b> \<Real\></dt>
<dd>Corte de carga (valor absoluto) que se usa en los átomos pesados si se excluyen átomos hidrofóbicos del cálculo de hSASA por carga. El valor por defecto está optimizado para los tipos de átomo de proteína (lo que excluye solo los carbonos carbonilo y carboxilo). Por defecto solo se excluyen carbono y azufre.<br/>Default: .4<br/></dd>
<dt><b>-implicit_hydrogen_radii_set</b> \<String\></dt>
<dd>El conjunto de radios que se usa cuando los hidrógenos se incluyen de forma implícita en lugar de explícita. Los radios de Chothia 1976 los usa el programa Naccess. chothia=naccess<br/>Default: "chothia"<br/></dd>
<dt><b>-explicit_hydrogen_radii_set</b> \<String\></dt>
<dd>El conjunto de radios que se usa cuando los hidrógenos se incluyen de forma explícita. Por defecto es reduce, que se acordó de manera general en Minicon 2014 y proviene de los datos originales de Bondi (1964) y Gavezzotti (1983). LJ son los radios de Lennard-Jones de Rosetta, que no son exactamente los de Charmm. Los radios legacy se optimizaron para un término de puntuación que ya no está en Rosetta (Jerry Tsai et al 2003)<br/>Default: "reduce"<br/></dd>
</dl>
+ <h2>-symmetry</h2>
<dl>
<dt><b>-symmetry</b> \<Boolean\></dt>
<dd>grupo de opciones symmetry<br/></dd>
<dt><b>-symmetry_definition</b> \<String\></dt>
<dd>Archivo de texto que describe la configuración de la simetría<br/></dd>
<dt><b>-reweight_symm_interactions</b> \<Real\></dt>
<dd>Escalar las interacciones entre subunidades con un peso especificado<br/>Default: 1.0<br/></dd>
<dt><b>-initialize_rigid_body_dofs</b> \<Boolean\></dt>
<dd>¿Inicializar los grados de libertad RB a partir del archivo de definición de simetría?<br/>Default: false<br/></dd>
<dt><b>-detect_bonds</b> \<Boolean\></dt>
<dd>permitir la formación de nuevos enlaces entre subunidades<br/>Default: true<br/></dd>
<dt><b>-perturb_rigid_body_dofs</b> \<RealVector\></dt>
<dd>(Como en docking) Hacer una pequeña perturbación de los grados de libertad simétricos: -perturb_rigid_body_dofs ANGSTROMS DEGREES<br/></dd>
<dt><b>-symmetric_rmsd</b> \<Boolean\></dt>
<dd>calcular el rmsd de forma simétrica comprobando todos los órdenes de cadenas<br/></dd>
</dl>
+ <h2>-abinitio</h2>
<dl>
<dt><b>-abinitio</b> \<Boolean\></dt>
<dd>Modo ab initio<br/></dd>
<dt><b>-membrane</b> \<Boolean\></dt>
<dd>usará el protocolo abinitio de membrana: inserción secuencial de hélices transmembrana (TMH)<br/>Default: false<br/></dd>
<dt><b>-use_loophash_filter</b> \<Boolean\></dt>
<dd>usar el filtro loophash para determinar si los elementos de estructura secundaria (SSE) están demasiado lejos<br/></dd>
<dt><b>-loophash_filter_acceptance_rate</b> \<Real\></dt>
<dd>fracción con la que se quieren aceptar Poses del filtro loophash si no se encuentran coincidencias de loophash<br/></dd>
<dt><b>-kill_hairpins</b> \<File\></dt>
<dd>configurar la eliminación de horquillas (hairpins) en la puntuación (archivo de eliminación de horquillas o archivo psipred)<br/></dd>
<dt><b>-kill_hairpins_frequency</b> \<Real\></dt>
<dd>frecuencia automática de eliminación de horquillas (para usar con el archivo psipred)<br/>Default: 0.2<br/></dd>
<dt><b>-smooth_cycles_only</b> \<Boolean\></dt>
<dd>Suavizar solo los ciclos en el protocolo abinitio<br/>Default: false<br/></dd>
<dt><b>-relax</b> \<Boolean\></dt>
<dd>¿Hacer un relax después de abinitio = abrelax?<br/></dd>
<dt><b>-final_clean_relax</b> \<Boolean\></dt>
<dd>Hacer un relax final sin restricciones<br/></dd>
<dt><b>-fastrelax</b> \<Boolean\></dt>
<dd>¿Hacer un fastrelax después de abinitio = abfastrelax?<br/></dd>
<dt><b>-multifastrelax</b> \<Boolean\></dt>
<dd>¿Hacer un fastrelax después de abinitio = abfastrelax?<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-clear_pose_cache</b> \<Boolean\></dt>
<dd>eliminar siempre las puntuaciones extra antes de la salida<br/>Default: false<br/></dd>
<dt><b>-explicit_pdb_debug</b> \<Boolean\></dt>
<dd>volcar siempre archivos pdb (no silent) durante las etapas de abinitio<br/>Default: false<br/></dd>
<dt><b>-use_filters</b> \<Boolean\></dt>
<dd>usar los filtros RG, orden de contactos y láminas <br/>Default: false<br/></dd>
<dt><b>-use_trRosetta_constraints</b> \<Boolean\></dt>
<dd>Si es true, se usa la red neuronal trRosetta para añadir al Pose restricciones basadas en la secuencia de entrada, que guían la trayectoria de predicción de la estructura a partir de una secuencia o de un alineamiento múltiple de secuencias. Requiere que Rosetta se haya compilado con -extras=tensorflow o -extras=tensorflow_gpu.<br/>Default: false<br/></dd>
<dt><b>-increase_cycles</b> \<Real\></dt>
<dd>Aumentar el número de ciclos en cada etapa de fold_abinitio (o pose_abinitio) por este factor<br/>Rango: 0.001-<br/>Default: 1.0<br/></dd>
<dt><b>-number_3mer_frags</b> \<Integer\></dt>
<dd>Número de los mejores fragmentos 3mer que se usan en el protocolo fold_abinitio<br/>Rango: 0-<br/>Default: 200<br/></dd>
<dt><b>-number_9mer_frags</b> \<Integer\></dt>
<dd>Número de los mejores fragmentos 9mer que se usan en el protocolo fold_abinitio<br/>Rango: 0-<br/>Default: 25<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>Temperatura usada en fold_abinitio<br/>Default: 2.0<br/></dd>
<dt><b>-rg_reweight</b> \<Real\></dt>
<dd>Reponderar la contribución del radio de giro a la puntuación total con este factor de escala<br/>Default: 1.0<br/></dd>
<dt><b>-rsd_wt_helix</b> \<Real\></dt>
<dd>Reponderar env, pair, cb de los residuos de hélice con este factor<br/>Default: 1.0<br/></dd>
<dt><b>-rsd_wt_strand</b> \<Real\></dt>
<dd>Reponderar env, pair, cb de los residuos de hebra con este factor<br/>Default: 1.0<br/></dd>
<dt><b>-rsd_wt_loop</b> \<Real\></dt>
<dd>Reponderar env, pair, cb de los residuos de loop con este factor<br/>Default: 1.0<br/></dd>
<dt><b>-skip_convergence_check</b> \<Boolean\></dt>
<dd>esta opción desactiva la comprobación de convergencia en la etapa3 (puntuación 2/5)<br/></dd>
<dt><b>-stage1_patch</b> \<FileVector\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante la etapa1 de abinitio<br/></dd>
<dt><b>-stage2_patch</b> \<FileVector\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante la etapa2 de abinitio<br/></dd>
<dt><b>-stage3a_patch</b> \<FileVector\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante la etapa3a de abinitio<br/></dd>
<dt><b>-stage3b_patch</b> \<FileVector\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante la etapa3b de abinitio<br/></dd>
<dt><b>-stage4_patch</b> \<FileVector\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante la etapa4 de abinitio<br/></dd>
<dt><b>-stage5_patch</b> \<FileVector\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante la etapa5 de abinitio<br/></dd>
<dt><b>-steal_3mers</b> \<Boolean\></dt>
<dd>robo (stealing): usar 3mers del nativo<br/>Default: false<br/></dd>
<dt><b>-steal_9mers</b> \<Boolean\></dt>
<dd>robo (stealing): usar 9mers del nativo<br/>Default: false<br/></dd>
<dt><b>-no_write_failures</b> \<Boolean\></dt>
<dd>no escribir las estructuras fallidas en la salida silent<br/>Default: false<br/></dd>
<dt><b>-relax_failures</b> \<Boolean\></dt>
<dd>aplicar relax a los fallos de todos modos<br/>Default: false<br/></dd>
<dt><b>-relax_with_jumps</b> \<Boolean\></dt>
<dd>interruptor para permitir relax incluso si los loops no están cerrados <br/>Default: false<br/></dd>
<dt><b>-process_store</b> \<Boolean\></dt>
<dd>ejecutar process_decoy en cada estructura del almacén de estructuras<br/>Default: false<br/></dd>
<dt><b>-fix_residues_to_native</b> \<IntegerVector\></dt>
<dd>las torsiones de estos residuos se copian del nativo y se fijan<br/>Default: 0<br/></dd>
<dt><b>-return_full_atom</b> \<Boolean\></dt>
<dd>devolver una estructura de todos los átomos aunque no se haga relax<br/>Default: false<br/></dd>
<dt><b>-detect_disulfide_before_relax</b> \<Boolean\></dt>
<dd>ejecutar detect_disulfides() antes de relax<br/>Default: false<br/></dd>
<dt><b>-close_loops</b> \<Boolean\></dt>
<dd>cerrar los loops<br/>Default: false<br/></dd>
<dt><b>-bGDT</b> \<Boolean\></dt>
<dd>calcular gdtmmm<br/>Default: true<br/></dd>
<dt><b>-dump_frags</b> \<Boolean\></dt>
<dd>para fines de control... volcar los fragmentos<br/>Default: false<br/></dd>
<dt><b>-jdist_rerun</b> \<Boolean\></dt>
<dd>recorrer las estructuras de entrada y evaluarlas ( pca, rmsd, energía de restricciones )<br/>Default: false<br/></dd>
<dt><b>-perturb</b> \<Real\></dt>
<dd>añadir una perturbación (gaussiana) a phi/psi del nativo<br/>Default: 0.0<br/></dd>
<dt><b>-rerun</b> \<Boolean\></dt>
<dd>recorrer las estructuras de entrada y evaluarlas ( pca, rmsd, energía de restricciones )<br/>Default: false<br/></dd>
<dt><b>-rmsd_residues</b> \<IntegerVector\></dt>
<dd>indicar el residuo inicial y final para el cálculo de rmsd.<br/>Default: -1<br/></dd>
<dt><b>-start_native</b> \<Boolean\></dt>
<dd>partir de la estructura nativa (en lugar de extendida)<br/>Default: false<br/></dd>
<dt><b>-cyclic_peptide</b> \<Boolean\></dt>
<dd>configurar restricciones de péptido cíclico (ciclación N a C) para ejecuciones abinitio<br/>Default: false<br/></dd>
<dt><b>-debug_structures</b> \<Boolean\></dt>
<dd>escribir las estructuras en archivos de salida de depuración<br/>Default: false<br/></dd>
<dt><b>-log_frags</b> \<File\></dt>
<dd>las inserciones de fragmentos (cada intento) se registrarán en un archivo<br/>Default: ""<br/></dd>
<dt><b>-only_stage1</b> \<Boolean\></dt>
<dd>útil para benchmarks: pone en 0 el ciclo de todas las etapas superiores<br/>Default: false<br/></dd>
<dt><b>-end_bias</b> \<Real\></dt>
<dd>fijar el endbias para los movimientos de fragmentos<br/>Default: 30.0<br/></dd>
<dt><b>-apply_end_bias</b> \<Boolean\></dt>
<dd>eliminar el endbias de los movimientos de fragmentos<br/>Default: true<br/></dd>
<dt><b>-symmetry_residue</b> \<Integer\></dt>
<dd>modo de simetría improvisado para dímeros; los fragmentos se insertan en i y en i + SR - 1<br/>Default: -1<br/></dd>
<dt><b>-vdw_weight_stage1</b> \<Real\></dt>
<dd>peso de vdw en la etapa1<br/>Default: 1.0<br/></dd>
<dt><b>-override_vdw_all_stages</b> \<Boolean\></dt>
<dd>aplicar vdw_weight_stage1 en todas las etapas<br/>Default: false<br/></dd>
<dt><b>-recover_low_in_stages</b> \<IntegerVector\></dt>
<dd>por defecto: 2 3 4; recover_low ocurre en las etapas 2 3 4<br/>Default: 0<br/></dd>
<dt><b>-skip_stages</b> \<IntegerVector\></dt>
<dd>di: 2 3 4, y omitirá las etapas 2 3 4<br/>Default: 0<br/></dd>
<dt><b>-close_chbrk</b> \<Boolean\></dt>
<dd>Cierre de chain break durante el abinitio clásico <br/>Default: false<br/></dd>
<dt><b>-include_stage5</b> \<Boolean\></dt>
<dd>la etapa5 contiene solo movimientos pequeños<br/>Default: false<br/></dd>
<dt><b>-close_loops_by_idealizing</b> \<Boolean\></dt>
<dd>cerrar los loops idealizando la estructura después de la etapa 4<br/>Default: false<br/></dd>
<dt><b>-optimize_cutpoints_using_kic</b> \<Boolean\></dt>
<dd>optimizar alrededor de los cutpoints usando relax cinemático<br/>Default: false<br/></dd>
<dt><b>-optimize_cutpoints_margin</b> \<Integer\></dt>
<dd><br/>Default: 5<br/></dd>
</dl>
+ <h3>-abinitio:star</h3>
<dl>
<dt><b>-star</b> \<Boolean\></dt>
<dd>grupo de opciones star<br/></dd>
<dt><b>-initial_dist_cutoff</b> \<Real\></dt>
<dd>Corte máximo de distancia para las restricciones que mantienen los residuos alineados en sus posiciones iniciales<br/>Default: 8.0<br/></dd>
<dt><b>-min_unaligned_len</b> \<Integer\></dt>
<dd>Longitud mínima de una región sin alinear<br/>Default: 3<br/></dd>
</dl>
+ <h2>-abrelax</h2>
<dl>
<dt><b>-abrelax</b> \<Boolean\></dt>
<dd>modo relax ab initio<br/></dd>
<dt><b>-fail_unclosed</b> \<Boolean\></dt>
<dd>las estructuras que no cierran los loops se informan como FAIL_DO_NOT_RETRY<br/>Default: false<br/></dd>
</dl>
+ <h2>-AnchoredDesign</h2>
<dl>
<dt><b>-AnchoredDesign</b> \<Boolean\></dt>
<dd>grupo de opciones AnchoredDesign<br/></dd>
<dt><b>-anchor</b> \<File\></dt>
<dd>archivo de especificación de anclaje<br/>Default: "anchor"<br/></dd>
<dt><b>-allow_anchor_repack</b> \<Boolean\></dt>
<dd>permitir el reempaquetado del anclaje (por defecto se impide)<br/>Default: false<br/></dd>
<dt><b>-vary_cutpoints</b> \<Boolean\></dt>
<dd>variar los cutpoints de los loops. Elige nuevos cutpoints al inicio de cada nstruct<br/>Default: false<br/></dd>
<dt><b>-no_frags</b> \<Boolean\></dt>
<dd>no usar fragmentos. Anula el paso de un archivo de fragmentos de estilo antiguo. Omite la generación de fragmentos de estilo nuevo.<br/>Default: false<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>modo de depuración (comprobaciones extra y volcados de pdb)<br/>Default: false<br/></dd>
<dt><b>-show_extended</b> \<Boolean\></dt>
<dd>volcar el PDB previo a la perturbación para comprobar si las torsiones del loop están extendidas o la secuencia está difuminada; solo para depuración<br/>Default: false<br/></dd>
<dt><b>-refine_only</b> \<Boolean\></dt>
<dd>modo solo refinamiento (omitir el paso de perturbación)<br/>Default: false<br/></dd>
<dt><b>-perturb_show</b> \<Boolean\></dt>
<dd>volcar los pdb centroide perturbados además de los resultados finales<br/>Default: false<br/></dd>
<dt><b>-perturb_cycles</b> \<Integer\></dt>
<dd>la fase de perturbación se ejecuta durante <input> ciclos<br/>Default: 5<br/></dd>
<dt><b>-perturb_temp</b> \<Real\></dt>
<dd>temperatura de Monte Carlo de la fase de perturbación<br/>Default: 0.8<br/></dd>
<dt><b>-perturb_CCD_off</b> \<Boolean\></dt>
<dd>remodelado de loops estilo CCD desactivado en la fase de perturbación (es decir, solo KIC)<br/>Default: false<br/></dd>
<dt><b>-perturb_KIC_off</b> \<Boolean\></dt>
<dd>remodelado de loops estilo KIC desactivado en la fase de perturbación (es decir, solo CCD)<br/>Default: false<br/></dd>
<dt><b>-refine_CCD_off</b> \<Boolean\></dt>
<dd>remodelado de loops estilo CCD desactivado en la fase de refinamiento (es decir, solo KIC)<br/>Default: false<br/></dd>
<dt><b>-refine_KIC_off</b> \<Boolean\></dt>
<dd>remodelado de loops estilo KIC desactivado en la fase de refinamiento (es decir, solo CCD)<br/>Default: false<br/></dd>
<dt><b>-refine_cycles</b> \<Integer\></dt>
<dd>la fase de refinamiento se ejecuta durante <input> ciclos<br/>Default: 5<br/></dd>
<dt><b>-refine_temp</b> \<Real\></dt>
<dd>temperatura de Monte Carlo de la fase de refinamiento<br/>Default: 0.8<br/></dd>
<dt><b>-refine_repack_cycles</b> \<Integer\></dt>
<dd>la fase de refinamiento reempaqueta cada <input> ciclos<br/>Rango: 2-<br/>Default: 20<br/></dd>
<dt><b>-rmsd</b> \<Boolean\></dt>
<dd>Calcular el RMSD de CA de la estructura resultado respecto a la estructura inicial<br/>Default: false<br/></dd>
<dt><b>-unbound_mode</b> \<Boolean\></dt>
<dd>Ignorar el anclaje, como si fuera modelado de loops<br/>Default: false<br/></dd>
<dt><b>-chainbreak_weight</b> \<Real\></dt>
<dd>Peso del término de chainbreak<br/>Default: 2.0<br/></dd>
</dl>
+ <h3>-AnchoredDesign:filters</h3>
<dl>
<dt><b>-filters</b> \<Boolean\></dt>
<dd>grupo de opciones filters<br/></dd>
<dt><b>-score</b> \<Real\></dt>
<dd>no imprimir las trayectorias con valores de la función de puntuación total superiores a este<br/>Default: 0<br/></dd>
<dt><b>-sasa</b> \<Real\></dt>
<dd>no imprimir las trayectorias con valores de delta sasa de interfaz inferiores a este<br/>Default: 500<br/></dd>
<dt><b>-omega</b> \<Boolean\></dt>
<dd>filtrar los omega que no sean trans<br/>Default: false<br/></dd>
</dl>
+ <h3>-AnchoredDesign:akash</h3>
<dl>
<dt><b>-akash</b> \<Boolean\></dt>
<dd>grupo de opciones akash<br/></dd>
<dt><b>-dyepos</b> \<Integer\></dt>
<dd>posición del colorante<br/>Default: 0<br/></dd>
</dl>
+ <h3>-AnchoredDesign:testing</h3>
<dl>
<dt><b>-testing</b> \<Boolean\></dt>
<dd>grupo de opciones testing<br/></dd>
<dt><b>-VDW_weight</b> \<Real\></dt>
<dd>peso VDW centroide; probando si 2 es mejor que 1<br/>Rango: 0-<br/>Default: 1.0<br/></dd>
<dt><b>-anchor_via_constraints</b> \<Boolean\></dt>
<dd>permitir que el anclaje y el salto se muevan; el anclaje se mantiene en su sitio mediante restricciones: ¡debes especificar restricciones!<br/>Default: false<br/></dd>
<dt><b>-delete_interface_native_sidechains</b> \<Boolean\></dt>
<dd>opción de benchmark. Eliminar las cadenas laterales de entrada como paso de pre-empaquetado antes de ejecutar las fases centroide o de todos los átomos. Úsala si también usas use_input_sc y haces benchmarking. use_input_sc se usa por la minimización de cadenas laterales, no para conservar las cadenas laterales de entrada.<br/></dd>
<dt><b>-RMSD_only_this</b> \<File\></dt>
<dd>Realizar solo cálculos de RMSD sin modificar la entrada. Se usa solo para volver a ejecutar métricas durante benchmarking/depuración.<br/></dd>
<dt><b>-anchor_noise_constraints_mode</b> \<Boolean\></dt>
<dd>Mantener el anclaje de forma laxa (mediante restricciones), no rígida. Genera automáticamente las restricciones a partir del Pose inicial. Aleatoriza levemente la posición del anclaje antes del modelado (hasta 1 Å en x,y,z respecto a la posición inicial). Solo es compatible con anclajes de un solo residuo. Se usó para atender el comentario de un revisor.<br/>Default: false<br/></dd>
<dt><b>-super_secret_fixed_interface_mode</b> \<Boolean\></dt>
<dd>mantener fijo el loop que contiene el anclaje. Actualmente en pruebas.<br/>Default: false<br/></dd>
<dt><b>-randomize_input_sequence</b> \<Boolean\></dt>
<dd>aleatoriza la secuencia de entrada empaquetando con una función de puntuación nula; usa el PackerTask especificado por AnchoredDesign (respeta el resfile, etc.).<br/>Default: false<br/></dd>
</dl>
+ <h2>-simple_metrics</h2>
<dl>
<dt><b>-simple_metrics</b> \<Boolean\></dt>
<dd>grupo de opciones simple_metrics<br/></dd>
<dt><b>-use_name_as_custom_type</b> \<Boolean\></dt>
<dd>Usar el nombre de la etiqueta como custom_type, a menos que haya un custom_type. Para usar fuera de la sección Protocols<br/>Default: false<br/></dd>
<dt><b>-use_name_as_metric</b> \<Boolean\></dt>
<dd>Usar el nombre de la etiqueta como nombre completo de la métrica. Para usar fuera de la sección Protocols. <br/>Default: false<br/></dd>
</dl>
+ <h2>-antibody</h2>
<dl>
<dt><b>-antibody</b> \<Boolean\></dt>
<dd>grupo de opciones Antibody<br/></dd>
<dt><b>-input_ab_scheme</b> \<String\></dt>
<dd>El esquema de numeración del archivo PDB.<br/>Default: "Chothia_Scheme"<br/></dd>
<dt><b>-output_ab_scheme</b> \<String\></dt>
<dd>Esquema de numeración de salida compatible con la mayoría de las aplicaciones de anticuerpos que escriben pdb. Consulta la documentación.<br/>Default: "Chothia_Scheme"<br/></dd>
<dt><b>-cdr_definition</b> \<String\></dt>
<dd>La definición de CDR que se usará. Las opciones actuales son: Chothia, Aroop, North, Kabat, Martin<br/>Default: "Aroop"<br/></dd>
<dt><b>-light_chain</b> \<String\></dt>
<dd>Tipo de cadena ligera, si se conoce. Por ahora solo se usa para el diseño.<br/>Default: "unknown"<br/></dd>
<dt><b>-check_cdr_chainbreaks</b> \<Boolean\></dt>
<dd>Comprobar los CDR del anticuerpo de entrada en busca de chainbreaks al inicializar RosettaAntibody y RosettaAntibodyDesign. Si se encuentran chainbreaks, el modelo no continuará. Un enlace peptídico en el loop se considera roto si su enlace C-N es > 2.0 Å<br/>Default: true<br/></dd>
<dt><b>-check_cdr_pep_bond_geom</b> \<Boolean\></dt>
<dd>Comprobar los CDR del anticuerpo de entrada en busca de mala geometría de enlaces peptídicos. Esto comprueba los ángulos de enlace Ca-C-N y C-N-Ca en busca de desviaciones -grandes- respecto a los valores mínimos y máximos hallados en un análisis reciente de la geometría de proteínas - Conformation dependence of backbone geometry in proteins. Structure -. Si se encuentran, el modelo no continuará. Usa FastRelax con minimización de ángulos de enlace para corregir los problemas. Estos problemas suelen surgir de loops cristalinos mal resueltos o de estructuras mal resueltas. Muchas estructuras antiguas de anticuerpos tienen algunos de estos problemas.<br/>Default: false<br/></dd>
<dt><b>-constrain_cter</b> \<Boolean\></dt>
<dd>La opción para activar o desactivar la penalización por restricción C-terminal en la función de puntuación de loops<br/>Default: false<br/></dd>
<dt><b>-auto_generate_kink_constraint</b> \<Boolean\></dt>
<dd>Generar la restricción de kink sobre la marcha<br/>Default: false<br/></dd>
<dt><b>-all_atom_mode_kink_constraint</b> \<Boolean\></dt>
<dd>Activar la restricción de kink en la fase de todos los átomos de la simulación<br/>Default: false<br/></dd>
<dt><b>-numbering_scheme</b> \<String\></dt>
<dd>Opción obsoleta de esquema de numeración<br/>Default: "Chothia_Scheme"<br/></dd>
<dt><b>-graft_l1</b> \<Boolean\></dt>
<dd>Injertar el CDR L1 desde una plantilla<br/>Default: false<br/></dd>
<dt><b>-l1_template</b> \<String\></dt>
<dd>Elegir la plantilla especificada para el injerto del CDR L1<br/>Default: "l1.pdb"<br/></dd>
<dt><b>-graft_l2</b> \<Boolean\></dt>
<dd>Injertar el CDR L2 desde una plantilla<br/>Default: false<br/></dd>
<dt><b>-l2_template</b> \<String\></dt>
<dd>Elegir la plantilla especificada para el injerto del CDR L2<br/>Default: "l2.pdb"<br/></dd>
<dt><b>-graft_l3</b> \<Boolean\></dt>
<dd>Injertar el CDR L3 desde una plantilla<br/>Default: false<br/></dd>
<dt><b>-l3_template</b> \<String\></dt>
<dd>Elegir la plantilla especificada para el injerto del CDR L3<br/>Default: "l3.pdb"<br/></dd>
<dt><b>-graft_h1</b> \<Boolean\></dt>
<dd>Injertar el CDR H1 desde una plantilla<br/>Default: false<br/></dd>
<dt><b>-h1_template</b> \<String\></dt>
<dd>Elegir la plantilla especificada para el injerto del CDR H1<br/>Default: "h1.pdb"<br/></dd>
<dt><b>-graft_h2</b> \<Boolean\></dt>
<dd>Injertar el CDR H2 desde una plantilla<br/>Default: false<br/></dd>
<dt><b>-h2_template</b> \<String\></dt>
<dd>Elegir la plantilla especificada para el injerto del CDR H2<br/>Default: "h2.pdb"<br/></dd>
<dt><b>-graft_h3</b> \<Boolean\></dt>
<dd>Injertar el CDR H3 desde una plantilla<br/>Default: false<br/></dd>
<dt><b>-h3_template</b> \<String\></dt>
<dd>Elegir la plantilla especificada para el injerto del CDR H3<br/>Default: "h3.pdb"<br/></dd>
<dt><b>-light_heavy_template</b> \<String\></dt>
<dd>Elegir la plantilla especificada para la orientación VL-VH<br/>Default: ""<br/></dd>
<dt><b>-frl_template</b> \<String\></dt>
<dd>Elegir la plantilla especificada para el marco de la cadena ligera<br/>Default: ""<br/></dd>
<dt><b>-frh_template</b> \<String\></dt>
<dd>Elegir la plantilla especificada para el marco de la cadena pesada<br/>Default: ""<br/></dd>
<dt><b>-run_snugdock</b> \<Boolean\></dt>
<dd>¿Ejecutar Snugdock después de Antibody_H3/RAbD?<br/>Default: false<br/></dd>
<dt><b>-h3_no_stem_graft</b> \<Boolean\></dt>
<dd>Injertar el CDR H3 desde una plantilla, usar el tallo para superponer, pero no copiar el tallo<br/>Default: false<br/></dd>
<dt><b>-packonly_after_graft</b> \<Boolean\></dt>
<dd>Hacer solo empaquetado después del injerto, sin minimización<br/>Default: false<br/></dd>
<dt><b>-stem_optimize</b> \<Boolean\></dt>
<dd>activar o desactivar la opción de optimizar los tallos injertados<br/>Default: true<br/></dd>
<dt><b>-stem_optimize_size</b> \<Integer\></dt>
<dd> definir el tamaño del tallo que se optimiza <br/>Default: 4<br/></dd>
<dt><b>-preprocessing_script_version</b> \<String\></dt>
<dd>Rosetta 2 con el script de Perl tiene errores en el injerto<br/>Default: "R3_Python"<br/></dd>
<dt><b>-model_h3</b> \<Boolean\></dt>
<dd>Modelar el CDR H3 desde cero usando fragmentos<br/>Default: false<br/></dd>
<dt><b>-snugfit</b> \<Boolean\></dt>
<dd>Ajustar la orientación relativa de VL-VH<br/>Default: false<br/></dd>
<dt><b>-refine_h3</b> \<Boolean\></dt>
<dd>Refinar el CDR H3 en alta resolución<br/>Default: true<br/></dd>
<dt><b>-h3_filter</b> \<Boolean\></dt>
<dd>filtrar los decoys que no tengan forma kink ni extendida<br/>Default: true<br/></dd>
<dt><b>-h3_filter_tolerance</b> \<Real\></dt>
<dd>número máximo de intentos del filtro<br/>Default: 5<br/></dd>
<dt><b>-sc_min</b> \<Boolean\></dt>
<dd>minimizar la cadena lateral después de terminar el empaquetado de rotámeros<br/>Default: false<br/></dd>
<dt><b>-rt_min</b> \<Boolean\></dt>
<dd>minimizar el rotámero en cada empaquetado<br/>Default: false<br/></dd>
<dt><b>-extend_h3_before_modeling</b> \<Boolean\></dt>
<dd>extender el H3 para olvidar la configuración inicial del H3<br/>Default: true<br/></dd>
<dt><b>-centroid_refine</b> \<String\></dt>
<dd>Elegir un método de refinamiento para refinar un loop en modo centroide<br/>Default: "refine_kic"<br/></dd>
<dt><b>-h3_loop_csts_lr</b> \<Boolean\></dt>
<dd>Activar o desactivar los pesos de las restricciones de ángulo diedro y de par de átomos en la función de puntuación de baja resolución usada durante el modelado del loop H3<br/>Default: true<br/></dd>
<dt><b>-h3_loop_csts_hr</b> \<Boolean\></dt>
<dd>Activar o desactivar los pesos de las restricciones de ángulo diedro y de par de átomos en la función de puntuación de alta resolución usada durante el modelado del loop H3<br/>Default: true<br/></dd>
<dt><b>-auto_generate_h3_kink_constraint</b> \<Boolean\></dt>
<dd>Generar la restricción de kink sobre la marcha para las etapas de modelado de H3 de baja o de alta resolución, según las opciones h3_loop_csts.<br/>Default: true<br/></dd>
<dt><b>-constrain_vlvh_qq</b> \<Boolean\></dt>
<dd>Activar o desactivar una restricción que fuerza el enlace de hidrógeno QQ VL-VH en la función de puntuación de docking<br/>Default: true<br/></dd>
<dt><b>-snug_loops</b> \<Boolean\></dt>
<dd>Permitir la flexibilidad de la cadena principal del loop de los CDR durante la minimización<br/>Default: false<br/></dd>
<dt><b>-input_fv</b> \<File\></dt>
<dd>región variable (Fv) del anticuerpo de entrada<br/>Default: "FR02.pdb"<br/></dd>
<dt><b>-camelid</b> \<Boolean\></dt>
<dd>Entrada de camélido con solo la cadena pesada (VH)<br/>Default: false<br/></dd>
<dt><b>-camelid_constraints</b> \<Boolean\></dt>
<dd>Mostrar el archivo de restricciones para usar con el modelador de H3 de camélidos<br/>Default: false<br/></dd>
<dt><b>-use_mean_cluster_cst_data</b> \<Boolean\></dt>
<dd>Usar restricciones diedras basadas en clústeres de CDR cuyas medias son las medias reales de los clústeres. Si pones esto en false, se usarán restricciones cuyas medias son los datos del centro del clúster.<br/>Default: true<br/></dd>
<dt><b>-force_use_of_cluster_csts_with_outliers</b> \<Boolean\></dt>
<dd>Forzar que el uso de restricciones diedras de clúster use las que incluyen valores atípicos.<br/>Default: false<br/></dd>
<dt><b>-cluster_csts_stats_cutoff</b> \<Integer\></dt>
<dd>Valor para el cambio de restricciones diedras basadas en clústeres a restricciones diedras generales. Si el número total de estructuras usadas para las restricciones basadas en clústeres es menor que este valor, se usarán restricciones diedras generales. Más datos = mejor predictibilidad.<br/>Default: 10<br/></dd>
<dt><b>-general_dihedral_cst_phi_sd</b> \<Real\></dt>
<dd>Desviación estándar de phi al usar restricciones armónicas circulares diedras generales<br/>Default: 16.0<br/></dd>
<dt><b>-general_dihedral_cst_psi_sd</b> \<Real\></dt>
<dd>Desviación estándar de psi al usar restricciones armónicas circulares diedras generales<br/>Default: 16.0<br/></dd>
<dt><b>-allow_omega_mismatches_for_north_clusters</b> \<Boolean\></dt>
<dd>Omitir el primer agrupamiento de Cis y Trans para los clústeres en los que actualmente no existe una designación Cis/Trans.<br/>Default: false<br/></dd>
<dt><b>-prefix</b> \<String\></dt>
<dd>Prefijo de nombre base/directorio para la salida del injerto de anticuerpos, separado por /. Por defecto es grafting/.<br/>Default: "grafting/"<br/></dd>
<dt><b>-grafting_database</b> \<String\></dt>
<dd>Ruta a la base de datos de injerto de anticuerpos del repositorio de herramientas de Rosetta. Por defecto esta opción está vacía y grafting_database se busca en ../../tools/antibody y luego en $ROSETTA/tools/antibody<br/>Default: ""<br/></dd>
<dt><b>-blastp</b> \<String\></dt>
<dd>Ruta al ejecutable de NCBI-Blast+<br/>Default: "blastp"<br/></dd>
<dt><b>-exclude_pdbs</b> \<StringVector\></dt>
<dd>no usar el o los pdb dados como fuentes para el injerto (sin valor por defecto), p. ej. 1ABC 2CDE<br/></dd>
<dt><b>-exclude_homologs</b> \<Boolean\></dt>
<dd>¿Filtrar las coincidencias de BLAST por identidad de secuencia? (false por defecto)<br/>Default: false<br/></dd>
<dt><b>-exclude_homologs_cdr_cutoff</b> \<Real\></dt>
<dd>Corte de identidad de secuencia para las regiones determinantes de complementariedad (el valor por defecto es 80 por ciento).<br/>Default: 80.0<br/></dd>
<dt><b>-exclude_homologs_fr_cutoff</b> \<Real\></dt>
<dd>Corte de identidad de secuencia para las regiones marco (el valor por defecto es 80 por ciento).<br/>Default: 80.0<br/></dd>
<dt><b>-ocd_cutoff</b> \<Real\></dt>
<dd>Corte de distancia de coordenadas de orientación para las plantillas. Introduce diversidad al usar injerto con varias plantillas (el valor por defecto es 0.5).<br/>Default: 0.5<br/></dd>
<dt><b>-bfactor_cutoff</b> \<Real\></dt>
<dd>Excluir las regiones de plantilla con un factor B promedio por encima del corte (el valor por defecto es 80).<br/>Default: 80.0<br/></dd>
<dt><b>-n_multi_templates</b> \<Integer\></dt>
<dd>Número de plantillas múltiples que se usan durante el injerto. El valor por defecto es 10.<br/>Default: 10<br/></dd>
<dt><b>-json_cdr</b> \<String\></dt>
<dd>definir los puntos de inicio y fin de los CDR con un json de entrada<br/></dd>
</dl>
+ <h3>-antibody:design</h3>
<dl>
<dt><b>-design</b> \<Boolean\></dt>
<dd>grupo de opciones design<br/></dd>
<dt><b>-view</b> \<Boolean\></dt>
<dd>Permitir ver la ejecución del diseño de anticuerpos. Debe haberse compilado con extras=graphics y ejecutarse con el ejecutable antibody_designer.graphics<br/>Default: false<br/></dd>
<dt><b>-base_cdr_instructions</b> \<String\></dt>
<dd>El archivo de instrucciones por defecto/de referencia. No debería hacer falta cambiarlo.<br/>Default: "/sampling/antibodies/design/default_instructions.txt"<br/></dd>
<dt><b>-cdr_instructions</b> \<String\></dt>
<dd>Ruta al archivo de instrucciones de CDR<br/></dd>
<dt><b>-antibody_database</b> \<String\></dt>
<dd>Ruta a la base de datos de anticuerpos actual, actualizada semanalmente. Descárgala de http://dunbrack2.fccc.edu/PyIgClassify/ <br/>Default: "/sampling/antibodies/antibody_database_rosetta_design.db"<br/></dd>
<dt><b>-paper_ab_db</b> \<Boolean\></dt>
<dd>Forzar el uso de la base de datos de anticuerpos con datos del artículo de agrupamiento de North. Está incluida en Rosetta. Si no se encuentra una base de datos de anticuerpos más reciente, se usará esta. La base de datos completa está disponible en http://dunbrack2.fccc.edu/PyIgClassify/<br/>Default: false<br/></dd>
<dt><b>-paper_ab_db_path</b> \<String\></dt>
<dd>Ruta a la ab_db del artículo de North. Solo se usa si se pasa la opción -paper_ab_db<br/>Default: "/sampling/antibodies/antibody_database_rosetta_design_north_paper.db"<br/></dd>
<dt><b>-seq_design_cdrs</b> \<StringVector\></dt>
<dd>Activar estos CDR para el diseño de secuencia. (Se puede fijar aquí o en el archivo de instrucciones. Si se indica, anula lo fijado en el archivo de instrucciones)<br/></dd>
<dt><b>-graft_design_cdrs</b> \<StringVector\></dt>
<dd>Activar estos CDR para el diseño por injerto. (Se puede fijar aquí o en el archivo de instrucciones. Si se indica, anula lo fijado en el archivo de instrucciones)<br/></dd>
<dt><b>-primary_cdrs</b> \<StringVector\></dt>
<dd>Fijar manualmente los CDR que se pueden elegir en el ciclo externo. Normalmente se elige cualquiera que esté en diseño de secuencia o de injerto.<br/></dd>
<dt><b>-mintype</b> \<String\></dt>
<dd>El tipo de minimización (mintype) por defecto para todos los CDR. Los CDR individuales se pueden fijar mediante el archivo de instrucciones<br/>Default: "min"<br/></dd>
<dt><b>-disallow_aa</b> \<StringVector\></dt>
<dd>No permitir ciertos aminoácidos durante el diseño de secuencia (aunque podrían seguir apareciendo en la secuencia diseñada por injerto). Útil para optimizar sin, por ejemplo, cisteínas y prolinas. Se aplica a todos los perfiles de diseño de secuencia y a los residuos de cualquier región (CDR, marco, antígeno). Puedes controlarlo por CDR (o solo para los CDR) mediante el archivo de instrucciones de CDR. También se acepta un resfile si quieres limitar posiciones específicas directamente.<br/></dd>
<dt><b>-top_designs</b> \<Integer\></dt>
<dd>Número de mejores diseños que se conservan (conjunto). Se escribirán en un PDB y cada uno pasará al siguiente paso del protocolo.<br/>Default: 1<br/></dd>
<dt><b>-high_mem_mode</b> \<Boolean\></dt>
<dd>Si es false, el CDRSet (los CDR cargados de la base de datos que podrían injertarse) se carga sobre la marcha para un CDR si tiene más de 50 miembros de diseño por injerto. Si es true, el CDRSet se guarda en caché antes de iniciar el protocolo. Normalmente esto solo importa al diseñar todos los CDR. Para el diseño de novo de 5/6 CDR, sin limitar el CDRSet en el archivo de instrucciones, necesitarás 3-4 GB por proceso con esta opción.<br/>Default: false<br/></dd>
<dt><b>-cdr_set_cache_limit</b> \<Integer\></dt>
<dd>Si high_mem_mode es false, este es el límite de CDRSet que se guarda en caché antes de empezar a cargarlos sobre la marcha. Si high_mem_mode es true, se ignora este ajuste. Si tienes muy poca memoria por proceso, baja este número<br/>Default: 300<br/></dd>
<dt><b>-design_protocol</b> \<String\></dt>
<dd>Fija el protocolo principal que se usará. Ten en cuenta que deterministic solo está disponible por ahora para el injerto de un CDR.<br/>Default: "even_cluster_mc"<br/></dd>
<dt><b>-run_relax</b> \<Boolean\></dt>
<dd>Ejecutar Dualspace Relax en cada conjunto después de diseñar (después de snugdock, si se ejecuta). También escribe las estructuras sin relax<br/>Default: false<br/></dd>
<dt><b>-run_interface_analyzer</b> \<Boolean\></dt>
<dd>Ejecutar el Interface Analyzer y añadir la información a la función de puntuación resultante de cada mejor diseño de salida.<br/>Default: true<br/></dd>
<dt><b>-paratope</b> \<StringVector\></dt>
<dd>Usar estos CDR como paratopo. Por defecto son todos. Por ahora solo se usa para restricciones. Ten en cuenta que estas restricciones de sitio solo se usan durante el docking, salvo que se fije -enable_full_protocol_atom_pair_cst.<br/></dd>
<dt><b>-epitope</b> \<StringVector\></dt>
<dd>Usar estos residuos como epítopo del antígeno. Por defecto se identifican automáticamente dentro de la distancia de interfaz fijada al inicio del protocolo si las restricciones de epítopo están activadas. Por ahora solo se usa para restricciones. Numeración PDB. Código de inserción opcional. Ejemplo: 1A 1B 1B:A. Ten en cuenta que estas restricciones de sitio solo se usan durante el docking, salvo que se fije -enable_full_protocol_atom_pair_cst.<br/>Default: []<br/></dd>
<dt><b>-use_epitope_constraints</b> \<Boolean\></dt>
<dd>Activar el uso de restricciones de epítopo para añadir SiteConstraints entre el epítopo y el paratopo. Ten en cuenta que las restricciones del paratopo siempre se usan. Ten en cuenta que estas restricciones de sitio solo se usan durante el docking, salvo que se fije -global_atom_pair_cst_scoring.<br/>Default: false<br/></dd>
<dt><b>-dihedral_cst_weight</b> \<Real\></dt>
<dd>Peso que se usa para las restricciones generales o basadas en clústeres CircularHarmonic de los CDR, que se añaden automáticamente a cada estructura y se actualizan después de cada injerto. Ponlo en cero si no quieres usar estas restricciones. Ten en cuenta que no se usan con el mintype backrub. Anula los ajustes de pesos y parches.<br/>Default: .3<br/></dd>
<dt><b>-atom_pair_cst_weight</b> \<Real\></dt>
<dd>Peso que se usa para las SiteConstraints de epítopo/paratopo. Las restricciones del lado del paratopo siempre se usan. Ponlo en cero para anular por completo estas restricciones. Anula los ajustes de pesos y parches.<br/>Default: 0.01<br/></dd>
<dt><b>-global_dihedral_cst_scoring</b> \<Boolean\></dt>
<dd>Usar la puntuación de restricciones diedras durante todo el protocolo, incluida la puntuación final de los Poses, en lugar de solo durante el paso de minimización<br/>Default: false<br/></dd>
<dt><b>-global_atom_pair_cst_scoring</b> \<Boolean\></dt>
<dd>Usar la puntuación de restricciones de pares de átomos durante todo el protocolo, incluida la puntuación final de los Poses, en lugar de solo durante el docking. Normalmente, el término de puntuación se pone en cero para las funciones de puntuación que no son de docking, para reducir el sesgo por longitudes de loops, relax, etc. Puede ayudar a apuntar más rápido a un epítopo concreto durante el diseño Monte Carlo si se usan restricciones de epítopo, así como a filtrar los modelos finales por puntuación hacia un epítopo concreto si se hace docking.<br/>Default: true<br/></dd>
<dt><b>-do_dock</b> \<Boolean\></dt>
<dd>Ejecutar un breve paso de docking de baja y alta resolución en los ciclos internos. (dock/min). Se recomiendan 2 ciclos internos para una mejor cobertura. (dock/min/dock/min). Los bucles interno/externo de alta resolución están fijados en el código, mientras que la baja resolución se puede cambiar con las opciones normales de low_res. Si el diseño de secuencia está activado, diseñará las regiones/CDR fijados durante el docking de alta resolución. Se recomienda <br/>Default: false<br/></dd>
<dt><b>-dock_first_cycles</b> \<Integer\></dt>
<dd>Número de primeros ciclos del docking de alta resolución. El valor por defecto del protocolo Full Docking es 4.<br/>Default: 2<br/></dd>
<dt><b>-dock_second_cycles</b> \<Integer\></dt>
<dd>Número de segundos ciclos del docking de alta resolución. El valor por defecto del protocolo Full Docking es 45.<br/>Default: 2<br/></dd>
<dt><b>-outer_cycle_rounds</b> \<Integer\></dt>
<dd>Rondas del bucle externo del protocolo (no para deterministic_graft). Cada ronda elige un CDR y lo diseña. Una ejecución de 100 ciclos con relax tarda unas 12 horas. 				  Si disminuyes este número, reducirás mucho el tiempo de ejecución, pero tus decoys finales tendrán mayor energía. Asegúrate de aumentar el número total de estructuras de salida (nstruct) si usas un número menor que este. Normalmente unos 500 - 1000 nstruct es más que suficiente. El diseño De Novo completo requerirá bastantes más rondas 				  y nstruct. Si haces docking, las ejecuciones tardan un 30 por ciento más.<br/>Default: 25<br/></dd>
<dt><b>-inner_cycle_rounds</b> \<Integer\></dt>
<dd>Número de veces que se ejecuta el protocolo de minimización interna después de cada injerto. Se recomiendan más rondas (2-3) para los mintypes pack/min/backrub o si se incluye dock en el protocolo.<br/>Default: 1<br/></dd>
<dt><b>-dock_cycle_rounds</b> \<Integer\></dt>
<dd>Número de rondas para cualquier docking. Si ves estructuras mal acopladas, aumenta este valor.<br/>Default: 1<br/></dd>
<dt><b>-relax_cycle_rounds</b> \<Integer\></dt>
<dd>Rondas de relax que se ejecutan después de cada ciclo interno. La recomendación por defecto son 5 ciclos para FastRelax. 				Si disminuyes este número, reducirás mucho el tiempo de ejecución. Sin embargo, esto no se ha evaluado en un benchmark.<br/>Default: 5<br/></dd>
<dt><b>-interface_dis</b> \<Real\></dt>
<dd>Corte de distancia de interfaz. Se usa para el reempaquetado de la interfaz, la detección del epítopo, etc.<br/>Default: 8.0<br/></dd>
<dt><b>-neighbor_dis</b> \<Real\></dt>
<dd>Corte de distancia de vecinos. Se usa para el reempaquetado después del injerto, la minimización, etc.<br/>Default: 6.0<br/></dd>
<dt><b>-use_outliers</b> \<Boolean\></dt>
<dd>Incluir datos atípicos para GraftDesign, las estadísticas de diseño de secuencia basadas en perfiles y las restricciones diedras basadas en clústeres. Los atípicos se definen como los que tienen una distancia diedra > 40 grados y un RMSD > 1.5 Å respecto al centro del clúster. Úsalo para aumentar el muestreo de clústeres pequeños o raros.<br/>Default: false<br/></dd>
<dt><b>-use_H3_graft_outliers</b> \<Boolean\></dt>
<dd>Incluir atípicos al injertar H3. H3 no se agrupa bien, por lo que la mayoría de las estructuras tienen una distancia diedra y un RMSD altos respecto al centro del clúster. Por eso no se usan restricciones diedras basadas en clústeres para H3. Se pueden usar perfiles de secuencia para los clústeres, pero normalmente no.<br/>Default: true<br/></dd>
<dt><b>-use_only_H3_kinked</b> \<Boolean\></dt>
<dd>Eliminar del CDRSet cualquier CDR sin kink si se injerta H3. Por ahora, la coincidencia se basa en el área de Ramachandran de los dos últimos residuos del H3. En este caso, con kink se define como tener regiones AB o DB al final. Se mejorará la detección.<br/>Default: false<br/></dd>
<dt><b>-design_antigen</b> \<Boolean\></dt>
<dd>Diseñar los residuos del antígeno durante el diseño de secuencia, de forma inteligente. Normalmente solo se co-diseñan los residuos vecinos del antígeno de los CDR o interfaces en diseño. Útil para aplicaciones específicas.<br/>Default: false<br/></dd>
<dt><b>-design_framework</b> \<Boolean\></dt>
<dd>Diseñar los residuos del marco durante el diseño de secuencia. Normalmente se hace solo con los residuos vecinos de los CDR en diseño o durante la minimización de la interfaz.<br/>Default: false<br/></dd>
<dt><b>-conservative_framework_design</b> \<Boolean\></dt>
<dd>Si se diseñan posiciones del marco, usar mutaciones conservadoras en lugar de todas.<br/>Default: true<br/></dd>
<dt><b>-design_H3_stem</b> \<Boolean\></dt>
<dd>Activar el diseño de los 2 primeros y los 3 últimos residuos del loop H3 si se diseña la secuencia de H3. Estos residuos influyen en la conformación extendida o con kink de H3. Diseñarlos puede afectar negativamente a la estructura global de H3, pues potencialmente podría cambiar un loop con kink a extendido y viceversa. Rosetta podría acertar, pero está desactivado por defecto para pecar de cauteloso en el diseño. Diseñar la secuencia de H3 ya puede ser arriesgado.<br/>Default: false<br/></dd>
<dt><b>-design_proline</b> \<Boolean\></dt>
<dd>Activar el diseño de prolina. Los perfiles de prolina son muy buenos, pero diseñarlas es algo arriesgado. Actívalo si te sientes audaz.<br/>Default: false<br/></dd>
<dt><b>-sample_zero_probs_at</b> \<Real\></dt>
<dd>Valor para el diseño probabilístico. Probabilidad de que un residuo con probabilidad normalmente cero se elija como residuo potencial cada vez que se llama al PackerTask. Aumenta el valor para aumentar la variabilidad de las posiciones. <br/>Default: 0<br/></dd>
<dt><b>-force_mutate_framework_for_cluster</b> \<Boolean\></dt>
<dd>Forzar mutaciones del marco que mantengan ciertos clústeres. Actualmente L1-11-1 frente a L1-11-2. Consulta el artículo de clústeres de North para estas dependencias, o revisa rosetta/database/sampling/antibodies/design/cluster_framework_mutations.txt<br/>Default: true<br/></dd>
<dt><b>-no_profile_probabilities</b> \<Boolean\></dt>
<dd>Activar para muestrear todos los aminoácidos disponibles por posición en lugar de muestrear según los pesos. Se usa para aumentar la diversidad y con fines de prueba.<br/>Default: false<br/></dd>
<dt><b>-seq_design_stats_cutoff</b> \<Integer\></dt>
<dd>Valor para el cambio de diseño probabilístico a diseño conservador de secuencia. Si el número total de secuencias usadas para el diseño probabilístico de un clúster de CDR concreto que se está diseñando es menor que este valor, se hará diseño conservador. Más datos = mejor predictibilidad.<br/>Default: 10<br/></dd>
<dt><b>-seq_design_profile_samples</b> \<Integer\></dt>
<dd>Si se diseña con perfiles, este es el número de veces que se muestrea el perfil cada vez que se hace el empaquetado. Aumenta este número para aumentar la variabilidad de los diseños, especialmente si no se usa relax como mintype.<br/>Default: 1<br/></dd>
<dt><b>-idealize_graft_cdrs</b> \<Boolean\></dt>
<dd>Idealizar el CDR antes de injertarlo. Puede ayudar o perjudicar. <br/>Default: false<br/></dd>
<dt><b>-add_backrub_pivots</b> \<StringVector\></dt>
<dd>Residuos pivote adicionales de backrub si se ejecuta backrub como MinType. Numeración PDB. Código de inserción opcional. Ejemplo: 1A 1B 1B:A. También se pueden especificar rangos: 1A-10:A. Ten en cuenta que no hay espacios en el rango.<br/></dd>
<dt><b>-inner_kt</b> \<Real\></dt>
<dd>KT usado en el Monte Carlo de minimización interna después de cada injerto.<br/>Default: 1.0<br/></dd>
<dt><b>-outer_kt</b> \<Real\></dt>
<dd>KT usado para el Monte Carlo externo de injerto. Cada paso de injerto usará este valor<br/>Default: 1.0<br/></dd>
<dt><b>-random_start</b> \<Boolean\></dt>
<dd>Empezar el diseño por injerto (actualmente) con un conjunto nuevo de CDR de los CDRSets para no sesgar la ejecución con los CDR nativos.<br/>Default: false<br/></dd>
<dt><b>-adapt_graft</b> \<Boolean\></dt>
<dd>Adaptar el algoritmo de injerto para aumentar la tasa de injertos cerrados. Toma más tiempo. Los injertos que no se pueden cerrar quizá no sean muy compatibles con el marco en primer lugar.<br/>Default: true<br/></dd>
<dt><b>-enable_adapt_graft_cartesian</b> \<Boolean\></dt>
<dd>La minimización cartesiana parece causar numerosos errores desde la reescritura de punteros AST de Lukis. Solo ocurren en el clúster y es muy difícil reproducirlos. Hasta que se corrija, podemos omitir la adaptación cartesiana en la que se ejecutaría la minimización cartesiana cuando el injerto no se pudo cerrar bien. Las excepciones están envueltas para que, cuando falle, se omita el injerto. Ponlo en false para desactivar su uso<br/>Default: false<br/></dd>
<dt><b>-remove_antigen</b> \<Boolean\></dt>
<dd>Quitar el antígeno del Pose antes de hacer cualquier diseño sobre él<br/>Default: false<br/></dd>
<dt><b>-add_graft_log_to_pdb</b> \<Boolean\></dt>
<dd>Añadir el registro completo del injerto al Pose de salida. También hay que pasar la opción -pdb_comments.<br/>Default: true<br/></dd>
<dt><b>-mutate_framework_for_cluster</b> \<Boolean\></dt>
<dd>Mutar el marco para mantener ciertos clústeres después del injerto.<br/>Default: false<br/></dd>
</dl>
+ <h2>-task_operations</h2>
<dl>
<dt><b>-task_operations</b> \<Boolean\></dt>
<dd>grupo de opciones task_operations<br/></dd>
<dt><b>-cons_design_data_source</b> \<String\></dt>
<dd>Fuente de datos usada para ConservativeDesignOperation. Guía el conjunto de mutaciones permitidas. Un blosum más alto significa mayor conservación (los números indican cortes de similitud de secuencia).<br/>Default: "blosum62"<br/></dd>
</dl>
+ <h2>-assembly</h2>
<dl>
<dt><b>-assembly</b> \<Boolean\></dt>
<dd>grupo de opciones assembly<br/></dd>
<dt><b>-pdb1</b> \<File\></dt>
<dd>archivo pdb1<br/></dd>
<dt><b>-pdb2</b> \<File\></dt>
<dd>archivo pdb2<br/></dd>
</dl>
+ <h2>-backrub</h2>
<dl>
<dt><b>-backrub</b> \<Boolean\></dt>
<dd>grupo de opciones backrub<br/></dd>
<dt><b>-pivot_residues</b> \<IntegerVector\></dt>
<dd>residuos para los que los tramos contiguos pueden contener segmentos (números de residuo internos; por defecto todos los residuos)<br/>Default: utility::vector1<int>()<br/></dd>
<dt><b>-pivot_atoms</b> \<StringVector\></dt>
<dd>átomos de la cadena principal que se pueden usar como pivotes<br/>Default: utility::vector1<std::string>(1, "CA")<br/></dd>
<dt><b>-min_atoms</b> \<Integer\></dt>
<dd>tamaño mínimo del segmento de backrub (átomos)<br/>Default: 3<br/></dd>
<dt><b>-max_atoms</b> \<Integer\></dt>
<dd>tamaño máximo del segmento de backrub (átomos)<br/>Default: 34<br/></dd>
<dt><b>-ntrials</b> \<Integer\></dt>
<dd>número de intentos de Monte Carlo que se ejecutan<br/>Default: 1000<br/></dd>
<dt><b>-sc_prob</b> \<Real\></dt>
<dd>probabilidad de hacer un movimiento de cadena lateral<br/>Default: 0.25<br/></dd>
<dt><b>-sm_prob</b> \<Real\></dt>
<dd>probabilidad de hacer un movimiento pequeño<br/>Default: 0<br/></dd>
<dt><b>-sc_prob_uniform</b> \<Real\></dt>
<dd>probabilidad de muestrear uniformemente los ángulos chi<br/>Default: 0.1<br/></dd>
<dt><b>-sc_prob_withinrot</b> \<Real\></dt>
<dd>probabilidad de muestrear dentro del rotámero actual<br/>Default: 0.0<br/></dd>
<dt><b>-mc_kt</b> \<Real\></dt>
<dd>valor de kT para Monte Carlo<br/>Default: 0.6<br/></dd>
<dt><b>-mm_bend_weight</b> \<Real\></dt>
<dd>peso del término de energía de ángulos de enlace mm_bend<br/>Default: 1.0<br/></dd>
<dt><b>-initial_pack</b> \<Boolean\></dt>
<dd>forzar un reempaquetado al inicio, sin importar si hay mutaciones fijadas en el resfile<br/>Default: false<br/></dd>
<dt><b>-minimize_movemap</b> \<File\></dt>
<dd>especificar los grados de libertad para la minimización<br/></dd>
<dt><b>-trajectory</b> \<Boolean\></dt>
<dd>registrar una trayectoria<br/>Default: false<br/></dd>
<dt><b>-trajectory_gz</b> \<Boolean\></dt>
<dd>comprimir la trayectoria con gzip<br/>Default: false<br/></dd>
<dt><b>-trajectory_stride</b> \<Integer\></dt>
<dd>escribir un fotograma de la trayectoria cada N pasos<br/>Default: 100<br/></dd>
</dl>
+ <h2>-batch_relax</h2>
<dl>
<dt><b>-batch_relax</b> \<Boolean\></dt>
<dd>grupo de opciones batch_relax<br/></dd>
<dt><b>-batch_size</b> \<Integer\></dt>
<dd>Tamaño de los lotes; ten en cuenta que esto afecta mucho al uso de memoria<br/>Default: 100<br/></dd>
</dl>
+ <h2>-bbg</h2>
<dl>
<dt><b>-bbg</b> \<Boolean\></dt>
<dd>grupo de opciones bbg<br/></dd>
<dt><b>-factorA</b> \<Real\></dt>
<dd>Controla qué tan grande sería el movimiento (tasa de aceptación); por defecto 1.0<br/>Default: 1.0<br/></dd>
<dt><b>-factorB</b> \<Real\></dt>
<dd>Controla qué tan local sería el movimiento (plegado 10.0, desplegado 0.1); por defecto 10.0<br/>Default: 10.0<br/></dd>
<dt><b>-ignore_improper_res</b> \<Boolean\></dt>
<dd>Omitir los residuos impropios (prolina)<br/>Default: false<br/></dd>
<dt><b>-fix_short_segment</b> \<Boolean\></dt>
<dd>No aplicar el small mover a segmentos cortos, para loops<br/>Default: false<br/></dd>
</dl>
+ <h2>-boinc</h2>
<dl>
<dt><b>-boinc</b> \<Boolean\></dt>
<dd>grupo de opciones boinc<br/></dd>
<dt><b>-graphics</b> \<Boolean\></dt>
<dd>El cliente de BOINC usa esta opción para los gráficos en ventana<br/>Default: false<br/></dd>
<dt><b>-fullscreen</b> \<Boolean\></dt>
<dd>El cliente de BOINC usa esta opción para los gráficos del protector de pantalla a pantalla completa<br/>Default: false<br/></dd>
<dt><b>-max_fps</b> \<Integer\></dt>
<dd>Máximo de fotogramas por segundo; anula la preferencia del usuario.<br/>Default: 0<br/></dd>
<dt><b>-max_cpu</b> \<Integer\></dt>
<dd>Porcentaje máximo de CPU; anula la preferencia del usuario.<br/>Default: 0<br/></dd>
<dt><b>-noshmem</b> \<Boolean\></dt>
<dd>para probar gráficos sin memoria compartida.<br/>Default: false<br/></dd>
<dt><b>-cpu_run_time</b> \<Integer\></dt>
<dd>Tiempo de ejecución objetivo de CPU en segundos<br/>Default: 10800<br/></dd>
<dt><b>-max_nstruct</b> \<Integer\></dt>
<dd>Número máximo de modelos de salida (fallidos o exitosos) para un cliente dado<br/>Default: 99<br/></dd>
<dt><b>-cpu_frac</b> \<Real\></dt>
<dd>Porcentaje de tiempo de CPU usado para gráficos<br/>Default: 10.0<br/></dd>
<dt><b>-frame_rate</b> \<Real\></dt>
<dd>Número de fotogramas por segundo para los gráficos<br/>Default: 10.0<br/></dd>
<dt><b>-watchdog</b> \<Boolean\></dt>
<dd>Activar el watchdog<br/>Default: false<br/></dd>
<dt><b>-watchdog_time</b> \<Integer\></dt>
<dd>Intervalo de tiempo en segundos que usa el watchdog para comprobar si la ejecución está atascada o dura demasiado (por defecto, cada 5 minutos)<br/>Default: 300<br/></dd>
<dt><b>-cpu_run_timeout</b> \<Integer\></dt>
<dd>Tiempo máximo en que la unidad de trabajo (WU) puede exceder los ajustes de tiempo de WU del usuario. Por defecto son 4 horas. Lo usa el watchdog.<br/>Default: 14400<br/></dd>
<dt><b>-description_file</b> \<File\></dt>
<dd>archivo de descripción de la unidad de trabajo<br/>Default: "rosetta_description.txt"<br/></dd>
<dt><b>-score_cut_pct</b> \<Real\></dt>
<dd>corte de puntuación hecho en los nodos locales por porcentaje, necesario para devolver modelos centroide<br/></dd>
<dt><b>-score_cut_fl</b> \<File\></dt>
<dd>archivo temporal donde se guarda la salida<br/>Default: "score_cut_tmp.out"<br/></dd>
<dt><b>-score_cut_smart_throttle</b> \<Boolean\></dt>
<dd>garantiza que se genere < 1 modelo cada 60 segundos (se fija en 65 s por seguridad)<br/></dd>
</dl>
+ <h2>-broker</h2>
<dl>
<dt><b>-broker</b> \<Boolean\></dt>
<dd>grupo de opciones broker<br/></dd>
<dt><b>-setup</b> \<FileVector\></dt>
<dd>archivo de configuración para topology-broker<br/>Default: "NO_SETUP_FILE"<br/></dd>
<dt><b>-rb_mover_stage1_weight</b> \<Real\></dt>
<dd>peso del mover RB en la etapa 1 de abinitio<br/>Default: 5.0<br/></dd>
<dt><b>-large_frag_mover_stage1_weight</b> \<Real\></dt>
<dd>peso del mover de fragmentos en la etapa 1 de abinitio<br/>Default: 1.0<br/></dd>
<dt><b>-small_frag_mover_stage1_weight</b> \<Real\></dt>
<dd>peso del mover de fragmentos en la etapa 1 de abinitio<br/>Default: 1.0<br/></dd>
</dl>
+ <h2>-bunsat_calc2</h2>
<dl>
<dt><b>-bunsat_calc2</b> \<Boolean\></dt>
<dd>grupo de opciones bunsat_calc2<br/></dd>
<dt><b>-sasa_burial_cutoff</b> \<Real\></dt>
<dd>SASA mínima para considerarse expuesto<br/>Default: 0.01<br/></dd>
<dt><b>-layered_sasa</b> \<Boolean\></dt>
<dd>Usar el calculador de SASA de solvente de distancia variable para encontrar átomos enterrados no satisfechos<br/>Default: true<br/></dd>
<dt><b>-generous_hbonds</b> \<Boolean\></dt>
<dd>Usar criterios generosos de enlaces de hidrógeno<br/>Default: true<br/></dd>
<dt><b>-AHD_cutoff</b> \<Real\></dt>
<dd>Ángulo AHD mínimo para la detección de enlaces de hidrógeno basada en geometría secundaria<br/>Default: 120<br/></dd>
<dt><b>-dist_cutoff</b> \<Real\></dt>
<dd>distancia máxima<br/>Default: 3.0<br/></dd>
<dt><b>-hxl_dist_cutoff</b> \<Real\></dt>
<dd>distancia máxima de hxl<br/>Default: 3.5<br/></dd>
<dt><b>-sulph_dist_cutoff</b> \<Real\></dt>
<dd>distancia máxima de azufre<br/>Default: 3.3<br/></dd>
<dt><b>-metal_dist_cutoff</b> \<Real\></dt>
<dd>distancia máxima de metal<br/>Default: 2.7<br/></dd>
</dl>
+ <h2>-canonical_sampling</h2>
<dl>
<dt><b>-canonical_sampling</b> \<Boolean\></dt>
<dd>grupo de opciones canonical_sampling<br/></dd>
</dl>
+ <h3>-canonical_sampling:probabilities</h3>
<dl>
<dt><b>-probabilities</b> \<Boolean\></dt>
<dd>grupo de opciones probabilities<br/></dd>
<dt><b>-sc</b> \<Real\></dt>
<dd>probabilidad de hacer un movimiento de cadena lateral<br/>Default: 0.25<br/></dd>
<dt><b>-localbb</b> \<Real\></dt>
<dd>probabilidad de hacer un movimiento pequeño<br/>Default: 0.75<br/></dd>
<dt><b>-sc_prob_uniform</b> \<Real\></dt>
<dd>probabilidad de muestrear uniformemente los ángulos chi<br/>Default: 0.1<br/></dd>
<dt><b>-sc_prob_withinrot</b> \<Real\></dt>
<dd>probabilidad de muestrear dentro del rotámero actual<br/>Default: 0.9<br/></dd>
<dt><b>-sc_prob_perturbcurrent</b> \<Real\></dt>
<dd>probabilidad de perturbar el rotámero actual<br/>Default: 0.0<br/></dd>
<dt><b>-MPI_sync_pools</b> \<Boolean\></dt>
<dd>usar MPI para sincronizar los conjuntos y comunicar entre nodos<br/>Default: false<br/></dd>
<dt><b>-MPI_bcast</b> \<Boolean\></dt>
<dd>usar difusión (broadcasting) en la sincronización<br/>Default: false<br/></dd>
<dt><b>-fast_sc_moves</b> \<Boolean\></dt>
<dd>usar el SidechainMCMover rápido<br/>Default: false<br/></dd>
<dt><b>-fast_sc_moves_ntrials</b> \<Real\></dt>
<dd>especificar el número de ntrials en cada llamada a apply de scmover<br/>Default: 1000<br/></dd>
<dt><b>-no_jd2_output</b> \<Boolean\></dt>
<dd>no escribir en el silent file especificado por -out:file:silent<br/>Default: false<br/></dd>
<dt><b>-use_hierarchical_clustering</b> \<Boolean\></dt>
<dd>usar la clase HierarchicalLevel<br/>Default: false<br/></dd>
<dt><b>-backrub</b> \<Real\></dt>
<dd>fijar la probabilidad de ejecutar un movimiento backrub al hacer un movimiento de la cadena principal<br/>Default: 0.5<br/></dd>
<dt><b>-conrot</b> \<Real\></dt>
<dd>fijar la probabilidad relativa de ejecutar un movimiento conrot al hacer un movimiento de la cadena principal<br/>Default: 0.0<br/></dd>
</dl>
+ <h3>-canonical_sampling:sampling</h3>
<dl>
<dt><b>-sampling</b> \<Boolean\></dt>
<dd>grupo de opciones sampling<br/></dd>
<dt><b>-no_detailed_balance</b> \<Boolean\></dt>
<dd>preservar el balance detallado<br/>Default: false<br/></dd>
<dt><b>-ntrials</b> \<Integer\></dt>
<dd>número de intentos de Monte Carlo que se ejecutan<br/>Default: 1000<br/></dd>
<dt><b>-mc_kt</b> \<Real\></dt>
<dd>valor de kT para Monte Carlo<br/>Default: 0.6<br/></dd>
<dt><b>-interval_pose_dump</b> \<Integer\></dt>
<dd>volcar un Pose cada x pasos<br/>Default: 1000<br/></dd>
<dt><b>-interval_data_dump</b> \<Integer\></dt>
<dd>volcar datos cada x pasos<br/>Default: 100<br/></dd>
<dt><b>-output_only_cluster_transitions</b> \<Boolean\></dt>
<dd>escribir solo las transiciones entre clústeres<br/>Default: false<br/></dd>
<dt><b>-transition_threshold</b> \<Real\></dt>
<dd>si el rmsd respecto a known_structures es mayor que X, añadir una nueva estructura al conjunto<br/>Default: 2.0<br/></dd>
<dt><b>-max_files_per_dir</b> \<Integer\></dt>
<dd>distribuir los archivos de trayectoria y de transición en subdirectorios con un máximo de N entradas<br/>Default: 1000<br/></dd>
<dt><b>-save_loops_only</b> \<Boolean\></dt>
<dd>guardar solo la conformación del loop en el conjunto<br/>Default: false<br/></dd>
<dt><b>-dump_loops_only</b> \<Boolean\></dt>
<dd>volcar solo la conformación del loop en los silent files<br/>Default: false<br/></dd>
</dl>
+ <h3>-canonical_sampling:out</h3>
<dl>
<dt><b>-out</b> \<Boolean\></dt>
<dd>grupo de opciones out<br/></dd>
<dt><b>-new_structures</b> \<File\></dt>
<dd><br/>Default: "discovered_decoys.out"<br/></dd>
</dl>
+ <h2>-casp</h2>
<dl>
<dt><b>-casp</b> \<Boolean\></dt>
<dd>grupo de opciones casp<br/></dd>
<dt><b>-opt_radius</b> \<Real\></dt>
<dd>radio de optimización para el reempaquetado y la minimización<br/></dd>
<dt><b>-repack</b> \<Boolean\></dt>
<dd>¿debemos reempaquetar la estructura?<br/></dd>
<dt><b>-sc_min</b> \<Boolean\></dt>
<dd>¿debemos minimizar las cadenas laterales de la estructura?<br/></dd>
<dt><b>-sequential</b> \<Boolean\></dt>
<dd>¿las mutaciones deben considerarse en secuencia o todas juntas?<br/></dd>
<dt><b>-num_iterations</b> \<Real\></dt>
<dd>número de iteraciones que se realizan<br/></dd>
<dt><b>-refine_res</b> \<String\></dt>
<dd>especifica el archivo que contiene qué residuos se refinan<br/></dd>
</dl>
+ <h2>-chemically_conjugated_docking</h2>
<dl>
<dt><b>-chemically_conjugated_docking</b> \<Boolean\></dt>
<dd>grupo de opciones chemically_conjugated_docking<br/></dd>
<dt><b>-UBQpdb</b> \<File\></dt>
<dd>estructura de ubiquitina, o la estructura de la parte unida que se mueve<br/>Default: "1UBQ.pdb"<br/></dd>
<dt><b>-E2pdb</b> \<File\></dt>
<dd>estructura de E2, o la estructura de la parte a la que se une (tiene la cisteína) y que no se mueve; debe ser una sola cadena<br/>Default: "2OB4.pdb"<br/></dd>
<dt><b>-E2_residue</b> \<Integer\></dt>
<dd>cisteína catalítica de E2 (numeración PDB) (donde se une la ubiquitina; se asume que está en la primera cadena de E2pdb<br/>Default: 85<br/></dd>
<dt><b>-SASAfilter</b> \<Real\></dt>
<dd>filtrar las estructuras con un dSASA de interfaz menor que esto<br/>Default: 1000<br/></dd>
<dt><b>-scorefilter</b> \<Real\></dt>
<dd>filtrar las estructuras con una puntuación total mayor que esto<br/>Default: 10<br/></dd>
<dt><b>-publication</b> \<Boolean\></dt>
<dd>escribir las estadísticas usadas en la publicación. DESACTÍVALO si no estás ejecutando la demostración de la publicación (original de Saha et al.).<br/>Default: false<br/></dd>
<dt><b>-n_tail_res</b> \<Integer\></dt>
<dd>Número de residuos de la ~cola~ C-terminal que se hacen flexibles (incluido el extremo)<br/>Default: 3<br/></dd>
<dt><b>-two_ubiquitins</b> \<Boolean\></dt>
<dd>Alucinante: usar dos ubiquitinas (ensambladas para un enlace K48) para intentar examinar el estado de transición. No uses esta opción salvo que intentes reproducir la publicación XXXX<br/>Default: false<br/></dd>
<dt><b>-extra_bodies</b> \<FileVector\></dt>
<dd>estructuras extra que se añaden antes del modelado. Deben estar en el sistema de coordenadas de la pareja que no se mueve. No se moverán durante el modelado. Se detectarán como parte del cuerpo que no se mueve para fines de reempaquetado.<br/>Default: ""<br/></dd>
<dt><b>-UBQ2_lys</b> \<Integer\></dt>
<dd>qué Lys de la segunda UB se conjugará<br/>Default: 48<br/></dd>
<dt><b>-UBQ2_pdb</b> \<File\></dt>
<dd>PDB de la segunda ubiquitina (segunda cadena móvil). Solo está activo si se usa -two_ubiquitins; inactivo en caso contrario. Opcional; si no se pasa, toma el valor de -UBQpdb.<br/></dd>
<dt><b>-dont_minimize_omega</b> \<Boolean\></dt>
<dd>desactivar la minimización de los ángulos omega cerca del tioéster en el MoveMap; no está presente en las publicaciones originales (Saha; Baker)<br/>Default: false<br/></dd>
<dt><b>-pdz</b> \<Boolean\></dt>
<dd>Para el ejecutable UBQ_Gp_LYX-Cterm, si -publication ya está activado, cambiar al centro de masa del PDZ en lugar del centro de masa de la ubiquitina para los cálculos de estadísticas extra. No uses esta opción salvo que intentes reproducir la publicación XXXX<br/>Default: false<br/></dd>
<dt><b>-GTPasepdb</b> \<File\></dt>
<dd>estructura de la GTPasa, o la estructura de la parte a la que se une (tiene la cisteína) y que no se mueve; debe ser una sola cadena<br/>Default: "2OB4.pdb"<br/></dd>
<dt><b>-GTPase_residue</b> \<Integer\></dt>
<dd>lisina de la GTPasa (numeración PDB) (donde se une la ubiquitina; se asume que está en la primera cadena de GTPase_pdb<br/>Default: 85<br/></dd>
</dl>
+ <h2>-chunk</h2>
<dl>
<dt><b>-chunk</b> \<Boolean\></dt>
<dd>grupo de opciones chunk<br/></dd>
<dt><b>-pdb2</b> \<File\></dt>
<dd>archivo para chunk2<br/></dd>
<dt><b>-loop2</b> \<File\></dt>
<dd>región rígida para chunk2<br/></dd>
</dl>
+ <h2>-cloud</h2>
<dl>
<dt><b>-cloud</b> \<Boolean\></dt>
<dd>grupo de opciones cloud<br/></dd>
<dt><b>-auth</b> \<String\></dt>
<dd>Credenciales de RosettaCloud con la forma <user_email>:<password>. Para obtener tus credenciales visita https://ui.graylab.jhu.edu/settings<br/>Default: ""<br/></dd>
<dt><b>-key</b> \<String\></dt>
<dd>Clave que se usa al consultar al servidor de Cloud por un nuevo ID de ExecutionSummary; por defecto es una cadena vacía (sin clave), lo que significa que siempre se crea una nueva instancia de ES<br/>Default: ""<br/></dd>
<dt><b>-clean</b> \<Boolean\></dt>
<dd>Cuando se especifica la opción `key`, indica si el servidor de Cloud debe limpiar de todos los archivos existentes la instancia de ExecutionSummary<br/>Default: false<br/></dd>
<dt><b>-host</b> \<String\></dt>
<dd>Dirección del servidor de la UI<br/>Default: "ui.graylab.jhu.edu"<br/></dd>
<dt><b>-port</b> \<Integer\></dt>
<dd>Puerto del servidor de la UI<br/>Default: 80<br/></dd>
<dt><b>-block</b> \<Boolean\></dt>
<dd>Especifica qué hacer cuando la cola de red está llena: bloquear y esperar a que se envíen los paquetes, o descartar la carga útil<br/>Default: true<br/></dd>
</dl>
+ <h2>-cluster</h2>
<dl>
<dt><b>-cluster</b> \<Boolean\></dt>
<dd>grupo de opciones cluster<br/></dd>
<dt><b>-lite</b> \<Boolean\></dt>
<dd>usa un método ligero para escribir los centros de los clústeres, útil cuando hay una CANTIDAD ENORME de datos.<br/>Default: false<br/></dd>
<dt><b>-input_score_filter</b> \<Real\></dt>
<dd>Leer solo las estructuras por debajo de cierta energía<br/>Default: 1000000.0<br/></dd>
<dt><b>-output_score_filter</b> \<Real\></dt>
<dd>Leer solo las estructuras por debajo de cierta energía<br/>Default: 1000000.0<br/></dd>
<dt><b>-exclude_res</b> \<IntegerVector\></dt>
<dd>Números de residuo que se excluyen del cálculo del RMS del clúster<br/>Default: -1<br/></dd>
<dt><b>-thinout_factor</b> \<Real\></dt>
<dd>¡Ignorar esta fracción de decoys en la primera ronda!<br/>Default: -1<br/></dd>
<dt><b>-radius</b> \<Real\></dt>
<dd>Radio del clúster<br/>Default: 3.0<br/></dd>
<dt><b>-limit_cluster_size</b> \<Integer\></dt>
<dd>Conservar solo los N mejores de cada clúster <br/>Default: -1<br/></dd>
<dt><b>-limit_cluster_size_percent</b> \<Real\></dt>
<dd>De 0 a 1. Conservar solo el N % superior de cada clúster <br/></dd>
<dt><b>-random_limit_cluster_size_percent</b> \<Real\></dt>
<dd>De 0 a 1. Conservar solo un N % aleatorio de cada clúster <br/></dd>
<dt><b>-limit_clusters</b> \<Integer\></dt>
<dd>Conservar solo los N clústeres más grandes<br/>Default: 100<br/></dd>
<dt><b>-limit_total_structures</b> \<Integer\></dt>
<dd>Conservar solo las primeras N estructuras (ordenadas por número de clúster)<br/>Default: -1<br/></dd>
<dt><b>-max_total_cluster</b> \<Integer\></dt>
<dd>Hacer como máximo N clústeres<br/>Default: 1000<br/></dd>
<dt><b>-gdtmm</b> \<Boolean\></dt>
<dd>Agrupar por gdtmm en lugar de por RMS<br/>Default: false<br/></dd>
<dt><b>-skip_align</b> \<Boolean\></dt>
<dd>Agrupar sin alinear las estructuras<br/>Default: false<br/></dd>
<dt><b>-max_rms_matrix</b> \<Integer\></dt>
<dd>Número máximo de estructuras que se usan para calcular la matriz completa de RMSD<br/>Default: 400<br/></dd>
<dt><b>-rna_P</b> \<Boolean\></dt>
<dd>Calcular el rmsd solo a partir de las posiciones de fosfato de la cadena principal<br/>Default: false<br/></dd>
<dt><b>-sort_groups_by_energy</b> \<Boolean\></dt>
<dd>Ordenar los clústeres por energía<br/>Default: false<br/></dd>
<dt><b>-sort_groups_by_size</b> \<Boolean\></dt>
<dd>Ordenar los clústeres por energía<br/>Default: false<br/></dd>
<dt><b>-remove_singletons</b> \<Boolean\></dt>
<dd>Eliminar los clústeres de un solo miembro<br/>Default: false<br/></dd>
<dt><b>-export_only_low</b> \<Boolean\></dt>
<dd>Imprimir solo el miembro de menor energía<br/>Default: false<br/></dd>
<dt><b>-remove_highest_energy_member</b> \<Boolean\></dt>
<dd>Eliminar el miembro de mayor energía de cada clúster<br/>Default: false<br/></dd>
<dt><b>-idealize_final_structures</b> \<Boolean\></dt>
<dd>Ejecutar una idealización sobre las estructuras resultantes<br/>Default: false<br/></dd>
<dt><b>-limit_dist_matrix</b> \<Integer\></dt>
<dd>Calcular la matriz completa solo para un subconjunto de estructuras. Luego, simplemente asignar las estructuras al clúster más cercano<br/>Default: -1<br/></dd>
<dt><b>-make_ensemble_cst</b> \<Boolean\></dt>
<dd>Crear un conjunto de restricciones que describan la variabilidad de cada residuo en cada clúster.<br/>Default: false<br/></dd>
<dt><b>-hotspot_hash</b> \<Boolean\></dt>
<dd>Agrupar los resultados del hashing de puntos calientes (hotspots). Cada PDB de entrada debe contener tanto el objetivo como el punto caliente recién acoplado (que debe ser el último residuo del Pose).<br/>Default: false<br/></dd>
<dt><b>-loops</b> \<Boolean\></dt>
<dd>Agrupar el loop especificado con la opción -loops:loop_file<br/>Default: false<br/></dd>
<dt><b>-population_weight</b> \<Real\></dt>
<dd>Ordenar los clústeres por (1-p)*puntuación - p*tamaño, donde p = population_weight <br/>Default: 0.09<br/></dd>
<dt><b>-template_scores</b> \<String\></dt>
<dd>archivo de texto simple que contiene nombres de plantillas (en mayúsculas) y puntuaciones.<br/></dd>
<dt><b>-K_level</b> \<Integer\></dt>
<dd>Número de nivel del agrupamiento jerárquico<br/>Default: 1<br/></dd>
<dt><b>-K_radius</b> \<RealVector\></dt>
<dd>Lista de radios de los distintos niveles de agrupamiento<br/>Default: utility::vector1<float>(1, 2.0)<br/></dd>
<dt><b>-K_n_cluster</b> \<IntegerVector\></dt>
<dd>Cuántos clústeres hay en cada nivel<br/>Default: utility::vector1<int>(1, 10000)<br/></dd>
<dt><b>-K_style</b> \<StringVector\></dt>
<dd>Qué motor de K-clústeres usar<br/>Default: utility::vector1<std::string>(9, "GKC")<br/></dd>
<dt><b>-K_n_sub</b> \<Integer\></dt>
<dd>Número de clústeres en el subdirectorio<br/>Default: 100<br/></dd>
<dt><b>-K_deque_size</b> \<Integer\></dt>
<dd>Tamaño de la deque de subclústeres<br/>Default: 20<br/></dd>
<dt><b>-K_deque_level</b> \<Integer\></dt>
<dd>Proporcionar la deque en el nivel superior<br/>Default: 1<br/></dd>
<dt><b>-K_redundant</b> \<Boolean\></dt>
<dd>Mantener todas las estructuras centrales de niveles superiores en los subconjuntos<br/>Default: true<br/></dd>
<dt><b>-K_not_fit_xyz</b> \<Boolean\></dt>
<dd>No rotar xyz al calcular el rmsd<br/>Default: false<br/></dd>
<dt><b>-K_save_headers</b> \<Boolean\></dt>
<dd>Guardar los encabezados en el silent file<br/>Default: false<br/></dd>
<dt><b>-score_diff_cut</b> \<Real\></dt>
<dd>corte de diferencia de puntuación para el agrupamiento de ARN y SWA<br/>Default: 1000000.0<br/></dd>
<dt><b>-auto_tune</b> \<Boolean\></dt>
<dd>ajustar automáticamente el rmsd para el agrupamiento entre 0.1 Å y 2.0 Å, para el agrupador de SWA<br/>Default: false<br/></dd>
<dt><b>-write_centers</b> \<Boolean\></dt>
<dd>Escribir un silent file con los centros de los clústeres<br/>Default: false<br/></dd>
</dl>
+ <h3>-cluster:energy_based_clustering</h3>
<dl>
<dt><b>-energy_based_clustering</b> \<Boolean\></dt>
<dd>grupo de opciones energy_based_clustering<br/></dd>
<dt><b>-prerelax</b> \<Boolean\></dt>
<dd>¿Debe someterse a las estructuras importadas a una ronda de relajación rápida? Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-relax_rounds</b> \<Integer\></dt>
<dd>El número de rondas de fastrelax que se aplican si se usa la opción -cluster:energy_based_clustering:prerelax. Por defecto, 1.<br/>Default: 1<br/></dd>
<dt><b>-cluster_by</b> \<String\></dt>
<dd>¿Qué debo usar como base para el agrupamiento? Las opciones son bb_cartesian (coordenadas xyz de los átomos de la cadena principal) y bb_dihedral (ángulos phi, psi, omega). Por defecto es bb_cartesian.<br/>Default: "bb_cartesian"<br/></dd>
<dt><b>-use_CB</b> \<Boolean\></dt>
<dd>Si se agrupa por coordenadas cartesianas de la cadena principal, ¿deben incluirse los carbonos beta? Por defecto, false. Ten en cuenta que, si se usa esta opción, ninguna de las estructuras de entrada puede contener glicina.<br/>Default: false<br/></dd>
<dt><b>-cluster_radius</b> \<Real\></dt>
<dd>El radio para el agrupamiento, en Å para el agrupamiento cartesiano y en grados para el agrupamiento diedro. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-residues_to_ignore</b> \<IntegerVector\></dt>
<dd>Lista de residuos que se ignoran en los alineamientos para el agrupamiento. Por defecto, lista vacía.<br/></dd>
<dt><b>-chains_to_ignore</b> \<IntegerVector\></dt>
<dd>Lista de cadenas que se ignoran en los alineamientos para el agrupamiento. Por defecto, lista vacía.<br/></dd>
<dt><b>-limit_structures_per_cluster</b> \<Integer\></dt>
<dd>Número máximo de estructuras que se escriben por clúster. Por defecto, sin límite (0).<br/>Default: 0<br/></dd>
<dt><b>-limit_clusters</b> \<Integer\></dt>
<dd>Número máximo de clústeres que se escriben. Por defecto, sin límite (0).<br/>Default: 0<br/></dd>
<dt><b>-cyclic</b> \<Boolean\></dt>
<dd>Si es true, se añaden restricciones para formar un enlace peptídico entre los extremos N y C. Si es false (por defecto), los extremos quedan libres. Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-cyclic_symmetry</b> \<Integer\></dt>
<dd>Si se indica, se filtran las estructuras que no tengan la simetría deseada. Pon 2 para simetría C2 o S2, 3 para simetría C3, 4 para C4 o S4, etc. No se usa (0) si no se especifica. Solo se puede usar con la opción -cluster:energy_based_clustering:cyclic.<br/>Default: 0<br/></dd>
<dt><b>-cyclic_symmetry_mirroring</b> \<Boolean\></dt>
<dd>Si es true, se usa simetría SN en lugar de CN. No se usa si no se especifica. Solo se puede usar con las opciones -cluster:energy_based_clustering:cyclic y -cluster:energy_based_clustering:cyclic_symmetry.<br/>Default: false<br/></dd>
<dt><b>-cyclic_symmetry_threshold</b> \<Real\></dt>
<dd>El umbral de ángulo, en grados, para determinar si un péptido cíclico es simétrico. Solo se puede usar con las opciones -cluster:energy_based_clustering:cyclic y -cluster:energy_based_clustering:cyclic_symmetry. Por defecto, 10.0 grados.<br/>Default: 10.0<br/></dd>
<dt><b>-cluster_cyclic_permutations</b> \<Boolean\></dt>
<dd>Si es true, se prueban todas las permutaciones cíclicas al comparar dos estructuras para el agrupamiento. Requiere -cluster:energy_based_clustering:cyclic true. Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-cyclic_permutation_offset</b> \<Integer\></dt>
<dd>1 por defecto, lo que significa que se agrupa toda permutación cíclica si -cluster:energy_based_clustering:cluster_cyclic_permutations es true. Los valores X > 1 significan que se agruparán las permutaciones cíclicas desplazadas X residuos.<br/>Default: 1<br/></dd>
<dt><b>-perform_ABOXYZ_bin_analysis</b> \<Boolean\></dt>
<dd>Si es true, se realiza un análisis de intervalos de Ramachandran en todos los clústeres usando los intervalos A, B, X, Y y O definidos en Hosseinzadeh, Bhardwaj, Mulligan et al. (2018). Las entradas deben ser estructuras de solo alfa-aminoácidos o peptoides. False por defecto.<br/>Default: false<br/></dd>
<dt><b>-mutate_to_ala</b> \<Boolean\></dt>
<dd>Si es true, las estructuras de entrada se convertirán en una cadena de alaninas (L o D) antes de puntuar. Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-disulfide_positions</b> \<IntegerVector\></dt>
<dd>Una lista, separada por espacios, de posiciones con puente disulfuro. Por ejemplo, -cluster:energy_based_clustering:disulfide_positions 3 8 6 23 significaría que los residuos 3 y 8 forman un puente disulfuro, al igual que los residuos 6 y 23. Por defecto, una lista vacía si no se especifica la opción, en cuyo caso los puentes disulfuro se detectan automáticamente.<br/></dd>
<dt><b>-homooligomer_swap</b> \<Boolean\></dt>
<dd>Si las estructuras contienen varias cadenas con secuencia idéntica, poner esto en true probará todas las permutaciones de cadenas al agrupar. Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-silent_output</b> \<Boolean\></dt>
<dd>Escribir la salida en un silent file en lugar de en PDB separados. Esto creará dos archivos: uno que contiene solo el primer miembro de cada clúster y otro que contiene todo. Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-cst_file</b> \<FileVector\></dt>
<dd>Una lista opcional, especificada por el usuario, de uno o más archivos de restricciones. Por defecto, sin usar.<br/></dd>
<dt><b>-extra_rms_atoms</b> \<StringVector\></dt>
<dd>Una lista de átomos adicionales que se usan en el cálculo de RMSD, cada uno con el formato residuo:nombre_de_átomo separados por espacios en blanco. Por ejemplo, -extra_rms_atoms 7:SG 12:CG 12:CD 12:CE 12:NZ 14:OG. Por defecto, lista vacía.<br/></dd>
<dt><b>-rebuild_all_in_dihedral_mode</b> \<Boolean\></dt>
<dd>Si es true, se reconstruyen Poses completos para la salida al agrupar en modo diedro. Si es false, solo se escriben las cadenas principales. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-alternative_score_file</b> \<File\></dt>
<dd>Un archivo con una línea por estructura, con el nombre del archivo de entrada del Pose y una puntuación alternativa para ordenar, separados por espacios en blanco.<br/></dd>
</dl>
+ <h2>-partial_thread</h2>
<dl>
<dt><b>-partial_thread</b> \<Boolean\></dt>
<dd>grupo de opciones partial_thread<br/></dd>
<dt><b>-skip_repack</b> \<Boolean\></dt>
<dd>No reempaquetar las cadenas laterales con densidad ausente ni idealizar/optimizar los enlaces de hidrógeno<br/>Default: false<br/></dd>
</dl>
+ <h2>-cm</h2>
<dl>
<dt><b>-cm</b> \<Boolean\></dt>
<dd>grupo de opciones cm<br/></dd>
</dl>
+ <h3>-cm:sanitize</h3>
<dl>
<dt><b>-sanitize</b> \<Boolean\></dt>
<dd>grupo de opciones sanitize<br/></dd>
<dt><b>-num_fragments</b> \<Integer\></dt>
<dd>Usar los k mejores fragmentos en cada posición durante la depuración (sanitization)<br/>Default: 25<br/></dd>
<dt><b>-cst_weight_pair</b> \<Real\></dt>
<dd>peso de atom_pair_constraint<br/>Default: 1.0<br/></dd>
<dt><b>-cst_weight_coord</b> \<Real\></dt>
<dd>peso de coordinate_constraint<br/>Default: 1.0<br/></dd>
</dl>
+ <h2>-cm</h2>
<dl>
<dt><b>-start_models_only</b> \<Boolean\></dt>
<dd>¡Hacer solo modelos iniciales!<br/>Default: false<br/></dd>
<dt><b>-aln_format</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "grishin"<br/></dd>
<dt><b>-recover_side_chains</b> \<Boolean\></dt>
<dd>recuperar las cadenas laterales<br/>Default: false<br/></dd>
<dt><b>-steal_extra_residues</b> \<FileVector\></dt>
<dd>lista de residuos extra de plantilla (es decir, ligandos) que se añaden al Pose de consulta en el modelado comparativo<br/></dd>
<dt><b>-loop_mover</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "quick_ccd"<br/></dd>
<dt><b>-loop_close_level</b> \<Integer\></dt>
<dd>nivel de agresividad que se usa al cerrar loops. 					Los enteros que siguen a las opciones especifican con qué agresividad 					se reconstruyen los loops. Cada opción implica todos los niveles distintos de cero por debajo,					de modo que loop_close_level 2 implica también el nivel 1. El significado de 					las opciones es: 					NO_REBUILD              0     no reconstruir ningún loop 					REBUILD_UNALIGNED       1     reconstruir loops alrededor de regiones sin alinear 					REBUILD_CHAINBREAK      2     reconstruir loops alrededor de chainbreaks 					REBUILD_EXHAUSTIVE      3     reconstruir loops alrededor de regiones con un chainbreak hasta que no quede ninguno<br/>Default: 0<br/></dd>
<dt><b>-min_loop_size</b> \<Integer\></dt>
<dd>Tamaño mínimo de los loops que se remodelan al construir modelos por threading.<br/>Default: 5<br/></dd>
<dt><b>-max_loop_rebuild</b> \<Integer\></dt>
<dd>Número máximo de veces que se intenta reconstruir un loop antes de rendirse.<br/>Default: 10<br/></dd>
<dt><b>-loop_rebuild_filter</b> \<Real\></dt>
<dd>Puntuación máxima que debe tener una estructura tras la reconstrucción de loops.<br/>Default: 0<br/></dd>
<dt><b>-aln_length_filter_quantile</b> \<Real\></dt>
<dd>Usar solo alineamientos con longitud mayor que el cuantil X. Por ejemplo, poner 0.75 usará solo el 25% de los alineamientos más largos<br/>Default: 0.0<br/></dd>
<dt><b>-aln_length_filter</b> \<Integer\></dt>
<dd>Usar solo alineamientos con longitud mayor o igual que esta<br/>Default: -1<br/></dd>
<dt><b>-seq_score</b> \<StringVector\></dt>
<dd>esquema de puntuación basado en secuencia usado para generar alineamientos<br/>Default: utility::vector1<std::string>(1,"Simple")<br/></dd>
<dt><b>-aligner</b> \<String\></dt>
<dd>algoritmo para hacer alineamientos de secuencia<br/></dd>
<dt><b>-min_gap_open</b> \<Real\></dt>
<dd>penalización por apertura de hueco en los alineamientos de secuencia (normalmente negativa)<br/>Default: -2.0<br/></dd>
<dt><b>-max_gap_open</b> \<Real\></dt>
<dd>penalización por apertura de hueco en los alineamientos de secuencia (normalmente negativa)<br/>Default: -2.0<br/></dd>
<dt><b>-min_gap_extend</b> \<Real\></dt>
<dd>penalización por extensión de hueco en los alineamientos de secuencia (normalmente negativa)<br/>Default: -0.2<br/></dd>
<dt><b>-max_gap_extend</b> \<Real\></dt>
<dd>penalización por extensión de hueco en los alineamientos de secuencia (normalmente negativa)<br/>Default: -0.2<br/></dd>
<dt><b>-nn</b> \<Integer\></dt>
<dd>número de vecinos que se incluyen en la derivación de restricciones<br/>Default: 500<br/></dd>
<dt><b>-ev_map</b> \<FileVector\></dt>
<dd>Archivo de entrada que asigna cadenas pdb a valores e de blast<br/></dd>
<dt><b>-hh_map</b> \<FileVector\></dt>
<dd>Archivo de entrada que asigna cadenas pdb a probabilidades de hhsearch<br/></dd>
<dt><b>-seeds</b> \<IntegerVector\></dt>
<dd>lista de etiquetas usadas como padres semilla en la iteración anterior<br/></dd>
<dt><b>-nremain_reset</b> \<Integer\></dt>
<dd>umbral del número de estructuras sin usar para invocar un reinicio<br/>Default: 3<br/></dd>
<dt><b>-quota_per_silent</b> \<RealVector\></dt>
<dd>cuota para elegir estructuras de entrada asociadas con -in:file:silent<br/></dd>
<dt><b>-similarity_cut</b> \<Real\></dt>
<dd>Corte de distancia sobre la población de estructuras, usado para CSA (en puntuación S)<br/></dd>
<dt><b>-similarity_limit</b> \<Real\></dt>
<dd>Corte de distancia para el filtrado inicial (en puntuación S)<br/></dd>
<dt><b>-refsimilarity_cut</b> \<Real\></dt>
<dd>Umbral inferior del GDT-HA entre modelo y plantilla a partir del cual empieza a haber penalización<br/>Default: 25<br/></dd>
</dl>
+ <h3>-cm:hybridize</h3>
<dl>
<dt><b>-hybridize</b> \<Boolean\></dt>
<dd>grupo de opciones hybridize<br/></dd>
<dt><b>-starting_template</b> \<IntegerVector\></dt>
<dd>Definir las plantillas iniciales<br/></dd>
<dt><b>-realign_domains</b> \<Boolean\></dt>
<dd>analizar dominios y volver a alinear las plantillas iniciales<br/>Default: true<br/></dd>
<dt><b>-realign_domains_stage2</b> \<Boolean\></dt>
<dd>volver a alinear las plantillas iniciales al Pose después de la etapa1<br/>Default: true<br/></dd>
<dt><b>-add_non_init_chunks</b> \<Integer\></dt>
<dd>añadir (en promedio) esta cantidad de trozos que no son de plantilla<br/>Default: 0<br/></dd>
<dt><b>-stage1_increase_cycles</b> \<Real\></dt>
<dd>Escalar los ciclos de la etapa 1<br/>Default: 1.0<br/></dd>
<dt><b>-stage2_increase_cycles</b> \<Real\></dt>
<dd>Escalar los ciclos de la etapa 2<br/>Default: 1.0<br/></dd>
<dt><b>-stage2min_increase_cycles</b> \<Real\></dt>
<dd>Escalar los ciclos del minimizador después de la etapa 2<br/>Default: 1.0<br/></dd>
<dt><b>-stage1_probability</b> \<Real\></dt>
<dd>Probabilidad de hibridar en la etapa 1, 0=nunca, 1=siempre<br/>Default: 1.0<br/></dd>
<dt><b>-skip_stage2</b> \<Boolean\></dt>
<dd>omitir la etapa de hibridación de fragmentos cartesiana<br/>Default: false<br/></dd>
<dt><b>-no_global_frame</b> \<Boolean\></dt>
<dd>sin inserciones de fragmentos en el sistema de referencia global<br/>Default: false<br/></dd>
<dt><b>-linmin_only</b> \<Boolean\></dt>
<dd>linmin solo en la etapa 2<br/>Default: false<br/></dd>
<dt><b>-relax</b> \<Integer\></dt>
<dd>si n==1, realizar relax al final; si n>1, realizar relax por lotes sobre n centroides<br/>Default: 0<br/></dd>
<dt><b>-frag_weight_aligned</b> \<Real\></dt>
<dd>Probabilidad de inserción de fragmentos en la región alineada<br/>Default: 0.<br/></dd>
<dt><b>-max_registry_shift</b> \<Integer\></dt>
<dd>desplazamiento máximo del registro<br/>Default: 0<br/></dd>
<dt><b>-frag_1mer_insertion_weight</b> \<Real\></dt>
<dd>peso de las inserciones de fragmentos 1mer, donde no se permiten fragmentos, frente a las inserciones de trozos de plantilla en la etapa1<br/>Default: 0.0<br/></dd>
<dt><b>-small_frag_insertion_weight</b> \<Real\></dt>
<dd>peso de las inserciones de fragmentos pequeños, donde no se permiten fragmentos grandes, frente a las inserciones de trozos de plantilla en la etapa1<br/>Default: 0.0<br/></dd>
<dt><b>-big_frag_insertion_weight</b> \<Real\></dt>
<dd>peso de las inserciones de fragmentos grandes frente a las inserciones de trozos de plantilla en la etapa1<br/>Default: 0.5<br/></dd>
<dt><b>-auto_frag_insertion_weight</b> \<Boolean\></dt>
<dd>fijar automáticamente el peso de las inserciones de fragmentos frente a las inserciones de trozos de plantilla en la etapa1<br/>Default: true<br/></dd>
<dt><b>-stage1_1_cycles</b> \<Integer\></dt>
<dd>Número de ciclos de la etapa 1 de ab initio en Stage1<br/>Default: 2000<br/></dd>
<dt><b>-stage1_2_cycles</b> \<Integer\></dt>
<dd>Número de ciclos de la etapa 2 de ab initio en Stage1<br/>Default: 2000<br/></dd>
<dt><b>-stage1_3_cycles</b> \<Integer\></dt>
<dd>Número de ciclos de la etapa 3 de ab initio en Stage1<br/>Default: 2000<br/></dd>
<dt><b>-stage1_4_cycles</b> \<Integer\></dt>
<dd>Número de ciclos de la etapa 4 de ab initio en Stage1<br/>Default: 400<br/></dd>
<dt><b>-stage2_temperature</b> \<Real\></dt>
<dd>Temperatura de Monte Carlo en la etapa2<br/>Default: 2.0<br/></dd>
<dt><b>-stage1_4_cenrot_score</b> \<String\></dt>
<dd>Cambiar al modelo cenrot en stage1_4<br/>Default: "score_cenrot_cm_stage1_4.wts"<br/></dd>
<dt><b>-include_loop_ss_chunks</b> \<Boolean\></dt>
<dd>incluir trozos de estructura secundaria de loops de las plantillas<br/>Default: false<br/></dd>
</dl>
+ <h2>-constel</h2>
<dl>
<dt><b>-constel</b> \<Boolean\></dt>
<dd>grupo de opciones constel<br/></dd>
<dt><b>-pair_all_res</b> \<Boolean\></dt>
<dd>extrae todas las constelaciones formadas por todos los pares de residuos<br/>Default: false<br/></dd>
<dt><b>-triple_all_res</b> \<Boolean\></dt>
<dd>extrae todas las constelaciones formadas por todas las tríadas de residuos<br/>Default: false<br/></dd>
<dt><b>-pair_target_resnum</b> \<Integer\></dt>
<dd>Número de residuo PDB del residuo objetivo para constelaciones de dos residuos<br/>Default: -1<br/></dd>
<dt><b>-triple_target_resnum</b> \<Integer\></dt>
<dd>Número de residuo PDB del residuo objetivo para constelaciones de tres residuos<br/>Default: -1<br/></dd>
<dt><b>-target_chain</b> \<String\></dt>
<dd>ID de cadena PDB del residuo objetivo<br/>Default: "A"<br/></dd>
<dt><b>-pair_target_mutations</b> \<String\></dt>
<dd>Par de mutaciones objetivo para constelaciones de dos residuos<br/>Default: "**_**"<br/></dd>
<dt><b>-target_cnl</b> \<String\></dt>
<dd>Ruta al archivo que describe la constelación objetivo<br/>Default: ""<br/></dd>
<dt><b>-cnl_stripped</b> \<Boolean\></dt>
<dd>Quita a las constelaciones los átomos más cercanos a la cadena principal<br/>Default: false<br/></dd>
<dt><b>-max_atom_sasa</b> \<Real\></dt>
<dd>SASA máxima permitida para un átomo de una constelación<br/>Default: 999999.9<br/></dd>
<dt><b>-chain_interface</b> \<Boolean\></dt>
<dd>Conserva solo las constelaciones compartidas por varias cadenas<br/>Default: false<br/></dd>
<dt><b>-aromatic</b> \<Boolean\></dt>
<dd>Conserva solo las constelaciones con al menos un anillo aromático<br/>Default: false<br/></dd>
<dt><b>-cnl_exclude</b> \<String\></dt>
<dd>Ruta al archivo que lista los residuos que se excluyen de las constelaciones<br/>Default: ""<br/></dd>
<dt><b>-prox_ct_max</b> \<Real\></dt>
<dd>Distancia máxima de una constelación a un extremo de la cadena<br/>Default: 0<br/></dd>
<dt><b>-prox_tt_max</b> \<Real\></dt>
<dd>Distancia máxima entre los extremos de la cadena<br/>Default: 10.0<br/></dd>
<dt><b>-prox_nres</b> \<Integer\></dt>
<dd>Número de residuos que forman un extremo de la cadena<br/>Default: 10<br/></dd>
<dt><b>-indole_coo</b> \<Boolean\></dt>
<dd>Conserva solo las constelaciones formadas por un grupo indol más un grupo COO<br/>Default: false<br/></dd>
<dt><b>-tryptamine</b> \<Boolean\></dt>
<dd>Conserva solo las constelaciones que pueden coincidir con la triptamina<br/>Default: false<br/></dd>
<dt><b>-amphetamine</b> \<Boolean\></dt>
<dd>Conserva solo las constelaciones que pueden coincidir con la anfetamina<br/>Default: false<br/></dd>
<dt><b>-histamine</b> \<Boolean\></dt>
<dd>Conserva solo las constelaciones que pueden coincidir con la histamina<br/>Default: false<br/></dd>
</dl>
+ <h2>-contactMap</h2>
<dl>
<dt><b>-contactMap</b> \<Boolean\></dt>
<dd>grupo de opciones contactMap<br/></dd>
<dt><b>-prefix</b> \<String\></dt>
<dd>Prefijo del nombre de archivo de contactMap<br/>Default: "contact_map_"<br/></dd>
<dt><b>-distance_cutoff</b> \<Real\></dt>
<dd>Distancia de corte de la cadena principal para que dos átomos se consideren en interacción<br/>Default: 10.0<br/></dd>
<dt><b>-region_def</b> \<String\></dt>
<dd>Definición de región para la comparación, p. ej.: 1-10:20-30,40-50,A:ligand=X<br/>Default: ""<br/></dd>
<dt><b>-row_format</b> \<Boolean\></dt>
<dd>Indicador de si se escribe en formato de fila en lugar de formato de matriz<br/>Default: false<br/></dd>
<dt><b>-distance_matrix</b> \<Boolean\></dt>
<dd>Escribir una matriz de distancias en lugar de un mapa de contactos<br/>Default: false<br/></dd>
</dl>
+ <h2>-coupled_moves</h2>
<dl>
<dt><b>-coupled_moves</b> \<Boolean\></dt>
<dd>grupo de opciones coupled_moves<br/></dd>
<dt><b>-ntrials</b> \<Integer\></dt>
<dd>número de intentos de Monte Carlo que se ejecutan<br/>Default: 1000<br/></dd>
<dt><b>-number_ligands</b> \<Integer\></dt>
<dd>número de ligandos en el Pose<br/>Default: 1<br/></dd>
<dt><b>-mc_kt</b> \<Real\></dt>
<dd>valor de kT para Monte Carlo<br/>Default: 0.6<br/></dd>
<dt><b>-boltzmann_kt</b> \<Real\></dt>
<dd>valor de kT para los movimientos ponderados por Boltzmann<br/>Default: 0.6<br/></dd>
<dt><b>-mm_bend_weight</b> \<Real\></dt>
<dd>peso del término de energía de ángulos de enlace mm_bend<br/>Default: 1.0<br/></dd>
<dt><b>-trajectory</b> \<Boolean\></dt>
<dd>registrar una trayectoria<br/>Default: false<br/></dd>
<dt><b>-trajectory_gz</b> \<Boolean\></dt>
<dd>comprimir la trayectoria con gzip<br/>Default: false<br/></dd>
<dt><b>-trajectory_stride</b> \<Integer\></dt>
<dd>escribir un fotograma de la trayectoria cada N pasos<br/>Default: 100<br/></dd>
<dt><b>-trajectory_file</b> \<String\></dt>
<dd>nombre del archivo de trayectoria<br/>Default: "traj.pdb"<br/></dd>
<dt><b>-output_fasta</b> \<String\></dt>
<dd>nombre del archivo de salida FASTA<br/>Default: "sequences.fasta"<br/></dd>
<dt><b>-output_stats</b> \<String\></dt>
<dd>nombre del archivo de salida de estadísticas<br/>Default: "sequences.stats"<br/></dd>
<dt><b>-ligand_mode</b> \<Boolean\></dt>
<dd>si es true, modelar la interacción proteína-ligando<br/>Default: false<br/></dd>
<dt><b>-initial_repack</b> \<Boolean\></dt>
<dd>iniciar la simulación con un paso de reempaquetado y diseño<br/>Default: true<br/></dd>
<dt><b>-min_pack</b> \<Boolean\></dt>
<dd>usar min_pack para el paso inicial de reempaquetado y diseño<br/>Default: false<br/></dd>
<dt><b>-save_sequences</b> \<Boolean\></dt>
<dd>guardar todas las secuencias únicas<br/>Default: true<br/></dd>
<dt><b>-save_structures</b> \<Boolean\></dt>
<dd>guardar las estructuras de todas las secuencias únicas<br/>Default: false<br/></dd>
<dt><b>-ligand_prob</b> \<Real\></dt>
<dd>probabilidad de hacer un movimiento del ligando<br/>Default: 0.1<br/></dd>
<dt><b>-fix_backbone</b> \<Boolean\></dt>
<dd>no hacer ningún movimiento de la cadena principal<br/>Default: false<br/></dd>
<dt><b>-uniform_backrub</b> \<Boolean\></dt>
<dd>elegir el ángulo de rotación de backrub de una distribución uniforme<br/>Default: false<br/></dd>
<dt><b>-bias_sampling</b> \<Boolean\></dt>
<dd>si es true, sesgar la selección de rotámeros según la energía<br/>Default: true<br/></dd>
<dt><b>-bump_check</b> \<Boolean\></dt>
<dd>si es true, usar la comprobación de choques al generar rotámeros<br/>Default: true<br/></dd>
<dt><b>-ligand_weight</b> \<Real\></dt>
<dd>peso de las interacciones residuo-ligando<br/>Default: 1.0<br/></dd>
<dt><b>-output_prefix</b> \<String\></dt>
<dd>prefijo de los archivos de salida<br/>Default: ""<br/></dd>
<dt><b>-walking_perturber_magnitude</b> \<Real\></dt>
<dd>Parámetro de grado del perturbador de caminata de kic en movimientos acoplados.<br/>Default: 2.0<br/></dd>
<dt><b>-kic_loop_size</b> \<Real\></dt>
<dd>KIC intentará cambiar los ángulos de torsión de un segmento de esta cantidad de residuos de largo. Se diseñará el rotámero del residuo central, por lo que kic_loop_size debe ser un número impar para que exista un residuo central. (La longitud del segmento de backrub está fijada en el código en ShortBackrubMover: 3 residuos, o 4 si encuentra una prolina).<br/>Default: 9<br/></dd>
<dt><b>-kic_perturber</b> \<String\></dt>
<dd>Qué perturbador usar durante el cierre cinemático (KIC). Las opciones actuales son walking (por defecto) o fragment. El perturbador walking ajusta las torsiones en grados, cuya magnitud se puede fijar con -walking_perturber_magnitude. Si especificas walking, PUEDES especificar también -walking_perturber_magnitude. Si especificas fragment, DEBES especificar también -loops::frag_files y -loops::frag_sizes.<br/>Default: "walking"<br/></dd>
<dt><b>-backbone_mover</b> \<String\></dt>
<dd>Qué mover de la cadena principal usar. Las opciones actuales son backrub (por defecto) o kic. Backrub no requiere opciones adicionales y usa ShortBackrubMover, que está fijado en el código para segmentos de 3 residuos (o 4 si encuentra una prolina). Kic admite opcionalmente la opción adicional -kic_perturber.<br/>Default: "backrub"<br/></dd>
<dt><b>-repack_neighborhood</b> \<Boolean\></dt>
<dd>Después del movimiento de la cadena principal y del movimiento de rotámeros, reempaquetar las cadenas laterales a menos de 5 Å del residuo de diseño. Por defecto es false por compatibilidad con el comportamiento heredado (heredado = Ollikainen 2015).<br/>Default: false<br/></dd>
<dt><b>-exclude_nonclashing_positions</b> \<Boolean\></dt>
<dd>True = para cada posición empaquetable, ClashBasedShellSelector recorre los rotámeros para determinar si el residuo podría chocar con alguna posición diseñable. Si no es posible un choque, la posición empaquetable cambia de NATAA a NATRO. False = realizar los movimientos de cadenas laterales estrictamente como se definen en el resfile. El valor por defecto true reproduce el comportamiento de Ollikainen 2015.<br/>Default: true<br/></dd>
</dl>
+ <h2>-cp</h2>
<dl>
<dt><b>-cp</b> \<Boolean\></dt>
<dd>grupo de opciones cp<br/></dd>
<dt><b>-cutoff</b> \<Real\></dt>
<dd>corte de vecinos diseñables<br/>Default: 16<br/></dd>
<dt><b>-relax_sfxn</b> \<String\></dt>
<dd>función de puntuación para el paso final de relajación<br/>Default: "score12_full"<br/></dd>
<dt><b>-pack_sfxn</b> \<String\></dt>
<dd>función de puntuación para los ensayos de mutaciones<br/>Default: "gauss"<br/></dd>
<dt><b>-minimizer_score_fxn</b> \<String\></dt>
<dd>función de puntuación para la minimización inicial<br/>Default: "score12_full"<br/></dd>
<dt><b>-output</b> \<String\></dt>
<dd>archivo donde queremos volcar el Pose final<br/>Default: "final_mutant.pdb"<br/></dd>
<dt><b>-ncycles</b> \<Integer\></dt>
<dd>cuántos ciclos de refinamiento se ejecutan<br/>Default: 0<br/></dd>
<dt><b>-max_failures</b> \<Integer\></dt>
<dd>cuántos fallos se toleran en cada iteración antes de salir<br/>Default: 1<br/></dd>
<dt><b>-print_reports</b> \<Boolean\></dt>
<dd>¿imprimir informes en un archivo de texto?<br/>Default: false<br/></dd>
<dt><b>-vipReportFile</b> \<String\></dt>
<dd>Archivo donde se imprimen los informes<br/>Default: "reports.txt"<br/></dd>
<dt><b>-exclude_file</b> \<String\></dt>
<dd>Archivo de entrada opcional para especificar las posiciones que no deben mutarse<br/>Default: "cp_excludes"<br/></dd>
<dt><b>-relax_mover</b> \<String\></dt>
<dd>relax sin restricciones=relax, con restricciones=cst_relax<br/>Default: "relax"<br/></dd>
<dt><b>-skip_relax</b> \<Boolean\></dt>
<dd>Omitir el paso de relax... puede reducir la identificación precisa de mutaciones<br/>Default: false<br/></dd>
<dt><b>-local_relax</b> \<Boolean\></dt>
<dd>Limitar el paso de relax a los vecinos<br/>Default: false<br/></dd>
<dt><b>-print_intermediate_pdbs</b> \<Boolean\></dt>
<dd>Escribir un archivo pdb por cada mutación consecutiva<br/>Default: false<br/></dd>
<dt><b>-use_unrelaxed_starting_points</b> \<Boolean\></dt>
<dd>En las iteraciones posteriores, usa la mutación antes de la relajación<br/>Default: false<br/></dd>
<dt><b>-easy_vip_acceptance</b> \<Boolean\></dt>
<dd>En todas las iteraciones, usar la energía inicial para la prueba de aceptación<br/>Default: false<br/></dd>
</dl>
+ <h2>-cryst</h2>
<dl>
<dt><b>-cryst</b> \<Boolean\></dt>
<dd>grupo de opciones cryst<br/></dd>
<dt><b>-mtzfile</b> \<String\></dt>
<dd>archivo mtz<br/></dd>
<dt><b>-crystal_refine</b> \<Boolean\></dt>
<dd>Activa las opciones específicas del refinamiento cristalográfico<br/>Default: false<br/></dd>
<dt><b>-refinable_lattice</b> \<Boolean\></dt>
<dd>En MakeLatticeMover, ¿se pueden refinar las dimensiones de la red?<br/>Default: true<br/></dd>
<dt><b>-interaction_shell</b> \<Real\></dt>
<dd>En MakeLatticeMover, ¿cuál es la capa de interacción por defecto?<br/>Default: 12.0<br/></dd>
</dl>
+ <h2>-csa</h2>
<dl>
<dt><b>-csa</b> \<Boolean\></dt>
<dd>grupo de opciones csa<br/></dd>
<dt><b>-useZ</b> \<Boolean\></dt>
<dd>Usar el eje z absoluto para puntuar csa<br/></dd>
</dl>
+ <h2>-cutoutdomain</h2>
<dl>
<dt><b>-cutoutdomain</b> \<Boolean\></dt>
<dd>grupo de opciones cutoutdomain<br/></dd>
<dt><b>-start</b> \<Integer\></dt>
<dd>residuo inicial<br/>Default: 1<br/></dd>
<dt><b>-end</b> \<Integer\></dt>
<dd>residuo final<br/>Default: 2<br/></dd>
</dl>
+ <h2>-cyclization</h2>
<dl>
<dt><b>-cyclization</b> \<Boolean\></dt>
<dd>grupo de opciones cyclization<br/></dd>
<dt><b>-chains_to_cyclize</b> \<IntegerVector\></dt>
<dd>El número de la cadena que se cicla<br/></dd>
<dt><b>-num_min_rebuild</b> \<Integer\></dt>
<dd>El número de veces que se itera entre la minimización y la reconstrucción de las posiciones de los átomos que dependen de la conexión<br/>Default: 3<br/></dd>
<dt><b>-add_constraints</b> \<Boolean\></dt>
<dd>Añadir restricciones para mantener la geometría del ciclo<br/>Default: true<br/></dd>
</dl>
+ <h2>-cyclic_peptide</h2>
<dl>
<dt><b>-cyclic_peptide</b> \<Boolean\></dt>
<dd>grupo de opciones cyclic_peptide<br/></dd>
<dt><b>-cyclization_type</b> \<String\></dt>
<dd>El tipo de ciclación del péptido (p. ej., enlace amida N a C, disulfuro terminal, lazo tioéter, lazo isopeptídico N-terminal, etc.<br/>Default: "n_to_c_amide_bond"<br/></dd>
<dt><b>-use_chainbreak_energy</b> \<Boolean\></dt>
<dd>Si es true, la energía de chainbreak se usa para preservar cualquier enlace peptídico N a C (suponiendo que se trata de un péptido cíclico N a C). Si es false, se usan restricciones en su lugar. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-rand_checkpoint_file</b> \<String\></dt>
<dd>El nombre del archivo de punto de control usado para el generador de números aleatorios. Por defecto, rng.state.gz. No se usa si no se usa la opción -cyclic_peptide:checkpoint_job_identifier.<br/>Default: "rng.state.gz"<br/></dd>
<dt><b>-checkpoint_file</b> \<String\></dt>
<dd>El nombre del archivo de punto de control. Por defecto, checkpoint.txt. No se usa si no se usa la opción -cyclic_peptide:checkpoint_job_identifier.<br/>Default: "checkpoint.txt"<br/></dd>
<dt><b>-checkpoint_job_identifier</b> \<String\></dt>
<dd>Un nombre de trabajo único para los puntos de control. Si no se proporciona, los trabajos no tienen puntos de control.<br/>Default: ""<br/></dd>
<dt><b>-exclude_residues_from_rms</b> \<IntegerVector\></dt>
<dd>Una lista de residuos que deben excluirse del cálculo de RMSD. No se usa si no se proporciona.<br/></dd>
<dt><b>-default_rama_sampling_table</b> \<String\></dt>
<dd>Una tabla rama personalizada usada para el muestreo, aplicada por defecto a todos los residuos, salvo que la opción --cyclic_peptide:rama_sampling_table_by_res la anule. Por defecto sin usar (en cuyo caso se usan las tablas rama por defecto de cada tipo de residuo).<br/>Default: ""<br/></dd>
<dt><b>-rama_sampling_table_by_res</b> \<StringVector\></dt>
<dd>Tablas rama personalizadas que se usarán para el muestreo por residuo. Deben especificarse como pares [residue_index table_name]. Por ejemplo: -rama_sampling_table_by_res 2 flat_symm_gly_ramatable 3 flat_symm_pro_ramatable. Los valores especificados anulan -default_rama_sampling_table en las posiciones correspondientes.<br/></dd>
<dt><b>-sequence_file</b> \<String\></dt>
<dd>Nombre de un archivo que especifica la secuencia, como una serie de nombres completos de residuos separados por espacios en blanco (p. ej. ALA LYS DARG DPRO HYP). Entrada obligatoria para la aplicación simple_cycpep_predict.<br/></dd>
<dt><b>-genkic_closure_attempts</b> \<Integer\></dt>
<dd>¿Cuántos intentos de cierre debemos hacer por cada trabajo intentado por la aplicación simple_cycpep_predict? Por defecto, 1,000.<br/>Default: 1000<br/></dd>
<dt><b>-genkic_min_solution_count</b> \<Integer\></dt>
<dd>¿Cuántas soluciones debe encontrar genKIC antes de elegir una cuando se usa en la aplicación simple_cycpep_predict? Por defecto, 1.<br/>Default: 1<br/></dd>
<dt><b>-cyclic_permutations</b> \<Boolean\></dt>
<dd>¿Deben considerarse las permutaciones cíclicas de la secuencia al configurar el cierre cinemático? Por defecto, true.<br/>Default: true<br/></dd>
<dt><b>-use_rama_filter</b> \<Boolean\></dt>
<dd>¿Deben filtrarse las soluciones de GenKIC según la puntuación rama en la aplicación simple_cycpep_predict? True por defecto.<br/>Default: true<br/></dd>
<dt><b>-rama_cutoff</b> \<Real\></dt>
<dd>El valor máximo de puntuación rama permitido en las soluciones aceptadas de GenKIC si se pasa la opción use_rama_filter a la aplicación simple_cycpep_predict. Por defecto, 0.8.<br/>Default: 0.8<br/></dd>
<dt><b>-high_hbond_weight_multiplier</b> \<Real\></dt>
<dd>En las partes del protocolo simple_cycpep_predict que implican aumentar el peso de los términos de enlaces de hidrógeno de la cadena principal, ¿con qué factor debe aumentarse la energía de enlaces de hidrógeno de la cadena principal? Por defecto, 10.0.<br/>Default: 10.0<br/></dd>
<dt><b>-min_genkic_hbonds</b> \<Real\></dt>
<dd>El número mínimo de enlaces de hidrógeno de la cadena principal para que una solución pase durante el cierre GenKIC en la aplicación simple_cycpep_predict. Por defecto, 3.<br/>Default: 3.0<br/></dd>
<dt><b>-min_final_hbonds</b> \<Real\></dt>
<dd>El número mínimo de enlaces de hidrógeno de la cadena principal para que una solución pase después de la relajación final en la aplicación simple_cycpep_predict. Por defecto, 0 (solo informar).<br/>Default: 0.0<br/></dd>
<dt><b>-total_energy_cutoff</b> \<Real\></dt>
<dd>Un umbral absoluto de energía por encima del cual se descartan las soluciones. No se usa si no se especifica.<br/>Default: 0.0<br/></dd>
<dt><b>-hbond_energy_cutoff</b> \<Real\></dt>
<dd>El umbral de energía de enlaces de hidrógeno de la cadena principal para que algo se cuente como enlace de hidrógeno en la aplicación simple_cycpep_predict. Por defecto, -0.25.<br/>Default: -0.25<br/></dd>
<dt><b>-do_not_count_adjacent_res_hbonds</b> \<Boolean\></dt>
<dd>Al contar los enlaces de hidrógeno de un residuo, ¿debemos omitir los enlaces de hidrógeno con los residuos adyacentes? Por defecto, true.<br/>Default: true<br/></dd>
<dt><b>-fast_relax_rounds</b> \<Integer\></dt>
<dd>El número de rondas de FastRelax que se realizan en cada paso de FastRelax del protocolo simple_cycpep_predict. Ten en cuenta que hay dos de esos pasos: un FastRelax inicial con muchos enlaces de hidrógeno aplicado a todas las soluciones de GenKIC, y un FastRelax final con la función de puntuación normal aplicado a la mejor solución de GenKIC. Por defecto, 3.<br/>Default: 3<br/></dd>
<dt><b>-count_sc_hbonds</b> \<Boolean\></dt>
<dd>¿Deben contarse los enlaces de hidrógeno cadena lateral-cadena principal y cadena lateral-cadena lateral en el recuento total de enlaces de hidrógeno del protocolo simple_cycpep_predict? Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-require_disulfides</b> \<Boolean\></dt>
<dd>Si es true, las conformaciones aceptadas deben permitir que se formen puentes disulfuro. Se considerarán todas las permutaciones de puentes disulfuro entre todos los residuos formadores de puentes disulfuro. Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-disulf_cutoff_prerelax</b> \<Real\></dt>
<dd>Si require_disulfides es true, esta es la energía máxima de puente disulfuro por enlace disulfuro permitida antes de la relajación. Si la energía supera este valor, la solución se rechaza. Por defecto, 15.0.<br/>Default: 15.0<br/></dd>
<dt><b>-disulf_cutoff_postrelax</b> \<Real\></dt>
<dd>Si require_disulfides es true, esta es la energía máxima de puente disulfuro por enlace disulfuro permitida después de la relajación. Si la energía supera este valor, la solución se rechaza. Por defecto, 0.5.<br/>Default: 0.5<br/></dd>
<dt><b>-user_set_alpha_dihedrals</b> \<RealVector\></dt>
<dd>Permite al usuario especificar los valores de los diedros en una o más posiciones de alfa-aminoácidos del péptido. La opción debe ir seguida de grupos de cuatro números, donde el primero es la posición en la secuencia y el segundo, tercero y cuarto son los valores de phi, psi y omega, respectivamente. No se usa si no se especifica.<br/></dd>
<dt><b>-user_set_alpha_dihedral_perturbation</b> \<Real\></dt>
<dd>Una pequeña perturbación aleatoria que se añade a todos los valores de diedros fijados con el valor de -user_set_alpha_dihedrals. Cero si no se especifica.<br/>Default: 0.0<br/></dd>
<dt><b>-bondlength_perturbation_magnitude</b> \<Real\></dt>
<dd>Si se usa, esta es la magnitud (en Å) de la perturbación que se aplica a las longitudes de enlace de la cadena principal al cerrar con GenKIC. Puede ser útil para macrociclos pequeños y tensionados. No se aplica perturbación a las longitudes de enlace si no se especifica esta opción.<br/>Default: 0.0<br/></dd>
<dt><b>-bondangle_perturbation_magnitude</b> \<Real\></dt>
<dd>Si se usa, esta es la magnitud (en grados) de la perturbación que se aplica a los ángulos de enlace de la cadena principal al cerrar con GenKIC. Puede ser útil para macrociclos pequeños y tensionados. No se aplica perturbación a los ángulos de enlace si no se especifica esta opción.<br/>Default: 0.0<br/></dd>
<dt><b>-filter_oversaturated_hbond_acceptors</b> \<Boolean\></dt>
<dd>Si es true, se descartan las conformaciones muestreadas con más enlaces de hidrógeno de los permitidos hacia un aceptor. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-hbond_acceptor_energy_cutoff</b> \<Real\></dt>
<dd>La energía de enlace de hidrógeno por encima de la cual no se cuenta un enlace de hidrógeno. Por defecto, -0.1.<br/>Default: -0.1<br/></dd>
<dt><b>-sample_cis_pro_frequency</b> \<Real\></dt>
<dd>La fracción de las veces en que se muestrea omega=0 grados en las posiciones que preceden a L-prolina o D-prolina. Por defecto, 0.3. Ponlo en 0.0 para evitar todo muestreo de cis-pro.<br/>Default: 0.3<br/></dd>
<dt><b>-design_peptide</b> \<Boolean\></dt>
<dd>Si es true, se intenta el diseño para cada conformación muestreada que pasa los filtros. Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-allowed_residues_by_position</b> \<File\></dt>
<dd>Un archivo de texto que lista los residuos de aminoácidos permitidos en cada posición del péptido. Cada línea debe ser una lista, separada por espacios en blanco, de nombres completos de aminoácidos, con el índice de la posición al inicio de la línea. Opcionalmente, se puede dar un ajuste DEFAULT (donde DEFAULT reemplaza al índice de posición), que se aplica a todas las posiciones que no tengan una línea que describa lo que se permite en ellas. Si no hay una línea DEFAULT, las posiciones no especificadas se reempaquetan sin diseño. No se usa si no se especifica (en cuyo caso se permiten todos los D- y L-aminoácidos excepto cisteína, glicina y metionina en todas las posiciones).<br/></dd>
<dt><b>-prohibit_D_at_negative_phi</b> \<Boolean\></dt>
<dd>Si se permite el diseño, ¿deben prohibirse los residuos D-aminoácidos en las posiciones con valores de phi negativos? Por defecto, true.<br/>Default: true<br/></dd>
<dt><b>-prohibit_L_at_positive_phi</b> \<Boolean\></dt>
<dd>Si se permite el diseño, ¿deben prohibirse los residuos L-aminoácidos en las posiciones con valores de phi positivos? Por defecto, true.<br/>Default: true<br/></dd>
<dt><b>-L_alpha_comp_file</b> \<File\></dt>
<dd>Si se permite el diseño, este es el archivo aa_composition (opcional) que se usa para la región alfa-helicoidal dextrógira (L-aminoácidos) del espacio de Ramachandran. No se usa si no se especifica.<br/></dd>
<dt><b>-D_alpha_comp_file</b> \<File\></dt>
<dd>Si se permite el diseño, este es el archivo aa_composition (opcional) que se usa para la región alfa-helicoidal levógira (D-aminoácidos) del espacio de Ramachandran. No se usa si no se especifica.<br/></dd>
<dt><b>-L_beta_comp_file</b> \<File\></dt>
<dd>Si se permite el diseño, este es el archivo aa_composition (opcional) que se usa para la región de hebra beta de phi negativo (L-aminoácidos) del espacio de Ramachandran. No se usa si no se especifica.<br/></dd>
<dt><b>-D_beta_comp_file</b> \<File\></dt>
<dd>Si se permite el diseño, este es el archivo aa_composition (opcional) que se usa para la región de hebra beta de phi positivo (D-aminoácidos) del espacio de Ramachandran. No se usa si no se especifica.<br/></dd>
<dt><b>-angle_relax_rounds</b> \<Integer\></dt>
<dd>El número de rondas de FastRelax con ángulos de enlace flexibles que se realizan después de cada paso estándar de FastRelax en el protocolo simple_cycpep_predict. Por defecto, 0 (sin usar).<br/>Default: 0<br/></dd>
<dt><b>-angle_length_relax_rounds</b> \<Integer\></dt>
<dd>El número de rondas de FastRelax con ángulos y longitudes de enlace flexibles que se realizan después de cada paso estándar de FastRelax en el protocolo simple_cycpep_predict. Por defecto, 0 (sin usar).<br/>Default: 0<br/></dd>
<dt><b>-cartesian_relax_rounds</b> \<Integer\></dt>
<dd>El número de rondas de FastRelax cartesiano que se realizan después de cada paso estándar de FastRelax en el protocolo simple_cycpep_predict. Por defecto, 0 (sin usar).<br/>Default: 0<br/></dd>
<dt><b>-use_classic_rama_for_sampling</b> \<Boolean\></dt>
<dd>Si es true, se usan las tablas de Ramachandran clásicas para el muestreo en lugar de las tablas RamaPrePro. Por defecto, false (es decir, por defecto se usan las tablas RamaPrePro, más nuevas).<br/>Default: false<br/></dd>
<dt><b>-n_methyl_positions</b> \<IntegerVector\></dt>
<dd>Si se indica, estas posiciones se N-metilan. No se usa si no se especifica.<br/></dd>
<dt><b>-lariat_sidechain_index</b> \<Integer\></dt>
<dd>Si se especifica un tipo de ciclación en lazo (p. ej., nterm_isopeptide_lariat, cterm_isopeptide_lariat), este es el residuo que aporta la cadena lateral que se conecta al extremo N o C del péptido. Si no se especifica, se usa el residuo de tipo apropiado más cercano al otro extremo.<br/>Default: 0<br/></dd>
<dt><b>-sidechain_isopeptide_indices</b> \<IntegerVector\></dt>
<dd>Si se especifica el tipo de ciclación sidechain_isopeptide, estos son los índices de los residuos que se unen mediante un enlace isopeptídico cadena lateral-cadena lateral para formar el loop. Si no se especifican, se usan los residuos de tipos apropiados que estén más alejados. Ten en cuenta que deben indicarse exactamente dos índices.<br/></dd>
<dt><b>-lanthionine_positions</b> \<IntegerVector\></dt>
<dd>Si se indica, estas posiciones se unirán mediante un entrecruzador de lantionina. Deben especificarse 2 posiciones, y ese grupo de dos se unirá. No se usa si no se especifica.<br/></dd>
<dt><b>-lariat_sample_cis</b> \<Boolean\></dt>
<dd>Si es true (por defecto), los thioether_lariats muestrearán enlaces peptídicos cis en el extremo N; trans si es false.<br/>Default: true<br/></dd>
<dt><b>-paraBBMB_positions</b> \<IntegerVector\></dt>
<dd>Si se indica, estas posiciones se unirán mediante un entrecruzador de 1,4-bis(bromometil)benceno, o para-BBMB. Deben especificarse 2N posiciones, y cada grupo de dos se unirá. No se usa si no se especifica.<br/></dd>
<dt><b>-use_paraBBMB_filters</b> \<Boolean\></dt>
<dd>Si es true, se aplican filtros basados en la distancia entre las cisteínas de BBMB y en restricciones para descartar las soluciones de GenKIC que no pueden entrecruzarse con facilidad. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-paraBBMB_sidechain_distance_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador del corte de distancia para las cisteínas de BBMB. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-paraBBMB_constraints_energy_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la energía de restricciones para las cisteínas de BBMB. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-link_all_cys_with_paraBBMB</b> \<Boolean\></dt>
<dd>Si es true, todos los residuos de cisteína del péptido se unen con 1,4-bis(bromometil)benceno. Debe haber exactamente dos residuos de cisteína para usar esta opción, y no se puede usar con la opción -paraBBMB_positions, la opción -TBMB_positions ni la opción -link_all_cys_with_TBMB. False/sin usar por defecto.<br/>Default: false<br/></dd>
<dt><b>-TBMB_positions</b> \<IntegerVector\></dt>
<dd>Si se indica, estas posiciones se unirán mediante un entrecruzador de 1,3,5-tris(bromometil)benceno, o TBMB. Deben especificarse 3N posiciones, y cada grupo de tres se unirá. No se usa si no se especifica.<br/></dd>
<dt><b>-use_TBMB_filters</b> \<Boolean\></dt>
<dd>Si es true, se aplican filtros basados en la distancia entre las cisteínas de TBMB y en restricciones para descartar las soluciones de GenKIC que no pueden entrecruzarse con facilidad. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-TBMB_sidechain_distance_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador del corte de distancia para las cisteínas de TBMB. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-TBMB_constraints_energy_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la energía de restricciones para las cisteínas de TBMB. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-link_all_cys_with_TBMB</b> \<Boolean\></dt>
<dd>Si es true, todos los residuos de cisteína del péptido se unen con 1,3,5-tris(bromometil)benceno. Debe haber exactamente tres residuos de cisteína para usar esta opción, y no se puede usar con la opción -paraBBMB_positions, la opción -TBMB_positions ni la opción -link_all_cys_with_paraBBMB. False/sin usar por defecto.<br/>Default: false<br/></dd>
<dt><b>-TMA_positions</b> \<IntegerVector\></dt>
<dd>Si se indica, estas posiciones se unirán mediante un entrecruzador de ácido trimésico. Las posiciones deben tener cadenas laterales con aminas primarias (es decir, ser lisina [LYS], ornitina [ORN], ácido 2,4-diaminobutírico [DAB] o ácido 2,3-diaminopropiónico [DPP]). Deben especificarse 3N posiciones, y cada grupo de tres se unirá. No se usa si no se especifica.<br/></dd>
<dt><b>-use_TMA_filters</b> \<Boolean\></dt>
<dd>Si es true, se aplican filtros basados en la distancia entre las cadenas laterales conjugadas con TMA y en restricciones para descartar las soluciones de GenKIC que no pueden entrecruzarse con facilidad. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-TMA_sidechain_distance_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador del corte de distancia para las cadenas laterales unidas por ácido trimésico (TMA). Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-TMA_constraints_energy_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la energía de restricciones para las cadenas laterales unidas por ácido trimésico (TMA). Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-square_pyramidal_metal_positions</b> \<StringVector\></dt>
<dd>Si se indica, estas posiciones coordinarán un metal con coordinación piramidal cuadrada. Las posiciones deben tener cadenas laterales que puedan coordinar un metal (p. ej., histidina, aspartato, glutamato). Las posiciones deben especificarse con la forma res1,res2,res3,res4,res5,metal. Por ejemplo, si las posiciones 4, 6, 9, 13 y 16 coordinaran un níquel, la cadena sería 4,6,9,13,16,Ni2. Se pueden especificar varios conjuntos de cadenas laterales que coordinan metales, separados por un espacio. El metal se representará con átomos virtuales y no se modelará explícitamente. No se usa si no se especifica.<br/></dd>
<dt><b>-use_square_pyramidal_metal_filters</b> \<Boolean\></dt>
<dd>Si es true, se aplican filtros basados en la distancia entre las cadenas laterales conjugadas con el metal y en restricciones para descartar las soluciones de GenKIC que no pueden entrecruzarse con un metal con facilidad. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-square_pyramidal_metal_sidechain_distance_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador del corte de distancia para las cadenas laterales unidas por un metal coordinado con coordinación piramidal cuadrada. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-square_pyramidal_metal_constraints_energy_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la energía de restricciones para las cadenas laterales unidas por un metal coordinado con coordinación piramidal cuadrada. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-square_planar_metal_positions</b> \<StringVector\></dt>
<dd>Si se indica, estas posiciones coordinarán un metal con coordinación plana cuadrada. Las posiciones deben tener cadenas laterales que puedan coordinar un metal (p. ej., histidina, aspartato, glutamato). Las posiciones deben especificarse con la forma res1,res2,res3,res4,metal. Por ejemplo, si las posiciones 6, 9, 13 y 17 coordinaran un níquel, la cadena sería 6,9,13,17,Ni2. Se pueden especificar varios conjuntos de cadenas laterales que coordinan metales, separados por un espacio. El metal se representará con átomos virtuales y no se modelará explícitamente. No se usa si no se especifica.<br/></dd>
<dt><b>-use_square_planar_metal_filters</b> \<Boolean\></dt>
<dd>Si es true, se aplican filtros basados en la distancia entre las cadenas laterales conjugadas con el metal y en restricciones para descartar las soluciones de GenKIC que no pueden entrecruzarse con un metal con facilidad. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-square_planar_metal_sidechain_distance_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador del corte de distancia para las cadenas laterales unidas por un metal coordinado con coordinación plana cuadrada. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-square_planar_metal_constraints_energy_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la energía de restricciones para las cadenas laterales unidas por un metal coordinado con coordinación plana cuadrada. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-trigonal_pyramidal_metal_positions</b> \<StringVector\></dt>
<dd>Si se indica, estas posiciones coordinarán un metal con coordinación piramidal trigonal. Las posiciones deben tener cadenas laterales que puedan coordinar un metal (p. ej., histidina, aspartato, glutamato). Las posiciones deben especificarse con la forma res1,res2,res3,metal. Por ejemplo, si las posiciones 6, 9 y 13 coordinaran un zinc, la cadena sería 6,9,13,Zn. Se pueden especificar varios conjuntos de cadenas laterales que coordinan metales, separados por un espacio. El metal se representará con átomos virtuales y no se modelará explícitamente. No se usa si no se especifica.<br/></dd>
<dt><b>-use_trigonal_pyramidal_metal_filters</b> \<Boolean\></dt>
<dd>Si es true, se aplican filtros basados en la distancia entre las cadenas laterales conjugadas con el metal y en restricciones para descartar las soluciones de GenKIC que no pueden entrecruzarse con un metal con facilidad. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-trigonal_pyramidal_metal_sidechain_distance_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador del corte de distancia para las cadenas laterales unidas por un metal coordinado con coordinación piramidal trigonal. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-trigonal_pyramidal_metal_constraints_energy_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la energía de restricciones para las cadenas laterales unidas por un metal coordinado con coordinación piramidal trigonal. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-trigonal_planar_metal_positions</b> \<StringVector\></dt>
<dd>Si se indica, estas posiciones coordinarán un metal con coordinación plana trigonal. Las posiciones deben tener cadenas laterales que puedan coordinar un metal (p. ej., histidina, aspartato, glutamato). Las posiciones deben especificarse con la forma res1,res2,res3,metal. Por ejemplo, si las posiciones 6, 9 y 13 coordinaran un zinc, la cadena sería 6,9,13,Zn. Se pueden especificar varios conjuntos de cadenas laterales que coordinan metales, separados por un espacio. El metal se representará con átomos virtuales y no se modelará explícitamente. No se usa si no se especifica.<br/></dd>
<dt><b>-use_trigonal_planar_metal_filters</b> \<Boolean\></dt>
<dd>Si es true, se aplican filtros basados en la distancia entre las cadenas laterales conjugadas con el metal y en restricciones para descartar las soluciones de GenKIC que no pueden entrecruzarse con un metal con facilidad. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-trigonal_planar_metal_sidechain_distance_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador del corte de distancia para las cadenas laterales unidas por un metal coordinado con coordinación plana trigonal. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-trigonal_planar_metal_constraints_energy_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la energía de restricciones para las cadenas laterales unidas por un metal coordinado con coordinación plana trigonal. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-tetrahedral_metal_positions</b> \<StringVector\></dt>
<dd>Si se indica, estas posiciones coordinarán un metal de forma tetraédrica. Las posiciones deben tener cadenas laterales que puedan coordinar un metal (p. ej., histidina, aspartato, glutamato). Las posiciones deben especificarse con la forma res1,res2,res3,res4,metal. Por ejemplo, si las posiciones 4, 6, 9 y 13 coordinaran un zinc, la cadena sería 4,6,9,13,Zn. Se pueden especificar varios conjuntos de cadenas laterales que coordinan metales, separados por un espacio. El metal se representará con átomos virtuales y no se modelará explícitamente. No se usa si no se especifica.<br/></dd>
<dt><b>-use_tetrahedral_metal_filters</b> \<Boolean\></dt>
<dd>Si es true, se aplican filtros basados en la distancia entre las cadenas laterales conjugadas con el metal y en restricciones para descartar las soluciones de GenKIC que no pueden entrecruzarse con un metal con facilidad. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-tetrahedral_metal_sidechain_distance_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador del corte de distancia para las cadenas laterales unidas por un metal con coordinación tetraédrica. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-tetrahedral_metal_constraints_energy_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la energía de restricciones para las cadenas laterales unidas por un metal con coordinación tetraédrica. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-octahedral_metal_positions</b> \<StringVector\></dt>
<dd>Si se indica, estas posiciones coordinarán un metal de forma octaédrica. Las posiciones deben tener cadenas laterales que puedan coordinar un metal (p. ej., histidina, aspartato, glutamato). Las posiciones deben especificarse con la forma res1,res2,res3,res4,res5,res6,metal. Por ejemplo, si las posiciones 4, 6, 9, 13, 16 y 18 coordinaran un hierro(II), la cadena sería 4,6,9,13,Fe2. Se pueden especificar varios conjuntos de cadenas laterales que coordinan metales, separados por un espacio. El metal se representará con átomos virtuales y no se modelará explícitamente. No se usa si no se especifica.<br/></dd>
<dt><b>-use_octahedral_metal_filters</b> \<Boolean\></dt>
<dd>Si es true, se aplican filtros basados en la distancia entre las cadenas laterales conjugadas con el metal y en restricciones para descartar las soluciones de GenKIC que no pueden entrecruzarse con un metal con facilidad. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-octahedral_metal_sidechain_distance_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador del corte de distancia para las cadenas laterales unidas por un metal con coordinación octaédrica. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-octahedral_metal_constraints_energy_filter_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la energía de restricciones para las cadenas laterales unidas por un metal con coordinación octaédrica. Los valores más altos dan un filtrado más permisivo. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-require_symmetry_repeats</b> \<Integer\></dt>
<dd>Si se usa esta opción, solo se aceptarán las cadenas principales con simetría cN (o cN/m, si se requiere simetría especular). Por ejemplo, si se fija en 2, solo se aceptarán cadenas principales con simetría c2. No se usa si no se especifica.<br/>Default: 1<br/></dd>
<dt><b>-require_symmetry_mirroring</b> \<Boolean\></dt>
<dd>Si se usa esta opción, solo se aceptan las cadenas principales con simetría especular. Debe usarse con la opción -cyclic_peptide:require_symmetry_repeats.<br/>Default: false<br/></dd>
<dt><b>-require_symmetry_angle_threshold</b> \<Real\></dt>
<dd>El corte, en grados, que se usa al comparar los valores de torsión de la cadena principal para determinar si las repeticiones de simetría son verdaderamente simétricas. Por defecto, 10 grados.<br/>Default: 10.0<br/></dd>
<dt><b>-require_symmetry_perturbation</b> \<Real\></dt>
<dd>Si se indica, esta es la magnitud de la perturbación que se aplica al copiar los diedros de la cadena principal para el muestreo simétrico. Permite muestrear conformaciones ligeramente asimétricas. El valor por defecto es 0.0 (sin perturbación).<br/>Default: 0.0<br/></dd>
<dt><b>-MPI_auto_2level_distribution</b> \<Boolean\></dt>
<dd>Si es true, configura automáticamente la distribución de trabajos con un director que se comunica con N-1 trabajadores, donde N es el número total de procesos. No se puede usar con -MPI_processes_by_level. Por defecto, false.<br/>Default: false<br/></dd>
<dt><b>-MPI_processes_by_level</b> \<IntegerVector\></dt>
<dd>El número de procesos en cada nivel de la jerarquía de comunicaciones en paralelo, usado solo por la versión MPI. Por ejemplo, '1 10 100' significaría que un director se comunica con 10 gestores, que se comunican con 100 trabajadores (lo que implica que a cada gestor se le asignan 10 trabajadores). De forma similar, '1 100' significaría que un gestor se comunica directamente con 100 trabajadores. Obligatorio para la versión MPI.<br/></dd>
<dt><b>-MPI_batchsize_by_level</b> \<IntegerVector\></dt>
<dd>El número de trabajos que cada nivel de comunicación envía a la vez a sus hijos. Dados N niveles, deben especificarse N-1 valores. Por ejemplo, dados 3 niveles de comunicación, '100 10' significaría que el director envía 100 trabajos a la vez a cada gestor, que envía 10 trabajos a la vez a cada trabajador. Debe especificarse para las aplicaciones helical_bundle_predict y simple_cycpep_predict en modo MPI.<br/></dd>
<dt><b>-MPI_sort_by</b> \<String\></dt>
<dd>Las versiones MPI de las aplicaciones helical_bundle_predict y simple_cycpep_predict tienen la opción de escribir el N% superior de las soluciones. Esto determina la métrica de ordenación.<br/>Default: "energy"<br/></dd>
<dt><b>-MPI_choose_highest</b> \<Boolean\></dt>
<dd>Al escribir el N% superior de las soluciones, ¿debo elegir las de mayor puntuación en la métrica elegida (energía, rmsd, enlaces de hidrógeno, etc.) o las de menor? Por defecto, false (elegir las menores).<br/>Default: false<br/></dd>
<dt><b>-MPI_output_fraction</b> \<Real\></dt>
<dd>La fracción del total de estructuras que se escribirá. Se usa junto con 'MPI_sort_by' para escribir el N% superior de las salidas de trabajos. Por ejemplo, '-MPI_output_fraction 0.05 -MPI_sort_by rmsd' significa que se escribirá el 5% de las estructuras con los valores de RMSD más bajos.<br/>Default: 1.0<br/></dd>
<dt><b>-MPI_stop_after_time</b> \<Integer\></dt>
<dd>Si se usa esta opción, el nodo director enviará una señal de detención tras un periodo de tiempo transcurrido, dado en segundos. Los trabajos de los trabajadores que estén en ejecución continuarán, pero los gestores intermedios no asignarán más trabajo. Útil en clústeres HPC con límites de tiempo, para asegurar que los trabajos completados se recopilen al final. No se usa si no se especifica.<br/></dd>
<dt><b>-MPI_pnear_lambda</b> \<Real\></dt>
<dd>En modo MPI, al final se calcula automáticamente una métrica de calidad del embudo (PNear). Este valor puede pensarse como la probabilidad, de 0 a 1, de que el péptido esté en la conformación nativa en un momento dado. El parámetro lambda controla la anchura de la gaussiana (en unidades de RMSD, Å) que se usa para determinar en qué medida un estado se parece al nativo. Por defecto, 0.5 Å.<br/>Default: 0.5<br/></dd>
<dt><b>-MPI_pnear_kbt</b> \<Real\></dt>
<dd>En modo MPI, al final se calcula automáticamente una métrica de calidad del embudo (PNear). Este valor puede pensarse como la probabilidad, de 0 a 1, de que el péptido esté en la conformación nativa en un momento dado. El parámetro kbt es la temperatura de Boltzmann que determina en qué medida es probable que se muestreen estados de mayor energía. Por defecto, 1.0 kcal/mol.<br/>Default: 1.0<br/></dd>
<dt><b>-threads_per_worker</b> \<Integer\></dt>
<dd>En la compilación MPI multihilo, este es el número de hilos que se lanzan por proceso trabajador. (Antes se llamaba threads_per_slave.) Ten en cuenta que los procesos de director y de la capa de gestores no lanzan hilos. Un valor de 1 (el predeterminado) significa que solo se usará el paralelismo jerárquico estándar basado en procesos. En compilaciones sin MPI o sin hilos, esta opción no se usa.<br/>Default: 1<br/></dd>
<dt><b>-compute_rmsd_to_lowest</b> \<Boolean\></dt>
<dd>Si es true, se calcula el RMSD respecto a la estructura superior (según el criterio de ordenación que sea), además del RMSD respecto a un nativo suministrado por el usuario (si se proporciona una estructura nativa). False por defecto. Solo se usa en la versión MPI de Rosetta.<br/>Default: false<br/></dd>
<dt><b>-compute_pnear_to_this_fract</b> \<Real\></dt>
<dd>Si se proporciona esta opción, se calculará PNear respecto a cada una de las muestras de menor energía encontradas, para la fracción de menor energía especificada. (Por ejemplo, poner 0.02 calcularía PNear respecto a cada una del 2% de muestras de menor energía). No se usa por defecto.<br/>Default: 0.0<br/></dd>
<dt><b>-compute_ensemble_sasa_metrics</b> \<Boolean\></dt>
<dd>Si es true, se calculan la SASA ponderada por Boltzmann, la SASA polar, la SASA hidrofóbica y el número de grupos polares no satisfechos (promedio del conjunto). False por defecto. Solo se usa en la versión MPI de Rosetta.<br/>Default: false<br/></dd>
</dl>
+ <h2>-dc</h2>
<dl>
<dt><b>-dc</b> \<Boolean\></dt>
<dd>grupo de opciones dc<br/></dd>
<dt><b>-useZ</b> \<Boolean\></dt>
<dd>Usar el eje z absoluto para puntuar dc<br/></dd>
</dl>
+ <h2>-ddg</h2>
<dl>
<dt><b>-ddg</b> \<Boolean\></dt>
<dd>grupo de opciones ddg<br/></dd>
<dt><b>-opt_input_structure</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-pack_until_converge</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-no_constraints</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-use_rotamer_constraints_to_native</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-suppress_checkpointing</b> \<Boolean\></dt>
<dd>opciones específicas de boinc para suprimir el comportamiento de puntos de control<br/>Default: false<br/></dd>
<dt><b>-wt_only</b> \<Boolean\></dt>
<dd>opción añadida a la aplicación minirosetta para producir solo refinamiento en estructuras de tipo silvestre<br/>Default: false<br/></dd>
<dt><b>-mut_only</b> \<Boolean\></dt>
<dd>opciones añadidas a la aplicación minirosetta para producir refinamiento solo en la estructura mutante<br/></dd>
<dt><b>-optimize_wt</b> \<Boolean\></dt>
<dd>Optimizará la estructura nativa al usar la versión refactorizada del código. Esto servirá como la nueva puntuación de referencia.<br/>Default: true<br/></dd>
<dt><b>-output_silent</b> \<Boolean\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-minimization_scorefunction</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-minimization_patch</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-min_cst</b> \<Boolean\></dt>
<dd>Después de la optimización de cadenas laterales en el packer, ¿debemos proceder a minimizar la cadena principal? Se usarán restricciones para evitar que la estructura se mueva demasiado.<br/>Default: true<br/></dd>
<dt><b>-lowest_x_decoys</b> \<Integer\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-local_opt_only</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-print_per_res_diff</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-mean</b> \<Boolean\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-min</b> \<Boolean\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-no_bb_movement</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-initial_repack</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-interface_ddg</b> \<Integer\></dt>
<dd>¿Calcular ddG a través de una interfaz? Usa el número de salto indicado para determinar la interfaz.<br/>Default: 0<br/></dd>
<dt><b>-ens_variation</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.5<br/></dd>
<dt><b>-sc_min_only</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-rna_all_prot_sc_min_only</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-min_cst_weights</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "talaris2013"<br/></dd>
<dt><b>-opt_radius</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 8.0<br/></dd>
<dt><b>-output_dir</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "./"<br/></dd>
<dt><b>-last_accepted_pose_dir</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "./"<br/></dd>
<dt><b>-min_with_cst</b> \<Boolean\></dt>
<dd>Se usa en la generación de conjuntos<br/>Default: false<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>porque realmente no sé a qué debería fijarse la temperatura de Monte Carlo<br/>Default: 10<br/></dd>
<dt><b>-ramp_repulsive</b> \<Boolean\></dt>
<dd>fijar fa_rep en 0.1, 0.33 del valor original, al minimizar en la fase de minimización posterior al empaquetado<br/>Default: false<br/></dd>
<dt><b>-mut_file</b> \<String\></dt>
<dd>especificación alternativa para las mutaciones. El formato del archivo se describe en fix_bb_monomer_ddg.cc, encima de la función read_in_mutations<br/></dd>
<dt><b>-out_pdb_prefix</b> \<String\></dt>
<dd>especifica el prefijo asignado a la salida para que no se sobrescriba nada<br/></dd>
<dt><b>-constraint_weight</b> \<Real\></dt>
<dd>porque esa otra opción no está funcionando<br/>Default: 1.0<br/></dd>
<dt><b>-harmonic_ca_tether</b> \<Real\></dt>
<dd>anclaje de CA por defecto para las restricciones armónicas<br/>Default: 2.0<br/></dd>
<dt><b>-iterations</b> \<Integer\></dt>
<dd>especifica el número de iteraciones de refinamiento<br/>Default: 3<br/></dd>
<dt><b>-force_iterations</b> \<Boolean\></dt>
<dd>Obliga al protocolo ddg a iterar hasta el valor fijado por iterations en lugar de detenerse al converger.<br/>Default: true<br/></dd>
<dt><b>-out</b> \<String\></dt>
<dd>crear un archivo de salida con los ddG predichos<br/>Default: "ddg_predictions.out"<br/></dd>
<dt><b>-debug_output</b> \<Boolean\></dt>
<dd>especifica si se escriben o no un montón de mensajes de depuración en la salida estándar<br/>Default: false<br/></dd>
<dt><b>-dump_pdbs</b> \<Boolean\></dt>
<dd>especifica si se vuelcan o no los pdb reempaquetados de tipo silvestre y mutante<br/>Default: true<br/></dd>
<dt><b>-weight_file</b> \<String\></dt>
<dd>especifica los archivos de pesos que se usarán en los cálculos<br/>Default: "ddg.wts"<br/></dd>
<dt><b>-cst_dist_cutoff</b> \<Real\></dt>
<dd>la distancia de corte para generar restricciones armónicas entre residuos<br/>Default: 9.0<br/></dd>
<dt><b>-cartesian</b> \<Boolean\></dt>
<dd>Activar o desactivar el modo cartesiano en los cálculos de la aplicación CartesianddG<br/>Default: true<br/></dd>
<dt><b>-extract_element_nbrs</b> \<Integer\></dt>
<dd>Cuántos vecinos del espacio de secuencias se extraen al hacer cálculos de unión<br/>Default: 0<br/></dd>
<dt><b>-frag_nbrs</b> \<Integer\></dt>
<dd>Cuántos vecinos (de secuencia) deben incluir los fragmentos. Es decir, 2 vecinos = fragmentos de tamaño 5 con el objetivo en el medio<br/>Default: 2<br/></dd>
<dt><b>-bbnbrs</b> \<Integer\></dt>
<dd>Cuántos vecinos (de secuencia) deben incluirse en la minimización de la cadena principal<br/>Default: 1<br/></dd>
<dt><b>-nfrags</b> \<Integer\></dt>
<dd>Cuántos fragmentos se eligen y luego se usan en el muestreador cartesiano<br/>Default: 30<br/></dd>
<dt><b>-ntrials</b> \<Integer\></dt>
<dd>Cuántos ciclos de asignación de fragmentos se ejecutan en el muestreador cartesiano<br/>Default: 30<br/></dd>
<dt><b>-optimize_proline</b> \<Boolean\></dt>
<dd>Activa el uso de fragmentos y del muestreador cartesiano para optimizar alrededor de los residuos de prolina.<br/>Default: false<br/></dd>
<dt><b>-flex_bb</b> \<Boolean\></dt>
<dd>Si se permite que los residuos vecinos muevan la cadena principal.<br/>Default: false<br/></dd>
<dt><b>-fd_mode</b> \<Boolean\></dt>
<dd>Modo que preserva el de Frank, para probar la búsqueda direccional de vecinos.<br/>Default: false<br/></dd>
<dt><b>-legacy</b> \<Boolean\></dt>
<dd>Llamar a la versión heredada de la aplicación cartesian_ddg.<br/>Default: true<br/></dd>
<dt><b>-json</b> \<Boolean\></dt>
<dd>Leer y escribir los resultados en json.<br/>Default: false<br/></dd>
<dt><b>-n_converged</b> \<Integer\></dt>
<dd>Cuántos modelos deben estar dentro del rango para considerar que la solución ha convergido.<br/>Default: 2<br/></dd>
<dt><b>-score_cutoff</b> \<Real\></dt>
<dd>Cuál es el corte de puntuación para considerar que ha convergido.<br/>Default: 1.0<br/></dd>
</dl>
+ <h2>-DenovoProteinDesign</h2>
<dl>
<dt><b>-DenovoProteinDesign</b> \<Boolean\></dt>
<dd>grupo de opciones DenovoProteinDesign<br/></dd>
<dt><b>-redesign_core</b> \<Boolean\></dt>
<dd>rediseñar el núcleo del pdb<br/>Default: false<br/></dd>
<dt><b>-redesign_loops</b> \<Boolean\></dt>
<dd>rediseñar los loops del pdb<br/>Default: false<br/></dd>
<dt><b>-redesign_surface</b> \<Boolean\></dt>
<dd>rediseñar la superficie del pdb<br/>Default: false<br/></dd>
<dt><b>-redesign_complete</b> \<Boolean\></dt>
<dd>rediseño completo del pdb<br/>Default: false<br/></dd>
<dt><b>-optimize_loops</b> \<Boolean\></dt>
<dd>hacer un modelado de loops serio al final del mover designrelax<br/></dd>
<dt><b>-secondary_structure_file</b> \<File\></dt>
<dd>tiene formato de archivo fasta: describe la estructura secundaria del objetivo deseado con H/C/E<br/></dd>
<dt><b>-hydrophobic_polar_pattern</b> \<File\></dt>
<dd>tiene formato de archivo fasta: describe el patrón hidrofóbico (B) polar (P)<br/></dd>
<dt><b>-use_template_sequence</b> \<Boolean\></dt>
<dd>usar la secuencia del pdb de plantilla al crear las estructuras iniciales<br/>Default: false<br/></dd>
<dt><b>-use_template_topology</b> \<Boolean\></dt>
<dd>usar phi/psi de la plantilla en los loops y en el inicio/fin de hélices/láminas; generar solo estructuras iniciales parecidas a la plantilla<br/>Default: false<br/></dd>
<dt><b>-create_from_template_pdb</b> \<File\></dt>
<dd>crear la estructura inicial a partir de un pdb de plantilla; va seguido del nombre del pdb<br/></dd>
<dt><b>-create_from_secondary_structure</b> \<Boolean\></dt>
<dd>crear la estructura inicial a partir de un archivo que contiene H/C/E para describir la topología o un patrón B/P; tiene formato de archivo fasta<br/>Default: false<br/></dd>
</dl>
+ <h2>-dna</h2>
<dl>
<dt><b>-dna</b> \<Boolean\></dt>
<dd>grupo de opciones dna<br/></dd>
</dl>
+ <h3>-dna:specificity</h3>
<dl>
<dt><b>-specificity</b> \<Boolean\></dt>
<dd>grupo de opciones specificity<br/></dd>
<dt><b>-exclude_dna_dna</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-params</b> \<RealVector\></dt>
<dd>vector de parámetros de valor real<br/></dd>
<dt><b>-frag_files</b> \<FileVector\></dt>
<dd>archivos de los que se recopilan fragmentos<br/></dd>
<dt><b>-only_repack</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-design_DNA</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-soft_rep</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-dump_pdbs</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-fast</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-randomize_motif</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-Wfa_elec</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-Wdna_bs</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-Wdna_bp</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-minimize_tolerance</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.001<br/></dd>
<dt><b>-weights_tag</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-weights_tag_list</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-min_type</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "lbfgs_armijo_nonmonotone"<br/></dd>
<dt><b>-mode</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-score_function</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-pre_minimize</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-post_minimize</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-pre_pack</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-nloop</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 20<br/></dd>
<dt><b>-n_inner</b> \<Integer\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-n_outer</b> \<Integer\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-nstep_water</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-moving_jump</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-motif_begin</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-motif_size</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-pdb_pos</b> \<StringVector\></dt>
<dd>lista de una o más posiciones del pdb de entrada, p. ej.: -pdb_pos 125:A 127:A 4:C<br/>Default: ""<br/></dd>
<dt><b>-methylate</b> \<StringVector\></dt>
<dd>lista de una o más posiciones del pdb de entrada que se van a metilar, p. ej.: -methylate 125:A 127:A 4:C<br/>Default: ""<br/></dd>
<dt><b>-dna_backbone_torsion_sdevs</b> \<RealVector\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-dna_sugar_torsion_sdev</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 4.0<br/></dd>
<dt><b>-dna_chi_torsion_sdev</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 15.0<br/></dd>
<dt><b>-lk_ball_wtd_tag</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-lk_ball_for_bb</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-lk_ball_ramp_width_A2</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 3.9<br/></dd>
<dt><b>-lk_ball_overlap_gap</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.0<br/></dd>
<dt><b>-lk_ball_overlap_width_A2</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 5.0<br/></dd>
<dt><b>-lk_ball_water_fade</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1.0<br/></dd>
<dt><b>-lk_ball_wtd_prefactors</b> \<RealVector\></dt>
<dd>6 factores de escala que se aplican a los pesos por átomo de lk_ball_wtd; el orden es <donor-iso> <donor-ball> <acceptor-iso> <acceptor-ball> <don+acc-iso> <don+acc-ball>; donde <don+acc> significa los tipos de átomo que son a la vez donadores y aceptores (OH con hibridación SP3, por ejemplo)<br/></dd>
<dt><b>-lk_ball_waters_sp2</b> \<RealVector\></dt>
<dd>La geometría de las aguas aceptoras sp2 en lk_ball. Formato: ( <length_A> <angle_degrees> <torsion_degrees> )+  Por defecto: 2.65 120 0  2.65 120 180. Sin límite de cantidad, pero deben especificarse los tres parámetros de cada una<br/></dd>
<dt><b>-lk_ball_waters_sp3</b> \<RealVector\></dt>
<dd>La geometría de las aguas aceptoras sp3 en lk_ball. Formato: ( <length_A> <angle_degrees> <torsion_degrees> )+  Por defecto: 2.65 109 120  2.65 109 240. Sin límite de cantidad, pero deben especificarse los tres parámetros de cada una<br/></dd>
<dt><b>-lk_ball_waters_ring</b> \<RealVector\></dt>
<dd>La geometría de las aguas aceptoras de anillo en lk_ball. Formato: ( <length_A> <angle_degrees> <torsion_degrees> )+  Por defecto: 2.65 180 0. Sin límite de cantidad, pero deben especificarse los tres parámetros de cada una<br/></dd>
<dt><b>-lk_ball_waters_donor</b> \<Real\></dt>
<dd>La geometría de las aguas donadoras en lk_ball. Longitud a lo largo del vector N-H<br/></dd>
<dt><b>-lk_ball_bridge_angle_widthscale</b> \<Real\></dt>
<dd>El escalado del ancho del componente angular de lk_ball_bridge (más bajo = más estrecho)<br/>Default: 0.0<br/></dd>
<dt><b>-lk_dome_max_angle</b> \<Real\></dt>
<dd>El ángulo máximo para lk_dome. 180 es lo más alto que puede llegar.<br/>Default: 180<br/></dd>
<dt><b>-lk_dome_min_angle</b> \<Real\></dt>
<dd>El ángulo mínimo para lk_dome. 0 es lo más alto que puede llegar.<br/>Default: 104.40720<br/></dd>
<dt><b>-lk_dome_occlusion_min</b> \<Real\></dt>
<dd>Cuál es el valor mínimo de oclusión por debajo del cual lk_dome está a plena potencia.<br/>Default: 3.21592<br/></dd>
<dt><b>-lk_dome_occlusion_max</b> \<Real\></dt>
<dd>Qué tan ocluida debe estar el agua de lk_ball antes de que lk_dome se apague.<br/>Default: 5.09299<br/></dd>
<dt><b>-lk_dome_h2o_radius</b> \<Real\></dt>
<dd>Radio de las aguas de lk_dome.<br/>Default: 1.4<br/></dd>
<dt><b>-lk_dome_ramp_width_A2</b> \<Real\></dt>
<dd>Ancho en Å cuadrados de la región de caída de lk_dome desde el agua.<br/>Default: 3.9<br/></dd>
<dt><b>-lk_dome_overlap_width_A2</b> \<Real\></dt>
<dd>Ancho en Å cuadrados del tamaño de la interacción agua-agua de lk_dome.<br/>Default: 5.0<br/></dd>
<dt><b>-lk_dome_ball_overlap_width_A2</b> \<Real\></dt>
<dd>Ancho en Å cuadrados del tamaño de la interacción agua-agua de lk_ball_bridge2.<br/>Default: 5.0<br/></dd>
<dt><b>-lk_dome_water_dist</b> \<Real\></dt>
<dd>Distancia del agua de lk_ball al agua de lk_dome<br/>Default: 2.7436<br/></dd>
<dt><b>-lk_dome_water_adjust</b> \<Real\></dt>
<dd>Ajuste de la distancia del agua de lk_ball para los cálculos de lk_dome.<br/>Default: -1.275<br/></dd>
</dl>
+ <h3>-dna:design</h3>
<dl>
<dt><b>-design</b> \<Boolean\></dt>
<dd>grupo de opciones design<br/></dd>
<dt><b>-output_unbound_pdb</b> \<Boolean\></dt>
<dd>escribir un pdb sin unir si se hacen cálculos de puntuación de unión<br/>Default: false<br/></dd>
<dt><b>-z_cutoff</b> \<Real\></dt>
<dd>distancia a lo largo del eje del ADN desde las bases de ADN en diseño dentro de la cual se permite diseñar aminoácidos<br/>Rango: 0-<br/>Default: 3.5<br/></dd>
<dt><b>-protein_scan</b> \<String\></dt>
<dd>barrido de un solo residuo de los tipos de residuo de proteína para las puntuaciones de unión y de especificidad<br/>Default: "ACDEFGHIKLMNPQRSTVWY"<br/></dd>
<dt><b>-checkpoint</b> \<String\></dt>
<dd>escribir/leer archivos de punto de control para protocolos de nivel superior que avanzan linealmente durante periodos largos. Indica un nombre de archivo de punto de control después de esta opción.<br/>Default: ""<br/></dd>
<dt><b>-minimize</b> \<Boolean\></dt>
<dd>Realizar minimización en el modo de diseño de ADN.<br/>Default: false<br/></dd>
<dt><b>-dna_defs</b> \<StringVector\></dt>
<dd><br/>Default: ""<br/></dd>
<dt><b>-dna_defs_file</b> \<String\></dt>
<dd><br/>Default: ""<br/></dd>
<dt><b>-nopdb</b> \<Boolean\></dt>
<dd>usa esta opción para desactivar la salida de pdb<br/>Default: false<br/></dd>
<dt><b>-designable_second_shell</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-base_contacts_only</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-probe_specificity</b> \<Integer\></dt>
<dd>Estimar rápidamente la especificidad explícita de los diseños de ADN durante el reempaquetado con cadena principal fija<br/>Default: 1<br/></dd>
<dt><b>-reversion_scan</b> \<Boolean\></dt>
<dd>Intentar revertir las mutaciones espurias después de diseñar<br/>Default: false<br/></dd>
<dt><b>-binding</b> \<Boolean\></dt>
<dd>calcular una energía de unión proteína-ADN<br/>Default: false<br/></dd>
<dt><b>-Boltz_temp</b> \<Real\></dt>
<dd>temperatura para los cálculos de Boltzmann<br/>Default: 0.6<br/></dd>
<dt><b>-repack_only</b> \<Boolean\></dt>
<dd>No permitir que las secuencias de proteína muten de forma arbitraria<br/>Default: false<br/></dd>
<dt><b>-sparse_pdb_output</b> \<Boolean\></dt>
<dd>Escribir solo las coordenadas que cambian respecto a la estructura de entrada<br/>Default: false<br/></dd>
</dl>
+ <h4>-dna:design:specificity</h4>
<dl>
<dt><b>-specificity</b> \<Boolean\></dt>
<dd>grupo de opciones specificity<br/></dd>
<dt><b>-output_structures</b> \<Boolean\></dt>
<dd>escribir estructuras para cada combinación de secuencias<br/>Default: false<br/></dd>
<dt><b>-include_dna_potentials</b> \<Boolean\></dt>
<dd>incluir potenciales de ADN en los cálculos de especificidad de la secuencia de ADN<br/>Default: false<br/></dd>
</dl>
+ <h4>-dna:design:reversion</h4>
<dl>
<dt><b>-reversion</b> \<Boolean\></dt>
<dd>grupo de opciones reversion<br/></dd>
<dt><b>-dscore_cutoff</b> \<Real\></dt>
<dd>límite de pérdida de energía aceptable<br/>Default: 1.5<br/></dd>
<dt><b>-dspec_cutoff</b> \<Real\></dt>
<dd>límite de pérdida de especificidad aceptable<br/>Default: -0.05<br/></dd>
</dl>
+ <h2>-DisulfideInsertion</h2>
<dl>
<dt><b>-DisulfideInsertion</b> \<Boolean\></dt>
<dd>grupo de opciones DisulfideInsertion<br/></dd>
<dt><b>-peptide_chain</b> \<Integer\></dt>
<dd>El número de cadena peptídica para la que se realiza una comprobación de DisulfideInsertion<br/>Default: 1<br/></dd>
<dt><b>-n_cyd_seqpos</b> \<Integer\></dt>
<dd>La posición secuencial del residuo del extremo N del posible puente disulfuro; 0 indica el extremo N del péptido<br/>Default: 0.0<br/></dd>
<dt><b>-c_cyd_seqpos</b> \<Integer\></dt>
<dd>La posición secuencial del residuo del extremo C del posible puente disulfuro; 0 indica el extremo C del péptido<br/>Default: 0.0<br/></dd>
<dt><b>-max_dslf_pot</b> \<Real\></dt>
<dd>La puntuación de coincidencia máxima permitida para la rotación y la traslación del puente disulfuro<br/>Default: 2.0<br/></dd>
<dt><b>-max_dslf_energy</b> \<Real\></dt>
<dd>El cambio máximo permitido en la energía del puente disulfuro al formarse el puente disulfuro del péptido<br/>Default: -0.5<br/></dd>
<dt><b>-min_dslf_dist_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la distancia mínima permitida entre residuos que podrían formar un puente disulfuro.<br/>Default: 1.0<br/></dd>
<dt><b>-max_dslf_dist_multiplier</b> \<Real\></dt>
<dd>Un multiplicador de la distancia máxima permitida entre residuos que podrían formar un puente disulfuro.<br/>Default: 1.0<br/></dd>
<dt><b>-scorefxn</b> \<String\></dt>
<dd>La función de puntuación que se usará en disulfideInsertion<br/></dd>
<dt><b>-constraint_weight</b> \<Real\></dt>
<dd>Peso de las restricciones de los enlaces disulfuro formados por DisulfideInsertionMover; EXPERIMENTAL<br/>Default: 0.0<br/></dd>
</dl>
+ <h2>-docking</h2>
<dl>
<dt><b>-kick_relax</b> \<Boolean\></dt>
<dd>Añadir un paso de relax al final del docking simétrico<br/>Default: false<br/></dd>
<dt><b>-docking</b> \<Boolean\></dt>
<dd>grupo de opciones Docking<br/></dd>
<dt><b>-view</b> \<Boolean\></dt>
<dd>Decidir si se usa o no el visor (gráfico)<br/>Default: false<br/></dd>
<dt><b>-no_filters</b> \<Boolean\></dt>
<dd>Activar o desactivar el uso de filtros<br/>Default: false<br/></dd>
<dt><b>-design_chains</b> \<StringVector\></dt>
<dd>Pasa los identificadores de cadena de una letra, separados por espacio, de cada cadena que se diseñará: -design_chains A B<br/></dd>
<dt><b>-recover_sidechains</b> \<File\></dt>
<dd>normalmente las cadenas laterales se toman de la estructura de entrada si es de todos los átomos; esto anula ese comportamiento y toma las cadenas laterales del archivo pdb<br/></dd>
<dt><b>-partners</b> \<String\></dt>
<dd>define las parejas de docking por ID de cadena; ejemplo: para hacer docking de las cadenas L+H con A, -partners LH_A<br/>Default: "_"<br/></dd>
<dt><b>-docking_local_refine</b> \<Boolean\></dt>
<dd>Hacer un refinamiento local de la posición de docking (alta resolución)<br/>Default: false<br/></dd>
<dt><b>-low_res_protocol_only</b> \<Boolean\></dt>
<dd>Ejecutar solo docking de baja resolución, omitir el docking de alta resolución<br/>Default: false<br/></dd>
<dt><b>-docking_low_res_score</b> \<String\></dt>
<dd>Definir la función de puntuación del docking de baja resolución.<br/>Default: "interchain_cen"<br/></dd>
<dt><b>-randomize1</b> \<Boolean\></dt>
<dd>Aleatorizar la primera pareja de docking.<br/>Default: false<br/></dd>
<dt><b>-randomize2</b> \<Boolean\></dt>
<dd>Aleatorizar la segunda pareja de docking.<br/>Default: false<br/></dd>
<dt><b>-use_ellipsoidal_randomization</b> \<Boolean\></dt>
<dd>Modificar la aleatorización del docking para que use el método elipsoidal en lugar del esférico.<br/>Default: false<br/></dd>
<dt><b>-spin</b> \<Boolean\></dt>
<dd>Girar una segunda pareja de docking alrededor de ejes desde el centro de masa de la pareja 1 a la pareja 2<br/>Default: false<br/></dd>
<dt><b>-tilt</b> \<RealVector\></dt>
<dd>inclinar las parejas de docking en un ángulo aleatorio: -tilt PARTNER1_MAX_DEGREES PARTNER2_MAX_DEGREES.<br/></dd>
<dt><b>-tilt1_center</b> \<String\></dt>
<dd>resID alrededor del cual se centra la rotación de la pareja 1 (por defecto: el centro de masa de la pareja 1<br/>Default: ""<br/></dd>
<dt><b>-tilt2_center</b> \<String\></dt>
<dd>resID alrededor del cual se centra la rotación de la pareja 2 (por defecto: el centro de masa de la pareja 2<br/>Default: ""<br/></dd>
<dt><b>-dock_pert</b> \<RealVector\></dt>
<dd>Hacer una pequeña perturbación de la pareja dos: -dock_pert ANGSTROMS DEGREES. Los valores buenos para docking de proteínas son 3 Å y 8 grados.<br/></dd>
<dt><b>-uniform_trans</b> \<Real\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-center_at_interface</b> \<Boolean\></dt>
<dd>Realizar todas las perturbaciones iniciales con el centro de rotación en la interfaz entre las parejas, en lugar de en el centro de masa de la pareja opuesta.<br/>Default: false<br/></dd>
<dt><b>-dock_mcm_first_cycles</b> \<Integer\></dt>
<dd>Realizar 4 ciclos para que el filtro decida si continuar.<br/>Default: 4<br/></dd>
<dt><b>-dock_mcm_second_cycles</b> \<Integer\></dt>
<dd>Si el primer ciclo pasa el filtro, continuar 45 ciclos.<br/>Default: 45<br/></dd>
<dt><b>-docking_centroid_outer_cycles</b> \<Integer\></dt>
<dd>Ciclos externos durante los movimientos adaptativos de cuerpo rígido del docking.<br/>Default: 10<br/></dd>
<dt><b>-docking_centroid_inner_cycles</b> \<Integer\></dt>
<dd>Ciclos internos durante los movimientos adaptativos de cuerpo rígido del docking.<br/>Default: 50<br/></dd>
<dt><b>-dock_min</b> \<Boolean\></dt>
<dd>Minimizar la estructura final de todos los átomos.<br/>Default: false<br/></dd>
<dt><b>-flexible_bb_docking</b> \<String\></dt>
<dd>Cómo hacer docking con cadena principal flexible, si es que se hace. Las opciones incluyen fixedbb, ccd, alc y backrub.<br/>Default: "fixedbb"<br/></dd>
<dt><b>-flexible_bb_docking_interface_dist</b> \<Real\></dt>
<dd>Distancia entre cadenas necesaria para definir un residuo como de cadena principal flexible (es decir, loop).<br/>Default: 10.0<br/></dd>
<dt><b>-ensemble1</b> \<String\></dt>
<dd>activa el modo de conjunto para la pareja 1. La cadena es un archivo pdb de varios modelos<br/>Default: ""<br/></dd>
<dt><b>-ensemble2</b> \<String\></dt>
<dd>activa el modo de conjunto para la pareja 2. La cadena es un archivo pdb de varios modelos<br/>Default: ""<br/></dd>
<dt><b>-dock_mcm_trans_magnitude</b> \<Real\></dt>
<dd>La magnitud de la perturbación traslacional durante mcm en docking.<br/>Default: 0.1<br/></dd>
<dt><b>-dock_mcm_rot_magnitude</b> \<Real\></dt>
<dd>La magnitud de la perturbación rotacional durante mcm en docking.<br/>Default: 5.0<br/></dd>
<dt><b>-minimization_threshold</b> \<Real\></dt>
<dd>Umbral para que Rosetta decida si minimiza el salto después de un rigid_pert<br/>Default: 15<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>Ajuste de temperatura del objeto mc durante el docking de cuerpo rígido<br/>Default: 0.8<br/></dd>
<dt><b>-repack_period</b> \<Integer\></dt>
<dd>periodo de reempaquetado completo durante dockingMCM<br/>Default: 8<br/></dd>
<dt><b>-extra_rottrial</b> \<Boolean\></dt>
<dd>prueba de rotámeros adicional después de la minimización<br/>Default: false<br/></dd>
<dt><b>-dock_rtmin</b> \<Boolean\></dt>
<dd>hace pruebas de rotámeros con minimización, RTMIN<br/>Default: false<br/></dd>
<dt><b>-sc_min</b> \<Boolean\></dt>
<dd>hace minimización de cadenas laterales de los residuos de la interfaz<br/>Default: false<br/></dd>
<dt><b>-norepack1</b> \<Boolean\></dt>
<dd>No reempaquetar las cadenas laterales de la pareja 1.<br/>Default: false<br/></dd>
<dt><b>-norepack2</b> \<Boolean\></dt>
<dd>No reempaquetar las cadenas laterales de la pareja 2.<br/>Default: false<br/></dd>
<dt><b>-bb_min_res</b> \<IntegerVector\></dt>
<dd>Minimizar la cadena principal en estas posiciones.<br/></dd>
<dt><b>-sc_min_res</b> \<IntegerVector\></dt>
<dd>Minimizar la cadena principal en estas posiciones.<br/></dd>
<dt><b>-dock_ppk</b> \<Boolean\></dt>
<dd>modo de pre-empaquetado de docking<br/>Default: false<br/></dd>
<dt><b>-max_repeats</b> \<Integer\></dt>
<dd>Si un decoy no pasa los filtros de baja y alta resolución, cuántos intentos se hacen antes de fallar<br/>Default: 1000<br/></dd>
<dt><b>-dock_lowres_filter</b> \<RealVector\></dt>
<dd>fija manualmente el filtro de docking de baja resolución: -dock_lowres_filter <INTERCHAIN_CONTACT CUTOFF> <INTERCHAIN_VDW CUTOFF> <RESTRAINT CUTOFF>. Los valores por defecto para docking de proteínas son 10.0 y 1.0<br/></dd>
<dt><b>-SymDock_lowres_filter</b> \<Real\></dt>
<dd>Fija manualmente el valor del filtro de docking de baja resolución que se multiplicará por el número de interfaces<br/>Default: 5.0<br/></dd>
<dt><b>-multibody</b> \<IntegerVector\></dt>
<dd>Lista de saltos que pueden moverse durante el docking<br/></dd>
<dt><b>-ignore_default_docking_task</b> \<Boolean\></dt>
<dd>Permite al usuario definir otra tarea para dársela a Docking e ignorará el DockingTask por defecto. Si no se le da otro TaskFactory a docking, la tarea diseñará todo por defecto.<br/>Default: false<br/></dd>
<dt><b>-low_patch</b> \<String\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante el cuerpo rígido <br/></dd>
<dt><b>-high_patch</b> \<String\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante el docking<br/></dd>
<dt><b>-high_min_patch</b> \<String\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante <br/></dd>
<dt><b>-pack_patch</b> \<String\></dt>
<dd>Nombre del archivo de parche de pesos (sin la extensión .wts) que se usará durante el empaquetado<br/></dd>
<dt><b>-use_legacy_protocol</b> \<Boolean\></dt>
<dd>Usar el algoritmo heredado de docking de alta resolución para mantener la compatibilidad de la salida.<br/>Default: false<br/></dd>
<dt><b>-docklowres_trans_magnitude</b> \<Real\></dt>
<dd>La magnitud de la perturbación traslacional durante la baja resolución en docking.<br/>Default: 0.7<br/></dd>
<dt><b>-docklowres_rot_magnitude</b> \<Real\></dt>
<dd>La magnitud de la perturbación rotacional durante la baja resolución en docking.<br/>Default: 5.0<br/></dd>
<dt><b>-enable_pymol_viewer</b> \<Boolean\></dt>
<dd>Ver en PyMOL los movimientos de cambio de confórmero. El color cambia cuando se acepta el cambio.<br/>Default: false<br/></dd>
<dt><b>-SymDock_reduce_motif_dock_weights</b> \<Boolean\></dt>
<dd>Reduce los pesos de motif_dock_score a 1/N, donde N = número de subunidades<br/>Default: false<br/></dd>
<dt><b>-SymDock_fa_rep_max</b> \<Real\></dt>
<dd>Cambia el valor máximo de fa_rep para docking_hires_mover, pero no para el archivo de puntuaciones de jd2.<br/>Default: 0.55<br/></dd>
<dt><b>-SymDock_fa_sol_max</b> \<Real\></dt>
<dd>Cambia el valor máximo de fa_sol para docking_hires_mover, pero no para el archivo de puntuaciones de jd2.<br/>Default: 1.0<br/></dd>
</dl>
+ <h3>-docking:ligand</h3>
<dl>
<dt><b>-ligand</b> \<Boolean\></dt>
<dd>grupo de opciones docking:ligand<br/></dd>
<dt><b>-protocol</b> \<String\></dt>
<dd>¿Qué protocolo ejecutar?<br/>Default: "abbreviated"<br/></dd>
<dt><b>-soft_rep</b> \<Boolean\></dt>
<dd>¿Usar un potencial repulsivo suave?<br/>Default: false<br/></dd>
<dt><b>-tweak_sxfn</b> \<Boolean\></dt>
<dd>¿Aplicar modificaciones por defecto a la función de puntuación?<br/>Default: true<br/></dd>
<dt><b>-old_estat</b> \<Boolean\></dt>
<dd>¿Emular la electrostática de Rosetta++? (mayor peso, ignora proteína-proteína)<br/>Default: false<br/></dd>
<dt><b>-random_conformer</b> \<Boolean\></dt>
<dd>Partir de un rotámero de ligando aleatorio elegido de la biblioteca<br/>Default: false<br/></dd>
<dt><b>-improve_orientation</b> \<Integer\></dt>
<dd>Hacer N ciclos de aleatorización para minimizar los choques con la cadena principal<br/></dd>
<dt><b>-mutate_same_name3</b> \<Boolean\></dt>
<dd>¿Permitir que el ligando 'diseñe' hacia tipos de residuo con el mismo name3? Se usa normalmente para estados de protonación / tautómeros.<br/>Default: false<br/></dd>
<dt><b>-subset_to_keep</b> \<Real\></dt>
<dd>Al seleccionar un subconjunto de Poses de ligando, ¿qué fracción (número si es > 1.0) se conserva?<br/>Default: 0.05<br/></dd>
<dt><b>-min_rms</b> \<Real\></dt>
<dd>Al seleccionar un subconjunto de Poses de ligando, todos deben diferir al menos en esta cantidad.<br/>Default: 0.8<br/></dd>
<dt><b>-max_poses</b> \<Integer\></dt>
<dd>Al seleccionar un subconjunto de Poses de ligando, seleccionar como máximo esta cantidad.<br/>Default: 50<br/></dd>
<dt><b>-minimize_ligand</b> \<Boolean\></dt>
<dd>¿Permitir que las torsiones del ligando se minimicen?<br/>Default: false<br/></dd>
<dt><b>-harmonic_torsions</b> \<Real\></dt>
<dd>Minimizar con restricciones armónicas con la desviación estándar especificada (en grados)<br/>Default: 10.0<br/></dd>
<dt><b>-use_ambig_constraints</b> \<Boolean\></dt>
<dd>Usar restricciones ambiguas para restringir las torsiones en lugar de añadir y quitar restricciones<br/>Default: false<br/></dd>
<dt><b>-shear_moves</b> \<Integer\></dt>
<dd>Hacer N movimientos de pseudo-cizalla en las torsiones del ligando por cada ciclo MCM<br/>Default: 0<br/></dd>
<dt><b>-minimize_backbone</b> \<Boolean\></dt>
<dd>¿Permitir que la cadena principal de la proteína se minimice? Restringida salvo cerca del ligando.<br/>Default: false<br/></dd>
<dt><b>-harmonic_Calphas</b> \<Real\></dt>
<dd>Minimizar con restricciones armónicas con la desviación estándar especificada (en Å)<br/>Default: 0.2<br/></dd>
<dt><b>-tether_ligand</b> \<Real\></dt>
<dd>Restringir el ligando al punto de partida con la desviación estándar especificada (en Å)<br/></dd>
<dt><b>-start_from</b> \<RealVector\></dt>
<dd>Una o más ubicaciones XYZ para elegir para el ligando: -start_from X1 Y1 Z1  -start_from X2 Y2 Z2  ...<br/></dd>
<dt><b>-option_file</b> \<String\></dt>
<dd>Nombre del archivo de opciones de ligando para usar con la aplicación multi_ligand_dock<br/></dd>
<dt><b>-ligand_ensemble</b> \<Real\></dt>
<dd>Peso del ajuste de correlación en el docking de conjuntos de ligandos; ignora las interacciones ligando-ligando si el valor no es cero<br/>Default: 0<br/></dd>
<dt><b>-iphold_cen_cycles</b> \<Integer\></dt>
<dd>Número de ciclos iphold centroide<br/>Default: 0<br/></dd>
<dt><b>-iphold_fa_cycles</b> \<Integer\></dt>
<dd>Número de ciclos iphold de todos los átomos<br/>Default: 0<br/></dd>
</dl>
+ <h4>-docking:ligand:grid</h4>
<dl>
<dt><b>-grid</b> \<Boolean\></dt>
<dd>grupo de opciones docking:ligand:grid<br/></dd>
<dt><b>-grid_kin</b> \<File\></dt>
<dd>Escribir la versión kinemage de la rejilla generada en el archivo indicado<br/></dd>
<dt><b>-grid_map</b> \<File\></dt>
<dd>Escribir la rejilla en el archivo indicado como densidad electrónica en formato BRIX (también llamado mapa `O')<br/></dd>
</dl>
+ <h2>-DomainAssembly</h2>
<dl>
<dt><b>-DomainAssembly</b> \<Boolean\></dt>
<dd>grupo de opciones DomainAssembly<br/></dd>
<dt><b>-da_setup</b> \<Boolean\></dt>
<dd>ejecutar la rutina de configuración de DomainAssembly<br/>Default: false<br/></dd>
<dt><b>-da_setup_option_file</b> \<File\></dt>
<dd>lista de entrada de pdb y secuencias de enlazadores<br/>Default: "--"<br/></dd>
<dt><b>-da_setup_output_pdb</b> \<File\></dt>
<dd>archivo PDB de salida de DomainAssemblySetup<br/>Default: "--"<br/></dd>
<dt><b>-da_linker_file</b> \<File\></dt>
<dd>archivo de entrada con definiciones de enlazadores<br/>Default: "--"<br/></dd>
<dt><b>-da_require_buried</b> \<File\></dt>
<dd>Archivo de entrada que contiene los residuos que deben quedar enterrados en la interfaz de dominios<br/>Default: "--"<br/></dd>
<dt><b>-da_start_pdb</b> \<File\></dt>
<dd>pdb de entrada para la optimización de enlazadores<br/>Default: "--"<br/></dd>
<dt><b>-run_fullatom</b> \<Boolean\></dt>
<dd>Ejecutar la etapa de todos los átomos del protocolo<br/>Default: false<br/></dd>
<dt><b>-run_centroid</b> \<Boolean\></dt>
<dd>Ejecutar la etapa centroide del protocolo<br/>Default: false<br/></dd>
<dt><b>-run_centroid_abinitio</b> \<Boolean\></dt>
<dd>Ejecutar la etapa abinitio centroide del protocolo<br/>Default: true<br/></dd>
<dt><b>-da_nruns</b> \<Integer\></dt>
<dd>número de ejecuciones<br/>Default: 1<br/></dd>
<dt><b>-da_start_pdb_num</b> \<Integer\></dt>
<dd>número inicial para los archivos pdb de salida<br/>Default: 1<br/></dd>
<dt><b>-da_linker_file_rna</b> \<File\></dt>
<dd>archivo de entrada con las definiciones de ARN móviles<br/>Default: "--"<br/></dd>
<dt><b>-residues_repack_only</b> \<String\></dt>
<dd>Residuos que no se rediseñarán bajo ninguna circunstancia<br/></dd>
<dt><b>-da_eval_pose_map</b> \<File\></dt>
<dd>archivo de entrada que asigna las coordenadas del Pose a posiciones estructuralmente relacionadas del Pose nativo<br/></dd>
</dl>
+ <h2>-dump_trajectory</h2>
<dl>
<dt><b>-dump_trajectory</b> \<Boolean\></dt>
<dd>grupo de opciones dump_trajectory<br/></dd>
<dt><b>-prefix</b> \<String\></dt>
<dd>Prefijo que se usa al volcar trayectorias con el ScoreType dump_trajectory.<br/>Default: "traj"<br/></dd>
<dt><b>-gz</b> \<Boolean\></dt>
<dd>Volcar las trayectorias en formato .pdb.gz.<br/>Default: false<br/></dd>
<dt><b>-stride</b> \<Integer\></dt>
<dd>El paso (stride) del volcado de trayectorias. Por defecto es 1, lo que significa que se vuelca un Pose en cada llamada a la función. Los valores más altos vuelcan un Pose después de cada N-ésima llamada a la función, lo que permite un muestreo más espaciado de las trayectorias.<br/>Default: 1<br/></dd>
</dl>
+ <h2>-edensity</h2>
<dl>
<dt><b>-edensity</b> \<Boolean\></dt>
<dd>grupo de opciones edensity<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-mapfile</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-mapreso</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.0<br/></dd>
<dt><b>-grid_spacing</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.0<br/></dd>
<dt><b>-centroid_density_mass</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.0<br/></dd>
<dt><b>-sliding_window</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 1<br/></dd>
<dt><b>-cryoem_scatterers</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-force_apix</b> \<Real\></dt>
<dd>forzar que el espaciado de píxeles tome un valor concreto<br/>Default: 0.0<br/></dd>
<dt><b>-fastdens_wt</b> \<Real\></dt>
<dd>peso de la puntuación rápida de edens<br/>Default: 0.0<br/></dd>
<dt><b>-fastdens_params</b> \<RealVector\></dt>
<dd>parámetros para la puntuación fastdens<br/></dd>
<dt><b>-legacy_fastdens_score</b> \<Boolean\></dt>
<dd>usar la normalización previa a junio de 2013 para puntuar<br/>Default: false<br/></dd>
<dt><b>-sliding_window_wt</b> \<Real\></dt>
<dd>peso de la puntuación de ventana deslizante de edens<br/>Default: 0.0<br/></dd>
<dt><b>-score_sliding_window_context</b> \<Boolean\></dt>
<dd>al usar el ajuste de densidad de ventana deslizante, incluir átomos vecinos (ralentiza la trayectoria)<br/>Default: false<br/></dd>
<dt><b>-whole_structure_ca_wt</b> \<Real\></dt>
<dd>peso de la puntuación centroide de edens (solo CA)<br/>Default: 0.0<br/></dd>
<dt><b>-whole_structure_allatom_wt</b> \<Real\></dt>
<dd>peso de la puntuación centroide de edens (todos los átomos)<br/>Default: 0.0<br/></dd>
<dt><b>-debug_derivatives</b> \<Boolean\></dt>
<dd>calcular derivadas numéricas de los términos de densidad y compararlas con las analíticas<br/>Default: false<br/></dd>
<dt><b>-realign</b> \<String\></dt>
<dd>cómo alinear inicialmente el Pose a la densidad<br/>Default: "no"<br/></dd>
<dt><b>-membrane_axis</b> \<String\></dt>
<dd>el eje normal de la membrana<br/>Default: "Z"<br/></dd>
<dt><b>-atom_mask</b> \<Real\></dt>
<dd>anular el radio de máscara atómica por defecto (=3.2 Å) con este valor (puntuación de alta resolución)<br/>Default: 3.2<br/></dd>
<dt><b>-atom_mask_min</b> \<Real\></dt>
<dd>anular el valor mínimo de 3 sigma que tiene precedencia sobre el valor de atom_mask (puntuación de alta resolución)<br/>Default: 2.0<br/></dd>
<dt><b>-ca_mask</b> \<Real\></dt>
<dd>anular el radio de máscara de CA por defecto (=6 Å) con este valor (puntuación de baja resolución)<br/>Default: 6.0<br/></dd>
<dt><b>-score_symm_complex</b> \<Boolean\></dt>
<dd>Si se activa, puntúa la estructura sobre todo el complejo simétrico; si no, usa solo el monómero de control<br/>Default: false<br/></dd>
<dt><b>-sc_scaling</b> \<Real\></dt>
<dd>Escalar la densidad de las cadenas laterales por esta cantidad (por defecto igual a la densidad de la cadena principal)<br/>Default: 1.0<br/></dd>
<dt><b>-n_kbins</b> \<Integer\></dt>
<dd>Número de intervalos de factor B<br/>Default: 1<br/></dd>
<dt><b>-unmask_bb</b> \<Boolean\></dt>
<dd>Incluir solo átomos de cadenas laterales en la máscara atómica<br/>Default: false<br/></dd>
<dt><b>-render_density</b> \<Boolean\></dt>
<dd>mostrar la densidad electrónica en modo gráfico de la compilación<br/>Default: false<br/></dd>
<dt><b>-periodicity</b> \<Boolean\></dt>
<dd>calcular las puntuaciones de densidad con límites periódicos<br/>Default: true<br/></dd>
</dl>
+ <h2>-enzdes</h2>
<dl>
<dt><b>-enzdes</b> \<Boolean\></dt>
<dd>grupo de opciones enzdes<br/></dd>
<dt><b>-checkpoint</b> \<String\></dt>
<dd>escribir/leer archivos de punto de control en el nombre de archivo deseado.<br/>Default: ""<br/></dd>
<dt><b>-enz_score</b> \<Boolean\></dt>
<dd>impedir el reempaquetado en el cálculo de diseño de enzimas<br/>Default: false<br/></dd>
<dt><b>-enz_repack</b> \<Boolean\></dt>
<dd>impedir el rediseño en el cálculo de diseño de enzimas<br/>Default: false<br/></dd>
<dt><b>-cst_opt</b> \<Boolean\></dt>
<dd>minimización de restricciones previa al diseño<br/>Default: false<br/></dd>
<dt><b>-cst_predock</b> \<Boolean\></dt>
<dd>acopla un ligando respecto al residuo catalítico<br/>Default: false<br/></dd>
<dt><b>-trans_magnitude</b> \<Real\></dt>
<dd>traslación de cuerpo rígido en Å<br/>Default: 0.1<br/></dd>
<dt><b>-rot_magnitude</b> \<Real\></dt>
<dd>rotación de cuerpo rígido en grados<br/>Default: 2<br/></dd>
<dt><b>-dock_trials</b> \<Real\></dt>
<dd>número de intentos de docking<br/>Default: 100<br/></dd>
<dt><b>-cst_min</b> \<Boolean\></dt>
<dd>después de la minimización del diseño, se desactivan las restricciones<br/>Default: false<br/></dd>
<dt><b>-cst_design</b> \<Boolean\></dt>
<dd>invoca el diseño propiamente dicho<br/>Default: false<br/></dd>
<dt><b>-design_min_cycles</b> \<Integer\></dt>
<dd>determina cuántas iteraciones de diseño/minimización se hacen durante una ejecución de diseño<br/>Default: 1<br/></dd>
<dt><b>-make_consensus_mutations</b> \<Boolean\></dt>
<dd>Invoca mutaciones de vuelta al consenso del perfil de secuencia en toda la proteína en el protocolo EnzdesFixBB. El archivo de perfil de secuencia debe especificarse con la opción -in:pssm.<br/>Default: false<br/></dd>
<dt><b>-bb_min</b> \<Boolean\></dt>
<dd>permite que la cadena principal de los residuos del sitio activo se mueva durante cst_opt y cst_min. En la etapa cst_opt, los Ca de los residuos estarán restringidos a sus posiciones originales.<br/>Default: false<br/></dd>
<dt><b>-bb_min_allowed_dev</b> \<Real\></dt>
<dd>distancia que pueden moverse los Ca durante la minimización de la cadena principal antes de que se asigne una penalización.<br/>Default: 0.5<br/></dd>
<dt><b>-loop_bb_min_allowed_dev</b> \<Real\></dt>
<dd>distancia que pueden moverse los Ca durante la minimización de la cadena principal antes de que se asigne una penalización. Se aplica solo a los loops según determine DSSP.<br/>Default: 0.5<br/></dd>
<dt><b>-minimize_ligand_torsions</b> \<Real\></dt>
<dd>grados que pueden rotar las torsiones del ligando antes de que se asigne una penalización. Solo las torsiones que tienen diversidad en el conjunto conformacional admiten esta desviación estándar; el resto se restringen a 0.1<br/>Default: 10.0<br/></dd>
<dt><b>-minimize_all_ligand_torsions</b> \<Real\></dt>
<dd>permite la minimización restringida de todas las torsiones del ligando usando la desviación estándar.<br/>Default: 10.0<br/></dd>
<dt><b>-chi_min</b> \<Boolean\></dt>
<dd>permite que los valores chi de los residuos del sitio activo se muevan durante cst_opt y cst_min.<br/>Default: false<br/></dd>
<dt><b>-min_all_jumps</b> \<Boolean\></dt>
<dd>permite que todos los saltos del Pose se minimicen durante cst_opt y cst_min. Por defecto solo se minimizan los saltos asociados al ligando<br/>Default: false<br/></dd>
<dt><b>-cst_dock</b> \<Boolean\></dt>
<dd>docking de ligando después del diseño. Por defecto, las restricciones (excepto las conexiones covalentes) se desactivarán en esta etapa.<br/>Default: false<br/></dd>
<dt><b>-run_ligand_motifs</b> \<Boolean\></dt>
<dd>ejecutar la búsqueda de motivos del ligando y añadir rotámeros de motivos al packer<br/>Default: false<br/></dd>
<dt><b>-enz_debug</b> \<Boolean\></dt>
<dd>invoca varias rutinas de depuración alrededor del código de enzdes<br/>Default: false<br/></dd>
<dt><b>-cstfile</b> \<File\></dt>
<dd>archivo que contiene todas las restricciones necesarias para un cálculo de diseño de enzimas<br/>Default: "constraints.cst"<br/></dd>
<dt><b>-enz_loops_file</b> \<File\></dt>
<dd>archivo que contiene las definiciones de las regiones de loops<br/>Default: "eloops.els"<br/></dd>
<dt><b>-flexbb_protocol</b> \<Boolean\></dt>
<dd>activa el diseño con cadena principal flexible<br/>Default: false<br/></dd>
<dt><b>-remodel_protocol</b> \<Boolean\></dt>
<dd>activa el diseño con el protocolo remodel<br/>Default: false<br/></dd>
<dt><b>-kic_loop_sampling</b> \<Boolean\></dt>
<dd>Generar conformaciones alternativas de loops usando cierre de loops KIC en lugar de backrub<br/>Default: false<br/></dd>
<dt><b>-dump_loop_samples</b> \<String\></dt>
<dd>¿sí/no? Crear archivos pdb de loops llamados loopreg_[regionid]_[whichsample].pdb para las muestras de loops elegidas; si se indica 'quit_afterwards', el programa sale después de generar todos los loops<br/>Default: "no"<br/></dd>
<dt><b>-fix_catalytic_aa</b> \<Boolean\></dt>
<dd>impedir que los aminoácidos catalíticos se reempaqueten<br/>Default: false<br/></dd>
<dt><b>-additional_packing_ligand_rb_confs</b> \<Integer\></dt>
<dd>Los rotámeros de ligando se construirán en posiciones adicionales de cuerpo rígido aleatorias durante el empaquetado<br/>Default: 0<br/></dd>
<dt><b>-ex_catalytic_rot</b> \<Integer\></dt>
<dd>opción de conveniencia para usar un mayor número de rotámeros para los residuos catalíticos. El nivel elegido se aplicará a todos los chi de cada residuo catalítico.<br/>Default: 1<br/></dd>
<dt><b>-single_loop_ensemble_size</b> \<Integer\></dt>
<dd>número de conformaciones generadas para cada uno de los loops independientes en un cálculo flexbb<br/>Default: 100<br/></dd>
<dt><b>-loop_generator_trials</b> \<Integer\></dt>
<dd>número de intentos que hace el respectivo generador de loops (backrub/cinemático kic) en enzdes flexbb<br/>Default: 200<br/></dd>
<dt><b>-no_catres_min_in_loopgen</b> \<Boolean\></dt>
<dd>impide la minimización de los residuos catalíticos al generar conjuntos de loops<br/>Default: false<br/></dd>
<dt><b>-mc_kt_low</b> \<Real\></dt>
<dd>límite bajo de Monte Carlo para la generación de conjuntos con backrub<br/>Default: 0.6<br/></dd>
<dt><b>-mc_kt_high</b> \<Real\></dt>
<dd>límite alto de Monte Carlo para la generación de conjuntos con backrub<br/>Default: 0.9<br/></dd>
<dt><b>-min_cacb_deviation</b> \<Real\></dt>
<dd>Filtro de unicidad de fragmentos. Activado por defecto. Desviación promedio mínima CA/CB que al menos un residuo debe tener respecto a todos los demás fragmentos ya incluidos para que se incluya un fragmento nuevo<br/>Default: 0.3<br/></dd>
<dt><b>-max_bb_deviation</b> \<Real\></dt>
<dd>Filtro de suavidad de fragmentos. Desactivado por defecto. Límite superior de la desviación promedio de la cadena principal que un fragmento nuevo puede tener respecto al fragmento más parecido ya incluido en el conjunto de fragmentos.<br/>Default: 0.1<br/></dd>
<dt><b>-max_bb_deviation_from_startstruct</b> \<Real\></dt>
<dd>Filtro de proximidad al nativo de los fragmentos. Siempre activado. Desviación promedio máxima tolerada de la cadena principal respecto a la cadena principal inicial para que un fragmento se incluya en el conjunto de fragmentos.<br/>Default: 1.5<br/></dd>
<dt><b>-remodel_trials</b> \<Integer\></dt>
<dd>con qué frecuencia se remodela cada loop en el mover enzdes_remodel<br/>Default: 100<br/></dd>
<dt><b>-remodel_secmatch</b> \<Boolean\></dt>
<dd>si faltan en el Pose interacciones restringidas durante el remodelado, se usará SecondaryMatcher para intentar encontrarlas en la región remodelada. Muy experimental por ahora<br/>Default: false<br/></dd>
<dt><b>-dump_inverse_rotamers</b> \<Boolean\></dt>
<dd>en caso de secmatching de remodelado contra rotámeros inversos, estos rotámeros se volcarán antes de que comience el protocolo para que el usuario los inspeccione visualmente<br/>Default: false<br/></dd>
<dt><b>-remodel_aggressiveness</b> \<Real\></dt>
<dd>determina la agresividad con la que se remodela un loop dado. Los valores válidos están entre 0 y 1, donde 1 es agresivo y 0 conservador.<br/>Default: 0.1<br/></dd>
<dt><b>-favor_native_res</b> \<Real\></dt>
<dd>una energía de bonificación asignada al residuo nativo durante un cálculo de diseño<br/>Default: 0.5<br/></dd>
<dt><b>-detect_design_interface</b> \<Boolean\></dt>
<dd>detectar automáticamente la región de diseño/reempaquetado alrededor de los ligandos<br/>Default: false<br/></dd>
<dt><b>-include_catres_in_interface_detection</b> \<Boolean\></dt>
<dd>si la opción -detect_design_interface está activa, invocar esta opción hace que todos los residuos que estén dentro de los cortes especificados de cualquier residuo catalítico también se pongan en diseño/reempaquetado<br/>Default: false<br/></dd>
<dt><b>-arg_sweep_interface</b> \<Boolean\></dt>
<dd>Usar una detección de interfaz de tipo diseño proteína-ADN, que implica generar rotámeros de arginina en cada posición y comprobar si la arginina puede interactuar con el ligando.<br/>Default: false<br/></dd>
<dt><b>-arg_sweep_cutoff</b> \<Real\></dt>
<dd>Distancia de corte de interacción entre la arginina y el ligando al hacer la detección de interfaz por barrido de arginina.<br/>Default: 3.7<br/></dd>
<dt><b>-cut1</b> \<Real\></dt>
<dd>opción para especificar el corte de rediseño 1 en el cálculo de enzdes<br/>Default: 0.0<br/></dd>
<dt><b>-cut2</b> \<Real\></dt>
<dd>opción para especificar el corte de rediseño 2 en el cálculo de enzdes<br/>Default: 0.0<br/></dd>
<dt><b>-cut3</b> \<Real\></dt>
<dd>opción para especificar el corte de reempaquetado 1 en el cálculo de enzdes<br/>Default: 10.0<br/></dd>
<dt><b>-cut4</b> \<Real\></dt>
<dd>opción para especificar el corte de reempaquetado 2 en el cálculo de enzdes<br/>Default: 10.0<br/></dd>
<dt><b>-lig_packer_weight</b> \<Real\></dt>
<dd>especifica los pesos de la interacción proteína-ligando durante el empaquetado (¡y solo el empaquetado!)<br/>Default: 1.0<br/></dd>
<dt><b>-no_unconstrained_repack</b> \<Boolean\></dt>
<dd>sin reempaquetado sin restricciones después de la etapa de diseño<br/>Default: false<br/></dd>
<dt><b>-secmatch_Ecutoff</b> \<Real\></dt>
<dd>la energía máxima de restricciones con la que se acepta un residuo en el secondary matcher<br/>Default: 1.0<br/></dd>
<dt><b>-change_lig</b> \<File\></dt>
<dd>Se puede usar con el protocolo de coincidencia secundaria si se usan distintas encarnaciones del ligando para el diseño y la coincidencia primaria. El archivo debe contener información sobre qué átomos superponer.<br/>Default: "ligchange_file.txt"<br/></dd>
<dt><b>-process_ligrot_separately</b> \<String\></dt>
<dd>En el protocolo EnzdesFixBB, hace que el protocolo se ejecute por separado para todos los rotámeros de ligando que no chocan con la cadena principal.<br/>Default: "default_lig"<br/></dd>
<dt><b>-start_from_random_rb_conf</b> \<Boolean\></dt>
<dd>En el protocolo EnzdesFixBB, si hay conformaciones adicionales de cuerpo rígido del ligando disponibles (de un pdb de varios modelos), una de ellas, elegida al azar, será el punto de partida del protocolo.<br/>Default: false<br/></dd>
<dt><b>-bb_bump_cutoff</b> \<Real\></dt>
<dd>opción para especificar la energía máxima permitida de la cadena principal al reemplazar un nuevo tipo de residuo<br/>Default: 2.0<br/></dd>
<dt><b>-sc_sc_bump_cutoff</b> \<Real\></dt>
<dd>opción para especificar la energía máxima permitida entre dos cadenas laterales recién colocadas en el secondary matcher<br/>Default: 2.0<br/></dd>
<dt><b>-no_packstat_calculation</b> \<Boolean\></dt>
<dd>determinará si el cálculo de packstat, computacionalmente intensivo, se hará al final de una ejecución<br/>Default: false<br/></dd>
<dt><b>-compare_native</b> \<String\></dt>
<dd>activa la comparación de cada estructura diseñada con su pdb nativo respectivo. El valor de la opción debe ser una ruta de directorio que contenga todos los archivos pdb nativos<br/>Default: "./"<br/></dd>
<dt><b>-final_repack_without_ligand</b> \<Boolean\></dt>
<dd>si se solicita un archivo de puntuaciones, esta opción hace que cada estructura se reempaquete sin el ligando. La estructura resultante se escribirá en un pdb de varios modelos, y las diferencias de energía y rmsd se añaden al archivo de puntuaciones.<br/>Default: false<br/></dd>
<dt><b>-dump_final_repack_without_ligand_pdb</b> \<Boolean\></dt>
<dd>Si la opción -final_repack_without_ligand está activa, esta opción hará que la estructura reempaquetada se vuelque por separado.<br/>Default: false<br/></dd>
<dt><b>-parser_read_cloud_pdb</b> \<Boolean\></dt>
<dd>leer PDB en formato cloud para enzdes en rosetta scripts<br/>Default: false<br/></dd>
</dl>
+ <h2>-epr_deer</h2>
<dl>
<dt><b>-epr_deer</b> \<Boolean\></dt>
<dd>grupo de opciones epr_deer<br/></dd>
<dt><b>-input_files</b> \<FileVector\></dt>
<dd>Archivos de entrada para datos de distancia o de decaimiento de DEER<br/></dd>
<dt><b>-coords_files</b> \<FileVector\></dt>
<dd>Archivos de entrada para las coordenadas usadas en la simulación de las mediciones DEER<br/></dd>
<dt><b>-print_data</b> \<Boolean\></dt>
<dd>Imprime las distribuciones de distancia y las trazas de decaimiento de DEER. Ten en cuenta que esto inundará tu terminal si se usa durante el modelado Monte Carlo.<br/>Default: false<br/></dd>
</dl>
+ <h2>-fast_loops</h2>
<dl>
<dt><b>-fast_loops</b> \<Boolean\></dt>
<dd>grupo de opciones fast_loops<br/></dd>
<dt><b>-window_accept_ratio</b> \<Real\></dt>
<dd>las ventanas con más de x por ciento de buenos loops en el muestreo rápido de loops se usan para el muestreo puntuado<br/>Default: 0.01<br/></dd>
<dt><b>-nr_scored_sampling_passes</b> \<Integer\></dt>
<dd>las buenas ventanas pasan N veces al muestreo puntuado<br/>Default: 4<br/></dd>
<dt><b>-nr_scored_fragments</b> \<Integer\></dt>
<dd>loops puntuados que se muestrean por buena ventana en cada pasada<br/>Default: 20<br/></dd>
<dt><b>-min_breakout_good_loops</b> \<Integer\></dt>
<dd>dejar de hacer muestreo puntuado si se han encontrado N o más buenos loops<br/>Default: 5<br/></dd>
<dt><b>-min_breakout_fast_loops</b> \<Integer\></dt>
<dd>dejar de hacer muestreo rápido si se han encontrado N o más buenos loops<br/>Default: 80<br/></dd>
<dt><b>-min_good_loops</b> \<Integer\></dt>
<dd>tratar como fallo si hay menos buenos loops que<br/>Default: 0<br/></dd>
<dt><b>-min_fast_loops</b> \<Integer\></dt>
<dd>tratar como fallo si hay menos loops rápidos que<br/>Default: 3<br/></dd>
<dt><b>-vdw_delta</b> \<Real\></dt>
<dd>aceptar como buen loop si la puntuación vdw < vdw-score-start + vdw-delta<br/>Default: 0.5<br/></dd>
<dt><b>-give_up</b> \<Integer\></dt>
<dd>si N scored_frag_attemps no dieron ningún buen loop, salir<br/>Default: 1000<br/></dd>
<dt><b>-chainbreak_max</b> \<Real\></dt>
<dd>aceptar solo los loops que tengan una puntuación máxima de chainbreak de... (suma de linear_chainbreak / chainbreak y overlap_chainbreak<br/>Default: 0.2<br/></dd>
<dt><b>-fragsample_score</b> \<File\></dt>
<dd>Función de puntuación usada durante el muestreo de fragmentos puntuados<br/>Default: "loop_fragsample.wts"<br/></dd>
<dt><b>-fragsample_patch</b> \<File\></dt>
<dd>Parche de pesos de la función de puntuación usada durante el muestreo de fragmentos puntuados<br/></dd>
<dt><b>-overwrite_filter_scorefxn</b> \<File\></dt>
<dd>forzar el uso de la función de puntuación durante la etapa de filtrado (en lugar de la última puntuación del protocolo de muestreo)<br/></dd>
<dt><b>-patch_filter_scorefxn</b> \<File\></dt>
<dd>aplicar un parche a la función de puntuación usada durante la etapa de filtrado<br/></dd>
<dt><b>-filter_cst_file</b> \<File\></dt>
<dd>usar estas restricciones para filtrar loops, además de lo que ya haya en el Pose<br/></dd>
<dt><b>-filter_cst_weight</b> \<Real\></dt>
<dd>peso de las restricciones frente a la puntuación normal (podría contener restricciones adicionales)<br/>Default: 1.0<br/></dd>
<dt><b>-fast_relax_sequence_file</b> \<File\></dt>
<dd>usar este protocolo FastRelax para la selección de loops<br/></dd>
</dl>
+ <h2>-flexpack</h2>
<dl>
<dt><b>-flexpack</b> \<Boolean\></dt>
<dd>grupo de opciones flexpack<br/></dd>
</dl>
+ <h3>-flexpack:annealer</h3>
<dl>
<dt><b>-annealer</b> \<Boolean\></dt>
<dd>grupo de opciones annealer<br/></dd>
<dt><b>-inner_iteration_scale</b> \<Real\></dt>
<dd>Aumentar o disminuir el número de iteraciones internas en el annealer flexpack<br/></dd>
<dt><b>-outer_iteration_scale</b> \<Real\></dt>
<dd>Aumentar o disminuir el número de iteraciones externas en el annealer flexpack<br/></dd>
<dt><b>-fixbb_substitutions_scale</b> \<Real\></dt>
<dd>Aumentar o disminuir el número de sustituciones de rotámeros con cadena principal fija en el annealer flexpack<br/></dd>
<dt><b>-pure_movebb_substitutions_scale</b> \<Real\></dt>
<dd>Aumentar o disminuir el número de movimientos de la cadena principal<br/></dd>
<dt><b>-rotsub_movebb_substitutions_scale</b> \<Real\></dt>
<dd>Aumentar o disminuir el número de sustituciones de rotámeros con movimientos de la cadena principal<br/></dd>
</dl>
+ <h2>-flexPepDocking</h2>
<dl>
<dt><b>-flexPepDocking</b> \<Boolean\></dt>
<dd>grupo de opciones flexPepDocking<br/></dd>
<dt><b>-params_file</b> \<String\></dt>
<dd>archivo de parámetros que describe los detalles del complejo, como los residuos de anclaje, etc.<br/></dd>
<dt><b>-peptide_anchor</b> \<Integer\></dt>
<dd>Fijar manualmente el residuo de anclaje del péptido (en lugar de usar el centro de masa<br/>Rango: 1-<br/>Default: 1<br/></dd>
<dt><b>-receptor_chain</b> \<String\></dt>
<dd>ID de cadena de la proteína receptora<br/></dd>
<dt><b>-peptide_chain</b> \<String\></dt>
<dd>ID de cadena de la proteína peptídica<br/></dd>
<dt><b>-pep_fold_only</b> \<Boolean\></dt>
<dd>Solo plegar un péptido, sin docking (en este caso no se espera ningún receptor de entrada).<br/>Default: false<br/></dd>
<dt><b>-lowres_abinitio</b> \<Boolean\></dt>
<dd>Hacer un docking de péptido ab initio de baja resolución previo<br/>Default: false<br/></dd>
<dt><b>-lowres_preoptimize</b> \<Boolean\></dt>
<dd>Hacer una optimización previa en baja resolución<br/>Default: false<br/></dd>
<dt><b>-flexPepDockingMinimizeOnly</b> \<Boolean\></dt>
<dd>Hacer solo una minimización simple de la estructura de entrada<br/>Default: false<br/></dd>
<dt><b>-extend_peptide</b> \<Boolean\></dt>
<dd>iniciar el protocolo con el péptido en conformación extendida<br/>Default: false<br/></dd>
<dt><b>-place_peptide_on_binding_site</b> \<Boolean\></dt>
<dd>coloca el péptido en el sitio de unión usando SiteConstraints<br/>Default: false<br/></dd>
<dt><b>-sample_pcs</b> \<Integer\></dt>
<dd>número de componentes principales que se usan para la colocación inicial y el volteo del péptido<br/>Rango: 0-<br/>Default: 0<br/></dd>
<dt><b>-SlideIntoContact</b> \<Boolean\></dt>
<dd>Desliza el péptido hacia el receptor o lejos de él para eliminar los choques<br/>Default: false<br/></dd>
<dt><b>-recalculate_foldtree</b> \<Boolean\></dt>
<dd>recalcula el FoldTree después de una perturbación aleatoria RB<br/>Default: false<br/></dd>
<dt><b>-pep_refine</b> \<Boolean\></dt>
<dd>Refinamiento de alta resolución del péptido sobre la superficie del receptor, equivalente a las opciones obsoletas -rbMCM -torsionsMCM<br/>Default: false<br/></dd>
<dt><b>-rbMCM</b> \<Boolean\></dt>
<dd>Hacer MCM de cuerpo rígido en el bucle principal del protocolo (obsoleto)<br/>Default: false<br/></dd>
<dt><b>-torsionsMCM</b> \<Boolean\></dt>
<dd>Hacer MCM de torsiones (small/shear) en el bucle principal del protocolo (obsoleto)<br/>Default: false<br/></dd>
<dt><b>-peptide_loop_model</b> \<Boolean\></dt>
<dd>Hacer ciclos de modelado aleatorio de loops en la cadena principal del péptido<br/>Default: false<br/></dd>
<dt><b>-backrub_peptide</b> \<Boolean\></dt>
<dd>Añade una etapa backrub al protocolo<br/>Default: false<br/></dd>
<dt><b>-boost_fa_atr</b> \<Boolean\></dt>
<dd>mientras se aumenta gradualmente fa_rep, partir de un atr alto y bajarlo al normal<br/>Default: true<br/></dd>
<dt><b>-ramp_fa_rep</b> \<Boolean\></dt>
<dd>Si se aumenta gradualmente la repulsión de todos los átomos durante el protocolo<br/>Default: true<br/></dd>
<dt><b>-ramp_rama</b> \<Boolean\></dt>
<dd>Si se aumenta gradualmente la puntuación de Ramachandran durante el protocolo<br/>Default: false<br/></dd>
<dt><b>-flexpep_score_only</b> \<Boolean\></dt>
<dd>simplemente lee el Pose y lo puntúa<br/>Default: false<br/></dd>
<dt><b>-ref_startstruct</b> \<File\></dt>
<dd>Estructura inicial alternativa para las estadísticas de puntuación, en lugar de la estructura inicial original (útil como referencia para volver a puntuar ejecuciones anteriores)<br/></dd>
<dt><b>-use_cen_score</b> \<Boolean\></dt>
<dd>en modo score_only, usa pesos centroide para puntuar<br/>Default: false<br/></dd>
<dt><b>-design_peptide</b> \<Boolean\></dt>
<dd>Añadir una etapa de diseño a cada ciclo de las perturbaciones RB-torsiones<br/>Default: false<br/></dd>
<dt><b>-rep_ramp_cycles</b> \<Integer\></dt>
<dd>Número de ciclos para el aumento gradual del término de repulsión<br/>Rango: 0-<br/>Default: 10<br/></dd>
<dt><b>-mcm_cycles</b> \<Integer\></dt>
<dd>Número de ciclos para los procedimientos mcm (rb/torsiones)<br/>Rango: 0-<br/>Default: 8<br/></dd>
<dt><b>-random_phi_psi_preturbation</b> \<Real\></dt>
<dd>Tamaño de la perturbación aleatoria de phi/psi del péptido<br/>Rango: 0.0-<br/>Default: 0.0<br/></dd>
<dt><b>-smove_angle_range</b> \<Real\></dt>
<dd>Define el tamaño de la perturbación de los movimientos small/shear<br/>Rango: 0.0-<br/>Default: 6.0<br/></dd>
<dt><b>-min_receptor_bb</b> \<Boolean\></dt>
<dd>Si se incluye la cadena principal de la proteína en la minimización<br/>Default: false<br/></dd>
<dt><b>-random_trans_start</b> \<Real\></dt>
<dd>Tamaño de la perturbación aleatoria de la traslación de cuerpo rígido del péptido<br/>Rango: 0.0-<br/>Default: 0.0<br/></dd>
<dt><b>-random_rot_start</b> \<Real\></dt>
<dd>Tamaño de la perturbación aleatoria de la rotación de cuerpo rígido del péptido<br/>Rango: 0.0-<br/>Default: 0.0<br/></dd>
<dt><b>-flexpep_prepack</b> \<Boolean\></dt>
<dd>Pre-empaquetar una estructura inicial y salir<br/>Default: false<br/></dd>
<dt><b>-flexpep_noprepack1</b> \<Boolean\></dt>
<dd>No reempaquetar las cadenas laterales de la pareja 1 ( = proteína globular).<br/>Default: false<br/></dd>
<dt><b>-flexpep_noprepack2</b> \<Boolean\></dt>
<dd>No reempaquetar las cadenas laterales de la pareja 2 ( = péptido).<br/>Default: false<br/></dd>
<dt><b>-score_filter</b> \<Real\></dt>
<dd>Escribir solo los decoys con puntuaciones menores que este filtro.<br/>Default: 10000.0<br/></dd>
<dt><b>-hb_filter</b> \<Integer\></dt>
<dd>Escribir solo los decoys con más enlaces de hidrógeno que este filtro. Actualmente no implementado: ¡NO USAR!<br/>Rango: 0-<br/>Default: 0<br/></dd>
<dt><b>-hotspot_filter</b> \<Integer\></dt>
<dd>Escribir solo los decoys con más puntos calientes (hotspots) que este filtro. Actualmente no implementado: ¡NO USAR!<br/>Rango: 0-<br/>Default: 0<br/></dd>
<dt><b>-frag5</b> \<String\></dt>
<dd>fragmentos de 5 residuos (5-mer) para flexPepDock ab initio<br/></dd>
<dt><b>-frag9_weight</b> \<Real\></dt>
<dd>Peso relativo de los 9-mers en ab initio<br/>Rango: 0-<br/>Default: 0.1<br/></dd>
<dt><b>-frag5_weight</b> \<Real\></dt>
<dd>peso relativo de los 5-mers en ab initio<br/>Rango: 0-<br/>Default: 0.25<br/></dd>
<dt><b>-frag3_weight</b> \<Real\></dt>
<dd>Peso relativo de los 3-mers en ab initio<br/>Rango: 0-<br/>Default: 1.0<br/></dd>
<dt><b>-pSer2Asp_centroid</b> \<Boolean\></dt>
<dd>convertir pSer a Asp durante el modo centroide<br/>Default: false<br/></dd>
<dt><b>-pSer2Glu_centroid</b> \<Boolean\></dt>
<dd>convertir pSer a Glu durante el modo centroide<br/>Default: false<br/></dd>
<dt><b>-dumpPDB_abinitio</b> \<Boolean\></dt>
<dd>volcar PDB durante el Monte Carlo ab initio<br/>Default: false<br/></dd>
<dt><b>-dumpPDB_lowres</b> \<Boolean\></dt>
<dd>volcar PDB durante el Monte Carlo de baja resolución<br/>Default: false<br/></dd>
<dt><b>-dumpPDB_hires</b> \<Boolean\></dt>
<dd>volcar PDB durante el Monte Carlo de alta resolución<br/>Default: false<br/></dd>
</dl>
+ <h2>-FloppyTail</h2>
<dl>
<dt><b>-FloppyTail</b> \<Boolean\></dt>
<dd>grupo de opciones FloppyTail<br/></dd>
<dt><b>-flexible_start_resnum</b> \<Integer\></dt>
<dd>residuo inicial de la región flexible, con numeración PDB<br/>Default: 180<br/></dd>
<dt><b>-flexible_stop_resnum</b> \<Integer\></dt>
<dd>residuo final de la región flexible, con numeración PDB. Si no se especifica, se asume el final del Pose.<br/>Default: 0<br/></dd>
<dt><b>-flexible_chain</b> \<String\></dt>
<dd>ID de cadena de la región flexible<br/>Default: "C"<br/></dd>
<dt><b>-shear_on</b> \<Real\></dt>
<dd>fracción de movimientos de perturbación cuando se activa shear (0.5 = a la mitad)<br/>Default: 1.0/3.0<br/></dd>
<dt><b>-pair_off</b> \<Boolean\></dt>
<dd>desactivar el término de electrostática Epair. Se usó una vez para un experimento secundario simple; no está pensado para uso general.<br/>Default: false<br/></dd>
<dt><b>-publication</b> \<Boolean\></dt>
<dd>escribir las estadísticas usadas en la publicación. DESACTÍVALO si no estás ejecutando la demostración de la publicación.<br/>Default: false<br/></dd>
<dt><b>-C_root</b> \<Boolean\></dt>
<dd>Reubicar la raíz del fold_tree en el extremo C. Si tu región flexible es N-terminal, o está más cerca de la primera mitad del Pose, esto acelerará el cálculo.<br/>Default: false<br/></dd>
<dt><b>-COM_root</b> \<Boolean\></dt>
<dd>Reubicar la raíz del fold_tree en el centro de masa. Esto permite agitar a la vez los extremos N y C.<br/>Default: false<br/></dd>
<dt><b>-force_linear_fold_tree</b> \<Boolean\></dt>
<dd>Forzar un FoldTree lineal. Se usa en combinación con C_root y con reordenar las cadenas de tu PDB de entrada para asegurar que obtengas exactamente la cinemática correcta<br/>Default: false<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>modo de depuración (comprobaciones extra y volcados de pdb)<br/>Default: false<br/></dd>
<dt><b>-cen_weights</b> \<String\></dt>
<dd>Usar una función de puntuación diferente/personalizada para el paso centroide<br/></dd>
<dt><b>-perturb_show</b> \<Boolean\></dt>
<dd>volcar los pdb centroide perturbados además de los resultados finales<br/>Default: false<br/></dd>
<dt><b>-perturb_cycles</b> \<Integer\></dt>
<dd>la fase de perturbación se ejecuta durante <input> ciclos<br/>Default: 5<br/></dd>
<dt><b>-perturb_temp</b> \<Real\></dt>
<dd>temperatura de Monte Carlo de la fase de perturbación<br/>Default: 0.8<br/></dd>
<dt><b>-refine_cycles</b> \<Integer\></dt>
<dd>la fase de refinamiento se ejecuta durante <input> ciclos<br/>Default: 5<br/></dd>
<dt><b>-refine_temp</b> \<Real\></dt>
<dd>temperatura de Monte Carlo de la fase de refinamiento<br/>Default: 0.8<br/></dd>
<dt><b>-refine_repack_cycles</b> \<Integer\></dt>
<dd>la fase de refinamiento reempaqueta cada <input> ciclos<br/>Rango: 2-<br/>Default: 20<br/></dd>
</dl>
+ <h3>-FloppyTail:short_tail</h3>
<dl>
<dt><b>-short_tail</b> \<Boolean\></dt>
<dd>grupo de opciones short_tail<br/></dd>
<dt><b>-short_tail_fraction</b> \<Real\></dt>
<dd>qué fracción del segmento flexible se usa en la sección de cola corta del refinamiento (no compatible con regiones flexibles no terminales)<br/>Default: 1.0<br/></dd>
<dt><b>-short_tail_off</b> \<Real\></dt>
<dd>fracción de ciclos de refinamiento en los que el MoveMap vuelve a la cola completa (0.5 = a la mitad)<br/>Default: 0.0<br/></dd>
</dl>
+ <h2>-flxbb</h2>
<dl>
<dt><b>-flxbb</b> \<Boolean\></dt>
<dd>grupo de opciones flxbb<br/></dd>
<dt><b>-view</b> \<Boolean\></dt>
<dd>ver el Pose durante el protocolo<br/></dd>
<dt><b>-ncycle</b> \<Integer\></dt>
<dd>número de ciclos de diseño y relax<br/></dd>
<dt><b>-constraints_sheet</b> \<Real\></dt>
<dd>peso de las restricciones entre átomos Ca en la lámina beta<br/></dd>
<dt><b>-constraints_sheet_include_cacb_pseudotorsion</b> \<Boolean\></dt>
<dd>añade una restricción adicional a dos residuos emparejados en una lámina beta para asegurar que sus vectores CA-CB apunten en la misma dirección.<br/>Default: false<br/></dd>
<dt><b>-constraints_NtoC</b> \<Real\></dt>
<dd>peso de las restricciones entre los átomos CA N- y C-terminales<br/></dd>
<dt><b>-filter_trial</b> \<Integer\></dt>
<dd>número de intentos de filtrado <br/></dd>
<dt><b>-filter_type</b> \<String\></dt>
<dd>nombre del tipo de filtro; por ahora solo está disponible packstat<br/></dd>
<dt><b>-blueprint</b> \<File\></dt>
<dd>archivo blueprint <br/></dd>
<dt><b>-movemap_from_blueprint</b> \<Boolean\></dt>
<dd>ver el Pose durante el protocolo<br/></dd>
</dl>
+ <h3>-flxbb:layer</h3>
<dl>
<dt><b>-layer</b> \<String\></dt>
<dd>diseñar el núcleo, el borde y la superficie con distintos tipos de aminoácidos<br/>Default: "normal"<br/></dd>
</dl>
+ <h2>-fold_and_dock</h2>
<dl>
<dt><b>-fold_and_dock</b> \<Boolean\></dt>
<dd>grupo de opciones fold_and_dock<br/></dd>
<dt><b>-move_anchor_points</b> \<Boolean\></dt>
<dd>mover los puntos de anclaje que definen el sistema de coordenadas simétrico durante la inserción de fragmentos simétrica<br/>Default: false<br/></dd>
<dt><b>-set_anchor_at_closest_point</b> \<Boolean\></dt>
<dd>fijar los puntos de anclaje que definen el sistema de coordenadas simétrico en el punto más cercano entre dos cadenas consecutivas durante la inserción de fragmentos<br/>Default: false<br/></dd>
<dt><b>-rotate_anchor_to_x</b> \<Boolean\></dt>
<dd>rotar el residuo de anclaje al eje x antes de aplicar transformaciones de cuerpo rígido<br/>Default: true<br/></dd>
<dt><b>-trans_mag_smooth</b> \<Real\></dt>
<dd>tamaño de la perturbación traslacional para el refinamiento suave<br/>Default: 0.1<br/></dd>
<dt><b>-rot_mag_smooth</b> \<Real\></dt>
<dd>tamaño de la perturbación rotacional para el refinamiento suave<br/>Default: 1.0<br/></dd>
<dt><b>-rb_rot_magnitude</b> \<Real\></dt>
<dd>tamaño de la perturbación rotacional para las perturbaciones de cuerpo rígido<br/>Default: 8.0<br/></dd>
<dt><b>-rb_trans_magnitude</b> \<Real\></dt>
<dd>tamaño de la perturbación traslacional para las perturbaciones de cuerpo rígido<br/>Default: 3.0<br/></dd>
<dt><b>-rigid_body_cycles</b> \<Integer\></dt>
<dd>número de ciclos de cuerpo rígido durante la inserción de fragmentos de plegamiento y docking<br/>Default: 50<br/></dd>
<dt><b>-move_anchor_frequency</b> \<Real\></dt>
<dd>Frecuencia de los movimientos slide-anchor<br/>Default: 1.0<br/></dd>
<dt><b>-rigid_body_frequency</b> \<Real\></dt>
<dd>La fracción de veces que se aplican ciclos de cuerpo rígido durante los movimientos de ensamblaje de fragmentos<br/>Default: 0.2<br/></dd>
<dt><b>-rigid_body_disable_mc</b> \<Boolean\></dt>
<dd>No permitir que los movimientos se acepten localmente por el criterio de MC dentro del mover de cuerpo rígido <br/>Default: false<br/></dd>
<dt><b>-slide_contact_frequency</b> \<Real\></dt>
<dd>La fracción de veces que las subunidades se deslizan juntas durante los movimientos de ensamblaje de fragmentos<br/>Default: 0.1<br/></dd>
</dl>
+ <h2>-fold_cst</h2>
<dl>
<dt><b>-fold_cst</b> \<Boolean\></dt>
<dd>grupo de opciones fold_cst<br/></dd>
<dt><b>-constraint_skip_rate</b> \<Real\></dt>
<dd>si es, p. ej., 0.95, seleccionará al azar el 5% de las restricciones en cada ronda; la puntuación de todas las restricciones va en una columna extra<br/>Default: 0<br/></dd>
<dt><b>-violation_skip_basis</b> \<Integer\></dt>
<dd>la tasa de omisión local es viol/base<br/>Default: 100<br/></dd>
<dt><b>-violation_skip_ignore</b> \<Integer\></dt>
<dd>sin omisión para números por debajo de este nivel<br/>Default: 10<br/></dd>
<dt><b>-keep_skipped_csts</b> \<Boolean\></dt>
<dd>puntuación final solo con las restricciones activas<br/>Default: false<br/></dd>
<dt><b>-no_minimize</b> \<Boolean\></dt>
<dd>Sin movimientos de minimización en el protocolo fold_constraints. Útil para probar si los movimientos de fragmentos por sí solos pueden reproducir una estructura dada.<br/>Default: false<br/></dd>
<dt><b>-force_minimize</b> \<Boolean\></dt>
<dd>Movimientos de minimización en el protocolo fold_constraints incluso si no hay restricciones<br/>Default: false<br/></dd>
<dt><b>-seq_sep_stages</b> \<RealVector\></dt>
<dd>dar un vector con la separación de secuencia después de la etapa1, la etapa3 y la etapa4<br/>Default: 0<br/></dd>
<dt><b>-reramp_cst_cycles</b> \<Integer\></dt>
<dd>en la etapa2, hacer xxx ciclos en los que atom_pair_constraint aumenta gradualmente<br/>Default: 0<br/></dd>
<dt><b>-reramp_start_cstweight</b> \<Real\></dt>
<dd>bajar cst_weight a este valor y aumentarlo hasta 1.0 en la etapa2; requiere reramp_cst_cycles > 0<br/>Default: 0.01<br/></dd>
<dt><b>-reramp_iterations</b> \<Integer\></dt>
<dd>hacer X bucles de ciclos de annealing<br/>Default: 1<br/></dd>
<dt><b>-skip_on_noviolation_in_stage1</b> \<Boolean\></dt>
<dd>si las restricciones no informan violaciones, omitir los ciclos<br/>Default: false<br/></dd>
<dt><b>-stage1_ramp_cst_cycle_factor</b> \<Real\></dt>
<dd>dedicar x*<ciclos estándar> a cada paso de separación de secuencia<br/>Default: 0.25<br/></dd>
<dt><b>-stage2_constraint_threshold</b> \<Real\></dt>
<dd>detener las ejecuciones que violen este umbral al final de la etapa2<br/>Default: 0<br/></dd>
<dt><b>-ignore_sequence_seperation</b> \<Boolean\></dt>
<dd>normalmente las restricciones se activan según su separación en el fold-tree<br/>Default: false<br/></dd>
<dt><b>-no_recover_low_at_constraint_switch</b> \<Boolean\></dt>
<dd>no recuperar el mejor (low) cuando aumenta max_seq_sep<br/>Default: false<br/></dd>
<dt><b>-ramp_coord_cst</b> \<Boolean\></dt>
<dd>aumentar gradualmente las restricciones de coordenadas igual que los pesos de chainbreak durante fold-cst<br/>Default: false<br/></dd>
</dl>
+ <h2>-fold_from_loops</h2>
<dl>
<dt><b>-fold_from_loops</b> \<Boolean\></dt>
<dd>grupo de opciones fold_from_loops<br/></dd>
<dt><b>-native_ca_cst</b> \<Boolean\></dt>
<dd>derivar restricciones de la topología nativa<br/>Default: false<br/></dd>
<dt><b>-swap_loops</b> \<File\></dt>
<dd>pdb de los loops objetivo <br/>Default: "--"<br/></dd>
<dt><b>-checkpoint</b> \<String\></dt>
<dd>escribir/leer archivos de punto de control para nstruct. Indica un nombre de archivo de punto de control después de esta opción.<br/>Default: ""<br/></dd>
<dt><b>-ca_csts_dev</b> \<Real\></dt>
<dd>desviación estándar permitida a cada restricción<br/>Default: 0.5<br/></dd>
<dt><b>-add_relax_cycles</b> \<Integer\></dt>
<dd>ciclos de relax adicionales<br/>Default: 2<br/></dd>
<dt><b>-loop_mov_nterm</b> \<Integer\></dt>
<dd>Región móvil dentro del loop proporcionado (extremo N)<br/>Default: 0<br/></dd>
<dt><b>-loop_mov_cterm</b> \<Integer\></dt>
<dd>Región móvil dentro del loop proporcionado (extremo C)<br/>Default: 0<br/></dd>
<dt><b>-ca_rmsd_cutoff</b> \<Real\></dt>
<dd>Filtrar los decoys para que pasen la etapa relax-diseño <br/>Default: 5.0<br/></dd>
<dt><b>-res_design_bs</b> \<IntegerVector\></dt>
<dd>enumerar los residuos que se diseñarán dentro del sitio de unión fijo<br/></dd>
<dt><b>-clear_csts</b> \<File\></dt>
<dd>archivo de loops de entrada con rangos libres de restricciones CA<br/>Default: "--"<br/></dd>
<dt><b>-output_centroid</b> \<Boolean\></dt>
<dd>escribir las estructuras centroide antes de la etapa de diseño<br/>Default: false<br/></dd>
<dt><b>-add_cst_loop</b> \<Boolean\></dt>
<dd>añadir restricciones CA del motivo al conjunto de restricciones<br/>Default: false<br/></dd>
</dl>
+ <h2>-frags</h2>
<dl>
<dt><b>-frags</b> \<Boolean\></dt>
<dd>grupo de opciones frags<br/></dd>
<dt><b>-j</b> \<Integer\></dt>
<dd>Número de hilos que se usarán. El valor por defecto, 0, significa usar todos los hilos disponibles. Ten en cuenta que el total de hilos debe fijarse con -multithreading:total_threads. (El selector de fragmentos no puede usar más hilos de los que se hayan lanzado).<br/>Default: 0<br/></dd>
<dt><b>-filter_JC</b> \<Boolean\></dt>
<dd>Filtrar los valores de acoplamiento J en el rango dinámico <br/>Default: false<br/></dd>
<dt><b>-bounded_protocol</b> \<Boolean\></dt>
<dd>hace que el picker use el protocolo bounded para seleccionar fragmentos. Este es el comportamiento por defecto<br/>Default: true<br/></dd>
<dt><b>-keep_all_protocol</b> \<Boolean\></dt>
<dd>hace que el picker use el protocolo keep-all para seleccionar fragmentos. Por defecto es el protocolo bounded<br/>Default: false<br/></dd>
<dt><b>-quota_protocol</b> \<Boolean\></dt>
<dd>el protocolo quota implica el uso de un QuotaCollector y un QuotaSelector, sin importar lo que el usuario configure con otras opciones.<br/>Default: false<br/></dd>
<dt><b>-nonlocal_pairs</b> \<Boolean\></dt>
<dd>identifica y escribe pares de fragmentos no locales.<br/>Default: false<br/></dd>
<dt><b>-fragment_contacts</b> \<Boolean\></dt>
<dd>identifica y escribe contactos de fragmentos.<br/>Default: false<br/></dd>
<dt><b>-p_value_selection</b> \<Boolean\></dt>
<dd>la selección final de fragmentos se basará en el valor p en lugar de en una puntuación total del fragmento dado<br/>Default: false<br/></dd>
<dt><b>-n_frags</b> \<Integer\></dt>
<dd>número de fragmentos por posición<br/>Default: 200<br/></dd>
<dt><b>-allowed_pdb</b> \<File\></dt>
<dd>proporciona un archivo de texto con las cadenas PDB permitidas (cinco caracteres por entrada, p. ej. '4mbA'). Solo se usarán estas cadenas PDB de Vall para elegir fragmentos<br/></dd>
<dt><b>-ss_pred</b> \<StringVector\></dt>
<dd>proporciona uno o más archivos con predicción de estructura secundaria (formato PsiPred SS2), para usar en la puntuación de estructura secundaria y en el quota selector. Cada nombre de archivo debe ir seguido de un ID en forma de cadena.<br/></dd>
<dt><b>-spine_x</b> \<File\></dt>
<dd>proporciona predicciones de ángulos de torsión phi y psi y de accesibilidad al solvente de Spine-X<br/></dd>
<dt><b>-depth</b> \<File\></dt>
<dd>proporciona valores de profundidad de residuos de DEPTH<br/></dd>
<dt><b>-denied_pdb</b> \<File\></dt>
<dd>proporciona un archivo de texto con las cadenas PDB denegadas (cinco caracteres por entrada, p. ej. '4mbA'). Así se pueden excluir homólogos cercanos de la selección de fragmentos.<br/></dd>
<dt><b>-frag_sizes</b> \<IntegerVector\></dt>
<dd>tamaños de los fragmentos que se eligen de vall<br/>Default: ['9', '3', '1']<br/></dd>
<dt><b>-write_ca_coordinates</b> \<Boolean\></dt>
<dd>El selector de fragmentos guardará las coordenadas cartesianas de CA en los archivos de fragmentos de salida. Por defecto solo se guardan las coordenadas de torsión.<br/>Default: false<br/></dd>
<dt><b>-write_scores</b> \<Boolean\></dt>
<dd>El selector de fragmentos escribirá las puntuaciones en los archivos de fragmentos de salida.<br/>Default: false<br/></dd>
<dt><b>-annotate</b> \<Boolean\></dt>
<dd>leer la anotación del archivo de fragmentos de rosetta++<br/>Default: false<br/></dd>
<dt><b>-nr_large_copies</b> \<Integer\></dt>
<dd>hacer N copias de cada fragmento 9mer estándar (o similar)<br/>Default: 1<br/></dd>
<dt><b>-n_candidates</b> \<Integer\></dt>
<dd>número de fragmentos candidatos por posición; los fragmentos finales se seleccionarán de entre ellos<br/>Default: 200<br/></dd>
<dt><b>-write_rama_tables</b> \<Boolean\></dt>
<dd>El selector de fragmentos escribirá tablas de puntuación de Ramachandran específicas de secuencia para tu disfrute. Estas tablas de Ramachandran se basan en las predicciones de estructura secundaria que se dan a RamaScore, y de vez en cuando puede que quieras ver qué ha definido el programa.<br/>Default: false<br/></dd>
<dt><b>-rama_C</b> \<Real\></dt>
<dd>Constante de la ecuación de RamaScore; la línea de comandos es para pruebas de optimización<br/>Default: 0.0<br/></dd>
<dt><b>-rama_B</b> \<Real\></dt>
<dd>Constante de la ecuación de RamaScore; la línea de comandos es para pruebas de optimización<br/>Default: 1.0<br/></dd>
<dt><b>-sigmoid_cs_A</b> \<Real\></dt>
<dd>Constante de la ecuación de CSScore; la línea de comandos es para pruebas de optimización<br/>Default: 2.0<br/></dd>
<dt><b>-sigmoid_cs_B</b> \<Real\></dt>
<dd>Constante de la ecuación de CSScore; la línea de comandos es para pruebas de optimización<br/>Default: 4.0<br/></dd>
<dt><b>-seqsim_H</b> \<Real\></dt>
<dd>Multiplicador de la predicción del tipo de estructura secundaria, para usar en la selección de fragmentos<br/>Default: 1.0<br/></dd>
<dt><b>-seqsim_E</b> \<Real\></dt>
<dd>Multiplicador de la predicción del tipo de estructura secundaria, para usar en la selección de fragmentos<br/>Default: 1.0<br/></dd>
<dt><b>-seqsim_L</b> \<Real\></dt>
<dd>Multiplicador de la predicción del tipo de estructura secundaria, para usar en la selección de fragmentos<br/>Default: 1.0<br/></dd>
<dt><b>-rama_norm</b> \<Real\></dt>
<dd>Se usa para multiplicar los valores de la tabla rama tras la normalización; el valor por defecto (0.0) significa usar los recuentos brutos (sin normalizar)<br/>Default: 0.0<br/></dd>
<dt><b>-describe_fragments</b> \<String\></dt>
<dd>Escribe las puntuaciones de todos los fragmentos en un archivo<br/>Default: ""<br/></dd>
<dt><b>-picking_old_max_score</b> \<Real\></dt>
<dd>puntuación máxima permitida para los fragmentos elegidos con el antiguo vall (usado por RosettaRemodel).<br/>Default: 1000000.0<br/></dd>
<dt><b>-write_sequence_only</b> \<Boolean\></dt>
<dd>El selector de fragmentos escribirá solo las secuencias de los fragmentos. Esta opción sirve para crear perfiles de secuencia basados en estructura usando la puntuación FragmentCrmsdResDepth.<br/>Default: false<br/></dd>
<dt><b>-output_silent</b> \<Boolean\></dt>
<dd>El selector de fragmentos escribirá los fragmentos en un silent file.<br/>Default: false<br/></dd>
<dt><b>-output_index</b> \<Boolean\></dt>
<dd>El selector de fragmentos escribirá los fragmentos en un archivo de índice.<br/>Default: false<br/></dd>
<dt><b>-score_output_silent</b> \<Boolean\></dt>
<dd>El selector de fragmentos escribirá los fragmentos en un silent file. Las puntuaciones de los fragmentos relajados se añaden al silent file.<br/>Default: false<br/></dd>
</dl>
+ <h3>-frags:scoring</h3>
<dl>
<dt><b>-scoring</b> \<Boolean\></dt>
<dd>grupo de opciones scoring<br/></dd>
<dt><b>-config</b> \<File\></dt>
<dd>esquema de puntuación usado para elegir fragmentos<br/>Default: ""<br/></dd>
<dt><b>-profile_score</b> \<String\></dt>
<dd>esquema de puntuación usado para la comparación perfil-perfil<br/>Default: "L1"<br/></dd>
</dl>
+ <h3>-frags:picking</h3>
<dl>
<dt><b>-picking</b> \<Boolean\></dt>
<dd>grupo de opciones picking<br/></dd>
<dt><b>-selecting_rule</b> \<String\></dt>
<dd>la forma en que se seleccionan los fragmentos de entre los candidatos, p. ej. QuotaSelector o BestTotalScoreSelector<br/>Default: "BestTotalScoreSelector"<br/></dd>
<dt><b>-selecting_scorefxn</b> \<String\></dt>
<dd>en caso de que el usuario elija usar BestTotalScoreSelector, esta opción proporciona una función de puntuación personalizada para usar en el paso de selección<br/></dd>
<dt><b>-quota_config_file</b> \<File\></dt>
<dd>proporciona un archivo de configuración para el quota selector<br/></dd>
<dt><b>-query_pos</b> \<IntegerVector\></dt>
<dd>indica las posiciones de la secuencia para las que se elegirán fragmentos. Por defecto se eligen fragmentos para toda la secuencia de consulta<br/></dd>
</dl>
+ <h3>-frags:nonlocal</h3>
<dl>
<dt><b>-nonlocal</b> \<Boolean\></dt>
<dd>grupo de opciones nonlocal<br/></dd>
<dt><b>-relax_input</b> \<Boolean\></dt>
<dd>aplicar relax a la entrada antes de ejecutar el protocolo<br/></dd>
<dt><b>-relax_input_with_coordinate_constraints</b> \<Boolean\></dt>
<dd>aplicar relax a la entrada con restricciones de coordenadas antes de ejecutar el protocolo<br/></dd>
<dt><b>-relax_frags_repeats</b> \<Integer\></dt>
<dd>repeticiones de relax para relajar el par de fragmentos<br/></dd>
<dt><b>-single_chain</b> \<Boolean\></dt>
<dd>los pares de fragmentos no locales se restringirán a la misma cadena<br/></dd>
<dt><b>-min_contacts_per_res</b> \<Real\></dt>
<dd>contactos mínimos por residuo del fragmento para que se considere un par de fragmentos<br/>Default: 1.0<br/></dd>
<dt><b>-max_ddg_score</b> \<Real\></dt>
<dd>puntuación DDG máxima del par de fragmentos<br/></dd>
<dt><b>-max_rmsd_after_relax</b> \<Real\></dt>
<dd>rmsd máximo del par de fragmentos después de relax<br/></dd>
<dt><b>-output_frags_pdbs</b> \<Boolean\></dt>
<dd>escribir los PDB de pares de fragmentos no locales<br/></dd>
<dt><b>-output_idealized</b> \<Boolean\></dt>
<dd>escribir un Pose idealizado que se puede usar para generar un nuevo VALL<br/></dd>
<dt><b>-output_silent</b> \<Boolean\></dt>
<dd>escribir el silent file de pares de fragmentos no locales<br/>Default: true<br/></dd>
</dl>
+ <h3>-frags:contacts</h3>
<dl>
<dt><b>-contacts</b> \<Boolean\></dt>
<dd>grupo de opciones contacts<br/></dd>
<dt><b>-min_seq_sep</b> \<Integer\></dt>
<dd>separación mínima de secuencia entre contactos<br/>Default: 12<br/></dd>
<dt><b>-dist_cutoffs</b> \<RealVector\></dt>
<dd>cortes de distancia para considerarse un contacto. Solo se guardarán los recuentos de contactos.<br/>Default: ['9.0']<br/></dd>
<dt><b>-centroid_distance_scale_factor</b> \<Real\></dt>
<dd>Factor de escala de los cortes de distancia centroide.<br/>Default: 1.0<br/></dd>
<dt><b>-type</b> \<StringVector\></dt>
<dd>Átomo que se considera para los contactos<br/>Default: utility::vector1<std::string>(1,"ca")<br/></dd>
<dt><b>-neighbors</b> \<Integer\></dt>
<dd>número de residuos adyacentes a un contacto para encontrar contactos vecinos<br/>Default: 0<br/></dd>
<dt><b>-output_all</b> \<Boolean\></dt>
<dd>escribir todos los contactos<br/>Default: false<br/></dd>
</dl>
+ <h3>-frags:ABEGO</h3>
<dl>
<dt><b>-ABEGO</b> \<Boolean\></dt>
<dd>grupo de opciones ABEGO<br/></dd>
<dt><b>-phi_psi_range_A</b> \<Real\></dt>
<dd>Filtrar además phi y psi durante el proceso de selección de fragmentos en diseño<br/>Default: 999.0<br/></dd>
</dl>
+ <h2>-helical_bundle_predict</h2>
<dl>
<dt><b>-helical_bundle_predict</b> \<Boolean\></dt>
<dd>grupo de opciones helical_bundle_predict<br/></dd>
<dt><b>-sequence_file</b> \<String\></dt>
<dd>Nombre de un archivo que especifica la secuencia, como una serie de nombres completos de residuos separados por espacios en blanco (p. ej. ALA LYS DARG DPRO HYP). Entrada obligatoria para la aplicación simple_cycpep_predict, salvo que se proporcione -in:file:fasta.<br/></dd>
<dt><b>-helix_assignment_file</b> \<File\></dt>
<dd>Un archivo que contiene información sobre los tipos de hélice y las regiones helicoidales de un haz helicoidal.<br/>Default: ""<br/></dd>
<dt><b>-psipred_file</b> \<File\></dt>
<dd>Un archivo producido por PsiPred, con columnas que indican la posición, la probabilidad de hélice alfa, la probabilidad de hebra beta y la probabilidad de espiral aleatoria. Es una alternativa a helix_assignment_file para predicciones con aminoácidos canónicos.<br/>Default: ""<br/></dd>
<dt><b>-psipred_alpha_helix_prob_cutoff</b> \<Real\></dt>
<dd>El corte de probabilidad por encima del cual una posición se asigna como alfa-helicoidal al usar un archivo PsiPred. Por defecto, 0.75.<br/>Default: 0.75<br/></dd>
<dt><b>-psipred_beta_strand_prob_cutoff</b> \<Real\></dt>
<dd>El corte de probabilidad por encima del cual una posición se asigna a una conformación de hebra beta al usar un archivo PsiPred. Por defecto, 0.75.<br/>Default: 0.75<br/></dd>
<dt><b>-num_simulated_annealing_rounds_centroid</b> \<Integer\></dt>
<dd>Número de rondas de recocido simulado (simulated annealing) en modo centroide.<br/>Default: 3<br/></dd>
<dt><b>-num_steps_per_simulated_annealing_round_centroid</b> \<Integer\></dt>
<dd>Número de pasos en cada ronda de recocido simulado en modo centroide.<br/>Default: 1000<br/></dd>
<dt><b>-centroid_max_temperature</b> \<Real\></dt>
<dd>La temperatura máxima durante las rondas de recocido simulado en modo centroide.<br/>Default: 50.0<br/></dd>
<dt><b>-centroid_min_temperature</b> \<Real\></dt>
<dd>La temperatura mínima durante las rondas de recocido simulado en modo centroide.<br/>Default: 0.62<br/></dd>
<dt><b>-do_final_fullatom_refinement</b> \<Boolean\></dt>
<dd>Si es true, el modelo centroide inicial se convierte en un modelo de todos los átomos y se relaja con el protocolo FastRelax. También se pueden llevar a cabo otros pasos de refinamiento, como la búsqueda de puentes disulfuro. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-fast_relax_rounds</b> \<Integer\></dt>
<dd>El número de rondas de FastRelax que se aplicarán. No hace nada si do_final_fullatom_refinement es false. Por defecto es 3.<br/>Default: 3<br/></dd>
<dt><b>-find_disulfides</b> \<Boolean\></dt>
<dd>Si es true, los pasos de refinamiento de todos los átomos incluyen probar permutaciones de puentes disulfuro. No hace nada si do_final_fullatom_refinement es false. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-ignore_native_residues_in_rmsd</b> \<IntegerVector\></dt>
<dd>Una lista, separada por espacios en blanco, de residuos del Pose proporcionado con -in:file:native que NO deben usarse para calcular el RMSD. El alineamiento omitirá estos residuos. Por ejemplo, si las estructuras generadas tienen 10 residuos, el nativo tiene 11 y se omite el residuo 5, los residuos 1-4 se alinearán con los residuos 1-4 de las estructuras generadas, y los residuos 6-11 del nativo se alinearán con los residuos 5-10 de las estructuras generadas.<br/></dd>
<dt><b>-ignore_prediction_residues_in_rmsd</b> \<IntegerVector\></dt>
<dd>Una lista, separada por espacios en blanco, de residuos de los Poses generados que se ignorarán al alinear con el Pose proporcionado con -in:file:native. Estos residuos se omiten en el alineamiento; así, si, por ejemplo, se especifican los residuos 3 y 4, y las estructuras generadas tienen 12 residuos y la estructura nativa tiene 10, se alinearán los residuos 1-2 de ambas estructuras, y los residuos 5-12 de las estructuras generadas se alinearán con los residuos 3-10 del nativo.<br/></dd>
</dl>
+ <h2>-holes</h2>
<dl>
<dt><b>-holes</b> \<Boolean\></dt>
<dd>grupo de opciones holes<br/></dd>
<dt><b>-dalphaball</b> \<File\></dt>
<dd>El programa DAlaphaBall_surf<br/></dd>
<dt><b>-params</b> \<File\></dt>
<dd>Archivo que contiene parámetros de puntuación<br/>Default: "holes_params.dat"<br/></dd>
<dt><b>-h_mode</b> \<Integer\></dt>
<dd>incluir H o no... consulta PoseBalls.cc<br/>Default: 0<br/></dd>
<dt><b>-water</b> \<Boolean\></dt>
<dd>incluir agua o no<br/>Default: false<br/></dd>
<dt><b>-make_pdb</b> \<Boolean\></dt>
<dd>crear un pdb con las puntuaciones<br/>Default: false<br/></dd>
<dt><b>-make_voids</b> \<Boolean\></dt>
<dd>hacer un cálculo de huecos aparte, LENTO<br/>Default: false<br/></dd>
<dt><b>-atom_scores</b> \<Boolean\></dt>
<dd>escribir las puntuaciones de todos los átomos<br/>Default: false<br/></dd>
<dt><b>-residue_scores</b> \<Boolean\></dt>
<dd>escribir las puntuaciones de todos los residuos (promedio sobre los átomos)<br/>Default: false<br/></dd>
<dt><b>-minimize</b> \<String\></dt>
<dd>parámetros de RosettaHoles que se usarán: decoy15, decoy25 o resl<br/>Default: "decoy15"<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>volcar la salida de depuración<br/>Default: false<br/></dd>
</dl>
+ <h2>-hotspot</h2>
<dl>
<dt><b>-hotspot</b> \<Boolean\></dt>
<dd>grupo de opciones hotspot<br/></dd>
<dt><b>-allow_gly</b> \<Boolean\></dt>
<dd>¿Permitir glicinas en las restricciones del hashing de puntos calientes?<br/>Default: false<br/></dd>
<dt><b>-allow_proline</b> \<Boolean\></dt>
<dd>¿Permitir prolinas en las restricciones del hashing de puntos calientes?<br/>Default: false<br/></dd>
<dt><b>-benchmark</b> \<Boolean\></dt>
<dd>¿Puntuar la interfaz existente?<br/>Default: false<br/></dd>
<dt><b>-residue</b> \<StringVector\></dt>
<dd>name3 del residuo mini que se usará para el hashing de puntos calientes<br/>Default: utility::vector1<std::string>(1,"ALL")<br/></dd>
<dt><b>-hashfile</b> \<File\></dt>
<dd>Archivo de hash de puntos calientes existente.<br/></dd>
<dt><b>-target</b> \<File\></dt>
<dd>PDB objetivo del hash de puntos calientes. Se usa tanto para el hashing de novo como para crear mapas de densidad del hash.<br/></dd>
<dt><b>-target_res</b> \<Integer\></dt>
<dd>Número de residuo de Rosetta de interés en el PDB objetivo. Se usa para el hashing dirigido<br/></dd>
<dt><b>-target_dist</b> \<Real\></dt>
<dd>Distancia tolerada al residuo objetivo. Se usa para el hashing dirigido<br/>Default: 20<br/></dd>
<dt><b>-density</b> \<File\></dt>
<dd>Nombre de archivo donde escribir la densidad de puntos calientes *sin ponderar* (en comparación con el PDB de -target).<br/></dd>
<dt><b>-weighted_density</b> \<File\></dt>
<dd>Nombre de archivo donde escribir la densidad de puntos calientes *ponderada por puntuación* (en comparación con el PDB de -target).<br/></dd>
<dt><b>-rms_target</b> \<File\></dt>
<dd>Nombre de archivo donde escribir el mejor rms del punto caliente respecto al complejo objetivo. Adecuado para pymol data2b_res<br/></dd>
<dt><b>-rms_hotspot</b> \<File\></dt>
<dd>Nombre de archivo donde escribir el mejor rms del punto caliente respecto al complejo objetivo. Adecuado para gráficos de dispersión de rms frente a E.<br/></dd>
<dt><b>-rms_hotspot_res</b> \<Integer\></dt>
<dd>Número de residuo de Rosetta que se usará para calcular rms_hotspot.<br/></dd>
<dt><b>-rescore</b> \<Boolean\></dt>
<dd>Volver a puntuar los puntos calientes de -hashfile con base en el PDB de -target suministrado.<br/>Default: false<br/></dd>
<dt><b>-threshold</b> \<Real\></dt>
<dd>Umbral de puntuación para aceptar puntos calientes. Los puntos calientes encontrados deben ser mejores o iguales al umbral<br/>Default: -1.0<br/></dd>
<dt><b>-sc_only</b> \<Boolean\></dt>
<dd>¿Hacer virtuales los átomos de la cadena principal para encontrar puntos calientes solo de cadena lateral?<br/>Default: true<br/></dd>
<dt><b>-fxnal_group</b> \<Boolean\></dt>
<dd>Usar solo el grupo funcional de un stub para los cálculos de rmsd.<br/>Default: true<br/></dd>
<dt><b>-cluster</b> \<Boolean\></dt>
<dd>Agrupar el conjunto de stubs. Ocurrirá antes de colonyE.<br/>Default: false<br/></dd>
<dt><b>-colonyE</b> \<Boolean\></dt>
<dd>Volver a puntuar los puntos calientes de -hashfile con base en la energía de colonia.<br/>Default: false<br/></dd>
<dt><b>-length</b> \<Integer\></dt>
<dd>Longitud del péptido de punto caliente que se usa para el hashing. El grupo que contiene la cadena lateral estará en el centro.<br/>Default: 1<br/></dd>
<dt><b>-envhb</b> \<Boolean\></dt>
<dd>Usar enlaces de hidrógeno dependientes del entorno al puntuar puntos calientes.<br/>Default: false<br/></dd>
<dt><b>-angle</b> \<Real\></dt>
<dd>Ángulo máximo permitido entre stubCA, el centro de masa del objetivo y stubCB. Se usa para determinar si el stub apunta hacia el objetivo. Los números negativos desactivan esta comprobación (por defecto)<br/>Default: -1<br/></dd>
<dt><b>-angle_res</b> \<Integer\></dt>
<dd>Residuo que se usa para el cálculo del ángulo entre stubCA, <esta opción> y stubCB. Se usa para determinar si el stub apunta hacia el objetivo. 0 usa el valor por defecto, que es el centro de masa del objetivo<br/>Default: 0<br/></dd>
<dt><b>-batch_size</b> \<Integer\></dt>
<dd>Ejecutar el hashing de stubs en lotes de este tamaño. (Se ignora si se fija target_res) <br/>Default: 10<br/></dd>
</dl>
+ <h2>-indexed_structure_store</h2>
<dl>
<dt><b>-indexed_structure_store</b> \<Boolean\></dt>
<dd>grupo de opciones indexed_structure_store<br/></dd>
<dt><b>-fragment_store</b> \<File\></dt>
<dd>Almacén de fragmentos. Archivo [.h5]<br/></dd>
<dt><b>-fragment_threshold_distance</b> \<Real\></dt>
<dd>fija la distancia umbral de fragmentos cuando los lee la función de puntuación VallLookback<br/>Default: 0.4<br/></dd>
<dt><b>-store_name</b> \<String\></dt>
<dd>nombre del almacén en hdf5<br/>Default: "9_mer"<br/></dd>
<dt><b>-exclude_homo</b> \<String\></dt>
<dd>activa la eliminación de homólogos de la base de datos hdf5 e indica los archivos<br/></dd>
</dl>
+ <h2>-lh</h2>
<dl>
<dt><b>-lh</b> \<Boolean\></dt>
<dd>grupo de opciones lh<br/></dd>
<dt><b>-loopsizes</b> \<IntegerVector\></dt>
<dd>Qué tamaños de loop usar<br/>Default: ['10', '15', '20']<br/></dd>
<dt><b>-num_partitions</b> \<Integer\></dt>
<dd>Número de particiones en que se divide la base de datos<br/>Default: 1<br/></dd>
<dt><b>-db_path</b> \<Path\></dt>
<dd>Ruta a la base de datos<br/>Default: ""<br/></dd>
<dt><b>-exclude_homo</b> \<Boolean\></dt>
<dd>Usar un filtro de exclusión de homólogos<br/>Default: false<br/></dd>
<dt><b>-bss</b> \<Boolean\></dt>
<dd>Usar BinaryProteinSilentStruct en lugar de ProteinSilentStruct (necesario para no ideal)<br/>Default: false<br/></dd>
<dt><b>-refstruct</b> \<String\></dt>
<dd>Archivo con una estructura de referencia objetivo<br/>Default: ""<br/></dd>
<dt><b>-homo_file</b> \<String\></dt>
<dd>Archivo que contiene homólogos que se deben excluir<br/>Default: ""<br/></dd>
<dt><b>-createdb_rms_cutoff</b> \<RealVector\></dt>
<dd>Corte de RMS usado para descartar fragmentos similares.<br/>Default: ['0', '0', '0']<br/></dd>
<dt><b>-min_bbrms</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 20.0<br/></dd>
<dt><b>-max_bbrms</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1400.0<br/></dd>
<dt><b>-min_rms</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.5<br/></dd>
<dt><b>-max_rms</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 4.0<br/></dd>
<dt><b>-filter_by_phipsi</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-max_radius</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 4<br/></dd>
<dt><b>-max_struct</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 10<br/></dd>
<dt><b>-max_struct_per_radius</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 10<br/></dd>
<dt><b>-grid_space_multiplier</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1<br/></dd>
<dt><b>-grid_angle_multiplier</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 2.5<br/></dd>
<dt><b>-skim_size</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 100<br/></dd>
<dt><b>-rounds</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 100<br/></dd>
<dt><b>-jobname</b> \<String\></dt>
<dd>Prefijo (cadena identificadora) !<br/>Default: "default"<br/></dd>
<dt><b>-max_lib_size</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 2<br/></dd>
<dt><b>-max_emperor_lib_size</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 25<br/></dd>
<dt><b>-max_emperor_lib_round</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-library_expiry_time</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 2400<br/></dd>
<dt><b>-objective_function</b> \<String\></dt>
<dd>Qué usar como función objetivo<br/>Default: "score"<br/></dd>
<dt><b>-expire_after_rounds</b> \<Integer\></dt>
<dd>Si se fija en > 0, hace que el maestro haga caducar una estructura después de que haya pasado por este número de ciclos<br/>Default: 0<br/></dd>
<dt><b>-mpi_resume</b> \<String\></dt>
<dd>Prefijo (cadena identificadora) para reanudar un trabajo anterior.<br/></dd>
<dt><b>-mpi_feedback</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "no"<br/></dd>
<dt><b>-mpi_batch_relax_chunks</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 100<br/></dd>
<dt><b>-mpi_batch_relax_absolute_max</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 300<br/></dd>
<dt><b>-mpi_outbound_wu_buffer_size</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 60<br/></dd>
<dt><b>-mpi_loophash_split_size    </b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 50<br/></dd>
<dt><b>-mpi_metropolis_temp</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1000000.0<br/></dd>
<dt><b>-mpi_save_state_interval</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 1200<br/></dd>
<dt><b>-mpi_master_save_score_only</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-max_loophash_per_structure</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 1<br/></dd>
<dt><b>-prob_terminus_ramapert</b> \<Real\></dt>
<dd>Probabilidad de ejecutar ramapert en lugar de fraginsert en el extremo<br/>Default: 0.0<br/></dd>
<dt><b>-rms_limit</b> \<Real\></dt>
<dd>Cómo tratar las estructuras relajadas devueltas<br/>Default: 2.0<br/></dd>
<dt><b>-similarity_reference</b> \<Real\></dt>
<dd>Cómo tratar las estructuras relajadas devueltas<br/>Default: 2.0<br/></dd>
<dt><b>-centroid_only</b> \<Boolean\></dt>
<dd>false<br/>Default: false<br/></dd>
<dt><b>-write_centroid_structs</b> \<Boolean\></dt>
<dd>Escribir los decoys con loophash sin procesar además de los relajados<br/>Default: false<br/></dd>
<dt><b>-write_all_fa_structs</b> \<Boolean\></dt>
<dd>Escribir todas las estructuras devueltas por el relax por lotes<br/>Default: false<br/></dd>
<dt><b>-sandbox</b> \<Boolean\></dt>
<dd>Modo sandbox (entorno de pruebas)<br/>Default: false<br/></dd>
<dt><b>-create_db</b> \<Boolean\></dt>
<dd>Crear una base de datos con este tamaño de loop<br/>Default: false<br/></dd>
<dt><b>-sample_weight_file</b> \<File\></dt>
<dd>Contiene los pesos de muestreo iniciales por residuo<br/></dd>
<dt><b>-radius_size</b> \<Real\></dt>
<dd>ajustar el radio de la hypershell<br/>Default: 2<br/></dd>
<dt><b>-max_ref_lib_size</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 2<br/></dd>
<dt><b>-multi_objective_functions</b> \<StringVector\></dt>
<dd>Qué usar como función objetivo<br/>Default: utility::vector1<std::string>(1,"score")<br/></dd>
<dt><b>-additional_objective_functions</b> \<StringVector\></dt>
<dd>Qué añadir a la función multiobjetivo<br/></dd>
<dt><b>-edensity_weight_for_sampling</b> \<Real\></dt>
<dd>peso de elec_dens_fast en WorkUnit_Samplers<br/>Default: 0.0<br/></dd>
<dt><b>-mpi_master_schfile</b> \<String\></dt>
<dd>archivo de calendario (schedule)<br/>Default: ""<br/></dd>
<dt><b>-mpi_master_cpu_weight</b> \<IntegerVector\></dt>
<dd>peso sobre el número de esclavos<br/>Default: ['0.0']<br/></dd>
<dt><b>-mpi_loophash_scan_type</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "random"<br/></dd>
<dt><b>-mpi_read_structure_for_emperor</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-mpi_packmin_init</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-max_sample_per_structure</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 1<br/></dd>
<dt><b>-loop_string</b> \<String\></dt>
<dd>cadena que se analiza para la región de loops, p. ej. 1-10,15-20,32-38<br/>Default: ""<br/></dd>
<dt><b>-seg_string</b> \<String\></dt>
<dd>cadena que se analiza para la región de segmentos, p. ej. 1-10,15-20,32-38<br/>Default: ""<br/></dd>
<dt><b>-loopresdef</b> \<StringVector\></dt>
<dd>Vector de cadenas que indica la conectividad, p. ej. peptide:1,2,3,4,5-6 SSbond:3,2,1-9,8,7,6<br/>Default: ['']<br/></dd>
<dt><b>-pert_init_loop</b> \<Boolean\></dt>
<dd>Intentar perturbar los loops de la estructura inicial al comienzo<br/>Default: false<br/></dd>
<dt><b>-NMdist</b> \<Real\></dt>
<dd>corte de distancia de normalmodemover<br/>Default: 10.0<br/></dd>
<dt><b>-objective_dominate_cut</b> \<RealVector\></dt>
<dd>corte para el dominio de la función objetivo<br/>Default: ['0.0', '0.0', '3.0']<br/></dd>
<dt><b>-objective_cut_increment</b> \<RealVector\></dt>
<dd>incremento de objective_dominate_cut en cada llamada<br/>Default: ['0.0', '0.0', '0.0']<br/></dd>
<dt><b>-similarity_method</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "sum"<br/></dd>
<dt><b>-similarity_measure</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "Sscore"<br/></dd>
<dt><b>-similarity_tolerance</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.5<br/></dd>
<dt><b>-parent_selection_kT</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.2<br/></dd>
<dt><b>-sim_replace_obj</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "goap"<br/></dd>
<dt><b>-ulr_mulfactor</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1.8<br/></dd>
<dt><b>-filter_up_to_maxlib</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-minimize_after_nmsearch</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
</dl>
+ <h3>-lh:fragpdb</h3>
<dl>
<dt><b>-fragpdb</b> \<Boolean\></dt>
<dd>grupo de opciones fragpdb<br/></dd>
<dt><b>-out_path</b> \<String\></dt>
<dd>Ruta donde se guardan los pdb<br/>Default: ""<br/></dd>
<dt><b>-indexoffset</b> \<IntegerVector\></dt>
<dd>lista de pares de desplazamiento de índice<br/>Default: ['-1']<br/></dd>
<dt><b>-bin</b> \<StringVector\></dt>
<dd>lista de claves de intervalo (bin)<br/>Default: utility::vector1<std::string>()<br/></dd>
</dl>
+ <h3>-lh:symfragrm</h3>
<dl>
<dt><b>-symfragrm</b> \<Boolean\></dt>
<dd>grupo de opciones symfragrm<br/></dd>
<dt><b>-pdblist</b> \<FileVector\></dt>
<dd>lista de pdb que se procesarán<br/></dd>
</dl>
+ <h2>-loopfcst</h2>
<dl>
<dt><b>-loopfcst</b> \<Boolean\></dt>
<dd>grupo de opciones loopfcst<br/></dd>
<dt><b>-coord_cst_weight</b> \<Real\></dt>
<dd>usar restricciones de coordenadas para la plantilla<br/>Default: 0.0<br/></dd>
<dt><b>-coord_cst_all_atom</b> \<Boolean\></dt>
<dd>usar restricciones de coordenadas en todos los átomos y no solo en CA<br/>Default: false<br/></dd>
<dt><b>-use_general_protocol</b> \<Boolean\></dt>
<dd>usar la nueva maquinaria en torno a las clases KinematicXXX<br/>Default: false<br/></dd>
<dt><b>-coord_cst_weight_array</b> \<File\></dt>
<dd>usar estos pesos (por seqpos) para las restricciones de coordenadas en las regiones rígidas<br/>Default: ""<br/></dd>
<dt><b>-dump_coord_cst_weight_array</b> \<File\></dt>
<dd>volcar estos pesos (por seqpos) para las restricciones de coordenadas en las regiones rígidas<br/>Default: ""<br/></dd>
</dl>
+ <h2>-LoopModel</h2>
<dl>
<dt><b>-LoopModel</b> \<Boolean\></dt>
<dd>grupo de opciones LoopModel<br/></dd>
<dt><b>-input_pdb</b> \<File\></dt>
<dd>archivo pdb de entrada<br/>Default: "LoopModel::input_pdb"<br/></dd>
</dl>
+ <h2>-make_rot_lib</h2>
<dl>
<dt><b>-make_rot_lib</b> \<Boolean\></dt>
<dd>grupo de opciones make_rot_lib<br/></dd>
<dt><b>-options_file</b> \<File\></dt>
<dd>ruta para crear el archivo de opciones de la biblioteca de rotámeros<br/></dd>
<dt><b>-output_logging</b> \<Boolean\></dt>
<dd>Si es true (el valor por defecto), se escriben archivos de registro para cada intervalo de torsión de la cadena principal intentado. Pueden ocupar mucho espacio, por lo que se pueden desactivar poniendo esto en false.<br/>Default: true<br/></dd>
<dt><b>-two_fold_symmetry_135_315</b> \<IntegerVector\></dt>
<dd>el número de chi en el que se aplica simetría doble a través del eje 135/315<br/></dd>
<dt><b>-two_fold_symmetry_0_180</b> \<IntegerVector\></dt>
<dd>el número de chi en el que se aplica simetría doble a través del eje 0/180<br/></dd>
<dt><b>-three_fold_symmetry_90_210_330</b> \<IntegerVector\></dt>
<dd>el número de chi en el que se aplica simetría triple a través del eje 0/180<br/></dd>
<dt><b>-use_terminal_residues</b> \<Boolean\></dt>
<dd>Usar residuos ACE y NME separados como grupos de protección terminal, en lugar de parches<br/>Default: false<br/></dd>
<dt><b>-k_medoids</b> \<Boolean\></dt>
<dd>Usar agrupamiento k-medoides en lugar de k-medias<br/>Default: false<br/></dd>
<dt><b>-patch_name_for_residue</b> \<String\></dt>
<dd>Proporcionar una descripción explícita de los parches para la protección terminal<br/></dd>
<dt><b>-polymeric_context</b> \<File\></dt>
<dd>Un archivo que contiene el RT en el número de PDB 0 y también el contexto flanqueante.<br/></dd>
</dl>
+ <h2>-make_mainchain_potential</h2>
<dl>
<dt><b>-make_mainchain_potential</b> \<Boolean\></dt>
<dd>grupo de opciones make_mainchain_potential<br/></dd>
<dt><b>-do_minimization</b> \<Boolean\></dt>
<dd>Si es true, cada rotámero de cadena lateral se minimiza con el campo de fuerza de mecánica molecular de Rosetta antes de puntuar. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-mainchain_potential_points_per_dimension</b> \<IntegerVector\></dt>
<dd>El número de puntos para cada dimensión del potencial multidimensional de la cadena principal, dado como una lista de enteros separados por espacios en blanco. Cada entero debe ser estrictamente positivo. Entrada obligatoria.<br/></dd>
<dt><b>-mainchain_torsions_covered</b> \<IntegerVector\></dt>
<dd>Las torsiones de la cadena principal que cubre este potencial. Por ejemplo, una oligourea tiene cuatro torsiones de la cadena principal, pero solo se cubren las torsiones 1, 2 y 3 (y la cuarta está restringida por el término de puntuación omega), en cuyo caso esta opción puede fijarse en 1 2 3. Si no se especifica, por defecto son todas las torsiones de la cadena principal.<br/></dd>
<dt><b>-make_pre_proline_potential</b> \<Boolean\></dt>
<dd>Si es true, esta aplicación creará un potencial para una posición que precede a una prolina, sarcosina, peptoide u otro bloque de construcción N-sustituido. Si es false (el valor por defecto), genera un potencial para una posición que precede a una posición no sustituida (p. ej., los 19 aminoácidos canónicos distintos de la prolina).<br/>Default: false<br/></dd>
<dt><b>-output_filename</b> \<File\></dt>
<dd>Archivo de salida en el que se escribirá el potencial de la cadena principal generado. Por defecto, generated_mainchain_potential.txt<br/>Default: "generated_mainchain_potential.txt"<br/></dd>
<dt><b>-residue_name</b> \<String\></dt>
<dd>El nombre del tipo de residuo para el que se generará un potencial de la cadena principal. Por defecto es ALA si no se fija, pero el usuario debería fijarlo.<br/>Default: "ALA"<br/></dd>
<dt><b>-symmetrize_output</b> \<Boolean\></dt>
<dd>Si es true, la salida se hará simétrica. False por defecto. Ten en cuenta que esto requiere un desplazamiento de cinco grados.<br/>Default: false<br/></dd>
<dt><b>-write_potentials_for_individual_scoreterms</b> \<Boolean\></dt>
<dd>Si es true, se escribe un archivo de potencial aparte para cada término de puntuación. Se usa para ajustar los pesos del campo de fuerza de mecánica molecular que usa la aplicación make_mainchain_potential. Ten en cuenta que estas tablas se escribirán sin normalizar y con pesos de 1.0 para cada término. False por defecto.<br/>Default: false<br/></dd>
</dl>
+ <h2>-match</h2>
<dl>
<dt><b>-match</b> \<Boolean\></dt>
<dd>grupo de opciones match<br/></dd>
<dt><b>-lig_name</b> \<String\></dt>
<dd>Nombre del ligando que se va a emparejar (match). Debe ser el mismo que el campo NAME del archivo de parámetros del ligando (el archivo .params)<br/></dd>
<dt><b>-bump_tolerance</b> \<Real\></dt>
<dd>El nivel permitido de solapamiento esférico entre dos átomos cualesquiera. Se usa para detectar colisiones entre los átomos upstream y el fondo, entre los átomos upstream y los downstream, y entre los átomos downstream y el fondo<br/>Default: 0.0<br/></dd>
<dt><b>-active_site_definition_by_residue</b> \<File\></dt>
<dd>Archivo que describe el sitio activo del andamio (scaffold) como un conjunto de pares resid/radio<br/></dd>
<dt><b>-active_site_definition_by_gridlig</b> \<File\></dt>
<dd>Archivo que contiene 1 y 0 que describen el volumen de espacio del sitio activo. Formato de archivo .gridlig de Rosetta++<br/></dd>
<dt><b>-required_active_site_atom_names</b> \<File\></dt>
<dd>Archivo que lista los nombres de átomos de residuos downstream que deben residir en el sitio activo definido. Requiere que se especifique la opción active_site_definition_by_residue o la opción active_site_definition_by_gridlig.<br/></dd>
<dt><b>-grid_boundary</b> \<File\></dt>
<dd>Archivo que describe el volumen en el espacio en el que debe estar el tercer átomo de orientación<br/>Default: ""<br/></dd>
<dt><b>-geometric_constraint_file</b> \<File\></dt>
<dd>Archivo que describe la geometría del objeto downstream respecto al objeto upstream<br/></dd>
<dt><b>-scaffold_active_site_residues</b> \<File\></dt>
<dd>Archivo con los índices de residuos del andamio que deben 			considerarse posibles puntos de lanzamiento para el sitio activo del andamio. El formato del archivo se describe en MatcherTask.cc, 			en la sección de detalles del método initialize_scaffold_active_site_residue_list_from_command_line().<br/>Default: ""<br/></dd>
<dt><b>-scaffold_active_site_residues_for_geomcsts</b> \<File\></dt>
<dd>Archivo que lista los índices de residuos del 			andamio que se consideran posibles puntos de lanzamiento para el sitio activo del andamio en cada restricción geométrica; 			cada restricción puede tener un conjunto distinto de ids de residuos. El formato del archivo se describe en MatcherTask.cc, en la sección 			de detalles del método initialize_scaffold_active_site_residue_list_from_command_line().<br/>Default: ""<br/></dd>
<dt><b>-euclid_bin_size</b> \<Real\></dt>
<dd>El ancho de intervalo para el hasher de coordenadas tridimensionales, en Å<br/>Default: 1.0<br/></dd>
<dt><b>-euler_bin_size</b> \<Real\></dt>
<dd>El ancho de intervalo para el hasher de ángulos de Euler, en grados<br/>Default: 10.0<br/></dd>
<dt><b>-consolidate_matches</b> \<Boolean\></dt>
<dd>En lugar de escribir todas las coincidencias, agrupar las coincidencias y escribir luego solo las primeras -match::output_matches_per_group de cada grupo.<br/>Default: false<br/></dd>
<dt><b>-output_matches_per_group</b> \<Integer\></dt>
<dd>El número de coincidencias que se escriben por grupo. Requiere que la opción -match::consolidate_matches esté activa.<br/>Default: 10<br/></dd>
<dt><b>-orientation_atoms</b> \<StringVector\></dt>
<dd>Los tres átomos, por nombre, de la pareja downstream 			que se usan para describir su coordenada de 6 dimensiones: su posición y orientación. 			Solo se puede usar cuando la pareja downstream es un solo residuo. Deben darse exactamente 3 nombres de átomos. 			Si estos átomos no se especifican, el matcher usará el átomo vecino del residuo y dos átomos 			enlazados al átomo vecino para definir la orientación. La coordenada euclidiana del tercer átomo 			de orientación se usa como la primera de las dimensiones de la coordenada 6D del residuo downstream; las 			otras tres dimensiones son los tres ángulos de Euler descritos al crear un sistema de coordenadas en el átomo de 			orientación 3, con el eje z a lo largo del vector del átomo de orientación 2 al átomo de orientación 3, y el eje y 			situado en el plano de los átomos de orientación 1, 2 y 3.<br/></dd>
<dt><b>-output_format</b> \<String\></dt>
<dd>El formato en que se escriben las coincidencias<br/>Default: "CloudPDB"<br/></dd>
<dt><b>-match_grouper</b> \<String\></dt>
<dd>Los parámetros según los cuales MatchConsolidator o CloudPDBWriter agrupan las coincidencias<br/>Default: "SameSequenceAndDSPositionGrouper"<br/></dd>
<dt><b>-grouper_downstream_rmsd</b> \<Real\></dt>
<dd>RMSD máximo permitido entre dos orientaciones del Pose downstream para que se consideren parte del mismo grupo <br/>Default: 1.5<br/></dd>
<dt><b>-output_matchres_only</b> \<Boolean\></dt>
<dd>Si se escriben solo los residuos emparejados o el Pose completo para cada coincidencia<br/>Default: false<br/></dd>
<dt><b>-geom_csts_downstream_output</b> \<IntegerVector\></dt>
<dd>Para cuáles de las restricciones geométricas se escribirá el residuo/ligando downstream<br/>Default: ['1']<br/></dd>
<dt><b>-filter_colliding_upstream_residues</b> \<Boolean\></dt>
<dd>Filtrar las coincidencias de salida si los aciertos inducen una colisión entre los residuos upstream<br/>Default: true<br/></dd>
<dt><b>-upstream_residue_collision_tolerance</b> \<Real\></dt>
<dd>La cantidad de solapamiento atómico permitida entre residuos upstream en una coincidencia. Si no se especifica en la línea de comandos, se usa el valor de la opción bump_tolerance<br/>Default: 0.0<br/></dd>
<dt><b>-upstream_residue_collision_score_cutoff</b> \<Real\></dt>
<dd>El corte de puntuación para los pares de residuos upstream que se usa en el filtro de colisiones. Activar este corte usa los términos atr/rep/sol de la etable para evaluar las interacciones entre pares de residuos en lugar de la detección de solapamiento de esferas duras<br/>Default: 10.0<br/></dd>
<dt><b>-upstream_residue_collision_Wfa_atr</b> \<Real\></dt>
<dd>El peso de fa_atr que se usa en el filtro de colisiones upstream; úsalo junto con upstream_residue_collision_score_cutoff<br/>Default: 0.8<br/></dd>
<dt><b>-upstream_residue_collision_Wfa_rep</b> \<Real\></dt>
<dd>El peso de fa_rep que se usa en el filtro de colisiones upstream; úsalo junto con upstream_residue_collision_score_cutoff<br/>Default: 0.44<br/></dd>
<dt><b>-upstream_residue_collision_Wfa_sol</b> \<Real\></dt>
<dd>El peso de fa_sol que se usa en el filtro de colisiones upstream; úsalo junto con upstream_residue_collision_score_cutoff<br/>Default: 0.0<br/></dd>
<dt><b>-filter_upstream_downstream_collisions</b> \<Boolean\></dt>
<dd>Filtrar las coincidencias de salida si los aciertos inducen una colisión entre los residuos upstream y el Pose downstream<br/>Default: true<br/></dd>
<dt><b>-updown_collision_tolerance</b> \<Real\></dt>
<dd>La cantidad de solapamiento atómico permitida entre átomos upstream y downstream en una coincidencia. Si no se especifica en la línea de comandos, se usa el valor de la opción bump_tolerance<br/>Default: 0.0<br/></dd>
<dt><b>-updown_residue_collision_score_cutoff</b> \<Real\></dt>
<dd>El corte de puntuación para los pares de residuos upstream/downstream que se usa en el filtro de colisiones. Activar este corte usa los términos atr/rep/sol de la etable para evaluar las interacciones entre pares de residuos en lugar de la detección de solapamiento de esferas duras<br/>Default: 10.0<br/></dd>
<dt><b>-updown_residue_collision_Wfa_atr</b> \<Real\></dt>
<dd>El peso de fa_atr que se usa en el filtro de colisiones upstream-downstream; úsalo junto con updown_residue_collision_score_cutoff<br/>Default: 0.8<br/></dd>
<dt><b>-updown_residue_collision_Wfa_rep</b> \<Real\></dt>
<dd>El peso de fa_rep que se usa en el filtro de colisiones upstream-downstream; úsalo junto con updown_residue_collision_score_cutoff<br/>Default: 0.44<br/></dd>
<dt><b>-updown_residue_collision_Wfa_sol</b> \<Real\></dt>
<dd>El peso de fa_sol que se usa en el filtro de colisiones upstream-downstream; úsalo junto con updown_residue_collision_score_cutoff<br/>Default: 0.0<br/></dd>
<dt><b>-define_match_by_single_downstream_positioning</b> \<Boolean\></dt>
<dd>Enumerar combinaciones de coincidencias en las que un 			único posicionamiento de la pareja downstream, junto con las conformaciones de los residuos upstream, define la 			coincidencia; es mucho más rápido enumerar coincidencias únicas cuando se definen así que enumerar las 			(combinatoriamente muchas) coincidencias cuando una coincidencia se define por n ubicaciones de restricciones geométricas de la pareja downstream. 			Esta técnica más rápida para escribir coincidencias se elige automáticamente cuando la opción -match::output_format es PDB.<br/></dd>
<dt><b>-ligand_rotamer_index</b> \<Integer\></dt>
<dd>Emparejar con una conformación concreta del ligando; el índice 			representa qué conformación del archivo .pdb de varios modelos indicado en el archivo .params del ligando mediante el campo 			PDB_ROTAMERS. El índice de la primera conformación de ese archivo es 1; los índices válidos van de 1 al 			número de entradas del archivo .pdb de varios modelos. Si no se usa esta opción de la línea de comandos, se usa en su lugar la conformación 			del ligando descrita por las líneas ICOOR_INTERNAL del archivo .params del ligando.<br/></dd>
<dt><b>-enumerate_ligand_rotamers</b> \<Boolean\></dt>
<dd>Emparejar con todos los rotámeros del ligando especificados en el archivo .pdb de varios modelos 			indicado en el archivo .params del ligando mediante el campo PDB_ROTAMERS. Esta opción no puede usarse en 			combinación con la opción match::ligand_rotamer_index. La geometría de los rotámeros del ligando del archivo .pdb 			se idealizará a los ángulos y longitudes de enlace del archivo .params.<br/>Default: true<br/></dd>
<dt><b>-only_enumerate_non_match_redundant_ligand_rotamers</b> \<Boolean\></dt>
<dd>Solo se define si enumerate_ligand_rotamers es true. 			Esta opción hace que el matcher determine qué rotámeros de la biblioteca de rotámeros del ligando son redundantes para el emparejamiento, 			es decir, que los átomos mediante los que se emparejan son superponibles. Después de subdividir la biblioteca de rotámeros del ligando en 			subgrupos redundantes para el emparejamiento, el matcher colocará solo el primer rotámero sin choques de cada subgrupo. <br/>Default: true<br/></dd>
<dt><b>-dynamic_grid_refinement</b> \<Boolean\></dt>
<dd>Cuando demasiados aciertos caen en el mismo 'componente conectado', lo que requiere 			enumerar demasiadas coincidencias, refinar el tamaño de la rejilla para hacerlo más pequeño y que haya que enumerar menos coincidencias. 			Este proceso funciona sobre componentes conectados individuales y no se aplica a todas las regiones de 6D. Es mucho 			más eficiente que enumerar todas las coincidencias, y permite que el tamaño de la rejilla siga siendo grande y que los rotámeros y la geometría 			externa sigan siendo densos. (*Un componente conectado se refiere a <br/></dd>
<dt><b>-build_round1_hits_twice</b> \<Boolean\></dt>
<dd>Estrategia de ahorro de memoria que evita pagar el almacenamiento de todos los aciertos de la ronda 1 			y registra en su lugar solo en qué vóxeles 6D caen esos aciertos. Luego la segunda ronda de emparejamiento procede almacenando solo los aciertos que 			caen en los mismos vóxeles en los que cayeron los aciertos de la primera ronda. Después el matcher vuelve a generar los aciertos de la primera ronda, 			pero conserva solo los que caen en los mismos vóxeles en los que cayeron los aciertos de la ronda 2. Para usarla, la ronda 2 también debe usar el 			algoritmo de emparejamiento clásico (y no debe usar emparejamiento secundario).<br/>Default: false<br/></dd>
</dl>
+ <h2>-matdes</h2>
<dl>
<dt><b>-matdes</b> \<Boolean\></dt>
<dd>grupo de opciones matdes<br/></dd>
<dt><b>-num_subs_building_block</b> \<Integer\></dt>
<dd>El número de subunidades del bloque de construcción oligomérico<br/>Default: 1<br/></dd>
<dt><b>-num_subs_total</b> \<Integer\></dt>
<dd>El número de subunidades del ensamblaje objetivo<br/>Default: 1<br/></dd>
<dt><b>-pdbID</b> \<String\></dt>
<dd>El ID de PDB<br/>Default: "0xxx"<br/></dd>
<dt><b>-prefix</b> \<String\></dt>
<dd>Prefijo que se antepone a los archivos PDB de salida. Quizá útil para describir la arquitectura, p. ej., 532_3_...<br/>Default: "pre_"<br/></dd>
<dt><b>-radial_disp</b> \<RealVector\></dt>
<dd>Especifica el desplazamiento radial desde el centro de un ensamblaje de grupo puntual cerrado. Úsalo con -in::olig_search::dump_pdb<br/></dd>
<dt><b>-angle</b> \<RealVector\></dt>
<dd>Especifica el ángulo en que se rota un bloque de construcción en un ensamblaje simétrico. Úsalo con -in::olig_search::dump_pdb<br/></dd>
<dt><b>-tag</b> \<String\></dt>
<dd>Etiqueta de ID de cuatro dígitos que se adjunta a un modelo de diseño durante el diseño<br/></dd>
</dl>
+ <h3>-matdes:dock</h3>
<dl>
<dt><b>-dock</b> \<Boolean\></dt>
<dd>grupo de opciones dock<br/></dd>
<dt><b>-neg_r</b> \<Real\></dt>
<dd>Especifica si el desplazamiento radial es positivo o negativo. 1 para negativo, 0 para positivo.<br/>Default: 0<br/></dd>
<dt><b>-dump_pdb</b> \<Boolean\></dt>
<dd>Volcar un pdb de una configuración acoplada concreta<br/>Default: false<br/></dd>
<dt><b>-dump_chainA_only</b> \<Boolean\></dt>
<dd>Escribir solo la cadena A (la unidad asimétrica) del ensamblaje simétrico. Úsalo con -in::olig_search::dump_pdb<br/>Default: false<br/></dd>
</dl>
+ <h3>-matdes:design</h3>
<dl>
<dt><b>-design</b> \<Boolean\></dt>
<dd>grupo de opciones design<br/></dd>
<dt><b>-contact_dist</b> \<Real\></dt>
<dd>Distancia CA-CA para definir los residuos de la interfaz<br/>Default: 10.0<br/></dd>
<dt><b>-grid_size_angle</b> \<Real\></dt>
<dd>El ancho del espacio de ángulos desde el que se inician las ejecuciones de diseño/minimización, centrado en el ángulo inicial<br/>Default: 1.0<br/></dd>
<dt><b>-grid_size_radius</b> \<Real\></dt>
<dd>El ancho del espacio de radios desde el que se inician las ejecuciones de diseño/minimización, centrado en el radio inicial<br/>Default: 1.0<br/></dd>
<dt><b>-grid_nsamp_angle</b> \<Integer\></dt>
<dd>El número de muestras en que se divide la rejilla de cuerpo rígido en el espacio de ángulos<br/>Default: 9<br/></dd>
<dt><b>-grid_nsamp_radius</b> \<Integer\></dt>
<dd>El número de muestras en que se divide la rejilla de cuerpo rígido en el espacio de radios<br/>Default: 9<br/></dd>
<dt><b>-fav_nat_bonus</b> \<Real\></dt>
<dd>Bonificación que se otorga a los residuos nativos<br/>Default: 0.0<br/></dd>
</dl>
+ <h3>-matdes:mutalyze</h3>
<dl>
<dt><b>-mutalyze</b> \<Boolean\></dt>
<dd>grupo de opciones mutalyze<br/></dd>
<dt><b>-calc_rot_boltz</b> \<Boolean\></dt>
<dd>Especifica si se calculan o no las probabilidades RotamerBoltzmann<br/>Default: 0<br/></dd>
<dt><b>-ala_scan</b> \<Boolean\></dt>
<dd>Especifica si se calculan los ddG de los mutantes de barrido de alanina en la interfaz diseñada<br/>Default: 1<br/></dd>
<dt><b>-revert_scan</b> \<Boolean\></dt>
<dd>Especifica si se calculan los ddG de los mutantes de reversión en la interfaz diseñada<br/>Default: 1<br/></dd>
<dt><b>-min_rb</b> \<Boolean\></dt>
<dd>Especifica si se minimizan los grados de libertad de cuerpo rígido<br/>Default: 1<br/></dd>
</dl>
+ <h2>-mc</h2>
<dl>
<dt><b>-mc</b> \<Boolean\></dt>
<dd>grupo de opciones mc<br/></dd>
<dt><b>-log_scores_in_MC</b> \<Boolean\></dt>
<dd>Puntuar cada decoy durante una simulación y escribirlo en el registro; ¡ralentiza la ejecución!<br/>Default: false<br/></dd>
<dt><b>-hierarchical_pool</b> \<String\></dt>
<dd>especifica el prefijo para buscar el conjunto jerárquico (pool)<br/></dd>
<dt><b>-read_structures_into_pool</b> \<File\></dt>
<dd>especifica las silent-structs para crear una jerarquía para usuarios perezosos<br/></dd>
<dt><b>-convergence_check_frequency</b> \<Integer\></dt>
<dd>con qué frecuencia se comprueba la convergencia en el objeto MC<br/>Default: 100<br/></dd>
<dt><b>-known_structures</b> \<File\></dt>
<dd>especifica el nombre de archivo de un silent file que contiene estructuras conocidas<br/>Default: "known_structs.in"<br/></dd>
<dt><b>-max_rmsd_against_known_structures</b> \<Real\></dt>
<dd>dejar de muestrear si el rmsd respecto a una estructura conocida es menor que X<br/>Default: 1.5<br/></dd>
<dt><b>-excluded_residues_from_rmsd</b> \<IntegerVector\></dt>
<dd>residuos que no se usan para el cálculo de RMSD en el conjunto<br/></dd>
<dt><b>-heat_convergence_check</b> \<Integer\></dt>
<dd>salir de la ejecución abinitio actual si se alcanzan X intentos mc fallidos<br/>Default: 0<br/></dd>
</dl>
+ <h2>-mean_field</h2>
<dl>
<dt><b>-mean_field</b> \<Boolean\></dt>
<dd>grupo de opciones mean_field<br/></dd>
<dt><b>-bb_list</b> \<FileVector\></dt>
<dd>Especifica la lista de archivos pdb del conjunto de cadenas principales<br/></dd>
<dt><b>-dump_transfac</b> \<File\></dt>
<dd>prefijo del nombre de archivo para volcar el perfil de especificidad predicho en formato transfac<br/>Default: ""<br/></dd>
<dt><b>-spec_profile</b> \<File\></dt>
<dd>especifica el nombre de archivo del perfil de especificidad (PWM) (formato transfac). Se usa como patrón de referencia para comparar con el resultado predicho de campo medio.<br/>Default: ""<br/></dd>
<dt><b>-bb_boltz_probs</b> \<File\></dt>
<dd>especifica el nombre de archivo de las probabilidades de Boltzmann de las cadenas principales. Se puede usar junto con bb_list como probabilidades de Boltzmann de las cadenas principales de bb_list.<br/>Default: ""<br/></dd>
<dt><b>-rot_norm_weight</b> \<Real\></dt>
<dd>ponderar el término rot_norm<br/>Default: 0.0<br/></dd>
<dt><b>-bb_average_weight</b> \<Real\></dt>
<dd>término bb_average_weight<br/>Default: 0.0<br/></dd>
<dt><b>-rf_peptide</b> \<File\></dt>
<dd>especifica el nombre de archivo del resfile usado para identificar los residuos del péptido (o los residuos designados para el análisis de tolerancia de secuencia)<br/>Default: ""<br/></dd>
<dt><b>-include_all_aa</b> \<Boolean\></dt>
<dd>aumentar el peso de las probabilidades de todos los aminoácidos sumando 50 a cada valor<br/>Default: false<br/></dd>
<dt><b>-ga_pack_detect_interface</b> \<Boolean\></dt>
<dd>detectar automáticamente la interfaz proteína-péptido para el cálculo de la función de aptitud (fitness)<br/>Default: false<br/></dd>
<dt><b>-biased_dist_all_gen</b> \<Boolean\></dt>
<dd>usar distribución sesgada (como se especifica en spec_profile) para todas las generaciones del AG<br/>Default: false<br/></dd>
</dl>
+ <h2>-mh</h2>
<dl>
<dt><b>-mh</b> \<Boolean\></dt>
<dd>grupo de opciones mh<br/></dd>
<dt><b>-motif_out_file</b> \<String\></dt>
<dd>archivo en el que volcar ResPairMotifs<br/>Default: "motifs"<br/></dd>
<dt><b>-harvest_motifs</b> \<FileVector\></dt>
<dd>archivos de los que recolectar ResPairMotifs<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-print_motifs</b> \<FileVector\></dt>
<dd>archivos de los que imprimir ResPairMotifs<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-remove_duplicates</b> \<FileVector\></dt>
<dd>archivos de los que eliminar ResPairMotifs duplicados<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-dump_motif_pdbs</b> \<FileVector\></dt>
<dd>archivos de los que extraer clústeres de ResPairMotifs<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-merge_motifs</b> \<FileVector\></dt>
<dd>archivos de los que combinar ResPairMotifs<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-merge_scores</b> \<FileVector\></dt>
<dd>archivos de los que combinar puntuaciones<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-merge_motifs_one_per_bin</b> \<Boolean\></dt>
<dd>conservar solo un motivo por intervalo de hash (para la rejilla especificada)<br/>Default: false<br/></dd>
<dt><b>-gen_reverse_motifs_on_load</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-dump_input_pdb</b> \<FileVector\></dt>
<dd>archivos de los que volcar la interpretación de biount<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-score_pdbs</b> \<FileVector\></dt>
<dd>archivos que se puntúan con el archivo de recuentos de entrada<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-sequence_recovery</b> \<FileVector\></dt>
<dd>archivos pdb que se puntúan<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-explicit_motif_score</b> \<FileVector\></dt>
<dd>archivos pdb que se puntúan<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-harvest_scores</b> \<FileVector\></dt>
<dd>obtener recuentos de los archivos ResPairMotif y volcarlos en un archivo binario de recuentos<br/>Default: ""<br/></dd>
<dt><b>-print_scores</b> \<File\></dt>
<dd>imprimir un archivo binario de recuentos<br/>Default: ""<br/></dd>
<dt><b>-dump_matching_motifs</b> \<FileVector\></dt>
<dd>archivos pdb que se puntúan<br/>Default: "SPECIFY_ME_DUMMY"<br/></dd>
<dt><b>-score_across_chains_only</b> \<Boolean\></dt>
<dd>ignorar los motivos intracadena<br/>Default: false<br/></dd>
<dt><b>-normalize_score_ncontact</b> \<Boolean\></dt>
<dd>normalizar por el número total de contactos<br/>Default: true<br/></dd>
<dt><b>-harvest_motifs_min_hh_ends</b> \<Integer\></dt>
<dd>restringir al medio de los contactos de hélice <br/>Default: 0<br/></dd>
<dt><b>-ignore_io_errors</b> \<Boolean\></dt>
<dd> <br/>Default: false<br/></dd>
<dt><b>-motif_match_radius</b> \<Real\></dt>
<dd>ancho del intervalo de ángulo de Euler<br/>Default: 9e9<br/></dd>
<dt><b>-merge_similar_motifs</b> \<RealVector\></dt>
<dd>dar 3 parámetros de hash<br/></dd>
</dl>
+ <h3>-mh:score</h3>
<dl>
<dt><b>-score</b> \<Boolean\></dt>
<dd>grupo de opciones score<br/></dd>
<dt><b>-background_weight</b> \<Real\></dt>
<dd>peso de los contactos cb, más o menos<br/>Default: 0.0<br/></dd>
<dt><b>-ca_cb_clash_weight</b> \<Real\></dt>
<dd>peso de los choques cb, más o menos<br/>Default: 1.0<br/></dd>
<dt><b>-noloops</b> \<Boolean\></dt>
<dd>ignorar la estructura secundaria de loops en las estructuras puntuadas<br/>Default: false<br/></dd>
<dt><b>-nosheets</b> \<Boolean\></dt>
<dd>ignorar la estructura secundaria de hebras en las estructuras puntuadas<br/>Default: false<br/></dd>
<dt><b>-nohelix</b> \<Boolean\></dt>
<dd>ignorar la estructura secundaria de hélices en las estructuras puntuadas<br/>Default: false<br/></dd>
<dt><b>-spread_ss_element</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-min_cover_fraction</b> \<Real\></dt>
<dd><br/>Default: 0.0<br/></dd>
<dt><b>-strand_pair_weight</b> \<Real\></dt>
<dd><br/>Default: 1.0<br/></dd>
<dt><b>-anti_polar_weight</b> \<Real\></dt>
<dd><br/>Default: 1.0<br/></dd>
<dt><b>-min_contact_pairs</b> \<Real\></dt>
<dd><br/>Default: 1.0<br/></dd>
<dt><b>-max_contact_pairs</b> \<Real\></dt>
<dd><br/>Default: 9e9<br/></dd>
<dt><b>-max_cb_dis</b> \<Real\></dt>
<dd><br/>Default: 9.0<br/></dd>
<dt><b>-coverage_pow</b> \<Real\></dt>
<dd><br/>Default: 0.0<br/></dd>
<dt><b>-use_ss1</b> \<Boolean\></dt>
<dd><br/>Default: true<br/></dd>
<dt><b>-use_ss2</b> \<Boolean\></dt>
<dd><br/>Default: true<br/></dd>
<dt><b>-use_aa1</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-use_aa2</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-use_log</b> \<Boolean\></dt>
<dd><br/>Default: true<br/></dd>
</dl>
+ <h3>-mh:path</h3>
<dl>
<dt><b>-path</b> \<Boolean\></dt>
<dd>grupo de opciones path<br/></dd>
<dt><b>-biounit</b> \<StringVector\></dt>
<dd>ruta donde buscar biounits en formato ab/1abc.pdb1.gz<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-biounit_ideal</b> \<StringVector\></dt>
<dd>coordenadas idealizadas de biounit, sin los metadatos de PDBInfo<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-pdb</b> \<StringVector\></dt>
<dd>ruta donde buscar pdb en formato ab/1abc.pdb.gz<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-motifs</b> \<StringVector\></dt>
<dd>motivos concretos en formato .rpm.bin.gz<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-motifs_SC_SC</b> \<StringVector\></dt>
<dd>motivos SC_SC concretos; intenta reemplazar con path::motifs<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-motifs_SC_BB</b> \<StringVector\></dt>
<dd>motivos SC_BB concretos; intenta reemplazar con path::motifs<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-motifs_BB_BB</b> \<StringVector\></dt>
<dd>motivos BB_BB concretos; intenta reemplazar con path::motifs<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-motifs_BB_PH</b> \<StringVector\></dt>
<dd>motivos BB_PH concretos; intenta reemplazar con path::motifs<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-motifs_BB_PO</b> \<StringVector\></dt>
<dd>motivos BB_PO concretos; intenta reemplazar con path::motifs<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-motifs_PH_PO</b> \<StringVector\></dt>
<dd>motivos PH_PO concretos; intenta reemplazar con path::motifs<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-scores</b> \<StringVector\></dt>
<dd>datos de hash de motivos para puntuar, mixtos; puede que no se use<br/></dd>
<dt><b>-scores_SC_SC</b> \<StringVector\></dt>
<dd>datos de hash de motivos para puntuar SC_SC<br/></dd>
<dt><b>-scores_SC_BB</b> \<StringVector\></dt>
<dd>datos de hash de motivos para puntuar SC_BB<br/></dd>
<dt><b>-scores_BB_BB</b> \<StringVector\></dt>
<dd>datos de hash de motivos para puntuar<br/></dd>
<dt><b>-scores_BB_PH</b> \<StringVector\></dt>
<dd>datos de hash de motivos para puntuar BB_PH<br/></dd>
<dt><b>-scores_BB_PO</b> \<StringVector\></dt>
<dd>datos de hash de motivos para puntuar BB_PO<br/></dd>
<dt><b>-scores_PH_PO</b> \<StringVector\></dt>
<dd>datos de hash de motivos para puntuar emparejamientos de hebras<br/></dd>
<dt><b>-scores_frags</b> \<StringVector\></dt>
<dd>datos de hash de motivos para puntuar emparejamientos de hebras<br/></dd>
</dl>
+ <h3>-mh:harvest</h3>
<dl>
<dt><b>-harvest</b> \<Boolean\></dt>
<dd>grupo de opciones harvest<br/></dd>
<dt><b>-hash_cart_resl</b> \<Real\></dt>
<dd>ancho del intervalo cartesiano<br/>Default: 0.8<br/></dd>
<dt><b>-hash_angle_resl</b> \<Real\></dt>
<dd>ancho del intervalo de ángulo de Euler<br/>Default: 15.0<br/></dd>
<dt><b>-smoothing_factor</b> \<Real\></dt>
<dd>radio de suavizado exp(-d/resl**2 * factor)<br/>Default: 1.0<br/></dd>
<dt><b>-idealize</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-dump</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-min_bin_val</b> \<Real\></dt>
<dd><br/>Default: 0.0<br/></dd>
<dt><b>-sep_aa</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-sep_aa1</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-sep_aa2</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-sep_ss</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-sep_dssp</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-sep_lj</b> \<RealVector\></dt>
<dd><br/>Default: utility::vector1<double>()<br/></dd>
<dt><b>-sep_hb</b> \<RealVector\></dt>
<dd><br/>Default: utility::vector1<double>()<br/></dd>
<dt><b>-sep_nbrs</b> \<RealVector\></dt>
<dd><br/>Default: utility::vector1<double>()<br/></dd>
<dt><b>-sep_bfac</b> \<RealVector\></dt>
<dd><br/>Default: utility::vector1<double>()<br/></dd>
<dt><b>-sep_dist</b> \<RealVector\></dt>
<dd><br/>Default: utility::vector1<double>()<br/></dd>
<dt><b>-weight_by_energy</b> \<Boolean\></dt>
<dd><br/>Default: true<br/></dd>
<dt><b>-max_rmsd</b> \<Real\></dt>
<dd>omitir la estructura si el rms refinado respecto a la entrada es mayor que esto<br/>Default: 0.5<br/></dd>
<dt><b>-max_res</b> \<Integer\></dt>
<dd>máx. de residuos en el biounit (o lo que sea) para la recolección<br/>Default: 1000<br/></dd>
<dt><b>-agg_with_max</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-multiplier</b> \<Real\></dt>
<dd><br/>Default: 1.0<br/></dd>
</dl>
+ <h3>-mh:match</h3>
<dl>
<dt><b>-match</b> \<Boolean\></dt>
<dd>grupo de opciones match<br/></dd>
<dt><b>-interface_only</b> \<Boolean\></dt>
<dd><br/>Default: true<br/></dd>
<dt><b>-ss</b> \<Boolean\></dt>
<dd><br/>Default: true<br/></dd>
<dt><b>-ss1</b> \<Boolean\></dt>
<dd><br/>Default: true<br/></dd>
<dt><b>-ss2</b> \<Boolean\></dt>
<dd><br/>Default: true<br/></dd>
<dt><b>-aa</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-aa1</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-aa2</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
</dl>
+ <h3>-mh:dump</h3>
<dl>
<dt><b>-dump</b> \<Boolean\></dt>
<dd>grupo de opciones dump<br/></dd>
<dt><b>-limit_per_pair</b> \<Integer\></dt>
<dd><br/>Default: 999999<br/></dd>
<dt><b>-max_per_res</b> \<Integer\></dt>
<dd><br/>Default: 30<br/></dd>
<dt><b>-max_ca_dis</b> \<Real\></dt>
<dd><br/>Default: 12.0<br/></dd>
<dt><b>-max_rms</b> \<Real\></dt>
<dd><br/>Default: 0.5<br/></dd>
<dt><b>-resfile_min_pair_score</b> \<Real\></dt>
<dd><br/>Default: 0.00<br/></dd>
<dt><b>-resfile_min_tot_score</b> \<Real\></dt>
<dd><br/>Default: 0.00<br/></dd>
<dt><b>-resfile_dump</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-symmetric_motifs</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
</dl>
+ <h3>-mh:filter</h3>
<dl>
<dt><b>-filter</b> \<Boolean\></dt>
<dd>grupo de opciones filter<br/></dd>
<dt><b>-filter_harvest</b> \<Boolean\></dt>
<dd>filtrar durante la recolección<br/>Default: false<br/></dd>
<dt><b>-filter_io</b> \<Boolean\></dt>
<dd>filtrar al leer el filtro<br/>Default: true<br/></dd>
<dt><b>-pdb</b> \<String\></dt>
<dd>código pdb de 4/5 letras<br/></dd>
<dt><b>-lig</b> \<String\></dt>
<dd>código de ligando de 3 letras<br/></dd>
<dt><b>-motif_type</b> \<String\></dt>
<dd>bb pb sc pp<br/></dd>
<dt><b>-restype1</b> \<String\></dt>
<dd>tipos de residuo permitidos para res1<br/>Default: "ACDEFGHIKLMNPQRSTVWY"<br/></dd>
<dt><b>-restype2</b> \<String\></dt>
<dd>tipos de residuo permitidos para res2<br/>Default: "ACDEFGHIKLMNPQRSTVWY"<br/></dd>
<dt><b>-restype</b> \<String\></dt>
<dd>tipos de residuo permitidos<br/>Default: "ACDEFGHIKLMNPQRSTVWY"<br/></dd>
<dt><b>-restype_one</b> \<String\></dt>
<dd>tipos de residuo permitidos; se necesita al menos uno<br/>Default: "ACDEFGHIKLMNPQRSTVWY"<br/></dd>
<dt><b>-not_restype</b> \<String\></dt>
<dd>tipos de residuo no permitidos<br/>Default: "ACGP"<br/></dd>
<dt><b>-not_restype_one</b> \<String\></dt>
<dd>tipos de residuo no permitidos; al menos uno que no<br/>Default: "ACGP"<br/></dd>
<dt><b>-seqsep</b> \<Integer\></dt>
<dd>separación mínima de secuencia del filtro<br/>Default: 0<br/></dd>
<dt><b>-max_seqsep</b> \<Integer\></dt>
<dd>separación mínima de secuencia del filtro<br/>Default: 99999<br/></dd>
<dt><b>-no_hb_bb</b> \<Boolean\></dt>
<dd>sin enlaces de hidrógeno de la cadena principal<br/>Default: false<br/></dd>
<dt><b>-mindist2</b> \<Real\></dt>
<dd>distancia CA-CA mínima al cuadrado<br/>Default: 0.0<br/></dd>
<dt><b>-maxdist2</b> \<Real\></dt>
<dd>distancia CA-CA máxima al cuadrado<br/>Default: 999999.0<br/></dd>
<dt><b>-ss1</b> \<String\></dt>
<dd>filtrar ss1<br/>Default: ""<br/></dd>
<dt><b>-ss2</b> \<String\></dt>
<dd>filtrar ss2<br/>Default: ""<br/></dd>
<dt><b>-dssp1</b> \<String\></dt>
<dd>filtrar dssp1<br/>Default: ""<br/></dd>
<dt><b>-dssp2</b> \<String\></dt>
<dd>filtrar dssp2<br/>Default: ""<br/></dd>
<dt><b>-aa1</b> \<String\></dt>
<dd>filtrar aa1<br/>Default: ""<br/></dd>
<dt><b>-aa2</b> \<String\></dt>
<dd>filtrar aa2<br/>Default: ""<br/></dd>
<dt><b>-sasa</b> \<Real\></dt>
<dd>filtrar por sasa máxima<br/>Default: 999.0<br/></dd>
<dt><b>-faatr</b> \<Real\></dt>
<dd>filtrar por faatr máximo (por defecto 999.0 = sin filtrado<br/>Default: 999.0<br/></dd>
<dt><b>-hb_sc</b> \<Real\></dt>
<dd>filtrar por hb_sc máximo (por defecto 999.0 = sin filtrado<br/>Default: 999.0<br/></dd>
<dt><b>-hb_bb_sc</b> \<Real\></dt>
<dd>filtrar por hb_bb_sc máximo (por defecto 999.0 = sin filtrado<br/>Default: 999.0<br/></dd>
<dt><b>-hb_bb</b> \<Real\></dt>
<dd>filtrar por hb_bb máximo (por defecto 999.0 = sin filtrado<br/>Default: 999.0<br/></dd>
<dt><b>-occupancy</b> \<Real\></dt>
<dd>filtrar por ocupación mínima (por defecto 0.0 = sin filtrado<br/>Default: 0.0<br/></dd>
<dt><b>-coorderr</b> \<Real\></dt>
<dd>filtrar por bfac máximo coorderr = sqrt(B/8*pi**2)) (por defecto 999.0 = sin filtrado<br/>Default: 999.0<br/></dd>
<dt><b>-uniformfrag</b> \<Boolean\></dt>
<dd>es un fragmento y toda la estructura secundaria del fragmento es la misma<br/>Default: false<br/></dd>
<dt><b>-faatr_or_hbbb</b> \<Real\></dt>
<dd>filtro: requerir atr o hb (se permite cadena principal) por debajo del umbral<br/>Default: 999.0<br/></dd>
<dt><b>-faatr_or_hb</b> \<Real\></dt>
<dd>filtro: requerir atr o hb por debajo del umbral<br/>Default: 999.0<br/></dd>
<dt><b>-noloops</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-oneloop</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-nodisulf</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-score</b> \<Real\></dt>
<dd>filtrar por ResPairMotir::score()<br/>Default: 999.0<br/></dd>
</dl>
+ <h2>-magnesium</h2>
<dl>
<dt><b>-magnesium</b> \<Boolean\></dt>
<dd>grupo de opciones magnesium<br/></dd>
<dt><b>-scan</b> \<Boolean\></dt>
<dd>modo por defecto: barrer Mg(2+) por el PDB<br/>Default: true<br/></dd>
<dt><b>-mg_res</b> \<IntegerVector\></dt>
<dd>indica los números de residuo PDB de Mg(2+) que se examinarán [déjalo en blanco para barrer un nuevo Mg(2+)]<br/></dd>
<dt><b>-minimize_during_scoring</b> \<Boolean\></dt>
<dd>minimizar mg(2+) durante la puntuación/hidratación de cada posición<br/>Default: true<br/></dd>
<dt><b>-ligand_res</b> \<ResidueChainVector\></dt>
<dd>en el barrido, examinar las posiciones cercanas a estos residuos (numeración PDB/cadenas)<br/></dd>
<dt><b>-pose_ligand_res</b> \<IntegerVector\></dt>
<dd>en el barrido, examinar las posiciones cercanas a estos residuos, con numeración del Pose (1,2,..)<br/></dd>
<dt><b>-lores_scan</b> \<Boolean\></dt>
<dd>no intentar hidratación ni minimización durante el barrido<br/>Default: false<br/></dd>
<dt><b>-xyz_step</b> \<Real\></dt>
<dd>incremento en Å para el barrido xyz<br/>Default: 0.50<br/></dd>
<dt><b>-score_cut</b> \<Real\></dt>
<dd>corte de puntuación para la salida silent (5.0 para alta resolución; -8.0 para baja resolución)<br/>Default: 5.0<br/></dd>
<dt><b>-score_cut_PDB</b> \<Real\></dt>
<dd>corte de puntuación para la salida PDB del barrido (obsoleto)<br/>Default: 0.0<br/></dd>
<dt><b>-integration_test</b> \<Boolean\></dt>
<dd>Detenerse tras encontrar la primera posición de mg -- para pruebas<br/>Default: false<br/></dd>
<dt><b>-tether_to_closest_res</b> \<Boolean\></dt>
<dd>permanecer cerca del residuo de ligando más cercano; ayuda a forzar un muestreo de rejilla único en distintos trabajos de clúster.<br/>Default: false<br/></dd>
<dt><b>-fixup</b> \<Boolean\></dt>
<dd>modo de prueba: alinear los 6 'orbitales' virtuales octaédricos para el mg_res especificado<br/>Default: false<br/></dd>
<dt><b>-pack_water_hydrogens</b> \<Boolean\></dt>
<dd>modo de prueba: quitar las aguas que no son de mg, alinear los marcos de mg, empaquetar las aguas de mg para el mg_res especificado<br/>Default: false<br/></dd>
<dt><b>-hydrate</b> \<Boolean\></dt>
<dd>modo de prueba: quitar las aguas e hidratar mg(2+) para el mg_res especificado<br/>Default: false<br/></dd>
<dt><b>-monte_carlo</b> \<Boolean\></dt>
<dd>modo de prueba: muestreo Monte Carlo de Mg(2+) y las aguas circundantes<br/>Default: false<br/></dd>
<dt><b>-scored_hydrogen_sampling</b> \<Boolean\></dt>
<dd>en el modo de prueba -pack_water_hydrogens, al empaquetar los hidrógenos de las aguas, usar una función de puntuación completa para clasificar (lento)<br/>Default: false<br/></dd>
<dt><b>-all_hydration_frames</b> \<Boolean\></dt>
<dd>en el modo de prueba -hydration, muestrear todos los marcos de hidratación (lento)<br/>Default: false<br/></dd>
<dt><b>-leave_other_waters</b> \<Boolean\></dt>
<dd>en el modo de prueba -hydration, no quitar todas las aguas<br/>Default: false<br/></dd>
<dt><b>-minimize</b> \<Boolean\></dt>
<dd>minimizar Mg(2+) después de la hidratación o del empaquetado de hidrógenos<br/>Default: false<br/></dd>
<dt><b>-minimize_mg_coord_constraint_distance</b> \<Real\></dt>
<dd>anclaje armónico a Mg(2+) durante la minimización<br/>Default: 0.2<br/></dd>
</dl>
+ <h3>-magnesium:montecarlo</h3>
<dl>
<dt><b>-montecarlo</b> \<Boolean\></dt>
<dd>grupo de opciones montecarlo<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>temperatura para Monte Carlo<br/>Default: 1.0<br/></dd>
<dt><b>-cycles</b> \<Integer\></dt>
<dd>ciclos de Monte Carlo<br/>Default: 100000<br/></dd>
<dt><b>-dump</b> \<Boolean\></dt>
<dd>volcar PDB del Monte Carlo de Mg<br/>Default: false<br/></dd>
<dt><b>-add_delete_frequency</b> \<Real\></dt>
<dd>add_delete_frequency para Monte Carlo<br/>Default: 0.1<br/></dd>
</dl>
+ <h2>-motifs</h2>
<dl>
<dt><b>-motifs</b> \<Boolean\></dt>
<dd>grupo de opciones motifs<br/></dd>
<dt><b>-close_enough</b> \<Real\></dt>
<dd>corte de rmsd de 4 átomos a partir del cual no vale la pena intentar un rotámero inverso<br/>Default: 1.0<br/></dd>
<dt><b>-max_depth</b> \<Integer\></dt>
<dd>Profundidad máxima de recursión, es decir, número máximo de motivos que se incorporan<br/>Default: 1<br/></dd>
<dt><b>-keep_motif_xtal_location</b> \<Boolean\></dt>
<dd>se usa en dna_motif_collector: controla si los motivos se alejan de la ubicación original en el PDB (la comparación es más fácil si se mueven, así que es el valor por defecto)<br/>Default: false<br/></dd>
<dt><b>-pack_score_cutoff</b> \<Real\></dt>
<dd>se usa en dna_motif_collector: umbral de energía fa_atr + fa_rep de una interacción de dos residuos para determinar si es un motivo<br/>Default: -0.5<br/></dd>
<dt><b>-hb_score_cutoff</b> \<Real\></dt>
<dd>se usa en dna_motif_collector: umbral de energía hbond_sc de una interacción de dos residuos para determinar si es un motivo<br/>Default: -0.3<br/></dd>
<dt><b>-water_score_cutoff</b> \<Real\></dt>
<dd>se usa en dna_motif_collector: umbral de energía h2o_hbond de una interacción de dos residuos para determinar si es un motivo<br/>Default: -0.3<br/></dd>
<dt><b>-pack_min_threshold</b> \<Real\></dt>
<dd>Se usa para la extracción de motivos: las puntuaciones de empaquetado por debajo de este valor harán que se descarte un motivo<br/>Default: -9999.0<br/></dd>
<dt><b>-pack_max_threshold</b> \<Real\></dt>
<dd>Se usa para la extracción de motivos: las puntuaciones de empaquetado por encima de este valor harán que se descarte un motivo<br/>Default: 9999.0<br/></dd>
<dt><b>-hbond_min_threshold</b> \<Real\></dt>
<dd>Se usa para la extracción de motivos: las puntuaciones de enlaces de hidrógeno por debajo de este valor harán que se descarte un motivo<br/>Default: -9999.0<br/></dd>
<dt><b>-hbond_max_threshold</b> \<Real\></dt>
<dd>Se usa para la extracción de motivos: las puntuaciones de enlaces de hidrógeno por encima de este valor harán que se descarte un motivo<br/>Default: 9999.0<br/></dd>
<dt><b>-elec_min_threshold</b> \<Real\></dt>
<dd>Se usa para la extracción de motivos: las puntuaciones de fa_elec por debajo de este valor harán que se descarte un motivo<br/>Default: -9999.0<br/></dd>
<dt><b>-elec_max_threshold</b> \<Real\></dt>
<dd>Se usa para la extracción de motivos: las puntuaciones de fa_elec por encima de este valor harán que se descarte un motivo<br/>Default: 9999.0<br/></dd>
<dt><b>-duplicate_dist_cutoff</b> \<Real\></dt>
<dd>Valor para determinar si un motivo es distinto de los que ya están en una biblioteca<br/>Default: 1.0<br/></dd>
<dt><b>-duplicate_angle_cutoff</b> \<Real\></dt>
<dd>Valor para determinar si un motivo es distinto de los que ya están en una biblioteca<br/>Default: 0.4<br/></dd>
<dt><b>-motif_output_directory</b> \<String\></dt>
<dd>se usa en dna_motif_collector: ruta del directorio donde se vuelcan como pdb de 2 residuos todos los motivos recopilados<br/></dd>
<dt><b>-eliminate_weak_motifs</b> \<Boolean\></dt>
<dd>se usa en dna_motif_collector: controla si solo se cuentan los 1-2 mejores motivos para cada posición de proteína en una interfaz proteína-ADN<br/>Default: true<br/></dd>
<dt><b>-duplicate_motif_cutoff</b> \<Real\></dt>
<dd>se usa en dna_motif_collector: corte de RMSD para que una base idéntica colocada mediante un motivo permita ver si ese motivo ya existe en una biblioteca de motivos<br/>Default: 0.2<br/></dd>
<dt><b>-preminimize_motif_pdbs</b> \<Boolean\></dt>
<dd>se usa en dna_motif_collector: controla si las cadenas laterales y la cadena principal de la estructura PDB de entrada se minimizan antes de recopilar los motivos<br/>Default: false<br/></dd>
<dt><b>-preminimize_motif_pdbs_sconly</b> \<Boolean\></dt>
<dd>se usa en dna_motif_collector: controla si las cadenas laterales de la estructura PDB de entrada se minimizan antes de recopilar los motivos<br/>Default: false<br/></dd>
<dt><b>-place_adduct_waters</b> \<Boolean\></dt>
<dd>se usa en dna_motif_collector: si se colocan o no aguas de aductos antes de recopilar los motivos; si es false, no se calculará ninguna interacción con agua<br/>Default: true<br/></dd>
<dt><b>-list_motifs</b> \<FileVector\></dt>
<dd>Archivo o archivos que contienen listas de archivos PDB que se procesarán<br/></dd>
<dt><b>-motif_filename</b> \<String\></dt>
<dd>Archivo que contiene motivos<br/></dd>
<dt><b>-file_prefix</b> \<String\></dt>
<dd>Archivo que contiene motivos<br/>Default: "motif"<br/></dd>
<dt><b>-build_residue_file</b> \<String\></dt>
<dd>Archivo que contiene las posiciones objetivo para construir e incorporar motivos<br/></dd>
<dt><b>-motif_flexible_loop_file</b> \<String\></dt>
<dd>Archivo que contiene la definición del loop flexible<br/></dd>
<dt><b>-residue_trim_file</b> \<String\></dt>
<dd>Archivo con una lista de residuos que se recortan a Ala antes de incorporar motivos.<br/></dd>
<dt><b>-BPData</b> \<String\></dt>
<dd>Archivo que contiene motivos y/o rotámeros específicos de BuildPosition<br/></dd>
<dt><b>-list_dnaconformers</b> \<FileVector\></dt>
<dd>Archivo o archivos que contienen listas de archivos PDB que se procesarán<br/></dd>
<dt><b>-target_dna_defs</b> \<StringVector\></dt>
<dd><br/>Default: ""<br/></dd>
<dt><b>-motif_build_defs</b> \<StringVector\></dt>
<dd><br/>Default: ""<br/></dd>
<dt><b>-motif_build_positions</b> \<IntegerVector\></dt>
<dd><br/></dd>
<dt><b>-r1</b> \<Real\></dt>
<dd>Corte de RMSD entre la posición de anclaje del motivo y la posición objetivo del motivo para permitir que un rotámero de motivo concreto continúe y se expanda con conformeros de ADN<br/>Rango: 0-<br/>Default: 4.5<br/></dd>
<dt><b>-r2</b> \<Real\></dt>
<dd>Corte de RMSD entre la posición de anclaje del motivo y la posición objetivo del motivo para aceptar el motivo<br/>Rango: 0-<br/>Default: 1.1<br/></dd>
<dt><b>-z1</b> \<Real\></dt>
<dd>Específico de motivos de ADN: corte entre la posición de ADN objetivo del motivo y la base estandarizada para permitir que un motivo concreto continúe y se expanda con conformeros de ADN<br/>Rango: 0-<br/>Default: 0.75<br/></dd>
<dt><b>-z2</b> \<Real\></dt>
<dd>Específico de motivos de ADN: corte entre la posición de ADN objetivo del motivo y el conformero de ADN colocado según el motivo para aceptar el par de residuos<br/>Rango: 0-<br/>Default: 0.95<br/></dd>
<dt><b>-dtest</b> \<Real\></dt>
<dd>Específico de motivos de ADN: corte entre la posición de ADN objetivo del motivo y el conformero de ADN colocado según el motivo para aceptar el par de residuos<br/>Rango: 0-<br/>Default: 5.5<br/></dd>
<dt><b>-rotlevel</b> \<Integer\></dt>
<dd>nivel de muestreo de rotámeros para la búsqueda de motivos<br/>Rango: 1-<br/>Default: 5<br/></dd>
<dt><b>-num_repacks</b> \<Integer\></dt>
<dd>número de ciclos de reducción del peso de special_rot y diseño<br/>Rango: 0-<br/>Default: 5<br/></dd>
<dt><b>-minimize</b> \<Boolean\></dt>
<dd>si se minimizan o no los motivos hacia el ADN de la estructura cristalina<br/>Default: true<br/></dd>
<dt><b>-minimize_dna</b> \<Boolean\></dt>
<dd>si se minimiza o no el ADN después de cada ronda de diseño con reducción del peso de special_rot<br/>Default: true<br/></dd>
<dt><b>-run_motifs</b> \<Boolean\></dt>
<dd>si se usan o no motivos en DnaPackerMotif<br/>Default: true<br/></dd>
<dt><b>-expand_motifs</b> \<Boolean\></dt>
<dd>si se usan o no motivos expand (usar todos los tipos) en DnaPackerMotif<br/>Default: true<br/></dd>
<dt><b>-aromatic_motifs</b> \<Boolean\></dt>
<dd>si se usan o no motivos expand (usar solo tipos aromáticos) en DnaPackerMotif<br/>Default: true<br/></dd>
<dt><b>-dump_motifs</b> \<Boolean\></dt>
<dd>si se escriben o no pdb con el mejor rotámero/conformero de cada motivo<br/>Default: true<br/></dd>
<dt><b>-quick_and_dirty</b> \<Boolean\></dt>
<dd>ejecución rápida de motivos para obtener una lista de todos los motivos posibles antes de hacer una ejecución real<br/>Default: true<br/></dd>
<dt><b>-special_rotweight</b> \<Real\></dt>
<dd>peso inicial del peso sobre los rotámeros de motivos<br/>Default: -40.0<br/></dd>
<dt><b>-output_file</b> \<String\></dt>
<dd>nombre del archivo de salida de todos los mejores motivos y rotámeros o, en dna_motif_collector, el archivo donde se vuelcan todos los motivos<br/></dd>
<dt><b>-data_file</b> \<String\></dt>
<dd>nombre del archivo de salida para cualquier dato sobre cuántos rotámeros y motivos pasan qué pruebas, etc.<br/></dd>
<dt><b>-target_aa</b> \<String\></dt>
<dd>código de tres letras del aminoácido objetivo para buscar motivos<br/>Default: "LEU"<br/></dd>
<dt><b>-flex_sugar</b> \<Boolean\></dt>
<dd>si se añade o no el azúcar flexible, sin usar la forma PB de añadir opciones<br/>Default: true<br/></dd>
<dt><b>-clear_bprots</b> \<Boolean\></dt>
<dd>si se borran o no los rotámeros leídos de una ejecución anterior y se reinicia solo con los motivos leídos y el rotlevel especificado<br/>Default: true<br/></dd>
<dt><b>-rots2add</b> \<Integer\></dt>
<dd>número de rotámeros de MotifSearch que se añaden al diseño por cada tipo de aminoácido<br/>Rango: 1-<br/>Default: 100<br/></dd>
<dt><b>-restrict_to_wt</b> \<Boolean\></dt>
<dd>restringir la búsqueda de motivos a encontrar motivos del mismo aminoácido que el Pose inicial, para modelado por homología<br/>Default: true<br/></dd>
<dt><b>-rerun_motifsearch</b> \<Boolean\></dt>
<dd>configurar MotifSearch para que se ejecute de nuevo, usando los rotámeros de la posición de construcción; lo más probable es que sea para cambiar el rigor o el tipo de aminoácido en una segunda ejecución<br/>Default: true<br/></dd>
<dt><b>-no_rotamer_bump</b> \<Boolean\></dt>
<dd>omitir la comprobación de choques al crear los rotámeros que se probarán para interacciones de motivos; hace el código mucho más lento, pero si se usa bump_check se aconseja aumentar max_rotbump_energy al menos a 10.0 en lugar del valor por defecto de 5.0<br/>Default: false<br/></dd>
<dt><b>-ligand_motif_sphere</b> \<Real\></dt>
<dd>opción para especificar el radio de la búsqueda de motivos alrededor del ligando<br/>Default: 6.0<br/></dd>
<dt><b>-output_build_positions_only</b> \<Boolean\></dt>
<dd>pensado para que, si es true, solo se escriban las posiciones de construcción de la proteína y se detenga el programa<br/>Default: false<br/></dd>
<dt><b>-specific_build_position</b> \<Real\></dt>
<dd>se lee al recopilar los motivos relevantes por posición de construcción: recopila solo los motivos de esta posición de construcción; pensado para listas largas de motivos, donde lo mejor es ejecutar la recopilación de motivos por posición de construcción en paralelo<br/>Default: 0<br/></dd>
<dt><b>-verbosity</b> \<Boolean\></dt>
<dd>Booleano que indica si el usuario quiere salida detallada de los motivos rechazados en single_ligand_motif_from_stream de motif_utils.cc. Es para la versión que no mata el istream cuando se encuentra un motivo incorrecto<br/>Default: false<br/></dd>
<dt><b>-params_directory_path</b> \<String\></dt>
<dd>Ruta, dada por el usuario, a un directorio donde están los archivos params que se leerán en un script<br/>Default: " "<br/></dd>
<dt><b>-sdf_directory_path</b> \<String\></dt>
<dd>Ruta, dada por el usuario, a un directorio donde están los archivos sdf que se leerán en un script<br/>Default: " "<br/></dd>
<dt><b>-mol2_directory_path</b> \<String\></dt>
<dd>Ruta, dada por el usuario, a un directorio donde están los archivos mol2 que se leerán en un script<br/>Default: " "<br/></dd>
<dt><b>-mol2_file</b> \<String\></dt>
<dd>Nombre, dado por el usuario, del archivo mol2 que se convertirá en un archivo params. Se puede incluir la ruta al archivo.<br/>Default: " "<br/></dd>
<dt><b>-mol2_amino_acid</b> \<String\></dt>
<dd>configurar el archivo params para un aminoácido modificado; solo .mol2; edita los chi después.<br/></dd>
<dt><b>-params_custom_file_name</b> \<String\></dt>
<dd>Cadena que será el nombre del archivo params de salida (incluye en esta opción cualquier extensión y ruta)<br/></dd>
<dt><b>-ligand_3_letter_code</b> \<String\></dt>
<dd>Código personalizado de 3 letras para el ligando (si no, se tomarán las 3 primeras letras del archivo mol2)<br/></dd>
<dt><b>-ligand_1_letter_code</b> \<String\></dt>
<dd>Código personalizado de 1 letra para el ligando (si no, se tomará la primera letra del archivo mol2)<br/></dd>
<dt><b>-ligand_full_name</b> \<String\></dt>
<dd>Nombre personalizado del ligando<br/></dd>
<dt><b>-write_param_to_pdb</b> \<Boolean\></dt>
<dd>Booleano para usar en el script de generación de params e indicar que se haga un archivo pdb del ligando (para compararlo con el mol2 original y confirmar que la traducción fue exitosa)<br/>Default: false<br/></dd>
<dt><b>-protein_discovery_locus</b> \<IntegerVector\></dt>
<dd>Valor que indica el índice/locus para el que un usuario quiere ejecutar el descubrimiento de ligandos en una proteína<br/></dd>
<dt><b>-fa_rep_cutoff</b> \<Real\></dt>
<dd>Valor del corte de descubrimiento de ligandos para la puntuación fa_rep<br/>Default: 10000<br/></dd>
<dt><b>-fa_atr_cutoff</b> \<Real\></dt>
<dd>Valor del corte de descubrimiento de ligandos para la puntuación fa_atr<br/>Default: 10000<br/></dd>
<dt><b>-fa_atr_rep_cutoff</b> \<Real\></dt>
<dd>Valor del corte de descubrimiento de ligandos para la puntuación de la función de puntuación fa_atr_rep<br/>Default: 10000<br/></dd>
<dt><b>-post_highresdock_fa_atr_rep_score</b> \<Boolean\></dt>
<dd>Opción para comprobar fa_atr_rep después de realizar highresdock sobre el ligando colocado. Puede ser útil para depurar<br/>Default: false<br/></dd>
<dt><b>-ligand_wts_fxn_cutoff</b> \<Real\></dt>
<dd>Valor del corte de descubrimiento de ligandos para la puntuación de la función de puntuación ligand.wts completa<br/>Default: 10000<br/></dd>
<dt><b>-score_with_ligand_wts_function</b> \<Boolean\></dt>
<dd>Se usa en el protocolo de descubrimiento de ligandos para determinar si se desea puntuar la colocación del ligando con la función ligand.wts completa; es más lento y puede no ser necesario, por lo que es opcional<br/>Default: false<br/></dd>
<dt><b>-output_ligand_pdb</b> \<Boolean\></dt>
<dd>Opción para elegir escribir de nuevo como archivos pdb los ligandos leídos. Útil para depurar y para obtener un ligando original en su ubicación original de colocación para los cálculos de RMSD<br/>Default: false<br/></dd>
<dt><b>-check_new_param_file</b> \<Boolean\></dt>
<dd>Decidir si se prueba un archivo params generado para asegurarse de que se convirtió con exactitud (operación que consume mucho tiempo)<br/>Default: false<br/></dd>
<dt><b>-ddg_cutoff</b> \<Real\></dt>
<dd>Valor real que se usa como corte para conservar los ligandos colocados. La colocación optimizada debe ser mejor (menor) que el corte. Se usa un valor por defecto muy grande para facilitar la implementación de la variable de filtro<br/>Default: 10000<br/></dd>
<dt><b>-best_pdbs_to_keep</b> \<Integer\></dt>
<dd>Tamaño que determina cuántos ligandos colocados se conservan y se escriben como pdb. El valor por defecto 0 indica conservar todos los que lleguen a la evaluación de ddg (podrían ser muchos)<br/>Default: 0<br/></dd>
<dt><b>-resolution_scale_factor</b> \<Integer\></dt>
<dd>Escala de la resolución del protocolo de análisis de huecos. Por defecto la resolución es 1 Å cúbico. Esta variable es inversamente proporcional a la magnitud lineal de la resolución. Es decir, factor = 1 --> resolución = 1 Å^3 (lado del cubo = 1/1); factor = 2 --> resolución = 0.125 Å^3 (lado del cubo = 1/2) <br/>Default: 1<br/></dd>
<dt><b>-x_min_holes</b> \<Real\></dt>
<dd>Si se va a investigar una subregión de un pdb, esto define el valor mínimo de x de la región<br/></dd>
<dt><b>-x_max_holes</b> \<Real\></dt>
<dd>Si se va a investigar una subregión de un pdb, esto define el valor máximo de x de la región<br/></dd>
<dt><b>-y_min_holes</b> \<Real\></dt>
<dd>Si se va a investigar una subregión de un pdb, esto define el valor mínimo de y de la región<br/></dd>
<dt><b>-y_max_holes</b> \<Real\></dt>
<dd>Si se va a investigar una subregión de un pdb, esto define el valor máximo de y de la región<br/></dd>
<dt><b>-z_min_holes</b> \<Real\></dt>
<dd>Si se va a investigar una subregión de un pdb, esto define el valor mínimo de z de la región<br/></dd>
<dt><b>-z_max_holes</b> \<Real\></dt>
<dd>Si se va a investigar una subregión de un pdb, esto define el valor máximo de z de la región<br/></dd>
<dt><b>-highresdocker_allow_minimization</b> \<Boolean\></dt>
<dd>Booleano que indica si se permite (true) o no (false) la minimización en la función apply de HighResDocker<br/>Default: true<br/></dd>
<dt><b>-highresdocker_allow_repacking</b> \<Boolean\></dt>
<dd>Booleano en ligand_docking/HighResDocker para evitar que la función apply reempaquete. A menudo se quiere true, pero esto da la opción de ponerlo en false.<br/>Default: true<br/></dd>
<dt><b>-highresdocker_use_all_residues</b> \<Boolean\></dt>
<dd>Booleano en ligand_docking/HighResDocker para determinar si se usan todos los residuos en la generación del packer_task.<br/>Default: false<br/></dd>
<dt><b>-ligand_motif_output_directory_name</b> \<String\></dt>
<dd>Nombre del directorio donde se escribirán los pdb de motivos; por defecto, la ubicación desde la que se llama al script. Termina el nombre del directorio con /.<br/>Default: ""<br/></dd>
<dt><b>-ligand_motif_output_file_name</b> \<String\></dt>
<dd>Nombre del archivo donde se escribirán los motivos; por defecto, un directorio local llamado AllMattMotifs.motifs. Si no se especifica la extensión del tipo de archivo (identificada como el último punto encontrado), se escribirá en un archivo de tipo terminado en .motifs<br/>Default: "AllMattMotifs.motifs"<br/></dd>
<dt><b>-output_motifs_as_pdb</b> \<Boolean\></dt>
<dd>Escribir los motivos generados como archivos pdb<br/>Default: true<br/></dd>
<dt><b>-output_motifs</b> \<Boolean\></dt>
<dd>Escribir los motivos generados como archivo .motifs y en una MotifLibrary<br/>Default: true<br/></dd>
<dt><b>-highresdock_with_whole_score_fxn</b> \<Boolean\></dt>
<dd>Opción para alternar entre la función de puntuación simplificada fa_atr/rep o la función ligand.wts completa para highresdock en liganddiscoverysearch<br/>Default: false<br/></dd>
<dt><b>-target_residues_sf</b> \<IntegerVector\></dt>
<dd>Un vector de índices de residuos del receptor objetivo que se usan para definir la región donde evaluar la capacidad de relleno del espacio en el descubrimiento de ligandos basado en motivos<br/></dd>
<dt><b>-target_residues_contact</b> \<IntegerVector\></dt>
<dd>Un vector de índices de residuos del receptor objetivo que se usan para probar contactos proteína-ligando en el descubrimiento de ligandos basado en motivos<br/></dd>
<dt><b>-space_fill_cutoff_score</b> \<Real\></dt>
<dd>Un valor real, pensado para estar entre 0 y 1, que representa la proporción mínima aprobable de celdas ocupadas en la matriz de relleno del espacio<br/></dd>
<dt><b>-space_fill_cutoff_score_sub</b> \<Real\></dt>
<dd>Un valor real, pensado para estar entre 0 y 1, que representa la proporción mínima aprobable de celdas ocupadas en la subárea de la matriz de relleno del espacio<br/></dd>
<dt><b>-space_fill_cutoff_differential_score_sub</b> \<Real\></dt>
<dd>Un valor real, pensado para estar entre 0 y 1, que representa la diferencia mínima aprobable en las proporciones de celdas ocupadas en la subárea de la matriz de relleno del espacio para una colocación comparada con el receptor vacío. Este valor probablemente estará más cerca de 0 que de 1 (0.1-0.25), sobre todo si el receptor ocupaba mucho de la subárea.<br/></dd>
<dt><b>-binding_pocket_center_sf</b> \<IntegerVector\></dt>
<dd>Un vector de coordenadas xyz (en orden x,y,z) que corresponden a un punto central deseado en un bolsillo de unión. Se usa en el método de relleno del espacio para definir un cubo o una esfera en torno a un punto dado que sirva para indicar aproximadamente un bolsillo de unión. Los valores más allá de los 3 primeros se ignorarán y se lanzará una advertencia. Se usa el tipo de dato Real (float) para que pueda escalar con mayor precisión con el factor de resolución. Los valores se convertirán finalmente a enteros (core::Size) para referenciar índices en una matriz 3D después de escalarse. Las coordenadas se desplazarán apropiadamente dentro del algoritmo (el usuario debe introducir las coordenadas sin procesar que coincidan con el PDB de entrada).<br/></dd>
<dt><b>-binding_pocket_dimensions_sf</b> \<IntegerVector\></dt>
<dd>Un vector de valores enteros (3 valores para x,y,z) que se usan para definir el bolsillo de unión a partir del centro, que se define con binding_pocket_center_sf. Esto solo funciona si se usa la opción binding_pocket_center_sf, y puede usarse en lugar de binding_pocket_radius_sf o anularlo. Si el radio se extiende más allá de la matriz principal de la proteína, se cortará todo lo que quede fuera. Los valores aquí deben ser la mitad de la dimensión del bolsillo de unión, ya que se extiende +/- desde el centro<br/></dd>
<dt><b>-resolution_scale_factor_float</b> \<Real\></dt>
<dd>Escala de la resolución del protocolo de análisis de relleno del espacio que usa una rejilla de proteína. Cabe destacar que es un float y no un int, lo que permite reducir la resolución si es menor que 1. Por defecto la resolución es 1 Å cúbico. Esta variable es inversamente proporcional a la magnitud lineal de la resolución. Es decir, factor = 1 --> resolución = 1 Å^3 (lado del cubo = 1/1); factor = 2 --> resolución = 0.125 Å^3 (lado del cubo = 1/2) <br/>Default: 1<br/></dd>
<dt><b>-output_space_fill_matrix_pdbs</b> \<Boolean\></dt>
<dd>Escribir la matriz de relleno del espacio como átomos en un pdb que corresponden a celdas de la matriz. Útil para visualización y depuración, pero no necesario para operaciones a gran escala. La subárea se compone de átomos de nitrógeno (ocupado) y oxígeno (desocupado). Si se selecciona, el resto de la matriz se representa con flúor (ocupado) y carbono (desocupado). Debe usarse solo para usos diagnósticos pequeños, ya que es MUY lento, sobre todo si exportas toda la matriz más allá de la subárea.<br/>Default: false<br/></dd>
<dt><b>-use_whole_matrix_in_space_fill_pdb</b> \<Boolean\></dt>
<dd>Si se usa la opción output_space_fill_matrix_pdbs, esta opción (cuando es true) permite visualizar toda la matriz de relleno del espacio, en lugar de solo la subárea.<br/>Default: false<br/></dd>
<dt><b>-use_empty_space_in_space_fill_pdb</b> \<Boolean\></dt>
<dd>Si se usa la opción output_space_fill_matrix_pdbs, esta opción (cuando es true) permite visualizar la matriz de relleno del espacio, incluido el espacio vacío.<br/>Default: false<br/></dd>
<dt><b>-collect_motifs_from_placed_ligand</b> \<Boolean\></dt>
<dd>Si se usa liganddiscoverysearch, opción para elegir si se investiga si el ligando colocado forma motivos con residuos del bolsillo de unión<br/>Default: false<br/></dd>
<dt><b>-significant_residues_for_motifs</b> \<IntegerVector\></dt>
<dd>Índices de residuos de interés con los que el usuario quiere que se formen motivos con el ligando colocado. El ligando puede sobrevivir aunque no se alcancen todos los residuos de aquí<br/></dd>
<dt><b>-mandatory_residues_for_motifs</b> \<IntegerVector\></dt>
<dd>Índices de residuos de interés con los que el usuario necesita que se formen motivos con el ligando colocado. El ligando no puede sobrevivir si no se alcanzan todos los residuos de aquí<br/></dd>
<dt><b>-minimum_motifs_formed_cutoff</b> \<Integer\></dt>
<dd>Número mínimo de motivos de cualquier residuo que se requieren para que el ligando sobreviva<br/>Default: 0<br/></dd>
<dt><b>-minimum_significant_motifs_formed_cutoff</b> \<Integer\></dt>
<dd>Número mínimo de motivos de residuos significativos (definidos por significant_residues_for_motifs) que se requieren para que el ligando sobreviva<br/>Default: 0<br/></dd>
<dt><b>-check_if_ligand_motifs_match_real</b> \<Boolean\></dt>
<dd>Si se recopilan motivos del ligando colocado, comprobar si los motivos son similares a los existentes en la biblioteca de motivos inicial<br/>Default: false<br/></dd>
<dt><b>-minimum_ratio_of_real_motifs_from_ligand</b> \<Real\></dt>
<dd>Si se comprueba que los motivos del ligando colocado coinciden con los de la biblioteca de entrada, corte de proporción de cuántos deben coincidir de verdad para conservar el ligando<br/>Default: 0<br/></dd>
<dt><b>-clean_pdb_name</b> \<Boolean\></dt>
<dd>Usar un esquema de nombres más limpio para los pdb que produce liganddiscoverysearch<br/>Default: true<br/></dd>
</dl>
+ <h2>-ms</h2>
<dl>
<dt><b>-ms</b> \<Boolean\></dt>
<dd>grupo de opciones ms<br/></dd>
<dt><b>-pop_from_ss</b> \<Integer\></dt>
<dd>generar la población inicial de secuencias con base en los resultados de diseño de un solo estado<br/>Default: 0<br/></dd>
<dt><b>-pop_size</b> \<Integer\></dt>
<dd>tamaño de la población del algoritmo genético<br/>Default: 100<br/></dd>
<dt><b>-generations</b> \<Integer\></dt>
<dd>número de generaciones del algoritmo genético<br/>Default: 20<br/></dd>
<dt><b>-num_packs</b> \<Integer\></dt>
<dd>número de intentos de reempaquetado por combinación de secuencia/estado<br/>Default: 1<br/></dd>
<dt><b>-numresults</b> \<Integer\></dt>
<dd>número de resultados de mayor aptitud (fitness) que se guardan como referencia explícita al final del diseño multiestado<br/>Default: 1<br/></dd>
<dt><b>-anchor_offset</b> \<Real\></dt>
<dd>desplazamiento de energía respecto a la energía del diseño de un solo estado hacia el estado objetivo, usado para generar un ancla de afinidad para los cálculos de aptitud<br/>Default: 5.0<br/></dd>
<dt><b>-Boltz_temp</b> \<Real\></dt>
<dd>temperatura termodinámica que se usa para los cálculos de especificidad<br/>Default: 0.6<br/></dd>
<dt><b>-mutate_rate</b> \<Real\></dt>
<dd>tasa de mutación por posición<br/>Default: 0.5<br/></dd>
<dt><b>-fraction_by_recombination</b> \<Real\></dt>
<dd>fracción de la población que debe generarse por recombinación durante la etapa de evolución<br/>Default: 0.5<br/></dd>
</dl>
+ <h3>-ms:checkpoint</h3>
<dl>
<dt><b>-checkpoint</b> \<Boolean\></dt>
<dd>grupo de opciones checkpoint<br/></dd>
<dt><b>-prefix</b> \<String\></dt>
<dd>prefijo que se añade al inicio de los nombres de archivos de punto de control<br/>Default: ""<br/></dd>
<dt><b>-interval</b> \<Integer\></dt>
<dd>frecuencia con la que se escribe el punto de control de la entidad<br/>Default: 0<br/></dd>
<dt><b>-gz</b> \<Boolean\></dt>
<dd>comprimir los archivos de punto de control con gzip<br/>Default: false<br/></dd>
<dt><b>-rename</b> \<Boolean\></dt>
<dd>renombrar los archivos de punto de control cuando termina el algoritmo genético<br/>Default: false<br/></dd>
</dl>
+ <h2>-mutate</h2>
<dl>
<dt><b>-mutate</b> \<Boolean\></dt>
<dd>grupo de opciones mutate<br/></dd>
<dt><b>-mutation</b> \<StringVector\></dt>
<dd>Vector de mutaciones individuales. Formato: código de una letra / número de residuo / código de una letra. Ejemplo: A163F<br/></dd>
<dt><b>-mutant_file</b> \<String\></dt>
<dd>Archivo de entrada que contiene mutaciones<br/></dd>
</dl>
+ <h2>-nmr</h2>
<dl>
<dt><b>-nmr</b> \<Boolean\></dt>
<dd>grupo de opciones nmr<br/></dd>
</dl>
+ <h3>-nmr:pcs</h3>
<dl>
<dt><b>-pcs</b> \<Boolean\></dt>
<dd>grupo de opciones pcs<br/></dd>
<dt><b>-input_file</b> \<File\></dt>
<dd>Archivo de entrada de PCS.<br/></dd>
<dt><b>-nls_repeats</b> \<Integer\></dt>
<dd>Número de repeticiones en el ajuste por mínimos cuadrados no lineales del tensor de PCS.<br/>Rango: 1-100<br/>Default: 5<br/></dd>
<dt><b>-optimize_tensor</b> \<Boolean\></dt>
<dd>Optimizar la posición del ion lantánido y otros parámetros del tensor de PCS después de la búsqueda en rejilla.<br/>Default: false<br/></dd>
<dt><b>-multiset_weights</b> \<RealVector\></dt>
<dd>Vector de pesos de los PCSMultiSets. Un PCSMultiSet se refiere a los datos recopilados para varios lantánidos en un sitio de etiquetado.<br/></dd>
<dt><b>-normalize_data</b> \<Boolean\></dt>
<dd>Normalizar los datos de PCS de cada experimento por su desviación estándar.<br/>Default: false<br/></dd>
<dt><b>-use_symmetry_calc</b> \<Boolean\></dt>
<dd>Considerar la contribución de las subunidades simétricas en el cálculo de PCS. Solo deben proporcionarse como entrada los PCS de la subunidad asimétrica. Los residuos simétricos se deducen de la información de simetría que lleva el Pose. Como alternativa, se pueden proporcionar todos los residuos que contribuyen a un PCS como una selección de átomos ambigua en el archivo de entrada.<br/>Default: false<br/></dd>
<dt><b>-show_info</b> \<Boolean\></dt>
<dd>Mostrar información adicional sobre el cálculo de PCS (PCS experimentales frente a los calculados, y resumen del tensor de PCS) al final de cada etapa de plegamiento ab initio.<br/>Default: false<br/></dd>
</dl>
+ <h3>-nmr:rdc</h3>
<dl>
<dt><b>-rdc</b> \<Boolean\></dt>
<dd>grupo de opciones rdc<br/></dd>
<dt><b>-input_file</b> \<File\></dt>
<dd>Archivo de entrada de RDC.<br/></dd>
<dt><b>-nls_repeats</b> \<Integer\></dt>
<dd>Número de repeticiones en el ajuste por mínimos cuadrados no lineales del tensor de alineamiento.<br/>Rango: 1-100<br/>Default: 5<br/></dd>
<dt><b>-multiset_weights</b> \<RealVector\></dt>
<dd>Vector de pesos de los RDCMultiSets. Un RDCMultiSet se refiere a los datos recopilados de varios experimentos en un medio de alineamiento.<br/></dd>
<dt><b>-use_symmetry_calc</b> \<Boolean\></dt>
<dd>Considerar la contribución de las subunidades simétricas en el cálculo de RDC. Solo deben proporcionarse como entrada los RDC de la subunidad asimétrica. Los residuos simétricos se deducen de la información de simetría que lleva el Pose. Esta opción todavía es experimental y funciona hasta ahora para casos con simetría C y simetría D2 en los que los ejes del tensor de alineamiento coinciden con los ejes de simetría.<br/>Default: false<br/></dd>
<dt><b>-show_info</b> \<Boolean\></dt>
<dd>Mostrar información adicional sobre el cálculo de RDC (RDC experimentales frente a los calculados, y resumen del tensor de alineamiento) al final de cada etapa de plegamiento ab initio.<br/>Default: false<br/></dd>
<dt><b>-normalization_type</b> \<String\></dt>
<dd>Aplicar escalado a los valores de RDC de entrada. Las opciones posibles son NH, CH o none. Por defecto se espera que los RDC no estén normalizados y se escalarán respecto a N-H (es decir, la opción NH). En el caso de la opción CH, los RDC se escalarán respecto a CA-HA. Si se elige la opción none, se asume que los valores de RDC ya se normalizaron respecto a H-N y, por tanto, no se aplicará escalado adicional.<br/>Default: "NH"<br/></dd>
<dt><b>-correct_sign</b> \<Boolean\></dt>
<dd>Usar el signo correcto de la razón giromagnética de 15N y, por tanto, de las constantes de acoplamiento dipolar, es decir, positivas para NC y NH y negativas para CH. Usa esta opción si los acoplamientos de entrada tienen signos distintos. Por defecto se toma la razón giromagnética de 15N como positiva y las constantes de acoplamiento dipolar con el mismo signo.<br/>Default: false<br/></dd>
</dl>
+ <h3>-nmr:pre</h3>
<dl>
<dt><b>-pre</b> \<Boolean\></dt>
<dd>grupo de opciones pre<br/></dd>
<dt><b>-input_file</b> \<File\></dt>
<dd>Archivo de entrada de PRE.<br/></dd>
<dt><b>-nls_repeats</b> \<Integer\></dt>
<dd>Número de repeticiones en el ajuste por mínimos cuadrados no lineales del tiempo de correlación del marcador de espín (spinlabel).<br/>Rango: 1-100<br/>Default: 3<br/></dd>
<dt><b>-optimize_para_ion_position</b> \<Boolean\></dt>
<dd>Optimizar la posición del ion paramagnético. Solo en combinación con una búsqueda en rejilla.<br/>Default: false<br/></dd>
<dt><b>-multiset_weights</b> \<RealVector\></dt>
<dd>Vector de pesos de los PREMultiSets. Un PREMultiSet se refiere a varios conjuntos de datos recopilados para el mismo sitio de marcador de espín.<br/></dd>
<dt><b>-normalize_data</b> \<Boolean\></dt>
<dd>Normalizar los datos de PRE de cada experimento por su desviación estándar.<br/>Default: false<br/></dd>
<dt><b>-use_symmetry_calc</b> \<Boolean\></dt>
<dd>Considerar la contribución de las subunidades simétricas en el cálculo de PRE. Solo deben proporcionarse como entrada los PRE de la subunidad asimétrica. Los residuos simétricos se deducen de la información de simetría que lleva el Pose. Como alternativa, se pueden proporcionar todos los residuos que contribuyen a un PRE como una selección de átomos ambigua en el archivo de entrada.<br/>Default: false<br/></dd>
<dt><b>-show_info</b> \<Boolean\></dt>
<dd>Mostrar información adicional sobre el cálculo de PRE (PRE experimentales frente a los calculados, y resumen del marcador de espín de PRE) al final de cada etapa de plegamiento ab initio.<br/>Default: false<br/></dd>
</dl>
+ <h3>-nmr:spinlabel</h3>
<dl>
<dt><b>-spinlabel</b> \<Boolean\></dt>
<dd>grupo de opciones spinlabel<br/></dd>
<dt><b>-max_ensemble_size</b> \<Integer\></dt>
<dd>Número máximo de rotámeros de marcador de espín que componen el conjunto. Si el tamaño del conjunto es mayor, los rotámeros se agrupan en intervalos para acelerar el cálculo.<br/>Default: 20<br/></dd>
<dt><b>-highres_conformer_filter_type</b> \<String\></dt>
<dd>Tipo de filtrado de conformeros de marcador de espín en el modo de todos los átomos de Rosetta. Los modos posibles son: DISTANCE y BUMP_ENERGY. Por defecto es BUMP_ENERGY, en cuyo caso se comprueba si los conformeros tienen choques mediante su energía del packer. El filtro DISTANCE detecta los choques midiendo la distancia de los átomos pesados de la cadena lateral del marcador de espín al NBR_ATOM de los residuos vecinos.<br/>Default: "BUMP_ENERGY"<br/></dd>
<dt><b>-elaborate_rotamer_clash_check</b> \<Boolean\></dt>
<dd>Si es true, realizar una comprobación de choques elaborada de cada átomo pesado de todos los rotámeros del marcador de espín con los átomos de los residuos de aminoácidos circundantes. Si todos los rotámeros producen al menos un choque, devolver el rotámero con el menor número de choques. Si es false, considerar solo los átomos pesados de los rotámeros sin choques y devolver un miembro al azar en caso de que no haya rotámeros sin choques.<br/>Default: false<br/></dd>
<dt><b>-boltzmann_kt</b> \<Real\></dt>
<dd>Factor de escala para la ponderación de Boltzmann de las probabilidades de los rotámeros del marcador de espín.<br/>Default: 2.0<br/></dd>
</dl>
+ <h3>-nmr:score</h3>
<dl>
<dt><b>-score</b> \<Boolean\></dt>
<dd>grupo de opciones score<br/></dd>
<dt><b>-verbose</b> \<Boolean\></dt>
<dd>Escribir en el archivo de puntuaciones valores de puntuación y factores Q por separado para cada sitio de marcador de espín, medio de alineamiento y/o ion lantánido.<br/>Default: false<br/></dd>
<dt><b>-output_exp_calc</b> \<Boolean\></dt>
<dd>Escribir en el archivo de predicción una tabla de valores de RMN experimentales frente a calculados para cada conjunto de datos de RMN.<br/>Default: false<br/></dd>
<dt><b>-output_tensor_info</b> \<Boolean\></dt>
<dd>Escribir en el archivo de información los datos del tensor y/o del marcador de espín de cada conjunto de datos de RMN.<br/>Default: false<br/></dd>
</dl>
+ <h2>-nonlocal</h2>
<dl>
<dt><b>-nonlocal</b> \<Boolean\></dt>
<dd>grupo de opciones nonlocal<br/></dd>
<dt><b>-chunks</b> \<File\></dt>
<dd>Describe cómo se divide la estructura en trozos (chunks). Cada residuo debe estar presente en 1 y solo 1 trozo. Formato de archivo de loops.<br/></dd>
<dt><b>-randomize_missing</b> \<Boolean\></dt>
<dd>Aleatorizar las coordenadas de los loops ausentes. Esto ocurre a menudo en el plegamiento de cadena rota a partir de un alineamiento de secuencias y un pdb de plantilla. El valor por defecto es false para preservar el comportamiento existente en ThreadingJobInputter<br/>Default: false<br/></dd>
</dl>
+ <h2>-optE</h2>
<dl>
<dt><b>-optE</b> \<Boolean\></dt>
<dd>grupo de opciones optE<br/></dd>
<dt><b>-load_from_silent</b> \<String\></dt>
<dd>cargar desde silent en lugar de pdb: usa la ruta del pdb solicitado para encontrar el silent file; cada PDB debe tener todas sus estructuras en su propia carpeta (p. ej.: 1agy/pdb_set.silent); solo funciona en optimize_decoy_discrimination<br/>Default: "pdb_set.silent"<br/></dd>
<dt><b>-data_in</b> \<String\></dt>
<dd>archivo del que leer los datos de optE<br/>Default: "optE.data"<br/></dd>
<dt><b>-data_out</b> \<String\></dt>
<dd>archivo en el que escribir los datos de optE<br/>Default: "optE.data.out"<br/></dd>
<dt><b>-weights</b> \<String\></dt>
<dd>un archivo de pesos convencional que optE usará para determinar qué pesos se contarán. Todos los pesos distintos de cero del archivo contribuirán a las energías de los rotámeros y se ajustarán; usa la opción -optE::fix para fijar cualquiera de estos pesos. Los valores de peso también se usarán como valores iniciales para la optimización.<br/></dd>
<dt><b>-fix</b> \<StringVector\></dt>
<dd>pesos que se fijan (también deben aparecer en el archivo de pesos dado con la opción -optE::weights)<br/></dd>
<dt><b>-free</b> \<File\></dt>
<dd>Opción de IterativeOptEDriver: especifica un archivo del que leer los tipos de puntuación que son libres; opcionalmente incluye un peso inicial para cada tipo de puntuación<br/></dd>
<dt><b>-fixed</b> \<File\></dt>
<dd>Opción de IterativeOptEDriver: especifica un archivo del que leer tipos de puntuación y pesos de los tipos de puntuación que están activados pero fijos<br/></dd>
<dt><b>-parse_tagfile</b> \<File\></dt>
<dd>un archivo en formato utility::tag que optE puede analizar para personalizar su funcionamiento<br/></dd>
<dt><b>-constant_logic_taskops_file</b> \<File\></dt>
<dd>un archivo en formato utility::tag que optE usa para construir una tarea que no cambiará con el contexto del Pose después del diseño<br/></dd>
<dt><b>-optE_soft_rep</b> \<Boolean\></dt>
<dd>Indicar a IterativeOptEDriver que use la etable de repulsión suave<br/></dd>
<dt><b>-no_hb_env_dependence</b> \<Boolean\></dt>
<dd>Desactivar la ponderación dependiente del entorno de los términos de enlaces de hidrógeno<br/></dd>
<dt><b>-no_hb_env_dependence_DNA</b> \<Boolean\></dt>
<dd>Desactivar la ponderación dependiente del entorno de los enlaces de hidrógeno que involucran ADN<br/></dd>
<dt><b>-optE_no_protein_fa_elec</b> \<Boolean\></dt>
<dd>Indicar a IterativeOptEDriver que use la etable de repulsión suave<br/>Default: false<br/></dd>
<dt><b>-include_intra_res_protein</b> \<Boolean\></dt>
<dd>Indicar a IterativeOptEDriver que active las interacciones intrarresiduo (necesario para la función de puntuación BetaNov15)<br/>Default: false<br/></dd>
<dt><b>-centroid_rot</b> \<Boolean\></dt>
<dd>Usar los radios vdw CENTROID_ROT<br/>Default: false<br/></dd>
<dt><b>-centroid_rot_min</b> \<Boolean\></dt>
<dd>Usar los radios vdw CENTROID_ROT_MIN<br/>Default: false<br/></dd>
<dt><b>-design_first</b> \<Boolean\></dt>
<dd>No optimizar los pesos en el contexto de la estructura nativa, sino empezar diseñando la proteína con el conjunto de pesos de entrada. Requiere que todos los tipos de puntuación listados en -optE::free tengan pesos especificados.<br/></dd>
<dt><b>-n_design_cycles</b> \<Integer\></dt>
<dd>El número de ciclos de diseño del bucle externo que se completan; el valor por defecto es 10, tras lo cual normalmente ya ha ocurrido la convergencia<br/>Default: 10<br/></dd>
<dt><b>-recover_nat_rot</b> \<Boolean\></dt>
<dd>Con el driver iterativo de optE, reempaquetar para recuperar los rotámeros nativos<br/></dd>
<dt><b>-component_weights</b> \<File\></dt>
<dd>Con el driver iterativo de optE, ponderar los componentes individuales según el archivo de entrada; el peso por defecto es 1 para todos los componentes. El archivo de pesos consiste en pares nombre-de-componente/peso en líneas separadas: p. ej. prob_native_structure 100.0<br/></dd>
<dt><b>-optimize_nat_aa</b> \<Boolean\></dt>
<dd>Con el driver iterativo de optE, optimizar los pesos para maximizar la probabilidad del rotámero nativo<br/></dd>
<dt><b>-optimize_nat_rot</b> \<Boolean\></dt>
<dd>Con el driver iterativo de optE, optimizar los pesos para maximizar la probabilidad del rotámero nativo en el contexto nativo<br/></dd>
<dt><b>-optimize_ligand_rot</b> \<File\></dt>
<dd>Con el driver iterativo de optE, optimizar los pesos para maximizar la probabilidad del rotámero nativo alrededor del ligando<br/></dd>
<dt><b>-optimize_pssm</b> \<Boolean\></dt>
<dd>Con el driver iterativo de optE, optimizar los pesos para maximizar la coincidencia con una distribución de probabilidad pssm generada por BLAST<br/></dd>
<dt><b>-optimize_dGbinding</b> \<File\></dt>
<dd>Con el driver iterativo de optE, optimizar los pesos para minimizar el error cuadrático entre el dG de unión predicho y el dG experimental; proporciona un archivo que liste 1. la estructura PDB unida, 2. la estructura PDB no unida y 3. el dG medido<br/></dd>
<dt><b>-optimize_ddG_bind_correlation</b> \<File\></dt>
<dd>Con el driver iterativo de optE, optimizar los pesos para minimizar el error cuadrático entre el ddG de unión predicho para una mutación y el ddG experimental; proporciona un archivo que liste 1. un archivo de lista con los complejos wt, 2. un archivo de lista con los complejos mut, 3. un archivo de lista con las estructuras no unidas wt, 4. un archivo de lista con las estructuras no unidas mut y 5. el ddG de unión medido<br/></dd>
<dt><b>-optimize_ddGmutation</b> \<File\></dt>
<dd>Con el driver iterativo de optE, optimizar los pesos para minimizar la diferencia entre el ddG de mutación predicho y el ddG medido; proporciona un archivo que liste 1. la lista de pdb wt reempaquetados, 2. la lista de pdb mut reempaquetados y 3. tripletas de ddG medido<br/></dd>
<dt><b>-optimize_ddGmutation_straight_mean</b> \<Boolean\></dt>
<dd>Con el driver iterativo de optE, predecir que el ddGmut es la diferencia entre el promedio simple (1/n Sum(E_i)) de las estructuras WT y MUT proporcionadas. Requiere que esté fijada la opción -optimize_ddGmutation.<br/></dd>
<dt><b>-optimize_ddGmutation_boltzman_average</b> \<Boolean\></dt>
<dd>Con el driver iterativo de optE, predecir que el ddGmut es la diferencia entre las energías promedio de Boltzmann ( Sum( E_i * e**-E_i/kT)/Sum( e**-E_i/kT) ) de las estructuras WT y MUT proporcionadas. Requiere que esté fijada la opción -optimize_ddGmutation.<br/></dd>
<dt><b>-exclude_badrep_ddGs</b> \<Real\></dt>
<dd>Con el driver iterativo de optE, considerar solo los datos de ddG donde el delta mut-wt de la energía repulsiva sin ponderar < el valor dado<br/></dd>
<dt><b>-pretend_no_ddG_repulsion</b> \<Boolean\></dt>
<dd>Con el driver iterativo de optE, poner en cero todas las puntuaciones repulsivas al buscar correlaciones de ddG<br/></dd>
<dt><b>-optimize_decoy_discrimination</b> \<File\></dt>
<dd>Con el driver iterativo de optE, optimizar los pesos para maximizar la separación entre nativos relajados y decoys de baja puntuación. El archivo es una lista de pares de listas de archivos y un solo archivo pdb < native_pdb_list, decoy_pdb_list, crystal_native_pdb >.<br/></dd>
<dt><b>-normalize_decoy_score_spread</b> \<String\></dt>
<dd>En la optimización de la discriminación de decoys, normalizar tanto las energías de los nativos como las de los decoys generadas por un conjunto de pesos por sigma_curr /sigma_start, donde sigma_start se calcula como la desviación estándar de las energías de los decoys dado un conjunto de pesos de entrada<br/></dd>
<dt><b>-ramp_nativeness</b> \<Boolean\></dt>
<dd>En la optimización de la discriminación de decoys, dar a las estructuras en el rango entre max_rms_from_native y min_decoy_rms_to_native una puntuación de «nativeness» (que baja linealmente de 1 a 0 en ese rango) e incluir las puntuaciones de las estructuras en el numerador de la partición.<br/></dd>
<dt><b>-n_top_natives_to_optimize</b> \<Integer\></dt>
<dd>Para usar con la opción -optimize_decoy_discrimination. La función objetivo considera los N mejores nativos en la función de partición<br/>Default: 1<br/></dd>
<dt><b>-approximate_decoy_entropy</b> \<Real\></dt>
<dd>Expansión alfa del tamaño del espacio conformacional como función de nres: tamaño ~ alfa ^ nres; entropía ~ nres ln alfa.<br/></dd>
<dt><b>-repack_and_minimize_decoys</b> \<Boolean\></dt>
<dd>Generar nuevas estructuras en cada ronda del optE iterativo reempaquetando y minimizando los decoys y nativos de entrada con los pesos obtenidos en la última ronda<br/></dd>
<dt><b>-repack_and_minimize_input_structures</b> \<Boolean\></dt>
<dd>Minimizar los decoys y nativos de entrada con los pesos iniciales: da a las estructuras la oportunidad de «ver» la función de energía antes de que comience la discriminación de decoys, sin el consumo de memoria de la opción repack_and_minimize_decoys<br/></dd>
<dt><b>-output_top_n_new_decoys</b> \<Integer\></dt>
<dd>Para usar con la opción repack_and_minimize_decoys: escribir los N mejores decoys generados en cada ronda de este refinamiento iterativo<br/>Default: 0<br/></dd>
<dt><b>-optimize_ligand_discrimination</b> \<File\></dt>
<dd>Con el driver iterativo de optE, optimizar los pesos para maximizar la separación entre nativos relajados y decoys de baja puntuación. El archivo es una lista de pares de listas de archivos y un solo archivo pdb < native_pdb_list, decoy_pdb_list, crystal_native_pdb >.<br/></dd>
<dt><b>-no_design</b> \<Boolean\></dt>
<dd>No molestarse en cargar pdb ni en hacer diseño; solo optimizar los pesos para discriminación de decoys y/o recuperación de rotámeros nativos<br/></dd>
<dt><b>-sqrt_pssm</b> \<Boolean\></dt>
<dd>Convertir los vectores de probabilidad pssm en vectores unitarios para que el producto escalar sea una verdadera medida de similitud<br/></dd>
<dt><b>-min_decoy_rms_to_native</b> \<Real\></dt>
<dd>Para usar con la opción optimize_decoy_discrimination: excluir los decoys que estén dentro de cierto RMS de la estructura nativa<br/></dd>
<dt><b>-max_rms_from_native</b> \<Real\></dt>
<dd>Para usar con la opción optimize_decoy_discrimination: excluir los nativos que estén a más de cierto RMS de la estructura cristalina. Con max_rms_from_native de 1.5 y min_decoy_rms_from_native de 2.0 se descartarían las estructuras en el rango de 1.5 y 2.0 de RMS<br/></dd>
<dt><b>-optimize_starting_free_weights</b> \<Boolean\></dt>
<dd>Con el driver iterativo de optE, probar muchos puntos de partida distintos para la minimización<br/>Default: false<br/></dd>
<dt><b>-wrap_dof_optimization</b> \<File\></dt>
<dd>Crear nuevos grados de libertad (dofs) y configurar dependencias aritméticas para los dofs libres.<br/></dd>
<dt><b>-randomly_perturb_starting_free_weights</b> \<Real\></dt>
<dd>Con el driver iterativo de optE, perturbar los pesos en +/- <valor de entrada> para los pesos listados como libres<br/></dd>
<dt><b>-inv_kT_natrot</b> \<Real\></dt>
<dd>1 / kT para la función de aptitud pNativeRotamer<br/>Default: 1<br/></dd>
<dt><b>-inv_kT_nataa</b> \<Real\></dt>
<dd>1 / kT para la función de aptitud pNatAA y PSSM<br/>Default: 1<br/></dd>
<dt><b>-inv_kT_natstruct</b> \<Real\></dt>
<dd>1 / kT para la función de aptitud pNativeStructure<br/>Default: 1<br/></dd>
<dt><b>-mpi_weight_minimization</b> \<Boolean\></dt>
<dd>Distribuir las evaluaciones func/dfunc de OptEMultifunc entre los nodos<br/></dd>
<dt><b>-dont_use_reference_energies</b> \<Boolean\></dt>
<dd>No usar energías de referencia en ninguna parte del protocolo.<br/>Default: false<br/></dd>
<dt><b>-number_of_swarm_particles</b> \<Integer\></dt>
<dd>El número de partículas que se usan durante la optimización de pesos por enjambre de partículas.<br/>Default: 100<br/></dd>
<dt><b>-number_of_swarm_cycles</b> \<Integer\></dt>
<dd>El número de ciclos que se ejecuta el minimizador de enjambre.<br/>Default: 20<br/></dd>
<dt><b>-constrain_weights</b> \<File\></dt>
<dd>Al minimizar la función objetivo de aptitud, incluir también restricciones de pesos en la función objetivo<br/></dd>
<dt><b>-fit_reference_energies_to_aa_profile_recovery</b> \<Boolean\></dt>
<dd>En la etapa de bucle interno de recuperación de secuencia/ajuste de pesos, aceptar o rechazar los conjuntos de pesos con base tanto en la tasa de recuperación de secuencia como en la información mutua entre las distribuciones de frecuencia de aminoácidos esperada y observada<br/></dd>
<dt><b>-starting_refEs</b> \<File\></dt>
<dd>Opción de IterativeOptEDriver: especifica un archivo de pesos del que leer las energías de referencia; no optimizar las energías de referencia en la primera ronda de ajuste de pesos<br/></dd>
<dt><b>-repeat_swarm_optimization_until_fitness_improves</b> \<Boolean\></dt>
<dd>Después de la primera pasada por la fase de optimización por enjambre de partículas, si la aptitud final no es mejor que la inicial, recrear el enjambre alrededor de los dofs iniciales y repetir la optimización del enjambre.<br/>Default: false<br/></dd>
<dt><b>-design_with_minpack</b> \<Boolean\></dt>
<dd>Usar el min-packer para diseñar durante las etapas de recuperación de secuencia.<br/>Default: false<br/></dd>
<dt><b>-design_with_fast_design</b> \<Boolean\></dt>
<dd>Usar FastDesign para diseñar durante las etapas de recuperación de secuencia.<br/>Default: false<br/></dd>
<dt><b>-design_with_offrotpack</b> \<Boolean\></dt>
<dd>Usar el off-rotamer-packer para diseñar durante las etapas de recuperación de secuencia.<br/>Default: false<br/></dd>
<dt><b>-limit_bad_scores</b> \<Boolean\></dt>
<dd>Salir después de 100,000 errores inf o NaN en la función objetivo de optE<br/></dd>
<dt><b>-no_design_pdb_output</b> \<Boolean\></dt>
<dd>No escribir los pdb diseñados en los directorios workdir_ durante la ejecución de optE<br/></dd>
</dl>
+ <h3>-optE:rescore</h3>
<dl>
<dt><b>-rescore</b> \<Boolean\></dt>
<dd>grupo de opciones rescore<br/></dd>
<dt><b>-weights</b> \<File\></dt>
<dd>Conjunto de pesos que se usa al volver a puntuar las funciones de partición de optE<br/></dd>
<dt><b>-context_round</b> \<Integer\></dt>
<dd>Entero que indica los PDB de contexto generados durante el diseño que se usan para medir pNatAA<br/></dd>
<dt><b>-outlog</b> \<File\></dt>
<dd>Archivo en el que se deben escribir los datos de OptEPosition<br/></dd>
<dt><b>-measure_sequence_recovery</b> \<Boolean\></dt>
<dd>Al volver a puntuar un conjunto de pesos, ejecutar el diseño con ese conjunto de pesos y medir la recuperación de secuencia.<br/>Default: false<br/></dd>
</dl>
+ <h2>-packstat</h2>
<dl>
<dt><b>-packstat</b> \<Boolean\></dt>
<dd>grupo de opciones packstat<br/></dd>
<dt><b>-include_water</b> \<Boolean\></dt>
<dd>Volver a las etables al estilo antiguo<br/>Default: false<br/></dd>
<dt><b>-oversample</b> \<Integer\></dt>
<dd>Precisión de las mediciones de SASA<br/>Default: 0<br/></dd>
<dt><b>-packstat_pdb</b> \<Boolean\></dt>
<dd>Escribir un pdb con visualizaciones del empaquetado<br/>Default: false<br/></dd>
<dt><b>-surface_accessibility</b> \<Boolean\></dt>
<dd>Calcular información adicional de enterramiento de cavidades<br/>Default: false<br/></dd>
<dt><b>-residue_scores</b> \<Boolean\></dt>
<dd>Escribir la puntuación de cada residuo<br/>Default: false<br/></dd>
<dt><b>-cavity_burial_probe_radius</b> \<Real\></dt>
<dd>Radio de la sonda para considerar una cavidad enterrada<br/>Default: 1.4<br/></dd>
<dt><b>-raw_stats</b> \<Boolean\></dt>
<dd>Escribir las estadísticas sin procesar por residuo (para entrenamiento, etc...)<br/>Default: false<br/></dd>
<dt><b>-threads</b> \<Integer\></dt>
<dd>Número de hilos que se usarán (0 para no usar hilos)<br/>Default: 0<br/></dd>
<dt><b>-cluster_min_volume</b> \<Real\></dt>
<dd>los huecos más pequeños que esto no se mostrarán.<br/>Default: 30<br/></dd>
<dt><b>-min_surface_accessibility</b> \<Real\></dt>
<dd>los huecos deben estar al menos así de expuestos<br/>Default: -1.0<br/></dd>
<dt><b>-min_cluster_overlap</b> \<Real\></dt>
<dd>las bolas de hueco deben solaparse tanto como esto para agruparse<br/>Default: 0.1<br/></dd>
<dt><b>-min_cav_ball_radius</b> \<Real\></dt>
<dd>radio de la bola de hueco más pequeña que se considera<br/>Default: 0.7<br/></dd>
</dl>
+ <h2>-patterson</h2>
<dl>
<dt><b>-patterson</b> \<Boolean\></dt>
<dd>grupo de opciones patterson<br/></dd>
<dt><b>-weight</b> \<Real\></dt>
<dd>peso de la correlación de Patterson<br/>Default: 0.0<br/></dd>
<dt><b>-sc_scaling</b> \<Real\></dt>
<dd>Escalar la densidad de las cadenas laterales por esta cantidad (por defecto = igual a la densidad de la cadena principal)<br/>Default: 1.0<br/></dd>
<dt><b>-radius_cutoffs</b> \<RealVector\></dt>
<dd>cortes de radio en el espacio de Patterson<br/></dd>
<dt><b>-resolution_cutoffs</b> \<RealVector\></dt>
<dd>cortes de F^2 en el espacio recíproco<br/></dd>
<dt><b>-Bsol</b> \<Real\></dt>
<dd>B del solvente<br/>Default: 300.0<br/></dd>
<dt><b>-Fsol</b> \<Real\></dt>
<dd>fracción de solvente<br/>Default: 0.95<br/></dd>
<dt><b>-model_B</b> \<Real\></dt>
<dd>factor B para calcular el CC de Patterson<br/>Default: 0.0<br/></dd>
<dt><b>-rmsd</b> \<Real\></dt>
<dd>Error RMS esperado para el cálculo de sigma-A<br/>Default: 2.0<br/></dd>
<dt><b>-no_ecalc</b> \<Boolean\></dt>
<dd>No normalizar p_o con ecalc<br/>Default: false<br/></dd>
<dt><b>-nshells</b> \<Integer\></dt>
<dd>Número de capas de resolución para la normalización de Patterson<br/>Default: 50<br/></dd>
<dt><b>-use_spline_interpolation</b> \<Boolean\></dt>
<dd>¿usar interpolación spline para evaluar derivadas? (por defecto trilineal)<br/>Default: false<br/></dd>
<dt><b>-use_on_repack</b> \<Boolean\></dt>
<dd>LENTO: usar la correlación de Patterson en los reempaquetados (por defecto no)<br/>Default: false<br/></dd>
<dt><b>-dont_use_symm_in_pcalc</b> \<Boolean\></dt>
<dd>realizar Pcalc en P1 (por defecto no)<br/>Default: false<br/></dd>
</dl>
+ <h2>-pb_potential</h2>
<dl>
<dt><b>-pb_potential</b> \<Boolean\></dt>
<dd>grupo de opciones pb_potential<br/></dd>
<dt><b>-charged_chains</b> \<IntegerVector\></dt>
<dd>Números de cadena que llevan carga en el cálculo de PB<br/>Default: 1<br/></dd>
<dt><b>-sidechain_only</b> \<Boolean\></dt>
<dd>Calcular solo las interacciones con la cadena lateral.<br/>Default: true<br/></dd>
<dt><b>-revamp_near_chain</b> \<IntegerVector\></dt>
<dd>Reducir las interacciones PB si están cerca de la cadena dada. Usa números de cadena como entrada.<br/></dd>
<dt><b>-apbs_path</b> \<String\></dt>
<dd>Ruta al ejecutable de APBS (Adaptive Poisson-Boltzmann Solver)<br/></dd>
<dt><b>-potential_cap</b> \<Real\></dt>
<dd>Tope para la entrada del potencial PB<br/>Default: 20.0<br/></dd>
<dt><b>-tolerance</b> \<Real\></dt>
<dd>Tolerancia en Å. Cuando un átomo cargado se mueve más allá de esta tolerancia, se vuelve a resolver la ecuación en derivadas parciales (PDE).<br/>Default: 1.0<br/></dd>
<dt><b>-apbs_debug</b> \<Integer\></dt>
<dd>Nivel de depuración de APBS [0-6]<br/>Default: 2<br/></dd>
<dt><b>-calcenergy</b> \<Boolean\></dt>
<dd>¿Calcular la energía?<br/>Default: false<br/></dd>
</dl>
+ <h2>-PCS</h2>
<dl>
<dt><b>-PCS</b> \<Boolean\></dt>
<dd>grupo de opciones PCS<br/></dd>
<dt><b>-write_extra</b> \<File\></dt>
<dd>Escribir en el archivo PCS calc, PCS exp, PCS dev e información del tensor, EN CADA EVALUACIÓN DE ENERGÍA. Más adecuado para volver a puntuar<br/></dd>
<dt><b>-normalization_id</b> \<Integer\></dt>
<dd>Normalizar cada conjunto de datos individual. El entero identifica el método de normalización que se usará<br/></dd>
</dl>
+ <h2>-PCSTS1</h2>
<dl>
<dt><b>-PCSTS1</b> \<Boolean\></dt>
<dd>grupo de opciones PCSTS1<br/></dd>
<dt><b>-write_extra</b> \<File\></dt>
<dd>Escribir en el archivo PCS calc, PCS exp, PCS dev e información del tensor, EN CADA EVALUACIÓN DE ENERGÍA. Más adecuado para volver a puntuar<br/></dd>
<dt><b>-normalization_id</b> \<Integer\></dt>
<dd>Normalizar cada conjunto de datos individual. El entero identifica el método de normalización que se usará<br/></dd>
</dl>
+ <h2>-PCSTS2</h2>
<dl>
<dt><b>-PCSTS2</b> \<Boolean\></dt>
<dd>grupo de opciones PCSTS2<br/></dd>
<dt><b>-write_extra</b> \<File\></dt>
<dd>Escribir en el archivo PCS calc, PCS exp, PCS dev e información del tensor, EN CADA EVALUACIÓN DE ENERGÍA. Más adecuado para volver a puntuar<br/></dd>
<dt><b>-normalization_id</b> \<Integer\></dt>
<dd>Normalizar cada conjunto de datos individual. El entero identifica el método de normalización que se usará<br/></dd>
</dl>
+ <h2>-PCSTS3</h2>
<dl>
<dt><b>-PCSTS3</b> \<Boolean\></dt>
<dd>grupo de opciones PCSTS3<br/></dd>
<dt><b>-write_extra</b> \<File\></dt>
<dd>Escribir en el archivo PCS calc, PCS exp, PCS dev e información del tensor, EN CADA EVALUACIÓN DE ENERGÍA. Más adecuado para volver a puntuar<br/></dd>
<dt><b>-normalization_id</b> \<Integer\></dt>
<dd>Normalizar cada conjunto de datos individual. El entero identifica el método de normalización que se usará<br/></dd>
</dl>
+ <h2>-PCSTS4</h2>
<dl>
<dt><b>-PCSTS4</b> \<Boolean\></dt>
<dd>grupo de opciones PCSTS4<br/></dd>
<dt><b>-write_extra</b> \<File\></dt>
<dd>Escribir en el archivo PCS calc, PCS exp, PCS dev e información del tensor, EN CADA EVALUACIÓN DE ENERGÍA. Más adecuado para volver a puntuar<br/></dd>
<dt><b>-normalization_id</b> \<Integer\></dt>
<dd>Normalizar cada conjunto de datos individual. El entero identifica el método de normalización que se usará<br/></dd>
</dl>
+ <h2>-pepspec</h2>
<dl>
<dt><b>-pepspec</b> \<Boolean\></dt>
<dd>grupo de opciones pepspec<br/></dd>
<dt><b>-soft_wts</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "soft_rep.wts"<br/></dd>
<dt><b>-cen_wts</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "cen_ghost.wts"<br/></dd>
<dt><b>-binding_score</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-no_cen</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-no_cen_rottrials</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-run_sequential</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-pep_anchor</b> \<Integer\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-pep_chain</b> \<String\></dt>
<dd>Sin descripción<br/>Default: " "<br/></dd>
<dt><b>-n_peptides</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 8<br/></dd>
<dt><b>-n_build_loop</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 1000<br/></dd>
<dt><b>-n_cgrelax_loop</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 1<br/></dd>
<dt><b>-n_dock_loop</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 4<br/></dd>
<dt><b>-interface_cutoff</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 5.0<br/></dd>
<dt><b>-use_input_bb</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-remove_input_bb</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-homol_csts</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "prep.csts"<br/></dd>
<dt><b>-p_homol_csts</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1.0<br/></dd>
<dt><b>-gen_pep_bb_sequential</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-input_seq</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-ss_type</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-upweight_interface</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-calc_sasa</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-diversify_pep_seqs</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-diversify_lvl</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 10<br/></dd>
<dt><b>-dump_cg_bb</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-save_low_pdbs</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: true<br/></dd>
<dt><b>-save_all_pdbs</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-no_design</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-pdb_list</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-ref_pdb_list</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-add_buffer_res</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-cg_res_type</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "ALA"<br/></dd>
<dt><b>-native_pep_anchor</b> \<Integer\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-native_pep_chain</b> \<String\></dt>
<dd>Sin descripción<br/>Default: ""<br/></dd>
<dt><b>-native_align</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-rmsd_analysis</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-anchor_type</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "ALA"<br/></dd>
<dt><b>-no_prepack_prot</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-prep_use_ref_rotamers</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-n_prepend</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-n_append</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-clash_cutoff</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 5<br/></dd>
<dt><b>-n_anchor_dock_std_devs</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1.0<br/></dd>
<dt><b>-prep_trans_std_dev</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.5<br/></dd>
<dt><b>-prep_rot_std_dev</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 10.0<br/></dd>
<dt><b>-seq_align</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-prep_align_prot_to</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
</dl>
+ <h2>-pH</h2>
<dl>
<dt><b>-pH</b> \<Boolean\></dt>
<dd>grupo de opciones pH<br/></dd>
<dt><b>-pH_mode</b> \<Boolean\></dt>
<dd>Permitir versiones protonadas/desprotonadas de los residuos según el pH<br/>Default: false<br/></dd>
<dt><b>-keep_input_protonation_state</b> \<Boolean\></dt>
<dd>¿Leer los estados de protonación de los residuos del pdb de entrada?<br/>Default: false<br/></dd>
<dt><b>-value_pH</b> \<Real\></dt>
<dd>Valor de pH de entrada para la puntuación pHEnergy<br/>Default: 7.0<br/></dd>
</dl>
+ <h3>-pH:calc_pka</h3>
<dl>
<dt><b>-calc_pka</b> \<Boolean\></dt>
<dd>grupo de opciones calc_pka<br/></dd>
<dt><b>-pka_all</b> \<Boolean\></dt>
<dd>¿Calcular los valores de pKa de todos los residuos de proteína protonables del PDB?<br/>Default: false<br/></dd>
<dt><b>-pka_for_resnos</b> \<RealVector\></dt>
<dd>Número de residuo cuyo valor de pKa se va a determinar<br/>Default: 0<br/></dd>
<dt><b>-pka_for_chainno</b> \<String\></dt>
<dd>Número de cadena del residuo cuyo pKa se va a determinar<br/>Default: "A"<br/></dd>
<dt><b>-pH_neighbor_pack</b> \<Boolean\></dt>
<dd>¿Empaquetar los vecinos mientras se calcula el pKa?<br/>Default: false<br/></dd>
<dt><b>-pka_rad</b> \<Real\></dt>
<dd>Radio de reempaquetado<br/>Default: 5.0<br/></dd>
<dt><b>-pH_prepack</b> \<Boolean\></dt>
<dd>¿Pre-empaquetar la estructura antes de calcular los valores de pKa?<br/>Default: false<br/></dd>
<dt><b>-pH_relax</b> \<Boolean\></dt>
<dd>¿Aplicar relax a la estructura antes de calcular los valores de pKa?<br/>Default: false<br/></dd>
<dt><b>-rotamer_prot_stats</b> \<Boolean\></dt>
<dd>¿Obtener estadísticas de protonación de rotámeros al titular?<br/>Default: false<br/></dd>
</dl>
+ <h2>-pH</h2>
<dl>
<dt><b>-pH_unbound</b> \<FileVector\></dt>
<dd>Nombre o nombres de los archivos PDB del receptor y el ligando sin unir<br/></dd>
<dt><b>-output_raw_scores</b> \<Boolean\></dt>
<dd>¿Devolver las puntuaciones sin procesar que contribuyen a la puntuación de la interfaz?<br/></dd>
<dt><b>-pre_process</b> \<Boolean\></dt>
<dd>¿Refinar la orientación de cuerpo rígido?<br/></dd>
<dt><b>-cognate_partners</b> \<String\></dt>
<dd>IDs de cadena del complejo afín (cognate)<br/>Default: "_"<br/></dd>
<dt><b>-cognate_pdb</b> \<File\></dt>
<dd>Archivo que contiene el complejo antígeno-anticuerpo afín<br/></dd>
</dl>
+ <h2>-pocket_grid</h2>
<dl>
<dt><b>-pocket_grid</b> \<Boolean\></dt>
<dd>grupo de opciones pocket_grid<br/></dd>
<dt><b>-pocket_grid_size</b> \<Real\></dt>
<dd>espaciado de la rejilla en Å<br/>Default: 0<br/></dd>
<dt><b>-pocket_grid_size_x</b> \<Real\></dt>
<dd>espaciado de la rejilla en Å<br/>Default: 10<br/></dd>
<dt><b>-pocket_grid_size_y</b> \<Real\></dt>
<dd>espaciado de la rejilla en Å<br/>Default: 10<br/></dd>
<dt><b>-pocket_grid_size_z</b> \<Real\></dt>
<dd>espaciado de la rejilla en Å<br/>Default: 10<br/></dd>
<dt><b>-pocket_grid_spacing</b> \<Real\></dt>
<dd>espaciado de la rejilla en Å<br/>Default: 0.5<br/></dd>
<dt><b>-pocket_max_spacing</b> \<Real\></dt>
<dd>Distancia máxima residuo-residuo para considerarse un bolsillo<br/>Default: 8<br/></dd>
<dt><b>-pocket_min_size</b> \<Real\></dt>
<dd>Tamaño mínimo de bolsillo que se puntúa, en Å cúbicos<br/>Default: 10<br/></dd>
<dt><b>-pocket_max_size</b> \<Real\></dt>
<dd>Tamaño máximo de bolsillo que se informa, en Å cúbicos; 0 para sin límite<br/>Default: 0<br/></dd>
<dt><b>-pocket_probe_radius</b> \<Real\></dt>
<dd>radio de la molécula sonda de superficie<br/>Default: 1.0<br/></dd>
<dt><b>-central_relax_pdb_num</b> \<String\></dt>
<dd>Número de residuo:(opcional)Cadena alrededor del cual se hace la restricción de bolsillo (Pocket Constraint)<br/>Default: "-1"<br/></dd>
<dt><b>-pocket_ntrials</b> \<Integer\></dt>
<dd>Número de intentos que se usan para backrub<br/>Default: 100000<br/></dd>
<dt><b>-pocket_num_angles</b> \<Integer\></dt>
<dd>Número de ángulos distintos del Pose en los que se mide la puntuación del bolsillo<br/>Default: 100<br/></dd>
<dt><b>-pocket_side</b> \<Boolean\></dt>
<dd>Incluir solo residuos de cadena lateral para la superficie objetivo<br/>Default: false<br/></dd>
<dt><b>-pocket_dump_pdbs</b> \<Boolean\></dt>
<dd>Generar archivos PDB<br/>Default: false<br/></dd>
<dt><b>-pocket_dump_exemplars</b> \<Boolean\></dt>
<dd>Generar archivos PDB ejemplares<br/>Default: false<br/></dd>
<dt><b>-pocket_filter_by_exemplar</b> \<Boolean\></dt>
<dd>Restringir el bolsillo a los ejemplares<br/>Default: false<br/></dd>
<dt><b>-pocket_limit_exemplar_color</b> \<Boolean\></dt>
<dd>Incluir donadores/aceptores de superficie solo cuando estén dentro del alcance del bolsillo principal<br/>Default: true<br/></dd>
<dt><b>-pocket_limit_small_exemplars</b> \<Boolean\></dt>
<dd>Exigir que el ejemplar tenga al menos 5 elementos hidrofóbicos para escribirlo en el archivo de ejemplares<br/>Default: true<br/></dd>
<dt><b>-pocket_dump_rama</b> \<Boolean\></dt>
<dd>Generar mapas de Ramachandran para cada clúster de bolsillos<br/>Default: false<br/></dd>
<dt><b>-pocket_restrict_size</b> \<Boolean\></dt>
<dd>Los bolsillos demasiado grandes devuelven una puntuación de 0<br/>Default: false<br/></dd>
<dt><b>-pocket_ignore_buried</b> \<Boolean\></dt>
<dd>Ignorar los bolsillos que no están expuestos al solvente<br/>Default: true<br/></dd>
<dt><b>-pocket_only_buried</b> \<Boolean\></dt>
<dd>Identificar solo los bolsillos enterrados en el núcleo de la proteína (fija automáticamente -pocket_ignored_buried false)<br/>Default: false<br/></dd>
<dt><b>-pocket_psp</b> \<Boolean\></dt>
<dd>Marcar también los eventos Bolsillo-Solvente-Bolsillo<br/>Default: true<br/></dd>
<dt><b>-pocket_sps</b> \<Boolean\></dt>
<dd>Desmarcar los eventos Solvente-Bolsillo-Solvente<br/>Default: false<br/></dd>
<dt><b>-pocket_search13</b> \<Boolean\></dt>
<dd>Buscar en 13 direcciones (todas las caras y aristas de un cubo) en lugar de caras y diagonal<br/>Default: false<br/></dd>
<dt><b>-pocket_surface_score</b> \<Real\></dt>
<dd>Puntuación dada a la superficie del bolsillo<br/>Default: 0<br/></dd>
<dt><b>-pocket_surface_dist</b> \<Real\></dt>
<dd>Distancia para considerar la superficie del bolsillo<br/>Default: 2.5<br/></dd>
<dt><b>-pocket_buried_score</b> \<Real\></dt>
<dd>Puntuación dada a los puntos del bolsillo profundamente enterrados<br/>Default: 5.0<br/></dd>
<dt><b>-pocket_buried_dist</b> \<Real\></dt>
<dd>Distancia para considerar el bolsillo enterrado<br/>Default: 2.0<br/></dd>
<dt><b>-pocket_exemplar_vdw_pen</b> \<Real\></dt>
<dd>Penalización máxima temporal para la clase vdW en el descubrimiento de ejemplares<br/>Default: 300.0<br/></dd>
<dt><b>-pocket_debug_output</b> \<Boolean\></dt>
<dd>Imprimir toda la salida de depuración relacionada con los bolsillos<br/>Default: false<br/></dd>
<dt><b>-dump_pocketGrid</b> \<Boolean\></dt>
<dd>imprimir los puntos de la rejilla del bolsillo en un archivo PDB<br/>Default: false<br/></dd>
<dt><b>-dump_Grid</b> \<Boolean\></dt>
<dd>imprimir los puntos de la rejilla en un archivo PDB<br/>Default: false<br/></dd>
<dt><b>-extend_eggshell</b> \<Boolean\></dt>
<dd>Extender los puntos de la cáscara de huevo (eggshell)<br/>Default: false<br/></dd>
<dt><b>-extend_eggshell_dist</b> \<Real\></dt>
<dd>Distancia para extender la cáscara de huevo<br/>Default: 1<br/></dd>
<dt><b>-extra_eggshell_dist</b> \<Real\></dt>
<dd>Distancia para extender los puntos extra de la cáscara de huevo<br/>Default: 4<br/></dd>
<dt><b>-eggshell_dist</b> \<Real\></dt>
<dd>Distancia para extender los puntos de la cáscara de huevo desde los átomos del ligando<br/>Default: 4<br/></dd>
<dt><b>-reduce_rays</b> \<Boolean\></dt>
<dd>reducir el número de rayos redondeando y eliminando coordenadas xyz duplicadas<br/>Default: true<br/></dd>
<dt><b>-pocket_static_grid</b> \<Boolean\></dt>
<dd>Sin rejilla de autoexpansión<br/>Default: false<br/></dd>
<dt><b>-dump_espGrid</b> \<Boolean\></dt>
<dd>imprimir la rejilla de potencial electrostático en un archivo PDB<br/>Default: false<br/></dd>
<dt><b>-dump_connollySurface</b> \<Boolean\></dt>
<dd>imprimir los puntos de la superficie de Connolly en un archivo PDB<br/>Default: false<br/></dd>
<dt><b>-esp_buffer_dist</b> \<Real\></dt>
<dd>distancia de búfer que se suma al radio de vdW del átomo al asignar valores de potencial electrostático<br/>Default: 0.5<br/></dd>
<dt><b>-round_pocketGrid_center</b> \<Boolean\></dt>
<dd>round_pocketGrid_center<br/>Default: true<br/></dd>
</dl>
+ <h2>-gen_pharmacophore</h2>
<dl>
<dt><b>-gen_pharmacophore</b> \<Boolean\></dt>
<dd>grupo de opciones gen_pharmacophore<br/></dd>
<dt><b>-clash_distance_cutoff</b> \<Real\></dt>
<dd>corte de distancia de choque para incluir átomos ideales de enlace de hidrógeno<br/>Default: 1.0<br/></dd>
<dt><b>-ring_sasa_cutoff</b> \<Integer\></dt>
<dd>ring_sasa_cutoff para incluir en el farmacóforo<br/>Default: 25<br/></dd>
<dt><b>-min_num_ring</b> \<Integer\></dt>
<dd>número mínimo de anillos en un clúster<br/>Default: 1<br/></dd>
<dt><b>-ring_ring_dist_cutoff</b> \<Real\></dt>
<dd>distancia anillo - átomo del anillo para incluir en los clústeres del farmacóforo<br/>Default: 5.0<br/></dd>
<dt><b>-ring_atm_dist_cutoff</b> \<Real\></dt>
<dd>distancia anillo - átomo de enlace de hidrógeno para incluir en los clústeres del farmacóforo<br/>Default: 5.0<br/></dd>
</dl>
+ <h2>-fingerprint</h2>
<dl>
<dt><b>-fingerprint</b> \<Boolean\></dt>
<dd>grupo de opciones fingerprint<br/></dd>
<dt><b>-print_eggshell</b> \<Boolean\></dt>
<dd>imprimir los puntos de la cáscara de huevo en un archivo PDB<br/>Default: false<br/></dd>
<dt><b>-atom_radius_scale</b> \<Real\></dt>
<dd>Escala para reducir el radio del átomo<br/>Default: 0.9<br/></dd>
<dt><b>-atom_radius_buffer</b> \<Real\></dt>
<dd>Valor que se resta de todos los radios atómicos, para igualar el grosor del búfer de PocketGrid<br/>Default: 1.0<br/></dd>
<dt><b>-packing_weight</b> \<Real\></dt>
<dd>Añadir peso a la gran desviación de rho<br/>Default: 1<br/></dd>
<dt><b>-dist_cut_off</b> \<Real\></dt>
<dd>fijar la distancia de corte para añadir peso de empaquetado<br/>Default: 5<br/></dd>
<dt><b>-include_extrashell_to_set_origin</b> \<Boolean\></dt>
<dd>incluir puntos de extrashell para fijar el origen<br/>Default: false<br/></dd>
<dt><b>-include_hydrogens</b> \<Boolean\></dt>
<dd>incluir átomos de hidrógeno en la huella (fingerprint)<br/>Default: false<br/></dd>
<dt><b>-multiple_origin</b> \<Boolean\></dt>
<dd>fijar varios puntos de origen para el trazado de rayos<br/>Default: false<br/></dd>
<dt><b>-use_DARC_gpu</b> \<Boolean\></dt>
<dd>usar GPU al calcular la puntuación DARC<br/>Default: false<br/></dd>
<dt><b>-square_score</b> \<Boolean\></dt>
<dd>elevar al cuadrado los términos de la función de puntuación DARC<br/>Default: false<br/></dd>
<dt><b>-darc_components</b> \<Boolean\></dt>
<dd>obtener la puntuación de los componentes individuales de la función de puntuación DARC<br/>Default: false<br/></dd>
<dt><b>-set_origin</b> \<Integer\></dt>
<dd>opción para fijar el origen: 0 para elegir el origen según el valor de R (rugosidad), 1 para protein_center, 2 para eggshell_bottom, 3 para el vector desde el plano de la cáscara de huevo más cercano a protein_center, 4 para el vector desde el plano de la cáscara de huevo más lejano a protein_center, 5 para elegir como origen el centro de un residuo (usa la opción -origin_res_num para elegir el número de residuo)<br/>Default: 0<br/></dd>
<dt><b>-origin_res_num</b> \<String\></dt>
<dd>Número de residuo:(opcional)Cadena que se usa como origen del trazado de rayos<br/>Default: "1"<br/></dd>
<dt><b>-add_esp</b> \<Boolean\></dt>
<dd>añadir cálculos electrostáticos<br/>Default: false<br/></dd>
<dt><b>-darc_shape_only</b> \<Boolean\></dt>
<dd>darc solo con forma<br/>Default: false<br/></dd>
<dt><b>-darc_elsts_only</b> \<Boolean\></dt>
<dd>darc solo con electrostática<br/>Default: false<br/></dd>
<dt><b>-esp_weight</b> \<Real\></dt>
<dd>añadir peso para la energía electrostática<br/>Default: 0.117<br/></dd>
<dt><b>-esp_protein_wt</b> \<Real\></dt>
<dd>añadir peso para la energía electrostática dentro de la proteína<br/>Default: 0<br/></dd>
<dt><b>-esp_surface_wt</b> \<Real\></dt>
<dd>añadir peso para la energía electrostática en la superficie de la proteína<br/>Default: 0<br/></dd>
<dt><b>-delphi_grid</b> \<Boolean\></dt>
<dd>rejilla de potencial electrostático de entrada, si es de DELPHI; por defecto es una rejilla de ZAP<br/>Default: false<br/></dd>
<dt><b>-cap_e_potential</b> \<Real\></dt>
<dd>valor máximo/mínimo para limitar el potencial electrostático<br/>Default: 10.0<br/></dd>
<dt><b>-return_zero_darc_score</b> \<Boolean\></dt>
<dd>devolver 0 como puntuación darc<br/>Default: false<br/></dd>
<dt><b>-set_surface_esp_to_zero</b> \<Boolean\></dt>
<dd>poner en cero el potencial electrostático de la superficie<br/>Default: false<br/></dd>
<dt><b>-set_protein_esp_to_zero</b> \<Boolean\></dt>
<dd>poner en cero el potencial electrostático de la proteína<br/>Default: false<br/></dd>
<dt><b>-inp_lig</b> \<String\></dt>
<dd>inp_lig<br/>Default: "inp_lig.pdb"<br/></dd>
<dt><b>-ref_lig</b> \<String\></dt>
<dd>ref_lig<br/>Default: "ref_lig.pdb"<br/></dd>
</dl>
+ <h2>-ProQ</h2>
<dl>
<dt><b>-ProQ</b> \<Boolean\></dt>
<dd>grupo de opciones ProQ<br/></dd>
<dt><b>-svmmodel</b> \<Integer\></dt>
<dd>Modelo SVM que se usará (en validación cruzada, por defecto se usan todos [1-5])<br/>Default: 1<br/></dd>
<dt><b>-basename</b> \<String\></dt>
<dd>ubicación del nombre base del archivo de entrada específico de la secuencia)<br/>Default: ""<br/></dd>
<dt><b>-membrane</b> \<Boolean\></dt>
<dd>usar la versión de membrana (ProQM)<br/>Default: false<br/></dd>
<dt><b>-prof_bug</b> \<Boolean\></dt>
<dd>reproducir el error del perfil en ProQres<br/>Default: false<br/></dd>
<dt><b>-output_feature_vector</b> \<Boolean\></dt>
<dd>escribe el vector de características<br/>Default: false<br/></dd>
<dt><b>-output_local_prediction</b> \<Boolean\></dt>
<dd>escribe los valores locales predichos<br/>Default: false<br/></dd>
<dt><b>-prefix</b> \<String\></dt>
<dd>prefijo para los archivos de salida)<br/>Default: ""<br/></dd>
<dt><b>-use_gzip</b> \<Boolean\></dt>
<dd>comprimir con gzip los archivos de salida<br/>Default: false<br/></dd>
<dt><b>-normalize</b> \<Real\></dt>
<dd>Factor de normalización (normalmente la longitud de la secuencia objetivo)<br/>Default: 1.0<br/></dd>
</dl>
+ <h2>-protein_grid</h2>
<dl>
<dt><b>-protein_grid</b> \<Boolean\></dt>
<dd>grupo de opciones protein_grid<br/></dd>
<dt><b>-output_whole_matrix</b> \<Boolean\></dt>
<dd>Si se usa la opción output_space_fill_matrix_pdbs, esta opción (cuando es true) permite visualizar toda la matriz de relleno del espacio, en lugar de solo la subárea.<br/>Default: false<br/></dd>
<dt><b>-output_empty_space</b> \<Boolean\></dt>
<dd>Si se usa la opción output_space_fill_matrix_pdbs, esta opción (cuando es true) permite visualizar la matriz de relleno del espacio, incluido el espacio vacío.<br/>Default: false<br/></dd>
</dl>
+ <h2>-qsar</h2>
<dl>
<dt><b>-qsar</b> \<Boolean\></dt>
<dd>grupo de opciones qsar<br/></dd>
<dt><b>-weights</b> \<String\></dt>
<dd>seleccionar el conjunto de pesos qsar que se usará<br/>Default: "talaris2013"<br/></dd>
<dt><b>-grid_dir</b> \<String\></dt>
<dd>Directorio donde se guardan las rejillas<br/></dd>
<dt><b>-max_grid_cache_size</b> \<Integer\></dt>
<dd>borrar las rejillas antiguas si la caché de rejillas supera el tamaño especificado<br/>Default: 10<br/></dd>
</dl>
+ <h2>-rbe</h2>
<dl>
<dt><b>-rbe</b> \<Boolean\></dt>
<dd>grupo de opciones rbe<br/></dd>
<dt><b>-server_url</b> \<String\></dt>
<dd>URL del servidor para el backend de rosetta<br/></dd>
<dt><b>-server_port</b> \<String\></dt>
<dd>puerto para el backend de rosetta<br/>Default: "80"<br/></dd>
<dt><b>-poll_frequency</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 1.0<br/></dd>
</dl>
+ <h2>-RBSegmentRelax</h2>
<dl>
<dt><b>-RBSegmentRelax</b> \<Boolean\></dt>
<dd>grupo de opciones RBSegmentRelax<br/></dd>
<dt><b>-input_pdb</b> \<File\></dt>
<dd>archivo pdb de entrada<br/>Default: "--"<br/></dd>
<dt><b>-rb_file</b> \<File\></dt>
<dd>archivo de segmentos rb de entrada<br/>Default: "--"<br/></dd>
<dt><b>-nrbmoves</b> \<Integer\></dt>
<dd>número de movimientos de cuerpo rígido<br/>Default: 100<br/></dd>
<dt><b>-nrboutercycles</b> \<Integer\></dt>
<dd>número de movimientos de cuerpo rígido<br/>Default: 5<br/></dd>
<dt><b>-rb_scorefxn</b> \<String\></dt>
<dd>número de movimientos de cuerpo rígido<br/>Default: "score5"<br/></dd>
<dt><b>-skip_fragment_moves</b> \<Boolean\></dt>
<dd>omitir las inserciones de fragmentos (en elementos de estructura secundaria)<br/>Default: false<br/></dd>
<dt><b>-skip_seqshift_moves</b> \<Boolean\></dt>
<dd>omitir los movimientos de desplazamiento de secuencia<br/>Default: false<br/></dd>
<dt><b>-skip_rb_moves</b> \<Boolean\></dt>
<dd>omitir los movimientos de cuerpo rígido<br/>Default: false<br/></dd>
<dt><b>-helical_movement_params</b> \<RealVector\></dt>
<dd>helical-axis-rotation, helical-axis-translation, off-axis-rotation, off-axis-translation<br/>Default: utility::vector1<float>(4,0.0)<br/></dd>
<dt><b>-strand_movement_params</b> \<RealVector\></dt>
<dd>strand-in-plane-rotation, strand-in-plane-translation, out-of-plane-rotation, out-of-plane-translationn<br/>Default: utility::vector1<float>(4,0.0)<br/></dd>
<dt><b>-default_movement_params</b> \<RealVector\></dt>
<dd>default-rotation, default-translation<br/>Default: utility::vector1<float>(2,0.0)<br/></dd>
<dt><b>-cst_seqwidth</b> \<Integer\></dt>
<dd>ancho de la secuencia en las restricciones<br/>Default: 0<br/></dd>
</dl>
+ <h2>-hydrate</h2>
<dl>
<dt><b>-hydrate</b> \<Boolean\></dt>
<dd>grupo de opciones hydrate<br/></dd>
<dt><b>-hyfile</b> \<File\></dt>
<dd>Este archivo define qué residuos se hidratan; añade aguas de novo alrededor de sus átomos polares.<br/></dd>
<dt><b>-hydrate_all</b> \<Boolean\></dt>
<dd>Añadir moléculas de agua de novo a toda la estructura; no es compatible con el diseño.<br/>Default: false<br/></dd>
<dt><b>-ignore_fa_sol_at_positions</b> \<IntegerVector\></dt>
<dd>Poner en cero todas las contribuciones de solvatación implícita cuando involucren los números de posición del IntegerVector dado.<br/>Default: []<br/></dd>
<dt><b>-attempt_all_polar</b> \<Boolean\></dt>
<dd>Intentar hidratar todos los átomos polares, tengan o no espacio.<br/>Default: false<br/></dd>
<dt><b>-partial_hydrate_dew</b> \<Real\></dt>
<dd>Durante la primera ronda de empaquetado al usar moléculas de agua de doble borde (dew), solo se considerará esta fracción de las aguas de novo.<br/>Default: 0.75<br/></dd>
<dt><b>-water_energy_threshold</b> \<Real\></dt>
<dd>Las moléculas de agua con energía por encima de este umbral se eliminarán después del empaquetado.<br/>Default: 5.0<br/></dd>
<dt><b>-water_rotamers_cap</b> \<Integer\></dt>
<dd>Limita el número máximo de rotámeros de agua.<br/>Default: 500<br/></dd>
<dt><b>-water_packing_radius</b> \<Real\></dt>
<dd>Define el radio que una molécula de agua puede explorar durante el empaquetado<br/>Default: 1.0<br/></dd>
<dt><b>-water_angular_resolution</b> \<Real\></dt>
<dd>Define la resolución angular de los rotámeros de agua. Como consecuencia, también define el número de rotámeros de cada molécula de agua ((2*space_res+1)^3 * 2 * 2*ang_res^2).<br/>Default: 3<br/></dd>
<dt><b>-water_space_resolution</b> \<Real\></dt>
<dd>Define la resolución espacial de los rotámeros de agua. Como consecuencia, también define el número de rotámeros de cada molécula de agua ((2*space_res+1)^3 * 2 * 2*ang_res^2).<br/>Default: 2<br/></dd>
<dt><b>-hbond_threshold</b> \<Real\></dt>
<dd>Umbral de enlace de hidrógeno. Los nuevos rotámeros de agua deben formar un enlace de hidrógeno de al menos este valor.<br/>Default: -0.1<br/></dd>
<dt><b>-hbond_entropy_threshold</b> \<Real\></dt>
<dd>Umbral para que los enlaces de hidrógeno de las aguas contribuyan a la entropía.<br/>Default: -0.5<br/></dd>
<dt><b>-water_desolvation</b> \<Real\></dt>
<dd>Energía de desolvatación de una molécula de agua. Diferencia de energía entre una molécula en agua libre y cerca de una proteína. Este valor se escalará por el peso de la función de puntuación para wat_desolv<br/>Default: 4.8<br/></dd>
<dt><b>-pack_nloop</b> \<Integer\></dt>
<dd>Cuántas veces reempaquetar<br/>Default: 25<br/></dd>
<dt><b>-pre_bump_check</b> \<Boolean\></dt>
<dd>Hacer la comprobación de choques antes de guardarlos en memoria<br/>Default: true<br/></dd>
<dt><b>-bias_design_search_to_native</b> \<Boolean\></dt>
<dd>Da una energía negativa artificialmente grande a cualquier rotámero nativo durante el empaquetado. Se implementó para probar el uso de aguas de diseño.<br/>Default: false<br/></dd>
<dt><b>-show_derivatives_check</b> \<Boolean\></dt>
<dd>Mostrar la comprobación de derivadas al minimizar en el protocolo hydrate.<br/>Default: false<br/></dd>
<dt><b>-keep_non_buried_waters</b> \<Boolean\></dt>
<dd>Conservar en la estructura final las aguas no enterradas (no recomendado).<br/>Default: false<br/></dd>
<dt><b>-display_water_hb_network</b> \<Boolean\></dt>
<dd>Muestra las conexiones de enlaces de hidrógeno de las aguas.<br/>Default: true<br/></dd>
<dt><b>-show_pre_post_filter_water_rotamers</b> \<Boolean\></dt>
<dd>Muestra la ubicación exigente de los rotámeros de agua posteriores y previos al filtrado.<br/>Default: false<br/></dd>
<dt><b>-show_pre_filtered_water_rotamers_count</b> \<Boolean\></dt>
<dd>Muestra el número total de rotámeros de agua previos al filtrado; ayuda a evaluar los requisitos de memoria.<br/>Default: false<br/></dd>
<dt><b>-show_residues_near_water</b> \<Boolean\></dt>
<dd>Imprimir los residuos que están cerca de agua hidratable después del empaquetado y la colocación de aguas.<br/>Default: false<br/></dd>
<dt><b>-only_remove_non_buried_waters</b> \<Boolean\></dt>
<dd>Quitar de la entrada las aguas no enterradas y luego salir.<br/>Default: false<br/></dd>
<dt><b>-just_score</b> \<Boolean\></dt>
<dd>Solo puntuar las estructuras de entrada con el protocolo de solvatación híbrida.<br/>Default: false<br/></dd>
<dt><b>-show_rotamer_count</b> \<Boolean\></dt>
<dd>Escribir los recuentos de rotámeros de cada agua y aminoácido, y luego salir.<br/>Default: false<br/></dd>
<dt><b>-protein_flexibility</b> \<String\></dt>
<dd>Define la flexibilidad de la proteína durante la ejecución<br/>Default: "not"<br/></dd>
<dt><b>-near_water_threshold</b> \<Real\></dt>
<dd>Umbral para que un residuo se considere flexible al usar la opción near_water en -hydrate:protein_flexibility<br/>Default: 4.0<br/></dd>
<dt><b>-minimize_bb_where_packing</b> \<Boolean\></dt>
<dd>Permitir que la cadena principal se mueva al minimizar.<br/>Default: false<br/></dd>
<dt><b>-dont_hydrate_hb_engaged_bb_O</b> \<Boolean\></dt>
<dd>Evitar hidratar los oxígenos de la cadena principal que participan en enlaces de hidrógeno, incluso si es solo un enlace de hidrógeno. El propósito es evitar alterar estructuras estables (hélices y láminas).<br/>Default: true<br/></dd>
<dt><b>-short_residence_time_mode</b> \<Boolean\></dt>
<dd>Un modo más rápido para capturar moléculas de agua con tiempo de residencia corto. No es bueno para predicciones de energía, y los resultados se analizan mejor como un conjunto que como una sola estructura.<br/>Default: false<br/></dd>
<dt><b>-min_backbone_file</b> \<File\></dt>
<dd>Este archivo define si la cadena principal puede moverse para un residuo específico.<br/></dd>
<dt><b>-single_away_rotamer</b> \<Boolean\></dt>
<dd>Usar un solo rotámero de agua distante (away). El muestreo se sesga hacia mantener más agua presente.<br/>Default: false<br/></dd>
<dt><b>-force_enforce_all_waters</b> \<Boolean\></dt>
<dd>Mantener las moléculas de agua forzadas durante todo el protocolo de solvatación híbrida.<br/>Default: false<br/></dd>
</dl>
+ <h2>-rdc</h2>
<dl>
<dt><b>-rdc</b> \<Boolean\></dt>
<dd>grupo de opciones rdc<br/></dd>
<dt><b>-correct_NH_length</b> \<Boolean\></dt>
<dd>fijar el vector de enlace N-H en 1.04, como se midió en Ottiger y Bax 98<br/>Default: true<br/></dd>
<dt><b>-reduced_couplings</b> \<Boolean\></dt>
<dd>da pesos más equitativos a distintos vectores de enlace<br/>Default: false<br/></dd>
<dt><b>-weights</b> \<File\></dt>
<dd>especificar pesos para residuos individuales (funciona para todos los acoplamientos de este residuo)<br/></dd>
<dt><b>-iterate_weights</b> \<Real\></dt>
<dd>hacer un cálculo de wRDC, es decir, iterar el cálculo del tensor hasta que los pesos sean ~exp ( -dev2/sigma )<br/>Default: 1<br/></dd>
<dt><b>-segment_file</b> \<File\></dt>
<dd>Definición de segmentos rígidos para la optimización del tensor de alineamiento<br/></dd>
<dt><b>-segment_scoring_mode</b> \<String\></dt>
<dd>Tipo de tratamiento de la puntuación basada en el tensor de alineamiento: pairwise o fixed_axis_z (p. ej., para homodímeros) <br/></dd>
<dt><b>-total_weight</b> \<Real\></dt>
<dd>Peso de las puntuaciones RDC de cada tensor de alineamiento<br/>Default: 1.0<br/></dd>
<dt><b>-tensor_weight</b> \<Real\></dt>
<dd>Peso de la puntuación por pares de los tensores de alineamiento<br/>Default: 1.0<br/></dd>
<dt><b>-print_rdc_values</b> \<File\></dt>
<dd>imprimir los valores de RDC calculados frente a los experimentales<br/></dd>
<dt><b>-iterate_tol</b> \<Real\></dt>
<dd>tolerancia para las iteraciones del tensor<br/>Default: 0.01<br/></dd>
<dt><b>-iterate_reset</b> \<Boolean\></dt>
<dd>restablecer los pesos a 1.0 al optimizar para una estructura nueva<br/>Default: false<br/></dd>
<dt><b>-dump_weight_trajectory</b> \<File\></dt>
<dd>si es sí, escribir los pesos en un archivo en cada evento de puntuación<br/></dd>
<dt><b>-fix_normAzz</b> \<RealVector\></dt>
<dd>dividir por este componente axial del tensor<br/></dd>
<dt><b>-fit_method</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "nls"<br/></dd>
<dt><b>-fixDa</b> \<RealVector\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-fixR</b> \<RealVector\></dt>
<dd>Sin descripción<br/></dd>
<dt><b>-nlsrepeat</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 5<br/></dd>
</dl>
+ <h2>-relax</h2>
<dl>
<dt><b>-relax</b> \<Boolean\></dt>
<dd>grupo de opciones relax<br/></dd>
<dt><b>-fast</b> \<Boolean\></dt>
<dd>Hacer un FastRelax preestablecido con un número pequeño de ciclos<br/></dd>
<dt><b>-thorough</b> \<Boolean\></dt>
<dd>Hacer un FastRelax preestablecido con un número grande de ciclos<br/></dd>
<dt><b>-centroid_mode</b> \<Boolean\></dt>
<dd>Usar el protocolo relax centroide<br/>Default: false<br/></dd>
<dt><b>-default_repeats</b> \<Integer\></dt>
<dd>Número de repeticiones por defecto que hace FastRelax. ¡No tiene efecto si se usa un script personalizado!<br/>Default: 5<br/></dd>
<dt><b>-dualspace</b> \<Boolean\></dt>
<dd>Hacer 3 ciclos de FastRelax de relajación en coordenadas internas seguidos de dos ciclos de relajación cartesiana: se requiere el término de energía cart_bonded, el término de energía pro_close debe desactivarse y se recomienda usar -relax::minimize_bond_angles. Usar la opción -nonideal cambia todo esto y configura los ciclos de minimización correctos, el tipo de minimizador, etc.<br/></dd>
<dt><b>-cyclic_peptide</b> \<Boolean\></dt>
<dd>Configurar restricciones N a C en un péptido cíclico<br/></dd>
</dl>
+ <h3>-relax:range</h3>
<dl>
<dt><b>-range</b> \<Boolean\></dt>
<dd>grupo de opciones range<br/></dd>
<dt><b>-set_tm_helical</b> \<Boolean\></dt>
<dd>Fijar estructura secundaria helicoidal en la región transmembrana<br/>Default: false<br/></dd>
<dt><b>-kT</b> \<Real\></dt>
<dd>Opción avanzada: kT<br/>Default: 1.0<br/></dd>
<dt><b>-angle_max</b> \<Real\></dt>
<dd>Desviación máxima del ángulo diedro para Small y ShearMover dentro de RangeRelax<br/>Default: 0.1<br/></dd>
<dt><b>-nmoves</b> \<String\></dt>
<dd>Número de movimientos Small y Shear dentro de RangeRelax; puede ser 'nres' para todos los residuos o un entero<br/>Default: "nres"<br/></dd>
<dt><b>-spherical_wave</b> \<Boolean\></dt>
<dd>Aplicar relax en un patrón de onda esférica empezando en el residuo central hacia afuera.<br/>Default: false<br/></dd>
<dt><b>-repack_again</b> \<Boolean\></dt>
<dd>Hacer una ronda adicional de reempaquetado de todos los residuos después de RangeRelax<br/>Default: false<br/></dd>
<dt><b>-cycles</b> \<Integer\></dt>
<dd>Número máximo de ciclos de reempaquetado y minimización. Por defecto 3<br/>Default: 3<br/></dd>
<dt><b>-min_cycles</b> \<Integer\></dt>
<dd>Número máximo de ciclos dentro del minimizador. Por defecto 2000<br/>Default: 2000<br/></dd>
<dt><b>-idealize</b> \<Boolean\></dt>
<dd>Idealizar el decoy después de la ejecución. Por defecto: true<br/>Default: true<br/></dd>
<dt><b>-skip_relax</b> \<Boolean\></dt>
<dd>Omitir el paso de relax. Por defecto: false<br/>Default: false<br/></dd>
</dl>
+ <h2>-relax</h2>
<dl>
<dt><b>-ramady</b> \<Boolean\></dt>
<dd>Ejecutar el código ramady, que alivia las malas energías de Ramachandran atascadas<br/>Default: false<br/></dd>
<dt><b>-ramady_rms_limit</b> \<Real\></dt>
<dd>(solo ramady) Rechazar los cambios de rama que perturben la estructura en más de esto<br/>Default: 0.5<br/></dd>
<dt><b>-ramady_cutoff</b> \<Real\></dt>
<dd>(solo ramady) Corte a partir del cual una rama se considera mala<br/>Default: 2.0<br/></dd>
<dt><b>-ramady_max_rebuild</b> \<Integer\></dt>
<dd>(solo ramady) El número máximo de ramas malas que se corrigen por ciclo de reempaquetado-minimización<br/>Default: 1<br/></dd>
<dt><b>-ramady_force</b> \<Boolean\></dt>
<dd>(solo ramady) Forzar la reconstrucción de ramas malas (tasa normal de omisión = 10%)<br/>Default: false<br/></dd>
<dt><b>-script</b> \<File\></dt>
<dd>Archivo de script de relax<br/>Default: ""<br/></dd>
<dt><b>-script_max_accept</b> \<Integer\></dt>
<dd>Limitar el número de mejores aceptaciones<br/>Default: 10000000<br/></dd>
<dt><b>-superimpose_to_native</b> \<Boolean\></dt>
<dd>Superponer la estructura de entrada al nativo<br/>Default: false<br/></dd>
<dt><b>-superimpose_to_file</b> \<File\></dt>
<dd>Superponer la estructura de entrada a un archivo<br/>Default: "false"<br/></dd>
<dt><b>-constrain_relax_to_native_coords</b> \<Boolean\></dt>
<dd>Para relax y fastrelax, anclar las coordenadas de la cadena principal de los pdb que se relajan a las coordenadas del nativo cristalino<br/>Default: false<br/></dd>
<dt><b>-constrain_relax_to_start_coords</b> \<Boolean\></dt>
<dd>Para relax y fastrelax, anclar las coordenadas de la cadena principal de los pdb que se relajan a las coordenadas del nativo cristalino<br/>Default: false<br/></dd>
<dt><b>-coord_constrain_sidechains</b> \<Boolean\></dt>
<dd>Para relax y fastrelax, anclar también las coordenadas de los átomos pesados de las cadenas laterales (requiere -constrain_relax_to_native_coords o -constrain_relax_to_start_coords)<br/>Default: false<br/></dd>
<dt><b>-sc_cst_maxdist</b> \<Real\></dt>
<dd>Usar restricciones de distancia entre pares de átomos de cadenas laterales de entrada que estén más cerca que el corte superior de distancia dado (0 => sin restricciones sc-sc)<br/>Default: 0.0<br/></dd>
<dt><b>-limit_aroma_chi2</b> \<Boolean\></dt>
<dd>limitar el rotámero chi2 de PHE, TYR e HIS alrededor de 90 <br/>Default: false<br/></dd>
<dt><b>-respect_resfile</b> \<Boolean\></dt>
<dd>Indicar a FastRelax que respete el resfile de entrada. Se usa principalmente para hacer diseño dentro de FastRelax.<br/>Default: false<br/></dd>
<dt><b>-use_explicit_water</b> \<Boolean\></dt>
<dd>Considerar las aguas explícitas (parte del protocolo de solvatación híbrida) durante relax<br/>Default: false<br/></dd>
<dt><b>-movemap_disables_packing_of_fixed_chi_positions</b> \<Boolean\></dt>
<dd>Si es true, las posiciones en las que el MoveMap impide la minimización de cadenas laterales también tendrán desactivado el empaquetado. False por defecto.<br/>Default: false<br/></dd>
<dt><b>-bb_move</b> \<Boolean\></dt>
<dd>permitir que la cadena principal se mueva durante relax<br/>Default: true<br/></dd>
<dt><b>-chi_move</b> \<Boolean\></dt>
<dd>permitir que la cadena lateral se mueva durante relax<br/>Default: true<br/></dd>
<dt><b>-jump_move</b> \<Boolean\></dt>
<dd>permitir que el salto se mueva durante relax<br/>Default: false<br/></dd>
<dt><b>-dna_move</b> \<Boolean\></dt>
<dd>permitir que el ADN se mueva durante relax y permitir interacciones ADN-ADN. Funciona mejor con la función de puntuación orbitals. El ADN se mantiene unido con excelentes resultados de molprobity. No se recomienda para uso general por ahora.<br/>Default: false<br/></dd>
<dt><b>-fix_omega</b> \<Boolean\></dt>
<dd>Fijar los ángulos omega durante relax<br/>Default: false<br/></dd>
<dt><b>-minimize_bond_lengths</b> \<Boolean\></dt>
<dd>Liberar los grados de libertad de longitud de enlace durante relax para todos los átomos<br/>Default: false<br/></dd>
<dt><b>-minimize_bond_angles</b> \<Boolean\></dt>
<dd>Liberar los grados de libertad de ángulo de enlace durante relax para todos los átomos<br/>Default: false<br/></dd>
<dt><b>-minimize_bondlength_subset</b> \<Integer\></dt>
<dd>Minimizar solo un subconjunto de longitudes de enlace 0 Por defecto todas las longitudes de enlace 1          solo cadena principal 2          solo cadena lateral 3          solo CA (Ca-C, Ca-N y Ca-Cb)<br/>Default: 0<br/></dd>
<dt><b>-minimize_bondangle_subset</b> \<Integer\></dt>
<dd>Minimizar solo un subconjunto de ángulos de enlace 0 Por defecto todos los ángulos de enlace 1          solo cadena principal 2          solo cadena lateral 3          solo tau 4          solo Ca-Cb<br/>Default: 0<br/></dd>
<dt><b>-min_type</b> \<String\></dt>
<dd>minimizador que se usa durante relax.<br/>Default: "lbfgs_armijo_nonmonotone"<br/></dd>
<dt><b>-cartesian</b> \<Boolean\></dt>
<dd>Usar el minimizador cartesiano<br/>Default: false<br/></dd>
<dt><b>-chainbreak_weight</b> \<Real\></dt>
<dd>peso de chainbreak<br/>Default: 0.0<br/></dd>
<dt><b>-linear_chainbreak_weight</b> \<Real\></dt>
<dd>peso de chainbreak lineal<br/>Default: 0.0<br/></dd>
<dt><b>-overlap_chainbreak_weight</b> \<Real\></dt>
<dd>peso de chainbreak de solapamiento<br/>Default: 0.0<br/></dd>
<dt><b>-classic</b> \<Boolean\></dt>
<dd>¡Hacer el relax clásico muy antiguo! Es un mal protocolo: ¡no lo uses!<br/></dd>
<dt><b>-sequence_file</b> \<File\></dt>
<dd>Archivo de script de relax<br/>Default: ""<br/></dd>
<dt><b>-quick</b> \<Boolean\></dt>
<dd>Hacer un FastRelax preestablecido con un número pequeño de ciclos<br/></dd>
<dt><b>-sequence</b> \<Boolean\></dt>
<dd>Hacer un FastRelax preestablecido con un número pequeño de ciclos<br/></dd>
<dt><b>-minirelax_repeats</b> \<Integer\></dt>
<dd><br/>Default: 2<br/></dd>
<dt><b>-minirelax_sdev</b> \<Real\></dt>
<dd>activar el anclaje con restricciones de coordenadas para minirelax<br/>Default: 0.5<br/></dd>
<dt><b>-wobblemoves</b> \<Boolean\></dt>
<dd>¿Hacer movimientos Wobble?<br/>Default: false<br/></dd>
<dt><b>-constrain_relax_segments</b> \<File\></dt>
<dd>archivo de definición de loops<br/>Default: ""<br/></dd>
<dt><b>-coord_cst_width</b> \<Real\></dt>
<dd>Anchura de las restricciones de coordenadas de las opciones constrain_relax_*<br/>Default: 0.0<br/></dd>
<dt><b>-coord_cst_stdev</b> \<Real\></dt>
<dd>Desviación estándar de las restricciones de coordenadas de las opciones constrain_relax_*<br/>Default: 0.5<br/></dd>
<dt><b>-ramp_constraints</b> \<Boolean\></dt>
<dd>Reducir gradualmente las restricciones durante la fase 1 de relax, de completas a cero<br/>Default: false<br/></dd>
<dt><b>-energycut</b> \<Real\></dt>
<dd>Corte de energía de rottrial (¡por residuo!)<br/>Default: 0.01<br/></dd>
<dt><b>-mini</b> \<Boolean\></dt>
<dd>realizar un relax que sea solo una minimización y un reempaquetado.<br/>Default: false<br/></dd>
<dt><b>-stage1_ramp_cycles</b> \<Integer\></dt>
<dd>Ciclos de aumento gradual en la etapa 1 <br/>Default: 8<br/></dd>
<dt><b>-stage1_ramp_inner_cycles</b> \<Integer\></dt>
<dd>Los ciclos internos indican cuántos movimientos small/shear + rottrials<br/>Default: 1<br/></dd>
<dt><b>-stage2_repack_period</b> \<Integer\></dt>
<dd>Reempaquetado completo cada cuántos ciclos en la etapa 2<br/>Default: 100<br/></dd>
<dt><b>-stage2_cycles</b> \<Integer\></dt>
<dd>¿Cuántos ciclos en la etapa 2? (por defecto es -1, que significa Nresiduos*4 )<br/>Default: -1<br/></dd>
<dt><b>-min_tolerance</b> \<Real\></dt>
<dd>Tolerancia del minimizador<br/>Default: 0.00025<br/></dd>
<dt><b>-stage3_cycles</b> \<Integer\></dt>
<dd>¿Cuántos ciclos en la etapa 3? (por defecto es -1, que significa Nresiduos )<br/>Default: -1<br/></dd>
<dt><b>-cycle_ratio</b> \<Real\></dt>
<dd>Posmultiplicador del número de ciclos<br/>Default: 1.0<br/></dd>
<dt><b>-filter_stage2_beginning</b> \<Real\></dt>
<dd>Filtro de puntuación de FArelax<br/>Default: 99999999.00<br/></dd>
<dt><b>-filter_stage2_quarter</b> \<Real\></dt>
<dd>Filtro de puntuación de FArelax<br/>Default: 99999999.00<br/></dd>
<dt><b>-filter_stage2_half</b> \<Real\></dt>
<dd>Filtro de puntuación de FArelax<br/>Default: 99999999.00<br/></dd>
<dt><b>-filter_stage2_end</b> \<Real\></dt>
<dd>Filtro de puntuación de FArelax<br/>Default: 99999999.00<br/></dd>
</dl>
+ <h3>-relax:centroid</h3>
<dl>
<dt><b>-centroid</b> \<Boolean\></dt>
<dd>grupo de opciones centroid<br/></dd>
<dt><b>-weights</b> \<String\></dt>
<dd>Pesos que se usan para la minimización centroide<br/>Default: "score4_smooth_cen_relax"<br/></dd>
<dt><b>-ramp_vdw</b> \<Boolean\></dt>
<dd>Aumentar gradualmente el peso de VDW<br/>Default: true<br/></dd>
<dt><b>-ramp_rama</b> \<Boolean\></dt>
<dd>Aumentar gradualmente el peso de rama/rama2b<br/>Default: false<br/></dd>
<dt><b>-parameters</b> \<String\></dt>
<dd>Archivo de base de datos para los parámetros de aumento/minimización<br/>Default: "sampling/cen_relax/default_relax_parameters.txt"<br/></dd>
<dt><b>-do_final_repack</b> \<Boolean\></dt>
<dd>Reempaquetar las cadenas laterales del MoveMap tras el protocolo si se da una estructura de todos los átomos<br/>Default: false<br/></dd>
<dt><b>-increase_vdw_radii</b> \<Boolean\></dt>
<dd>Aumentar los radios vdw de la cadena principal<br/>Default: false<br/></dd>
</dl>
+ <h2>-remodel</h2>
<dl>
<dt><b>-remodel</b> \<Boolean\></dt>
<dd>grupo de opciones remodel<br/></dd>
<dt><b>-blueprint</b> \<File\></dt>
<dd>nombre del archivo blueprint<br/></dd>
<dt><b>-cstfile</b> \<File\></dt>
<dd>descripción<br/></dd>
<dt><b>-cst_fa_only</b> \<Boolean\></dt>
<dd>false<br/></dd>
<dt><b>-cstfilter</b> \<Integer\></dt>
<dd>filtrar la energía de restricciones<br/>Default: 10<br/></dd>
<dt><b>-cen_sfxn</b> \<String\></dt>
<dd>función de puntuación centroide que se usará para la construcción<br/>Default: "remodel_cen"<br/></dd>
<dt><b>-check_scored_centroid</b> \<Boolean\></dt>
<dd>volcar las estructuras centroide después de la construcción<br/>Default: false<br/></dd>
<dt><b>-num_trajectory</b> \<Integer\></dt>
<dd>Número de trayectorias de remodel.<br/>Default: 10<br/></dd>
<dt><b>-save_top</b> \<Integer\></dt>
<dd>el número de pdb finales de baja puntuación que se conservan.<br/>Default: 5<br/></dd>
<dt><b>-swap_refine_confirm_protocols</b> \<Boolean\></dt>
<dd>intercambiar los protocolos usados para el refinamiento y la confirmación<br/>Default: false<br/></dd>
<dt><b>-bypass_fragments</b> \<Boolean\></dt>
<dd>solo funciona sobre el PDB de entrada, por lo que no se respetan extensiones ni deleciones en el blueprint. El blueprint (H,L,E,D) se convierte en definiciones allow_move.<br/></dd>
<dt><b>-use_same_length_fragments</b> \<Boolean\></dt>
<dd>recolectar los fragmentos que coinciden con la longitud que se va a reconstruir<br/>Default: true<br/></dd>
<dt><b>-no_jumps</b> \<Boolean\></dt>
<dd>configurará un FoldTree simple y plegará a través de él durante la construcción centroide.<br/>Default: false<br/></dd>
<dt><b>-reroot_tree</b> \<Integer\></dt>
<dd>reubicar la raíz del árbol para la construcción.<br/>Default: 1<br/></dd>
<dt><b>-use_blueprint_sequence </b> \<Boolean\></dt>
<dd> elige fragmentos con base tanto en la estructura secundaria como en la segunda columna (secuencia) del archivo blueprint<br/></dd>
<dt><b>-quick_and_dirty </b> \<Boolean\></dt>
<dd> solo hacer inserción de fragmentos<br/></dd>
<dt><b>-checkpoint </b> \<Boolean\></dt>
<dd> escribe los mejores pdb recopilados hasta el momento después de cada paso de diseño.<br/></dd>
<dt><b>-use_pose_relax </b> \<Boolean\></dt>
<dd> una alternativa al paso de minimización por defecto, pero que usa restricciones de forma similar.<br/></dd>
<dt><b>-use_cart_relax </b> \<Boolean\></dt>
<dd> una alternativa al paso de minimización por defecto, pero que usa restricciones de forma similar.<br/></dd>
<dt><b>-free_relax </b> \<Boolean\></dt>
<dd> ejecutar pose_relax sin restricciones.<br/>Default: false<br/></dd>
<dt><b>-generic_aa</b> \<String\></dt>
<dd>el tipo de aminoácido para la construcción centroide<br/>Default: "V"<br/></dd>
<dt><b>-cluster_radius</b> \<Real\></dt>
<dd>radio del clúster para el acumulador; por defecto toma un valor automático<br/>Default: -1.0<br/></dd>
<dt><b>-use_clusters</b> \<Boolean\></dt>
<dd>usar agrupamiento en el acumulador<br/>Default: false<br/></dd>
<dt><b>-run_confirmation</b> \<Boolean\></dt>
<dd>usar la confirmación por rms de KIC<br/>Default: false<br/></dd>
<dt><b>-cluster_on_entire_pose</b> \<Boolean\></dt>
<dd>el clúster usa todo el Pose, no solo los loops<br/>Default: false<br/></dd>
<dt><b>-dr_cycles</b> \<Integer\></dt>
<dd>número de ciclos de diseño-refinamiento que se usan<br/>Default: 3<br/></dd>
<dt><b>-two_chain_tree</b> \<Integer\></dt>
<dd>etiquetar el inicio de la segunda cadena<br/></dd>
<dt><b>-repeat_structure</b> \<Integer\></dt>
<dd>construir repeticiones idénticas este número de veces<br/>Default: 1<br/></dd>
<dt><b>-lh_ex_limit</b> \<Integer\></dt>
<dd>límite de expansión de intervalos vecinos de loophash<br/>Default: 5<br/></dd>
<dt><b>-lh_filter_string</b> \<StringVector\></dt>
<dd>tipo de fragmento objetivo del filtro ABEGO de loophash. Listar en secuencia para cada loop<br/></dd>
<dt><b>-lh_cbreak_selection</b> \<Integer\></dt>
<dd>loophash con peso dominante de cbreak<br/>Default: 10<br/></dd>
<dt><b>-lh_closure_filter</b> \<Boolean\></dt>
<dd>filtro de rms cercano cuando se usa bypass_closure<br/>Default: false<br/></dd>
<dt><b>-cen_minimize</b> \<Boolean\></dt>
<dd>minimización centroide después de la construcción de fragmentos<br/>Default: false<br/></dd>
<dt><b>-core_cutoff</b> \<Integer\></dt>
<dd>número de vecinos necesarios para considerar núcleo en el diseño automático<br/>Default: 18<br/></dd>
<dt><b>-boundary_cutoff</b> \<Integer\></dt>
<dd>número de vecinos necesarios para considerar borde en el diseño automático<br/>Default: 15<br/></dd>
<dt><b>-coreAA</b> \<String\></dt>
<dd>conjunto de aminoácidos para el núcleo<br/>Default: ""<br/></dd>
<dt><b>-boundaryAA</b> \<String\></dt>
<dd>conjunto de aminoácidos para el borde<br/>Default: ""<br/></dd>
<dt><b>-surfaceAA</b> \<String\></dt>
<dd>conjunto de aminoácidos para la superficie<br/>Default: ""<br/></dd>
<dt><b>-design_around_ligand</b> \<Boolean\></dt>
<dd>aplicar el modo de diseño manual alrededor del ligando<br/>Default: false<br/></dd>
<dt><b>-move_ligand</b> \<Boolean\></dt>
<dd>aplicar el manejador de ligandos para mover el ligando<br/>Default: false<br/></dd>
<dt><b>-resclass_by_sasa</b> \<Boolean\></dt>
<dd>cambiar para usar sasa en la clasificación de residuos<br/>Default: false<br/></dd>
<dt><b>-helical_rise</b> \<Real\></dt>
<dd>parámetro helicoidal: elevación (rise)<br/>Default: 0.0<br/></dd>
<dt><b>-helical_radius</b> \<Real\></dt>
<dd>parámetro helicoidal: radio<br/>Default: 0.0<br/></dd>
<dt><b>-helical_omega</b> \<Real\></dt>
<dd>parámetro helicoidal: omega<br/>Default: 0.0<br/></dd>
<dt><b>-filter_rise</b> \<RealVector\></dt>
<dd>rango de valores del filtro para el parámetro helicoidal rise<br/></dd>
<dt><b>-filter_radius</b> \<RealVector\></dt>
<dd>rango de valores del filtro para el parámetro helicoidal radio<br/></dd>
<dt><b>-filter_omega</b> \<RealVector\></dt>
<dd>rango de valores del filtro para el parámetro helicoidal omega<br/></dd>
<dt><b>-COM_sd</b> \<Real\></dt>
<dd>valor de desviación estándar de la restricción de coordenadas del centro de masa<br/>Default: 1.0<br/></dd>
<dt><b>-COM_tolerance</b> \<Real\></dt>
<dd>valor de tolerancia de la restricción de coordenadas del centro de masa<br/>Default: 0.0<br/></dd>
<dt><b>-vdw</b> \<Real\></dt>
<dd>fijar el peso de vdw<br/>Default: 1.0<br/></dd>
<dt><b>-rama</b> \<Real\></dt>
<dd>fijar el peso de rama<br/>Default: 0.1<br/></dd>
<dt><b>-cbeta</b> \<Real\></dt>
<dd>fijar el peso de cbeta<br/>Default: 0.0<br/></dd>
<dt><b>-cenpack</b> \<Real\></dt>
<dd>fijar el peso de cenpack<br/>Default: 0.0<br/></dd>
<dt><b>-rg_local</b> \<Real\></dt>
<dd>fijar el peso de rg_local<br/>Default: 0.0<br/></dd>
<dt><b>-hb_lrbb</b> \<Real\></dt>
<dd>fijar el peso de hbond_lrbb<br/>Default: 0.0<br/></dd>
<dt><b>-hb_srbb</b> \<Real\></dt>
<dd>fijar el peso de hbond_srbb<br/>Default: 0.0<br/></dd>
<dt><b>-rg</b> \<Real\></dt>
<dd>fijar el peso de rg<br/></dd>
<dt><b>-rsigma</b> \<Real\></dt>
<dd>fijar el peso de rsigma<br/>Default: 0.0<br/></dd>
<dt><b>-ss_pair</b> \<Real\></dt>
<dd>fijar el peso de sspair<br/>Default: 0.0<br/></dd>
<dt><b>-build_disulf</b> \<Boolean\></dt>
<dd>construir puentes disulfuro<br/>Default: false<br/></dd>
<dt><b>-match_rt_limit</b> \<Real\></dt>
<dd>corte de la puntuación de coincidencia RT<br/>Default: 0.4<br/></dd>
<dt><b>-disulf_landing_range</b> \<IntegerVector\></dt>
<dd>rango de residuos para los sitios de aterrizaje de disulfuro<br/></dd>
<dt><b>-rank_by_bsasa</b> \<Boolean\></dt>
<dd>ordenar los resultados por bsasa.<br/></dd>
</dl>
+ <h3>-remodel:staged_sampling</h3>
<dl>
<dt><b>-staged_sampling</b> \<Boolean\></dt>
<dd>muestreo primero con 9mers y luego con 3mers. Energías por etapas. Para reconstruir toda la estructura, no para cierre de loops<br/>Default: false<br/></dd>
<dt><b>-loop_9mer_score_file</b> \<String\></dt>
<dd>stage1_score<br/></dd>
<dt><b>-loop_3mer_score_file</b> \<String\></dt>
<dd>stage2_score<br/></dd>
<dt><b>-all_9mer_score_file</b> \<String\></dt>
<dd>stage3_score<br/></dd>
<dt><b>-all_3mer_score_file</b> \<String\></dt>
<dd>stage4_score<br/></dd>
<dt><b>-loop_9mer_cycles</b> \<Integer\></dt>
<dd>stage1_cycles<br/></dd>
<dt><b>-loop_3mer_cycles</b> \<Integer\></dt>
<dd>stage2_cycles<br/></dd>
<dt><b>-all_9mer_cycles</b> \<Integer\></dt>
<dd>stage3_cycles<br/></dd>
<dt><b>-all_3mer_cycles</b> \<Integer\></dt>
<dd>stage4_cycles<br/></dd>
<dt><b>-fa_mode</b> \<Boolean\></dt>
<dd>hace la etapa de ensamblaje de fragmentos en fa<br/>Default: false<br/></dd>
<dt><b>-fa_relax_moves</b> \<Boolean\></dt>
<dd>Añade una etapa de fa relax<br/>Default: false<br/></dd>
<dt><b>-loop_btw_parametric_components</b> \<Boolean\></dt>
<dd>Configura un modo en el que se puede insertar un loop en una repetición paramétrica<br/>Default: false<br/></dd>
<dt><b>-pre_centroid</b> \<Boolean\></dt>
<dd>inicializar el modo fa con 200 ciclos de centroide<br/>Default: false<br/></dd>
<dt><b>-sample_over_loops</b> \<Boolean\></dt>
<dd>muestrear los residuos definidos como loops en el blueprint<br/>Default: false<br/></dd>
<dt><b>-small_moves</b> \<Boolean\></dt>
<dd>añadir una etapa de movimientos pequeños<br/>Default: false<br/></dd>
<dt><b>-starting_sequence</b> \<String\></dt>
<dd>secuencia de aminoácidos con la que empezar<br/>Default: ""<br/></dd>
<dt><b>-starting_pdb</b> \<File\></dt>
<dd>pdb con el que empezar<br/>Default: ""<br/></dd>
<dt><b>-starting_non_canonical</b> \<String\></dt>
<dd>posición, no canónico que se va a añadir<br/>Default: ""<br/></dd>
<dt><b>-start_w_ideal_helices</b> \<Boolean\></dt>
<dd>comienza con todas las hélices fijadas en phi -63.8 y psi -41.1.<br/>Default: false<br/></dd>
<dt><b>-sym_move</b> \<Boolean\></dt>
<dd>Añade un movimiento de simetría a la etapa abinitio<br/>Default: false<br/></dd>
<dt><b>-residues_to_sample</b> \<File\></dt>
<dd>residuos cuyo muestreo se permite (formato: 1,3,5)<br/>Default: ""<br/></dd>
<dt><b>-require_frags_match_blueprint</b> \<Boolean\></dt>
<dd>se asegura de que los fragmentos coincidan con la definición del blueprint<br/>Default: true<br/></dd>
</dl>
+ <h3>-remodel:domainFusion</h3>
<dl>
<dt><b>-domainFusion</b> \<Boolean\></dt>
<dd>grupo de opciones domainFusion<br/></dd>
<dt><b>-insert_segment_from_pdb</b> \<File\></dt>
<dd>archivo pdb de segmento que se insertará [inserta el nombre del archivo pdb].<br/>Default: ""<br/></dd>
<dt><b>-insert_segment2_from_pdb</b> \<File\></dt>
<dd>archivo pdb de segmento2 que se insertará [inserta el nombre del archivo pdb].<br/>Default: ""<br/></dd>
</dl>
+ <h3>-remodel:design</h3>
<dl>
<dt><b>-design</b> \<Boolean\></dt>
<dd>grupo de opciones design<br/></dd>
<dt><b>-no_design </b> \<Boolean\></dt>
<dd> omite todos los pasos de diseño. ADVERTENCIA: solo escribirá estructuras de nivel centroide y volcará todos los intentos de fragmentos.<br/></dd>
<dt><b>-design_all</b> \<Boolean\></dt>
<dd> fuerza al procedimiento de diseño AUTO (por capas) a diseñar en todas las posiciones. <br/></dd>
<dt><b>-allow_rare_aro_chi</b> \<Boolean\></dt>
<dd>permitir todos los rotámeros aromáticos, sin aplicar el filtro AroChi2<br/>Default: false<br/></dd>
<dt><b>-skip_partial</b> \<Boolean\></dt>
<dd> omitir la etapa de diseño que opera solo en posiciones enterradas<br/>Default: false<br/></dd>
<dt><b>-design_neighbors</b> \<Boolean\></dt>
<dd>diseñar los vecinos.<br/>Default: false<br/></dd>
<dt><b>-find_neighbors</b> \<Boolean\></dt>
<dd>encontrar vecinos para diseño/reempaquetado<br/>Default: false<br/></dd>
<dt><b>-include_current</b> \<Boolean\></dt>
<dd>incluir los rotámeros actuales<br/>Default: true<br/></dd>
</dl>
+ <h3>-remodel:RemodelLoopMover</h3>
<dl>
<dt><b>-RemodelLoopMover</b> \<Boolean\></dt>
<dd>grupo de opciones RemodelLoopMover<br/></dd>
<dt><b>-max_linear_chainbreak</b> \<Real\></dt>
<dd>si el chainbreak lineal es <= este valor, el loop se considera cerrado (por defecto 0.07) <br/>Default: 0.07<br/></dd>
<dt><b>-randomize_loops</b> \<Boolean\></dt>
<dd>aleatorizar los loops antes de ejecutar el protocolo principal (por defecto true)<br/>Default: true<br/></dd>
<dt><b>-use_loop_hash</b> \<Boolean\></dt>
<dd>construcción centroide con loop hash (por defecto false)<br/>Default: false<br/></dd>
<dt><b>-set_segment</b> \<File\></dt>
<dd>fijar directamente phi-psi-omega del segmento desde un archivo<br/>Default: ""<br/></dd>
<dt><b>-allowed_closure_attempts</b> \<Integer\></dt>
<dd>el número permitido de intentos de cierre en total (por defecto 1)<br/>Default: 1<br/></dd>
<dt><b>-loophash_cycles</b> \<Integer\></dt>
<dd>el número de ciclos de cierre con loophash que se realizan (por defecto 8)<br/>Default: 8<br/></dd>
<dt><b>-simultaneous_cycles</b> \<Integer\></dt>
<dd>el número de ciclos de cierre simultáneos que se realizan (por defecto 2)<br/>Default: 2<br/></dd>
<dt><b>-independent_cycles</b> \<Integer\></dt>
<dd>el número de ciclos de cierre independientes que se realizan (por defecto 8)<br/>Default: 8<br/></dd>
<dt><b>-boost_closure_cycles</b> \<Integer\></dt>
<dd>el número máximo posible de ciclos de cierre lockdown que se realizan (por defecto 30)<br/>Default: 30<br/></dd>
<dt><b>-threshold_for_boost_closure</b> \<Real\></dt>
<dd>umbral numérico de chainbreak para entrar en la etapa boost_closure_stage<br/>Default: 1.0<br/></dd>
<dt><b>-force_cutting_index</b> \<Integer\></dt>
<dd>forzar un índice de desplazamiento del cutpoint en la asignación del blueprint<br/>Default: 1<br/></dd>
<dt><b>-force_cutting_N</b> \<Boolean\></dt>
<dd>forzar un cutpoint en el lado N-terminal de la asignación del blueprint<br/>Default: false<br/></dd>
<dt><b>-bypass_closure</b> \<Boolean\></dt>
<dd>desactivar el cierre CCD en el mover para fines de docking anclado<br/>Default: false<br/></dd>
<dt><b>-cyclic_peptide</b> \<Boolean\></dt>
<dd>circularizar la estructura uniendo los extremos N y C.<br/>Default: false<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>temperatura para Monte Carlo ( por defecto 2.0)<br/>Default: 2.0<br/></dd>
</dl>
+ <h2>-resample</h2>
<dl>
<dt><b>-resample</b> \<Boolean\></dt>
<dd>grupo de opciones resample<br/></dd>
<dt><b>-silent</b> \<File\></dt>
<dd>un silent file de decoys desde el que reiniciar el muestreo <br/>Default: ""<br/></dd>
<dt><b>-tag</b> \<String\></dt>
<dd>qué decoy seleccionar del silent file <br/>Default: ""<br/></dd>
<dt><b>-stage1</b> \<Boolean\></dt>
<dd>si es true, reiniciar después de la etapa1; si no, después de la etapa2 <br/>Default: false<br/></dd>
<dt><b>-stage2</b> \<Boolean\></dt>
<dd>si es true, reiniciar después de la etapa1; si no, después de la etapa2 <br/>Default: false<br/></dd>
<dt><b>-jumps</b> \<Boolean\></dt>
<dd>si es true, reiniciar después de la etapa1; si no, después de la etapa2 <br/>Default: false<br/></dd>
<dt><b>-min_max_start_seq_sep</b> \<RealVector\></dt>
<dd>rango de valores iniciales (aleatorios) para la separación de secuencia<br/>Default: 0<br/></dd>
</dl>
+ <h2>-rescore</h2>
<dl>
<dt><b>-rescore</b> \<Boolean\></dt>
<dd>grupo de opciones rescore<br/></dd>
<dt><b>-assign_ss</b> \<Boolean\></dt>
<dd>Invocar DSSP para asignar la estructura secundaria.<br/>Default: false<br/></dd>
<dt><b>-skip</b> \<Boolean\></dt>
<dd>No llamar realmente a la función de puntuación (es decir, obtener solo los evaluadores)<br/></dd>
<dt><b>-verbose</b> \<Boolean\></dt>
<dd>¿Desglose completo de pesos, puntuaciones sin procesar y puntuaciones ponderadas?<br/></dd>
</dl>
+ <h2>-rna</h2>
<dl>
<dt><b>-rna</b> \<Boolean\></dt>
<dd>grupo de opciones rna<br/></dd>
<dt><b>-corrected_geo</b> \<Boolean\></dt>
<dd>Usar archivos de parámetros y de energía de cierre de azúcar de ARN basados en PHENIX<br/>Default: true<br/></dd>
<dt><b>-vary_geometry</b> \<Boolean\></dt>
<dd>Dejar que las longitudes y los ángulos de enlace varíen respecto a los ideales en el minimizador<br/>Default: false<br/></dd>
<dt><b>-data_file</b> \<String\></dt>
<dd>Archivo RDAT o de formato heredado con datos de mapeo químico de ARN<br/>Default: ""<br/></dd>
<dt><b>-cut_at_rna_chainbreak</b> \<Boolean\></dt>
<dd>Si la distancia O3' a P es > 2.5 Å, asumir un cutpoint.<br/>Default: false<br/></dd>
<dt><b>-evaluate_base_pairs</b> \<Boolean\></dt>
<dd>En la puntuación final, calcular el número de pares Watson-Crick y no Watson-Crick; comparar con el nativo si está disponible.<br/></dd>
</dl>
+ <h3>-rna:denovo</h3>
<dl>
<dt><b>-denovo</b> \<Boolean\></dt>
<dd>grupo de opciones denovo<br/></dd>
<dt><b>-cycles</b> \<Integer\></dt>
<dd>Número de ciclos de Monte Carlo por defecto<br/>Default: 0<br/></dd>
<dt><b>-rna_protein_docking_freq</b> \<Real\></dt>
<dd>Frecuencia de docking ARN/proteína (entre 0 (sin docking) y 1 (todo docking))<br/>Default: 0.4<br/></dd>
<dt><b>-rounds</b> \<Integer\></dt>
<dd>Número de rondas en que se dividen los ciclos durante el ensamblaje de fragmentos<br/>Default: 10<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>temperatura<br/>Default: 2.0<br/></dd>
<dt><b>-minimize_rna</b> \<Boolean\></dt>
<dd>Minimizar el ARN después del ensamblaje de fragmentos<br/>Default: false<br/></dd>
<dt><b>-sequence</b> \<StringVector\></dt>
<dd>Secuencia de ARN que se va a modelar (mejor proporcionarla con -fasta)<br/></dd>
<dt><b>-secstruct</b> \<String\></dt>
<dd>Estructura secundaria de ARN que se va a modelar (mejor proporcionarla con -secstruct_file)<br/>Default: ""<br/></dd>
<dt><b>-secstruct_general</b> \<String\></dt>
<dd>Estructura secundaria de ARN que se va a modelar con posibles pares no canónicos<br/>Default: ""<br/></dd>
<dt><b>-secstruct_file</b> \<String\></dt>
<dd>Estructura secundaria de ARN que se va a modelar en notación punto-paréntesis<br/>Default: ""<br/></dd>
<dt><b>-secstruct_general_file</b> \<String\></dt>
<dd>Estructura secundaria de ARN (+ pares no canónicos) que se va a modelar en notación punto-paréntesis<br/>Default: ""<br/></dd>
<dt><b>-secstruct_legacy</b> \<String\></dt>
<dd>Estructura secundaria de ARN en la antigua notación 1D: H, hélice; L, loop; X, desconocido; N, bulge<br/>Default: ""<br/></dd>
<dt><b>-lores_scorefxn</b> \<String\></dt>
<dd>Archivo de pesos de la función de puntuación de baja resolución<br/>Default: "farna/rna_lores.wts"<br/></dd>
<dt><b>-set_lores_weights</b> \<StringVector\></dt>
<dd>Modificación de los pesos de la función de puntuación de baja resolución desde la línea de comandos. Se aplica en ScoreFunctionFactory::create_score_function, dentro de la función apply_user_defined_reweighting_. El formato es una lista de cadenas por pares: -set_lores_weights <score_type1> <setting1> <score_type2> <setting2> ...<br/>Default: []<br/></dd>
<dt><b>-symm_hack_arity</b> \<Integer\></dt>
<dd>Para la simetría improvisada que fuerza inserciones de fragmentos coincidentes, ¿cuál es el n de repeticiones?<br/>Default: 1<br/></dd>
<dt><b>-exhaustive_fragment_insertion</b> \<Integer\></dt>
<dd>En lugar de hacer una sola inserción aleatoria de fragmento por movimiento, hacer la MEJOR de entre n intentos aleatorios.<br/>Default: 1<br/></dd>
<dt><b>-filter_lores_base_pairs</b> \<Boolean\></dt>
<dd>Filtrar los modelos que satisfacen los parámetros de estructura<br/>Default: true<br/></dd>
<dt><b>-filter_lores_base_pairs_early</b> \<Boolean\></dt>
<dd>Filtrar los modelos que satisfacen los parámetros de estructura en la ronda 2 de 10<br/>Default: true<br/></dd>
<dt><b>-filter_chain_closure</b> \<Boolean\></dt>
<dd>Filtrar los modelos que tienen cadenas cerradas después de baja resolución y antes de minimizar<br/>Default: true<br/></dd>
<dt><b>-filter_chain_closure_halfway</b> \<Boolean\></dt>
<dd>Filtrar los modelos que tienen cadenas cerradas después de baja resolución y antes de minimizar en la ronda 5 de 10<br/>Default: true<br/></dd>
<dt><b>-filter_chain_closure_distance</b> \<Real\></dt>
<dd>Distancia media entre 3 átomos de chainbreak para filtrar los modelos que tienen cadenas cerradas después de baja resolución<br/>Default: 6.0<br/></dd>
<dt><b>-relax_rna</b> \<Boolean\></dt>
<dd>Aplicar relax al ARN después del ensamblaje de fragmentos<br/>Default: false<br/></dd>
<dt><b>-simple_relax</b> \<Boolean\></dt>
<dd>Relajar minimizando después de cualquier inserción de fragmento<br/>Default: false<br/></dd>
<dt><b>-ignore_secstruct</b> \<Boolean\></dt>
<dd>Ignorar la estructura secundaria del archivo de entrada<br/>Default: false<br/></dd>
<dt><b>-jump_change_frequency</b> \<Real\></dt>
<dd>frecuencia de cambio de salto<br/>Default: 0.1<br/></dd>
<dt><b>-close_loops</b> \<Boolean\></dt>
<dd>cerrar los loops después del protocolo de novo y de nuevo después de la minimización<br/>Default: true<br/></dd>
<dt><b>-close_loops_after_each_move</b> \<Boolean\></dt>
<dd>cerrar los loops durante la inserción de fragmentos y el mover de saltos; puede ser costoso<br/>Default: false<br/></dd>
<dt><b>-heat</b> \<Boolean\></dt>
<dd>Calor (inserciones aleatorias de fragmentos)<br/>Default: false<br/></dd>
<dt><b>-staged_constraints</b> \<Boolean\></dt>
<dd>Aplicar las restricciones por etapas según la separación de secuencia<br/>Default: false<br/></dd>
<dt><b>-jump_library_file</b> \<String\></dt>
<dd>Archivo de entrada para saltos<br/>Default: "RNA18_HUB_2.154_2.5.jump"<br/></dd>
<dt><b>-vall_torsions</b> \<String\></dt>
<dd>Archivo de torsiones con información sobre fragmentos de modelos de ARN<br/>Default: "RNA18_HUB_2.154_2.5.torsions"<br/></dd>
<dt><b>-use_1jj2_torsions</b> \<Boolean\></dt>
<dd>Usar los fragmentos originales (ribosoma), 1JJ2<br/>Default: false<br/></dd>
<dt><b>-fuzz_fragments</b> \<Real\></dt>
<dd>Al elegir fragmentos, difuminar los fragmentos con varias muestras con gaussianas de esta desviación estándar<br/>Default: 0<br/></dd>
<dt><b>-rna_lores_chainbreak_weight</b> \<Real\></dt>
<dd>peso de chainbreak para el muestreo de baja resolución<br/>Default: 0.0<br/></dd>
<dt><b>-rna_lores_linear_chainbreak_weight</b> \<Real\></dt>
<dd>peso de chainbreak lineal para el muestreo de baja resolución<br/>Default: 0.0<br/></dd>
<dt><b>-fixed_stems</b> \<Boolean\></dt>
<dd>Sembrar cada tallo con un par de bases Watson-Crick en lugar de dejar que las hebras se encuentren entre sí<br/>Default: false<br/></dd>
<dt><b>-allow_bulge</b> \<Boolean\></dt>
<dd>Virtualizar automáticamente los residuos que no son energéticamente estables<br/>Default: false<br/></dd>
<dt><b>-allowed_bulge_res</b> \<IntegerVector\></dt>
<dd>Usar con allow_bulge, posiciones permitidas para virtualización<br/>Default: []<br/></dd>
<dt><b>-allow_consecutive_bulges</b> \<Boolean\></dt>
<dd>allow_consecutive_bulges<br/>Default: false<br/></dd>
<dt><b>-move_first_rigid_body</b> \<Boolean\></dt>
<dd>first_rigid_body normalmente se mantiene congelado, pero podría ser útil muestrearlo.<br/>Default: false<br/></dd>
<dt><b>-root_at_first_rigid_body</b> \<Boolean\></dt>
<dd>coloca el sistema de coordenadas lejos del último residuo virtual habitual y lo pone en el primer cuerpo rígido. Útil si este cuerpo rígido debe quedar fijo, pero otros cuerpos necesitan moverse como si este se estuviera moviendo. Úsalo con -move_first_rigid_body. <br/>Default: false<br/></dd>
<dt><b>-dock_each_chunk</b> \<Boolean\></dt>
<dd>Hacer docking de cada trozo (chunk); configura el FoldTree para que haya saltos desde el residuo virtual raíz hasta todos los trozos; muy útil para optimizar posiciones en la densidad; úsalo con -new_fold_tree_initializer<br/>Default: true<br/></dd>
<dt><b>-dock_each_chunk_per_chain</b> \<Boolean\></dt>
<dd>Hacer docking de cada trozo, incluidos varios trozos de la misma cadena; configura el FoldTree para que haya saltos desde el residuo virtual raíz hasta todos los trozos; muy útil para optimizar posiciones en la densidad; úsalo con -dock_each_chunk y -new_fold_tree_initializer; quizá también quieras usarlo con -initial_structures<br/>Default: false<br/></dd>
<dt><b>-dock_chunks</b> \<FileVector\></dt>
<dd>Trozos que deben acoplarse explícitamente (el FoldTree se configurará para que haya saltos desde el residuo virtual raíz hasta cada uno de estos trozos); úsalo con -new_fold_tree_initializer<br/>Default: "true"<br/></dd>
<dt><b>-center_jumps_in_single_stranded</b> \<Boolean\></dt>
<dd>Para las cadenas de ARN que no tienen ningún par de bases, configura saltos en el centro en lugar de en el primer residuo de la cadena; úsalo con -new_fold_tree_initializer y -dock_each_chunk<br/>Default: false<br/></dd>
<dt><b>-initial_structures</b> \<FileVector\></dt>
<dd>Estructura inicial para el ensamblaje de fragmentos, útil para inicializar las orientaciones de cuerpo rígido para docking, especialmente con densidad<br/>Default: ""<br/></dd>
<dt><b>-ft_close_chains</b> \<Boolean\></dt>
<dd>El valor por defecto es true (pero solo se usa si también se especifica -initial_structures). Se puede poner en false con -initial_structures y con -dock_each_chunk_per_chain o -dock_chunks (y entonces debes incluir todos los subtrozos concatenados de -initial_structures).<br/>Default: true<br/></dd>
<dt><b>-helical_substructs</b> \<FileVector\></dt>
<dd>Archivos proporcionados con -s o -in:file:silent que representan hélices; úsalo con dock_each_chunk_per_chain y -new_fold_tree_initializer; incluye movimientos que rotan y trasladan estas hélices a lo largo de su eje helicoidal<br/>Default: ""<br/></dd>
<dt><b>-suppress_bp_constraint</b> \<Real\></dt>
<dd>Factor por el que se reduce el peso de las restricciones de pares de bases. <br/>Default: 1.0<br/></dd>
<dt><b>-output_filters</b> \<Boolean\></dt>
<dd>escribir las puntuaciones de baja resolución en una etapa temprana (ronda 2 de 10) y al final; podría usarse para terminar antes los inicios tempranos poco prometedores<br/>Default: false<br/></dd>
<dt><b>-autofilter</b> \<Boolean\></dt>
<dd>Omitir automáticamente la salida/minimización si la puntuación de baja resolución es peor que el percentil 20, actualizado sobre la marcha.<br/>Default: true<br/></dd>
<dt><b>-no_filters</b> \<Boolean\></dt>
<dd>Desactivar los filtros en FARFAR. (opción general) -autofilter false -filter_lores_base_pairs false -filter_lores_base_pairs_early false -filter_chain_closure false -filter_chain_closure_halfway false -filter_chain_closure_distance false<br/>Default: false<br/></dd>
<dt><b>-output_res_num</b> \<ResidueChainVector\></dt>
<dd>Numeración (y cadena) de los residuos en el PDB o silent file de salida<br/>Default: []<br/></dd>
<dt><b>-offset</b> \<Integer\></dt>
<dd>Desplazamiento de la numeración del PDB o silent file de salida (es mejor usar -output_res_num))<br/>Default: 0<br/></dd>
<dt><b>-input_silent_res</b> \<ResidueChainVector\></dt>
<dd>Residuos de entrada para silent files<br/>Default: []<br/></dd>
<dt><b>-virtual_anchor</b> \<ResidueChainVector\></dt>
<dd>En los movimientos de cuerpo rígido, qué residuos de cada cuerpo son centros de rotación<br/>Default: []<br/></dd>
<dt><b>-obligate_pair</b> \<ResidueChainVector\></dt>
<dd>Pares de residuos que deben formar un par de bases (posiblemente no canónico)<br/>Default: []<br/></dd>
<dt><b>-obligate_pair_explicit</b> \<StringVector\></dt>
<dd>Pares de residuos que deben formar un par de bases, con especificación de los bordes de las bases (W/H/S/X) y la orientación (A/P/X o C/T/X)<br/>Default: []<br/></dd>
<dt><b>-chain_connection</b> \<StringVector\></dt>
<dd>Da SET1 ... y SET2 ... para definir segmentos que forman al menos un par de bases<br/>Default: []<br/></dd>
<dt><b>-remove_pair</b> \<ResidueChainVector\></dt>
<dd>Pares de residuos que se quitan de la estructura secundaria<br/>Default: []<br/></dd>
<dt><b>-remove_obligate_pair</b> \<ResidueChainVector\></dt>
<dd>Pares de residuos que se quitan de la lista de pares obligatorios<br/>Default: []<br/></dd>
<dt><b>-refine_silent_file</b> \<String\></dt>
<dd>Nombre del silent file que se va a refinar.<br/>Default: ""<br/></dd>
<dt><b>-refine_silent_tags</b> \<StringVector\></dt>
<dd>Etiquetas de las estructuras del silent file que se van a refinar.<br/></dd>
<dt><b>-refine_silent_number_of_poses</b> \<Integer\></dt>
<dd>Número de Poses de baja puntuación del refine_silent_file que se van a refinar<br/>Default: 0<br/></dd>
<dt><b>-get_fold_tree_from_silent_file</b> \<String\></dt>
<dd>Usar el FoldTree especificado en un silent file<br/>Default: ""<br/></dd>
<dt><b>-fold_tree_from_silent_file_tag</b> \<StringVector\></dt>
<dd>Etiqueta de la estructura de get_fold_tree_from_silent_file que se va a usar<br/></dd>
<dt><b>-refine_native_get_good_FT</b> \<Boolean\></dt>
<dd>Obtener un FoldTree razonable al refinar el nativo; especialmente importante si algunas cosas deben quedar fijas<br/>Default: false<br/></dd>
<dt><b>-refine_native</b> \<Boolean\></dt>
<dd>Refinar partiendo del Pose nativo<br/>Default: false<br/></dd>
<dt><b>-override_refine_pose_rounds</b> \<Boolean\></dt>
<dd>Anular las rondas y otros parámetros de ejecución que se fijan si se refina un Pose<br/>Default: false<br/></dd>
<dt><b>-bps_moves</b> \<Boolean\></dt>
<dd>Movimientos de pasos de pares de bases<br/>Default: true<br/></dd>
<dt><b>-disallow_bps_at_extra_min_res</b> \<Boolean\></dt>
<dd>No permitir movimientos de pasos de pares de bases dentro de los dominios de entrada, ni siquiera extra_min_res<br/>Default: false<br/></dd>
<dt><b>-allow_fragment_moves_in_bps</b> \<Boolean\></dt>
<dd>Permitir movimientos de fragmentos/saltos en regiones reclamadas por pasos de pares de bases<br/>Default: false<br/></dd>
<dt><b>-frag_size</b> \<Integer\></dt>
<dd>Forzar un tamaño de fragmento específico en lugar de por etapas de 3 a 2 a 1<br/>Default: 0<br/></dd>
<dt><b>-VDW_rep_screen_include_sidechains</b> \<Boolean\></dt>
<dd>Incluir las cadenas laterales en el cribado de repulsión VDW; úsalo con -VDW_rep_screen_info<br/>Default: true<br/></dd>
<dt><b>-gradual_constraints</b> \<Boolean\></dt>
<dd>¿Activar gradualmente atom_pair_constraints y coordinate_constraints?<br/>Default: true<br/></dd>
<dt><b>-ramp_rnp_vdw</b> \<Boolean\></dt>
<dd>¿Activar gradualmente rnp_vdw?<br/>Default: false<br/></dd>
<dt><b>-grid_vdw_weight</b> \<Real\></dt>
<dd>Peso del término de puntuación vdw de la rejilla<br/>Default: 1.0<br/></dd>
<dt><b>-tag</b> \<String\></dt>
<dd>etiqueta para nombrar el silent file; herencia de rna_denovo_setup.py<br/>Default: ""<br/></dd>
<dt><b>-working_native</b> \<String\></dt>
<dd>Nativo que se usará si solo conocemos un fragmento<br/>Default: "false"<br/></dd>
<dt><b>-use_legacy_setup</b> \<Boolean\></dt>
<dd>Usar la antigua configuración de novo sin mapeo de residuos/cadenas<br/>Default: false<br/></dd>
<dt><b>-cst_gap</b> \<Boolean\></dt>
<dd>Configurar restricciones de pares de átomos para mantener cercanos los extremos de cadena si se sabe que forman parte de la misma cadena en el Pose del modelo completo<br/>Default: false<br/></dd>
<dt><b>-convert_protein_CEN</b> \<Boolean\></dt>
<dd>Convertir los residuos de proteína a modo centroide durante el ensamblaje de fragmentos de baja resolución<br/>Default: true<br/></dd>
<dt><b>-rna_protein_docking</b> \<Boolean\></dt>
<dd>¿Hacer docking de ARN/proteína?<br/>Default: false<br/></dd>
<dt><b>-small_docking_moves</b> \<Boolean\></dt>
<dd>Usar magnitudes pequeñas de perturbación de traslación y rotación<br/>Default: false<br/></dd>
<dt><b>-docking_move_size</b> \<Real\></dt>
<dd>Tamaño de los movimientos de docking, entre 0.0 y 1.0; 1.0 son los tamaños normales de los movimientos de docking, 0.0 los movimientos de docking más pequeños<br/>Default: 1.0<br/></dd>
<dt><b>-rna_protein_docking_legacy</b> \<Boolean\></dt>
<dd>¿Hacer docking de ARN/proteína, al estilo heredado?<br/>Default: false<br/></dd>
<dt><b>-rnp_high_res_relax</b> \<Boolean\></dt>
<dd>Hacer una etapa adicional de relajación/refinamiento de alta resolución para RNP<br/>Default: true<br/></dd>
<dt><b>-rnp_high_res_cycles</b> \<Integer\></dt>
<dd>Número de ciclos de refinamiento de alta resolución de RNP que se hacen<br/>Default: 10<br/></dd>
<dt><b>-rnp_pack_first</b> \<Boolean\></dt>
<dd>Empaquetar primero las cadenas laterales de la proteína en el mover de alta resolución de RNP<br/>Default: false<br/></dd>
<dt><b>-rnp_min_first</b> \<Boolean\></dt>
<dd>Minimizar la estructura antes de aplicar el mover de alta resolución de RNP<br/>Default: false<br/></dd>
<dt><b>-rnp_ramp_rep</b> \<Boolean\></dt>
<dd>Aumentar gradualmente fa_rep en el mover de alta resolución de RNP<br/>Default: false<br/></dd>
<dt><b>-new_fold_tree_initializer</b> \<Boolean\></dt>
<dd>Usar el nuevo marco de inicialización del FoldTree<br/>Default: false<br/></dd>
<dt><b>-randomize_init_rnp</b> \<Boolean\></dt>
<dd>Aleatorizar la posición y orientación iniciales de cuerpo rígido del ARN respecto a las proteínas<br/>Default: true<br/></dd>
<dt><b>-dock_into_density</b> \<Boolean\></dt>
<dd>¿Hacer transformaciones de cuerpo rígido para acoplar el Pose en la densidad?<br/>Default: false<br/></dd>
<dt><b>-dock_into_density_legacy</b> \<Boolean\></dt>
<dd>¿Hacer transformaciones de cuerpo rígido para acoplar el Pose en la densidad, al estilo heredado?<br/>Default: false<br/></dd>
<dt><b>-exclude_fragments</b> \<IntegerVector\></dt>
<dd>Excluir estos fragmentos de vall<br/>Default: []<br/></dd>
<dt><b>-exclusion_match_type</b> \<String\></dt>
<dd>¿Cuán estrictamente deben coincidir los fragmentos? Independientes de la secuencia (MATCH_ALL), purina frente a pirimidina (MATCH_YR) o exactos (MATCH_EXACT)<br/>Default: "MATCH_EXACT"<br/></dd>
<dt><b>-fragment_homology_rmsd</b> \<Real\></dt>
<dd>Distancia en RMSD por debajo de la cual un fragmento se considera homólogo al nativo<br/>Default: 1.0<br/></dd>
<dt><b>-exclude_native_fragments</b> \<Boolean\></dt>
<dd>Excluir fragmentos de -in:file:native<br/>Default: false<br/></dd>
<dt><b>-exclude_fragment_files</b> \<StringVector\></dt>
<dd>Archivos de los que se excluyen fragmentos<br/>Default: []<br/></dd>
<dt><b>-dump_stems</b> \<Boolean\></dt>
<dd>Volcar la asignación inicial de tallos<br/>Default: false<br/></dd>
</dl>
+ <h4>-rna:denovo:out</h4>
<dl>
<dt><b>-out</b> \<Boolean\></dt>
<dd>grupo de opciones out<br/></dd>
<dt><b>-output_lores_silent_file</b> \<Boolean\></dt>
<dd>escribir cosas de baja resolución<br/>Default: false<br/></dd>
<dt><b>-dump</b> \<Boolean\></dt>
<dd>Volcar pdb<br/>Default: false<br/></dd>
<dt><b>-binary_output</b> \<Boolean\></dt>
<dd>forzar la salida a un silentstruct de ARN binario<br/>Default: false<br/></dd>
<dt><b>-output_score_file</b> \<String\></dt>
<dd>escribir la puntuación en curso en este archivo [especifica 'none' si no hay salida de puntuación; por defecto .SCORES.txt]<br/>Default: ""<br/></dd>
<dt><b>-output_score_frequency</b> \<Integer\></dt>
<dd>escribir la puntuación en curso con esta frecuencia [0 significa sin salida en curso]<br/>Default: 0<br/></dd>
<dt><b>-output_jump_res</b> \<ResidueChainVector\></dt>
<dd>escribir la información de salto de estos dos residuos<br/></dd>
<dt><b>-output_jump_o3p_to_o5p</b> \<Boolean\></dt>
<dd>calcular el salto de o3' a o5' (en lugar de sistemas de coordenadas de centroides de bases)<br/>Default: false<br/></dd>
<dt><b>-output_jump_chainbreak</b> \<Boolean\></dt>
<dd>calcular el salto de la tríada inferior del chainbreak a la tríada superior del chainbreak; un solapamiento perfecto será (Vector(0.0), matriz identidad). <br/>Default: false<br/></dd>
<dt><b>-output_rotation_vector</b> \<Boolean\></dt>
<dd>escribir la información de rotación como vector de rotación (en grados), no como ángulos de Euler<br/>Default: false<br/></dd>
<dt><b>-output_jump_reference_RT</b> \<String\></dt>
<dd>escribir la información de salto relativa a esta transformación de cuerpo rígido [si se da vacío, el código dará error pero entregará el RT de referencia para -native o -align_pdb]<br/>Default: ""<br/></dd>
<dt><b>-target_xyz</b> \<RealVector\></dt>
<dd>Coordenadas objetivo para la penalización armónica, o5' relativo al stub de o3'<br/>Default: []<br/></dd>
<dt><b>-save_jump_histogram</b> \<Boolean\></dt>
<dd>Guardar la información de saltos en un histograma 6D<br/>Default: false<br/></dd>
<dt><b>-output_histogram_file</b> \<String\></dt>
<dd>escribir el histograma en este archivo [especifica 'none' si no hay salida de puntuación; por defecto .HISTOGRAM.txt]<br/>Default: ""<br/></dd>
<dt><b>-jump_histogram_boxsize</b> \<Real\></dt>
<dd>Tamaño de la caja (máx. +/-x,y,z), Å<br/>Default: 40.0<br/></dd>
<dt><b>-jump_histogram_binwidth</b> \<Real\></dt>
<dd>Ancho de intervalo para x,y,z, Å<br/>Default: 4.0<br/></dd>
<dt><b>-jump_histogram_binwidth_rotvector</b> \<Real\></dt>
<dd>Ancho de intervalo para el vector de rotación (grados)<br/>Default: 36.0<br/></dd>
</dl>
+ <h4>-rna:denovo:db</h4>
<dl>
<dt><b>-db</b> \<Boolean\></dt>
<dd>grupo de opciones db<br/></dd>
<dt><b>-jump_database</b> \<Boolean\></dt>
<dd>Generar una base de datos de saltos extraídos de apareamientos de bases de un archivo grande de ARN<br/>Default: false<br/></dd>
<dt><b>-bps_database</b> \<Boolean\></dt>
<dd>Generar una base de datos de pasos de pares de bases extraídos de un archivo grande de ARN<br/>Default: false<br/></dd>
</dl>
+ <h4>-rna:denovo:minimize</h4>
<dl>
<dt><b>-minimize</b> \<Boolean\></dt>
<dd>grupo de opciones minimize<br/></dd>
<dt><b>-minimize_rounds</b> \<Integer\></dt>
<dd>El número de rondas de minimización.<br/>Default: 2<br/></dd>
<dt><b>-skip_coord_constraints</b> \<Boolean\></dt>
<dd>Omitir la primera etapa de minimización con restricciones de coordenadas<br/>Default: false<br/></dd>
<dt><b>-skip_o2prime_trials</b> \<Boolean\></dt>
<dd>Sin empaquetado de O2* en el minimizador<br/>Default: false<br/></dd>
<dt><b>-deriv_check</b> \<Boolean\></dt>
<dd>En rna_minimize, comprobar las derivadas numéricamente<br/>Default: false<br/></dd>
<dt><b>-minimizer_use_coordinate_constraints</b> \<Boolean\></dt>
<dd>Usar restricciones de coordenadas en la primera ronda del minimizador<br/>Default: true<br/></dd>
<dt><b>-min_type</b> \<String\></dt>
<dd>Tipo de minimizador<br/>Default: "lbfgs_armijo_nonmonotone"<br/></dd>
<dt><b>-minimize_bps</b> \<Boolean\></dt>
<dd>Minimizar pasos de pares de bases (de la biblioteca de Rosetta)<br/>Default: true<br/></dd>
<dt><b>-minimize_all_protein</b> \<Boolean\></dt>
<dd>¿Minimizar los residuos de proteína?<br/>Default: false<br/></dd>
<dt><b>-minimize_protein_sc</b> \<Boolean\></dt>
<dd>¿Minimizar las cadenas laterales de la proteína?<br/>Default: false<br/></dd>
<dt><b>-protein_packing</b> \<Boolean\></dt>
<dd>¿Empaquetar los residuos de proteína?<br/>Default: false<br/></dd>
<dt><b>-protein_pack_all</b> \<Boolean\></dt>
<dd>¿Empaquetar todos los residuos de proteína?<br/>Default: false<br/></dd>
<dt><b>-protein_packing_distance</b> \<Real\></dt>
<dd>Empaquetar los residuos de proteína dentro de esta distancia del ARN<br/>Default: 10.0<br/></dd>
<dt><b>-extra_minimize_res</b> \<ResidueChainVector\></dt>
<dd>Residuos adicionales durante el paso de minimización<br/>Default: []<br/></dd>
<dt><b>-extra_minimize_chi_res</b> \<ResidueChainVector\></dt>
<dd>Chi de cadenas laterales adicionales que se mueven durante el paso de minimización<br/>Default: []<br/></dd>
<dt><b>-minimize_use_nblist</b> \<Boolean\></dt>
<dd>Usar la lista de vecinos durante la minimización)<br/>Default: true<br/></dd>
<dt><b>-minimize_nblist_auto_update</b> \<Boolean\></dt>
<dd>Actualizar automáticamente la lista de vecinos durante la minimización)<br/>Default: true<br/></dd>
<dt><b>-minimize_max_iter</b> \<Integer\></dt>
<dd>Número máximo de iteraciones en el minimizador<br/>Default: 2000<br/></dd>
</dl>
+ <h3>-rna:erraser</h3>
<dl>
<dt><b>-erraser</b> \<Boolean\></dt>
<dd>grupo de opciones erraser<br/></dd>
<dt><b>-rna_prot_erraser</b> \<Boolean\></dt>
<dd>Permite el conjunto de tipos de residuo rna_prot_erraser, que incluye tanto ARN como proteína (para fines de ERRASER). También debes usar -rna:corrected_geo.<br/>Default: false<br/></dd>
<dt><b>-constrain_P</b> \<Boolean\></dt>
<dd>restringir el fosfato<br/>Default: false<br/></dd>
<dt><b>-fixed_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuos que se mantienen fijos en el minimizador<br/>Default: []<br/></dd>
<dt><b>-ready_set_only</b> \<Boolean\></dt>
<dd>cargar y escribir directamente para reformatear el pdb<br/>Default: false<br/></dd>
<dt><b>-skip_minimize</b> \<Boolean\></dt>
<dd>escribir el pdb sin minimización<br/>Default: false<br/></dd>
<dt><b>-attempt_pyrimidine_flip</b> \<Boolean\></dt>
<dd>intentar voltear la pirimidina 180 grados y elegir el conformero de mejor energía<br/>Default: false<br/></dd>
</dl>
+ <h2>-rotamerdump</h2>
<dl>
<dt><b>-rotamerdump</b> \<Boolean\></dt>
<dd>grupo de opciones rotamerdump<br/></dd>
<dt><b>-xyz</b> \<Boolean\></dt>
<dd>al usar la aplicación RotamerDump, escribir las coordenadas xyz de cada rotámero<br/>Default: false<br/></dd>
<dt><b>-one_body</b> \<Boolean\></dt>
<dd>al usar la aplicación RotamerDump, escribir las energías de un cuerpo de cada rotámero<br/>Default: false<br/></dd>
<dt><b>-two_body</b> \<Boolean\></dt>
<dd>al usar la aplicación RotamerDump, escribir las energías de dos cuerpos de cada rotámero<br/>Default: false<br/></dd>
<dt><b>-annealer</b> \<Boolean\></dt>
<dd>Ejecutar el annealer y escribir los rotámeros que eligió<br/>Default: false<br/></dd>
</dl>
+ <h2>-sample_around</h2>
<dl>
<dt><b>-sample_around</b> \<Boolean\></dt>
<dd>grupo de opciones sample_around<br/></dd>
<dt><b>-alpha_increment</b> \<Real\></dt>
<dd>si se muestrea el salto, incremento de rotación, en grados<br/>Default: 40.0<br/></dd>
<dt><b>-cosbeta_increment</b> \<Real\></dt>
<dd>si se muestrea el salto, incremento de cosbeta, sin unidades<br/>Default: 0.25<br/></dd>
<dt><b>-gamma_increment</b> \<Real\></dt>
<dd>si se muestrea el salto, incremento de rotación, en grados<br/>Default: 40.0<br/></dd>
</dl>
+ <h2>-sicdock</h2>
<dl>
<dt><b>-sicdock</b> \<Boolean\></dt>
<dd>grupo de opciones sicdock<br/></dd>
<dt><b>-clash_dis</b> \<Real\></dt>
<dd>distancia máxima aceptable de choque<br/>Default: 3.5<br/></dd>
<dt><b>-contact_dis</b> \<Real\></dt>
<dd>distancia máxima aceptable de contacto<br/>Default: 12.0<br/></dd>
<dt><b>-hash_2D_vs_3D</b> \<Real\></dt>
<dd>espaciado de la rejilla del hash 2D superior<br/>Default: 1.3<br/></dd>
</dl>
+ <h2>-legacy_sewing</h2>
<dl>
<dt><b>-legacy_sewing</b> \<Boolean\></dt>
<dd>grupo de opciones legacy_sewing<br/></dd>
<dt><b>-model_file_name</b> \<File\></dt>
<dd>Nombre del archivo de modelo (creación o lectura)<br/></dd>
<dt><b>-score_file_name</b> \<File\></dt>
<dd>Nombre del archivo de puntuaciones (creación o lectura)<br/></dd>
<dt><b>-new_model_file_name</b> \<File\></dt>
<dd>Nombre del nuevo archivo de modelo que se va a escribir<br/></dd>
<dt><b>-remove_any_dssp</b> \<String\></dt>
<dd>Si un modelo dado tiene *algún* segmento con este DSSP, eliminarlo<br/>Default: ""<br/></dd>
<dt><b>-remove_all_dssp</b> \<String\></dt>
<dd>Si un modelo dado tiene *todos* los segmentos que no son loops con este DSSP, eliminarlo<br/>Default: ""<br/></dd>
<dt><b>-min_helix_length</b> \<Integer\></dt>
<dd>Las hélices menores que la longitud indicada se eliminarán del archivo de modelo<br/>Default: 0<br/></dd>
<dt><b>-max_helix_length</b> \<Integer\></dt>
<dd>Las hélices mayores que la longitud indicada se eliminarán del archivo de modelo<br/>Default: 1000<br/></dd>
<dt><b>-min_loop_length</b> \<Integer\></dt>
<dd>Los loops menores que la longitud indicada se eliminarán del archivo de modelo<br/>Default: 0<br/></dd>
<dt><b>-max_loop_length</b> \<Integer\></dt>
<dd>Los loops mayores que la longitud indicada se eliminarán del archivo de modelo<br/>Default: 1000<br/></dd>
<dt><b>-min_strand_length</b> \<Integer\></dt>
<dd>Las hebras menores que la longitud indicada se eliminarán del archivo de modelo<br/>Default: 0<br/></dd>
<dt><b>-max_strand_length</b> \<Integer\></dt>
<dd>Las hebras mayores que la longitud indicada se eliminarán del archivo de modelo<br/>Default: 1000<br/></dd>
<dt><b>-leave_models_by_ss_num</b> \<Boolean\></dt>
<dd>Solo quedan los modelos con cierto número de estructuras secundarias<br/>Default: false<br/></dd>
<dt><b>-model_should_have_this_num_of_ss</b> \<Integer\></dt>
<dd>Solo quedan los modelos con este número de estructuras secundarias<br/></dd>
<dt><b>-model_should_have_at_least_1_E_at_terminal_segment</b> \<Boolean\></dt>
<dd>model_should_have_at_least_one_E_at_terminal_segment<br/>Default: false<br/></dd>
<dt><b>-model_should_have_at_least_1_E</b> \<Boolean\></dt>
<dd>model_should_have_at_least_one_E<br/>Default: false<br/></dd>
<dt><b>-model_should_have_at_least_1_H</b> \<Boolean\></dt>
<dd>model_should_have_at_least_one_H<br/>Default: false<br/></dd>
<dt><b>-leave_models_with_E_terminal_ss</b> \<Boolean\></dt>
<dd>dejar solo models_with_E_terminal_ss<br/>Default: false<br/></dd>
<dt><b>-leave_models_with_H_terminal_ss</b> \<Boolean\></dt>
<dd>dejar solo models_with_H_terminal_ss<br/>Default: false<br/></dd>
<dt><b>-leave_antiparallel_way_H_bonded_models_by_terminal_strands</b> \<Boolean\></dt>
<dd>dejar solo modelos anti-pa unidos por enlaces de hidrógeno por hebras terminales<br/>Default: false<br/></dd>
<dt><b>-leave_parallel_way_H_bonded_models_by_terminal_strands</b> \<Boolean\></dt>
<dd>dejar solo modelos pa unidos por enlaces de hidrógeno por hebras terminales<br/>Default: false<br/></dd>
<dt><b>-leave_certain_model_ids</b> \<Boolean\></dt>
<dd>Solo quedan los modelos con los ids seleccionados<br/>Default: false<br/></dd>
<dt><b>-leave_these_model_ids</b> \<String\></dt>
<dd>Solo quedan los modelos con los ids seleccionados<br/></dd>
<dt><b>-box_length</b> \<Integer\></dt>
<dd>Tamaño de la caja de búsqueda de vecindad, 3 para 27 cajas, 4 para 64 cajas, etc.<br/>Default: 3<br/></dd>
<dt><b>-mode</b> \<String\></dt>
<dd>El modo en que debe ejecutarse sewing_hasher.<br/>Default: "hash"<br/></dd>
<dt><b>-disregard_num_segment_matches</b> \<Boolean\></dt>
<dd>si es true, ignorar num_segment_matches<br/></dd>
<dt><b>-do_not_remove_connection_inconsistencies</b> \<Boolean\></dt>
<dd>si es true, no ejecutar remove_connection_inconsistencies<br/></dd>
<dt><b>-score_between_opposite_terminal_segments</b> \<Boolean\></dt>
<dd>si es true, score_between_opposite_terminal_segments como 1-5 o 5-1<br/>Default: true<br/></dd>
<dt><b>-num_models_to_dump</b> \<Integer\></dt>
<dd>Se usa para ModelDumper. ¿Cuántos modelos aleatorios se deben volcar?<br/></dd>
<dt><b>-models_to_dump</b> \<IntegerVector\></dt>
<dd>Se usa para ModelDumper para especificar los ids de los modelos que quieres volcar<br/></dd>
<dt><b>-min_hash_score</b> \<Integer\></dt>
<dd>Número mínimo de átomos solapados por segmento<br/>Default: 10<br/></dd>
<dt><b>-max_clash_score</b> \<Integer\></dt>
<dd>Número máximo de átomos encontrados en el mismo intervalo, pero que no provienen de fragmentos superpuestos<br/>Default: 0<br/></dd>
<dt><b>-num_segments_to_match</b> \<Integer\></dt>
<dd>Número de segmentos que deben tener min_hash_score coincidencias de átomos<br/>Default: 1<br/></dd>
<dt><b>-match_segments</b> \<IntegerVector\></dt>
<dd>Segmento puntuado por el hasher<br/></dd>
<dt><b>-max_models</b> \<Integer\></dt>
<dd>Máximo de modelos que se procesan con hash, solo para fines de prueba<br/></dd>
<dt><b>-starting_model</b> \<Integer\></dt>
<dd>Modelo inicial para el hashing<br/></dd>
<dt><b>-num_procs</b> \<Integer\></dt>
<dd>Número de procesadores entre los que se divide el hashing<br/></dd>
<dt><b>-rank</b> \<Integer\></dt>
<dd>El rango del procesador para este proceso<br/></dd>
<dt><b>-hash_tag_only_terminal_Es</b> \<Boolean\></dt>
<dd>hash_tag_only_terminal_Es<br/>Default: false<br/></dd>
<dt><b>-assembly_type</b> \<String\></dt>
<dd>Tipo de clase Assembly que se va a generar<br/>Default: "continuous"<br/></dd>
<dt><b>-num_edges_to_follow</b> \<Integer\></dt>
<dd>Número máximo de aristas del grafo que se siguen<br/></dd>
<dt><b>-base_native_bonus</b> \<Real\></dt>
<dd>Término de ponderación para empaquetar rotámeros nativos<br/></dd>
<dt><b>-neighbor_cutoff</b> \<Integer\></dt>
<dd>Corte para favorecer a los nativos en el refinamiento de SEWING. Los residuos con menos vecinos que esto no se favorecen<br/></dd>
<dt><b>-dump_pdbs</b> \<Boolean\></dt>
<dd>Volcar PDB intermedios<br/>Default: false<br/></dd>
<dt><b>-skip_refinement</b> \<Boolean\></dt>
<dd>¿Se debe refinar el ensamblaje final?<br/>Default: false<br/></dd>
<dt><b>-skip_filters</b> \<Boolean\></dt>
<dd>¿Se debe filtrar el Assembly antes del refinamiento?<br/>Default: false<br/></dd>
<dt><b>-min_motif_score</b> \<Real\></dt>
<dd>Puntuación mínima permitida del motivo<br/>Default: 20<br/></dd>
<dt><b>-may_add_already_added_model</b> \<Boolean\></dt>
<dd>may_add_already_added_model<br/>Default: false<br/></dd>
<dt><b>-offset_bump_dsq</b> \<Real\></dt>
<dd>desplazamiento de bump_dsq<br/>Default: 0<br/></dd>
<dt><b>-num_repeats</b> \<Integer\></dt>
<dd>Número de repeticiones que se imprimen en las estructuras finales<br/>Default: 3<br/></dd>
<dt><b>-repeat</b> \<Boolean\></dt>
<dd>¿Debe AssemblyConstraintsMover tratar esto como una repetición?<br/>Default: false<br/></dd>
<dt><b>-pose_segment_starts</b> \<IntegerVector\></dt>
<dd>Índices de inicio de segmento<br/></dd>
<dt><b>-pose_segment_ends</b> \<IntegerVector\></dt>
<dd>Índices de fin de segmento<br/></dd>
<dt><b>-keep_source_segments</b> \<Boolean\></dt>
<dd>Conservar los segmentos de origen en lugar de los segmentos de destino. Para usar con append<br/>Default: false<br/></dd>
<dt><b>-partner_pdb</b> \<File\></dt>
<dd>Un PDB que no es parte del Assembly, pero que se usará para la comprobación de choques<br/></dd>
<dt><b>-keep_model_residues</b> \<IntegerVector\></dt>
<dd>Una lista de residuos del Pose de entrada que no se diseñarán (pero sí se reempaquetan)<br/></dd>
<dt><b>-output_alignments_to_file</b> \<Boolean\></dt>
<dd>¿Escribir en un archivo de alineamiento los alineamientos del Pose de entrada y del archivo de aristas?<br/>Default: true<br/></dd>
<dt><b>-min_lh_fragments</b> \<Integer\></dt>
<dd>Número mínimo de fragmentos de LoopHash necesarios para cada loop diseñado<br/>Default: 10<br/></dd>
<dt><b>-skip_loop_generation</b> \<Boolean\></dt>
<dd>¿Se debe omitir la generación de loops?<br/>Default: false<br/></dd>
<dt><b>-calcium_motif_score_weight</b> \<Real\></dt>
<dd>Fija el peso de la variante de la puntuación de motivos que favorece el empaquetado a ambos lados de un modelo de entrada<br/>Default: 0.0<br/></dd>
<dt><b>-max_ss_num</b> \<Integer\></dt>
<dd>max_ss_num, es decir, 3 (smotif) o 5 (modelos de 5 estructuras secundarias)<br/>Default: 5<br/></dd>
<dt><b>-dump_every_model</b> \<Boolean\></dt>
<dd>dump_every_model<br/>Default: false<br/></dd>
</dl>
+ <h2>-sewing</h2>
<dl>
<dt><b>-sewing</b> \<Boolean\></dt>
<dd>grupo de opciones sewing<br/></dd>
<dt><b>-edge_file_name</b> \<String\></dt>
<dd>Nombre del archivo de aristas de SEWING (formato nuevo)<br/></dd>
<dt><b>-model_file_name</b> \<File\></dt>
<dd>Nombre del archivo de segmentos (creación o lectura) para el nuevo SEWING<br/></dd>
<dt><b>-match_segments</b> \<IntegerVector\></dt>
<dd>Segmento puntuado por el hasher<br/></dd>
<dt><b>-pose_segment_starts</b> \<IntegerVector\></dt>
<dd>Índices de inicio de segmento<br/></dd>
<dt><b>-pose_segment_ends</b> \<IntegerVector\></dt>
<dd>Índices de fin de segmento<br/></dd>
<dt><b>-recursive_depth</b> \<Integer\></dt>
<dd>Cuántas capas de aristas desde el nodo actual se generan. Por ejemplo, una profundidad recursiva de 2 generaría aristas desde el modelo inicial y hacia todos los modelos con aristas a ese modelo.<br/>Default: 2<br/></dd>
<dt><b>-min_hash_score</b> \<Integer\></dt>
<dd>Número mínimo de átomos solapados por segmento<br/>Default: 10<br/></dd>
<dt><b>-max_clash_score</b> \<Integer\></dt>
<dd>Número máximo de átomos encontrados en el mismo intervalo, pero que no provienen de fragmentos superpuestos<br/>Default: 0<br/></dd>
<dt><b>-box_length</b> \<Integer\></dt>
<dd>Tamaño de la caja de búsqueda de vecindad, 3 para 27 cajas, 4 para 64 cajas, etc.<br/>Default: 3<br/></dd>
<dt><b>-score_between_opposite_terminal_segments</b> \<Boolean\></dt>
<dd>si es true, score_between_opposite_terminal_segments como 1-5 o 5-1<br/>Default: true<br/></dd>
</dl>
+ <h2>-SSrbrelax</h2>
<dl>
<dt><b>-SSrbrelax</b> \<Boolean\></dt>
<dd>grupo de opciones SSrbrelax<br/></dd>
<dt><b>-rb_file</b> \<File\></dt>
<dd>archivo de definición de rb<br/>Default: "rb_file"<br/></dd>
<dt><b>-rb_param_file</b> \<File\></dt>
<dd>archivo de parámetros de rb<br/>Default: "rb_param_file"<br/></dd>
<dt><b>-frag_sizes</b> \<IntegerVector\></dt>
<dd>longitudes de los fragmentos que se usarán en el modelado de loops<br/>Default: ['9', '3', '1']<br/></dd>
<dt><b>-frag_files</b> \<FileVector\></dt>
<dd>archivos de bibliotecas de fragmentos<br/>Default: ['"FragFile9"', '"FragFile3"', '"FragFile1"']<br/></dd>
</dl>
+ <h2>-stepwise</h2>
<dl>
<dt><b>-stepwise</b> \<Boolean\></dt>
<dd>grupo de opciones stepwise<br/></dd>
<dt><b>-s1</b> \<StringVector\></dt>
<dd>archivo o archivos de entrada<br/></dd>
<dt><b>-s2</b> \<StringVector\></dt>
<dd>archivo o archivos de entrada<br/></dd>
<dt><b>-silent1</b> \<StringVector\></dt>
<dd>archivo de entrada<br/></dd>
<dt><b>-silent2</b> \<StringVector\></dt>
<dd>archivo de entrada<br/></dd>
<dt><b>-tags1</b> \<StringVector\></dt>
<dd>etiqueta o etiquetas de entrada<br/></dd>
<dt><b>-tags2</b> \<StringVector\></dt>
<dd>etiqueta o etiquetas de entrada<br/></dd>
<dt><b>-slice_res1</b> \<IntegerVector\></dt>
<dd>Residuos que se extraen del archivo inicial<br/>Default: []<br/></dd>
<dt><b>-slice_res2</b> \<IntegerVector\></dt>
<dd>Residuos que se extraen del archivo inicial<br/>Default: []<br/></dd>
<dt><b>-input_res1</b> \<IntegerVector\></dt>
<dd>Residuos ya presentes en el archivo inicial<br/>Default: []<br/></dd>
<dt><b>-input_res2</b> \<IntegerVector\></dt>
<dd>Residuos ya presentes en el archivo inicial 2<br/>Default: []<br/></dd>
<dt><b>-backbone_only1</b> \<Boolean\></dt>
<dd>simplemente copiar los grados de libertad de la cadena principal de la proteína; útil para modelado por homología<br/></dd>
<dt><b>-backbone_only2</b> \<Boolean\></dt>
<dd>simplemente copiar los grados de libertad de la cadena principal de la proteína; útil para modelado por homología<br/></dd>
<dt><b>-fixed_res</b> \<IntegerVector\></dt>
<dd>No mover estos residuos durante la minimización.<br/>Default: []<br/></dd>
<dt><b>-test_encapsulation</b> \<Boolean\></dt>
<dd>Probar la capacidad de StepWiseRNA Modeler de deducir lo que necesita solo a partir del Pose, sin JobParameters<br/>Default: false<br/></dd>
<dt><b>-choose_random</b> \<Boolean\></dt>
<dd>pedirle al muestreador de residuos de swa una solución aleatoria<br/>Default: false<br/></dd>
<dt><b>-num_random_samples</b> \<Integer\></dt>
<dd>En el modo choose_random/monte-carlo, número de muestras del muestreador de residuos de swa antes de minimizar la mejor<br/>Default: 20<br/></dd>
<dt><b>-max_tries_multiplier_for_ccd</b> \<Integer\></dt>
<dd>En el modo choose_random/monte-carlo, cuando es necesario el cierre CCD, multiplicar el n.º de intentos por este factor<br/>Default: 10<br/></dd>
<dt><b>-num_pose_minimize</b> \<Integer\></dt>
<dd>opcional: set_num_pose_minimize por Minimizer<br/>Default: 0<br/></dd>
<dt><b>-atr_rep_screen</b> \<Boolean\></dt>
<dd>En el muestreo, cribar los contactos (pero no choques) entre particiones antes del empaquetado<br/>Default: true<br/></dd>
<dt><b>-atr_rep_screen_for_docking</b> \<Boolean\></dt>
<dd>En movimientos solo de docking, cribar los contactos (pero no choques) entre particiones antes del empaquetado<br/>Default: false<br/></dd>
<dt><b>-align_pdb</b> \<String\></dt>
<dd>PDB con el que alinear. Por defecto será -native, o sin alineamiento<br/>Default: ""<br/></dd>
<dt><b>-new_align_pdb</b> \<String\></dt>
<dd>PDB con el que alinear con la nueva RNA_AlignmentEnergy.<br/>Default: ""<br/></dd>
<dt><b>-enumerate</b> \<Boolean\></dt>
<dd>Para SWM. Forzar enumeración (al estilo de SWA) en lugar de aleatoria<br/>Default: false<br/></dd>
<dt><b>-preminimize</b> \<Boolean\></dt>
<dd>Para SWM. Solo pre-empaquetar y minimizar<br/>Default: false<br/></dd>
<dt><b>-skip_preminimize</b> \<Boolean\></dt>
<dd>Omitir la preminimización antes de stepwise monte carlo<br/>Default: false<br/></dd>
<dt><b>-minimize_waters</b> \<Boolean\></dt>
<dd>Al hidratar magnesios, minimizar cualquier agua que aparezca<br/>Default: false<br/></dd>
<dt><b>-test_all_moves</b> \<Boolean\></dt>
<dd>Probar todos los movimientos desde el Pose inicial, recorriendo recursivamente las adiciones <br/>Default: false<br/></dd>
<dt><b>-new_move_selector</b> \<Boolean\></dt>
<dd>Para SWM. Usar el nuevo selector de movimientos que sí lleva registro de las probabilidades de propuesta.<br/>Default: true<br/></dd>
<dt><b>-dump</b> \<Boolean\></dt>
<dd>Volcar silent files y PDB intermedios<br/>Default: false<br/></dd>
<dt><b>-VERBOSE</b> \<Boolean\></dt>
<dd>VERBOSE<br/>Default: false<br/></dd>
<dt><b>-use_green_packer</b> \<Boolean\></dt>
<dd>usar el packer en lugar de las pruebas de rotámeros para el empaquetado de cadenas laterales y la optimización de O2'<br/>Default: false<br/></dd>
<dt><b>-rmsd_screen</b> \<Real\></dt>
<dd>mantener los residuos muestreados dentro de este rmsd respecto al Pose nativo<br/>Default: 0.0<br/></dd>
<dt><b>-skip_minimize</b> \<Boolean\></dt>
<dd>Omitir la minimización, p. ej., en el paso de pre-empaquetado<br/>Default: false<br/></dd>
<dt><b>-virtualize_packable_moieties_in_screening_pose</b> \<Boolean\></dt>
<dd>Virtualizar el 2'-OH y los fosfatos terminales en el cribado de contactos stepwise, antes del empaquetado real <br/>Default: false<br/></dd>
<dt><b>-minimizer_mode</b> \<String\></dt>
<dd>Minimizar usando el muestreador térmico (THERMAL_SAMPLER) o de forma tradicional (TRADITIONAL_MINIMIZER, o realmente cualquier otra cosa)<br/>Default: "TRADITIONAL_MINIMIZER"<br/></dd>
<dt><b>-sampler_silent_file</b> \<String\></dt>
<dd>En StepWiseConnectionSampler, dónde escribir todos los Poses que pasan los filtros<br/>Default: ""<br/></dd>
<dt><b>-superimpose_over_all</b> \<Boolean\></dt>
<dd>En la superposición final, no mantener fijo ningún dominio; superponer sobre todo<br/>Default: true<br/></dd>
<dt><b>-alignment_anchor_res</b> \<ResidueChainVector\></dt>
<dd>Residuo único que reside en el único dominio de entrada y que debe superponerse antes del cálculo de RMSD<br/></dd>
<dt><b>-move</b> \<StringVector\></dt>
<dd>Para SWM. Formato: 'ADD 5 BOND_TO_PREVIOUS 4'<br/>Default: []<br/></dd>
<dt><b>-min_type</b> \<String\></dt>
<dd>Tipo de minimizador<br/>Default: "lbfgs_armijo_nonmonotone"<br/></dd>
<dt><b>-min_tolerance</b> \<Real\></dt>
<dd>Tolerancia del minimizador<br/>Default: 0.000025<br/></dd>
<dt><b>-output_minimized_pose_list</b> \<Boolean\></dt>
<dd>Usar la salida heredada que escribe todos los Poses minimizados; se pone en true en SWA heredado<br/>Default: false<br/></dd>
<dt><b>-virtualize_free_moieties_in_native</b> \<Boolean\></dt>
<dd>Virtualizar bulges, fosfatos terminales y 2'-hidroxilos que se detecten como sin interacción ('libres') en el Pose nativo. Es decir, no calcular el RMSD sobre esos átomos.<br/>Default: true<br/></dd>
<dt><b>-output_cluster_size</b> \<Boolean\></dt>
<dd>Escribir cluster_size de StepWiseClusterer como puntuación adicional en el Pose<br/>Default: false<br/></dd>
<dt><b>-lores</b> \<Boolean\></dt>
<dd>Usar una función de energía de grano grueso para muestrear; sin minimizar.<br/>Default: false<br/></dd>
<dt><b>-verbose_sampler</b> \<Boolean\></dt>
<dd>salida detallada del muestreo y cribado de StepWiseConnectionSampler.<br/>Default: false<br/></dd>
<dt><b>-pack_protein_side_chains</b> \<Boolean\></dt>
<dd>permitir el empaquetado de cadenas laterales de proteína vecinas.<br/>Default: true<br/></dd>
<dt><b>-definitely_virtualize</b> \<IntegerVector\></dt>
<dd>virtualizar definitivamente estos residuos (por seqpos)<br/>Default: []<br/></dd>
<dt><b>-force_moving_res_for_erraser</b> \<Boolean\></dt>
<dd>Para los movimientos de remuestreo de ERRASER, ASEGURAR que se mueva el residuo apropiado<br/>Default: false<br/></dd>
<dt><b>-boltzmann_choice_post_enumerated_minimize</b> \<Boolean\></dt>
<dd>Al enumerar y generar una lista grande de Poses, hacer una elección ponderada por Boltzmann en lugar de limitarse a tomar el Pose de menor energía.<br/>Default: false<br/></dd>
</dl>
+ <h3>-stepwise:monte_carlo</h3>
<dl>
<dt><b>-monte_carlo</b> \<Boolean\></dt>
<dd>grupo de opciones monte_carlo<br/></dd>
<dt><b>-verbose_scores</b> \<Boolean\></dt>
<dd>Mostrar todos los componentes de la puntuación<br/>Default: false<br/></dd>
<dt><b>-skip_deletions</b> \<Boolean\></dt>
<dd>sin movimientos de eliminación -- solo para pruebas<br/>Default: false<br/></dd>
<dt><b>-allow_internal_hinge_moves</b> \<Boolean\></dt>
<dd>Permitir movimientos en los que se muestrean suites internas (movimientos tipo bisagra)<br/>Default: true<br/></dd>
<dt><b>-allow_internal_local_moves</b> \<Boolean\></dt>
<dd>Permitir movimientos en los que se crean cutpoints internos para permitir reconstrucciones de ERRASER<br/>Default: true<br/></dd>
<dt><b>-allow_skip_bulge</b> \<Boolean\></dt>
<dd>Permitir movimientos en los que se omite un residuo intermedio y el siguiente se modela como base flotante<br/>Default: false<br/></dd>
<dt><b>-skip_bulge_frequency</b> \<Real\></dt>
<dd>En comparación con los movimientos de adición 'normales', con qué frecuencia omitir un bulge y hacer la adición.<br/>Default: 0.0<br/></dd>
<dt><b>-from_scratch_frequency</b> \<Real\></dt>
<dd>Permitir el modelado de dinucleótidos 'libres' que no son parte de los Poses de entrada<br/>Default: 0.1<br/></dd>
<dt><b>-allow_split_off</b> \<Boolean\></dt>
<dd>Permitir que los trozos que no contienen dominios fijos se separen tras nuclearse sobre dominios fijos.<br/>Default: true<br/></dd>
<dt><b>-cycles</b> \<Integer\></dt>
<dd>Número de ciclos de Monte Carlo<br/>Default: 50<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>Temperatura de Monte Carlo<br/>Default: 1.0<br/></dd>
<dt><b>-add_proposal_density_factor</b> \<Real\></dt>
<dd>Aumentar/disminuir el proposal_density_ratio de los movimientos de adición por este factor<br/>Default: 1.0<br/></dd>
<dt><b>-add_delete_frequency</b> \<Real\></dt>
<dd>Frecuencia de adición/eliminación frente a remuestreo<br/>Default: 0.5<br/></dd>
<dt><b>-docking_frequency</b> \<Real\></dt>
<dd>Frecuencia de movimientos de docking frente a plegamiento<br/>Default: 0.2<br/></dd>
<dt><b>-submotif_frequency</b> \<Real\></dt>
<dd>Frecuencia de adiciones de submotivos<br/>Default: 0.2<br/></dd>
<dt><b>-intermolecular_frequency</b> \<Real\></dt>
<dd>Igual que -docking_frequency, se dejará de usar pronto<br/>Default: 0.2<br/></dd>
<dt><b>-minimize_single_res_frequency</b> \<Real\></dt>
<dd>Frecuencia con la que se minimiza el residuo que acaba de reconstruirse, en lugar de todos<br/>Default: 0.0<br/></dd>
<dt><b>-allow_variable_bond_geometry</b> \<Boolean\></dt>
<dd>En el 10% de los movimientos, dejar que cambien los ángulos y distancias de enlace<br/>Default: true<br/></dd>
<dt><b>-switch_focus_frequency</b> \<Real\></dt>
<dd>Frecuencia con la que se cambia el subPose que se está modelando<br/>Default: 0.5<br/></dd>
<dt><b>-just_min_after_mutation_frequency</b> \<Real\></dt>
<dd>Después de una mutación, con qué frecuencia solo minimizar (sin muestrear más el residuo mutado)<br/>Default: 0.5<br/></dd>
<dt><b>-local_redock_only</b> \<Boolean\></dt>
<dd>En ResampleMover, las parejas de docking pueden cambiar en cualquier lugar a través de cadenas conectadas. Forzar a que las nuevas parejas estén cerca de las antiguas.<br/>Default: true<br/></dd>
<dt><b>-make_movie</b> \<Boolean\></dt>
<dd>crear silent files en movie/ con todos los pasos y los pasos aceptados<br/>Default: false<br/></dd>
<dt><b>-recover_low</b> \<Boolean\></dt>
<dd>Escribir el modelo de menor energía en Monte Carlo, no el último fotograma<br/>Default: true<br/></dd>
<dt><b>-use_precomputed_library</b> \<Boolean\></dt>
<dd>En los movimientos from_scratch, no muestrear explícitamente los dinucleótidos, sino usar la biblioteca guardada en disco.<br/>Default: true<br/></dd>
<dt><b>-allow_submotif_split</b> \<Boolean\></dt>
<dd>en los movimientos de submotivos, permitir que los submotivos se dividan. (incompatible con el balance detallado.)<br/>Default: false<br/></dd>
<dt><b>-force_submotif_without_intervening_bulge</b> \<Boolean\></dt>
<dd>en los movimientos de submotivos, añadir solo pares de bases que tengan un punto de unión y un cutpoint cerrado, sin bulge intermedio<br/>Default: false<br/></dd>
<dt><b>-use_first_jump_for_submotif</b> \<Boolean\></dt>
<dd>en los movimientos de submotivos, usar solo el primer salto de la biblioteca de saltos; no cambia stepwise -lores (que remuestrea el salto) salvo en el equilibrio de la selección de movimientos.<br/>Default: false<br/></dd>
<dt><b>-exclude_submotifs</b> \<StringVector\></dt>
<dd>submotivos de database/sampling/rna/submotif/submotifs.txt que se excluyen<br/>Default: []<br/></dd>
<dt><b>-vary_loop_length_frequency</b> \<Real\></dt>
<dd>En el diseño, permitir que los loops ('n') se acorten respecto a las longitudes de loop definidas en los archivos FASTA.<br/>Default: 0.0<br/></dd>
<dt><b>-designing_with_noncanonicals</b> \<Boolean\></dt>
<dd>¿Diseñamos con no canónicos, es decir, 'n' tiene que leer de un conjunto de símbolos posibles (en lugar de los 4 ácidos nucleicos canónicos)?<br/>Default: false<br/></dd>
<dt><b>-checkpointing_frequency</b> \<Integer\></dt>
<dd>¿Con qué frecuencia debemos escribir archivos de punto de control?<br/>Default: 100<br/></dd>
<dt><b>-continue_until_none_missing</b> \<Boolean\></dt>
<dd>Si faltan residuos cuando hemos llegado a n-cycles, ¡simplemente seguir! Se sugiere con puntos de control.<br/>Default: false<br/></dd>
<dt><b>-full_model_constraints</b> \<FileVector\></dt>
<dd>Uno o más archivos que contienen restricciones que se aplicarán en un contexto de 'modelo completo', es decir, solo en el Modeler y solo una vez que existan los residuos.<br/>Default: []<br/></dd>
</dl>
+ <h4>-stepwise:monte_carlo:csa</h4>
<dl>
<dt><b>-csa</b> \<Boolean\></dt>
<dd>grupo de opciones csa<br/></dd>
<dt><b>-csa_bank_size</b> \<Integer\></dt>
<dd>Hacer recocido del espacio conformacional (Monte Carlo poblacional) con este número de modelos en el banco<br/>Default: 0<br/></dd>
<dt><b>-csa_rmsd</b> \<Real\></dt>
<dd>Corte de RMSD para considerar distintos dos Poses en el recocido del espacio conformacional (Monte Carlo poblacional)<br/>Default: 1.0<br/></dd>
<dt><b>-csa_output_rounds</b> \<Boolean\></dt>
<dd>escribir silent files en etapas intermedias (en múltiplos enteros de bank_size)<br/>Default: false<br/></dd>
<dt><b>-annealing</b> \<Boolean\></dt>
<dd>Hacer realmente un recocido del RMSD desde la mitad de la distancia promedio entre los modelos del primer banco hasta una quinta parte de esa distancia<br/>Default: false<br/></dd>
</dl>
+ <h3>-stepwise:polar_hydrogens</h3>
<dl>
<dt><b>-polar_hydrogens</b> \<Boolean\></dt>
<dd>grupo de opciones polar_hydrogens<br/></dd>
<dt><b>-vary_polar_hydrogen_geometry</b> \<Boolean\></dt>
<dd>Optimizar los hidrógenos que forman enlaces de hidrógeno<br/>Default: false<br/></dd>
<dt><b>-bond_angle_sd_polar_hydrogen</b> \<Real\></dt>
<dd>Desviación estándar del término angular de bond_geometry con la opción -vary_polar_hydrogen_geometry, en grados<br/>Default: 60.0<br/></dd>
<dt><b>-bond_torsion_sd_polar_hydrogen</b> \<Real\></dt>
<dd>Desviación estándar del término de torsión de bond_geometry con la opción -vary_polar_hydrogen_geometry, en grados<br/>Default: 30.0<br/></dd>
<dt><b>-fix_lengths</b> \<Boolean\></dt>
<dd>con -vary_geometry, no permitir cambios en la longitud de enlace<br/>Default: false<br/></dd>
<dt><b>-fix_angles</b> \<Boolean\></dt>
<dd>con -vary_geometry, no permitir cambios en el ángulo de enlace<br/>Default: false<br/></dd>
<dt><b>-fix_torsions</b> \<Boolean\></dt>
<dd>con -vary_geometry, no permitir cambios en la torsión de enlace más allá del MoveMap estándar<br/>Default: false<br/></dd>
<dt><b>-disallow_pack_polar_hydrogens</b> \<Boolean\></dt>
<dd>con -vary_polar_hydrogen_geometry, no permitir el paso de empaquetado de hidrógenos polares antes de minimizar<br/>Default: false<br/></dd>
<dt><b>-disallow_vary_geometry_proton_chi</b> \<Boolean\></dt>
<dd>sin empaquetado ni minimización del 2'-OH ni de otros hidrógenos controlados por la torsión chi<br/>Default: false<br/></dd>
</dl>
+ <h3>-stepwise:rna</h3>
<dl>
<dt><b>-rna</b> \<Boolean\></dt>
<dd>grupo de opciones rna<br/></dd>
<dt><b>-sampler_num_pose_kept</b> \<Integer\></dt>
<dd>set_num_pose_kept por ResidueSampler )<br/>Default: 108<br/></dd>
<dt><b>-native_edensity_score_cutoff</b> \<Real\></dt>
<dd>native_edensity_score_cutoff<br/>Default: -1.0<br/></dd>
<dt><b>-o2prime_legacy_mode</b> \<Boolean\></dt>
<dd>virtualización completa del hidrógeno O2' durante el muestreo, y luego restauración completa y empaquetado<br/>Default: false<br/></dd>
<dt><b>-allow_virtual_o2prime_hydrogens</b> \<Boolean\></dt>
<dd>permitir que el hidrógeno O2' se virtualice durante el empaquetado.<br/>Default: false<br/></dd>
<dt><b>-sampler_perform_phosphate_pack</b> \<Boolean\></dt>
<dd>realizar el empaquetado de fosfatos terminales dentro de StepWiseRNA_ResidueSampler<br/>Default: false<br/></dd>
<dt><b>-force_phosphate_instantiation</b> \<Boolean\></dt>
<dd>Exigir que los fosfatos terminales estén instanciados.<br/>Default: false<br/></dd>
<dt><b>-distinguish_pucker</b> \<Boolean\></dt>
<dd>distinguir el pucker cuando cluster:both en el muestreador y el agrupador<br/>Default: true<br/></dd>
<dt><b>-finer_sampling_at_chain_closure</b> \<Boolean\></dt>
<dd>Muestreador: finer_sampling_at_chain_closure<br/>Default: false<br/></dd>
<dt><b>-PBP_clustering_at_chain_closure</b> \<Boolean\></dt>
<dd>Muestreador: PBP_clustering_at_chain_closure<br/>Default: false<br/></dd>
<dt><b>-sample_all_chi</b> \<Boolean\></dt>
<dd>Muestrear todos los ángulos chi (usar para el aprendizaje ciego del potencial chi)<br/>Default: false<br/></dd>
<dt><b>-sampler_allow_syn_pyrimidine</b> \<Boolean\></dt>
<dd>sampler_allow_syn_pyrimidine<br/>Default: false<br/></dd>
<dt><b>-sampler_extra_chi_rotamer</b> \<Boolean\></dt>
<dd>Muestreador: extra_syn_chi_rotamer<br/>Default: false<br/></dd>
<dt><b>-sampler_extra_beta_rotamer</b> \<Boolean\></dt>
<dd>Muestreador: extra_beta_rotamer<br/>Default: false<br/></dd>
<dt><b>-sampler_extra_epsilon_rotamer</b> \<Boolean\></dt>
<dd>Muestreador: extra_epsilon_rotamer<br/>Default: true<br/></dd>
<dt><b>-force_centroid_interaction</b> \<Boolean\></dt>
<dd>Exigir apilamiento o par de bases incluso para un cierre de loop de un solo residuo (¡que también podrían ser bulges!)<br/>Default: false<br/></dd>
<dt><b>-virtual_sugar_legacy_mode</b> \<Boolean\></dt>
<dd>En el muestreo de azúcares virtuales, usar el protocolo heredado para igualar el flujo de trabajo original de Parin<br/>Default: false<br/></dd>
<dt><b>-VDW_rep_optimize_memory_usage</b> \<Boolean\></dt>
<dd>RNA_VDW_BinChecker, no guardar el vector de intervalos xyz ocupados.<br/>Default: false<br/></dd>
<dt><b>-erraser</b> \<Boolean\></dt>
<dd>Usar muestreo KIC<br/>Default: false<br/></dd>
<dt><b>-centroid_screen</b> \<Boolean\></dt>
<dd>centroid_screen<br/>Default: true<br/></dd>
<dt><b>-VDW_atr_rep_screen</b> \<Boolean\></dt>
<dd>VDW_atr_rep_screen clásico<br/>Default: true<br/></dd>
<dt><b>-minimize_and_score_native_pose</b> \<Boolean\></dt>
<dd>minimize_and_score_native_pose <br/>Default: false<br/></dd>
<dt><b>-rm_virt_phosphate</b> \<Boolean\></dt>
<dd>Quitar los parches de fosfato virtual durante la minimización<br/>Default: false<br/></dd>
<dt><b>-VDW_rep_screen_info</b> \<StringVector\></dt>
<dd>VDW_rep_screen_info para crear VDW_rep_screen_bin ( útil al construir un loop a partir de Poses grandes )<br/>Default: []<br/></dd>
<dt><b>-VDW_rep_alignment_RMSD_CUTOFF</b> \<Real\></dt>
<dd>usar con VDW_rep_screen_info<br/>Default: 0.001<br/></dd>
<dt><b>-VDW_rep_delete_matching_res</b> \<StringVector\></dt>
<dd>eliminar los residuos de VDW_rep_pose que existen en working_pose<br/>Default: []<br/></dd>
<dt><b>-VDW_rep_screen_physical_pose_clash_dist_cutoff</b> \<Real\></dt>
<dd>El corte de distancia para VDW_rep_screen_with_physical_pose<br/>Default: 1.2<br/></dd>
<dt><b>-integration_test</b> \<Boolean\></dt>
<dd> integration_test <br/>Default: false<br/></dd>
<dt><b>-allow_bulge_at_chainbreak</b> \<Boolean\></dt>
<dd>Permitir que el muestreador reemplace el residuo de chainbreak con virtual_rna_variant si parece tener mala puntuación fa_atr.<br/>Default: true<br/></dd>
<dt><b>-parin_favorite_output</b> \<Boolean\></dt>
<dd> parin_favorite_output <br/>Default: true<br/></dd>
<dt><b>-reinitialize_CCD_torsions</b> \<Boolean\></dt>
<dd>Muestreador: reinitialize_CCD_torsions: reinicializar la torsión CCD a cero antes de cada cierre de cadena CCD<br/>Default: false<br/></dd>
<dt><b>-sample_both_sugar_base_rotamer</b> \<Boolean\></dt>
<dd>Muestreador: súper truco para SQUARE_RNA<br/>Default: false<br/></dd>
<dt><b>-sampler_include_torsion_value_in_tag</b> \<Boolean\></dt>
<dd>Muestreador: include_torsion_value_in_tag<br/>Default: true<br/></dd>
<dt><b>-sampler_assert_no_virt_sugar_sampling</b> \<Boolean\></dt>
<dd>sampler_assert_no_virt_sugar_sampling<br/>Default: false<br/></dd>
<dt><b>-sampler_try_sugar_instantiation</b> \<Boolean\></dt>
<dd>para el muestreo de base flotante, intentar instanciar el azúcar si parece prometedor<br/>Default: false<br/></dd>
<dt><b>-do_not_sample_multiple_virtual_sugar</b> \<Boolean\></dt>
<dd> Muestreador: do_not_sample_multiple_virtual_sugar <br/>Default: false<br/></dd>
<dt><b>-sample_ONLY_multiple_virtual_sugar</b> \<Boolean\></dt>
<dd> Muestreador: sample_ONLY_multiple_virtual_sugar <br/>Default: false<br/></dd>
<dt><b>-allow_base_pair_only_centroid_screen</b> \<Boolean\></dt>
<dd>allow_base_pair_only_centroid_screen<br/>Default: false<br/></dd>
<dt><b>-minimizer_rename_tag</b> \<Boolean\></dt>
<dd>Reordenar y renombrar la etiqueta según la energy_score<br/>Default: true<br/></dd>
<dt><b>-minimize_res</b> \<IntegerVector\></dt>
<dd>alternativa a fixed_res<br/>Default: []<br/></dd>
<dt><b>-alignment_res</b> \<StringVector\></dt>
<dd>align_res_list<br/>Default: []<br/></dd>
<dt><b>-native_alignment_res</b> \<IntegerVector\></dt>
<dd>opcional: native_alignment_res <br/>Default: []<br/></dd>
<dt><b>-rmsd_res</b> \<IntegerVector\></dt>
<dd>residuos que se usarán para calcular el rmsd ( para el agrupamiento y también para el RMSD respecto a native_pdb, si se especifica )<br/>Default: []<br/></dd>
<dt><b>-missing_res</b> \<IntegerVector\></dt>
<dd>Residuos ausentes en el Pose inicial 1, alternativa a input_res<br/>Default: []<br/></dd>
<dt><b>-missing_res2</b> \<IntegerVector\></dt>
<dd>Residuos ausentes en el Pose inicial 2, alternativa a input_res2<br/>Default: []<br/></dd>
<dt><b>-job_queue_ID</b> \<Integer\></dt>
<dd>modo swa_rna_sample()/combine_long_loop: especifica el par de etiquetas de filter_output_filename que se leerá e importará ( ¡empieza en 0! )<br/>Default: 0<br/></dd>
<dt><b>-minimize_and_score_sugar</b> \<Boolean\></dt>
<dd>minimizar y torsión del azúcar + ¿ángulo? e incluir el término de puntuación rna_sugar_close <br/>Default: true<br/></dd>
<dt><b>-global_sample_res_list</b> \<IntegerVector\></dt>
<dd>Una lista de todos los nucleótidos que se construirán o muestrearán a lo largo de todo el dag.<br/>Default: []<br/></dd>
<dt><b>-filter_output_filename</b> \<File\></dt>
<dd>CombineLongLoopFilterer: filter_output_filename<br/>Default: "filter_struct.txt"<br/></dd>
<dt><b>-combine_long_loop_mode</b> \<Boolean\></dt>
<dd> Muestreador: combine_long_loop_mode <br/>Default: false<br/></dd>
<dt><b>-combine_helical_silent_file</b> \<Boolean\></dt>
<dd>CombineLongLoopFilterer: combine_helical_silent_file<br/>Default: false<br/></dd>
<dt><b>-output_extra_RMSDs</b> \<Boolean\></dt>
<dd>output_extra_RMSDs<br/>Default: false<br/></dd>
<dt><b>-protonated_H1_adenosine_list</b> \<IntegerVector\></dt>
<dd>opcional: protonate_H1_adenosine_list<br/>Default: []<br/></dd>
<dt><b>-native_virtual_res</b> \<IntegerVector\></dt>
<dd> opcional: native_virtual_res <br/>Default: []<br/></dd>
<dt><b>-simple_append_map</b> \<Boolean\></dt>
<dd>simple_append_map<br/>Default: false<br/></dd>
<dt><b>-allow_fixed_res_at_moving_res</b> \<Boolean\></dt>
<dd>principalmente para que funcione el modelado de dúplex de Hermann<br/>Default: false<br/></dd>
<dt><b>-force_user_defined_jumps</b> \<Boolean\></dt>
<dd>Confiar y usar los saltos definidos por el usuario<br/>Default: false<br/></dd>
<dt><b>-jump_point_pairs</b> \<StringVector\></dt>
<dd>opcional: puntos de salto adicionales especificados por el usuario para configurar el fold_tree <br/>Default: []<br/></dd>
<dt><b>-add_virt_root</b> \<Boolean\></dt>
<dd>add_virt_root<br/>Default: false<br/></dd>
<dt><b>-floating_base</b> \<Boolean\></dt>
<dd> floating_base <br/>Default: false<br/></dd>
<dt><b>-floating_base_anchor_res</b> \<Integer\></dt>
<dd>Si queremos que la base flotante se conecte mediante un salto a un residuo ancla (sin residuos virtuales intermedios), especifica el ancla.<br/>Default: 0<br/></dd>
<dt><b>-allow_chain_boundary_jump_partner_right_at_fixed_BP</b> \<Boolean\></dt>
<dd>principalmente para que funcione el modelado de ARN nano-cuadrado de Hermann<br/>Default: false<br/></dd>
<dt><b>-rebuild_bulge_mode</b> \<Boolean\></dt>
<dd>rebuild_bulge_mode<br/>Default: false<br/></dd>
<dt><b>-virtual_sugar_keep_base_fixed</b> \<Boolean\></dt>
<dd>Al instanciar el azúcar virtual, mantener la base fija: ¡no gastar mucho tiempo en minimizar!<br/>Default: true<br/></dd>
<dt><b>-virtual_sugar_do_minimize</b> \<Boolean\></dt>
<dd>Al instanciar el azúcar virtual, minimizar (como en el código SWA original): ¡toma más tiempo!<br/>Default: true<br/></dd>
<dt><b>-sampler_max_centroid_distance</b> \<Real\></dt>
<dd>distancia centroide máxima de la base móvil a la referencia en el muestreador de base flotante<br/>Default: 0.0<br/></dd>
<dt><b>-filter_user_alignment_res</b> \<Boolean\></dt>
<dd> filter_user_alignment_res <br/>Default: true<br/></dd>
<dt><b>-tether_jump</b> \<Boolean\></dt>
<dd>En los movimientos de cuerpo rígido, mantener el residuo móvil cerca del residuo de referencia (conectado por salto) (8.0 Å) y forzar la interacción de centroides entre ellos<br/>Default: true<br/></dd>
<dt><b>-turn_off_rna_chem_map_during_optimize</b> \<Boolean\></dt>
<dd>Al usar rna_chem_map, puntuar con esto solo después de minimizar (toma demasiado tiempo calcularlo durante la optimización).<br/>Default: true<br/></dd>
</dl>
+ <h3>-stepwise:protein</h3>
<dl>
<dt><b>-protein</b> \<Boolean\></dt>
<dd>grupo de opciones protein<br/></dd>
<dt><b>-global_optimize</b> \<Boolean\></dt>
<dd>En el agrupamiento, el empaquetado y la minimización, usar todos los residuos.<br/>Default: false<br/></dd>
<dt><b>-disable_sampling_of_loop_takeoff</b> \<Boolean\></dt>
<dd>Para el cierre de loops de proteína con KIC, no permitir el muestreo de psi en el extremo N ni de phi en los residuos de despegue del extremo C<br/>Default: false<br/></dd>
<dt><b>-sample_beta</b> \<Boolean\></dt>
<dd>muestrear el emparejamiento de hebras beta; luego habrá que especificar paralelo/antiparalelo<br/>Default: false<br/></dd>
<dt><b>-ghost_loops</b> \<Boolean\></dt>
<dd>Virtualizar loops en el cribado centroide<br/>Default: false<br/></dd>
<dt><b>-centroid_screen</b> \<Boolean\></dt>
<dd>Cribado centroide<br/>Default: false<br/></dd>
<dt><b>-centroid_score_diff_cut</b> \<Real\></dt>
<dd>Si se hace -centroid_screen, conservar solo los Poses cuyas energías estén dentro de esta energía respecto a la referencia..<br/>Default: 20.0<br/></dd>
<dt><b>-centroid_weights</b> \<String\></dt>
<dd>pesos para el filtro centroide<br/>Default: "score3.wts"<br/></dd>
<dt><b>-score_diff_cut</b> \<Real\></dt>
<dd>corte de diferencia de puntuación para el agrupamiento<br/>Default: 10.0<br/></dd>
<dt><b>-filter_native_big_bins</b> \<Boolean\></dt>
<dd>Deducir varios términos para score12<br/>Default: false<br/></dd>
<dt><b>-cluster_by_all_atom_rmsd</b> \<Boolean\></dt>
<dd>agrupar por rmsd de todos los átomos<br/>Default: false<br/></dd>
<dt><b>-centroid_output</b> \<Boolean\></dt>
<dd>escribir la estructura centroide durante el cribado<br/>Default: false<br/></dd>
<dt><b>-n_sample</b> \<Integer\></dt>
<dd>número de muestras por ángulo de torsión<br/>Default: 18<br/></dd>
<dt><b>-nstruct_centroid</b> \<Integer\></dt>
<dd>Número de decoys que se escriben del cribado centroide<br/>Default: 0<br/></dd>
<dt><b>-ccd_close</b> \<Boolean\></dt>
<dd>Cerrar loops con CCD<br/>Default: false<br/></dd>
<dt><b>-bridge_res</b> \<IntegerVector\></dt>
<dd>en lugar del muestreo enumerativo de torsiones de la cadena principal, combinar silent files que contienen piezas de loops<br/>Default: []<br/></dd>
<dt><b>-cart_min</b> \<Boolean\></dt>
<dd>Usar el minimizador cartesiano<br/>Default: false<br/></dd>
<dt><b>-move_jumps_between_chains</b> \<Boolean\></dt>
<dd>Mover todos los saltos<br/>Default: false<br/></dd>
<dt><b>-use_packer_instead_of_rotamer_trials</b> \<Boolean\></dt>
<dd>Usar el packer en lugar de pruebas de rotámeros en el muestreo de residuos<br/>Default: false<br/></dd>
<dt><b>-expand_loop_takeoff</b> \<Boolean\></dt>
<dd>expandir el bucle -sample_res para incluir la conexión con los residuos anterior/siguiente<br/>Default: false<br/></dd>
<dt><b>-skip_coord_constraints</b> \<Boolean\></dt>
<dd>Omitir la primera etapa de minimización con restricciones de coordenadas<br/>Default: false<br/></dd>
<dt><b>-allow_virtual_side_chains</b> \<Boolean\></dt>
<dd>En el empaquetado, permitir cadenas laterales virtuales<br/>Default: true<br/></dd>
<dt><b>-protein_prepack</b> \<Boolean\></dt>
<dd>En el empaquetado, pre-empaquetar particiones separadas<br/>Default: true<br/></dd>
<dt><b>-disulfide_file</b> \<String\></dt>
<dd>Archivo con pares de números para los puentes disulfuro deseados.<br/>Default: ""<br/></dd>
</dl>
+ <h2>-full_model</h2>
<dl>
<dt><b>-full_model</b> \<Boolean\></dt>
<dd>grupo de opciones full_model<br/></dd>
<dt><b>-global_seq_file</b> \<String\></dt>
<dd>Archivo con la secuencia global y la secuencia modelada.<br/>Default: ""<br/></dd>
<dt><b>-cutpoint_open</b> \<ResidueChainVector\></dt>
<dd>cutpoints abiertos en el modelo completo<br/>Default: []<br/></dd>
<dt><b>-cutpoint_closed</b> \<ResidueChainVector\></dt>
<dd>cutpoints cerrados en el modelo completo<br/>Default: []<br/></dd>
<dt><b>-cyclize</b> \<ResidueChainVector\></dt>
<dd>puntos de ciclación en el modelo completo<br/>Default: []<br/></dd>
<dt><b>-twoprime</b> \<ResidueChainVector\></dt>
<dd>puntos de ramificación twoprime en el modelo completo<br/>Default: []<br/></dd>
<dt><b>-fiveprime_cap</b> \<ResidueChainVector\></dt>
<dd>residuos con capuchón fiveprime y sus 7MG correspondientes<br/>Default: []<br/></dd>
<dt><b>-other_poses</b> \<StringVector\></dt>
<dd>lista de archivos PDB que contienen otros Poses<br/></dd>
<dt><b>-jump_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuos para definir saltos; proporciónalos en pares<br/>Default: []<br/></dd>
<dt><b>-disulfide_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuos para definir puentes disulfuro; proporciónalos en pares<br/>Default: []<br/></dd>
<dt><b>-extra_min_res</b> \<ResidueChainVector\></dt>
<dd>especifica residuos, distintos de los que se están construyendo, que deben minimizarse<br/>Default: []<br/></dd>
<dt><b>-extra_min_jump_res</b> \<ResidueChainVector\></dt>
<dd>especifica pares conectados por salto, distintos de los que se están construyendo, que deben minimizarse<br/>Default: []<br/></dd>
<dt><b>-root_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuo raíz deseado (usado en las pruebas de movimientos de SWM)<br/>Default: []<br/></dd>
<dt><b>-virtual_sugar_res</b> \<ResidueChainVector\></dt>
<dd>opcional: azúcares virtuales iniciales (usados en las pruebas de movimientos de SWM)<br/>Default: []<br/></dd>
<dt><b>-virtual_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuos para definir residuos virtuales<br/>Default: []<br/></dd>
<dt><b>-sample_res</b> \<ResidueChainVector\></dt>
<dd>residuos que se construyen (para SWA, el primer elemento es el residuo de muestra real y los demás son los residuos del bulge)<br/>Default: []<br/></dd>
<dt><b>-calc_rms_res</b> \<ResidueChainVector\></dt>
<dd>residuos sobre los que se calcula el rms para SWA. Ya no se usa mucho.<br/>Default: []<br/></dd>
<dt><b>-working_res</b> \<ResidueChainVector\></dt>
<dd>residuos que se están construyendo [por defecto se fijarán a partir de sample_res y de cualquier pdb de entrada]<br/>Default: []<br/></dd>
<dt><b>-motif_mode</b> \<Boolean\></dt>
<dd>en las partes fijas del PDB, minimizar los residuos justo al lado de los loops y no permitir pares/apilamiento en los residuos más distales<br/>Default: false<br/></dd>
<dt><b>-allow_jump_in_numbering</b> \<Boolean\></dt>
<dd>útil para diseño. si los números de residuo saltan de i a i+1, *no* asumir un cutpoint.<br/>Default: false<br/></dd>
</dl>
+ <h3>-full_model:rna</h3>
<dl>
<dt><b>-rna</b> \<Boolean\></dt>
<dd>grupo de opciones rna<br/></dd>
<dt><b>-terminal_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuos que no pueden apilarse durante el muestreo<br/>Default: []<br/></dd>
<dt><b>-block_stack_above_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuos sobre los que otros residuos no pueden apilarse por encima (usa átomos de repulsión)<br/>Default: []<br/></dd>
<dt><b>-block_stack_below_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuos sobre los que otros residuos no pueden apilarse por debajo (usa átomos de repulsión)<br/>Default: []<br/></dd>
<dt><b>-force_syn_chi_res_list</b> \<ResidueChainVector\></dt>
<dd>opcional: muestrear solo chi syn para el residuo en el muestreador.<br/>Default: []<br/></dd>
<dt><b>-force_anti_chi_res_list</b> \<ResidueChainVector\></dt>
<dd>opcional: muestrear solo chi anti para el residuo en el muestreador.<br/>Default: []<br/></dd>
<dt><b>-force_north_sugar_list</b> \<ResidueChainVector\></dt>
<dd>opcional: muestrear solo azúcar norte para el residuo en el muestreador.<br/>Default: []<br/></dd>
<dt><b>-force_south_sugar_list</b> \<ResidueChainVector\></dt>
<dd>opcional: muestrear solo azúcar sur para el residuo en el muestreador.<br/>Default: []<br/></dd>
<dt><b>-bulge_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuos que se convertirán en una variante de bulge<br/>Default: []<br/></dd>
<dt><b>-sample_sugar_res</b> \<ResidueChainVector\></dt>
<dd>opcional: residuos del Pose de entrada fijo cuyos azúcares aún pueden moverse<br/>Default: []<br/></dd>
</dl>
+ <h2>-recces</h2>
<dl>
<dt><b>-seq1</b> \<String\></dt>
<dd>secuencia 1 que se modelará, 5' a 3' <br/>Default: ""<br/></dd>
<dt><b>-seq2</b> \<String\></dt>
<dd>secuencia 2 que se modelará, 5' a 3' <br/>Default: ""<br/></dd>
<dt><b>-n_cycle</b> \<Integer\></dt>
<dd>Número de ciclos para el muestreo aleatorio de Monte Carlo por cadenas de Markov<br/>Default: 10000<br/></dd>
<dt><b>-a_form_range</b> \<Real\></dt>
<dd>Rango de muestreo cerca de la forma A para dúplex en RECCES (turner)<br/>Default: 60.0<br/></dd>
<dt><b>-dump_pdb</b> \<Boolean\></dt>
<dd>Volcar archivos pdb<br/>Default: false<br/></dd>
<dt><b>-dump_silent</b> \<Boolean\></dt>
<dd>Volcar las estructuras a un silent file<br/>Default: false<br/></dd>
<dt><b>-out_torsions</b> \<Boolean\></dt>
<dd>Imprimir los ángulos de torsión<br/>Default: false<br/></dd>
<dt><b>-temps</b> \<RealVector\></dt>
<dd>Temperaturas de recocido simulado (simulated tempering)<br/>Default: []<br/></dd>
<dt><b>-st_weights</b> \<RealVector\></dt>
<dd>Pesos del recocido simulado (simulated tempering)<br/>Default: []<br/></dd>
<dt><b>-save_score_terms</b> \<Boolean\></dt>
<dd>Guardar las puntuaciones y los términos de puntuación individuales de todos los confórmeros muestreados<br/>Default: false<br/></dd>
<dt><b>-out_prefix</b> \<String\></dt>
<dd>prefijo para el archivo de salida<br/>Default: "recces"<br/></dd>
<dt><b>-dump_freq</b> \<Integer\></dt>
<dd>Frecuencia para volcar archivos pdb o silent<br/>Default: 500<br/></dd>
<dt><b>-n_intermediate_dump</b> \<Integer\></dt>
<dd>Número de conformaciones intermedias que se vuelcan<br/>Default: 0<br/></dd>
<dt><b>-output_min_pose</b> \<Boolean\></dt>
<dd>Hacer que el último Pose sea el Pose de menor puntuación ('recuperar el mejor')<br/>Default: true<br/></dd>
<dt><b>-accept_no_op_moves</b> \<Boolean\></dt>
<dd>anular el comportamiento en el que las operaciones nulas (p. ej., mover un salto fuera de rango) no son aceptaciones<br/>Default: false<br/></dd>
<dt><b>-histogram_min</b> \<Real\></dt>
<dd>Energía mínima para el histograma<br/>Default: -100.05<br/></dd>
<dt><b>-histogram_max</b> \<Real\></dt>
<dd>Energía máxima para el histograma<br/>Default: +800.05<br/></dd>
<dt><b>-histogram_spacing</b> \<Real\></dt>
<dd>Espaciado para el histograma<br/>Default: 0.1<br/></dd>
</dl>
+ <h3>-recces:base_pair</h3>
<dl>
<dt><b>-base_pair</b> \<Boolean\></dt>
<dd>grupo de opciones base_pair<br/></dd>
<dt><b>-rmsd_cutoff</b> \<Real\></dt>
<dd>corte de RMSD de pares de bases para el muestreo de saltos<br/>Default: 2.0<br/></dd>
<dt><b>-translation_mag</b> \<Real\></dt>
<dd>magnitud de los movimientos aleatorios de traslación<br/>Default: 0.01<br/></dd>
<dt><b>-rotation_mag</b> \<Real\></dt>
<dd>magnitud de los movimientos aleatorios de rotación (en grados)<br/>Default: 1.0<br/></dd>
<dt><b>-recces</b> \<Boolean\></dt>
<dd>activar RECCES en la aplicación piloto rb_entropy<br/>Default: false<br/></dd>
<dt><b>-block_stack</b> \<Boolean\></dt>
<dd>poner átomos block_stack en el par de bases de prueba<br/>Default: false<br/></dd>
<dt><b>-sample_jump</b> \<Boolean\></dt>
<dd>forzar que el salto del par de bases se muestree cuando el Pose se configura con -seq1, -seq2 (modo turner heredado)<br/>Default: false<br/></dd>
</dl>
+ <h3>-recces:thermal_sampling</h3>
<dl>
<dt><b>-thermal_sampling</b> \<Boolean\></dt>
<dd>grupo de opciones thermal_sampling<br/></dd>
<dt><b>-sample_residues</b> \<IntegerVector\></dt>
<dd>residuos que se muestrean<br/>Default: []<br/></dd>
<dt><b>-free_residues</b> \<IntegerVector\></dt>
<dd>residuos que son 'libres'; afecta a la desviación estándar del muestreador de chi<br/>Default: []<br/></dd>
<dt><b>-loop_residues</b> \<IntegerVector\></dt>
<dd>residuos que están en loops y merecen un muestreo total de la cadena principal<br/>Default: []<br/></dd>
<dt><b>-angle_range_bb</b> \<Real\></dt>
<dd>rango en que se pueden mover las torsiones de la cadena principal<br/>Default: 20<br/></dd>
<dt><b>-angle_range_free_bb</b> \<Real\></dt>
<dd>rango en que se pueden mover las torsiones libres de la cadena principal<br/>Default: 180<br/></dd>
<dt><b>-angle_range_chi</b> \<Real\></dt>
<dd>rango en que se pueden mover las torsiones chi<br/>Default: 20<br/></dd>
<dt><b>-angle_range_free_chi</b> \<Real\></dt>
<dd>rango en que se pueden mover las torsiones chi libres<br/>Default: 180<br/></dd>
<dt><b>-chi_stdev</b> \<Real\></dt>
<dd>desviación estándar del muestreador de chi<br/>Default: 20<br/></dd>
<dt><b>-bb_stdev</b> \<Real\></dt>
<dd>desviación estándar del muestreador de la cadena principal<br/>Default: 1<br/></dd>
<dt><b>-standard_bb_stdev</b> \<Real\></dt>
<dd>desviación estándar del muestreador estándar de la cadena principal<br/>Default: 1<br/></dd>
<dt><b>-setup_base_pair_constraints</b> \<Boolean\></dt>
<dd>Identificar pares Watson/Crick en el Pose de entrada y poner restricciones.<br/>Default: false<br/></dd>
</dl>
+ <h2>-strand_assembly</h2>
<dl>
<dt><b>-strand_assembly</b> \<Boolean\></dt>
<dd>grupo de opciones strand_assembly<br/></dd>
<dt><b>-min_num_strands_to_deal</b> \<Integer\></dt>
<dd>Número mínimo de hebras para manejar un sándwich beta<br/></dd>
<dt><b>-max_num_strands_to_deal</b> \<Integer\></dt>
<dd>Número máximo de hebras para manejar un sándwich beta<br/></dd>
<dt><b>-extract_native_only</b> \<Boolean\></dt>
<dd>si es true, extraer solo hebras completas nativas<br/></dd>
<dt><b>-min_res_in_strand</b> \<Integer\></dt>
<dd>número mínimo de residuos en una hebra, para la definición y el análisis de hebras de borde<br/></dd>
<dt><b>-max_res_in_strand</b> \<Integer\></dt>
<dd>Número máximo de residuos en una hebra, para la definición y el análisis de hebras de borde<br/></dd>
<dt><b>-min_O_N_dis</b> \<Real\></dt>
<dd>Distancia mínima entre el oxígeno y el nitrógeno de la cadena principal<br/></dd>
<dt><b>-max_O_N_dis</b> \<Real\></dt>
<dd>Distancia máxima entre el oxígeno y el nitrógeno de la cadena principal<br/></dd>
<dt><b>-min_sheet_dis</b> \<Real\></dt>
<dd>Distancia mínima entre láminas (CA y CA)<br/></dd>
<dt><b>-max_sheet_dis</b> \<Real\></dt>
<dd>Distancia máxima entre láminas (CA y CA)<br/></dd>
<dt><b>-min_sheet_torsion</b> \<Real\></dt>
<dd>Torsión mínima entre láminas (CA y CA) respecto a los residuos terminales<br/></dd>
<dt><b>-max_sheet_torsion</b> \<Real\></dt>
<dd>Torsión máxima entre láminas (CA y CA) respecto a los residuos terminales<br/></dd>
<dt><b>-min_sheet_angle</b> \<Real\></dt>
<dd>Ángulo mínimo entre láminas (CA y CA)<br/></dd>
<dt><b>-max_sheet_angle</b> \<Real\></dt>
<dd>Ángulo máximo entre láminas (CA y CA)<br/></dd>
<dt><b>-min_shortest_dis_sidechain_inter_sheet</b> \<Real\></dt>
<dd>distancia mínima entre cadenas laterales entre láminas (pares de hebras)<br/></dd>
</dl>
+ <h2>-TailSegment</h2>
<dl>
<dt><b>-TailSegment</b> \<Boolean\></dt>
<dd>grupo de opciones TailSegment<br/></dd>
<dt><b>-refine_cycles</b> \<Integer\></dt>
<dd>la fase de refinamiento se ejecuta durante <input> ciclos<br/>Default: 100<br/></dd>
<dt><b>-refine_repack_cycles</b> \<Integer\></dt>
<dd>la fase de refinamiento reempaqueta cada <input> ciclos<br/>Default: 10<br/></dd>
</dl>
+ <h2>-templates</h2>
<dl>
<dt><b>-templates</b> \<Boolean\></dt>
<dd>grupo de opciones templates<br/></dd>
<dt><b>-config</b> \<File\></dt>
<dd>leer una lista de plantillas y alineamientos<br/>Default: "templates.dat"<br/></dd>
<dt><b>-fix_aligned_residues</b> \<Boolean\></dt>
<dd>elegir solo de fragmentos de plantilla y luego mantener fijos estos residuos<br/>Default: false<br/></dd>
<dt><b>-fix_frag_file</b> \<File\></dt>
<dd> los fragmentos de este archivo se eligen una vez al principio y luego se mantienen fijos<br/>Default: ""<br/></dd>
<dt><b>-fix_margin</b> \<Integer\></dt>
<dd>mantener móviles n residuos en los bordes de los fragmentos fijos<br/>Default: 1<br/></dd>
<dt><b>-min_nr_large_frags</b> \<Integer\></dt>
<dd>cuántos fragmentos grandes deben estar presentes<br/>Default: 100000<br/></dd>
<dt><b>-min_nr_small_frags</b> \<Integer\></dt>
<dd>cuántos fragmentos pequeños deben estar presentes<br/>Default: 100000<br/></dd>
<dt><b>-no_pick_fragments</b> \<Boolean\></dt>
<dd>sin más selección de fragmentos de plantillas<br/>Default: false<br/></dd>
<dt><b>-nr_large_copies</b> \<Integer\></dt>
<dd>hacer N copias de cada fragmento de plantilla elegido; una forma improvisada de ponderarlos<br/>Default: 4<br/></dd>
<dt><b>-nr_small_copies</b> \<Integer\></dt>
<dd>hacer N copias de cada fragmento de plantilla elegido; una forma improvisada de ponderarlos<br/>Default: 20<br/></dd>
<dt><b>-pairings</b> \<Boolean\></dt>
<dd>usar los emparejamientos de las plantillas<br/>Default: false<br/></dd>
<dt><b>-pick_multiple_sizes</b> \<Boolean\></dt>
<dd>elegir 9mers, 18mers y 27mers<br/>Default: false<br/></dd>
<dt><b>-strand_constraint</b> \<Boolean\></dt>
<dd>usar las restricciones de hebras basadas en plantillas<br/>Default: false<br/></dd>
<dt><b>-vary_frag_size</b> \<Boolean\></dt>
<dd>elegir fragmentos tan largos como las regiones alineadas<br/>Default: false<br/></dd>
<dt><b>-no_culling</b> \<Boolean\></dt>
<dd>no descartar las restricciones que violan otras plantillas<br/>Default: false<br/></dd>
<dt><b>-helix_pairings</b> \<File\></dt>
<dd>archivo con la lista de emparejamientos que se imponen (elegir saltos de plantillas con H)<br/>Default: ""<br/></dd>
<dt><b>-prefix</b> \<File\></dt>
<dd>ruta del directorio de configuración; se aplica a todos los nombres de archivo de template_config_file<br/>Default: ""<br/></dd>
<dt><b>-change_movemap</b> \<Integer\></dt>
<dd>etapa en la que el MoveMap cambia para permitir que se muevan todos los residuos de la cadena principal; etapas válidas: 3..4 (TRUCO)<br/>Default: 3<br/></dd>
<dt><b>-force_native_topology</b> \<Boolean\></dt>
<dd>forzar la topología nativa (geometrías de las plantillas)<br/>Default: false<br/></dd>
<dt><b>-topology_rank_cutoff</b> \<Real\></dt>
<dd>seleccionar saltos de todas las topologías con una puntuación relativa mayor que; si es 1.0, tomar los 5 mejores<br/>Default: 1.0<br/></dd>
<dt><b>-min_frag_size</b> \<Integer\></dt>
<dd>el fragmento más pequeño elegido de las regiones de plantilla alineadas<br/>Default: 6<br/></dd>
<dt><b>-max_shrink</b> \<Integer\></dt>
<dd>elegir fragmentos hasta max_shrink más pequeños que las regiones alineadas<br/>Default: 0<br/></dd>
<dt><b>-shrink_step</b> \<Integer\></dt>
<dd>shrink_step 5, p. ej., 27mer 22mer 17mer<br/>Default: 5<br/></dd>
<dt><b>-shrink_pos_step</b> \<Integer\></dt>
<dd>distancia entre la posición inicial de los fragmentos reducidos<br/>Default: 5<br/></dd>
<dt><b>-min_padding</b> \<Integer\></dt>
<dd>espacio mínimo entre el fragmento y el hueco<br/>Default: 0<br/></dd>
<dt><b>-min_align_pos</b> \<Integer\></dt>
<dd>ignorar los residuos alineados antes de esta posición<br/>Default: 0<br/></dd>
<dt><b>-max_align_pos</b> \<Integer\></dt>
<dd>ignorar los residuos alineados después de esta posición<br/>Default: -1<br/></dd>
</dl>
+ <h3>-templates:cst</h3>
<dl>
<dt><b>-cst</b> \<Boolean\></dt>
<dd>grupo de opciones cst<br/></dd>
<dt><b>-topN</b> \<Integer\></dt>
<dd>los modelos del ranking topN se usan para las restricciones ( descarte y origen )<br/>Default: 0<br/></dd>
<dt><b>-wTopol</b> \<Real\></dt>
<dd>peso de la puntuación de topología de emparejamiento beta en el ranking<br/>Default: 0.5<br/></dd>
<dt><b>-wExtern</b> \<Real\></dt>
<dd>peso de la puntuación externa ( columna de template_config_file, p. ej., svn-score<br/>Default: 0.5<br/></dd>
</dl>
+ <h3>-templates:fragsteal</h3>
<dl>
<dt><b>-fragsteal</b> \<Boolean\></dt>
<dd>grupo de opciones fragsteal<br/></dd>
<dt><b>-topN</b> \<Integer\></dt>
<dd>los modelos del ranking topN se usan para el robo de fragmentos<br/>Default: 0<br/></dd>
<dt><b>-wTopol</b> \<Real\></dt>
<dd>peso de la puntuación de topología de emparejamiento beta en el ranking<br/>Default: 0.5<br/></dd>
<dt><b>-wExtern</b> \<Real\></dt>
<dd>peso de la puntuación externa ( columna de template_config_file, p. ej., svn-score<br/>Default: 0.5<br/></dd>
</dl>
+ <h2>-trRosetta</h2>
<dl>
<dt><b>-trRosetta</b> \<Boolean\></dt>
<dd>grupo de opciones trRosetta<br/></dd>
<dt><b>-msa_file</b> \<File\></dt>
<dd>Nombre de archivo de un alineamiento múltiple de secuencias, en formato a3m. Los guiones indican secuencias de huecos, y los caracteres en minúscula se eliminarán (y se unirán las regiones flanqueantes).<br/>Default: ""<br/></dd>
<dt><b>-write_constraints_to_file</b> \<String\></dt>
<dd>Si se proporciona, las restricciones de trRosetta se escriben en el nombre de archivo indicado. No se escribe nada si no se proporciona o si es una cadena vacía.<br/>Default: ""<br/></dd>
<dt><b>-only_write_constraints</b> \<Boolean\></dt>
<dd>Si es true, trRosettaProtocolMover o la aplicación trRosetta omite la fase de predicción de estructura y SOLO escribe las restricciones en un archivo. Debe usarse junto con un nombre de archivo indicado con la opción -trRosetta:write_constraints_to_file. False por defecto.<br/>Default: false<br/></dd>
<dt><b>-use_distance_constraints</b> \<Boolean\></dt>
<dd>¿Deben usarse durante la predicción de estructura las restricciones de distancia generadas por la red neuronal trRosetta? Por defecto, true.<br/>Default: true<br/></dd>
<dt><b>-use_omega_constraints</b> \<Boolean\></dt>
<dd>¿Deben usarse durante la predicción de estructura las restricciones de diedro omega generadas por la red neuronal trRosetta? Ten en cuenta que NO es el ángulo diedro omega de la cadena principal, sino un diedro entre residuos definido por CA1-CB1-CB2-CA2. Por defecto, true.<br/>Default: true<br/></dd>
<dt><b>-use_theta_constraints</b> \<Boolean\></dt>
<dd>¿Deben usarse durante la predicción de estructura las restricciones de diedro theta generadas por la red neuronal trRosetta? Ten en cuenta que es un diedro entre residuos definido por N1-CA1-CB1-CB2. Por defecto, true.<br/>Default: true<br/></dd>
<dt><b>-use_phi_constraints</b> \<Boolean\></dt>
<dd>¿Deben usarse durante la predicción de estructura las restricciones de ángulo phi generadas por la red neuronal trRosetta? Ten en cuenta que NO es el ángulo diedro phi de la cadena principal, sino un ángulo entre residuos definido por CA1-CB1-CB2. Por defecto, true.<br/>Default: true<br/></dd>
<dt><b>-distance_constraint_prob_cutoff</b> \<Real\></dt>
<dd>La probabilidad acumulada mínima para las restricciones de distancia entre pares de residuos, por debajo de la cual no se añade ninguna restricción. Por defecto, 0.05.<br/>Default: 0.05<br/></dd>
<dt><b>-omega_constraint_prob_cutoff</b> \<Real\></dt>
<dd>La probabilidad acumulada mínima para las restricciones de diedro omega (CA1-CB1-CB2-CA2) entre pares de residuos, por debajo de la cual no se añade ninguna restricción. Por defecto, 0.55.<br/>Default: 0.55<br/></dd>
<dt><b>-theta_constraint_prob_cutoff</b> \<Real\></dt>
<dd>La probabilidad acumulada mínima para las restricciones de diedro theta (N-CA1-CB1-CB2) entre pares de residuos, por debajo de la cual no se añade ninguna restricción. Por defecto, 0.55.<br/>Default: 0.55<br/></dd>
<dt><b>-phi_constraint_prob_cutoff</b> \<Real\></dt>
<dd>La probabilidad acumulada mínima para las restricciones de ángulo phi (CA1-CB1-CB2) entre pares de residuos, por debajo de la cual no se añade ninguna restricción. Por defecto, 0.65.<br/>Default: 0.65<br/></dd>
<dt><b>-backbone_randomization_mode</b> \<String\></dt>
<dd>La manera en que se aleatoriza inicialmente la cadena principal del polipéptido. Puede ser 'classic' (la manera del artículo original de Yang et al.), 'ramachandran' (aleatorización sesgada por las preferencias de Ramachandran de cada residuo) o 'bins' (aleatorización sesgada por la probabilidad de ver el tipo de residuo i en el intervalo X de la cadena principal y el tipo de residuo i+1 en el intervalo Y). Por defecto, 'classic'.<br/>Default: "classic"<br/></dd>
<dt><b>-backbone_minimization_mode</b> \<String\></dt>
<dd>El protocolo que se usa para minimizar la cadena principal dadas las restricciones. Las opciones son: 'classic0' (minimizar con restricciones de corto alcance, luego con restricciones de medio alcance y luego con restricciones de largo alcance), 'classic1' (minimizar con restricciones de corto y medio alcance, y luego con restricciones de largo alcance) o 'classic2' (minimizar con todas las restricciones). Por defecto, 'classic2'.<br/>Default: "classic2"<br/></dd>
<dt><b>-cis_peptide_prob_non_prepro</b> \<Real\></dt>
<dd>La probabilidad de muestrear un enlace peptídico cis en posiciones que no preceden a una prolina. Ten en cuenta que el muestreo de omega cis solo ocurre en el modo de aleatorización de la cadena principal 'ramachandran', no en 'classic'. (En el modo 'bins', las probabilidades de transición entre intervalos rigen el muestreo cis.) Por defecto, 0.0005; debe ser un valor de 0.0 a 1.0.<br/>Default: 0.0005<br/></dd>
<dt><b>-cis_peptide_prob_prepro</b> \<Real\></dt>
<dd>La probabilidad de muestrear un enlace peptídico cis en posiciones que preceden a una prolina. Ten en cuenta que el muestreo de omega cis solo ocurre en el modo de aleatorización de la cadena principal 'ramachandran', no en 'classic'. (En el modo 'bins', las probabilidades de transición entre intervalos rigen el muestreo cis.) Por defecto, 0.05; debe ser un valor de 0.0 a 1.0.<br/>Default: 0.05<br/></dd>
<dt><b>-scorefxn0</b> \<File\></dt>
<dd>Archivo de pesos de la función de puntuación que se usa durante la minimización inicial (etapa 0) del mover trRosettaProtocol. Por defecto, trRosetta_cen0.wts.<br/>Default: "trRosetta_cen0.wts"<br/></dd>
<dt><b>-scorefxn1</b> \<File\></dt>
<dd>Archivo de pesos de la función de puntuación que se usa durante la minimización de la etapa 1 del mover trRosettaProtocol. Por defecto, trRosetta_cen0.wts.<br/>Default: "trRosetta_cen1.wts"<br/></dd>
<dt><b>-scorefxn2</b> \<File\></dt>
<dd>Archivo de pesos de la función de puntuación que se usa durante la minimización de alivio de choques (etapa 2, etapa de Van der Waals) del mover trRosettaProtocol. Por defecto, trRosetta_cen0.wts.<br/>Default: "trRosetta_cen2.wts"<br/></dd>
<dt><b>-scorefxn3</b> \<File\></dt>
<dd>Archivo de pesos de la función de puntuación que se usa durante la minimización de la etapa tardía (etapa 3, etapa cartesiana) del mover trRosettaProtocol. Por defecto, trRosetta_cen0.wts.<br/>Default: "trRosetta_cart.wts"<br/></dd>
<dt><b>-scorefxn_fullatom</b> \<File\></dt>
<dd>Archivo de pesos de la función de puntuación que se usa para el refinamiento de todos los átomos con FastRelax. Si los términos atom-pair_constraint, dihedral_constraint o angle_constraint son cero, se fijarán en 5.0, 1.0 y 1.0 respectivamente. Si está vacío (el valor por defecto), se usa en su lugar la función de puntuación especificada con -score:weights.<br/>Default: ""<br/></dd>
<dt><b>-mutate_gly_to_ala</b> \<Boolean\></dt>
<dd>Si es true, los residuos de glicina se mutan a alanina durante la fase centroide de minimización y luego se convierten de nuevo para el refinamiento de todos los átomos. True por defecto, para igualar el protocolo original de PyRosetta.<br/>Default: true<br/></dd>
<dt><b>-fullatom_refinement</b> \<Boolean\></dt>
<dd>Si es true, la estructura se convierte en una estructura de todos los átomos y al final se ejecuta el protocolo FastRelax. La función de energía que se usa en este paso es la función de energía por defecto de Rosetta (con los términos de restricciones de pares de átomos, de diedros y de ángulos activados si no lo están). Esto se puede fijar con la opción -trRosetta:scorefxn_fullatom. True por defecto.<br/>Default: true<br/></dd>
<dt><b>-distance_constraint_weight</b> \<Real\></dt>
<dd>Un multiplicador que se puede usar para alterar los pesos de las restricciones de distancia de trRosetta. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-phi_constraint_weight</b> \<Real\></dt>
<dd>Un multiplicador que se puede usar para alterar los pesos de las restricciones de phi (ángulo) de trRosetta. (Ten en cuenta que phi es el ángulo CA1-CB1-CB2, no el ángulo diedro habitual de la cadena principal.) Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-omega_constraint_weight</b> \<Real\></dt>
<dd>Un multiplicador que se puede usar para alterar los pesos de las restricciones de omega de trRosetta. (Ten en cuenta que omega es el ángulo diedro CA1-CB1-CB2-CA2, no el ángulo diedro habitual de la cadena principal.) Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
<dt><b>-theta_constraint_weight</b> \<Real\></dt>
<dd>Un multiplicador que se puede usar para alterar los pesos de las restricciones de theta de trRosetta. Theta restringe el diedro N1-CA1-CB1-CB2. Por defecto, 1.0.<br/>Default: 1.0<br/></dd>
</dl>
+ <h2>-unfolded_state</h2>
<dl>
<dt><b>-unfolded_state</b> \<Boolean\></dt>
<dd>grupo de opciones unfolded_state<br/></dd>
<dt><b>-unfolded_energies_file</b> \<File\></dt>
<dd>ruta a un archivo alternativo de energías del estado desplegado<br/></dd>
<dt><b>-split_unfolded_energies_file</b> \<File\></dt>
<dd>ruta a un archivo alternativo de energías del estado desplegado dividido<br/></dd>
<dt><b>-split_unfolded_energies_atom_type</b> \<String\></dt>
<dd>nombre del tipo de átomo especificado en el archivo definido por la opción split_unfolded_energies_file<br/></dd>
</dl>
+ <h2>-wum</h2>
<dl>
<dt><b>-wum</b> \<Boolean\></dt>
<dd>grupo de opciones wum<br/></dd>
<dt><b>-n_slaves_per_master</b> \<Integer\></dt>
<dd>Normalmente se recomienda un valor entre 32 y 128<br/>Default: 64<br/></dd>
<dt><b>-n_masters</b> \<Integer\></dt>
<dd>Anulación manual de -n_slaves_per_master. ¿Cuántos nodos maestros deben lanzarse? 1 por defecto. En general se recomienda 1 por cada 256-512 núcleos, según la carga de trabajo del maestro<br/>Default: 1<br/></dd>
<dt><b>-memory_limit</b> \<Integer\></dt>
<dd>Límite de memoria para las colas (en kB) <br/>Default: 0<br/></dd>
<dt><b>-extra_scorefxn</b> \<String\></dt>
<dd>Función de puntuación extra para volver a puntuar después de batchrelax<br/></dd>
<dt><b>-extra_scorefxn_ref_structure</b> \<File\></dt>
<dd>Función de puntuación extra para volver a puntuar después de batchrelax: estructura de referencia para la superposición (para funciones de puntuación que dependen de coordenadas absolutas, como la densidad electrónica)<br/></dd>
<dt><b>-extra_scorefxn_relax</b> \<Integer\></dt>
<dd>Después de hacer batch relax y añadir cualquier término de extra_scorefunction, hacer otras N rondas de fast relax (por defecto=0)<br/>Default: 0<br/></dd>
<dt><b>-trim_proportion</b> \<Real\></dt>
<dd>Sin descripción<br/>Default: 0.0<br/></dd>
</dl>
+ <h2>-blivens</h2>
<dl>
<dt><b>-blivens</b> \<Boolean\></dt>
<dd>grupo de opciones blivens<br/></dd>
</dl>
+ <h3>-blivens:disulfide_scorer</h3>
<dl>
<dt><b>-disulfide_scorer</b> \<Boolean\></dt>
<dd>grupo de opciones disulfide_scorer<br/></dd>
<dt><b>-nds_prob</b> \<Real\></dt>
<dd>La probabilidad de puntuar un par que no es un puente disulfuro<br/>Default: 0.0<br/></dd>
<dt><b>-cys_prob</b> \<Real\></dt>
<dd>La probabilidad de escribir un par de cisteínas que no forman puente disulfuro. Por defecto es nds_prob<br/>Default: -1.0<br/></dd>
</dl>
+ <h2>-blivens</h2>
<dl>
<dt><b>-score_type</b> \<String\></dt>
<dd>El tipo de puntuación que se usará, p. ej. para un filtro.<br/>Default: "total_score"<br/></dd>
</dl>
+ <h2>-cmiles</h2>
<dl>
<dt><b>-cmiles</b> \<Boolean\></dt>
<dd>grupo de opciones cmiles<br/></dd>
</dl>
+ <h3>-cmiles:kcluster</h3>
<dl>
<dt><b>-kcluster</b> \<Boolean\></dt>
<dd>grupo de opciones kcluster<br/></dd>
<dt><b>-num_clusters</b> \<Integer\></dt>
<dd>Número de clústeres que se usan en el agrupamiento k<br/></dd>
</dl>
+ <h3>-cmiles:jumping</h3>
<dl>
<dt><b>-jumping</b> \<Boolean\></dt>
<dd>grupo de opciones jumping<br/></dd>
<dt><b>-resi</b> \<Integer\></dt>
<dd>Residuo i<br/></dd>
<dt><b>-resj</b> \<Integer\></dt>
<dd>Residuo j<br/></dd>
</dl>
+ <h2>-crossmatch</h2>
<dl>
<dt><b>-crossmatch</b> \<Boolean\></dt>
<dd>grupo de opciones crossmatch<br/></dd>
<dt><b>-clash_dis</b> \<Real\></dt>
<dd><br/>Default: 3.0<br/></dd>
</dl>
+ <h2>-dwkulp</h2>
<dl>
<dt><b>-dwkulp</b> \<Boolean\></dt>
<dd>grupo de opciones dwkulp<br/></dd>
<dt><b>-forcePolyAAfragments</b> \<String\></dt>
<dd>un único aminoácido que se usará para la selección de fragmentos; por defecto está en blanco, lo que significa tomar la secuencia real del Pose<br/>Default: ""<br/></dd>
</dl>
+ <h2>-evolution</h2>
<dl>
<dt><b>-evolution</b> \<Boolean\></dt>
<dd>grupo de opciones evolution<br/></dd>
<dt><b>-parentlist</b> \<FileVector\></dt>
<dd>Archivo o archivos que contienen listas de archivos PDB padre que se procesarán<br/></dd>
<dt><b>-childlist</b> \<FileVector\></dt>
<dd>Archivo o archivos que contienen listas de archivos PDB padre que se procesarán<br/></dd>
<dt><b>-action</b> \<String\></dt>
<dd>Uno de los siguientes: diversify, intensify <br/>Default: "diversify"<br/></dd>
<dt><b>-rms_threshold</b> \<Real\></dt>
<dd>Umbral de agrupamiento por RMS<br/>Default: 3.5<br/></dd>
<dt><b>-rms_topmargin</b> \<Real\></dt>
<dd>Umbral de agrupamiento por RMS<br/>Default: 5.0<br/></dd>
<dt><b>-targetdir</b> \<String\></dt>
<dd>Escribir la nueva población padre objetivo en este directorio. <br/>Default: "./"<br/></dd>
<dt><b>-padding_score_filter</b> \<Real\></dt>
<dd>Umbral de agrupamiento por RMS<br/>Default: 5.0<br/></dd>
<dt><b>-padding_stage2_filter</b> \<Real\></dt>
<dd>Umbral de agrupamiento por RMS<br/>Default: 15.0<br/></dd>
</dl>
+ <h2>-james</h2>
<dl>
<dt><b>-james</b> \<Boolean\></dt>
<dd>grupo de opciones james<br/></dd>
<dt><b>-min_seqsep</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 0<br/></dd>
<dt><b>-atom_names</b> \<StringVector\></dt>
<dd>Sin descripción<br/>Default: utility::vector1<std::string>()<br/></dd>
<dt><b>-dist_thresholds</b> \<RealVector\></dt>
<dd>Sin descripción<br/>Default: utility::vector1<float>(1, 1.0)<br/></dd>
<dt><b>-torsion_thresholds</b> \<RealVector\></dt>
<dd>Sin descripción<br/>Default: utility::vector1<float>(1, 30.0)<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-real</b> \<Real\></dt>
<dd>Opción para mantener las cosas reales.<br/>Default: 7.0<br/></dd>
<dt><b>-n_designs</b> \<Integer\></dt>
<dd>número total de diseños que James debe hacer.<br/>Default: 1<br/></dd>
<dt><b>-thread_unaligned</b> \<Boolean\></dt>
<dd>basic_threading sin realizar un alineamiento<br/>Default: false<br/></dd>
</dl>
+ <h2>-krassk</h2>
<dl>
<dt><b>-krassk</b> \<Boolean\></dt>
<dd>grupo de opciones krassk<br/></dd>
<dt><b>-tail_mode</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-tail_mode_name</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 1<br/></dd>
<dt><b>-tail_output_file_name</b> \<String\></dt>
<dd>Sin descripción<br/>Default: "tail_output"<br/></dd>
</dl>
+ <h2>-loodo</h2>
<dl>
<dt><b>-loodo</b> \<Boolean\></dt>
<dd>grupo de opciones loodo<br/></dd>
<dt><b>-ins_begin</b> \<Integer\></dt>
<dd>sitio de inserción (numeración del Pose)<br/></dd>
<dt><b>-cap</b> \<String\></dt>
<dd>pdb de la tapa (cap)<br/>Default: ""<br/></dd>
<dt><b>-bot</b> \<String\></dt>
<dd>pdb inferior (bot)<br/>Default: ""<br/></dd>
<dt><b>-fragAlength</b> \<IntegerVector\></dt>
<dd>longitudes del loop A<br/></dd>
<dt><b>-fragBlength</b> \<IntegerVector\></dt>
<dd>longitudes del loop B<br/></dd>
<dt><b>-known</b> \<Integer\></dt>
<dd>longitud de la región interior conocida<br/></dd>
<dt><b>-fragAnative</b> \<String\></dt>
<dd>archivo pdb del loop A nativo<br/>Default: ""<br/></dd>
<dt><b>-fragBnative</b> \<String\></dt>
<dd>archivo pdb del loop B nativo<br/>Default: ""<br/></dd>
<dt><b>-gridligpath</b> \<String\></dt>
<dd>ruta al archivo gridlig<br/>Default: ""<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>volcar los pdb de CapHitB<br/>Default: false<br/></dd>
<dt><b>-ca_ratio</b> \<Real\></dt>
<dd>fracción de carbonos alfa necesaria en la rejilla del sitio activo<br/>Default: 0.5<br/></dd>
<dt><b>-distance_tolerance</b> \<Real\></dt>
<dd>corte de distancia para las comparaciones por pares de x,y,z de Real6<br/>Default: 5.0<br/></dd>
<dt><b>-euler_tolerance</b> \<Real\></dt>
<dd>corte de ángulo para las comparaciones por pares de ángulos de Euler de Real6<br/>Default: 15.0<br/></dd>
<dt><b>-num_frags</b> \<Integer\></dt>
<dd>número de fragmentos que se eligen por marco en la biblioteca<br/>Default: 4500<br/></dd>
<dt><b>-use_fraglib</b> \<String\></dt>
<dd>biblioteca de fragmentos que se usará en lugar de la base de datos vall<br/></dd>
<dt><b>-use_fraglibsc</b> \<String\></dt>
<dd>biblioteca de fragmentos que se usará en lugar de la base de datos vall, con torsiones de cadenas laterales especificadas<br/></dd>
<dt><b>-com_in_grid</b> \<Boolean\></dt>
<dd>el centro de masa de la tapa (cap) debe estar dentro de la rejilla de colocación<br/>Default: false<br/></dd>
<dt><b>-loud</b> \<Boolean\></dt>
<dd>¿salida ruidosa?<br/>Default: false<br/></dd>
<dt><b>-dump_all_As</b> \<Boolean\></dt>
<dd>volcar los A que pasan<br/>Default: false<br/></dd>
<dt><b>-dump_all_Bs</b> \<Boolean\></dt>
<dd>volcar los B que pasan<br/>Default: false<br/></dd>
<dt><b>-caphit_rt_file</b> \<String\></dt>
<dd>nombre del archivo CapHit_RT o CapHitRT filtrado<br/></dd>
</dl>
+ <h2>-murphp</h2>
<dl>
<dt><b>-murphp</b> \<Boolean\></dt>
<dd>grupo de opciones murphp<br/></dd>
<dt><b>-inv_kin_lig_loop_design_filename</b> \<String\></dt>
<dd>nombre de archivo de entrada que se usará para inv_kin_lig_loop_design<br/></dd>
</dl>
+ <h2>-ligand_evolution</h2>
<dl>
<dt><b>-ligand_evolution</b> \<Boolean\></dt>
<dd>grupo de opciones ligand_evolution<br/></dd>
<dt><b>-options</b> \<File\></dt>
<dd>Ruta al archivo de opciones<br/></dd>
<dt><b>-xyz</b> \<RealVector\></dt>
<dd>posición <x> <y> <z> de la colocación inicial del ligando<br/></dd>
<dt><b>-external_scoring</b> \<Integer\></dt>
<dd>Si se fija, el protocolo de docking se aplicará a una lista de smiles y se guardará el número de resultados especificado.<br/></dd>
<dt><b>-smiles_file</b> \<File\></dt>
<dd>Lista de smiles que deben acoplarse. Esto activa un modo de ejecución alternativo de REvoLd.<br/></dd>
<dt><b>-n_scoring_runs</b> \<Integer\></dt>
<dd>Con qué frecuencia debe aplicarse el protocolo de puntuación a cada complejo. Por defecto, 150.<br/>Default: 150<br/></dd>
<dt><b>-ligand_chain</b> \<String\></dt>
<dd>Nombre de la cadena del ligando usada en el protocolo de docking. Por defecto, X.<br/>Default: "X"<br/></dd>
<dt><b>-pose_output_directory</b> \<Path\></dt>
<dd>Directorio en el que se escribirán todos los Poses calculados. Por defecto, el directorio actual.<br/>Default: "."<br/></dd>
<dt><b>-main_scfx</b> \<String\></dt>
<dd>Nombre de la función de puntuación especificada en el protocolo de docking que debe usarse para puntuar los compuestos.<br/></dd>
<dt><b>-score_mem_path</b> \<File\></dt>
<dd>Ruta a un archivo de resultados anterior que se carga como memoria de puntuaciones<br/></dd>
<dt><b>-reagent_file</b> \<File\></dt>
<dd>Ruta a un archivo que define reactivos para reacciones<br/></dd>
<dt><b>-reaction_file</b> \<File\></dt>
<dd>Ruta a un archivo que define la reacción usada para el espacio químico combinatorio<br/></dd>
<dt><b>-main_term</b> \<String\></dt>
<dd>Nombre del término principal usado como función de aptitud (fitness). Por defecto, lid_root2<br/>Default: "lid_root2"<br/></dd>
<dt><b>-n_generations</b> \<Integer\></dt>
<dd>Durante cuántas generaciones debe optimizar REvoLd. Por defecto, 30.<br/>Default: 30<br/></dd>
</dl>
+ <h2>-peptide_deriver</h2>
<dl>
<dt><b>-peptide_deriver</b> \<Boolean\></dt>
<dd>grupo de opciones peptide_deriver<br/></dd>
<dt><b>-pep_lengths</b> \<IntegerVector\></dt>
<dd>Longitud o longitudes de los péptidos derivados<br/>Default: ['10']<br/></dd>
<dt><b>-skip_zero_isc</b> \<Boolean\></dt>
<dd>Hace que la derivación sea más rápida omitiendo los péptidos con puntuación de interfaz 0<br/>Default: true<br/></dd>
<dt><b>-dump_peptide_pose</b> \<Boolean\></dt>
<dd>Escribir el Pose con el péptido recortado (el mejor de cada par de cadenas)<br/>Default: false<br/></dd>
<dt><b>-dump_cyclic_poses</b> \<Boolean\></dt>
<dd>Escribir cada Pose de péptido cíclico (los que se modelan; lo determina -optimize_cyclic_threshold)<br/>Default: false<br/></dd>
<dt><b>-dump_prepared_pose</b> \<Boolean\></dt>
<dd>Escribir cada Pose receptor-pareja tal como lo ve Peptiderive, es decir, tras la preparación (minimización y detección de puentes disulfuro)<br/>Default: false<br/></dd>
<dt><b>-dump_report_file</b> \<Boolean\></dt>
<dd>Enviar la salida de PeptideDeriver a un archivo (<input_name>.peptiderive.txt)<br/>Default: true<br/></dd>
<dt><b>-restrict_receptors_to_chains</b> \<StringVector\></dt>
<dd>Usar solo las cadenas listadas aquí como receptores. Si está vacío, se consideran todas las cadenas.<br/>Default: []<br/></dd>
<dt><b>-restrict_partners_to_chains</b> \<StringVector\></dt>
<dd>Usar solo las cadenas listadas aquí como parejas. Si está vacío, se consideran todas las cadenas. Para cada par receptor-pareja, se deriva un péptido de la pareja.<br/>Default: []<br/></dd>
<dt><b>-do_minimize</b> \<Boolean\></dt>
<dd>Realizar minimización antes de todo.<br/>Default: true<br/></dd>
<dt><b>-optimize_cyclic_threshold</b> \<Real\></dt>
<dd>Elegir el valor del porcentaje de la puntuación de interfaz del péptido respecto a isc total a partir del cual optimizar el péptido cíclico<br/>Default: 0.35<br/></dd>
<dt><b>-report_format</b> \<String\></dt>
<dd>El formato del informe. 'basic' (formato fácil de analizar) o 'markdown' (formato bonito y legible, pero extenso).<br/>Default: "markdown"<br/></dd>
<dt><b>-report_gzip</b> \<Boolean\></dt>
<dd>Comprimir con gzip el archivo de informe (solo si -dump_report_file está activado)<br/>Default: false<br/></dd>
</dl>
+ <h2>-phil</h2>
<dl>
<dt><b>-phil</b> \<Boolean\></dt>
<dd>grupo de opciones phil<br/></dd>
<dt><b>-nloop</b> \<Integer\></dt>
<dd>Sin descripción<br/>Default: 10<br/></dd>
<dt><b>-vall_file</b> \<String\></dt>
<dd>Sin descripción<br/></dd>
</dl>
+ <h2>-ralford</h2>
<dl>
<dt><b>-ralford</b> \<Boolean\></dt>
<dd>grupo de opciones ralford<br/></dd>
</dl>
+ <h3>-ralford:dump_rotamers</h3>
<dl>
<dt><b>-dump_rotamers</b> \<Boolean\></dt>
<dd>grupo de opciones dump_rotamers<br/></dd>
<dt><b>-rsd_index</b> \<Integer\></dt>
<dd>Volcar todos los rotámeros del aminoácido en una posición especificada por el usuario<br/>Default: 1<br/></dd>
<dt><b>-rotamer_info_prefix</b> \<String\></dt>
<dd>Prefijo del archivo de salida de información de rotámeros<br/>Default: "output"<br/></dd>
<dt><b>-write_rotamers_to_pdbs</b> \<Boolean\></dt>
<dd>Escribir todos los Poses de rotámeros en archivos pdb<br/>Default: false<br/></dd>
<dt><b>-all_positions</b> \<Boolean\></dt>
<dd>Opción para volcar todos los rotámeros en todas las posiciones; úsala con precaución<br/>Default: false<br/></dd>
</dl>
+ <h2>-robert</h2>
<dl>
<dt><b>-robert</b> \<Boolean\></dt>
<dd>grupo de opciones robert<br/></dd>
<dt><b>-pairdata_input_pdb_list</b> \<String\></dt>
<dd>Recibe un archivo que contiene una lista de ubicaciones de pdb emparejadas con datos específicos del protocolo (p. ej.: un par de disulfuro)<br/>Default: ""<br/></dd>
<dt><b>-pcs_maxsub_filter</b> \<Real\></dt>
<dd>maxsub normalizado mínimo para el protocolo de agrupamiento PCS<br/>Default: 0.9<br/></dd>
<dt><b>-pcs_maxsub_rmsd</b> \<Real\></dt>
<dd>umbral de rmsd del cálculo de maxsub<br/>Default: 4.0<br/></dd>
<dt><b>-pcs_dump_cluster</b> \<Boolean\></dt>
<dd>Sin descripción<br/>Default: false<br/></dd>
<dt><b>-pcs_cluster_coverage</b> \<Real\></dt>
<dd>cobertura de clúster requerida<br/>Default: 0.3<br/></dd>
<dt><b>-pcs_cluster_lowscoring</b> \<Boolean\></dt>
<dd>agrupar el 20% inferior frente al 50% inferior<br/>Default: true<br/></dd>
</dl>
+ <h2>-rot_anl</h2>
<dl>
<dt><b>-rot_anl</b> \<Boolean\></dt>
<dd>grupo de opciones rot_anl<br/></dd>
<dt><b>-tag</b> \<String\></dt>
<dd>etiqueta de nombre<br/>Default: "."<br/></dd>
<dt><b>-min</b> \<Boolean\></dt>
<dd>hacer sc min<br/>Default: false<br/></dd>
<dt><b>-repack</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-rtmin</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-scmove</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-design</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-dump_pdb</b> \<Boolean\></dt>
<dd>volcar pdb cuando se supere el umbral<br/>Default: false<br/></dd>
<dt><b>-nloop_scmove</b> \<Integer\></dt>
<dd>base del bucle de scmover (total=nloop^n_chi)<br/>Default: 9<br/></dd>
</dl>
+ <h2>-smhybrid</h2>
<dl>
<dt><b>-smhybrid</b> \<Boolean\></dt>
<dd>grupo de opciones smhybrid<br/></dd>
<dt><b>-add_cavities</b> \<Boolean\></dt>
<dd>escribir las cavidades en los pdb de resultado<br/>Default: false<br/></dd>
<dt><b>-abinitio_design</b> \<Boolean\></dt>
<dd>hacer una ejecución de diseño en modo centroide<br/>Default: true<br/></dd>
<dt><b>-fa_refine</b> \<Boolean\></dt>
<dd>Hacer el flxbb de Nobu<br/>Default: true<br/></dd>
<dt><b>-virtual_nterm</b> \<Boolean\></dt>
<dd>quitar el extremo N<br/>Default: false<br/></dd>
<dt><b>-debug</b> \<Boolean\></dt>
<dd>depuración<br/>Default: false<br/></dd>
<dt><b>-refine</b> \<Boolean\></dt>
<dd>no hacer movimientos centroide pequeños<br/>Default: false<br/></dd>
<dt><b>-centroid_all_val</b> \<Boolean\></dt>
<dd>mutar todo a VAL en modo centroide<br/>Default: false<br/></dd>
<dt><b>-subsubs_attract</b> \<Boolean\></dt>
<dd>atraer subsubunidades entre sí<br/>Default: false<br/></dd>
<dt><b>-linker_cst</b> \<Boolean\></dt>
<dd>atraer los extremos N/C para el enlazador<br/>Default: false<br/></dd>
<dt><b>-pseudosym</b> \<Boolean\></dt>
<dd>TRUCO de pseudosimetría<br/>Default: false<br/></dd>
<dt><b>-design_linker</b> \<Boolean\></dt>
<dd>permitir el diseño en los residuos 'enlazador' añadidos<br/>Default: true<br/></dd>
<dt><b>-design</b> \<Boolean\></dt>
<dd>permitir el diseño en los residuos 'enlazador' añadidos<br/>Default: true<br/></dd>
<dt><b>-restrict_design_to_interface</b> \<Boolean\></dt>
<dd>permitir el diseño en los residuos 'enlazador' añadidos<br/>Default: false<br/></dd>
<dt><b>-restrict_design_to_subsub_interface</b> \<Boolean\></dt>
<dd>permitir el diseño en los residuos 'enlazador' añadidos<br/>Default: false<br/></dd>
<dt><b>-design_hydrophobic</b> \<Boolean\></dt>
<dd>diseñar todo hidrofóbico<br/>Default: false<br/></dd>
<dt><b>-add_metal_at_0</b> \<Boolean\></dt>
<dd>OBSOLETO<br/>Default: false<br/></dd>
<dt><b>-nres_mono</b> \<Integer\></dt>
<dd>número objetivo de residuos por monómero<br/>Default: 20<br/></dd>
<dt><b>-abinitio_cycles</b> \<Integer\></dt>
<dd>número de ciclos abinitio<br/>Default: 10000<br/></dd>
<dt><b>-primary_subsubunit</b> \<Integer\></dt>
<dd>subunidad primaria<br/>Default: 1<br/></dd>
<dt><b>-minbb</b> \<Integer\></dt>
<dd>nivel de minimización de la cadena principal 0=ninguna 1=poca 2=toda<br/>Default: 1<br/></dd>
<dt><b>-switch_concert_sub</b> \<Integer\></dt>
<dd>asumir que la subsubunidad primaria está en esta subunidad para los movimientos RB concertados<br/>Default: 1<br/></dd>
<dt><b>-temperature</b> \<Real\></dt>
<dd>temperatura de MC para el plegamiento centroide<br/>Default: 2.0<br/></dd>
<dt><b>-inter_subsub_cst</b> \<Boolean\></dt>
<dd>añadir restricciones de distancia entre subsubunidades<br/>Default: false<br/></dd>
<dt><b>-rb_mag</b> \<Real\></dt>
<dd>magnitud de los movimientos rb<br/>Default: 1.0<br/></dd>
<dt><b>-symm_def_template</b> \<File\></dt>
<dd>plantilla para el archivo de definición de simetría<br/></dd>
<dt><b>-symm_def_template_reduced</b> \<File\></dt>
<dd>plantilla para el archivo de definición de simetría reducida<br/></dd>
<dt><b>-attach_as_sc</b> \<IntegerVector\></dt>
<dd>unir el grupo mediante la cadena lateral<br/></dd>
<dt><b>-attach_as_sc_sub</b> \<IntegerVector\></dt>
<dd>unir el grupo mediante la cadena lateral en esta subunidad<br/></dd>
<dt><b>-chainbreaks</b> \<BooleanVector\></dt>
<dd>cerrar el chainbreak desde esta subsubunidad hasta la siguiente<br/></dd>
<dt><b>-design_res_files</b> \<StringVector\></dt>
<dd>archivos que contienen los residuos diseñables de cada Pose componente<br/>Default: ""<br/></dd>
<dt><b>-fixed_res_files</b> \<StringVector\></dt>
<dd>archivos que contienen los residuos fijos (ni siquiera se reempaquetan) de cada Pose componente<br/>Default: ""<br/></dd>
<dt><b>-frag_res_files</b> \<StringVector\></dt>
<dd>archivos que contienen los residuos donde se pueden insertar fragmentos. Tendrán la estructura secundaria inicial<br/>Default: ""<br/></dd>
<dt><b>-scattach_res_files</b> \<StringVector\></dt>
<dd>archivos que contienen los residuos a los que se puede unir (scattach).<br/>Default: ""<br/></dd>
<dt><b>-rep_edge_files</b> \<StringVector\></dt>
<dd>archivos que contienen los residuos que son hebras de borde.<br/>Default: ""<br/></dd>
<dt><b>-virtual_res_files</b> \<StringVector\></dt>
<dd>archivos que contienen los residuos que deben ser virtuales<br/>Default: ""<br/></dd>
<dt><b>-jumpcut_files</b> \<StringVector\></dt>
<dd>archivo que especifica los saltos y cortes de las subsubunidades<br/>Default: ""<br/></dd>
<dt><b>-cst_sub_files</b> \<StringVector\></dt>
<dd>archivo que especifica qué subunidades forman parte de una unidad estructural y deben restringirse<br/>Default: ""<br/></dd>
<dt><b>-symm_file_tag</b> \<StringVector\></dt>
<dd>etiqueta de cada subunidad<br/>Default: ""<br/></dd>
<dt><b>-attach_atom</b> \<StringVector\></dt>
<dd>átomo de unión en cada subunidad<br/>Default: ""<br/></dd>
<dt><b>-add_res_before</b> \<StringVector\></dt>
<dd>estructura secundaria que se añade antes de cada región de subunidad<br/>Default: ""<br/></dd>
<dt><b>-add_res_after</b> \<StringVector\></dt>
<dd>estructura secundaria que se añade después de cada región de subunidad<br/>Default: ""<br/></dd>
<dt><b>-add_ss_before</b> \<StringVector\></dt>
<dd>residuos que se añaden<br/>Default: ""<br/></dd>
<dt><b>-add_ss_after</b> \<StringVector\></dt>
<dd>estructura secundaria que se añade después de cada región de subunidad<br/>Default: ""<br/></dd>
<dt><b>-add_atom_at_cen</b> \<StringVector\></dt>
<dd>estructura secundaria que se añade después de cada región de subunidad<br/>Default: ""<br/></dd>
<dt><b>-attach_rsd</b> \<StringVector\></dt>
<dd>residuo de unión en cada subunidad<br/>Default: ""<br/></dd>
</dl>
+ <h2>-tcrmodel</h2>
<dl>
<dt><b>-tcrmodel</b> \<Boolean\></dt>
<dd>grupo de opciones tcrmodel<br/></dd>
<dt><b>-ignore_list</b> \<File\></dt>
<dd>lista de plantillas a ignorar dada por el usuario para tcrmodel<br/>Default: ""<br/></dd>
<dt><b>-blastp_identity_cutoff</b> \<Real\></dt>
<dd>Corte para ignorar plantillas según los resultados de blast<br/>Default: 100<br/></dd>
<dt><b>-template_identity_cutoff</b> \<Real\></dt>
<dd>Corte para ignorar plantillas según la puntuación de identidad de secuencia<br/>Default: 100<br/></dd>
<dt><b>-include_ab_templates</b> \<Boolean\></dt>
<dd>incluir plantillas de anticuerpos<br/>Default: false<br/></dd>
<dt><b>-dump_templates</b> \<Boolean\></dt>
<dd>volcar todos los archivos pdb de plantillas<br/>Default: false<br/></dd>
<dt><b>-skip_modeling</b> \<Boolean\></dt>
<dd>omitir la parte de modelado, usado para probar la información de secuencia y plantillas<br/>Default: false<br/></dd>
<dt><b>-ab_template_db_path</b> \<String\></dt>
<dd>ruta de la base de datos de plantillas de anticuerpos<br/>Default: "./"<br/></dd>
<dt><b>-tcr_template_db_path</b> \<String\></dt>
<dd>ruta de la base de datos de plantillas de TCR<br/>Default: ""<br/></dd>
<dt><b>-minimize_model</b> \<Boolean\></dt>
<dd>minimizar el modelo de TCR<br/>Default: true<br/></dd>
<dt><b>-relax_model</b> \<Boolean\></dt>
<dd>aplicar relax al modelo de TCR<br/>Default: false<br/></dd>
<dt><b>-remodel_loop_cdr3a</b> \<Boolean\></dt>
<dd>remodelar el loop CDR3 de la cadena alfa del TCR<br/>Default: false<br/></dd>
<dt><b>-remodel_loop_cdr3b</b> \<Boolean\></dt>
<dd>remodelar el loop CDR3 de la cadena beta del TCR<br/>Default: false<br/></dd>
<dt><b>-remodel_tcr_cdr3a_loop</b> \<Boolean\></dt>
<dd>remodelar el loop CDR3 de la cadena alfa del TCR<br/>Default: false<br/></dd>
<dt><b>-remodel_tcr_cdr3b_loop</b> \<Boolean\></dt>
<dd>remodelar el loop CDR3 de la cadena beta del TCR<br/>Default: false<br/></dd>
<dt><b>-refine_tcr_cdr3a_loop</b> \<Boolean\></dt>
<dd>refinar el loop CDR3 de la cadena alfa del TCR<br/>Default: false<br/></dd>
<dt><b>-refine_tcr_cdr3b_loop</b> \<Boolean\></dt>
<dd>refinar el loop CDR3 de la cadena beta del TCR<br/>Default: false<br/></dd>
<dt><b>-remodel_tcr_cdr3_loops</b> \<Boolean\></dt>
<dd>remodelar el loop CDR3 de las cadenas alfa y beta del TCR<br/>Default: false<br/></dd>
<dt><b>-refine_tcr_cdr3_loops</b> \<Boolean\></dt>
<dd>refinar el loop CDR3 de las cadenas alfa y beta del TCR<br/>Default: false<br/></dd>
<dt><b>-refine_all_tcr_cdr_loops</b> \<Boolean\></dt>
<dd>refinar los loops CDR1, CDR2 y CDR3 de las cadenas alfa y beta del TCR<br/>Default: false<br/></dd>
<dt><b>-use_user_templates</b> \<Boolean\></dt>
<dd>usar plantillas dadas por el usuario para los segmentos del TCR; útil para pruebas y pruebas de integración<br/>Default: false<br/></dd>
<dt><b>-alpha_framework_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento del marco de la cadena alfa, p. ej. 1kgc_D<br/>Default: ""<br/></dd>
<dt><b>-beta_framework_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento del marco de la cadena beta, p. ej. 1kgc_E<br/>Default: ""<br/></dd>
<dt><b>-alpha_germline_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento germinal de la cadena alfa, p. ej. 1kgc_D<br/>Default: ""<br/></dd>
<dt><b>-beta_germline_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento germinal de la cadena beta, p. ej. 1kgc_E<br/>Default: ""<br/></dd>
<dt><b>-alpha_cdr1_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento CDR1 de la cadena alfa, p. ej. 1kgc_D<br/>Default: ""<br/></dd>
<dt><b>-beta_cdr1_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento CDR1 de la cadena beta, p. ej. 1kgc_E<br/>Default: ""<br/></dd>
<dt><b>-alpha_cdr2_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento CDR2 de la cadena alfa, p. ej. 1kgc_D<br/>Default: ""<br/></dd>
<dt><b>-beta_cdr2_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento CDR2 de la cadena beta, p. ej. 1kgc_E<br/>Default: ""<br/></dd>
<dt><b>-alpha_cdr3_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento CDR3 de la cadena alfa, p. ej. 1kgc_D<br/>Default: ""<br/></dd>
<dt><b>-beta_cdr3_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para el segmento CDR3 de la cadena beta, p. ej. 1kgc_E<br/>Default: ""<br/></dd>
<dt><b>-alpha_orientation_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para la orientación de la cadena alfa; úsalo junto con beta_orientation_template_id, p. ej. 1kgc_D<br/>Default: ""<br/></dd>
<dt><b>-beta_orientation_template_id</b> \<String\></dt>
<dd>ID de PDB de la plantilla con cadena para la orientación de la cadena beta; úsalo junto con -alpha_orientation_template_id, p. ej. 1kgc_E<br/>Default: ""<br/></dd>
<dt><b>-alpha_framework_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento del marco de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-beta_framework_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento del marco de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-alpha_germline_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento germinal de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-beta_germline_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento germinal de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-alpha_cdr1_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento CDR1 de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-beta_cdr1_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento CDR1 de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-alpha_cdr2_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento CDR2 de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-beta_cdr2_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento CDR2 de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-alpha_cdr3_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento CDR3 de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-beta_cdr3_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para el segmento CDR3 de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-alpha_orientation_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para la orientación de la cadena alfa<br/>Default: ""<br/></dd>
<dt><b>-beta_orientation_template_pdb</b> \<String\></dt>
<dd>archivo PDB de plantilla para la orientación de la cadena beta<br/>Default: ""<br/></dd>
<dt><b>-use_alpha_germline_templates</b> \<Boolean\></dt>
<dd>usar plantillas germinales para la cadena alfa; por defecto, las plantillas germinales o de marco se eligen por coincidencia de secuencia<br/>Default: false<br/></dd>
<dt><b>-use_beta_germline_templates</b> \<Boolean\></dt>
<dd>usar plantillas germinales para la cadena beta; por defecto, las plantillas germinales o de marco se eligen por coincidencia de secuencia<br/>Default: false<br/></dd>
<dt><b>-assign_cdr</b> \<Boolean\></dt>
<dd>asignar las posiciones de los CDR usando posiciones dadas por el usuario<br/>Default: false<br/></dd>
<dt><b>-assign_cdr1a</b> \<String\></dt>
<dd>asignar las posiciones de secuencia de cdr1a por los números de residuo inicial y final, p. ej. 23:36<br/>Default: ""<br/></dd>
<dt><b>-assign_cdr2a</b> \<String\></dt>
<dd>asignar las posiciones de secuencia de cdr2a por los números de residuo inicial y final, p. ej. 48:74<br/>Default: ""<br/></dd>
<dt><b>-assign_cdr3a</b> \<String\></dt>
<dd>asignar las posiciones de secuencia de cdr3a por los números de residuo inicial y final, p. ej. 89:103<br/>Default: ""<br/></dd>
<dt><b>-assign_cdr1b</b> \<String\></dt>
<dd>asignar las posiciones de secuencia de cdr1b por los números de residuo inicial y final, p. ej. 23:36<br/>Default: ""<br/></dd>
<dt><b>-assign_cdr2b</b> \<String\></dt>
<dd>asignar las posiciones de secuencia de cdr2b por los números de residuo inicial y final, p. ej. 48:74<br/>Default: ""<br/></dd>
<dt><b>-assign_cdr3b</b> \<String\></dt>
<dd>asignar las posiciones de secuencia de cdr3b por los números de residuo inicial y final, p. ej. 89:103<br/>Default: ""<br/></dd>
<dt><b>-anarci_path</b> \<String\></dt>
<dd>ruta del programa ANARCI para asignar las posiciones de los CDR mediante números aho, p. ej. '/usr/local/bin/anarci' <br/>Default: ""<br/></dd>
</dl>
+ <h2>-threadsc</h2>
<dl>
<dt><b>-threadsc</b> \<Boolean\></dt>
<dd>grupo de opciones threadsc<br/></dd>
<dt><b>-src_chain</b> \<String\></dt>
<dd>Cadena del pdb de origen<br/></dd>
<dt><b>-trg_chain</b> \<String\></dt>
<dd>Cadena del pdb de destino<br/></dd>
<dt><b>-src_first_resid</b> \<Integer\></dt>
<dd>ID del primer residuo del rango en el pdb de origen<br/></dd>
<dt><b>-trg_first_resid</b> \<Integer\></dt>
<dd>ID del primer residuo del rango en el pdb de origen<br/></dd>
<dt><b>-nres</b> \<Integer\></dt>
<dd>Número de residuos que se van a enhebrar (threading)<br/></dd>
<dt><b>-trg_anchor</b> \<Integer\></dt>
<dd>residuo ancla para el threading de la cadena principal<br/></dd>
</dl>
+ <h2>-ufv</h2>
<dl>
<dt><b>-ufv</b> \<Boolean\></dt>
<dd>grupo de opciones ufv<br/></dd>
<dt><b>-left</b> \<Integer\></dt>
<dd>extremo izquierdo<br/></dd>
<dt><b>-right</b> \<Integer\></dt>
<dd>extremo derecho<br/></dd>
<dt><b>-ss</b> \<String\></dt>
<dd>cadena de estructura secundaria<br/></dd>
<dt><b>-aa_during_build</b> \<String\></dt>
<dd>cadena de aminoácidos durante la construcción centroide<br/></dd>
<dt><b>-aa_during_design_refine</b> \<String\></dt>
<dd>cadena de aminoácidos durante el diseño-refinamiento<br/></dd>
<dt><b>-keep_junction_torsions</b> \<Boolean\></dt>
<dd>al reconstruir loops, mantener (aproximadamente) las torsiones originales en las uniones de los extremos del loop<br/>Default: false<br/></dd>
<dt><b>-ufv_loops</b> \<File\></dt>
<dd>usar este archivo de múltiples loops en lugar de especificar opciones de un solo loop en la línea de comandos<br/></dd>
<dt><b>-use_fullmer</b> \<Boolean\></dt>
<dd>usar fragmentos de longitud completa al construir el loop<br/>Default: false<br/></dd>
<dt><b>-centroid_loop_mover</b> \<String\></dt>
<dd>el mover de loop centroide que se usará<br/>Default: "RemodelLoopMover"<br/></dd>
<dt><b>-no_neighborhood_design</b> \<Boolean\></dt>
<dd>solo reempaquetar el entorno del loop, sin diseñar<br/>Default: false<br/></dd>
<dt><b>-dr_cycles</b> \<Integer\></dt>
<dd>ciclos de diseño-refinamiento<br/>Default: 3<br/></dd>
<dt><b>-centroid_sfx</b> \<String\></dt>
<dd>nombre de archivo de la función de puntuación centroide que se usará,<br/></dd>
<dt><b>-centroid_sfx_patch</b> \<String\></dt>
<dd>nombre de archivo del parche de la función de puntuación centroide que se usará,<br/></dd>
<dt><b>-fullatom_sfx</b> \<String\></dt>
<dd>nombre de archivo de la función de puntuación de todos los átomos que se usará<br/></dd>
<dt><b>-fullatom_sfx_patch</b> \<String\></dt>
<dd>nombre de archivo del parche de la función de puntuación de todos los átomos que se usará<br/></dd>
</dl>
+ <h3>-ufv:insert</h3>
<dl>
<dt><b>-insert</b> \<Boolean\></dt>
<dd>grupo de opciones insert<br/></dd>
<dt><b>-insert_pdb</b> \<File\></dt>
<dd>pdb de la estructura de inserción<br/></dd>
<dt><b>-attached_pdb</b> \<File\></dt>
<dd>pdb de la estructura en relación de cuerpo rígido con la estructura de inserción<br/></dd>
<dt><b>-connection_scheme</b> \<String\></dt>
<dd>imponer el tipo de inserción: elige n2c o c2n<br/></dd>
</dl>
+ <h2>-willmatch</h2>
<dl>
<dt><b>-willmatch</b> \<Boolean\></dt>
<dd>grupo de opciones willmatch<br/></dd>
<dt><b>-write_reduced_matchset</b> \<StringVector\></dt>
<dd><name> <pdb1> <pdb2> ...<br/></dd>
<dt><b>-interface_size</b> \<Real\></dt>
<dd>número de CB-CB a menos de 8 Å<br/>Default: 30<br/></dd>
<dt><b>-max_dis_any</b> \<Real\></dt>
<dd><br/>Default: 3.0<br/></dd>
<dt><b>-max_dis_all</b> \<Real\></dt>
<dd><br/>Default: 2.6<br/></dd>
<dt><b>-max_dis_hb</b> \<Real\></dt>
<dd><br/>Default: 3.2<br/></dd>
<dt><b>-min_dis_hb</b> \<Real\></dt>
<dd><br/>Default: 2.2<br/></dd>
<dt><b>-max_dis_hb_colinear</b> \<Real\></dt>
<dd><br/>Default: 0.7<br/></dd>
<dt><b>-max_dis_metal</b> \<Real\></dt>
<dd><br/>Default: 1.0<br/></dd>
<dt><b>-max_ang_metal</b> \<Real\></dt>
<dd><br/>Default: 5.0<br/></dd>
<dt><b>-clash_dis</b> \<Real\></dt>
<dd><br/>Default: 3.5<br/></dd>
<dt><b>-c2_linker_dist</b> \<Real\></dt>
<dd><br/>Default: 3.5<br/></dd>
<dt><b>-identical_match_dis</b> \<Real\></dt>
<dd><br/>Default: 0.0001<br/></dd>
<dt><b>-chi1_increment</b> \<Real\></dt>
<dd><br/>Default: 10.0<br/></dd>
<dt><b>-chi2_increment</b> \<Real\></dt>
<dd><br/>Default: 20.0<br/></dd>
<dt><b>-c2_symm_increment</b> \<Real\></dt>
<dd><br/>Default: 20.0<br/></dd>
<dt><b>-cb_sasa_thresh</b> \<Real\></dt>
<dd><br/>Default: 20.0<br/></dd>
<dt><b>-design_interface</b> \<Boolean\></dt>
<dd><br/>Default: true<br/></dd>
<dt><b>-chilist</b> \<File\></dt>
<dd><br/></dd>
<dt><b>-fixed_res</b> \<File\></dt>
<dd><br/></dd>
<dt><b>-native1</b> \<File\></dt>
<dd><br/></dd>
<dt><b>-native2</b> \<File\></dt>
<dd><br/></dd>
<dt><b>-exclude_res1</b> \<File\></dt>
<dd><br/>Default: ""<br/></dd>
<dt><b>-exclude_res2</b> \<File\></dt>
<dd><br/>Default: ""<br/></dd>
<dt><b>-taglist</b> \<File\></dt>
<dd><br/></dd>
<dt><b>-residues</b> \<IntegerVector\></dt>
<dd><br/></dd>
<dt><b>-symmetry_d2</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-symmetry_c2_dock</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-splitwork</b> \<IntegerVector\></dt>
<dd><br/></dd>
<dt><b>-exclude_ala</b> \<Boolean\></dt>
<dd><br/>Default: false<br/></dd>
<dt><b>-match_overlap_dis</b> \<Real\></dt>
<dd>distancia por debajo de la cual se consideran redundantes las coincidencias<br/>Default: 00.20<br/></dd>
<dt><b>-match_overlap_ang</b> \<Real\></dt>
<dd>ángulo (grados) por debajo del cual se consideran redundantes las coincidencias<br/>Default: 10.00<br/></dd>
<dt><b>-forbid_residues</b> \<IntegerVector\></dt>
<dd>no permitir residuos para el emparejamiento<br/></dd>
<dt><b>-poi</b> \<RealVector\></dt>
<dd>coordenadas xyz de algún sitio de interés<br/></dd>
<dt><b>-poidis</b> \<Real\></dt>
<dd>umbral de distancia del punto de interés (poi)<br/></dd>
<dt><b>-homodimer</b> \<Boolean\></dt>
<dd>examinar solo configuraciones de homodímeros<br/>Default: false<br/></dd>
<dt><b>-fa_dun_thresh</b> \<Real\></dt>
<dd><br/>Default: 6.0<br/></dd>
</dl>
+ <h2>-PDB_diagnostic</h2>
<dl>
<dt><b>-PDB_diagnostic</b> \<Boolean\></dt>
<dd>grupo de opciones PDB_diagnostic<br/></dd>
<dt><b>-reading_only</b> \<Boolean\></dt>
<dd>si es true, no hace nada (solo se prueba la lectura de estructuras). Útil para clústeres no gigantes donde empaquetar un virus/ribosoma agotaría la memoria.<br/>Default: false<br/></dd>
<dt><b>-skip_pack_and_min</b> \<Boolean\></dt>
<dd>Omitir los pasos de empaquetado y minimización (dejando el análisis de puntuación y de ResidueType). Bueno para la velocidad o para pruebas menos profundas.<br/>Default: false<br/></dd>
</dl>
+ <h2>-testing</h2>
<dl>
<dt><b>-testing</b> \<Boolean\></dt>
<dd>grupo de opciones testing<br/></dd>
<dt><b>-HCF</b> \<Boolean\></dt>
<dd>Hace que Rosetta salga de inmediato con un error.<br/>Default: false<br/></dd>
<dt><b>-INTEGRATION_TEST</b> \<Boolean\></dt>
<dd>Meta-opción para opciones de buenas prácticas en las pruebas de integración. No la uses en ejecuciones reales.<br/>Default: false<br/></dd>
</dl>
+ <h2>-solvent_exposure</h2>
<dl>
<dt><b>-solvent_exposure</b> \<Boolean\></dt>
<dd>grupo de opciones solvent_exposure<br/></dd>
<dt><b>-method</b> \<String\></dt>
<dd>Método para calcular el recuento de vecinos: sphere o cone.<br/>Default: "sphere"<br/></dd>
</dl>

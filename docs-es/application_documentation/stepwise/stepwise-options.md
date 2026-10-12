#Clases de opciones de Stepwise

# Estructura de herencia
-----------------------
```
 StepWiseBasicOptions      StepWiseMoveSelectorOptions
     |           |          |
     |           v          v
     |          StepWiseMonteCarloOptions
     v
  StepWiseBasicModelerOptions  StepWiseProteinModelerOptions StepWiseRNA_ModelerOptions
     |                _______________|_______________________________|
     |               |
     v               v
  StepWiseModelerOptions
```
<sub>\*Sí, conozco los posibles problemas de la herencia múltiple, pero creo que aquí se evitan, y la solución alternativa exige acordarse de copiar un número enorme de opciones de una clase a otra.</sub>

### Nota sobre cómo generar un `StepWiseModelerOptions` a partir de `StepWiseMonteCarloOptions`
------------------------------------------------------------------------
Algunos valores por defecto de `StepWiseModelerOptions` son distintos cuando se crea dentro de `StepWiseMonteCarlo` y cuando se necesita para su función original de enumeración en el ensamblaje stepwise (SWA). Para manejarlo, `StepWiseMonteCarloOptions` puede generar el `StepWiseModelerOptions` apropiado mediante la función `setup_modeler_options()`; hay que tener algo de cuidado para que se configuren correctamente.

También hay algunas opciones redundantes entre StepWiseModelerOptions y StepWiseMonteCarloOptions que quizá convendría agrupar en una clase más básica; no es muy difícil de hacer, solo hay que hacerlo con cuidado.


# El surtido actual de opciones
--------------------------------
Lo siguiente es solo un subconjunto de las opciones que técnicamente están *disponibles* para tu uso; esta lista se ha seleccionado según lo que está bien validado. También se han omitido algunas opciones que desempeñaban un papel sobre todo en código heredado o en salidas de depuración adicionales.

  * opciones `-stepwise:`
    * `-stepwise:fixed_res` -- Una selección de residuos, dados como enteros, que no deben moverse durante la minimización
    * `-stepwise:num_random_samples` -- ¿Cuántas muestras aleatorias del proceso StepwiseSampleAndScreen se deben llevar a la minimización? Por defecto es 20.
    * `-stepwise:max_tries_multiplier_for_ccd` -- ¿Por qué factor debe multiplicar stepwise el valor de la opción anterior en los movimientos que requieren cierre de loops con CCD (es decir, en proteínas)? Por defecto es 10.
    * `-stepwise:atr_rep_screen` -- ¿Queremos filtrar las conformaciones generadas para asegurarnos de que las particiones distintas (por ejemplo, los residuos de partida frente a los que se están construyendo) tengan una cantidad mínima de buenas interacciones atractivas pero sin choques? Por defecto true.
    * `-stepwise:atr_rep_screen_for_docking` -- Igual que atr_rep_screen, pero se aplica solo a los movimientos de docking
    * `-stepwise:align_pdb` -- Una estructura que normalmente contiene un subconjunto de la estructura nativa, a la que se restringe el problema de modelado (con restricciones de coordenadas sobre cada átomo, sin penalizar ninguna distancia de hasta `-rmsd_screen`) 
    * `-stepwise:new_align_pdb` -- Similar a la anterior, pero la penalización se basa en el RMSD de todos los átomos respecto de la estructura `-new_align_pdb`, lo que da una penalización que crece de forma mucho más suave y natural. Úsala con `-set_weights alignment 1.0` para activar el término de energía que impone esta restricción.
    * `-stepwise:enumerate` -- Fuerza la enumeración en cada movimiento en lugar de seleccionar `-stepwise:num_random_samples` muestras aleatorias (por defecto false).
    * `-stepwise:preminimize` -- Realiza solo la etapa de preminimización (pensada como una comprobación rápida; por defecto false)
    * `-stepwise:skip_preminimize` -- Omite por completo la preminimización (por defecto false), pero por lo demás continúa la simulación con normalidad
    * `-stepwise:minimize_waters` -- En el modo stepwise que modela explícitamente e hidrata los iones de magnesio presentes, preminimiza las aguas (por defecto false)
    * `-stepwise:test_all_moves` -- Prueba rápidamente todos los movimientos posibles a partir del Pose de partida, recorriendo recursivamente las adiciones (por defecto false)
    * `-stepwise:use_green_packer` -- Por defecto stepwise usa 'pruebas de rotámeros' para empaquetar cadenas laterales o hidrógenos O2'; con esta opción en true, usará un packer
    * `-stepwise:rmsd_screen` -- En presencia de `-align_pdb`, `-new_align_pdb` o `-native`, esta opción controla la rigidez (en Angstroms) de las restricciones de coordenadas de todos los átomos o de una evaluación directa de una función de penalización sobre el RMSD.
    * `-stepwise:skip_minimize` -- Omite la minimización inicial, pero aun así hace el preempaquetado (por defecto false)
    * `-stepwise:superimpose_over_all` -- Superpone sobre todos los residuos (todos los de entrada más todos los construidos); por defecto true
    * `-stepwise:alignment_anchor_res` -- Si pasas `-superimpose_over_all false`, debes dar esta opción: un residuo (como cadena:número de residuo) que define un dominio de entrada sobre el que se debe hacer la superposición.
    * `-stepwise:move` -- Un único movimiento que se ejecutará en el Monte Carlo stepwise. El formato es como 'ADD A:5 BOND_TO_PREVIOUS A:4'
    * `-stepwise:output_minimized_pose_list` -- Genera todos los Poses minimizados después de cada movimiento. Por defecto es true en el código heredado de ensamblaje stepwise, pero false para SWM.
    * `-stepwise:virtualize_free_moieties_in_native` -- Virtualiza los grupos del Pose nativo que no hagan ningún contacto detectable. Esto los omite de los cálculos de RMSD.
    * `-stepwise:lores` -- En lugar de minimizar tras cada movimiento, hace movimientos de inserción de fragmentos con la función de energía de grano grueso. También añade varios pares de bases como submotivos a la SubMotifLibrary. Por defecto false.
    * `-stepwise:definitely_virtualize` -- Especificados por su seqpos entero, residuos concretos del nativo que deben virtualizarse *aunque* hagan contactos. (Esto ayuda a veces a comparar ejecuciones stepwise ligeramente distintas.)

  * opciones `stepwise:monte_carlo:`
    * `-stepwise:monte_carlo:cycles` -- Número de ciclos de Monte Carlo que se realizan (por defecto 50). Las ejecuciones de 'producción' probablemente deban usar 200-2000 según la dificultad del problema. Los problemas muy grandes pueden requerir 5-10000.
    * `-stepwise:monte_carlo:temperature` -- Temperatura de la simulación Monte Carlo (por defecto 1.0).
    * `-stepwise:monte_carlo:skip_deletions` -- Para pruebas, omite cualquier movimiento de eliminación (por defecto false)
    * `-stepwise:monte_carlo:allow_internal_hinge_moves` -- Permite movimientos en los que los residuos internos se muestrean libremente, causando un movimiento de bisagra en toda una cadena (por defecto true).
    * `-stepwise:monte_carlo:allow_internal_local_moves` -- Permite movimientos internos en los que se muestrean residuos y luego se cierran con KIC (por defecto true).
    * `-stepwise:monte_carlo:allow_skip_bulge` -- Permite movimientos que saltan posibles 'residuos en protuberancia' y modelan el residuo siguiente como conectado mediante un salto (por defecto false).
    * `-stepwise:monte_carlo:skip_bulge_frequency` -- La tasa a la que se proponen movimientos de 'saltar protuberancia', como fracción de los movimientos de adición 'normales' (por defecto 0.0)
    * `-stepwise:monte_carlo:from_scratch_frequency` -- Permite modelar dinucleótidos 'libres', creando así un nuevo 'other_pose' (por defecto 0.1).
    * `-stepwise:monte_carlo:allow_split_off` -- Permite separar fragmentos de RNA instanciado en un nuevo 'other_pose' (por defecto true).
    * `-stepwise:monte_carlo:add_proposal_density_factor` -- Aumenta o disminuye por este factor el proposal_density_ratio de los movimientos de adición (por defecto 1.0).
    * `-stepwise:monte_carlo:add_delete_frequency` -- Controla la frecuencia relativa de los movimientos de adición/eliminación frente a los de remuestreo (por defecto 0.5).
    * `-stepwise:monte_carlo:docking_frequency` -- La frecuencia de los movimientos para hacer docking de distintos dominios frente al muestreo de los grados de libertad de plegamiento (intramoleculares) (por defecto 0.2)
    * `-stepwise:monte_carlo:submotif_frequency` -- La frecuencia con la que se añade un 'submotivo', que es esencialmente un segmento ideal de RNA prefabricado cuya adición se puede detectar solo a partir de la secuencia, por ejemplo un UA_handle (por defecto 0.2).
    * `-stepwise:monte_carlo:allow_submotif_split` -- Permite dividir submotivos (de modo que, por ejemplo, se pueda eliminar un residuo y que el otro permanezca). Esto rompe el balance detallado (por defecto false).
    * `-stepwise:monte_carlo:force_submotif_without_intervening_bulge` -- Solo añade submotivos si ambos extremos pueden conectarse en cadena de inmediato (una unión; un punto de corte cerrado); no permite que una protuberancia siga a un residuo (por defecto false).
    * `-stepwise:monte_carlo:use_first_jump_for_submotif` -- Stepwise `-lores` lee un conjunto de saltos para la `SubMotifLibrary`; esta opción garantiza que solo se pueda seleccionar la primera conformación de cada par de bases. Ayuda a obtener más movimientos de submotivos para pares de bases algo menos comunes (por defecto false).
    * `-stepwise:monte_carlo:exclude_submotifs` -- Excluye submotivos concretos de la lista de `database/sampling/rna/submotif/submotifs.txt`; útil si quieres hacer un reto de modelado retrospectivo en el que quieras usar submotivos, pero nada tomado del PDB que estás modelando
    * `-stepwise:monte_carlo:minimize_single_res_frequency` -- Frecuencia con la que se minimiza solo el residuo añadido en lugar de todos los residuos activos para minimización (por defecto 0.0).
    * `-stepwise:monte_carlo:allow_variable_bond_geometry` -- Permite que los ángulos y las distancias de enlace cambien en el 10% de los movimientos (por defecto true, pero solo disponible con el minimizador heredado).
    * `-stepwise:monte_carlo:switch_focus_frequency` -- Frecuencia con la que se cambia qué fragmento de RNA de entrada se está modelando activamente (por defecto 0.5)
    * `-stepwise:monte_carlo:just_min_after_mutation_frequency` -- En los movimientos de mutación, con qué frecuencia se omite el muestreo de DOF (por defecto 0.5)
    * `-stepwise:monte_carlo:local_redock_only` -- El ResampleMover puede cambiar qué residuos, entre dos cadenas unidas por docking, se asignan como compañeros del salto. Esta opción (por defecto true) garantiza que los residuos nuevos estén a menos de 8.0A de los antiguos.
    * `-stepwise:monte_carlo:make_movie` -- Genera el estado de prueba y el aceptado de cada ciclo de Monte Carlo en archivos de salida de 'video' (por defecto false).
    * `-stepwise:monte_carlo:recover_low` -- Genera el modelo de menor energía muestreado, en lugar del último fotograma (por defecto true).
    * `-stepwise:monte_carlo:use_precomputed_library` -- Hace que los movimientos FROM_SCRATCH muestreen conformaciones de dinucleótidos de una biblioteca en disco en lugar de hacerlo explícitamente (por defecto true).
    * `-stepwise:monte_carlo:vary_loop_length_frequency` -- Si tienes un tramo de M 'n' en tu archivo fasta (es decir, estás haciendo diseño sobre M residuos), en teoría quizá aceptes *hasta* M residuos para ese loop. `-vary_loop_length_frequency` permite que estos loops se acorten (por defecto 0.0).
    * `-stepwise:monte_carlo:designing_with_noncanonicals` -- Si 'n' puede significar algo más que cuatro nucleótidos, hay que recorrer un camino de código muy distinto, así que esta posibilidad debe especificarse (hay un universo posible de no canónicos con el que trabajar, fijado en el código). Esto necesita trabajo; idealmente usaríamos aquí el lenguaje de los resfiles.
    * `-stepwise:monte_carlo:checkpointing_frequency` -- Controla con qué frecuencia se generan archivos `.checkpoint`. El valor por defecto (cada 100 ciclos) probablemente baste.
    * `-stepwise:monte_carlo:full_model_constraints` -- Restricciones que solo tienen sentido en el contexto del Pose del modelo completo. El `StepWiseModeler` lee estas restricciones en cada ciclo y las aplica si y solo si el residuo 'ya existe'.
    * opciones `-stepwise:monte_carlo:csa:` (controlan el distribuidor de trabajos especial Conformational Space Annealing y no hacen nada a menos que esté activo)
      * `-stepwise:monte_carlo:csa:csa_bank_size` -- Dar esta opción activa el distribuidor de trabajos CSA y le indica que mantenga un 'banco' de este número de modelos (por defecto 0).
      * `-stepwise:monte_carlo:csa:csa_rmsd` -- Umbral de RMSD por debajo del cual dos `Pose`s se consideran 'el mismo' (de modo que solo se conserva en el banco el ejemplo de menor energía) (por defecto 1.0).
      * `-stepwise:monte_carlo:csa:csa_output_rounds` -- Genera silent files en etapas intermedias (todos los múltiplos enteros de `-csa_bank_size`) (por defecto false). 
      * `-stepwise:monte_carlo:csa:annealing` -- Realiza realmente un annealing de RMSD, según el concepto original de CSA, en lugar de obedecer el `csa_rmsd` fijo. Los artículos originales sugerían usar 10 rondas para pasar de la mitad de la distancia media entre los modelos que llenaron el primer banco a una quinta parte de esa distancia (por defecto false).
            
  * opciones `stepwise:polar_hydrogens:`
    * `stepwise:polar_hydrogens:vary_polar_hydrogen_geometry` -- Optimiza la geometría de enlace de los hidrógenos que forman enlaces de hidrógeno (por defecto false).
    * `stepwise:polar_hydrogens:bond_angle_sd_polar_hydrogen` -- Si la anterior es true, ¿cuál debe ser el mínimo de la restricción para el ángulo del enlace de hidrógeno? (por defecto 60.0).
    * `stepwise:polar_hydrogens:bond_torsion_sd_polar_hydrogen` -- Si la anterior es true, ¿cuál debe ser el mínimo de la restricción para la torsión del enlace de hidrógeno? (por defecto 30.0).
    * `stepwise:polar_hydrogens:fix_lengths` -- No deja que las longitudes de enlace se muevan en absoluto (por defecto false).
    * `stepwise:polar_hydrogens:fix_angles` -- No deja que los ángulos de enlace se muevan en absoluto (por defecto false).
    * `stepwise:polar_hydrogens:fix_torsions` -- No deja que las torsiones de enlace se muevan en absoluto (por defecto false).
    * `stepwise:polar_hydrogens:disallow_pack_polar_hydrogens` -- No empaqueta inicialmente los hidrógenos polares antes de minimizar (por defecto false).
    * `stepwise:polar_hydrogens:disallow_vary_geometry_proton_chi` -- Omite el 2'-OH de las consideraciones anteriores (por defecto false), es decir, hace solo los hidrógenos polares de las bases.

  * opciones `stepwise:protein:`
    * `-stepwise:protein:global_optimize` -- Siempre agrupa/empaqueta/minimiza sobre todos los residuos (por defecto false).
    * `-stepwise:protein:disable_sampling_of_loop_takeoff` -- No muestrea psi del residuo N-terminal ni phi del residuo C-terminal con respecto a un loop de residuos móviles.
    * `-stepwise:protein:n_sample` -- Número de muestras en cada ángulo de torsión de la cadena principal (por defecto 18). Como los movimientos RESAMPLE pueden afectar a varios residuos, poner un valor mucho mayor que 36 lo vuelve explosivamente lento.
    * `-stepwise:protein:cart_min` -- Usa el minimizador cartesiano (si lo haces, se recomienda tener `-set_weights cart_bonded 1.0 ring_close 0.0 pro_close 0.0` en tu línea de comando para tu función de puntuación)
    * `-stepwise:protein:use_packer_instead_of_rotamer_trials` -- Igual que `-use_green_packer` para RNA, esta opción garantiza que las cadenas laterales se empaqueten con un algoritmo de packer propiamente dicho en lugar de pruebas de rotámeros (por defecto false)
    * `-stepwise:protein:expand_loop_takeoff` -- También muestrea un par adicional de residuos a cada lado del loop.
    * `-stepwise:protein:allow_virtual_side_chains` -- En proteínas, SWM permite virtualizar cadenas laterales, ya que estos problemas de loops artificiales suelen producir residuos expuestos muy penalizados. Unas malas puntuaciones por residuo dificultan añadir residuos con energías de referencia razonables. Permitir que las cadenas laterales sean virtuales cuando no hacen ningún contacto ayuda mucho en esto (por defecto true). 

  * opciones `full_model:` (en general tienen que ver con designar residuos concretos del "problema de modelado completo" para que tengan comportamientos especiales; en estos casos especifica todos los residuos como cadena:número de residuo)
    * `-full_model:global_seq_file` -- Un archivo en formato fasta con la 'secuencia global'. Es decir, el problema de modelado objetivo completo puede ser, aun así, un subconjunto extraído de una estructura de RNA mayor, como un ribosoma entero, por velocidad. Pero si quieres calcular la función de partición de la estructura secundaria, quieres usar el RNA monomérico completo. Esto te permite hacerlo.
    * `-full_model:cutpoint_open` -- Residuos que, incluso cuando el modelo esté terminado, serán puntos de corte *abiertos*. Por ejemplo, todos los extremos de cadena tienen esta característica por defecto.
    * `-full_model:cutpoint_closed` -- Residuos que, incluso cuando el modelo esté terminado, serán puntos de corte *cerrados*. Los lugares donde la numeración salta porque un loop se ha cerrado con una longitud más corta que antes pueden tener esta propiedad.
    * `-full_model:cyclize` -- Pares de residuos: el primero es el extremo 3' de una cadena y el segundo es el extremo 5' de esa misma cadena. Se les dan variantes de punto de corte cerrado y se puntúan con los términos de energía de corte de cadena.
    * `-full_model:twoprime` -- Pares de residuos: el primero es cualquier residuo con un 2' OH libre y el segundo es el extremo 5' de alguna cadena. Se les dan variantes de punto de corte cerrado (bueno, esencialmente) y se puntúan con un término de energía análogo al de corte de cadena. 
    * `-full_model:fiveprime_cap` -- Residuos que necesitan una caperuza 5' aplicada con la correspondiente 7-metil guanosina.
    * `-full_model:jump_res` -- Especificación explícita de residuos de buenos sitios para saltos (desplazamientos de cuerpo rígido)
    * `-full_model:disulfide_res` -- Especificación explícita de residuos donde podrían necesitar formarse puentes disulfuro durante la simulación (útil en problemas de modelado de proteínas y péptidos).
    * `-full_model:extra_min_res` -- Residuos (distintos de los que se están construyendo) que deben volver a minimizarse en cada ciclo.
    * `-full_model:extra_min_jump_res` -- Saltos (especificados por los residuos de sus extremos) que deben volver a minimizarse en cada ciclo.
    * `-full_model:root_res` -- Especifica una raíz preferida para tu problema de modelado (solo para pruebas).
    * `-full_model:sample_res` -- Especifica residuos que deben muestrearse. Útil cuando aportas una estructura de partida con residuos que, aun así, te gustaría ver eliminados y remuestreados.
    * `-full_model:calc_rms_res` -- Los residuos sobre los que se debe calcular el RMSD. No se usa mucho fuera de SWA, que normalmente lo sustituye por su propia idea de qué es razonable (según la situación, es "todos los residuos móviles" o se basa en `-superimpose_over_all`)
    * `-full_model:working_res` -- Todos los residuos que se van a construir. Por defecto, son todos los PDB de entrada más todos los sample_res (lo que incluiría también todo lo enumerado en el archivo fasta).
    * `-full_model:motif_mode` -- Garantiza, en problemas de residuos fijos, que el par de bases de cierre de cada hélice sea `-extra_minimize_res` y que el apilamiento esté desactivado para cualquier residuo terminal. Por defecto es false, pero pasar esta opción es un buen punto de partida para una 'ejecución de prueba'; después quizá quieras refinar tu propia selección personalizada de `-extra_minimize_res`, `-terminal_res` y `-block_stack_*_res`.
    * `-full_model:allow_jump_in_numbering` -- No supone un punto de corte cuando los números de residuo no son consecutivos; especialmente útil en escenarios de diseño (por defecto false).
    * opciones `-full_model:rna:`
    * `-full_model:rna:terminal_res` -- Residuos que no pueden apilarse durante el muestreo, en ninguna dirección
    * `-full_model:rna:block_stack_above_res` -- Residuos a los que se añaden átomos especiales 'solo repulsivos' para impedir el apilamiento 'por encima' de la base. El residuo más 3' de una hélice que no hace un apilamiento coaxial podría tener esta variante.
    * `-full_model:rna:block_stack_below_res` -- Residuos a los que se añaden átomos especiales 'solo repulsivos' para impedir el apilamiento 'por debajo' de la base. El residuo más 5' de una hélice que no hace un apilamiento coaxial podría tener esta variante.
    * `-full_model:rna:force_syn_chi_res_list` -- Residuos cuyo chi1 (la torsión glicosídica) debe ser 'syn'. El muestreador simplemente omite las muestras anti.
    * `-full_model:rna:force_anti_chi_res_list` -- Residuos cuyo chi1 (la torsión glicosídica) debe ser 'anti'. El muestreador simplemente omite las muestras syn.
    * `-full_model:rna:force_north_sugar_list` -- Residuos cuyo plegamiento del azúcar se fuerza a 'norte'.
    * `-full_model:rna:force_south_sugar_list` -- Residuos cuyo plegamiento del azúcar se fuerza a 'sur'.
    * `-full_model:rna:bulge_res` -- Residuos que deben convertirse en una 'variante de protuberancia' en lugar de construirse explícitamente.
    * `-full_model:rna:sample_sugar_res` -- Residuos que, a pesar de haberse dado como un fragmento fijo de RNA, tienen azúcares que deben remuestrearse.

---
Vuelve a la [[visión general de StepWise|stepwise-classes-overview]].

##Véase también

* [[Options overview]]: Visión general de las opciones de Rosetta
* [[Stepwise]]: La aplicación StepWise MonteCarlo
* Aplicaciones para el ensamblaje stepwise determinista:
  * [[Ensamblaje stepwise para loops de proteínas|swa-protein-main]]
    * [[Documentación adicional|swa-protein-long-loop]]
  * [[Modelado de loops de RNA con ensamblaje stepwise|swa-rna-loop]]
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta

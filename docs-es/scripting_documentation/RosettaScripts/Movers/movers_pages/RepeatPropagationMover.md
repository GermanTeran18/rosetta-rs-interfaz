# RepeatPropagationMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RepeatPropagationMover

Propaga una proteína X veces

[[include:mover_RepeatPropagationMover_type]]

Opciones generales 
-  numb_repeats : número de repeticiones en el Pose de salida
-  ideal_repeat="false" #copia las longitudes de enlace además de phi/psi/omega

Caso de uso 1: extraer toda la información necesaria de la propia repetición
-  numb_repeats=length
-  extract_repeat_info_from_pose="true"
-  start_pose_numb_repeats="3"

Caso de uso 2: sabes dónde empieza y termina el Pose y tiene alguna secuencia de capuchón
-  first_template_res="51"
-  last_template_res="100"
-  maintain_cap_sequence_only="true"
-  numb_repeats="6"
-  nTerm_cap_size="50" #mantendrá la secuencia de estos 50 residuos
-  cTerm_cap_size="50" #mantendrá la secuencia de estos 50 residuos


Caso de uso 3: una repetición en el Pose original más algo adicional que no se repite
-  name
-  numb_repeats
-  extract_repeat_info_from_pose="true"
-  start_pose_numb_repeats="1"
-  ideal_repeat="false" #copia las longitudes de enlace además de phi/psi/omega
-  start_pose_duplicate_residues="19" #número de residuos adicionales
# SeqprofConsensus
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## SeqprofConsensus

Lee perfiles de secuencia PSSM y, en cada posición, permite solo las identidades que superan cierto umbral en la PSSM. El código menciona compatibilidad con simetría, pero no la he probado.

    <SeqprofConsensus name="(&string)" filename="(''&string)" min_aa_probability="(0.0 &Real)" probability_larger_than_current="(1 &bool)" ignore_pose_profile_length_mismatch="(0 &bool)" convert_scores_to_probabilities="(1&bool)"  keep_native="(0&bool)"/>

SeqprofConsensus también puede operar con las TaskOperations ProteinInterfaceDesign y RestrictToAlignedSegments contenidas en él. En ese caso se pueden establecer tres umbrales distintos: uno para la interfaz de la proteína (donde los residuos se marcan para diseño), uno para RestrictToAlignedSegments (de nuevo, donde los residuos se marcan para diseño) y uno para el resto de la proteína. La idea es que quizá quieras ser menos «consenso» en el sitio activo que lejos de él. Los tres umbrales se establecerían con: conservation\_cutoff\_protein\_interface\_design, conservation\_cutoff\_aligned\_segments y min\_aa\_probability (para el resto de la proteína). Se espera que los subtags ProteinInterfaceDesign y RestrictToAlignedSegments sean subtags de SeqprofConsensus, y todas las opciones disponibles para estas TaskOperations se pueden establecer del mismo modo (no se espera el nombre de la opción y, si lo especificas, se producirá un fallo).

-   filename: de la PSSM. Si no se especifica ninguno, la TaskOperation intentará leer restricciones SequenceProfile directamente del Pose y configurar un perfil basado en ellas. Si no están disponibles, la ejecución terminará.
-   min\_aa\_probability: las probabilidades transformadas con log2 al estilo PSSM. Por ejemplo, establécela en 0 para permitir posiciones favorables, en 2 para permitir solo las muy favorables y en -2 para permitir también identidades ligeramente desfavorables. Las identidades de mayor probabilidad siempre se permiten en el diseño, así que establece valores muy altos (\>10) si quieres que se permitan las identidades de mayor probabilidad.
-   probability\_larger\_than\_current: permite siempre las identidades con probabilidades al menos mayores que la del residuo actual que se ve en el PDB.
-   ignore\_pose\_profile\_length\_mismatch: si se establece en 0, provocará una salida de utilidad si el Pose y el perfil no coinciden.
-   convert\_scores\_to\_probabilities: convierte las puntuaciones de la PSSM (p. ej., -4, +10) en probabilidades en el rango 0-1.
-   keep\_native: Si es verdadero, añade la identidad de aminoácido nativa a las identidades permitidas, independientemente del umbral min\_aa\_probability.

[[include:to_SeqprofConsensus_type]]

##Véase también

* [[FavorSequenceProfileMover]]: un mover que favorece el 
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

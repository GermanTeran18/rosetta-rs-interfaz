# JointSequence
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## JointSequence

    <JointSequence use_current="(true &bool)"  use_native="(false &bool)" filename="(&string)" native="(&string)" use_natro="(false &bool)" 
    use_fasta="(false &bool)" chain="( &integer)" use_chain="(&integer)" />

Prohíbe diseñar hacia identidades de residuo que no se encuentren en esa posición en ninguna de las estructuras listadas:

-   use\_current - Usa las identidades de residuo de la estructura actual (el Pose de entrada de apply() de la TaskOperation).
-   use\_native - Usa las identidades de residuo de la estructura indicada con -in:file:native.
-   filename - Usa las identidades de residuo del archivo indicado.
-   native - Usa las identidades de residuo del archivo indicado.
-   use\_fasta - Usa las identidades de residuo de una secuencia nativa dada por un archivo FASTA (especifica la ruta al archivo FASTA con la opción -in:file:fasta en la línea de comandos).
-   chain - A qué cadena aplicarlo; 0 es todas las cadenas.
-   use\_chain - Dado un PDB de entrada adicional, por ejemplo mediante in:file:native, de qué cadena debe derivarse la secuencia. 0 es todas las cadenas.

Si use\_natro es verdadero, la TaskOperation también añade a la biblioteca de rotámeros los rotámeros de las estructuras nativas (use\_native/native).


##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

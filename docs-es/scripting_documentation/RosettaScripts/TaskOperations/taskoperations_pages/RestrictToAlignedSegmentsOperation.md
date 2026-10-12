# RestrictToAlignedSegments
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## RestrictToAlignedSegments

(Esta es una TaskOperation de desarrollo y no está disponible en las versiones publicadas.)

Restringe el diseño a los segmentos que están alineados con los segmentos de archivos PDB de origen. Los PDB deben haberse alineado previamente. Los residuos de inicio y fin deben estar como máximo a 3A de un residuo del Pose de entrada; de lo contrario, el alineamiento falla (el segmento no se alineará). Los segmentos que no se alineen se restringirán al reempaquetado.

     <RestrictToAlignedSegments name="(&string)" source_pdb="(&string)" start_res="(&string)" stop_res="(&string)" repack_shell="(6.0 &real)">
    <Add source_pdb="(&string)" start_res="(&string)" stop_res="(&string)"/>
    .
    .
    .
    </RestrictToAlignedSegments>

-   source\_pdb: nombre del archivo PDB con el que alinear. Los residuos de inicio y fin se refieren a él. Se pueden añadir tantas líneas como sea necesario, incluso de archivos PDB distintos. Los PDB solo se cargarán si difieren del nombre de archivo PDB de la línea anterior, para ahorrar lecturas de disco.
-   from\_res: residuo de inicio. Se refiere al PDB de origen. Numeración de Rosetta/PDB.
-   stop\_res: residuo de fin. Ídem.
-   repack\_outside: los residuos no especificados por el alineamiento podrán reempaquetarse si es verdadero y no podrán reempaquetarse si es falso.


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

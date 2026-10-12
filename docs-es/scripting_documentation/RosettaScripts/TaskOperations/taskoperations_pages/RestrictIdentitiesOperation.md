# RestrictIdentities
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## RestrictIdentities

Se usa para especificar un conjunto de identidades de aminoácido que se restringen al reempaquetado o a las que se impide reempaquetarse por completo. Es útil si no quieres diseñar, por ejemplo, prolinas y glicinas.

      <RestrictIdentities name="(&string)" identities="(comma-delimited list of strings)" prevent_repacking="(0 &bool)" />

-   identities - Una lista, delimitada por comas, de los tipos de aminoácido que quieres que no se diseñen ni se reempaqueten (p. ej., "PRO,GLY").
-   prevent\_repacking - Si quieres impedir por completo que esas identidades se reempaqueten (pasa verdadero) o solo que se diseñen (pasa falso).


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

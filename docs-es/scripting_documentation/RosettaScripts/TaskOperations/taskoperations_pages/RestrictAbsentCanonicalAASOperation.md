# RestrictAbsentCanonicalAAS
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## RestrictAbsentCanonicalAAS

Restringe el diseño a los residuos especificados por el usuario. Si resnum se deja en 0, la restricción se aplica a todo el Pose.

     <RestrictAbsentCanonicalAAS name="(&string)" resnum="(0 &integer)" keep_aas="(&string)" />

<br/>
*Para un sistema más flexible de especificar posiciones, consulta el [[ResidueSelector|ResidueSelectors]] [[Index|ResidueSelectors#residueselectors_conformation-independent-residue-selectors_residueindexselector]], así como [[OperateOnResidueSubset|OperateOnResidueSubsetOperation]] y [[RestrictAbsentCanonicalAASRLT|Residue Level TaskOperations]].*


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

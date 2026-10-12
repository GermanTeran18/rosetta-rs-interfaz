# ReadResfile
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ReadResfile

Lee un [[resfile|resfiles]]. Si se da un nombre de archivo, lee de ese archivo. En caso contrario, lee el archivo especificado en la línea de comandos con -packing:resfile.

```xml
<ReadResfile name="(&string)" filename="(&string)" selector="(&string)" />
```

Opcionalmente, se puede especificar un [[ResidueSelector|ResidueSelectors]] definido previamente con la opción ```selector=(&string)```. Si se usa, el ResidueSelector funciona como máscara y la TaskOperation ReadResfile se aplica _solo_ a los residuos que selecciona el ResidueSelector, aunque el resfile enumere también otros residuos. Esto puede ser útil junto con ResidueSelectors dependientes de la conformación: un usuario puede, por ejemplo, seleccionar el núcleo de la proteína con el ResidueSelector [[LayerSelector|ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_layerselector]] y luego aplicar un resfile para definir conjuntos distintos de aminoácidos para distintas posiciones de la secuencia lineal, que se aplicarán solo _si_ están en el núcleo. Si no se usa la opción ```selector=(&string)```, la TaskOperation ReadResfile se aplica a todos los residuos definidos en el resfile.


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

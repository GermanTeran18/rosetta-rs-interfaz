# ConservativeDesign
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ConservativeDesign

Una TaskOperation que permite solo mutaciones conservadoras en los residuos diseñables.

###Descripción publicada

Las mutaciones conservadoras de cada tipo de residuo se componen
de las sustituciones de cada residuo que puntúan >= 0 en una
de las matrices BLOSUM (que se usan en los programas fundamentales
de similitud de secuencias de proteínas, PsiBlast y Clustal).
Para el diseño conservador se puede usar cualquier matriz BLOSUM.
Los números de la palabra BLOSUM indican los umbrales de similitud
de secuencia usados para derivar las matrices BLOSUM; los números más altos
corresponden a un conjunto de mutaciones más conservador.
Por defecto se usan las mutaciones conservadoras de la matriz BLOSUM62
para lograr un equilibrio entre variabilidad y conservación.

Artículo: [RosettaAntibodyDesign (RAbD): A general framework for computational antibody design](https://doi.org/10.1371/journal.pcbi.1006112)

###XML

```xml
<ConservativeDesignOperation name="(string)" residue_selector="(string)" data_source=(string,"blosum62") include_native_aa=(bool,"true")/>
```

**residue_selector** - Por defecto, ConservativeDesign trabaja en todos los residuos. Se limitará a una selección de residuos si se proporciona un selector.

**data_source** - Establece la fuente de los datos que definen qué es conservador. Las opciones son: chothia_76 y las matrices Blosum de 30 a 100, designadas como blosum30, 62, etc. El valor por defecto es blosum62. Cuanto mayor es el número, más conservador es el conjunto de mutaciones (los números son umbrales de identidad de secuencia).

**include_native_aa** - Incluye el aminoácido nativo en la lista allowed_aas.

##Véase también

* [[Modelado de loops|loopmodel]]: una aplicación para modelar loops
* [[LoopModelerMover]]: un mover de modelado de loops
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

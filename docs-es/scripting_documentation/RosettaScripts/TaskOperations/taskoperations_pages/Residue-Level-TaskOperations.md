<!-- --- title: Residue Level TaskOperations -->

Residue Level Task Operations
----------------------------
Las Residue Level TaskOperations controlan el packer a nivel de residuo, en combinación con [[ResidueSelectors|ResidueSelectors]].

Úsalas como subtag (sin el nombre) de [[OperateOnResidueSubset|OperateOnResidueSubsetOperation]] (o de la obsoleta [[OperateOnCertainResidues|OperateOnCertainResiduesOperation]]). Solo se puede usar una por cada tag OperateOnResidueSubset/OperateOnCertainResidues.

Las Residue Level TaskOperations también se pueden declarar de forma independiente en su propio tag `<RESIDUE_LEVEL_TASK_OPERATIONS>` y pasarse a [[DesignRestrictions|DesignRestrictionsOperation]].


### [[RestrictToRepackingRLT|rlto_RestrictToRepackingRLT_type]]

Desactiva el diseño en las posiciones seleccionadas.
```xml
<RestrictToRepackingRLT name="(&string;)" />
```

### [[PreventRepackingRLT|rlto_PreventRepackingRLT_type]]

Desactiva el diseño y el reempaquetado en las posiciones seleccionadas.

```xml
<PreventRepackingRLT name="(&string;)" />
```

### [[RestrictAbsentCanonicalAASRLT|rlto_RestrictAbsentCanonicalAASRLT_type]]

No permite diseñar hacia identidades de aminoácido que no estén en la lista (es decir, permite solo las de la lista) en las posiciones seleccionadas.
```xml
<RestrictAbsentCanonicalAASRLT name="(&string;)" aas="(&string)"/>
```
### [[RestrictAbsentCanonicalAASExceptNativeRLT|rlto_RestrictAbsentCanonicalAASExceptNativeRLT_type]]

Salvo el aminoácido nativo, no permite diseñar hacia identidades de aminoácido que no estén en la lista (es decir, permite solo las de la lista más el nativo).

```xml
<RestrictAbsentCanonicalAASExceptNativeRLT name="(&string;)" aas="(&string;)" />
```


### [[AddBehaviorRLT|rlto_AddBehaviorRLT_type]]
Añade el «comportamiento» dado a las posiciones seleccionadas por el ResFilter que lo acompaña.
```xml
<AddBehaviorRLT name="(&string;)"  behavior="(&string)"/>
```

### [[DisallowIfNonnativeRLT|rlto_DisallowIfNonnativeRLT_type]]
Restringe el diseño para que no incluya un residuo como posibilidad de la tarea en una posición, a menos que sea el residuo inicial. 
```xml
<DisallowIfNonnativeRLT name="(&string;)" disallow_aas="(&string;)" />
```

### [[ExtraRotamersGenericRLT|rlto_ExtraRotamersGenericRLT_type]]

Durante el empaquetado se pueden usar rotámeros extra para aumentar el muestreo. Usa esta TaskOperation para especificar de una sola vez, para todos los residuos, qué rotámeros extra se usarán. 

### [[IncludeCurrentRLT|rlto_IncludeCurrentRLT_type]]
Incluye los rotámeros actuales del Pose en el conjunto de rotámeros.
```xml
<IncludeCurrentRLT name="(&string;)" />
```

### [[ExtraChiCutoffRLT|rlto_ExtraChiCutoffRLT_type]]
Se mueve solo hacia un umbral más bajo del número de vecinos a menos de 10A que hace que un residuo se considere enterrado.
```xml
<ExtraChiCutoffRLT name="(&string;)" extrachi_cutoff="(18 &non_negative_integer;)" />
```

### [[PreserveCBetaRLT|rlto_PreserveCBetaRLT_type]]
Preserva el C-beta durante la construcción de rotámeros de los residuos seleccionados. En desarrollo y sin probar. Úsala bajo tu propio riesgo.
```xml
<PreserveCBetaRLT name="(&string;)" />
```


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

# RestrictToSpecifiedBaseResidueTypes
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

 `TaskOperation` que restringe la [[paleta|PackerPalette]] de `ResidueType`s a los `ResidueType`s base indicados.
 
 ## Uso
 ### XML

```
<RestrictToSpecifiedBaseResidueTypes name="(string)" base_types="(string)" selector="(string)" />
```

**base_types** &mdash; Una lista de `ResidueType`s (por su nombre base completo) separados por comas.
**selector** &mdash; Si se proporciona, la `TaskOperation` se aplicará al subconjunto de residuos especificado. Si no se proporciona, la `TaskOperation` se aplicará a todos los residuos del `Pose`.

### C++
El código siguiente se usa para crear un [[PackerTask]] en el que el residuo 2 se limita solo a una alanina o una glicina.
```C++
ResidueIndexSelectorOP selector( make_shared< ResidueIndexSelector >() );
selector->set_index( "2" );

operation::RestrictToSpecifiedBaseResidueTypesOP task_op(
    make_shared< operation::RestrictToSpecifiedBaseResidueTypes >(
    utility::vector1< std::string >( { "ALA", "GLY" } ), selector ) );

TaskFactory tf;
tf.push_back( task_op );

PackerTaskOP task( tf.create_task_and_apply_taskoperations( pose ) );
```

`RestrictToSpecifiedBaseResidueTypes::set_base_types()` &mdash; Pasa un vector de cadenas para establecer la lista de `ResidueType`s base permitidos (por su nombre base completo).
`RestrictToSpecifiedBaseResidueTypes::set_selector()` &mdash; Pasa un `ResidueSelector` para especificar a qué residuo(s) se aplica la lista de `ResidueType`s permitidos. Si no se especifica ningún `ResidueSelector`, Rosetta asume que esta `TaskOperation` se aplica a todos los residuos del `Pose`.

### RosettaScripts

[[include:to_RestrictToSpecifiedBaseResidueTypes_type]]

##Véase también
* [[ProhibitSpecifiedBaseResidueTypes]]
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]

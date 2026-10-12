# RestrictToResidueProperties
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

 `TaskOperation` que restringe la [[paleta|PackerPalette]] de `ResidueType`s a los que tengan las propiedades indicadas.
 
## Uso

### RosettaScripts

[[include:to_RestrictToResidueProperties_type]]

### C++
El código siguiente se usa para crear un [[PackerTask]] en el que el residuo 2 se limita solo a residuos hidrofóbicos.

```c++
ResidueIndexSelectorOP selector( make_shared< ResidueIndexSelector >() );
selector->set_index( "2" );

operation::RestrictToResiduePropertiesOP task_op(
    make_shared< operation::RestrictToResidueProperties >(
    vector1< ResidueProperty >( { HYDROPHOBIC } ), selector ) );

TaskFactory tf;
tf.push_back( task_op );

PackerTaskOP task( tf.create_task_and_apply_taskoperations( pose ) );
```

`RestrictToResidueProperties::set_properties()` &mdash; Pasa un vector de `ResidueProperty`s con los que restringir el diseño.
`RestrictToResidueProperties::set_selector()` &mdash; Pasa un `ResidueSelector` para especificar a qué residuo(s) se aplica la lista de `ResidueProperty`s permitidas. Si no se especifica ningún `ResidueSelector`, Rosetta asume que esta `TaskOperation` se aplica a todos los residuos del `Pose`.

##Véase también
* [[ProhibitResidueProperties]]
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]

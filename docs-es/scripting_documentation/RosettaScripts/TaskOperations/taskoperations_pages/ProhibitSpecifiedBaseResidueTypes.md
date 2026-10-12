# ProhibitSpecifiedBaseResidueTypes
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

 `TaskOperation` que excluye de la [[paleta|PackerPalette]] los `ResidueType`s con las propiedades indicadas.
 
## Uso

### RosettaScripts

[[include:to_ProhibitSpecifiedBaseResidueTypes_type]]

### C++

El código siguiente se usa para crear un [[PackerTask]] en el que se impide que el residuo 2 se diseñe hacia un residuo de histidina.

```c++
ResidueIndexSelectorOP selector( make_shared< ResidueIndexSelector >() );
selector->set_index( "2" );

operation::ProhibitSpecifiedBaseResidueTypesOP task_op(
    make_shared< operation::ProhibitSpecifiedBaseResidueTypes >(
		utility::vector1< std::string >( { "HIS", "HIS_D" } ), selector ) );

TaskFactory tf;
tf.push_back( task_op );

PackerTaskOP task( tf.create_task_and_apply_taskoperations( pose ) );
```

`ProhibitSpecifiedBaseResidueTypes::set_base_types()` &mdash; Pasa un vector de cadenas para establecer la lista de `ResidueType`s base prohibidos (por su nombre base completo).
`ProhibitSpecifiedBaseResidueTypes::set_selector()` &mdash; Pasa un `ResidueSelector` para especificar a qué residuo(s) se aplica la lista de `ResidueType`s prohibidos. Si no se especifica ningún `ResidueSelector`, Rosetta asume que esta `TaskOperation` se aplica a todos los residuos del `Pose`.

##Véase también
* [[RestrictToSpecifiedBaseResidueTypes]]
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]

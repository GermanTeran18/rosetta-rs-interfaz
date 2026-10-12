# ProhibitResidueProperties
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

 `TaskOperation` que impide que la [[paleta|PackerPalette]] de `ResidueType`s use los que tengan alguna de las propiedades indicadas.
 
## Uso
### RosettaScripts

[[include:to_ProhibitResidueProperties_type]]

### C++

El código siguiente se usa para crear un [[PackerTask]] en el que se impide que el residuo 2 use residuos con funcionalidad tiol en la cadena lateral.

```c++
ResidueIndexSelectorOP selector( make_shared< ResidueIndexSelector >() );
selector->set_index( "2" );

operation::ProhibitResiduePropertiesOP task_op(
    make_shared< operation::ProhibitResidueProperties >(
		vector1< ResidueProperty >( { SIDECHAIN_THIOL } ), selector ) );

TaskFactory tf;
tf.push_back( task_op );

PackerTaskOP task( tf.create_task_and_apply_taskoperations( pose ) );
```

`ProhibitResidueProperties::set_properties()` &mdash; Pasa un vector de `ResidueProperty`s con los que restringir el diseño.
`ProhibitResidueProperties::set_selector()` &mdash; Pasa un `ResidueSelector` para especificar a qué residuo(s) se aplica la lista de `ResidueProperty`s prohibidas. Si no se especifica ningún `ResidueSelector`, Rosetta asume que esta `TaskOperation` se aplica a todos los residuos del `Pose`.

##Véase también
* [[RestrictToResidueProperties]]
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]

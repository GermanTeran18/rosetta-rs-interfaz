# AddCompositionConstraintMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AddCompositionConstraintMover

Este mover añade a una Pose una restricción de composición de aminoácidos. Es una restricción de secuencia que aplica el [[término de energía aa_composition|AACompositionEnergy]]. La restricción de composición se configura con un archivo ```.comp```, descrito en la [[documentación del término de energía aa_composition|AACompositionEnergy]], o con una restricción de composición en línea definida mediante subetiquetas `Comp`. Con una subetiqueta `Comp`, las líneas de restricción *pueden* terminar con un `;` para permitir definiciones de una sola línea.

Opcionalmente, este mover también puede asociar un [[ResidueSelector|ResidueSelectors]] a la restricción de composición, que sirve para seleccionar el subconjunto de residuos cuya secuencia se restringirá. Por ejemplo, se podría seleccionar solo el núcleo de una proteína y exigir que no tenga más de un 10% de residuos aromáticos ni más de un 5% de polares.

```xml
<AddCompositionConstraintMover name="(&string)" filename="(&string)" selector="(&string)">
  <Comp entry="(&string)" />
</AddCompositionConstraintMover>
```

Las opciones son:
- **filename** El archivo ```.comp``` que se usa para configurar la restricción de composición. Entrada obligatoria.
- **selector** Un [[ResidueSelector|ResidueSelectors]] definido previamente para seleccionar una subregión de la Pose cuya composición de aminoácidos se restringirá. Si no se indica ninguno, se restringe la composición de aminoácidos de toda la Pose.

Ten en cuenta que pueden aplicarse varios movers de este tipo en secuencia para añadir muchas restricciones de composición a la Pose. Cada uno puede recibir un ResidueSelector distinto y una definición de composición distinta.

##Ejemplo
```xml
<AddCompositionConstraintMover name="comp_constraint" selector="surflayer" >
<Comp entry="PENALTY_DEFINITION; TYPE ASP; FRACTION 0.5; DELTA_START -1;DELTA_END 1;PENALTIES 1 0 1; BEFORE_FUNCTION QUADRATIC;AFTER_FUNCTION QUADRATIC; END_PENALTY_DEFINITION;" />
</AddCompositionConstraintMover>
```

##Véase también

* [[ConstraintSetMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AACompositionEnergy]]
* [[NetChargeEnergy]]
* [[AddNetChargeConstraintMover]]
* [[ClearConstraintsMover]]
* [[ClearCompositionConstraintsMover]]
* [[Mover AddHelixSequenceConstraints|AddHelixSequenceConstraintsMover]]

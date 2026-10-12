# AddNetChargeConstraintMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AddNetChargeConstraintMover

Este mover añade a una Pose una restricción de carga neta. Es una restricción de secuencia que aplica el [[término de energía netcharge|NetChargeEnergy]]. La restricción de composición se configura con un archivo ```.charge```, descrito en la [[documentación del término de energía netcharge|NetChargeEnergy]]. Opcionalmente, este mover también puede asociar un [[ResidueSelector|ResidueSelectors]] a la restricción de carga neta, que sirve para seleccionar el subconjunto de residuos cuya carga neta se restringirá. Por ejemplo, se podría seleccionar solo el bolsillo de unión al ligando de una proteína que une ligandos y exigir que tenga carga neta negativa.

Pueden añadirse varias restricciones de carga neta a la Pose usando varias instancias de `AddNetChargeConstarintMover`. Cada instancia puede recibir un ResidueSelector y/o un archivo ```.charge``` distintos.

```xml
<AddNetChargeConstraintMover name="(&string)" filename="(&string)" selector="(&string)" />
```

Las opciones son:
- **filename** El archivo ```.charge``` que se usa para fijar la carga neta deseada y la función de penalización por desviarse de ella. Entrada obligatoria.
- **selector** Un [[ResidueSelector|ResidueSelectors]] definido previamente para seleccionar una subregión de la Pose cuya carga neta se restringirá. Esta entrada es opcional. Si no se indica ningún [[ResidueSelector|ResidueSelectors]], se restringe la carga neta de toda la Pose.

Las restricciones de secuencia aplicadas con este mover (o con el [[AddcompositionConstraintMover]]) pueden eliminarse de la Pose con el [[ClearConstraintsMover]] (que también elimina las restricciones geométricas) o con el [[ClearCompositionConstraintsMover]] (que elimina todas las restricciones de secuencia, pero ninguna restricción geométrica).

Una última nota: las restricciones de carga neta solo afectan a la puntuación o al empaquetado si el término de energía ```netcharge``` tiene un peso distinto de cero en la función de puntuación que se usa para puntuar o empaquetar; es decir, si usas este mover, asegúrate de reponderar ```netcharge``` con un peso distinto de cero.

##Véase también

* [[ConstraintSetMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AACompositionEnergy]]
* [[AddCompositionConstraintMover]]
* [[NetChargeEnergy]]
* [[ClearConstraintsMover]]
* [[ClearCompositionConstraintsMover]]
* [[Mover AddHelixSequenceConstraints|AddHelixSequenceConstraintsMover]]

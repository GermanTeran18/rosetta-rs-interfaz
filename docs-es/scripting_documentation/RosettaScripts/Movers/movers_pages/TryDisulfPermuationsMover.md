# TryDisulfPermuations
*Volver a la página de [[Mover|Movers-RosettaScripts]].*

Página creada el 8 de enero de 2016 por Vikram K. Mulligan, laboratorio Baker. Escribe a vmullig@uw.edu para cualquier pregunta.
## TryDisulfPermuations
El mover TryDisulfPermutations probará de forma exhaustiva todas las combinaciones de disulfuros entre todos los residuos que pueden formar disulfuros en un Pose (o en un subconjunto de un Pose especificado con un [[ResidueSelector|ResidueSelectors]]). Para cada permutación se realiza un reempaquetado rápido y una minimización de cadenas laterales (reempaquetando y minimizando ÚNICAMENTE los residuos que forman disulfuros) y se devuelve la permutación con la menor energía de disulfuro. (Ten en cuenta que esto podría convertirse fácilmente en un [[MultiplePoseMover]] si hay interés. Contacta con el autor si necesitas esta función.) Este mover está pensado para usarse en el contexto de algoritmos de predicción de estructuras para Poses con dos o más residuos que forman disulfuros.

Ten en cuenta que, a diferencia del mover [[Disulfidize|DisulfidizeMover]], el mover TryDisulfPermutations no coloca ningún residuo nuevo formador de disulfuros. En su lugar, solo considera permutaciones de los residuos formadores de disulfuros existentes. Funciona con todos los tipos formadores de disulfuros y conserva la quiralidad de los residuos D o L.

## Uso típico:
```xml
<MOVERS>
     <TryDisulfPermutations name="trydisulf" consider_already_bonded="false" />
</MOVERS>
```
Lo anterior considerará todas las permutaciones de disulfuros de un Pose, sin tener en cuenta los residuos formadores de disulfuros que ya participan en enlaces disulfuro.

## Opciones completas:

```xml
<TryDisulfPermutations name="(&string)" consider_already_bonded="(true &bool)" min_type="(dfpmin &string)" min_tolerance="(0.00001 &Real)" selector="(&string)">
```
- consider_already_bonded: si es true, se consideran todos los residuos formadores de disulfuros. Si es false, se omiten los que ya participan en enlaces disulfuro.
- min_type: el tipo de minimización que se usa. Consulta [[Minimization overview]] para más detalles.
- min_tolerance: el rigor de la minimización.
- selector: el nombre de un [[ResidueSelector|ResidueSelectors]] definido previamente. Si no se especifica, el mover se aplica a todo el Pose; si se especifica, el mover solo actúa sobre el subconjunto especificado por el ResidueSelector.

##Véase también

* [[Disulfidize|DisulfidizeMover]]: coloca nuevos disulfuros.
* [[I want to do x]]: guía para elegir un mover


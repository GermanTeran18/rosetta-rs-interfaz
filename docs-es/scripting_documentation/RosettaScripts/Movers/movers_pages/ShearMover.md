# Shear
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Shear

Movimientos de torsión de la cadena principal de tipo shear (cizalla) que minimizan la propagación aguas abajo.

```xml
<Shear name="&string"
       residue_selector="('', &string)"
       scorefxn="('', &string)"
       temperature="(0.5 &Real)"
       nmoves="(1 &Integer)"
       angle_max="(6.0 &Real)"
       preserve_detailed_balance="(0 &bool)"/>
```

-   residue\_selector: un [[ResidueSelector|ResidueSelectors]] opcional, definido previamente, que especifica el subconjunto de residuos al que se aplicará el mover. Si no se indica, el mover se aplica a todo el Pose. (Alternativamente, puede usarse un MoveMap; véase más abajo).
-   scorefxn: si se especifica, se usará la función de puntuación dada para evaluar los movimientos. Si no se especifica, se usará el término de puntuación Rama.
-   temperature: qué temperatura de aceptación de MC se usa (solo comprueba la puntuación rama, así que no es un MC completo).
-   nmoves: cuántos movimientos consecutivos se hacen.
-   angle\_max: cuánto se perturba la cadena principal.
-   preserve\_detailed\_balance: si es true, no comprueba el criterio de aceptación de MC y en su lugar siempre acepta.

Este mover también puede recibir un MoveMap opcional (consulta la documentación de [[FastRelax|FastRelaxMover]] para más detalles) para definir el subconjunto de residuos al que se debe aplicar. (Solo se usan los residuos definidos con cadena principal flexible.) Si no hay MoveMap, el mover se aplica a todo el Pose.

Consulta Rohl CA, et al. (2004) [Protein structure prediction using Rosetta.](http://www.sciencedirect.com/science/article/pii/S0076687904830040) Methods Enzymol., 383:66


##Véase también

* [[SmallMover]]
* [[SetTorsionMover]]
* [[I want to do x]]: guía para elegir un mover


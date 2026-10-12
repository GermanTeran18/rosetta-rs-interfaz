# DistanceConstraintGenerator
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Descripción general de DistanceConstraintGenerator

Genera restricciones que intentan imponer una distancia entre residuos. Por defecto se generan restricciones para todos los pares de residuos (r1, r2), donde r1 es un residuo seleccionado por residue_selector1 y r2 es un residuo seleccionado por residue_selector2. Los átomos que se van a restringir se pueden especificar mediante XML.

Las funciones usadas para estas restricciones son configurables por el usuario. Por defecto se usan funciones armónicas. Consulta la documentación de restricciones para más información sobre las funciones.

### Selección de varios residuos

Cada selector de residuos puede seleccionar varios residuos. Si ocurre esto, se generan restricciones ambiguas (Ambiguous) para cada par (r1, r2), donde r1 es seleccionado por residue_selector1 y r2 por residue_selector2. El resultado es que solo se usan las restricciones del par de residuos con mejor puntuación.

Si quieres restringir varias distancias simultáneamente, debes usar un DistanceConstraintGenerator distinto para cada una.

### Advertencias

Para que tengan efecto, el término de energía atom_pair_constraint debe estar activado en la función de puntuación.

## Definición

```
<DistanceConstraintGenerator name=(&string)
    residue_selector1=(&string TrueSelector)
    residue_selector2=(&string TrueSelector)
    atom_name1=(&string "")
    atom_name2=(&string "")
    function=(&string "HARMONIC 11.0 1.0") />
```

* **residue_selector1** - Si se indica, los residuos r1 (véase arriba) provendrán del subconjunto de residuos seleccionado por residue_selector1. Probablemente convenga indicarlo siempre, para evitar que se generen cantidades enormes de restricciones.
* **residue_selector2** - Si se indica, los residuos r2 (véase arriba) provendrán del subconjunto de residuos seleccionado por residue_selector2. Probablemente convenga indicarlo siempre, para evitar que se generen cantidades enormes de restricciones.
* **atom_name1** - (por defecto: nbr_atom()) Permite especificar el nombre del átomo que se usará para las restricciones. Todos los residuos del subconjunto seleccionado por residue_selector1 deben tener un átomo con este nombre.
* **atom_name2** - (por defecto: nbr_atom()) Permite especificar el nombre del átomo que se usará para las restricciones. Todos los residuos del subconjunto seleccionado por residue_selector2 deben tener un átomo con este nombre.
* **function** -- Función que se usará para las restricciones de pares de átomos. Por defecto se usa "HARMONIC 11.0 1.0", que intentará asegurar que la distancia entre un par de átomos restringidos sea de 11.0 A. Debe ajustarse según las necesidades del protocolo.
    
### Ejemplo

Este ejemplo crea restricciones para imponer una distancia de 8.0 con una función armónica de fondo plano, con un ancho de fondo plano de 1.0 ((8-0.5)-(8+0.5)) y una desviación estándar de 1.0 angstroms. Se generarán restricciones para todos los residuos de "H1" hasta el C-terminal (residuo 99). Solo se incluirá en las puntuaciones la restricción con mejor puntuación.

```
<SCOREFXNS>
    <ScoreFunction name="sfxn_beta" weights="beta_nov16_cst">
        <Reweight scoretype="atom_pair_constraint" weight="1.0" />
    </ScoreFunction>
</SCOREFXNS>
<RESIDUE_SELECTORS>
    <Index name="H1" resnums="2-20" />
    <Index name="cterm" resnums="99" />
</RESIDUE_SELECTORS>
<MOVERS>
    <AddConstraints name="add_csts" >
        <DistanceConstraintGenerator name="gen_my_csts"
            residue_selector1="H1"
            residue_selector2="cterm"
            function="FLAT_HARMONIC 8.0 1.0 0.5" />
    </AddConstraints>
    <RemoveConstraints name="rm_csts" constraint_generators="gen_my_csts" />
</MOVERS>
<PROTOCOLS>
    <Add mover="add_csts" />
    <!-- do things with constraints -->
    <Add mover="rm_csts" />
</PROTOCOLS>
```


##Véase también

* [[AddConstraintsMover]]
* [[RemoveConstraintsMover]]
* [[Formato de archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[AddConstraintsToCurrentConformationMover]]


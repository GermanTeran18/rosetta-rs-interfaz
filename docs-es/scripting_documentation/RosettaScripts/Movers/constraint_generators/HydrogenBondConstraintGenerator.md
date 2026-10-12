# HydrogenBondConstraintGenerator
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## HydrogenBondConstraintGenerator

Genera restricciones para intentar imponer puentes de hidrógeno entre átomos de los residuos definidos por los dos selectores de residuos. De forma predeterminada se generan restricciones para todos los pares de residuos (r1, r2), donde r1 es un residuo seleccionado por residue_selector1 y r2 es un residuo seleccionado por residue_selector2; A1 es el átomo pesado de r1 capaz de formar puentes de hidrógeno, P_A1 es el átomo padre de A1, PP_A1 es el padre de P_A1, A2 es el átomo pesado de r2 capaz de formar puentes de hidrógeno, P_A2 es el átomo padre de A2 y PP_A2 es el padre de P_A2 (más abajo se explican las definiciones de átomo padre). Para cada par (A1, A2) se generan las siguientes restricciones:

* Una restricción de par de átomos entre A1 y A2.
* Una restricción de ángulo (angle1) para restringir el ángulo entre P_A1, A1 y A2.
* Una restricción de ángulo (angle2) para restringir el ángulo entre A1, A2 y P_A2.

Las siguientes restricciones diedras solo se generan si interviene un grupo químico plano:
* Una restricción diedra (dihedral1) para restringir el diedro PP_A1, P_A1, A1 y A2 (solo si PP_A1-P_A1-A1 son coplanares, p. ej., si todos están en un anillo de His, en un carboxilato de Asp/Glu, etc.).
* Una restricción diedra (dihedral2) para restringir el diedro A1, A2, P_A2, PP_A2 (solo si A2-P_A2-PP_A2 son coplanares, p. ej., si todos están en un anillo de His, en un carboxilato de Asp/Glu, etc.).

Las funciones que se usan para estas restricciones son configurables por el usuario. De forma predeterminada, se usan funciones armónicas para las restricciones de par de átomos y funciones armónicas circulares para las restricciones de ángulo y diedro. Consulta la documentación de restricciones para obtener más información sobre las funciones.

### Selección de varios residuos

Cada selector de residuos puede seleccionar varios residuos. En ese caso, se generan restricciones ambiguas (Ambiguous) para cada par (r1, r2), donde r1 es seleccionado por residue_selector1 y r2 por residue_selector2. El resultado es que solo se usan las restricciones del par de residuos con mejor puntuación.

Si quieres restringir varios puentes de hidrógeno a la vez, debes usar un HydrogenBondConstraintGenerator distinto para cada uno.

### Selección de varios átomos

También es posible seleccionar varios átomos en cada residuo. En ese caso, se generan restricciones ambiguas para cada par (A1, A2) de cada par (r1, r2), donde r1 es un residuo seleccionado por residue_selector1, r2 es un residuo seleccionado por residue_selector2, A1 es un átomo de r1 capaz de formar puentes de hidrógeno y A2 es un átomo de r2 capaz de formar puentes de hidrógeno. La puntuación resultante solo incluirá el par de átomos del puente de hidrógeno con mejor puntuación. Si quieres restringir varios puentes de hidrógeno a la vez, debes usar un HydrogenBondConstraintGenerator distinto para cada uno.

### Selección del átomo padre

Los átomos que intervienen en las restricciones de ángulo y diedro se indican a continuación:
<table>
<tr>
<td><b>Nombre del residuo</b></td><td><b>A1</b></td><td><b>P_A1</b></td><td><b>PP_A1</b></td>
<td><b>Distancia (1/2)</b></td><td><b>Ángulo</b></td><td><b>Diedros</b></td>
</tr></b>
<tr><td>ARG</td><td>NE</td><td>CZ</td><td>NH1</td><td>1.4</td><td>120.0</td><td>0.0,180.0</td></tr>
<tr><td>ARG</td><td>NH1</td><td>CZ</td><td>NE</td><td>1.4</td><td>120.0</td><td>0.0,180.0</td></tr>
<tr><td>ARG</td><td>NH2</td><td>CZ</td><td>NE</td><td>1.4</td><td>120.0</td><td>0.0,180.0</td></tr>

<tr><td>ASP</td><td>OD1</td><td>CG</td><td>OD2</td><td>1.4</td><td>120.0</td><td>0.0,180.0</td></tr>
<tr><td>ASP</td><td>OD2</td><td>CG</td><td>OD1</td><td>1.4</td><td>120.0</td><td>0.0,180.0</td></tr>

<tr><td>CYS</td><td>SG</td><td>CB</td><td>CA</td><td>2.0</td><td>109.5</td><td>Cualquiera</td></tr>

<tr><td>GLU</td><td>OE1</td><td>CD</td><td>OE2</td><td>1.4</td><td>120.0</td><td>0.0,180.0</td></tr>
<tr><td>GLU</td><td>OE2</td><td>CD</td><td>OE1</td><td>1.4</td><td>120.0</td><td>0.0,180.0</td></tr>

<tr><td>HIS</td><td>ND1</td><td>CE1</td><td>NE2</td><td>1.4</td><td>120.0</td><td>180.0</td></tr>
<tr><td>HIS</td><td>NE2</td><td>CE1</td><td>ND1</td><td>1.4</td><td>120.0</td><td>180.0</td></tr>

<tr><td>LYS</td><td>NZ</td><td>CE</td><td>CD</td><td>1.4</td><td>109.5</td><td>Cualquiera</td></tr>

<tr><td>SER</td><td>OG</td><td>CB</td><td>CA</td><td>1.4</td><td>109.5</td><td>Cualquiera</td></tr>

<tr><td>THR</td><td>OG1</td><td>CB</td><td>CA</td><td>1.4</td><td>109.5</td><td>Cualquiera</td></tr>

<tr><td>TRP</td><td>NE1</td><td>CD1</td><td>CG</td><td>1.4</td><td>120.0</td><td>180.0</td></tr>

<tr><td>TYR</td><td>OH</td><td>CZ</td><td>CE1</td><td>1.4</td><td>109.5</td><td>Cualquiera</td></tr>

</table>

### Advertencias

Para que tengan efecto, los términos de energía atom_pair_constraint, angle_constraint y dihedral_constraint deben estar activados en la función de puntuación.

Por ahora, este ConstraintGenerator solo funciona con aminoácidos canónicos.

## Definición

```xml
<HydrogenBondConstraintGenerator name="(&string)"
    residue_selector1="(&string TrueSelector)"
    residue_selector2="(&string TrueSelector)"
    atoms1="(&string '')"
    atoms2="(&string '')"
    atom_pair_func="(&string 'HARMONIC 2.8 0.5')"
    angle1_func="(&string 'CIRCULARHARMONIC 2.0 0.5')"
    angle2_func="(&string 'CIRCULARHARMONIC 2.0 0.5')"
    atom_definitions="(&string '' )" />
```

* **residue_selector1** - Si se indica, los residuos r1 (véase más arriba) provendrán del subconjunto de residuos seleccionado por residue_selector1. Probablemente convenga indicarlo siempre para evitar que se genere un número enorme de restricciones.
* **residue_selector2** - Si se indica, los residuos r2 (véase más arriba) provendrán del subconjunto de residuos seleccionado por residue_selector2. Probablemente convenga indicarlo siempre para evitar que se genere un número enorme de restricciones.
* **atoms1** - Lista, separada por comas, de nombres de átomos que se considerarán para restringir en cada residuo r1 seleccionado por residue_selector1. Los nombres de átomos que no estén presentes en la Pose no se restringirán; por lo tanto, si se especifica "OD1,OE1" como atoms1, puede usarse tanto para residuos Asp como Glu: OD1 se restringiría en los residuos Asp y OE1 en los residuos Glu.
* **atoms2** - Lista, separada por comas, de nombres de átomos que se considerarán para restringir en cada residuo r2 seleccionado por residue_selector2. Los nombres de átomos que no estén presentes en la Pose no se restringirán (véase "atoms1" más arriba).
* **atom_pair_func** -- Función que se usa para las restricciones de par de átomos. De forma predeterminada se usa "HARMONIC x 0.5", donde x es la distancia ideal A1-A2.
* **angle1_func** - Función que se usa para las restricciones de ángulo. De forma predeterminada se usa "CIRCULARHARMONIC x 0.5", donde x es el ángulo ideal P_A1-A1-A2.
* **angle2_func** - Función que se usa para las restricciones de angle2. De forma predeterminada se usa "CIRCULARHARMONIC x 0.5", donde x es el ángulo ideal A1-A2-P_A2.
* **atom_definitions** - Definiciones de los átomos que se usarán en los puentes de hidrógeno. Solo es necesario para aminoácidos no canónicos. El formato es: NAME3,ATOM1,ATOM2,ATOM3,DIST,ANGLE[,DIHEDRALS]*. Para un puente de hidrógeno con OD1 de ASP, esta línea podría ser:
```
    "ASP,OD1,CG,OD2,1.4,120.0,0.0,180.0"
```
Observa los diedros 'ideales' de 0.0 y 180.0, que indican que los puentes de hidrógeno con ASP deben estar en el plano. Para un puente de hidrógeno con OG de SER, esta línea podría ser:
```
    "SER,OG,CB,CA,1.4,109.5"
```
    
### Ejemplo

Este ejemplo crea restricciones para imponer un puente de hidrógeno entre el átomo NE2 del residuo 6 y el átomo OE1 del residuo 50. La restricción de par de átomos entre estos átomos usa una función personalizada: una función de fondo plano con ancho 0.4 y sd 0.5.

```xml
<RESIDUE_SELECTORS>
    <Index name="his6" resnums="6" />
    <Index name="glu50" resnums="50" />
</RESIDUE_SELECTORS>
<MOVERS>
    <AddConstraints name="add_csts" >
        <HydrogenBondConstraintGenerator name="gen_my_csts"
            residue_selector1="his6"
            residue_selector2="glu50"
            atoms1="NE2"
            atoms2="OE1" 
            atom_pair_func="FLAT_HARMONIC 2.8 0.5 0.4" />
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
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[AddConstraintsToCurrentConformationMover]]

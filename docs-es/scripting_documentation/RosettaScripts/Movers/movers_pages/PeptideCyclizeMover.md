# PeptideCyclizeMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PeptideCyclizeMover
Por Parisa Hosseinzadeh (parisah@uw.edu). Documentación escrita el 20 de septiembre de 2016. Última actualización: 17 de mayo de 2017, por Vikram K. Mulligan (vmullig@uw.edu).

PeptideCyclizeMover es un mover para cerrar un Pose declarando un enlace entre los residuos de interés y aplicando las restricciones de distancia, ángulo y torsión necesarias para mantener el Pose cerrado. 

En su formato por defecto, `PeptideCyclizeMover` cerrará los extremos N y C de un Pose definido por el usuario mediante un enlace peptídico, es decir, cicliza el Pose. Sin embargo, tiene opciones para establecer cualquier tipo de restricción entre dos residuos cualesquiera si el usuario las define.

<b>Caso por defecto</b>

La línea siguiente configura todas las restricciones necesarias para añadir un enlace peptídico entre los dos extremos de la selección. También declara el enlace. 

```xml
<PeptideCyclizeMover name="&string" residue_selector=(&selector_name)/>
```

<b>Opciones más avanzadas</b>

`PeptideCyclizeMover` también ofrece opciones más complejas de restricciones y de declaración de enlaces. El mover usa un formato similar al de los movers [[DeclareBond]], [[CreateDistanceConstraint]], [[CreateAngleConstraint]] y [[CreateTorsionConstraint]]. A continuación hay una lista de las opciones disponibles. Ten en cuenta que puedes añadir tantas de cada opción como necesites. Sin embargo, para cada opción tendrás que definir todos los campos obligatorios. Si no defines ninguna de las opciones, por defecto se ciclizarán el primer y el último residuo del Pose mediante un enlace peptídico y las restricciones asociadas.

<i>Bond</i>

Define el enlace entre atom1 del residuo1 y atom2 del residuo2.

```xml
Bond res1=(&int) res2=(&int) atom1="&string" atom2="&string" add_termini=(&bool) />
```

<i>Distance</i>

atom1 del residuo1 y atom2 del residuo2 deben mantenerse a una distancia definida por cst_func. Una función de restricción es una cadena que define el tipo de restricción, la distancia y la desviación permitida; "HARMONIC 1.32865 0.01" es un ejemplo.

```xml
<Distance res1=(&int) res2=(&int) atom1="&string" atom2="&string" cst_func="&string" />
```

<i>Angle</i>

Define una función de restricción entre los tres átomos dados.

```xml
<Angle res1=(&int) atom1="&string" res_center=(&int) atom_center="&string" res2=(&int) atom2="&string" cst_func="&string" />
```

<i>Torsion</i>

Establece las restricciones de torsión definidas entre los cuatro átomos dados.

```xml
<Torsion res1=(&int) res2=(&int) res3=(&int) res4=(&int) atom1="&string" atom2="&string" atom3="&string" atom4="&string" cst_func="&string" />
```

<i>Ejemplo</i>

El ejemplo siguiente hace básicamente lo mismo que el mover por defecto. Cicliza el Pose (residuo 1 a 10) con un enlace peptídico y establece las restricciones correspondientes:

```xml
<PeptideCyclizeMover name="close" >
    <Torsion res1="10" res2="10" res3="1" res4="1" atom1="CA" atom2="C" atom3="N" atom4="CA" cst_func="CIRCULARHARMONIC 3.141592654 0.005" />
    <Angle res1="10" atom1="CA" res_center="10" atom_center="C" res2="1" atom2="N" cst_func="HARMONIC 2.01000000 0.01" />
    <Angle res1="10" atom1="C" res_center="1" atom_center="N" res2="1" atom2="CA" cst_func="HARMONIC 2.14675498 0.01" />
    <Distance res1="10" res2="1" atom1="C" atom2="N" cst_func="HARMONIC 1.32865 0.01" />
    <Bond res1="10" res2="1" atom1="C" atom2="N" add_termini="true" />
</PeptideCyclizeMover>
```

<b>Consideraciones importantes</b>

`PeptideCyclizeMover` no minimiza el Pose; solo declara un enlace y establece ciertas restricciones. Lo más probable es que necesites relajar tu Pose después de aplicar este mover. Debes hacerlo con una función de puntuación que tenga activados los términos de restricción y con un mover de relax que no reduzca progresivamente las restricciones durante el relax. Ten en cuenta que el enlace químico de Rosetta solo garantiza que no se calculen interacciones de Van der Waals entre los átomos terminales enlazados, pero no impone una buena geometría de enlace de ninguna manera; las restricciones son necesarias para conservar una buena geometría de enlace. Si relajas sin activar los términos de restricción, terminarás con una geometría de enlace distorsionada tras el relax (aunque Rosetta seguirá pensando que los átomos terminales están enlazados).

A continuación hay un XML de ejemplo que cicliza la cadena A de un Pose y hace el relax:

```xml
<ROSETTASCRIPTS>
    <SCOREFXNS>
        <ScoreFunction name="score_cst" weights="talaris2014" >
            <Reweight scoretype="coordinate_constraint" weight="1" />
            <Reweight scoretype="atom_pair_constraint" weight="1" />
            <Reweight scoretype="dihedral_constraint" weight="1" />
            <Reweight scoretype="angle_constraint" weight="1" />
        </ScoreFunction>
    </SCOREFXNS>
    <RESIDUE_SELECTORS>
        <Chain name="chain_a" chains="A"/>
    </RESIDUE_SELECTORS>
    <TASKOPERATIONS>
    </TASKOPERATIONS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <PeptideCyclizeMover name="close" residue_selector="chain_a" />
        <FastRelax name="relax" scorefxn="score_cst" ramp_down_constraints="false" repeats="1" />
    </MOVERS>
    <APPLY_TO_POSE>
    </APPLY_TO_POSE>
    <PROTOCOLS>
        <Add mover="close"/> 
        <Add mover="relax"/>
    </PROTOCOLS>
    <OUTPUT />
</ROSETTASCRIPTS>
```

<b>Distorsión de la geometría de los átomos que dependen del enlace polimérico</b>

Algunos átomos, como el oxígeno carbonilo y el hidrógeno amida, tienen posiciones que dependen de la geometría del enlace polimérico. Durante el relax, estos átomos pueden quedar fuera del plano respecto al resto del enlace. La forma rápida y sencilla de corregirlo es volver a declarar el enlace polimérico entre ellos. Esto no tiene ningún efecto sobre los enlaces covalentes del Pose (ya que el enlace ya estaba presente), pero sí tiene el efecto secundario de actualizar las posiciones de los átomos que dependen del enlace. Aunque la nueva declaración del enlace puede hacerse con PeptideCyclizeMover, eso también añadiría restricciones de enlace adicionales (con lo que se duplicaría la intensidad de esas restricciones). Por tanto, se recomienda usar para este fin el mover [[DeclareBond|DeclareBondMover]]. Por ejemplo, si la cadena A tuviera 20 residuos, de modo que el enlace terminal fuera entre el residuo 20 y el residuo 1, se podría usar el siguiente XML de RosettaScripts:

```xml
<ROSETTASCRIPTS>
    <SCOREFXNS>
        <ScoreFunction name="score_cst" weights="talaris2014" >
            <Reweight scoretype="coordinate_constraint" weight="1" />
            <Reweight scoretype="atom_pair_constraint" weight="1" />
            <Reweight scoretype="dihedral_constraint" weight="1" />
            <Reweight scoretype="angle_constraint" weight="1" />
        </ScoreFunction>
    </SCOREFXNS>
    <RESIDUE_SELECTORS>
        <Chain name="chain_a" chains="A"/>
    </RESIDUE_SELECTORS>
    <TASKOPERATIONS>
    </TASKOPERATIONS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <PeptideCyclizeMover name="close" residue_selector="chain_a" />
        <FastRelax name="relax" scorefxn="score_cst" ramp_down_constraints="false" repeats="1" />
        <DeclareBond name="update_O_and_H" atom1="C" res1="20" atom2="N" res2="1" />
    </MOVERS>
    <APPLY_TO_POSE>
    </APPLY_TO_POSE>
    <PROTOCOLS>
        <Add mover="close"/> 
        <Add mover="relax"/>
        <Add mover="update_O_and_H" />
    </PROTOCOLS>
    <OUTPUT />
</ROSETTASCRIPTS>
```
# Simetría y RosettaScripts

El siguiente conjunto de movers sirve para crear y manipular Poses simétricas dentro de RosettaScripts. Para consultar la documentación completa sobre simetría, consulta la [[guía del usuario de simetría|symmetry]].

Ten en cuenta que las Poses simétricas deben puntuarse con funciones de puntuación simétricas. Consulta la etiqueta 'symmetric' en la documentación de las funciones de puntuación de RosettaScripts.

> **fallo de segmentación (segmentation fault)**
>
> Si te encuentras con un segfault, puede que tengas que añadir una sección \<OUTPUT\> con una función de puntuación simétrica.

```
    ...
    </PROTOCOLS>
    <OUTPUT scorefxn="my_sym_scorefxn"/>
</ROSETTASCRIPTS>
```

## Ejemplo: FastRelax simétrico

El siguiente RosettaScript ejecuta un protocolo similar al fast relax simétrico de Rosetta usando el mover simétrico de empaquetado de rotámeros y el mover simétrico de minimización (ten en cuenta que el mover fastrelax respeta las Poses simétricas; este ejemplo solo sirve para ilustrar los movers simétricos).

```xml
<ROSETTASCRIPTS>
    <TASKOPERATIONS>
        <InitializeFromCommandline name="init"/>
        <RestrictToRepacking name="restrict"/>
        <IncludeCurrent name="keep_curr"/>
    </TASKOPERATIONS>
    <SCOREFXNS>
        <ScoreFunction name="ramp_rep1" weights="score12_full" symmetric="1">
            <Reweight scoretype="fa_rep" weight="0.0088"/>
        </ScoreFunction>
        <ScoreFunction name="ramp_rep2" weights="score12_full" symmetric="1">
            <Reweight scoretype="fa_rep" weight="0.11"/>
        </ScoreFunction>
        <ScoreFunction name="ramp_rep3" weights="score12_full" symmetric="1">
            <Reweight scoretype="fa_rep" weight="0.22"/>
        </ScoreFunction>
        <ScoreFunction name="ramp_rep4" weights="score12_full" symmetric="1"/>
    </SCOREFXNS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <SetupForSymmetry   name="setup_symm" definition="C2.symm"/>
        <SymPackRotamersMover name="repack1" scorefxn="ramp_rep1" task_operations="init,restrict,keep_curr"/>
        <SymPackRotamersMover name="repack2" scorefxn="ramp_rep2" task_operations="init,restrict,keep_curr"/>
        <SymPackRotamersMover name="repack3" scorefxn="ramp_rep3" task_operations="init,restrict,keep_curr"/>
        <SymPackRotamersMover name="repack4" scorefxn="ramp_rep4" task_operations="init,restrict,keep_curr"/>
        <SymMinMover name="min1" scorefxn="ramp_rep1" type="lbfgs_armijo_nonmonotone" tolerance="0.01" bb="1" chi="1" jump="ALL"/>
        <SymMinMover name="min2" scorefxn="ramp_rep2" type="lbfgs_armijo_nonmonotone" tolerance="0.01" bb="1" chi="1" jump="ALL"/>
        <SymMinMover name="min3" scorefxn="ramp_rep3" type="lbfgs_armijo_nonmonotone" tolerance="0.01" bb="1" chi="1" jump="ALL"/>
        <SymMinMover name="min4" scorefxn="ramp_rep4" type="lbfgs_armijo_nonmonotone" tolerance="0.00001" bb="1" chi="1" jump="ALL"/>
        <ParsedProtocol name="ramp_rep_cycle">
            <Add mover="repack1"/>
            <Add mover="min1"/>
            <Add mover="repack2"/>
            <Add mover="min2"/>
            <Add mover="repack3"/>
            <Add mover="min3"/>
            <Add mover="repack4"/>
            <Add mover="min4"/>
        </ParsedProtocol>
        <GenericMonteCarlo name="genericMC" mover_name="ramp_rep_cycle" scorefxn_name="ramp_rep4" temperature="100.0" trials="4"/> 
    </MOVERS>
    <APPLY_TO_POSE>
    </APPLY_TO_POSE>
    <PROTOCOLS>
        <Add mover="setup_symm"/>
        <Add mover="genericMC"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

## Problemas con la simetría y RosettaScripts

En su mayor parte, los movers y filtros sencillos manejan Poses simétricas sin necesidad de modificaciones. Los movers más complejos pueden tener algunos problemas. Para adaptar un mover complejo a la simetría, consulta la sección "How to adopt your protocol to use symmetry" de la "Symmetry User's Guide" en la documentación Doxygen de Rosetta.

Un problema específico de RosettaScripts con los movers analizables y la simetría tiene que ver con la forma de acceder al mapa de funciones de puntuación en parse\_my\_tag. Al obtener una función de puntuación del mapa de datos, el siguiente código NO FUNCIONA CON SIMETRÍA:

```
scorefxn_ = new ScoreFunction( *data.get< ScoreFunction * >( "scorefxns", sfxn_name ));
```

Esto ignora si 'sfxn\_name' es simétrica o no. En su lugar, usa clone para conservar si la función de puntuación es simétrica o no:

```
scorefxn_ = data.get< ScoreFunction * >( "scorefxns", sfxn_name )->clone();
```

Este suele ser el problema cuando un mover da el siguiente error en una Pose simétrica:

```
ERROR: !core::pose::symmetry::is_symmetric( pose )
ERROR:: Exit from: src/core/scoring/ScoreFunction.cc line: 547
```

##Véase también

* [[Symmetry]]: uso de la simetría en Rosetta
* [[SetupForSymmetryMover]]
* [[SetupNCSMover]]
* [[DetectSymmetryMover]]
* [[SymDofMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]

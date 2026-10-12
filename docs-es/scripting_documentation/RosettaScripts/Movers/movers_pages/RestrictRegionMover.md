# RestrictRegion
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RestrictRegion

Hace una mutación en un Pose y crea una tarea de tipo resfile que reempaqueta (sin diseño) el residuo mutado y diseña la región alrededor de la mutación. Los residuos alejados del residuo mutado quedan fijos. El residuo que se va a mutar puede seleccionarse con varias métricas distintas (véase más abajo). Es útil para alterar pequeñas regiones del Pose durante la optimización sin hacer grandes cambios de secuencia.

```xml
<RestrictRegion name="(&string)" type="(&string)" resfile="('' &string)" psipred_cmd="(&string)" blueprint="(&string)" task_operations="(task,task,task)" num_regions="(&int)" scorefxn="()" />
```

-   type: define el método con el que se seleccionan para mutación los residuos entre los residuos diseñables de la fast factory. Los tipos posibles son:
    -   random\_mutation: elige un residuo al azar.
    -   psipred: elige residuos cuya estructura secundaria no concuerda con los cálculos de psipred.
    -   packstat: elige residuos con malas puntuaciones packstat.
    -   score: elige residuos con mala energía por residuo.
    -   random: elige al azar uno de los anteriores.
-   num\_regions: número de mutaciones y de regiones que se diseñan
-   resfile: RestrictRegion crea un resfile con la información adecuada. Este resfile debe ser leído por cualquier mover o filtro que necesite usar la funcionalidad de RestrictRegion. El resfile creado incluirá las restricciones de la task factory que se pasa a RestrictRegion.
-   psipred\_cmd: ruta al ejecutable de psipred. Es obligatorio si el tipo es "psipred"
-   scorefxn: función de puntuación que se usa para determinar las regiones con mala puntuación. Solo se usa si el tipo es "score"
-   task\_operations: task factory que define las posibles mutaciones del Pose.
-   blueprint: ruta al archivo blueprint que contiene información de estructura secundaria. Se usa si el tipo es "psipred"

**Ejemplo**

```xml
<SCOREFXNS>
    <ScoreFunction name="SFXN" weights="ref2015.wts" />
</SCOREFXNS>
<TASKOPERATIONS>
    <ReadResfile name="restrict_resfile" filename="restrict.resfile" />
</TASKOPERATIONS>
<MOVERS>
    <RestrictRegion name="restrict" resfile="restrict.resfile" type="random_mutation" num_regions="1" scorefxn="SFXN" />
    <PackRotamersMover name="design_region" task_operations="restrict_resfile" scorefxn="SFXN" />
</MOVERS>
<PROTOCOLS>
    <Add mover_name="restrict" />
    <Add mover_name="design_region" />
</PROTOCOLS>
```


##Véase también

* [[RandomMutationMover]]
* [[PackRotamersMover]]
* [[RotamerTrialsMover]]
* [[MinPackMover]]
* [[RepackMinimizeMover]]
* [[I want to do x]]: guía para elegir un mover

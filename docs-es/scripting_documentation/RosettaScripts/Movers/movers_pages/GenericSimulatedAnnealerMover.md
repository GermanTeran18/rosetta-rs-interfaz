# GenericSimulatedAnnealer
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## GenericSimulatedAnnealer

Permite encontrar mínimos globales muestreando estructuras con recocido simulado (SimulatedAnnealing). El recocido simulado es, en esencia, un Monte Carlo en el que la temperatura de aceptación empieza alta (permisiva) para permitir encontrar pozos de energía de forma global, y se reduce gradualmente para que la estructura pueda avanzar todo lo posible dentro del pozo de energía. Como GenericMonteCarlo, para los movimientos de Monte Carlo puede usarse cualquier mover y para la evaluación puede usarse cualquier filtro con una función report\_sm funcional. Todas las opciones disponibles en GenericMonteCarlo pueden usarse en GenericSimulatedAnnealer (véase más arriba) y aquí solo se describen las opciones exclusivas de GenericSimulatedAnnealer. Los filtros especificados se aplican secuencialmente en el orden indicado y el movimiento solo se acepta si la Pose supera el criterio de Metropolis en todos los filtros. Consulta la documentación de GenericMonteCarlo para más detalles sobre la aceptación.

El escalado de la temperatura se produce automáticamente. Las temperaturas de todos los filtros se multiplican por un factor de escala que va de 1.0 (al inicio) y se reduce a medida que aumenta el número de aceptaciones. El multiplicador es igual a e\^(-anneal\_step/num\_filters). En cada paso, GenericSimulatedAnnealer lleva la cuenta de las últimas Poses aceptadas (el número de Poses aceptadas que conserva = opción history). Cuando las mejoras en las puntuaciones aceptadas se ralentizan, el recocedor baja la temperatura al siguiente paso.

```xml
<GenericSimulatedAnnealer name="(&string)" mover_name="(&string)" filter_name="(&string)" trials="(10 &integer)" sample_type="(low, &string)" temperature="(0, &Real)" drift="(1 &bool)" recover_low="(1 &bool)" boltz_rank="(0 &bool)" stopping_condition="(FalseFilter &string)" preapply="(1 &bool)" adaptive_movers="(0 &bool)" adaptation_period="(see below &integer)" saved_accept_file_name="('' &string)" saved_trial_file_name="('' &string)" reset_baselines="(1 &bool)" history="(10 &int)" eval_period="(0 &int)" periodic_mover="('' &string)" checkpoint_file="('' &string)" keep_checkpoint_file="(0 &bool)" >
  <Filters>
     <AND filter_name="(&string)" temperature="(&Real)" sample_type="(low, &string)" rank="(0 &bool)"/>
     ...
  </Filters>
</GenericSimulatedAnnealer>
```

-   history: el número de puntuaciones y Poses aceptadas que se usan para determinar cuándo escalar las temperaturas.
-   eval\_period: si se establece, periodic\_mover se ejecutará cada eval\_period trials.
-   checkpoint\_file: guarda el progreso en disco después de cada trial en un archivo con el nombre especificado.
-   keep\_checkpoint\_file: si es true, los archivos de checkpoint creados por SimulatedAnnealer no se limpiarán.
-   periodic\_mover: un mover especificado por el usuario que se ejecuta cada eval\_period trials. Este mover NO es un movimiento de Monte Carlo, no cuenta para el número de trials y sus resultados siempre se aceptan.

**Ejemplo**
 El siguiente ejemplo usa GenericSimulatedAnnealer para rediseñar repetidamente una proteína a fin de optimizar la concordancia entre la predicción de estructura secundaria y la estructura secundaria real sin una pérdida significativa de puntuación. También relaja la estructura cada 50 iteraciones. Aunque este ejemplo rediseña toda la proteína en cada iteración, este tipo de optimización debe restringirse cada vez a pequeñas zonas de la Pose para obtener los mejores resultados (consulta el mover RestrictRegion).

```xml
<FILTERS>
    <SSPrediction name="ss_pred" use_svm="0" cmd="/path/to/runpsipred_single" />
    <ScoreType name="total_score" scorefxn="SFXN" score_type="total_score" threshold="0" confidence="0" />
</FILTERS>
<MOVERS>
    <FastRelax name="relax" />
    <PackRotamersMover name="design" />
    <GenericSimulatedAnnealer name="optimize_pose"
    mover_name="design" trials="500"
    periodic_mover="relax" eval_period="50" history="10" 
    bolz_rank="1" recover_low="1" preapply="0" drift="1" 
    checkpoint_file="mc" keep_checkpoint_file="1"
    filter_name="total_score" temperature="1.5" sample_type="low" > 
        <Filters>
            <AND filter_name="ss_pred" temperature="0.005" />
        </Filters>
    </GenericSimulatedAnnealer>
</MOVERS>
<PROTOCOLS>
    <Add mover_name="optimize_pose" />
</PROTOCOLS>
```


##Véase también

* [[GenericMonteCarloMover]]
* [[RandomMover]]
* [[MonteCarloTestMover]]
* [[MonteCarloUtilMover]]
* [[MonteCarloRecoverMover]]
* [[SubroutineMover]]
* [[LoopOverMover]]
* [[MultiplePoseMover]]
* [[MultipleOutputWrapperMover]]
* [[I want to do x]]: guía para elegir un mover

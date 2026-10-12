# GenericMonteCarlo
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## GenericMonteCarlo

Permite muestrear estructuras mediante Monte Carlo con un mover. La evaluación de la puntuación de la Pose durante el MC la realizan Filtros capaces de ejecutar report\_sm(), no solo ScoreFunctions.
 Puedes elegir cualquiera de los dos formatos:

1) puntuación mediante Filtros

```xml
<GenericMonteCarlo name="(&string)" mover_name="(&string)" filter_name="(&string)" trials="(10 &integer)" sample_type="(low, &string)" temperature="(0, &Real)" drift="(1 &bool)" recover_low="(1 &bool)" boltz_rank="(0 &bool)" stopping_condition="(FalseFilter &string)" preapply="(1 &bool)" adaptive_movers="(0 &bool)" adaptation_period="(see below &integer)" saved_accept_file_name="('' &string)" saved_trial_file_name="('' &string)" reset_baselines="(1 &bool)" progress_file="('' &string)">
  <Filters>
     <AND filter_name="(&string)" temperature="(&Real)" sample_type="(low, &string)" rank="(0 &bool)"/>
     ...
  </Filters>
</GenericMonteCarlo>
```

2) puntuación mediante ScoreFunction

```xml
<GenericMonteCarlo name="(&string)" mover_name="(&string)" scorefxn_name="(&string)" trials="(10 &integer)" sample_type="(low, &string)" temperature="(0, &Real)" drift="(1 &bool)" recover_low="(1 &bool)" stopping_condition="(FalseFilter &string)" preapply="(1 &bool)" saved_accept_file_name="('' &string)" saved_trial_file_name="('' &string)"/>
```

-   *stopping\_condition* : se detiene antes de completar los trials si un filtro se evalúa como true.
-   *sample\_type* : low - muestrea estructuras con puntuaciones más bajas; high - muestrea estructuras con puntuaciones más altas
-   *drift* : true - el estado de la Pose al final de la iteración anterior será el estado inicial de la siguiente iteración; false - el estado de la Pose al inicio de cada iteración se restablece al estado que tenía cuando se llamó al mover por primera vez (por supuesto, esto no es MC).
-   *recover\_low* : true - al final de la aplicación, la Pose se establece en la Pose de menor puntuación (o de mayor puntuación si sample\_type="high"); false - la Pose tras completar apply es la última Pose aceptada
-   *preapply* : true - acepta automáticamente la primera aplicación del submover, ignorando el criterio de Boltzmann. false - aplica la aceptación/rechazo de Boltzmann a todas las aplicaciones del mover. Aunque por razones históricas el valor predeterminado es true, se recomienda encarecidamente ponerlo en false salvo que sepas que necesitas que sea true.
-   adaptive\_movers: si el mover al que llamas, o un submover de ese mover, es de tipo ParsedProtocol con mode single-random, GenericMonteCarlo puede "aprender" la mejor estrategia de muestreo adaptando las probabilidades de aplicación de los movers individuales dentro de ese ParsedProtocol. En cada periodo de adaptación (digamos 20 aplicaciones del mover) se registra el número de aceptaciones de cada submover (con pseudoconteos de 1 para cada mover) y, durante el siguiente periodo de adaptación, las probabilidades de aplicación de los submovers del ParsedProtocol se ajustan en proporción a las probabilidades de aceptación de la etapa anterior. Gracias a los pseudoconteos, todos los movers tienen al menos alguna probabilidad de ser llamados.
-   adaptation\_period: va junto con adaptive\_movers, definido arriba. Por defecto es max( max\_trials/10, 10 ) pero puede ponerse en cualquier entero.
-   saved\_accept\_file\_name: ¿guardar la última estructura aceptada en un PDB temporal? Esto permite la recuperación mediante puntos de control (checkpointing). Ten en cuenta que procesos distintos tendrían que trabajar desde directorios distintos o controlar de algún modo el nombre del archivo de checkpoint; de lo contrario, reinará la confusión.
-   saved\_trial\_file\_name: archivo de checkpoint del número de trial actual. Permite que el mover se recupere tras un fallo.
-   reset\_baselines: si el filtro es de tipo Sigmoid/Operator/CompoundStatement, busca todos los subfiltros de tipo Sigmoid y restablece su línea base a la evaluación actual del filtro de la Pose en trial=1. Es útil cuando quieres fijar los umbrales en relación con la evaluación de la Pose al inicio de la trayectoria de MC.
-   progress\_file: si se especifica, abre un archivo en el que se informa del resultado de cada trial (número de trial, aceptación/rechazo, valor del filtro y secuencia de la Pose). Es útil para monitorizar el progreso del MC.

Pueden definirse varios filtros para un mover de MC. Estos filtros se aplican entonces secuencialmente en el orden indicado y la Pose solo se acepta si supera el criterio de Metropolis en todos los filtros. Esto permite extender el MC a un marco multicriterio en el que se optimiza más de un criterio, por ejemplo, la puntuación total y la energía de unión. Consulta demos/rosetta\_scripts/experimental/computational\_affinity\_maturation\_strategy2 para ver un ejemplo. Se recomienda poner al final los filtros computacionalmente costosos, ya que los filtros posteriores solo se calcularán si todos los filtros anteriores se superan.

Para determinar si un movimiento "supera" el movimiento de Monte Carlo, los valores de cada filtro o función de puntuación se calculan uno por uno. Un movimiento debe ser aceptado por todos los filtros para que se acepte. Un filtro acepta un movimiento si se cumple cualquiera de dos condiciones: 1) la puntuación del filtro mejora respecto de la puntuación del filtro de la última Pose aceptada, o 2) la puntuación del filtro es peor que la puntuación del filtro de la última Pose aceptada, pero la temperatura permite que la puntuación del filtro pase. La probabilidad de pasar en este caso se define como P = e^( -multiplier*(filter_score - filter_score_0) / filter_temperature ), donde multiplier es 1 para los filtros con sample_type="low" y -1 para los filtros con sample_type="high", filter_score es la puntuación del filtro tras el movimiento, filter_score_0 es la puntuación del filtro de la última Pose aceptada, filter_temperature es la temperatura del filtro especificada por el usuario y P es un número real entre 0 y 1 que indica la probabilidad de aceptación. Después, GenericMonteCarloMover genera un número aleatorio con distribución uniforme entre 0 y 1, y el movimiento se acepta si el número aleatorio es menor que P.

En el caso de varios filtros, el filtro que se usará para la puntuación oficial de la Pose (p. ej., para los fines de recover\_low) puede especificarse con el parámetro *rank* (esto no tiene efecto en la aceptación/rechazo del MC). Si ningún subfiltro tiene rank=1, el primer filtro se usa para la clasificación. Como caso especial, si *boltz\_rank* se pone en true, la puntuación de clasificación es una suma ponderada por la temperatura de todos los valores de los filtros. (Este valor equivale al valor efectivo que optimiza el protocolo de MC.) Esta puntuación boltz\_rank se calcula con la ecuación SUM( multiplier * filter_value / filter_temperature ) sobre todos los valores de los filtros, donde filter_value es el valor devuelto por el filtro y multiplier es 1 si el sample_type del filtro es low y -1 si es high.

Opcionalmente puede incluirse una tarea para establecer automáticamente el número de trials de una ejecución de GenericMonteCarlo. Sin una tarea de entrada, el número de trials lo fija el entero de entrada Trials. Si se incluye una tarea, se calculará el número de residuos diseñables y el número de trials se fijará automáticamente como task\_scaling \* (número de residuos diseñables). Por ejemplo, si hay 10 residuos diseñables y task\_scaling es 5 (el valor predeterminado), el número de trials será 50. task\_scaling es 5 por defecto y puede ajustarse en el xml con la opción task\_scaling. Indicar una tarea de entrada anulará cualquier valor fijado con Trials. Esto permite automatizar el proceso con varios archivos de entrada distintos. Indica la tarea igual que en cualquier otro movimiento; consulta la línea de xml de ejemplo más abajo. Ten en cuenta que la tarea de entrada no altera los movers/filtros contenidos en GenericMonteCarlo; solo se usa para calcular el número de residuos diseñables.

```xml
<GenericMonteCarlo name="(&string)" mover_name="(&string)" filter_name="(&string)" trials="(10 &integer)" sample_type="(low, &string)" temperature="(0, &Real)" drift="(1 &bool)" recover_low="(1 &bool)" boltz_rank="(0 &bool)" stopping_condition="(FalseFilter &string)" preapply="(1 &bool)" task_operations="(&string,&string,&string)" task_scaling="(5 &integer)">
```

##Véase también

* [[GenericSimulatedAnnealerMover]]
* [[RandomMover]]
* [[MonteCarloTestMover]]
* [[MonteCarloUtilMover]]
* [[MonteCarloRecoverMover]]
* [[LoopOverMover]]
* [[SubroutineMover]]
* [[MultiplePoseMover]]
* [[MultipleOutputWrapperMover]]
* [[I want to do x]]: guía para elegir un mover

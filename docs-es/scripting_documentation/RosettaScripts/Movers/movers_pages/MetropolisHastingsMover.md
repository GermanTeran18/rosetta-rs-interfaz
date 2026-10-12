# MetropolisHastings
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MetropolisHastings

Este mover realiza [[simulaciones de Monte Carlo Metropolis-Hastings|MetropolisHastings-Documentation]], que sirven para estimar la distribución termodinámica de los estados conformacionales para una función de puntuación, una temperatura y un conjunto de movers subyacentes dados. Consulta la página dedicada [[Documentación de MetropolisHastings|MetropolisHastings-Documentation]] para más información.

```xml
<MetropolisHastings name="(&string)" scorefxn="(score12 &string)" temperature="(0.6 &Real)" trials="(1000 &Size)">
  ...
</MetropolisHastings>
```

El mover MetropolisHastings usa submovers para realizar los movimientos de prueba y, opcionalmente, registrar estadísticas de la simulación después de cada prueba. Se pueden indicar de dos maneras:

1.  Definiendo los movers dentro de MetropolisHastings:

    ```
    <MetropolisHastings ...>
      <Backrub sampling_weight=(1 &Real) .../>
    </MetropolisHastings>
    ```

2.  Haciendo referencia a movers definidos previamente:

    ```
    <Backrub name=backrub .../>
    <MetropolisHastings ...>
      <Add mover_name=backrub sampling_weight=(1 &Real)/>
    </MetropolisHastings>
    ```

En ambos casos, la probabilidad de que se elija un submover concreto durante la simulación se puede controlar con el parámetro sampling\_weight. Los pesos de muestreo de todos los movers se normalizan automáticamente a 1. Los submovers usados con MetropolisHastings deben ser subclases de ThermodynamicMover.

Además de los movers de prueba, también puedes indicar un mover especializado que cambie la temperatura o la función de puntuación durante la simulación. Este tipo de mover se llama TemperatureController. Por último, también se pueden usar movers adicionales que solo registran estadísticas de la simulación después de cada movimiento de prueba, conocidos como módulos ThermodynamicObserver.

Tanto los módulos TemperatureController como los ThermodynamicObserver se pueden indicar de las mismas dos maneras que los movers de prueba, sin el sampling\_weight, por ejemplo:

```xml
<MetropolisHastings ...>
  <Backrub sampling_weight="(1 &Real)" .../>
  <SimulatedTempering temp_low="(0.6 &Real)" .../>
  <PDBTrajectoryRecorder stride="(100 &Size)" filename="(traj.pdb &string)"/>
  <MetricRecorder stride="(100 &Size)" filename="(metrics.txt &string)">
    <Torsion rsd="(&string)" type="(&string)" torsion="(&Size)" name="('' &string)"/>
  </MetricRecorder>
</MetropolisHastings>
```


##Véase también

* [[MetropolisHastings Documentation]]: página principal de la documentación del protocolo MetropolisHastings
* [[I want to do x]]: guía para elegir un mover

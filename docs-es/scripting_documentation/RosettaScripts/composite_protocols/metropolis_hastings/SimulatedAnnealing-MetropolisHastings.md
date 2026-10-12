<!-- --- title: Simulatedannealing (Metropolishastings) -->Esto no está implementado, pero sería bastante sencillo de hacer. En initialize\_simulation() hay que consultar el número de ciclos y cambiar la temperatura en "temperature\_move()" según el calendario preestablecido. Habría que encontrar un buen formato de entrada para el calendario, p. ej.:

simulated\_annealing.schedule:

    progress temp
    0 3
    0.5 1
    1 0.6 

enfriamiento rápido de 3-\>1 durante la primera mitad de la simulación; enfriamiento lento de 1-\>0.6 durante la segunda mitad.

Se podría tener una sintaxis de RosettaScripts para especificar objetivos de temperatura que luego se convertirían en un calendario. Me imagino lo siguiente:

```xml
<TemperatureTarget temperature="(Real)" progress_frac="(Real)" interpolation="(linear" or exponential)>
```

Lo anterior podría especificarse en XML así:

```xml
     <MetropolisHastingsMover temperature="3">
       <SimulatedAnnealing>
         <TemperatureTarget temp="1" progress_frac="0.5"/>
         <TemperatureTarget temp="0.6" progress_frac="1"/>
       </SimulatedAnnealing>
     </MetropolisHastingsMover>
```

Si no se da ningún TemperatureTarget para progress\_frac 0, se usa la temperatura inicial del MetropolisHastingsMover. El momento objetivo se podría especificar como número de intentos (peligroso) o como fracción del total de intentos (mejor). La interpolación entre la temperatura anterior y la temperatura objetivo podría ser lineal o exponencial.

#Documentación de MetropolisHastings

[[Volver a RosettaScripts|RosettaScripts]]

### MetropolisHastings (visión general)

El mover Metropolis-Hastings es el núcleo del marco de muestreo canónico de Rosetta. Una llamada a apply de este mover realiza una trayectoria de una simulación de Monte Carlo (canónica). Esto se puede usar para estimar la distribución termodinámica de estados conformacionales para una función de puntuación dada. Consulta [la página del algoritmo de Metropolis–Hastings en Wikipedia](http://en.wikipedia.org/wiki/Metropolis–Hastings_algorithm) para más información.

#### ThermodynamicMovers

El conjunto de movimientos de la simulación de Monte Carlo se define añadiendo instancias de varios ThermodynamicMovers (un caso especial del Mover general) al MetropolisHastingsMover antes de que empiece la simulación. La probabilidad de que se elija un movimiento dado durante la simulación se puede controlar con el parámetro sampling\_weight. Los pesos de muestreo de todos los movers se normalizan automáticamente a 1. Los ThermodynamicMovers especifican comportamientos adicionales respecto de los movers normales:

-   Los movers deben tener una opción para obedecer el balance detallado, que MetropolisHastings activa automáticamente al añadirlos.
-   Los movers deben devolver la razón entre la probabilidad de hacer el movimiento previo y la de revertirlo.
-   Los movers pueden tener funciones de inicialización y finalización, que se llaman antes y después del bucle de Monte Carlo.
-   Los movers pueden tener una función de devolución de llamada (callback) que se usa para recopilar estadísticas de rendimiento después de evaluar el criterio de Metropolis.
-   Los movers de múltiples intentos, que tienen un bucle de Monte Carlo interno con una función de puntuación y una temperatura potencialmente distintas, deben devolver el cambio total de la función de puntuación interna durante el movimiento dividido por la temperatura interna.

Solo un subconjunto limitado de movers cumple actualmente estos requisitos y son subclases de ThermodynamicMover. Incluyen:

-   [[Small|Movers-RosettaScripts#Small]]
-   [[Shear|Movers-RosettaScripts#Shear]]
-   [[Backrub|Movers-RosettaScripts#Backrub]]
-   BackrubSidechain (experimental)
-   [[Sidechain|Movers-RosettaScripts#Sidechain]]
-   [[SidechainMC|Movers-RosettaScripts#SidechainMC]] (un mover de múltiples intentos)

#### TemperatureControllers

Un conjunto de plug-ins (TemperatureController) permite acceder a varios tipos de esquemas de muestreo:

-   [[SimulatedAnnealing|SimulatedAnnealing-MetropolisHastings]] --- (no implementado) permite variar la temperatura durante la trayectoria siguiendo un calendario preestablecido
-   [[Tempering|Tempering-MetropolisHastings]]
    -   [[SimulatedTempering|Tempering-MetropolisHastings#SimulatedTempering]] --- cambio estocástico de temperaturas en una trayectoria serial [\[1\]](http://arxiv.org/abs/hep-lat/9205018)
    -   [[ParallelTempering|Tempering-MetropolisHastings#ParallelTempering]] --- (también llamado intercambio de réplicas) cambio de temperaturas entre réplicas paralelas [\[2\]](http://en.wikipedia.org/wiki/Parallel_tempering)
    -   [[HamiltonianExchange|Tempering-MetropolisHastings#HamiltonianExchange]] --- (se implementará pronto) cambio de pesos de puntuación y temperatura entre réplicas paralelas

#### ThermodynamicObservers

Los ThermodynamicObservers son plug-ins que permiten registrar trayectorias y otras estadísticas a lo largo de una simulación. Los ThermodynamicObservers son subclases de Mover y tienen un subconjunto de los comportamientos adicionales:

-   Los movers pueden tener funciones de inicialización y finalización, que se llaman antes y después del bucle de Monte Carlo.
-   Los movers pueden tener una función de devolución de llamada (callback) que se usa para recopilar estadísticas de rendimiento después de evaluar el criterio de Metropolis.

Hay varios ThermodynamicObservers:

-   [[TrajectoryRecorder|Movers-RosettaScripts#PDBTrajectoryRecorder]] --- escribe instantáneas en un archivo
    -   [[PDBTrajectoryRecorder|Movers-RosettaScripts#PDBTrajectoryRecorder]] --- escribe instantáneas en un archivo PDB de varios modelos
    -   [[SilentTrajectoryRecorder|Movers-RosettaScripts#SilentTrajectoryRecorder]] --- escribe instantáneas con el distribuidor de trabajos

-   [[MetricRecorder|Movers-RosettaScripts#MetricRecorder]] -- registra ángulos de torsión seleccionados (actualmente) y otras características numéricas (en el futuro) en un archivo de texto delimitado por tabuladores
-   [[TrialCounterObserver]] --- observa las tasas de aceptación de varios movimientos a distintas temperaturas


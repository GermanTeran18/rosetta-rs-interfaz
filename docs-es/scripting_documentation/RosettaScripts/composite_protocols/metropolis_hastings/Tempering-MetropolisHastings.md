<!-- --- title: Tempering (Metropolishastings) -->El módulo de tempering admite simulaciones de Monte Carlo en las que no solo la conformación x, sino también la temperatura o los pesos de puntuación, se convierten en variables dinámicas que se pueden muestrear. En las simulaciones de intercambio de réplicas, por ejemplo, se muestrean varios niveles de temperatura predefinidos. Con una frecuencia predefinida se intenta un intercambio de temperatura entre simulaciones a distintas temperaturas. Al usar un criterio de Metropolis generalizado para decidir si un intento de intercambio de temperatura tiene éxito, se garantiza que la distribución estacionaria en cada nivel de temperatura siga siendo la distribución de Boltzmann, de forma similar a una simulación de Monte Carlo de Metropolis a una sola temperatura (consulta [Parallel Tempering](http://en.wikipedia.org/wiki/Parallel_tempering) ).

-   Parallel Tempering ( intercambio de réplicas ): varios procesos (réplicas), cada uno a un nivel de temperatura
-   SimulatedTempering: un solo proceso que cambia estocásticamente entre niveles de temperatura
-   Hamiltonian Exchange: varios procesos -- es posible cambiar la temperatura y los pesos de puntuación

SimulatedTempering tiene la ventaja de que no requiere comunicación entre procesos y, por tanto, se puede ejecutar en sistemas de cómputo distribuido. Sin embargo, requiere pesos para lograr un muestreo uniforme de todos los niveles de temperatura. Identificar los pesos óptimos puede ser difícil [\[1\]](http://link.aps.org/doi/10.1103/PhysRevE.76.016703) .

Opciones comunes de todos los módulos de tempering
---------------------------------------

Muchas opciones se comparten entre todos los módulos de tempering. Se puede acceder a las opciones desde la línea de comandos o como tags en RosettaScripts (nota para desarrolladores: requiere registrar ClassName::register\_options() al principio de la aplicación). La configuración de los niveles y el rango de temperatura y de las funciones de puntuación se puede controlar hasta cierto punto mediante opciones, o se puede proporcionar directamente en un archivo de entrada. Un archivo de entrada siempre anulará cualquier elección hecha mediante las opciones.

|Opción|Tag|Tipo|Explicación|
|:-----|:--|:---|:----------|
|tempering:stride|temp\_stride|Int|frecuencia de intento de cambio de temperatura|
|tempering:temp:file|temp\_file|File|archivo de configuración --- definición de los niveles de temperatura y/o funciones de puntuación; pesos para simulated tempering|
|tempering:temp:levels|temp\_levels|Int|cuántos niveles/réplicas distintos|
|tempering:temp:range|temp\_range|Real Real|temperatura mínima y máxima|
|tempering:temp:low|temp\_low|Real|temperatura mínima|
|tempering:temp:high|temp\_high|Real|temperatura máxima|
|\<none\>|temp\_interpolation|string/enum|tipo de interpolación entre las temperaturas baja y alta: "linear" o "exponential"|
|tempering:stats:file|stats\_file|File|nombre de archivo (sufijo) para la salida de las estadísticas de tempering|
|tempering:stats:line\_output|stats\_line\_output|Bool|escribe la información estadística en una sola línea por trabajo|
|tempering:stats:silent|stats\_silent\_output|Bool|escribe las estadísticas de todos los trabajos en un solo archivo (usa el modo line\_output)|

Comentario durante el desarrollo: ¿deberíamos quitar el prefijo temp\_ y la parte ::temp:: de la opción?

SimulatedTempering
------------------

Algunas opciones adicionales para controlar la reponderación. Para lograr un muestreo uniforme en el espacio de temperaturas se pueden elegir pesos. Para mejorar la uniformidad a lo largo del tiempo, contamos los pasos muestreados en cada nivel de temperatura y actualizamos los pesos tras cierto intervalo (reweights\_stride) o tras cada trabajo.

|Opción|Tag|Tipo|Explicación|
|:-----|:--|:---|:----------|
|tempering:temp:offset|temp\_offset|Real|desplazamiento de la puntuación (escala efectivamente todos los pesos)|
|tempering:reweight:stride|reweight\_stride|Int|cuántos intentos entre reponderaciones automáticas - 0 para una vez por trabajo|
|tempering:temp:jump|jump|Bool|salta a cualquier temperatura, no solo a +/- 1 nivel|

ParallelTempering
-----------------

Este módulo solo usa las opciones comunes descritas arriba. Sin embargo, hay varios otros requisitos externos. ParallelTempering usa una compilación especializada de Rosetta con MPI (interfaz de paso de mensajes). Varios parámetros relacionados deben especificarse de forma coherente entre sí:

-   el número de procesadores especificado mediante la interfaz MPI (normalmente con el parámetro de línea de comandos `    miprun -np   `)
-   el número de réplicas dado a Rosetta mediante la línea de comandos (con el parámetro de línea de comandos `    -run:n_replica   `)
-   el número de niveles de temperatura (con el parámetro `    temp_levels   ` de RosettaScripts o el parámetro de línea de comandos `    -tempering:temp:levels   `)

El número de réplicas y el número de niveles de temperatura deben ser siempre idénticos. Para coordinar el inicio de los trabajos individuales y recoger su salida, se necesitan dos procesadores además de los que se usan para ejecutar las réplicas individuales.

Si se especifican varios archivos de entrada (con los parámetros de línea de comandos `   -in:file:s  ` o `   -in:file:l  `) y/o se piden varias estructuras de salida (con el parámetro de línea de comandos `   -out:nstruct  `), es posible ejecutar simulaciones de intercambio de réplicas separadas en paralelo con la misma invocación de Rosetta. Dados T niveles de temperatura y S simulaciones de intercambio de réplicas simultáneas, el número de procesadores (P) necesario se calcula así: P = 2+T\*S.

Un ejemplo de línea de comandos para invocar un único RosettaScript de intercambio de réplicas con 8 niveles de temperatura es el siguiente:

    mpirun -np 10 rosetta_scripts.mpi.<platform><compiler>release -database Rosetta/main/database -parser:protocol metropolis_hastings.xml -in:file:s structure.pdb -run:n_replica 8

En este caso, `   metropolis_hastings.xml  ` necesitaría contener lo siguiente:

```xml
<ROSETTASCRIPTS>
  ...
  <MOVERS>
    <MetropolisHastings ...>
      <ParallelTempering temp_levels="8" .../>
      ...
    </MetropolisHastings>
  </MOVERS>
  ...
</ROSETTASCRIPTS>
```

En su lugar, se podrían ejecutar dos simulaciones independientes simultáneas a partir de la misma estructura cambiando `   -np 10  ` por `   -np 18  ` y añadiendo `   -out:nstruct 2  ` al final de la línea de comandos.

Al final de la simulación, ParallelTempering da información útil para determinar el muestreo y la eficiencia computacional. El proceso maestro de una simulación dada (aquí la 2) muestra las frecuencias de intercambio de temperatura; en este ejemplo, una simulación con 4 niveles de temperatura de 2.4 a 4.8:

```
protocols.canonical_sampling.ParallelTempering: (2) Temperature Exchange Frequencies:
protocols.canonical_sampling.ParallelTempering: (2) 2.400 <-> 3.024: 0.346 (173 of 500)
protocols.canonical_sampling.ParallelTempering: (2) 3.024 <-> 3.810: 0.260 (130 of 500)
protocols.canonical_sampling.ParallelTempering: (2) 3.810 <-> 4.800: 0.326 (163 of 500)
```

El número total de intentos de intercambio para un par dado de temperaturas será la mitad de lo que cabría esperar del parámetro `   stride  `, porque solo se intenta intercambiar un par de temperaturas dado una de cada dos veces. La primera vez que se intercambian temperaturas, los pares usados son 1\<-\>2, 3\<-\>4, etc. La segunda vez, los pares usados son 2\<-\>3, 4\<-\>5, etc. La tercera vez es igual que la primera, y así sucesivamente.

Otro dato que da cada proceso es el tiempo que espera a que otros procesos terminen antes de que se pueda completar el intercambio de temperatura. Por ejemplo:

```
protocols.canonical_sampling.ParallelTempering: (5) Spent 6.45519% time waiting for MPI temperature exchange (11.6047 seconds out of 179.773 total)
protocols.canonical_sampling.ParallelTempering: (2) Spent 6.54907% time waiting for MPI temperature exchange (11.7734 seconds out of 179.772 total)
protocols.canonical_sampling.ParallelTempering: (3) Spent 7.05215% time waiting for MPI temperature exchange (12.6739 seconds out of 179.716 total)
protocols.canonical_sampling.ParallelTempering: (4) Spent 8.22242% time waiting for MPI temperature exchange (14.7771 seconds out of 179.717 total)
```

Esto puede ser útil para determinar cuánto tiempo de CPU se desperdicia porque las réplicas tardan tiempos distintos en ejecutar los intentos de Monte Carlo de `   stride  ` entre intercambios. Como con toda salida relacionada con MPI, los resultados pueden aparecer desordenados, como se muestra arriba.

HamiltonianExchange
-------------------

El módulo HamiltonianExchange permite cambiar entre distintas funciones de puntuación y también entre temperaturas. Se intentarán cambios entre niveles vecinos. A diferencia del intercambio de réplicas por temperatura, donde un orden unidimensional claro es natural, los cambios entre distintas funciones de puntuación pueden ser multidimensionales. Para tenerlo en cuenta, el usuario puede definir una cuadrícula multidimensional. Cada nivel hamiltoniano se asigna a una celda de la cuadrícula, y los intentos de intercambio se hacen entre celdas vecinas.

*PENDIENTE: como hamiltonianos distintos (con términos de función de puntuación distintos) pueden requerir tiempos muy distintos por paso de tiempo, deberíamos permitir que el tempering-stride se establezca de forma independiente para cada nivel de temperatura.*

#### Formato del archivo de configuración

El archivo de configuración (opción común: temp\_file) controla la configuración completa de los hamiltonianos. En lugar de un archivo, la configuración también se puede ensamblar directamente en el archivo xml (aún no implementado). El archivo tiene el formato siguiente:

    [ GRID_DIM d ]
    [ GLOBAL_PATCH patch 
    [ GLOBAL_PATCH patch2 [..] ]]
    cell-coord temp score:weights score:patch/NOPATCH score_type op wt [...] ETABLE FA_STANDARD 

-   la línea de encabezado "GRID\_DIM" se puede omitir (por defecto 1).
-   las líneas de encabezado "GLOBAL\_PATCH" se pueden omitir. Cada parche definido aquí se aplicará a todas las funciones de puntuación.
-   score:weights especifica un archivo score.wts de la base de datos o local.
-   score:patch especifica el nombre de un archivo de parche (de la base de datos o local).
-   score\_type op wt: es un parche en línea con el operador (op) "\*=" o "=" y un número real wt
-   NOPATCH es un marcador de posición para el caso en que no deba aplicarse ningún parche de archivo pero sigan parches «en línea» o entradas ETABLE
-   ETABLE: permite cargar una etable específica (p. ej., FA\_STANDARD\_SOFT)
-   Nota: los huecos en las coordenadas de celda no importan. Es decir, 1 2 5 6 crea 4 niveles con intercambios 1\<-\>2, 2\<-\>5 y 5\<-\>6.

Ejemplo 1: 1 dimensión, 3 celdas (niveles). Intercambio entre distintas temperaturas y entre duro\<-\>blando

    1 0.6 score12
    2 0.6 score12 NOPATCH ETABLE FA_STANDARD_SOFT
    3 1.0 score12 NOPATCH fa_rep *= 1.1 ETABLE FA_STANDARD_SOFT

Ejemplo 2: 2 dimensiones, 6 celdas (niveles).

    GRID_DIM 2
    GLOBAL_PATCH cst_patch.txt
    GLOBAL_PATCH fa_atr = 2
    1 1 0.6 score12 occ_Hbond_sol_exact
    1 2 1.0 score12 occ_Hbond_sol_exact fa_atr *= 1.5
    2 1 0.6 score12 NOPATCH fa_rep *= 0.5
    2 2 1.0 score12 NOPATCH fa_rep *= 0.5
    3 2 1.0 score12 NOPATCH fa_rep *= 0.2 
    3 3 2.0 score12 NOPATCH fa_rep = 0.1

Todas las funciones de puntuación se parchearán con cst\_patch.txt y recibirán un fa\_atr = 2. cst\_patch.txt se buscará en tu directorio local (y quizá contenga atom\_pair\_constraint = 1.0). Los GLOBAL\_PATCH se aplican después de crear la función de puntuación con score12 y NOPATCH/patch, pero antes de las demás operaciones de parche locales.

intercambios entre las celdas siguientes: (1,1)\<-\>(1,2); (1,1)\<-\>(2,1); (1,2)\<-\>(2,2); (2,1)\<-\>(2,2); (2,2)\<-\>(3,2); (3,2)\<-\>(3,3)

#### ExchangeGrid

[[images/ExchangeGrid_MHM.jpg]]

#### Muestreo con intercambio de réplicas: etapa de docking de baja resolución

línea de comandos:

    mpirun -np 14 rosetta_scripts.mpi.<platform><compilter>release -database Rosetta/main/database -parser:protocol dock_cen.xml -in:file:s P.pdb -in:file:native native.pdb -partners A_B -score:weights interchain_cen -n_replica 3 -nstruct 4 -run:intermediate_structures -out:file:silent decoys.out -out:file:scorefile scores.fsc

Archivo de RosettaScripts `   dock_cen.xml  ` con comentarios que te guían:

```xml
<ROSETTASCRIPTS>
    <SCOREFXNS>
        <ScoreFunction name="score_dock_low" weights="interchain_cen" />
    </SCOREFXNS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
       ''// sampling in low-resolution'' 
        <SwitchResidueTypeSetMover name="switch2centroid" set="centroid"/>

       '' // unbiased mover for translation and rotation, mover step size using constant gaussian mean value, alternatively use dock_cen_inter.xml, which interpolate mover's step size based on temperature level''
        <ThermodynamicRigidBodyPerturbNoCenter name="rb_mover" rot_mag="1" trans_mag="0.5"/> 

        ''// setup fold_tree, and store movable_jump into RigidBodyInfo''
        <DockSetupMover name="setup_jump"/> 

      ''  // very loose Atompair constraint between closest-to-mass-center CAs. For example: "AtomPair  CA   337  CA   531 BOUNDED       0.1 s(1)+s(2)+gap 0.5 Encounter" , 337 and 531 are the closest-to-mass-center residues of each docking partners respectively, and s(i) is the furthest distance of a surface CA of docking partner i to its center CA.''
        <AddEncounterConstraintMover name="encounter_cst" gap="8" />  

        ''// randomly reorient the two docking partners''
        <DockingInitialPerturbation name="init_pert" randomize2="1" randomize1="1" /> 
        // sampling engine

        ''// acceptance rate recorder''
        <TrialCounterObserver name="count" file="trial.stats"/> 

        ''// temp_file contains the temperature configuration. exchange between neighbor temperature is attempted every 1000 strides. No specific reason why using HamiltonianExchange mover intead of ParalleTempering, only because I started with it at the very beginning and it works as well if only temperature exchange involved.''
        <HamiltonianExchange name="h_exchange" temp_file="hamiltonians_cen.txt"  temp_stride="1000"/> 

        ''// take snapshots every 1000 stride and output the decoy into a trajectory silent file''
        <SilentTrajectoryRecorder name="traj" score_stride="1" stride="1000" cumulate_replicas="1" />

        ''// Empirically, 5000,000 steps are enough for converge.'' 
        <MetropolisHastings name="sampler" trials="5000000" scorefxn="score_dock_low" > 
            <Add mover_name="h_exchange"/>
            <Add mover_name="traj"/>
            <Add mover_name="count"/>
            <Add mover_name="rb_mover"/>
        </MetropolisHastings>

    </MOVERS>
    <APPLY_TO_POSE>
    </APPLY_TO_POSE>
    <PROTOCOLS>
        <Add mover_name="switch2centroid"/>
        <Add mover_name="setup_jump"/>
        <Add mover_name="encounter_cst"/>
        <Add mover_name="init_pert"/>
        <Add mover_name="sampler"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

archivo de configuración `   hamiltonians_cen.txt  `

    GRID_DIM 1
    GLOBAL_PATCH atom_pair_constraint = 5
    1 2.0 interchain_cen   
    2 3.0 interchain_cen 
    3 5.0 interchain_cen  

Una vez terminado el muestreo de baja resolución, los decoys seleccionados pueden pasar al protocolo estándar de refinamiento de RosettaDock.

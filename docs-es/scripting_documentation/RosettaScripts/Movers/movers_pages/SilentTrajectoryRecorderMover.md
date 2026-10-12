# SilentTrajectoryRecorder
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SilentTrajectoryRecorder

Registra una trayectoria de instantáneas como silent file.

```xml
<SilentTrajectoryRecorder stride="(100 &Size)" score_stride="(100 &Size)" filename="(traj &string)" cumulate_jobs="(0 &bool)" cumulate_replicas="(0 &bool)"/>
```

Por defecto, esto generará en realidad una salida en archivos PDB. Para obtener salida en silent file se requieren varias opciones adicionales de línea de comandos:

     -out:file:silent <silent filename> -run:intermediate_structures

Si se usa dentro de [MetropolisHastings](#MetropolisHastings), el nombre de salida del trabajo actual pasa a formar parte del nombre del archivo. Si se ejecuta con MPI, los parámetros cumulate\_jobs y cumulate\_replicas afectan al nombre del archivo donde se escribe finalmente la trayectoria. Por ejemplo, con el valor por defecto del parámetro filename, `     traj    `, un nombre de estructura de entrada `     structname    `, un número de trayectoria `     XXXX    `, un número de réplica `     YYY    ` y `     -out:file:silent default.out    `, se generarán los siguientes nombres según las opciones.

-   cumulate\_jobs=0 cumulate\_replicas=0: default\_structname\_XXXX\_YYY\_traj.out
-   cumulate\_jobs=0 cumulate\_replicas=1: default\_structname\_XXXX\_traj.out
-   cumulate\_jobs=1 cumulate\_replicas=0: default\_YYY\_traj.out
-   cumulate\_jobs=1 cumulate\_replicas=1: default\_traj.out


##Véase también

* [[Silent file]]: trabajo con silent files en Rosetta
* [[I want to do x]]: guía para elegir un mover


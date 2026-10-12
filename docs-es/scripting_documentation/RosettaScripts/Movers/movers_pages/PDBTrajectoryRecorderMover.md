# PDBTrajectoryRecorder
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PDBTrajectoryRecorder

Registra una trayectoria en un archivo PDB multimodelo. Con stride se registran modelos solo cada n veces. Añade ".gz" al nombre del archivo para usar compresión.

```xml
<PDBTrajectoryRecorder stride="(100 &Size)" filename="(traj.pdb &string)" cumulate_jobs="(0 &bool)" cumulate_replicas="(0 &bool)"/>
```

Si se ejecuta con MPI, los parámetros cumulate\_jobs y cumulate\_replicas afectan al nombre del archivo donde se escribe finalmente la trayectoria. Por ejemplo, con el valor por defecto del parámetro filename, `     traj.pdb    `, un nombre de estructura de entrada `     structname    `, un número de trayectoria `     XXXX    ` y un número de réplica `     YYY    `, se generarán los siguientes nombres según las opciones.

-   cumulate\_jobs=0 cumulate\_replicas=0: structname\_XXXX\_YYY\_traj.pdb
-   cumulate\_jobs=0 cumulate\_replicas=1: structname\_XXXX\_traj.pdb
-   cumulate\_jobs=1 cumulate\_replicas=0: YYY\_traj.pdb
-   cumulate\_jobs=1 cumulate\_replicas=1: traj.pdb



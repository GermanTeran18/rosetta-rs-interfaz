# LoadPDB
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## LoadPDB

Sustituye el PDB actual por uno del disco. Probablemente solo sea útil en el checkpointing, ya que este mover elimina toda la información obtenida hasta el momento en la trayectoria.

```xml
<LoadPDB name="(&string)" filename="(&string)"/>
```

-   filename: ¿qué nombre de archivo se carga?


##Véase también

* [[DumpPDBMover]]
* [[SavePoseMover]]
* [[I want to do x]]: guía para elegir un mover

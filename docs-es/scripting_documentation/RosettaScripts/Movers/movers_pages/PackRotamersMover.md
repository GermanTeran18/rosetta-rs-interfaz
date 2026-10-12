# PackRotamersMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PackRotamersMover

Reempaqueta cadenas laterales con las opciones proporcionadas por el usuario, incluidas TaskOperations (y, para diseño con aminoácidos no canónicos, PackerPalettes).

## Uso

[[include:mover_PackRotamersMover_type]]

**NOTA:** por defecto, el empaquetado incluye el muestreo de *todas las cadenas laterales de la PackerPalette actual*, es decir, **¡realiza diseño de secuencia!**
La forma de evitarlo, si solo quieres empaquetar las cadenas laterales existentes sin cambiar su identidad, es pasar una task operation [[RestrictToRepacking|RestrictToRepackingOperation]]:
```xml
<TASKOPERATIONS>
   <RestrictToRepacking name="repackonly" />
</TASKOPERATIONS>

[...]

<PackRotamersMover name="&string" scorefxn="(score12 &string)" task_operations="repackonly"/>

```

##Véase también

* [[Fixbb]]: aplicación para empaquetar rotámeros y hacer diseño de secuencia (no es un mover)
* [[SymPackRotamersMover]]: versión simétrica de este mover
* [[PackRotamersMoverPartGreedyMover]]
* [[RestrictRegionMover]]
* [[TryRotamersMover]]
* [[RotamerTrialsMover]]
* [[RotamerTrialsMinMover]]
* [[RotamerTrialsRefinerMover]]
* [[MinPackMover]]
* [[PrepackMover]]
* [[RepackMinimizeMover]]
* [[I want to do x]]: guía para elegir un mover

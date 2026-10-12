# ExtractAsymmetricUnit
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ExtractAsymmetricUnit

Lo inverso de SetupForSymmetry: dada una Pose simétrica, crea una Pose no simétrica que contiene solo la unidad asimétrica.

Por razones históricas, la Pose devuelta por este mover incluirá los átomos virtuales que añade el mover SetupForSymmetry y no incluirá los aminoácidos de tipo aa_unk (p. ej., aminoácidos no canónicos, ligandos, etc.). Este comportamiento puede controlarse con las opciones siguientes.

####Uso
```xml
<ExtractAsymmetricUnit name="(&string)"
    keep_virtual="(&bool, true)"
    keep_unknown_aas="(&bool, false)" />
```

####Opciones

[[include:mover_ExtractAsymmetricUnit_type]]

##Véase también

* [[ExtractAsymmetricPoseMover]]
* [[ExtractSubposeMover]]
* [[ExtractAsymmetricUnitMover]]
* [[CutOutDomainMover]]
* [[Symmetry]]: uso de la simetría en Rosetta
* [[SymmetryAndRosettaScripts]]
* [[SetupForSymmetryMover]]
* [[SetupNCSMover]]
* [[DetectSymmetryMover]]
* [[SymDofMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]

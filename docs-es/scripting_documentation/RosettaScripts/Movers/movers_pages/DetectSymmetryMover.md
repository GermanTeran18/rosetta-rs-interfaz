# DetectSymmetry
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## DetectSymmetry

Este mover toma una Pose no simétrica compuesta por cadenas simétricas y la transforma en un sistema simétrico. Solo funciona con simetrías cíclicas de C2 a C99.

```xml
<DetectSymmetry name="detect" subunit_tolerance"(&real 0.01)" plane_tolerance="(&real 0.001)"/>
```

subunit\_tolerance: RMSD de CA máximo tolerado entre las cadenas. plane\_tolerance: desplazamiento máximo aceptado (en angstroms) del centro de masa de toda la Pose respecto del plano xy.


##Véase también

* [[Symmetry]]: uso de la simetría en Rosetta
* [[SetupForSymmetryMover]]
* [[SetupNCSMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]
* [[SymDofMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]
* [[SymmetryAndRosettaScripts]]

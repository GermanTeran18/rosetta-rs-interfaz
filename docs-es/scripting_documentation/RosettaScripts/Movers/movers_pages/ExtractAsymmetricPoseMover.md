# ExtractAsymmetricPose
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ExtractAsymmetricPose

Similar a ExtractAsymmetricUnit: dada una Pose simétrica, crea una Pose no simétrica que contiene todo el sistema (todos los monómeros). Puede usarse para ejecutar movimientos simétricos y asimétricos en la misma trayectoria.

####Uso
```xml
<ExtractAsymmetricPose name="extract_asp" clear_sym_def="(&bool, false)"/>
```

####Opciones
**clear_sym_def** - Si es true, se borrará la etiqueta de opción symmetry_definition. Normalmente es necesario para el reempaquetado/minimización posteriores después de eliminar una simetría.

##Véase también

* [[ExtractAsymmetricUnitMover]]
* [[ExtractSubposeMover]]
* [[CutOutDomainMover]]
* [[SetupForSymmetryMover]]
* [[Symmetry]]: uso de la simetría en Rosetta
* [[SymmetryAndRosettaScripts]]
* [[SetupNCSMover]]
* [[DetectSymmetryMover]]
* [[SymDofMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]

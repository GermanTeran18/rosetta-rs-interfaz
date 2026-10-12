# CutOutDomain
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## CutOutDomain

Recorta una Pose a partir de un pdb molde. Las dos estructuras deben estar alineadas. El usuario indica el número de residuo inicial y el final del dominio en la **Pose molde**, y el mover recorta el dominio correspondiente del PDB de entrada.

```xml
<CutOutDomain name="&string" start_res="(&int)" end_res="(&int)" suffix="&string" source_pdb="&string"/>
```

-   start\_res/end\_res: residuos inicial y final en el pdb molde (p. ej., -s template.pdb)
-   suffix: sufijo de la estructura de salida
-   source\_pdb: nombre del pdb que se va a recortar

##Véase también

* [[ExtractSubposeMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]
* [[I want to do x]]: guía para elegir un mover

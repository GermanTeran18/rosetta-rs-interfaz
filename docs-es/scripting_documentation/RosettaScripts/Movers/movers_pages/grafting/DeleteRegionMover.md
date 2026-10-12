# DeleteRegionMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## DeleteRegionMover

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com

PI: Roland Dunbrack

###Propósito
Elimina una región del Pose actual. La región se especifica mediante residue selectors que se aplican en el momento de apply, por lo que el residuo no tiene por qué existir necesariamente en la estructura de entrada. Si se proporcionan números de residuo, se crea automáticamente un ResidueIndexResidueSelector en el momento del análisis.

```xml
<DeleteRegionMover name="(&string)"
                   residue_selector="(&string, '')"
                   start="(&string, '' (Ex: 24L))" end="(&string, '' (Ex: 42L))"
                   rechain="(&bool, false)" />
```

###Obligatorio
Deben proporcionarse start y end, O un residue selector.

###Opcional
-   residue_selector (&string): Nombre de un residue selector definido en la sección RESIDUE_SELECTORS que selecciona los residuos que se van a eliminar.
-   start (&string): Número de residuo de Rosetta o PDB desde el que empieza la eliminación (incluido). Ejemplos: "24L", "108"
-   end (&string): Número de residuo de Rosetta o PDB en el que termina la eliminación (incluido). Ejemplos: "42L", "115" 
-   nter\_overhang (&size): Elimina N residuos adicionales en el lado nter 
 - new_start = start_num - N
-   cter\_overhang (&size): Elimina N residuos adicionales en el lado cter
 - new_end = end + N
-   rechain (&bool): Si es true, se añadirán variantes de extremo a los residuos que bordean la región eliminada y se recalcularán los ID de cadena.  Por ejemplo, en un Pose de una sola cadena y 100 residuos, eliminar los residuos 50-51 con rechain=true dará como resultado un Pose de dos cadenas y 98 residuos, con una cadena que abarca los residuos 1-49 y otra que abarca los residuos 50-98.  Si rechain=false, el Pose resultante será de una sola cadena y 98 residuos, con una rotura de cadena entre los residuos 49 y 50.

##Véase también

* [[StorePoseSnapshotMover]]: Se usa para conservar la numeración original de residuos al añadir o eliminar residuos
* [[I want to do x]]: Guía para elegir un mover
* [[KeepRegionMover]]
* [[InsertPoseIntoPoseMover]]
* [[ReplaceRegionMover]]

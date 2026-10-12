# SetTemperatureFactor
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SetTemperatureFactor

Fija la columna del factor de temperatura (factor B) del PDB a partir de la información por residuo de un filtro. Es útil para colorear una proteína según alguna energía. El filtro debe ser compatible con ResId (informar de valores por residuo) o se producirá un error.

```xml
<SetTemperatureFactor name="&string" filter="(&string)" scaling="(1.0&Real)"/>
```

-   filter: el nombre de un filtro compatible con ResId
-   scaling: los valores que informe el filtro se multiplicarán por este factor.

##Véase también

* [[PSSM2BfactorMover]]: fija los factores de temperatura según el filtro 
* [[SetSecStructEnergiesMover]]
* [[SetTorsionMover]]
* [[I want to do x]]: guía para elegir un mover


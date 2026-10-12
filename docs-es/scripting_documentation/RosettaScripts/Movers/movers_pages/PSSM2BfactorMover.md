# PSSM2Bfactor
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PSSM2Bfactor

Fija la columna del factor de temperatura (factor B) del PDB a partir de la puntuación PSSM por residuo del filtro. Por defecto, en la columna del factor B las puntuaciones PSSM menores que -1 se fijan en 50 y las mayores que 5 en 0. Entre -1 y 5 hay un gradiente lineal.

```xml
<PSSM2Bfactor name="&string" Value_for_blue="(&Real)" Value_for_red="(&Real)"/>
```

-   Value\_for\_blue: toda puntuación PSSM igual o menor que este valor se convertirá en 0 en la columna del factor B. Por defecto 5.
-   Value\_for\_red: toda puntuación PSSM igual o mayor que este valor se convertirá en 50 en la columna del factor B. Por defecto 0.


##Véase también

* [[SetTemperatureFactorMover]]
* [[FavorSequenceProfileMover]]
* [[ConsensusDesignMover]]
* [[I want to do x]]: guía para elegir un mover

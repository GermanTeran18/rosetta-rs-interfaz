# ResidueSetChainEnergy
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ResidueSetChainEnergy

Calcula la energía de interacción entre 2 grupos de residuos: 1. un conjunto de residuos y 2. todos los residuos de una cadena dada. Los grupos pueden solaparse. Útil para sesgar el diseño de modo que respalde un loop o epítopo injertado. El Grupo1 se define con resnums, una lista de números de residuo (1,2,3 para la numeración del Pose o 1A,2A,3A para la numeración del pdb). El Grupo2 se define con chain, que es el número de cadena de Rosetta. Si el conjunto de residuos (Grupo1) está en la misma cadena que la cadena definida por el usuario (Grupo2), la energía sí incluye las energías intra-grupo1.

```xml
<ResidueSetChainEnergy name="(residue_set_chain_energy_filter &string)" scorefxn="(score12 &string)" score_type="(total_score &string)" resnums="(&string)" chain="(0 &int)" threshold="(&float)"/>
```

## Véase también

* [[Diseño en Rosetta|application_documentation/design/design-applications]]
* [[EnergyPerResidueFilter]]
* [[PackRotamersMover]]
* [[ResidueIEFilter]]

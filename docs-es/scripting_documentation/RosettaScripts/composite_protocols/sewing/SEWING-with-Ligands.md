#SEWING con ligandos
La compatibilidad de SEWING con ligandos está en sus primeras etapas, pero actualmente se admite mediante la interfaz de [[RosettaScripts]] con una subetiqueta ```Ligands``` en cualquier mover de SEWING. **Si no se proporciona la etiqueta Ligands, cualquier ligando de la estructura de entrada se eliminará de la estructura y se ignorará durante el proceso de alineamiento y diseño.** Usar esta etiqueta asegura que el ensamblaje de SEWING conozca los átomos del ligando y que cualquier contacto de residuos con el ligando se conserve durante todo el protocolo SEWING. Sin embargo, para verificar que no habrá choques con el ligando durante el proceso de ensamblaje, debes proporcionar un [[LigandClashRequirement|AssemblyRequirements#ligandclashrequirement]].

##Subetiqueta Ligand

La etiqueta Ligands recibe una lista de subetiquetas Ligand. La etiqueta Ligand tiene varias opciones:
* que se enumerarán aquí

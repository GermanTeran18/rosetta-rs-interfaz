#Cómo usar residuos que no son de proteína y ligandos en Rosetta
* **[[D-aminoácidos|D-Amino-Acids]]**
* **[[Aminoácidos no canónicos|Noncanonical-Amino-Acids]]**
* **[[Noncanonical Backbones]]**
* **[[ARN|RNA]]**
* **[[Metales|Metals]]**

Muchos otros residuos y ligandos (aparte de los aminoácidos canónicos (L)) están incluidos en la base de datos de Rosetta pero desactivados por defecto. Las instrucciones para activarlos se encuentran [[aquí|How-to-turn-on-residue-types-that-are-off-by-default]]. También puedes encontrar un tutorial introductorio sobre cómo preparar ligandos [aquí](https://www.rosettacommons.org/demos/latest/tutorials/prepare_ligand/prepare_ligand_tutorial).

Las moléculas con archivos `.params` que no están incluidas actualmente en la base de datos de Rosetta requieren pasar un [[archivo params de residuo|Residue-Params-file]] mediante las opciones de línea de comandos `-in:file:extra_res_fa`, `-in:file:extra_res_path` o `-in:file:extra_res_cen`, documentadas [[aquí|input-options]].

Si, en cambio, quieres que Rosetta elimine automáticamente los residuos o ligandos que no reconoce (por ejemplo, si esos residuos o ligandos no afectan a tu protocolo), puede que te convenga [[ignorar los residuos no reconocidos|Ignore-Unrecognized]].

##Véase también

* [Tutorial sobre la preparación de ligandos](https://www.rosettacommons.org/demos/latest/tutorials/prepare_ligand/prepare_ligand_tutorial)
* [[NC scorefunction info]]: información sobre las funciones de puntuación que funcionan bien con residuos y moléculas que no son de proteína.
* [[Opciones en Rosetta|options-overview]]
* [[How to turn on residue types that are off by default]]
* [[Archivos params|Residue Params file]]: notas para añadir nuevos tipos de residuo que no estén ya en la base de datos de Rosetta.
* [[Preparación de estructuras para Rosetta|preparing-structures]]
* [[Cómo hacer que tu código resista PDB mal formados|robust]]

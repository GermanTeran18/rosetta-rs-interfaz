#Cómo preparar ligandos para usarlos en Rosetta

Autor:  Sam DeLuca

¿Por qué es necesario este proceso?
==============================

Rosetta usa archivos params para guardar información precalculada sobre la geometría y la química de los residuos y ligandos. Se necesita un archivo params para cada residuo que aparezca en un PDB. Con Rosetta se incluye un conjunto de archivos params para residuos y metales comunes, que se encuentran en /path/to/rosetta/main/database/chemical/residue\_type\_sets

* Puedes encontrar una descripción general del tipo de archivo params [[aquí | Residue-Params-file]]
* Puedes encontrar un tutorial introductorio sobre la preparación de ligandos [aquí](https://www.rosettacommons.org/demos/latest/tutorials/prepare_ligand/prepare_ligand_tutorial).

Cómo generar confórmeros de ligandos
============================

Si quieres modelar la flexibilidad del ligando durante el docking proteína-ligando, es necesario generar una biblioteca de confórmeros del ligando. Esta biblioteca debe tener formato de archivo PDB y contener las coordenadas de cada confórmero, con los confórmeros separados por líneas «TER». Hay varias formas de generar confórmeros, y MOE y openeye Omega son las más directas. Rosetta actualmente no es capaz de generar confórmeros internamente.

Cómo generar archivos params de uno en uno con molfile\_to\_params.py
==================================================================

rosetta\_source/scripts/python/public/molfile\_to\_params.py genera un archivo params y un archivo pdb a partir de un molfile de entrada. Si ejecutas este script sin argumentos, se muestra la documentación de su uso y de sus opciones. El archivo PDB generado tiene coordenadas idénticas a las del molfile de entrada, y nombres de átomos PDB que coinciden con los nombres de átomos del archivo params. Es fundamental que los nombres de átomos coincidan entre el PDB y el archivo params. Por defecto, el archivo params generado por este script se llama «LG1».

Si tienes una biblioteca de confórmeros, añade una línea PDB\_ROTAMERS al final del archivo params generado con el siguiente formato:

```
PDB_ROTAMERS path/to/rotamers.pdb
```

Cómo generar archivos params en lote con batch\_conformers.py
==========================================================

Si tienes un conjunto de ligandos en formato molfile, puedes usar el script rosetta\_source/scripts/python/public/batch\_molfile\_to\_params.py. Ejecuta el script con la opción -h para ver una descripción de su uso e instrucciones básicas. Toma como entrada la base de datos de Rosetta, un archivo con una lista de rutas a molfiles y la ruta al script molfile.params.

Este script asignará a cada molfile un código único de 3 letras y analiza la base de datos de Rosetta para asegurarse de que no se use ningún código de 3 letras que entre en conflicto con ligandos ya existentes en la base de datos. Cada molfile debe contener conformaciones de un único ligando. Si tu archivo mol contiene varias conformaciones, se creará un archivo PDB\_ROTAMER y se hará referencia a él en el archivo params.

Puedes ejecutarlo así:

```
Rosetta/main/source/scripts/python/public/batch_molfile_to_params.py -d /path/to/rosetta/Rosetta/main/database --script_path=/path/to/molfile_to_params.py list_of_molfiles.txt
```

Se creará un nuevo directorio llamado «params» en el directorio desde el que ejecutaste el script. Este directorio tendrá un subdirectorio por cada molfile procesado, y ese subdirectorio contendrá el archivo params y el archivo pdb del ligando asociado. En algunos casos molfile\_to\_params no puede crear un archivo params con éxito. En ese caso, el script continuará, y la ruta del archivo mol que falló se imprimirá en la salida estándar.

##Véase también

* [Tutorial sobre la preparación de ligandos](https://www.rosettacommons.org/demos/latest/tutorials/prepare_ligand/prepare_ligand_tutorial)
* [[Cómo hacer que Rosetta resista PDB mal formados|robust]]
* [[Non-protein residues]]: guía para usar moléculas que no son proteínas con Rosetta
* [[Residue Params file]]: archivo para especificar información química y geométrica de ligandos y residuos.
* [[Preparing structures]]: preparación de estructuras de proteínas típicas para usarlas en Rosetta
* [[Preparing PDB files for non-peptide polymers]]
* [[Preparación de archivos PDB que contienen proteína y ARN|RNA-protein-changes]]
* [[Running Rosetta with options]]: instrucciones para ejecutar aplicaciones de Rosetta en la línea de comandos
* [[File types list]]: tipos de archivo que usa Rosetta

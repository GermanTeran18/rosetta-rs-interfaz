#Archivos de modelo de SEWING



Los archivos de modelo contienen información estructural sobre subestructuras que se usarán en los protocolos de [[SEWING]]. Son necesarios para todos los movers de SEWING. 

Los archivos de modelo se generan con la [[SEWING Hasher application]] y pueden filtrarse con la aplicación [[ModelTrimmer]].

##Ejemplo
```
#Model file created on 2015-9-24
#This model file contains of models from parent file ./giant_unwieldy_file.models
#All models with a segment containing dssp code(s) H have been removed
#Any model with helical (H) segment(s) fewer than 0 residues or greater than 1000 residues have been removed
#Any model with strand (E) segment(s) fewer than 18 residues or greater than 1000 residues have been removed
#Any model with loop (L) segment(s) fewer than 0 residues or greater than 5 residues have been removed

VERSION 1530590163
MODEL 80 6 11.9294 130.065 159.192 -27.0884 /Users/tjacobs2/PROJECTS/datasets/top8000/top8000_chains_70//1a2zFH_C.pdb
SEGMENT 7 E 1
RESIDUE 35 0 ALA -1
ATOM 1 17.602 46.603 -24.591
ATOM 2 16.364 46.555 -23.862
ATOM 3 15.398 47.642 -24.323
ATOM 4 15.74 48.774 -24.711
RESIDUE 36 0 MET 176.763 56.221 51.5357
ATOM 1 14.138 47.299 -24.189
ATOM 2 13.007 48.172 -24.336
...
```

##Explicación
* La parte superior del archivo de modelo contiene comentarios (impresos por sewing_hasher o ModelTrimmer) que indican la fecha en que se generó el archivo y qué entrada se usó para generarlo. 
* La línea VERSION asigna un número de versión a cada archivo de modelo. Se usa para asegurar que los archivos de aristas de SEWING solo se usen con el archivo de modelo de SEWING a partir del cual se generaron. Un archivo de modelo y un archivo de aristas deben tener números de versión coincidentes para usarse juntos.
* Cada línea MODEL tiene los siguientes elementos:
  * model_id: Un entero que sirve para identificar el modelo
  * structure_id: Un entero que sirve para identificar la estructura de la que se tomó el modelo
  * distance
  * hoist_angle
  * packing_angle
  * meridian_angle
  * pdb_code: El archivo PDB del que se tomó el modelo
* Cada línea SEGMENT tiene los siguientes elementos:
  * ID del segmento: Un entero que sirve para identificar el segmento (único dentro de un modelo, pero no entre modelos)
  * Estructura secundaria del segmento (H, L o E)
  * ¿Debe usarse este segmento para el hashing? (1 o 0)
* Cada línea RESIDUE tiene los siguientes elementos:
  * Número de residuo (respecto a la estructura de partida)
  * Tipo de residuo
  * Ángulos chi
* Cada línea ATOM tiene los siguientes elementos:
  * Tipo de elemento (1, 2, 3 o 4). Solo se almacenan cuatro átomos de la cadena principal (N, Calpha, C y O).
  * coordenadas x, y y z

##Véase también
* [[SEWING]]: La página de inicio de SEWING
* [[SEWING Hasher application]]
* [[ModelTrimmer]]
* [[SEWING Dictionary]]

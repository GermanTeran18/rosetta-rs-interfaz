## Qué es `ResidueTypeFinder`
Pretende ser una forma muy eficiente de obtener `ResidueType` de un `ResidueTypeSet`, sin
tener que instanciar *todo* el `ResidueTypeSet`, lo que puede tardar un tiempo exponencialmente
largo si hay muchos parches.

## Qué hace
+ `get_all_residue_types()` hace una búsqueda en árbol binario agregando parches uno por uno. Esto suena tedioso, pero en la mayoría de las ramas del árbol («¿probar el parche o no?») normalmente hay información suficiente para detener el recorrido de la rama. Por ejemplo, si buscamos una lista de nombres de átomo que vimos en un residuo de un archivo PDB, y el parche elimina uno de esos átomos, probablemente no vale la pena probarlo. Y si agrega un átomo deseado, deberíamos probarlo. Normalmente devuelve una lista pequeña. 
+ para `get_all_residue_types()` o `get_best_match_residue_type_for_atom_names()`, lo mejor es usar
     tantas restricciones como sea posible que sean específicas de los tipos de residuo deseados.
+ para `get_representative_type()`, lo mejor es usar la menor cantidad posible de restricciones deseadas. El trabajo de esta función es recorrer el árbol hacia abajo hasta encontrar un `ResidueType` con las variantes, el nombre, etc. deseados.

## Pendiente
+ probablemente habría que refactorizar todas las comprobaciones y filtros como funcionalidades de
     `chemical::ResidueTypeSelector`.  Algo como:
             `bool ResidueTypeSelector::check_patch_worth_trying( Patch, ResidueType )`
+ Actualmente, `ResidueTypeFinder` delega en la antigua rutina de búsqueda (residue_types_DO_NOT_USE) cuando se pide una custom_variant (esto ocurre en el código de enzdes). Esto tarda un tiempo exponencialmente largo en el número de parches. Si lo pensáramos un poco más, probablemente podríamos manejar este caso de uso con más elegancia, quizá definiendo las custom_variants como «metaparches».

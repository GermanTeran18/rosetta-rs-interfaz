# DdGScan
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## DdGScan (antes llamado "TaskAwareAlaScan")

Toma un conjunto de operaciones de tarea del usuario para especificar con más precisión un conjunto de residuos que se analizarán mediante escaneo de ddG. Muta individualmente cada uno de los residuos a alanina (o a cualquier otro residuo que se defina en las operaciones de tarea) y calcula el cambio en la energía de unión (ddG).

```xml
<DdGScan name="(& string)" task_operations="(comma-delimited list of task operations)" repeats="(1 &Size)" scorefxn="(&scorefxn)" report_diffs="(1 &bool)" write2pdb="(0 &bool)" />
```

-   task\_operations - Las operaciones de tarea que se usan para identificar qué residuos se escanean. Se escanean los residuos diseñables o empaquetables.
-   repeats - Cuántas veces se repiten los cálculos de ddg; se devuelve el promedio de todas las repeticiones.
-   scorefxn - La función de puntuación que se usa en los cálculos. Si se define un mover de ddG, esta función de puntuación también se usará en ese mover, y anulará cualquier función de puntuación distinta que se defina en él.
-   report\_diffs - Si se informan los cambios en la energía de unión al mutar (pasa true) o la energía de unión total de la estructura mutada (pasa false).
-   exempt\_identities - *OBSOLETO* Antes el usuario podía eximir ciertas identidades de aminoácidos (por ejemplo, glicina) de ser el destino de una mutación durante el escaneo, especificándolas aquí (p. ej., "GLY,PRO"). Ahora, si quieres eximir ciertos tipos de residuo, gestiónalo directamente en task\_operations.
-   write2pdb - Si se escribe en el archivo .pdb de salida la información de ddG específica de cada residuo.

Consulta de ejemplo para obtener resultados de la base de datos:
```sql
SELECT 
    structures.tag AS tag, 
    residues.name3 AS wt, 
    residue_pdb_identification.residue_number as rosetta_resNum, 
    residue_pdb_identification.pdb_residue_number AS pdb_resNum, 
    residue_pdb_identification.chain_id AS chain, 
    ddg.mutated_to_name3 AS mut, 
    ddg.ddG_value, 
    batches.description 
FROM ddg 
INNER JOIN structures ON structures.struct_id=ddg.struct_id 
INNER JOIN residue_pdb_identification ON 
    residue_pdb_identification.struct_id=structures.struct_id 
    AND residue_pdb_identification.residue_number=ddg.resNum 
INNER JOIN residues ON residues.struct_id=structures.struct_id 
    AND residues.resNum=ddg.resNum 
INNER JOIN batches ON batches.batch_id=structures.batch_id;
```


## Véase también

* [[Aplicaciones de docking|docking-applications]]
* [[AlaScanFilter]]
* [[ddGMover]]
* [[DdgFilter]]
* [[FilterScanFilter]]



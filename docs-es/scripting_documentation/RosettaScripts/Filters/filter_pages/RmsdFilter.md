# Rmsd
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Rmsd

[[include:filter_Rmsd_type]]


Calcula el RMSD de Calfa sobre un conjunto de residuos especificado por el usuario. La superposición es opcional. Las selecciones son aditivas, de modo que elegir una cadena, un residuo individual y un tramo dará como resultado un cálculo de RMSD sobre todos los residuos seleccionados. Si no se selecciona ningún residuo, el filtro usa todos los residuos del Pose. 

Por defecto, el RMSD se calculará respecto al Pose de entrada (el Pose en el momento de analizar el script). Usa -in:file:native \<filename\> o reference_name= para elegir otro Pose de referencia.

-   chains: lista de cadenas (p. ej., "AC") que se usan para el cálculo del RMSD
-   pdb\_num/res\_num: véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]
-   residue: añade una nueva hoja por cada residuo que se incluye (se puede usar el índice de Rosetta o el número del pdb)
-   span: tramo contiguo de residuos que se incluye (índice de Rosetta o número del pdb)
-   threshold: acepta con este rmsd o menor
-   superimpose: ¿hacer la superposición antes del cálculo del rmsd?
-   reference_name: si se da, usa como referencia el Pose guardado con SavePoseMover bajo el reference_name dado.
- by_aln: alinea el Pose con el Pose relativo según un alineamiento de secuencias. 
- aln_files: archivos de alineamiento en formato fasta con la consulta y la plantilla
- template_names: nombre del Pose relativo, tal como está escrito en los aln_files
- query_names: nombre del Pose de consulta, tal como está escrito en los aln_files

## Véase también

* [[IRmsdFilter]]
* [[SidechainRmsdFilter]]

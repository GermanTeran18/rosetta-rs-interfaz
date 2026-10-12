[[include:filter_RmsdFromResidueSelectorFilter_type]]

Calcula el RMSD sobre un conjunto de residuos especificado por el usuario, tanto para el Pose de consulta como para el de referencia.  
La evaluación del RMSD se hace con SelectRMSDEvaluator; la evaluación del GDT se hace con SelectGDTEvaluator. 
 
Los selectores aplicados a la referencia y a la consulta pueden ser distintos, pero por defecto cubren el mismo número de residuos, a menos que `count_residues` se ponga en false. Si se aplican dos TrueSelectors, funcionará como un filtro de RMSD normal.

Por defecto, el RMSD se calculará respecto al Pose de entrada (el Pose en el momento de analizar el script). Usa `-in:file:native \<filename\>` o `reference_name=` para elegir otro Pose de referencia.


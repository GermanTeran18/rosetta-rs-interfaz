#Opciones renombradas y obsoletas

A medida que Rosetta crece y cambia, algunas opciones que antes se usaban ya no son relevantes o se han renombrado para ser más coherentes con otras opciones. Para ayudar a modernizar los protocolos existentes, a continuación se detallan las opciones que se han renombrado o que se han eliminado por completo de Rosetta.

Ten en cuenta que esta no es una lista exhaustiva de los cambios en el sistema de opciones, sino que incluye solo aquellas opciones que se usan con cierta frecuencia en protocolos existentes. Es posible que no figuren opciones más esotéricas.

## Opciones renombradas

* `-residues:patch_selectors` --> `-chemical:patch_selectors`

## Opciones obsoletas

Estas opciones ya no funcionan como cabría esperar y deberían sustituirse.

* `-LoopModel:input_pdb` -- Especifica los archivos de entrada con `-s` en su lugar
* `-RBSegmentRelax:cst_wt` -- Usa `-constraints:cst_weight` en su lugar
* `-RBSegmentRelax:cst_width` -- Usa `-relax:coord_cst_width` en su lugar

## Opciones eliminadas

Estas opciones se han eliminado porque ya no cumplen ninguna función en Rosetta. Intentar usarlas producirá un error. En la mayoría de los casos se pueden quitar de tus archivos de opciones sin efectos negativos.

* `-ddg:use_bound_cst`
* `-RBSegmentRelax:cst_pdb`
* `-relax:membrane` -- El relax estándar ahora puede manejar implícitamente proteínas de membrana.
* `-run:silent` -- La salida a silent file ahora se especifica con otras opciones


##Véase también

* [[Options overview]]: descripción de las opciones de Rosetta
* [[Full options list]]
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta

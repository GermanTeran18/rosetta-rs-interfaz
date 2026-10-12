# DisableAntibodyRegionOperation
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## DisableAntibodyRegionOperation

Una TaskOperation que desactiva el empaquetado y/o el diseño de una región concreta del anticuerpo.
Por defecto, desactiva el empaquetado y el diseño de la cdr_region. Asegúrate de establecer la región que quieres desactivar.

     <DisableAntibodyRegionOperation region="(&string)" disable_packing_and_design="(&bool)" numbering_scheme="(&string)" cdr_definition="(&string)" />

###Opciones 

-   region (&string) (por defecto=cdr_region):  Selecciona la región que quieres desactivar. Cadenas aceptadas: cdr_region, framework_region, antigen_region.
-   disable_packing_and_design (&bool) (por defecto=true): ¿Desactivar el empaquetado y el diseño o solo el diseño? Si es falso, solo se desactiva el diseño de los CDR seleccionados.
-   numbering_scheme (&string):  Establece el esquema de numeración del anticuerpo. También hay que establecer la opción XML cdr_definition. Ambas opciones se pueden establecer también desde la línea de comandos (recomendado). Consulta los [[consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   cdr_definition (&string): Establece la definición de CDR que quieres usar. También hay que establecer la opción XML numbering_scheme. Consulta los [[consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]

 


##Véase también

* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts

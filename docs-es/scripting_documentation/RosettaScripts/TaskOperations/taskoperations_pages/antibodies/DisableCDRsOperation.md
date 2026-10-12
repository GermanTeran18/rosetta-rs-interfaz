# DisableCDRsOperation
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## DisableCDRsOperation

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

Parte del marco de RosettaAntibody y RosettaAntibodyDesign (RAbD)
* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]

###Propósito
Desactiva el empaquetado y/o el diseño de un conjunto de CDR. Por defecto, desactiva tanto el empaquetado como el diseño de todos los CDR.

     <DisableCDRsOperation cdrs="(&string,&string)" disable_packing_and_design="(&bool)" numbering_scheme="(&string)" cdr_definition="(&string)" />

###Opciones 

-   cdrs (&string,&string) (por defecto=todos los cdrs):  Selecciona el conjunto de CDR que quieres desactivar (p. ej.: H1 o h1)

-   disable_packing_and_design (&bool) (por defecto=true): ¿Desactivar el empaquetado y el diseño o solo el diseño? Si es falso, solo se desactiva el diseño de los CDR seleccionados.
-   numbering_scheme (&string):  Establece el esquema de numeración del anticuerpo. También hay que establecer la opción XML cdr_definition. Ambas opciones se pueden establecer también desde la línea de comandos (recomendado). Consulta los [[consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   cdr_definition (&string): Establece la definición de CDR que quieres usar. También hay que establecer la opción XML numbering_scheme. Consulta los [[consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]

 


##Véase también

* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts

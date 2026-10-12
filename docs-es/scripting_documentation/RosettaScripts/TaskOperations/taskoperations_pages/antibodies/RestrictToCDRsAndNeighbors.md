# RestrictToCDRsAndNeighbors
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## RestrictToCDRsAndNeighbors

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

Parte del marco de RosettaAntibody y RosettaAntibodyDesign (RAbD)
* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]

### Resumen
Una TaskOperation para restringir el empaquetado a CDR concretos y sus vecinos. Desactivará el empaquetado Y el diseño de todos los demás residuos. Consulta las opciones de diseño para un control más fino. 

Consulta la [[DisableAntibodyRegionOperation]] y la [[DisableCDRsOperation]] para restringir aún más el TaskFactory.

### Detalles 
Por defecto, restringe a todo el empaquetado de todos los CDR y vecinos. Es análoga a la TaskOperation RestrictToLoopsAndNeighbors, que por ahora no tiene compatibilidad con RS. 

Consulta las opciones para controlar qué CDR se usan, incluida la posibilidad de restringir solo el diseño, y para controlar si se diseñan los residuos vecinos del antígeno y/o del marco.

     <RestrictToCDRsAndNeighbors name="restrict" cdrs="(&string,&string)" numbering_scheme="(&string)" cdr_definition="(&string)" />

###Opciones comunes 

-   cdrs (&string,&string) (por defecto=todos los cdrs):  Selecciona el conjunto de CDR a los que quieres restringir (p. ej.: H1 o h1)
-   neighbor_dis (&real) (por defecto=6.0): Establece la distancia de detección de vecinos.  
-   numbering_scheme (&string):  Establece el esquema de numeración del anticuerpo. También hay que establecer la opción XML cdr_definition. Ambas opciones se pueden establecer también desde la línea de comandos (recomendado). Consulta los [[consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   cdr_definition (&string): Establece la definición de CDR que quieres usar. También hay que establecer la opción XML numbering_scheme. Consulta los [[consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]

### Opciones de diseño
-   design_cdrs (&bool) (por defecto=false):  Permite el diseño de los CDR seleccionados (de lo contrario, solo reempaquetado)
-   design_antigen (&bool) (por defecto=false): Permite el diseño de los residuos vecinos del antígeno (de lo contrario, solo reempaquetado)
-   design_framework (&bool) por defecto=false): Permite el diseño de los residuos vecinos del marco (de lo contrario, solo reempaquetado)
 

### Opciones adicionales
-   stem_size (&size) (por defecto=0): Establece el tamaño del tallo. Incluirá N residuos a cada lado de cada CDR como parte del CDR para la restricción.


##Véase también

* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts

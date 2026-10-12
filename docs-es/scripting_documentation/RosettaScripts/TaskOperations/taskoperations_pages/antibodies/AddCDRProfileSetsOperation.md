# AddCDRProfileSetsOperation
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## AddCDRProfileSetsOperation

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

Parte del marco de RosettaAntibody y RosettaAntibodyDesign (RAbD)
* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]

### Resumen
Añade conjuntos de mutaciones basados en clústeres como una TaskOperation. Básicamente, muestrea al azar secuencias completas de CDR dentro de un clúster de CDR concreto cada vez que se llama al packer. Lo hace para cada CDR. Usa la MutationSetDesignOperation para el trabajo pesado (actualmente no es compatible con RS). Si un CDR tiene un clúster desconocido o no hay datos para ese CDR concreto, se omite ese CDR. Las definiciones de CDR usadas son las de North/Dunbrack, ya que los clústeres se definen con ellas.

### Detalles 

Ten en cuenta que, por defecto, se establece un umbral de datos de 10. Si el clúster tiene menos de 10 secuencias, se omitirá. Usa la función set_cutoff para cambiarlo.

**Por ahora no se recomienda esta TaskOperation para H3, ya que no se agrupa bien en clústeres**


```xml
<AddCDRProfileSetsOperation cdrs="(&string,&string)" numbering_scheme="(&string)" include_native_restype="(&bool, true)" picking_rounds="(&size, 1)"/>
```


###Opciones comunes 

-   cdrs (&string,&string) (por defecto=todos los cdrs):  Selecciona el conjunto de CDR a los que quieres restringir (p. ej.: H1 o h1)
-   numbering_scheme (&string):  Establece el esquema de numeración del anticuerpo. Esta opción también se puede establecer desde la línea de comandos. Consulta los [[consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   include_native_restype (&bool) (por defecto=true):  ¿Incluir el tipo de residuo nativo al muestrear? 
-   picking_rounds (&size) (por defecto=1): Establece el número de veces que se elige un tipo de residuo de la distribución cada vez que se genera el packer. Aumenta este número para aumentar la variabilidad del diseño.

### Opciones de muestreo según la longitud

-   limit_only_to_length (&bool) (por defecto=false): Hace que la clase muestree todas las secuencias de CDR dentro de una longitud concreta, en lugar de por clúster, que es el comportamiento predeterminado. Si la longitud es pequeña y los clústeres están cerca entre sí, esto funcionaría bien. En general, sin embargo, no se recomienda.
-   use_light_chain_type (&bool) (por defecto=true): Usa el tipo de cadena ligera si se pasa mediante opciones de línea de comandos (_-light_chain_ [lambda/kappa]). Se recomienda al muestrear solo secuencias de longitudes concretas. 

### Opciones poco comunes
-   use_outliers (&bool) (por defecto=false): Usa los valores atípicos de los clústeres, definidos mediante DihedralDistance y RMSD.
-   cutoff (&size) (por defecto=10): Usará la estrategia de respaldo para este CDR si el total es menor o igual que este número.

### Opciones de benchmark
-   force_north_paper_db (&bool) (por defecto=false): Fuerza el uso de los datos del artículo original de agrupamiento de North/Dunbrack de 2011 como base de datos, en lugar de cualquier versión actualizada descargada de PyIgClassify. 


##Véase también

* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts

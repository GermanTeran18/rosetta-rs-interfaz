# AddCDRProfilesOperation
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## AddCDRProfilesOperation

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

Parte del marco de RosettaAntibody y RosettaAntibodyDesign (RAbD)
* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]

### Resumen
Añade, por defecto, perfiles de CDR basados en clústeres como TaskOperation para el conjunto de CDR.
Usa la ResidueProbDesignOperation para muestrear el perfil del clúster de CDR según la distribución de probabilidad de los clústeres de CDR. Se recomiendan varias rondas de empaquetado para muestrear las distribuciones.
Las definiciones de CDR usadas son las de North/Dunbrack, ya que los clústeres se definen con ellas. Por defecto, se establecen para muestreo TODOS los CDR.

### Detalles del muestreo de perfiles 

Cada vez que se genera una tarea, se elegirá un aminoácido del conjunto de esa posición y se añadirá al conjunto de residuos empaquetables elegidos para esa posición (o lo reemplazará). Reduce el número de rotámeros para el empaquetado y el espacio de diseño. En lugar de usar la energía para los perfiles, usamos la selección de residuos mediante probabilidades en cada generación de tarea. Si la opción picking_rounds se establece en un valor > 1, puede dar lugar a más de un residuo adicional en la tarea además del nativo y aumentar la variabilidad de los diseños posibles.

### Detalles 

Si no se pueden usar perfiles basados en clústeres, se usará la estrategia de respaldo.
Esto puede ocurrir si el CDR es de un clúster desconocido o si hay muy pocos datos
sobre el clúster para usar perfiles.

ESTRATEGIAS DE RESPALDO:
*   _seq_design_conservative_ añade un conjunto de mutaciones conservadoras a los tipos de residuo posibles (blosum62 por defecto),
*   _seq_design_basic_ no hará nada (ya que el comportamiento predeterminado del diseño es permitir todas las posiciones de residuo);
*   _seq_design_none_ desactivará el diseño de ese CDR (básicamente, dices que si no tiene perfiles, no se diseñe)

**Por ahora no se recomienda esta TaskOperation para H3, ya que no se agrupa bien en clústeres.**

**(Por ahora no está disponible en RS)** Opcionalmente, muestrea secuencias completas de CDR (usando la [[AddCDRProfileSetsOperation]]] integrada) mediante la estrategia principal de:
*   _seq_design_profile_sets_ (usar conjuntos en lugar de la probabilidad del perfil)
*   _seq_design_profile_sets_combined_ (usar conjuntos de perfiles y probabilidad del perfil)


```xml
<AddCDRProfilesOperation cdrs="(&string,&string)" numbering_scheme="(&string)" include_native_restype="(&bool, true)" picking_rounds="(&size, 1)"/>
```


###Opciones comunes 

-   cdrs (&string,&string) (por defecto=todos los cdrs):  Selecciona el conjunto de CDR a los que quieres restringir (p. ej.: H1 o h1)
-   numbering_scheme (&string):  Establece el esquema de numeración del anticuerpo. Esta opción también se puede establecer desde la línea de comandos. Consulta los [[consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   include_native_restype (&bool) (por defecto=true):  ¿Incluir el tipo de residuo nativo al muestrear? 
-   picking_rounds (&size) (por defecto=1): Establece el número de veces que se elige un tipo de residuo de la distribución cada vez que se genera el packer. Aumenta este número para aumentar la variabilidad del diseño.
 
### Estrategias de diseño

-   fallback_strategy (&string) (por defecto=seq_design_conservative): Establece la estrategia de respaldo, como se explicó arriba. Las opciones son: 
 *   _seq_design_conservative_ añade un conjunto de mutaciones conservadoras a los tipos de residuo posibles (blosum62 por defecto),
 *   _seq_design_basic_ no hará nada (ya que el comportamiento predeterminado del diseño es permitir todas las posiciones de residuo);
 *   _seq_design_none_ desactivará el diseño de ese CDR (básicamente, dices que si no tiene perfiles, no se diseñe)

### Opciones poco comunes
-   use_outliers (&bool) (por defecto=false): Usa los valores atípicos de los clústeres, definidos mediante DihedralDistance y RMSD.
-   stats_cutoff (&size) (por defecto=10): Usará la estrategia de respaldo para este CDR si el total es menor o igual que este número.
-   sample_zero_probs_at (&size) (por defecto=0): Establece el número de veces que se elige cada secuencia. Aumenta este número para aumentar la variabilidad del diseño.
-   cons_design_data_source (&string) (por defecto=blosum62):  Fuente de datos que usa la ConservativeDesignOperation, que es una estrategia de respaldo. Guía el conjunto de mutaciones permitidas. Un blosum más alto significa una mayor conservación (los números indican umbrales de similitud de secuencia). El conjunto de mutaciones permitidas son las de la matriz de sustitución con valores >=0.  
 *   legal = ['chothia_1976', 'BLOSUM30', 'blosum30', 'BLOSUM35', 'blosum35', 'BLOSUM40', 'blosum40', 'BLOSUM45', 'blosum45', 'BLOSUM50', 'blosum50', 'BLOSUM55', 'blosum55', 'BLOSUM60', 'blosum60', 'BLOSUM62', 'blosum62', 'BLOSUM65', 'blosum65', 'BLOSUM70', 'blosum70', 'BLOSUM75', 'blosum75', 'BLOSUM80', 'blosum80', 'BLOSUM85', 'blosum85', 'BLOSUM90', 'blosum90', 'BLOSUM100', 'blosum100']

### Opciones de benchmark
-   force_north_paper_db (&bool) (por defecto=false): Fuerza el uso de los datos del artículo original de agrupamiento de North/Dunbrack de 2011 como base de datos, en lugar de cualquier versión actualizada descargada de PyIgClassify. 


##Véase también

* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts

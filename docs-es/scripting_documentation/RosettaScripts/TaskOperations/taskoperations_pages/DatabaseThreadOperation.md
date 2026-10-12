# DatabaseThread
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## DatabaseThread

Esta TaskOperation está pensada para situaciones en las que un Pose cambia de un modo que añade o elimina residuos. Esto crea un problema para el threading normal, que necesita posiciones de inicio y fin constantes. Esta TaskOperation puede usar una base de datos de secuencias o una única secuencia objetivo. También necesita un PDB plantilla para encontrar en el Pose los residuos inicial y final definidos por el usuario. Se calculan la longitud de la secuencia y la posición de inicio del threading, y luego se elige al azar de la base de datos una secuencia de la longitud correcta y se le hace threading sobre el Pose.

```xml
<DatabaseThread name="(&string)" database="('' &string)" target_sequence="('' &string)" template_file="(&string)" start_res="(&int)" end_res="(&int)" allow_design_around="(1 &bool)" design_residues="(comma-delimited list)" keep_original_identity="(comma-delimited list)"/>
```

Para cambiar realmente la secuencia del Pose, tienes que llamar a algo como PackRotamersMover sobre el Pose usando esta TaskOperation. Ten en cuenta que esto solo empaqueta la secuencia a la que se le hizo threading y mantiene todo lo demás constante.

Esta TaskOperation se basa en ThreadSequence, así que se aplica la misma lógica: 'X' significa marcar la posición para diseño, mientras que ' ' o '\_' significa marcar el residuo del Pose solo para reempaquetado.

-   database: La base de datos debe ser un archivo de texto con una lista de aminoácidos de una letra (no FASTA).
-   target_sequence: La secuencia deseada, si solo hay una (esto puede ocurrir si el Pose cambia durante el diseño de modo que las posiciones de inicio y fin no son constantes; en tales casos ThreadSequence no es útil). La TaskOperation espera una base de datos o una secuencia objetivo y fallará si no se proporciona ninguna. Si se proporcionan ambas, se ignorará la base de datos. 
-   template\_file: Un PDB que sirve como plantilla constante para asignar los residuos inicial y final sobre el Pose en caso de que la longitud del Pose cambie durante el diseño.
-   start\_res: El residuo desde el que empezar el threading. Es un residuo del PDB plantilla. Se usa para encontrar el residuo más cercano en el PDB de origen.
-   end\_res: El residuo en el que terminar el threading. Es un residuo del PDB plantilla. Se usa para encontrar el residuo más cercano en el PDB de origen. La diferencia entre el residuo final y el inicial se usa para encontrar la longitud de secuencia deseada en la base de datos.
-   allow\_design\_around: Si es falso, solo se diseña la región a la que se hizo threading. El resto se establece para reempaquetado.
-   design\_residues: Equivale a poner 'X' en la secuencia objetivo. Tiene prioridad sobre la secuencia de la base de datos, de modo que si un residuo tiene una identidad distinta en la base de datos, se cambia a 'X'.
-   keep\_original\_identity: Equivale a poner ' ' o '\_' en la secuencia. El residuo del Pose se marca solo para reempaquetado. Tiene prioridad tanto sobre la secuencia de la base de datos como sobre la lista de design\_residues.

##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

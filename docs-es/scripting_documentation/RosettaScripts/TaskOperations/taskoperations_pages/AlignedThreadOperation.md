# AlignedThread
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## AlignedThread

Una TaskOperation que permite hacer threading de los residuos alineados entre una secuencia de consulta y una plantilla. Recibe un alineamiento de secuencias en formato FASTA (el archivo puede contener varias secuencias) y permite hacer threading solo de los residuos que están alineados entre la consulta y la estructura. Se omiten las posiciones en las que la estructura plantilla o la secuencia de consulta tienen un hueco '-'. Es adecuada cuando quieres modelar una secuencia sobre una estructura y ambas tienen longitudes distintas.

```xml
<AlignedThread name="(&string)" query_name="(&string)" template_name="(&string)" alignment_file="(&string)" start_res="(&int 1)"/>
```

- query_name: el nombre de la secuencia de consulta, tal como está escrito en el archivo de alineamiento.
- template_name: el nombre de la secuencia plantilla, tal como está escrito en el archivo de alineamiento. Es la misma secuencia que la de la estructura pasada con -s.
- alignment_file: el nombre del archivo de alineamiento en formato FASTA. Para que funcione, debe tener el formato habitual ('>nombre_de_la_secuencia' seguido de la secuencia de aminoácidos en código de una letra en la línea o líneas siguientes).
- start_res: el residuo en el que empezar el threading. Es útil para hacer threading de una cadena que no es la primera. 

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

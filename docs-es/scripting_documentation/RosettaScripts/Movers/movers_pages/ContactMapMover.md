# ContactMap
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ContactMap

Calcula y guarda mapas de contactos de cada estructura calculada.

```xml
<ContactMap name="&string" region1="( &string)" region2="( &string)" ligand="( &string)"  distance_cutoff="( 10.0 &Real)"  prefix="('contact_map_' &string)" reset_count="('true' &string)" models_per_file="(1 &int)" row_format="('false' &string)" />
```

-   region1: definición de la región 1 del ContactMap con el formato '\<start\>-\<end\>' o '\<chainID\>'; por defecto es 1-\<n\_residue()\>
-   region2: definición de la región 2 del ContactMap
-   ligand: posición en la secuencia o chainID del ligando; todos los átomos distintos de hidrógeno del residuo correspondiente se mapearán contra los átomos CB de region1 (se ignora si se especifica la etiqueta region2)
-   distance\_cutoff: distancia máxima entre dos átomos para que se incremente el recuento de contactos
-   prefix: prefijo de los nombres de archivo de salida
-   reset\_count: indica si el recuento se reinicia a 0 después de escribir el ContactMap en un archivo. Si es false, el mismo archivo se actualiza cada 'models\_per\_file' estructuras (solo se aplica con n\_struct\>1 cuando se llama con el Scripter)
-   models\_per\_file: define después de cuántas estructuras se genera un archivo de salida (no se crea ningún archivo si es igual a 0 o mayor que n\_struct)
-   row\_format: indica si la salida debe tener formato de filas en lugar del formato de matriz predeterminado

##Véase también

* [[AtomicContactFilter]]
* [[ResidueDistanceFilter]]
* [[ExtractSubposeMover]]
* [[I want to do x]]: guía para elegir un mover

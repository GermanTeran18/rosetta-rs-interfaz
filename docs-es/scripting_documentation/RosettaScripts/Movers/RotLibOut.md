[[_TOC_]]

###Autor
Gideon Lapidoth; glapidoth@gmail.com; PI: Sarel J. Fleishman; sarel@weizmann.ac.il

##Descripción general
###Resumen 

Este mover se usa para crear una base de datos de rotámeros basada en el alineamiento estructural entre el Pose de entrada y una lista de pdbs de referencia. La finalidad es restringir las elecciones de rotámeros durante el diseño o el modelado a los que se ven en proteínas naturales. El mejor caso de uso: diseñar una proteína nueva dentro de una familia de plegamiento definida. 
El mover recorre los residuos del Pose y busca un residuo del pdb de referencia que esté más cerca que "min_dist". Si el mover encuentra un residuo del pdb de referencia por debajo del umbral de distancia, continúa con el siguiente residuo del Pose y del pdb de referencia. Si el siguiente par también está por debajo de min_dist, el mover continúa con el siguiente par, y así sucesivamente. Si hay N>="min_frag_len" pares consecutivos, el segmento del par de referencia se guarda en el alineamiento de secuencias y los rotámeros se guardan en la base de datos de rotámeros.



```xml
<RotLibOut name="(&string;)" min_frag_len="(&string;)"
min_dist="(3 &non_negative_integer;)" dump_pdb="(false &bool;)"
rotamer_db_filename="(&string;)"
sequence_alignment_filename="(&string;)" />
```

-   **min_frag_len**: fija la longitud mínima de fragmento que se usa en el alineamiento
-   **min_dist**: distancia mínima entre residuos alineados
-   **dump_pdb**: para depuración, si se vuelcan pdbs durante la ejecución
-   **rotamer_db_filename**: ruta donde se guarda el archivo de la base de datos de rotámeros
-   **sequence_alignment_filename**: nombre del archivo donde se guarda el alineamiento de secuencias entre el Pose y los pdbs de entrada.

**Para dar la lista de archivos pdb de referencia, usa esta opción:**
`-unboundrot PDB.pdb, PDB1.pdb..`

---
##Ejemplo
Por ahora, este mover solo es accesible mediante RosettaScripts. 
A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml

<RotLibOut name="RLO" min_frag_len="3" min_dist="3" dump_pdb="0" rotamer_db_filename="rot.db"        sequence_alignment_filename="seq.f" />
```

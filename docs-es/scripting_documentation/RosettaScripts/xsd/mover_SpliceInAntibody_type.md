<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Cambia la conformación de un segmento del anticuerpo

```xml
<SpliceInAntibody name="(&string;)" tolerance="(0.23 &real;)"
        ignore_chain_break="(false &bool;)" debug="(false &bool;)"
        min_seg="(false &bool;)" chain_num="(1 &non_negative_integer;)"
        segment="(&string;)" superimposed="(true &bool;)"
        delta_lengths="(&int_cslist;)" dbase_iterate="(false &bool;)"
        database_entry="(&non_negative_integer;)"
        database_pdb_entry="(&string;)" scorefxn="(&string;)"
        template_file="(&string;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" torsion_database="(&string;)"
        design_shell="(6.0 &real;)" repack_shell="(8.0 &real;)"
        rtmin="(true &bool;)" restrict_to_repacking_chain2="(true &bool;)"
        use_sequence_profile="(true &bool;)" />
```

-   **tolerance**: A cuántas desviaciones estándar de la norma está la longitud de enlace de la ruptura de cadena.
-   **ignore_chain_break**: XRW POR HACER
-   **debug**: Si es true, la salida es más detallada y se vuelcan PDB.
-   **min_seg**: Aplica minimización a la cadena principal y a las cadenas laterales de la nueva conformación del segmento.
-   **chain_num**: Especifica el número de cadena de la Pose
-   **segment**: Qué tipo de segmento se cambia (L1_L2, H1_H2, L3 o H3)
-   **superimposed**: ¿La Pose está alineada con el anticuerpo molde?
-   **delta_lengths**: Lista de enteros separados por comas que especifica las diferencias de longitud entre las longitudes del segmento actual y las muestreadas de la base de datos. Por ejemplo, si delta_length=-1,1, solo se muestrean las conformaciones que sean un residuo más largas o más cortas que el segmento original.
-   **dbase_iterate**: XRW POR HACER
-   **database_entry**: Especifica el número de entrada de la conformación de la que se toma la muestra en la base de datos de conformaciones.
-   **database_pdb_entry**: Especifica el código PDB de la entrada de la conformación de la que se toma la muestra en la base de datos de conformaciones.
-   **scorefxn**: Nombre de la función de puntuación a usar
-   **template_file**: El archivo pdb usado para construir la base de datos de conformaciones.
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).
-   **torsion_database**: ruta al archivo de la base de datos de conformaciones.
-   **design_shell**: diseña la capa alrededor de la conformación muestreada.
-   **repack_shell**: reempaqueta la capa alrededor de la conformación muestreada.
-   **rtmin**: bool. ¿Hacer rtmin en el nuevo segmento?
-   **restrict_to_repacking_chain2**: bool. ¿Aplicar diseño a la cadena que no es del anticuerpo?
-   **use_sequence_profile**: usa restricciones de secuencia de pssm específicos de la conformación.

---

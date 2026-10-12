<!-- --- title: Silent File -->

Un silent file es un formato de archivo compacto que almacena información sobre una estructura. A diferencia del formato PDB, el formato silent puede contener información de más de una estructura. 

Hay dos codificaciones de silent files: Protein y Binary. Se diferencian en cómo almacenan la información de coordenadas. Los silent files Protein almacenan la información de phi/psi/chi en una disposición de columnas basada en texto. Los silent files Binary almacenan las coordenadas xyz completas de los átomos en una versión codificada en ASCII del valor double binario IEEE 754.
Los silent files de estructura Protein guardan la información estructural como columnas, pero en los archivos binarios la información estructural se guarda como una cadena ASCII. El archivo Binary Silent Struct es muy útil para comprimir varios PDB y ahorrar espacio en el equipo. Protein Silent Struct se ve normalmente en las salidas de Abinitio.

* **Precaución**: Los silent files Protein solo funcionan con aminoácidos canónicos, con todas las longitudes y ángulos de enlace en sus valores ideales (p. ej., en el protocolo Abinitio). Cualquier otra cosa perdería información estructural. Por tanto, si tienes longitudes de enlace y ángulos de tres átomos no ideales, o si tienes residuos de ligando, necesitas usar el formato de silent file binario.

La codificación de salida puede cambiarse con esta opción: 
```
-out:file:silent_struct_type binary 
or
-out:file:silent_struct_type protein
```

**Codificación Protein** 

-   Encabezado

    ```
    SEQUENCE                      Structure sequences presented by one-letter amino acid code
    SCORE                         Rosetta score terms
    ```

-   Cuerpo

    ```
    Columns 1-4                   Residue sequence number
    Columns 5-7                   Secondary structure one letter code
    Columns 8-17                  Phi angle
    Columns 18-26                 Psi angle
    Columns 27-35                 Omega angle
    Columns 36-44                 CA atom coordinates x
    Columns 45-53                 CA atom coordinates y
    Columns 55-62                 CA atom coordinates z
    Columns 64-98                 Chi angle real data if possible
    ```

**Codificación Binary**

-   Encabezado

    ```
    SEQUENCE                      Structure sequences presented by one-letter amino acid code
    SCORE                         Rosetta score terms
    ```

-   Cuerpo

    ```
    Binary contents
    ```
## Extracción de otros tipos de archivo de un silent file

### Extracción de PDB de un silent file

La aplicación `extract_pdbs` puede convertir silent files en archivos PDB. Puede encontrarse información sobre las opciones en la carpeta de pruebas de integración /Rosetta/main/tests/integration/tests/extract_pdbs/. 

### Extracción de un silent file a partir de otro

Se pueden usar métodos nativos de Linux para extraer Poses específicas de un silent file. Por ejemplo:

    #Getting the header of silent file
    head -3 file.silent > new.silent 

    #Appending data from pose with tag 'result_0001' to the new silent file
    grep 'result_0001' file.silent >> new.silent

##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[Input options]]: Opciones de línea de comandos para la entrada de Rosetta
* [[Output options]]: Opciones de línea de comandos para la salida de Rosetta
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

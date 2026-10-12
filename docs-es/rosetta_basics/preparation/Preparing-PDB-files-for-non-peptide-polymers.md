Cada vez más modeladores intentan usar Rosetta para modelar estructuras que no se limitan a cadenas peptídicas, y esto no hará más que aumentar. Rosetta ha tenido mucho éxito en el modelado de ARN, y el modelado de aminoácidos no canónicos, peptidomiméticos y estructuras de polisacáridos está en desarrollo activo.

Por desgracia, cargar este tipo de estructuras en Rosetta desde un archivo PDB puede ser difícil. El formato PDB no es coherente para los residuos que no son aminoácidos, la comprobación de errores de estas estructuras en el PDB es deficiente, y los investigadores suelen ignorar todos los tipos de registro estándar del PDB salvo los más básicos, que en algunos casos son necesarios para cargar correctamente un archivo.

A continuación se describen algunos métodos para lograr que tu estructura PDB se cargue correctamente en Rosetta.

[[_TOC_]]

## Códigos de 3 letras
El código de 3 letras es una desafortunada limitación del formato PDB actual. Por suerte, hay varios métodos para asegurarse de que tu residuo reciba en el PDB un código de 3 letras que permita cargarlo en Rosetta.

### Caso general
Para cargar cualquier residuo de un archivo PDB en Rosetta, ese residuo debe tener definido su propio [[archivo de topología (`.params`)|Residue Params file]] único, que debe estar incluido en el `ResidueTypeSet`.

Este archivo de topología incluirá el código de 3 letras _de Rosetta_ por defecto, que _debería_ ser el mismo que el código estándar de 3 letras del PDB, aunque no siempre lo será. A algunos residuos aún no se les ha asignado un código de 3 letras del PDB, por lo que el código de 3 letras de Rosetta no coincidirá necesariamente. Algunos de estos códigos de Rosetta entrarán en conflicto con otros códigos de 3 letras. Por eso es necesario contar con métodos para especificar el tipo de residuo exacto que se necesita.

#### Inclusión en el ResidueTypeSet
Algunas clases de tipos de residuo se pueden «activar» con opciones específicas. (Consulta los ejemplos más abajo.) Para otros casos más generales, puedes aprender cómo «activar» tipos de residuo aquí:

[[How to turn on residue types that are off by default]]

#### Archivos de códigos alternativos de 3 letras
En un archivo especial `.codes` se puede especificar una lista de códigos alternativos de 3 letras y los códigos de 3 letras de Rosetta correspondientes, tal como se indican en los archivos de topología apropiados. Estos archivos `.codes` tienen un formato muy sencillo: la primera columna es un código alternativo de 3 letras; la segunda columna es el código de 3 letras de Rosetta; y la tercera columna (opcional) es una designación de registro HETNAM de Rosetta para ese código.

Un archivo de ejemplo podría contener una línea como esta:
```
XXX ALA
```

Los códigos **distinguen mayúsculas y minúsculas**:
```
XXX ALA
xxx GLY
```

Para indicar a Rosetta que tenga en cuenta los códigos alternativos, usa simplemente la opción `-alternate_3_letter_codes`:
```
-alternate_3_letter_codes my_codes.codes
```

En el directorio `database/input_output/3-letter_codes/` de la base de datos de Rosetta hay varios archivos de ejemplo.

Se pueden especificar varios archivos para su inclusión: (ten en cuenta que si un código alternativo de 3 letras aparece en varios archivos o en varias líneas del mismo archivo, los emparejamientos posteriores sobrescribirán los anteriores.)
```
-alternate_3_letter_codes my_codes.codes her_codes.codes his_codes.codes
``` 

Si no proporcionas una ruta completa, Rosetta intentará leer el archivo del directorio `database/input_output/3-letter_codes/` de la base de datos de Rosetta. Todas las siguientes opciones producen el mismo resultado:
```
-alternate_3_letter_codes ${ROSETTA}/database/input_output/3-letter_codes/glycam.codes
-alternate_3_letter_codes ${ROSETTA}/database/input_output/3-letter_codes/glycam
-alternate_3_letter_codes glycam.codes
-alternate_3_letter_codes glycam
```

Si se da la opción `-alternate_3_letter_codes`, cuando Rosetta lea un PDB comprobará primero si el código de 3 letras se encuentra en uno de los archivos de códigos alternativos. Si es así, usará el emparejamiento de los archivos `.codes` proporcionados para traducir el código alternativo a un código de 3 letras de Rosetta. Si el código de 3 letras del archivo PDB no se encuentra como código alternativo en los archivos `.codes`, Rosetta intentará usar directamente el código de 3 letras que encontró en el archivo PDB.

(Para ver un ejemplo del uso de la tercera columna opcional de los archivos `.codes`, consulta la sección de carbohidratos más abajo.)

#### Registros HETNAM
Hay casos en los que se podría tener o necesitar usar el mismo código de 3 letras para indicar tipos de residuo distintos. En esos casos, se puede usar el tipo de registro `HETNAM` del PDB para especificar el nombre completo del `ResidueType` base (sin parchear) que se necesita en esa posición de la secuencia.

El formato estándar del registro `HETNAM` del PDB es deficiente para especificar esto. Por eso, Rosetta usa un formato de registro `HETNAM` modificado y «retrocompatible».

Línea de registro `HETNAM` estándar del PDB:
```
HETNAM GLC BETA-D-GLUCOSE
``` 
…lo que significa que _todos_ los códigos de 3 letras `GLC` de todo el archivo son beta-D-glucosa, lo cual es insuficiente, ¡ya que podrían ser doce beta-D-glucosas distintas!

Línea de registro `HETNAM` del PDB de Rosetta:
```
HETNAM GLC A 1 ->4)-beta-D-Glcp
``` 
…lo que significa que el residuo `GLC` _en la posición A1_ requiere el `ResidueType` `->4)-beta-D-Glcp`.

### Casos específicos
#### Carbohidratos
Para cargar un archivo PDB con residuos de sacáridos, usa `-include_sugars`.

La carga de residuos de sacáridos funciona mejor con registros `HETNAM`, como se describió antes; sin embargo, también se pueden cargar (muchos) archivos PDB directamente desde el PDB, o los generados por el software GLYCAM (que tienen sus propios códigos de 3 letras únicos), con las opciones `-alternate_3_letter_codes pdb_sugar` o `-alternate_3_letter_codes glycam`, según corresponda.

El archivo `glycam.codes` hace uso de la tercera columna de la lista de códigos alternativos para especificar directamente el `ResidueType` base. Esto es una alternativa al uso de registros `HETNAM` y funciona porque un código de 3 letras de GLYCAM para un sacárido, a diferencia de un código de 3 letras del PDB, es específico de un tipo de residuo concreto. Por ejemplo, usar el código de 3 letras `4GA` en un archivo PDB junto con `-alternate_3_letter_codes glycam`, que incluye la siguiente línea:
```
4GA Glc ->4)-alpha-D-Glcp
```
…dará el mismo resultado que usar el código de 3 letras `Glc` y el registro
```
HETNAM Glc A 1 ->4)-alpha-D-Glcp
```
dentro de un archivo PDB.

 **Nota:** la funcionalidad de carbohidratos de Rosetta está en desarrollo activo; ponte en contacto con <JWLabonte@jhu.edu> para recibir ayuda o hacer preguntas.

#### Superficies minerales
Para cargar un archivo PDB con residuos de superficies minerales, usa la opción `-include_surfaces`. Esto incluirá todos los `ResidueTypes` definidos en `database/chemical/residue_type_sets/fa_standard/residue_types/mineral_surface/`.

#### Lípidos
Para cargar un archivo PDB con residuos de lípidos, usa la opción `-include_lipids`.

 **Nota:** la funcionalidad de lípidos de Rosetta está en desarrollo activo y no se ha publicado; ponte en contacto con <JWLabonte@jhu.edu> para recibir ayuda o hacer preguntas.

## Conectividad
La conectividad de ramificación se define en los archivos PDB mediante registros `LINK`. Rosetta ahora interpretará estos registros `LINK` de forma apropiada para construir por defecto un `FoldTree` ramificado.  Actualmente, hay que añadir ```-write_pdb_link_records``` para que se escriban en cualquier PDB de salida.


##Véase también

* [[Cómo hacer que Rosetta resista PDB mal formados|robust]]
* [[Non-protein residues]]: guía para usar moléculas que no son proteínas con Rosetta
* [[Residue Params file]]: archivo para especificar información química y geométrica de ligandos y residuos.
* [[Preparing structures]]: preparación de estructuras de proteínas típicas para usarlas en Rosetta
* [[Preparing ligands]]: preparación de ligandos para usarlos con Rosetta
* [[Preparación de archivos PDB que contienen proteína y ARN|RNA-protein-changes]]
* [[Running Rosetta with options]]: instrucciones para ejecutar aplicaciones de Rosetta en la línea de comandos
* [[File types list]]: tipos de archivo que usa Rosetta

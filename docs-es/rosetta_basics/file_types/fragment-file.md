#Uso de archivos de fragmentos en Rosetta

Los fragmentos se usan en el ensamblaje de proteínas, ya sea para la predicción de estructuras o para el diseño, a fin de reducir el tamaño del espacio de búsqueda del plegamiento de proteínas. Son una parte fundamental del diseño de Rosetta. : Las bibliotecas de fragmentos las usan muchos protocolos, pero son una parte fundamental de ab initio.

Formato del nombre de archivo
======

-   **Las bibliotecas de fragmentos siguen un esquema de nomenclatura complejo:**

    ```
    {series}{pdb}{chain}{size}_{strategy}.{depth}_{version}
    ```

-   **Términos de los nombres de archivo de fragmentos** Términos de los nombres de archivo de fragmentos:

    ```
    series      The two character code used to disambiguate Rosetta runs. For fragment libraries this is almost always aa.
    pdb         The four character code of the PDB the fragments were generated for.
    chain       The one character code of the protein chain the fragments were generated for. Usually "_" for all.
    size        Fragment size, either a 3-mer or 9-mer. Acceptable values are 03 and 09.
    strategy    Fragment selection strategy used in NNMake. Acceptable values are 04, 05 and 06. See below.
    depth       Number of fragments of descending score which are kept in the library, usually 200.
    version     Version of NNMake, usually v1_3.
    ```

Formato del contenido del archivo
==============

Los archivos de fragmentos suelen tener el siguiente formato (denominado «formato rosetta++»)

```
position:            1 neighbors:          200
{fragment data}
position:            2 neighbors:          200
{fragment data}
```

Donde "position" es el número en la Pose del punto de inicio del fragmento y "neighbors" es el número de fragmentos (se ignora al leer).

"fragment data" consiste en bloques de líneas separados por líneas en blanco. Cada bloque representa un fragmento, y el número de líneas de los bloques coincide con el tamaño del fragmento.

Cada línea de los datos del fragmento suele tener el siguiente aspecto:

```
 2oqo A   189 I L -140.176  157.939 -179.962   -0.776    5.007    51.121 3     0.000 P  1 F  1
```

El formato está basado en columnas

```html
Column -- Meaning
1      -- blank
2-5    -- PDB code for the fragment origin
7      -- chain ID for the origin PDB
9-13   -- PDB residue number for the origin PDB
15     -- amino acid identity in the origin PDB
17     -- secondary structure for the origin PDB (Helix, Loop, Extended/beta)
19-27  -- phi
28-36  -- psi
37-45  -- omega
46-54  -- C-alpha x coordinate for origin PDB (optional)
55-63  -- C-alpha y coordinate for origin PDB (optional)
65-73  -- C-alpha z coordinate for origin PDB (optional)
74-79  -- unknown (unused)
80-85  -- unknown (unused)
86     -- Literal "P" (unused)
87-89  -- fragment position number, pose numbered (unused)
91     -- Literal "F"(unused)
92-94  -- fragment number (unused)
```

Todo lo que viene después de omega se ignora o se descarta en las ejecuciones modernas de Rosetta, y puede que ni siquiera esté presente en todas las versiones del archivo de fragmentos.

Generación de fragmentos
==============

1.  Generación de fragmentos
2.  Generación de fragmentos con un servidor web gratuito: [servidor Robetta](http://robetta.bakerlab.org/)
3.  Generación de fragmentos por tu cuenta: BASES DE DATOS: nr - descargable desde [ftp://ftp.ncbi.nih.gov/blast/db/external](ftp://ftp.ncbi.nih.gov/blast/db/external); nnmake\_database se incluye en la publicación; chemshift\_database se incluye en la publicación. PROGRAMAS: [PSI\_BLAST](ftp://ftp.ncbi.nih.gov/blast/executables/release/) [PSIPRED](http://bioinf.cs.ucl.ac.uk/psipred/) [JUFO](http://www.meilerlab.org/) [PROFphd](http://www.predictprotein.org/newwebsite/download/index.php) [SAM](http://www.soe.ucsc.edu/research/compbio/sam.html); nnmake se incluye en la publicación; chemshift se incluye en la publicación. Configura las rutas al principio de nnmake/make\_fragments.pl para que apunten a estas bases de datos y programas. PSI-BLAST debe estar instalado localmente. Después de instalar PSIBLAST y PSIPRED, consulta su README o las instrucciones rápidas siguientes sobre cómo crear un banco de datos de secuencias "NR" filtrado, llamado "filtnr", que también usa make\_fragments.pl. Instrucciones rápidas para crear filtnr:

    ```
    tcsh81538cfilt nr.fasta > filtnr
    tcsh 0.000000ormatdb -t filtnr -i filtnr
    tcsh p filtnr.p?? $BLASTDB
    ```

    1.  Obtén un archivo fasta de la secuencia deseada. Este archivo debe tener 60 caracteres por línea y sin espacios en blanco. La primera línea puede ser un comentario que empiece con el carácter '\>'.
    2.  Obtén predicciones de estructura secundaria desde servidores web, o configura software shareware localmente para que make\_fragment.pl pueda ejecutar localmente las predicciones de estructura secundaria. El generador de fragmentos puede usar predicciones de psipred (extensión .jones o .psipred), PhD (.phd), formato rdb de SAM-T99 (.rdb) y jufo (.jufo). Pueden usarse hasta tres predicciones. Debe usarse al menos una. El script getSSpred.pl puede usarse para obtener predicciones de la web. Edita la parte de configuración de este script para incluir tu dirección de correo electrónico y la ruta correcta al script httpget. Para usar este script, proporciona el nombre del archivo fasta y el método deseado (invoca el comando sin argumentos para ver la explicación de uso). Recupera las predicciones de estructura secundaria de tu buzón de correo.
    3.  (Opcional) Prepara archivos con datos de RMN si los tienes: incluyen los archivos .cst y .dpl, que son los mismos archivos que usa rosetta, y el archivo .chsft\_in, que contiene información de desplazamientos químicos. La información de estos archivos puede ayudar a Rosetta a elegir mejor los fragmentos. Consulta el archivo 'data\_formats.README' para ver la información de formato.
    4.  Ejecuta make\_fragments.pl. Invócalo sin argumentos para ver las opciones de uso. Probablemente el único argumento que necesites proporcionar es el archivo fasta.

        ```
        $> make_fragments.pl -verbose 2ptl_.fasta
        ```

        Si quieres excluir secuencias homólogas de la búsqueda de fragmentos, añade el argumento -nohoms. \$\> make\_fragments.pl -verbose -nohoms 2ptl\_.fasta Ten en cuenta que, si quieres excluir homólogos de la búsqueda de desplazamientos químicos/TALOS, necesitas editar la base de datos de talos. Consulta el README del directorio chemshift\_source para ver las instrucciones. Si no tienes un tipo concreto de predicción de estructura secundaria (por ejemplo, el archivo .jufo) y NO quieres que make\_fragments intente ejecutar el método localmente, usa la opción -nojufo.

        ```
        $> make_fragments.pl -verbose -nohoms -nojufo 2ptl_.fasta
        ```

        Se generarán dos archivos de fragmentos con nombres como aa2ptl\_03\_05.200\_v1\_3 y aa2pt\_09\_05.200\_v1\_3. El prefijo "aa" puede cambiarse con la opción -xx. "2ptl\_" es el nombre base de cinco letras, que puede especificarse con la opción -id o se deriva del nombre del archivo fasta. 03 o 09 indican las longitudes de los fragmentos.

    5.  Genera una biblioteca de loops además de los archivos de fragmentos. Ejecuta make\_fragments.pl con la opción -template, como (el código de cinco letras es 2ptl\_, por ejemplo):

        ```
        $> make_fragments.pl -template 2ptl_ 2ptl_.fasta
        ```

        requiere que 2ptl\_.pdb y 2ptl\_.zones estén presentes en tu directorio de ejecución, y este pdb es un archivo pdb de plantilla que se ha generado con createTemplate.pl, descrito en README.loops. A partir del archivo de zonas pueden definirse loops, y para cada loop definido se compila una biblioteca de conformaciones de loops en un archivo llamado "2pt\_.loops\_all" (que suele contener 2000 conformaciones de loops) basada en la selección de fragmentos. Después se llama automáticamente al script "trimLoopLibrary.pl" para reducir el tamaño de la biblioteca de loops y se escribe el archivo como "2ptl\_.loops". Este archivo se usa después en el modo de modelado de loops de Rosetta para construir loops variables sobre la estructura de plantilla. Una biblioteca de loops se diferencia de una biblioteca de fragmentos principalmente en que se tiene en cuenta información geométrica para elegir fragmentos de «loop» de la longitud deseada que puedan cerrar aproximadamente el hueco según las posiciones del «stub» de despegue. En nnmake\_database se ha proporcionado una versión más reciente de la base de datos vall (2006-05-05) junto con la versión original de 2001-02-02. Puedes generar fragmentos con cualquiera de las dos versiones de la base de datos, simplemente modificando make\_fragments.pl para que apunte a la versión que quieras usar. Actualmente, la generación de la biblioteca de loops solo funciona con la versión de 2001-02-02, ya que algunos métodos de modelado de loops desarrollados recientemente ya no necesitan una biblioteca de loops. **NOTAS:**

        1.  nombra todos tus archivos con un nombre base de cinco caracteres seguido de la extensión adecuada. El nombre base debe ser el código pdb de cuatro letras y el ID de cadena de 1 letra.
        2.  Consulta también pNNMAKE? para ver una lista de los archivos implicados en el proceso de generación de fragmentos
        3.  Si hay un archivo pdb en el directorio en el que estás generando fragmentos, nnmake evaluará la coincidencia del fragmento con el pdb. Ten en cuenta que, si el archivo pdb no concuerda con el archivo fasta, el programa detectará un error y se detendrá.

4.  Cómo generar un vall sin saber lo que estás haciendo (Jack Schonbrun, 27 de mayo de 2004). Necesitas usar el ejecutable de Rosetta para generar datos vall.

##Véase también

* [[File types list]]: Lista de tipos de archivo usados en Rosetta
* [[ROBETTA (enlace externo)|http://robetta.bakerlab.org/]]: Servidor web que ofrece gratuitamente selección de fragmentos y otros servicios para usuarios académicos
* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Structure prediction applications]]: Lista de aplicaciones de predicción de estructuras, muchas de las cuales usan archivos de fragmentos
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

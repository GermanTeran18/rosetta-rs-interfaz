Autor:  Sam DeLuca

Editado el 27 de noviembre de 2017 por Vikram K. Mulligan (vmullig@uw.edu)

Descripción general de los archivos params
===========================

Los archivos params almacenan diversa información química y geométrica que se usa para definir la forma y la conectividad química de un bloque de construcción de aminoácido u otra molécula pequeña. 

Con Rosetta se incluye un conjunto de archivos params de residuos y metales de uso común, que se puede encontrar en Rosetta/main/database/chemical/residue_type_sets

Los archivos params pueden generarse automáticamente a partir de un archivo molfile, sdf o pdb del bloque de construcción o la molécula pequeña deseados, usando un script distribuido con Rosetta, ``main/source/scripts/python/public/molfile_to_params.py``. Ten en cuenta que pueden hacer falta ajustes manuales, según la información que sigue. El archivo params puede leerse con la opción ``-in:file:extra_res_fa``. 

Las siguientes líneas se encuentran normalmente en los archivos params de ligandos. Esto no representa una documentación completa del formato de archivo params. Estos archivos se leen en core/chemical/residue\_io.cc

-   **NAME** El nombre del residuo. Debe ser único entre todos los residuos cargados en Rosetta

-   **IO\_STRING** Los códigos de 3 letras y de 1 letra que representan el residuo. El código de 3 letras _no_ es único; no tiene que ser el mismo que el nombre. El código de 1 letra es Z por defecto.

-   **TYPE** El tipo de residuo que se representa; debe ser 'LIGAND' para ligandos, o 'POLYMER' para aminoácidos, bases de ADN y ARN u otros bloques de construcción de polímeros.

-   **AA** El tipo de aminoácido. Debe ser "UNK" para ligandos, o para la mayoría de los no canónicos.  (Ten en cuenta que internamente esto corresponde al enum core::chemical::AA.)

-   **ATOM** El nombre de átomo PDB, el [[tipo de átomo de Rosetta|Rosetta AtomTypes]], el tipo de átomo MM y la carga. Una línea ATOM tiene este aspecto:

    ```
    ATOM  C17 CH1   X   0.13
    ```

    Donde C17 es el nombre de átomo PDB, CH1 es el tipo de átomo de Rosetta, X es el tipo de átomo MM y 0.13 es la carga. Los nombres de átomo PDB deben ser únicos dentro de cada archivo params.

Algunos archivos params tienen una sexta columna opcional después de la carga del átomo. Es un esquema de carga alternativo y no se usa por defecto. Solo si se proporciona la opción -corrections:chemical::parse_charge se usará la segunda columna de carga. (Los valores de los aminoácidos canónicos proceden del conjunto de cargas Parameters For Solvation Energy de Sitkoff, Sharp & Honig 1994 J. Phys. Chem 98:1978 https://doi.org/10.1021/j100058a043) -- Los protocolos estándar actuales ignoran por completo estos valores, y pueden omitirse en cualquier archivo params nuevo.

-   **BOND** Define un enlace entre dos átomos con nombre.

-   **CHI** Define un ángulo chi rotable. Se especifica un número de ángulo chi, seguido de los nombres de los cuatro átomos que definen el ángulo.

-   **CONNECT** Da a un átomo una conexión con un átomo (sin especificar) de otro residuo. No debe usarse para el N y el C de la cadena principal; esos se indican con LOWER_CONNECT y UPPER_CONNECT respectivamente. Una línea CONNECT tiene este aspecto:

    ```
    CONNECT SG # replace SG with your atom's name
    ```

    La ubicación del átomo conectado debe especificarse en la región ICOOR como CONN#, donde # es el índice de la conexión. (Las conexiones se numeran desde 1, pero las dos conexiones de la cadena principal también cuentan, así que tu primer átomo de conexión probablemente se llamará CONN3.) Después el átomo debe especificarse otra vez como átomo virtual, con coordenadas idénticas a las de tu CONN#. Este es un ejemplo con el átomo virtual "V1" en representación de un átomo que se conecta al átomo de azufre "SG":

    ```
    ICOOR_INTERNAL    SG     0.000000   65.900000    1.808803   CB    CA    N       
    ICOOR_INTERNAL  CONN3  180.000000   75.000000    1.793000   SG    CB    CA      
    ICOOR_INTERNAL    V1     0.000000   75.000000    1.793000   SG    CB   CONN3 # Same as CONN3
    ```

    Al determinar la Pose, Rosetta hará lo posible por conectar automáticamente los residuos con conexiones que se enfrentan entre sí, pero también puedes hacerlo manualmente con el mover [[DeclareBond]]. 

-  **PROPERTIES** Una serie de propiedades que describen este tipo de ligando o de residuo.  Las propiedades permitidas incluyen (aunque esta lista no es exhaustiva): PROTEIN POLYMER LIGAND COARSE METAL METALBINDING DNA RNA CARBOHYDRATE SURFACE POLAR CHARGED AROMATIC TERMINUS LOWER_TERMINUS UPPER_TERMINUS SC_ORBITALS.  Para una lista exhaustiva de las propiedades permitidas, consulta el archivo source/src/core/chemical/residue_properties/general_properties.list en el repositorio principal de Rosetta.

-  **METAL_BINDING_ATOMS**  Una lista de los nombres de los átomos de este residuo o ligando que pueden formar enlaces covalentes con iones metálicos.  Solo los residuos con la propiedad METALBINDING pueden definir átomos de unión a metales.

-   **NBR\_ATOM** El nombre PDB del «átomo vecino». En el caso de los ligandos, por defecto es el átomo más cercano al centro geométrico del ligando

-   **NBR\_RADIUS** El radio de giro del ligando, que se usa para definir el tamaño total del ligando.

-  **NET\_FORMAL\_CHARGE** La carga total de este tipo de residuo o de ligando.  Debe ser un entero, aunque puede ser positivo o negativo.  Si no se proporciona, se supone que la carga formal neta es 0.  (Nota: el [[término de energía netcharge|NetChargeEnergy]] lo usa para determinar la carga neta de una Pose o región.)

-   **ICOOR\_INTERNAL** Las [[internal coordinates]] de un átomo. El formato va hacia atrás y tiene este aspecto:

    ```
    #                 Child  Phi Angle    Theta        Distance   Parent  Angle  Torsion
    ICOOR_INTERNAL    A4     179.932453   59.543328    1.238233   A3      A2     A1
    ```

    Y los campos son los siguientes: 
   - Átomo hijo
   - ángulo phi (ángulo de torsión entre A1, A2, A3, A4)
   - ángulo theta (ángulo impropio = (180 - (ángulo entre A4, A3, A2)))
   - distancia (entre A4 y A3)
   - átomo padre
   - átomo de ángulo
   - átomo de torsión

-   **PDB\_ROTAMERS** La ruta a un archivo PDB que contiene rotámeros del ligando.

-   **RAMA_PREPRO_FILENAME** La ruta y el nombre del mapa de Ramachandran que se usará al puntuar la conformación de este tipo de residuo, o al muestrear.  Deben indicarse dos archivos.  El primero se usa en el caso general de muestreo, y el segundo se usa cuando el residuo aparece antes de una L- o D-prolina, un peptoide o un aminoácido N-metilado (ya que el grupo de la amida altera las preferencias conformacionales del residuo precedente).

-  **RAMA_PREPRO_RESNAME** Si el archivo de Ramachandran especificado con RAMA_PREPRO_FILENAME contiene definiciones para varios tipos de residuo, esta es la cadena correspondiente al mapa con nombre del archivo que debe asociarse con _este_ tipo de residuo.  Si no se especifica, Rosetta busca un mapa con nombre correspondiente al nombre del tipo de residuo (p. ej., ASP para el aspartato).

##Véase también

Consulta esta página para más información: http://graylab.jhu.edu/pyrosetta/downloads/documentation/PyRosetta_Workshops_Appendix_B.pdf                               
Un artículo con varios ejemplos de archivos params para distintos bloques de construcción - http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0067051

* [[File types list]]: Tipos de archivo usados en Rosetta
* [[Non-protein residues]]: Guía para usar moléculas que no son proteínas con Rosetta
* [[How to turn on residue types that are off by default]]
* [[Hacer que Rosetta sea robusto frente a PDB mal formados|robust]]
* [[Preparación de archivos de ligandos para su uso con Rosetta|preparing ligands]]
* [[Preparing PDB files for non-peptide polymers]]
* [[Preparación de archivos PDB que contienen proteína y ARN|RNA-protein-changes]]
* [[Running Rosetta with options]]: Instrucciones para ejecutar aplicaciones de Rosetta en la línea de comandos

<!--
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files
params files -->

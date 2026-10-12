# Movers de inicialización: AddMembraneMover

## Descripción

El AddMembraneMover inicializa RosettaMP configurando los datos necesarios para la representación de la membrana. Este mover es **obligatorio** para modelar proteínas de membrana en Rosetta y debe llamarse primero. El AddMembraneMover añade el residuo de membrana al Pose, establece un FoldTree predeterminado e inicializa el objeto MembraneInfo. La configuración correcta de la raíz del FoldTree, ya sea para una membrana fija y una proteína móvil o para una membrana móvil y una proteína fija, es responsabilidad del desarrollador del protocolo.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles en la interfaz de RosettaScripts:

`spanfile` - Cadena de texto - Indica el nombre del spanfile.
`anchor_rsd` - Entero - El número de residuo del Pose al que debe anclarse el residuo de membrana. 
`membrane_rsd` - Entero - El número de residuo que debe tener el residuo de membrana en el Pose. 
`thickness` - Float - La mitad del grosor deseado de la membrana. 
`steepness` - Float - La pendiente de la función que describe la interfaz; cuanto mayor, más abrupta es la transición. Idealmente entre 2 y 10.
`center` - Float - Centro deseado de la bicapa de membrana. 
`normal` - Float - Normal deseada de la bicapa de membrana. 
`include_lips` - Booleano - Para incluir un lipsfile de lipofilicidad.
`lipsfile` - Cadena de texto - Indica el nombre del lipsfile.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::spanfiles <spanfile>` | AddMembraneMover solo usa el primer spanfile. No es obligatorio si se da una estructura que ya está transformada a coordenadas de membrana: en ese caso usa la opción spans_from_structure.|
|`-mp::setup::spans_from_structure <bool>` | Si no se da un spanfile, el usuario puede crear un objeto SpanningTopology a partir de la estructura dada. La estructura debe estar transformada a coordenadas de membrana. Con esta opción se escribe un spanfile: out.span |
|`-mp::setup::lipsfile <lipsfile>` | Lee el lipsfile proporcionado por el usuario si se inicializa desde la línea de comando. Por defecto es "mypdb.lips4" |
|`-mp::setup::membrane_rsd <residue number for MEM residue>` | opcional; lee la posición del residuo de membrana proporcionada por el usuario. Por defecto usa el residuo MEM de un PDB del marco generado previamente. |
|`-mp::setup::center <three real numbers defining the center point>` | opcional; el usuario puede indicar la coordenada del centro de membrana deseada.|
|`-mp::setup::normal <three real numbers defining the normal vector>` | opcional; el usuario puede indicar el vector normal de membrana deseado.|
|`-mp::thickness <Real>` | Mitad del grosor de la membrana que usa la función de puntuación de alta resolución. Sobrescribe el grosor predeterminado de 15A (la membrana tiene 30A de grosor).|
|`-mp::membrane_core <Real>` | Establece el grosor del núcleo de la membrana para Lazaridis-Karplus. El valor predeterminado es 15A, es decir (-15, 15).|
|`-mp::steepness <Real>` | Controla la región de transición entre las fases polar y apolar del modelo de membrana que usa la función de energía de alta resolución. Predeterminado = 10, que da una región de transición de 6A.|

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press


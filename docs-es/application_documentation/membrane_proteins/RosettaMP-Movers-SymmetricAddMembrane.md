# Movers de inicialización: SymmetricAddMembraneMover

## Descripción
Este mover inicializa una representación de membrana (residuo de membrana, topología transmembrana, etc.) para un Pose simétrico. Para que esta configuración funcione, el Pose ya debe ser simétrico (se debe haber ejecutado SetupForSymmetry). El residuo de membrana se añade como raíz del sistema simétrico. Por ahora, esta configuración solo funciona con Poses de simetría C. 

## Interfaz de RosettaScripts

Todas las opciones de [[AddMembraneMover | RosettaMP-Movers-AddMembrane]] están disponibles para este mover en la interfaz de RosettaScripts.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::spanfiles <spanfile>` | Lee solo el primer spanfile al inicializar desde la línea de comando. |
|`-mp::setup::spans_from_structure <bool>` | Si no se da un spanfile, el usuario puede crear un objeto SpanningTopology a partir de la estructura dada. La estructura debe estar transformada a coordenadas de membrana. Con esta opción se escribe un spanfile: out.span |
|`-mp::setup::lipsfile <lipsfile>` | Lee el lipsfile proporcionado por el usuario si se inicializa desde la línea de comando. Por defecto es "mypdb.lips4" |
|`-mp::setup::membrane_rsd <residue number for MEM residue>` | Lee la posición del residuo de membrana proporcionada por el usuario. |

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencia

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press


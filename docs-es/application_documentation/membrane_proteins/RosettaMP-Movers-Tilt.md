## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com) 
- Rebecca Alford (rfalford12@gmail.com)
- IP responsable: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 2/8/18

## Descripción

Este Mover se usa en el protocolo de docking global (MPFindInterfaceMover) e inclina un tramo, una proteína o un compañero en la membrana, según el número de jump. El compañero inclinado será el compañero situado aguas abajo. Ten en cuenta que el número de jump NO puede ser el jump de membrana. El eje de inclinación es el eje perpendicular al eje que conecta los centros de incrustación de los dos compañeros. También existe la opción de establecer un ángulo de inclinación aleatorio en el rango de +/-45 grados alrededor de la normal. 

## Código y demo

El Mover se encuentra en `main/source/src/protocols/membrane`.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles en la interfaz de RosettaScripts:

`jump_num` - Entero - Indica el número de jump.
`angle` - Real - Indica el ángulo de rotación en grados.
`random_angle` - bool - Ángulo de inclinación aleatorio entre -20 y 20 grados.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::spanfiles <spanfile>` | Añade un spanfile al registrar las opciones desde la línea de comando. |

## Referencia
RosettaMP y los protocolos anteriores se publicaron en:

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (in press)

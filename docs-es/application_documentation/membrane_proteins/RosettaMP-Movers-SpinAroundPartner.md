## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com) 
- Rebecca Alford (rfalford12@gmail.com)
- IP responsable: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 2/8/18

## Descripción

Este Mover se usa en el protocolo de docking global de proteínas de membrana (el MPFindInterfaceMover). El primer compañero está fijo en la membrana y este Mover hace girar al segundo compañero (móvil) alrededor del primero en la membrana. El Mover muestrea una posición aleatoria dentro de un cuadrado de 100 A y luego hace docking de los compañeros con el DockingSlideIntoContactMover del protocolo de docking general. [El DockingSlideIntoContactMover se ajustó para que el tamaño de paso dependa de la distancia entre los compañeros y no sea de pasos de 1A; esto es considerablemente más rápido que lo segundo.]

## Código y demo

El Mover se encuentra en `main/source/src/protocols/membrane`.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles en la interfaz de RosettaScripts:

`jump_num` - Entero - Indica el número de jump.
`rand_range` - bool - Establece un rango aleatorio.
`range` - Entero - Indica el rango de muestreo.
`x` - Real - Establece la posición x.
`y` - Real - Establece la posición y.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::spanfiles <spanfile>` | Añade un spanfile al registrar las opciones desde la línea de comando. |

## Referencia
RosettaMP y los protocolos anteriores se publicaron en:

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (in press)

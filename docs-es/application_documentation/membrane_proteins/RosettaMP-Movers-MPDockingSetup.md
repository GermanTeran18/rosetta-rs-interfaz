## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com)
- Rebecca Alford (rfalford12@gmail.com)
- IP responsable: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 2/8/18

## Descripción

Este Mover lee 2 Poses y 2 spanfiles, los concatena y los imprime. Por ahora solo funciona con 2 Poses.

## Código y demo

El Mover se encuentra en `main/source/src/protocols/docking/membrane/`.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles en la interfaz de RosettaScripts:

`optimize1` - bool - ¿debe optimizarse la posición del compañero 1 en la membrana?
`optimize2` - bool - ¿debe optimizarse la posición del compañero 2 en la membrana?
`pose1` - Cadena de texto - Indica el primer Pose.
`pose2` - Cadena de texto - Indica el segundo Pose.
`span1` - Cadena de texto - Indica el primer spanfile.
`span2` - Cadena de texto - Indica el segundo spanfile.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::optimize1 <Type>` | Optimiza el compañero 1 al inicializar desde la línea de comando. |
|`-mp::setup::optimize2 <Type>` | Optimiza el compañero 2 al inicializar desde la línea de comando. |

## Referencia

RosettaMP se describe en 

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (in press)

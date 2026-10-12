# Movers para muestrear la incrustación de la proteína: Translation Rotation Mover

## Descripción

Esta clase contiene tres movers: TranslationMover, RotationMover y TranslationRotationMover, todos ellos probados únicamente con una membrana fija y una proteína móvil. 

El TranslationMover traslada un elemento del Pose según el vector de traslación y un número de jump opcional. El jump predeterminado es el jump de membrana.

El RotationMover rota un elemento del Pose según el vector normal antiguo, el vector normal nuevo (es decir, el deseado), el centro de rotación y un número de jump opcional. El jump predeterminado también es el jump de membrana.

El TranslationRotationMover rota y traslada un elemento del Pose según el centro y la normal antiguos, el centro y la normal nuevos (es decir, los deseados) y un número de jump opcional. Es útil para mover un elemento del Pose a partir de la comparación entre el centro y la normal de la membrana y su incrustación calculada a partir del elemento del Pose. 

## Interfaz de RosettaScripts

`center` - 3 Floats - Centro deseado de la bicapa de membrana.
`normal` - 3 Floats - Vector normal deseado de la bicapa de membrana. 

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::center <XYZ-Vector of Real Numbers>` | Opcional; el usuario puede indicar la coordenada del centro de membrana deseada. En el caso del TranslationMover, lee las coordenadas del centro como vector de traslación si se inicializa desde la línea de comando. |
|`-mp::setup::normal <XYZ-Vector of Real Numbers>` | Opcional; el usuario puede indicar el vector normal de membrana deseado para el RotationMover y el TranslationRotationMover. |

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press



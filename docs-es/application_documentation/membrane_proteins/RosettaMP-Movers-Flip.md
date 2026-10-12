## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com) 
- Rebecca Alford (rfalford12@gmail.com)
- IP responsable: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 2/8/18

## Descripción

Este Mover voltea un Pose, o parte de él, en la membrana y solo se ha probado con una membrana fija y una proteína móvil. Los argumentos posibles son el número de jump a lo largo del cual se voltea el compañero situado aguas abajo, el eje de volteo y el ángulo de rotación. En el constructor predeterminado, estos valores son el jump de membrana, un ángulo de 180 grados y el eje x como eje de rotación. También existe la opción de establecer un ángulo de volteo aleatorio en la membrana o de fijar el rango de la desviación angular máxima respecto a la normal de la membrana. 

## Código y demo

El Mover se encuentra en `main/source/src/protocols/membrane`.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles en la interfaz de RosettaScripts:

`jump_num` - Entero - Indica el número de jump.
`axisx` - Entero - Indica el valor x del eje de rotación.
`axisy` - Entero - Indica el valor y del eje de rotación.
`axisz` - Entero - Indica el valor z del eje de rotación.
`angle` - Real - Indica el ángulo de rotación en grados.
`random_angle` - bool - Ángulo de volteo aleatorio en la membrana entre 135 y 225 grados.
`max_angle_dev` - Real - Indica la desviación angular máxima respecto a 180 grados.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::spanfiles <spanfile>` | Añade un spanfile al registrar las opciones desde la línea de comando. |

## Referencia

RosettaMP se describe en 

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (in press)

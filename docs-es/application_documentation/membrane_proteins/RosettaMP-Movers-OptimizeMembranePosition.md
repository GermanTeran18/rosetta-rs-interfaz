# Movers para muestrear la posición de la membrana: OptimizeMembranePositionMover

## Descripción

Este Mover optimiza la posición y la orientación de la membrana alrededor de la proteína (la proteína es fija y la membrana es móvil) usando la función de puntuación de membrana de alta resolución (mpframework_smooth_fa_2012). Muestrea profundidades de membrana de +/- 10A alrededor de la profundidad inicial (calculada a partir de los tramos transmembrana y las coordenadas) en pasos de 0.1A. También muestrea ángulos en pasos de 0.5 grados alrededor de la orientación inicial, dentro de un rango de +/- 45 grados a lo largo de los siguientes ejes, de manera independiente: x, y, xy, -xy. El muestreo es de fuerza bruta y, por tanto, el resultado es determinista.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles en la interfaz de RosettaScripts:

`sfxn` - Cadena de texto - Indica el archivo de pesos de la función de puntuación.
`score_best` - Real - Indica la mejor puntuación.
`starting_z` - Real - Indica el valor z inicial para la búsqueda del centro.
`stepsize_z` - Real - Indica el tamaño de paso z para la búsqueda del centro.
`stepsize_angle` - Real - Indica el tamaño de paso del ángulo para la búsqueda de la normal.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::spanfiles <spanfile>` | Añade spanfiles al registrar las opciones desde la línea de comando |

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press


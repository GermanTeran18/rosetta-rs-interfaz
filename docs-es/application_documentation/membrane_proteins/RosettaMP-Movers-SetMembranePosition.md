# Movers para muestrear la posición de la membrana: SetMembranePositionMover

## Descripción

Este Mover funciona tanto con una membrana fija y un Pose móvil como a la inversa. Establece el centro y la normal del residuo de membrana sin actualizar las coordenadas del resto del Pose. Cabe señalar que este mover no optimiza continuamente el centro y la normal de la membrana con un esquema de minimización.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles mediante RosettaScripts:
`center` - Float - Centro deseado de la bicapa de membrana.
`normal` - Float - Normal deseada de la bicapa de membrana.

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencia

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press


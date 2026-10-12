# Movers de inicialización: AddMPLigandMover

## Descripción

Este mover añade un único ligando a un Pose de membrana y reorganiza el FoldTree de modo que el ligando quede anclado al residuo más cercano al bolsillo de unión. El residuo de membrana se ancla al centro de masa de la proteína. 

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles mediante RosettaScripts:
`closest_rsd` - Entero - Indica el número del residuo más cercano al bolsillo de unión al que debe anclarse el ligando.
`ligand_seqpos` - Entero - Indica el número de residuo que debe tener el ligando. 

TODO: ¡añadir las opciones para la línea de comando!

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press

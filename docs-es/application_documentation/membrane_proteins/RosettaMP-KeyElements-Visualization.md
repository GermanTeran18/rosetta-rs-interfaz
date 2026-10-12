# Visualización de la membrana con el visor de PyMOL (RosettaMP)

## Descripción

El marco de membrana de Rosetta interactúa con Pymol a través del PyMOL Mover. Para más información, consulta la página general de visualización. Cuando se usa el marco de membrana, se visualizan dos planos de membrana que se actualizan en tiempo real durante una simulación de Rosetta. Para ejecutarlo

1. abre primero pymol
2. ejecuta dentro de Pymol el script PymolPyRosettaServer.py (ubicado en tu carpeta de PyRosetta)
3. ejecuta tu script de Rosetta desde la terminal normal
4. luego recuéstate, mira y disfruta de unas palomitas.

## Línea de comando

`-show_simulation_in_pymol 0` invoca el PymolMover, que actualiza la proteína en Pymol en cada fotograma. Si la proteína es una proteína de membrana, la membrana se mostrará automáticamente. 


## Referencias
* Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press - Rosetta Revision #57518

* Baugh EH, Lyskov S, Weitzner BD, Gray JJ (2011) Real-Time PyMOL Visualization for Rosetta and PyRosetta. PLoS ONE 6(8): e21931.

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

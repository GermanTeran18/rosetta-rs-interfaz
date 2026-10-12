# SetupForDensityScoring
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SetupForDensityScoring

Inicializa el Pose para usar la puntuación de densidad.

[[include:mover_SetupForDensityScoring_type]]

Por defecto, este mover funciona de forma equivalente al [[VirtualRootMover]], añadiendo (incondicionalmente) un residuo virtual a la raíz del FoldTree. Esto permite que la proteína se mueva libremente contra el fondo fijo de la densidad.

Si fijas la opción `realign` en "min" (el único otro valor válido), también intentará hacer una minimización de cuerpo rígido del Pose dentro del mapa de densidad. (El mapa de densidad no se proporciona al mover, sino que debe pasarse con las opciones de línea de comandos adecuadas. Consulta [[density map scoring]] para más detalles.)

##Véase también

* [[Density Map Scoring]]
* [[VirtualRootMover]]
* [[FoldTree overview]]
* [[I want to do x]]


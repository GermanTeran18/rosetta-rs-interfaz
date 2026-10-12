# Aplicación de RosettaMP: visualización con el mover de PyMOL

## Código y demo
El visor de PyMOL para visualizar la bicapa de membrana se puede usar con cualquier aplicación de Rosetta con una sola opción adicional. También ofrecemos una aplicación para ver explícitamente los modelos de salida en el código C++: 

También se encuentra una aplicación independiente en `Rosetta/main/source/src/apps/public/membrane/mp_viewer.cc` 

También se encuentra una demo en `Rosetta/demos/protocol_captures/mp_pymol_viewer`

Revisión de Rosetta n.º 58096

## Antecedentes
Visualizar la bicapa de membrana es importante para analizar modelos de membrana y depurar protocolos. En particular, permite responder preguntas sobre las interacciones en las distintas capas hidrofóbicas, la incrustación en la membrana y la orientación. Esta aplicación permite visualizar los modelos de salida de Rosetta con el visor PyMOL de Rosetta. Esta herramienta usa la posición de la bicapa descrita por el marco de membrana para derivar la posición de dos planos paralelos separados por el doble del grosor de la membrana. Estos planos se modelan como objetos CGO en PyMOL y se dibujan sobre la marcha durante las simulaciones. Esta herramienta también se puede usar en tiempo real durante las simulaciones con cualquier aplicación de Rosetta compatible con JD2, usando el mismo conjunto de opciones. 

## Opciones

La aplicación del visor de membrana de PyMOL necesita el spanfile como entrada. 

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-mp:setup:spanfiles|Spanfile que describe la topología transmembrana de la estructura de partida|Cadena de texto|
|-mp:setup:position_from_topo|Inicializa y determina la posición de la membrana a partir de los tramos transmembrana de la proteína|Booleano |
|-show_simulation_in_pymol 0|Usa el visor de PyMOL para visualizar los planos de membrana de las estructuras|Booleano|
|-keep_pymol_simulation_history 1|opcional para hacer películas en PyMOL: conserva el historial de fotogramas en PyMOL|Booleano|
|-packing:prepack_missing_sidechains false|Espera para reempaquetar las cadenas laterales durante la inicialización del pdb hasta que el Pose de membrana esté completamente inicializado con el marco de membrana|Booleano|

## Líneas de comando de ejemplo
Para ejecutar la aplicación de visualización de proteínas de membrana sobre modelos de Rosetta ya generados, usa la siguiente línea de comando: 

`./mp_viewer.<exe> -database /path/to/my/rosettadb @flags`


## Referencias
1. Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press 

2. Baugh EH, Lyskov S, Weitzner BD, Gray JJ (2011) Real-Time PyMOL Visualization for Rosetta and PyRosetta. PLoS ONE 6: e21931.

3. DeLano W (n.d.) The PyMOL Manual: Compiled Graphics Objects (CGOs) and Molscript Ribbons. Available: http://pymol.sourceforge.net/newman/user/toc.html.

## Contacto

Preguntas y comentarios a: 
 - Rebecca F. Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

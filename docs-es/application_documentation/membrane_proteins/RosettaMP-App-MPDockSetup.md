# Aplicación de RosettaMP: preparación del docking proteína-proteína de membrana (MPDockSetup)

## Código y demo
La aplicación se encuentra en `Rosetta/main/source/src/apps/public/membrane/mp_dock_setup.cc`.

Una demo del código se encuentra como parte de la demo de MPDock en `Rosetta/demos/protocol_captures/mp_dock`

Revisión de Rosetta n.º 58096

## Descripción del algoritmo
Esta aplicación lee dos PDB de proteínas de membrana y sus spanfiles correspondientes. Después, cada estructura se transforma por separado a coordenadas de membrana (se puede usar la función de puntuación para optimizar cada componente) y se concatenan en un único archivo PDB de salida y un único spanfile. También se generan spanfiles renumerados para cada cadena. La membrana queda fija con centro en [0, 0, 0] y normal [0, 0, 15].

## Ejecutar la aplicación

Opciones de ejemplo: 

```
Rosetta/main/source/bin/mp_dock_setup.macosclangrelease \
-database Rosetta/main/database \
-in:file:s 1AFO_A.pdb 1AFO_B.pdb \
-mp:setup:spanfiles 1AFO_A.span 1AFO_B.span \ 
```

**Nota: ¡¡¡asegúrate de que el orden de los spanfiles coincida con el orden de los archivos PDB!!!**

## Referencias

1. Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press

## Contacto

Preguntas y comentarios a: 
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - Rebecca F. Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))



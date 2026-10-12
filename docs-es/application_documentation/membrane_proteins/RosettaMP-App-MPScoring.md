# Aplicaciones de RosettaMP: extensión de Score JD2

## Código y demo
Esta aplicación usa Movers de RosettaMP. La aplicación score_jd2 se encuentra en `public/analysis/score_jd2.cc`. El material suplementario del artículo citado más abajo también describe su uso. 

## Descripción del algoritmo
Puntuar una proteína de membrana con una función de puntuación definida es una de las funcionalidades más básicas y necesarias. Para ello, adaptamos la aplicación score_jd2 y la hicimos aplicable (al menos en parte) a proteínas de membrana. 

Revisión de Rosetta n.º 58096

## Ejecutar la aplicación

Esta aplicación tiene dos modos: 

**1) Con una membrana fija y una proteína fija.** Puntúa la proteína tal como está y exige que la proteína ya esté transformada a coordenadas de membrana (consulta [[PDB-file]] para ver cómo hacerlo). Actualmente solo funciona si se proporciona un spanfile, que se puede generar a partir de la estructura transformada (consulta la aplicación MPSpanfileFromPDB). Opciones de ejemplo: 

```
Rosetta/main/source/bin/score_jd2.macosclangrelease \
-database Rosetta/main/database \
-in:file:s 1AFO_tr.pdb \
-in:membrane \
-mp:setup:spanfiles 1AFO__tr.span \
-score:weights mpframework_smooth_fa_2012.wts \
```

**2) Con una membrana fija y una proteína móvil.** Primero transforma la proteína a coordenadas de membrana y después la puntúa. No exige que la proteína esté transformada a coordenadas de membrana y funciona con un archivo PDB limpio normal. Sin embargo, requiere un spanfile como entrada. Opciones de ejemplo: 

```
Rosetta/main/source/bin/score_jd2.macosclangrelease \
-database Rosetta/main/database \
-in:file:s 1AFO.pdb \
-in:membrane \
-mp:setup:spanfiles 1AFO__tr.span \
-mp:setup:transform_into_membrane \
-score:weights mpframework_smooth_fa_2012.wts \
```

¡Ambas aplicaciones solo puntúan la proteína y no optimizan la posición de la membrana con la función de puntuación! Usa las opciones de la siguiente sección para cambiar la configuración. 
Nota: asegúrate de que la numeración del archivo PDB y la del spanfile coincidan.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::transform_into_membrane <bool>` | Necesaria para puntuar proteínas de membrana. Añade esta opción para transformar el Pose de la proteína a la membrana.|
|`-mp::transform::optimize_embedding <bool>` | Usa la función de puntuación para optimizar la incrustación tras una configuración inicial de grano grueso.|

## Cita
Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol; 11(9).

Koehler Leman J, Mueller BK, Gray JJ (2017). Expanding the toolkit for membrane protein modeling in Rosetta. Bioinformatics; 33(5).

## Contacto

Preguntas y comentarios a: 
 - Rebecca F. Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))



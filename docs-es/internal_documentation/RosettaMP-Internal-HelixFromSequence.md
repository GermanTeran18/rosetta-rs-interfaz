## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com)
- Investigador principal correspondiente: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 8/12/15

## Descripción del algoritmo

Esta aplicación lee una secuencia de un archivo fasta, crea un Pose con ángulos de hélice ideales y lo escribe en un archivo PDB ("helix_from_sequence.pdb"). Si la proteína es una proteína de membrana, también puede transformar la hélice dentro de la membrana. Para ello se definen dos variables a partir de las coordenadas Calpha del primer y el último residuo de la hélice: (1) el centro es el punto medio entre las dos coordenadas Calpha y (2) la normal es el vector entre las dos coordenadas Calpha. El sistema de coordenadas de membrana por defecto se define con un centro en (0, 0, 0) y una normal de (0, 0, 1). La hélice se transforma al sistema de coordenadas de la membrana de modo que el centro de la hélice coincida con el centro de la membrana y la normal de la hélice coincida con la normal de la membrana.

## Código y demo
La aplicación se encuentra en `apps/pilot/jkleman/helix_from_sequence.cc`. Usa Movers del marco RosettaMP. Hay una prueba de integración disponible en `Rosetta/main/tests/integration/tests/helix_from_sequence`. 

## Ejecutar la aplicación
El archivo de entrada es un único archivo PDB y un único spanfile, que se puede generar con la aplicación mp_docking_setup. Opciones de ejemplo para encontrar la interfaz:

```
Rosetta/main/source/bin/helix_from_sequence.macosclangrelease \
-database Rosetta/main/database \
-in:file:s 1AFO_tr.pdb \
-mp:setup:transform_into_membrane 1 \      # optional boolean: transforms helix into membrane
```

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::transform::optimize_embedding <bool>` | Usa la función de puntuación para optimizar el embebido después de un ajuste inicial de grano grueso. |
|`-mp::setup::transform_into_membrane <bool>` | Agrega esta opción para transformar la hélice dentro de una membrana fija.|


## Referencia
Este protocolo aún no se ha publicado. El marco y el protocolo anterior se publicaron en:

Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (under revision)

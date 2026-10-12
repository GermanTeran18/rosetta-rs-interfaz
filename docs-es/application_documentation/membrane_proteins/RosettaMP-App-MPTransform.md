# Aplicación de RosettaMP: transformación a coordenadas de membrana (mp_transform)

## Código y demo
La aplicación se encuentra en `Rosetta/main/source/src/apps/public/membrane/mp_transform.cc` 

Una prueba de integración se encuentra en `Rosetta/main/tests/integration/tests/mp_transform`

Revisión de Rosetta n.º 58069

## Antecedentes

Para que las aplicaciones basadas en RosettaMP funcionen correctamente, la proteína debe estar transformada al marco de coordenadas de membrana; es decir, hay que indicarle a Rosetta en qué lugar alrededor de la proteína está la membrana. Esto se hace uniendo un residuo de membrana a la proteína, con un punto central y un vector normal que definen el centro y la normal de la membrana. La aplicación mp_transform usa la información del spanfile para calcular la incrustación de la proteína en la membrana. Para ello calcula el centro y los vectores normales de cada tramo a partir de las coordenadas CA inicial y final del tramo, y luego los promedia. La proteína se transforma (es decir, se mueve) a una membrana fija con el centro de la membrana en (0, 0, 0) y la normal de la membrana en (0, 0, 1). En esta aplicación, la incrustación de la proteína en la membrana NO se optimiza con la función de puntuación.

## Ejecutar la aplicación

Esta aplicación requiere un spanfile como entrada y se puede ejecutar con la siguiente línea de comando: 

```
Rosetta/main/source/bin/mp_transform.macosclangrelease \
-in:file:s 1AFO.pdb \
-mp:setup:spanfiles 1AFO.span \
```

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::transform::optimize_embedding <bool>` | Usa la función de puntuación para optimizar la incrustación tras una configuración inicial de grano grueso.|

## Cita
Revisión de Rosetta n.º 57715

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol; 11(9).

Koehler Leman J, Mueller BK, Gray JJ (2017). Expanding the toolkit for membrane protein modeling in Rosetta. Bioinformatics; 33(5).

## Contacto

Preguntas y comentarios a: 
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - Rebecca F. Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

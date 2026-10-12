## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com)
- Rebecca Alford (rfalford12@gmail.com)
- IP responsable: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 2/8/18

## Descripción

Este Mover optimiza la incrustación de la proteína en la membrana con la función de puntuación suave de alta resolución: transforma la proteína a la membrana, optimiza la posición de la membrana (flexible) y usa la incrustación optimizada para reposicionar la proteína en la membrana.

## Código y demo

El Mover se encuentra en `main/source/src/protocols/membrane/`.

## Interfaz de RosettaScripts

TODO: por ahora no es compatible con RosettaScripts. 

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::transform::optimize_embedding <bool>` | Usa la función de puntuación para optimizar la incrustación tras una configuración inicial de grano grueso. |

## Referencia

RosettaMP se describe en 

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (in press)

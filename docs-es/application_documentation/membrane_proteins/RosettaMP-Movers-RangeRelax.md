## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com)
- Rebecca Alford (rfalford12@gmail.com)
- IP responsable: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 2/8/18

## Descripción

Este Mover relaja una proteína de membrana relajando iterativamente rangos de la proteína; no requiere rampas. Es mucho más rápido que FastRelax y adecuado para proteínas grandes y muy grandes (probado hasta con 5250 residuos).

## Código y demo

El Mover se encuentra en `main/source/src/protocols/relax/membrane/`.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles en la interfaz de RosettaScripts:

`native` - Cadena de texto - Indica el archivo PDB nativo.
`sfxn` - Cadena de texto - Indica el nombre del archivo de pesos de la función de puntuación.
`center_resnumber` - Entero - Indica el número del residuo central.
`set_tm_helical` - bool - Establece estructura secundaria helicoidal en la región TM.
`optmem` - bool - Activa la opción de optimizar la membrana.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::transform::optimize_embedding <bool>` | Usa la función de puntuación para optimizar la incrustación tras una configuración inicial de grano grueso. |

## Referencia

RosettaMP se describe en 

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (in press)

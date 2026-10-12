## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com)
- Rebecca Alford (rfalford12@gmail.com)
- IP responsable: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 2/8/18

## Descripción

Este Mover hace docking de dos proteínas de membrana. Añade componentes de membrana al Pose y luego hace docking de las proteínas a lo largo del jump flexible. **Supone que la proteína 1 está fija en la membrana.** 

## Código y demo

El Mover se encuentra en `main/source/src/protocols/docking/membrane/`.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles en la interfaz de RosettaScripts:

`cen_sfxn_weights` - string - Establece los pesos de la función de puntuación de baja resolución.
`fa_sfxn_weights` - string - Establece los pesos de la función de puntuación de alta resolución.
`center` - RealVector - Centro de la membrana x, y, z.
`normal` - RealVector  - normal de la membrana x, y, z.
`jump_num` - Size - Descripción.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::dock::weights_cen <String>` | Función de puntuación del paso de baja resolución. |
|`-mp::dock::weights_fa <String>` | Función de puntuación del paso de alta resolución. |

## Referencia

RosettaMP se describe en 

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (in press)

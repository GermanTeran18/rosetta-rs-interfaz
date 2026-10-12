## Metadatos

Preguntas y comentarios a:

- Julia Koehler Leman (julia.koehler1982@gmail.com)
- Rebecca Alford (rfalford12@gmail.com)
- IP responsable: Jeffrey J. Gray (jgray@jhu.edu)

Última actualización: 2/8/18

## Descripción

Este Mover calcula qué residuos son accesibles a los lípidos y guarda esa información en los factores B: 50 es accesible a los lípidos y 0 es INaccesible a los lípidos. 

## Código y demo

El Mover se encuentra en `main/source/src/protocols/membrane/`.

Algoritmo: primero, establece el factor B en cero para todos los átomos. Después calcula las envolventes cóncava y externa y recorre las rebanadas. Los residuos que están en el límite están expuestos a los lípidos. Si el ángulo entre COM-CA-CB es menor que el umbral, no está expuesto a los lípidos.

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles en la interfaz de RosettaScripts:

`angle_cutoff` - Real - Indica el umbral del ángulo.
`slice_width` - Real - Indica el ancho de la rebanada.
`shell_radius` - Real - Indica el radio de la capa.
`dist_cutoff` - Real - Indica el umbral de distancia.
`tm_alpha` - bool - Indica el valor de tm_alpha.


## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::lipid_acc::angle_cutoff <Real>` | Umbral del ángulo CA-CB-COM para identificar los residuos accesibles a los lípidos, en grados. < 90 mira hacia el COM, > 90 mira en sentido contrario al COM. Predeterminado = 65. Para proteínas más pequeñas como los GPCR (número de tramos <= 7), predeterminado = 45. |
|`-mp::lipid_acc::slice_width <Real>` | Ancho de la rebanada en Angstrom para calcular la envolvente. Predeterminado = 10.0.  |
|`-mp::lipid_acc::shell_radius <Real>` | Radio de la capa a partir de los átomos más externos que aún se cuentan como límite, es decir, qué grosor tiene la capa expuesta a los lípidos desde el exterior. Predeterminado = 6.0. |
|`-mp::lipid_acc::dist_cutoff <Real>` | Las distancias entre átomos del límite mayores que este umbral (en 2D) se recortarán. Todo lo que sea mayor se conservará como átomos del límite. Predeterminado = 10.0. |
|`-mp::lipid_acc::tm_alpha <Bool>` | ¿La estructura secundaria principal en la membrana es helicoidal? Predeterminado = true.  |

## Referencia

RosettaMP se describe en 

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015) An integrated framework advancing membrane protein modeling and design, PLoS Computational Biology (in press)

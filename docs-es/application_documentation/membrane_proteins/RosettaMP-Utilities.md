# Utilidades con opciones de RosettaMP

## Metrics.cc

**Descripción**

Este archivo contiene protocolos específicos del docking de baja resolución.

metrics.cc se encuentra en `main/source/src/protocols/docking/metrics.cc`

**Opciones**

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::spanfiles <spanfile>` | Añade esta opción antes de calcular la energía de interacción para calcular la energía de proteínas de membrana. |

## Util.cc (temporal) 

**Descripción**

Este archivo contiene funciones de utilidad para RosettaMP.

Este util.cc se encuentra en `main/source/src/core/conformation/membrane/util.cc`

**Opciones**

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::spanfiles <spanfile>` | Añade esta opción para leer el spanfile especificado por el usuario. |

## Util.cc

**Descripción**

Este archivo contiene varios grupos de utilidades para trabajar con RosettaMP:

- Calcular el RMSD entre los dominios transmembrana de dos Poses (con o sin superposición)
- Calcular la inclinación de la proteína respecto a la normal de la membrana
- Comprobaciones de seguridad y métodos de conveniencia para trabajar con foldtrees de membrana
- Utilidad para acceder a la estructura secundaria DSSP y a las coordenadas z
- Calcular la incrustación de la proteína a partir de la estructura
- Dividir la topología por jump, y otras funciones para varias cadenas (o compañeros)

Este util.cc se encuentra en `main/source/src/protocols/membrane/util.cc`

**Opciones**

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::center <three real numbers defining the center point>` | Establece de forma segura el vector del centro al leer desde la línea de comando. |
|`-mp::setup::normal <three real numbers defining the normal vector>` | Establece de forma segura el vector normal al leer desde la línea de comando. |

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press

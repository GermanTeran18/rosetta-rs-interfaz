# Movers para muestrear la incrustación de la proteína: Transform Into Membrane Mover

## Descripción

Este Mover transforma la proteína a coordenadas de membrana. Por defecto, la incrustación se calcula a partir de los tramos transmembrana y las coordenadas de los Cα, pero también se puede usar una incrustación definida por el usuario. Por defecto, las coordenadas de la membrana se toman de MembraneInfo, pero se pueden usar coordenadas de membrana predeterminadas (centro en [0, 0, 0] y normal en [0, 0, 1]) o coordenadas definidas por el usuario. Este Mover transforma las coordenadas de la proteína a las de la membrana de modo que los centros y las normales del EmbeddingDef global y de la membrana coincidan. Funciona tanto con una membrana fija y una proteína móvil como a la inversa. 

## Interfaz de RosettaScripts

Las siguientes opciones están disponibles mediante RosettaScripts:
`center` - 3 Floats - Centro deseado de la bicapa de membrana.
`normal` - 3 Floats - Normal deseada de la bicapa de membrana.

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::setup::center <XYZ-Vector of Real Numbers>` | Opcional; el usuario puede indicar la coordenada del centro de membrana deseada. |
|`-mp::setup::normal <XYZ-Vector of Real Numbers>` | Opcional; el usuario puede indicar el vector normal de membrana deseado. |

## Ejecutar la aplicación

```
Rosetta/main/source/bin/mp_transform.macosclangrelease \
-database Rosetta/main/database \
-in:file:s 1AFO_tr.pdb \
-mp:setup:center 0 0 0 \	#optional: xyz coordinates of membrane center (3 floats)
-mp:setup:normal 0 0 1 \ 	#optional: normal vector of membrane bilayer (3 floats)
-mp:transform:optimize_embedding true \ #optional: optimize the protein embedding in the membrane after transformation (in the code this happens before)
```
## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press



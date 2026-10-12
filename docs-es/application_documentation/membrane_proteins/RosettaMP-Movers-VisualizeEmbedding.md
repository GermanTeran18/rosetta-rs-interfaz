# Movers de visualización: Visualize Embedding Mover

## Descripción

Este Mover se puede usar para visualizar los centros y las normales de incrustación en el archivo PDB y, por tanto, en Pymol o en programas de visualización. Añade HETATM al archivo PDB de salida que representan los centros y las normales de cada tramo transmembrana y de la incrustación global. Este Mover DEBE llamarse al final del protocolo para obtener la incrustación correcta (ya que la incrustación podría ser modificada por movers que se llamen después y porque MembraneInfo no hace seguimiento de la incrustación como lo hace con el residuo de membrana).

## Interfaz de RosettaScripts

Por ahora, este Mover no es compatible con RosettaScripts. 

## Opciones

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-mp::visualize::embedding <bool>` | Añade esta opción para visualizar los centros y las normales de incrustación. Necesaria para que funcione VisualizeEmbeddingMover.|
|`-mp::visualize::spacing <Real>` | Establece la separación de los residuos virtuales de membrana que representan los planos de la membrana. Predeterminado = 5. Inicializa desde la línea de comando si usas un valor distinto del predeterminado.|
|`-mp::visualize::width <Real>` | Ancho de los planos de membrana para un plano de n por n. Predeterminado = 100. Inicializa desde la línea de comando si usas un valor distinto del predeterminado.|
|`-mp::visualize::thickness <Real>` | Grosor de la membrana que se visualiza. Predeterminado = 12.5|

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press



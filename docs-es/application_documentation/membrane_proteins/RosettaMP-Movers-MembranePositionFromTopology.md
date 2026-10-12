# Movers para muestrear la posición de la membrana: MembranePositionFromTopology

## Descripción

Este mover calcula la posición y la orientación de la membrana a partir del conocimiento de los tramos transmembrana (en el objeto SpanningTopology) y de las coordenadas de los Cα, con las que calcula los centros y las normales de cada tramo transmembrana (es decir, objetos EmbeddingDef); luego calcula un promedio y establece el centro y la normal de la membrana en esos valores. 

Este Mover solo se aplica a una proteína fija y una membrana móvil (es decir, uno de los residuos de la proteína está en la raíz del FoldTree). Cabe señalar que este mover no optimiza continuamente el centro y la normal de la membrana con un esquema de minimización, sino que ofrece una primera estimación que se puede refinar después (por ejemplo, con relax de membrana / MembraneRelaxMover o con el OptimizeMembranePositionMover).

## Interfaz de RosettaScripts

Las opciones en RosettaScripts son:
`structure_based` - Booleano - Usa la estructura para establecer la posición de la membrana. Esto requiere que el PDB de entrada ya esté transformado a coordenadas de membrana (por ejemplo, con los servidores PPM o TMDET). 

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press

Nota: Brian no sabe dónde poner estos datos. Al menos aquí serán públicos en la web.

Autor: Brian Coventry 2019

# Descripción
Este gran sitio: [Atlas of Side-Chain and Main-Chain Hydrogen Bonding](http://prowl.rockefeller.edu/aainfo/hbonds.html), recopiló estadísticas sobre las preferencias de enlaces de hidrógeno de los átomos polares enterrados. Esta información es increíblemente útil, pero por desgracia se creó en 1993.

Como el PDB es mucho mayor de lo que era en 1993, se realizó un análisis similar sobre una versión del conjunto de datos PISCES[1] relajada con Rosetta.

## Criterios 

Para considerarse enterrado, un átomo debe cumplir lo siguiente:

1. Con un radio de sonda de 0.9Å, el átomo (y sus H unidos) debe tener SASA 0

2. Usando la profundidad atómica de la superficie molecular[2][3], el átomo debe estar enterrado al menos 5.5Å

En los gráficos de «grupo completo», todos los átomos del grupo deben cumplir los dos criterios anteriores para contarse.

Para considerarse que forma enlaces de hidrógeno:

1. Rosetta beta_nov16 debe clasificar un enlace de hidrógeno con una energía de al menos -0.25 kcal/mol*

\*Nota: bb_donor_acceptor_check() se fijó en False


# Preferencias de enlaces de hidrógeno

## Arginina

[[/images/buried_polars/ARG-NE.png]]
[[/images/buried_polars/ARG-N.png]]
[[/images/buried_polars/G-ARG.png]]

## Asparagina y glutamina

[[/images/buried_polars/AMIDE-N.png]]
[[/images/buried_polars/AMIDE-O.png]]
[[/images/buried_polars/G-AMIDE.png]]
[[/images/buried_polars/G-AMIDE_box.png]]

## Aspartato y glutamato

[[/images/buried_polars/CARB-O.png]]
[[/images/buried_polars/G-CARB.png]]
[[/images/buried_polars/G-CARB_box.png]]

## Histidina

[[/images/buried_polars/HIS-N.png]]
[[/images/buried_polars/G-HIS.png]]


## Lisina

Los datos para 0 enlaces de hidrógeno son sospechosos. El código no estaba escrito correctamente para identificar lisinas con enlaces cruzados y, durante el relax de Rosetta, este decidía a menudo romper los enlaces de hidrógeno de las lisinas.

[[/images/buried_polars/LYS-N.png]]


## Serina y treonina

[[/images/buried_polars/SER-O.png]]
[[/images/buried_polars/SER-H.png]]
[[/images/buried_polars/G-SER.png]]
[[/images/buried_polars/G-SER_box.png]]


## Triptófano

[[/images/buried_polars/TRP-N.png]]


## Tirosina

[[/images/buried_polars/TYR-O.png]]
[[/images/buried_polars/TYR-H.png]]
[[/images/buried_polars/G-TYR.png]]
[[/images/buried_polars/G-TYR_box.png]]


# Notas

Estos números deben interpretarse con cuidado. Aunque muestran el número de enlaces de hidrógeno observados en la naturaleza, el máximo de estos gráficos no coincide necesariamente con el número ideal de enlaces de hidrógeno para la «satisfacción». Hay que recordar que añadir otro enlace de hidrógeno a un átomo polar es un problema con restricciones geométricas; al preparar una proteína para que forme otro enlace de hidrógeno se pierden grados de libertad. Por esta razón, es probable que el número de enlaces de hidrógeno para la «satisfacción» sea mayor que los números presentados.

Por la razón indicada, no se puede calcular directamente a partir de estos datos la energía de un «donador/aceptor de enlace de hidrógeno enterrado e insatisfecho». Hay que tener en cuenta la dificultad de formar un enlace de hidrógeno con un átomo, que probablemente varía según el tipo de cadena lateral y el número de enlaces de hidrógeno ya presentes.


# Citas 
1. G. Wang and R. L. Dunbrack, Jr. PISCES: a protein sequence culling server. Bioinformatics, 19:1589-1591, 2003. 

2. D. Xu, Y. Zhang (2009) Generating Triangulated Macromolecular Surfaces by Euclidean Distance Transform. PLoS ONE 4(12): e8140.

3. D. Xu, H. Li, Y. Zhang (2013) Protein Depth Calculation and the Use for Improving Accuracy of Protein Fold Recognition. Journal of Computational Biology 20(10):805-816.

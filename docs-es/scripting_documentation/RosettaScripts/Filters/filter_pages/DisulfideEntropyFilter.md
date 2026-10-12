# DisulfideEntropy
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## DisulfideEntropy

Calcula el cambio en deltaSconf\_folding causado por la formación de los enlaces disulfuro de una topología dada. S\_conf se refiere solo a la entropía configuracional de la cadena de la proteína.

deltaS\_conf\_folding = S\_conf\_folded - S\_conf\_unfolded

La formación de disulfuros restringe la libertad conformacional del estado desnaturalizado, lo que disminuye S\_conf\_unfolded y aumenta deltaS\_conf\_folding.

deltaG\_folding = deltaH\_folding - T (deltaS\_conf\_folding + deltaS\_other)

Un deltaS\_conf\_folding más positivo lleva a una mayor estabilidad del estado plegado (un deltaG\_folding más negativo).

El cambio en deltaS\_conf\_folding causado por una configuración de disulfuros concreta se calcula modelando el estado desnaturalizado de la proteína con estadística configuracional de vuelo aleatorio según una aproximación gaussiana. Para una visión general y las ecuaciones, consulta "Analysis and Classification of Disulphide Connectivity in Proteins: The Entropic effect of Cross-Linkage", PM Harrison & MJE Sternberg, [J Mol Biol 1994 244, 448-463](http://www.ncbi.nlm.nih.gov/pubmed/7990133) .

En resumen,

deltaS\_conf\_folding = - ln (Pn)
 P\_n = (deltaV (3/(2\*pi\*(b\^2)))\^(3/2))\^n |A\_n|\^(3/2)

donde:

-   n es el número de enlaces disulfuro
-   P\_n es la probabilidad de que todos los residuos que forman pares unidos por disulfuro se asocien "espontáneamente" en el estado desnaturalizado (formen un contacto sin estar restringidos por un enlace disulfuro). deltaV es la capa esférica alrededor de un residuo concreto donde, si hay otro residuo presente, se define que los dos residuos están en contacto (29.65 angstroms\^3)
-   b es la distancia entre monómeros en la cadena del polímero (3.8 angstroms)
-   |A\_n| es el determinante de la matriz A\_n de n por n, donde los elementos de la diagonal (i,i) son el número de conexiones del polímero dentro del loop cerrado que forma cada disulfuro i (un disulfuro que conecta el residuo 3 con el residuo 12 encierra 9 conexiones del polímero), y los elementos fuera de la diagonal (i,j) son el número de conexiones del polímero compartidas entre dos loops de disulfuro distintos i y j (un disulfuro 3x12 y un disulfuro 7x20 comparten 5 conexiones del polímero: 7-8, 8-9, 9-10, 10-11 y 11-12).

Las topologías pasan el filtro si el cambio en deltaS\_conf\_folding causado por la configuración de disulfuros es mayor (más positivo) que un umbral fijo ( `     lower_bound    ` ) y más positivo que un umbral que depende de la longitud de la cadena y del número de disulfuros. El umbral que depende de la longitud de la cadena y de los disulfuros se calculó examinando proteínas naturales con 3-5 disulfuros y 60 residuos o menos, y se calcula así:

umbral = (0.1604 \* residuos) + (1.7245 \* disulfuros) + 5.1477 + `     tightness    `

donde `     tightness    ` lo especifica el usuario. Los valores mayores de tightness dan un umbral más alto (y por tanto más laxo). Con un tightness de cero, el 61% de las proteínas naturales pasan el filtro. Con un tightness de 1, pasan el filtro el 82% de las proteínas naturales, y con un tightness de -1, solo lo pasa el 19%.

```xml
<DisulfideEntropy name="&string" tightness="(0 &Real)" lower_bound="(0 &Real)"/>
```

## Véase también:

* [[DisulfideEntropyFilter]]
* [[DisulfideFilter]]

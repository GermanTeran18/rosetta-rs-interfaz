# AveragePathLength
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## AveragePathLength

Calcula la [longitud media del camino más corto](http://en.wikipedia.org/wiki/Average_path_length) en la "red" de la topología de una proteína de una sola cadena, considerando los residuos como nodos y los enlaces peptídicos y disulfuro como aristas. Las proteínas naturales con muchos disulfuros tienden a elegir configuraciones de disulfuro que minimizan la longitud media del camino, aunque esta es una métrica peor para colocar disulfuros que el más correcto [[DisulfideEntropyFilter]], así que en general ya no hay motivo para usar este filtro.

Las topologías pasan el filtro si su longitud media del camino es menor que un umbral fijo (`max_path_length`) y que un umbral que depende de la longitud de la cadena. El umbral que depende de la longitud de la cadena se calculó examinando proteínas naturales con 3 o más enlaces disulfuro y 60 residuos o menos, y se calcula así:

umbral = (0.1429 n) + 0.8635 + `     path_tightness    `

donde n es el número de residuos de la cadena y `     path_tightness    ` lo especifica el usuario. Los valores mayores de path\_tightness dan un umbral más alto (y por tanto más laxo).

```xml
<AveragePathLength name="&string" path_tightness="(1 &Real)" max_path_length="(10000 &Real)"/>
```

## Véase también:

* [[DisulfideEntropyFilter]]
* [[DisulfideFilter]]

# ResidueLipophilicityFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

Documentación escrita por Jonathan Weinstein jonathan.weinstein@weizmann.ac.il, noviembre de 2017

## ResidueLipophilicityFilter

Basado en el término de energía MPResidueLipophilicity, este filtro calcula la puntuación mp_res_lipo del Pose. Debería equivaler al valor que informa mp_res_lipo en el archivo de puntuación. 
Este filtro también puede imprimir, en stdout o en un archivo, algunos de los cálculos que hace mp_res_solv, sobre todo para depurar y entender mejor el resultado.
```xml
<ResidueLipophilicity name="(& string)" print_splines="(0 &bool)" output_file="(TR &string)" />
```

- print_splines - si se imprimen o no los splines que se encuentran en mp_res_lipo
- output_file - dónde se imprime la tabla de detalles. TR: al tracer. Nombre de archivo: se escribe en el archivo. auto: se imprime en un archivo llamado JOBNAME_RS.txt. "" (cadena vacía): no se imprime ni se guarda en archivo. Por defecto es TR.

## El formato de la tabla:
- residue - número e identidad del residuo
- Z - coordenada z: profundidad en la membrana
- na1 - número de átomos en el radio de 6A
- na2 - número de átomos en el radio de 12A
- sig1 - sigmoide para el radio de 6A
- sig2 - sigmoide para el radio de 12A
- sigx - sig1 por sig2
- cen6N - número de átomos en el radio de 6A en el nivel centroide
- cen6sig - sigmoide para el radio de 6A en modo centroide
- cen12N - número de átomos en el radio de 12A en el nivel centroide
- cen12sig - sigmoide para el radio de 12A en modo centroide
- cen10x12 - multiplicación de las sigmoides del centroide
- cen_score - puntuación del nivel centroide
- scorex - puntuación por la multiplicación del centroide
- score - puntuación del spline

## Véase también
* [[MPResidueLipophilicityEnergy]]

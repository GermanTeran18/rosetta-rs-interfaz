# HSSTriplet
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## HSSTriplet

Evalúa los tripletes hélice-hebra-hebra dados. Calcula la distancia entre el par de hebras y la hélice, y el ángulo entre el plano de la lámina y la hélice. Devuelve true si la distancia está entre min_dist y max_dist, y si el ángulo está entre min_angle y max_angle. También puede informar un valor según output_id y output_type.
```xml
<HSSTriplet name="(&string)" hsstriplets="('' &string)" blueprint="('' &string)" min_dist="(7.5 &Real)" max_dist="(13.0 &Real)" min_angle="(-12.5 &Real)" max_angle="(90.0 &Real)" output_id="(1 &bool)" output_type="('dist' &string)" />
```

-   hsstriplets: una cadena que describe los tripletes HSS. Hay que especificar hsstriplets o blueprint, pero no ambos a la vez. El formato de la cadena es: i,j-k  
     donde i es un entero que indica el número de la hélice, j es un entero que indica el número de hebra de la hebra1 (de N a C), y k es un entero que indica el número de hebra de la hebra2.
-   blueprint: un archivo blueprint que contiene la información de los tripletes HSS en el formato anterior. No se puede usar a la vez que la opción "hsstriplets"
-   min_dist: distancia mínima aceptada desde la hélice hasta el plano de la lámina
-   max_dist: distancia máxima aceptada desde la hélice hasta el plano de la lámina
-   min_angle: ángulo mínimo entre las hebras y la hélice
-   max_angle: ángulo máximo entre las hebras y la hélice
-   output_id: especifica qué triplete HSS de la lista de tripletes HSS de entrada se informará
-   output_type: los valores válidos son "dist" y "angle": dist devuelve la distancia del triplete HSS especificado por output_id, y angle devuelve el ángulo

## Véase también

* [[Modelado ab initio|abinitio-relax]]
* [[Modelado de loops|loopmodel]]
* [[HelixKinkFilter]]
* [[HelixPairingFilter]]
* [[SecondaryStructureFilter]]
* [[SecondaryStructureCountFilter]]
* [[SecondaryStructureHasResidueFilter]]

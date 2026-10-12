# BackrubDD
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## BackrubDD

Realiza muestreo de la cadena principal y de las cadenas laterales al estilo backrub.

```xml
<BackrubDD name="(backrub &string)" partner1="(0 &bool)" partner2="(1 &bool)" interface_distance_cutoff="(8.0 &Real)" moves="(1000 &integer)" sc_move_probability="(0.25 &float)" scorefxn="(score12 &string)" small_move_probability="(0.0 &float)" bbg_move_probability="(0.25 &float)" temperature="(0.6 &float)" task_operations="('' &string)">
        <residue pdb_num/res_num="(&string)"/>
        <span begin="pdb or rosetta-indexed number, eg 10 or 12B &string" end="pdb or rosetta-indexed number, e.g., 20 or 30B &string"/>
</BackrubDD>
```

Con los valores definidos arriba, el backrub solo se aplicará a los residuos 31B, el serial 212 y el tramo serial 10-20. Si no se define ningún residuo ni tramo, por defecto se aplica backrub a todos los residuos de la interfaz del compañero (partner) definido. Ten en cuenta que al poner partner1=1 se hace flexible todo partner1. Añadir segmentos tiene el efecto de sumar esos tramos a la definición predeterminada de interfaz. La temperatura controla la temperatura de aceptación de Monte Carlo. Un valor de 0.1 solo permite movimientos muy pequeños, mientras que 0.6 (el valor predeterminado) permite explorar más. Ten en cuenta que los movimientos pequeños (small) y los bbg\_moves introducen movimientos que, a diferencia del backrub, no se limitan a la región que se manipula y pueden hacer que se muevan también los elementos estructurales posteriores. Esto puede provocar grandes movimientos de palanca si el epítopo que se manipula es una bisagra. Para evitar los efectos de palanca, todos los residuos de una cadena a la que se permite hacer backrub estarán sujetos a movimientos pequeños. Pon small\_move\_probability=0 y bbg\_move\_probability=0 para eliminar esos movimientos.

los bbg\_moves son movimientos gaussianos de la cadena principal (backbone-Gaussian). Consulta The J. Chem. Phys., Vol. 114, pp. 8154-8158.

Nota: desde el 29 de junio de 2011, este mover pasó a llamarse "BackrubDD" en lugar de "Backrub". Los scripts que se ejecuten con versiones de Rosetta posteriores a esa fecha deben actualizarse en consecuencia.

-   pdb\_num/res\_num: consulta la [[documentación de RosettaScripts|RosettaScripts#rosettascripts-conventions_specifying-residues]] para más información.
-   task\_operations: consulta [RepackMinimize](#RepackMinimize)


##Véase también

* [[BackrubMover]]: movimientos de la cadena principal al estilo backrub
* [[Backrub]]: la aplicación backrub
* [[I want to do x]]: guía para elegir un mover

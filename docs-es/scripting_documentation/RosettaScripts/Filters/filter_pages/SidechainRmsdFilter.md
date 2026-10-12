# SidechainRmsd
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SidechainRmsd

Calcula el RMSD de todos los átomos de un solo residuo, con o sin los átomos de la cadena principal. El RMSD calculado es el RMSD automórfico, por lo que compensa los reordenamientos simétricos. (Por ejemplo, los giros del anillo de Phe.) No se hace ninguna superposición antes de calcular el rmsd.

```xml
<SidechainRmsd name="(&string)" res1_(res/pdb)_num="(&string)" res2_(res/pdb)_num="(&string)" reference_name="(&string)" include_backbone="(0 &bool)" threshold="(1.0 &real)" />
```

-   res1\_(pdb/res)\_num: el número de residuo del Pose activo. Véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]
-   res2\_(pdb/res)\_num: el número de residuo del Pose de referencia. Véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]
-   reference\_name: el nombre del Pose de referencia, tal como se guardó con el [[SavePoseMover|Movers-RosettaScripts#SavePoseMover]] . Si no se da, por defecto será la estructura pasada a -in:file:native, si está fijada, o la estructura de entrada, si no.
-   include\_backbone: si se incluye la cadena principal en el cálculo del RMSD. (Se recomienda ponerlo en "true" para ligandos y otros residuos que no tienen cadena principal.)
-   threshold: en un contexto de valor de verdad, el valor máximo de RMSD que se considera que pasa.

## Véase también

* [[RmsdFilter]]
* [[IRmsdFilter]]

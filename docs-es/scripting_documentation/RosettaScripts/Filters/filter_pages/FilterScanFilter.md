# FilterScan
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## FilterScan

Descrito en Whitehead et al., Nat Biotechnol. 30:543

Recorre todas las mutaciones que permiten las `     task_operations    ` y las prueba contra un filtro. Produce un informe de los valores del filtro para cada mutación, así como un resfile que indica qué mutaciones se permiten. El filtro puede trabajar con Poses simétricos; basta usar [[SetupForSymmetryMover]] y ejecutarlo. Él mismo se dará cuenta de que necesita hacer empaquetado simétrico.

```xml
<FilterScan name="(&string)" scorefxn="(score12 &string)" task_operations="(comma separated list)" triage_filter="(true_filter &string)" dump_pdb="(0 &bool)" filter="(&string)" report_all="(0 &bool)" relax_mover="(null &string)" resfile_name="([PDB].resfile &string)" resfile_general_property="('nataa' &string)" delta="(0 &bool)" unbound="(0 &bool)" jump="(1 &int)" rtmin="(0&bool)" delta_filters="(comma delimited list of filters)" score_log_file="('' &string)"/>
```

-   triage\_filter: si este filtro se evalúa como false, la mutación no se incluye en el resfile resultante
-   dump\_pdb: vuelca modelos de cada uno de los mutantes sencillos que pasan el triage\_filter. El pdb se puntúa y se vuelca después de ejecutar el mover de relax. La nomenclatura es: \<nombre del archivo de entrada\>RESxxxRES, donde el sufijo del mutante Ala278-\>Arg será ALA278ARG.
-   filter: se usa solo para informar el valor del Pose en el informe del tracer
-   report\_all: por defecto, solo las mutaciones intentadas que pasan `      triage_filter     ` se evalúan con `      filter     ` y se informan en el informe del tracer. Si `      report_all     ` es true, se informa el valor de `      filter     ` para todas las mutaciones evaluadas. (Ten en cuenta que esto aumenta el número de llamadas a `      filter     ` y, por tanto, el coste computacional.)
-   relax\_mover: después de la mutación, qué mover se usa para el relax (la minimización puede ser buena idea). Este mover se suma al reempaquetado que se hace como parte de la mutación. (El reempaquetado se hace según `      task_operations     `, pero se limita a una capa de 8 Angstroms alrededor de cada residuo mutado.)
-   scorefxn: la función de puntuación que se usa en el reempaquetado de la mutación
-   resfile\_name: el nombre del resfile de salida. Por defecto es lo que se pase en -s en la línea de comandos +".resfile"
-   resfile\_general\_property: qué hacer con todos los demás residuos en el resfile
-   delta: ¿probar el filtro contra una línea base que es el valor del filtro al inicio de la ejecución?
-   unbound: ¿probar el filtro en el estado no unido?
-   jump: si es no unido, qué jump.
-   rtmin: ¿hacer un paso de reempaquetado rtmin antes de los pasos de relax? Mejora el ajuste del residuo mutado, pero puede producir energías ruidosas.
-   delta\_filters: una lista de filtros de tipo DeltaFilter. Más abajo se explica la evaluación de la línea base.
-   score\_log\_file: nombre del archivo donde se ponen los valores de puntuación (salida del filtro por residuo).

Para calcular una línea base, primero se reempaqueta todo el Pose (con include current, sin diseño, inicializado desde la línea de comandos, pero ignorando las operaciones de tarea) y se llama a relax\_mover. Esto puede ser útil para bajar la energía del Pose. Si se especifican delta\_filters, antes de introducir mutaciones en una posición dada se hace la mutación a sí mismo (por ejemplo, Arg25-\>Arg), se reempaqueta/rtmin y se relaja como de costumbre, y se evalúa el valor de cada filtro. Luego estos valores se fijan como líneas base de cada DeltaFilter.

Filter y triage\_filter pueden prestarse a confusión. Puedes usar el mismo filtro para ambos. Triage\_filter puede ser más elaborado, incluyendo sentencias de filtros compuestos, mientras que la opción filter se reserva para filtros que tienen métodos report\_sm con sentido (ddG, energía...).

Los valores que informa filter aparecerán en un Tracer llamado ResidueScan, por lo que -mute all -unmute ResidueScan solo mostrará la información necesaria.

Usa la opción unbound solo en una estructura Prepacked con jump\_number=1; si no, la energía de referencia (línea base) no tendrá ningún sentido.

## Véase también

* [[AlaScanFilter]]
* [[DdgScanFilter]]

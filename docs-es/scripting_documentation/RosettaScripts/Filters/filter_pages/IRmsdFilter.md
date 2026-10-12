# IRmsd
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## IRmsd

Calcula un rmsd de interfaz. El rmsd se calcula sobre todos los átomos de la cadena principal de los residuos que se encuentran en la interfaz de la estructura de referencia. Los residuos de la interfaz son aquellos que están a menos de 8 Angstroms de cualquier residuo del otro lado de la interfaz.

```xml
<IRmsd name="(&string)" jump="(&int 1)" threshold="(&Real 5)" reference_pose="(&string)" scorefxn="(&string talaris2013)" />
```

- jump: qué jump define la interfaz
- threshold: en contextos de valor de verdad, se evalúa como verdadero si el rmsd de interfaz calculado es menor que este valor
- reference_pose: el nombre del Pose respecto al cual se calcula el rmsd. (De SavePoseMover). Si no se da, se usa en su lugar la estructura especificada con -in:file:native. Si no se da ningún Pose nativo ni de referencia, se usa la estructura de entrada.
- scorefxn: la función de puntuación que se usa para calcular la interfaz. (Como la interfaz se define por distancia y no por puntuación, la elección de la función de puntuación no es crítica.)

## Véase también

* [[RmsdFilter]]
* [[SidechainRmsdFilter]]

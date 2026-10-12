# InitializeByBins
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## InitializeByBins

Este mover aleatoriza un tramo de cadena principal de un polímero de forma sesgada, según la probabilidad de transición de un bin de torsión de la cadena principal en la posición i a otro bin de torsión de la cadena principal en la posición i+1. [[Consulta la documentación sobre las probabilidades de transición entre bins|Bin-transition-probabilities-file]] para ver los detalles. Consulta también el [[GeneralizedKICperturber]] "randomize_backbone_by_bins", que hace algo similar a la vez que impone el cierre de la cadena, lo que permite que sea un movimiento local en lugar de global. Ten en cuenta que este mover está pensado para poder usarse con cualquier tipo de residuo polimérico, siempre que pueda generarse un archivo de probabilidades de transición entre bins para el tipo en cuestión.

```xml
<InitializeByBins name="(&string)" bin_params_file="(&string)" start="(0 &int)" end="(0 &int)" />
```
-   bin_params_file: un [[archivo de probabilidades de transición entre bins|Bin-transition-probabilities-file]] que especifica las probabilidades de transición de un bin dado en la posición i a otro bin dado en la posición i+1.
-   start:  el inicio del intervalo de residuos al que se aplicará la perturbación. Si es cero, se fija en el primer residuo de la Pose.
-   end:  el final del intervalo de residuos al que se aplicará la perturbación. Si es cero, se fija en el último residuo de la Pose.


##Véase también

* [[BackrubMover]]
* [[I want to do x]]: guía para elegir un mover

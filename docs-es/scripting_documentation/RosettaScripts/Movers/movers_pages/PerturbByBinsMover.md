# PerturbByBins
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PerturbByBins

Este mover perturba uno o más residuos de un tramo de cadena principal de un polímero de forma sesgada, según los bins de torsión de los dos residuos flanqueantes y la probabilidad de pasar de un bin de torsión de la cadena principal en la posición i a otro bin de torsión de la cadena principal en la posición i+1. Para más detalles, [[consulta la documentación sobre las transiciones de probabilidad entre bins|Bin-transition-probabilities-file]]. Consulta también el [[GeneralizedKICperturber]] "perturb_backbone_by_bins", que hace algo similar a la vez que impone el cierre de la cadena, lo que permite que sea un movimiento local y no global. Ten en cuenta que este mover está pensado para poder usarse con cualquier tipo de residuo polimérico, siempre que se pueda generar un archivo de probabilidades de transición entre bins para el tipo en cuestión.

```xml
<PerturbByBins name="(&string)" bin_params_file="(&string)" start="(0 &int)" end="(0 &int)" must_switch_bins="(false &bool)" repeats="(1 &int)" />
```
-   bin_params_file: un [[archivo de probabilidades de transición entre bins|Bin-transition-probabilities-file]] que especifica las probabilidades de pasar de un bin dado en la posición i a otro bin dado en la posición i+1.
-   start: el inicio del rango de residuos al que se aplicará la perturbación. Si es cero, se fija en el primer residuo del Pose.
-   end: el final del rango de residuos al que se aplicará la perturbación. Si es cero, se fija en el último residuo del Pose.
-   must_switch_bins: si es true, el residuo sobre el que opera este mover se verá obligado a cambiar a un bin de torsión de la cadena principal distinto. Si es false, el residuo tiene cierta probabilidad de permanecer en el mismo bin de torsión de la cadena principal, en cuyo caso sus ángulos de torsión de la cadena principal se elegirán al azar (según la distribución dentro del bin, si esa información está disponible). False por defecto.
-   repeats: el número de veces que se aplica un movimiento, donde un movimiento consiste en elegir un único residuo del rango y aleatorizar su bin de torsión de la cadena principal según las probabilidades de transición con sus vecinos. Por defecto es 1, lo que significa que solo un residuo del rango tendrá alterados sus valores de torsión de la cadena principal.



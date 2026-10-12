# PredesignPerturbMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PredesignPerturbMover

PredesignPerturbMover perturba al azar un ligando en el sitio activo de una proteína. La proteína de entrada se transformará en un contexto de polialanina para los residuos que rodean al ligando. Se hacen varios movimientos aleatorios de rotación y traslación, que luego se aceptan o rechazan según el criterio de Boltzmann con una función de puntuación modificada (sin términos atractivos) (enzdes\_polyA\_min.wts).

Por ahora PredesignPerturbMover solo perturbará el último ligando del Pose (el último jump).

    <PredesignPerturbMover name="(&string)" trans_magnitude="(0.1 &real)" rot_magnitude="(2.0 &real)" dock_trials="(100 &integer)" task_operations="(&string,&string)"/>

-   dock\_trials: el número de pasos de Monte Carlo que se intentan
-   trans\_magnitude: la magnitud (desviación estándar de una gaussiana) del paso de traslación aleatorio que se da en cada uno de los ejes x, y y z (Å)
-   rot\_magnitude: la magnitud (desviación estándar de una gaussiana) del paso de rotación aleatorio que se da en cada uno de los ángulos de Euler (grados)
-   task\_operations: lista de task operations separadas por comas que especifican qué residuos (los indicados como diseñables en la task resultante) se convierten a polyAla



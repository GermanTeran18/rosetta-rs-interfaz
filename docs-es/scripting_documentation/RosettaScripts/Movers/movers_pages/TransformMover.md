# Transform
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Transform

```xml
<Transform name="&string" chain="&string" box_size="&real" move_distance="&real" angle="&real" cycles="&int" repeats="&int" temperature="&real" initial_perturb="&real" initial_angle_pertub="&real" rmsd="&real" optimize_until_score_is_negative="&bool" use_constraints="&bool" cst_fa_file="&string" cst_fa_weight="%real"
ensemble_proteins="&string" use_main_model="&bool" grid_set="&string" />
```

El mover Transform está diseñado para sustituir a los movers Translate, Rotate y SlideTogether, y normalmente converge más rápido y tiene mejor rendimiento científico que ellos. El mover Transform realiza una búsqueda de Monte Carlo del sitio de unión del ligando usando rejillas de puntuación precalculadas. Por ahora, este mover solo admite el docking de un único ligando y requiere que se [[especifiquen y calculen rejillas de puntuación|RosettaScripts#rosettascript-sections_ligands_scoringgrids]].

-   chain: la cadena del ligando, especificada como el ID de cadena del PDB
-   box\_size: la traslación máxima que puede ocurrir desde el punto inicial del ligando. La «caja» es en realidad una esfera con el radio especificado. Se rechazará cualquier movimiento que haga que el centro del ligando salga de este radio
-   move\_distance: la traslación máxima por paso en la búsqueda de Monte Carlo. La distancia debe especificarse en Å. Se elige un valor aleatorio de una distribución gaussiana entre 0 y la distancia especificada.
-   angle: el ángulo de rotación máximo por paso en la búsqueda de Monte Carlo. El ángulo debe especificarse en grados. En cada dimensión se elige un valor aleatorio de una distribución gaussiana entre 0 y el ángulo especificado.
-   cycles: el número total de pasos que se realizan en la simulación de Monte Carlo. El mover devolverá el Pose aceptado de menor puntuación
-   repeats: el número total de repeticiones de la simulación de Monte Carlo que se realizan. Si repeats \> 1, la simulación se realizará el número de veces especificado desde la posición inicial, y el Pose final será el mejor resultado de todas las repeticiones.
-   temperature: la temperatura de Boltzmann para la simulación de Monte Carlo. La temperatura se mantiene constante durante la simulación. Cuanto mayor es el número, mayor es el porcentaje de movimientos aceptados. 5.0 es un buen punto de partida. La «temperatura» aquí no refleja ninguna unidad del mundo real.
-   initial\_perturb: hace una traslación y una rotación iniciales sin puntuar. La traslación se elegirá de forma uniforme dentro de una esfera del radio dado (en Å) alrededor de la posición inicial. Además, el ligando se rotará aleatoriamente 360 grados alrededor de cada uno de los ejes x, y y z. Los valores grandes son útiles en benchmarking para desordenar la posición inicial, y los valores pequeños son útiles para acoplar ligandos con forma de varilla en bolsillos estrechos, donde la naturaleza Monte Carlo del protocolo puede no permitir que el ligando se voltee de extremo a extremo.
-   initial_angle_perturb: controla el tamaño de la perturbación rotacional de initial\_perturb. El eje se elegirá al azar y la cantidad de rotación se elegirá al azar entre cero y el valor dado (en grados).
-   rmsd: el RMSD máximo que se muestrea respecto a la posición inicial. Si se especifica esta opción, se rechazará cualquier movimiento por encima del RMSD especificado.
-   optimize_until_negative: continúa el muestreo más allá de "cycles" si la puntuación es positiva.
-   use_constraints: incorpora la puntuación de restricciones a la puntuación de la rejilla. Requiere un archivo de restricciones y un peso
-   cst_fa_file: archivo del que se leen las restricciones. No se conservan más allá del mover Transform
-   cst_fa_weight: peso de las restricciones fullatom (por defecto = 1.0). No se conserva más allá del mover Transform
-   ensemble_proteins: archivo que enumera archivos PDB adicionales con los que generar rejillas de puntuación 
-   use_main_model: pasa al siguiente mover con el modelo proporcionado mediante in:file:s, independientemente de cuál tenga la mejor puntuación
-   grid_set: la rejilla de puntuación que se usa con la puntuación de Transform. Consulta [[esta sección de la documentación de RosettaScripts|RosettaScripts#rosettascript-sections_ligands_scoringgrids]] para información sobre cómo especificar rejillas de puntuación. Si no se especifica, por defecto es "default".


##Véase también

* [[RenderGridsToKinemageMover]]: calcula y genera rejillas de puntuación.
* [[TranslateMover]]
* [[RotateMover]]
* [[SlideTogetherMover]]
* [[RigidBodyTransMover]]: realiza la traslación de cuerpo rígido de cadenas
* [[I want to do x]]: guía para elegir un mover


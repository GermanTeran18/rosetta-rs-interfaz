<i>Nota: Brian no tuvo tiempo suficiente para escribir esta página. Recuérdaselo y la arreglará. </i>

# PruneBuriedUnsats
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## PruneBuriedUnsats

Elimina los rotámeros que contienen una cadena lateral enterrada sin satisfacer y no hacen ningún otro enlace de hidrógeno de cadena lateral. Normalmente se usa con VBUNS (consulta el [[filtro de grupos enterrados sin satisfacer|scripting_documentation/RosettaScripts/Filters/filter_pages/BuriedUnsatHbondsFilter]]) y con la [[approximate_buried_unsat_penalty|rosetta_basics/scoring/ApproximateBuriedUnsatPenalty]].

     <PruneBuriedUnsats name="(&string)" allow_even_trades="(&bool, false)" atomic_depth_probe_radius="(&Real, 2.3)" atomic_depth_resolution="(&Real, 0.5)" atomic_depth_cutoff="(&Real, 4.5)" minimum_hbond_energy="(&Real, -0.2)" />

Si usas approximate_buried_unsat_penalty, conviene establecer aquí los mismos parámetros que allí.

##Opciones

* allow_even_trades - Permite residuos que satisfacen un grupo sin satisfacer y crean uno nuevo que no se puede satisfacer.
* atomic_depth_probe_radius - Radio de la sonda para el cálculo de la profundidad atómica, que determina el enterramiento.
* atomic_depth_resolution - Resolución de vóxel con la que se calcula la profundidad atómica.
* atomic_depth_cutoff - Profundidad atómica a partir de la cual los átomos se consideran enterrados.
* Energía mínima (sobre el valor típico de Rosetta de -2.0) para que se considere que un enlace de hidrógeno satisface un grupo polar.

##Limitaciones conocidas

Esta TaskOperation no admite por ahora Poses simétricos.

##Créditos
* Longxing Cao tuvo la idea
* Brian Coventry la programó


##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

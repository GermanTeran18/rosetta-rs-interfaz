# LimitAromaChi2
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## LimitAromaChi2

Impide el uso de los rotámeros de PHE, TYR e HIS que tienen chi2 lejos de 90. Estos rotámeros son aceptables para el término de energía de Dunbrack por el suavizado del paisaje de energía, pero en realidad no son físicamente comunes sin otros reordenamientos que Rosetta no logra capturar. Para fines de diseño, es más sencillo quitar estos rotámeros de la consideración al diseñar, ya que casi nunca son realistas en las situaciones en las que Rosetta decide usarlos.  

Ten en cuenta que esta herramienta es INCLUSIVA y no EXCLUSIVA: defines los rotámeros que se conservan, no los que se eliminan.

[[include:to_LimitAromaChi2_type]]

Por defecto, esta herramienta ignora TRP porque el paisaje de energía de TRP es más permisivo para este problema concreto: en algunas zonas del gráfico de Ramachandran, esos rotámeros son correctos. Para aplicar los límites también a TRP, establece `include_trp` en verdadero.

Para entender las distribuciones de rotámeros subyacentes, consulta [la descripción del laboratorio de Dunbrack](http://dunbrack.fccc.edu/bbdep2010/ImagesMovies.php).


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

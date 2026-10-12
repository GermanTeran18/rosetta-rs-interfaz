# ExtraRotamersGeneric
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ExtraRotamersGeneric

Durante el empaquetado se pueden usar rotámeros extra para aumentar el muestreo. Usa esta TaskOperation para especificar de una sola vez, para todos los residuos, qué rotámeros extra se usarán. Nota: *extrachi\_cutoff* se usa para determinar cuántos vecinos debe tener un residuo antes de que se le apliquen los rotámeros extra. Por ejemplo, si quieres aplicar rotámeros extra a todos los residuos, establece *extrachi\_cutoff=0*. Consulta la sección de comandos de rotámeros extra en la página de [[resfiles|resfiles#Extra-Rotamer-Commands:]] para más detalles.

     <ExtraRotamersGeneric name="(&string)"
    ex1="(0 &boolean)" ex2="(0 &boolean)" ex3="(0 &boolean)" ex4="(0 &boolean)"
    ex1aro="(0 &boolean)" ex2aro="(0 &boolean)" ex1aro_exposed="(0 &boolean)" ex2aro_exposed="(0 &boolean)"
    ex1_sample_level="(7 &Size)" ex2_sample_level="(7 &Size)" ex3_sample_level="(7 &Size)" ex4_sample_level="(7 &Size)"
    ex1aro_sample_level="(7 &Size)" ex2aro_sample_level="(7 &Size)" ex1aro_exposed_sample_level="(7 &Size)" ex2aro_exposed_sample_level="(7 &Size)" 
    exdna_sample_level="(7 &Size)"
    extrachi_cutoff="(18 &Size)"/> 

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

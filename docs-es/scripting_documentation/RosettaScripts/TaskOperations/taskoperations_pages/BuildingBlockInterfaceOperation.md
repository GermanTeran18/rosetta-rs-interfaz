# BuildingBlockInterface
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## BuildingBlockInterface

Se usa al diseñar con bloques de construcción simétricos. Impide el reempaquetado en los residuos que: 1) están lejos de la interfaz entre bloques de construcción, o 2) están cerca de la interfaz entre bloques de construcción, pero además hacen contactos de interfaz dentro del propio bloque que no tienen choques.

      <BuildingBlockInterface name="(&string)" nsub_bblock="(1 &Size)" sym_dof_names="" &string) contact_dist="(10.0 &Real)" bblock_dist="(5.0 &Real)" fa_rep_cut="(3.0 &Real)" />

-   nsub\_bblock - El número de subunidades del bloque de construcción simétrico (por ejemplo, 3 para un trímero). Esta opción no es necesaria en los sistemas multicomponente.
-   sym\_dof\_names - Nombres de los sym\_dofs correspondientes a los bloques de construcción simétricos. (A la larga, conviene eliminar la necesidad de esta opción con funciones de utilidad is\_singlecomponent o is\_multicomponent). Si no se especifica ningún sym\_dof\_names, se extraerán del Pose.
-   contact\_dist - Se impide el reempaquetado de los residuos cuyos carbonos beta no estén dentro de esta distancia de ningún carbono beta de otro bloque de construcción.
-   bblock\_dist - La distancia de corte para todos los átomos pesados que se usa para especificar los residuos que hacen contactos entre subunidades dentro del bloque de construcción. Como estos residuos hacen interacciones, presumiblemente importantes, dentro del bloque de construcción, se impide que se reempaqueten a menos que tengan choques.
-   fa\_rep\_cut - El umbral que se usa para determinar si los residuos que hacen contactos entre subunidades dentro del bloque de construcción tienen choques.

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

# InteractingRotamerExplosion
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## InteractingRotamerExplosion

Una TaskOperation que sobremuestrea los rotámeros que puntúan bien con un residuo objetivo especificado (o un conjunto de ellos). Ten en cuenta que esta TaskOP por sí sola no selecciona ni deselecciona posiciones de residuo para diseño. Más bien, construye rotámeros extra de los tipos de residuo y en las posiciones que permitieron las TaskOPs usadas antes. Esto significa que esta TaskOP debe usarse junto con otras TaskOPs que se encarguen de definir qué regiones se diseñan.
Se puede considerar que esta TaskOP funciona como los antiguos protocolos de explosión de rotámeros de Rosetta 2.x.

Si se activa la opción -debug, todos los rotámeros extra generados por esta TaskOperation se escribirán en disco.

Nota: los rotámeros se seleccionan según su puntuación frente a la conformación del residuo objetivo en el Pose; es decir, si los residuos objetivo también son empaquetables, esta TaskOP solo considera su conformación de entrada. En principio, debería ser posible adaptar esta TaskOP para que considere todos los rotámeros del residuo objetivo.

Internamente se usa la RotamerSetOperation src/protocols/toolbox/rotamer_set_operations/AddGood2BPairEnergyRotamers.

**Ejemplo:** el fragmento siguiente configura un PackRotamersMover para sobremuestrear, con ex_level 4 (para todos los chi), los rotámeros que tengan una puntuación de interacción (2Body) mejor que -0.5 REU (en la función de puntuación que se use) con el residuo 5 de la cadena B del Pose. La DesignAroundOperation se encarga de definir qué tipos de residuo se construyen en qué posiciones.

    <TASKOPERATIONS>
        <DesignAround name="desaround" design_shell="12.0" resnums="5B" repack_shell="15.0" allow_design="1" resnums_allow_design="0" />
        <InteractingRotamerExplosion name="rotexpl" ex_level="4" score_cutoff="0.5" target_seqpos="5B" debug="0" />
    </TASKOPERATIONS>
      <MOVERS>
              <PackRotamersMover name="packrot" scorefxn="talaris" task_operations="desaround,rotexpl" />
      </MOVERS>


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

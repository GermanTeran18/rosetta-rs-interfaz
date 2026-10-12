# RestrictDesignToProteinDNAInterface
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## RestrictDesignToProteinDNAInterface

Restringe el diseño y el reempaquetado a los residuos de proteína alrededor de las bases de ADN definidas.

    <RestrictDesignToProteinDNAInterface name="(&string)" dna_defs="(chain.pdb_num.base)" base_only="(1, &bool)" z_cutoff="(0.0, &real)" />

-   dna\_defs: posiciones de ADN alrededor de las cuales diseñar, separadas por comas (p. ej., C.405.THY,C.406.GUA). Las definiciones deben referirse a una sola cadena de ADN; las bases complementarias se obtienen automáticamente. Las bases son ADE, CYT, GUA, THY. La base (y su complementaria) de la estructura inicial se mutará según la definición, salvo que lo impida otra TaskOperation.
-   base\_only: solo se consideran los residuos al alcance de las bases de ADN
-   z\_cutoff: limita las posiciones de interfaz de la proteína a las que tengan una proyección de su vector de distancia sobre el eje del ADN menor que este umbral. Evita diseños demasiado lejanos a lo largo del eje helicoidal



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

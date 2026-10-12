# Términos de guía orientados al diseño

Página creada por Vikram K. Mulligan (vmullig@uw.edu) el 27 de diciembre de 2017.

[[_TOC_]]

## Términos de guía orientados al diseño

Tradicionalmente, la función de puntuación de Rosetta se ha concebido como una función destinada a aproximar la energía conformacional de una proteína u otra macromolécula.  Aunque esto es apropiado para la predicción de estructuras, no es necesariamente el paradigma más útil para el diseño.  Hay dos razones para ello.

Primero, aunque la predicción de estructuras busca encontrar la conformación de menor energía dada una secuencia, el diseño _no_ es el problema inverso: simplemente encontrar la secuencia que minimiza la energía de una conformación deseada no funcionará necesariamente.  Esto se debe a que tal secuencia bien podría tener conformaciones alternativas isoenergéticas, o incluso de menor energía.  Aunque los algoritmos de diseño, como el packer, buscan una secuencia que minimice la energía de la conformación diseñada, idealmente _queremos_ encontrar la secuencia que maximiza la _brecha_ de energía entre la conformación diseñada y todas las conformaciones alternativas.  Hacerlo de manera explícita no suele ser posible por el costo computacional de considerar números astronómicos de conformaciones alternativas durante el diseño.  Sin embargo, veremos cómo se puede hacer de manera implícita.

Segundo, a menudo quien diseña no tiene el objetivo simple de diseñar solo para el plegamiento.  Lo más probable es que quiera diseñar además para un conjunto de funciones: unión, catálisis, ensamblaje en estructuras cuaternarias, evasión del sistema inmunitario, resistencia a proteasas, facilidad de expresión, facilidad de estudio, facilidad de síntesis química, _etc_.  Optimizar con obstinación la energía conformacional impide optimizar otras propiedades deseadas.

Históricamente, ambos problemas se abordaban con un enfoque de prueba y error, en el que durante el diseño se optimizaban exclusivamente las energías y luego se seleccionaban las características deseadas en un paso de filtrado posterior.  La propensión al plegamiento se evaluaba al final, a partir de la predicción de estructuras _ab initio_.  Esto, por supuesto, era un proceso ineficiente que llevaba a descartar muchos diseños, e incluso los diseños que pasaban los filtros y el plegamiento directo _ab initio_ solían estar mal optimizados en cuanto a las características no energéticas de interés.  Afortunadamente, ambos problemas se pueden abordar mejor alterando la función que el packer optimiza durante el diseño.  En lugar de optimizar simplemente una suma de términos energéticos, podemos optimizar una suma de términos energéticos _más_ una suma de términos de guía.  Estos términos de guía permiten a quien diseña imponer restricciones adicionales al proceso de diseño.  Por ejemplo, puede imponer conocimiento previo (_p. ej._ sobre la composición de aminoácidos o características estructurales que favorecen el plegamiento) que guiará al packer hacia soluciones con más probabilidades de tener una gran brecha de energía.  O bien puede imponer requisitos sobre características que _no_ ayudan al plegamiento pero que son necesarias para la producción, la caracterización experimental, la resistencia en el entorno en que el diseño debe funcionar o la función deseada.

Esta página resume los términos de guía orientados al diseño que están disponibles en Rosetta.

## Una nota sobre la descomponibilidad por pares

Históricamente, se exigía que la función de energía de Rosetta fuera descomponible por pares a nivel de residuo para ser compatible con el packer.  Esto significaba que era una suma de términos de energía, cada uno de los cuales era una suma de energías de interacción por pares entre pares de residuos.  Aunque esto limitaba su realismo físico (impidiendo, por ejemplo, considerar explícitamente el medio entre dos residuos que participan en una interacción electrostática), hacía que la función de energía fuera muy rápida de evaluar y más rápida aún de actualizar cuando el packer hacía una sustitución de un solo residuo: en lugar de reevaluar toda la función de energía, el packer solo necesitaba actualizar los términos que involucraban al residuo alterado.  Mejor aún, las energías de interacción por pares de todos los pares posibles de residuos se podían calcular en un precálculo, lo que permitía resolver una sustitución durante una trayectoria del packer con una consulta de tabla muy rápida.  Esto permitía al packer considerar millones de sustituciones a lo largo de una trayectoria de recocido simulado.

Sin embargo, existen muchos términos de guía concebibles que _no_ son descomponibles por pares, pero que aun así son rápidos de calcular y rápidos de actualizar.  Un ejemplo sería un término que penalice la desviación respecto de una composición de aminoácidos deseada.  Un término así tendría que contar el número de aminoácidos de cada tipo, determinar la diferencia respecto de los recuentos deseados e imponer una penalización basada en esa diferencia: un cálculo que es rápido, pero que no se puede descomponer en términos basados en pares de residuos.  Alex Ford y Vikram Mulligan trabajaron para modificar el packer de modo que acepte términos no por pares siempre que se puedan calcular rápidamente o actualizar rápidamente sobre la marcha durante una trayectoria del packer.

## Control por parte del usuario

Normalmente, los términos de guía se pueden activar reponderándolos a pesos distintos de cero.  Esto se puede lograr proporcionando un archivo de pesos personalizado (extensión ```.wts```) o reponderando los términos al declarar la función de puntuación en [[RosettaScripts|RosettaScripts#scorefunctions]] o PyRosetta.  Ciertos términos de guía, como ```aa_composition``` y ```netcharge```, tienen opciones adicionales que se pueden fijar al declarar la función de puntuación o añadiendo datos a un Pose mediante movers especiales, y estas se describen en la documentación de esos términos de guía.

## Uso típico y buenas prácticas

Los términos de guía se usan mejor durante los pasos de diseño de un protocolo, especialmente con protocolos como [[FastDesign|FastDesignMover]] que incluyen rondas alternas de empaquetado y minimización.   Un término de guía dado puede convencer al packer de aceptar rotámeros que de otro modo habría rechazado por pequeños choques estéricos que se pueden aliviar durante la minimización.  Sin embargo, el peso relativo asignado a cada término de guía determina en qué medida influye en el proceso de diseño.  Si el peso es demasiado bajo, un término de guía podría tener muy poco efecto.  Si es demasiado alto, en cambio, podría promover la característica deseada a costa de una geometría razonable, lo que daría peores diseños.  Normalmente hay un rango intermedio en el que un término de guía mejora el diseño.  Optimizar los pesos asignados a los distintos términos de guía es un proceso de ensayo y error que depende del problema de diseño concreto.

Se recomienda que, tras el diseño, cada diseño se someta a una ronda de relajación (_p. ej._ con el [[mover FastRelax|FastRelaxMover]] con la función de energía estándar, _sin_ términos de guía añadidos), para asegurar que los términos de guía no hayan producido una geometría indeseablemente tensionada por un exceso de peso.  También se recomienda aplicar los mismos filtros que se habrían aplicado en ausencia de los términos de guía: si los términos tienen el peso adecuado, deberían dar una tasa mucho mayor de superación de los filtros.

## Términos de guía disponibles en Rosetta

Actualmente, los siguientes términos de guía están disponibles en Rosetta:

| Nombre en el archivo de pesos (nombre de la clase)        | Descripción | ¿Descomponible por pares? |  ¿Derivable? |
| ---------------------------------------- | ----------- | ---------------------- | ---------------- |
| aa_composition ([[AACompositionEnergy]]) | Un término de guía que penaliza la desviación respecto de una composición de aminoácidos deseada, definida por el usuario, en un Pose o en una subregión seleccionada por un selector de residuos.  Esto permite al usuario aplicar información previa sobre la composición de aminoácidos que probablemente favorezca el plegamiento (_p. ej._ desaconsejar demasiados residuos de alanina en un núcleo), que sea necesaria para la expresión (_p. ej._ desaconsejar demasiados residuos de metionina para evitar sitios alternativos de inicio AUG) o que sea necesaria para la función (_p. ej._ favorecer una composición 50/50 polar/hidrofóbica en una interfaz de unión).  La composición deseada se puede fijar por tipo de residuo y/o por propiedades. | No. (Aunque el término es compatible con el packer). | No: no son posibles las derivadas espaciales.  (El minimizador ignora el término). |
| aa_repeat ([[AARepeatEnergy|Repeat-stretch-energy]]) | Un término que desalienta las secuencias repetidas.  Útil para diseñar cuando la caracterización estructural se va a hacer por espectroscopía de RMN, ya que las secuencias repetidas son difíciles de asignar. | No.  (Aunque el término es compatible con el packer). | No: no son posibles las derivadas espaciales.  (El minimizador ignora el término). |
| aspartimide_penalty ([[AspartimidePenaltyEnergy|NC-scorefunction-info#useful-terms-that-can-be-appended-to-scorefunctions_penalty-function-for-aspartimide-promoting-sequences-aspartimide_penalty]]) | Un término que desalienta los pares de residuos adyacentes en la secuencia lineal que favorecen la formación de subproductos indeseables de aspartimida durante la síntesis de péptidos.  Útil al diseñar moléculas que se van a sintetizar químicamente. | Sí. | No: no son posibles las derivadas espaciales.  (El minimizador ignora el término). |
| approximate_buried_unsatsified_penalty ([[ApproximateBuriedUnsatPenalty]]) | Un término que penaliza de forma aproximada los donadores y aceptores de enlaces de hidrógeno enterrados e insatisfechos durante el diseño.  Consulta la página para más detalles | Más o menos.  (Realiza un precálculo de N cuerpos, pero luego lo descompone en términos de dos cuerpos y de un cuerpo). | No. |
| buried_unsatisfied_penalty ([[BuriedUnsatPenalty]]) | Un término que penaliza los donadores y aceptores de enlaces de hidrógeno enterrados e insatisfechos durante el diseño.  Complementa el término `hbnet`, descrito más abajo. | No.  (Aunque el término es compatible con el packer). | No.  (Las derivadas espaciales son posibles, pero aún no están definidas.  Actualmente el minimizador ignora el término). |
| hbnet ([[HBNetEnergy]]) | Un término que favorece las redes de enlaces de hidrógeno durante el diseño mediante una bonificación no lineal basada en el tamaño (_es decir_, el número de residuos) de cada red.  Un enfoque complementario al [[HBNetMover]] de Scott Boyken. | No.  (Aunque el término es compatible con el packer). | No.  (Las derivadas espaciales son posibles, pero aún no están definidas.  Actualmente el minimizador ignora el término). |
| mhc_epitope ([[MHCEpitopeEnergy]]) | Un término de puntuación para penalizar secuencias inmunogénicas.  Varias opciones de configuración permiten usar distintos enfoques de desinmunización. | No. (Aunque el término es compatible con el packer). | No: no son posibles las derivadas espaciales.  (El minimizador ignora el término). |
| netcharge ([[NetChargeEnergy]]) | Un término para penalizar la desviación respecto de una carga neta deseada, definida por el usuario, en todo el Pose o en una subregión seleccionada por un selector de residuos.  Se pueden especificar varias restricciones de carga neta. | No.  (Aunque el término es compatible con el packer). | No: no son posibles las derivadas espaciales.  (El minimizador ignora el término). |
| sap_constraint ([[sap_constraint|rosetta_basics/scoring/sap-constraint]]) | Un término que ayuda a guiar la hidrofobicidad de distintas partes de tu proteína durante el diseño. | No, es fundamentalmente imposible por cómo funciona SAP.  Sin embargo, es totalmente compatible con el packer. | No, de todos modos no querrías esto. Optimizar los rotámeros para disminuir SAP anula el propósito. |
| voids_penalty ([[VoidsPenaltyEnergy]]) | Un término para penalizar huecos o agujeros en el núcleo durante el empaquetado, favoreciendo soluciones de diseño sin huecos.  Gran parte del costo computacional se maneja en un precálculo. | No, aunque de forma trivial (por elevar al cuadrado una suma de términos).  Sin embargo, es totalmente compatible con el packer. | No, aunque en el futuro podrían implementarse derivadas espaciales.  Por ahora, el minimizador ignora este término. |

##Véase también

* [[Scoring explained]]
* [[Score types]]
* [[Centroid vs fullatom]]
* [[Scorefunction history]]
* [[Adding a new energy method to Rosetta|new-energy-method]]
* [[AACompositionEnergy]]
* [[AARepeatEnergy|Repeat-stretch-energy]]
* [[NetChargeEnergy]]
* [[AddCompositionConstraintMover]]
* [[AddNetChargeConstraintMover]]
* [[ClearCompositionConstraintsMover]]
* [[Mover AddHelixSequenceConstraints|AddHelixSequenceConstraintsMover]]
* [[Mover HBNet|HBNetMover]]
* [[VoidsPenaltyEnergy]]
* [[MHCEpitopeEnergy]]
* [[mhc-energy-tools]]
* [[AddMHCEpitopeConstraintMover]]

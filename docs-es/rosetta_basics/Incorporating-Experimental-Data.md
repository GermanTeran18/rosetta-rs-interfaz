#Incorporación de datos experimentales

Los datos experimentales potencialmente útiles adoptan muchas formas.
La propia naturaleza de la simulación Monte Carlo favorece enormemente la incorporación de cualquier tipo de restricción experimental, porque lo único que hace falta es permitir que influya en la distribución de las estructuras generadas. 

##Constraints frente a restraints
Rosetta llama _constraints_ (restricciones) a lo que otros paquetes computacionales llaman _restraints_.
En Rosetta, una restricción no fija un grado de libertad ni lo elimina del muestreo y de la puntuación.
Más bien, añadimos un término de puntuación que penaliza las desviaciones respecto a ciertos valores de ese grado de libertad.
Los restraints no tienen un nombre particular: se trata simplemente de asegurarse de que ese grado de libertad no sea libre, por ejemplo en un [[MoveMap|Glossary#movemap]].

## Estructuras de entrada

En verdad, el mayor sesgo de muestreo de origen experimental en un problema biológico son las estructuras de entrada que puedan estar disponibles.
Después de todo, usas esas estructuras precisamente porque confías en ellas lo suficiente como para _no_ querer hacer una predicción de estructuras _ab initio_, así que quieres el sesgo que supone partir de ellas.
Al mismo tiempo, las estructuras de entrada no son perfectas:
* Las estructuras cristalográficas tienen resolución variable y con frecuencia carecen de hidrógenos.
* Las estructuras cristalográficas muestran una variación de calidad sorprendentemente alta dentro de una misma estructura.
* A la resolución en la que no se pueden visualizar los hidrógenos (al menos el 90% del PDB), los oxígenos y nitrógenos de asparagina y glutamina no se pueden distinguir entre sí (ni los tautómeros de histidina) y con frecuencia se asignan mal.
* Las estructuras de RMN se resuelven con frecuencia mediante unos cientos de restricciones, en lugar de los miles y miles de las estructuras cristalográficas.

Sobre todo, los campos de fuerza usados en estos esfuerzos de optimización son aritmética y algorítmicamente distintos de la función de energía de Rosetta.
Es fundamental obtener estructuras geométricamente similares a la estructura de partida, pero que estén más cerca de un mínimo local de la función de puntuación.
Esto es importante porque cada unidad de energía de tensión en tu estructura de partida puede sesgar de forma inapropiada el muestreo: pueden aceptarse movimientos malos que de otro modo se habrían rechazado, porque alivian una tensión que ya debería haberse resuelto.
Hay una [[explicación completa|preparing-structures]] sobre cómo preparar adecuadamente las estructuras de partida.

## Ejecutables especializados de Rosetta

Rosetta tiene módulos individuales para manejar formas concretas de restricción experimental:

* [[mr_protocols|mr-protocols]] se suele usar _junto con_ Phaser; usa el modelado comparativo de Rosetta para reconstruir a partir de fragmentos los huecos e inserciones de la plantilla, así como la densidad que falta, seguido de una relajación con restricciones a la densidad experimental.
Después puedes volver a usar Phaser para volver a puntuar frente a los datos cristalográficos.
* [[ERRASER]] refina estructuras de ARN a partir de densidad electrónica (datos cristalográficos); constituye un flujo de trabajo de _erraser_minimize_, _swa_rna_analytical_closure_ y _swa_rna_main.
Requiere el uso del programa de refinamiento PHENIX.
* [[loops from density|loops-from-density]] es un script que toma datos electrónicos mal ajustados y un umbral que indica cuánto de la Pose estás dispuesto a reconstruir, y genera archivos «loops» de entrada para el modelado de loops. 
* Los [[archivos de desplazamientos químicos|chemical-shift-file]] aportan datos a diversos protocolos, a menudo denominados colectivamente CSROSETTA, que incorporan restricciones de RMN para refinar estructuras

## Restricciones experimentales  

Con frecuencia te encontrarás con situaciones en las que tienes conocimiento sobre el sistema experimental que no encaja bien en ninguna de las situaciones anteriores, o que aporta información muy escasa o incluso contradictoria.
Esto no es un problema: la capacidad de Rosetta para [[trabajar con restricciones|constraint-file] ayudará a codificar este tipo de información débil.
En particular:
* Las restricciones AmbiguousNMRDistance codifican distancias entre dos átomos; es importante que no distinguen hidrógenos equivalentes por rotación o indistinguibles experimentalmente.
* Las restricciones SiteConstraint penalizan o premian la proximidad de un residuo de una cadena a otra cadena.
	* Internamente, funcionan como AmbiguousConstraints (que se tratan más abajo) que envuelven restricciones AtomPair
	* Un subtipo llamado SiteConstraintResidues restringe que un residuo esté cerca de al menos uno de otros dos residuos
	* FabConstraint penaliza la presencia de residuos que no sean del loop H3 de las CDR en una interfaz anticuerpo-antígeno
* Las restricciones BigBin permiten imponer requisitos amplios a las conformaciones de los residuos (por ejemplo, puedes especificar los residuos que se sabe que tienen diedros cis o que están cerca de conformaciones de hélice levógira).
Así, si sabes que un residuo tiene un ddG grande al mutarlo a alanina, probablemente puedas aplicar una SiteConstraint correspondientemente grande para exigir que esté en el sitio de unión.
(Aunque, ojo, quizá no quieras que tenga la misma magnitud que el ddG.)
* Puedes agrupar restricciones de varias maneras para acomodar datos mutuamente inconsistentes:
    * Una AmbiguousConstraint solo aplica la penalización de menor energía de entre varias restricciones.
Así, si sabes que a dos residuos distantes se les debería aplicar una SiteConstraint, pero no pueden unirse ambos a la vez, envuélvelos en una AmbiguousConstraint y solo se evaluará la que mejor satisfaga tu Pose.
    * De forma similar, una KofNConstraint aplicará las k restricciones más bajas de n.
* Puede que simplemente tengas una cantidad limitada de información estructural que necesitas codificar sin la formalidad de usar un módulo de resolución de estructuras por RMN.
(Por ejemplo, tu colaborador experimental sabe que ciertos datos de NOE sugieren que un residuo dado es helicoidal o que dos átomos de la estructura están próximos, pero no necesariamente tiene datos para ti).
    * Codifica estos datos como AtomPairConstraints y DihedralConstraints.
	Quizá quieras evaluar varias anchuras de pozo o flexibilidades posibles para las funciones correspondientes de esas restricciones.

Recuerda que en estas situaciones usas las restricciones para _mejorar tu muestreo_.
Te enfrentas a un espacio de configuraciones titánico y aterrador, y a un número de estructuras que es, en comparación, lastimosamente pequeño.
Tu objetivo es enriquecer tu nstruct lo mejor que puedas con el mínimo de energía libre _verdadero_ (porque suponemos que los datos experimentales son en gran parte buenos).
Esto significa que las estructuras que salgan de tu protocolo deberían ser bastante robustas.
Supón que tienes un pequeño conjunto de decoys con buena puntuación que salen de tu protocolo.
Deberías poder aplicar el mismo protocolo de muestreo a esos decoys con buena puntuación _sin las restricciones_ y la estructura no debería «reventar».
Las heurísticas para determinar el significado preciso de «reventar» dependen de cada caso, pero es esencial que quites las restricciones y observes el comportamiento de tus supuestos «buenos modelos». 

##Véase también

* [[I want to do x]]: Guías para tipos concretos de perturbaciones estructurales usando RosettaScripts
* [[Resources for learning biophysics and computational modeling]]
* [[CS-Rosetta]]: Usa datos de desplazamientos químicos de ARN con Rosetta para la predicción de estructuras
* [[Solving a Biological Problem]]
* [[Getting Started]]: Una página para quienes empiezan con Rosetta 
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Scripting Documentation]]: Interfaces de scripting para Rosetta

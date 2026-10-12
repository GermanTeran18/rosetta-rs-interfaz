# Penalización por polares enterrados no satisfechos (buried_unsatisfied_penalty) 
Documentación creada por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker, el 19 de abril de 2018.  Última actualización: 22 de abril de 2018.

**Este código aún no está publicado.  Si lo usas, incluye a Vikram K. Mulligan como coautor.**

<i>Nota:  Esta documentación corresponde al término de puntuación `buried_unsatisfied_penalty`, centrado en el diseño, que guía el diseño para eliminar donantes y aceptores de enlaces de hidrógeno enterrados y no satisfechos.  Para información sobre el filtro BuriedUnsatHbonds, que es útil para filtrar </i>a posteriori<i> los diseños con donantes o aceptores de enlaces de hidrógeno enterrados y no satisfechos, consulta [[esta página|BuriedUnsatHbondsFilter]].</i>

[[_TOC_]]

## Propósito

Este término de puntuación, llamado `buried_unsatisfied_penalty`, está pensado para usarse durante el diseño, para dar una penalización a los donantes o aceptores de enlaces de hidrógeno enterrados que no están satisfechos.  Esto guía a los algoritmos de diseño para satisfacer por completo o eliminar los donantes y aceptores de enlaces de hidrógeno enterrados.  Se puede añadir a la función de puntuación usada para el diseño y se puede usar junto con otros términos centrados en el diseño, como el [[término voids_penalty|VoidsPenaltyEnergy]] o el [[término hbnet|HBNetEnergy]].

Aunque los términos de enlaces de hidrógeno por pares pueden fomentar los enlaces de hidrógeno entre residuos, estos términos no pueden penalizar la ausencia de cualquier enlace de hidrógeno en un donante o aceptor dado.  Esto se debe a que la tarea de determinar si un donante o aceptor participa en cero enlaces de hidrógeno es fundamentalmente no descomponible por pares.  El `buried_unsatisfied_penalty` es un término de puntuación no descomponible por pares que, aun así, es compatible con el packer.

## Algoritmo

El término de puntuación `buried_unsatisfied_penalty` usa una representación en forma de grafo de las redes de enlaces de hidrógeno que se precalcula antes de una trayectoria de empaquetado.  En esta representación, los nodos corresponden a rotámeros y las aristas corresponden a interacciones de enlace de hidrógeno entre rotámeros.  Cada nodo almacena una lista de donantes y aceptores de enlaces de hidrógeno de ese rotámero.  El enterramiento de cada donante y aceptor también se precalcula con el método de vecinos de cadena lateral iniciado por Gabe Rocklin y se almacena en el nodo, al igual que los enlaces de hidrógeno intrarresiduo de ese rotámero.  Cada arista almacena una lista de interacciones de enlace de hidrógeno (ya que dos rotámeros pueden compartir varios enlaces de hidrógeno), y el grupo donante-aceptor de cada enlace de hidrógeno también se almacena en la arista.  Durante el precálculo se usa la maquinaria completa de puntuación de enlaces de hidrógeno para asegurar que la definición de enlace de hidrógeno coincida con la de Rosetta.

En cada paso de una trayectoria del packer se genera un subgrafo a partir del grafo precalculado, con un nodo por posición del Pose.  El subgrafo consta solo de los nodos que corresponden a los rotámeros que se están considerando en ese momento y de las aristas que conectan esos nodos.  Entonces es sencillo recorrer todos los donantes y aceptores de enlaces de hidrógeno de los nodos del subgrafo y contar, a partir de las aristas conectadas a ese nodo, el número de enlaces de hidrógeno en los que participa ese grupo.  Una vez calculados estos recuentos, el número de grupos cuyo recuento es cero se puede determinar con una segunda pasada por los grupos donantes y aceptores.  Aunque esto tiene cierto coste computacional, es lo bastante pequeño como para que las trayectorias de diseño sigan siendo bastante rápidas.

### Definición de un grupo con enlaces de hidrógeno

A efectos de este término de puntuación, los grupos con enlaces de hidrógeno constan de un único heteroátomo polar y, posiblemente, uno o más átomos de hidrógeno polares unidos al heteroátomo.  El heteroátomo debe poder aceptar enlaces de hidrógeno o debe poseer uno o más protones que pueda donar a enlaces de hidrógeno.

### Reglas precisas para la satisfacción de un grupo

Para estar satisfecho:
- Un grupo que puede donar enlaces de hidrógeno, pero no aceptarlos, debe donar al menos un enlace de hidrógeno (con independencia del número de protones del grupo).  Es decir, un grupo NH2 que dona un solo enlace de hidrógeno _no_ se considera no satisfecho.
- Un grupo que puede aceptar enlaces de hidrógeno, pero no donarlos, debe aceptar al menos un enlace de hidrógeno.  Es decir, un oxígeno de carbonilo que acepta un solo enlace de hidrógeno _no_ se considera no satisfecho.
- Un grupo que puede tanto donar como aceptar enlaces de hidrógeno debe _o bien_ donar un enlace de hidrógeno _o bien_ aceptar un enlace de hidrógeno.  Así, un grupo hidroxilo debe participar en al menos una interacción de enlace de hidrógeno para considerarse satisfecho.

### Una nota sobre aceptores (o donantes) sobresaturados

La descomponibilidad por pares de los términos de enlaces de hidrógeno predeterminados de Rosetta conduce también a otra patología: aceptores (y, ocasionalmente, donantes) de enlaces de hidrógeno sobresaturados.  Por ejemplo, a veces se ven tres protones formando enlaces de hidrógeno con el mismo átomo de oxígeno en diseños de Rosetta, y el software puntúa esto muy bien de forma ingenua.  Al contar los donantes y aceptores de enlaces de hidrógeno no satisfechos, es trivial contar al mismo tiempo los donantes y aceptores sobresaturados y penalizarlos simultáneamente, con un coste computacional adicional casi nulo.  Por defecto, este término penaliza tanto los donantes y aceptores no satisfechos como los sobresaturados.

## Uso

Para usar el término de puntuación `buried_unsatisfied_penalty` en el diseño, basta con seguir estos pasos:

**1)**  Activa (reajusta el peso a un valor distinto de cero) el término de puntuación `buried_unsatisfied_penalty` en la función de puntuación usada para el diseño.  Se recomienda un valor entre 0.1 y 1.0.  Los valores más altos penalizarán con más agresividad los grupos polares enterrados no saturados, a costa de otros términos de puntuación.  La activación del término de puntuación `buried_unsatisfied_penalty` se puede hacer con un archivo de pesos o, en RosettaScripts, de la siguiente manera:

```xml
<SCOREFXNS>
	<ScoreFunction name="r15" weights="ref2015.wts" >
		<Reweight scoretype="buried_unsatisfied_penalty" weight="1.0" />
	</ScoreFunction>
</SCOREFXNS>
```

**2)**  Diseña con cualquier mover o protocolo que invoque al packer, usando la función de puntuación definida arriba.  Asegúrate de que las operaciones de tarea que se pasan al packer permitan residuos con grupos polares en las posiciones de diseño relevantes (o no habrá donantes ni aceptores de enlaces de hidrógeno enterrados, satisfechos o no).  [[FastDesign|FastDesignMover]] es particularmente ventajoso, ya que las rondas de minimización con el campo de fuerzas suavizado pueden llevar a los donantes y aceptores de enlaces de hidrógeno a posiciones que formen mejores enlaces de hidrógeno.

**3)**  (_Recomendado_).  Realiza una ronda final de minimización o relajación con el término de puntuación `buried_unsatisfied_penalty` _desactivado_.  Esto asegura que el término de puntuación no esté forzando rotámeros poco realistas que no se mantendrían en su sitio gracias a los enlaces de hidrógeno.

**4)**  (_Recomendado_).  Filtra según la puntuación `buried_unsatisfied_penalty`, o con el [[filtro BuriedUnsatHbonds|BuriedUnsatHbondsFilter]].  Aunque este término de puntuación guía al packer para satisfacer las redes enterradas, es posible que la geometría concreta de la cadena principal o la configuración del diseño sean incompatibles con una satisfacción completa.  Por ejemplo, si el usuario diseñara el núcleo de una proteína con aspartato como único tipo de aminoácido permitido, estaría prácticamente garantizado que no existiría ninguna solución que satisficiera a todos los aceptores de enlaces de hidrógeno de las cadenas laterales.

### Uso con ligandos
El término de puntuación `buried_unsatisfied_penalty` es totalmente compatible con ligandos polares arbitrarios.  Si un ligando (o residuo polimérico) está configurado para no diseñarse, el término puede ser muy útil para incitar al packer a diseñar conexiones polares con el ligando (o con la posición no diseñable) que satisfagan sus donantes y aceptores de enlaces de hidrógeno.  No hace falta ninguna configuración especial.

### Uso con bloques de construcción no canónicos
El término de puntuación `buried_unsatisfied_penalty` es totalmente compatible con bloques de construcción poliméricos arbitrarios, sin necesidad de configuración especial.  El código está escrito con cuidado para evitar codificar de forma fija cualquier cosa que suponga (o proporcione información especial sobre) los 20 bloques de construcción de aminoácidos canónicos.

### Uso con simetría
Actualmente, el término de puntuación `buried_unsatisfied_penalty` es totalmente compatible con la simetría, sin necesidad de configuración especial del usuario.  Los Poses simétricos se puntúan y empaquetan más rápido que los asimétricos con el mismo número de residuos, ya que la simetría simplifica el tamaño de las estructuras de datos que hay que almacenar.  (El término de puntuación configura un grafo de enlaces de hidrógeno solo para la unidad asimétrica.  Los enlaces de hidrógeno entre copias de simetría del mismo residuo se consideran enlaces de hidrógeno «intrarresiduo» y se almacenan como tales dentro de los nodos; los enlaces de hidrógeno entre residuos distintos en copias de simetría distintas se almacenan en las mismas aristas.  Los recuentos de no satisfechos se multiplican por el número de copias de simetría.)

## Opciones avanzadas

Las siguientes opciones se pueden establecer, ya sea globalmente en la línea de comandos o instancia por instancia usando sentencias `<Set ... />` dentro de la definición de la función de puntuación en RosettaScripts, para ajustar el comportamiento de este término de puntuación.  (Por ejemplo, `<Set buried_unsatisfied_penalty_burial_threshold="2.5" />` dentro de una definición de función de puntuación en RosettaScripts relajaría ligeramente el criterio para considerar enterrado un grupo polar para _esa instancia concreta_ del término de puntuación.  Lo mismo se podría lograr globalmente, para _todas las instancias_ del término de puntuación, pasando la opción de línea de comandos `-buried_unsatisfied_penalty_burial_threshold 2.5`.)

| Nombre de la opción | Tipo | Descripción | Valor por defecto |
| --- | --- | --- | --- |
| buried_unsatisfied_penalty_cone_angle_exponent | Real | El exponente del ángulo para calcular el enterramiento por el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty. | 2.0 |
| buried_unsatisfied_penalty_cone_angle_shift_factor | Real | El factor de desplazamiento del ángulo para calcular el enterramiento por el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty. | 0.25 |
| buried_unsatisfied_penalty_cone_dist_exponent | Real | El exponente de la distancia para calcular el enterramiento por el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty. | 1.0 |
| buried_unsatisfied_penalty_cone_dist_midpoint | Real | El punto medio de la distancia para calcular el enterramiento por el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty. | 9.0 |
| buried_unsatisfied_penalty_burial_threshold | Real | El número de conos en los que debe estar un punto para considerarse enterrado por el método de conos de vecinos de cadena lateral, usado por la energía BuriedUnsatPenalty. (Como los conos tienen límites difusos, es un número real y no un entero.) | 5.0 |
| buried_unsatisfied_penalty_hbond_energy_threshold | Real | El umbral de energía por encima del cual no se cuenta un enlace de hidrógeno, usado por la energía BuriedUnsatPenalty. | -0.25 |

## Un SimpleMetric complementario

El [[SimpleMetric|SimpleMetrics]] [[PolarGroupBurialPyMolStringMetric]] existe para ofrecer una forma cómoda de exportar, o de incrustar en un Pose o en un archivo PDB, una lista de comandos de PyMol para colorear los grupos polares de un Pose según su enterramiento.  Esto es útil al establecer la definición de enterramiento o al depurar un protocolo.  Consulta la documentación de [[PolarGroupBurialPyMolStringMetric]] para más detalles.

## Organización del código

* El término de puntuación está definido en el espacio de nombres `core::pack::guidance_scoreterms:buried_unsat_penalty` y se encuentra en `source/src/core/pack/guidance_scoreterms/buried_unsat_penalty/BuriedUnsatPenalty.cc/hh`.
* El término de puntuación usa una clase de grafo definida en el espacio de nombres `core::pack::guidance_scoreterms:buried_unsat_penalty::graph` y ubicada en `source/src/core/pack/guidance_scoreterms/buried_unsat_penalty/graph/BuriedUnsatPenaltyGraph.cc/hh`.
* Las pruebas unitarias se encuentran en `source/test/core/pack/guidance_scoreterms/buried_unsat_penalty/BuriedUnsatPenaltyTests.cxxtest.hh` y `source/test/core/pack/guidance_scoreterms/buried_unsat_penalty/graph/BuriedUnsatPenaltyGraphTests.cxxtest.hh`.
* Las pruebas unitarias simétricas se encuentran en `source/test/core/pack/guidance_scoreterms/buried_unsat_penalty/BuriedUnsatPenaltySymmetricTests.cxxtest.hh` y `source/test/core/pack/guidance_scoreterms/buried_unsat_penalty/graph/BuriedUnsatPenaltyGraphSymmetricTests.cxxtest.hh`.

##Véase también

* [[Scoring explained]]
* [[Funciones de puntuación y tipos de puntuación |score-types]]
* [[Cómo añadir un nuevo método de energía a Rosetta|new-energy-method]]
* [[Términos de guía centrados en el diseño|design-guidance-terms]]
* [[AACompositionEnergy]]
* [[AARepeatEnergy|Repeat-stretch-energy]]
* [[NetChargeEnergy]]
* [[HBNetEnergy]]
* [[AddCompositionConstraintMover]]
* [[AddNetChargeConstraintMover]]
* [[ClearCompositionConstraintsMover]]
* [[Mover AddHelixSequenceConstraints|AddHelixSequenceConstraintsMover]]
* [[VoidsPenaltyEnergy]]
* [[PolarGroupBurialPyMolStringMetric]
* [[SimpleMetrics]]

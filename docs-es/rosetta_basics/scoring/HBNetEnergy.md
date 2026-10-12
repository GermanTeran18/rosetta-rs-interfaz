# Puntuación de redes de enlaces de hidrógeno (término de puntuación hbnet)
Documentación creada por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker, el 3 de noviembre de 2017.  Última actualización: 20 de febrero de 2018.

**El término de puntuación `hbnet` aún no está publicado.  Si lo usas, incluye a Vikram K. Mulligan como coautor.**

_Nota:  Esta documentación corresponde al término de puntuación `hbnet`, centrado en el diseño.  Para información sobre el mover HBNet, un método alternativo para crear redes de enlaces de hidrógeno, consulta [[esta página|HBNetMover]]._

[[_TOC_]]

## Propósito y algoritmo

Este término de puntuación está pensado para usarse durante el diseño, para dar una bonificación a las redes de enlaces de hidrógeno.  Una red se define como un conjunto de dos o más residuos conectados de forma contigua por enlaces de hidrógeno cadena lateral-cadena lateral o cadena lateral-cadena principal.

Aunque los términos de enlaces de hidrógeno por pares pueden fomentar los enlaces de hidrógeno entre residuos, otorgan la misma puntuación, por ejemplo, a tres pares independientes de residuos unidos por enlaces de hidrógeno que a una red contigua de seis residuos unidos por enlaces de hidrógeno y muy interconectados.  La detección de redes de enlaces de hidrógeno es un problema inherentemente no descomponible por pares.  Por tanto, el término de puntuación `hbnet` es un término de energía de cuerpo completo no descomponible por pares que produce una bonificación cada vez mayor (_es decir_, más negativa) en proporción al cuadrado del número de residuos de la red.  Si hay varias redes presentes, la puntuación `hbnet` es la suma de las puntuaciones de cada red.

A pesar de no ser descomponible por pares, el término de puntuación `hbnet` _sí_ es compatible con el packer.  Usa una representación rápida de nodos de la red de enlaces de hidrógeno, que se actualiza rápidamente sobre la marcha, y un algoritmo eficiente de componentes conexas para calcular rápidamente las redes de enlaces de hidrógeno durante una trayectoria del packer.  La rampa cuadrática del término guía al packer hacia soluciones con grandes redes de enlaces de hidrógeno.  Sin embargo, el término es actualmente discreto, lo que significa que _no_ proporciona derivadas que guíen al minimizador hacia mejores redes de enlaces de hidrógeno.  Para eso se recurre a los términos convencionales de enlaces de hidrógeno.

## Relación con el protocolo HBNet de Scott Boyken

El término de puntuación `hbnet` es un enfoque distinto del mismo problema que resuelve el protocolo [[HBNet|HBNetMover]] de Scott Boyken: el de colocar residuos para formar redes de enlaces de hidrógeno durante el diseño.  Mientras que el enfoque del Dr. Boyken usa una enumeración exhaustiva rápida para encontrar combinaciones de rotámeros que producen redes de enlaces de hidrógeno, el uso de este término de puntuación durante el diseño convencional convierte el problema de optimización de la energía que normalmente resuelve el packer en un problema de optimización con restricciones.  En la práctica, el packer intenta simultáneamente optimizar la energía de Rosetta y maximizar el tamaño de las redes de enlaces de hidrógeno.  Este enfoque tiene tanto ventajas como desventajas en comparación con el protocolo HBNet:

### Ventajas de la puntuación `hbnet` frente al protocolo HBNet

* **Optimización simultánea.**  Al optimizar simultáneamente la energía convencional de Rosetta y la puntuación `hbnet`, se puede diseñar para un empaquetado hidrofóbico favorable _y_ redes polares favorables en un solo paso.  En cambio, el protocolo HBNet coloca primero las redes polares y después se usa el empaquetado convencional para intentar colocar residuos hidrofóbicos alrededor de las redes.  Cuando las redes más favorables no se prestan después a un buen empaquetado, la optimización simultánea a veces puede encontrar un mejor compromiso.
* **Configuración más simple y compatibilidad con todos los flujos de trabajo de diseño.**  Para usar la puntuación `hbnet`, basta con activarla (cambiar su peso a un valor distinto de cero) en la función de puntuación que se usa para el diseño.  Los protocolos de diseño complejos, como [[FastDesign|FastDesignMover]], pueden colocar redes de enlaces de hidrógeno simplemente teniendo activado este término de puntuación.
* **Importancia relativa ajustable entre redes y empaquetado.**  Ajustando el peso dado al término de puntuación `hbnet`, el usuario puede dirigir al packer para que se centre más o menos en producir extensas redes de enlaces de hidrógeno, o en optimizar las demás cosas (interacciones de Van der Waals, interacciones hidrofóbicas, _etc._) que refleja la función de puntuación de Rosetta.
* **Compatibilidad con otros términos de puntuación centrados en el diseño.**  El término de puntuación `hbnet` se puede usar junto con otros términos de puntuación para guiar el proceso de diseño, como el término [[`aspartimide_penalty`|NC-scorefunction-info]] (que penaliza las secuencias de aminoácidos formadoras de aspartimida que pueden dificultar la síntesis química de péptidos), el término [[`aa_repeat`|Repeat-stretch-energy]] (que penaliza las secuencias repetidas que pueden impedir la determinación de estructuras por RMN), el término [[`netcharge`|NetChargeEnergy]] (que penaliza la desviación respecto a una carga neta deseada) o el término [[`aa_composition`|AACompositionEnergy]] (que penaliza las desviaciones respecto a una composición de aminoácidos deseada).  **Se recomienda especialmente usar el término de puntuación `hbnet` junto con el término `buried_unsatisfied_penalty`, para evitar redes de enlaces de hidrógeno con grupos polares enterrados no satisfechos.**  Esta compatibilidad con muchos otros términos de guía significa que se puede resolver, por ejemplo, un problema como este: «Quiero un núcleo bien empaquetado que sea 75% hidrofóbico y 25% polar, y que contenga no más de 3 residuos cargados y exactamente 1 triptófano, con carga neta neutra, sin secuencias repetidas ni secuencias formadoras de aspartimida, en el que los residuos polares formen buenas redes de enlaces de hidrógeno».
* **Velocidad.**  Usar el término de puntuación `hbnet` no añade ningún paso adicional al proceso de diseño.  El propio término ralentiza el packer en torno a un 10-20%, un impacto relativamente pequeño.

### Desventajas de la puntuación `hbnet` en comparación con el protocolo HBNet

* **Estocasticidad.**  Como el packer es estocástico (optimiza energías realizando trayectorias de recocido simulado y devolviendo el estado de menor energía encontrado), no hay garantía de que la red de enlaces de hidrógeno producida con la energía `hbnet` sea la mejor posible.  El protocolo HBNet, en cambio, sí produce una lista ordenada de las mejores redes de enlaces de hidrógeno dados los rotámeros considerados.
* **Definición imperfecta de enlace de hidrógeno.**  En su implementación actual, el término de puntuación `hbnet` usa un algoritmo simplificado de detección de enlaces de hidrógeno por velocidad, basado solo en las distancias donante-aceptor (sin consideración angular).  Esto produce ocasionales falsos positivos, en los que un par donante-aceptor está muy próximo pero orientado incorrectamente para formar un enlace de hidrógeno, y aun así se cuenta como un par unido por enlace de hidrógeno.  Hay planes para abordarlo en el futuro.
* **Sin consideración de donantes o aceptores enterrados no satisfechos.**  En su implementación actual, la puntuación `hbnet` puede producir redes de enlaces de hidrógeno con donantes o aceptores de enlaces de hidrógeno enterrados y no satisfechos, sin penalización.  Hay planes para implementar otro término de puntuación similar que penalice los donantes y aceptores enterrados no satisfechos durante el diseño.
* **Solución única.** A diferencia del protocolo HBNet, que devuelve una lista ordenada de soluciones, el uso del término de puntuación `hbnet` durante el diseño da como resultado una sola solución.  Esto puede ser una ventaja o una desventaja, según el tiempo que se quiera dedicar a optimizar selectivamente las redes de enlaces de hidrógeno frente a dejar que el software gestione el problema de diseño global.

## Uso

Para usar el término de puntuación `hbnet` en el diseño, basta con seguir estos pasos:

1.  Activa (reajusta el peso a un valor distinto de cero) el término de puntuación `hbnet` en la función de puntuación usada para el diseño.  Se recomienda un valor entre 1.0 y 10.0.  Los valores más altos promoverán redes más extensas a costa de otros términos de puntuación.  La activación del término de puntuación `hbnet` se puede hacer con un archivo de pesos o, en RosettaScripts, de la siguiente manera:

```xml
<SCOREFXNS>
	<ScoreFunction name="r15" weights="ref2015.wts" >
		<Reweight scoretype="hbnet" weight="1.0" />
	</ScoreFunction>
</SCOREFXNS>
```

Se recomienda activar también el término de puntuación `buried_unsatisfied_penalty` cuando se use el término `hbnet`, con un peso de entre 0.1 y 1.0.  Esto penalizará las redes de enlaces de hidrógeno que tengan donantes o aceptores de enlaces de hidrógeno no satisfechos en el núcleo.  Se puede hacer de la siguiente manera:

```xml
<SCOREFXNS>
        <ScoreFunction name="r15" weights="ref2015.wts" >
                <Reweight scoretype="hbnet" weight="1.0" />
                <Reweight scoretype="buried_unsatisfied_penalty" weight="1.0" />
        </ScoreFunction>
</SCOREFXNS>
```

2.  Diseña con cualquier mover o protocolo que invoque al packer, usando la función de puntuación definida arriba.  Asegúrate de que las operaciones de tarea que se pasan al packer permitan residuos polares en las posiciones de diseño relevantes (o no será posible introducir redes de enlaces de hidrógeno).  [[FastDesign|FastDesignMover]] es particularmente ventajoso, ya que las rondas de minimización con el campo de fuerzas suavizado pueden llevar a los donantes y aceptores de enlaces de hidrógeno a posiciones que formen mejores enlaces de hidrógeno.

3.  (Recomendado).  Realiza una ronda final de minimización o relajación con el término de puntuación `hbnet` _desactivado_.  Esto asegura que el término de puntuación no esté forzando rotámeros poco realistas que no se mantendrían en su sitio gracias a los enlaces de hidrógeno.

## Opciones avanzadas

### Esquemas alternativos de rampa para la función de bonificación
Por defecto, el término de puntuación `hbnet` impone una bonificación con rampa cuadrática para redes de enlaces de hidrógeno cada vez más grandes.  Se ha sugerido que una función de bonificación de «rendimientos decrecientes» (_p. ej._ una función logarítmica o de raíz cuadrada) produciría mejores resultados, evitando casos en los que el packer hace redes de enlaces de hidrógeno lo más grandes posible a costa de malas puntuaciones `fa_dun` o de un mal empaquetado.  Desde el 20 de febrero de 2018 se puede especificar una rampa alternativa de dos maneras:

1.  Globalmente, en la línea de comandos, la opción `-score:hbnet_bonus_function_ramping <string>` permite al usuario especificar esquemas de rampa alternativos.  La cadena puede ser cualquiera de `quadratic`, `linear`, `squareroot` o `logarithmic`.

2.  Para una función de puntuación dada, desde el XML de RosettaScripts:
```xml
<SCOREFXNS>
	<ScoreFunction name="r15" weights="ref2015.wts" >
		<Reweight scoretype="hbnet" weight="1.0" />
		<Set hbnet_bonus_function_ramping="<string>" />
	</ScoreFunction>
</SCOREFXNS>
```
De nuevo, en lo anterior la cadena puede ser cualquiera de `quadratic`, `linear`, `squareroot` o `logarithmic`.  (En PyRosetta o en código C++ de Rosetta, se puede establecer la opción `hbnet_bonus_function_ramping` en un objeto `EnergyMethodOptions`, y el objeto `EnergyMethodOptions` se puede pasar al objeto `ScoreFunction`.)

Si no se establece ningún esquema de rampa, el valor por defecto es `quadratic`.

### Cómo establecer el tamaño máximo de red que recibe bonificación

Otro enfoque es dar una bonificación hasta cierto tamaño de red, más allá del cual el término de puntuación `hbnet` no da más bonificación.  El tamaño máximo de red se puede establecer de dos maneras:

1.  Globalmente, en la línea de comandos, la opción `-score:hbnet_max_network_size' <int>` permite al usuario especificar el tamaño máximo de red que recibe bonificación, más allá del cual la función de bonificación será completamente plana.  Un valor de 0 (el predeterminado) indica que no hay límite.

2.  Para una función de puntuación dada, desde el XML de RosettaScripts:
```xml
<SCOREFXNS>
	<ScoreFunction name="r15" weights="ref2015.wts" >
		<Reweight scoretype="hbnet" weight="1.0" />
		<Set hbnet_max_network_size="<int>" />
	</ScoreFunction>
</SCOREFXNS>
```
De nuevo, un valor de 0 indica que no hay límite.

Si no se establece ningún tamaño máximo de red, el valor por defecto es `0` (_es decir_, ilimitado).

## Uso con simetría
El término de puntuación `hbnet` es totalmente compatible con la simetría sin necesidad de configuración especial.

## Organización del código

* El término de puntuación está definido en el espacio de nombres `core::pack::guidance_scoreterms::hbnet_energy` y se encuentra en `source/src/core/pack/guidance_scoreterms/hbnet_energy/HBNetEnergy.cc/hh`.
* Las pruebas unitarias para los casos asimétrico y simétrico se encuentran en `source/test/core/pack/guidance_scoreterms/hbnet_energy/HBNetEnergyTests.cxxtest.hh`.

##Véase también

* [[Scoring explained]]
* [[Funciones de puntuación y tipos de puntuación |score-types]]
* [[Cómo añadir un nuevo método de energía a Rosetta|new-energy-method]]
* [[Términos de guía centrados en el diseño|design-guidance-terms]]
* [[AACompositionEnergy]]
* [[AARepeatEnergy|Repeat-stretch-energy]]
* [[Un término de puntuación para penalizar los donantes y aceptores de enlaces de hidrógeno enterrados no satisfechos|BuriedUnsatPenalty]]
* [[NetChargeEnergy]]
* [[AddCompositionConstraintMover]]
* [[AddNetChargeConstraintMover]]
* [[ClearCompositionConstraintsMover]]
* [[Mover AddHelixSequenceConstraints|AddHelixSequenceConstraintsMover]]
* [[Mover HBNet|HBNetMover]]
* [[VoidsPenaltyEnergy]]

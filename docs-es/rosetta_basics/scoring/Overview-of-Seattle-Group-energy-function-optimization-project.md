### Descripción general de la optimización de la función de energía

Esta optimización de la función de energía busca reparametrizar la función de energía de Rosetta sujeta a varias restricciones distintas:

* Rendimiento en diversas tareas de predicción de estructuras, incluidas la recuperación de rotámeros, el docking proteína-proteína y la discriminación de decoys
* Rendimiento en diseño de proteínas, evaluado mediante la recuperación de perfiles de secuencia con cadena principal fija
* Concordancia con datos biofísicos, incluidas las energías libres de transferencia líquido-vapor, y los calores de vaporización y la densidad de moléculas pequeñas en estado líquido
* Concordancia con datos estructurales de alta resolución, evaluando la concordancia de la distribución de distancias entre pares de átomos con las nativas de alta resolución, y la magnitud de los gradientes del campo de fuerzas tras un nuevo refinamiento cristalográfico

Estas restricciones se codifican como una función objetivo de «calidad de la función de energía», y se realiza una optimización sin derivadas de un subconjunto relevante de parámetros de la función de energía, maximizando esa función.  Los pesos relativos de cada uno de los criterios anteriores se eligen de forma ad hoc; idealmente, los pesos se eligen de modo que ninguna prueba individual empeore tras la optimización.

Se han realizado muchas rondas de optimización, optimizando distintos subconjuntos de parámetros de la función de energía.  Periódicamente, estos conjuntos de parámetros optimizados se prueban con datos independientes. Las mejoras importantes se añaden a Rosetta como una opción.

Estas opciones incluyen (puedes ver más detalles de las mejoras concretas en los enlaces siguientes):
* [[beta_july15|Updates-beta-july15]] - optimización de los parámetros de solvatación y LJ, introducción de la solvatación polar anisotrópica (LK-ball)
* [[beta_nov15|Updates-beta-nov15]] - optimización de los parámetros electrostáticos, parámetros de torsión actualizados, parámetros de enlace actualizados, activación de la atracción LJ para los hidrógenos
* [[beta_nov16|Updates-beta-nov16]] - activación de toda la etable y la electrostática intrarresiduo, adición de un potencial implícito de agua puente
    * [[ExplicitWaterMover]] - un protocolo específico de beta_nov16, que añade un método para el muestreo conformacional de moléculas de agua «puente» ordenadas
* [[beta_genpot|Updates-beta-genpot]] - se usa un potencial genérico de todos los átomos para los ligandos

Para una breve explicación de los términos nuevos (p. ej. rama_prepro, etc.), sigue este [[enlace|score-types#references_additional-energy-terms-for-beta-energy-functions]]

### Uso de la función de energía actualizada

Para la mayoría de los protocolos (los que usan _getScoreFunction_ para fijar la función de puntuación del protocolo), la opción **-beta** cargará la _última versión_ de la función de energía beta.

Para los protocolos de _RosettaScripts_, hay que proporcionar la opción **-beta** y hacer la siguiente declaración de la función de puntuación:

**\<beta weights=beta/\>**

Además, se pueden especificar variantes de la función de puntuación mediante RosettaScripts o mediante la opción **-score::weights**:

* **beta_cart.wts** - para refinamiento no ideal o cartesiano
* **beta_cst.wts** - para protocolos que necesitan tener activadas las energías de restricción
* **beta_soft.wts** - una versión «repulsiva suave» (análoga a soft_rep para score12)

## Véase también

* [[Scoring explained]]: descripción general de la puntuación en Rosetta
* [[Scorefunction History]]
* [[RosettaEncyclopedia]]

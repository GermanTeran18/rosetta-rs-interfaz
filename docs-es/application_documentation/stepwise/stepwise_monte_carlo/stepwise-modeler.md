Una vez aplicado el movimiento, los grados de libertad afectados se (re)muestrean y las estructuras resultantes se someten a cribado y filtrado (es decir, pasan por una serie de filtros, cerradores de cortes de cadena, packers y agrupadores).  Los pasos de _modelado_ y de _minimización_ son los mismos que en el procedimiento de ensamblaje stepwise publicado anteriormente {sripakdeevong, 2011}, salvo que aquí el paso de remuestreo consiste en descubrir 20 combinaciones aleatorias de torsiones que pasan los filtros, en lugar de una enumeración completa de todas esas combinaciones de torsiones.

La funcionalidad de modelado se ha implementado en el marco stepwise de Rosetta de la siguiente manera:

 - `StepWiseModeler` toma un Pose y una única posición de un residuo móvil, y con eso averigua información que incluye: qué nucleótido(s) muestrear; cuáles son las dos particiones que se moverán una respecto de la otra; y si se debe hacer docking de cuerpo rígido (si el padre del residuo móvil es un salto). Tras la inicialización, se empaquetan los 2’ hidroxilos del RNA, así como los fosfatos 5’ o 3’ que cuelgan de las cadenas de RNA. Por defecto, si no hay suficientes contactos con los grupos que se van a empaquetar, se permite que los grupos permanezcan virtuales. Luego, el `StepWiseModeler` realiza el muestreo enumerativo o estocástico mediante una búsqueda en cuadrícula discreta sobre torsiones de la cadena principal o grados de libertad de cuerpo rígido, usando el `StepWiseConnectionSampler`. Por último, los Poses de menor energía encontrados en el muestreo se someten a minimización de torsiones. El número de Poses que se minimizan está codificado en la opción `num_pose_minimize`, que el usuario puede establecer en tiempo de ejecución.

 - El `StepWiseConnectionSampler` inicializa y ejecuta la funcionalidad stepwise central, encapsulada en un objeto StepWiseSampleAndScreen. El objeto `StepWiseSampleAndScreen` es el “bucle principal” central del modelado stepwise. Combina de forma modular varios `StepWiseSamplers` posibles (que definen los bucles anidados de muestreo de DOF) y `StepWiseScreeners` (la serie de filtros, cerradores, packers y agrupadores). Una característica agradable del marco `StepWiseSampleAndScreen` es que los Poses solo se guardan en memoria una vez que han pasado todos los cribados. Esto le permite manejar cálculos de muestreo que enumeran millones de muestras.

# Muestreo

 - Tras una alineación y un empaquetado iniciales del Pose, se realiza el muestreo de los grados de libertad afectados. El objeto `StepWiseSampleAndScreen` se inicializa con un objeto `StepWiseSampler` que delimita los grados de libertad que se van a muestrear, sus valores discretos y en qué orden van. Este objeto `StepWiseSampler` suele ser, a su vez, la composición de varios objetos `StepWiseSampler`. Esta lista concatenada de objetos `StepWiseSampler` define el bucle de muestreo, al que pueden someterse millones de muestras. Un solo `StepWiseSampler` de este bucle suele consistir en aplicar nuevas conformaciones de rotámeros a un Pose, hasta que se hayan muestreado/cribado todos los rotámeros.

 - En general, el muestreo del espacio conformacional del nucleótido incluye el muestreo estocástico mediante una búsqueda en cuadrícula discreta sobre las torsiones de la cadena principal que conectan el nucleótido con su vecino 5’ o 3’ [la “suite” de la cadena principal, <greek symbols>], la torsión glicosídica de la nucleobase (<chi>) en intervalos de 20 grados, y el azúcar ribosa del nucleótido (torsiones v0, v1, v2, v3/sigma y v4) y sus conformaciones de plegamiento norte (3’-endo) y sur (2’-endo). El muestreo del 2’-OH se hace por separado. Muestreo estocástico mediante búsqueda en cuadrícula discreta sobre las torsiones <alpha>, <gamma> y <zeta>, muestreadas en todo el rango de 360 grados. Las demás torsiones se restringen a regiones permitidas estéricamente: <Beta> en la región trans (80 grados - 280 grados) y <sigma> en las regiones trans y gauche (170 grados - 290 grados si el plegamiento del azúcar era norte; 182 grados a 302 grados si era sur). Tanto en las pirimidinas como en las purinas, la torsión <chi> se muestrea en la región anti (179 grados - 219 grados si es norte; 217 grados - 257 grados si es sur). Además, en las purinas, la torsión <chi> se muestrea en la región syn (49 grados - 89 grados si es norte; 50 grados a 90 grados si es sur). Aunque en el marco stepwise se ha conservado la funcionalidad para enumerar las 5,388,768 conformaciones únicas de las purinas y las 2,694,384 conformaciones únicas de las pirimidinas (separadas entre sí, en promedio, por 0.6 Angstroms de RMSD de todos los átomos pesados), el muestreo estocástico por defecto produce 20 combinaciones de torsiones seleccionadas al azar.

# Cribado

A continuación, la colección de Poses resultante del paso de muestreo anterior se somete a cribado. El objeto `StepWiseSampleAndScreen` se inicializa con un vector de objetos `StepWiseScreener` que delimitan la serie de filtros, packers y cerradores de loops que se ejecutan después de aplicar cada muestra al Pose. Tener estos cribadores en un orden concreto puede acelerar el muestreo, y en algunos casos hay dependencias. Las clases `StepWiseScreener` disponibles actualmente incluyen funcionalidad para: filtros comunes; cierre de cadena; empaquetado; filtros geométricos; cribado de cuerpo rígido; selección de Poses y agrupamiento ‘sobre la marcha’; etc. Aquí se describen brevemente algunos filtros de uso común:

- `PartitionContactScreener` examina las dos particiones cuya conexión intermedia (un salto o varios grados de libertad de la cadena principal) se está muestreando. Solo los Poses sin choques, pero con algún contacto, pasarán con éxito este filtro. Básicamente, se calculan las puntuaciones fa_atr y fa_rep para pares de residuos de distintas particiones para identificar choques entre las dos particiones. 

- `VDWBinScreener` permite comprobaciones rápidas de choques de van der Waals, revisando una cuadrícula de posiciones atómicas agrupadas en celdas en lugar de comparar las coordenadas atómicas exactas. 

- `NativeRMSDScreener` se usa para asegurar la similitud entre el Pose y un Pose de referencia definido por el usuario. Esta funcionalidad se activa especificando el umbral de RMSD deseado con el argumento de línea de comando `-rmsd_screen`.

- `BaseCentroidScreener` (específico de RNA) busca pares de bases y apilamientos de bases. Aquí se filtran los Poses que no tengan al menos un par de bases o un apilamiento de bases entre sus particiones.

- `O2PrimeScreener` (específico de RNA) es un cribador para el empaquetado especializado de 2’-OH. Este empaquetado especializado trata los grupos 2’-OH como cadenas laterales y permite virtualizarlos. 

- `PhosphateScreener` (específico de RNA) es un cribador para el muestreo especializado de fosfatos en los extremos 5’ o 3’ de las cadenas de RNA. Este cribador especializado trata los grupos fosfato como cadenas laterales y permite virtualizarlos. 

- Los filtros geométricos se desarrollaron sobre todo para muestrear ‘bases flotantes’ de RNA: docking de nucleótidos que no están conectados covalentemente con el resto del Pose, sino separados de él por un solo nucleótido.

- Los cribadores de cuerpo rígido incluyen un `StubApplier` y un `StubDistanceScreener`, que permiten cribar disposiciones de cuerpo rígido durante el docking basándose únicamente en la geometría, sin necesidad de actualizar el Pose.

- `PoseSelectionScreener` se encarga del agrupamiento final y de la selección de los Poses que han pasado todos los demás cribados. En general, debe ser el último cribador que se aplique. 

Una vez aplicados todos los muestreadores y cribadores, la colección de Poses resultante se somete a agrupamiento. Los Poses se agrupan con un umbral de RMSD de todos los átomos de 0.5 Angstrom sobre todos los átomos muestreados y por similitud del plegamiento del azúcar del nucleótido recién construido. La funcionalidad de agrupamiento, que incluye la recolección de Poses y el agrupamiento ‘sobre la marcha’, está encapsulada en un objeto `StepWiseClusterer`.

Se conserva el miembro de menor energía de cada clúster. Por último, se evalúa la energía de los Poses resultantes y el modelo de menor energía pasa al siguiente paso.

# Minimización

El modelo resultante se minimiza en un paso de _minimización_.

La aplicación stepwise también permite pasar varios modelos, que se agrupan, se minimizan y se vuelven a agrupar; este modo es el que se usaba en el procedimiento anterior de enumeración con ensamblaje stepwise.

# Aceptación de Monte Carlo

Se selecciona el modelo de menor energía y su energía se compara con la del modelo generado en el paso anterior; el nuevo modelo se acepta o se rechaza según el criterio de Metropolis; si el nuevo modelo tiene menor energía, se acepta.


# Revisión del código
Esta es la función `apply` de `StepWiseModeler`:
```
		initialize( pose );

		do_prepacking( pose );
		do_sampling( pose );
		if ( sampling_successful() ) do_minimizing( pose );

		reinitialize( pose );
```

• `initialize` calcula un conjunto de parámetros de trabajo (qué residuos mover, los residuos `bridge_res` que se cierran con CCD, etc.) y los reúne en un solo objeto. Toda esta información se puede derivar del Pose y de `moving_res`, pero por razones históricas se dispone de ella en un solo objeto. La función también vuelve a enraizar el Pose para que la partición más grande quede fija y lo alinea con un Pose de alineamiento; esto acelera el cálculo. Por último, aquí se pueden aplicar restricciones nativas si se especifica la opción `rmsd_screen` desde la línea de comando.

• `do_prepacking` empaqueta las cadenas laterales de proteínas y los 2' hidroxilos del RNA, así como los fosfatos 5' o 3' que cuelgan de las cadenas de RNA. Por defecto, el empaquetado permite la virtualización de las cadenas laterales y los hidroxilos del RNA: si no hay suficientes contactos con esos grupos para definirlos, se mantienen virtuales (mediante bonificaciones en los términos `free_side_chain` y `free_2HOprime`).

• `do_sampling` realiza el muestreo enumerativo o estocástico usando StepWiseConnectionSampler, que prepara un [[SampleAndScreen|stepwise-sample-and-screen]].  Aquí no hay minimización, solo una búsqueda en cuadrícula discreta sobre torsiones de la cadena principal o DOF de cuerpo rígido.

• `do_minimizing` toma el o los Poses de menor energía encontrados en el muestreo y realiza una minimización de torsiones. Cuántos Poses se minimizan lo codifica la opción `num_pose_minimize` (consulta [options/] más abajo).

• `reinitialize` pone a cero varios objetos de `StepWiseModeler` por si se reutiliza (lo cual ocurrirá en las aplicaciones de `StepWiseMonteCarlo`). También elimina las restricciones nativas añadidas al Pose.

Además de `StepWiseModeler.cc`, este directorio `modeler/` contiene varios subdirectorios y archivos para definir clases de opciones, packers y minimizadores, así como código específico para el muestreo de proteínas y de RNA (que quizá debería trasladarse a otro directorio).

# Notas
• El `moving_res` de entrada debe estar realmente en la numeración de trabajo. Es decir, si el Pose tiene los residuos 1-4 y 7-12 del problema de modelado completo, y necesitamos remuestrear la conexión del residuo 7 al 8, hay que dar '5' (el quinto residuo real del Pose). Si eso resulta demasiado confuso, sería fácil refactorizar para aceptar el residuo móvil en la numeración del modelo completo.

• En RNA se muestrean el residuo especificado y su conexión con su padre en el fold tree.

• En proteínas, también se muestrea el padre del residuo especificado (siempre que no sea una parte fija de un PDB de entrada). Esta elección todavía permite la enumeración completa y se elaboró en el artículo sobre el [ensamblaje stepwise para proteínas](http://www.plosone.org/article/info%3Adoi%2F10.1371%2Fjournal.pone.0074830).

• StepWiseModeler se puede usar únicamente como packer (sin ningún muestreo discreto real de grados de libertad) si se establece `working_prepack_res`. Esto es útil en los modos `-preminimize` de `stepwise`.


Vuelve a la [[visión general de StepWise|stepwise-classes-overview]].

##Véase también

* [[Stepwise options]]: Clases de opciones del código de Stepwise
* [[Writing an application]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[I want to do x]]: Guía para elegir movers para perturbaciones estructurales
* [[Stepwise]]: La aplicación StepWise MonteCarlo
* Aplicaciones para el ensamblaje stepwise determinista:
  * [[Ensamblaje stepwise para loops de proteínas|swa-protein-main]]
    * [[Documentación adicional|swa-protein-long-loop]]
  * [[Modelado de loops de RNA con ensamblaje stepwise|swa-rna-loop]]
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta

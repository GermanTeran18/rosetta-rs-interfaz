#Movimientos de StepWise y Monte Carlo
# Código
El código básico que ejecuta el Monte Carlo stepwise está en `src/protocols/stepwise/monte_carlo/StepWiseMonteCarlo.hh`.

# Cómo ejecutarlo
----------------
(consulta, por ejemplo, `src/apps/public/stepwise/stepwise.cc`)
```
	StepWiseMonteCarlo stepwise_monte_carlo( scorefxn );

	StepWiseMonteCarloOptionsOP options = new StepWiseMonteCarloOptions;
	stepwise_monte_carlo.set_options( options );

	stepwise_monte_carlo.apply( pose );
```

# Esquema general de Monte Carlo
----------------------------
El método Monte Carlo stepwise genera conformaciones de baja energía de las regiones modeladas mediante la aplicación recursiva de seis tipos básicos de movimientos. Dada una única cadena de nucleótidos, el modelo se construye recursivamente mediante ciclos de modelado de un solo nucleótido en los extremos 5’ y 3’ de la cadena, hasta culminar en la conexión de las dos cadenas en crecimiento. Un ciclo de Monte Carlo se define así:

 - En un paso de selección de movimiento se elige al azar un movimiento, definido por su tipo y por el residuo al que se aplicará.
 - Luego, en un paso de aplicación del movimiento, se aplica el movimiento (es decir, se instancian, remuestrean o eliminan las coordenadas del o de los residuos). 
 - Los grados de libertad afectados por el movimiento se remuestrean, se criban y se filtran durante el modelado. Este paso y el siguiente son los mismos que en el procedimiento de ensamblaje stepwise publicado anteriormente {sripakdeevong, 2011}, salvo que aquí el paso de remuestreo consiste en descubrir 20 combinaciones aleatorias de torsiones que pasan los filtros, y no en una enumeración completa de todas esas combinaciones de torsiones. La de menor energía de esas 20 pasa al siguiente paso.
 - El modelo resultante se minimiza en un paso de minimización. (La aplicación stepwise también permite pasar varios modelos, que se agrupan, se minimizan y se vuelven a agrupar; este modo es el que se usaba en el procedimiento anterior de enumeración con ensamblaje stepwise.)
 - Se selecciona el modelo de menor energía y su energía se compara con la del modelo generado en el paso anterior; el nuevo modelo se acepta o se rechaza según el criterio de Metropolis; si el nuevo modelo tiene menor energía, se acepta.


# Selección del movimiento
----------------
Una descripción concisa de un movimiento se da como un `StepWiseMove`. Los tipos de movimientos son los siguientes (consulta `src/protocols/stepwise/monte_carlo/mover/stepwise_move.hh`:

 - `ADD` -- Los movimientos de _adición_ se definen dando la o las posiciones en la secuencia de uno o más residuos, aún no instanciados, que se añadirán a un extremo 5’ o 3’ de cadena del Pose actual. Si se puede trazar una única conexión covalente desde el Pose existente hasta el residuo (de i a i+1), la adición se hará mediante un enlace covalente. En caso contrario, el residuo se añadirá mediante un salto; como en trabajos anteriores, normalmente solo permitimos saltos separados por un solo residuo (de i a i+2). Comprobamos que estos movimientos que saltan residuos no eran necesarios para el modelado con Monte Carlo stepwise, y el modo se desactivó durante las ejecuciones de benchmark presentadas en el texto principal (el modo “skip-bulge”, desactivado por defecto, se puede activar con la opción de línea de comando “-allow_skip_bulge”). Para problemas que involucran la interacción terciaria de dos cadenas, los movimientos de adición también pueden especificar docking.
 
 - `DELETE` -- Los movimientos de _eliminación_ se definen dando la o las posiciones en la secuencia de uno o más residuos previamente instanciados, ubicados en un extremo 5’ o 3’ de cadena, que se quitarán del Pose existente. Si los residuos que se van a eliminar incluyen más de un residuo contiguo, el Pose se divide y los residuos retirados se guardan en una lista de Poses “otros”, que está dentro del Pose de interés. La interpretación física de estos Poses separados es que son las regiones bien estructuradas de la molécula cuyas conexiones no se han definido mediante contactos entre regiones. Para problemas que involucran la interacción terciaria de dos cadenas, los movimientos de eliminación también pueden especificar la separación de las dos cadenas.

 - `FROM_SCRATCH` -- crea un dinucleótido o un dipéptido desde cero. El Pose resultante se mantiene en la lista de Poses "otros" hasta que se muestrea una conexión covalente con el Pose en foco. 

 - `RESAMPLE` -- Los movimientos de _remuestreo_ consisten en muestrear una conexión existente concreta. El movimiento se define especificando la posición en la secuencia de un residuo que se va a mover, y la conexión se infiere a partir del residuo padre en el Pose.

 - `RESAMPLE_INTERNAL_LOCAL` -- Los movimientos de _remuestreo interno local_ muestrean un residuo interno concreto, crean un punto de corte transitorio después de él, imponen el cierre de cadena basado en KIC y eliminan la variante de punto de corte. Este movimiento es el mismo que se usa en el método ERRASER para refinar estructuras guiadas por densidad experimental {chou, 2013} y es, en cierto modo, análogo al movimiento backrub de las proteínas {richardson}{kortemme}.

 - `ADD_SUBMOTIF` -- Los movimientos de _adición de submotivo_ reconocen motivos pequeños, almacenados en una base de datos de Rosetta precompilada, que coinciden con un subconjunto de residuos no instanciados del Pose, e incorporan al Pose las conformaciones cristalográficas de los motivos coincidentes.  Solo se consideran los submotivos que se pueden añadir mediante una única conexión covalente con el Pose existente. Actualmente, la base de datos de submotivos se limita a pares Watson-Crick C-G, pares W/H no canónicos U-A, pares W/H no canónicos G-G y giros en U.
 
Para cada movimiento hay que especificar el residuo y el residuo padre, así como el tipo de conexión que se hará entre el residuo y su padre. Estos tipos de unión incluyen ‘bond to previous’, ‘bond to next’, ‘jump to previous in chain’, ‘jump to next in chain’ y ‘jump dock’. El residuo padre y el tipo de unión se representan como un objeto `Attachment`, almacenado dentro del objeto `StepWiseMove`.

Dada la estructura en su estado actual, se determinan todos los movimientos posibles a partir de este estado, con frecuencias de movimiento equilibradas de modo que los movimientos de remuestreo, desde cero y de docking ocurran con frecuencias de 0.5, 0.2 y 0.2 relativas a los movimientos de adición y eliminación. De la lista de todos los movimientos posibles se puede seleccionar uno con un generador de números aleatorios. Esta funcionalidad está encapsulada en un único objeto `StepWiseMoveSelector`.

Un objeto `StepWiseMasterMover` es responsable de inicializar y aplicar el `StepWiseMoveSelector` descrito arriba. Una vez determinados todos los movimientos posibles, se genera un número aleatorio y se usa para seleccionar uno de ellos. Una vez seleccionado, el `StepWiseMasterMover` se encarga de aplicar el movimiento al Pose. Además, el `StepWiseMasterMover` maneja las razones de propuesta (véase más abajo) y garantiza que todos los movimientos inversos sean posibles. Aunque el uso aquí de minimización continua impide un balance detallado exacto, estas características permitirían mantener el balance detallado en futuras ampliaciones del Monte Carlo stepwise.

[*Experimental* Para diseño, también se prueban movimientos `ADD_LOOP_RES` y `DELETE_LOOP_RES` que no cambian el Pose, sino las longitudes de loop supuestas.]

# Aplicación del movimiento
------------------

Dados el Pose actual y un objeto `StepWiseMove`, la funcionalidad central de estos movers consiste en asignar al Pose los residuos móvil y de unión definidos en el `StepWiseMove`, y usar esta información para llevar a cabo la aplicación del movimiento. En los movimientos que implican la instanciación de nucleótidos, su mover asociado también es responsable de inicializar las torsiones de los residuos instanciados. Aunque algunos movers se encargan del premuestreo de las conformaciones de los residuos, el muestreo conformacional central ocurre durante la etapa de modelado (véase más abajo). 

El `StepWiseMoasterMover` descrito arriba es responsable de la inicialización y aplicación de estos diversos movers específicos de cada movimiento. Dado un `StepWiseMove` seleccionado, el `StepWiseMasterMover` asigna el tipo del movimiento a su mover correspondiente (por ejemplo, `StepWiseMove::move_type` “RESAMPLE” se asigna a `ResampleMover`) y llama a la función `::apply()` del mover sobre el `Pose` actual. En algunos casos, un mover más general aporta una capa adicional de abstracción entre el `StepWiseMover` y el mover específico del movimiento. Por ejemplo, los `StepWiseMove::move_type` “ADD”, “DELETE”, “FROM_SCRATCH” y “ADD_SUBMOTIF” se asignan todos a un `AddOrDeleteMover`; este mover intermedio decide, a partir del `Pose` y del `StepWiseMove` actuales, si debe añadir o eliminar un solo nucleótido o un fragmento de nucleótidos, y dónde.

# Cómo hacer un movimiento concreto
---------------------------

```
AddMover add_mover( scorefxn );
add_mover.set_presample_by_swa( true ); // will do the stepwise sampling.
add_mover.set_stepwise_modeler( new StepWiseModeler( scorefxn ) );
add_mover.apply( pose, 3 /*add res*/, 2 /*takeoff res*/ );   // imagine the pose has residues 1, 2, 7, 8
```

Hay más ejemplos de cómo usar estas clases en las pruebas unitarias (`test/protocols/stepwise`)

---
Vuelve a la [[visión general de StepWise|stepwise-classes-overview]].

##Véase también

* [[Stepwise options]]: Clases de opciones del código de Stepwise
* [[Writing an application|writing-an-app]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
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

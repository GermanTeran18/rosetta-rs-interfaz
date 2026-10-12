#StepWiseScreener
Los objetos `StepWiseScreener` son filtros con algunas características especializadas para 'avanzar rápido' por el bucle de muestreo y evitar efectos de memoria en el Pose. La clase base está en `src/protocols/screener/StepWiseScreener.cc`. El ejemplo principal de cómo configurar estos objetos es la función `initialize_screeners()` de `StepWiseConnectionSampler`.

# Funciones más importantes 
###`bool check_screen()`
Devuelve true/false si es un filtro.

Devuelve true si el trabajo de este cribador es pasar siempre, pero realizar una acción, y ejecuta la acción (por ejemplo, empaquetado o cierre de loops) en esta función.

###`bool name()`
Necesario para la salida de la 'tabla de recortes' final en [[`StepWiseSampleAndScreen`|stepwise-sample-and-screen]], el número de muestras que pasan cada StepWiseScreener

###`StepWiseScreenerType type()`
Registra tu `StepWiseScreener` en el enum de `StepWiseScreenerType.hh`.


###`void add_mover( CompositionMoverOP update_mover, CompositionMoverOP restore_mover )`
Cómo puede este cribador comunicar a los cribadores posteriores cualquier cosa que deban aplicar a sus Poses.
Un `CompositionMover` es básicamente un `vector1` de movers (en realidad, de punteros a movers). Si el puntero al mover es nulo, significa que no hay que hacer nada. 


###`void apply_mover( CompositionMoverOP, Size const, Size const )`
Cómo recibe este `StepWiseScreener` la comunicación de los cribadores anteriores.


###`void fast_forward( StepWiseSamplerBaseOP )`
Si este `StepWiseScreener` no pasa `check_screen`, esta función puede decirle al muestreador que avance. Por ejemplo, en docking, si la disposición de cuerpo rígido de dos particiones no permite el cierre de cadena, puede tener sentido omitir cualquier muestreo fino de las alternativas de residuos.


# Subclases útiles
### `SampleApplier`
Contiene un `pose_` como variable privada. Sabe automáticamente qué hacer cuando recibe movers mediante `apply_mover()`. Esta subclase es mejor opción que la clase base `StepWiseScreener` para acciones que requieren trabajar sobre un Pose 'de trabajo', por ejemplo `ProteinCCD_ClosureScreener` o `SugarInstantiator`. 

### `StepWiseResiduePairScreener`
Contiene dos posiciones de residuos como variables privadas. Resulta útil para avanzar rápido más allá de las alternativas de uno o de ambos residuos si, por ejemplo, falla un cribado de distancia.

# Clases `StepWiseScreener` disponibles actualmente
### Acciones básicas
`PoseSelectionScreener.cc` debe ir al final de todos los cribadores. Contiene un StepWiseClusterer que recoge Poses y puede agruparlos 'sobre la marcha'.

###Filtros comunes
`PartitionContactScreener.cc` examina las dos particiones cuya conexión intermedia (un salto o varios DOF de la cadena principal) se está muestreando. Pide que no haya choques, pero sí algún contacto, básicamente calculando los términos de energía `fa_atr` y `fa_rep` para pares de residuos de distintas particiones.

`VDW_BinScreener.cc` permite comprobaciones rápidas de choques; equivale a un `BumpGrid` (y quizá debería usar ese objeto).

`NativeRMSD_Screener.cc` sirve para mantenerse cerca de un Pose de referencia. Aprovecha la alineación sobre la partición más grande que ocurre en el envoltorio [[`StepWiseModeler`|stepwise-modeler]] antes de ejecutar StepWiseSampleAndScreen.

`BaseCentroidScreener.cc` es específico de RNA y pide al menos un par de bases o un apilamiento de bases entre particiones del Pose.

### Cierre de cadena
`ProteinCCD_ClosureScreener.cc` y `RNA_ChainClosureScreener.cc`

### Empaquetado
`PackScreener.cc` para llamadas al Packer de cadenas laterales de proteínas; `O2PrimeScreener.cc` para el empaquetado del 2'-OH del RNA, y `PhosphateScreener.cc` para el muestreo especializado de fosfatos en los extremos 5' o 3' de cadenas de RNA. En todos los casos, el empaquetado permite la posibilidad de virtualizar estos grupos 'secundarios' de tipo cadena lateral del biopolímero.

###Filtros geométricos
Desarrollados sobre todo para muestrear 'bases flotantes' de RNA: docking de nucleótidos que no están conectados covalentemente con el resto del Pose, sino separados por un solo nucleótido:  `RNA_ChainClosableGeometryResidueBasedScreener.cc`, `RNA_ChainClosableGeometryScreener.cc`, `RNA_ChainClosableGeometryStubBasedScreener.cc`, `AnchorSugarScreener.cc`, `CentroidDistanceScreener.cc`, `ResidueContactScreener.cc`. Desarrollados y probados principalmente para RNA, pero se podrían generalizar fácilmente a proteínas, problemas de proteína/RNA, etc.

### Cuerpo rígido
`StubApplier.cc` y `StubDistanceScreener.cc` permiten cribar disposiciones de cuerpo rígido durante el docking basándose únicamente en la geometría, sin necesidad de actualizar el Pose (lo que puede tardar muchísimo). Por ahora solo se han probado en RNA, pero deberían ser fáciles de generalizar.

### Avance rápido del muestreador (avanzado)
`IntegrationTestBreaker.cc` es un 'apagado' temprano especial del muestreo para que las pruebas de integración enumerativas sean rápidas.

`FastForwardToNextRigidBody.cc` y `FastForwardToNextResidueAlternative.cc`  están especializados en docking: una vez que se encuentra una solución para los DOF internos de dos particiones unidas por docking, saltan a la siguiente disposición de cuerpo rígido.

### De uso poco frecuente
`TagDefinition.cc` puede calcular y almacenar una etiqueta especial en el Pose. Podría quedar obsoleto pronto.

`Scorer.cc` puntúa el Pose con una función de puntuación especificada. Normalmente esto ocurre de todos modos en otros cribadores, así que no hace falta.

`BulgeApplier.cc` se usaba para virtualizar residuos de RNA que no hacen contacto.  Podría quedar obsoleto pronto.

`SugarInstantiator.cc` se usaba para instanciar las ribosas de bases de RNA 'flotantes' que podían formar un posible enlace de hidrógeno con algo. Podría quedar obsoleto pronto.

`BaseBinMapUpdater.cc` se usaba para el muestreo de cuerpo rígido de bases de RNA, pero ya no se admite.

Vuelve a [[StepWiseSampleAndScreen|stepwise-sample-and-screen]].

Vuelve hasta el principio, a la [[visión general de StepWise|stepwise-classes-overview]].

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

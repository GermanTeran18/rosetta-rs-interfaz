Puedes encontrar un tutorial introductorio sobre plegamiento de proteínas con el Broker [aquí](https://www.rosettacommons.org/demos/latest/tutorials/advanced_denovo_structure_prediction/folding_tutorial).

Si la funcionalidad de mover que necesitas para el algoritmo que quieres crear no existe ya como mover compatible con el broker, tendrás que hacer algo de trabajo de desarrollo. Esto va desde añadir un par de líneas de código a tu mover existente hasta desarrollar un mover completamente nuevo. Incluso lo segundo no le lleva más de una hora a un desarrollador experto, salvo que tu mover sea realmente especial, así que no te preocupes. ¡Es fácil!

Lo más sencillo es hacer que funcione con el marco de ScriptCM, pero si tu mover hace algo especial (y no puede aceptar un MoveMap como información de qué mover) o es un [[ClientMover|ClientMovers]] obligado (no tiene sentido fuera de un marco de Broker), lo mejor es escribir un nuevo [[ClientMover|ClientMovers]].

[[_TOC_]]

# Estrategias para la compatibilidad con el Broker

## MoveMapMovers y ScriptCM

Primero, échale un vistazo a [[ScriptCM|ClientMovers#ScriptCM]]. Así puedes hacer que tu mover sea aceptable como mover interno de un [[ScriptCM|ClientMovers#ScriptCM]]:

1. Asegúrate de que tu mover sea accesible en RosettaScripts.
2. Haz que tu mover herede de `MoveMapMover` en lugar de solo de `Mover`.
3. Implementa tu `mover::movemap`.
4. Implementa tu `mover::set_movemap`.
5. Asegúrate de que tu mover obedezca el MoveMap que se le pasa mediante `set_movemap`. (Como mérito extra, lanza una excepción si hay grados de libertad accesibles en el `MoveMap` que tu mover no sabe mover; p. ej., ángulos de torsión para un mover de docking)
6. ¡Listo!

Después, coloca tu mover dentro de un [[ScriptCM|ClientMovers#ScriptCM]] con las subetiquetas de Mover cliente y de Claim adecuadas. Por ejemplo,

```
<ScriptCM name="my_mover">
  <[Your Mover] [option1, option2, ...] />
  <TorsionClaim backbone=1 control_strength="CAN_CONTROL" selector="ChainA" />
</ScriptCM>
```

Esto crearía un mover "my_mover" cuyo apply aplica tu mover especial (creado por su propia función `parse_my_tag`) con un MoveMap en el que todos los ángulos de torsión disponibles (es decir, que no hayan quedado no disponibles por una Claim `EXCLUSIVE`) del ResidueSelector "ChainA" están establecidos en true.

## Desarrollo de nuevos ClientMovers

Si tu mover cumple uno de los siguientes criterios, quizá te convenga escribir un [[ClientMover|ClientMovers]] especial solo para tu clase, porque puede que no encaje bien en el patrón [[ScriptCM|ClientMovers#ScriptCM]]/MoveMapMover.

1. No tiene sentido fuera de un Environment.
2. Los claims asociados a tu mover (ya sea la construcción de elementos de FoldTree/AtomTree o los grados de libertad que hay que controlar) se determinan mejor de forma dinámica en el código, en el momento del brokering, o deben leerse de un archivo.
3. Tu movimiento efector (el código que realmente cambia los números del AtomTree) no puede manejar un MoveMap y necesita en su lugar algún otro indicador (por ejemplo, UniformRigidBodyMover toma un número de Jump, no un MoveMap).

Esto supone algo más de trabajo (¡pero no mucho!), aunque puede producir objetos realmente elegantes, flexibles y fáciles de usar. Esto es lo que tienes que hacer:

1. **Decidir qué hay que reclamar.** En realidad, solo hay un par de opciones posibles, incluso en teoría, y se dividen en dos categorías: grados de libertad (DoF) y elementos de FoldTree. Los elementos de FoldTree son cortes, saltos (jumps) y nuevos residuos virtuales. Los DoF son básicamente los números a los que dan lugar los elementos de FoldTree: los RT de los saltos y los ángulos de torsión (y, en casos poco habituales, las longitudes y ángulos de enlace). En general, el brokering no debería añadir nada al sistema físico representado por la simulación, sino solo cambiar la forma en que ese sistema se representa (por eso actualmente solo se admite añadir residuos virtuales).
2. **Expresar tus necesidades de reclamación como Claims.** Consulta la lista de [[Claims|ClientMovers#ScriptCM]] existentes, tanto en este artículo como en protocols/environment/claims, para determinar qué Claims expresan mejor esas necesidades.
3. **Implementar `ClientMover::yield_claims`** para pasar esas claims al Broker.
4. **Implementar `ClientMover::passport_updated`.** Este método se llama cada vez que el ClientMover recibe un nuevo `DofPassport`, que contiene toda la información sobre a qué DoF puede acceder tu ClientMover. Normalmente este hook se usa para procesar el nuevo pasaporte y configurar la estructura de datos que el ClientMover use para seguir los DoF objetivo (p. ej., el número de Jump). Un método especialmente útil es `DofPassport::render`, que produce un MoveMap a partir de un `DofPassport`.
4. **Implementar ClientMovers::apply** correctamente. Como la Conformation de consenso dentro del Pose ejecuta comprobaciones de seguridad para asegurarse de que tu mover tiene permiso para mover los DoF que intenta mover, todo [[ClientMover|ClientMovers]] debe autenticarse primero con el patrón [Resource Acquisition is Initialization](http://en.wikipedia.org/wiki/Resource_Acquisition_Is_Initialization) (la adquisición de recursos es inicialización). El [[ClientMovers]] instancia un `DofUnlock` automático (es decir, asignado en la pila) como primer paso de la función apply. Casi siempre basta con copiar y pegar la siguiente línea (si el nombre del Pose entrante es "pose"):

    ```
    DofUnlock activation( pose.conformation(), passport() );
    ```

    Es absolutamente crucial que el objeto tenga _nombre_, aunque nunca llegue a usarse, porque de lo contrario se eliminará por completo en la compilación. Esto ha hecho tropezar al autor casi cada vez que escribió un nuevo [[ClientMover|ClientMovers]].

5. **¡Listo!** Añade tu nuevo mover a un environment y empieza a combinarlo con otros [[ClientMover|ClientMovers]].

En general, los [[ClientMovers]] ocupan solo unos pocos cientos de líneas (en el momento de escribir esto, FragmentCM.cc tiene 244 líneas y UniformRigidBodyCM.cc tiene 175), sobre todo si contienen un mover existente que se encarga del trabajo pesado de realizar las manipulaciones numéricas asociadas al movimiento.

### Características especializadas

En el sistema del Broker existen muchas características especiales, pero todavía no son necesariamente «canónicas». En otras palabras, son características con las que estoy experimentando y me reservo el derecho de eliminarlas si es necesario. Entre ellas están

- Inicialización. Actualmente, el Broker crea una fase especial de brokering antes de devolver el control de flujo al protocolo, en la que los movers que reclamaron intensidades de control de inicialización superiores a "DOES_NOT_CONTROL" tienen una única oportunidad de establecer esos DoF. Consulta protocols/abinitio/abscript/RigidChunkCM.cc para ver un ejemplo.
- El hook ClientMover::broking_finished está pensado para proporcionar a los movers interesados información especializada sobre el resultado del proceso de brokering. Ofrece acceso const a un objeto BrokerResult que contiene: el objeto Pose final, un std::map< Size, std::string > con la posición y el nombre de los nuevos residuos virtuales, un fold tree despojado de todos los saltos no físicos (para algunos cerradores de loops heredados), un std::set< Size > con la posición de todos los cortes colocados automáticamente, un WriteableCacheableMapCOP que contiene cualquier información colocada allí por el Broker (como los cortes automáticos) o por otros ClientMovers (actualmente solo FragmentJumpCM), y un SequenceAnnotationCOP que contiene información de etiquetas y numeración del Pose.

# Interfaz de C++

La arquitectura del Broker se describe en un artículo próximo de la colección PLoS ONE de RosettaCon 2014.

## Simetría

Actualmente el broker no admite [[symmetry]]. El motivo es *puramente técnico*, así que es perfectamente posible. El problema principal es que tanto la simetría *como* el broker son implementaciones del objeto Conformation. Como Rosetta no permite la herencia múltiple, actualmente no es posible usar ambos conjuntos de funcionalidades al mismo tiempo.

Para resolverlo, habría que implementar el comportamiento simétrico para `ProtectedConformation`. Se podría hacer que `ProtectedConformation` heredara de `SymmetricConformation` (de modo que todas las `ProtectedConformations` fueran simétricas, a veces simplemente con _n_ = 1), o bien que `ProtectedConformation` implementara su propio código de copia simétrica.

Después habría que construir un mecanismo para reclamar simetría dentro del marco del broker. Una buena idea podría ser definir una especie de `BrokerElement` de «copia simétrica directa» (es decir, el DoF *a* sigue al DoF *b*). Luego se podría construir un `EnvClaim` que genere el conjunto adecuado de `BrokerElements` a partir de una definición de simetría.

Una vez completado eso, habría que modificar `EnvClaimBroker` para que haga el brokering correcto de este tipo de `BrokerElement`s. Eso incluiría adjuntar un objeto `SymmetryInfo` correcto al `Pose` y, probablemente, otros problemas de configuración.

## Diseño

Actualmente el broker no admite el diseño. Igual que la simetría, el motivo es *puramente técnico*. La forma en que los DoF se almacenan en el `DofPassport` se apoya en el sistema `DOF_ID` de bajo nivel de Rosetta, que sigue los DoF por número de átomo, número de residuo y `DOF_Type` (un enum). Si cambia el número de residuos del Pose, el número de residuo queda obsoleto. Si cambia el número de átomos de un residuo, el número de átomo queda obsoleto. Si cambia la conectividad de los átomos, puede que el DoF ya no exista (*p. ej.*, los ángulos de torsión desaparecen si desaparecen los átomos que dependen de ellos).

Por fortuna, solo muy rara vez hay una necesidad real de variar la longitud de las cadenas *durante* el muestreo. Una estrategia perfectamente válida cuando hay que evaluar varias longitudes de cadena es variar la longitud de la cadena *por decoy*. En otras palabras, elegir una longitud una vez al principio de la trayectoria, mantenerla hasta el final y muestrear la variación razonable de la longitud a lo largo de la distribución de decoys, en lugar de dentro de cada decoy.

El diseño de residuos, en cambio, se presta menos a esa estrategia. Para realizar un diseño que implique cambios en el árbol de átomos, hay que actualizar el `DofPassport`, o al menos hacer que pueda manejar `DOF_IDs` cambiantes.

Esto se podría hacer de varias maneras. Como la mayor parte del diseño consiste en intercambiar cadenas laterales, lo más fácil probablemente sería construir una forma de reclamar una cadena lateral entera para diseño. Esto reclamaría acceso `MUST CONTROL` a toda la cadena lateral y almacenaría el acceso a todos los átomos que no son de la cadena principal como una única entrada en el `DofPassport`. Por ejemplo, toda la cadena principal podría almacenarse como un único `DOF_ID` con el número de átomo del primer átomo del residuo que no es de la cadena principal.

##Véase también

* [Tutorial sobre plegamiento de proteínas con el Broker](https://www.rosettacommons.org/demos/latest/tutorials/advanced_denovo_structure_prediction/folding_tutorial)
* [[Página principal del Topology Broker|BrokeredEnvironment]]
* [[Development Documentation]]: página principal de la documentación para desarrolladores
* [[Scripting Documentation]]: interfaces de scripting de Rosetta
* [[RosettaScripts]]: página principal de RosettaScripts
* [[PyRosetta]]: página wiki de PyRosetta
* [[Tutoriales para desarrolladores|devel-tutorials]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Commands collection]]: una lista de ejemplos de líneas de comandos para ejecutar los archivos ejecutables de Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.

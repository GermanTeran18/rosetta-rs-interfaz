Los **ClientMovers** son los componentes modulares que forman cualquier protocolo que use el [[marco del Broker|BrokeredEnvironment]]. Los ClientMovers producen [[EnvClaim]]s, que comunican al broker qué recursos se necesitan. Ya hay varios CM implementados, y esta página los describe. Para obtener información sobre cómo escribir tus propios componentes nuevos para el Broker, consulta [[Developing for the Broker]].

De forma predeterminada, el broker está configurado para no aceptar movers que no sean ClientMovers. Esto da al usuario una respuesta inmediata (_es decir_, en el momento del brokering) de que el mover que se está usando probablemente no es compatible con el broker, en lugar de esperar a que el mover haga algún movimiento ilegal 45 minutos después de iniciado el protocolo y falle entonces. Sin embargo, no es inconcebible que un mover que no es cliente del broker tenga un comportamiento legal. Por ejemplo, modificar el objeto PDBInfo no es una operación protegida por el broker y cualquier mover puede realizarla libremente. La comprobación predeterminada, en el momento del brokering, de los movers que no son clientes se puede suprimir estableciendo en true la opción `allow_pure_movers` en la definición del environment con broker.

[[_TOC_]]

# UniformRigidBodyCM
UniformRigidBodyCM es un mover que sirve de interfaz entre el broker y el mover de docking UniformRigidBodyMover. UniformRigidBodyMover espera un número de salto (jump) pero, por comodidad, UniformRigidBodyCM acepta ResidueSelectors o nombres de residuos virtuales. Por ejemplo,

```xml
<UniformRigidBodyCM name="rigid" mobile="com_A" stationary="com_B" />
```

crea un UniformRigidBodyMover llamado 'rigid' que hace docking de 'com_A' con 'com_B'. Si 'com_A' es un ResidueSelector definido, el salto se construirá de modo que se una al primer residuo de esa selección. En caso contrario, se creará un residuo virtual con ese nombre. Con 'com_B' se comporta de forma idéntica. La única diferencia entre las etiquetas 'mobile' y 'stationary' es que se espera que el salto se origine en la posición estacionaria, de modo que el origen de la rotación codificada por el salto quede centrado allí.


# FragmentCM
FragmentCM hace una inserción de fragmentos estándar en una región concreta. Una instancia de FragmentCM tiene este aspecto:

```xml
<FragmentCM name="chA_large" frag_type="classic" fragments="frags9A" selector="ChainA" initialize=true />
```

Aquí, el FragmentCM con el nombre "chA_large" se instancia con los fragmentos del [[fragment file]] "frags9A" y se le indica que inserte esos fragmentos con la política "classic" (_véase_ la política de inserción "smooth") en la región dada por el ResidueSelector 'ChainA'. La opción `initialize` sirve para establecer si el mover inserta un fragmento en cada posición una vez completado el brokering (útil durante *ab initio* para poner en marcha la estructura) o no. Se puede indicar la opción `nfrags` si hay un número de fragmentos por posición distinto del estándar (por defecto es 25). La opción `yield_cut_bias` sirve para indicar que este CM debe usar la fracción de loop de los fragmentos para decirle al broker qué segmentos deben llevar cortes.

Las opciones `fragments` y `selector` son obligatorias. La etiqueta `frag_type` es classic por defecto.

**Advertencia:** al asignar fragmentos a una selección, el primer residuo de la selección se toma como la posición sobre la que se inserta el primer fragmento del conjunto de fragmentos. No se aplica ninguna lógica adicional, lo que significa que si tu conjunto de fragmentos es más largo que tu cadena, intentará insertar fragmentos en la cadena siguiente. Además, **no se comprueba** que el residuo del fragmento coincida con el residuo del Pose, así que debes estar *muy seguro* de que asignas los fragmentos a la región correcta; de lo contrario, tus datos serán basura sin que se avise. 

# FragmentJumpCM

FragmentJumpCM inserta traslaciones de cuerpo rígido hebra beta/hebra beta en los saltos (jumps) entre hebras beta adyacentes (predichas). Una instancia de este ClientMover tiene este aspecto:

```xml
<FragmentJumpCM name="jumps" topol_file="beta_sheets.top" /> 
```

Los conjuntos de opciones válidos para este ClientMover son:

1. `topol_file`, que especifica un archivo de topología. Un archivo así se puede generar a partir de un archivo pdb con la aplicación piloto `r_pdb2top` de Oliver Lange (`apps/pilot/olli/r_pdb2top.cc` en el momento de escribir esto). Por ejemplo:
    `r_pdb2top.linuxgccrelease -in:file:s start.pdb -out:top start.top`
2. `ss_info`, `n_sheets` y `pairing_file`. Estas requieren, respectivamente, un archivo .ss2 de PsiPred, un número de láminas que construir (normalmente 1 o 2) y un «archivo de apareamientos» que indique una lista de apareamientos residuo-residuo (lamentablemente, el formato del archivo no está documentado; consulta `core::scoring::dssp::read_pairing_list` para ver la forma requerida de este archivo).
3. `restart_only`. En este caso, FragmentJumpCM requiere que haya `JumpSampleData` en la DataCache del Pose. Solo para uso avanzado.

# LoopCM

LoopCM construye uno de los cuatro movers siguientes: LoopMover_Perturb_KIC, LoopMover_Refine_KIC, LoopMover_Perturb_CCD, LoopMover_Refine_CCD. El algoritmo lo da la etiqueta `algorithm` ("CCD" o "KIC") y la forma, la etiqueta "style" ("refine" o "perturb"). A continuación se muestra un ejemplo.

```xml
<LoopCM name="kic_refine" style="refine" algorithm="kic" selector="loop1" />
```

La etiqueta `selector` hace referencia a un ResidueSelector, que se usa para determinar los ángulos de torsión que se moverán en el modelado del loop. La selección se amplía en un residuo para dar cabida a ciertas peculiaridades de algunos modeladores de loops.

# RigidChunkCM

RigidChunkCM mantiene constante una región determinada del Pose (fija en las coordenadas de un archivo .pdb dado) e impide que otros movers muestreen esos ángulos de torsión. Un ejemplo de uso:

```xml
<RigidChunkCM name="chunk" 
              template="1uufA.pdb" region_selector="template_selector"
              selector="simulation_selector" />
```

crea un RigidChunkCM llamado "chunk". La opción "template" proporciona el archivo PDB del que copiar o, si indicas la cadena "INPUT", usará el estado del Pose en el momento del brokering.

`RigidChunkCM` también necesita que se le indique qué regiones de la estructura plantilla debe tomar. Esto se especifica de varias maneras. La primera es usar la opción `region_file`. Toma un [[loops file]] para especificar las regiones *de la plantilla* que se usarán para insertar en la simulación. Por ejemplo,

    RIGID 1 16 0 0 0
    RIGID 36 46 0 0 0
    RIGID 56 63 0 0 0

tomará las regiones 1-16, 26-46 y 56-63 del Pose plantilla y las insertará una a una en los residuos especificados por la opción `selector`. En lugar de un [[loops file]], puedes usar un selector de residuos con la opción `region_selector`, o una región escrita directamente (*p. ej.*, "1-16,26-46,56-63") con la opción `region`.

Se usa un selector adicional para seleccionar regiones concretas de la simulación en las que insertar. Esto se hace proporcionando un ResidueSelector con la opción `selector`. La correspondencia entre la plantilla (`region_selector`, `region_file`, `region`) y el ResidueSelector de la simulación (`selector`) es simplemente por pares, empezando por el primer residuo de cada selección. Así, si las regiones son (*a* - *b*) y (*x* - *y*), respectivamente, el residuo *a* de la plantilla se insertará sobre el residuo *x* de la simulación, el residuo (*a* + 1) sobre (*x* + 1), y así sucesivamente, hasta insertar el residuo *b* de la plantilla sobre el residuo *y* de la simulación. Si (*b* - *a*) < (*y* - *x*) (*es decir*, hay más residuos seleccionados en la plantilla que en la simulación), la región simplemente se truncará de modo que la última inserción sea la del residuo *b* de la plantilla sobre el residuo *x* + (*b* - *a*) de la simulación.

Para complicar aún más las cosas, las regiones no tienen por qué ser contiguas. Una región puede ser, por ejemplo, los residuos *a*-*b* y (*c* - *d*). Si esa es la selección de la plantilla y el selector de la simulación selecciona los residuos *w*-*x* y (*y* - *z*), *a* se emparejará con *w*, y (*a* + *i*) se emparejará con (*w* + *i*) para *i* [1,*b*-*a*]. Si (*b* - *a*) < (*x* - *w*), *c* se emparejará con *w* + (*x* - *b*); en otras palabras, el emparejamiento continúa ignorando por completo la interrupción en los residuos.

A veces resulta útil aplicar un mover a la plantilla justo después de cargarla. Por ejemplo, dado un PDB de todos los átomos, a veces queremos convertirlo a una representación centroide para simulaciones de estilo *ab initio* (esto evita problemas con números distintos de átomos en la plantilla y en la simulación). Aquí se aplica un SwitchResidueTypeSetMover a la plantilla antes de usarla para establecer los grados de libertad internos de la simulación.

```xml
<SwitchResidueTypeSetMover name="centroid" set="centroid" />
<RigidChunkCM name="chunk" region_file="core.rigid" template="template.pdb" apply_to_template="centroid" />
```

Se pueden separar varios movers con comas. Así, `apply_to_template="centroid,fullatom,centroid"` aplicaría el mover `centroid`, seguido del mover `fullatom` y luego del mover `centroid` (y, por tanto, equivale a aplicar simplemente `centroid`).

# CoMTrackerCM

```xml
<CoMTrackerCM name=(&string) mobile_selector=(&string) />
```

CoMTrackerCM crea un residuo virtual que sigue en el espacio un conjunto concreto de átomos. La única opción es "mobile_selector", que indica la región que se debe seguir. La opción "name" es algo especial, ya que el residuo virtual creado también llevará ese nombre. Así, otros ClientMovers que necesiten saltar hacia o desde ese residuo usan ese nombre.

# AbscriptLoopCloserCM
AbscriptLoopCloserCM usa WidthFirstSlidingWindowLoopCloser (que se emplea en _ab initio_ para cerrar roturas de cadena no físicas) para arreglar loops. Un ejemplo de instancia es:

```xml
<AbscriptLoopCloserCM name="closer" fragments="frag3.dat" />
```

Donde la opción fragfile indica un archivo en el que se encuentran los fragmentos que se usarán para cerrar el loop.

También se le puede proporcionar una función de puntuación específica para usar durante el cierre con la opción `scorefxn`. Si no se establece esta opción, el valor por defecto es `score3`. Se incluirán los parches proporcionados con la opción `-abinitio::stage4_patch`, y el término `linear_chainbreak` se controla con la opción `-jumps::chainbreak_weight_stage4`. El término `atom_pair_constraint` se puede controlar con `constraints::cst_weight`.

# AbscriptMover

AbscriptMover es un contenedor de movers especial que se usa para replicar el estado de _ab initio_ a principios de 2014. Un ejemplo de instancia es

```xml
<AbscriptMover name="abinitio" cycles=2 >
 <Fragments large_frags="frag9.dat" small_frags="frag3.dat" />
 <Stage ids="I-IVb" >
   <Mover name=[MoverName1]/>
 </Stage>
 <Stage ids="II">
   <Mover name=[MoverName2]/>
 </Stage>
</AbscriptMover>
```

Aquí, la etiqueta cycles equivale a la opción `-run:increase_cycles` del _ab initio_ estándar y multiplica por ese factor el número de ciclos de _ab initio_. Esto es importante tenerlo en cuenta porque el número de inserciones de fragmentos es un número fijo y no aumentará automáticamente al aumentar el tamaño de la proteína. Se recomiendan valores entre 2 y 10, según la dificultad de la proteína y la disponibilidad de tiempo de procesador.

La subetiqueta `Stage` sirve para añadir movers a subetapas concretas de *ab initio*, que se indican con la opción "id". Los valores válidos son `I`, `II`, `IIIa`, `IIIb`, `IVa` y `IVb`, y se pueden usar rangos. También se pueden usar varias subetiquetas Stage. La etapa III alterna entre IIIa y IIIb, y la etapa IV alterna entre IVa y IVb. La subetiqueta "Mover" de "Stage" nombra, con la opción "name", un mover (definido previamente) que se va a añadir.

Se pueden omitir etapas indicando la opción "skip_stages" con los valores "1", "2", "3" o "4" (o varias etapas separadas por comas). 

La puntuación en cada una de las cuatro etapas se modifica con las opciones `-abinitio::stage1_patch`, `-abinitio::stage2_patch`, `-abinitio::stage3_patch` y `-abinitio::stage4_patch`.


### Subetiqueta Fragments

La subetiqueta `Fragments` es una macro que sirve para añadir los ClassicFragmentMovers adecuados. Como existen tres movers de este tipo (fragmentos grandes, inserción normal de fragmentos pequeños, inserción suave de fragmentos pequeños), resulta laborioso definirlos todos individualmente y añadirlos a las etapas adecuadas con la API habitual. Esta macro tiene la opción `large` para los archivos de fragmentos de 9 residuos, `small` para los de 3 residuos, y permite que `selector` establezca el ResidueSelector que define la región de inserción. Las fracciones de loop de los fragmentos de 3 residuos también se usan para establecer los sesgos de corte que el Broker utiliza para colocar cortes automáticamente (si es necesario).

En otras palabras, el código
```xml
<AbscriptMover name="abinitio" cycles="2" >
    <Fragments large_frags="frag9.dat" small_frags="frag3.dat" />
</AbscriptMover>
```

equivale aproximadamente a lo siguiente:

```xml
<FragmentCM name="frag-large" frag_type="classic" fragments="frag9.dat" />
<FragmentCM name="frag-small" frag_type="classic" fragments="frag3.dat" yield_cut_bias=true />
<FragmentCM name="frag-smooth" frag_type="smooth" fragments="frag3.dat" />

<AbscriptMover name="abinitio" cycles="2" >
  <Stage ids="I-IIIb">
    <Mover name="frag-large" />
  </Stage>
  <Stage ids="IVa">
    <Mover name="frag-small" />
  </Stage>
  <Stage ids="IVb" >
    <Mover name="frag-smooth" />
  </Stage>
</AbscriptMover>
```

La macro está implementada en `AbscriptMover::add_frags`.

# ScriptCM

ScriptCM es el más flexible de los ClientMovers. Funciona instanciando dinámicamente ClientMovers y [[EnvClaim]]s según lo que el usuario describa en el RosettaScript. El siguiente ejemplo crea un mover que minimiza un salto (jump) entre dos selecciones de residuos construidas por ResidueSelectors, uno llamado "ChainA" y otro llamado "ChainB":

```xml
<ScriptCM name="SideChainMin" >
  <MinMover />
  <JumpClaim position1="ChainA" position2="ChainB" control_strength="MUST_CONTROL" />
</ScriptCM>
```

La única opción que admite la etiqueta ScriptCM de nivel superior es name, que no tiene ningún significado especial.

Hay dos tipos de subetiquetas permitidas para ScriptCM. El primero es la subetiqueta de instanciación de movers. Si el nombre de la etiqueta (en el ejemplo anterior, "MinMover") no es un [[EnvClaim]] (más sobre ellos después), ScriptCM intenta interpretarlo como un mover que debe instanciarse. Esto funciona igual que la instanciación de movers en el resto de [[RosettaScripts|RosettaScripts Documentation]], salvo que el mover debe heredar de MoveMapMover, lo que exige implementar los métodos movemap y set_movemap. Solo se permite un «mover cliente» de este tipo, y el apply de ScriptCM simplemente llama al apply del cliente.

El segundo tipo de subetiqueta de ScriptCM es la subetiqueta Claim. En el momento de escribir esto, las claims disponibles son: [[JumpClaim|EnvClaim#JumpClaim]], [[TorsionClaim|EnvClaim#TorsionClaim]], [[XYZClaim|EnvClaim#XYZClaim]], [[VirtResClaim|EnvClaim#VirtResClaim]] y [[CutBiasClaim|EnvClaim#CutBiasClaim]]. No espero que esta lista crezca mucho, ya que en realidad no hay tantos tipos distintos de grados de libertad disponibles (en el árbol de átomos solo están representados las traslaciones de salto, las rotaciones de salto, las torsiones, las longitudes de enlace y los ángulos de enlace), así que piénsalo dos veces antes de escribir las tuyas. Yo (el autor) estaré encantado de hablar de ello si lo estás considerando. Cada una de estas Claims sirve para seleccionar, y en algunos casos instanciar, ciertos grados de libertad dentro del AtomTree naciente durante el brokering para que este ScriptCM los mueva. Se permite un número arbitrario de subetiquetas `Claim`.

Una vez completado el brokering, ScriptCM pasa un MoveMap basado en el acceso que las claims le permiten tener en la Conformation de consenso. Este MoveMap se pasa luego al mover cliente mediante el método obligatorio set_movemap.


##Véase también

* [[Página principal del TopologyBroker|BrokeredEnvironment]]
* [[Lista de movers de RosettaScripts|Movers-RosettaScripts]]
* [[Scripting Documentation]]: interfaces de scripting de Rosetta
* [[RosettaScripts]]: página principal de RosettaScripts
* [[Writing an app]]: tutorial para escribir una aplicación en C++
* [[Development Documentation]]: página principal de la documentación para desarrolladores
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Commands collection]]: una lista de ejemplos de líneas de comandos para ejecutar los archivos ejecutables de Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.

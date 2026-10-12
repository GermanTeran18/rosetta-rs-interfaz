El marco de trabajo Brokered Environment, también conocido como ToplogyBroker 2.0, es una herramienta para generar sistemas de simulación más grandes y complejos a partir de piezas pequeñas e intercambiables. La intención es facilitar el desarrollo rápido de protocolos en [[RosettaScripts]], [[PyRosetta]] e incluso C++, permitiendo que las estrategias de muestreo se lleven a cabo de forma simultánea en lugar de en secuencia, mediante la construcción de un [[FoldTree|foldtree-overview]] de consenso que satisfaga a todos los movers. Estos Movers heredan de la clase [[ClientMover|ClientMovers]] (CM).

Puedes encontrar un tutorial sobre plegamiento de proteínas con el Broker [aquí](https://www.rosettacommons.org/demos/latest/tutorials/advanced_denovo_structure_prediction/folding_tutorial).

**Nota del autor:** si algo de aquí no tiene sentido, no funciona como se anuncia o requiere atención por algún otro motivo, avísame (soy el desarrollador original) en justinrporter at gmail. Dediqué mucho tiempo a esto y me encantaría ver a más gente usándolo, así que si puedo ayudar, házmelo saber.

[[_TOC_]]

#ClientMovers disponibles

Tenemos una lista de [[ClientMovers]] disponibles.

# El Broker en RosettaScripts

Usar un Environment con broker en tus [[RosettaScripts]] es tan fácil como:

1. Define tus ClientMovers.
2. Añade tus ClientMovers a un Environment.
3. Invoca tu environment en el bloque PROTOCOLS.

## Un ejemplo sencillo

En el siguiente ejemplo, se usan ChainResidueSelectors que seleccionan las cadenas llamadas "A" y "B" para construir un [[UniformRigidBodyCM|ClientMovers#UniformRigidBodyCM]] que hace docking de esas dos cadenas entre sí. 

```
<ROSETTASCRIPTS>
  <RESIDUE_SELECTORS>
    <Chain name="ChainA" chains="A" />
    <Chain name="ChainB" chains="B" />
  </RESIDUE_SELECTORS>
  <MOVERS>
    <UniformRigidBodyCM name="dock" mobile="ChainA" stationary="ChainB" />
    <Environment name="dockenv">
      <!-- This will only apply the mover once, you'd need a GenericMonteCarlo for proper sampling -->
      <Apply name="dock"/>
    <Environment/>
  </MOVERS>
  <PROTOCOLS>
    <Add mover="dockenv"/>
  </PROTOCOLS>
</ROSETTASCRIPTS>
```

## Ejemplo _ab initio_

El siguiente ejemplo replica una ejecución _[[ab initio|Abinitio Relax]]_. El archivo "beta_sheets.top" contiene una topología de apareamiento de hebras beta predicha, y los fragmentos de 9 y 3 residuos están en [[archivos de fragmentos|fragment file]] llamados "frag9.dat" y "frag3.dat", respectivamente. Los loops se cierran con [[AbscriptLoopCloserCM|ClientMovers#AbscriptLoopCloserCM]] después de que [[AbscriptMover|ClientMovers#AbscriptMover]] ejecute todas las etapas de abinitio, y luego FastRelax refina la estructura en modo de todos los átomos. Aquí se supone que el Pose de entrada está en modo centroide.

Hay un ejemplo completo y funcional del uso de este script para plegar ubiquitina en el repositorio de demos de Rosetta, en `demos/protocol_capture/broker/ubq/`.

```
<MOVERS>
  <FragmentJumpCM name="jumps" topol_file="beta_sheets.top" />

  <AbscriptMover name="abinitio" cycles=2 >
    <Fragments large_frags="frag9.dat" small_frags="frag3.dat" />
    <Stage ids="I-IVb" >
      <Mover name="jumps" weight=1.0 />
    </Stage>
  </AbscriptMover>

  <AbscriptLoopCloserCM name="closer" fragments="frag3.dat" />

  <Environment name="env" auto_cut=1 >
    <Apply mover="abinitio" />
    <Apply mover="closer" />
  </Environment>

  <SwitchResidueTypeSetMover name="fullatom" set="fa_standard" />
  <FastRelax name="relax" repeats=5 />
</MOVERS>

<PROTOCOLS>
  <Add mover="env" />
  <Add mover="fullatom" />
  <Add mover="relax" />
</PROTOCOLS>
```

## Modelado de una inserción de dominio

Considera la proteína de inserción de dominio AB, en la que la proteína A (de estructura conocida) tiene insertada en algún punto la proteína B (de estructura desconocida). Manteniendo fija la parte A de la proteína de fusión, queremos insertar fragmentos en la proteína B sin perturbar la estructura de A.

```
<ROSETTASCRIPTS>
  <RESIDUE_SELECTORS>
    <!-- The crystal structure is missing density inside the inserted domain
         (resids 267-275). As a result, we need to use a different numbering
         scheme when we talk about the pdb as we do when we talk about the
         extended chain that we're simulating. -->
    <!-- host_domain_wo_linker selects the host domain when the residues
         not modeled in the crystal structure are not present (i.e. crystal structure numbering). -->
    <Index name="host_domain_wo_linker" resnums="1-159,288-339" />
    <!-- "host domain_w_linker" selects the host domain when the residues
         not modeled in the crystal structure ARE present (i.e. simulation numbering). -->
    <Index name="host_domain_w_linker" resnums="1-159,295-346" />
    <Not name="inserted_domain" selector="host_domain_w_linker" />
  </RESIDUE_SELECTORS>
  <MOVERS>
    <SwitchResidueTypeSetMover name="centroid" set="centroid" />

    <FragmentJumpCM name="jumps" topol_file="1uufA.top" />

    <AbscriptMover name="abinitio" cycles="6" >
      <Fragments large_frags="1uufA.frag9" small_frags="1uufA.frag3" />
      <Stage ids="I-IVb" >
        <Mover name="jumps" />
      </Stage>
    </AbscriptMover>
    
    <!-- "region_selector" : the selector that selects the residues from the pdb
         "selector" : selector that selects the destination for residues selected by "region_selector"
         "apply_to_template" : applies a mover to the template PDB before copying atomic coordinates;
                               required, since we need a match in atom numbers and types to copy.
    -->
    <RigidChunkCM name="chunk" region_selector="host_domain_wo_linker"
                  template="1uufA.pdb" selector="host_domain_w_linker"
                  apply_to_template="centroid" />
    <AbscriptLoopCloserCM name="closer" fragments="1uufA.frag3" />
    
    <Environment name="env" auto_cut="1" >
      <Register mover="chunk" />
      <Apply mover="abinitio" />
      <Apply mover="closer" />
    </Environment>

    <SwitchResidueTypeSetMover name="fullatom" set="fa_standard" />

    <!-- We've reduced the number of fastrelax repeats because it is so time-consuming. In "real life", this would need to be high(er). The default in abinitio is 5.-->
    <FastRelax name="relax" repeats="2" />
    
  </MOVERS>
  <FILTERS>
  </FILTERS>
  <PROTOCOLS>
    <Add mover="centroid" />
    <Add mover="env" />
    <Add mover="fullatom" />
    <Add mover="relax" />
  </PROTOCOLS>
</ROSETTASCRIPTS>
```

El algoritmo de este ejemplo, que podría usarse en esta situación, se basa en un [[RigidChunkCM|ClientMovers#RigidChunkCM]] `host`, responsable de mantener fijo el dominio A, y un [[FragmentCM|ClientMovers#FragmentCM]], responsable de muestrear el espacio torsional del dominio B. El ResidueSelector `host_region` indica la región del espacio de secuencia que corresponde al dominio A; en este caso, los residuos 1-X e Y-Z. Así, `host` sabe que debe aplicar los residuos 1-X del Pose plantilla `1ubq.pdb` a los residuos 1-X de la proteína de fusión. Sin embargo, al llegar al residuo X se detiene. Los residuos X+1 a Y-1 los muestrea el [[FragmentCM|ClientMovers#FragmentCM]]. Luego, los residuos Y-Z se mantienen fijos en la conformación que se encuentra en los residuos X+1 hasta el FINAL de `1ubq.pdb`. Estos bloques rígidos de proteína (1-X e Y-Z) están relacionados en el espacio mediante un salto (jump), que también mantiene fija su posición relativa. El corte se coloca al azar, ponderado por la propensión a loop en el FragmentCM.

Por supuesto, no hay garantías de que este algoritmo de ejemplo funcione para tu sistema (ni para ningún otro). No se ha sometido a un benchmark y existe únicamente para demostrar la funcionalidad del marco Environment.

Hay un ejemplo completo y funcional del uso de este script en el repositorio de demos de Rosetta, en `demos/protocol_capture/2015/broker/domain_insertion/`. En nuestro artículo para la colección PLoS ONE de RosettaCon 2014 se incluye una descripción y un análisis detallados de este protocolo.

## Ejemplo de docking de varios cuerpos

Este ejemplo hace docking de tres cadenas (A, B y C) entre sí con un [[FoldTree|foldtree-overview]] en «estrella», mediante [[UniformRigidBodyCMs|ClientMovers#UniformRigidBodyCM]]. En otras palabras, las tres cadenas hacen docking con un residuo virtual central. Esto contrasta con un esquema de docking de dos a uno. Se usa un TrialMover para ejecutar 1000 ciclos de docking. Los [[CoMTrackerCMs|ClientMovers#CoMTrackerCM]] crean residuos virtuales centrados en el centro de masa de cada cadena, que se usan como la otra base del salto (jump) que construye cada cadena.

```
<RESIDUE_SELECTORS>
  <Chain chains="A" name="ChainA" />
  <Chain chains="B" name="ChainB" />
  <Chain chains="C" name="ChainC" />
</RESIDUE_SELECTORS>
<MOVERS>
  <CoMTrackerCM name="com_A" mobile_selector="ChainA" />
  <CoMTrackerCM name="com_B" mobile_selector="ChainB" />
  <CoMTrackerCM name="com_C" mobile_selector="ChainC" />

  <UniformRigidBodyCM name="rigidA" mobile="com_A" stationary="star_center" />
  <UniformRigidBodyCM name="rigidB" mobile="com_B" stationary="star_center" />
  <UniformRigidBodyCM name="rigidC" mobile="com_C" stationary="star_center" />

  <RandomMover name="dock_bag" movers="rigidA,rigidB,rigidC,com_A,com_B,com_C" />
  <GenericMonteCarlo name="dock" scorefxn_name="talaris2013" mover_name="dock_bag" temperature=2.0 trials=1000 />

  <Environment name=multidock >
    <Apply name=dock />
  </Environment>
</MOVERS>
<PROTOCOLS>
  <Add mover="multidock"/>
</PROTOCOLS>
```

En nuestro artículo para la colección PLoS ONE de RosettaCon 2014 se incluye una implementación de un protocolo similar con este paradigma, junto con una descripción y un análisis detallados.

## Ejemplo de Fold and Dock (asimétrico)

[[Fold and Dock]] es un protocolo diseñado para predecir la estructura de multímeros simétricos obligados. Aunque el broker no admite actualmente la simetría, sí ofrece la funcionalidad necesaria para todas las partes de ese protocolo *excepto* el reflejo simétrico. Para demostrarlo, construimos un script de ejemplo que muestra cómo podría lograrse el plegamiento y el docking simultáneos de un heterodímero obligado.

```
<RESIDUE_SELECTORS>
  <Chain chains="A" name=ChainA />
  <Chain chains="B" name=ChainB />
</RESIDUE_SELECTORS>

<MOVERS>
  <CoMTrackerCM name=com_A mobile_selector=ChainA />
  <CoMTrackerCM name=com_B mobile_selector=ChainB />

  <UniformRigidBodyCM name=rigid mobile=com_A stationary=com_B />

  <AbscriptMover name=abinitio >
    <Fragments small_frags=frags3A.txt large_frags=frags9A.txt selector=ChainA />
    <Fragments small_frags=frags3B.txt large_frags=frags9B.txt selector=ChainB />
    <Stage ids=I-IVb>
      <Mover name=rigid />
      <Mover name=com_A />
      <Mover name=com_B />
    </Stage>
  </AbscriptMover>

  <AbscriptLoopCloserCM name=closerA fragments="frags3A" selector=ChainA />
  <AbscriptLoopCloserCM name=closerB fragments="frags3B" selector=ChainB />

  <ResidueTypeSetSwitchMover name=fullatom set=fa_standard />
  <FastRelax name=relax repeats=5 />

  <Environment name=fold_and_dock auto_cut=true >
    <Apply name=abintio />
    <Apply name=closerA />
    <Apply name=closerB />
  </Environment>
</MOVERS>
<PROTOCOLS>
  <Add mover=fold_and_dock />
  <Add mover=fullatom />
  <Add mover=relax />
</PROTOCOLS>
```

# El Broker en aplicaciones C++

Esta sección trata de construir protocolos que usan el broker y [[ClientMovers]] existentes para crear un protocolo o aplicación en C++, no de [[Developing for the Broker]]. Crear un Environment con broker en tu código C++ es tan fácil como:

1. **Crear un Environment**. Hay un par de opciones que se pueden establecer en el constructor (*p. ej.*, si el Environment debe consultar el [[FoldTree|foldtree-overview]] antiguo para resolver ciclos del [[FoldTree|foldtree-overview]]), pero en la mayoría de los casos basta con darle un nombre.
2. **Registrar tus ClientMovers** en el environment. Así el Broker sabe que debe pedir reclamaciones (claims) a este mover durante el proceso de brokering.
3. **Aplicar tus movers.** Environment::start devuelve un Pose que lleva incorporada una ProtectedConformation. Es el Pose con el [[FoldTree|foldtree-overview]] de consenso y todas las protecciones de los grados de libertad (DoF) asociadas. Aplica tu protocolo a este objeto.
4. **Cerrar tu environment.** Una vez que hayas ejecutado tu protocolo (o quieras pasar a la siguiente etapa, ya sea ejecutada por otro broker o sin broker), debes limpiar. Environment::end se encarga de ello.

Para un protocolo con un solo [[ClientMover|ClientMovers]] (llamado MyClientMover), podría verse así.

```
  protocols::environment::Environment env( "env" );
  MyClientMoverOP my_mover = new MyClientMover( arg1, arg2, ... );

  env.register_mover( my_mover );

  core::pose::Pose prot_pose = prot_pose = env.start( pose );

  my_mover->apply( prot_pose );

  core::pose::Pose final_pose = env.end( prot_pose );
```

Hay muchos más ejemplos disponibles como pruebas unitarias en `test/protocols/environment/*`.

# El Broker en PyRosetta

[[PyRosetta]] da acceso directo a la interfaz de C++ que usa el broker. Por ello, la interfaz de PyRosetta para el broker debería diferir solo de forma trivial de la [[interfaz de C++|BrokeredEnvironment#The-Broker-in-C++-Applications]].

Como el Broker no se desarrolló pensando específicamente en PyRosetta, no se sabe si es posible definir en PyRosetta movers compatibles con el broker. La compatibilidad con PyRosetta en general *debería* funcionar, pero no lo hemos probado de forma rigurosa. Si te interesa PyRosetta + Broker, pruébalo. Si te encuentras con problemas (¡o lo consigues!), cuéntanos qué hiciste y cómo, para que podamos actualizar esta sección.

##Véase también

* [Plegamiento de proteínas con el Broker
](https://www.rosettacommons.org/demos/latest/tutorials/advanced_denovo_structure_prediction/folding_tutorial)
* [[Scripting Documentation]]: interfaces de scripting de Rosetta
* [[RosettaScripts]]: página principal de RosettaScripts
* [[PyRosetta]]: página wiki de PyRosetta
* [[Writing an app]]: tutorial para escribir una aplicación en C++
* [[Development Documentation]]: página principal de la documentación para desarrolladores
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Commands collection]]: una lista de ejemplos de líneas de comandos para ejecutar los archivos ejecutables de Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.

<!--
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
TopologyBroker Topology Broker
-->
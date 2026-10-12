#TaskOperations (RosettaScripts)

[[Volver a RosettaScripts|RosettaScripts]]

Un TaskFactory usa las TaskOperations para configurar el comportamiento y crear un PackerTask cuando este se genera bajo demanda para las rutinas que usan el «packer» para reorganizar o mutar cadenas laterales. El PackerTask controla qué residuos son empaquetables, diseñables o se mantienen fijos. Cuando las usan ciertos Movers (por ahora, el PackRotamersMover y sus subclases), el conjunto de TaskOperations controla lo que ocurre durante el empaquetado, normalmente mediante «máscaras» de restricción.

El PackerTask se puede imaginar como una escultura de hielo. Por defecto, todo puede empaquetarse Y diseñarse. Con las TaskOperations, o tu juego de cinceles, puedes limitar el empaquetado y el diseño a ciertos residuos. Como con el hielo, una vez que esos residuos se restringen, por lo general no se pueden volver a activar.

Hay ciertas TaskOperations de uso común que normalmente conviene incluir al diseñar. Para más información sobre ellas, consulta la página de [[TaskOperations recomendadas para diseño|Recommended_Design_TaskOperations]].

Esta sección define instancias de la jerarquía de clases TaskOperation cuando se usan en el contexto del Parser/RosettaScripts. Quedan disponibles en el DataMap.

También hay disponibles [[TaskOperations a nivel de residuo|Residue-Level-TaskOperations]] para controlar el packer a nivel de residuo.

[[_TOC_]]

Ejemplo
=======

    ...
    <TASKOPERATIONS>
      <ReadResfile name="rrf"/>
      <ReadResfile name="rrf2" filename="resfile2"/>
      <PreventRepacking name="NotBeingUsedHereButPresenceOkay"/>
      <RestrictResidueToRepacking name="restrict_Y100" resnum="100"/>
      <RestrictToRepacking name="rtrp"/>
      <OperateOnResidueSubset name="NoPackHelix">
          <SecondaryStructure ss="H" />
          <PreventRepackingRLT/>
      </OperateOnResidueSubset>
    </TASKOPERATIONS>
    ...
    <MOVERS>
      <PackRotamersMover name="packrot" scorefxn="sf" task_operations="rrf,NoPackHelix,rtrp,restrict_Y100"/>
    </MOVERS>
    ...

En el código de Rosetta, las instancias de TaskOperation se registran en un TaskOperationFactory y este las crea más tarde. La fábrica llama a parse\_tag() en la función virtual de la clase base, que por defecto no hace nada. Sin embargo, algunas clases TaskOperation (por ejemplo, OperateOnCertainResidues y ReadResfile, arriba) sí implementan parse\_tag, por lo que su comportamiento se puede configurar con opciones adicionales en la definición «XML»/Tag.

Selectores de residuos
==================

Los [[ResidueSelectors]] son un sistema flexible para especificar un conjunto particular de residuos de un Pose. Se pueden usar con la [[TaskOperation OperateOnResidueSubset|OperateOnResidueSubsetOperation]] para controlar el comportamiento del empaquetado, o con otros movers y filtros. 

Especificación por residuo
=========================

TaskOp  | Descripción
------------ | -------------
**[[OperateOnResidueSubset|OperateOnResidueSubsetOperation]]** | Usa [[ResidueSelectors]] y [[Residue Level TaskOperations]] para especificar un comportamiento concreto en un subconjunto concreto de residuos.  
**[[Operación OperateOnCertainResidues|OperateOnCertainResiduesOperation]]** | Una forma antigua de especificar grupos concretos de residuos. **Obsoleta**: usa OperateOnResidueSubset en su lugar.

Operaciones especializadas
==========================


Especificación de posición/identidad
-------------------------------

### Especificación general

TaskOP  | Descripción
------------ | -------------
**[[PreventRepacking|PreventRepackingOperation]]** | No empaqueta un residuo concreto.
**[[PreventResiduesFromRepacking|PreventResiduesFromRepackingOperation]]** | No empaqueta un conjunto especificado de residuos.
**[[RestrictToRepacking|RestrictToRepackingOperation]]** | No diseña ningún residuo.
**[[RestrictResidueToRepacking|RestrictResidueToRepackingOperation]]** | No diseña un residuo concreto.
**[[RestrictResiduesToRepacking|RestrictResiduesToRepackingOperation]]** | No diseña un conjunto especificado de residuos.
**[[RestrictChainToRepacking|RestrictChainToRepackingOperation]]** | No diseña una cadena concreta.

### Especificación general de diseño

TaskOp  | Descripción
------------ | -------------
**[[RestrictToSpecifiedBaseResidueTypes]]** | Restringe la [[paleta|PackerPalette]] de `ResidueType`s a los `ResidueType`s base indicados.
**[[ProhibitSpecifiedBaseResidueTypes]]** | Excluye los `ResidueType`s base indicados de la [[paleta|PackerPalette]] de `ResidueType`s.
**[[ReadResfile|ReadResfileOperation]]** | Lee un [[resfile|resfiles]] y aplica el comportamiento especificado.
**[[ReadResfileFromDB|ReadResfileFromDBOperation]]** | Aplica un [[resfile|resfiles]] almacenado en una base de datos relacional.
**[[ResfileCommandOperation]]** | Aplica un comando de [[resfile|resfiles]] a un conjunto de residuos de un selector de residuos. 
**[[SequenceMotifTaskOperation]]** | Crea un motivo de secuencia usando la sintaxis de motivos y un selector de residuos. Por ejemplo, N[^P][S/T], que diseñaría N, cualquier cosa que no sea prolina y, después, serina o treonina.
**[[RestrictAbsentCanonicalAAS|RestrictAbsentCanonicalAASOperation]]** | Limita el diseño a los aminoácidos especificados.
**[[DisallowIfNonnative|DisallowIfNonnativeOperation]]** | No diseña hacia ciertos residuos, pero los permite si ya existen.
**[[LinkResidues]]** | Obliga a que grupos de residuos muten juntos.

<!--- BEGIN_INTERNAL -->
TaskOp  | Descripción
------------ | -------------
**[[RestrictIdentities|RestrictIdentitiesOperation]]** | No diseña los residuos con una identidad inicial concreta.
<!--- END_INTERNAL --> 

### Especificación basada en propiedades

TaskOp  | Descripción
------------ | -------------
**[[RestrictToResidueProperties]]** | Restringe la [[paleta|PackerPalette]] de `ResidueType`s a los que tengan las propiedades indicadas.
**[[ProhibitResidueProperties]]** | Excluye de la [[paleta|PackerPalette]] los `ResidueType`s con las propiedades indicadas.
**[[ConservativeDesign|ConservativeDesignOperation]]** | Solo diseña hacia aminoácidos similares al nativo.
**[[ConsensusLoopDesign|ConsensusLoopDesignOperation]]** | Solo diseña hacia aminoácidos de los loops que coincidan con los intervalos de torsión ABEGO.
**[[DsspDesign|DsspDesignOperation]]** | Especifica la identidad del diseño según la estructura secundaria.
**[[DesignCatalyticResidues|DesignCatalyticResiduesOperation]]** | Solo diseña los residuos que rodean a los residuos de las [[restricciones de enzdes|match-cstfile-format]]. 
**[[DesignByResidueCentrality|DesignByResidueCentralityOperation]]** | Diseña solo los residuos que tienen una alta interconexión con otros residuos.
**[[DesignByCavityProximity|DesignByCavityProximityOperation]]** | Solo diseña los residuos alrededor de huecos.
**[[DesignRandomRegion|DesignRandomRegionOperation]]** | Diseña solo una sección aleatoria del Pose. 
**[[HighestEnergyRegion|HighestEnergyRegionOperation]]** | Diseña solo los residuos que tienen una mala energía.
**[[DesignRestrictions|DesignRestrictionsOperation]]** | Establece los aminoácidos permitidos y/o las residue_level_operations para varios selectores de residuos. Úsala en lugar de LayerDesign.
**[[LayerDesign|LayerDesignOperation]]** | HEREDADA: especifica la identidad del diseño según la estructura secundaria y el grado de enterramiento.
**[[NoRepackDisulfides|NoRepackDisulfidesOperation]]** | No reempaqueta los residuos de disulfuro.
**[[ProteinCore|ProteinCoreOperation]]** | No diseña los residuos del núcleo de la proteína.
**[[SelectResiduesWithinChain|SelectResiduesWithinChainOperation]]** | No empaqueta ni diseña residuos según su posición en una cadena.
**[[SelectBySASA|SelectBySASAOperation]]** | Reempaqueta residuos según su exposición a la superficie.
**[[SetCatalyticResPackBehavior|SetCatalyticResPackBehaviorOperation]]** | Desactiva el empaquetado o el diseño de los residuos de las [[restricciones de enzdes|match-cstfile-format]]. 
**[[RestrictAAsFromProbabilities]]** | Restringe los aminoácidos según una PerResidueProbabilitiesMetric.
**[[RestrictToTermini|RestrictToTerminiOperation]]** | Solo reempaqueta los extremos.

<!--- BEGIN_INTERNAL -->
TaskOp  | Descripción
------------ | -------------
**[[DesignBySecondaryStructure|DesignBySecondaryStructureOperation]]** | No diseña los residuos que coinciden con sus predicciones de estructura secundaria.
<!--- END_INTERNAL -->

### Especificaciones de interfaz/vecindad

TaskOp  | Descripción
------------ | -------------
**[[DesignAround|DesignAroundOperation]]** | Limita el diseño y el reempaquetado a una cierta distancia alrededor de residuos especificados. 
**[[DetectProteinLigandInterface|DetectProteinLigandInterfaceOperation]]** | Solo reempaqueta y diseña los residuos cercanos a una interfaz proteína/ligando especificada.
**[[ProteinInterfaceDesign|ProteinInterfaceDesignOperation]]** | Solo reempaqueta y diseña los residuos cercanos a una interfaz proteína/proteína especificada.
**[[RestrictToInterface|RestrictToInterfaceOperation]]** | Restringe a una interfaz proteína/proteína.
**[[RestrictToInterfaceVector|RestrictToInterfaceVectorOperation]]** | Restringe a una interfaz proteína/proteína.
**[[RestrictDesignToProteinDNAInterface|RestrictDesignToProteinDNAInterfaceOperation]]** | Limita el reempaquetado y el diseño a los residuos alrededor del ADN.

<!--- BEGIN_INTERNAL -->
TaskOp  | Descripción
------------ | -------------
**[[BuildingBlockInterface|BuildingBlockInterfaceOperation]]** | Solo diseña los residuos cercanos a la interfaz de bloques de construcción simétricos.
<!--- END_INTERNAL --> 

### Diseño basado en la entrada

TaskOp  | Descripción
------------ | -------------
**[[AlignedThread|AlignedThreadOperation]]** | Diseña hacia las identidades de un archivo FASTA.
**[[DatabaseThread|DatabaseThreadOperation]]** | Diseña a partir de una secuencia de una base de datos.
**[[JointSequence|JointSequenceOperation]]** | Diseña solo hacia las identidades comunes a varias entradas.
**[[RestrictNativeResidues|RestrictNativeResiduesOperation]]** | Desactiva el diseño o el reempaquetado de los residuos que son iguales a los del Pose nativo.
**[[RestrictIdentitiesAtAlignedPositions|RestrictIdentitiesAtAlignedPositionsOperation]]** | Restringe el diseño a la secuencia de un PDB proporcionado.
**[[RestrictToAlignedSegments|RestrictToAlignedSegmentsOperation]]** | Solo diseña en los segmentos alineados.
**[[SeqprofConsensus|SeqprofConsensusOperation]]** | Diseña residuos a partir de una PSSM.
**[[ThreadSequence|ThreadSequenceOperation]]** | Diseña hacia las identidades de una secuencia proporcionada.


### Varios

<!--- BEGIN_INTERNAL -->
TaskOp  | Descripción
------------ | -------------
**[[RetrieveStoredTask|RetrieveStoredTaskOperation]]** | Usa una tarea almacenada por un [[StoreTaskMover]].
<!--- END_INTERNAL --> 

Especificación de rotámeros
---------------------

TaskOp  | Descripción
------------ | -------------
**[[InitializeFromCommandline|InitializeFromCommandlineOperation]]** | Aplica ciertas opciones de línea de comandos sobre el comportamiento del packer. 
**[[IncludeCurrent|IncludeCurrentOperation]]** | Indica al packer que considere también el rotámero de entrada.
**[[ExtraRotamersGeneric|ExtraRotamersGenericOperation]]** | Muestrea los ángulos chi de los residuos con mucha más finura durante el empaquetado.
**[[AddLigandMotifRotamers|AddLigandMotifRotamersOperation]]** | Incluye interacciones similares a las nativas con un ligando a partir de un archivo de base de datos.
**[[InteractingRotamerExplosion|InteractingRotamerExplosionOperation]]** | Aumenta el muestreo de los rotámeros que puntúan bien con un residuo objetivo especificado.
**[[ImportUnboundRotamers|ImportUnboundRotamersOperation]]** | Incluye rotámeros de un archivo PDB.
**[[LimitAromaChi2|LimitAromaChi2Operation]]** | No usa rotámeros aromáticos que se sabe que producen diseños espurios.
**[[RotamerExplosion|RotamerExplosionOperation]]** | Muestrea los ángulos chi de los residuos con mucha más finura durante el empaquetado.
**[[SampleRotamersFromPDB|SampleRotamersFromPDBOperation]]** | Limita los rotámeros a los similares a los de un archivo PDB.
**[[PruneBuriedUnsats|PruneBuriedUnsatsOperation]]** | Elimina los rotámeros que causarían grupos enterrados sin satisfacer.


Modificación del comportamiento del packer
----------------------------

TaskOp  | Descripción
------------ | -------------
**[[KeepSequenceSymmetry|KeepSequenceSymmetry]]** | Evita que las cadenas difieran en secuencia.
**[[ModifyAnnealer|ModifyAnnealerOperation]]** | Cambia el comportamiento del packer.
**[[ProteinLigandInterfaceUpweighter|ProteinLigandInterfaceUpweighterOperation]]** | Aumenta la contribución de las interacciones proteína/ligando durante el diseño.
**[[RestrictInteractionGraphThreadsOperation]]** | Limita el número de hilos que el packer puede usar para el precálculo del grafo de interacción. (Solo afecta al comportamiento de la compilación multihilo.)
**[[SetIGType|SetIGType]]** | Establece el tipo de grafo de interacción que se usará.

Desarrollo/pruebas
-------------------

TaskOp  | Descripción
------------ | -------------
**[[InitializeExtraRotsFromCommandline|InitializeExtraRotsFromCommandlineOperation]]** | (En desarrollo)
**[[SetRotamerCouplings|SetRotamerCouplingsOperation]]** | (En desarrollo)
**[[AppendRotamer|AppendRotamerOperation]]** | (En desarrollo)
**[[AppendRotamerSet|AppendRotamerSetOperation]]** | (En desarrollo)
**[[PreserveCBeta|PreserveCBetaOperation]]** | (En desarrollo)
**[[RestrictYSDesign|RestrictYSDesignOperation]]** | Restringe las opciones de aminoácidos durante el diseño a Tyr y Ser.

Operaciones específicas de anticuerpos y CDR
============================

Requieren un anticuerpo renumerado y están pensadas para combinarse entre sí. Consulta los [[consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] y la [[guía de anticuerpos de Rosetta | antibody-applications]] para más información.

TaskOp  | Descripción
------------ | -------------
**[[AddCDRProfilesOperation]]** | Añade diseño basado en perfiles de clústeres de CDR de North/Dunbrack durante el empaquetado de los CDR seleccionados.
**[[AddCDRProfileSetsOperation]]** | Muestrea secuencias completas de CDR del clúster de CDR actual para el diseño.
**[[DisableAntibodyRegionOperation]]** | Desactiva el empaquetado o el diseño de una región del anticuerpo (CDR, marco, antígeno).
**[[DisableCDRsOperation]]** | Desactiva el empaquetado o el diseño de un conjunto de CDR especificados.
**[[RestrictToCDRsAndNeighbors]]** | Restringe el empaquetado/diseño solo a los CDR seleccionados y a cualquier residuo vecino en otros CDR y en el antígeno/marco. Combínala con DisableAntibodyRegionOperation para tener más control. 

Véase también
========

* [[RosettaScripts]]: la página principal de RosettaScripts
* [[TaskOperations recomendadas para diseño|Recommended_Design_TaskOperations]]
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[Movers de RosettaScripts|Movers-RosettaScripts]]
* [[Filtros de RosettaScripts|Filters-RosettaScripts]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Scripting Documentation]]: la página principal de la documentación de scripting
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Glossary]]
* [[RosettaEncyclopedia]]

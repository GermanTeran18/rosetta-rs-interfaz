# Ejecutar FunFolDes
Esta entrada enumera los requisitos principales para ejecutar una ejecución sencilla de **FunFolDes**.

# Planteamiento del problema
Supongamos que tenemos:
* `template.pdb`: un PDB que contiene nuestro **molde** (_template_).
* `motif.pdb`: un PDB que contiene nuestro **motivo**.

Y sabemos que:
* Usaremos la cadena `A` de `template.pdb` como nuestro **molde** real.
* Seleccionaremos como `insert_point` en el **molde** el segmento: `50A-65A`.
* Definiremos nuestro **motivo** como `30B-45B` de `motif.pdb`.
* Consideraremos la cadena `A` de `motif.pdb` como una proteína de unión a nuestro motivo.

Por último, necesitaremos una base de datos `vall` para poder crear los fragmentos.

# Preparar el script
## ResidueSelectors
Para ejecutar correctamente **FunFolDes**, hay que añadir los ResidueSelectors que eligen cada una de las etiquetas de trabajo y guían las partes no fijas del proceso. Los siguientes son los necesarios para generar el comportamiento estándar de **FFL**, y se puede considerar, más o menos, que siempre deben añadirse:
```xml
<RESIDUE_SELECTORS>
  <ResiduePDBInfoHasLabel name="MOTIF"     property="MOTIF" />
  <Not                    name="!MOTIF"    selector="MOTIF" />
  <ResiduePDBInfoHasLabel name="TEMPLATE"  property="TEMPLATE" />
  <Not                    name="!TEMPLATE" selector="TEMPLATE" />
  <ResiduePDBInfoHasLabel name="CONTEXT"   property="CONTEXT" />
  <Not                    name="!CONTEXT"  selector="CONTEXT" />
  <ResiduePDBInfoHasLabel name="FLEXIBLE"  property="FLEXIBLE" />
  <Not                    name="!FLEXIBLE" selector="FLEXIBLE" />
  <ResiduePDBInfoHasLabel name="HOTSPOT"   property="HOTSPOT" />
  <Not                    name="!HOTSPOT"  selector="HOTSPOT" />
  <ResiduePDBInfoHasLabel name="COLDSPOT"  property="COLDSPOT" />
  <Not                    name="!COLDSPOT" selector="COLDSPOT" />
  
  # can design
  <Or name="COLDSPOT_OR_TEMPLATE"              selectors="COLDSPOT,TEMPLATE" />
  # bb movement
  <Or name="FLEXIBLE_OR_TEMPLATE"              selectors="FLEXIBLE,TEMPLATE" />
  # chi movement
  <Or name="COLDSPOT_OR_FLEXIBLE_OR_TEMPLATE"  selectors="COLDSPOT,FLEXIBLE,TEMPLATE" />
  # prevent repacking and design
  <Or name="HOTSPOT_OR_CONTEXT"                selectors="HOTSPOT,CONTEXT" /> 
  <And name="HOTSPOT_OR_CONTEXT_AND_!FLEXIBLE" selectors="HOTSPOT_OR_CONTEXT,!FLEXIBLE" />
  # no design
  <And name="FLEXIBLE_AND_!COLDSPOT"           selectors="FLEXIBLE,!COLDSPOT" />
```
Y también necesitamos añadir los selectores específicos de nuestro ejercicio. Ten en cuenta que el _ChainResidueSelector_ `design` está configurado en `B`. Esto se debe a que los diseños toman su ID de cadena del ID de cadena del **motivo**. De este modo, el identificador no puede repetirse si se añade la proteína de unión.
```xml
  <Chain name="template" chains="A" />
  <Index name="insert" resnums="50A-65A" />
  <Index name="motif" resnums="30B-45B" />
  <Chain name="binder" chains="A" />
  <Chain name="design" chains="B" />
</RESIDUE_SELECTORS>
```

## TaskOperations
Hay 3 TaskOperations principales necesarias para **FunFolDes**: la que define los residuos _estáticos y no diseñables_ (`FFLMOTIF_TASKOP`), la que define los residuos _empaquetables y no diseñables_ (`FFLFLEX_TASKOP`) y la que define los residuos _diseñables con flexibilidad de la cadena principal_ (`FFLTEMPLATE_TASKOP`)
```xml
<TASKOPERATIONS>
  <OperateOnResidueSubset name="FFLMOTIF_TASKOP" selector="HOTSPOT_OR_CONTEXT_AND_!FLEXIBLE" >
    <PreventRepackingRLT/>
  </OperateOnResidueSubset>
  <OperateOnResidueSubset name="FFLFLEX_TASKOP" selector="FLEXIBLE_AND_!COLDSPOT" >
    <RestrictToRepackingRLT/>
  </OperateOnResidueSubset>
  <OperateOnResidueSubset name="FFLTEMPLATE_TASKOP" selector="COLDSPOT_OR_TEMPLATE" >
    <DisallowIfNonnativeRLT disallow_aas="C" />
  </OperateOnResidueSubset>
</TASKOPERATIONS>
```

## MoveMapFactory
**MoveMapFactory** permite generar MoveMaps en el momento de aplicarse mediante selectores de residuos. Al definir este `FFLSTANDARD_MOVEMAP`, podemos guiar las partes no fijas del protocolo para que sigan comportándose como se espera.
```xml
<MOVE_MAP_FACTORIES>
  <MoveMapFactory name="FFLSTANDARD_MOVEMAP" bb="false" chi="false" nu="false" branches="false" jumps="false" >
    <Backbone enable="true" residue_selector="FLEXIBLE_OR_TEMPLATE" />
    <Chi      enable="true" residue_selector="COLDSPOT_OR_FLEXIBLE_OR_TEMPLATE" />
  </MoveMapFactory>
</MOVE_MAP_FACTORIES>
```

## Movers
Lo primero que necesitaremos es cargar o crear los fragmentos basados en la estructura:
```xml
<StructFragmentMover name="FragmentPicker" prefix="auto"
  vall_file="path/to/vall/database/vall.jul19.2011.gz" output_frag_files="1"
  small_frag_file="auto.200.3mers" large_frag_file="auto.200.9mers"
/>
```
Esto creará los fragmentos, a menos que los archivos de fragmentos ya existan, en cuyo caso simplemente se cargarán.
Fíjate en el atributo `prefix`. Este establece el identificador de estos fragmentos, ya que también podrían añadirse otros fragmentos para otros procesos. 

Antes de plegar nuestra proteína se recomienda generar `atom_pair_constraints` para guiarla. Esto se puede hacer muy fácilmente:
```xml
<AddConstraints name="foldingCST" >
  <AtomPairConstraintGenerator name="atompairCST1" sd="1.5" ca_only="true"
    use_harmonic="true" unweighted="true" min_seq_sep="6" max_distance="40" residue_selector="template"
  />
</AddConstraints>
```
 
Ahora podemos llamar al [[NubInitioMover]]:
```xml
<NubInitioMover name="FunFolDes" fragments_id="auto" template_motif_selector="insert" >
  <Nub pose_file="motif.pdb" residue_selector="motif" binder_selector="binder" />
</NubInitioMover>
```
También se podría cargar primero el archivo PDB en un Pose y luego pasarlo como `reference_pose`; algo así:
```xml
<SavePoseMover name="readMotif" reference_name="motif_pose" pdb_file="motif.pdb" />
<NubInitioMover name="FunFolDes" fragments_id="auto" template_motif_selector="insert" >
  <Nub reference_name="motif_pose" residue_selector="motif" binder_selector="binder" />
</NubInitioMover>
```
Hay algunas alternativas a la llamada más básica del [[NubInitioMover]].  
Por ejemplo, supongamos que se quiere que dos residuos a cada lado del **motivo** puedan moverse, con la esperanza de lograr un mejor ajuste al **molde**, y que además se considera que los residuos `2,4,6,8,13` (contando dentro del motivo) no están realmente en contacto con la proteína de unión y, por tanto, se pueden diseñar. Se pueden fijar parámetros específicos de cada segmento del **motivo**:
```xml
<NubInitioMover name="FunFolDes" fragments_id="auto" template_motif_selector="insert" >
  <Nub pose_file="motif.pdb" residue_selector="motif" binder_selector="binder" >
    <Segment order="1" n_term_flex="2" c_term_flex="2" editable="2,4,6,8,13" />
  </Nub>
</NubInitioMover>
```

Una vez hecho el plegamiento, podemos guiar el proceso de diseño con el MoveMap y las TaskOperations definidos antes:
```xml
<FastDesign name="DesignRelax" scorefxn="fullatom" clear_designable_residues="true"
  task_operations="FFLMOTIF_TASKOP,FFLFLEX_TASKOP,FFLTEMPLATE_TASKOP"
  repeats="3" delete_virtual_residues_after_FastRelax="true"
  movemap_factory="FFLSTANDARD_MOVEMAP" >
</FastDesign>
```

Y, por último, nos aseguramos de que la estructura esté bien cerrada (esto es innecesario si solo se inserta un segmento, pero en esos casos simplemente no hará nada).
```xml
<NubInitioLoopClosureMover name="loopC" fragments_id="auto"
  break_side_ramp="true" design="true" fullatom_scorefxn="fullatom" />
```

## Todo junto
En resumen, juntemos todo con algo de código de plantilla adicional; un script normal de **FunFolDes** sin ninguna evaluación/filtro especial ni condiciones de diseño añadidas tendrá este aspecto:

```xml
<ROSETTASCRIPTS>

  <SCOREFXNS>
    # A weight is added to small-range hbonds to favor helix, and beta pairing
    # and to take residue propensity into account. This way, we can favor
    # helix-forming residues in our designs.
    <ScoreFunction name="fullatom" weights="ref2015">
      <Reweight scoretype="atom_pair_constraint" weight="1.6" />
    </ScoreFunction>
  </SCOREFXNS>

  <RESIDUE_SELECTORS>
    <ResiduePDBInfoHasLabel name="MOTIF"     property="MOTIF" />
    <Not                    name="!MOTIF"    selector="MOTIF" />
    <ResiduePDBInfoHasLabel name="TEMPLATE"  property="TEMPLATE" />
    <Not                    name="!TEMPLATE" selector="TEMPLATE" />
    <ResiduePDBInfoHasLabel name="CONTEXT"   property="CONTEXT" />
    <Not                    name="!CONTEXT"  selector="CONTEXT" />
    <ResiduePDBInfoHasLabel name="FLEXIBLE"  property="FLEXIBLE" />
    <Not                    name="!FLEXIBLE" selector="FLEXIBLE" />
    <ResiduePDBInfoHasLabel name="HOTSPOT"   property="HOTSPOT" />
    <Not                    name="!HOTSPOT"  selector="HOTSPOT" />
    <ResiduePDBInfoHasLabel name="COLDSPOT"  property="COLDSPOT" />
    <Not                    name="!COLDSPOT" selector="COLDSPOT" />
  
    # can design
    <Or name="COLDSPOT_OR_TEMPLATE"              selectors="COLDSPOT,TEMPLATE" />
    # bb movement
    <Or name="FLEXIBLE_OR_TEMPLATE"              selectors="FLEXIBLE,TEMPLATE" />
    # chi movement
    <Or name="COLDSPOT_OR_FLEXIBLE_OR_TEMPLATE"  selectors="COLDSPOT,FLEXIBLE,TEMPLATE" />
    # prevent repacking and design
    <Or name="HOTSPOT_OR_CONTEXT"                selectors="HOTSPOT,CONTEXT" /> 
    <And name="HOTSPOT_OR_CONTEXT_AND_!FLEXIBLE" selectors="HOTSPOT_OR_CONTEXT,!FLEXIBLE" />
    # no design
    <And name="FLEXIBLE_AND_!COLDSPOT"           selectors="FLEXIBLE,!COLDSPOT" />

    <Chain name="template" chains="A" />
    <Index name="insert" resnums="50A-65A" />
    <Index name="motif" resnums="30B-45B" />
    <Chain name="binder" chains="A" />
    <Chain name="design" chains="B" />
  </RESIDUE_SELECTORS>
  <TASKOPERATIONS>
    <OperateOnResidueSubset name="FFLMOTIF_TASKOP" selector="HOTSPOT_OR_CONTEXT_AND_!FLEXIBLE" >
      <PreventRepackingRLT/>
    </OperateOnResidueSubset>
    <OperateOnResidueSubset name="FFLFLEX_TASKOP" selector="FLEXIBLE_AND_!COLDSPOT" >
      <RestrictToRepackingRLT/>
    </OperateOnResidueSubset>
    <OperateOnResidueSubset name="FFLTEMPLATE_TASKOP" selector="COLDSPOT_OR_TEMPLATE" >
      <DisallowIfNonnativeRLT disallow_aas="C" />
    </OperateOnResidueSubset>
  </TASKOPERATIONS>
  <MOVE_MAP_FACTORIES>
    <MoveMapFactory name="FFLSTANDARD_MOVEMAP" bb="false" chi="false" nu="false" branches="false" jumps="false" >
      <Backbone enable="true" residue_selector="FLEXIBLE_OR_TEMPLATE" />
      <Chi      enable="true" residue_selector="COLDSPOT_OR_FLEXIBLE_OR_TEMPLATE" />
    </MoveMapFactory>
  </MOVE_MAP_FACTORIES>
  <MOVERS>
    # ** SavePoseMover used like this does not need to be called during PROTOCOL to work.
    <SavePoseMover name="readMotif" reference_name="motif_pose" pdb_file="motif.pdb" />

    ## PREPROCESSING: MAKING FRAGMENTS
    <StructFragmentMover name="makeFrags" prefix="T12"
      small_frag_file="%%pdb%%.%%frags%%.200.3mers" large_frag_file="%%pdb%%.%%frags%%.200.9mers"
    />

    ## PREPROCESSING: CONSTRAINTS
    <StructFragmentMover name="FragmentPicker" prefix="auto"
      vall_file="path/t/vall/database/vall.jul19.2011.gz" output_frag_files="1"
      small_frag_file="auto.200.3mers" large_frag_file="auto.200.9mers"
    />

    # MAIN: NUBINITIO FOLDING
    <NubInitioMover name="FunFolDes" fragments_id="auto" template_motif_selector="insert" >
      <Nub reference_name="motif_pose" residue_selector="motif" binder_selector="binder" />
    </NubInitioMover>

    # POSTPROCESSING: CONSTRAINTS
    <AddConstraints name="designCST" >
      <AtomPairConstraintGenerator name="atompairCST2" sd="1" ca_only="true"
        use_harmonic="true" unweighted="true" min_seq_sep="6" max_distance="40" residue_selector="design"
      />
    </AddConstraints>
    <ClearConstraintsMover name="clearCST" />

    # POSTPROCESSING: DESING
    <FastDesign name="DesignRelax" scorefxn="fullatom" clear_designable_residues="true"
      task_operations="FFLMOTIF_TASKOP,FFLFLEX_TASKOP,FFLTEMPLATE_TASKOP"
      repeats="3" delete_virtual_residues_after_FastRelax="true"
      movemap_factory="FFLSTANDARD_MOVEMAP" >
    </FastDesign>

    # POSTPROCESSING: LOOP CLOSURE
    <NubInitioLoopClosureMover name="loopC" fragments_id="auto"
      break_side_ramp="true" design="true" fullatom_scorefxn="fullatom" />
  </MOVERS>
  <PROTOCOLS>
    # PREPROCESSING
    <Add mover="makeFrags"   />
    <Add mover="foldingCST"  />
    # MAIN
    <Add mover="FunFolDes"  />
    <Add mover="clearCST"   />
    # POSTPROCESSING
    <Add mover="designCST"   />
    <Add mover="DesignRelax" />
    <Add mover="loopC"       />
  </PROTOCOLS>
</ROSETTASCRIPTS>
```

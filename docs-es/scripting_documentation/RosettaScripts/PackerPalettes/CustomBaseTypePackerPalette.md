#CustomBaseTypePackerPalette

##Historial de la página

La documentación de `CustomBaseTypePackerPalette` fue creada por Vikram K. Mulligan (vmulligan@flatironinstitute.org) el 20 de febrero de 2019.

###Descripción

Una `PackerPalette` que permite diseñar con los 20 aminoácidos canónicos más una lista de otros tipos base especificada por el usuario.

##Detalles de RosettaScripts
[[include:packer_palette_CustomBaseTypePackerPalette_type]]

##Ejemplo

El siguiente ejemplo crea una paleta que permite tanto L- como D-aminoácidos (y GLY) y luego usa el [[ResidueSelector Phi|PhiSelector]] para restringir el diseño a L-aminoácidos en las posiciones de la región de phi negativo del espacio de Ramachandran, y a D-aminoácidos en las posiciones de la región de phi positivo del espacio de Ramachandran:

```xml
<ROSETTASCRIPTS>
    <SCOREFXNS>
        <ScoreFunction name="r15" weights="ref2015.wts"/>
    </SCOREFXNS>
    <PACKER_PALETTES>
        <CustomBaseTypePackerPalette name="palette" additional_residue_types="DALA,DCYS,DASP,DGLU,DPHE,DHIS,DILE,DLYS,DLEU,DMET,DASN,DPRO,DGLN,DARG,DSER,DTHR,DVAL,DTRP,DTYR" />
    </PACKER_PALETTES>
    <RESIDUE_SELECTORS>
        <Phi name="posPhi" select_positive_phi="true" ignore_unconnected_upper="false" />
        <Not name="negPhi" selector="select_positive_phi" />
    </RESIDUE_SELECTORS>
    <TASKOPERATIONS>
          <ReadResfile name="l_res" filename="inputs/l_res.txt" selector="negPhi"/>
          <ReadResfile name="d_res" filename="inputs/d_res.txt" selector="posPhi"/>
    </TASKOPERATIONS>
    <MOVERS>
        <PackRotamersMover name="packer" scorefxn="r15" task_operations="l_res,d_res" packer_palette="palette" />
    </MOVERS>
    <PROTOCOLS>
        <Add mover="terminal_bond1"/>
        <Add mover="terminal_bond2"/>
        <Add mover="packer"/>
    </PROTOCOLS>
    <OUTPUT scorefxn="r15" />
</ROSETTASCRIPTS>
```

El resfile `l_res.txt` tendría este aspecto:

```
PIKAA ACDEFHIKLMNPQRSTVWY
start
```

Y el resfile `d_res.txt` tendría este aspecto:

```
PIKAA X[DALA]X[DCYS]X[DASP]X[DGLU]X[DPHE]X[DHIS]X[DILE]X[DLYS]X[DLEU]X[DMET]X[DASN]X[DPRO]X[DGLN]X[DARG]X[DSER]X[DTHR]X[DVAL]X[DTRP]X[DTYR]
```

##Véase también

* [[PackerPalettes|PackerPalette]]
* [[DefaultPackerPalette]]
* [[NoDesignPackerPalette]]

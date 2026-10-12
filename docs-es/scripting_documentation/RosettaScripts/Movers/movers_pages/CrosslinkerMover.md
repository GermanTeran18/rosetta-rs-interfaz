# CrosslinkerMover
Página creada por Vikram K. Mulligan (vmullig@uw.edu) el 27 de noviembre de 2016.<br/>
Última actualización: 24 de mayo de 2022.<br/>
*Volver a la página de [[Movers|Movers-RosettaScripts]].*

[[_TOC_]]

## Descripción
Este mover coloca entrecruzadores (cross-linkers) químicos, como 1,3,5-tris(bromometil)benceno (TBMB), 1,4-bis(bromometil)benceno (paraBBMB) o ácido trimésico (TMA). Puede configurar enlaces covalentes y restricciones, empaquetar y minimizar la energía del entrecruzador y de las cadenas laterales a las que está conectado, y relajar toda la estructura. Se ofrecen opciones para filtrar según la geometría de entrada y descartar las Poses que no presenten cadenas laterales en conformaciones compatibles con el entrecruzador.

Para Rosetta, los metales también son en la práctica entrecruzamientos que conectan varias cadenas laterales, por lo que desde el 16 de mayo de 2018 este mover también puede colocar metales. Al colocar metales, los residuos que coordinan el metal (por ahora L- o D-histidina, glutamato o aspartato) se parchean para añadir un átomo virtual que representa el metal en el átomo de la cadena lateral que coordina el metal; se añaden restricciones de par de átomos para unir los átomos virtuales entre sí y asegurar que todos se solapen (representando un único ion metálico), y se añaden restricciones de ángulo para cada trío de (átomo ligando 1)--(átomo virtual del metal)--(átomo ligando 2) para imponer geometría tetraédrica, octaédrica, piramidal cuadrada, plana cuadrada, piramidal trigonal o plana trigonal. En el futuro se añadirá compatibilidad con otras geometrías de coordinación de metales.

## Opciones necesarias
CrosslinkerMover requiere que Rosetta cargue un archivo params para el entrecruzador. Estos no se cargan por defecto. Por ejemplo, para unir tres residuos de cisteína con TBMB, se necesita la siguiente opción de línea de comandos:

```
-extra_res_fa crosslinker/1.3.5_trisbromomethylbenzene.params
```

Esta opción carga el entrecruzador TBMB.

Cuando se usa el mover con simetría, hay que cargar en su lugar la variante simétrica del entrecruzador TBMB (que es un tercio del entrecruzador -- <i>vide infra</i>):

```
-extra_res_fa crosslinker/1.3.5_trisbromomethylbenzene_symm.params
```

Al colocar metales no se necesita ninguna opción especial.

## Ejemplos

### Colocación de 1,3,5-tris(bromometil)benceno (TBMB)

Este ejemplo coloca 1,3,5-tris(bromometil)benceno (TBMB), uniendo los residuos de cisteína 7, 21 y 35 con el entrecruzador. También configura restricciones y reempaqueta y minimiza la energía del entrecruzador y de las cadenas laterales a las que está conectado. Sin embargo, por defecto no se realiza ninguna relajación global. En este caso, la Pose es asimétrica:

```xml
<ROSETTASCRIPTS>
        <SCOREFXNS>
                <ScoreFunction name="r15" weights="ref2015.wts" />
        </SCOREFXNS>
        <RESIDUE_SELECTORS>
                <Index name="select_cys" resnums="7,21,35" />
        </RESIDUE_SELECTORS>
        <MOVERS>
                <CrosslinkerMover name="place_tbmb" residue_selector="select_cys" linker_name="TBMB" scorefxn="r15" />
        </MOVERS>
        <PROTOCOLS>
                <Add mover="place_tbmb" />
        </PROTOCOLS>
</ROSETTASCRIPTS>
```

### Colocación de un enlace tioéter entre el extremo N-terminal y la cadena lateral de una cisteína, para formar un lariat

Este ejemplo une el extremo N-terminal de un péptido con la cadena lateral de una cisteína, creando un lariat de tioéter. Después usa el [[cierre cinemático generalizado|GeneralizedKIC]] para cerrar el anillo del macrociclo y [[FastRelax]] para relajarlo.

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
		<ScoreFunction name="r15" weights="ref2015.wts" />
		<ScoreFunction name="r15_cst" weights="ref2015_cst.wts" />
	</SCOREFXNS>
	<TASKOPERATIONS>
		<IncludeCurrent name="incl_curr" />
	</TASKOPERATIONS>
	<FILTERS>
	</FILTERS>
	<RESIDUE_SELECTORS>
		<Index name="select_thioether" resnums="1,8" />
	</RESIDUE_SELECTORS>
	<MOVERS>

		<PeptideStubMover name="make_pep" reset="true">
			<Append resname="GLY" />
			<Append resname="GLY" />
			<Append resname="GLY" />
			<Append resname="GLY" />
			<Append resname="GLY" />
			<Append resname="GLY" />
			<Append resname="GLY" />
			<Append resname="CYS" />
			<Append resname="GLY" />
			<Append resname="GLY" />
		</PeptideStubMover>

		<DeclareBond name="add_termini" atom1="C" atom2="N" res1="1" res2="2" add_termini="true" />

		<SetTorsion name="set_omegas">
			<Torsion angle="180" torsion_name="omega" residue="1" />
			<Torsion angle="180" torsion_name="omega" residue="2" />
			<Torsion angle="180" torsion_name="omega" residue="3" />
			<Torsion angle="180" torsion_name="omega" residue="4" />
			<Torsion angle="180" torsion_name="omega" residue="5" />
			<Torsion angle="180" torsion_name="omega" residue="6" />
			<Torsion angle="180" torsion_name="omega" residue="7" />
			<Torsion angle="180" torsion_name="omega" residue="8" />
			<Torsion angle="180" torsion_name="omega" residue="9" />
		</SetTorsion>

		<RandomizeBBByRamaPrePro name="random_rama" />

		<CrosslinkerMover name="cyclize" linker_name="thioether"
			residue_selector="select_thioether" scorefxn="r15"
			filter_by_constraints_energy="false"
			filter_by_sidechain_distance="false"
			pack_and_minimize_linker_and_sidechains="false"
		/>

		<GeneralizedKIC name="genkic" selector="lowest_energy_selector" closure_attempts="1000"
			stop_when_n_solutions_found="1" selector_scorefunction="r15" correct_polymer_dependent_atoms="true" >
			<AddResidue res_index="5" />
			<AddResidue res_index="6" />
			<AddResidue res_index="7" />
			<AddResidue res_index="8" />
			<AddResidue res_index="1" />
			<AddResidue res_index="2" />
			<AddResidue res_index="3" />
			<AddTailResidue res_index="9" />
			<AddTailResidue res_index="10" />
			<SetPivots res1="5" atom1="CA" res2="8" atom2="CB" res3="3" atom3="CA" />
			<CloseBond res1="8" atom1="SG" res2="1" atom2="CP2" bondlength="1.827" angle1="102.028" angle2="112.284" />
			<AddPerturber effect="randomize_backbone_by_rama_prepro" >
				<AddResidue index="5" />
				<AddResidue index="6" />
				<AddResidue index="7" />
				<AddResidue index="2" />
				<AddResidue index="3" />
			</AddPerturber>
			<AddPerturber effect="randomize_dihedral">
				<AddAtoms res1="8" atom1="N" res2="8" atom2="CA" />
				<AddAtoms res1="8" atom1="CA" res2="8" atom2="CB" />
				<AddAtoms res1="8" atom1="CB" res2="8" atom2="SG" />
				<AddAtoms res1="8" atom1="SG" res2="1" atom2="CP2" />
				<AddAtoms res1="1" atom1="CP2" res2="1" atom2="CO" />
				<AddAtoms res1="1" atom1="N" res2="1" atom2="CA" />
				<AddAtoms res1="1" atom1="CA" res2="1" atom2="C" />
			</AddPerturber>
			<AddFilter type="loop_bump_check" />
		</GeneralizedKIC>

		<FastRelax name="frlx" scorefxn="r15_cst" repeats="1" task_operations="incl_curr" />

	</MOVERS>
	<APPLY_TO_POSE>
	</APPLY_TO_POSE>
	<PROTOCOLS>
		<Add mover="make_pep" />
		<Add mover="add_termini" />
		<Add mover="set_omegas" />
		<Add mover="random_rama" />
		<Add mover="cyclize" />
		<Add mover="genkic" />
		<Add mover="frlx" />
	</PROTOCOLS>

</ROSETTASCRIPTS>
```

### Colocación de un metal con geometría de coordinación plana trigonal o piramidal trigonal

En este ejemplo, suponemos que las posiciones 12, 16 y 23 de la estructura de entrada son tipos de residuo que pueden coordinar un metal (por ahora, L- o D-histidina, aspartato o glutamato). La opción `metal_type` determina las longitudes de enlace entre los átomos ligandos y el metal, y por defecto es "Zn" (zinc). En el caso de la coordinación plana trigonal, los ángulos de enlace se restringen a 120 grados y una restricción de torsión impropia lleva además el metal al plano de los tres átomos ligandos. En el caso de la coordinación piramidal trigonal, los ángulos de enlace se restringen a 109.47 grados y no se aplica ninguna restricción de torsión impropia.

```xml
<ROSETTASCRIPTS>
        <SCOREFXNS>
                <ScoreFunction name="r15" weights="ref2015.wts" />
        </SCOREFXNS>
        <RESIDUE_SELECTORS>
                <Index name="select_metal_coordinating" resnums="12,16,23" />
        </RESIDUE_SELECTORS>
        <MOVERS>
                <!-- Note: in the definition below, "trigonal_planar_metal" may be replaced with "trigonal_pyramidal_metal". -->
                <CrosslinkerMover name="metal_xlink" residue_selector="select_metal_coordinating" linker_name="trigonal_planar_metal" metal_type="Zn" scorefxn="r15" />
        </MOVERS>
        <PROTOCOLS>
                <Add mover="metal_xlink" />
        </PROTOCOLS>
</ROSETTASCRIPTS>
```

### Colocación de un metal con geometría de coordinación plana cuadrada o piramidal cuadrada

En este ejemplo, suponemos que las posiciones 3, 12, 16 y 23 de la estructura de entrada son tipos de residuo que pueden coordinar un metal (por ahora, L- o D-histidina, aspartato o glutamato). La opción `metal_type` determina las longitudes de enlace entre los átomos ligandos y el metal, y por defecto es "Ni2" (níquel en estado de oxidación 2+) en el caso de las geometrías planas cuadradas o piramidales cuadradas. En el caso de la coordinación plana cuadrada, los ángulos de enlace se restringen a 90 o 180 grados y una restricción de torsión impropia lleva además el metal al plano de los cuatro átomos ligandos. En el caso de la coordinación piramidal cuadrada, los ángulos de enlace se restringen a 90 o 180 grados y se aplica una restricción de torsión impropia ambigua que mantiene el metal en el plano de cualesquiera cuatro de los átomos ligandos.

```xml
<ROSETTASCRIPTS>
        <SCOREFXNS>
                <ScoreFunction name="r15" weights="ref2015.wts" />
        </SCOREFXNS>
        <RESIDUE_SELECTORS>
		<!--
			A fifth position must be selected by the residue selector below in the case of square pyramidal
			metal coordination.
		-->
                <Index name="select_metal_coordinating" resnums="3,12,16,23" />
        </RESIDUE_SELECTORS>
        <MOVERS>
                <!--
			Note: in the definition below, "square_planar_metal" may be replaced with "square_pyramidal_metal".  In this case, a fifth residue
			must be selected by the select_metal_coordinating residue selector.
		 -->
                <CrosslinkerMover name="metal_xlink" residue_selector="select_metal_coordinating" linker_name="square_planar_metal" metal_type="Ni2" scorefxn="r15" />
        </MOVERS>
        <PROTOCOLS>
                <Add mover="metal_xlink" />
        </PROTOCOLS>
</ROSETTASCRIPTS>
```

### Colocación de un metal con coordinación tetraédrica

En este ejemplo, suponemos que las posiciones 7, 12, 16 y 23 de la estructura de entrada son tipos de residuo que pueden coordinar un metal (por ahora, L- o D-histidina, aspartato o glutamato). La opción `metal_type` determina las longitudes de enlace entre los átomos ligandos y el metal, y por defecto es "Zn" (zinc). `CrosslinkerMover` añade restricciones de ángulo de enlace de 109.47 grados.

```xml
<ROSETTASCRIPTS>
        <SCOREFXNS>
                <ScoreFunction name="r15" weights="ref2015.wts" />
        </SCOREFXNS>
        <RESIDUE_SELECTORS>
                <Index name="select_metal_coordinating" resnums="7,12,16,23" />
        </RESIDUE_SELECTORS>
        <MOVERS>
                <CrosslinkerMover name="metal_xlink" residue_selector="select_metal_coordinating" linker_name="tetrahedral_metal" metal_type="Zn" scorefxn="r15" />
        </MOVERS>
        <PROTOCOLS>
                <Add mover="metal_xlink" />
        </PROTOCOLS>
</ROSETTASCRIPTS>
```

### Colocación de un metal con coordinación octaédrica

En este ejemplo, suponemos que las posiciones 7, 12, 16, 23, 26 y 30 de la estructura de entrada son tipos de residuo que pueden coordinar un metal (por ahora, L- o D-histidina, aspartato o glutamato). La opción `metal_type` determina las longitudes de enlace entre los átomos ligandos y el metal. Por ahora, para la coordinación octaédrica, el único tipo compatible es Fe2 (para hierro(II)), aunque esto se ampliará en el futuro. `CrosslinkerMover` añade restricciones de ángulo de enlace de 90 o 180 grados.

```xml
<ROSETTASCRIPTS>
        <SCOREFXNS>
                <ScoreFunction name="r15" weights="ref2015.wts" />
        </SCOREFXNS>
        <RESIDUE_SELECTORS>
                <Index name="select_metal_coordinating" resnums="7,12,16,23,26,30" />
        </RESIDUE_SELECTORS>
        <MOVERS>
                <CrosslinkerMover name="metal_xlink" residue_selector="select_metal_coordinating" linker_name="octahedral_metal" metal_type="Fe2" scorefxn="r15" />
        </MOVERS>
        <PROTOCOLS>
                <Add mover="metal_xlink" />
        </PROTOCOLS>
</ROSETTASCRIPTS>
```

## Uso con simetría

Este mover puede usarse en el caso de entrecruzadores con una simetría que coincida con la simetría de la Pose. En ese caso, el residuo entrecruzador que se añade a la Pose es en realidad un fragmento del entrecruzador completo (por ejemplo, un tercio de la geometría en el caso de simetría C3). Se añaden N de estos residuos, uno a cada repetición de simetría, y se configuran enlaces covalentes y restricciones adecuadas entre los fragmentos. Este uso requiere que el usuario pase la opción `symmetry=<string>`, donde la cadena es un carácter en mayúscula que representa el tipo de simetría (C=cíclica, S=cíclica con espejo, D=diédrica) seguido de un entero que indica el número de repeticiones (_p. ej._ "C3" para simetría cíclica de orden tres). Este es un ejemplo en el que CrosslinkerMover se usa con una Pose simétrica con simetría C3 (definida en un archivo de definición de simetría `inputs/c3.symm`). En este caso, el ResidueSelector debe seleccionar residuos de cisteína _equivalentes_ en las tres copias simétricas.

```xml
<ROSETTASCRIPTS>
        <SCOREFXNS>
                <ScoreFunction name="r15" weights="ref2015.wts" symmetric="true" />
        </SCOREFXNS>
        <RESIDUE_SELECTORS>
                <Index name="select_cys" resnums="7,21,35" />
        </RESIDUE_SELECTORS>
        <MOVERS>
                <SetupForSymmetry name="setup_symm" definition="inputs/c3.symm" />
                <CrosslinkerMover name="threefold" residue_selector="select_cys" linker_name="TBMB" scorefxn="r15" symmetry="C3" />
        </MOVERS>
        <PROTOCOLS>
                <Add mover="setup_symm" />
                <Add mover="threefold" />
        </PROTOCOLS>
</ROSETTASCRIPTS>
```

Al colocar metales con coordinación tetraédrica, las simetrías compatibles son C2, D2 y S4. Al colocar metales con coordinación octaédrica, las simetrías compatibles son C3, C2, D3, S2 y S6.

## Todas las opciones

```xml
<CrosslinkerMover name="(&string)" scorefxn="(&string)" residue_selector="(&string)" linker_name="(&string)"
    add_linker="(true &bool)" constrain_linker="(true &bool)"
    pack_and_minimize_linker_and_sidechains="(true &bool)" sidechain_fastrelax_rounds="(3 &int)"
    do_final_fastrelax="(false &bool)" final_fastrelax_rounds="(3 &int)" symmetry="(A1 &string)"
    filter_by_sidechain_distance="(true &bool)" sidechain_distance_filter_multiplier="(1.0 &real)"
    filter_by_constraints_energy="(true &bool)" constraints_energy_filter_multiplier="(1.0 &real)"
    filter_by_final_energy="(false &bool)" final_energy_cutoff="(0.0 &real)" metal_type="(Zn &string)"
/>
```

| Opción | Obligatoria | Tipo | Descripción |
|---|---|---|---|
| name | SÍ | string | Un nombre único para esta instancia de CrosslinkerMover. |
| linker\_name | SÍ | string | El nombre del tipo de entrecruzador que se usará. Por ahora, las opciones permitidas son "tetrahedral\_metal", "octahedral\_metal", "trigonal\_planar\_metal", "square\_planar\_metal", "trigonal\_pyramidal\_metal", "square\_pyramidal\_metal", "TBMB" (para 1,3,5-tris(bromometil)benceno), "thioether" y "TMA" (para ácido trimésico). |
| residue\_selector | SÍ | string | Un selector de residuos definido previamente que se haya configurado para seleccionar el número correcto de residuos para el tipo de entrecruzador. |
| scorefxn | SÍ | string | Una función de puntuación que se usará para el empaquetado, la minimización de energía y el filtrado. Si las restricciones están desactivadas en esta función de puntuación, se activarán automáticamente en el momento de aplicar el mover. |
| add\_linker | No | bool | ¿Debe añadirse la geometría del entrecruzador a la Pose? Por defecto es true. |
| constrain\_linker | No | bool | ¿Deben añadirse a la Pose las restricciones del entrecruzador? Por defecto es true. |
| pack\_and\_minimize\_linker\_and\_sidechains | No | bool | ¿Deben reempaquetarse el entrecruzador y las cadenas laterales conectadas, y deben minimizarse en energía el salto hacia el entrecruzador y los grados de libertad de torsión del entrecruzador y de las cadenas laterales conectadas? Por defecto es true. |
| sidechain\_fastrelax\_rounds | No | int | El número de rondas de FastRelax que se aplican al empaquetar y minimizar las cadenas laterales y el entrecruzador. Por defecto es 3. |
| do\_final\_fastrelax | No | bool | ¿Debe someterse toda la Pose a un FastRelax? Por defecto es false. |
| final\_fastrelax\_rounds | No | int | El número de rondas de FastRelax que se aplican al relajar toda la Pose. Por defecto es 3. |
| symmetry | No | string | ¿Es esta una Pose simétrica que se conecta mediante un entrecruzador con simetría coincidente? Por defecto no se usa si no se especifica. Si se especifica, la cadena debe ser un único carácter en mayúscula que represente el tipo de simetría ("C" para cíclica, "S" para cíclica con espejo, "D" para diédrica o "A" para aquiral) seguido de un entero que represente el número de repeticiones de simetría (_p. ej._ "S4" para simetría cíclica de orden cuatro con reflexión respecto del plano perpendicular al eje de simetría de una repetición a la siguiente). |
| filter\_by\_sidechain\_distance | No | bool | Antes de añadir la geometría del entrecruzador, ¿debe este mover abortar con estado de fallo si las cadenas laterales seleccionadas están demasiado lejos entre sí para conectarse con el entrecruzador? Por defecto es true. |
| sidechain\_distance\_filter\_multiplier | No | real | Es un multiplicador para el filtro de umbral de distancia entre cadenas laterales. Los valores más altos hacen el filtro menos estricto. Por defecto es 1.0. |
| filter\_by\_constraints\_energy | No | bool | Después de añadir la geometría del entrecruzador, añadir restricciones y reempaquetar y minimizar el entrecruzador y las cadenas laterales conectadas, ¿debe este mover abortar con estado de fallo si la energía de las restricciones es demasiado alta (es decir, si la geometría del entrecruzador minimizado en energía es mala)? Por defecto es true. |
| constraints\_energy\_filter\_multiplier | No | real | Es un multiplicador para el filtro de umbral de energía de las restricciones. Los valores más altos hacen el filtro menos estricto. Por defecto es 1.0. |
| filter\_by\_final\_energy | No | bool | Al final de este protocolo, ¿debe este mover terminar con estado de error si la energía final está por encima de un umbral definido por el usuario? Por defecto es false. |
| final\_energy\_cutoff | No | real | Si se termina con estado de error cuando la energía final es demasiado alta, este es el umbral de energía. Por defecto es 0.0. |
| metal\_type | No | string | El tipo de metal. Esto determina la distancia entre el átomo del metal que actúa de ligando y el átomo virtual que representa el metal. Por defecto es "Zn" (zinc). Solo se usa al colocar entrecruzamientos de metales. |

## Tipos de residuo que se pueden unir

Ten en cuenta que cada tipo de entrecruzador puede unir distintos tipos de cadenas laterales:

| Abreviatura | Entrecruzador | Número de residuos unidos | Tipos que se pueden unir | Simetrías compatibles |
| ------------ | ----------- | ------------------------- | ------------------------ | --------------------- |
| octahedral\_metal | átomos virtuales que representan un metal (nota: no se coloca ningún residuo nuevo) | 6 | L-histidina (HIS, HIS_D), D-histidina (DHI), L-aspartato (ASP), D-aspartato (DAS), L-glutamato (GLU), D-glutamato (DGU) | S6, D3, C3, S2, C2, asimétrica |
| tetrahedral\_metal | átomos virtuales que representan un metal (nota: no se coloca ningún residuo nuevo) | 4 | L-histidina (HIS, HIS_D), D-histidina (DHI), L-aspartato (ASP), D-aspartato (DAS), L-glutamato (GLU), D-glutamato (DGU) | S4, D2, C2, asimétrica |
| square\_pyramidal\_metal | átomos virtuales que representan un metal (nota: no se coloca ningún residuo nuevo ) | 4 | L-histidina (HIS, HIS_D), D-histidina (DHI), L-aspartato (ASP), D-aspartato (DAS), L-glutamato (GLU), D-glutamato (DGU) | asimétrica |
| square\_planar\_metal | átomos virtuales que representan un metal (nota: no se coloca ningún residuo nuevo ) | 4 | L-histidina (HIS, HIS_D), D-histidina (DHI), L-aspartato (ASP), D-aspartato (DAS), L-glutamato (GLU), D-glutamato (DGU) | S4, C4, D2, S2, C2, asimétrica |
| trigonal\_pyramidal\_metal | átomos virtuales que representan un metal (nota: no se coloca ningún residuo nuevo ) | 3 | L-histidina (HIS, HIS_D), D-histidina (DHI), L-aspartato (ASP), D-aspartato (DAS), L-glutamato (GLU), D-glutamato (DGU) | C3, asimétrica |
| trigonal\_planar\_metal | átomos virtuales que representan un metal (nota: no se coloca ningún residuo nuevo ) | 3 | L-histidina (HIS, HIS_D), D-histidina (DHI), L-aspartato (ASP), D-aspartato (DAS), L-glutamato (GLU), D-glutamato (DGU) | C3, asimétrica |
| TBMB | 1,3,5-tris(bromometil)benceno | 3 | L-cisteína (CYS), D-cisteína (DCY) | C3, asimétrica |
| 1_4_BBMB | 1,4-bis(bromometil)benceno | 2 | L-cisteína (CYS), D-cisteína (DCY) | S2, C2, asimétrica |
| thioether  | lariat de tioéter N-terminal (nota: no se coloca ningún residuo nuevo) | 2 | Cualquiera (extremo N-terminal) con la cadena lateral de L-cisteína (CYS) o D-cisteína (DCY) | asimétrica |
| TMA  | ácido trimésico                  | 3 | L-lisina (LYS), D-lisina (DLY), L-ornitina (ORN), D-ornitina (DOR), ácido L-2,4-diaminobutírico (DAB), ácido D-2,4-diaminobutírico (DDA), ácido L-2,3-diaminopropanoico (DPP), ácido D-2,3-diaminopropanoico (DDP) | C3, asimétrica |

## Documentación autogenerada

[[include:mover_CrosslinkerMover_type]]

##Véase también
* [[Información sobre restricciones|constraint-file]]
* [[ResidueSelectors]]
* [[Symmetry]]: uso de la simetría en Rosetta
* [[SymmetryAndRosettaScripts]]
* [[SetupForSymmetryMover]]
* [[SetupNCSMover]]
* [[DetectSymmetryMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]

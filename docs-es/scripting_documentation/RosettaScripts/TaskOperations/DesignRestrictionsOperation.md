# DesignRestrictions
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

###Propósito:

La TaskOperation DesignRestrictions existe para permitir un control conciso y detallado de la selección. Antes de DesignRestrictions, la TaskOperation LayerDesign se usaba a menudo para decir «quiero los aminoácidos ABC en los residuos de superficie, los aminoácidos DEF en los residuos enterrados y los aminoácidos GHI en los residuos de frontera», pero cuando querías combinar LayerDesign con otra tarea, como el diseño de interfaz de un solo lado, las cosas se volvían de pronto muy difíciles. ¿Qué pasa si la posición enterrada X del lado fijo de la interfaz era nativamente un aminoácido «B», pero LayerDesign solo había permitido «DEF» en las posiciones enterradas? Si combinas la restricción de LayerDesign a «DEF» con la restricción de RestrictToRepacking a «nada excepto B», terminas con un conjunto vacío de aminoácidos permitidos. En lugar de reempaquetar el residuo X, este se mantendrá fijo. ¡Eso no es lo que quieres!

La TaskOperation DesignRestrictions te permite decir «restringe a los aminoácidos ABC en los residuos de superficie de la cadena A» de una manera relativamente concisa.

###Descripción:

Una forma concisa de combinar selectores de residuos y TaskOperations a nivel de residuo. Los subtags Action te permiten especificar varias modificaciones de una tarea del packer a la vez. Con el atributo 'selector_logic' puedes combinar tantos ResidueSelectors definidos previamente como quieras usando AND, OR, ! (not) y paréntesis, o bien puedes elegir un ResidueSelector concreto, definido previamente, con el atributo 'residue_selector'. Debes proporcionar uno de los dos. Después puedes especificar el conjunto de aminoácidos canónicos a los que quieres restringir el conjunto indicado de residuos mediante el atributo 'aas' y/o listando un conjunto de [[ResidueLevelTaskOperations|RosettaScripts#rosettascript-sections_residue_level_task_operations]] declaradas previamente.

```xml
<DesignRestrictions name="(&string;)" >
    <Action residue_selector="(&string;)" selector_logic="(&string;)"
            aas="(&string;)" residue_level_operations="(&string;)" />
</DesignRestrictions>
```

Subtag **Action**:   

-   **residue_selector**: El nombre del ResidueSelector ya definido que usará este objeto.
-   **selector_logic**: Combina lógicamente ResidueSelectors ya declarados con los operadores booleanos AND, OR y ! (not). Como es habitual, ! (not) tiene la mayor precedencia, luego AND y luego OR. Se pueden usar paréntesis para agrupar operaciones.
-   **aas**: Una lista de los L-aminoácidos canónicos que se permitirán en los residuos seleccionados. Se aceptan letras mayúsculas o minúsculas. Ten en cuenta que si un aminoácido está permitido para un residuo seleccionado por una acción, pero no está permitido para ese mismo residuo seleccionado por una segunda acción, el aminoácido no se permitirá.
-   **residue_level_operations**: Una lista, separada por comas, de operaciones de tarea a nivel de residuo que se obtendrán del DataMap.


##Ejemplo

####Ejemplo 1

Este es un ejemplo que realiza LayerDesign en la superficie de la proteína, reempaqueta la frontera y no permite el empaquetado del núcleo. 

```xml
<RESIDUE_SELECTORS>
	<Layer name="surface" select_core="false" select_boundary="false" select_surface="true" use_sidechain_neighbors="true"/>
	<Layer name="boundary" select_core="false" select_boundary="true" select_surface="false" use_sidechain_neighbors="true"/>
	<Layer name="core" select_core="true" select_boundary="false" select_surface="false" use_sidechain_neighbors="true"/>
	<SecondaryStructure name="sheet" overlap="0" minH="3" minE="2" include_terminal_loops="false" use_dssp="true" ss="E"/>
	<SecondaryStructure name="entire_loop" overlap="0" minH="3" minE="2" include_terminal_loops="true" use_dssp="true" ss="L"/>
	<SecondaryStructure name="entire_helix" overlap="0" minH="3" minE="2" include_terminal_loops="false" use_dssp="true" ss="H"/>
	<And name="helix_cap" selectors="entire_loop">
		<PrimarySequenceNeighborhood lower="1" upper="0" selector="entire_helix"/>
	</And>
	<And name="helix_start" selectors="entire_helix">
		<PrimarySequenceNeighborhood lower="0" upper="1" selector="helix_cap"/>
	</And>
	<And name="helix" selectors="entire_helix">
		<Not selector="helix_start"/>
	</And>
	<And name="loop" selectors="entire_loop">
		<Not selector="helix_cap"/>
	</And>
</RESIDUE_SELECTORS>

<RESIDUE_LEVEL_TASK_OPERATIONS>
        <PreventRepackingRLT name="PreventRepacking" />
        <RestrictToRepackingRLT name="RestrictToRepacking" />
</RESIDUE_LEVEL_TASK_OPERATIONS>

<TASKOPERATIONS>
	<DesignRestrictions name="design_task">
		<Action selector_logic="surface AND helix_start"	aas="EHKPQR"/>
		<Action selector_logic="surface AND helix"		aas="EHKQR"/>
		<Action selector_logic="surface AND sheet"		aas="DEHKNQRST"/>
		<Action selector_logic="surface AND loop"		aas="DEGHKNPQRST"/>
		<Action residue_selector="boundary"			residue_level_operations="RestrictToRepacking"/>
		<Action residue_selector="core"				residue_level_operations="PreventRepacking"/>
		<Action residue_selector="helix_cap"			aas="DNST"/>
	</DesignRestrictions>
</TASKOPERATIONS>

```

####Ejemplo 2

Supón que quieres mantener fijos los 10 primeros aminoácidos y usar operaciones normales, al estilo de layer design, en el resto del monómero que estás diseñando.

Este es un ejemplo de lo que NO se debe hacer:

```xml
 <ROSETTASCRIPTS>
    <SCOREFXNS>
        <ScoreFunction name="sfxn" weights="beta_nov16" />
    </SCOREFXNS>
    <RESIDUE_SELECTORS>
        <Layer name="surface" select_core="false" select_boundary="false" select_surface="true" use_sidechain_neighbors="true"/>
        <Layer name="boundary" select_core="false" select_boundary="true" select_surface="false" use_sidechain_neighbors="true"/>
        <Layer name="core" select_core="true" select_boundary="false" select_surface="false" use_sidechain_neighbors="true"/>

        <Index name="first_10" resnums="1-10" />
    </RESIDUE_SELECTORS>
    <TASKOPERATIONS>

        CAUTION: THIS IS A "WHAT **NOT** TO DO" EXAMPLE.
        CAUTION: DO NOT COPY AND PASTE IT INTO YOUR XML FILE      
        <DesignRestrictions name="do_not_use_this_desrest">
            <Action selector_logic="surface"  aas="R"/>
            <Action selector_logic="boundary" aas="N"/>
            <Action selector_logic="core"     aas="V"/>
        </DesignRestrictions>

        <OperateOnResidueSubset name="restrict_first10_to_repacking" selector="first_10">
            <RestrictToRepackingRLT/>
        </OperateOnResidueSubset>
    </TASKOPERATIONS>
    <MOVERS>
        <FastDesign name="FastDesign" scorefxn="sfxn" task_operations="do_not_use_this_desrest,restrict_first10_to_repacking"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover="FastDesign" />
    </PROTOCOLS>
    <OUTPUT />
</ROSETTASCRIPTS>
```

El script anterior no producirá el comportamiento deseado. Los diez primeros residuos no podrán reempaquetarse, a menos que su aminoácido nativo esté por casualidad en el conjunto de aminoácidos permitidos. Imaginemos que los 10 primeros residuos son todos lisinas (K). Entonces, estén expuestos, intermedios o enterrados, tendrán dos operaciones restrictivas aplicadas: una que elimina todos los aminoácidos excepto K y una segunda que elimina todos los aminoácidos excepto R, N o V, según su nivel de enterramiento. La intersección de {K} y {R}, por ejemplo, es el conjunto vacío. Así que no habrá ningún aminoácido permitido en esa posición, lo que equivale a desactivar todo el empaquetado en ella. Estos 10 primeros residuos se mantendrán completamente fijos mientras el empaquetado ocurre a su alrededor.

Por tanto, la forma correcta de manejarlo es incluir el selector de residuos «first_10» en las acciones de la TaskOperation DesignRestrictions:

```xml
        <Index name="first_10" resnums="1-10" />
    </RESIDUE_SELECTORS>
    <TASKOPERATIONS>        
        <DesignRestrictions name="coreV_boundN_surfaceR">
            <Action selector_logic="surface  AND ! first_10" aas="R"/>
            <Action selector_logic="boundary AND ! first_10" aas="N"/>
            <Action selector_logic="core     AND ! first_10" aas="V"/>
        </DesignRestrictions>
```


##Véase también

* [[LayerDesign|LayerDesignOperation]]: Especifica la identidad del diseño según la estructura secundaria y el grado de enterramiento.

<!-- --- title: ResidueSelectors -->

*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

ResidueSelectors
----------------

Los ResidueSelectors definen un subconjunto de residuos de un Pose. Su método apply() toma un Pose y devuelve un ResidueSubset (un utility::vector1\< bool \>). Este vector1 tendrá tantos elementos como residuos haya en el Pose de entrada, y su i-ésima entrada será "true" si se ha seleccionado el residuo i. 

Una vez que tienes un ResidueSubset, puedes usarlo de varias maneras.  Por ejemplo, puedes usar la task operation [[OperateOnResidueSubset|OperateOnResidueSubsetOperation]] para combinar un ResidueSelector con una [[TaskOperation a nivel de residuo|Residue Level TaskOperations]] y así modificar los ResidueLevelTasks que tienen un valor "true" en el ResidueSubset. Los ResidueSelectors deben declararse en su propio bloque y con nombre, o declararse como subetiquetas de otros ResidueSelectors o de TaskOperations que acepten ResidueSelectors (como la task operation OperateOnResidueSubset).  

Además, la mayoría de las [[SimpleMetrics]] pueden usar ResidueSelectors, y cada una indica su compatibilidad con ResidueSelectors.  Todas las [[PerResidueRealMetrics | SimpleMetrics#perresiduerealmetrics]] y las [[PerResidueStringMetrics | SimpleMetrics#perresiduestringmetrics]] pueden aceptar residue selectors.

Ten en cuenta que otros módulos de Rosetta (p. ej., la TaskOperation [[ReadResfile|ReadResfileOperation]], que no es una TaskOperation a nivel de residuo pero aun así puede aceptar un ResidueSelector como entrada) también pueden usar ResidueSelectors.  En última instancia, se espera modificar muchos componentes de Rosetta para que permitan este método estandarizado de selección de residuos.

El propósito de separar la lógica de selección de residuos de las modificaciones que las TaskOperations realizan sobre un PackerTask es hacer accesible la compleja lógica de selección de residuos que a menudo reside en las TaskOperations. Si tienes una TaskOperation complicada, considera dividirla en un ResidueSelector y operaciones sobre los residuos que este selecciona.

Los ResidueSelectors pueden declararse en su propio bloque, fuera del bloque de TaskOperations. Por ejemplo:
```xml
    <RESIDUE_SELECTORS>
       <Chain name="chA" chains="A"/>
       <Index name="res1to10" resnums="1-10"/>
    </RESIDUE_SELECTORS>
```
Algunos ResidueSelectors pueden anidar otros ResidueSelectors en su definición; p. ej.:
```xml
    <RESIDUE_SELECTORS>
        <Neighborhood name="chAB_neighbors">
            <Chain chains="A,B">
        </Neighborhood>
    </RESIDUE_SELECTORS>
```
En ese caso, la estructura del ResidueSelector Neighborhood se expresará como
```xml
    <Neighborhood name=(%string) >
        <(Selector)>
    </Neighborhood>
```
La subetiqueta <(Selector)> indica que dentro de ella se puede anidar cualquier ResidueSelector.

#### Aplicar un ResidueSelector

Un mover que pueda manejar ResidueSelectors aceptará la siguiente opción:

    residue_selector=""


[[_TOC_]]

### ResidueSelectors lógicos

Ten en cuenta que ahora la lógica está integrada en todos los componentes de rosetta scripts que aceptan un residue selector. 
La sintaxis es la misma que la de DesignRestrictions.  Por ejemplo, `selector="SEL1 and SEL2 and not(SEL3)"` es algo que se puede pasar y que se analizará correctamente.  También puedes usar el selector Logic para combinar esta lógica en lugar de usar los selectores lógicos independientes que se describen más abajo. 

#### LogicSelector

    <Logic name="(&string)" selector="SEL1 and SEL2 and (not SEL3) or SEL4"/>

- Consulta la información de [[LogicSelector| rs_Logic_type]] para más detalles:

#### NotResidueSelector

    <Not name="(&string)" selector="(&string)">

o

    <Not name="(&string)">
        <(Selector) .../>
    </Not>

-   NotResidueSelector requiere exactamente un selector.
-   NotResidueSelector invierte el estado booleano que devuelve la función apply del selector que contiene.
-   Si se indica la opción "selector", se recuperará del DataMap un ResidueSelector declarado previamente (del bloque RESIDUE\_SELECTORS del archivo XML)
-   Si no se indica la opción "selector", debe declararse una subetiqueta que contenga un ResidueSelector anónimo/sin nombre. Este selector no acabará en el DataMap.  Por ejemplo, es posible anidar un selector Chain bajo un selector Not para decir "dame todo excepto la cadena A:"
    ```xml
    <Not name="all_but_chA">
       <Chain chains="A"/>
    </Not>
    ```
cualquier ResidueSelector puede definirse como subetiqueta del selector Not.  Sin embargo, no puedes pasar el subselector por su nombre, salvo mediante la opción "selector".

#### AndResidueSelector

    <And name="(&string)" selectors="(&string)">
       <(Selector1)/>
       <(Selector2)/>
        ...
    </And>

-   AndResidueSelector puede tomar tantos selectores como se quiera.
-   AndResidueSelector realiza un *AND* lógico de los vectores ResidueSubset devueltos por las funciones apply de cada uno de los ResidueSelectors que contiene.  <b>En la práctica, esto significa que devuelve la <i>intersección</i> de los conjuntos seleccionados: los residuos que están en el conjunto 1 Y en el conjunto 2.</b>  (No lo confundas con el selector "or", que devuelve la unión de los dos conjuntos: los residuos que están en el conjunto 1 O en el conjunto 2.)
-   La opción "selectors" debe ser una cadena de nombres de selectores declarados previamente, separados por comas. Estos selectores se recuperarán del DataMap.
-   La opción "selectors" no es obligatoria, y tampoco lo son las subetiquetas; pero debe indicarse al menos una de las dos. Si se desea, pueden indicarse ambas.
-   Los selectores declarados en las subetiquetas se añadirán al conjunto de selectores de AndResidueSelector, pero no se añadirán al DataMap.

#### OrResidueSelector

    <Or name="(&string)" selectors="(&string)">
       <(Selector1)/>
       <(Selector2)/>
        ...
    </Or>

-   OrResidueSelector puede tomar tantos selectores como se quiera.
-   OrResidueSelector realiza un *OR* lógico de los vectores ResidueSubset devueltos por las funciones apply de cada uno de los ResidueSelectors que contiene.  <b>En la práctica, esto significa que devuelve la <i>unión</i> de los conjuntos seleccionados: los residuos que están en el conjunto 1 O en el conjunto 2.</b>  (No lo confundas con el selector "and", que devuelve la intersección de los dos conjuntos: los residuos que están en el conjunto 1 Y en el conjunto 2.)
-   La opción "selectors" debe ser una cadena de nombres de selectores declarados previamente, separados por comas. Estos selectores se recuperarán del DataMap.
-   La opción "selectors" no es obligatoria, y tampoco lo son las subetiquetas; pero debe indicarse al menos una de las dos. Si se desea, pueden indicarse ambas.
-   Los selectores declarados en las subetiquetas se añadirán al conjunto de selectores de OrResidueSelector, pero no se añadirán al DataMap.

#### TrueResidueSelector

-   TrueResidueSelector simplemente selecciona todo tu Pose.  Es útil para las ocasiones en que necesitas usar un residue selector pero quieres todo tu Pose.
    ```xml
    <True name="full_pose" />
    ```

### ResidueSelectors independientes de la conformación

#### BlockSelector

Selecciona regiones de bloques continuos a partir de un selector de entrada.  Consulta [[esta página para más detalles|rs_BlockSelector_type]].

#### ChainSelector

    <Chain chains="(&string)"/>

-   La cadena de texto que se da a la opción "chains" debe ser una lista de identificadores de cadena separados por comas
-   Cada identificador de cadena debe ser un entero, para que se use el índice de cadena del Pose, o un único carácter, para que se pueda usar el ID de cadena PDB.
-   ChainSelector pone en true las posiciones correspondientes a todos los residuos de las cadenas dadas y en false todas las demás posiciones.

#### JumpDownstreamSelector

    <JumpDownstream jump="(&int)"/>

-   El entero que se da al argumento "jump" debe referirse a un Jump presente en el Pose.
-   JumpDownstreamSelector pone en true las posiciones correspondientes a todos los residuos que están aguas abajo del salto indicado y en false todas las demás posiciones.
-   Este selector es lógicamente equivalente a un NotSelector aplicado al JumpUpstreamSelector para el mismo salto.

#### JumpUpstreamSelector

    <JumpUpstream jump="(&int)"/>

-   El entero que se da al argumento "jump" debe referirse a un Jump presente en el Pose.
-   JumpUpstreamSelector pone en true las posiciones correspondientes a todos los residuos que están aguas arriba del salto indicado y en false todas las demás posiciones.
-   Este selector es lógicamente equivalente a un NotSelector aplicado al JumpDownstreamSelector para el mismo salto.

#### ResiduePropertySelector

- [[ResiduePropertySelector]] selecciona residuos según propiedades específicas de cada tipo de residuo, es decir, proteína, carbohidrato, metal, hidrofóbico, etc.  Se pueden definir varias propiedades y darse una lógica específica, como `or_logic` y `and_logic`. 
 
#### RandomResidueSelector

Selecciona residuos del Pose al azar. Ten en cuenta que este residue selector es estocástico. Es decir, devolverá un conjunto de residuos distinto cada vez que se llame. Sin embargo, los residuos seleccionados al azar se pueden guardar con [[StoreResidueSubsetMover]] y recuperar con el selector [[StoredResidueSubset|ResidueSelectors#other_storedresiduesubset]].

    <RandomResidue name="(&string)"
        selector="(TrueSelector &string)"
        num_residues="(1 &int)" />

- num_residues -- El número de residuos que se seleccionarán al azar
- residue_selector -- Define el subconjunto del que se eligen los residuos al azar.



#### ResidueIndexSelector

    <Index name="(&string)" resnums="(&string)" error_on_out_of_bounds_index="(true &bool)" reverse="(false &bool)" />

-   La cadena de texto que se da a la opción "resnums" debe ser una lista de identificadores de residuo separados por comas
-   Cada identificador de residuo debe ser:
    * *un entero*, para que se pueda usar la numeración del Pose, 
    * *dos enteros separados por un guion*, que designan un rango de residuos con numeración del Pose, 
    * *un entero seguido de un único carácter*, p. ej. 12A, que se refiere a la numeración PDB del residuo 12 de la cadena A,  
    * *un entero seguido de un único carácter, seguido de un guion, seguido de un entero seguido de un único carácter*, p. ej. 12A-47A, que se refiere a los residuos 12 a 47 de la cadena A en numeración PDB.
(Ten en cuenta que los residuos que contienen códigos de inserción no se pueden identificar correctamente con estos esquemas de numeración PDB).
-   ResidueIndexSelector pone en true las posiciones correspondientes a los residuos dados en la cadena resnums y en false todas las demás posiciones.
-   Si "error_on_out_of_bounds_index" es true (el valor por defecto), este selector lanza un error si el usuario intenta seleccionar un índice de residuo que no existe en el Pose (_p. ej._ el residuo 56 de un Pose de 55 residuos).  Este comportamiento se puede desactivar poniendo "error_on_out_of_bounds_index" en false, lo que permite que el selector ignore en silencio los índices fuera de rango.
-   Si reverse es true (por defecto false), el índice de residuo 1 corresponde al último residuo de la proteína (próximamente se incorporará)

#### ResidueNameSelector
Selecciona residuos por el nombre completo de su tipo de residuo de Rosetta. Debe especificarse al menos una de las opciones residue_names y residue_name3.

    <ResidueName name="(&string)" residue_names="(&string)" residue_name3="(&string)" />

Debes proporcionar al menos una de estas:

residue_names - Una lista separada por comas de nombres de residuo de Rosetta (incluidos los parches). Por ejemplo, "CYD" seleccionará todos los disulfuros, y "CYD,SER:NTermProteinFull,ALA" seleccionará todos los disulfuros, las alaninas y las serinas N-terminales; todos los demás residuos no se seleccionarán (es decir, serán false en el objeto ResidueSubset).

residue_name3 - Una lista separada por comas de nombres de residuo de Rosetta de 3 letras.  Estos se seleccionarán independientemente del tipo de variante. Por ejemplo, "SER" seleccionará residuos llamados "SER", "SER:NtermProteinFull" y "SER:Phosphorylated".

**Ejemplo**
Este ejemplo seleccionará todas las variantes de ALA, los residuos ASN C-terminales y los disulfuros:

    <ResidueName name="change" residue_names="ASN:CtermProteinFull,CYD" residue_name3="ALA" />


#### [[ResidueInSequenceMotifSelector]]

Encuentra motivos de secuencia en una proteína

#### Residue Selectors de anticuerpos

Estos residue selectors usan el marco subyacente de modelado y diseño de anticuerpos, y requieren una estructura de anticuerpo renumerada.  Consulta [[General Antibody Options and Tips]] para más información.  Si tu anticuerpo fue generado por RosettaAntibody, ya está renumerado con el esquema de Chothia, que es el predeterminado.

##### AntibodyRegionSelector 
Selecciona residuos de CDR en un anticuerpo o en un anticuerpo de camélido. 

- Autor: Dr. Jared Adolf-Bryfogle (jadolfbr@gmail.com) 
- PIs: Dr. Roland Dunbrack y Dr. William Schief

```xml
    <AntibodyRegion name="(&string)" region="(&string)" numbering_scheme="(&string)" cdr_definition="(&string)" />
```

-   _region (&string) (default=cdr_region)_:  Selecciona la región que quieres desactivar. Cadenas aceptadas: cdr_region, framework_region, antigen_region. 
-   _numbering_scheme (&string)_:  Define el esquema de numeración del anticuerpo.  También hay que definir la opción XML cdr_definition. Ambas opciones también se pueden definir por línea de comandos (recomendado).  Consulta [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   _cdr_definition (&string)_: Define la definición de CDR que quieres usar.  También hay que definir la opción XML numbering_scheme.  

-  Véase también:
 - [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
 - [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
 - [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
 
##### CDRResidueSelector 
Selecciona residuos de CDR en un anticuerpo o en un anticuerpo de camélido. 

- Autor: Dr. Jared Adolf-Bryfogle (jadolfbr@gmail.com) 
- PIs: Dr. Roland Dunbrack y Dr. William Schief

```xml
    <CDR name="(&string)" cdrs="(&string,&string)" input_ab_scheme="(&string)" cdr_definition="(&string)" />
```

-   _cdrs (&string,&string)_ (default=all cdrs):  Selecciona el conjunto de CDR al que quieres restringirte (p. ej.: H1 o h1) 
-   _input_ab_scheme (&string)_:  Define el esquema de numeración del anticuerpo.  También hay que definir la opción XML cdr_definition. Ambas opciones también se pueden definir por línea de comandos (recomendado).  Consulta [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   _cdr_definition (&string)_: Define la definición de CDR que quieres usar.  También hay que definir la opción XML numbering_scheme. 

-  Véase también:
 - [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
 - [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
 - [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]






#### Residue Selectors de carbohidratos

Estos residue selectors usan el marco subyacente de RosettaCarbohydrate.
##### [[GlycanResidueSelector]]

##### [[GlycanLayerSelector]]

##### [[RandomGlycanFoliageSelector | rs_RandomGlycanFoliageSelector_type]]



### Residue Selectors dependientes de la conformación

#### BinSelector

BinSelector selecciona los residuos que caen en un bin de torsión de la cadena principal con nombre (p. ej., el bin "A", que corresponde a residuos alfa-helicoidales en la nomenclatura "ABEGO").  Los residuos no poliméricos se ignoran.  Por defecto, solo se seleccionan alfa-aminoácidos, aunque esto se puede desactivar.

```xml
     <Bin name="(&string)" bin="(&string)" bin_params_file="('ABEGO' &string)" select_only_alpha_aas="(true &bool)" />
```
- bin: El nombre del bin de torsión de la cadena principal.
- bin_params_file: El nombre del archivo bin_params que define un conjunto de bins de torsión.  Las opciones actuales incluyen "ABEGO", "ABBA" (una versión simétrica de la nomenclatura ABEGO, útil para el diseño mixto D/L) y "PRO_DPRO" (que define los bins "LPRO" y "DPRO", correspondientes a las regiones del espacio de Ramachandran accesibles a L- y D-prolina, respectivamente).  Los archivos bin_params predefinidos están en database/protocol_data/generalizedKIC/bin_params/.  También se puede proporcionar un archivo bin_params escrito a medida, con su ruta relativa desde el directorio de ejecución.
- select_only_alpha_aas: Si es true, solo se seleccionan alfa-aminoácidos.  Si es false, se selecciona cualquier tipo polimérico permitido por el archivo de definición de bins.

Este ejemplo selecciona todos los residuos que están en la región del espacio de Ramachandran accesible a la D-prolina (lo que puede ser útil en un script que intente diseñar esas posiciones como D-prolina):

```xml
     <Bin name="select_d_pro_positions" bin="DPRO" bin_params_file="PRO_DPRO" />
```

BinSelector se puede combinar con los selectores AND, OR o NOT para seleccionar varias regiones.  Por ejemplo, lo siguiente seleccionaría los residuos que están en las regiones helicoidales dextrógiras o levógiras del espacio de Ramachandran:

```xml
     <Bin name="right_handed_helices" bin="A" bin_params_file="ABBA" />
     <Bin name="left_handed_helices" bin="Aprime" bin_params_file="ABBA" />
     <Or name="right_or_left_handed_helices" selectors="right_handed_helices,left_handed_helices" />
```


#### BondedResidueSelector

BondedResidueSelector toma (obligatoriamente) un residue selector o una lista de números de residuo separados por comas y selecciona todos los residuos que tienen enlaces químicos con los residuos de entrada. Esto incluye tanto los vecinos en la secuencia primaria como cualquier otro residuo unido covalentemente, incluidos, entre otros, los iones metálicos unidos (si se configuran con -auto_setup_metals), los carbohidratos, las parejas de disulfuro, etc.

```xml
     <Bonded name="(&string)" resnums="(&string)" selector="(&string)"/>
```

* resnums: Una lista separada por comas de números de residuo (numeración PDB o de Rosetta) alrededor de los cuales seleccionar
* selector: Nombre de un residue selector definido previamente que especifica el conjunto de entrada.

BondedResidueSelector también puede tomar un residue selector como subetiqueta:
```xml
     <Bonded name="(&string)" >
          <Index resnums="2,3" />
     </Bonded>
```
Solo se puede proporcionar un residue selector, y es mutuamente excluyente con la lista resnum.

#### CloseContactResidueSelector
    <CloseContact name=(%string) residue_selector=(%string) contact_threshold=(4.5%float)/>

o

    <CloseContact name=(%string) contact_threshold=(4.5%float)>
       <Selector ... />
    </CloseContact>

-   CloseContactResidueSelector selecciona todos los residuos que están dentro de una cierta distancia de corte de un conjunto de residuos de foco. Es similar a NeighborhoodResidueSelector (más abajo), salvo que las distancias que se miden son distancias de átomo a átomo. El selector CloseContact es sensible al rotámero colocado en un residuo determinado (p. ej., si el rotámero de la tirosina apunta a la izquierda, sus contactos cercanos se encuentran a la izquierda); en cambio, el selector Neighborhood selecciona los residuos dentro de una esfera centrada en el átomo CBeta.
-   Pone en true cada posición del ResidueSubset que corresponde a un residuo que está a cierta distancia del conjunto de residuos de foco __así como los residuos del propio conjunto de foco__, y pone en false todas las demás posiciones.
-   El conjunto de residuos de foco se puede especificar de una de dos formas (mutuamente excluyentes): mediante un ResidueSelector declarado previamente con la opción "residue_selector", o definiendo una subetiqueta que declare un ResidueSelector anónimo.


#### HBondSelector

HBondSelector selecciona todos los residuos que tienen enlaces de hidrógeno con los residuos especificados en la entrada (ya sea mediante una lista resnum separada por comas o mediante un residue selector). Si no se selecciona ningún residuo de entrada, se seleccionan todos los residuos del Pose que formen enlaces de hidrógeno más fuertes que el corte de energía especificado.

```xml
     <HBond name="(&string)" resnums="(&string)" 
        residue_selector="(&string)" include_bb_bb="(false &bool)"
        hbond_energy_cutoff="(-0.5 &Real)" scorefxn="(&string)" />
```

* resnums: Lista separada por comas de números de residuo que especifica de qué residuos se seleccionarán las parejas de enlace de hidrógeno.
* residue_selector: Nombre de un residue selector definido previamente que especifica el conjunto de residuos de entrada. El selector también se puede especificar como subetiqueta.
* include_bb_bb: ¿Se deben incluir los enlaces de hidrógeno cadena principal-cadena principal? Por defecto se ignoran.
* hbond_energy_cutoff: Solo se tendrán en cuenta los enlaces de hidrógeno con energías inferiores a este corte. Por defecto -0.5 REU.
* scorefxn: Nombre de la función de puntuación (definida previamente) que se usa para identificar y puntuar los enlaces de hidrógeno.

HBondSelector también puede tomar un residue selector como subetiqueta. Solo se puede proporcionar un residue selector, y es mutuamente excluyente con la lista resnum.


#### InterGroupInterfaceByVector

    <InterfaceByVector name="(%string)" cb_dist_cut="(11.0&float)" nearby_atom_cut="(5.5%float)" vector_angle_cut="(75.0&float)" vector_dist_cut="(9.0&float)" grp1_selector="(%string)" grp2_selector="(%string)"/>

o

    <InterfaceByVector name="(%string)" cb_dist_cut="(11.0&float)" nearby_atom_cut="(5.5%float)" vector_angle_cut="(75.0&float)" vector_dist_cut="(9.0&float)">
       <(Selector1)/>
       <(Selector2/>
    </InterfaceByVector>

-   Selecciona el subconjunto de residuos que están en la interfaz entre dos grupos de residuos (p. ej., residuos de cadenas distintas, lo que puede ser útil en docking, o residuos de la misma cadena, lo que puede ser útil en el ensamblaje de dominios), usando la lógica de selección de residuos de interfaz desarrollada originalmente por Stranges y Leaver-Fay. Esta lógica selecciona los residuos que ya están en contacto directo con residuos del otro grupo (es decir, que contienen átomos dentro del umbral de distancia nearby\_atom\_cut respecto a los átomos del otro grupo) o que apuntan sus vectores c-alfa–c-beta hacia el otro grupo, de modo que al menos un ángulo c-beta *i* –c-alfa *i* –c-alfa *j* (entre los residuos *i* y *j*) es menor que el umbral de ángulo vector\_angle\_cut (dado en grados) y su átomo vecino está dentro del umbral de distancia vector\_dist\_cut (dado en Angstroms) de al menos un átomo vecino del otro grupo.
-   Los grupos 1 y 2 se pueden dar mediante las opciones grp1\_selector y grp2\_selector (lo que requiere que los selectores indicados se hayan declarado previamente y colocado en el DataMap) o se pueden declarar de forma anónima en las subetiquetas. Los selectores declarados de forma anónima no se añaden al DataMap.  Además, los grupos 1 y 2 deben darse en el orden en que aparecen en el Pose (es decir, si se selecciona la interfaz entre las cadenas A y B, el grupo 1 debe ser la cadena A y el grupo 2 la cadena B. Si se invierte este orden, no se seleccionará ningún residuo)
-   cb\_dist\_cut es un factor de ajuste que se usa en este cálculo y solo se emplea para construir un grafo inicial; las relaciones de vecindad solo se tienen en cuenta entre pares de residuos que tienen aristas en este grafo inicial. cb\_dist\_cut debe ser mayor que vector\_dist\_cut.
-   Debido a cómo se establece la lógica en la función de detección de interfaz de Stranges et al., el criterio del ángulo del vector no se comprobará para los residuos que cumplan el criterio de distancia nearby\_atom\_cut. Si quieres que todos los residuos cumplan el criterio del vector, pon cb\_dist\_cut en 0.

#### LayerSelector

LayerSelector permite al usuario seleccionar residuos según su enterramiento.  El enterramiento se puede evaluar por el número de vecinos de cadena lateral dentro de un cono a lo largo del vector CA-CB (el método por defecto) o por SASA.  Con SASA, la exposición al disolvente de la posición diseñada depende de la conformación de las cadenas laterales vecinas; esto es útil cuando haces una o dos mutaciones y no cambias muchos aminoácidos vecinos. Con los vecinos de cadena lateral, la exposición al disolvente depende de la dirección hacia la que apunta la cadena lateral del aminoácido; esto es útil para el diseño _de novo_ o para protocolos en los que se diseñan muchos aminoácidos a la vez.

```xml
     <Layer name="(&string)" select_core="(false &bool)" select_boundary="(false &bool)" select_surface="(false &bool)"
          ball_radius="(2.0 &Real)" use_sidechain_neighbors="(true &bool)"
          sc_neighbor_dist_exponent="(1.0 &Real)" sc_neighbor_dist_midpoint="(9.0 &Real)"
          sc_neighbor_denominator="(1.0 &Real)" sc_neighbor_angle_shift_factor="(0.5 &Real)"
          sc_neighbor_angle_exponent="(2.0 &Real)"
          core_cutoff="(5.2 &Real)" surface_cutoff="(2.0 &Real)"
     />
```

Opciones:
- select\_core=(false &bool), select\_boundary=(false &bool), select\_surface=(false &bool): Opciones booleanas que permiten al usuario elegir qué capa o capas se deben seleccionar.  Se permiten varias capas, pero debe especificarse al menos una; de lo contrario, no se seleccionará ningún residuo.
- use_sidechain_neighbors=(true &bool): ¿Se debe usar el algoritmo de vecinos de cadena lateral para determinar en qué capa está un residuo (el valor por defecto) o se debe usar en su lugar el método antiguo basado en SASA?

Opciones específicas de SASA:
- ball_radius=(2.0 &Real): El radio del algoritmo de bola rodante que se usa para elegir residuos por SASA.
- core_cutoff=(20.0 &Real), surface_cutoff=(40.0 &Real):  Los valores de SASA (en unidades de A^2) por debajo de los cuales un residuo se clasifica en el grupo del núcleo, o por encima de los cuales se clasifica en el grupo de la superficie.  Ten en cuenta que poner use_sidechain_neighbors=false cambia los valores por defecto de core_cutoff y surface_cutoff.

Opciones específicas de vecinos de cadena lateral:
- core_cutoff=(5.2 &Real), surface_cutoff=(2.0 &Real):  El número de vecinos de cadena lateral (recuentos ponderados; véase más abajo) por encima del cual un residuo se clasifica en el grupo del núcleo, o por debajo del cual se clasifica en el grupo de la superficie.

Se cuentan los residuos vecinos, ponderados por un factor que es un factor de distancia multiplicado por un factor de ángulo.  Los dos factores se calculan así:

**factor de distancia = 1 / (1 + exp( n*(d - m) ) )**, donde **d** es la distancia del vecino al CA del residuo, **m** es el punto medio de la caída de distancia y **n** es un factor exponente de caída que determina la nitidez de la caída de distancia (los valores más altos dan una caída más brusca cerca de la distancia del punto medio).

**factor de ángulo = ( (cos(theta)+a)/(1+a) )^b**, donde **theta** es el ángulo entre el vector CA-CB y el vector CA-vecino, **a** es un factor de desplazamiento que ensancha un poco el cono y **b** es un exponente que determina la nitidez de la caída angular (los valores más bajos dan un cono más ancho con una caída de borde más brusca).

En general no hace falta cambiar los parámetros anteriores respecto a sus valores por defecto.  Sin embargo, si el usuario desea cambiarlos, puede hacerlo modificando lo siguiente:

- sc_neighbor_dist_exponent=(1.0 &Real): Modifica el valor de **n**, el exponente de distancia.
- sc_neighbor_dist_midpoint=(9.0 &Real): Modifica el valor de **m**, el punto medio de la caída de distancia.
- sc_neighbor_angle_shift_factor=(0.5 &Real): Modifica el valor de **a**, el factor de desplazamiento angular.
- sc_neighbor_angle_exponent=(2.0 &Real): Modifica el valor de **b**, el valor de nitidez angular.
- sc_neighbor_denominator=(1.0 &Real): Modifica el valor por el que se divide la expresión global.

#### LigandMetalContactSelector <a id="LigandMetalContactSelector" />

LigandMetalContactSelector selecciona todos los residuos que forman contactos con átomos de metal, ya sea como iones individuales o como parte de un complejo mayor. Opcionalmente toma un residue selector (como subetiqueta o como selector definido previamente) o una lista resnum para indicar de qué residuos que contienen metal se deben seleccionar los contactos. Los contactos se identifican con el mismo procedimiento que [[SetupMetalsMover]] y la opción -auto_setup_metals (véase [[Metals]]); se considera que un átomo potencialmente de unión a metales se une a un metal si la distancia entre él y el ion metálico no es mayor que la suma de su radio de van der Waals y el del metal, multiplicada por el dist_cutoff_multiplier proporcionado.

```xml
<LigandMetalContactSelector name="(&string;)" residue_selector="(&string;)"
        dist_cutoff_multiplier="(1 &real;)" />
```
o
```xml
<LigandMetalContactSelector name="(&string;)"
        dist_cutoff_multiplier="(1 &real;)" >
    <Residue Selector Tag ... />
</LigandMetalContactSelector>
```
o
```xml
<LigandMetalContactSelector name="(&string;)"
        dist_cutoff_multiplier="(1 &real;)"
        resnums="(&resnum_list_with_ranges;)" />
```

residue_selector: Nombre del residue selector del ligando
dist_cutoff_multiplier: Multiplicador de la distancia al átomo de metal para la detección de contactos (por defecto 1.0)
resnums: Lista de números de residuo que indica de qué ligandos se deben seleccionar los contactos. No se puede usar con un residue selector.

#### NeighborhoodResidueSelector

    <Neighborhood name=(%string) resnums=(%string) distance=(10.0%float)/>

o

    <Neighborhood name=(%string) selector=(%string) distance=(10.0%float)/>

o

    <Neighborhood name=(%string) distance=(10.0%float)>
       <Selector ... />
    </Neighborhood>

-   NeighborhoodResidueSelector selecciona todos los residuos que están dentro de una cierta distancia de corte de un conjunto de residuos de foco.
-   Pone en true cada posición del ResidueSubset que corresponde a un residuo que está a cierta distancia del conjunto de residuos de foco __así como los residuos del propio conjunto de foco__, y pone en false todas las demás posiciones.
-   El conjunto de residuos de foco se puede especificar de una de tres formas (mutuamente excluyentes): mediante una cadena resnums (consulta [[más arriba|TaskOperations-RosettaScripts#ResidueIndexSelector]] el ResidueIndexSelector para ver cómo debe tener el formato esa cadena), mediante un ResidueSelector declarado previamente con la opción "selector", o definiendo una subetiqueta que declare un ResidueSelector anónimo.  
-   Ahora usa el grafo de vecinos de 10A incrustado en el Pose tras la puntuación para acelerar el cálculo.  Es útil para muchas llamadas, o cuando este selector se usa como TaskOperation mediante la operación OperateOnResidueSubset (Jared Adolf-Bryfogle, junio de 2016).
-  __include_focus_in_subset__ (&bool) (default = True)  Pon esta opción en false para incluir solo los residuos vecinos.    
-   atom_names_for_distance_measure (&string)  Lista separada por comas de nombres de átomos que se usarán en lugar del átomo vecino por defecto de cada residuo de foco. Esto resulta útil para seleccionar alrededor de un átomo de ligando concreto o de un átomo polar de un residuo. __El número de nombres de átomo debe ser igual al número de residuos de foco__; de lo contrario, se lanzará un error en el momento de apply.
-   NeighborhoodResidueSelector __NO__ selecciona a través de cadenas simétricas por defecto. Puedes usar SymmetricalResidueSelector para simetrizar la selección que pasas a NeighborhoodResidueSelector y obtener el comportamiento esperado __en algunos casos__.

#### NumNeighborsSelector

```xml
    <NumNeighbors name="(%string)" count_water="(false&bool)" threshold="(17%integer)" distance_cutoff="(10.0&float)"/>
```

-   NumNeighborsSelector pone en true cada posición del ResidueSubset que corresponde a un residuo que tiene al menos *threshold* vecinos dentro de *distance\_cutoff,* y pone en false todas las demás posiciones.
-   NumNeighborsSelector usa la coordenada del átomo vecino de cada residuo como representante y cuenta dos residuos como vecinos si sus átomos vecinos están a una distancia menor que *distance\_cutoff* entre sí.
-   Es posible incluir residuos de agua en el recuento de vecinos poniendo el booleano "count\_water" en true


#### PhiSelector


```xml
     <Phi name="(&string)" select_positive_phi="(true &bool)" ignore_unconnected_upper="(true &bool)" />
```
- select_positive_phi: Si es true (el valor por defecto), se seleccionan los alfa- y beta-aminoácidos con valores de phi mayores o iguales que cero.  Si es false, se seleccionan los alfa- y beta-aminoácidos con valores de phi menores que cero.
- ignore_unconnected_upper: Si es true (el valor por defecto), los residuos C-terminales y otros residuos sin nada conectado en la conexión superior no se seleccionan.  Si es false, estos residuos se pueden seleccionar, según sus valores de phi.  Ten en cuenta que cualquier residuo que carezca de conexión inferior <i>nunca</i> se selecciona.


     PhiSelector selecciona alfa- y beta-aminoácidos que están en la región de phi positivo o de phi negativo del espacio de Ramachandran.  Los ligandos y los residuos poliméricos que no son alfa- ni beta-aminoácidos nunca se seleccionan.  Los alfa- o beta-aminoácidos sin conexión inferior (o sin nada conectado en la conexión inferior) tampoco se seleccionan nunca.  Por defecto, los alfa- o beta-aminoácidos sin conexión superior no se seleccionan, aunque esto se puede desactivar.

     PhiSelector es cómodo para:

- Contar y limitar el número de posiciones de phi positivo al muestrear conformaciones de loop.
- Restringir las posiciones de phi positivo a glicina y las de phi negativo a L-aminoácidos, al hacer diseño canónico de proteínas convencionales.
- Limitar el número de L-aminoácidos en la región de phi positivo del espacio de Ramachandran, junto con el término de puntuación aa_composition.
- Restringir los residuos de la región de phi positivo a D-aminoácidos y los de la región de phi negativo a L-aminoácidos, al hacer diseño mixto D/L de péptidos sintéticos.

El siguiente ejemplo usa ResiduePropertySelectors y selectores And en combinación con PhiSelector para seleccionar solo alfa-aminoácidos con phi positivo:

```xml
<Phi name="posPhi" select_positive_phi="true" />
<ResiduePropertySelector name="all_alphas" properties="ALPHA_AA"/>
<And name="alphas_posPhi" selectors="posPhi,all_alphas" />
```

#### PairedSheetResidueSelector

    <PairedSheetResidueSelector name=(%string)
        secstruct=(%string, "")
        sheet_topology=(%string)
        use_dssp=(%bool, True) />

PairedSheetResidueSelector selecciona todos los residuos implicados en emparejamientos hebra-hebra. El conjunto de residuos emparejados se calcula mediante una combinación de la estructura secundaria y la topología de hoja especificada por el usuario. Por ejemplo, considera una hoja beta antiparalela con estructura secundaria "LEEEELLEEEEEELLEEEEEEL".  En este caso la hebra 1 tiene cuatro residuos (2-5), y las hebras 2 (residuos 8-13) y 3 (residuos 16-21) tienen 6 residuos cada una. Si la topología de hoja dada es '1-2.A.-1' (es decir, las hebras 1-2 están emparejadas en dirección antiparalela con un desplazamiento de registro de 1), los residuos emparejados de esas hebras son 2-11, 3-10, 4-9 y 5-8. Por tanto, se seleccionarán los residuos 2, 3, 4, 5, 8, 9, 10 y 11. Aunque los residuos 12 y 13 están en la hebra 2, no están emparejados con nada en la topología dada y no se seleccionarán. Del mismo modo, una topología dada de '1-2.A.-1;2-3.A.0' seleccionará todos los residuos marcados como 'E' por DSSP (2, 3, 5, 8, 9, 10 y 11 del emparejamiento '1-2.A.-1', más 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20 y 21 del emparejamiento '2-3.A.0').

#####Opciones
**secstruct** - Estructura secundaria que se usa para determinar los residuos de hebra. Si no se especifica, la estructura secundaria se elegirá según el valor de la opción 'use_dssp'

**use_dssp** - Si es true y no se da secstruct, la estructura secundaria de entrada se calculará con DSSP.  Si es false, se usará la estructura secundaria guardada en el Pose. Ten en cuenta que la estructura secundaria guardada en el Pose puede no reflejar siempre el contenido del Pose, a menos que se establezca explícitamente mediante DsspMover.

**sheet_topology** - Cadena que describe la topología de la hoja, con el formato A-B.P.R, donde A es el número de la primera hebra en el espacio primario, B es el número de la segunda hebra en el espacio primario, P es 'P' para paralela y 'A' para antiparalela, y R es el desplazamiento de registro.

#####Ejemplo
El siguiente ejemplo seleccionará todos los residuos emparejados entre las hebras 1 y 2, usando una estructura secundaria calculada con DSSP:

```xml
<PairedSheetResidueSelector name="E1-E2_pairs"
    sheet_topology="1-2.A.-1" use_dssp="1" />
```


#### PrimarySequenceNeighborhoodSelector

    <PrimarySequenceNeighborhood name=(%string) selector=(%string) lower=(1%int) upper=(1%int) />

o

    <PrimarySequenceNeighborhood name=(%string) lower=(1%int) upper=(1%int) >
       <Selector ... />
    </PrimarySequenceNeighborhood>

-   PrimarySequenceNeighborhoodResidueSelector selecciona todos los residuos que están dentro de un cierto número de residuos de una selección dada en la secuencia primaria. Por ejemplo, dada una selección del residuo 5, PrimarySequenceNeighborhood seleccionaría por defecto los residuos 4, 5 y 6.  Si upper se pusiera en 2, seleccionaría los residuos 4, 5, 6 y 7. Este ResidueSelector tiene en cuenta las cadenas, es decir, no seleccionará residuos de una cadena distinta de la selección original. En el ejemplo anterior, si el residuo 5 estuviera en la cadena 1 y el residuo 6 en una cadena 2, PrimarySequenceNeighborhoodResidueSelector seleccionaría solo los residuos 4 y 5.

**lower** - Número de residuos que se seleccionan por debajo (es decir, hacia el extremo N) de la selección de entrada. Default=1

**upper** - Número de residuos que se seleccionan por encima (es decir, hacia el extremo C) de la selección de entrada. Default=1

#### RamaMutationSelector

RamaMutationSelector selecciona posiciones según su puntuación `rama_prepro`.  Opcionalmente, puede seleccionar según la puntuación `rama_prepro` que tendría una posición si se mutara a un tipo de residuo definido por el usuario.  Esto es útil para seleccionar posiciones que están en regiones del espacio de Ramachandran que serían muy favorables para un tipo con restricciones conformacionales, como L- o D-prolina, ácido 2-aminoisobutírico (AIB), _etc_.

Ten en cuenta que este selector no selecciona residuos en los extremos ni en los cutpoints, ya que estos no tienen puntuaciones `rama_prepro` definidas.  También ignora los tipos de residuo no poliméricos.

##### Ejemplo de uso

El siguiente ejemplo selecciona todos los residuos que están en regiones del espacio de Ramachandran en las que la prolina tendría una puntuación `rama_prepro` menor o igual que -0.5 unidades de energía de Rosetta.

```xml
<RamaMutationSelector name="pro_positions" target_type="PRO" score_threshold="-0.5" />
```

##### Todas las opciones
```xml
<RamaMutationSelector
     name="(&string)"
     target_type="(&string, '')"
     score_threshold="(&real, 0.0)"
     rama_prepro_multiplier="(&real, 0.45)"
/>
```
- **name**: Un nombre único que se da a esta instancia del selector.
- **target_type**: El tipo de residuo al que estamos considerando mutar.  Si se deja vacío (el valor por defecto), se usa la puntuación `rama_prepro` del tipo existente en cada posición.  Si se especifica, se usa la puntuación `rama_prepro` del tipo especificado, dada la conformación en la posición.  Ten en cuenta que es un nombre completo, no un código de tres letras (_p. ej._ "DPRO" para D-prolina en lugar de "DPR").
- **score_threshold**: El corte para la selección, basado en la puntuación `rama_prepro`.  Se seleccionan las posiciones que, al mutarse al tipo especificado, tienen una puntuación `rama_prepro` menor que este umbral.  Por defecto 0.0 unidades de energía de Rosetta.
- **rama_prepro_multiplier**: El multiplicador del término `rama_prepro`.  La puntuación se multiplica por este valor antes de compararla con el umbral.  Por defecto es 0.45 para coincidir con el peso de `rama_prepro` en la función de puntuación `beta_nov15`.

Ten en cuenta que la energía `rama_prepro` es una energía de dos cuerpos que depende de la conformación de un residuo, de su identidad y de la identidad de su vecino C-terminal (con distintas tablas de consulta para los residuos que preceden a una prolina y para los que no).  Como es una energía de dos cuerpos, la puntuación de una posición concreta se reparte entre esa posición y la posición i+1.  Esto significa que la tabla final de puntuaciones tendrá valores que no se corresponden con los valores usados para evaluar este selector, ya que la energía `rama_prepro` de cada posición es la suma de su propia energía y la de la posición i-1.

#### SSElementSelector
```xml
 <SSElement name="(&string)" selection="(&string)" to_selection="(&string)" reassign_short_terminal_loop="( (2 &int)" chain="(&string)" />
```
**Opciones de ejecución:**
* **selection sola:** selecciona esa selección
* **selection + to_selection:** selecciona ambas selecciones y los residuos situados entre ellas

* **reassign_short_terminal_loop:** cuántos residuos de cada extremo se ignoran si son loops
* **chain:** sobre qué cadena operar

**Notación de selection y to_selection:**
*  **n_term=** residuo 1
*  **c_term=** longitud de la proteína (o de la cadena)
*  **"1,H"=** primera hélice
*  **"2,L"=** segundo loop
*  **"-2,E"=** segunda hoja contando desde el final de la proteína
*  **"1,H,S"=** inicio de la primera hélice
*  **"1,H,E"=** final de la primera hélice
*  **"1,H,M"=** mitad de la primera hélice

**Ejemplo:**
```xml
 <SSElement name="(&string)" selection="1,H,M" to_selection="1,H,L" chain="A"/>
```


#### SecondaryStructureSelector

[[include:rs_SecondaryStructure_type]]

**Ejemplo**
El ejemplo siguiente selecciona todos los residuos del Pose con estructura secundaria 'H' o 'E'.

    <SecondaryStructure name="all_non_loop" ss="HE" />

####SymmetricalResidueSelector
    <SymmetricalResidue name=(%string) selector=(%string) />

SymmetricalResidueSelector, cuando se le da un selector, devolverá todas las copias simétricas (incluida la selección original) de esos residuos. Aunque el packer reconoce la simetría, no todos los filtros lo hacen. Este selector es útil cuando necesitas dar números de residuo de forma explícita pero no estás seguro de qué subunidad de simetría necesitas.

####TaskSelector
    <Task name=(%string) fixed=(%bool, False) packable=(%bool, True) designable=(%bool, True) task_operations=(%string) />

TaskSelector usa task operations proporcionadas por el usuario para definir una selección. Las task operations se ejecutan sobre el Pose y los residuos se seleccionan según su estado en el PackerTask resultante (diseñable, empaquetable o fijo). Ten en cuenta que, si todas estas opciones son false, no se seleccionará ningún residuo. Es útil para protocolos heredados que todavía usan task operations para seleccionar residuos (escritos antes de que existieran los ResidueSelectors). Los protocolos nuevos deberían usar ResidueSelectors para seleccionar residuos.

**task_operations** - Obligatorio. Las task operations que se usan para definir la selección.

**fixed** - Si es true, se incluirán en la selección los residuos del PackerTask marcados como fijos (es decir, ni empaquetables ni diseñables). Default = False

**packable** - Si es true, se incluirán en la selección los residuos del PackerTask marcados como empaquetables. Default = True

**designable** - Si es true, se incluirán en la selección los residuos del PackerTask marcados como diseñables. Default = True

####ResiduePDBInfoHasLabel

    <ResiduePDBInfoHasLabel name=(%string) property=(%string) />

El residue selector ResiduePDBInfoHasLabel selecciona todos los residuos con la etiqueta de residuo PDB dada. Algunos protocolos (p. ej. MotifGraft, Disulfidize) usan estas etiquetas para marcar residuos, y este selector permite seleccionar esos residuos sin que el usuario tenga que saber cuáles se marcaron.

**label** - Obligatorio. La etiqueta de información de residuo PDB que se va a seleccionar. (p. ej. "DISULFIDIZE")

**Ejemplo**
El ejemplo siguiente selecciona todos los residuos que fueron convertidos en disulfuros por el mover Disulfidize.

    <ResiduePDBInfoHasLabel name="all_disulf" property="DISULFIDIZE" />

#### UnsatSelector

UnsatSelector selecciona todas las aminas o carbonilos de la cadena principal (*pero no ambos*) que no están satisfechos por un enlace de hidrógeno. El formato general del selector es:

```xml
     <Unsat name="(&string)" consider_mainchain_only="(true &bool)" check_acceptors="(true &bool)" hbond_energy_cutoff="(-0.5 &real)" scorefxn="(&string)" legacy="(false &bool)"/>
```
- legacy: el selector usa actualmente los mismos métodos subyacentes que el último filtro de residuos enterrados sin satisfacer. ¿Quieres volver a los métodos antiguos de comprobación de enlaces de hidrógeno?
- consider_mainchain_only: ¿se deben contar solo los enlaces de hidrógeno de la cadena principal (por defecto) o incluir también las cadenas laterales?
- check_acceptors: ¿Debe el selector seleccionar según carbonilos sin satisfacer (por defecto) o aminas?
- hbond_energy_cutoff: el corte que te interesa. El valor por defecto, -0.5, es un umbral muy laxo.
- scorefxn: nombre de la función de puntuación que se usará. Por ahora hay que incluirlo.

Este ejemplo selecciona todos los *residuos* de la estructura que tienen un carbonilo no satisfecho por un enlace de hidrógeno de la cadena principal:

```xml
     <Unsat name="select_unsat_carbonyl" scorefxn="score"/>
```

Este ejemplo selecciona todos los *residuos* de la estructura que tienen una amina de la cadena principal no satisfecha por un enlace de hidrógeno de la cadena principal o de la cadena lateral:

```xml
     <Unsat name="select_unsat_carbonyl" scorefxn="score" check_acceptors="false" consider_mainchain_only="false"/>
```

## Otros
### StoredResidueSubset

Crea un subconjunto de residuos recuperando un subconjunto de residuos que ha sido almacenado en la caché del Pose actual por [[StoreResidueSubsetMover]]. La longitud del Pose debe ser la misma que cuando se almacenó el subconjunto.

    <StoredResidueSubset name="(&string)" subset_name="(&string)" />

-   subset\_name - El nombre con el que se guardará el subconjunto de residuos en los datos cacheables del Pose. Debe ser idéntico al subset\_name usado para recuperar la tarea con la task operation StoredResidueSubset.

####Ejemplo

    <RESIDUE_SELECTORS>
      <!-- Creates a subset consisting of whatever is currently chain B -->
      <Chain name="chainb" chains="B" />

      <!-- Retrieves the residue subset created by the "StoreResidueSubset" mover -->
      <StoredResidueSubset name="get_original_chain_b" subset_name="original_chain_b" />
    </RESIDUE_SELECTORS>
    <MOVERS>
      <!-- stores a subset consisting of whatever is in chain B when this mover is called -->
      <StoreResidueSubset name="store_subset" residue_selector="chainb" subset_name="original_chain_b" />
    </MOVERS>

### NativeSelector
Un ResidueSelector que aplica un residue selector dado al Pose nativo.
Si el Pose nativo es más corto que el Pose de la trayectoria,
se añadirán valores 'false' adicionales al final de la selección para darle el tamaño correcto.
Por el contrario, se eliminan valores del final de la selección
si el Pose nativo es más largo que el Pose de la trayectoria.

```xml
<NativeSelector name="(string)" residue_selector="(string)" />
```

####Ejemplo
Este script imprime la secuencia de los residuos que están definidos como enterrados en el Pose
pasado con la opción `-native`
```xml
<ROSETTASCRIPTS>
  <RESIDUE_SELECTORS>
    <Layer name="core_res" select_core="1" select_boundary="0" select_surface="0" />
    <NativeSelector name="original_core" residue_selector="core_res" />
  </RESIDUE_SELECTORS>

  <SIMPLE_METRICS>
    <SequenceMetric name="seq" residue_selector="original_core" />
  </SIMPLE_METRICS>

  <MOVERS>
    <RunSimpleMetrics name="run_metrics" metrics="seq" prefix="seq_" />
  </MOVERS>

  <PROTOCOLS>	
    <Add mover="run_metrics"/>
  </PROTOCOLS>
</ROSETTASCRIPTS>
```

###ScoreTermValueBased
Puntúa una copia del Pose y selecciona los residuos cuya puntuación está dentro de los límites especificados para un tipo de puntuación elegido. Se podría usar para seleccionar posiciones de residuo con mala puntuación y diseñarlas de modo que la puntuación mejore. Las etiquetas _score_type_, _lower_threshold_ y _upper_threshold_ son obligatorias.

    <ScoreTermValueBased name=(%string) 
                     score_type=(%string) 
                     lower_threshold=(%real) 
                     upper_threshold=(%real)
                     score_fxn=(%string, default from command line)
                     selector=(%string) />

o

    <ScoreTermValueBased name=(%string) 
                     score_type=(%string) 
                     lower_threshold=(%real) 
                     upper_threshold=(%real) 
                     score_fxn=(%string, default from command line)
                     resnums=(%string, ALL)/>

o

    <ScoreTermValueBased name=(%string) 
                     score_type=(%string) 
                     lower_threshold=(%real) 
                     upper_threshold=(%real)
                     score_fxn=(%string, default from command line)>
       <Selector ... />
    </ScoreTermValueBased>

-   score_type - el nombre del [[tipo de puntuación|score-types]] que se usará para la selección. Si se pone _total_, se usará para la operación la suma ponderada de todos los términos de puntuación.
-   lower_threshold - se seleccionarán los residuos con una puntuación mayor o igual que este valor.
-   upper_threshold - se seleccionarán los residuos con una puntuación menor o igual que este valor.
-   score_fxn - la función de puntuación que se usará para evaluar las puntuaciones. Si no se especifica o no está definida, se usará la función de puntuación por defecto de la línea de comandos.
-   resnums - lista separada por comas de números de Pose o PDB que forman un subconjunto de residuos al que restringir la selección. El valor por defecto es _ALL_.
-   selector - el nombre de un selector predefinido que define un subconjunto de residuos al que restringir la selección.


###LogicBased

####Slice
Residue selector que permite recortar la selección de otras selecciones de residuos. También permite índices negativos. 1 es el primer residuo y -1 es el último.

    <Slice name=(%string) selector=(%string,"") from=(%int, 0) to=(%int, 1)
                indices=(%string,"") 
                slice_mode=(%string,"SPARSE") oob_mode=(%string,"ERROR")/>

 - selector - El selector del que recortar.
 - from - Selección por rango: este es el primer residuo del rango que se selecciona.
 - to - Selección por rango: este es el último residuo del rango que se selecciona.
 - indices - Selección por índices: lista de índices separados por comas. No se puede usar junto con from-to
 - slice_mode - ¿Cómo debe representarse el residue selector anterior? SPARSE: se eliminan todos los huecos de la selección anterior. Si se seleccionan los residuos 101 y 200, solo son válidos los índices 1 y 2. CONTIGUOUS - los huecos de la selección anterior se incluyen en los índices. Si se seleccionan los residuos 101 y 200, son válidos todos los índices del 1 al 100.
 - oob_mode - Si un índice está fuera de rango, ¿cómo debe tratarse? ERROR: Salir y mostrar un mensaje de error. WARN: Mostrar un mensaje de error. IGNORE: Ignorar.

Ejemplos:

Seleccionar el residuo 8 de la cadena B:
```xml
<Chain name="chainB" chain="B" />
<Slice name="8B" selector="chainB" indices="8" />
```

Seleccionar todos los residuos entre la 2.ª y la 3.ª CYS:
```xml
<ResidueName name="cys" residue_name3="CYS" />
<Slice name="cys_2_and_3" selector="cys" indices="2,3" slice_mode="SPARSE" />
<Slice name="from_cys2_to_cys3" selector="cys_2_and_3" from="1" to="-1" slice_mode="CONTIGUOUS" />
```




###Véase también

* [[StoreTaskMover]]
* [[StoreCompoundTaskMover]]

##Véase también

* [[RosettaScripts|RosettaScripts]]: Uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: Otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: Guía para realizar perturbaciones estructurales concretas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: Otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta

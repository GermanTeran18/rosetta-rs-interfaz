# OperateOnCertainResidues
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## Operación OperateOnCertainResidues

**Esta TaskOperation está obsoleta. Usa en su lugar [[ResidueSelectors]] y [[OperateOnResidueSubset|OperateOnResidueSubsetOperation]].**

Permite especificar [[Residue Level TaskOperations]] según las propiedades de los residuos especificadas con [ResFilters](#ResFilters) .

Ejemplo:

    <OperateOnCertainResidues name="PROTEINnopack">
      <ResidueHasProperty property="PROTEIN"/> //Only one ResFilter per OperateOnCertainResidues block. The ResFilter comes first
      <PreventRepackingRLT/>  //Only one Residue level task operation per OperateOnCertainResidues block. The RLTO comes second
    </OperateOnCertainResidues>

[[include:Residue-Level-TaskOperations]]
<!--Why does this work in preview but not on the actual page?!?!?! -->
ResFilters
----------

Úsalos como subtag de la TaskOperation especial OperateOnCertainResidues. Solo se puede usar uno por cada OperateOnCertainResidues; sin embargo, se puede usar un filtro compuesto (Any/All/None) para combinar varios filtros en una sola operación.

### CompoundFilters

AnyResFilter, AllResFilter y NoResFilter combinan los resultados de los subfiltros especificados con la operación booleana indicada. Se puede declarar cualquier número de subfiltros.

p. ej.

      <AnyResFilter>
        <ChainIs chain="A"/>
        <ChainIs chain="B"/>
      </AnyResFilter>

Como las TaskOperations producen máscaras de restricción y, por tanto, solo impiden que los objetivos se reempaqueten o diseñen, la manera más eficaz de especificar un conjunto de residuos para diseño o reempaquetado es usar una TaskOperation de doble negación:

     <OperateOnCertainResidues name="aromatic_apolar">
       <NoResFilter>
         <ResidueType aromatic="1" apolar="1"/>
       </NoResFilter>
       <PreventRepackingRLT/>
     </OperateOnCertainResidues>

Restringe el reempaquetado a los residuos aromáticos y apolares.

### ResidueType

Un filtro de conveniencia que selecciona residuos por tipo.

     <ResidueType aromatic="(0 &bool)" apolar="(0 &bool)" polar="(0 &bool)" charged="(0 &bool)"/>

### ResidueHasProperty

### ResidueLacksProperty

Selecciona o excluye residuos según la propiedad de residuo indicada.

-   property: Propiedad del residuo, tal como se especifica en el resfile del residuo (p. ej., DNA, PROTEIN, POLAR, CHARGED). Solo una.

<!-- -->

     e.g. <ResidueHasProperty property=POLAR/>

### ChainIs

### ChainIsnt

Conjunto de residuos según la letra de su cadena en el PDB original.

-   chain: por defecto "A"

<!-- -->

     e.g. <ChainIs chain=A/>

### ResidueName3Is

### ResidueName3Isnt

-   name3: Cualquier número de especificadores de tipo de residuo, separados por comas.

<!-- -->

     e.g. <ResidueName3Is name3=ARG,LYS,GUA/>

### ResidueIndexIs

### ResidueIndexIsnt

-   indices: lista, separada por comas, de índices de residuo de Rosetta (de 1 a nres)

<!-- -->

     e.g. <ResidueIndexIs indices=1,2,3,4,33/>

### ResiduePDBIndexIs

### ResiduePDBIndexIsnt

-   indices: lista, separada por comas, de identificadores cadena.posición, p. ej. indices=

<!-- -->

     e.g. <ResiduePDBIndexIs indices=A.2,C.100,D.-10/>


##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

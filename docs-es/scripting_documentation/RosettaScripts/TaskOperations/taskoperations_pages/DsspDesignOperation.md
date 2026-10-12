# DsspDesign
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## DsspDesign
    
Diseña residuos con aminoácidos seleccionados según la estructura secundaria local. La estructura secundaria de cada residuo se determina con DSSP (o se lee de un archivo blueprint).

Toda la funcionalidad de aquí está incluida en la TaskOperation LayerDesign, que es mucho más potente. Sin embargo, este filtro tiene una sobrecarga mucho menor porque evita los lentos cálculos de SASA.

    <DsspDesign name="(&string)" blueprint="(&string)">
        <SecStructType aa="(&string)" append(&string) exclude="(&string)"/>
    </DsspDesign>
- blueprint: un archivo blueprint que especifica la estructura secundaria en cada posición.

A continuación se indican los tipos de estructura secundaria válidos y el conjunto predeterminado de tipos de residuo permitidos.
- Helix: ADEFIKLNQRSTVWY
- Strand: DEFHIKLNQRSTVWY
- Loop: ACDEFGHIKLMNPQRSTVWY
- HelixStart: ADEFHIKLNPQRSTVWY
- HelixCapping: DNST
- Nterm: ACDEFGHIKLMNPQRSTVWY
- Cterm: ACDEFGHIKLMNPQRSTVWY

El conjunto de residuos permitidos para cada tipo de estructura secundaria se puede personalizar.
- aa: define el conjunto de residuos permitidos para el tipo de estructura secundaria definido; la cadena se compone de códigos de aminoácidos de una letra.
- append: añade los residuos siguientes al conjunto de residuos permitidos para el tipo de estructura secundaria definido.
- exclude: lo contrario de append.

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

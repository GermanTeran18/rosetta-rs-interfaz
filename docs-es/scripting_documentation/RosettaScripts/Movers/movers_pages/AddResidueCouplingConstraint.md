# AddResidueCouplingConstraint
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AddResidueCouplingConstraint

```xml
<AddResidueCouplingConstraint name="(&string)" tensorfile ="(&string)" indexfile="(&string)" strength="(1 &Real)" alphabet="(ARNDCQEGHILKMFPSTWYV- &string)"/>
```
* **tensorfile**: ubicación del tensor que almacena los datos de coevolución.
* **indexfile**: ubicación del archivo de índice que define el formato del tensor.
* **strength**: define la intensidad de las restricciones de coevolución (valor predeterminado=1).
* **alphabet**: define el alfabeto usado para crear el tensor de coevolución (valor predeterminado=orden de Gremlin).

## Descripción

Este mover está pensado para aprovechar la información coevolutiva en el diseño de proteínas, favoreciendo secuencias que recapitulan las mutaciones correlacionadas observadas en la naturaleza. La información coevolutiva se obtiene de un alineamiento múltiple de secuencias homólogas que se analiza con un método de información mutua o de acoplamiento directo, p. ej., Gremlin.

En resumen, el mover toma como entrada una matriz de correlación y la añade como un nuevo término de la función de puntuación.

Las matrices se introducen como un tensor de forma [N, A, N, A], donde N es la longitud de la proteína y A es la longitud del alfabeto (normalmente 21 aminoácidos + 1 para los huecos). El usuario puede definir el orden del alfabeto. Para acceder a la medida de coevolución entre, p. ej., el residuo 1 (ALA) y el residuo 2 (ARG), la consulta en el tensor sería "[1, 0, 2, 1]" (con el orden de alfabeto de GREMLIN). La intensidad de coevolución se multiplica por un factor de intensidad definido por el usuario (valor predeterminado=1) y luego se añade como un nuevo término a la función de puntuación.

Para más información, consulta:
> Rosetta Design with Co-Evolutionary Information Retains Protein Function   
> S. Schmitz, M. Ertelt, R. Merkl, J. Meiler (Plos comp. biol. 2021)

## Generación del tensor
El mover se diseñó para tomar como entrada tensores de coevolución de Gremlin; sin embargo, si el tensor tiene el formato de tensor de Rosetta correcto, el método elegido no debería importar.

En `tools/GREMLIN/Gremlin2RosettaTensor.py` hay un script de Python que genera un tensor a partir de un alineamiento múltiple de secuencias (MSA) con Gremlin y luego lo convierte a un formato que Rosetta pueda leer. El script toma como entrada una MSA y el nombre deseado de los archivos de salida, y genera `tensor.bin`, `indexFile.index` y `tensor.json`. 

## Advertencias
El formato de tensor de Rosetta espera que el archivo `tensor.json` esté en el mismo directorio que el archivo `tensor.bin`.

## Ejemplo de uso
Ejemplo de XML para diseño de proteínas:

```xml
<ROSETTASCRIPTS>
    <SCOREFXNS>
        <ScoreFunction name="scorefxn_cst" weights="ref2015.wts">
                <Reweight scoretype="res_type_linking_constraint" weight="1.0"/>
        </ScoreFunction>
        <ScoreFunction name="scorefxn" weights="ref2015.wts"/>
    </SCOREFXNS>
    <TASKOPERATIONS>
        <InitializeFromCommandline name="ifcl"/>
            <ReadResfile name="rrf" filename="./design.resfile"/>
    </TASKOPERATIONS>
    <MOVERS>
        <AddResidueCouplingConstraint name="favor" tensor_file="./tensor.bin" index_file="./indexList" strength="1.0" alphabet="ARNDCQEGHILKMFPSTWYV-"/>
        <PackRotamersMover name="design" scorefxn="scorefxn_cst" task_operations="ifcl,rrf" />
    </MOVERS>
    <FILTERS>
    </FILTERS>
    <APPLY_TO_POSE>
    </APPLY_TO_POSE>
    <PROTOCOLS>
        <Add mover="favor" />
        <Add mover="design" />
    </PROTOCOLS>
    <OUTPUT scorefxn="scorefxn" />
</ROSETTASCRIPTS>
```

##Véase también

* [[FavorSequenceProfileMover]]
* [[FavorSymmetricSequenceMover]]
* [[ResidueTypeConstraintMover]]
* [[I want to do x]]: guía para elegir un mover
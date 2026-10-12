# ComputeLigandRDF
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ComputeLigandRDF

```xml
<ComputeLigandRDF name="(string)" ligand_chain="(string)" mode="(string)">
    <(string)/>
</ComputeLigandRDF>
```

ComputeLigandRDF calcula funciones de distribución radial (RDF) usando pares de átomos proteína-proteína o proteína-ligando. La base conceptual y teórica de la implementación de RDF de Rosetta se describe en la [documentación de ADRIANA.Code](http://www.molecular-networks.com/files/docs/adrianacode/adrianacode_manual.pdf) . Se calcula una RDF de 100 bins con un espaciado de bin de 0.1 Å.

Todas las RDF se insertan en el trabajo como un par string,string. La clave es el nombre de la RDF calculada y el valor es una lista de números decimales separados por espacios.

La etiqueta exterior requiere las siguientes opciones:

-   ligand\_chain: el ID PDB de la cadena del ligando que se usará para calcular la RDF.
-   mode: el tipo de RDF que se calcula. Las opciones válidas son "interface", en la que la RDF se calcula con todos los átomos del ligando y todos los átomos de la proteína a menos de 10 Å del ligando, y "pocket", en la que la RDF se calcula con todos los átomos de la proteína a menos de 10 Å del ligando.

El mover ComptueLigandRDF requiere que se especifiquen una o más RDF como subetiquetas RDF. A continuación se describen las RDF existentes actualmente:

### RDFEtableFunction

RDFEtableFunction calcula 3 RDF usando las Etables analíticas que se utilizan para calcular las funciones de energía fa\_atr, fa\_rep y fa\_solv.

RDFEtableFunction requiere que se especifique una función de puntuación con la opción scorefxn en su subetiqueta.

### RDFElecFunction

RDFElecFunction calcula 1 RDF basada en la función de energía electrostática fa\_elec.

RDFElecFunction requiere que se especifique una función de puntuación con la opción scorefxn en su subetiqueta.

### RDFHbondFunction

RDFHbondFunction calcula 1 RDF basada en la función de energía de puentes de hidrógeno.

### RDFBinaryHbondFunction

RDFBinaryHbondFunction calcula 1 RDF en la que un par de átomos tiene una puntuación de 1 si un átomo es donador y el otro es aceptor, y de 0 en caso contrario, independientemente de si esos átomos participan en una interacción de puente de hidrógeno.

##Véase también

* [[Preparing ligands]]: preparación de ligandos para su uso en Rosetta
* [[Non-protein residues]]: página principal sobre el trabajo con moléculas que no son proteínas en Rosetta
* [[InterfaceScoreCalculatorMover]]
* [[HighResDockerMover]]
* [[GrowLigandMover]]
* [[WriteLigandMolFileMover]]
* [[I want to do x]]: guía para elegir un mover

# StartFrom
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## StartFrom

```xml
<StartFrom name="(&string)" chain="(&string)" use_nbr="(0 &bool)" >
   <Coordinates x="(&float)" y="(&float)" z="(&float)" pdb_tag="('' &string)"/>
   <File filename="(&string)" />
   <PDB filename="(&string)" atom_name="('' &string)" pdb_tag="('' &string)" />
</StartFrom>
```

El mover StartFrom mueve una cadena (normalmente un ligando) a una coordenada especificada. Se usa para colocar el ligando acoplado en una posición distinta de la del PDB de entrada. Si se especifican varias coordenadas, la coordenada inicial se elige al azar. Por defecto, el centroide de la cadena especificada (la posición media de todos los átomos/residuos) se centra en la coordenada dada. Si se activa la opción "use_nbr", entonces es el átomo vecino (el átomo que se superpone durante el reempaquetado de conformeros) el que se coloca en la ubicación dada. Activar use_nbr implica que la cadena dada consta de un único residuo.

Las coordenadas pueden especificarse con una o más subetiquetas. Se pueden especificar simultáneamente varias subetiquetas de distintos tipos: el conjunto de coordenadas posibles es una combinación de las coordenadas de todas las subetiquetas. 

Cada subetiqueta puede recibir opcionalmente un especificador de estructura (pdb_tag, file_name o hash). Si una estructura coincide con un especificador de estructura dado, solo se consideran las coordenadas para ese especificador de estructura. Si una estructura no coincide con ninguno de los especificadores de estructura proporcionados, se usan en su lugar las coordenadas por defecto (las especificadas sin especificador de estructura). 

*Subetiqueta Coordinates*

Cada etiqueta contiene una posición de coordenadas XYZ que se añadirá al conjunto de coordenadas válidas.

*Subetiqueta File*

Proporciona un archivo con formato JSON que contiene las posiciones iniciales. Es útil si estás acoplando ligandos a un gran número de estructuras de proteína. <!--- BEGIN_INTERNAL --> The application generate\_ligand\_start\_position\_file will generate these JSON files.<!--- END_INTERNAL --> El archivo tiene el formato:

        [
            {
                "file_name" : "infile.pdb",
                "x" : 0.0020,
                "y" : -0.004,
                "z" : 0.0020,
                "hash" : 14518543732039167129
            }
        ]

Tanto "file_name" como "hash" son opcionales. Si ambos están presentes, se ignora la entrada "file_name".

"hash" es una representación hash de la estructura sin ligando. Por ahora, el hash de floats de Boost depende muchísimo de la compilación y de la plataforma. No debes considerar que estos valores hash sean portables en absoluto. Esto se abordará en el futuro.

*Subetiqueta PDB*

Las coordenadas iniciales se dan como las posiciones de los átomos pesados de un archivo PDB. Por defecto se usan las posiciones de todos los átomos pesados. Si se da atom_name, solo se usan las posiciones de los átomos que coincidan con ese nombre de átomo. Ten en cuenta que se omite el mecanismo estándar de carga de PDB de Rosetta, por lo que no necesitas archivos params, etc., para todos los residuos/átomos del archivo proporcionado. (Aunque todas las combinaciones de número de residuo/nombre de átomo deben ser únicas.)

Una forma sencilla de generar este archivo es gráficamente. Si cargas tu estructura inicial en PyMol junto con un PDB que contenga aguas (que podría ser la misma estructura), puedes usar los modos de ratón «3-Button Editing» o «2-Button Editing». Mientras mantienes pulsada la tecla Ctrl (command en Mac), puedes hacer clic izquierdo/arrastrar para mover oxígenos de agua individuales a las posiciones iniciales que te interesen. Vuelve al modo Viewing, selecciona los átomos individuales que moviste y luego Archivo->Guardar molécula y guarda esa selección (solo las moléculas de agua individuales) como un nuevo archivo PDB. -- Otros programas de visualización de estructuras probablemente tengan capacidades similares. Consulta el manual para más detalles. 

Nota: el PDB solo debe contener los átomos que describen los puntos de partida. *No* debe contener ningún residuo de contexto (p. ej., ninguno de los residuos de la proteína receptora, ni átomos del ligando que no definan el centro putativo del bolsillo de unión).


##Véase también

* [[I want to do x]]: guía para elegir un mover
* [[AddChainMover]]
* [[AddChainBreakMover]]
* [[AlignChainMover]]
* [[BridgeChainsMover]]
* [[SwitchChainOrderMover]]

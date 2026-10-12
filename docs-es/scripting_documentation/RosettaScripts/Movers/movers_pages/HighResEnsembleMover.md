# HighResEnsemble
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## HighResEnsemble

```xml
<HighResEnsemble name="&string" chains="&string" cycles="(&int)" repack_every_Nth="(&int)" scorefxn="&string" movemap_builder="&&string" final_score="&string" final_move="&string" rosetta="&bool" />
```

HighResEnsemble es la extensión de HighResDocker diseñada para el docking de conjuntos (ensembles) de ligandos. chains identifica las cadenas de ligando incluidas en el conjunto. Realiza ciclos de pruebas de rotámeros/reempaquetado junto con pequeñas perturbaciones del ligando. El número de ciclos se describe con cycles y repack_every_Nth. También sustituye a los movers FinalMinimizer e InterfaceScoreCalculator que se usan en el docking de un solo ligando. Esto permite que HighResEnsemble genere modelos individuales para cada combinación proteína-ligando. 

scorefxn y final_score identifican la función de puntuación que se usa para la etapa de docking y para la etapa de minimización por gradiente, respectivamente. movemap_builder y final_move describen qué residuos tendrán flexibilidad de la cadena lateral y/o de la cadena principal durante cada etapa. rosetta es una opción que se usa con fines de benchmark y no debe cambiarse del valor predeterminado false. 

HighResEnsemble requiere que se definan áreas de ligando para cada ligando del conjunto. Estas áreas de ligando deben incluirse en los constructores de interfaz y en los constructores de movemap adecuados. 

Puedes encontrar más detalles sobre LIGAND_AREAS, INTERFACE_BUILDERS y MOVEMAP_BUILDERS usados junto con HighResEnsemble en RosettaLigand docking with flexible XML protocols, Gordon Lemmon y Jens Meiler (http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3749076/pdf/nihms499730.pdf).

##Véase también

* [[HighResMover]]
* [[DockingMover]]
* [[DockingProtocolMover]]
* [[DockWithHotspotMover]]
* [[FlexPepDockMover]]
* [[Docking applications]]: aplicaciones de línea de comandos para docking
* [[I want to do x]]: elegir un mover

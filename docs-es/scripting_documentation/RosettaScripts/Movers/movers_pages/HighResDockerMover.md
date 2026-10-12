# HighResDocker
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## HighResDocker

```xml
<HighResDocker name="&string" repack_every_Nth="(&int)" scorefxn="string" movemap_builder="&string" />
```

El docker de alta resolución realiza ciclos de pruebas de rotámeros o de reempaquetado, junto con pequeñas perturbaciones del/de los ligando(s). "movemap\_builder" describe qué grados de libertad de la cadena lateral y de la cadena principal existen. El mover de Monte Carlo se usa para decidir si se acepta el resultado de cada ciclo. La flexibilidad del ligando y de la cadena principal, así como los ligandos que se acoplan, se describen mediante LIGAND\_AREAS proporcionadas a INTERFACE\_BUILDERS, que se usan para construir el movemap según la opción de XML.

El artículo sobre HighResDocker (RosettaLigand docking with flexible XML protocols, Gordon Lemmon y Jens Meiler) ofrece una explicación relativamente buena de cómo usar HighResDocker con LIGAND_AREAS, INTERFACE_BUILDERS y MOVEMAP_BUILDERS. El artículo puede encontrarse [aquí](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3749076/pdf/nihms499730.pdf).

##Véase también

* [[DockingMover]]
* [[DockingProtocolMover]]
* [[DockWithHotspotMover]]
* [[FlexPepDockMover]]
* [[Docking applications]]: aplicaciones de línea de comandos para docking
* [[I want to do x]]: elegir un mover

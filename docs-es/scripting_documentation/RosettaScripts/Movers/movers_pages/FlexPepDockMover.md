# FlexPepDock
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FlexPepDock

Protocolo de docking flexible de péptidos. Esta etiqueta engloba 2 protocolos estrechamente relacionados:

-   El **protocolo de refinamiento** está pensado para los casos en que se dispone de un modelo aproximado y de grano grueso de la interacción, como se describe en Raveh, London et al., Proteins 2010. El protocolo optimiza de forma iterativa la cadena principal del péptido y su orientación de cuerpo rígido respecto de la proteína receptora, además de optimizar las cadenas laterales sobre la marcha. La opción pep\_refine invoca el protocolo de refinamiento.
-   El **protocolo ab initio** amplía considerablemente el protocolo de refinamiento y está pensado para los casos en que no se dispone de información sobre la conformación de la cadena principal del péptido, como se describe en Raveh et al., PLoS ONE Rosetta Special Collection, 2011. FlexPepDock ab initio pliega y acopla simultáneamente el péptido sobre la superficie del receptor, partiendo de cualquier conformación arbitraria de la cadena principal (p. ej., extendida). Se supone que el péptido está inicialmente situado cerca del sitio de unión correcto, pero el protocolo es robusto frente a la orientación inicial exacta. El protocolo se invoca con la opción lowres\_abinitio, normalmente combinada con la opción pep\_refine, para refinar el modelo grueso resultante. Se recomienda también proporcionar al protocolo archivos de fragmentos de 3 residuos, de 5 residuos (y de 9 residuos para péptidos de longitud 9 o más).

**Opciones básicas:**

-   min\_only (booleano) - aplica solo un paso de minimización
-   pep\_refine (booleano) - invoca el protocolo de refinamiento
-   lowres\_abinitio (booleano) - invoca el protocolo ab initio
-   peptide\_chain (cadena de texto) - especifica manualmente la cadena del péptido (por defecto es la 2.ª cadena)
-   receptor\_chain (cadena de texto) - especifica manualmente la cadena del receptor (proteína). (por defecto es la 1.ª cadena)
-   ppk\_only (booleano) - solo preempaquetado
-   scorefxn (cadena de texto) - la función de puntuación que se usará
-   extra\_scoring (booleano) - modo de solo puntuación

Ten en cuenta que en una etiqueta solo puede existir una de estas 5: extra\_scoring, ppk\_only, pep\_refine, lowres\_abinitio, min\_only.

    <FlexPepDock name="(&string)" min_only="(&boolean)" pep_refine="(&boolean)"
     lowres_abinitio="(&boolean)" peptide_chain="(&string)" receptor_chain="(&string)" 
    ppk_only="(&boolean)" scorefxn="(&string)" extra_scoring="(&boolean)"/>


##Véase también

* [[DockingMover]]
* [[DockingProtocolMover]]
* [[DockWithHotspotMover]]
* [[HighResDockerMover]]
* [[Flex Pep Dock]]: la aplicación de línea de comandos FlexPepDock
* [[I want to do x]]: elegir un mover
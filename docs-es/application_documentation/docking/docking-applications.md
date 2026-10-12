#Lista de aplicaciones de docking


###Docking de anticuerpos
- [[Docking de anticuerpos de camélidos|antibody-mode-camelid]]: Acopla anticuerpos de camélidos a sus antígenos.
- [[SnugDock | snugdock]]: Optimización de la estructura del paratopo durante el docking anticuerpo-antígeno

##NOTA: Ya no se recomienda usar aplicaciones de línea de comandos para el docking de ligandos. Usa [[RosettaScripts]] en su lugar. Consulta [[HighResDockerMover]] como ejemplo.

###Docking de ligandos
- [[Docking de ligandos|ligand-dock]] (RosettaLigand): Determina la estructura de complejos entre proteínas y moléculas pequeñas.  
   * [[Extract atomtree diffs]]: Extrae estructuras del formato de archivo AtomTreeDiff.

- [[Docking mediante trazado de rayos|DARC]] (DARC): Método de docking dirigido específicamente a sitios de interacción de proteínas.
 
###Docking de péptidos
- [[Docking flexible de péptidos|flex-pep-dock]]: Acopla un péptido flexible a una proteína.

###Docking proteína-proteína
- [[Docking proteína-proteína|docking-protocol]] (RosettaDock): Determina las estructuras de complejos proteína-proteína mediante perturbaciones de cuerpo rígido.  
    * [[Protocolo de prepack para docking|Docking prepack protocol]]: Prepara estructuras para el docking proteína-proteína.  
    * [[Motif Dock Score]]: Docking proteína-proteína eficiente de baja resolución.

- [[Docking simétrico|sym-dock]]: Determina la estructura de homooligómeros simétricos.  

- [[Docking de conjugados químicos|ubq-conjugated]]: Determina las estructuras de proteínas conjugadas con ubiquitina.  

##Véase también

* [[FunHunt|http://funhunt.furmanlab.cs.huji.ac.il/]], abreviatura de funnel hunt (búsqueda de embudos), intenta distinguir las orientaciones correctas de complejos proteína-proteína de las orientaciones decoy.
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Rosetta Servers]]: Interfaces web para ejecutar algunas aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[RosettaScripts]]: Página principal de la interfaz RosettaScripts de Rosetta
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comandos de ejemplo para ejecutar archivos ejecutables de Rosetta
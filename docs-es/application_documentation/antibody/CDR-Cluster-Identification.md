#Identificación de clústeres de CDR

Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com)

Investigador principal: Roland Dunbrack

# Descripción general

Esta aplicación asigna cada CDR de un anticuerpo a clústeres de CDR de North/Dunbrack según la menor distancia de diedros a cada miembro «central» del clúster.  Las identificaciones, con sus distancias, se repiten en el archivo PDB de salida y se imprimen en pantalla. 

# Referencias

Adolf-Bryfogle J,  Xu Q,  North B, Lehmann A,  Roland L. Dunbrack Jr, [PyIgClassify: a database of antibody CDR structural classifications](https://doi.org/10.1093/nar/gku1106) , Nucleic Acids Research 2014

North B, Lehmann A, Dunbrack R, [A new clustering of antibody CDR loop conformations](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3065967/pdf/nihms-249534.pdf) (2011). JMB 406(2): 228-256.

Marco de trabajo RosettaAntibody.
# Configuración

Los anticuerpos deben estar numerados con cualquier esquema de numeración que acepte Rosetta. Estos incluyen: 

 * <code> Chothia_Scheme </code>
 * <code> Enhanced_Chothia_Scheme </code>
 * <code> AHO_Scheme </code>
 * <code> IMGT_Scheme </code>

Kabat_Scheme también se acepta, pero no es totalmente compatible por las convenciones de numeración de H1.  Usa Kabat_Scheme con precaución.

Los anticuerpos se pueden renumerar al esquema AHO_Scheme mediante [PyIgClassify](http://dunbrack2.fccc.edu/PyIgClassify/)

# Cómo ejecutar la aplicación
Aplicación: identify_cdr_clusters

## Opciones:
Se siguen las opciones habituales de entrada/salida de Rosetta. Se admite MPI; pasa la opción <code>-l</code> para indicar una lista de PDB.  Usa <code>-no_output</code> para que no se repitan los archivos pdb en la salida.  Asegúrate de pasar <code>-numbering_scheme</code> con el esquema de numeración de tu anticuerpo si no está renumerado en Chothia.

## Ejemplo de línea de comandos:
_identify_cdr_clusters.macosclangrelease -numbering_scheme AHO_Scheme -ignore_unrecognized_res -no_output -s 2J88.pdb_

##Véase también

* [[General Antibody Options and Tips]]
* [[Antibody Applications]]: página principal de las aplicaciones de anticuerpos
    * [[Antibody protocol]]: la aplicación principal de modelado de anticuerpos
    * [[Antibody Python script]]: script de configuración de esta aplicación
    * [[Injerto de loops de CDR|antibody-assemble-cdrs]]: injerta plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo de anticuerpo aproximado.  
    * [[Modelado del CDR H3|antibody-model-CDR-H3]]: determina estructuras de anticuerpos combinando el docking VL-VH y el modelado del loop H3.
    - [[Docking de anticuerpos de camélidos|antibody-mode-camelid]]: hace el docking de anticuerpos de camélidos con sus antígenos.
    - [[SnugDock | snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
    * [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar o comparar estrategias de diseño de anticuerpos.
     * [[CDR Cluster Constrained Relax]]: una aplicación para relajar CDR usando restricciones armónicas circulares basadas en los clústeres de CDR identificados.
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Options overview]]: descripción general de las opciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta


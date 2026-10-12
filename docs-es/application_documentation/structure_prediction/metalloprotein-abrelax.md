#Documentación de metaloproteína ab initio / relax

Metadatos
========

Autor: Chu Wang; transcrito por Steven Lewis (smlewi@gmail.com)

La transcripción a la carpeta de documentación la realizó Steven Lewis el 18/6/12. Se sabe que esta documentación aún no está «a la altura de las especificaciones».

Los protocolos de la aplicación metalloprotein abrelax se basan en los protocolos estándar de plegamiento de proteínas y de modelado de loops (consulta la documentación de la aplicación [[abinitio-relax]]) con archivos de restricciones adicionales.

Además de los archivos de entrada necesarios para [[abinitio relax]], se necesitan los siguientes archivos de entrada para ejecutar esta aplicación:

1.  [[fasta file]] – Este archivo contiene la secuencia de la proteína que se va a modelar. La secuencia que necesita esta aplicación debe estar más anotada que la estándar, con [CYZ] o [HIS] para marcar los residuos que quelan el zinc, y Z[ZN] al final para el residuo extra de «zinc».

2.  residue\_pair\_jump\_cst – explicación después de \#\#

    ```
    BEGIN  ## starting marker
    jump_def: 3 60 59 59
    ## a rigid-body jump from the residue 3(first zinc-chelating residue) to 60(zinc) with a cut point starting at 59 and ending at 59 (last protein residue) This is to define how the fold tree is generated.
    aa: CYS ZN
    ## the residues on both sides of the jump
    cst_atoms: SG CB CA ZN V1 V2
    ## how distance, angular and dihedral parameters are defined
    jump_atoms: C CA N ZN V1 V2
    ## how the jump is defined between in the atom tree
    disAB: 2.20
    angleA: 68.0
    angleB: 70.5
    dihedralA: -150.0 -120.0 -90.0 -60.0 -30.0 0.0 30.0 60.0 90.0 120.0 150.0 180.0
    dihedralAB: -150.0 -120.0 -90.0 -60.0 -30.0 0.0 30.0 60.0 90.0 120.0 150.0 180.0
    dihedralB: 120.0
    ## all the degrees of freedom as defined in Figure 1 and Table 1 to generate various jump transformations between CYS and ZN
    END ## ending marker
    ```

    cada bloque como el de arriba puede definir un sitio de unión de zinc y, si tienes más de un zinc, añade más bloques como este.

3.  Archivos cen\_cst o fa\_cst: estos archivos se usan para definir restricciones que mantengan óptima la geometría de quelación entre el zinc y los otros tres residuos quelantes. Los archivos están en el formato estándar de restricciones de distancia y angulares de Rosetta (consulta la documentación de [[constraint file]]).


Para ver ejemplos de archivos de entrada de metalloprotein-abrelax, consulta la entrada de la prueba de integración. Las [[Integration tests]] de la aplicación `metalloprotein_abrelax` están en el siguiente directorio:

`main/test/integration/tests/metalloprotein_abrelax/`

Todos los archivos de entrada necesarios para estas pruebas de integración se encuentran en:

`main/test/integration/tests/metalloprotein_abrelax/input/`

##Véase también

* [[Metals]]: Más información sobre cómo trabajar con metales en Rosetta
* [[Constraint file]]: Formato de archivo de restricciones
* [[Fasta file]]: Formato de archivo Fasta
* [[Fragment file]]: Formato de archivo de fragmentos (necesario para la predicción de estructura ab initio)
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura
  * [[Abinitio-relax]]: Aplicación para predecir estructuras de proteínas usando solo información de secuencia
    * [[Further details on the abinitio-relax application|abinitio]]
  * [[Membrane abinitio]]: Ab initio para proteínas de membrana.  
  - [[Comparative modeling|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado (usa la aplicación minirosetta).
    * [[Minirosetta]]: Más información sobre la aplicación minirosetta.
  * [[Metalloprotein ab initio|metalloprotein-abrelax]]: Modelado ab initio de metaloproteínas.  
  - [[Backrub]]: Crea conjuntos de cadenas principales mediante cambios pequeños y locales en la cadena principal.  
  - [[Floppy tail]]: Predice estructuras de regiones largas y flexibles en el extremo N o C.
  - [[Fold-and-dock]]: Predice estructuras tridimensionales de homooligómeros simétricos.  
  - [[Molecular replacement protocols|mr-protocols]]: Usa Rosetta para construir modelos para el reemplazo molecular en cristalografía de rayos X.  
    * [[Prepare template for MR]]: Script de preparación para los protocolos de reemplazo molecular.  
  - [[Relax]]: Optimiza «localmente» las estructuras, incluida la asignación de posiciones de las cadenas laterales.
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta

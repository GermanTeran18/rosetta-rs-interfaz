#RosettaAntibody3: modelado del CDR H3 y optimización simultánea de VL-VH

Metadatos
========

Autores: 
Jianqing Xu (xubest@gmail.com), Daisuke Kuroda (dkuroda1981@gmail.com), Oana Lungu (olungu@utexas.edu), Jeffrey Gray (jgray@jhu.edu)

Última edición: 25/4/2013. Investigador principal correspondiente: Jeffrey Gray (jgray@jhu.edu).

Código para leer restricciones
============================

-   Código fuente de la aplicación:

    ```
    rosetta/rosetta_source/src/apps/pilot/jianqing/antibody_model_CDR_H3.cc
    ```

-   Código fuente del mover principal:

    ```
    rosetta/rosetta_source/src/protocols/antibody2/AntibodyModelerProtocol.cc.cc
    ```

-   Para ver demostraciones de algunos casos de uso distintos, consulta las pruebas de integración ubicadas en

    ```
    rosetta/rosetta_tests/integration/antibody_protocol_* (antibody_protocol_using_KIC_loop_mover, antibody_protocol_using_CCD_loop_mover).
    ```

Para ejecutar Rosetta3Antibody, escribe lo siguiente en una línea de comandos:

```
[path to executable]/antibody_model_CDR_H3.[platform|linux/mac][compile|gcc/ixx]release –database [path to database] @options
```

Nota: estas demostraciones solo generarán un decoy. Para generar un gran número de decoys, tendrás que añadir –nstruct N (donde N es el número de decoys que se van a construir) a la lista de opciones.

Referencias
==========

Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaDock:

- B. D. Weitnzer\*, J. R. Jeliazkov\*, S. Lyskov\*, N. Marze, D. Kuroda, R. Frick, J. Adolf-Bryfogle, N. Biswas, R. L. Dubrack Jr, & J. J. Gray, "Modeling and docking of antibody structures with Rosetta," Nature Protocols 12, 401–216 (2017)
 
-   J. Xu, D. Kuroda & J. J. Gray, “RosettaAntibody3: Object-Oriented Designed Protocol and Improved Antibody Homology Modeling.” (2013) in preparation
-   A. Sivasubramanian,\* A. Sircar,\* S. Chaudhury & J. J. Gray, "Toward high-resolution homology modeling of antibody Fv regions and application to antibody-antigen docking," Proteins 74(2), 497-514 (2009)

Propósito de la aplicación
===========================================

Determinar la estructura de modelos de anticuerpos por homología combinando el docking VL-VH (con el protocolo de docking) y el modelado del loop H3 (protocolo de modelado de loops).

Entrada
=====

1.  estructura inicial, obligatoria (p. ej., input.pdb)
     * a). El archivo del anticuerpo de entrada debe tener numeración Chothia.
     * b). Puede ser una estructura cristalográfica
     * c). o un modelo por homología (consulta el flujo de trabajo y el protocolo de injerto)

Opciones
=====

Línea de comandos de ejemplo (a 17 de mayo de 2020): `antibody_H3.macosclangrelease @flags`.

flags:
```
# input grafted model
-s grafting/model-0.relaxed.pdb

# recommended number of structs
-nstruct 1000 

# constraints are enabled by default, so flags are shown just to indicate that they can be turned off
# recommended as kink is present in 90% of Abs and as VH-VL Q-Q is present in 808%
-antibody:h3_loop_csts_lr true
-antibody:h3_loop_csts_hr true
-antibody:auto_generate_h3_kink_constraint true
-antibody:constrain_vlvh_qq true
-constraints:cst_weight 1.0

# standard settings, for packages used by antibody_H3
-ex1
-ex2
-extrachi_cutoff 0

# necessary if running multiple procs w/o MPI
-multiple_processes_writing_to_one_directory 

# specify output file
-out:file:scorefile H3_modeling_scores.fasc 

# specify output folder
-out:path:pdb H3_modeling 
```

**Descripción detallada de las opciones (puede que no estén todas incluidas arriba):**

```
-antibody::snugfit
```

-   Descripción:
     * Optimiza la orientación VL-VH mediante docking L-H

-   opciones:
     * true (por defecto) o false

```
-antibody:h3_loop_csts_lr true
-antibody:h3_loop_csts_hr true
-antibody:auto_generate_h3_kink_constraint true
-antibody:constrain_vlvh_qq true
```

-   Ten en cuenta que todas estas opciones son true por defecto, ya que implementan restricciones hacia motivos conocidos de anticuerpos. El kink se observa en ~90 % de los loops CDR H3 de anticuerpos y el enlace de hidrógeno Q-Q de VL-VH se observa en ~80 % de las estructuras.
-   Descripción:
     * a). "-antibody:h3\_loop\_csts\_lr" activa las restricciones en la etapa de baja resolución. Pueden ser restricciones especificadas manualmente o generadas automáticamente.
     * b). "-antibody:h3\_loop\_csts\_hr" activa las restricciones en la etapa de **alta** resolución. Pueden ser restricciones especificadas manualmente o generadas automáticamente.
     * c). "-antibody:auto\_generate\_h3\_kink\_constraint" configura los pesos y las restricciones correctos para emular el kink observado en el 90\% de todos los anticuerpos (consulta el artículo de Weitzner y Gray, J. Immunol. 2016).
     * d). “-antibody:constrain\_vlvh\_qq” el/los enlace(s) de hidrógeno Q--Q entre VH y VL que ocurre(n) en \~0\% de todos los anticuerpos.
     * e). "-constraints:cst_file ./constraint_file" especifica restricciones. Antes, las restricciones del enlace Q-Q se especificaban manualmente así (por ejemplo):
     ```
     AtomPair CD 38L CD 39H LINEAR\_PENALTY 4.1 0 0.4 400
     ```

-   Opciones:
     * true o false
     * ubicación del archivo de restricciones

**Descripción adicional del archivo de restricciones:**

AtomPair CD 38L CD 39H LINEAR\_PENALTY 4.1 0 0.4 400 
     1. Para restringir dos GLN, una en la cadena L y la otra en la cadena H, que forman un enlace de hidrógeno en la interfaz L-H 
     2. “CD” es el carbono de la GLN unido al nitrógeno y al oxígeno
     3. 38L significa la posición 38 de la cadena L, y 39H significa la posición 39 de la cadena H. Son las GLN que forman el enlace de hidrógeno.
     4. potencial LINEAR\_PENALTY; consulta los detalles en el archivo de restricciones
     5. distance\_constraint=4.1, well\_depth=0, width=0.4, slope=400; consulta los detalles en el archivo de restricciones.

Salida del FoldTree
===============

Una estructura de anticuerpo en PDB con el loop H3 modelado y la orientación VL-VH optimizada.

Novedades desde la última versión
=============================

Esta es la primera versión pública en Rosetta3

-   Admite el distribuidor de trabajos moderno (jd2).
-   Compatibilidad con [[restricciones|constraint-file]] .

##Véase también

* [[General Antibody Options and Tips]]
* [[Antibody Applications]]: página principal de las aplicaciones de anticuerpos
    * [[Antibody protocol]]: la aplicación principal de modelado de anticuerpos
    * [[Antibody Python script]]: script de configuración de esta aplicación
    * [[Injerto de loops de CDR|antibody-assemble-cdrs]]: injerta plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo de anticuerpo aproximado.  
    - [[Docking de anticuerpos de camélidos|antibody-mode-camelid]]: hace el docking de anticuerpos de camélidos con sus antígenos.
    - [[SnugDock | snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
    * [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar o comparar estrategias de diseño de anticuerpos.

    * [[CDR Cluster Identification]]: una aplicación que asigna cada CDR de un anticuerpo a clústeres de CDR de North/Dunbrack según la menor distancia de diedros al centro de cada clúster.

     * [[CDR Cluster Constrained Relax]]: una aplicación para relajar CDR usando restricciones armónicas circulares basadas en los clústeres de CDR identificados.
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
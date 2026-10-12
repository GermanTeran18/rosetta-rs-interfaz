#RosettaAntibody3: b). Injerto de loops de CDR en el marco del anticuerpo

Metadatos
========

Autores: 
Jianqing Xu (xubest@gmail.com), Daisuke Kuroda (dkuroda1981@gmail.com), Oana Lungu (olungu@utexas.edu), Jeffrey Gray (jgray@jhu.edu)

Última edición: 25/4/2013. Investigador principal correspondiente: Jeffrey Gray (jgray@jhu.edu).

Código para leer restricciones
============================

-   Código fuente de la aplicación:

    ```
    rosetta/main/source/src/apps/public/antibody/antibody_graft.cc
    ```

-   Código fuente del mover principal:

    ```
    rosetta/main/source/src/protocols/antibody/GraftCDRLoopsProtocol.cc
    ```

-   Para ver demostraciones de algunos casos de uso distintos, consulta las pruebas de integración ubicadas en

    ```
    rosetta/tests/integrationi/tests/antibody_graft 
    ```

Para ejecutar el protocolo de injerto, escribe lo siguiente en una línea de comandos:

```
[path to executable]/antibody_assemble_CDRs.[platform|linux/mac][compile|gcc/ixx]release –database [path to database] @options
```

Nota: estas demostraciones solo generarán un decoy.

Referencias
==========

Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaDock:

-   J. Xu, D. Kuroda & J. J. Gray, “RosettaAntibody3: Object-Oriented Designed Protocol and Improved Antibody Homology Modeling.” (2013) in preparation
-   A. Sivasubramanian,\* A. Sircar,\* S. Chaudhury & J. J. Gray, "Toward high-resolution homology modeling of antibody Fv regions and application to antibody-antigen docking," Proteins 74(2), 497-514 (2009)

Propósito de la aplicación
===========================================

Injertar plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo de anticuerpo aproximado.

Algoritmo
=========

1.  El código superpone las coordenadas de la cadena principal de 4 residuos de cada extremo de los CDR (4 residuos en cada extremo) sobre los 4 residuos del marco (en cada extremo), de modo que los CDR puedan «injertarse» en el marco.
2.  Después del injerto, las coordenadas de la cadena principal de 2 residuos de la región de superposición se reemplazaron por los 2 residuos superpuestos del extremo del CDR
3.  El código también minimiza y reempaqueta los CDR completos (cadena principal y cadena lateral) después del injerto

Entrada
=====

FR.pdb (plantilla del marco)
 L1.pdb, L2.pdb, L3.pdb (plantillas de CDR de la cadena L)
 H1.pdb, H2.pdb, H3.pdb (plantillas de CDR de la cadena H)

La preparación de estas entradas se encuentra en el [[Flujo de trabajo del protocolo RosettaAntibody3|antibody-protocol]]

Opciones
=====

**Ejemplo:**

```
-s FR.pdb
-antibody::graft_l1
-antibody::graft_l2
-antibody::graft_l3
-antibody::graft_h1
-antibody::graft_h2
-antibody::graft_h3
-antibody::h3_no_stem_graft
-antibody::packonly_after_graft
```

**Descripción detallada de las opciones:**

```
-antibody::graft_l1
-antibody::graft_l2
-antibody::graft_l3
-antibody::graft_h1
-antibody::graft_h2
-antibody::graft_h3
```

-   Descripción:
     especifica qué CDR quieres injertar

-   Opciones:
     true o false

```
-antibody::h3_no_stem_graft
```

-   Descripción:
     En el código de injerto, después de la superposición, las coordenadas de dos residuos del tallo se reemplazan por los residuos extra de cada extremo de los archivos PDB de plantilla de CDR (L1.pdb, H2.pdb, etc.). En los CDR que no son H3 puede estar bien, pero en H3 puede ser perjudicial para el posterior modelado del loop que se cambien los tallos. Esta opción protege los tallos de H3. El paso de superposición es exactamente el mismo; la única diferencia es que los tallos de H3 no se reemplazarán por los residuos del lado de H3. Así, el tallo puede ser el tallo original de la plantilla del marco.

-   Opciones: true o false

```
-antibody::packonly_after_graft
```

-   Descripción:
     Por defecto, el protocolo de injerto hace una minimización (de cadenas laterales y cadena principal) después de injertar los CDR. A veces la minimización puede ser delicada, ya que puede cambiar la estructura de forma drástica si el modelo preparado está en mal estado. Esta opción permite al usuario activar o desactivar la minimización, pero el empaquetado se sigue realizando por defecto.

-   Opciones: true o false

Salida
===============

Un archivo pdb con los 6 CDR injertados.

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
    * [[Modelado del CDR H3|antibody-model-CDR-H3]]: determina estructuras de anticuerpos combinando el docking VL-VH y el modelado del loop H3.
    - [[Docking de anticuerpos de camélidos|antibody-mode-camelid]]: hace el docking de anticuerpos de camélidos con sus antígenos.
    - [[SnugDock | snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
    * [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar o comparar estrategias de diseño de anticuerpos.

    * [[CDR Cluster Identification]]: una aplicación que asigna cada CDR de un anticuerpo a clústeres de CDR de North/Dunbrack según la menor distancia de diedros al centro de cada clúster.

     * [[CDR Cluster Constrained Relax]]: una aplicación para relajar CDR usando restricciones armónicas circulares basadas en los clústeres de CDR identificados.
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
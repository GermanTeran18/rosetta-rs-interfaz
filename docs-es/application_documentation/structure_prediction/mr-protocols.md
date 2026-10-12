#Documentación de la aplicación mr\_protocols

Metadatos
========

Última edición el 26 de octubre de 2010 por Frank DiMaio. Código de Frank DiMaio; el ThreadingInputter (del que este código depende en gran medida) es de Mike Tyka y James Thompson. Investigador principal: David Baker.

Código y demo
=============

El código de esta aplicación está en src/apps/public/electron\_density/mr\_protocols.cc. Una demo, que muestra el papel de este protocolo en un flujo de trabajo de reemplazo molecular, está en demo/electron\_density/molecular\_replacement. En particular, los pasos 4 y 5 del flujo de trabajo muestran distintas formas de usar esta aplicación. (El README de esta carpeta explica cada paso en detalle).

Propósito de la aplicación
===========================================

Esta aplicación se usa para resolver problemas difíciles de reemplazo molecular. Por lo general se usará junto con el software de reemplazo molecular Phaser. El software tiene dos usos principales, relacionados con el reemplazo molecular:

-   Cuando Phaser (u otro método de reemplazo molecular) encuentra un resultado claro de reemplazo molecular (Z score de \~7 o mejor), pero el mapa de densidad resultante es difícil de interpretar y fallan los métodos automatizados de mejora del modelo (como phenix.autobuild o ARP/wARP).

-   Cuando Phaser (u otro método de reemplazo molecular) no puede encontrar un resultado claro de reemplazo molecular, la aplicación puede usarse para refinar las mejores soluciones potenciales, y quizá extraer una solución débil (pero correcta) entre los falsos positivos.

Se incluirá una interfaz con esta aplicación en una versión futura (relativamente próxima) de Phenix.

Algoritmo
=========

La aplicación mr\_protocols se usa para realizar modelado comparativo basado en moldes, restringido por datos de densidad con fases deficientes, como los que resultan de soluciones débiles de reemplazo molecular. Ejecuta el modelado comparativo estándar de Rosetta, en el que los huecos y las inserciones del molde se reconstruyen primero a partir de fragmentos de la cadena principal. Además, se reconstruye la densidad que falta en el PDB molde. Solo se reconstruyen huecos de hasta una longitud predefinida (por lo general 8 residuos). Por último, un relax de todos los átomos, restringido a la densidad experimental, permite pequeños movimientos de la cadena principal en las regiones alineadas del molde, así como el reposicionamiento de las cadenas laterales.

La restricción de densidad usa una función de puntuación derivada de la correlación de densidad entre un modelo y un mapa de densidad. Este término se describe en DiMaio et al, JMB 2009; puedes encontrar lecturas adicionales en la sección [[puntuación de estructuras con densidad|density-map-scoring]]. Se ha demostrado que este método es especialmente eficaz para resolver estructuras mediante reemplazo molecular a partir de moldes con una identidad de secuencia del 20 al 30 %.

Archivos de entrada
===========

Los archivos de entrada se dan como pares molde/archivo de alineamiento. Por lo general estos archivos se generan automáticamente con el script auxiliar incluido [[prepare_template_for_MR.pl|prepare-template-for-mr]] ; el documento enlazado los describe con más detalle.

Los archivos molde son archivos PDB que se dan con «-in:file:template\_pdb». Los archivos de alineamiento, que describen la correspondencia de secuencias del molde al objetivo, están en el «formato Rosetta», que es similar a un alineamiento en formato fasta, con algunos campos extra. Por ejemplo:

```
## 1CRB_ 2qo4.PHASER.1.pdb
# hhsearch
scores_from_program: 0 1.00
2 DFNGYWKMLSNENFEEYLRALDVNVALRKIANLLKPDKEIVQDGDHMIIRTLSTFRNYIMDFQVGKEFEEDLTGIDDRKCMTTVSWDGDKLQCVQKGEKEGRGWTQWIEGDELHLEMRAEGVTCKQVFKKV
0 AFSGTWQVYAQENYEEFLRAISLPEEVIKLAKDVKPVTEIQQNGSDFTITSKTPGKTVTNSFTIGKEAEIT--TMDGKKLKCIVKLDGGKLVCRTD----RFSHIQEIKAGEMVETLTVGGTTMIRKSKKI
--
```

Aunque se aceptan varios pares de archivos molde/alineamiento, por lo general se recomienda ejecutar un solo molde/alineamiento en cada trabajo.

Además, según las opciones elegidas, puede hacer falta un [[archivo de fragmentos|fragment file]]. La reconstrucción de huecos se hace mediante inserción de fragmentos (como en el ab initio de Rosetta); por eso hay que dar dos archivos de fragmentos de la cadena principal (de 3 y de 9 residuos). La [[aplicación para construirlos|app-fragment-picker]] se incluye con Rosetta, pero requiere algunas herramientas y bases de datos externas. La forma más fácil de generar fragmentos es usar el servidor Robetta ( <http://old.robetta.org/> ). Los archivos de fragmentos deben construirse con la secuencia completa; Rosetta se encarga de reasignar los fragmentos si no se reconstruyen todos los huecos.

Opciones
=======

A continuación se muestra una línea de comandos general que se usaría para refinar una solución débil de reemplazo molecular:

```
bin/mr_protocols.default.linuxgccrelease \
    -database /path/to/rosetta/main/database \
    -MR:mode cm \
    -in:file:extended_pose 1 \
    -in:file:fasta 1crb.fasta \
    -in:file:alignment 2qo4.ali \
    -in:file:template_pdb 2qo4.PHASER.1.pdb \
    -loops:frag_sizes 9 3 1 \
    -loops:frag_files xx1crb_09_05.200_v1_3.gz xx1crb_03_05.200_v1_3.gz none \
    -loops:random_order \
    -loops:random_grow_loops_by 5 \
    -loops:extended \
    -loops:remodel quick_ccd \
    -loops:relax relax \
    -relax:default_repeats 2 \
    -relax:jump_move true \
    -edensity:mapreso 3.0 \
    -edensity:grid_spacing 1.5 \
    -edensity:mapfile 2qo4.PHASER.1_2mFo-DFc.ccp4 \
    -edensity:sliding_window_wt 1.0 \
    -edensity:sliding_window 5 \
    -cm:aln_format grishin \
    -MR:max_gaplength_to_model 8 \
    -nstruct 1000 \
    -ignore_unrecognized_res -overwrite
```

Para la mayoría de los usuarios, las únicas opciones que habrá que cambiar de un trabajo a otro tienen que ver con:

(1) La estructura de entrada y el alineamiento:

```
-in:file:extended_pose 1
-in:file:fasta inputs/1crb.fasta
-in:file:alignment inputs/1crb_2qo4.ali
-in:file:template_pdb inputs/2qo4.PHASER.1.pdb
```

El fasta, el alineamiento y los PDB molde (consulta la sección «Archivos de entrada» más arriba). La opción 'extended\_pose 1' siempre debe darse.

(2) El mapa de densidad de entrada:

```
-edensity:mapfile inputs/sculpt_2QO4_A.PHASER.1.map
-edensity:mapreso 3.0
-edensity:grid_spacing 1.5
-edensity:sliding_window_wt 1.0
-edensity:sliding_window 5
```

Así se le dan a Rosetta los parámetros del mapa de densidad y de la función de puntuación. El mapa de entrada (-edensity:mapfile) está en formato CCP4. Las opciones 'mapreso' y 'grid\_spacing' definen la resolución de la densidad calculada y el espaciado de la rejilla en la que se calculan las correlaciones (estos no coinciden con la rejilla del archivo de entrada, sino con la rejilla en la que Rosetta calcula las cosas). Por lo general no bajo de estos valores (con un espaciado de rejilla igual a 1/2 de mapreso); para estructuras muy grandes puedo ejecutar en una rejilla aún más gruesa para acelerar un poco las cosas.

La opción 'sliding\_window\_wt' es el peso del término de ajuste a la densidad. 1.0 suele estar bien. Si los datos experimentales son de baja resolución (3A o peor), quizá quieras bajarlo a 0.5. 'sliding\_window' es el ancho en residuos sobre el que se calculan las correlaciones locales. 5 suele estar bien.

Consulta el tutorial de demo/electron\_density/molecular\_replacement (en particular el paso 3) para ver cómo crear un mapa a partir de un resultado inicial de reemplazo molecular.

(3) Los fragmentos de entrada

```
-loops:frag_sizes 9 3 1
-loops:frag_files inputs/aa1crb_09_05.200_v1_3.gz inputs/aa1crb_03_05.200_v1_3.gz none
```

Archivos y tamaños de fragmentos. 9 y 3 son los que produce Robetta por defecto; 'none' significa generar automáticamente los fragmentos de 1 residuo a partir de los de 3. Consulta la sección «Archivos de entrada» para ver cómo obtener estos archivos de fragmentos.

(4) El número de estructuras de salida.

```
-nstruct 1000
```

El número de modelos necesario para muestrear de forma eficaz el espacio conformacional varía de un modelo a otro, según el número de huecos del alineamiento y su longitud. En un conjunto de casos a ciegas, la mayoría necesitó entre 1000 y 2000 estructuras de salida para mejorar el modelo lo suficiente como para resolver finalmente la estructura; en unos pocos casos bastaron 100 modelos.

Algunas opciones de uso menos frecuente que los usuarios avanzados pueden usar para controlar la duración del trabajo y el espacio de muestreo de la ejecución:

```
-relax:default_repeats 4
-MR:max_gaplength_to_model 8
```

La primera opción controla la duración del «relax». Todos nuestros experimentos usaron 4 repeticiones; en sistemas muy grandes, reducirlo a 2 puede acelerar un poco las cosas. La segunda opción le indica a Rosetta que no reconstruya huecos de longitud mayor que 'n' en el alineamiento. Comprobamos que tanto 8 como 10 producen buenos resultados: si el muestreo es limitado (p. ej., solo tienes recursos para producir 100 modelos de salida), reducirlo a 4 o 6 puede bastar para resolver la estructura.

Por último, estas opciones son obligatorias y deben dejarse tal cual:

```
-relax:jump_move true
-cm:aln_format grishin
-ignore_unrecognized_res
-loops:remodel quick_ccd
-loops:relax relax
-loops:random_grow_loops_by 5
-loops:random_order
-loops:extended
```

Consejos
====

-   Por lo general no conviene fijar una resolución mejor que 3A. En los casos de baja resolución (2.8A o peor) hemos comprobado que lo que mejor funciona es fijar la resolución de entrada (en Rosetta) 0.5A peor que la resolución de los datos cristalográficos. En todos los casos, el espaciado de rejilla debe ser como máximo la mitad de la resolución.

-   Si el resultado del reemplazo molecular es correcto, el modelo de salida debería puntuar en Phaser bastante mejor que el molde.

-   ¡Esta aplicación también puede usarse con estructuras simétricas! Si el molde es simétrico, se puede crear un archivo de definición de simetría con el script incluido [[make_symmdef_file.pl|make-symmdef-file]] . Después añade la opción '-symmetry\_definition symm.def' al script de entrada. Consulta [[la documentación de simetría|symmetry]] para más detalles.

-   Cuando trabajes con datos de resolución especialmente baja (peor que 3A), quizá quieras reducir el peso del término de ajuste a la densidad.

-   Si obtienes errores de «template not found», probablemente el PDB molde fue renombrado (por el programa de reemplazo molecular, por ejemplo). Renombra el molde o [[actualiza el archivo .ali|prepare-template-for-mr]] . [NOTA: el código solo comprueba que coincidan los 5 primeros caracteres]

Salidas esperadas
================

Las estructuras del final de la ejecución se escribirán en archivos .pdb, y la puntuación de esa estructura se escribirá en el archivo de puntuaciones, score.sc. Los archivos .pdb se etiquetarán con S\_ seguido del nombre del molde, seguido de un número de trabajo.

Esta aplicación usa el distribuidor de trabajos JD2; respeta todas las opciones de jd2 que controlan la salida.

Posprocesamiento
===============

Los modelos resultantes de este protocolo suelen someterse a un corte del 10 % por puntuación y luego se vuelven a puntuar con Phaser frente a los datos cristalográficos en bruto. Puedes encontrar un script de ejemplo que muestra el uso de Phaser en la carpeta de demos demo/electron\_density/molecular\_replacement. Usando esta puntuación como criterio de selección, se puede elegir un pequeño conjunto de modelos para refinarlos más o para la construcción automática.


##Véase también

* [[Prepare template for MR]]: Script de preparación para los protocolos de reemplazo molecular.  
* [[Fragment file]]: Formato de archivo de fragmentos
* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta

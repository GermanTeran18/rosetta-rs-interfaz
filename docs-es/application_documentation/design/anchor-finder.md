#AnchorFinder

#####Metadatos

Autor: Steven Lewis (smlewi -- at -- gmail.com)

Código y documentación de Steven Lewis (smlewi -- at -- gmail.com). El investigador principal fue Brian Kuhlman, (bkuhlman -- at -- email.unc.edu).

Código y demo
=============

El código de esta aplicación se encuentra en Rosetta/main/source/src/apps/public/interface_design/anchored_design/AnchorFinder.cc. Su [[mover|Glossary]] está incrustado en el archivo de la aplicación. Hay una demo en las pruebas de integración (Rosetta/main/tests/integration/tests/AnchorFinder). Hay una demo más extensa y con más documentación en `Rosetta/demo/public/anchored_design` o en la sección de demos de la versión.

Referencias
==========

-   [Lewis SM, Kuhlman BA. Anchored design of protein-protein interfaces. PLoS One. 2011;6(6):e20872. Epub 2011 Jun 17.](http://www.ncbi.nlm.nih.gov/pubmed/21698112) (enlace a PubMed)

Propósito
===========================================

El propósito de AnchorFinder es buscar anclas en dímeros de proteínas. Forma parte del conjunto completo de AnchoredDesign. En resumen, las anclas son regiones de una interfaz que sirven de asas y que podrían injertarse desde un compañero de interacción natural en un nuevo andamiaje (el propósito de la aplicación AnchoredPDBCreator) y luego diseñarse de forma flexible a su alrededor para crear una nueva interfaz proteína-proteína entre la diana original y el andamiaje (la aplicación AnchoredDesign).

Se escribió para ayudar a buscar proteínas utilizables en benchmarks de secuencia fija del protocolo AnchoredDesign. También puede usarse para examinar interfaces individuales en busca de elementos que parezcan anclas (aunque el ojo humano es superior si solo quieres mirar unas pocas estructuras).

Compilar la biblioteca y la aplicación de Rosetta con SCons
=========================================================

AnchorFinder está pensada para ejecutarse de forma "robusta". Consulta también la documentación de "[[Rosetta robusto|robust]]".  En una ocasión se ejecutó AnchorFinder contra todo el PDB; la robustificación evita que se bloquee con PDB mal formados.

Algoritmo
=========

La idea es bastante simple. En la primera fase descarta las entradas que no son multímeros de proteína. Se eliminan los átomos que no son de proteína, y se descartan los monómeros y las estructuras demasiado cortas (20 residuos).

Si una estructura candidata supera ese filtro, AnchorFinder básicamente imprime el grafo de vecinos, ordenado por cadena, en un archivo llamado \<pdbname\>.out.

Después busca regiones de ancla en esa estructura (regiones con mucho carácter de loop y muchos vecinos a través de la interfaz) y reúne esas ventanas en otro archivo, cuyo nombre por defecto es goodfile.out.

Limitaciones
===========

Este código busca anclas solo en un sentido vago, así que todavía debes revisar las anclas sugeridas antes de usarlas. Además, no puede saber si tus estructuras de entrada son heterodímeros biológicos, homodímeros, dímeros de cristal, octámeros, 3 heterodímeros idénticos en una unidad asimétrica, etc. Si ya sabes en qué proteína quieres buscar anclas, tus ojos son mejores que este código: cárgala en PyMOL y mírala. Si tienes 20 posibilidades, sí resulta útil.

Modos
=====

Nominalmente, "buscar proteínas para el benchmark" es un modo (que solo usará el autor original) y "buscar anclas en el dímero de proteína X" es un modo que tú podrías usar. El código se usa de forma idéntica, aunque usarías muchas entradas para el primero y pocas para el segundo.

Archivos de entrada
===========

Este código no tiene entradas especiales, solo las opciones y los pdbs.

Opciones
=======

Las opciones de AnchorFinder consisten en opciones que controlan qué se busca en un ancla y dónde se guardan los datos:

-   window_size (entero) longitud de las ventanas que se consideran: ¿4, 5, 6, etc. residuos contiguos a la vez? Sugiero ventanas de 5 residuos.
-   loopness (real entre 0 y 1) ¿Qué fracción de esta ventana debe tener estructura secundaria de loop según la asignación de DSSP? Se toma como un decimal entre 0 y 1; sugiero 0.6 (lo que equivale a 3/5 residuos en una ventana de 5 residuos) a 1 (todos los residuos en loop).
-   nbrs_per_residue (entero) ¿Cuántas interacciones a través de la interfaz por residuo debe tener la ventana? Sugiero un mínimo de 4. Esto equivale a 20 interacciones a través de la interfaz (incluida la redundancia) en una ventana de 5 residuos. Por redundancia me refiero a que los residuos 43 y 44 de la cadena A pueden interactuar ambos con el residuo 234 de la cadena B y contarán como dos interacciones
-   bestoutfile (nombre de archivo) ¿En qué archivo se deben imprimir las buenas interacciones? Dejo como ejercicio para el lector elegir su propio nombre de archivo. Por defecto es goodfile.out.

Las opciones generales de Rosetta que se sugieren incluyen:

-   database (ruta de archivo) Necesitarás la base de datos, como de costumbre
-   s o l (rutas de archivo) pdbs de entrada, ya sea como una lista en s o en un archivo en l.
-   obey_ENDMDL (booleano) Esta opción hace que el lector de PDB deje de leer los modelos de RMN después del primer modelo del archivo; de lo contrario, obtienes lío multimodelo con 20 cadenas unas sobre otras (y recuentos de vecinos falsos enormes).
-   packing:pack_missing_sidechains false (booleano) Pasa false a esta opción para omitir el empaquetado de las entradas: para estos fines es una pérdida de tiempo.
-   packing:prevent_repacking (booleano) Probablemente no tiene efecto, pero no hace daño. Aquí el empaquetado es una pérdida de tu tiempo.
-   jd2:no_output (booleano) No necesitas que los PDB de entrada se reproduzcan como salidas; solo gastaría espacio de tu disco. Esta opción lo evita.

Consejos
====

El código es mucho más eficiente si usas todas las opciones "generales de rosetta" anteriores.

La ejecución es más lenta, pero mucho más rápida en conjunto porque no se bloquea, si aplicas los trucos de robustez enlazados arriba.

Si el código acumula grandes cantidades de memoria, no tienes una fuga de memoria. Lo que ocurre es que el distribuidor de trabajos (Job Distributor) almacena en caché de forma innecesaria la enorme cantidad de PDB de entrada, sin saber que no se necesitan después del primer uso. Cuando se escribió este código, ese problema estaba solucionado; es posible que desde entonces haya vuelto a aparecer. En ese caso, ejecuta en lotes más pequeños y concatena las salidas.

Salidas esperadas
================

Pdbname.data tiene este aspecto:

Las filas son residuos, las columnas son cadenas y los datos son los vecinos de cada residuo en esa cadena
```
residue chain   PDBdata DSSP    1       2
1       1       2 D     L       7       0
2       1       3 D     L       10      0
3       1       4 D     L       14      0
...
```

Más adelante puedes explorar estos datos en busca de anclas sin volver a ejecutar AnchorFinder. El número de columnas crecerá si hay más de dos cadenas en el PDB (que aun así puede ser una entrada válida, si tienes una unidad asimétrica de 3 heterodímeros).

Goodfile.out tiene este aspecto:

```
PDB pdb2vk1 window 45 loopness 5 nbrs 0 28 0 0 start 46 A pymol select pdb2vk1 and chain A and resi 46-50
PDB pdb2vk1 window 108 loopness 5 nbrs 0 25 0 0 start 109 A pymol select pdb2vk1 and chain A and resi 109-113
PDB pdb2vk1 window 109 loopness 5 nbrs 0 36 0 0 start 110 A pymol select pdb2vk1 and chain A and resi 110-114
PDB pdb2vk1 window 110 loopness 5 nbrs 0 46 0 0 start 111 A pymol select pdb2vk1 and chain A and resi 111-115
PDB pdb2vk1 window 111 loopness 5 nbrs 0 46 0 0 start 112 A pymol select pdb2vk1 and chain A and resi 112-116
PDB pdb2vk1 window 112 loopness 5 nbrs 0 47 0 0 start 113 A pymol select pdb2vk1 and chain A and resi 113-117
```

Cada línea identifica el PDB, el número de ventana, su loopness, su número de vecinos en cada cadena del PDB (número variable de columnas), la numeración PDB del residuo inicial de la ventana y una selección de Pymol para la ventana.

Posprocesamiento
===============

En este punto, los datos son tuyos para jugar con ellos. Yo busqué ventanas con muchos vecinos en una sola cadena usando sifter.py (incluido en la captura del protocolo que acompaña a la publicación) y luego ordené para quedarme con las que tenían más vecinos (sort -n -k1 \<input\>). Después todo fue filtrado manual para elegir las estructuras de los benchmarks. Nunca lo he usado para buscar anclas en pocas estructuras.

Novedades desde la última versión
=============================

Rosetta 3.3 es la primera versión.

##Véase también


* [[AnchoredDesign | anchored-design ]]: diseño propiamente dicho de las interfaces ancladas localizadas por esta aplicación
* [[AnchoredPDBCreator | anchored-pdb-creator ]]: crea la entrada para el siguiente paso de este flujo de trabajo.

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

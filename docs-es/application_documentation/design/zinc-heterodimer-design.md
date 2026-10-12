#Aplicación Zinc\_heterodimer\_design

Metadatos
========

Última actualización el 19 de mayo de 2016 por Steven Lewis.  Autor: Bryan Der (bder@email.unc.edu), laboratorio Kuhlman (bkuhlman@email.unc.edu).

Código y demostración
=====================

El código de esta aplicación está en src/apps/public/design/zinc\_heterodimer\_design (configuración y controlador) y en src/protocols/metal\_interface/ZincHeterodimerMover (mover). La prueba de integración se llama zinc\_heterodimer.

Referencias
===========

[http://www.ncbi.nlm.nih.gov/pubmed/23504819] 
Der BS, Jha RK, Lewis SM, Thompson PM, Guntas G, Kuhlman B. Combined
computational design of a zinc-binding site and a protein-protein interaction:
one open zinc coordination site was not a robust hotspot for de novo ubiquitin
binding. Proteins. 2013 Jul;81(7):1245-55. doi: 10.1002/prot.24280. Epub 2013 Apr
20. Erratum in: Proteins. 2013 Sep;81(9):1678. Jha, Raamesh K [corrected to Jha, 
Ramesh K]. PubMed PMID: 23504819; PubMed Central PMCID: PMC4084500.

Propósito
===========================================

Este protocolo diseña heterodímeros mediados por zinc. Una de las proteínas contiene un sitio de unión a zinc de tres residuos, y la segunda contiene un residuo de superficie que coordina el zinc. En el ejemplo dado, la proteína 2 es la ubiquitina, que contiene una histidina en la superficie.

Algoritmo
=========

Antes de ejecutar este protocolo, se usa RosettaMatch para diseñar sitios de zinc de tres residuos en la superficie de una proteína. Después, la proteína objetivo que contiene una histidina de superficie (Ubq-H68) se acopla (docking) al sitio de coordinación abierto del zinc. La orientación de cuerpo rígido de la ubiquitina respecto al andamio de unión a zinc diseñado se muestrea como si la ubiquitina fuera un rotámero gigante del tamaño de una proteína. Esto se hace mediante muestreo de rotámeros inversos de los ángulos chi1 y chi2 de Ubq-H68 (SidechainMover), además de rotación libre alrededor del eje de coordinación His68-zinc (RotateJumpAxisMover). Hay una fase de centroide que evalúa la complementariedad de forma global entre el objetivo y el andamio; esta fase está acoplada a una Pose de todos los átomos para recordar la conformación de los residuos que coordinan el zinc.

Limitaciones
============

La Pose centroide de menor puntuación es la única que pasa al diseño de interfaz de todos los átomos. Quizá una mejor forma de hacerlo sería diseñar todas las orientaciones de la cadena principal que no tengan choques. Este protocolo no incluye minimización ni muestreo de la cadena principal. El sitio de zinc permanece fijo durante el diseño de la interfaz.

Modos
=====

La mayor diferencia de "modo" es si quieres o no generar como salida todas las estructuras perturbadas de cuerpo rígido para visualizarlas o depurarlas. Consulta las opciones de línea de comandos.

Archivos de entrada
===================

Solo PDB.

-   Los tipos de archivo comunes (archivo de loops, archivos de fragmentos, etc.) se describirán en un lugar común; enlaza a esos documentos con el comando ATref.
-   PDB del objetivo (tipo silvestre)
-   PDB del andamio (tipo silvestre)
-   PDB de coincidencia (match) de RosettaMatch para el andamio. Contiene tres residuos que coordinan el zinc y una histidina de "estado de transición" que será reemplazada por la histidina del objetivo.

Opciones
========

Estos valores son para ejecuciones de producción.

-resfile resfile \#the resfile default is NATAA, this will prevent mutation of the wild-type target. For the scaffold, all residues should be NOTAA HC. 

-nstruct 100 

-partner1 2D4X.pdb 

-partner2 1UBQ.pdb 

-partner2\_residue 68 

-match\_pdb 2D4X.C135-C137-H192\_match\_00161.pdb 

-skip\_sitegraft\_repack false \#the local region surrounding the zinc match residues is repacked by default. \#-AnchoredDesign::perturb\_temp 

-AnchoredDesign::perturb\_cycles 500 \#how many times to perturb the rigid-body orientation 

-AnchoredDesign::perturb\_show false \#true for debugging/visualization of rigid-body sampling 

-AnchoredDesign::refine\_cycles 10 \#how many times to run PackRotamersMover

Consejos
========

Salidas esperadas
=================

La salida esperada es un heterocomplejo que contiene: la proteína objetivo, el zinc, el sitio de unión a zinc y el andamio diseñado. Si usas la opción pertub\_show, verás PDB de cada paso de muestreo de cuerpo rígido. El archivo de log te mostrará cuántas veces se llamó a SidechainMover o a RotateJumpAxisMover, y si el movimiento de MonteCarlo se aceptó o se rechazó. Al final del log se imprime una tabla de energías.

Posprocesamiento
================

Después de ejecutar el protocolo, la mejor forma de evaluar los diseños es mediante la energía de unión calculada con InterfaceAnalyzer (especifica un jumpnum de 2). Revisa el sitio de zinc para asegurarte de que la coordinación de 4 residuos (3 más 1) está intacta.

Novedades desde la última versión
=================================

Si has hecho mejoras, anótalas aquí.

##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta

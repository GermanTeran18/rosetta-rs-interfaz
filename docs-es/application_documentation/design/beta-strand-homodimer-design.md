#Conjunto de aplicaciones beta\_strand\_homodimer\_design

Metadatos
========

Autor: P. Ben Stranges (stranges@unc.edu), el investigador principal es Brian Kuhlman: (bkuhlman@unc.edu)

Código y demo
=============

El código está en `       rosetta/main/source/src/apps/public/scenarios/beta_strand_homodimer/      ` ; hay una prueba de integración en `       rosetta/main/tests/integration/tests/beta_strand_homodimer/      ` . Sin embargo, si quieres usar realmente el código, deberías consultar la demo: `       rosetta/demos/public/beta_strand_homodimer_design/      `

Referencias
==========

-   Stranges PB, Machius M, Miley MJ, Tripathy A, and Kuhlman B. (2011) "Computational design of a symmetric homodimer using beta-strand assembly" PNAS in press.

Propósito
===========================================

Este código se escribió para una aplicación bastante singular: encontrar proteínas con hebras beta expuestas en la superficie y luego intentar construir y diseñar un homodímero que se forme a través de esa hebra beta. Podría usarse para el diseño general de homodímeros, pero no se ha probado.

Algoritmo
=========

Lo que sigue está copiado literalmente del artículo citado arriba: definimos una hebra beta como expuesta en la superficie si cumplía tres criterios. 1) Cinco residuos consecutivos tenían estructura secundaria de hebra beta según DSSP. 2) No había enlaces de hidrógeno cadena principal-cadena principal formados por uno de cada dos residuos de la hebra. 3) Uno de cada dos residuos tenía menos de 16 residuos vecinos, o tenía de 16 a 30 vecinos y un área de superficie accesible al solvente (SASA) por átomo superior a 2.0 Å2. Los residuos se definen como vecinos si la distancia entre sus Cbeta es \< 10Å. A continuación se muestra un ejemplo de línea de comandos usada para encontrar las hebras expuestas:

La salida de lo anterior se usa luego para armar la línea de comandos que construye los posibles homodímeros. El procedimiento es el siguiente: el eje de una hebra beta expuesta se definió como un vector desde el átomo Calpha del primer residuo de la hebra hasta el átomo Calpha del último residuo de la hebra. Se define otro vector en el residuo central de la hebra, desde el carbono carbonílico hasta el oxígeno carbonílico. Se traza un último vector perpendicular a los dos vectores descritos a través del átomo Calpha del residuo central de la hebra. El homodímero antiparalelo se construye copiando la proteína y girando la copia 180° alrededor de este eje. A continuación, la cadena copiada se traslada 6.0 Å lejos de la original para crear un punto de partida para la evaluación. Después, la cadena copiada se trasladó a lo largo del eje de la hebra expuesta en pasos de 7 Å para identificar conformaciones alternativas sin choques entre átomos de la cadena principal. Como filtro final, se comprueba que no haya choques cadena principal-cadena principal entre las dos cadenas. La identificación de hebras beta expuestas generada con el protocolo anterior se usó como entrada para el paso siguiente.

El modelo de homodímero generado arriba se usó para generar la definición de simetría y la estructura inicial para el diseño de la interfaz. Primero, la proteína se acopla simétricamente consigo misma (docking) para muestrear los grados de libertad de cuerpo rígido. Después del paso de docking, se diseñaron simétricamente todos los residuos a menos de 8 Å de la otra cadena. Por último, se minimizaron la cadena principal y las cadenas laterales de todos los residuos de la interfaz.

Archivos de entrada
===========

Consulta la demo en: `       rosetta/main/demos/public/beta_strand_homodimer_design      `

Opciones
=======

Opciones de exposed\_strand\_finder

Opciones generales:

-   -s o -l para las estructuras de entrada
-   -ignore\_unrecognized\_res - bool - conviene que sea true con muchas estructuras de entrada
-   -packing::pack\_missing\_sidechains
-   -out::nooutput -bool- este protocolo gestiona su propia salida; evita que el distribuidor de trabajos ayude
-   -struct\_file -file- ruta del archivo para el restrictor de estructura, si hace falta

Opciones específicas de la aplicación

-   -beta\_length - integer - de qué longitud se busca la hebra expuesta
-   -sat\_allow - integer - cuántos átomos de la cadena principal satisfechos se permiten en este rango

Permitir el alineamiento de una hebra encontrada con alguna proteína diana (opcional):

-   -check\_rmsd false - bool - si se debe comparar la hebra expuesta con alguna hebra diana
-   -native - file - la estructura diana con la que se compara el rms de la hebra expuesta
-   -strand\_span - string vector - cadena, inicio y fin de la estructura nativa con la que se compara la hebra expuesta (ejemplo: B 10 15)

Opciones de homodimer\_maker

-   -s estructura de entrada que se convertirá en homodímero
-   -run::chain - char - letra de cadena PDB de la cadena que se quiere usar para hacer el homodímero
-   -sheet\_start - integer - n.º de residuo PDB del primer residuo de la hebra
-   -sheet\_stop - integer - n.º de residuo PDB del último residuo de la hebra
-   -window\_size - integer - número de residuos de la hebra expuesta que se consideran al calcular los vectores. No puede ser mayor que sheet\_stop - sheet\_start + 1.

Opciones de homodimer\_design. Opciones generales:

-   -s - \*\_INPUT.pdb del script de simetría
-   -symmetry:symmetry\_definition -file- archivo de definición de simetría del script
-   -nstruct -integer- prueba con unos 5000 para ejecuciones de producción

Específicas de la aplicación:

-   -pack\_min\_runs - integer - número de ciclos de diseño/minimización
-   -make\_ala\_interface - bool - convierte toda la interfaz en Ala antes del docking
-   -find\_bb\_hbond\_E - bool - calcula la energía de enlace de hidrógeno cadena principal-cadena principal de la salida
-   -disallow\_res CGP \# impide el diseño hacia Gly, Cys, Pro

Otras opciones útiles

-   -favor\_native\_res 0.5
-   -run:min\_type dfpmin
-   -pose\_metrics:interface\_cutoff 8.0
-   -use\_input\_sc
-   -ex1
-   -ex2
-   -overwrite
-   -docking::docking\_local\_refine true/false
-   -docking::sc\_min true
-   -docking::dock\_ppk false
-   symmetry:perturb\_rigid\_body\_dofs 3 5
-   -out::file::fullatom

Consejos
====

Estos protocolos son específicos de un método para encontrar hebras beta expuestas y diseñar esa proteína para que sea un homodímero. No estamos seguros de con cuánta facilidad podrían usarse para otros fines.

Salidas esperadas
================

Consulta la descripción completa en `       rosetta/main/demos/public/beta_strand_homodimer_design/README      `

Posprocesamiento
===============

La demo ubicada en `       rosetta/main/demos/public/beta_strand_homodimer_design/      ` tiene una descripción completa de cómo manejar las salidas.

Cambios desde la última versión
==========================

3.4 es la primera versión de este código. - stranges

##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

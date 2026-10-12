#Diseño de láminas curvas

Visión general
========

El código usado para generar láminas curvas siguiendo los principios descritos en (1) está implementado por completo en XML de rosetta_scripts, con código en Python de apoyo para generar los archivos de entrada clave: blueprints que describen los desplazamientos de registro de la lámina y los bins ABEGO, y archivos de restricciones que dictan el emparejamiento de enlaces de hidrógeno entre hebras, la curvatura y la torsión. Hemos puesto a disposición pública el código funcional de los plegamientos descritos en (1) en el repositorio Git https://github.com/basantab/DeNovoCurvedSheetDesign. Las bibliotecas BPB_functions y Blueprint contienen varias funciones cortas que se usan en la construcción de todos los plegamientos, mientras que el código específico de cada plegamiento, usado para preparar todos los archivos de rosetta_scripts, se encuentra en cada una de las carpetas Fold_\*, con el nombre PrepareFilesFold\*.py. Cada carpeta de plegamiento incluye también su propio protocolo XML, con las pequeñas variaciones necesarias en cada caso.

**Ejemplo de uso desde la carpeta del repositorio Git:**

cd Fold_D

./PrepareFoldD.sh

./run.sh \</your/rosetta/exec/folder/rosetta_scripts.os.release\> \<runtime_in_sec\>

Detalles generales de los archivos PrepareFilesFold\*.py y Fold\*_SheetGenerationProtocolTemplate.xml
===========================================================================================

En cada una de las carpetas con el nombre de los plegamientos diseñados en (1) hay un archivo PrepareFilesFold\*.py y un archivo Fold*_SheetGenerationProtocolTemplate.xml. PrepareFilesFold\*.py genera los archivos de blueprint y de restricciones que dirigen el proceso de ensamblaje codificado en el archivo Fold*_SheetGenerationProtocolTemplate.xml. El proceso de construcción de la cadena principal se divide en al menos cuatro etapas: 1) construcción de las dos hebras centrales de la lámina principal; 2) construcción de la hebra con protuberancia (bulge) flanqueante del extremo N; 3) construcción de la hebra con protuberancia flanqueante del extremo C; 4) construcción de la hélice o hélices del extremo N que se empaquetan contra la lámina. El paso 4 se divide a su vez en pasos más pequeños para construir plegamientos más complejos.

Cada uno de los pasos de construcción de la cadena principal está codificado con el mismo conjunto básico de movers y filtros de Rosetta (véase Fold\*_SheetGenerationProtocolTemplate.xml), pero usa archivos de entrada y valores distintos. Este conjunto básico se estructura como un único mover que itera sobre un ensamblaje de fragmentos guiado por restricciones seguido de una comprobación de requisitos, hasta que se cumplen todos los requisitos o se alcanza un número de intentos. El ensamblaje de fragmentos guiado por restricciones se hace en "modo centroid", que es básicamente una representación en la que las cadenas laterales se aproximan a una única esfera blanda, siendo la valina la más cercana al tamaño promedio. Este paso también contiene pasos adicionales de minimización para "tirar" de la estructura y juntarla. El paso de comprobación de requisitos (o paso de filtrado) contiene varios filtros que cambian según el paso, pero comprueba al menos que no haya valores atípicos de Ramachandran ni una geometría desfavorable del enlace peptídico (p. ej., enlaces peptídicos cis). Para la documentación específica de movers y filtros, consulta la wiki de rosetta_scripts.

Salida
======

Las salidas son modelos de poli-alanina de proteínas que pertenecen a cada uno de los seis plegamientos diseñados en (1). Se colocan residuos de glicina y prolina en las posiciones donde los ángulos de torsión lo requieren (p. ej., glicina en el bin ABEGO G), o donde los favorece la operación de tarea ConsensusLoopDesign.

Plegamiento A: al igual que la cistatina, este plegamiento tiene una lámina curva alargada y una hélice larga que se empaqueta en diagonal respecto a la dirección de las hebras. Debido a la colocación de las protuberancias beta, la lámina tiene tres secciones semiplanas.

Plegamiento B: este plegamiento es similar al de un pequeño subconjunto de proteínas de la superfamilia similar a NTF2, pero carece de la horquilla corta que se empareja en paralelo con la hebra 6.

Plegamiento C: al igual que los plegamientos D, E y F, este plegamiento pertenece a la superfamilia similar a NTF2. En el plegamiento C, la región circunscrita por las protuberancias es especialmente estrecha para una proteína de la superfamilia similar a NTF2.

Plegamiento D: este plegamiento pertenece a la superfamilia similar a NTF2. La región circunscrita por las protuberancias es promedio para las proteínas de la superfamilia similar a NTF2.

Plegamiento E: similar al plegamiento D, pero tiene una hélice C-terminal que extendería hacia fuera una hipotética cavidad

Plegamiento F: similar al plegamiento E, pero el brazo de la lámina que se empaqueta contra la hélice C-terminal es más largo.

Archivos adicionales
================

Blueprint.py: biblioteca de Javier Castellanos para el manejo de objetos Blueprint.

BPB_functions.py: biblioteca de funciones para trabajar con cadenas principales de proteínas de lámina curva.

Rama_XPG_3level.txt: un mapa "general" de las coordenadas phi/psi a la energía; el espacio de Ramachandran más poblado es más favorable. Autor: Hahnbeom Park. Todos los aminoácidos, excepto la prolina y la glicina, tienen los mismos valores, de ahí el calificativo "general".

Referencias
==========

(1) Marcos\*, Enrique, Basanta\*, Benjamin, Tamuka M. Chidyausiku, Yuefeng Tang, Gustav Oberdorfer, Gaohua Liu, G.V.T. Swapna, Rongjin Guan, Daniel-Adriano Silva, Jiayi Dou, Jose Henrique Pereira, Rong Xiao, Banumathi Sankaran, Peter H. Zwart, Gaetano T. Montelione, David Baker "Principles for designing proteins with cavities formed by curved beta-sheets." Science 355.6321 (2017): 201-206.

*: indica coautoría principal

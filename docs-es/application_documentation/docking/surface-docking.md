#Aplicación de docking en superficie 

Propósito
=========

El docking en superficie es un protocolo para optimizar simultáneamente la orientación de cuerpo rígido de una proteína y las conformaciones de su cadena principal y de sus cadenas laterales sobre una superficie mineral sólida. Se usan movimientos de inserción de fragmentos, small y shear para optimizar el plegamiento de la proteína, mientras que se aplica el algoritmo estándar de RosettaDock para optimizar la orientación de cuerpo rígido. El docking estándar se complementa con un SurfaceOrientMover que impone las condiciones de contorno periódicas de una superficie mineral cristalina. Todos los grados de libertad correspondientes a la superficie mineral permanecen fijos. 

Referencias
===========

Pacella MS, Koo da CE, Thottungal RA, Gray JJ (2013) Using the RosettaSurface algorithm to predict protein structure at mineral surfaces. Methods Enzymol 532: 343-366. [Artículo](http://www.sciencedirect.com/science/article/pii/B9780124166172000163) 


Entrada
=======

El docking en superficie toma como entrada una única estructura en formato PDB con la proteína situada directamente sobre la cara de la superficie mineral con la que se desea hacer docking. Las coordenadas de la proteína deben aparecer después de las coordenadas de la superficie en el archivo PDB y deben ser cadenas distintas. Todos los residuos que pertenecen a la superficie deben figurar como la misma cadena. 

También debe proporcionarse un archivo de vectores de superficie. Este archivo especifica tres puntos que definen el plano de la superficie y la periodicidad de la superficie. El primer punto debe estar cerca del centro de la superficie. El segundo y el tercer punto definen vectores que parten del primer punto y corresponden a los vectores de red de la celda unidad de la superficie. 


Salida
======

El docking en superficie genera tres pdbs: una estructura en estado de solución, una estructura en estado unido a la superficie y un pdb final con puntuación. 


Opciones de la línea de comando
===============================

**Comando de ejemplo**

```
surface_docking.linuxgccrelease -database /path/to/rosetta/main/database -in:file:s input.pdb -in:file:surface_vectors surface_vectors.surf -include_surfaces
```

El docking en superficie admite todas las opciones generales de entrada y salida de archivos comunes a todas las aplicaciones de Rosetta escritas con JD2 (consulta la documentación de JD2 para más detalles):

```
   -database                 Path to rosetta databases
   -in:file:s                Input pdb file(s)
   -score:weights            Supply a different weights file from the Rosetta default
   -score:patch              Supply a different patch file from the Rosetta default
   -nstruct                  Make how many decoys per input structure ?
```

Opciones específicas de surface_docking

```
   Simple Options:
   -include_surfaces         Allows recognition of mineral surface residue types by rosetta 
   -in:file:surface_vectors  Specify the name of the surface vectors file that will define the surface
```

Ejemplo
=======

Se puede encontrar un protocol capture de docking en superficie en Rosetta/demos/protocol_capture/2013/surface_docking

Resultados
==========

El docking en superficie devuelve tres estructuras pdb de todos los átomos: una estructura en estado de solución, una estructura en estado de superficie y un pdb final con puntuación.  Según el tamaño de la proteína y el grado de convergencia de los resultados, puede interesar la estructura de menor energía o las estadísticas del 1% de estructuras de menor energía. 

Descripción del algoritmo
=========================

El algoritmo emplea un protocolo MCM multiescala basado en las estrategias de docking (Gray et al., 2003) y plegamiento (Simons et al., 1999) de Rosetta. Una característica clave de nuestro algoritmo es la variación del número de ciclos antes de pasar de la etapa de «solución» a la de «adsorción». En la etapa de solución, la proteína puede muestrear tanto estructuras extendidas como compactas. Una vez adsorbida sobre la superficie, los grandes cambios conformacionales suelen producir choques estéricos entre los átomos de la proteína y de la superficie, lo que impide su aceptación en un algoritmo MC tradicional (una limitación computacional). En el algoritmo, la proteína comienza la etapa de solución como una cadena peptídica totalmente extendida y pasa por varios ciclos de optimización, cada uno de los cuales da como resultado una estructura más compacta y «similar a una proteína», con características que aparecen con frecuencia en estructuras cristalinas conocidas. Variar el número de ciclos de optimización en solución antes de pasar al estado adsorbido garantiza que en el estado adsorbido se muestreen tanto estructuras extendidas (pocos ciclos de optimización en solución) como compactas (muchos ciclos de optimización en solución). Físicamente, esta característica permite que el cálculo capture los cambios conformacionales de la proteína al adsorberse (como el desplegamiento o las transiciones estructurales).



##Véase también

* [[Structure prediction applications]]: una lista de otras aplicaciones que se usan para la predicción de estructuras
* [[Design applications]]: una lista de otras aplicaciones que se pueden usar para diseño.
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta

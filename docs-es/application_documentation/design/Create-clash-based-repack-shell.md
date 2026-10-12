#Aplicación Create clash based repack shell

Metadatos
========

Aplicación creada por Roland Pache. La investigadora principal responsable es Tanja Kortemme (kortemme@cgl.ucsf.edu).

Propósito
===========================================

Al crear un resfile para posiciones de diseño, a menudo es útil permitir que los residuos que rodean las posiciones de diseño se reempaqueten para acomodar las nuevas identidades de aminoácidos. Identificar y especificar estos residuos a mano puede ser tedioso. La aplicación create_clash-based_repack_shell busca simplificarlo.

Esta aplicación toma una estructura de entrada y un resfile con posiciones diseñables, y localiza automáticamente las posiciones con cadenas laterales que podrían chocar con cualquiera de los residuos diseñables. Después modifica el resfile para añadir el reempaquetado a esas posiciones.


Archivos de entrada
===========

* -in:file:s -- La proteína de entrada que se va a diseñar. Ten en cuenta que, por ahora, la aplicación solo usará un único archivo en formato PDB pasado a -in:file:s; otros enfoques o formatos de entrada no funcionan.
* -packing:resfile -- El resfile inicial que se va a usar. Este resfile debe especificar una o más posiciones que se van a diseñar. (Puede que la aplicación no funcione correctamente con un resfile de solo reempaquetado.) Las demás posiciones pueden ser NATAA o NATRO.

Salida
=====

El archivo especificado con -packing:resfile **será modificado** al añadir líneas NATAA para cada residuo (que no sea de diseño) de la proteína que tenga una cadena lateral que pueda chocar con cualquiera de los rotámeros diseñables en cualquiera de las posiciones diseñables.

Se imprimirá una lista de estos residuos en la salida del tracer, junto con una cadena de selección en formato PyMol que sirve para visualizar la ubicación de los residuos seleccionados.


##Véase también

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
el primero 


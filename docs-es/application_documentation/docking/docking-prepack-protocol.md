<!-- --- title: Docking Prepack Protocol -->Protocolo de prepack para docking (para Docking)

Metadatos
========

Autores: Robin Thottungal (raugust1@jhu.edu), Jeffrey Gray (jgray@jhu.edu)

Última edición: 25/1/18. Investigador principal correspondiente: Jeffrey Gray (jgray@jhu.edu).

Código y demostración
=====================

Puedes encontrar un tutorial introductorio sobre docking proteína-proteína [aquí](https://www.rosettacommons.org/demos/latest/tutorials/Protein-Protein-Docking/Protein-Protein-Docking).

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/docking/docking_prepack_protocol.cc       `
-   Código fuente del mover principal: `        rosetta/main/source/src/protocols/docking/DockingPrepackProtocol.cc       `
-   Para ver demostraciones de algunos casos de uso distintos, consulta las pruebas de integración ubicadas en `        rosetta/main/tests/integration/tests/docking_prepack*       ` (docking\_prepack\_protocol).

Para ejecutar docking\_prepack, escribe lo siguiente en una línea de comandos:

```
[path to executable]/docking_prepack_protocol.[platform|linux/mac][compile|gcc/ixx]release –database [path to database] @options
```

Referencias
===========

Recomendamos los siguientes artículos para profundizar en la metodología y las aplicaciones de RosettaDock:

-   Gray, J. J.; Moughon, S.; Wang, C.; Schueler-Furman, O.; Kuhlman, B.; Rohl, C. A.; Baker, D., Protein-protein docking with simultaneous optimization of rigid-body displacement and side-chain conformations. Journal of Molecular Biology 2003, 331, (1), 281-299.
-   Wang, C., Schueler-Furman, O., Baker, D. (2005). Improved side-chain modeling for protein-protein docking Protein Sci 14, 1328-1339.
-   Chaudhury, S., Berrondo, M., Weitzner, B. D., Muthu, P., Bergman, H., Gray, J. J.; (2011) Benchmarking and analysis of protein docking performance in RosettaDock v3.2. PLoSONE, Accepted for publication.

Propósito de la aplicación
===========================================

Usa esta aplicación para preparar un complejo proteína-proteína para el docking mediante el protocolo de docking estándar. En el docking, las cadenas laterales solo se empaquetan en la interfaz. Ejecutar el protocolo de prepack para docking asegura que las cadenas laterales fuera de la interfaz de docking tengan una conformación de baja energía, algo esencial para puntuar los decoys.

Algoritmo
=========

El algoritmo docking\_prepack consta de tres pasos:

-   Mover las proteínas que se acoplan para sacarlas de contacto
-   Optimización de las cadenas laterales del complejo sin unir
-   Devolver las proteínas sin unir a la orientación original

Ten en cuenta que, en una ejecución por defecto de docking\_prepack, la optimización de las cadenas laterales se realiza mediante empaquetado. Se pueden proporcionar opciones de línea de comandos para activar una optimización adicional (sc\_min, rt\_min).

Modos
-----

-   **Protocolo Docking\_Prepack** - se puede lograr una optimización adicional mediante el sistema de opciones.

Archivos de entrada
===================

El único archivo de entrada obligatorio es un archivo pdb que contiene dos proteínas con identificadores de cadena distintos.

**Nota:** Se puede dar un conjunto (ensemble) de estructuras de entrada con las siguientes opciones: `-ensemble1 [partner_1_pdb_list]` o/y `-ensemble2 [partner_2_pdb_list]`. Estos archivos contienen una lista de las conformaciones de entrada (como rutas a pdb) del conjunto. Las rutas deben ser las que se ven desde el directorio donde ejecutas el programa, no el directorio donde está guardado `partner_1_pdb_list`.  `-ensemble1` corresponde a la lista de pdb de la proteína que está escrita en la parte superior del pdb de entrada y `-ensemble2` a la que está en la parte inferior del pdb de entrada. Ejecuta siempre esto antes de ejecutar el protocolo de docking para conjuntos.

Opciones
========

Opciones básicas del protocolo
------------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-docking:partners [P1\_P2] | El prepack se hace separando la cadena P1 y la cadena P2 | String |
|-docking:partners LH\_A (moves chain A around fixed chains L and H) | El prepack se hace separando la cadena A y el complejo LH. Ten en cuenta que esto será útil si planeas hacer docking entre la cadena A y el complejo LH. | String |
|-mp:setup:spanfiles <spanfile> | Lee un spanfile para el prepack de proteínas de membrana. Se crea la proteína de membrana y las proteínas acopladas se trasladan en el plano de la membrana. | StringVector |


Opciones de optimización
------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-docking::dock\_rtmin|Hace una prueba de rotámeros con minimización de cadenas laterales (consulta Wang, C et al, 2005 en las referencias) (nota: actualmente no está implementado en docking)|Boolean|
|-docking::sc\_min|Hace la minimización global de las cadenas laterales sobre todos los ángulos chi después del empaquetado.|Boolean|

Opciones comunes de Rosetta relevantes
--------------------------------------

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-s 1abc.pdb|1abc.pdb es el archivo pdb con el complejo proteína-proteína|
|-database [path to rosetta database folder]|La base de datos de Rosetta.|

Consejos
========

Salidas esperadas
=================

Un archivo PDB por cada estructura generada y un archivo de puntuaciones por cada ejecución, con la información de puntuación y nombre de cada estructura generada.

Novedades desde la última versión
=================================

Admite el distribuidor de trabajos moderno (jd2).

* [Tutorial de docking proteína-proteína](https://www.rosettacommons.org/demos/latest/tutorials/Protein-Protein-Docking/Protein-Protein-Docking): Primeros pasos con el docking
* [[Protocolo de docking|Docking Protocol]]: Protocolo principal para el docking proteína-proteína
* [[Aplicaciones de docking|Docking Applications]]: Página principal de las aplicaciones de docking
* [[Non-protein residues]]: Notas sobre el uso de moléculas que no son proteínas con Rosetta
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[RosettaScripts]]: Página principal de la interfaz RosettaScripts de Rosetta
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comandos de ejemplo para ejecutar archivos ejecutables de Rosetta

#Historia de la documentación de Rosetta

Históricamente, Rosetta ha tenido cinco grandes tipos, fuentes o ubicaciones de documentación:
* Documentación dentro del código que documenta clases y funciones de forma muy granular, la documentación de Doxygen
* Documentación de las aplicaciones que acompaña al código, escrita originalmente también en Doxygen, pero trasladada a esta wiki (la «wiki Gollum», o «wiki de documentación»)
* Una wiki privada de MediaWiki (como Wikipedia), llamada RosettaWiki
* Colecciones de demos, normalmente en una carpeta o repositorio asociado al código fuente
* Materiales suplementarios de varios artículos (los importantes probablemente están en el [[Rosetta Canon]])

Esta wiki (que además se sirve públicamente como páginas web estáticas para nuestros usuarios) se creó al principio a partir de un volcado de los documentos de aplicaciones de Doxygen, complementado con páginas trasladadas de MediaWiki.

La documentación de Rosetta ha solido centrarse en las necesidades del momento, no en el panorama general.  Como resultado, a menudo había muy poca documentación en algunos lugares (conceptos meta-Rosetta, organización, referencias cruzadas) y demasiada en otros (cinco páginas distintas sobre la instalación de Rosetta, todas con información más o menos correcta).

Primeros documentos
===================
La única documentación temprana que se conserva es la incluida en la literatura, en particular en los artículos del [[Rosetta Canon]] o en otros de nuestra lista de publicaciones.

RosettaWiki
===========
La RosettaWiki (privada) se creó hacia 2003. Al principio contenía todo tipo de documentación, además de material organizativo de RosettaCommons (como las agendas de las RosettaCON). Por desgracia, al ser una wiki web privada, no está integrada con el código ni disponible públicamente. Hemos ido trasladando la documentación fuera de esta wiki (aunque seguirá usándose para fines privados de RosettaCommons, como la planificación de las RosettaCON).

La época de Doxygen
============
En los [[primeros días|Rosetta timeline]] del desarrollo de «mini» (Rosetta3), se usó la documentación de Doxygen ([enlace web](http://www.doxygen.org) ([entrada de Wikipedia](http://en.wikipedia.org/wiki/Doxygen))) para [[documentar el código de forma granular|development_documentation/tutorials/doxygen-tips]].
Esta documentación nunca ha estado muy completa, pero sigue intacta y en uso, y la documentación generada está disponible [aquí](https://docs.rosettacommons.org/manuals/latest/).

Cuando los desarrolladores empezaron a tomarse en serio la escritura de documentación de aplicaciones, se quedaron con el sistema Doxygen que ya existía y lo usaron para generar páginas web con formato solo de la documentación de aplicaciones.

Por desgracia, ese sistema no duró mucho: el código de Rosetta es muy grande, y el procesamiento de Doxygen tanto del árbol de código fuente COMO de la documentación de aplicaciones tardaba un tiempo prohibitivo, debido a las herramientas de Doxygen para enlazar palabras clave automáticamente.
Ambas fuentes de documentación se mantuvieron, pero su propósito quedó dividido.
Doxygen es un formato de marcado pésimo para documentación de aplicaciones que es sobre todo prosa, así que los desarrolladores querían un formato de documentación más útil, lo que dio lugar a la wiki Gollum.

Wiki Gollum
===========
[[Después|Rosetta-timeline]] de que la comunidad de Rosetta pasara el código de SVN a GitHub, Tim Jacobs creó un prototipo del uso de un formato de wiki basado en git (Gollum) con la documentación de Rosetta. Esta wiki podía generarse a partir de archivos mantenidos con git en un repositorio de Rosetta que vivía junto al código, y también procesarse para su publicación como sitio de documentación HTML en vivo, cubriendo la mayoría de las necesidades. La wiki se pobló copiando toda la documentación de aplicaciones de Doxygen, junto con (con el tiempo) la mayor parte de la documentación de la RosettaWiki.

XRW 2015
==========
A pesar de todo el esfuerzo que dedicamos a escribir documentación, nunca se ha considerado buena. Parte del problema es que la organización siempre ha sido un reto. 
Rosetta está diseñado para resolver [el problema más difícil que conocemos](http://xkcd.com/1430), y por eso es, naturalmente, un programa muy complejo. 
La mayoría de los usuarios de Rosetta llegan entendiendo la ciencia, pero con pocos conocimientos sobre cómo usar interfaces de línea de comandos para interactuar con supercomputadoras, y comprensiblemente se frustran con un equipo desconocido y se sienten poco inclinados a perdonar al software con el que tienen problemas. 
La mayor parte del código de Rosetta (y de su documentación) la escriben programadores aficionados que son científicos profesionales, lo que da lugar a código torpe y a documentación escrita como una ocurrencia tardía.

En junio de 2015, la comunidad de Rosetta buscó mejorar su documentación y organizó una reunión de una semana durante la cual siete desarrolladores se juntaron durante jornadas de 15 horas para escribir todo lo que sabían y organizar todo lo que pudieran encontrar sobre Rosetta. 
Este proyecto se llamó e**X**treme **R**osetta **W**eek 2015: XRW2015.

Trabajamos principalmente en los siguientes proyectos:
* Reorganización  **Nota**: Sharon Guffy (guffysl) fue la principal responsable de mover páginas, organizarlas y enlazarlas, y por eso figura ahora como autora o última persona en actualizar muchas de las páginas de esta wiki.
	* Navegación útil por el código
		* barras laterales de navegación (¡las verás a la izquierda!) para cada directorio
		* secciones «véase también» al final de prácticamente todas las páginas
		* enlaces cruzados de la mayoría de los usos válidos de expresiones relevantes de Rosetta a artículos de la wiki y entradas del glosario
	* Reorganización de archivos y directorios 
		* Eliminación de archivos específicos de los directorios de nivel superior
	* Índices
		* Glosario de términos
		* Lista de servidores públicos
		* más subcarpetas, p. ej., para aplicaciones, RosettaScripts, etc.
			* Páginas índice para cada directorio
			* páginas individuales para cada etiqueta de RosettaScripts

* Meta-Rosetta
	* [[Analyzing results]]
	* [[Elegir la escala de muestreo|Rosetta-on-different-scales]]
	* [[Problemas que surgen en el modelado macromolecular|Challenges-in-Macromolecular-Modeling]]
	* [[Recursos educativos externos|Resources-for-learning-biophysics-and-computational-modeling]]
	* [[Historia de Rosetta|Rosetta timeline]]
	* La lógica de [[resolver un problema biológico|Solving-a-Biological-Problem]]
	* [[Incorporar datos experimentales como restricciones|Incorporating-Experimental-Data]]
	* [[El canon literario de Rosetta|Rosetta Canon]]

* Demos
	* La mayoría de los README de las demos de Rosetta se convirtieron en una wiki aparte. Debe permanecer separada por razones técnicas y no puede mostrar las entradas de las demos, etc., pero permite leer con facilidad los README de las demos.

* Información adicional
	* Se trasladaron los restos de MediaWiki y otros recursos disponibles externamente pero generalmente útiles (como correos largos a la lista de correo de los desarrolladores)
	* Documentación sobre peptidomiméticos

Capacidad de búsqueda
=============
Una parte importante del problema de la documentación de Rosetta es la capacidad de búsqueda y de descubrimiento de lo que ya se ha escrito. 
Hemos intentado abordar ambos problemas con la reescritura de XRW2015, pero las herramientas de búsqueda disponibles nos limitan un poco. 
La herramienta de búsqueda integrada de Gollum no es muy buena, y usar la búsqueda de páginas de Google es eficaz, pero inserta anuncios.

<!-- Hidden HTML Keywords for Searchability - (repeats to push it up the list)
History
History
History
History
History
History
History
History
History
History
History
History
Documentation
Documentation
Documentation
Documentation
Documentation
Documentation
Documentation
Documentation
Documentation
Documentation
XRW
Wiki
Wikipedia
Wikimedia
Doxygen
RosettaWiki
//-->

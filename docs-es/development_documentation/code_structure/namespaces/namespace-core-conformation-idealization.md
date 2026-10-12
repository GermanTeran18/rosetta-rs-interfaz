#Espacio de nombres core::conformation::idealization

**Este espacio de nombres ya no existe**

Valores ideales de longitud de enlace, ángulos de enlace y ángulos de torsión.

Descripción detallada
---------------------

Valores ideales de longitud de enlace, ángulos de enlace y ángulos de torsión.

La idealización es el subconjunto de la capa de conformación que se usa para asignar valores ideales de longitudes de enlace, ángulos de enlace y ángulos de torsión dentro de cada aminoácido.

Los valores ideales de los ángulos de enlace se determinaron a partir del artículo Engh, R.A. y Huber, R., 1991. Accurate bond and angle parameters for X-ray protein structure refinement. Acta Cryst. A 47: 392-400. Cuando estaba disponible, se usó el valor más preciso de CNS.

A cada átomo de un aminoácido se le asigna una clave ideal identificada por el tipo de parametrización CSD del artículo de Engh y Huber, y los átomos terminales se distinguen de los no terminales. Una tabla de enlaces ideales asocia pares de claves ideales con longitudes de enlace ideales. De manera similar, una tabla de ángulos de enlace ideales asocia tripletes de claves ideales con ángulos de enlace ideales. En el caso de los ángulos de torsión ideales, la tabla consta de dos colecciones: una que asocia cuartetos de claves de átomo ideales con ángulos de torsión ideales (para los valores genéricos de los ángulos de torsión de la cadena principal) y otra que asocia pares de clave de aminoácido y clave de cuarteto con ángulos de torsión (para los valores no genéricos de los ángulos de torsión de la cadena principal y los valores específicos de los ángulos de torsión de cadenas laterales). En estos casos, la búsqueda comprueba los valores específicos antes que los genéricos.

Una llamada para idealizar la cadena principal o una cadena lateral específica asignará valores ideales a las longitudes de enlace, los ángulos de enlace y los ángulos de torsión y tétradas, en ese orden. (Ten en cuenta que la idealización de las tétradas implica la conversión desde un ángulo de torsión equivalente). Sin embargo, las posiciones de los átomos no se actualizan hasta que ocurre un replegamiento (refold). Como el sistema trabaja con alta precisión, la idealización de las cadenas laterales de HIS, PHE, PRO, TRP y TYR deja sus anillos en un estado incoherente, y el replegamiento lo detectaría como un error. Para evitar esta situación, la idealización de esos anillos los repara reasignando varias longitudes y ángulos de enlace que la idealización ha vuelto incoherentes. El enfoque actual es simple y solo pretende mantener un estado coherente; se prevé que futuras versiones de la idealización ajusten de forma óptima los parámetros ideales de los anillos para que sean autocoherentes. Ten en cuenta que, en el código actual, los valores reasignados tendrán que actualizarse si se modifica cualquier valor ideal del que dependan.

Por último, al replegar tras la idealización, primero hay que establecer un punto de anclaje dentro de la proteína desde el cual replegar. Actualmente se proporcionan funciones para inicializar los átomos N, CA y C de cualquiera de los extremos en posiciones que coinciden con las geometrías ideales.

* [[src Index Page]]: Explica la organización del código de Rosetta en el directorio `src`
* Más espacios de nombres en core:
  * [[Espacio de nombres core::conformation|namespace-core-conformation]]
  * [[core::chemical|namespace-core-chemical]]
  * [[core::fragments|namespace-core-fragments]]
  * [[core::io::pdb|namespace-core-io-pdb]]
  * [[core::scoring|namespace-core-scoring]]
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores

#core::fragment

Resumen del directorio
======================

Fragment contiene clases y funciones relacionadas con el modelado con fragmentos de estructura.

Clases y archivos importantes de este directorio
================================================

###Los usuarios solo necesitan conocer estas clases


-   FragSet Una clase contenedora de fragmentos
-   FragmentIO Una clase de entrada y salida para leer y escribir FragSets
-   FragmentMover Un mover que toma un FragSet y aplica al Pose fragmentos elegidos al azar. Esta clase en realidad existe en la biblioteca protocols. Se menciona aquí como la interfaz principal del código de este directorio.


Archivos README, fragmentos de código y tutoriales
==================================================

Para información sobre cómo generar archivos de fragmentos, consulta la documentación del [[archivo de fragmentos|fragment file]]. 

Se pueden encontrar ejemplos de código que usa elementos de core::fragments en source/src/protocols/simple_moves/FragmentMover.* entre otros.  

Diseño del código, extensión y comentarios
==========================================

FragSet
=======

¡No te fíes de lo siguiente! Lo siguiente lo escribió Kristian Kaufmann a partir de impresiones basadas en un repaso superficial de Oliver.

Los FragSets contienen los datos básicos necesarios para las alteraciones de la conformación de polímeros basadas en fragmentos. El FragSet contiene Fragments para los frames del FoldTree. Un Frame contiene una lista de FragData para un conjunto concreto de residuos. Cada objeto FragData contiene una lista de objetos SingleResidueFragData. Cada objeto SingleResidueFragData describe cómo se relaciona el residuo con el residuo anterior y el posterior en el FoldTree. Hay distintas variantes de SingleResidueFragData (p. ej. BBTorsionSRFD, TorsionSRFD, JumpSRFD) para tener en cuenta el diverso número de conexiones del FoldTree.

Puedes "robar" fragmentos de Poses. Digamos que tienes un conjunto concreto de torsiones de la cadena principal en una proteína que te gustaría tener disponible para tu modelado. Puedes extraer ese fragmento del Pose de la siguiente manera

```
       //construct a Frame for the pos'th position of a pose with length len using BBTorsionSRFD (this is a rosetta++ like fragment)      
       FrameOP frame = new Frame( pos, new FragData( new BBTorsionSRFD, len) );      
       //steal the conformational data from pose      
       frame->steal(pose);      
       //add the frame to a fragset      
       fragset->add(frame);      
```

el fragset ahora contiene el fragmento y puede usarse con un FragmentMover.

Extensiones previstas, limitaciones conocidas y lista de deseos de cosas necesarias
===================================================================================

Ninguna por el momento

Índice del directorio
=====================

Archivos
--------

BBTorsionAndAnglesSRFD

BBTorsionSRFD

BaseCacheUnit

ConstantLengthFragSet

ConstantLengthFragSetIterator\_

FragCache

FragData

FragID

FragID\_Iterator

FragSet

FragSetCollection

FragmentIO

Frame

FrameIterator

FrameIteratorWorker\_

FrameList

FrameListIterator\_

JumpSRFD

JumpingFrame

OrderedFragSet

OrderedFragSetIterator\_

README

SRFD\_Implementations

SecstructSRFD

SingleResidueFragData

TorsionSRFD

core/fragment/util

Directorio
----------

core/fragment/io/

##Véase también

* [[Formato de archivo de fragmentos|fragment-file]]
* [[src Index Page]]: Explica la organización del código de Rosetta en el directorio `src`
* Más espacios de nombres en core:
  * [[Espacio de nombres core::conformation|namespace-core-conformation]]
  * [[core::chemical|namespace-core-chemical]]
  * [[core::conformation::idealization|namespace-core-conformation-idealization]] **YA NO EXISTE**
  * [[core::io::pdb|namespace-core-io-pdb]]
  * [[core::scoring|namespace-core-scoring]]
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores

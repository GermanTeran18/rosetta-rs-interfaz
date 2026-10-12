Historia de Rosetta
==================

Rosetta nació como un pequeño proyecto en el laboratorio de David Baker, en la Universidad de Washington.
Estaba escrito en FORTRAN y se centraba en la predicción de estructuras *ab initio* de proteínas pequeñas.

Con los años, las capacidades de Rosetta se ampliaron para incluir cosas como el diseño y el docking de moléculas pequeñas.
Para poder extender mejor sus capacidades, Rosetta se tradujo a C++. Esta versión se publicó como Rosetta2 o Rosetta++.

A pesar de este éxito, la estructura del código heredada de los primeros días en FORTRAN limitaba el desarrollo posterior.
Se puso en marcha un proyecto para reescribir Rosetta con buenas prácticas de programación orientada a objetos. Este código depurado se publicó como Rosetta3 
(también llamado «minirosetta» o «mini»). Rosetta3 permitió extender Rosetta a [[PyRosetta]], [[FoldIt]], [[RosettaScripts]], [[ROSIE|Rosetta-Servers]] y más.  

Cronología
--------

Nota: A lo largo de los años ha cambiado la nomenclatura de las versiones de Rosetta. Rosetta ha pasado de no tener control de versiones, a CVS, a SVN, a git/GitHub. Uno de los métodos de numeración más estables se deriva de los años de SVN y se extendió a los años de git. Estos números se indican a continuación empezando por «r», y denotan revisiones de SVN o fusiones de git a la rama master numeradas de forma continua con SVN.

* ????TODO
 * Se fundó RosettaCommons.
Es la organización que gestiona la propiedad intelectual de Rosetta.
Surgió por el hecho de que los posdoctorandos de David Baker, los primeros autores de Rosetta, habían abierto sus propios laboratorios en otros lugares y seguían desarrollando Rosetta.


* 2003-08
    * La primera reunión de [[RosettaCON|Glossary#rosettacon]]. RosettaCON es una reunión anual de usuarios y desarrolladores de Rosetta de todo el mundo.
A medida que Rosetta crecía, el mundo del desarrollo de Rosetta ya no se limitaba al laboratorio de David Baker.

* ?????TODO
    * [[Robetta|Rosetta-Servers]] se pone en línea, ofreciendo la generación de archivos de fragmentos y la predicción de estructuras de proteínas.

* 2003-11
    * Publicación de Top7, el primer diseño de una topología novedosa. [Kuhlman, et al.](http://www.sciencemag.org/content/302/5649/1364) 

* 2004-02 
    * Publicación de un protocolo de barrido de alaninas en Rosetta [Kortemme et al.](https://doi.org/10.1126/stke.2192004pl2)
    * El [servidor de barrido de alaninas de Robetta](http://old.robetta.org/) se pone en línea.

* 2005-06
    * Se lanzó [Rosetta@Home](http://en.wikipedia.org/wiki/Rosetta@home).

* Verano de 2005
    * Se publicó Rosetta 2.0. Rosetta++ era una traducción automática a C++ del código FORTRAN de Rosetta.

* 2006-09
    * Se publicó Rosetta 2.1 (r8080)

* Finales de 2006 a principios de 2007
    * Se comprobó que la traducción automática de Rosetta++ era inviable para seguir desarrollando. Se puso en marcha un esfuerzo para reescribir Rosetta con un diseño orientado a objetos. Con el nombre en clave «mini», este proyecto llegaría a ser Rosetta3. 

* 2007-02
    * Se publicó Rosetta 2.1.1 (r13074)

* Verano de 2007
    * El desarrollo de Rosetta3 está en marcha de forma decidida.

* 2007-11
    * Se publicó Rosetta 2.1.2 (r15394)

* 2007-09
    * Se publicó Rosetta 2.2 (r16310)

* 2008-01
    * La mayor parte del nuevo desarrollo pasa a la plataforma Rosetta3 

* 2008-04
    * Se publicó Rosetta 2.3 (r20729)

* Primavera de 2008
    * Publicación de dos artículos que demuestran el diseño de enzimas *de novo*. [Jiang, et al.](http://www.sciencemag.org/content/319/5868/1387) y [Röthlisberger, et al.](http://www.nature.com/nature/journal/v453/n7192/full/nature06879.html)

* 2008-05
    * Se lanza la beta pública de [Foldit](http://fold.it).

* 2009-02
    * Se publicó Rosetta 3.0 (r26316)
        * A Rosetta3 se le llama a veces «mini», el «nombre en clave» durante el desarrollo.

* 2009-09
    * Se publicó Rosetta 3.1 (r32532)

* 2009-11
    * Se publica la versión inicial de [[PyRosetta]].

* 2010-03
    * Se publicó Rosetta 2.3.1

* 2010-07
    * Diseño de una enzima para la reacción de Diels-Alder, una reacción sin precedentes en la naturaleza. [Siegel et al.](http://www.sciencemag.org/content/329/5989/309)

* 2010-11
    * Se publicó Rosetta 3.2 (r39284)

* 2011-02
    * Se publicó Rosetta 3.2.1 (r40885)

* 2011-06
    * Se publicó Rosetta 3.3 (r42941)

* 2012-03
    * Se publicó Rosetta 3.4 (r48002)
    * [ROSIE](http://rosie.graylab.jhu.edu/about) se pone en línea.

* 2012-06
    * Diseño de nanomateriales autoensamblables. [King, et al.](http://www.sciencemag.org/content/336/6085/1171)

* 2013-02
    * Se publicó Rosetta 3.5 (r53488)

* 2013-05
    * Rosetta pasa de svn a git para el control de versiones.

* 2013-08
    * Rosetta cambió la función de puntuación por defecto de [[score12|score-types#score12]] a [[talaris2013|score-types#talaris2013]]. (r55611)

* 2013-09
    * Diseño *de novo* de proteínas de unión a ligandos. [Tinberg, et al.](http://www.nature.com/nature/journal/v501/n7466/full/nature12443.html) 

* 2014-04
    * Rosetta pasa a un calendario de publicaciones semanales. La primera versión semanal es *Rosetta 2014.15.56658*

* 2016-06
    * Se publicó Rosetta 3.6 (es la misma que la semana 13 de 2016, con fecha del 1 de abril de 2016).

* 2016-09
    * Se publicó Rosetta 3.7 (es la misma que la semana 32 de 2016, con fecha del 9 de agosto de 2016).

* 2017-07
    * La función de puntuación por defecto de Rosetta cambia de Talaris14 a REF2015.  REF2015 es lo mismo que beta_nov15.

##Véase también

* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de términos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[Units in Rosetta]]: Explica las unidades de medida usadas en Rosetta
* [[Rosetta Canon]]: Artículos emblemáticos de Rosetta
* [[Scorefunction history]]: historia de la función de puntuación de Rosetta

<!-- Hidden keywords for Gollum's search tool (which is grep), repeats to bump in listing)
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
History
History
History
History
--->

Servidores de Rosetta
===============

[[RosettaCommons (enlace externo)|https://www.rosettacommons.org/about]] (el grupo de laboratorios que mantiene Rosetta) mantiene varios [servidores de uso académico público y gratuito (enlace externo)](https://rosettacommons.org/software/getting-started/). También hay servidores para uso comercial disponibles a través de un proveedor externo.

###Servidores públicos

* [ROSIE (enlace externo)](http://rosie.rosettacommons.org/) es un servidor que ofrece varias (14) aplicaciones de Rosetta mediante una interfaz web sencilla.
Es perfecto para quienes empiezan con Rosetta.
En lugar de lidiar con líneas de comandos de Rosetta, se te presenta una [[interfaz gráfica|https://en.wikipedia.org/wiki/Graphical_user_interface]] en una página web para cada aplicación.
Al rellenar el formulario web, el servidor recibe los datos que necesita para ejecutar tu trabajo de Rosetta.
A pesar de su variedad, ROSIE ofrece solo una parte de toda la funcionalidad de Rosetta, según las aplicaciones para las que los usuarios hayan escrito interfaces web.
Como es un recurso público gratuito, el tiempo de cómputo es limitado.
Las ejecuciones de ROSIE se pueden descargar y usar para construir trabajos de Rosetta que ejecutes en tus propios recursos locales.

* [ROBETTA (enlace externo)](http://robetta.bakerlab.org/) (Robot-Rosetta) es un servidor que ofrece plegamiento y predicción de estructura *[[ab initio|abinitio-relax]]*, así como selección de [[fragmentos|fragment-file]] para ejecuciones locales de Rosetta.
Es el servidor de Rosetta más antiguo, creado para ofrecer las funciones originales de Rosetta.
También ofrece [[escaneo de alaninas de interfaz|interface analyzer]] y [[escaneo de residuos de interfaz con ADN|Rosetta DNA]].

* El [Rosetta Design Server](http://rosettadesign.med.unc.edu/) da acceso al protocolo de diseño de cadena principal fija [[fixbb]] de Rosetta.

* El [Backrub Server](https://kortemmelab.ucsf.edu/backrub/cgi-bin/rosettaweb.py?query=index) ofrece conjuntos de [[backrub]], así como [[escaneo de alaninas|pmut-scan-parallel]].

* El [servidor FlexPepDock](http://flexpepdock.furmanlab.cs.huji.ac.il/) da acceso al refinamiento y al docking ab initio de péptidos de Rosetta dentro del bolsillo de un receptor [[flex-pep-dock]].

* El [servidor PIPER-FlexPepDock ](http://piperfpd.furmanlab.cs.huji.ac.il/) da acceso al docking global de Rosetta de un péptido sobre un receptor (cuando se desconoce el bolsillo de unión).

* [[FunHunt|http://funhunt.furmanlab.cs.huji.ac.il/]], abreviatura de funnel hunt (búsqueda de embudos), intenta distinguir las orientaciones correctas de complejos proteína-proteína de las orientaciones decoy.
Busca embudos del [[paisaje de energía|Glossary#general-terms_energy-landscape]] usando el código de docking de Rosetta.

* El [[servidor TCRmodel|https://tcrmodel.ibbr.umd.edu/]] modela estructuras de receptores de células T (TCR) a partir de la secuencia.

###Servidores comerciales/privados

* El servidor Bench de [[Cyrus Biotechnology (enlace externo)| https://cyrusbio.com]] es una aplicación web con interfaz gráfica para Rosetta que ejecuta los cálculos que solicitas en servidores seguros en la nube.  Esta herramienta está pensada para que los biofísicos accedan al poder de Rosetta sin necesitar formación específica en Rosetta, experiencia con la línea de comandos ni recursos locales de supercomputación.  Bench ofrece herramientas de modelado por homología (como Robetta), diseño de proteínas (RosettaDesign), cálculo de ddG y otras herramientas de modelado, como relajación y minimización.  <sub><sup>(Cyrus Biotechnology es una licenciataria comercial de Rosetta que ofrece a sus clientes una interfaz gráfica de usuario web para Rosetta.  Las tarifas de licencia que las licenciatarias comerciales de Rosetta pagan a la University of Washington se usan para apoyar a RosettaCommons, invirtiendo en el mantenimiento y el desarrollo futuro de Rosetta).</sup></sub>


##Véase también

* [[Graphics and GUIs]]: interfaces gráficas para Rosetta
* [[Application Documentation]]: lista de aplicaciones de línea de comandos de Rosetta
* [[Scripting Documentation]]: lista de interfaces de scripting de Rosetta
* [[PyRosetta]]
* [[RosettaScripts]]
* [[Sitio web de PyRosetta (enlace externo)|http://www.pyrosetta.org]]
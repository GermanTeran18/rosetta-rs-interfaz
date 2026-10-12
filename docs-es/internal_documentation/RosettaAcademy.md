#RosettaAcademy

Esta página está pensada para los miembros nuevos de la comunidad de Rosetta, como una forma «rápida» de aprender sobre Rosetta, cómo usarlo y cómo desarrollar en Rosetta, si es necesario. La página está organizada por dificultad creciente: empieza con las herramientas básicas necesarias, sigue con tutoriales para usuarios y después para desarrolladores. Si, al leerla, notas que faltan partes importantes, ¡agrégalas a la página!

[[_TOC_]]

![gollum](http://s2.quickmeme.com/img/86/86a343e34ab8ca051ce5a455eeba643a94b5f5dda96e558453d19f90cea15d99.jpg)

# 1. Introducción a la estructura de proteínas y su visualización
## Visualización
La mayoría de la comunidad usa PyMol (descárgalo en http://www.pymol.org/). La documentación sobre cómo usarlo se encuentra en:
* http://pymol.sourceforge.net/newman/userman.pdf 
* https://pymolwiki.org/index.php/Practical_Pymol_for_Beginners

Algunas personas usan Chimera (http://www.cgl.ucsf.edu/chimera/), que parece tener algunas funciones adicionales para mapas de densidad si trabajas con mapas de densidad electrónica de rayos X o mapas de crio-EM. Puedes encontrar tutoriales en https://www.cgl.ucsf.edu/chimera/tutorials.html

También existe Discovery Studio Visualizer para sistemas Scientific Linux y Windows:
* https://discover.3ds.com/discovery-studio-visualizer-download 

## Bioquímica básica
Para trabajar en Rosetta necesitas conocer algo de bioquímica básica sobre los aminoácidos y la estructura de las proteínas. Puedes aprenderlo con un libro de bioquímica (como Voet & Voet: Biochemistry) o consultando:
* http://www.rpi.edu/dept/bcbp/molbiochem/MBWeb/mb1/part2/protein.htm
* http://www.ruppweb.org/xray/tutorial/protein_structure.htm

## Foldit (desarrollado por el Center for Game Science de la UW, el laboratorio Baker y UMass Dartmouth (Firas Khatib))
Foldit es un videojuego creado para que el público general resuelva rompecabezas científicos reales sobre la estructura y función de las proteínas. Es un excelente punto de partida para aprender sobre la estructura de las proteínas, ya que no requiere conocimientos previos. Una vez que lo descargas, te guía por tutoriales en los que aprendes todos los movimientos y modificaciones que puedes hacer a una estructura de proteína, con mucha diversión por el camino. Ten en cuenta que la terminología que usa Foldit es algo distinta de la que usamos en Rosetta (aunque el código que hay debajo de Foldit es código de Rosetta), pero si entiendes los conceptos con Foldit, puedes aplicarlos fácilmente en Rosetta. Además, la puntuación en Foldit es la opuesta a la de Rosetta: en Foldit una puntuación más alta es mejor; en Rosetta se busca una energía más baja.

Descárgalo en <https://fold.it>

## Eterna, para ARN (desarrollado por Rhiju Das, Stanford)
Hay una herramienta similar a FoldIt para ARN. Fue desarrollada por el laboratorio de Rhiju Das en Stanford (http://www.stanford.edu/~rhiju/). Puedes jugar y aprender sobre ella aquí: <https://eternagame.org/>

## Introducción a Linux
Para saber cómo moverte por una terminal en Linux, necesitas aprender algunos comandos básicos. Aprender algunos trucos básicos de programación en BASH suele ser útil para agilizar tu flujo de trabajo. Hay muchos recursos disponibles en la web: 
* http://www.my-guides.net/en/guides/linux/basic-linux-commands
* http://www.debianhelp.co.uk/commands.htm

# 2. Introducción a Rosetta
Rosetta es un paquete de software unificado para la predicción de la estructura de proteínas y el diseño funcional. Se ha usado para predecir estructuras de proteínas con y sin la ayuda de datos experimentales dispersos, realizar docking proteína-proteína y proteína-molécula pequeña, diseñar proteínas nuevas y rediseñar proteínas existentes para alterar su función. Rosetta permite probar rápidamente hipótesis en la investigación biomédica que serían imposibles o exorbitantemente caras de realizar con los métodos experimentales tradicionales. Por ello, los métodos de Rosetta son cada vez más importantes en la interpretación de hallazgos biológicos, p. ej., de proyectos genómicos, y en la ingeniería de terapias, moléculas sonda y sistemas modelo en la investigación biomédica.

Conceptos de Rosetta:
Las siguientes páginas describen un puñado de conceptos de Rosetta muy importantes, como FoldTree, AtomType, MoveMap, etc.
* [[Rosetta-overview]]
* [[Rosetta-Basics]]

Algunos artículos muy útiles sobre Rosetta:
* Kaufmann, Lemmon, DeLuca, Sheehan, Meiler: "Practically Useful: What the Rosetta Protein Modeling Suite Can Do for You" Biochemistry 2010: http://pubs.acs.org/doi/abs/10.1021/bi902153g
* Rohl, Strauss, Misura, Baker: "Protein Structure Prediction Using Rosetta", Methods in Enzymology, 2004: http://www.sciencedirect.com/science/article/pii/S0076687904830040 - ¡¡¡contiene la función de puntuación!!!
* Leaver-Fay et. al: "ROSETTA3: An Object-Oriented Software Suite for the Simulation and Design of Macromolecules" Methods in Enzymology 2011: http://www.sciencedirect.com/science/article/pii/B9780123812704000196


# 3. Documentación
## Glosario: Rosetta y términos técnicos
Aquí tienes algunos enlaces útiles que te ayudarán a entender la terminología que se usa en Rosetta. 
* [[Rosetta-overview]]
* [[Glossary]]

Algunos conceptos también se explican en los tutoriales de PyRosetta:
* http://www.pyrosetta.org/documentation/tutorials

## Documentación
Hay una documentación considerable disponible dentro de esta wiki. Hay documentación adicional aquí:  https://www.rosettacommons.org/manuals/archive/rosetta3.4_user_guide/index.html. 

## Tutoriales
Puedes encontrar excelentes tutoriales detallados que cubren muchos aspectos de Rosetta aquí:
https://www.rosettacommons.org/demos/latest/Home#tutorials

## FAQ/Foro
La página principal de RosettaCommons es https://www.rosettacommons.org/. En esta página hay un foro donde puedes publicar preguntas o buscar respuestas a tu problema concreto (https://www.rosettacommons.org/forum).


# 4. Material de cursos
Hay material de cursos disponible de varios laboratorios que dieron clases sobre Rosetta. El material se puede encontrar en github, en los recursos didácticos: https://github.com/RosettaCommons/teaching_resources

Clases sobre Rosetta (que siguen de cerca el libro de PyRosetta): http://goo.gl/GuUNDK


# 5. Rosetta para usuarios
## Descargar y compilar Rosetta, control de versiones con git
Si no vas a desarrollar en Rosetta, puedes descargar la versión publicada aquí : https://www.rosettacommons.org/

Pero si estás leyendo esto, lo más probable es que vayas a desarrollar o al menos a ejecutar código nuevo. En ese caso tienes que descargar y compilar Rosetta desde Github. Sigue las instrucciones sobre cómo descargar y compilar Rosetta aquí: 
https://wiki.rosettacommons.org/index.php/GithubWorkflow

Quizá quieras mirar el servidor de pruebas (https://benchmark.graylab.jhu.edu/) para averiguar cuál es la última revisión en la que pasan todas las pruebas y obtener esa revisión. Si obtienes la última revisión, puede que no pasen todas las pruebas y que estés descargando una versión «rota». Si todavía no entiendes mucho sobre git y github, no te preocupes: entrarás en mucho más detalle más adelante, cuando estés desarrollando activamente en Rosetta (véase más abajo).

## Tutoriales del Meilerlab (preparados por el laboratorio de Jens Meiler, Vanderbilt University)
El laboratorio Meiler ha organizado en el pasado talleres de una semana (normalmente en primavera) para miembros de la comunidad, personas externas y personas de la industria. Son un excelente punto de partida sobre cómo ejecutar Rosetta, ofrecen mucha información sobre cómo preparar archivos de entrada y cómo procesar la salida de Rosetta. La carpeta zip se puede descargar y descomprimir: contiene subcarpetas para varias aplicaciones de Rosetta, entre ellas plegamiento de proteínas, docking, diseño, docking de ligandos y modelado de loops. Se proporcionan archivos de entrada y se supone un conocimiento previo mínimo para seguirlos (como PyMol o Linux). ¡Tienes que descargar y compilar Rosetta para ejecutar estas aplicaciones!

Descarga los tutoriales en <https://meilerlab.org/tutorials/>

## Demos
Una vez que hayas descargado y compilado Rosetta, también puedes consultar la carpeta demos en `Rosetta/demos`. Esta carpeta contiene subcarpetas con demostraciones fáciles de seguir y capturas de protocolos de aplicaciones concretas. En las carpetas hay archivos de entrada, archivos readme y líneas de comando. 

# 6. Rosetta para usuarios y desarrolladores
## Python
Es útil saber python cuando quieres usar PyRosetta o escribir scripts para preparar archivos de entrada o analizar datos. 
* tutorial detallado: https://docs.python.org/2.7/tutorial/
* tutorial interactivo: http://www.learnpython.org/
	
* hoja de referencia rápida: http://www.cogsci.rpi.edu/~destem/gamedev/python.pdf
* otra más: http://pythonkit.com/Python-Cheat-Sheet-download-w370.pdf
	
* libro: http://www.amazon.com/Python-Dummies-Stef-Maruch/dp/0471778648/ref=sr_1_1?s=books&ie=UTF8&qid=1375469160&sr=1-1&keywords=python+for+dummies

## C++
Si quieres desarrollar en Rosetta, necesitas aprender C++. Si nunca has escrito scripts o no sabes nada de programación, se recomienda que empieces con algo más fácil que C++, como Python (o Perl), para aprender lo básico. Si tienes experiencia con scripts u otra programación, estas son referencias útiles:
	
* videos cortos en línea: tutoriales de Bucky: http://www.youtube.com/watch?v=tvC1WCdV1XU&list=PLC6E50B89DA30C77A
	
* libro: Sam's teach yourself C++ in 21 days: https://www.amazon.com/Sams-Teach-Yourself-Days-5th/dp/0672327112

## ROSIE (creado por Sergey Lyskov, laboratorio de Jeff Gray, Johns Hopkins)
ROSIE es la abreviatura de «Rosetta Online Server that Includes Everyone». Es un servidor que ejecuta varias aplicaciones de Rosetta sin requerir conocimientos de Python, C++ ni nada difícil. Es perfecto para principiantes; sin embargo, solo hay pocas aplicaciones disponibles y algunas son muy especializadas; habrá más en el futuro. Échale un vistazo en https://rosie.rosettacommons.org/. Además, si eres desarrollador de RosettaCommons y planeas configurar un servidor en ROSIE para tu propia aplicación, contacta con Sergey Lyskov en sergey.lyskov[at]gmail.com y te dará instrucciones sobre cómo hacerlo. ¡Debería ser bastante rápido y fácil, con unas dos páginas de código o menos!

## PyRosetta (desarrollado por el laboratorio de Jeff Gray, Johns Hopkins)
Si sabes Python y planeas crear tus propios protocolos, PyRosetta (desarrollado en el laboratorio de Jeffrey Gray en Johns Hopkins) es una excelente forma de usar Rosetta y manipular estructuras de proteínas (si no sabes Python, es mucho más fácil si lo aprendes antes de sumergirte en PyRosetta). PyRosetta es básicamente un envoltorio de Python alrededor del código C++ de Rosetta, de modo que puedes hacer prácticamente todo con Python sin saber C++. Sin embargo, para reescribir código se recomienda hacerlo en C++. Los tutoriales de PyRosetta se pueden encontrar en <https://www.pyrosetta.org/documentation/tutorials>

## RosettaScripts y RosettaDiagrams (desarrollados por el laboratorio de Sarel Fleishman, Weizmann Institute, Israel)

RosettaScripts es una interfaz programable con XML que permite a los usuarios combinar protocolos y realizar tareas personalizables para diversos protocolos. Hay instrucciones detalladas sobre cómo configurarlos en [[RosettaScripts]]

## CS-Rosetta (desarrollado por el laboratorio de Oliver Lange, TU Munich, Alemania, y Nik Sgourakis, UCSC y Children's Hospital of Philadelphia )
CS-Rosetta es una versión de Rosetta que usa restricciones de desplazamiento químico de RMN para el plegamiento ab initio o la predicción de estructuras. La caja de herramientas de CS-Rosetta también incluye la asignación automática de resonancias NOE.
* http://www.csrosetta.org/
* https://csrosetta.chemistry.ucsc.edu/

## Control de versiones
Si planeas desarrollar en Rosetta y quieres armar tus propios protocolos y escribir código, ahora es el momento de aprender más sobre el control de versiones y todo lo que conlleva. El control de versiones es básicamente un historial del código base (similar a cuando pulsas el botón «guardar» en un documento) que se necesita cuando más de 100 desarrolladores de todo el mundo trabajan en el código al mismo tiempo. Hace mucho más fácil resolver conflictos de código (cuando varias personas trabajan en el mismo código) y mucho más difícil «romper» Rosetta, aunque no es completamente imposible. ;o)

Hay información ampliada de la introducción anterior aquí: [[GithubWorkflow]], pero se sugiere familiarizarse íntimamente con varios comandos de git. Hay varios recursos en línea, entre ellos:
* bien explicado, no demasiado largo: http://gitref.org/
* hoja de referencia más corta: https://www.kernel.org/pub/software/scm/git/docs/everyday.html
	
## IDE:
Para escribir y desarrollar código es mucho más fácil si tienes un IDE (Entorno de Desarrollo Integrado) disponible. Básicamente es un editor y compilador que además se vincula con el control de versiones y tiene un montón de pequeñas funciones útiles, como enlazar a funciones que están en otra parte del código, completar corchetes, sangría, encontrar errores, etc. Los dos IDE que se usan habitualmente son 

* Xcode - para Mac: https://wiki.rosettacommons.org/index.php/Tools:XCode
* VsCode - cualquier plataforma: https://code.visualstudio.com/ La navegación por el código C++ funciona de inmediato.
* Eclipse - cualquier plataforma: https://wiki.rosettacommons.org/index.php/Tools:Eclipse
* Netbeans - cualquier plataforma: https://netbeans.org
Habla con tu mentor sobre qué programa cree que es mejor, para que también pueda aconsejarte sobre cómo usarlo. Y no te desanimes: lleva un tiempo descubrir los detalles.

## Convenciones de programación
Ahora que conoces el control de versiones, has configurado tu IDE y tienes conocimientos de C++, debes leer las convenciones de programación y cumplirlas: ¡¡¡sin excusas!!! A la larga, esto hará mucho más fácil que otras personas (y tú mismo) lean, entiendan y usen tu código de la manera prevista. Esto también se aplica al código Python:
* [[Coding-Conventions]]

## Cómo encontrar cosas en Rosetta
Cuando descargas Rosetta, hay varios directorios de nivel superior distintos
* source
* database
* tests
* tools
* documentation
* demos
* rosetta_scripts_scripts
* PyRosetta.notebooks
* pyrosetta_scripts

Los ejecutables se encuentran en Rosetta/source/bin: son enlaces a ejecutables que están más profundo en el código

En Rosetta siempre se dice «El código es la documentación», lo cual es bonito si sabes leer código, pero no tanto si no sabes. Por eso, cuando escribas código, documéntalo en dos lugares: 
* documentación para desarrolladores: dentro del código, con comentarios para que doxygen cree documentación html
* documentación para usuarios: aquí, en la wiki gollum, para el usuario
	
Escribe la documentación de modo que las personas que no estén familiarizadas con cada detalle de tu código puedan entenderla, pero ten presente a quién va dirigida tu documentación: el usuario o el desarrollador. Mantén el estilo de documentación correcto en los lugares correctos. 

## Documentación de Doxygen y de la API
La documentación a nivel de usuario es un recurso útil para aprender cómo funcionan los protocolos de Rosetta y cómo usarlos. Sin embargo, como desarrolladores es importante mantener también una documentación más detallada de la API (Application Programming Interface, interfaz de programación de aplicaciones) que detalle cómo navegar por conceptos y métodos específicos de la biblioteca de Rosetta. 

Mantenemos la documentación de la API con Doxygen, un paquete de software que analiza el código fuente de Rosetta y genera documentación html a partir de la documentación dentro del código. Esto se puede hacer usando etiquetas especializadas (p. ej., @brief, @details, @author, @note, etc.) al comentar el código. Los detalles para escribir documentación doxygen dentro del código se encuentran en: 
* [[Doxygen tips]]
* https://wiki.rosettacommons.org/index.php/Tools:Doxygen

## Enlaces útiles
Hay muchos enlaces útiles relacionados con Rosetta, además de los ya descritos:
* Página de nuevos desarrolladores: (solo para personas internas de RosettaCommons) https://wiki.rosettacommons.org/NewDevelopersPage

* Servidor Robetta: servidor en línea para varias aplicaciones: http://robetta.bakerlab.org/
	
* Servidor RosettaBackrub: laboratorio Kortemme, UCSF: https://kortemmeweb.ucsf.edu/backrub/
	
* Servidor RosettaDesign: laboratorio Kuhlman, University of Chapel Hill, NC: http://rosettadesign.med.unc.edu/
	
* Levitate: servicio de pago por uso para la comunidad experimental: https://levitate.bio/
	
* Rosetta@home: dona tiempo de tu computadora a RosettaCommons para resolver problemas científicos cuando no la estés usando: http://boinc.bakerlab.org/rosetta/
	
* código fuente en github (requiere una cuenta de github): https://github.com/organizations/RosettaCommons


# 7. Más Rosetta para desarrolladores

## [[Generación de plantillas de código | code_templates ]] 
Cómo generar plantillas de código de clases, aplicaciones y pruebas unitarias comunes de Rosetta para ahorrar tiempo de desarrollo.  En serio, ¿quieres escribir un mover?  ¡Empieza aquí! ```Rosetta/source/code_templates```

Este es un ejemplo de cómo crear un nuevo mover para carbohidratos:
```
./generate_templates.py --type mover --class_name TestMover --brief "A simple testing Mover" --namespace protocols carbohydrates
```

## Licencias

Actualmente Rosetta tiene una licencia gratuita para uso no comercial. Las tarifas de licencia por el uso de Rosetta con fines de lucro ayudan a financiar el desarrollo y el mantenimiento de Rosetta, así como la misión científica de RosettaCommons. Para obtener una licencia comercial, consulta la información en  https://www.rosettacommons.org/software/license-and-download

Por ello, cualquier código que agregues a Rosetta debe ser compatible con esos términos. Para obtener la capacidad de agregar código a Rosetta como desarrollador, firmaste el acuerdo de desarrolladores (http://rosettadesign.med.unc.edu/agreement/agreements.html) o un Acuerdo de licencia de colaborador (insert link) que también contenía información sobre licencias de software de terceros. Consulta también la página de la wiki aquí (https://wiki.rosettacommons.org/index.php/Licensing). Una buena regla general es NO usar nada con licencia GPL o LGPL.

## Bootcamp (preparado por Andrew Leaver-Fay y otros miembros de Commons)
El Rosetta Bootcamp se impartió por primera vez en abril de 2013 como un taller de una semana para desarrolladores principiantes de Rosetta. Contenía tanto clases como laboratorios donde los participantes aplicaban sus conocimientos recién aprendidos bajo la supervisión de varios desarrolladores de Rosetta.

El material completo de 24 horas (dividido en clases y laboratorios de videos de hasta 90 minutos) se puede ver en youtube:
	https://www.youtube.com/watch?v=2qQLdc0tmdg&list=PLaF-DHLR9l7wGTMldDNnZK7nA00eFHEH6
	
Puede ser mejor no seguir el orden que sigue youtube, sino el calendario original (https://docs.google.com/spreadsheet/ccc?key=0ArYNPpJXYWK8dHdjZEc4dGxIWnBvYko5OTZ5RFB3cHc#gid=0), ya que se impartió en ese orden. 

A continuación se muestra el contenido de las clases y laboratorios individuales:
* Laboratorio nocturno 1	Mover en RosettaScripts
* Laboratorio nocturno 2	uso de grafos para identificar redes de enlaces de hidrógeno
* Laboratorio nocturno 3	Puntuación de una interfaz de proteínas
* Laboratorio nocturno 4	ResourceManager
* Laboratorio 1: 	Git
* Actividad del laboratorio 1:	Git
* Laboratorio 2: 	Estructura de la biblioteca 1: escribir un Mover en una aplicación
* Actividad del laboratorio 2: 	Estructura de la biblioteca 1: escribir una aplicación para puntuar un Pose, escribir un mover, usar jd2
* Laboratorio 3: 	GDB
* Actividad del laboratorio 3:	GDB
* Laboratorio 4: 	Pruebas unitarias
* Actividad del laboratorio 4:	Pruebas unitarias
* Laboratorio 5: 	Clases de C++ 3: operadores, copia
* Actividad del laboratorio 5: 	Clases de C++ 3: operadores, copia, punteros
* Laboratorio 6: 	FoldTree
* Actividad del laboratorio 6: 	FoldTree
* Laboratorio 7: 	Python
* Actividad del laboratorio 7:	Python
* Laboratorio 8: 	Herramientas de Unix
* Actividad del laboratorio 8:	Herramientas de Unix
* Laboratorio 9: 	Restricciones
* Actividad del laboratorio 9: 	Restricciones
* Laboratorio 10: 	Estructura de la biblioteca 6: Packer, minimizador
* Clase 1: 	C++ 1: clases, encapsulación, polimorfismo 
* (Clase 1: 	C++ 1 (contenido))
* Clase 2: 	Asignación de memoria, pila, heap, punteros
* Clase 3: 	C++ 2: const, firmas de funciones, sobrecarga, funciones estáticas
* Clase 4: 	Grafos
* Clase 5: 	Estructura de la biblioteca de Rosetta 2: teoría
* Clase 6: 	Estructura de la biblioteca de Rosetta 3: aplicaciones: Packer, AtomTree, FoldTree, DoF, MoveMap
* Clase 7: 	Protocolos de Rosetta 1: JobDistributor, RosettaScripts, ResourceManager
* Clase 8: 	Estructura de la biblioteca de Rosetta 5: aplicaciones: Movers, Filters, Taskoperations, fragmentos, loops
* Clase 9: 	Pensamiento computacional
* Clase 10: 	Bases de datos: SQL

## Ejecutar código y git
* crea un directorio aparte, fuera de Rosetta, donde ejecutes tus ejecutables y crees archivos; debe estar separado porque tus archivos de salida adicionales (y los datos) no deben incluirse en el código base
* acostúmbrate a agregar un archivo nuevo a git inmediatamente después de crearlo en source; esto facilitará mucho las cosas cuando quieras hacer commit

## Dónde poner tu código nuevo
Cuando empieces un proyecto de programación, crea una rama nueva y empieza a programar. **¡¡¡NO PONGAS TU CÓDIGO EN /devel/ PORQUE SE ELIMINARÁ GRADUALMENTE!!!** Si no quieres que tu código se publique todavía, mantenlo en tu rama hasta que estés listo para fusionarla en main.

Si estás escribiendo un marco completamente nuevo, PUEDE que tenga sentido crear un subdirectorio en /core/. Además, asegúrate de tener en cuenta qué otro código o bibliotecas usas en tu código, porque deben compilarse ANTES que cualquier parte de tu código; de lo contrario, tendrás errores irresolubles en tiempo de compilación. Si no estás seguro, pregunta a alguien. 

## Notas sobre el diseño del código y el flujo de implementación
* antes de escribir código, escribe el diseño del código con todo detalle: cuáles son las interfaces entre todos los objetos y clases que vas a crear, qué funciones necesitas (y quizá necesiten otras personas)? 
  * ¡Piénsalo muuuucho y bien, porque si implementas algo a medio pensar, pasarás 10 veces más tiempo refactorizándolo! 
  * Además, escribir el código en sí solo debería llevarte una fracción del tiempo que dedicaste a diseñarlo. Y un buen diseño del código es una de las cosas más importantes al escribir C++ en Rosetta, porque todo es muy complejo, ¡más aún cuando eres un desarrollador principiante!
  * al diseñar, evita el diseño circular en tu código: es desordenado y puede ser difícil de compilar; ¡usa un diseño de código en forma de árbol! 
  1. el diseño del código debe seguir un enfoque descendente: empieza con tu interfaz y luego diseña tus clases y funciones más pequeñas
  2. la implementación del código debe seguir un enfoque ascendente: implementa primero las clases y funciones más pequeñas, y luego las que dependen de ellas
* después de decidir una interfaz, escribe tu archivo de cabecera con todas las funciones, argumentos de entrada y tipos, ¡y asegúrate de que tenga sentido!
* después de escribir la cabecera, empieza a escribir tu prueba unitaria y piensa en cada una de las funciones que quieres probar: cuanta más cobertura de código, mejor, ya que esto acortará enormemente tu tiempo de depuración:
  * piensa en todos los casos límite posibles y pruébalos para tu función
  * la función se implementa en el código fuente, no en la prueba
  * en la prueba unitaria la función no se implementa, sino que se usa
* al mismo tiempo, implementa las funciones en el archivo .cc:
  * da una salida que avise al usuario si algo no funciona
  * de nuevo: hay que manejar todos los casos límite
* escribir y compilar las pruebas unitarias mientras implementas la función va prácticamente de la mano, pero, como las pruebas unitarias existen, depurar debería ser mucho más fácil; además, implementar ambas a la vez te permite pensar en cómo escribir mejor funciones que se puedan probar; en este orden:
  1. primero compila el código fuente
  2. compila la prueba unitaria
  3. ejecuta la prueba unitaria
* depura tu código
* LIMPIA TU CÓDIGO 

## Más notas
* elige nombres para clases y funciones que sean AMIGABLES tanto para el usuario COMO para el desarrollador. Si tu nombre podría interpretarse de otra manera, elige uno distinto 
* para refactorizar, es más fácil crear archivos nuevos y copiar lo que necesitas que reescribir código antiguo
* depurar y refactorizar siempre es más fácil si primero pones los archivos en los lugares correctos y luego escribes pruebas unitarias para ellos
* probar la inexistencia: solo se puede hacer de forma indirecta y no directa, ya que quieres que el programa falle, pero ¿cómo lo pruebas? Una forma de manejarlo es escribir los existentes en un vector y luego preguntar si el vector contiene tu elemento de interés

## Compilar y ejecutar código
* `src` y `test` son directorios (más o menos) espejo. Pon tus clases en `src` y tus pruebas unitarias en `test`.
* para compilar y ejecutar una clase en `src`:
  * pon `<class>.hh`, `<class>.cpp` en el archivo `<library>.src.settings`
  * para clases, ejecuta `scons.py`
* para compilar aplicaciones:
  * pon `<main>.cc` en el archivo `pilot_apps.src.settings.all`
  * para aplicaciones, ejecuta `scons.py bin mode=release`
  * esto crea un binario de tu aplicación (y de todas las aplicaciones, de hecho) en el directorio `bin`
* para compilar y ejecutar pruebas unitarias:
  * lista tu archivo `<name>.cxxtest.hh` en el archivo `test/<module>.test.settings` correspondiente
  * asegúrate de agregar cualquier archivo de entrada adicional (p. ej. `tracer.u`, `input.pdb`) en la sección `testinputfiles`.
  * compila: `scons.py cat=test`
    * no compilará si comentas pruebas completas
    * evita un salto de línea entre `void` y `test_mytest()`
    * pon `<module>_init();` en el método `setUp()`
  * ejecuta: `test/run.py -d \<database\> -1 \<class_name, w/o extensions or prefixes\> -c \<compiler\>`
    * puede que no se ejecute si omites el compilador en la línea de comandos
* lo mejor es compilar el código fuente con `scons.py -j4` y luego compilar y ejecutar las pruebas
* en `cxxtest.hh`, no uses comentarios de bloque (`/* */`) para comentar pruebas: la compilación fallará 


## Depuración
A continuación hay algunas técnicas útiles para depurar código en Rosetta. A la mayoría de los programadores les sorprendería muchísimo que su código compilara y se ejecutara a la primera. Depurar es prueba y error y requiere algo de creatividad. A menudo es mejor suponer que tu código está mal (lo más probable es que lo esté) y sorprenderte cuando tu código compile y todas las pruebas tengan éxito. :o)

Herramientas y trucos
 * **Usar un IDE:** el IDE mostrará advertencias y posibles errores de compilación 
 * **Herramientas de análisis estático:** compiladores como clang compilarán tu código y además analizarán algunos posibles errores de ejecución
 * **Depurador:** un depurador te permite fijar puntos de interrupción en tu código y avanzar línea por línea para localizar el error. Algunos depuradores independientes comunes son gdb y lldb. Estos depuradores también están integrados en IDE como XCode y Eclipse. 

Al compilar y depurar código, dedica tu tiempo a los errores más difíciles y menos a los triviales. Antes de compilar, comprueba siempre: 
* Que has incluido tu archivo fwd.hh y que tiene el formato correcto. 
* Que tu clase o prueba unitaria está listada en el archivo src.settings o test.settings correcto
* Que tu código respeta la estructura de la biblioteca, es decir, que no estás haciendo #include de nada que se compile después de tu código. Por ejemplo, no puedes usar un pose en código de conformation porque pose está en core.3 pero conformation está en core.2.
* Que no hay espacios de nombres declarados implícitamente. Siempre debes especificar el espacio de nombres completo de un método que uses, ya sea en línea o con una declaración 'using namespace'. Esto podría llevar a cierta ambigüedad y a errores de ejecución «difíciles de depurar». 
* Que siempre inicializas todos los campos en el constructor de una clase. 
* Para las pruebas unitarias, agrega un tracer al comienzo de cada prueba unitaria que actúe como descripción de esa prueba. Esto te ayudará a descifrar con más facilidad qué prueba falló

Algunos consejos útiles para depurar: 
Si falla la compilación, algunas buenas primeras cosas que comprobar:
  1. includes 
  2. espacios de nombres
  3. tipos (punteros y referencias)
  4. ámbito («use of undeclared identifier XXX»)
  5. implementaciones en AMBOS archivos, de cabecera y cc («is not a member of...») 
  6. posibles desreferencias de punteros nulos («Assert p_ != 0 failed...») 

Otros consejos: 
* **Haz siempre pruebas unitarias de abajo hacia arriba:** prueba tus «piezas» de código más pequeñas y con menos dependencias, y luego sube. Esto te ayudará a descartar otro código sin probar como fuente de error. 
* **Traza de llamadas (back trace):** como las bibliotecas de Rosetta son muy profundas, a menudo puedes obtener errores de ejecución lanzados desde clases de utilidades que no tienen nada que ver con el error real. Un depurador te permite hacer un back trace: imprimir todas las llamadas que llevaron al error, lo que te ayudará a localizar qué salió realmente mal.  
* **Las sentencias de impresión son una herramienta poderosa:** avanzar por tu código imprimiendo valores te ayudará a entender qué hacen tus métodos y cómo pueden llevar a un comportamiento propenso a errores (aunque asegúrate de eliminar estos tracers cuando termines).
* **No sé qué significa mi mensaje de error:** si todavía no sabes qué significa un mensaje de error, probablemente alguien ya se ha encontrado con ese error. Consulta la lista de desarrolladores o, si es un error genérico de C++, Google puede ser increíblemente útil. Además, depurar es en gran medida prueba y error: requiere creatividad y persistencia :)
* **Programa y prueba a la defensiva:** para escribir buen código, imagina que tu usuario es un mono que intenta encontrar un error en tu código. Piensa en todos los casos límite posibles y asegúrate de manejarlos en tu código. 
* **Avanza por tu código usando comentarios:** comenta todo el contenido de una función y ejecútalo línea por línea hasta que descubras el origen del error. 

## Depuración de fallos de segmentación
1.  Compila en modo de depuración.  (`./scons.py -j 8 mode=debug bin`).
2.  Ejecuta tu protocolo con gdb (o lldb en Mac).  Son depuradores que te permiten detener tu aplicación mientras se ejecuta e inspeccionar la pila de llamadas (qué función se estaba ejecutando, qué función la llamaba, qué función llamaba a esa, etc.) y los valores de las variables en puntos arbitrarios.
`gdb --args <path_to_Rosetta>/main/source/bin/<your_app>.default.linuxgccdebug @rosetta.flags`
o
`lldb -- <path_to_Rosetta>/main/source/bin/<your_app>.default.macosdebug @rosetta.flags`
3.  Escribe `catch throw` (gdb) o `break set -E C++` (lldb).
4.  Escribe `run`.
5.  Espera al segfault.  Cuando ocurra, escribe `bt` (gdb o lldb) para obtener un backtrace.  Si quieres obtener ayuda para depurar, publica el backtrace para otros desarrolladores.  Muestra qué llamaba a qué cuando ocurrió el segfault.
6.  Recorre los marcos con `f 0`, `f 1`, `f 2`, etc. (gdb o lldb).  Puedes ver en qué parte del código estás con `list`, imprimir valores de variables con `print <variable_name>`, etc.
En este punto, es trabajo de detective.  Un segfault generalmente significa que se está accediendo a la memoria de forma inválida (p. ej., acceder al elemento 11 de un vector de 10 elementos).  Es bastante fácil averiguar a qué se estaba accediendo, pero tienes que averiguar por qué ocurre.

## Algunos errores complicados o difíciles de depurar y sus soluciones 
A continuación hay una lista no exhaustiva de errores bastante ambiguos de depurar. Siéntete libre de agregar los que resuelvas: 

Código de la biblioteca: 
 * Constructores: en C++ es buena práctica inicializar todos los miembros de datos en el constructor de una clase. Los valores por defecto de los tipos pueden ser ambiguos, e inicializarlos evitará numerosos errores de ejecución. Además, asegúrate siempre de heredar en tu constructor mediante un inicializador de la clase base (típicamente ReferenceCount). Ejemplo a continuación: 

```
Constructor(): 
	utility::pointer::ReferenceCount(),
	bool_field1_(true),
	int_field2_(0),
{
	// code for my constructor
}
```
* Números aleatorios: el generador de números aleatorios de Rosetta genera un número aleatorio dada una semilla n. Asegúrate siempre de que ninguna semilla de tu código sea la misma o romperá el generador de números aleatorios. Todo tu código compilará, pero fallará en tiempo de ejecución y romperá por completo el sistema de pruebas unitarias. 
* Conversión de tipos (casting): comprueba el tipo antes de convertir entre clases y subclases. No existe una palabra clave instanceof como en Java, así que esto ayudará a garantizar una mejor seguridad de tipos. 
* Excepciones: es mucho mejor lanzar excepciones en tu código que usar utility exits. Las excepciones hacen que tu código sea más fácil de probar porque en las pruebas unitarias puedes comprobar TS_ASSERT_THROWS. Además, las excepciones ofrecen a tus usuarios un camino más útil hasta el error original. 

Pruebas unitarias:
 * Incluye un punto y coma al final de la definición de tu clase. Tu prueba compilará, pero CxxTest no podrá generar el C++
 * El error «assert p != 0…» significa que estás desreferenciando un puntero nulo o no inicializado
 * No incluyas un salto de línea entre el tipo de retorno y la firma de la función. es decir,
```
void
test_myTest() {} // incorrect
vs. 
void test_myTest() {} // correct! 
```

## Manejo de errores, asserts y tracers 
* assert: función que evalúa y detiene el programa en ejecución cuando no se cumple (no hace que el programa falle: fallar es un seg fault)
* tracer: mensaje; sentencia de impresión
* exception: para manejar entradas incorrectas del usuario; el desarrollador puede definir la salida si ocurre un error, la salida no siempre es necesaria
* manejo de errores: utility exit
* retry_run: reintenta la ejecución si la estructura no cumplió las restricciones

## El sistema de opciones (opciones y flags)
Muchos protocolos de Rosetta se pueden configurar especificando opciones mediante el sistema de opciones. Cuando empieces a desarrollar código, lo más probable es que te encuentres agregando una opción o usando una opción existente. 

Para agregar una opción al sistema de opciones: 
* En basic/options, abre el script de python options_rosetta.py y agrega tu opción al script. 
* Los «grupos» de opciones están organizados por espacios de nombres. Así, por ejemplo, una opción del grupo docking llamada myoption se accedería con -docking:myoption en la línea de comandos. Puedes crear un grupo nuevo o agregar a uno existente. 
* Ejecuta el script y registrará tu opción en Rosetta. 

Para incluir tu opción en una aplicación o clase nueva, debes hacer #include de: 
* basic/options/options.hh
* basic/options/keys/group.OptionKeys.gen.hh

Donde 'group' es el nombre del grupo de opciones. 

## El Resource Manager
El sistema de opciones es muy útil para activar y desactivar parámetros en los protocolos y reconocer algunos ajustes básicos. Sin embargo, muchas entradas de Rosetta suelen ser recursos, como un archivo PDB que se cargará en un Pose o información de simetría que se almacenará en un objeto SymmData. Como el sistema de opciones es estático, tendríamos que seguir recreando estos recursos, lo que consume mucha memoria, tiempo y energía. 

El resource manager es la solución de Rosetta a este problema. Al definir tus recursos inicialmente en un archivo de definición de recursos, Rosetta cargará estos recursos una sola vez y te dará acceso a ellos siempre que los necesites. 

Se puede encontrar más información sobre el Resource manager y cómo integrarlo en tu código aquí: [[ResourceManager]]


## Pruebas: pruebas unitarias, de integración y científicas
### Pruebas unitarias
Las pruebas unitarias son pruebas de una pequeña pieza de código de forma aislada. Ejemplos son probar una sola función o la configuración correcta de un constructor (= la creación de un objeto). El código debe escribirse como una cebolla y la mayor parte del código debe tener pruebas unitarias. En realidad, TODO el código debería tener pruebas unitarias; sin embargo, hay funciones que es imposible probar de forma unitaria. 
* las pruebas unitarias se encuentran en <code>test/devel</code>:
    * si compilas o ejecutas una prueba unitaria, agrega el archivo a <code>main/source/test/devel.test.settings</code>
    * si escribes una clase: agrega el archivo en <code>main/source/src/devel.src.settings</code>
* cada prueba unitaria necesita un método <code>core_init()</code> y un método <code>tearDown()</code>. 
* compila todas las pruebas unitarias (no se puede compilar solo una, se compilan todas):
    * desde main/source: <code>./scons.py -j<number of processors> cat=test</code>
* ejecuta una sola prueba unitaria:
    * desde main/source: <code>python test/run.py -d <path_to_rosetta_database> -1 <classname></code>
    * si tu variable de entorno <code>$ROSETTA3_DB</code> está definida (escribe <code>echo $ROSETTA3_DB</code>), no necesitas la opción -d
* Para más información sobre las pruebas unitarias y, en particular, sobre qué tipos de mensajes TS_ASSERT existen, consulta https://wiki.rosettacommons.org/index.php/Tools:Unit_Tests

Nota: todas las pruebas unitarias se ejecutan **cada vez** que se hacen modificaciones en el código base master

### Pruebas de integración
Las pruebas de integración comprueban cómo se «integra» tu pieza de código en el resto de Rosetta. Al ejecutar una prueba de integración, la salida del código ANTES del cambio se compara con la salida del código DESPUÉS del cambio. Como los desarrolladores de Rosetta no pueden entender las 3 millones de líneas de código, las pruebas de integración solo sirven para comprobar si hay o no un cambio esperado en la salida. NO comprueban si las funciones hacen lo que se supone que deben hacer (para eso están las pruebas unitarias) NI te dicen si la salida de un protocolo es científicamente válida (para eso están las pruebas científicas).
* [[Integration tests]]
* [[Writing MPI Integration Tests]]

Nota: todas las pruebas de integración se ejecutan **cada vez** que se hacen modificaciones en el código base master

### Pruebas científicas
Las pruebas científicas (o benchmarks) son necesarias para comprobar si la salida de un protocolo es científicamente sólida. Si estás refinando un protocolo, quieres asegurarte de que los resultados que obtienes no son peores que los de la implementación anterior del protocolo. Del mismo modo, cuando implementas un protocolo nuevo, quieres ver cuán buenos o malos son tus resultados y cómo se comparan con los de otros métodos.
* [[Scientific Benchmarks]]

Nota: las pruebas científicas se ejecutan cada dos semanas

## Fusionar código en master
Una vez que hayas creado una rama de Rosetta, desarrollado tu funcionalidad y **probado a fondo**, estás listo para aportarla al código base principal de Rosetta. Para ello, probablemente ya hayas revisado las convenciones de Git de Rosetta en [[GithubWorkflow]] (si no, ¡hazlo ahora!). Sin embargo, esta página enlaza al proceso detallado **obligatorio** para hacer commit de código en el master de Rosetta: [Página de la wiki de Rosetta: Committing Code](https://wiki.rosettacommons.org/index.php/Committing_code)

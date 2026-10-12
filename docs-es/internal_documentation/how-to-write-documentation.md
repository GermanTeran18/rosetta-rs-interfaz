Cómo escribir documentación
===========================

Pautas generales
----------------
Si no has pensado mucho en cómo escribir buena documentación, considera 
leer estos dos artículos para inspirarte:

* https://jacobian.org/writing/technical-style/

* http://stevelosh.com/blog/2013/09/teach-dont-tell/

En lo que respecta a la documentación de Rosetta en particular, ten en cuenta que esta wiki pretende 
ser el único lugar para toda la documentación de Rosetta dirigida a los usuarios.  Las páginas tienen formato 
[[Markdown|http://daringfireball.net/projects/markdown/syntax]], 
así que asegúrate de estar familiarizado con su sintaxis (para la mayoría de las cosas es bastante 
intuitiva).  También puedes previsualizar tus páginas para asegurarte de que se vean como 
quieres.

Hay dos formas de escribir documentación que solo será visible para los 
desarrolladores y no para los usuarios que descargan las versiones semanales de Rosetta.  La primera 
es poner esa documentación en la carpeta `internal_documentation/` y la segunda 
es poner esa documentación dentro de las siguientes etiquetas de comentario:

    <!--- BEGIN_INTERNAL -->
    ...
    <!--- END_INTERNAL -->

Crear una página nueva
======================
Al crear una página nueva con la interfaz de la wiki, asegúrate de que se coloque en la carpeta correcta (consulta la estructura de directorios [[más abajo|how-to-write-documentation#organization and navigation]] para ver las pautas). Hay tres formas de lograrlo:

1. Antes de crear tu página, navega a otra página que esté en el directorio donde debería colocarse la tuya. Cualquier página similar a la tuya debería estar en el directorio correcto. Si, por ejemplo, quieres crear una nueva página de filtro de RosettaScripts, podrías navegar a la página de cualquier otro filtro de RosettaScripts antes de crear tu página, y se colocará automáticamente en el directorio correcto. La nueva ubicación de la página también se indicará en la ventana donde le pones nombre a la página cuando la creas por primera vez.

2. Al ponerle nombre a tu página (en la pequeña ventana emergente que aparece al hacer clic en el botón «New» de la wiki), puedes dar la ruta absoluta de tu página en lugar de solo un nombre. Así, por ejemplo, si estás en la página principal de la wiki (o en cualquier otra parte de la wiki), haces clic en New y quieres crear un nuevo mover de RosettaScripts, le pondrías a la página el nombre "/scripting_documentation/RosettaScripts/Movers/movers_pages/MyNewMover" en lugar de solo "MyNewMover".  Ten en cuenta que esto NO funciona para crear una página nueva desde la edición, es decir, <code> [[ link to  | MyNewPage ]]</code>.  Consulta el Consejo 3 para ver cómo crear correctamente una página nueva desde la sintaxis de la wiki.

3. Si (por la razón que sea) prefieres crear páginas nuevas navegando directamente a la URL de una página que no existe y creándola, también puedes hacerlo: la estructura de directorios aparece en la URL, así que navegar a https://www.rosettacommons.org/docs/wiki/scripting_documentation/RosettaScripts/Movers/movers_pages/MyNewMover crearía una página en el directorio correcto para los movers de RosettaScripts.

Organización y navegación
=========================

<a href="organization-and-navigation" />

A continuación se muestra la estructura de directorios del repositorio de documentación, con una breve descripción de lo que pertenece a cada directorio o subdirectorio.

* **getting_started**: páginas dirigidas a personas que son completamente nuevas en Rosetta. La mayoría de estas páginas son bastante generales, de tipo tutorial, y pretenden guiar a los usuarios nuevos hacia la documentación (u otros recursos) más relevante para su problema concreto.
* **build_documentation**: páginas que describen cómo compilar Rosetta (pero nada relacionado con el uso real de Rosetta). Si quieres escribir sobre distintas plataformas, compiladores, etc., este es el lugar donde poner esa información.
* **rosetta_basics**: páginas que son relevantes en general para ejecutar Rosetta o entender conceptos específicos de Rosetta, pero que no son específicas de una aplicación determinada. Algunas páginas encajan mejor en el nivel superior de este directorio, pero hay varios subdirectorios que encajan mejor para muchas páginas:
   * **file_types**: descripciones de formatos concretos de archivos de entrada y salida (PDB, silent file, archivo params, etc.). Si, por ejemplo, alguien quisiera escribir una página breve que describa el formato de un archivo blueprint, aquí es donde iría.
   * **Glossary**: esta página actualmente solo contiene el Glosario (está en su propio subdirectorio para que pueda tener su propia barra lateral). La RosettaEncyclopedia probablemente también podría ir aquí, pero probablemente no querrás agregar páginas a este directorio.
   * **non_protein_residues**: como su nombre indica, este directorio contiene información general sobre cómo trabajar con cualquier cosa de Rosetta que no sea un L-aminoácido canónico. Por ejemplo, una página nueva sobre carbohidratos en Rosetta iría en este directorio.
   * **options**: aparte de la full-options-list, que se genera automáticamente y debe permanecer en el directorio de nivel superior, las páginas que describen grupos de opciones específicos pertenecen a este directorio. La full-options-list incluirá automáticamente las descripciones de tus opciones que proporcionaste en el código; esta sección te permitiría dar más información, consejos sobre cuándo usar ciertas opciones, qué opciones deben o no deben usarse juntas, etc.
   * **preparation**: guías para preparar estructuras para su uso en Rosetta.  Parte de la información puede parecerse a la de la carpeta non_protein_residues; sin embargo, esa carpeta está pensada para información más general, mientras que esta está pensada específicamente para páginas de tipo tutorial que describen lo que un usuario necesita hacer para que su archivo de entrada sea compatible con Rosetta.
   * **scoring**: contiene páginas que describen el proceso de puntuación en Rosetta, las funciones de puntuación, los términos de puntuación, etc. 
   * **structural concepts**: aquí es donde pertenecen las páginas generales sobre conceptos importantes de Rosetta (Mover, Pose, simetría, etc.). Si, por ejemplo, escribieras una página que describa *conceptualmente* qué es y qué hace una TaskOperation, o cómo trabaja Rosetta con alguna característica estructural en particular (p. ej., las membranas), pertenecería a esta carpeta.
* **application_documentation**: los subdirectorios de application_documentation contienen páginas de aplicaciones y herramientas específicas de Rosetta. El directorio application_documentation de nivel superior solo debe contener páginas relevantes para las aplicaciones en general (por ejemplo, la página Apps, que lista todas las aplicaciones públicas de Rosetta).  Por supuesto, algunas aplicaciones pueden encajar en más de un subdirectorio (por ejemplo, una aplicación de diseño de ARN podría ir técnicamente en el directorio rna o en el directorio design); en esos casos, la aplicación debe ir en el directorio más específico o en el que corresponda al caso de uso más común de la aplicación (así, esa aplicación de diseño de ARN iría en el directorio rna, y relax pertenece a structure_prediction aunque a veces se use en diseño).
   * **analysis**: aplicaciones destinadas a analizar estructuras en lugar de cambiarlas (score y ddg_monomer son dos ejemplos)
   * **antibody**: aplicaciones específicas de anticuerpos
   * **design**: aplicaciones usadas principalmente para diseño (p. ej., fixbb)
   * **docking**: aplicaciones usadas para docking (p. ej., FlexPepDock)
   * **rna**: aplicaciones específicas de ARN
   * **stepwise**: si tu aplicación pertenece aquí, lo sabrás
      * **stepwise_assembly**
      * **stepwise_monte_carlo**
   * **structure_prediction**: aplicaciones usadas principalmente para la predicción de estructuras (p. ej., AbinitioRelax)
      * **loop_modeling**: aplicaciones de modelado de loops
   * **tools**: aquí pertenece la documentación de los scripts del repositorio tools.
   * **utilities**: aplicaciones que no encajan realmente en las demás categorías. Por ejemplo, la documentación del fragment picker, optE y make_rot_lib pertenece a este directorio.
* **scripting_documentation**: las páginas sobre interfaces de scripting de Rosetta pertenecen a subdirectorios de scripting_documentation. Solo las páginas que se aplican a todas estas interfaces (ahora mismo, solo la página de resumen) deben estar en el nivel superior de este directorio.
   * **PyRosetta**: aquí pertenecen todas las páginas relacionadas con PyRosetta.
   * **RosettaScripts**: todas las páginas orientadas específicamente a RosettaScripts pertenecen a este directorio. El nivel superior contiene información general, como las convenciones para escribir RosettaScripts.
      * **composite_protocols**: si tienes un protocolo completo que normalmente se ejecuta en RosettaScripts y que podría incluir una combinación de movers, filtros o TaskOperations, debe documentarse aquí (las páginas individuales de mover, filtro o TO siguen yendo en sus secciones respectivas). Por ejemplo, si hay una secuencia concreta de movers que debería usarse para el docking de ligandos, deben documentarse aquí.
      * **FeaturesReporter**: la documentación del FeaturesReporter va en los siguientes subdirectorios:
         * **features_reporters**: páginas de reporters específicos
         * **rscripts**: páginas específicas de R relevantes para el FeaturesReporter (actualmente solo contiene información sobre cómo configurar R
         * **tutorials**: guías para trabajar con FeaturesReporters y su salida
      * **Filters**: contiene la página principal Filters-RosettaScripts. Si tienes una página que describe alguna familia de filtros relacionados, también pertenecería aquí.
         * **filter_pages**: páginas de filtros individuales
      * **Movers**: contiene la página principal Movers-RosettaScripts y las páginas de grupos de movers relacionados (p. ej., movers de simetría, movers de modelado de loops)
         * **movers_pages**: páginas de movers individuales
      * **TaskOperations**: contiene la página principal TaskOperations-RosettaScripts; de nuevo, cualquier página que dé un resumen de algún grupo relacionado de TaskOperations también pertenecería aquí.
         * **taskoperations_pages**: páginas de TaskOperations individuales
   * **TopologyBroker**: aquí pertenece la documentación del TopologyBroker.
* **development_documentation**: documentación dirigida a personas que piensan escribir código C++ real de Rosetta pero que no requieren acceso a GitHub. El nivel superior contiene páginas generales, principalmente sobre convenciones de programación.
   * **code_structure**: el nivel superior contiene páginas que describen la estructura de la biblioteca de Rosetta.
      * **classes**: aquí pertenece la documentación de clases específicas. Actualmente hay muy poco en este directorio (en realidad solo algunas estructuras de datos, tracers y punteros), pero nos encantaría tener más documentación de alto nivel de las clases de Rosetta.
      * **namespaces**: páginas que describen lo que pertenece a un espacio de nombres concreto. De nuevo, todavía no hay muchas páginas aquí, pero nos encantaría tener más.
   * **test**: aquí pertenece cualquier información sobre cómo ejecutar, escribir e interpretar pruebas en Rosetta.
   * **tutorials**: guías para realizar alguna tarea de desarrollo específica, como hacer que un mover sea compatible con RosettaScripts o escribir una aplicación.
* **internal_documentation**: si una página no debe estar disponible en la página pública de documentación, entonces (en general) debe ir en la documentación interna. Esto incluye dos tipos principales de páginas. Las primeras son páginas que simplemente aún no están listas para que las vean los usuarios (p. ej., la documentación de un protocolo que todavía está en devel o no se ha publicado). Las segundas son páginas que están ocultas de forma permanente a los usuarios porque no se aplican a nadie que no tenga acceso a GitHub (p. ej., la página GithubWorkflow).  Siéntete libre de crear tus propios subdirectorios en internal_documentation para tu proyecto concreto.
   * **missing_links**: actualmente este es el único subdirectorio permanente de internal_documentation.
        **No pongas páginas en este directorio.** Las páginas de missing_links se generan automáticamente.
* **meta**: contiene páginas de interés principalmente histórico que no son directamente relevantes para ejecutar Rosetta pero que deben documentarse en algún lugar. Actualmente contiene la Rosetta Timeline (historia de Rosetta), la History of Rosetta Documentation y Rosetta People (breves descripciones de personas, en particular de quienes no son investigadores principales, a las que podríamos referirnos por su nombre y esperar que todos sepan de quién hablamos). 


El directorio de nivel superior debe contener **solo** páginas que no encajen en ninguna de estas categorías. Actualmente esto incluye, por ejemplo, las páginas que describen los servidores web de Rosetta y CS-Rosetta. También contiene la página full-options-list porque esa página se genera automáticamente, así que **no muevas la página full-options-list**.


Antes de agregar una página nueva a la documentación, también es buena idea revisar las secciones posteriores de esta página para ver consejos específicos sobre la información que debe incluir tu página. Ten en cuenta que **debe incluir una sección «Véase también»** que enlace a páginas relacionadas o a páginas que los usuarios pudieran haber estado buscando cuando llegaron a la tuya.  Asegúrate también de **agregar enlaces a tu página** desde la página un nivel por encima (p. ej., si agregas una aplicación de diseño, enlázala desde la página design-applications) y enlaces de «Véase también» desde las páginas relacionadas. 

Cómo documentar una nueva etiqueta de RosettaScripts
----------------------------------------------------
Si buscas información sobre cómo escribir una nueva etiqueta XML de RosettaScripts, 
consulta la [[RosettaScripts Developer Guide]].  Una vez que hayas escrito 
tu etiqueta, tu siguiente paso es documentarla.  Cada etiqueta debe tener su propia página 
que documente en detalle:

* Qué hace.
* Cuándo tiene sentido usarla.
* Cuándo no tiene sentido usarla.
* Todas las opciones y subetiquetas que entiende.
* Con qué otras etiquetas se suele usar.
* Ejemplos de su uso.

El primer paso para documentar tu etiqueta es decidir dónde debe encajar en 
la documentación.  Todo mover documentado encaja en la jerarquía que empieza 
en la página [[RosettaScripts]].  El primer nivel de la jerarquía se refiere solo a 
qué tipo de etiqueta escribiste; es decir, un [[Mover|Movers-RosettaScripts]], un [[Filtro 
|Filters-RosettaScripts]], una [[TaskOperation|TaskOperations-RosettaScripts]], 
etc.  El siguiente nivel de la jerarquía depende de lo que realmente haga tu etiqueta.

Por ejemplo, supongamos que tu etiqueta es un Mover.  En este caso, para decidir 
dónde debe ir tu etiqueta en la jerarquía de Mover, leerías [[la 
página de movers|Movers-RosettaScripts]] y encontrarías la categoría que mejor describa 
tu Mover.  Es un poco complicado asegurarse de que tu página nueva acabe en el 
lugar correcto (que sería 
`scripting_documentation/RosettaScripts/Movers/movers_pages` en este caso). La 
forma más fiable es navegar a la página de documentación de un mover que esté 
en la misma categoría que el tuyo (es decir, que ya esté en el lugar correcto) y 
hacer clic en el botón `New` de la parte superior de la página.  Si no ves un botón 
`New`, es porque estás en la [[instantánea 
estática|https://www.rosettacommons.org/docs/latest]] de la wiki y no en 
[[la wiki en sí|https://www.rosettacommons.org/docs/wiki]].

Tu documentación debe incluir las siguientes secciones:

* **Descripción:** unos pocos párrafos que describan lo que se supone que hace el 
  mover.

* **Uso**: un bloque «preformateado» que muestre todas las opciones y subetiquetas que 
  entiende tu etiqueta.  Cada opción debe anotarse con sus tipos y 
  valores por defecto, y cada subetiqueta debe anotarse con sus etiquetas.

* **Ejemplos**: unos fragmentos que muestren los casos de uso más comunes.

* **Salvedades**: una lista de cosas que los usuarios deben tener en cuenta al usar tu etiqueta.  
  Esto puede incluir situaciones en las que tu etiqueta no es aplicable o errores que 
  tu etiqueta produce habitualmente.

* **Véase también**: un conjunto de enlaces a otras etiquetas y páginas que de algún modo estén relacionadas 
  con tu etiqueta.

Puedes encontrar una plantilla para documentar nuevos movers de RosettaScripts [[aquí|rscript-movers-template]]. Los filtros y las TaskOperations seguirán el mismo formato básico.

Cómo documentar una nueva aplicación
------------------------------------
Si buscas información sobre cómo escribir una aplicación nueva, consulta 
la página sobre [[cómo escribir una aplicación|writing-an-app]].  Una vez que hayas escrito 
tu aplicación, tu siguiente paso es documentarla.  Cada aplicación debe 
tener su propia página que documente en detalle:

* Qué problemas resuelve.
* Qué opciones acepta.
* Qué salidas produce.
* Cómo se analizan esas salidas.
* Qué hace la aplicación por debajo.
* Cualquier publicación relacionada con la aplicación.
* Con qué versión o versiones de rosetta se sabe que funciona.

Por ejemplo, todas las páginas siguientes documentan bien distintas 
aplicaciones:

* [[AbInitio|abinitio-relax]]
* [[Backrub|backrub]]
* [[Fold and Dock|fold-and-dock]]
* [[Relax|relax]]
* [[Plegamiento de ARN|rna-denovo-setup]]
* [[Docking|docking-protocol]]

Una vez que hayas escrito la documentación de tu protocolo, tienes que agregarla a 
la wiki de documentación.  La página [[Application Documentation]] organiza la 
documentación de aplicaciones en categorías.  Tu primer paso es decidir qué 
categoría encaja mejor con tu aplicación. Consulta [[más arriba|how-to-write-documentation#organization and navigation]] 
para ver las descripciones de estas categorías. 

Cada categoría corresponde a un subdirectorio de `application_documentation/` en 
la wiki de documentación.  Para crear una página nueva en el directorio correcto, navega 
a una página que ya esté en la categoría correcta y haz clic en el botón `New` de 
la parte superior de la página.  Si no ves un botón `New`, es porque estás en 
la [[instantánea estática|https://www.rosettacommons.org/docs/latest]] de la wiki 
y no en [[la wiki en sí|https://www.rosettacommons.org/docs/wiki]].  Ponle 
a la página un nombre adecuado y rellena la documentación que escribiste. 

Una vez que tu página nueva esté en la wiki, dedica unos minutos a agregar enlaces a ella desde 
otras páginas relevantes de la wiki.  Agrega también a tu página una sección «Véase también» 
con enlaces de vuelta a esas páginas relevantes.  Los enlaces a demos que muestren tu 
aplicación son especialmente valiosos.  Si ya existen demos de tu aplicación, asegúrate de agregar enlaces a ellas.  Si no existen, 
considera seriamente escribir algunas.  Ten en cuenta que (por razones técnicas: Gollum se vuelve muy 
lento cuando hay demasiadas páginas en la wiki) la wiki de demos es en realidad un 
sitio web completamente distinto de la wiki de documentación.  Así que tienes que usar 
enlaces externos para enlazar entre las dos wikis.

Si tu aplicación se ejecuta mediante un script de python, ese script también debe describirse brevemente 
en la sección correspondiente de la página [[Tools]] y enlazarse a la página principal de la aplicación.

Puedes encontrar páginas de plantilla para la documentación de aplicaciones [[aquí|application-docs-template]], [[aquí|app-name]] y [[aquí|template-app-documentation-page]].

Cómo documentar una nueva demo
------------------------------
Las demos son un recurso muy bueno para los usuarios nuevos, porque muestran cómo los 
diversos componentes de Rosetta encajan para resolver problemas.  Toda 
demo debe incluir:

1. Una introducción a la tarea que se aborda.
2. Instrucciones detalladas paso a paso sobre cómo ejecutar la demo.
3. Todos los datos de entrada necesarios para ejecutar la demo.
4. Scripts que contengan los comandos exactos necesarios para ejecutar la demo.

Una vez que hayas escrito una demo, sigue las instrucciones de [[esta 
página|https://www.rosettacommons.org/demos/wiki/How_To_Write_Demos_and_Tutorials]] para ver cómo 
subirla a los repositorios de código fuente de Rosetta y enlazarla en la documentación 
en línea.

Quiero recalcar de nuevo un punto mencionado en las instrucciones enlazadas arriba.  Una vez que 
subas tu demo, tienes que agregar enlaces a ella desde las páginas relevantes de esta 
wiki.  Esto significa dedicar unos minutos a explorar la wiki en busca de páginas relevantes 
(especialmente en la sección de aplicaciones) y agregar enlaces de «Véase también» en 
las páginas relevantes que encuentres.  Si te saltas este paso, tu demo será 
difícil de encontrar y, por lo tanto, mucho menos útil.

Cómo documentar una nueva API de C++
-------------------------------------
La documentación de la API de Rosetta se genera con doxygen, que es un 
programa bien establecido para leer código fuente y generar documentación 
con buen formato.  La documentación se escribe en el código fuente en bloques de comentarios 
con prefijos de caracteres especiales:

    // Not recognized by doxygen.

    /// Recognized by doxygen.

    /* Not recognized by doxygen. */

    /** Recognized by doxygen. */

También se reconocen otros comentarios especiales.  Dentro de estos comentarios puedes 
usar muchos comandos de marcado distintos para controlar cómo doxygen da formato a la 
salida.  Todos estos comandos empiezan con `@`:

    /// @brief A function to print a cordial greeting.
    /// @details This function demonstrates both how to write a simple C++ 
    /// program and how to document that function.

    void hello_world() {
        std::cout << "Hello world!" << std::endl;
    }

Las etiquetas `@brief` y `@details` mostradas arriba son las etiquetas de formato más importantes 
para usar en Rosetta.  La etiqueta `@brief` se usa para dar una descripción de una frase de lo que hace 
una función, clase o espacio de nombres. 
La etiqueta `@details` se usa para dar un resumen de uno o más párrafos de lo que 
hace una clase o función no trivial, qué entradas espera, qué salidas 
produce, cómo debe usarse y (a grandes rasgos) cómo funciona.

Es muy importante escribir etiquetas `@details`, porque sin ellas es muy 
difícil hacerse una idea de cómo encaja una clase o función en el contexto más amplio de 
Rosetta.  Escribir etiquetas `@brief` es menos crucial, pero es una buena práctica 
documentar todas las funciones, clases y espacios de nombres que escribas.  ¡No te hagas 
excepciones!

Doxygen tiene muchas otras etiquetas que podrían resultarte útiles, una vez que empieces a escribir 
tu documentación.  Puedes encontrar una lista completa 
[[aquí|http://www.stack.nl/~dimitri/doxygen/manual/commands.html]].

Para ver tu documentación mientras la escribes, puedes ejecutar doxygen localmente. 
Para ello, primero tendrás que crear un archivo de configuración de doxygen:

    $ doxygen -g

Esto producirá un archivo de configuración llamado `Doxyfile`.  Puedes abrir, revisar 
y cambiar este archivo si quieres; cada opción está muy bien descrita.  Por 
ejemplo, a veces activo la opción `RECURSIVE` para que doxygen procese 
todo un espacio de nombres en lugar de solo el directorio de más arriba.  De cualquier modo, con 
`Doxyfile` en mano, puedes ejecutar doxygen para generar la vista previa de la documentación:

    $ doxygen Doxyfile

Este comando crea un directorio llamado `html`, que contiene la documentación 
generada.  Una vez que estés satisfecho con tu documentación, haz push a 
master y aparecerá en la documentación en línea en unos pocos días.

Cómo ver (y editar) la documentación sin conexión
-------------------------------------------------
La wiki de documentación está alojada en un repositorio git, lo que facilita 
verla y editarla sin conexión.  El primer paso es clonar el repositorio correspondiente:

    $ git clone git@github.com:RosettaCommons/documentation.git

Si te basta con explorar la documentación con herramientas de línea de comandos, 
ya has terminado.  Si quieres poder ver una versión HTML bien renderizada de 
la documentación, necesitas ejecutar un servidor Gollum local.  [[Gollum]] es 
el software que se usa para servir el sitio público de documentación.  Es un software de wiki 
escrito en ruby que usa un repositorio git como base de datos.

Sigue [[estas 
instrucciones|https://github.com/gollum/gollum/wiki/Installation]] para instalar 
Gollum.  Es posible que también tengas que instalar la extensión GitHub Markdown, que 
normalmente puedes instalar con este comando:

    gem install github-markdown

Una vez que Gollum esté instalado correctamente, entra con `cd` en la raíz del directorio de documentación 
y lanza un servidor local con el siguiente comando:

    gollum --config rosetta_gollum_config.rb

Luego dirige tu navegador web a la siguiente URL:

    http://localhost:4567/

### Editar la documentación sin conexión

Aunque técnicamente puedes hacer push de tus cambios sin conexión al repositorio de documentación, 
hacerlo está sujeto a desagradables conflictos de fusión con el sitio en línea. 
El problema es que Gollum no tiene una forma de que los usuarios en línea resuelvan conflictos de fusión, 
así que en su lugar hace push agresivamente a master.  Reserva el acceso directo de 
git al repositorio para los cambios que no se pueden hacer a través de la interfaz de la wiki en línea, 
como subir imágenes o ediciones de tipo procesamiento por lotes.

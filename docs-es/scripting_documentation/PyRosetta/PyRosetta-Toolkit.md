<!-- --- title: Pyrosetta Toolkit -->Lenguaje: Python/Tkinter

Contacto:
--------

Jared Adolf-Bryfogle
 jadolfbr@gmail.com

Intenciones
----------

Modelado interactivo, protocolos multiproceso, exportación de archivos, configuración de Rosetta, exploración, funciones útiles de Rosetta y análisis. Siéntete libre de añadir lo que consideres útil, tanto para usuarios como para desarrolladores. Para más información, consulta la documentación de doxygen y el artículo de la colección RosettaCon2012.

Código actual
------------

Lamentablemente, el PyRosetta Toolkit no se ha portado a PyRosetta-4 y solo se distribuye, y es compatible, con PyRosetta-3. 

Uso / Tutorial
--------------

**Instala PyRosetta.**

Copia el código de pyrosetta/SetPyRosettaEnvironment.sh a tu .bashrc (Linux) o .bash\_profile (Mac). Indica la ruta completa donde dice PYROSETTA= y ejecuta source. Es útil añadir a tu perfil un acceso directo a pyrosetta/ipython.py.

**Configura PyMOL.**

Hay un archivo estupendo que puedes colocar en tu directorio $HOME, llamado .pymolrc. Existe un archivo: [PyMOLPyRosettaServer.py](http://www.pyrosetta.org/documentation/pymol_mover-tutorial). Añade este comando a tu .pymolrc: 'run path\_to\_pyrosetta/PyMOLPyRosettaServer.py'. Esto hace que la conexión se establezca cada vez que abres PyMOL, y la GUI está muy integrada para usar esta estupenda función de PyRosetta.

**Ejecuta la GUI.**

El código de la GUI existe tanto en el código fuente de Rosetta, en <code>main/source/src/python/bindings/app/pyrosetta_toolkit</code>, como en las distribuciones binarias de PyRosetta, en <code> app/pyrosetta_toolkit</code>. Si has ejecutado source sobre SetPyRosettaEnvironment.sh, se crea un alias para lanzar la GUI con el comando <code>pyrosetta_toolkit</code>.  

Si no has compilado los enlaces de PyRosetta a partir del código fuente de Rosetta, descarga y usa los binarios de PyRosetta (recomendado si no eres desarrollador de Rosetta). Ignora la GUI del código fuente de Rosetta, ya que requiere una compilación completa de PyRosetta.  

Si sqlite3 da problemas al cargarse, reinstala Python con sqlite3. Para ello, normalmente basta con instalar sqlite3 y reinstalar Python. A veces puede ser más complejo, así que búscalo en Google y encontrarás mucha información.

**Carga un PDB.**

Hay dos cosas que puedes cargar desde el principio: un PDB o una PDBLIST. Veamos primero el PDB. Usa el menú de archivo para cargar un PDB o descargarlo del RCSB. Se abrirá una ventana de configuración del PDB. Si es un PDB tuyo que ya has cargado antes en Rosetta, simplemente pulsa el botón de cargar. El botón Clean/Analyze intentará limpiar tu PDB según las opciones seleccionadas y determinará si Rosetta no reconocería algún residuo.

Una vez cargado el PDB en PyRosetta, tienes varias opciones. El directorio de salida se establece automáticamente en el directorio desde el que cargaste el PDB, y el nombre de salida es el nombre del PDB. Puedes cambiarlos en la esquina superior derecha de la ventana principal. Con file-\>export-\>save session puedes guardar esta información, junto con el PDB cargado, para usarla más adelante.

*CÓDIGO: toolkit/window\_main/IO/GUIInput.py*

**Echa un vistazo a PYMOL.**

Veamos primero la proteína. Abre PyMol si aún no lo has hecho. Lee la documentación principal para ver cómo configurar PyMOL de modo que escuche la información de PyRosetta. Usa el menú de visualización para mostrar el Pose en PyMOL. Esto envía las coordenadas a PyMOL. Si quieres observar distintos protocolos cada vez que se puntúa la proteína, usa la casilla PyMOL Observer. Ten en cuenta que cada vez que se puntúa la proteína se crea otro fotograma en PyMOL. Esto se puede usar como instantánea para guardar cualquier cosa que modeles o cualquier diseño que hagas. La visualización tiene opciones para cambiar el comportamiento del PyMOL Observer, así como para colorear regiones a medida que se añaden.

*CÓDIGO: toolkit/window\_modules/PyMOL*

**Echa un vistazo de verdad a PyMOL.**

Haz clic en el botón PyMOL Visualization Window del menú vis. Aquí hay algunas cosas interesantes y, ojalá, útiles. Haz doble clic en 'view residue energy' para enviar a PyMOL los colores de energía. Ahora explora tu proteína con los componentes de energía de la derecha. Las demás opciones de la izquierda también deberían funcionar, como observar todos los enlaces de hidrógeno.

*CÓDIGO: toolkit/window\_modules/PyMOL*

**Configura tus opciones.**

El menú Options te permite configurar diversas opciones específicas de Rosetta mediante el botón 'Configure Options System', incluidas opciones de línea de comandos como dun10. Hay algunas comunes, pero usa el cuadro de entrada para añadir las tuyas y haz clic en add option para cambiar las opciones de la sesión actual. Haz clic en save defaults para que se carguen la próxima vez que abras el toolkit.

*CÓDIGO: toolkit/window\_modules/options\_system*

**Configura tu ScoreFunction.**

De nuevo en la pestaña Options, haz clic en el botón ScoreFxn Control. Aquí puedes cambiar la función de puntuación y también editar términos de puntuación individuales en la mitad inferior. Al hacer doble clic en la función de puntuación o en el patch, se establece para la sesión actual. Al hacer doble clic en un término de la parte inferior izquierda, puedes cambiar su peso; al hacer doble clic en un término de la parte inferior derecha, puedes cambiar el peso de cero a cualquier valor.

Ten en cuenta que esta ventana tiene su propio menú. Puedes hacer varias cosas, como guardar una nueva función de puntuación o establecer una combinación concreta de puntuación:patch como predeterminada. Se pueden mostrar más funciones de puntuación haciendo clic en el botón 'Show ALL scorefunctions' del menú de opciones de la ventana de la función de puntuación. Ten en cuenta que muchas de estas funciones de puntuación no están documentadas o no se usan, y por eso no aparecen por defecto. Actualmente esto es un proyecto dentro de la comunidad de desarrolladores de Rosetta. La función de puntuación que establezcas se usará en cualquier protocolo que use una función de puntuación. Por ahora, talaris2013 es la predeterminada.

*CÓDIGO: toolkit/window\_modules/scorefunction*

**Usa un análisis sencillo.**

De vuelta en la ventana principal, tenemos algunos análisis sencillos para echar un vistazo rápido a tu Pose. A la izquierda hay algunas opciones básicas de análisis, mientras que a la derecha está el conjunto completo de herramientas de RMSD. ¡Viva rms\_util!

Échales un vistazo y puntúa tu Pose. Al cargar el Pose se establece el Pose nativo. Este es el RMSD NATIVO. Hagamos algo de minimización de loops.

*CÓDIGO: toolkit/window\_main/frames/SimpleAnalysisFrame.py* *CÓDIGO: toolkit/modules/tools/analysis.py*

 Ten en cuenta que algunos movers de análisis (Interface, PackStat, VIP, Loop) ahora están disponibles en la pestaña avanzada.

**Define algunas regiones.**

En la parte inferior izquierda puedes seleccionar una región. Tienes inicio, fin y cadena. Todo ese pose.pdb\_info().pdb2pose(start, end, chain) ocurre en segundo plano, de modo que la GUI está hecha para funcionar específicamente con la numeración del PDB. Puedes especificar un loop, un residuo, una cadena y/o un extremo terminal. Para añadir, usa el botón add region. Esto irá al cuadro de lista de la izquierda. Para quitar una región, haz clic en el botón remove region. Los colores de las regiones se pueden enviar a PyMOL mediante la pestaña de menú Visualization.

Bien, ¿cómo especificamos algo más que un loop?

Extremos terminales: especifica solo el final y la cadena para la cola flexible N-terminal, y el comienzo y la cadena para la C-terminal.
 Cadena: especifica solo la cadena.
 Residuo individual: da el mismo valor para el inicio y el final.

*CÓDIGO: toolkit/window\_main/frames/InputFrame.py* *CÓDIGO: toolkit/modules/Region.py*

**Protocolos**

En la parte inferior derecha tenemos algunos protocolos rápidos. Están pensados sobre todo para modelado, ya que todos sabemos que necesitamos tantos procesadores como sea posible para la mayor parte de nuestro trabajo pesado. Actualmente se dividen en protocolos completos y protocolos regionales. Haz clic en el botón derecho para relajar el loop. Si quieres guardar el PDB después, en la parte superior derecha hay un botón write after protocol. Al hacer clic en él se usará el distribuidor de trabajos para escribir el PDB tras el protocolo. Ahora podemos usar el análisis de RMSD para obtener información de cada loop, del total y de un promedio de todos los loops.

Ten en cuenta que la puntuación de chainbreak se establece en 100 para la minimización.

 Además, está la pestaña de protocolos en el menú. Aquí puedes especificar el número de procesadores que quieres usar, ejecutar algunos otros protocolos y abrir un navegador web hacia muchos servidores web distintos de la comunidad de Rosetta.

*CÓDIGO: toolkit/window\_main/Frames/QuickProtocolsFrame.py*
 *CÓDIGO: toolkit/modules/protocols* *CÓDIGO: toolkit/modules/protocols/ProtocolBaseClass.py* *CÓDIGO: toolkit/modules/protocols/MinimizationProtocols.py*

**SCWRL**

Como estoy en el laboratorio de Roland Dunbrack, integré SCWRL en la GUI. Si quieres el empaquetado de cadenas laterales MÁS preciso que se muestra en la bibliografía, ahí es donde usarías SCWRL. Para que funcione en la GUI, entra con cd en el directorio de SCWRL, ve a [ [http://dunbrack.fccc.edu/scwrl4/](http://dunbrack.fccc.edu/scwrl4/) aquí ] para descargar la versión específica del sistema operativo que necesites e instálala en el directorio indicado. Ahora puedes usar la opción pack (SCWRL) para empaquetar tu cadena, loop, residuo, etc., igual que hiciste antes. O bien puedes exportar un archivo de secuencia de SCWRL desde el menú de exportación. Es un archivo con la secuencia completa de la proteína y los residuos que se van a reempaquetar en MAYÚSCULAS.

*CÓDIGO: toolkit/SCWRL/*
 *CÓDIGO: toolkit/modules/tools/output.py* *CÓDIGO: toolkit/modules/protocols/MinimizationProtocols.py*

**Ventana de diseño**

Al hacer clic en la opción de menú de diseño de proteínas y luego en la caja de herramientas de archivos de diseño, se abre una forma interactiva de crear resfiles. Me parece mucho más fácil usar esto que hacerlo a mano. Especifica un residuo y se te darán algunos valores bioquímicos. Son antiguos, pero se siguen usando mucho. Si no sabes qué son, lee sobre ellos en el menú de ayuda. Una vez que eliges un residuo, cambia el primer cuadro de lista de la izquierda. Contiene información sobre los residuos conservados para facilitar su especificación. Al explorar el cuadro de lista se rellena el segundo cuadro de lista. Hay tres tipos disponibles: residuos individuales, ALL y ALL+Self. Al hacer doble clic en ellos se rellena el último cuadro de lista. Estos son los residuos que tienes actualmente establecidos para diseño en cada residuo. Al hacer doble clic en cualquier residuo del último cuadro de lista, se quita de tu diseño. Puedes hacer clic en next residue para modificar el siguiente. Por último, en lugar de un residuo puedes especificar una región como 23:42 y luego añadir un residuo al diseño. Todos ellos quedarán establecidos. Por ahora no están implementadas las cadenas ni los extremos terminales. Después puedes guardar un resfile, borrarlo o borrar todo para un residuo concreto. Cargar un nuevo Pose reinicia el diccionario de diseños.

Se está trabajando en añadir NCAA a esta ventana.

*CÓDIGO: toolbox/modules/definitions/restype\_definitions.py*
 *CÓDIGO: toolbox/window\_modules/design\_window/resfile\_design.py*

**Ventana de control total**

A veces solo quieres diseñar residuos individuales, empaquetar residuos individuales o incluso modificar los ángulos diedros de residuos específicos para hacer un modelo, o preparar algo (como un extremo terminal) para Rosetta. También puede interesarte conocer las probabilidades de rotámeros y las energías de un residuo concreto. Aquí es donde entra en juego esta ventana. Se encuentra en la pestaña Advanced del menú. Tras especificar un residuo, primero puedes cambiar los diedros con el cuadro de entrada o con el control deslizante. No se hace ningún cambio hasta que haces clic en el botón delta. Al hacer doble clic en un tipo de residuo en el cuadro de lista central, se mutará ese residuo usando una de las funciones de conveniencia de PyRosetta. A la derecha puedes entonces reempaquetar el residuo, relajarlo o relajar ese residuo y sus vecinos. Ten en cuenta que, en esta situación, el movimiento backrub sería realmente genial, y lo implementaré en el futuro. También puedes observar los términos de energía individuales del residuo haciendo clic en uno de los términos del cuadro de lista inferior. Esto obtiene los términos con el objeto ScoreFxn, como antes, ¡y SÍ está ponderado! Puede ser útil si buscas un diseño que reduzca un término de energía específico. Lo sé, es muy específico, pero ¡a veces es justo lo que necesitas! Al hacer clic en next residue o previous residue se actualizan todas las energías y probabilidades de esta ventana, incluido el término de energía establecido.

Aquí también puedes añadir variantes a tu Pose. ¡Hurra por las fosforilaciones!

*CÓDIGO: toolbox/window\_modules/full\_control/FullControl.py*
 *CÓDIGO: toolbox/window\_module/scorefunction/ScoreFxnControl.py*

**Funciones de PDBLIST**

Las últimas de las funciones principales que he tenido tiempo de implementar son las de PDBLIST. Hago todo mi trabajo con PDBLIST de rutas completas. Facilita las cosas, y tener las rutas completas significa que puedo trabajar con ellas en varios lugares y varios scripts. Por otro lado, algunos usuarios y modeladores quizá no tengan el conocimiento para trabajar con ellas o ni siquiera para crear una. Esto es para ellos y, siendo sincero, para cuando me siento un poco perezoso. Puedes especificar una PDBLIST en la parte de entrada de la ventana principal. También puedes crear una en el menú. Creará un archivo llamado PDBLIST.txt en el directorio especificado y lo establecerá como nombre de archivo. Ahora puedes hacer algunas cosas. En la ventana ScoreFxn puedes volver a puntuar todos los archivos y generar un archivo con RUTA : PUNTUACIÓN. Lo siguiente que quiero es integrar los filtros de puntuación para los usuarios. En el menú puedes generar un archivo FASTA para cada PDB, o incluso para la región especificada, lo cual es bastante útil para logos de secuencia, etc. En unas semanas podrás usar calibur y, por ahora, puedes convertir todos los PDB a una base de datos SQLITE3. Básicamente es una forma de almacenar un gran número de PDB para análisis, etc. Ten en cuenta que no es la estructura de base de datos de Rosetta, sino una propia. Tendrá la opción de convertirlos al estilo de Rosetta en el futuro. Aún no sé cómo hacer la conversión en PyRosetta.

*CÓDIGO: toolbox/modules/tools*
 *CÓDIGO: toolbox/modules/calibur.py*
 *CÓDIGO: toolbox/modules/PDB.py*

**Ventana de herramientas de Rosetta**

En la ventana Rosetta Tools está la GUI que construí, independiente de este programa y de PyRosetta. Tiene una función if \_\_name\_\_=\_\_main\_\_, así que puedes ejecutarla por separado si te apetece. Su propósito era ser una forma interactiva de crear archivos de opciones de Rosetta, ya que no recuerdo los nombres y siempre olvidaba las opciones de las muchas aplicaciones de Rosetta que uso. Además, quería una GUI para que los modeladores de mi laboratorio usaran Rosetta, ya que por alguna razón les da algo de miedo la línea de comandos. Después, quería que se pudiera ejecutar en el clúster, para poder preparar rápidamente una ejecución de Rosetta a las 3 de la madrugada.
 *Implementación actual:* Si abres la ventana y haces clic en el elemento de menú repopulate, hay 4 opciones. La opción predeterminada es cargar la información y las descripciones de las opciones desde doxygen. La segunda es una lista de opciones, descripciones y documentación seleccionada manualmente. La siguiente opción es ALL. Significa TODAS las opciones de cada programa que se encuentre en el directorio de aplicaciones especificado. Ejecuta la función -help de cada aplicación, escribe un archivo y analiza ese archivo lo mejor que pude. Hay muchísima información, pero a veces la quieres toda. Puedes obtener la información solo de la aplicación seleccionada en el menú de ayuda. Tras repoblar, o incluso al abrir la ventana, puedes elegir una aplicación y se enumeran sus opciones. Al hacer clic en add\_option se añade a la caja de texto de abajo. Puedes editarla. Al hacer clic en showpath builder podrás buscar archivos, añadir nombres, etc. Este archivo de opciones se puede guardar, cargar y ejecutar. A la derecha está la documentación de cada aplicación, ya que estoy constantemente en rosettacommons releyendo la documentación cada vez que empiezo a usar nuevas aplicaciones.
 A continuación tenemos la parte del clúster. Está pensada para usarse con todas las aplicaciones, ya que las que no usan JD2 pueden ser frustrantes de configurar para el clúster. Generalmente usa Qsub para ejecutarse en el clúster. Si tienes MPI, úsalo en su lugar.

**Menú de ayuda**

Aquí hay algunas cosas y enlaces útiles para los usuarios y para los desarrolladores. La licencia, funciones de información, etc. Si algo de la GUI es poco explicativo, avísame y podemos añadirlo al menú de ayuda.

*CÓDIGO: toolbox/modules/help.py*

Información del código
----------------

=== Organización: ===

-   */toolkit/pyrosetta\_toolkit.py*
    -   Esta es la clase principal, responsable de construir la ventana y de contener las variables globales. Añade /toolkit a la variable PATH de Python. También define y muestra cada pieza de la ventana principal. Contiene 4 objetos principales: pymol\_class, score\_class, input\_class y output\_class. También da acceso a fullcontrol\_class, que es la ventana de control total. Además contiene el Pose actual, aunque las referencias a este Pose se pasan libremente.

-   */toolkit/window\_main/*
    -   Actualmente, todas las clases de window\_main aceptan una instancia de la propia clase toolkit. ¡Si esto fuera C++, aceptarían un puntero de acceso a ella!
    -   */toolkit/window\_main/frames* La ventana principal se compone ahora de 4 Frames. Estos frames personalizados heredan de la clase 'Frame' de Tkinter. Si quieres añadir algo a la ventana principal, sigue el código de aquí.
    -   Hay 4 frames: InputFrame (que gestiona la selección de regiones), OutputFrame, SimpleAnalysisFrame y QuickProtocolsFrame. Cada frame se encarga de construir una parte de la ventana. No son clases contenedoras y no deben contener variables importantes que el resto de la GUI pueda necesitar.
    -   */toolkit/window\_main/IO* Aquí residen dos clases: GUIInput y GUIOutput. Estas clases son casi el alma de la GUI. Sus instancias se llaman input\_class y output\_class, respectivamente, y residen en la clase principal toolkit, como se mencionó antes. Contienen variables, clases y cualquier función de retrollamada. También pueden tener algunas funciones que requieren acceso a muchas de las clases de la GUI o al propio toolkit. Estas dos clases se pasan por toda la GUI. Aquí residen funciones como cargar un Pose, descargar del RCSB o cargar un archivo de Loop en el InputFrame de selección de regiones. Son funciones que no pueden colocarse en toolkit/modules/tools.
    -   */toolkit/window\_main/menu.py* : Aquí está el menú principal del programa. Tiene algunas funciones propias al final.
    -   */toolkit/window\_main/global\_variables.py* : Aquí se guarda la variable global current\_directory. Cualquier módulo que importe este archivo puede acceder a global\_variables.current\_directory y modificarla. Es un buen truco de Python.

-   *toolkit/SCWRL/*
    -   Para quienes usan SCWRL, instala aquí una copia para usarlo durante el modelado.

-   *toolkit/window\_modules/*
    -   'Aquí están todas las ventanas que se lanzan. Todas son objetos con una función \_\_init\_\_ y las funciones setTk y shoTk. Las funciones setTk crean los objetos Tk, mientras que shoTk los coloca en la pantalla con grid. Mantenerlas separadas facilita el mantenimiento del código. Si quieres una ventana nueva, ponla aquí. Si tiene otras dependencias, ayuda al usuario a configurarlas y usa try: al importar

-   *toolkit/modules*
    -   Aquí hay clases útiles para la GUI. Si tienes una clase genial, ¡ponla aquí!
    -   *toolkit/modules/protocols* : Aquí están los protocolos que he usado en el toolkit. Cada clase de protocolo hereda de ProtocolBaseClass. Para ejecutar tu protocolo, configura el mover y usa self.run\_protocol(my\_mover). Esto configurará la ejecución multiproceso, leerá las opciones de salida de output\_class y, en general, ejecutará tu protocolo. Los protocolos nuevos deben ir aquí.
    -   *toolkit/modules/tools* : Son sobre todo funciones, debido a la insistente necesidad de Tk de usar funciones en lugar de TCL/TK, donde podías escribir unas pocas líneas de código directamente en la función command:lambda. Ya llegaremos a eso. Baste decir que, si quieres usar Tk, todo tiene que ser una función. Las herramientas son básicamente colecciones de funciones usadas por varias clases de la GUI.
    -   *toolkit/modules/definitions* : Aquí es donde debes poner cualquier gran cantidad de información a la que necesites acceder. Tengo allí un archivo para diseño que define los tipos de resfile, así como toda la información bioquímica para diseño.

=== Variables globales ===

-   **Cómo funcionan los módulos de window\_main**
    -   window\_main/IO contiene la mayoría de las variables relevantes. Pasa input\_class u output\_class, o variables concretas de ellas.

-   **Variables del Toolkit**
    -   *toolkit.pose* : Aquí está el Pose cargado. Se pasa una referencia por toda la GUI.
    -   *toolkit.native\_pose* : Se establece al cargar el Pose y se usa principalmente para RMSD, pero también puede usarse para otros protocolos y análisis.
    -   *toolkit.current\_directory* : Aquí está el directorio que se establece al cargar un Pose. Otras funciones pueden modificarlo, ya que controla el directorio inicial en una ventana tKFileDialog.
    -   toolkit.score\_class.score : Aquí está la función de puntuación actual. Tengo el presentimiento de que la vas a necesitar...
    -   toolkit.pymol\_class : Aquí se guardan los adorables objetos PyMOL Observer y PyMOL Mover, como pymol\_class.pyobserver y pymol\_class.pymover respectivamente. La casilla observe pymol tiene una retrollamada que añade y quita un observador según haga falta. Si quieres controlarlo, pasa este objeto a tu clase o función.

-   **Variables de GUIInput**
    -   *input\_class.filename* : Nombre de archivo del PDB cargado. Se pasa a PyMOL y a la ventana principal de salida.
    -   *input\_class.loops\_as\_strings* : Es un arreglo de las regiones especificadas en la parte de entrada [ 24:42:L, ::A, ] etc.
    -   *input\_class.regions* : Es una instancia de la clase Regions. Reemplaza a loops as strings para controlar y acceder a información específica de cada región, como movemaps, secuencias, taskfactories, etc.

-   -   *input\_class.options\_manager* : Es la ventana de opciones que aparece. Además, contiene las opciones establecidas actualmente para poder reinicializarlas cuando se ejecuta un protocolo en varios procesadores. Si quieres habilitar una variable de forma permanente, usa input\_class.options\_manager.add\_option(option\_string\_with\_-). De lo contrario, usa rosetta.basic.options.set\_sometype\_option('option', value)

-   **Variables de GUIOutput**
    -   *output\_class.outdir* : Directorio especificado en la sección de salida de la GUI. Por defecto es donde se cargó el Pose.
    -   *output\_class.outname* : Nombre de la salida. JD2 lo usa para escribir la salida tras un protocolo. La variable se establece en la parte de salida de la ventana principal.
    -   *output\_class.terminal\_output* : Es la variable IntVar establecida con una retrollamada que controla la redirección a la ventana de terminal. 0 para el cuadro de texto, 1 para el terminal.

Recursos / Descripción general de Tkinter
--------------------------

=== Recursos ===

[Descripción](http://wiki.python.org/moin/TkInter)

[Empieza aquí](http://www.pythonware.com/library/tkinter/introduction/)

[Buen tutorial](http://sebsauvage.net/python/gui/)

[Avanzado](http://infohost.nmt.edu/tcc/help/pubs/tkinter/)

[Complejo. Libro. Guía completa de Tkinter.](http://www.amazon.com/Python-Tkinter-Programming-Grayson-Ph-D/dp/1884777813)

=== Programa básico ===

=== Funciones útiles ===

`      import tkFileDialog     `

`      import tkSimpleDialog     `

`      import tkMessageBox     `

`      filename = tkFileDialog.askopenfilename(title="", message="", initialdir=global_variables.current_directory)     `

`      filename = tkFileDialog.asksaveasfilename()     `

`      my_float = tkSimpleDialog.askfloat(title="float", prompt="Please enter...", initialvalue=10.0)     `

`      my_integer = tkSimpleDialog.askinteger     `

`      my_string =  tkSimpleDialog.askstring     `

`      result = tkMessageBox.askyesno(prompt = "proceed?")     `

=== Consejos ===

-   -   Usa command:lambda self.my\_func cuando uses botones o elementos de menú.

-   -   Comprueba si el usuario pulsó cancelar (el resultado pasa a ser NoneType) después de un aviso: `      if not result:return     `

-   -   Establece current\_directory después de que el usuario haya elegido guardar o cargar algo: `      global_variables.current_directory=os.path.dirname(just_opened_path)     `

-   -   Si usas cualquier tipo de multiprocesamiento en el que intervengan números aleatorios, usa `      input_class.options_manager.re_init()     ` en cada procesador para generar una nueva semilla para esa instancia concreta.

Añadir código
------------------

=== Ventana principal ===

-   */toolkit/pyrosetta\_toolkit.py*
-   */toolkit/window\_main*
    -   Si quieres añadir otra sección a la ventana principal, coloca el archivo en /window\_main. Debe tener tres funciones principales y heredar de la clase Frame de Tkinter.
        -   **def \_\_init\_\_(self, main, toolkit, \*\*options):**
            -   El constructor predeterminado debe recibir un tk principal (main), una instancia del propio toolkit y \*\*options, que indica la posibilidad de pasar opciones de Frame al objeto.
            -   Dentro del constructor hay que definir lo siguiente: Frame.\_\_init\_\_(self, main, \*\*options)

        -   **create\_GUI\_objects(self):**
            -   Aquí debes inicializar tus objetos Tk: optionMenu, Buttons, etc. Establece las retrollamadas en la función \_\_init\_\_. Debes pasar self en lugar de self.main al construir cada objeto de la GUI

        -   **grid\_GUI\_objects(self)::**
            -   Esto debe colocar los elementos de la ventana con grid. Ten en cuenta que esta cuadrícula es independiente de la de pyrosetta\_toolkit.py. Esto te permite a ti y a otros desarrolladores mover los subcomponentes de main\_window sin cambiar tu diseño ni hacerlo manualmente.

        -   **toolkit.sho\_gui**
            -   Aquí debes llamar a tu ventana principal. Puedes inicializarla en cualquiera de las funciones \_x o añadir la tuya. Tus funciones de creación y de grid deben colocarse aquí.

=== Elementos de menú ===

-   */toolkit/window\_main/menu.py*
    -   Aquí añadimos comandos o dibujamos ventanas nuevas. Sorprendentemente, la sintaxis es bastante sencilla. Primero, busca el elemento de menú al que quieres añadir.
    -   *Añadir comandos* : menu.add\_command(label = "Cool function", command = lambda: func) ¡Eso es todo!

=== Ventanas ===

-   *Añadir ventanas* :
    -   *El archivo:* Añade el o los archivos a window\_modules. Sigue la guía de window\_main, ya que deberías tener tanto una ventana setTk como una shoTk, aunque en este caso no es estrictamente necesario. Si lees el libro, las ventanas pueden llegar a ser bastante complicadas, así que haz lo que necesites. window\_modules/rosetta\_tools/RosettaSetup.py tiene un ejemplo de ventana de diálogo si lo necesitas, pero las posibilidades son realmente muy buenas.
    -   *El código:* Esto es algo más complicado. Debes añadir a menu.py una función que inicialice tu ventana (si no lo has hecho en la clase principal toolkit) y luego llamar a tus funciones setTk y shoTk si las tienes. La principal debe usar esta sintaxis: x = Toplevel(self.main). Esto dibuja una ventana nueva. Define tu comando y ¡voilà, tu nueva ventana! Tk puede ser un fastidio, pero es lo más sencillo que hay.

=== Código existente ===

-   A estas alturas deberías tener una idea de dónde poner cada cosa y de cómo añadir la mayoría de las cosas. Si tienes preguntas, envíame un correo y puedo ayudarte.

##Véase también

* [[PyRosetta]]: la página principal de PyRosetta en la wiki
* [[PyRosetta Toolkit GUI]]: información sobre la interfaz de usuario del PyRosetta Toolkit
* [[PyMOL]]: más información sobre PyMOL
* [[Extending the PyMol Viewer]]: cómo añadir nueva funcionalidad al Mover de PyMOL de Rosetta
* [[Sitio web de PyRosetta (externo)|http://www.pyrosetta.org]]
* [[Graphics and GUIs]]: página de inicio de las interfaces gráficas con Rosetta

#Extender el visor de PyMol

## Metadatos
Autores: Rebecca Alford (rfalford12@gmail.com) y Evan Baugh (ehb250@nyu.edu)

Última actualización: 7/10/14

##Resumen
Rosetta incluye varias herramientas para ejecutar simulaciones interactivas y visuales, entre ellas Foldit, el PyRosetta toolkit y el visor de PyMol. Todas estas herramientas se tratan en general [[aquí|graphics-and-guis]], pero esta página se centra específicamente en extender las funciones del visor de PyMol. 

El PyMolViewer permite la visualización interactiva y en tiempo real de simulaciones de Rosetta. Tanto Rosetta3 (C++) como PyMol usan el PyMolMover: un mover que extrae información del Pose y la envía por una red. Esta información la recibe luego una sesión activa de PyMol que ejecuta el script `PyMolPyRosettaServer.py`. Este script servidor interpretará el mensaje recibido y ejecutará los comandos de PyMol apropiados para la visualización. 

## Ejecutar el PyMol Mover
El visor de PyMol se puede ejecutar con los siguientes pasos: 

1. Abre una nueva sesión de PyMol. Ejecuta el script servidor `PyMolPyRosettaServer.py`, que se encuentra en `source/src/python/bindings/`

2. En tu aplicación de Rosetta, pasa la opción `-show_simulation_in_pymol (Real)`, donde el entero especifica la frecuencia con la que deben enviarse actualizaciones a pymol. El valor por defecto es 1. 

3. Ejecuta tu simulación y verás cómo se envían a PyMol actualizaciones de la conformación y de la energía.


## Extender el PyMol Mover
Tanto la versión de C++ como la de PyRosetta del visor de PyMol contienen diversas funciones para actualizar el Pose. Entre ellas están colorear por energías, mostrar redes de enlaces de hidrógeno, la estructura secundaria, etc. Es muy fácil extender el visor de PyMol para que envíe información nueva. Estos son los pasos básicos: 

1. Añade un método "send_xxx" al `PyMolMover`, donde "xxx" describe tu función. Este método debe extraer del Pose, o de donde haga falta, la información necesaria para ejecutar los comandos de PyMol. Por ejemplo, la visualización de la estructura secundaria podría requerir el envío de anotaciones DSSP (H, L, E, etc). 

2. El método send_xxx debe comprimir la información en una cadena y enviarla mediante link_.send_message( my_msg ). Los mensajes deben empezar con una cadena única de 3 letras, contener una longitud del mensaje y una variable de nombre para poder interpretarlos, y estar comprimidos en .gzip o .bz2. 

3. En el método apply del PyMolMover, añade una llamada a tu método send_xxx para enviar la información al actualizar. Quizá quieras añadir opciones para controlar este comportamiento: cuanta más información necesite comunicar Rosetta a PyMol en un paso dado, más tardará la simulación. 

4. En el script PyMolPyRosettaServer.py, escribe una nueva instrucción else if que procese un paquete de datos que empiece con tu cadena única. Después de desempaquetar el mensaje (hay código de ejemplo para esto en ese script), ejecuta los comandos de PyMol que quieras con estos datos. Los comandos de PyMol se pueden ejecutar mediante la interfaz cmd. 

5. Adelante, ejecuta el visor de PyMol tal cual (junto con las nuevas opciones que hayas añadido para invocar tu comportamiento). Deberías ver tu estructura actualizándose con tus nuevas funciones.  

El visor de PyMol se puede extender tanto en C++ como en PyRosetta.  

## Referencias
Baugh EH, Lyskov S, Weitzner BD, Gray JJ (2011) Real-Time PyMOL Visualization for Rosetta and PyRosetta. PLoS ONE 6(8): e21931.


##Véase también

* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[PyMOL]]: Página del wiki sobre PyMOL y el PyMOL Mover
* [[PyMolMover]]: Página del PyMolMover de RosettaScripts
* [[Sitio web de PyMOL (externo)|http://www.pymol.org]]
* [[Graphics and GUIs]]: Página de inicio de las interfaces gráficas de Rosetta
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[PyRosetta Toolkit]]: Tutoriales para usar y modificar la interfaz gráfica del PyRosetta Toolkit
* [[PyRosetta Toolkit GUI]]: Información sobre la interfaz de usuario del PyRosetta Toolkit

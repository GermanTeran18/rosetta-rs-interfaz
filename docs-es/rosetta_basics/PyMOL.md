PyMOL
=====

[PyMOL](http://www.pymol.org/) es una herramienta de visualización molecular muy utilizada
en la comunidad de Rosetta.

La [wiki de PyMOL](http://www.pymolwiki.org/index.php/Main_Page) contiene
documentación sobre los métodos del programa y numerosos ejemplos. Quienes empiezan
deberían comenzar
[con este tutorial](http://www.pymolwiki.org/index.php/Practical_Pymol_for_Beginners).
Un [taller](https://www.pyrosetta.org/documentation/tutorials) sencillo forma parte de los
tutoriales de [PyRosetta](/index.php/PyRosetta "PyRosetta").

Si compilas PyMOL desde el código fuente en Linux (no lleva mucho tiempo y se explica
[aquí](http://www.pymolwiki.org/index.php/Linux_Install)), puede que
necesites instalar los paquetes python-dev y glutg3-dev y posiblemente también el
paquete mesa-common-dev.  Más abajo se incluyen algunas notas sobre cómo compilar PyMOL para Python 2.7 en un sistema con Python 3.

Puedes encontrar información sobre cómo hacer películas en PyMOL en  [http://www.pymolwiki.org/index.php/PLoS](http://www.pymolwiki.org/index.php/PLoS).

PyMOL\_Mover
------------

PyMOL es tan popular en la comunidad que desarrollamos un Mover para enviar
datos de Rosetta directamente a PyMOL.

### Lado de PyMOL

#### *Configurar PyMOL*

En PyMOL, ejecuta el script PyMOL-RosettaServer.py, que se encuentra en
`<path to Rosetta main>/source/src/python/PyRosetta/src/PyMOL-RosettaServer.py` (el directorio principal de PyRosetta). Esto
iniciará el listener y mostrará información sobre la conexión
establecida. No debería hacer falta nada más para ver la salida de PyMOL\_Mover
desde el mismo equipo. 

Recomendamos crear un archivo `.pymolrc` en tu carpeta personal y añadir la siguiente línea: 

`run <path to Rosetta main>/source/src/python/PyRosetta/src/PyMOL-RosettaServer.py`

Así es cómodo: el enlace PyMOL-Rosetta se establece cada vez que inicias PyMOL.

#### *Cambiar la IP del listener de PyMOL*

`start_rosetta_server`

Así de sencillo. Este método del script del servidor se conecta automáticamente
a la IP actual de la máquina. Esta dirección IP puede fijarse manualmente y el
script del servidor se conecta por defecto a 127.0.0.1. Asegúrate de que la
conexión sea a una IP accesible y de que PyMOL\_Mover
esté enviando la salida a esa IP. Para cambiar la IP manualmente, usa cualquiera de los comandos
siguientes en una línea de comandos de PyMOL:

`start_rosetta_server 187.1.3.37, 9001 \\` 

o 

`cmd.start_rosetta_server("187.1.3.37","9001")`

### Uso desde Rosetta

Estas son las opciones para observar una simulación de Rosetta a través de JD2, el gestor de trabajos de Rosetta. Para el código de PyRosetta, véase más abajo. 

```
-show_simulation_in_pymol <argument, default=5.0> 
```

- Conecta el observador de PyMOL a la Pose al comienzo de la simulación y emite un nuevo «estado» de PyMOL cada <argument> segundos. ¡Un valor de 0 indica que no se omita ningún paquete del envío! No olvides ejecutar el script PyMOLPyRosettaServer.py dentro de PyMOL.

```
-update_pymol_on_energy_changes_only 'Boolean'
```
 - default = 'false', 
 - 'Solo actualiza la simulación cuando cambia la energía.  Útil si el observador de PyMOL da fallos de segmentación con los cambios de longitud.

```
-update_pymol_on_conformation_changes_only 'Boolean'
```
 - default = 'false'
 - Solo actualiza la simulación en PyMOL cuando cambia la conformación.

```
-keep_pymol_simulation_history, 'Boolean'
```
 - default = 'false'
 - ¿Conservar el historial al usar la opción show_simulation_in_pymol?


### Uso desde PyRosetta

#### *Enviar estructuras*

Al aplicar el mover se envían los datos de coordenadas de la Pose a PyMOL, que
genera una imagen de la estructura. Simplemente aplica el mover a una Pose. Puedes
conseguir los mismos resultados usando dump\_pdb para producir un .pdb de la
Pose y cargarlo en PyMOL... pero el mover es mucho más rápido y evita
escrituras de archivos innecesarias.\
\
 `pymover = PyMOL_Mover() pymover.apply(pose)`

#### *Enviar la energía*

Usa el método send\_energy para colorear la estructura en PyMOL según las
energías relativas de los residuos. Actualmente, el espectro de color va del azul
(energía baja = feliz) al rojo (energía alta = triste). Asegúrate de que la Pose se haya puntuado
antes. send\_energy puede aceptar el nombre de un ScoreType y colorear
los residuos en PyMOL según ese término de energía de la última función de puntuación
aplicada.

` pymover.send_energy(pose) pymover.send_energy(pose,"fa_atr") pymover.update_energy=True pymover.apply(pose) pymover.energy_type="fa_sol" pymover.apply(pose)`

PyMOL\_Mover tiene una opción update\_energy que, cuando es True,
colorea automáticamente los residuos por energía cuando se aplica el Mover. El
término de energía enviado puede fijarse con la opción PyMOL\_Mover.energy\_type.

#### *Cambiar la IP del Mover*

Para enviar la salida de PyMOL\_Mover a una nueva dirección IP, simplemente cambia las
opciones de PyMOL\_Mover como se indica a continuación:

` pymover.link.udp_ip = '127.0.0.1' pymover.link.udp_port = 65000 pymover.apply(pose)`

#### *Conservar el historial*

Otra característica útil de PyMOL\_Mover es la opción keep\_history. Cuando
está en True, las Poses con el mismo «nombre» (véase más abajo) se cargan en nuevos
estados del objeto de PyMOL asociado; es decir, aplicar PyMOL\_Mover
no sobrescribe la estructura en PyMOL, sino que la carga en el siguiente
estado. Con esos estados de salida se pueden crear fácilmente películas del protocolo
usando las funciones de PyMOL para crear películas.

` pymover.keep_history=True pymover.apply(pose) other_mover.apply(pose) pymover.apply(pose)`

Para ver con precisión los cambios intermedios, puedes cambiar el nombre de la Pose.
Esto dará lugar a un objeto distinto cuando los datos de la Pose se carguen en
PyMOL. Para cambiar el nombre de una Pose usa: ` pose.pdb_info().name("new_name")`
Recuerda que el color en PyMOL es por objeto, NO por estado, así que cualquier coloreado posterior
borrará el coloreado anterior (otra razón por la que quizá quieras
cambiar el nombre de la Pose al inspeccionar un protocolo).

#### *Observador de PyMOL*

El objeto PyMOL\_Observer espera a que ocurran «eventos» en la Pose y,
cuando se activa, aplica su propio PyMOL\_Mover a la estructura. Es
ideal para situaciones en las que no quieres aplicar el mover directamente,
como protocolos largos o inspecciones rápidas. Como un PyMOL\_Observer
tiene un PyMOL\_Mover, todas las opciones anteriores pueden fijarse en su mover
(llamado pymol), incluidas keep\_history, link.udp\_ip y
update\_energy.

` pyobs = PyMOL_Observer() pyobs.add_observer(pose) pyobs.pymol().update_energy=True`

##Cómo hacer funcionar PyMOLObserver en un sistema con Python3
Algunos sistemas Linux, incluidos los basados en Arch como Manjaro, Antergos y ArchBang, ahora incluyen Python3 por defecto.
Python2 también está disponible.
Pymol (instalado con Python3) no funciona con el PyMOLObserver de Rosetta.

Para compilar e instalar Pymol con Python2.7, en una versión compatible con Rosetta:

1) Requisitos
Se necesitan las bibliotecas, así como los archivos de desarrollo (cabeceras), del siguiente software:
* Subversion
* Python (con distutils)
* Pmw (Python Megawidgets)
* Controlador de OpenGL (NVidia funciona)
* GLEW
* GLUT (freeglut)
* libpng
* freetype
* libxml2 (opcional, para exportar a COLLADA; se desactiva con --no-libxml)
* msgpack-c 1.0+ (opcional, para la carga rápida de MMTF, nuevo en SVN r4167; se desactiva con --use-msgpackc=no)

2) Obtén el código fuente más reciente desde SVN
Supongamos que descargamos el código fuente de Pymol en /tmp. Esto descargará el código fuente más reciente en /tmp/pymol:
```
cd /tmp
svn co svn://svn.code.sf.net/p/pymol/code/trunk/pymol
cd pymol
```
3) Compilar e instalar Pymol

Esto instalará PyMOL como usuario normal en ${HOME}/pymol-svn:
```
prefix=${HOME}/pymol-svn
modules=$prefix/modules
python2.7 setup.py build install --home=$prefix --install-lib=$modules --install-scripts=$prefix
```
Ahora inicia PyMOL así:
```
${HOME}/pymol-svn/pymol
```
Para añadir este nuevo PyMOL a tu path:
```
sudo ln -s ${HOME}/pymol-svn/pymol /usr/bin/pymol
```
4) Conectar con Rosetta

Mientras uses este pymol recién compilado, funcionará con Rosetta con normalidad; no uses por error un PyMOL con Python3 instalado previamente.

##Véase también

* [[Sitio web de PyMOL (externo)|http://www.pymol.org]]
* [[PyMolMover]]: documentación de PyMolMover de RosettaScripts
* [[Graphics and GUIs]]: Página de inicio de las interfaces gráficas con Rosetta
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Extending the PyMol Viewer]]: Cómo añadir nuevas funcionalidades al PyMOL Mover de Rosetta
* [[PyRosetta Toolkit]]: Tutoriales para usar o modificar la interfaz gráfica del PyRosetta Toolkit
* [[PyRosetta Toolkit GUI]]: Información sobre la interfaz de usuario del PyRosetta Toolkit

## Metadatos

El módulo de Python AMBRose fue desarrollado por Maria Szegedy (Khare Lab), Kristin Blacklock (Khare Lab) y Hai Nguyen (Case Lab) en la Universidad de Rutgers.

Última actualización: 28 de agosto de 2019.

Para consultas, contacta a: 
- [Maria Szegedy](https://github.com/mszegedy) ([mszegedy2@gmail.com](mszegedy2@gmail.com))
- Investigador principal correspondiente: Sagar D. Khare ([khare@chem.rutgers.edu](khare@chem.rutgers.edu))

## ¿Por qué AMBRose?
¿Alguna vez has querido que Rosetta haga sin complicaciones una simulación de MD de tu estructura y use fotogramas de ella en tu protocolo? ¿O simplemente has deseado automatizar la creación de archivos de entrada de MD? Si es así, AMBRose es el módulo complementario de PyRosetta para ti. Con AMBRose, obtener datos de MD puede ser tan fácil como configurar un mover. ¡Descarga AMBRose hoy y descubre lo que la MD puede hacer por _tu_ proyecto! (Ningún mover real resultó dañado durante la creación de este software).

## Descripción
Este módulo ofrece varias funciones para la intercompatibilidad entre AMBER y Rosetta. Las principales son:
- La conversión de un Pose en coordenadas iniciales para sander/PMEMD
- El volcado de archivos PDB compatibles con LEaP a partir de Poses
- La minimización y la simulación de Poses en sander/PMEMD sin tener que trabajar explícitamente con construcciones de AMBER
- La conversión de trayectorias en series de Poses

Para la API completa, consulta los docstrings de los módulos y objetos de AMBRose. Con el tiempo se convertirán en documentación de readthedocs.io.

## Requisitos del sistema
- Python 3.6+
- [[PyRosetta|http://www.pyrosetta.org/]] (módulo de Python)
- AmberTools (versión >= 16) con [[pytraj|https://amber-md.github.io/pytraj/latest/installation.html#install]] (módulo de Python)
- Versiones operativas de algunos ejecutables de [[AMBER16+|http://ambermd.org/GetAmber.php]], en particular:
  - pmemd.cuda
  - tleap

Asegúrate de que la variable de entorno `$AMBERHOME` apunte al directorio donde está instalado AMBER. (Es el directorio donde están `bin/pmemd.CUDA`, `amber.sh`, etcétera).

### Solo para versiones antiguas (legacy):
- AmberTools (versión >= 16) con pytraj y sander (módulo de Python)
- [[mpi4py|https://mpi4py.readthedocs.io/en/stable/install.html]] (módulo de Python)


## Limitaciones de AMBRose

AMBRose puede trabajar con (es decir, convertir de un medio a otro) cualquiera de estas tres cosas:
- Proteínas canónicas
- ARN canónicos
- ADN canónicos

Todo lo que vaya más allá (ligandos, residuos no canónicos, la mayoría de las modificaciones postraduccionales) casi con seguridad fallará al convertirse.

Por ahora, los movers de AMBRose solo ejecutan minimizaciones y simulaciones en la GPU, con pmemd.cuda. Esto no es un gran problema, porque el cálculo en GPU es lo más avanzado en AMBER y todos los desarrolladores de AMBER se concentran actualmente en él. Sin embargo, si por alguna razón necesitas calcular en CPU, se pueden configurar para hacerlo, pero en la mayoría de los casos solo podrán ejecutarse en un núcleo. Es poco probable que este problema se resuelva.

## Cómo instalar AMBRose
### Automáticamente
Actualmente puedes instalar AMBRose con cualquier herramienta capaz de manejar un script `setup.py`, como `pip`. Si eliges esta vía, primero debes clonar [RosettaCommons/tools,](https://github.com/RosettaCommons/tools) y después ir al directorio [`tools/AmbRose`](https://github.com/RosettaCommons/tools/tree/master/AmbRose). Allí, ejecuta

```
$ pip install --user .
```

lo que copiará la carpeta `ambrose` al lugar correcto de tu `PYTHONPATH`.

### Manualmente

Si sabes en qué lugar de tu `PYTHONPATH` quieres guardar AMBRose, puedes copiar el directorio [`tools/AmbRose/ambrose`](https://github.com/RosettaCommons/tools/tree/master/AmbRose/ambrose) directamente a donde necesites. Solo asegúrate de que esté en alguna de las carpetas de tu `PYTHONPATH`.

## Cómo usar AMBRose

Primero, importa PyRosetta y AMBRose:

```
>>> import pyrosetta as pr; pr.init()
>>> import ambrose
```

### Explorar la API de AMBRose

Por ahora, la mejor forma de explorar la API de AMBRose es a través de sus docstrings. Puedes consultarlos con la función `help()`:

```
>>> help(ambrose)
```

Si quieres leer los docstrings de un submódulo concreto o de un objeto específico, también puedes usar `help()`:

```
>>> help(ambrose.pose_selectors)
>>> help(ambrose.AMBERSimulateMover)
```

### Convertir Poses en archivos de entrada

AMBRose puede convertir un Pose en archivos de entrada para sander/PMEMD. Para ello, usa la función `pose_to_amber_params`:

```
>>> pose = pr.pose_from_file('my-protein.pdb')
>>> ambrose.pose_to_amber_params(pose,
...                              crd_path='my-protein.rst7',
...                              top_path='my-protein.parm7')
```

Esto creará los archivos `my-protein.rst7` y `my-protein.parm7`, que se pueden usar como coordenadas iniciales para sander/PMEMD. Puedes pasar argumentos adicionales para controlar la solvatación del Pose; consulta la salida del comando `help(ambrose.pose_to_amber_params)`.

### Convertir trayectorias en Poses

AMBRose puede leer una trayectoria y devolver sus fotogramas como Poses. Para ello, primero debes importar el módulo pytraj de AmberTools y leer tu trayectoria como un objeto `Trajectory`. Luego puedes usar el objeto `TrajToPoses` de AMBRose para convertirla en una secuencia de Poses:

```
>>> import pytraj as pt
>>> traj = pt.iterload('my-protein.rst7', 'my-protein.parm7')
>>> poses = ambrose.TrajToPoses(traj)
```

Los objetos `TrajToPoses` se pueden indexar y segmentar como cualquier secuencia. Sus elementos son los Poses correspondientes a cada fotograma sucesivo de la trayectoria de la que provienen. Por ejemplo, para obtener un Pose correspondiente al último fotograma de una trayectoria, puedes ejecutar el código anterior y después:

```
>>> pose = poses[-1]
```

### Simular un Pose sin tocar AMBER

Los "movers" de AMBRose (que no son movers de verdad, pero están construidos para funcionar como ellos) buscan abstraer todo el proceso de convertir a AMBER, simular un Pose, convertir los fotogramas de vuelta y seleccionar un fotograma. `AMBERSimulateMover` hace exactamente eso. Cuando se llama a su `apply()` sobre un Pose, crea y ejecuta una simulación con los parámetros que hayas especificado y reemplaza el Pose por el último fotograma de la trayectoria de la simulación. Este es un ejemplo en el que simulamos un Pose durante 10 ps a 303 K (empezando desde 273 K), con solvente explícito, y lo reemplazamos por el último fotograma de la simulación:

```
>>> pose = pr.pose_from_file('my-protein.pdb')
>>> mover = ambrose.AMBERSimulateMover()
>>> mover.duration = 10.     # 10 picoseconds
>>> mover.temperature = 303. # 303 kelvin
>>> mover.starting_temperature = 273.
>>> mover.solvent = ambrose.Solvents.SPCE_WATER
>>> mover.working_dir = 'my-simulation-dir'
>>> mover.prefix = 'my-simulation'
>>> mover.apply(pose) # overwrites pose and creates many files in my-simulation-dir
```

Puedes cambiar qué Pose se selecciona sobrescribiendo el `pose_selector` del mover. Consulta el submódulo `ambrose.pose_selectors` para ver cómo deben ser las funciones selectoras de Poses.

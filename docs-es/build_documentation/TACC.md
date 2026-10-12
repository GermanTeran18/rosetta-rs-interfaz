Usar Rosetta y PyRosetta en TACC/Stampede
============================================

*NOTA: el proyecto XSEDE ya no está en funcionamiento. TACC sigue existiendo y puede estar ofreciendo acceso a Rosetta, pero la información que sigue puede estar desactualizada.*

TACC/Stampede
-------------

Como parte del proyecto Extreme Science and Engineering Discovery Environment (XSEDE <https://www.xsede.org/>), tanto Rosetta como PyRosetta están instalados en el sistema Stampede del Texas Advanced Computing Center (TACC <https://www.tacc.utexas.edu/>).
XSEDE es un proyecto para ofrecer a los investigadores de EE. UU. un único sistema virtual con acceso a recursos computacionales de todo el país. Consulta el sitio web de XSEDE (<https://www.xsede.org/>) para más información y detalles sobre cómo obtener acceso.

Obtener acceso a Rosetta y PyRosetta
-----------------------------------------

El acceso a Rosetta y PyRosetta en TACC/Stampede está limitado a usuarios académicos y solo para uso no comercial. Antes de usar Rosetta y PyRosetta en TACC/Stampede, primero debes obtener una licencia académica (gratuita) para los programas que quieras usar. (Si quieres usar tanto Rosetta como PyRosetta, firma ambos acuerdos de licencia.) Las licencias de Rosetta y PyRosetta se pueden obtener en <https://www.rosettacommons.org/software/license-and-download>. La tramitación de las licencias académicas debería ser rápida y, poco después de rellenar los acuerdos de licencia, se te enviará por correo electrónico la prueba de la licencia. (Revisa tu carpeta de correo no deseado y tus filtros de correo si no recibes el correo de confirmación.)

Una vez que recibas la confirmación de la licencia, debes obtener autorización de TACC para acceder al módulo de Rosetta y PyRosetta instalado localmente. (Las instrucciones actuales para obtener la autorización deberían imprimirse en el terminal cuando ejecutes "module load rosetta" o "module load pyrosetta" como usuario no autorizado.) La autorización se puede obtener a través del sistema de ayuda de XSEDE en <https://portal.xsede.org/group/xup/help-desk>: simplemente selecciona Category:Software System:Stampede y proporciona la prueba de la licencia de Rosetta y/o PyRosetta en el cuadro Problem Description. 

Ponerse en contacto con el administrador de TACC a través del sistema de ayuda de XSEDE es suficiente para obtener acceso. Rosetta y PyRosetta se ofrecen como módulos precompilados y no se necesita ningún archivo de licencia, clave, hash ni contraseña adicionales para ejecutar Rosetta y PyRosetta en TACC/Stampede, una vez que hayas verificado tu licencia con el personal de TACC. (La licencia también te permitirá descargar e instalar los programas en tus propios sistemas locales, si lo deseas. Necesitarás el nombre de usuario y la contraseña que se proporcionan en el correo de confirmación de la licencia si quieres descargar e instalar Rosetta y PyRosetta en sistemas locales.)

Si te interesa el uso comercial de Rosetta y PyRosetta, consulta <http://www.rosettacommons.org> para obtener información sobre licencias. Ten en cuenta que las políticas de XSEDE prohíben el uso de los recursos de TACC/Stampede con fines comerciales.


La diferencia entre Rosetta y PyRosetta
--------------------------------------------

Tanto Rosetta como PyRosetta son suites de software completas para el diseño y el modelado de estructuras macromoleculares. Ambas usan una biblioteca de herramientas de modelado macromolecular escrita en C++. Rosetta ofrece una interfaz a esas bibliotecas mediante ejecutables de línea de comandos compilados, mientras que PyRosetta ofrece acceso a través de una interfaz en el lenguaje de programación Python. 

Tanto Rosetta como PyRosetta pueden lograr resultados de diseño y modelado similares. La elección de cuál usar depende de la preferencia personal. La interfaz estándar de Rosetta es buena para quienes buscan incorporar el modelado macromolecular en un flujo de trabajo orientado a la línea de comandos, mientras que PyRosetta es la opción para quienes prefieren usar un flujo de trabajo con scripts de Python o necesitan la flexibilidad que puede aportar una interfaz de biblioteca más directa.

Ejecutar comandos de Rosetta en TACC/Stampede
=========================================

Para los usuarios del clúster TACC/Stampede se ofrece una versión precompilada de Rosetta. (Consulta la guía de usuario de XSEDE <https://www.xsede.org/using-xsede> sobre cómo iniciar sesión en Stampede. Actualmente, la forma recomendada es entrar por ssh al punto central de inicio de sesión login.xsede.org y desde allí iniciar sesión en el sistema Stampede.)

Para inicializar tu entorno de línea de comandos de Stampede para usar Rosetta, usa el mecanismo estándar de carga de módulos de XSEDE (<https://www.xsede.org/software-environments>):

    module load rosetta

Puede ser necesario cargar versiones específicas del compilador y de las bibliotecas MPI antes de cargar rosetta:

    module load intel/14.0.1.106
    module load mvapich2/2.0b
    module load rosetta

Ejecuta `module spider rosetta` para ver una lista actual de dependencias. `module spider rosetta` también se puede usar para descubrir si hay versiones alternativas de Rosetta disponibles. Una vez cargado Rosetta, `module list rosetta` te dirá qué versión se está usando actualmente.

*Nota: a enero de 2015, la versión predeterminada actual de Rosetta en Stampede es Rosetta-3.5* 

Al cargar el módulo rosetta, los ejecutables de Rosetta se colocarán en tu PATH y también se establecerán las variables de entorno TACC_ROSETTA_BIN y TACC_ROSETTA_DATABASE, lo que te permite ejecutar los ejecutables de Rosetta:

    ${TACC_ROSETTA_BIN}/rosetta_scripts.default.linuxiccrelease -database ${TACC_ROSETTA_DATABASE} @rosetta.options

*Nota: a enero de 2015, la instalación actual de Rosetta en TACC es solo para MPI; las compilaciones de la serie "default" no existen.*

Ten en cuenta que querrás ejecutar los ejecutables mediante el sistema estándar de envío por lotes de TACC/Stampede (SLURM). Consulta <https://www.xsede.org/web/guest/tacc-stampede#running> para más detalles.

Consulta la documentación principal de Rosetta en <https://www.rosettacommons.org/docs/latest/> para más información sobre qué aplicaciones usar para cada fin de modelado concreto y para ver detalles sobre cómo preparar los archivos de opciones adecuados.

Ejecuciones multiprocesador con Rosetta
--------------------------------

### MPI

Como TACC cobra por el acceso al nodo completo, independientemente del número de procesadores que se usen, lo mejor es que Rosetta distribuya automáticamente las estructuras de salida entre los distintos procesadores. Además, ciertos protocolos requieren una comunicación interna más extensa y, por tanto, no se pueden paralelizar de forma trivial.

Para estos fines, Rosetta tiene un modo de paralelización MPI. La compatibilidad con MPI ya está disponible en la aplicación de Rosetta que se carga con `module load rosetta`. Rosetta MPI en TACC/Stampede se ha compilado con las bibliotecas MPI mvapich2, y una ejecución de Rosetta MPI se puede iniciar en TACC/Stampede con 

    ibrun ${TACC_ROSETTA_BIN}/rosetta_scripts.mpiomp.linuxiccrelease -database ${TACC_ROSETTA_DATABASE} @rosetta.options

Por supuesto, debes lanzar tus trabajos en TACC/Stampede mediante el sistema de gestión por lotes SLURM:

Ejemplo de archivo SLURM para una ejecución MPI de Rosetta:

```
#!/bin/bash
#SBATCH -J RosettaRun_%j   # job name
#SBATCH -o myMPI.o%j       # output and error file name (%j expands to jobID)
#SBATCH -n 32              # total number of mpi tasks requested
#SBATCH -p normal          # queue (partition) -- normal, development, etc. 
#SBATCH -t 01:30:00        # run time (hh:mm:ss) - 1.5 hours
#SBATCH --mail-user=username@example.com
#SBATCH --mail-type=fail   # email me if the job fails
#SBATCH -A A-yourproject   # Allocation to charge time against.

module load intel/14.0.1.106
module load mvapich2/2.0b
module load rosetta

#Alter the job control above as desired and then use "ibrun" to launch your jobs

ibrun ${TACC_ROSETTA_BIN}/rosetta_scripts.mpiomp.linuxiccrelease -database ${TACC_ROSETTA_DATABASE} @rosetta.options &>> rosetta.log
```

Ciertos protocolos requerirán opciones adicionales para controlar el comportamiento de MPI. Consulta la documentación de Rosetta en <https://www.rosettacommons.org/docs/latest/> para más detalles sobre MPI, incluidos qué protocolos admiten MPI y cómo preparar el archivo de opciones para ello.

### Paralelización trivial

*Nota: a enero de 2015, la instalación actual de Rosetta en TACC debe ejecutarse mediante MPI y no se puede ejecutar en modo "trivialmente paralelo" a través del launcher.*

Las ejecuciones normales de Rosetta suelen implicar la creación de un gran número (a menudo cientos o miles) de estructuras de salida, cada una procedente de una trayectoria independiente. Como cada trayectoria es independiente, la salida de estas múltiples trayectorias se puede repartir manualmente entre varios procesadores. Cómo hacerlo exactamente depende en cierta medida del protocolo, pero casi siempre se puede lograr dividiendo los archivos de entrada en ejecuciones separadas y/o haciendo varias ejecuciones, cada una con un número menor de estructuras de salida (p. ej., hacer diez ejecuciones con -nstruct 100 en lugar de una ejecución con -nstruct 1000). Las múltiples estructuras de salida se pueden combinar después con un comando de posprocesamiento.

Ten en cuenta que TACC descuenta horas de CPU por el uso de un nodo completo de 16 núcleos, incluso si solo se ejecuta un proceso en él. Por eso conviene ejecutar múltiplos de 16 procesos a la vez. Para ayudar a gestionar varias ejecuciones, TACC ofrece un launcher paramétrico de trabajos. Este recibe un archivo de parámetros con una línea por cada comando que se va a ejecutar. Consulta ```module help launcher``` y ```module load launcher; less $TACC_LAUNCHER_DIR/README.launcher```, así como la ejecución de ejemplo en `$TACC_LAUNCHER_DIR/launcher.slurm` y `$TACC_LAUNCHER_DIR/paramlist` para más detalles.

Ten en cuenta que puede haber problemas de rendimiento si varios procesos intentan escribir a la vez en los mismos archivos y directorios. Por eso, cuando se usa la paralelización trivial, se recomienda crear un directorio de trabajo distinto para cada comando que incluyas en la cola de ejecución. 

### Intel Xenon Phi

Se está trabajando para ofrecer mejor compatibilidad con el coprocesador Phi, pero Rosetta no está configurado actualmente para aprovechar plenamente el coprocesador Phi. 

### GPU 

Hay un número limitado de protocolos accesorios que pueden usar GPU, pero en su mayor parte Rosetta no está configurado para aprovechar las capacidades de las GPU. 

### Memoria compartida (hilos)

Aunque algunos protocolos limitados tienen compatibilidad con múltiples hilos, Rosetta no está preparado actualmente para el paralelismo general de memoria compartida (multihilo). Usa en su lugar el paralelismo de memoria distribuida de MPI.

Ejecutar PyRosetta
=================

PyRosetta se puede preparar para ejecuciones en Stampede con
 
    module load pyrosetta

Esto configurará tu entorno de Python de modo que PyRosetta se pueda cargar desde el Python predeterminado. Los scripts que usan PyRosetta se pueden ejecutar después desde un archivo por lotes de SLURM con:

    python your_script_name.py [options]

Ten en cuenta que TACC te cobrará un nodo completo (de 16 procesadores), incluso si solo ejecutas un hilo. Por eso conviene ejecutar múltiplos de 16 procesos a la vez. Para ayudar a gestionar varias ejecuciones, TACC ofrece un launcher paramétrico de trabajos. Este recibe un archivo de parámetros con una línea por cada comando que se va a ejecutar. Consulta `module help launcher` y `module load launcher; less $TACC_LAUNCHER_DIR/README.launcher`, así como la ejecución de ejemplo en `$TACC_LAUNCHER_DIR/launcher.slurm` y `$TACC_LAUNCHER_DIR/paramlist` para más detalles. Como alternativa, quizá prefieras usar el distribuidor de trabajos multiprocesador de PyRosetta (ver más abajo).

Las sesiones interactivas con PyRosetta (p. ej., en un nodo asignado con el comando ``idev``) también se pueden usar desde el intérprete de Python.

    idev                   # Request an interactive node
    module load pyrosetta  # Setup PyRosetta on the interactive node
    python                 # Start python on the interactive node

Para más información sobre cómo usar PyRosetta, consulta la documentación principal de PyRosetta en <http://www.pyrosetta.org/>

Ejecuciones multiprocesador con PyRosetta
-----------------------------------

Las bibliotecas subyacentes de Rosetta de PyRosetta no se han compilado con MPI, por lo que no pueden admitir protocolos a nivel de Rosetta que requieran compatibilidad con MPI.

Sin embargo, la capa de Python de PyRosetta sí tiene compatibilidad con MPI. Para habilitar MPI en python, primero hay que hacer `module load python` y `module load mpi4py`, además de `module load pyrosetta`. Además, usa la función `rosetta.mpi_init()` en lugar de `rosetta.init()` para inicializar Rosetta. Después usarías `ibrun python myscript.py` para lanzar la ejecución (de nuevo, en un script de SLURM).

```
#!/bin/bash
#SBATCH -J RosettaRun_%j   # job name
#SBATCH -o myMPI.o%j       # output and error file name (%j expands to jobID)
#SBATCH -n 32              # total number of mpi tasks requested
#SBATCH -p normal          # queue (partition) -- normal, development, etc. 
#SBATCH -t 01:30:00        # run time (hh:mm:ss) - 1.5 hours
#SBATCH --mail-user=username@example.com
#SBATCH --mail-type=fail   # email me if the job fails
#SBATCH -A A-yourproject   # Allocation to charge time against.

module load python
module load mpi4py
module load pyrosetta

#Alter the job control above as desired and then use "ibrun" to launch your jobs

ibrun python myPyRosettaScript.py
```

En el espacio de nombres principal de rosetta hay una función `MPIJobDistributor` que puede facilitar la preparación de ejecuciones MPI. Para usarla, llama a `MPIJobDistributor(nstruct, fun)`, donde `nstruct` es el número total de trabajos que se ejecutarán y `fun` es un objeto función que recibe un único entero en el rango de 0 a (nstruct-1) que identifica qué trabajo ejecutar. Cómo se traduce ese entero en un trabajo depende por completo de la función definida por el usuario.

*Nota: a enero de 2015, hay un error en la versión actual de PyRosetta instalada en TACC/Stampede que provoca un error al ejecutar el MPIJobDistributor predeterminado.*
*Hasta que se corrija, quienes estén interesados pueden reimplementar la función de la sección de solución de problemas que sigue.*

Solución de problemas de Rosetta y PyRosetta en TACC/Stampede
------------------------------------------------------------------

Rosetta y PyRosetta suelen imprimir mensajes de error de diagnóstico en la salida estándar y en el error estándar. Si tienes dificultades con tus ejecuciones de Rosetta y PyRosetta, asegúrate de no haber silenciado ninguno de los canales de salida y examina la salida en busca de mensajes de Warning o Error. Lo más habitual es que la presencia de estos mensajes indique un problema con el formato de un archivo de entrada.

Si ejecutas Rosetta con MPI, añadir la opción "-mpi_tracer_to_file <prefix>" a la línea de comandos puede mejorar la legibilidad, ya que guardará la salida de los tracers en archivos separados en el directorio actual, en lugar de intercalarlas en la salida estándar.

Hay más ayuda para depurar mensajes de error de Rosetta y PyRosetta en los foros de Rosetta y PyRosetta: <https://www.rosettacommons.org/forum>

### Problemas conocidos

* Si obtienes un error relacionado con "mkstemp", añade la opción `-dont_rewrite_dunbrack_database` a la línea de comandos, o haz una copia personal de la base de datos de Rosetta (en un directorio en el que puedas escribir) y proporciónala con la opción de línea de comandos `-database` en lugar del directorio `${TACC_ROSETTA_DATABASE}`.

* Si obtienes mensajes de error indicando que no se encuentra el ejecutable de Rosetta, comprueba las extensiones que estás usando. Por ejemplo, si intentas usar el ejecutable relax, ejecuta `ls ${TACC_ROSETTA_BIN}/relax.*` para examinar las convenciones de nombres actuales. Puede que tengas que ajustar las extensiones.

* Si obtienes mensajes de error sobre "TR" al intentar usar el MPIJobDistributor de PyRosetta, estás usando una versión con un error conocido. Añade la siguiente redefinición de función a tu archivo de script después de cualquier sentencia `from rosetta import *`.

```python
def MPIJobDistributor(njobs, fun):
    from rosetta import logger
    from mpi4py import MPI

    comm = MPI.COMM_WORLD

    rank = comm.Get_rank()
    size = comm.Get_size()

    myjobs = []

    if rank == 0:
        jobs = range(njobs)
        jobs.extend( [None]*(size - njobs % size) )
        n = len(jobs)/size
        for i in range(size):
            queue = []  # list of jobs for individual cpu
            for j in range(n):
                queue.append(jobs[j*size+i])

            if( i == 0 ):
                myjobs = queue
            else:
                # now sending the queue to the process
                logger.info('Sending %s to node %s' % (queue, i) )
                comm.send(queue, dest=i)
    else:
        # getting decoy lists
        myjobs = comm.recv(source=0)

    logger.info('Node %s, got queue:%s' % (rank, myjobs) )

    for j in myjobs:
        if j is not None: fun(j)
```

##Véase también

* [[Running Rosetta with options]]: instrucciones generales para ejecutar líneas de comandos de Rosetta
* [[Platforms]]: plataformas compatibles con Rosetta

* [[Commands collection]]: líneas de comandos de ejemplo para aplicaciones de Rosetta
* [[Application documentation]]: descripciones de las aplicaciones de Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta

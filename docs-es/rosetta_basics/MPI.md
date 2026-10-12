# MPI
## Uso de Rosetta con MPI

MPI ([Message Passing Interface](https://en.wikipedia.org/wiki/Message_Passing_Interface)) es un método para coordinar ejecuciones en varios procesadores y varias máquinas. Muchos de los grandes clústeres de cómputo usan MPI para gestionar la ejecución de trabajos.

MPI está pensado para programas que requieren una coordinación frecuente entre procesadores durante la ejecución. La mayoría de los protocolos de Rosetta se consideran «trivialmente paralelizables»: cada estructura de salida se genera de forma aislada de las demás. Por eso, hay poca diferencia entre una ejecución multiprocesador con MPI y varias ejecuciones monoprocesador. En estos protocolos, MPI se usa solo para coordinar la escritura de las estructuras de salida entre los procesadores. Las dos ventajas de una ejecución con MPI son un manejo algo mejor de la salida (varias ejecuciones monoprocesador requieren posprocesamiento para combinar las salidas) y la posibilidad de ejecutar en clústeres que exigen ejecutar con MPI.

Ciertos protocolos (enumerados más abajo) usan MPI de forma no trivial. Estos protocolos sí usan una comunicación (semi)frecuente entre los procesadores para coordinar el procesamiento. Necesitan ejecutarse en un contexto MPI.

## Compilar Rosetta con MPI

* Véase también la [[Build Documentation]]

Para poder hacer ejecuciones con MPI, necesitas tener Rosetta compilado con soporte para MPI.

Para ello, compila con la opción "extras=mpi":

    ./scons.py bin mode=release extras=mpi

Esto creará nuevas versiones de la aplicación en el directorio bin, con nombres como `minirosetta.mpi.linuxgccrelease`. El «mpi» central (en lugar de «default») en el nombre de la aplicación indica que la aplicación se compiló con "extras=mpi" y tiene soporte para MPI.

La compilación de Rosetta en modo MPI requiere acceso a las bibliotecas y cabeceras de MPI. Estas bibliotecas dependen mucho del sistema: el tipo y la ubicación de estos archivos varían según el sistema y el clúster para el que compilas. Pregunta a la persona administradora de tu clúster qué ajustes necesitas.

La ubicación de las bibliotecas y cabeceras de MPI debe especificarse en el archivo `main/source/tools/build/site.settings`. En ese directorio hay varios ejemplos para distintos clústeres en los archivos `main/source/tools/build/site.settings.*`. `main/source/tools/build/site.settings.topsail` es un buen punto de partida. Simplemente cópialo a `main/source/tools/build/site.settings`. Puede que haga falta algún ajuste adicional.

### Instalar MPI
No podemos dar soporte para instalar MPI en todos los sistemas posibles, pero en sistemas Linux el paquete `openmpi-bin` suele ser el lugar adecuado por donde empezar.

## Ejecutar Rosetta con MPI

### Lanzar trabajos con MPI

La forma de lanzar ejecuciones de Rosetta con MPI depende del clúster. Habla con la persona administradora de tu clúster sobre la forma preferida de lanzar trabajos MPI en él.

En general, hay un script lanzador de MPI (que normalmente se llama algo como «mpirun» o «mpiexec») que se usa para inicializar el programa MPI de Rosetta en los múltiples procesadores del clúster.

    mpirun minirosetta.mpi.linuxiccrelease ...

La forma de especificar cuántos procesadores usar y en qué máquinas depende del clúster. De nuevo, habla con la persona administradora de tu clúster para conocer los detalles de tu clúster concreto.

### Ejecutar trabajos en serie con MPI

* Véase también: [[Ejecutar Rosetta mediante MPI|running-rosetta-with-options#running-rosetta-via-mpi]], [[Distribuidores de trabajos MPI|jd2#mpi-job-distributors]]

TODO

### Ejecutar con MPI protocolos intrínsecamente paralelos

TODO

## Protocolos que usan MPI de forma no trivial.

* [[MPI MSD]] - Diseño multiestado. MPI se usa para coordinar las múltiples generaciones de la secuencia en el algoritmo genético empleado.
* [[pmut scan parallel]] - Barrido de mutaciones en paralelo.
* [[optE_parallel|opt-e-parallel-doc]] - Optimiza funciones de energía, en particular las energías de referencia.
* [[Loopmodel MPI|loopmodel#loopmodel-mpi]] - Paraleliza el modelado de loops.
* [[ParallelTempering|Tempering-MetropolisHastings]] - 

##Véase también

* [[JD2]]: El distribuidor de trabajos, de uso común al ejecutar protocolos MPI
* [[Running Rosetta with options]]
* [[Build Documentation]]: Información sobre la compilación de Rosetta
* [[Rosetta Basics]]

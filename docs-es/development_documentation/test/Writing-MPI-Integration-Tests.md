Existen [[pruebas de integración|integration tests]] especiales para probar el funcionamiento de los componentes paralelizados de Rosetta con los JobDistributors de MPI. 
Se pueden ejecutar pasando la opción `--mpi-tests` a integration.py. 
Estas pruebas requieren que Rosetta se haya compilado antes pasando la opción `-extras=mpi` a scons.  

Mientras que las pruebas de integración estándar se configuran a partir de los archivos `command` de los directorios `tests/integration/tests/<testname>/`, las pruebas de integración MPI se definen en archivos `command.mpi`.
Mientras que un archivo `command` típico ejecuta directamente el ejecutable de Rosetta, los archivos `command.mpi` llaman a `mpirun`, especifican el número de procesos que se lanzan y pasan el ejecutable de Rosetta a `mpirun`.
Ten en cuenta que el paralelismo a nivel de MPI es inherentemente estocástico: cualquier proceso esclavo puede terminar su trabajo antes que cualquier otro, de modo que hay que configurar con cuidado las pruebas de integración para comprobar únicamente la variación inesperada y no esta variación normal.

Algunas cosas pueden ayudarte a lograrlo:

1.  La opción -jd2:sequential_mpi_job_distribution indica a los JobDistributors de MPI que los procesos esclavos deben pedir trabajos en orden secuencial (es decir, primero el esclavo 1, luego el esclavo 2, luego el esclavo 3).
Esto asegura que el mismo trabajo se asigne siempre al mismo esclavo, lo que da trayectorias coherentes.
*Ten en cuenta que esto **NO** debe usarse en ejecuciones de producción, ya que puede dejar procesos inactivos, sobre todo en sistemas masivamente paralelos.*

2.  El registro de salida se puede dividir buscando con grep '(0)', '(1)', '(2)', etc. 
Mientras que se espera que el proceso maestro (proceso 0) produzca un registro con cierta variabilidad en su salida, los procesos esclavos (procesos 1, 2, 3, etc.) deben tener una salida coherente.

3.  Quizá haya que reordenar los scorefiles, ya que se escriben en el orden en que terminan los trabajos, que puede variar de una ejecución a otra.

Para ver ejemplos de cómo configurar pruebas de integración MPI, consulta tests/integration/tests/bundlegridsampler_design_nstruct_mode/.

Como nota final, la mayoría de las pruebas de integración no se ejecutan cuando se pasa la opción `--mpi-tests` a integration.py. 
Solo se ejecutarán en este modo las pruebas que tengan un archivo `command.mpi`.

##Véase también

* [[Integration tests]]: Información general sobre las pruebas de integración de Rosetta
* [[Ejecutar Rosetta en modo MPI|running-rosetta-with-options#mpi]]
* [[Build Documentation]]: Aquí encontrarás instrucciones para compilar ejecutables mpi de Rosetta
* [[Testing server]]: Servidor que se puede usar para ejecutar automáticamente las pruebas de integración de Rosetta
  * [[Running Tests on the Test Server]]: Instrucciones para usar el servidor de pruebas
* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]
* [[RosettaEncyclopedia]]
* [[Glossary]]

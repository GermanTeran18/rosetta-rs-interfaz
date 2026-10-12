#Ejecutar pruebas unitarias

Las pruebas unitarias son código C++ y [deben compilarse antes de ejecutarse](#compiling-unit-tests). 
Hay tres maneras de ejecutar pruebas unitarias:

-   [Ejecutar todos los conjuntos de pruebas unitarias a la vez.](#run-all-unit-test-suites-at-once)
-   [Ejecutar un conjunto de pruebas individual](#run-a-single-unit-test-or-test-suite) (un conjunto de pruebas de una clase, normalmente)
-   [Ejecutar una prueba unitaria individual.](#run-a-single-unit-test-or-test-suite)

Organización del código de las pruebas unitarias
================================================
A diferencia de otras pruebas de Rosetta, las pruebas unitarias se **compilan**: es código adicional integrado directamente en la base de código, en `Rosetta/main/source/test`. 
El interior de este directorio test refleja el directorio `src`, de modo que el código de clases concretas vive en un lugar similar. 
`test/run.py` es el script maestro que EJECUTA las pruebas unitarias.

Compilar las pruebas unitarias
==============================
Para compilar las pruebas unitarias, ejecuta `scons` con `cat=test`. No debes especificar objetivos (p. ej. `bin`) al hacerlo. Las pruebas están pensadas para compilarse y ejecutarse en modo `debug`, porque así se detectan más errores. Para que la compilación tenga éxito, las bibliotecas subyacentes de Rosetta *deben existir* (primero debes haber compilado *sin* `cat=test`). Sin embargo, no importa que existan los binarios.

A grandes rasgos, la compilación debería verse así:

```
cd Rosetta/main/source
scons.py -j #numproc mode=debug
scons.py -j #numproc mode=debug cat=test
```

Compilar las pruebas es al menos un orden de magnitud más rápido que compilar la base de código principal (esto en realidad es mala señal, porque significa que no tenemos una buena cobertura de pruebas unitarias).


Ejecutar todos los conjuntos de pruebas unitarias a la vez.
===========================================================

Este es el método preferido para ejecutar las pruebas unitarias antes de confirmar cambios en Rosetta, o para verificar que Rosetta se ha instalado correctamente. Para hacerlo, usa el siguiente comando:

```
cd Rosetta/main/source
python test/run.py <optional command line args>
```

Entre las opciones de línea de comandos opcionales importantes están:

|  Opción                 |  Descripción                                                        |
|:------------------------|:--------------------------------------------------------------------|
| `-d`, `--database=PATH` | ruta a la base de datos de Rosetta.                         |
| `-j`, `--jobs=N`        | número de trabajos (pruebas unitarias) que se ejecutan simultáneamente. Por ejemplo, si la máquina tiene 8 núcleos, usa -j 8 para obtener el máximo rendimiento. |
| `--mode=MODE`         | 'mode' (p. ej. debug, release) que se pasa a scons para identificar la ruta de la plataforma. |
| `--extras=EXTRAS`     | valores de 'extras' (p. ej. mpi) que se pasan a scons para identificar la ruta de la plataforma. |
| `-c`, `--compiler=EXEC` | Especifica qué valor de 'compiler' se pasa a scons para identificar la ruta de la plataforma. |
| `--mute=CHANNELS`     | canales de tracer que se silencian. |
| `--unmute=CHANNELS`   | canales de tracer que se activan.
| `-1`, `--one=TEST`      | ejecuta solo la prueba unitaria o el conjunto de pruebas indicado. |

Actualmente, el script `run.py` ejecuta las siguientes pruebas: `apps`, `core`, `demo`, `devel`, `numeric`, `ObjexxFCL`, `protocols` y `utility`.

###Salida correcta
Un conjunto de pruebas correcto termina con algo como esto:

```
-------- Unit test summary --------
Total number of tests: 1749
  number tests passed: 1749
  number tests failed: 0
Success rate: 100%
---------- End of Unit test summary
Done!
```

###Salida con fallos

```
-------- Unit test summary --------
Total number of tests: 1692
  number tests passed: 1688
  number tests failed: 4
  failed tests:
    core.test: CartesianBondedEnergyBBDepTests:test_eval_energy
    core.test: CartesianBondedEnergyTests:test_eval_energy
    core.test: CartesianBondedEnergyTests:test_cartbonded_start_score_start_func_match_w_total_flexibility
    core.test: CartesianBondedEnergyBBDepTests:test_cartbonded_start_score_start_func_match_w_total_flexibility
Success rate: 99%
---------- End of Unit test summary
Done!
```

En esta ejecución, el usuario tendría que determinar qué rompió en el código de CartesianBondedEnergy.
Esto se puede hacer comparando los resultados producidos con los esperados. 
Los resultados se escriben en source/build/test/debug/(ruta relacionada con el sistema)/(ruta relacionada con el protocolo). 
Allí se generan archivos de salida y archivos output._tmp_ que se pueden comparar.

###Pruebas rotas globalmente
Si no se ejecuta ninguna prueba, o todas fallan, probablemente haya un problema de configuración.
Normalmente compilaste en modo release en lugar de debug y olvidaste informar de ello a `test/run.py`, o algo parecido.

Ejecutar una única prueba unitaria o conjunto de pruebas
========================================================

Este método es útil si estás depurando pruebas unitarias y quieres ahorrar tiempo omitiendo algunas pruebas. Para ejecutar todas las pruebas de un solo conjunto de pruebas, usa la opción `  --one  ` de `  test/run.py  ` .

A veces es necesario ejecutar una prueba a mano. Para ello, primero necesitas localizar su ejecutable. Actualmente todos los ejecutables de las pruebas unitarias están en el directorio `build/test/...`; los archivos ejecutables se nombran añadiendo .test al nombre del conjunto de pruebas unitarias. Nota: la ruta puede variar según la plataforma en la que trabajes: por ejemplo, para Linux de 32 bits compilado con gcc será: 'build/test/debug/linux/2.6/32/x86/gcc'.

**El ejecutable de la prueba debe ejecutarse desde el directorio de compilación.** Esto es importante porque algunas pruebas unitarias intentarán localizar archivos adicionales necesarios usando rutas relativas. Por ejemplo, este es un comando para ejecutar solo el ejecutable de pruebas de core:

`       cd build/test/debug/linux/2.6/32/x86/gcc      `

`       ./core.test –database /path/to/rosetta/main/database --mute core      `

Si quieres ejecutar solo una prueba o solo un conjunto, tendrás que proporcionar el nombre de la función de prueba o el nombre del conjunto como **primer** argumento del ejecutable de pruebas. Aquí hay ejemplos de cómo ejecutar solo test\_simple\_min y el conjunto MyTestSuite de las pruebas de core:

`       cd build/test/debug/linux/2.6/32/x86/gcc      `

`       ./core.test test_simple_min --database /path/to/rosetta/main/database --mute core      `

`       cd build/test/debug/linux/2.6/32/x86/gcc      `

`       ./core.test MyTestSuite –database /path/to/rosetta/main/database --mute core      `

##Véase también

* Resumen y filosofía de las [[pruebas unitarias|unit tests]]
* [[Escribir pruebas unitarias|writing-unit-tests]]
* [[UMoverTest|mover-test]], una herramienta para probar con pruebas unitarias las clases Mover
* [[UTracer]], una herramienta para simplificar la escritura de pruebas unitarias comparando texto _en masse_

* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]

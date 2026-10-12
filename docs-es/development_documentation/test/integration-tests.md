#Pruebas de integración

Las *pruebas de integración* de Rosetta son un conjunto de herramientas de prueba que ejecutan cortas ejecuciones de protocolos antes y después de los cambios en el código, y comparan la salida de los protocolos para detectar cambios inesperados. 
Sirven para determinar si el comportamiento del código **cambia**, pero no si es **correcto**. 
Las pruebas viven en `{Rosetta}/main/tests/integration`: el repositorio principal, pero no directamente junto con el código.
**Se espera que los desarrolladores ejecuten estas pruebas antes de fusionar código a `master`.**
Quienes no son desarrolladores no deberían tener interés en las pruebas de integración, salvo que quieran examinarlas como demos breves.

[[_TOC_]]

Qué hacen y qué no hacen las pruebas de integración
===================================================

Las pruebas de integración son "pruebas de caja negra" que examinan los resultados de grandes porciones de código.

En general, una prueba de integración:
* ejecuta un ejecutable con un conjunto razonable de entradas y opciones
* termina en 30 segundos
* se ejecuta hasta el final sin mensajes de error 
* asegura que el código no ha cambiado accidentalmente de una revisión a la siguiente
* compara, [[byte a byte|https://en.wikipedia.org/wiki/Diff_utility]], los resultados de un comando DESPUÉS de tus cambios y ANTES de tus cambios

No hacen lo siguiente:
* Ejecutarse igual en todas las máquinas
 * Son lo bastante largas como para tener ruido numérico y efectos de diferencias de procesador (que el Monte Carlo capta y magnifica hasta convertirlos en diferencias de trayectoria completas).  Es una debilidad conocida y así son las cosas.
* Producir resultados científicamente útiles
 * El tiempo de ejecución corto es más importante que la validez de los resultados
 * Este es el objetivo de las [[pruebas científicas|Scientific-Benchmarks]]
 * El tiempo de ejecución en sentido absoluto lo comprueban las [[pruebas de rendimiento|Performance-Benchmarks]]
* Comprobar que el código funciona bien
 * Las pruebas de integración solo comprueban que se ejecuta igual que antes, no que sea correcto
 * Este es el objetivo de las [[pruebas unitarias|unit tests]]

Cuándo ejecutar las pruebas de integración
==========================================
**Se espera que los desarrolladores ejecuten las pruebas de integración antes de fusionar a `master`.**
Basta con ejecutar todo el conjunto de pruebas antes de fusionar, como parte del protocolo [[antes de fusionar|before-commit-check]].
Recuerda que no pasa nada si hay cambios esperados en las pruebas de integración debido al código que cambiaste: si has reescrito tu protocolo, por supuesto que sus pruebas cambiarán.
El propósito de las pruebas, en este sentido, es asegurar que no haya cambios *inesperados* y que los cambios esperados sean *explicables* a partir del código que cambió.

Ejecutar las pruebas en el servidor
===================================
¡El [[servidor de pruebas|testing server]] puede ejecutar las pruebas de integración por ti! Esto es fantástico si desarrollas en un ordenador con recursos limitados, o si no tienes tiempo y quieres que un ordenador haga las cosas por ti. Consulta [[esta página|Running-Tests-on-the-Test-Server]] para más detalles.

Ejecutar las pruebas de integración
===================================
Lamentablemente, las pruebas de integración exigen de manera singular que las ejecutes sobre código **sin** los cambios que quieres verificar.
Las pruebas de integración funcionan comparando literalmente la salida de Rosetta de dos ejecuciones de Rosetta: una compilada con tus cambios y otra compilada sin tus cambios.
Los lectores astutos habrán entendido que esto significa que necesitas dos copias compiladas de Rosetta en paralelo, o que necesitas compilar dos veces para hacer las pruebas.
Los resultados de las ejecuciones de Rosetta "sin modificar" se llaman los datos `ref`.
Los resultados de las ejecuciones de Rosetta con tus cambios se llaman los datos `new`.

`ref` y `new` se llaman así porque son los nombres de los subdirectorios creados dentro de `{Rosetta}/main/tests/integration` que contienen los dos conjuntos de datos.  Las instrucciones de las propias ejecuciones están en el subdirectorio `tests` (de integration, es decir, `tests/integration/tests`).

Generar `ref` a partir de una copia separada de Rosetta
-------------------------------------------------------
Si tienes dos copias de Rosetta en tu disco duro, puedes generar `ref` en la que esté en `master`.

1. Asegúrate de que `master` esté actualizada. Podrías elegir comparar con cualquier revisión, sobre todo para rastrear errores, pero para la mayoría de los propósitos lo correcto es comparar con el master más reciente.
    `cd /path/to/Rosetta/main/source && git checkout master && git pull  `
2. Compila en modo **release de todas las aplicaciones**; obviamente esto borra cualquier compilación anterior
    `  ./scons.py -j<number_of_processors_to_use> mode=release bin  `
3. Cambia al directorio de pruebas.
    `  cd ../tests/integration  `
4. Asegúrate de que no haya ya resultados de pruebas de integración (borra `new` y `ref` de cualquier ejecución anterior).
    `  rm -r new/ ref/  `
5. Ejecuta la prueba.
    `  ./integration.py -j<number_of_processors_to_use>  `
6. Deberías ver esto en una ejecución correcta:
```
Just generated 'ref' results [renamed 'new' to 'ref'];  run again after making changes.
```

###Si `integration.py` no logró ejecutar las pruebas
Si la mayoría o todas las pruebas fallaron, puede que tengas algo mal configurado.
Lo más probable es que tu compilación fallara en el paso 2 anterior.
Si compilaste con clang, pasa `-c clang` para indicar a `integration.py` que busque tus ejecutables de clang. 
`integration.py` también acepta las opciones --mode y --extras análogas a las de [[scons|Scons-Overview-and-Specifics]] al compilar, para ayudarle a buscar los ejecutables correctos.
`integration.py --help` imprime una lista de ayuda útil, y en su directorio hay un `README` que también puede ayudar.
Si todo lo demás falla, pregunta en la lista de correo.

Generar `ref` a partir de la misma copia de Rosetta
---------------------------------------------------
Si solo tienes instalada una copia de Rosetta, estás en la desafortunada posición de necesitar dos conjuntos de binarios a partir de una copia del código.
No te queda más remedio que recompilar entre la generación de `ref` y la de `new`.
Sigue las mismas instrucciones de arriba; solo ten cuidado de no tener cambios locales sin confirmar antes de cambiar a `master`.

Generar `new` y obtener los resultados de las pruebas
-----------------------------------------------------
Hasta ahora has "ejecutado las pruebas de integración" pero no has probado nada: solo hiciste `ref`.
Generar `new` para compararlo es simultáneo a comprobar las diferencias.
Debes generar los resultados `new` a partir de una copia de Rosetta con los cambios que necesitas probar.

Si generaste tu `ref` a partir de una copia _distinta_ de Rosetta, tienes que copiar el directorio ref de esa ubicación a tu copia de Rosetta con los cambios: 
```
cp -a /path/to/vanilla_Rosetta/main/tests/integration/tests/ref /path/to/development_Rosetta/main/tests/integration
```

(Quizá prefieras usar `mv` en lugar de `cp` por velocidad, con la salvedad obvia de que ya no estará en la ubicación antigua).

Si generaste tu `ref` en una copia del código, tu `ref` ya está en su sitio.

Para ejecutar realmente las pruebas:

1. Asegúrate de que tu rama esté actualizada. En general conviene fusionar desde `master` inmediatamente antes de probar (probablemente hiciste pull de `master` antes de generar `ref`). Esto asegura que pruebas solo las diferencias introducidas por **tus** cambios. ¡Quizá este paso de fusión no sea trivial!
    `cd /path/to/Rosetta/main/source && git checkout {MYBRANCH} && git merge master `
2. Compila en modo **release de todas las aplicaciones**; obviamente esto borra cualquier compilación anterior
    `  ./scons.py -j<number_of_processors_to_use> mode=release bin  `
3. Cambia al directorio de pruebas.
    `  cd ../tests/integration  `
4. Comprueba que tienes los datos `ref` que generaste recientemente.
5. Ejecuta la prueba. Fíjate en que es exactamente el mismo comando que antes: integration.py hace el mismo trabajo y simplemente coloca los resultados en `new` si `ref` ya existe.
    `  ./integration.py -j<number_of_processors_to_use>  `
6. En una ejecución correcta verás: :
```
Running Test HOW_TO_MAKE_TESTS
bash /home/smlewis/Rosetta/main/tests/integration/new/HOW_TO_MAKE_TESTS/command.sh
Finished HOW_TO_MAKE_TESTS                        in   0 seconds	 [~   1 test (100%) started,    0 in queue,    0 running]

ok   HOW_TO_MAKE_TESTS
All tests passed.
```

Las líneas sobre HOW_TO_MAKE_TESTS se repetirán para cada prueba (todas, que son varios cientos).  All tests passed aparecerá una sola vez al final.

Si las pruebas fallan, obtendrás 
```
FAIL AnchoredDesign
    nonempty diff ref/AnchoredDesign/SOMEFILENAME new/AnchoredDesign/SOMEFILENAME

345 test(s) failed.  Use 'diff' to compare results.
```

Qué hacer cuando se rompe una prueba de integración
===================================================

Puedes comprobar los cambios con `diff`: ejecuta `diff` manualmente, o `integration.py --compareonly --fulldiff` para hacer automáticamente un diff de todos los resultados de las pruebas de integración.

Si necesitas volver a ejecutar las pruebas repetidamente, `integration.py` acepta como argumentos los nombres de directorios de pruebas individuales, de modo que no tienes que ejecutar los varios cientos cada vez: `integration.py test1 test2 test3...`

Roturas esperadas
-----------------
Si los únicos cambios en los resultados de las pruebas son los que esperas por tus cambios de código, ¡estás en muy buena forma!
Puedes fusionar tu código a `master`, o tener la seguridad de que entiendes que tu código funciona, etc.
Asegúrate de marcar los cambios esperados en las pruebas de integración en el [[mensaje de commit|before-commit-check]] cuando fusiones a `master`.

Cambios inesperados
-------------------
Si hay cambios inesperados, tendrás que examinar los diffs de las pruebas para determinar cuáles son y averiguar de dónde vienen.
Se supone que entiendes tu propio código lo bastante bien como para determinar su origen.
Es común que los cambios inesperados resulten de diferencias accidentales entre las ejecuciones `new` y `ref`, por ejemplo que las dos ramas probadas partan de versiones distintas de `master`.

Un caso de cambio desafortunadamente común son los "cambios de trayectoria" dispersos, en los que pequeños cambios numéricos tempranos llevaron a diferencias de trayectoria que finalmente produjeron archivos de registro de salida enormemente cambiados.
Normalmente se deben a un inlining distinto, a variables inicializadas de forma distinta o a algo más sutil.
En ocasiones muy raras es "cosa del compilador" y no es culpa del desarrollador.
La comunidad ha luchado enormemente a lo largo de los años con pruebas de integración inestables que muestran cambios ocasionales perniciosos.
Si tienes dudas, ¡no fusiones!
Simplemente haz un [[pull request]] y pide ayuda a los expertos.

Cambios triviales
-----------------
Algunos cambios son triviales, como cuando recibes informes de rutas de archivo distintas que se deben obviamente a que generaste `ref` en una copia separada de Rosetta.
Ignóralos.
Otro conjunto de cambios sin importancia son los mensajes sobre la escritura de binarios de la base de datos.
Ocurren la primera vez que se ejecuta Rosetta (por ejemplo, si obtuviste una copia nueva para generar `ref` por separado).

Cambios cosméticos frente a cambios de trayectoria
--------------------------------------------------
"Cambios cosméticos" suele significar que la salida es distinta en la forma pero no en el contenido.
Por ejemplo, quizá cambiaste el nombre de un Tracer: muchas líneas diferirán por la etiqueta del Tracer pero no en su contenido de información; esto es "cosmético". 
Estos nunca son preocupantes.

"Cambios de trayectoria" es cuando el resultado es distinto; por ejemplo, las coordenadas del PDB resultante se alteran y las puntuaciones informadas son diferentes.
Estos hay que entenderlos.

.test_did_not_run.log
---------------------
A veces aparece un archivo `.test_did_not_run.log`. 
El sistema está configurado de modo que, si este archivo existe, la prueba **SIEMPRE** falla.
Significa que la prueba no se ejecutó porque el ejecutable no existía, o se cayó y salió de forma incorrecta. 

Ejecutar pruebas de integración MPI
===================================
Ahora tenemos la capacidad de ejecutar pruebas de integración en [[MPI]], sobre todo para probar la integración de componentes con los [[JobDistributors|jd2]] paralelos.  Las instrucciones para ejecutar las pruebas son las mismas que antes, salvo que necesitas `-extras=mpi` como argumento de `scons` y `-mpi-tests` como argumento de `integration.py`.

1.  Compila en modo *release de todas las aplicaciones* con **-extras=mpi**.
    `./scons.py -j<number_of_processors_to_use> mode=release bin -extras=mpi`
2.  Cambia de directorio. `cd ../tests/integration`
3.  Ejecuta la prueba con la opción **--mpi-tests**.
    `./integration.py -j<num_procs> -c <compiler> --mpi-tests`

Cómo escribir pruebas MPI se explica [[en otro lugar|Writing-MPI-Integration-Tests]].

Escribir pruebas de integración
===============================
Una prueba de integración es simplemente un script de shell con una línea de comandos de Rosetta con las opciones adecuadas guardadas en un archivo de opciones (flags).
La carpeta `main/tests/integration/tests/HOW_TO_MAKE_TESTS` describe cómo hacerlo.
* Crea una nueva carpeta o subdirectorio para tu prueba.
* Crea en ese directorio un archivo llamado command a partir de la plantilla `HOW_TO_MAKE_TESTS`.  Comprobará que existe el ejecutable que necesita, lo ejecutará y depurará la salida (para eliminar varias clases de diferencias irrelevantes habituales, como los informes de tiempos).
* Añade los archivos de entrada y de opciones que necesite tu script.
* No olvides añadir todo a `git`.
* Asegúrate de que tu prueba sea **corta**, de menos de 30 segundos: tenemos varios cientos y no tenemos todo el día.  Muchas pruebas (y por lo tanto ejecutables) respetan para este fin una opción de rosetta `-run:test_cycles`.

Cómo escribir pruebas MPI se explica [[en otro lugar|Writing-MPI-Integration-Tests]].

Una nota sobre el nombre
========================
Son [[pruebas de integración|https://en.wikipedia.org/wiki/Integration_testing]] en el sentido de las pruebas de software en cuanto al espíritu, pero [[pruebas de regresión|https://en.wikipedia.org/wiki/Regression_testing]] en su funcionalidad real.

##Véase también

* [[Writing MPI Integration Tests]]: Cómo escribir pruebas especiales para probar componentes paralelizados de Rosetta
* [[Testing server]]: Servidor que se puede usar para ejecutar automáticamente las pruebas de integración de Rosetta
  * [[Running Tests on the Test Server]]: Instrucciones para usar el servidor de pruebas
* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]
* [[RosettaEncyclopedia]]
* [[Glossary]]

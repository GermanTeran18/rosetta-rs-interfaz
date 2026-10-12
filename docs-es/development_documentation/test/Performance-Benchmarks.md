Benchmarks de rendimiento
=========================

Los benchmarks de rendimiento son pruebas que comparan el tiempo que tarda Rosetta en realizar tareas muy simples que, en general, debería poder hacer con mucha rapidez.
La idea es que hay acciones atómicas que Rosetta debería poder ejecutar muy rápido: por ejemplo, evaluar términos de energía y ejecutar el packer.

Cada benchmark de rendimiento se realiza entre una y varios cientos de miles de veces, para lograr un tiempo de ejecución aproximado que quede entre treinta segundos y cinco minutos.
Se han probado varios métodos para reunir estos datos y formar métricas estables:
-	promediar n pruebas (normalmente n = 3 o 5)
-	tomar la mejor prueba de n (suponiendo que todos los valores atípicos son ralentizaciones)
-	ejecutar los benchmarks hasta observar n pruebas que estén dentro del 5% unas de otras, y registrar entonces el mínimo o el promedio de esas n pruebas

Ninguna de estas métricas ha resultado ser realmente estable, ni siquiera al probar tiempos acumulados promedio de pruebas de varias horas.

En general, mientras esta afirmación siga en la documentación, no entres en pánico si tu código rompe una prueba de rendimiento que parece no tener relación. (Por ejemplo, añades una aplicación piloto y parece que mm_lj_intra_rep tarda más en puntuar.) Eso sí, entra en pánico si esa prueba de rendimiento sigue rota durante varios commits posteriores, o si rompe muchas pruebas de rendimiento.)

Las pruebas en sí se encuentran en apps/benchmark/performance.

Cada benchmark se define en un archivo .bench.hh y luego esta clase central lo ejecuta tantas veces como puede en un período de tiempo fijo (esos son los ciclos del eje x).

##Véase también

* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]
* [[RosettaEncyclopedia]]
* [[Glossary]]

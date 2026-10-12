Benchmark científico de refinamiento local de docking
=====================================================

# **ESTA PÁGINA CONTIENE INFORMACIÓN HEREDADA SOBRE LAS PRUEBAS CIENTÍFICAS ANTERIORES A SU REIMPLEMENTACIÓN EN 2018**

El docking es un enfoque para predecir cómo se unen las moléculas entre sí.
Dadas como entrada las secuencias químicas fijas y las conformaciones iniciales
de cada una de las partes, se muestrean el alineamiento de cuerpo rígido y los grados
de libertad de las cadenas laterales y de la cadena principal para buscar conformaciones
unidas con una energía global favorable.

Como benchmark científico, predecir con precisión interacciones de unión
validadas experimentalmente es una prueba exigente de la función de energía
y del muestreo conformacional. Según el nivel de detalle
de los datos de entrada y cómo se evalúen las predicciones exitosas, el
benchmark científico de docking puede poner el énfasis en la función de energía o en el
muestreo conformacional.

El benchmark científico de **refinamiento local de docking** (docking local refine) pone el énfasis en la evaluación
de la función de energía, al proporcionar como entrada la conformación unida
validada experimentalmente de ambas partes de la interacción y limitar el
muestreo conformacional permitido. Una función de puntuación físicamente realista
debería recuperar la conformación nativa durante una fracción considerable del
tiempo. Como no se necesita muestreo para recuperar la conformación nativa,
cualquier desviación significativa de la conformación nativa indica que
las interacciones moleculares de la configuración en la conformación nativa se
desfavorecen indebidamente en comparación con conformaciones de unión
alternativas.

Para ver documentación sobre cómo ejecutar la aplicación docking\_protocol, consulta [[docking protocol]]

Conjunto de datos
-----------------

El benchmark científico de docking usa el conjunto del [benchmark ZDOCK
v4](http://zlab.umassmed.edu/zdock/benchmark.shtml).

El benchmark de **refinamiento local de docking** parte de las conformaciones nativas unidas
del receptor y del ligando.

Ejecución
---------

1.  Compila Rosetta

             cd mini_base_dir
             ./scons.py bin mode=release -j<num_processors>

2.  Ejecuta la prueba

             cd mini_base_dir/test/scientific
             ./scientific.py docking_local_refine -d mini_database_dir

3.  Investiga los resultados

             cd main/tests/scientific/cluster/docking_local_refine/outputs

##Véase también

* [[Scientific Benchmarks]]: Página principal de las pruebas científicas
    - [[Pruebas científicas de docking|DockingScientificBenchmark]]
* [[Definición de docking|Glossary#docking]]
* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]
* [[RosettaEncyclopedia]]
* [[Glossary]]

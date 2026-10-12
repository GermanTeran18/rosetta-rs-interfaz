#Guía para ejecutar y escribir pruebas de Rosetta

Rosetta tiene 4 conjuntos de pruebas:
* Las __pruebas unitarias__ comprueban funciones concretas de la biblioteca de Rosetta. Son pruebas granulares de la corrección de funciones y clases. A veces se usan para verificar que Rosetta está bien instalado.
* Las __pruebas de integración__ (en realidad, pruebas de regresión) siguen el comportamiento de las aplicaciones a medida que cambia el código, para asegurar que los cambios solo ocurren cuando se esperan, pero no comprueban el comportamiento previsto. A veces se usan como demos.
* Las __pruebas de rendimiento__ y las __pruebas de perfil__ vigilan la velocidad y el uso de memoria de las aplicaciones de Rosetta. 
* Las __pruebas científicas__ vigilan el comportamiento previsto de las aplicaciones de Rosetta con respecto a sus objetivos definidos científicamente. 

La información sobre cómo leer y escribir estas pruebas se encuentra en las páginas enlazadas abajo. Tenemos un excelente
[[servidor de pruebas|Testing server]] que ejecuta todas estas pruebas por nosotros de forma regular.

-   [[Pruebas unitarias|Unit Tests]]
    -   [[Ejecutar pruebas unitarias|run-unit-test]]
    -	[[Escribir pruebas unitarias|writing-unit-tests]]
    	-   [[UMoverTest|mover-test]], una herramienta para probar con pruebas unitarias las clases Mover
    	-   [[UTracer]], una herramienta para simplificar la escritura de pruebas unitarias comparando texto _en masse_

-   [[Pruebas de integración|Integration Tests]]
    - [[Escribir pruebas de integración MPI|Writing MPI Integration Tests]]

-   [[Benchmarks de rendimiento|Performance Benchmarks]]
-   [[Pruebas de perfil|Profile tests]]

-   [[Cómo crear y ejecutar pruebas científicas|Scientific-Benchmarks]]
    - [[Página heredada de las pruebas científicas anteriores a 2018|Legacy-Scientific-Benchmarks]]
        - [[Heredado: pruebas científicas de balance detallado|DetailedBalanceScientificBenchmark]]
        - [[Heredado: pruebas científicas de docking|DockingScientificBenchmark]]

-   [[Servidor de pruebas|Testing server]]
    - [[Ejecutar pruebas en el servidor de pruebas|Running tests on the test server]]

##Véase también

* [[Development Documentation]]: La página principal de la documentación para desarrolladores
* [[Tutoriales de desarrollo|devel-tutorials]]: Tutoriales para desarrolladores

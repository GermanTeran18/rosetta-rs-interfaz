#Pruebas unitarias de movers con UMoverTest

El paquete test::UMoverTest proporciona un sistema para añadir de forma rápida y sencilla nuevas pruebas unitarias para las clases Mover.

El propósito de este documento es ofrecer a los usuarios una guía para crear nuevas pruebas unitarias con este paquete.

##Requisitos

-   La clase que se va a probar hereda de Mover y tiene una función `apply` que modifica el objeto Pose (es decir, no es un mover de herramienta como RepeatMover, etc.). En el resto del documento nos referiremos a la clase que se va a probar como 'NewMover'.
-   NewMover debe implementar la función virtual `void test_move(core::pose::Pose & pose)`.

##Instrucciones
1) *Decide la ubicación de la prueba unitaria.* En la mayoría de los casos, si NewMover no requiere ninguna inicialización especial, una buena ubicación para añadir la prueba unitaria será el archivo existente: source/test/protocols/moves/MoversTest.cxxtest.hh.

2) *Crea la macro de la prueba unitaria*. En la función `test_AllMovers` de MoversTest.cxxtest.hh, añade la siguiente línea: 

```
TEST_MOVER(NewMover, "protocols/moves/test_in.pdb", "protocols/moves/newmover_out.pdb");
```

3) Compila Rosetta y sus pruebas unitarias ejecutando: `scons -j8 && scons -j8 cat=test`. Asegúrate de que ambas compilaciones terminaron sin errores.

4) Ejecuta la prueba unitaria para crear el archivo pdb sobre el que se aplicará NewMover: 

```
python test/run.py -database path/to/rosetta/main/database
```

5) La prueba unitaria de `test_AllMovers` fallará: es lo esperado. El mensaje de fallo será algo como:

```
Test suite: MoversTest (test/protocols/moves/MoversTest.cxxtest.hh) File: ./test/protocols/moves/MoversTest.cxxtest.hh Line:47 MoversTest::NewMoverFiles are not equal! CXXTEST_ERROR: test_AllMovers:NewMover Failed!
In MoversTest::test_AllMovers: ./test/protocols/moves/MoversTest.cxxtest.hh:47: Error: Test failed: test_AllMovers CXXTEST_ERROR: test_AllMovers Failed!
````

6) Comprueba si el archivo PDB resultante es correcto. Encuentra el archivo PDB de salida en la carpeta de compilación de pruebas, dentro de protocols/moves. El nombre del archivo será: 'newmover_out.pdb._tmp_' (Nota: según tu plataforma y compilador, la ruta al PDB puede variar. Por ejemplo, para la compilación con gcc en Linux puede ser: 'build/test/debug/linux/2.6/32/x86/gcc/protocols/moves'.) Carga el PDB de salida en PyMOL o comprueba de otro modo si es correcto.

7) Cambia el nombre del archivo pdb de salida y cópialo a test/protocols/moves/newmover\_out.pdb.

8) Modifica test/protocols.test.settings añadiendo la línea: `moves/newmoves_out.pdb`, al grupo `testinputfiles = [ "moves/test_in.pdb", ].... `.

9) Recompila las pruebas unitarias de Rosetta. Nota: tendrás que modificar el archivo MoversTest.cxxtest.hh para activar el mecanismo de copia de archivos.

10) Ejecuta la prueba unitaria y asegúrate de que termina sin errores.

##Véase también
* Resumen y filosofía de las [[pruebas unitarias|unit tests]]
* [[Ejecutar pruebas unitarias|run-unit-test]]
* [[Escribir pruebas unitarias|writing-unit-tests]]
* [[UTracer]], una herramienta para simplificar la escritura de pruebas unitarias comparando texto _en masse_

* [[Descripción de Mover|Rosetta-overview#mover]]

* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]

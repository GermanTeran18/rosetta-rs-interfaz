#Escribir pruebas unitarias

_Si no eres desarrollador, quizá quisieras aprender [[cómo ejecutar pruebas unitarias|run-unit-test]]._

Antes de escribir pruebas unitarias, asegúrate de entender [[qué son|unit tests]].

TODO: El contenido que debería poblar esta página sigue alojado en su mayor parte en el mediawiki de wiki.rosettacommons.org y se puede trasladar en cuanto sea conveniente.  DEJA los enlaces al mediawiki en su sitio hasta que se traslade el texto.

Las pruebas unitarias de Rosetta usan el marco **CxxTest**.  Si te interesa saber por qué elegimos este marco: https://wiki.rosettacommons.org/index.php/DecidingOnCxxTest.  (TODO: trasladar esto.)

Consejo ultrabreve para escribir pruebas unitarias: busca una relacionada con lo que estás probando y escribe algo similar a lo que ella hace. 
La duplicación de código no preocupa demasiado en las pruebas unitarias (probar el Mover X y el Mover Y puede acabar haciendo muchas de las mismas cosas), aunque obviamente hay que evitarla cuando se pueda.

Se pueden encontrar instrucciones más largas sobre cómo escribir pruebas unitarias en el wiki antiguo: https://wiki.rosettacommons.org/index.php/Tools:Unit_Tests (TODO: trasladar esto.)

Herramientas de pruebas unitarias específicas de Rosetta:
=========================================================

### UTracers para la comparación de salidas capturadas al estilo de las pruebas de integración
Los [[Utracer]]s son un arma de doble filo: facilitan tener una "prueba" del tipo "compara toda esta salida X con esta salida de referencia Y".
Son fáciles de escribir, pero a menudo no prueban unidades.
Si tu "unidad" no es **completamente determinista** en **todas las arquitecturas**, esto se vendrá abajo y deberías haber escrito una [[prueba de integración|integration tests]].

### UMoverTest
El [[UMoverTest|mover-test]] es una herramienta para probar clases [[Mover|Glossary#mover]].
No puede probar su función `apply`, pero si escribes tu Mover con ingenio, aun así hará un buen trabajo.

### TS_ASSERTs para probar comparaciones de archivos

Compara archivos literalmente, línea por línea: `TS_ASSERT_FILE_EQ`. 
Esta aserción pasa si los archivos son iguales y genera un error de prueba unitaria en caso contrario. 
Tiene las mismas salvedades que los UTracers de arriba: es estupenda si solo quieres comparar 20 cosas con poco C++, pero peligrosa si de verdad estás haciendo pruebas de integración de protocolos.

Ejemplo:

```
#include <cxxtest/TestSuite.h>
...
TS_ASSERT_FILE_EQ( "original.pdb" , "new.pdb" ); // will generate error if files are different
```

Compara archivos como una cadena de números double: `TS_ASSERT_FILE_EQ_AS_DOUBLE`. Este comando lee dos archivos de texto, convierte cada uno en un vector de doubles (usando el espacio como separador) y compara los vectores de doubles con la tolerancia absoluta y relativa especificadas. Ejemplo:

```
#include <cxxtest/TestSuite.h>
...
// comparing files "original_score.txt" and "new_score.txt" as vectors of double with abs. tolerance .001 and relative tolerance .1
TS_ASSERT_FILE_EQ_AS_DOUBLE( "original_score.txt" , "new_score.txt" ,
                             .001, // absolute tolerance
                             .1); // relative tolerance
```

Trabajar con el sistema de opciones
===================================

Lamentablemente Rosetta depende bastante de su sistema de opciones de línea de comandos, pero ejecutar pruebas unitarias no ofrece mucha interacción con la línea de comandos.
Desde luego, `test/run.py` no te permitirá ejecutar pruebas distintas en entornos de opciones distintos.
Esta sección explica cómo puedes fijar el entorno de opciones para cada prueba por separado, con esta magia:

`inline void core_init_with_additional_options( std::string const & commandline_in )` 

Reinicializa el sistema de opciones en mitad de la prueba con argumentos adicionales. La línea de comandos real que se usará es igual a la línea de comandos original (la que se proporcionó al ejecutable de la prueba unitaria) más los nuevos argumentos proporcionados a la función.

Ten en cuenta que esta función no elimina ningún singleton que ya estuviera asignado (por ejemplo, ResidueSet). Si necesitas reinicializar esos singletons, elimínalos a mano antes de llamar a esta función.


```
#include <test/core/init_util.hh>
...
// calling core::init with a new command line = old cm.line + "-score_only -out:file:fullatom"
core_init_with_additional_options( "-score_only -out:file:fullatom" );
```

##Véase también

* Resumen y filosofía de las [[pruebas unitarias|unit tests]]
* [[Ejecutar pruebas unitarias|run-unit-test]]
* [[UMoverTest|mover-test]], una herramienta para probar con pruebas unitarias las clases Mover
* [[UTracer]], una herramienta para simplificar la escritura de pruebas unitarias comparando texto _en masse_

* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]

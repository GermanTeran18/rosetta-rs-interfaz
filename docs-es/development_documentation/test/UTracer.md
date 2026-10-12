#UTracer - Una herramienta para simplificar la escritura de pruebas unitarias

UTracer es un objeto similar al Tracer de core::util (consulta la página de documentación de [[Tracer]] para más información). Su propósito principal es capturar la salida del usuario, compararla con una versión guardada anteriormente y guardar la nueva versión en un archivo `._tmp_`. Además, el objeto UTracer se puede usar para capturar la salida de canales especificados dentro de las bibliotecas core o protocols y comparar esa salida con la versión de un archivo.

Crear un objeto UTracer
=======================

Crea un objeto `UTracer` y proporciona el nombre del archivo con el que se comparará la salida. Por ejemplo:

```
UTracer UT("MyDir/MyFile.u");
```

creará un objeto `UTracer` que comparará toda la salida que entre en él con el contenido del archivo "MyDir/MyFile.u". Lo más probable es que convenga tener el archivo del tracer en el mismo directorio que tu conjunto de pruebas, y **por favor** usa para él la extensión `.u`.

Durante la ejecución, la salida más reciente de UTracer se guardará en un archivo en la misma ubicación que especificaste, con el sufijo `._tmp_`, p. ej. `MyDir/MyFile.u._tmp_`.

Ejecutar por primera vez
========================

Lo más probable es que no tengas un archivo `.u` preparado de antemano.

La manera directa de crear uno para futuras pruebas unitarias es:

  1. crear un archivo `MyDir/MyFile.u` vacío en el directorio `test`.
  2. añadir la ubicación del archivo al archivo `<module>.test.settings` correspondiente (también en el directorio `test`), como parte de la lista `testinputfiles` (al final del archivo).
  3. compilar y ejecutar tu prueba unitaria (p. ej. `scons cat=test && test/run.py -d ../database -1 MyTest`)
  4. cuando termine la prueba unitaria (fallará, ya que tu archivo de referencia está vacío), se generará un archivo `build/test/.../MyDir/MyFile.u._tmp_` (`...` depende de tu plataforma y compilador). Cópialo sobre tu `test/MyDir/MyFile.u` vacío.
  5. compilar y ejecutar tu prueba unitaria otra vez y asegurarte de que termina con éxito.

Repite los pasos 4 y 5 cuando necesites actualizar tu archivo UTracer debido a cambios esperados en el código.

Usar el objeto UTracer
======================

Para usar el objeto UTracer, simplemente envíale salida con el operador de C++ '\<\<'. Además de manejar los tipos estándar integrados de C++, es posible serializar los tipos vector, vector1 y map. Por ejemplo:

```
UTracer UT("MyFile.u");
Real a,b,c;
vector<Real> va;
vector1<Real> v1a;
map<String, Real> map_string_real;
...
UT << "Some strings... \n";
UT << "Some numbers:" << a << b << c << "\n";
UT << "Vector type:" << va << "\n";
UT << "Vector1 type:" << v1a << "\n";
UT << "map type:" << map_string_real << "\n";
```

Nota: Como con el objeto Tracer, debe usarse el símbolo `\n` para una nueva línea, en lugar del símbolo de línea `std::endl`.

Control de la precisión de la comparación de UTracer
====================================================

Actualmente solo se pueden comparar números de punto flotante con una precisión especificada. Es posible especificar la precisión de dos maneras: absoluta y relativa.

1. Especificar precisiones absolutas
------------------------------------

Basta con llamar a `UTracer & delta(double absolute_delta)` para fijar el delta aceptable actual para los números de punto flotante. El delta por defecto de un nuevo objeto UTracer es 1e-200. Ejemplo:

```
UTracer UT("MyFile.u");
Real a,b,c;
UT.abs_tolerance(.001) << a; // a will be compared with precisions .001
UT.abs_tolerance(.01) << b; // b will be compared with precisions .01
UT.abs_tolerance(.1) << c; // b will be compared with precisions .1
```

2. Especificar precisiones relativas
------------------------------------

Para especificar precisiones relativas, usa `UTracer & relative(double relative_precision)`. Cuando UTracer compara con precisión relativa, primero la convierte en un valor delta absoluto con esta función: `delta = (original_value + new_value)/2. * relative_precision`. Donde `original_value` y `new_value` son un valor leído del archivo `.u` y el valor serializado a UTracer. Ejemplo:

```
UTracer UT("MyFile.u");
Real a,b,c;
UT.rel_tolerance(.001) << a; // a will be compared with relative precisions .001
UT.rel_tolerance(.01) << b; // b will be compared with relative precisions .01
UT.rel_tolerance(.1) << c; // b will be compared with relative precisions .1
```

3. Especificar precisiones relativas y absolutas
------------------------------------------------

Es posible usar de forma efectiva la precisión absoluta y la relativa al mismo tiempo. Si se especifican ambas precisiones, el delta efectivo se calculará como el máximo entre el delta absoluto y el relativo. Supongamos que tenemos un arreglo de valores que van de 0 a 100 y queremos compararlos de la siguiente manera: ningún valor debe diferir del original en más de un 5% y, al mismo tiempo, queremos considerar iguales los valores que sean ambos inferiores a .1 en valor absoluto. Con UTracer podemos hacerlo de la siguiente manera:

```
UTracer UT("MyFile.u");
Vector<Real> v;
...
UT.abs_tolerance(.1).rel_tolerance(.05); // set absolute precision as .1
// and set relative precision as 5%
for (i=0; i < v.size(); i++) {
    UT << v[i];
}
```

Truco: para comparar números enteros con una precisión, conviértelos primero a double y luego usa las funciones 'delta' y 'relative' de UTracer para compararlos.

Uso de UTracer para comparar la salida de canales especificados dentro de las bibliotecas core/protocols
=========================================================================================================

También es posible usar UTracer para vigilar y comparar la salida de otros canales de Tracer. Esto a veces puede ser muy útil para probar las partes internas de las bibliotecas. Por ejemplo, supongamos que tenemos una clase MyMover para la que queremos escribir una prueba unitaria. Y que el valor que queremos probar se genera como variable local en la función miembro apply() y no se guarda como miembro de la clase. Para probar esos valores podemos hacer lo siguiente:

1.  En la función miembro apply de MyMover, envía estos valores a un canal especial de Tracer:

    ```
    MyMover::apply(...) {
        core::util::Tracer test_TR("protocols.moves.MyMover.test");
        ...
        test_TR << "Test value 1:" << test_value_1 << "\n";
        test_TR << "Test value 2:" << test_value_2 << "\n";
    }
    ```

2.  En la función de la prueba unitaria, antes de empezar a probar la clase MyMover: crea una clase UTracer y redirige el canal de core "protocols.moves.MyMover.test" a ese objeto UTracer usando la función estática de Tracer `set_ios_hook(VTracerOP tr, std::string monitoring_channels_list);`. Así, el archivo MyMoverTest.cxxtest.hh puede contener algo como:

    ```
    test_MyMover() {
        VTracerOP UT = new UTracer("<somepath>/.../MyMover.u");
        core::util::set_ios_hook(UT, "protocols.moves.MyMover.test core.scoring" );
        ...
        MyMover mm(...); // creating MyMover object
        ...
        mm.apply(...); // inside apply function test_value_1 and test_value_2 will be outputted to channel 'protocols.moves.MyMover.test' and in turn redirected to our UT object.
        ...
        core::util::set_ios_hook(0, "" ); // stopping redirection.
    }
    ```

##Véase también
* Resumen y filosofía de las [[pruebas unitarias|unit tests]]
* [[Ejecutar pruebas unitarias|run-unit-test]]
* [[Escribir pruebas unitarias|writing-unit-tests]]
* [[UMoverTest|mover-test]], una herramienta para probar con pruebas unitarias las clases Mover

* [[Página de inicio de las pruebas|rosetta-tests]]
* [[Página de inicio de la documentación para desarrolladores|Development-Documentation]]

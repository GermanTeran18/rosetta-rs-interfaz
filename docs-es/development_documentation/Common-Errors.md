#Errores comunes y cómo evitarlos

* En las comparaciones entre variables con signo y sin signo, el problema suele ser que usaste incorrectamente un `int` cuando, según nuestras convenciones, deberías haber usado `Size`.
  * Si necesitas un número negativo, *aun así* no deberías usar `int`; usa `SSize`.
  * Si no corriges el problema de fondo, siempre puedes hacer una conversión (cast), pero en ese caso sigue las convenciones y usa `static_cast<int>()`, no `(int)()`.

* La inicialización por defecto de un char:
`char foo = char(0)`, que es lo mismo que `char foo = char()`.

* Para "desocultar" una función virtual sobrecargada, usa `using` para añadir la función original al ámbito de la clase derivada:
```
class parent {
public:
    void foo(int);
};

class child : public parent {
public:
    using parent::foo;

    void foo(float);
};
```

* Para corregir una advertencia de parámetro sin usar, simplemente elimina el nombre de la variable de la declaración:
```
void foo(char bar);
```
a:
```
void foo(char /*bar*/);
```
o (mejor, si nunca piensas usar `bar` en la implementación de `foo`):
```
void foo(char);
```

>>>>>>> 39737bef0814ff5f067e725d7984346053b2f888
* Para comparar un "no puntero" con `NULL`, usa `get()` sobre el `OP`.

* Para evitar las advertencias "foo will be initiallized after bar", inicializa en el mismo orden en que aparecen los datos privados en el archivo `.hh`.

* Si no puedes usar `core::Size` para corregir una advertencia de comparación de tipos (porque estás por debajo de `core`), usa `platform::Size` en su lugar.

* Código como este:
```
foo = R"bar(
        var1, var2
    )";
```
debe cambiarse por esto:
```
foo = "bar(\n"
    "    var1, var2\n"
    ")";
```

* Para corregir ```ignoring return value of 'int foo(bar)', declared with attribute warn_unused_result [-Wunused-result]``` rodea la función con un bloque `if`, *p. ej.*:
```
if (system(command_line.c_str()) == -1) {
    TR.Error << "Shell command failed to run!" << std::endl;
}
```

* Usa directivas del preprocesador &mdash; como `#ifndef NDEBUG` o `#ifdef PYROSETTA` para que el código solo se use en ciertos modos de compilación. Esto permite evitar advertencias de variables sin usar que solo ocurren en ciertos modos de compilación. Por ejemplo, el siguiente código evita una advertencia de parámetro sin usar y funciona de forma distinta si Python está disponible:
```
void
PhenixInterface::setAlgorithm(
#ifdef WITH_PYTHON
        std::string algo)
#else
        std::string /*algo*/)
#endif
{
#ifdef WITH_PYTHON
    algo_ = algo;

    // nuke the target evaluator
    if (target_evaluator_) {
        Py_DECREF(target_evaluator_);
        target_evaluator_ = NULL;
    }
#else
    utility_exit_with_message( "ERROR!  To use crystal refinement compile Rosetta with extras=python." );
#endif
}
```

* Las funciones `void*` lanzan advertencias `no return statement in function returning non-void [-Wreturn-type]`.
 `void*` es un puntero a una función que devuelve `void`.  Como no tenemos ninguna función que devolver, devuelve un puntero `NULL`.

* No se pueden añadir chars a cadenas con `+`.  Para añadir un char a una cadena, primero hay que convertirlo.  (Sugiero usar `std::string(1, my_char)`.)

* Tampoco se pueden añadir ints a cadenas con `+`.  Para añadir un int a una cadena, primero hay que convertirlo.  (Sugiero usar `boost::lexical_cast<std::string)(my_int)`.)


##Véase también

* [[Development Documentation]]
* [[Build Documentation]]
* [[Scons Overview and Specifics]]: información detallada sobre el sistema de compilación Scons
* [[FAQ]]

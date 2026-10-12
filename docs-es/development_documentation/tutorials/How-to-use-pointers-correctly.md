# Cómo usar los punteros correctamente

##Cómo usar correctamente los punteros propietarios y de acceso

La siguiente guía resume cómo usar correctamente los [[punteros propietarios|owning pointers]] y los [[punteros de acceso|access pointers]]. Con la transición a las clases de punteros de boost:: / std::, hay que seguir estas reglas para evitar errores de compilación o caídas en tiempo de ejecución (doble liberación).

Nota:

* OP = `utility::pointer::owning_ptr` AKA `std::shared_ptr` o `boost::shared_ptr`
* AP = `utility::pointer::access_ptr` AKA `std::weak_ptr` o `boost::weak_ptr`

El tipo de puntero se puede seleccionar en tiempo de compilación. Los punteros de Boost son los predeterminados (porque no requieren un compilador compatible con C++11); para compilar con punteros de std:: en su lugar, compila con extras=cxx11.
  
**Reglas:**

* Nunca pongas `this` en un OP  
Solo quien instancia el objeto puede poner ese objeto en un OP.

* Nunca pongas en un OP un puntero desnudo (sin procesar) recibido de alguna parte  
Los punteros desnudos pueden usarse y pasarse para hacer referencia a un objeto, pero nunca deben volver a ponerse en OPs ni APs. Úsalos con cuidado: no hay garantía de que un puntero desnudo siga siendo válido.

* Nunca pongas una referencia en un OP  
Puedes crear una referencia a partir de un OP y pasarla, pero debes tener cuidado de asegurar que el OP siga vivo. Las referencias nunca se pueden poner en OPs ni APs. Esto causará corrupción por doble liberación. Muchos objetos, como Pose, Movers y ResidueType, ofrecen los métodos `get_self_ptr()` y `get_self_weak_ptr()`, que se pueden llamar sobre una referencia (o incluso sobre un puntero sin procesar) para obtener un OP o AP adecuado.  
  
    Salvedades de `get_self_ptr()` y `get_self_weak_ptr()`:  
    * Estos métodos solo son válidos si el objeto está asociado a un OP y no está declarado en la pila, es decir, `Pose pose;` frente a `PoseOP pose( new Pose );`.

    * Estos métodos no se pueden usar en el constructor ni en el destructor del propio objeto, porque en ese momento todavía no son válidos o ya han dejado de serlo.

    * Llamar a estos métodos antes de que se inicialice el puntero a sí mismo provocará una excepción bad_weak_ptr.

* No uses `dynamic_cast<Some *>` ni pongas el resultado en OPs  
dynamic_cast toma la dirección del objeto y la vuelve a poner en un OP. Por lo tanto, usa esto en su lugar para hacer conversiones dinámicas sobre OPs: `SomeOP x = utility::pointer::dynamic_pointer_cast<Some>(y);`
 
* Si necesitas un puntero que no sea propietario pero no estás seguro de si un puntero seguirá siendo válido, no uses punteros desnudos (ni referencias), sino weak_ptrs. Puedes comprobar si el puntero sigue siendo válido o ha expirado (el objeto al que apunta ha sido destruido) con `ap.expired()`, o llamar a `ap.lock()` para bloquear el AP y obtener un OP. Comprueba el resultado de esa llamada a lock; si el puntero expiró, obtendrás un OP NULL.  
El uso de punteros desnudos es aceptable cuando hace falta, pero hay que tener cuidado. Por lo tanto, es preferible usar OPs y APs.

**Usos no permitidos:**

* Crear un OP a partir de `this`, es decir, `SomeOP someop( this )`  
Nunca hagas esto, ya que causará caídas por doble liberación. Cada dirección de objeto (es decir, la que resulta de la instanciación con `new`) se puede colocar en un OP exactamente una vez. Poner el mismo puntero desnudo en un segundo OP provocará una doble liberación del objeto y, por lo tanto, un fallo de segmentación.  
Uso sugerido: `SomeOP someop( new Some( ... ) )`
   
* Asignar un puntero desnudo a un OP:  
`Some o = new Some;`  
`SomeOP op1 = new Some;`  
`SomeOP op2 = o;`  
Estas instrucciones no compilarán. Estas conversiones implícitas están explícitamente prohibidas para que los desarrolladores tengan que indicar de forma explícita que quieren que el OP gestione el tiempo de vida del puntero desnudo proporcionado. Hazlo así, y solo una vez, para una instancia dada:
`SomeOP op( new Some );`

* Pasar o asignar this a un AP:  
`SomeCAP somecap( this );`  
`foo(SomeCAP x) {}; foo( this );`  
No compilará. Un AP solo se puede crear a partir de un OP.
   
* Desreferenciar un AP directamente:  
`some_ap_->foo()`  
`some_ap_->var`  
No compilará. Primero hay que hacer lock() del AP:  
`some_ap_.lock()->foo()`  
`some_ap_.lock()->var`  
Nota: Cuando el bloqueo falla, lo anterior producirá una desreferencia de puntero nulo y un fallo de segmentación. Si no estás seguro de que el bloqueo vaya a tener éxito, asigna primero a un OP:  
```
SomeOP some_op = some_ap_.lock();
if(some_op) {
  some_op->foo();
}
```  
Se puede comprobar la validez de un AP con some_ap_.expired(); sin embargo, no hay garantía de que un AP no expire entre la comprobación y el bloqueo. Usa mejor lock() y comprueba el resultado si se espera que un AP no siempre sea válido.  
Si un AP debería ser siempre válido, se puede crear un OP directamente a partir del AP: `SomeOP some_op( some_ap_ );`. Esto lanza una excepción bad_weak_ptr si el AP expiró, lo que ayuda a diagnosticar problemas y se puede capturar.  
Usar lock() sin comprobar el resultado es rápido pero peligroso, es decir: `some_ap_.lock()->foo();`
   
* Comparar un AP con un AP, un OP, un puntero desnudo o this:  
`if( some_ap == this )`  
`if( some_ap == some_other_ap )`  
`if( some_ap == some_op)`  
`if( some_ap == &some_ref )`  
No está permitido, no compilará. Usa en su lugar la plantilla auxiliar equal():  
`utility::pointer::equal( some_ap, this )`  
`utility::pointer::equal( some_ap, some_other_ap )`  
`utility::pointer::equal( some_ap, some_op )`  
`utility::pointer::equal( some_ap, &ref )`  
Véase también: http://stackoverflow.com/questions/12301916/equality-compare-stdweak-ptr

* Crear un conjunto (set) de AP: `typedef std::set< SomeCAP > SomeSet;`
No compilará. Como un set está ordenado pero los weak_ptr no se pueden comparar, hay que proporcionar un comparador en C++11: `typedef std::set< SomeCAP, std::owner_less< SomeCAP > > SomeSet;`

* Crear un OP a partir de una referencia: `SomeOP someop( &someref );`
Esto causará caídas por doble liberación. Nunca crees un OP a partir de una referencia.  Simplemente no lo hagas. Esto es totalmente ilegal pero compilará... y se caerá:  
`SomeOP op( new Some );`  
`Some &op_ref = *op;`  
`SomeOP op2( &op_ref );`  
Esto está bien:  
`SomeOP op( new Some );`  
`SomeAP ap( op );`  
`SomeOP op2( op );`  
`SomeOP op3( ap );`  
`SomeAP ap2( ap );`  

¿Preguntas o sugerencias? Escribe a Luki: lugo@uw.edu

##¿Debo usar punteros propietarios o una referencia (&) en mi clase o función?

Este es un conjunto de pautas para elegir entre el estilo de código con puntero propietario (OP) y con 'const &' para los miembros de datos de las clases y los argumentos de las funciones.

-   Usa OPs cuando se pasen objetos a un objeto distinto que conservará una propiedad parcial.
-   Usa referencias (&) cuando se pasen objetos que se van a modificar
-   Usa referencias constantes (const &) cuando se pasen objetos que no se van a modificar

Para decidir qué tipo de dato es apropiado para tu función o clase, considera las siguientes preguntas:

    1.  ¿Una instancia de tu clase será propietaria de estos datos? Es decir: ¿la vida útil de los datos es exactamente la misma que la de una instancia de la clase? En este caso, probablemente no necesites usar un OP.
    2.  ¿Tu clase guarda "datos de otra persona", es decir, los "referencia"? Si es así, probablemente debas usar un OP.

##Véase también

* [[Coding conventions]]
* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[Owning pointers]]
* [[Access pointers]]
* [[ReferenceCount]]: Se usaba antes para los punteros propietarios y de acceso (ahora obsoleto)
* [[Writing an app]]

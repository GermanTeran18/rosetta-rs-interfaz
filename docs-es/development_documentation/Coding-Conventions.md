#Convenciones de código y ejemplos

Rosetta 3 (antes MiniRosetta) es una implementación orientada a objetos de Rosetta que un equipo central de desarrolladores ha reescrito desde cero en C++. Estas pautas pretenden ayudar a los desarrolladores nuevos de Rosetta a aprender (y recordar a los desarrolladores antiguos o actuales) a mantener y mejorar la fiabilidad, la claridad y el rendimiento del código mientras seguimos desarrollándolo y modernizándolo.

[[_TOC_]]


##Convenciones
###Encabezado de copyright
El encabezado de copyright de Rosetta Commons es obligatorio en todos los *archivos* de código fuente de Rosetta. No lo modifiques. El encabezado que debes usar en todos los archivos fuente de C++ es:
```
// -*- mode:c++;tab-width:2;indent-tabs-mode:t;show-trailing-whitespace:t;rm-trailing-spaces:t -*-
// vi: set ts=2 noet:
//
// (c) Copyright Rosetta Commons Member Institutions.
// (c) This file is part of the Rosetta software suite and is made available under license.
// (c) The Rosetta software is developed by the contributing members of the Rosetta Commons.
// (c) For more information, see http://www.rosettacommons.org. Questions about this can be
// (c) addressed to University of Washington UW CoMotion, email: license@uw.edu.
```

###Pautas de programación
####General
* Los [[espacios de nombres (enlace del wiki de media)|https://wiki.rosettacommons.org/index.php/Namespace_example]] se usan para agrupar las clases asociadas que forman un componente conceptual. **Se espera que los espacios de nombres de Rosetta coincidan con la jerarquía de directorios** (*es decir*, el código del espacio de nombres `core::scoring` se encuentra en el directorio `src/core/scoring` &mdash; `src` no forma parte de la jerarquía de espacios de nombres) y *viceversa*. (Todo el código de `src/core/scoring/Blah.[cc,.hh,.fwd.hh]` debe estar dentro del espacio de nombres `core::scoring`).

* **Evita los punteros crudos.**
  * Los punteros crudos tienden a producir reglas de propiedad de datos demasiado complejas que, cuando no se siguen, provocan fugas de memoria o referencias colgantes. En cambio, los punteros inteligentes garantizan que los objetos se eliminen a sí mismos si y solo si todos los demás objetos han dejado de apuntar a ellos. Un puntero inteligente existe como dos componentes: un objeto con un contador de referencias y un puntero que modifica ese contador cada vez que se modifica. Cuando un puntero inteligente apunta a un objeto, incrementa el contador de referencias de ese objeto. Cuando más tarde se le hace apuntar a otro sitio, decrementa el contador de referencias. Cuando el contador de referencias de un objeto llega a 0, el objeto se elimina a sí mismo.
  * La debilidad de un esquema de punteros propietarios (en comparación con un esquema de recolección de basura como el de Java) es que las referencias circulares pueden producir fugas de memoria. Por ejemplo, si el objeto A apunta a B y el objeto B apunta a A &mdash; y nada más apunta a ninguno de los dos &mdash;, los dos objetos no se eliminarán a sí mismos, aunque ya no sean accesibles para el resto del programa.
  * Para superar este problema, Rosetta 3 usa dos tipos de puntero inteligente: [[punteros propietarios|owning pointers]] (también llamados "OP") o [[punteros de acceso|access pointers]] (también llamados "AP"). Los punteros propietarios incrementan los contadores de referencias; los punteros de acceso no. El uso de punteros propietarios debe limitarse a apuntar hacia abajo en una jerarquía de permanencia; los punteros de acceso deben apuntar hacia arriba o hacia los lados en esa jerarquía. Considera dos clases &mdash; la clase `Collection` y la clase `Object`, donde una `Collection` apunta a muchos `Object` y los `Object` apuntan hacia arriba a la `Collection` en la que están contenidos. La `Collection` debe guardar [[punteros propietarios|owning pointers]] a los `Object` y los `Object` deben guardar un puntero de acceso a su `Collection`.
  * Encontrarás más información sobre cómo usar correctamente los punteros propietarios en Rosetta aquí: [[How to use pointers correctly]]

* **Evita los [[arreglos de estilo C (enlace del wiki de media) |https://wiki.rosettacommons.org/index.php/C-style_array_examples]].** Evita especialmente escribir en arreglos `char` de estilo C con la familia de funciones `scanf`. Esto introduce invariablemente errores de desbordamiento de búfer que pueden pasar inadvertidos y son difíciles de rastrear. En su lugar, usa búferes `std::string` y E/S de flujos de C++. También se ha comprobado que `scanf` es una debilidad de seguridad (por el "stack smashing").

* **Usa [[guardas de inclusión (enlace del wiki de media) |https://wiki.rosettacommons.org/index.php/Include_guards_example]] en todos los archivos de encabezado.** Por coherencia, las variables de inclusión que se definan deben llamarse `INCLUDED_namespace(*_subnamespace)_filename(_FWD)_HH`, *p. ej.*:
 ```#define INCLUDED_core_scoring_EnergyMap_HH```

* **Usa [[aserciones (enlace del wiki de media)|https://wiki.rosettacommons.org/index.php/Assertion_example]] para comprobar sucesos que no deberían ocurrir con ninguna entrada ni operación normal del programa**: precondiciones y poscondiciones de funciones, invariantes de objetos, divisiones por cero, etc.
  * De forma similar, usa `PyAssert()` para evitar que PyRosetta sufra fallos de segmentación.

* **Usa bloques `if` para comprobar errores que podrían ocurrir durante el funcionamiento normal del programa.** Los errores deben generar informes útiles que incluyan los valores de las variables relevantes.

* **Corrige todo lo que cause una advertencia legítima del compilador en cualquier plataforma.**
** Haz clic aquí para ver una [[lista de advertencias comunes y cómo evitarlas|Common Errors]].

* **Sin duplicación de código.**
  * No reescribas protocolos que otros ya han escrito.
  * No definas tu propio valor de pi &mdash; usa el que está definido en la [[biblioteca `numeric`|namespace-numeric]].

* **Si declaras una función pública, tienes que definirla** (preferiblemente en un archivo `.cc`).
** Las funciones miembro privadas sin definir (*p. ej.*, constructor privado, constructor de copia, *etc.*) están permitidas.

####Estructura de las clases
* **Añade tres archivos por cada clase**:
  *  un archivo `.cc`,
  * un archivo `.hh` y
  * un archivo `.fwd.hh`. (Consulta [[Inclusión de archivos|Coding-Conventions#File-Inclusion]] más abajo para ver los detalles sobre qué incluir en cada archivo.)

#####Datos miembro
* Todos los datos persistentes deben vivir como datos miembro de una clase.  **Sin datos globales.** (Consulta [[Global Data in Rosetta]] ).

* Todos los datos deben ser privados; **los datos protegidos están prohibidos.**
  * Si las clases derivadas necesitan acceso de lectura a datos privados, crea funciones de acceso (accessors).
  * Si las clases derivadas necesitan acceso de escritura a datos privados, escribe mutadores (mutators).

* **Asegúrate de que cada dato miembro de una clase se copie en su constructor de copia y en su operador de asignación (`operator=`).**

* Si añades datos a una clase y esa clase tiene constructores de copia u operadores de asignación definidos por el usuario, **asegúrate de que tus nuevos datos se copien** dentro de esos métodos.

#####Funciones miembro
* **Las funciones miembro deben ser "const correct"** (consulta [[`constant`|Coding-Conventions#const]] más abajo). Si no cambian su objeto, deben declararse const; si lo cambian, omite el `const` del final de la función para declararlas implícitamente como no const.

* **Toda clase base con funciones virtuales debe tener un destructor virtual.**

* **Toda clase derivada que sobrescriba una función virtual de una clase base debe usar el identificador `override` de C++11** para que el compilador detecte diferencias involuntarias entre la firma de la función de la clase base y la de la clase derivada.  Menos importante: la convención de estilo de la comunidad es omitir el identificador `virtual` en la sobrescritura de la función de la clase derivada cuando se usa el identificador `override`.  Lo más importante, sin embargo, es usar la palabra clave `override`: esto es funcional, no meramente estilístico. (_Novedad del 6 de abril de 2018_.  Para saber más sobre qué hace `override` y por qué es útil, consulta <a href="https://blog.smartbear.com/development/use-c11-inheritance-control-keywords-to-prevent-inconsistencies-in-class-hierarchies/">esta entrada de blog</a>.)

* **Pasa los objetos a los métodos por referencia y no por valor** &mdash; excepto cuando la intención sea hacer una copia del objeto. Si el objeto no cambia, pásalo como referencia const. Pasar objetos por valor también requiere `#includes` adicionales no deseados en los archivos de encabezado (consulta [[Inclusión de archivos|Coding-Conventions#file-inclusion]] más abajo).

* **Pasa los tipos de datos primitivos por valor y no por referencia cuando son estrictamente parámetros de entrada.** Pásalos por referencia no const si los métodos están pensados para cambiar los valores que contienen los parámetros de entrada. (*P. ej.*, `void max( int first, int second, int & answer );`). Pasar primitivos por referencia es más lento que pasarlos por valor.

* Comprueba que los métodos polimórficos estén correctamente sobrescritos en las clases derivadas. **Las firmas de las funciones de los métodos polimórficos deben coincidir exactamente.**

* Si una clase incluye punteros propietarios a otros objetos, **define explícitamente el destructor, el constructor de copia y el operador de asignación** (`operator=`) en el archivo `.cc`. (Consulta las [[FAQ]] para más detalles.) No dejes que lo haga el compilador. Si creas cualquier constructor, se impide que se sintetice el constructor por defecto. Quienes diseñan clases siempre deben decir exactamente qué debe hacer la clase y mantenerla totalmente bajo control. Si no quieres un constructor de copia o un `operator=`, decláralos como privados.

* **Cuidado con las definiciones largas de funciones miembro.** Las funciones complicadas con demasiadas líneas son difíciles y costosas de mantener &mdash; y difíciles de ampliar. Divide las funciones miembro largas en varias funciones miembro más pequeñas.

* **Cuidado con las listas de argumentos largas.** Las llamadas a funciones se vuelven entonces difíciles de escribir, leer y mantener. En su lugar, intenta mover la función miembro a una clase donde sea más apropiada y/o pasar objetos como argumentos &mdash; *p. ej.*, si una función necesita saber varias cosas sobre un rotámero (sus ángulos chi, la forma en que se produjeron esos ángulos chi, el tipo de aminoácido, los bins de chi, *etc.*), envuelve todos esos datos individuales en un objeto `Rotamer`. Entonces se puede pasar a la función un único parámetro (quizá un `Rotamer const &`) en lugar de muchos.

#####Herencia
* **Define typedefs OP para las clases en sus archivos `.fwd.hh` correspondientes. (Consulta la explicación sobre los punteros propietarios en [[#General.|Coding-Conventions#General]] más arriba.) **Nota**: ya no es necesario que las clases deriven de ReferenceCount. Consulta [[How to use pointers correctly]] para ver información sobre el nuevo sistema de punteros.
** Los objetos asignados dinámicamente deben ponerse en punteros propietarios en el momento de su asignación.

* **Evita la herencia múltiple.**

* **No uses herencia protegida.** La herencia privada puede ser una alternativa útil a la contención, pero por lo general preferimos la contención.

####Inclusión de archivos
¿Por qué importa la inclusión de archivos? Por la velocidad de compilación &mdash; ¡y a veces por la capacidad misma de compilar! La #inclusión imprudente produce tiempos de compilación largos al compilar desde cero y tiempos de recompilación largos tras hacer modificaciones. La mayor parte del desarrollo se dedica, por tanto, a compilar y recompilar; con malas prácticas de #inclusión pierdes tu tiempo y el valioso tiempo de tus colegas. (Considera que Rosetta++, por sus `#include` circulares, no se podía compilar en ninguna máquina BlueGene sin una modificación especial del compilador de BlueGene.)
* PREFACIO: las declaraciones adelantadas de clases van en archivos .fwd.hh.
  * Una declaración adelantada de una clase 
  `class MyClass;`
  Dentro del archivo .fwd.hh, declara por adelantado la(s) clase(s) y, si derivan de utility::pointer::ReferenceCount, define con typedef los punteros propietarios y los punteros propietarios const con los sufijos OP y COP:
<pre>
namespace core{
namespace scoring {
class MyClass;
typedef utility::pointer::owning_ptr< MyClass > MyClassOP;
typedef utility::pointer::owning_ptr< MyClass const > MyClassCOP;
}
}
</pre>

* PREFACIO: las declaraciones de clases van en archivos .hh
  * Aquí se declara una clase y se declara una función miembro, pero no se define. 
<pre>class MyClass { 
public: 
    void set_int( int input_int ); 
private: 
    int my_int_; 
};</pre>
* PREFACIO: las definiciones de las funciones miembro de las clases van en archivos .cc, excepto los métodos que se declaran inline por velocidad.  En caso de duda, pon las definiciones de las funciones en archivos .cc.
  * Aquí se define una función miembro
<pre>
void MyClass::set_int( int input_int ) { 
    my_int_ = input_int; 
}</pre>
  * Definiciones de funciones miembro aceptables en archivos .hh:
    * accesores (getters) no virtuales que devuelven tipos de datos primitivos (p. ej., Size, Real)
    * mutadores (setters) no virtuales que modifican tipos de datos primitivos
    * accesores no virtuales que devuelven referencias a datos miembro guardados en punteros inteligentes; los métodos que obtienen o establecen un puntero inteligente deben definirse en el archivo .cc
* Los archivos se deben incluir con #include usando rutas completas y paréntesis angulares (<, >) y no comillas.  Scons añadirá opciones -Idirectory a la línea de comandos del compilador.
* Si una función recibe como entrada una referencia o una referencia constante a la clase X, el archivo de declaración debe hacer #include de <X.fwd.hh> y no de <X.hh>
* Evita hacer #include de archivos .hh en otros archivos .hh.
  * Si solo usas un OP o un COP, incluye únicamente el encabezado fwd.hh
  * Excepción: si la clase Y deriva de la clase X, Y.hh debe hacer #include de <X.hh>
  * Excepción: si la clase Y contiene la clase X, Y.hh debe hacer #include de <X.hh>
    * Es preferible que la clase Y contenga un puntero propietario a X (un XOP) en lugar de una X.  Si la contención se gestiona mediante punteros propietarios, Y puede arreglárselas haciendo #include de X.fwd.hh
* No hay #inclusión cíclica entre bibliotecas.  Mantenemos una estructura de grafo acíclico dirigido (DAG).  Consulta [[más abajo|Coding-Conventions#Library Dependencies]].  
* Los contenedores de la STL (std::list, std::map, std::string, etc.) no se pueden declarar por adelantado de forma portable, pero incluir <set> y <map> puede ralentizar mucho los tiempos de compilación. Usar una clase envoltorio que acceda a std::set o std::map mediante un puntero puede aislar tu código de esos encabezados: ponte en contacto con una persona de soporte para pedir ayuda con esto.
  * La STL sí proporcionó un archivo de declaración adelantada muy útil: iosfwd.  Si tu clase tiene funcionalidad de E/S, en el archivo .hh de tu clase puedes hacer #include de <iosfwd> en lugar de #include de <iostream>. Por ejemplo, la siguiente clase podría usar iosfwd:
<pre> YourClass const & operator << ( std::iostream &, YourClass const & ) )</pre>

##### Organización de los \#include 
Tus \#include no deben aparecer en orden aleatorio, ni alfabético, ni en el orden en que decidiste que los necesitabas para el archivo.  Idealmente deben estar organizados.  Esta organización se aplica a los encabezados de archivos .cc o .hh, aunque en los archivos .hh debes tener inclusiones de .fwd.hh, no de .hh.  Cuenta con unos 5 grupos:
* "// Unit Headers": son los encabezados que declaran lo que define este archivo.  En otras palabras, A.cc incluye aquí A.hh.  
* "// Package Headers": son encabezados estrechamente relacionados, al menos dentro de un subdirectorio de core.  Por ejemplo, un encabezado relacionado con el packer podría tener aquí PackerTask.  
* "// Project Headers": aquí van los encabezados sueltos de todo el proyecto core (scorefunction, packer, pose, lo que sea).  
* "// Utility Headers": pon aquí lo de la biblioteca utility, así como los tracers y el sistema de opciones.  
* "// Numeric Headers" y "// ObjexxFCL Headers": lo de las bibliotecas homónimas; a veces se combinan con los Utility Headers.
* "// C++ headers": cosas de la biblioteca estándar de C++, como <string> o <map>

#####Dependencias entre bibliotecas 
La inclusión cíclica complica el código y el sistema de compilación y ralentiza la compilación.  El código se separa en bibliotecas discretas, que se compilan de forma independiente (y más rápido de lo que lo harían de otro modo).  El código de cualquier biblioteca solo puede hacer #include de encabezados de la misma biblioteca o de una biblioteca de nivel inferior.  
[[diagrama de flujo y resumen de las distintas bibliotecas | https://www.rosettacommons.org/docs/wiki/development_documentation/code_structure/src-index-page]] 

De menor a mayor nivel, las bibliotecas son (con ejemplos de código conocido):
* Nivel más bajo: bibliotecas externas con poca o ninguna modificación permitida (ObjexxFCL, zlib) (Boost, salvo que, al ser todo encabezados, no se compila de forma independiente)
* Nivel inferior: utility (vector1, [[punteros propietarios|owning pointers]], [[sistema de opciones|namespace-utility-options]], utility_exit())
* Nivel bajo: [[numeric|namespace-numeric]] (generador de números aleatorios, [[xyzVector]])
* Nivel medio: core ([[puntuación|namespace-core-scoring]], pose, packer) (aquí está la mayor parte de lo que consideramos funcionalidad de Rosetta)
* Nivel alto: protocols ([[movers|Mover]], Monte Carlo, código totalmente desarrollado)
* Nivel superior: devel (cosas de alto nivel en desarrollo, que pasarán a protocols a medida que maduren; el uso de esta biblioteca para el desarrollo de Rosetta se ha descontinuado en favor del flujo de trabajo de Pull Requests de GitHub)
* Nivel más alto: apps (todos los ejecutables, por lo que en realidad no es una biblioteca) (como aclaración, las aplicaciones que no estén en apps/pilot no deben heredar de devel)

####Nomenclatura 
* **`CamelCase` para los nombres de clases**

* **`box_car` con guiones bajos que separan las palabras, para los nombres de variables**

* **`box_car` con guiones bajos para espacios de nombres y directorios**

* **`box_car_` con guiones bajos y un guion bajo final para las variables miembro de las clases**

* Los archivos de definición de clases deben llevar el nombre de sus clases &mdash; *p. ej.*, `class PackerTask` se declara por adelantado en `PackerTask.fwd.hh`.



####Const 
*  Al declarar variables const: primero indica el tipo de la variable y después su condición de const. P. ej. Size const my_constant( 4 );  Hay una diferencia entre un puntero a una constante (p. ej. Size const *), un puntero constante (Size * const) y un puntero constante a una constante (Size const * const).  Para distinguir estos tres, const debe ir después del tipo.
* Las funciones miembro que no cambian los datos de una clase deben declararse const.  Los accesores deben ser const siempre que no devuelvan referencias no const a los datos que contienen.
  * Recuerda que la firma de una función miembro de una clase depende de la condición de const del objeto, y las funciones miembro pueden sobrecargarse en función de una diferencia de const:
  * _p. ej._ 
```c++
class MyClass { 
    public:

    int my_int() const { 
           return my_int_; 
    }
 
    int & my_int { 
           return my_int_; 
    }

    private:

    int my_int_;
};
```
Una instancia de esta clase puede pasarse a una función como const & con la estupenda garantía de que sus datos internos no se modificarán dentro de esa función.  ¡El compilador impedirá las llamadas a la función my_int() no const!
* Deben evitarse los datos miembro que se actualizan (_es decir_, se recalculan) de forma diferida (lazy).  Si son necesarios (_p. ej._, obtener coordenadas xyz de una Conformation provoca una evaluación diferida de `refold()`), deben declararse `mutable` para poder modificarlos en métodos const, y deben hacerse seguros para hilos.  Si no estás seguro de cómo garantizar que el acceso a los datos sea seguro para hilos, pregunta a la comunidad.
* Los datos miembro que cargan datos del disco de forma diferida _pueden_ usar datos `mutable` para poder cargarlos en un contexto `const`.  Sin embargo, deben cargar sus datos de forma segura para hilos.  Para ello se pueden usar las funciones de utilidad de `utility/thread/threadsafe_creation.hh`, y hay muchos ejemplos en `core/scoring/ScoringManager.hh`.  En caso de duda, **pregunta a alguien de la comunidad** cómo hacerlo de forma segura.
* Los datos miembro que no cambian durante la vida de una clase deben declararse const y deben inicializarse en sus constructores.
* Evita los métodos para "esquivar" la condición const de las funciones y modificar datos const.  Esto significa:
     * Nunca uses `const_cast` para descartar la condición const de un objeto const.
     * No uses `mutable` si se puede evitar.  Si no se puede, asegúrate de que los datos mutables se gestionen de forma segura para hilos.  La comunidad puede ayudarte a garantizar la seguridad para hilos, en particular durante el proceso de revisión de pull requests.  Normalmente, sin embargo, es posible simplemente pasar los datos a las funciones que los necesitan, en lugar de guardarlos en caché en variables mutables y acceder a ellos más abajo en una cadena de llamadas a funciones.  Lo primero es seguro para hilos; lo segundo no, ya que distintos hilos podrían invalidar las cachés de los demás.
     * En funciones const, evita modificar objetos a los que apuntan punteros propietarios miembro (no const).  Aunque lo que es const es el puntero en sí y no aquello a lo que apunta, este patrón puede perjudicar la seguridad para hilos.  Si debes hacerlo, consulta a la comunidad cómo hacerlo de forma segura para hilos.
     * Si te parece que realmente tienes que hacer algo de lo anterior, ¡**pide consejo a la comunidad**!  Normalmente hay una forma mejor.

#### Precisión y `typedef`s
* **No uses literales crudos para valores numéricos:** `0.0` *frente a* `Real( 0.0 )` 

* **Las variables primitivas deben declararse usando los `typedef` definidos en `core/types.hh`.**
  * Usa los tipos `Real`, `Distance`, `DistanceSquared` o `Size`, *etc.*
  * No uses `double`, `float` ni `int`.
    * Se pueden hacer excepciones para `int` &mdash; pero pregunta.
    * No uses `float` &mdash; no hagas `typedef` a `float`. Los cálculos en doble precisión producen mejores minimizaciones.
      * Se pueden hacer excepciones para datos estáticos de bases de datos grandes y de baja precisión (*p. ej.* la biblioteca de rotámeros de Dunbrack), aunque aun así se deben realizar cálculos de alta precisión a partir de estos objetos de baja precisión.

* **Los `typedef` de punteros propietarios deben colocarse en el mismo espacio de nombres que la clase de la que son plantilla los punteros propietarios.**

* **Los `typedef` de `typedef` pueden declararse (públicamente) dentro del ámbito de la clase,** pero no deben hacerse fuera del ámbito de la clase.
** Lo siguiente es correcto:
<pre>
// This is OK
namespace protocols { 
namespace movers { 
class MyMover { 
public: 
    typedef scoring::ScoreFunctionOP ScoreFunctionOP; 
}; 

}
}</pre>
¡Lo siguiente NO es correcto! Produce ambigüedad de nombres y errores del compilador
<pre>
// This is NOT OK!
namespace protocols { 
namespace movers { 
typedef scoring::ScoreFunctionOP ScoreFunctionOP; 
class MyMover { 
   … 
}; 

}
}
</pre>

####Using
*  No hagas declaraciones “using namespace X” fuera del ámbito de una clase en archivos de encabezado
   * En particular, no hagas declaraciones "using namespace core" en los encabezados.  Si esta declaración va antes de la inclusión de los encabezados de zstream (como suele ocurrir), una llamada a una función de inicialización de zlib en src/utility/io/zipstream.hpp:332 intenta en su lugar enlazar con core::init y la compilación falla.  (Esto puede funcionar en versiones del compilador anteriores a gcc 4.2, ¡pero sigue estando mal!)
* “using namespace X” puede declararse en cualquier parte de un archivo .cc, aunque es preferible declararlo dentro de los cuerpos de las funciones

####Conversiones (casts)
* Usa static_cast para convertir entre tipos numéricos (floats y doubles, floats e ints) en lugar de conversiones de estilo C.  Actualmente se hacen excepciones para las conversiones de int a Size, en las que las conversiones de estilo C son aceptables.
  * (float) 6.0 // estilo C
  * float (6.0) // estilo C n.º 2
  * static_cast< Real > ( 6.0 ); // estilo C++
  * static_cast< int > ( 6.5 ); // esto se redondea hacia abajo al entero más cercano, y es evidente
  * int( 6.5 ); // esto es más difícil de encontrar
* Al hacer un downcast (convertir de una clase de alto nivel a una que hereda de esa clase), usa un static_cast en el código, pero haz un dynamic cast dentro de una sentencia assert.  
  * Los dynamic cast suelen ser lentos
  * Las compilaciones de depuración comprobarán que el downcast tiene éxito.
  * p. ej.
```
symm_something( core::Conformation const & conf ) 
{

   // first assert the dynamic cast
   assert( dynamic_cast< core::conformation::symmetry::SymmetricConformation const * >( &conf ) );

   core::conformation::symmetry::SymmetricConformation const & 
      symmcomf = static_cast< core::conformation::symmetry::SymmetricConformation const & >
      ( conf );
}
```
Se proporciona una función de conveniencia que realiza las aserciones de dynamic_cast para simplificar esta tarea
```
utility::down_cast< Bar * >( foo ); // returns a pointer to a Bar instance
```
:* Si estás haciendo un downcast de un access_ptr o de un owning_ptr, puedes usar la siguiente función, que está disponible si has incluido los encabezados de owning_ptr o access_ptr
```
utility::pointer::down_pointer_cast< Bar >( foo ); // returns a BarOP
```

#### Características de C++11
* Se recomienda encarecidamente usar `auto` en los bucles `for`.
* Se permite usar `auto` en otros lugares, pero se prefiere encarecidamente que el tipo de la variable pueda deducirse del código _dentro de la misma función_.

#### Seguridad para hilos
* (Consulta el debate sobre datos globales [[ aquí |Global-Data-in-Rosetta]])
* Nunca uses datos estáticos no const en ningún método.  Los datos estáticos constantes están bien.  Si no sabes qué son los datos estáticos, no declares nada como static.
* Nuestro modelo de multihilo es:
  * no más de un hilo por Pose;
  * no más de un hilo por ScoreFunction;
  * no más de un hilo por EnergyMethod;
  * varios hilos para las clases Potential (p. ej. RamachandranPotential). 
* Las clases que leen datos de la base de datos deben compartirse entre hilos: ¡solo quieres una biblioteca de Dunbrack en memoria!  Las clases que necesitan guardar datos sobre un Pose concreto o una ScoreFunction concreta en datos miembro internos (en lugar de en la pila) no deben compartirse entre hilos (p. ej., la clase EtableEnergy guarda los pesos de fa_atr, fa_rep y fa_sol durante las evaluaciones por lotes de energías de pares de rotámeros en el packer.)

####Características inquietantes del lenguaje
* **No uses goto nunca.** C++ lo permite; nosotros no.
* **No uses macros** excepto para controlar la compilación con #ifdef
* **No uses operadores de post-incremento.**  i++ es un operador de post-incremento para la variable i.  ++i es un operador de pre-incremento.  Si i = 5, ++i establecería i en 6 y devolvería 6.  i++ establecería i en 6 y devolvería 5.  my_array[ ++i ] devolvería un valor distinto de my_array[ i++ ]. Para evitar confusiones, no uses operadores de post-incremento.  Los operadores ++ aparecen sobre todo en bucles for. En los bucles for, incrementa con ++loop_counter.
* **No uses `const_cast` nunca.**  La posibilidad de hacer algo `const` está ahí para ayudarte: garantiza que el compilador te detecte si intentas modificar por accidente algo que no debe modificarse.  Es un arnés de seguridad.  Descartar la condición const de algo es como tirar tu arnés de seguridad.
####Estilo
#####Puntos y coma
* No añadas puntos y coma de más.  No hacen falta puntos y coma después de los bucles for ni de los cuerpos de funciones.  Algunos compiladores marcan como errores los puntos y coma de más tras los cuerpos de funciones:
<pre>
for ( Size ii = 1; ii <= 10; ++ii ) {
    std::cout << ii << “ “;
}; // this semi-colon is unnecessary. 
class MyClass : public utility::pointer::ReferenceCount{
    MyClass : my_int_( 0 ) {}; // this semi-colon is unnecessary
    void my_function() {
        ++my_int;
    }; // this semi-colon is unnecessary. 
}; // This semi-colon is absolutely neccessary.
</pre>

* Marca como virtual todas las funciones virtuales de las clases derivadas, aunque su condición de virtual esté controlada por la declaración de la clase base.

#####Espacios

* Añade espacios para que el código tenga un aspecto más 'ligero'
  * añade espacios después de las palabras clave
  * añade espacios después de la puntuación (punto y coma, coma)
  * añade espacios antes y después de los operadores binarios: (<<,>>,+,-,*,||,&&,==)
  * añade espacios después de los paréntesis
Ejemplos:
<pre>
for ( Size ii = 1; ii <= 10; ++ii ) {  // this is correct spacing
    std::cout << ii << “ “;
}
if ( i == 2 ) { // this is correct spacing 
}
std::cout << "this string" << " should be written to output" << std::endl; // this is correct spacing


// now examples with incorrect spacing
for( core::Size i=linker_start_; i<=linker_end_; ++i ) {//missing space after keyword
}
for(Size j=start;j<=end;++j) { //missing space after keyword, missing space after parenthesis, missing space after semicolon
}
if ( i==2 ) { // missing spaces around operator
}
std:cout<<"this string"<<" should be written to ouput"<<std::endl; // missing spaces around << 
</pre>

#####Caracteres de fin de línea

* **Usa solo caracteres de salto de línea (line feed)** (estándar Unix), no retorno de carro más salto de línea (estándar DOS), **al final de cada línea.** Si editas código en una máquina con Windows, asegúrate de configurar tu editor con el formato de fin de línea correcto.

#####Sangría

* **Usa tabuladores para sangrar al principio de una línea,** no espacios.
  * (El código de Python debe usar espacios)

* Usa espacios, no tabuladores, después del primer carácter que no sea un espacio en blanco de una línea.  Se pueden usar espacios para alinear sentencias en líneas sucesivas. No intentes alinear el primer carácter que no sea un espacio en blanco de una línea con algún carácter que no sea el primero de la línea anterior combinando tabuladores y espacios.

* **Sangra un tabulador adicional por cada nivel de anidamiento.**

* **Sangra un tabulador adicional cuando los argumentos de una función tengan que continuar después de la primera línea.**

* **Sangra dos tabuladores adicionales cuando las declaraciones de los bucles `for` tengan que continuar después de la primera línea,** (*p. ej.*, cuando las clases de iteradores tienen nombres largos).

* **No sangres por el anidamiento de espacios de nombres.**

* **No sangres por ámbitos sueltos (raw scoping).**

* **Las etiquetas `public:` y `private:` dentro de las clases deben sangrarse al mismo nivel que la propia clase.**

#####Comparaciones
* Muchos compiladores de C++ permiten escribir `and` y `or` en inglés.  Otros no.  En C++, usa siempre `&&` y `||`.

####Salida
* Escribe la salida en Tracers.
* Nombra los tracers según el espacio de nombres y la clase:
  * p. ej. protocols.moves.MyMover

####Uso de opciones de línea de comandos
* Los constructores no pueden acceder directamente a las opciones de línea de comandos y deben llamar a una función miembro para hacerlo.
* Las funciones miembro solo pueden acceder a las opciones si además cumplen las siguientes propiedades:
  * Su nombre termina en "_options"
  * No usan ninguna variable ni función miembro no pública (NOTA PARA MÍ: HACER CUMPLIR ESTO CON SCRIPTS)
* Los casos existentes en los que funciones no miembro (es decir, ordinarias) aún acceden a las opciones están obsoletos, porque dificultan el control programático del comportamiento de la función, y se espera que desaparezcan (deseo escrito en septiembre de 2010).

####Otros
* **Elimina los espacios en blanco finales del código fuente antes de hacer commit.**

* **Elimina las variables y funciones sin usar;** si se dejan funciones con fines de depuración, déjalo indicado en un comentario.

* **Las comprobaciones condicionales deben ocurrir dentro de la función llamada y no en la función que llama**, cuando sea posible. Esto ayuda a mantener las cosas un poco más modulares y también garantiza que tu función no tenga efectos secundarios malos si alguien la llama pero olvida comprobar la condición esencial. Por ejemplo: 
En lugar de
 `if ( condition_exists ) my_function();`
 usa
`my_function();`
donde `my_function` empieza con
      `if ( !condition_exists ) return;`

* **Todo archivo nuevo debe tener al principio la información del modo de Emacs, la información de copyright y la información de Doxygen &mdash; incluidos el nombre del archivo y el nombre del autor.** (También puedes copiarla de un archivo similar.)

* No uses las funciones de `<cstdio>`, como `printf()`. **Aprende a usar los "flujos de E/S" (io streams)** en su lugar; son seguros en cuanto a tipos y extensibles en cuanto a tipos.

* **No uses la forma `MyType a = b;` para definir un objeto.** Esta característica es una gran fuente de confusión porque llama a un constructor en lugar de a `operator=`. Para mayor claridad, sé siempre específico y usa en su lugar la forma `MyType a(b);`.

####Compatibilidad con Windows Visual Studio
* no uses "read" como nombre de función.  Al compilador de VS no le gusta.
* no uses "interface" como nombre de variable.  Es una palabra clave que usa VS.

####Compatibilidad con BOINC + rutas
* usa utility::io::izstream (en lugar de std::ifstream) y utility::io::ozstream (en lugar de std::ofstream) para leer y escribir archivos.
* izstream es donde se usa la opción -in:path, de modo que, al cargar archivos con izstream, todos se benefician también del control de rutas.

###Pautas de comentarios
Los bloques de comentarios al principio de las funciones de Rosetta tienen un formato compatible con el programa de autodocumentación [[http://www.stack.nl/~dimitri/doxygen/Doxygen]].

#### Formato de los comentarios
* Todas las funciones deben documentarse al menos con el comando `@brief` de Doxygen.
  * **Usa `@brief` en los archivos de encabezado** (archivos `.hh`) donde se declara la función.
  * **Usa `@details` en los archivos de implementación** (archivos `.cc`) donde se define la función.
  * Ejemplo:
<pre>
 /// @brief finds the correct fold for every protein sequence
void fold_protein( std::string const & sequence );
</pre>

####Nota general
* Doxygen lee los comentarios "///". Actualmente está configurado para ignorar los comentarios dentro de los cuerpos de las funciones (sin importar con cuántas barras empiecen). Además, todo el bloque de comentarios debe tener al menos 3 barras; de lo contrario, doxygen puede omitir parte del bloque.
* Los comandos de doxygen empiezan con "@". Es importante dejar un espacio entre el comando y las barras (usa "/// @brief" y no "///@brief")
* Doxygen no usa los saltos de línea del archivo fuente. Hay que añadir un "\n" explícito para obtener un salto de línea en el html.

####Introducción a los comandos
* **@brief**  Sigue con una o dos líneas cortas sobre la función. Nota: solo lo que va hasta la primera línea "///" vacía o el siguiente comando "@" se colocará después del nombre de la función en la parte superior de la página html.
* **@param**  Los parámetros de la función se pueden especificar como: @param, @param[in], @param[out] o @param[in,out]. Sigue con el nombre del parámetro y una descripción breve. No pongas un guion antes del nombre del parámetro (no queda tan bien).
* **@return** (si hace falta)
* **@remarks** Pon aquí más información que no parezca pertenecer a la sección detallada. Qué diferencia exactamente esas cosas queda al gusto estético del programador.



####Notas sobre Doxygen (consulta Doxygen Tips)
* Doxygen lee los [[parámetros de configuración|http://www.stack.nl/~dimitri/doxygen/config.html]] de un "Doxyfile". (Llamado Doxyfile en el CVS de Rosetta++).
* La página index.html se genera a partir de los comentarios de doxygen.h
* Los gráficos se generan con el programa dot del paquete [[graphiz|http://www.graphviz.org/]]. (Su ruta se especifica en el Doxyfile.) Los colores de las líneas y los cuadros se describen [aquí](https://www.doxygen.nl/manual/diagrams.html).

###Pautas para la salida de depuración
* Usa [[basic::Tracer|tracer]] para tu E/S principal de depuración. La salida de Tracer se almacena en búfer y, por eso, es necesario indicar explícitamente al objeto Tracer que vacíe la salida. Para ello, llama a la función miembro Tracer::flush() o termina tu mensaje con std::endl (llamará a la función flush() después de enviar los símbolos de nueva línea).
* No hagas commit de código que contenga salida directa a std::cout y std::cerr en el código base de las bibliotecas (core, protocols, devel), salvo que vayas a terminar el programa de forma anormal (es decir, utility_exit(...)) por un error grave. En ese caso puedes usar la salida cerr para dar información adicional en tus mensajes de error.
* Nombra el canal del tracer según la ruta de tu archivo. Por ejemplo, el archivo core/io/pdb/file_data.cc debe tener un canal de Tracer llamado 'core.io.pdb.file_data'. Es posible que en algunas circunstancias se pueda usar un canal con otro nombre: pregunta.
* Si necesitas crear un tracer con nombres de canal personalizados, simplemente añádelos después de espacios_de_nombres.nombre_de_archivo, por ejemplo:
` core.scoring.constraints.EnzConstraintIO.custom_fancy_name_for_channel `
*  Intenta minimizar la cantidad de salida producida con nivel core::util::t_info y superiores. Por defecto, genera tus mensajes con nivel t_debug o inferior. Usa niveles superiores solo si crees que tu mensaje será informativo para los demás.
* Evita imprimir datos en tracers dentro de bucles internos.  Aunque el tracer esté silenciado y el mensaje no se envíe a la pantalla, la creación y destrucción de las cadenas que se envían al tracer puede ralentizar el código enormemente.
* Para generar un mensaje con una prioridad predefinida, usa los miembros proxy del objeto Tracer: TR.Fatal, TR.Error, TR.Warning, TR.Info, TR.Debug, TR.Trace.
* Es aconsejable que el nombre del objeto Tracer principal del archivo sea similar al de los demás tracers principales de otros archivos. El ejemplo recomendado actual es:
```
  /// Tracer instance for this file
  static basic::Tracer TR("core.io.pdb.file_data");
```
----

##Plantillas de código
Las siguientes plantillas pueden ayudar a aprender las convenciones de código. También te ahorrarán mucho tiempo. Añade tus propias plantillas de Rosetta 3 que cumplan las convenciones de código a la lista siguiente, que está organizada por IDE y tipo de archivo.

###Eclipse
#### Encabezados (.hh) 
* [[Plantilla genérica de archivo de encabezado forward de clase para Eclipse (media wiki)|https://wiki.rosettacommons.org/index.php/Generic_class_forward_header_file_template_for_Eclipse]]
* [[Plantilla genérica de archivo de encabezado de clase para Eclipse (media wiki)|https://wiki.rosettacommons.org/index.php/Generic_class_header_file_template_for_Eclipse]]
* [[Plantilla de archivo de encabezado de clase Mover para Eclipse (media wiki)|https://wiki.rosettacommons.org/index.php/Mover_class_header_file_template_for_Eclipse]]

####Archivos fuente (.cc)
* [[Plantilla genérica de archivo fuente de clase para Eclipse|https://wiki.rosettacommons.org/index.php/Generic_class_source_file_template_for_Eclipse]]
* [[Plantilla de archivo fuente de clase Mover para Eclipse|https://wiki.rosettacommons.org/index.php/Mover_class_source_file_template_for_Eclipse]]
* [[Plantilla de archivo fuente de aplicación piloto para Eclipse|https://wiki.rosettacommons.org/index.php/Pilot_application_source_file_template_for_Eclipse]]

## Pautas para las [[pruebas de integración|integration-tests]]
* ejecuta las pruebas de integración *antes* de hacer commit de cualquier código
* asegúrate de que tu código no produzca cambios inesperados
* divide los commits grandes en partes más pequeñas si es posible 
si tienes un commit grande que además cambia varias pruebas de integración
es difícil para los demás ver que los cambios en las pruebas de integración son todos esperados y no 
patológicos. Por eso es buena práctica dividir esos commits en partes. Lo ideal es que puedas 
aislar las líneas o los archivos que causan cambios en las pruebas de integración y hacer commit de ellos de forma independiente del resto de los cambios de código que dejan invariables las pruebas de integración.

##Pautas para las pruebas unitarias
* Compila y ejecuta las pruebas unitarias *antes* de hacer commit de cualquier código.
* Si tus cambios rompen pruebas, arréglalas después de asegurarte de que los resultados son correctos. Si no puedes arreglar alguna prueba o no estás seguro de que los resultados sean correctos, ponte en contacto con el desarrollador (o la lista mini) responsable de esa prueba y pide ayuda.

##FAQ de programación de Rosetta 3
* Estoy muy frustrado porque actualicé mi versión de Rosetta y ahora no compila mi directorio de demostración.
  1. Para compilar código en apps/pilot:
     1. Crea el directorio src/apps/pilot/ekellogg/
     2. Copia your_demo_file.cc a este directorio
     3. Suponiendo que tu código está en devel, añade 'devel' y 'pilot_apps' a tools/build/user.settings
     4. Añade 'devel' a src/pilot_src.settings
     5. Ahora prueba scons bin/your_demo_file
  2. Para compilar código en demo: todavía es posible compilar archivos de demo/, pero requiere que cambies un archivo relacionado con scons.
     1. En Rosetta/tools/build, busca un archivo user.settings.
     2. Si no hay ningún archivo user.settings, copia el archivo user.settings.template y llámalo user.settings.
     3. Dentro de la opción "appends", añade "demo" como directorio que se va a compilar. Debería quedar así:
```
  settings = {
     "user" : {
          "prepends" : {
          },
          "appends" : {
                  "projects" : { "src" : [ "devel", "demo"  ], },
          },
          "overrides" : {
          },
          "removes" : {
          },
       }
   }
```

##Enlaces útiles
Para resolver el problema del formato podríamos usar embellecedores de código como...

* [[Artistic Style|http://astyle.sourceforge.net/astyle.html]]
* [[Great Code|http://sourceforge.net/projects/gcgreatcode/]]
* [[Gnu Indent|http://www.gnu.org/software/indent/]]
* [[Uncrustify|http://uncrustify.sourceforge.net/]]

Para acelerar el código...
* [[Consejos sencillos para optimizar código|http://www.tantalon.com/pete/cppopt/asyougo.htm]] (p. ej.: pasa siempre las cadenas por referencia)

##Véase también

* [[Convenciones de la base de datos de Rosetta|Database-Conventions]]
* [[Convenciones de programación en Python para Rosetta|Python coding conventions for Rosetta]]
* la [[lista de cosas que debes comprobar antes de hacer commit de tu código|before-commit-check]]
* [[Resumen de Rosetta|Rosetta overview]] para conocer Rosetta 3
* [[Tutoriales para desarrolladores|devel-tutorials]]
* [[Lista de advertencias comunes y cómo evitarlas|Common-Errors]]

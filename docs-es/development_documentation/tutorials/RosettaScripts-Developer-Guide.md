#Guía para desarrolladores de RosettaScripts

[[Volver a RosettaScripts|RosettaScripts]]

*Esta página se modificó en la actualización del wiki del Minicon 11, pero no llegamos a terminarla por falta de tiempo o de conocimientos. Si puedes terminarla, ¡hazlo, por favor!*

 Usar RosettaScripts en su sentido más básico implica organizar un flujo de trabajo de clases [[Mover|Movers-RosettaScripts]] que se definen y parametrizan en un lenguaje de scripting similar a XML, que se lee y se procesa para convertirlo en un protocolo arbitrario de minirosetta en tiempo de ejecución. También se usan clases Filter para controlar con más detalle el flujo del protocolo.

Repaso de la estructura de un RosettaScript 
-------------------------------------------
Un RosettaScript es un documento XML que DEBE estar contenido entre las etiquetas de apertura y cierre `<ROSETTASCRIPTS>`. Dentro de esas etiquetas hay varios elementos de nivel superior:
- Los Movers se definen en el elemento MOVERS y se guardan en Movers_map. El RosettaScriptsParser los gestiona directamente.
- De manera similar, los Filters se definen en el elemento FILTERS y se guardan en Filters_map. El RosettaScriptsParser también los gestiona directamente.
- El elemento PROTOCOLS es obligatorio, sensible al orden, y define el orden en que se aplicarán los movers y filtros. En realidad es simplemente la etiqueta del mover ParsedProtocol y gestiona su propia interpretación.
- El elemento APPLY_TO_POSE está obsoleto y en realidad no debería usarse. Permite a los usuarios definir movers que se aplicarán al Pose ANTES de interpretar los demás movers/filtros, lo que podría afectar a la numeración de residuos, añadir restricciones, etc. Todas estas funciones se pueden gestionar en otros lugares (mediante Poses de referencia, generadores de restricciones, etc.).
- El único atributo del elemento OUTPUT es una función de puntuación; se usa para designar qué función de puntuación debe usarse para puntuar el Pose final al terminar un protocolo.
- Todos los demás elementos de nivel superior (que definen funciones de puntuación, task operations, selectores de residuos, etc.) los interpretan las clases DataLoader y se guardan en el DataMap.

DataMap
-------

El DataMap es una estructura interna para guardar punteros a objetos de tipo arbitrario. El método parse\_my\_tag() de cada Mover tiene acceso const al DataMap y puede recuperar punteros de él. Esto puede ser útil para la comunicación entre movers. Por ejemplo, tanto el mover LoopFinder como el KinematicLoop pueden obtener un LoopsOP común durante la interpretación. En el momento de aplicar, el LoopFinder puede llenar el LoopsOP con loops y KinematicLoop puede leer de él después.

###Usar el DataMap
Durante la interpretación de RosettaScripts, la mayoría de las clases (distintas de los movers y filtros) las lee un DataLoader y las coloca en el DataMap. Esto permite que otras clases (movers/filtros, etc.) accedan a ellas haciendo referencia a ellas por nombre en sus etiquetas.
Por ejemplo, los ResidueSelectors se guardan en el DataMap bajo la categoría "ResidueSelector". Cuando el intérprete de RosettaScripts encuentra el bloque RESIDUE_SELECTORS de un RosettaScript, el ResidueSelectorLoader instancia cada uno de los selectores definidos en ese bloque y los guarda en el DataMap con la función add( "ResidueSelector", <name of selector>, <OP to selector>). Cuando una etiqueta posterior hace referencia a ese selector, es decir, usando la opción residue_selectors="x,y,z", podemos recuperar los selectores adecuados con la función del DataMap  

###Añadir nuevos bloques de nivel superior a RosettaScripts
Para añadir un nuevo subelemento de nivel superior al elemento ROSETTA_SCRIPTS, hay tres requisitos principales:

1. Como con cualquier elemento de RosettaScripts, todos los elementos que quieras que contenga este bloque deben tener las funciones parse_my_tag y provide_xml_schema.
2. La clase que quieres que contenga este elemento debe tener una fábrica (factory) y un registrador (registrator), y cada subclase debe tener un creador (creator).
3. Debes crear una clase DataLoader. Actualmente se encuentran en protocols/jd2/parser. **Ten en cuenta que esto puede cambiar cuando RosettaScripts pase a jd3.** 

Cada DataLoader define el nombre de su bloque de nivel superior correspondiente (p. ej. CONSTRAINT_GENERATORS), interpreta todas las subetiquetas con la función parse_my_tag de la clase correspondiente y las guarda en el DataMap. **Nota:** Asegúrate de que 1) si otras clases guardan en el data map miembros de tu clase padre, usen el mismo nombre de categoría y 2) uses dentro del DataMap el mismo nombre de categoría que esperan las demás clases. Por ejemplo, si guardaras un selector de residuos en la categoría "residue_selectors", otras clases no podrían acceder a él, ya que esperarían encontrarlo en la categoría "ResidueSelector".

Movers
------

### Requisitos de un Mover

Para que una clase Mover (cualquier clase que derive de la clase base Mover) sea compatible con el esquema del intérprete, debe implementar algunos métodos adicionales:

- 
  ```cpp
void parse_my_tag (
        utility::tag::TagCOP,
        protocols::moves::DataMap &,
        protocols::filters::Filters_map const &,
        protocols::moves::Movers_map const &,
        core::pose::Pose const & );
  ```
  Este método se encarga de configurar el mover a partir de la etiqueta XML dada (es decir, el TagCOP).  Esto suele implicar usar `tag->getOption()` y `tag->getTags()` para obtener información de opciones y subetiquetas concretas.  Los tres mapas (data, filters, movers) proporcionan información sobre otras etiquetas que se han definido en el mismo script.  Esto permite que un mover llame a otro, o que varios movers compartan un Loop, o cosas por el estilo.  También se proporciona el Pose al que se aplicará el script de rosetta.

- 
  ```cpp
static void provide_xml_schema(
        utility::tag::XMLSchemaDefinition & xsd );
  ```
  Este es un método estático que se encarga de declarar qué opciones y subetiquetas entiende el mover.  Rosetta usa esta información para encontrar erratas y errores antes de iniciar el protocolo (lo cual es mucho preferible a encontrarlos después de que el protocolo lleve horas ejecutándose) y para imprimir mensajes de error informativos sobre ellos.  Puedes encontrar documentación sobre cómo implementar este método [aquí](https://wiki.rosettacommons.org/index.php/XMLSchemaFAQ).  Sin embargo, a junio de 2017 esa documentación es bastante incompleta, así que lo mejor es copiar código de un mover que haga algo parecido a lo que quieres y modificarlo según haga falta.

- 
  ```cpp
MoverOP fresh_instance( ) const;
  ```
  Este método se encarga de devolver una copia sin inicializar del mover.  Es bastante simple de implementar.  Si tu mover se llama `MyMover`, `fresh_instance()` debería verse así:
  ```cpp
return protocols::moves::MoverOP( new MyMover );
  ```
- 
  ```cpp
MoverOP clone( ) const;
  ```
  Este método se encarga de devolver un duplicado del mover.  Se diferencia de `fresh_instance()` en que la copia devuelta debe estar configurada exactamente de la misma manera que el original.  Además, esta copia debe ser una "copia profunda" (deep copy), lo que significa que cualquier cambio en el original no debe reflejarse en la copia.

  Este método suele ser muy difícil de implementar correctamente.  Hay que copiar cada atributo que afecte al comportamiento del mover (que normalmente son todos).  Para cualquier atributo que sea un puntero (normalmente la mayoría), hay que instanciar una nueva copia del objeto al que se apunta y copiar todos sus atributos (para hacer una copia profunda).  A veces el atributo en cuestión tendrá su propio método `clone()` que lo hará por ti, pero a veces tendrás que ser más creativo.

  El método `clone()` está estrechamente relacionado con el constructor de copia y el operador de asignación (`operator=`), así que es buena idea intentar reutilizar algo de código entre estos tres métodos.

Ten en cuenta que las firmas de las funciones `parse_my_tag()` y las demás deben coincidir exactamente con las de la clase base Mover (un error común es olvidar el `const` después de la lista de argumentos); de lo contrario, no se llamará al método derivado.

#### Documentar tu mover

Como RosettaScripts te permite combinar Movers de formas que no se han probado antes, hay algunas cosas que **NECESITAS** responder al documentar tu mover:

-   Descripción general de lo que hace el mover
-   Ejemplo: Esto pretende ser un ejemplo de cómo construir un Mover en RosettaScripts y de cómo describir todas las opciones que toma. Este esquema se decidió en el Post-RosettaCon11-Minicon.
-   Ejemplo de código XML:

  ```
<MyMover 
    name="&string" 
    bool_option=(1 &bool) 
    int_option=(50 &int) 
    string_option=(&string) 
    real_option=(2.2 &Real) 
    scorefxn=(default_scorefxn &string) 
    task_operations=(&string,&string,&string)
/>
  ```
-   Qué hacen las etiquetas:
  -   **bool\_option** describe cómo se crea una etiqueta booleana. El valor por defecto es verdadero.
  -   **int\_option** describe cómo se crea una etiqueta entera. Digamos que esta representa el \# de ciclos de un bucle que se ejecutan, por lo que el rango tendría que ser \> 0.
  -   **real\_option** describe cómo se crea una etiqueta de opción Real.
  -   **string\_option** es un ejemplo de cómo se crea una etiqueta de cadena.

-   ¿Qué opciones hay que proporcionar obligatoriamente?
    
    Por ejemplo, digamos que necesitamos pasar un valor a string\_option o el protocolo no se ejecutará; incluirías algo como esto:

    -   string\_option="/path/to/some/file" debe estar definida para evitar que el mover se cierre.

    Este requisito también debe reflejarse en `provide_xml_schema()`.

-   Tipo de entrada esperado:

    ¿Este mover espera cierto tipo de Pose (proteína/DNA, 2 cadenas, monómero)?

-   TaskOperations internas:
    
    ¿Hay TaskOperations por defecto (RestrictToInterface, por ejemplo) que use este mover? ¿Hay una forma de anularlas?

-   Cambios en el FoldTree o en las restricciones

    Describe si el mover modifica el FoldTree o las restricciones de entrada (o por defecto) y cómo lo hace

-   Si el mover puede cambiar la longitud del Pose, indícalo.

La documentación de tu mover debe colocarse en `scripting_documentation/RosettaScripts/Movers/movers_pages` y enlazarse desde la página principal de movers [[aquí|Movers-RosettaScripts]]. Consulta [[Cómo escribir documentación|How to write documentation]] para más detalles.

### Obtener datos de parámetros

La función `parse_my_tag()` puede obtener los parámetros especificados en el script XML mediante el objeto TagCOP proporcionado (que supondremos que se llama `tag`). Dos funciones son especialmente útiles:

-   `tag->hasOption( "name" );`

    Devuelve verdadero si el archivo XML contiene la opción "name=value".

-   `tag->getOption<type>( "name", default );`

    Devuelve el valor de la opción "name=value" e intenta convertirlo al tipo dado.  Si la opción no está presente, devuelve en su lugar el valor por defecto.  Para hacerlo más concreto, considera la siguiente etiqueta:
    
    ```xml
    <MyMover cycles=0/>
    ```

    Para esta etiqueta:

    - `tag->getOption<int>( "cycles" )` devuelve `0`
    - `tag->getOption<std::string>( "cycles" )` devuelve `"0"`
    - `tag->getOption<core::Real>( "temp", 1.0 )` devuelve `1.0`

#### Funciones de puntuación

Obtener la función de puntuación merece una mención especial. El nombre especificado para un parámetro de función de puntuación se puede obtener con:

-   `tag->getOption<std::string>( "scorefxn", "score12" );`

La referencia al propio objeto de función de puntuación se puede obtener entonces a través del DataMap:

-   `data.get< ScoreFunction * >( "scorefxns", scorefxn_name_string );`

Como alternativa, se puede usar la función de conveniencia `parse_score_function()` de `protocols/RosettaScripts/util.hh`.

#### Objetos Task

Si tu mover toma como entrada una tarea del packer (packer task), probablemente quieras respetar las directivas de la sección \<TASKOPERATIONS\> del archivo XML. (Consulta [[TaskOperations (RosettaScripts)|TaskOperations-RosettaScripts]].)

Para este fin se proporciona una función de conveniencia `parse_task_operations()` en `protocols/RosettaScripts/util.hh`. Interpreta adecuadamente el TagCOP y el DataMap, y devuelve un puntero propietario a un objeto TaskFactory construido adecuadamente.

### Registrar Movers en el intérprete

Por último, tienes que informar a la maquinaria de Rosetta Scripts de la existencia de tu Mover creando las clases correspondientes MoverCreator y MoverRegistrator.  Ambas tareas prácticamente solo requieren rellenar código repetitivo (boilerplate).

La clase MoverCreator define tres métodos:

-   `virtual moves::MoverOP create_mover() const;`

    Devuelve un puntero a una nueva instancia del Mover correspondiente.

-   `static std::string mover_name();`

    Devuelve la cadena única que identificará al mover en el archivo XML.

-   `virtual std::string keyname() const;`

    Llama a mover\_name() y devuelve su valor de retorno tal cual.

El MoverCreator normalmente tiene su propio archivo `*.hh`, pero comparte un archivo `*.cc` con su mover.  La forma más fácil de escribir este código es copiarlo de otro mover del mismo espacio de nombres que el tuyo y cambiar los nombres según corresponda.

Una vez que tengas un MoverCreator, tienes que incluirlo en `src/protocols/init/init.MoverCreators.ihh`.  Basta con copiar una de las líneas existentes y corregir el nombre.  Luego crea un MoverRegistrator a partir de tu MoverCreator en `src/protocols/init/init.MoverRegistrators.ihh`.  De nuevo, puedes copiar una de las líneas existentes y corregir los nombres.  Ten en cuenta que no deben aparecer en estos archivos `*.ihh` referencias al propio mover ni al archivo de encabezado del mover: solo debe referenciarse el MoverCreator ligero (y su archivo de encabezado mínimo correspondiente).

Filters
-------

Los requisitos son los mismos que para un Mover, con la excepción de que el objeto Pose pasado a apply() no es mutable. El método debe devolver verdadero cuando el Pose supere una prueba de filtrado y falso en caso contrario.

TaskOperations
--------------

Las [[TaskOperations|TaskOperations-RosettaScripts]] que se especifican en scripts de utility::Tag para que las usen los Movers requieren una implementación cuidadosa (pero relativamente simple) de funciones virtuales, una clase Creator y un registro en tiempo de carga en un archivo init.cc.

A partir de las revisiones de trunk r34048, r34052 y r34063, DockDesignParser ya no tiene su propia TaskOperationFactory. Ahora hay una fábrica singleton que vive en core::pack::task::operation::TaskOperationFactory. Además, los protocolos ya no necesitan registrar manualmente las TaskOperations en esta fábrica. En su lugar, las TaskOperations se registran en la fábrica en tiempo de "init" (core/init.cc, protocols/init.cc, devel/init.cc) mediante las clases Creator y Registrator. Los Creators son clases auxiliares que hacen que la TaskOperationFactory sepa cómo crear distintas variantes de TaskOperations. De esta forma la TaskOperationFactory puede guardar clases Creator muy ligeras y solo crea las TaskOperations reales concretas bajo demanda. Esto ahorra tiempo, memoria y entrada/salida. Consulta el directorio core/pack/task/operation/ y protocols/init.cc para ver ejemplos de cómo se implementan estas clases y cómo cooperan.

Las TaskOperations de "protocols" viven en src/protocols y deben registrarse en protocols/init.cc (no en core). Algunas clases muy generales pueden colocarse en core/pack/task/operation/, pero esto solo debe hacerse si se usan ampliamente y no introducen nuevas dependencias importantes en el espacio de nombres core::pack. Además, no registres ni incluyas directamente encabezados de clases derivadas en ninguna clase Factory.

Estos mismos principios se aplican a las clases ResFilter y ResLvlTaskOperation, que se implementan de la misma manera que las TaskOperations.

Las TaskOperations pueden implementar su propio método parse\_tag para interpretar opciones definidas por el usuario.

ESTA PÁGINA ESTÁ EN CONSTRUCCIÓN
--------------------------------

y sujeta a cambios importantes debido a la refactorización en curso

##Véase también

* [[A note on parsing residue selections in movers and filters]]: Notas sobre cómo hacer que tu mover/filtro sea compatible con los Poses de referencia
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[RosettaScripts]]: Página del wiki sobre RosettaScripts, la interfaz XML de Rosetta
* [[Rosetta tests]]: Enlaces a páginas sobre cómo ejecutar y escribir pruebas en Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Writing an app]]: Instrucciones para escribir ejecutables en C++
* [[Uso del ResourceManager|ResourceManager]]

#Referencia de la clase basic::Tracer

Idea general
============

A todos los mensajes de salida se les asigna un canal y un nivel de prioridad. El usuario puede especificar dinámicamente, en tiempo de ejecución, opciones de línea de comandos para silenciar o activar canales concretos o todos, y para cambiar el nivel de salida.

Ejemplo de uso:

```
#include <basic/Tracer.hh>
...
using basic::T;
using basic::Error;
using basic::Warning;
...
static basic::Tracer TR( "core.io.pdb.file_data" );
static basic::Tracer TR2( "core.io.pdb.file_data" , t_fatal);
...
void my_function()
{
    // using pre-created Tracer object
    TR << "my_function begin..." << std::endl;

    // using named priority levels:
    TR.Fatal << "Some Fatal Error here..." << std::endl;
    TR.Error << "Some Error here... " << std::endl;
    TR.Warning << "Warning message... " << std::endl;
    TR.Info << "Info message... " << std::endl;
    TR.Debug << "Debug message... " << std::endl;
    TR.Trace << "Trace message... " << std::endl;
    TR << "regular output with default priority" << std::endl;

    // changing default priority level of tracer object
    TR.priority(t_warning) << "Now default priority is t_warning." << std::endl;
    TR(t_fatal) << "Now default priority is t_fatal." << std::endl;

    // print debug messages without creating Tracer object, useful if you need to output to custom channel.
    T( "SomeChannelName" ) << "Just a message..." << std::endl;

    // Specifying priority:
    T( "ChannelA" , 100) << "Message with priority 100" << std::endl;
}
```

Es posible mostrar directamente algunos tipos de datos de la STL y de utility. Actualmente se admiten std::vector, [[utility::vector1|vector1]] y std::map. Aquí tienes un ejemplo de uso:

```
std::vector<int> A;
A.push_back(1); A.push_back(2); A.push_back(3); A.push_back(5);
utility::vector1<int> B;
B.push_back(10); B.push_back(20); B.push_back(30); B.push_back(45);
std::map<int, std::string> M;
M[1]= "one" ; M[2]= "two" ; M[3]= "1+2" ;
T( "Demo" ) << "vector:" << A << " vector1:" << B << " map:" << M << "\n" ;
```

Esto producirá la siguiente salida:

```
Demo: vector:[1, 2, 3, 5, ] vector1:[10, 20, 30, 45, ] map:{1:one, 2:two, 3:1+2, }
```

Control de la salida del Tracer desde la línea de comandos
==========================================================

activar todos los canales: es el comportamiento por defecto, igual que ejecutar solo './a.out'

`./a.out -unmute all`

silenciar todos los canales y activar ChannelA y ChannelB

`./a.out -mute all -unmute ChannelA ChannelB`

silenciar ChannelA y ChannelB

`./a.out -mute ChannelA ChannelB`

fijar la prioridad de los mensajes de salida entre 0 y 10

`./a.out -out:level 10`

desactivar la salida de los nombres de los canales
* fijar el nivel en 999 mostrará todos los tracers, ¡útil al depurar!

`./a.out -chname off`

Nota: los nombres de canal funcionan como nombres jerárquicos: si silencias 'core.scoring', se silenciarán en la práctica todos los canales que empiecen por core.scoring, es decir: core.scoring.count\_pair, core.scoring.dunbrack, ... etc. La misma lógica se aplica a la activación.

Nombres de los canales
======================

Nombra el canal del tracer según la ruta de tu archivo. Por ejemplo, el archivo core/io/pdb/file\_data.cc debe tener un canal de Tracer llamado 'core.io.pdb.file\_data'. De esta forma, los canales del Tracer reflejan los espacios de nombres del código más el nombre del archivo.

Si necesitas crear un tracer con nombres de canal personalizados, solo añade tu nombre personalizado después de un punto al final, por ejemplo:

```
static basic::Tracer TR( "core.io.pdb.file_data.some_fancy_name_here" );
```


##Véase también

* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores

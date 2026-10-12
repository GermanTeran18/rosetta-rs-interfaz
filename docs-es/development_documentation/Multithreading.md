#Multihilo

Esta página fue creada el 25 de julio de 2019 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org).

[[_TOC_]]

##Introducción

Históricamente, Rosetta ha funcionado con un paradigma que usa un solo núcleo de CPU.  Los sistemas con muchos núcleos por nodo podían ejecutar muchas instancias de Rosetta totalmente independientes para aumentar el muestreo, pero la velocidad a la que se generaba una muestra individual no podía aumentar con más núcleos.

Más recientemente se ha trabajado para que el núcleo de Rosetta sea completamente seguro para hilos (threadsafe) y para implementar infraestructura que facilite el desarrollo de protocolos multihilo.  En el momento de escribir esto (25 de julio de 2019), muy poco de Rosetta admite realmente el multihilo, pero esperamos que mucho más lo haga en un futuro próximo.

Este documento describe cómo compilar Rosetta con compatibilidad con multihilo, la infraestructura central para la seguridad de hilos y para la ejecución de código en hilos, y los módulos que actualmente aprovechan el multihilo.

##Compilar versiones multihilo de Rosetta

Para compilar Rosetta con compatibilidad con multihilo, añade la instrucción `extras=cxx11thread` a tu comando `scons`.  Por ejemplo, para compilar todos los binarios del directorio bin en modo release con compatibilidad con multihilo, usa lo siguiente:

```bash
./scons.py -j 8 mode=release bin extras=cxx11threads
```

##Infraestructura

###La clase RosettaThreadManager

El [[RosettaThreadManager]] es un singleton global que mantiene un conjunto de hilos que persisten durante toda la sesión de Rosetta y a los que se puede asignar trabajo.  Esto evita el costo de lanzar y destruir hilos repetidamente, y además garantiza que las solicitudes anidadas de hilos no provoquen una explosión en el número de hilos en ejecución.  Todo el código multihilo debe asignar el trabajo a los hilos pasándolo al RosettaThreadManager.  Para más información, consulta la [[página de documentación|RosettaThreadManager]] de esta clase.

Ten en cuenta que existían un puñado de clases multihilo anteriores a la implementación del RosettaThreadManager, y estas lanzan sus propios hilos.  Planeamos cambiarlas para que usen el RosettaThreadManager en un futuro próximo.

###Infraestructura segura para hilos

####El ScoringManager

**TODO**

####Código de la biblioteca de rotámeros

**TODO**

##Código actual que admite multihilo

###El Packer

El cálculo previo del grafo de interacciones se realiza actualmente en hilos, mediante el `RosettaThreadManager`.

###El MultiThreadedJobDistributor de JD3

La versión 3 de nuestro sistema de distribución de trabajos (JD3) incluye una clase de distribuidor de trabajos multihilo, llamada `MultiThreadedJobDistributor`.  Actualmente mantiene su propio conjunto de hilos, pero pronto se cambiará para que use el [[RosettaThreadManager]].

###El distribuidor de trabajos de la aplicación simple_cycpep_predict

La aplicación [[simple_cycpep_predict]], que se usa para predecir la estructura de macrociclos peptídicos, tiene un distribuidor de trabajos híbrido de MPI e hilos.  Por ahora lanza sus propios hilos, pero pronto se cambiará para que use el [[RosettaThreadManager]].

###StepWise

El protocolo [[StepWise|stepwise]] puede paralelizar su trabajo.  Actualmente mantiene su propio conjunto de hilos, pero se cambiará para que use el [[RosettaThreadManager]] en un futuro próximo.

##Código que admitirá multihilo en un futuro próximo

### El ScoreFunction

Se está trabajando para paralelizar `ScoreFunction::operator()`.  Esto también paralelizará la búsqueda lineal del minimizador.

### El Minimizer

El cálculo del gradiente es un objetivo futuro previsto para el multihilo.

##Problemas conocidos

###Score12

Al menos un término de energía de la función de puntuación `score12`, casi obsoleta, no es seguro para hilos.

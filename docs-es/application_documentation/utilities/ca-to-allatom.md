#Aplicación ca\_to\_allatom

Metadatos
========

Última edición el 31 de octubre de 2010 por Frank DiMaio. Código de Frank DiMaio (dimaio@u.washington.edu). Investigador principal: David Baker.

Código y demo
=============

El Mover de esta aplicación está en src/protocols/RBSegmentMoves/RBSegmentRelax.cc. En esta misma carpeta también hay submovers que pueden ser útiles. Este código también se usa como parte de un tutorial sobre cómo usar Rosetta para refinar estructuras en mapas de densidad. La demo completa está en demo/electron\_density/cryoEM\_tutoral. La parte del tutorial que usa esta aplicación está en 'scenario6\_model\_from\_ca\_trace'.

Referencias
==========

-   DiMaio F, Tyka MD, Baker ML, Chiu W, Baker D (2009). Refinement of protein structures into low-resolution density maps using rosetta. J. Mol. Biol. 392, 181-90.

Propósito
===========================================

Esta es una aplicación pensada para ayudar a construir un modelo de todos los átomos a partir de un trazado de baja resolución solo de C-alfa (como los modelos trazados a mano a partir de crio-microscopía electrónica). La entrada del protocolo incluye el trazado inicial de C-alfa y un archivo de segmentación de cuerpo rígido, que identifica los elementos de estructura secundaria del trazado inicial.

Algoritmo
=========

El protocolo se divide en 4 fases:

-   Inserción de fragmentos: se insertan fragmentos de longitud variable en cada elemento de estructura secundaria. Los fragmentos se seleccionan de forma dinámica según el RMS respecto al trazado, y la inserción garantiza que el fragmento tenga la misma orientación relativa que el trazado original.
-   Perturbación de cuerpo rígido: los elementos de estructura secundaria se perturban en una trayectoria de Monte Carlo. De forma opcional, los movimientos de desplazamiento de secuencia exploran threadings alternativos del modelo.
-   (opcional) Remodelado de loops
-   (opcional) Minimización de todas las torsiones

Las dos primeras fases pueden hacerse *tanto* en modo de todos los átomos como en modo centroid. El modelado de loops siempre se hace en modo centroid, mientras que la minimización de todas las torsiones siempre es de todos los átomos.

Limitaciones
===========

Este código supone que el modelo inicial de C-alfa contiene algunos errores. Si quieres un modelo razonable de la cadena principal con *exactamente* las coordenadas de C-alfa especificadas, puede ser más adecuada una herramienta geométrica como MaxSprout.

Archivos de entrada
===========

El PDB de entrada, aunque solo necesita coordenadas de los átomos C-alfa, debe tener líneas para todos los átomos de la cadena principal. Estas pueden tener coordenadas todas a 0, con una ocupación fijada en -1, o se puede usar una herramienta como MaxSprout para encontrar alguna conformación geométricamente razonable. Rosetta no usa en absoluto estas coordenadas, pero la maquinaria de lectura de PDB exige que estén presentes.

El **archivo de segmentos RB** (especificado con -RBSegmentRelax:rb\_file) es el siguiente:

```
SEGMENT   1   4   8  E
SEGMENT   2  13  16  E
SEGMENT   3  26  34  E
...
```

La primera columna es la palabra 'SEGMENT', la segunda es un identificador *único* para cada segmento, la tercera y la cuarta son un rango de residuos, y la quinta es 'E', 'H' o 'X' según el tipo de estructura secundaria (X significa compuesto, por ejemplo, si se modela como un solo elemento un motivo hebra-giro-hebra).

Se usa un **archivo vall** (especificado con -loops:vall) para generar fragmentos de la cadena principal de forma dinámica. Una versión del mismo se incluye en la base de datos de Rosetta.

Opciones
=======

Las opciones que se enumeran a continuación incluyen las específicas de la aplicación ca\_to\_allatom y una selección de opciones comunes que pueden ser útiles. Si se habilita un looprelax posterior a la ejecución, la aplicación acepta todas las opciones específicas de [[looprelax|loopmodel]] y de [[relax]]. Si se modela en la densidad, la aplicación acepta todas las opciones de [[ajuste a la densidad|density-map-scoring]].

**Opciones comunes:**

-   -in:file:fullatom
-   -in:file:centroid_input

Estas opciones controlan si se usan modelos de todos los átomos o centroid durante las dos primeras fases del protocolo (por defecto, de todos los átomos). La función de puntuación que se dé debe coincidir con esto.

-   -RBSegmentRelax:rb\_file

El archivo de segmentación de cuerpo rígido. Consulta las notas anteriores para más información.

-   -RBSegmentRelax:cst\_wt
-   -RBSegmentRelax:cst\_width

El peso y el ancho de las restricciones durante las dos primeras fases del protocolo. Unas restricciones más anchas y débiles producirán estructuras más alejadas del trazado inicial de CA.

-   -RBSegmentRelax:nrbmoves

El número de movimientos de la fase 1 y la fase 2 del protocolo.

-   -RBSegmentRelax:rb\_scorefxn

La función de puntuación usada durante las 2 primeras fases del protocolo. Si el Pose de entrada es de todos los átomos, asegúrate de que sea una función de todos los átomos (como score13\_env\_hb); si es centroid, asegúrate de que sea una función centroid (como score5).

-   -RBSegmentRelax:skip\_fragment\_moves
-   -RBSegmentRelax:skip\_seqshift\_moves
-   -RBSegmentRelax:skip\_rb\_moves

Estas opciones indican al protocolo que omita uno de los tres tipos de movimiento. Ten en cuenta que, si se omiten los movimientos de fragmentos, solo se hace 1 inserción de fragmento por cada elemento de estructura secundaria (para construir el Pose inicial de todos los átomos a partir de un trazado de C-alfa).

-   -RBSegmentRelax:helical\_movement\_params
-   -RBSegmentRelax:strand\_movement\_params
-   -RBSegmentRelax:default\_movement\_params

Los parámetros de movimiento, especificados como pares ángulo-distancia. Los movimientos de hélice y de hebra tienen dos pares de estos parámetros, que corresponden a movimientos sobre el eje y fuera del eje, mientras que el caso predeterminado solo tiene un par. Por ejemplo, '-strand\_movement\_params 40.0 1.0 1.0 0.2' perturbará las hebras 40 grados/1A a lo largo del eje de la hebra, y 1 grado/0.2A fuera del eje de la hebra. Estos parámetros valen 0 por defecto, así que el usuario debe especificarlos.

-   -no\_lr

¿Debemos omitir looprelax?

**Opciones de uso poco frecuente:**

-   -fix\_ligands

Si se especifica, ningún ligando del trazado inicial se moverá de su posición inicial

-   -frag\_randomness

Al elegir fragmentos de forma dinámica en la fase 1, este parámetro determina cuánta aleatorización interviene en la búsqueda. En general, valores más altos darán estructuras más alejadas del modelo inicial.

Consejos
====

-   El parámetro que más influye en los modelos finales es 'cst\_width'. Si los modelos parecen alejarse demasiado (o, al contrario, no lo bastante) del modelo inicial, este es el parámetro que conviene variar. Ten en cuenta que, a medida que este parámetro aumenta, hace falta más muestreo para cubrir adecuadamente el espacio conformacional.

-   Si el modelo inicial tiene muchas láminas beta, puede ser útil hacer el modelado centroid con los términos de enlace de hidrógeno de la cadena principal de todos los átomos. Prueba con un archivo de pesos centroid (con -RBSegmentRelax:rb\_scorefxn) como este:

    ```
    env         1.0
    pair        1.0
    cbeta       1.0
    vdw         1.0
    hbond_lr_bb 4.0
    hbond_sr_bb 1.0
    rama        0.2
    rg          2.0
    ```

Posprocesamiento
===============

El posprocesamiento depende en gran medida de la precisión del trazado inicial de C-alfa. Si los modelos de menor energía muestran buena convergencia (ya sea por inspección visual o por [[agrupamiento|cluster]] ), se necesita un posprocesamiento mínimo. Como alternativa, estos modelos pueden servir como punto de partida para modelado adicional con [[modelado de loops|loopmodel]].

## Véase también

* [[Utility applications | utilities-applications]]: otras aplicaciones de utilidad
* [[Old fragment picker | fragment-picking-old]]: el antiguo fragment picker.
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta

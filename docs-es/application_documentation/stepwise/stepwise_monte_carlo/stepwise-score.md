# Términos de energía especiales desarrollados para `stepwise`

### `other_pose`
A mitad de la construcción de modelos `stepwise` completos puede haber varios Poses distintos que modelan diferentes partes de la macromolécula global. Este término de energía (consulta `src/core/scoring/methods/OtherPoseEnergy`) se activa en el Pose primario y puntúa los Poses guardados en `other_pose_list`. Las sumas se acumulan en la puntuación total del Pose primario.

### `loop_close`
Costo (en k<sub>B</sub>T) de cerrar loops de residuos no instanciados dentro del Pose, o ciclos de tales loops entre el Pose y otros Poses. Se supone un modelo sencillo de cadena gaussiana, con longitudes de persistencia para RNA/proteína basadas en estimaciones razonables.  El código del modelo está en `LoopClosureEnergy.cc` y `LoopGraph.cc` en `src/core/scoring/loop_graph/`.

Este término tiene un desplazamiento global que corresponde al costo de confinar un extremo del loop dentro de la precisión de Rosetta... el valor se fijó a partir de valores empíricos de energías de modelado de loops de RNA, pero puede estar muy desviado. Debería ser posible calcularlo con más rigor mediante cálculos especializados de Monte Carlo.

Hay más información en `src/core/scoring/GaussianChainFunc.cc`, incluida la siguiente explicación disparatada:

```
//////////////////////////////////////////////////////////////////////////
// ---------------------------------
// Closure energies for loop cycles.
// ---------------------------------
//
//          D1
//       ------~
//      ~       | D4
//     ~        |
//    ~         ~
//    |        ~
// D2 |       /
//    |      /  D3
//     ~~~~~/
//
//  D1, D2, D3, D4 mark rigid joints, with lengths D1, ... D4.
//  Squiggles (~~~) mark gaussian chains,
//   with total variance of gaussian_variance.
//
//  In simplest case (one joint D, gaussian variance sigma^2 ):
//
//  P( closure ) = (capture volume) x ( 1 / 2 pi sigma^2 )^(3/2)
//                                  x exp( - D / 2 sigma^2 )
//
//  [For folks used to thinking about mean end-to-end distance L,
//        sigma^2 = L^2 / 3 ].
//
//  Following includes explicit formulae for one, two, three, and four joints.
//  There is also a general formula which would be straightforward to implement,
//  which I have worked out (and is basically implemented in the four-joint
//  function GaussianChainQuadrupleFunc.cc)
//
// See core/scoring/loop_graph/LoopGraph.cc for use case.
//
// More notes at:
//   https://docs.google.com/a/stanford.edu/file/d/0B6gpwdY_Bgd0OHdzVWJGTHBvTzg/edit
//
// Rhiju, Sep. 2013
//
//////////////////////////////////////////////////////////////////////////
```

*Avanzado:* La función de energía anterior puede manejar loops que empiezan y terminan dentro de un Pose dado (un loop 'normal'), así como loops que conectan Poses separados del modelo en un 'ciclo'. Sin embargo, falla cuando ve ciclos anidados unos dentro de otros, como puede ocurrir en lo siguiente:

```
   D1
  --------
  ~    ~  ~
 A~  B ~   ~ C
  ~    ~  ~
  --------
   D2
```
Aquí D1-A-D2-B-D1 y D1-A-D2-C-D1 podrían estar anidados (en realidad el código tiene en cuenta la dirección de los loops). Eso significa que la penalización del primer ciclo (A,B) depende de la influencia de C, lo que lleva a una integral complicada.  En `stepwise` se evitan esos tipos de colecciones de Poses comprobando si hay "grafos de loops complejos" en StepWiseMoveSelector.cc. Si el usuario especifica `-allow_complex_loop_graph`, `loop_close` se calculará como una simple suma de las penalizaciones de cierre de loop de todos los ciclos; esto suele ser una subestimación. En principio, debería ser posible aproximar la integral encontrando la configuración óptima del loop dada la geometría de los puntos de conexión (requiere una solución numérica, pero de un problema de optimización convexa) y calculando un log-determinante, pero eso todavía no está implementado.


### `intermol`
La penalización entrópica (en k<sub>B</sub>T) por cada conexión intermolecular que se instancia. Se calcula como:
( 2.30 - log( concentration / 1 M).

Aquí el número 2.30 representa el logaritmo de la concentración efectiva (relativa a 1 M) de una cadena respecto de otra cuando se forma una interacción. Se calibró por separado a partir de ajustes a las reglas del vecino más cercano para la formación de hélices de RNA; probablemente se actualizará más adelante. La concentración de referencia supuesta se puede cambiar desde el valor 'estándar' de 1 M con la opción `-score::conc <Real>`; se da en unidades molares.


### `free_side_chain`, `free_suite`, `free_2HOprime`
Bonificaciones por virtualizar las cadenas laterales de proteínas, el fosfato 5' del RNA y el hidroxilo 2' del RNA, respectivamente. También se incluyen bonificaciones por virtualizar el azúcar en `free_suite`. Tras una calibración adicional, todos estos podrían combinarse en `free_dof` por simplicidad.

---
Vuelve a la [[visión general de StepWise|stepwise-classes-overview]].

##Véase también

* [[Stepwise options]]: Clases de opciones del código de Stepwise
* [[Stepwise]]: La aplicación StepWise MonteCarlo
* [[Score types]]: Funciones de puntuación y términos de energía en Rosetta
* [[Scoring explained]]: Explicación de la puntuación en Rosetta
* Aplicaciones para el ensamblaje stepwise determinista:
  * [[Ensamblaje stepwise para loops de proteínas|swa-protein-main]]
    * [[Documentación adicional|swa-protein-long-loop]]
  * [[Modelado de loops de RNA con ensamblaje stepwise|swa-rna-loop]]
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta

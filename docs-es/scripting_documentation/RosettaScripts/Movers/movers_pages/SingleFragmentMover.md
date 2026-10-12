# SingleFragmentMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SingleFragmentMover

Realiza un único movimiento de inserción de fragmento en el Pose. Respeta las restricciones impuestas por el *MoveMap* proporcionado por el usuario y por la cinemática subyacente del Pose (es decir, el *FoldTree*). Por defecto, todas las torsiones de la cadena principal son móviles. El parámetro *MoveMap* se usa para especificar los residuos que deben permanecer fijos durante la simulación. Las posiciones de inserción se eligen de forma sesgada para que la probabilidad de aceptación sea aproximadamente equivalente en cada posición de inserción permitida. Tradicionalmente esto se ha llamado «sesgo de extremos» (end-biasing). Una vez elegida una posición de inserción, un objeto *Policy* se encarga de elegir entre los posibles fragmentos contenidos en el archivo de fragmentos. Actualmente se admiten dos políticas: "uniform" y "smooth". La primera elige de forma uniforme entre el conjunto de posibilidades. La segunda elige el fragmento que, de aplicarse, causa una distorsión mínima en el Pose.

Para ser útil, *SingleFragmentMover* debe emparejarse con un mover basado en Monte Carlo. Si partes de la cadena extendida, "GenericMonteCarloMover" es una opción habitual. Al plegar desde un modelo inicial razonable, \*no\* se recomienda "GenericMonteCarloMover", ya que acepta unilateralmente el primer movimiento. Una versión simplificada del protocolo *ClassicAbinitio* se reproduce en demo/rosetta\_scripts/classic\_abinitio.xml.

La entrada \*no\* se limita a monómeros. Los oligómeros funcionan bien.

```

<SingleFragmentMover name=(&string) fragments=(&string) policy=(uniform &string)>
  <MoveMap>
    <Span begin=(&int) end=(&int) chi=(&int) bb=(&int)/>
  </MoveMap>
</SingleFragmentMover>
```


##Véase también

* [[Fragment file]]: formato del archivo de fragmentos
* [[I want to do x]]: guía para elegir un mover


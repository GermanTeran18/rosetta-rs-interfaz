# LoopRemodel
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## LoopRemodel

Perturba y/o refina un conjunto de loops definidos por el usuario. Es útil para muestrear una variedad de conformaciones de loops.

```xml
<LoopRemodel name="&string" auto_loops="(0 &bool)" loop_start_(pdb_num/res_num) loop_end_(pdb_num/res_num) hurry="(0 &bool)" cycles="(10 &Size)" protocol="(ccd &string)" perturb_score="(score4L &string)" refine_score="(score12 &string)" perturb="(0 &bool)" refine="(1 &bool)" design="(0 &bool)"/>
```

-   pdb\_num/res\_num: consulta la [[documentación principal de RosettaScripts|RosettaScripts#rosettascripts-conventions_specifying-residues]] para más información.
-   auto\_loops: ¿usar los loops definidos por un mover LoopFinder anterior? (anula loop\_start/end)
-   loop\_start\_pdb\_num: inicio del loop
-   loop\_end\_pdb\_num: fin del loop
-   hurry: 1 = muestreo y minimización rápidos. 0 = usar el remodelado de loops completo.
-   cycles: si hurry=1, número de ciclos de modelado que se realizan. Cada ciclo consta de 50 pasos de modelado cinemático de loops con aceptación Monte Carlo, seguidos de un reempaquetado de la zona circundante. Si hurry=0 y protocol=remodel, controla el número máximo de intentos de cierre con el protocolo remodel (¡pocos ciclos pueden dejar roturas de cadena!)
-   protocol: solo se activa si hurry=0. Elige "kinematic", "ccd" o "remodel". Por ahora ccd parece funcionar mejor.
-   perturb\_score: función de puntuación que se usa para la perturbación del loop
-   refine\_score: función de puntuación que se usa para el refinamiento del loop
-   perturb: ¿perturbar los loops para lograr mayor diversidad?
-   refine: ¿refinar los loops?
-   design: ¿realizar diseño durante el modelado del loop?

##Véase también

* [[RosettaScriptsLoopModeling]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
* [[Formato de archivo de fragmentos|fragment-file]]
* [[Documentación de Resource Manager|ResourceManager]]
* [[LoopBuilderMover]]
* [[LoopCreationMover]]
* [[LoopFinderMover]]
* [[LoopLengthChangeMover]]
* [[LoopModelerMover]]
* [[LoopMoverFromCommandLineMover]]
* [[LoopProtocolMover]]
* [[LoopRemodelMover]]

# LoopMoverFromCommandLine
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## LoopMoverFromCommandLine

Perturba y/o refina un conjunto de loops de un archivo de loops. También toma bibliotecas de fragmentos de la línea de comandos (-loops:frag\_sizes , -loops:frag\_files). Tiene protocolos cinemático, ccd y automático.

```xml
<LoopMoverFromCommandLine name="&string" loop_file="('loop.loops' &string)" protocol="(ccd &string)" perturb_score="(score4L &string)" refine_score="(score12 &string)" perturb="(0 &bool)" refine="(1 &bool)"/>
```

-   protocol: solo se activa si hurry=0. Elige "automatic", "kinematic" o "ccd". Si eliges automatic, este mover se convierte en un envoltorio de la versión 'moderna' de LoopRemodelMover, que tiene todas las opciones de loops definidas en su interior. Esta es la forma recomendada de activar este mover. Si lo haces, tendrás acceso a las siguientes opciones de tipo cadena de texto: relax (no,&string), refine (ccd es lo mejor), intermedrelax (no es el valor predeterminado y es lo mejor), remodel (quick\_ccd es lo mejor).
-   perturb\_score: función de puntuación que se usa para la perturbación de loops
-   refine\_score: función de puntuación que se usa para el refinamiento de loops
-   perturb: ¿perturbar loops para obtener mayor diversidad?
-   refine: ¿refinar loops?
-   loop\_file: archivo de loops que debe estar en el directorio de trabajo actual, con el formato de loops de minirosetta.

Para protocol="automatic" (basado en la [[aplicación Loop Modeling|loopmodel]] y en [[LoopRemodel|LoopRemodelMover]]):

```xml
<LoopMoverFromCommandLine name="&string" loop_file="('loop.loops' &string)" protocol="automatic" perturb_score="(score4L &string)" refine_score="(score12 &string)" perturb="(0 &bool)" refine="(no &string)" remodel="(quick_ccd &string)" relax="(no, &string)" intermedrelax="(no &string)"/>
```

-   refine: 'no', 'refine\_ccd', 'refine\_kic'. Esta opción controla la etapa de refinamiento con todos los átomos del modelado de loops.
-   remodel: 'no', 'perturb\_ccd', 'perturb\_kic', 'quick\_ccd', 'quick\_ccd\_moves', 'old\_loop\_relax'.
-   relax: 'no', 'fastrelax', 'shortrelax', 'full relax'. Controla si se realiza un relax de toda la estructura después del modelado de loops.
-   intermedrelax: actualmente no se usa; con el tiempo puede permitir un relax de toda la Pose entre el modelado centroide y el de todos los átomos.


##Véase también

* [[RosettaScriptsLoopModeling]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
* [[Formato de archivo de fragmentos|fragment-file]]
* [[Documentación del Resource Manager|ResourceManager]]
* [[LoopBuilderMover]]
* [[LoopCreationMover]]
* [[LoopFinderMover]]
* [[LoopLengthChangeMover]]
* [[LoopModelerMover]]
* [[LoopMoverFromCommandLineMover]]
* [[LoopProtocolMover]]
* [[LoopRemodelMover]]

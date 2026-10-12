# ScoreMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ScoreMover

Este [[Mover]] aplica la [[función de puntuación|score-types]] a tu [[Pose|RosettaEncyclopedia#pose]].  Es sencillo, ¡pero a veces es justo lo que necesitas!

[[include:mover_ScoreMover_type]]

##rmsd
Ten en cuenta que este Mover busca automáticamente un Pose nativo contra el que calcular el RMSD.  Si lo encuentra, calcula un montón de métricas al estilo CASP mediante setPoseExtraScore: 

* rms
* allatom_rms
* maxsub
* maxsub2.0
* gdtmm
* gdtmm1_1
* gdtmm2_2
* gdtmm3_3
* gdtmm4_3
* gdtmm7_4

##loops
Este mover busca ```-loops::loopscores```.  Luego ejecuta "loops::addScoresForLoopParts", que supongo que es una porción de las puntuaciones solo para los loops.

##exclude_res
Este mover busca ```-evaluation::score_exclude_res``` y después imprimirá el PoseExtraScore "select_score" de lo que quien escribe esto supone que son los residuos restantes.


##Véase también

* [[I want to do x]]: Guía para elegir un mover

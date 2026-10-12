# LoopAnalyzerMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## LoopAnalyzerMover

Este Mover calcula un buen número de métricas específicas de loops.  Se creó como herramienta de análisis para [[AnchoredDesign|anchored-design]], pero no es específico de ese protocolo.

```xml
<LoopAnalyzerMover name="&string" use_tracer="(&bool)" loops_file="(&string)" >
    <Loop start="(&int)" stop="(&int)" cut="(&int)" skip_rate="(0.0 &real)" rebuild="(no &bool)"/>
</LoopAnalyzerMover>
```

- loop: Puedes pasar los loops como subetiquetas.
- loops_file: Puedes pasar los loops como un archivo de loops.
- use_tracer: si es false, los resultados se guardan en PoseExtraScores / DataCache para escribirlos al final de la ejecución.  Si es true, los resultados se imprimen en un objeto [[Tracer|Glossary#tracer]].

##¿Qué hace?

Usas la salida de LoopAnalyzerMover para filtrar los cierres de loop deficientes (que la función de puntuación de Rosetta detecta de forma insuficiente).  Los problemas concretos son:

* omega es isoenergético entre trans y cis, así que es necesario comprobar manualmente si hay omegas cis
* El término chainbreak no asegura bien una buena geometría del enlace omega tras CCD a menos que su peso sea muy alto; si el peso es alto, causa problemas durante la minimización al estropear el resto del loop.
** La función de puntuación ignora estas geometrías, igual que la mayoría de las longitudes y ángulos de enlace (la función de puntuación asume que son ideales)
* La energía de Ramachandran rama estaba limitada a 20 unidades de energía (creo que esto está corregido en Talaris13+), de modo que, una vez que una torsión llegaba a un espacio absurdo, podía quedarse ahí porque la minimización tenía derivada cero y no podía corregirla.

Por eso LoopAnalyzerMover genera un conjunto de métricas orientadas a estos problemas.  

##Salida de ejemplo e interpretación

Esta es la salida de LoopAnalyzerMover al final de un PDB de salida. La segunda línea contiene los títulos largos de las columnas y la tercera, versiones cortas para facilitar la visualización. Cada fila representa un residuo. Al final se recogen los totales de todos los loops para algunos términos.

```
LoopAnalyzerMover: unweighted bonded terms and angles (in degrees)
position phi_angle psi_angle omega_angle peptide_bond_C-N_distance rama_score omega_score dunbrack_score peptide_bond_score chainbreak_score
 pos phi_ang psi_ang omega_ang pbnd_dst    rama  omega_sc dbrack pbnd_sc   cbreak
  17  -106.8   175.8     178.2    1.322   0.998    0.0342   7.01   -2.68   0.0182
  18  -82.33   64.67    -178.5    1.329   0.211    0.0217   3.11   -3.42   0.0203
  19  -83.63   149.4     177.2    1.329   -1.07    0.0795      0   -3.43    0.584
  20  -75.25   171.1    -178.7    1.329  -0.264    0.0161  0.348   -3.43   0.0151
  21  -58.53  -42.95     174.6    1.329   -0.58     0.294      0   -3.43      2.7
  22  -76.02   159.9    -179.8    1.326  -0.811  0.000404   0.97   -3.45   0.0424
  23  -72.63   130.1     179.4    1.325   -1.29   0.00372   0.24   -3.46   0.0281
  24  -94.91   116.5     179.8    1.323   -1.21   0.00028  0.721   -3.45   0.0694
  25  -65.42   150.7     179.4    1.335   -1.58     0.004      0   -3.32     1.38
  26  -64.68   147.9     179.1    1.323   -1.45    0.0079   1.61   -3.32    0.211
  27  -56.44  -66.68      -180    1.329    1.34  8.08e-30   7.87   -3.43 2.37e-05
  28  -124.4  -56.48     177.6    1.329    2.08    0.0568  0.608   -3.43   0.0533
  29  -124.1   28.78    -177.7    1.264   0.341    0.0542   2.39    2.65     2.07
  30   81.57  -134.3    -176.4    1.329      20     0.126   5.06    2.65    0.128
  31  -112.9   147.2     172.7    1.318  -0.744     0.538  0.534   -3.35     1.38
total_rama 15.9674
total_omega 1.23676
total_peptide_bond -38.3223
total_chainbreak 8.70689
total rama+omega+peptide bond+chainbreak -12.4113

LAM_total -12.4113
```

En este ejemplo concreto, la posición 29 es claramente problemática: la distancia del enlace peptídico es demasiado corta, como indican las columnas pbnd_dst, pbnd_sc y cbreak. También se ve que la posición 30 tiene una puntuación de Ramachandran pésima. Las buenas estructuras no tendrán ningún campo fuera del rango de las puntuaciones más bajas de este ejemplo.


##Véase también
* [[I want to do x]]: Guía para elegir un mover
* [[RosettaScriptsLoopModeling]]
* [[Algoritmos de modelado de loops|loopmodel-algorithms]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
* [[AnchoredDesign|anchored-design]]: El protocolo para el que se escribió

<!-- SEO

loop analyzer
loop analyzer
loop analyzer
-->

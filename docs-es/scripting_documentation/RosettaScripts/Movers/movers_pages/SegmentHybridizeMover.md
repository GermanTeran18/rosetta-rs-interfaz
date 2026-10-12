# SegmentHybridize
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SegmentHybridize

SegmentHybridize toma el principio del protocolo cartesian hybridize para cerrar loops. Alineará fragmentos con la sección rota hasta que los extremos estén lo bastante cerca (según lo definido con rms\_frags) para usar el [[minimizador cartesiano|Glossary#cartesian-minimization]] para el cierre. El principio es permitir que roturas pequeñas cierren un hueco grande, con la idea de cerrar las pequeñas mediante minimización. Puede usarse para el cierre de loops o para injertos (todavía muy experimental).

```xml
<SegmentHybridizer name="hyb" frag_big="3" rms_frags="0.5" nfrags="2000" frag_tries="2000" auto_mm="1" all_movable="0" extra_min="1" mc_cycles="1000" use_frags="1" use_seq="1">
               <Span begin="6B" end="15B" extend_outside="2" extend_inside="1"/>

</SegmentHybridizer> 
```

-   frag\_big: ¿qué tamaño de fragmento debe usarse para cerrar los huecos?
-   rms\_frags: a partir de qué tamaño de rotura se usa el minimizador cartesiano para cerrar el hueco
-   frag\_tries: ¿cuántos fragmentos deben probarse?
-   auto\_mm: ¿debe fijarse automáticamente el movemap (define lo que se permite minimizar)?
-   all\_movable: se minimizará todo lo de la última cadena (la diana sería la primera cadena)
-   extra\_min: ¿minimización adicional?
-   use\_frags: usa fragmentos o solo el minimizador
-   use\_seq: cómo se eligen los fragmentos: dependientes solo de la estructura secundaria o dependientes de la estructura secundaria y de la secuencia (si es 1)
-   span define el loop de interés; puede automatizarse o puede usarse todo, y entonces intentará arreglar todos los huecos posibles
-   extend\_outside: hasta dónde ir fuera del loop para permitir la hibridación de fragmentos para el cierre del loop (ojo: si te alejas demasiado, puede que no cierre el loop...)
-   ¿a qué residuo del interior del loop debe alinearse el fragmento?


##Véase también

* [[LoopModelerMover]]
* [[RosettaScriptsLoopModeling]]: guía para el modelado de loops en RosettaScripts
* [[Formato de archivo de loops|loops-file]]
* [[Minimization overview]]


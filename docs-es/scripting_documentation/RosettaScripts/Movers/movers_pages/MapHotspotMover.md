# MapHotspot
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MapHotspot

Mapea los residuos que podrían servir como región hotspot en una diana. Requiere mucha guía por parte del usuario. Cada residuo hotspot debe ser colocado de forma aproximada por el usuario (al menos como cadena principal) contra la diana. Cada residuo hotspot debe tener un ID de cadena distinto. El método itera sobre todas las identidades de residuo permitidas y todos los rotámeros permitidos para cada residuo. Prueba sus filtros y, del subconjunto que los supera, selecciona el residuo de menor energía según score12. Una vez identificado el primer residuo hotspot, itera sobre el siguiente, y así sucesivamente hasta colocar todos los residuos hotspot. La salida contiene un archivo por cada combinación de identidades de residuo.

[[include:../../xsd/mover_MapHotspot_type]]


```xml
<MapHotspot name="&string" clash_check="(0 &bool)" file_name_prefix="(map_hs &string)">
   <Jumps>
     <Jump jump="(&integer)" explosion="(0 &integer)" filter_name="(true_filter & string)" allowed_aas="('ADEFIKLMNQRSTVWY' &string)" scorefxn_minimize="(score12 &string)" mover_name="(null &string)"/>
     ....
   </Jumps>
</MapHotspot>
```

-   clash\_check: si el conjunto de rotámeros se preselecciona en el packer para detectar choques. Se recomienda mantenerlo siempre desactivado.
-   file\_name\_prefix: prefijo de los nombres de los archivos de salida.
-   explosion: cuántos ángulos chi se «explotan» (lo que da más rotámeros).
-   allowed\_aas: códigos de una letra de los residuos permitidos.
-   scorefxn\_minimize: qué función de puntuación se usa durante la minimización de rb/cadena lateral.
-   mover\_name: un mover (sin restricciones) que se ejecuta justo antes de la minimización del residuo hotspot.


##Véase también

* [[AddSidechainConstraintsToHotspotsMover]]
* [[BestHotspotCstMover]]
* [[DockWithHotspotMover]]
* [[HotspotDisjointedFoldTreeMover]]
* [[MapHotspotMover]]
* [[PlaceStubMover]]
* [[PlaceSimultaneouslyMover]]
* [[PlaceOnLoopMover]]
* [[PlacementMinimizationMover]]
* [[I want to do x]]: guía para elegir un mover

# Auction
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Auction

Este es un mover especial asociado a PlaceSimultaneously (véase más abajo). Realiza la "subasta" de los residuos del andamio (scaffold) a conjuntos de hotspots sin diseñar realmente el andamio. Si el emparejamiento no tiene éxito, Auction informará de un fallo.

```xml
<Auction name="( &string)" host_chain="(2 &integer)" max_cb_dist="(3.0 &Real)" cb_force="(0.5 &Real)">
   <StubSets>
     <Add stubfile="(&string)"/>
   </StubSets>
</Auction>
```

Ten en cuenta que el usuario no necesita configurar ninguna de las opciones, salvo name, si se avisa de ello a PlaceSimultaneously. Si PlaceSimultaneously tiene constancia de este mover Auction, PlaceSimultaneously establecerá todas estas opciones.


##Véase también

* [[PlaceSimultaneouslyMover]]
* [[RosettaScriptsPlacement]]
* [[I want to do x]]: guía para elegir un mover

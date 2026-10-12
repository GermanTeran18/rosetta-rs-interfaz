# StubScore
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## StubScore

Un filtro especial asociado a [[PlaceSimultaneouslyMover]]. Comprueba si, en la configuración actual, el andamio "siente" alguna de las restricciones de stub de hotspot. Es útil para descartar rápidamente configuraciones sin esperanza.

```xml
<StubScore name="(&string)" chain_to_design="(2 &integer)" cb_force="(0.5 &Real)">
  <StubSets>
     <Add stubfile="(&string)"/>
  </StubSets>
</StubScore>
```

Ten en cuenta que no hace falta fijar ninguna de las opciones de este filtro si se avisa de él a PlaceSimultaneously. En ese caso, PlaceSimultaneously fijará los datos internos de este filtro StubScore para que coincidan con los suyos.


## Véase también

* [[PlaceSimultaneouslyMover]]



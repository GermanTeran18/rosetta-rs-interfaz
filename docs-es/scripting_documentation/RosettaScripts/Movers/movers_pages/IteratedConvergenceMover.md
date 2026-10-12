# IteratedConvergence
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## IteratedConvergence

Aplica repetidamente un submover hasta que el filtro dado devuelva un valor dentro del delta dado durante el número de ciclos dado.

```xml
<IteratedConvergence name="(&string)" mover="(&string)" filter="(&string)" delta="(0.1 &real)" cycles="(1 &integer)" maxcycles="(1000 &integer)" />
```

-   mover - el mover que se aplica repetidamente
-   filter - el filtro que se usa para evaluar la convergencia (debería devolver un valor razonable desde report\_sm())
-   delta - qué tan cerca deben estar los valores del filtro para contar como convergidos
-   cycles - durante cuántas aplicaciones del mover el valor del filtro tiene que caer dentro de `      delta     ` del valor de referencia para contar como convergido. Si el filtro queda fuera del intervalo, el valor de referencia se restablece al nuevo valor del filtro.
-   maxcycles - sale igualmente si el filtro no converge en este número de aplicaciones del mover; está pensado sobre todo como comprobación de seguridad para evitar una recursión infinita.


##Véase también

* [[GenericSimulatedAnnealerMover]]
* [[GenericMonteCarloMover]]
* [[ContingentAcceptMover]]
* [[IfMover]]
* [[LoopOverMover]]
* [[RandomMover]]

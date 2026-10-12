# ExtendChainMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## ExtendChainMover

Este mover agrega fragmentos arbitrarios de estructura secundaria idealizada al principio o al final de las cadenas.

```
<ExtendChain name="&string" motif=(&string) chain=(&integer) segment=(&string) prepend=(&bool)/>
```

- motif: una cadena de texto que indica qué motivo se debe agregar al Pose. Por ejemplo, "10HA" agrega 10 residuos helicoidales. "1LG-1LB-10HA" debería ser válido, pero el autor no sabe qué hace.  
- chain: un entero que indica qué cadena del Pose se debe modificar. Ten en cuenta que es un número y no una letra; necesitarás conocer la numeración interna del Pose.
- prepend: por defecto, se agrega al extremo C-terminal de la cadena; si prepend es verdadero, probablemente se agrega al extremo N-terminal.
- segment: otra forma de especificar qué modificar, distinta del número de cadena; el autor no sabe cómo funciona.
- length: ¡NO es una opción válida! Debes usar motif en su lugar.

##Véase también

* [[I want to do x]]: guía para elegir un mover

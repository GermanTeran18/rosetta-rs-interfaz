# Subroutine
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Subroutine

Llamar a otro RosettaScript desde dentro de un RosettaScript.

```xml
<Subroutine name="(&string)" xml_fname="(&string)"/>
```

-   xml\_fname: el nombre del RosettaScript al que se llama.

Esta definición genera en la práctica un Mover que luego puede incorporarse a la sección PROTOCOLS de RosettaScripts. Esto permite simplificar y modularizar los RosettaScripts. Ten en cuenta que la sintaxis `<xi:include href=(string) />` permite una inclusión más general de fragmentos de XML de RosettaScripts en cualquier parte de un script, con sustitución completa de variables.

Se permiten recursiones, pero causarán estragos.

[[include:mover_Subroutine_type]]

##Véase también

* [[GenericMonteCarloMover]]
* [[RandomMover]]
* [[MonteCarloTestMover]]
* [[MonteCarloUtilMover]]
* [[MonteCarloRecoverMover]]
* [[GenericSimulatedAnnealerMover]]
* [[LoopOverMover]]
* [[MultiplePoseMover]]
* [[MultipleOutputWrapperMover]]
* [[I want to do x]]: guía para elegir un mover


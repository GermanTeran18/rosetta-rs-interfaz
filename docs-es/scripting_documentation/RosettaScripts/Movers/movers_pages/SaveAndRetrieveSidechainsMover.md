# SaveAndRetrieveSidechains
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SaveAndRetrieveSidechains

Se usa después de construir un Pose de alaninas (y de terminar los movimientos de diseño) para recuperar las cadenas laterales del Pose de entrada que build\_Ala\_pose cambió a Ala. O bien se usa dentro de mini para recuperar cadenas laterales tras cambiar los conjuntos de tipos de residuo. Por defecto, las cadenas laterales distintas de Ala no se cambiarán, **a menos que** allsc sea true. Ten en cuenta que llamar "SARS" a tu mover casi seguro trae mala suerte y se desaconseja encarecidamente.

[[include:mover_SaveAndRetrieveSidechains_type]]

-   task\_operations: consulta [RepackMinimize](#RepackMinimize)
-   two\_step: la primera llamada a SARS solo guarda las cadenas laterales y la segunda las recupera. Si es false, las cadenas laterales se guardan en el momento del parseo.
-   multi\_use: si SaveAndRetrieveSidechains se usa varias veces con two\_steps habilitado a lo largo del protocolo XML, multi\_use debe habilitarse. Si no, las cadenas laterales guardadas la primera vez que se llama a SaveAndRetrieveSidechains se recuperarán en todas las llamadas siguientes.

##Véase también

* [[BuildAlaPoseMover]]
* [[SavePoseMover]]
* [[I want to do x]]: guía para elegir un mover
# AlignChain
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AlignChain

Alinea una cadena de la Pose de trabajo con una cadena de una Pose en disco (superposición de CA). Todas las cadenas de la Pose móvil se rotan al nuevo sistema de coordenadas, pero la rotación se calcula sobre la cadena especificada. Si se especifica la cadena 0, se alinea la Pose completa.

```xml
<AlignChain name="(&string)" source_chain="(0&Int)" target_chain="(0&Int)" target_name="(&string)" align_to_com="(0 &bool)" />
```

- **source\_chain**: el número de cadena en la Pose de trabajo. 0 significa la Pose completa.
- **target\_chain**: el número de cadena en la Pose objetivo. 0 significa la Pose completa.
- **target\_name**: nombre del archivo de la Pose objetivo en el disco. La Pose se leerá una sola vez al inicio de la ejecución y se guardará en memoria para ahorrar operaciones de entrada/salida.

Las cadenas objetivo y de origen deben tener el mismo número de residuos.

- **align_to_com**: alinea la Pose con el centro de masa en lugar de con la 2.ª Pose u objetivo. La variable target_name igualmente debe declararse, así que basta con pasar target_name="dummy".

##Véase también

* [[I want to do x]]: guía para elegir un mover
* [[SuperimposeMover]]
* [[AddChainMover]]
* [[AddChainBreakMover]]
* [[BridgeChainsMover]]
* [[StartFromMover]]
* [[SwitchChainOrderMover]]

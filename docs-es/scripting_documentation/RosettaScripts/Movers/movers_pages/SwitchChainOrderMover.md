# SwitchChainOrder
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SwitchChainOrder

Reordena las cadenas del Pose, por ejemplo intercambiando la cadena B y la A. También puede usarse para recortar una cadena del PDB (basta indicar qué cadenas deben quedar tras eliminar la cadena no deseada).

```xml
<SwitchChainOrder name="(&string)" chain_order="(&string)"/>
```

chain_order: una cadena de números de cadena. Este es el orden de las cadenas en el nuevo Pose. Por ejemplo, "21" formará un Pose ordenado como B y luego A; "12" no cambiará nada. También puede usarse para reducir el número de cadenas. Por ejemplo, "1" solo tomará la primera cadena. Los PDBInfoLabels se conservan.

[[include:mover_SwitchChainOrder_type]]


-   chain\_order: una cadena de números de cadena. Este es el orden de las cadenas en el nuevo Pose. Por ejemplo, "21" formará un Pose ordenado como B y luego A; "12" no cambiará nada.


##Véase también

* [[I want to do x]]: guía para elegir un mover
* [[AddChainMover]]
* [[AddChainBreakMover]]
* [[AlignChainMover]]
* [[BridgeChainsMover]]
* [[StartFromMover]]


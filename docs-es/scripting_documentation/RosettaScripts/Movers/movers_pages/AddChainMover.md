# AddChain
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AddChain

Lee un archivo PDB del disco y lo concatena a la Pose existente.

```xml
<AddChain name="(&string)" file_name="(&string)" new_chain="(1&bool)" scorefxn="(score12 &string)" random_access="(0&bool)" swap_chain_number="(0 &Size)" spm_reference_name="(&string)" update_PDBInfo="(1 &bool)"/>
```

-   file\_name: el nombre del archivo PDB en el disco.
-   new\_chain: ¿la Pose debe concatenarse como una cadena nueva o simplemente al final de la Pose existente?
-   scorefxn: se usa para puntuar la Pose al final de la concatenación. Además, el código llama a detect\_disulfides.
-   random\_access: si es true, puedes escribir una lista de nombres de archivo en el campo file\_name. En el momento del análisis (parse) se elegirá al azar uno de esos nombres de archivo y se usará durante toda la trayectoria. Así te ahorras variantes de la línea de comandos.
-   swap\_chain\_number: si se especifica, AddChain eliminará la cadena con el número 'swap\_chain\_number' y añadirá la nueva cadena en su lugar.
-   spm\_reference\_name: el nombre de una Pose guardada con SavePoseMover. Úsalo en lugar de file_name.
-   swap_chain_number: hay cierta interacción entre swap_chain_number y new_chain; probablemente puedas usar solo uno de los dos. Intercambia la cadena con el número de cadena especificado.
-   update\_PDBInfo: cuando es true (valor predeterminado), restablece el PDBInfo de la Pose combinada, con el recuento de residuos empezando en 1 en la primera cadena y las cadenas empezando en A. La numeración PDB empieza en 1 en cada cadena. Cuando es false, combina la información de los dos PDBInfo de cada Pose "añadiendo el segundo al primero. Si ambas Poses tienen el mismo nombre de cadena, lo conservarán (con los problemas previsibles); tenlo en cuenta al poner esta opción en false. Esta opción es siempre true cuando se usa swap_chain_number.


##Véase también

* [[I want to do x]]: guía para elegir un mover
* [[AddChainBreakMover]]
* [[AlignChainMover]]
* [[BridgeChainsMover]]
* [[StartFromMover]]
* [[SwitchChainOrderMover]]

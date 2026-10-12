# BridgeChains
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## BridgeChains

Dada una Pose con un salto (jump), este mover usa un Monte Carlo de inserción de fragmentos para conectar los extremos especificados. El nuevo fragmento conectará el residuo C-terminal de jump1 con el residuo N-terminal de jump2, y tendrá la estructura secundaria y el espacio de Ramachandran dados por "motif". Este mover usa el código de VarLengthBuild. La Pose de entrada debe tener al menos dos cadenas (saltos) que conectar; de lo contrario, fallará. 

```xml
<BridgeChains name="(&string)" motif="('' &string)" chain1="(1 &int)" chain2="(2 &int)" overlap="(3 &int)" scorefxn="(&string)" />
```

-   motif: la estructura secundaria + abego que se usará para la región de la cadena principal que se va a reconstruir. Si no se especifica, se toma de la Pose de entrada. El formato de esta cadena es:

    ```
    <Length><SS><ABEGO>-<Length2><SS2><ABEGO2>-...-<LengthN><SSN><ABEGON>
    ```

    Por ejemplo, "1LX-5HA-1LB-1LA-1LB-6EB" construirá un loop de un residuo con cualquier abego, seguido de una hélice de 5 residuos, seguida de un loop de 3 residuos con ABEGO BAB, seguido de una hebra de 6 residuos.

-   chain1: indica la cadena que se ubicará en el extremo N-terminal del nuevo fragmento. La construcción comenzará en el residuo C-terminal del salto.
-   chain2: indica la cadena que se ubicará en el extremo C-terminal del nuevo fragmento.
-   overlap: indica el número de residuos que se reconstruyen antes y después del nuevo fragmento. Un valor de 3 indica que se reconstruirán los residuos a +/- 3 del segmento insertado. Esto permite una cadena peptídica continua y suave.
-   scorefxn: **Obligatorio** La función de puntuación que se usará en la inserción de fragmentos.

**Ejemplo**
 El siguiente ejemplo conecta el primer salto de la proteína con un loop de 3 residuos, una hélice de 10 residuos y un loop de 3 residuos, y reconstruye los residuos que están a +/- 4 posiciones del segmento insertado.

```xml
<SCOREFXNS>
    <ScoreFunction name="SFXN" weights="fldsgn_cen" />
</SCOREFXNS>
<MOVERS>
    <BridgeChains name="connect" chain1="1" chain2="2" motif="3LX-10HA-3LX" scorefxn="SFXN" overlap="4" />
</MOVERS>
<PROTOCOLS>
    <Add mover_name="connect" />
</PROTOCOLS>
```


##Véase también

* [[I want to do x]]: guía para elegir un mover
* [[LoopModelerMover]]
* [[FoldTree overview]]
* [[AddChainMover]]
* [[AddChainBreakMover]]
* [[AlignChainMover]]
* [[StartFromMover]]
* [[SwitchChainOrderMover]]

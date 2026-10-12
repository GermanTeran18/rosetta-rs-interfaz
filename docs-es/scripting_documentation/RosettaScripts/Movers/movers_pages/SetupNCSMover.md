# SetupNCS
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SetupNCS

Establece una simetría no cristalográfica (NCS) entre residuos. El mover fija restricciones diedras en la cadena principal y en las cadenas laterales para obligar a los residuos a mantener la misma conformación. También puede imponerse el tipo de aminoácido. Este mover no realiza ninguna minimización, por lo que normalmente va seguido de MinMover o RelaxMover.

```xml
  <SetupNCS name="(&string)" bb="(1 &bool)" chi="(1 &bool)" symmetric_sequence="(0 &bool)"/> 
       <NCSgroup source="38A-55A" target="2A-19A"/>
       <NCSgroup source="38A-55A" target="20A-37A"/>
       ...
       <NCSend source="55A" target="1A"/>
       <NCSend source="54A" target="108A"/>
       ...
  </SetupNCS>
```

-   bb: fija restricciones diedras para la cadena principal
-   chi: fija restricciones diedras para las cadenas laterales
-   symmetric\_sequence: fuerza la secuencia del origen (source) en el destino (target) (véase más abajo)
-   NCSgroup: define dos conjuntos de residuos para los que se generan las restricciones. Los grupos de origen y de destino deben contener el mismo número de residuos. Las restricciones se definen para minimizar la diferencia entre los ángulos diedros, en lugar de forzar la conformación del destino hacia la conformación del origen. No se pueden fijar ángulos diedros de la cadena principal para los residuos al principio o al final de una cadena.
-   source: residuos de referencia, expresados como un único residuo o un intervalo. Origen y destino necesitan el mismo número de residuos.
-   target: residuos de destino, expresados como un único residuo o un intervalo. Origen y destino necesitan el mismo número de residuos.
-   NCSend: fuerza la secuencia y la conformación del origen en el destino, pero no configura ninguna restricción. Esta etiqueta solo se aplica si symmetric\_sequence=1.


##Véase también

* [[Symmetry]]: uso de simetría en Rosetta
* [[SetupForSymmetryMover]]
* [[DetectSymmetryMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]
* [[SymDofMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]
* [[SymmetryAndRosettaScripts]]


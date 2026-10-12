# SetupForSymmetry
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
Última actualización de la página: 9 de abril de 2018.

[[include:mover_SetupForSymmetry_type]]

####La opción `set_global_symmetry_at_parsetime`
Por razones históricas, muchos protocolos requieren que la simetría se fije como opción global durante el análisis del script. Esto es potencialmente peligroso, porque la simetría se fija en todo el protocolo independientemente de cuándo se aplique el mover `SetupForSymmetry`.

Si tu protocolo produce resultados inesperados o mensajes de error relacionados con la simetría, prueba a fijar `set_global_symmetry_at_parsetime=0`, que desactiva la fijación de la opción global. Si has fijado `set_global_symmetry_at_parsetime=0` y Rosetta se queja de que estás tratando con un Pose asimétrico o de un error similar, prueba a fijar `set_global_symmetry_at_parsetime=1` para habilitar la fijación de la opción global.

Por compatibilidad con versiones anteriores, `set_global_symmetry_at_parsetime=1` es actualmente el valor por defecto.

Una buena práctica podría ser poner `set_global_symmetry_at_parsetime=0` y ver si tus protocolos se ejecutan como se espera sin errores. Si es así, estupendo. Si no, pon `set_global_symmetry_at_parsetime=1` y mira si eso lo arregla (en cuyo caso algo depende de la opción global).

####Ejemplo
Dado el archivo de definición de simetría 'C2.symm':
```xml
<SetupForSymmetry name="setup_symm" definition="C2.symm" preserve_datacache="0" />
```

##Véase también

* [[Symmetry]]: uso de simetría en Rosetta
* [[SymmetryAndRosettaScripts]]
* [[SetupNCSMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]
* [[DetectSymmetryMover]]
* [[SymDofMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]


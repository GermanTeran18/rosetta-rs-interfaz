# InterfaceScoreCalculator
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## InterfaceScoreCalculator

[[include:mover_InterfaceScoreCalculator_type]]

Los principales términos que calcula este mover son los términos de interfaz. El valor global de la interfaz es el término
`interface_delta_X`, donde `X` se sustituye por la cadena del ligando que se usa, según lo especificado con la opción `chains`. Otros términos de puntuación calculados son las puntuaciones por componente en los términos `if_X_scoreterm`, donde `X` es la letra de la cadena y `scoreterm` es cada término de puntuación activo en la función de puntuación asociada. Además, `ligand_is_touching_X` es una métrica aproximada de si el ligando está en contacto con la proteína.

Si se especifica el "native", ya sea en la etiqueta o con la opción `-in:file:native`, se calculan los siguientes términos adicionales: 

1.  ligand\_centroid\_travel. La distancia entre el ligando nativo y el ligando de nuestro modelo acoplado.
2.  ligand\_radius\_of\_gyration. Una conformación extendida tendría un radio de giro alto. Los ligandos tienden a unirse en conformaciones extendidas.
3.  ligand\_rms\_no\_super. RMSD entre el ligando nativo y el ligando acoplado.
4.  ligand\_rms\_with\_super. RMSD entre el ligando nativo y el ligando acoplado tras alinear ambos como cuerpo rígido en el espacio XYZ. Es útil para evaluar cuánta flexibilidad interna del ligando se muestreó.

Los cálculos de RMSD usan un RMSD "automórfico", que tiene en cuenta las simetrías internas y los átomos equivalentes del ligando (p. ej., giros de 180 grados de un anillo de fenilo).

Para los términos ligand_centroid_travel y ligand_rms_no_super se asume que el nativo ya se ha alineado con la proteína de entrada: las coordenadas del ligando se usan tal cual y no se realiza ningún alineamiento proteína/proteína antes del cálculo del desplazamiento y del RMSD.

Si se habilita la opción `native_ensemble_best`, se asume que la Pose de trabajo tiene un solo residuo en la cadena pertinente y que la Pose "nativa" tiene uno o más residuos en la cadena correspondiente. Los valores de desplazamiento y RMSD se calcularán por separado para cada uno de los residuos de la cadena correspondiente y se informará del valor más bajo. Esto puede ser útil si hay varios estados nativos que pueden considerarse todos "correctos". 

##Véase también

* [[ProteinInterfaceMSMover]]: mover para el diseño multiestado de interfaces de proteínas
* [[DnaInterfacePackerMover]]
* [[InterfaceAnalyzerMover]]
* [[InterfaceRecapitulationMover]]
* [[I want to do x]]: guía para elegir un mover
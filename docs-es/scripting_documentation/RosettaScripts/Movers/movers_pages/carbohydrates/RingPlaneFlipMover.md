##Metadatos

`Mover` creado por Labonte <JWLabonte@jhu.edu>.

##Descripción
Un `Mover` para voltear 180 grados el plano de un anillo de piranosa de un carbohidrato alrededor de su enlace anomérico.

A partir de un [[ResidueSelector]] dado y limitado por un [[MoveMap]], este `Mover` selecciona los residuos cíclicos aplicables y realiza un movimiento de cizalla de 180 grados en el que el enlace anomérico y el enlace de la cadena principal del lado opuesto del anillo se mueven en direcciones opuestas. Un residuo "aplicable" se limita a aldopiranosas con enlace 1,4 o cetopiranosas con enlace 2,5 en las que tanto el enlace anomérico como el enlace glicosídico son ecuatoriales.

Este `Mover` resulta útil en casos &mdash; por ejemplo, al trabajar con heparinas muy cargadas y sulfatadas &mdash; en los que Rosetta modela un oligosacárido o polisacárido de forma que el residuo está en una posición relativamente correcta, pero le faltan interacciones favorables que podría establecer en el otro lado del anillo del glicano. A veces un simple "volteo del anillo" podría corregirlo, pero la barrera de energía para rotar es demasiado alta; los pequeños movimientos de un [[ShearMover]] nunca darían la vuelta al anillo.

##Detalles de RosettaScripts
[[include:mover_RingPlaneFlipMover_type]]

##Véase también
 - [[ShearMover]]
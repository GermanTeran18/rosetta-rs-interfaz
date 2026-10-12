# PeptideStubMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PeptideStubMover

PeptideStubMover es un método práctico para modificar un Pose o construir un Pose nuevo desde cero. Se pueden añadir residuos al final, al principio o insertarlos en un Pose. Creado por Yifan Song hacia 2014; modificado en distintos momentos por Vikram K. Mulligan.

[[_TOC_]]

##Casos de uso

`PeptideStubMover` es útil en los siguientes escenarios:

-	Dada una estructura, se quiere conectar covalentemente nuevos residuos antes o después de un residuo concreto (residuo ancla) del Pose. El modo de conexión puede ser un enlace peptídico común u otros tipos de enlaces covalentes que acepte el residuo ancla.
-	Dada una estructura, se quiere insertar nuevos residuos después de un residuo concreto (residuo ancla).
-	Se quiere generar desde cero un péptido de longitud conocida con una secuencia de aminoácidos deseada.

PeptideStubMover suele usarse como punto de partida dentro de un problema mayor, en particular para incorporar modificaciones selectas a un Pose o para diseñar péptidos desde cero.

##Entradas y salidas

Según el uso concreto, `PeptideStubMover` puede recibir como entrada un Pose o un archivo ficticio (asegúrate de que el archivo ficticio no esté completamente en blanco). Generará como salida un Pose nuevo con los nuevos residuos añadidos en los lugares solicitados. La numeración de los residuos se modificará durante el proceso.

##Flujo de trabajo detallado

PeptideStubMover tiene la siguiente configuración general:

```xml
<PeptideStubMover name="&string" reset="(false &bool)">
        <Prepend resname="(&string)" anchor_rsd="residuenumber"  repeat="(1 &number")/>
	<Append resname="(&string)" repeat=(&number) jump="(false &bool)"  anchor_rsd=”residuenumber” connecting_atom=”atom type” />
	<Insert resname="(&string)" repeat="(1 &number)"/>
 </PeptideStubMover>
```

name: el nombre con el que quieres llamar al mover. 
Reset: si se descarta o no la información del Pose. Por defecto es false. Si reset es true, se borra toda la información sobre el Pose, además del propio Pose. 

PeptideStubMover tiene tres modos, que se describirán con más detalle más adelante: Append, Prepend e Insert. Durante el proceso debe indicarse al menos un modo.

###Opciones de Append

Append = añade un residuo DESPUÉS de un residuo ancla.

Resname: qué tipo de residuo quieres añadir. Se puede usar cualquier residuo definido en fa_standard. Debe definirlo el usuario.

Jump: por defecto es false. Si es true, el nuevo residuo se añade mediante un jump y no mediante un enlace covalente. Ten en cuenta que si no hay ningún residuo en el Pose (es decir, cuando construyes un Pose desde cero), el primer residuo siempre se añade con un jump. Ten en cuenta también que si se indica repeat junto con jump, solo el primer residuo se añade mediante un jump y los residuos siguientes se añaden mediante enlaces covalentes normales. Jump solo funciona en el modo append.

Anchor_rsd: puede definir qué residuo se usa como ancla para añadir el nuevo residuo. En términos de un nuevo enlace peptídico, será el residuo del extremo C-terminal. Si no se indica, por defecto se añade al residuo C-terminal del Pose.

Connecting_atom: qué átomo se usa para la conexión. Si no se indica, por defecto se usa el átomo LOWR_CONNECT especificado en el archivo ".params" del residuo ancla.

Repeat: por defecto es 1. Si se indica un valor mayor que uno, sigue añadiendo el mismo residuo al residuo ancla. Por ejemplo, la línea de comandos siguiente añadirá 3 D-Ser al extremo C-terminal del péptido con un enlace peptídico común.

```xml
<Append resname="DSER" repeat="3"/>
```

*  Si construyes un Pose desde cero, append es el único modo que funcionará para el primer residuo. Y por defecto el primer residuo del Pose siempre se añade como un jump (¡no hay nada con lo que enlazarlo!).

###Opciones de Prepend

Prepend = añade un residuo ANTES de un residuo ancla

Resname: qué tipo de residuo quieres añadir. Se puede usar cualquier residuo definido en fa_standard. Debe definirlo el usuario.

Anchor_rsd: puede definir qué residuo se usa como ancla para añadir el nuevo residuo. Si no se indica, por defecto se añade al residuo C-terminal del Pose.

Connecting_atom: qué átomo se usa para la conexión. Si no se indica, por defecto se usa el átomo UPPER_CONNECT especificado en el archivo ".params" del residuo ancla.

Repeat: por defecto es 1. Si se indica un valor mayor que uno, sigue añadiendo el mismo residuo al residuo ancla. Por ejemplo, la línea de comandos siguiente añadirá 2 L-Trp al extremo N-terminal del péptido con un enlace peptídico común.

```xml
<Prepend resname="TRP" repeat="2"/>
```

###Opciones de Insert

Insert = inserta un residuo después de un residuo ancla en un Pose.

Resname: qué tipo de residuo quieres añadir. Se puede usar cualquier residuo definido en fa_standard. Debe definirlo el usuario.

Anchor_rsd: puede definir qué residuo se usa como ancla para añadir el nuevo residuo. En términos de un nuevo enlace peptídico, será el residuo del extremo C-terminal. Si no se indica, por defecto se añade al residuo C-terminal del Pose.

Connecting_atom: qué átomo se usa para la conexión. Si no se indica, por defecto se usa el átomo LOWR_CONNECT especificado en el archivo ".params" del residuo ancla.

Repeat: por defecto es 1. Si se indica un valor mayor que uno, sigue añadiendo el mismo residuo al residuo ancla. Solo funciona con insert si no se ha fijado la posición.

Position: dónde queremos que quede el índice del nuevo residuo. Si no se indica, insert funciona de forma similar a append.

##Casos especiales
###N-acetilación y C-metilamidación

Los parches de N-acetilación y C-metilamidación pueden usarse como «marcadores de posición» al muestrear conformaciones de un aminoácido o de un péptido corto que se va a extender. En este caso, estos tipos variantes _no_ deben eliminarse antes de aplicar PeptideStubMover para extender el péptido. Si están presentes, los ángulos psi y omega de la cadena principal se conservan al sustituir la C-metilamidación por un aminoácido nuevo, y el omega (del residuo N-1) y los ángulos phi se conservan al sustituir la N-acetilación. Esta función se añadió el 7 de marzo de 2020.

##Documentación autogenerada
[[include:mover_PeptideStubMover_type]]

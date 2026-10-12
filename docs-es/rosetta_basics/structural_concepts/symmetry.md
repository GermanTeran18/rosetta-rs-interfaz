#Guía del usuario de simetría.

Metadatos
========

Este documento se editó por última vez el 8/9/2019. Los autores originales fueron Ingemar Andre y Frank DiMaio.

[[_TOC_]]

Introducción
============

Muchas proteínas se ensamblan en estructuras con simetría interna. El código de simetría de Rosetta3 se desarrolló para proporcionar un marco que imponga simetría en la conformación entre subunidades equivalentes del ensamblaje. Para mantener la simetría en una simulación de Rosetta, hay que acoplar simétricamente tres tipos distintos de grados de libertad: cadena principal, cadena lateral y cuerpo rígido. Una vez que un Pose es simétrico, Rosetta contiene toda la maquinaria para mantener la simetría en todos los tipos de operaciones que modifican la conformación. En este documento se describe la maquinaria básica responsable de la simetría. Un usuario típico no interactuará directamente con este código básico; en cambio, el control y la descripción de la simetría del sistema se hacen con definiciones de simetría de entrada.

Simetría en las proteínas
====================

Las proteínas pueden adoptar una variedad de simetrías distintas. La más común es la simetría cíclica, que implica una rotación de n pliegues alrededor de un eje de simetría (simetría Cn). La mayoría de las proteínas simétricas son homodímeros que tienen simetría C2. Otro grupo común son las simetrías diédricas, que combinan un eje de simetría de n pliegues con un eje de simetría binario perpendicular. Por ejemplo, la simetría D2 implica un dímero de dímeros. Se pueden encontrar simetrías aún más complicadas en el grupo cúbico. De particular interés son las simetrías icosaédricas que se encuentran en las cápsides de los virus. Los icosaedros tienen simetrías de 2, 3 y 5 pliegues. Más allá de las simetrías de grupo puntual, las proteínas pueden formar filamentos usando simetría helicoidal, que implica tanto simetría rotacional como simetría traslacional. Por último, las proteínas cristalizan con simetrías de grupo espacial, un tipo de simetría que no se encuentra en las proteínas biológicas.

Rosetta es capaz de describir todos estos tipos de simetrías. La única restricción es que todas las unidades repetidas del sistema deben tener un entorno químicamente idéntico. La unidad repetida más pequeña con esta propiedad es la unidad asimétrica del sistema. La unidad asimétrica suele ser idéntica a una subunidad.

Descripción general: cómo ejecutar un protocolo con simetría
=============================================

Suponiendo que el protocolo que usas se ha adaptado a la simetría (si no, consulta [Cómo adaptar tu protocolo para usar simetría](#how-to-adopt-your-protocol-to-use-symmetry), esta sección describe los pasos para usar simetría en Rosetta.

1. Genera un archivo de definición de simetría.
2. Si es necesario, modifica el archivo de definición de simetría. Esto suele implicar cambiar las líneas set\_dof.
3. Añade las opciones relacionadas con la simetría.
4. Asegúrate de usar el formato de silent files binario si generas silent files como salida.

Cómo generar definiciones de simetría <a name="generate" />
------------------------------------

Para ayudar a crear un archivo de definición de simetría a partir de un PDB simétrico (o casi simétrico), se ha incluido una aplicación – **make\_symmdef\_file.pl** – en src/apps/public/symmetry. Ejecutar esta aplicación sin argumentos da una descripción de su uso; consulta [[make_symmdef_file|make-symmdef-file]] para más detalles. Además, hay un tutorial [aquí](https://www.rosettacommons.org/demos/latest/tutorials/Symmetry/Symmetry).

Para ayudar a crear archivos de definición de simetría desde cero, normalmente para predicción de novo, se ha incluido – **make\_symmdef\_file\_denovo.py** – en src/apps/public/symmetry. Ejecutar esta aplicación sin argumentos da una descripción de su uso; consulta [[make_symmdef_file_denovo|make-symmdef-file-denovo]] para más detalles.

Cómo generar simetría cristalina _sin_ crear un archivo symmdef
----------------------------------------------------------------

Si quieres modelar una estructura en su red cristalina, no se necesita un archivo de definición de simetría.  En su lugar, se puede usar la opción **-symmetry_definition CRYST1**.  Si se usa esta opción, hay otras dos opciones relevantes:

**-interaction_shell ##** especifica la distancia (en Angstrom) a partir de la estructura de entrada hasta la que se generan los compañeros simétricos.

**-refinable_lattice** habilita el refinamiento de los parámetros de la red

Alternativamente, el mismo control se ofrece a través de RosettaScripts.  Para crear sistemas con simetrías de red 3D:

```
<MakeLatticeMover name=make_lattice contact_dist=24/>
```
Crea una red a partir del PDB de entrada y la línea CRYST1.  Incluye todas las subunidades dentro de 'contact_dist'.

También hay un mover pensado para manejar simetrías de red 2D:
```
<MakeLayerMover name=make_layer contact_dist=24/>
```
Crea una red 2D a partir del PDB de entrada y la línea CRYST1.  La línea CRYST1 debe corresponder a uno de los 17 grupos de capa.

Hay dos movers pensados para manipular estas simetrías de red (ambos funcionan con 2D y 3D):
```
<DockLatticeMover name=crystdock fullatom=1 trans_step=1 rot_step=2 ncycles=100 scorefxn=talaris2013 />
```
Docking dentro de una red cristalina.  Si fullatom=1 hace docking con todos los átomos con pasos de reempaquetado y minimización; si fullatom=0 debes proporcionar una función de energía centroid (p. ej. score4_smooth) y también añadirá movimientos de deslizamiento de la red.  _trans_step_ y _rot_step_ dan la magnitud de la perturbación; _ncycles_ es el número de pasos que se ejecutarán.

```
<UpdateCrystInfo name=updatecrystinfo/>
```
Convierte de nuevo a un Pose asimétrico con una línea CRYST1 válida


Opciones generales para usar simetría en los protocolos
-----------------------------------------------

**-symmetry:symmetry\_definition my\_symdef\_file**

Lee el archivo de definición de simetría my\_symdef\_file.  Si my\_symdef\_file es la etiqueta especial **CRYST1**, usa en su lugar la línea CRYST1 del archivo PDB de entrada para generar simetría de red.

**-symmetry:initialize\_rigid\_body\_dofs**

Para inicializar la colocación del cuerpo rígido según el archivo de definición de simetría.

**-symmetry:perturb\_rigid\_body\_dofs ANGSTROMS DEGREES**

Para aplicar una perturbación de cuerpo rígido a la conformación inicial de cuerpo rígido. ¿Los valores anulan los datos de SymDof?

Protocolos compatibles con la simetría
===========================

Esta sección da una lista de los protocolos que se han portado para usar simetría. Si el protocolo que te interesa usar está aquí, basta con que sigas las instrucciones de [Cómo ejecutar con simetría](#How-to-run-with-symmetry). Seguramente esta lista no siempre estará bien actualizada, por lo que puede que acabes teniendo que mirar el código. Añade aquí los nuevos protocolos a medida que los portes.

## General
* **MinMover**
* **PackRotamersMover**
* **FastRelax**
* **Puntuación**: es decir, ScoreFunction ahora es consciente de la simetría

## Aplicaciones
* **Aplicación de puntuación: src/apps/pilot/score.cc**
* **Docking simétrico: ver src/apps/pilot/andre/SymDock.cc**
* **Plegamiento y docking: ver src/protocols/topology\_broker/FoldandDockClaimer.cc**
* **Protocolos de relax: ver src/protocols/relax.cc**

Implementación de la simetría
==========================

La siguiente sección describe cómo se mantiene la simetría al perturbar los grados de libertad del sistema y al puntuar y minimizar una conformación.  La simetría se implementa como residuos REALES con residuos VIRTUALES adicionales como ayuda.  Esto significa que si incluyes simetría, estos se producirán como salida, se incluirán en las mediciones de distancia, etc. 

Simetría de cuerpo rígido
-------------------

Las relaciones de cuerpo rígido entre unidades asimétricas en un ensamblaje simétrico están determinadas por las operaciones de simetría del grupo de simetría. Por ejemplo, en un homodímero las subunidades están relacionadas por una rotación binaria alrededor de un eje de simetría. Conocer el eje de rotación y un centro de rotación basta para crear el sistema simétrico a partir de una sola subunidad. En esta descripción las dos subunidades se describen en el mismo sistema de coordenadas y la simetría se codifica en operaciones de simetría que se aplican a una sola subunidad para generar las demás copias. Este marco lleva a dificultades para describir simetrías complejas y para realizar minimización basada en la energía. En cambio, en Rosetta, cada subunidad tiene su propio sistema de coordenadas, y cada subunidad adopta exactamente las mismas coordenadas en su sistema de coordenadas respectivo. En lugar de que las coordenadas de las subunidades estén relacionadas por operaciones de simetría, los sistemas de coordenadas de las subunidades están relacionados por simetría. En el caso del homodímero hay dos sistemas de coordenadas que están relacionados por una rotación binaria y cada subunidad tiene las mismas coordenadas en su respectivo sistema de coordenadas. Ahora bien, si configuramos los sistemas de coordenadas de manera simétrica, entonces cualquier cambio conformacional que se aplique en un sistema de coordenadas mantendrá la simetría global si se aplica la misma operación en los otros sistemas de coordenadas. Así, si aplicamos un jump de cuerpo rígido a la primera subunidad del dímero y luego aplicamos el mismo jump a la segunda subunidad, el dímero sigue siendo simétrico tras esta operación.

Rosetta usa residuos virtuales (VRT) para codificar los sistemas de coordenadas de las subunidades. Los residuos VRT tienen una coordenada de origen, una X y una Y. Cada subunidad está conectada mediante un jump de cuerpo rígido a dichos virtuales. Para un dímero, la configuración más simple consiste en tener dos residuos VRT, donde las coordenadas de un residuo VRT están relacionadas con las del otro por una rotación binaria. Para simetrías más complejas es común tener capas adicionales de residuos virtuales que a veces están conectados mediante jumps a otros residuos virtuales, donde cada residuo virtual codifica un sistema de coordenadas. La configuración es, en general, una estructura de árbol de residuos virtuales y en la parte superior hay un residuo raíz que especifica la coordenada de todo el ensamblaje simétrico en el sistema de coordenadas cartesiano. Este sistema de coordenadas raíz te permite, por ejemplo, ajustar el ensamblaje a una densidad electrónica o a una membrana.

Algunos de los residuos VRT tienen un estatus especial: son maestros. Los maestros controlan a sus virtuales esclavos. Si se aplica un jump desde un maestro, el mismo jump se aplica a sus esclavos. Solo se pueden aplicar jumps desde maestros. Este trabajo lo hacen las funciones set\_jump de la clase SymmetricConformation, que replican los jumps de los maestros a los esclavos.

Las coordenadas de los residuos virtuales se especifican en un archivo de definición de simetría. El análisis de las definiciones de simetría lo hace la clase SymmData. La información de la clase SymmData se usa luego para insertar residuos VRT en la conformación simétrica cuando se construye un Pose simétrico. El objeto SymmData también se usa para inicializar la clase SymmetryInfo que se almacena en la clase SymmetricConformation. SymmetryInfo almacena toda la información sobre simetría que lleva consigo un Pose.

Simetría de la cadena principal
-----------------

Mantener la simetría de la cadena principal es trivial una vez que se han configurado los sistemas de coordenadas de las subunidades. Cuando se cambia un ángulo de torsión en la subunidad maestra, la misma torsión se fija en las subunidades esclavas. Esto lo hace la función set\_torsion de la clase SymmetricConformation.

Simetría de la cadena lateral
------------------

La simetría de la cadena lateral se mantiene de la misma manera que la de la cadena principal. Las conformaciones de las cadenas laterales normalmente se cambian mediante pack\_rotamers o rotamer\_trials. Hay versiones simétricas de estas funciones: symmetric\_pack\_rotamers y symmetric\_rotamer\_trials.

Puntuación simétrica
-----------------

En un sistema simétrico cada unidad asimétrica es químicamente idéntica y, por lo tanto, tiene la misma energía. Solo necesitamos evaluar la energía de una única unidad asimétrica y multiplicarla por el número de unidades asimétricas para hallar la energía del sistema completo. Este tipo de puntuación más inteligente genera un aumento de rendimiento muy grande, pero hace que la puntuación sea algo más complicada que en el sistema asimétrico. Para que la puntuación se calcule correctamente, tenemos que decirle a Rosetta cómo puntuar. Primero, Rosetta tiene que saber qué unidad asimétrica puntuar. Esto normalmente no importa y, por comodidad, solemos puntuar la primera unidad asimétrica del sistema. Pero a veces importa: si representamos el sistema simétrico con solo un subconjunto de las unidades del sistema completo, tenemos que pensar en los efectos de borde. Por ejemplo, en una fibra las subunidades de los extremos no están en el mismo entorno que las subunidades del centro de la fibra. Aquí deberíamos elegir puntuar una subunidad ubicada centralmente para representar la energía total. En segundo lugar, tenemos que indicar cómo interactúa la subunidad que se puntúa con las otras subunidades. En un trímero, con subunidades A, B y C, si A es la subunidad que se puntúa, A interactúa tanto con B como con C. Sin embargo, A interactúa con B y con C de manera idéntica, así que solo necesitamos calcular la interacción A:B y multiplicarla por 3 para obtener la interacción total subunidad-subunidad. La energía total de este sistema es E = 3\*A + 3\*A:B (3\*A + 3\*A:C sería lo mismo). Esta es la información que se le da a Rosetta mediante el archivo de definición de simetría.

Aunque solo necesites un número menor de subunidades para puntuar el complejo, puede que tengas que representar explícitamente un número mayor de unidades asimétricas para la minimización y el empaquetado. La regla es esta: la subunidad que se puntúa debe tener presentes a todos sus vecinos que interactúan. Este es el sistema más pequeño que se puede modelar explícitamente.

Minimización simétrica
----------------------

Todas las unidades asimétricas tienen el mismo entorno en el ensamblaje. Además, los movimientos de cuerpo rígido están acoplados. En un dímero, la derivada de la energía con la distancia a lo largo de una línea entre los centros de masa se puede calcular como la derivada de una sola subunidad con r por dos, porque las dos se mueven de la misma manera una hacia la otra. Esto es generalmente cierto para cualquier sistema simétrico que tenga las mismas coordenadas en sus sistemas de referencia. Cuando minimizamos la energía, permitimos que solo se optimicen los jumps maestros y las torsiones de las subunidades maestras, y la derivada del sistema total se puede calcular como esta derivada multiplicada por el número de unidades asimétricas del sistema. Esto representa una enorme aceleración. Otra aceleración proviene del hecho de que, en un sistema simétrico, solo tiene sentido cambiar algunos grados de libertad. Para un dímero asimétrico se necesitan seis grados de libertad para describir la orientación relativa de las dos subunidades. En el dímero simétrico solo hacen falta 4 grados de libertad para describir la relación relativa de cuerpo rígido: 3 grados de libertad de rotación para una sola subunidad y una distancia a lo largo de un vector entre los centros de masa de las subunidades. Al minimizar solo necesitamos optimizar los grados de libertad simétricos del sistema. Cuáles son esos grados de libertad depende de la simetría del sistema, y esta información hay que dársela a Rosetta mediante el archivo de definición de simetría.

Definiciones de simetría <a name="Symmetry-definition" />
====================

* Además de la explicación detallada siguiente, también hay un tutorial práctico que puede ayudar a entender las definiciones de simetría. Se encuentra en `demos/tutorials/Symmetry/Symmetry.md` o haz clic [[aquí|https://www.rosettacommons.org/demos/latest/tutorials/Symmetry/Symmetry]].

Todo lo que Rosetta necesita saber sobre la simetría del sistema está codificado en el archivo de definición de simetría. Le dice a Rosetta cómo puntuar una estructura, cómo mantener la simetría en las perturbaciones de cuerpo rígido, qué grados de libertad pueden moverse, cómo configurar inicialmente el sistema y cómo perturbarlo. Un archivo de definición de simetría especificado correctamente te permitirá preservar la simetría y el sistema de coordenadas absoluto de tu ensamblaje proteico de entrada. También puedes configurar la simetría para una predicción de novo cuando solo se conoce el grupo de simetría. Los archivos de definición de simetría suelen generarse con scripts y, en el caso típico, hace falta muy poco ajuste manual de estos archivos. Generar estos archivos a mano es muy complicado para simetrías complejas. A continuación se describen los campos de los archivos de definición de simetría:

```
symmetry_name my_pdb_P_1_21_1
```

una cadena que describe la simetría del sistema. Puede ser cualquier cosa.

```
E = 2*VRT_0_0_0_0_base + 1*(VRT_0_0_0_0_base:VRT_0_0_0_1_base) + 3*(VRT_0_0_0_0_base:VRT_0_n1_0_0_base) + 4*(VRT_0_0_0_0_base:VRT_1_0_0_0_base)
```

Línea E: así se le dice a Rosetta cómo puntuar la estructura. En este ejemplo, la subunidad conectada al residuo virtual VRT\_0\_0\_0\_0\_base es la subunidad que se puntúa y las energías internas de esta subunidad se multiplican por 2 para obtener la energía total. Se suman las energías intermoleculares de la subunidad conectada a VRT\_0\_0\_0\_0\_base con las subunidades conectadas a VRT\_0\_0\_0\_1\_base, VRT\_0\_n1\_0\_0\_base y VRT\_1\_0\_0\_0\_base con factores de 1, 3 y 4, respectivamente. Los factores deben ser **enteros**. 

```
anchor_residue 29
```

El jump de la subunidad está anclado en el residuo 29.

```
 virtual_coordinates_start
 xyz VRT_0_0_0_0 1.000,0.000,0.000 0.000,1.000,0.000 -1.363,24.921,7.618
 xyz VRT_0_0_0_0_base 1.000,0.000,0.000 0.000,1.000,0.000 -2.363,23.921,6.618
 xyz VRT_0_0_0_1 1.000,0.000,0.000 0.000,1.000,0.000 -12.385,24.921,43.670
 xyz VRT_0_0_0_1_base 1.000,0.000,0.000 0.000,1.000,0.000 -13.385,23.921,42.670
 xyz VRT_0_0_0_n1 1.000,0.000,0.000 0.000,1.000,0.000 9.660,24.921,-28.435
 xyz VRT_0_0_0_n1_base 1.000,0.000,0.000 0.000,1.000,0.000 8.660,23.921,-29.435
 xyz VRT_0_n1_0_0 1.000,0.000,0.000 0.000,1.000,0.000 -32.063,24.921,7.618
 xyz VRT_0_n1_0_0_base 1.000,0.000,0.000 0.000,1.000,0.000 -33.063,23.921,6.618
 xyz VRT_0_1_0_0 1.000,0.000,0.000 0.000,1.000,0.000 29.337,24.921,7.618
 xyz VRT_0_1_0_0_base 1.000,0.000,0.000 0.000,1.000,0.000 28.337,23.921,6.618
 xyz VRT_1_0_0_0 -1.000,0.000,0.000 0.000,1.000,0.000 1.363,42.471,-7.618
 xyz VRT_1_0_0_0_base -1.000,0.000,0.000 0.000,1.000,0.000 2.363,41.471,-6.618
 xyz VRT_1_0_n1_0 -1.000,0.000,0.000 0.000,1.000,0.000 1.363,7.371,-7.618
 xyz VRT_1_0_n1_0_base -1.000,0.000,0.000 0.000,1.000,0.000 2.363,6.371,-6.618
 xyz VRT_1_0_0_1 -1.000,0.000,0.000 0.000,1.000,0.000 -9.660,42.471,28.435
 xyz VRT_1_0_0_1_base -1.000,0.000,0.000 0.000,1.000,0.000 -8.660,41.471,29.435
 xyz VRT_1_0_n1_1 -1.000,0.000,0.000 0.000,1.000,0.000 -9.660,7.371,28.435
 xyz VRT_1_0_n1_1_base -1.000,0.000,0.000 0.000,1.000,0.000 -8.660,6.371,29.435
 virtual_coordinates_stop
```

Define las coordenadas de los residuos virtuales. Hay tres tripletes ( X, Y y ORIGIN ) que tienen cada uno tres coordenadas que describen vectores unitarios ( para X e Y ) y un centro ( ORIGIN ). Puedes usar un nombre único para estos virtuales.

```
 connect_virtual JUMP_0_0_0_0_to_subunit VRT_0_0_0_0_base SUBUNIT
 connect_virtual JUMP_0_0_0_1_to_subunit VRT_0_0_0_1_base SUBUNIT
 connect_virtual JUMP_0_0_0_n1_to_subunit VRT_0_0_0_n1_base SUBUNIT
 connect_virtual JUMP_0_n1_0_0_to_subunit VRT_0_n1_0_0_base SUBUNIT
 connect_virtual JUMP_0_1_0_0_to_subunit VRT_0_1_0_0_base SUBUNIT
 connect_virtual JUMP_1_0_0_0_to_subunit VRT_1_0_0_0_base SUBUNIT
 connect_virtual JUMP_1_0_n1_0_to_subunit VRT_1_0_n1_0_base SUBUNIT
 connect_virtual JUMP_1_0_0_1_to_subunit VRT_1_0_0_1_base SUBUNIT
 connect_virtual JUMP_1_0_n1_1_to_subunit VRT_1_0_n1_1_base SUBUNIT
 connect_virtual JUMP_0_0_0_0_to_com VRT_0_0_0_0 VRT_0_0_0_0_base
 connect_virtual JUMP_0_0_0_1_to_com VRT_0_0_0_1 VRT_0_0_0_1_base
 connect_virtual JUMP_0_0_0_n1_to_com VRT_0_0_0_n1 VRT_0_0_0_n1_base
 connect_virtual JUMP_0_n1_0_0_to_com VRT_0_n1_0_0 VRT_0_n1_0_0_base
```

Las instrucciones connect\_virtual codifican los jumps del sistema. Por ejemplo,

```
connect_virtual JUMP_0_0_0_0_to_com VRT_0_0_0_0 VRT_0_0_0_0_base
```

significa que los virtuales JUMP\_0\_0\_0\_0\_to\_com y VRT\_0\_0\_0\_0\_base deben conectarse mediante un jump. Llamamos a este jump JUMP\_0\_0\_0\_0\_to\_com. Para este nombre se puede elegir cualquier cadena. Si el segundo jump es SUBUNIT, significa que se especifica un jump de un virtual a una subunidad.

```
set_dof JUMP_0_0_0_0_to_com x z
set_dof JUMP_0_0_0_0_to_subunit angle_x angle_y angle_z
```

Las instrucciones set\_dof especifican qué grados de libertad se permiten para un jump concreto. Son x,y,z para las traslaciones y angle\_x, angle\_y, angle\_z para las rotaciones. set\_dof solo debe fijarse para el jump maestro. Si un jump no tiene asociada una instrucción set\_dof, por defecto el jump es inamovible. Ten en cuenta que los movers que perturban jumps deben ser sensibles a los datos SymDof de dof, que se almacenan en SymmetryInfo, para que se usen estas restricciones de dof. ¡Aún puedes fijar manualmente los dofs de los jumps que no deberían moverse para mantener la simetría si fijas los jumps manualmente!

También puedes codificar la colocación inicial de las subunidades modificando esta línea. Por ejemplo:

```
set_dof JUMP_0_0_0_0_to_com x(20) z(10:20)
```

significa que x debe fijarse en 20 angstrom y z debe elegirse al azar en el rango 10-20. Para los ángulos:

```
set_dof JUMP_0_0_0_0_to_subunit angle_x(360) angle_y(360) angle_z(360)
```

significa que la rotación debe ser completamente aleatoria. También puedes codificar los tamaños de las perturbaciones de cuerpo rígido:

```
set_dof JUMP_0_0_0_0_to_com x(20:5) z(10:20)
```

Aquí, las perturbaciones a lo largo de la dirección x deben ser gaussianas con tamaño 5. Para que Rosetta use esto, el protocolo que estés usando debe emplear objetos SymDof en sus movers. En la sección siguiente sobre cómo ejecutar con simetría se explica cómo lograrlo.

```
set_jump_group JUMPGROUP1 JUMP_0_0_0_0_to_subunit JUMP_0_0_0_1_to_subunit JUMP_0_0_0_n1_to_subunit JUMP_0_n1_0_0_to_subunit JUMP_0_1_0_0_to_subunit JUMP_1_0_0_0_to_subunit JUMP_1_0_n1_0_to_subunit JUMP_1_0_0_1_to_subunit JUMP_1_0_n1_1_to_subunit
```

Estas instrucciones le dicen a Rosetta qué jumps participan en relaciones maestro/esclavo. El primer jump del grupo de jumps es el maestro. El nombre del grupo de jumps se puede elegir libremente.

Si ejecutas un caso de novo en el que no tienes una estructura simétrica de entrada, puede que quieras generar una definición de simetría a mano. Hay un formato adicional que se puede usar para construir residuos virtuales mediante la especificación de operaciones de rotación y traslación. Por ejemplo:

```
 symmetry_name c3
 subunits 3
 recenter
 number_of_interfaces 1
 E = 3*VRT1 + 3*(VRT1:VRT2)
 anchor_residue 17
 virtual_transforms_start
 start -1,0,0 0,1,0 0,0,0
 rot Rz 3
 virtual_transforms_stop
 connect_virtual JUMP1 VRT1 VRT2
 connect_virtual JUMP2 VRT2 VRT3
 set_dof BASEJUMP x(50) angle_x angle_y angle_z
```

Ten en cuenta que no damos los nombres de los residuos VRT; se asignan automáticamente a VRT1, VRT2,...etc. Los grupos de jumps también se calculan automáticamente. Se añaden automáticamente jumps entre los virtuales.

```
recenter
```

Le dice a Rosetta que recentre la subunidad de entrada de modo que el CA del residuo ancla esté en el origen (0,0,0).

```
virtual_transforms_start
```

Los residuos virtuales se especificarán mediante operaciones de rotación y traslación en lugar de coordenadas fijadas en el código.

```
virtual_transforms_start consecutive
```

la palabra clave consecutive indica que, para cada virtual que se coloca, se aplicarán todas las transformaciones entre **virtual\_transforms\_start** y **virtual\_transforms\_stop**. Por defecto,

```
start -1,0,0 0,1,0 0,0,0
```

es la posición del primer residuo virtual del sistema (vectores unitarios de X, Y y coordenada de ORIGIN). La(s) primera(s) transformación(es) se aplicará(n) a este virtual para generar el segundo.

```
rot Rz 3
```

aplica una rotación de 3 pliegues alrededor del eje z absoluto. ( puedes usar Rx, Ry y Rz ). También puedes decir:

```
rot Rz_angle 120
```

lo que significa que se debe aplicar una rotación de 120 grados.

```
trans 4,5,2
```

codifica una operación de traslación; los tres números especifican un vector de traslación.

Simetrías con operaciones de espejo
--------------------------

Rosetta también admite simetrías con operaciones de espejo.  La simetría especular se especifica mediante un residuo «virtual inverso» que define un sistema de coordenadas local levógiro. Estos virtuales inversos se pueden usar para definir simetrías especulares de la siguiente manera:

```
symmetry_name Cs
E = 2*VRT0 + 1*(VRT0:VRT1)
anchor_residue 1
virtual_coordinates_start
xyz  VRT0  1.0,0.0,0.0  0.0,1.0,0.0  0.0,0.0,0.0
xyzM VRT1  1.0,0.0,0.0  0.0,1.0,0.0  0.0,0.0,0.0
virtual_coordinates_stop
connect_virtual JUMP0 VRT0 SUBUNIT
connect_virtual JUMP1 VRT1 SUBUNIT
connect_virtual JUMP01 VRT0 VRT1
set_dof JUMP0 x y z angle_x angle_y angle_z
set_jump_group JUMPGROUP2 JUMP0 JUMP1
```

Arriba, xyzM declara un residuo virtual inverso. Conectar este virtual inverso a una subunidad hace que la subunidad conectada quede invertida. El fragmento anterior declara un sistema simétrico _Cs_ con un plano de espejo en XY.

Las simetrías cristalinas con operaciones de espejo se manejan automáticamente con **-symmetry_definition CRYST1** (véase arriba).


Opciones de deslizamiento hasta el contacto
--------------------------

```
slide_type (RANDOM|SEQUENTIAL|ORDERED_SEQUENTIAL)
```

Controla cómo se hacen los movimientos multidimensionales de deslizamiento hasta el contacto. Por ejemplo, para la simetría dn hay dos direcciones de deslizamiento. Un deslizamiento se puede hacer seleccionando al azar una dirección de deslizamiento para cada paso de deslizamiento (RANDOM), decidiendo al azar en qué dirección deslizar primero pero recorriendo siempre ambas en secuencia (SEQUENTIAL), o definiendo tú mismo el orden (ORDERED\_SEQUENTIAL). RANDOM es el valor predeterminado.

```
slide_criteria_type (CEN_DOCK_SCORE|FA_REP_SCORE|CONTACTS)
```

Define cuál es el criterio para abandonar un deslizamiento. Puede ser CEN\_DOCK\_SCORE, FA\_REP\_SCORE o el número de contactos. CEN\_DOCK\_SCORE es el valor predeterminado.

```
slide_criteria_val (value|AUTOMATIC)
```

Fija el valor real en el que se abandona un movimiento de deslizamiento dado el tipo de criterio. Por defecto está fijado en AUTOMATIC, lo que significa que ROSETTA lo averigua por sí mismo. Solo es realmente útil para el tipo CONTACTS.

```
slide_order jump name
```

Si usas el tipo de deslizamiento ORDERED\_SEQUENTIAL, puedes dar el orden en que se visitan los jumps correspondientes a las traslaciones permitidas. Usa los nombres de jump definidos en el archivo de definición de simetría.

Cómo adaptar tu protocolo para usar simetría
==========================================

Hay unos pocos pasos necesarios para que tu protocolo funcione sin problemas con estructuras simétricas. El principio rector principal es que puede que haya que modificar cualquier operación que cambie la conformación de un Pose.

**Configuración de un Pose simétrico** Llama a SetupForSymmetryMover (src/protocols/moves/symmetry/SetupForSymmetryMover.cc) al principio del protocolo, antes de que ocurra cualquier cambio conformacional en el Pose. Esto toma un Pose de entrada monomérico y crea un oligómero simétrico basado en el archivo symmetry\_definition.

**Puntuación** Usa ScoreFunctionOP o ScoreFunctionCOP en lugar de ScoreFunction, porque la función de puntuación simétrica (SymmetricScoreFunction) deriva de ScoreFunction. Esto será automático si se usa ScoreFunctionFactory. ScoreFunctionFactory comprueba si se ha definido un archivo de definición de simetría como opción y, en ese caso, crea una SymmetricScoreFunction.

**Empaquetado y RotamerTrials** Si el Pose es simétrico, usa las versiones simétricas de PackRotamersMover y RotamerTrialsMover (src/protocols/moves/SymPackRotamerMover.cc y src/protocols/moves/SymRotamerTrialsMover)

**Minimización** Si el Pose es simétrico, usa las versiones simétricas de MinimizeMover (src/protocols/moves/SymMinimizeMover.cc)

**Manipulación del FoldTree** Si modificas el foldtree en el protocolo, asegúrate de que la estructura simétrica se actualice correctamente. La idea más simple es trabajar con un monómero y luego llamar a SetupForSymmetryMover para regenerar el oligómero simétrico.

**Grados de libertad** Solo se debe permitir que se muevan los grados de libertad de una unidad asimétrica. Esto será automático en la mayoría de los movers compatibles con la simetría, pero lo más seguro es configurar explícitamente solo los dofs de la subunidad maestra. En SymmetryInfo puedes averiguar cuáles son los residuos/jumps maestros.

**Perturbación del cuerpo rígido** Qué dofs pueden moverse y cuánto lo controlan las instrucciones set\_dof de la definición de simetría de entrada. Un objeto SymmDof se almacena en SymmetryInfo. Puedes obtener del objeto SymmDof qué jumps pueden moverse. Sin embargo, hay una serie de RigidBodyMovers sensibles a los datos de Symdof. Se encuentran en src/protocols/moves/RigidBodyMover.cc. Lo más seguro es usar esos o, si no resuelven tu problema, añadir otros del mismo estilo en la misma ubicación. Ten cuidado: nada te impide mover un jump que destruya la simetría, así que asegúrate de usar la información de SymmetryInfo y SymmDof cuando hagas un movimiento de jump que no sea interno a un monómero.

**Cálculo del rms** Tener muchas cadenas equivalentes lleva a problemas al calcular el rms de más de dos cadenas, porque el orden de las cadenas en la estructura de salida es arbitrario. Esto es sobre todo un problema para las predicciones de novo. En otros casos, probablemente el orden de las cadenas no cambia durante la simulación. Para obtener un rms correcto hay que probar todos los ordenamientos distintos de cadenas y calcular el rms de todos ellos. CA\_rmsd\_symmetric hace este truco por ti (src/core/scoring/rms\_util.cc). También hay un PoseEvaluator para ello. Ten cuidado: detrás de este comando acecha una explosión combinatoria, ¡así que no lo uses con un número muy grande de cadenas!

**Código útil**

En src/core/conformation/symmetry/util.cc hay varias funciones de conveniencia para trabajar con Poses simétricos. Una operación típica al trabajar con simetría es averiguar si es simétrico; la función core::conformation::symmetry::is\_symmetric( pose ) responderá a esta pregunta. Puedes hacer las mismas preguntas a un objeto Conformation, Scorefunction y Energies.

Otra operación común es obtener un puntero a una SymmetricConformation y a SymmetryInfo:

```
SymmetricConformation const & SymmConf ( dynamic_cast<SymmetricConformation const &>( pose.conformation()) );
SymmetryInfo const & symm_info( SymmConf.Symmetry_Info() );
```

SymmetryInfo contiene todo lo que necesitas saber sobre la simetría de la conformación: relaciones maestro/esclavo (chi\_clones, bb\_clones y jump\_clones, etc.), grados de libertad movibles (SymmDofs), etc.

##Véase también

* [Tutorial de simetría](https://www.rosettacommons.org/demos/latest/tutorials/Symmetry/Symmetry)
* [[Glossary]]: definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: descripción general de los conceptos principales de Rosetta
* [[Full options list]]: incluye opciones para usar simetría en Rosetta
* [[RosettaScripts]]: página principal de RosettaScripts
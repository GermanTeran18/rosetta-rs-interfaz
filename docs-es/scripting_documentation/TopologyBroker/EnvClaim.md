Los **EnvClaim**s son una forma (más o menos) legible por humanos de especificar la necesidad de acceder a ciertos recursos del Pose con broker, o de que existan. `EnvClaim` en sí está implementada como una clase abstracta, que es la clase padre de varias otras clases que realmente usan los [[ClientMovers]].  Por ejemplo, se podría asignar un TorsionClaim para reclamar todas las torsiones de la cadena principal de una cadena polipeptídica.

[[_TOC_]]

#JumpClaim

Como se muestra en el ejemplo, JumpClaim crea y reclama a la vez el acceso a un Jump entre dos regiones arbitrarias de la Conformation de consenso. La opción position1 toma una etiqueta (normalmente un residuo virtual) o un ResidueSelector y coloca allí un extremo del futuro salto. Si la selección o la etiqueta se refiere a más de un residuo, se elige el primero. La opción position2 funciona igual. Si la etiqueta indicada no existe, se creará un residuo virtual con ese nombre.

La opción control_strength establece el [ControlStrength](#ControlStrength) del RT del salto creado. La opción "cut" es igual que las opciones position1 y position2, salvo que establece la posición del corte que construye el salto. No tiene por qué estar entre position1 y position2 pero, si no se especifica, se elige dentro del rango entre position1 y position2. Las opciones "atom1" y "atom2" (que deben indicarse juntas) eligen los átomos hacia y desde los que (respectivamente) se creará el salto. El valor por defecto es "CA" si "physical_cut" se establece en true; si "physical_cut" es false, se coloca de modo que el stub quede dentro del residuo ("C" o "N", según la dirección de plegamiento). Además, la opción "physical_cut" determina si los residuos de corte superior e inferior se puntúan como roturas de cadena artificiales (false) o no (true). Al salto también hay que asignarle un nombre mediante la opción "jump_label". Por el momento, sin embargo, este nombre solo se usa como identificador único interno.

#TorsionClaim

TorsionClaim reclama el acceso a un tramo de ángulos de torsión. Por ejemplo,

```
<TorsionClaim backbone=1 sidechain=0 selector="ChainA" control_strength="CAN_CONTROL" />
```
 
reclama todos los residuos de la cadena principal en la región seleccionada por el ResidueSelector con el nombre "ChainA" con la intensidad "CAN_CONTROL". Las opciones booleanas "backbone" y "sidechain" determinan, respectivamente, si se reclaman los ángulos de la cadena principal y de la cadena lateral. La opción "control_strength" establece el [ControlStrength](#ControlStrength) con el que se reclaman estos residuos. 

#XYZClaim

XYZClaim reclama el acceso a todos los grados de libertad que construyen un conjunto concreto de residuos. Esto incluye todas las longitudes de enlace, ángulos y torsiones, así como cualquier grado de libertad aplicable de rotación y traslación de saltos. Por ejemplo,

```
<XYZClaim selection="known_loop1" control_strength="EXCLUSIVE" relative="false" />
```

Afirma el control EXCLUSIVE (véase ControlStrengths) sobre todos los grados de libertad que construyen los residuos de la ResidueSelection "known_loop1".

Una opción importante de esta claim es "relative". Esta opción determina si XYZClaim pretende reclamar la posición XYZ de la selección *relativa* a sí misma o de forma absoluta en el espacio. Esto suele determinar si se reclama o no el salto que construye la selección de XYZClaim (aunque con la misma facilidad podría ser un enlace peptídico).

#VirtResClaim

VirtResClaim crea un residuo virtual y un salto desde alguna posición base para construir ese residuo virtual. También se crea un corte para asegurar que el nuevo residuo virtual no esté unido a ninguna cadena.

La opción "vrt_name" establece el nombre del residuo virtual. Si otro ClientMover u otras claims van a usar este residuo virtual, este es el nombre con el que debe referirse a él. Ten en cuenta, sin embargo, que no se permiten dos VirtResClaims con el mismo nombre; se deben usar JumpClaims para saltar hacia y desde el residuo virtual cuando no hace falta crearlo. Esta es una decisión intencionada para que el sistema detecte errores de duplicación accidental de residuos virtuales. Un ejemplo que demuestra la importancia de esta característica es que los CoMTrackerCMs _realmente sí_ necesitan sus propios residuos virtuales; las demás Claims que usan ese residuo virtual son, en cierto sentido, solo invitadas.

Otras opciones son "parent", un ResidueSelector o etiqueta que indica dónde debe estar el otro extremo del salto que construye el residuo virtual, y "jump_control_strength", que establece la intensidad de control del salto construido.

#CutBiasClaim

CutBiasClaim ajusta la probabilidad de que se coloque un corte automático en los residuos seleccionados según el valor de la opción "bias" (obligatoria). También son obligatorias "range_start" y "range_end", que indican el inicio y el final de la región, dentro de la selección dada por la opción "label", que se modificará con ese sesgo. Por ejemplo,

````
<CutBiasClaim bias=0.0 region_start=1 region_end=3 label="ChainA" />
```

modificaría el sesgo de corte de los tres primeros residuos de la selección ChainA para que sea cero (es decir, se prohíben los cortes automáticos). 

# ControlStrength

Los ControlStrengths disponibles son: `DOES_NOT_CONTROL`, `CAN_CONTROL`, `MUST_CONTROL` y `EXCLUSIVE`. Sus nombres se explican más o menos por sí solos. `DOES_NOT_CONTROL` no controla (y por tanto no puede controlar) el grado de libertad de interés. A `EXCLUSIVE` siempre se le concede acceso, salvo que exista otra claim `EXCLUSIVE` para el mismo grado de libertad, en cuyo caso se lanza una excepción. A `CAN_CONTROL` se le concede acceso si y solo si no hay claims `EXCLUSIVE`. Si no se puede conceder ese acceso, sin embargo, no pasa nada. `MUST_CONTROL` es como `CAN_CONTROL`, pero se lanza una excepción si una claim `EXCLUSIVE` impide que se conceda a esta Claim el acceso a lo reclamado. En casi todos los casos, `CAN_CONTROL` es la opción más adecuada.


##Véase también

* [[Página principal del TopologyBroker|BrokeredEnvironment]]
* [[ClientMovers]]: movers admitidos por el TopologyBroker
* [[Scripting Documentation]]: interfaces de scripting de Rosetta
* [[RosettaScripts]]: página principal de RosettaScripts
* [[Writing an app]]: tutorial para escribir una aplicación en C++
* [[Development Documentation]]: página principal de la documentación para desarrolladores
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Commands collection]]: una lista de ejemplos de líneas de comandos para ejecutar los archivos ejecutables de Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.

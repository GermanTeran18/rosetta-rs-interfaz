#SetupMetalsMover

##SetupMetalsMover

Documentación y mover de Sharon Guffy (guffy@email.unc.edu). La funcionalidad original de `-auto_setup_metals` y la nota sobre puntuación fueron añadidas por Vikram K. Mulligan (vmullig@uw.edu).

[[_TOC_]]

### Descripción
Este mover replica en forma de mover la función de la opción de línea de comandos `-in:auto_setup_metals`. «Configurar» un ion metálico implica añadir enlaces covalentes entre el ion y todos los átomos unidos (detectados como átomos de unión a metales dentro de una distancia determinada por los radios de Lennard Jones de los dos átomos) y añadir restricciones de distancia, ángulo y coordenadas entre el ion metálico y los átomos que lo coordinan. En el proceso, también se añaden nuevos tipos variantes al ion metálico y a todos los residuos coordinantes. Por defecto se configuran todos los iones metálicos; el usuario puede especificar un selector de residuos (como subetiqueta o como selector definido previamente) que restrinja la configuración solo a los iones metálicos contenidos en la selección.

### Nota sobre la puntuación
SetupMetalsMover tiene dos efectos sobre la puntuación. Primero, al crear enlaces entre un metal y los residuos que lo coordinan, el mover le dice a la función de puntuación que no calcule interacciones repulsivas ni de largo alcance entre el metal y los átomos que lo coordinan. Sin esto, Rosetta puntúa una estructura que contiene un metal como si hubiera un choque entre el metal y los átomos que lo coordinan. Segundo, al añadir restricciones entre el metal y los átomos coordinantes, Rosetta penalizará durante la puntuación las desviaciones respecto a la geometría de coordinación del metal de entrada y «tirará» de la geometría hacia la geometría de coordinación de entrada durante el relax (minimización). Sin esto, es probable que el centro metálico se distorsione durante la minimización u otra manipulación estructural. Ten en cuenta que el segundo efecto requiere que el término de puntuación `metalbinding_constraint` esté activo en la función de puntuación que se usa para puntuar o minimizar la energía. Si es necesario, esto se puede conseguir añadiéndolo al archivo de pesos o con el comando `Reweight` en RosettaScripts (consulta la sección `ScoreFunctions` de [[esta página|RosettaScripts]] para más detalles).

### Nota sobre la compatibilidad con el modo centroide

Los enlaces covalentes y las restricciones que habilita este mover deberían ser compatibles con el modo centroide, con algunas salvedades. Como normalmente faltan los átomos de las cadenas laterales en el modo centroide, los residuos que se coordinan a metales mediante átomos de la cadena lateral reciben un tratamiento especial. En concreto, se creará un tipo de residuo especial de modo centroide que contiene átomos de cadena lateral explícitos. Como no es un tipo estándar del modo centroide, no se puntuará necesariamente de forma equivalente a un residuo no conjugado. Además, como los protocolos en modo centroide normalmente no muestrean la flexibilidad de la cadena lateral, la conformación de la cadena lateral quedará efectivamente «bloqueada» en la conformación inicial. Aunque esto debería funcionar al muestrear lejos de los iones metálicos, el muestreo en las proximidades de los residuos de unión a metales puede estar sesgado debido a la comparativa inflexibilidad de la geometría cadena lateral/unión al metal.

### Configuración y opciones
```xml
<SetupMetalsMover name="(&string)" metals_detection_LJ_multiplier="(&Real 1.0)" 
  metals_distance_constraint_multiplier="(&Real 1.0)" metals_angle_constraint_multiplier="(&Real 1.0)"
  remove_hydrogens="(&bool true)" resnums="(&nonnegative_int_cslist)" metal_residue_selector="(&string)" constraints_only="(&bool false)" >
         <Optional residue selector subtag />
</SetupMetalsMover>
```
**Ten en cuenta que la opción resnums, la opción residue_selector y la subetiqueta de selector de residuos son mutuamente excluyentes. Solo puede proporcionarse un selector O una lista resnum.**

* **metals_detection_LJ_multiplier**: un multiplicador que se usa para aumentar o reducir el radio de detección de los átomos de unión a metales. Fijar este valor demasiado alto puede producir falsos positivos en la detección de contactos y puede provocar errores por detectar más contactos de los que el metal puede unir. Si no se fija en la etiqueta del mover, usa el valor fijado en la línea de comandos (por defecto 1.0).
* **metals_distance_constraint_multiplier**: multiplicador del peso de las restricciones de distancia entre el ion metálico y sus átomos coordinantes. Aumentar este peso hará que el sitio de unión sea más rígido; puede ponerse en cero para desactivar las restricciones de distancia. Si no se fija en la etiqueta del mover, usa el valor fijado en la línea de comandos (por defecto 1.0).
* **metals_angle_constraint_multiplier**: multiplicador del peso de las restricciones de ángulo alrededor de los átomos que coordinan al metal (metal-ligando-base_del_ligando). Aumentar este peso hará que el sitio de unión sea más rígido; puede ponerse en cero para desactivar las restricciones de ángulo. Si no se fija en la etiqueta del mover, usa el valor fijado en la línea de comandos (por defecto 1.0).
* **remove_hydrogens**: ¿deben eliminarse los hidrógenos superfluos de los átomos de unión a metales? Por defecto true.
* **resnums**: lista separada por comas de números de residuo (puede incluir rangos, p. ej., 1-10) que especifica dónde buscar iones metálicos que configurar. Mutuamente excluyente con los selectores de residuos.
* **metal_residue_selector**: nombre de un selector de residuos definido previamente que especifica qué iones metálicos configurar. Mutuamente excluyente con resnums y con las subetiquetas de selector de residuos.
* **constraints_only**: solo añade restricciones y no configura enlaces covalentes/tipos variantes. Es útil para restaurar las restricciones añadidas por la configuración de metales después de haberlas eliminado.

[[include:mover_SetupMetalsMover_type]]

###Ejemplo
El siguiente script aplica restricciones de unión a metales al Pose de entrada y luego lo relaja con el mover [[FastRelax|FastRelaxMover]]:

```xml
<ROSETTASCRIPTS>
        <SCOREFXNS>
                <ScoreFunction name="r15_cst" weights="ref2015_cst.wts" >
                        <Reweight scoretype="metalbinding_constraint" weight="1.0" />
                </ScoreFunction>
        </SCOREFXNS>
        <MOVERS>
                <SetupMetalsMover name="setup_metals" metals_detection_LJ_multiplier="1.0" />
                <FastRelax name="frlx1" scorefxn="r15_cst" />
        </MOVERS>
        <PROTOCOLS>
                <Add mover="setup_metals" />
                <Add mover="frlx1" />
        </PROTOCOLS>
</ROSETTASCRIPTS>

```

###Eliminación de enlaces y restricciones de metales

El [[RemoveMetalConnectionsMover]] puede usarse para eliminar los enlaces y los tipos variantes añadidos con este mover. A su vez, el [[ClearConstraintsMover]] puede usarse para eliminar las restricciones añadidas con este mover.

###Véase también
* [[Trabajo con metaloproteínas en Rosetta|Metals]]
* [[RemoveMetalConnectionsMover]]
* [[AddConstraintsToCurrentConformationMover]]


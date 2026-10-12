#Actualizar RosettaScripts

[[_TOC_]]

RosettaScripts es un sistema en desarrollo continuo. Aunque los desarrolladores intentan mantener el formato del XML de RosettaScripts relativamente coherente entre versiones de Rosetta, de vez en cuando hay cambios importantes que hacen que los XML de RosettaScripts existentes dejen de funcionar o funcionen de forma subóptima.

Para cambios menores limitados al funcionamiento de un solo Mover u otro objeto de RosettaScripts, consulta la página de documentación del objeto de RosettaScripts correspondiente.

## Modernización del XML.

RosettaScripts empezó con algo que era casi, pero no del todo, XML. A finales de 2016 (Rosetta 3.8 y posteriores) convertimos el código de carga de XML de Rosetta para que exija XML con el formato correcto. Los dos cambios más evidentes en la sintaxis fueron la nueva exigencia de comillas alrededor de los atributos/opciones de los tags y que los subtags de la sección <SCOREFXNS> pasaron a ser `<ScoreFunction name="sfxname" ...>` en lugar del anterior `<sfxname ...>`. 

Si le das a RosettaScripts un archivo en el formato antiguo (por ejemplo, un XML de la información complementaria de un artículo antiguo), es probable que obtengas mensajes de error del tipo «Input rosetta scripts XML file "fname" failed to validate against the rosetta scripts schema.» Esto también imprimirá varias opciones para probar. Si encuentras este error por un XML antiguo de RosettaScripts, puedes usar el script `tools/xsd_xrw/rewrite_rosetta_script.py`, distribuido con Rosetta, para reescribir el XML del formato antiguo al nuevo. (Ejecuta el script con la opción `-h` para obtener una descripción de cómo usarlo.)

Ten en cuenta que se imprimirá el mismo mensaje de error si cometes un error tipográfico en un XML o usas una opción que ya no se admite. En esos casos, el script rewrite_rosetta_script.py no te servirá.

## El Pose de entrada como Pose de referencia.

Ciertos Movers y Filtros (por ejemplo, los que calculaban el RMSD) se escribieron para poder usar el Pose de entrada como Pose de referencia. A medida que RosettaScripts se ha vuelto más complejo, el mecanismo con el que lo hacían ya no se admite. Si obtienes un mensaje de error como "<Object name> is improperly trying to access the input pose during setup!" o un mensaje de advertencia como "<Object name> is (implicitly) attempting to get the input pose during setup. You should likely use the SavePoseMover to save the pose at the beginning of the PROTOCOL block, and then use the reference_name attribute to explicitly set the reference structure.", es probable que te hayas topado con este problema. 

La forma de solucionarlo es ser más explícito sobre la estructura de referencia. El [[SavePoseMover]] puede capturar el estado del Pose en un punto determinado del protocolo y permitir que otros movers y filtros usen ese estado como Pose de referencia. Si quieres usar el Pose de entrada como Pose de referencia, simplemente añade una llamada a SavePoseMover al principio del bloque PROTOCOLS.

Por ejemplo, puedes convertir el siguiente uso implícito del Pose de entrada

```
    ...
    <FILTERS>
        <Rmsd name="rmsd" chains="A" />
    </FILTERS>
    ...
    <PROTOCOLS>
        ...
        <Add filter_name="rmsd" />
        ...
    </PROTOCOLS>
    ...
```

en lo siguiente, para ser explícito sobre el uso del Pose de entrada como Pose de referencia:

```
    ...
    <MOVERS>
        <SavePoseMover name="save_input" restore_pose="false" reference_name="input_pose" />
    </MOVERS>
    <FILTERS>
        <Rmsd name="rmsd" chains="A" />
    </FILTERS>

    ...
    <PROTOCOLS>
        <Add mover_name="save_input" />  # The very first mover in the PROTOCOLS block.
        ...
        <Add filter_name="rmsd" />
        ...
    </PROTOCOLS>
    ...
```

## Eliminación de la sección APPLY_TO_POSE.

La sección APPLY_TO_POSE era un mecanismo para aplicar movers a un Pose antes del «inicio» del XML. Con la compatibilidad con RosettaScripts más complejos, este mecanismo ya no funciona bien y se ha eliminado. Si te encuentras con este problema, verás un mensaje de error del tipo «The APPLY_TO_POSE section is no longer valid. Please remove it from your XML.» (Ten en cuenta que todavía se permite una sección APPLY_TO_POSE vacía; solo una sección no vacía causará el mensaje de error.)


Se obtiene la misma funcionalidad simplemente colocando los movers de la sección APPLY_TO_POSE en la sección PROTOCOLS, al principio. Por ejemplo, si tienes el siguiente XML:

```
    ...
    <APPLY_TO_POSE>
        <SetupHotspotConstraints stubfile="all_native_stubs.pdb" cb_force="0.5"/>
        <profile weight="0.2" file_name="input.sequence_profile"/>
    </APPLY_TO_POSE>
    <PROTOCOLS>
        ... 
        <Add mover_name="dock" />
        ...
    </PROTOCOLS>
    ...
```

Puedes transformarlo así (fíjate en que los subtags de APPLY_TO_POSE pasan a una sección MOVERS y en que se añade el atributo `name` a cada uno):

```
    ...
    <MOVERS>
        <SetupHotspotConstraints name="setup_hotspots" stubfile="all_native_stubs.pdb" cb_force="0.5"/>
        <profile name="setup_profile" weight="0.2" file_name="input.sequence_profile"/>
    </MOVERS>
    <PROTOCOLS>
        <Add mover_name="setup_hotspots" />
        <Add mover_name="setup_profile" />
        ... 
        <Add mover_name="dock" />
        ...
    </PROTOCOLS>
    ...
```

Ten en cuenta que, si combinas esta transformación con la de la sección «El Pose de entrada como Pose de referencia» de más arriba, la adición del SavePoseMover debería (probablemente) ir después de los movers de la sección APPLY_TO_POSE, aunque, según la disposición concreta del XML, puede que sea más apropiado otro orden.

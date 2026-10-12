# AtomicContactCount
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## AtomicContactCount

Cuenta los contactos carbono-carbono de cadena lateral entre los residuos especificados que estén por debajo de la distancia umbral dada.

Recorre todos los átomos de cadena lateral de los residuos que la operación de tarea dada marca como empaquetables (todos los residuos, si no se da ninguna operación de tarea) y cuenta los pares carbono-carbono. Opcionalmente limita el recuento a los contactos que cruzan un jump o a los contactos entre cadenas. Opcionalmente normaliza el recuento de contactos por la sasa de la interfaz entre jumps o entre cadenas.

Opera en tres modos:

-   'all' - Cuenta todos los contactos carbono-carbono de cadena lateral entre los residuos especificados en la operación de tarea.

<!-- -->

       <AtomicContactCount name="(&string)" partition="all" task_operations="(comma-delimited list of operations &string)"  distance="(4.5 &integer)"/>

-   'jump' - Cuenta todos los contactos carbono-carbono de cadena lateral que atraviesan el jump especificado entre los residuos especificados. Normalize-by-sasa calcula la puntuación de sasa usando el jump especificado y el filtro sasa.

<!-- -->

        <AtomicContactCount name="(&string)" partition="jump" task_operations="(comma-delimited list of operations &string)"  distance="(4.5 &integer)" jump="(1 &integer)" normalize_by_sasa="(0 &bool)"/>

-   'chain' - Cuenta todos los contactos carbono-carbono de cadena lateral entre residuos de cadenas distintas, entre los residuos especificados. Por defecto, normalize-by-sasa calcula la sasa de todas las cadenas del Pose; la opción 'detect\_by\_task' calcula la sasa de la interfaz solo entre las cadenas que contienen residuos especificados en la tarea. Puede subestimar la sasa si la operación de tarea excluye inesperadamente todos los residuos de una cadena.

<!-- -->

       <AtomicContactCount name="(&string)" partition="chain" task_operations="(comma-delimited list of operations &string)"  distance="(4.5 &integer)" normalize_by_sasa="(0*|detect_by_task|1 &str)"/>

Ejemplo:

Para contar los contactos atómicos entre residuos aromáticos y apolares, se pasa al filtro AtomicContactCount una operación de tarea OperateOnCertainResidues que selecciona los residuos aromáticos y apolares.

       <TASKOPERATIONS>
         <OperateOnCertainResidues name="aromatic_apolar">
           <NoResFilter>
             <ResidueType aromatic="1" apolar="1"/>
           </NoResFilter>
           <PreventRepackingRLT/>
         </OperateOnCertainResidues>
       </TASKOPERATIONS>
       ....
       <FILTERS>
         <AtomicContactCount name="cc_jump" partition="jump" jump="1" normalize_by_sasa="0" task_operations="aromatic_apolar" confidence="0"/>
         <AtomicContactCount name="cc_jump_norm" partition="jump" jump="1" normalize_by_sasa="1" task_operations="aromatic_apolar" confidence="0"/>
       </FILTERS>
       ...
       <PROTOCOLS>
         <Add filter_name="cc_jump"/>
         <Add filter_name="cc_jump_norm"/>
       </PROTOCOLS>

Opciones adicionales:

* non_local: detecta solo contactos no locales, es decir, con una distancia en la secuencia mayor que 2. Las posiciones en cadenas distintas se consideran automáticamente no locales.
* res_contact: cuenta solo un contacto atómico por residuo. Esta opción ignora normalize_by_sasa y normalize_by_carbon_count.
* count_SD_NE1: además de los átomos de carbono, cuenta el SD de la metionina y el NE1 del triptófano.

Para obtener el mismo comportamiento que la métrica "hphob_sc_contacts" publicada en "Global analysis of protein folding using massively parallel design, synthesis, and testing" (Science, 2017), mantén los valores por defecto, salvo: distance=4.3, non_local=True, res_contact=True, count_SD_NE1=True, y haz empaquetables solo los aminoácidos hidrofóbicos (FILMVYW).

## Véase también

* [[AtomicContactFilter]]
* [[AtomicDistanceFilter]]
* [[ResidueCountFilter]]
* [[ResidueDistanceFilter]]
* [[PlaceSimultaneouslyMover]]


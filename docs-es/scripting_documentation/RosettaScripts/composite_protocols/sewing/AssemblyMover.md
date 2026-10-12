#AssemblyMover

Generar esqueletos de novo (o ensamblajes, «Assemblies») en el marco de SEWING se logra combinando subestructuras extraídas de estructuras nativas en el [[paso 1|segment-file-generation]] del protocolo. En el SEWING con hash, estas subestructuras se combinan según las coincidencias estructurales que se encuentran en el [[paso 1b|structural-comparison-of-substructures]] de SEWING. En el SEWING sin hash, estas coincidencias estructurales se calculan sobre la marcha durante la generación del ensamblaje.

El ensamblaje de esqueletos está implementado dentro de un Mover y, por tanto, se puede usar mediante la interfaz de [[RosettaScripts]]. Actualmente hay varios Movers implementados, cada uno creado para lograr distintos objetivos de diseño.

El AssemblyMover es la clase base y el mover estándar del marco de SEWING. Este mover añade subestructuras al azar para construir un ensamblaje que cumpla un conjunto dado de requisitos. La evaluación de los requisitos se gestiona proporcionando [[AssemblyRequirements]]. La decisión de añadir o rechazar una subestructura durante la creación de un ensamblaje se basa en un algoritmo de Monte Carlo que usa los [[AssemblyScorers]] proporcionados para la evaluación.


----------------------
[[_TOC_]]

##Otros movers de ensamblaje de SEWING
* [[AppendAssemblyMover]] - Se usa para construir un esqueleto de SEWING sobre una estructura proteica ya existente
* [[LigandBindingAssemblyMover]] - Actualmente en desarrollo, este mover permitirá construir ensamblajes que creen nuevos residuos de unión a ligandos

##Opciones de línea de comandos

*Esta información está desactualizada por ahora, pero basta para ejecutar SEWING correctamente. Para consultar las opciones de línea de comandos que se necesitaban en versiones anteriores de SEWING, consulta la página [[Assembly-of-models]]* 

Las siguientes opciones se aplican a todos los movers de SEWING (ver más abajo), salvo que se indique lo contrario. Las opciones específicas de cada mover están documentadas en las páginas de cada Mover.

###Opciones obligatorias
```
-s                              The input PDB (ignored, but still required,
                                for many SEWING Movers)
```

En la implementación actual, las siguientes opciones también son obligatorias para puntuar ensamblajes de SEWING con el MotifScore, y se muestran con sus valores recomendados (consulta [[AssemblyScorers]]):

```xml

-mh:match:ss1 true    # for "explicit" motifs that get dumped at the end,
                      match target SS
-mh:match:ss2 true    # for "explicit" motifs that get dumped at the end,
                      match binder SS
-mh:match:aa1 false   # for "explicit" motifs that get dumped at the end, 
                      match target AA
-mh:match:aa2 false   # for "explicit" motifs that get dumped at the end, 
                      match binder AA

-mh:score:use_ss1 true         # applicable only to BB_BB motifs; match
                               secondary structure on first (target) res
-mh:score:use_ss2 true         # applicable only to BB_BB motifs; match
                               secondary structure on second (binder) res
-mh:score:use_aa1 false        # applicable only to BB_BB motifs; match AA
                               identity on first (target) res
-mh:score:use_aa2 false        # applicable only to BB_BB motifs; match AA
                               identity on second (binder) res"

-mh:path:motifs            Path to .gz file containing motifs used in motifscore
-mh:path:scores_BB_BB      Path to directory containing database used
                           for generating MotifScores

-mh:gen_reverse_motifs_on_load false     # I think the inverse motifs are already in the datafiles

-mh::dump::max_rms 0.4
-mh::dump::max_per_res 20
```

##Opciones de RosettaScripts

###Opciones generales
* ```hashed``` : Si se establece en true, se usa un algoritmo de hash geométrico para determinar las coincidencias entre segmentos. Esto requiere un archivo de aristas de entrada.
* ```start_temperature``` : Temperatura al inicio del recocido simulado
* ```end_temperature``` : Temperatura al final del recocido simulado
* ```add_probability``` : La probabilidad de añadir una subestructura al ensamblaje en un ciclo cualquiera
* ```delete_probability``` : La probabilidad de que se elimine una subestructura del ensamblaje en un ciclo cualquiera
* ```minimum_cycles``` : El número mínimo de ciclos que necesita el ensamblaje antes de comprobar los requisitos de finalización
* ```maximum_cycles``` : El número máximo de ciclos antes de terminar la generación del ensamblaje, se cumplan o no los requisitos de finalización
* ```model_file_name``` : Ruta del archivo de segmentos (consulta [[SegmentFileGeneration|segment-file-generation]])
* ```output_pose_per_move``` : Se usa para visualización; si esta opción es true, se escribe una Pose después de cada movimiento o reversión

###Opciones del SEWING con hash
Estas opciones solo deben usarse si la opción ```hashed``` es true.
* ```edge_file_name``` : Ruta del archivo de aristas que se usa durante la generación del ensamblaje (consulta [[EdgeFileGeneration|structural-comparison-of-substructures#edge-file]])

###Opciones del SEWING sin hash
Estas opciones solo deben usarse si la opción ```hashed``` es false. El SEWING sin hash determina la compatibilidad estructural sobre la marcha durante la generación del ensamblaje y, por tanto, no requiere archivos de entrada adicionales. Solo recomendamos usar esta opción con subestructuras helicoidales, donde se puede suponer razonablemente cierto grado de compatibilidad estructural entre segmentos.

* ```window_width``` : Número de residuos que deben solaparse para que dos segmentos se consideren una coincidencia

###Opciones obsoletas
Aunque técnicamente siguen figurando como opciones, no se garantiza que sigan siendo compatibles y deben establecerse mediante la subetiqueta [[AssemblyRequirements]] para asegurar que se apliquen correctamente.
* ```max_segments``` : El número máximo de segmentos que se incluyen en el ensamblaje final. (Consulta [[SizeInSegmentsRequirement|AssemblyRequirements#sizeinsegmentsrequirement]])
* ```max_segment_length``` : El número máximo de residuos que se incluyen en un segmento. (Consulta [[DsspSpecificLengthRequirement|AssemblyRequirements#dsspspecificlengthrequirement]] , [[SegmentFileGeneration|segment-file-generation]])

##Subetiquetas

Al AssemblyMover (como a otros movers de SEWING) se le pueden dar las subetiquetas [[AssemblyRequirements]], [[AssemblyScorers]] y [[Ligands|SEWING-with-Ligands]].

##Ejemplo
Actualmente, este mover solo es accesible mediante RosettaScripts. El siguiente script genera un ensamblaje de 5 a 7 segmentos a temperatura constante, en el que todas las hélices tienen un mínimo de 4 vueltas helicoidales.

*Ten en cuenta que, como RosettaScripts usa el distribuidor de trabajos estándar de Rosetta, se requiere un PDB de entrada (con las opciones estándar -s/-l). Este PDB se ignorará. Si quieres proporcionar un PDB de entrada como estructura de partida para tu ejecución de SEWING, consulta la página [[AppendAssemblyMover]]*

A continuación se muestra un ejemplo de etiqueta de RosettaScripts:

```xml
<AssemblyMover
    name="assemble"
    minimum_cycles="10000"
    maximum_cycles="100000"
    start_temperature="0.6"
    end_temperature="0.6"
    hashed="false"
    window_width="4"
    model_file_name="smotifs_H_1_100_L_1_100_H_1_100.segments"
>
    <AssemblyScorers>
        <MotifScorer weight="1" />
        <InterModelMotifScorer weight="10" />
    </AssemblyScorers>
    <AssemblyRequirements>
        <ClashRequirement maximum_clashes_allowed="0" clash_radius="5" />
        <SizeInSegmentsRequirement minimum_size="5" maximum_size="7" />
        <DsspSpecificLengthRequirement dssp_code="H" minimum_length="12" maximum_length="1000" />
    </AssemblyRequirements>
</AssemblyMover>
```

##Véase también
* [[SEWING]] La página principal de SEWING
* [[AssemblyRequirements]]
* [[AssemblyScorers]]
* [[AppendAssemblyMover]]
* [[LigandBindingAssemblyMover]]
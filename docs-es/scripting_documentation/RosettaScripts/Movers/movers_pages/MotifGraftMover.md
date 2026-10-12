# MotifGraft
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MotifGraft

MotifGraft es una nueva implementación del conocido protocolo de injerto de motivos. El protocolo puede reproducir injertos hechos con el protocolo anterior en Fortran (la inserción de loops de novo aún no se ha implementado). El protocolo actual SOLO realiza el INJERTO del fragmento o fragmentos, por lo que, invariablemente, DEBE ir seguido, como mínimo, de pasos de diseño y de minimización/reempaquetado.

La entrada se compone de tres estructuras:

1.  Motif, que es el fragmento (o fragmentos) que el usuario quiere injertar.
2.  Context, que es la proteína (o proteínas) que interactúan con el motivo.
3.  Pose (o lista de Poses), que es el andamio (scaffold) en el que el mover intentará insertar el Motif.

El objetivo es encontrar en el Pose fragmentos compatibles con el motivo o motivos y luego sustituirlos por ellos. Para determinar si un fragmento es compatible, el algoritmo usa tres umbrales que el usuario puede definir:

1.  RMSD del alineamiento del fragmento o fragmentos (opción: RMSD\_tolerance),
2.  RMSD de los puntos N/C tras el alineamiento (opción: NC\_points\_RMSD\_tolerance)
3.  clash\_score (opción: clash\_score\_cutoff).

El algoritmo tiene dos métodos de alineamiento mutuamente excluyentes:

1.  Usar solo los puntos N/C del fragmento o fragmentos (opción: full\_motif\_bb\_alignment="0")
2.  Toda la cadena principal del fragmento o fragmentos (opción: full\_motif\_bb\_alignment="1").

Cuando se usa el alineamiento de toda la cadena principal, el tamaño del fragmento que se va a sustituir debe ser exactamente igual al del fragmento Motif. Como el injerto puede dar lugar a varias soluciones distintas en un mismo scaffold, por defecto el mover devolverá la coincidencia con mejor RMSD (el menor RMSD en el alineamiento); sin embargo, el usuario puede indicar la opción "-nstruct" para ordenar a RosettaScripts que devuelva más estructuras. La desventaja es que el número de estructuras resultantes no se conoce antes de ejecutar el protocolo, por lo que se recomienda usar la opción \<allow\_repeat\_same\_graft\_output="0"\> junto con un valor grande de -nstruc (p. ej., 100), lo que obliga a RosettaScripts a dejar de generar salidas cuando se alcanza la última coincidencia (si la hay).

Un ejemplo de código XML mínimo para este mover es el siguiente:

```xml
        <MotifGraft name="motif_grafting" context_structure="./contextStructure.pdb" motif_structure="./motif_2NM1B.pdb"  RMSD_tolerance="1.0" NC_points_RMSD_tolerance="1.0" clash_score_cutoff="5" full_motif_bb_alignment="1" revert_graft_to_native_sequence="1" allow_repeat_same_graft_output="0" />
```

Sin embargo, el mover tiene muchas opciones que pueden ser útiles en distintos escenarios. De especial interés son: "hotspots", "allow\_repeat\_same\_graft\_output" y "graft\_only\_hotspots\_by\_replacement". A continuación se da la lista completa de las opciones disponibles:

-   context\_structure (&string): la ruta/nombre del PDB de la estructura de contexto.
-   motif\_structure (&string): la ruta/nombre del PDB del motivo (puede contener varios motivos discontiguos separados por la palabra clave TER).
-   RMSD\_tolerance (&real): la tolerancia máxima de RMSD (Å) para el alineamiento.
-   NC\_points\_RMSD\_tolerance (&real): la tolerancia máxima de RMSD (Å) para los puntos N/C, tras el alineamiento.
-   clash\_test\_residue (&string): el Motif se mutará antes de comprobar los choques (valores posibles: "GLY", "ALA", "VAL", "NATIVE"), salvo que se especifique la opción "NATIVE". Se recomienda usar "GLY" o "ALA".
-   clash\_score\_cutoff (&int): el número máximo de choques atómicos que se toleran. El número de choques atómicos es (motivo contra scaffold) + (scaffold contra Pose), tras la traslación y la mutación (a "clash\_test\_residue") del scaffold. Recomendado: "5".
-   atom_clash_scale (&float): la escala relativa de los átomos usada durante la comprobación de choques, respecto a su tamaño normal. Fija este número por debajo de 1 si quieres usar una comprobación de choques blanda. Por herencia, el valor por defecto es 0.5.
-   combinatory\_fragment\_size\_delta (&string): una cadena separada por dos puntos que define el número máximo de aminoácidos en que puede variar el tamaño del Motif en las regiones N- y C-terminal (p. ej., "positive-int:positive-int"). Si hay varios fragmentos, los valores deben indicarse separados por comas (p. ej., 0:0, 1:2, 0:3). Se probarán todas las combinaciones posibles en pasos de 1 aminoácido.
-   max\_fragment\_replacement\_size\_delta (&string): una cadena separada por dos puntos que especifica un rango con la diferencia mínima y máxima de tamaño del fragmento que se puede sustituir en el scaffold. Por ejemplo, "-1:2" significa que el fragmento sustituido en el scaffold puede estar en el rango de motifSize-1 a motifSize+2; en la práctica, si el motivo tiene 10 aminoácidos, en este ejemplo el motivo puede sustituir un fragmento del scaffold de 9, 10 u 11 aminoácidos. (valores posibles: negative-int:positive-int). Si hay varios fragmentos, los valores deben indicarse separados por comas (p. ej., -1:0, -1:2, 0:3). Esta opción solo tiene efecto si el modo de alineamiento es full\_motif\_bb\_alignment="0".
-   hotspots (&string): una cadena separada por dos puntos que define el índice de los aminoácidos que se consideran hotspots, es decir, que esas posiciones no se mutarán en la comprobación de choques y se marcarán en el PDBinfo. El formato es "index1:index2:...:indexN"). Si hay varios fragmentos, los valores deben indicarse separados por comas (p. ej., 1:2:4,1:2,1:4:6).
-   full\_motif\_bb\_alignment (&bool): booleano que define si el modo de alineamiento del fragmento o fragmentos del motivo es de cadena principal completa o no (es decir, solo puntos N/C).
-   allow\_independent\_alignment\_per\_fragment (&bool): \*\*EXPERIMENTAL\*\* cuando hay más de un fragmento, tras el alineamiento global, esta opción permite que cada fragmento se realinee de forma independiente al scaffold. En la mayoría de los casos conviene dejar esta opción DESACTIVADA.
-   graft\_only\_hotspots\_by\_sidechain\_replacement (&bool): análoga a la antigua opción «fragment replacement» del código multigraft; solo alinea el scaffold y luego copia las identidades y torsiones de las cadenas laterales (solo para los hotspots). No se modifica ninguna cadena principal. Esta opción solo es útil si el RMSD entre el motivo y el fragmento diana en el scaffold es muy bajo (p. ej., \< 0.3 Å); de lo contrario, pueden obtenerse resultados extraños.
-   only\_allow\_if\_NC\_points\_match\_aa\_identity (&bool): esta opción solo realiza injertos si los aminoácidos de los puntos N/C del motivo coinciden con los aminoácidos que se van a sustituir en el fragmento del scaffold diana. Puede ser útil si, por ejemplo, se busca sustituir un fragmento que empieza en un puente S-S.
-   revert\_graft\_to\_native\_sequence (&bool): esta opción revertirá/transformará/modificará la secuencia de la pieza o piezas injertadas a la secuencia del scaffold nativo, excepto los hotspots. Esta opción solo funciona junto con el modo de alineamiento de cadena principal completa (full\_motif\_bb\_alignment="1") y, por supuesto, solo tiene sentido si sustituyes fragmentos del scaffold diana del mismo tamaño que tu motivo, que es el comportamiento por defecto del alineamiento de cadena principal completa.
-   allow\_repeat\_same\_graft\_output (&bool): si está activada (opción: allow\_repeat\_same\_graft\_output="1"), evita que se generen salidas repetidas; junto con un valor grande de -nstruc (p. ej., 100) puede servir para extraer todas las coincidencias sin repeticiones, ya que el mover se detendrá cuando se alcance la última coincidencia de injerto. Si está desactivada (opción: allow\_repeat\_same\_graft\_output="0"), ocurrirá el comportamiento habitual de -nstruct, es decir: Rosetta se detendrá solo cuando se hayan generado -nstructs estructuras (aunque tenga que repetir n veces el mismo resultado) o si el mover falla (es decir, si no hay ninguna coincidencia de injerto).

Por último, un ejemplo de código XML de RosettaScripts que usa todas las opciones para el injerto de un solo fragmento:

```xml
<MotifGraft name="motif_grafting" context_structure="./context.pdb" motif_structure="./motif.pdb" RMSD_tolerance="1.0"   NC_points_RMSD_tolerance="1.0" clash_test_residue="GLY" clash_score_cutoff="5" combinatory_fragment_size_delta="0:0" max_fragment_replacement_size_delta="0:0"  hotspots="1:2:4" full_motif_bb_alignment="1"  optimum_alignment_per_fragment="0" graft_only_hotspots_by_replacement="0" only_allow_if_NC_points_match_aa_identity="0" revert_graft_to_native_sequence="0" allow_repeat_same_graft_output="0"/>
```

y para el injerto de dos fragmentos:

```xml
<MotifGraft name="motif_grafting" context_structure="./context.pdb" motif_structure="./motif.pdb" RMSD_tolerance="1.0"   NC_points_RMSD_tolerance="1.0" clash_test_residue="GLY" clash_score_cutoff="0.0" combinatory_fragment_size_delta="0:0,0:0" max_fragment_replacement_size_delta="0:0,0:0"  hotspots="1:2:4,1:3" full_motif_bb_alignment="1"  optimum_alignment_per_fragment="0" graft_only_hotspots_by_replacement="0" only_allow_if_NC_points_match_aa_identity="0" revert_graft_to_native_sequence="0" allow_repeat_same_graft_output="0"/>
```

 Task operations después de MotifGraft: para tu comodidad, el mover generará algunas etiquetas PDBinfo dentro del Pose. Las etiquetas disponibles son: "HOTSPOT", "CONTEXT", "SCAFFOLD", "MOTIF" y "CONNECTION", que, por suerte, corresponden exactamente a los elementos que describe cada etiqueta. Puedes usar fácilmente esta información en task operations a nivel de residuo para impedir o restringir modificaciones en elementos concretos. Ejemplo:

```xml
        <OperateOnCertainResidues name="hotspot_onlyrepack">
            <ResiduePDBInfoHasLabel property="HOTSPOT"/>
            <RestrictToRepackingRLT/>
        </OperateOnCertainResidues>
        <OperateOnCertainResidues name="scaffold_onlyrepack">
            <ResiduePDBInfoHasLabel property="SCAFFOLD"/>
            <RestrictToRepackingRLT/>
        </OperateOnCertainResidues>
        <OperateOnCertainResidues name="context_norepack">
            <ResiduePDBInfoHasLabel property="CONTEXT"/>
            <PreventRepackingRLT/>
        </OperateOnCertainResidues>
```

## Referencia

Silva, D., Correia, B.E., and Procko, E. (2016) Motif-driven Design of Protein-Protein Interactions. Methods Mol. Biol. 1414:285-304

##Véase también

* [[FastDesignMover]]
* [[FastRelaxMover]]
* [[Abinitio relax]]: aplicación para la predicción de estructuras *de novo*
* [[MinMover]]
* [[Minimization overview]]
* [[I want to do x]]: guía para elegir un mover

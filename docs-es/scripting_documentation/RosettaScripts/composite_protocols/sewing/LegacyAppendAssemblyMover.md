#LegacyAppendAssemblyMover
##Nota: esta página es de LegacySEWING.
**Esta página está obsoleta. Para obtener información sobre la versión actual de SEWING, visita las páginas [[AssemblyMover]] y [[AppendAssemblyMover]].**

El LegacyAppendAssemblyMover es un Mover que permite añadir residuos a un PDB que no está incorporado al SewGraph. Por tanto, el primer paso del LegacyAppendAssemblyMover es añadir el nuevo Modelo al SewGraph e identificar cualquier arista (coincidencia estructural) con este nuevo nodo (el Modelo PDB). 

##Opciones de línea de comandos

###Opciones de línea de comandos obligatorias
El LegacyAppendAssemblyMover requiere todas las opciones obligatorias del [[AssemblyMover|Assembly-of-models#required-flags]], además de las siguientes:

```
-s                              The input PDB to be appended to
-legacy_sewing:pose_segment_starts     A vector of integers representing the
                                starting residue (in Rosetta residue numbering)
                                of each segment in the Model PDB (passed with the -s/-l flags)
-legacy_sewing:pose_segment_ends       A vector of integers representing the end residue (in
                                Rosetta residue numbering) of each segment in the Model
                                PDB (passed with the -s/-l flags)
-legacy_sewing:keep_model_residues     A vector of integers representing residues (in
                                Rosetta residue numbering) that should not be
                                allowed to change from their starting amino acid identity.
-legacy_sewing:num_segments_to_match   The exact of model segments to look for structural
                                matches for. Any matches with less than, or more than,
                                this number of segment matches will fail. For continuous
                                SEWING, only a value of 1 is supported
-legacy_sewing:min_hash_score          The minimum number over overlapping atoms **per segment**
                                that is considered a structure match (recommended value: >=10)
-legacy_sewing:max_clash_score         The tolerance for number of atoms/segment of different
                                atom types that end up in the same quarter-angstrom bin
                                during geometric hashing
```

###Opciones opcionales

```
-legacy_sewing:partner_pdb             An additional PDB file used when finding clashes
                                and in scoring (InterfaceMotifScore).
                                Normally a binding partner for the input PDB.


```

##Opciones de RosettaScripts

Como subclase del [[LegacyMonteCarloAssemblyMover]], el AppendAssemblyMover admite las mismas opciones de RosettaScripts.

##Ejemplo

A continuación se muestra un RosettaScript real que se usó para ejecutar el AppendAssemblyMover con varias entradas; cada entrada toma un valor distinto para las opciones de línea de comandos -in:file:s, -sewing:keep_model_residues, -sewing:pose_segment_starts y -sewing:pose_segment_ends.
```xml
<ROSETTASCRIPTS>
  <SCOREFXNS>
  </SCOREFXNS>
  <FILTERS>
  </FILTERS>
  <MOVERS>
    <AppendAssemblyMover name="assemble" min_segments="7" max_segments="9" 
     cycles="10000" />
  </MOVERS>
  <APPLY_TO_POSE>
  </APPLY_TO_POSE>
  <PROTOCOLS>
    <Add mover_name="assemble" />
  </PROTOCOLS>
</ROSETTASCRIPTS>
```

##Véase también
* [[LegacyMonteCarloAssemblyMover]]
* [[Sewing Hasher Application] Aplicación para generar archivos de modelos y de puntuaciones del SEWING heredado
* [[Assembly of models]]
* [[SEWING]]: La página principal de SEWING
* [[SEWING Dictionary]] Aclara los términos de los protocolos SEWING heredado y nuevo



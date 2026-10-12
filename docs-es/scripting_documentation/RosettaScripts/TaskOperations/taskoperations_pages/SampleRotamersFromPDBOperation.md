# SampleRotamersFromPDB
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## SampleRotamersFromPDB

Limita el muestreo de rotámeros a los rotámeros que son similares (diferencia de +/- 5 grados) a los rotámeros de PDB de entrada o de un archivo de base de datos de rotámeros (consulta [RotLibOut](https://www.rosettacommons.org/docs/latest/scripting_documentation/RosettaScripts/Movers/RotLibOut)). Los archivos PDB se dan mediante la opción "-packing::unboundrot". Para cada residuo del Pose de entrada se construye un vector de rotámeros a partir de todos los residuos que están alineados estructuralmente entre el residuo del Pose y todos los PDB de entrada. Ten en cuenta que la TaskOperation **__no alinea__** los PDB de entrada con el Pose; solo determina qué residuos están alineados estructuralmente. El alineamiento debe hacerse antes de usar esta TaskOperation. 

```xml
<SampleRotamersFromPDB name="(&string;)" add_rotamer="(1 &bool;)"
        debug="(0 &bool;)" ccd="(1 &bool;)" aligned_positions="(&int_cslist;)" >
    <Segments name="(&string;)" >
        <Segment name="(&string;)" pdb_profile_match="(&string;)" rot_lib="(&string;)" />
    </Segments>
</SampleRotamersFromPDB>
```
-   **add_rotamer**: Si es verdadero, añade el rotámero muestreado al vector de rotámeros; de lo contrario, solo elimina los rotámeros que no están en los PDB de entrada o en la base de datos de rotámeros.
-   **debug**: hace la salida más detallada.
-   **ccd**: no modifica los residuos con la propiedad CUT_LOWER/CUT_UPPER.
-   **aligned_positions**: aplica esta TaskOperation solo a posiciones específicas.

Subtag **Segments**:   Contenedor de varios tags de segmento



Subtag **Segment**:   tag de un segmento individual

-   **pdb_profile_match**: archivo de texto que asocia el nombre del PDB con el perfil
-   **rot_lib**: cadena que asocia el perfil con el archivo de base de datos de rotámeros

---
##Ejemplos
### Ejemplo 1 - Uso de PDB de entrada para modificar los rotámeros del Pose
```xml
<SampleRotamersFromPDB name="example1" add_rotamer="1" debug="0" ccd="0"/>
```
### Ejemplo 2 - Uso de archivos de base de datos de rotámeros para modificar el vector de rotámeros del Pose
```xml
<SampleRotamersFromPDB name="example2" add_rotamer="1" debug="0" ccd="1">
  <Segments>
    <Segment name="frm1" pdb_profile_match="pdb_profile_match" rot_lib="2vc5B:2vc5B_frm1.dat,1hzyB:1hzyB_frm1.dat"/>
    <Segment name="frm2" pdb_profile_match="pdb_profile_match" rot_lib="2vc5B:2vc5B_frm2.dat,1hzyB:1hzyB_frm2.dat"/>
    <Segment name="frm3" pdb_profile_match="pdb_profile_match" rot_lib="2vc5B:2vc5B_frm3.dat,1hzyB:1hzyB_frm3.dat"/>
  </Segments>		
</SampleRotamersFromPDB>
```


##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

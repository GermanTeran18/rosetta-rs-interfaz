# Restricciones de perfil de secuencia
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## profile

[[include:mover_profile_type]]

Fija restricciones sobre la secuencia del Pose que pueden basarse en un alineamiento de secuencias o en una matriz de transición de aminoácidos.

```xml
<profile weight="(0.25 &Real)" file_name="(<input file name >.cst &string)"/>
```

fija restricciones de tipo residue_type en el Pose según un perfil de secuencia. file_name tiene por defecto el nombre del archivo de entrada con el sufijo cambiado a ".cst". Así, un archivo llamado xxxx_yyyy.25.jjj.pdb implicaría xxxx_yyyy.cst. Para generar archivos de restricciones de perfil de secuencia con estos valores por defecto usa DockScripts/seq_prof/seq_prof_wrapper.sh

##Véase también
* [[RosettaScriptsPlacement]]: más información sobre el marco de colocación de hotspots.
* [[I want to do x]]: guía para elegir un mover
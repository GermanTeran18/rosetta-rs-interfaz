# InertPoseIntoPoseMover
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## InsertPoseIntoPoseMover

[[_TOC_]]

##Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

##Resumen 

Inserta un Pose completo en otro.  Loops, linkers, lo que sea. Aquí no hay modelado.  Es un envoltorio de la función de utilidad insert_pose_into_pose.

Si hace falta, los residuos entre start y end deben eliminarse antes de usar este mover.  Consulta [[DeleteRegionMover]] o [[KeepRegionMover]] para ver cómo hacerlo en RosettaScripts.

Usa [[SavePoseMover]] para pasarle el Pose a este mover.  Funciona igual, en cuanto a guardar y proporcionar el Pose de referencia, que en el ejemplo XML de [[CCDEndsGraftMover]]. 

##Script XML

**Combínalo con [[SavePoseMover]]**
```xml
     <InsertPoseIntoPoseMover name="(&string)" start_pdb_num (&string) end_pdb_num="(&string)" copy_pdbinfo="(&bool, false)" spm_reference_name=/>
```

###Opciones XML obligatorias
-   start\_pdb\_num: Número PDB desde el que empieza la región que se conserva (incluido). Ej.: 24L.  Usa start\_res\_num en su lugar para la numeración interna 
-   end\_pdb\_num: Número PDB en el que termina la región que se conserva (incluido); Ej.: 42L. Usa end\_res\_num en su lugar para la numeración interna
-   spm_reference_name (&string): El nombre del Pose de referencia que estamos insertando.  Consulta [[SavePoseMover]] para más información.

###Opciones XML opcionales
-   copy_pdbinfo (&bool) (default=false): Copia el PDBInfo (números de residuo PDB e ID de cadena) al nuevo Pose.  Permite que se escriban en el Pose final. 


##Véase también

* [[StorePoseSnapshotMover]]: Se usa para conservar la numeración original de residuos
* [[SavePoseMover]]
* [[AnchoredGraftMover]]
* [[CCDEndsGraftMover]]
* [[Inserción y eliminación | Movers-RosettaScripts#general-movers_insertion-and-deletion-grafting]]
* [[I want to do x]]: Guía para realizar perturbaciones estructurales concretas con RosettaScripts
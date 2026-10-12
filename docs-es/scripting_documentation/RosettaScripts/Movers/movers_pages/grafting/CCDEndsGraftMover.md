# CCDEndsGraftMover
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## CCDEndsGraftMover

[[_TOC_]]

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

##Resumen
###Breve 

Clase de injerto de propósito general que:

1) superpone el inserto sobre el andamio usando los residuos sobrantes

2) Inserta la pieza del Pose en el Pose andamio, eliminando los residuos sobrantes o los residuos de la región entre la que se producirá la inserción.

3) Ciclos de:

  - a) SmallMover para el muestreo (se puede desactivar))

  - b) CCD sobre ambos extremos terminales del andamio, usando los ajustes de flexibilidad o un MoveMap, para cerrar el injerto.  

  - c) MinMover para ayudar a cerrar el injerto mediante los términos de rotura de cadena

  - d) Comprobación de cierre: devolverá el resultado si está cerrado (se puede desactivar)

  - e) Criterio de Boltzmann de MonteCarlo

5) Repacking de los residuos flexibles y de los residuos del inserto

**Se diferencia de AnchoredGraftMover en que el inserto se mantiene fijo en el espacio tras la superposición, en lugar de usar un brazo gigante para cerrar la inserción.**


###Detalles 

Usa dos brazos CCD a cada lado del andamio para cerrar el injerto.  Por defecto, el inserto se mantiene fijo en el espacio cartesiano tras la superposición de los residuos sobrantes.

```
****Nter_loop_start-----> | Piece | <----Nter_loop_end****
```

La flexibilidad por defecto en Nter y Cter es de solo dos residuos (la parte --> del diagrama).  Eliminará los residuos entre el inicio y el final del andamio, y los residuos sobrantes del inserto.


Internamente, apply realiza la inserción, idealiza los residuos del loop (omegas a 180, enlaces peptídicos idealizados) y las nuevas conexiones del polímero en el punto de inserción, y luego intenta cerrar el loop o los loops. Una vez completada la inserción, hace repacking de las cadenas laterales del inserto y de los residuos sobrantes. Por defecto, apply se detendrá en cuanto el injerto esté cerrado.  El cierre se mide como que todas las longitudes y ángulos de enlace del loop sean aceptables.

Está pensado para producir un injerto con buenas puntuaciones de rama, omega y chainbreak/peptide_bond, pero no lo garantiza. Se recomienda una minimización de todos los átomos del injerto o del Pose tras la inserción.

##Script XML
     <CCDEndsGraftMover name="(&string)" spm_reference_name="(&string)" start_ (&string) end_="(&string)" nter_overhang="(&size, 0)" cter_overhang="(&size, 0)" stop_at_closure="(&bool, true)", copy_pdbinfo="(&bool, false)"/>

###Opciones XML obligatorias 

**Combínalo con [[SavePoseMover]] para las inserciones**

-   spm_reference_name (&string): El nombre del Pose de referencia que estamos insertando.  Consulta [[SavePoseMover]] para más información.
-   start_: Número PDB desde el que empieza la región que se conserva (incluido). Ej.: 24L o numeración interna de Rosetta
-   end_: Número PDB en el que termina la región que se conserva (incluido); Ej.: 42L o numeración interna de Rosetta

###Opciones de flexibilidad

**Conexión: andamio-inserto-andamio**

-   scaffold_flex_Nter (&size) (default=2):  Usa este número de residuos Nter del inserto para optimizar la inserción y cerrar el enlace peptídico andamio-inserto. 
-   scaffold_flex_Cter (&size) (default=2):  Usa este número de residuos Cter del inserto para optimizar la inserción y cerrar el enlace peptídico andamio-inserto. 
-   insert_flex_Nter (&size) (default=0): Usa este número de residuos del inserto en el lado Nter para optimizar la inserción y cerrar el enlace peptídico andamio-inserto. 
-   insert_flex_Cter (&size) (default=0): Usa este número de residuos del inserto en el lado Cter para optimizar la inserción y cerrar el enlace peptídico andamio-inserto. 


###Opciones XML adicionales
-   Nter_overhang (&size) (default=0): Número de residuos adicionales en el lado Nter de tu inserto que se usan para la superposición antes de la inserción.  Estos residuos se eliminan antes de insertar.
-   Cter_overhang (&size) (default=0): Número de residuos adicionales en el lado Cter de tu inserto que se usan para la superposición antes de la inserción.  Estos residuos se eliminan antes de insertar.
-   mintype (&string) (default=dfpmin_armijo_nonmonotone): Define el mintype del MinMover
-   copy_pdbinfo(&bool) (default=false): Copia el PDBInfo (números de residuo PDB e ID de cadena) al nuevo Pose.  Permite que se escriban en el Pose final. 
-   cen_scorefxn (&string) (default=smoothed version of that used originally for Steven Lewis' AnchoredDesignProtocol): Función de puntuación centroide que se usa
-   fa_scorefxn (&string) (default=Rosetta default): Función de puntuación de todos los átomos que se usa para el repacking final
-   cycles (&size) (default=300): Define el número de ciclos que se usan.
-   final_repack (&size) (default=true): ¿Hacer un repacking final del inserto y de los vecinos una vez completado el protocolo?
-   neighbor_dis (&real) (default=4.0): Define la distancia de detección de vecinos para el repacking final
-   skip_sampling (&bool) (default=false): Hace que el mover omita el paso de muestreo con SmallMover.


###Opciones de MoveMap

Opcionalmente puedes especificar MoveMaps tanto para el inserto como para el andamio, que se usarán durante la minimización, CCD, etc.  No se recomienda para uso general; por simplicidad, usa en su lugar las opciones de flexibilidad. Consulta [[FastRelaxMover]] para más detalles sobre la especificación de MoveMap. 

Se combinarán los MoveMaps para apply y se renumerará todo. No se recomiendan residuos flexibles en varias cadenas. Esto puede ser increíble, ya que puedes usar regiones de loop de distintas partes de tu proteína para ayudar a completar el injerto.

Nota: Se ignorarán los ajustes de flexibilidad, ya que los MoveMaps serán la forma principal de definir la flexibilidad. Puede convenir desactivar el paso de muestreo si pasas MoveMaps extravagantes.


-   insert_movemap: Especifica el MoveMap del inserto como una etiqueta interna.
-   scaffold_movemap: Especifica el MoveMap del andamio como una etiqueta interna


##Ejemplo XML

En este ejemplo injertamos 3 CDR (regiones de loop) de un anticuerpo (graft_from.pdb) en otro usando SavePoseMover.  Sé que es confuso; es mucho más fácil usar este mover con PyRosetta. 

Usamos KeepRegionMover para recortar iterativamente un CDR del PDB, guardar su estado en el mover de guardado de Pose, injertarlo y repetir.  SavePoseMover se usa para guardar el estado de distintas estructuras y así poder combinarlas, eliminar cosas en ellas, etc.  Usamos [[ParsedProtocolMover]] para combinar movers en una secuencia. 

Al final nos queda un anticuerpo nuevo que tiene CDR de otro anticuerpo.  No debería haber roturas de cadena en este anticuerpo nuevo.  Ten en cuenta que CCDEndsGraftMover no siempre logra cerrar las regiones.  [[AnchoredGraftMover]] es mejor para cerrar regiones que no son de loop; sin embargo, puede dar lugar a estructuras extrañas y puede que la propia estructura requiera optimización adicional.  El programa de diseño de anticuerpos RAbD usa una combinación de ambos movers para cerrar y optimizar el 100 por ciento de los injertos de CDR de anticuerpos. 


```xml
<ROSETTASCRIPTS>
	<MOVERS>
		<SavePoseMover name="save_current" reference_name="current"/>
		<SavePoseMover name="save_CDR" reference_name="CDR"/>
		<SavePoseMover name="restore_current" restore_pose="1" reference_name="current"/>
		<SavePoseMover name="restore_ab" restore_pose="1" reference_name="ab" pdb_file="graft_from.pdb"/>
		<ParsedProtocol name="save_cdr_restore" >
			<Add mover="save_CDR" />
			<Add mover="restore_current" />
		</ParsedProtocol>
		<ParsedProtocol name="save_current_restore_ab" >
			<Add mover="save_current" />
			<Add mover="restore_ab" />
		</ParsedProtocol>
		<KeepRegionMover name="k_L1" start_="24L" end_="42L" nter_overhang="2" cter_overhang="2"/>
		<KeepRegionMover name="k_L2" start_="57L" end_="72L" nter_overhang="2" cter_overhang="2"/>
		<KeepRegionMover name="k_L3" start_="107L" end_="138L" nter_overhang="2" cter_overhang="2"/>
		<CCDEndsGraftMover name="graft_L1" start_="23L" end_="43L" spm_reference_name="CDR" copy_pdbinfo="1"/>
		<CCDEndsGraftMover name="graft_L2" start_="56L" end_="73L" spm_reference_name="CDR" copy_pdbinfo="1"/>
		<CCDEndsGraftMover name="graft_L3" start_="106L" end_="139L" spm_reference_name="CDR" copy_pdbinfo="1"/>
	</MOVERS>
	<PROTOCOLS>
		<Add mover_name="save_current" />
		<Add mover_name="restore_ab"/>
    		<Add mover_name="k_L1" />
		<Add mover_name="save_cdr_restore"/>
		<Add mover_name="graft_L1"/>
		<Add mover_name="save_current_restore_ab"/>
		<Add mover_name="k_L2"/>
		<Add mover_name="save_cdr_restore"/>
		<Add mover_name="graft_L2"/>
		<Add mover_name="save_current_restore_ab"/>
		<Add mover_name="k_L3"/>
		<Add mover_name="save_cdr_restore"/>
		<Add mover_name="graft_L3"/>
		<Add mover_name="save_current"/>
	</PROTOCOLS>
</ROSETTASCRIPTS>
```


##Véase también

* [[SavePoseMover]]
* [[AnchoredGraftMover]]
* [[Inserción y eliminación | Movers-RosettaScripts#general-movers_insertion-and-deletion-grafting]]
* [[I want to do x]]: Guía para realizar perturbaciones estructurales concretas con RosettaScripts
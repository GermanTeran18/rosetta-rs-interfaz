# AnchoredGraftMover
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## AnchoredGraftMover

[[_TOC_]]

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

##Resumen
###Breve 

Clase de injerto adaptada del algoritmo pose_into_pose de Steven Lewis.

1) Inserta la pieza del Pose en el Pose andamio, eliminando los residuos sobrantes o los residuos de la región entre la que se producirá la inserción.

2) Conecta el lado izquierdo de la pieza al andamio insertando una geometría ideal 
     (es decir, no hace falta superponer los extremos sobrantes)

3) Ciclos de:

  - a) SmallMover para el muestreo

  - b) CCD para cerrar el lado derecho (Nter) del injerto.  El inserto se incluye como residuos rígidos en el espacio diedro dentro del brazo CCD. Por defecto se usan los residuos de ambos lados del andamio para cerrar el loop. Se puede dar un MoveMap para incluir más residuos que CCD pueda usar, como loops que conectan elementos de estructura secundaria

  - c) MinMover para ayudar a cerrar el injerto mediante los términos de rotura de cadena

  - d) Comprobación de cierre: se detendrá si está cerrado (esto se puede anular)

  - e) Criterio de Boltzmann de MonteCarlo

5) Repacking de los residuos flexibles, los residuos del inserto, los residuos de conexión entre el andamio y el inserto, y los vecinos

###Detalles 

Por defecto usa un solo brazo para cerrar el loop.

```
 ****Nter_loop_start---->Piece----> | Cter_loop_end****
```

El MoveMap por defecto mantiene congelado el inserto en el espacio de ángulos diedros, pero hay que pensar en el inserto como parte de un brazo CCD gigante. La flexibilidad por defecto en Nter y Cter es de solo dos residuos (la parte --> del diagrama). Eliminará los residuos entre el inicio y el final, y los residuos sobrantes del inserto.  

Algoritmo procedente originalmente de pose_into_pose:
-   El inserto se deja sin cambios en el espacio de coordenadas internas, salvo el phi del primer residuo, el psi/omega del último residuo y los átomos cuyos compañeros de enlace cambian como resultado de la inserción, a menos que se definan las opciones insert_flexibility.
-   Internamente, apply realiza la inserción, idealiza los residuos de conexión (omegas a 180, enlaces peptídicos idealizados) y las nuevas conexiones del polímero en el punto de inserción, y luego intenta cerrar el loop o los loops.
-   Está pensado para producir un injerto con buenas puntuaciones de rama, omega y chainbreak/peptide_bond, pero no lo garantiza. Se recomienda una minimización de todos los átomos del injerto o del Pose tras la inserción.

##Script XML
     <CCDEndsGraftMover name="(&string)" spm_reference_name="(&string)" start_pdb_num (&string) end_pdb_num="(&string)" nter_overhang="(&size, 0)" cter_overhang="(&size, 0)" stop_at_closure="(&bool, true)", copy_pdbinfo="(&bool, false)"/>

###Opciones XML obligatorias 

**Combínalo con [[SavePoseMover]] para las inserciones**

-   spm_reference_name (&string): El nombre del Pose de referencia que estamos insertando.  Consulta [[SavePoseMover]] para más información.
-   start\_pdb\_num: Número PDB desde el que empieza la región que se conserva (incluido). Ej.: 24L.  Usa start\_res\_num en su lugar para la numeración interna 
-   end\_pdb\_num: Número PDB en el que termina la región que se conserva (incluido); Ej.: 42L. Usa end\_res\_num en su lugar para la numeración interna

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
		<KeepRegionMover name="k_L1" start_pdb_num="24L" end_pdb_num="42L" nter_overhang="2" cter_overhang="2"/>
		<KeepRegionMover name="k_L2" start_pdb_num="57L" end_pdb_num="72L" nter_overhang="2" cter_overhang="2"/>
		<KeepRegionMover name="k_L3" start_pdb_num="107L" end_pdb_num="138L" nter_overhang="2" cter_overhang="2"/>
		<CCDEndsGraftMover name="graft_L1" start_pdb_num="23L" end_pdb_num="43L" spm_reference_name="CDR" copy_pdbinfo="1"/>
		<CCDEndsGraftMover name="graft_L2" start_pdb_num="56L" end_pdb_num="73L" spm_reference_name="CDR" copy_pdbinfo="1"/>
		<CCDEndsGraftMover name="graft_L3" start_pdb_num="106L" end_pdb_num="139L" spm_reference_name="CDR" copy_pdbinfo="1"/>
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
* [[CCDEndsGraftMover]]
* [[Inserción y eliminación | Movers-RosettaScripts#general-movers_insertion-and-deletion-grafting]]
* [[I want to do x]]: Guía para realizar perturbaciones estructurales concretas con RosettaScripts
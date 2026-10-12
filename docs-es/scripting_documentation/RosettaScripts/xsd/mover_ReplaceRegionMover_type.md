<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com)
Reemplaza una región de longitud span de la Pose de destino por una región indicada de longitud span de la Pose de origen.

Referencias e información de autoría del mover ReplaceRegionMover:

Cita(s) de ReplaceRegionMover (Mover):
Adolf-Bryfogle J, Kalyuzhniy O, Kubitz M, Weitzner BD, Hu X, Adachi Y, Schief WR, and Dunbrack Jr RL Jr.  (2018).  RosettaAntibodyDesign (RAbD): A general framework for computational antibody design.  PLoS Comput Biol 14(4):e1006112.  doi: 10.1371/journal.pcbi.1006112.

```xml
<ReplaceRegionMover name="(&string;)" span="(&non_negative_integer;)"
        copy_pdbinfo="(false &bool;)" src_pose_start="(&string;)"
        target_pose_start="(&string;)" spm_reference_name="(&string;)" />
```

-   **span**: (OBLIGATORIO) Longitud de la región a reemplazar
-   **copy_pdbinfo**: ¿Copiar el PDBInfo a la nueva Pose?
-   **src_pose_start**: (OBLIGATORIO) Primer residuo que se copia de la Pose de origen
-   **target_pose_start**: (OBLIGATORIO) Primer residuo que se reemplaza en la Pose de destino
-   **spm_reference_name**: Nombre de la Pose de referencia a usar (usa SavePoseMover para crear una Pose de referencia)

---

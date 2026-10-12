<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Hace una búsqueda Monte Carlo del sitio de unión del ligando usando rejillas de puntuación precalculadas. Reemplaza los movers Translate, Rotate y SlideTogether.

Referencias e información de autoría del mover Transform:

Cita(s) de Transform (Mover):
DeLuca S, Khar K, and Meiler J.  (2015).  Fully Flexible Docking of Medium Sized Ligand Libraries with RosettaLigand.  PLoS One 10(7):e0132508.  doi: 10.1371/journal.pone.0132508.

```xml
<Transform name="(&string;)" chain="(&string;)" sampled_space_file="(&string;)"
        move_distance="(&real;)" box_size="(&real;)" angle="(&real;)"
        temperature="(&real;)" rmsd="(&real;)" cycles="(&non_negative_integer;)"
        repeats="(1 &non_negative_integer;)"
        optimize_until_score_is_negative="(false &bool;)"
        use_constraints="(false &bool;)" use_main_model="(false &bool;)"
        cst_fa_file="(&string;)" ensemble_proteins="(&string;)"
        cst_fa_weight="(1.0 &non_negative_real;)"
        initial_perturb="(0.0 &non_negative_real;)"
        initial_angle_perturb="(0.0 &non_negative_real;)"
        grid_set="(default &string;)" />
```

-   **chain**: (OBLIGATORIO) La cadena del ligando, especificada con el ID de cadena del PDB
-   **sampled_space_file**: XRW POR HACER
-   **move_distance**: (OBLIGATORIO) Traslación máxima que se hace en cada paso de la búsqueda Monte Carlo.
-   **box_size**: (OBLIGATORIO) Traslación máxima que puede haber desde el punto de partida del ligando.
-   **angle**: (OBLIGATORIO) Ángulo máximo de rotación que se hace en cada paso de la búsqueda Monte Carlo.
-   **temperature**: (OBLIGATORIO) Temperatura de Boltzmann de la simulación Monte Carlo.
-   **rmsd**: RMSD máximo que se muestrea respecto a la posición inicial.
-   **cycles**: (OBLIGATORIO) Número total de pasos que se hacen en la simulación Monte Carlo.
-   **repeats**: Número total de repeticiones de la simulación Monte Carlo que se hacen.
-   **optimize_until_score_is_negative**: Sigue muestreando más allá de "cycles" si la puntuación es positiva
-   **use_constraints**: Ajusta las puntuaciones según el archivo de restricciones de entrada
-   **use_main_model**: Usa el modelo de proteína de entrada principal, sea cual sea la puntuación
-   **cst_fa_file**: Archivo de restricciones de todos los átomos del que se leen las restricciones
-   **ensemble_proteins**: Archivo del que se leen las opciones del conjunto de proteínas
-   **cst_fa_weight**: Peso de las restricciones de todos los átomos. Por defecto es 1.0
-   **initial_perturb**: Hace una traslación y rotación iniciales sin puntuar. La traslación se elige de manera uniforme dentro de una esfera del radio dado (Å). Activa rotaciones de 360 grados.
-   **initial_angle_perturb**: Controla el tamaño de la perturbación rotacional mediante intitial_perturb. (Grados)
-   **grid_set**: El conjunto de Scoring Grid que se usa con la puntuación de Transform

---

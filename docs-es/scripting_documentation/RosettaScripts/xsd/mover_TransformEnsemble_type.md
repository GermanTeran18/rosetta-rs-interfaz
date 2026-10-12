<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Hace una búsqueda Monte Carlo del sitio de unión de un conjunto de ligandos usando rejillas de puntuación precalculadas. Reemplaza los movers Translate, Rotate y SlideTogether.

Referencias e información de autoría del mover TransformEnsemble:

Cita(s) de TransformEnsemble (Mover):
Fu DY, and Meiler J.  (2018).  RosettaLigandEnsemble: A Small-Molecule Ensemble-Driven Docking Approach.  ACS Omega 3(4):3655-64.  doi: 10.1021/acsomega.7b02059.

```xml
<TransformEnsemble name="(&string;)" chains="(&string;)"
        sampled_space_file="(&string;)" move_distance="(&real;)"
        box_size="(&real;)" angle="(&real;)" temperature="(&real;)"
        cycles="(&non_negative_integer;)" repeats="(1 &non_negative_integer;)"
        optimize_until_score_is_negative="(false &bool;)"
        use_main_model="(false &bool;)" use_conformers="(true &bool;)"
        ensemble_proteins="(&string;)"
        initial_perturb="(0.0 &non_negative_real;)"
        grid_set="(default &string;)" />
```

-   **chains**: (OBLIGATORIO) Cadenas del ligando, especificadas con los ID de cadena del PDB
-   **sampled_space_file**: XRW POR HACER
-   **move_distance**: (OBLIGATORIO) Traslación máxima que se hace en cada paso de la búsqueda Monte Carlo.
-   **box_size**: (OBLIGATORIO) Traslación máxima que puede haber desde el punto de partida del ligando.
-   **angle**: (OBLIGATORIO) Ángulo máximo de rotación que se hace en cada paso de la búsqueda Monte Carlo.
-   **temperature**: (OBLIGATORIO) Temperatura de Boltzmann de la simulación Monte Carlo.
-   **cycles**: (OBLIGATORIO) Número total de pasos que se hacen en la simulación Monte Carlo.
-   **repeats**: Número total de repeticiones de la simulación Monte Carlo que se hacen.
-   **optimize_until_score_is_negative**: Sigue muestreando más allá de "cycles" si la puntuación es positiva
-   **use_main_model**: Usa el modelo de proteína de entrada principal, sea cual sea la puntuación
-   **use_conformers**: Usa conformaciones del ligando durante el muestreo
-   **ensemble_proteins**: Archivo del que se leen las opciones del conjunto de proteínas
-   **initial_perturb**: Hace una traslación y rotación iniciales sin puntuar. La traslación se elige de manera uniforme dentro de una esfera del radio dado (Å). Activa automáticamente una rotación aleatoria de 360 grados
-   **grid_set**: El conjunto de Scoring Grid que se usa con la puntuación de TransformEnsemble

---

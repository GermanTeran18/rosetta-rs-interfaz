<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Da una bonificación a las estructuras secundarias especificadas por el usuario

```xml
<SetSecStructEnergies name="(&string;)" blueprint="(&string;)"
        ss_from_blueprint="(true &string;)" secstruct="(&dssp_string;)"
        use_dssp="(&bool;)" hh_pair="(&string;)" hh_pair_weight="(&real;)"
        ss_pair="(&string;)" ss_pair_weight="(&real;)" hss_triplets="(&string;)"
        scorefxn="(&string;)" add_symmetry="(&bool;)" natbias_ss="(&real;)"
        natbias_hh="(&real;)" natbias_hs="(&real;)" natbias_stwist="(&real;)"
        hs_pair="(&real;)" rsigma="(&real;)" hh_dist_wts="(&real;)"
        hh_dist="(&real;)" hh_dist_s2="(&real;)" hh_cross_angle_wts="(&real;)"
        hh_cross_angle="(&real;)" hh_cross_angle_s2="(&real;)"
        hs_atr_dist_wts="(&real;)" hs_atr_dist="(&real;)"
        hs_atr_dist_s2="(&real;)" hs_angle_wts="(&real;)" hs_angle="(&real;)"
        hs_angle_s2="(&real;)" hsheet_repl_dist="(&real;)"
        hh_align_angle_wts="(&real;)" hh_align_angle="(&real;)"
        hh_align_angle_s2="(&real;)" />
```

-   **blueprint**: Nombre del archivo blueprint que se usa para especificar la estructura secundaria
-   **ss_from_blueprint**: ¿Obtener la estructura secundaria del archivo blueprint?
-   **secstruct**: Cadena que especifica la estructura secundaria deseada de la Pose
-   **use_dssp**: ¿Usar DSSP para determinar la estructura secundaria ideal (si no se indica)? Si es false, se usa la estructura secundaria de la Pose
-   **hh_pair**: Cadena que especifica los emparejamientos de hélices
-   **hh_pair_weight**: Peso de los emparejamientos de hélices
-   **ss_pair**: Cadena que especifica los emparejamientos de hebras
-   **ss_pair_weight**: Peso de los emparejamientos de hebras
-   **hss_triplets**: Cadena que especifica los tripletes hélice-hebra-hebra
-   **scorefxn**: (OBLIGATORIO) Función de puntuación que se usa para puntuar la Pose
-   **add_symmetry**: Añade la definición de simetría a la Pose
-   **natbias_ss**: Sesgo nativo para los emparejamientos hebra-hebra
-   **natbias_hh**: Sesgo nativo para los emparejamientos hélice-hélice
-   **natbias_hs**: Sesgo nativo para los emparejamientos hélice-hebra
-   **natbias_stwist**: Sesgo nativo para la torsión de las hebras
-   **hs_pair**: Peso del término de puntuación hs_pair
-   **rsigma**: Peso del término de puntuación rsigma
-   **hh_dist_wts**: Pesos del término de distancia hélice-hélice
-   **hh_dist**: Distancia ideal entre hélices
-   **hh_dist_s2**: Varianza de la distancia ideal entre hélices
-   **hh_cross_angle_wts**: Pesos del término de ángulo de cruce hélice-hélice
-   **hh_cross_angle**: Ángulo de cruce ideal entre hélices
-   **hh_cross_angle_s2**: Varianza del ángulo de cruce entre hélices
-   **hs_atr_dist_wts**: Pesos del término de atracción hélice-hebra
-   **hs_atr_dist**: Distancia ideal hélice-hebra
-   **hs_atr_dist_s2**: Varianza de la distancia ideal hélice-hebra
-   **hs_angle_wts**: Pesos del término de ángulo hélice-hebra
-   **hs_angle**: Ángulo ideal hélice-hebra
-   **hs_angle_s2**: Varianza del ángulo ideal hélice-hebra
-   **hsheet_repl_dist**: Distancia hélice-lámina para NatbiasHelicesSheetPotential
-   **hh_align_angle_wts**: Pesos del término de alineamiento hélice-hélice
-   **hh_align_angle**: Ángulo ideal de alineamiento hélice-hélice
-   **hh_align_angle_s2**: Varianza del ángulo ideal de alineamiento hélice-hélice

---

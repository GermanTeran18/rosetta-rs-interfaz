<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Crea fragmentos a partir de una Pose suministrada.

```xml
<StructFragmentMover name="(&string;)"
        small_frag_size="(3 &non_negative_integer;)"
        large_frag_size="(9 &non_negative_integer;)"
        small_frag_file="(&string;)" large_frag_file="(&string;)"
        output_frag_files="(0 &bool;)" steal_small_frags="(0 &bool;)"
        steal_large_frags="(0 &bool;)" frag_weight_file="(&string;)"
        sequence_profile="(&string;)" vall_file="(&string;)"
        n_candidates="(1000 &non_negative_integer;)"
        n_frags="(200 &non_negative_integer;)" prefix="(structFrag &string;)"
        secstruct="(&string;)" use_dssp="(true &bool;)" />
```

-   **small_frag_size**: Fija el tamaño de los fragmentos pequeños
-   **large_frag_size**: Fija el tamaño de los fragmentos grandes
-   **small_frag_file**: Ruta al archivo de entrada de fragmentos pequeños (requiere también large_frag_file)
-   **large_frag_file**: Ruta al archivo de entrada de fragmentos grandes (requiere también small_frag_file)
-   **output_frag_files**: Escribe los archivos de fragmentos
-   **steal_small_frags**: Toma prestados fragmentos pequeños
-   **steal_large_frags**: Toma prestados fragmentos grandes
-   **frag_weight_file**: Ruta al archivo de pesos de entrada
-   **sequence_profile**: Ruta al perfil de secuencia de entrada
-   **vall_file**: Ruta al archivo vall (obligatorio cuando no se dan archivos de fragmentos)
-   **n_candidates**: Fija el número de candidatos
-   **n_frags**: Fija el número de fragmentos
-   **prefix**: Prefijo de los archivos de salida y de los fragmentos almacenados en el DataMap.
-   **secstruct**: Estructura secundaria
-   **use_dssp**: ¿Usar DSSP para determinar la estructura secundaria?

---

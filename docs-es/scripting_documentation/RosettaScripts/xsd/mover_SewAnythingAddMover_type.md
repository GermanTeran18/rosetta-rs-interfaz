<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
SEWING de un solo paso, solo con adición (add_only). Se pueden dar subelementos de E, L o H. Se pueden añadir subelementos Filter para filtrar segmentos.

```xml
<SewAnythingAddMover name="(&string;)" use_mt="(false &xs:boolean;)"
        use_absolute_sizes="(true &xs:boolean;)"
        use_relative_sizes="(false &xs:boolean;)" segment_file_path="(&string;)"
        even_sampling="(false &xs:boolean;)"
        permissible_segment_ends="(EHL &string;)"
        permissible_termini="(NC &string;)"
        max_attempts="(1000 &positive_integer;)"
        seg_attempts="(500 &positive_integer;)" seg_filters="(&string;)"
        post_filters="(&string;)" sort_metric="(&string;)"
        positive_metric_is_better="(false &xs:boolean;)"
        hashable_element_min_size="(4 &positive_integer;)"
        hashable_element_max_size="(40 &positive_integer;)"
        hashable_element_relative_min_size="(100 &positive_integer;)"
        hashable_element_relative_max_size="(100 &positive_integer;)"
        max_cter_len="(100 &positive_integer;)"
        max_nter_len="(100 &positive_integer;)" clash_radius="(4.0 &real;)"
        trim_terminal_loops="(true &xs:boolean;)"
        window_width="(4 &positive_integer;)"
        alignment_max_distance="(0.5 &real;)"
        clash_check_all_backbone_atoms="(false &xs:boolean;)"
        fail_on_no_match="(false &xs:boolean;)"
        clash_check_v2="(true &xs:boolean;)"
        allow_DSSP_insertion="(true &xs:boolean;)" />
```

-   **use_mt**: ¿Añadir MoltenTopology para los segmentos y la Pose final? Es útil al trabajar con láminas, para reducir los recálculos
-   **use_absolute_sizes**: considera los tamaños absolutos de los elementos hasheables
-   **use_relative_sizes**: considera los tamaños relativos de los elementos hasheables
-   **segment_file_path**: Ruta al directorio que contiene el archivo de segmentos. Ahora se pueden dar varias rutas, delimitadas por comas. También se puede usar el subbloque Segment. Obligatorio si no se usan subbloques.
-   **even_sampling**: ¿Hacer un muestreo uniforme al usar varios archivos de segmentos? Si es false, dominan los segmentos con más miembros.
-   **permissible_segment_ends**: Códigos DSSP de los extremos de segmento que se pueden hibridar
-   **permissible_termini**: Códigos DSSP de los extremos de segmento que se pueden hibridar
-   **max_attempts**: ¿cuántos intentos se pueden hacer por cada adición?
-   **seg_attempts**: ¿Cuántos intentos de segmento se pueden hacer si se usan filtros?
-   **seg_filters**: Lista opcional, delimitada por comas, de filtros definidos previamente que se ejecutan sobre cada segmento elegido antes de la quimerización.
-   **post_filters**: Lista opcional, delimitada por comas, de filtros definidos previamente que se ejecutan después de la quimerización. Probará todos los pares base y se detendrá cuando el filtro se supere.
-   **sort_metric**: RealMetric opcional que se usa para ordenar. Ordenará según todos los pares base. Si se combina con un filtro, solo ordena si el filtro se ha superado.
-   **positive_metric_is_better**: Si se ordena, ¿son mejores las puntuaciones positivas?
-   **hashable_element_min_size**: cuán cortos pueden ser los segmentos quiméricos finales
-   **hashable_element_max_size**: cuán largos pueden ser los segmentos quiméricos finales
-   **hashable_element_relative_min_size**: cuán cortos pueden ser los segmentos quiméricos finales respecto al segmento inicial
-   **hashable_element_relative_max_size**: cuán largos pueden ser los segmentos quiméricos finales respecto al segmento inicial
-   **max_cter_len**: Longitud máxima del elemento N-terminal
-   **max_nter_len**: Longitud máxima del elemento N-terminal
-   **clash_radius**: cuán cerca pueden estar dos átomos antes de que se registre un choque
-   **trim_terminal_loops**: ¿se crea un segment_file?
-   **window_width**: Número de residuos solapados que se necesita para que dos segmentos se consideren coincidentes. Se usa solo en SEWING sin hash (en SEWING con hash, lo determina la configuración del hasher usada al generar el archivo de aristas).
-   **alignment_max_distance**: distancia máxima en Å que puede haber entre cualquier átomo de los residuos del lado lejano de una ventana
-   **clash_check_all_backbone_atoms**: si se deben comprobar todos los átomos de la cadena principal de todos los residuos en la comprobación de choques
-   **fail_on_no_match**: ¿Se debe llamar a utility_exit si no se encuentran buenas coincidencias al final de max_attempts?
-   **clash_check_v2**: ¿Activar la comprobación de choques v2? Reduce el radio de choque E-E a 3.5.
-   **allow_DSSP_insertion**: deja que SEWING añada DSSP si lo necesita

---

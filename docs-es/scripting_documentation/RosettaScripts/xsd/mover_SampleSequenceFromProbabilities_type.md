<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Una clase para muestrear secuencias a partir de una PerResidueProbabilitiesMetric y enhebrarlas (thread) sobre la Pose.

Referencias e información de autoría del mover SampleSequenceFromProbabilities:

Autor(es) de SampleSequenceFromProbabilities (Mover):
Moritz Ertelt, University of Leipzig [moritz.ertelt@gmail.com]  (Escribió SampleSequenceFromProbabilities.)

```xml
<SampleSequenceFromProbabilities name="(&string;)" metric="(&string;)"
        pos_temp="(1 &real;)" aa_temp="(1 &real;)" prob_cutoff="(0.0001 &real;)"
        delta_prob_cutoff="(0 &real;)"
        max_mutations="(10000 &non_negative_integer;)" packing="(true &bool;)"
        use_cached_data="(false &bool;)" cache_prefix="(&string;)"
        cache_suffix="(&string;)" fail_on_missing_cache="(true &bool;)"
        task_operations="(&task_operation_comma_separated_list;)"
        packer_palette="(&named_packer_palette;)" />
```

-   **metric**: (OBLIGATORIO) Una PerResidueProbabilitiesMetric a partir de la cual calcular la pseudoperplejidad.
-   **pos_temp**: Temperatura de muestreo para elegir posiciones. Con T mayor que 1 es más determinista; con T menor que 1 aumenta la diversidad. Por defecto es 1
-   **aa_temp**: Temperatura de muestreo para elegir aminoácidos. Con T mayor que 1 es más determinista; con T menor que 1 aumenta la diversidad. Por defecto es 1
-   **prob_cutoff**: Corte de probabilidad de los aminoácidos que se consideran para el muestreo. Por defecto es 0.0001
-   **delta_prob_cutoff**: Corte de la diferencia de probabilidad (actual menos propuesta) de los aminoácidos que se consideran para el muestreo. Por defecto es 0 (al menos tan probable como el actual)
-   **max_mutations**: Número máximo de mutaciones permitidas. Por defecto es prácticamente ilimitado (10000)
-   **packing**: Si se hace algún empaquetado; si es false, el resultado son rotámeros básicos. Puede interesarte poner false si, por ejemplo, haces un relax después de este mover de todos modos. (Por defecto true)
-   **use_cached_data**: Usa los datos almacenados en la caché de datos que coincidan con el nombre de la métrica indicado (y con cualquier prefijo o sufijo). Los datos se almacenan durante la función apply de una SimpleMetric, que se llama durante RunSimpleMetrics
-   **cache_prefix**: Cualquier prefijo usado durante apply (RunSimpleMetrics), con el que se busca la coincidencia si use_cache es true
-   **cache_suffix**: Cualquier sufijo usado durante apply (RunSimpleMetrics), con el que se busca la coincidencia si use_cache es true
-   **fail_on_missing_cache**: Si use_cached_data es True y no se encuentra la caché, ¿debe fallar?
-   **task_operations**: Lista de TaskOperations a usar, separadas por comas.
-   **packer_palette**: Un PackerPalette definido previamente, que especifica el conjunto de tipos de residuo con los que diseñar (que luego se reduce con TaskOperations).

---

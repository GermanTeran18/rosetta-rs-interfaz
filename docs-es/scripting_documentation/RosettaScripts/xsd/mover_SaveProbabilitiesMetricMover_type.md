<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Una clase para guardar en un archivo de pesos las probabilidades de una PerResidueProbabilitiesMetric.

Referencias e información de autoría del mover SaveProbabilitiesMetricMover:

Autor(es) de SaveProbabilitiesMetricMover (Mover):
Moritz Ertelt, University of Leipzig [moritz.ertelt@gmail.com]  (Escribió SaveProbabilitiesMetricMover.)

```xml
<SaveProbabilitiesMetricMover name="(&string;)" metric="(&string;)"
        filename="(&string;)" filetype="(weights &string;)"
        use_cached_data="(false &bool;)" cache_prefix="(&string;)"
        cache_suffix="(&string;)" fail_on_missing_cache="(true &bool;)" />
```

-   **metric**: (OBLIGATORIO) Una PerResidueProbabilitiesMetric a partir de la cual calcular la pseudoperplejidad.
-   **filename**: (OBLIGATORIO) El nombre del archivo de pesos de salida donde se guardan las probabilidades.
-   **filetype**: El tipo de archivo de salida: un pssm de psi-blast (pssm), un archivo de pesos (weights) o ambos (both) (por defecto es weights)
-   **use_cached_data**: Usa los datos almacenados en la caché de datos que coincidan con el nombre de la métrica indicado (y con cualquier prefijo o sufijo). Los datos se almacenan durante la función apply de una SimpleMetric, que se llama durante RunSimpleMetrics
-   **cache_prefix**: Cualquier prefijo usado durante apply (RunSimpleMetrics), con el que se busca la coincidencia si use_cache es true
-   **cache_suffix**: Cualquier sufijo usado durante apply (RunSimpleMetrics), con el que se busca la coincidencia si use_cache es true
-   **fail_on_missing_cache**: Si use_cached_data es True y no se encuentra la caché, ¿debe fallar?

---

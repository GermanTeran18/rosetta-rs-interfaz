<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Hace una rotación aleatoria gruesa en todos los grados de libertad de rotación

```xml
<Rotate name="(&string;)" distribution="(&string;)" degrees="(&real;)"
        cycles="(&non_negative_integer;)" chain="(&string;)"
        tag_along_chains="(&string;)" grid_set="(default &string;)" />
```

-   **distribution**: (OBLIGATORIO) Distribución de muestreo; "uniform" o "gaussian"
-   **degrees**: (OBLIGATORIO) Cuántos grados se rota. Recomendado=360
-   **cycles**: (OBLIGATORIO) Número de ciclos. Recomendado: 1000
-   **chain**: ID de la cadena. DEBE ser una única cadena completamente conectada.
-   **tag_along_chains**: Lista de cadenas, separadas por comas, que se mueven junto con la cadena que rota, por ejemplo metales o agua.
-   **grid_set**: El conjunto de ScoringGrid que se usa para puntuar la rotación. Si no hay ninguna rejilla de puntuación en el XML, se usa una rejilla clásica por defecto.

---

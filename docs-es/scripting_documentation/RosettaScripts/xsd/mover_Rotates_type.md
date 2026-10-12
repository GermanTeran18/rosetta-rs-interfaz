<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Hace una rotación aleatoria gruesa en todos los grados de libertad de rotación.

```xml
<Rotates name="(&string;)" distribution="(&distribution_string;)"
        degrees="(&non_negative_integer;)" cycles="(&non_negative_integer;)"
        chain="(&string;)" chains="(&string;)" />
```

-   **distribution**: (OBLIGATORIO) Distribución de muestreo; "uniform" o "gaussian"
-   **degrees**: (OBLIGATORIO) Cuántos grados se rota. Recomendado=360
-   **cycles**: (OBLIGATORIO) Número de ciclos. Recomendado: 1000
-   **chain**: Cadena que se rota. No es compatible con la opción "chains".
-   **chains**: Lista de ID de cadena separados por comas. No es compatible con la opción "chain".

---

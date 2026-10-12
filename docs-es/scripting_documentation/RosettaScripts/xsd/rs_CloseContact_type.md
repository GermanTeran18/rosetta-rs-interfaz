<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Esta clase selecciona todos los residuos en contacto cercano con un residuo central, o con un conjunto de residuos centrales, donde la decisión se basa en las distancias entre átomos para el conjunto actual de coordenadas de la Pose

```xml
<CloseContact name="(&string;)" contact_threshold="(4.5 &real;)"
        residue_selector="(&string;)" >
    <Residue Selector Tag ... />
</CloseContact>
```

-   **contact_threshold**: La distancia, en Å, alrededor de los residuos del conjunto de residuos centrales que define el corte de contacto atómico
-   **residue_selector**: El nombre del selector de residuos que se usa para identificar el/los residuo(s) central(es); los demás residuos se seleccionan si están en contacto cercano con este grupo de residuos centrales. El nombre de un selector de residuos declarado previamente, o una expresión lógica con `AND`, `NOT` (`!`), `OR`, paréntesis y los nombres de selectores de residuos declarados previamente. Se acepta cualquier combinación de mayúsculas y minúsculas en `AND`, `NOT` y `OR`. Se puede usar un signo de exclamación en lugar de `NOT`. Los operadores booleanos tienen sus prioridades habituales: primero `NOT`, luego `AND` y luego `OR`. Por ejemplo, si se han declarado los selectores s1, s2 y s3, podrías escribir: `'s1 or s2 and not s3'`, que seleccionaría un residuo si lo selecciona s1, o si lo selecciona s2 pero no s3.


"Residue Selector Tag": Cualquiera de los [[ResidueSelectors]]

---

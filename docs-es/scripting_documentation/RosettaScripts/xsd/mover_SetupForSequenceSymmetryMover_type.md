<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Define las regiones de la proteína en las que se impone simetría de secuencia.

```xml
<SetupForSequenceSymmetryMover name="(&string;)"
        sequence_symmetry_behaviour="(&string;)" >
    <SequenceSymmetry residue_selectors="(&string;)" />
</SetupForSequenceSymmetryMover>
```

-   **sequence_symmetry_behaviour**: Nombre de la operación de tarea KeepSequenceSymmetry que define el comportamiento de simetría de secuencia deseado.


Subetiqueta **SequenceSymmetry**:   

-   **residue_selectors**: Lista, separada por comas, de selectores de residuos seleccionados que definen la simetría de secuencia. Los residuos de cada selector de la lista quedan enlazados. Todos los selectores de residuos de la lista deben ser equivalentes.

---

<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Escribe PSIPRED y/o DSSP en un silent file como REMARK, o en el PDB si la opción -pdb_comments está en true.

```xml
<WriteSSEMover name="(&string;)" cmd="(&string;)" dssp="(false &bool;)"
        write_phipsi="(false &bool;)" />
```

-   **cmd**: Ruta a PSIPRED. Si no se indica, psipred no se ejecuta
-   **dssp**: Ponlo en true para obtener la predicción de DSSP (por defecto es false)
-   **write_phipsi**: Si es true, escribe los ángulos phi-psi

---

<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
El ChainSelector pone en true las posiciones correspondientes a todos los residuos del conjunto de cadenas dado, y en false todas las demás posiciones.

```xml
<Chain name="(&string;)" chains="(&chain_cslist;)" />
```

-   **chains**: La cadena dada en la opción "chains" debe ser una lista de identificadores de cadena separados por comas. Cada identificador de cadena debe ser un entero, con lo que se usa el índice de cadena de la Pose, o un solo carácter, con lo que se puede usar el ID de cadena del PDB.

---

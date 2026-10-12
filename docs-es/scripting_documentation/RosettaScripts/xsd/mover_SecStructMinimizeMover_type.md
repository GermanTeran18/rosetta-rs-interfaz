<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Un mover de minimización que busca en un espacio diedro de menor dimensión para encontrar motivos de estructura secundaria repetidos.

```xml
<SecStructMinimizeMover name="(&string;)" alpha_beta_pattern="(A &string;)"
        constrain="(false &bool;)" dihedral_pattern="(A &string;)"
        scorefxn="(&string;)" />
```

-   **alpha_beta_pattern**: Una cadena que define la «estructura de torsión de la cadena principal» del heteropolímero de interés. Si trabajas con un motivo de tres residuos alfa seguidos de un residuo beta, por ejemplo, la cadena que debes poner aquí es AAAB.
-   **constrain**: Restringe a los valores de entrada para evitar un movimiento excesivo.
-   **dihedral_pattern**: Una cadena que define el patrón de ángulos diedros deseado. Por ejemplo, si tienes un péptido todo alfa, pero quieres exigir que las unidades peptídicas adyacentes tengan diedros distintos, alternándose a lo largo de la cadena, la cadena que debes poner aquí es AB.
-   **scorefxn**: Nombre de la función de puntuación a usar

---

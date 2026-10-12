# Filtro ConstraintScore
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ConstraintScore

Calcula la puntuación de un conjunto específico de restricciones generadas por Constraint Generators.  Este filtro hace una copia del Pose y borra todas las restricciones de la copia. Luego usa los Constraint Generators indicados para generar un conjunto de restricciones y puntúa el Pose con una función de puntuación básica.  Esta función de puntuación básica consta solo de términos de puntuación de restricciones.

Los Constraint Generators especificados deben haberse definido previamente en un [[AddConstraints|AddConstraintsMover]].

```xml
<ConstraintScore name="(&string)" constraint_generators="('', &string)" threshold="(0 &Real)" />
```

-   **constraint_generators** - Nombres de los generadores de restricciones que se usan para generar las restricciones. Los Constraint Generators especificados aquí deben haberse definido previamente en un mover [[AddConstraints|AddConstraintsMover]].
-   **threshold** - Si la puntuación de restricciones calculada es menor o igual que este valor, el filtro devuelve true. En caso contrario, devuelve false.

## Véase también

* [[AddConstraintsMover]]
* [[RemoveConstraintsMover]]

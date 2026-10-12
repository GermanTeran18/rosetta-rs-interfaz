# ResidueCount

Documentación actualizada por última vez el 17 de noviembre de 2017 por Vikram K. Mulligan (vmullig@uw.edu).

*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## ResidueCount

Filtra estructuras según el número total de residuos de la estructura.

```xml
<ResidueCount name="(&string)" max_residue_count="(Inf &Integer)" min_residue_count="(0 &Integer)" residue_types="('' &string)" count_as_percentage="(0 &Bool)" residue_selector="selector" />
```

-   residue\_types: lista separada por comas de nombres de tipos de residuo (p. ej., "CYS,SER,HIS\_D" ). Solo se contarán los residuos cuyos nombres de tipo coincidan con los de la lista.
-   include\_property:  lista separada por comas de propiedades (p. ej., "HYDROPHOBIC,ALIPHATIC").  Se contarán los residuos que tengan cualquiera de estas propiedades.
-   max\_residue\_count: ¿El número total de residuos es menor o igual que el recuento máximo permitido de residuos?
-   min\_residue\_count: ¿El número total de residuos es mayor o igual que el recuento mínimo permitido de residuos?
-   count\_as_percentage: si es true, cuenta los residuos como porcentaje (=100\*número_bruto_del_residuo_especificado/residuos_totales) en lugar de contar su número bruto; además, se supone que max_residue_count/min_residue_count se introducen como porcentaje
-   residue_selector: nombre de un selector de residuos que define un subconjunto de residuos sobre el que se hace el cálculo. Por defecto son todos los residuos.
-   task_operations: define el subconjunto de residuos sobre el que se hace el cálculo; por defecto solo se comprueban los residuos diseñables
-   packable: V/F, cuenta también los residuos reempaquetables en task_operations

Esto es útil cuando los protocolos pueden generar estructuras muy grandes, p. ej., con protocolos de ensamblaje simétrico o modular que pueden ser demasiado grandes para manejarse con los recursos computacionales disponibles.

Ten en cuenta que este filtro usa lógica _OR_ para la selección: es decir, se contará cualquier residuo que coincida con cualquiera de los tipos o propiedades enumerados.  Un residuo que coincida con más de un tipo o propiedad se contará solo una vez.  (Por ejemplo, si se da "THR" como tipo y "POLAR,ALPHA_AA" como propiedad, cada treonina se contará una vez, aunque coincida con el tipo y con las dos propiedades.  También se contará todo lo que coincida con al menos uno de ellos, por ejemplo la beta-3-lisina, ya que es polar a pesar de no ser un alfa-aminoácido.)

## Véase también

* [[LoadPDBMover]]

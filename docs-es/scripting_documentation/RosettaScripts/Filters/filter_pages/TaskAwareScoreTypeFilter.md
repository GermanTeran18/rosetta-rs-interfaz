# TaskAwareScoreType
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## TaskAwareScoreType  (antes AverageInterfaceEnergy)

Toma operaciones de tarea para determinar los residuos empaquetables y luego calcula o filtra según las puntuaciones de esos residuos en uno de tres modos posibles:
1) total: la puntuación total de todos los residuos empaquetables
2) average: la puntuación promedio de todos los residuos empaquetables
3) individual: las puntuaciones de cada residuo individual (en el modo individual, cada residuo debe superar el umbral definido por el usuario para que el filtro pase).
En cada modo, el tipo de puntuación que se usa para evaluar la puntuación lo fija el usuario (por defecto es total_score).

```xml
<TaskAwareScoreType name="(&string)" task_operations="(&comma-delimited list of taskoperations)" scorefxn="(score12 &string)" score_type="(total_score &string)" threshold="(100000 &Real)" mode="(total &string)", unbound="(0 &bool)", sym_dof_names="(&comma-delimited list of strings)", jump="(0 &Size)", write2pdb="(0 &bool)", bb_bb="(0 &bool)" />
```

-   task\_operations: operaciones de tarea que se usan para fijar los residuos reempaquetables
-   scorefxn: función de puntuación que se usa en los cálculos de energía. Por defecto es score12
-   score\_type: término de puntuación que se usa en los cálculos. Por defecto es total_score.
-   threshold: umbral del valor más alto permitido para que un diseño pase.  Nota: con mode="individual", este es el umbral de puntuación que cada residuo individual debe superar para que el filtro pase.  Por ejemplo, el usuario podría fijar threshold=3.5, score\_type=fa\_rep y mode=individual para comprobar si todos los residuos empaquetables tienen una puntuación fa\_rep menor que 3.5.  El valor que se informa con mode=individual es el número de residuos que fallan.
-   mode: este filtro puede operar en tres modos.  Las opciones son "total", "average" o "individual".  Si mode=total, se devuelve la puntuación total de los residuos empaquetables y el umbral se refiere a ese valor total.  Si mode=average, se devuelve la puntuación promedio de los residuos empaquetables y el umbral se refiere a ese valor promedio.  Si mode=individual, cada residuo empaquetable se evalúa de forma individual y el umbral se refiere a esos valores individuales; en este caso, cada residuo debe pasar para que el filtro pase. Por ejemplo, el usuario podría fijar threshold=3.5, score_type=fa\_rep y mode=individual para comprobar si todos los residuos empaquetables tienen una puntuación fa_rep menor que 3.5.  El valor que informa el filtro con mode=individual es el número de residuos que fallan.
-   bb\_bb: véase EnergyPerResidueFilter.
-   unbound: por defecto es false.  Ponlo en true si quieres que las puntuaciones se evalúen en el estado no unido.  Si unbound es true, el usuario debe dar sym\_dof\_names o el jump a lo largo del cual se separa el Pose.
-   sym\_dof\_names: para usar con la opción unbound.  ¿Qué sym_dofs deben usarse para separar el Pose?
-   jump: para usar con la opción unbound.  ¿Qué jump debe usarse para separar el Pose?  
-   write2pdb: solo para usar con mode=individual.  Por defecto es false.  Si es true, las puntuaciones individuales se escribirán al final del pdb.

## Véase también

* [[Tipos de puntuación|rosetta_basics/scoring/score-types]]
* [[Diseño en Rosetta|application_documentation/design/design-applications]]
* [[Operaciones de tareas|TaskOperations-RosettaScripts]]
* [[EnergyPerResidueFilter]]
* [[PackRotamersMover]]
* [[ScoreTypeFilter]]

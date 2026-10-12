# BindingStrain
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## BindingStrain

Calcula la tensión energética de un monómero unido. Respeta la simetría automáticamente.

```xml
<BindingStrain name="(&string)" threshold="(3.0 &Real)" task_operations="(comma-delimited list of operations &string)" scorefxn="(score12 &string)" relax_mover="(null &string)" jump="(1 &Int)"/>
```

-   threshold: cuánta tensión se permite.
-   task\_operations: definen la región que se reempaqueta. Elijas lo que elijas, el filtro se asegura de que no se haga diseño y de que la tarea del packer se inicialice desde la línea de comandos.
-   scorefxn: qué scorefxn se usa para el reempaquetado y las evaluaciones de la puntuación total.
-   relax\_mover: después de reempaquetar en el estado no unido, qué mover (si se usa alguno) se emplea para relajar más la estructura (¿MinMover?).
-   jump: a lo largo de qué jump se disocia el complejo.

Disocia el complejo y toma la energía no unida. Luego reempaqueta, llama al mover de relax y mide la energía no unida relajada. Informa la tensión como no unida - no unida\_relajada. Potencialmente útil para aliviar la tensión en la unión.

## Véase también

* [[Docking proteína-proteína|docking-protocol]]
* [[ResInInterfaceFilter]]
* [[SpecificResiduesNearInterfaceFilter]]

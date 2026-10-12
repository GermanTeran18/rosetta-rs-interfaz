#MultistageRosettaScripts

#Multistage Rosetta Scripts

[[_TOC_]]

###Descripción

Los Rosetta Scripts tradicionales no tienen una interfaz integrada
que permita al usuario filtrar trayectorias según su posición global en un ranking.
En su lugar, dependen de umbrales de filtrado predeterminados.
Predecir el umbral correcto sin ejecutar antes el script puede ser difícil,
por lo que en la práctica estos umbrales de filtrado tienden a ser conservadores.
Multistage Rosetta Scripts (M.R.S.) permite filtrar después de cada «stage» (etapa)
según la posición global de una trayectoria, usando la métrica que elijas.

En lugar de ejecutar cada trayectoria de rosetta script de forma aislada,
M.R.S. divide la trayectoria en stages, como se muestra a continuación.
Cada stage se ejecuta hasta el final para todas las trayectorias antes de empezar el siguiente.
Esto da a Rosetta la capacidad de ordenar los resultados por una puntuación definida por el usuario
y filtrar según la posición global.

![Animación de MRS](https://www.rosettacommons.org/docs/wiki/images/multistage_rosetta_scripts/MRSMovieFast.gif)

###[[Jerga|Jargon]]

###[[Formato XML|XML]]

###[[Opciones de Stage|StageOptions]]

###[[Cómo compilar y ejecutar M.R.S.|RunningMRS]]

###[[Herramientas y utilidades|MRSTools]]

##Funciones adicionales

[[Agrupamiento entre stages|MRSClustering]]

[[Checkpointing|MRSCheckpointing]]

##Ejemplos
[[Ejemplo de PDBList|PDBListExample]]:
Cómo enviar structures usando un pdblist en lugar de
tener un montón de etiquetas `<Job>` separadas.

[[Relax por lotes|BatchRelaxExample]]:
Ahorra tiempo dividiendo FastRelax en varios stages.

[[Sobrecarga del DataMap|OverloadExample]]:
Cómo declarar un objeto predeterminado en `<Common>` y
reemplazarlo para ciertas trayectorias definiendo otro objeto en `<Job>`

[[Máquina del tiempo|TimeMachineExample]]:
Cómo ver las estructuras intermedias de tu ejecución
después de que haya terminado.

##Véase también

* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

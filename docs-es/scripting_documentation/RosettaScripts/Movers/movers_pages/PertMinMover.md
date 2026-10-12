# PertMinMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PertMinMover

[[include:mover_PertMinMover_type]]

Este mover se basa en el enfoque de Davey & Chica, Proteins 82:771-784 https://onlinelibrary.wiley.com/doi/full/10.1002/prot.24457

En resumen, explora el espacio conformacional local mediante una pequeña perturbación cartesiana aleatoria de las coordenadas atómicas, seguida de una minimización de energía. En un paisaje de energía rugoso, incluso pequeñas variaciones en la posición inicial pueden cambiar mucho la trayectoria de la minimización y el resultado final, lo que da lugar a una búsqueda conformacional local (consulta la Fig. 2 de Davey & Chica).

A diferencia del enfoque de Davey & Chica, que usaba una perturbación fija de +/- 0.001 Å en el archivo PDB, este mover te permite variar el tamaño y la distribución de la perturbación, ya sea aplicando un desplazamiento elegido de forma uniforme dentro de una esfera de un radio dado (el valor por defecto), o procedente de una distribución gaussiana con simetría esférica y una desviación estándar dada (que favorece los desplazamientos pequeños, aunque permite otros mucho mayores).

Qué átomos se perturban puede controlarse con el ResidueSelector proporcionado (por defecto, todos los residuos del sistema) y con la opción sc_only. Qué grados de libertad pueden moverse durante la minimización puede controlarse con la especificación de MoveMap proporcionada.


##Véase también

* [[MinMover]]: hace minimización sin perturbación
* [[Minimization overview]]
* [Tutorial de minimización](https://www.rosettacommons.org/demos/latest/tutorials/minimization/minimization)
* [[I want to do x]]: guía para elegir un mover

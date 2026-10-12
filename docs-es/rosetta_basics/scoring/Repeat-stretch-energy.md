# Energía de tramos repetidos (aa_repeat_energy)
Documentación de Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker.
Última modificación: 4 de noviembre de 2017.

## Descripción del término de puntuación
El término de tramos repetidos (**aa_repeat**) es una energía de cuerpo completo que asigna una penalización a un Pose según su secuencia.  En concreto, penaliza los tramos largos en los que el mismo tipo de residuo se repite una y otra vez (p. ej. secuencias poli-Q).  Por ahora solo es útil para filtrar un diseño tras una ejecución de empaquetado, pero el objetivo final es que funcione con una forma modificada del packer que permita empaquetar con términos de puntuación no descomponibles por pares que se puedan calcular rápidamente.

## Uso típico
El término de puntuación **aa_repeat_energy** se puede añadir a cualquier función de puntuación existente (*p. ej.* **ref2015.wts**) y debería funcionar «de inmediato» con aminoácidos canónicos y no canónicos.  Impone una penalización por cada tramo de aminoácidos repetidos, con un valor de penalización que depende de forma no lineal de la longitud del tramo repetido.  Por defecto, los tramos de 1 o 2 residuos no tienen penalización, los de 3 residuos tienen una penalización de +1, los de 4 residuos, una de +10, y los de 5 residuos o más, una de +100.  Como el término se basa en la secuencia, en realidad solo es útil para el diseño; es decir, impondrá una penalización idéntica a un Pose de secuencia fija, sea cual sea su conformación.  Esto también significa que el término no tiene derivadas conformacionales: el minimizador lo ignora por completo.  El término no es descomponible por pares, pero se ha hecho compatible con el packer, de modo que puede dirigir la composición de la secuencia durante una ejecución del packer.

## Control de los valores de penalización
La penalización asignada a un tramo de N residuos repetidos se determina a partir de un archivo de la base de datos.  Por defecto, el archivo que se usa es:
```
database/scoring/score_functions/aa_repeat_energy/default_repeat_penalty_table.rpt_pen
```
Así es este archivo:
```
# The series of numbers below indicates the penalty for having 1, 2, 3, etc. of the same residue in a row.
# Zero residues (empty poses) are not penalized.  More than the number of residues listed results in the 
# last penalty being imposed.  (For example, in this file, a repeat stretch of more than five residues will
# be given a penalty of 100).
0.0 0.0 1.0 10.0 100.0
```
Las líneas que empiezan con un signo de almohadilla (**#**) se ignoran.  La línea relevante es la fila de números, que representan la penalización para un tramo de 1, 2, 3, 4 o 5 residuos.  A los tramos de más de 5 residuos se les asigna la penalización del tramo de 5 residuos.  El usuario puede proporcionar un archivo **.rpt_pen** personalizado con la opción ```-aa_repeat_energy_penalty_file <filename>```.  Los archivos **.rpt_pen** personalizados pueden tener tantos valores de penalización como desee el usuario (*es decir*, los tramos de 5 residuos no son el límite).  A los tramos más largos que el más largo especificado se les asignará la penalización dada al más largo especificado.

## Organización del código
- El método de puntuación vive en ```core/scoring/methods/AARepeatEnergy.cc``` y ```core/scoring/methods/AARepeatEnergy.hh```.
- La energía de cuerpo completo se evalúa mediante la función ```AARepeatEnergy::finalize_total_energy()```, que recibe un Pose como entrada.
- Esta función llama a ```AARepeatEnergy::calculate_aa_repeat_energy()```, que recibe como entrada un vector de punteros propietarios const a objetos **Residue** y devuelve un valor de energía de todo el Pose.  El código externo puede llamar a esta función.
- Hay una prueba unitaria en ```source/test/core/scoring/methods/AARepeatEnergy.cxxtest.hh```.  Esta prueba primero puntúa la miniproteína trp cage, que tiene una secuencia con una repetición de tres prolinas.  Luego añade secuencias repetidas de polialanina al final de la trp cage y repite la puntuación, confirmando que cada vez se obtiene el valor de puntuación esperado.

## Véase también
* [[AACompositionEnergy]]
* [[NetChargeEnergy]]
* [[BuriedUnsatPenalty]]
* [[HBNetEnergy]]
* [[VoidsPenaltyEnergy]]
* [[Design-centric guidance terms|design-guidance-terms]]

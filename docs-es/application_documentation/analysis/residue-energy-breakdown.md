#Desglose de energía por residuo

Metadatos
========

Este documento fue editado el 9 de agosto de 2013 por Rocco Moretti. Esta aplicación fue creada y documentada por Rocco Moretti, et al.

Descripción del algoritmo
========================

A veces uno quiere saber cómo se desglosa la energía de la estructura en las interacciones entre los distintos residuos. (Por ejemplo, qué dos residuos dan una puntuación alta de choque/repulsión, o si un puente salino concreto aporta a la puntuación tanto como crees.) Esta utilidad toma uno o más archivos de estructura (pdb o silent files) y entrega, como un scorefile separado por espacios en blanco, el desglose residuo por residuo término por término de la puntuación. También se incluyen las energías «de un cuerpo» de cada residuo, que incluyen la interacción «de dos cuerpos» del residuo consigo mismo.

Si no se necesitan las interacciones individuales entre pares de residuos, la aplicación per\_residue\_energies entrega una tabla de puntuaciones similar en la que las energías se suman a nivel de residuo. (Similar a la tabla de puntuación por residuo que aparece al final de un PDB de Rosetta, pero en un formato cómodo.)

Limitaciones y advertencias
=======================

La numeración de residuos en la salida sigue el esquema interno («numeración del Pose»), y no la numeración de tipo PDB.

Aunque la puntuación total (ponderada) debería ser igual a la suma de los términos individuales, y las energías (ponderadas) por residuo (por ejemplo, las que se reportan en el PDB de salida anotado o con la utilidad per\_residue\_energies) deberían ser la suma de las energías de un cuerpo reportadas y la mitad de la suma de las energías de pares de residuos reportadas, los errores de redondeo pueden hacer que estas sumas no coincidan. Además, aunque se reportan los términos de energía más comunes, por ahora la aplicación puede no reportar con exactitud los resultados de términos de energía calculados en contextos de «estructura completa».

Entrada
=====

Respeta las opciones de entrada estándar (por ejemplo, -in:file:s, -in:file:silent, etc.). Se pueden especificar varias estructuras de entrada.

El nombre del archivo de salida se especifica con -out:file:silent

Los archivos de pesos de la función de puntuación se especifican con -score:weights y -score:patch, como de costumbre.

Salida
===============

Una tabla separada por espacios en blanco con el desglose *ponderado* de la puntuación. La numeración de residuos está en el formato secuencial interno («numeración del Pose»). Cada par de residuos aparece una vez, con el residuo de número menor como residuo 1. Para las energías de un cuerpo, el segundo residuo aparece como «--», con el tipo «onebody».

Ejemplo de salida:

```
SCORE:     pose_id      resi1    restype1      resi2    restype2     fa_atr     fa_rep     fa_sol    fa_intra_rep   ...        ref      total   description
SCORE:  input.pdb       1          MET          --      onebody       0.000      0.000      0.000           0.003   ...     -0.340      0.480   input.pdb_1_onebody
SCORE:  input.pdb       2          ASP          --      onebody       0.000      0.000      0.000           0.003   ...     -0.670     -0.132   input.pdb_2_onebody
...
SCORE:  input.pdb       1          MET           2          ASP      -0.715      0.059      0.870           0.000   ...      0.000      0.214   input.pdb_1_2
SCORE:  input.pdb       1          MET           3          MET      -0.430      0.000      0.287           0.000   ...      0.000     -0.143   input.pdb_1_3
```

Líneas de comandos
====================

Comando de ejemplo:

```
residue_energy_breakdown.linuxgccrelease -database ~/rosetta/main/database -in:file:s input.pdb -out:file:silent energy_breakdown.out
```

Ejemplo
=======

Consulta la prueba de integración en rosetta/main/tests/integration/tests/residue\_energy\_breakdown para ver un ejemplo.


##Véase también

* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta


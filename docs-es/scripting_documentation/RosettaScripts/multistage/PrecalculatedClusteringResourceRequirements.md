#MultistageRosettaScripts

#Uso de recursos del agrupamiento precalculado

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

- Escrito por Jack Maguire; envía tus preguntas a jackmaguire1444@gmail.com
- Toda la información de aquí es válida a fecha del 15 de febrero de 2018

[[_TOC_]]

Medí casos de agrupamiento de distintos tamaños en el ordenador Wiggins del laboratorio Kuhlman.
Para cada caso, medí cuánto tardó y el uso máximo de memoria (ambos se muestran abajo).
El número de clústeres fue siempre igual al número de elementos dividido entre diez.

Como puedes ver, los requisitos de memoria se vuelven poco razonables antes que los de tiempo de ejecución.
Esto se debe a la matriz de N por N que se calcula;
ojalá haya una implementación sobre la marcha de este protocolo para cuando leas esto.
Por ahora, parece que no convendría agrupar mucho más de 10,000 elementos.

##Tiempo de ejecución

[[/images/multistage_rosetta_scripts/ClusterRuntime.png]]

Usando los datos ajustados, podemos predecir:

| Número de elementos | Segundos   | Minutos | Horas  | Días  | Años  |
|:-------------------:|:----------:|:-------:|:------:|:-----:|:-----:|
| 10                 | 0.00005    |         |        |       |       |
| 100                | 0.005      |         |        |       |       |
| 1000               | 0.5        |         |        |       |       |
| 10,000             | 50         |    0.8  |        |       |	     |
| 100,000            | 5000       |    83.3 |  1.4   | 0.1   |	     |
| 1,000,000          | 500,000    | 8333.3  | 138.9  | 5.8   |	     |
| 10,000,000         | 50,000,000 | 833,333 | 13,889 | 578.7 | 1.6   |

##Uso de memoria

[[/images/multistage_rosetta_scripts/ClusterMemoryUsage.png]]

Usando los datos ajustados, podemos predecir:

| Número de elementos | KB    | MB    | GB    |
|:-------------------:|:-----:|:-----:|:-----:|
| 10 	    	     | 74757 | 75    | 0.075 |
| 100		     | 74973 | 75    | 0.075 |
| 1000		     | 78824 | 78.8  | 0.079 |
| 10,000	     |       | 286.6 | 0.29  |
| 20,000	     |	     | 878.5 | 0.88  |
| 30,000	     |	     | 1850  | 1.85  |
| 40,000	     |	     | 3202  | 3.20  |
| 50,000	     |	     | 4934  | 4.93  |
| 100,000	     |	     |       | 19.3  |
| 1,000,000	     |	     | 	     | 1902  |


#Algoritmos de modelado de loops usados en Rosetta

-  [[CCD|loopmodel-ccd]]: inserción de fragmentos con descenso cíclico de coordenadas para cerrar rupturas de cadena

-  [[KIC|loopmodel-kinematic]]: cierre cinemático inspirado en la robótica combinado con muestreo aleatorio de las torsiones del loop que no son pivote a partir del espacio de Ramachandran

-  [[KIC de próxima generación|next-generation-KIC]]: versión refinada de KIC; usa muestreo de omega, distribuciones de Ramachandran dependientes de los vecinos y aumento gradual de los términos de energía rama y fa_rep para lograr un mayor rendimiento en la reconstrucción de loops y aumentar el muestreo de conformaciones por debajo del Angstrom (algoritmo recomendado si no hay datos de fragmentos)

-  [[KIC con fragmentos|KIC_with_fragments]]: modelado de loops basado en fragmentos con cierre cinemático; combina el poder de muestreo de KIC y los grados de libertad phi/psi/omega acoplados de los datos de fragmentos de proteína para lograr un mayor rendimiento en la reconstrucción de loops y el mejor muestreo hasta ahora de conformaciones por debajo del Angstrom (algoritmo recomendado si hay datos de fragmentos)
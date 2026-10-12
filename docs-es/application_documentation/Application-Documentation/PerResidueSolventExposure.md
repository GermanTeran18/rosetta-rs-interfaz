# Exposición al solvente por residuo

Creadores:
* Melanie Aprahamian (aprahamian.4@osu.edu)
* Investigador principal: Steffen Lindert (lindert.1@osu.edu)

Fecha de creación: 16 de enero de 2019

Una forma de cuantificar la exposición al solvente por residuo es observar su número relativo de vecinos. La aplicación `per_residue_solvent_exposure.cc` utiliza varios métodos distintos para calcular y escribir el número de vecinos de cada residuo. La aplicación contiene dos formas principales de calcular el número de vecinos: centroid o todos los átomos (full atom, FA). Dentro de cada una hay varios métodos distintos para calcular el número de vecinos. 

NOTA: esta aplicación es una versión actualizada y más completa de la aplicación `burial_measure_centroid`.

### Centroid
Calcular el número de vecinos en modo centroid representará cada cadena lateral como un único punto, un centroid ([Centroid](https://www.rosettacommons.org/docs/wiki/rosetta_basics/Glossary/Glossary#c)). El número de vecinos se puede calcular entonces con el método "sphere" (esfera) o con el método "cone" (cono).

El método "sphere" cuenta el número de residuos alrededor del residuo objetivo y pondera el recuento con una función logística definida como **neighbor count = 1/(1+exp(distance_steepness * (d - distance_midpoint))**
donde **d** es la distancia calculada entre el CEN del residuo objetivo y el CEN del residuo vecino, **distance_steepness** define la pendiente de la curva y **distance_midpoint** define el punto medio de la curva.

El método "cone" se adaptó del ResidueSelector [LayerSelector](https://www.rosettacommons.org/docs/wiki/scripting_documentation/RosettaScripts/ResidueSelectors/ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_layerselector). Calcula el número de vecinos ponderando no solo por la distancia al residuo objetivo, sino también por el ángulo formado entre el objetivo y el vecino. El número total de vecinos se determina tomando el producto de la distancia y el ángulo, que se definen de la siguiente manera:

**distance_factor = 1/(1+exp(distance_steepness * (d - distance_midpoint))** donde **d** es la distancia calculada entre el CEN del residuo objetivo y el CEN del residuo vecino, **distance_steepness** define la pendiente de la curva y **distance_midpoint** define el punto medio de la curva.

**angle_factor = 1/(1+exp(angle_steepness * (theta - angle_midpoint))** donde **theta** es el ángulo calculado entre los vectores (CA objetivo - CEN objetivo) y (CA objetivo - CEN vecino), **angle_steepness** define la pendiente de la curva y **angle_midpoint** define el punto medio de la curva.

### Todos los átomos (FA)
Calcular el número de vecinos en modo FA es idéntico al modo centroid, pero en lugar de usar la representación centroid se usa la representación con todos los átomos. Se usan los mismos métodos "sphere" y "cone" definidos arriba, pero se pueden dividir en submétodos más pequeños:
* Número de vecinos del residuo
 * Método sphere con el átomo más cercano (CA objetivo al átomo más cercano del vecino)
 * Método sphere con el átomo CB (CA objetivo al CB del vecino)
 * Método cone con el átomo más cercano (distancia = CA al más cercano, ángulo entre CA-CB y CA-más cercano)
 * Método cone con el átomo CB (distancia = CA a CB, ángulo entre CA-CB y CA-CB)

Calcula el número de vecinos del residuo para la amida de la cadena principal (N-H en lugar de CA-CB) añadiendo la opción "-bbamide" cuando uses el método "cone". (No está disponible al ejecutar en modo centroid ni en modo de átomo más cercano).

Los distintos métodos se pueden especificar mediante opciones de línea de comandos al ejecutar la aplicación.

### Uso
Para usar la aplicación, se pueden especificar las siguientes opciones de línea de comandos:
```
-in:file:s                pdb file(s) to calculate solvent exposure for
-centroid_version         use flag if centroid mode is desired (FA is default)
-in:file:centroid         use this flag if centroid mode calculations are being done!
-neighbor_closest_atom    use flag if FA calculation requires the nearest neighbor (default behavior is to use CB)
-solvent_exposure:method  use flag to set the neighbor count method to "sphere" (default) or "cone"
-dist_midpoint            midpoint of distance calculation (default = 9.0)
-dist_steepness           steepness of distance calculation curve (default = 1.0)
-angle_midpoint           midpoint of angle calculation (default = pi/4)
-angle_steepness          steepness of angle calculation curve (default = 2pi)
-bbamide                  use N-H instead of CA-CB vector (only in FA mode, not with -neighbor_closest_atom)
```

La salida esperada se escribirá en un archivo y enumerará los números de residuo y su respectivo número de vecinos.

### Ejemplo

```
./per_residue_solvent_exposure.linuxgccrelease -in:file:s 1dwr_A.pdb
```
# Filtros de GeneralizedKIC

[[Volver a RosettaScripts|RosettaScripts]]

## Visión general
Los filtros de [[GeneralizedKIC]] son evaluaciones que se realizan rápidamente, con bajo costo computacional, sobre las soluciones cerradas que encuentra el algoritmo de cierre cinemático, de modo que las soluciones deficientes puedan descartarse rápidamente antes de aplicar selectores computacionalmente costosos.

## Uso dentro de RosettaScripts
La invocación totalmente manual de un filtro en RosettaScripts se hace según la plantilla siguiente. En la mayoría de los casos, sin embargo, existen atajos para filtros específicos. Se describen en la sección de [[atajos|GeneralizedKICfilter#Shorthands]].

```xml
<GeneralizedKIC ...>
     ...
     <AddFilter type="&string">
          <AddFilterParameterString value="&string" name="&string" />
          <AddFilterParameterInteger value="(&int)" name="&string" />
          <AddFilterParameterBoolean value="(&bool)" name="&string" />
          <AddFilterParameterReal value="(&Real)" name="&string" />
     </AddFilter>
     ...
</GeneralizedKIC>
```

## Tipos de filtros

1.  Comprobación de choques del loop (**type="loop_bump_check"**)<br/>Aplica una comprobación de choques muy sencilla y de baja exigencia a cada solución encontrada, descartando las soluciones con choques evidentes. La comprobación se hace en dos pasos. Primero, se comprueba cada átomo de la cadena de átomos que se va a cerrar contra todos los demás (ignorando los choques entre átomos del mismo residuo o de residuos adyacentes). Segundo, se comprueba cada átomo de la cadena de átomos que se va a cerrar contra todos los átomos de la cadena principal (y, en el caso de alfa- y beta-aminoácidos, los átomos de carbono beta) de todos los residuos que _no_ están en el loop que se va a cerrar, que _no_ están conectados directamente al loop que se va a cerrar y que no son residuos de cola. Ten en cuenta que nunca se comprueban los choques de los residuos de cola. Este filtro no toma parámetros y no tiene atajo.

2.  Distancia entre un par de átomos (**type="atom_pair_distance"**)<br/>Descarta cualquier solución en la que dos átomos especificados no estén dentro de un umbral de distancia, especificado con un parámetro Real llamado **distance**. Los átomos se especifican con dos parámetros de cadena llamados **atom1** y **atom2**, y dos parámetros enteros llamados **res1** y **res2**. Si un parámetro booleano llamado **greater_than** se establece en **true**, este filtro descartará cualquier solución en la que los dos átomos especificados no estén separados por _al menos_ la distancia especificada. Como este filtro toma varios parámetros, existe un atajo (véase más abajo).

3.  Intervalo de torsión de la cadena principal de un residuo (**type="backbone_bin"**)<br/>Este filtro comprueba que los valores de torsión de la cadena principal de un residuo dado estén dentro de un intervalo de torsión de la cadena principal deseado. Este filtro toma tres parámetros adicionales: un número de residuo (**residue=(&int)**), un [[archivo de probabilidades de transición entre intervalos|Bin-transition-probabilities-file]] (**bin_params_file=(&string "ABBA.bin_params")**) y un nombre de intervalo (**bin=(&string)**).

4.  Puntuación de Ramachandran de alfa-aminoácidos (**type="alpha_aa_rama_check"**)<br/>Este filtro comprueba que la energía de Ramachandran de un residuo de alfa-aminoácido dado esté por debajo de un umbral establecido. Este filtro toma dos parámetros adicionales: un número de residuo (**residue=(&int)**) y un valor de energía de corte (**rama_cutoff_energy=(&Real 0.3)**). El filtro está pensado para asegurar que cada alfa-aminoácido de un loop esté en una región razonable del espacio de Ramachandran.

5.  Puntuación `rama_prepro` general (**type="rama_prepro_check"**)<br/>Este filtro comprueba que la energía `rama_prepro` de un residuo polimérico dado esté por debajo de un umbral establecido. La energía `rama_prepro` es una puntuación de torsión de la cadena principal similar a la antigua energía `rama`, aunque con varias ventajas. Primero, se puede definir para tipos de residuo poliméricos arbitrarios, y no solo para alfa-aminoácidos canónicos. Segundo, no se limita a tipos de residuo con dos torsiones de la cadena principal (_p. ej._ alfa-aminoácidos), sino que se puede aplicar a tipos de residuo arbitrarios (beta-aminoácidos, gamma-aminoácidos, _etc._), siempre que existan tablas de Ramachandran N-dimensionales para ellos. Tercero, se usa un mapa de Ramachandran distinto para un tipo de residuo dado cuando aparece antes de un residuo de prolina (u otro tipo de residuo N-sustituido) en la secuencia lineal, lo que permite tener en cuenta los efectos de la N-sustitución sobre las preferencias conformacionales. Este filtro también usa la opción **rama_cutoff_energy** para especificar el umbral de filtrado.

## Atajos

Se definen los atajos siguientes:

1.  **AddAtomPairDistanceFilter**<br/>Añade un filtro **atom_pair_distance** y establece todos sus parámetros en una línea:
```xml
<GeneralizedKIC ...>
     ...
     <AddAtomPairDistanceFilter atom1="&string" res1="(&int)" atom2="&string" res2="(&int)" distance="(&Real)" greater_than="(false &bool)"/>
     ...
</GeneralizedKIC>
```

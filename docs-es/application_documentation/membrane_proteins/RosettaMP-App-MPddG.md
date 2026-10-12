# Aplicación de RosettaMP: predicción del ∆∆G de una mutación (MPddG)

## Código y demo
La aplicación de ddG de membrana viene incluida con PyRosetta. La versión publicada se encuentra en: 
`PyRosetta/app/membrane/compute_ddG.py.`

La versión de desarrollo se encuentra en el código fuente de Rosetta, en `source/src/python/bindings/app/membrane/compute_ddG.py`

Una demo de esta aplicación se encuentra en `Rosetta/demos/protocol_capture/mp_ddG`

Revisión de Rosetta n.º 58096

## Antecedentes
Medir los cambios de energía libre tras una mutación puede ayudar a comprender la estabilidad y la variación de las proteínas de membrana, y es un paso hacia el diseño. En esta aplicación predecimos los ddG midiendo la diferencia de energía de Rosetta entre la conformación nativa y la mutada. Esta aplicación usa una versión modificada de la función de energía de todos los átomos para proteínas de membrana, que incluye el término fa_elec y la energía de pH (ver más abajo). La aplicación de ddG de membrana forma parte del marco RosettaMP. 

## Descripción del algoritmo
La aplicación de ddG de membrana predice el ddG como la diferencia de energía de Rosetta entre las conformaciones nativa y mutada. Hay disponibles varias variantes de este protocolo: 
* **Predeterminado:** predice el ddG reempaquetando solo la posición mutada
* **Con reempaquetado:** predice el ddG reempaquetando los residuos dentro de un radio dado alrededor de la posición mutada (Kellogg et al. 2011 recomiendan un radio de 8Å)
* **Con cálculos de pH:** usa una versión modificada de la función de energía de Rosetta que corrige por el pH y la electrostática del sistema. Esta opción cargará un conjunto adicional de rotámeros. El pH predeterminado es 7.0. Puedes encontrar más información sobre los cálculos de pH en Kilambi et al. 2013 (referencia más abajo). 

## Opciones
Las siguientes opciones se pueden usar para ajustar la configuración de las predicciones de ∆∆G

**Opciones generales**

|**Opción**|**Opción corta**|**Descripción**|**Tipo**|
|:-------|:-------|:--------------|:-------|
|--in_pdb|-p|Archivo PDB de entrada|Cadena de texto|
|--in_span|-s|Spanfile de entrada (regiones transmembrana de la proteína)|Cadena de texto|
|--out|-o|Nombre del archivo de salida de los datos de ddG. Las predicciones de ddG se refieren a la numeración del Pose. Predeterminado: ddG.out|Cadena de texto|
|--res|-r|Número de residuo (numeración del Pose) que se va a mutar|Entero|
|--mut|-m|Código de una letra de la identidad del residuo mutante. Ejemplo: A181F sería 'F'|Carácter|
|--output_breakdown|-b|Escribe en un scorefile el desglose del ddG por término de energía ponderado. Predeterminado: score.sc|Cadena de texto|

**Reempaquetado**

|**Opción**|**Opción corta**|**Descripción**|**Tipo**|
|:-------|:-------|:--------------|:-------|
|--repack_radius|-a|Reempaqueta los residuos dentro de este radio (en Å). El valor predeterminado es 0Å|Real|

**Opciones de pH**

|**Opción**|**Opción corta**|**Descripción**|**Tipo**|
|:-------|:-------|:--------------|:-------|
|--include_pH|-t|Incluye los términos de energía de pH: e_pH y fa_elec. El valor predeterminado es false.|Booleano|
|--pH_value|-v|Valor de pH al que se predicen los ddG. El valor predeterminado es pH 7. Primero hay que pasar -include_pH|Real|

## Líneas de comando de ejemplo
A continuación se muestra una línea de comando de ejemplo con las entradas proporcionadas en el protocol capture de MPddG de 2015. En este comando se reempaquetan todos los residuos a menos de 8.0Å de la posición mutada y los cálculos se realizan a pH 4: 

```
./compute_ddG.py --in_pdb inputs/1qd6_tr.pdb --in_span inputs/1qd6_tr_C.span --res 181 --repack_radius 8.0 --include_pH true --pH_value 4.0 
```

Las columnas del archivo de salida son las siguientes: 
  1. archivo PDB de entrada
  2. número de residuo en la numeración del Pose (debería empezar en 1 en tu archivo PDB)
  3. código de una letra del aminoácido de la mutación
  4. puntuación de Rosetta de la forma nativa. Un número más negativo es más estable.
  5. puntuación de Rosetta del mutante.
  6. valor de ddG como la diferencia entre la puntuación nativa y la del mutante. Al parecer, y a juzgar por esos números, el ddG se calcula como nativo menos mutante, de modo que un número negativo significa

## Referencias
1. Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press

2. Chaudhury S, Lyskov S, Gray JJ (2010) PyRosetta: a script-based interface for implementing molecular modeling algorithms using Rosetta.

3.  Moon CP, Fleming KG (2011) Side-chain hydrophobicity scale derived from transmembrane protein folding into lipid bilayers. Proc Natl Acad Sci. 

4. Kellogg, Elizabeth H., Leaver-Fay A, and Baker D. “Role of Conformational Sampling in Computing Mutation-Induced Changes in Protein Structure and Stability.” Proteins 79, no. 3 (March 2011): 830–38. doi:10.1002/prot.22921.

5. Kilambi, KP, and Gray JJ. “Rapid Calculation of Protein pKa Values Using Rosetta.” Biophysical Journal 103, no. 3 (August 8, 2012): 587–95. doi:10.1016/j.bpj.2012.06.044.


## Contacto
Preguntas y comentarios a: 

 - Rebecca F. Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

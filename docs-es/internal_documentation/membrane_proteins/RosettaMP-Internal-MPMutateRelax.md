## Metadatos

Preguntas y comentarios a: 
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - Investigador principal correspondiente: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

Última actualización: 4/26/15

## Descripción del algoritmo
Esta aplicación hace una mutación y luego, opcionalmente, reempaqueta el sitio de la mutación o los residuos dentro de un radio del sitio de la mutación, o ejecuta MPQuickRelax sobre una proteína de membrana. La función de puntuación que usa es mpframework_smooth_fa_2012. La mutación se puede especificar en la línea de comandos (-mp:mutate_relax:mutation) o indicar en un archivo de mutaciones. El archivo de mutaciones puede contener varias construcciones independientes para las que ejecutar esta aplicación. Un ejemplo de archivo de mutaciones es:

```
A14F S57K
L3I
H29T A85N D34E
```

El archivo anterior describe tres construcciones distintas: la primera con dos mutaciones, la segunda con una sola mutación puntual y la tercera con tres mutaciones; aquí se usa la numeración del Pose. La aplicación creará modelos independientes para cada construcción.

La ejecución por defecto de esta aplicación es solo de mutación. Esto significa que, si quieres reempaquetar o relajar, tienes que especificarlo con las opciones de abajo. 

Para poder ejecutar la aplicación desde el archivo de mutaciones y a la vez obtener varios decoys por construcción, se ejecuta fuera de JD2. **Por lo tanto, la opción -nstruct siempre debe ser 1**, de lo contrario ¡los mismos modelos se sobrescribirán! El número de modelos generados aquí es 100 por defecto, pero se puede cambiar con la opción -mp:mutate_relax:iter.

## Código y demo
La aplicación se encuentra en `apps/pilot/jkleman/mp_mutate_relax.cc`. El mover subyacente se encuentra en `protocols/membrane/MPMutateRelaxMover`.

## Opciones

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-mp:mutate_relax:mutation A14F|residuo de tipo silvestre / número de residuo del Pose / mutación - residuos en códigos de una letra|string|
|-mp:mutate_relax:mutant_file mutations_1AFO.mut|archivo de mutaciones; indica O BIEN mutation O BIEN mutant_file|string|
|-mp:mutate_relax:iter 50|Número de modelos creados al ejecutar relax; reemplaza a -nstruct en esta aplicación. Para solo mutación y reempaquetado el valor por defecto es 1 (porque el packer es prácticamente determinista); para relax es 100|integer|
|-mp:mutate_relax:repack_mutation_only 1|opcional: reempaqueta solo el residuo mutado|boolean|
|-mp:mutate_relax:repack_radius 8|opcional: reempaqueta los residuos a X Angstrom alrededor del residuo mutado|float|
|-mp:mutate_relax:relax 1|opcional: hace una ejecución completa de relax con MPQuickRelax|boolean|
|-mp:quickrelax:angle_max 1|opcional para relax: desviación máxima permitida del ángulo diedro; normalmente 1 o menos para proteínas grandes, puede ser mayor para proteínas pequeñas; prueba y comprueba a ojo|float|
|-mp:quickrelax:nmoves nres|opcional para relax: número de SmallMoves y ShearMoves dentro de relax; puede ser "nres" o un entero; normalmente nres|string(int)|

## Ejecutar la aplicación

Opciones de ejemplo: 

```
Rosetta/main/source/bin/mp_mutate_relax.macosclangrelease \
-database Rosetta/main/database \
-in:file:s 1AFO_tr.pdb \

# spanfile defining protein topology
-mp:setup:spanfiles 1AFO__tr.span \ 

# specify that you want to run relax
-mp:mutate_relax:relax 1 \

# optional, maximum allowed dihedral angle change, typical value around 1.0, default 1.0
-mp:quickrelax:angle_max 1.0 \        

# number of Small and ShearMoves for relax                                      
-mp:quickrelax:nmoves nres \          

# specified mutation to make. Either this flag or mutant_file flag must be given.
-mp:mutate_relax:mutation A163F       

# optional, only build 5 models. Default is 100
-mp:mutate_relax:iter 5 \             

# required, MUST be 1, otherwise models will be overwritten n times!
-nstruct 1 \                          
```

## Referencia

Este protocolo aún no se ha publicado. El marco y el protocolo anterior se publicaron en:

Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015)
An integrated framework advancing membrane protein modeling and design,
PLoS Computational Biology (under revision) 

## Metadatos

Preguntas y comentarios a: 
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - Investigador principal correspondiente: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

Última actualización: 8/19/15

## Descripción del algoritmo
Esta aplicación hace una mutación y luego reempaqueta el sitio de la mutación en una proteína soluble. La función de puntuación que usa es talaris2014. La mutación se indica en la línea de comandos (-mp:mutate_relax:mutation). 

## Código y demo
La aplicación se encuentra en `apps/pilot/jkleman/mutate.cc`. 

## Ejecutar la aplicación

Opciones de ejemplo: 

```
Rosetta/main/source/bin/mp_mutate_relax.macosclangrelease \
-database Rosetta/main/database \
-in:file:s 1AFO_tr.pdb \

# specified mutation to make. (This is not for MPs, I just hijacked it's flag for now!)
-mp:mutate_relax:mutation A163F       
```

## Metadatos

Preguntas y comentarios a: 
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - Investigador principal correspondiente: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

Última actualización: 4/26/15

## Descripción del algoritmo
Esta es la aplicación de refinamiento más sencilla para proteínas de membrana disponible actualmente. La ventaja sobre MPFastRelax es que es hasta 40 veces más rápida para proteínas de membrana grandes. Una proteína de 1000 residuos con MPFastRelax tarda unas 10 horas por decoy en un solo procesador, pero solo 10-15 minutos con MPQuickRelax. Una proteína de 80 residuos tarda unos 60 segundos con MPFastRelax, pero solo unos 6 segundos con MPQuickRelax. La desventaja es que este algoritmo actualmente no se ha probado exhaustivamente y a veces genera decoys con puntuaciones positivas que hay que descartar. En general, las puntuaciones también parecen ser algo más altas que con MPFastRelax. 

El algoritmo ejecuta un SmallMover y un ShearMover sencillos que cambian ligeramente los ángulos diedros de la proteína, hace el reempaquetado de cadenas laterales y una sola ronda de minimización. La desviación diedra máxima (Small y ShearMover usan un ángulo aleatorio por debajo del ángulo máximo establecido) y el número de cambios de ángulos diedros aplicados a la proteína se pueden establecer por línea de comandos. La función de puntuación que usa es mpframework_smooth_fa_2012. 

## Código y demo
La aplicación se encuentra en `apps/pilot/jkleman/mp_quick_relax.cc`. El mover subyacente se encuentra en `protocols/membrane/MPQuickRelaxMover`.

## Ejecutar la aplicación

Opciones de ejemplo: 

```
Rosetta/main/source/bin/mp_quick_relax.macosclangrelease \
-database Rosetta/main/database \
-in:file:s 1AFO_tr.pdb \
-in:file:native 1AFO_tr.pdb \         # superimposes the model onto the native, using CA atoms
-mp:setup:spanfiles 1AFO__tr.span \ 
-mp:quickrelax:angle_max 1.0 \        # optional, maximum allowed dihedral angle change, typical value around 1.0, default 1.0
                                      # 1.0 creates models with RMSDs of 0-2A around the native
-mp:quickrelax:nmoves nres \          # optional, number of times Small and ShearMover makes changes to protein
                                      # can be number or 'nres', taking all residues in the protein
                                      # default: 'nres'
```

## Notas

Actualmente no se ha probado con restricciones, pero pronto lo estará. 

## Referencia

Esta referencia solo cita MPFastRelax; MPQuickRelax aún no se ha publicado. 

Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Elazar A, Tilley DC, Gray JJ (2015)
An integrated framework advancing membrane protein modeling and design,
PLoS Computational Biology (under revision)

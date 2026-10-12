#ConfChangeMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ConfChangeMover

Muestrea nuevas conformaciones de proteínas, como se describe en:                     
[Modeling of protein conformational changes with Rosetta guided by limited experimental data] Structure (2022)                                          
Davide Sala, Diego del Alamo, Hassane S. Mchaourab, Jens Meiler
https://doi.org/10.1016/j.str.2022.04.013

Documentación escrita por Davide Sala (davide.sala@uni-leipzig.de).
## Descripción general

Dada una estructura inicial, ConfChangeMover perturba el Pose de la proteína en dos pasos:                                       
1. Los elementos de estructura secundaria (SSE) se rotan y se trasladan. Opcionalmente, se muestrean nuevos ángulos diedros mediante la inserción de fragmentos.
2. Los loops se cierran mediante la inserción de fragmentos. En este paso, la intensidad del muestreo de nuevas conformaciones de loops se puede ajustar mediante la frecuencia con que se insertan fragmentos tomados de la estructura inicial en lugar del PDB. Una frecuencia mayor significa más fragmentos de la conformación inicial y un muestreo más conservador.                  

Si no se proporcionan, los fragmentos derivados del PDB se obtienen automáticamente. Para acelerar de forma significativa el cálculo, se pueden obtener los fragmentos desde http://old.robetta.org y proporcionarlos mediante la opción correspondiente (véase más abajo).

## Uso 
Opciones XML obligatorias
```xml
     <ConfChangeMover name="&string" stage1_scorefxn="&string" stage2_scorefxn="&string" /> 
```
Las funciones de puntuación de las etapas 1 y 2 deben ser 'centroid'.

### Proteínas solubles
Para proteínas solubles se puede usar la función de puntuación 'score3'.
Hay un tutorial sobre cómo modelar un cambio conformacional con restricciones de distancia en https://www.rosettacommons.org/demos/latest/public/confchangemover_soluble/README

### Proteínas de membrana
Para proteínas de membrana, a continuación se muestra la función de puntuación centroid usada en el benchmark de CCM:
```
hbond_sr_bb 1.17
hbond_lr_bb 1.17
rama        0.15
omega       0.2
rg          0.1
vdw         1.0
Menv 2.019
Mpair 1.0
Mcbeta 2.5
cenpack_smooth  1.0
cart_bonded     0
rsigma 1.0
sheet 1.0
ss_pair 1.0
hs_pair 1.0
Menv_non_helix 2.019
Menv_termini 2.019
Menv_tm_proj 2.019
cen_hb 1
```
La etapa 1 requiere restricciones diedras (derivadas automáticamente) y cualquier otra restricción para realizar movimientos de cuerpo rígido de los SSE. A continuación se muestra cómo añadir los términos de peso correspondientes en el archivo XML:
```xml
         <ScoreFunction name="&string" weights="&real" >
                <Reweight scoretype="dihedral_constraint" weight="&real" />
                any other constraints like 'epr_deer_score', 'atom_pair_constraint' etc.
        </ScoreFunction>
```
La etapa 2 requiere el término cart_bonded para cerrar los huecos en los loops.
```xml
         <ScoreFunction name="&string" weights="&real" >
                <Reweight scoretype="cart_bonded" weight="&real" />
                any other constraints like 'epr_deer_score', 'atom_pair_constraint' etc.
        </ScoreFunction>
```

Las proteínas de membrana requieren generar un archivo span. Un archivo span es un formato de archivo que usa Rosetta para modelar proteínas de membrana alfa-helicoidales. Contiene el número, la longitud y la posición en la secuencia de las hélices transmembrana. Esta información se puede obtener con la herramienta de predicción de hélices transmembrana basada en secuencia TOPCONS (https://topcons.cbr.su.se/) a partir de un archivo FASTA.   
Se puede generar un archivo span a partir de la salida de TOPCONS con el script topcons2span.pl (https://github.com/davidesala/topcons2span) de la siguiente manera:
```
perl topcons2span.pl <TOPCONS topology file>
```
Alternativamente, se puede generar un archivo span siguiendo estas instrucciones: https://new.rosettacommons.org/docs/wiki/application_documentation/membrane_proteins/RosettaMP-App-MPSpanFromPDB

Hay un tutorial sobre cómo modelar un cambio conformacional con distancias DEER en 
https://www.rosettacommons.org/demos/latest/public/confchangemover_membrane/README

## Control detallado

[[include:mover_ConfChangeMover_type]]

# Aplicación de RosettaMP: refinamiento de alta resolución (MPFastRelax)

## Código y demo
La aplicación de refinamiento de proteínas de membrana, MPrelax, está implementada como un Rosetta Script y se encuentra en `Rosetta/main/source/src/apps/public/membrane/mp_relax.xml`, que se puede pasar como entrada al ejecutable `rosetta_scripts.cc`

Una demo de esta aplicación, con los pasos detallados, líneas de comando y entradas de ejemplo, se encuentra en `Rosetta/demos/protocol_captures/mp_relax`

Revisión de Rosetta n.º 58096

## Acerca de
El refinamiento de alta resolución es clave para llevar estructuras de baja resolución obtenidas por cristalografía de rayos X a un detalle de nivel atómico. En el caso de las proteínas de membrana, este método también puede revelar un ensamble de posibles incrustaciones en la membrana: la posición y la orientación de la biomolécula con respecto a la bicapa de membrana. 

## Descripción
La aplicación de relax de membrana combina el algoritmo FastRelax de Rosetta con la función de energía de todos los átomos para proteínas de membrana y una técnica basada en gradientes para optimizar la incrustación en la membrana. Primero, se usan una serie de pequeños movimientos de la cadena principal, pruebas de rotámeros y minimización para refinar la estructura de la proteína. Además, la posición de la membrana se optimiza minimizando el «jump» o conexión que relaciona el residuo MEM con la biomolécula. 

Este protocolo está diseñado actualmente para el refinamiento de una sola cadena con un jump de MEM. ¡Ten en cuenta que, por ahora, este protocolo no se ha probado de forma exhaustiva en proteínas de varias cadenas!

## Entradas necesarias
La aplicación de relax de membrana necesita dos entradas: 
  (1) El PDB de la estructura proteica de interés.
  (2) Un spanfile que describa la ubicación de los tramos transmembrana.

## Opciones

|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-parser:protocol <mp_relax.xml>|Usa el Rosetta Script del protocolo de relax de membrana|Script XML|
|-mp:setup:spanfiles|Spanfile que describe la topología transmembrana de la estructura de partida|Cadena de texto|
|-mp:scoring:hbond|Activa el término de enlaces de hidrógeno dependiente de la profundidad al usar la función de energía de alta resolución de membrana|Booleano|
|-relax:fast|Usa el modo FastRelax de Rosetta Relax (usa de 5 a 8 ciclos de repetición)|Booleano|
|-relax:jump_move|Permite que el MEM y otros jumps se muevan durante el refinamiento|Booleano|
|-packing:prepack_missing_sidechains false|Espera para reempaquetar las cadenas laterales durante la inicialización del pdb hasta que el Pose de membrana esté completamente inicializado con el marco de membrana|Booleano|

## Líneas de comando de ejemplo
Para ejecutar esta aplicación, usa la siguiente línea de comando: 

`./rosetta_scripts.<exe> -database /path/to/my/rosettadb @flags`

## Referencias
1. Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press

2. Tyka MD, Keedy DA, Andre I, DiMaio F, Song Y, et al. (2011) Alternate states of proteins revealed by detailed energy landscape mapping. J Mol Biol. 

3. Barth P, Schonbrun J, Baker D (2007) Toward high-resolution prediction and design of transmembrane helical protein structures. Proc Natl Acad Sci 104: 15682–15687. 

4. Fleishman SJ, Leaver-Fay A, Corn JE, Strauch E-M, Khare SD, et al. (2011) RosettaScripts: A Scripting Language Interface to the Rosetta Macromolecular Modeling Suite. PLoS ONE 6: e20161. 


## Contacto

Preguntas y comentarios a: 
 - Rebecca F. Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

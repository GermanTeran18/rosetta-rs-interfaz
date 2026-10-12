**Nota:** esta parametrización ha sido reemplazada por [[beta_nov16|Updates-beta-nov16]].

Hay una descripción general de este esfuerzo de optimización de la función de energía [[aquí|Overview-of-Seattle-Group-energy-function-optimization-project]].

Para información sobre el conjunto anterior de actualizaciones de esta función de puntuación, consulta la página de la función de puntuación beta july15 [[aquí|Updates beta july15]].

Para los resultados de benchmark de los protocolos, consulta [[aquí|beta-nov15-benchmark-results]].

### Uso de los parámetros de la función de energía beta_nov15

Para la mayoría de los protocolos (los que usan _getScoreFunction_ para fijar la función de puntuación del protocolo), la opción **-beta_nov15** cargará esta versión de la función de energía beta.

Para los protocolos de _RosettaScripts_, hay que proporcionar la opción **-beta_nov15** y hacer la siguiente declaración de la función de puntuación:

**\<beta weights=beta_nov15/\>**

### Parámetros optimizados 

La optimización siguió el mismo esquema que [[beta_july15|Updates-beta-july15]] y usó esa función como punto de partida.  Sin embargo, además de optimizar varios parámetros nuevos, se modificó la función objetivo usada durante la optimización:

* Se generaron nuevos conjuntos de docking y de discriminación de decoys usando beta_july15
* La métrica de distribución de distancias se modificó para calcular el error cuadrático medio en lugar de la suma de errores, y para debilitar los pares de átomos sobrerrepresentados, con el fin de corregir las malas distribuciones de distancias polares de la versión de julio de 2015

**Electrostática y cargas parciales (fa_elec)**

En esta optimización consideramos optimizar las cargas parciales atómicas individuales.  Para reducir el número de parámetros y mantener la carga global de las moléculas, usamos el siguiente esquema:
* Dividir cada residuo en 2 grupos de cadena principal y 1 de cadena lateral
* Mantener la carga global de ese grupo (-1/0/+1), pero ajustar un factor de escala del grupo que aumenta el rango global de cargas parciales dentro de ese grupo
* Agrupar todos los grupos de la cadena principal (de modo que solo haya un parámetro para el grupo NH y uno para el grupo CO) y todas las cadenas laterales no polares y no aromáticas

Más importante aún, se corrigió un problema por el cual la lógica de count-pair de Rosetta dividía dipolos.  Esto se soluciona especificando un «átomo representativo» para cada átomo, que se usa para fines de countpair.  Se especifica con la opción **-elec_representative_cp** o **-elec_representative_cp_flip**, que usan respectivamente la longitud mínima o máxima dentro de cada grupo al determinar qué multiplicador de count pair aplicar.  La función de energía beta_nov15 usa la longitud máxima (**-elec_representative_cp_flip**).

**Hatr (fa_atr para hidrógenos)**

Se habilitaron las energías atractivas para los átomos de hidrógeno (**-fa_Hatr**) y se reajustaron los parámetros LJ.  Debido a los cambios significativos que esto induce en los parámetros LJ, este reajuste se guió inicialmente solo por la concordancia con datos biofísicos mediante simulaciones de líquidos de moléculas pequeñas y luego con la función objetivo completa.

**Actualizaciones de la biblioteca de torsiones (fa_dun/rama_prepro/p_aa_pp)**

Se incluyeron varias actualizaciones de torsiones antes de la optimización:
* Maxim Shapovalov y Roland Dunbrack proporcionaron una nueva versión calculada y suavizada de las energías fa_dun y p_aa_pp
* Se calcularon potenciales rama separados para pre-prolina y para pre-no-prolina, que ahora se usan, reemplazando **rama** por un nuevo término de energía **rama_prepro**
     * Ten en cuenta que **rama_prepro** inicialmente no era compatible con residuos no canónicos, residuos D-aminoácidos ni geometría cíclica.  Desde el 23 de febrero de 2016, Vikram K. Mulligan lo ha actualizado para que funcione con todos ellos.
     * Para residuos totalmente no canónicos, el término devuelve 0 para la energía y las derivadas, a menos que el residuo no canónico especifique un residuo canónico en una línea BACKBONE_AA de su archivo params.  (En ese caso se usan las tablas **rama_prepro** del residuo canónico).
     * Para residuos D con un equivalente L canónico, las tablas **rama_prepro** del residuo L se invierten y se usan.  La opción **-symmetric_gly_tables** simetrizará las tablas **rama_prepro** de la glicina, y se recomienda esta opción para el diseño mixto D/L.
     * El término **rama_prepro** ya no hace suposiciones sobre si el residuo i está conectado con el residuo i+1 o i-1.  Ahora comprueba realmente las conexiones y, por lo tanto, es compatible con la geometría cíclica.
* Los pesos de todos los términos de torsión se reajustaron como parte del proceso de optimización

**Restricciones de longitud de enlace, ángulo de enlace y planaridad (cart_bonded)**

Los parámetros de longitud y ángulo de enlace se actualizaron de varias maneras.  Primero se corrigieron varios errores en el archivo de parámetros de cart_bonded:

* Por la manera en que se calcularon inicialmente a partir de los archivos de parámetros, varios parámetros de prolina de Rosetta eran incorrectos, en particular el ángulo CD-N-CA, pero también cualquier ángulo o longitud que involucrara el enlace CD-N.  Todos ellos se han fijado a sus valores de Engh & Huber.
* Por un error tipográfico, las pseudotorsiones CB de PHE no se calculaban
* Había incoherencias entre las restricciones de HIS y HIS_D

En segundo lugar, se realizó la optimización con las constantes de resorte usadas en cart bonded.  Todos los ángulos, longitudes y torsiones se dividieron en 130 «clases», y se calculó un factor de escala para cada clase.  Estos factores de escala se optimizaron con dos criterios:

* Calidad del paisaje energético tras un relax cartesiano
* Magnitud del gradiente tras un nuevo refinamiento cristalográfico

**Varios**

También se hicieron varias modificaciones menores a la función de energía:

* El ancho de transición de la solvatación LK-ball se redujo ligeramente
* Los pesos de referencia se volvieron a reajustar

##Véase también

* [[Scoring explained]]
* [[Scorefunction history]]
* [[RosettaEncyclopedia]]

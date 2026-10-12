**Nota:** esta parametrización ha sido reemplazada por [[beta_nov15|Updates-beta-nov15]].

Hay una descripción general de este esfuerzo de optimización de la función de energía [[aquí|Overview-of-Seattle-Group-energy-function-optimization-project]].

### Uso de los parámetros de la función de energía beta_july15

Para la mayoría de los protocolos (los que usan _getScoreFunction_ para fijar la función de puntuación del protocolo), la opción **-beta_july15** cargará esta versión de la función de energía beta.

Para los protocolos de _RosettaScripts_, hay que proporcionar la opción **-beta_july15** y hacer la siguiente declaración de la función de puntuación:

**\<beta weights=beta_july15/\>**

### Parámetros optimizados 

**Modelo LK_ball**

El cambio más significativo en beta_july15 es la adición de un modelo de solvatación polar anisotrópica para los átomos polares de las cadenas laterales.  Usa el modelo lk_ball de Phil Bradley, en el que, para los átomos polares de las cadenas laterales, se colocan sitios de agua virtuales con geometría ideal, y el modelo de solvatación usa una suma ponderada de la distancia al sitio de agua virtual y la distancia al átomo pesado para calcular cuán desolvatado está un átomo polar de una cadena lateral.  El efecto neto es un mayor costo de desolvatación al colocar un átomo que ocluye cerca de uno de estos sitios de agua virtuales.

**Parámetros LK (fa_sol)**

Tras la introducción del modelo de solvatación polar anisotrópica lk_ball, los parámetros LK se reajustaron siguiendo nuestro esquema de optimización de la función de energía.  Inicialmente se hicieron varias modificaciones manuales:
* Los LK_VOLUMES se recalcularon usando los radios de VDW de Rosetta con la fórmula del artículo original (distinta de la del artículo original)
* Se corrigieron varios átomos mal tipificados en Rosetta: CYS SG, ARG CZ, TRP CE2 y los CG aromáticos
* Los LK_LAMBDAs de los átomos cargados se redujeron de 6.0Å a 3.5Å; debido al truncamiento a 6Å de Rosetta, su comportamiento era extraño
* Por último, muchos átomos polares se dividieron además en subtipos

Después, usando el modelo de solvatación anisotrópica LK-ball, los DGFREEs de todos los tipos de átomo se reajustaron según nuestros criterios de optimización.  Al igual que en el artículo original de LK, la concordancia con las energías libres de transferencia líquido-vapor se usó como una restricción fuerte de la optimización.

**Parámetros LJ (fa_atr/fa_rep)**

Los parámetros LJ (tanto LJ_RADIUS como LJ_WDEPTH) de todos los tipos de átomo se reajustaron durante la optimización de la función de energía.  Se emplearon tres restricciones fuertes para mantener estos parámetros físicamente realistas:
* Concordancia con los calores de vaporización y la densidad líquida de moléculas pequeñas
* Concordancia de las distribuciones de distancias entre pares de átomos de estructuras relajadas y de estructuras cristalinas de alta resolución
* Minimización de los gradientes del campo de fuerzas tras el refinamiento cristalográfico

**Modelo dieléctrico electrostático (fa_elec)**

Se usó un modelo dieléctrico sigmoideo en lugar del dieléctrico dependiente de la distancia predeterminado.  Tres parámetros controlan el dieléctrico de corto alcance, el de largo alcance y la transición entre ambos.  Inicialmente estos parámetros se eligieron para igualar lo más posible el dieléctrico original; posteriormente se incluyeron como parámetros libres en la optimización.

**Fuerzas de los enlaces de hidrógeno**

Los pesos de los enlaces de hidrógeno por donador y por aceptor se optimizaron según nuestros criterios de optimización.  Se usó una restricción de anclaje débil en nuestra función objetivo de «calidad de la función de energía» para mantener estos pesos uniformes.

**Varios**

También se hicieron varias modificaciones menores a la función de energía:
* Se eliminó la fuerza repulsiva artificial OCbb-OCbb (**-unmodifypot**)
* Las energías de referencia se reajustaron tras estos cambios


##Véase también

* [[Scoring explained]]
* [[Scorefunction history]]
* [[RosettaEncyclopedia]]

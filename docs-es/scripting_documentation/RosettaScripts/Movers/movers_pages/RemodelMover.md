# RemodelMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RemodelMover (incluida la construcción de disulfuros)

Remodela y reconstruye una cadena de proteína

¡¡¡NOTA IMPORTANTE!!!: Remodel usa un sistema interno de trayectorias controlado por la opción -num\_trajectory [entero, \>= 1]. Si num\_trajectory \> 1, cada resultado se puntúa con score12 y el Pose de menor energía pasa al siguiente mover o filtro. Se recomienda -num\_trajectory 1 para rosetta\_scripts.

```xml
  <RemodelMover name="(&string)" blueprint="(&string)"/>      
```

-   blueprint: nombre del archivo blueprint
-   próximamente habrá más etiquetas; por ahora usa las opciones como se describe en la [[página de Remodel|Remodel]]

Para construir varios disulfuros simultáneamente con RemodelMover, usa la siguiente sintaxis:

```xml
<RemodelMover name="(&string)" build_disulf="True" match_rt_limit="(1.0 &Real)" quick_and_dirty="(0 &Bool)" bypass_fragments="(0 &Bool)" min_disulfides="(1 &Real)" max_disulfides="(1 &Real)" min_loop="(1 &Real)" fast_disulf="(0 &Bool)" keep_current_disulfides="(0 &Bool)" include_current_disulfides="(0 &Bool)"/>
```

-   `      build_disulf     `: indica que deben construirse disulfuros en la estructura
-   `      use_match_rt    `: gestiona la búsqueda de disulfuros calculando la matriz de rotación-traslación (RT) entre todos los pares de cadenas principales de residuos y comparando esas matrices RT con una base de datos de disulfuros conocidos. Se usa la distancia euclídea para determinar la similitud entre la matriz RT consultada y cada disulfuro de la base de datos. El umbral de similitud entre la matriz RT y un disulfuro conocido es match_rt_limit (abajo). Por defecto true.
-   `      match_rt_limit     `: umbral superior para determinar si dos residuos pueden formar un disulfuro según la matriz RT entre sus átomos de la cadena principal. 1.0 es estricto, 2.0 es laxo, 6.0 es muy laxo y \>6 no cambia nada. Por defecto 1.0.
-   `      use_disulf_fa_score    `: gestiona la búsqueda de disulfuros construyendo realmente enlaces disulfuro entre todos los pares de residuos dentro de una distancia de corte, minimizándolos, puntuando los disulfuros con el potencial disulfuro fullatom por defecto (dslf_fa13) y aplicando después un umbral superior. En la minimización puede permitirse cierta flexibilidad de la cadena principal. Por defecto false.
-   `      disulf_fa_max     `: umbral superior para determinar si dos residuos pueden formar un disulfuro según la construcción y minimización real de un disulfuro en ese lugar. Por defecto -0.25.
-   `      relax_bb_for_disulf     `: permite la minimización de la cadena principal durante la construcción de disulfuros con use_disulf_fa_score. Esta relajación de la cadena principal se hace sobre una cadena principal de polialanina, por lo que la cadena principal puede ser más flexible de lo que realmente es factible para una estructura dada, lo que lleva a aceptar disulfuros que estarán tensionados en la estructura real. Permitir la minimización de la cadena principal debería aumentar el número total de posibles enlaces disulfuro encontrados. Por defecto false.
-   `      quick_and_dirty     `: omite el paso de refinamiento dentro de remodel; es útil para ahorrar tiempo si el refinamiento se hace en otro lugar
-   `      bypass_fragments     `: omite la reconstrucción de la estructura a partir de fragmentos
-   `      min_disulfides     `: especifica el número mínimo de disulfuros requeridos en la estructura de salida. Si min\_disulfides es mayor que el número de disulfuros potenciales que superan match\_rt\_limit, el protocolo fallará. **Esto solo se lee/aplica si build\_disulf o fast\_disulf son true.**
-   `      min_disulfides     `: especifica el número máximo de disulfuros permitidos en la estructura de salida.
-   `      min_loop     `: especifica el número mínimo de residuos entre las dos cisteínas que formarán el enlace disulfuro; se usa para evitar disulfuros que unen tramos de cadena que ya están cerca en la estructura primaria.
-   `      fast_disulf     `: fija en true las opciones build\_disulf, quick\_and\_dirty y bypass\_fragment. También omite cualquier diseño durante remodel, ¡incluida la construcción del propio disulfuro! Esto significa que el mover remodel debe ir seguido de un mover de diseño como FastDesign. Este es mi método recomendado para construir varios disulfuros en un scaffold *de novo*.
-   `      keep_current_disulfides     `: impedirá que Remodel use un residuo que ya forma parte de un disulfuro para formar un nuevo disulfuro
-   `      include_current_disulfides     `: obliga a Remodel a incluir los disulfuros existentes en la lista de disulfuros potenciales (sirve de poco, salvo para depuración).


Ten en cuenta que no se necesita blueprint con fast\_disulf o build\_disulf; si no se proporciona ningún blueprint, todos los residuos se considerarán posibles ubicaciones de cisteína.

Si se construyen varios disulfuros simultáneamente y la estructura admite varias configuraciones de disulfuros (combinaciones de enlaces disulfuro), se devuelve la configuración mejor clasificada según DisulfideEntropyFilter. Si se proporciona exactamente la misma estructura de entrada a RemodelMover por segunda vez (porque forma parte de un bucle en rosetta\_scripts, por ejemplo), la segunda vez se devolverá la segunda configuración mejor clasificada, y así sucesivamente. Con este método, varias configuraciones de disulfuros sobre la misma estructura pueden pasarse a movers y filtros posteriores de RosettaScripts, y repetirse en bucle hasta encontrar una óptima.

##Véase también

* [[BluePrintBDRMover]]
* [[SetSecStructEnergiesMover]]
* [[I want to do x]]: guía para elegir un mover
* [[DisulfideMover]]
* [[ForceDisulfidesMover]]
* [[DisulfidizeMover]]

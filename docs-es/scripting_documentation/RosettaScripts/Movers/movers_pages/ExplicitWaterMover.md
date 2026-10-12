## Referencia

Biorxiv: https://www.biorxiv.org/content/10.1101/618603v2

## Descripción general

ExplicitWaterMover es un mover de propósito especial (expuesto a través de la aplicación [[RosettaScripts]]) pensado para usarse junto con la [[función de potencial beta_nov16|Updates-beta-nov16]]. Cuando se usa junto con el [[packer|PackRotamersMover]], permite modelar moléculas de agua explícitas durante una trayectoria de empaquetado/diseño.

ExplicitWaterMover debe llamarse _antes_ del empaquetado, usando la misma operación de tarea que el empaquetado. Genera sitios potenciales donde el agua podría unirse a cualquier rotámero permitido. Después, una _llamada de empaquetado posterior_ se usa para sacar aguas del disolvente en esas posiciones.

En el caso más sencillo, se usa así:
```xml
    <MOVERS>
      <ExplicitWaterMover name="solvate" mode="replace" gen_fixed="0" scorefxn="beta" task_operations="mytaskops" />
      <PackRotamersMover name="pack" scorefxn="beta" task_operations="mytaskops"/>
    </MOVERS>
   <PROTOCOLS>
      <Add mover="solvate"/>
      <Add mover="pack"/>
   </PROTOCOLS>
```

### Opciones

Hay dos opciones importantes que controlan el comportamiento:
* **mode** - uno de _remove_, _append_, _replace_ o _eval_. Describe el comportamiento del mover:
    * _replace_ (predeterminado) - elimina todas las aguas y genera nuevas ubicaciones de agua
    * _append_ - conserva las aguas existentes y genera ubicaciones de agua adicionales
    * _remove_ - elimina todas las aguas de la Pose
    * _eval_ - compara la ubicación de las aguas de la Pose de entrada con la especificada con -in:file:native o con la etiqueta **native**
* **gen_fixed** - esta opción describe si se deben generar ubicaciones de agua para las posiciones que no tienen permitido empaquetarse en la tarea del packer de entrada. Ten en cuenta que esto puede generar aguas lejos de los residuos que se van a empaquetar (p. ej., en el diseño de interfaces, pueden colocarse aguas lejos de la interfaz)

Hay otras opciones que controlan el comportamiento del protocolo y que no deberían cambiarse salvo por expertos. El protocolo en sí se ejecuta en varias etapas:

1. Se generan aguas considerando todos los rotámeros permitidos y colocando aguas "ideales" en cada grupo polar
2. El conjunto se poda eliminando los puntos que solo interactúan con UN grupo polar de cadena lateral (se conservan los sitios que interactúan con un grupo polar de la cadena principal)
3. Los sitios coordinados por cadenas laterales se agrupan en el espacio y se organizan en "rotámeros" (los sitios de la cadena principal se agrupan según el grupo polar que los coordina)
4. Se ejecutan muchas trayectorias de empaquetado cortas con un "potencial de agua puntual" que solo considera la posición del O del agua.
5. El conjunto se: a) poda a los sitios que están ocupados por un agua durante cierta fracción del tiempo, b) agrupa y c) poda a los grupos que están ocupados al menos durante cierta fracción del tiempo.

Varias opciones "expertas" controlan estos cinco pasos:
* **lkb_overlap_dist** - En el paso 2, la distancia de solapamiento de los "sitios de agua" de las cadenas laterales necesaria para generar un agua
* **lkb_clust_rad** - En el paso 3, el umbral de redundancia para los grupos de cadena lateral que se solapan
* **lkb_rotset_radius** - En el paso 3, el umbral "rotamérico" para los grupos lkb (es decir, el umbral de distancia con el que dos aguas puntuales se consideran rotámeros de una misma agua)
* **dwell_cutoff** - En el paso 5a, el umbral de tiempo de permanencia de las aguas (antes del agrupamiento)
* **clust_radius** - En el paso 5b, el radio de agrupamiento
* **clust_cutoff** - En el paso 5c, el umbral de permanencia de los grupos de agua

## Notas

Si no se proporciona ninguna operación de tarea, las aguas solo se generarán contra la Pose de entrada fija (siempre se supondrá que gen_fixed es true)

Este mover se llamaba antes WaterBoxMover; se cambió a ExplicitWaterMover el 23/10/2019 para que fuera más descriptivo
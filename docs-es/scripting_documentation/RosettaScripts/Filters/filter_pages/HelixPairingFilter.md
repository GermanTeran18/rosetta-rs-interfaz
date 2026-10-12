# HelixPairing
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## HelixPairing

Filtra estructuras según la geometría de los apareamientos de hélices.  El filtro primero determina la estructura secundaria del Pose y luego la usa para encontrar hélices. En relación con la geometría de los apareamientos de hélices, este filtro ofrece tres parámetros, dist, cross y align, y se filtran las estructuras cuyos parámetros están "por debajo" de los umbrales.

###Estructura secundaria
La estructura secundaria del Pose se determina con las siguientes reglas:
1. Si se fija secstruct, se usa como estructura secundaria del Pose.
2. Si use_dssp es true, se usa DSSP para calcular la estructura secundaria del Pose, y esta se usa como estructura secundaria del Pose.
3. Si use_dssp es false, se usa directamente la estructura secundaria almacenada en el Pose. Ten en cuenta que no se garantiza que esta estructura secundaria coincida con el contenido del Pose a menos que un mover la haya fijado correctamente. Puede ser una cadena de 'L', puede ser espacios, o puede ser algo completamente distinto.

###Determinación de hélices
La estructura secundaria determinada arriba se usa entonces para encontrar las hélices del Pose. Luego el filtro busca los apareamientos de hélices deseados.  Los números de hélice de los apareamientos se buscan en el Pose y se analizan esas regiones.

Si no se da ningún apareamiento de hélices, se entiende que todos los apareamientos de hélices se cumplen y el filtro devuelve true.  Si, en cambio, se dan apareamientos de hélices con números de hélice que no existen en el Pose, el filtro devuelve false porque probablemente algo anda mal con la estructura secundaria del Pose.


```xml
<HelixPairing name="(&string)"
              secstruct="('' &string)"
              use_dssp="(false &bool)"
              blueprint="('' &string)"
              helix_pairings="('' &string)"
              dist="(15.0 &Real)"
              cross="(45.0 &Real)"
              align="(25.0 &Real)"
              bend="(20.0 &Real)"
              output_id="(1 &Integer)"
              output_type="('dist' &string)" />
```
-   secstruct: si se especifica, la estructura secundaria dada se asignará a la fuerza al Pose y se usará para determinar las ubicaciones de las hélices. La estructura secundaria debe tener la misma longitud que el Pose de entrada.
-   use_dssp: solo funciona si secstruct no está especificado. Si es true, se usará DSSP para determinar la estructura secundaria del Pose.  Si es false, se usará la información de estructura secundaria almacenada en el Pose.
-   helix\_pairings: si se especifica, se filtrarán los apareamientos de hélices dados. Cada apareamiento de hélices se describe con los índices de las hélices apareadas separados por "-" y con las orientaciones (P o A) después del punto ".". Ej. 1-2.A significa el apareamiento entre la 1.ª y la 2.ª hélice. Los distintos apareamientos se concatenan con punto y coma ";". Ej. 1-2.A;2-3.A;1-3.P.  Si no se especifica, los apareamientos de hélices se determinarán en tiempo de ejecución, si hay apareamientos de hélices en la caché del Pose. Ten en cuenta que si no se especifica ningún apareamiento de hélices, el filtro siempre devolverá true.
-   dist: distancia entre los puntos medios de las hélices apareadas
-   cross: ángulo entre los vectores de las hélices. El vector de la hélice va entre los centros de la hélice C-terminal y la N-terminal.
-   align: ángulo entre los vectores de las hélices proyectados sobre la lámina beta definida por las hebras que van inmediatamente antes de las hélices. Solo se calcula cuando las hebras existen dentro de los 6 residuos anteriores a las hélices.
-   bend: comprueba la curvatura dentro de la hélice. No es un parámetro relacionado con el apareamiento, sino para comprobar la curvatura intra-hélice. Básicamente, no necesitas cambiar este parámetro.
-   output\_id: el id del par de hélices que se escribirá en el archivo de puntuación. Ej. 1 significa 1-2.A en 1-2.A;2-3.P.
-   output\_type: tipo de parámetro que se escribirá en el archivo de puntuación: dist, cross o align.
-   blueprint: si se especifica, se usará un archivo blueprint para fijar la estructura secundaria deseada del Pose. Si hay información de apareamiento de hélices en el blueprint y no se da la opción "helix_pairings", los apareamientos también se fijarán. Si hay información de apareamiento de hélices en el blueprint y se da "helix_pairings", se ignorarán los apareamientos del blueprint. Consulta [[rosettaremodel]] y [[Remodel]] para ver la información sobre blueprints.

## Véase también

* [[Modelado ab initio|abinitio-relax]]
* [[Modelado de loops|loopmodel]]
* [[HelixKinkFilter]]
* [[SecondaryStructureFilter]]
* [[SecondaryStructureCountFilter]]
* [[SecondaryStructureHasResidueFilter]]

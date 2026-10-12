# FunFolDes

El protocolo **FoldFromLoops (FFL)** es una variante del _protocolo de grafting_.  
El protocolo está orientado a la inserción de motivos estructurales con un RMSD elevado respecto de la región de inserción en el andamio objetivo.

Esta documentación se refiere a la reimplementación completa del protocolo como **Funtional Protein and Design (FunFolDes)**, integrada como parte de _RosettaScripts_. Para conocer la primera versión del protocolo (**FFL**) descrita en [Correia _et al._, 2014](http://doi.org/10.1038/nature12966), consulta [apps/fold_from_loops]()

# Visión general:

**FunFolDes** requiere dos estructuras de entrada: una que contiene el **motivo** o segmento estructural que queremos conservar/transferir a una proteína nueva y el **molde** (_template_) o andamio que definirá la estructura que soportará el motivo.  
A grandes rasgos, los pasos que sigue el protocolo son (**O**-Obligatorio, **R**-Recomendado):  

1.  Extraer restricciones del **molde** (_R_).
2.  Generar fragmentos basados en la estructura del **molde** (_O_).
3.  Desplegar el **molde** y unirlo a la región del **motivo** (_O_).
4.  Realizar _ab initio_ permitiendo el movimiento en todas las regiones del **molde** pero manteniendo fijas las regiones del **motivo** (_O_).
5.  Diseñar/relajar la estructura final sin permitir el movimiento en el **motivo** (_R_).

## Aspectos destacados
### Generación automática de fragmentos
Gracias al uso del [[StructFragmentMover]], **FunFolDes** es capaz de generar fragmentos _sobre la marcha_ para guiar el plegamiento _ab initio_. Estos fragmentos usan sobre todo información estructural (estructura secundaria y ángulos phi/psi) para garantizar que la conformación de los diseños finales sea similar a la del **molde**, pero permitiendo también que el sistema explore variaciones conformacionales para ajustarse mejor al **motivo**.

### Motivo de varios segmentos
En **FunFolDes**, un **motivo** puede estar compuesto por _un_ segmento continuo o por _varios_ segmentos discontinuos, siempre que el número de puntos de inserción en el **molde** sea el mismo que el número de segmentos esperados. Los distintos segmentos se mantendrán en correlación espacial entre sí exactamente como se encuentran en la estructura original del **motivo** de entrada. Esto se logra mediante la definición del **FoldTree** y las roturas en la secuencia. Por tanto, este escenario requiere aplicar un protocolo de cierre de loops para cerrar el diseño final. Aunque sirve cualquier protocolo de cierre de loops de Rosetta, el protocolo incluye el [[NubInitioLoopClosureMover]]. Este mover conoce las restricciones impuestas por **FunFolDes** y evitará automáticamente los cambios no permitidos en los segmentos del **motivo**.

### Independiente del orden
En los **motivos** de varios segmentos, los segmentos individuales no necesitan insertarse en el **molde** en el mismo orden de secuencia en que se encuentran en la estructura de origen del **motivo**. De hecho, siempre que provengan de la misma fuente estructural, ni siquiera tienen que pertenecer a la misma proteína.

### Independiente de la longitud
Los segmentos del **motivo** no necesitan tener la misma longitud de secuencia que sus puntos de inserción. **FunFolDes** corregirá las restricciones y los fragmentos para adaptarse al posible cambio de longitud entre los diseños y el **molde**.

### Plegamiento con el ligando de unión
En los **motivos** de unión, la proteína de unión se puede añadir al proceso _ab initio_, lo que obliga a que la conformación de los diseños se adapte no solo al **motivo** sino también a la proteína de unión, de modo que no haya segmentos estructurales que puedan bloquear la función del **motivo**.

### Diseño guiado por etiquetas
Debido a la posibilidad de cambio de tamaño y para ayudar a guiar los pasos de diseño/relax, **FunFolDes** usa un sistema de etiquetas de residuos similar al del **[[MotifGraftMover]]** (más algunas otras):

|etiqueta|Función|Comportamiento esperado|
|-----|--------|------------------|
|**MOTIF**|Resalta las regiones del **motivo**|Ninguno en sí mismo|
|**TEMPLATE**|Marca los residuos que provienen del **molde**|Estos residuos pueden moverse (_bb/chi_) y diseñarse|
|**HOTSPOT**|Residuos del **motivo** considerados _clave_|Estos residuos **no** pueden moverse ni diseñarse|
|**COLDSPOT**|Residuos del **motivo** que no son _clave_|Estos residuos tienen movimiento _chi_ y pueden diseñarse|
|**FLEXIBLE**|Residuos en los bordes del **motivo** a los que se permite moverse|Estos residuos tienen movimiento _bb/chi_ pero **no** se les permite diseñarse|
|**CONTEXT**|Residuos pertenecientes a la proteína de unión objetivo (si la hay)|Estos residuos **no** pueden moverse ni diseñarse|

El comportamiento asociado a cada una de estas etiquetas es **fijo** durante el _proceso de plegamiento_ (realizado por el [[NubInitioMover]]) y el _cierre de loops_ (realizado por el [[NubInitioLoopClosureMover]]), pero el usuario puede ajustarlo en cualquier otra parte del proceso.

### Silent files con información adicional
El protocolo **FunFolDes** añade varios comentarios (remarks) a la salida en silent file para facilitar la recarga de los datos en nuevos scripts conservando las condiciones del protocolo. Entre ellos:

* **REMARK LABELS:** Todas las asignaciones de etiquetas de residuos se guardan en el archivo. Se pueden recargar con **[[DisplayPoseLabelsMover]]**.
* **REMARK WORKING_FOLDTREE:** También se guarda el _FoldTree_ de trabajo necesario para mantener en su sitio los segmentos del **motivo**. Se puede volver a cargar con la opción _from_remark_ del **[[AtomTreeMover]]**.
* **REMARK POST_NUBINITIO_SEQ:** Como existe la posibilidad de ejecutar ciclos de diseño sobre la secuencia justo después del plegamiento, se guarda la secuencia en ese estado, lo que facilita rastrear el proceso de diseño/relax.

# Salvedades conocidas

1.  Es imprescindible asegurarse de que el Pose del **molde** sea una estructura de **una sola cadena**. Ni la generación de fragmentos ni el proceso _ab initio_ admiten varias cadenas móviles.
2.  Debido al uso de etiquetas, la forma más sencilla de guiar el control del protocolo tras el plegamiento es mediante el selector de residuos [[ResiduePDBInfoHasLabel|ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_residuepdbinfohaslabel]]. Para guiar el MoveMap, se puede usar **MoveMapFactory** para generar MoveMaps basados en [[ResidueSelectors]]. Por ahora, no todos los Movers que pueden trabajar con MoveMaps pueden trabajar con el MoveMapFactory. Para los que pueden trabajar con MoveMaps con nombre, el [[MoveMapFactoryToNamedMoveMapMover]] puede ayudar.

# Componentes principales

* **[[NubInitioMover]]:** _[nub](https://en.wiktionary.org/wiki/nub) inito_ se refiere al proceso _ab initio_ alrededor de un punto central de una proteína; en este caso, el **motivo**. Este proceso es el elemento diferenciador clave del protocolo **FunFolDes**, y este mover es su componente principal. Al Mover se le asignan las tareas de (a) obtener el **motivo** de la estructura de origen, (b) desplegar el **molde** y unirlo a los bordes del **motivo**, (c) plegar la estructura nueva y (d) evaluar la viabilidad de la proteína plegada obtenida para seguir avanzando en el proceso.
* **[[NubInitioLoopClosureMover]]:** Al trabajar con **motivos** de varios segmentos, este mover es capaz de asegurar una estructura final cerrada sin afectar de ninguna forma inesperada a los residuos del **motivo**. Idealmente, este debería ser el último mover al que se llama antes de la parte de evaluación del _script_. Cerrar los puntos de corte de la estructura antes de cualquier movimiento de la cadena principal muy probablemente provocará cambios entre las posiciones correlativas de los distintos segmentos del **motivo**. El mover es lo bastante «inteligente» para evaluar si hace falta. Por eso se recomienda encarecidamente añadirlo siempre y dejar que decida si tiene que intentar cerrar alguna rotura de cadena.

# Flujos de trabajo

* [[Ejecutar FunFolDes en RosettaScripts|RunningFunFolDes]]
* [[Recargar ejecuciones de FunFolDes para seguir diseñando o analizando|ReloadingFunFolDes]]

# Historial de la documentación:
* Escrito por Jaume Bonet. **Marzo de 2018**.

#HybridizeMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## HybridizeMover

Realiza modelado comparativo, como se describe en detalle en:  
[High-resolution comparative modeling with RosettaCM](http://www.sciencedirect.com/science/article/pii/S0969212613002979).  
Song Y, DiMaio F, Wang RY, Kim D, Miles C, Brunette T, Thompson J, Baker D.,
Structure. 2013 Oct 8;21(10):1735-42. doi:10.1016/j.str.2013.08.005. Epub 2013 Sep 12.

## Descripción general

El mover Hybridize muestrea combinaciones estructurales de varios modelos de entrada. Se usa como parte del flujo de modelado comparativo RosettaCM. Para una descripción más detallada de su uso en el modelado comparativo, consulta [[RosettaCM]].

Sin embargo, el mover también puede usarse de forma más general para el modelado estructural; aquí se muestran varias opciones avanzadas con ese fin.

El formato general de entrada se muestra aquí:

```xml
     <Hybridize name="&string" stage1_scorefxn="&sring" stage2_scorefxn="&string" fa_scorefxn="&string" batch="(1 &bool)">
            <Template pdb="&string" cst_file="AUTO" weight="1.000" />
            <Template pdb="&string" cst_file="AUTO" weight="1.000" />
            ...
     </Hybridize>
```

## Opciones por plantilla
* **pdb=1xxx.pdb**: (obligatorio) un archivo PDB correspondiente a una plantilla. Los modelos pueden estar incompletos, con la _numeración_ especificando el índice de cada residuo. Consulta [[RosettaCM]] para ver cómo puede usarse la aplicación partial_thread para generar estas entradas.
* **cst_file=AUTO**: (valor predeterminado AUTO) uno de NONE, AUTO o un [[archivo de restricciones en formato Rosetta|constraint-file]]
* **weight=1.0**: (valor predeterminado 1.0) la frecuencia relativa de muestreo de la plantilla dada
* **symmdef=C2.symm**: (opcional) un archivo de definición de [[simetría|symmetry]]

Ten en cuenta que el protocolo procede seleccionando primero un modelo de plantilla inicial y muestreando después subestructuras de las otras plantillas. La variable **weight** solo controla ese primer paso. Por lo tanto, si tienes modelos muy incompletos, se recomienda asignarles peso 0: nunca se usarán como modelos iniciales, pero los fragmentos de ellos se recombinarán con otros modelos.

## Opciones de archivos de fragmentos

Pueden proporcionarse [[archivos de fragmentos|fragment-file]] de entrada añadiendo la siguiente etiqueta dentro del bloque `<Hybridize ...>...</Hybridize>`:

```xml
<Hybridize ...>
    <Fragments three_mers="t000_.200.3mers.gz" nine_mers="t000_.200.9mers.gz"/>
</Hybridize>
```

Si no se proporcionan, los fragmentos se construirán automáticamente.

## Mover Hybridize: opciones básicas

Las siguientes opciones controlan la puntuación:

* **stage1_scorefxn=score3**: (valor predeterminado _score3_) función de puntuación en la etapa 1 (centroide)
* **stage2_scorefxn=score4_smooth_cart**: (valor predeterminado _score4_smooth_cart_) función de puntuación en la etapa 2 (centroide)
* **fa_scorefxn=talaris2013_cart**: (valor predeterminado _talaris2013_cart_) función de puntuación en la etapa con todos los átomos
* **fa_cst_file=fullatom.cst** (opcional) si se especifica, usa las restricciones proporcionadas en la etapa con todos los átomos en lugar de las restricciones del centroide
* **keep_pose_constraint=0** (valor predeterminado=0) si se pone en 1, conserva las restricciones de la Pose entrante (útil si las restricciones se generan en un mover anterior a hybridize)
* **disulf_file=dslf** (opcional) si se especifica, fuerza el patrón de disulfuros adjunto ([[consulta la opción fix_disulf para ver el formato|full-options-list#run]])

Las siguientes opciones controlan el flujo del protocolo:

* **stage1_increase_cycles=1.0**: (valor predeterminado 1.0) aumenta/reduce el muestreo en la etapa 1
* **stage2_increase_cycles=1.0**: (valor predeterminado 1.0) aumenta/reduce el muestreo en la etapa 2
* **stage25_increase_cycles=1.0**: (valor predeterminado 1.0) aumenta/reduce el número de pasos de minimización posteriores a la etapa 2
* **batch=1**: (valor predeterminado 1) el número de estructuras centroide que se generan por modelo con todos los átomos. Poner este valor en 0 solo ejecutará el modelado centroide.
* **stage2_temperature=2**: (valor predeterminado 2) _kT_ para la simulación de Monte Carlo
* **realign_domains=0**: (valor predeterminado 1) si no se establece, no alineará los dominios de entrada entre sí antes de ejecutar el protocolo. Desactivar esta opción requiere que los dominios de entrada hayan sido alineados previamente en un marco de referencia común. Puede ser útil desactivar esta opción para construir modelos en densidad (si todas las entradas se acoplan en densidad).

Las siguientes opciones gestionan los ligandos:

* **add_hetatm=1**: (valor predeterminado 0) si se pone en 1, usa los ligandos de los archivos de plantilla de entrada (consulta [[RosettaCM]] para más detalles)
* **hetatm_cst_weight=1** (valor predeterminado 1) si add_hetatm está habilitado, esto fijará el peso de las restricciones intraligando generadas automáticamente.
* **hetatm_to_protein_cst_weight=1** (valor predeterminado 0) si add_hetatm está habilitado, esto fijará el peso de las restricciones ligando-proteína generadas automáticamente.

## Mover Hybridize: opciones avanzadas

En esta sección se destacan opciones más avanzadas. Ten en cuenta que pueden ser experimentales, así que úsalas bajo tu propia responsabilidad.

Las siguientes opciones pueden ser útiles para aplicar hybridize de forma iterativa:

Primero, para partir de una cadena extendida, usa la siguiente etiqueta de plantilla:

```xml
<Hybridize ...>
           <Template pdb="extended" weight="1.0" cst_file="x.cst" />
</Hybridize>
```

Si todas las demás plantillas tienen peso cero, el protocolo siempre partirá de una única cadena extendida (salvo que también se especifique add_non_init_chunks, en cuyo caso se tomarán transformaciones aleatorias de cuerpo rígido de otras plantillas).

Para un control fino del comportamiento del protocolo, controla los pesos relativos de cada movimiento:
* **frag_1mer_insertion_weight=1.0** (valor predeterminado AUTO)
* **small_frag_insertion_weight=1.0** (valor predeterminado AUTO)
* **big_frag_insertion_weight=1.0** (valor predeterminado AUTO)
* **chunk_insertion_weight=1.0** (valor predeterminado AUTO)

La opción "AUTO" de todas ellas escala los pesos relativos según la cobertura/completitud de la estructura de entrada. ¡Así que ajústalas con cuidado!

Otras opciones de control fino del protocolo:

* **max_registry_shift=4**: (valor predeterminado 0) añade un movimiento aleatorio que desplaza la secuencia durante la construcción del modelo
* **realign_domains_stage2=1**: (valor predeterminado 0) si se establece, realinea los dominios entre las dos etapas de centroide; por defecto solo alinea los modelos iniciales.
* **frag_weight_aligned=0.2**: (valor predeterminado 0) permite inserciones de fragmentos en regiones de la plantilla. El valor predeterminado es 0; aumentarlo llevará a una mayor diversidad de modelos.
* **max_contig_insertion=25**: (valor predeterminado infinito) limita la longitud de los movimientos de "recombinación de plantillas". Es útil cuando las entradas son de longitud completa (sin huecos).
* **fragprob_stage2=0.8**: (valor predeterminado 0.3) controla la proporción entre inserciones de fragmentos y movimientos de recombinación de plantillas
* **randfragprob_stage2=0.8**: (valor predeterminado 0.5) controla el número de inserciones aleatorias de fragfile frente a inserciones en 'cutpoint'
* **csts_from_frags=1**: (valor predeterminado 0) si se establece, deriva restricciones diedras de los fragmentos de entrada; debes fijar el peso de 'dihedral_constraint' en las etapas en las que quieras usarlas
* **add_non_init_chunks=4**: (valor predeterminado 0) normalmente, los segmentos (chunks) de estructura secundaria del modelo inicial se usan para establecer el foldtree. Esta opción también tomará segmentos de otras plantillas (siempre que no se solapen con los segmentos actuales); el número es el número esperado de segmentos (distribución de Poisson). _Se recomienda esta opción cuando se parte de una cadena extendida._

El bloque de **controles detallados** permite fijar ciertas subestructuras. Puede especificarse añadiendo la siguiente etiqueta dentro del bloque <Hybridize ...></Hybridize>:

```xml
<Hybridize ...>
    <DetailedControls start_res="273" stop_res="296" sample_template="0" sample_abinitio="0" task_operations="&string"/>
</Hybridize>
```

Esto indica que, para los residuos 273-296, no se permiten movimientos de hibridación de plantillas (sample_template=0) ni movimientos de inserción de fragmentos (sample_abinitio=0). Si ambos se ponen en false para una región, esa región tampoco se minimizará en centroide (ten en cuenta, sin embargo, que el refinamiento con todos los átomos ignora estas opciones).

##Véase también

* [[RosettaCM]]: protocolo completo de modelado comparativo de Rosetta
* [[SimpleThreadingMover]]: enhebrado simple en RosettaScripts
* [[FastRelaxMover]]: la aplicación relax
* [[Preparing structures]]: página sobre cómo preparar estructuras para usarlas en Rosetta con relax.
* [[I want to do x]]: guía para elegir un mover
# RotamerBoltzmannWeight
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## RotamerBoltzmannWeight

Aproxima la probabilidad de Boltzmann de aparición de un rotámero. El método, ejemplos de uso y scripts de análisis se publican en Fleishman et al. (2011) Protein Sci. 20:753.

Los residuos que se probarán se definen con un task\_factory (pon todos los residuos inertes en no repack). Un primer escaneo de alaninas examina qué residuos contribuyen de forma sustancial a la afinidad de unión. Luego se toma el conjunto de rotámeros de cada uno de estos residuos, se impone cada rotámero en el Pose, se reempaqueta y minimiza la capa circundante y se suma la energía para producir una probabilidad de Boltzmann. Se puede calcular tanto en el estado unido como en el no unido.

Al parecer es un buen discriminador entre diseños y nativos: muchos diseños muestran probabilidades altas para sus rotámeros de mayor contribución tanto en el estado unido como en el no unido.

El filtro también informa un valor modificado del ddG del complejo. Calcula el ddG inicial y le resta una fracción de la energía de interacción de cada residuo cuya probabilidad de rotámero está por debajo de cierto umbral. La energía de interacción se calcula solo para el residuo estudiado y sus contactos con residuos de otra cadena.

En contextos de valores reales, el valor del filtro por defecto es el valor del ddG modificado. Si la opción no\_modified\_ddG es true, el valor del filtro es igual al negativo de la probabilidad media de los rotámeros en los residuos evaluados.

Funciona con Poses simétricos y con Poses con "bloques de construcción" simétricos.

```xml
<RotamerBoltzmannWeight name="(&string)" task_operations="(comma-delimited list)" radius="(6.0 &Real)" jump="(1 &Integer)" sym_dof_names="('' &string)" unbound="(1 &bool)" ddG_threshold="(1.5 &Real)" scorefxn="(score12 &string)" temperature="(0.8 &Real)" energy_reduction_factor="(0.5 &Real)" repack="(1&bool)" skip_ala_scan="(0 &bool)" skip_report="(0 &bool)" no_modified_ddG="(0 &bool)">
   <Threshold restype="???" threshold_probability="(&Real)"/>
   .
   .
   .
</RotamerBoltzmannWeight>
```

-   task\_operations: definen con qué residuos se trabaja. Pon en no repack todos los residuos que no se van a probar.
-   radius: radio de reempaquetado alrededor del rotámero considerado. Estos residuos se reempaquetarán y minimizarán para cada rotámero probado
-   jump: qué jump se examina
-   sym\_dof\_names: qué jumps se examinan: busca los jumps que corresponden a los sym\_dofs y separa el Pose a lo largo de estos jumps. Puede separar a lo largo de varios a la vez.
-   unbound: ¿probar el estado unido o el no unido?
-   ddG\_threshold: un filtro adicional sobre qué diseños se prueban. Solo se probarán los residuos que contribuyen a la unión más que la cantidad indicada.
-   temperature: el factor de escala de los cálculos de Boltzmann. En realidad es kT y no solo T.
-   energy\_reduction\_factor: por qué factor de la energía de interacción se reduce el ddG.
-   repack: reempaqueta en los estados unido y no unido antes de informar los valores de energía de unión (ddG). Si es false, no reempaqueta (dG).
-   skip\_ala\_scan: no hace el primer escaneo de alaninas. En su lugar calcula solo para los residuos que el task factory permite reempaquetar.
-   skip\_report: si es true, la función report() del filtro no volverá a calcular la puntuación del filtro.  Esto no afectará al valor del filtro que report_sm() informa en el archivo de puntuación. Si es false, la función report() recalculará e informará la puntuación del filtro en stdout.  La puntuación del filtro se calculará dos veces en una ejecución de RosettaScripts si esta opción es false. (Por defecto=false por razones históricas)
-   no\_modified\_ddG: omite el cálculo del ddG.
-   ??? cualquiera de los códigos de tres letras de los residuos (TRP, PHE, etc.)

## Véase también

* [[Diseño en Rosetta|application_documentation/design/design-applications]]
* [[PackRotamersMover]]
* [[AlaScanFilter]]
* [[DdgFilter]]



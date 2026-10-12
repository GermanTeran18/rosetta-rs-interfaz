# BackboneGridSampler
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## BackboneGridSampler

Genera una cadena de residuos idénticos y muestrea conjuntos de valores de torsión de la cadena principal, dando a todos los residuos el mismo conjunto de valores de torsión de la cadena principal. Es útil para identificar estructuras secundarias (en particular, estructuras secundarias helicoidales con puentes de hidrógeno internos) de heteropolímeros nuevos. Ten en cuenta que este mover descarta cualquier geometría de entrada.
<br/><b>Actualización (15 de mayo de 2015):</b>  BackboneGridSampler ahora puede muestrear conformaciones repetitivas de la cadena principal en las que la unidad de repetición consta de más de un residuo. Esto puede ser útil para muestrear conformaciones de mezclas de distintos tipos de bloques de construcción, <i>p. ej.</i>, cadenas D-L-L-D-L-L, o alfa-beta-alfa-beta, o lo que sea.

```xml
<BackboneGridSampler name="(&string)" residues_per_repeat="(1 &int)" (residue_name="('ALA' &string)" OR residue_name_1="('ALA' &string)" residue_name_2="('ALA', &string)", etc.) scorefxn="(&string)" max_samples="(10000 &int)" selection_type="('low' &string)" pre_scoring_mover="(&string)" pre_scoring_filter="(&string)" dump_pdbs="(false &bool)" pdb_prefix="('bgs_out' &string)" nstruct_mode="(false &bool)" nstruct_repeats="(1 &int)" (residue_count="(12 &int)" OR repeat_count="(12 &int)") cap_ends="(false &bool)">
     <MainchainTorsion res_index="(1 &int)" index="(&int)" (value="(&Real)" | start="(&Real)" end="(&Real)" samples="(&int)" />
     <MainchainTorsion ... />
     <MainchainTorsion ... />
</BackboneGridSampler>
```

Las opciones de este mover son:
-  **residues_per_repeat**:  el número de residuos que forman la unidad repetitiva de la hélice. Valor predeterminado: 1.
-  **residue_name**:  el tipo de residuo con el que se construirá el polímero. Valor predeterminado: alanina. Ten en cuenta que si **residues_per_repeat** se fija en un número mayor que 1, el usuario debe especificar **residue_name_1**, **residue_name_2**, <i>etc.</i> para cada residuo de la unidad repetitiva.
-  **scorefxn**:  la función de puntuación que se usa para elegir la conformación de menor energía (o de mayor energía, si selection_type="high"). Opción obligatoria.
-  **max_samples**:  el número máximo de puntos de la rejilla que se muestrean. Si el número total de puntos de la rejilla supera este valor, se lanzará un error y Rosetta terminará. Así se evita intentar por descuido rejillas irrealmente enormes, aunque el usuario siempre puede aumentar este valor para permitir muestrear rejillas más grandes.
-  **selection_type**:  por defecto es "low", lo que significa que la conformación de menor energía muestreada (que supere los movers y filtros previos a la puntuación) será la Pose de salida. Si se pone en "high", se selecciona la conformación de mayor energía.
-  **pre_scoring_mover**:  un mover opcional que puede aplicarse a las Poses muestreadas antes de puntuarlas. Aquí pueden resultar útiles los movers de empaquetado de cadenas laterales. Se respeta el estado de salida del mover, y los movers que fallan hacen que se descarten las muestras.
-  **pre_scoring_filter**:  un filtro opcional que puede aplicarse a las Poses muestreadas antes de puntuarlas. Las Poses que no lo superan se descartan y no se seleccionarán aunque tengan la menor energía.
-  **dump_pdbs**:  si es true, se escribe un archivo PDB por cada conformación muestreada que supere los movers y filtros previos a la puntuación. Por defecto es false.
-  **pdb_prefix**:  si dump_pdbs es true, es el prefijo de los archivos PDB que se escriben. Se les añade un número. Por defecto el prefijo es "bgs_out" (es decir, los archivos PDB se llaman "bgs_out_0001.pdb", "bgs_out_0002.pdb", etc.).
-  **nstruct_mode**:  si es true, cada trabajo muestrea un conjunto distinto de valores de torsión de la cadena principal (con un solo conjunto de valores de torsión de la cadena principal muestreado por trabajo). Es útil para repartir automáticamente el muestreo entre muchos procesadores (suponiendo que se use la compilación MPI de rosetta_scripts, que reparte los trabajos entre procesadores automáticamente). Por defecto es false, lo que significa que cada trabajo muestrea todos los conjuntos de valores de torsión de la cadena principal.
-  **nstruct_repeats**:  si se fija en un valor N mayor que 1, N trabajos consecutivos muestrearán el mismo conjunto de valores de torsión de la cadena principal. Es útil para el muestreo repetido, por ejemplo, si quieres aplicar un mover estocástico a cada punto de la rejilla muestreado.
-  **residue_count** o **repeat_count**:  el número de unidades repetitivas de la cadena generada. Si **residues_per_repeat** es 1, pueden usarse indistintamente **residue_count** o **repeat_count**. Si **residues_per_repeat** es mayor que 1, debe usarse **repeat_count**. Doce (12) por defecto.
-  **cap_ends**:  si es true, el extremo inferior se acetila y el superior se aminometila. Puede ser buena idea para cadenas principales unidas por enlaces peptídicos, para evitar cargas en los extremos de la hélice. Por defecto es false.

Los bloques **MainchainTorsion** sirven para definir las torsiones de la cadena principal que se muestrean o que se mantienen fijas. Si no se especifica una torsión de la cadena principal, se mantiene fija en su valor predeterminado (según el archivo params del residuo). Cada etiqueta **MainchainTorsion** tiene las siguientes opciones:

-  **res_index**:  el índice del residuo en la unidad repetitiva (1, 2, 3, etc.). Por defecto es 1 y no hace falta especificarlo si solo hay 1 residuo por unidad repetitiva.
-  **index**:  el índice de la torsión de la cadena principal en el residuo especificado. (p. ej., para alfa-aminoácidos, **index=1** es phi, **index=2** es psi, **index=3** es omega).
-  **value**:  un valor fijo al que debe ajustarse esta torsión de la cadena principal. Esto impide el muestreo y no puede usarse junto con las opciones **start**, **end** o **samples**.
-  **start**:  el valor inicial de un intervalo que se va a muestrear. No puede usarse junto con la opción **value**.
-  **end**:  el valor final de un intervalo que se va a muestrear. No puede usarse junto con la opción **value**.
-  **samples**:  el número de muestras dentro de un intervalo que se va a muestrear. No puede usarse junto con la opción **value**. El número total de muestras será el producto de todas las opciones **samples**.


##Véase también

* [[I want to do x]]: guía para elegir un mover
* [[BundleGridSamplerMover]]
* [[SmallMover]]
* [[ShearMover]]

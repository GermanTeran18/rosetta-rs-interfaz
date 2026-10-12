#AlignmentGapInserterFilter

Documentación de Christoffer Norn (ch.norn@gmail.com). Página creada el 14 de agosto de 2017.

*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

##AlignmentGapInserterFilter

Recorre un alineamiento e inserta huecos (gaps) donde las posiciones del alineamiento no son representativas del entorno químico de la secuencia del Pose.

Lee available_AAs_file (generado con AlignmentAAFinderFilter), que contiene todos los aminoácidos que caben en la secuencia del Pose. Luego itera por todas las secuencias alineadas, las enhebra sobre la secuencia del Pose (ignorando las inserciones y sustituyendo los huecos por glicinas) y pregunta, para cada posición de confianza*: ¿el entorno químico aquí es el mismo que en la secuencia del Pose? Para determinar si es el mismo, se puntúan los aminoácidos disponibles en ambos entornos; si la diferencia máxima de puntuación entre dos aminoácidos disponibles cualesquiera es >max_score_diffs, se inserta un hueco en esa posición para esa secuencia alineada.

*Posición de confianza: la confianza se construye con tres pruebas: (1) ¿Los indels que rodean (+/- 2 (indel_motif_radius)) al aminoácido objetivo son los mismos en la secuencia del alineamiento y en la secuencia del Pose? (2) Si está en un loop: ¿la identidad de secuencia de todo el loop es suficientemente alta (lista de umbrales de identidad de secuencia) y los indels son los mismos en todo el loop? (3) ¿Confiamos en que los residuos vecinos están en las mismas posiciones en las secuencias del alineamiento que en la secuencia del Pose? (3a) Para cada vecino: ¿los indels que rodean (+/- 2 (indel_motif_radius)) al aminoácido objetivo son los mismos en la secuencia del alineamiento y en la secuencia del Pose? (3b) Para cada vecino: si está en un loop, ¿la identidad de secuencia de todo el loop es suficientemente alta (lista de umbrales de identidad de secuencia) y los indels son los mismos en todo el loop?

## Opciones y uso

```xml
< AlignmentGapInserterFilter name="(&string)" 
    scorefxn="(beta_nov16 &string)" 
    nbr_e_threshold="(0.1 &float)" 
    indel_motif_radius="(2 &int)" 
    alignment_file="(null &string)" 
    available_AAs_file="(null &string)"
    cleaned_alignment_file="(null &string)"
    loop_seqid_threshold="(comma separated floats)" 
    max_score_diffs="(comma separated floats)"
    only_clean_seq_num="(null &int)"
/>
```

**scorefxn** -- La función de puntuación que se usará durante el reempaquetado.

**nbr_e_threshold** -- El valor absoluto de la energía residuo-residuo que se usa para definir qué es un residuo vecino.

**indel_motif_radius** -- El radio del motivo de indels.

**alignment_file** -- El archivo de alineamiento de entrada.

**available_AAs_file** -- Lista de aminoácidos disponibles para cada posición (normalmente se genera con AlignmentAAFinderFilter).

**cleaned_alignment_file** -- Alineamiento de salida.

**loop_seqid_thresholds** -- Lista separada por comas de identidades de secuencia que se usan para decidir la confianza.

**max_score_diffs** -- La diferencia máxima de puntuación que no provoca la inserción de un hueco.

**only_clean_seq_num** -- Limpia solo una de las secuencias alineadas. Es especialmente útil en alineamientos grandes, que se quieren dividir y ejecutar en paralelo trivial (embarrassingly parallel) en varios núcleos.

## Véase también

* Filtro [[AlignmentAAFinder|AlignmentAAFinderFilter]].
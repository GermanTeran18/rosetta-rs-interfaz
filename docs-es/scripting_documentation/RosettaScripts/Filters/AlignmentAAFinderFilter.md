#AlignmentAAFinderFilter

Documentación de Christoffer Norn (ch.norn@gmail.com). Página creada el 14 de agosto de 2017.

*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

##AlignmentAAFinderFilter

Este filtro se suele combinar con AlignmentGapInserter. Recorre todas las posiciones de la secuencia del Pose y comprueba si los aminoácidos presentes en secuencias homólogas (del alineamiento) cabrían en la secuencia del Pose. Solo prueba los aminoácidos de las secuencias homólogas si confiamos en que su cadena principal es la misma que en la estructura del Pose. Esta confianza se basa en dos pruebas: (1) ¿Los indels que rodean (+/- 2 (indel_motif_radius)) al aminoácido objetivo son los mismos en la secuencia del alineamiento y en la secuencia del Pose? (2) Si está en un loop: ¿la identidad de secuencia de todo el loop es suficientemente alta (>0.5) y los indels son los mismos en todo el loop?


## Opciones y uso

```xml
< AlignmentAAFinder name="(&string)" 
    scorefxn="(beta_nov16 &string)" 
    exclude_AA_threshold="(10.0 &float)" 
    alignment_file="(null &string)" 
    loop_seqid_threshold="(0.50 &float)" 
    indel_motif_radius="(2 &int)" 
    available_AAs_file="(null &string)"
/>
```

**scorefxn** -- La función de puntuación que se usará durante el reempaquetado.

**exclude_AA_threshold** -- El umbral de energía que se usa para decidir si un residuo cabe o no en la secuencia del Pose.

**alignment_file** -- Alineamiento de entrada (formato fasta).

**loop_seqid_threshold** -- Identidad de secuencia mínima de los loops a partir de la cual se pueden considerar los aminoácidos disponibles.

**indel_motif_radius** -- El radio del motivo de indels.

**available_AAs_file** -- Nombre del archivo de salida.

## Véase también

* Filtro [[AlignmentGapInserter|AlignmentGapInserterFilter]].
#SequenceDistanceFilter

Documentación de Christoffer Norn (ch.norn@gmail.com).  Página creada el 14 de agosto de 2017.

*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

##SequenceDistanceFilter

Este filtro calcula la distancia de Hamming entre la secuencia actual del Pose y una secuencia guardada en los comentarios del Pose (sequence_comment_id) O una secuencia indicada directamente en el script XML (target_seq). Para escribir en los comentarios del Pose una secuencia anterior usa SaveSequenceToPoseMover.

## Opciones y uso

```xml
< SequenceDistance name=(string)
     sequence_comment_id=(string,"true")
     target_sequence=(string,"true")
     threshold=(int,"8000") 
     confidence=(real,"1.0")
/>
```

**name** -- Una cadena única con la que se hará referencia a una instancia concreta del filtro en un archivo XML de RosettaScripts.

**sequence_comment_id** -- Identificador del comentario del que se debe cargar la secuencia del Pose. Normalmente se usa SaveSequenceToComments para guardar en los comentarios una secuencia obtenida antes en el protocolo.

**target_sequence** -- Secuencia de aminoácidos con la que se compara la secuencia del Pose.

**threshold** -- La distancia de Hamming máxima.  Por defecto 8000.

**confidence** -- Probabilidad de que el Pose se descarte si no supera este filtro.

## Véase también

* El mover [[SaveSequenceToComments| SaveSequenceToCommentsMover]].
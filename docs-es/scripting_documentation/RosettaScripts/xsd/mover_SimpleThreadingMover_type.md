<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com)
Modificado: Vikram K. Mulligan (vmulligan@flatironinstitute.org) para añadir compatibilidad con residuos no canónicos.
Este mover hace threading de la secuencia de una región sobre la Pose dada. Nada especial. Es útil combinado con la opción -parser:string_vars para reemplazar cadenas dentro del RosettaScript. Para un protocolo de modelado comparativo más sofisticado, consulta el estupendo RosettaCM

Referencias e información de autoría del mover SimpleThreadingMover:

Autor(es) de SimpleThreadingMover (Mover):
Jared Adolf-Bryfogle, The Scripps Research Institute, La Jolla, CA [jadolfbr@gmail.com]

```xml
<SimpleThreadingMover name="(&string;)" pack_neighbors="(false &bool;)"
        neighbor_dis="(6.0 &real;)" start_position="(&string;)"
        thread_sequence="(&string;)" scorefxn="(&string;)"
        skip_unknown_mutant="(&bool;)" pack_rounds="(5 &positive_integer;)"
        sequence_mode="(oneletter &SequenceMetric_output_modes;)" />
```

-   **pack_neighbors**: Opción para empaquetar los vecinos durante el threading. Por defecto solo se reempaquetan los residuos mutados, y no los vecinos.
-   **neighbor_dis**: Distancia a la que se reempaquetan las cadenas laterales vecinas. Distancia de la capa de reempaquetado para cada residuo enhebrado. Por defecto es 6.0 Å.
-   **start_position**: (OBLIGATORIO) Posición donde empieza el threading. Numeración PDB (como 30L) o numeración de Pose de Rosetta. La numeración PDB se interpreta al aplicar, para permitir cambios en la longitud de la Pose antes de aplicar este mover
-   **thread_sequence**: (OBLIGATORIO) La secuencia de residuos que se injerta. Se puede dar como códigos de una letra (por ejemplo "RSTX[DASP]LNE"), códigos de tres letras separados por comas (por ejemplo "ARG,SER,THR,DAS,LEU,ASN,GLU"), nombres base (por ejemplo "ARG,SER,THR,DASP,LEU,ASN,GLU") o nombres completos (por ejemplo "ARG,SER:N_Methylation,THR,DASP,LEU,ASN,GLU"), según el valor de sequence_mode.
-   **scorefxn**: Nombre opcional de una función de puntuación, configurada en el bloque de funciones de puntuación
-   **skip_unknown_mutant**: Omite los aminoácidos desconocidos en la cadena thread_sequence en lugar de lanzar una excepción.
-   **pack_rounds**: Número de rondas de empaquetado para el threading. Ponlo en 0 para omitir todo el empaquetado; en ese caso, las nuevas cadenas laterales probablemente tendrán conformaciones muy malas. Por defecto es 5.
-   **sequence_mode**: El formato de la secuencia de entrada. Los formatos permitidos son: oneletter, threeletter, basename o fullname.

---

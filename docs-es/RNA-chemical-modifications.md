# Modificaciones químicas del ARN

Muchos nucleótidos de los ARN naturales llevan modificaciones químicas, ya sea como modificaciones obligatorias (véanse en particular los ARNt y los ARNr) o como ediciones transitorias de bases. Las moléculas de ARN sintéticas pueden editarse para conferirles mayor estabilidad química (véase el uso frecuente de modificaciones con azufre en la cadena principal de fosfato y de 2'OMe en el azúcar en los siRNA, o de pseudouridina en las terapias de ARNm). Los procesos naturales pueden dar lugar a modificaciones adicionales de las bases 

### Parámetros de Rosetta

Es posible que ya existan parámetros de Rosetta para el nucleótido que te interesa. Si ya se encuentra en `database/chemical/residue_type_sets/fa_standard/residue_types/nucleic/rna_nonnatural/`, no necesitas hacer nada más. Si ya se ha resuelto una estructura PDB que incluya este nucleótido, tampoco necesitarás hacer mucho: el Chemical Components Dictionary puede incluirlo y anotarlo correctamente como residuo "polimérico". La funcionalidad puede ser algo más limitada, pero podrás minimizar la energía de una estructura que lo contenga sin observar comportamientos catastróficos.

Si no se ha resuelto ninguna estructura con este nucleótido, o si quieres hacer un modelado más extenso (por ejemplo, ensamblaje de fragmentos), necesitarás compatibilidad explícita con archivos de parámetros, que quizás debas incorporar a mano. Consulta (aquí)[RNA fasta file] para ver una lista de los nucleótidos ya admitidos.

### Crear nuevos parámetros

En la práctica, puedes editar a mano los archivos de parámetros de Rosetta, simplemente copiando un tipo de residuo base (si te interesa modelar la 8-oxo-guanosina, considera partir de la guanosina) y modificándolo. (A saber: tendrás que añadir un átomo de oxígeno y quitar un hidrógeno; tendrás que añadir un enlace entre el carbono correcto de la nucleobase y el nuevo oxígeno; y tendrás que configurar la cinemática de coordenadas internas del oxígeno). Tu primera estimación de estos parámetros puede ser imperfecta, pero si no es suficientemente buena, puedes reoptimizar la geometría interna con QM o de forma semiempírica, según desees.
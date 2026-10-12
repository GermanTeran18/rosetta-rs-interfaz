# Aplicación simple_cycpep_predict

Página creada el 21 de septiembre de 2015 por Vikram K. Mulligan, laboratorio Baker (vmullig@uw.edu).

## Descripción general

La aplicación **simple_cycpep_predict** es una herramienta de validación de diseños sin fragmentos, pensada para péptidos pequeños con la cadena principal ciclada, análoga a AbinitioRelax para diseños de proteínas.  Prepara una cadena con la cadena principal ciclada, usa GeneralizedKIC para muestrear conformaciones y cerrar la geometría, y luego aplica unas cuantas rondas de FastRelax en dos tandas (una primera con los términos de enlace de hidrógeno de la cadena principal aumentados para conservar los enlaces de hidrógeno, y una segunda con esos términos en sus valores normales).  Las opciones de usuario permiten filtrar según el número de enlaces de hidrógeno de la cadena principal.

## Uso típico

Supongamos que queremos generar gráficos del paisaje de energía de un péptido de seis residuos con la secuencia VAL-DPRO-ARG-ILE-DPRO-GLU, y que tenemos un diseño de este péptido en el archivo inputs/native.pdb.  Supongamos también que queremos que cada solución tenga al menos un enlace de hidrógeno y que parta de un cierre inicial con al menos dos.  Primero generaríamos un archivo de secuencia (llamémoslo sequence.txt, también en el directorio inputs/) que contenga la secuencia "VAL DPRO ARG ILE DPRO GLU" (sin comillas).  Luego ejecutaríamos simple_cycpep_predict en un solo procesador, volcando la salida en out.log, con las siguientes opciones de línea de comandos:

```
nohup <path to Rosetta bin directory>/simple_cycpep_predict.default.<os><compiler><mode> -sequence_file inputs/sequence.txt -in:file:native inputs/native.pdb -ex1 -ex2 -out:file:silent output.silent -genkic_closure_attempts 5000 -min_genkic_hbonds 2 -min_final_hbonds 1 -nstruct 1000 >out.log &
```

El registro de salida contendrá líneas con el RMSD, la energía y el número de enlaces de hidrógeno de cada solución encontrada.  Puedes localizarlas con el siguiente comando:

```
grep RMSD out.log -A1 | grep -v -P '\-\-|RMSD'
```

## Opciones de usuario

- **nstruct [integer]**:  El número de trabajos que se intentarán.  Es el número máximo de estructuras que se devolverán (si ninguno de los intentos falla).
- **in::file::native [filename]**:  Un archivo PDB opcional con el estado nativo o de diseño.  Debe ser un péptido cíclico con el mismo número de residuos que la secuencia proporcionada.  Si se usa esta opción, se calculará un valor de RMSD para cada trabajo que devuelva una estructura.
- **out::file::o [prefix]**:  Prefijo de los archivos PDB que se escribirán.  Por defecto "S_".
- **out::file::silent [name]**:  Alternativa a **out::file::o**.  Escribe toda la salida en un único silent file binario.  Útil para muestreo a gran escala.
- **sequence_file [filename]**:  Entrada obligatoria.  Un archivo de texto con la secuencia, dada como nombres completos de los bloques de construcción separados por espacios en blanco (p. ej., "ALA DPRO DLYS B3F ARG PHE VAL").
- **genkic_closure_attempts [integer]**:  El número máximo de intentos de cierre que se harán para cada trabajo especificado con la opción **nstruct**.
- **genkic_min_solution_count [integer]**:  El número mínimo de soluciones que el algoritmo GeneralizedKIC debe haber encontrado antes de abandonar la búsqueda y elegir la solución de menor energía.  Por defecto es 1 (lo que elige una solución en cuanto se encuentra alguna).  Si se fija en 0, se buscarán soluciones hasta que el número de intentos iguale al fijado con la opción **genkic_closure_attempts**, momento en el que se elegirá una.
- **cyclic permutations [boolean]**:  ¿Deben generarse permutaciones cíclicas de la secuencia durante el muestreo, para minimizar los artefactos o sesgos introducidos por la elección de los puntos de cierre de GeneralizedKIC?  Por defecto true.
- **use_rama_filter [boolean]**:  ¿Deben rechazarse las soluciones de GeneralizedKIC si los residuos pivote que son alfa-aminoácidos tienen malas puntuaciones de Ramachandran?  Por defecto true.
- **rama_cutoff [real]**:  Si se usa la opción **use_rama_filter**, es la energía de Ramachandran por encima de la cual se rechazan las soluciones.  Por defecto 0.3 unidades de energía de Rosetta.
- **high_hbond_weight_multiplier**:  Las soluciones de GenKIC se eligen, y las rondas iniciales de FastRelax se realizan, con una función de puntuación en la que los pesos de los términos de enlace de hidrógeno de la cadena principal se multiplican por este factor.  Por defecto 10.
- **min_genkic_hbonds**:  Se rechazan las soluciones de GenKIC que tengan menos de este número de enlaces de hidrógeno de la cadena principal.  Por defecto 3.
- **min_final_hbonds**:  Se rechazan las soluciones finales que tengan menos de este número de enlaces de hidrógeno de la cadena principal.  Por defecto 0 (no se rechaza ninguna solución).
- **count_sc_hbonds**:  Si es false, al filtrar las soluciones de GenKIC y las finales solo se cuentan los enlaces de hidrógeno de la cadena principal.  Si es true, se cuentan todos los enlaces de hidrógeno.  Por defecto false.

## Funcionalidades futuras previstas
- Compatibilidad con el muestreo de torsiones de la cadena principal de beta- y gamma-aminoácidos.
- Muestreo basado en transiciones de bins.

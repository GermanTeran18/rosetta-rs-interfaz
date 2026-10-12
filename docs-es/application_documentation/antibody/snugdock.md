# SnugDock

## Autores
Aroop Sircar y Jeffery J. Gray

## Publicación
[[SnugDock: la optimización estructural del paratopo durante el docking anticuerpo-antígeno compensa los errores de los modelos de anticuerpos por homología|http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000644]]

## Visión general

El artículo anterior describe el método SnugDock, pero las opciones han evolucionado con el tiempo. Para ejecutar SnugDock hay que proporcionar como entrada un archivo en formato PDB con un anticuerpo (cadena ligera con la etiqueta L y cadena pesada con la etiqueta H) y un antígeno (con la etiqueta que prefieras; yo uso A). La entrada debe estar preempaquetada con el docking_prepack_protocol.

La forma actual y recomendada de ejecutar SnugDock es:

```bash
/path/to/Rosetta/bin/snugdock.linuxgccrelease @flags
```

con las siguientes opciones mínimas:
```
### JOB IO
-s input.pdb
-native native_input.pdb # if available
-out:file:scorefile score_out_snugdock.sc
-out:path:pdb models_path_out/
-out:pdb_gz # gzip models for space
-nstruct 1000 # adequate sampling

# low-res constraints (constrain alpha/tau if available)
-constraints:cst_file kink.cst
-constraints:cst_weight 1.0

# high-res constraints (constrain alpha/tau if available)
-constraints:cst_fa_file kink.cst
-constraints:cst_fa_weight 1.0

### Docking
-partners LH_G
-spin
-dock_pert 3 8

### do not filter for h3, constraint takes care of this geom
-h3_filter false

### loop modeling settings
#
# KIC

-kic_rama2b
-loops:ramp_fa_rep
-loops:ramp_rama

-kic_omega_sampling
-allow_omega_move true

-loops:refine_outer_cycles 3
-loops:max_inner_cycles 80

# CCD (exit with ptr error)
#-antibody:centroid_refine refine_ccd
#-antibody:refine refine_ccd
#-loops:outer_cycles 5

#more standard settings, for packages used by antibody_H3
-ex1
-ex2aro
-talaris2014 true
```

Una opción clave que **todo el mundo debería incluir** es `-h3_filter false`. Cuando se establece en true, esta opción repite el modelado del CDR H3 hasta 20 veces si el loop no está en una conformación con kink (véase [[Weitzner et al. para más información|http://www.ncbi.nlm.nih.gov/pmc/articles/PMC4318709/]]). No la actives, porque desperdicia demasiados ciclos intentando formar el kink del loop CDR H3. En su lugar, aplica dos restricciones armónicas planas, escaladas para valer 1 REU a 3 desviaciones estándar de la media de los ángulos alfa y tau, tal como se definen en el artículo anterior.

Las dos opciones de loops son muy importantes, ya que SnugDock se escribió inicialmente con CCD como enfoque predeterminado de modelado de loops. Ahora usamos el cierre cinemático de loops de nueva generación (KIC), que es mucho, mucho más lento, pero también mucho, mucho mejor para explorar el espacio conformacional. Los tiempos de ejecución con las opciones predeterminadas de KIC de nueva generación (NGK) son de aproximadamente 10 horas por modelo: 60 veces más lento que el protocolo estándar de docking de cuerpo rígido y 17 veces más lento que SnugDock basado en CCD. **Usa (`-loops:refine_outer_cycles 3` y `-loops:max_inner_cycles 80`) o (`-loops:refine_outer_cycles 2` y `-loops:max_inner_cycles 20`) a menos que dispongas de muchísimo tiempo y recursos**. _Estas opciones se han evaluado con benchmarks y rinden algo mejor que SnugDock basado en CCD_.

Los compañeros (partners) deben estar ordenados en el PDB y en la opción partners como cadena ligera, cadena pesada y, por último, antígeno. Esto se debe a la forma en que se inicializa el FoldTree. Esperamos eliminar pronto este requisito tan rígido.

### Otras opciones útiles

No todas estas opciones se han probado con SnugDock (ni son exhaustivas), así que úsalas bajo tu propia responsabilidad. En general, conviene saber que SnugDock amplía la maquinaria de DockingProtocol, lo que significa que la mayoría de las opciones de docking siguen aplicándose (la mayor excepción identificada hasta ahora es `-no_filters`, que no se transmite a SnugDock a través de DockingHighRes).

**Opciones de docking**

                        Opción |                   Valor  |Tipo|  Descripción
-------------------------------|---------------------------|----|---------------------
                     multibody |                           | (I)| Lista de saltos que pueden moverse durante el docking.
         low_res_protocol_only |                     false |   B| Ejecuta solo el docking de baja resolución y omite el de alta resolución.
          docking_local_refine |                     false |   B| Realiza un refinamiento local de la posición de docking (alta resolución).
                      dock_min |                     false |   B| Minimiza la estructura final con todos los átomos.
                    dock_rtmin |                     false |   B| Realiza pruebas de rotámeros con minimización, RTMIN
                        sc_min |                     false |   B| Realiza la minimización de las cadenas laterales de los residuos de la interfaz
                      partners |                         _ |   S| Define los compañeros de docking por ChainID. Ejemplo: para hacer docking de las cadenas L+H con A, usa -partners LH_A
                    no_filters |                     false |   B| Activa o desactiva el uso de los filtros de docking únicamente.
           use_legacy_protocol |                     false |   B| Usa el algoritmo heredado de docking de alta resolución para mantener la compatibilidad de la salida.
   ignore_default_docking_task |                     false |   B| Permite al usuario definir otra tarea para Docking e ignora el DockingTask predeterminado. Si no se proporciona otro TaskFactory a Docking, la tarea diseñará todo por defecto.
            recover_sidechains |                           |   F| Normalmente las cadenas laterales se toman de la estructura de entrada si tiene todos los átomos; esto anula ese comportamiento y toma las cadenas laterales del archivo pdb
 docking_centroid_inner_cycles |                        50 |   I| Ciclos internos durante los movimientos adaptativos de cuerpo rígido del docking.
 docking_centroid_outer_cycles |                        10 |   I| Ciclos externos durante los movimientos adaptativos de cuerpo rígido del docking.
                     ensemble1 |                           |   S| Activa el modo de conjunto para el compañero 1.  La cadena es un archivo pdb multimodelo (debe estar preempaquetado)
                     ensemble2 |                           |   S| Activa el modo de conjunto para el compañero 2.  La cadena es un archivo pdb multimodelo (debe estar preempaquetado)

**Opciones de restricciones**

                        Opción |                   Valor  |Tipo|  Descripción
-------------------------------|---------------------------|----|---------------------
                      cst_file |                           | (S)| Nombre(s) de archivo de restricciones para centroid. Si se dan varios archivos, se elegirá uno *al azar*.
                   cst_fa_file |                           | (S)| Nombre(s) de archivo de restricciones para todos los átomos. Si se dan varios archivos, se elegirá uno *al azar*.

**Opciones de entrada y salida**

                        Opción |                   Valor  |Tipo|  Descripción
-------------------------------|---------------------------|----|---------------------
                out:score_only |                     false |   B| Calcula solo la puntuación y termina
                in:file:native |                           |   F| Nombre del archivo PDB nativo
                in:file:silent |                           |   F| Nombre(s) del archivo silent de entrada
                     in:file:s |                           |   F| Nombre(s) de los archivos PDB individuales que se van a procesar
                     in:file:l |                           |   F| Archivo(s) con listas de archivos PDB que se van a procesar
               out:file:silent |               default.out |   S| Usa salida en silent file; indica el nombre de archivo tras esta opción     
            out:file:scorefile |                default.sc |   S| Escribe un scorefile con el nombre de archivo indicado

**Opciones de evaluación**

                        Opción |                   Valor  |Tipo|  Descripción
-------------------------------|---------------------------|----|---------------------
                          rmsd |                           | (F)| [vector/pares] tripletas: rmsd_target (o NATIVE/IRMS) col_name selection_file (o FULL)
                         gdtmm |                     false |   B| Para cada evaluador de rmsd se crea también un evaluador de gdtmm
                           rdc |                           | (S)| [vector] archivos rdc y nombres de columna para el cálculo de RDC
                          pool |                           |   F| Busca la estructura más parecida en este conjunto e informa de la etiqueta y el rmsd
               chemical_shifts |                           | (S)| Calcula la puntuación de desplazamiento químico con SPARTA+; usa tuplas: talos_file [cs]_column_name (ATENCIÓN: usa el sistema de archivos)

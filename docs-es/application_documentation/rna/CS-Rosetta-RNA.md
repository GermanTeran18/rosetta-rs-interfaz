#CS-Rosetta RNA

Propósito de la aplicación
==========================
La aplicación cs_rosetta_rna refina (minimiza) y puntúa una estructura de ARN con la función de energía de todos los átomos híbrida CS-ROSETTA-RNA:
    ```
    E(hybrid) = E(Rosetta) + E(shift)
    ```
, donde `E(Rosetta)` es la función de energía estándar de todos los átomos de Rosetta para ARN [1] y `E(shift)` es el término de pseudoenergía de desplazamiento químico [2].

Las estructuras PDB de ARN de entrada pueden generarse con los métodos de modelado de estructuras FARFAR [1] y/o Stepwise Assembly [3], o pueden ser una estructura experimental de RMN o de cristalografía.

Ahora CS-ROSETTA-RNA también puede utilizar los desplazamientos químicos de carbono de la ribosa (C1', C2', C3', C4', C5') y de la base (C2, C5, C6, C5), así como los de iminas intercambiables (N1, N3, H1, H3). Cuando están presentes, las predicciones se realizan con LARMORD [4].

Código y demo
=============

El código de la aplicación *cs_rosetta_rna* está en ` src/apps/public/farna/cs_rosetta_rna.cc   `. 

Para ver ejemplos de demo «mínimos», con sus archivos de entrada, del protocolo cs_rosetta_rna, consulta: `rosetta/demos/public/cs_rosetta_rna`.


Archivos de entrada de ejemplo
------------------------------
1) `rosetta_inputs/GA-AG_mismatch/1MIS_NMR.pdb`

- Estructura PDB de RMN de un loop interno con apareamientos erróneos GA:AG en tándem.

2) `rosetta_inputs/GA-AG_mismatch/1MIS_exp_1H_chem_shifts.str`

- Datos experimentales de desplazamiento químico de 1H no intercambiables del loop interno con apareamientos erróneos GA:AG en tándem.

- Cada línea de este archivo representa un dato de desplazamiento químico y contiene las siguientes nueve columnas separadas por espacios (según el formato STARv2.1):
```
col 1: Atom_shift_assign_ID (INT)
col 2: Residue_author_seq_code (INT)
col 3: Residue_seq_code (INT)
col 4: Residue_label (STRING)
col 5: Atom_name (STRING)
col 6: Atom_type (STRING)
col 7: Chem_shift_value (FLOAT)
col 8: Chem_shift_value_error (STRING)
col 9: Chem_shift_ambiguity_code (STRING)
```

- NOTA: residue_seq_code (col 3), residue_label (col 4) y atom_name (col 5) deben ser coherentes con los datos del archivo PDB. Además, la aplicación cs_rosetta_rna no usa actualmente internamente las col 8 y col 9.

3) `rosetta_inputs/GA-AG_mismatch/1MIS_params`

- Archivo de parámetros (en formato FARNA) para el apareamiento erróneo GA:AG en tándem.

Además, los archivos de datos de entrada de los 23 motivos de ARN evaluados en la ref. [2] se proporcionan en el archivo Zip de datos suplementarios, disponible [aquí](http://dx.doi.org/10.1038/nmeth.2876).

   
Uso
---
1) Refinar (minimizar) y puntuar una estructura PDB con la función de energía de todos los átomos híbrida CS-ROSETTA-RNA:
    ```
    cs_rosetta_rna -mode minimize_pdb -pdb <input_pdb> -score:rna_chemical_shift_exp_data <exp_cs_data_file> -params_file <input_param_file> -analytic_etable_evaluation false
    ```

2) Puntuar (pero no refinar) una estructura PDB con la función de energía de todos los átomos híbrida CS-ROSETTA-RNA:
    ```
    cs_rosetta_rna -mode score_pdb -pdb <input_pdb> -score:rna_chemical_shift_exp_data <exp_cs_data_file> -params_file <input_param_file> -analytic_etable_evaluation false
    ```


Para ver ejemplos de líneas de comando de ejecución, consulta «run_cmds.txt».

Opciones
--------

```
-score::rna_chemical_shift_H5_prime_mode
```

- Especifica cómo se trata la asignación del par de protones diastereotópicos H5' y H5''.

- Modos válidos:

    `LEAST_SQUARE_IGNORE_DUPLICATES` (predeterminado)

    - En este modo, la asignación de los protones H5' y H5'' se basará en qué valores dan mejor concordancia entre los desplazamientos químicos experimentales y los calculados.

    - Usa este modo si los desplazamientos químicos de 1H no intercambiables experimentales no están asignados de forma inequívoca.


    
    `UNIQUE`

    - En este modo, las asignaciones de los protones H5' y H5'' se usarán «tal cual» y cs_rosetta_rna no intentará intercambiar las asignaciones de H5' y H5''.

    - Usa este modo solo si los datos experimentales de desplazamiento químico de 1H no intercambiables tienen asignaciones inequívocas de los protones diastereotópicos 1H5´ y 2H5´. Ten en cuenta que esto es poco común.


```
-score::rna_chemical_shift_verbose
```
    
- Imprime en la salida estándar la comparación entre los desplazamientos químicos predichos y los medidos.


```
-score:rna_chemical_shift_larmord
```

- Obliga a predecir todos los desplazamientos químicos con LARMORD, incluidos los de protones.

- NOTA: en este modo, el usuario también debe especificar: `-score:rna_chemical_shift_H5_prime_mode UNIQUE`


```
-score:rna_chemical_shift_larmord_wt
```

- Archivo con los pesos que determinan la contribución de cada tipo de núcleo al tipo de error. Normalmente, el peso de un núcleo dado = 1/error_esperado

- Formato del archivo de pesos:
    
    ```
    col 1: nucleus_type (e.g. C1') (STRING)
    col 2: weight (FLOAT)
    ```

    `larmord_noweight.dat`

    - predeterminado
    
    - todos los núcleos tienen el mismo peso

    `larmord_nuchemics_1.0_nocut_accuracy.dat`
  
    - cada núcleo tiene un peso diferenciado (1/error_esperado)
    
    - se usa al predecir los desplazamientos de protones no intercambiables con NUCHEMICS y los de otros núcleos con LARMORD

    `larmord_1.0_nocut_accuracy.dat`
  
    - cada núcleo tiene un peso diferenciado (1/error_esperado)
   
    - se usa al predecir todos los desplazamientos químicos con LARMORD

```
-score:rna_chemical_shift_larmord_par`
```

- Archivo con los parámetros de LARMORD

    `larmord_1.0_nocut_parameters.dat`
            
    - predeterminado
    
    - corresponde al publicado en [4]



Salidas
-------

La salida de `cs_rosetta_rna` incluye:

1) Un desglose de los términos de energía de todos los átomos híbridos de CS-ROSETTA-RNA, p. ej.:

```
------------------------------------------------------------
Scores                       Weight   Raw Score Wghtd.Score
------------------------------------------------------------
fa_atr                       0.230    -125.447     -28.853
fa_rep                       0.120       8.314       0.998
fa_intra_rep                 0.003      81.488       0.236
fa_intra_RNA_base_phos_atr   0.230       0.000       0.000
fa_intra_RNA_base_phos_rep   0.120       0.000       0.000
lk_nonpolar                  0.320       2.123       0.679
lk_nonpolar_intra_RNA        0.320       3.768       1.206
fa_elec_rna_phos_phos        1.050      -0.074      -0.078
ch_bond                      0.420     -30.523     -12.820
rna_torsion                  2.900       2.721       7.892
rna_sugar_close              0.700       3.171       2.220
fa_stack                     0.125    -199.844     -24.981
geom_sol_fast                0.620      56.483      35.020
geom_sol_fast_intra_RNA      0.620       1.978       1.226
hbond_sr_bb_sc               0.620       0.000       0.000
hbond_lr_bb_sc               2.400       0.000       0.000
hbond_sc                     2.400     -20.116     -48.279
hbond_intra                  2.400       0.000       0.000
atom_pair_constraint         1.000       0.000       0.000
angle_constraint             1.000       0.000       0.000
rna_bulge                    0.450       0.000       0.000
rna_chem_shift               4.000       1.232       4.928
linear_chainbreak            5.000       0.009       0.047
-----------------------------------------------------------
Total weighted score:                              -60.558
```

2) La energía total de todos los átomos híbrida de CS-ROSETTA-RNA, p. ej.:

```
hybrid_CS-ROSETTA-RNA_all-atom energy: -60.5579
```        

3) El RMSD de desplazamiento químico, p. ej.:

```
chem_shift_RMSD: 0.143299
```

- El chem_shift_RMSD (en unidades de ppm) es la desviación cuadrática media entre el desplazamiento químico de 1H «calculado» y el experimental. Un chem_shit_RMSD bajo indica que la estructura 3D del ARN concuerda bien con los datos experimentales de desplazamiento químico de 1H

4) La estructura PDB del ARN tras el refinamiento con la función de energía de todos los átomos híbrida CS-ROSETTA-RNA (si se usa `-mode minimize_pdb`).

- El PDB refinado se escribe en el directorio de ejecución con el nombre de archivo: `<in_pdb_basename>_out`.


Buenas prácticas
================

**Figura 1:** desglose de la estructura secundaria del loop interno con apareamientos erróneos GA:AG en tándem:
```
                           1    6                              1
                        5'-CGGACG-3'                        5'-CG
    Entire structure:      ||**||               H1 helix:      ||     
                        3'-GCAGGC-5'                        3'-GC 
                           12   7                              12
                         
                                                                    6
                             GA                                    CG-3'
    2x2 mismatch:            **                 H2 helix:          ||
                             AG                                    GC-5'
                                                                    7
```

Cómo activar CS-ROSETTA-RNA en ROSIE.
-------------------------------------
   
Cuántos pares de bases canónicos se deben incluir en cada límite de hélice.
---------------------------------------------------------------------------
Se deben incluir 2 pares de bases en cada límite de hélice (para la justificación, consulta la ref. [2]). Por ejemplo, en el caso del loop interno con apareamientos erróneos GA:AG en tándem, la estructura consta de una hélice H1 de 2 pares de bases, un apareamiento erróneo 2x2 y una hélice H2 de 2 pares de bases.

Los desplazamientos químicos de qué átomos se deben incluir.
------------------------------------------------------------
Los datos de desplazamiento químico de todos los protones no intercambiables deben incluirse en el archivo de datos de desplazamiento químico. Los protones no intercambiables son los protones de ribosa H1', H2', H3', H4', H5' y H5'', y los protones de base H2, H5, H6 y H8. Las líneas de datos que pertenezcan a otros tipos de átomo se ignorarán.

Los desplazamientos químicos de qué nucleótidos se deben incluir.
-----------------------------------------------------------------

Los datos de desplazamiento químico de todos los nucleótidos, EXCEPTO los que están justo en los extremos 5' y 3', deben incluirse en el archivo de datos de desplazamiento químico. Por ejemplo, en el caso del loop interno con apareamientos erróneos GA:AG en tándem, deben incluirse los datos de desplazamiento químico de todos los nucleótidos excepto C1, G6, C7 y G12.

Cómo preparar el archivo de parámetros.
---------------------------------------
1) Añade una línea `OBLIGATE  PAIR` por cada par de bases helicoidal situado justo en los extremos 5' y 3' de la estructura. 

- En el caso del loop interno con apareamientos erróneos GA:AG en tándem, los `OBLIGATE PAIRS` son `C1-G12` y `G6-C7`:

    ```
    OBLIGATE   PAIR 1 12 H H A
    OBLIGATE   PAIR 6 7 H H A
    ```

- Ten en cuenta que la aplicación cs_rosetta_rna refinará (minimizará) TODOS los nucleótidos EXCEPTO los especificados como `OBLIGATE  PAIR`, que se mantendrán estáticos.


2) Añade líneas `ALLOW_INSERT` para incluir las posiciones de todos los nucleótidos del loop no canónico:

- En el caso del loop interno con apareamientos erróneos GA:AG en tándem, las posiciones de nucleótido `ALLOW_INSERT` son `G3`, `A4`, `G9` y `A10`:

    ```
    ALLOW_INSERT 3 4
    ALLOW_INSERT 9 10
    ```

3) Añade una línea `CUTPOINT_CLOSED` para incluir la posición inmediatamente 5' de la primera posición de nucleótido del loop no canónico.

- En el caso del loop interno con apareamientos erróneos GA:AG en tándem, la primera posición de nucleótido del loop no canónico es `G3`. La posición `CUTPOINT_CLOSED` es la posición inmediatamente 5' de `G3`, que es `G2`:

    ```
    CUTPOINT_CLOSED 2
    ```

- Ten en cuenta que, si no se incluye la línea `CUTPOINT_CLOSED` en el archivo de parámetros, la aplicación cs_rosetta_rna aún podrá ejecutarse eligiendo una posición aleatoria del loop como posición cutpoint_closed. Sin embargo, se recomienda incluir explícitamente la línea `CUTPOINT_CLOSED` para evitar esta selección aleatoria.

4) Añade una línea `CUTPOINT_OPEN` por cada posición inmediatamente 5' de una ruptura de cadena.

- En el caso del loop interno con apareamientos erróneos GA:AG en tándem, hay una ruptura de cadena entre `G6` y `C7`. La posición `CUTPOINT_OPEN` es la posición inmediatamente 5' de la ruptura de cadena, que es `G6`:

    ```
    CUTPOINT_OPEN 6
    ```

Juntando todas las líneas de parámetros anteriores, obtenemos el archivo de parámetros del apareamiento erróneo GA:AG en tándem:

- Consulta `rosetta_inputs/GA-AG_mismatch/1MIS_params`:

    ```
    OBLIGATE   PAIR 1 12 H H A
    OBLIGATE   PAIR 6 7 H H A
    ALLOW_INSERT 3 4
    ALLOW_INSERT 9 10
    CUTPOINT_CLOSED 2
    CUTPOINT_OPEN 6
    ```

Por último, la aplicación cs_rosetta_rna también puede ejecutarse SIN un archivo de parámetros de entrada, aunque no se recomienda. En ese caso se usará un fold-tree simple sin rupturas de cadena ni cutpoints y se refinarán (minimizarán) todos los nucleótidos.


Cómo especificar los datos de desplazamiento químico de los pares de protones diastereotópicos H5'/H5''.
--------------------------------------------------------------------------------------------------------
**Caso 1:**
- Si se miden dos datos de desplazamiento químico para el par de protones diastereotópicos H5' y H5'' y es posible una asignación inequívoca, incluye la asignación inequívoca correcta en las líneas de datos, p. ej.:

    ```
    1  1  1 G H5'  H   4.180 . . 
    2  1  1 G H5'' H   4.540 . .  
    ```

- En este caso, incluye explícitamente la opción de línea de comando: `-score:rna_chemical_shift_H5_prime_mode UNIQUE`

**Caso 2:**
- Si se miden dos datos de desplazamiento químico para el par de protones diastereotópicos H5' y H5'' PERO no es posible una asignación inequívoca, incluye cualquiera de las dos asignaciones posibles en las líneas de datos, p. ej.:

    ```
    1  1  1 G H5'  H   4.180 . . 
    2  1  1 G H5'' H   4.540 . .  
    ```

    O

    ```
    1  1  1 G H5'  H   4.540 . . 
    2  1  1 G H5'' H   4.180 . .  
    ```

- La aplicación cs_rosetta_rna seleccionará automáticamente las asignaciones que den mejor concordancia entre el desplazamiento químico experimental y el calculado.

**Caso 3:**
- Si solo se mide un dato de desplazamiento químico para el par de protones diastereotópicos H5' y H5'' Y no es posible una asignación inequívoca, incluye de todos modos dos líneas de datos de desplazamiento químico (con el mismo valor de cs), una por cada protón, p. ej.:

    ```
    1  1  1 G H5'  H   4.180 . . 
    2  1  1 G H5'' H   4.180 . . 
    ```

Referencias
===========
[1] Das, R., Karanicolas, J. & Baker, D. Nat Methods 7, 291-294 (2010).

[2] Sripakdeeving, P. et al. Nature Methods 11, 413–416 (2014).

[3] Sripakdeevong, P., Kladwang, W. & Das, R. Proc Natl Acad Sci U S A 108, 20573-20578 (2011).

[4] Frank, AT., Law, SM & Brooks III, CL J. Phys. Chem B 118, 12168-12175 (2014).


##Véase también

* [[CS-Rosetta]]: página del wiki de CS Rosetta
* [[RNA applications]]: la página principal de las aplicaciones de ARN
* [[Structure Prediction Applications]]: lista de aplicaciones de predicción de estructuras
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[RNA]]: guía para trabajar con ARN en Rosetta
* [[Sitio web oficial de CS-Rosetta (enlace externo)|http://csrosetta.chemistry.ucsc.edu/]]
* [[Información adicional sobre CS-Rosetta (enlace externo)|http://spin.niddk.nih.gov/bax/software/CSROSETTA/]]
* [[Formato del archivo de desplazamientos químicos|chemical-shift-file]]
* [[RNA]]: guía para trabajar con ARN en Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta
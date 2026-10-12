#Calcular afinidades de unión relativas de complejos RNA-proteína 

##Metadatos

Autora: Kalli Kappel (kappel at stanford dot edu)  
Última actualización: abril de 2018

##Propósito de la aplicación
El método ΔΔG de Rosetta-Vienna se usa para calcular afinidades de unión relativas de complejos RNA-proteína.  

##Código y demo
Todo el código está en `src/apps/public/rnp_ddg/`. Hay una demo del método ΔΔG de Rosetta-Vienna en `demos/public/rnp_ddg/`. Rosetta-Vienna ΔΔG también está disponible como [servidor web ROSIE](http://rosie.graylab.jhu.edu/rnp_ddg).  

## El flujo de trabajo ΔΔG de Rosetta-Vienna
1. Relajar una estructura de partida
2. Calcular afinidades de unión relativas para una lista de mutantes

## Entradas requeridas
1. Una estructura de partida en formato PDB.
2. Una lista de secuencias para las que se calcularán afinidades de unión relativas a la secuencia de la estructura de partida. Es un archivo de texto que especifica las secuencias para las que queremos calcular afinidades de unión relativas. Se debe especificar una secuencia por línea. Pueden ser la secuencia completa del complejo (RNA y proteína) o solo la secuencia de RNA. Si no se especifica la secuencia de la proteína, no se harán mutaciones en la proteína. 

## Ejecución del código

#### Paso 1: Preparar el código de Rosetta y Vienna
&nbsp;&nbsp;&nbsp;&nbsp;**1.1**&nbsp;&nbsp;&nbsp;&nbsp;Asegúrate de tener instalado Python (v2.7).  
&nbsp;&nbsp;&nbsp;&nbsp;**1.2**&nbsp;&nbsp;&nbsp;&nbsp;Instala las herramientas de RNA de Rosetta. Consulta las instrucciones y la documentación [aquí](https://www.rosettacommons.org/docs/latest/application_documentation/rna/RNA-tools).  
&nbsp;&nbsp;&nbsp;&nbsp;**1.3**&nbsp;&nbsp;&nbsp;&nbsp;Instala el paquete ViennaRNA. Consulta las instrucciones [aquí](https://www.tbi.univie.ac.at/RNA/).  

#### Paso 2: Relajar la estructura de partida

&nbsp;&nbsp;&nbsp;&nbsp;**2.1**&nbsp;&nbsp;&nbsp;&nbsp;Prepara la ejecución de relax con relax_starting_structure.py. Por ejemplo, escribe: 

```
python PATH_TO_ROSETTA/main/source/src/apps/public/rnp_ddg/relax_starting_structure.py --start_struct start_structure.pdb --nstructs 100 --rosetta_prefix PATH_TO_ROSETTA/main/source/bin/
```
  
Las entradas y opciones de `relax_starting_structure.py` se enumeran a continuación:  <br><br>

**`--start_struct`**: La estructura PDB de partida de tu complejo RNA-proteína.  
**`--rosetta_prefix`**: La ruta completa a tus ejecutables de Rosetta (es opcional si los ejecutables están en tu PATH).  
**`--sfxn`**: La función de puntuación que se usará para relajar. **¡Debe ser la misma función de puntuación que se usará para calcular las afinidades de unión relativas en el Paso 3!** *Recomendado*: rnp_ddg.wts.  
**`--nstructs`**: Número de veces que se realiza la relajación. *Recomendado*: 100.  

&nbsp;&nbsp;&nbsp;&nbsp;**2.2**&nbsp;&nbsp;&nbsp;&nbsp;Ejecuta la relajación. Por ejemplo, escribe:

```
source ALL_RELAX_COMMANDS
```

Como alternativa, cada uno de los comandos de relajación que están en `RELAX_COMMAND_*` se puede ejecutar por separado. Esto es útil si trabajas en un clúster. 

&nbsp;&nbsp;&nbsp;&nbsp;**2.3**&nbsp;&nbsp;&nbsp;&nbsp;Obtén las estructuras relajadas de menor puntuación. Por ejemplo, escribe:  

```
python PATH_TO_ROSETTA/main/source/src/apps/public/rnp_ddg/get_lowest_scoring_relaxed_models.py --relax_dir relax_start_structure/
```

Esto imprimirá las 20 estructuras relajadas de menor puntuación. Para obtener los mejores resultados, los cálculos descritos en el *Paso 3* deben realizarse sobre cada una de estas estructuras, y los resultados finales de ΔΔG deben promediarse sobre las 20.

#### Paso 3: Calcular afinidades de unión relativas

&nbsp;&nbsp;&nbsp;&nbsp;**3.1**&nbsp;&nbsp;&nbsp;&nbsp;Prepara los cálculos de ΔΔG con general_RNP_setup_script.py. Este paso crea todos los directorios y archivos necesarios para las ejecuciones del cálculo de ΔΔG. Por ejemplo, escribe:

```
python PATH_TO_ROSETTA/main/source/src/apps/public/rnp_ddg/general_RNP_setup_script.py --low_res --tag demo_run --start_struct relax_start_structure//1/min_again_start_structure_wildtype_bound.pdb --seq_file mutant_list.txt --rosetta_prefix PATH_TO_ROSETTA/main/source/bin/
```

Las entradas y opciones de `general_RNP_setup_script.py` se enumeran a continuación:  
**`--low_res`**: *(por defecto)* Usa el método de baja resolución para calcular afinidades de unión relativas RNA-proteína. *Se recomienda.* *No debe especificarse junto con --med_res o --high_res.*   
**`--med_res`**: Usa `rna_denovo` para construir estructuras mutantes cuando introducen un par de bases de RNA no canónico (es decir, si la estructura de tipo silvestre contiene un par de bases G-C y especificas una mutación a G-G). Para todas las demás mutaciones se usará el protocolo low_res.   
**`--high_res`**: Usa `stepwise` para construir estructuras mutantes. Este protocolo es mucho más intensivo computacionalmente y todavía no ha dado mejores resultados. **Este protocolo NO se recomienda.**   
**`--skip_RNAfold`**: No realiza los cálculos de RNAfold de Vienna (es decir, supone que la energía libre de plegamiento de todas las secuencias de RNA es 0). *No se recomienda.*   
**`--tag`**: Aquí puedes especificar una cadena que se usará para crear el nombre del directorio de salida.   
**`--overwrite`**: Sobrescribe el directorio ddG si ya existe. Si no se especifica esta opción, el directorio no se sobrescribirá (en su lugar se creará un directorio que termina en, por ejemplo, _1).   
**`--start_struct`**: La estructura de partida. Debe ser una de las estructuras relajadas de menor puntuación del *Paso 2*.  
**`--wt_secstruct`**: La estructura secundaria del RNA en la estructura de partida. Solo se usa en el protocolo med_res (para determinar cuándo se muta de un par de bases de RNA canónico a uno no canónico). Si no se especifica, la estructura secundaria se predecirá con RNAfold.   
**`--seq_file`**: Es un archivo de texto que especifica las secuencias para las que queremos calcular afinidades de unión relativas. Se debe especificar una secuencia por línea. Pueden ser la secuencia completa del complejo (RNA y proteína) o solo la secuencia de RNA. Si no se especifica la secuencia de la proteína, no se harán mutaciones en la proteína.   
**`--sfxn`**: La función de puntuación de Rosetta que se usará. *Recomendado (por defecto): rnp_ddg.wts.* *¡Debe ser la misma función de puntuación que usaste durante la relajación en el Paso 2!*   
**`--rosetta_prefix`**: La ruta completa a tus ejecutables de Rosetta (es opcional si los ejecutables están en tu PATH).   
**`--relax_cutoff_dist`**: Distancia de corte de relax (desde una mutación) para el reempaquetado de cadenas laterales. *Recomendado (por defecto): 20.0*   
**`--protein_pack_reps`**: El número de veces que se debe reempaquetar la estructura de la proteína "no unida", para calcular la energía de la proteína no unida. *Recomendado (por defecto): 10*   
**`--Nreps`**: El número de veces que se realizan la mutación y la posterior relajación de los residuos circundantes. *Recomendado (por defecto): 10*   
**`--no_min_jumps`**: No minimiza las orientaciones de cuerpo rígido. *No se recomienda.*   
**`--move_backbone`**: Mueve la cadena principal durante la minimización. *No se recomienda.*   
**`--move_protein_backbone`**: Mueve la cadena principal de la proteína durante la minimización. *No se recomienda.*  

Este comando de preparación creará un directorio con un nombre como `ddG_demo_run_low-res`. En este directorio hay un subdirectorio numerado correspondiente a cada una de las secuencias mutantes especificadas en el archivo `mutant_list.txt`. `0/` corresponde al tipo silvestre, `1/` corresponde a la primera secuencia de `mutant_list.txt`, `2/` corresponde a la segunda secuencia de `mutant_list.txt`, etc. 

`ddG_demo_run_low/general_setup_settings.txt` enumera las opciones que se usarán en la ejecución.   `ddG_demo_run_low/ALL_COMMANDS` contiene las líneas de comando reales para ejecutar todos los cálculos de ΔΔG.  `ddG_demo_run_low/COMMAND_0`, `ddG_demo_run_low/COMMAND_1` y `ddG_demo_run_low/COMMAND_2` contienen los comandos para ejecutar los cálculos de ΔΔG del tipo silvestre, de la primera y de la segunda mutación, respectivamente. Todos estos comandos están incluidos en `ddG_demo_run_low/ALL_COMMANDS`; estos archivos individuales solo son útiles si ejecutas muchos mutantes en un clúster: cada comando se puede ejecutar a la vez en un núcleo distinto.   

&nbsp;&nbsp;&nbsp;&nbsp;**3.2**&nbsp;&nbsp;&nbsp;&nbsp; Ejecuta los cálculos de ΔΔG. Por ejemplo, escribe:

```
source ddG_demo_run_low-res/ALL_COMMANDS
```

Como alternativa, cada uno de los comandos que están en `ddG_demo_run_low-res/COMMAND_*` se puede ejecutar por separado. Esto es útil si trabajas en un clúster.  

&nbsp;&nbsp;&nbsp;&nbsp;**3.3**&nbsp;&nbsp;&nbsp;&nbsp; Obtén los resultados de ΔΔG con `get_final_ddG_scores.py`. Por ejemplo, escribe: 

```
python PATH_TO_ROSETTA/main/source/src/apps/public/rnp_ddg/get_final_ddG_scores.py --run_dir ddG_demo_run_low-res/ --seq_file mutant_list.txt
```

**`--run_dir`** debe indicar el directorio en el que se ejecutaron los cálculos de ΔΔG (el que creó `general_RNP_setup_script.py`). **`--seq_file`** debe indicar el mismo `seq_file` que se dio a `general_RNP_setup_script.py`.   

Esto imprimirá en pantalla un mensaje como el siguiente:  

```
####################################
RESULTS:

WT ddG: 0.00 kcal/mol
ugaggcucaccca ddG: 2.39 kcal/mol
ugaggagcaccca ddG: 0.62 kcal/mol

####################################
Results are also written to the ddG_score.txt files in
each mutant directory in ddG_demo_run_low-res/
The format is:
ddG dG complex_score protein_score rna_score
####################################
```

Como indica este mensaje, los resultados de ΔΔG también aparecen en los archivos `ddG_score.txt` de cada uno de los directorios de ejecución. La primera columna de un `ddG_score.txt` indica el valor de ΔΔG calculado, en kcal/mol.

Normalmente, el *Paso 3* debe repetirse 20 veces para las 20 mejores estructuras del *Paso 2*, y luego se promedian los resultados finales.  

##Véase también

* [[Application Documentation]]: Página de inicio de la documentación de aplicaciones
* [[RNA applications]]: La página de inicio de las aplicaciones de RNA
* [[Tools]]: Herramientas basadas en Python para usar en Rosetta
* [RiboKit](http://ribokit.github.io/): Paquetes de modelado y análisis de RNA mantenidos por el laboratorio Das

#Manual de RosettaAntibodyDesign (RAbD)



Última actualización de la documentación: 25/6/2020



[[_TOC_]]

-------------------------
#MetaData

Autor: Jared Adolf-Bryfogle (jadolfbr@gmail.com); investigador principal: Roland Dunbrack


[Rosetta Antibody Design (RAbD): A General Framework for Computational Antibody Design, PLOS Computational Biology, 4/27/2018](http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1006112)

Jared Adolf-Bryfogle, Oleks Kalyuzhniy, Michael Kubitz, Brian D. Weitzner, Xiaozhen Hu, Yumiko Adachi, William R. Schief, Roland L. Dunbrack Jr.

--------------------------

# Descripción general
**RosettaAntibodyDesign (RAbD)** es un marco general para el diseño de anticuerpos, en el que el usuario puede adaptar fácilmente la ejecución a las necesidades de su proyecto.  **El algoritmo está pensado para muestrear el diverso espacio de secuencia, estructura y unión de un complejo anticuerpo-antígeno.** Se puede usar en una multitud de tipos de proyecto, desde el diseño de novo hasta rediseños que mejoran la afinidad de unión, optimizan la estabilidad o modifican la función.  

El marco se basa en un análisis bioinformático riguroso y se apoya en gran medida en nuestro [agrupamiento reciente](https://www.ncbi.nlm.nih.gov/pubmed/21035459) de las regiones CDR de los anticuerpos.  Usa la **definición de CDR de North/Dunbrack**, tal como se describe en el artículo del agrupamiento de North/Dunbrack. 

La sección de métodos suplementarios del artículo publicado contiene todos los detalles del método RosettaAntibodyDesign.  Este manual sirve para que empieces a ejecutar RAbD en los usos típicos. 

Puedes encontrar un Notebook de PyRosetta para RAbD y los componentes del marco [aquí](https://github.com/RosettaCommons/PyRosetta.notebooks#chapter-110-working-with-antibodies)

El preprint del taller de Notebooks de PyRosetta está disponible [aquí](https://www.preprints.org/manuscript/202002.0097/v1)

El comienzo de este manual se lee como un tutorial, y en cada ejemplo se introducen conceptos más avanzados de RAbD.  

# Algoritmo
  
En términos generales, el protocolo RAbD consiste en ciclos externos e internos de Monte Carlo que se alternan. Cada ciclo externo consiste en elegir al azar un CDR (L1, L2, etc…) de entre los CDR configurados para diseño, elegir al azar un clúster y luego una estructura de ese clúster en la base de datos según las instrucciones de entrada, e injertar la estructura de ese CDR en el marco del anticuerpo en lugar del CDR existente (**GraftDesign**). A continuación, el programa realiza N rondas del ciclo interno, que consiste en diseño de secuencia (**SeqDesign**), minimización de energía y docking opcional. Cada ciclo interno optimiza estructuralmente la cadena principal y reempaqueta las cadenas laterales del CDR elegido en el ciclo externo, así como de vecinos opcionales, con el fin de optimizar las interacciones del CDR con el antígeno y con otros CDR. 

Se aplican a cada CDR **restricciones de ángulos diedros de la cadena principal (CircularHarmonic)** derivadas de los datos de los clústeres, para limitar perturbaciones estructurales perjudiciales. Los cambios de aminoácidos se muestrean normalmente a partir de **perfiles derivados de cada clúster de CDR en PyIgClassify**. Cuando hay muy pocas secuencias disponibles para producir un perfil (por ejemplo, para H3), se pueden realizar sustituciones conservadoras de aminoácidos (según la matriz de sustitución BLOSUM62). Al terminar cada ciclo interno, la nueva secuencia y estructura se aceptan según el criterio de Metropolis Monte Carlo. Tras N rondas dentro del ciclo interno, el programa vuelve al ciclo externo, momento en el que se compara la energía del diseño resultante con la del diseño anterior del ciclo externo. El nuevo diseño se acepta o se rechaza según el criterio de Monte Carlo.

Si se optimiza la orientación anticuerpo-antígeno durante el diseño (docking), se usan automáticamente SiteConstraints para mantener los CDR (paratopo) orientados hacia la superficie del antígeno.  Se denominan **ParatopeSiteConstraints**.   Opcionalmente, se pueden activar restricciones que mantienen el paratopo del anticuerpo alrededor de un epítopo objetivo (sitio de unión al antígeno).  Se denominan **ParatopeEpitopeSiteConstraints**, ya que las restricciones son entre el paratopo y el epítopo. El epítopo se determina automáticamente como los residuos de la interfaz alrededor del paratopo al ingresar al programa; sin embargo, se puede fijar cualquier residuo como epítopo para limitar el movimiento y el muestreo no deseados del anticuerpo.  Consulta los ejemplos y las opciones más abajo. 

Puedes encontrar más detalles sobre el algoritmo en el artículo publicado. 

# Configuración y entradas

**Base de datos de diseño de anticuerpos**

Esta aplicación requiere la base de datos de diseño de anticuerpos de Rosetta.  Rosetta incluye una base de datos de anticuerpos del artículo original de agrupamiento de North, que se usa por defecto.  Se puede descargar una base de datos actualizada (que actualmente se actualiza cada mes) aquí: http://dunbrack2.fccc.edu/PyIgClassify/.  

Debe colocarse en <code> Rosetta/main/database/sampling/antibodies/ </code>  Se recomienda usar esta base de datos actualizada.

Consulta [[General-Antibody-Options-and-Tips]] para más información.  Actualmente, `-input_ab_scheme` no se admite para el diseño de anticuerpos y se debe usar un anticuerpo renumerado a AHo. 

------------------------------

**Estructura inicial**

El protocolo comienza con la estructura tridimensional de un complejo anticuerpo-antígeno. Los diseños deben partir de un anticuerpo unido a un antígeno objetivo (aunque también es posible optimizar solo el anticuerpo sin el complejo).  Los anticuerpos de camélidos son totalmente compatibles.  Esta estructura puede ser una estructura experimental de un anticuerpo existente en complejo con su antígeno, una estructura predicha de un anticuerpo existente con docking computacional a su antígeno, o incluso el resultado de mejor puntuación de un docking de baja resolución de un gran número de anticuerpos no relacionados hacia un epítopo deseado en la estructura de un antígeno objetivo, como preludio al diseño de novo.

El programa PUEDE diseñar computacionalmente un anticuerpo hacia cualquier lugar de la proteína objetivo, pero se recomienda colocar el anticuerpo en el epítopo objetivo.  Determinar posibles epítopos de unión queda fuera del alcance de este programa, aunque existen servidores y programas para predecirlos. Se pueden usar SiteConstraints automáticas para limitar aún más el diseño a regiones objetivo.

-------------------------

**Numeración del modelo**

Por último, el archivo PDB de entrada debe renumerarse al esquema AHo.  Esto se puede hacer en el [servidor PyIgClassify](http://dunbrack2.fccc.edu/pyigclassify/).  El código de PyIgClassify también se puede descargar y ejecutar por separado para renumerar o analizar localmente. 

Al ingresar al programa, Rosetta asigna nuestros clústeres de CDR con la misma metodología que PyIgClassify. El protocolo RosettaAntibodyDesign es guiado entonces por un conjunto de opciones de línea de comandos y por un conjunto de instrucciones de diseño dadas como archivo de entrada, que controla qué CDR se diseñan y cómo. Más abajo se dan los detalles, junto con líneas de comandos y archivos de instrucciones de ejemplo.

# Ejemplos de línea de comandos

## Configuración básica

### Diseño general

**Ejemplo 1 - GraftDesign y SeqDesign**

La línea de comandos puede ser tan simple como:

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda -nstruct 1
```

Esto convierte el loop H3 en el CDR primario elegido en el ciclo externo, ejecutando diseño basado en injerto sobre H3 y, al mismo tiempo, diseño de secuencia de H1 y H2. 

----------------

**Ejemplo 2 - Comenzar con CDR aleatorios**

Aquí queremos hacer una ejecución de novo, comenzando con CDR aleatorios injertados en lugar de lo que tengamos en el anticuerpo al principio (solo para los CDR que realmente se someten a diseño por injerto).  Esto es útil, ya que se comienza el diseño con una energía muy alta y se va bajando.

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda -random_start -nstruct 1
```

----------------

#### Optimización de la energía de interfaz (opt-dG)

**Ejemplo 1 - opt-dG**

Aquí queremos configurar el protocolo para optimizar la energía de interfaz durante el Monte Carlo en lugar de la energía total.  La energía de interfaz la calcula el [[InterfaceAnalyzerMover]] mediante un MonteCarlo especializado llamado **MonteCarloInterface**.   **Esto es útil para mejorar la energía de unión y dará mejores energías de interfaz**.  Aun así, los modelos resultantes deben depurarse por energía total alta.  Esto se sometió a benchmarking en el artículo y se ha usado después en diseños reales, así que consúltalo para más información.

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda -mc_optimize_dG -nstruct 1
```

----------------


**Ejemplo 2 - Optimización de la energía de interfaz y la puntuación total (opt-dG y opt-E)**

Aquí queremos configurar el protocolo para optimizar la energía de interfaz durante el Monte Carlo, pero queremos añadir algo de energía total al peso. Como los números de la energía total dominarán los números globales, solo añadimos un peso pequeño para la energía total.  Esto no se ha sometido por completo a benchmarking, pero si tus modelos tienen una energía total muy mala al usar opt-dG, considera usarlo.  

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda -mc_optimize_dG \
-mc_total_weight .001 -mc_interface_weight .999 -nstruct 1

```

----------------


### Diseño con docking

**Ejemplo 1 - Incorporación básica de DockDesign**

En este ejemplo usamos RosettaDock integrado (con diseño de secuencia durante el paso de alta resolución) para muestrear la orientación anticuerpo-antígeno, pero no nos importa dónde se une el anticuerpo al antígeno.  Solo que se una. Es decir, sin restricciones. El protocolo RAbD siempre tiene activadas al menos las SiteConstraints del paratopo, para asegurarse de que cualquier docking quede contenido en el paratopo (como en la mayoría de los buenos programas de docking).

Por defecto, ahora hemos reducido los ciclos de docking de alta resolución a 2/2.  Esto debería acelerar mucho el docking.
Puedes cambiarlo con las opciones `-dock_first_cycles` y `-dock_second_cycles`.  Ten en cuenta que, para un protocolo de docking COMPLETO en Rosetta, estos números son 4 y 45 respectivamente.

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda -do_dock -nstruct 1
```

------------------------

**Ejemplo 2 - SiteConstraints**

Permite Dock-Design, incorporando SiteConstraints autogeneradas para mantener el anticuerpo alrededor de los residuos de la interfaz inicial.  Estos residuos se determinan por estar a menos de 6 Å de los residuos del CDR.  

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda -do_dock -use_epitope_constraints -nstruct 1
```

----------------

**Ejemplo 3 - Optimización del diseño hacia residuos específicos del epítopo**

Permite Dock-Design, como arriba, pero especificando los residuos del epítopo y los CDR del paratopo para guiar el diseño de modo que interactúen.

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda -do_dock -use_epitope_constraints \
-paratope H3 -epitope 63A 63A:A 64 -nstruct 1
```

-----------------------

**Ejemplo 4 - Diseño de novo**

Aquí queremos hacer una ejecución de novo, creando una interfaz en la cadena ligera, comenzando con CDR aleatorios injertados en lugar de lo que tengamos en el anticuerpo al principio (para los CDR que se diseñan).  

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs L1 L2 L3 \
-graft_design_cdrs L1 L2 L3 -seq_design_cdrs L1 L2 L3 -light_chain lambda -do_dock \
-use_epitope_constraints -paratope L1 L2 L3 -epitope 63A 63A:A 64 -random_start -dock_first_cycles 1 -dock_second_cycles 2
```

### Personalización con el archivo de instrucciones
Se pueden crear ejecuciones de diseño más complejas con el archivo de instrucciones de diseño de anticuerpos.  Este archivo permite personalizar por completo la ejecución de diseño. Más abajo encontrarás una revisión de la sintaxis del archivo y de las posibles personalizaciones.

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda \
-cdr_instructions my_instruction_file.txt -nstruct 1
```

## Configuración avanzada

**Ejemplo 1 - Incorporar un resfile para limitar el diseño**

Aquí no permitiremos NINGÚN diseño de secuencia hacia residuos de prolina ni de cisteína, y daremos un resfile para LIMITAR aún más el diseño y el empaquetado en posiciones específicas. Se pueden dar con códigos de 3 o de 1 letra, y se aceptan códigos mixtos como PRO y C. Ten en cuenta que el resfile NO activa ningún residuo; simplemente se usa para LIMITAR opcionalmente los tipos de residuos de diseño y las posiciones de diseño y de empaquetado.

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda \
-resfile my_resfile.resfile -dissallow_aa PRO CYS -nstruct 1
```

------------------------

**Ejemplo 2 - Diseño con cadena principal flexible (generalmente recomendado)**

Aquí cambiaremos el mintype a relax.  Este mintype activa el diseño con cadena principal flexible.  Por defecto usamos ciclos de min/pack, pero relax suele funcionar mejor.  Eso sí, ¡también tarda bastante más!

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda \
-resfile my_resfile.resfile -dissallow_aa PRO CYS -mintype relax -nstruct 1
```

-------------------------

**Ejemplo 3 - Incorporar el diseño del marco**

Por último, queremos permitir que también se diseñen aquí los residuos del marco ALREDEDOR de los CDR que vamos a diseñar y cualquier residuo del antígeno que interactúe.  Desactivaremos el diseño conservador del marco porque queremos algo extravagante (esto normalmente no se recomienda y se usa aquí para indicar lo que PUEDES hacer.

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda \
-resfile my_resfile.resfile -dissallow_aa PRO CYS -mintype relax \
-design_antigen -design_framework -conservative_framework_design false -nstruct 1
```

## Configuración experta

**Ejemplo 1 - Diseño de H3**

Ahora vamos a darle más emoción.  Hoy nos sentimos atrevidos.  Acaba de publicarse una nueva función de energía de Rosetta con campos de fuerza totalmente polarizables, tenemos nuestro primer computador cuántico, Andrew acaba de terminar el JD cuántico hasta JD4 y tenemos MUCHO dinero para diseños (¡puedo soñar, ¿no?! ;).  Estamos listos para poner a prueba a Rosetta.

Aquí activaremos el diseño del tallo de H3, que puede provocar que el tipo de tallo de H3 pase de abultado a no abultado y viceversa.  Normalmente, si haces esto, conviene ejecutar modelado de loops sobre los mejores diseños para confirmar que la estructura de H3 se mantiene intacta.

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda -design_H3_stem -nstruct 1
```

Genial.  Eso debería producir algunos anticuerpos interesantes para nuestro experimento.  

------------------
**Ejemplo 3 - Aumentar la temperatura del MonteCarlo**

Ahora cambiaremos la KT para obtener muestreos más interesantes (respecto de nuestro valor por defecto de 1.0).

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda \
-design_H3_stem -inner_KT 2.0 -outer_KT 2.0 -nstruct 1
```

----------------

**Ejemplo 4 - Aumentar la variabilidad del diseño de secuencia**

Por último, queremos más variabilidad en nuestros diseños de secuencia.  Para ello aumentaremos el número de rondas de muestreo de nuestros queridos perfiles de clúster con la opción `-seq_design_profile_samples`.  

Descripción de la opción (por defecto 1): "If designing using profiles, this is the number of times the profile is sampled each time packing done.  Increase this number to increase variability of designs - especially if not using relax as the mintype."

```
antibody_designer.macosclangrelease -s my_ab.pdb -primary_cdrs H3 \
-graft_design_cdrs H3 -seq_design_cdrs H1 H2 -light_chain lambda \
-design_H3_stem -inner_KT 2.0 -outer_KT 2.0 -seq_design_profile_samples 5 -nstruct 1
```

# Archivo de instrucciones de CDR para el diseño de anticuerpos
El archivo de instrucciones de diseño de anticuerpos gestiona el control del algoritmo y del diseño a nivel de CDR.  Se usa para crear el CDRSet con el que se muestrean CDR completos del PDB, así como para afinar los pasos de minimización y las estrategias de diseño de secuencia.  

Por ejemplo, en un proyecto de rediseño, puede que solo queramos diseñar un CDR concreto y explorar las conformaciones locales dentro de su clúster de CDR inicial, o puede que simplemente queramos optimizar la secuencia de un CDR o de un conjunto de CDR usando nuestros perfiles de clúster. Estos ejemplos se pueden lograr con el archivo de instrucciones de CDR. Este archivo usa una sintaxis simple en la que cada CDR se controla individualmente en la primera columna, y luego un lenguaje rudimentario controla cada parte de la maquinaria de diseño de anticuerpos. El archivo controla qué CDR se muestrean, cuál será el CDRSet final, si se realiza diseño de secuencia y cómo, y qué tipo de minimización se usará para optimizar la estructura y la secuencia de cada CDR. Algunos de estos comandos también se pueden controlar con opciones de línea de comandos para ejecuciones fáciles de configurar.  Cualquier opción fijada por línea de comandos (como `-graft_design_cdrs` y `-seq_design_cdrs`) anulará lo fijado en el archivo de instrucciones

## Sintaxis

El archivo de instrucciones de CDR se compone de columnas delimitadas por tabuladores o espacios en blanco. La primera columna de cada línea especifica para qué CDR es la opción. Para cada opción se puede dar 'ALL' para controlar todos los CDR a la vez. ALL también se puede usar en sucesión para fijar primero todos los CDR en algo y luego fijar uno o más CDR en otra cosa en las líneas siguientes. Los comandos no distinguen mayúsculas de minúsculas. Un carácter ‘#’ al comienzo de una línea es un comentario del archivo y se omite.

**Primera columna** - _CDR_, 

**Segunda columna** -  _TYPE_

Las demás columnas se pueden usar para especificar listas, etc. 

**Tipos de instrucción**

Tipo | Descripción
------------ | -------------
GraftDesign | Instrucciones para la etapa de diseño por injerto
SeqDesign | Instrucciones para el diseño de secuencia
CDRSet | Instrucciones sobre qué estructuras terminan en el conjunto de estructuras del que se muestrea durante GraftDesign. La opción sigue la sintaxis: `CDR CDRSet option`
MinProtocol | Instrucciones para la minimización

**Ejemplo**
```
#H3 no design; just flexible motion of the loop

#SET All to design first
ALL GraftDesign ALLOW
ALL SeqDesign ALLOW

#Fix H3 and disallow GraftDesign for H1 and L2
L2 GraftDesign FIX
H1 GraftDesign FIX

#Disallow GraftDesign and SeqDesign for H3
H3 FIX

ALL MinProtocol MINTYPE relax

ALL CDRSet EXCLUDE PDBIDs 1N8Z 3BEI

#ALL CDRSet EXCLUDE Clusters L1-11-1 L3-9-cis7-1 H2-10-1
```

-------------------------

**Sintaxis general de diseño**

Instrucción  | Descripción
------------ | -------------
`L1 Allow` | Permite que L1 se diseñe en ambos modos
`L1 GraftDesign Allow` | Permite que L1 se diseñe por injerto
`L1 SeqDesign Allow` |Permite que L1 se diseñe por secuencia
`L1 Fix` | Desactiva el diseño de L1 en ambos modos
`L1 GraftDesign Fix` | Desactiva el diseño de L1 por injerto
`L1 SeqDesign Fix` | Desactiva el diseño de L1 por secuencia
`L1 Weights Z` |Pondera un CDR concreto al elegir qué CDR se diseña. Por defecto, todos los CDR tienen el mismo peso. 

--------------------------------

**Sintaxis de CDRSet (general)**

Instrucción  | Descripción
------------ | -------------
`L1 CDRSet Length Max X` | Longitud máxima del CDR
`L1 CDRSet Length Min Y` | Longitud mínima del CDR
`L1 CDRSet Cluster_Cutoffs Z` | Limita el CDRSet para incluir solo CDR de clústeres que tengan Z o más miembros. Se usa junto con los umbrales del diseño de secuencia para muestrear clústeres en los que los datos de perfil son suficientes o simplemente clústeres comunes de una especie en particular.
`L1 CDRSet ONLY_CURRENT_CLUSTER` | Limita el CDRSet para incluir solo CDR que pertenezcan al clúster identificado del CDR inicial. Anula otras opciones. Se usa para el muestreo de secuencia y de estructura dentro de los clústeres de CDR. Útil en aplicaciones de rediseño.
`L1 CDRSet Center_Clusters_Only` | Limita el CDRSet para incluir solo CDR que sean centros de clúster. Anula otras opciones. Se usa para muestrear ampliamente el espacio de estructuras de CDR. Útil para hacerse una idea de qué CDR pueden encajar bien o para una primera pasada en el diseño de novo.

**Sintaxis de CDRSet (inclusiones y exclusiones)**

Este conjunto de opciones incluye solo los elementos especificados o excluye elementos específicos. La sintaxis es la siguiente:

`L1 CDRSet INCLUDE_ONLY option list of items`

O

`L1 CDRSet EXCLUDE option list of items`

Las opciones de este tipo de sintaxis de CDRSet se enumeran a continuación

Opción  | Descripción
------------ | -------------
`PDBIDs` | Incluye solo, o deja fuera, un conjunto específico de PDBIds. Es muy útil para benchmarking.
`Clusters` | Incluye solo, o deja fuera, un conjunto específico de clústeres. Es útil si el usuario ya sabe qué clústeres pueden interactuar con el antígeno, ya sea por ejecuciones previas del programa o mediante homólogos. También es útil para benchmarking. 
`Germline` | Incluye solo, o deja fuera, germlines específicos de humano/ratón. 
`Species` | Incluye solo, o deja fuera, especies específicas. Muy útil para limitar posibles reacciones inmunes en los diseños finales. Designación de 2 letras como la usa IMGT.  Hu y Mo para humano y ratón.

------------------------

**Instrucciones de diseño de secuencia**

Las instrucciones de diseño de secuencia, que se usan con la palabra clave SeqDesign después del especificador de CDR, sirven para controlar el aspecto de diseño de secuencia del algoritmo. Además de controlar qué CDR se someten a diseño de secuencia, las opciones de diseño de secuencia controlan qué estrategia se usa al diseñar secuencias (estrategia primaria) y qué estrategia se usa si la estrategia primaria no se puede usar para ese CDR (estrategia de respaldo).
Actualmente, la estrategia de respaldo se usa si la estrategia primaria no cumple los requisitos estadísticos. Por ejemplo, al usar perfiles basados en clústeres para el diseño de secuencia (lo cual es el valor por defecto), es imprescindible que el clúster en cuestión tenga al menos cierto número de secuencias en la base de datos para que la estrategia tenga éxito. Por defecto, este umbral se fija en 10 y usa la opción de línea de comandos `‑seq_design_stats_cutoff Z`. Esto significa que, si un clúster tiene menos de 10 miembros y la estrategia primaria es usar perfiles basados en clústeres, se usará la estrategia de respaldo. La estrategia de respaldo por defecto para todos los CDR es el uso de un conjunto de mutaciones conservadoras con datos provenientes por defecto de la matriz BLOSUM62, donde el conjunto de mutaciones permitidas consiste en las sustituciones con puntuaciones positivas o cero en la matriz. Por ejemplo, si tenemos una D en alguna posición para la que usamos esta estrategia de respaldo, el conjunto de mutantes permitidos sería N, Q, E y S. Además, el conjunto de mutaciones conservadoras se puede controlar con la opción de línea de comandos `‑cons_design_data_source` source, donde se pueden especificar otras matrices BLOSUM. Se puede usar cualquier matriz BLOSUM para el diseño conservador; los números (40, 62, 80, etc.) indican los umbrales de similitud de secuencia usados para derivar las matrices BLOSUM, y los números más altos corresponden a un conjunto de mutaciones más conservador. 

**Sintaxis general**

Opción  | Descripción
------------ |  -------------
`L1 SeqDesign Strategy Z` | Fija la estrategia primaria de diseño de secuencia
`L1 SeqDesign Fallback_Strategy Z` | Fija la estrategia de respaldo de diseño de secuencia


**Tipos de estrategia**

Z  | Uso de la estrategia | Descripción
------------ | ------------- | -------------
`Profiles` | Primaria | Usa perfiles basados en clústeres con probabilidades de secuencia, como se describió arriba
`Profile_Sets` | Primaria | Muestrea al azar una secuencia completa de CDR del clúster de CDR cada vez que se hace el empaquetado
`Profiles_Combined` | Primaria | Muestrea al azar una secuencia completa de CDR del clúster de CDR y muestrea de los perfiles basados en clústeres cada vez que se hace el empaquetado. Se usa para aumentar la variabilidad. Útil junto con el muestreo del CDRSet de miembros centrales de los clústeres
`Conservative` | Ambas | Operación de diseño conservador, como se describió arriba
`Basic` | Ambas | Diseño básico: sin perfiles, simplemente permite todos los aminoácidos en esas posiciones
`Disable` | Respaldo | Desactiva el diseño de ese CDR si la estrategia primaria no cumple los umbrales. 

**Otros**

Opción  | Descripción
------------ |  -------------
`L1 SeqDesign DISALLOWED` | Desactiva el muestreo de aminoácidos específicos para este CDR (códigos de una o de tres letras. Se pueden mezclar) Ej. ARG C S ASN PRO

-----------------------

**Minimización**

Hay varios tipos de minimización implementados; sin embargo, cada uno requiere una cantidad de tiempo distinta. Consulta las descripciones de MinType más abajo para ver una lista de las opciones aceptables y su uso.

Opción  | Descripción
------------ |  -------------
`L1 MinProtocol MinType Z` |  Fija el tipo de minimización para este CDR
`L1 MinProtocol MinOther CDRX, CDRY, CDRZ` | Fija otros CDR que se minimizarán durante la optimización/diseño de este CDR en particular. Se crea una capa de empaquetado alrededor de los CDR que se van a minimizar, dentro de una distancia fijada (por defecto 6 Å). Cualquier CDR o región (marco/antígeno) fijado para diseño dentro de esta capa se diseñará. Estas regiones usarán todas las opciones de diseño de secuencia fijadas (perfiles, conservador, etc.). Esta opción es útil para crear interacciones CDR-CDR que den estabilidad estructural al loop y al anticuerpo.  Por defecto, se minimizan razonablemente otros CDR durante el paso de optimización.  (Más CDR = menor velocidad)

## Valores por defecto

Estos valores se anulan con tu archivo de instrucciones o con las opciones de línea de comandos

```

#General
ALL FIX
DE FIX

ALL WEIGHTS 1.0

#Minimization - Options: min, relax, ds_relax cartesian, backrub, repack, none
ALL MinProtocol MINTYPE min

#Neighbors.  These are conservative values used in benchmarking.  Limit these to speed up runs.
L1 MinProtocol Min_Neighbors L2 L3
L2 MinProtocol Min_Neighbors L1
L3 MinProtocol Min_Neighbors L1 H3
H1 MinProtocol Min_Neighbors H2 H3
H2 MinProtocol Min_Neighbors H1
H3 MinProtocol Min_Neighbors L1 L3

#Length
ALL CDRSet LENGTH MAX 25
ALL CDRSet LENGTH MIN 1


#Profile Design
ALL SeqDesign STRATEGY PROFILES
ALL SeqDesign FALLBACK_STRATEGY CONSERVATIVE

##DE Loops can be designed.  They use conservative design by default since we have no profile data!
DE SeqDesign STRATEGY CONSERVATIVE
```

# Algoritmos de muestreo de GraftDesign
Estos cambian la forma en que se muestrean los CDR de la base de datos de diseño de anticuerpos.   Se pueden especificar con la opción <code>-design_protocol</code>.

`-design_protocol` | Descripción
------------ | -------------
`even_cluster_mc` | Muestrea los clústeres de manera uniforme durante la etapa GraftDesign: primero elige un clúster entre todos los clústeres fijados para diseño del CDR primario elegido y luego elige una estructura dentro de ese clúster. (**POR DEFECTO**)
`even_length_cluster_mc` | Muestrea las longitudes y los clústeres de manera uniforme durante la etapa GraftDesign: primero elige una longitud del conjunto de longitudes del CDR primario elegido y un clúster del conjunto de clústeres, y por último una estructura dentro de ese clúster.  Útil para ampliar el conjunto de longitudes muestreadas durante el protocolo.
`gen_mc`| Muestrea los CDR para GraftDesign según su distribución en la base de datos.  Como resultado, las longitudes y los clústeres comunes se muestrean con más frecuencia.  Sin embargo, estas longitudes/clústeres pueden no ser las que se ven regularmente en la naturaleza frente a las que se cristalizan regularmente.  Es decir, están sesgados hacia los cristales, aunque tienen más datos de perfil asociados.
`deterministic_graft`| Deterministic Graft está pensado para probar todas las combinaciones de CDR del CDRSet (el conjunto de clústeres y estructuras).  El ciclo externo se hace de forma determinista para cada CDR de un conjunto.  Es muy útil para probar un número pequeño de combinaciones, como todas las longitudes de loop >=12 para H2 o todos los CDR de un clúster en particular.  Ten en cuenta que no hay un Monte Carlo externo, así que los diseños finales son los mejores encontrados por el protocolo, y cada muestreo es independiente de los demás. Si tienes demasiadas estructuras en tu CDRSet (como todo L1) y pruebas combinaciones que superan cierto límite (es decir, que nunca terminarán), se producirá un error.  Cuando funcione un Rosetta multihilo (debería ser a principios de 2018), probar todas las posibilidades será sin duda algo más factible.  Si te interesa usar algo así, escribe por correo al autor.

# Tipos de optimización de la estructura 
Estos 'Mintypes' se pueden fijar de forma independiente para cada CDR mediante el archivo de instrucciones o fijarse de forma general con la opción de línea de comandos `-mintype`.  El valor por defecto es `min`, ya que tiene algo de optimización y no tarda mucho (y se ha demostrado que es comparable a relax).  Aunque hablamos de 'diseño', nos referimos al empaquetado de cadenas laterales, donde los residuos/CDR fijados para diseño se diseñan. Para más información sobre el algoritmo y las estrategias usadas para el diseño de secuencia, consulta la descripción general del archivo de instrucciones y la sección de métodos del artículo. 

Se añaden restricciones de diedros Circular Harmonic a cada CDR según el clúster del CDR, o según los diedros iniciales si es un clúster raro sin datos.  Estas garantizan que la minimización y el diseño no destruyan el loop.

`-mintype`| Descripción
------------ | -------------
`min`| **Ciclo de diseño->min->diseño->min**. Da buenas estructuras, aunque no tan buenas como relax para recuperar características físicas nativas.  Es significativamente más rápido. (**POR DEFECTO**)
`cartmin`| **Ciclo de diseño->min->diseño->min** Minimización en el espacio cartesiano. Añade automáticamente el término cart_bonded si no está presente y desactiva pro_close
`relax` | Diseño con cadena principal flexible mediante `RelaxedDesign`, que es un diseño consciente de los vecinos durante FastRelax, donde la capa de empaquetado de los CDR en diseño se actualiza en cada iteración de empaquetado. Da energías más bajas y características físicas más cercanas a las nativas, pero tarda significativamente más.  Se recomienda ejecutar primero min y luego el mintype relax sobre los mejores modelos resultantes. [(Artículo del protocolo Relax)](https://www.ncbi.nlm.nih.gov/pubmed/21073878)
`dualspace_relax` | Diseño con cadena principal flexible mediante 'RelaxedDesign', optimizando tanto el espacio de diedros como el cartesiano [Artículo del protocolo Dualspace Relax](https://www.ncbi.nlm.nih.gov/pubmed/24265211)
`backrub` | **Ciclo de backrub->diseño**. Usa backrub para optimizar la cadena principal de los CDR fijados para minimización.   Usa la opción `-add_backrub_pivots 11A 12A 12A:B ` para añadir conjuntos adicionales de pivotes de backrub, por ejemplo para añadir flexibilidad a la interfaz del antígeno. La flexibilidad es mínima, pero en algunos casos puede ser útil. [(Artículo original del protocolo Backrub)](http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000393)


#RosettaScripts y PyRosetta

El protocolo completo que es la aplicación está disponible para RosettaScripts como el [[AntibodyDesignProtocol]].  Este solo tiene algunas opciones adicionales antes y después del diseño, como ejecutar fast relax o snug dock. 

El Mover principal configurable está disponible como el [[AntibodyDesignMover]].

Los [[componentes individuales | Movers-RosettaScripts#antibody-modeling-and-design-movers]] de RAbD se pueden usar para crear tus propios protocolos personalizados de modelado y diseño de anticuerpos en RosettaScripts (o PyRosetta). 

# Opciones de línea de comandos

**Opciones generales**

Opción | Descripción
------------ | -------------
`-view`| _Activa la visualización de la ejecución de diseño de anticuerpos. Debe haberse compilado con extras=graphics y ejecutarse con el ejecutable antibody_designer.graphics_ (**Por defecto=False**)	
`-cdr_instructions` | _Ruta al archivo de instrucciones de CDR_
`-antibody_database` | _Ruta a la base de datos de anticuerpos actual, actualizada semanalmente.  Descárgala de http://dunbrack2.fccc.edu/PyIgClassify/ _ (**Por defecto=/sampling/antibodies/antibody_database_rosetta_design.db**)			
`-paper_ab_db` | _Fuerza el uso de la base de datos de anticuerpos con datos del artículo del agrupamiento de North.  Está incluida en Rosetta. Si no se encuentra una base de datos de anticuerpos más reciente, se usará esta. La base de datos completa de anticuerpos está disponible en [Mediante PyIgClassify](http://dunbrack2.fccc.edu/PyIgClassify/)_ (**Por defecto = false**)

---------------------------------------------


**Configuración básica para una ejecución fácil de preparar**

Opción | Descripción
------------ | -------------
`-seq_design_cdrs`| _Activa estos CDR para diseño de secuencia.  (Se puede fijar aquí o en el archivo de instrucciones. Anula lo fijado en el archivo de instrucciones, si se da) Ej. -seq_design_cdrs L1 L2 L3 h1_
`-graft_design_cdrs` | _Activa estos CDR para diseño por injerto.  (Se puede fijar aquí o en el archivo de instrucciones. Anula lo fijado en el archivo de instrucciones, si se da) Ej. -graft_design_cdrs L1 L2 L3 h1_		
`-primary_cdrs` | _Fija manualmente los CDR que se pueden elegir en el ciclo externo. Normalmente se elige cualquiera de los que están en diseño de secuencia._		
`-mintype`| _El mintype por defecto para todos los CDR.  Los CDR individuales se pueden fijar mediante el archivo de instrucciones_ (_Opciones = min, cartmin, relax, backrub, pack, dualspace_relax, cen_relax, none_) (**Por defecto=min**)
`-disallow_aa` | _No permite ciertos aminoácidos durante el diseño de secuencia (aun así podrían estar en la secuencia diseñada por injerto).  Útil para optimizar sin, por ejemplo, cisteínas ni prolinas. Se aplica a todos los perfiles de diseño de secuencia y a los residuos de cualquier región (CDR, marco, antígeno).  Se puede controlar por CDR (o solo para los CDR) mediante el archivo de instrucciones de CDR. También se acepta un resfile si quieres limitar posiciones específicas directamente._ (Códigos de tres o de una letra)
`-top_designs`| _Número de mejores diseños que se conservan (conjunto).  Se escribirán en un PDB y cada uno pasa al siguiente paso del protocolo_. (**Por defecto=1**)
`-do_dock` | Ejecuta un breve paso de docking de baja y alta resolución en los ciclos internos.  (dock/min).  Se recomiendan 2 ciclos internos para una mejor cobertura. (dock/min/dock/min). Los ciclos interno/externo de alta resolución están fijados en el código, mientras que los de baja resolución se pueden cambiar con las opciones normales de low_res.  Si el diseño de secuencia está activado, se diseñarán las regiones/CDR fijados durante el docking de alta resolución (**Por defecto=false**)


-------------------------------------

**Configuración de optimización de energía (opt-dG)**

Opción | Descripción
------------ | -------------
`-mc_optimize_dG` | Optimiza el dG durante el MonteCarlo.  No es posible hacerlo dentro de la puntuación global, pero, cuando se puede, se hace durante las llamadas de MC.  Esta opción no usa el objeto MonteCarloInterface de forma global, sino específica del protocolo. Esto se debe a que hay que conocer la interfaz sobre la que se usará. El dG lo mide el InterfaceAnalyzerMover. (**Por defecto=false**)
`-mc_interface_weight` | Peso de la puntuación de interfaz si se usa MonteCarloInterface con un protocolo en particular. (**Por defecto=1.0**)
`-mc_total_weight` | Peso de la puntuación total si se usa MonteCarloInterface con un protocolo en particular. (**Por defecto=0.0**)


-------------------------------------
**Rondas del protocolo**

Opción | Descripción
------------ | -------------
`-outer_cycle_rounds` | Rondas del ciclo externo del protocolo (no para deterministic_graft ).  Cada ronda elige un CDR y lo diseña. Una ejecución de 100 ciclos con relax tarda unas 12 horas. Si reduces este número, reducirás significativamente el tiempo de ejecución, pero tus decoys finales tendrán una energía más alta.  Asegúrate de aumentar el número total de estructuras de salida (nstruct) si usas menos que este número.  Normalmente, unos 500 - 1000 nstruct son más que suficientes.  El diseño de novo completo requerirá significativamente más rondas y nstruct.  Si haces docking, las ejecuciones tardan un 30 por ciento más. (**Por defecto=25**)
`-inner_cycle_rounds` | Número de veces que se ejecuta el protocolo interno de minimización después de cada injerto.  Se recomiendan más rondas (2-3) para los mintypes pack/min/backrub o si se incluye docking en el protocolo. (**Por defecto = 1**)
`-dock_cycle_rounds` | Número de rondas para cualquier docking.  Si ves estructuras con mal docking, aumenta este valor. (**Por defecto=1**)
`-dock_first_cycles` | Número de primeros ciclos del paso de docking de alta resolución. (**Por defecto=2**)
`-dock_second_cycles` | Número de segundos ciclos del paso de docking de alta resolución. (**Por defecto=2**) 

----------------------------


**Detección de distancias**

Opción | Descripción
------------ | -------------
`-interface_dis` | Umbral de distancia de la interfaz.  Se usa para el reempaquetado de la interfaz, la detección del epítopo, etc. (**Por defecto=8.0**)
`-neighbor_dis` | Umbral de distancia de los vecinos.  Se usa para el reempaquetado después del injerto, la minimización, etc. (**Por defecto=6.0**)


---------------------------


**Paratopo + epítopo**


Opción | Descripción
------------ | -------------
`-paratope` | Usa estos CDR como paratopo. Por defecto son todos.  Actualmente solo se usa para SiteConstraints. Ten en cuenta que estas restricciones de sitio solo se puntúan en el docking, a menos que se fije _-enable_full_protocol_atom_pair_cst_ (Ej. -paratope L1 h1)
`-epitope` | Usa estos residuos como epítopo del antígeno.  Por defecto se identifican automáticamente dentro de la distancia de interfaz fijada al comienzo del protocolo, si las restricciones de epítopo están activadas. Actualmente solo se usa para restricciones.  Numeración del PDB. Código de inserción opcional. Ejemplo: 1A 1B 1B:A. Ten en cuenta que estas restricciones de sitio solo se usan durante el docking, a menos que se fije -enable_full_protocol_atom_pair_cst.
`-use_epitope_constraints` | Activa el uso de restricciones de epítopo para añadir SiteConstraints entre el epítopo y el paratopo.  Ten en cuenta que las restricciones del paratopo siempre se usan.  Ten en cuenta que estas restricciones de sitio solo se usan durante el docking, a menos que se fije -global_atom_pair_cst_scoring.(**Por defecto = false**)

------------------------------


**Diseño de secuencia por regiones**

Opción | Descripción
------------ | -------------
`-design_antigen` | Diseña los residuos del antígeno durante el diseño de secuencia.  De forma inteligente.  Normalmente, solo se codiseñan los residuos vecinos del antígeno de los CDR en diseño o de las interfaces.  Útil para aplicaciones específicas.(**Por defecto = false**)
`-design_framework` | Diseña los residuos del marco durante el diseño de secuencia.  Normalmente se hace solo con los residuos vecinos de los CDR en diseño o durante la minimización de la interfaz. (**Por defecto = false**)
`-conservative_framework_design` | 'Si se diseñan posiciones del marco, usa mutaciones conservadoras en lugar de todas.'(**Por defecto=true**)


---------------------------


**Control del diseño de secuencia**

Opción | Descripción
------------ | -------------
`-resfile` | Usa un resfile para limitar aún más qué residuos se empaquetan/diseñan, y para limitar aún más los tipos de residuos en el diseño.
`-design_H3_stem` | Activa el diseño de los primeros 2 y los últimos 3 residuos del loop H3 si se hace diseño de secuencia de H3.  Estos residuos influyen en la conformación extendida o con kink de H3.  Diseñar estos residuos puede afectar negativamente a la estructura global de H3, pues podría cambiar un loop con kink a uno extendido y viceversa.  Puede que Rosetta acierte.  Pero está desactivado por defecto para ser cautelosos en el diseño. El diseño de secuencia de H3 ya puede ser arriesgado. (**Por defecto=false**)
`-design_proline` | Activa el diseño de prolina.  Los perfiles de prolina son muy buenos, pero diseñarlos es algo arriesgado.  Actívalo si te sientes atrevido. (**Por defecto=false**)
`-sample_zero_probs_at` | Valor para el diseño probabilístico.  Probabilidad de que una probabilidad normalmente cero se elija como residuo potencial cada vez que se llama a la tarea del packer.  Auméntalo para aumentar la variabilidad de las posiciones. (**Por defecto=0**)

------------------------------

**Estadísticas de perfiles**

Opción | Descripción
------------ | -------------
`-seq_design_stats_cutoff` | Valor del umbral de cambio de diseño de secuencia probabilístico -> conservador.  Si el número total de secuencias usadas para el diseño probabilístico de un clúster de CDR en diseño es menor que este valor, se hará diseño conservador. Más datos = mejor predictibilidad. (**Por defecto=10**)
`-seq_design_profile_samples` | Si se diseña con perfiles, este es el número de veces que se muestrea el perfil cada vez que se hace el empaquetado.  Auméntalo para aumentar la variabilidad de los diseños, sobre todo si no se usa relax como mintype. (**Por defecto=1**)


---------------------------


**Control de restricciones**

Opción | Descripción
------------ | -------------
`-dihedral_cst_weight` | Peso que se usa para las restricciones CircularHarmonic de los CDR, basadas en clústeres o generales, que se añaden automáticamente a cada estructura y se actualizan después de cada injerto. Fíjalo en cero si no quieres usar estas restricciones. Ten en cuenta que no se usan para el mintype backrub. Anula los ajustes de pesos/parches.(**Por defecto = .3**)
`-atom_pair_cst_weight` | Peso que se usa para las SiteConstraints de epítopo/paratopo.  Las restricciones del lado del paratopo siempre se usan.  Fíjalo en cero para anular por completo estas restricciones. Anula los ajustes de pesos/parches.'Real' (**Por defecto = 0.01**)
`-global_dihedral_cst_scoring` | Usa la puntuación de restricciones de diedros en todo el protocolo, incluida la puntuación final de los Pose, en lugar de solo durante el paso de minimización (**Por defecto = false**)
`-global_atom_pair_cst_scoring` | Usa la puntuación de restricciones de pares de átomos en todo el protocolo, incluida la puntuación final de los Pose, en lugar de solo durante el docking. Normalmente, el término de puntuación se fija en cero para funciones de puntuación distintas de la de docking, para reducir el sesgo por longitudes de loop, relax, etc.  Puede ayudar a apuntar más rápido a un epítopo concreto durante el diseño Monte Carlo si se usan restricciones de epítopo, y también a filtrar los modelos finales por puntuación hacia un epítopo concreto si hay docking. (**Por defecto = true**)

------------------------------------


**Control fino**

Opción | Descripción
------------ | -------------  			
`-idealize_graft_cdrs` | Idealiza el CDR antes de injertarlo.  Puede ayudar o perjudicar. (**Por defecto = false**)
`-add_backrub_pivots` | 'Residuos pivote adicionales de backrub si se ejecuta backrub como MinType. Numeración del PDB. Código de inserción opcional. Ejemplo: 1A 1B 1B:A.  También se pueden especificar rangos: 1A-10:A.  Ten en cuenta que no hay espacios en el rango.
`-inner_kt` | KT usada en el Monte Carlo de minimización interno después de cada injerto. (**por defecto = 1.0)**,
`-outer_kt` | KT usada en el Monte Carlo externo de injerto.  Cada paso de injerto usará este valor (**Por defecto = 1.0**),

------------------------------


**Control de valores atípicos**

Opción | Descripción
------------ | -------------
`-use_outliers` | Incluye datos atípicos para GraftDesign, para las estadísticas de diseño de secuencia basado en perfiles y para las restricciones de diedros basadas en clústeres.  Los valores atípicos se definen como aquellos con una distancia de diedros > 40 grados y un RMSD > 1.5 Å respecto del centro del clúster.  Úsalo para aumentar el muestreo de clústeres pequeños o raros. (**Por defecto=false**)
`-use_H3_graft_outliers` | Incluye valores atípicos al injertar H3.  H3 no se agrupa bien, por lo que la mayoría de las estructuras tienen una distancia de diedros y un RMSD altos respecto del centro del clúster.  Por esto, no se usan restricciones de diedros basadas en clústeres para H3.  Se pueden usar perfiles de secuencia para clústeres, pero normalmente no. (**Por defecto = true**)
`-use_only_H3_kinked` | Elimina del CDRSet cualquier CDR sin kink si se injerta H3.  Por ahora, la coincidencia se basa en el área de Ramachandran de los dos últimos residuos de H3. En este caso, se define como con kink tener regiones AB o DB al final.  Se mejorará la detección (**Por defecto = false**)

-----------------------------------

**Pasos del protocolo**

Opción | Descripción
------------ | -------------
`-design_protocol` | Fija el protocolo principal que se usará.  Ten en cuenta que deterministic solo está disponible actualmente para el injerto de un CDR. (_Opciones = gen_mc, even_cluster_mc, even_length_cluster_mc, deterministic_graft_)(**Por defecto=even_cluster_mc**)
`-run_interface_analyzer`| Ejecuta el Interface Analyzer y añade la información a la función de puntuación resultante de cada salida de los mejores diseños. (**Por defecto = true**)

--------------------------------------

**Gestión de memoria / caché del CDRSet**

Opción | Descripción
------------ | -------------
`-high_mem_mode` | Si es false, el CDRSet (CDR cargados desde la base de datos que se podrían injertar) se carga sobre la marcha para un CDR si tiene más de 50 miembros de diseño por injerto.  Si es true, se guarda el CDRSet en caché antes de que comience el protocolo.  Normalmente, esto solo entrará en juego al diseñar todos los CDR.  Para el diseño de novo de 5/6 CDR, sin limitar el CDRSet en el archivo de instrucciones, necesitarás 3-4 GB por proceso con esta opción. (**por defecto = false**)
`-cdr_set_cache_limit` | Si high_mem_mode es false, este es el límite de caché del CDRSet que aplicamos antes de empezar a cargarlos sobre la marcha.  Si high_mem_mode es true, se ignora este ajuste.  Si tienes muy poca memoria por proceso, reduce este número (**por defecto = 300**)


---------------------------------


**Benchmarking**

Opción | Descripción
------------ | -------------
`-random_start` | Comienza el diseño por injerto (actualmente) con un nuevo conjunto de CDR de los CDRSets, para no sesgar la ejecución con los CDR nativos. (**Por defecto=false**)
`-remove_antigen` | Elimina el antígeno del Pose antes de hacer cualquier diseño sobre él (**Por defecto = false**)
`add_graft_log_to_pdb` | Añade el registro completo del injerto al Pose de salida.  También se debe pasar la opción -pdb_comments. (**Por defecto = 'true'**)




#Véase también

* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]
* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[AntibodyDesignProtocol]]
* [[AntibodyDesignMover]]
* [[Movers para anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[TaskOperations para anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[I want to do x]]: guía para elegir un mover

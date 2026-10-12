# energy_based_clustering

Esta página fue creada el 23 de octubre de 2017 por Vikram K. Mulligan (vmullig@uw.edu/vmulligan@flatironinstitute.org).  Su última modificación fue el 26 de mayo de 2022, por Paul Eisenhuth (eisenhuth@informatik.uni-leipzig.de).

Volver a [[Application Documentation]].

**Si usas esta aplicación, cita por favor:  Hosseinzadeh P, Bhardwaj G, Mulligan VK, Shortridge MD, Craven TW, Pardo-Avila F, Rettie S, Kim DE, Silva D-A, Ibrahim YM, Webb IK, Cort JR, Adkins JN, Varani G, and Baker D.  2017.  Comprehensive computational design of ordered peptide macrocycles.  Manuscript in revision.**

[[_TOC_]]

# Introducción

El agrupamiento (clustering) es el proceso de tomar un gran grupo de estructuras y ordenarlas en grupos más pequeños según alguna propiedad compartida; en la mayoría de los casos, la similitud estructural.  Esta aplicación se escribió como alternativa a la aplicación heredada `cluster` de Rosetta, y resuelve varias de sus limitaciones.  Las ventajas de la aplicación `energy_based_clustering` incluyen:

* Fiabilidad sin importar el número de estructuras.
* Capacidad para manejar hasta decenas de millones de estructuras sin fallar.
* Velocidad razonable, incluso con decenas de millones de estructuras.
* Varias funciones para casos de uso especializados, entre ellas:
  * Péptidos y otros heteropolímeros sintéticos:
     * Compatibilidad con alfa-aminoácidos (con y sin N-metilación), beta-aminoácidos, gamma-aminoácidos, oligoureas y peptoides.
     * Compatibilidad con geometría cíclica.
     * Compatibilidad con disulfuros.
     * Compatibilidad con entrecruzadores exóticos como el 1,3,5-tris(bromometil)benceno.
     * Compatibilidad con permutaciones cíclicas durante el agrupamiento.
     * Filtrado por simetría antes del agrupamiento.
     * Análisis opcional de bins de Ramachandran, realizado al mismo tiempo que el agrupamiento (solo para alfa-aminoácidos y peptoides).
  * Homo-oligómeros:
     * Compatibilidad para considerar todas las permutaciones de los oligómeros durante el agrupamiento.
  * Uso de puntuaciones alternativas

# El algoritmo

La aplicación `energy_based_clustering` implementa un enfoque de agrupamiento incremental (a veces llamado «agrupamiento líder-seguidor»), en el que las entradas se ordenan por energía.

En concreto, primero importa una lista de estructuras de cualquier formato de archivo compatible con Rosetta (actualmente mmCIF, PDB o formato silent de Rosetta), puntúa cada una o carga una lista de puntuaciones alternativas, y guarda solo la información relevante para el agrupamiento (con lo que se ahorra memoria) en una lista de estructuras sin agrupar.  Luego usa un algoritmo muy simple de «cortador de galletas» para agrupar las estructuras.  Los pasos son:

1.  Selecciona la estructura de menor energía que quede en la lista sin agrupar como centro del clúster actual.  Esta estructura se elimina de la lista sin agrupar.
2.  Construye un vector de RMSD entre el centro del clúster actual y todas las estructuras restantes de la lista sin agrupar.  El RMSD puede basarse en coordenadas cartesianas de la cadena principal o en valores de ángulos diedros de la cadena principal.
3.  Selecciona todas las estructuras con valores de RMSD por debajo de un umbral especificado por el usuario, las agrupa en el clúster actual y las elimina de la lista sin agrupar.
4.  Repite los pasos 1, 2 y 3 para el siguiente clúster, hasta que no queden estructuras en la lista sin agrupar.

Aunque es simple, este enfoque tiene las ventajas de (a) sesgar los clústeres hacia las estructuras de menor energía (lo que es deseable en muchas aplicaciones), (b) escalar de forma aproximadamente lineal con el número total de estructuras y (c) ser totalmente determinista (_es decir_, ejecuciones repetidas sobre el mismo conjunto de datos siempre producirán la misma salida).

# Entradas y salidas

Para ejecutar esta aplicación, el usuario debe proporcionar:

* Un conjunto de estructuras que se van a agrupar, en cualquier formato de importación compatible con Rosetta.
* Un radio de clúster.
* Opcionalmente, otros ajustes que controlen los detalles del agrupamiento (ver más abajo).

La salida es, por defecto, un conjunto de archivos PDB con nombres de formato `c.<cluster #>.<struct #>.pdb`.  Si se usa la opción `-cluster:energy_based_clustering:silent_output`, la salida son dos silent files binarios de Rosetta: el primero contiene solo los centros de los clústeres y el segundo contiene todas las estructuras.

# Todas las opciones

| Opción | Descripción | Por defecto |
| ---- | ----------- | ------- |
| cluster:<br/>energy_based_clustering:<br/>cluster_radius | (real) El radio para el agrupamiento, en Å para el agrupamiento cartesiano y en grados para el agrupamiento por diedros. | 1.0 |
| cluster:<br/>energy_based_clustering:<br/>cluster_by | (cadena) ¿Qué se usa como base del agrupamiento?  Las opciones son "bb_cartesian" (coordenadas xyz de los átomos de la cadena principal) y "bb_dihedral" (ángulos phi, psi, omega). | "bb_cartesian" |
| cluster:<br/>energy_based_clustering:<br/>use_CB | (booleano) Si se agrupa por coordenadas cartesianas de la cadena principal, ¿se deben incluir los carbonos beta?  Ten en cuenta que, si se usa esta opción, ninguna de las estructuras de entrada puede contener glicina. | false |
| cluster:<br/>energy_based_clustering:<br/>residues_to_ignore | (vector de enteros) Lista de residuos que se ignoran en los alineamientos para el agrupamiento. | \<vector vacío\> |
| cluster:<br/>energy_based_clustering:<br/>chains_to_ignore | (vector de enteros) Lista de cadenas que se ignoran en los alineamientos para el agrupamiento. | \<vector vacío\> |
| cluster:<br/>energy_based_clustering:<br/>limit_structures_per_cluster | (entero) Número máximo de estructuras que se escriben por clúster.  El valor por defecto de cero significa sin límite.  Ten en cuenta que se pueden _asignar_ más estructuras a un clúster, pero si se usa esta opción solo las primeras N se escriben en disco. | 0 |
| cluster:<br/>energy_based_clustering:<br/>limit_clusters | (entero) Número máximo de clústeres que se escriben.  El valor por defecto de cero significa sin límite.  Ten en cuenta que se pueden _generar_ más clústeres, pero si se usa esta opción solo los primeros N se escriben en disco. | 0 |
| cluster:<br/>energy_based_clustering:<br/>cyclic | (booleano) Si es true, se añaden restricciones para formar un enlace peptídico entre los extremos N y C.  Si es false (por defecto), los extremos quedan libres. | false |
| cluster:<br/>energy_based_clustering:<br/>cyclic_symmetry | (entero) Si se indica, se filtran las estructuras que no tienen la simetría deseada.  Usa 2 para simetría C2 o S2, 3 para simetría C3, 4 para simetría C4 o S4, etc.  No se usa (0) si no se especifica.  Solo se puede usar con la opción -cyclic. | 0 |
| cluster:<br/>energy_based_clustering:<br/>cyclic_symmetry_mirroring | (booleano) Si es true, se usa simetría SN en lugar de CN.  No se usa si no se especifica.  Solo se puede usar con las opciones -cyclic y -cyclic_symmetry. | false |
| cluster:<br/>energy_based_clustering:<br/>cyclic_symmetry_threshold | (real) El umbral de ángulo, en grados, para determinar si un péptido cíclico es simétrico.  Solo se puede usar con las opciones -cyclic y -cyclic_symmetry. | 10.0 |
| cluster:<br/>energy_based_clustering:<br/>cluster_cyclic_permutations | (booleano) Si es true, se prueban todas las permutaciones cíclicas al comparar dos estructuras para el agrupamiento.  Requiere -cyclic. | false |
| cluster:<br/>energy_based_clustering:<br/>cyclic_permutation_offset | (entero) 1 por defecto, lo que significa que se agrupan todas las permutaciones cíclicas si -cluster_cyclic_permutations es true.  Los valores X > 1 significan que se agrupan las permutaciones cíclicas desplazadas X residuos. | 1 |
| cluster:<br/>energy_based_clustering:<br/>perform_ABOXYZ_bin_analysis | (booleano) Si es true, se realiza un análisis de bins de Ramachandran en todos los clústeres usando los bins A, B, X, Y y O, tal como se definen en Hosseinzadeh, Bhardwaj, Mulligan et al. (2018).  Las entradas deben ser estructuras de alfa-aminoácidos o de peptoides únicamente. | false |
| cluster:<br/>energy_based_clustering:<br/>mutate_to_ala | (booleano) Si es true, las estructuras de entrada se convierten en una cadena de alaninas (L o D) antes de puntuarlas. | false |
| cluster:<br/>energy_based_clustering:<br/>disulfide_positions | (vector de enteros) Una lista, separada por espacios, de posiciones unidas por disulfuro.  Por ejemplo, -disulfide_positions 3 8 6 23 significaría que los residuos 3 y 8 están unidos por disulfuro, igual que los residuos 6 y 23.  Si no se especifica la opción, queda como una lista vacía, y en ese caso los disulfuros se detectan automáticamente. | \<vector vacío\> |
| cluster:<br/>energy_based_clustering:<br/>homooligomer_swap | (booleano) Si las estructuras contienen varias cadenas con secuencia idéntica, fijar esto en true probará todas las permutaciones de cadenas al agrupar. | false |
| cluster:<br/>energy_based_clustering:<br/>silent_output | (booleano) Escribe la salida en un silent file en lugar de en PDB separados.  Esto crea dos archivos: uno que contiene solo el primer miembro de cada clúster y otro que contiene todo. | false |
| cluster:<br/>energy_based_clustering:<br/>cst_file | (vector de cadenas) Una lista opcional, especificada por el usuario, de uno o más archivos de restricciones.  Se usa para la relajación y la puntuación.  No se usa si no se especifica. | \<vector vacío\> |
| cluster:<br/>energy_based_clustering:<br/>extra_rms_atoms | (vector de cadenas) Una lista de átomos adicionales que se usan en el cálculo del RMSD, cada uno en el formato residuo:nombre_de_átomo, separados por espacios en blanco.  Por ejemplo, -extra_rms_atoms 7:SG 12:CG 12:CD 12:CE 12:NZ 14:OG.  No se usa si no se especifica. | \<vector vacío\> |
| cluster:<br/>energy_based_clustering:<br/>rebuild_all_in_dihedral_mode | (booleano) Si es true, se reconstruyen Pose completos para la salida al agrupar en modo de diedros.  Si es false, solo se escriben las cadenas principales.  True por defecto. | true |
| cluster:<br/>energy_based_clustering:<br/>prerelax | (booleano) ¿Se debe someter las estructuras importadas a una ronda de relajación rápida? | false |
| cluster:<br/>energy_based_clustering:<br/>relax_rounds | (entero) El número de rondas de fastrelax que se aplican si se usa la opción -prerelax. | 1 |
| cluster:<br/>energy_based_clustering:<br/>alternative_score_file | (cadena) Ruta a un archivo que contiene una línea por cada estructura de entrada, que empieza con el nombre de la estructura de entrada y va seguida, separado por espacios en blanco, de un número que se usará como puntuación. Consulta los ejemplos más abajo. **Advertencia:** el uso de esta opción puede aumentar mucho el consumo de memoria cuando se usa con más de un millón de estructuras de entrada | \<cadena vacía\> |
| in:<br/>file:<br/>s | (vector de cadenas) Lista de archivos PDB que se importan. | \<vector vacío\> |
| in:<br/>file:<br/>l | (vector de cadenas) Lista de archivos de texto que contienen listas de archivos PDB que se importan. | \<vector vacío\> |
| in:<br/>file:<br/>silent | (vector de cadenas) Lista de silent files de Rosetta que se importan. | \<vector vacío\> |
| out:<br/>prefix | (cadena) Una cadena de texto que se antepone a todos los nombres de los archivos PDB de salida, o a todas las etiquetas contenidas en un silent file de Rosetta de salida. | \<cadena vacía\> |

# Ejemplo

Dadas las siguientes entradas:

* Un silent file binario de Rosetta que contiene varias cadenas principales de péptidos cíclicos en `inputs/backbones.silent`.
* Un archivo de opciones de Rosetta en `inputs/rosetta.flags`.

La siguiente línea de comandos agrupará las cadenas principales:

```
<path_to_Rosetta>/main/source/bin/energy_based_clustering.default.linuxgccrelease @inputs/rosetta.flags
```

El contenido de `inputs/rosetta.flags` es el siguiente:

```
-in:file:silent inputs/backbones.silent
-in:file:fullatom
-cluster:energy_based_clustering:cluster_radius 1.0
-cluster:energy_based_clustering:limit_structures_per_cluster 10
-cluster:energy_based_clustering:cluster_by bb_cartesian
-cluster:energy_based_clustering:use_CB false
-cluster:energy_based_clustering:cyclic true
-cluster:energy_based_clustering:cluster_cyclic_permutations true
```

# Ejemplo de archivo de puntuaciones
Dados los archivos de entrada pose_001.pdb, pose_002.pdb, pose_003.pdb y pose_004.pdb, así podría verse un archivo de puntuaciones:
```
pose_001.pdb -24.5764
pose_002.pdb -14.4574
pose_003.pdb -19.0286
pose_004.pdb -15.3209
```
Es posible tener duplicados, es decir, varias puntuaciones para el mismo nombre de archivo. En ese caso solo se usa la última puntuación. Además, los nombres de archivo pueden ir seguidos de un ':' y de cualquier otra cadena arbitraria, siempre que no incluya espacios en blanco, y verse así
```
pose_001.pdb:dG_cross -24.5764
```
Esto permite crear fácilmente archivos de puntuaciones para archivos pdb resultantes de ejecuciones de Rosetta con un solo comando:
```
grep "pdb:dG_cross " *.pdb > scores_dG_cross.txt 
```

# Notas sobre el historial de desarrollo

Esta aplicación comenzó como `vmullig/bettercluster.cc`, una aplicación piloto creada el 6 de mayo de 2013.  Desde entonces se le han añadido muchas funciones, entre ellas permutaciones cíclicas, compatibilidad con simetría interna de péptidos y compatibilidad con residuos no canónicos.  También se han eliminado algunas funciones, como el análisis de componentes principales (PCA) de cada clúster.  El 23 de octubre de 2017 se añadió al repositorio de aplicaciones públicas de Rosetta una versión muy depurada para uso general.  El 8 de mayo de 2019 se añadió una opción que permite realizar el análisis de bins de Ramachandran sobre la marcha, durante el agrupamiento.  (Antes, este análisis se realizaba después con un script de Python.) El 26 de mayo de 2022 se añadió una opción para cargar un archivo de puntuaciones personalizado y usar la puntuación que figure en él en lugar de puntuar cada entrada.

# Referencias

Hosseinzadeh P, Bhardwaj G, Mulligan VK, Shortridge MD, Craven TW, Pardo-Avila F, Rettie S, Kim DE, Silva D-A, Ibrahim YM, Webb IK, Cort JR, Adkins JN, Varani G, and Baker D.  2017.  Comprehensive computational design of ordered peptide macrocycles.  Manuscript in revision.

# Véase también

* [[Aplicación de agrupamiento Calibur|calibur-clustering]]
* [[Aplicación cluster heredada|cluster]]
* [[Application Documentation]]: página principal de la documentación de aplicaciones
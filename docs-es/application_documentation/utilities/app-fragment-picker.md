#Documentación de la selección de fragmentos

##Metadatos
========

Autor: Dominik Gront (dgront@chem.uw.edu.pl)

Última edición el 9 de julio de 2020, para añadir información sobre la ejecución con varios hilos. Investigador principal correspondiente: Dominik Gront (dgront@chem.uw.edu.pl).

[[_TOC_]]

##Código y demo
=============

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/fragment_picker.cc       `

-   Ejemplos para probar: los ejemplos están en el directorio rosetta/demos/public/fragment\_picker:
    -   BestFragmentsProtocol: ejemplo básico que muestra cómo seleccionar fragmentos que maximizan una función de puntuación dada
    -   QuotaProtocol: la demo del protocolo quota muestra cómo seleccionar fragmentos para una predicción de proteínas ab initio
    -   Quota\_with\_restraints: muestra cómo incorporar restricciones de distancia a una ejecución de selección de fragmentos

Para ejecutar picker, escribe lo siguiente en una línea de comandos:

```
[path to executable]/picker.[platform|linux/mac][compile|gcc/ixx]release –database [path to database] @options
```

##Referencias
==========

El algoritmo y los componentes del código se han descrito en:

-   Gront D, Kulp DW, Vernon RM, Strauss CEM and Baker D, "Generalized fragment picking in Rosetta: design, protocols and applications", submitted to PLoS ONE

##Propósito
===========================================

Selecciona conjuntos de fragmentos para el modelado de estructuras de proteínas en Rosetta

##Algoritmo
=========

| [[/images/frag_picker_overview.png]]   Figura 1: Esquema general del flujo de trabajo de selección de fragmentos | Los detalles del algoritmo se describen en el artículo de Gront D. et al. En resumen, el programa lee un archivo de base de datos (apodado *vall* ), una secuencia de consulta de entrada o un perfil de secuencia y otros archivos, y produce archivos de fragmentos para el modelado con Rosetta. El proceso de selección consta de tres etapas: preparación (lectura de archivos de entrada, etc.), selección real de fragmentos, en la que los candidatos se envían a un colector, y una selección en la que se prepara el conjunto final de fragmentos a partir de los candidatos recogidos. |
|------|-----|

###Modos
-----

El picker ofrece tres protocolos de selección de fragmentos:

-   **Quota**: sustituye al antiguo programa `        nnmake       `; selecciona fragmentos adecuados para la predicción de estructura de proteínas de novo
-   **Best fragments**: selecciona fragmentos maximizando la función de puntuación; el protocolo funciona bien si los datos disponibles (p. ej., NOE locales de la cadena principal, desplazamientos químicos, restricciones) son satisfactorios para definir la solución óptima
-   **Keep all**: puede usarse para enumerar todos los fragmentos que cumplen algunos criterios. En general, el protocolo consume mucha memoria y debe usarse solo para aplicaciones muy particulares.

### Selección de fragmentos con varios hilos
==============================

Cuando Rosetta se compila con soporte de varios hilos (añadiendo `extras=cxx11thread` al comando `scons`), el fragment picker puede realizar su trabajo en paralelo usando varios hilos.  Esto da como resultado una aceleración: en una buena aproximación, la selección de fragmentos ejecutada en dos hilos terminará el doble de rápido que ejecutada en uno.  (Ten en cuenta que esto puede dejar de ser lineal con números de hilos muy grandes, ni hay ninguna ventaja en lanzar más hilos que núcleos de CPU).  Para usar esta función hay que fijar dos opciones:
* La opción `-multithreading:total_threads` fija el número total de hilos que lanzará Rosetta.  Ningún módulo de Rosetta puede usar más hilos que este número.  Por defecto es 1.  Si se fija en 0, se lanza un hilo por cada CPU del sistema.
* La opción `-frags:j` fija el número de hilos que solicitará el fragment picker.  El máximo que se le asignará es el máximo entre los lanzados y los solicitados.  El valor por defecto es 1.  Si se fija en 0, se solicitan todos los hilos disponibles.

Así, para usar 8 hilos en la selección de fragmentos en un sistema con 8 núcleos de CPU, por ejemplo, compilarías Rosetta con la opción `extras=cxx11thread` y usarías las opciones de línea de comandos `-multithreading:total_threads 8 -frags:j 8`.

## Opciones del usuario
============

###Archivos de entrada
-----------

Hay muchos archivos de entrada posibles, según el protocolo de selección y la función de puntuación. Los más usados son:

|**tipo de archivo**|**descripción**|**de dónde sale**|**quién lo usa**|
|-------------|---------------|---------------------------|---------------|
|vall|base de datos de estructuras de proteínas; de aquí provienen tus fragmentos.|debería estar en el repositorio SVN de Rosetta. También se puede descargar una copia de este archivo desde: [http://www.bioshell.pl/rosetta-related/vall.apr24.2008.extended.gz](http://www.bioshell.pl/rosetta-related/vall.apr24.2008.extended.gz)|archivo obligatorio|
|.wghts|define el sistema de puntuación para la selección de fragmentos|edita uno de los ejemplos que se dan más abajo|archivo obligatorio
|.fasta|secuencia de aminoácidos|ya debes tenerla...|archivo obligatorio salvo que se dé .chk|
|.chk|perfil de secuencia creado con PSI-Blast con modificaciones posteriores (se añaden pseudoconteos)|script make\_fragments.pl|cualquier puntuación basada en perfiles de secuencia, p. ej. ProfileScoreL1; archivo obligatorio salvo que se dé .fasta|
|.ss2|predicción de estructura secundaria en formato PsiPred|Lo más fácil es ejecutar el script make\_fragments.pl. También puedes ejecutar por tu cuenta un software de predicción de estructura secundaria y convertir luego los resultados al formato adecuado. Un script convert\_ss\_predictions.py puede convertir TALOS, Juffo, Porter y SAM a ss2.|puntuaciones SecondarySimilarity o SecondaryIdentity
|.cst|restricciones de distancia (o de diedros)|Convierte tus datos (distancias o valores de ángulos de torsión) al formato adecuado.|puntuaciones AtomPairConstraintsScore o DihedralConstraintsScore|
|.tab|desplazamientos químicos en formato TALOS|experimento de RMN; se pueden descargar ejemplos de la base de datos BMRB|CSScore (protocolo CS-Rosetta)|
|.pdb|estructura de referencia en formato PDB| |se usa para evaluar la calidad de los fragmentos|

Ten en cuenta que algunos de estos archivos los producen programas externos:

|datos de entrada|programa|notas|
|----------|-------|-----|
|perfil de secuencia|PsiBlast (¡la versión antigua, no la de C++!)|El punto de control en bruto de PsiBlast se guarda en formato binario. El script make\_fragments.pl procesa el archivo: añade pseudoconteos a las filas vacías del perfil y lo guarda en un formato de texto plano|
|predicción de estructura secundaria|PsiPred, Jufo, SAM, Porter|Todos estos programas requieren que PsiBlast esté instalado. fragment\_picker lee las predicciones de estructura secundaria de entrada solo en el formato SS2 de PsiPred. El script ss\_pred\_converter.py puede usarse para convertir desde otros formatos de archivo|

###Archivo de pesos para la selección de fragmentos
--------------------------------

Un archivo de pesos tiene al menos cuatro columnas, que dan: el nombre de la puntuación, su prioridad, su peso y el valor máximo permitido. Si, para un candidato dado, una puntuación devuelve un valor mayor que el máximo permitido, el candidato a fragmento deja de considerarse y no se evaluará ninguna puntuación posterior. Las puntuaciones se evalúan según su prioridad decreciente y no según el orden en que aparecen en el archivo de pesos. Para asegurarte de que todas las puntuaciones se evalúan para cada fragmento, pon el carácter '-' (guion) como valor de la puntuación max\_allowed.

El valor de peso `       0.0      ` tiene un significado especial: esas puntuaciones se evalúan solo para los fragmentos seleccionados, al final del programa, cuando se escriben los archivos de salida. Esto permite reducir el tiempo dedicado a evaluar estadísticas descriptivas de los fragmentos, como el crmsd o el coste de Gunn.

A continuación se dan valores de peso típicos:

[[/images/frag_scoring_UML.png]] 
Figura 2: Diagrama UML de las clases principales de puntuación de fragmentos 

Para la predicción ab initio (protocolo quota):
```
# score name priority wght max_allowed extras
SecondarySimilarity 350 1.0 - psipred
SecondarySimilarity 300 1.0 - sam
SecondarySimilarity 250 1.0 - porter
RamaScore 150 2.0 - psipred
RamaScore 150 2.0 - porter
RamaScore 150 2.0 - sam
ProfileScoreL1 200 2.0 -
PhiPsiSquareWell 100 0.0 -
FragmentCrmsd 30 0.0 -
```

Selección de fragmentos al estilo CS-Rosetta:

```
# score name priority wght max_allowed extras
CSScore 375 3.0 -
RamaScore 400 2.0 - talos
SecondarySimilarity 350 3.0 - talos
ProfileScoreL1 200 1.0 -
PhiPsiSquareWell 100 0.0 -
FragmentCrmsd 30 0.0 -
GunnCostScore 20 0.0 -
``` 

Todo lo que empieza en la quinta columna se pasa a un creador de términos de puntuación como parámetros adicionales. La aplicación más importante es proporcionar el nombre de la predicción de estructura secundaria para el protocolo quota.

###Opciones
-------

####Opciones específicas del protocolo
-------------------------

|opción|descripción|ejemplo|
|------|-----------|-------|
|in:file:native|Nombre del archivo PDB nativo|2gb1.pdb|
|in:file:vall|base de datos vall para la selección de fragmentos|vall.dat.apr24.combo.aug09|
|in:file:s|Nombre(s) de los archivos PDB individuales que se van a procesar|2gb1.pdb|
|in:file:xyz|Coordenadas de entrada en formato XYZ en bruto (tres columnas)|2gb1.xyz|
|in:file:fasta|Archivo de secuencia en formato Fasta|2gb1.fasta|
|in:file:pssm|Matriz de puntuación específica de posición en formato NCBI BLAST|2gb1.pssm|
|in:file:checkpoint|Perfil de secuencia (formato de archivo binario) preparado por NCBI BLAST|2gb1.checkpoint|
|in:file:talos\_phi\_psi|Archivo que proporciona ángulos Phi-Psi en formato Talos+|2gb1.tab|
|in:file:torsion\_bin\_probs|Archivo que describe las probabilidades sobre los bins de torsión A,B,E,G,O|2gb1.bin\_probs|
|in:path:database|Rutas de búsqueda del archivo de base de datos de entrada. Si no se encuentra la base de datos, se prueba la variable de entorno ROSETTA3\_DB.||
|frags:scoring:config|esquema de puntuación usado para seleccionar fragmentos|quota\_scores.wghts|
|frags:scoring:profile\_score|esquema de puntuación usado para la comparación perfil-perfil|L1|
|frags:ss\_pred|proporciona uno o más archivos con predicción de estructura secundaria (formato PsiPred SS2), que usarán la puntuación de estructura secundaria y el selector quota. Cada nombre de archivo debe ir seguido de un ID de texto.|2gb1.psipred\_ss2 psipred 2gb1.jufo\_ss2 jufo 2gb1.sam\_ss2 sam|
|frags:n\_frags|número de fragmentos por posición|200|
|frags:n\_candidates|número de candidatos a fragmento por posición; de entre ellos se seleccionarán los fragmentos finales|1000|
|frags:frag\_sizes|tamaños de los fragmentos que se seleccionan de vall|3 9|
|frags:write\_ca\_coordinates|El fragment picker guardará las coordenadas cartesianas CA en los archivos de fragmentos de salida. Por defecto solo se guardan las coordenadas de torsión.||
|frags:allowed\_pdb|proporciona un archivo de texto con las cadenas PDB permitidas (cinco caracteres por entrada, p. ej. '4mbA'). Solo se usarán estas cadenas PDB de Vall para seleccionar fragmentos|templates.pdb\_ids|
|frags:denied\_pdb|proporciona un archivo de texto con las cadenas PDB denegadas (cinco caracteres por entrada, p. ej. '4mbA'). De este modo se pueden excluir de la selección de fragmentos los homólogos cercanos.|homologs\_vall|
|frags:describe\_fragments|Escribe en un archivo las puntuaciones de todos los fragmentos|frags.fsc|
|frags:keep\_all\_protocol|hace que el picker use el protocolo keep-all para seleccionar fragmentos. El predeterminado es el protocolo bounded||
|frags:bounded\_protocol|hace que el picker use el protocolo bounded para seleccionar fragmentos. Este es el comportamiento predeterminado||
|frags:quota\_protocol|el protocolo quota implica el uso de un QuotaCollector y un QuotaSelelctor, sin importar lo que el usuario haya configurado con otras opciones.||
|frags:picking:selecting\_rule|la forma de seleccionar fragmentos entre los candidatos, p. ej. QuotaSelector o BestTotalScoreSelector|BestTotalScoreSelector|
|frags:picking:quota\_config\_file|proporciona un archivo de configuración para el selector quota|quota.conf|
|frags:picking:query\_pos|proporciona la posición de la secuencia para la que se seleccionarán fragmentos. Por defecto se seleccionan fragmentos para toda la secuencia de consulta|21 22 23 24 25 26 27 28 29|
|constraints:cst\_file|nombre(s) de archivo de restricciones para centroid. Cuando se dan varios archivos, se elegirá uno *al azar*.|2gb1-noe.cst|
|out:file:frag\_prefix|Prefijo para la salida del archivo de fragmentos|aa|
|multithreading:total\_threads|En la compilación de Rosetta con varios hilos (compilada con extras=cxx11thread), este es el número total de hilos que Rosetta lanzará y mantendrá en su grupo de hilos.  El fragment picker puede usar _hasta_ este número de hilos.  El número realmente usado se fijará con -frags:j | 8 |
|frags:j | En la compilación de Rosetta con varios hilos, este es el número de hilos que el fragment picker solicitará usar al RosettaThreadManager.  El número que reciba realmente dependerá del total lanzado (fijado con -multithreading:total_threads) y del número disponible y no asignado ya a otras tareas.| 8 |

##Los componentes y conceptos del fragment picker
===========================================

En resumen, el picker procesa la base de datos vall fragmento a fragmento. Para cada fragmento toma todos los candidatos posibles, los puntúa y los guarda dentro de colectores. Cuando se han procesado todos los fragmentos de vall, el contenido de los colectores se pasa a un selector, que selecciona los fragmentos finales. Estos se guardan en archivo(s). A continuación se describen brevemente todas las partes de esta maquinaria.

###Candidato a fragmento
------------------

... es un futuro fragmento, si sobrevive a las etapas de recogida y selección.

###Colector de fragmentos
------------------

El colector recoge fragmentos junto con sus puntuaciones; todos los colectores se construyen sobre utility::vector1\<\>. Por desgracia hay más de 2M de candidatos a fragmento posibles. Para conservarlos todos haría falta cerca de ... por cada residuo de una secuencia de consulta. Por eso un colector puede conservar solo una pequeña fracción de todos los candidatos. BoundedColelctor conserva los Ncand mejores candidatos por cada posición de una secuencia de consulta, donde «mejor» lo define un objeto comparador que se usa para ordenar el contenedor.

###Selector de fragmentos
-----------------

La regla de selección de fragmentos toma todos los candidatos a fragmento y selecciona los Nfrags fragmentos finales.

###Puntuación de fragmentos con caché
------------------------

El almacenamiento en caché es una forma de acelerar la puntuación de fragmentos reciclando los valores de puntuación por residuo. Una función de puntuación con caché debe implementar el método do\_caching(), que evalúa una matriz completa de puntuaciones residuo-frente-a-residuo. Por ejemplo, ProfileL1Score compara cualquier columna del perfil de consulta con cualquier columna de perfil de un fragmento. A la hora de calcular la puntuación de un fragmento de longitud nf que empieza en qi en la consulta y en ci en el fragmento, se calcula una suma sencilla sobre una franja qi-\>qi+nf; ni -\> ni+nf. Además, para evaluar la puntuación del siguiente fragmento (es decir, el que empieza en (qi+1,ni+1)), basta con restar una puntuación por residuo y sumar otra.

Obviamente, el almacenamiento en caché no funciona cuando una puntuación no se puede descomponer en componentes por residuo, p. ej. FragmentCrmsd o RDCScore. En algunos casos el almacenamiento en caché es en realidad más lento que calcular la puntuación sin caché, p. ej. SequenceIdentity

###Sistema de cuotas
------------

En general, el propósito de la cuota es mantener la diversidad dentro de los fragmentos. Si, por ejemplo, para una posición dada de una secuencia de consulta se ha predicho una hélice con un 70 % de probabilidad y un loop con un 30 %, el protocolo «select best» seleccionará solo fragmentos helicoidales para esa posición, porque el término de puntuación `       SecondarySimilarity      ` los favorecerá. Por el contrario, el protocolo quota seleccionará un 30 % de fragmentos de loop (los de mejor puntuación) y un 70 % de las mejores hélices. La situación se complica por el hecho de que se usan 3 predictores de estructura secundaria. Esto da un total de 9 categorías distintas de fragmentos (en adelante, grupos de cuota) que se recogen y puntúan por separado. Una vez seleccionados los fragmentos finales (por separado para cada grupo de cuota), se combinan en un único conjunto.

El protocolo quota usa colectores y selectores específicos de quota. El esquema de puntuación también se altera.

####Grupos de cuota
-----------

En el protocolo quota hay varias categorías de fragmentos (grupos) que se mantienen separadas entre sí. Se recogen, puntúan y seleccionan por separado. Por defecto se usan 3 predicciones de estructura secundaria para seleccionar fragmentos: PsiPred, SAM y Porter. Los candidatos a fragmento también se dividen por clase de estructura secundaria (H, E o L), lo que da 9 grupos de cuota en total. El tamaño de cada grupo lo controlan la asignación de cuota y la probabilidad de estructura secundaria.

Desde el punto de vista de la implementación, un grupo de cuota es un BoundedCollector cuyo tamaño se basa en la asignación de cuota, ordenado según una puntuación de cuota ligeramente modificada. Ten en cuenta que los grupos de cuota, igual que los colectores de fragmentos, son específicos de cada posición, así que para una secuencia de consulta de 100 aa hay unos 900 grupos de cuota.

####Archivo Quota.def
--------------

```
#pool_id pool_name fraction
1 psipred 0.6
2 porter 0.2
3 sam 0.2
```

####Asignación de cuota
---------------

se define para cada predictor mediante un archivo Quota.def. Las asignaciones por defecto son: PsiPred - 0.6 SAM - 0.2 Porter - 0.2 La asignación final de un grupo de cuota es el producto de la parte del predictor y la probabilidad de estructura secundaria. Por ejemplo, si PsiPred predijo que una posición determinada es helicoidal

####Puntuación de cuota: identificación del grupo
---------------------------------

Como se mencionó en la sección [Puntuación de cuota](#Quota-score), algunas puntuaciones se activan y se desactivan para distintos grupos. Para que funcione bien, los dos archivos de configuración: [Archivo de pesos para la selección de fragmentos](#Weight-file-for-fragment-picking) y [Archivo Quota.def](#Quota.def-file) deben contener identificadores de texto que coincidan. Aunque los ejemplos anteriores usan los nombres de los predictores (psipred, porter y sam) con este fin, se puede usar cualquier cadena arbitraria. La única limitación es que los tres siguientes deben coincidir:

-   el nombre de la predicción secundaria dado en un archivo de pesos
-   el nombre del grupo de cuota, dado en el archivo Quota.def
-   el nombre de la predicción secundaria asignado a una puntuación RamaScore o SecondarySimilarity.

####Puntuación de cuota
-----------

La única diferencia entre la puntuación total del fragmento y la puntuación de cuota del fragmento está en el uso de la variante de estructura secundaria adecuada de algunas puntuaciones. Actualmente esto solo afecta a las puntuaciones RamaScore y SecondarySimilarity. Así, por ejemplo, los grupos de cuota creados a partir de una predicción llamada «psipred» usan **solo** la puntuación SecondarySimilarity llamada «psipred».

##Consejos
====

-   varios tamaños de fragmento:
    -   di `          -frags:frag_sizes 3 4 5         ` para seleccionar 3meros, 4meros y 5meros

-   selección de fragmentos para una región predefinida de la secuencia de consulta:
    -   di `          -frags:picking:query_pos 21 22 23 24 25 26 27 28 29         ` para seleccionar fragmentos en las posiciones elegidas

-   comprobación de contaminación por homólogos: para obtener resultados objetivos en los benchmarks de predicción ab initio de estructura de proteínas, los conjuntos de fragmentos no deben contener trozos de proteínas homólogas. Los códigos PDB de las cadenas de proteína no deseadas deben enumerarse en un archivo y pasarse al picker con la opción -frags:denied\_pdb. Sin embargo, esto no garantiza que los resultados estén libres de fragmentos homólogos. Se recomienda comprobar qué entradas del PDB aportan a un fragmento, p. ej. con el siguiente comando de bash:
    ```
    cat aa2gb1.9mers | awk '{print $1}' | uniq | grep -v 'position' | grep '.' | sort | uniq -c | sort -n
    ```
    Las estructuras homólogas aportan bastantes más fragmentos que las proteínas no relacionadas. Hay que examinar manualmente los resultados más frecuentes, quizá añadirlos a la lista de ids PDB denegados y ejecutar de nuevo el fragment picker.

##Salidas esperadas
================

Hay dos tipos de archivos de salida:

###archivo de fragmentos
-------------

Los fragmentos de salida se escriben en formato Rosetta++.

###archivo de puntuaciones de fragmentos
-------------------

Las puntuaciones de los fragmentos se guardan en un formato tabulado plano, un archivo de puntuaciones por cada tamaño de fragmento. Todas las columnas de una misma línea describen un solo fragmento y proporcionan:

-   el índice de su primer residuo en una secuencia de consulta
-   el índice de su primer residuo en el fragmento de vall de origen
-   el id PDB del fragmento de vall de origen
-   el id de cadena del fragmento de vall de origen
-   el tipo de estructura secundaria del residuo central del fragmento
-   todos los valores de puntuación de todo el fragmento, ordenados por su prioridad (descendente)
-   la puntuación total específica de cuota de este fragmento (solo en el caso del protocolo quota)
-   la puntuación total (ponderada) de este fragmento
-   el nombre del grupo de cuota que aportó este fragmento (solo en el caso del protocolo quota)
-   el ID entero único de este fragmento; se define como el número de línea del archivo vall donde se guardan los datos del primer residuo de este fragmento. Si el usuario proporcionó más de un archivo vall, se usa una numeración continua.

##Posprocesamiento
===============

Rosetta 2.x y 3.x pueden usar directamente los fragmentos. El archivo de puntuaciones de fragmentos puede ser útil para depurar, comprobar los niveles de cuota, evaluar la calidad de los fragmentos, etc.

##Novedades desde la última versión
=============================

Esta es la primera versión pública

## Véase también
========

* [[Utility applications | utilities-applications]]: otras aplicaciones de utilidad
* [[fragment-file]]: archivos de fragmentos
* [[Old fragment picker | fragment-picking-old]]: el antiguo fragment picker.
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.

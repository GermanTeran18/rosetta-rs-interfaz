#InterfaceAnalyzer

Metadatos
========

Autores: Steven Lewis, P. Ben Stranges, Jared Adolf-Bryfogle

Última actualización: 29 de junio de 2016, por Steven Lewis. El investigador principal es Brian Kuhlman, [bkuhlman@email.unc.edu](#) .

Código y demostración
=============

InterfaceAnalyzer tiene un conjunto de pruebas de integración/demostraciones en rosetta/main/tests/integration/tests/InterfaceAnalyzer. La aplicación se encuentra en rosetta/main/source/src/apps/public/analysis/InterfaceAnalyzer.cc, y su mover en rosetta/main/source/src/protocols/anchored\_design/InterfaceAnalyzerMover.\*

El [[Mover]] subyacente está documentado para su uso (por ejemplo, en [[RosettaScripts]]) aquí: [[InterfaceAnalyzerMover]].

Referencias
==========

Ninguna referencia está asociada directamente con este protocolo. Se usó con la [[aplicación AnchoredDesign|anchored-design]] (consulta la documentación de esa aplicación), en la discriminación de interfaces de CAPRI21 y en la referencia que sigue.

Stranges, P.B. and B. Kuhlman, A comparison of successful and failed protein interface designs highlights the challenges of designing buried hydrogen bonds. Protein Science, 2013. 22(1): p. 74-82.

Propósito
===========================================

Esta aplicación combina un conjunto de herramientas para analizar interfaces proteína-proteína. Calcula energías de unión, áreas superficiales de interfaz enterradas y otras métricas útiles de la interfaz. La mayor parte del código es un Mover pensado para usarse al final de los protocolos de modelado de interfaces; esa situación se considera su cliente principal. Esta aplicación es una interfaz directa a ese Mover y se considera un propósito secundario. Esta aplicación no funciona con interfaces proteína-ligando.

Algoritmo
=========

Este código no modifica la entrada a propósito; en cambio, la puntúa usando métricas relacionadas con la interfaz y reporta las puntuaciones.

Cómo se detecta la interfaz al empaquetar la interfaz
========================================================

Para el empaquetado, el PackerTask se configura así:

-   Se respetan las opciones del packer de la línea de comandos
-   Se respeta un resfile si está presente en la línea de comandos (-resfile) Y el booleano de InterfaceAnalyzer está en true (-use\_refile desde la línea de comandos, pero también accesible para el Mover)
-   include\_current está activado (la cadena lateral actual cuenta como un rotámero permitido en el empaquetado)
-   No se permite diseñar en ninguna posición

Ninguna de estas operaciones (salvo el resfile) afecta a la elección de qué residuos están en la interfaz.

La interfaz se detecta mediante InterfaceNeighborDefinitionCalculator para interfaces de dos cadenas. Se detecta mediante InterGroupNeighborsCalculator para el constructor multicadena. Cumple básicamente el mismo propósito, pero puede detectar interfaces entre grupos de cadenas. El conjunto de residuos que cualquiera de estos calculadores permite empaquetar se combina con un AND lógico con el conjunto que el resfile permite empaquetar (si está presente); lo que ambos permitan empaquetar forma la interfaz para efectos del reempaquetamiento. Ten en cuenta que no es posible diseñar; si el resfile especifica diseño, los comandos de diseño se ignoran.

Limitaciones
===========

Este código no admite directamente ddG de unión, pero puedes obtener ese efecto ejecutándolo varias veces con estructuras premutadas. Cualquier métrica que no figure en este archivo no se puede calcular directamente. La opción -fixedchains no se ha probado a fondo con más de tres cadenas. Probablemente funcione, pero úsala con cuidado.

No hay forma de obtener como salida las cadenas separadas intermedias cuando se usan las opciones de empaquetado por separado; puedes explorar el código y colocar instrucciones dump\_pdb si las quieres.

Modos
=====

Los dos modos principales son para interfaces de dos cadenas y de varias cadenas. Para interfaces de dos cadenas no necesitas hacer nada, pero definir la interfaz no hace daño. Para interfaces que involucran más de dos cadenas, debes indicarle al código qué cadenas están en cada grupo. Define la interfaz con la opción -fixedchain o -interface.

Otra variable que podría contar como «modo» es la salida por tracer frente a la salida por PDB. Para este ejecutable independiente, lo deseado (y lo predeterminado) es imprimir los resultados en pantalla (sin molestarse en escribir PDB de «resultado» que coincidan con la entrada). Cuando InterfaceAnalyzerMover se usa como parte de un protocolo, lo más común es preferir lo segundo.

Archivos de entrada
===========

-   Los [[resfile|Resfiles]] se admiten en las opciones de empaquetado por separado

Opciones
=======

Describe las opciones que usa tu protocolo.

-   -interface (cadena) - Opción multicadena. ¿Qué cadenas definen la interfaz? Ejemplo: -interface LH\_A para obtener la interfaz entre los grupos de cadenas LH y A. Funciona con subinterfaces como L\_H, ignorando en los cálculos las cadenas no especificadas. No se ha probado a fondo con más de tres cadenas.
-   -fixedchains (cadena) - Opción multicadena. ¿Qué cadenas están en los dos grupos que definen la interfaz? Ejemplo: -fixedchains A B para mantener juntas las cadenas A y B, y separada la C, en un Pose que contiene A, B y C. Ten en cuenta el espacio entre A y B. Análoga a la opción -interface. Incluye todas las cadenas del Pose. No se ha probado a fondo con más de tres cadenas.

-   -compute\_packstat (bool) - activa el cálculo de packstat; puede ser lento para interfaces grandes, por lo que por defecto está desactivado. Consulta el artículo de RosettaHoles para saber más sobre este estadístico (Protein Sci. 2009 Jan;18(1):229-39.).  Packstat tiene un componente aleatorio importante; si te interesa la puntuación, se recomienda -packstat::oversample 100 como opción complementaria; esto aumenta el tiempo de ejecución de packstat pero reduce la varianza.  
-   -tracer\_data\_print (bool) - ¿imprimir en un tracer (true) o en un scorefile (false)? Combina la versión true con -out:jd2:no\_output y la false con out:file:score\_only (scorefile).
-   -pack\_input (bool) - ¿preempaquetar antes de separar las cadenas al calcular la energía de unión? Es útil si las entradas no provienen de Rosetta
-   -pack\_separated (bool) - ¿reempaquetar las interfaces expuestas al calcular la energía de unión? Normalmente es buena idea.
-   -add\_regular\_scores\_to\_scorefile (bool) - realiza una operación de puntuación score12 normal además de las operaciones de InterfaceAnalyzer. Es útil para no tener que combinar los scorefiles de score.cc o de tu protocolo original. Si no usas esta opción, puede que obtengas campos extra llenos de ceros en tu scorefile.
-   -use\_jobname (bool) - si se usa la salida por tracer, esto convierte el nombre del tracer en el nombre del trabajo. Si ejecutas este código con 50 entradas, el nombre del tracer cambiará para coincidir con la entrada, etiquetando cada línea de salida con la entrada a la que corresponde. No es relevante si no se usa la salida por tracer.
-   -use\_resfile (bool) - avisa al protocolo de que esté atento a la existencia de un resfile si debe realizar algún paso de empaquetado. (Normalmente esto lo indica la existencia de la opción -resfile, pero aquí el InterfaceAnalyzerMover subyacente no está pensado para usar -resfile en circunstancias normales, así que se necesita una opción aparte. Aún puedes pasar el resfile con -resfile.) Ten en cuenta que los comandos del resfile que indican diseño se ignoran; InterfaceAnalzyer hace SOLO reempaquetamiento.
-   -score:weights weightsfile - conjunto de pesos para la función de puntuación; por defecto, Score12
-   -score:patch patchfile - archivo de parche para la función de puntuación; por defecto, Score12
-   -pose\_metrics::inter\_group\_neighbors\_cutoff (real) - si se usa el constructor multicadena (la opción -fixedchains  o -interface), controla a qué distancia se detectan los vecinos: un residuo está en la interfaz si está a menos de X Å de un residuo del otro grupo; creo que las distancias se determinan con la posición del nbr\_atom, que el archivo params del residuo define normalmente como el C-beta. Por defecto, 10 Å.
-   -pose\_metrics::interface\_cutoff (real) - si se detecta la interfaz entre dos cadenas, esto fija el límite de detección de vecinos. Un residuo está en la interfaz si está a menos de X Å de un residuo del otro grupo; creo que las distancias se determinan con la posición del nbr\_atom, que el archivo params del residuo define normalmente como el C-beta.

Se aceptan las opciones generales de Rosetta/JD2: in:file:s, in:file:l, in:file:silent para la entrada; -database para la base de datos, etc.

-   Se recomienda ENCARECIDAMENTE usar -out:file:score_only (scorefile) O -out:jd2:no_output (bool) para evitar que las estructuras de entrada se repitan como salidas.

SASA
====

Los radios de SASA han cambiado desde la versión 3.5 para ser más correctos. Antes se usaba un conjunto parametrizado para una función de puntuación que ya no se usa. Dicho esto, los cambios son relativamente pequeños. Rosetta ahora usa por defecto los radios de reduce (consulta las opciones adjuntas para ver las referencias originales de este conjunto de radios). Ahora puedes cambiar tanto el conjunto de radios que se usa como si los hidrógenos se consideran de forma implícita o explícita. Ten en cuenta también que por ahora el único método es el método de SASA de LeGrand, que no calcula la SASA exacta. La mayoría de los métodos no calculan la SASA exacta, por velocidad.

Ahora, en cuanto a la hSASA. Antes se incluían los átomos polares en el cálculo y ahora no. Esto también debería ser más correcto, pero depende de lo que consideres que debería ser la hSASA. Hay muy poco análisis sistemático de este número. Por defecto, el átomo se excluye de la hSASA si su carga es mayor que .4 lo que, en el caso de las proteínas, solo significa excluir los carbonos carbonílicos y carboxílicos, que son polares. De nuevo, puedes cambiar esto con una opción. Estas opciones generales están ahora en el espacio de nombres de opciones SASA. Consulta [[esta página | full-options-list#sasa]] para más información.


Consejos
====

-   Se recomienda ENCARECIDAMENTE usar -out:file:score_only (scorefile) O -out:jd2:no\_output (bool) para evitar que las estructuras de entrada se repitan como salidas.
-   Calcula de más las métricas e ignora las que no entiendas o no te interesen, en lugar de intentar calcular justo el conjunto adecuado.
-   Si usas esto como aplicación (en lugar de como Mover), la opción add\_regular\_scores\_to\_scorefile evitará que obtengas columnas extra de ceros en tu scorefile. Es tu decisión, según cómo te guste procesar tus datos.

Salidas esperadas
================

InterfaceAnalyzer genera una enorme cantidad de datos sobre tu estructura de entrada. Los siguientes son campos del scorefile o del pdb (si -tracer\_data\_print es false) que añade esta aplicación.

-   dSASA\_int: El área accesible al solvente enterrada en la interfaz, en Å cuadrados.
-   dG\_separated: El cambio de energía de Rosetta cuando las cadenas que forman la interfaz están separadas, frente a cuando están en complejo: la energía de unión. Se calcula separando realmente (y, opcionalmente, reempaquetando) las cadenas.
-   dG\_separated/dSASAx100: Energía de unión separada por unidad de área de interfaz \* 100 para que las unidades encajen en el scorefile. Escalar por dSASA controla el hecho de que las interfaces grandes tienen más energía. El factor de 100 permite usar la notación estándar 2.45 en lugar de algo como 2.45E-2.
-   delta\_unsatHbonds: El número de enlaces de hidrógeno enterrados y sin satisfacer en la interfaz
-   packstat: La puntuación estadística de empaquetamiento de Rosetta para la interfaz (0=mala, 1=perfecta)
-   dG\_cross: Energía de unión de la interfaz calculada con términos de energía que cruzan la interfaz, en lugar de separar la interfaz. A veces es imprecisa por las dependencias del entorno de algunos términos de energía, entre ellos la energía de enlaces de hidrógeno y la solvatación.
-   dG\_cross/dSASAx100: Como el anterior, pero para dGcross
-   cen\_dG: Energía de unión en modo centroid con la función de puntuación score3.
-   nres\_int: Número de residuos en la interfaz
-   per\_residue\_energy\_int: Energía promedio de cada residuo en la interfaz
-   side1\_score: Energía de un lado de la interfaz
-   side2\_score: Energía del otro lado de la interfaz
-   nres\_all: número total de residuos en todo el complejo
-   side1\_normalized: Energía promedio por residuo en un lado de la interfaz.
-   side2\_normalized: Energía promedio por residuo en el otro lado de la interfaz.
-   complex\_normalized: Energía promedio de un residuo en todo el complejo
-   hbonds\_int: Total de enlaces de hidrógeno que cruzan la interfaz.   
-   hbond\_E\_fraction: Porción de la energía de la interfaz (dG\_separated) atribuible a los enlaces de hidrógeno que cruzan la interfaz

Lo siguiente se entrega en el tracer o en el pdb de salida (según la opción -tracer\_data\_print), pero (al momento de escribir esto) no se puede enviar a un scorefile:

-   Lista de Residuo, Cadena, Átomo a los que les faltan enlaces de hidrógeno en la interfaz
-   selección al estilo pymol, lista para copiar y pegar, de los residuos con enlaces de hidrógeno sin satisfacer. Cópiala en pymol y creará una selección.
-   selección al estilo pymol, lista para copiar y pegar, de los residuos de la interfaz. Similar a la anterior.

Los siguientes son campos que aparecen en la salida del tracer si -tracer\_data\_print es true:

-   TOTAL SASA: SASA total del complejo (NO de la interfaz)
-   NUMBER OF RESIDUES: Número de residuos del complejo
-   AVG RESIDUE ENERGY: Puntuación total dividida por el número de residuos del complejo
-   INTERFACE DELTA SASA: dSASA\_int de arriba; área superficial accesible al solvente de la interfaz enterrada por el complejo
-   CROSS-INTERFACE ENERGY SUMS: Energía de unión calculada de la manera «imprecisa», insensible al entorno
-   SEPARATED INTERFACE ENERGY DIFFERENCE: Energía de unión calculada de la manera «precisa», separando las cadenas y, opcionalmente, reempaquetando
-   INTERFACE DELTA SASA/CROSS-INTERFACE ENERGY: Energía de unión («imprecisa») dividida por la SASA
-   INTERFACE DELTA SASA/SEPARATED INTERFACE ENERGY: Energía de unión («precisa») dividida por la SASA
-   DELTA UNSTAT HBONDS: Diferencia en el número de enlaces de hidrógeno sin satisfacer entre el estado unido y el no unido
-   HBOND ENERGY: Energía debida al término de enlaces de hidrógeno
-   CROSS INTERFACE HBONDS: Número total de enlaces de hidrógeno que cruzan la interfaz puntuados por Rosetta.

Posprocesamiento
===============

Esta aplicación forma parte del posprocesamiento de otros ejecutables; en sí misma no hay realmente nada que posprocesar.  

Sin embargo, una situación típica en diseño es seleccionar los 10 mejores modelos por dG de interfaz entre el 10 % superior de energía total.    


##Véase también

* [[interface_energy]]: energía en la interfaz entre dos conjuntos de residuos
* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta

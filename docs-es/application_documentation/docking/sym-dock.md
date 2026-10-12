#Docking simétrico

Metadatos
=========

Autor: Ingemar André

Este documento fue editado el 20 de agosto de 2010 por Ingemar Andre. Esta aplicación de Rosetta fue creada por Ingemar André.

Código y demo
=============

El código de la aplicación de docking simétrico está en rosetta/main/source/src/apps/pilot/andre/SymDock.cc. Consulta `       rosetta/tests/integration/tests/symmetric_docking      ` para ver un ejemplo del protocolo de docking simétrico y de sus archivos de entrada.

Referencias
===========

Andre I, Bradley P, Wang C, Baker D. Prediction of the structure of symmetrical protein assemblies. Proc Natl Acad Sci U S A. 2007 Nov 6;104(45):17656-61.

Propósito de la aplicación
===========================================

La aplicación predice la estructura de ensamblajes proteicos homooligoméricos simétricos a partir de la estructura de una sola subunidad. Es muy similar en espíritu al [[protocolo estándar de docking proteína-proteína|docking-protocol]] y contiene los mismos componentes básicos. La orientación relativa de las subunidades y las conformaciones de las cadenas laterales se optimizan simultáneamente para un ensamblaje proteico simétrico.

Algoritmo
=========

El protocolo comienza generando una configuración inicial del ensamblaje simétrico descrita por la definición de simetría que se da como entrada a Rosetta. Después se aleatoriza la posición de cuerpo rígido (la orientación relativa entre las subunidades) para obtener un estado de partida sin sesgo. El protocolo continúa con una etapa de baja resolución en la que el universo conformacional se reduce solo a las configuraciones en las que las subunidades forman una cantidad significativa de contactos entre sí. Primero se trasladan las subunidades a lo largo de los grados de libertad permitidos hasta un contacto tangencial. En un sistema simétrico puede haber varios grados de libertad de traslación y puede hacer falta un deslizamiento multidimensional. En el tipo de simetría más simple y común, la simetría binaria (c2), la traslación solo puede ocurrir a lo largo de un eje que conecta los centros de masa de las dos subunidades. Normalmente se configura para que sea el eje x del sistema y la traslación solo se permite a lo largo de x. Con simetrías más complicadas, a menudo habrá varias direcciones en las que puede producirse la traslación manteniendo la simetría global del sistema. En general, la forma de realizar los movimientos de deslizamiento se puede controlar con un parámetro de la definición de simetría de entrada. Por defecto, se selecciona al azar un grado de libertad de deslizamiento y las subunidades se trasladan en esa dirección hasta encontrar contacto con otras subunidades. Luego se selecciona el siguiente grado de libertad de traslación y se realiza un deslizamiento hasta el contacto. El siguiente paso es optimizar la orientación de cuerpo rígido mediante una búsqueda Monte Carlo con una función de energía de baja resolución (la misma que en docking, pero simétrica).

El protocolo continúa con una etapa de alta resolución que optimiza simultáneamente las cadenas laterales y la conformación de cuerpo rígido mediante una estrategia de minimización Monte Carlo (MCM). Esto imita el protocolo estándar de docking heterodimérico.

Simetría
========

Los ensamblajes proteicos pueden adoptar múltiples tipos de ensamblajes simétricos. Rosetta puede modelar cualquier tipo de simetría. Puedes encontrar una breve descripción de los tipos de simetría más comunes en la [[Guía del usuario de simetría.|symmetry]] Para una descripción más completa de la simetría en macromoléculas biológicas, consulta "Structural symmetry and protein function" Goodsell DS and Olsson AJ, Annu Rev Biophys Biomol Struct. 2000;29:105-53.

Archivos de entrada
===================

-   La entrada del protocolo de docking simétrico es una única estructura monomérica. Si vas a ejecutar un refinamiento de un ensamblaje o un dock\_pert, la orientación de cuerpo rígido del monómero de entrada debe coincidir con la definición de simetría de entrada para regenerar correctamente el ensamblaje completo. Usa el script make\_symmdef\_file para obtener una estructura de entrada y un archivo de definición de simetría que coincidan.
-   Debe proporcionarse un archivo de definición de simetría que defina la simetría del sistema simulado. Si no tienes conocimiento previo de la configuración de cuerpo rígido, puedes usar el script [[make_symmdef_file_denovo|make-symmdef-file-denovo]] para generar el archivo de simetría de entrada para los tipos de simetría comunes (cíclica o diedra). Si tienes una configuración de partida que quieras refinar o perturbar, usa en su lugar el script [[make_symmdef_file|make-symmdef-file]]. Si quieres simular una simetría que no está codificada en make\_symmdef\_file\_denovo, la definición de simetría se puede escribir a mano. Esto puede ser complicado y la alternativa es analizar un complejo proteico con la misma simetría de la base de datos PDB y generar un archivo de definición de simetría a partir de esa proteína. Luego asegúrate de que la orientación inicial esté bien aleatorizada editando el archivo de definición.

Ten en cuenta que, para simetrías más complejas, puede que tengas que editar el archivo de definición para seleccionar en qué orden deben realizarse los movimientos de traslación (deslizamiento hasta el contacto). Lee la [[Guía del usuario de simetría.|symmetry]] como referencia.

Opciones
========

Opciones generales y de empaquetado
-----------------------------------

-   -database [file path] - la ubicación de la base de datos de Rosetta 3

-   -in:file:s [file path] - la estructura de la subunidad de entrada

-   -ex1, -ex2, -extrachi\_cutoff [num residues], etc. - aumentan la resolución de la biblioteca de rotámeros

Actualmente, el mejor lugar para leer sobre las opciones de empaquetado en general es la documentación de la [[aplicación de diseño de cadena principal fija|fixbb]] .

Opciones estándar de docking
----------------------------

-   -docking:docking\_local\_refine - Realiza un refinamiento local de la posición de docking (alta resolución).
-   -docking:dock\_ppk - Realiza un prepaquetado del monómero antes de la ejecución de docking. Esto producirá un pdb de salida homomérico. Usa un único monómero como entrada de Rosetta.
-   -docking:dock\_mcm\_trans\_magnitude ANGSTROM - Tamaño del ajuste aleatorio de la posición de cuerpo rígido durante el procedimiento mcm.
-   -docking:dock\_mcm\_rot\_magnitude DEGREES - Tamaño del ajuste rotacional aleatorio de la posición durante el procedimiento mcm.

Ten en cuenta que algunas opciones no tienen sentido en el contexto de la simetría (como randomize1 o randomize2, spin, y que dock\_pert queda cubierto por la opción -symmetry:perturb\_rigid\_body\_dofs (abajo), etc.).

Opciones de simetría
--------------------

-   -symmetry:initialize\_rigid\_body\_dofs - Inicializa la configuración de cuerpo rígido según el archivo de definición de simetría.
-   -symmetry:perturb\_rigid\_body\_dofs ANGSTROMS DEGREES - Si quieres aplicar una perturbación de cuerpo rígido a la conformación de cuerpo rígido inicial. Esto traslada y rota al azar el complejo de partida original con magnitudes controladas por los valores de los parámetros (ANGSTROMS, DEGREES). Las perturbaciones siguen una distribución gaussiana y están centradas alrededor de los valores de los parámetros.
-   -symmetry:symmetric\_rmsd - Busca el rmsd más bajo frente al nativo considerando todos los órdenes posibles de las cadenas. Es necesario para obtener el rms correcto en sistemas con más de 2 subunidades. Puede no ser necesario si se realiza una perturbación local o un dock\_pert, siempre que la entrada tenga el orden de cadenas coincidente. El número de cálculos de rms crece exponencialmente con el número de subunidades, por lo que en sistemas grandes será muy lento.

Opciones de salida
------------------

-   El protocolo de docking simétrico usa el [[distribuidor de trabajos jd2|jd2]] .

Consejos
========

Igual que en el docking normal, generalmente tiene sentido empezar con un monómero de proteína prepaquetado.

Debido a los menores grados de libertad de un sistema simétrico, generalmente no hace falta ejecutar tantos modelos como en el docking normal. Para un sistema cíclico, 5000 modelos deberían bastar. En muchos sistemas no es necesario simular explícitamente todas las subunidades de los sistemas simétricos. Por ejemplo, en un dodecámero con simetría cíclica una subunidad solo interactúa con las subunidades vecinas a su izquierda o a su derecha en el anillo. Con [[make_symmdef_file_denovo|make-symmdef-file-denovo]] puedes añadir la opción -subsystem para generar una definición de simetría más pequeña para un sistema más pequeño. Con el script [[make_symmdef_file|make-symmdef-file]] esto se puede controlar ajustando la distancia de corte (opción -r). Las subunidades que estén dentro de la distancia de corte se simularán explícitamente.

Una ejecución estándar incluiría las siguientes opciones

```
-in:file:s
-in:file:native
-database
-symmetry:symmetry_definition
-packing:ex1
-packing:ex2aro
-out:nstruct
-out:file:fullatom
-symmetry:initialize_rigid_body_dofs
-symmetry:symmetric_rmsd
```

Si quieres agrupar el resultado en clústeres, asegúrate de generar silent files ( -out:file:silent y -out:file:silent_struct_type binary ), ya que la información de simetría se pierde al escribir archivos PDB.

Salidas esperadas
=================

El protocolo produce archivos PDB o un silent file según tus opciones, junto con un scorefile. El estado de salida normal del protocolo viene del distribuidor de trabajos jd2. Dice algo como "You'll see the jd2 x jobs completed in y seconds message if successfully completed".

Posprocesamiento
================

Para el docking simétrico se usan los mismos procedimientos que para el docking normal. Si tienes una referencia nativa, genera un gráfico de puntuación frente a rmsd y busca un embudo. Sin una estructura de referencia, agrupa en clústeres los 200-400 modelos de menor energía con la aplicación cluster. En algunos casos puede que quieras calcular un rms simétrico durante el agrupamiento. Añade -symmetry:symmetric\_rmsd como opción a la aplicación cluster.



##Véase también

* [[Docking Applications]]: página principal de las aplicaciones de docking
* [[Symmetry]]: información sobre el uso de Rosetta con simetría
* [[Preparing structures]]: notas sobre la preparación de estructuras para usarlas en Rosetta
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[RosettaScripts]]: página principal de la interfaz RosettaScripts de Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta

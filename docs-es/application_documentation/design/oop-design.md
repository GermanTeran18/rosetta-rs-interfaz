#aplicación oop\_design

Metadatos
========

Autor: Kevin Drew, (kdrew@nyu.edu)

Última actualización: 30 de noviembre de 2012;

Código y demostración
=====================

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/noncanonical_backbones/oop_design.cc       `
-   Código fuente del mover: `        rosetta/main/source/src/protocols/simple_moves/oop/OopRandomSmallMover.cc       `
-   Código fuente del mover: `        rosetta/main/source/src/protocols/simple_moves/oop/OopRandomPuckMover.cc       `
-   Para ver una demostración de una ejecución básica, consulta la carpeta de integración ( `        rosetta/main/tests/integration/tests/oop_design/       ` ) y la carpeta de demos ( `        rosetta/demos/public/oop_design       ` ).

Documentación de la aplicación oop\_design
==========================================

Las referencias principales de la aplicación oop\_design se publicarán en la colección especial de Rosetta de PlosOne 2013.

Propósito de la aplicación
===========================================

Las oligooxopiperazinas (oop) son un andamio peptidomimético (de 4 a 6 residuos de longitud, con cadenas principales ciclizadas cada dos residuos) que imita los residuos i, i+4, i+7 de una hélice alfa. Muchas interfaces de interacción entre proteínas involucran hélices, y hay interés en usar oops como inhibidores de interacciones proteicas. El diseño racional de oops con la aplicación oop\_design intenta encontrar proteínas de unión de alta afinidad para proteínas objetivo.

Algoritmo
=========

1.  Fase de perturbación: movimiento de cuerpo rígido de la oop respecto al objetivo, movimientos pequeños de la oop hacia la conformación del anillo oop, movimiento de puckering de la oop para cambiar el pliegue del anillo oop, movimientos pequeños en los enlazadores del anillo
2.  Fase de diseño: diseño de los residuos que especifique el usuario en el andamio oop y minimización
3.  Repetir 10 veces

Archivos de entrada
===================

oop\_design requiere las siguientes entradas:

-   **Estructura inicial:**
     La estructura inicial debe tener dos cadenas: la primera debe ser la proteína objetivo y la segunda el andamio oop (consulta las entradas de la demostración como ejemplo). La conformación inicial debe estar cerca de un modo de unión plausible, porque la aplicación oop\_design no realiza perturbaciones grandes. La estructura inicial también debe refinarse antes de usarla como entrada; el procedimiento recomendado es ejecutar relax con restricciones (referencia).

Opciones
========

I. Opciones comunes de oop\_design:
----------------------------
| Opción | Descripción | Tipo | Valor por defecto |
|:-----|:------------|:-----|:--------|
|-oop_design_positions|posiciones de la cadena oop que se van a diseñar|lista de números [ej. 1 2 3 6]|None, solo reempaquetado, sin diseño|
| -pert_num| número de perturbaciones realizadas durante la fase de perturbación| entero|10|
|-design_loop_num|número de ciclos de perturbación + diseño|entero|10|


II. Opciones comunes de Rosetta relevantes
---------------------------------

Puedes encontrar más información sobre las opciones comunes de Rosetta en las [[páginas relevantes del manual de Rosetta|Rosetta-Basics]]. En particular, las opciones relacionadas con el distribuidor de trabajos (jd2), la función de puntuación, los archivos de restricciones y los resfiles de empaquetado son idénticas a las de cualquier otro protocolo de Rosetta.

| Opción | Descripción | 
|:-----|:------------|
|-in::file::s Or -in:file:silent|Especifica la estructura inicial (in::file::s para formato PDB, in:file:silent para formato silent file).|
|-in::file::silent_struct_type AND -out::file::silent_struct_type|Formato del silent file que se lee o se escribe. Para la salida en silent file, usa el tipo binario, ya que otros tipos podrían no admitir la forma ideal|
|-nstruct|Número de modelos que se generan en la simulación|
|-use_input_sc|Incluye las conformaciones de rotámeros de la estructura de entrada durante el reempaquetado de cadenas laterales. A diferencia de la opción -unboundrot, no se agregan todos los rotámeros de la estructura de entrada a la biblioteca de rotámeros cada vez; solo se conservan las conformaciones aceptadas al final de cada ronda y las demás se pierden.|
|-ex1/-ex1aro -ex2/-ex2aro -ex3 -ex4|Agrega rotámeros extra de cadena lateral|
|-database|La base de datos de Rosetta|
|-include_patches|Activa los archivos de parches, que están desactivados por defecto.   Activar patches/oop_pre.txt y patches/oop_post.txt es un requisito para las aplicaciones oop.|

Consejos
========

Ejemplos de ejecución
---------------------

1.  genera 1000 (o más) modelos

    ```
     oop_design.{ext}
    -database ${rosetta_db} -include_patches patches/oop_pre.txt patches/oop_post.txt -s start.pdb -nstruct 1000 -oop_design_positions 1 2 3 4 -pert_num 100 -design_loop_num 10
    ```

2.  Ordena los modelos por puntuación total, toma el 5% superior y ordénalo por REPACK\_ENERGY\_DIFF. Inspecciona los mejores modelos.

Limitaciones:
-------------

-   **Empieza con un buen modo de unión:**
     Esta aplicación no realiza perturbaciones grandes y, por lo tanto, solo explora de forma mínima el espacio alrededor de la estructura de entrada. Usa evidencia experimental, una aplicación completa de docking o estima el modo de unión a partir de los residuos clave (hotspot) del complejo nativo.

-   **Modelo del objetivo:**
     Esta aplicación supone que la cadena principal de la estructura objetivo está en una conformación fija y no realiza movimientos de cadena principal flexible.

-   **Longitud de la oop:**
     Esta aplicación solo se ha probado con dímeros de oop (4 residuos). Aunque no se ha probado, no hay una razón evidente por la que un trímero de oop o una oop extendida (por ejemplo, un dímero de oop con residuos adicionales en el extremo N o C) no funcionaría.

-   **Tiempo de ejecución típico:**
     Con la configuración por defecto y una estructura de entrada típica (\~ 100 residuos), se estima que un solo modelo tarda unos 15 segundos. Para los 1000 modelos recomendados, el tiempo de ejecución debería ser de \< 25 minutos.

-   **Receptores de varias cadenas:**
     Actualmente esta aplicación solo admite objetivos de una sola cadena. Si quieres usar un objetivo de varias cadenas, puede que te funcione modificar tu PDB de entrada para renombrar todas las cadenas del objetivo como una sola cadena grande (eliminando los átomos de los extremos y las líneas TER). La renumeración solo es necesaria para resolver conflictos de numeración.

Salidas esperadas
=================

La salida de una ejecución de oop\_design es un archivo de puntuaciones (score.sc por defecto) y k estructuras de modelos (según lo especifique la opción -nstruct y las demás opciones comunes de entrada y salida de Rosetta). La puntuación de cada modelo está en la segunda columna del archivo de puntuaciones.

Posprocesamiento
================

La selección de modelos debe hacerse ordenando por puntuación total, tomando el 5% superior y ordenándolo por REPACK\_ENERGY\_DIFF en el archivo de puntuaciones.

##Véase también

* [[Diseño HBS | hbs-design ]]: Diseña hélices alfa con sustitutos de enlace de hidrógeno (HBS), otro mimético de hélices.
* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: Cómo preparar estructuras para usarlas en Rosetta

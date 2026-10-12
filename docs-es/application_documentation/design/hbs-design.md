#Aplicación hbs\_design

Metadatos
========

Autor: Kevin Drew, (kdrew@nyu.edu)

Última actualización: 7 de diciembre de 2012;

Código y demo
=============

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/noncanonical_backbones/hbs_design.cc       `
-   Para una demostración de una ejecución básica, consulta la carpeta de integración ( `        rosetta/main/tests/integration/tests/hbs_design/       ` ) y la carpeta de demos ( `        rosetta/demos/public/hbs_design       ` ).

Documentación de la aplicación hbs\_design
=============================================

Las referencias principales de la aplicación hbs\_design se publicarán en la colección especial de Rosetta de PlosOne 2013

Propósito
===========================================

Los sustitutos de enlaces de hidrógeno (hydrogen bond surrogates, HBS) son hélices alfa estabilizadas. El primer enlace de hidrógeno se sustituye por un conector covalente. Muchas interfaces de interacción entre proteínas involucran hélices y existe interés en usar HBS como inhibidores de interacciones proteicas. El diseño racional de HBS con la aplicación hbs\_design intenta encontrar proteínas de unión de alta afinidad para proteínas diana.

Algoritmo
=========

1.  Fase de perturbación: movimiento de cuerpo rígido del HBS respecto a la diana
2.  Fase de diseño: diseña los residuos especificados por el usuario en el andamiaje HBS y minimiza
3.  Repite 10 veces

Archivos de entrada
===========

hbs\_design requiere las siguientes entradas:

-   **Estructura inicial:**
     La estructura inicial debe tener dos cadenas: la primera debe ser la proteína diana y la segunda el andamiaje HBS (consulta las entradas de la demo para ver un ejemplo). La conformación inicial debe estar cerca de un modo de unión plausible, porque la aplicación hbs\_design no realiza perturbaciones grandes. La estructura inicial también debe refinarse antes de la entrada; el procedimiento recomendado es hacer relax con restricciones (referencia).

Opciones
=======

I. Opciones comunes de hbs\_design:
----------------------------

| Opción | Descripción | Tipo | Valor por defecto |
|:-----|:------------|:-----|:--------|
|-hbs_design_positions|posiciones de la cadena HBS que se van a diseñar|lista de números [ej. 1 2 3 6]|None, solo reempaquetado, sin diseño|
| -pert_num|número de perturbaciones realizadas durante la fase de perturbación| entero|10|
|-design_loop_num|número de ciclos de perturbación + diseño|entero|10|

II. Opciones comunes de Rosetta relevantes
---------------------------------

Puedes encontrar más información sobre las opciones comunes de Rosetta en las [[páginas relevantes del manual de Rosetta|Rosetta-Basics]]. En particular, las opciones relacionadas con el distribuidor de trabajos (jd2), la función de puntuación, los archivos de restricciones y los resfiles de empaquetado son idénticas a las de cualquier otro protocolo de Rosetta).

| Opción | Descripción | 
|:-----|:------------|
|-in::file::s Or -in:file:silent|Especifica la estructura inicial  (in::file::s para formato PDB, in:file:silent para formato de silent file).|
|-in::file::silent_struct_type AND -out::file::silent_struct_type|Formato del silent file que se lee o se escribe. Para la salida en silent file, usa el tipo de archivo binario, ya que otros tipos pueden no admitir la forma ideal|
|-nstruct|Número de modelos que se crean en la simulación|
|-use_input_sc|Incluye las conformaciones de rotámeros de la estructura de entrada durante el reempaquetado de las cadenas laterales. A diferencia de la opción -unboundrot, no se añaden cada vez a la biblioteca de rotámeros todos los rotámeros de la estructura de entrada, sino que solo se conservan las conformaciones aceptadas al final de cada ronda y las demás se pierden.|
|-ex1/-ex1aro -ex2/-ex2aro -ex3 -ex4|Añade rotámeros extra de cadena lateral|
|-database|La base de datos de Rosetta|
|-include_patches|Activa los archivos de parches, que están desactivados por defecto.  Activar patches/hbs_pre.txt y patches/hbs_post.txt es un requisito para las aplicaciones hbs.   |


Consejos
====

Ejemplos de ejecución
------------

1.  genera 1000 (o más) modelos

    ```
     hbs_design.{ext} -database ${rosetta_db} -include_patches patches/hbs_pre.txt patches/hbs_post.txt -s start.pdb -nstruct 1000 -hbs_design_positions 1 2 3 4 -pert_num 100 -design_loop_num 10
    ```

2.  Ordena los modelos por puntuación total, toma el 5 % superior y ordénalo por REPACK\_ENERGY\_DIFF. Inspecciona los mejores modelos.

Limitaciones:
------------

-   **Empieza con un buen modo de unión:**
     Esta aplicación no realiza perturbaciones grandes y, por lo tanto, explora solo mínimamente el espacio alrededor de la estructura de entrada. Usa evidencia experimental, una aplicación de docking completa o estima el modo de unión a partir de los residuos puntos calientes (hotspot) del complejo nativo.

-   **Modelo de la diana:**
     Esta aplicación supone que la cadena principal de la estructura diana está en una conformación fija y no realiza movimientos de cadena principal flexible.

-   **Tiempo de ejecución típico:**
     Con la configuración predeterminada y una estructura de entrada típica (\~ 100 residuos), se estima que un solo modelo tarda unos 15 segundos. Para los 1000 modelos recomendados, el tiempo de ejecución debería ser de \< 25 minutos.

-   **Receptores multicadena:**
     Actualmente esta aplicación solo admite dianas de una sola cadena. Si quieres usar una diana multicadena, quizá puedas salir del paso modificando tu PDB de entrada para volver a etiquetar todas las cadenas de la diana como una sola cadena grande (eliminando los átomos de los extremos y las tarjetas TER). La renumeración solo es necesaria para resolver conflictos de numeración.

Salidas esperadas
================

La salida de una ejecución de hbs\_design es un archivo de puntuaciones (score.sc por defecto) y k estructuras de modelo (según lo especificado por la opción -nstruct y las demás opciones comunes de entrada y salida de Rosetta). La puntuación de cada modelo es la segunda columna del archivo de puntuaciones.

Posprocesamiento
===============

La selección de modelos debe hacerse ordenando por puntuación total, tomando el 5 % superior y ordenándolo por REPACK\_ENERGY\_DIFF en el archivo de puntuaciones.


##Véase también

* [[oop design | oop-design ]]: diseño de miméticos de la superficie de hélices con oligooxopiperazina, otro peptidomimético modelado por Rosetta
* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

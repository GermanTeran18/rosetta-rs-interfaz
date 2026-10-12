#Aplicación AnchoredPDBCreator

#####Metadatos

Autor: Steven Lewis (smlewi -- at -- gmail.com)

Código y documentación de Steven Lewis (smlewi -- at -- gmail.com).
El investigador principal fue Brian Kuhlman, (bkuhlman -- at -- email.unc.edu).

Ejemplos de ejecución y ubicación del código
============

El código está en `Rosetta/main/source/src/apps/public/interface_design/anchored_design/AnchoredPDBCreator.cc` ; hay una prueba de integración en `Rosetta/main/tests/integration/tests/AnchoredDesign/` . Hay una demo más extensa y con más documentación en `Rosetta/demo/protocol_capture/anchored_design` y  `Rosetta/demo/public/anchored_design`, que están en línea en TODO: añadir los enlaces a las demos en línea.

Referencias
==========

-   [Lewis SM, Kuhlman BA. Anchored design of protein-protein interfaces. PLoS One. 2011;6(6):e20872. Epub 2011 Jun 17.](http://www.ncbi.nlm.nih.gov/pubmed/21698112) (enlace a PubMed)

Propósito y algoritmo
=====================

AnchoredPDBCreator existe para crear los archivos iniciales de AnchoredDesign: toma un andamiaje, una diana y el ancla, y prepara una estructura inicial para AnchoredDesign. Está implementada por separado para que el usuario pueda examinar la estructura de entrada de AnchoredDesign.cc y diseñar su resfile, etc. con la numeración correcta.

Esta aplicación supone que tienes tres estructuras: un ancla y una diana en PDB separados, que están unidos entre sí respecto al mismo origen de coordenadas, y un PDB de andamiaje (el origen no importa). Por lo general, tu ancla y tu diana procederán de la misma estructura cristalina. El protocolo inserta la secuencia Y LAS COORDENADAS del ancla en un loop del andamiaje, y ejecuta una minimización rápida y burda para intentar que el andamiaje y la diana no choquen entre sí. No pretende producir estructuras de baja energía... solo estructuras lo bastante buenas como para ver su numeración al diseñar un resfile, etc. Intenta asegurar que el loop modificado tenga como máximo UNA rotura de cadena o un ángulo omega incorrecto (que puede arreglarse en un modelado de loops posterior). NO intenta evitar que el loop se superponga al andamiaje o a la diana; de nuevo, AnchoredDesign se ocupará de eso.

El caballo de batalla es protocols::pose_manipulation::insert_pose_into_pose. Este código inserta el ancla en el andamiaje e intenta el cierre del loop (en la práctica es un problema de inserción de dominio). La interacción con la diana ocurre dentro de AnchoredPDBCreator propiamente dicha.

Archivos de entrada
===========

Consulta test/integration/tests/AnchoredDesign/ para ver un ejemplo de uso.

AnchoredPDBCreator necesita tres PDB (el andamiaje para el diseño, la diana para la unión y un ancla derivada del antiguo compañero de unión de la diana) y una descripción de dónde insertar el ancla en la diana. Debes preparar el PDB del andamiaje eliminando los residuos que quieras que reemplace el ancla.

La especificación del loop del andamiaje es un archivo de una línea con cuatro valores delimitados por espacios en blanco: la letra de la cadena del andamiaje en la que quieres insertar, el inicio del loop en el que quieres insertar, el residuo tras el cual quieres que se inserte el ancla y el final del loop en el que quieres insertar. Por ejemplo:

`       B 18 23 30      `

Esto tratará de forma flexible el loop del andamiaje de 18-30, excepto el ancla. El ancla se insertará después de 23. Supongamos que el ancla tiene 4 residuos de largo y que los residuos 24-27 se eliminan del andamiaje. En este caso, los residuos PDB 18-23 y 28-30 se tratarán como un solo loop flexible con una porción constante en medio (el ancla). Si 24-27 existieran en el andamiaje, su numeración se desplazaría y el loop flexible resultante iría de 18 a 34.

Consejos
====

Necesitarás una cantidad saludable de muestreo. Yo uso 50 nstruct y 100,000 ciclos.

Limitaciones
===========

Por ahora, el PDB del ancla debe tener un mínimo de tres residuos (2 o 1 provocarán un bloqueo u otros errores extraños). Si en última instancia quieres un ancla más corta, no hay problema: usa aquí una longitud de 3 y luego dile a AnchoredDesign que es de solo 2, y mutará o moverá con gusto el residuo que no querías como parte del ancla. Pienso corregir este error algún día...

Opciones
=======

AnchoredPDBCreator define un pequeño puñado de opciones:

-   scaffold_loop - string - archivo con la ubicación del loop de ancla del andamiaje
-   scaffold_pdb - string - archivo pdb del andamiaje
-   anchor_pdb - string - archivo pdb del ancla
-   target_pdb - string - archivo pdb de la diana
-   APDBC_cycles - unsigned integer - número de ciclos en insert_pose_into_pose

También se respetan las opciones estándar del distribuidor de trabajos, como nstruct.

Salidas esperadas
================

El protocolo producirá nstruct estructuras de resultado con el ancla insertada en el andamiaje y el ancla alineada con la diana. Debes esperar que el loop del andamiaje que ahora contiene el ancla esté cerrado y en una conformación razonable. No debes esperar que la interfaz andamiaje/diana sea razonable (ni siquiera que no tenga choques; pueden solaparse). Generar la interfaz es, en cambio, tarea de AnchoredDesign.

El scorefile informará de LAM_total, que es la puntuación de Loop Analyzer Mover. Suma las puntuaciones de Ramachandran, omega, rotura de cadena y enlace peptídico de los residuos de los loops.

Posprocesamiento
===============

Esencialmente, lo único que importa de la calidad de los resultados es la calidad del cierre del loop; todo lo demás está pensado para que lo gestione AnchoredDesign. Para elegir un modelo para AnchoredDesign, ordena por LAM_total, examina el puñado de modelos de menor puntuación para ver cuál te gusta más y continúa.

Novedades desde la última versión
=============================

Rosetta 3.3 es la primera versión.

##Véase también

* [[AnchorFinder | anchor-finder ]]: localiza anclas plausibles en interfaces proteína-proteína (entradas para este protocolo).
* [[AnchoredDesign | anchored-design ]]: diseño propiamente dicho de las interfaces ancladas creadas por esta aplicación

* [[Aplicaciones de diseño | design-applications]]: otras aplicaciones de diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

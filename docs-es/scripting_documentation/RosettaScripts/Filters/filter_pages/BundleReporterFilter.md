# BundleReporter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*<br/>
Documentación añadida el 17 de julio de 2015 por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker.

## BundleReporter

BundleReporter escribe en el archivo de log todos los parámetros del haz helicoidal de un Pose generado paramétricamente (como los que se pueden crear con los movers **[[MakeBundle|MakeBundleMover]]** o **[[BundleGridSampler|BundleGridSamplerMover]]**).  Este filtro está pensado sobre todo como reportero, aunque también puede filtrar según la energía (como el **[[filtro ScoreType|ScoreTypeFilter]]**) si se desea.  Su comportamiento por defecto es escribir los parámetros del haz y devolver "true" (siempre pasa).

```xml
<BundleReporter name="(&string)" scorefxn="(&string)" score_type="('total_score' &string)" behavior="('ALWAYS_TRUE' &string)" threshold="(0.0 &Real)" report_sequence="(false &bool)" use_three_letter_code="(false &bool)" />
```
Las opciones de este filtro son:

-   **scorefxn**:  la función de puntuación que se usará para dar la puntuación de salida.  El usuario debe fijar esta opción o se producirá un error.
-   **score_type**:  el término de puntuación que se usará.  Por defecto se usa la función de puntuación completa ("total_score").
-   **behavior**:  este filtro tiene tres comportamientos de filtrado posibles.  Se puede configurar para que siempre pase ("ALWAYS_TRUE"), siempre falle ("ALWAYS_FALSE") o filtre según la puntuación ("FILTER").  Por defecto es "ALWAYS_TRUE".
-   **threshold**:  si behavior es "FILTER", las energías por encima de este valor hacen que el filtro falle (devuelva false).  Se ignora si behavior es "ALWAYS_FALSE" o "ALWAYS_TRUE".  Por defecto es 0.0.
-   **report_sequence**:  si es true, el informe incluye la secuencia del haz.  Por defecto es false.
-   **use_three_letter_code**:  si es true, la secuencia se informa como una serie de códigos de tres letras.  Por defecto es false (códigos de una letra).

## Uso sugerido

Este filtro puede ser útil cuando se quieren hacer ejecuciones de muestreo muy grandes con el **[[mover BundleGridSampler|BundleGridSamplerMover]]** para identificar regiones diseñables del espacio paramétrico, sin producir salida en PDB ni en silent file.  En ese caso, el protocolo podría ser algo como lo siguiente:

- Un **[[mover BundleGridSampler|BundleGridSamplerMover]]**, probablemente en modo nstruct, para generar la geometría inicial.
- Uno o más filtros para descartar las configuraciones de cadena principal que son obviamente "malas" (p. ej., con choques en la cadena principal).  Hasta aquí, el protocolo es computacionalmente muy barato.
- Uno o más movers de diseño (p. ej., [[FastDesign|FastDesignMover]], con la cadena principal fija).  Este es el paso relativamente caro desde el punto de vista computacional.
- Uno o más filtros para determinar si un diseño es "bueno".
- El filtro **BundleReporter** para informar los parámetros de los diseños que pasan los filtros, con el comportamiento "ALWAYS_FALSE" para que no se escriba ninguna estructura en disco.

El script esbozado arriba se podría ejecutar con las opciones ```-mute all``` y ```-unmute protocols.helical_bundle.BundleReporterFilter.REPORT```.  Estas opciones silencian toda la salida <i>excepto</i> los informes que genera el filtro, que resumen los parámetros del haz helicoidal de los diseños que pasan los filtros.

## Véase también:

* [[mover BundleGridSampler|BundleGridSamplerMover]]
* [[mover PerturbBundle|PerturbBundleMover]]
* [[mover MakeBundle|MakeBundleMover]]

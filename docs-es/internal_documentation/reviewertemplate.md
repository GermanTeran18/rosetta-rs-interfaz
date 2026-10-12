#Plantilla para revisores

Metadatos
=========

Autor: Andrew Leaver-Fay

Última edición de Andrew Leaver-Fay el 6 de abril de 2010.

Expectativas
============

¿Qué se espera que verifiques como revisor? Hay tres aspectos. El más fácil de describir y de realizar es determinar si la documentación se ajusta a la plantilla. También debes revisar la documentación en busca de mala gramática, errores ortográficos o frases poco claras. El último aspecto, el más difícil de describir y el que requiere más esfuerzo de tu parte, es determinar si la documentación presenta con claridad el propósito y la interfaz de una aplicación concreta.

-   Verificación estructural: indica si falta alguna sección de la plantilla de documentación o si no se cumple el propósito de esa sección. Está bien que la documentación incluya secciones adicionales, pero no está bien que falten las secciones de la plantilla. Consulta la plantilla [[Documentación de la aplicación AppName|app-name]] para ver la lista de todas las secciones obligatorias y su contenido esperado.
-   Verificación gramatical: ¿hay fragmentos de oraciones? ¿El autor se queda a medio pensamiento? No te contengas al corregir la redacción; cuanto más clara sea la redacción, mejor será la documentación. Un par de ojos nuevos puede encontrar errores que el autor original no es capaz de ver.
-   Verificación de contenido:
    -   ¿Está claro el propósito de la aplicación?
    -   ¿Son evidentes sus limitaciones?
    -   Si forma parte de un pipeline, ¿se hace referencia a las demás partes del pipeline?
    -   ¿Se introducen los conceptos antes de usarlos?
    -   ¿Están claros los efectos de incluir o excluir las opciones relevantes?
    -   ¿Describe el autor qué opciones deberían estar normalmente activadas y por qué?
    -   ¿Se destacan las características personalizables del protocolo, p. ej., si el usuario quiere proporcionar un archivo de puntuación nuevo o un conjunto de archivos de puntuación?
    -   Si hay varias formas de controlar el alcance del muestreo (p. ej., rotámeros de cadenas laterales, flexibilidad de la cadena principal, modelado de loops, refinamiento local frente a docking a gran escala), ¿se describen a fondo? ¿Describe el autor el alcance de muestreo recomendado? ¿Describe el autor cuándo se requiere más o menos muestreo?
    -   ¿Está claro cuánto tiempo de CPU se esperaría para terminar una tarea típica, p. ej., 100 horas de CPU para un embudo de docking fiable?
    -   ¿Se describen todos los formatos de archivo relevantes o se enlazan mediante el comando ATref?
    -   ¿Se proporcionan enlaces a otras aplicaciones o modos de funcionamiento relevantes, p. ej., la definición del archivo de parámetros de un ligando?
    -   ¿Están completas las referencias?
    -   ¿Funcionan los ejemplos de «pruébame»? (Se espera que los ejecutes.)
    -   ¿Se describen con claridad las salidas de los ejemplos de «pruébame»? ¿Tienen sentido las salidas?
    -   ¿Ha proporcionado el documentador un conjunto de salidas esperadas (p. ej., un archivo de puntuaciones de una ejecución grande de abrelax) y ha descrito cómo se deben juzgar las salidas (p. ej., comandos de gnuplot para generar gráficos de puntuación frente a RMS)? ¿Se describen a fondo los pasos de posprocesamiento esperados (p. ej., agrupamiento)?
    -   Referencias al código: ¿hay enlaces a las clases principales y a su documentación? Verifica que la página dox de las clases principales sea razonablemente exhaustiva; no se espera que revises la documentación de las clases, sino que verifiques que exista.

Producto final de la revisión
=============================

Tu revisión debe incluir las tres secciones siguientes, en este orden:

-   Veredicto de aprobado o rechazado sobre si la documentación está completa. Emite un veredicto de aprobado solo si no hay deficiencias estructurales ni problemas de contenido. Si los únicos problemas son de ortografía o gramática, se puede emitir un veredicto de aprobado.
-   Comentarios principales. ¿Hay secciones poco claras o ausentes?
-   Comentarios menores. Los detalles. Agrega aquí todos los detalles que puedas; tus comentarios son sumamente útiles.

Envía tu revisión, junto con el tiempo que te llevó, al editor y a tu investigador principal, para que tu investigador principal sepa cuánto trabajo ha invertido su laboratorio en el proceso de revisión. El editor reenviará tu revisión al documentador. Puede que se te contacte de nuevo para terminar la revisión de esta aplicación, o que otra persona de otro laboratorio reciba una ronda de revisión posterior.

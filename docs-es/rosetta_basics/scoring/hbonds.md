#Término de energía de enlaces de hidrógeno

**TODO: esta página está desactualizada y necesita que la actualice alguien familiarizado con el tema.**

El término de energía de enlaces de hidrógeno identifica y puntúa los enlaces de hidrógeno.

Metadatos
========

Este documento fue escrito por Matthew O'Meara el 18/6/2008


HBEvalType
==========

Cada enlace de hidrógeno tiene un HBEvalType que identifica de qué tipo es. Todos los enlaces de hidrógeno de un mismo tipo se tratan de la misma manera. Si se quisiera separar una clase de enlaces de hidrógeno para que tenga un comportamiento distinto, habría que crear un nuevo HBEvalType.

Descripción general
========

Para usar el término de energía de enlaces de hidrógeno hay tres pasos conceptuales. Primero, identificar todos los enlaces relevantes; segundo, clasificar los enlaces de hidrógeno según su tipo químico, su entorno, los enlaces de hidrógeno de fondo, etc.; y tercero, puntuar los enlaces de hidrógeno.

Identificación
==============

El objetivo del paso de identificación es crear un objeto HBondSet que contenga exactamente los enlaces de hidrógeno de interés. Si contiene demasiados, habrá que filtrarlos más adelante; si no contiene suficientes, habrá que encontrar más después, cuando todo eso debería ocurrir en este paso.

-   Crear un nuevo HBondSet para recibir los enlaces de hidrógeno identificados. Pasar o fijar las opciones de hbond para hbond\_set. Llamar a fill\_hbond\_set excluyendo los enlaces de hidrógeno no deseados para llenar hbond\_set.
-   Extraer una parte de un HBondSet existente, por ejemplo de pose.energies().data().get( HBOND\_SET ).
-   Crear un HBondSet dando explícitamente los residuos donador y aceptor con identify\_hbonds\_1way.

Clasificación
==============

Actualmente los enlaces de hidrógeno se clasifican en cadena principal/cadena lateral, proteína-ADN / genérico, y por el tipo de hibridación del aceptor (sp2, sp3, anillo). Estos tipos se refinan según la separación en la secuencia. Para los enlaces que involucran cadenas principales de proteínas, esto indica la estructura secundaria. Los enlaces de hidrógeno cadena principal-cadena lateral se dividen en de corto alcance y de largo alcance.

Los enlaces de hidrógeno se clasifican con hbond\_evaluation\_type() en hbonds\_geom.cc

Evaluación
==========

Actualmente la evaluación de los enlaces de hidrógeno sigue lo descrito en

Kortemme, T., A. V. Morozov and D. Baker (2003). "An orientation-dependent hydrogen bonding potential improves prediction of specificity and structure for proteins and protein-protein complexes." J Mol Biol 326(4): 1239-59.

Jack Snoeyink la ha reimplementado como una evaluación polinómica eficiente.

La evaluación de la derivada sigue lo descrito en

Wedemeyer, W., Baker, D., "Efficient minimization of angle-dependent potentials for polypeptides in internal coordinates", Proteins: Structure, Function, and Bioinformatics Volume 53 Issue 2, Pages 262-272

Definición de enlace de hidrógeno
==============================

Un donador de enlace de hidrógeno y un aceptor de enlace de hidrógeno se consideran unidos por un enlace de hidrógeno si contribuyen favorablemente a la energía global.

Nota: si hay un enlace de hidrógeno cadena principal-cadena principal, ni el residuo donador ni el aceptor pueden participar en un enlace de hidrógeno cadena principal-cadena lateral. Según Brian Kuhlman, esto se introdujo en los primeros tiempos de Rosetta porque el término de energía de enlaces de hidrógeno de entonces favorecía en exceso las serinas en las hélices, ya que formaban enlaces de hidrógeno cadena principal-cadena principal para la hélice y enlaces cadena principal-cadena lateral fuera de la hélice.

Refactorización y plan de mejoras
====================================

1) Mover las opciones a la clase HBondOptions

2) Usar emap para asignar las energías de los enlaces de hidrógeno

3) Poner en los HBondSets solo los enlaces de hidrógeno que realmente sean relevantes (en lugar de filtrar cuando se usan)

4) Fusionar el código de enlaces de hidrógeno no proteína/no ADN con el resto del código de enlaces de hidrógeno.

5) Crear nuevos HBEvalTypes para poder manejar de manera uniforme la evaluación y la asignación de energía

6) Limpiar los archivos de cabecera

7) Añadir una prueba unitaria de hbond para la evaluación de la energía sobre un rango de parámetros geométricos

8) Añadir documentación doxygen para el código de hbond

Planes:

1) Crear nuevos HBEvalTypes basados en el grupo funcional del donador y el aceptor y en la estructura secundaria para los enlaces cadena principal-cadena principal de proteínas.

2) Implementar polinomios 1D mejorados para los nuevos tipos.

3) Añadir la dependencia fuera del plano «chi» como una cuarta dimensión geométrica

5) Implementar funciones de evaluación para distribuciones con parámetros acoplados.

##Véase también


* [[Rosetta overview]]
* [[Units in Rosetta]]: describe las unidades de energía de Rosetta
* [[Scoring explained]]
* [[Funciones de puntuación y términos de puntuación|score-types]]
* [[Términos de puntuación adicionales|score-types-additional]]
* [[Funciones de puntuación para residuos y moléculas no canónicos|NC-scorefunction-info]]

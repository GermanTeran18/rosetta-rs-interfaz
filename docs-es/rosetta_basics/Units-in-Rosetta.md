Unidades en Rosetta
================

Esta es una descripción de cómo maneja Rosetta las distintas unidades. A diferencia de algunos paquetes de mecánica molecular, Rosetta no tiene necesariamente un sistema de unidades fijo. Distintas partes de Rosetta pueden usar unidades diferentes para las mismas magnitudes, según su aplicación y uso subyacentes. 

Distancia
========

La unidad de distancia más común en Rosetta es el ångström (1x10^-10 metros, o 0.1 nm), salvo que se especifique otra cosa.

Ángulos
======

La mayor parte de los usos de medidas angulares de cara al usuario son en grados. Sin embargo, internamente en algunas partes de Rosetta se usan medidas en radianes, por lo que, según el protocolo, es posible que las medidas angulares de entrada y salida estén en radianes. En particular, las restricciones de ángulo y de diedro (incluida su especificación en los archivos de restricciones de entrada) se especifican en radianes.

Tiempo
====

Como Rosetta usa principalmente procedimientos Monte Carlo que no se basan en pasos de tiempo, en Rosetta no existe un concepto de paso de tiempo intrínseco, como ocurre en las aplicaciones basadas en mecánica molecular. La aplicación más común del tiempo en Rosetta es representar los tiempos de ejecución de los protocolos, que normalmente se miden en segundos, salvo que se especifique otra cosa.

Masa
====

En Rosetta la masa se especifica con poca frecuencia. Cuando se hace, suele darse en unidades de masa atómica (u.m.a.).

Energía
======

Como la función de energía de Rosetta es una combinación de potenciales basados en la física y basados en estadísticas, **no intenta corresponderse con unidades físicas reales de energía** (p. ej., kcal/mol o kJ/mol). Las energías de Rosetta están en una escala arbitraria, a veces denominada REU (por «Rosetta Energy Unit», unidad de energía de Rosetta).

Además, Rosetta emplea una mezcla de funciones de energía distintas, que varían según el nivel de detalle del muestreo. Por ejemplo, muchos protocolos usan una representación «centroid» de grano grueso de las proteínas para acelerar el muestreo de las etapas tempranas. Las funciones de energía usadas con esta representación de grano grueso son necesariamente distintas de las usadas para el muestreo con todos los átomos. En la práctica es difícil calibrar los valores de una función de energía de grano grueso frente a los de la función de energía de todos los átomos, por lo que no se intenta hacer coincidir los valores de ambas funciones de energía. Lo mismo se aplica incluso a las distintas funciones de energía de todos los átomos usadas para protocolos diferentes, de modo que **un «REU» de un protocolo puede no ser comparable a un «REU» de otro protocolo**.

La única coherencia entre las funciones de energía es que las estructuras con menores energías se consideran mejores que las estructuras con mayores energías. Así, aunque los valores absolutos de las energías de Rosetta no son necesariamente comparables entre protocolos, las energías dentro de cada protocolo sí deberían ser comparables entre sí.

Teniendo en cuenta estas salvedades, en muchos casos es posible derivar una conversión de los valores de energía producidos por Rosetta a valores experimentales absolutos en kcal/mol o kJ/mol. El enfoque consiste en ejecutar el protocolo concreto que quieres usar con un conjunto de casos de benchmark con energías experimentales conocidas. A partir de estos puntos de datos puedes derivar una recta de mejor ajuste entre los valores experimentales y los valores producidos por Rosetta, que da un factor de conversión. (Véase [Kellogg et al.](http://www.ncbi.nlm.nih.gov/pubmed/21287615) para un ejemplo.) Cuando se producen estas conversiones, casi siempre son lineales, aunque los valores de la pendiente y de la ordenada en el origen pueden variar según el protocolo y la magnitud exacta que se mida.

Temperatura
===========

Casi siempre que en Rosetta se habla de «temperatura», no se trata de la verdadera temperatura termodinámica (en kelvin), sino del equivalente de kT (la constante de Boltzmann por la temperatura) en la unidad de energía de Rosetta correspondiente. Es decir, es el denominador del exponente del factor de Boltzmann en unidades de REU. 

##Véase también

* [[Analyzing Results]]: Consejos para analizar resultados en Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Funciones de puntuación y términos de energía|score-types]]
* [[Solving a Biological Problem]]: Guía para aplicar Rosetta a tu problema biológico

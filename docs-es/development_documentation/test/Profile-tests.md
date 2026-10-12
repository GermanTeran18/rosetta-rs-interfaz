#Pruebas de perfil

Las pruebas de perfil (profile tests) de Rosetta son un sistema para seguir tanto el tiempo de ejecución como el uso de memoria a escala de aplicación.
Las pruebas de perfil, que viven en `Rosetta/main/source/tests/profile/`, eran muy parecidas a las [[pruebas de integración|integration tests]], salvo que probaban el tiempo de ejecución y el uso de memoria en lugar de la salida real.
Al seguir el pico de uso de memoria y el tiempo de CPU a lo largo de las revisiones, los desarrolladores podían ver si el código se volvía más o menos eficiente y también si una aplicación tiene una fuga de memoria (si el consumo de memoria aumenta con el tiempo, es una señal segura de que la aplicación no libera bien la memoria en cada iteración). Por esto último se recomienda que las pruebas de perfil ejecuten al menos unas cuantas iteraciones del protocolo.

En general, para cada nueva aplicación de Rosetta se debe añadir una nueva prueba de perfil.

##Véase también
* [[Volver a las pruebas de Rosetta|development_documentation/test/rosetta-tests]]

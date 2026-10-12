#Guía para desarrollar en Rosetta

Metadatos
=========

Autor: Kristian Kaufmann

última modificación: 11/08/2008

Esta guía está en construcción. Algunas de las páginas son bastante útiles; otras aún necesitan mucho trabajo.

Resumen
=======

Esta guía está escrita para presentar a un desarrollador nuevo las herramientas útiles y las prácticas esperadas al desarrollar Rosetta. Esta guía no enseña a programar en C++. Consulta otras fuentes para aprender C++. La guía acompaña al lector en los siguientes temas

-   Uso de subversion, el sistema de control de versiones
-   Navegación por la estructura de la biblioteca de Rosetta
-   Escribir una aplicación sencilla y documentar el código con Doxygen.
-   Documentar con Doxygen
-   Compilar la biblioteca y las aplicaciones de Rosetta con SCons
-   Ejecutar y escribir pruebas unitarias, de integración, de rendimiento y científicas
-   Procedimientos para hacer commit de tu código con éxito sin romper la compilación ni las pruebas unitarias y de integración.

Uso de subversion, el sistema de control de versiones
=====================================================

**Ya no usamos Subversion**

La guía de uso de Subversion en la línea de comandos incluida en este manual contiene un subconjunto de estos comandos, presentados en un orden que podría necesitar un desarrollador nuevo. Subversion es un sistema de control de versiones muy usado y fácil de aprender. Para una visión en profundidad de subversion, consulta el manual de subversion en línea en [http://svnbook.red-bean.com](http://svnbook.red-bean.com) . Se han desarrollado varios clientes de svn, entre ellos algunas interfaces gráficas muy fáciles de usar; véase [http://subversion.tigris.org/links.html\#clients](http://subversion.tigris.org/links.html#clients) . La RosettaWiki https://wiki.rosettacommons.org/index.php/Tools:Subversion contiene una página extensa sobre el uso de subversion con varios ejemplos de muchos comandos de subversion.

Navegación por la estructura de la biblioteca de Rosetta
========================================================

La biblioteca de Rosetta contiene cinco directorios de nivel superior que todo desarrollador debe conocer. Se pueden encontrar descripciones más detalladas de cada uno de estos directorios en [[Guía de la estructura de la biblioteca de Rosetta|rosetta-library-structure]] y en los enlaces posteriores.

-   src/ El directorio src contiene todos los archivos fuente de la biblioteca de Rosetta.
-   test/ El directorio test contiene archivos fuente y scripts de las pruebas unitarias, de integración y científicas que se usan para verificar que la biblioteca de Rosetta funciona correctamente.
-   bin/ El directorio bin contiene enlaces simbólicos a todas las aplicaciones de Rosetta.
-   tools/ El directorio tools contiene los archivos del Builder personalizado de SCons para la biblioteca de Rosetta.
-   demo/ El directorio demo está pensado para contener archivos para ejecutar casos de prueba o demostraciones de aplicaciones concretas.

Escribir una aplicación sencilla y documentar el código con Doxygen.
====================================================================

Uno de los principales objetivos de diseño de Rosetta es que escribir aplicaciones nuevas y ampliar protocolos existentes sea fácil. Esta sección pretende mostrar a un desarrollador cómo escribir una aplicación nueva con un protocolo nuevo. Se guiará al lector a lo largo del proceso de

-   escribir un Mover nuevo
-   escribir una aplicación nueva que use el Job Distributor y el nuevo Mover.

Después de leer la página [[Escribir una aplicación de Rosetta|writing-an-app]], el lector debería poder escribir su propia aplicación de Rosetta.

Documentar con Doxygen
======================

Rosetta usa Doxygen para producir documentación. [[Consejos para escribir documentación con Doxygen|doxygen-tips]] ofrece información útil para aprovechar al máximo Doxygen

Compilar la biblioteca y las aplicaciones de Rosetta con SCons
==============================================================

[[Guía de uso de SCons para compilar Rosetta|Build-Documentation]] muestra algunas funciones sencillas del sistema de compilación, seguidas de una discusión más detallada sobre la estructura del sistema de compilación y cómo se puede ampliar. Rosetta usa un builder personalizado de SCons. El builder permite varias configuraciones de compilación.

Ejecutar y escribir pruebas unitarias, de integración, de rendimiento y científicas
===================================================================================

[[Guía para ejecutar y escribir pruebas para Rosetta|rosetta-tests]] guía al lector en la ejecución de cada uno de estos conjuntos de pruebas y en la escritura de una prueba en cada una de estas categorías. Rosetta tiene 4 conjuntos de pruebas. Las pruebas unitarias comprueban funciones concretas de la biblioteca de Rosetta. Las pruebas de integración siguen el comportamiento de las aplicaciones en casos individuales. Las pruebas de rendimiento monitorean la velocidad de las aplicaciones de Rosetta. Las pruebas científicas monitorean el comportamiento de las aplicaciones de Rosetta a una escala mayor que las pruebas de integración y con objetivos definidos científicamente.

Procedimientos para hacer commit de tu código con éxito sin romper la compilación ni las pruebas unitarias y de integración.
============================================================================================================================

La página enlazada es muy escueta, pero básicamente correcta. Se irá ampliando con el tiempo. [[Lista de cosas que debes comprobar en tu código antes de hacer commit en svn|before-commit-check]] pretende mostrar al lector los pasos que minimizan la probabilidad de que un commit rompa la compilación o las pruebas. Hacer commit de tu código en el trunk de Rosetta puede ser un proceso arriesgado: casi todos los desarrolladores de Rosetta que conozco han hecho commit alguna vez de código que rompió Rosetta.

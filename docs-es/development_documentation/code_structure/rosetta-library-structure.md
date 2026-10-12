#Guía de la estructura de la biblioteca de Rosetta

El directorio `rosetta/main/source` contiene ocho directorios de nivel superior que todo desarrollador debe conocer.

-   `src/` El directorio src contiene todos los archivos fuente de la biblioteca de Rosetta. Consulta [[Una página de resumen del directorio src de Rosetta|src-index-page]] para más información.
-   `test/` El directorio test contiene los archivos fuente de las pruebas unitarias de Rosetta. Las pruebas de integración y las pruebas científicas ahora viven en rosetta/main/tests. En conjunto, estos dos grupos de pruebas se usan para verificar que la biblioteca de Rosetta funciona correctamente. Consulta [[Una guía para ejecutar y escribir pruebas de Rosetta|rosetta-tests]] para más información sobre las pruebas de Rosetta.
-   `bin/` El directorio bin contiene enlaces simbólicos a todas las aplicaciones de Rosetta. Actualmente se guardan enlaces simbólicos separados para cada combinación de sistema operativo (linux, macos), compilador (gcc, icc) y modo de compilación (debug, release, release_debug). Consulta la página de [[documentación de compilación|build documentation]] para más información sobre el sistema de compilación.
-   `build/` El directorio build es donde se guardan todos los archivos objeto y las bibliotecas compartidas de la configuración de compilación. La estructura de directorios la crea automáticamente el sistema de compilación scons. Consulta la página de [[documentación de compilación|build documentation]] para más información sobre el sistema de compilación.
-   `scripts/` El directorio scripts es la ubicación recomendada para todos los archivos XML de RosettaScripts (en el subdirectorio rosetta_scripts) y los scripts de Python con fines científicos (en el subdirectorio python). Las aplicaciones privadas de PyRosetta también se colocan en este directorio.
-   `doc/` El directorio doc [[contuvo en su día|History-of-Rosetta-documentation]] todas las páginas independientes de doxygen. Esas páginas son ahora este wiki (el repositorio de documentación). Todavía contiene una página autogenerada con información del sistema de opciones.
-   `tools/` El directorio tools contiene los archivos del Builder personalizado de SCons para la biblioteca de Rosetta. Consulta la página de [[documentación de compilación|build documentation]] para más información sobre el sistema de compilación.
-   `demo/` El directorio demo contenía antes demos (ahora en el repositorio de demos).
##Véase también

* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores

<!--- SEO
code structure
code structure
code structure
code structure
library structure
library structure
library structure
library structure
--->

#Lista de cosas que debes comprobar en tu código antes de fusionar en master

Resumen
=======

Esta guía refleja nuestra política actual para las bibliotecas core/protocols/devel y el código de pruebas unitarias. Asegúrate de comprobar lo siguiente antes de fusionar código en master.

Código fuente

**NOTA**: Ahora es obligatorio que todos los cambios se envíen como [[pull requests]] y que los apruebe un segundo miembro de la comunidad. Todas las recomendaciones siguientes siguen aplicándose.

-   Se espera que el código enviado esté documentado al menos brevemente. Usa la etiqueta de comentario doxygen 'brief' para los archivos .hh y la etiqueta 'details' para la documentación del código de los archivos .cc. La documentación de las aplicaciones debe colocarse en esta wiki (consulta la página [[How to write documentation]] para más detalles).
-   En general, no debes usar el tipo estándar 'float' de C++; usa core::Real en su lugar.
-   No hagas commit de código que contenga salida directa a los flujos std::cout/cerr en las bibliotecas core/protocols/devel ni en las pruebas unitarias. Usa core::util::Tracer en su lugar.
    -   *A menos que* planees terminar el programa de forma anormal (es decir, utility\_exit(...)) debido a un error grave. En ese caso puedes usar la salida cerr para dar información adicional en tus mensajes de error.

-   Usa tabuladores en lugar de espacios para la sangría y elimina los espacios en blanco al final de las líneas. Asegúrate también de seguir las demás [[Coding Conventions]], como eliminar las sentencias "using" de los archivos de cabecera.

Compilación

-   Prueba tu compilación antes de hacer commit. (Sustituye '-j8' por un número adecuado para tu sistema, es decir, el número de procesadores).
    -   Prueba la compilación de la biblioteca. Ejecuta 'scons -j8'.
    -   Prueba que se compile la compilación de las pruebas unitarias. Ejecuta 'scons -j8 cat=test' y asegúrate de que todo compila.
    -   Prueba la compilación de bin y pilot\_apps\_all. Ejecuta 'scons -j8 bin pilot\_apps\_all'.

-   Asegúrate de que todo compila y de que tu modificación no produjo advertencias de compilación.

Pruebas unitarias

-   [[Run unit test]] *antes* de hacer commit de cualquier código, y asegúrate de que tus modificaciones no rompieron ninguna prueba.

-   Si tus cambios rompen pruebas, arréglalas después de asegurarte de que los resultados son correctos. Si no puedes arreglar alguna de las pruebas o no estás seguro de que los resultados sean correctos, contacta al desarrollador responsable de esa prueba y pídele ayuda.

Pruebas de integración

-   Ejecuta las [[integration tests]] *antes* de hacer commit de cualquier código.
Ten en cuenta que tu código debe compararse con los resultados de ejecutar las pruebas de integración en la misma revisión del código sin tus cambios. Al igual que con las pruebas unitarias, consulta a otros desarrolladores si los resultados de las pruebas no coinciden.

Después del commit

* Compila una versión independiente de Rosetta (p. ej., en otra máquina o en otro directorio) para asegurarte de que compila y se ejecuta correctamente. Esto es especialmente importante si agregaste un archivo, porque, si no te acuerdas de agregarlo con git, puede que solo esté disponible en tu copia de Rosetta.

Puedes encontrar información adicional sobre nuestra guía de programación actual [[aquí|Coding-Conventions]]

Información sobre las pautas de comentarios (TODO: ¿cómo se accede siquiera a esta página?): [[https://www.rosettacommons.org/internal/doc/Rosetta++CommentingGuidelines.html]]

##Véase también

* [[Pull requests]]
* [[GithubWorkflow]]
* [[RosettaAcademy]]
* [[Development documentation]]

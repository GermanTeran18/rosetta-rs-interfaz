#Consejos para escribir documentación con doxygen

El extenso manual de Doxygen ( <https://www.doxygen.nl/manual/> ) merece mucho la pena para echarle un vistazo. Doxygen ofrece una amplia variedad de opciones para documentar código y también se puede adaptar para documentación general. Esta página te guiará por algunas de las funciones de uso habitual en la documentación de Rosetta3.

[[_TOC_]]

Páginas de plantilla de Doxygen disponibles
===========================================

Se han creado algunas páginas generales de plantilla de doxygen para ayudarte a documentar conceptos de nivel más alto en Rosetta. Estas páginas están pensadas como puntos de partida. En el nivel más simple, puedes copiarlas a una ubicación adecuada y rellenar los campos con la información correspondiente. Cada una de las siguientes páginas de plantilla se encuentra en doc/template\_doxygen\_pages.

-   Página de plantilla de Doxygen para una nueva categoría de archivos fuente
-   Página de plantilla para subdirectorios de bibliotecas
-   [[Página de plantilla de Doxygen para documentar una aplicación|template-app-documentation-page]]

Escribir comentarios descriptivos en Doxygen
============================================

Los bloques de comentarios de Doxygen son fáciles de crear. Para un comentario de una línea, basta con insertar una barra diagonal triple.

`       /////This line will be included in the Doxygen comments for this function/class/file      `

Comentar varias líneas es igual de fácil.

```
/*! 
These next few lines will form a comment block    
To start a new paragraph add an empty line    
To end the comment block type asterik and then forward slash. 
*/
```

Si dedicas unos minutos mientras escribes tu código a escribir bloques de comentarios, puedes decirles a los futuros desarrolladores qué pretendías y hacer su vida más productiva y fácil.

Etiquetas habituales de Doxygen
===============================

Etiquetas habituales de documentos fuente
-----------------------------------------

`@brief`

Esta etiqueta proporciona una descripción breve de una función para las páginas de doxygen. Este mensaje debe decir qué ocurre en la función. Por convención en Rosetta3, todas las funciones deben tener etiquetas brief. Estas se incluyen en el archivo de encabezado junto con la declaración de las funciones.

`@details`

Esta etiqueta proporciona una descripción más detallada. Este mensaje debe dar al usuario una idea de cuándo es válido llamar a esta función (es decir, qué debe cumplirse para que la función funcione), cómo la función lleva a cabo su tarea y qué será cierto cuando la función regrese. Por convención en Rosetta3, todas las funciones deben tener etiquetas details. Estas se colocan junto con la definición de la función.

`@param`

Esta etiqueta se puede usar para documentar el propósito y el significado de los parámetros de las funciones. Puedes especificar la naturaleza del parámetro como de entrada, de salida o ambos de la siguiente manera

`       @param[in]      `

`       @param[out]      `

`       @param[in/out]      `

`@class`

Esta etiqueta informa a doxygen de que el bloque de comentarios debe asociarse a la clase. Este bloque debe explicar el propósito de la clase, las consideraciones de diseño y la relación con otras clases. Proporciona también cualquier información que otros programadores puedan encontrar útil para usar las clases.

`@example`

Esta etiqueta te permite insertar fragmentos de código que luego se reúnen en la página de ejemplos. De esta forma puedes decirle a la gente cómo usar tu código directamente en el archivo con la definición de tu clase.

`@return`

Esta etiqueta te permite describir lo que devuelve la función.

Etiquetas habituales de páginas de Doxygen
------------------------------------------

`@page`

Esta etiqueta indica a Doxygen que esta es una página independiente y permite a doxygen darle nombre para que otras páginas puedan hacer referencia a ella y enlazarla.

`       @page describing_awesome_mode_by_james This Page describes James' Awesome Mode      `

La primera palabra después de @page es la palabra que habrá que escribir en un comando @ref para enlazar la página. Doxygen sustituirá cualquier referencia a la página por la cadena que aparece después de la palabra. Así, en el caso anterior, Doxygen sustituiría "describing\_awesome\_mode\_by\_james" por "This Page describes James' Awesome Mode" en la documentación generada. Generalmente, al menos en html, los enlaces se muestran en azul. Ten en cuenta que he tenido problemas al incluir letras mayúsculas en la "palabra" que da nombre a la página. A veces funciona como se describe arriba, pero otras veces no consigue sustituir la "palabra" por la "cadena" en los enlaces desde otras ubicaciones.

`@ref`

Este comando indica a Doxygen que inserte en esta sección un enlace a la página especificada. Así, siguiendo con el comando @page anterior, si quisiera insertar un enlace a la página que describe el modo genial de James, escribiría

`       ///// @ref describing_awesome_mode_by_james      `

`@image`

Una imagen a veces vale más que mil palabras, o eso dice el refrán, al menos. Esta etiqueta permite insertar una imagen en la documentación. Doxygen requiere distintos formatos de imagen para los distintos tipos de salida. A continuación muestro cómo insertar imágenes de modo que aparezcan tanto en html como en pdfs generados con latex. Ten en cuenta que los archivos de imagen deben colocarse en una ubicación reconocida por Doxygen. Esto se fija con la variable IMAGE\_PATH del archivo de Doxygen. Actualmente se indexa doc/images. Por lo tanto, colocar los archivos de imagen en esa ubicación debería permitir que Doxygen los encuentre.

`       ///// @image html special_image.png      `

`       ///// @image latex special_image.eps "Special Image label" width=5cm      `

`@section`

`@subsection`

A menudo es útil dividir una página de doxygen en secciones y subsecciones. Esto tiene dos propósitos. Uno, crea encabezados. Dos, se pueden crear referencias a través de la página para enlazar a la sección. Esta página usa secciones y enlaces a secciones. La lista de secciones al principio de la página se implementa con el comando @section. De manera similar al comando @page, se puede proporcionar un nombre de enlace y una cadena.


`       ///// @section common_doxygen_tags_used Common Doxygen Tags      `

`       ///// @subsection common_page_tags Common Doxygen Page Tags      `

Compilar la documentación
=========================

Si doxygen está en tu path, simplemente ejecuta el comando

`       doxygen      `

desde dentro del directorio rosetta/main/source/. Ten en cuenta que la configuración por defecto de Doxygen tarda horas en compilar. Si solo quieres compilar las páginas de Doxygen del directorio doc, haz la siguiente sustitución en el Doxyfile del directorio principal de mini. de

`       INPUT = src demo doc      `

a

`       INPUT = doc      `

Esto indica a Doxygen que solo indexe los archivos de doc.

##Véase también

* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Sitio web de Doxygen (enlace externo)|http://www.doxygen.com]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos de Rosetta.
* [[Glossary]]: Definiciones breves de términos de Rosetta

Documentación de Rosetta
=====================

##Documentación de las aplicaciones de Rosetta.

**Para editar esta documentación en vivo, ve al sitio oficial (actual) <https://www.rosettacommons.org/docs/wiki/>**

(Inicia sesión con tu cuenta de GitHub).

Aunque técnicamente se puede clonar y modificar este repositorio, hacerlo está sujeto a conflictos de fusión con las ediciones del sitio en vivo.

Reserva el acceso directo con git al repositorio para usos que no se puedan hacer mediante la interfaz del wiki en vivo (por ejemplo, subir imágenes y ediciones por lotes).

### Servir una versión local

Puedes alojar una versión local del servidor de documentación.

Instala el servidor de wiki gollum siguiendo las instrucciones [aquí](https://github.com/gollum/gollum/wiki/Installation).
También tendrás que instalar las extensiones github-markdown (normalmente `gem install github-markdown`).

Desde el directorio de la documentación, inicia el servidor gollum con el siguiente comando

    gollum --h1-title --config rosetta_gollum_config.rb --port 7364

Luego apunta tu navegador web a la siguiente URL: <http://localhost:7364>  

Los miembros de RosettaCommons pueden obtener más información [aquí](https://wiki.rosettacommons.org/index.php/Local_Gollum).

##Markup
Gollum admite dos tipos de marcado de enlaces: `[[text like this|link target]]` (MediaWiki invertido) y `[text like this](link target)`.  Se prefiere el primero: el segundo parece un enlace completo sea válido o no, pero el primero aparecerá en rojo si el destino no existe.

El wiki tiene un backend de git para los diffs.
Es mejor intentar separar las oraciones con saltos de línea, para que los diffs de git funcionen con la máxima eficiencia. 
Las oraciones que terminan en ". " se concatenan como parte de un mismo párrafo en el HTML.
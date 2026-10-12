ResourceManager
===============

El ResourceManager facilita el acceso a recursos de datos externos desde
dentro de un protocolo. Junto con el distribuidor de trabajos de un protocolo, el
ResourceManager gestiona el ciclo de vida de los datos: desde su obtención con un
ResourceLocator, su inicialización con un ResourceLoader
y su uso a través de la interfaz del ResourceManager, hasta su
liberación cuando ya no se necesitan. El ResourceManager también
facilita especializar el OptionSystem para trabajos concretos.

Puedes encontrar más documentación en [[ResourceManager Details]].

ResourceLocator
===============

Un **ResourceLocator** se encarga de acceder a un recurso dentro de
un almacén de datos, como un archivo, una base de datos o un flujo de serialización. Una vez
inicializado, un ResourceLocator actúa como una correspondencia entre **LocatorTag** y
**ResourceStream**, donde el tipo LocatorTag representa un identificador
del recurso dentro del almacén de datos y es un *typedef* de
*string*. El *ResourceStream* es un contenedor de un **std::istream**.

FileResourceLocator
-------------------

El LocatorTag del FileResourceLocator representa el nombre de archivo y el
ResourceStream representa el contenido del archivo.

ResourceLoader
==============

Un '*ResourceLoader* se encarga de construir un objeto Resource
a partir de una instancia de ResourceStream y una instancia de
ResourceOptions.

PoseFromPDBLoader
-----------------

Crea un objeto Pose a partir de un archivo PDB.

LoopsFileLoader
---------------

Crea un LoopsFileData a partir de un LoopsFile.

Interfaz
========

(Pendiente de documentar.)

##Véase también

* [[ResourceManager Details]]
* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[Application Documentation]]: Información sobre las aplicaciones existentes de Rosetta
* [[RosettaScripts]]: Instrucciones para escribir RosettaScripts, la interfaz XML de Rosetta
* [[Uso del distribuidor de trabajos|jd2]]
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos de Rosetta.
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta


<!--
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager -->

#Cómo escribir nuevos comandos de resfile

Autor: Steven Lewis

Esta página describe cómo añadir nuevos comandos al resfile en Rosetta. Un comando es un objeto con un método que hará cambios en el PackerTask para UN solo residuo a la vez.

El lector de resfiles analiza cada registro en fragmentos de información separados por espacios en blanco e intenta hacerlos coincidir con un grupo de comandos disponibles (que deben conocerse en tiempo de compilación). Luego pasa la información necesaria a una instanciación de un objeto de comando, que aplica lo que se supone que el comando debe hacer.

En cuanto a los detalles de codificación, las interfaces son las siguientes:

-   Los objetos de comando deben declararse en ResfileReader.hh y heredar de la clase ResfileCommand que está al principio de ese archivo. La implementación probablemente debería residir en ResfileReader.cc.
-   El comando DEBE añadirse a create\_command\_map en ResfileReader.cc. Este mapa conecta las cadenas de entrada con los comandos reales.
-   Cualquier comando puede interpretarse como un comando por defecto, para casi todos los residuos, o como un comando específico de un residuo. Los comandos no podrán distinguir si están trabajando en una línea por defecto o no, y solo deben trabajar con un residuo a la vez.
-   El objeto debe tener (al menos) dos métodos:
    -   name() devuelve una cadena, que debe COINCIDIR EXACTAMENTE con la cadena que quieres usar para el comando en el resfile (como "NATAA"). Esta es la clave del mapa command\_map.
    -   residue\_action, que recibe cuatro argumentos:
        -   un vector1 de cadenas (la línea de entrada del resfile dividida en tokens)
        -   un Size (entero...) que es una posición en la línea de entrada
        -   una referencia al PackerTask sobre el que opera
        -   otro Size, que es la posición del residuo sobre el que opera.

-   Los objetos de comando deben tratar la línea de entrada como constante. Deben incrementar la posición en la línea de entrada según corresponda (++ una vez para contar el nombre mismo, ++ de nuevo por cada argumento leído y "consumido").

Por supuesto, el resfile solo existe para modificar el PackerTask. También tendrás que modificar PackerTask\_, o alguna clase hija, para incluir las funciones set y los miembros de datos que quieras modificar.

##Véase también

* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: la página de inicio de la documentación de desarrollo
* [[Resfiles]]: sintaxis y convenciones del resfile
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos adicionales de Rosetta.


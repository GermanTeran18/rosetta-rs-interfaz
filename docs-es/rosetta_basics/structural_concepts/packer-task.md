#Cómo usar el PackerTask

Autor: Steven Lewis

Esta página describe cómo se pretende usar el PackerTask (en realidad el PackerTask\_, porque el primero es una clase de interfaz). Andrew LF lo construyó para que fuera «conmutativo»: el orden en que alteras el PackerTask no tiene efecto en su estado final (esto es como una función de estado en termodinámica). Como corolario, no se te permite modificar el PackerTask arbitrariamente; generalmente solo puedes alterarlo mediante setters conmutativos. Además, gran parte de la información real del PackerTask está contenida en sus ResidueLevelTasks (ResidueLevelTask\_), que permiten controlar el comportamiento a nivel de posición. La mayor parte de esta documentación se aplica a ambos; una llamada a the\_task.residue\_task(resid) devuelve el ResidueLevelTask que quieres.

Puedes encontrar un tutorial introductorio sobre el Packer [aquí](https://www.rosettacommons.org/demos/latest/tutorials/Optimizing_Sidechains_The_Packer/Optimizing_Sidechains_The_Packer).

Conmutatividad
=============

Hay dos tipos de conmutatividad: «y» + «o». La conmutatividad y significa que un comportamiento será verdadero si y solo si todas las entradas son consistentemente verdaderas, es decir:

-   estado = (entrada1 && entrada2 && entrada3 && entrada4)

Se usa para comportamientos que por defecto están «activados» y que, por lo tanto, seguirán activados hasta que se desactiven explícitamente. Los comportamientos notables del PackerTask aquí son la empaquetabilidad y la diseñabilidad de los residuos, que ambas empiezan activadas, así como la lista de tipos de residuo, que empieza con todos los canónicos (ambos tautómeros de His; sin disulfuros) permitidos en todas las posiciones.

El otro tipo de conmutatividad es o, que funciona así:

-   estado = (entrada1 || entrada2 || entrada3 || entrada4)

Se usa para comportamientos que por defecto están «desactivados» y que hay que activar. Ejemplos notables incluyen todo lo relacionado con los rotámeros y la inclusión de aminoácidos no canónicos.

Cómo hacer llamadas que cambian el PackerTask
=========================================

La documentación de PackerTask\_ (PackerTask es una clase de interfaz) contiene la documentación de las funciones individuales. Normalmente, las llamadas a funciones que empiezan con or\_ serán un comportamiento conmutativo-o; las llamadas que empiezan con and (o las como restrict\_to\_repacking o prevent\_repacking) tendrán un comportamiento conmutativo-y, y las llamadas que no son obviamente ninguno de los dos probablemente son funciones get.

Cómo encadenar llamadas
==================

Las llamadas al PackerTask que modifican la tarea normalmente devuelven la tarea. Esto permite encadenar llamadas:

```
the_task.initialize_from_command_line().read_resfile();
```

Esto hará que el PackerTask tenga todos sus datos miembro fijados para coincidir con la «solución» conmutativa de los comportamientos definidos por la línea de comandos y el resfile.
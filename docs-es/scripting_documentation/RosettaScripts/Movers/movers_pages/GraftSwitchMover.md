# GraftSwitchMover
Página creada por Bobby Langan (robert.langan@gmail.com). Última actualización: 26 de febrero de 2019.
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## GraftSwitchMover

Injerta una secuencia en el latch de una proteína de tipo LOCKR ([Langan RA, Ng AH, Boyken SE, et. al Nature 2019](https://www.nature.com/articles/s41586-019-1432-8)). Devuelve todos los threadings (enhebrados) en los que el grado promedio de los "residuos importantes" definidos es mayor que el umbral (valor predeterminado=6). Los "residuos importantes" los define el usuario como los residuos que deben quedar enterrados en la interfaz entre la jaula (cage) y el latch. El usuario define el conjunto de residuos enhebrables mediante posiciones de inicio/fin o mediante un selector de residuos, y el mover determina en qué parte de ese conjunto caben las secuencias definidas. Si el conjunto de residuos no se define de ninguna de esas formas, el mover selecciona la hélice C-terminal. El mover seleccionará la hélice N-terminal y/o el loop adyacente a la hélice terminal según los parámetros definidos por el usuario.

El mover devuelve varias Poses: debe usarse MultiplePoseMover para el diseño y el filtrado posteriores.

Úsalo cuando quieras enhebrar una o más secuencias en varias posiciones potenciales; usa [[SimpleThreadingMover|SimpleThreadingMover]] si tienes una posición para colocar una secuencia. Este mover llama a SimpleThreadingMover después de analizar las posiciones enhebrables y realiza el filtrado posterior por enterramiento.

```xml
<GraftSwitchMover name="(&string)" start="(0 &int)" end="(0 &int)" 
n_term="(false &bool)" any_order="(true &bool)" pack_neighbors="(true &bool)" 
graft_on_latch_loop="(true &bool)" sequence="(&string)" 
important_residues="(&string)" burial_cutoff="(6 &real)" selector="(&string)" 
task_operations="(&string)" scorefxn="(&string)"/>
```

- <b>start</b>: número del residuo que define el inicio del intervalo de residuos enhebrables. Debe definirse junto con 'end'. Anula el comportamiento predeterminado.

- <b>end</b>: número del residuo con el que termina el intervalo de residuos en los que se permite el enhebrado.

- <b>n_term</b>: el comportamiento predeterminado, sin establecer start/end ni selector, es encontrar la hélice C-terminal y hacer diseñables todas las posiciones. Ponlo en true si el latch está en el extremo N-terminal.

- <b>any_order</b>: con varias secuencias, ponlo en false si quieres mantener el orden de las secuencias que has definido. Es útil si necesitas una secuencia más cerca de un extremo que de otro.

- <b>pack_neighbors</b>: ponlo en false si no quieres que los residuos vecinos se reempaqueten durante el enhebrado

- <b>graft_on_latch_loop</b>: ponlo en false si no quieres que se enhebre el loop entre la jaula y el latch

- <b>sequence</b>:  lista de secuencias que se enhebrarán, separadas por comas. Un '-' indica un hueco en el que por defecto se usará NATAA

- <b>important_residues</b>: lista de números de residuo, separados por comas (1 corresponde al primer residuo de 'sequence'), que deben quedar enterrados/dentro de la jaula. Separa los residuos importantes de secuencias distintas con '/', en el orden indicado en la etiqueta 'sequences'

- <b>burial_cutoff</b>: número de residuos vecinos que determina el grado de enterramiento

- <b>selector</b>: selector de residuos que define los residuos sobre los que se puede enhebrar. Anula el comportamiento predeterminado y start/end si se define.

- <b>task_operations</b>: lista de TaskOperations separadas por comas que se usarán. Úsalo si tienes residuos que no quieres que se reempaqueten (o pon pack_neighbors en false si no quieres que se reempaquete ningún residuo). Es útil si usas HBNet antes en tu protocolo: usa la TaskOp de HBNet para mantener esos rotámeros.

- <b>scorefxn</b>: nombre de la función de puntuación que se usará.

- <b>name</b>: el nombre dado a esta instancia.

Hay tres formas de definir los residuos enhebrables. Si no haces nada, se seleccionará el extremo C-terminal junto con el loop que lo precede. Poner <b>n_term</b> en true usará en su lugar la hélice N-terminal y el loop. Poner <b>graft_on_latch_loop</b> en false usará solo la hélice correspondiente.

```xml
<GraftSwitchMover name="lockr_des" graft_on_latch_loop="false" 
sequence="L-MSCAQES" important_residues="5,6" />
```

Si defines inicio y fin, se enhebrará sobre todos los residuos entre las posiciones definidas. Si se define uno, deben definirse ambos; de lo contrario, el mover lanzará un error.

```xml
<GraftSwitchMover name="lockr_des" start="240" end="260"
sequence="L-MSCAQES" important_residues="5,6" />
```

Un selector de residuos puede usarse para definir un conjunto discontinuo de residuos. El mover determinará programáticamente en qué parte de ese conjunto discontinuo caben tus secuencias.

```xml
<RESIDUE_SELECTORS>
    #Select both terminal helices but not HBNet residues
    <ResiduePDBInfoHasLabel name="hbnet_residues" property="HBNet" />
    <Not name="not_HBnet" selector="hbnet_residues"/>
    <SSElement name="n_helix" selection="1,H" />
    <SSElement name="c_helix" selection="-1,H" />
    <Or name="terminal_helices" selectors="n_helix,c_helix"/>

    <And name="threadable_residues" selectors="not_HBnet,terminal_helices"/>
</RESIDUE_SELECTORS>
<MOVERS>
    <GraftSwitchMover name="lockr_des" selector="threadable_residues"
    sequence="L-MSCAQES" important_residues="5,6" />
</MOVERS>
```

Es necesario usar MultiplePoseMover para el diseño y el filtrado posteriores a fin de capturar toda la salida de este mover.

##Véase también

* [[SimpleThreadingMover|SimpleThreadingMover]]
* [[I want to do x]]: guía para elegir un mover

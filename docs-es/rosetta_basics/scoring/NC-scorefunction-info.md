#Funciones de puntuación que funcionan bien con residuos y moléculas de proteína y que no son de proteína

Con la incorporación de la [[función de puntuación talaris2013 | score-types]], se puede puntuar la mayoría de los residuos y moléculas que no son de proteína; sin embargo, existen otras funciones de puntuación que funcionan bien con residuos y moléculas de proteína y que no son de proteína.  En julio de 2017, la función de puntuación predeterminada se actualizó a la más reciente [[función de puntuación ref2015|Overview of Seattle Group energy function optimization project]], que se ha calibrado con simulaciones líquidas de moléculas pequeñas además de con estructuras cristalográficas de proteínas, mejorando aún más el rendimiento en la puntuación de no canónicos.

[[_TOC_]]

## Funciones de puntuación útiles

### Función de puntuación MM Standard <a name="MM-Standard-Scorefunction" />
Nombres de los creadores:
* P. Douglas Renfrew (doug.renfrew@gmail.com)
* Laboratorio Bonneau

Descripción:
* Desarrollada para puntuar cadenas laterales de alfa-aminoácidos no canónicos, y usada en la generación de bibliotecas de rotámeros para NCAA
* Se está usando actualmente para puntuar peptoides, oligooxopiperazinas (OOP) y sustitutos de enlace de hidrógeno (HBS)
* Elimina los términos basados en conocimiento que se evalúan según la identidad del tipo de residuo

* *  *fa\_dun*, *rama*, *pair*, *ref*
* Añade un término de torsión MM y términos MM de Lennard-Jones que se evalúan **intra**rresiduo

* *  *mm\_intra\_lj\_rep*, *mm\_intra\_lj\_atr*, *mm\_twist*
* Añade un término de energía explícito del estado desplegado basado en fragmentos de PDB

* *  *unfolded*

Resultados preliminares:
* Pruebas realizadas en [Renfrew et. al., PLOS ONE 2012](http://www.plosone.org/article/info%3Adoi%2F10.1371%2Fjournal.pone.0032637)

* * las bibliotecas de rotámeros producidas son comparables a dun02
* * la recuperación de rotámeros es comparable a score12
* * la recuperación de secuencia no es tan buena como la de score12
* * se diseñaron 5 péptidos dirigidos a la interfaz calpaína/calpastatina que tenían constantes de disociación (Kd) menores o iguales que las del fragmento peptídico de tipo silvestre
* Pruebas realizadas en [Drew et. al., PLOS ONE 2013](http://www.plosone.org/article/info%3Adoi%2F10.1371%2Fjournal.pone.0067051)
* * Se diseñaron servidores ROSIE para trabajar con cadenas principales no canónicas (NCBB)
* Se usó para diseñar 9 OOP contra la interfaz P53/MDM2 (Kevin Drew, se publicará pronto)
* * 4 OOP tuvieron Kd nM, 4 tuvieron Kd uM y 1 no se unió

Salvedades:
* No ha recibido tantas pruebas como score12
* Sin electrostática de largo alcance
* La formulación de la energía del estado desplegado subestima el componente atractivo de la función de energía, lo que llevó a una incorporación excesiva de cadenas laterales grandes

Cómo usarla:
* Opciones (suponiendo que el protocolo respeta las opciones de línea de comandos)
<pre>
 -score::weights mm_std
</pre>
* Conjunto de pesos
 <code>mm_std.wts</code>

Ten en cuenta que quizá también quieras proporcionar un archivo de pesos personalizado que active el término **ring\_close**, si trabajas con no canónicos cíclicos (p. ej., azúcares).  Consulta más abajo los detalles sobre **ring\_close**.

###Función de energía de interacciones covalentes parciales (orbitales)
Nombres de los creadores:
* Steven Combs (steven.combs1@gmail.com)
* Laboratorio Meiler

Descripción:
* Desarrollada para puntuar con más exactitud puentes salinos, catión-pi, pi-pi y enlaces de hidrógeno
* No se tipifica según los tipos de residuo, sino según los tipos de orbitales asociados a los átomos. Esto permite la extensibilidad a ligandos y aminoácidos no canónicos

Resultados preliminares:
* Rinde tan bien como talaris2013 en diseño.
* Mejora la geometría de las interacciones de puentes salinos, catión-pi, pi-pi y enlaces de hidrógeno en la interfaz aceptor/donante
* Funciona para todos los tipos de residuo (ligandos, ADN, ARN) porque se tipifica según orbitales
* Reproduce mejor que talaris2013 el número medio de enlaces de hidrógeno, puentes salinos y interacciones catión-pi y pi-pi

Salvedades: 
* Ligeramente más lenta que talaris2013
* Se acaban de cambiar los nombres de todos los términos de puntuación para que coincidan con los del artículo que se publicará próximamente
* Ahora es más fácil ajustar los términos individuales (cation\_pi, pi\_pi, hbond, salt\_bridge) manipulando directamente el término correspondiente (pci\_cation\_pi, pci\_pi\_pi, pci\_hbond, pci\_salt\_bridge)
* Sigue usando la función de puntuación de enlaces de hidrógeno cadena principal-cadena principal para puntuar las interacciones cadena principal-cadena principal

Cómo usarla:
* Opciones (suponiendo que el protocolo respeta las opciones de línea de comandos)
<pre>
 -score::weights orbitals_talaris2013
 -add_orbitals
 -output_orbitals (optional. Outputs the orbitals in the pdb file)
</pre>
* Conjunto de pesos

 <code>orbitals.wts </code>(para los valores predeterminados anteriores a talaris2013), <code>orbitals_talaris2013.wts</code>, <code>orbitals_talaris2013_softrep.wts</code> (análogo a la función de puntuación soft_rep/soft_rep_design, pero no probado rigurosamente)

## Términos útiles que se pueden añadir a las funciones de puntuación

### Término general de cierre de anillos (**ring\_close**)
Creador: Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker

Aunque no es una función de puntuación completa en sí misma, el término de puntuación **ring\_close** pretende ser una versión generalizada del término **pro\_close** (que mantiene cerrado el anillo de prolina durante la minimización).  A diferencia de **pro\_close**, que es específico de la prolina, **ring\_close** está pensado para funcionar con cualquier residuo canónico o no canónico que tenga un anillo.  Como Rosetta concibe las moléculas como un árbol ramificado de átomos (el AtomTree), los anillos no se pueden representar adecuadamente durante la minimización, lo que significa que debe haber un punto de corte (cutpoint) en cualquier cadena cíclica de átomos.  Esto podría hacer que los anillos se abrieran gradualmente durante la minimización.  El término **pro\_close** crea un potencial armónico entre el carbono delta de la prolina y un átomo virtual («átomo sombra») unido al nitrógeno de la cadena principal.  Esto mantiene cerrado el anillo de prolina.  El término de puntuación **ring\_close** hace lo mismo para cualquier «átomo sombra» y su homólogo real, en cualquier tipo de residuo.

Los átomos sombra se definen en el archivo `.params` de un ResidueType con líneas **VIRTUAL\_SHADOW**.  Normalmente se quieren dos de estas líneas para forzar el cierre de un anillo.  Por ejemplo, en el archivo `.params` de cis-ACPC tenemos:

```
VIRTUAL_SHADOW VCM CM
VIRTUAL_SHADOW VCD CD
```

Las líneas anteriores indican que se espera que el átomo virtual VCM (que está unido al átomo CD que forma parte del anillo de cis-ACPC) «haga sombra», es decir, coincida con la posición del átomo CM de la cadena principal, y que el átomo virtual VCD (que está unido al átomo CM de la cadena principal) haga «sombra» al átomo CD.  Para forzarlo, hay que usar una función de puntuación con el término de puntuación **ring\_close** activado.

Ten en cuenta que hay tres términos de puntuación que fuerzan el cierre de la prolina: **ring\_close**, **pro\_close** y **cart\_bonded**.  Para evitar contar dos veces, estas funciones no deben usarse juntas.  El término **ring\_close** está pensado para situaciones en las que el minimizador solo puede mover los grados de libertad torsionales, de modo que sería indebidamente costoso usar el término de puntuación **cart\_bonded**.

Ten en cuenta también que **pro\_close** tiene dos comportamientos: además de forzar el cierre del anillo de los residuos de prolina, también impone restricciones torsionales al ángulo de torsión omega del residuo anterior.  Si quieres seguir usando **pro\_close** para este último fin, pero que **ring\_close** se encargue del cierre del anillo, puedes desactivar la parte de cierre de anillo de **pro\_close** con la opción **-score:no\_pro\_close\_ring\_closure**.  Los dos términos de puntuación, **pro\_close** y **ring\_close**, <i>solo</i> deben usarse juntos si se establece esta opción.  Si a **ring\_close** se le da la misma ponderación que a **pro\_close**, fuerza el cierre con la misma intensidad.  Sin embargo, lo más habitual es que **ring\_close** se use con la función de puntuación MM.

Como nota final, hay situaciones en las que no es necesario sustituir **pro\_close** por **ring\_close**.  El término **pro\_close** admite L-prolina, D-prolina y L- y D-oligourea-prolina («OU3\_PRO» y «DOU3\_PRO», en Rosetta).

### Término de puntuación de control de la composición de tipos de residuo (aa\_composition)
Creador: Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker

Es un término de puntuación especializado, pensado para usarse durante el diseño (añadido a una función de puntuación como talaris2014 o ref2015), que penaliza las desviaciones respecto a una composición de aminoácidos deseada (o, más en general, de tipos de residuo) para guiar al packer hacia «buenas» secuencias.  Por ejemplo, un usuario podría especificar que quiere una secuencia que sea 50% hidrofóbica, contenga exactamente 1 residuo de triptófano y no tenga más de 4 residuos de alanina.  La documentación completa está disponible [[aquí|AACompositionEnergy]].

### Término de puntuación de control de la carga neta (netcharge)
Creador: Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker

Este término de puntuación penaliza las desviaciones respecto a una carga neta deseada durante el diseño.  Como aa\_composition, se puede añadir a una función de puntuación como talaris2014 o ref2015.  El término puede operar sobre todo el Pose o sobre subregiones seleccionadas, donde la selección se controla con un selector de residuos.  Esto permite al usuario especificar, por ejemplo, que un Pose debe tener carga neta neutra, pero que un bolsillo de unión tenga carga neta negativa (-1 o menos) y una región de interacción proteína-proteína tenga una carga neta de exactamente +2.  La documentación completa está disponible [[aquí|NetChargeEnergy]].

### Término de puntuación de penalización de huecos (voids\_penalty)
Creador: Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker

Este término de puntuación penaliza las soluciones del packer que tienen cavidades o huecos enterrados.  Es otro término de puntuación centrado en el diseño que no es descomponible por pares, pero es rápido de calcular y rápido de actualizar durante la búsqueda por recocido simulado que realiza el packer.  Esto significa que puede guiar al packer hacia soluciones empaquetadas con pocos huecos enterrados.  La documentación completa está disponible [[aquí|VoidsPenaltyEnergy]].

### Función de penalización para secuencias que favorecen la aspartimida (aspartimide\_penalty)
Creador: Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker

Es otro término de puntuación especializado que se puede añadir a una función de puntuación existente durante el diseño, en el caso especial del diseño de péptidos para síntesis en fase sólida.  Penaliza ciertas secuencias que favorecen la formación de los subproductos indeseables de aspartimida durante la síntesis de péptidos.  Las secuencias penalizadas son:

| Primera posición | Segunda posición |
|----------------|-----------------|
| L-aspartato    | glicina, L-treonina, L-serina, L-asparagina o cualquier residuo de D-aminoácido |
| D-aspartato    | glicina, D-treonina, D-serina, D-asparagina o cualquier residuo de L-aminoácido |

Con un peso de puntuación de 1.0, el término añade una penalización de 25 puntos por cada secuencia de dos residuos que favorezca la aspartimida. Este término es descomponible por pares y totalmente compatible con el packer, por lo que puede servir como restricción del problema de optimización que resuelve el packer, asegurando que produzca una secuencia de baja energía con la condición de que no se encuentre ninguna subsecuencia que favorezca la aspartimida dentro de la secuencia.  La opción «-score:aspartimide\_penalty\_value <float>» se puede usar para establecer el valor de penalización que se añade por cada secuencia que favorece la aspartimida (25 unidades de energía de Rosetta por defecto).  Como alternativa, se puede usar el peso del término para establecer la penalización.

### Función de bonificación para redes de enlaces de hidrógeno (hbnet)
Creador:  Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker

Es otro término de puntuación especializado que se puede añadir para mejorar los diseños.  Este término de puntuación añade una bonificación (_es decir_, un valor negativo) para las redes de residuos unidos por enlaces de hidrógeno, con un tamaño de bonificación que escala cuadráticamente con el tamaño (_es decir_, el número de residuos) de la red.  Aunque detectar redes es un problema fundamentalmente no descomponible por pares, este término de puntuación es compatible con el packer y puede guiar a cualquier protocolo de diseño que invoque al packer hacia soluciones con redes de enlaces de hidrógeno.  La documentación completa está disponible [[aquí|HBNetEnergy]].

### Función de penalización para secuencias repetidas (aa\_repeat)
Creador:  Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker

El término de puntuación [[`aa_repeat`|Repeat-stretch-energy]] se puede activar durante el diseño para penalizar las repeticiones de más de dos del mismo tipo de residuo.  Esto es particularmente útil al diseñar proteínas o péptidos cuyas estructuras se van a resolver por espectroscopía de RMN, ya que las secuencias repetidas dificultan mucho las asignaciones.  El término de puntuación es fundamentalmente no descomponible por pares, pero es compatible con el packer, por lo que guía el proceso de diseño hacia soluciones sin secuencias repetidas.  La documentación completa está disponible [[aquí|Repeat-stretch-energy]].

##Véase también

* [[Scoring explained]]
* [[Términos de puntuación y funciones de puntuación|score-types]]
* [[Términos de puntuación adicionales|score-types-additional]]
* [[Término de energía de enlaces de hidrógeno|HBNetEnergy]]
* [[AARepeatEnergy|Repeat-stretch-energy]]
* [[AACompositionEnergy]]
* [[VoidsPenaltyEnergy]]
* [[Guías para entradas que no son proteínas|non-protein-residues]]
* [[Opciones de puntuación|score-options]]
* [[Términos de guía centrados en el diseño|design-guidance-terms]]

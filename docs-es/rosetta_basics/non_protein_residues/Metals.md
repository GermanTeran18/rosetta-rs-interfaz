# Cómo trabajar con metaloproteínas en Rosetta
Por Vikram K. Mulligan, laboratorio Baker (vmullig@uw.edu).  Documentación creada el 13 de marzo de 2014; cambios incorporados a la rama master el 14 de marzo de 2014.

## Resumen breve
Se ha añadido la opción **-in:auto_setup_metals** para facilitar la importación de un archivo PDB que contenga una metaloproteína y para que Rosetta detecte automáticamente los enlaces covalentes coordinados a iones metálicos y cree las restricciones apropiadas.

## Casos de uso
En general, hay tres tipos amplios de tareas que un usuario podría querer hacer con una metaloproteína:
* Predecir la estructura de una metaloproteína, incluido el descubrimiento de los residuos que coordinan el metal.  Actualmente esto no es fácil en Rosetta, aunque es posible que esta funcionalidad se añada en el futuro.  (Ten en cuenta que se ha trabajado en la predicción de la estructura de metaloproteínas en situaciones en las que se conoce la geometría del sitio metálico.  Consulta [Wang _et al._ (2010). _Protein Sci._ 19(3):494-506](http://www.ncbi.nlm.nih.gov/pubmed/20054832) para más detalles.)
* Llevar a cabo el diseño _de novo_ de un centro de unión a metales en una proteína.  Esto se hace mejor con los archivos de restricciones geométricas del diseño de enzimas, que están [[descritos en otro lugar|match-cstfile-format]]
* Importar un archivo PDB que describe una metaloproteína y luego hacer algo con él (_p. ej._ diseñar una proteína de unión, rediseñar un loop, relajar la estructura, _etc._).  Esta documentación está pensada para este caso.

## ¿Cuál es el comportamiento por defecto de Rosetta y por qué es un problema?
Por defecto, Rosetta es capaz de reconocer la mayoría de los iones metálicos que se encuentran habitualmente en las proteínas (Zn, Cu, Fe, Mg, Na, K, Ca, _etc._).  Sin embargo, al importar, Rosetta no sabe nada sobre la conectividad covalente entre el ion metálico y los residuos de aminoácidos circundantes.  Tal como se configura el foldtree, el metal se añade mediante un salto (jump) con raíz en el primer residuo.  Esto no es lo ideal, ya que significa que un pequeño cambio en la conformación de la cadena principal en cualquier parte no arrastrará el metal junto con los residuos circundantes.

Como por defecto Rosetta no sabe nada sobre la geometría covalente de los iones metálicos, la función de puntuación considerará interacciones de van der Waals entre el ion metálico y las cadenas laterales circundantes, lo que significa que Rosetta creerá que hay un choque terrible y producirá valores de energía enormes.  Relajar la estructura alejará todas las cadenas laterales circundantes del metal y podría hacer que el metal se aleje del resto de la estructura.  Probablemente no queremos eso.

Peor aún, el estado de protonación de los residuos de histidina (que con frecuencia coordinan iones metálicos) se establece por defecto sin ningún conocimiento del metal.  Esto a menudo coloca átomos de hidrógeno dentro del radio de van der Waals del ion metálico.

## ¿Cómo se han gestionado las metaloproteínas en el pasado?

Algunas personas han creado archivos de restricciones geométricas al estilo de Enzdes para cada metaloproteína con la que querían trabajar, pero esto lleva tiempo y es tedioso, y requiere una intervención del usuario que no debería ser necesaria.  También exige que cada protocolo sepa usar un archivo de restricciones al estilo de Enzdes, y muchos no saben.  Otros han usado átomos metálicos virtuales, pero esto significa que la función de puntuación ignora la carga del ion metálico y crea otros problemas.  Algunas personas incluso han creado nuevos tipos de residuo de unión a metales que incluían el metal, pero esto crea su propio conjunto de problemas.  Por último, algunos han trabajado solo con apo-metaloproteínas (las versiones de las proteínas sin metal), lo cual es válido en algunos casos, pero no es una estrategia aplicable en general.

## ¿Cuál es la mejor solución?

Se ha añadido la opción **-in:auto_setup_metals** para gestionar automáticamente la importación de metaloproteínas desde archivos PDB.  Esta opción garantiza lo siguiente:
* Rosetta establece automáticamente enlaces covalentes entre los iones metálicos y los átomos cercanos de unión a metales en los residuos que unen metales.
* Rosetta crea automáticamente restricciones de distancia entre los iones metálicos y los átomos que los unen.  Las distancias se basan en la geometría del archivo PDB.
* Rosetta crea automáticamente restricciones de ángulo entre los iones metálicos, los átomos que los unen y los átomos padre de esos átomos.  Los ángulos se basan en la geometría del archivo PDB.
* Rosetta establece en 1.0 el peso de **metalbinding_constraint** en la función de puntuación, si no se había establecido ya en el archivo de pesos.
* Rosetta elimina los hidrógenos de los átomos que unen iones metálicos y ajusta adecuadamente la carga del residuo (lo cual puede ser importante en casos especiales en los que un residuo coordina varios iones metálicos).
* Rosetta configura el foldtree de modo que el átomo metálico quede conectado mediante un salto (jump) al residuo de unión a metales espacialmente más cercano que lo precede en la secuencia lineal.  Esto significa que si se mueve la cadena principal de la proteína, el metal permanecerá cerca de ese residuo (aunque no necesariamente cerca de su cadena lateral, si esta se moviera).
El [[SetupMetalsMover]] ofrece la misma función que la opción, en forma de mover.

## ¿Cómo controlo el comportamiento por defecto de la opción **-in:auto_setup_metals**?

Tres opciones adicionales controlan el comportamiento:
* **-in:metals_detection_LJ_multiplier <value>** controla el umbral para detectar interacciones covalentes entre iones metálicos y residuos de unión a metales.  Un valor de 1.5 significa que se usa como umbral una vez y media la suma de los radios de van der Waals del ion metálico y de los posibles átomos de unión a metales.
* **-in:metals_distance_constraint_multiplier <value>** controla la intensidad de la restricción de distancia, siendo 1.0 el valor por defecto.  Ten en cuenta que si un protocolo o un archivo de pesos establece un peso de **metalbinding_constraint**, la intensidad se escala automáticamente de forma adecuada (es decir, duplicar el peso de **metalbinding_constraint** _no_ obliga a reducir a la mitad el valor establecido con esta opción).  Si el valor se establece en 0, no se añaden restricciones de pares de átomos.
* **-in:metals_angle_constraint_multiplier <value>** controla la intensidad de la restricción de ángulo, siendo 1.0 el valor por defecto.  Como antes, si un protocolo o un archivo de pesos establece un peso de **metalbinding_constraint**, la intensidad se escala automáticamente de forma adecuada.  Si el valor se establece en 0, no se añaden restricciones de ángulo.
El SetupMetalsMover usa por defecto los valores de estos multiplicadores establecidos en la línea de comandos. Los valores también se pueden especificar en la etiqueta del mover con RosettaScripts.
## ¿Cómo sabe Rosetta qué tipos de residuo pueden unir metales?

Los residuos de unión a metales tienen la propiedad **METALBINDING** en su lista de propiedades (en el archivo `.params`).  Además, los átomos de unión a metales se especifican con la línea **METAL_BINDING_ATOMS <atomname1> <atomname2> ...** (también en el archivo `.params`).  Por su parte, los iones metálicos tienen la propiedad **METAL** en su lista de propiedades.  Nota: los iones metálicos deben tener el átomo metálico como átomo 1.

## ¿Esto funciona también con residuos de aminoácidos no canónicos?

Por supuesto.  El aminoácido no canónico (2,2'-bipiridin-5-il)alanina (BPY) se ha añadido a la base de datos y puede servir como caso de demostración.

## ¿Cómo puedo confirmar que Rosetta está estableciendo bien la conectividad atómica?

Ahora, por defecto, se escriben registros CONECT explícitos en el archivo PDB.  Puedes usarlos para confirmar que hay enlaces entre los átomos de unión a metales y el metal.  Los enlaces al ion metálico serán visibles cuando cargues en PyMOL el PDB de salida de Rosetta.

También puedes forzar el volcado de todos los registros CONECT (no solo los enlaces a entidades no canónicas como los centros metálicos) con la opción **-write_all_connect_info**.

## ¿Funciona esto dentro de RosettaScripts?

Desde el 13 de mayo de 2014, sí.  Una salvedad es que los pesos de restricciones deben activarse explícitamente en la función de puntuación utilizada para que las restricciones metálicas funcionen.  Además, cualquier mover que borre restricciones borrará las restricciones metálicas.

**ACTUALIZACIÓN** 25 de abril de 2017: el nuevo SetupMetalsMover ofrece la misma funcionalidad que la opción, en forma de mover (los pesos de restricciones todavía deben establecerse explícitamente en la función de puntuación). La opción constraints_only permite a los usuarios volver a añadir las restricciones sin configurar enlaces covalentes; esto puede ser útil, por ejemplo, después de llamar a un mover que borra restricciones.

## ¿Es compatible con el modo centroid?

**Respuesta corta:** sí, probablemente (a abril de 2018). **Respuesta larga:** si la geometría de unión al metal es a través de átomos de la cadena principal, no debería haber mucho problema, siempre que recuerdes activar el término metalbinding_constraint en tus funciones de puntuación centroid. (No se activará automáticamente.) Si la coordinación es a través de átomos de la cadena lateral, hay algunas salvedades. Como los átomos de las cadenas laterales de las proteínas normalmente no están presentes en el modo centroid, resulta difícil trasladar los enlaces covalentes y las restricciones a residuos estándar del modo centroid. 

Rosetta lo resuelve creando un tipo de residuo especial de átomos unidos, en el que todos los átomos de la cadena lateral están representados explícitamente. Este enfoque tiene dos posibles problemas. El primero es que, al no tener el átomo CEN, este residuo especial no se puntuará en el modo centroid como un residuo de proteína estándar. El otro se debe a limitaciones del muestreo. Como la mayoría de los protocolos del modo centroid no consideran el muestreo de cadenas laterales, la conformación de la cadena lateral de los residuos de unión a metales quedará, en la práctica, bloqueada en su posición inicial. Esto puede no ser un problema si no estás muestreando en el entorno inmediato del residuo (p. ej., si estás remodelando un loop en otra parte de la proteína), pero si estás remodelando la cadena principal cerca del residuo de unión a metales, puedes estar rechazando injustamente conformaciones aceptables por la inmovilidad de la cadena lateral del residuo.

Ten en cuenta que esto solo ocurre si lees el Pose como todos los átomos, aplicas la configuración de unión a metales y luego lo conviertes a centroid (p. ej., durante un tramo de remodelado de loops del protocolo). Si lees la estructura directamente como un Pose en modo centroid (p. ej., con la opción -in:file:centroid), Rosetta nunca tendrá los átomos de las cadenas laterales para configurar adecuadamente los enlaces al metal y las restricciones.

## Me gustaría hacer otras cosas con metales en mis propios protocolos.

¿Puedes plantearlo en forma de pregunta?

## ¿Dónde puedo encontrar el código de la funcionalidad descrita aquí?

Buena pregunta.  Las funciones de utilidad están en **src/core/util/metalloproteins_util.cc**.  (Las funciones de este archivo duplican parte de la funcionalidad de **src/protocols/toolbox/match_enzdez_util/** con algunas modificaciones; en el futuro, probablemente habría que consolidarlas para evitar la duplicación de código.)  Los métodos **is_metal()** e **is_metalbinding()** se han añadido tanto a la clase **core::chemical::ResidueType** como a **core::conformation::Residue**, lo que te permite consultar si un residuo es un ion metálico o un residuo de unión a metales.  Para los residuos de unión a metales, el método **get_metal_binding_atoms()** de **ResidueType** y **Residue** proporciona una lista de índices de átomos de unión a metales.

## Salvedades

* Los metales seguidos de un carácter «1» o «2» (_p. ej._ ZN1, CU2, etc.) se interpretan como el metal correspondiente al importar el PDB.  Esto puede crear problemas (_p. ej._ CO2 se interpreta como cobalto, no como dióxido de carbono).
* Esto aún no se ha probado con minimización cartesiana, el término de puntuación **cart_bonded** ni la simetría.  Podrían crear problemas.
* Dentro de RosettaScripts, los pesos de restricciones deben activarse explícitamente en una función de puntuación definida por el usuario.
* Cualquier protocolo o mover de RosettaScripts que reinicie las restricciones reiniciará las restricciones metálicas.

##Véase también

* [[SetupMetalsMover]]

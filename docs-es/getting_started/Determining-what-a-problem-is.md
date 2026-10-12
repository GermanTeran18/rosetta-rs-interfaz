#Qué hacer cuando no sabes cómo modelar tu problema

Deberías estar aquí si no pudiste determinar cómo abordar tu problema de modelado con nuestras páginas [[Solving a Biological Problem]] o [[Quiero muestrear X|I want to do x]].  También puede que te hayan enviado aquí si no pudimos ayudarte en los foros de Rosetta.  (Esto puede parecer circular, ya que esta página dirige implícitamente a los usuarios de uno de los dos lugares al otro).  

A veces, a los estudiantes de posgrado nuevos en laboratorios que no son de Rosetta se les dan planteamientos vagos de problemas.
Al menos, son vagos con respecto a la visión del mundo y la documentación de Rosetta.
Por ejemplo: "Necesitamos comprobar si estas mutaciones están bien en este sitio. Busca algún software computacional de diseño de proteínas para evaluarlas antes de pedir los oligos." 
Es un gran proyecto y potencialmente muy valioso, pero es una [[pregunta muy, muy difícil|http://xkcd.com/1430]]; los algoritmos de aprendizaje automático entrenados con datos de secuencia y decenas de características estructurales extraídas de conjuntos derivados de Rosetta suelen dar la respuesta correcta, pero no siempre, y mirar solo el cambio en la puntuación de Rosetta no te llevará allí.
Por desgracia, no existe un módulo sencillo IsThisMutationTolerated que responda preguntas como esta.

Esto no es un error tuyo ni de tu IP: es una oportunidad importante para que averigües qué tipo de muestreo es necesario para responder tu pregunta.
Por ejemplo, supón que una de las mutaciones es de alanina a prolina en la segunda posición de una hélice alfa.
Esta es la tercera posición más común para una prolina en las hélices alfa; por lo tanto, es muy improbable pero no imposible.
Entonces la pregunta es: ¿hasta qué punto esta mutación rompe el plegamiento?

Un punto de partida podría ser hacer la mutación con la cadena principal fija, reempaquetar en una envoltura alrededor de ese residuo y evaluar la energía.
Si es demasiado mala, quizá haga falta algún movimiento de la cadena principal para aliviar la tensión.
Además, ¿qué tan bueno era tu modelo original? Tu trabajo podría beneficiarse de tomar una estructura de RMN de baja calidad, generar un conjunto a partir de cada modelo y continuar desde los mejores centroides de clúster de ese conjunto.

Además, ninguno de estos resultados se relaciona necesariamente con la pregunta de fondo que planteó tu IP.
¿Tu IP quiere saber cuán bien se toleran las mutaciones _estructuralmente_?
Entonces puedes producir alguna medida derivada del RMSD de toda la proteína, tanto de los conjuntos nativo como mutante, o quizá de un subconjunto de la proteína cercano a la mutación en cuestión o, si tiene una región crítica como una interfaz con otra proteína o un sitio activo, del RMSD allí.
Naturalmente, también querrás incorporar una medida energética; si en el conjunto mutante los modelos con menor RMSD respecto al nativo tienen la peor energía incluso dentro de tus "mejores centroides", y viceversa, esa es una mala señal para la estabilidad de esa mutación.
¿O tu IP quiere saber más bien cuán bien se toleran las mutaciones _funcionalmente_?
Entonces tienes poca suerte.
Esta es una pregunta tremendamente complicada.
Quizá el RMSD sobre los residuos "funcionalmente relevantes" sería útil, pero eso es solo una posibilidad; es imposible respaldar una métrica de utilidad general y identificar los residuos "funcionalmente relevantes" suele ser inabordable.

En resumen: la mayoría de las preguntas biológicas que te plantean son complicadas y requieren mucha reflexión. 
Habla con tu IP para asegurarte de que estás traduciendo sus peticiones al tipo de modelado correcto.
[[Esta página|Solving-a-Biological-Problem]] considera qué hacer con Rosetta desde el punto de vista de un problema biológico, y [[esta página|I-want-to-do-x]] hace lo mismo desde el punto de vista de los grados de libertad que se muestrean.  
Asegúrate de entender el problema antes de dedicarle mucho tiempo de cómputo.
(Por supuesto, a veces el mucho tiempo de cómputo es el problema en sí: los problemas difíciles requieren mucho tiempo de cómputo, quizá más del que tienes disponible.)

Si puedes describir bien tu problema pero no sabes qué hacer con él, los [foros de Rosetta](http://www.rosettacommons.org/forum) (enlace externo) suelen ser un buen recurso. Por desgracia, esta documentación ha destilado gran parte de la experiencia disponible allí, así que a veces la respuesta es que simplemente no podemos hacerlo.

Problemas que Rosetta no puede resolver
=============================
Hay tres grandes clases de problemas que Rosetta no puede resolver. 
Por lo general, si le has dedicado mucho esfuerzo, puede que estés en una de estas categorías.

1. El problema está bien formulado y se aborda con los métodos correctos, pero fracasa por [[desafíos generales del modelado macromolecular|Challenges-in-Macromolecular-Modeling]], como el problema de la puntuación y el problema de la búsqueda. 
Esto es 100 % culpa de Rosetta.

2. El problema puede abordarse, pero [[no se dedicó suficiente tiempo de cómputo|Rosetta-on-different-scales]]: el problema está submuestreado. 

3. El problema está bien formulado, pero es muy complejo.
Puede estar dentro de la capacidad de Rosetta, pero no con un protocolo preexistente: quizá requiera un [[RosettaScript|RosettaScripts]] largo.
Quizá esté justo más allá de lo que Rosetta puede hacer y requiera uno o dos [[Mover]] nuevos. 
Este tipo de proyecto es razonable para un estudiante de posgrado desarrollador de Rosetta, pero quizá no como proyecto menor para un estudiante de posgrado de biología celular en un laboratorio que no es de Rosetta.
Vemos proyectos de esta complejidad con bastante frecuencia en los [foros de Rosetta](https://www.rosettacommons.org/forum).

Problemas con los que no podemos ayudar y cómo ayudarnos a ayudarte
================================
1. El problema n.º 3 anterior es resoluble con Rosetta en sentido amplio, pero está fuera de nuestros recursos para ayudarte. La comunidad de Rosetta responde bastante bien a preguntas específicas como "Intenté usar el Mover Foo con estos ajustes pero me topé con este problema", pero no a preguntas amplias y vagas como "Necesito ayuda para escribir mi script".  Entendemos que aprender a escribir PyRosetta / RosettaScripts, o simplemente usar Rosetta en general, es difícil, pero no tenemos recursos para formar a los usuarios individualmente, por eso hemos creado este wiki.  Si esto es un problema, sé específico en tus consultas, sobre todo desde el punto de vista del programador.  (Ser muy específico sobre la proteína que te interesa no nos ayuda a ayudarte).

2. Como cualquier institución grande, sufrimos "fuga de cerebros" y la pérdida de conocimiento institucional.  Si te interesa una aplicación específica usada en un artículo de hace 7 años que no tiene mucha historia de publicaciones después del artículo inicial, probablemente el autor dejó la comunidad de Rosetta y pasó a otro trabajo.  Si no dejó buena documentación, probablemente no podamos hacer nada para ayudarte.  Si esto es un problema, dinos exactamente en qué artículo quieres basar tu experimento, para que sepamos con quién intentar ponernos en contacto.  A veces el IP tendrá un contacto de un estudiante que ya se graduó, o alguien más de su laboratorio habrá retomado el proyecto.

3. ¡A veces simplemente no lo sabemos!  Rosetta es enorme y complejo, y su complejidad es desproporcionada con respecto al número de personas que lo han usado.  Puede que seas la primera persona en preguntar cómo combinar el Mover Foo con el Filter Bar.  ¡Felicidades!  ¡Estás en la vanguardia!  ¡Cuéntanos qué encuentras en tu aventura!  No hemos estado allí antes, así que no sabemos realmente qué encontrarás.


##Véase también
* [[Resources for learning biophysics and computational modeling]]
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[I want to do x]]: guía para realizar distintas formas de muestreo en Rosetta
* [[Rosetta en distintas escalas|Rosetta-on-different-scales]]: una discusión de cuánto trabajo necesitas hacer para resolver un problema
* [[Challenges in Macromolecular Modeling]]: trata los problemas del muestreo y la puntuación en el modelado de proteínas.

#Aplicación FloppyTail

Metadatos
========

Autor: Steven Lewis (smlewi - at - gmail.com)

Código de Steven Lewis. Investigador principal correspondiente: Brian Kuhlman (bkuhlman - at - email.unc.edu).

Código y demo
=============

El código está en `       rosetta/main/source/src/apps/public/scenarios/FloppyTail/      ` ; hay una prueba de integración y demo en `       rosetta/main/tests/integration/tests/FloppyTail/      ` . Ten en cuenta que la prueba de integración tiene muchos menos ciclos de los necesarios para que haga algo útil: el número de ciclos que muestra debería bastar para ver cierto remodelado, pero no para llegar a ningún resultado útil. Para ejecutar esa demo, ve a ese directorio y ejecuta `[path to executeable] -database [path to database] (at-symbol)options`

Referencias
==========

-   [Kleiger G, Saha A, Lewis S, Kuhlman B, Deshaies RJ. Rapid E2-E3 assembly and disassembly enable processive ubiquitylation of cullin-RING ubiquitin ligase substrates. Cell. 2009 Nov 25;139(5):957-68. PubMed PMID: 19945379.](http://www.ncbi.nlm.nih.gov/pubmed/19945379) (enlace a PubMed)

Quizá te interese consultar la información suplementaria en línea de ese artículo para ver otra presentación de cómo funciona el código.

-   [Crawley SW, Gharaei MS, Ye Q, Yang Y, Raveh B, London N, Schueler-Furman O, Jia Z, Côté GP. Autophosphorylation activates Dictyostelium myosin II heavy chain kinase A by providing a ligand for an allosteric binding site in the alpha-kinase domain. J Biol Chem. 2011 Jan 28;286(4):2607-16. Epub 2010 Nov 11.](http://www.ncbi.nlm.nih.gov/pubmed/21071445) (enlace a PubMed)

Este artículo usa FloppyTail pero no está relacionado con su desarrollo.  Idea clave: los autores del artículo pudieron usar FloppyTail de forma productiva sin ayuda significativa del autor del código.

-  [Zhang J, Lewis SM, Kuhlman B, Lee AL. Supertertiary structure of the MAGUK core from PSD-95. Structure. 2013 Mar 5;21(3):402-13.] (http://www.ncbi.nlm.nih.gov/pubmed/23395180) (enlace a PubMed)

Este artículo usa FloppyTail para generar modelos coherentes con datos de RMN y SAXS, con el fin de interpretar una estructura de interés biológico.

-  [Santiago-Frangos A, Jeliazkov JR, Gray JJ, Woodson SA. Acidic C-terminal domains autoregulate the RNA chaperone Hfq. eLIFE. 2017 Aug 9;](https://elifesciences.org/articles/27049)

Este artículo usa un conjunto de modelos generados con FloppyTail para evaluar la probabilidad y la energía de las interacciones entre una cola desordenada y un núcleo ordenado, y las predicciones se validan experimentalmente.

Propósito de la aplicación
===========================================

Este código se escribió para una aplicación bastante singular. El sistema en cuestión era una proteína con una cola flexible larga (de decenas de residuos) que no se veía en las estructuras cristalinas. La evidencia bioquímica sugería un sitio de unión concreto para la cola en una pareja de unión conocida (las dos parejas de unión también tenían una interfaz de unión conocida, distinta de esta cola). El código pretendía modelar el alcance de la cola flexible larga y determinar si el sitio de unión hipotético era plausible.

El protocolo es más útil para probar hipótesis sobre posibles conformaciones y para explorar el espacio de conformaciones accesibles que para encontrar «el único modo de unión verdadero». Si tu cola es realmente así de flexible, puede que no tenga «un único modo de unión verdadero».

La filosofía de FloppyTail: cómo usarlo en problemas difíciles
=============================================================

(Ten en cuenta que esta sección puede repetir parte de lo anterior o de la demo; se escribió para valerse por sí sola y se incluye aquí para la posteridad.)

FloppyTail está pensado para el «docking con restricciones».  Se puede usar cuando tienes uno o más dominios relativamente rígidos, con conectores flexibles que los unen o que están en sus extremos. En algunos casos, como el de la cola flexible original, la pregunta es «¿dónde podría esta cola acoplarse a la proteína rígida?».  En otros casos, como dos dominios con un conector entre ellos, podría ser «¿cómo deberían acoplarse estas dos proteínas, dado que algunas conformaciones son imposibles porque el conector no puede estirarse tanto?».

En general, FloppyTail entra en juego con conectores FLEXIBLES.  Esto tiene dos problemas.  Primero, la función de energía de Rosetta está parametrizada con proteínas cristalinas bien plegadas y para ellas. Solo funcionará hasta cierto punto con conectores flexibles, porque su visión de la física no admite proteínas solubles no estructuradas.  Segundo, los conectores flexibles son flexibles en el tiempo, pero una estructura estática no tiene dominio temporal, así que mirar el mejor modelo según la puntuación no aporta mucha información sobre el estado de la región del conector.  Por tanto, usar FloppyTail e interpretar sus resultados exige pensar con cuidado qué valor tienen esos resultados.  

Si tu objetivo es «tengo dos proteínas conectadas y quiero saber qué aspecto tendrán», es un problema caro y la tasa de éxito es marginal.  (Es igual de caro, con una tasa de éxito igual de marginal, hacer docking global y luego intentar resolver el loop, lo cual es una alternativa válida).

Si NO tienes datos experimentales sobre tu problema, puedes usar FloppyTail para generar hipótesis.  Revisa tu conjunto de resultados y fíjate en qué interacciones se repiten con frecuencia en los mejores modelos; luego piensa en formas de comprobar experimentalmente si esas interacciones son reales (quizá mediante entrecruzamiento o mutagénesis).  

Quizá tengas una idea de una conformación que podría existir y quieras comprobarla por computadora antes de probar el experimento.  En ese caso, prueba a usar restricciones para forzar la conformación que te interesa y ver si el sistema puede alojarla. Si obtienes modelos que aun así no tienen la interacción que querías, o que solo la logran con geometrías retorcidas, eso constituye un resultado negativo de FloppyTail.

Si tienes datos experimentales, ¡genial!  Las restricciones son el camino.  Ejecuta el código con restricciones y obtendrás modelos de mucha mayor calidad para alimentar nuevas hipótesis.  También puedes usar las restricciones para filtrar resultados sin restricciones, o simplemente para juzgar si la población de modelos es realista.  Esto te permite generar una «envolvente» de lo que el sistema podría estar haciendo de forma coherente con tus restricciones, que puede servir para nuevos ciclos de experimentos si hace falta.  

Algoritmo
=========

El algoritmo es bastante simple: movimientos small/shear/de fragmento en modo centroid para colapsar la cola hasta una conformación plegada a partir de una conformación inicial extendida que apunta en línea recta hacia el espacio, y movimientos small/shear con reempaquetado para refinar su posición. Conceptualmente es similar a cómo funciona el plegamiento abinitio, aunque no está refinado para ese fin (y no incluye programación de temperatura, etc.).

El código es compatible con restricciones durante la fase centroid (que se pasan por línea de comandos). El modelado inicial se hizo con restricciones y algunos pequeños trucos para guiar los modelos hacia el sitio de unión hipotético de la cola. Al final esto no fue necesario para el sistema original, pero el código conserva la capacidad de usar restricciones, etc. Tu experiencia puede variar. ACTUALIZACIÓN: el código es compatible con restricciones en ambas fases.

Limitaciones
===========

Este código NO está pensado para hacer «medio abinitio», es decir, cuando conoces la mitad de una estructura y quieres plegar la otra mitad. Aunque se basa en abinitio, solo se ha probado con una cola realmente flexible y desordenada, y no sé si es capaz de plegar estructuras compactas. Para ese fin no tiene soporte alguno.

Si quieres hacer un plegamiento ab initio estándar de una secuencia terminal, puedes usar el entorno [[RigidChunk|ClientMovers]] del [[Topology Broker|BrokeredEnvironment]]. Se puede usar en RosettaScripts o con la aplicación minirosetta. 


Archivos de entrada
===========

Consulta tests/integration/tests/FloppyTail/ para ver ejemplos de uso. Básicamente, lo único que necesitas es una estructura de entrada.

-   El código no tolera imperfecciones en el PDB de entrada. Elimina de antemano los heteroátomos, las regiones con ocupación 0, los átomos definidos varias veces y las aguas.
-   El código no añade la extensión por ti. Tienes que añadir coordenadas iniciales (aunque no tengan sentido) para la cola flexible. Yo la tenía apuntando recta hacia el espacio (como en la demo). Como alternativa, hay scripts de PyRosetta en scripts/pyrosetta/public/floppy_tail_utility/ que pueden actualizar conformaciones de entrada (con residuos desordenados presentes) para extenderlas o añadir colas al final o al principio (añaden los residuos desordenados por ti).
-   Consulta el formato de entrada de [[fragment file]] para ver cómo crear fragmentos.
-   Consulta el formato de entrada de [[constraint file]] para ver una explicación de los archivos de restricciones.

Consejos
====

Este código se concibió con un único propósito, pero puede funcionar si tienes una cola flexible similar. También puede modelar regiones flexibles internas entre dominios.

-   Es probable que necesites un gran número de trayectorias si tienes una cola larga. El protocolo se queda atrapado con bastante facilidad en conformaciones malas, incluso con el criterio de Metropolis. Las ejecuciones de producción para la publicación completaron algo menos de 30000 trayectorias en 1000 días de procesador con procesadores de 2.3 gigahercios. Estoy seguro de que esto puede optimizarse enormemente si quisieras. (Además, desde la publicación se corrigió un error en el código que reduce el tiempo de ejecución entre un 10 y un 25 %).
-   Las restricciones son una EXCELENTE forma de sesgar tu modelado para comprobar si una conformación hipotética es posible.
-   No uses la opción -publication a menos que estés haciendo la demo o repitiendo la publicación. Activa una función adicional de análisis específico del sistema (en esencia, los scripts de posprocesamiento están incrustados dentro del ejecutable). Estos fallarán si se ejecutan con entradas distintas del sistema E2/E3/UBQ esperado.
-   Este código es compatible con entrada de silent file, pero tienes que sortear las entradas basadas en numeración PDB que suponen numeración desde 1 y letras de cadena desde A. (¡Usa simplemente un PDB!)
-   Al modelar una región flexible terminal (una cola), en la fase de refinamiento se puede indicar al protocolo que modele una porción más corta de la cola durante parte del modo de refinamiento con las opciones short\_tail\_xxx. La razón es que la cola puede quedar demasiado cerca de una pareja de unión en la estructura recién salida del modo centroid, incluso con reempaquetado (los centroides tienden a ser algo demasiado pequeños para este tipo de docking). Al remodelar solo la punta de la cola en la primera parte del refinamiento, puedes relajar los choques sin volver a lanzar la cola hacia el espacio.
-   Las opciones short\_tail\_xxx, de restricciones y pair\_off no se usaron en las ejecuciones de producción con este código. Se usaron en experimentos iniciales, controles, depuración, etc. Siguen funcionando.
-   Los fragmentos son compatibles, pero no se vio que fueran necesarios. De todos modos, probablemente deberías ejecutar esto con una secuencia que tenga poca estructura secundaria, así que los fragmentos no serán muy útiles. En el caso de la publicación, el uso de fragmentos produjo hélices cortas dispersas en los resultados (claramente fragmentos en bruto) sin afectar a ninguna de las métricas importantes.
-   Haz de antemano una predicción de estructura secundaria y de desorden de tu cola flexible. Si no tiene preferencias de estructura secundaria, usa FloppyTail. Si tiene algunas hélices predichas, usa FloppyTail con fragmentos. Si tiene mucha estructura secundaria, usa abinitio.
-   Si tienes una sola cadena (una proteína) y la región flexible está más cerca del extremo N que del C, usa la opción C\_root para acelerar el cálculo. Vuelve a poner la raíz del fold tree en el extremo C, lo que evita mucho recálculo inútil de coordenadas de la parte rígida de la proteína (si la parte N es la que se mueve).
-   Debes usar la opción C\_root (o pasar un flexible\_start\_resnum de cero) al usar una cola N-terminal. De lo contrario, el primer residuo de la cola no tendrá movimiento en phi (indefinido en un extremo N) y el residuo se quedará fijo en el espacio de una forma probablemente no deseada.
-   Si modelas un complejo, asegúrate de que la región flexible tenga los números de residuo más altos o más bajos posibles: si es un extremo N, pon su subcomponente primero en el archivo PDB, o al revés si es C-terminal. Usa la opción C\_root si tu región flexible tiene un número de residuo más bajo, y no la uses si es más alto. Si tu complejo tiene más de dos componentes y estás modelando un conector entre ellos, la cadena del conector debe quedar entre los grupos de partes internamente rígidas en el archivo PDB de entrada.
-   force\_linear\_fold\_tree se combina con C\_root en la búsqueda del control perfecto sobre la cinemática del sistema. Usa force\_linear\_fold\_tree cuando necesites que el plegamiento avance de C a N entre cadenas, en lugar de saltar de un lado a otro.
-   FloppyTail ahora admite por completo el modelado de regiones conectoras internas (para el ensamblaje de dominios). Detecta las interfaces entre las porciones internamente rígidas y hace el empaquetado en consecuencia.

Opciones
=======

####Opciones de FloppyTail

-   -flexible\_start\_resnum - integer - es el inicio de la cola flexible en numeración PDB. (Más abajo verás que existe la opción de pasar en su lugar un archivo MoveMap).  Si usas esta opción, también debes usar -flexible_chain.
-   -flexible\_stop\_resnum - integer - es el final de la región flexible, en numeración PDB. Si no se usa esta opción, se toma toda la cadena a partir de flexible\_start\_resnum. (Más abajo verás que existe la opción de pasar en su lugar un archivo MoveMap).  Si usas esta opción, también debes usar -flexible_chain.
-   -flexible\_chain - string - el primer carácter de esta cadena de texto se interpreta como la cadena PDB de la región flexible; los demás caracteres se ignoran.
-   -shear\_on - real - En modo centroid, los movimientos shear son del todo improductivos al principio, cuando la cola aún está en gran parte extendida. Este valor da la fracción de ciclos centroid en los que se permitirán movimientos shear (se introducen en el conjunto de movimientos del RandomMover que elige los movimientos de perturbación). Por ejemplo, pasar 0.333 significa que durante el primer tercio del modo centroid no se permitirán movimientos shear.
-   -short\_tail::short\_tail\_fraction - real - Fracción de la cola que se usa en la parte de cola corta del modo de refinamiento. 0.1 significaría que la última décima parte de la cola es flexible. No es compatible con regiones flexibles no terminales.
-   -short\_tail::short\_tail\_off - real - Fracción de los ciclos de refinamiento dedicada a refinar solo la parte corta de la cola. 0.33 significa que el primer tercio de los ciclos de refinamiento se hará con la región flexible más corta.
-   -pair\_off - boolean - Si es true, desactiva los términos electrostáticos Epair (pair y fa\_pair). Se usa en un experimento de control, no para uso general.
-   -publication - boolean - Si es true, genera resultados específicos del sistema usados en la demo y la publicación. Usa FALSE para cualquier otro fin; este booleano activa código con referencias fijas a residuos concretos y provocará un fallo o un comportamiento absurdo en sistemas distintos de la demo o la publicación.
-   -FloppyTail::cen\_weights - string - Usa una función de puntuación centroid personalizada para el modelado de la etapa centroid.

####Opciones de control de la cinemática

-   -C\_root - boolean - Si es true, vuelve a poner la raíz del fold tree en el extremo C. Úsala si tienes una cola N-terminal.
-   -force\_linear\_fold\_tree - boolean - Fuerza un fold tree lineal. Usa C\_root y reordena las cadenas de tu PDB de entrada como se describió antes para asegurar una cinemática correcta.

####Opciones de control del muestreo de Monte Carlo

-   -FloppyTail::perturb\_temp - real - Temperatura de Monte Carlo para la fase de perturbación (se usó 0.8 en producción)
-   -FloppyTail::perturb\_cycles - unsigned integer - número de ciclos de la fase de perturbación (se usó 5000 en producción)
-   -FloppyTail::perturb\_show - boolean - si es true, genera Poses centroid tras la perturbación
-   -FloppyTail::debug - debug - si es true, genera Poses en cada ciclo de Monte Carlo
-   -FloppyTail::refine\_temp - real - Temperatura de Monte Carlo para la fase de refinamiento (se usó 0.8 en producción)
-   -FloppyTail::refine\_cycles - unsigned integer - número de ciclos de la fase de refinamiento (se usó 3000 en producción)
-   -FloppyTail::refine\_repack\_cycles - unsigned integer - Realiza un reempaquetado/minimización cada N ciclos del modo de refinamiento (se usó 30 en producción)

####Opciones generales: 

Se respetan todas las opciones del espacio de nombres packing que carga el PackerTask. Se respetan las opciones del espacio de nombres jd2. Se respeta cualquier cosa de muy bajo nivel, como las rutas de la base de datos.

-   -packing::resfile - string - [[Resfile|resfiles]] si quieres usar uno
-   -packing::repack\_only - boolean - Indica al código que no haga diseño. El diseño se hace por defecto porque los PackerTasks se comportan así.
-   -in::file::frag3 - string - [[Fragment file]] si lo tienes
-   -run::min\_type - string - Tipo de [[minimizador|minimization-overview]]. Se usó dfpmin\_armijo\_nonmonotone en producción.
-   -nstruct - integer - número de estructuras a generar
-   -constraints::cst\_file - string - [[Constraint file]] - para restricciones (fase centroid)
-   -constraints::cst\_weight - real - peso de las restricciones (fase centroid)
-   -constraints::cst\_fa\_file - string - [[Constraint file]] - para restricciones (fase de todos los átomos)
-   -constraints::cst\_fa\_weight - real - peso de las restricciones (fase de todos los átomos)

Modo de varios conectores flexibles
==============================

A partir de la versión 3.4, FloppyTail admite varios conectores flexibles. Para usarlos, tienes que escribir tu propio [[MoveMap file]] que le diga a FloppyTail qué es flexible, y pasarlo con la opción in:file:movemap. El formato se describe en el encabezado de la función core::kinematics::MoveMap::init\_from\_file (probablemente en core/kinematics/MoveMap.hh). Brevemente, haz lo siguiente:

```
RESIDUE 20 30 BBCHI
RESIDUE 54 67 BBCHI
```

para definir regiones flexibles que van de los residuos 20 a 30 y de 54 a 67. Esto usa la numeración interna de residuos de Rosetta (desde 1), no la numeración PDB.

Para usar esta función tampoco debes usar las siguientes opciones, porque el movemap gestiona esos datos, así que el programa está configurado para ignorar las entradas de estas opciones si se pasa un movemap.

-   flexible\_chain
-   flexible\_stop\_resnum
-   flexible\_chain
-   short\_tail\_fraction
-   short\_tail\_off

Posprocesamiento
===============

Usarás esta aplicación para modelar sobre todo regiones no estructuradas. No debes dar demasiado crédito a ningún modelo individual. Esta no es el tipo de aplicación que ejecutas 10 veces para luego tomar el resultado de mejor puntuación como una estimación precisa de la estructura real de la proteína.

En general, deberías elegir alguna métrica predicha por el modelo (si lees el artículo, verás que era una distancia entre dos residuos que más tarde se comprobó que podían entrecruzarse químicamente). Luego puedes explorar la población de modelos para ver cómo se ve esa métrica en la fracción de modelos con mejor puntuación. La funcionalidad extra\_analysis facilitará esto. Sugiero histogramas.

Cambios desde la última versión
==========================

En la 3.2 hubo un cambio importante interno que reduce el tiempo de ejecución y escala de forma favorable para colas muy largas. En el caso de la publicación, reduce el tiempo de ejecución entre un 10 y un 25 %.

En la 3.3 se añadió la opción publication por simplicidad. Se añadió la opción C\_root para acelerar el cálculo en colas que no son C-terminales. Las restricciones funcionan en modo de todos los átomos. Se añadió soporte completo para el ensamblaje de dominios (conectores internos).

En la 3.4 añadí la posibilidad de especificar un MoveMap personalizado, lo que también permite varias regiones rígidas y flexibles.

En la 3.5, FloppyTail se refactorizó como un Mover propiamente dicho en la biblioteca protocols; esto debería ser invisible para los usuarios finales.

##Véase también

* [[Fasta file]]: Formato de archivo Fasta
* [[Fragment file]]: Formato de archivo de fragmentos (necesario para la predicción de estructura ab initio)
* Aplicaciones de modelado de loops
  -  [[Loop modeling overview|loopmodel]]
  -  [[CCD loop modeling|loopmodel-ccd]]: Muestrea conformaciones de loops usando fragmentos y el algoritmo de cierre CCD.
  -  [[Kinematic loop modeling|loopmodel-kinematic]]: Muestrea conformaciones de loops usando el algoritmo de cierre cinemático.
  -  [[Next-generation KIC]]: Una versión más reciente del modelado de loops con cierre cinemático.
  -  [[KIC with fragments|KIC_with_fragments]]: La versión más reciente del modelado de loops, que combina el cierre cinemático con el muestreo de grados de libertad acoplados a partir de fragmentos.
  -  [[Loop closing]]: Cierre de rupturas de cadena introducidas durante el modelado.
  -  [[Stepwise assembly of protein loops|swa-protein-main]]: Genera modelos tridimensionales de novo de segmentos de proteínas    :  [[Stepwise assembly of long loops|swa-protein-long-loop]]: Para loops de más de 4-5 residuos. Consulta también  [[Stepwise monte carlo|stepwise]].
  -  [[Stepwise monte carlo|stepwise]]: Genera modelos 3D de loops, motivos e interfaces de proteínas, ARN y proteína/ARN. Versión estocástica del ensamblaje stepwise. 

* [[Structure prediction applications]]: Lista de otras aplicaciones para predicción de estructura
  * [[Abinitio relax]]: Aplicación para predecir estructuras de proteínas a partir de secuencias
    * [[Abinitio]]: Más detalles sobre esta aplicación
  * [[NonlocalAbinitio]]: Aplicación para predecir la estructura de una proteína a partir de información estructural previa
  * [[Membrane abinitio]]: Ab initio para proteínas de membrana.  
  - [[Comparative modeling|minirosetta-comparative-modeling]]: Construye modelos estructurales de proteínas usando una o más estructuras conocidas como plantillas de modelado (usa la aplicación minirosetta).
    * [[Minirosetta]]: Más información sobre la aplicación minirosetta.
  * [[Metalloprotein ab initio|metalloprotein-abrelax]]: Modelado ab initio de metaloproteínas.  
  - [[Backrub]]: Crea conjuntos de cadenas principales mediante cambios pequeños y locales en la cadena principal.  
  - [[Fold-and-dock]]: Predice estructuras tridimensionales de homooligómeros simétricos.  
  - [[Molecular replacement protocols|mr-protocols]]: Usa Rosetta para construir modelos para el reemplazo molecular en cristalografía de rayos X.  
    * [[Prepare template for MR]]: Script de preparación para los protocolos de reemplazo molecular.  
  - [[Relax]]: Optimiza «localmente» las estructuras, incluida la asignación de posiciones de las cadenas laterales.
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta

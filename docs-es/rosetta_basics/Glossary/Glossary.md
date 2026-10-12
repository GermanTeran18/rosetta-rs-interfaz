Glosario
========

Este glosario reúne muchos de los términos de Rosetta con definiciones breves
(de una frase a un párrafo). Verás definiciones de objetos
del código, conceptos de biofísica y trámites administrativos. Muchos de estos términos son términos
técnicos de la biología estructural con los matices particulares que se aplican en
Rosetta.

Consulta también una [[explicación más detallada de algunos temas|RosettaEncyclopedia]].

[[_TOC_]]

# **A**

Término  | Descripción
------------ | -------------
_ABEGO_ | Designación que indica la posición de un residuo en el espacio de Ramachandran (A = hélice alfa dextrógira o hélice 3<sub>10</sub>; B = hebras beta dextrógiras y conformaciones extendidas; E = hebras beta levógiras; G = hélices levógiras) y los ángulos omega *cis* (O). Consulta la cita [[aquí|http://www.ncbi.nlm.nih.gov/pubmed/8568871]].
_Predicción de estructura_ _Ab_ _Initio_ | Predicción de la estructura molecular dada únicamente su secuencia. Conocida también como **modelado de novo**. En Rosetta, el modelado _ab_ _initio_ usa información estadística del **PDB**, como **fragmentos** y **potenciales estadísticos**.
_Modelado AllAtom_ | Véase **fullatom**.
_Hélice alfa (Alpha Helix)_ | Un motivo común en la estructura secundaria de las proteínas; la hélice alfa (hélice α) es una conformación enrollada o en espiral dextrógira, en la que cada grupo N-H de la cadena principal cede un enlace de hidrógeno al grupo C=O de la cadena principal del aminoácido situado cuatro residuos antes (enlace de hidrógeno i+4 - i). Entre los tipos de estructura local de las proteínas, la hélice α es la más regular y la más predecible a partir de la secuencia, además de la más frecuente.
Análogo (Analogue) | Proteínas similares sin relaciones evolutivas. Véase también **homólogo**. El **modelado por homología** de Rosetta en realidad no necesita relaciones evolutivas estrictas y puede usar **análogos** como **plantillas**.
Secuencia anotada (Annotated Sequence) | Rosetta registra a menudo la secuencia de una proteína con los códigos de aminoácidos de una letra, ampliándola cuando es necesario con corchetes para indicar parches como las modificaciones postraduccionales.
_Atom_ | Una clase que almacena la posición cartesiana de un átomo en un Residue.
_Atom Tree_ | El árbol de átomos conecta los átomos de la **Pose** y se usa para convertir **coordenadas internas** en **coordenadas cartesianas**. Normalmente se deriva del **fold tree**.
_AtomTree_ | Clase de core::kinematics para definir la conectividad atómica.
_AtomType_ | Una clase que almacena las propiedades de un tipo concreto de átomo (p. ej., un oxígeno de carboxilato). Consulta [[Rosetta AtomTypes]] para más detalles.

----------------------------------------

# **B**

Término  | Descripción
------------ | -------------
_Factor B (B factor)_ |El «factor de temperatura» de la cristalografía que se ve en los archivos PDB; cuanto mayor es el valor, más «flexible» es el átomo
_Cadena principal (Backbone)_ | En los **biopolímeros**, la cadena principal son los átomos que forman la cadena polimérica. En las proteínas son los átomos N, CA, C y O y sus hidrógenos. En los ácidos nucleicos son el fosfato y los azúcares. Véase también **main chain** 
_Backrub_ | Un cambio en los ángulos de torsión que se observa de forma habitual en estructuras en solución.  Un cambio en un diedro se compensa con cambios en los diedros anterior y siguiente.  Este «movimiento» fue implementado como protocolo de muestreo de la cadena principal por Tanja Kortemme.
_Base_ | La parte de un nucleótido que no es la **cadena principal**. Análoga a la **cadena lateral** de una proteína.
_Estudio de benchmark (Benchmark Study)_| Pruebas realizadas para confirmar el rendimiento de un nuevo algoritmo o método; los resultados se comparan con resultados anteriores obtenidos con los mismos datos de partida
_Lámina beta (Beta Sheet)_ | Un motivo común en la estructura secundaria de las proteínas; la lámina beta (lámina β) es una estructura extendida mayormente plana, formada por cadenas extendidas individuales (posiblemente no consecutivas) (hebras β) unidas por enlaces de hidrógeno alternos.  
_Afinidad de unión o energía de unión (Binding-Affinity or Binding-Energy)_ | Cuán fuertemente están asociadas dos moléculas entre sí.
**Interfaz de unión (Binding Interface)** | El punto de contacto entre dos moléculas. Una definición común en Rosetta es cualquier residuo cuyo átomo C-beta o cualquier átomo pesado esté a menos de 6 ångström de la otra pareja de unión.
_Biopolímeros (Biopolymers)_ | Moléculas poliméricas importantes para los sistemas biológicos. Los biopolímeros típicos son las proteínas, el ARN, el ADN y los carbohidratos. 
_Docking ciego (Blind Docking)_ | Docking en el que se desconoce la estructura del complejo acoplado.
_Bootcamp_ | Una intensa sesión de formación de Rosetta de una semana para nuevos desarrolladores. 
_Docking con estructura unida (Bound Docking)_ | La estructura del complejo que se usa como referencia en el docking y en los cálculos de rmsd se determina experimentalmente por rayos X/RMN. 
_Ramas (Branches)_ | Un término de desarrollo usado en el control de versiones del código. Véase trunk.
_Coordenadas cartesianas (Cartesian Coordinates)_ | Coordenadas con posiciones espaciales especificadas por coordenadas xyz. Contrasta con las **coordenadas internas**. La conversión entre ambas es la **cinemática**. 
_Minimización cartesiana (Cartesian Minimization)_ | **Minimización por gradiente** basada en mover átomos en el espacio cartesiano xyz, en lugar de con **coordenadas internas**. Esto requiere un término adicional (cart_bonded) para mantener las longitudes y ángulos de enlace en valores casi ideales.

-------------------------

# **C**

Término  | Descripción
------------ | -------------
_CCD_ | Descenso de coordenadas cíclico (Cyclic coordinate descent). Un protocolo de **cierre de loops** en el que los diedros de la cadena principal se ajustan progresivamente para minimizar el hueco en la cadena principal del loop. [Añadir una referencia]
_Centroid_ |Un modo de representación reducida, usado para simplificar la representación del sistema y permitir un muestreo y una puntuación más rápidos. Para las proteínas, cada residuo se representa con cinco **átomos de la cadena principal** (N, CA, C, O y el hidrógeno polar del N) y un pseudoátomo, el «centroide», que representa la **cadena lateral**. [Explicar con más detalle cómo se calcula el centroide.] *Gray et al., J. Mol. Biol. (2003) 331, 281–299*
_Cadena (Chain)_ | En Rosetta, una cadena es una única molécula conectada covalentemente. Internamente se almacena como un número. En el formato **PDB**, una cadena es el conjunto de residuos que comparten una etiqueta de identificación de cadena.
_Ruptura de cadena (Chainbreak)_ | Un hueco en la conectividad (en el AtomTree) entre residuos conectados químicamente o adyacentes en la secuencia.  Se usan en el cierre de loops por CCD (descenso de coordenadas cíclico).
_ChemicalManager_ | Una clase singleton de Rosetta que lleva el control de cosas como los ResidueTypeSets.
_ángulos chi (chi angles)_ | Los ángulos chi son los **ángulos diedros** que controlan las posiciones de los **átomos pesados** de los componentes de **cadena lateral** de los residuos. En los carbohidratos, son los grupos OH rotables.
_chi1, chi2, chi3 y chi4_ | **Ángulos chi** específicos de las cadenas laterales de los residuos de proteína. Se enumeran desde el átomo C-alfa hacia fuera, de modo que chi1 sería el **diedro** entre N-Ca-Cb-Cg.
_choque (clash)_ | Dos (o más) átomos demasiado cercanos para ser energéticamente favorables (básicamente un solapamiento de los radios de van der Waals)
_agrupamiento (cluster)_ | El agrupamiento de estructuras consiste en agrupar estructuras «similares». Estos grupos de estructuras similares se denominan «clústeres». La medida de similitud de estructuras suele ser el **RMSD** o el **GDT**.  
_grano grueso (coarse grain)_ | Modelado inicial, en el que puede que no estén representados todos los átomos o términos de energía. 
_commit_ | Un término relacionado con el uso del control de versiones. Un commit es cuando subes tus cambios desde tu equipo a la fuente de código común.
_modelado comparativo (comparative modeling)_ | Predicción de la estructura de una proteína a partir de la secuencia y de las estructuras de proteínas muy relacionadas. También llamado «modelado por homología»
_conformación (conformation)_ | La organización tridimensional de los átomos en una estructura.
_Conformation_ | Una clase que contiene objetos Residue y el FoldTree. Es la parte de la Pose que lleva el control de las coordenadas. La capa cinemática la enlaza para describir el plegamiento en coordenadas internas.
_confórmero (conformer)_ | Una de un conjunto de orientaciones tridimensionales de un ligando, una molécula pequeña o una cadena lateral de aminoácido. A veces se le llama en Rosetta «rotámero».
_restricción (constraint)_ | Cuando se usa con Rosetta, en realidad es un «restraint»: un ajuste de la función de puntuación para tener en cuenta información geométrica adicional
_orden de contacto (contact order)_ | Tomado de "Contact order and ab initio protein structure prediction," Bonneau et. al, Protein Science (2002), 11:1937-1944: «El CO relativo es la separación media en la secuencia de los residuos que forman contactos en la estructura tridimensional dividida por la longitud de la proteína.» 
_Evaluación crítica de la predicción de interacciones (Critical Assessment of PRediction of Interactions, CAPRI)_ | Las interacciones proteína-proteína y otras interacciones entre macromoléculas son esenciales para todos los aspectos de la biología y las ciencias médicas, y se han desarrollado varios métodos para predecirlas. [CAPRI](http://www.ebi.ac.uk/msd-srv/capri/) es un experimento a escala de toda la comunidad diseñado para evaluar los que se basan en la estructura. Desde que CAPRI comenzó en 2001, el experimento ha tenido de dos a cuatro rondas de predicción cada año, con uno o unos pocos objetivos por ronda.
_Evaluación crítica de técnicas de predicción de estructuras de proteínas (Critical Assessment of Techniques for Protein Structure Prediction, CASP)_ | Los experimentos de [evaluación crítica de la predicción de estructuras de proteínas](http://predictioncenter.org/) (CASP) tienen como objetivo establecer el estado actual de la técnica en la predicción de estructuras de proteínas, identificar qué progresos se han hecho y destacar dónde puede centrarse de forma más productiva el esfuerzo futuro. CASP se celebra cada dos años desde 1994. Rosetta ha participado en varios experimentos CASP.
_vecinos cristalinos (crystal neighbors)_ | ¿Es la estructura cristalina una llamada estructura nativa? El cristal está compuesto aproximadamente por un 40\~70% de moléculas de agua, lo que da confianza a los cristalógrafos para afirmar que las proteínas en la red cristalina deberían poder representar a las proteínas en entornos biológicos, especialmente cuando las proteínas de la red cristalina suelen ser capaces de experimentar las reacciones biológicas de las que son capaces en las células. Sin embargo, hay un artefacto inevitable en la red cristalina: las regiones donde las proteínas son adyacentes entre sí, formando los llamados contactos cristalinos. Las conformaciones de las regiones donde las proteínas tienen contactos de algún modo se alteran en cierta medida. Rosetta a veces es capaz de muestrear conformaciones cuyo RMSD está a 3 o 4 Å de la «estructura cristalina nativa» pero que tienen energías más bajas, lo que resulta de variaciones de una sección de loop. Y esta región de loop resulta estar situada en el punto donde ocurre el contacto cristalino. Por tanto, ahora estamos replanteándonos nuestra definición de «estructura nativa», donde se supone que la estructura nativa es la conformación de la proteína que existe en la célula.
_determinación de fases cristalográficas (crystallographic phasing)_ | El paso crítico para resolver una estructura cristalina es obtener la fase, ya sea mediante reemplazo molecular o mediante métodos experimentales. La forma técnicamente más fácil de obtener la fase es el método de reemplazo molecular, en el que los cristalógrafos utilizan estructuras existentes con altas similitudes estructurales para ayudar a guiar la búsqueda de la fase. Sin embargo, en algunos casos difíciles, donde no existen estructuras estructuralmente similares, o las estructuras tienen identidades de secuencia demasiado bajas (por debajo del 15\~20%), los cristalógrafos tienen que obtener la fase mediante métodos experimentales, que son mucho más tediosos y difíciles en comparación con el método de reemplazo molecular. Rosetta puede generar o refinar modelos usando un campo de fuerza de todos los átomos físicamente realista, lo que a veces puede generar modelos comparativos más precisos. Para algunos de esos casos difíciles, Rosetta es por tanto capaz de proporcionar mejores modelos de búsqueda iniciales para que el reemplazo molecular encuentre las soluciones. ref: Qian et. al. High-resolution structure prediction and the crystallographic phase problem. Nature 450, 259-264 (2007)
_CxxTest_ | Este es el marco que usamos para las [[unit tests]]. Véase también <https://github.com/CxxTest/cxxtest>.

--------------------------

# **D**

Término  | Descripción
------------ | -------------
_base de datos (database)_ | El directorio de la base de datos de Rosetta contiene parámetros clave de Rosetta. Ejemplos de información almacenada son el campo de fuerza, la definición de monómeros (véase: **tipos de residuo**), la representación del modelo, parámetros de constantes fundamentales, etc. 
_ddG_ | También conocido como ΔΔG. El cambio de la energía libre de unión (ΔG) al producirse una mutación. 
Modelado _de_ _novo_ | Predicción de la estructura molecular dada únicamente su secuencia. Conocida también como **predicción de estructuras ab initio**.
_decoy_ | Un **modelo** producido por un protocolo computacional.
_mapa de densidad (density map)_ | Datos experimentales que muestran dónde están los electrones (y por tanto los átomos).
_diseño (design)_ | Optimización de la secuencia de aminoácidos de una proteína.
_devel_ | devel es una de las bibliotecas del proyecto Rosetta. Contiene código documentado y probado, pero no necesariamente validado científicamente para funcionar bien: código todavía en *devel*opment (desarrollo). No está disponible en la versión publicada.  Debería eliminarse.
_ángulo diedro (dihedral angle)_ | Un ángulo de cuatro cuerpos que codifica la orientación respectiva de dos átomos alrededor del eje que conecta otros dos átomos. Conocido también como **torsión**.
_disulfuros (disulfides)_ | La unión covalente de dos residuos de cisteína muy próximos. Esto depende de que la proteína esté en un entorno oxidante (como el exterior de la célula) en lugar de un entorno reductor (como el interior de la célula). Esta unión covalente puede estabilizar enormemente el plegamiento de una proteína. 
_docking <a name="docking" />_ | Ensamblar dos proteínas separadas (o proteína-ligando, proteína-superficie) en su estructura biológicamente relevante y encontrar la menor energía libre del complejo.
_embudo de docking (docking funnel)_ | Un embudo de energía (puntuación frente a RMSD) para ejecuciones de docking.
_biblioteca de Dunbrack (Dunbrack library)_ | Una biblioteca de rotámeros de cadena lateral compilada por el laboratorio Dunbrack; la biblioteca de rotámeros estándar de Rosetta.
_optimización de loops de Dunbrack (Dunbrack loop optimization)_ | Véase **CCD**
_puntuación de Dunbrack (Dunbrack score)_ | Término de energía estadístico del rotámero (-log(p), donde p es la probabilidad del rotámero dado.)

--------------------------------
# **E**

Término  | Descripción
------------ | -------------
_Energies_ | Una clase de Pose que almacena las energías calculadas por la ScoreFunction.
_función de energía (energy function)_ | También llamada «función de puntuación». La predicción de la energía estructural sobre la que opera Rosetta.
_embudo de energía (energy funnel)_ | Un intento de representar el paisaje de energía de la proteína. Un gráfico que (idealmente) muestra que las estructuras con bajo rmsd tienen energías más bajas que las estructuras con alto rmsd.
_paisaje de energía (energy landscape) <a name="general-terms_energy-landscape" />_ | [Consulta esta página (http://www.eoht.info/page/Energy+landscape)
_conjunto (ensemble)_ | un grupo de estructuras muy relacionadas
_EnergyMethod_ | La clase que implementa la puntuación de un **término de energía** concreto para la **ScoreFunction**.
_agua explícita (explicit water)_ | Agua modelada como átomos, en lugar de implícitamente.
_ex1/ex2_ | Opciones que especifican el tamaño (muestreo extra) de la biblioteca de rotámeros utilizada

--------------------------------------

# **F**

Término  | Descripción
------------ | -------------
_fasta_ |Formato basado en texto que describe la secuencia peptídica de una proteína, con códigos de aminoácidos de una letra
_filtro (filter)_ | Una comprobación de aprobado/suspenso de la calidad de la estructura en mitad de una ejecución. Los filtros se aplican para evitar desperdiciar tiempo de cómputo en **trayectorias** que es poco probable que den resultados satisfactorios. Se calculan las **métricas** relevantes y se descartan las estructuras con valores deficientes. 
_fixbb_ | Una aplicación de Rosetta que hace diseño con cadena principal fija.
_diseño con cadena principal fija (fixed backbone design)_ | **Diseño** de una proteína en el que la **cadena principal** no se mueve durante el rediseño.
_empaquetado con cadena principal fija (fixed backbone packing)_ | Optimización (**empaquetado**) de las conformaciones de las cadenas laterales, realizada sin mover la **cadena principal**.
_archivo de opciones (flag(s) file)_ | También **archivo de opciones**: un archivo que contiene un conjunto de opciones (posiblemente con sus parámetros respectivos) para controlar el programa o protocolo. Puedes cargarlo como una opción al iniciar el programa, en lugar de escribir todas las opciones en la línea de comandos.
_diseño con cadena principal flexible (flexible backbone design)_ | **Diseño** de una proteína en el que se permite que la **cadena principal** se mueva durante el diseño.
_empaquetado con cadena principal flexible (flexible backbone packing)_ | Optimización (**empaquetado**) de las conformaciones de las cadenas laterales, en la que se permite que la **cadena principal** se mueva durante la optimización.
_FoldTree (fold tree)_ | Un grafo dirigido acíclico (árbol) que conecta todos los residuos de la **Pose**. El fold tree es la descripción a nivel de residuo de cómo se interconvierten las **coordenadas internas** y las **coordenadas cartesianas**, y de cómo se propagan los cambios entre residuos. Cambiar el diedro de un residuo cambiará las coordenadas cartesianas de todos los residuos «aguas abajo» en el fold tree, debido a los efectos de **brazo de palanca**. Al cambiar el fold tree puedes limitar la propagación de estos efectos, manteniendo fijas porciones de la cadena principal de la proteína que normalmente se moverían. Véanse también **atom tree** y **cinemática**.
_campo de fuerza (force field)_ | Véase **función de puntuación**.
_fragmento (fragment)_ | Una sección de una proteína. El uso típico en Rosetta son fragmentos de la **cadena principal** de 3 y 9 residuos seleccionados de estructuras del **PDB**. 
_inserción de fragmentos (fragment insertion)_ | Colocar en la estructura los **diedros** de la cadena principal de un **fragmento**. Se usa con frecuencia para el **modelado de loops** y **ab initio**.  
_fragment picker_ | Una aplicación de Rosetta que se usa para seleccionar fragmentos. 
_fullatom_ | También «todos los átomos»: una representación de la proteína en la que todos los átomos físicos (incluidos los hidrógenos) están presentes durante el modelado, en contraste con representaciones reducidas como el modo **centroid**.
_función de energía de todos los átomos (full-atom energy function)_ | Los términos de energía y las interacciones se calculan a escala atomística (por pares átomo-átomo).  A diferencia de un modo de representación reducido como centroid.

-----------------

# **G**

Término  | Descripción
------------ | -------------
_GDT_| Global Distance Test. Una métrica usada en CASP en lugar del **RMSD**, que es menos sensible a las regiones de estructura sin alinear. [Insertar referencia aquí]
_GDTMM_ | Un nombre de GDT específico de Rosetta. 
_Git_ | Uno de los sistemas de control de versiones distribuido más ampliamente usados, utilizado para el control de versiones del código de Rosetta. Desarrollado originalmente para el desarrollo de Linux por Linus Torvalds. Usamos GitHub para el alojamiento.
_Gollum_ | [Gollum](http://github.com/gollum/gollum#gollum----a-wiki-built-on-top-of-git) (enlace externo) es una wiki basada en Git, utilizada para crear esta wiki que estás leyendo.
_mínimo global (global minimum)_ | La conformación tridimensional de una proteína que corresponde al estado de energía más bajo posible; esta es (normalmente) la conformación que se encuentra en la naturaleza.

-----------------------------------------------

# **H**

Término  | Descripción
------------ | -------------
_hard rep_ | Repulsión normal de Lennard Jones; se usa en contraste con **soft_rep**.
_átomo pesado (heavy atom)_ | Todos los átomos excepto los hidrógenos.
_homólogo (homologue)_ | Proteínas relacionadas evolutivamente. Suelen tener estructura y secuencias similares, pero no necesariamente. Dentro de Rosetta, sin embargo, solo nos interesan los homólogos que son similares en estructura. Los que son similares en secuencia pero no en estructura no son necesariamente útiles, aunque las proteínas que comparten más del 20-25% de su secuencia suelen ser estructuralmente similares. (La región del 20-25% se llama la «zona crepuscular» de la homología.) Una proteína estructuralmente similar pero no relacionada evolutivamente es un análogo.
_modelado por homología (homology modeling)_ | El modelado por homología de una proteína consiste en construir un modelo de resolución atómica de la proteína «objetivo» a partir de su secuencia de aminoácidos y de una estructura tridimensional experimental de una proteína homóloga relacionada (la «plantilla»). El modelado por homología se basa en la identificación de una o más estructuras de proteínas conocidas que probablemente se parezcan a la estructura de la secuencia de consulta, y en la producción de un alineamiento que asigne los residuos de la secuencia de consulta a los residuos de la secuencia de la plantilla. Relacionado con el threading.

# **I**

Término  | Descripción
------------ | -------------
_idealización (idealization)_ | Rosetta normalmente solo trabaja cambiando ángulos **diedros**. El programa de aplicación idealize carga el archivo pdb y reemplaza todas las longitudes de enlace y los ángulos planos por los valores definidos en la base de datos de Rosetta. El resultado de esta simulación no es determinista, por lo que pueden intentarse muchas ejecuciones. Véase también **minimización cartesiana**, que trabaja con longitudes y ángulos de enlace no ideales.  
_grafo de interacciones (interaction graph)_ |  Una representación de las interacciones de la proteína durante el empaquetado; puede afectar a la velocidad de la simulación
_interfaz (interface)_ | La región de una estructura donde interactúan dos cadenas
_coordenadas internas (internal coordinates)_ | Almacenamiento de las posiciones de los átomos basado en longitudes de enlace, ángulos y diedros, en lugar de **coordenadas cartesianas** (coordenadas xyz). La conversión entre ambas es la cinemática.

-------------------------

# **J**

Término  | Descripción
------------ | -------------
_jump_ | Una parte del **fold tree** que representa un movimiento de cuerpo rígido (no covalente).

-------------------------

# **K**

Término  | Descripción
------------ | -------------
_potenciales basados en el conocimiento (knowledge-based potentials)_ | También «potenciales estadísticos»: términos de la función de energía basados en la probabilidad de aparición en un conjunto de datos

-------------------------

# **L**

Término  | Descripción
------------ | -------------
_Lennard-Jones_ | También «LJ»: Una función que aproxima las interacciones no enlazantes de átomos neutros; combina la repulsión de Pauli y el término atractivo de van der Waals (también conocido como potencial de Lennard Jones 6-12)
_ligando (ligand)_ | Una molécula que se une a una proteína; para Rosetta es específicamente una molécula pequeña no polimérica
_mínimo local (local minimum)_ | El estado tridimensional de menor energía de una proteína en un entorno de conformaciones similares; puede haber muchos mínimos locales de una proteína, pero solo un mínimo global.
_loop_ | Estructuralmente, una región de loop es una combinación de ángulos phi-psi que está en una cierta zona del gráfico de Ramachandran. Los loops están definidos de forma muy laxa: una definición de trabajo es la estructura secundaria que no está definida ni como hélice alfa ni como lámina beta. [XXX: Aquí vendría bien una imagen] En el código de Rosetta, un loop es cualquier cosa entre dos extremos fijos que quieras modelar. Esto suele corresponder a la definición estructural de los loops, pero también puede referirse a regiones que no lo son. 
_baja energía (low energy)_ | Un modelo tridimensional de una proteína es de baja energía si tiene buen empaquetado, residuos polares o cargados satisfechos, moléculas pequeñas o ligandos colocados adecuadamente, etc.  Sin embargo, puede que haya que minimizarlo en la función de energía dada antes de seguir usándolo, para evitar artefactos. 
_baja resolución (low Resolution)_ | Una estructura de una proteína determinada experimentalmente es de baja resolución si los átomos no son distinguibles; típicamente esto equivale a una resolución de estructura cristalina superior a 3-4 ångström.

-------------------------

# **M**

Término  | Descripción
------------ | -------------
_cadena principal (main chain)_ | Se usa indistintamente con átomos de la cadena principal (backbone).
_criterio de Metropolis (Metropolis criterion)_ | Usado por los métodos Monte Carlo, esta ecuación indica si se debe aceptar o rechazar un movimiento aleatorio
_MiniCON_ | Era la reunión de invierno de desarrolladores de Rosetta, que se movía por el país para ser organizada por distintos laboratorios de RosettaCommons. Discutíamos problemas de código de interés amplio y limitado. El nombre ha cambiado a Winter RosettaCON.
_minimización (minimization)_ | Optimizar la estructura de la proteína haciendo pequeños movimientos hacia conformaciones de menor energía
_minirosetta_ | El nombre del proyecto Rosetta3 durante el desarrollo inicial. También, el nombre de un programa envoltorio que expone múltiples protocolos, usado principalmente para Rosetta@Home.
_MiniRosettaCON_ | Véase MiniCON.
_mmCIF_ | Macromolecular Crystallographic Information File, formato de archivo usado para describir la estructura tridimensional de una proteína
_modelo (model)_ | Una representación de la estructura tridimensional de una proteína. «Todos los modelos son erróneos, pero algunos son útiles» George Box
_formato MOL (MOL format)_ | Un tipo de archivo que contiene información sobre la estructura de una sustancia química; igual que el «formato SDF»
_MolProbity_ | [[MolProbity|http://molprobity.biochem.duke.edu/]] es un servidor web de uso general que ofrece validación de calidad de estructuras 3D de proteínas, ácidos nucleicos y complejos. Proporciona un análisis detallado de contactos de todos los átomos de cualquier problema estérico dentro de las moléculas, así como diagnósticos actualizados de ángulos diedros, y puede calcular y mostrar los enlaces de hidrógeno y los contactos de van der Waals en las interfaces entre componentes. *MolProbity: all-atom contacts and structure validation for proteins and nucleic acids, Davis et al., Nucleic Acids Res. 2007 July; 35(Web Server issue): W375–W383.*
_monómero (monomer)_ | Proteína monomérica
_método Monte Carlo (Monte Carlo method)_ | Los métodos Monte Carlo son una clase de algoritmos computacionales que se basan en el muestreo aleatorio repetido para calcular sus resultados. En Rosetta, los métodos Monte Carlo se usan con frecuencia para muestrear: rotámeros en el reempaquetado, aminoácidos en el diseño, fragmentos en el plegamiento y otros numerosos cambios químicos. (Explicar los detalles de Monte Carlo en Rosetta)
_MoveMap <a name="movemap" />_ | Una clase de Rosetta que contiene listas de grados de libertad móviles e inmóviles. Normalmente se usa durante la minimización para especificar qué partes de la Pose pueden minimizarse. (p. ej., para minimización con cadena principal fija)
_Mover_ | Una clase abstracta y progenitora de todos los protocolos. Todos los protocolos de Rosetta tienen que heredar de esta clase e implementar la función apply, que luego altera la Pose e implementa el protocolo.

-------------------------

# **N**

Término  | Descripción
------------ | -------------
_estructura nativa (native structure)_ | La estructura de una proteína, ligando, etc. que se encuentra en la naturaleza; normalmente se refiere a la estructura cristalina o de RMN de una proteína
_NNMAKE_ | Una versión anterior de la aplicación **fragment picker**.
_nstruct_ |El número de modelos que Rosetta producirá como salida

-------------------------

# **O**

Término  | Descripción
------------ | -------------
_opciones (options)_ | Indicaciones especificadas por el usuario que se dan a Rosetta, ya sea mediante la línea de comandos o mediante el archivo de opciones; a veces se llaman «flags»

-------------------------

# **P**

Término  | Descripción
------------ | -------------
_PackerTask_ | Una clase que establece lo que se permite en el empaquetado.
_empaquetado (packing)_ | En Rosetta, la optimización de la conformación (e identidad) de las cadenas laterales de la proteína. El Packer de Rosetta usa recocido simulado Monte Carlo de Metropolis para optimizar rotámeros.
_densidad de empaquetado (packing density)_ | Cuán cerca están los átomos entre sí; cuanto más cerca, mejor, hasta cierto punto
_archivo params (params file)_ | Un archivo que le dice a Rosetta cómo se comporta un residuo.
_Parser_ | Otro nombre para RosettaScripts
_archivos de parche (patch files)_ | Un archivo que hace un pequeño ajuste a una función de puntuación
_PDB_ | Puede referirse al Protein Data Bank, un sitio web que contiene información estructural de proteínas, normalmente determinada por cristalografía de rayos X o RMN. O PDB puede referirse al tipo de archivo que usa el Protein Data Bank para representar la estructura tridimensional de una proteína
_phi_ | El ángulo diedro que describe la posición de los átomos C-N-Calpha-C
_aplicaciones piloto (pilot apps)_ | Aplicaciones de Rosetta escritas por la comunidad que todavía no se han publicado oficialmente. 
_Pose_ | Representa una estructura molecular en Rosetta (de proteínas, ARN, etc.) y contiene todas sus propiedades, como Energies, **FoldTree**, Conformation** y más. Todos y cada uno de los **Mover** de Rosetta operan sobre una Pose a través de su función *apply*.
_protocolo (protocol)_ | Flujo de trabajo para hacer cálculos específicos en Rosetta; a veces un protocolo usa **movers**. 
_psi_ | El ángulo diedro que describe la posición de los átomos N-Calpha-C-N

-------------------------

# **R**

Término  | Descripción
------------ | -------------
_ReferenceCount_ | ReferenceCount era la clase central del sistema de punteros inteligentes que usó Rosetta3 hasta 2015.  Casi todas las clases de Rosetta heredan en última instancia de esta clase.  La clase se mantiene como una clase vacía, porque era demasiado difícil de quitar tras la transición de Luki Goldschmidt a nuestros [[punteros inteligentes más nuevos|development_documentation/tutorials/How to-use-pointers-correctly]], y porque tener una clase base para casi todas las clases es útil para el DataCache de la Pose.
_refinamiento (refinement)_| Partiendo de un modelo de baja resolución, usar la **función de energía** de **todos los átomos** para modificar la conformación de modo que se acerque más a una estructura determinada experimentalmente.
_relax_ | Un protocolo de Rosetta que optimiza la estructura de la proteína
_publicación (release)_ | Las publicaciones son cuando ponemos el código de Rosetta a disposición de los usuarios académicos e industriales.  El código de trunk se copia a una rama en git, se limpia para eliminar el código que no puede publicarse (normalmente devel y pilot_apps), y luego se publica para un uso más amplio.  Actualmente seguimos un calendario de «publicación semanal», en el que se produce una nueva publicación más o menos cada semana. (No es todas las semanas, porque en algunas semanas el código no supera nuestras medidas de control de calidad.)
_reempaquetado (repack)_ | Determinar la conformación de las cadenas laterales que minimiza la energía
_representación (representation)_ | Cómo ve Rosetta una molécula de proteína. Rosetta admite dos representaciones: 1. **fullatom**: representación de todos los átomos, lenta pero precisa. 2. **centroid**: una representación reducida, más rápida pero menos precisa.
_término repulsivo (repulsive term)_ | fa_rep: La parte de la ecuación de Lennard Jones que describe los efectos del solapamiento de orbitales electrónicos; la energía será positiva
_resfile_ | El [[resfile|resfiles]] es un formato de archivo que se usa para pasar manualmente instrucciones complejas al [[packer]] / [[PackerTask|packer-task]].
_residuo (residue)_ |Cada Pose/Conformation se descompone en pequeñas unidades llamadas «Residues», que pueden ser aminoácidos, ácidos nucleicos o cualquier grupo de átomos con ciertas reglas sobre lo que son y cómo están conectados, como un fragmento de ligando químico pequeño. El contenido químico de un Residue se almacena en un objeto llamado «ResidueType» y, además de eso, cada Residue tiene otros datos que almacenan la información real de coordenadas de cada átomo que contiene, así como datos relacionados con las coordenadas, como los ángulos de torsión de la cadena principal y de la cadena lateral, la posición en la secuencia, etc. Por ejemplo, en una proteína puede haber varios residuos de leucina, cada uno de los cuales será un objeto «Residue» individual. Cada Residue de Leu tiene sus propios datos de coordenadas, pero todas las Leu tendrán el mismo ResidueType de Leu, que contiene información sobre cuáles son los átomos, sus nombres, elementos químicos y conectividad. Esta organización permite también que un rotámero de cadena lateral se represente simplemente como un Residue.
_tipos de residuo (residue types)_ | Un conjunto de átomos definido para cada residuo conocido por Rosetta. El conjunto define también los enlaces y la geometría local. Los datos se almacenan en la **base de datos**). Cada tipo de residuo normalmente tiene objetos ResidueType distintos para cada una de las diferentes **representaciones** de Rosetta.
_Residue_ | Una clase de Rosetta que almacena las coordenadas y los detalles de un residuo específico de una **Pose**.
_ResidueType_ | Una clase de Rosetta que especifica cómo se comporta químicamente un residuo concreto. No contiene las coordenadas del residuo (que se almacenan en un objeto **Residue**), sino cosas como la conectividad química y las propiedades de los átomos.
_ResidueTypeSet_ | Una clase que contiene una colección de **ResidueTypes** todos del mismo tipo. Los ResidueTypeSets estándar son **centroid** y **fullatom**.
_restricciones (restraints)_ | Ajustes de la función de energía; a menudo llamados «constraints» en Rosetta
_REU_ | Rosetta Energy Units (unidades de energía de Rosetta): el término de energía arbitrario de Rosetta, que no se corresponde con mediciones de energía físicas. Con REF2015, el REU está ahora optimizado para aproximarse a kcal/mol
_cuerpo rígido (rigid-body)_ | No hay flexibilidad intramolecular entre los átomos de la cadena principal de la proteína, o los enlaces y ángulos están congelados para la cadena principal.
_revisión de Rohl (Rohl review)_ | Este término se refiere a Rohl et. al., 2004, [Protein structure prediction using Rosetta (http://www.ncbi.nlm.nih.gov/pubmed/15063647), el primer artículo de revisión de Rosetta.  Véase su entrada en el [[Rosetta Canon]].
_desviación cuadrática media (root mean square deviation, RMSD)_ | [No basta con explicar cómo se calcula el RMSD: también es importante comentar qué importancia tiene en Rosetta y qué valores cabe esperar al calcularlo en distintos lugares.] 
_Robetta_ | Una herramienta en línea y automatizada para la predicción y el análisis de estructuras de proteínas.
_Rosetta_ | ¿El mejor software de todos los tiempos? ¿O simplemente el más fácil de usar? ¡Tú decides!
_Rosetta++_ |Rosetta++ fue la edición 2.x de Rosetta. Se llama así porque estaba en C++, como traducción automática asistida por humanos del Rosetta original en FORTRAN.
_artículo de Rosetta3 (Rosetta3 paper)_ | [ROSETTA3: an object-oriented software suite for the simulation and design of macromolecules] (http://www.ncbi.nlm.nih.gov/pubmed/21187238), que fue el artículo que describió la transición de Rosetta++, en C++ pero monolítico, a Rosetta3, en C++ [orientado a objetos](https://en.wikipedia.org/wiki/Object-oriented_programming).
_RosettaCommons_ | Esta es [la organización](http://www.rosettacommons.org/) que gestiona la propiedad intelectual del código de Rosetta.
_RosettaCON_ | Es una convención de verano que se celebra todos los años, normalmente alrededor de la última semana de julio y la primera de agosto, normalmente en el [Sleeping Lady](http://www.sleepinglady.com/) en Leavenworth, WA. Es una conferencia científica solo para desarrolladores y usuarios de Rosetta de la industria o de los laboratorios de RosettaCommons, junto con algunos ponentes invitados.
_Reunión de desarrolladores de Rosetta (Rosetta Developer's Meeting)_ | Es un apéndice de un día de RosettaCON, que normalmente se celebra en la Universidad de Washington en Seattle el día antes de RosettaCON. Se usa para tratar problemas de código de Rosetta de interés amplio que son demasiado técnicos para el público de RosettaCON.
_RosettaScripts_ | Una interfaz basada en XML para controlar Rosetta, que da al usuario mayor control sobre los métodos, las funciones de puntuación, etc., sin requerir que el usuario cambie el código fuente de Rosetta.
_rotámero (rotamer)_ | Los rotámeros, isómeros rotaméricos, representan las configuraciones de cadena lateral más estables, que se observan comúnmente en estructuras cristalinas. Usar rotámeros permite a Rosetta considerar de forma eficiente muchas conformaciones discretas de cadena lateral, mientras que el movimiento continuo de la cadena lateral sería costoso.
_minimización de prueba de rotámeros (rotamer trial minimization)_ | la combinación óptima de rotámeros (cadenas laterales) se encuentra mediante una búsqueda Monte Carlo con recocido simulado. Después se adoptan técnicas de minimización para optimizar simultáneamente las cadenas laterales y los desplazamientos de cuerpo rígido. 

-------------------------

# **S**

Término  | Descripción
------------ | -------------
_SASA_ | Área de superficie accesible al solvente: el área de una proteína a la que puede llegar el agua u otro solvente
_scorefile_ | Un archivo de texto plano producido por aplicaciones de Rosetta que contiene todos los valores de los componentes de energía. Cada fila da los valores de una única Pose (estructura). También puede hacerse un archivo equivalente a partir de un **silent file** con el siguiente comando grep: `grep SCORE silentfile.out > scorefile.sc`
_ScoreFunction_ | La clase de Rosetta que se encarga de puntuar la Pose. Una ejecución concreta de Rosetta puede usar varias ScoreFunctions distintas, cada una con sus propios **archivos de pesos** y ajustes.
_rejilla de puntuación (scoring grid)_ | Un precálculo rápido de la puntuación para el docking de ligandos
_estructura secundaria (secondary structure)_ | Las estructuras secundarias describen clases de conformaciones locales de una molécula (normalmente un ácido nucleico o una proteína). La formulación más básica de las clases de estructura secundaria de las proteínas son las **hélices alfa**, las **láminas beta** y los loops. En los proyectos ab initio, Rosetta usa programas de predicción de estructura secundaria para predecir la estructura secundaria de la proteína objetivo. La estructura secundaria predicha se usa luego para seleccionar fragmentos de la base de datos de fragmentos Vall. La predicción de estructura secundaria en Rosetta se logra actualmente mediante una combinación de los tres métodos siguientes:  -   PsiPred. D.T. Jones, *J. Mol. Biol.* **292**, 195 (1999). -   SAM-T99. K. Karplus, R. Karchin, C. Barrett, S. Tu, M. Cline, M.    Diekhans, L. Grate, J. Casper, R. Hughey, *Protein Struct. Funct.   Genet.* **S5**, 86 (2001). -   JUFO. J. Meileer, M. Muller, A. Zeidler, F. Schmaschke, *J. Mol.   Biol.* 7, 360 (2001).
_secuencia (sequence)_ | La secuencia peptídica o secuencia de aminoácidos es el orden en que los residuos de aminoácidos, conectados por enlaces peptídicos, se sitúan en la cadena de péptidos y proteínas. La secuencia se suele indicar desde el extremo N-terminal, que contiene el grupo amino libre, hasta el extremo C-terminal, que contiene el grupo carboxilo libre. La secuencia peptídica se suele llamar secuencia de la proteína si representa la estructura primaria de una proteína. En Rosetta, una secuencia se introduce en un formato de archivo \*.fasta.
_formato SDF (SDF format)_ | Un formato de archivo que describe la estructura y la conectividad de una molécula, usado principalmente para moléculas pequeñas, no para proteínas; también conocido como formato MOL
_Shultzy's_ | [[Shultzy's|http://www.shultzys.com/]] es un bar y parrilla de salchichas favorito de la comunidad de Rosetta cuando está en Seattle para RosettaCON. Está en el lado este de The Ave.
_cadena lateral (side chain)_ | Los 20 aminoácidos contienen un grupo amino (NH2), un grupo ácido carboxílico (COOH) y cualquiera de varias cadenas laterales R, y tienen la fórmula básica NH2-CH-COOH(R) 
_silent file_ | Un archivo de texto plano que almacena Poses (estructuras) calculadas con Rosetta junto con las puntuaciones (energías) relevantes. Por defecto, el nombre del archivo es default.out, pero puede cambiarse con la opción `-out::silent`. El archivo contiene solo los grados de libertad internos de una Pose (ángulos Phi, Psi, omega y Chi). Las **coordenadas cartesianas** deben restaurarse con la aplicación extract_pdbs. 
_molécula pequeña (small molecule)_ | Para Rosetta, cualquier cosa que no sea una biomacromolécula polimérica
_soft_rep_ | Una función de energía en la que el potencial de Lennard Jones se ajusta para que los choques no se puntúen tan mal; contrasta con «hard_rep»
_ss2_ | Formato de archivo usado para almacenar información de estructura secundaria. Introducido originalmente por el programa PsiPred (de D. Jones) 
_definiciones de simetría (symmetry definitions)_ | los archivos symdef le dicen a Rosetta cómo tratar una proteína simétrica

-------------------------

# **T**

Término  | Descripción
------------ | -------------
_secuencia objetivo (target sequence)_ | La secuencia de la proteína de estructura desconocida que intentas modelar
_TaskFactory_ | Una clase para configurar nuevos PackerTasks según se necesite, aplicando una serie de TaskOperations.
_TaskOperation_ | Una especificación en RosettaScripts que le dice al Packer cómo optimizar los rotámeros
_servidores de pruebas (test servers)_ | El laboratorio Gray mantiene un [[testing server]] que ejecuta un conjunto de pruebas estandarizadas en cada commit del código a trunk. Las [pruebas](http://benchmark.graylab.jhu.edu/) aseguran que el código compile para cada plataforma y tipo de distribución.
_Thai Tom_ | Thai Tom es uno de los dos «restaurantes de Rosetta» que a muchos desarrolladores les gusta visitar en Seattle antes o después de RosettaCON. 4543 University Way NE, Seattle, WA 98105 (está en el lado oeste de The Ave).  Excelente comida tailandesa, puede ser muy picante. Los tiempos de espera son un problema si aparecen 40 personas de Rosetta a la vez.
_theozima (theozyme)_ | Una theozima, o «enzima teórica», es una convención usada en el diseño de enzimas. Como es lógico, es buena idea generar un sitio activo geométricamente ideal para estabilizar la conformación deseada del estado de transición; una vez que lo has configurado, puedes enhebrarlo (thread) en una Pose.
_threading_ | El threading de proteínas, también conocido como reconocimiento de plegamiento, es un método de modelado de proteínas (es decir, predicción computacional de la estructura de proteínas) que se usa para modelar aquellas proteínas que tienen el mismo plegamiento que proteínas de estructura conocida, pero no tienen proteínas homólogas de estructura conocida. El threading es el proceso de colocar los aminoácidos de una proteína objetivo sobre la estructura 3D de una plantilla según un alineamiento de secuencias. Luego puede construirse un modelo comparativo de la secuencia de la proteína objetivo.
_ Top7 / artículo de Top7_ | Top7 es el nombre de [una proteína](http://www.rcsb.org/pdb/explore.do?structureId=1qys) diseñada _de novo_ con Rosetta. Su artículo, [Design of a novel globular protein fold with atomic-level accuracy] (http://www.ncbi.nlm.nih.gov/pubmed/?term=14631033), es también de amplio interés por su descripción de la función de energía temprana.
_ángulo de torsión (torsion angle)_ | también **diedro**; el grado de libertad de rotación alrededor de un enlace
_espacio de torsión (torsion space)_ | Coordenadas internas; la minimización en el espacio de torsión optimiza la proteína rotando diedros
_trunk_ | trunk es un nombre para el lugar donde vive la versión actual de Rosetta de los desarrolladores. Se llama trunk porque es la línea principal del código; los proyectos de desarrollo paralelos están en ramas (branches). También conocido como [[master|Glossary#master]].

-------------------------

# **U**

Término  | Descripción
------------ | -------------
_docking sin unir (unbound docking)_ | las estructuras PDB cristalinas de las 2 proteínas se determinan por separado y luego se combinan en un complejo 

-------------------------

# **V**

Término  | Descripción
------------ | -------------
_Vall_ | Se pronuncia «V-all». La base de datos Vall es una representación condensada de todo el PDB con el fin de seleccionar fragmentos. El **fragment picker** filtra la base de datos Vall según la secuencia y las predicciones de estructura secundaria (y otra información) para extraer las conformaciones de la cadena principal que representan los fragmentos deseados.
_van der Waals_ | Describe las interacciones entre átomos neutros no enlazados; en la predicción de proteínas se usa a menudo indistintamente con el potencial de Lennard-Jones

-------------------------

# **W**

Término  | Descripción
------------ | -------------
_archivo de pesos (weights file)_ | El archivo que especifica los coeficientes que se usarán al combinar linealmente **términos de energía** en una **función de puntuación**.
_Winter RosettaCON_ | Es la reunión de invierno de desarrolladores de Rosetta, que se mueve por el país para ser organizada por distintos laboratorios de RosettaCommons. Discutimos problemas de código de interés amplio y limitado.


-------------------------

# **X**

Término  | Descripción
------------ | -------------
_XML_ | Un formato de datos jerárquico; RosettaScripts usa una versión personalizada


##Véase también

* [[RosettaEncyclopedia]]: Descripciones detalladas de términos de Rosetta
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Resources for learning biophysics and computational modeling]]
* [[Rosetta Timeline]]: Historia de Rosetta
* [[Units in Rosetta]]: Explica las unidades de medida usadas en Rosetta

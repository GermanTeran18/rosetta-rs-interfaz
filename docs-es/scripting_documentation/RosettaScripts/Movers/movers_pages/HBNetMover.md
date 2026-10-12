#HBNet
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
_Nota: esta documentación es del mover HBNet. Para información sobre el término de puntuación `hbnet` centrado en el diseño, un método alternativo para crear redes de puentes de hidrógeno, consulta [[esta página|HBNetEnergy]]._

##HBNet
HBNet es un método para detectar y diseñar explícitamente redes de puentes de hidrógeno dentro de Rosetta. Funciona como un mover dentro del marco de RosettaScripts y busca de forma exhaustiva todas las redes dentro del espacio de diseño que definas con [[TaskOperations|TaskOperations-RosettaScripts]] y que cumplan los criterios que especifiques con las opciones de más abajo.

###ACTUALIZACIÓN 12/2017:
El nuevo enfoque de muestreo de Monte Carlo (MC HBNet) ya está en master y se recomienda encarecidamente (probablemente pronto será el predeterminado); para usarlo, basta con añadir ```monte_carlo="true"``` a los movers HBNet o HBNetStapleInterface existentes. El nuevo procedimiento de búsqueda MC es mucho más rápido, permite tiempos de ejecución y uso de memoria consistentes, y produce de forma sistemática un mayor número de redes de alta calidad en un tiempo de ejecución mucho menor. Para controlar el número de trials de MC, pon ```total_num_mc_runs="10000"```; si reduces este valor, los tiempos de ejecución serán menores; si lo aumentas, serán mayores (y a menudo habrá más soluciones). Otras opciones de MC HBNet se enumeran más abajo. La configuración, la evaluación/clasificación de redes y la salida se gestionan igual que en HBNet.

*[[cómo trata HBNet los átomos polares enterrados sin satisfacer|HBNet-BUnsats]].*<br>
*[[cómo diseñar redes de puentes de hidrógeno en haces helicoidales|HBNet-HelicalBundle]].*<br>
*[[cómo funciona HBNet|HBNet-HowItWorks]].*<br>
*[[cómo gestiona HBNet los casos simétricos|HBNet-Symmetry]].*<br>

En general, HBNet debería funcionar con cualquier XML existente colocándolo al principio de tus pasos de diseño. Como HBNet devuelve varias Poses (cada una con redes o combinaciones de redes distintas), todo lo que venga después de HBNet debe usar [[MultiplePoseMover]].  

####Inicio rápido: lo que debes tener absolutamente en tu XML para usar HBNet de forma eficaz:

1. Llama al mover ```HBNet``` o ```HBNetStapleInterface``` en tu bloque PROTOCOLS antes de tus pasos principales de diseño
2. Llama a ```MultiplePoseMover``` (MPM) inmediatamente después de HBNet; luego, dentro del MPM, pega tu XML de diseño habitual; así se diseñará tu Pose como lo harías normalmente, pero con las redes ya colocadas y fijas en su sitio.
3. En todos tus movers de diseño dentro del MPM, asegúrate de pasar la siguiente operación de tarea (véase el XML de plantilla más abajo) para evitar que las redes se diseñen y desaparezcan: HBNet aplica automáticamente restricciones para que los puentes de hidrógeno se mantengan en su sitio, pero si cambias el tipo de aa con taskops, las restricciones ya no pueden aplicarse correctamente. En el mismo sentido, asegúrate de **usar únicamente funciones de puntuación ```_cst``` en los pasos de diseño posteriores a HBNet; por ejemplo, ```beta_cst``` en lugar de beta.**

####XML de plantilla:
```xml
<ROSETTASCRIPTS>
   <SCOREFXNS>
        PASTE YOUR SCFXN HERE AND THEN PASS IT TO HBNET
   </SCOREFXNS>
   <TASKOPERATIONS>
        PASTE YOUR TASK_OPERATIONS HERE AND THEN PASS THEM TO HBNET
   </TASKOPERATIONS>
   <FILTERS>
   </FILTERS>
   <MOVERS>
      <HBNet name="hbnet_mover" scorefxn=[YOUR_SCORE_FUNCTION] hb_threshold="-0.5" min_network_size="3" max_unsat_Hpol="1" write_network_pdbs="1" monte_carlo="false" task_operations=[YOUR_TASK_OPS_HERE] />
      <MultiplePoseMover name="MPM_design" max_input_poses="100">
         <ROSETTASCRIPTS>
                PASTE YOUR ENTIRE CURRENT DESIGN XML HERE
                # only use _cst scorefxn during design to make sure the constraints automatically turned on by HBNet are respected
                # residue selector and taskop to ensure network residues aren't designed away
                # residue selector will automatically detect all HBNet residues
                <ResiduePDBInfoHasLabel name="hbnet_residues" property="HBNet" />
                <OperateOnResidueSubset name="hbnet_task" selector="hbnet_residues">
                    <RestrictToRepackingRLT/> # can also use PreventRepackingRLT here, but I find that repack only works best, because it allows some wiggle room, and the csts applied automatically by h-bond keep the h-bonds in place
                </OperateOnResidueSubset>
         </ROSETTASCRIPTS>
       </MultiplePoseMover>
<PROTOCOLS>
  <Add mover_name="hbnet_mover"/>
  <Add mover_name="MPM_design"/>
</PROTOCOLS>
</ROSETTASCRIPTS>
```

###Casos específicos y ejemplos de uso: 
HBNet es una clase base de la que pueden derivarse otras para sobrescribir funciones clave que realizan la configuración, el diseño y el procesamiento de las redes de forma distinta:

####HBNetStapleInterface: para diseñar interfaces proteína-proteína:
Espera una Pose con >= 2 cadenas y, por defecto, iniciará la búsqueda de redes en todos los residuos de la interfaz, intentando encontrar redes de puentes de hidrógeno que atraviesen la interfaz.

```xml
# symmetric
<HBNetStapleInterface scorefxn="hard_symm" name="hbnet_interf" hb_threshold="-0.5"design_residues="NSTQHYW" write_network_pdbs="true" min_networks_per_pose="1" max_networks_per_pose="4" use_aa_dependent_weights="true" min_core_res="2" min_network_size="3" max_unsat_Hpol="3" onebody_hb_threshold="-0.3" task_operations="arochi,init_layers,current" />

# asymmetric
<HBNetStapleInterface scorefxn="hard" name="hbnet_interf" hb_threshold="-0.5"design_residues="NSTQHYW" write_network_pdbs="true" min_intermolecular_hbonds="3" min_networks_per_pose="1" max_networks_per_pose="4" use_aa_dependent_weights="true" min_core_res="2" min_network_size="3" max_unsat_Hpol="3" task_operations="arochi,init_layers,current" />
``` 

**Opciones útiles:**
* Para haces helicoidales, ```min_helices_contacted_by_network="4"``` exigiría que 4 hélices distintas aporten cada una al menos 1 rotámero a cada red de puentes de hidrógeno para que esta se acepte
* Para combinar varias redes en el mismo PDB de salida: ```min_networks_per_pose="2"``` con ```max_networks_per_pose="4"``` intentará producir combinaciones de entre 2 y 4 redes compatibles a la vez al devolver las Poses de salida.

**Antes existían los movers HBNetLigand y HBNetCore, pero ahora ambos casos de diseño se resuelven mejor usando el mover HBNet normal con las opciones adecuadas (véase más abajo):**

#### Diseño de redes en el núcleo de un monómero:
Por defecto, comenzará a buscar en todas las posiciones de la Pose monomérica, lo que a menudo no es lo ideal: si es posible, especifica ```start_selector``` para empezar en las posiciones que quieres que puedan formar parte de las redes y define con cuidado tu espacio de diseño con ```task_operations```.
```xml
<HBNet scorefxn="beta" monte_carlo_branch="true" total_num_mc_runs="100000" core_selector="core" name="hbnet" hb_threshold="-0.5" min_core_res="2" minimize="false" min_network_size="5" max_unsat_Hpol="2" start_selector="[YOUR_SELECTOR]" task_operations="[YOUR TASKOPS" />
```

#### Diseño de redes alrededor de un ligando de molécula pequeña polar
Si tu objetivo es diseñar una red que satisfaga una molécula pequeña polar, usa ```start_selector``` para comenzar en el ligando (y en cualquier contacto de primera capa que quieras conservar). Un reto que surgió en estos casos de diseño es que HBNet solo busca redes entre posiciones empaquetables/diseñables, pero a menudo los usuarios quieren mantener fijos el ligando y algunos contactos de primera capa (NATRO o PreventRepacking). Para resolver este problema, añadimos la opción ```use_only_input_rot_for_start_res```, que, si es true, toma las posiciones de ```start_selector```, fija su identidad, activa el muestreo del Chi de protones y, por lo demás, fija su rotámero. Esto permite más posibilidades de puentes de hidrógeno al muestrear varias posiciones de Hpol. (Opción añadida junto con Benjamin Basanta; la lógica de conmutatividad fue reelaborada por Vikram K. Mulligan.)
**NOTA:** ```use_only_input_rot_for_start_res``` solo funciona si se pone en true y si el selector de inicio se configura como empaquetable. Si se usa un rotámero inicial anómalo, se recomienda [[IncludeCurrent|IncludeCurrentOperation]] para asegurar que esta opción no deje vacío tu vector de inicio.

```xml
<HBNet name="hbnet_ligand" scorefxn="standardfxn" hb_threshold="-0.5" start_selector="ligand" design_residues="STNQYW" write_cst_files="False" write_network_pdbs="False" store_subnetworks="False" minimize="False" min_network_size="3" max_unsat_Hpol="0" task_operations="no_design_or_pack,limitAroChi,includeCurrent" use_only_input_rot_for_start_res="True"/>
```

###Preguntas frecuentes
**¿Por qué todas mis Poses de salida tienen choques?** HBNet devolverá las redes de forma iterativa colocándolas sobre tu Pose de entrada; como cada red no constituye todo el espacio de diseño (residuos empaquetables/diseñables), es habitual y esperable ver choques entre los residuos de la red y los residuos de entrada intactos si escribes la salida directamente después de HBNet; **se asume que cualquier residuo que sea empaquetable/diseñable durante HBNet también lo será durante el diseño posterior**, que se realizará después de HBNet. Si esto no es lo que quieres, tienes 2 opciones:

1. Convertir todas las posiciones empaquetables/diseñables (excepto PRO/GLY/disulfuro) en poli-ALA y colocar la red sobre esa Pose para la salida: ```output_poly_ala_background="true"```
2. Puedes escribir estas Poses con fondo poli-ALA además de la salida estándar con ```write_network_pdbs="true"```; es útil para depurar e inspeccionar (o para comprobar si tu red cambió durante el diseño posterior).

**¿Por qué HBNet es tan lento?** La mejor forma de abordarlo es usar ahora MC HBNet pasando ```monte_carlo="true"```, pero en todos los casos, especialmente con el HBNet original, el tiempo de ejecución escala con el tamaño de tu espacio de diseño y con cuántas redes se encuentran (lo cual es una especie de pez que se muerde la cola, porque probablemente quieras encontrar muchas redes). Hay varias formas de hacer HBNet mucho más rápido (y a menudo obtener también mejores resultados):

1. Haz más estricto (más negativo) ```hb_threshold```. Con MC-HBNet puedes ponerlo con seguridad en -0.5; con el HBNet original, usa -0.5 salvo que uses ex1ex2, en cuyo caso empieza en -0.75
2. Sé más específico con tus ```task_operations```; cuanto más puedas restringir tu espacio de diseño, y en especial las cadenas laterales de alta entropía (Lys/Arg), mejor.
3. Usa ```start_selector``` para comenzar la búsqueda solo en un pequeño número de posiciones de interés.
4. Aprovecha las opciones para permitir solo las propiedades que deseas, p. ej. ```min_network_size="5"```

###Opciones comunes a todos los movers HBNet
- <b>hb\_threshold</b> (-0.5 &Real): umbral de energía de puente de hidrógeno de 2 cuerpos para definir los pares de rotámeros que forman puentes de hidrógeno. He comprobado que -0.5 sin ex1-ex2 es el mejor punto de partida. Si se usa ex1-ex2, prueba con -0.75. Este parámetro es el más importante y requiere cierto ajuste; el compromiso es que, cuanto más estricto (más negativo), más rápido se ejecuta pero se pierden muchas redes; si es demasiado positivo, se ejecutará eternamente; usar ex1-ex2 produce muchas redes redundantes que acaban filtrándose de todos modos.
- <b>scorefxn</b>: la función de puntuación que se usará. Si no se indica, se usa la función de puntuación predeterminada actual de Rosetta.
- <b>max\_unsat\_Hpol</b> (1 &Size): número máximo de átomos de hidrógeno polar (Hpol) enterrados sin satisfacer permitidos en cada red: *[[la forma en que trato los átomos sin satisfacer enterrados|HBNet-BUnsats]].* Si hay donadores o aceptores de átomos pesados enterrados y sin satisfacer, esas redes se descartan. Este comportamiento puede anularse para permitir átomos pesados sin satisfacer poniendo <b>no_heavy_unsats_allowed=false</b>, pero no se recomienda
- <b>write_network_pdbs</b>: escribe archivos pdb solo de la red (en un fondo de poli-Ala en el que cualquier residuo diseñable/empaquetable es Ala; el resto de la Pose queda intacto); esto sirve simplemente para depurar y visualizar la red detectada por HBNet
- <b>write_cst_files</b>: escribe archivos de restricciones .cst de Rosetta para cada red.
- <b>min_network_size</b>: número mínimo de residuos requeridos para cada red. *Nota: en casos simétricos, se refiere al número de residuos de la ASU.*
- <b>max_network_size</b>: número máximo de residuos requeridos para cada red.
- <b>start_resnums</b>: lista de posiciones de residuo, separadas por comas, desde las que se inicia la búsqueda de redes (p. ej. "1,2,3,5"); ahora es mejor usar el selector de residuos <b>start_selector</b>.
- <b>start_selector</b>: selector de residuos que indica a HBNet desde qué residuos comenzar (solo buscará redes que incluyan estos residuos).
- <b>core_selector</b>: selector de residuos que define lo que HBNet considera "núcleo"; se usa para determinar el enterramiento en los átomos sin satisfacer; por defecto es el valor predeterminado del selector de capas, que usa vecinos de cadena lateral (núcleo=5.2).
- <b>min_core_res</b>: número mínimo de residuos del núcleo que debe tener cada red (según los define el selector del núcleo).
- <b>design_residues (string &"STRKHYWNQDE"</b>: cadena de códigos de aa de una letra; qué tipos de residuos polares quieres incluir en la búsqueda; el valor predeterminado son todos los aa que potencialmente pueden formar puentes de hidrógeno, restringidos además por las <b>task_operations</b> que pases.
- <b>task_operations</b>: lista, separada por comas, de operaciones de tarea que hayas definido previamente en tu XML; HBNet respetará cualquier operación de tarea que se le pase y solo buscará redes dentro del espacio de diseño que definas con esas taskops; cuanto más puedas restringir tu espacio de diseño a lo que quieres, más rápido se ejecutará HBNet.
- <b>store_network_scores_in_pose</b>: booleano. Si es true, añade "HBNet_NumUnsatHpol",
"HBNet_Saturation" y "HBNet_Score" a la Pose como puntuación extra. Estas puntuaciones
se imprimirán en el archivo score.sc y se puede acceder a ellas con
[[ReadPoseExtraScoreFilter|ReadPoseExtraScoreFilter]].

###Opciones de MC HBNet
- <b>monte\_carlo</b> (bool,"false"):
  ¡Acércate y prueba suerte con este protocolo HBNet estocástico!
  Este protocolo ofrece tiempos de ejecución más rápidos (especialmente para sistemas grandes) y un uso de memoria más consistente.
  Equivale a `monte_carlo_branch`.
- <b>total\_num\_mc\_runs</b> (uint,"10000"):
  número de ejecuciones de Monte Carlo que se reparten entre todos los puentes de hidrógeno semilla.
- <b>monte\_carlo\_seed\_must\_be\_buried</b> (bool,"false"):
  solo se ramifica a partir de puentes de hidrógeno en los que al menos un residuo está enterrado.
  En la práctica, esto hace que solo se encuentren redes que tengan al menos un residuo enterrado.
- <b>monte\_carlo\_seed\_must\_be\_fully\_buried</b> (bool,"false"):
  solo se ramifica a partir de puentes de hidrógeno en los que ambos residuos están enterrados.
  Esto hace que solo se encuentren redes que tengan al menos un puente de hidrógeno enterrado, pero no impide que haya puentes de hidrógeno expuestos adicionales.
- <b>seed\_hbond\_threshold</b> (real,"0"):
  Quizá quieras ramificar solo a partir de puentes de hidrógeno fuertes.
  Si este valor es -1.2, por ejemplo, solo se ramificará a partir de puentes de hidrógeno con una intensidad de -1.2 o menor.

####Nuevas opciones para detectar redes nativas y para conservar y ampliar redes existentes de la Pose de entrada

- <b>find\_only\_native_networks (bool &false):</b>  HBNet solo encontrará las redes nativas de tu Pose de entrada que cumplan tus criterios (especificados mediante opciones) y devolverá una sola Pose con restricciones para esas redes. Si esta opción es true, todas las opciones siguientes se anulan y HBNet no busca nuevas redes
- <b>find\_native\_networks (bool &false):</b>  Encontrará e informará de las redes nativas de la Pose de entrada, pero además hará diseño; para keep_existing_networks=true o extend_existing_networks=true, además de partir de las etiquetas PDBInfoLabel "HBNet", HBNet encontrará todas las redes nativas de tu Pose de entrada que cumplan tus criterios (especificados mediante opciones).
- <b>keep\_existing\_networks (bool &false):</b>  Además del diseño, conserva las redes existentes de la Pose de entrada en cada Pose devuelta por HBNet y activa las restricciones de todas ellas; por defecto, las redes existentes se identifican por las etiquetas PDBInfoLabel "HBNet" de la Pose de entrada, pero también pueden volver a detectarse poniendo find_native_networks=1. <b>Si keep_existing_networks=true y extend_existing_networks=false,</b> HBNet desactiva internamente el diseño en las posiciones de las redes de entrada (prevent_repacking); se buscan y diseñan nuevas redes en las demás posiciones según tus task_ops. <b>Si keep_existing_networks=true y extend_existing_networks=true,</b> HBNet introduce internamente en el IG solo el rotámero de entrada de cada residuo de la red para intentar ampliarla; una red ampliada sustituirá a su red nativa si es mejor (de lo contrario, se conservan las redes nativas).
- <b>extend\_existing\_networks (bool &false):</b>  Detecta redes existentes e intenta ampliarlas, y además buscará nuevas redes en otras posiciones según tus criterios. Las redes existentes se identifican por las etiquetas PDBInfoLabel "HBNet" de la Pose de entrada, pero también pueden volver a detectarse poniendo find_native_networks=1. Para las redes existentes, HBNet introduce internamente en el IG solo el rotámero de entrada de cada residuo de la red para intentar ampliarla; una red ampliada sustituirá a su red nativa si es mejor (de lo contrario, se conservan las redes nativas).
- <b>only\_extend\_existing (bool &false):</b>  No buscará nuevas redes en otras posiciones; solo intentará ampliar y mejorar las redes existentes.

####Opciones experimentales: ¡úsalas bajo tu propio riesgo!
- <b>secondary_search</b> (bool &false): si, durante el recorrido del IG, una trayectoria de búsqueda termina en un rotámero que no puede formar ningún puente de hidrógeno, vuelve a buscar desde ese rotámero con un hb_threshold más bajo (-0.25).

###Pautas y consejos generales:
1. Si tu problema implica el diseño de interfaces, usa HBNetStapleInterface, que detecta automáticamente las interfaces, inicia la búsqueda en los residuos de la interfaz y exige que cada red atraviese una interfaz (definida como que al menos 2 cadenas distintas deben aportar una cadena lateral a cada red); igualmente buscará en todo tu espacio de diseño (según lo definan tus operaciones de tarea), por lo que las redes pueden ramificarse desde la interfaz tan lejos como se lo permitas. Como en último término queremos redes satisfechas, es importante que tus taskops permitan que algunos residuos adicionales alrededor de la interfaz sean empaquetables/diseñables, para que los puentes de hidrógeno de segunda capa puedan satisfacer plenamente la red. Esto será difícil si solo haces diseñables los residuos de la interfaz.
2. Si tienes un monómero (p. ej., estás intentando satisfacer internamente un loop), usa el mover HBNet normal, pero asegúrate de 1) especificar la opción start_selector (selector de residuos que HBNet usará para iniciar la búsqueda, asegurando que cada red contenga al menos un residuo inicial) y 2) especificar operaciones de tarea para acotar tu espacio de diseño. Si no haces estas dos cosas y tu Pose tiene >100 aa, HBNet puede ejecutarse durante semanas... o años...
3. En general, usa las mismas taskops que usarías normalmente para tu caso de diseño, pero asegúrate de que se permitan los residuos polares (p. ej., en LayerDesign, añade a la capa del núcleo los aa polares que quieras considerar)
4. En general, cuanto más restrictivo, mejor: cuanto más puedas guiar a HBNet con operaciones de tarea y con las opciones correctas, más rápido se ejecutará y más probable será que te dé lo que quieres.
5. Algunas reglas empíricas: empieza con hb_threshold = "-0.5" y sin ex1ex2 en tu taskop. Si debes usar rotámeros extra, empieza con hb_threshold = "-0.7"; si no obtienes la salida que quieres y el tiempo de ejecución es razonablemente rápido, relaja estos criterios: haz hb_threshold más positivo (nunca pases de -0.25), incluye rotámeros extra y amplía tus taskops. Si tu ejecución es demasiado lenta, haz más estrictas esas mismas cosas. Es normal que tengas que explorar un poco para encontrar la configuración adecuada para tu caso de diseño, pero ten en cuenta también que muchos dockings o andamios simplemente no podrán acomodar una red perfecta: es un juego de números; cuanto más puedas muestrear, más probable será que encuentres una buena red.

##Véase también

* [[PerturbBundleMover]]
* [[BundleGridSamplerMover]]
* [[Diseño con el término de puntuación hbnet|HBNetEnergy]]
## Descripción general
El modelado *de novo* de ARN fue escrito originalmente en Rosetta por R. Das a finales de 2006, cuando el código estaba en `rosetta++`. Poco a poco fue acumulando funcionalidades adicionales, como la minimización posterior al modelado con fragmentos (ensamblaje de fragmentos de ARN con minimización de todos los átomos, FARFAR). Una parte del código se pasó a forma orientada a objetos en 2010-2011 con la migración a Rosetta 3 ('minirosetta') y las pruebas de un esquema de modelado `coarse_rna` (nunca publicado). Pero el código necesitaba una reorganización a medida que se empezaron a introducir o a prever funciones adicionales (p. ej., puntuación con desplazamientos químicos, fragmentos generales de tipo 'chunk' (no contiguos en la secuencia), modelado o refinamiento de sub-Poses de Poses más grandes) y a medida que se establecían mejores prácticas de codificación en Rosetta. 

En 2015-2016, el laboratorio de Das busca probar una integración del modelado stepwise con [[FARNA/FARFAR|rna-denovo]]. Esto ha requerido encapsular la funcionalidad de FARNA en una sola clase y ha supuesto una oportunidad para organizar las subfuncionalidades en distintos sub-espacios de nombres/subdirectorios. 

Este documento describe la [organización actual](#the-classes) para desarrolladores, incluidas notas sobre las adiciones previstas, como el manejo de interfaces ARN/proteína y la especificación de trabajos con las opciones y funciones de configuración, mucho más limpias, desarrolladas para `stepwise` (véase [Pendientes](#to-do) al final de este documento).

Una nota semántica: ahora se prefieren los términos *FARNA* y *FARFAR* en todo el código para referirse al protocolo real de Monte Carlo con ensamblaje de fragmentos, al que ahora se puede acceder mediante `rna_denovo`, pero también mediante `stepwise` o, en principio, desde cualquier otro lugar del código, p. ej., para refinar fragmentos de ARN de Poses. Los términos *RNA_DeNovo* o *rna_denovo* se conservan en unos pocos lugares para indicar código envoltorio antiguo específico de la aplicación `rna_denovo.cc` con entrada `.params`, para el caso de uso más específico de modelar ARN a partir de una cadena extendida.


## Las clases de `protocols::farna`
### Dos envoltorios, `RNA_DeNovoProtocol` y `FARNA_Optimizer`
+ `RNA_DeNovoProtocol` es el envoltorio 'clásico', configurado por la aplicación `rna_denovo.cc`. Recorre en un bucle los `nstruct` Poses que hay que construir, lanza instancias de RNA_FragmentMonteCarlo y luego escribe esos Poses en silent files. También se encarga de la entrada desde archivos `.params` (que con suerte quedarán obsoletos pronto). Nota: esto podría/debería gestionarlo un JobDistributor, y debería migrar a `JD3` cuando esté listo.

+ `FARNA_Optimizer` es un envoltorio más básico que no hace ninguna entrada/salida sofisticada de silent files. Se programó para usarlo dentro de ejecuciones de `stepwise`, probando la opción `-lores`, en la que se realizan 100 ciclos de FARNA. Se describe brevemente en la página de [[stepwise|stepwise-lores]]. Es el objeto razonable para llamar a FARNA dentro de flujos de trabajo más complejos, incluido el refinamiento motivo por motivo de Poses de ARN grandes (que todavía no existe).

### Protocolo central: `RNA_FragmentMonteCarlo`
`RNA_FragmentMonteCarlo` es el protocolo principal que configura todas las bibliotecas: 
+ Recorre cada etapa del ensamblaje de fragmentos. En las ejecuciones clásicas, el tamaño del fragmento aumenta de 1 a 2 y a 3. La intensidad de las restricciones y los términos de energía que favorecen los pares de bases/apilamientos coaxiales se van aumentando gradualmente en peso. 
+ Realiza los tres tipos de movimientos de FARNA: inserción de fragmentos, movimientos de salto (pares de bases) y movimientos de 'chunk'. 
+ Comprueba los filtros en varias etapas (reiniciando si los filtros fallan).  
+ También contiene algunas funciones para calcular el RMSD. Quizá convendría trasladarlas a otro lugar.

Hay un concepto importante/delicado en RNA_FragmentMonteCarlo, un objeto llamado `atom_level_domain_map`, que es un `protocols::toolbox::AtomLevelDomainMap`. Este guarda, para cada átomo del Pose, una asignación de dónde provino ese residuo, y delimita dónde se pueden insertar fragmentos/saltos/chunks a nivel atómico.  

La convención es la siguiente:   
+ 0 marca los átomos totalmente libres.  
+ 1,2,...998 marca los átomos que provienen de dominios de entrada fijos (p. ej., PDB), con un índice distinto para cada PDB.  
+ 999 es especial: marca los átomos absolutamente fijos que no provienen de un dominio de entrada (p. ej., fosfatos virtuales que no necesitan moverse durante FARNA)  
+ 1000 es especial (ROSETTA_LIBRARY_DOMAIN) y marca los átomos cubiertos por una [BasePairStepLibrary](#BasePairStepLibrary)  

### Sub-espacios de nombres, por orden de importancia
#### Espacio de nombres `protocols::farna::movers`
+ `RNA_FragmentMover` contiene una biblioteca `RNA_Fragments` y realiza los movimientos de fragmentos sobre un `pose`.
Nota: aquí es donde podríamos poner la funcionalidad para, p. ej., elegir fragmentos más largos si coinciden en secuencia con el Pose deseado. También es donde podríamos poner una ponderación de la elección de fragmentos basada en desplazamientos químicos. Habría que definir pesos para cada posible fragmento y actualizar la elección aleatoria para reflejar esos pesos, pero eso debería ser fácil (hay algo de código en `stepwise::monte_carlo::mover::StepWiseMoveSelector` que podríamos compartir.) 

+ `RNA_JumpMover` contiene una `RNA_JumpLibrary` y realiza los movimientos de salto sobre un `pose`

+ `RNA_Minimizer` realiza el empaquetado de 2'-OH y la minimización de todos los átomos en dos rondas. La primera ronda evita que las conformaciones de FARNA 'exploten' por choques mediante restricciones de coordenadas.

+ `RNA_LoopCloser` examina un `pose` y aplica el cierre de loops por CCD (descenso cíclico de coordenadas) a cualquier segmento con roturas de cadena y variantes CUTPOINT_UPPER/CUTPOINT_LOWER (según lo especificado por 'cutpoints_closed', o creadas durante la configuración)

+ `RNA_Relaxer` realmente no se usa. Úsalo bajo tu propio riesgo.

#### Espacio de nombres `protocols::farna::fragments`
+ `RNA_Fragments` es una clase base para leer fragmentos de una base de datos en disco y almacenar torsiones.

+ `FullAtomRNA_Fragments` es específica de los Poses de Rosetta con residuos de ARN de tipo `fa_standard`.
Genera listas depuradas de, p. ej., fragmentos de 1 residuo o 2 residuos, para secuencias concretas 'justo a tiempo'. (Nótese que, aunque el objeto se mantiene const durante la ejecución, la información justo a tiempo se guarda en un map mutable, que es un truco bastante habitual.)
La biblioteca por defecto es `database/sampling/rna/RICHARDSON_RNA09.torsions`, pero debería actualizarse a `NR2015` del Motif Atlas.
Nota: esta clase podría ampliarse para contener los desplazamientos químicos a nivel atómico predichos por LarmorD y las reactividades químicas a nivel de nucleótido (a DMS, SHAPE, etc.) de cada estructura de ARN de la base de datos.

Estas clases se desarrollaron por separado de las clases de fragmentos de proteínas, cuyas definiciones estaban en flujo cuando se codificaron los protocolos de ARN; podría valer la pena unificar ambas, aunque es difícil imaginar casos de uso que lo exijan.

También hay una clase (en gran parte obsoleta) llamada `protocols::coarse_rna::CoarseRNA_Fragments` que hereda de `RNA_fragments` para Poses que usan tipos de residuos de ARN de grano grueso con 3 cadenas ficticias en la cadena principal y 3 en la base.

Oye, quizá esto debería ser un sub-espacio de nombres de libraries...

#### Espacio de nombres `protocols::farna::libraries`
+ `RNA_LibraryManager` gestiona los singletons de cada biblioteca leída del disco. Úsalo para leer las bibliotecas relevantes una sola vez.
Además de contener las `RNA_Fragments`, por ahora tiene `RNA_JumpLibrary` y `BasePairStepLibrary`.

+ `RNA_JumpLibrary` contiene saltos leídos de la base de datos de saltos de Rosetta. Por ahora, ¿solo se extraen del ribosoma 1jj2 por defecto? `database/sampling/rna/1jj2_RNA_jump_library.dat`, pero debería actualizarse como mínimo a una base de datos RNA11 (que existe en la base de datos como `RNA11_full.jump`), o incluso a NR2015.
Nota: debería ser general para ARN/proteína también, pero esos saltos no se han implementado.

+ `BasePairStepLibrary` contiene las coordenadas de pasos de pares de bases (véase [BasePairStep](#BasePairStep)) leídas de bases de datos en disco. En realidad solo registra qué archivos hay en disco y luego lee los silent files 'justo a tiempo' durante la ejecución. Archivo de ejemplo: `database/sampling/rna/base_pair_steps/general/bulge_1nt/ag_unu.out.gz` contiene las coordenadas de 4 residuos de dos pares de bases de un paso de pares de bases en el que una hebra tiene la secuencia `ag` y la otra tiene la secuencia `unu` (`n` significa cualquier nucleótido).

+ `RNA_ChunkLibrary` es un objeto importante en `RNA_FragmentMonteCarlo` que contiene pasos de pares de bases y cualquier coordenada de PDB o silent files proporcionados por el usuario. También es responsable de crear el `AtomLevelDomainMap` (compartido por numerosos movers [arriba](##the-classes-of-protocols-farna_core-protocol-rna_fragmentmontecarlo)).

+ `ChunkSet`
Objeto que contiene las coordenadas de PDB de entrada o de pasos de pares de bases, en formato compacto `MiniPose`. 
Nota: debería ser general para chunks combinados de ARN/proteína, pero no se ha probado.

#### Espacio de nombres `protocols::farna::options`
Las opciones son como una muñeca rusa de clases anidadas:
+ `RNA_BasicOptions` tiene las opciones más básicas, p. ej., `dump_pdb`

+ `RNA_MinimizerOptions` hereda de `RNA_BasicOptions` y añade opciones específicas del minimizador.

+ `RNA_FragmentMonteCarloOptions` hereda de `RNA_MinimizerOptions` y añade un montón de opciones de modelado con fragmentos, entre ellas el número de ciclos `monte_carlo_cycles`, si se minimiza o no `minimize_structure`, filtros como `filter_lores_base_pairs` y los nombres de los archivos PDB de entrada.

+ `RNA_DeNovoProtocolOptions` hereda de `RNA_FragmentMonteCarloOptions` y añade algunas opciones de entrada/salida, entre ellas el número de modelos `nstruct`.

####Espacio de nombres `protocols::farna::base_pairs`
Este directorio está pensado para manejar la información sobre dónde están ubicados los pares de bases y
los pasos de pares de bases en el Pose en las ejecuciones de FARNA.

+ `RNA_BasePairHandler` gestiona las ubicaciones en el Pose de los pares de bases, los pasos de pares de bases y las chain_connections (dos segmentos que se supone que tienen un par entre ellos en algún lugar). También gestiona `setup_base_pair_constraints()`.
Nota: sería estupendo contar con un objeto adecuado de información de estructura secundaria de ARN, que el usuario pueda especificar y que se guarde en el Pose (véanse los Pendientes más abajo); en ese momento, esta clase se encargaría de la conversión de esa clase a los parámetros que usa FARNA.
 
+ `BasePairStep.cc` contiene información sobre un objeto como este:
```
 5'-- ( i )     --   ( i+1) -- 3'
        |               |
        |               |
 3'-- (j+q+1)         ( j ) -- 5'
          \           /
            n - n - n
      allowing bulges (n's) on the second strand
```
Uno de los lados tiene que involucrar dos nucleótidos contiguos. 
El otro lado involucra nucleótidos con una separación máxima de 3 nucleótidos.
Los pares que enmarcan el paso no tienen que ser de tipo Watson-Crick.
Estaba probando si almacenar estos pasos, extraídos de la base de datos cristalográfica,
permitiría reconocer motivos rápidamente (sí lo permite, pero tienes que saber qué
residuos están emparejados).
Nota: no está unificado con `core::rna::BasePair`, es decir, no almacena los bordes ni las orientaciones Watson-Crick. Llevar la cuenta de esa información da lugar a bases de datos muy dispersas.


#### Espacio de nombres `protocols::farna::secstruct`
+ `RNA_SecStruct` está pensada como una clase general que almacena los emparejamientos reales y puede manejar la entrada/salida de la notación de punto y paréntesis como `(((....)))` para una horquilla. Todavía es algo rudimentaria, porque su dato principal es una cadena y no una lista de pares, que sería más fundamental. Tampoco puede leer ni escribir un número arbitrario de pseudonudos, solo tres capas, según lo dictado por `(`,`)`; `[`,`]`; y `{`,`}`. Véase también [[rna-secondary-structure-file]].

+ `RNA_SecStructLegacyInfo` contiene actualmente información *1D* sobre la estructura secundaria
Esta clase se derivó para coincidir con el modelado de proteínas de Rosetta (que guarda información 1D sobre hélice alfa, lámina beta o loop). 


#### Espacio de nombres `protocols::farna::setup`
+ `RNA_DeNovoSetup` permite ahora que FARNA omita la entrada heredada basada en archivos `.params` y en su lugar tome directamente desde la línea de comandos `-sequence`, `-secstruct`, `-obligate_pair`. (véase la [[documentación de RNA DeNovo|rna-denovo]])
+ `RNA_DeNovoPoseInitializer` contiene el código que toma la información de `.params` y crea un fold-tree y puntos de corte para un nuevo Pose. (puede quedar obsoleto si usamos build_full_model de stepwise para inicializar el Pose después de `RNA_DeNovoSetup`). 
+ `RNA_DeNovoParameters` es responsable de leer los archivos `.params` (ahora código heredado).

## Pendientes
#### Configuración de FARNA
* cambiar la configuración por defecto de FARNA a la configuración de stepwise (¿incluyendo -in:file:silent almacenado en FullModelInfo o FullModelParameters?). Hay un hilo de discusión en un issue [aquí](https://github.com/RosettaCommons/main/issues/25).  Ya hemos avanzado parte del camino tras importar la funcionalidad de `rna_denovo_setup.py` a la clase RNA_DeNovoSetup, que se encarga de mapear los residuos a subproblemas. Ahora solo falta ejecutar `build_full_model` para generar los Poses iniciales. *Un buen momento para probarlo podría ser cuando Kalli generalice FARNA para incluir el potencial de baja resolución ARN-proteína. Reconstruir un par de ARN dentro del caso de prueba de MS2 es un buen ejemplo.*
* cribado de RMSD respecto a la estructura nativa en FARNA (para comprobar de forma más rigurosa la idea de que stepwise -lores puede ofrecer mejor muestreo que el FARNA clásico) *De nuevo, el trabajo de Kalli sobre modelado de baja resolución de RNP ofrece un buen caso de prueba.*
* probar en casos más complejos (p. ej., tectoRNA, riboswitches) *Lo probaremos cuando Clarence/Caleb tengan configurado el conjunto de benchmark de MOHCA-seq. Nótese que necesitamos un montón de pruebas de integración; véase el hilo del issue [aquí](https://github.com/RosettaCommons/main/issues/18)* 

#### Muestreo de pasos de pares de bases (BPS) en FARNA (exploratorio)
* Corregir las bases de datos de BPS con protuberancias (bulge), que ahora requieren filtrar las entradas de fold-tree incorrectas.
* configurar BPS de 'larga distancia' (>3 nucleótidos intermedios)

#### Stepwise-lores  *(prioridad baja, ya que no se ven muchas ventajas frente a FARNA)*
* Asegurarse de que la configuración de pasos de pares de bases decida el número de residuos intermedios según PDBinfo o full_model_info (si está definido).
* 'enfocar' los fragmentos cerca del sitio de adición/eliminación stepwise (prioridad baja)
* configurar un movimiento para añadir tripletes y volver a muestrear basándose en una base de datos de tripletes.
* reconocimiento automático de tramos largos de identidad de secuencia (p. ej., >5 nucleótidos) — mantener NR2015 como silent files en la base de datos.

#### Benchmarking
* Algunas notas sobre cómo hacer benchmark de las actualizaciones de FARNA, y más ideas para mejorar el ensamblaje de baja resolución, están en [este documento de Google del laboratorio de Das](https://docs.google.com/spreadsheets/d/1bARG3MlTCGeOvjQXr7lheyODoOH2FD7HxE6KX7_brJ0/edit#gid=5)

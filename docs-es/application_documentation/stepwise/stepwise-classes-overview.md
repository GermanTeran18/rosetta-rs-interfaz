# Documentación de stepwise: visión general
# Un poco de historia
------------------
En predicción y diseño, los modelos que obtenemos no siempre son los de menor energía de Rosetta, sobre todo si hay que muestrear movimientos de la cadena principal. El laboratorio Das incorporó a Rosetta el enfoque de ensamblaje stepwise (SWA, por sus siglas en inglés) para resolver los cuellos de botella del muestreo conformacional en problemas de 10-20 residuos. Encuentra estructuras de muy baja energía mediante una enumeración de pasos residuo a residuo y programación dinámica, y ha superado al muestreo basado en fragmentos allí donde se ha implementado, sobre todo en problemas de RNA y de RNA/proteína. 

A pesar del interés de los laboratorios de RosettaCommons, dos barreras han impedido probarlo en problemas como el modelado de anticuerpos o el diseño de interfaces de proteínas: SWA requería scripts de colas especialmente adaptados a cada clúster y era computacionalmente costoso. Hace poco, el laboratorio Das implementó un método stepwise Monte Carlo (SWM) que elimina estas barreras. SWM es vergonzosamente paralelo y reduce el costo computacional de 10,000 horas de CPU a horas o minutos. El nuevo marco `stepwise` también permite la optimización de secuencia y las restricciones, necesarias para el diseño. Unos pocos pasos sencillos permitirían probar el enfoque stepwise dentro de cualquier protocolo de Rosetta que invoque modelado o diseño sobre subsistemas pequeños, como loops, sitios activos de enzimas y péptidos cíclicos. 

Esta documentación se escribe para ayudar a desarrolladores de distintos laboratorios de RosettaCommons a reunir, mediante el marco de modelado stepwise, avances en el muestreo de proteínas y de RNA que han evolucionado por separado, y para permitir una prueba amplia de un método potente que complementa el arsenal de muestreo actual de la mayoría de los laboratorios. 

Una petición: si actualizas el código o echas en falta algo en esta documentación, *por favor tómate un minuto para EDITAR esta documentación para los futuros desarrolladores.* O, si no puedes hacerlo, envía una nota a rhiju@stanford.edu, quien coordinará las actualizaciones. ¡Gracias!

# El ansatz 'stepwise'
-----------------------
Dadas una o más cadenas de residuos de un motivo cristalográfico que se deben construir de novo de 5’ a 3’ en cada cadena, el Monte Carlo stepwise avanza mediante recursión sobre una serie de *ciclos*, cada uno de los cuales consiste en la instanciación, el muestreo de novo y la minimización de un solo residuo. El objetivo final es extender el fragmento del extremo 5' hacia delante, de 5' a 3', y extender el fragmento del extremo 3' hacia atrás, de 3' a 5', para obtener un loop cerrado.

La suposición de que las estructuras que se dan experimentalmente surgen (o al menos pueden alcanzarse) mediante esta construcción paso a paso de residuos individuales es lo que antes llamamos un 'ansatz stepwise' {Sripakdeevong, PNAS, 2011}. A diferencia de otros modos de Rosetta, stepwise emplea movimientos de un solo residuo, incluidas la eliminación y la adición de residuos individuales. Estos movimientos se concentran en los extremos y se aceptan con frecuencia; esto permite una optimización profunda de una función de energía de todos los átomos. En algunos problemas, los Poses también se pueden dividir y fusionar, y las cadenas separadas se pueden unir (docking) o separar, como se describe más abajo.

El cálculo SWM requiere dos archivos de entrada: (1) un archivo fasta con las secuencias de las cadenas del problema de modelado completo del usuario; y (2) un archivo PDB, o un conjunto de archivos, con las estructuras de partida de entrada del problema. Opcionalmente, el usuario también puede aportar: (3) un archivo PDB nativo, si quiere calcular el RMSD; o (4) un archivo PDB de alineamiento, si quiere mantener el modelado restringido cerca de una estructura existente.


# Flujo de trabajo, de la capa más externa a la más interna de la cebolla
--------------------------------------------------------------
(1) La aplicación `stepwise` crea un objeto `StepWiseMonteCarlo`, que es un `Mover` estándar de Rosetta, y lo aplica a un `pose`. 

(2) En `StepWiseMonteCarlo` se ejecutan varios ciclos de minimización Monte Carlo sobre el Pose, de nuevo con un objeto `MonteCarlo` estándar de Rosetta. 

(3) Cada ciclo implica la selección aleatoria de un `StepWiseMove`. [También hay un modo en el que puedes aplicar un único movimiento para pruebas o para enumeración.]

(4) Aplicar un `StepWiseMove` significa añadir, eliminar, dividir o fusionar algunos residuos del Pose y luego pedir a un `StepWiseModeler` que vuelva a muestrear los grados de libertad (DOF) afectados. Los DOF remuestreados definen un `move_element`, que puede ser los DOF de la cadena principal de un residuo terminal, la conexión covalente interna entre residuos contiguos o un salto (nuevo docking). También es posible no hacer ninguna adición o eliminación covalente al `pose` y, en su lugar, remuestrear una conexión concreta. Estos movimientos de "remuestreo" pueden operar sobre un residuo terminal (en cuyo caso funcionan de forma similar al muestreo del movimiento de "adición") o sobre un residuo interno (en cuyo caso muestrean un subconjunto de torsiones de residuos y usan cierre cinemático para resolver el resto).

(5) El `StepWiseModeler` alinea y empaqueta el Pose y luego ejecuta un `StepWiseConnectionSampler` usando un conjunto de variables preparadas en `StepWiseWorkingParameters`. Ese es el paso clave. Después, el `StepWiseModeler` minimiza uno (o a veces más) de los Poses resultantes.

(6) A partir de los `StepWiseWorkingParameters`, el `StepWiseConnectionSampler` inicializa y ejecuta la funcionalidad stepwise central, llamada `StepWiseSampleAndScreen`.

(7) El objeto `StepWiseSampleAndScreen` es el "bucle principal" central del modelado stepwise. Combina, de forma modular, varios `StepWiseSamplers` posibles (que definen los bucles anidados de muestreo de DOF) y `StepWiseScreeners` (la serie de filtros, cerradores, packers y agrupadores).

# Clases, por directorio
-----------------------
## La aplicación es `stepwise.cc`
-----------------------------------
• La aplicación `stepwise` está disponible en `src/apps/public/stepwise/stepwise.cc`. Está documentada para el usuario general, con demos ilustrativas (¡y videos!) [[aquí|stepwise]]. Actualmente es bastante concisa, y la mayor parte de la preparación se delega a constructores y clases que se describen más abajo. 

• Si añades varias líneas a `stepwise.cc` para añadir funcionalidad, ¡genial! Considera también agrupar esas líneas y trasladarlas al `util.cc` correspondiente en un subdirectorio de `protocols/stepwise/`, para que este archivo principal de la aplicación siga siendo conciso; envía una nota a rhiju para pedir consejo. Si ves una forma de hacer esta aplicación más concisa, ¡mejor aún!

• En el momento de escribir esto, también hay un subdirectorio `src/apps/public/stepwise/legacy/` con `swa_protein_main`, `swa_rna_main` y `swa_rna_util`. Casi toda la funcionalidad de estas aplicaciones más antiguas se ha reconstituido ahora con clases mucho más modulares. Tras algunas comparaciones directas en 2014-2015, la publicación de un artículo de métodos sobre Monte Carlo stepwise y las actualizaciones de ERRASER, el plan es eliminar este código heredado del repositorio.
 
## protocols
------------
Casi todo el código relevante para el Monte Carlo stepwise y el ensamblaje está en `src/protocols/stepwise`.
El contenido de este directorio es el siguiente, por orden de importancia.

### modeler/
Prácticamente todos los movimientos del Monte Carlo stepwise (o de la enumeración stepwise) llaman a `StepWiseModeler`, que está en este directorio. Toma un `pose` y una única posición `moving residue` y resuelve todo a partir de ahí. Aquí es donde deben codificarse las decisiones para, por ejemplo, polímeros no naturales o futuros movimientos que construyan residuos mediante puentes disulfuro. Hay más información en la página [[StepWiseModeler|stepwise-modeler]]. La descripción de las opciones disponibles está en la página [[StepWiseOptions|stepwise-options]].

### monte_carlo/
Movimientos y calendario del muestreo estocástico del Monte Carlo stepwise (abreviado SWM en todo el código). Hay más información sobre las clases resumida en [[Movimientos de Monte Carlo|stepwise-classes-moves]].

### StepWiseSampleAndScreen, sampler/ y screener/
Contienen las distintas clases para enumerar o muestrear estocásticamente residuos (o cuerpos rígidos). Descripción detallada en la página [[StepWiseSampleAndScreen|stepwise-sample-and-screen]].

### options/
El marco de opciones del modelador stepwise deriva de `basic::resource_manager::ResourceOptions`, con una herencia práctica de StepWiseBasicOptions a StepWiseMonteCarloOptions y a StepWiseBasicModelerOptions (que a su vez es la clase madre de StepWiseModelerOptions). Hay una lista razonablemente completa de opciones resumida en la página [[StepWiseOptions|stepwise-options]].

### legacy/
Este subdirectorio contiene mucho código escrito por P. Sripakdeevong y R. Das en 2009-2011 durante pruebas de enumeración stepwise para RNA y proteínas. No era muy modular, y lo de proteínas y lo de RNA no estaban unificados; el marco `stepwise` moderno corrige estos problemas. Como se mencionó antes sobre `apps/public/stepwise/legacy`, estos archivos se eliminarán tras verificar en 2015 que se pueden dejar obsoletos por completo.

## core
--------------------------------------------
### full_model_info
[[FullModelInfo|stepwise-fullmodelinfo]], en `src/core/pose/full_model_info/`, es un importante objeto de contabilidad que mantiene el Pose y que se usa en todo el código de stepwise. 

### scoring
Varios [[términos de energía|stepwise-score]] en `src/core/scoring/` calculan energías de un modelo completo aunque solo se instancien subpiezas (`other_pose`, `loop_close`, `free_side_chain`).

### notas adicionales 
Varias funciones auxiliares desarrolladas para el modelado stepwise se han trasladado a diversas funciones o clases de util.cc. Destacan:

• `correctly_add_cutpoint_variants` en `core/pose/variant_util.hh`. No solo añade variantes CUTPOINT y átomos virtuales para sellar cortes de cadena, sino que también prepara la estructura de enlaces químicos de RNA y de proteína, y elimina otras variantes incompatibles con los puntos de corte.  
• `pdbslice` en `core/pose/util.hh` recorta subconjuntos de residuos de los Poses, con un restablecimiento inteligente de los átomos de salto y un manejo adecuado de las variantes.

## import_pose

Varias funciones de `import_pose/import_pose.cc` ayudan a preparar `Pose`s para el uso específico de `stepwise`. Además, la clase `FullModelPoseBuilder` controla un aspecto importante de cómo `stepwise` interpreta la opción de línea de comando `-s`. A diferencia de las aplicaciones estándar de `jd2` o `jd3`, `stepwise` no supone que cada argumento de `-s` sea un PDB de entrada independiente al que se deba aplicar por separado un `Mover` concreto o un protocolo más complejo. En cambio, cada entrada de `-s` representa un "fragmento" distinto de RNA de entrada que se debe unir mediante loops instanciados.

¿Qué significa esto en la práctica? Pues que necesitamos tomar el archivo fasta (obtenido de `-fasta`) como una especie de guía del "problema de modelado completo" que queremos resolver. Luego reunimos todos los `Pose`s que se dan en `-s` y los interpretamos como un 'Pose enfocado' y un conjunto de Poses 'otros', y guardamos los 'otros' Poses mediante un puntero propietario en el 'Pose principal'. Estas funciones ocultan este comportamiento algo barroco, pero que, afortunadamente, rara vez cambia.

##Véase también

* [[Stepwise options]]: Clases de opciones del código de Stepwise
* [[Writing an application]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[I want to do x]]: Guía para elegir movers para perturbaciones estructurales
* [[Stepwise]]: La aplicación StepWise MonteCarlo
* Aplicaciones para el ensamblaje stepwise determinista:
  * [[Ensamblaje stepwise para loops de proteínas|swa-protein-main]]
    * [[Documentación adicional|swa-protein-long-loop]]
  * [[Modelado de loops de RNA con ensamblaje stepwise|swa-rna-loop]]
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta

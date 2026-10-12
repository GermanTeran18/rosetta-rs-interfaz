GlycanDock
===========

[[_TOC_]]

Metadatos
========

Aplicación creada por Morgan Nance, a partir de la versión original creada por el Dr. Jason Labonte. Consulta https://doi.org/10.1002/jcc.24679 para los detalles de la aplicación original `glycan_dock`.

Por favor, cita: _Development and Evaluation of GlycanDock: A Protein-Glycoligand Docking Refinement Algorithm in Rosetta_; DOI: [10.1021/acs.jpcb.1c00910](10.1021/acs.jpcb.1c00910)

Investigador principal: Dr. Jeffrey Gray (jgray [at] jhu [dot] edu)


Descripción
===========

Aplicación: `GlycanDock`

`GlycanDock` es un protocolo de docking proteína-glicoligando de alta resolución (_es decir_, solo con todos los átomos), de tipo Monte Carlo más minimización. `GlycanDock` trata las cadenas de glicanos (glicoligandos) como oligosacáridos flexibles (y no como un ligando de tipo molécula pequeña con "rotámeros" discretos). El algoritmo de `GlycanDock` parte de una conformación de entrada del glicoligando y la perturba al azar, tanto en el espacio de cuerpo rígido como en el de ángulos de torsión glucosídicos, para promover la diversidad conformacional en cada trayectoria de docking independiente. A continuación, un conjunto de ciclos internos de refinamiento alterna el muestreo de cuerpo rígido y de ángulos de torsión glucosídicos, seguido de la optimización de las cadenas laterales de la proteína y del azúcar en la interfaz y de la minimización de energía del complejo completo. Para promover un muestreo exhaustivo del espacio conformacional local, los ciclos internos de refinamiento están envueltos en un conjunto de ciclos externos que reducen gradualmente el peso atractivo de van der Waals y aumentan gradualmente el peso repulsivo de Lennard–Jones de la función de puntuación REF2015. Así, la búsqueda inicial permite choques y favorece la diversificación, mientras que las etapas finales imponen una estérica estricta; es una estrategia que ha demostrado ser eficaz en [[FlexPepDock | flex-pep-dock]], el algoritmo de docking proteína-péptido de Rosetta.

`GlycanDock` puede hacer docking de mono-, oligo- y polisacáridos a los receptores proteicos de interés. Se toleran glicoligandos con enlaces glucosídicos ramificados o exocíclicos y con diversas modificaciones químicas (_p. ej._, _N_-acetilación, metilación). `GlycanDock` usa el término de energía CHI (CarboHydrate Intrinsic) para asegurar que los diedros glucosídicos queden dentro del espacio de torsión conocido como energéticamente favorable. `GlycanDock` puede refinar un complejo proteína-glicoligando putativo cuando hay relativa confianza en la orientación inicial del glicoligando respecto al sitio de unión (mediante la opción `-refine_only`, que permite pequeñas perturbaciones durante el refinamiento del docking del glicoligando). `GlycanDock` también puede usarse para hallar tanto la orientación como la conformación del glicoligando si solo se conoce el sitio de unión relativo en la proteína (comportamiento predeterminado). `GlycanDock` **no** es un protocolo de docking global: solo busca en el espacio conformacional local alrededor de la posición inicial del glicoligando.

Consulta [[Trabajar con glicanos | WorkingWithGlycans ]] para más información sobre el modelado de carbohidratos en Rosetta.

<!--- BEGIN_INTERNAL -->

Algoritmo
=======
`GlycanDock` emplea diez ciclos internos de muestreo Monte Carlo y optimización de la conformación del glicoligando en la interfaz con el receptor proteico. Los ciclos internos de refinamiento están envueltos por diez ciclos externos que modifican progresivamente los pesos de los términos atractivo (`fa_atr`) y repulsivo (`fa_rep`) de la función de puntuación de Rosetta. Cada uno de los diez ciclos internos realiza dos conjuntos de procedimientos de muestreo y optimización sobre el glicoligando: un conjunto de ocho perturbaciones de cuerpo rígido y un conjunto de ocho perturbaciones de ángulos de torsión glucosídicos (en uno u otro orden en cada ciclo). Cada perturbación va seguida de la optimización de rotámeros de las cadenas laterales de la interfaz, y una de cada dos perturbaciones va seguida de la minimización de energía de toda la estructura.

El muestreo de cuerpo rígido consiste en perturbaciones uniformes del centro de masa del glicoligando y en traslaciones ocasionales del glicoligando hacia el centro de masa del receptor proteico. Este último paso de “deslizamiento” asegura que el glicoligando no se aleje demasiado de la proteína durante la trayectoria de docking. El muestreo de enlaces glucosídicos incluye perturbaciones uniformes y no uniformes de distintas magnitudes sobre ángulos de torsión glucosídicos elegidos al azar. 

Descripción completa:

```
///@brief Main mover for GlycanDockProtocol using default behavior and settings
///
/// Outer cycles controlling score term ramping
///   Cycle 1: fa_atr 1.0 * 3.25  fa_rep 0.55 * 0.45455
///   ...
///.  Cycle 10: fa_atr 1.0  fa_rep 0.55 (default REF2015 values as of Feb 2021)
///
/// Inner cycles controlling glycoligand sampling and optimization
///   Cycle 1-10: Either
///                  8 rigid-body perturbations followed by 8 glycosidic torsion angle perturbations
///                or 8 glycosidic torsion angle perturbations followed by 8 rigid-body perturbations
///               After each single rigid-body or glycosidic torsion angle perturbation
///                pack side-chain rotamers
///                  RotamerTrialsMover at interface for rounds 1–7
///                  RotamerTrialsMover at interface for round 8
///               After every other rigid-body or glycosidic torsion angle perturbation perturbation
///                minimize entire complex
///                  MinMover (glycoligand backbone + sidechains + protein sidechains + docking interface
///             
///   Weights and Movers for rigid-body sampling
///    0.67 RigidBodyPerturbMover (rot = X, ang = Y)
///    0.33 the above and followed by FaDockingSlideIntoContact
///
///   Weights and Movers for glycosidic torsion angle sampling
///    0.45 Phi/Psi Sugar BB Sampling
///    0.3 Small BB Sampling - equal weight to phi, psi, or omega
///      -> 0.171429 +/- 15 degrees
///      -> 0.0857143 +/- 45 degrees
///      -> 0.0428571 +/- 90 degrees
///    0.2 Shear BB Sampling
///    0.0.5 RingPlaneFlipMover
///
```

Opciones y scripting
=======

 - Grupo de opciones: ```carbohydrates:glycan_dock```
 - Consulta el [[ esquema de RosettaScripts para GlycanDockProtocol generado automáticamente | mover_GlycanDockProtocol_type]]



Consejos
====
Consulta [[Trabajar con glicanos | WorkingWithGlycans ]] para más información sobre el modelado de carbohidratos en Rosetta.


Uso típico
===========
Aquí, la entrada `prot_glyc_complex.pdb` es un complejo putativo de una proteína (cadena A) y un glicoligando (cadena X), donde las líneas que definen las coordenadas de cada átomo del glicoligando se encuentran al final del archivo PDB (esto asegura la correcta configuración del [[FoldTree | FoldTree-file]]). La opción `-refine_only` se usa para permitir solo perturbaciones "pequeñas" de los ángulos de torsión glucosídicos durante el docking local. La opción `-auto_detect_glycan_connections` le indica a Rosetta que determine las conexiones (_es decir_, los enlaces atómicos) entre cada residuo de carbohidrato del glicoligando. De este modo, Rosetta creará los registros `HETNAM` y `LINK` necesarios para el archivo .pdb.

```
/Rosetta/main/source/bin/./GlycanDock.default.macosclangrelease -include_sugars -auto_detect_glycan_connections -in:file:s prot_glyc_complex.pdb -nstruct 10 -carbohydrates:glycan_dock:refine_only true
```


<!--- END_INTERNAL -->

Véase también
========
* [[WorkingWithGlycans]] - trabajar con carbohidratos en Rosetta
* [[GlycanInfo]] - obtener información sobre todos los árboles de glicanos de un Pose
* [[GlycanClashCheck]] - obtener datos sobre los choques del modelo con glicanos y entre glicanos, o entre glicanos y otras cadenas proteicas.
* [[GlycanRelax]] - muestrear posibles estados conformacionales de una cadena de glicano, ya sea unida a una proteína o libre.
* [[SimpleGlycosylateMover]] - glicosilar Poses con árboles de glicanos.  
* [[GlycanTreeSelector]] - seleccionar árboles de glicanos individuales o todos ellos
* [[GlycanResidueSelector]] - seleccionar residuos concretos de cada árbol de glicano de interés.
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta

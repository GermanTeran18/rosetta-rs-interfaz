# Diseño multiestado RECON

## Metadatos

El algoritmo RECON fue desarrollado por Alex Sevy en el laboratorio de Jens Meiler. Para cualquier pregunta, contacta a jens@meilerlab.org o alex.sevy@gmail.com.

## Código y demostración

El código fuente de la aplicación está en src/apps/public/recon\_design/recon.cc. Los movers individuales que controlan el comportamiento del algoritmo RECON se encuentran en src/protocols/recon\_design/. Las capturas de protocolo de los trabajos publicados que usan el método se encuentran en https://github.com/sevya/msd_analysis_scripts y https://github.com/sevya/parallelized_RECON_protocol_capture.

## Referencias

Para más información sobre el propósito y el alcance del algoritmo RECON, consulta las siguientes publicaciones:

* Sevy AM, Jacobs TM, Crowe JE, Meiler J. Design of Protein Multi-specificity Using an Independent Sequence Search Reduces the Barrier to Low Energy Sequences. PLoS Comput Biol. 2015;11(7):e1004300.
* Sevy AM, Wu NC, Gilchuk IM, et al. Multistate design of influenza antibodies improves affinity and breadth against seasonal viruses. Proc Natl Acad Sci USA. 2019;116(5):1597-1602.

## Propósito de la aplicación
El algoritmo RECON realiza diseño de multiespecificidad sobre un conjunto de estados de proteína. Se puede usar para mejorar la afinidad de unión a una variedad de dianas, o para estimar el espacio de secuencias disponible para distintas conformaciones. Otros métodos de diseño multiestado pueden ser lentos y estar limitados en cuanto al número de residuos diseñados o al número de estados de entrada. RECON usa una heurística para reducir la cantidad de espacio de secuencias necesario para encontrar una solución multiestado óptima. Esto significa que puedes incorporar otros movimientos, como movimientos de la cadena principal, durante el diseño. RECON puede ejecutarse en paralelo en varios procesadores mediante MPI, lo que permite un gran número de estados en las simulaciones de diseño multiestado.

## Algoritmo 
El algoritmo funciona permitiendo que cada estado de proteína muestree el espacio de secuencias de forma independiente y luego animándolos a converger en una única secuencia mediante restricciones de secuencia. De este modo se puede reducir el gran espacio de secuencias de un problema de diseño, limitando la búsqueda a lo que es factible en el contexto de cada estado individual. Es más útil para el diseño de multiespecificidad, por ejemplo, para diseñar un anticuerpo contra un panel de dianas deseadas con el fin de aumentar su afinidad o su amplitud.

## Movers y filtros específicos de RECON
La aplicación RECON es muy parecida a la aplicación [[RosettaScripts]]. Toma un script XML que define los movers, filtros, funciones de puntuación, etc. que se usarán durante el protocolo. En la aplicación RECON se puede usar cualquier mover normal. También hay dos Movers y un Filtro específicos de RECON que no se pueden usar en un XML mediante RosettaScripts. Estos Movers y Filtros se describen a continuación:

### MSDMover

Mover de diseño multiestado usado en el protocolo RECON. MSDMover aplica restricciones de enlace a un Pose según la secuencia de los demás Poses de entrada y luego usa un mover de diseño predefinido para ejecutar el diseño según esas restricciones de secuencia. Después, estas restricciones se eliminan para el siguiente paso del protocolo.

```xml
<MSDMover name="(&string)" design_mover="(&string)" post_mover="(&string)" resfiles="(&strings)" 
constraint_weight="(1.0 &real)" debug="(false &bool)" />

```

-   design\_mover: un mover definido previamente que diseñará los estados de entrada. Ten en cuenta que, como los resfiles se aplican como una TaskOperation dentro de MSDMover, no es necesario especificar el comportamiento de ReadResfile para el design\_mover; sin embargo, todas las demás TaskOperations deseadas (InitializeFromCommandLine, etc.) deben especificarse en la etiqueta design\_mover
-   post\_mover: un mover definido previamente que actuará sobre los estados de entrada después del paso de diseño.
-   resfiles: una lista de resfiles separados por comas que definen los residuos diseñables y reempaquetables de todos los estados del diseño multiestado. Se pueden usar varios resfiles para varios estados; en ese caso, el primer resfile de la etiqueta se aplicará a la primera estructura, y así sucesivamente. También se admite un único resfile usado para todos los estados.
-   constraint\_weight: el peso de las restricciones de enlace de aminoácidos durante el protocolo RECON. En general, los pesos se aumentan gradualmente de 0.5 a 2.0, para permitir la búsqueda en más espacio de secuencias en las primeras rondas.
-   debug: escribe mensajes adicionales durante el protocolo

### FindConsensusSequence
Mover de diseño multiestado usado al final del protocolo RECON. En el protocolo RECON se diseñan varios estados de forma independiente con una restricción de secuencia que anima a converger en una única solución. Al final se usa FindConsensusSequence para elegir una única secuencia que sea óptima para todos los estados. Lo hace, en cada posición, sustituyendo todos los aminoácidos posibles presentes en al menos un estado, midiendo la aptitud (fitness) de cada aminoácido candidato y eligiendo el mejor. 

```xml
<FindConsensusSequence name="(&string)" scorefxn="(talaris2014 &string)" 
resfiles="(&strings_comma_separated)" task_operations="(&string)" debug="(false &bool)" />

```

-   scorefxn: función de puntuación que se usará para evaluar los mejores aminoácidos en cada posición
-   resfiles: una lista de resfiles que definen los residuos diseñables y reempaquetables de todos los estados del diseño multiestado. Se pueden usar varios resfiles para varios estados; en ese caso, el primer resfile de la etiqueta se aplicará a la primera estructura, y así sucesivamente. También se admite un único resfile usado para todos los estados. Lista de resfiles separados por comas (por ejemplo, resfiles=one.resfile,two.resfile,three.resfile).
-   task\_operations: especifica el comportamiento del packer al sustituir distintos aminoácidos y reempaquetar.
-   debug: escribe mensajes adicionales durante el protocolo

### FitnessFilter
Filtro diseñado para usarse en el protocolo RECON. Mide la aptitud (fitness) de todos los estados de entrada, donde la aptitud se define como la suma de la energía de todos los estados. La aptitud se puede usar luego en un ciclo de Monte Carlo con GenericMonteCarloMover o simplemente escribirse en un scorefile.

```xml
<FitnessFilter name="(&string)" scorefxn="(talaris2014 &string)" output_to_scorefile="(false &bool)" threshold="(&real)" />
```

-   scorefxn: función de puntuación que se usará para evaluar la aptitud
-   output\_to\_scorefile: ¿escribir la aptitud en el scorefile?
-   threshold: umbral para aprobar o rechazar la estructura según la aptitud


## Línea de comandos de ejemplo
#### Sin MPI 
`recon.default.linuxgccrelease -database Rosetta/main/database/ -use_input_sc -ex1 -parser:protocol msd_brub.xml -nstruct 100 -out:suffix _msd_rlx -s state_A.pdb state_B.pdb state_C.pdb state_D.pdb state_E.pdb`

#### MPI
`mpiexec -n 5 recon.mpi.linuxgccrelease -database Rosetta/main/database/ -use_input_sc -ex1 -parser:protocol msd_brub.xml -nstruct 100 -out:suffix _msd_rlx -s state_A.pdb state_B.pdb state_C.pdb state_D.pdb state_E.pdb`

## Consejos
* Recomendamos generar al menos 100 modelos de diseño para lograr una buena convergencia
* Para ejecutar RECON con MPI debes tener exactamente tantos procesos como estados. Por lo tanto, si quieres ejecutar 5 estados, debes ejecutar sobre 5 procesos.
* Puedes hacer que cada estado use un resfile distinto durante RECON, ¡lo que hace el protocolo mucho más flexible! Sin embargo, debes asegurarte de que los estados y los resfiles estén emparejados correctamente. A cada estado se le asigna un resfile elemento por elemento (es decir, cuando definas los resfiles en la etiqueta `resfiles` de MSDMover, asegúrate de que estén en el mismo orden que los estados pasados en la línea de comandos). 
* Si usas varios resfiles y ves el mensaje de error `"Error: all states must have the same number of designable residues"`, significa que los resfiles definen un número distinto de residuos diseñables entre los estados. Todos los estados de entrada deben tener exactamente el mismo número de residuos diseñables; de lo contrario, no se podría establecer la correspondencia entre los distintos estados. Aunque el número de `ALLAA` sea el mismo en todos tus resfiles, puedes obtener un número distinto de residuos diseñables si intentas diseñar una cisteína con puente disulfuro o un residuo que no existe. Comprueba que tus resfiles estén en el mismo orden que tus PDB de entrada.

## Limitaciones
RECON no puede realizar diseño negativo, es decir, diseñar una secuencia que maximice la energía en una conformación dada.

## Véase también
* [[mpi-msd]]: protocolo alternativo para realizar diseño multiestado con MPI. 
* [[PackRotamersMover]]: empaqueta y diseña rotámeros de cadenas laterales. Útil como mover de diseño para MSDMover.
* [[RosettaScripts]]: referencia sobre cómo funcionan el XML y los Movers y Filtros en Rosetta
* [[I want to do x]]: guía para elegir un mover
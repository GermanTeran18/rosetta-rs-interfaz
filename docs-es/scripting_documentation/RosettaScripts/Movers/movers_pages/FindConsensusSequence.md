# FindConsensusSequence
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FindConsensusSequence

###Autor
Alex Sevy (alex.sevy@gmail.com); 
PI: Jens Meiler

###Descripción

Mover de diseño multiestado que se usa al final del protocolo RECON. En el protocolo RECON se diseñan varios estados de forma independiente con una restricción de secuencia que favorece la convergencia hacia una única solución. Al final se usa FindConsensusSequence para elegir una única secuencia que sea óptima para todos los estados. Lo hace, en cada posición, sustituyendo todos los aminoácidos posibles presentes en al menos un estado, midiendo la aptitud (fitness) de cada aminoácido candidato y eligiendo el mejor. Para más detalles sobre el protocolo RECON, consulta [Sevy AM, et al, PLoS Comput. Biol, 2015](http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004300)

```xml
<FindConsensusSequence name="(&string)" scorefxn="(talaris2014 &string)" 
resfiles="(&strings\_comma\_separated)" task_operations="(&string)" debug="(false &bool)" />

```

-   scorefxn: función de puntuación que se usa para evaluar los mejores aminoácidos en cada posición
-   resfiles: una lista de resfiles que definen los residuos diseñables y reempaquetables de todos los estados del diseño multiestado. Pueden usarse varios resfiles para varios estados; en ese caso, el primer resfile de la etiqueta se aplicará a la primera estructura, etc. También se admite un único resfile usado para todos los estados.
-   task_operations: especifica el comportamiento del packer al sustituir distintos aminoácidos y reempaquetar.
-   debug: escribe mensajes adicionales durante el protocolo

##Véase también

* [[MSDMover]]: mover de diseño que se usa durante el diseño multiestado RECON
* [[I want to do x]]: guía para elegir un mover

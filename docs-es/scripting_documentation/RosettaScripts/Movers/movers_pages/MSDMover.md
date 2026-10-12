# MSDMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MSDMover

###Autor
Alex Sevy (alex.sevy@gmail.com); 
PI: Jens Meiler

###Descripción

Mover de diseño multiestado usado en el protocolo RECON. MSDMover aplica restricciones de enlace a un Pose según la secuencia de otros Poses de entrada y luego usa un mover de diseño predefinido para ejecutar el diseño basado en esas restricciones de secuencia. Después estas restricciones se eliminan para el siguiente paso del protocolo. Para más detalles sobre el protocolo RECON consulta [Sevy AM, et al, PLoS Comput. Biol, 2015](http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004300)

```xml
<MSDMover name="(&string)" design_mover="(&string)" resfiles="(&strings)" 
constraint_weight="(1.0 &real)" debug="(false &bool)" />

```

-   design\_mover: un mover definido previamente que diseñará los estados de entrada. Ten en cuenta que, como los resfiles se aplican como TaskOperation dentro de MSDMover, no es necesario indicar el comportamiento de ReadResfile para design\_mover; sin embargo, todas las demás TaskOperations que quieras (InitializeFromCommandLine, etc.) deben indicarse en la etiqueta de design\_mover
-   resfiles: una lista de resfiles separados por comas que definen los residuos diseñables y reempaquetables de todos los estados del diseño multiestado. Se pueden usar varios resfiles para varios estados; en ese caso el primer resfile de la etiqueta se aplicará a la primera estructura, y así sucesivamente. También se admite un único resfile para todos los estados.
-   constraint_weight: el peso de las restricciones de enlace de aminoácidos durante el protocolo RECON. Por lo general los pesos se aumentan de 0.5 a 2.0, para permitir explorar más espacio de secuencias en las primeras rondas.
-   debug: muestra mensajes adicionales durante el protocolo

##Véase también

* [[FindConsensusSequence]]: hace converger todos los estados del diseño multiestado RECON en una única secuencia. Se usa al final del protocolo RECON. 
* [[PackRotamersMover]]: empaqueta y diseña rotámeros de cadenas laterales. Es útil como mover de diseño para MSDMover.
* [[I want to do x]]: guía para elegir un mover

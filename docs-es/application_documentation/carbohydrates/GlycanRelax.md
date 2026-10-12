GlycanRelax
===========

[[_TOC_]]

Metadatos
========

Aplicación creada por el Dr. Jared Adolf-Bryfogle (jadolfbr@gmail.com) y el Dr. Jason Labonte (JWLabonte@jhu.edu), en colaboración con el Dr. Sebastian Rämisch (raemisch@scripps.edu)

Investigadores principales: Dr. William Schief (schief@scripps.edu) y Dr. Jeffrey Gray (jgray@jhu.edu)


Descripción
===========

Aplicación: glycan_relax


Glycan Relax busca muestrear los posibles estados conformacionales de carbohidratos, ya sea unidos a una proteína o libres.  Es extremadamente rápido.  Actualmente emplea varias estrategias para ello, con estadísticas de diversos artículos, el término de energía CHI (CarboHydrate Intrinsic) y un nuevo marco para el muestreo de diedros de la cadena principal. Las estadísticas de conformeros están adaptadas de la aplicación Glycan Relax del laboratorio Schief, usada y escrita originalmente por Yih-En Andrew Ban.

Puede modelar glicanos a partir de geometría ideal o refinar glicanos ya modelados.

Consulta [[Trabajar con glicanos | WorkingWithGlycans ]] para más información.

<!--- BEGIN_INTERNAL -->

Algoritmo
=======

En cada ronda se optimiza un solo residuo para el muestreo de la cadena principal o del enlace, o varios para la minimización. El número total de rondas escala linealmente con el número de residuos que se van a muestrear.

Por defecto, se optimizan todos los árboles de glicanos del Pose. 

Actualmente usa un muestreador aleatorio con un conjunto de pesos para cada mover de muestreo.  El empaquetado de los grupos OH y de los residuos circundantes se hace de forma intermitente.  Al final del protocolo se hace una ronda final de empaquetado/minimización/empaquetado. 

Descripción completa:
```
///@brief Main mover for Glycan Relax, which optimizes glycans in a pose.
/// Each round optimizes either one residue for 
       BB sampling, linkage, or multiple for minimization.
/// Currently uses a random sampler with a set of weights to each mover for sampling.
///
/// Weights are currently as follows:
///  .40 Phi/Psi Sugar BB Sampling
///  .20 Linkage Conformer Sampling
///  .30 Small BB Sampling - equal weight to phi, psi, or omega
///    -> .17 +/- 15 degrees
///    -> .086 +/- 45 degrees
///    -> .044 +/- 90 degrees
///  .05 MinMover
///  .05 PackRotamersMover
///
```

Opciones
=======

 - Grupo de opciones: ```carbohydrates:GlycanRelax```
 
```

-glycan_relax_test, 'Boolean',
    default = false
    desc = Indicates to go into testing mode for Glycan Relax.  
           Will try all torsions in a given PDB in a linear fashion
    

-glycan_relax_rounds, 'Integer'
        default = 75
	desc = Number of rounds to use for Glycan Relax. 
               Total rounds is this # times number of glycan residues in movemap
	

-pack_glycans, 'Boolean',
        default = false
	desc = Pack Glycan OH groups during Glycan Relax. Currently time consuming
	
	
-final_min_glycans, Boolean
        default = true
	desc = 'Do a final minimization of glycans after glycan relax protocol?
	
	
-glycan_relax_movie, Boolean
	desc = Make a movie of accepts and trials (send to pymol)
	default = false

-glycan_relax_kt, Real
        default = 2.0
	desc = KT for GlycanRelaxMover
	

-glycan_relax_random_start, Boolean
        default = false
	desc = Randomize the starting glycans set to move before the protocol.  
                Used to create increased diversity.
	

-glycan_relax_sugar_bb_start, Boolean
        default = false
	desc = "Randomize the starting glycans using sugar bb data before the protocol.
	

```

Consejos
====
El tiempo de ejecución del protocolo escala con el número de glicanos.  El número total de rondas es el producto de ```-glycan_relax_rounds``` * total_glycan_residues.
Hemos observado que, para la mayoría de los usos, 75 rondas base dan estructuras bien optimizadas.  
Por lo general se recomienda la opción ```-glycan_relax_random_start``` si se hace diseño de novo.  Esta opción aumenta la diversidad de los glicanos resultantes.

En cuanto a los decoys, si es posible conviene intentar producir entre 10,000 y 100,000 decoys (o aumentar el número de rondas).  Somos conscientes de que, a medida que aumenta el número de glicanos, esta cantidad de decoys se vuelve
relativamente inalcanzable.  Se está trabajando en combinar métodos basados en fragmentos con nuestra metodología GlycanRelax para superar este problema en algunas circunstancias.

Uso típico
===========
Aquí hay un ejemplo de modelado de un Pose ya glicosilado.

```
glycan_relax.default.macosclangrelease -include_sugars -write_pdb_link_records \
-s glyco_pose.pdb -nstruct 10000 -glycan_relax_rounds 75 -glycan_relax_random_start
```

Scripting
=========
Esta aplicación es en sí misma un mover y puede llamarse directamente dentro de RosettaScripts. Consulta [[GlycanRelaxMover]] para más información.  

También está disponible en PyRosetta:
```
from rosetta import *
from rosetta.protocols.carbohydrates import GlycanRelaxMover
rosetta.init('-include_sugars -write_pdb_link_records')

p = Pose("my_glycosylated_pose")
glycan_relax = GlycanRelaxMover()
glycan_relax.apply(p)

print p
```
Esto modelará todos los glicanos con la función de puntuación predeterminada de Rosetta.  Opcionalmente, se pueden especificar un movemap, una función de puntuación y un taskfactory.  La mayoría de las opciones de línea de comandos también se pueden establecer a través del objeto.  Las que no se establezcan se pueden establecer en la función rosetta.init() de PyRosetta:
```
glycan_relax.set_movemap(mm)
glycan_relax.set_scorefunction(scorefxn)
glycan_relax.set_taskfactory(tf)

glycan_relax.set_rounds(100)
glycan_relax.set_kt(5.0)
```

<!--- END_INTERNAL -->

## Véase también
* [[WorkingWithGlycans]]

- ### Aplicaciones
* [[GlycanInfo]] - obtener información sobre todos los árboles de glicanos de un Pose
* [[GlycanClashCheck]] - obtener datos sobre los choques del modelo con glicanos y entre glicanos, o entre glicanos y otras cadenas proteicas.

- ### Componentes de RosettaScripts
* [[GlycanRelaxMover]] - modela árboles de glicanos usando información conocida sobre carbohidratos.  Sirve tanto para el modelado de novo completo como para el refinamiento.
* [[SimpleGlycosylateMover]] - glicosila Poses con árboles de glicanos.  
* [[GlycanTreeSelector]] - selecciona árboles de glicanos individuales o todos ellos
* [[GlycanResidueSelector]] - selecciona residuos concretos de cada árbol de glicano de interés.

- ### Otros
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta

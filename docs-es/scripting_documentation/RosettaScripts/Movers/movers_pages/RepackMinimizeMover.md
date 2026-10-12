# RepackMinimize
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## RepackMinimize

RepackMinimize realiza los pasos de diseño/reempaquetado y de minimización usando distintas funciones de puntuación según lo definido por el protocolo. Para la mayoría de los fines, la combinación de [[PackRotamersMover|PackRotamersMover]] con [[MinMover|MinMover]] ofrece más flexibilidad y transparencia que RepackMinimize, y es la opción recomendada.

repack\_partner1 (y 2) define cuál de los compañeros se diseña. Si no se definen residuos concretos, se reempaqueta/diseña la interfaz. Si se definen residuos concretos, se reempaqueta/diseña y minimiza una capa de residuos alrededor de esos residuos diana. repack\_non\_ala decide si se cambian o no las posiciones que no son Ala. Es útil para diseñar un ala\_pose de modo que las posiciones que se cambiaron en pasos anteriores no se rediseñen. min\_rigid\_body minimiza la orientación de cuerpo rígido (como en docking).

```xml
<RepackMinimize name="&string" scorefxn_repack="(score12 &string)" scorefxn_minimize="(score12 &string)" repack_partner1="(1 &bool)" repack_partner2="(1 &bool)" design_partner1="(0 &bool)" design_partner2="(1 &bool)" interface_cutoff_distance="(8.0 &Real)" repack_non_ala="(1 &bool)" minimize_bb="(1 &bool * see below for more details)" minimize_rb="(1 &bool)" minimize_sc="(1 &bool)" optimize_fold_tree="(1 & bool)" task_operations="('' &string)">
    <residue pdb_num/res_num="(&string)" />
</RepackMinimize>
```

-   scorefxn\_repack
-   scorefxn\_minimize
-   interface\_cutoff\_distance: los residuos más alejados de la interfaz que este umbral no se diseñarán ni minimizarán.
-   repack\_non\_ala: si es true, cambia las posiciones que no son Ala. Si es false, deja en paz las posiciones que no son Ala. Es útil para diseñar un ala\_pose de modo que las posiciones que se cambiaron en pasos anteriores no se rediseñen.
-   minimize\_bb\*: ¿minimizar la conformación de la cadena principal? (\*véase la línea siguiente)
-   minimize\_bb\_ch1 y/o minimize\_bb\_ch2: permite especificar la cadena principal de qué cadena(s) se minimizará
-   minimize\_rb: ¿minimizar la orientación de cuerpo rígido? (como en docking)
-   optimize\_fold\_tree: véase arriba
-   task\_operations: lista de task operations separadas por comas. Es una forma más segura de trabajar con restricciones definidas por el usuario que automatic\_repacking=false.
-   pdb\_num/res\_num: consulta la [[documentación principal de RosettaScripts|RosettaScripts#rosettascripts-conventions_specifying-residues]] para más información.

Si no se fija ninguna opción repack\_partner1/2, puedes especificar repack=0/1 para controlar ambas. Igualmente con design\_partner1/2 y design=0/1


##Véase también

* [[DesignMinimizeHbondsMover]]
* [[PackRotamersMover]]
* [[MinMover]]
* [[MinPackMover]]
* [[PrepackMover]]
* [[Minimization overview]]
* [[Fixbb]]: aplicación para empaquetar rotámeros
* [[SymPackRotamersMover]]: versión simétrica de este mover
* [[PackRotamersMoverPartGreedyMover]]
* [[TryRotamersMover]]
* [[RotamerTrialsMover]]
* [[RotamerTrialsMinMover]]
* [[RotamerTrialsRefinerMover]]
* [[I want to do x]]: guía para elegir un mover

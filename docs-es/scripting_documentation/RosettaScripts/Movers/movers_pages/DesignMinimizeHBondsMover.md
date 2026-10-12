# designminimizehbonds
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## DesignMinimizeHBonds

Igual que RepackMinimize, con la adición de que se puede definir una lista de residuos objetivo con los que formar puentes de hidrógeno. Dentro de una esfera de radio 'interface\_cutoff\_distance' alrededor de los residuos objetivo, los residuos se configuran para ser diseñados. Los residuos permitidos para el diseño se restringen a residuos que forman puentes de hidrógeno según si se definen donadores (STRKWYQN), aceptores (EDQNSTY) o ambos. Si se han diseñado residuos que, tras el diseño, no forman puentes de hidrógeno con los residuos objetivo con energías inferiores a hbond\_energy, esos residuos se convierten en Ala.

```xml
<DesignMinimizeHbonds name="(design_minimize_hbonds &string)" hbond_weight="(3.0 &float)" scorefxn_design="(score12 &string)" scorefxn_minimize="score12)" donors="design donors? &bool" acceptors="design acceptors? &bool" bb_hbond="(0 &bool)" sc_hbond="(1 &bool)" hbond_energy="(-0.5 &float)" interface_cutoff_distance="(8.0 &float)" repack_partner1="(1 &bool)" repack_partner2="(1 &bool)" design_partner1="(0 &bool)" design_partner2="(1 &bool)" repack_non_ala="(1 &bool)" min_rigid_body="(1 &bool)" task_operations="('' &string)">
        <residue pdb_num/res_num="(&string)" />
</DesignMinimizeHbonds>
```

-   hbond\_weight: establece el aumento (en veces) de los términos de puentes de hidrógeno en cada una de las funciones de puntuación definidas.
-   bb\_hbond: ¿cuentan los puentes de hidrógeno cadena principal-cadena principal?
-   sc\_hbond: ¿cuentan los puentes de hidrógeno cadena principal-cadena lateral y cadena lateral-cadena lateral?
-   hbond\_energy: el umbral de energía por debajo del cual un puente de hidrógeno se cuenta como tal.
-   repack\_non\_ala,task\_operations: consulta RepackMinimize
-   optimize\_fold\_tree: consulta DockingProtocol
-   pdb\_num/res\_num: consulta la [[documentación de RosettaScripts|RosettaScripts#rosettascripts-conventions_specifying-residues]] para más información.


##Véase también

* [[RepackMinimizeMover]]
* [[MinPackMover]]
* [[PackRotamersMover]]
* [[I want to do x]]: guía para elegir un mover

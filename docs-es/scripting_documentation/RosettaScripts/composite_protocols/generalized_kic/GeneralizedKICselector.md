# Selectores de GeneralizedKIC

[[Volver a RosettaScripts|RosettaScripts]]

## Visión general
Los selectores de [[GeneralizedKIC]] (clase protocols::GeneralizedKIC::GeneralizedKICselector) eligen una única solución, según algún criterio, de entre las muchas soluciones que produce GeneralizedKIC. Un solo intento de cierre con GeneralizedKIC puede producir de 0 a 16 soluciones y normalmente se intentan muchos cierres, por lo que es necesario especificar un método para elegir una única solución.

## Uso dentro de RosettaScripts
Cada [[mover GeneralizedKIC|GeneralizedKIC]] tiene asignado uno y solo un selector de GeneralizedKIC. En RosettaScripts, esto debe especificarse en el bloque **\<GeneralizedKIC\>** de la forma siguiente:

```xml
<MOVERS>
...
     <GeneralizedKIC ... selector="&string" selector_scorefunction="&string" selector_kbt="(1.0 &real)" pre_selection_mover="&string">
          ...
     </GeneralizedKIC>
...
</MOVERS>
```

Los tags **selector_scorefunction** y **selector_kbt** son opcionales y solo los usan ciertos selectores.

## Tipos de selectores
1.  Aleatorio (**selector="random_selector"**)<br>Como indica el nombre, este selector elige al azar una solución de las encontradas. No se considera ninguna opción.

2.  Menor energía (**selector="lowest_energy_selector"**)<br>Este selector elige la solución de menor energía encontrada. Se le debe proporcionar una función de puntuación (tag **selector_scorefunction**). Como no se hace ningún reempaquetado antes de puntuar, se recomienda usar una función de puntuación que solo considere la geometría de la cadena principal (véase más abajo). Un ejemplo sería una función de puntuación formada por alguna combinación de los términos **hbond_lr_bb**, **hbond_sr_bb**, **rama**, **omega** y **p_aa_pp**. El tag **selector_scorefunction** es la única opción que considera este selector.

3.  Aleatorio ponderado por Boltzmann (**selector="boltzmann_energy_selector"**)<br>Este selector elige una solución al azar, pero ponderada por un factor exp(-E/kbt). Esto significa que debe puntuar la energía de cada solución, por lo que, igual que el selector de menor energía, se le debe proporcionar una función de puntuación (preferiblemente solo de la cadena principal) con el tag **selector_scorefunction**. También se le debe proporcionar una temperatura de Boltzmann, en unidades de energía de Rosetta, con el tag **selector_kbt**. Los tags **selector_scorefunction** y **selector_kbt** son las únicas opciones que considera este selector.

4.  Menor RMSD (**selector="lowest_rmsd_selector"**)<br>Este selector elige la solución con el menor RMSD en el espacio cartesiano respecto de la conformación de entrada del loop. Por tanto, se usa mejor en estructuras que ya tienen una conformación de loop cerrada que se quiere perturbar sutilmente (_p. ej._ con el [[perturbador de GeneralizedKIC|GeneralizedKICperturber]] **[[perturb_dihedral|GeneralizedKICperturber]]**).

5.  Menor delta de torsión (**selector="lowest_delta_torsion_selector"**)<br>Este selector elige la solución con el menor RMSD en el espacio de _torsión_ respecto de la conformación de entrada del loop. Igual que **lowest_rmsd_selector**, se usa mejor en estructuras que ya tienen una conformación de loop cerrada que se quiere perturbar sutilmente.

## Funciones de puntuación recomendadas para selectores basados en energía

Los selectores basados en energía, como los de menor energía y aleatorio ponderado por Boltzmann, deben puntuar las soluciones candidatas con alguna función de puntuación. La función de puntuación talaris2013 de todos los átomos sería, en general, una mala opción para esto, porque no se hace ningún reempaquetado ni minimización de energía antes de puntuar para eliminar choques de cadenas laterales. Por este motivo, se recomienda una función de puntuación que considere solo la geometría de la cadena principal, o una que considere la geometría de la cadena principal y de las cadenas laterales pero no las interacciones de largo alcance de las cadenas laterales. A continuación se dan dos ejemplos.

```xml
<bb_hbond_tors weights="empty.wts" symmetric="0">
#A backbone-only scorefunction that only includes the backbone hydrogen-bonding, omega, rama,
#and p_aa_pp terms from the talaris2013 scorefunction.
	<Reweight scoretype="hbond_sr_bb" weight="1.17" />
	<Reweight scoretype="hbond_lr_bb" weight="1.17" />
	<Reweight scoretype="omega" weight="0.5" />
	<Reweight scoretype="rama" weight="0.2" />
	<Reweight scoretype="p_aa_pp" weight="0.32" />
</bb_hbond_tors>
```

```xml
<bb_hbond_tors_fadun_cst weights="empty.wts" symmetric="0">
#A scorefunction that only includes the backbone hydrogen-bonding, omega, rama,
#and p_aa_pp terms from the talaris2013 scorefunction, as well as the side-chain
#fa_dun term and constraint weights.  Note that side-chains are not repacked, so
#the fa_dun term will be identical for all side-chains EXCEPT those that are part
#of the loop to be closed (e.g. the side-chains of the cysteines of a disulfide).
	<Reweight scoretype="hbond_sr_bb" weight="1.17" />
	<Reweight scoretype="hbond_lr_bb" weight="1.17" />
	<Reweight scoretype="omega" weight="0.5" />
	<Reweight scoretype="rama" weight="0.2" />
	<Reweight scoretype="p_aa_pp" weight="0.32" />
	<Reweight scoretype="fa_dun" weight="0.56" />
	<Reweight scoretype="atom_pair_constraint" weight="1.0" />
	<Reweight scoretype="angle_constraint" weight="1.0" />
	<Reweight scoretype="dihedral_constraint" weight="1.0" />
</bb_hbond_tors_fadun_cst>
```

## El mover de preselección

Como alternativa opcional a limitarse a términos de puntuación de la cadena principal, GeneralizedKIC permite al usuario especificar un mover de preselección (**pre_selection_mover="&string"**) definido antes del bloque GeneralizedKIC. Esto permite movimientos de cadenas laterales, como el reempaquetado o la minimización de cadenas laterales, antes de puntuar con la función de energía completa. Ten en cuenta que este mover se aplicará a _todas_ las soluciones candidatas que pasen los filtros, ¡lo que hace que esta opción pueda ser computacionalmente muy costosa!

Si se especifica un mover de preselección, el mover puede alterar la geometría fuera del loop que se va a cerrar, o puede alterar el FoldTree, en cuyo caso estas alteraciones se trasladarán al Pose final que devuelve GeneralizedKIC. Se pueden usar [[TaskOperations|TaskOperations-RosettaScripts]] y [[MoveMaps|movemap-file]] de forma adecuada en la definición del mover en cuestión para restringir sus efectos al loop sobre el que opera GeneralizedKIC, si el usuario no quiere alterar la geometría fuera de ese loop. Si se quiere aplicar más de un mover de preselección (por ejemplo, un [[PackRotamersMover|Movers-RosettaScripts#PackRotamersMover]] seguido de un [[MinMover|Movers-RosettaScripts#MinMover]] solo de cadenas laterales, para reempaquetar y minimizar cadenas laterales), se pueden combinar en un mover [[ParsedProtocol|Movers-RosettaScripts#ParsedProtocol-(formerly-DockDesign)]].

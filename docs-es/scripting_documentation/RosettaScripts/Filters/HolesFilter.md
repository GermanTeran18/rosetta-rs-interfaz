# HolesFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Holes

Usa el código de empaquetado de Will Sheffler (holes) para evaluar los vacíos o huecos en el empaquetado.

Puedes pasar un selector de residuos para calcular la puntuación de holes solo para esa selección:
El cálculo de holes se hace sobre el Pose completo (ignorando el ResidueSelector), pero a la hora de informar la puntuación solo se suman los átomos del selector de residuos. La puntuación de Holes es de todos modos una suma de átomos o residuos individuales (técnicamente "PoseBalls"), así que al informar solo una selección concreta deberíamos poder obtener datos específicos de una zona. 

**Cómo interpretar la puntuación de holes**: un valor de 0.0 equivale a las estructuras nativas observadas en el PDB; un valor positivo es peor (más vacíos) y uno negativo es mejor (menos vacíos). Esto vale para los HolesParams por defecto que se usan aquí, que son dec15; no se recomienda cambiarlos a menos que sepas cómo funciona por dentro este código.

```xml
<Holes name="(&string)" threshold=“(&real)" residue_selector="(&string)" normalize_per_atom="(&bool)" normalize_per_residue="(&bool)" exclude_bb_atoms="(&bool)"  />
```

###Ejemplo

```
#compute holes around h-bond networks; correlates better than using the total holes score
<RESIDUE_SELECTORS>
  # get all network residues as output by HBNet
  <ResiduePDBInfoHasLabel name="hbnet_residues" property="HBNet" />
  # select everything within 5A around the network residues
  <Neighborhood name="around_hbnet" selector="hbnet_residues" distance="5.0" />
  # select only the buried residues within this set
  <Layer name="hbnet_core" select_core="true" core_cutoff="3.6" />  # select core using sidechain neighbors (don’t use SASA because of potential voids!)
  <And name="core_around_hbnet" selectors="hbnet_core,around_hbnet"/>
</RESIDUE_SELECTORS>
<FILTERS>
  # holes score only around h-bond networks
  <Holes name="network_holes" threshold="1.8" residue_selector="core_around_hbnet" normalize_per_atom="true" exclude_bb_atoms="true" confidence="0"/>
  # holes score of the full pose
  <Holes name="full_holes" threshold="1.8" confidence="0"/>
</FILTERS>
<PROTOCOLS>
  <Add filter="network_holes" />
  <Add filter="full_holes" />
</PROTOCOLS>
```

### Opciones
-   *threshold (Real):* devuelve falso si supera este número; más positivo es peor (más vacíos) y más negativo es mejor (menos vacíos); por defecto=2.0
-   *residue_selector (string):* pasa el selector de residuos que quieras y holes calculará la puntuación solo para los residuos de ese selector; el cálculo se hace sobre el Pose completo (ignorando el ResidueSelector), pero a la hora de informar la puntuación solo se suman los átomos del selector de residuos. Por defecto=""
-   *exclude_bb_atoms (bool):* no incluye los átomos de la cadena principal (bb) en el caso de la selección de residuos: por defecto=false
-   *normalize_per_residue (bool):* en el caso del selector de residuos, normaliza por residuo; no se recomienda; por defecto=false
-   *normalize_per_atom (bool):* en el caso del selector de residuos, normaliza por átomo; por defecto es false, pero esta opción pasa a true si se indica residue_selector y el usuario no define explícitamente normalize_per_atom ni normalize_per_residue.

## Nota
Para usar la opción -holes::dalphaball, primero debes compilar el ejecutable correspondiente en source/external/DAlpahBall. Para ello ve a `main/source/external/DAlpahBall` y escribe `make`.  (Puede que tengas que hacer ajustes específicos de tu plataforma en el Makefile.)  Luego pasa la ruta del ejecutable producido a la opción -holes::dalphaball.

## Véase también:

* [[Docking proteína-proteína|docking-protocol]]
* [[InterfaceHolesFilter]]
* [[ShapeComplementarityFilter]]
* [[SSShapeComplementarityFilter]]
* [[ResInInterfaceFilter]]
* [[SpecificResiduesNearInterfaceFilter]]
* [[ExposedHydrophobicsFilter]]

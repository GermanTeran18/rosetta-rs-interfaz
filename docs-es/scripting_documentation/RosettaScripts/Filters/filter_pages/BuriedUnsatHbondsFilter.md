# BuriedUnsatHbonds
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## BuriedUnsatHbonds

Número máximo permitido de átomos polares enterrados no satisfechos. Este filtro se actualizó de forma importante el 18 de diciembre de 2017: los usuarios pueden elegir distintos comportamientos de informe, y por defecto devuelve el número de donadores/aceptores de átomos pesados enterrados que no participan en ningún enlace de hidrógeno.  El comportamiento antiguo contaba todos los no satisfechos por igual y usaba un cálculo al estilo ddG (restar el \#no satisfechos no unido del \#no satisfechos unido); estas opciones siguen disponibles, pero ya no son las predeterminadas.  Ahora el filtro usa por defecto una definición más generosa de enlace de hidrógeno (antes se excluían muchos enlaces de hidrógeno legítimos por excepciones de la sfxn); los usuarios pueden elegir entre la SASA heredada y VSASA para el enterramiento (por defecto es el varsoldist de VSASA de Andrew); ahora se admiten Poses con más de 3 cadenas; el filtro ahora es compatible con simetría, y los usuarios pueden pasar sym_dof_names como en el [[SymUnsatHbondsFilter]] de Jacob Bale.  El comportamiento antiguo del filtro se puede restaurar con use_legacy_options="true", pero solo se recomienda para fines de benchmark.

Para ver un estudio de los átomos polares enterrados en estructuras de proteínas nativas, consulta [[HBond-Preferences-Of-Buried-Polars]]. 

### Restaurar el comportamiento del filtro antiguo: 
Si `use_legacy_options="true"`, el filtro funciona exactamente como antes y espera las mismas opciones, con este comportamiento:
Si se especifica un número de jump (por defecto=1), este número se calcula a través de la interfaz de ese jump. Si jump\_number=0, el filtro se calcula para un monómero. Ten en cuenta que el \#no satisfechos de los monómeros suele ser mucho mayor que 20. Observa que en estos cálculos no se supone la presencia de agua. Con task\_operations puedes decidir qué residuos se usan para calcular la estadística. SOLO se usarán para el cálculo los residuos definidos como reempaquetables (o diseñables). Los demás se ignoran. Un aspecto delicado es que los enlaces de hidrógeno no satisfechos de la cadena principal también se cuentan solo para los residuos mencionados en task\_operations, por lo que esto es algo inconsistente.

### Ejemplos de uso recomendados: 
Se pueden incluir varias instancias para informar distintas métricas: 
Toda la información sobre todos los tipos de no satisfechos se informa en el log y se puede imprimir en la salida de archivos pdb:

```
# old filter, recapitulates results of this filter before Dec 16 2017
<BuriedUnsatHbonds use_legacy_options="true" name="(&string)" scorefxn="(&string)" jump_number="(1 &Size)" cutoff="(20 &Size)" task_operations="(&string)"/>

# report number of backbone (bb) heavy-atom buns, using residue selector:
#  many native and de novo backbones have at least a couple of legit buried unsats in the backbone; most occur in loops or other flexible regions, but setting this to 0 will throw out potentially good designs; best to set cutoff to a few, or use confidence="0"
<BuriedUnsatHbonds name="new_buns_bb_heavy" residue_selector="(&string)" report_bb_heavy_atom_unsats="true" scorefxn="(&string)" cutoff="4" residue_surface_cutoff="20.0" ignore_surface_res="true" print_out_info_to_pdb="true" />

# report the number of sidechain (sc) heavy-atom buns, using a residue selector
#  if doing design, and residue selector is design space, you want this to be 0
<BuriedUnsatHbonds name="new_buns_sc_heavy" residue_selector="(&string)" report_sc_heavy_atom_unsats="true" scorefxn="(&string)" cutoff="0" residue_surface_cutoff="20.0" ignore_surface_res="true" print_out_info_to_pdb="true" />

```

### Más ejemplos de uso recomendados: 
Esta sección es más bien una historia sobre la evolución de los filtros de no satisfechos enterrados en el laboratorio Baker durante 2018.

La historia empieza con los ejemplos de filtros de no satisfechos enterrados de la sección anterior: "Ejemplos de uso recomendados". Estaban en uso a comienzos de 2018, y las versiones combinadas BB+SC se muestran a continuación:

**BUNS de 2018 que SÍ TIENEN el error de rotación**
```
<BuriedUnsatHbonds name="new_buns_all_heavy" residue_selector="(&string)" report_all_heavy_atom_unsats="true" scorefxn="(&string)" cutoff="4" residue_surface_cutoff="20.0" ignore_surface_res="true" print_out_info_to_pdb="true" confidence="0" />

<BuriedUnsatHbonds name="new_buns_all_heavy_interface" residue_selector="(&string)" report_all_heavy_atom_unsats="true" scorefxn="(&string)" cutoff="4" ignore_surface_res="false" print_out_info_to_pdb="true" use_ddG_style="true" confidence="0" />
```

Sin embargo, durante 2018 se redescubrió un hecho conocido desde hace tiempo sobre el filtro de no satisfechos enterrados: si el Pose rota en el espacio, cambia el número de no satisfechos enterrados. En un caso de prueba simple, un Pose tenía entre 0 y 4 no satisfechos enterrados según su orientación. El mecanismo exacto es la naturaleza aproximada del calculador de SASA por defecto. Alrededor de cada átomo se genera un conjunto de puntos moleculares y la SASA se calcula a partir de ellos. Pero el número de puntos es discreto y su posición no rota con el Pose. Como resultado, orientaciones distintas generan bolas de SASA distintas.

La solución fue usar el método analítico de SASA del ejecutable DAlphaBall, que se usaba originalmente para Holes. DAlphaBall se puede generar yendo a ```Rosetta/main/source/external/DAlpahBall``` y escribiendo ```make```. Asegúrate de poner las bibliotecas del compilador en directorios accesibles; por ejemplo, en Mac OSX, ```conda install -c anaconda gfortran_osx-64 gmp``` y luego ```ln -s ~/miniconda3/lib/libgfortran.* /usr/local/lib```.

**BUNS de 2018 que NO TIENEN el error de rotación**
```
# Both of these examples require the following commandline flag:
-holes:dalphaball Rosetta/main/source/external/DAlpahBall/DAlphaBall.macgcc

# Additionally, a bit of testing shows that a probe_radius≈1.1 best correlates with new_buns_all_heavy

<BuriedUnsatHbonds name="buns_all_heavy_ball" residue_selector="(&string)" report_all_heavy_atom_unsats="true" scorefxn="(&string)" cutoff="4" residue_surface_cutoff="20.0" ignore_surface_res="true" print_out_info_to_pdb="true" dalphaball_sasa="1" probe_radius="1.1" confidence="0" />

<BuriedUnsatHbonds name="buns_all_heavy_ball_interface" residue_selector="(&string)" report_all_heavy_atom_unsats="true" scorefxn="(&string)" cutoff="4" ignore_surface_res="false" print_out_info_to_pdb="true" use_ddG_style="true" dalphaball_sasa="1" probe_radius="1.1" confidence="0" />
```

Con una definición más precisa de los no satisfechos enterrados, ahora fue posible examinarlos con más detalle. David Baker señaló que quizá habría que preocuparse menos por los no satisfechos enterrados cerca de la superficie y más por los que están enterrados en lo profundo del núcleo; un concepto al que llamó "no satisfechos muy enterrados". Con esta definición en mente, Brian Coventry propuso los dos tipos siguientes de no satisfechos enterrados:

**VBUNS**
* no satisfechos muy enterrados (very buried unsats)
* todo lo que esté a más de 5.5A de profundidad se considera enterrado de forma incondicional
* a la espera de futuras mejoras para el modelado explícito del agua
 
```
# burial_cutoff is set arbitrarily high so that every atom deeper than 5.5 is considered buried
<BuriedUnsatHbonds name="vbuns_all_heavy" residue_selector="(&string)" report_all_heavy_atom_unsats="true" scorefxn="(&string)" ignore_surface_res="false" print_out_info_to_pdb="true" atomic_depth_selection="5.5" burial_cutoff="1000" confidence="0" />

# we must define a burial cutoff for the apo form because otherwise, we may accidentally count buried unsats present in the monomer that are not caused by complex formation
# Requires the following commandline flag:
-holes:dalphaball Rosetta/main/source/external/DAlpahBall/DAlphaBall.macgcc
<BuriedUnsatHbonds name="vbuns_all_heavy_interface" residue_selector="(&string)" report_all_heavy_atom_unsats="true" scorefxn="(&string)" ignore_surface_res="false" print_out_info_to_pdb="true" atomic_depth_selection="5.5" burial_cutoff="1000" use_ddG_style="true" burial_cutoff_apo="0.2" dalphaball_sasa="true" probe_radius="1.1" confidence="0" />
```

**SBUNS**
* no satisfechos enterrados en la superficie (surface buried unsats)
* todo lo que esté a menos de 5.5A de profundidad usa la SASA de DAlphaBall para determinar el enterramiento
* Aunque VBUNS y SBUNS están diseñados de modo que ```BUNS ≈ VBUNS + SBUNS```, debido al enterramiento incondicional de VBUNS, en general: ```BUNS <= VBUNS + SBUNS```
 
```
# This is the same as buns_all_heavy_ball but using atomic_depth to only select the surface
# We set atomic_depth_deeper_than="false" to select surface
<BuriedUnsatHbonds name="sbuns_all_heavy_ball" residue_selector="(&string)" report_all_heavy_atom_unsats="true" scorefxn="(&string)" cutoff="4" residue_surface_cutoff="20.0" ignore_surface_res="true" print_out_info_to_pdb="true" dalphaball_sasa="1" probe_radius="1.1" atomic_depth_selection="5.5" atomic_depth_deeper_than="false" confidence="0" />

# This is the same as buns_all_heavy_ball_interface but using atomic_depth to only select the surface
# We set atomic_depth_deeper_than="false" to select surface
<BuriedUnsatHbonds name="sbuns_all_heavy_interface" residue_selector="(&string)" report_all_heavy_atom_unsats="true" scorefxn="(&string)" cutoff="4" ignore_surface_res="false" print_out_info_to_pdb="true" use_ddG_style="true" dalphaball_sasa="1" probe_radius="1.1" atomic_depth_selection="5.5" atomic_depth_deeper_than="false" confidence="0" />
```

Consulta [[esta_página|rosetta_basics/scoring/ApproximateBuriedUnsatPenalty#visualizing-the-burial-region]] para ver código en Python que visualiza la región de enterramiento (el enlace funciona aunque aparezca en rojo).

### Simetría
Ahora el filtro reconoce la simetría.  En el caso simétrico, por defecto la simetría se detecta automáticamente y solo se cuentan los totales de la unidad asimétrica (ASU).  Si `use_ddG_style="true"`, se espera que los usuarios definan `sym_dof_names`, y si `sym_dof_names="true"`, se usa por defecto el estilo ddG; esto se comporta igual que el [[SymUnsatHbondsFilter]] de Jacob Bale para simetría multicomponente; si `use_ddG_style="true"` y no se define `sym_dof_names`, se buscará en los residuos de la interfaz simétrica (`only_interface="true"`).  El espacio de búsqueda también se puede definir con residue_selector.

### Todas las opciones
-   use_legacy_options: vuelve a las opciones heredadas (equivale al filtro BuriedUnsat original y antiguo; ¡ADVERTENCIA! si es true, sobrescribe todas las demás opciones); por defecto es false.
-   generous_hbonds: cuenta todos los enlaces de hidrógeno (no solo los que puntúa la scorefxn por defecto en Rosetta); por defecto es true. 
-   use_vsasa: usa vsasa en lugar de la sasa heredada para el cálculo del enterramiento; por defecto es true.
-   ignore_surface_res: muchos átomos polares de la superficie se marcan como no satisfechos enterrados porque los tapa una cadena lateral larga (p. ej., Lys o Arg) que podría apartarse fácilmente; esta opción ignora los residuos de la superficie, definidos por SASA (por defecto) o por sc_neighbors si use_sc_neighbors=true.
-   ignore_bb_heavy_unsats: ignora los no satisfechos de átomos pesados de la cadena principal cuando se usa el comportamiento estilo hbnet; por defecto false.
-   use_sc_neighbors: usa sc_neighbors en lugar de SASA para los cálculos de enterramiento; por defecto false.
-   use_ddG_style: hace un cálculo al estilo ddG: los no satisfechos se calculan restando todos los no satisfechos del estado unido a los del estado no unido; así funciona el BuriedUnsatHBondsFilter original; por defecto false.
-   ddG_style_dont_recalc_surface: corrige un error(?) cuando se usan juntas use_ddG_style e ignore_surface_res. En la estructura apo se recalculan los surface_res, lo que puede producir no satisfechos enterrados espurios cuando nuevos residuos pasan a ser de superficie y ya no se cuentan.
-   jump_number: el jump sobre el que se evalúa el filtro; solo se aplica con use_ddG_style.
-   only_interface: restringe la búsqueda de no satisfechos solo a los residuos de la interfaz; si es true y hay más de una cadena, se ignora; por defecto false. 
-   cutoff: el umbral superior de enlaces de hidrógeno no satisfechos enterrados que se cuentan, por encima del cual el filtro falla; por defecto 20.
-   print_out_info_to_pdb: imprime toda la información en el archivo pdb además de en el tracer. 
-   probe_radius: radio de la sonda que se usa en los cálculos de enterramiento por SASA; por defecto se toma de sasa_calculator_probe_radius en el código de opciones, que por defecto es 1.4.
-   dalphaball_sasa: usa DAlphaBall para calcular la SASA. Debe incluirse la opción -holes:dalphaball.
-   burial_cutoff: se usa para determinar el enterramiento; el atomic_burial_cutoff de la SASA heredada es 0.3 por defecto; el umbral de VSASA es 0.1 por defecto; si use_sc_neighbors=true, el valor por defecto pasa a ser 4.4, o puede especificarse el umbral de sc_neighbor que se desee.
-   probe_radius_apo: si es mayor que 0, usa un probe_radius distinto para la fase apo de use_ddG_style.
-   burial_cutoff_apo: si es mayor que 0, usa un burial_cutoff distinto para la fase apo de use_ddG_style.
-   residue_surface_cutoff: umbral que determina qué residuos son de superficie si ignore_surface_res=true; por defecto es 45.0 para SASA, 20.0 para VSASA y 2.0 si use_sc_neighbors=true.
-   atomic_depth_selection: incluye solo los átomos que superan cierta profundidad. La profundidad va desde el borde de la superficie de SASA hasta el centro del átomo. Antes de calcular la superficie de SASA, el Pose se convierte en poli-LEU. -1 para desactivarla.
-   atomic_depth_probe_radius: radio de la sonda para atomic_depth_selection. Ponlo alto para excluir poros. Ponlo bajo para que la superficie de SASA entre en los poros.
-   atomic_depth_deeper_than: si es true, solo se incluyen los átomos más profundos que atomic_depth_selection. Si es false, solo se incluyen los átomos menos profundos que atomic_depth_selection.
-   use_reporter_behavior: informa como puntuación del filtro el tipo de no satisfechos activado; ahora es TRUE por defecto.
-   report_all_heavy_atom_unsats: informa todos los no satisfechos de átomos pesados; SI TODAS LAS OPCIONES DE INFORME SON FALSE, ESTA PASA A SER TRUE Y POR DEFECTO SE INFORMAN TODOS LOS NO SATISFECHOS DE ÁTOMOS PESADOS.
-   report_all_unsats: informa el total de todos los no satisfechos (comportamiento heredado del filtro antiguo).
-   report_sc_heavy_atom_unsats: informa los no satisfechos de átomos pesados de la cadena lateral.
-   report_bb_heavy_atom_unsats: informa los no satisfechos de átomos pesados de la cadena principal.
-   report_nonheavy_unsats: informa los no satisfechos de átomos que no son pesados (Hpol).
-   use_hbnet_behavior: no se permiten no satisfechos pesados (devuelve 9999); si no hay no satisfechos pesados, cuenta los no satisfechos de Hpol; FALSE por defecto; si es true, NO se usa el comportamiento de reporter.
-   sym_dof_names: para simetría multicomponente: qué jump(s) se usan para la separación al estilo ddG. (Según el Dr. Bale: en sistemas multicomponente, basta pasar los nombres de los sym_dofs que controlan los jumps maestros. En sistemas de un solo componente, todavía se puede usar jump.)  SI DEFINES ESTA OPCIÓN, se usará la separación al estilo ddG para el cálculo.
-   [[residue_selector|ResidueSelectors]]: selector de residuos que indica al filtro que restrinja la búsqueda de no satisfechos solo a esos residuos.
-   task_operations: definen los residuos que se examinan mediante operaciones de tarea (comportamiento heredado del filtro antiguo); ahora se recomienda usar residue_selector.

# Véase también:
* [[HBond-Preferences-Of-Buried-Polars]]
* [[HbondsToResidueFilter]]
* [[HbondsToAtomFilter]]
* [[SymUnsatHbondsFilter]]
* [[BuriedUnsatHbonds2Filter]]
* [[ResidueSelectors]]

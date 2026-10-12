# LayerDesign
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*

_Ten en cuenta que, desde enero de 2019, LayerDesign ya no admite diseño no canónico. Para diseño no canónico, usa el ResidueSelector [[Layer|ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_layerselector]]._

_Ten en cuenta también que planeamos dejar obsoleto LayerDesign por completo dentro de poco. Actualiza tus scripts para usar en su lugar el ResidueSelector [[Layer|ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_layerselector]] y la TaskOperation [[DesignRestrictions|DesignRestrictionsOperation]]._

Layer design se usa para controlar qué aminoácidos están disponibles para diseño en cada posición de residuo según el contexto local, _p_._ej_. la exposición al solvente y la estructura secundaria. Cada residuo se asigna a una de tres capas: núcleo, frontera o superficie. Los dos métodos para determinar la accesibilidad al solvente son: SASA (área de superficie accesible al solvente de la cadena principal + CB) y vecinos de cadena lateral (número de cadenas laterales de aminoácidos en un cono que se extiende a lo largo del vector CA-CB). Con SASA, la exposición al solvente de la posición diseñada depende de la conformación de las cadenas laterales vecinas; esto es útil cuando haces una o dos mutaciones y no cambias muchos aminoácidos vecinos. Con los vecinos de cadena lateral, la exposición al solvente depende de hacia dónde apunte la cadena lateral del aminoácido; esto es útil para el diseño _de novo_ o para protocolos en los que se diseñarán muchos aminoácidos a la vez.

En esencia, layer design es un truco para evitar que el packer ponga demasiados aminoácidos hidrofóbicos en la superficie de la proteína y demasiados residuos polares en su interior. Las mejoras de la función de energía harán algún día innecesario el layer design.

**Nota: la TaskOperation LayerDesign quedará obsoleta en el futuro.** El LayerDesign heredado rompe la conmutatividad, y esto lleva a un comportamiento opaco y a menudo problemático. En su lugar, recomendamos usar el ResidueSelector [[LayerSelector|ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_layerselector]] y la TaskOperation [[DesignRestrictions|DesignRestrictionsOperation]]. El control de qué regiones del Pose se diseñan o empaquetan debe hacerse con una TaskOperation [[OperateOnResidueSubset|OperateOnResidueSubsetOperation]].
* La documentación del LayerDesign heredado sigue accesible al final de esta página.

##LayerDesign

Este es un ejemplo de implementación de LayerDesign con LayerSelector y DesignRestrictions. 

```xml
<RESIDUE_SELECTORS>

	<!-- Layer Design -->
	<Layer name="surface" select_core="false" select_boundary="false" select_surface="true" use_sidechain_neighbors="true"/>
	<Layer name="boundary" select_core="false" select_boundary="true" select_surface="false" use_sidechain_neighbors="true"/>
	<Layer name="core" select_core="true" select_boundary="false" select_surface="false" use_sidechain_neighbors="true"/>
	<SecondaryStructure name="sheet" overlap="0" minH="3" minE="2" include_terminal_loops="false" use_dssp="true" ss="E"/>
	<SecondaryStructure name="entire_loop" overlap="0" minH="3" minE="2" include_terminal_loops="true" use_dssp="true" ss="L"/>
	<SecondaryStructure name="entire_helix" overlap="0" minH="3" minE="2" include_terminal_loops="false" use_dssp="true" ss="H"/>
	<And name="helix_cap" selectors="entire_loop">
		<PrimarySequenceNeighborhood lower="1" upper="0" selector="entire_helix"/>
	</And>
	<And name="helix_start" selectors="entire_helix">
		<PrimarySequenceNeighborhood lower="0" upper="1" selector="helix_cap"/>
	</And>
	<And name="helix" selectors="entire_helix">
		<Not selector="helix_start"/>
	</And>
	<And name="loop" selectors="entire_loop">
		<Not selector="helix_cap"/>
	</And>

</RESIDUE_SELECTORS>

<TASKOPERATIONS>

	<DesignRestrictions name="layer_design">
		<Action selector_logic="surface AND helix_start"	aas="DEHKPQR"/>
		<Action selector_logic="surface AND helix"		aas="EHKQR"/>
		<Action selector_logic="surface AND sheet"		aas="EHKNQRST"/>
		<Action selector_logic="surface AND loop"		aas="DEGHKNPQRST"/>
		<Action selector_logic="boundary AND helix_start"	aas="ADEHIKLMNPQRSTVWY"/>
		<Action selector_logic="boundary AND helix"		aas="ADEHIKLMNQRSTVWY"/>
		<Action selector_logic="boundary AND sheet"		aas="DEFHIKLMNQRSTVWY"/>
		<Action selector_logic="boundary AND loop"		aas="ADEFGHIKLMNPQRSTVWY"/>
		<Action selector_logic="core AND helix_start"		aas="AFILMPVWY"/>
		<Action selector_logic="core AND helix"			aas="AFILMVWY"/>
		<Action selector_logic="core AND sheet"			aas="FILMVWY"/>
		<Action selector_logic="core AND loop"			aas="AFGILMPVWY"/>
		<Action selector_logic="helix_cap"			aas="DNST"/>
	</DesignRestrictions>

</TASKOPERATIONS>

```

**diferencias respecto del LayerDesign heredado en el ejemplo anterior**
* Si el primer residuo de una cadena está en una hélice, la selección helix_cap no funcionará, así que la prolina no estará disponible en la posición del residuo helix_start (se asignará a la selección helix).
* Se usan minH="3" minE="2" en las selecciones de estructura secundaria para que el diseño sea más robusto frente a conformaciones raras de loops. El comportamiento del LayerDesign heredado sería: minH="1" minE="1".
* Se permite la metionina en la frontera y en el núcleo.
* Se permite la glicina en los loops del núcleo.
* Se permite la histidina en la frontera.
* Asp, Asn, Ser y Thr no se incluyen en las posiciones de superficie de las hélices (salvo en el inicio de la hélice). [Estos residuos tienen un efecto desestabilizador en las proteínas cuando se incluyen en hélices](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5568797/), y parece improbable que una estructura requiera uno de estos aminoácidos concretos en una posición de superficie (siguen permitidos en las posiciones de frontera de las hélices).
* Asp no se incluye en las posiciones de superficie de las láminas beta. [Este residuo tiene un efecto desestabilizador en las proteínas cuando se incluye en láminas beta](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5568797/), y parece improbable que una estructura requiera este aminoácido concreto en una posición de superficie.


##LayerDesign heredado

Aunque no se recomienda, los usuarios todavía pueden usar la TaskOperation LayerDesign original.

Se pueden definir capas adicionales en el archivo xml pasando otra TaskOperation para obtener la selección de residuos. Solo se tienen en cuenta los residuos marcados como diseñables en la tarea del packer; no se considera ninguna información sobre los aminoácidos/rotámeros disponibles seleccionados por la TaskOperation. Los aminoácidos que se usarán en cada una de estas capas nuevas deben especificarse en el xml. Se pueden combinar varias TaskOperations para obtener la intersección entre los distintos conjuntos de residuos diseñables.

LayerDesign, como todas las TaskOperations, obedece la conmutatividad: el efecto de aplicar otra TaskOperation antes de LayerDesign es el mismo que el de aplicarla después de LayerDesign. Sin embargo, los residuos definidos por las operaciones PIKAA, NATAA o NATRO en un resfile suelen ser residuos «especiales» que uno querría dejar en paz. La opción <b>ignore_pikaa_natro=true</b> lo permite, a costa de romper la conmutatividad. Si el usuario usa esta opción y se lee un resfile antes de llamar a LayerDesign, la operación LayerDesign no se aplica a los residuos definidos por PIKAA, NATAA o NATRO en el resfile.

Ten en cuenta que esta tarea es compatible con ligandos. Sin embargo, el usuario debe establecer el ligando como reempaquetable pero no diseñable con otra TaskOperation.

        <LayerDesign name="(&string layer)" layer="(&string core_boundary_surface)" pore_radius="(&real 2.0)" core="(&real 20.0)" surface="(&real 40.0)" ignore_pikaa_natro="(&bool 0)" repack_non_design="(&bool 1)" make_rasmol_script="(&bool 0)" make_pymol_script="(&bool 0)" use_sidechain_neighbors="(&bool 0)" use_symmetry="(&bool 1)" sc_neighbor_dist_midpoint="(9.0 &Real)" sc_neighbor_dist_exponent="(1.0 &Real)" sc_neighbor_angle_shift_factor="(0.5 &Real)" sc_neighbor_angle_exponent="(2.0 &Real)" sc_neighbor_denominator="(1.0 &Real)" >
            <ATaskOperation name="task1" >
                <all copy_layer="(&string layer)" append="(&string)" exclude="(&string)"  specification="(&string 'designable')"  operation="(&string 'design')" />
                <SecStructType aas="(&string)" append(&string) exclude="(&string)" />            
            </ATaskOperation >
        </LayerDesign>

Lista de opciones

-   layer ( por defecto "core\_boundary\_surface\_other" ) : capa que se diseñará; otros ejemplos: core\_surface significa diseñar solo las capas de núcleo y superficie; other se refiere a las capas adicionales definidas con packertasks.
-   use\_original\_non\_designed\_layer ( por defecto, 0 ) : restringe al reempaquetado las capas no diseñadas.
-   pore\_radius ( por defecto 2.0) : radio de poro para calcular el área de superficie accesible.
-   core ( por defecto 20.0) : los residuos cuya asa es \< core se definen como núcleo.
-   surface ( por defecto 40.0) : los residuos cuya asa es \> surface se definen como superficie.
-   (layer)\_(ss): establece el umbral de asa para un elemento de estructura secundaria concreto en una capa concreta. Por ejemplo, surface\_E=30 hace que para los residuos de hebra el umbral de asa sea 30 en lugar del definido por surface.
-   ignore\_pikaa\_natro: si es verdadero, y si se lee un resfile antes de aplicar esta TaskOperation, ignora los residuos que se hayan establecido en el resfile con los comandos PIKAA, NATRO o NATAA.
-   make\_rasmol\_script: si es verdadero, escribe un script de rasmol que colorea los residuos según las tres capas básicas: núcleo, frontera y superficie.
-   make\_pymol\_script: si es verdadero, escribe un script de pymol que colorea los residuos según las tres capas básicas y las capas adicionales definidas por TaskOperations.
-   repack\_non\_design: si es verdadero, las cadenas laterales se reempaquetarán; de lo contrario, se dejan intactas.
-   use\_sidechain\_neighbors: si es verdadero, asigna las capas de un residuo contando el número de átomos CA de otros residuos dentro de un cono frente al vector ca-cb del residuo. Como esta opción ya no se basa en SASA, las asignaciones de capa serán siempre idénticas sea cual sea la secuencia de la proteína; es decir, las capas podrían asignarse a partir de una cadena principal de polialanina y no habría diferencia. Esta opción cambia los valores predeterminados de core y surface a neighbors < 2 (superficie) y neighbors > 5.2 (núcleo). SIN EMBARGO, ¡estos valores predeterminados se sobrescribirán si core y surface se especifican manualmente al declarar la TaskOperation! Así que asegúrate de no especificar nuevos valores de core y surface apropiados para SASA cuando en realidad estás contando residuos vecinos.
-   sc_neighbor_dist_midpoint, sc_neighbor_dist_exponent, sc_neighbor_angle_shift_factor, sc_neighbor_angle_exponent, sc_neighbor_denominator: Estos valores ajustan con precisión el comportamiento de la lógica de conteo de residuos de los vecinos de cadena lateral. Normalmente, el usuario no necesita cambiarlos de sus valores predeterminados. Para más detalles, consulta la documentación del ResidueSelector [[LayerSelector|ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_layerselector]].

Las TaskOperations se pueden combinar con el tag CombinedTasks; las tareas anidadas no necesitan nombre, solo declararse con su tipo y parámetros.

        <CombinedTasks name=combined_task>
             <ATaskOperation />
             <AnotherTaskOperation />
        </CombinedTasks>

_**Actualmente obsoleto, pronto llegará una nueva sintaxis para la asignación de residuos.**_
Después de combinar las tareas, necesitas asignar residuos; puedes usar el tag 'all' para asignar residuos a todos los distintos elementos de estructura secundaria.

        <combined_task>
            <all copy_layer="(&string)" append="(&string)" exclude="(&string)"  specification="(&string 'designable')"  operation="(&string 'design')"/>
        </combined_task>

Las opciones del tag "all" son las siguientes:

-   copy\_layer: capa de la que copiar la definición de residuos; puede ser core, boundary, surface o una capa definida por una tarea.
-   aa: asigna los residuos siguientes a la capa definida. La cadena se compone de códigos de aminoácidos de una letra.
-   append: añade los residuos siguientes a la capa definida (es decir, los suma a los ya permitidos en esta capa). La cadena se compone de códigos de aminoácidos de una letra.
-   exclude: lo contrario de append (elimina residuos de la lista permitida para la capa).
-   specification: Qué residuos de la TaskOperation deben considerarse como la capa. Las opciones son "designable" (elige los residuos diseñables), "repacakble" (elige los residuos restringidos solo a reempaquetado) o "fixed" (residuos marcados por la tarea como no reempaquetables). El valor por defecto es "designable".
-   operation: Qué hacer con la capa especificada. El valor por defecto es 'design'; las otras opciones son 'no\_design' (permite el reempaquetado) y 'omit'. Si se elige 'omit', layer design ignorará los residuos de la capa (es decir, no restringirá el diseño).

Después de una operación all se pueden hacer otras definiciones, por ejemplo:

        <combined_task>
            <all copy_layer=surface/>
            <Strand append="F"/>
        </combine_task>

copia la definición de la capa surface y añade Phe a los tipos de residuo disponibles solo en los residuos de las hebras.

A continuación se indican los tipos de aminoácido seleccionados para cada capa; esto se puede sobrescribir en el xml:

core

-   Loop: AFILPVWY
-   Strand: FIL VWY
-   Helix: AFIL VWY ( P solo al inicio de la hélice )
-   HelixCapping: DNST

boundary

-   Loop: ADEFGIKLNPQRSTVWY
-   Strand: DEF IKLN QRSTVWY
-   Helix: ADE IKLN QRSTVWY ( P solo al inicio de la hélice )
-   HelixCapping: DNST

surface

-   Loop: DEGHKNPQRST
-   Strand: DE HKN QRST
-   Helix: DE HKN QRST ( P solo al inicio de la hélice )
-   HelixCapping: DNST

Nterm

-   all: ACDEFGHIKLMNPQRSTVWY

Cterm

-   all: ACDEFGHIKLMNPQRSTVWY

<!-- -->

     Este ejemplo crea una capa nueva que combina BuildingBlockInterface (interfaz simétrica) con SelectBySasa, que selecciona el núcleo del complejo.
     Como aplicar TaskOperations devuelve la intersección de los conjuntos, esta tarea combinada devolverá los residuos enterrados de la interfaz simétrica.

```xml
    <LayerDesign name=layer layer=other >

        <CombinedTasks name=symmetric_interface_core>
            <BuildingBlockInterface  />
            <SelectBySASA state=bound core=1 />
        </CombinedTasks>

         assign to the new layer for the interface core the same residues as for the surface and append for all possible secondary structures , append  phe and a leu to all ss types.

        <symmetric_interface_core>
            <all copy_layer=surface append="FL"/>
        </symmetric_interface_core>

    </LayerDesign>
```

## LayerDesign con simetría

En su implementación original, LayerDesign solo podía funcionar con simetría si se le pasaba una TaskOperation compatible con simetría (p. ej., SelectBySASA, usada en el ejemplo anterior). Más recientemente se ha añadido la opción ```use_symmetry``` para que LayerDesign tenga en cuenta la simetría. Si ```use_symmetry``` es verdadera (el valor por defecto), las capas de los Poses simétricos se definen usando el Pose simétrico completo. Si ```use_symmetry``` es falsa, se conserva el comportamiento antiguo: se extrae la unidad asimétrica y se usa de forma aislada para configurar las capas. Este es un ejemplo muy sencillo en el que se usa LayerDesign para forzar valina en el núcleo, alanina en la capa de frontera y serina en la superficie de un Pose simétrico, considerando explícitamente los vecinos que puedan estar en otras unidades asimétricas del Pose simétrico.

```xml
<LayerDesign name=layerdes layer=core_boundary_surface use_sidechain_neighbors=true core=2 surface=1 use_symmetry=true >
    <core>
        <all aa="V" />
    </core>
    <boundary>
        <all aa="A" />
    </boundary>
    <surface>
        <all aa="S" />
    </surface>
</LayerDesign>
```




##Véase también

* [[Aplicaciones de diseño|Design-applications]]: varios métodos para hacer diseño en Rosetta
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

# SecondaryStructure
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## SecondaryStructure

```xml
<SecondaryStructure name="(&string, required)"
    residue_selector="(&string, TrueSelector)"
    use_abego="(&int, optional)"
    blueprint="(&string)"
    ss="(&string)"
    abego="(&string)"
    compute_pose_secstruct_by_dssp="(&bool, false)"
    threshold="(&real, 1.0)" />
```

Filtra estructuras comparando la estructura secundaria del Pose con una estructura secundaria deseada. El filtro informa un valor de N_COINCIDENTES / N_TOTAL, donde N_COINCIDENTES es el número de residuos de proteína seleccionados cuya estructura secundaria coincide con la estructura secundaria deseada, y N_TOTAL es el número total de residuos de proteína seleccionados.

Si compute_pose_secstruct_by_dssp es false (por defecto), la estructura secundaria actual del Pose debe estar correctamente fijada en el Pose. Esto se puede hacer con [[DsspMover]], como se muestra en el ejemplo de abajo.  Si compute_pose_secstruct_by_dssp es false, se usará automáticamente DSSP sobre el Pose de entrada para determinar la estructura secundaria del Pose.

-   residue_selector: selector de residuos que determina qué residuos del Pose se deben comprobar.  Ten en cuenta que por ahora los residuos que no son de proteína siempre se omiten. Por defecto: todos los residuos de proteína.
-   ss: si se especifica, la cadena de estructura secundaria dada, p. ej., "HHHHHLLLHHHHH", se usará como estructura secundaria deseada. Debe coincidir con la longitud del Pose de entrada. Por defecto: no especificada.
-   use_dssp: si es false, la estructura secundaria almacenada en el Pose se usará como estructura secundaria del Pose. Esto exige que se haya fijado con DsspMover o por otros medios antes de llamar al filtro.  Si es true, se usa DSSP sobre el Pose de entrada para determinar su estructura secundaria.
-   blueprint: nombre de archivo opcional de un archivo blueprint (p. ej., "../input.blueprint"). La estructura secundaria deseada (y el abego, si use\_abego=1) se fijará con este archivo blueprint.  Esta opción anula la estructura secundaria fijada con la opción "ss".
-   abego: cadena de valores de abego deseados (p. ej., "XAAAAGBABBBB"). La cadena de abego debe coincidir con la longitud del Pose. Si se especifica, use\_abego se pone automáticamente en true.
-   use\_abego: 0 o 1. Si es true, exige que los valores de abego coincidan con la cadena de abego deseada además de las coincidencias de estructura secundaria.
-   threshold: fracción de la estructura secundaria que debe coincidir con la estructura secundaria deseada para que el Pose pase el filtro. (por defecto=1.0).  1.0 indica que todos los residuos deben coincidir con la estructura secundaria deseada.

**Especificación de la estructura secundaria** :

-   E: lámina
-   H: hélice
-   h: no hélice (es decir, E o L)
-   L: loop
-   D: comodín (permite cualquier cosa)

Ejemplo con un blueprint:

```xml
      <SecondaryStructure name="ss_filter1"  use_abego="1" blueprint="input.blueprint" />
```

Ejemplos con estructuras derivadas de top7

(Entrada)

```xml
<FILTERS>
        <SecondaryStructure name="ss" ss="LEEEEEEEELLLLEEEEEEEELLLLHHHHHHHHHHHHHHHLLLEEEEEEELLLHHHHHHHHHHHHHHHHHLLLLhhEEEEELLEEEEEEEL"/>
</FILTERS>
<MOVERS>
         <Dssp name="dssp"/>
</MOVERS>
<PROTOCOLS>
    <Add mover="dssp"/>
    <Add filter="ss"/>
</PROTOCOLS>
```

(Salida)

```
(when passed) 

protocols.fldsgn.filters.SecondaryStructureFilter: LEEEEEEEELLLLEEEEEEEELLLLHHHHHHHHHHHHHHHLLLEEEEEEELLLHHHHHHHHHHHHHHHHHLLLLhhEEEEELLEEEEEEEL was filtered with 91 residues matching LEEEEEEEELLLLEEEEEEEELLLLHHHHHHHHHHHHHHHLLLEEEEEEELLLHHHHHHHHHHHHHHHHHLLLLLLEEEEELLEEEEEEEL


(when failed)

protocols.fldsgn.filters.SecondaryStructureFilter: SS filter fail: current/filtered = H/L at position 25
protocols.fldsgn.filters.SecondaryStructureFilter: LEEEEEEEELLLLEEEEEEEELLLLHHHHHHHHHHHHHHHLLLEEEEEEELLLHHHHHHHHHHHHHHHHHLLLLhhEEEEELLEEEEEEEL was filtered with 90 residues matching LEEEEEEEELLLLEEEEEEEELLLHHHHHHHHHHHHHHHHLLLEEEEEEELLLHHHHHHHHHHHHHHHHHLLLLEEEEEEELLEEEEEEEL
```

## Véase también:

* [[Modelado ab initio|abinitio-relax]]
* [[Modelado de loops|loopmodel]]
* [[AngleToVectorFilter]]
* [[DsspMover]]
* [[GeometryFilter]]
* [[HelixKinkFilter]]
* [[SecondaryStructureHasResidueFilter]]
* [[TorsionFilter]]

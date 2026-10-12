# CoordinateConstraintGenerator
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## CoordinateConstraintGenerator

Genera restricciones de coordenadas para limitar los átomos del Pose a coordenadas concretas. Las restricciones de coordenadas pueden generarse según el estado del Pose en el momento de aplicarlas o, de forma opcional, a partir de un Pose nativo aparte.


Recuerda que, para que tengan efecto, el término de puntuación coordinate_constraint debe estar activado en la función de puntuación. Se recomienda encarecidamente aplicar una raíz virtual a tu Pose antes de aplicar estas restricciones, sobre todo si restringes respecto a un nativo. (Consulta el mover [[VirtualRootMover]].)


```xml
<CoordinateConstraintGenerator name="(&string)"
    residue_selector="(&string TrueSelector)"
    sd="(&Real 0.5)"
    bounded="(&bool false)"
    bounded_width="(&Real 0.0)"
    sidechain="(&bool false)"
    ca_only="(&bool false)"
    ambiguous_hnq="(&bool false)"
    native="(&bool false)"
    align_reference="(&bool false)" />
```

* **residue_selector** - si se indica, las restricciones se aplican solo a los residuos seleccionados. Si no se indica, se aplicarán a todos los residuos del Pose.
* **sd** - la fuerza/desviación de las restricciones que se usarán (p. ej. -relax:coord_cst_stdev)
* **bounded** - si se usan restricciones armónicas (false) o acotadas (true)
* **bounded_width** - el ancho de la restricción acotada (p. ej. -relax::coord_cst_width)
* **sidechain** - si se restringen los átomos pesados de la cadena principal (false) o todos los átomos pesados (true) (p. ej. -relax:coord_constrain_sidechains)
* **ca_only** - si es true, solo se restringirán los átomos CA. Si es false, se restringirán todos los átomos (si sidechain=true) o todos los átomos pesados de la cadena principal (si sidechain=false).
* **ambiguous_hnq** - Si es true, se generarán restricciones ambiguas para las cadenas laterales de His, Asn y Gln, que restringirán cada átomo de la cadena lateral a cualquiera de los dos átomos posibles (p. ej., en Asn, OD1 quedaría restringido a las coordenadas de OD1 o de ND2, el que esté más cerca en cada momento mientras se mueve el Pose).
* **native** - si es true, se usa como referencia el Pose de -in:file:native en lugar del Pose en el momento de aplicar. Se usa una heurística basada en el tamaño y en las designaciones PDB para emparejar los residuos de los dos Poses. Se pueden usar Poses de secuencias distintas, incluso para restricciones de cadena lateral. Solo se restringirán los átomos que coincidan.
* **align_reference** - Si es true, el Pose de referencia/nativo se superpondrá siempre sobre el Pose actual antes de usarse para generar restricciones. Si es false, el Pose de referencia/nativo solo se superpone sobre el Pose actual si no hay una raíz virtual (véase más arriba).

### Ejemplo

Este ejemplo añade y elimina restricciones de coordenadas solo en los residuos de hoja, y usa el Pose especificado por -in:file:native para obtener las coordenadas.

```xml
<RESIDUE_SELECTORS>
    <SecondaryStructureSelector name="sheet" ss="E" use_dssp="1" />
</RESIDUE_SELECTORS>
<MOVERS>
    <AddConstraints name="add_csts" >
        <CoordinateConstraintGenerator name="gen_my_csts"
            residue_selector="sheet" native="1" />
    </AddConstraints>
    <RemoveConstraints name="rm_csts" constraint_generators="gen_my_csts" />
</MOVERS>
<PROTOCOLS>
    <Add mover="add_csts" />
    <!-- do things with constraints -->
    <Add mover="rm_csts" />
</PROTOCOLS>
```


##Véase también

* [[AddConstraintsMover]]
* [[RemoveConstraintsMover]]
* [[Formato del archivo de restricciones|constraint-file]]
* [[AtomCoordinateCstMover]]
* [[AddConstraintsToCurrentConformationMover]]


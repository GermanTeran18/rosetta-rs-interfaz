#SegmentedAtomPairConstraintGenerator
[[include:constraint_generator_SegmentedAtomPairConstraintGenerator_complex_type]]

Dado un **ResidueSelector** con varias regiones no contiguas, crea _AtomPairConstraints_ con parámetros distintos para los residuos que están dentro de un mismo _ResidueRange_ y para los que pertenecen a _ResidueRange_ diferentes.

# Ejemplo

```xml
<RESIDUE_SELECTORS>
    <SecondaryStructureSelector name="sheet" ss="H" use_dssp="1" />
</RESIDUE_SELECTORS>
<MOVERS>
    <AddConstraints name="add_csts" >
        <SegmentedAtomPairConstraintGenerator name="gen_my_csts" residue_selector="sheet">
           <Inner min_seq_sep="2" />
           <Outer use_harmonic="true" unweighted="true" />
        </SegmentedAtomPairConstraintGenerator>
    </AddConstraints>
    <RemoveConstraints name="rm_csts" constraint_generators="gen_my_csts" />
</MOVERS>
<PROTOCOLS>
    <Add mover="add_csts" />
    <!-- do things with constraints -->
    <Add mover="rm_csts" />
</PROTOCOLS>
```

Este ejemplo creará AtomPairConstraints SCALARWEIGHTEDFUNC SOG entre todos los residuos no contiguos de cada hélice alfa y AtomPairConstraints HARMONIC entre los residuos de hélices alfa distintas.

# FileConstraintGenerator
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FileConstraintGenerator

Genera restricciones a partir de un archivo de restricciones de Rosetta. Las restricciones generadas con este generador de restricciones pueden añadirse a la Pose con [[AddConstraintsMover]] y eliminarse con [[RemoveConstraintsMover]].

```xml
<FileConstraintGenerator name="(&string)" filename="(&string)" />
```

filename: el archivo que contiene los datos de las restricciones. Por ejemplo:

    ...
    CoordinateConstraint CA 380 CA 1   27.514  34.934  50.283 HARMONIC 0 1
    CoordinateConstraint CA 381 CA 1   24.211  36.849  50.154 HARMONIC 0 1
    ...

El formato de los archivos de restricciones de coordenadas es:
CoordinateConstraint target_res anchor_res x y z function

### Ejemplo

Este ejemplo añade y elimina de la Pose las restricciones de "my_csts.cst" usando FileConstraintGenerator.

```xml
<MOVERS>
    <AddConstraints name="add_csts" >
        <FileConstraintGenerator name="gen_my_csts" filename="my_csts.cst" />
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

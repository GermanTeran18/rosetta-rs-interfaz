Este ConstraintGenerator actualmente solo funciona con tipos de residuo que contengan los átomos C, O, N, CA y CB.


```
<SheetConstraintGenerator name=(&string)
    secstruct=(&string, "")
    use_dssp=(&bool, true)
    spairs=(&string, "")
    blueprint=(&string, "")
    flat_bottom_constraints=(&bool, true)
    constrain_ca_ca_dist=(&bool, true)
    constrain_bb_angle=(&bool, true)
    constrain_cacb_dihedral=(&bool, true)
    constrain_bb_dihedral=(&bool, true)
    dist=(&real, 5.5)
    dist_tolerance(&real, 1.0)
    angle_tolerance=(&real, 0.35)
    cacb_dihedral_tolerance=(&real, 0.9)
    bb_dihedral_tolerance=(&real, 0.52)
    weight=(&real, 1.0) />
```

* **secstruct**: Si se establece, se usará la estructura secundaria dada para encontrar las hebras. Debe coincidir con la longitud del Pose. Si no se establece, la estructura secundaria se obtendrá según el valor de 'use_dssp'.

* **use_dssp**: Si no se establece secstruct y use_dssp es True, se llamará a DSSP sobre el Pose de entrada para determinar su estructura secundaria y, a su vez, la ubicación de sus hebras. Si es false, se usará la estructura secundaria del Pose. Si use_dssp=False y no se especifica secstruct, debes asegurarte de que la estructura secundaria de este Pose esté correctamente establecida. Una forma de hacerlo es mediante DsspMover.

* **spairs**: Si se especifica, los apareamientos de hebras se determinarán con la topología dada. Es una cadena con el formato S1-S2.O.R, donde S1 es el número de la primera hebra en el espacio de la secuencia primaria, S2 es el número de la segunda hebra en el espacio de la secuencia primaria, O es 'A' para antiparalelo o 'P' para paralelo, y R es el desplazamiento de registro. S1 debe ser < S2. Se pueden especificar varios apareamientos usando ';' como delimitador. Por ejemplo, lo siguiente describe un apareamiento entre las hebras 2 y 3, y un apareamiento paralelo entre las hebras 1 y 2.
    2-3.A.0;1-2.P.0
Si no se especifica, SheetConstraintGenerator intentará encontrar los apareamientos de hebras a partir de datos almacenados en caché en el Pose. Estos datos los coloca en el Pose el mover de construcción de cadena principal de Tom.

* **blueprint**: Permite especificar un archivo blueprint que se usará para establecer la estructura secundaria. La opción 'secstruct' se establecerá con la información del blueprint. La longitud del blueprint debe coincidir exactamente con la longitud del Pose. Si el blueprint contiene una línea SSPAIR, la opción 'spairs' también se establecerá con esa línea.

* **flat_bottom_constraints**: Si es true, se usarán restricciones de fondo plano para todas las restricciones. Si es false, se usarán restricciones armónicas hacia un valor ideal para todas las restricciones.

* **constrain_ca_ca_dist**: Si es true, se restringirá la distancia CA-CA de los residuos apareados de las hebras.

* **constrain_bb_angle**: Si es true, se generarán dos restricciones de ángulo para cada par de residuos apareados. En los apareamientos paralelos, estas restricciones imponen un ángulo de 90 grados entre N-C-C2 y N2-C2-C, donde C2 y N2 son los átomos C y N del segundo residuo apareado. En el apareamiento antiparalelo, los ángulos son N-C-N2 y N2-C2-N. Esta restricción se puede usar para imponer el desplazamiento de registro.

* **constrain_cacb_dihedral**: Si es true, el diedro CB-CA-CA2-CB2 se restringirá a un valor ideal de 0, donde CA y CB son del primer residuo del par, y CA2 y CB2 se refieren a CA y CB del segundo residuo del par. Esta restricción asegura que los átomos CB de los residuos apareados apunten aproximadamente en la misma dirección

* **constrain_bb_dihedral**: Si es true, el diedro O-N-C-C2 se restringe a un valor ideal de 0, donde O, N y C son nombres de átomos del primer residuo del par y C2 es el átomo C del segundo residuo apareado. Esta restricción asegura que el oxígeno del carbonilo esté en el mismo plano que la hebra apareada.

* **dist**: Distancia que se usará en las restricciones de distancia CA-CA

* **dist_tolerance**: La desviación estándar que determina la penalización de la restricción. Para las restricciones armónicas, la penalización es (x-x0)/(sd^2), donde SD es este valor.

* **angle_tolerance**: La desviación estándar de las restricciones de ángulo
* **cacb_dihedral_tolerance**: La desviación estándar de las restricciones cacb
* **bb_dihedral_tolerance**: La desviación estándar de las restricciones del diedro O-N-C-C2
* **weight**: Factor de ponderación escalar. Este número se multiplica por la penalización de la restricción

### Ejemplo

Este ejemplo crea restricciones para imponer una lámina con dos hebras antiparalelas y un desplazamiento de registro de 1.

```
<MOVERS>
    <AddConstraints name="add_csts" >
        <SheetConstraintGenerator name="gen_my_csts" spairs="1-2.A.1;2-3.A.0" />
    </AddConstraints>
    <RemoveConstraints name="rm_csts" constraint_generators="gen_my_csts" />
</MOVERS>
<PROTOCOLS>
    <Add mover="add_csts" />
    <!-- do things with constraints -->
    <Add mover="rm_csts" />
</PROTOCOLS>
```
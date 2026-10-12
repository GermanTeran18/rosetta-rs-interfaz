# Idealize
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Idealize

Algunos protocolos (LoopHashing) requieren que la Pose tenga longitudes y ángulos de enlace ideales. Idealize fuerza estos valores y luego [[minimiza|Minimization-overview]] la Pose con una función de energía reducida (rama, disulf y cierre de prolina) y en presencia de restricciones de coordenadas. Normalmente provoca movimientos de 0.1 A respecto de la Pose original, pero las puntuaciones empeoran. Por lo tanto, se recomienda hacer seguir la idealización de algún refinamiento.

```xml
<Idealize name="(&string)" atom_pair_constraint_weight="(0.0&Real)" coordinate_constraint_weight="(0.01&Real)" fast="(0 &bool)" report_CA_rmsd="(1 &bool)" ignore_residues_in_csts="(&comma delimited residue list)" impose_constraints="(1&bool)" constraints_only="(0&bool)"/>
```

-   ignore\_residues\_in\_csts: establece que ciertos residuos no tengan restricciones de coordenadas durante la idealización, lo que significa que son libres de moverse para formar enlaces completamente ideales. Es útil, p. ej., al cambiar la longitud de un loop y obtener rápidamente una cadena químicamente razonable.
-   impose\_constraints: ¿imponer las restricciones de coordenadas y de pares sobre la Pose actual?
-   constraints\_only: ¿salir de idealize después de imponer las restricciones sin realizar la ejecución real de idealización?

impose\_constraints y constraints\_only pueden usarse de forma alterna para dividir el proceso de idealización en dos etapas: primero imponer las restricciones sobre una Pose "realista" sin idealizar (constraints\_only=1), y luego deformar la Pose y volver a aplicar idealize (impose\_constraints=0).


##Véase también

* [[MinMover]]
* [[FastRelaxMover]]
* [[Minimization overview]]
* [[AtomCoordinateCstMover]]
* [[Formato del archivo de restricciones|constraint-file]]

<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<SetupHotspotConstraints name="(&string;)"
        redesign_chain="(2 &non_negative_integer;)" resfile="(NONE &string;)"
        cb_force="(0.5 &real;)" worst_allowed_stub_bonus="(0 &real;)"
        apply_stub_self_energies="(0 &bool;)"
        apply_stub_bump_cutoff="(10 &real;)"
        backbone_stub_constraint_weight="(1.0 &real;)"
        stubscorefxn="(backbone_stub_constraint &string;)"
        pick_best_energy_constraint="(1 &bool;)" colonyE="(0 &bool;)"
        stubfile="(stubs.pdb &string;)" />
```

-   **redesign_chain**: La cadena en la que se rediseña, numerada secuencialmente desde 1
-   **resfile**: Resfile aplicado
-   **cb_force**: Fuerza aplicada a los átomos CB en las restricciones de hotspot
-   **worst_allowed_stub_bonus**: XRW POR HACER
-   **apply_stub_self_energies**: XRW POR HACER
-   **apply_stub_bump_cutoff**: XRW POR HACER
-   **backbone_stub_constraint_weight**: Peso del término de puntuación backbone_stub_constraint
-   **stubscorefxn**: Término de puntuación mediante el cual se ejercen las restricciones de stub de la cadena principal
-   **pick_best_energy_constraint**: XRW POR HACER
-   **colonyE**: XRW POR HACER
-   **stubfile**: Archivo que contiene los stubs de hotspot

---

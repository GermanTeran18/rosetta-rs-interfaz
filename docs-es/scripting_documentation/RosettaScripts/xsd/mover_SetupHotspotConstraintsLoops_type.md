<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
XRW POR HACER

```xml
<SetupHotspotConstraintsLoops name="(&string;)"
        redesign_chain="(2 &non_negative_integer;)" resfile="(NONE &string;)"
        cb_force="(0.5 &real;)" worst_allowed_stub_bonus="(0 &real;)"
        apply_stub_self_energies="(0 &bool;)"
        apply_stub_bump_cutoff="(10 &real;)"
        pick_best_energy_constraint="(1 &bool;)" start="(&positive_integer;)"
        stop="(&positive_integer;)" colonyE="(0 &bool;)"
        stubfile="(stubs.pdb &string;)" >
    <HotspotFiles name="(&string;)" >
        <HotspotFile file_name="(&string;)" nickname="(&string;)"
                stub_num="(100000 &positive_integer;)" />
    </HotspotFiles>
</SetupHotspotConstraintsLoops>
```

-   **redesign_chain**: La cadena en la que se rediseña, numerada secuencialmente desde 1
-   **resfile**: Resfile aplicado
-   **cb_force**: Fuerza aplicada a los átomos CB en las restricciones de hotspot
-   **worst_allowed_stub_bonus**: XRW POR HACER
-   **apply_stub_self_energies**: XRW POR HACER
-   **apply_stub_bump_cutoff**: XRW POR HACER
-   **pick_best_energy_constraint**: XRW POR HACER
-   **start**: (OBLIGATORIO) Primer residuo del loop
-   **stop**: (OBLIGATORIO) Último residuo del loop
-   **colonyE**: XRW POR HACER
-   **stubfile**: Archivo que contiene los stubs de hotspot


Subetiqueta **HotspotFiles**:   Envoltorio para las etiquetas que describen cada uno de los archivos de hotspot que se leen



Subetiqueta **HotspotFile**:   

-   **file_name**: (OBLIGATORIO) Nombre del archivo de stubs de hotspot
-   **nickname**: (OBLIGATORIO) Apodo del archivo de stubs de hotspot
-   **stub_num**: XRW POR HACER

---

# BuriedSurfaceArea
Página creada el 2 de mayo de 2017 por Vikram K. Mulligan, Ph.D. (vmullig@uw.edu).<br/>
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

## BuriedSurfaceArea

Este filtro calcula el área de superficie enterrada total de un Pose o de un subconjunto de un Pose seleccionado con un selector de residuos.  Descarta los Poses con un área de superficie enterrada por debajo (o por encima) de un valor umbral definido por el usuario.  Ten en cuenta que este filtro opera SOLO sobre L-aminoácidos canónicos, sus equivalentes D-aminoácidos y la glicina; para cualquier otro tipo calcula un área de superficie enterrada de cero.

## Uso y opciones

```xml
<BuriedSurfaceArea name=(string)
     select_only_FAMILYVW=(bool,"false") filter_out_low=(bool,"true")
     cutoff_buried_surface_area=(real,"500") atom_mode=(string, "all_atoms")
     residue_selector=(string) confidence=(real,"1.0")
/>
```

**name (string):**  El nombre que se da a esta instancia.

**select_only_FAMILYVW (bool,"false"):**  Si es true, solo se cuentan los residuos hidrofóbicos y la alanina (phe, ala, met, ile, leu, tyr, val o trp).  Si es false (el valor por defecto), se cuentan todos los residuos.  Ten en cuenta que, si se usa esta opción junto con un selector de residuos, ambos se combinan con lógica AND para crear la selección final de residuos (es decir, para calcular el área de superficie enterrada se usan los residuos seleccionados por el selector Y que pertenecen al conjunto FAMILYVW).

**filter_out_low (bool,"true"):**  Si es true (el valor por defecto), se rechazan los Poses con un área de superficie enterrada por debajo del umbral.  Si es false, se rechazan los Poses con un área de superficie enterrada por encima del umbral.

**cutoff_buried_surface_area (real,"500"):**  El área de superficie enterrada por debajo de la cual (o por encima, si "filter_out_low" es false) se rechaza un Pose.  Por defecto son 500 angstroms cuadrados, un valor elegido arbitrariamente.

**residue_selector (string):**  Un selector de residuos opcional, definido previamente.  Si se indica, solo se usan los residuos seleccionados para calcular el área de superficie enterrada.  Si no se indica, se usan todos los residuos.

**atom_mode (string,"all_atoms"):**  El subconjunto de átomos que se usa en el cálculo.  Por defecto es "all_atoms", pero también se permiten los valores "hydrophobic_atoms" y "polar_atoms".

**confidence (real,"1.0"):**  Probabilidad de que el Pose se descarte si no supera este filtro.

## Véase también

* El filtro [[ExposedHydrophobics|ExposedHydrophobicsFilter]]
* El filtro [[ResidueBurial|ResidueBurialFilter]]
* El filtro [[Sasa|SasaFilter]]
* El filtro [[TotalSasa|TotalSasaFilter]]

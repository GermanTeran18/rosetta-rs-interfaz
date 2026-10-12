# PeptideDeriver
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## PeptideDeriver

Implementación del protocolo Peptiderive. Como todas las opciones son equivalentes (tanto en nombre como en significado) a las opciones de línea de comandos de la aplicación, lo mejor es consultar la documentación de la aplicación [[PeptiDerive]].

```xml
<PeptideDeriver name="(&string)"
    pep_lengths="( 10 &int,...)"
    skip_zero_isc="( true &bool)"
    dump_peptide_pose="( false &bool)"
    dump_cyclic_poses="( false &bool)"
    dump_report_file="( false &bool)"
    dump_prepared_pose="( false &bool)"
    do_minimize="( true &bool)"
    scorefxn_deriver="(&string)"
    optimize_cyclic_threshold="( 0.35 &real)"
    restrict_receptors_to_chains="( "" &string,...)"
    restrict_partners_to_chains="( "" &string,...)"
    />
```

## Véase también:

* [[PeptiDerive]]

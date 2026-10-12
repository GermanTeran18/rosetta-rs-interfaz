## Resumen

Esta página es el lugar donde los desarrolladores pueden recopilar resultados de benchmarks de varios protocolos de Rosetta con la función de energía beta_nov15. El objetivo principal es comprobar cualquier mejora o degradación del rendimiento científico antes de cambiar nuestra función de energía por defecto de talaris2014 a beta_nov15. Asegúrate de que los elementos siguientes estén bien descritos cuando contribuyas aquí.

Consulta http://www.tablesgenerator.com/markdown_tables para crear o editar tablas. Además, si alguien tiene una idea mejor sobre el formato, que se la sugiera a Hahnbeom Park (hahnbeom@uw.edu).

### Predicción de estructuras

| Título | Quién  | Descripción| Métrica | Talaris2014 | BetaNov15 | ¿Signo? |App/Mover| Ref. |Rosetta V. |
|--------|--------|------------|--------|-------------|-----------|-------|---------|------|-----------|
| Rotamer, core      | H Park | CADRES     | Tasa de éxito |              |           |+|RTmin          | |      |
| Rotamer, interface | H Park | CADRES     | Tasa de éxito |              |           |+|RTmin          | |      |
| Decoy, Mike        | H Park | CADRES     | P de Boltzmann  |  0.538       | 0.600     |+|Relax, dual    |1|      |
| Decoy, Patrick     | H Park | CADRES     | P de Boltzmann  |  0.606       | 0.699     |+|Relax, dual    |1|      |
| PPdock, ZDOCK      | H Park | CADRES     | P de Boltzmann  |  0.712       | 0.779     |+|Relax, torsion |1|      |
| HomologyModeling   | H Park | 67 objetivos de CAMEO | GDT-HA |  63.9        | 65.1      |+|Hybridize      |1|      |
| LoopModeling       | H Park |  | P de Boltzmann | |   |+| NGK |2|            |

### Diseño

| Título | Quién  | Descripción| Métrica | Talaris2014 | BetaNov15 | ¿Signo? |App/Mover| Ref. |Rosetta V. |
|--------|--------|------------|--------|-------------|-----------|-------|---------|------|-----------|
|FullDesign| H Park | StdScientific | Tasa de éxito | 38.9 | 40.6   |+| fixbb |3| |
|ProteinMono| H Park| Un residuo a la vez | Tasa de éxito | 45.1 | 47.0 |+| aplicación piloto | 1 | |
|ProteinProtein| H Park| Un residuo a la vez | Tasa de éxito | 45.1 | 47.0 |+| aplicación piloto | 1 | |
|ProteinLigand| H Park| Un residuo a la vez | Tasa de éxito | 45.1 | 47.0 |+| aplicación piloto | 1 | |
  

### Otros

| Título | Quién  | Descripción| Métrica | Talaris2014 | BetaNov15 | ¿Signo? |App/Mover| Ref. |Rosetta V. |
|--------|--------|------------|--------|-------------|-----------|-------|---------|------|-----------|

### Referencias
1. H Park et al, Simultaneous optimization of biomolecular energy function on features from small molecules and macromolecules, JCTC 2016.
2. Stein et al,

## Véase también

* [[Updates-beta-nov15]]

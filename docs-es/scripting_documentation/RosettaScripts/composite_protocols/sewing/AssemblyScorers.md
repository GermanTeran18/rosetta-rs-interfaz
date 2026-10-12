#AssemblyScorers

Los distintos AssemblyMovers usan los AssemblyScorers para evaluar los ensamblajes construidos. A continuación se muestra una lista de los scorers implementados actualmente. Los AssemblyScorers son una subetiqueta de los AssemblyMovers y se enumeran dentro de una etiqueta AssemblyRequirements.

Para ver un ejemplo del uso de AssemblyScorers, consulta la página [[AssemblyMover]].

[[_TOC_]]

###MotifScorer
Un scorer rápido y ligero que usa el MotifScore desarrollado por Will Scheffler para comparar todos los residuos del ensamblaje generado. Aunque el motif hasher requiere varias [[opciones de línea de comandos|AssemblyMover#command-line-flags]], la etiqueta MotifScorer solo requiere una opción ```weight```.

```xml
<MotifScorer weight="1" />
```

###InterModelMotifScorer
Este scorer es muy similar al MotifScorer; sin embargo, en lugar de comparar todos los residuos entre sí, solo puntúa cada residuo frente a los residuos que no están en la misma subestructura. Aumentar el peso de esta puntuación ayuda a incrementar el empaquetado entre las subestructuras del ensamblaje. La etiqueta InterModelMotifScorer solo requiere una opción ```weight```.

```xml
<InterModelMotifScorer weight="10" />
```

###StartingNodeMotifScorer
Este scorer solo se usa en ejecuciones de Append Assembly para puntuar los residuos de la estructura inicial frente a los del ensamblaje generado. Al igual que el InterModelMotifScorer, este scorer ayuda a incrementar el empaquetado entre la estructura inicial y el resto del ensamblaje. La etiqueta StartingNodeMotifScorer solo requiere una opción ```weight```.

```xml
<StartingNodeMotifScorer weight='1' />
```

###PartnerMotifScorer
Este scorer solo se usará en ciertas ejecuciones de Append Assembly y calcula la puntuación de motivos entre los residuos del pdb asociado proporcionado y los del ensamblaje generado. Este scorer solo requiere una opción ```weight```:

```xml
<PartnerMotifScorer weight="1" />
```

###LigandScorer
Este scorer evalúa el empaquetado entre los residuos del ensamblaje y sus ligandos. Para cada átomo del ligando, busca todos los residuos a una distancia dada y puntúa la orientación de la cadena lateral respecto al átomo del ligando. Se favorecen los residuos cuyo ángulo C-beta, C-alfa, ligando es menor o igual que 45 grados, y se les asigna una puntuación de -1. Los residuos con ángulos mayores se puntúan con una [[función periódica de Amber|constraint-file#function-types]], en la que los residuos con un ángulo de 180 grados reciben una puntuación de 0. Las puntuaciones de cada residuo que interactúa se suman y se normalizan por el número de átomos del ligando.

Este scorer requiere dos opciones: ```weight``` y ```ligand_interaction_cutoff_distance```. Un LigandScorer que evalúe todos los residuos a menos de 7 Angstroms de un átomo del ligando tendría la siguiente etiqueta:

```xml
<LigandScorer weight="1" ligand_interaction_cutoff_distance="7" />
```

##Véase también
* [[SEWING]] La página principal de SEWING
* [[AssemblyMover]]
* [[AppendAssemblyMover]]
* [[AssemblyRequirements]]
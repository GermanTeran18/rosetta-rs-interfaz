#LongestContinuousPolarSegment

Documentación de Vikram K. Mulligan, Ph.D. (vmullig@uw.edu).  Página creada el 23 de abril de 2017.

*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

##LongestContinuousPolarSegment

Este filtro cuenta el número de residuos del tramo continuo más largo de aminoácidos polares de una estructura.  Los aminoácidos polares incluyen Arg, Asn, Asp, Gln, Glu, His, Lys, Ser y Thr (los residuos con la propiedad POLAR en sus archivos params).  Opcionalmente, Gly también se puede considerar polar, aunque no tenga la propiedad POLAR en su archivo params.  Por defecto, el filtro rechaza cualquier estructura con tramos polares más largos que un valor umbral (5 residuos, salvo que el usuario lo cambie).

## Opciones y uso

```xml
<LongestContinuousPolarSegment name=(string)
     exclude_chain_termini=(bool,"true")
     count_gly_as_polar=(bool,"true")
     filter_out_high=(bool,"true") cutoff=(int,"5")
     residue_selector=(string) confidence=(real,"1.0")
/>
```

**name** -- Una cadena única con la que se hará referencia a una instancia concreta del filtro en un archivo XML de RosettaScripts.

**exclude\_chain\_termini** -- Si es false, se cuentan los tramos polares que llegan al extremo N o C de una cadena.  Si es true (el valor por defecto), esos tramos terminales se ignoran y solo se consideran los tramos polares internos.

**count\_gly\_as\_polar** -- Si es true, la glicina se considera "polar" para los fines de este filtro.  Por defecto es true.

**filter\_out\_high** -- Si es true, se rechazan los Poses con más residuos que el valor de cutoff en el tramo polar más largo.  Si es false, se rechazan los Poses con menos residuos que el valor de cutoff en el tramo polar más largo.  Por defecto es true.

**cutoff** -- El número máximo (o mínimo, si "filter_out_high" es "false") de residuos en el tramo polar más largo con el que el Pose todavía supera este filtro.  Por defecto 5.

**residue\_selector** -- Un selector de residuos opcional, definido previamente.  Si se indica, el filtro solo considera los tramos de residuos polares que tienen al menos un residuo en la selección.  Si no se especifica, no se usa.

**confidence** -- Probabilidad de que el Pose se descarte si no supera este filtro.

## Véase también

* El filtro [[ResidueCount|ResidueCountFilter]].

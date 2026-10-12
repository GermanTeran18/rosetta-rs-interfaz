#LongestContinuousPolarSegment

Documentación de Yang Hsia (yhsia@uw.edu).  Página creada el 19 de febrero de 2018.

*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

##LongestContinuousApolarSegment

Este filtro cuenta el número de residuos del tramo continuo más largo de aminoácidos apolares de una estructura.  Los aminoácidos apolares se definen como los residuos que NO son polares (ACFGILMPVWY; véase [[Definición de resfile|resfiles]]). Por defecto, el filtro rechaza cualquier estructura con tramos apolares más largos que un valor umbral (5 residuos, salvo que el usuario lo cambie).

Nota: este filtro es una subclase de LongestContinuousPolarSegmentFilter.

## Opciones y uso

```xml
<LongestContinuousApolarSegment name=(string)
     exclude_chain_termini=(bool,"true")
     filter_out_high=(bool,"true") cutoff=(int,"5")
     residue_selector=(string) confidence=(real,"1.0")
/>
```

**name** -- Una cadena única con la que se hará referencia a una instancia concreta del filtro en un archivo XML de RosettaScripts.

**exclude\_chain\_termini** -- Si es false, se cuentan los tramos apolares que llegan al extremo N o C de una cadena.  Si es true (el valor por defecto), esos tramos terminales se ignoran y solo se consideran los tramos apolares internos.

**filter\_out\_high** -- Si es true, se rechazan los Poses con más residuos que el valor de cutoff en el tramo apolar más largo.  Si es false, se rechazan los Poses con menos residuos que el valor de cutoff en el tramo apolar más largo.  Por defecto es true.

**cutoff** -- El número máximo (o mínimo, si "filter_out_high" es "false") de residuos en el tramo apolar más largo con el que el Pose todavía supera este filtro.  Por defecto 5.

**residue\_selector** -- Un selector de residuos opcional, definido previamente.  Si se indica, el filtro solo considera los tramos de residuos apolares que tienen al menos un residuo en la selección.  Si no se especifica, no se usa.

**confidence** -- Probabilidad de que el Pose se descarte si no supera este filtro.

## Véase también

* El filtro [[ResidueCount|ResidueCountFilter]].
# CycpepSymmetryFilter
Creado por Vikram K. Mulligan (vmullig@uw.edu) el 2 de diciembre de 2016.<br/>
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

## CycpepSymmetryFilter

[[_TOC_]]

### Descripción

Este filtro examina la cadena principal de un péptido cíclico y determina si tiene una simetría cíclica que coincide con la simetría especificada por el usuario (dentro de cierto umbral de error: la cadena principal no necesita ser _perfectamente_ simétrica).  Funciona con simetrías c2, c3, c4, _etc._, así como con simetrías c2/m, c4/m, c6/m, _etc._  Si falla, indica que el péptido _no_ tiene la simetría deseada.  El péptido en cuestión puede estar construido con cualquier combinación de alfa, beta o gamma aminoácidos L y D, oligoureas L y D, o peptoides.

### Algoritmo

Primero, el filtro comprueba que el Pose, o los residuos seleccionados, sean realmente un péptido cíclico.  Luego recorre la primera 1/N parte del péptido (donde N es el número de repeticiones de simetría que especifica el usuario en la simetría cN) y compara cada residuo con los residuos correspondientes de las repeticiones siguientes, comprobando si cada valor de torsión de la cadena principal coincide, dentro de un umbral.  En el caso de la simetría especular, invierte los valores de torsión en una de cada dos repeticiones de simetría antes de hacer la comprobación.  Ten en cuenta que solo se considera la simetría de la cadena principal; las cadenas laterales se ignoran.

### Script de ejemplo

El siguiente script importa un péptido cíclico de ocho residuos, usa [[DeclareBond mover|DeclareBond]] para configurar un enlace peptídico terminal que une los extremos, y filtra según si el péptido tiene simetría c2/m:

```xml
<ROSETTASCRIPTS>
	<FILTERS>
		<CycpepSymmetryFilter name="symmfilter" symmetry_repeats="2" mirror_symmetry="true" />
	</FILTERS>
	<MOVERS>
		<DeclareBond name="bond1" res1="8" atom1="C" res2="1" atom2="N" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover="bond1" />
		<Add filter="symmfilter" />
	</PROTOCOLS>
</ROSETTASCRIPTS>
```

### Lista completa de opciones

```xml
<CycpepSymmetryFilter name=(&string) symmetry_repeats=(2 &int) mirror_symmetry=(false &bool) angle_threshold=(10.0 &float) residue_selector=(&string) />
```

|Opción|Tipo|¿Obligatoria?|Descripción|
|---|---|---|---|
|name|string|SÍ|Un identificador único que se da a este filtro y que sirve para referirse a él más adelante en el script.|
|symmetry_repeats|integer|No|El número de repeticiones de este tipo de simetría.  Por ejemplo, para simetría c3 se daría "3" como entrada.  Por defecto es 2 (simetría c2).|
|mirror_symmetry|boolean|No|¿Es este un tipo de simetría cíclica con operaciones especulares, como la simetría c2/m, c4/m o c6/m?  Si es true, symmetry_repeats debe ser múltiplo de 2.  Por defecto es false (simetría c2, es decir, no simetría c2/m).|
|angle_threshold|float|No|El umbral, en grados, para la diferencia entre dos ángulos diedros antes de considerarlos ángulos \"distintos\".  Se usa al comparar los valores de torsión de la cadena principal de residuos diferentes.  Por defecto es 10.0 grados.|
|residue_selector|string|No|Un selector de residuos opcional que selecciona los residuos del péptido cíclico en Poses que contienen más geometría que solo el péptido cíclico.  Si no se indica, se usa todo el Pose.|

### Véase también
- [[GeneralizedKIC|GeneralizedKICMover]]

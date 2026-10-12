# PackerPalettes

## PackerPalettes

Documentación creada el 20 de febrero de 2019 por Jason W. Labonte y Vikram K. Mulligan (vmulligan@flationinstitute.org).

## Descripción

Un [[PackerTask|packer-task]] usa los `PackerPalette` para determinar qué `ResidueType` se pueden sustituir en cualquier posición dada de un `Pose` antes de que se aplique cualquier [[TaskOperation|TaskOperations-RosettaScripts]].

El `PackerTask` se puede imaginar como una escultura de hielo. Por defecto, cada posición se puede empaquetar _y_ diseñar, pero solo con los 20 residuos de aminoácidos naturales. Usando `TaskOperation`s, un juego de cinceles, se puede _limitar_ el empaquetado/diseño a ciertos residuos solamente o solo al empaquetado. Como con el _hielo_, una vez que una `TaskOperation` ha desprendido (restringido) un tipo de residuo concreto, una `TaskOperation` posterior no puede volver a ponerlo (rehabilitarlo para el diseño).

Una escultura de hielo, por supuesto, está limitada por el tamaño del bloque de hielo inicial. Si quieres una lista inicial, o paleta, más grande de residuos con los que diseñar, usas un `PackerPalette`. El `DefaultPackerPalette`, que proporciona los 20 bloques de construcción de aminoácidos canónicos, es como un cubito de hielo, pero si usas un `PackerPalette` modificable, al que puedes añadir tipos de residuo más exóticos, puedes empezar con un _iceberg_.

Ten en cuenta que, para la mayoría de las aplicaciones de diseño canónico, querrás solo los 20 aminoácidos canónicos en tu paleta.  Para eso basta el `DefaultPackerPalette`, y por eso es el `PackerPalette` que Rosetta usa automáticamente en todos los casos _a menos que_ el usuario lo anule explícitamente.  (Es decir, si te basta con los 20 aminoácidos canónicos como paleta de diseño, no necesitas hacer nada.)

[[_TOC_]]

## Tipos

Los `PackerPalette` disponibles actualmente son:

* [[DefaultPackerPalette]]<br />
  Este `PackerPalette` recrea el sistema original de empaquetado y diseño de Rosetta, antes de que algunos de nosotros nos pusiéramos a trastear añadiendo químicas disparatadas que no son aminoácidos. Si no especificas un `PackerPalette`, se seleccionará automáticamente el `DefaultPackerPalette`.
  * Residuos incluidos:
    * 20 residuos de aminoácidos canónicos (incluidos ambos tautómeros de la histidina)
    * 4 residuos canónicos de ADN
    * todos los residuos de carbohidratos _no modificados_ de la base de datos de Rosetta (si y solo si la opción `-include_sugars` está activada)

* [[NCAADefaultPackerPalette]]<br />
  Este `PackerPalette` habilita el diseño con tipos comunes de cadena principal no canónica que tienen un conjunto de análogos «tipo canónico». Por ejemplo, los beta-3-aminoácidos tienen un conjunto canónico de (aproximadamente) veinte, igual que las oligoureas y los peptoides. Es natural empezar con un universo de más o menos ese tamaño al diseñar esos andamios. Pasa la opción `-packing:packer_palette:NCAA_expanded` para activar esta paleta. Ten en cuenta que la coincidencia de propiedades restringirá severamente los tipos disponibles en posiciones concretas. (Por ejemplo, el comportamiento de `PackerPalette` por el que solo se diseñan alfa-aminoácidos en posiciones de alfa-AA excluiría por defecto todos estos tipos disparatados.)
  * Residuos incluidos:
    * Los residuos de la paleta predeterminada
	* Todos los residuos `BETA_AA` de la base de datos (todavía no hemos añadido nada disparatado que nos importaría seriamente habilitar por defecto)
	* Todos los residuos `ARAMID` de la base de datos (todavía no hemos añadido nada disparatado que nos importaría seriamente habilitar por defecto)
	* Todos los residuos `OLIGOUREA` de la base de datos (todavía no hemos añadido nada disparatado que nos importaría seriamente habilitar por defecto)
	* Un puñado de peptoides 

* [[NoDesignPackerPalette]]<br/>
  En situaciones en las que se quiere reempaquetar un `Pose` sin diseñar nada, siempre es posible usar un `DefaultPackerPalette` con una [[TaskOperation PreventRepacking|PreventRepackingOperation]].  Internamente, sin embargo, esto es algo ineficiente: Rosetta llena una lista con los 20 aminoácidos canónicos y luego descarta todos menos el aminoácido actual en una posición dada.  Cuando la eficiencia es un problema (_p. ej._ si la configuración del packer se va a realizar muchos miles de veces en rápida sucesión) puedes, en cambio, restringir la paleta de tipos de residuo permitidos al tipo de residuo actual en cada posición de un `Pose` usando un `NoDesignPackerPalette`.  Este `PackerPalette` no tiene opciones configurables por el usuario.

* [[CustomBaseTypePackerPalette]]<br />
  Este `PackerPalette` incluye todos los residuos del `DefaultPackerPalette`, pero añade la capacidad de incorporar una lista personalizada de `ResidueType` _base_ (es decir, _no variantes_). (Como ejemplo, «ALA» es un tipo base, mientras que «NtermProteinFull» es un tipo variante: una modificación de ALA o de otros tipos base.)

<!--
* [[CustomVariantTypePackerPalette]]<br />
  This `PackerPalette` is similar to the `CustomBaseTypePackerPalette`, except that it allows for design of `VariantType` residues, including such things as modified sugars or post-translationally modified (PTM) amino acid residues.
-->

En el futuro puede haber `PackerPalette` adicionales que permitan diseñar con tipos variantes, o posiblemente diseñar cadenas principales alternativas (_p. ej._ un residuo de ácido nucleico peptídico en lugar de un residuo de ARN).

## Uso

### Código de PyRosetta

El método principal que se usa para interactuar con `CustomBaseTypePackerPalette` es `add_type( <ResidueType name> )`, que recibe como cadena el nombre completo del `ResidueType` (no necesariamente su código de tres letras).

Una vez establecida la paleta, se le puede dar a un `TaskFactory` (lo preferido) o usarla directamente en la construcción de un `PackerTask` (no recomendado).

#### Ejemplo de PyRosetta

```python
from pyrosetta.rosetta.core.pack.palette import CustomBaseTypePackerPalette

## (Create pose here.)

##### Designing with one extra noncanonical (adamantine): #####
# 1. Create the PackerPalette and add an extra noncanonical type to the allowed types:
pp = CustomBaseTypePackerPalette() ## Only needed for noncanonical design
pp.add_type( "adamantine" ) ## Only needed for noncanonical design

# 2.  Create the task factory and set its PackerPalette:
tf = TaskFactory()
tf.set_packer_palette(pp) ## Only needed for noncanonical design

# 3.  Pass the task factory to the PackRotamersMover, and pack normally:
packer = PackRotamersMover()
packer.task_factory(tf)
packer.apply(pose)
```

### Código C++

El ejemplo de Python anterior se traduce casi directamente a C++.

#### Ejemplo de C++

```c++
#include <core/pack/palette/CustomBaseTypePackerPalette.hh>
#include <core/pack/task/TaskFactory.hh>
#include <protocols/minimization_packing/PackRotamersMover.hh>

using namespace core::pack::palette;
using namespace core::pack::task;
using namespace protocols::minimization_packing;

// (Create pose here).

/***** Designing with one extra noncanonical (adamantine): *****/
// 1. Create the PackerPalette and add an extra noncanonical type to the allowed types:
CustomBaseTypePackerPaletteOP pp( utility::pointer::make_shared< CustomBaseTypePackerPalette > ); // Only needed for noncanonical design
pp->add_type( "adamantine" ) // Only needed for noncanonical design

// 2.  Create the task factory and set its PackerPalette:
TaskFactory OP tf( utility::pointer::make_shared< TaskFactory > );
tf->set_packer_palette(pp) // Only needed for noncanonical design

// 3.  Pass the task factory to the PackRotamersMover, and pack normally:
PackRotamersMover packer;
packer.task_factory(tf)
packer.apply(pose)

```

### RosettaScripts

En RosettaScripts, la interfaz con `PackerPalette` es mediante la etiqueta XML `<PACKER_PALETTES>`.

* El parámetro `name` de un `PackerPalette` sirve para proporcionar un nombre único que represente a una paleta dada en otras partes del script.
* El parámetro `additional_residue_types` sirve para proporcionar como cadena el nombre completo del `ResidueType` (no necesariamente su código de tres letras).

El `PackerPalette` se puede pasar directamente a un `PackRotamersMover`, o a cualquier otro objeto programable con RosettaScripts que reciba `TaskOperation`s, mediante su parámetro `packer_palette`.

#### XML de RosettaScripts de ejemplo

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
	</RESIDUE_SELECTORS>
	<PACKER_PALETTES>
		<CustomBaseTypePackerPalette name="custom_palette" additional_residue_types="adamantine" />
	</PACKER_PALETTES>
	<TASKOPERATIONS>
	</TASKOPERATIONS>
	<FILTERS>
	</FILTERS>
	<MOVERS>
		<PackRotamersMover name="design_test" packer_palette="custom_palette" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover="design_test" />
	</PROTOCOLS>
	<OUTPUT />
</ROSETTASCRIPTS>
```

### Aplicaciones de línea de comandos

Por defecto, si el usuario no especifica un PackerPalette, Rosetta crea un `DefaultPackerPalette` para todas las tareas de empaquetado.  Sin embargo, el `PackerPalette` predeterminado global se puede cambiar a un `CustomBaseTypePackerPalette` usando la opción de línea de comandos `-packer_palette:extra_base_type_file <filename>`.  El archivo proporcionado debe ser un archivo de texto ASCII que contenga una lista, separada por espacios en blanco, de nombres de tipos de residuo (no códigos de 3 letras) que se añadirán a los 20 aminoácidos canónicos para formar la paleta de tipos de residuo con los que diseñar.  Por ejemplo, al usar la aplicación `fixbb` de Rosetta para diseñar, se puede especificar un diseño con los 20 aminoácidos canónicos _más_ las 19 contrapartes D-aminoácido en imagen especular de los L-aminoácidos con el siguiente comando en la línea de comandos:

```
<path to rosetta>/Rosetta/main/source/src/fixbb.default.linuxgccrelease -packer_palette:extra_base_type_file d_amino_acids.txt <...other flags...>
```

En lo anterior, «default.linuxgccrelease» debe reemplazarse por la cadena apropiada para tu sistema operativo, compilador, ajustes de compilación y modo de compilación.  El archivo `d_amino_acids.txt` se vería así:

```
DALA DCYS DASP DGLU DPHE DHIS DILE DLYS DLEU DMET DASN DPRO DGLN DARG DSER DTHR DVAL DTRP DTYR
```

## Comportamiento anterior

En versiones anteriores de Rosetta, cuando no existía el `PackerPalette`, había que emplear `TaskOperation`s especiales que violaban la idea de conmutatividad.

Por ejemplo, antes de que existieran los `PackerPalette`, los [[resfiles]] de Rosetta (que permiten al usuario aplicar una serie de TaskOperations de manera específica por posición con una sintaxis concisa y sencilla) podían contener los comandos `RESET` (que descartaba los efectos de las `TaskOperation`s anteriores y restablecía los aminoácidos permitidos en una posición a los 20 aminoácidos canónicos), `NC` (que añadía tipos de residuo al conjunto permitido en una posición) y `EMPTY` (que descartaba todos los tipos de residuo permitidos en una posición, incluidos los añadidos con `NC`).  Estos violaban la conmutatividad de las `TaskOperation` (la propiedad de que un conjunto de `TaskOperations` aplicadas en cualquier orden produce el mismo efecto).  Ahora estas operaciones están prohibidas.  En su lugar, los usuarios deben activar los bloques de construcción exóticos que quieran con un `PackerPalette`, y luego pueden _desactivarlos_ con resfiles u otras `TaskOperations` (la convención que siempre ha existido para el diseño canónico).  En el ejemplo anterior, de diseño con los 20 aminoácidos canónicos más las imágenes especulares D-aminoácido, se podrían prohibir todos los tipos de residuo excepto D- o L-alanina en la posición 5 con el siguiente resfile:

```
start
5 A PIKAA AX[DALA]
```

## Véase también

* [[resfiles]]: descripción de la sintaxis y las convenciones de los resfiles
* [[RosettaScripts]]: la página principal de RosettaScripts
* [[TaskOperations recomendadas para diseño|Recommended_Design_TaskOperations]]
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[Movers de RosettaScripts|Movers-RosettaScripts]]
* [[Filtros de RosettaScripts|Filters-RosettaScripts]]
* [[I want to do x]]: guía para hacer perturbaciones estructurales específicas con RosettaScripts
* [[Scripting Documentation]]: la página principal de la documentación de scripting
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Getting Started]]: una página para quienes empiezan con Rosetta
* [[Glossary]]
* [[RosettaEncyclopedia]]

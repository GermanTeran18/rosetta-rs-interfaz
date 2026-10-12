# EnzymaticMovers

Los `EnzymaticMover` son una subclase de `Mover` diseñada específicamente para simular 
la acción de una enzima virtual sobre un sustrato, el `Pose`. La enzima puede ser una 
enzima biológicamente real o completamente hipotética o construida.

Cuando se «aplica» el `Mover`, busca en la secuencia del `Pose` un
sitio de secuencia concreto en el que realizar su modificación, a partir de
los datos de la enzima. Para cada sitio encontrado, realizará la modificación o no, según
su «eficiencia» configurada.

[[_TOC_]]

## Descripción
La principal diferencia entre la mayoría de los `Mover` y un `EnzymaticMover` es que un
`Mover` estándar cambia la conformación 3D de un `Pose`, pero la 
identidad de los `Residue` de ese `Pose` permanece sin cambios. Un `EnzymaticMover`, en
cambio, no «mueve» un `Pose` tanto como lo «cambia», modificando su
secuencia de alguna manera y convirtiéndolo en una nueva molécula o conjunto de moléculas. Un
`EnzymaticMover` puede añadir, eliminar o modificar `Residues`, o unir o dividir 
cadenas dentro de un `Pose`&mdash;reflejando el mismo tipo de cosas que una enzima
podría hacerle a un biopolímero _in vivo_.

Otra cosa que conviene considerar es que la mayoría de los `Mover` se usan en protocolos para
generar finalmente un gran número de decoys. Un uso más común de un
`EnzymaticMover` podría ser generar _inicialmente_ un gran número de
_variaciones de partida_ de un `Pose` biológicamente relevantes. Por ejemplo, considera que la mayoría de las 
proteínas están glicosiladas _in vivo_, pero la mayoría de las estructuras cristalinas de proteínas no
incluyen los glicanos en la estructura. Se podría usar un `EnzymaticMover` para
generar un conjunto biológicamente relevante de variantes glicosiladas del
`Pose` para usar en otras aplicaciones de modelado.

Una característica clave del marco de los `EnzymaticMover` es el posible uso de
datos enzimáticos biológicos. La base de datos de Rosetta contendrá datos de enzimas específicas
del mundo real, cada una con sus propias secuencias consenso y
cosustratos únicos. Por ejemplo, algunas cinasas son específicas para fosforilar residuos de
serina, mientras que otras fosforilarán residuos de serina _y_ de treonina.
La enzima específica deseada se puede fijar con varios métodos para asegurar que los
patrones de fosforilación que desea quien modela resulten y coincidan con lo que
se vería en la naturaleza.

De manera similar, se pueden pasar especies concretas a un `EnzymaticMover`. Esta característica
podría permitir escribir un protocolo para generar un surtido de proteínas
modificadas postraduccionalmente dada una variedad de enzimas comunes en,
por ejemplo, _E. coli_.

El marco de los `EnzymaticMover` fue concebido e implementado por Jason W.
Labonte <JWLabonte@jhu.edu>. Contáctalo con cualquier pregunta o crítica.

## Tipos
Actualmente hay cuatro `EnzymaticMover` escritos, pero se pueden añadir y se añadirán muchos más
al código base de Rosetta.
* [[DNAMethyltransferaseMover]]<br />
  Simula la actividad de ADN metiltransferasas biológicas específicas
  metilando un Pose que contiene ADN.
* [[GlycosyltransferaseMover]]<br />
  Simula la actividad de glicosiltransferasas y
  oligosacariltransferasas biológicas específicas glicosilando un `Pose`.
* [[KinaseMover]]<br />
  Simula la actividad de cinasas biológicas específicas fosforilando un `Pose`.
* [[NTerminalAcetyltransferaseMover]]<br />
  Simula la actividad de N-terminal acetiltransferasas biológicas específicas
  acetilando un `Pose` en el extremo N-terminal.

## Uso

En su mayor parte, los `EnzymaticMover` funcionan como cualquier otro `Mover`, y se puede usar cualquiera de las
tres interfaces principales de Rosetta. La principal diferencia es que un
`EnzymaticMover` depende de la presencia de datos de enzimas en la base de datos. **Si
quieres usar un `EnzymaticMover` para una enzima concreta, ¡asegúrate de que los datos de
esa enzima estén presentes en la base de datos!** (Consulta más abajo los archivos de datos de enzimas de ejemplo.)

### Código C++ y PyRosetta

Tras instanciar un `EnzymaticMover`, se pueden usar los métodos `set_species()` y
`set_enzyme()` para fijar la especie de la enzima y el nombre de la enzima,
respectivamente.

`set_efficiency()` se puede usar para anular la eficiencia de la
enzima proporcionada por el archivo de la enzima en la base de datos. Un valor de 1.00
corresponde al 100%. Si se fija en 0.5, por ejemplo, el `Mover` solo hará un
cambio en cualquier posición el 50% de las veces.

`exclude_site()` y `set_excluded_sites()` se pueden usar para pasar la(s) posición(es) de
secuencia de uno o varios sitios que no se pueden modificar. Quizá haya una interfaz
conocida con otra proteína, por ejemplo. `ensure_site()` y
`set_ensured_sites()` funcionan de manera opuesta, forzando una modificación.
(Ten en cuenta que los `ResidueSelector` por ahora no funcionan con los `EnzymaticMover`, pero
esto se cambiará en el futuro.)

`perform_major_reaction_only` y `perform_all_reactions` alternan el comportamiento de
las enzimas promiscuas.

#### Ejemplo de PyRosetta

```python
from pyrosetta.rosetta.protocols.enzymatic_movers import KinaseMover

general_enzyme = KinaseMover()
general_enzyme.set_efficiency(0.25)
general_enzyme.apply(pose1)

specific_enzyme = KinaseMover()
specific_enzyme.set_species("h_sapiens")
specific_enzyme.set_enzyme("CLK1")
specific_enzyme.apply(pose2)
```

#### Ejemplo de C++

```c++
#include <protocols/enzymatic_movers/GlcyosyltransferaseMover.hh>

glycosyltransferase =
	enzymatic_movers::GlycosyltransferaseMoverOP( utility::pointer::make_shared< enzymatic_movers::GlycosyltransferaseMover >() );
glycosyltransferase->set_species( "c_jejuni" );
glycosyltransferase->set_enzyme( "PglB" );
glycosyltransferase->set_efficiency( 1.0 );
glycosyltransferase.apply( pose );
```

### RosettaScripts

En RosettaScripts, la interfaz con cualquier `EnzymaticMover` es mediante la
etiqueta XML `<MOVERS>`.

* El parámetro `name` de un `EnzymaticMover` sirve para proporcionar un nombre único que
represente a un `EnzymaticMover` dado en otras partes del script.
* El parámetro `species` sirve para fijar el nombre de la especie de la enzima
simulada.
* El parámetro `enzyme_name` sirve para fijar el nombre específico de la enzima
simulada.
* El parámetro `efficiency` sirve para fijar directamente la eficiencia de la enzima,
ignorando lo que haya en la base de datos.
* El parámetro `perform_major_reaction_only` sirve para configurar el `EnzymaticMover` de modo que
realice solo su reacción principal, usando únicamente el primer cosustrato listado en su
archivo de datos de la enzima.
* El parámetro `perform_all_reactions` sirve para permitir que el `EnzymaticMover` sea
promiscuo, realizando una transferencia aleatoria entre sus posibles
cosustratos. Este es el comportamiento predeterminado.

#### XML de RosettaScripts de ejemplo

```xml
<ROSETTASCRIPTS>
	<MOVERS>
		<KinaseMover name="kinase" species="h_sapiens" perform_major_reaction_only="true" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover="kinase" />
	</PROTOCOLS>
	<OUTPUT />
</ROSETTASCRIPTS>
```

### Aplicaciones de línea de comandos

Tres opciones de Rosetta se usan específicamente para interactuar con
los `EnzymaticMover` usados en cualquier protocolo.

* `-enzymes:species` se usa para fijar el nombre de la especie de cualquier enzima simulada
usada por el protocolo.
* `-enzymes:enzyme` se usa para fijar el nombre específico de cualquier enzima simulada
usada por el protocolo.
* `-enzymes:efficiencty` se usa para anular la eficiencia de cualquier enzima simulada
usada por el protocolo.

#### Aplicaciones actuales
* [[DNA_methylation]]
* [[glycosyltransfer]]
* [[phosphorylation]]
* [[N-terminal_acetylation]]

#### Ejemplos de líneas de comandos
```
$ DNA_methylation -s input/1ABC.pdb -enzymes:species h_sapiens -enzymes:efficiency 0.75 -nstruct 3

$ glycosyltransfer -s input/2DEF.pdb -include_sugars -enzymes:species h_sapiens -enzymes:enzyme OGT -nstruct 5

$ phosphorylation -s input/3GHI.pdb -enzymes:species h_sapiens -nstruct 1

$ N-terminal_acetylation -s input/4JKL.pdb -nstruct 1
```

## Archivos de datos de enzimas

Los `EnzymaticMover` dependen de la base de datos para funcionar correctamente. Todos los archivos de datos de
enzimas tienen el siguiente formato:
```
# Consensus  Sequence  Residue of    Atom
# Sequence   Type      CS to Modify  To Modify  Efficiency
  TARGET     AA        4             CA         1.00        # Rosettase perfectly appends a glycine in the target sequence with a branch.

# Co-substrates
ARROW
BULLET
BOLT
KNIFE
PROTONTORPEDO
```

Se supone que la primera línea contiene una lista, delimitada por espacios en blanco, de lo
siguiente, y todo es obligatorio:
* Secuencia consenso &mdash; Puede ser una secuencia de AA o NA en código de 1 letra o una
secuencia de carbohidratos IUPAC.
  * Secuencias de residuos de aminoácidos
    * El analizador reconoce los códigos de una letra aprobados por la IUPAC `B`, `J`, `O`, `U` y `Z`,
    que codifican Asx, Xle, Pyl, Sec y Glx, respectivamente.
    * `X` solo se reconoce como cualquiera de los 20 aminoácidos canónicos; `X` seguida
    de corchetes especifica un único aminoácido no canónico mediante el código
    de 3 letras. Por ejemplo, `X[SEP]` especifica fosfoserina.
    * Los paréntesis se usan para especificar varios tipos de residuo posibles en ese
    sitio, separados por barras diagonales, _p. ej._, `(A/G)` especifica Ala o Gly en
    esa posición.
    * Un `<` en la primera posición indica que el sequon debe estar ubicado en el 
    extremo N-terminal.
    * Un `>` en la última posición indica que el sequon debe estar ubicado en el 
    extremo C-terminal.
  * Secuencias de residuos de ácidos nucleicos
    * Además de los códigos de una letra estándar A, C, G, T y U, el analizador
    reconoce B, D, H y V para _no_ A, C, G o U, respectivamente; K para G o U;
    M para A o C; N para cualquiera de las cuatro bases de ARN; R para cualquiera de las puRinas;
    S para cualquiera de las nucleobases «Strong» (fuertes); y W para cualquiera de las «Weak» (débiles).
* Tipo de secuencia &mdash; Este valor debe ser `AA`, `NA` o `SACCHARIDE`, para los 
tres tipos de secuencias aceptados.
* Residuo de la CS a modificar &mdash; Un entero que representa la posición en la secuencia
del residuo _en la secuencia consenso_ que el
`Mover` debe modificar de alguna manera.
* Átomo a modificar &mdash; Una cadena con el nombre del átomo que se va a modificar,
si corresponde. (No todos los `EnzymaticMover` necesitarán esta información y 
pueden ignorarla, pero debe haber un valor de cadena.)
* Eficiencia &mdash; Un valor real, donde 1.00 es una eficiencia del 100%. Si se fija en
0.50, un `EnzymaticMover` solo realizará su modificación el 50% de las veces. Si
no es 1.00, proporciona un comentario con la fuente del valor usado.

El lector de la base de datos supone que cualquier línea adicional corresponde a cosustratos. Esto
suele especificarse en forma de una secuencia de algún tipo.

Si no se proporcionan más líneas, la enzima o bien no tiene cosustrato
o bien Rosetta no necesita el cosustrato para realizar la modificación.
(Por ejemplo, una cinasa no necesita proporcionar ATP como cosustrato, porque,
internamente, Rosetta simplemente modificará un `Residue` para convertirlo en un
`VariantType` fosforilado. En cambio, una ligasa necesitaría conocer la secuencia
de la estructura que se va a unir al `Pose`.)

Si se proporcionan varias líneas de cosustrato, significa que la enzima simulada
es promiscua; es decir, seleccionará al azar entre las opciones
al realizar la reacción.

## Para desarrolladores
### Nomenclatura

Cualquier `EnymaticMover` debe nombrarse como una enzima (que termine en «-asa», «-ase» en inglés) seguida de 
«Mover». Por ejemplo, `RosettaseMover`.

### Código C++
Cualquier `Mover` que herede de la clase base `EnzymaticMover` debe:

* ...proporcionar una familia de enzimas correspondiente a un directorio de datos de enzimas.<br />
  La familia de enzimas se pasa como argumento al constructor de `EnzymaticMover`
  en el propio constructor de la clase hija. Por ejemplo:<br />
```c++
KinaseMover::KinaseMover(): EnzymaticMover( "kinases" )
{
	type( "KinaseMover" );
}
```

* ...usar el método `xml_schema_complex_type_generator()` de `EnzymaticMover` para 
  proporcionar el esquema XML para RosettaScripts.
  Por ejemplo:
```c++
void
DNALigaseMover::provide_xml_schema( utility::tag::XMLSchemaDefinition & xsd )
{
	using namespace utility::tag;

	EnzymaticMover::xml_schema_complex_type_generator()->element_name( mover_name() )
		.complex_type_naming_func( & moves::complex_type_name_for_mover )
		.description( "Enzymatic mover to connect two DNA Poses together." )
		.write_complex_type_to_schema( xsd );
}
```

* ...implementar el método protegido `perform_reaction()`, que modifica, añade o
  elimina uno o varios Residue.<br />
  Por ejemplo:
```c++
void
GlycosyltransferaseMover::perform_reaction(
	core::pose::Pose & input_pose,
	core::uint const site,
	std::string const & cosubstrate )
{
	core::pose::carbohydrates::glycosylate_pose(
		input_pose,
		get_reactive_site_sequence_position( site ),
		get_reactive_site_atom_name( site ),
		cosubstrate );
}
```

Dos métodos de `EnzymaticMover` son muy útiles para realizar la reacción
propiamente dicha, como se muestra en el ejemplo anterior: `get_reactive_site_sequence_position`
y `get_reactive_site_atom_name`.

El resto del código de cualquier `EnzymaticMover` debería ser código «repetitivo» (boilerplate) simple. La maquinaria
central de la clase base usa datos enzimáticos que se encuentran en la 
base de datos para buscar posibles sitios de reacción. La clase singleton `EnzymeManager`
se usa para cargar perezosamente los datos de enzimas de manera segura entre hilos, según lo necesite
cualquier `EnzymaticMover`.

### Estructura de la base de datos
Todos los datos de enzimas para los `EnzymaticMovers` deben estar ubicados en la 
carpeta `database/virtual_enzymes/`.

Cada `EnzymaticMover` hijo debe tener un subdirectorio correspondiente a la 
familia de enzimas de ese `Mover`, que debe coincidir con la familia proporcionada al 
constructor de `EnzymaticMover`. (Véase arriba.) Por ejemplo, los datos del 
`MethylaseMover` deben almacenarse en `database/virtual_enzymes/methylases/`.

Los directorios de cada familia de enzimas no incluyen archivos, solo subdirectorios
correspondientes a especies. Todo directorio de familia de enzimas debe tener, como mínimo, un 
subdirectorio `h_sapiens/`, porque «h_sapiens» está codificada como la especie predeterminada
para cualquier `EnzymaticMover`. Todos los demás subdirectorios son para enzimas de
fuentes no humanas.

Cada subdirectorio de especie debe incluir un archivo de datos de enzima `generic` como
ejemplo predeterminado de esta familia de enzimas. En general, estos datos
proporcionarán un sequon mínimo, tendrán una eficiencia del 100% y no serán promiscuos.

----------
Documentación creada el 5 de abril de 2019 por Jason W. Labonte <JWLabonte@jhu.edu>.
Documentación actualizada el 26 de febrero de 2020 por Jason W. Labonte <JWLabonte@jhu.edu>.

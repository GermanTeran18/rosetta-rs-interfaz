Trabajar con glicanos
=====================


Metadatos
========

El RosettaCarbohydrate Framework fue creado por el Dr. Jason W Labonte (JWLabonte@jhu.edu), en colaboración con el Dr. Jared Adolf-Bryfogle (jadolfbr@gmail.com)


Los investigadores principales son: el Dr. Jeff Gray de JHU (jgray@jhu.edu) y el Dr. William Schief de Scripps (schief@scripps.edu).

Referencias
==========

**Residue‐centric modeling and design of saccharide and glycoconjugate structures**
Jason W. Labonte  Jared Adolf‐Bryfogle  William R. Schief  Jeffrey J. Gray
_Journal of Computational Chemistry_, 30/11/2016
[[https://doi.org/10.1002/jcc.24679]]

**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]

**Automatically Fixing Errors in Glycoprotein Structures with Rosetta**
Brandon Frenz, Sebastian Rämisch, Andrew J. Borst, Alexandra C. Walls
Jared Adolf-Bryfogle, William R. Schief, David Veesler, Frank DiMaio
_Structure_, 2/1/2019
[[https://www.sciencedirect.com/science/article/pii/S0969212618303320]]


[[_TOC_]]


## Entrada de estructuras

* Todas las ejecuciones de Rosetta con estructuras que contienen carbohidratos deben usar una opción para que Rosetta reconozca los carbohidratos. Si no está presente, se producirá un error. Esta opción también es necesaria si planeas glicosilar estructuras. 

        -include_sugars




###  RSCB - archivos .pdb

Los PDB del RCSB deberían poder leerse por defecto.  Sin embargo, para cargar un archivo PDB es necesario que haya registros LINK. Rosetta construirá los glicanos usando nombres internos y los creará a partir de la conectividad.   

* La lectura de la mayoría de los archivos PDB requerirá una opción que asigne los ID HETNAM no específicos a identificadores químicamente exactos:  

        -alternate_3_letter_codes pdb_sugar

* Para conservar los glicanos PDB en una lectura y escritura de ida y vuelta, usa la opción que escribe los códigos PDB en lugar de los de Rosetta:

        -write_glycan_pdb_codes

* Al cargar un archivo del PDB, el orden de los registros HETATM y LINK es importante para leerlo en Rosetta. Como los archivos pdb normalmente no tienen un formato compatible con Rosetta, las conexiones pueden determinarse internamente, sin tener en cuenta el orden de los registros. En su lugar, se usan las distancias entre átomos para determinar las conexiones proteína-azúcar y azúcar-azúcar.  

        -auto_detect_glycan_connections
        -maintain_links

    * las longitudes de enlace máxima y mínima para que se detecte una conexión son, por defecto, 1.15 y 1.65 A. Como muchas estructuras son químicamente incorrectas, estos parámetros pueden cambiarse para detectar también enlaces no físicos:

             -min_bond_length < Real >
             -max_bond_length < Real >
    * si la detección automática falla, todos los cálculos de enlaces y conexiones pueden supervisarse con ```-out::level 999``` 
    * La opción maintain_links debería usarse en general para cargar pdbs.  Si tienes problemas, prueba a desactivarla. 

    * Puede que también necesites añadir la opción `-load_PDB_components false`.  

### GLYCAM
Para cargar estructuras GLYCAM, se puede pasar la opción ```-glycam_pdb_format``` con el fin de leer este tipo de archivo.

## Salida de estructuras

Para escribir las estructuras correctamente, deben escribirse los registros link del pdb.  Esta opción ya es la predeterminada.

    -write_pdb_link_records

## Ejemplo completo

```
    score.default.macosclangrelease \
    -include_sugars \
    -alternate_3_letter_codes pdb_sugar \
    -load_PDB_components false \
    -auto_detect_glycan_connections \
    -min_bond_length 1.1 \
    -max_bond_length 1.7 \

    -ignore_zero_occupancy false \
    -ignore_unrecognized_res \
    -out:output \
    -s 5t3x.pdb

```

Consejos
====
Se recomienda usar las configuraciones comunes de Rosetta (Rosetta Common Configurations) para trabajar fácilmente con estructuras de glicanos en Rosetta.  Puedes encontrar más información 
[[aquí | running-rosetta-with-options#common-options-and-default-user-configuration]].

Nomenclatura
============
La mayoría de las veces que tratamos con glicanos usamos nombres IUPAC.  La 'raíz' del glicano, tal como se denomina en Rosetta, es el residuo por el que el glicano se une a la proteína.  Algunos componentes, como el GlycanResidueSelector, usan 'posiciones de glicano' para especificar fácilmente los residuos de los glicanos.
Estos números van de 1 -> N, donde 1 es el primer residuo del glicano y N es el último. Para averiguar la posición de glicano del residuo que te interesa, usa la aplicación [[GlycanInfo]]. 


Muestreo
========
 - [[GlycanSampler | GlycanRelaxMover ]] - combinación de estrategias de muestreo de uso general.
 - [[GlycanTreeModeler]] - protocolo completo para modelar carbohidratos.  Es el preferido.

 - [[SmallMover]] - realiza pequeños cambios en todos los ángulos de torsión de un enlace glucosídico elegido al azar.
 - [[ShearMover]] - realiza un movimiento de cizalla, aplicando pequeños cambios opuestos a un par de torsiones glucosídicas casi paralelas.

 - [[RingConformationMover]] - cambia la conformación del anillo de un residuo cíclico. (¡Ten en cuenta que normalmente esto no es energéticamente favorable!)
 - [[LinkageConformerMover | mover_LinkageConformerMover_type]] - cambia todos los ángulos de torsión glucosídicos usando los ángulos de una conformación estadísticamente favorable.
 - [[RingPlaneFlipMover]] - realiza un movimiento de cizalla de 180 grados sobre un residuo con enlaces ecuatoriales opuestos, volteando en la práctica el plano de su anillo.
 - [[TautomerizeAnomerMover]] - sustituye un residuo de azúcar del extremo reductor por su anómero.


Aplicaciones
============
[[GlycanInfo]] - obtener información sobre todos los árboles de glicanos de un Pose

[[GlycanClashCheck]] - obtener datos sobre los choques del modelo con glicanos y entre glicanos, o entre glicanos y otras cadenas proteicas.

[[GlycanDock]] - hacer docking de glicanos libres sobre superficies de proteínas

Componentes de RosettaScripts
========================
[[GlycanTreeModeler ]] - modela árboles de glicanos usando información conocida sobre carbohidratos.  Sirve tanto para el modelado de novo completo como para el refinamiento.

[[SimpleGlycosylateMover]] - glicosila Poses con árboles de glicanos.  

[[GlycanResidueSelector]] - selecciona residuos concretos de cada árbol de glicano de interés.

[[LinkageConformerMover|mover_LinkageConformerMover_type]]

Exploración de secuones de glicanos
===================================
Aunque está prevista una aplicación, se puede usar el `CreateGlycanSequonMover` para diseñar los residuos necesarios alrededor de un posible sitio de glicosilación.  Esto crea, en la práctica, el motivo de secuencia Asn-X-Ser/Thr.  Hay opciones para diseñar la X, diseñar alrededor o, alternativamente, usar otros motivos de secuencia.   Usa rosetta_scripts.xxxrelease -info CreateGlycanSequonMover para obtener más información y opciones.  Abajo se muestra un script base que usa la opción `-parser:script_vars` para explorar una proteína en busca de sitios de glicosilación óptimos en los residuos indicados y luego glicosilar y modelar el carbohidrato.  Se recomienda crear al menos 100-1000 modelos del carbohidrato en cada posición.

```
<ROSETTASCRIPTS>
	<RESIDUE_SELECTORS>
		<Index name="select" resnums="%%glycan_position%%" />
	</RESIDUE_SELECTORS>
	<MOVERS>
		<CreateGlycanSequonMover name="create_motif" residue_selector="select" basic_enhanced_n_sequon="false" design_x_positions="false" pack_neighbors="1"/>
		<SimpleGlycosylateMover name="glycosylate" residue_selector="select" glycosylation="%%glycosylation%%" strip_existing="1" />
		<GlycanRelaxMover name="basic_relax" />
		<GlycanTreeRelax name="tree_relax" quench_mode="false" rounds="1" layer_size="2" window_size="1"/>
	</MOVERS>
	<PROTOCOLS>
		<Add mover_name="create_motif" />
		<Add mover_name="glycosylate" />
		<Add mover_name="tree_relax" />
	</PROTOCOLS>
</ROSETTASCRIPTS>
``` 

Glicosilación de estructuras
============================
Las estructuras pueden glicosilarse mediante una función accesible desde PyRosetta o mediante RosettaScripts, como se explica a continuación.

### RosettaScripts

Consulta la documentación de [[SimpleGlycosylateMover]]

### PyRosetta
Este es un ejemplo de cómo añadir un man9 al Pose.
Ahora esto puede hacerse de dos maneras en PyRosetta: mediante la función del núcleo o mediante la clase envoltorio. 

#### Función base
Lo siguiente usa una función para glicosilar un Pose usando el nombre IUPAC:
```
/// @brief  Glycosylate the Pose at the given sequence position using an IUPAC sequence.
void glycosylate_pose(
	Pose & pose,
	uint const sequence_position,
	std::string const & iupac_sequence,
	bool const idealize_linkages = true );
```

Este es un ejemplo del uso de la función para glicosilar el Pose con un glicano man5, un glicano muy común en biología.

```
from rosetta import *
from rosetta.core.pose.carbohydrates import glycosylate_pose
rosetta.init('-include_sugars -write_pdb_link_records')

p = Pose("my_pose.pdb")
glycosylate_pose(p, 10, "a-D-Manp-(1->3)-[a-D-Manp-(1->3)-[a-D-Manp-(1->6)]-a-D-Manp-(1->6)]-b-D-Manp-(1->4)-b-D-GlcpNAc-(1->4)-b-D-GlcpNAc-", True)

print p
print p.residue(3)
print p.chain_sequence()
```
 
 
#### SimpleGlycosylateMover
Este mover es accesible tanto en PyRosetta como en RosettaScripts. Lo escribió Jared Adolf-Bryfogle.

Consulta [[SimpleGlycosylateMover]] para una descripción completa.

Ejemplo con un man5:

```
from rosetta import *
from rosetta.protocols.carbohydrates import SimpleGlycosylateMover
rosetta.init('-include_sugars -write_pdb_link_records')

p = Pose("my_pose.pdb")

glycosylator = SimpleGlycosylationMover()
glycosylator.set_glycosylation('man5')
glycosylator.set_positions(10)
glycosylator.apply(p)

print p
print p.residue(3)
print p.chain_sequence()
```

Construcción de glicanos puros
================
Los glicanos pueden construirse por sí solos (es decir, SIN estar unidos a una proteína) usando PyRosetta.  Actualmente no hay forma de hacerlo en RosettaScripts:
Los glicanos se crean a partir de sus nombres IUPAC. 

Para construir correctamente un oligosacárido, Rosetta debe conocer los siguientes detalles de cada residuo de azúcar que se crea, en este orden:
-	Conectividad de la cadena principal — →2) (`->2)`), →4) (`->4)`), →6) (`->6)`), ↔1) (`<->1)`), etc.; el valor predeterminado es `->4)-`
-	Forma anomérica — α (`a` o `alpha`) o β (`b` o `beta`); el valor predeterminado es `alpha`
-	Forma enantiomérica — `l` (L) o `d` (D); el valor predeterminado es D
-	Código de 3 letras — obligatorio; se escribe con mayúscula inicial
-	Código de la forma del anillo — f (para una furanosa/anillo de 5 miembros), p (para una piranosa/anillo de 6 miembros); obligatorio
Los residuos deben separarse con guiones. Los enlaces glucosídicos pueden especificarse con la notación IUPAC completa, p. ej., `-(1->4)-` para “-(1→4)-”. Rosetta supondrá `-(1->` para las aldosas y `-(2->` para las cetosas. Ten en cuenta que, por convención, la secuencia IUPAC de una cadena de sacáridos se escribe en el orden inverso al de su numeración. Los enlaces bidireccionales usan una flecha de doble punta, p. ej., `-(1<->1)-` para “-(1↔1)-”.


El siguiente ejemplo crea un Pose a partir del nombre IUPAC de un sacárido:

```
from rosetta import *
from rosetta.core.pose import pose_from_saccharide_sequence
rosetta.init('-include_sugars -write_pdb_link_records')

galactose = pose_from_saccharide_sequence('Galp')
maltotriose = pose_from_saccharide_sequence('a-D-Glcp-' * 3)
mannose = pose_from_saccharide_sequence('->3)-a-D-Manp')
lactose = pose_from_saccharide_sequence('b-D-Galp-(1->4)-a-D-Glcp')

print lactose
print lactose.residue(1)
print lactose.chain_sequence()

```

## Véase también
### Aplicaciones
* [[GlycanInfo]] - obtener información sobre todos los árboles de glicanos de un Pose
* [[GlycanClashCheck]] - obtener datos sobre los choques del modelo con glicanos y entre glicanos, o entre glicanos y otras cadenas proteicas.
* [[GlycanDock]] - hacer docking de glicanos libres sobre superficies de proteínas

### Componentes de RosettaScripts
* [[GlycanTreeModeler]] - modela árboles de glicanos usando información conocida sobre carbohidratos.  Sirve tanto para el modelado de novo completo como para el refinamiento.
* [[SimpleGlycosylateMover]] - glicosila Poses con árboles de glicanos.  
* [[GlycanResidueSelector]] - selecciona residuos concretos de cada árbol de glicano de interés.
* [[LinkageConformerMover|mover_LinkageConformerMover_type]]

### Otros
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta

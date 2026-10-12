#RosettaScripts

**RosettaScripts: A Scripting Language Interface to the Rosetta Macromolecular Modeling Suite** 
Fleishman SJ, Leaver-Fay A, Corn JE, Strauch EM, Khare SD, et al. (2011) RosettaScripts: A Scripting Language Interface to the Rosetta Macromolecular Modeling Suite. PLOS ONE 6(6): e20161. [[https://doi.org/10.1371/journal.pone.0020161]]

===

-   [[Uso de RosettaScripts con VSCode|Using-RosettaScripts-with-VSCode]]
-   [Tutorial introductorio](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
-   [Tutorial avanzado](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)

---------------------

-   [[Movers (RosettaScripts)|Movers-RosettaScripts]]
-   [[Filtros|Filters-RosettaScripts]]
-   [[TaskOperations (RosettaScripts)|TaskOperations-RosettaScripts]]
-   [[MoveMapFactories (RosettaScripts)|MoveMapFactories-RosettaScripts]]
-   [[ResidueSelectors (RosettaScripts)|ResidueSelectors]]
-   [[JumpSelectors |JumpSelectors]]
-   [[PackerPalettes|PackerPalette]]
-   [[SimpleMetrics]]

---------------------

-   [[Protocolos compuestos con interfaces de RosettaScripts|Composite-protocols]]
-   [[Rosetta Scripts multietapa|MultistageRosettaScripts]]
-   [[SymmetryAndRosettaScripts]]
-   [[Convenciones de formato de RosettaScripts|RosettaScripts-Conventions]]
-   [[Opciones de conexión a bases de datos de RosettaScripts|RosettaScripts-database-connection-options]]
-   [[Descripción general del marco Features Reporter|Features-reporter-overview]]
-   [[Guía para desarrolladores de RosettaScripts|RosettaScripts-Developer-Guide]]


Esta página documenta la sintaxis de RosettaScripts y los métodos habituales con los que puedes usar RosettaScripts para combinar movers de Rosetta.

[[_TOC_]]

<!--- BEGIN_INTERNAL -->
##Ubicaciones de los archivos XML de RosettaScripts

Se **recomienda encarecidamente** que todos los desarrolladores de Rosetta mantengan sus RosettaScripts bajo control de versiones. Los scripts privados deben colocarse en `main/source/scripts/rosetta_scripts/pilot/<user_name>`. Los scripts públicos deben ir en `main/source/scripts/rosetta_scripts/public/`. Todo script público debe tener también pruebas de integración asociadas. 


<!--- END_INTERNAL -->
Formato XML "esqueleto"
---------------------

Copia, pega, rellena y disfruta
```xml
<ROSETTASCRIPTS>
    <SCOREFXNS>
    </SCOREFXNS>
    <RESIDUE_SELECTORS>
    </RESIDUE_SELECTORS>
    <TASKOPERATIONS>
    </TASKOPERATIONS>
    <SIMPLE_METRICS>
    </SIMPLE_METRICS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
    </MOVERS>
    <PROTOCOLS>
    </PROTOCOLS>
    <OUTPUT />
</ROSETTASCRIPTS>
```
Todo lo que esté fuera de la notación \< \> se ignora y se puede usar para comentar el archivo xml

<b>Consejo útil:</b> Para obtener el script plantilla vacío de arriba, puedes ejecutar la aplicación rosetta_scripts omitiendo la opción ```-parser:protocol```.  Si se omite esta opción (<i>es decir</i>, no se proporciona ningún script de entrada), la aplicación imprime el script plantilla y termina.  Esto es muy útil cuando uno se sienta a escribir un script nuevo.

Descripción general y propósito
-------------------------------

RosettaScripts pretende ofrecer una interfaz scriptable en xml para llevar a cabo todas las tareas que producen los desarrolladores de diseño de interfaces. Con una interfaz scriptable así, se espera que personas que no son programadoras puedan 'combinar a su gusto' distintas estrategias de diseño y aplicarlas a sus propias necesidades. También se espera que, gracias a una interfaz común, compartir código entre distintas personas sea más sencillo. Ten en cuenta que, por ahora, los únicos movers y filtros implementados en esta aplicación son los que se describen a continuación. En futuras versiones habrá más disponibles. Por ahora incluyen protocolos de los grupos de diseño de interfaces de proteínas, docking de proteínas, diseño de enzimas, docking y diseño de ligandos, diseño de monómeros y diseño de interfaces de ADN. También hay movers generales para modelado de loops y relajación de estructuras.

Hay un artículo que describe RosettaScripts en: Fleishman et al. (2011) PLoS 1 6:e20161
(http://www.plosone.org/article/fetchObject.action?uri=info%3Adoi%2F10.1371%2Fjournal.pone.0020161&representation=PDF)

En el nivel más abstracto, todos los cálculos que se necesitan en el diseño de interfaces se dividen en dos categorías: Movers y Filters. Los movers cambian la conformación del complejo al actuar sobre él, p. ej., docking/diseño/minimización, y los filtros deciden si una conformación dada debe pasar a los pasos siguientes. Los filtros sirven para reducir la cantidad de cálculo que se dedica a conformaciones que no muestran ninguna promesa. Entonces, un RosettaScript es simplemente una secuencia de movers y filtros.

La implementación de este comportamiento se hace mediante los siguientes componentes:

-   **ParsedProtocol** , **Filter** y **Mover**
ParsedProtocol mantiene un vector de pares de movers y sus filtros asociados. Mediante TrueFilter o NullMover, los filtros y los movers pueden desacoplarse esencialmente en cualquier protocolo. La estructura de pares de movers y filtros se usa simplemente porque en la mayoría de los contextos los filtros estarán asociados conceptualmente a un mover y viceversa.
-   **DockDesignParser.cc** Esta función analiza un archivo xml y rellena DockDesignMover con pares de Movers y Filters. Todos los movers y filtros que se admiten también deben definirse en esta función.

Consulta un [tutorial introductorio](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts) y un [tutorial avanzado](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts) sobre RosettaScripts.


Archivo XML de ejemplo
----------------

El siguiente ejemplo moderno usa :`in:file:native` y minimiza un loop CDR de una proteína, calculando varias métricas antes y después de la minimización.
Todas las métricas se escribirán en el archivo de puntuaciones con el prefijo/sufijo dado y los nombres de cada métrica.

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
		<CDR name="L1" cdrs="L1"/>
	</RESIDUE_SELECTORS>
	<MOVE_MAP_FACTORIES>
		<MoveMapFactory name="movemap_L1" bb="0" chi="0">
			<Backbone residue_selector="L1" />
			<Chi residue_selector="L1" />
		</MoveMapFactory>
	</MOVE_MAP_FACTORIES>
	<SIMPLE_METRICS>
		<TimingProfileMetric name="timing" />
		<RMSDMetric name="rmsd" rmsd_type="rmsd_protein_bb_heavy" residue_selector="L1" use_native="1"/>
		<SelectedResiduesMetric name="rosetta_sele" residue_selector="L1" rosetta_numbering="1"/>
		<SelectedResiduesPyMOLMetric name="pymol_selection" residue_selector="L1" />
		<SequenceMetric name="sequence" residue_selector="L1" />
		<SecondaryStructureMetric name="ss" residue_selector="L1" />
	</SIMPLE_METRICS>
	<MOVERS>
		<MinMover name="min_mover" movemap_factory="movemap_L1" tolerance=".1" /> 
		<RunSimpleMetrics name="run_metrics1" metrics="pymol_selection,sequence,ss,rosetta_sele" prefix="m1_" />
		<RunSimpleMetrics name="run_metrics2" metrics="rmsd,timing,ss" prefix="m2_" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover_name="run_metrics1"/>
		<Add mover_name="min_mover" />
		<Add mover_name="run_metrics2" />
	</PROTOCOLS>
</ROSETTASCRIPTS>
```

Rosetta llevará a cabo el orden de operaciones especificado en PROTOCOLS.  Un punto importante es que las SimpleMetrics y los Filters nunca cambian la secuencia ni la conformación de la estructura.

Los movers sí cambian el Pose, y el archivo de salida será el resultado de aplicar secuencialmente los movers de la sección protocols. Las puntuaciones estándar de la salida se arrastrarán de cualquier protocolo que haga puntuación, a menos que se especifique la etiqueta OUTPUT, en cuyo caso se usará la función de puntuación correspondiente del bloque SCOREFXNS.  Puedes usar el nombre "commandline" como función de puntuación en la etiqueta OUPUT.  Ten en cuenta que esto significa que, si tu Pose no se puntúa durante el protocolo, ¡tu salida no tendrá información de puntuación!

Se pueden encontrar más scripts xml de ejemplo, incluidos ejemplos de docking, diseño de interfaces de proteínas y prepacking de un complejo de proteínas, entre otros, en el directorio Rosetta/demos/public/rosetta\_scripts/. 

Línea de comandos de ejemplo
-------------------

La siguiente línea de comandos ejecutaría el protocolo anterior, suponiendo que el archivo del protocolo se llame ala\_scan.xml

```
Rosetta/main/source/bin/rosetta_scripts.linuxgccrelease -s < INPUT PDB FILE NAME > -use_input_sc -nstruct 20 -ex1 -ex2 -parser:protocol ala_scan.xml -parser:view
```
Ten en cuenta que, para que RosettaScripts tenga realmente en cuenta la mayoría de las opciones de línea de comandos, debes usar la taskoperation <InitializeFromCommandLine>.

La opción parser:view puede usarse con ejecutables de rosetta que se hayan compilado con el parámetro extras=graphics de la siguiente manera (desde el directorio raíz de Rosetta):

```
scons mode=release -j3 bin extras=graphics
```

Al ejecutar con -parser:view se abrirá un visor gráfico que muestra muchos de los pasos de una trayectoria. Esto es extremadamente útil para asegurarse de que el muestreo sigue la trayectoria prevista.

Archivos de entrada y salida
----------------------

Para ejecutar un protocolo típico hace falta un archivo xml y un archivo pdb inicial, como en la línea de comandos de ejemplo anterior. Alternativamente, para ejecutar el protocolo sobre muchas estructuras, guarda una lista sencilla de los archivos pdb que se van a usar y sustituye la opción -s \<INPUT PDB FILE NAME\> de la línea de comandos por -l \<INPUT LIST FILE NAME\>. Algunos movers y filtros requieren archivos de entrada específicos (por ejemplo, un archivo pdb con residuos stub para la colocación de residuos hot-spot en los movers PlaceStub o PlaceSimultaneously), y en tales casos los archivos de entrada necesarios se describen más abajo y, por lo general, se invocan desde el script xml.

Durante una ejecución, si alguno de los filtros definidos no se cumple, la trayectoria se descartará y no se devolverán archivos de salida; Rosetta continuará con el siguiente ntrial (o, si se han intentado todos los ntrials y han fallado, Rosetta continuará con los nstructs restantes definidos en la línea de comandos). En una ejecución correcta en la que se cumplen todos los filtros, la salida incluirá un archivo pdb y un archivo score.sc. El nombre del pdb de salida es idéntico al del archivo pdb de entrada, con un sufijo que indica el número de nstruct.

El archivo score.sc tabula los términos de energía y los valores de los filtros de cada nstruct correcto. El archivo pdb termina con una tabla de energía de todos los residuos y enumera los valores de los filtros en el mismo orden en que se usan en el protocolo xml. Por defecto, la función de puntuación usada en el archivo de puntuaciones y en la tabla de energía del PDB es "commandline" (la función de puntuación especificada por las opciones de línea de comandos). Para cambiarla por otra función de puntuación, consulta la [etiqueta OUTPUT](#OUTPUT) .

Uso de un editor con IntelliSense para ayudar a generar RosettaScripts
-------------------------------------------------------------------

Avner Aharoni (Microsoft) generó para nosotros un esquema xml con Visual Studio. Usar este esquema en un editor compatible proporciona un editor específico para escribir RosettaScripts, con autocompletado de palabras, avisos de errores gramaticales y ayuda con las opciones. Actualmente conocemos dos editores totalmente compatibles con este esquema

### Edición de RosettaScripts en emacs

El complemento nXML de emacs es compatible con el esquema RosettaScripts.rnc (que se encuentra en src/apps/public/rosetta\_scripts/RosettaScripts.rnc).

1.  Descarga nXML desde [http://www.thaiopensource.com/nxml-mode/](http://www.thaiopensource.com/nxml-mode/)
2.  Lee la parte de nXML de la emacsWiki en [http://www.emacswiki.org/cgi-bin/wiki/NxmlMode](http://www.emacswiki.org/cgi-bin/wiki/NxmlMode)
3.  Carga el archivo RosettaScripts.rnc en emacs+nXML
4.  Carga tu protocolo
5.  ¡Diviértete!

### Edición de RosettaScripts en VisualStudio

Los usuarios de MS-Windows pueden descargar Visual Studio Express (gratuito), que ofrece un editor xml compatible con el esquema RosettaScripts.xsd (que se encuentra en src/apps/public/rosetta\_scripts/RosettaScripts.xsd). Avner Aharoni proporcionó las siguientes instrucciones:

1.  Descarga VB express desde [http://www.microsoft.com/express/download/](http://www.microsoft.com/express/download/)
2.  Guarda el esquema en la siguiente carpeta C:\\Program Files\\Microsoft Visual Studio 9.0\\Xml\\Schemas
3.  Crea un archivo xml vacío en el disco (un archivo con el sufijo .xml)
4.  Ábrelo en Visual Studio Express, ve a sus propiedades (view =-\> property window F4) y establece el esquema RosettaScripts.xsd para su uso.

Convenciones de RosettaScripts
--------------------------

### Comentarios generales

Este archivo enumera los Movers y Filters, sus valores por defecto, significados y usos tal como los reconoce RosettaScripts. Está escrito en formato xml y, con muchos visores gratuitos (p. ej., vi), se resaltarán las notaciones xml clave siempre que el archivo tenga la extensión .xml

Siempre que se muestre una sentencia xml, se usará la siguiente convención:

<...> para definir una sentencia de rama (una sentencia que tiene más hojas)
<.../> una sentencia de hoja.
"" define la entrada esperada del usuario, con ampersand (&) para definir el tipo esperado (string, float, etc.)
() define el valor por defecto que usará el analizador si el protocolo no lo proporciona.
### Especificación de residuos

En Rosetta se usan dos convenciones de numeración de residuos: la "numeración del Pose" y la "numeración PDB". La numeración del Pose asigna el valor 1 al primer residuo de la primera cadena y numera secuencialmente a partir de ahí, ignorando el inicio de nuevas cadenas y los residuos que faltan. La numeración PDB usa la designación de cadena/residuo/código de inserción presente en el archivo pdb de entrada. Por lo general, siempre que se da un identificador de residuo con una cadena, es numeración PDB, y sin cadena es el número del Pose.

Por ejemplo, si tienes un archivo PDB con dos cadenas, con los residuos 12-62 en la cadena A y los residuos 5-20 y 32 a 70 en la cadena B, el número de Pose del residuo pdb 12 de la cadena A sería 1, y el residuo pdb 62 de la cadena A tendría el número de Pose 51. El residuo 5 de la cadena B del pdb tendría el número de Pose 52, y el residuo 32 de la cadena B tendría el número de Pose 68.

En muchas de las etiquetas de RosettaScripts que toman un identificador de residuo hay una opción conjunta para especificarlo en numeración del Pose o en numeración PDB, que se indica con algo como res\_num/pdb\_num. En las etiquetas que tienen esta opción, puedes especificar *o bien* res\_num= *o bien* pdb\_num=, pero no ambas. La opción res\_num toma una designación de residuo con numeración del Pose, y la opción pdb\_num toma una designación con numeración pdb en la forma "42.A" o "42A", donde A especifica la cadena y 42 es el número de residuo pdb. Por ahora no es posible especificar un código de inserción con la opción pdb\_num.

Hay que tener cuidado al usar la numeración PDB con protocolos que cambian la longitud del Pose. La inserción de residuos puede invalidar la información PDB asociada al Pose, lo que provoca errores al decodificar la numeración pdb. Además, algunos objetos de RosettaScripts convertirán el número pdb en un número de Pose basándose en la numeración de la estructura de entrada, lo que puede producir un desalineamiento si se añaden o eliminan residuos.

### Obtener ayuda

Aunque esta documentación pretende ser el manual de usuario principal de RosettaScripts, también hay ayuda disponible en la propia aplicación.  Para obtener un script plantilla vacío, simplemente ejecuta la aplicación rosetta_scripts sin ninguna opción de entrada.  Por ejemplo:

```
> ./bin/rosetta_scripts.default.linuxgccrelease
```

Esto produce la siguiente salida:

```
core.init: USEFUL TIP: Type -help to get the options for this Rosetta executable.
apps.public.rosetta_scripts.rosetta_scripts: No XML file was specified with the "-parser:protocol <filename>" commandline option.  In order for RosettaScripts to do something, it must be provided with a script.
apps.public.rosetta_scripts.rosetta_scripts: The following is an empty (template) RosettaScripts XML file:

<ROSETTASCRIPTS>
	<SCOREFXNS>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
	</RESIDUE_SELECTORS>
	<TASKOPERATIONS>
	</TASKOPERATIONS>
	<SIMPLE_METRICS>
	</SIMPLE_METRICS>
	<FILTERS>
	</FILTERS>
	<MOVERS>
	</MOVERS>
	<PROTOCOLS>
	</PROTOCOLS>
	<OUTPUT />
</ROSETTASCRIPTS>

At any point in a script, you can include text from another file using <xi:include href="filename.xml" />.
apps.public.rosetta_scripts.rosetta_scripts: Variable substituion is possible from the commandline using the -"parser:script_vars varname=value" flag.  Any string of the pattern "%%varname%%" will be replaced with "value" in the script.
apps.public.rosetta_scripts.rosetta_scripts:
apps.public.rosetta_scripts.rosetta_scripts: The rosetta_scripts application will now exit.
```

También puedes obtener ayuda sobre la sintaxis de cualquier mover, filtro, task operation o residue selector con la opción `-parser:info <name1> <name2> <name3> ...`.  Por ejemplo, la siguiente línea de comandos proporcionará información sobre el mover [[MutateResidue|MutateResidueMover]] y el filtro [[HbondsToAtom|HbondsToAtomFilter]]:

```
./bin/rosetta_scripts.default.linuxgccrelease -info MutateResidue HbondsToAtom
```

La salida es la siguiente:

```
The rosetta_scripts application was used with the -parser:info flag.
Writing options for the indicated movers/filters/task operations/residue selectors:
--------------------------------------------------------------------------------
INFORMATION ABOUT MOVER "MutateResidue":

DESCRIPTION:

Change a single residue or a given subset of residues to a different type. For instance, mutate Arg31 to an Asp, or mutate all Prolines to Alanine

USAGE:

<MutateResidue target=(string) new_res=(string) mutate_self=(bool,"false") perserve_atom_coords=(bool,"false") update_polymer_bond_dependent=(bool) preserve_atom_coords=(bool) residue_selector=(string) name=(string)>
</MutateResidue>

OPTIONS:

"MutateResidue" tag:

	target (string):  The location to mutate. This can be a PDB number (e.g. 31A), a Rosetta index (e.g. 177), or an index in a reference pose or snapshot stored at a point in a protocol before residue numbering changed in some way (e.g. refpose(snapshot1,23)). See the convention on residue indices in the RosettaScripts Conventions documentation for details

	new_res (string):  The name of the residue to introduce. This string should correspond to the ResidueType::name() function (eg ASP).

	mutate_self (bool,"false"):  If true, will mutate the selected residue to itself, regardless of what new_res is set to (although new_res is still required). This is useful to "clean" residues when there are Rosetta residue incompatibilities (such as terminal residues) with movers and filters.

	perserve_atom_coords (bool,"false"):  If true, then atoms in the new residue that have names matching atoms in the old residue will be placed at the coordinates of the atoms in the old residue, with other atoms rebuilt based on ideal coordinates. If false, then only the mainchain heavyatoms are placed based on the old atom's mainchain heavyatoms; the sidechain is built from ideal coordinates, and sidechain torsion values are then set to the sidechain torsion values from the old residue. False if unspecified.

	update_polymer_bond_dependent (bool):  Update the coordinates of atoms that depend on polymer bonds

	preserve_atom_coords (bool):  Preserve atomic coords as much as possible

	residue_selector (string):  name of a residue selector that specifies the subset to be mutated

	name (string):  The name given to this instance

--------------------------------------------------------------------------------
INFORMATION ABOUT FILTER "HbondsToAtom":

DESCRIPTION:

This filter counts the number of residues that form sufficiently energetically favorable H-bonds to a selected atom

USAGE:

<HbondsToAtom partners=(int) energy_cutoff=(real,"-0.5") bb_bb=(bool,"0") backbone=(bool,"0") sidechain=(bool,"1") pdb_num=(refpose_enabled_residue_number) atomname=(string) res_num=(int) name=(string) confidence=(real,"1.0")>
</HbondsToAtom>

OPTIONS:

"HbondsToAtom" tag:

	partners (int):  H-bonding partner expectation, below which counts as failure

	energy_cutoff (real,"-0.5"):  Energy below which a H-bond counts

	bb_bb (bool,"0"):  Count backbone-backbone H-bonds

	backbone (bool,"0"):  Count backbone H-bonds

	sidechain (bool,"1"):  Count sidechain H-bonds

	pdb_num (refpose_enabled_residue_number):  Particular residue of interest

	atomname (string):  Atom name to which to examine H-bonds

	res_num (int):  Residue number in Rosetta numbering (sequentially with the first residue in the pose being 1

	name (string):  The name given to this instance

	confidence (real,"1.0"):  Probability that the pose will be filtered out if it does not pass this Filter

--------------------------------------------------------------------------------

The rosetta_scripts application will now exit.
```

Opciones disponibles en el archivo XML del protocolo
------------------------------------------

### Sustitución de variables

A veces es deseable hacer una serie de ejecuciones distintas con parámetros ligeramente diferentes. En lugar de crear varios archivos XML ligeramente distintos, se pueden usar variables de script para hacer el trabajo.

Si se define la opción -parser:script\_vars en la línea de comandos, cada vez que se encuentra en el archivo XML una cadena como "%%variable\_name%%", se sustituye por el valor correspondiente de la línea de comandos.

Por ejemplo, una línea del XML como
```xml
<AlaScan name="scan" partner1="1" partner2="1" scorefxn="interface" interface_distance_cutoff="%%cutoff%%" repeats="%%repeat%%"/>
```
se puede convertir en
```xml
<AlaScan name="scan" partner1="1" partner2="1" scorefxn="interface" interface_distance_cutoff="10.0" repeats="5"/>
```
con la opción de línea de comandos
```
-parser:script_vars repeat=5 cutoff=10.0
```

Estos valores se pueden cambiar a voluntad para distintas ejecuciones, por ejemplo:
```
-parser:script_vars repeat=5 cutoff=15.0
-parser:script_vars repeat=2 cutoff=10.0
-parser:script_vars repeat=1 cutoff=9.0
```

Todas las instancias de la cadena "%%var%%" se sustituirán, también en los archivos XML de cualquier [[subrutina|Movers-RosettaScripts#Subroutine]]. Ten en cuenta que, aunque actualmente script\_vars se implementa como pura sustitución de texto de macros, esto podría cambiar en el futuro, y cualquier uso distinto de sustituir valores de etiquetas podría no funcionar. En particular, el uso de variables de script para cambiar la propia estructura de análisis del archivo XML \*no\* está admitido de forma explícita, y hay que tener una mente retorcida incluso para planteárselo.

### Inclusión de archivos XML

Puede resultar cómodo poner fragmentos de scripts XML de uso frecuente en sus propios archivos y dirigir un script para que cargue código XML de un archivo preexistente, de modo que el usuario no tenga que copiar y pegar fragmentos de código XML manualmente.  Para ello se puede usar el comando XML ```xi:include```, con el archivo que se va a incluir especificado mediante "href=filename".

```xml
<xi:include href="(&filename_string)" />
```

El bloque ```xi:include``` se sustituye de forma ingenua por el contenido del archivo especificado con "href=filename".  El siguiente es un ejemplo del uso de ```xi:include```, en el que suponemos que el usuario usa con frecuencia los filtros AlaScan y Ddg y quiere poner su configuración en un archivo aparte que pueda incluir cada vez que escriba un nuevo archivo XML de RosettaScripts:

<b>file1.xml</b>:
```xml
<ROSETTASCRIPTS>
  <SCOREFXNS>
    <ScoreFunction name="interface" weights="interface"/>
  </SCOREFXNS>
  <FILTERS>
    <xi:include href="file2.xml"/>
    <Sasa name="sasa" confidence="0"/>
  </FILTERS>
  <MOVERS>
    <Docking name="dock" fullatom="1" local_refine="1" score_high="soft_rep"/>
  </MOVERS>
  <PROTOCOLS>
    <Add mover_name="dock" filter_name="scan"/>
    <Add filter_name="ddg"/>
    <Add filter_name="sasa"/>
  </PROTOCOLS>
  <OUTPUT scorefxn="interface"/>
</ROSETTASCRIPTS>
```

<b>file2.xml</b>:
```xml
    <AlaScan name="scan" partner1="1" partner2="1" scorefxn="interface" interface_distance_cutoff="10.0" repeats="5"/>
    <Ddg name="ddg" confidence="0"/>
```

Ten en cuenta que la inclusión de archivos se produce de forma recursiva, de modo que los archivos incluidos pueden incluir otros archivos.  Las dependencias circulares (<i>p. ej.</i> file1.xml incluye file2.xml, que incluye file3.xml, que incluye file1.xml) están prohibidas y provocarán un error.  Sin embargo, se permiten varias inclusiones del mismo archivo (aunque rara vez sería aconsejable). Hay un límite en el número de archivos que se pueden incluir de esta manera. El límite de recursión es 8 y su valor se puede cambiar con la opción de línea de comandos `-parser:inclusion_recursion_limit`. En algunos casos puede que quieras evitar la búsqueda recursiva (p. ej., si el archivo que se incluye es muy grande); para ello se puede usar un parámetro opcional "prevent_recursion" en la etiqueta de inclusión de la siguiente manera:

```xml
<xi:include href="(&filename_string)" prevent_recursion="True"/>
```

La sustitución de variables se produce después de la inclusión de archivos, lo que significa que las sentencias ```%%variable%%``` pueden aparecer en los archivos incluidos; sin embargo, esto también significa que los bloques ```xi:include``` no pueden contener sentencias ```%%variable%%```. 

## Objetos predefinidos de RosettaScripts

Por comodidad, algunos objetos de RosettaScripts se pueden usar sin crear una etiqueta de definición para ellos.

### Movers predefinidos

Los siguientes están definidos internamente en el analizador, y el protocolo puede usarlos sin definirlos de forma explícita.

#### NullMover
Tiene un apply vacío. Se usará como mover por defecto en \<PROTOCOLS\> si no se especifica ningún mover\_name. Se puede especificar de forma explícita con el nombre "null".

### Filtros predefinidos

#### TrueFilter

Siempre devuelve true. Útil para definir un mover sin usar un filtro. Se puede especificar de forma explícita con el nombre "true\_filter".

#### FalseFilter

Siempre devuelve false. Se puede especificar de forma explícita con el nombre "false\_filter".

### Funciones de puntuación predefinidas

-   talaris2014: La función de puntuación de todos los átomos por defecto que usan la predicción de estructuras y el diseño de Rosetta
-   talaris2013: La versión anterior de talaris2014
-   score12: La función de puntuación por defecto anterior a talaris2013 (requiere la opción -restore_pre_talaris_2013_behavior en la línea de comandos.)
-   score\_docking: función de puntuación de docking de alta resolución (pre_talaris_2013_standard+docking\_patch)
-   score\_docking\_low: función de puntuación de docking de baja resolución (interchain\_cen)
-   soft\_rep: pesos de soft\_rep\_design.
-   score4L: función de puntuación de baja resolución usada para el remodelado de loops (con el peso de chainbreak activado)
-   commandline: la función de puntuación especificada por las opciones de línea de comandos (Nota: no se recomienda para uso general.)

#Secciones de RosettaScript

##PROTOCOLS

La sección PROTOCOLS es la sección "principal" del XML, la que realmente especifica cómo se ejecutará el protocolo. Internamente se implementa con [[ParsedProtocolMover]], por lo que allí se pueden encontrar más detalles de la sintaxis de las subetiquetas.

En general, la sección PROTOCOLS será una serie de etiquetas `<Add ../>`. Cada etiqueta especificará un mover, un filtro y/o una simple metric que se aplicará. El protocolo de RosettaScript recorre cada subetiqueta en orden, aplicando cada entrada.

Parámetros típicos de cada etiqueta Add:

-  `mover` o `mover_name` -- Especifica un [[mover|Movers-RosettaScripts]] (definido previamente en la sección MOVERS) que se aplicará en esta etapa del protocolo. El Pose (estructura) que se está simulando será modificado por ese mover y pasará a ser la estructura de entrada del siguiente mover/filtro/métrica/etc. de la lista.
-  `filter` o `filter_name` -- Especifica un [[filtro|Filters-RosettaScripts]] (definido previamente en la sección FILTERS) que se aplicará al Pose que se está simulando. Los filtros no modifican el Pose, pero producen un resultado de aprobado/suspendido. Si el Pose pasa, continúa con el paso siguiente. Si el Pose no pasa, la simulación actual se descartará y se reiniciará desde el principio de la sección PROTOCOLS. La mayoría de los filtros también calculan un valor asociado, y los filtros especificados en la sección PROTOCOLS informarán de ese valor en el archivo de puntuaciones (con el nombre del filtro). NOTA: Por defecto, la puntuación que se informa así se recalcula para la estructura que se escribe en la salida. Puedes cambiarlo para que sea la evaluación a mitad del protocolo, definiendo la opción `report_at_end="false"` en la etiqueta Add de ese filtro. (Aunque, para fines de informe, es preferible la opción metrics.)
-  `metrics` -- (Versiones posteriores al 15-oct-2020) Especifica una lista separada por comas de [[SimpleMetrics]] que se calcularán en esta etapa del protocolo y se añadirán al archivo de puntuaciones. Por defecto, las métricas se añadirán al archivo de puntuaciones con el nombre de la métrica, tal como se especifica en la opción `metrics`. Puedes cambiarlo con la opción `labels`, que toma una lista de nombres separados por comas. La etiqueta `-` es un caso especial que te da el mismo nombre que habrías obtenido normalmente con el mover RunSimpleMetrics. (El mover [[RunSimpleMetrics]] ofrece más opciones para ejecutar SimpleMetrics.)

##SCOREFUNCTIONS

La sección SCOREFXNS define las funciones de puntuación que se usarán en Filters y Movers. Se puede usar para definir cualquiera de las puntuaciones definidas en path/to/rosetta/main/database

```xml
<ScoreFunction name="scorefxn_name" weights="("empty" &string)" patch="(&string)">
  <Reweight scoretype="(&string)" weight="(&Real)"/>
  <Set (option name)="(value)"/>
</ScoreFunction>
```

donde el atributo ```name``` se usará en las secciones de Movers y Filters para usar la función de puntuación. Por tanto, el nombre debe ser único y no repetir los nombres de puntuación predefinidos. Una o más etiquetas Reweight son opcionales y permiten cambiar/añadir el peso de un tipo de puntuación dado.  Por ejemplo:

```xml
<ScoreFunction name="scorefxn1" weights="fldsgn_cen">
  <Reweight scoretype="env" weight="1.0"/>
</ScoreFunction>
```

La etiqueta Set es opcional y permite cambiar ciertas opciones de la función de puntuación, como se explica en la sección siguiente.

### Opciones de la función de puntuación

Se pueden especificar una o más opciones por etiqueta Set:

-   aa\_composition\_setup\_file=(&string &string &string...) - Uno o más archivos de configuración para el término de puntuación aa_composition que definen la composición de aminoácidos deseada.  (Para más información sobre este término de puntuación, consulta [[la documentación del término de puntuación aa_composition|AACompositionEnergy]]).
-   decompose\_bb\_hb\_into\_pair\_energies=(&bool) - Almacena los enlaces de hidrógeno de la cadena principal en el grafo de energía por residuo (esto duplica el número de cálculos, por lo que está desactivado por defecto)
-   exclude\_protein\_protein\_fa\_elec=(&bool) - Si es true, desactiva los cálculos de fa_elec entre átomos de proteína.  (Equivale a la opción de línea de comandos -ligand::old\_estat de ligand\_dock/enzyme\_design.)
-   exclude\_DNA\_DNA=(&bool)
-   fa\_elec\_min\_dist=(&Real), fa\_elec\_max\_dist=(&Real) - Distancias mínima y máxima para el potencial de Coulomb de fa_elec.
-   fa\_elec\_dielectric=(&Real) - Constante dieléctrica del término de puntuación fa_elec.
-   fa\_elec\_no\_dis\_dep\_die=(&bool) - Si es true, desactiva la dependencia de la distancia de la constante dieléctrica en el término de puntuación fa_elec.
-   pb\_bound\_tag=(&string)
-   pb\_unbound\_tag=(&string)
-   scale\_sc\_dens=(&Real) - Reescala la ponderación de la densidad electrónica para las cadenas laterales.
-   scale\_sc\_dens\_byres=(&string) - Reescala la ponderación de la densidad electrónica para las cadenas laterales por residuo.  Existe una sintaxis para esto, pero quien lo implementó no se molestó en documentarla, así que es bastante inútil.
-   smooth\_hb\_env\_dep=(&bool)
-   softrep\_etable=(&bool) - Usa una repulsión más suave para el potencial de Lennard-Jones.  (Átomos más esponjosos; útil, por ejemplo, para el empaquetado al principio de una trayectoria de diseño.)
-   use\_hb\_env\_dep\_DNA=(&bool)
-   use\_hb\_env\_dep=(&bool)

### Modificadores globales de la función de puntuación

La sección apply\_to\_pose puede configurar restricciones, en cuyo caso es necesario establecer los pesos en todas las funciones de puntuación que se definen. Los pesos por defecto de todas las funciones de puntuación se definen globalmente en la sección apply\_to\_pose, pero la definición de cada función de puntuación puede cambiar este peso. Por ejemplo, para establecer el valor de HotspotConstraint (backbone\_stub\_constraint) en 6.0

```xml
<ScoreFunction name="my_spiffy_score" weights="soft_rep_design" patch="dock" hs_hash="6.0"/>
```

Se reconocen los siguientes modificadores:

#### Modificaciones de HotspotConstraints

```
hs_hash="(the value set by apply_to_pose for hotspot_hash &float)"
```

### Funciones de puntuación simétricas

Antes, para puntuar correctamente los Poses simétricos, había que puntuarlos con una función de puntuación simétrica, como se muestra a continuación.  Desde noviembre de 2018, las funciones de puntuación pasaron a ser "agnósticas a la simetría", lo que significa que la misma función de puntuación se puede usar con Poses simétricos o asimétricos.  La etiqueta ```symmetric=1``` ya no tiene ningún efecto.

Antes, para declarar una función de puntuación como simétrica, bastaba con añadir la etiqueta:

```
symmetric="1"
```

Por ejemplo, score12 simétrica:

```xml
<ScoreFunction name="score12_symm" weights="score12_full" symmetric="1"/>
```

> **fallo de segmentación**
>
> Si te encuentras con un segfault, puede que necesites añadir una sección \<OUTPUT\> con una función de puntuación simétrica.

```
    ...
    </PROTOCOLS>
    <OUTPUT scorefxn="my_sym_scorefxn"/>
</ROSETTASCRIPTS>
```
### Términos de puntuación de guía centrados en el diseño

Existen ciertos términos de puntuación especializados que se pueden añadir a la función de energía por defecto para guiar el diseño.  Pueden ser útiles para imponer información previa (p. ej., muchas prolinas ayudan a estabilizar las conformaciones de loop; demasiadas alaninas en un núcleo dificultan el plegamiento), para añadir características deseadas para la función (p. ej., quiero que mi proteína tenga una carga neta negativa pero que mi interfaz de unión tenga una carga neta positiva) o para añadir características necesarias para la producción de proteínas (quiero evitar demasiadas metioninas, ya que las secuencias AUG adicionales dan lugar a sitios de inicio alternativos y dificultan la expresión) o para la caracterización experimental (p. ej., quiero exactamente un triptófano en el núcleo para experimentos de fluorescencia).  Para más información sobre estos términos de puntuación, consulta la página sobre [[términos de puntuación de guía centrados en el diseño|design-guidance-terms]].

### Un término de puntuación de utilidad para visualizar trayectorias

Al depurar un protocolo, o al preparar una animación para una presentación, es muy deseable tener un medio de visualizar una serie de pasos de una trayectoria.  Una forma de hacerlo es volcar una estructura a disco cada vez que se puntúa un Pose.  Para ello se añadió un término de puntuación especial llamado `dump_trajectory`.  Este término de puntuación no aporta nada a la puntuación, pero escribe una estructura en disco cada vez que se invoca.  (Esto, por supuesto, conlleva un coste importante de rendimiento y no debe hacerse de forma rutinaria).  Se puede usar cuando se puntúa una estructura, en cada paso de una trayectoria de minimización o en cada paso de una trayectoria de empaquetado.  Para usar este término de puntuación, basta con añadirlo a la función de puntuación usada en los pasos que se quieran visualizar.  Se pueden definir las siguientes opciones para alterar el nombre del archivo de salida, el formato de salida o la frecuencia con que se escriben las estructuras:

```xml
	<ScoreFunction name="scorefxn" weights="ref2015" >

		# Turns on the dump_trajectory scoreterm:
		<Reweight scoretype="dump_trajectory" weight="1" />

		# Sets the prefix for the file written to "my_prefix":
		<Set dump_trajectory_prefix="my_prefix" />

		# Sets the output format to gzipped PDB.  "False" by default (no compression):
		<Set dump_trajectory_gz="true" />

		# Sets the scorefunction to dump a structure on every SECOND scoring attempt, or every SECOND
		# step in a minimization or packing trajectory.  Default is 1 (dumps on EVERY scoring attempt,
		# or EVERY step in a minimization or packing trajectory):
		<Set dump_trajectory_stride="2" />

	</ScoreFunction>
```

## RESIDUE_SELECTORS

Los [[ResidueSelectors|ResidueSelectors]] los usan los movers, los filtros y las task operations para seleccionar residuos dinámicamente en tiempo de ejecución. Se usan para especificar conjuntos de residuos según múltiples propiedades distintas.

### ResidueSelectors disponibles

Consulta [[ResidueSelectors (RosettaScripts)|ResidueSelectors]]



## TASKOPERATIONS

Los movers usan las TaskOperations para indicar al "packer" qué residuos/rotámeros usar al reorganizar/mutar cadenas laterales. Cuando las usan ciertos Movers, las TaskOperations controlan lo que ocurre durante el empaquetado, normalmente mediante "máscaras" de restricción. Los movers también pueden usar las TaskOperations para especificar conjuntos de residuos sobre los que actuar en contextos que no son de packer.

### TaskOperations disponibles

Consulta [[TaskOperations (RosettaScripts)|TaskOperations-RosettaScripts]]


## RESIDUE_LEVEL_TASK_OPERATIONS

Las Residue-Level-TaskOperations las usan algunas TaskOperations específicas que controlan el PackerTask, como [[DesignRestrictions|DesignRestrictionsOperation]].

Ejemplo:

```
<ROSETTASCRIPTS>
	<RESIDUE_LEVEL_TASK_OPERATIONS>
	        <PreventRepackingRLT name="PreventRepacking" />
	        <RestrictToRepackingRLT name="RestrictToRepacking" />
	</RESIDUE_LEVEL_TASK_OPERATIONS>
</ROSETTASCRIPTS>
```

### Residue-Level-TaskOperations disponibles

Consulta [[Residue-Level-TaskOperations|Residue-Level-TaskOperations]]



## MOVE_MAP_FACTORIES

Esta sección dicta cómo construir un MoveMap para su uso en muchos protocolos, como MinMover y FastRelax.  La ventaja de un MoveMapFactory es la posibilidad de usar ResidueSelectors para construir un MoveMap al vuelo. 

### Sintaxis

Ejemplo de uso en `FastRelax`:

```
<RosettaScripts>

	<RESIDUE_SELECTORS>
		<Glycan name="glycans"/>
	</RESIDUE_SELECTORS>
	<MOVE_MAP_FACTORIES>
		<MoveMapFactory name="fr_mm_factory">
			<Backbone residue_selector="glycans" />
			<Chi residue_selector="glycans" />
		</MoveMapFactory>
	</MOVE_MAP_FACTORIES>
	<MOVERS>
		<FastRelax name="fast_relax"  movemap_factory="fr_mm_factory"/>
	</MOVERS>
	<PROTOCOLS>
		<Add mover_name=fast_relax>
	</PROTOCOLS>

</RosettaScripts>

```
Aquí usamos MoveMapFactory para ejecutar fast relax solo sobre todos los glicanos de un Pose.  
Por defecto, el MoveMap se construye con toda la cinemática activada (bb, chi, jump).  Por defecto, primero todo está desactivado en el MoveMap. Los atributos `bb="0"`, `chi="0"`, `jump="0"` pueden activar opcionalmente componentes concretos antes de construir el MoveMap.  

### Operaciones de MoveMapFactory

Las subetiquetas de la etiqueta MoveMapFactory se usan para activar grados de libertad concretos del Pose.  Requieren un `residue_selector`

```
	<MOVE_MAP_FACTORIES>
		<MoveMapFactory name="fr_mm_factory" enable="0">
			<Backbone residue_selector="my_first_residue_selector"/>
			<Chi residue_selector="my_second_residue_selecotor" />
			<Jump jump_selector="my_jump_selector"/>
		</MoveMapFactory>
	</MOVE_MAP_FACTORIES>

```

* `<Backbone/>`

 Son los residuos de la cadena principal del Pose. (Phi/Psi en las proteínas).  En los no canónicos, pueden ser torsiones distintas de las que cabría esperar, así que ten cuidado con esto.  En MoveMapFactory, las torsiones BB y CHI de los glicanos son un caso especial y se tratan según la definición IUPAC 

* `<Chi/>`

 Son las torsiones de cadena lateral del Pose.  En los glicanos, son los grupos OH. 

* `<Jumps/>`

 En el espacio diedro, son las orientaciones relativas entre conjuntos de residuos.  Los saltos los determina el `foldtree` y normalmente se dan entre cadenas.  

* `<Nu/>`

* `<Branches/>`

 Son torsiones específicas que salen de la cadena principal.  Normalmente no necesitas preocuparte por ellas, salvo que uses un no canónico complicado o una modificación.  Las torsiones de ramas de glicanos se tratan como torsiones BB de IUPAC dentro de la maquinaria de MoveMapFactory.

Consulta [[MoveMapFactories |MoveMapFactories-RosettaScripts]]

##SIMPLE_METRICS

Esta sección define las [[SimpleMetrics]] que quieras usar en tu protocolo.  Las SimpleMetrics se pueden usar para ejecutar análisis y escribir los datos en el archivo de puntuaciones resultante con el mover [[RunSimpleMetrics]], para filtrar datos con [[SimpleMetricFilter]], o para calcular y volcar datos en bases de datos relacionales con el reporter [[SimpleMetricFeatures]].    

Las Simple Metrics están disponibles en las versiones de Rosetta posteriores al 10 de abril de 2018 y son una solución a largo plazo para calcular datos y ejecutar filtros arbitrarios (los cálculos de los filtros del núcleo se irán sustituyendo poco a poco por SimpleMetrics, ya que son mucho más versátiles.)

Consulta [[SimpleMetrics]] y [[Uso eficaz de SimpleMetrics | SimpleMetrics#effective-use-of-simplemetrics]] para más información.

Este es un ejemplo sencillo que ejecuta unas cuantas métricas de análisis con la opción `-in:file:native` activada. 
```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
		<CDR name="L1" cdrs="L1"/>
	</RESIDUE_SELECTORS>
	<MOVE_MAP_FACTORIES>
		<MoveMapFactory name="movemap_L1" bb="0" chi="0">
			<Backbone residue_selector="L1" />
			<Chi residue_selector="L1" />
		</MoveMapFactory>
	</MOVE_MAP_FACTORIES>
	<SIMPLE_METRICS>
		<RMSDMetric name="rmsd" rmsd_type="rmsd_protein_bb_heavy" residue_selector="L1" use_native="1"/>
		<SasaMetric name="sasa" residue_selector="L1"/>
		<SecondaryStructureMetric name="ss" residue_selector="L1" />
		<TotalEnergyMetric name="total_energy" residue_selector="L1" use_native="0"/>
		<CompositeEnergyMetric name="composite_energy" residue_selector="L1" use_native="0"/>
	</SIMPLE_METRICS>
	<MOVERS>
		<MinMover name="min_mover" movemap_factory="movemap_L1" tolerance=".1" /> 
		<RunSimpleMetrics name="run_metrics1" metrics="sasa,ss, total_energy="m1_" />
		<RunSimpleMetrics name="run_metrics2" metrics="sasa,ss,rmsd,composite_energy" prefix="m2_" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover_name="run_metrics1"/>
		<Add mover_name="min_mover" />
		<Add mover_name="run_metrics2" />
	</PROTOCOLS>
</ROSETTASCRIPTS>
```


MOVERS
------

Cada definición de mover tiene la siguiente estructura

```xml
<MOVERNAME mover_name="&string" name="&string" />
```

donde mover\_name pertenece a un conjunto predefinido de posibles movers que el analizador reconoce y que se enumeran más abajo, name es un identificador único para esta definición de mover y luego viene cualquier número de parámetros que el mover necesite para definirse.

### Movers disponibles

Consulta [[Movers (RosettaScripts)|Movers-RosettaScripts]]

FILTERS
-------

Cada definición de filtro tiene el siguiente formato:

```xml
<FILTERNAME filter_name="&string" confidence="1"/>
```

donde filter\_name pertenece a un conjunto predefinido de posibles filtros que el analizador reconoce y que se enumeran más abajo, name es un identificador único para esta definición de mover y luego viene cualquier número de parámetros que el filtro necesite para definirse.

Si confidence es 1.0, el filtro se evalúa como en la lógica de predicados (V/F). Si el valor es menor que 0.999, el filtro se evalúa de forma difusa, de modo que devolverá True en una fracción (1.0 - confidence) de las veces que se consulte. Esto debería ser útil en casos en los que los datos experimentales son ambiguos o inciertos.

### Filtros disponibles

Consulta [[Filters (RosettaScripts)|Filters-RosettaScripts]]

LOOP\_DEFINITIONS
-----------------

Los movers que realizan modelado de loops usan una definición de loops. Una definición de loops consiste en un conjunto de loops, donde cada loop describe el residuo de inicio, el residuo final y, opcionalmente, especifica un cutpoint del FoldTree, una tasa de omisión y si el loop debe extenderse.

### Definidores de loops disponibles

#### Loops

Especifica explícitamente un conjunto de loops:

<Loops name="(&string)">
<loop start="(&Size)" stop="(&Size)" cut="0" skip_rate="0.0" extended="0"/>
....
</Loops>

#### LoopsFile

Carga una especificación de loops desde un archivo de loops

<LoopsFile name="(&string)" filename="(&string)">

#### LoopsDatabase

Carga un conjunto de loops desde una base de datos con una tabla que tenga el siguiente esquema, definiendo un único loop por fila

CREATE TABLE loops (
tag TEXT,
start INTEGER,
stop INTEGER,
cut INTEGER,
skip_rate REAL,
extended BOOLEAN);

El constructor LoopsDatabase devuelve todos los loops asociados a la etiqueta de entrada del distribuidor de trabajos

Nota: puedes especificar una tabla distinta con el campo 'database\_table'

Nota: si quieres consultar la base de datos de otra manera para obtener loops, puedes consultar la tabla previamente y almacenarla, o extender, heredar o crear una clase LoopsDefiner distinta.

Nota: Si no se especifica la información de configuración de la base de datos, se usan las opciones correspondientes del sistema de opciones.

```xml
<LoopsDatabase name="(&string)" database_mode="sqlite3" database_name="(&string)" database_separate_db_per_mpi_process="0" database_read_only="0" database_table="loops"/>
<LoopsDatabase name="(&string)" database_mode="['mysql', 'postgres']" database_name="(&string)" database_host="(-mysql:host &string)" database_user="(-mysql:user &string)" database_password="(-mysql:password &string)" database_port="(-mysql:port &string)" database_table="loops"/> 
```

##Ligandos

Estas secciones de RosettaScript sirven específicamente para trabajar con ligandos y puntuarlos en protocolos especializados.

###LIGAND\_AREAS


```xml
<LIGAND_AREAS>
<LigandArea name="[name_of_this_ligand_area]" chain="[string]" cutoff="[float]" add_nbr_radius="[true|false]" all_atom_mode="[true|false]" minimize_ligand="[float]" Calpha_restraints="[float]" high_res_angstroms="[float]" high_res_degrees="[float]" tether_ligand="[float]" />
</LIGAND_AREAS>
```

LIGAND\_AREAS describe parámetros específicos de cada ligando, útiles para estudios de docking de múltiples ligandos. "cutoff" es la distancia en angstroms a la que puede estar el átomo C-beta de un aminoácido del ligando para que ese residuo siga formando parte de la interfaz. "all\_atom\_mode" puede ser true o false. Si all atom mode es true, entonces, si el átomo C-beta de un residuo de proteína está dentro de "cutoff" de *cualquier* átomo del ligando, el residuo de proteína pasa a formar parte de la interfaz. Si es false, el átomo C-beta del residuo de proteína debe estar dentro de "cutoff" del átomo vecino del ligando. Si "add\_nbr\_radius" es true, el cutoff aumenta con el tamaño del radio de vecindad del residuo de proteína. El radio de vecindad es una estimación del rango de movimiento del residuo cuando se hace repacking, y añadirlo puede compensar el movimiento de las cadenas laterales de la proteína durante el repacking.

La minimización del ligando se puede activar especificando un valor de minimize\_ligand mayor que 0. Este valor representa el tamaño de una desviación estándar de la rotación de los ángulos de torsión del ligando (en grados). Si se pone Calpha\_restraints mayor que 0, se activa la flexibilidad de la cadena principal. Este valor representa el tamaño de una desviación estándar del movimiento de Calpha, en angstroms.

Durante el docking de alta resolución, pequeñas cantidades de traslación y rotación del ligando se combinan con ciclos de pruebas de rotámeros o de repacking. Estos valores se pueden controlar con los valores 'high\_res\_angstrom' y 'high\_res\_degrees', respectivamente. Un valor tether\_ligand (en angstroms) restringirá el ligando de modo que varios ciclos de pequeñas traslaciones no se acumulen en una traslación grande.

###INTERFACE\_BUILDERS

```xml
<INTERFACE_BUILDERS>
<InterfaceBuilder name="[name_of_this_interface_builder]" ligand_areas="(comma separated list of predefined ligand_areas)" extension_window="(int)"/>
</INTERFACE_BUILDERS>
```

Un interface builder describe cómo elegir los residuos que formarán parte de una interfaz proteína-ligando. Estos residuos se eligen para repacking, pruebas de rotámeros y minimización de la cadena principal durante el docking de ligandos. El parámetro XML inicial es el nombre del interface\_builder (para referencia posterior). "ligand\_areas" es una lista separada por comas de cadenas que coinciden con los LIGAND\_AREAS descritos anteriormente. Por último, 'extension\_window' rodea los residuos de la interfaz con residuos etiquetados como 'near interface'. Esto es importante para la minimización de la cadena principal, porque la cadena principal de un residuo no puede moverse realmente a menos que forme parte de un tramo de residuos flexibles.

###MOVEMAP\_BUILDERS


```xml
<MOVEMAP_BUILDERS>
<MoveMapBuilder name="[name_of_this_movemap_builder]" sc_interface="(string)" bb_interface="(string)" minimize_water="[true|false]"/>
</MOVEMAP_BUILDERS>
```

Un movemap builder construye un MoveMap. Un MoveMap es una tabla de 2xN valores verdadero/falso, donde N es el número de residuos de tu complejo proteína/ligando. Las dos columnas son para los movimientos de la cadena principal y de la cadena lateral. MovemapBuilder combina las interfaces de cadena principal y de cadena lateral construidas previamente (véase la sección anterior). Omite bb\_interface si no quieres minimizar la cadena principal. La opción minimize\_water es una opción global. Si estás haciendo docking de moléculas de agua como ligandos independientes (docking de múltiples ligandos), estas deben describirse mediante LIGAND\_AREAS e INTERFACE\_BUILDERS.

###SCORINGGRIDS

```xml
<SCORINGGRIDS ligand_chain="(string)" width="(real)" name="(string, optional)" resolution="(real, optional)" normalize_mode="(string, optional)" >
<[scoring grid type name] grid_name="(string)" weight="(real)"/>
</SCORINGGRIDS>
```

El bloque SCORINGGRIDS se usa para definir rejillas de puntuación de ligandos (actualmente solo las usa el mover Transform). Las rejillas se crearán inicialmente centradas en la cadena de ligando especificada y serán cúbicas, con el ancho especificado en angstroms. Rosetta decide automáticamente si hay que recalcular una rejilla. Las rejillas se recalculan si algún átomo que no es del ligando cambia de posición. El peso especificado para cada rejilla se multiplica por la puntuación del ligando para esa rejilla. Actualmente se pueden especificar los siguientes grid\_types:

-   ClassicGrid: Las rejillas de puntuación usadas originalmente en la implementación de Davis, 2009 de RosettaLigand.
-   AtrGrid: Una rejilla de potencial atractivo.
-   ChargeGrid: Una aproximación del campo eléctrico.
-   HbdGrid: Una rejilla derivada de un potencial basado en conocimiento que aproxima las interacciones de donador de enlace de hidrógeno de la proteína.
-   HbaGrid: Una rejilla derivada de un potencial basado en conocimiento que aproxima las interacciones de aceptor de enlace de hidrógeno de la proteína.
-   LigandPropertyScore: ? (Actualmente sin documentar).
-   RepGrid: Una rejilla de potencial repulsivo.
-   ShapeGrid: Una rejilla derivada de un potencial basado en conocimiento que aproxima la complementariedad de forma.
-   SiteGrid: ? (Actualmente sin documentar).
-   SolvationGrid: Una rejilla de potencial de solvatación.

El parámetro "name" de nivel superior se usa para especificar el nombre del GridSet, que se puede usar con el mover Transform para seleccionar qué conjunto de rejillas se está usando. (Si no se da ningún nombre, el conjunto de rejillas se cargará con el nombre "default".) 

OUTPUT
------

La etiqueta OUTPUT de nivel superior permite establecer ciertas opciones de salida.

La etiqueta OUTPUT debe ser la última etiqueta antes de la etiqueta de cierre `</ROSETTASCRIPTS>`.

### scorefxn

```xml
<OUTPUT scorefxn="(name &string)"/>
```
La función de puntuación especificada por la etiqueta OUTPUT se usará para puntuar el Pose antes de la salida. Es la función de puntuación que estará representada en las puntuaciones informadas en el archivo de puntuaciones y en el PDB de salida de la ejecución.  Puedes usar el nombre "commandline", que indicará a RosettaScripts que use la función de puntuación de la línea de comandos que se haya establecido o la función de puntuación DEFAULT de Rosetta.

Ten en cuenta que, desde abril de 2019, la etiqueta `OUTPUT` es necesaria para que RosettaScripts vuelva a puntuar tu Pose. Si falta la etiqueta OUTPUT, se escribirá en la salida la información de puntuación que haya presente de tu protocolo.  Esto se debe a que muchos movers hacen su propia puntuación y pueden añadir términos de puntuación que resulta útil tener en el Pose de salida. Esto significa que, si usas MinMover, PackMinMover o cualquier otro mover que use una función de puntuación, tu información de puntuación se quedará intacta.  Esto alinea RosettaScripts con el comportamiento del resto de Rosetta.   


APPLY\_TO\_POSE (obsoleto)
---------------

Esta es una sección que se usaba para cambiar la estructura de entrada. Esto se gestiona mucho mejor aplicando el mover correspondiente dentro de la sección PROTOCOLS. Consulta la página [[Updating RosettaScripts]] para más información sobre cómo ajustar los XML para eliminar esta sección.

## Solución de problemas de RosettaScripts

RosettaScripts sigue en desarrollo continuo. Por ello, de vez en cuando hay cambios que hacen que los scripts antiguos dejen de funcionar. A veces será un pequeño cambio en las opciones obligatorias de un objeto concreto de RosettaScripts. Esto debería (con suerte) estar documentado en las páginas de documentación de cada mover. Consulta [[Updating RosettaScripts]] para ver información sobre cambios de mayor alcance que afectan a varios objetos de RosettaScripts. 

### Consejos para solucionar problemas.

Lo primero que hay que hacer al obtener un error con RosettaScripts es consultar la documentación de cada uno de los objetos de RosettaScripts que estás usando. Presta especial atención a las opciones y ajustes que el objeto indica como obligatorios. A menudo no basta con cambiar un parámetro dentro del XML para resolver el error. También puede que tengas que añadir varios parámetros de línea de comandos a tus ejecuciones de RosettaScript para obtener los resultados que esperas.

Otra buena herramienta para solucionar problemas es simplificar tu XML. Prueba a crear una versión reducida de tu XML con solo un puñado de Movers. Pruébala y asegúrate de que se comporta como esperas. Vuelve a activar poco a poco tus movers y otros objetos de RosettaScripts, unos pocos cada vez, comprobando en cada etapa que el comportamiento es el esperado. Prueba también a simplificar los ajustes de tus movers, usando los valores por defecto tanto como sea posible. Comprueba que cada cambio adicional respecto a los valores por defecto provoca el cambio de comportamiento que esperarías. Este enfoque progresivo suele ayudar a acotar dónde está la causa exacta de tus problemas.

##Véase también

* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[I want to do x]]: Guía para realizar perturbaciones estructurales concretas con RosettaScripts
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Commands collection]]: Una lista de líneas de comandos de ejemplo para ejecutar los ejecutables de Rosetta
* [[Rosetta Servers]]: Servidores web para aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.

<!-- SEO
scriptvars
-->

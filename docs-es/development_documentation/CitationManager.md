# Obtener reconocimiento por tu trabajo: el CitationManager

Esta página fue creada el 7 de marzo de 2020 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org).

Volver a [[Documentación de desarrollo|Development-Documentation]].
[[_TOC_]]

## 1. ¿Por qué es importante que busque reconocimiento por mis contribuciones a Rosetta?

Desde pequeños aprendemos que la humildad es una virtud.  Sin embargo, en la ciencia es importante asegurarse de recibir reconocimiento por el propio trabajo.  Hay varias razones por las que queremos asegurarnos de que se reconozca a los desarrolladores de las funcionalidades o los módulos de Rosetta, entre ellas:

* El reconocimiento es la moneda de la ciencia.  A medida que uno avanza en su carrera científica, su reputación profesional (determinada principalmente por sus publicaciones, pero también por otros medios con los que da a conocer sus contribuciones) determina los recursos a los que tendrá acceso.  Las decisiones de contratación, las asignaciones de recursos de supercomputación, las colaboraciones, las subvenciones operativas, _etc._ están muy influidas por la reputación profesional.  Como comunidad, nos interesa _colectivamente_ que quienes contribuyen a Rosetta puedan obtener los recursos que necesitan para continuar su investigación y, por tanto, nos interesa colectivamente asegurarnos de que reciban reconocimiento por su trabajo.
* El reconocimiento influye en la satisfacción laboral.  Por muy altruista que sea una persona, es poco probable que quiera seguir contribuyendo si da a la comunidad y no recibe nada a cambio.  Como comunidad, nos conviene colectivamente retener el talento.
* Rosetta es más que la suma de sus partes y solo puede seguir prosperando si los desarrolladores deciden seguir contribuyendo a él.  No queremos que los desarrolladores se vuelvan reservados o egocéntricos y se concentren en desarrollar código para sus propios proyectos sin ponerlo a disposición de los demás.  Por eso nos interesa ofrecer incentivos para compartir código.
* Si se dan a conocer las contribuciones de los desarrolladores, resulta más fácil saber con quién hablar sobre un módulo o una funcionalidad concretos si se quiere construir sobre ellos.  El reconocimiento garantiza que no se pierda el conocimiento, que no se duplique el esfuerzo y que no se desperdicie el tiempo.
* El reconocimiento se da, por lo general, mediante la coautoría de las publicaciones.   Si quienes usan por primera vez un nuevo módulo, funcionalidad o método incluyen al desarrollador original como coautor de su publicación, ese desarrollador tiene la oportunidad de documentar el módulo, la funcionalidad o el método en la publicación o en su material suplementario.  Es decir, el acto de dar reconocimiento tiene el beneficio colateral de vincular los éxitos de Rosetta con las descripciones de los métodos, lo que facilita la reproducibilidad y las extensiones y combate la tendencia a tratar a Rosetta como una caja negra.

Por todas estas razones, es _tanto_ del interés de cada persona _como_ del interés de la comunidad asegurarse de que todos sepan quién produjo cada módulo de Rosetta y qué módulos de Rosetta están publicados (en cuyo caso se deben citar los artículos originales) o sin publicar (en cuyo caso el desarrollador debe incluirse en el primer artículo de la comunidad de Rosetta que dependa del módulo).

## 2. Cómo documentamos las contribuciones: el CitationManager de Rosetta

El CitationManager de Rosetta es un singleton de Rosetta: un objeto global del que existe una única instancia en memoria durante una sesión de Rosetta.  Su trabajo es registrar qué módulos de Rosetta se usaron durante una sesión de Rosetta y emitir al final de la sesión un informe que enumera los módulos publicados que se deben citar (y los artículos pertinentes), además de los módulos sin publicar cuyos autores deben incluirse como coautores en la primera publicación que use esos módulos (junto con los nombres y la información de contacto de los autores).  Cualquier módulo de Rosetta puede registrarse en el CitationManager y proporcionar información sobre sus citas (si está publicado) o sus autores (si no está publicado).  En el caso de los Movers, Filters, TaskOperations, ResidueSelectors, EnergyMethods (términos de puntuación), SimpleMetrics o PackerPalettes, existen sobrescrituras de funciones especiales para que a la aplicación [[RosettaScripts]] le resulte fácil registrar todos los módulos usados en el script de un usuario.  Al final de la ejecución de Rosetta se escribe un mensaje similar al siguiente:

```
basic.citation_manager.CitationManager: 

The following Rosetta modules were used during this run of Rosetta, and should be cited:

rosetta_scripts Application's citation(s):

Fleishman SJ, Leaver-Fay A, Corn JE, Strauch E-M, Khare SD, Koga N, Ashworth J, Murphy P, Richter F, Lemmon G, Meiler J, and Baker D.  (2011).  RosettaScripts: A Scripting Language Interface to the Rosetta Macromolecular Modeling Suite.  PLoS ONE 6(6):e20161.  doi: 10.1371/journal.pone.0020161.


The following UNPUBLISHED Rosetta modules were used during this run of Rosetta.  Their authors should be included in the author list when this work is published:

GlycanTreeModeler Mover's author(s):

Jared Adolf-Bryfogle, The Scripps Research Institute, La Jolla, CA <jadolfbr@gmail.com>

```

### 2.1 Añadir información de autoría para un módulo de Rosetta sin publicar

Si se añade información de autoría a un módulo de Rosetta, Rosetta podrá informar del nombre del desarrollador y del hecho de que se usó el módulo al final de una sesión de Rosetta en la que se invocó el módulo.  Para los Movers, Filters, TaskOperations, ResidueSelectors, EnergyMethods (términos de puntuación), SimpleMetrics o PackerPalettes (objetos que se pueden usar en RosettaScripts), solo hay que añadir una función al módulo, que la maquinaria de RosettaScripts llamará automáticamente.  Para otros módulos de Rosetta, deben añadirse los mismos tipos de funciones de la misma manera, pero tendrás que llamar a esa función para registrarlo.

#### 2.1.1 Resumen breve de los pasos para añadir información de autoría a módulos que se pueden usar en RosettaScripts

Para añadir información de autoría a un módulo de Rosetta sin publicar, hay que:

1.  Implementar una sobrescritura de función para `provide_citation_info()`.  Esta debe actualizar el objeto CitationCollectionList con un objeto `UnpublishedModuleInfo` que contenga un vector con el nombre del módulo, el tipo de módulo y uno o más autores (nombre, afiliación, dirección de correo electrónico).

Así de sencillo.

#### 2.1.2 Descripción detallada de los pasos para añadir información de autoría a módulos que se pueden usar en RosettaScripts

1.  Sobrescribe la función `provide_citation_info()`.  Primero, edita el archivo ".hh" de tu módulo para añadir lo siguiente como función miembro pública:

```c++
/// @brief Provide a list of authors for this module.
void provide_citation_info(basic::citation_manager::CitationCollectionList & ) const override;
```

Ahora edita el archivo ".cc".  Supongamos que se trata de un mover llamado "MyMover".  Añade las siguientes líneas:

```c++
/// @brief Provide a list of authors for this module.
void
MyMover::provide_citation_info(basic::citation_manager::CitationCollectionList & citations ) const {
	using namespace basic::citation_manager;
	
	citations.add(
		utility::pointer::make_shared< UnpublishedModuleInfo >(
		get_name() /*Gets the name of this Mover.*/,
		CitedModuleType::Mover /*Should match the type of module being cited.*/,
		"Your Name" /*Fill this in.*/,
		"Your Affiliation" /*Fill this in.*/,
		"Your e-mail address" /*Fill this in.*/
		)
	);
}
```

En lo anterior, cambia "MyMover" por el nombre de tu módulo y sustituye `CitedModuleType::Mover` por el tipo apropiado (_p. ej._ `CitedModuleType::ResidueSelector`, `CitedModuleType::EnergyMethod`, _etc._) si no es un mover.

Lo más probable es que, para que Rosetta compile, también tengas que añadir lo siguiente a los encabezados al principio del archivo ".cc":

```c++
#include <basic/citation_manager/UnpublishedModuleInfo.hh>
```

#### 2.1.3 Añadir varios autores

El objeto `UnpublishedAuthorInfo` puede almacenar una lista de autores arbitrariamente larga.  Si más de un desarrollador ha contribuido a un módulo, deben figurar todos los desarrolladores que hicieron contribuciones significativas.  Si se añaden notas sobre la contribución de cada autor, los usuarios pueden decidir qué autores deben incluirse como coautores cuando llegue el momento de publicar.  En este caso, la sintaxis no es tan concisa, pero aquí tienes un ejemplo:

```c++
/// @brief Provide a list of authors for this module.
void
MyMover::provide_citation_info(basic::citation_manager::CitationCollectionList & citations ) const {
	using namespace basic::citation_manager;
	
	// Create the UnpublishedModuleInfo object and set the module name and type.  (The type
	// should match the actual module type):
	UnpublishedModuleInfoOP my_author_info(
		utility::pointer::make_shared< UnpublishedModuleInfo >( get_name(), CitedModuleType::Mover )
	);
	
	// Add first author:
	my_author_info->add_author(
		"Susan Calvin" /*Fill in name here.*/,
		"United States Robots and Mechanical Men, Inc." /*Fill in institution here.*/,
		"scalvin@psych.usrobots.com" /*Fill in e-mail address here.*/,
		"Initial logic for this mover."  /*This additional notes field is optional.*/
	);
	
	// Add a second author:
	my_author_info->add_author(
		"Hari Seldon" /*Fill in name here.*/,
		"Streeling University" /*Fill in institution here.*/,
		"hseldon@pscyhohistory.streeling.edu" /*Fill in e-mail address here.*/,
		"Refactored to future-proof the implementation."  /*This additional notes field is optional.*/
	);

	// Add the authorship information to the CitationCollectionList
	citations.add(my_author_info)
}
```

Como antes, sustituye "MyMover" por el nombre de tu clase en lo anterior y, si no es un mover, actualiza la parte `CitedModuleType::Mover` para reflejar el tipo.

### 2.2 Añadir información de citas para un módulo de Rosetta publicado

Si (o cuando) se publica un módulo, la información de autores sin publicar descrita arriba debe eliminarse y sustituirse por información sobre cómo citar el módulo cuando se use.  Las citas se almacenan de forma centralizada en la base de datos de Rosetta y el `CitationManager` las carga de forma diferida (lazy) y segura para hilos.

#### 2.2.1 Resumen breve de los pasos para añadir citas a módulos que se pueden usar en RosettaScripts

Para añadir una cita a un módulo que se puede usar en RosettaScripts:

1.  Implementa una sobrescritura de función para `provide_citation_info()` que consulte al `CitationManager` la cita, por doi, y actualice el objeto `CitationCollectionList`.
	
2.  Si la cita todavía no está en la base de datos de Rosetta, añádela a `database/citations/rosetta_citations.txt`.
	
#### 2.2.2. Descripción detallada de los pasos para añadir información de citas a módulos que se pueden usar en RosettaScripts

1.  Implementa una sobrescritura de función para `provide_citation_info() const`.  Primero, añade un prototipo de una sobrescritura de función miembro pública a la definición de la clase en el archivo ".hh":

```c++
/// @brief Provide the citation for this mover.
void provide_citation_info( basic::citation_manager::CitationCollectionList & ) const override;
```

A continuación, edita el archivo ".cc" e implementa la función:

```c++
/// @brief Returns the citation for this mover.
void
MyMover::provide_citation_info(basic::citation_manager::CitationCollectionList & citations) const {
	using namespace basic::citation_manager;
	
	// Create a citation collection for this module:
        CitationCollectionOP collection(
		utility::pointer::make_shared< basic::citation_manager::CitationCollection >(
			get_name() /*Gets the name of the module.*/,
			CitedModuleType::Mover /*Should be updated for filters, task operations, residue selectors, etc.*/
		)
	);
	
	// Add the relevant citation from the CitationManager to the collection
	collection->add_citation( CitationManager::get_instance()->get_citation_by_doi("10.1073/pnas.1115898108"  /*Update this with the DOI of your citation.*/ ) );
		/*The line above queries the CitationManager for the citation,
		and will throw an error if the citation is not in the database.*/
	
	// Add the collection to the CitationCollectionList
	citations.add( collection );
}
```

En lo anterior, "MyMover" debe sustituirse por el nombre de tu clase.  Si tu clase no es un mover, sustituye `CitedModuleType::Mover` por el tipo apropiado (_p. ej._ `CitedModuleType::TaskOperation`, `CitedModuleType::EnergyMethod`, _etc._).  Asegúrate de indicar en la línea `get_citation_by_doi` el DOI de la cita que quieres.

Por último, añade los encabezados necesarios al principio del archivo ".cc":

```c++
#include <basic/citation_manager/CitationManager.hh>
#include <basic/citation_manager/CitationCollection.hh>
```

3.  Si tu cita todavía no está en `database/citations/rosetta_citations.txt`, añádela allí.  El formato del archivo se describe en la sección siguiente.

#### 2.2.3 Añadir citas a la base de datos de Rosetta

Los artículos de Rosetta figuran en `database/citations/rosetta_citations.txt`.  Mantén las citas ordenadas por año e introduce cada cita una y solo una vez.  Los campos se separan con líneas `[BEGIN_XXX]` y `[END_XXX]`.  Los campos pertinentes son:

* Autor principal o coautores principales (uno por línea, con el formato: `"Given name(s)" "Surname" "Initials"`, por ejemplo, `"Barack Hussein" "Obama" "BH"`).
* Coautores (con el mismo formato).
* Autor(es) sénior (con el mismo formato).
* Año (un entero).
* Título (sin comillas, sin punto al final).
* Revista (abreviada, sin puntos).
* Volumen, número y páginas (p. ej., "43(6):1325-32").
* DOI

Aquí se muestra un ejemplo:

```
[BEGIN_CITATION]
    [BEGIN_PRIMARY_AUTHORS]
        "Brandon" "Frenz" "B"
    [END_PRIMARY_AUTHORS]
    [BEGIN_COAUTHORS]
        "Sebastian" "Rämisch" "S"
        "Andrew J" "Borst" "AJ"
        "Alexandra C" "Walls" "AC"
        "Jared" "Adolf-Bryfogle" "J"
        "William R" "Schief" "WR"
        "David" "Veesler" "D"
    [END_COAUTHORS]
    [BEGIN_SENIOR_AUTHORS]
        "Frank" "DiMaio" "F"
    [END_SENIOR_AUTHORS]
    [BEGIN_YEAR]
        2018
    [END_YEAR]
    [BEGIN_TITLE]
        Automatically fixing errors in glycoprotein structures with Rosetta
    [END_TITLE]
    [BEGIN_JOURNAL]
        Structure
    [END_JOURNAL]
    [BEGIN_VOLUME_ISSUE_PAGES]
        27(1):134-139.e3
    [END_VOLUME_ISSUE_PAGES]
    [BEGIN_DOI]
        10.1016/j.str.2018.09.006
    [END_DOI]
[END_CITATION]
```

También se pueden añadir manuscritos en revisión.  En este caso, los campos de revista y de volumen/número/páginas deben ser "XXX" (que es una señal especial para que el CitationManager lo trate como un manuscrito sin publicar en revisión).  El DOI puede ser cualquier cosa en este caso, siempre que sea una cadena única que permita identificar el manuscrito de forma única en el código.  (La revista, el volumen/número/páginas y el DOI no se imprimirán en los mensajes dirigidos al usuario para los manuscritos en revisión).  Un ejemplo es el siguiente:

```
[BEGIN_CITATION]
    [BEGIN_PRIMARY_AUTHORS]
        "Vikram Khipple" "Mulligan" "VK"
    [END_PRIMARY_AUTHORS]
    [BEGIN_COAUTHORS]
        "Christine S" "Kang" "CS"
        "Michael R" "Sawaya" "MR"
        "Stephen" "Rettie" "S"
        "Xinting" "Li" "X"
        "Inna" "Antselovich" "I"
        "Timothy" "Craven" "T"
        "Andrew" "Watkins" "A"
        "Jason W" "Labonte" "JW"
        "Frank" "DiMaio" "F"
        "Todd O" "Yeates" "TO"
    [END_COAUTHORS]
    [BEGIN_SENIOR_AUTHORS]
        "David" "Baker" "D"
    [END_SENIOR_AUTHORS]
    [BEGIN_YEAR]
        2020
    [END_YEAR]
    [BEGIN_TITLE]
        Computational design of mixed chirality peptide macrocycles with internal symmetry
    [END_TITLE]
    [BEGIN_JOURNAL]
        XXX
    [END_JOURNAL]
    [BEGIN_VOLUME_ISSUE_PAGES]
        XXX
    [END_VOLUME_ISSUE_PAGES]
    [BEGIN_DOI]
        Mulligan_2020_underreview
    [END_DOI]
[END_CITATION]
```

Para añadir una cita al archivo `rosetta_citations.txt`, el método preferido es usar el script `add_citation_by_pubmed_id.py` ubicado en `Rosetta/main/source/code_templates`.  Después de hacerlo, por lo general es necesario editar el archivo `rosetta_citations.txt` y añadir los nombres de pila de los autores, y confirmar (commit) los cambios en tu rama y subirlos (push), pero esto ahorra trabajo y evita errores.  El archivo `rosetta_citations.txt` también se puede editar a mano, pero no es lo preferido.

Para usar el script `add_citation_by_pubmed_id.py`:

```
add_citation_by_pubmed_id.py [-h] [--database DATABASE] [--pmid PMID]

optional arguments:
  -h, --help           show this help message and exit
  --database DATABASE  Path to the Rosetta/main/database/ directory. Not required if this script is run from the Rosetta/main/source/ directory.
  --pmid PMID          The PubMed ID of the citation to add to the dataase.
```

### 2.3 Añadir información de citas a un módulo que no es de RosettaScripts

Si escribes un módulo que no es una de las clases de RosettaScripts que se registran automáticamente cuando se implementa `provide_citation_info`, hace falta un paso adicional para registrarlo en el CitationManager.

#### 2.3.1 Descripción detallada de los pasos para añadir información de autoría a un módulo genérico que no es de RosettaScripts

1. Implementa una función `provide_citation_info` en los archivos ".hh" y ".cc" del módulo, como se describió arriba.  Ten en cuenta que, en general, en estos casos `provide_citation_info` no será un "override" y hay que quitar la palabra clave `override` del archivo ".hh".

Averigua si estás describiendo un módulo sin publicar o publicado y sigue las instrucciones de las secciones 2.1.2 o 2.2.2.  En el caso de un módulo publicado, no olvides añadirlo también a la base de datos de Rosetta (sección 2.2.3).

2. Determina en qué parte del código quieres que el módulo se registre a sí mismo.  Podría ser, por ejemplo, en el constructor de la clase, en cuyo caso se registrará cada vez que se instancie la clase.  También podría ser en otra función, o incluso en otra clase que sea responsable de crear y/o configurar el módulo.

Hay algunas cosas que conviene tener en cuenta al decidir si se llama a `provide_citation_info` en el constructor:
 * Estás seguro de que quieres que el módulo se cite absolutamente cada vez que se instancie.
 * Te parece bien una pequeña sobrecarga cada vez que se instancie el módulo.
 * No estás introduciendo citas redundantes al añadir una cita a cada uno de una serie de módulos que instancia una única clase accesible para el usuario (como un Mover, un Filter, etc.).  Esto haría que la misma cita figurase para cada uno de esos módulos en la salida final de un trabajo de Rosetta.

3. Añade las siguientes líneas de código en la ubicación pertinente identificada en (2):

Si estás dentro de la misma clase que el módulo que se registra:
```c++
// Create a CitationCollectionList object to store the citations
basic::citation_manager::CitationCollectionList citations;
// Call the provide_citation_info function, passing in the CitationCollectionList
provide_citation_info(citations);
// Add the new citations to an instance of the CitationManager
basic::citation_manager::CitationManager::get_instance()->add_citations(citations);
```

Si estás en una clase distinta que tiene un puntero a un objeto del tipo que se registra en una variable `my_module_`:
```c++
// Create a CitationCollectionList object to store the citations
basic::citation_manager::CitationCollectionList citations;
// Call the provide_citation_info function, passing in the CitationCollectionList
my_module_->provide_citation_info(citations);
// Add the new citations to an instance of the CitationManager
basic::citation_manager::CitationManager::get_instance()->add_citations(citations);
```

En cualquiera de los dos casos, probablemente haya que añadir los siguientes encabezados para que Rosetta compile:
```c++
#include <basic/citation_manager/CitationCollection.hh>
#include <basic/citation_manager/CitationManager.hh>
```

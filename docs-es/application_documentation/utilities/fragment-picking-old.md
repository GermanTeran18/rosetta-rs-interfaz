#Guía del usuario de core::fragment::picking\_old.

Metadatos
========

Este documento se editó por última vez el 31 de marzo de 2009 (20090331). El autor original fue Yih-En Andrew Ban.

Introducción
============

`       core::fragment::picking      ` se concibió tanto como un conjunto de rutinas para elegir fragmentos de la biblioteca de fragmentos Vall dentro de Rosetta, como un marco para escribir nuevos fragment pickers. Ten en cuenta que el diseño está en cierta medida en evolución y es probable que la API cambie a medida que la comunidad de Rosetta siga desarrollando el código.

Este documento está organizado, a grandes rasgos, en orden inverso, de lo concreto a lo abstracto: primero se describen las tareas habituales del usuario con el picker de Vall dentro de `       core::fragment::picking::vall      ` y, al final, los conceptos abstractos de `       core::fragment::picking::concepts      ` que se usan para implementar un picker. Ten en cuenta que, salvo que se indique lo contrario, la mayor parte del código de este documento sirve para mostrar las interfaces y las llamadas a métodos disponibles, y puede carecer de parte de la estructura adicional necesaria para compilar y realizar realmente una función válida. Esto significa que, con toda probabilidad, copiar y pegar directamente los fragmentos de código no funcionará.

Elegir fragmentos de la Vall.
================================

Un objeto VallLibrary guarda los datos de la Vall, y se accede a la instancia por defecto mediante una llamada al método `       get_Vall      ` de FragmentLibraryManager. Este método lee el archivo Vall que está en el directorio de la base de datos de Rosetta, que se puede especificar con la opción de línea de comandos "-in:file:vall". A fecha de 23 de marzo de 2009 (20090323), el archivo por defecto es "filtered.vall.dat.2006-05-05".

El conjunto de clases que se usan realmente para elegir los fragmentos gira en torno a VallLibrarian. Esta clase recorre los datos de VallLibrary, usa una colección de VallFragmentGen para definir la longitud y el tipo de los fragmentos y luego puntúa esos fragmentos usando una colección de VallFragmentEval. El siguiente fragmento de código anotado, de core/fragment/picking/vall/util.cc, ilustra este desglose:

```
// pick fragments from the Vall by a given secondary structure string
core::fragment::FragDataList
pick_fragments_by_ss(
  std::string const ss, // secondary structure string composed of 'H', 'E', 'L', or 'D'
  core::Size const top_n // return the top 'n' fragments
)
{
  using eval::IdentityEval;
  using gen::LengthGen;

  // get the default Vall data
  VallLibrary const & library = FragmentLibraryManager::get_instance()->get_Vall();

  // the librarian used to evaluate all fragments in VallLibrary
  VallLibrarian librarian;

  // Use default fragment extent generator that creates a continuous
  // fragment of the length of the secondary structure string, e.g. 9-mer.
  // Multiple fragment extent generators may be added.
  librarian.add_fragment_gen( new LengthGen( ss.length() ) );

  // Use a fragment evaluator class called IdentityEval that scores
  // a fragment by it's secondary structure and/or amino acid string.
  // Multiple evaluator classes may be added; the scores will be
  // accumulated into a single score value.
  librarian.add_fragment_eval( new IdentityEval( ss, 1.0, true ) );

  // score all fragments in the library and store in a sorted list
  librarian.catalog( library );

  // return the top 'n' scoring fragments in a FragDataList
  return librarian.top_fragments( top_n );
}
```

Generación de fragmentos.
====================

`       VallLibrarian      ` usa clases derivadas de `       VallFragmentGen      ` para generar las extensiones de fragmento que se van a evaluar. La operación básica consiste en pasarle a un `       VallFragmentGen      ` dos `       VallResidueIterator      `: uno que apunta a donde debe empezar el fragmento y otro que apunta justo después de la última posición posible del fragmento (es decir, la última posición de una `       VallSection      `). El esquema básico de una clase derivada de `       VallFragmentGen      ` es el siguiente:

```
class MyGen : public VallFragmentGen {

public: // following methods are required

  virtual
  VallFragmentGenOP clone() const;

  // Extent is typedef'd within VallFragmentGen.
  // In this method, implementer must make sure to set the boolean
  // public member data Extent::valid.  If valid is 'true', then
  // the Librarian will pass the fragment to its evaluators.  If
  // 'false' the fragment will be skipped.
  virtual
  Extent operator()( VallResidueIterator extent_begin, VallResidueIterator section_end ) const;

};
```

`       operator()      ` se usa para generar la extensión del fragmento y devuelve un nuevo `       Extent      ` que describe el inicio y el final del fragmento. Un `       Extent      ` es una estructura de datos simple con una función de conveniencia, `       distance()      `, que calcula la longitud del fragmento. Los datos miembro públicos de un `       Extent      ` son los siguientes:

```
struct Extent {

public: // member data

  // points to the beginning of the fragment
  VallResidueIterator begin;

  // points just past the end of the fragment.
  VallResidueIterator end;

  // If this is 'true', Librarian will pass this fragment extent
  // to be evaluated using its collection of VallFragmentEval.
  // If 'false', Librarian will skip it.
  bool valid;

};
```

Generadores de fragmentos disponibles.
------------------------------

A fecha de 31 de marzo de 2009 (20090331), la lista de generadores de fragmentos disponibles en `       core::fragment::picking::vall::gen      ` es:

- **LengthGen**
   * Genera un fragmento de una longitud determinada.

- **SecStructGen**
    * Genera un fragmento de una longitud determinada y con una estructura secundaria requerida.

Evaluación de fragmentos.
====================

La evaluación de fragmentos se realiza mediante clases derivadas de `       VallFragmentEval      `. Se le pasa un `       Extent      ` para que lo evalúe, y las puntuaciones se acumulan en un objeto `       VallFragmentScore      `. Los métodos para derivar correctamente de VallFragmentEval son los siguientes:

```
// sample fragment evaluator
class MyEval : public VallFragmentEval {

public: // the following are required

  virtual
  VallFragmentEvalOP clone() const;

  virtual
  bool eval_impl( Extent const & extent, VallFragmentScore & fs ) {
    // accumulate the score, e.g.
    fs.score += the_score;
  }

public: // the following are optional

  virtual
  void pre_catalog_op( VallLibrary const & );

  virtual
  void post_catalog_op( VallLibrary const & );

};
```

El trabajo de evaluar el fragmento definido por el `       Extent      ` va en el método `       eval_impl      `. `       eval_impl      ` solo necesita evaluar el fragmento y nada más; operaciones como almacenar los datos necesarios del Extent las gestiona automáticamente la clase base. Se pueden definir dos métodos opcionales, `       pre_catalog_op      ` y `       post_catalog_op      `, que VallLibrarian llamará durante `       VallLibrarian::catalog      `. Se ejecutan antes y después de la puntuación propiamente dicha, respectivamente. Existen para que el evaluador de fragmentos pueda, por ejemplo, imprimir un mensaje de estado o recopilar estadísticas sobre la VallLibrary antes de puntuar.

La estructura `       VallFragmentScore      ` acumula la puntuación en un único valor y también tiene una función de conveniencia, `       distance      `, que devuelve la longitud del fragmento. Los datos miembro públicos son los siguientes:

```
struct VallFragmentScore {

public: // member data

  // NOTICE: The proper values for these two iterators are already
  // stored by the base class VallFragmentEval, DO NOT set them
  // inside the 'eval_impl' method when deriving from VallFragmentEval.
  VallResidueConstIterator extent_begin;
  VallResidueConstIterator extent_end;

  // The cumulative score.  Add to this number inside
  // 'eval_impl()' of your evaluator.
  Real score;

};
```

Evaluadores de fragmentos disponibles.
------------------------------

A fecha de 31 de marzo de 2009 (20090331), la lista de evaluadores de fragmentos disponibles en `       core::fragment::picking::vall::eval      ` es:

- **IdentityEval**   
    * Comparación con la estructura secundaria y/o con la cadena de aminoácidos.

- **EnergyEval**
    * Inserta el fragmento en un Pose y evalúa una ScoreFunction dada. Es útil para evaluar chainbreak, restricciones, etc.

La estructura de VallLibrary.
==========================

De menor a mayor nivel:

-   VallResidue guarda los datos de un único residuo, correspondiente a una sola línea del archivo de la base de datos Vall
-   una colección de VallResidue forma una VallSection
-   una colección de VallSection forma una VallLibrary

Todos los iteradores de acceso público que devuelven las estructuras de datos de VallLibrary cumplen el concepto RandomAccessIterator. Se puede acceder directamente a un VallResidue guardado en VallLibrary mediante una combinación de dos índices: la posición de su VallSection en la biblioteca y el índice, basado en 1, de la posición del residuo dentro de esa sección:

```
// assuming: VallLibrary library;
// 1-based indexing for both indices

// access into the library
VallResidue const & residue = library[ section_index ][ position_index ];

// retrieving indices
residue.section_index();
residue.position_index();
```

Acceso a las puntuaciones, los índices de posición y la longitud de un fragmento después de VallLibrarian::catalog().
------------------------------------------------------------------------------------------------

Tras puntuar los fragmentos de la Vall, puede ser deseable acceder a los objetos de puntuación para, por ejemplo, guardar en un archivo la información sobre los fragmentos. La interfaz de acceso es la siguiente:

```
// assuming: VallLibrary library;
//           VallLibrarian librarian;
using VallLibrarian::Scores;

librarian.catalog( library );

// grab reference to the scores
Scores const & scores = librarian.scores();

// run through scores
for ( Scores::const_iterator s = scores.begin(), se = scores.end(); s != se; ++s ) {
  // It is therefore possible to get the indices of the
  // VallResidues, e.g.:

  // index of the first residue's section within the library
  s->extent_begin->section_index();

  // index of the first residue within its section
  s->extent_begin->position_index();
}
```

Implementar un nuevo fragment picker.
===================================

La elección de fragmentos se abstrae en un conjunto de conceptos definidos en `       core::fragment::picking::concepts      `. Una Library se organiza de la siguiente manera:

1.  una Library se compone de Books
2.  un Book se compone de Pages

Tomando como ejemplo concreto la implementación de VallLibrary dentro de `       core::fragment::picking::vall      `:

1.  VallLibrary (Library) se compone de VallSections (Books)
2.  una VallSection (Book) se compone de VallResidues (Pages)

Las clases de `       concepts      ` muestran y definen la interfaz de una clase que cumple dichos conceptos. Algunas clases se pueden usar dentro de una implementación concreta y otras no; esto se indica al principio de cada clase. Por comodidad, también lo enumeramos aquí. Las clases que se pueden usar dentro de una implementación concreta son:

-   Book
-   Extent
-   Library

Las clases de demostración que no se pueden usar dentro de una implementación concreta son:

-   Bookmark
-   ExtentEvaluator
-   ExtentGenerator

Un Librarian recorre las Pages de los Books de la Library y funciona así:

1.  genera un Extent de pages usando ExtentGenerator
2.  evalúa el Extent usando ExtentEvaluator
3.  archiva un Bookmark que guarda los resultados de la evaluación

La clase Librarian de `       concepts      ` ofrece una implementación concreta de estas operaciones y debe usarse como clase base para implementar nuevos Librarians. Tomando como ejemplo concreto la implementación de VallLibrarian dentro de `       core::fragment::picking::vall      `:

1.  genera un Extent de fragmento (una extensión de VallResidues) usando VallFragmentGen (ExtentGenerator)
2.  evalúa el fragmento usando VallFragmentEval (ExtentEvaluator)
3.  archiva un VallFragmentScore (Bookmark) que guarda los resultados de la evaluación

Continuará...

## Véase también

* [[Nuevo fragment picker | app-fragment-picker]]: el nuevo fragment picker.
* [[fragment-file]]: archivos de fragmentos
* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.

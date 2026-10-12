#Referencia del espacio de nombres core::io::pdb

Clases usadas para leer y escribir archivos PDB.

Descripción detallada
---------------------

Clases usadas para leer y escribir archivos PDB.

```
A PDB file is broken up into records, made up of one line each, and
identified by a record name in the first six columns.  The different
kinds of records are described at:

  https://www.wwpdb.org/documentation/file-format-content/format33/v3.3.html


The primary public interface is @c PDBReader, which turns a PDB file
into a series of records.  It behaves as an iterator through a
PDB file.  PDBReader allows for varying implementations of file readers,
which among other things allows for investigating different levels of
efficiency.   At this point the only implementation of @c PDBReader is
the @c SimplePDBReader_.

Using a PDBReader looks like this:
```

      #include <rosetta/io/pdb/PDBReader.hh>

      using rosetta::io::pdb::PDBReader;
      using rosetta::io::pdb::PDBReaderOP;
      using rosetta::io::pdb::records::Record;
      using rosetta::io::pdb::records::RecordOP;

      PDBReaderOP reader_p( new <PDBReader implementation>( PDB filename ) );
      PDBReader & reader ( *reader_p );


      {
        RecordOP record_p ( reader.read() );
        Record & record ( *record_p );

        // Check the record's type and take appropriate action.
      }
      

```
Todavía no se ha escrito un @c PDBWriter equivalente.  

##Véase también

* [[Input options]]: Opciones de línea de comandos para los archivos de entrada
* [[src Index Page]]: Explica la organización del código de Rosetta en el directorio `src`
* Más espacios de nombres en core:
  * [[core::chemical|namespace-core-chemical]]
  * [[Espacio de nombres core::conformation|namespace-core-conformation]]
  * [[core::conformation::idealization|namespace-core-conformation-idealization]] **YA NO EXISTE**
  * [[core::fragments|namespace-core-fragments]]
  * [[core::scoring|namespace-core-scoring]]
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores


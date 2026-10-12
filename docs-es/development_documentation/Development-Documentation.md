#Documentación para desarrolladores

##Desarrollar para Rosetta

- [[Rosetta overview]] - Explicación de los conceptos clave de Rosetta.
- [[Glossary]] - Definiciones breves de términos relacionados con Rosetta
- [[Doxygen tips]] - Cómo trabajar con la documentación dentro del código de Rosetta.
- [[Writing an app]] - Cómo escribir tu propia aplicación basada en Rosetta.
- [[Making rosetta robust for running on large number of inputs|robust]]
- [[Ensuring that Rosetta modules provide their own citations in Rosetta output|CitationManager]]

##¿Dónde está la documentación de las distintas bibliotecas de Rosetta?
La documentación de las distintas bibliotecas está algo dispersa.  Esta es una lista parcial:

**Bibliotecas internas:**

- [Documentación del código con Doxygen](https://docs.rosettacommons.org/manuals/latest/), de acceso público, que describe la interfaz de los objetos y funciones de Rosetta

<!--- BEGIN_INTERNAL -->
Para los desarrolladores de RosettaCommons, existe una versión de la documentación de Doxygen que también incluye el código. (Acceso protegido con contraseña).

- Documentación de Doxygen de [core y protocols](http://graylab.jhu.edu/Rosetta.Developer.Documentation/core+protocols/) (se compila con frecuencia para reflejar los últimos commits de master)
- Documentación de Doxygen de las [bibliotecas basic, numeric, utility y ObjexxFCL (compatibilidad con Fortran)](http://graylab.jhu.edu/Rosetta.Developer.Documentation/all_else/) (se compila con frecuencia para reflejar los últimos commits de master)

<!--- END_INTERNAL -->

**Bibliotecas externas:**

- [Documentación de Boost 1.55.0](http://www.boost.org/doc/libs/1_55_0/) (una biblioteca muy útil que amplía las bibliotecas estándar de C++ con funcionalidad de uso frecuente)
- [La biblioteca Eigen](http://eigen.tuxfamily.org/dox/) (se usa para álgebra lineal, manipulación de matrices, problemas de vectores propios, etc.)
- Información y referencias de [DAlphaBall](https://simtk.org/project/xml/downloads.xml?group_id=212) (pero no documentación), que se usa en el término de energía holes de Rosetta


##Organización del código

| [[/images/rosetta_code_mindmap.png]]<br /> Esquema general de la organización del código fuente de Rosetta<br /> Se puede descargar un archivo de gran tamaño (tamaño póster) [desde aquí](http://bioshell.pl/~bioshell/rosetta_code_mindmap.jpg)|  
|-----------|

- [[Rosetta library structure]] - Resumen de cómo está estructurada la biblioteca de Rosetta.
- [[src index page]] - Resumen del directorio src.

- [[Namespace core|src-index-page#core]]
    * [[Namespace core::chemical|Namespace core-chemical]]
    * [[Namespace core::conformation|Namespace core-conformation]]
        * [[Namespace core::conformation::idealization|Namespace core-conformation-idealization]]
    * [[Namespace core::io::pdb|Namespace core-io-pdb]]
    * [[Namespace core::scoring|Namespace core-scoring]]
    * [[Namespace core::fragments|namespace-core-fragments]]
- [[Namespace utility]]
    * [[Namespace utility::factory|Namespace utility-factory]]
    * [[Namespace utility::io|Namespace utility-io]]
    * [[Namespace utility::keys|Namespace utility-keys]]
    * [[Namespace utility::options|Namespace utility-options]]
- [[Namespace numeric]]
- [[Namespace objexxFCL]]

##Guías de estilo de Rosetta

- [[How to use pointers correctly]] - Cómo trabajar con el sistema de punteros inteligentes de Rosetta.
- [[A note on parsing residue selections in movers and filters]] -- Cómo usar el sistema de interpretación de selecciones de residuos para detectar la numeración de Rosetta, la numeración del PDB o la numeración de ReferencePose.

##Uso de clases concretas

- [[Owning pointers]] - El puntero inteligente de propiedad compartida con conteo de referencias intrusivo de Rosetta.  Actualmente está implementado con boost::shared_ptr.
    * [[Access pointers]] - Un "owning pointer" que no toma posesión del objeto.
- [[Vector1]] - La clase de vector de Rosetta con índices que empiezan en 1.
    * [[Vector0]] - Una versión de vector1 con índices que empiezan en 0.
    * [[VectorL]] - El vector generalizado con índices que empiezan en L, del que derivan vector1 y vector0.
- [[Tracer]] - Cómo usar la clase de salida tracer.

- [[Hbonds]] - Cómo trabajar con los términos de energía de enlaces de hidrógeno.
- [[namespace-core-fragments]] - Cómo usar las clases ubicadas en src/core/fragments/

- [[xyzVector]] - Un vector especializado para coordenadas cartesianas.

- [[xyzMatrix]] - Una clase de matriz de 3x3 especializada para coordenadas cartesianas.


##Cómo extender Rosetta

- [[New energy method]] - Cómo añadir un nuevo término de energía.
- [[Resfile reader]] - Cómo extender el lector de resfile.
- [[Multithreading]] - Cómo añadir compatibilidad con multihilo.

##Probar los cambios

###Consulta

- [[Rosetta tests]] - Una guía para ejecutar y escribir pruebas de Rosetta
- [[Run unit test]] - Cómo ejecutar las pruebas unitarias.
- [[Write unit test|writing-unit-tests]] - Cómo escribir pruebas unitarias.
- [[UTracer]] - Cómo usar la herramienta UTracer al escribir pruebas unitarias
- [[Mover test]] - Cómo escribir una prueba unitaria para un mover.  
- [[Integration tests]]
- [[Scientific Benchmarks]] - Cómo crear y ejecutar pruebas científicas

## Herramientas de visualización

- [[PyMOL]] Recursos para visualizar simulaciones de Rosetta en PyMol
- [[Extending the PyMol Viewer]] Cómo extender el PyMol Mover para añadir funciones de visualización durante las simulaciones de Rosetta

##Véase también

* [[Common Errors]]: Errores comunes al compilar Rosetta y cómo corregirlos.
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[RosettaScripts]]: Página del wiki sobre RosettaScripts, la interfaz XML de Rosetta
* [[PyRosetta]]: Página del wiki sobre PyRosetta, la interfaz independiente de Python para Rosetta
* [[Rosetta Timeline]]: Historia de Rosetta
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Build Documentation]]: Información sobre cómo compilar Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta

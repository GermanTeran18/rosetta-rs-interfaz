#Fundamentos de Rosetta

###Si eres nuevo en Rosetta, empieza [[aquí|Getting-Started]] para entender qué necesitas para ejecutar Rosetta. Después echa un vistazo a estos [tutoriales introductorios](https://www.rosettacommons.org/demos/latest/Home#tutorials).

###Si buscas el protocolo adecuado para tu aplicación biológica, mira [[aquí|Solving-a-Biological-Problem]].

####Control de la ejecución de Rosetta
- [[Ejecutar Rosetta|running-rosetta-with-options]]
  - [[Fixing errors]]
- [[Ejecutar Rosetta en paralelo mediante MPI |MPI]]
- [[Salida gráfica e interfaces gráficas | graphics-and-guis]]
    * [[PyMOL]]
    * [[PyRosetta Toolkit GUI]]
    * [[Foldit|foldit]]
- [[Scripting de Rosetta|Scripting-Documentation]]
    * [[RosettaScripts]]
    * [[PyRosetta]]
    * [[Topology Broker|BrokeredEnvironment]]
- [[Analyzing Results]]

####[[Opciones comunes y útiles de Rosetta|options-overview]]
- [[Input options]]
- [[Output options]]
- [[Opciones de bases de datos relacionales | Database-options]]
- [[Run options]]
- [[Score options]]
- [[Packing options]]
- [[Renamed and Deprecated Options]]

####[[Conceptos fundamentales de Rosetta|Rosetta-overview]]

- [[Breve historia de Rosetta|Rosetta-Timeline]]
- [[FAQ]]
- [[Glosario de términos|Glossary]]
    - [[Descripciones más extensas|RosettaEncyclopedia]]
- [[Units in Rosetta]]

- [[Puntuación|scoring-explained]]
- [[Funciones de puntuación y tipos de puntuación | Score Types]] - Descripción de la función de puntuación por defecto de Rosetta y de los tipos de puntuación comunes.
    *  [[Energía de solvatación de Lazaridis-Karplus | Lazaridis-Karplus-Solvation-Energy-fa-solv]]
    *  [[Puntuación de entidades moleculares no canónicas|NC-scorefunction-info]]
    *  [[Función de puntuación MM Std | NC-scorefunction-info#MM-Standard-Scorefunction]]
    *  [[Función de puntuación de orbitales | NC-scorefunction-info#Partial-Covalent-Interactions-Energy-Function-(Orbitals)]]
    *  [[Tipos de puntuación adicionales | score-types-additional]]
    *  [[Términos de guía orientados al diseño|design-guidance-terms]]
    *  [[Término de energía de enlaces de hidrógeno|hbonds]]
    *  [[Centroid score terms]]
- [[Symmetry]]
- [[Minimización | Minimization Overview]] - Grados de libertad de la cadena principal y/o de las cadenas laterales
- [[Comparing Structures]]
- [[Quiero hacer _x_. ¿Cómo lo hago? | I-want-to-do-x ]] 

- Temas avanzados
    * [Arquitectura de Rosetta3](http://www.ncbi.nlm.nih.gov/pubmed/21187238)
    * [[Rosetta AtomTypes]]
    * [[Foldtree Overview]]
    * [[AtomTree Overview]]
    * [[Estilos y algoritmos de modelado de loops|loopmodel-algorithms]]

####Formatos de archivo comunes
- [[Fasta file]] - Secuencias de proteínas de entrada
- [[Silent file]] - Representación compacta de salida propia de Rosetta
- [[Resfiles]] - Qué cadenas laterales de residuos pueden moverse y mutar
- [[Movemap file]] - Qué cadenas laterales y cadenas principales pueden moverse
- [[Constraint file]] - Añade restricciones de energía a la puntuación
- [[Fragment file]] - Base de datos de conformaciones de fragmentos de la cadena principal
- [[Loops file]] - Qué regiones de la proteína deben reconstruirse
- [[Residue Params file]] - Información química de los residuos
- [[Archivo de simetría|Symmetry#Symmetry-definitions]] - Tratamiento de proteínas simétricas.
- [[FoldTree file]] - define la conectividad de la estructura, tanto covalente como no covalente

####Formatos de archivo específicos de protocolos
- [[Archivos de restricciones de Matcher (Enzdes)|match-cstfile-format]] - Un archivo de restricciones especializado en interacciones proteína-ligando
- [[Chemical shift file]] - Desplazamientos químicos de RMN
- [[Bin transition probabilities file]] - Probabilidades de transición de un bin de torsión de la cadena principal a otro, usadas por algunos esquemas de muestreo

####Preparación de estructuras para su uso en Rosetta
* [[Preparación de archivos PDB típicos|preparing-structures]]
* [[Preparing PDB files for non-peptide polymers]]
* [[Preparing ligands]]

####[[Trabajo con residuos y moléculas que no son proteínas|non-protein-residues]]
- Orientación general:
    * [[Control general | Ignore Unrecognized]]
    * [[Preparing PDB files for non-peptide polymers]]
    * [[How to turn on residue types that are off by default]]
    * [[Información sobre funciones de puntuación y términos de energía no canónicos | NC-scorefunction-info]]
    * [[Control del proceso de diseño con términos de guía adicionales|design-guidance-terms]]
- [[DNA]]
- [[RNA]]
- [[Ligandos|preparing-ligands]]
- [[Water]]
- [[Metals]]
- [[Carbohydrates]]
- [[Mineral Surfaces]]
- [[Noncanonical Amino Acids]]
    *  [[D-Amino Acids]]
    *  [[Alpha-Amino Acids with Nonstandard Side-Chains]]
    *  [[Beta-Amino Acids]]
- [[Noncanonical backbones]]

####Varios
- [[Database support]] - Compatibilidad de Rosetta con bases de datos relacionales.
    *  [[Entrada/salida de bases de datos|Database-IO]] - Información específica de cada plataforma sobre la compatibilidad de Rosetta con bases de datos.
    *  [[Sqlite3-interface]] - Más información sobre la interfaz de base de datos sqlite.
- [[Lista completa de opciones|full-options-list]] - Una lista (casi) completa de las opciones de Rosetta disponibles.
- [[ Debate sobre la distribución de trabajos de Rosetta | JD2]]
- [[Analyzing results]]

####Ayuda
- [Rosetta Discussions](https://github.com/RosettaCommons/rosetta/discussions)
- [Antiguos foros de RosettaCommons (solo lectura)](http://rosettacommons.org/forum)
- [Rastreador de incidencias de Rosetta](https://github.com/RosettaCommons/rosetta/issues)


##Véase también

* [[Getting Started]]: Una página para quienes empiezan con Rosetta. Los nuevos usuarios empiezan aquí.
* [Tutoriales introductorios de Rosetta](https://www.rosettacommons.org/demos/wiki/Home#tutorials)
* [[FAQ]]: Preguntas frecuentes
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Build Documentation]]: Información sobre la configuración de Rosetta
* [[Rosetta on different scales]]: Pautas para escalar tus ejecuciones de Rosetta
* [[TACC]]: Información para ejecutar Rosetta en el clúster TACC/Stampede.
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos usando Rosetta
* [[I want to do x]]: Guía para realizar perturbaciones estructurales específicas usando RosettaScripts
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Commands collection]]: Una lista de ejemplos de líneas de comandos para ejecutar archivos ejecutables de Rosetta
* [[Rosetta Servers]]: Servidores web para aplicaciones de Rosetta
* [[Scripting Documentation]]: Interfaces de scripting para Rosetta
* [[Resources for learning biophysics and computational modeling]]
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Uso del ResourceManager|ResourceManager]]
* [[Non-protein Residues]]: Información sobre cómo ejecutar Rosetta con residuos que no son proteínas y con ligandos

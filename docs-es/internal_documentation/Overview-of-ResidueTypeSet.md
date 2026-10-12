##  `ResidueTypeSet`: qué es
`core::chemical::ResidueTypeSet` se encarga de recorrer los conjuntos de tipos de residuo, que incluyen, entre otros, aminoácidos, ácidos nucleicos, residuos peptoides y monosacáridos.  Primero lee un archivo que contiene la
ubicación de los tipos de residuo en la base de datos.  Al principio de ese archivo están los tipos de átomo, los tipos de átomo mm, los
conjuntos de elementos y los tipos de orbital que se van a usar.  Todos los conjuntos son para fa_standard.  Si se
agrega un nuevo tipo de átomo para los residuos, aquí es donde se agregaría.  Una vez que asigna los tipos, lee los params
adicionales de residuos que se pasan por la línea de comandos.  Por último, se aplican parches a todos los residuos agregados.

## Lo que necesitas saber como desarrollador
La clase se está actualizando en 2015-2016, como se describe a continuación. 
+ Todo el código anterior de Rosetta con pruebas sigue siendo compatible.
+ En código nuevo, evita usar funciones como `aa_map_DO_NOT_USE`. Al pedir todo lo que tenga un AA (o name3) del tipo consultado, estas funciones (ahora etiquetadas con *DO_NOT_USE*) requieren instanciar un número exponencialmente grande de residue_types. Estamos intentando eliminarlas todas del código, y en ese momento podremos borrar estas funciones.
+ En su lugar, si necesitas un tipo de residuo, casi con seguridad puedes obtenerlo con una función como `get_representative_type_with_variant_aa` y `get_all_types_with_variants_aa`, donde indicas el AA (p. ej., aa_ala) y una lista de las variantes que quieres.
+ Si conoces el nombre exacto de tu `ResidueType` (p. ej., "ALA:NtermProteinFull"), usa simplemente `name_map`.
+ Agregar nuevos `ResidueType` generados en tiempo de ejecución (en lugar de durante la lectura de residue_types.txt en la base de datos) puede complicarse. Los GlobalResidueTypeSets que se obtienen del ChemicalManager no se pueden (ni se deben) modificar. En su lugar, guarda el ResidueType en la Conformation del Pose que lo va a usar. Puedes usar modifiable_residue_type_set_for_conf() y reset_residue_type_set_for_conf() para obtener el ResidueTypeSet de la Conformation y luego reemplazarlo por una versión modificada.

## Actualizaciones recientes: el proyecto `ResidueTypeSet`.
### Problema de la implementación original
Con el `ResidueTypeSet` original, era difícil leer y modelar automáticamente PDBs interesantes con ligandos, tipos de ARN modificados, proteínas con algunos átomos virtualizados, etc. sin tener que especificar explícitamente parches o nuevos tipos de residuo. Por ejemplo, se pudieron leer estructuras de ribosomas de alta precisión basadas en crio-EM gracias a la resolución de las modificaciones de los nucleótidos.

En principio, buena parte de esta diversidad química se podría guardar en la base de datos de Rosetta e instanciar en todo su universo conocido al arrancar. Pero el sistema original de `ResidueTypeSet` tenía una huella de memoria y un tiempo de preparación que crecían exponencialmente con el número de parches. Esto llevó a bastantes hacks feos (e imperfectos) en mi laboratorio, en los que ciertos parches solo se cargan en ciertos modos, etc., y a cierta reticencia a introducir nuevos `ResidueType` (cada uno de los cuales recibe un gran número de combinaciones posibles de parches). También hay inventarios .slim de residue_types «mínimos» para evitar la sobrecarga en algunos sistemas con poca memoria, como BlueGene.

Este [pull request](https://github.com/RosettaCommons/main/pull/591) refactorizó el sistema `ResidueTypeSet` para cargar residue_types y parches e instanciar los tipos de residuo parcheados solo cuando se necesitan («sobre la marcha»).

+ Solo se instancian por completo los `ResidueType` cuando se piden de forma explícita; de lo contrario se almacenan como marcadores de posición compactos.
+ Nuevas herramientas para instanciar residue_types a partir de aa, name3 y listas de propiedades o variantes deseadas (lo que reduce mucho el número de instanciaciones). Se verificó un gran aumento de rendimiento, p. ej., en `extract_pdbs` (extracción de silent files).
+ Nueva clase [[ ResidueTypeFinder ]] para reconocer residuos PDB a partir de nombres de átomo sin tener una lista de todos los residuos parcheados, basada en una búsqueda binaria personalizada a través de los Patches. Se verificó un gran aumento de rendimiento en la lectura de PDB.

Hay más información en [estas diapositivas](https://dl.dropboxusercontent.com/u/21569020/Das_preRosettaCon2015_ResidueTypeSet.pdf).

 Los pull requests posteriores logran lo siguiente:
+ Se acabó la advertencia de -override_rsd_type_limit. [Enlace](https://github.com/RosettaCommons/main/pull/725)
+ Los NCAA se activan como tipos de residuo por defecto. [Enlace](https://github.com/RosettaCommons/main/pull/722)
+ Se eliminan los conjuntos de tipos de residuo de ARN en favor de fa_standard, que engloba los tipos de residuo de ARN y ahora no penaliza el tiempo de carga. [Enlace](https://github.com/RosettaCommons/main/pull/745)
+ Se eliminan los selectores de parches de la línea de comandos que mantenían los parches desactivados por defecto; ahora se pueden activar. [Enlace](https://github.com/RosettaCommons/main/pull/756)

### Algunas notas sobre la implementación interna del `ResidueTypeSet` actualizado
+ Aspectos básicos: conservamos el `name_` de la clase y la información estándar que se aplica a todos los ResidueTypes: 	`AtomTypeSetCOP atom_types_`, `ElementSetCOP elements_`, `MMAtomTypeSetCOP mm_atom_types_`, `orbitals::OrbitalTypeSetCOP orbital_types_`.
+ Conservamos una lista de todos los `ResidueType` en `ResidueTypeCOPs residue_types_`. Pero cada uno de estos `ResidueType` empieza como un objeto «marcador de posición» con solo `name`, `name3` y `variants`. El resto del objeto (nombres de átomo, grafo de átomos, etc.) se instancia cuando se necesita. La forma de saber si un `ResidueType` es un marcador de posición o está instanciado es mediante la función `finalized()`. (En realidad debería ser posible y fácil dejar esto obsoleto o convertirlo en una caché mutable de ResidueTypes instanciados, y quizá queramos hacerlo en el futuro, ya que crece exponencialmente con el número de parches.)
+ Todavía tenemos `aa_map_`, `interchangeability_group_map_`, `name3_map_`, `aas_defined_`; ¡pero deberíamos eliminarlos cuando nos deshagamos de todas las llamadas a funciones *DO_NOT_USE* en todo el código!
+ Para permitir que el [[ ResidueTypeFinder ]] descubra rápidamente los `ResidueType`, ahora almacenamos listas de todos los `base_residue_types_` (ResidueTypes sin ningún parche) y de los `patches_`.
+ Hay un booleano `on_the_fly` que indica si en este ResidueTypeSet se está usando el nuevo esquema de marcador de posición e instanciación. Es `true` por defecto, a menos que uses aductos de ADN, que todavía no son compatibles (pero podrían serlo; véase más abajo).

### Pendiente
Todavía quedan algunas cosas por hacer (*los desarrolladores: añadan a esta lista de deseos y eliminen lo que se complete.*):
+ Activar por defecto cada vez más residue_types y parches razonables, incluidos nucleótidos no estándar, todas las modificaciones postraduccionales de aminoácidos y el repertorio completo de moléculas pequeñas del PDB.
+ La implementación actual no es segura para hilos (thread-safe), pero es posible volver a una versión segura para hilos (con -chemical:on_the_fly false). Debería ser bastante fácil admitir hilos mediante mutex: hay que fijar un bloqueo en la función `replace_residue_type_in_set_defying_constness` y respetarlo dentro de `make_sure_instantiated`.
+ Actualmente se crean residue_types «marcadores de posición» con información básica como name, name3, etc.; debería ser posible ni siquiera crearlos y ahorrar más tiempo y memoria.
+ Los conjuntos de `Orbitals` se podrían aplicar mediante un `Patch`. Consulta `ResidueTypeSet.cc` para ver algunos comentarios sobre cómo hacerlo.
+ Los `Adduct` de agua del ADN se podrían aplicar como Patches. Consulta `ResidueTypeSet.cc` para ver algunos comentarios sobre cómo hacerlo.
+ Comprobar que la huella de memoria realmente se reduce (ejecuta con `-chemical:on_the_fly false` para comparar).
+ _Quizá_ unificar la nueva clase [[ResidueTypeFinder]] con el clásico `ResidueTypeSelector`.
+ Debería ser posible acelerar aún más [[ResidueTypeFinder]], ya que desciende por un árbol binario aplicando parches para encontrar residue_types; esto requeriría guardar en caché un mapa de qué parches se aplican a qué residue_types, quizá en ResidueTypeSet; actualmente esto se hace implícitamente en name_map().
+ Incluso con la aceleración anterior, todos los `base_residue_types` se instancian. Quizá convenga ser más inteligente con esto.
       en el futuro quizá queramos tener 100,000 ligandos en Rosetta, que podrían mantenerse como `ResidueType`
       «marcadores de posición» mínimos con solo `name3`. Se instanciarían únicamente cuando se reconocieran
       en, por ejemplo, un archivo PDB o se pidieran explícitamente por `name3`.
+ Rocco y rhiju reintrodujeron `ResidueType::variant_types()` y devuelve una lista de `std::string` en lugar de un enum `VariantType`. (Rocco trabajaba antes de la refactorización de @JWLabonte). Será fácil de restaurar. Debería ocurrir después de que @JWLabonte termine el [pull request #56](https://github.com/RosettaCommons/main/pull/56)

#Refinamiento de los ensamblajes de SEWING

##Protocolo de refinamiento integrado
Por defecto, SEWING ejecuta un refinamiento de todos los átomos en todos los modelos que superan los umbrales iniciales de AssemblyScore. Este refinamiento consiste en una versión condensada de FastRelax (tres ciclos en lugar de los 5 por defecto) con restricciones de tipo de residuo (peso 1) que favorecen las identidades de residuo nativas en cada posición (las quimeras favorecen cualquiera de los dos tipos de residuo nativos).

##Protocolos de refinamiento personalizados
Como SEWING se suele usar para generar un gran número de conformaciones de esqueleto, refinar todas las estructuras de salida durante la ejecución inicial de SEWING puede resultar demasiado lento. Por eso es habitual omitir el protocolo de refinamiento integrado (con la opción -sewing:skip_refinement) y filtrar o modificar los ensamblajes antes del refinamiento. Los protocolos de refinamiento personalizados también permiten elegir pesos de restricción de tipo de residuo específicos de cada estructura secundaria mediante el [[AssemblyConstraintsMover]].
###Prefiltrado de ensamblajes
* Eliminación de duplicados
* Filtrado según la puntuación

###Manejo de ligandos
Actualmente, SEWING elimina todos los componentes que no son proteína de las estructuras iniciales (es decir, las estructuras de entrada del AppendAssemblyMover). Por tanto, si la estructura inicial une un ligando, hay que volver a añadir el ligando a los ensamblajes. Lo más fácil es copiar las coordenadas del ligando del archivo PDB inicial a los ensamblajes terminados; como el nodo inicial permanece fijo durante SEWING, la posición del ligando será correcta. Mejorar el manejo de ligandos es actualmente un objetivo de desarrollo de SEWING.

###Consideraciones importantes
* Como el protocolo SEWING forma quimeras a partir de elementos de estructura secundaria con átomos que no se superponen perfectamente, es fundamental usar **minimización cartesiana** en cualquier protocolo de refinamiento de SEWING. Esto requiere usar una función de puntuación cartesiana, como talaris2014_cart, y especificar la minimización cartesiana (por ejemplo, con cartesian=1 en [[FastDesign|FastDesignMover]]).
* Al diseñar estructuras, también resulta útil usar un grafo de interacciones de memoria lineal para mejorar el rendimiento, con la opción de línea de comandos `-linmem_ig 10`.
* Los protocolos de refinamiento de SEWING suelen favorecer las identidades de residuo nativas (ver más abajo).

###Favorecer los residuos nativos
Cuando los esqueletos se generan con los [[movers de SEWING|Assembly of models]], los rotámeros nativos se guardan con el nombre de archivo como NativeRotamersFile (xxxx.rot). Por tanto, se puede dar cierta bonificación a esos tipos de residuo nativos (añadiendo restricciones ResidueType a la Pose) al diseñar cadenas laterales (con el [[AssemblyConstraintsMover]]). Es práctica común aplicar restricciones relativamente débiles (por ejemplo, peso 1) a los residuos helicoidales y de hebra beta, y restricciones más fuertes (por ejemplo, peso 5) a los residuos de loop.

###Fijar identidades de residuos en protocolos personalizados
Al usar el [[AppendAssemblyMover]], suele haber varios residuos (como los que forman interacciones de unión clave) que deben mantenerse fijos durante el refinamiento. Como los números de residuo de cada ensamblaje final serán distintos de los del pdb de entrada y distintos entre sí, seleccionar esos residuos no es sencillo.

La operación de tarea [[RestrictIdentitiesAtAlignedPositions|RestrictIdentitiesAtAlignedPositionsOperation]] puede resolver este problema. Usando el nodo inicial como source_pdb de la operación de tarea y especificando los números de residuo del nodo inicial que se quieren fijar, esos residuos se pueden fijar con el tipo de residuo previsto. Como SEWING no cambia la posición del nodo inicial, el alineamiento inicial será correcto; sin embargo, hay que usar restricciones de coordenadas durante el refinamiento para asegurar que los residuos correctos permanecen alineados.
##Filtros comunes

##Véase también
* [[SEWING]]: La página principal de SEWING
* [[AssemblyConstraintsMover]]
* [[Assembly of models]]
* [[SEWING Dictionary]]

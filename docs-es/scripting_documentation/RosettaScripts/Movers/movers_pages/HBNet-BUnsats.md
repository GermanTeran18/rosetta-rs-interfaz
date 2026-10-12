#HBNet Unsats

*Volver a la página de [[HBNet|HBNetMover]]. Volver a la página de [[Movers|Movers-RosettaScripts]]. Volver a la página de [[RosettaScripts|RosettaScripts]].*<br>

###Cómo trata HBNet los átomos polares enterrados sin satisfacer
HBNet tiene su propio método interno para evaluar y contar átomos polares enterrados sin satisfacer. Cada red exige que todos los donadores y aceptores de átomos pesados enterrados participen en puentes de hidrógeno. Cualquier red que no cumpla este requisito se descarta automáticamente. Las redes se clasifican y ordenan primero según el número de Hpol sin satisfacer, y los usuarios pueden especificar ```max_unsat_Hpol```. El razonamiento es que los átomos pesados polares enterrados conllevan una gran penalización energética (~5-6 kcal/mol) si no forman puentes de hidrógeno compensadores, mientras que, por ejemplo, un NH2 de Asn o Gln que cede un Hpol pero no el otro se tolera más.

###Cómo se determina el enterramiento
Un reto de HBNet es determinar el enterramiento durante la búsqueda de redes, cuando todavía no se ha empaquetado ni diseñado ningún otro residuo alrededor de la red. La implementación original usaba SASA con un radio de sonda aumentado para tener en cuenta este problema. Ahora, por defecto se usan los vecinos de cadena lateral de Gabe Rocklin ([[LayerSelector|ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_layerselector]]), que ofrecen dos ventajas: 1) están precalculados, clasificando los residuos como enterrados o expuestos al disolvente al principio, lo que es mucho más rápido que SASA; 2) son independientes de la cadena lateral (solo usan el vector CA-CB), por lo que la clasificación es coherente para cada cadena principal, independientemente de la secuencia de aa o de los rotámeros.

Los usuarios también pueden definir a medida qué residuos quieren que HBNet considere enterrados para los cálculos de átomos sin satisfacer, pasando cualquier selector de residuos a ```core_selector```.

###Véase también:
* [[BuriedUnsatHbondsFilter]]
* [[LayerSelector|ResidueSelectors#residueselectors_conformation-dependent-residue-selectors_layerselector]]
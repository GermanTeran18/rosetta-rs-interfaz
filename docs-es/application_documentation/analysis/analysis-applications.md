#Aplicaciones de análisis

**NOTA: Si buscas información general sobre cómo analizar tus resultados en Rosetta, consulta la página [[Analyzing Results]].

##Lista de aplicaciones de análisis

* [[Aplicación score|score-commands]]: aplicación para puntuar una o más estructuras.
* [[Residue energy breakdown]]: entrega información de puntuación residuo por residuo para una estructura de entrada dada.
* [[Density map scoring]]: puntúa qué tan bien concuerda una estructura con datos experimentales de densidad electrónica.
* [[DDG monomer]]: aplicación para predecir los cambios de estabilidad de proteínas monoméricas causados por una mutación puntual.
* [[Cartesian DDG]]: cálculo de DDG mediante muestreo en el espacio cartesiano.
* [[Interface analyzer]]: calcula energías de unión, áreas superficiales enterradas y otras métricas para las interfaces entre dos o más cadenas de un PDB.
* [[interface_energy]]: energía en la interfaz entre dos conjuntos de residuos.
* [[PeptiDerive]]: para una interfaz dada, encuentra el tramo lineal que aporta la mayor parte de la energía de unión.
* [[Pocket measure]]: esta aplicación toma un archivo PDB y un residuo o par de residuos objetivo especificado, genera un PocketGrid (localizado) y entrega el «volumen profundo» total de todos los bolsillos objetivo y el bolsillo más grande.
* [[Theta ligand]]: dados archivos PDB de una proteína y un ligando, entrega la fracción del ligando que está expuesta al solvente en el complejo unido.
* [[RosettaHoles]]: evaluación rápida del empaquetamiento del núcleo de proteínas para la predicción, el diseño y la validación de estructuras.
* [[FeaturesReporters|Features-reporter-overview]].
* [[RECCES]]: cálculo de energía libre de ARN con muestreo exhaustivo.
* [[shobuns]]: átomos polares enterrados sin satisfacer para el modelo de solvatación SHO.
* [[PerResidueSolventExposure]]: cuantifica la exposición al solvente residuo por residuo.
* [[HDXEnergy]]: puntúa una estructura de proteína con datos de HDX.

##Véase también

* [[Tools]]: herramientas basadas en Python para usar con Rosetta
* [[Rosetta Servers]]: servidores que dan acceso a algunas aplicaciones de Rosetta
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Scoring explained]]: descripción de la puntuación en Rosetta
* [[RosettaScripts]]
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta

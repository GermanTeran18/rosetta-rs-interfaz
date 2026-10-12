## Acerca de

### Desarrolladores
- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com)) (escribió esta documentación y los términos de Rosetta3)
- Vladmir Yarov-Yaravoy (términos originales)

### Metadatos
- Investigador principal correspondiente: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

Última modificación: 5/22/2014

## Resumen
La función de energía de baja resolución (basada en centroides) de Rosetta para proteínas de membrana se desarrolló en 2006 con el protocolo de plegamiento Membrane Ab Initio (Yarov-Yaravoy et al. 2006). Se derivó de 28 proteínas de membrana alfa helicoidales y está basada en el conocimiento. Hay 6 términos de energía de baja resolución: una energía de residuo-entorno, una energía de residuo-residuo, la densidad de empaquetamiento, una penalización de extremos, una penalización de no hélice y una penalización de proyección TM. 

### Términos de energía
Los términos compatibles con el marco RosettaMembrane se agregaron en abril de 2014. A continuación se describen los términos, los métodos de energía correspondientes y su uso. El nombre de puntuación es el nombre del término que usarías al configurar un archivo de pesos. 

#### Término de residuo-entorno de membrana
Nombre de puntuación: MPEnv. Puntúa las interacciones por residuo con el entorno de la membrana usando una membrana de 5 capas (capas: hidrofóbica interna, hidrofóbica externa, interfaz, polar, agua). Tipo de método de energía: de un cuerpo, dependiente del contexto.  Para desarrolladores: código en `core/scoring/membrane/MPEnvEnergy.hh`.

#### Término de pares residuo-residuo de membrana 
Nombre de puntuación: MPPair. Puntúa las interacciones residuo-residuo en el entorno de la membrana usando una membrana de 2 capas (capas: hidrofóbica, polar). Tipo de método de energía: de dos cuerpos, dependiente del contexto. Para desarrolladores: código en `core/scoring/membrane/MPPairEnergy.hh`

#### Término de densidad de empaquetamiento de membrana
Nombre de puntuación: MPCBeta. Puntúa la densidad de empaquetamiento en la membrana según el número de hélices. Tipo de método de energía: de un cuerpo, dependiente del contexto. Para desarrolladores: código en `core/scoring/membrane/MPCbetaEnergy.hh`

#### Penalización de extremos en la membrana
Nombre de puntuación: MPTermini. Penalización por residuos de los extremos (N o C terminal) en la membrana. Tipo de método de energía: energía de la estructura completa. Para desarrolladores: código en `/core/scoring/membrane/MPTerminiPenalty.hh`

#### Penalización de proyección TM de la membrana
Nombre de puntuación: MPTMProj. Penalización por hélices más largas que el grosor de la membrana. Tipo de método de energía: energía de la estructura completa. Para desarrolladores: código en `core/scoring/membrane/MPTMProjPenalty.hh`

#### Penalización de no hélice en la membrana
Nombre de puntuación: MPNonHelix. Penalización por residuos que no son de hélice en la membrana. Usa la estructura secundaria de Rosetta (o la proporcionada). Tipo de método de energía: energía de un cuerpo independiente del contexto. Para desarrolladores: código en `core/scoring/membrane/MPNonHelixPenalty.hh`

## Opciones de puntuación
|**Nombre de la opción**|**Descripción**|**Tipo**|
|---|---|---|
|score:find_neighbors_3dgrid|Usa una tabla de búsqueda 3D en los cálculos de vecinos|boolean|
|membrane:no_interpolate_Mpair|desactiva la interpolación entre 2 capas cuando un par de residuos está en el límite|boolean|

## Para desarrolladores
El conjunto de términos descritos arriba es solo para usar con los nuevos protocolos del marco de membrana. El conjunto antiguo de términos de energía se puede encontrar en `core/scoring/methods.`

## Referencias
Yarov-Yarovoy V, Schonbrun J, Baker D. (2006 Mar 1) Multipass membrane protein structure prediction using Rosetta. Proteins. 62(4):1010-25.

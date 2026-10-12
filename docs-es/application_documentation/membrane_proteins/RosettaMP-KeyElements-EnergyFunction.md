# Funciones de energía de membrana (RosettaMP) 

[[_TOC_]]

## Descripción general
La implementación actual de RosettaMP usa la misma ciencia (es decir, los mismos términos de puntuación) que la implementación original de RosettaMembrane. Para aumentar la flexibilidad y la facilidad de uso, implementamos una nueva interfaz para estos términos. A continuación se describen la ciencia y la interfaz de las funciones de puntuación de baja y alta resolución. 

## Función de puntuación de baja resolución

La función de energía de baja resolución (basada en centroides) de Rosetta para proteínas de membrana se desarrolló en 2006 con el protocolo de plegamiento ab initio de membrana (*Yarov-Yaravoy et al. 2006*). Se derivó de 28 proteínas de membrana alfa-helicoidales y está basada en conocimiento.

### Representación de la membrana
La función de energía de baja resolución divide la bicapa de membrana en dos o cinco capas que describen distintas regiones del entorno de membrana. La puntuación de las interacciones por residuo, residuo-residuo y de empaquetado depende de la posición en una capa específica. La representación de cinco capas se describe a continuación: 

[[ rosettamp_lowres.png ]]

### Función de puntuación
La función de energía incluye seis términos: una energía de residuo-entorno, una energía residuo-residuo, la densidad de empaquetado, una penalización por extremos, una penalización por residuos que no son de hélice y una penalización por TMprojection. 

**Para una descripción detallada de todos los términos de puntuación, su forma funcional y sus pesos en aplicaciones específicas, consulta Alford, Koehler Leman et al.**

### Términos de energía individuales
A continuación se describen los términos, los métodos de energía correspondientes y su uso. El nombre de puntuación es el nombre del término que usarías al preparar un archivo de pesos. 

#### Término de residuo-entorno de membrana
Nombre de puntuación: MPEnv. Puntúa las interacciones por residuo con el entorno de membrana usando una membrana de 5 capas (capas: hidrofóbica interna, hidrofóbica externa, interfaz, polar, agua). Tipo de método de energía: de un cuerpo dependiente del contexto.  Para desarrolladores: código en `core/scoring/membrane/MPEnvEnergy.hh`.

#### Término de pares residuo-residuo de membrana 
Nombre de puntuación: MPPair. Puntúa las interacciones residuo-residuo en el entorno de membrana usando una membrana de 2 capas (capas: hidrofóbica, polar). Tipo de método de energía: de dos cuerpos dependiente del contexto. Para desarrolladores: código en `core/scoring/membrane/MPPairEnergy.hh`

#### Término de densidad de empaquetado de membrana
Nombre de puntuación: MPCBeta. Puntúa la densidad de empaquetado en la membrana según el número de hélices. Tipo de método de energía: de un cuerpo dependiente del contexto. Para desarrolladores: código en `core/scoring/membrane/MPCbetaEnergy.hh`

#### Penalización por extremos de membrana
Nombre de puntuación: MPTermini. Penalización por residuos de los extremos (N- o C-terminal) en la membrana. Tipo de método de energía: energía de la estructura completa. Para desarrolladores: código en `/core/scoring/membrane/MPTerminiPenalty.hh`

#### Penalización por proyección TM de membrana
Nombre de puntuación: MPTMProj. Penalización por hélices más largas que el grosor de la membrana. Tipo de método de energía: energía de la estructura completa. Para desarrolladores: código en `core/scoring/membrane/MPTMProjPenalty.hh`

#### Penalización por residuos que no son de hélice en la membrana
Nombre de puntuación: MPNonHelix. Penalización por residuos que no son de hélice en la membrana. Usa la estructura secundaria de Rosetta (o la proporcionada). Tipo de método de energía: energía de un cuerpo independiente del contexto. Para desarrolladores: código en `core/scoring/membrane/MPNonHelixPenalty.hh`

### Opciones de puntuación
|**Nombre de la opción**|**Descripción**|**Tipo**|
|---|---|---|
|score:find_neighbors_3dgrid|Usa una tabla de búsqueda 3D en los cálculos de vecinos|booleano|
|membrane:no_interpolate_Mpair|desactiva la interpolación entre 2 capas cuando un par de residuos está en el límite|booleano|

## Función de puntuación de alta resolución
La función de energía de alta resolución (todos los átomos) de Rosetta se desarrolló en 2007 con los protocolos ab initio y de refinamiento de alta resolución (Barth *et al.* 2007) y se basa en el modelo de membrana implícita de Lazaridis (2003). 

### Representación de la membrana
La función de energía de alta resolución representa la bicapa de membrana como una losa hidrofóbica de grosor fijo T (donde el grosor predeterminado es 30Ang). Esto da un núcleo hidrofóbico de 18A con regiones de transición de 6A a cada lado. Esta representación de la membrana se ilustra a continuación: 

[[ rosettamp_hires.png ]]

### Función de puntuación
La función de puntuación de alta resolución combina términos de la función de energía score12 con términos de solvatación de membrana, de entorno y una corrección de la fuerza de los enlaces de hidrógeno en la membrana. 

**Para una descripción detallada de todos los términos de puntuación, su forma funcional y sus pesos en aplicaciones específicas, consulta Alford, Koehler Leman et al.**

### Términos de energía individuales
#### Solvatación de membrana
Nombre de puntuación: fa_mpsolv. Puntúa un par de residuos según su profundidad en la bicapa de membrana

#### Entorno de membrana
Nombre de puntuación: fa_mpenv. Puntúa un residuo individual según su profundidad en la bicapa de membrana 

### Opciones de puntuación
|**Nombre de la opción**|**Descripción**|**Tipo**|
|---|---|---|
|mp:scoring:hbond|Corrección de la energía de enlaces de hidrógeno para proteínas de membrana. Predeterminado = false.|booleano|


## Referencias

* Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press - Rosetta Revision #57518
* Yarov-Yarovoy V, Schonbrun J, Baker D. (2006 Mar 1) Multipass membrane protein structure prediction using Rosetta. Proteins. 62(4):1010-25.
* Barth P, Schonbrun J, Baker D. (2007 Oct 2) Toward high-resolution prediction and design of transmembrane helical protein structures. Proc Natl Acad Sci U S A. 104(40):15682-7.
* Barth P, Wallner B, Baker D. (2009 Feb 3) Prediction of membrane protein structures with complex topologies using limited constraints. Proc Natl Acad Sci U S A. 106(5):1409-14.

## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

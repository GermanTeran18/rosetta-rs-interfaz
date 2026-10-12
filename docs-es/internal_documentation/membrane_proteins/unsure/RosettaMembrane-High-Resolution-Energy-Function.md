## Acerca de

### Desarrolladores
- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com)) (escribió esta documentación y los términos de Rosetta3)
- Patrick Barth (términos originales)

### Metadatos
- Investigador principal correspondiente: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

Última modificación: 5/22/2014

## Resumen
La función de energía de alta resolución (todos los átomos) de Rosetta para proteínas de membrana se desarrolló en 2007 junto con un método actualizado de plegamiento Membrane Ab Initio (Barth et al. 2007). Se derivó de 18 proteínas de membrana alfa helicoidales y amplía la función de energía score12' de Rosetta para proteínas solubles. La función de energía incluye los términos atractivo y repulsivo de LJ, el término de pares y el término de solvatación idénticos a los de score12'. Además, la función de energía de membrana incluye una energía de solvatación de membrana, una energía de entorno de membrana y una corrección de enlaces de hidrógeno. 

### Términos de energía
Los métodos de energía de todos los átomos compatibles con el marco RosettaMembrane se agregaron en abril de 2014. A continuación se describen los términos, los métodos de energía correspondientes y su uso. El nombre de puntuación es el nombre del término que usarías al configurar un archivo de pesos. 

#### Término de residuo-entorno de membrana de todos los átomos
Nombre de puntuación: FaMPEnv. Puntúa el cambio en la energía libre de solvatación de átomos aislados cuando se transfieren del agua a la bicapa de la membrana. Las puntuaciones se determinan en función de la posición z a lo largo de la normal de la membrana. Tipo de método de energía: de un cuerpo, dependiente del contexto. Para desarrolladores: código en `core/scoring/membrane/FaMPEnvEnergy.hh`

#### Término de energía de solvatación de membrana de todos los átomos
Nombre de puntuación: FaMPSolv. Puntúa el cambio en la energía de solvatación de un átomo al quedar enterrado en la proteína. Se calcula con el potencial IMM1 (que amplía el potencial EFF1 para proteínas de membrana, Lazaridus et al. 2003). Tipo de método de energía: de dos cuerpos, dependiente del contexto. Para desarrolladores: código en `core/scoring/membrane/FaMPSolvEnergy.hh`

### Correcciones de términos de energía
Para adaptar los términos de score12' y hacerlos compatibles con los términos de membrana, se agregan correcciones específicas: 

#### Peso de los enlaces de hidrógeno
Los lípidos de la membrana no tienen grupos polares y, por lo tanto, el efecto del solvente sobre los enlaces de hidrógeno en el núcleo de la membrana es despreciable. Se incorpora un peso que corrige este efecto en función de la posición z a lo largo de la normal de la membrana para adaptar el término de energía de enlaces de hidrógeno a las membranas. Esta corrección se puede activar con la opción -membrane_new:scoring:mphbond descrita a continuación

## Opciones de puntuación
|**Nombre de la opción**|**Descripción**|**Tipo**|
|---|---|---|
|membrane_new:scoring:mphbond|activa la corrección de enlaces de hidrógeno de membrana de todos los átomos|boolean|

## Para desarrolladores
El conjunto de términos descritos arriba es solo para usar con los nuevos protocolos del marco de membrana. El conjunto antiguo de términos de energía se puede encontrar en `core/scoring/methods.`

## Referencias
Barth P, Wallner B, Baker D. (2009 Feb 3) Prediciton of membrane protein structures with complex topologies using limited constraints. Proc Natl Acad Sci U S A. 106(5):1409-14.

Barth P, Schonbrun J, Baker D. (2007 Oct 2) Toward high-resolution prediction and design of transmembrane helical protein structures. Proc Natl Acad Sci U S A. 104(40):15682-7.

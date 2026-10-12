# Incrustaciones de proteínas (RosettaMP)

[[_TOC_]]

## ¿Qué es una incrustación de proteína? 
Mientras que el residuo de membrana describe la posición y la orientación de la bicapa de membrana, necesitamos una representación más fina que describa la posición específica de los elementos del Pose en la membrana. Una **incrustación** (embedding) es la posición y la orientación (centro y normal) de ese elemento del Pose (ver imagen más abajo). Esto es especialmente aplicable al mover partes de la proteína, como compañeros de docking, tramos transmembrana, etc. 

[[rosettamp_embedding.png]]

## Representación de una incrustación en RosettaMP
Creamos un objeto EmbeddingDef que almacena el punto central y el vector normal de un elemento del Pose. También creamos un objeto Embedding que almacena varios EmbeddingDef (del mismo modo que SpanningTopology contiene Spans) y el EmbeddingDef global de todos los elementos del Pose. 

El EmbeddingDef de un tramo transmembrana individual se calcula a partir de los átomos Cα de los residuos inicial y final del tramo: el centro es el punto medio entre las coordenadas de los Cα y la normal es el vector que va del Cα inicial al Cα final. El objeto EmbeddingDef de un elemento del Pose se describe con el promedio de los centros y las normales de todos los tramos que contiene ese elemento del Pose. Por tanto, el EmbeddingDef no está conectado directamente con la bicapa de membrana, sino que describe medidas similares al primer y segundo momento de la región transmembrana, que se pueden usar para obtener una estimación inicial de la posición y orientación de la membrana que luego se puede refinar. Una gran ventaja de la representación EmbeddingDef es poder comparar directamente el centro y la normal del objeto EmbeddingDef de cada elemento del Pose con el centro y la normal de la membrana almacenados en el residuo de membrana. 

Esta representación permite implementar una estrategia de muestreo eficiente mediante Movers especializados, solo a partir del EmbeddingDef y del residuo de membrana. Además, la flexibilidad de mantener objetos EmbeddingDef por tramos transmembrana, cadenas, compañeros o proteínas completas permite adaptarse a la necesidad del protocolo, p. ej., con tramos individuales para la predicción de estructuras *ab initio*, cadenas seleccionadas para docking o proteínas completas para el refinamiento de alta resolución o el posicionamiento en el entorno de membrana.


## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press


## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))


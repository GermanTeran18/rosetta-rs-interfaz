#SEWING
El protocolo SEWING es un método para generar rápidamente esqueletos de novo que usa segmentos grandes de estructuras proteicas naturales. Para consultar las definiciones de los términos habituales de SEWING, visita el [[SEWING Dictionary]].

##Conceptos básicos
SEWING son las siglas de **S**tructure **E**xtension **WI**th **N**ative-fragment **G**raphs. SEWING funciona identificando subestructuras relativamente grandes (normalmente 2-5 piezas de estructura secundaria, llamadas segmentos) de PDB nativos y ensamblando luego esos modelos según su similitud estructural.

El flujo de trabajo siguiente corresponde a una versión actualizada de SEWING que aún no se ha publicado para los usuarios. Para consultar la documentación del protocolo SEWING publicado por TM Jacobs en un número de 2016 de Science, consulta el [[flujo de trabajo original de SEWING|Old Sewing Documentation]].


##Flujo de trabajo de SmartSEWING
1. [[Generación de archivos de segmentos|segment-file-generation]] - Extracción de unidades de estructura secundaria a partir de estructuras nativas
    
    [[Comparación estructural de subestructuras|structural-comparison-of-substructures]] ( solo SEWING con hash ) - Comparación estructural de las subestructuras entre sí mediante un algoritmo de hash geométrico
2. [[Generación de esqueletos|AssemblyMover]] - Creación de nuevos esqueletos combinando subestructuras estructuralmente similares
3. [[Refinamiento|Refinement of SEWING assemblies]] - Refinamiento de los esqueletos, diseño de cadenas laterales y selección de las estructuras generadas con SEWING

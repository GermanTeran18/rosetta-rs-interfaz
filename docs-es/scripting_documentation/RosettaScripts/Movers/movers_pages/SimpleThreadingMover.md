#SimpleThreadingMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SimpleThreadingMover

[[include:mover_SimpleThreadingMover_type]]

### Detalles
Hace el enhebrado (threading) llamando al [[MutateResidueMover]] y luego hace un reempaquetado. Opcionalmente reempaqueta los vecinos para ahorrar un paso más.

Una secuencia puede proporcionarse en uno de varios formatos, y el formato de entrada se especifica con la opción `sequence_mode`. La tabla siguiente da los modos de secuencia disponibles y muestra cómo especificar la secuencia del tetrapéptido L-aspartato, L-fenilalanina, D-triptófano, D-alanina.

| Modo de secuencia | Descripción de la secuencia de entrada | Ejemplo |
|----------|--------------------------------------------------------------------------------|----------|
| oneletter | Una cadena de códigos de aminoácidos de una letra. Los caracteres '-' adicionales indican que se omite una posición en el enhebrado. Se puede usar una 'X', seguida de un nombre base completo entre corchetes (_p. ej._ `X[ORN]`), para especificar bloques de construcción no canónicos. | DFX[DTRP]X[DALA] |
| threeletter | Una cadena de códigos de aminoácidos de tres letras, separados por comas. No debe incluirse espacio en blanco. Los caracteres '-' adicionales indican que se omite una posición en el enhebrado. Un '-' indica una posición que se omite. | ASP,PHE,DTR,DAL |
| basename | Una cadena de nombres base de aminoácidos, separados por comas. No debe incluirse espacio en blanco. Los caracteres '-' adicionales indican que se omite una posición en el enhebrado. Un '-' indica una posición que se omite. | ASP,PHE,DTRP,DALA |
| fullname | Una cadena de nombres completos de aminoácidos, incluidos los tipos variantes. Los caracteres '-' adicionales indican que se omite una posición en el enhebrado. | ASP:NtermProteinFull,PHE,DTRP,DALA:CtermProteinFull |

Por defecto son 5 rondas de empaquetado. Si la secuencia se enhebrara más allá del extremo C-terminal, el Pose devuelto tendrá la secuencia enhebrada hasta el final del Pose; no se añadirán ni modelarán residuos adicionales.

SimpleThreadingMover admite Poses simétricos.

### Resumen

Para ejecutar este protocolo solo necesitas especificar el lugar de inicio (en numeración de Rosetta o de PDB) y la secuencia.  
Analizaremos la numeración PDB en el momento de aplicar, por si hay cambios en la longitud del Pose hasta entonces. 
Pasa la opción para reempaquetar los vecinos durante el empaquetado.  

```xml
     <SimpleThreadingMover name="threader" start_position="24L" thread_sequence="TGTGT--GTGT" pack_neighbors="1" neighbor_dis="6"  pack_rounds="5"/>
```

##Véase también

* [[RosettaCM]]: protocolo completo de modelado comparativo de Rosetta
* [[HybridizeMover]]: mover más complejo para el modelado comparativo
* [[FastRelaxMover]]: la aplicación relax
* [[MutateResidueMover]]: introduce mutaciones de forma rápida y sencilla.
* [[Preparing structures]]: página sobre cómo preparar estructuras para usarlas en Rosetta mediante relax.
* [[I want to do x]]: guía para elegir un mover
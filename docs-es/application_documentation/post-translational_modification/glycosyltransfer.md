# glycosyltransfer

Actualmente, esta aplicación es un sencillo envoltorio de línea de comando del [[GlycosyltransferaseMover]]. Simula la actividad de una GT u OST virtual sobre un `Pose` añadiendo uno o varios residuos de carbohidrato en posiciones de sequon biológicamente relevantes. No realiza ningún otro paso de refinamiento ni algorítmico.

[[_TOC_]]

## Antecedentes
Muchas proteínas en la naturaleza sufren modificaciones postraduccionales, pero las estructuras depositadas suelen tenerlas ausentes o eliminadas. La glicosilación es la más frecuente de todas las modificaciones postraduccionales. La aplicación `glycosyltransfer` permite al usuario simular la acción de una enzima glicosiltransferasa (GT) u oligosacariltransferasa (OST) virtual sobre un «sustrato»: la estructura `.pdb` cargada. La transferasa virtual puede ser una transferasa biológicamente real o completamente hipotética o construida.

## Descripción
Se puede usar la aplicación `glycosyltransfer` para glicosilar rápidamente una proteína en posiciones N, O o C biológicamente relevantes, o para extender un árbol de glicanos existente, según la enzima virtual seleccionada para la aplicación. Se pueden usar otras aplicaciones, como el [[GlycanTreeModeler]], para refinar las estructuras de salida como preparación para otros protocolos.

## Opciones
**Opciones generales**

|**Grupo**|**Opción**|**Descripción**|**Tipo**|
|:-------|:-------|:--------------|:-------|
|in:path|s|Nombre del archivo `.pdb` que se va a procesar.|Cadena de texto|
|in|include_sugars|Establece si los residuos de carbohidrato se cargarán o no en Rosetta. _El valor predeterminado es false._|Booleano|
|enzymes|species|Establece el nombre de la especie de esta enzima simulada. El valor predeterminado es `h_sapiens`.|Cadena de texto|
|enzymes|enzyme|Establece el nombre de la enzima específica de esta enzima simulada. El valor predeterminado es `generic`.|Cadena de texto|
|enzymes|efficiency|Establece la eficiencia de esta enzima simulada, donde 1.0 es el 100%. El valor predeterminado se lee de la base de datos.|Real|
|out|nstruct|Número de veces que se procesa cada archivo `.pdb` de entrada.|Entero|

**Detalles**

La aplicación fallará si no se establece la opción `-include_sugars`.

Establecer el nombre de la especie limita el comportamiento de la glicosiltransferasa simulada que usa esta aplicación a las secuencias consenso utilizadas por el homólogo de la especie indicada. El nombre de la especie debe tener el formato `e_coli` o `h_sapiens` (fíjate en los guiones bajos), y debe corresponder también a un directorio de la base de datos de Rosetta, _p. ej._, `database/virtual_enzymes/glycosyltransferases/h_sapiens/`. Si no se establece, se supone `h_sapiens`.

Si se establece, la enzima simulada que usa esta aplicación utilizará los detalles enzimáticos específicos de esta reacción que están en la base de datos. Si no se ha establecido el nombre de la especie, se supone una enzima «genérica» de la familia de las glicosiltransferasas. El nombre de la enzima debe ser el que figura en un archivo de enzimas adecuado en `database/virtual_enzymes/glycosyltransferases/<species_name_>`.

La glicosiltransferasa genérica de _H. sapiens_ es una OST que transfiere α-D-Manp-(1→3)-[α-D-Manp-(1→6)]-β-D-Manp-(1→4)-β-D-GlcpNAc-(1→4)-β-D-GlcpNAc- (man3) al residuo Asn de cualquier sequon NX(S/T) de una estructura con una eficiencia del 100%.

Consulta [[EnzymaticMover#Enzyme Data Files]] para ver cómo dar formato a tus propios datos enzimáticos para otras glicosiltransferasas.

## Línea de comando de ejemplo
`glycosyltransfer -s input/1ABC.pdb -include_sugars -enzymes:species h_sapiens -enzymes:enzyme OGT -nstruct 5`

## Código y demo
La aplicación `glycosyltransfer` se encuentra en `/Rosetta/main/source/src/apps/public/post-translational_modification/glycosyltransfer.cc`.

Una demo de la aplicación `glycosyltransfer` se encuentra en `/Rosetta/main/tests/integration/tests/glycosylation/`.

## Contacto
Labonte <JWLabonte@jhu.edu>

## Véase también
- [[EnzymaticMover]]
- [[SimpleGlycosylateMover]]
- [[GlycanTreeModeler]]

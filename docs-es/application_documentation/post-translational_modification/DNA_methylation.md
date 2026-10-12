# DNA-methylation

[[_TOC_]]

## Antecedentes
Uno de los métodos de la epigenética es la metilación del ADN. Aunque técnicamente no es una «modificación postraduccional», es conceptualmente similar y por eso usa el marco [[EnzymaticMovers]] de Rosetta.

La aplicación `DNA_methylation` permite al usuario simular la acción de una enzima ADN metiltransferasa (Mtase) virtual sobre un «sustrato»: la estructura `.pdb` cargada, que contiene residuos de ADN. La transferasa virtual puede ser una transferasa biológicamente real o completamente hipotética o construida.

## Descripción
Actualmente, esta aplicación es un sencillo envoltorio de línea de comando del [[DNAMethyltransferaseMover]]. Simula la actividad de una Mtase virtual sobre un `Pose` modificando uno o varios residuos de ADN en posiciones de sequon biológicamente relevantes a un `VariantType` `METHYLATED_NA`. No realiza ningún otro paso de refinamiento ni algorítmico.

Se puede usar la aplicación `DNA_methylation` para metilar rápidamente el ADN en posiciones de nucleobases biológicamente relevantes, según la enzima virtual seleccionada para la aplicación. Se pueden usar otras aplicaciones para refinar las estructuras de salida como preparación para otros protocolos.

## Opciones
**Opciones generales**

|**Grupo**|**Opción**|**Descripción**|**Tipo**|
|:-------|:-------|:--------------|:-------|
|in:path|s|Nombre del archivo `.pdb` que se va a procesar.|Cadena de texto|
|enzymes|species|Establece el nombre de la especie de esta enzima simulada. El valor predeterminado es `h_sapiens`.|Cadena de texto|
|enzymes|enzyme|Establece el nombre de la enzima específica de esta enzima simulada. El valor predeterminado es `generic`.|Cadena de texto|
|enzymes|efficiency|Establece la eficiencia de esta enzima simulada, donde 1.0 es el 100%. El valor predeterminado se lee de la base de datos.|Real|
|out|nstruct|Número de veces que se procesa cada archivo `.pdb` de entrada.|Entero|

**Detalles**
Establecer el nombre de la especie limita el comportamiento de la metiltransferasa simulada que usa esta aplicación a las secuencias consenso utilizadas por el homólogo de la especie indicada. El nombre de la especie debe tener el formato `e_coli` o `h_sapiens` (fíjate en los guiones bajos), y debe corresponder también a un directorio de la base de datos de Rosetta, _p. ej._, `database/virtual_enzymes/DNA_methyltransferases/h_sapiens/`. Si no se establece, se supone `h_sapiens`.

Si se establece, la enzima simulada que usa esta aplicación utilizará los detalles enzimáticos específicos de esta reacción que están en la base de datos. Si no se ha establecido el nombre de la especie, se supone una enzima «genérica» de la familia de las ADN metiltransferasas. El nombre de la enzima debe ser el que figura en un archivo de enzimas adecuado en `database/virtual_enzymes/DNA_methyltransferases/<species_name_>`.

La ADN metiltransferasa genérica de _H. sapiens_ es una Mtase C5 que metila el residuo de desoxicitidina de cualquier sequon CpG de una estructura con una eficiencia del 100%.

Consulta [[EnzymaticMovers#Enzyme Data Files]] para ver cómo dar formato a tus propios datos enzimáticos para otras ADN metiltransferasas.

## Línea de comando de ejemplo
`DNA_methylation -s input/1ABC.pdb -enzymes:species h_sapiens -enzymes:efficiency 0.33 -nstruct 5`

## Código y demo
La aplicación `DNA_methylation` se encuentra en `/Rosetta/main/source/src/apps/public/post-translational_modification/DNA_methylation.cc`.

Una demo de la aplicación `DNA_methylation` se encuentra en `/Rosetta/main/tests/integration/tests/DNA_methylation/`.

## Contacto
Labonte <JWLabonte@jhu.edu>

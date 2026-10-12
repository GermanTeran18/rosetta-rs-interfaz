# Acetilación N-terminal

[[_TOC_]]

## Antecedentes
En la naturaleza, las N-acetiltransferasas terminales (NAT) se usan para acetilar el grupo amino terminal de una cadena peptídica.

La aplicación `N-terminal_acetylation` permite al usuario simular la acción de una enzima NAT virtual sobre un «sustrato»: la estructura `.pdb` cargada. La transferasa virtual puede ser una transferasa biológicamente real o completamente hipotética o construida.

## Descripción
Actualmente, esta aplicación es un sencillo envoltorio de línea de comando del [[NTerminalAcetyltransferaseMover]]. Simula la actividad de una NAT virtual sobre un `Pose` modificando el residuo N-terminal en posiciones de sequon biológicamente relevantes a un `VariantType` `ACETYLATED_NTERMINUS_VARIANT`. No realiza ningún otro paso de refinamiento ni algorítmico.

Se puede usar la aplicación `N-terminal_acetylation` para acetilar rápidamente una proteína en posiciones biológicamente relevantes, según la enzima virtual seleccionada para la aplicación. Se pueden usar otras aplicaciones para refinar las estructuras de salida como preparación para otros protocolos.

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
Establecer el nombre de la especie limita el comportamiento de la acetiltransferasa simulada que usa esta aplicación a las secuencias consenso utilizadas por el homólogo de la especie indicada. El nombre de la especie debe tener el formato `e_coli` o `h_sapiens` (fíjate en los guiones bajos), y debe corresponder también a un directorio de la base de datos de Rosetta, _p. ej._, `database/virtual_enzymes/N-terminal_acetyltransferases/h_sapiens/`. Si no se establece, se supone `h_sapiens`.

Si se establece, la enzima simulada que usa esta aplicación utilizará los detalles enzimáticos específicos de esta reacción que están en la base de datos. Si no se ha establecido el nombre de la especie, se supone una enzima «genérica» de la familia de las ADN metiltransferasas. El nombre de la enzima debe ser el que figura en un archivo de enzimas adecuado en `database/virtual_enzymes/DNA_methyltransferases/<species_name_>`.

La N-acetiltransferasa terminal genérica de _H. sapiens_ acetila cualquier extremo N-terminal con una eficiencia del 100%.

Consulta [[EnzymaticMovers#Enzyme Data Files]] para ver cómo dar formato a tus propios datos enzimáticos para otras N-acetiltransferasas terminales. (Ten en cuenta que el sequon de una enzima virtual N-terminal debe empezar con `<`, como en `<(A/S/T/C)`; de lo contrario, el `Mover` recorrerá innecesariamente toda la secuencia del `Pose`.)

## Línea de comando de ejemplo
`N-terminal_acetylation -s input/1ABC.pdb -enzymes:species h_sapiens -enzymes:efficiency 0.50 -nstruct 3`

## Código y demo
La aplicación `N-terminal_acetylation` se encuentra en `/Rosetta/main/source/src/apps/public/post-translational_modification/N-terminal_acetylation.cc`.

Una demo de la aplicación `N-terminal_acetylation` se encuentra en `/Rosetta/main/tests/integration/tests/N-terminal_acetylation/`.

## Contacto
Labonte <JWLabonte@jhu.edu>

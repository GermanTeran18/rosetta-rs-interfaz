# phosphorylation

Actualmente, esta aplicación es un sencillo envoltorio de línea de comando del [[KinaseMover]]. Simula la actividad de una quinasa virtual sobre un `Pose` modificando uno o varios residuos en posiciones de sequon biológicamente relevantes a un `VariantType` `PHOSPHORYLATION`. No realiza ningún otro paso de refinamiento ni algorítmico.

[[_TOC_]]

## Antecedentes
Muchas proteínas en la naturaleza sufren modificaciones postraduccionales, pero las estructuras depositadas suelen tenerlas ausentes o eliminadas. Las quinasas son enzimas que transfieren un grupo fosfato del ATP a un péptido o proteína sustrato. La aplicación `phosphorylation` permite al usuario simular la acción de una enzima quinasa virtual sobre un «sustrato»: la estructura `.pdb` cargada. La fosforilación virtual puede ser una transferencia biológicamente real o completamente hipotética o construida.

## Descripción
Se puede usar la aplicación `phosphorylation` para fosforilar rápidamente una proteína en posiciones O biológicamente relevantes, según la enzima virtual seleccionada para la aplicación. Se pueden usar otras aplicaciones para refinar las estructuras de salida como preparación para otros protocolos.

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

Establecer el nombre de la especie limita el comportamiento de la quinasa simulada que usa esta aplicación a las secuencias consenso utilizadas por el homólogo de la especie indicada. El nombre de la especie debe tener el formato `e_coli` o `h_sapiens` (fíjate en los guiones bajos), y debe corresponder también a un directorio de la base de datos de Rosetta, _p. ej._, `database/virtual_enzymes/kinases/h_sapiens/`. Si no se establece, se supone `h_sapiens`.

Si se establece, la enzima simulada que usa esta aplicación utilizará los detalles enzimáticos específicos de esta reacción que están en la base de datos. Si no se ha establecido el nombre de la especie, se supone una enzima «genérica» de la familia de las quinasas. El nombre de la enzima debe ser el que figura en un archivo de enzimas adecuado en `database/virtual_enzymes/kinases/<species_name_>`.

La quinasa genérica de _H. sapiens_ es una quinasa muy promiscua que transfiere un grupo fosfato a cualquier residuo Ser o Thr de una estructura con una eficiencia del 100%.

Consulta [[EnzymaticMover#Enzyme Data Files]] para ver cómo dar formato a tus propios datos enzimáticos para otras quinasas.

## Línea de comando de ejemplo
`phosphorylation -s input/2DEF.pdb -nstruct 1`

## Código y demo
La aplicación `phosphorylation` se encuentra en `/Rosetta/main/source/src/apps/public/post-translational_modification/phosphorylation.cc`.

Una demo de la aplicación `phosphorylation` se encuentra en `/Rosetta/main/tests/integration/tests/phosphorylation/`.

## Contacto
Labonte <JWLabonte@jhu.edu>

## Véase también
- [[EnzymaticMover]]

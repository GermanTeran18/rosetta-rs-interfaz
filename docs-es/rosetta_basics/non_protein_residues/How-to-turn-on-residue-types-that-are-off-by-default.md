# Cómo activar los tipos de residuo que están desactivados por defecto
Documentación de Vikram K. Mulligan, laboratorio Baker (vmullig@uw.edu).  Creada el 14 de marzo de 2014.  Actualizada el 20 de febrero de 2019.

## Resumen breve
Aunque casi todos los tipos de residuo presentes en la base de datos de Rosetta se cargan por defecto, unos pocos no.  Además, al hacer diseño, Rosetta no permite por defecto diseñar con todos los tipos de residuo cargados.  Esta página documenta cómo cargar nuevos tipos de residuo en Rosetta y cómo diseñar con ellos.

## Casos de uso
Normalmente, un usuario tendría tres casos de uso:
* El usuario quiere trabajar con residuos de aminoácidos canónicos, iones inorgánicos comunes o ácidos nucleicos convencionales.  En este caso, Rosetta debería funcionar «de fábrica»; es decir, el usuario debería poder cargar un PDB que contenga estos elementos y hacer que Rosetta lo interprete correctamente.
* El usuario quiere trabajar con uno o dos residuos no canónicos o ligandos además del conjunto habitual.  En este caso, lo más sencillo es especificar la ruta a un archivo `.params` con las opciones **-extra_res <path/filename>** o **-extra_res_fa <path/filename>**.  (La segunda es para archivos `.params` de todos los átomos.)
* El usuario quiere trabajar con un conjunto de residuos no canónicos y quiere que se carguen por defecto.  En este caso, debe editar el archivo **database/chemical/residue_type_sets/fa_standard/residue_types.txt** y quitar el comentario de las líneas de los archivos `.params` que definen los tipos de residuo que quiere usar.

Para diseñar con algo más allá de los 20 residuos de aminoácidos canónicos, consulta la documentación de los [[PackerPalettes|PackerPalette]].

## Véase también

* Notas sobre los [[archivos params|Residue Params file]], para añadir nuevos tipos de residuo que no estén ya en la base de datos de Rosetta.
* [[Guías para entradas que no son proteínas|non-protein-residues]]: notas sobre cómo trabajar con [[aminoácidos no canónicos|Noncanonical Amino Acids]], [[metales|Metals]], [[carbohidratos|Carbohydrates]], _etc._

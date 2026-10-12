#Convertidor de tipos de residuo

Metadatos
========

Este documento fue editado el 2 de julio de 2019 por Rocco Moretti. Esta aplicación fue creada y documentada por Rocco Moretti, et al.

Descripción del algoritmo
========================

Rosetta admite varias formas distintas de especificar la estructura química de un residuo. 
Algunas de ellas (sobre todo el formato de archivo params, específico de Rosetta) no son compatibles con otros programas.

La aplicación `restype_converter` puede tomar estas entradas y convertirlas entre formatos.

Limitaciones y advertencias
=======================

La salida de tipos de residuo de Rosetta no es necesariamente completa por el momento. 
No hay garantía de que puedas hacer un viaje de ida y vuelta con un residuo determinado usando la aplicación restype_converter.
(Ni siquiera hay garantía de que Rosetta pueda leer los archivos que él mismo produce.)

Dicho esto, la salida en formato params debería ser funcionalmente completa y probablemente permita el viaje de ida y vuelta, aunque puede haber diferencias de representación entre un archivo params de salida y uno de entrada.

Por ahora, la salida en formato PDB y SDF sirve principalmente para la información de átomos, enlaces y coordenadas. Debería bastar para obtener algo como un archivo legible por PyMol, aunque la utilidad para otros casos puede variar.

Entrada
=====

La aplicación restype_converter no usa la maquinaria estándar del distribuidor de trabajos de Rosetta y, por tanto, no obedece las opciones normales de entrada o salida.

Por defecto, el convertidor trabaja con tipos de residuo de todos los átomos (full atom). Si quieres trabajar con tipos centroid, añade la opción `-in:file:centroid`. (Para los tipos cenrot, usa `-cenrot`.)

Las siguientes opciones sirven para especificar qué tipos de residuo se deben convertir:

|**Opción**|**Descripción**|
|:-------|:--------------|
|-restype_convert:types | Una lista de nombres de tipos de residuo que se tomarán de la base de datos estándar. Puede admitir nombres con parches. |
|-restype_convert:name3 | Una lista de códigos de tres letras que se tomarán de la base de datos estándar. Si más de un residuo comparte el mismo código de tres letras, se generarán todos. (Aunque es probable que no genere los tipos con parches.)|
|-extra_res_fa | Una lista de [[Residue Params file]]s de Rosetta que se convertirán. (No se usa si `-in:file:centroid` o `-cenrot` están activos.) |
|-extra_res_cen | Una lista de [[Residue Params file]]s de Rosetta que se convertirán. (Solo se usa si `-in:file:centroid` está activo.) |
|-extra_res_mol | Una lista de archivos SDF/Mol que se convertirán. (Se usa tanto en centroid como en full atom.)|
|-extra_res_mmCIF | Una lista de archivos de ligandos en formato CIF que se convertirán. (Se usa tanto en centroid como en full atom.)|

Si quieres cargar un tipo de residuo desde el archivo Chemical Components Dictionary que proporciona Rosetta, simplemente añade el prefijo `pdb_` al código de tres letras y úsalo con `-restype_convert:types`.
(Por ejemplo, para cargar el residuo TTL del CCD, pasa `-types pdb_TTL` a la aplicación restype_convert.)

Salida
===============

Por defecto, la salida se escribe en el directorio actual. Puedes controlar la ruta de la salida con `-out:path:all`.

Por defecto, los archivos se nombran con el nombre completo del tipo de residuo (incluidos los parches). Puedes usar `-out:prefix` y `-out:suffix` para decorar aún más la salida.
(Actualmente no existe un tratamiento especial para la detección de nombres duplicados.)

El formato de salida se controla con las siguientes opciones booleanas. (Se pueden añadir varias opciones para obtener varios formatos de salida en una sola ejecución.)

|**Opción**|**Descripción**|**Extensión usada**|
|:-------|:--------------|:------------------|
|-out:pdb| Formato PDB, un solo residuo | .pdb |
|-restype_convert:params_out| [[Residue Params file]] de Rosetta | .params |
|-restype_convert:sdf_out| SDF | .sdf |

(Actualmente no hay salida en mmCIF disponible.)

Líneas de comandos
====================

Comando de ejemplo:

```
restype_convert.linuxgccrelease -restype_convert:types TRP:NtermProteinFull  -restype_convert:name3 CYS -extra_res_fa my_type.params -out:pdb -restype_convert:sdf_out 
```

Ejemplo
=======

Consulta la prueba de integración en `rosetta/main/tests/integration/tests/restype_converter` para ver un ejemplo.


##Véase también

* [[Residue Params file]]: documentación sobre el formato de archivo params de Rosetta
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta

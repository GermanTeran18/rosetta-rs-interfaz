#La aplicación de utilidad dump_capped_residue

Metadatos
========

Autor: Andrew Watkins (amw579@stanford.edu)

Última actualización: 4 de julio de 2017; IP: Rhiju Das (rhiju@stanford.edu).

Código y demostración
=============

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/dump_capped_residue.cc       `
-   Algunas pruebas de integración dependen de dump_capped_residue, entre ellas: 
`        rosetta/main/tests/integration/tests/farfar_mrna       `
`        rosetta/main/tests/integration/tests/read_polymeric_components       `

Propósito de la aplicación
===========================================

Exportar un archivo PDB de un residuo dado, que se puede especificar mediante la nomenclatura de Rosetta (es decir, el nombre base seguido de una lista de parches separados por dos puntos).

Archivos de entrada
===========

BuildPeptide no requiere archivos de entrada concretos.

Opciones
=======

|Opción|Descripción|Tipo|
|----|-----------|----|
|-dumper:residue_name|Nombre completo o base del residuo deseado|string|
|-nopatch|(opcional) Si es verdadero, no añade grupos de protección terminales poliméricos|bool|
|-fiveprime|(opcional) Si es ARN, añade la variante FIVEPRIME_CAP y además instancia una 7-metil guanosina, y luego optimiza la geometría conectada.|bool|

Consejos
====

Es una gran idea ejecutar esta aplicación mientras construyes un archivo params para un nuevo tipo de residuo, para poder visualizar su aspecto. Por último, puede que quieras usar esta aplicación para preparar un archivo PDB con grupos de protección terminales para una optimización cuántica (QM).

Salidas esperadas
================

La salida de una ejecución de dump_capped_residue es un archivo en formato PDB del residuo en una conformación extendida con todos los átomos. 

## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página de inicio de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.


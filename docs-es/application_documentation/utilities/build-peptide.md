#La aplicación de utilidad BuildPeptide

Metadatos
========

Autor: Barak Raveh

Última actualización el 24 de julio de 2011; investigadora principal: Ora Schueler-Furman (oraf@ekmd.huji.ac.il).

Código y demo
=============

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/flexpep_docking/BuildPeptide.cc       `
-   Para ver una demostración de una ejecución básica de la aplicación de utilidad BuildPeptide, consulta `        rosetta/main/tests/integration/tests/BuildPeptide       `

Propósito de la aplicación
===========================================

Construir una estructura extendida de péptido o proteína a partir de un archivo FASTA (para ayudar a preparar la entrada del protocolo de docking de péptidos, etc.).

Archivos de entrada
===========

BuildPeptide requiere como entrada un archivo fasta en formato estándar.

Opciones
=======

|Opción|Descripción|Tipo|
|----|-----------|----|
|-in:file:fasta|Archivo FASTA con la secuencia del péptido|string|
|-out:file:o|nombre del archivo PDB de salida|string|
|-helix|(opcional) Crea un péptido helicoidal en lugar de extendido|bool|
|-phi|(avanzada) Especifica el ángulo phi de la cadena principal que se repite, por defecto -135.0|real|
|-psi|(avanzada) Especifica el ángulo psi de la cadena principal que se repite, por defecto 135.0|real|

Consejos
====

```
 BuildPeptide.{ext} -database ${mini_db} -in:file:fasta input.fasta -out:file:o peptide.pdb
```

Salidas esperadas
================

La salida de una ejecución de BuildPeptide es un archivo en formato PDB del péptido en una conformación extendida de todos los átomos. Los rotámeros de las cadenas laterales son arbitrarios. Se puede usar, por ejemplo, para crear una estructura inicial para una ejecución ab initio de [[FlexPepDock|flex-pep-dock]].

## Véase también

* [[Utility applications | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: Página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.

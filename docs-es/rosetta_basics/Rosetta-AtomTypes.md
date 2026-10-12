RosettaAtomTypes
================

La función de energía de Rosetta tiene su propia idea de los «tipos» de átomos. (Es decir, qué átomos son similares en cuanto a su comportamiento en la función de energía de Rosetta.) 
Aunque hay similitudes entre el esquema de tipos de átomos que usa Rosetta y los de otros paquetes, también hay diferencias.

Ciertas entradas de Rosetta también hacen referencia a tipos de átomos, a menudo para permitir representaciones ambiguas. 
(Por ejemplo, el [[formato de archivo de restricciones de Enzdes/Matcher|match-cstfile-format]] permite especificar restricciones basadas en tipos de átomos en lugar de nombres de átomos, para permitir una especificación ambigua:
en modo de todos los átomos (fullatom), los dos oxígenos del carboxilato de ASP ('OD1' y 'OD2') se tipifican ambos como 'OOC', y el nitrógeno de la cadena lateral de ASN ('ND2') y de GLN ('NE2') tienen el tipo de Rosetta 'NH2O'.

Determinación de los tipos de átomos de Rosetta
=============================

Los tipos de átomos de Rosetta se especifican en el «[[archivo .params|Residue-Params-file]]» de ese residuo. Para los tipos de residuos estándar (p. ej., los aminoácidos), esos archivos params están en la base de datos de Rosetta, en `main/database/chemical/residue_type_sets/`. 

Los tipos de átomos se especifican en las líneas ATOM:

        ATOM  N   Nbb  NH1  -0.47  -0.350
        ATOM  CA  CAbb CT1   0.07   0.100
        ATOM  C   CObb C     0.51   0.550
        ATOM  O   OCbb O    -0.51  -0.550

La primera columna después del especificador ATOM es el nombre del átomo, y la segunda columna (Nbb/CAbb/etc.) es el tipo de átomo de Rosetta. La tercera columna (NH1/CT1/C/O) es el tipo de átomo de mecánica molecular de CHARMM, que Rosetta no usa por defecto, pero que leen ciertos términos de energía especializados (los términos «MM»). (La cuarta y la quinta columnas son cargas parciales.) 

Todos los átomos
=========

En el modo de todos los átomos (full atom), están presentes todos los átomos.

Aminoácidos
-----------

[[images/RosettaAtomTypes_fa_bb.png]]

[[images/RosettaAtomTypes_fa_aa.png]]

<!--- BEGIN_INTERNAL -->
*(Los archivos originales de ChemDraw de estas figuras están en el directorio images, por si quieres ajustarlas.)*
<!--- END_INTERNAL -->

Moléculas pequeñas y otros compuestos
-----------------------------------

Los tipos de átomos de Rosetta están centrados en la representación de residuos de aminoácidos y parametrizados para ella. Al representar residuos que no son proteínas, los tipos de residuo centrados en proteínas suelen reutilizarse según heurísticas basadas en la estructura de la molécula pequeña.

Examina el archivo params de tu molécula pequeña para ver los detalles de cómo se tipifican los átomos.

Centroid
========

El modo centroid usa un modelo de «átomo unido» (United Atom), en el que los hidrógenos apolares se fusionan con el átomo pesado al que están unidos. (Aunque los hidrógenos polares se conservan para calcular los enlaces de hidrógeno.)

Además, las cadenas laterales de las proteínas se fusionan en un único «superátomo» 'CEN'.

Aminoácidos
-----------

[[images/RosettaAtomTypes_cen.png]]

<!--- BEGIN_INTERNAL -->
*(El archivo original de ChemDraw de esta figura está en el directorio images, por si quieres ajustarla.)*
<!--- END_INTERNAL -->

##Véase también

* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Funciones de puntuación y términos de energía|score-types]]
* [[Solving a Biological Problem]]: Guía para aplicar Rosetta a tu problema biológico

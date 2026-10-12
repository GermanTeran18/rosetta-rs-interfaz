#SID_ERMS_Rescore

Nombre: SID_ERMS_Rescore

Metadatos
=========

Método, código y documentación por Robert Bolz (bolz.13@osu.edu). El investigador principal fue Steffen Lindert (lindert.1@osu.edu). Última actualización: enero de 2025, por Robert Bolz. 

Código y demo
=============

La aplicación se encuentra en Rosetta/main/source/src/apps/public/analysis/SID_ERMS_Rescore.cc. Más abajo se puede encontrar un tutorial para usar la aplicación.

Primero hay que generar las subunidades, ya sea con Alphafold2 o a partir de la estructura de la subunidad en el PDB. Luego las subunidades deben acoplarse con RosettaDock (detallado en la sección de métodos) para generar 10,000 modelos. A partir de ahí, SID_ERMS_Rescore se puede ejecutar sobre esos 10,000 modelos acoplados. 
Esta aplicación depende de la aplicación de predicción de ERMS, SID_ERMS_prediction, para simular los datos de ERMS. Por lo tanto, todas las restricciones de archivos de esa aplicación siguen aplicándose a esta para simular correctamente los datos de ERMS. Consulta el tutorial ubicado en la sección suplementaria de esa publicación1 y la página de documentación de Rosetta para más información sobre la aplicación SID_ERMS_prediction, https://www.rosettacommons.org/docs/latest/application_documentation/Application-Documentation/SID_ERMS_prediction.

Opciones de entrada de la aplicación SID_ERMS_Rescore:
-in:file:l: para indicar tus modelos para el nuevo cálculo de puntuación. Debe ser una lista de rutas de archivo de tus archivos pdb. 
-ERMS: los datos experimentales de ERMS que se usarán en el nuevo cálculo de puntuación. Debe ser un archivo separado por tabuladores (.tsv).
-RMSE: opción booleana para calcular el RMSE. (Se usa en la parte SID_ERMS_prediction1 de la aplicación; véase https://www.rosettacommons.org/docs/latest/application_documentation/Application-Documentation/SID_ERMS_prediction).
-complex_type: archivo que describe las interfaces del complejo (se usa en la parte SID_ERMS_prediction de la aplicación; para ver archivos de ejemplo e instrucciones de formato, véase https://www.rosettacommons.org/docs/latest/application_documentation/Application-Documentation/SID_ERMS_prediction).
-out:file:o: opción para especificar el nombre y la ubicación del archivo de salida. El archivo contendrá el nombre del archivo, la puntuación original de la estructura (con la función de puntuación ref152) y el valor de la nueva puntuación del complejo. 

Comando de ejemplo: 
*Rosetta path*/main/source/bin/SID_ERMS_Rescore.default.linuxgccrelease 
	-in:file:l *file containing list of paths to pdb files* 
        -complex_type *path to complex type file*
	-ERMS *path to tsv file*
	-RMSE
	-out:file:o *name of output file*

Salida: el archivo de salida contendrá cuatro datos. El nombre de los archivos de entrada de la aplicación, el RMSE de la predicción de ERMS, la puntuación de las estructuras de entrada (de la función de puntuación ref15) y los valores de la nueva puntuación usando los datos de ERMS. 


Referencias
===========

1.	Seffernick, J. T. et al. Simulation of energy-resolved mass spectrometry distributions from surface-induced dissociation. Anal. Chem. 94, 10506–10514 (2022).
2.	Alford, R. F. et al. The Rosetta all-atom energy function for macromolecular modeling and design. J. Chem. Theory Comput. 13, 3031–3048 (2017).

Para la parte SID_ERMS_prediction de la aplicación, para ver archivos de ejemplo e instrucciones de formato, véase https://www.rosettacommons.org/docs/latest/application_documentation/Application-Documentation/SID_ERMS_prediction).

Propósito
=========

Esta aplicación vuelve a calcular la puntuación y ordena las estructuras PDB de entrada usando datos de SID-ERMS

Archivos de entrada
===================

-in:file:l: para indicar tus modelos para el nuevo cálculo de puntuación. Debe ser una lista de rutas de archivo de tus archivos pdb. 
-ERMS: los datos experimentales de ERMS que se usarán en el nuevo cálculo de puntuación. Debe ser un archivo separado por tabuladores (.tsv).
-complex_type: archivo que describe las interfaces del complejo (se usa en la parte SID_ERMS_prediction de la aplicación; para ver archivos de ejemplo e instrucciones de formato, véase https://www.rosettacommons.org/docs/latest/application_documentation/Application-Documentation/SID_ERMS_prediction).

Opciones
========

-RMSE: opción booleana para calcular el RMSE. (Se usa en la parte SID_ERMS_prediction1 de la aplicación; véase https://www.rosettacommons.org/docs/latest/application_documentation/Application-Documentation/SID_ERMS_prediction).
-out:file:o: opción para especificar el nombre y la ubicación del archivo de salida. El archivo contendrá el nombre del archivo, la puntuación original de la estructura (con la función de puntuación ref15) y el valor de la nueva puntuación del complejo. 


Salidas esperadas
=================

El archivo de salida contendrá cuatro datos. El nombre de los archivos de entrada de la aplicación, el RMSE de la predicción de ERMS, la puntuación de las estructuras de entrada (de la función de puntuación ref15) y los valores de la nueva puntuación usando los datos de ERMS. 


Novedades desde la última versión
=================================
Esta es la primera versión.

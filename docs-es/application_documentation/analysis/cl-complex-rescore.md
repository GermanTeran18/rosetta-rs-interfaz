Nombres de los creadores:

Zachary Drake (drake.463@osu.edu)
Investigador principal: Steffen Lindert (lindert.1@osu.edu)
Actualizado: 26 de marzo de 2025

Usa los cambios en los datos de marcaje covalente (CL) de residuos obtenidos por espectrometría de masas para penalizar los decoys generados por RosettaDock, prediciendo cambios de modificación a partir de las distancias en la interfaz. Se desarrolló para complementar la función de puntuación REF15 y cuantificar la concordancia de los complejos de docking con los datos de CL.

Referencia: https://www.nature.com/articles/s41467-022-35593-8

## Descripción del algoritmo
Esta aplicación está diseñada para volver a puntuar grandes conjuntos de modelos de docking con datos diferenciales de marcaje covalente, con el fin de mejorar la calidad del modelo con mejor puntuación. La aplicación se puede usar, por ejemplo, para generar la estructura de un complejo proteico de interés que se ha estudiado mediante marcaje covalente pero que no tiene una estructura cristalográfica disponible.

El tutorial completo está disponible en la información suplementaria (SI) del artículo original.
## Uso
Para usar la aplicación, se pueden especificar las siguientes opciones de línea de comandos:
```
-in:file:l         #file listing PDBs of docked complexes
-cl_data           #file containing per-residue labeling data. Formatting is specified in later section
-interface         #chains comprising each docking partner with '_' indicating the interface
```
### Ejemplo
```
cl_complex_rescore.default.linuxgccrelease -in:file:l pdblist.txt -cl_file insulin_data.txt -interface ABCDEFGH_IJKL
```
## Formato del CL de entrada
El archivo de texto debe contener una lista separada por tabuladores de cada residuo marcado y del grado de modificación de cada residuo marcado, tanto en el estado no unido como en el unido, además de la(s) cadena(s) en que se encuentra el residuo. La primera columna debe indicar el número de secuencia de cada residuo (Nota: numera los residuos tratando el primer residuo de cada cadena como la posición 1). La segunda y la tercera columna deben contener la tasa de modificación (u otra métrica de modificación) del estado no unido y del estado unido del complejo, respectivamente. La cuarta columna debe contener cada cadena en la que se encuentra el residuo (sin espacios).
### Ejemplo
```
#ResidueIndex   UnboundModif.  BoundModif.   Chains
7                   56.4          34.7       ACEGIK 
8                   56.4          34.7       ACEGIK 
10                  56.4          34.7       ACEGIK 
13                  56.4          34.7       ACEGIK 
14                  56.4          34.7       ACEGIK 
19                  56.4          34.7       ACEGIK 
1                   1.4           0.4        BDFHJL 
5                   14.9          7.6        BDFHJL 
7                   14.9          7.6        BDFHJL 
10                  14.9          7.6        BDFHJL 
```
## Salida
Tras ejecutar la aplicación correctamente, se genera un archivo «cl_complex_score.out». La primera columna especifica el modelo, la segunda columna es la penalización bruta del modelo (antes de normalizar y sin ponderar) y la tercera columna es la penalización ponderada y normalizada. 
### Ejemplo
Ejemplo de archivo de salida:
```
Model                              Raw_Penalty      Weighted_CL_Score_Term
input_files/model_00001.pdb          7.71483               12.2308
input_files/model_00002.pdb          7.48138               11.8607
... 
input_files/model_10000.pdb          7.00656               11.108
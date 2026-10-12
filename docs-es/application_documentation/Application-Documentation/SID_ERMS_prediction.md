#Predicción de SID ERMS

Metadatos
========
Método, código y documentación de Justin Seffernick (seffernick.9@osu.edu).
El investigador principal fue Steffen Lindert (lindert.1@osu.edu).
Última actualización en mayo de 2022, por Justin Seffernick. 

Código
=============
La aplicación se encuentra en `       Rosetta/main/source/src/apps/public/analysis/SID_ERMS_prediction.cc      `.
En la referencia de abajo hay un tutorial para usar la aplicación.

Referencias
==========
Seffernick, J.T.; Turzo, S.M.B.A.; Harvey, S.R.; Kim, Y.; Marciano, S.; Wysocki, V.H.; and Lindert, S. Simulation of energy-resolved mass spectrometry distributions from surface-induced dissociation. *In preparation*. 2022.


Propósito
==========
Aplicación para predecir datos de espectrometría de masas (MS) de disociación inducida por superficie (SID) a partir de la estructura de un complejo proteico. En SID, los complejos se rompen en subunidades mediante colisión con una superficie a distintas energías en el marco del laboratorio. A partir de estos experimentos se predicen datos de espectrometría de masas resuelta en energía (ERMS). Los gráficos de ERMS muestran la intensidad relativa de cada subcomplejo en función de la energía de aceleración de SID. Esta aplicación se puede usar para predecir los datos necesarios para crear esos gráficos.

Algoritmo
==========
El algoritmo funciona asignando una probabilidad de ruptura a cada interfaz del complejo proteico, que depende de la energía de aceleración y de la fuerza de la interfaz (que se introduce directamente con la opción B_vals o se obtiene de la estructura pdb). Con base en estas probabilidades, se simulan 1000 rupturas (luego se promedian) para cada energía de aceleración (los rangos se pueden introducir directamente o determinarse automáticamente según la fuerza de las interfaces). Los subcomplejos resultantes se cuentan y se normalizan para determinar las intensidades relativas de cada uno, y se escriben los datos de la predicción de ERMS. Si se conocen datos experimentales de ERMS, también se puede calcular una comparación del error cuadrático medio (RMSE) de la predicción. El tipo de complejo (es decir, las interfaces del complejo) debe introducirse con la opción `       -complex_type      `. Más abajo se pueden encontrar más detalles.

Archivos de entrada
==========
-   Archivo de tipo de complejo. Este archivo es obligatorio e indica a la aplicación el estado oligomérico, la conectividad y la posible simetría del complejo de interés. La primera línea del archivo contiene los identificadores de cadena del complejo, separados por espacios en blanco. Cada una de las líneas siguientes contiene definiciones de interfaces. Cada línea representa un tipo de interfaz (todas las entradas de una línea son simétricas y también se separan por espacios en blanco). Cada interfaz se define como la primera cadena + guion bajo + la segunda cadena. Por ejemplo, una interfaz entre las cadenas A y B se indicaría como A_B. 
A continuación se muestra un ejemplo de un pentámero C5:
```
A B C D E
A_B B_C C_D D_E E_A
```
A continuación se muestra un ejemplo de un tetrámero D2:
```
A B C D
A_B C_D
A_D B_C
A_C B_D 
```
-   Archivo PDB o archivo `       -B_vals      ` (se debe proporcionar uno de los dos). Para calcular las curvas de probabilidad usadas en la simulación, el algoritmo necesita valores de punto medio de la probabilidad (valores B). Esto se puede hacer con una entrada directa (usando la opción `       -B_vals      ` para introducir un archivo) o a partir de un archivo PDB. Al usar la opción `       -B_vals      `, el archivo debe contener un valor B por línea, correspondiente a cada tipo de interfaz del archivo de tipo de complejo descrito arriba.
-   Archivo de ERMS experimental o de valores de energía de aceleración (opcional). Para simular el ERMS se necesitan energías de aceleración (los valores x de los gráficos de ERMS). La aplicación puede determinarlas automáticamente, o se pueden introducir en un archivo con la opción `       -ERMS      `. Además, se puede calcular el RMSE (comparación con el experimento) a partir de una entrada de ERMS completa usando el mismo archivo. Para introducir un archivo (separado por espacios en blanco), la primera columna contiene las energías de aceleración. Si se indica la opción `       -RMSE      `, en el resto del archivo puedes proporcionar las intensidades relativas experimentales de cada tipo de subcomplejo (datos de ERMS completos). La segunda columna es el precursor (el complejo completo), la tercera es precursor-1 (el complejo completo menos un monómero), y así sucesivamente hasta que la última columna es el monómero.

Opciones
==========
-   `       -complex_type      ` (archivo): archivo usado para especificar estados oligoméricos, conectividad y simetría (véase la sección Archivos de entrada para más detalles).
-   `       -RMSE      ` (bool): ¿calcular el RMSE respecto del ERMS experimental? Por defecto = false. Ten en cuenta que el valor de RMSE se imprime en pantalla si se calcula.
-   `       -ERMS      ` (archivo): archivo para introducir las energías de aceleración o el ERMS completo (para la comparación de RMSE) (véase la sección Archivos de entrada para más detalles).
-   `       -B_vals      ` (archivo): archivo para introducir manualmente los valores B de cada tipo de interfaz. (Si no se proporciona, usa `       -in:file:s      ` para introducir la estructura PDB) (véase la sección Archivos de entrada para más detalles).
-   `       -steepness      ` (real): opción para introducir manualmente la pendiente de la curva de probabilidad. Se recomienda encarecidamente usar los valores por defecto (y no usar esta opción), pero se pueden anular con ella.
-   `       -breakage_cutoff      ` (real): opción para determinar la energía de aceleración de SID (unidad: eV) a partir de la cual se permite que ocurra la ruptura (0 eV por defecto).
-   `       -out:file:o      ` (cadena): nombre del archivo en el que se escribe el ERMS predicho. Si no se proporciona, por defecto es `       ERMS_prediction.tsv      ` (mismo formato que la entrada de ERMS).

Consejos
==========
Si simulas el ERMS a partir de la estructura, asegúrate de que el PDB de entrada coincida con la definición del complejo. Si las interfaces se definen como simétricas, la simulación calculará B solo para la primera interfaz de esa definición. Sin embargo, la aplicación realiza una comprobación de tamaño y, si las interfaces definidas como simétricas varían en tamaño en más de un 10%, se imprime una advertencia. Para evitarlo (o para calcular B por separado y a propósito para cada interfaz), basta con modificar el archivo complex_type definiendo las interfaces en líneas distintas.  
Por ejemplo, para quitar la simetría del primer tipo de interfaz de la definición de simetría D2 (arriba, donde A_B y C_D se definían como simétricas), cambia el archivo de la siguiente manera:
```
A B C D
A_B 
C_D
A_D B_C
A_C B_D 
```

Salidas esperadas
==========
La aplicación mostrará información útil en pantalla (por ejemplo, los valores B de cada interfaz). Presta atención a la advertencia de simetría (véase el consejo anterior para quitar la simetría definida). Si se calcula el RMSE, ese valor se imprime en pantalla. Se crea un archivo con el ERMS predicho para cada simulación (véase `       -out:file:o      ` en las opciones de arriba).

Novedades desde la última versión
==========
Esta es la primera versión.
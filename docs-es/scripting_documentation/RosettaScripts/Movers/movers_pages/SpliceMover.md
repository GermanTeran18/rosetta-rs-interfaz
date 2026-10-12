# Splice
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Splice

**Este es un mover de desarrollo (Devel); sin embargo, se dividió en distintos movers que ahora están en la versión publicada.**

Es un mover bastante complicado con varias formas distintas de operar:

-   1. dado un Pose fuente: empalma segmentos del Pose fuente en el Pose actual y lo cierra con ccd. Se usa con las opciones from\_res to\_res o con task_operations. Genera un archivo de base de datos con los datos de ángulos diedros del segmento empalmado.
-   2. dado un archivo de base de datos: empalma segmentos de la base de datos. Si entry se deja en 0, empalma entradas al azar.
-   3. dado un archivo de base de datos y un archivo de plantilla: empalma segmentos de la base de datos. El residuo de inicio y el de fin en la base de datos se mapean sobre la plantilla en lugar de sobre el Pose fuente.
-   4. ccd activado o desactivado: obviamente, ccd consume mucho tiempo.

```xml
<Splice name="&string" from_res="(&integer)" to_res="(&integer)" source_pdb="(&string)" scorefxn="(score12 &string)" ccd="(1 &bool)" res_move="(4 &integer)" rms_cutoff="(99999&real)" task_operations="(&comma-delimited list of taskoperations)" torsion_database="(&string)" database_entry="(0&int)" template_file="(''&string)" thread_ala="(1&bool)" equal_length="(0&bool)"/>
```

-   from\_res: residuo inicial en el PDB diana
-   to\_res: residuo final en el PDB diana
-   source\_pdb: nombre del archivo PDB desde el que se empalma
-   ccd: ¿cerrar la rotura de cadena al final?
-   res\_move: ¿cuántos residuos se mueven durante ccd? Se permitirá mover 3 residuos flanqueantes fuera del segmento insertado y el resto se moverá dentro del segmento; así, si especificas 5, tendrás 3 flanqueantes y 2 residuos dentro del segmento en cada extremo.
-   rms\_cutoff: desplazamiento medio permitido de los átomos Calpha respecto al PDB fuente. Si el desplazamiento medio supera este límite, el mover fijará su estado en fallo y no se generará salida.
-   task\_operations: fija qué residuos se empalmarán. Simplemente recorre todos los residuos diseñables según la task-factory, toma el mínimo y el máximo y empalma la sección intermedia (inclusive). Lógicamente esto sustituye a from\_res/to\_res, por lo que task\_operations no puede definirse a la vez que estos. Estas task\_operations no se usan para decidir cómo diseñar/reempaquetar los residuos dentro del mover, solo para el tramo que se modela.
-   torsion\_database: una base de datos de ángulos de torsión que se empalmarán. La base de datos es ligera y elimina la necesidad de leer un PDB para cada segmento que se empalma. Cada línea de la base de datos es una entrada de segmento que define los grados de libertad: ( \<phi\> \<psi\> \<omega\> \<resn de 3 letras\> ) x número de residuos del segmento.
-   database\_entry: qué entrada de la base de datos se empalma. Si es 0, se elige una entrada al azar durante la ejecución.
-   thread\_ala: ¿enhebrar residuos de alanina en todas las posiciones donde la fuente no tiene gly/pro o no coincide con el Pose actual? Si es false, permite diseño en esas posiciones.
-   equal\_length: al muestrear de una base de datos, ¿quieres restringir solo a entradas con la misma longitud que el Pose actual?


##Véase también

* [[Database IO]]: información sobre la entrada/salida de bases de datos en Rosetta
* [[I want to do x]]: guía para elegir un mover


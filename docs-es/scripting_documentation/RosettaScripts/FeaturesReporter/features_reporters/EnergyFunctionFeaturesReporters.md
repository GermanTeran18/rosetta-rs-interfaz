#EnergyFunctionFeaturesReporters

TotalScoreFeatures
------------------
Informa de la puntuación total de cada estructura usando la función de puntuación que prefieras. La diferencia entre este reporter y los muchos otros que tratan con puntuaciones es la simplicidad. Este reporter solo informa de puntuaciones totales y tiene un esquema muy sencillo. En la mayoría de los casos, es exactamente lo que quieres. Pero si necesitas desglosar tus puntuaciones por tipo o por residuo, tendrás que usar uno o más de los otros reporters descritos en esta sección.

Ejemplo:

```xml
<TotalScoreFeatures scorefxn="talaris2013"/>
```

Opciones:

* scorefxn: obligatoria. El nombre de la función de puntuación sobre la que informar.

Esquema:

```sql
CREATE TABLE `total_scores` (
  `struct_id` bigint(20) NOT NULL,
  `score` double NOT NULL,
  PRIMARY KEY (`struct_id`)
)
```

ScoreTypeFeatures
-----------------

ScoreTypeFeatures almacena los tipos de puntuación de todos los EnergyMethods.

        <ScoreTypeFeatures scorefxn="(default_scorefxn &string)"/>

-   **score\_types** : almacena información sobre el EnergyMethod asociado a cada tipo de puntuación.
    -   *batch\_id* : los tipos de puntuación hacen referencia a la tabla *batches* para permitir que cambien con el tiempo.
    -   *score\_type\_id* : los valores del enum *core::scoring::ScoreType*.
    -   *score\_type\_name* : la versión en cadena de los valores del enum *core::scoring::ScoreType*.

<!-- -->

        CREATE TABLE IF NOT EXISTS score_types (
            batch_id INTEGER,
            score_type_id INTEGER,
            score_type_name TEXT,
            FOREIGN KEY (batch_id) REFERENCES batches (batch_id) DEFERRABLE INITIALLY DEFERRED),
            PRIMARY KEY (batch_id, score_type_id);

ScoreFunctionFeatures
---------------------

ScoreFunctionFeatures almacena los pesos y las opciones de los métodos de energía de la función de puntuación.

        <ScoreFunctionFeatures scorefxn="(default_scorefxn &string)"/>

-   **score\_function\_weights** : almacena los pesos de los términos de puntuación distintos de cero.
    -   *score\_function\_name* : el nombre de la etiqueta de la función de puntuación especificada en el bloque \<SCOREFUNCTIONS/\>
    -   *score\_type\_id* : los valores del enum *core::scoring::ScoreType*
    -   *weight* : el peso del término de puntuación

<!-- -->

        CREATE TABLE IF NOT EXISTS score_function_weights (
            batch_id INTEGER,
            score_function_name INTEGER,
            score_type_id INTEGER,
            weight REAL,
            FOREIGN KEY (batch_id, score_type_id) REFERENCES score_types (batch_id, score_type_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (batch_id, score_type_id));

-   **score\_function\_method\_options** : almacena las opciones de método de la función de puntuación.
    -   *score\_function\_name* : el nombre de la etiqueta de la función de puntuación especificada en el bloque \<SCOREFUNCTIONS/\>
    -   *option\_key* : la opción de método
    -   *option\_value* : el valor de la opción de método

<!-- -->

        CREATE TABLE IF NOT EXISTS score_function_method_options (
            batch_id INTEGER,
            score_function_name INTEGER,
            option_key TEXT,
            option_value TEXT,
            FOREIGN KEY (batch_id) REFERENCES batches (batch_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (batch_id, score_function_name, option_key);

StructureScoresFeatures
-----------------------

        <StructureScoresFeatures scorefxn="(&scorefxn)"/>

StructureScoresFeatures almacena la información de puntuación global de todos los EnergyMethods habilitados.

-   Depende de **ScoreTypesFeatures**

-   **structure\_scores** :
    -   *score\_value* : el valor de puntuación ponderado para el tipo dado.

<!-- -->

        CREATE TABLE IF NOT EXISTS structure_scores (
            batch_id INTEGER
            struct_id INTEGER AUTOINCREMENT,
            score_type_id INTEGER,
            score_value INTEGER,
            FOREIGN KEY (struct_id) REFERENCES structures (struct_id) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (batch_id, score_type_id) REFERENCES score_types (batch_id, score_type_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (batch_id, struct_id, score_type_id));

ResidueScoresFeatures
---------------------

        <ResidueScoresFeatures scorefxn="(&scorefxn)"/>

ResidueScoresFeatures almacena la puntuación de una estructura a nivel de residuo. Los términos que evalúan un solo residuo se almacenan en *residue\_scores\_1b* . Los términos que evalúan pares de residuos se almacenan en *residue\_scores\_2b* . Los términos que dependen de toda la estructura se almacenan mediante StructureScoresFeatures.

-   **residue\_scores\_1b** : las puntuaciones de un cuerpo de cada residuo de la estructura.
    -   *score\_type* : el tipo de puntuación como cadena
    -   *score\_value* : el valor de la puntuación
    -   *context\_dependent* : 0 si el tipo de puntuación es independiente del contexto y 1 si depende del contexto

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_scores_1b (                                                                                                                      
            batch_id INTEGER,
            struct_id INTEGER AUTOINCREMENT,
            resNum INTEGER,
            score_type_id INTEGER,
            score_value REAL,
            context_dependent INTEGER,
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (batch_id, score_type_id) REFERENCES score_types (batch_id, score_type_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(batch_id, struct_id, resNum, score_type)); 

-   **residue\_scores\_2b** : las puntuaciones de dos cuerpos de cada par de residuos de la estructura. Nota: los términos de dos cuerpos intrarresiduo se almacenan en esta tabla con resNum1 == resNum2.
    -   *resNum1* , *resNum2* : la numeración de residuos de Rosetta de los residuos participantes. Nota: *resNum1* \<= *resNum2*
    -   *score\_type* : el tipo de puntuación como cadena
    -   *score\_value* : el valor de la puntuación
    -   *context\_dependent* : 0 si el tipo de puntuación es independiente del contexto y 1 si depende del contexto

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_scores_2b (
            batch_id INTEGER,
            struct_id INTEGER AUTOINCREMENT,
            resNum1 INTEGER,
            resNum2 INTEGER,
            score_type_id INTEGER,
            score_value REAL,
            context_dependent  INTEGER,
            FOREIGN KEY (struct_id, resNum1) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (struct_id, resNum2) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY (batch_id, score_type_id) REFERENCES score_types (batch_id, score_type_id) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(batch_id, struct_id, resNum1, resNum2, score_type));

ResidueTotalScoresFeatures
--------------------------

        <ResidueTotalScoresFeatures scorefxn="(&scorefxn)"/>

ResidueTotalScoresFeatures almacena, para cada residuo, la puntuación total de los términos de un cuerpo de ese residuo y la mitad de la puntuación total de los términos de dos cuerpos en los que interviene ese residuo. Ten en cuenta que los términos que dependen de toda la estructura se almacenan mediante StructureScoresFeatures. Para incluir los enlaces de hidrógeno en los totales, la función de puntuación debe especificar la opción *[[decompose_bb_hb_into_pair_energies|RosettaScripts#scorefunctions]]* .

-   **residue\_total\_scores** : las puntuaciones de un cuerpo de cada residuo de la estructura.
    -   *score\_value* : energías SUM(1b) + SUM(2b)/2

<!-- -->

        CREATE TABLE IF NOT EXISTS residue_total_scores (                                                                                                                      
            struct_id INTEGER AUTOINCREMENT,
            resNum INTEGER,
            score_value REAL,
            FOREIGN KEY (struct_id, resNum) REFERENCES residues (struct_id, resNum) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY(struct_id, resNum)); 

HBondParameterFeatures
----------------------

Los parámetros del potencial de enlace de hidrógeno se especifican en la base de datos de Rosetta como conjuntos de parámetros. Cada conjunto de parámetros especifica polinomios, funciones de atenuación y cuáles se aplican a qué tipos químicos de enlace de hidrógeno. Para indicar el conjunto de parámetros, usa *-hbond\_params \<database\_tag\>* en la línea de comandos o establece *score\_function.energy\_method\_options().hbond\_options()-\>params\_database\_tag(\<database\_tag\>)* .

-   **hbond\_fade\_interval** : la interacción limitada entre dimensiones geométricas se controla mediante funciones de atenuación sencillas de la forma \_\_/----\\\_\_.
    -   *database\_tag* : el conjunto de parámetros de enlace de hidrógeno
    -   *name* : el nombre del intervalo de atenuación al que hace referencia la tabla *hbond\_evaluation\_types*
    -   *junction\_type* : el tipo de unión indica cómo se debe interpolar la función entre los nodos. Actualmente las opciones son *piecewise\_linear* y *smooth*, que usa una spline cúbica con derivada cero en los nodos.
    -   *min0* , *fmin* , *fmax* , *max0* : las coordenadas x de los nodos

<!-- -->

        CREATE TABLE IF NOT EXISTS hbond_fade_interval(
            database_tag TEXT,
            name TEXT,
            junction_type TEXT,
            min0 REAL,
            fmin REAL,
            fmax REAL,
            max0 REAL,
            PRIMARY KEY(database_tag, name));

-   **hbond\_polynomial\_1d** : polinomios unidimensionales para cada dimensión geométrica usada para calcular la energía del enlace de hidrógeno.
    -   *database\_tag* : el conjunto de parámetros de enlace de hidrógeno
    -   *name* : el nombre del polinomio al que hace referencia la tabla *hbond\_evaluation\_types*.
    -   *dimension* : la dimensión geométrica con la que se debe usar el polinomio.
    -   *xmin* , *xmax* : el polinomio se trunca más allá de los valores *xmin* y *xmax*.
    -   *root1* , *root2* : los valores donde el polinomio es igual a 0.
    -   *degree* : el número de coeficientes del polinomio. Por ejemplo, 10x\^2 - 3x + 1 tendría grado 3.
    -   *c\_\** : los coeficientes del polinomio, ordenados de la potencia más alta a la más baja.

<!-- -->

        CREATE TABLE IF NOT EXISTS hbond_polynomial_1d (
            database_tag TEXT,
            name TEXT,
            dimension TEXT,
            xmin REAL,
            xmax REAL,
            root1 REAL,
            root2 REAL,
            degree INTEGER,
            c_a REAL,
            c_b REAL,
            c_c REAL,
            c_d REAL,
            c_e REAL,
            c_f REAL,
            c_g REAL,
            c_h REAL,
            c_i REAL,
            c_j REAL,
            c_k REAL,
            PRIMARY KEY(database_tag, name));

-   **hbond\_evaluation\_types** : asocia a los tipos de enlace de hidrógeno (tipo químico del donante, tipo químico del aceptor, separación en la secuencia) los intervalos de atenuación, polinomios y tipos de peso que se usarán para evaluar y asignar la energía del enlace de hidrógeno.
    -   *database\_tag* : el conjunto de parámetros de enlace de hidrógeno
    -   *don\_chem\_type* : el componente de tipo químico del donante del tipo de enlace de hidrógeno. Es el valor usado en la columna hbond\_site.HBChemType cuando el sitio es un donante de enlace de hidrógeno.
    -   *acc\_chem\_type* : el componente de tipo químico del aceptor del tipo de enlace de hidrógeno. Es el valor usado en la columna hbond\_site.HBChemType cuando el sitio es un aceptor de enlace de hidrógeno.
    -   *separation* : el componente de tipo de separación en la secuencia del tipo de enlace de hidrógeno. Se usa como indicador de la participación en motivos locales de secuencia, como los enlaces de hidrógeno dentro de una hélice. NOTA: la separación se define como *acc\_resNum* - *don\_resNum* cuando ambos residuos son polímeros y están en la misma cadena, y como infinito en caso contrario.
    -   *AHdist\_{short/long}\_fade* : las funciones de atenuación que se aplican a las evaluaciones del polinomio AHdist. La distinción corto/largo permite una dependencia angular distinta para los enlaces de hidrógeno con diferentes longitudes de enlace. La distinción sigue en espíritu el comportamiento descrito originalmente en [Kortemme 2003](http://www.sciencedirect.com/science/article/B6WK7-47WBSCV-T/2/d7c673dd51017848231e7b9e8c05fbca) .
    -   *{cosBAH/cosAHD}\_fade* : las funciones de atenuación que se aplican a las evaluaciones de los polinomios cosBAH/cosAHD.
    -   *AHdist* : polinomio que se usa para evaluar el grado de libertad geométrico de la distancia aceptor -- hidrógeno.
    -   *cosBAH\_{short/long}* : polinomios que se usan para evaluar el coseno del grado de libertad geométrico base del aceptor -- aceptor -- hidrógeno.
    -   *cosAHD\_{short/long}* : polinomios que se usan para evaluar el coseno del grado de libertad geométrico aceptor -- hidrógeno -- donante.
    -   *weight\_type* : en qué posición del vector de puntuación se debe acumular la energía del enlace de hidrógeno. Consulta WeightType para ver los tipos permitidos.

<!-- -->

       CREATE TABLE IF NOT EXISTS hbond_evaluation_types (
            database_tag TEXT,
            don_chem_type TEXT,
            acc_chem_type TEXT,
            separation TEXT,
            AHdist_short_fade TEXT,
            AHdist_long_fade TEXT,
            cosBAH_fade TEXT,
            cosAHD_fade TEXT,
            AHdist TEXT,
            cosBAH_short TEXT,
            cosBAH_long TEXT,
            cosAHD_short TEXT,
            cosAHD_long TEXT,
            weight_type TEXT,
            FOREIGN KEY(database_tag, AHdist_short_fade) REFERENCES hbond_fade_interval(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, AHdist_long_fade)  REFERENCES hbond_fade_interval(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosBAH_fade)       REFERENCES hbond_fade_interval(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosAHD_fade)       REFERENCES hbond_fade_interval(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, AHdist)            REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosBAH_short)      REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosBAH_long)       REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosAHD_short)      REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            FOREIGN KEY(database_tag, cosAHD_long)       REFERENCES hbond_polynomial_1d(database_tag, name) DEFERRABLE INITIALLY DEFERRED,
            PRIMARY KEY (database_tag, don_chem_type, acc_chem_type, separation));

ScreeningFeatures
-----------------

ScreeningFeatures se usa para consolidar en una tabla la información de puntuación relacionada con un ligando para su procesamiento posterior. Es más útil cuando, de otro modo, tendrías que unir varias tablas muy grandes, y se concibió originalmente para usarse en un pipeline de cribado de alto rendimiento. Este mover debe usarse junto con el screening\_job\_inputter.

    <ScreeningFeatures chain="(chain &string)">
        <descriptor type="(descriptor_name &string)"/>
        <descriptor type="(descriptor_name &string)"/>
    </ScreeningFeatures>

En la definición XML anterior, chain es una cadena de ligando y el descriptor type es la clave de cadena de un par string\_real o string\_string añadido al trabajo. Actualmente este mover supone que los ligandos constan de un solo residuo.

    CREATE TABLE `screening_features` (
      `struct_id` bigint(20) NOT NULL,
      `residue_number` int(11) NOT NULL,
      `chain_id` varchar(1) NOT NULL,
      `name3` text NOT NULL,
      `group_name` text NOT NULL,
      `descriptor_data` text NOT NULL,
      PRIMARY KEY (`struct_id`,`residue_number`),
      CONSTRAINT `screening_features_ibfk_1` FOREIGN KEY (`struct_id`) REFERENCES `structures` (`struct_id`)
    ) 

-   **screening\_features** :
    -   *struct\_id* - el struct\_id
    -   *residue\_number* - el número de residuo del ligando
    -   *chain\_id* - el identificador de cadena del ligando
    -   *name3* - el nombre de 3 letras del ligando
    -   *group\_name* - el group\_name especificado por el screening\_job\_inputter
    -   *descriptor\_data* - los datos asociados a los descriptores definidos en el script XML. Los datos tienen formato de diccionario JSON.



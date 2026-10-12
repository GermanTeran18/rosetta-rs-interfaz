# FavorSequenceProfile
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FavorSequenceProfile

[[include:mover_FavorSequenceProfile_type]]


Establece restricciones de tipo de residuo sobre la Pose según el perfil y el peso dados. Establece una (y solo una) de las siguientes:

-   **pssm** - el nombre de un archivo pssm con formato blast que contiene el perfil de secuencia que se usará
-   **use\_native** - usa como referencia la estructura especificada con -in:file:native
-   **use\_fasta** - usa como referencia una secuencia FASTA nativa especificada con -in:file:fasta
-   **use\_starting** - usa como referencia la estructura de entrada inicial (p. ej., la que se pasa a -s)
-   **use\_current** - usa como referencia la estructura actual (la que se pasa a apply)
-   **pdbname **- usa como referencia la estructura especificada por el nombre de archivo

especifica si es necesario:

-   **chain** - 0 es todas las cadenas; en caso contrario, si se añade una secuencia, la alinea con la cadena especificada
-   **exclude_resnums** - excluye residuos para que no se restrinjan

Puedes establecer cómo se escalan los valores dados con los ajustes de "**scaling**". El valor predeterminado "prob" calcula, por residuo, una probabilidad ponderada de Boltzmann basada en la puntuación del perfil (las puntuaciones sin ponderar de las 20 identidades de aminoácido en cualquier posición suman -1.0). El valor "global" realiza un reescalado lineal global con el cero fijo, de modo que todos los valores (antes de ponderar) queden en el intervalo de -1.0 a 1.0. El valor "none" no ajusta los valores.

El parámetro "**weight**" puede usarse para ajustar la intensidad de las restricciones después del escalado. (p. ej., con weight=0.2, las energías de restricción escaladas globalmente quedan en el intervalo de -0.2 a 0.2 y las energías de restricción basadas en IDENTITY y ponderadas por probabilidad están en el intervalo de -0.2 a 0, suponiendo ambas res\_type\_constraint=1)

Ten en cuenta que el parámetro weight no afecta al valor de res\_type\_constraint en la función de puntuación. Como las restricciones solo serán visibles con valores de res\_type\_constraint distintos de cero, el parámetro scorefxns es una función de conveniencia para poner automáticamente res\_type\_constraint en 1 en las funciones enumeradas en las que esté desactivado.

Si se usa una estructura como entrada en lugar de una PSSM, los pesos del perfil que se usan se basan en la matriz de sustitución indicada de la base de datos. Las opciones actuales son:

-   MATCH: puntuaciones sin escalar/sin ponderar de -1 para una coincidencia de aminoácido y de 1 para una discrepancia
-   IDENTITY: puntuaciones sin escalar/sin ponderar de -1 para una coincidencia y de +10000 para una discrepancia. Es más útil con el escalado prob, que da una puntuación escalada por probabilidad/sin ponderar de -1.0 para una coincidencia de aminoácido y de 0 para una discrepancia.
-   BLOSUM62: los valores varían según el aminoácido y la sustitución. Las puntuaciones sin escalar/sin ponderar están sobre todo en el intervalo de -2 a +4, pero llegan hasta -11 y +4.

NOTA: el comportamiento predeterminado de FavorSequenceProfile ha cambiado respecto de versiones anteriores. Si usas una estructura como referencia, conviene que revises el peso, el escalado y la matriz de sustitución para asegurarte de que tus valores de energía caen en el intervalo adecuado.

Los siguientes ajustes replicarán el comportamiento predeterminado de [[FavorNativeResidueMover]] con el peso predeterminado de 1.5:
```xml
<FavorSequenceProfile name="favournative" weight="1.5" use_current="true" matrix="IDENTITY"/>
```
Ten en cuenta que, a diferencia de FavorNativeResidue, FavorSequenceProfile no actualiza los pesos de tu scorefxn (salvo que figure en `scorefxns`).

##Véase también

* [[ConsensusDesignMover]]
* [[FavorNativeResidueMover]]
* [[ResidueTypeConstraintMover]]
* [[PSSM2BfactorMover]]
* [[FavorSymmetricSequenceMover]]
* [[I want to do x]]: guía para elegir un mover

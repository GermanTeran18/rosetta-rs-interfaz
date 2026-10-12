# Foldability
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Foldability

Reconstruye un número especificado de veces un segmento dado de un Pose de entrada mediante ensamblaje basado en fragmentos. Primero se quita del Pose el segmento dado de la cadena principal. Luego el segmento se reconstruye desde la posición N-terminal del segmento quitado, plegándolo desde una cadena extendida. No se usan restricciones de ruptura de cadena para evitar sesgar el plegamiento. Un intento de plegamiento se considera exitoso si el extremo C-terminal reconstruido queda cerca del extremo C-terminal del segmento original, y fallido si queda lejos de él. La estructura secundaria y los intervalos de torsión (es decir, ABEGO) que se usan para los fragmentos se toman de un Pose de entrada o se pueden especificar opcionalmente en la opción "motif". La puntuación devuelta es un número entre 0 y 1 igual a la proporción de intentos de plegamiento exitosos respecto al total de intentos.

Este filtro está diseñado como un medio para cuantificar la métrica de "foldability" (capacidad de plegamiento) de Nobu y Rie, en la que una estructura se vuelve a plegar varias veces y se compara con la estructura deseada.

```xml
<Foldability name="(&string)" scorefxn="(&string)" tries="(100 &int)" start_res="(1 &int)" end_res="(1 &int)" motif="('' &string)" distance_threshold="(4.0 &real)" />
```

-   start\_res: el residuo N-terminal del trozo de cadena principal que se reconstruirá.
-   end\_res: el residuo C-terminal del trozo de cadena principal que se reconstruirá.
-   scorefxn: la función de puntuación que se usará para la inserción de fragmentos.  Debe ser una función de puntuación compatible con centroide. Si no se especifica, se usa la función de puntuación centroide por defecto de Rosetta. 
-   distance_threshold: un intento de plegamiento se considera exitoso si el extremo de la región replegada está como máximo a distance_threshold de su ubicación original.
-   motif: la estructura secundaria + abego que se usará para la región de la cadena principal que se reconstruirá. Si no se especifica, se toma del Pose de entrada. El formato de esta cadena es:

    ```
    <Length><SS><ABEGO>-<Length2><SS2><ABEGO2>-...-<LengthN><SSN><ABEGON>
    ```

    Por ejemplo, "1LX-5HA-1LB-1LA-1LB-6EB" construirá un loop de un residuo con cualquier abego, seguido de una hélice de 5 residuos, seguida de un loop de 3 residuos con ABEGO BAB, seguido de una hebra de 6 residuos.

**Ejemplo**

El siguiente ejemplo ejecuta el filtro foldability para reconstruir 100 veces el motivo "2LX-5HA-3LX-5EB-2LX". La reconstrucción empezará en el residuo 30, y la puntuación devuelta será la fracción de veces (representada como un número entre 0 y 1) en que el plegamiento de este trozo tuvo éxito. El umbral del resultado para considerarlo exitoso depende mucho del plegamiento y puede ir de 0.05 a 1.0.

```xml
<FILTERS>
    <Foldability name="foldability" tries="100" start_res="30" motif="2LX-5HA-3LX-5EB-2LX" />
</FILTERS>
<PROTOCOLS>
    <Add filter_name="foldability" />
</PROTOCOLS>
```

## Véase también

* [[Modelado ab initio|abinitio-relax]]
* [[Modelado de loops|loopmodel]]

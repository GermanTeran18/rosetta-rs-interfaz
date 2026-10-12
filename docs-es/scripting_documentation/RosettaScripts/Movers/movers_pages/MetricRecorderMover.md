# MetricRecorder
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MetricRecorder

Registra métricas numéricas en un archivo de texto delimitado por tabuladores. Con stride se registran las métricas solo cada n veces. Añade ".gz" al nombre del archivo para usar compresión.

Ten en cuenta que esto es independiente del marco de [[SimpleMetrics]]. 

Por ahora solo se pueden registrar ángulos de torsión, indicados mediante el TorsionID. El residuo se puede indicar con el número absoluto de Rosetta (entero) o con el número PDB y la cadena (un entero seguido de un carácter).

```xml
<MetricRecorder stride="(100 &Size)" filename="(metrics.txt &string)" cumulate_jobs="(0 &bool)" cumulate_replicas="(0 &bool)" prepend_output_name="(0 &bool)" >
  <Torsion rsd="(&string)" type="(&string)" torsion="(&Size)" name="('' &string)"/>
  ...
</MetricRecorder>
```

Si se usa dentro de [MetropolisHastings](#MetropolisHastings), el nombre de salida del trabajo actual se antepone a filename. Si se ejecuta con MPI, los parámetros cumulate\_jobs y cumulate\_replicas afectan al nombre del archivo donde se escriben finalmente las métricas. Por ejemplo, con el valor por defecto del parámetro filename, `     metrics.txt    `, un nombre de estructura de entrada `     structname    `, un número de trayectoria `     XXXX    ` y un número de réplica `     YYY    `, se generarán los siguientes nombres según las opciones.

-   cumulate\_jobs=0 cumulate\_replicas=0: structname\_XXXX\_YYY\_metrics.txt
-   cumulate\_jobs=0 cumulate\_replicas=1: structname\_XXXX\_metrics.txt
-   cumulate\_jobs=1 cumulate\_replicas=0: YYY\_metrics.txt
-   cumulate\_jobs=1 cumulate\_replicas=1: metrics.txt

Si no se usa dentro de MetropolisHastings, por defecto el nombre de salida del trabajo actual no se antepone al nombre del archivo, igual que en `     metrics.txt    ` arriba. Si `     prepend_output_name=1    `, se antepondrá con el formato `     structname_XXXX_metrics.txt    `.


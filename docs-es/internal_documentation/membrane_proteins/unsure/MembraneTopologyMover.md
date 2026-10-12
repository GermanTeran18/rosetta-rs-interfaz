# MembraneTopology
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MembraneTopology

Envoltorio sencillo alrededor del objeto MembraneTopology de core/scoring. Recibe un archivo de spans de membrana e inserta la topología de membrana en la caché del Pose. Después el Pose se puede usar con una función de puntuación de membrana.

```
<MembraneTopology name=(&string) span_file=(&string)/>
```

Los archivos de spans tienen la siguiente estructura:

-   línea de comentario
-   1 23 número de hélices transmembrana, número de residuos
-   topología paralela
-   n2c n2c o c2n
-   1 27 1 27 los spans de residuos en la numeración interna de Rosetta. Por alguna razón hay que escribirlo dos veces para cada span de membrana



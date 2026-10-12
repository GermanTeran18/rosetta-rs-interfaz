# Report
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Report

Este filtro informa el valor de otro filtro junto con el nombre del trabajo actual. Es útil al ejecutar trayectorias largas, cuando se quieren ver valores intermedios de las trayectorias exitosas.  El valor del filtro en el momento en que se ejecuta se almacenará en el archivo de puntuación junto con el valor del filtro para el Pose final.

```xml
<Report name="(&string)" filter="('' &string)" report_string="(''&string)" checkpointing_file="(''&string)"/>
```

-   filter: nombre de un filtro del datamap que invocará Report.
-   report\_string: nombre de un objeto del datamap que guarda un valor para informar. Esto requiere que otro mover o filtro conozca este objeto y lo modifique. Por ahora ningún mover ni filtro usa esta funcionalidad, pero podría resultar útil en el futuro.
-   checkpointing\_file: si el protocolo tiene checkpoints (p. ej., mediante GenericMonteCarlo), esto hará que ReportFilter guarde sus datos en un checkpoint. Si el archivo de checkpoint existe, el valor del archivo de checkpoint se leerá en el valor interno de ReportFilter y se informará al final de la ejecución. Al aplicarse, el valor del filtro se escribirá en el archivo de checkpoint.

23Sep13: report\_string no es realmente necesario. El filtro Report simplemente guarda en caché el valor del filtro cuando llamas a ReportFilter y luego devuelve este valor guardado al final de la ejecución. Simple y útil.




# LoopAnalyzerFilter
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## LoopAnalyzerFilter

Este filtro llama a [[LoopAnalyzerMover]] para calcular varias métricas específicas de loops.  También puedes probar [[GeometryFilter]].

```xml
<LoopAnalyzerFilter name="&string" use_tracer="(&bool)" loops_file="(&string)" >
    <Loop start="(&int)" stop="(&int)" cut="(&int)" skip_rate="(0.0 &real)" rebuild="(no &bool)"/>
</LoopAnalyzerFilter>
```

- loop: puedes pasar los loops como subetiquetas.
- loops_file: puedes pasar los loops como un archivo de loops.
- use_tracer: si es false, guarda los resultados en PoseExtraScores / DataCache para escribirlos al final de la ejecución.  Si es true, imprime los resultados en un objeto [[Tracer|Glossary#tracer]].

El resto de la documentación está en el código subyacente, [[LoopAnalyzerMover]].

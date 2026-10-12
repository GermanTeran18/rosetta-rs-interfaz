#ChainBreakFilter

Documentación de Christoffer Norn (ch.norn@gmail.com). Página creada el 17 de agosto de 2017.

*Volver a la página de [[Filtros|Filters-RosettaScripts]].*

##ChainBreakFilter

Este filtro cuenta el número de roturas de cadena (chain breaks) en el Pose. Aquí una rotura de cadena se define como una longitud de enlace que se desvía de la longitud de enlace media (1.33) en más de +/- la tolerancia (predeterminada: 0.13).

## Opciones y uso

```xml
< ChainBreak name="(&string)" 
    chain_num="(1 &int)" 
    tolerance="(0.13 &float)"
    threshold="(1 &int)" 
/>
```

**chain_num** -- A qué cadena se aplica el filtro.

**tolerance** -- Cuántos ångström puede desviarse la longitud de enlace respecto a la ideal (1.33 Å)

**threshold** -- Cuántas roturas de cadena se necesitan para que el filtro informe de un fallo

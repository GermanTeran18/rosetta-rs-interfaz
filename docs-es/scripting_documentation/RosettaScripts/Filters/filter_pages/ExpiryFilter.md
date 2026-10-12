# Expiry
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Expiry

¿Ha transcurrido un número predeterminado de segundos desde el inicio de la trayectoria? Si es así, devuelve false (para detener la trayectoria); si no, devuelve true. Sí, ahora me doy cuenta de que esto está al revés... Es útil en sistemas informáticos que quieren que el programa termine de forma ordenada después de un tiempo predeterminado. Después de definir este filtro, reparte llamadas a él por tu sección PROTOCOLS, en los puntos donde quieras que se evalúe.

```xml
<Expiry name="(&string)" seconds="(&integer)"/>
```

-   seconds: cuántos segundos hasta que esto provoque un fallo.

## Véase también

* [[TimeFilter]]

# Time
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## Time

Filtro simple para informar cuánto tarda una secuencia de movers y filtros.

```xml
<Time name="(&string)"/>
```

Dentro del protocolo, hay que llamar a time al menos dos veces: una cuando quieres iniciar el temporizador y otra cuando quieres detenerlo. El tiempo que se informa es el que transcurre entre la primera y la última llamada.

## Véase también

* [[ExpiryFilter]]

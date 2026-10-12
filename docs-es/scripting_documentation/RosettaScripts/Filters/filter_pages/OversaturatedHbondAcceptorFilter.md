# OversaturatedHbondAcceptorFilter
Esta página se modificó por última vez el 22 de mayo de 2016 por Vikram K. Mulligan (vmullig@uw.edu), laboratorio Baker.
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## OversaturatedHbondAcceptorFilter

Este filtro cuenta el número de aceptores de enlaces de hidrógeno que reciben enlaces de hidrógeno de más donadores de los permitidos.  Si el recuento es mayor que un valor umbral (por defecto 0), el filtro falla.  Este filtro está pensado para abordar una limitación de los términos de puntuación de enlaces de hidrógeno de Rosetta, que son descomponibles por pares: un término de puntuación que examina la interacción entre solo dos residuos no puede saber que un tercero también interactúa con uno de los residuos, lo que crea artefactos en los que demasiados donadores de enlaces de hidrógeno forman todos enlaces de hidrógeno con el mismo aceptor.

```xml
<OversaturatedHbondAcceptorFilter name="(&string)" scorefxn="(&string)" max_allowed_oversaturated="(0 &int)" hbond_energy_cutoff="(-0.1 &Real)" consider_mainchain_only="(true &bool)" donor_selector="(&string)" acceptor_selector="(&string)" >
```
-  scorefxn: ¿Qué función de puntuación se debe usar para puntuar los enlaces de hidrógeno?  Por defecto es la función de puntuación global por defecto fijada con la opción "-score:weights".
-  max_allowed_oversaturated: ¿Cuántos aceptores sobresaturados se permiten antes de que el filtro falle?  Por defecto 0 (el filtro falla si se encuentra algún aceptor sobresaturado).
-  hbond_energy_cutoff: Un enlace de hidrógeno debe tener una energía menor o igual que este umbral para contarse.  Por defecto -0.1 unidades de energía de Rosetta.
-  consider_mainchain_only: Si es true (el valor por defecto), solo se consideran los enlaces de hidrógeno cadena principal-cadena principal.  Si es false, se consideran todos los enlaces de hidrógeno.
-  donor_selector: Un ResidueSelector opcional, definido previamente, que selecciona el subconjunto de residuos que pueden donar enlaces de hidrógeno.  Si no se indica, se recorre toda la estructura en busca de donadores.
-  acceptor_selector: Un ResidueSelector opcional, definido previamente, que selecciona el subconjunto de residuos que pueden aceptar enlaces de hidrógeno.  Si no se indica, se recorre toda la estructura en busca de aceptores.

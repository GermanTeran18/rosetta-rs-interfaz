<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Un mover envoltorio que mide cuán parecidos son los rotámeros antes y después de ejecutar el mover hijo

```xml
<RotamerRecoveryMover name="(&string;)" protocol="(RRProtocolMinPack &string;)"
        mover="(&string;)" mover_name="(&string;)"
        comparer="(RRComparerAutomorphicRMSD &string;)"
        reporter="(RRReporterSimple &string;)" scorefxn="(&string;)" />
```

-   **protocol**: Nombre del protocolo que se usa para detectar la recuperación de rotámeros
-   **mover**: Mover que se aplica a la Pose. Intercambiable con mover_name.
-   **mover_name**: Mover que se aplica a la Pose. Intercambiable con mover.
-   **comparer**: Nombre del RRComparer que se usa para medir la recuperación de rotámeros
-   **reporter**: Nombre del RRReporter que se usa para informar de la recuperación de rotámeros
-   **scorefxn**: Nombre de la función de puntuación a usar

---

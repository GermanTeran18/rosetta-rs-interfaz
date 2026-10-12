# RigidBodyPerturbNoCenterMover

*Volver a la página de [[Mover|Movers-RosettaScripts]].*

## RigidBodyPerturbNoCenterMover

Documentación de Vikram K. Mulligan (vmullig@uw.edu), escrita el 24 de junio de 2016. Mover de Monica Berrondo.

## Descripción

Este mover añade una pequeña traslación y rotación aleatorias al jump 1 de un Pose. Es útil para mover un cuerpo respecto a otro en un protocolo (*p. ej.* en el contexto de una búsqueda de Monte Carlo, como parte de un problema de docking). Ten en cuenta que la rotación *no* está centrada en el cuerpo que se rota.

## Uso

```xml
<RigidBodyPerturbNoCenter name="(&string)" rot_mag="(0.1 &Real)" trans_mag="(0.4 &Real)" />
```

## Entradas

* rot_mag: la magnitud de la rotación aleatoria. (Nota: creo que está en grados, pero corrígeme si me equivoco. -VKM.) Por defecto 0.1.

*trans_mag: la magnitud de la traslación aleatoria, en Å. Por defecto 0.4.

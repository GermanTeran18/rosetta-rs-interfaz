# Sidechain
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Sidechain

Los movimientos «fuera de rotámero» solo de cadenas laterales. *SidechainMover* es un *[[ThermodynamicMover|MetropolisHastings-Documentation]]*.

```xml
<Sidechain name="(&string)" preserve_detailed_balance="(1 &bool)" task_operations="(&string,&string,&string)" prob_uniform="(0.0 &real)" prob_withinrot="(0.0 &real)" prob_random_pert_current="(0.0 &real)"/>
```

-   preserve\_detailed\_balance: equilibra el criterio de aceptación con la razón de densidades de propuesta
-   task\_operations: lista de operaciones para generar un PackerTask
-   prob\_uniform: probabilidad de un movimiento «uniform»: todos los chi de las cadenas laterales se aleatorizan de forma uniforme entre -180° y 180°
-   prob\_withinrot: «dentro del rotámero»: los chi de las cadenas laterales se eligen de la distribución de Dunbrack para el rotámero actual
-   prob\_random\_pert\_current: «perturbación aleatoria de la posición actual»: los chi actuales de las cadenas laterales se perturban ±10° desde sus posiciones actuales, con sesgo según la energía de Dunbrack resultante. Ten en cuenta que si tu función de puntuación contiene un término de energía de Dunbrack, esto producirá problemas de doble conteo.
-   Si las tres probabilidades anteriores no suman 1.0, el resto se asigna a un movimiento «entre rotámeros»: se elige un rotámero aleatorio del aminoácido actual y los ángulos chi de ese rotámero se seleccionan de la distribución de Dunbrack


##Véase también

* [[SidechainMCMover]]
* [[TryRotamersMover]]
* [[PackRotamersMover]]
* [[I want to do x]]: guía para elegir un mover


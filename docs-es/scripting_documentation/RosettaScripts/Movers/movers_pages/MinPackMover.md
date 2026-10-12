# MinPackMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MinPackMover

Empaqueta y luego minimiza una cadena lateral antes de llamar a MonteCarlo sobre el cambio. Se puede modificar con una ScoreFunction o una TaskOperation proporcionadas por el usuario. No hace minimización de la cadena principal ni de cuerpo rígido.

```xml
<MinPackMover name="&string" scorefxn="('score12' &string)" task_operations="(&string,&string,&string)" nonideal="(0 &bool)" cartesian="(0 &bool)" off_rotamer_pack="(0 &bool)"/>
```

Se recomienda cambiar los pesos que usas por los pesos **score12minpack**. Son los pesos estándar de score12 con las energías de referencia reajustadas para el perfil de recuperación de secuencia al usar MinPackMover. Sin estos pesos verás muchos residuos de triptófano en la superficie de una proteína.

-   Etiquetas:
-   **scorefxn** : función de puntuación que se usa para el empaquetado y la minimización; por defecto es score12. Se recomienda cambiarla a **score12minpack**.
-   **task\_operations** : lista de task operations separadas por comas. Deben haberse definido previamente en la sección TaskOperations. Por defecto se diseñan todos los residuos.
-   **nonideal** : abre los grados de libertad de ángulos y longitudes de enlace a la minimización
-   **cartesian** : usa minimización cartesiana
-   **off_rotamer_pack** : en lugar de usar core::pack::min_pack, usa core::pack::off_rotamer_pack
-   ¿Cuál es el FoldTree de entrada y cuál el de salida?
    -   El mover en sí no es sensible al FoldTree, pero las TaskOperations podrían serlo. Este mover no modifica el fold tree.
    -   ¿Toma y devuelve un FoldTree por defecto o necesita/devuelve un fold tree modificado?
-   ¿Admite un Pose con alguna propiedad química o topológica concreta?
    -   No requiere un tipo especial de Pose.
-   ¿Cambia la longitud del Pose?
    -   No.
-   ¿Cambia el ConstraintSet?
    -   No.
-   Cuando se le da algún dato concreto (¿mover? ¿conjunto de fragmentos? ¿función de puntuación), ¿guarda una copia o un puntero?
    -   No modifica la ScoreFunction.


##Véase también

* [[RepackMinimizeMover]]
* [[PrepackMover]]
* [[Fixbb]]: aplicación para empaquetar rotámeros
* [[PackRotamersMover]]
* [[Minimization overview]]
* [[RestrictRegionMover]]
* [[SymPackRotamersMover]]
* [[PackRotamersMoverPartGreedyMover]]
* [[TryRotamersMover]]
* [[MinPackMover]]
* [[I want to do x]]: guía para elegir un mover

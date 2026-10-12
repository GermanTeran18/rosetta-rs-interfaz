# Prepack
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Prepack

Realiza algo que se aproxima al preempaquetado de r++ (pero de forma menos rigurosa, sin minimización con pruebas de rotámeros) mediante minimización de cadenas laterales y reempaquetado. Separa las cadenas según jump\_num, hace el preempaquetado y luego vuelve a formar el complejo. Si jump\_num=0, NO separará las cadenas en absoluto.

```xml
<Prepack name="(&string)" scorefxn="(score12 &string)" jump_number="(1 &integer)" task_operations="(comma-delimited list)" min_bb="(0 &bool)"/>
  <MoveMap>
  ...
  </MoveMap>
</Prepack>
```

-   min\_bb: minimiza la cadena principal en el estado unido, antes de separar los compañeros. Esta opción activa la lectura del MoveMap.
-   MoveMap: igual que en FastRelax y MinMover, pero solo se activa si min\_bb es true.


##Véase también

* [[PackRotamersMover]]
* [[MinMover]]
* [[MinPackMover]]
* [[RepackMinimizeMover]]
* [[Minimization overview]]
* [[Fixbb]]: aplicación para empaquetar rotámeros
* [[SymPackRotamersMover]]: versión simétrica de este mover
* [[PackRotamersMoverPartGreedyMover]]
* [[TryRotamersMover]]
* [[RotamerTrialsMover]]
* [[RotamerTrialsMinMover]]
* [[RotamerTrialsRefinerMover]]
* [[I want to do x]]: guía para elegir un mover

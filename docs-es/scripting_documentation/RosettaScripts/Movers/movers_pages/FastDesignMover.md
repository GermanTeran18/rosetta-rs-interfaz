# FastDesign
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FastDesign

[[_TOC_]]

**Nota temporal:** la función de repulsión aumentada presentada en Rosettacon2018 se puede [[encontrar aquí|RelaxScript]].

Realiza un FastRelax con el diseño habilitado. Por defecto, cada repetición de FastDesign consta de cuatro ciclos de reempaquetado/minimización en los que el término de energía repulsiva es inicialmente muy bajo y aumenta en cada ciclo. Opcionalmente, los pesos de las restricciones también pueden disminuir en cada ciclo. Esto permite mejorar el empaquetado y la puntuación. Este mover puede usar todas las opciones de FastRelax y, además, incluye funciones centradas en el diseño.

### Uso

[[include:mover_FastDesign_type]]

### Scripts de relax

Para ver una lista de los scripts de relax de la base de datos, [[haz clic aquí|RelaxScript]].

### Simetría

FastDesign es totalmente compatible con la simetría y no requiere consideraciones especiales. 

### Notas

- cartesian: para habilitar la minimización cartesiana (es decir, si obtienes el `ERROR: Scorefunction not set up for nonideal/Cartesian scoring`), debes poner `cart_bonded` en 0.5 y `pro_close` en 0.0.

### Comportamientos obsoletos

Hasta el 8 de febrero de 2020, el comportamiento predeterminado de FastDesign era desactivar el empaquetado en todas las posiciones para las que el MoveMap había desactivado la minimización de la cadena lateral. Esto es poco intuitivo, ya que en todos los demás casos los MoveMaps controlan solo la minimización y no el empaquetado. (El empaquetado normalmente se controla con TaskOperations.) Por lo tanto, este comportamiento se ha declarado obsoleto. Todavía puede volver a habilitarse con la opción `movemap_disables_packing_of_fixed_chi_positions="true"` en RosettaScripts.

##Véase también
* [[FastRelaxMover]]
* [[Relax]]: la aplicación relax
* [[Scripts de relax|RelaxScript]]
* [[I want to do x]]: guía para elegir un mover
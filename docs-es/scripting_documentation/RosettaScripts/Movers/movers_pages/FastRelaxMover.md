# FastRelax
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FastRelax

[[_TOC_]]

**Nota temporal:** la función de repulsión aumentada presentada en Rosettacon2018 se puede [[encontrar aquí|RelaxScript]].

Ejecuta el protocolo fast relax. Encuentra conformaciones de baja energía de la cadena principal y las cadenas laterales cerca de una conformación inicial, realizando muchas rondas de empaquetado y minimización, con el peso repulsivo de la función de puntuación aumentado gradualmente desde un valor muy bajo hasta el valor normal de una ronda a la siguiente.

## Uso

[[include:mover_FastRelax_type]]

El MoveMap (de FastRelax) está inicialmente configurado para minimizar todos los grados de libertad. Las líneas del movemap se leen en el orden en que están escritas en el archivo xml y pueden usarse para activar o desactivar grados de libertad. El movemap se analiza solo en el momento de aplicar el mover, de modo que se respeten el foldtree y la estructura cinemática de la Pose en el momento de la activación.

### Scripts de relax

Para ver una lista de los scripts de relax de la base de datos, [[haz clic aquí|RelaxScript]].

### Opciones de línea de comandos irrelevantes

Consulta la página de la [[aplicación relax|Relax]] para más información sobre estas opciones. Estas opciones NO LAS INTERPRETA el mover FastRelax; las interpreta en su lugar el código que envuelve al protocolo relax. Si usas FastRelax en XML, necesitarás varios movers más para lograr este efecto.

- `-relax:constrain_relax_to_start_coords`
- `-relax:constrain_relax_to_native_coords`
- `-relax:ramp_constraints`

### Advertencias

- Aunque la [[aplicación relax|Relax]] puede leer un movemap con la opción `-in:file:movemap`, el mover de RosettaScripts lo ignora. En su lugar, debes usar la sintaxis `<MoveMap>` descrita arriba.
- cartesian: para habilitar la minimización cartesiana (es decir, si obtienes el `ERROR: Scorefunction not set up for nonideal/Cartesian scoring`), debes poner `cart_bonded` en 0.5 y `pro_close` en 0.0.

### Simetría

FastRelax es totalmente compatible con la simetría y no requiere consideraciones especiales.

### Comportamientos obsoletos

Hasta el 8 de febrero de 2020, el comportamiento predeterminado de FastRelax era desactivar el empaquetado en todas las posiciones para las que el MoveMap había desactivado la minimización de la cadena lateral. Esto es poco intuitivo, ya que en todos los demás casos los MoveMaps controlan solo la minimización y no el empaquetado. (El empaquetado normalmente se controla con TaskOperations.) Por lo tanto, este comportamiento se ha declarado obsoleto. Todavía puede volver a habilitarse con la opción `movemap_disables_packing_of_fixed_chi_positions="true"` en RosettaScripts.

##Véase también
* [[FastDesignMover]]
* [[Relax]]: la aplicación relax
* [[Preparing structures]]: página sobre cómo preparar estructuras para usarlas en Rosetta con relax.
* [[I want to do x]]: guía para elegir un mover
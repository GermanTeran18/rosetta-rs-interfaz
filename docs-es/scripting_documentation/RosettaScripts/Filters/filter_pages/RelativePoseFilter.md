# RelativePose
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## RelativePose

Calcula el valor de un filtro relativo a la estructura de otro Pose. Es útil cuando quieres conocer los efectos de una mutación en distintos Poses. Se hace un alineamiento del Pose que se lee del disco con el Pose actualmente activo (mediante el alineamiento definido por el usuario) y se aplican los cambios de secuencia al Pose leído del disco, mientras se reempaqueta una capa alrededor de cada mutación. Luego puede aplicar un mover de relax, informar la evaluación de un filtro y volcar a disco un Pose puntuado. También funciona con Poses simétricos.

```xml
<RelativePose name="(&string)" pdb_name="(&string)" filter="(&string)" relax_mover="(null &string)" dump_pose="('' &string)" alignment="(&string; see below)" scorefxn="(score12 &string)" packing_shell="(8.0 &Real)" thread="(1 &bool)" baseline="(1 &bool)" unbound="(0 &bool)" copy_stretch="(1&bool)" rtmin="(0 &bool)" symmetry_definition="('' &string)" copy_comments="('' &comma-delimited list)">
```

-   pdb\_name: cuál es el Pose de referencia que se lee del disco.
-   filter: qué filtro se aplica.
-   relax\_mover: qué mover de relax se aplica después del threading.
-   dump\_pose: opcional: ¿se vuelca el Pose después del threading?
-   alignment: qué segmentos se alinean entre el Pose del disco y el Pose actual. Por defecto alinea de 1-\>nres. Para especificar algo distinto, usa el siguiente formato: 3A:1B,4A:2B,5A:6B, que significa alinear 3A-5A del Pose del disco con 1B, 2B y 6B del Pose actual. Solo se buscan mutaciones para el threading, entre el Pose del disco y el actual, en los segmentos alineados. Todo lo demás se ignora. Si no se especifica un número de residuo, el método alinea cadenas. Por ejemplo: A:D,B:B significa alinear A con D y B con B. No se hacen comprobaciones para garantizar la compatibilidad de longitudes, etc.
-   scorefxn: se usa para el empaquetado durante el threading y para puntuar el Pose volcado.
-   packing\_shell: radio de la capa alrededor de cada residuo que se reempaqueta después del threading. Cuanto más grande, más larga es la simulación.
-   thread: normalmente querrás que sea true. Solo no es así si estás estimando líneas base para el Pose del disco antes de hacer una ejecución real.
-   baseline: ¿usamos como referencia el Pose que se lee del disco? (significa que el valor devuelto por el filtro será igual al valor del filtro en tiempo de ejecución menos el valor de referencia.
-   unbound: antes del threading, ¿se debe disociar el complejo?
-   copy\_stretch: en lugar de hacer threading de las identidades de residuo en el Pose leído del disco, copia el segmento alineado del Pose actual en el Pose leído del disco (identidades de residuo + conformaciones). No se hace reempaquetado y se pasa directamente al relax. Obviamente el segmento debe estar prealineado para que esto tenga sentido, y probablemente solo debería usarse en cadenas enteras y no en tramos dentro de cadenas. En cualquier caso, ten cuidado al usarlo. Sin garantías.
-   rtmin: ¿hacer rtmin después del reempaquetado?
-   symmetry\_definition: si es simétrico, escribe aquí el archivo de definición de simetría.
-   copy_comments: una lista separada por comas de claves de comentarios del Pose que se copian desde el Pose de referencia (el Pose actual calculado en la trayectoria) al Pose relativo (el del disco). Útil si hay que comunicar un cambio conformacional del Pose de referencia al Pose relativo.

## Véase también

* [[CombinedValueFilter]]
* [[MoveBeforeFilter]]

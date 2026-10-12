# RepeatProteinRelax
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## RepeatProteinRelax

Ejecuta FastRelax en proteínas con repeticiones después de configurar la simetría interna

    <RepeatProteinRelax name="(&string)" scorefxn="(&string)" numb_repeats="(4 &int)" minimize="(false &bool)" loop_cutpoint_mode="false &bool" relax_iterations="(5 &int)" cartesian="(false &bool)
      min_type="(lbfgs_armijo_nonmonotone &string)" remove_symmetry="(true &bool)" modify_symmetry_and_exit="(false &bool)" 
    </RepeatProteinRelax>

Las opciones incluyen:
-   scorefxn (etiqueta de la función de puntuación)
-   numb_repeats (por defecto 4; **NOTA**: es el número de repeticiones de la proteína, no el número de repeticiones de fastrelax
-   minimize (ejecuta minimización en lugar de relax. No parece funcionar muy bien
-  loop_cutpoint_mode (añade cutpoints a los loops largos. Con anclajes y cutpoints se verá más movimiento en los loops)
-  relax_iterations (número de iteraciones de fastrelax; por defecto=5)
-  cartesian (activa el relax cartesiano; úsalo con una función de puntuación cartesiana)
-  remove_symmetry (permite que el mover abandone la simetría al terminar. 
-  modify_symmetry_and_exit (solo configura la simetría)

NOTA: asegúrate de usarlo con estas opciones:
-  -symmetry_definition stoopid
-  -old_sym_min true

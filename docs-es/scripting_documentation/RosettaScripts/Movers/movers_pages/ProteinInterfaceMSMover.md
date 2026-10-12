# ProteinInterfaceMS
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## ProteinInterfaceMS

Diseño multiestado de una interfaz de proteínas. El estado objetivo es el complejo unido (de entrada) y los dos estados competidores son los compañeros no unidos y los compañeros no unidos y desplegados. Usa algoritmos genéticos para seleccionar, mutar y recombinar entre una población de secuencias diseñadas iniciales. Para más detalles, consulta Havranek & Harbury NSMB 10, 45.

```xml
<ProteinInterfaceMS name="&string" generations="(20 &integer)" pop_size="(100 &integer)" num_packs="(1 &integer)" pop_from_ss="(0 &integer)" numresults="(1 &integer)" fraction_by_recombination="(0.5 &real)" mutate_rate="(0.5 &real)" boltz_temp="(0.6 &real)" anchor_offset="(5.0 &real)" checkpoint_prefix="('' &string)" gz="(0 &bool)" checkpoint_rename="(0 &bool)" scorefxn="(score12 &string)" unbound="(1 &bool)" unfolded="(1&bool)" input_is_positive="(1&bool)" task_operations="(&comma-delimited list)" unbound_for_sequence_profile="(unbound &bool)" profile_bump_threshold="(1.0 &Real)" compare_to_ground_state="(see below & bool)" output_fname_prefix="('' &string)">
   <Positive pdb="(&string)" unbound="(0&bool)" unfolded="(0&bool)"/>
   <Negative pdb="(&string)" unbound="(0&bool)" unfolded="(0&bool)"/>
   .
   .
   .
</ProteinInterfaceMS>
```

El archivo de entrada (-s o -l) se considera un estado positivo o negativo (según la opción input\_is\_positive). Si unbound y unfolded son true en la línea de opciones principal, los estados no unido y desplegado se añaden como competidores. Se puede añadir cualquier número de estados positivos y negativos adicionales. Unbound y unfolded tienen un significado distinto para estos estados: si se marca unbound, el complejo se separará y se añadirá el estado no unido. Si se marca unfolded, se añadirá la proteína no unida y desplegada.

unbound\_for\_sequence\_profile: usa la estructura no unida para generar un Pose de alaninas y eliminar los residuos que no se permiten porque chocarían en la estructura monomérica. Por defecto es true, si se usa unbound como estado competidor. profile\_bump\_threshold: qué umbral de choque se usa arriba. La diferencia entre el choque calculado y el choque en el Pose de alaninas se compara con este umbral.

compare\_to\_ground\_state: por defecto, si añades estados a la lista con las etiquetas Positive/Negative, las energías de todos los estados adicionales se ponen a cero en sus valores de «mejor puntuación». Esto permite al usuario anular ese comportamiento. Consulta el código para más detalles.

output\_fname\_prefix: todos los estados positivos/negativos definidos por el usuario se escribirán al final de la ejecución con este prefijo. Cada estado tendrá su secuencia cambiada según la secuencia final y luego se reempaquetarán y puntuarán todos los estados según la taskfactory de entrada.

Reglas prácticas para elegir los parámetros. El fitness F se define como:

    F = Sum_+( exp(E/T) ) / ( Sum_+( exp(E/T) ) + Sum_-( exp(E/T) ) + Sum_+((E+anchor)/T) )

donde Sum\_- y Sum\_+ son la suma sobre los estados negativos y positivos, respectivamente.

Los valores de F van de 1 (sesgo perfecto hacia el estado +) a 0 (sesgo perfecto hacia el estado -). El valor devuelto por el método PartitionAggregateFunction::evaluate es -F, con valores que van de -1 a 0, respectivamente. Puedes seguir el progreso de MSD observando los fitness informados para las variantes de una población en cada generación. Si todos los parámetros están bien fijados (temperatura, etc.), cabe esperar un amplio rango de valores en la generación 1 (-0.99 - 0), que va siendo sustituido gradualmente por variantes de mayor fitness. Al final de la simulación, la población se habrá desplazado a -1.0 - -0.5 aproximadamente.

Como regla práctica, es útil considerar un problema de dos estados, +/-, ignorando el ancla (véase más abajo; equivale a fijar el ancla muy alta). En este caso FITNESS se simplifica a:

    F = 1/(exp( (dE)/T ) + 1 )

y la derivada es:

    F' = 1/(T*(exp(-dE/T) + exp(dE/T) + 2)

donde dE=E\_+ - E\_-

Un buen valor de T sería aquel para el que F' sea apreciable (digamos, mayor que 0.05) en los valores de dE que quieras alcanzar entre el estado positivo y el negativo. Como despejar T en F' no es sencillo, puedes graficar F y F' a distintas temperaturas para identificar un valor razonable de T, para el que F'(dE, T) esté por encima de cierto umbral. Si eres perezoso como yo, fija T=dE/3. Así, si quieres lograr diferencias de al menos 4.5 e.u entre los estados positivo y negativo, usa T=1.5.

Para graficar estas funciones usa MatLab o algún servidor web, p. ej., [http://www.walterzorn.com/grapher/grapher\_e.htm](http://www.walterzorn.com/grapher/grapher_e.htm).

El valor anchor\_offset sirve para fijar un estado competidor (negativo) a cierta energía por encima de la mejor energía del estado positivo. Es una garantía computacionalmente barata de que, a medida que la especificidad cambia a favor del estado positivo, la estabilidad del sistema no se vea demasiado comprometida. Fija anchor\_offset en un valor que corresponda a la cantidad de energía a la que estás dispuesto a renunciar en favor de la especificidad.


##Véase también

* [[Aplicación de diseño multiestado|mpi-msd]]
* [[DnaInterfacePackerMover]]
* [[InterfaceAnalyzerMover]]
* [[InterfaceRecapitulationMover]]
* [[InterfaceScoreCalculatorMover]]
* [[I want to do x]]: guía para elegir un mover

#StepWiseSampleAndScreen
`StepWiseSampleAndScreen` ejecuta el bucle principal del muestreo stepwise, ya sea en modo enumerativo o en modo estocástico. Mira en `src/protocols/stepwise/modeler/StepWiseConnectionSampler` para ver un ejemplo de configuración.

#Ingredientes
------------
`StepWiseSampleAndScreen` se inicializa con dos cosas:

• un objeto `StepWiseSampler` que delimita los grados de libertad que se van a muestrear, sus valores discretos y en qué orden van. Aquí hay algunos trucos para manejar el muestreo de cuerpo rígido. Este objeto `StepWiseSampler` suele ser, a su vez, la composición de varios objetos `StepWiseSampler`.

• un vector de objetos `StepWiseScreener` que delimitan la serie de filtros, packers y cerradores de loops que se ejecutan después de aplicar cada muestra al Pose. Tener estos cribadores en un orden concreto puede acelerar el muestreo, y en algunos casos hay dependencias (por ejemplo, un cribador de selección de Poses debe ir al final, después de los packers de cadenas laterales y de los cerradores de loops que fijan la cadena principal).

La arquitectura de cada uno de estos objetos se describe en las páginas [[StepWiseSampler|stepwise-sampler]] y [[StepWiseScreener|stepwise-screener]].

#Cómo usarlo
-----------
**Aún sin comprobar**
```
  StepWiseSamplerBaseOP sampler = new StepWiseSampler;
  //  initialize -- see link to documentation for StepWiseSampler...
  sampler->set_random( true );

  utility::vector1< screener::StepWiseScreenerOP > screeners_;
  //  initialize -- see link to documentation for StepWiseScreener...
  clusterer_ = new align::StepWiseClusterer( options_ );
  screeners_.push_back( new PoseSelectionScreener( pose, scorefxn_, clusterer_ ) );

  StepWiseSampleAndScreen sample_and_screen( sampler, screeners );
  sample_and_screen.set_verbose( true );
  sample_and_screen.set_max_ntries( 100 ); // if sampler is in random mode
  sample_and_screen.set_num_random_samples( 5 ); // find 5 poses 
  sample_and_screen.run();

  pose_list_ = clusterer_->pose_list(); // list of up to 5 poses in the last screener.

```

# Por qué está escrito así
-----------------------------
Básicamente, este objeto sustituye a los enormes bucles dentro de bucles dentro de bucles que originalmente afectaban al código de `stepwise`. Lo sustituimos porque:

• Con los antiguos bucles anidados:

 - Era difícil añadir nuevas funcionalidades.
 - Era difícil cambiar el orden de los distintos cribados/filtros/acciones. 
 - Efectos de memoria: por ejemplo, si en algún punto del bucle se empaquetaban las cadenas laterales, no siempre nos acordábamos de reinicializarlas antes de comprobar la siguiente configuración de la cadena principal.
 - Por velocidad, mantenemos distintos Poses con distintos conjuntos de ResidueTypeVariants (cambiarlos, por ejemplo para añadir variantes de corte de cadena, es costoso en Rosetta). De nuevo, llevar la cuenta de qué Poses habían aceptado las muestras de la cadena principal, etc., se estaba complicando.

StepWiseSampleAndScreen resuelve en su mayor parte estos problemas.
 
• Otra buena característica del marco StepWiseSampleAndScreen: solo guarda Poses en memoria cuando han pasado todos los cribados. Eso le permite manejar cálculos de muestreo que enumeran literalmente decenas de millones de muestras. Las alternativas que consideramos, en las que pasábamos listas de Poses en serie por distintos muestreadores, llevaron a explosiones de memoria.


#El bucle principal
--------------
La forma en que funcionan estos objetos se ve mejor en el propio código, que en realidad es muy corto:

```
	for ( sampler_->reset(); sampler_->not_end(); ++( *sampler_ ) ) {

			if ( sampler_->random() && ( num_tries() >= max_ntries_ || num_successes() >= num_random_samples_ ) ) break;
			update_movers->clear();
			restore_movers->clear();
			set_ok_to_increment();

			for ( n = 1; n <= num_screeners(); n++ ){

				StepWiseScreenerOP screener = screeners_[ n ];
				screener->get_update( sampler_ );
				if ( n > 1 ) screener->apply_mover( update_movers, 1, n - 1 ); //info from previous screeners.

				if ( screener->check_screen() ){
					screener->increment_count();
					screener->add_mover( update_movers, restore_movers );
					early_exit_check( n ); // for debugging.
				} else {
					screener->fast_forward( sampler_ );	break;
				}
			} // check screens

			Size const last_passed_screener = n - 1;
			for ( Size m = 2; m <= last_passed_screener; m++ ) screeners_[ m ]->apply_mover( restore_movers, m - 1, 1 );

		} // sampler
```

# Notas sobre los pasos del código.
--------------------------
• Ten en cuenta que este `StepWiseSampleAndScreen` **no** recibe un `pose`. En cambio, los distintos Poses en juego están codificados en los objetos `StepWiseScreener`, que contienen el Pose real que se muestra en los gráficos, copias del Pose, una colección de Poses (por ejemplo, para el paso final de agrupamiento) o ningún Pose (por ejemplo, en el docking de cuerpo rígido algunos Screeners solo manipulan Stubs por velocidad).

• Como se prometió, el bucle principal recorre el `StepWiseSampler` de `sampler`.

• El muestreo estocástico consiste en poner `choose_random()` en true. En ese caso el muestreo continúa hasta que se encuentran `num_random_samples` Poses. 

• El muestreo enumerativo consiste en poner `choose_random()` en false. En ese caso el muestreo continúa hasta que `sampler_` se agota, es decir, cuando `sampler_->not_end()` devuelve `false`. Hay una forma de parar antes en las pruebas de integración (un tipo de `StepWiseScreener` llamado `IntegrationTestBreaker`, equivalente a un `break` en un bucle).

• En el corazón del bucle sobre la serie `screeners_` está `check_screen()`. Si pasa, incrementamos el contador de ese cribador. Esto permite generar al final una 'tabla de recortes' final de `StepWiseSampleAndScreen` mediante `output_counts()`. Si no se pasa la comprobación, el cribador puede contener instrucciones sobre cómo `fast-forward` (avanzar rápido) por el bucle del muestreador. Esta última acción es equivalente a un `continue` en un bucle.

• Los objetos `update_movers` almacenan información que se puede pasar de un `StepWiseScreener` a los posteriores. Por ejemplo, si al principio hay un ProteinCCD_ClosureScreener, este resuelve las torsiones de la cadena principal que cierran un loop dentro de su propio Pose privado y luego codifica la aplicación de esas torsiones en un Mover (consulta la línea `screener->add_mover`). Ese mover se pasa a cribadores posteriores (por ejemplo, packers) que tienen sus propias copias privadas del Pose, con variantes o secuencias posiblemente distintas; estos aplican la solución de cierre y luego hacen lo suyo. Esa es la línea `if ( n > 1 ) screener->apply_mover( update_movers, 1, n - 1 );`.

• Se supone que la lista `restore_movers` almacena exactamente lo contrario de cada `update_mover`. Esa es la línea del final del bucle `for ( Size m = 2; m <= last_passed_screener; m++ ) screeners_[ m ]->apply_mover( restore_movers, m - 1, 1 );`. El `restore_mover` aún no está implementado para algunos objetos `StepWiseScreener`, para coincidir con algunas decisiones históricas durante el desarrollo del código, pero se implementará pronto; conceptualmente es el camino correcto.

• La función `set_ok_to_increment()` es una especie de apaño que hace que estos contadores de `StepWiseScreener` de bucles internos no se incrementen en cierto muestreo de la ribosa del RNA. (Puede quedar obsoleta pronto; se trabaja en una forma más intuitiva de manejar estos pasos de muestreo).

• Depurar lo que ocurre en StepWiseSampleAndScreener puede requerir ahondar en los cribadores y encontrar su estado interno y/o sus Poses; un ejemplo de esto está en `early_exit_check`. Este bloque de código se omite actualmente mediante un `return` temprano, pero se dejó como ejemplo de cómo ahondar en el bucle principal.


---
Vuelve a la [[visión general de StepWise|stepwise-classes-overview]].

##Véase también

* [[Stepwise options]]: Clases de opciones del código de Stepwise
* [[Writing an application]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[Stepwise]]: La aplicación StepWise MonteCarlo
* Aplicaciones para el ensamblaje stepwise determinista:
  * [[Ensamblaje stepwise para loops de proteínas|swa-protein-main]]
    * [[Documentación adicional|swa-protein-long-loop]]
  * [[Modelado de loops de RNA con ensamblaje stepwise|swa-rna-loop]]
* [[Structure prediction applications]]: Incluye enlaces a estas y otras aplicaciones de modelado de loops
* [[RosettaScripts]]: La página de inicio de RosettaScripts
* [[Application Documentation]]: Lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: Ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: Consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: Guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: Una lista de líneas de comando de ejemplo para ejecutar los archivos ejecutables de Rosetta

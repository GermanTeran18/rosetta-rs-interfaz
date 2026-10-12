#StepWiseSampler
Los objetos `StepWiseSampler` se concatenan para definir el bucle de muestreo y pueden recorrer millones de Poses.

#Cómo usarlo

El código de la carpeta `src/protocols/stepwise/StepWiseSampler` corresponde a la clase StepWiseSampler y sus subclases,
que es una subclase de moves::Mover.

Organización de las carpetas
-------------------
La ruta raíz contiene clases base abstractas genéricas y clases base
sencillas para la herencia y la funcionalidad básica.

Algunas clases toman varias instancias de muestreadores de rotámeros y las ensamblan de forma
lineal o combinatoria para tareas complejas (por ejemplo, StepWiseSamplerComb,
StepWiseSamplerSizedAny).

La carpeta `rna/` contiene muestreadores StepWiseSampler específicos de RNA para la cadena principal, el anillo del azúcar
y el ángulo chi.

Cómo usarlo
----------
Los muestreadores StepWiseSampler aplican nuevas conformaciones de rotámeros a un Pose hasta que se han recorrido todos
los rotámeros.

Código de ejemplo:
```
RNA_SuiteStepWiseSampler sampler( ... ); //Declaration
//Various settings
sampler.set_fast( true );
sampler.set_random( false ); //Controls random sampling
//NEVER FORGET to initialize after setting
sampler.init();

//For non-random sampling (sampler ends at at finite # of steps)
for ( sampler.reset(); sampler.not_end(); ++sampler ) {
  sampler.apply( pose ); //Apply rotamer to pose
  ...
}

//For random sampling (sampler never ends)
sampler.set_random( true );
sampler.reset();
Size const max_tries = 10000;
for ( Size i = 1; i <= max_tries; ++i, ++sampler ) {
  sampler.apply( pose ); //Apply rotamer to pose
  ...
}
```

----
Vuelve a [[StepWiseSampleAndScreen|stepwise-sample-and-screen]].

Vuelve hasta el principio, a la [[visión general de StepWise|stepwise-classes-overview]].

##Véase también

* [[Stepwise options]]: Clases de opciones del código de Stepwise
* [[Writing an application]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[I want to do x]]: Guía para elegir movers para perturbaciones estructurales
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

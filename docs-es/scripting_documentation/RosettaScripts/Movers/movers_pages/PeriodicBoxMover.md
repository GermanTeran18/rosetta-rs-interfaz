# PeriodicBoxMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PeriodicBoxMover

Este mover ejecuta una simulación de Monte Carlo (MC) en condiciones isotérmicas-isobáricas (NPT) sobre una caja con condiciones de contorno periódicas. Puede aplicarse a un amplio rango de (moléculas pequeñas) para extraer sus propiedades termodinámicas. Actualmente se ha aplicado a simulaciones en estado líquido de moléculas pequeñas; consulta Park et al (2016), "Simultaneous optimization of biomolecular energy function on features from small molecules and macromolecules", _JCTC_. Se añadirán más detalles próximamente. 

    <PeriodicBoxMover name=(&string) scorefxn=(&string)
                      nmol_side=(5 &Size) nsteps_equilibrate=(500000 &Size) nsteps_sim=(1000000 &Size) 
                      vol_step=(40.0 &Real) rot_step=(15.0 &Real) tor_step=(15.0 &Real) resize_vol_every=(&Size)
                      temp=(160.0 &Real) pressure=(1.0 &Real) correct_LJtruncation=(false &bool)
                      report_scorefile=(&string) dump_every=(0 &Size) report_every=(0 &Size) report_thermodynamics=(0 &Size)            
                      initial_density=(1.0 &Real) istart=(0 &Size) />

-  scorefxn: archivo de pesos para la simulación. 
-  nmol\_side: número de moléculas por cada dimensión; moléculas totales = nmol\_side^3
-  steps\_equilibrate: número de pasos de MC para la equilibración
-  steps\_sim: número de pasos de MC para la simulación de producción
-  vol\_step: magnitud máxima del movimiento de cambio del volumen total de la caja de simulación. El valor adecuado puede variar con nmol\_side.  
-  rot\_step: magnitud máxima del movimiento de rotación. 
-  tor\_step: magnitud máxima del movimiento de torsión. Intentará rotar las torsiones indicadas en el archivo de residuo.
-  resize\_vol\_every: con qué frecuencia se llama al movimiento de volumen durante el MC. En los demás pasos se llamará al azar al movimiento de rotación o al de torsión. 
-  temp: temperatura en kelvin
-  pressure: presión en atm.
-  correct\_LJtruncation: si se añade la corrección debida a la interacción LJ de largo alcance (integrando sobre la distancia desde fa_max_dis hasta el infinito); **debe activarse para la simulación de líquidos.**
-  report\_scorefile: nombre del archivo donde se informa de los componentes de energía a lo largo de la trayectoria.
-  dump\_every: con qué frecuencia se volcará el silent file (si se solicita)
-  report\_every: con qué frecuencia se volcarán los componentes de energía al archivo de puntuación.
-  report\_thermodynamics: con qué frecuencia se informará de las propiedades termodinámicas; por ahora no es muy útil.
-  initial\_density: densidad inicial de las moléculas pequeñas en g/cm^3. La estimación inicial es 1.0, por el agua, pero en general otras moléculas pequeñas tienen densidades menores.
-  istart: paso de simulación con el que empezar; se usa para continuar una simulación.

### Reinicio de la simulación
Por completar (TBA).

### Relacionado con la simulación de líquidos
- Todos los pesos de ejemplo, las opciones en XML y la línea de comandos se proporcionan en Park et al (2016).
- Análisis del resultado:
 Se pueden calcular propiedades de líquidos como el «calor de vaporización», la «densidad», la «capacidad calorífica», etc., procesando el report\_scorefile. Para un script de análisis de ejemplo, contacta con Hahnbeom Park (hahnbeom@gmail.com). 


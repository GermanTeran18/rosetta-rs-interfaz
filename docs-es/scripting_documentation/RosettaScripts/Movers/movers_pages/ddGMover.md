# ddG
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ddG

[[include:mover_Ddg_type]]

Ddg (o delta-delta-G) es una estimación de la energía de unión de un complejo.  Se calcula tomando la diferencia entre la energía del complejo y la de los componentes separados.  Se puede hacer repacking o relax del estado unido y/o del no unido; en ese caso se recomienda promediar varios intentos.

Este mover es útil para informar de los ddg totales o por residuo en casos en los que, por algún motivo, no quieras usar el [[filtro Ddg|DdgFilter]]. (Por ejemplo, el filtro Ddg no puede calcular actualmente ddg por residuo). Las puntuaciones ddg se informan como pares cadena-real en el trabajo. La puntuación ddg total tiene la etiqueta "ddg" y cada ddg por residuo tiene la etiqueta "residue\_ddg\_n", donde n es el número de residuo.


`repack_bound` y `repack_unbound` controlan si se aplica repacking global a los estados unido y no unido, respectivamente.  Ambos son true por defecto, aunque esto puede resultar costoso para estructuras grandes (y puede producir ruido irrelevante causado por distintas configuraciones de residuos alejados de la interfaz de unión).  Las opciones `relax_bound` y `relax_unbound` ofrecen una alternativa, siempre que se proporcione un mover de relax configurado con la opción `relax_mover`.  Esto permite al usuario especificar, por ejemplo, un FastRelaxMover que solo haga repacking y minimización de las cadenas laterales de la interfaz de unión.

`chain_num` y `chain_name` permiten especificar una lista de números de cadena o nombres de cadena para calcular el ddg, en lugar de un único salto. No se puede mover la cadena 1; mover todas las demás cadenas es lo mismo que mover la cadena 1, así que haz eso. Si se especifica `filter`, el valor calculado del filtro se usará para la diferencia de puntuación informada, en lugar de la función de puntuación dada. No se admite el uso del filtro con ddG por residuo.



Este mover admite el método de energía de Poisson-Boltzmann, ya que establece el entorno de ejecución para indicar el estado que se está alterando, unido o no unido. Si se usa correctamente junto con SetupPoissonBoltzmannPotential (mover), el método de energía (véase: core/scoring/methods/PoissonBoltzmannEnergy) se activa para resolver la PDE solo cuando la conformación en el estado correspondiente ha cambiado lo suficiente. Como ddG usa centroides de todos los átomos para determinar el vector de separación cuando las cadenas móviles se especifican por salto, se recomienda encarecidamente usar chain\_num/chain\_name para especificar las cadenas móviles, y así evitar invalidar la caché de PB del estado no unido por pequeños cambios en la posición de los átomos.

Ejemplo:

El script siguiente muestra cómo activar PB con el mover ddg. Tengo APBS (Adaptive Poisson-Boltzmann Solver) instalado en /home/honda/apbs-1.4/ y el ejecutable "apbs" está en el subdirectorio bin/. En este caso la cadena 1 está cargada. Puedes indicar más de una cadena separándolas con comas (sin espacios adicionales; p. ej. "1,2,3"). Uso la función de puntuación completa como base y añado el término PB.

    <SCOREFXNS>
        <ScoreFunction name="sc12_w_pb" weights="score12_full" patch="pb_elec"/>  patch PB term
    </SCOREFXNS>
    <MOVERS>
        <SetupPoissonBoltzmannPotential name="setup_pb" scorefxn="sc12_w_pb" charged_chains="1" apbs_path="/home/honda/apbs-1.4/bin/apbs"/>
        <ddG name="ddg" scorefxn="sc12_w_pb" chain_num="2"/>
    </MOVERS>
    <FILTERS>
        ...
    </FILTERS>
    <PROTOCOLS>
        <Add mover_name="setup_pb"/>  Initialize PB
        <Add mover_name="..."/>  some mover
        <Add mover_name="ddg"/> use PB-enabled ddg as if filter
        <Add filter_name="..."/>  more filtering
    </PROTOCOLS>


##Véase también

* [[SetupPoissonBoltzmannPotentialMover]]
* [[Filtro Ddg|DdgFilter]]: Un filtro para descartar complejos con un valor de Ddg demasiado bajo.
* [[ddg-monomer]]: Aplicación para calcular valores de ddg para proteínas monoméricas
* [[I want to do x]]: Guía para elegir un mover
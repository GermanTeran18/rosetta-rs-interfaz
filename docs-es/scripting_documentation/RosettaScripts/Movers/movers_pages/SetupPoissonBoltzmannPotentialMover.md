# SetupPoissonBoltzmannPotential
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SetupPoissonBoltzmannPotential

Inicializa el entorno de ejecución para el solucionador de Poisson-Boltzmann. Permite hacer un seguimiento de las mutaciones de la proteína para minimizar el número de evaluaciones de PB.

Por ahora la función solo es compatible con el mover y el filtro **ddG**.

**[ Requisitos previos ]**

-   Compila la versión personalizada de [APBS](http://www.poissonboltzmann.org) e [iAPBS](http://mccammon.ucsd.edu/iapbs), según las instrucciones que figuran en /path/to/rosetta/rosetta\_source/external/apbs/apbs-1.4-rosetta/README.

<!-- -->

       APBS:
        Baker NA, Sept D, Joseph S, Holst MJ, McCammon JA. Electrostatics of 
        nanosystems: application to microtubules and the ribosome. Proc. Natl. 
        Acad. Sci. USA 98, 10037-10041 2001. (Link)

       iAPBS:
        Robert Konecny, Nathan A. Baker and J. Andrew McCammon, 
        iAPBS: a programming interface to Adaptive Poisson-Boltzmann Solver 
        (APBS), Computational Science & Discovery, 2012, 5, 015005 (preprint).

        The iAPBS development is supported by grants from the National Center for 
        Research Resources (5P41RR008605-19) and the National Institute of General 
        Medical Sciences (8P41GM103426-19) from the National Institutes of Health. 

-   Compila Rosetta con el argumento **extras=apbs**. Esto hará que tu aplicación se enlace con las bibliotecas APBS/iAPBS.

-   Fija la variable de entorno LD\_LIBRARY\_PATH en

<!-- -->

    export LD_LIBRARY_PATH=/path/to/rosetta/Rosetta/main/source/external/apbs/apbs-1.4-rosetta/lib:${LD_LIBRARY_PATH}

-   En tu script de Rosetta, llama a **SetupPoissonBoltzmannPotential** antes de que se evalúe cualquier scorefxn con PB habilitado (es decir, una scorefxn con **pb\_elec**).

**[ Uso ]**

    <SetupPoissonBoltzmannPotential name="pb_setup" scorefxn="sc12_pb" charged_chains="1" epsilon="2.0" sidechain_only="true" revamp_near_chain="2" potential_cap="20.0" apbs_debug="2" calcenergy="false"/>

-   name: nombre arbitrario que se usa para referirse al mover
-   charged\_chains: lista de números de cadenas cargadas (\>=1) separados por comas, p. ej., charged\_chains=1,2,3 para las cadenas 1, 2 y 3. No se permiten espacios en blanco adicionales.
-   epsilon (opcional): tolerancia de mutación en Å. El potencial se recalcula solo cuando | Ca1 - Ca2 | \> epsilon, para todo Ca1 carbono alfa del Pose anterior y todo Ca2 del Pose actual. El valor por defecto es 2.0 Å.
-   sidechain\_only (opcional): pon "true" para limitar el cálculo de interacciones a la cadena lateral. Por defecto "false"
-   revamp\_near\_chain (opcional): lista de números de cadena separados por comas. Reduce las interacciones PB si están cerca de la(s) cadena(s) dada(s). Por defecto ninguna.
-   potential\_cap (opcional): límite superior para la entrada del potencial PB. Por defecto 20.0.
-   apbs\_debug (opcional): nivel de depuración de APBS [0-6]. Por defecto 2.
-   calcenergy (opcional): pon "true" para calcular la energía. Todavía no implementado. Por defecto false.

Advertencia: presta atención a los movers o filtros que preevalúan la puntuación cuando sus definiciones XML aparecen y se analizan dentro de tu archivo de script. Usa SavePoseMover para diferir el momento de su preevaluación. Un filtro que se sabe que lo hace hoy es el filtro DeltaDdg. Evalúa la scorefxn cuando la definición aparece en el script XML. Así se difiere para que PB funcione.

**[ Ejemplo ]**

    <SCOREFXNS>
        <ScoreFunction name="sc12_pb" weights="score12_full" patch="pb_elec"/>
    </SCOREFXNS>
    <MOVERS>
       <SetupPoissonBoltzmannPotential name="pb_setup" charged_chains="1" scorefxn="sc12_pb" />
       <SavePoseMover name="save_after_pb_setup" reference_name="pose_after_setup"/> 
    </MOVERS>
    <FILTERS>
       <Ddg name="ddg" scorefxn="sc12_pb" confidence="0" repeats="1"/>
       <Delta name="delta_ddg" filter="ddg"  reference_name="pose_after_setup" lower="0" upper="1" range="-0.5"/> # defers scoring till the ref pose is saved
    </FILTERS>
    <PROTOCOLS>
       <Add mover_name="pb_setup"/>  # init PB
       <Add mover_name="save_after_pb_setup"/>  # save the reference pose
       ...
       <Add filter_name="delta_ddg"/>
    </PROTOCOLS>

La mutación de la proteína se monitoriza tanto para los estados unido como no unido, y se guarda en caché un Pose para cada estado, para todas las funciones de puntuación por defecto. Si necesitas guardar en caché Poses distintos según la scorefxn, tienes que personalizar las etiquetas asociadas a los Poses en caché usando \<Set\> en las scorefxns.

    <SCOREFXNS>
       <ScoreFunction name="sc12_pb" weights="score12_full" patch="pb_elec">
          <Set pb_bound_tag="MyBound"/>       # cache pose as "MyBound"
          <Set pb_unbound_tag="MyUnbound"/>   # cache pose as "MyUnbound"
       </ScoreFunction>
    </SCOREFXNS>

Los valores por defecto son "bound" y "unbound", respectivamente.

##Véase también

* [[ddGMover]]: admite el método de energía de Poisson-Boltzmann
* [[I want to do x]]: guía para elegir un mover

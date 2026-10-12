# PlaceStub
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PlaceStub

Colocación de cadenas laterales basada en hotspots. Es el principal caballo de batalla del método centrado en hotspots para el diseño de proteínas de unión. Próximamente se publicará un artículo que describe el método y un benchmark. El «stub» (residuo hotspot) se elige al azar del conjunto de stubs proporcionado. Para minimizar hacia el stub (durante la colocación), el usuario puede definir una serie de movers (etiqueta StubMinimize) que pueden combinarse con un peso. El peso determina la intensidad de las restricciones de stub de la cadena principal que influirán en el mover con el que está emparejado. Por último, se crean una serie de movers de diseño definidos por el usuario (etiqueta DesignMovers) y el resultado se filtra según final\_filter.

Para sistemas complicados, hay algunas limitaciones de PlaceStub que debes conocer:
* PlaceStub parece asumir que la «diana» (proteína inmóvil) está en la primera cadena y el «scaffold» (la proteína que se acopla) está en la segunda cadena. Tener más de dos cadenas puede dar resultados inesperados o errores.
* PlaceStub no parece funcionar bien con ciertas moléculas de ligando. Eliminar de tu Pose los residuos que no sean proteína puede resolver ciertos errores.
* Se ha discutido (hacia diciembre de 2016) eliminar APPLY_TO_POSE de RosettaScripts.

Hay dos formas principales de usar PlaceStub:

1.  PlaceStub (por defecto). Mueve el stub para que quede encima de la posición actual del scaffold y luego avanza para intentar recuperar la posición original del stub.
2.  PlaceScaffold. Mueve el scaffold para que quede encima del stub. Conservarás las magníficas interacciones del hotspot, pero sufrirás efectos de palanca en el lado del scaffold. PlaceScaffold puede usarse como sustituto del docking desactivando la opción "triage\_positions".

```xml
<PlaceStub name="(&string)" place_scaffold="(0 &bool)" triage_positions="(1 &bool)" chain_to_design="(2 &integer)" score_threshold="(0.0 &Real)" allowed_host_res="(&string)" stubfile="(&string)" minimize_rb="(0 &bool)" after_placement_filter="(true_filter &string)" final_filter="(true_filter &string)" max_cb_dist="(4.0 &Real)" hurry="(1 &bool)" add_constraints="(1 &bool)" stub_energy_threshold="(1.0 &Real)" leave_coord_csts="(0 &bool)" post_placement_sdev="(1.0 &Real)">
     <StubMinimize>
        <Add mover_name="(&string)" bb_cst_weight="(10, &Real)"/>
     </StubMinimize>
     <DesignMovers>
        <Add mover_name="(&string)" use_constraints="(1 &bool)" coord_cst_std="(0.5 &Real)"/>
     </DesignMovers>
     <NotifyMovers>
        <Add mover_name="(&string)"/>
     </NotifyMovers>
</PlaceStub>
```

-   place\_scaffold: usa PlaceScaffold en lugar de PlaceStub. Esto colocará el scaffold en la posición del stub mediante un enfoque de rotámero inverso.
-   triage\_positions: elimina posibles posiciones del scaffold según umbrales de distancia/restricción. Acelera la búsqueda, pero debe desactivarse para usar place\_scaffold=1 como sustituto del docking (es decir, al colocar el scaffold en posiciones independientemente de la estructura de entrada). triage\_positions=1 descarta colocaciones según si el hotspot está lo bastante cerca (dentro de max\_cb\_distance) y si los vectores del hotspot se alinean con los de la posición anfitriona (con cierta tolerancia).
-   chain\_to\_design
-   score\_threshold
-   allowed\_host\_res: una lista de residuos del scaffold anfitrión donde se puede colocar el stub. La lista debe estar separada por comas y puede contener índices de Rosetta (p. ej., 123) o índices de PDB (p. ej., 123A). Ten en cuenta que los residuos permitidos deben igualmente superar el paso de descarte (si está habilitado) y otras restricciones sobre qué residuos pueden diseñarse (p. ej., que no sea prolina).
-   stubfile: usa un archivo de stubs distinto del que se usó para crear las restricciones. Es útil para colocar stubs uno tras otro.
-   minimize\_rb: ¿queremos minimizar los grados de libertad rb durante la colocación del stub? Esto permitirá que un stub colocado previamente se mueva un poco para acomodar el nuevo stub. Es buena idea usarlo con el stub colocado previamente añadiendo sus restricciones implícitas.
-   after\_placement\_filter: el nombre de un filtro que se aplica inmediatamente después de la colocación del stub y de los movers StubMinimize, pero antes de que se ejecuten los DesignMovers. Útil para una comprobación rápida de la calidad del stub.
-   final\_filter: el nombre de un filtro que se aplica en la etapa final de la colocación del stub como última prueba, después de que se ejecuten los DesignMovers. Útil, por ejemplo, si queremos que un stub forme un enlace de hidrógeno con un residuo diana concreto.
-   max\_cb\_dist: la distancia cb-cb máxima entre el stub y un posible residuo anfitrión para considerarlo en la colocación
-   hurry: usa una función de puntuación truncada para la minimización. Aumenta mucho la velocidad y no parece ser menos precisa.
-   add\_constraints: ¿debemos aplicar las restricciones de coordenadas a este stub?
-   stub\_energy\_threshold: los decoys solo se consideran si la energía de un solo residuo del stub está por debajo de este valor
-   leave\_coord\_csts: ¿deben dejarse activadas las restricciones de coordenadas cuando la colocación termina con éxito? Es útil si planeas hacer movimientos después de la colocación y quieres que se respete la colocación del hotspot. Ten en cuenta que diseñar un residuo que tiene restricciones es probable que cause fallos. Puedes usar task operations para impedir que ese residuo se diseñe.
-   post\_placement\_sdev: relacionado con el punto anterior. Cuanto menor sea la sdev (hacia 0), más estricta es la restricción.

Los tracers disponibles son:

-   protocols.ProteinInterfaceDesign.movers.PlaceStubMover: documentación ligera de la ejecución
-   STATS.PlaceStubMover: estadísticas de distancias y valores de puntuación durante la colocación
-   DEBUG.PlaceStubMover: documentación con más carga de entrada/salida

Documentación generada a partir del código fuente:
[[include:../../xsd/mover_PlaceStub_type]]


**Submovers:** los submovers se usan para determinar qué movimientos se aplican tras la colocación del stub. Por ejemplo, una vez elegido un stub, un mover StubMinimize puede intentar optimizar el Pose actual hacia ese stub. Se puede usar un DesignMover para diseñar el Pose alrededor de ese stub. Usar submovers DesignMover dentro de PlaceStub (en lugar de movers RepackMinimize fuera de PlaceStub) permite tener una «memoria» de qué stub se ha usado. De este modo, un DesignMover puede no superar un filtro sin hacer que la trayectoria se reinicie por completo. En su lugar, el mover PlaceStub externo elegirá otro stub y la trayectoria continuará.
 Hay dos tipos de submovers que se pueden llamar dentro del mover.

1.  **StubMinimize**
     Si no se define este submover, el protocolo simplemente realizará una minimización de cuerpo rígido y una minimización de cadenas laterales de los stubs colocados previamente para minimizar hacia el stub. En caso contrario, se puede añadir una serie de movers definidos previamente, como backrub, que se aplicarán en el paso de minimización del stub. Antes y después de la lista de movers de minimización del stub habrá una minimización de cuerpo rígido y una minimización de cadenas laterales de los stubs colocados previamente. bb\_cst\_weight determina la intensidad de las restricciones derivadas de los stubs.
    -   mover\_name: un mover de diseño o de minimización definido previamente por el usuario.
    -   bb\_cst\_weight: determina la intensidad de las restricciones derivadas de los stubs. Este valor es un peso sobre cb\_force, así que valores mayores son restricciones más fuertes.

    Los movers StubMinimize válidos/sensatos son:
    -   BackrubDD
    -   LoopRemodel

2.  **DesignMovers**
     Los movers de diseño se usan normalmente una vez colocados los stubs para rellenar el resto de la interfaz, ya que placestub en realidad no introduce más diseño que la colocación del stub.
    -   mover\_name: un mover de diseño o de minimización definido previamente por el usuario.
    -   use\_constraints: si debemos usar restricciones de coordenadas durante este mover de diseño
    -   coord\_cst\_std: la desviación estándar de la restricción de coordenadas para este mover. Las restricciones de coordenadas son armónicas y la constante de fuerza es k=1/std. Cuanto menor es la std, más fuerte es la restricción

    Los DesignMovers válidos/sensatos son:
    -   RepackMinimize

3.  **NotifyMovers**
    A los movers colocados en esta sección se les notificará que no deben reempaquetar los residuos colocados por PlaceStub. Esto no es necesario si los movers de colocación se usan de forma anidada (recursiva), ya que los movers de colocación notifican automáticamente a los movers anidados en ellos sobre los residuos hotspot. En esencia, quieres que los movers posteriores (los que enumeras en esta sección) conozcan las decisiones de colocación de este mover anterior. Estos movers no se ejecutarán en este placestub, pero conocerán después los residuos colocados para su uso posterior. Es útil para ejecutar movimientos de diseño una vez terminado placestub, p. ej., en bucles. Pon la sensibilidad a las tareas solo en el mover placestub más interno (si PlaceStub está anidado), donde se toma la decisión final sobre qué residuos albergan residuos hotspot.


##Véase también

* [[RosettaScriptsPlacement]]
* [[AddSidechainConstraintsToHotspotsMover]]
* [[BestHotspotCstMover]]
* [[DockWithHotspotMover]]
* [[HotspotDisjointedFoldTreeMover]]
* [[MapHotspotMover]]
* [[PlaceSimultaneouslyMover]]
* [[PlaceOnLoopMover]]
* [[PlacementMinimizationMover]]
* [[I want to do x]]: guía para elegir un mover

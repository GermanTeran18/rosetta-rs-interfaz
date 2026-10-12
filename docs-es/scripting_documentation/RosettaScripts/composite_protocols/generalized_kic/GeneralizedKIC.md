# Cierre cinemático generalizado

[[Volver a RosettaScripts|RosettaScripts]]

Por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org). Documentación escrita el 4 de abril de 2014 y actualizada por última vez el 26 de mayo de 2021.

[[_TOC_]]

Para información sobre los submódulos del marco GeneralizedKIC, consulta:
* [[Perturbadores de GeneralizedKIC|GeneralizedKICperturber]]
* [[Selectores de GeneralizedKIC|GeneralizedKICselector]]
* [[Filtros de GeneralizedKIC|GeneralizedKICfilter]]

## Resumen breve
GeneralizedKIC (abreviatura de *G*eneralized *Ki*nematic *C*losure, cierre cinemático generalizado) es una generalización de la maquinaria de cierre cinemático existente. La versión generalizada funciona con cadenas principales arbitrarias y con loops que pasan por cadenas laterales, ligandos, etc. También se ha implementado con compatibilidad total con RosettaScripts, lo que facilita incorporarlo a protocolos más complicados. La interfaz de RosettaScripts da control total sobre el funcionamiento interno del algoritmo, lo que lo convierte en una herramienta muy potente y versátil.

## Casos de uso
Generalized KIC es útil en las situaciones siguientes:
* Dada una parte arbitraria, sin ramificaciones y conectada covalentemente de una estructura, con puntos de inicio y fin bien definidos y fijos, se quiere muestrear conformaciones alternativas que conserven la geometría ideal. Un ejemplo sería un caso en el que los extremos N y C de una proteína estuvieran unidos por un enlace disulfuro y se quisieran muestrear conformaciones alternativas de un tramo corto de la cadena principal del extremo N, del enlace disulfuro y de un tramo corto de la cadena principal del extremo C, con la condición de que el disulfuro permanezca cerrado.
* Dada una parte de una estructura que está abierta pero que _debería_ estar conectada covalentemente, con puntos de inicio y fin bien definidos y fijos, se quiere muestrear conformaciones que cierren el segmento. Por ejemplo, dadas hebras beta antiparalelas sin unir que forman una lámina de dos hebras, se podrían querer muestrear conformaciones de horquilla para un loop que conecte las hebras. Este cierre también puede ser a través de cadenas laterales o ligandos: dados dos segmentos que contienen residuos de unión a metales, se podrían querer muestrear conformaciones que permitan unir un metal con geometría ideal.
* Dado un enlace covalente entre partes distantes de un FoldTree y una perturbación estructural que separa los átomos implicados en el enlace covalente, se quieren encontrar perturbaciones estructurales compensatorias que mantengan la geometría covalente cerrada alterando lo mínimo posible la estructura.

Los escenarios anteriores suelen ser subproblemas de problemas más complicados, en particular los que implican moléculas muy entrecruzadas para las que se podrían querer muestrear muchas conformaciones.

## Entrada y salida
GeneralizedKIC toma como entrada un Pose que contiene una cadena de residuos conectados covalentemente (un «loop», donde el loop no tiene por qué estar conectado únicamente por conexiones convencionales de la cadena principal) a la que se aplicará el algoritmo. La cadena de residuos no necesita partir de una conformación razonable ni estar formada por alfa-aminoácidos canónicos.

GeneralizedKIC devolverá un Pose en el que el loop en cuestión se ha puesto en una conformación nueva y cerrada (sujeta a los métodos de muestreo especificados por el usuario). Este mover solo moverá los residuos del loop (y cualquier residuo de «cola» especificado); todos los demás residuos permanecerán en sus posiciones iniciales. El mover GeneralizedKIC ignora el FoldTree y no lo alterará. (Nota: si se define un mover de preselección como se describe en la documentación del [[selector de GeneralizedKIC|GeneralizedKICselector]], este mover puede alterar la geometría fuera del loop que se va a cerrar, o podría alterar el FoldTree.)

Si no se pudo encontrar ninguna solución cerrada, GeneralizedKIC devolverá el Pose de entrada original. Si se ha proporcionado un ContingentFilter, su valor se establecerá en «false» en este caso (y en «true» en caso contrario). Por defecto, GeneralizedKIC establecerá el estado del mover como fallo si no se encuentra ninguna solución, pero el usuario puede anular esto con **dont_fail_if_no_solution_found=true**.

## Flujo de trabajo general
En general, hay que:

1.  Construir o importar una estructura, que debe incluir los residuos del loop que se van a cerrar (aunque no necesitan estar en una conformación cerrada al principio).
2.  Asegurarse de que los enlaces covalentes se han declarado con el mover **[[DeclareBond]]**.
3.  Establecer las opciones de GeneralizedKIC.
4.  Definir el loop que se va a cerrar y establecer los pivotes.
5.  Configurar uno o más perturbadores de GeneralizedKIC, que determinan cómo se muestrearán las conformaciones del loop.
6.  Definir uno o más filtros de GeneralizedKIC.
7.  Establecer el selector de GeneralizedKIC que se usa para elegir una solución entre las encontradas (y un mover de preselección opcional).

Estos pasos se explican en detalle en la sección siguiente.

## Flujo de trabajo detallado

1. Construir o importar una estructura. GeneralizedKIC no puede añadir residuos ni geometría. Si se quiere construir un loop nuevo, por ejemplo, hay que añadir los residuos nuevos del loop antes de llamar a GeneralizedKIC. (En RosettaScripts, el [[PeptideStubMover]] es útil para construir geometría desde cero o para añadir residuos a una geometría existente.)

2. Asegurarse de que se han declarado los enlaces covalentes. GeneralizedKIC moverá átomos para asegurar una geometría ideal, pero no puede declarar enlaces químicos nuevos. (En RosettaScripts, el mover **DeclareBond** informa a Rosetta de que ciertos residuos están unidos covalentemente entre sí.)

3. Establecer las opciones de GeneralizedKIC (número de intentos de cierre, si el algoritmo debe aceptar el primer cierre exitoso o elegir entre todos los intentos de cierre exitosos, _etc._). En RosettaScripts, esto se gestiona dentro del bloque <MOVERS> de la forma siguiente:
```xml
<MOVERS>
...
     <GeneralizedKIC name="&string" low_memory_mode="(false &bool)" closure_attempts="(100 &int)" stop_if_no_solution="(0 &int)" stop_when_n_solutions_found="(0 &int)" selector="&string" selector_scorefunction="&string" selector_kbt="(1.0 &Real)" contingent_filter="&string" dont_fail_if_no_solution_found="(false &bool)" correct_polymer_dependent_atoms="(false &bool)">
          ...
     </GeneralizedKIC>
...
</MOVERS>
```
La opción **low_memory_mode** se puede usar para limitar la cantidad de información que se almacena sobre cada solución encontrada, con el fin de reducir el consumo de memoria. Consulta la nota de más abajo para más detalles sobre las ventajas y los riesgos de este modo no predeterminado. El parámetro **closure_attempts** establece el número de veces que el algoritmo intentará cerrar el loop. Un valor de **0** significa que seguirá intentándolo indefinidamente. La opción **stop_when_n_solutions_found** permite que el algoritmo se detenga tras encontrar al menos N soluciones exitosas o, si se establece en 0, que siga hasta haber hecho tantos intentos como especifique **closure_attempts**; en ambos casos, el selector elige después una solución. (Ten en cuenta que, como un solo intento devuelve hasta 16 soluciones de cierre, el selector se aplicará _incluso_ si **stop_when_n_solutions_found** es 1, ya que en el primer intento exitoso pueden haberse encontrado más de una solución.) La opción **selector** es obligatoria y especifica la forma en que se elige una solución entre las exitosas. La opción **selector_scorefunction** permite usar una función de puntuación aparte en los selectores que eligen según la energía o la puntuación; esto es recomendable, ya que los términos de puntuación basados en el empaquetado de cadenas laterales pueden producir malos resultados, puesto que el algoritmo GeneralizedKIC no llama al packer. Algunos selectores también toman un valor de temperatura, que se establece con la opción **selector_kbt**. Consulta la documentación del [[selector de GeneralizedKIC|GeneralizedKICselector]] para más detalles.<br>En algunos casos, el mover GeneralizedKIC no encontrará ninguna solución. Esto puede deberse a que no existe solución (_p. ej._ si el loop es demasiado corto para la separación entre los extremos, o si hay geometría que bloquea cualquier camino entre los extremos), a que el método de muestreo usado era demasiado restrictivo o a que se hicieron muy pocos intentos. Si esto ocurre, el Pose se deja sin alterar. Si la geometría del loop está abierta, es útil contar con un medio de abortar la trayectoria en este caso. Por defecto, el mover devuelve un estado de fallo, lo que aborta la trayectoria. Esto se puede anular estableciendo **dont_fail_if_no_solution_found=true**. También se puede usar un [[ContingentFilter|Filters-RosettaScripts#ContingentFilter]] para registrar si el mover falló. El ContingentFilter es un filtro especializado cuyo valor lo establece un mover. GeneralizedKIC puede establecer el valor de un ContingentFilter, especificado con la opción **contingent_filter**, en verdadero o falso según el cierre haya tenido éxito o no. La aplicación posterior del filtro, posiblemente más adelante, puede entonces abortar las trayectorias con un cierre de loop fallido. Como nota final, GeneralizedKIC puede corregir a posiciones ideales las posiciones de átomos que dependen de enlaces de polímero (como protones amida, oxígenos carbonilo o grupos N-metilo en aminoácidos N-metilados) si la opción **correct_polymer_dependent_atoms** se establece en "true".

4. Definir una serie de residuos para el problema de cierre de GeneralizedKIC. Debe ser una cadena de residuos sin ramificaciones y con enlaces covalentes continuos, listados en orden de un extremo de la cadena al otro. Cuando se llama a la función GeneralizedKIC::apply(), se elige automáticamente una cadena continua de átomos que recorre los residuos seleccionados. Los residuos se especifican con tags **AddResidue** dentro de un bloque **GeneralizedKIC**. Los puntos de pivote también deben indicarse explícitamente con el tag **SetPivots**. Los pivotes son átomos de la cadena de átomos que se va a cerrar, flanqueados por enlaces cuyos valores diedros resolverá analíticamente el algoritmo de cierre para cerrar el loop. Actualmente, por suposiciones fijadas en el código de la biblioteca numérica de cierre cinemático, el primer pivote debe ser el segundo átomo de la cadena que se va a cerrar y el último pivote debe ser el penúltimo átomo de la cadena que se va a cerrar. Esta restricción se eliminará en una versión futura de GeneralizedKIC.<br>Opcionalmente, también se pueden listar residuos de «cola» adicionales. Son residuos que están conectados directamente al loop que se va a cerrar, o conectados indirectamente a este loop a través de otros residuos de cola, y que se mueven con el loop que se va a cerrar. Para especificarlos se puede usar el tag **AddTailResidue**. El orden no es importante para la opción **AddTailResidue**.
```xml
<MOVERS>
...
     <GeneralizedKIC ...>
          <AddResidue res_index="(&int)" />
          <AddResidue res_index="(&int)" />
          <AddResidue res_index="(&int)" />
          ...
          <AddTailResidue res_index="(&int)" />
          <AddTailResidue res_index="(&int)" />
          <AddTailResidue res_index="(&int)" />
          ...
          <SetPivots res1="(&int)" atom1="&string" res2="(&int)" atom2="&string" res3="(&int)" atom3="&string" />
          ...
     </GeneralizedKIC>
...
</MOVERS>
```
Por ejemplo, si se cerrara un loop formado por los residuos ALA44, CYS45, LYS46, CYS47, CYS23, ASP22 y PHE21, donde CYS47 y CYS23 estuvieran unidas por un enlace disulfuro, y donde CYS45 estuviera unida a CYS12 por otro disulfuro, de modo que se esperara que CYS12 se moviera con CYS45, se escribiría:
```xml
<MOVERS>
...
     <GeneralizedKIC ...>
          <AddResidue res_index="4" />
          <AddResidue res_index="45" />
          <AddResidue res_index="46" />
          <AddResidue res_index="47" />
          <AddResidue res_index="23" />
          <AddResidue res_index="22" />
          <AddResidue res_index="21" />
          <AddTailResidue res_index="12" />
          <SetPivots res1="4" atom1="CA" res2="23" atom2="SG" res3="21" atom3="CA" />
          ...
     </GeneralizedKIC>
...
</MOVERS>
```
Del ejemplo anterior vemos que los segmentos del loop pueden ir hacia atrás o hacia delante, o pueden implicar residuos muy separados en la secuencia lineal, siempre que estén unidos covalentemente. Ten en cuenta que, aunque la secuencia de residuos importa, la dirección global del loop no: igualmente podríamos haber añadido los residuos en orden inverso (21->22->23->47->46->45->44). En este ejemplo hemos elegido arbitrariamente el átomo SG de CYS23 como punto de pivote central, aunque se podría haber elegido cualquier átomo de la cadena que esté flanqueado por enlaces que puedan rotar libremente.

5. Definir uno o más perturbadores de GeneralizedKIC. Cada perturbador muestrea el espacio conformacional en cada intento de cierre. Consulta [[los perturbadores de GeneralizedKIC|GeneralizedKICperturber]] para más detalles.

6. Definir uno o más filtros de GeneralizedKIC. Los filtros se aplican después de cada intento de cierre y eliminan las soluciones que no cumplen algún criterio. Consulta [[los filtros de GeneralizedKIC|GeneralizedKICfilter]] para más detalles.

7. Establecer el GeneralizedKICselector. El selector elige una única solución del conjunto de soluciones encontradas que pasan todos los filtros. Consulta la [[documentación de los selectores de GeneralizedKIC|GeneralizedKICselector]] para más detalles, incluidos los del mover de preselección opcional (un mover que se aplica a todas las soluciones que pasan los filtros antes de aplicar el selector).

¡Eso es todo! Ahora deberías estar cerrando loops con éxito.

## Detalles del algoritmo

El algoritmo de cierre cinemático se describe en detalle en [Coutsias _et al_. (2004). _J. Comput. Chem._ 25(4):510-28.](http://www.ncbi.nlm.nih.gov/pubmed/14735570) y en [Mandell _et al_. (2009). _Nat. Methods._ 6(8)551-2.](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2847683/). En resumen, dada una transformación de cuerpo rígido que describe la posición y la orientación del residuo inmediatamente posterior a un loop respecto de un residuo inmediatamente anterior al loop, un loop con N grados de libertad pasa a tener N-6 grados de libertad efectivos, y los 6 grados de libertad restantes quedan determinados por la condición de que el loop esté cerrado. Esto significa que todos los grados de libertad del loop menos 6 (_p. ej._ todos los ángulos diedros de la cadena menos 6) se pueden muestrear, perturbar o fijar a voluntad, y los 6 grados de libertad restantes se pueden resolver analíticamente para imponer la condición de cierre. El algoritmo GeneralizedKIC hace justamente esto: permite al usuario muestrear todos los grados de libertad del loop menos 6 y luego resolver analíticamente los 6 restantes (los ángulos diedros que flanquean 3 átomos de pivote) para asegurar que el loop quede cerrado. Para cualquier conjunto dado de valores de los otros N-6 grados de libertad, puede haber desde 0 hasta 16 soluciones del sistema de ecuaciones que resuelve el algoritmo de cierre cinemático.

## Modo de poca memoria

Por defecto, todas las soluciones que encuentra GenKIC se almacenan como Poses completos hasta que el selector elige una. Por desgracia, esto significa que, si se le indica que almacene muchas soluciones, GenKIC puede agotar la memoria disponible. Desde el 13 de marzo de 2016 se ha añadido un modo de poca memoria (<b>"low_memory_mode=true"</b>). En este modo, antes de la selección solo se almacenan los valores de los grados de libertad del loop. El inconveniente, sin embargo, es que puede ser arriesgado usar el modo de poca memoria con un mover de preselección. Los cambios que el mover de preselección haga al Pose no se almacenarán, por lo que habrá que volver a aplicar el mover de preselección al Pose seleccionado tras la selección. Esto cuesta tiempo adicional. Además, si el mover de preselección tiene algún componente estocástico en su comportamiento, la segunda aplicación puede no producir resultados idénticos a los de la primera. Esto significa que lo que podría haber sido el Pose de menor energía cuando se aplicó por primera vez el mover de preselección podría ser ahora un Pose de energía relativamente alta, por ejemplo. Por este motivo, sé prudente al usar el modo de poca memoria. Lo preferible es detener GenKIC cuando se hayan encontrado N soluciones para limitar el uso de memoria.

## Ejemplo de RosettaScripts

Este ejemplo crea un péptido cíclico de 10 residuos con un enlace disulfuro entre los extremos N y C. Luego define un loop que empieza en el residuo 3, va _hacia atrás_ hasta el residuo 1, pasa por el disulfuro hasta el residuo 10 y vuelve hasta el residuo 5. Este loop se cierra por cierre cinemático, muestreando conformaciones del loop. Se aplica un filtro de comprobación de choques (AddFilter type="loop_bump_check") y se elige una solución al azar (selector="random_selector") entre las soluciones encontradas.
```xml
<ROSETTASCRIPTS>
    <TASKOPERATIONS>
    </TASKOPERATIONS>
    <SCOREFXNS>
        <ScoreFunction name="tala" weights="talaris2013" symmetric="0" />
    </SCOREFXNS>
    <FILTERS>
    </FILTERS>
    <MOVERS>
        <PeptideStubMover name="pep_stub" reset="1">
            <Append resname="CYD" />
            <Append resname="ALA" />
            <Append resname="ALA" />
            <Append resname="ALA" />
            <Append resname="ALA" />
            <Append resname="ALA" />
            <Append resname="ALA" />
            <Append resname="ALA" />
            <Append resname="ALA" />
            <Append resname="CYD" />
        </PeptideStubMover>
        
        <SetTorsion name="tor1">
            <Torsion residue="ALL" torsion_name="phi" angle="-64.7"/>
            <Torsion residue="ALL" torsion_name="psi" angle="-41.0"/>
            <Torsion residue="ALL" torsion_name="omega" angle="180"/>
        </SetTorsion>

	<SetTorsion name="tor2">
            <Torsion residue="pick_atoms" angle="random">
                <Atom1 residue="1" atom="N"/>
                <Atom2 residue="1" atom="CA"/>
                <Atom3 residue="1" atom="CB"/>
                <Atom4 residue="1" atom="SG"/>
            </Torsion>
            <Torsion residue="pick_atoms" angle="random">
                <Atom1 residue="10" atom="N"/>
                <Atom2 residue="10" atom="CA"/>
                <Atom3 residue="10" atom="CB"/>
                <Atom4 residue="10" atom="SG"/>
            </Torsion>
	</SetTorsion>
        
        <DeclareBond name="bond" res1="1" atom1="SG" res2="10" atom2="SG"/>

	<GeneralizedKIC name="genkic" closure_attempts="200" stop_when_n_solutions_found="0" selector="random_selector">
		<AddResidue res_index="3" />
                <AddResidue res_index="2" />
                <AddResidue res_index="1" />
                <AddResidue res_index="10" />
                <AddResidue res_index="9" />
                <AddResidue res_index="8" />
                <AddResidue res_index="7" />
                <AddResidue res_index="6" />
                <AddResidue res_index="5" />
		<SetPivots res1="3" atom1="CA" res2="1" atom2="SG" res3="5" atom3="CA" />
		<CloseBond prioratom_res="10" prioratom="CB" res1="10" atom1="SG" res2="1" atom2="SG" followingatom_res="1" followingatom="CB" bondlength="2.05" angle1="103" angle2="103" randomize_flanking_torsions="true" />
		<AddPerturber effect="randomize_alpha_backbone_by_rama">
			<AddResidue index="3" />
			<AddResidue index="2" />
			<AddResidue index="1" />
			<AddResidue index="10" />
			<AddResidue index="9" />
                        <AddResidue index="8" />
                        <AddResidue index="7" />
                        <AddResidue index="6" />
                        <AddResidue index="5" />
		</AddPerturber>
		<AddFilter type="loop_bump_check" />
	</GeneralizedKIC>
        
    </MOVERS>
    <APPLY_TO_POSE>
    </APPLY_TO_POSE>
    <PROTOCOLS>
        <Add mover="pep_stub"/>
        <Add mover="tor1"/>
        <Add mover="tor2"/>
        <Add mover="bond"/>
        <Add mover="genkic"/>
    </PROTOCOLS>
</ROSETTASCRIPTS>
```

## Casos de fallo
GeneralizedKIC no puede manejar los casos siguientes:
* Varias conexiones covalentes entre un único par de residuos de la cadena de residuos que se va a cerrar. (Esto es algo que, en general, Rosetta maneja mal.)
* Loops que implican puentes salinos, interacciones catión-pi, enlaces de hidrógeno u otras interacciones no covalentes. (Sin embargo, el marco de GeneralizedKIC se ha escrito pensando en esto como posible ampliación futura.) Ten en cuenta que los enlaces covalentes coordinados entre residuos de unión a metales e iones metálicos se consideran «covalentes» en Rosetta y _sí_ los maneja correctamente GeneralizedKIC.

## Lista completa de opciones

[[include:mover_GeneralizedKIC_type]]

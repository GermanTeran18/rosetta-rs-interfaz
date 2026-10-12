# LoopFinder
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## LoopFinder

Encuentra loops en la Pose actual y los carga en el DataMap para que los usen los movers posteriores (p. ej., LoopRemodel)

    <LoopFinder name="&string" interface="(1 &Size)" ch1="(0 &bool)" ch2="(1 &bool)" min_length="(3 &Integer)"
     max_length="(1000 &Integer)" iface_cutoff="(8.0 &Real)" resnum/pdb_num="(&string)" 
    CA_CA_distance="(15.0 &Real)" mingap="(1 &Size)"/>

-   interface: ¿conservar solo los loops de la interfaz? valor = número de salto que se usará (0 = conservar todos los loops)
-   ch1: conserva los loops del compañero 1
-   ch2: conserva los loops del compañero 2
-   resnum/pdb\_num: si se especifica, el buscador de loops solo toma los loops que están dentro de la CA\_CA\_distance definida. Si se omite esta opción, extrae los loops dados por las opciones chain1, chain2 e interface. Por tanto, omítela si no conoces el residuo.
-   CA\_CA\_distance: umbral de distancias CA entre el residuo definido y cualquier residuo de loop de la interfaz
-   iface\_cutoff: umbral de distancia para la interfaz
-   min\_length: longitud mínima del loop (inclusive)
-   max\_length: longitud máxima del loop (inclusive)
-   mingap: tamaño mínimo del hueco entre loops (exclusivo, de modo que mingap=1 -\> no se permiten huecos de un solo residuo). ¡Ponerlo en 0 casi seguro que causará problemas!
-   pdb\_num/res\_num: consulta la [[documentación principal de RosettaScripts|RosettaScripts#rosettascripts-conventions_specifying-residues]] para más información.


##Véase también

##Véase también

* [[RosettaScriptsLoopModeling]]
* [[Aplicación loopmodel|loopmodel]]
* [[Formato de archivo de loops|loops-file]]
* [[LoopBuilderMover]]
* [[LoopCreationMover]]
* [[LoopFinderMover]]
* [[LoopLengthChangeMover]]
* [[LoopModelerMover]]
* [[LoopMoverFromCommandLineMover]]
* [[LoopProtocolMover]]
* [[LoopRemodelMover]]

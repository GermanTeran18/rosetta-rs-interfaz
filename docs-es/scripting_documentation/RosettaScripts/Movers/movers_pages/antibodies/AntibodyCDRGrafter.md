# AntibodyCDRGrafter
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AntibodyCDRGrafter

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

Forma parte del marco de trabajo RosettaAntibody y RosettaAntibodyDesign (RAbD)

###Propósito

Injerta loops CDR de una estructura en otra y, opcionalmente, optimiza los CDR y los CDR vecinos del injertado.  
Consigue un cierre de loop del 100 % si se usan ambos movers de injerto (que comprueban la geometría del enlace peptídico en ambos extremos con respecto a los valores ideales).

###Algoritmo

Cierra los loops con [[CCDEndsGraftMover]] y, opcionalmente, con [[AnchoredGraftMover]]. De forma opcional, optimiza mediante relax con restricciones diedras sobre los loops CDR (en general; por ahora no basado en clústeres). ( [[CDRDihedralConstraintMover]] , [[FastRelaxMover]] ). 

####Valores por defecto

Por defecto, usa dos residuos en los extremos N y C del CDR insertado y del andamio para cerrar el loop, y se detiene una vez cerrado el injerto.

Puede injertar u optimizar el loop DE, conocido aquí como proto_l4 / l4 y proto_h4.  Si se injerta L1, se recomienda encarecidamente optimizar, o incluso injertar, el loop DE (la optimización del loop DE está activada por defecto). 

Este Mover se encarga de eliminar regiones, copiar coordenadas, etc., por lo que no es necesaria ninguna preparación previa de ninguna de las dos estructuras.  


####Optimización de CDR vecinos

Se usa si se indica la opción optimize_cdrs.  Los vecinos de los CDR se definen como se indica a continuación.  Si la optimización está activada, se añadirán a la optimización los CDR injertados y los CDR vecinos.  DE/CDR4 se puede desactivar poniendo la opción optimize_cdr4_if_neighbor en false.

CDR vecinos.
```
L1 - L2 L3 L4
L2 - L1 L4
L3 - L1 H3
L4 - L1 L2	

H1 - H2 H3 H4
H2 - H1 H4
H3 - H1 L3
H4 - H1 H2

```



     <AntibodyCDRGrafter name="grafter" cdrs="(&string,&string)" numbering_scheme="(&string)" cdr_definition="(&string)" donor_structure_from_pdb="(&string)" use_secondary_graft_mover(&bool) optimize_cdrs(&bool) optimize_cdr4_if_neighbor(&bool) scorefxn="s"/>


###Opciones comunes 

-   __cdrs__ (&string,&string) (default=all (6) cdrs):  Selecciona el conjunto de CDR al que quieres restringirte (p. ej.: H1 o h1), incluyendo solo uno.  Se puede injertar el loop DE pasando L4 o H4 como loop.
-   __input_ab_scheme__ (&string):  Define el esquema de numeración del anticuerpo.  También hay que definir la opción XML cdr_definition. Ambas opciones se pueden definir alternativamente por línea de comandos (recomendado).  Consulta [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]] para más información.
-   __cdr_definition__ (&string): Define la definición de CDR que quieres usar.  También hay que definir la opción XML numbering_scheme.  Consulta [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
-   _stop_after_closure_ (&bool) (default=1): Define un booleano que indica si se debe detener el proceso tras el cierre.  


###Estructura donante
-   _donor_structure_from_pdb_ (&string): Ruta de la estructura que usarás para el injerto.  Puede ser un PDB completo, una sola cadena de anticuerpo o solo un CDR con 3 residuos adicionales a cada lado.  Debe estar renumerada y su numeración debe coincidir con la de la estructura en la que se injerta (-s)
-   _donor_structure_from_spm_ (&string): Igual que la anterior, pero la estructura procede de [[SavePoseMover]].  Es el nombre de referencia del SPM.

###Optimización
-   __optimize_cdrs__ (&bool) (default=0): Actívala para optimizar los CDR injertados y vecinos mediante relax con restricciones diedras sobre ellos. Recomendado si se usa el mover de injerto secundario.
-   __optimize_cdr4_if_neighbor__ (&bool) (default=1): Actívala para incluir el loop DE/CDR4 si es vecino de un CDR injertado y la _optimización está activada_. Recomendado al optimizar, especialmente para CDR1.
-   _dihedral_cst_wt_ (&Real) (default=2.0): Define el peso de la restricción diedra que se usa si se hace optimización y el peso dihedral_constraint de la función de puntuación es cero. 
-   __use_secondary_graft_mover__ (&bool) (default=0): Define un booleano que indica si se usa el mover de injerto secundario cuando el injerto no se cierra con el primero.  Con esta opción se consigue un cierre de injerto del 100 %; sin embargo, para corregir la estructura se recomienda encarecidamente optimize_cdrs. Sin ella, el cierre de injerto ronda el 85 % (con valores ligeramente no ideales de distancia y ángulos del enlace peptídico).


###Más opciones
-   _nter_overhang_ (&size) (default=3): Número de residuos adicionales en el lado Nter del CDR que se usan para la superposición antes de la inserción.  Estos residuos se eliminan antes de insertar.
-   _cter_overhang_ (&size) (default=3): Número de residuos adicionales en el lado Cter del CDR que se usan para la superposición antes de la inserción.  Estos residuos se eliminan antes de insertar. 
-   __scorefxn__ (&string) (default=Rosetta default): Función de puntuación de todos los átomos que se usa para el reempaquetado final


##Véase también

* [[SavePoseMover]]
* [[AnchoredGraftMover]]
* [[CCDEndsGraftMover]]
* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[ParatopeSiteConstraintMover]]
* [[ParatopeEpitopeSiteConstraintMover]]
* [[Descripción general del archivo de restricciones | constraint-file#constraint-types]]
* [[I want to do x]]: Guía para elegir un mover
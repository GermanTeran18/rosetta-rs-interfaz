# Aplicación de RosettaMP: docking proteína-proteína de membrana (MPDock)

## Código y demo
El ejecutable de MPDock se encuentra en `Rosetta/main/source/src/apps/public/membrane/mp_dock.cc`

Una demo de esta aplicación se encuentra en `Rosetta/demos/protocol_captures/mp_dock`

Revisión de Rosetta n.º 58096

## Descripción del algoritmo
La determinación de la estructura de complejos proteína-proteína en la bicapa de membrana es extraordinariamente difícil, porque el mimético de membrana debe mantener la estabilidad del complejo y porque muchos complejos superan el límite de peso molecular de la RMN. Combinamos RosettaMP con el algoritmo RosettaDock para predecir estructuras de complejos proteína-proteína en la bicapa de membrana. El protocolo consta de dos pasos: (1) un paso de prepaquetado para crear una estructura de partida y (2) el docking proteína-proteína en la bicapa de membrana. En el paso de prepaquetado, primero se separan los dos componentes por una gran distancia (manteniendo constante su incrustación en la membrana), se reempaquetan las cadenas laterales mediante pruebas de rotámeros (rotamer trials) y los componentes se vuelven a juntar. A continuación, el paso de docking muestrea conformaciones aleatorias de la interfaz con una función de puntuación creada al combinar las funciones de puntuación estándar de docking con los términos de puntuación de membrana (tanto en la etapa de baja resolución como en la de todos los átomos). La bicapa de membrana se mantiene fija durante esta simulación. 

Ten en cuenta que el protocolo actual está preparado únicamente para ejecuciones de docking local. La implementación de un protocolo de docking global está en marcha.

## Generación de las entradas

1. descarga una estructura PDB desde PDBTM 
2. limpia el archivo PDB con el script clean_pdb.py de Rosetta/tools/protein_tools/scripts 
4. elimina las cadenas que estén en solución o que dificulten el docking
3. genera un spanfile con la aplicación span_from_PDB descrita en el directorio Rosetta/demos/protocol_captures/2015/MP_span_from_PDB

## Paso de prepaquetado

```
Rosetta/main/source/bin/docking_prepack_protocol.linuxgccrelease
-in:file:s 1AFO_AB.pdb	                        # Starting structure containing both partners
-score:weights mpframework_docking_fa_2015.wts	# Use mpdocking score function
-mp:setup:spanfiles 1AFO_AB.span	        # Predicted TM Spans
-mp:scoring:hbond	                        # Membrane hydrogen bonding weight
-packing:pack_missing_sidechains 0	        # Wait to pack sidechains until membrane is present
-partners A_B                                   # Specify the two docking partners by chain
```

Genera 10 estructuras con el paso de prepaquetado y elige la que tenga la puntuación total de Rosetta más baja.

## Ejecución de docking

```
Rosetta/main/source/bin/mp_dock.linuxgccrelease 
-in:file:s 1AFO_AB_ppk.pdb	                # Pre-packed input structure
-in:file:native 1AFO_AB.pdb	                # Native structure for RMSD calculations
-score:weights mpframework_docking_fa_2015.wts	# Score function
-mp:setup:spanfiles 1AFO_AB.span	        # Predicted TM spans
-mp:scoring:hbond	                        # Membrane hydrogen bonding weight
-docking:partners A_B	                        # Partners to dock
-docking:dock_pert 3 8	                        # Magnitude of perturbation
-packing:pack_missing_sidechains 0	        # Wait to pack sidechains until membrane is present

```

Genera al menos 1000 modelos y analiza los datos con gráficos de puntuación de interfaz frente a RMSD. 

## Consejos

Si la puntuación de interfaz no aparece en el scorefile y quieres añadirla, puedes usar la opción ```-score:docking_interface_score 1 ```


## Referencias
* Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press 

* Gray, J. J.; Moughon, S.; Wang, C.; Schueler-Furman, O.; Kuhlman, B.; Rohl, C. A.; Baker, D., Protein-protein docking with simultaneous optimization of rigid-body displacement and side-chain conformations. Journal of Molecular Biology 2003, 331, (1), 281-299.

* Chaudhury, S., Berrondo, M., Weitzner, B. D., Muthu, P., Bergman, H., Gray, J. J.; Benchmarking and analysis of protein docking performance in RosettaDock v3.2., PLoS One. 2011;6(8):e22477


## Contacto

Preguntas y comentarios a: 
 - Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
 - Rebecca F. Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

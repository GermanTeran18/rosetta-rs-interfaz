# Aplicación de RosettaMP: docking de ensamble proteína-proteína de membrana (MPEnsembleDock)

## Código y demo
El ejecutable de MPDock se encuentra en `Rosetta/main/source/src/apps/public/membrane/mp_dock.cc`å
Revisión de Rosetta n.º 58096

## Descripción del algoritmo
El protocolo de docking de ensamble de MP consta de tres pasos: (1) el paso de generación del ensamble, que diversifica la cadena principal de la proteína, (2) el paso de prepaquetado, que refina las cadenas laterales y crea una estructura de partida, y (3) el docking proteína-proteína en la bicapa de membrana. Aquí combinamos el protocolo RosettaDock 4.0 de cadena principal flexible para proteínas solubles, las incrustamos en la membrana y usamos funciones de energía de membrana para clasificarlas. En el paso de generación del ensamble, para generar diversidad en las conformaciones de la cadena principal de las proteínas, usamos tres métodos de generación de confórmeros: perturbación de las cadenas principales a lo largo de los modos normales en $1$\AA [mediante RosettaScripts], refinamiento con el protocolo Relax de Rosetta y flexión de la cadena principal con el protocolo Backrub de Rosetta. Hemos usado 40 confórmeros de Backrub, 30 confórmeros de modos normales y 30 confórmeros de relax para formar un ensamble de 100 confórmeros. Igual que en el docking rígido, en el paso de prepaquetado se reempaquetan las cadenas laterales de los ensambles de las estructuras no unidas (manteniendo constante su incrustación en la membrana) mediante pruebas de rotámeros. A continuación, el paso de docking usa Monte Carlo y un algoritmo de minimización compuesto por una etapa de baja resolución que simula la selección de confórmeros y una etapa de alta resolución que simula el ajuste inducido. La etapa de baja resolución incluye rotar y trasladar el ligando alrededor del receptor, junto con el intercambio de las conformaciones de cadena principal generadas previamente mediante selección adaptativa de confórmeros (Adaptive Conformer Selection). En la etapa de alta resolución se reintroducen las cadenas laterales en el supuesto complejo de encuentro y se empaquetan las de la interfaz para lograr una unión estrecha. En esta segunda etapa hay un movimiento de cuerpo rígido mínimo. En todos los pasos la membrana se mantiene fija. 

## Generación de las entradas

1. descarga una estructura PDB desde PDBTM 
2. limpia el archivo PDB con el script clean_pdb.py de Rosetta/tools/protein_tools/scripts 
4. elimina las cadenas que estén en solución o que dificulten el docking
3. genera un spanfile con la aplicación span_from_PDB descrita en el directorio Rosetta/demos/protocol_captures/2015/MP_span_from_PDB

## Paso de generación del ensamble
Opciones de relax
```
-in:file:s complex_A.pdb
-nstruct 30
-relax:fast
-out:pdb_gz
-out:prefix relax_
-out:path:all output
```
Opciones de NMA
```
-in:file:s complex_A.pdb
-nstruct 30
-parser:protocol nma.xml
-out:prefix nma_
-out:path:all output
```
script xml para nma: 
```
<ROSETTASCRIPTS>
<!-- This protocol mixes motion along the first 5 normal modes with perturbation of 1 A. -->
        <SCOREFXNS>
                <ScoreFunction name="bn15_cart" weights="ref2015_cart"/>
        </SCOREFXNS>
        <RESIDUE_SELECTORS>
        </RESIDUE_SELECTORS>
        <TASKOPERATIONS>
        </TASKOPERATIONS>
        <FILTERS>
        </FILTERS>
        <MOVERS>
                <NormalModeRelax name="nma" 
                        cartesian="true" 
                        centroid="false"
                        scorefxn="bn15_cart"
                        nmodes="5"
                        mix_modes="true"
                        pertscale="1.0"
                        randomselect="false"
                        relaxmode="relax"
                        nsample="20"
                        cartesian_minimize="false"/>
        </MOVERS>
        <APPLY_TO_POSE>
        </APPLY_TO_POSE>
        <PROTOCOLS>
                <Add mover="nma"/>
        </PROTOCOLS>
        <OUTPUT scorefxn="bn15_cart"/>
</ROSETTASCRIPTS>
```
Opciones de Backrub:
```
-in:file:s complex_A.pdb
-nstruct 30
-backrub:ntrials 20000
-backrub:mc_kt 0.6
-out:path:pdb output
-out:prefix br_
-out:pdb_gz
-out:path:score output
```
Complex_A es el monómero A del complejo. De igual modo, las estructuras del ensamble deben generarse para el monómero B. Las estructuras del ensamble se guardan en las carpetas chainA y chainB, respectivamente. Las listas de rutas de archivos se escriben en 1ensemble.txt (cadena A) y 2ensemble.txt (cadena B).  
## Paso de prepaquetado
```
Rosetta/main/source/bin/docking_prepack_protocol.linuxgccrelease

-in:file:s complex.pdb	                        # Starting structure containing both partners
-in:file:s native.pdb                           #native complex structure
-in:membrane
-score:weights franklin2019	# Use mp score function
-mp:setup:spanfiles complex.span	        # Predicted TM Spans for the complex
-mp:setup:span1 chainA.span #Predicted chainA span
-mp:setup:sepan2 chainB.span #predicted chainB span
-partners A_B                                   # Specify the two docking partners by chain
-ensemble1 1ensemble.txt
-ensemble2 2ensemble.txt
-nstruct 1
-ignore_zero_occupancy false
-ex1
-ex2aro
-out:suffix _ppk
```

Genera una estructura prepaquetada por cada estructura del ensamble en las carpetas 1chain y 2chain. Además, genera 1ensemble.txt.ensemble y 2ensemble.txt.ensemble con la ruta a las estructuras prepaquetadas y sus puntuaciones de baja y alta resolución. 
## Ejecución de docking

```
Rosetta/main/source/bin/mp_dock.linuxgccrelease 
-in:file:s complex.pdb	                # Pre-packed input structure
-in:file:native native.pdb	                # Native structure for RMSD calculations
-nstruct 5000 #number of docked structures
-mp:setup:spanfiles complex.span    # Predicted TM spans
-in:membrane
-mp:lipids:has_pore 0
-mp:lipids:composition POPE
-mp:lipids:temperature 35.0
-docking:dock_pert 3 8	                        # Magnitude of perturbation
-ensemble1 1ensemble.txt.ensemble
-ensemble2 2ensemble.txt.ensemble
-docking:partners A_B	                        # Partners to dock
-docking_low_res_score motif_dock_score #set-up for low resolution score function. 
-mh:path:scores_BB_BB Rosetta/main/database/additional_protocol_data/motif_dock/xh_16_
-mh:score:use_ss1 false
-mh:score:use_ss2 false
-mh:score:use_aa1 true
-mh:score:use_aa2 true
-ignore_zero_occupancy false
-ex1
-ex2aro
-score:weights franklin2019     # highres membrane score function
-score:pack_weights franklin2019    # highres membrane score function for packing
-out:path:all highres_output    #output folder
-out:pdb_gz     #zipped output
-out:file:scorefile updated_docking_fa19.sc
-out:suffix _fa19
-run:multiple_processes_writing_to_one_directory
```

Genera al menos 5000 modelos y analiza los datos con gráficos de puntuación de interfaz frente a RMSD. 

## Consejos

Si la puntuación de interfaz no aparece en el scorefile y quieres añadirla, puedes usar la opción ```-score:docking_interface_score 1 ```


## Referencias
* Harmalkar A*, Samanta R*; Prathima P; Gray J.J.; An expanded benchmark to advance membrane-associated protein docking - In preparation 

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Tilley DC, Elazar A, Gray JJ, An Integrated Framework Advancing Membrane Protein Modeling and Design. PLoS Computational Biology 11, 261
e1004398 (2015)

* Marze NA, Roy Burman SS, Sheffler W, Gray JJ, Efficient flexible backbone protein-protein
docking for challenging targets. Bioinformatics 34, 3461–3469 (2018)
## Contacto

Preguntas y comentarios a: 
 - Ameya Harmalkar ([harmalkar.ameya24@gmail.com](harmalkar.ameya24@gmail.com))
 - Rituparna Samanta ([rituparna@utexas.edu](rituparna@utexas.edu))
 - IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))


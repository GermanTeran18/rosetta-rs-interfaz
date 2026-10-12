# Salida gráfica de Rosetta e interfaces gráficas de usuario

[[_TOC_]]

#Salida gráfica
##[[Modo gráfico OpenGL|graphics]]
El modo gráfico nativo (o «visor») de Rosetta permite ver cualquier Pose en tiempo real.

[[images/graphics_mode.png]]

##[[Mover de PyMOL|PyMOL]]
###Contexto
El PyMOL Mover es una forma de visualizar tu decoy (PDB) en PyMOL. Una de sus funciones más potentes es que puede colorear tu decoy según la puntuación o según algún componente de la puntuación total, además de permitir observar los cambios en tiempo real durante un protocolo de Rosetta.

El PyMOL Mover se puede controlar a través de [[RosettaScripts]], [[PyRosetta]] o la línea de comandos.

El PyMOL Mover crea un PyMolObserver y lo asocia a un Pose concreto.  Esto se puede lograr mediante programación llamando a protocols::moves::AddPyMolObserver.  Las opciones de línea de comandos que se indican más abajo solo funcionan a través de JD2, pero es posible activar el observador de PyMol mediante programación sin usar la línea de comandos en absoluto.

Aparte de la ejecución de Rosetta, tendrás que iniciar PyMol en el equipo donde ejecutarás tu ejecutable de Rosetta.  Dentro de la sesión de PyMol, ejecuta el script /path/to/Rosetta/main/source/src/python/bindings/PyMOLPyRosettaServer.py:

    run /path/to/Rosetta/main/source/src/python/bindings/PyMOLPyRosettaServer.py

que preparará tu sesión de PyMol para recibir y mostrar las coordenadas que le envíe Rosetta.

**CONSEJO**: Es muy útil añadir esta línea a tu archivo $HOME/.pymolrc.  Así, cada vez que se inicie PyMOL, se llamará al script PyMOLPyRosettaServer.py.  Ten en cuenta también que quizá tengas que crear ese archivo primero.  Consulta la sección [pymolrc](http://www.pymolwiki.org/index.php/Pymolrc) del PyMOLWiki para más información sobre este magnífico archivo.


###Uso
####RosettaScripts
[[Consulta la documentación de RosettaScripts | Movers-RosettaScripts#PyMolMover]]

####PyRosetta
[Consulta la documentación de PyRosetta/PyMOL](https://www.pyrosetta.org/documentation/pymol_mover-tutorial)

####Línea de comandos

```
-show_simulation_in_pymol [Real, default=5]   Both turns on show simulation view to output frames into
                                               pymol when the pose has changed AND indicates the time
                                               interval (in seconds) before another frame can be sent to pymol.
                                               0 indicates that no packets are skipped!

-update_pymol_on_energy_changes_only         Only update pymol on energy changes.  Useful if protein length
                                              changes are occurring.

-update_pymol_on_conformation_changes_only   Only update pymol when the conformation object is changed.  
                                              Aka changes in XYZ, residuetype, lengths, etc.

-keep_pymol_simulation_history               Keep the history of the simulation as separate frames in pymol

```
###Inconvenientes y soluciones alternativas
Si durante la ejecución se producen cambios de longitud, el PyMOL Mover puede dar un segfault al intentar enviar el Pose antes de que se actualicen ciertos componentes del objeto de conformación.  En ese caso, usa la opción <code> -update_pymol_on_energy_changes_only </code> para evitar el segfault.

#Interfaces gráficas de usuario

##Fold-It

##PyRosetta Toolkit
Consulta [[PyRosetta Toolkit GUI]]


[[images/pyrosetta_toolkit_main.png]]

##Cyrus Bench
Cyrus Biotechnology es una empresa derivada del laboratorio Baker y de Rosetta Commons que ofrece una GUI (interfaz gráfica de usuario) de Rosetta en la nube, Cyrus Bench, con bioinformática, moléculas pequeñas y otras dependencias de Rosetta incluidas. Bench fue desarrollado por algunos antiguos miembros de laboratorios de RosettaCommons y en estrecha colaboración con varios laboratorios académicos de Rosetta.

Bench está diseñado para usuarios de la industria y del ámbito académico con las siguientes funciones: modelado por homología, diseño de proteínas, diseño de interfaces proteína-proteína y diseño de afinidad, cálculos de energía libre de mutación, diseño de proteínas con cadena principal flexible, estabilización de proteínas y predicción de epítopos inmunitarios (inmunogenicidad de MHC II). Ten en cuenta que Bench no ofrece todas las funciones de Rosetta 3 en línea de comandos. Disponible en https://cyrusbio.com/.  <sub><sup>(Cyrus Biotechnology es un licenciatario comercial de Rosetta que ofrece a sus clientes una interfaz gráfica de usuario web para Rosetta.  Las tarifas de licencia que los licenciatarios comerciales de Rosetta pagan a la Universidad de Washington se usan para apoyar a RosettaCommons, invirtiendo en el mantenimiento y el desarrollo futuro de Rosetta.)</sup></sub>

[[/images/cyrus_bench.png]]

##Véase también

* [[Sitio web de PyMOL (externo)|http://www.pymol.org]]
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Rosetta Servers]]: interfaces web para ciertas funciones de Rosetta
* [[Extending the PyMol Viewer]]: cómo añadir nueva funcionalidad al PyMOL Mover de Rosetta
* [[Glossary]]: definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: resumen de los conceptos principales de Rosetta

_Pregunta: ¿Qué es ToxDock?_

**Respuesta:** ToxDock es una aplicación orientada al docking de péptidos de toxinas sobre modelos de homología de canales iónicos (Leffler et al. 2017) y está disponible en el [servidor ROSIE](https://rosie.graylab.jhu.edu/tox_dock). Puedes encontrar información detallada sobre su uso en [https://rosie.graylab.jhu.edu/tox_dock/documentation](https://rosie.graylab.jhu.edu/tox_dock/documentation).

_Pregunta: ¿Por qué no hay un protocolo de Rosetta para la aplicación ToxDock?_

**Respuesta:** En su momento los conjuntos (ensembles) no estaban implementados en el distribuidor de trabajos, lo cual puede seguir siendo así o no, por lo que el protocolo no se integró en la rama principal. 

_Pregunta: ¿Es posible usar ToxDock fuera del servidor ROSIE?_

**Respuesta:** Sí. Consulta la sección de información suplementaria del artículo original https://www.pnas.org/content/pnas/suppl/2017/09/04/1703952114.DCSupplemental/pnas.1703952114.sapp.pdf

ToxDock consiste primero en un paso en el que todo el complejo péptido:receptor se relaja 200 veces con Rosetta FastRelax. Esto produce un conjunto de 200 estructuras en las que se ha permitido que se muevan las cadenas principales del receptor y del péptido, así como que ajusten sus posiciones relativas. Las cadenas laterales también se reempaquetan. Luego se seleccionan los cinco mejores complejos según la puntuación total de Rosetta. Para refinar la interfaz entre el péptido y el complejo, y para buscar modos de unión del péptido de menor energía, a continuación se realiza docking sobre los complejos relajados. Esto consistió en ejecutar 500 simulaciones de docking para cada complejo con la aplicación de docking flexible de péptidos de Rosetta, FlexPepDock. Se usa el modo de refinamiento de la aplicación de docking, que incluye una fase de docking de preoptimización de baja resolución y rotámeros de una estructura homóloga del receptor apo. También se incluyen rotámeros adicionales con las opciones ex1 y ex2. Por último, se combinan las puntuaciones reponderadas de los 2500 complejos acoplados y se calculan el promedio y el error estándar sobre el 1% de estructuras con mejor puntuación; esta puntuación es la puntuación de docking del conjunto. Para todos los cálculos se usó el conjunto de pesos talaris2013. 

La línea de comandos usada para la aplicación FastRelax es: 

mpiexec -np 80 /path/to/Rosetta/source/bin/relax.mpi.linuxiccrelease -in:file:l /path/to/file/list -database /path/to/Rosetta/database/ -score:weights talaris2013 -use_input_sc -ex1 -ex2 -relax:fast -in:file:fullatom -nstruct 200 -out:suffix ".FastRelaxApp" -overwrite -mpi_tracer_to_file out_mpi.log 
La línea de comandos usada para FlexPepDock es: mpiexec -np 80 

/path/to/Rosetta/source/bin/FlexPepDocking.mpi.linuxiccrelease - database /path/to/Rosetta/database -l /path/to/file/list -score:weights talaris2013 -pep_refine -ex1 -ex2 -use_input_sc -nstruct 500 -unboundrot /path/to/apo/pdb - receptor_chain AB -peptide_chain F -lowres_preoptimize 1 -out:suffix ".FPD-refine" 

Un sistema químico típico usado para ToxDock contenía más de 400 residuos del receptor y 15-20 residuos del péptido. Para un sistema de este tamaño, la primera etapa del protocolo de docking de conjuntos requirió aproximadamente 90 horas de tiempo de CPU (cerca de 1 hora de tiempo real en un clúster con 80 procesadores), mientras que el segundo paso usó alrededor de 150 horas de tiempo de CPU (cerca de 2 horas de tiempo real con 80 procesadores). Así, en un clúster de tamaño razonable, el tiempo de ejecución es de unas 3 horas por péptido. Estas simulaciones se realizaron con la revisión 57232 de Rosetta, compilada con soporte para MPI.

_Pregunta: La función de puntuación usada en el artículo fue talaris2013, pero la función de puntuación actual es ref2015. ¿Cuál se debe usar ahora?_

**Respuesta:** Talaris2013 tuvo mejor rendimiento en los cálculos de FlexPepDock que ref2015.

_Pregunta: El protocolo ToxDock incluye pasos de verificación posterior para determinar la viabilidad de una mutación con base en secuencias conservadas. ¿Cómo se ejecutan estos pasos cuando el protocolo no se ejecuta en ROSIE?_

**Respuesta:** Los pasos de verificación posterior son opcionales. Se pueden ignorar o aplicar como pasos de posprocesamiento. 


**Referencias**
***
1) Leffler, A. E., Kuryatov, A., Zebroski, H. A., Powell, S. R., Filipenko, P., Hussein, A. K., . . . Holford, M. (2017). Discovery of peptide ligands through docking and virtual screening at nicotinic acetylcholine receptor homology models. Proc Natl Acad Sci U S A, 114(38), E8100-E8109. doi: 10.1073/pnas.1703952114  

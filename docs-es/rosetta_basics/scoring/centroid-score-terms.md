#Términos de puntuación centroid y funciones de puntuación centroid en Rosetta

###¡Por favor, amplía esta página si tienes más información!

##Términos de puntuación

###Términos base
Estos términos de puntuación centroid aparecen en las funciones de puntuación score0-score5 usadas en el protocolo Abinitio.

##### env
El término de puntuación `env` es un término de energía de un cuerpo dependiente del contexto que describe la solvatación de un residuo concreto (basada en el efecto hidrofóbico). Se basa en la probabilidad de que un residuo tenga el tipo especificado dado su número de residuos vecinos. ([[Rohl et al. 2004|Rosetta-canon#scoring]])

##### pair
El término de puntuación `pair` es un término de energía de dos cuerpos para las interacciones entre pares de residuos (electrostática y puentes disulfuro). Para cada par de residuos, se basa en la probabilidad de que *ambos* residuos tengan sus tipos especificados dada su separación en la secuencia y la distancia física entre ellos, normalizada por el producto de las probabilidades de que *cada* residuo tenga su tipo especificado dada la misma información. ([[Rohl et al. 2004|Rosetta-canon#scoring]])

##### cbeta
El término cbeta es otro término de solvatación pensado para corregir el efecto de volumen excluido introducido por la simulación y favorecer las estructuras compactas. Se basa en el cociente de las probabilidades de que un residuo tenga un número dado de vecinos en una estructura compacta frente a un ovillo aleatorio, sumado sobre todos los residuos. ([[Rohl et al. 2004|Rosetta-canon#scoring]])

#####vdw
El término vdw representa **únicamente la repulsión estérica** y no las fuerzas atractivas de van der Waals (estas se modelan en términos que premian las estructuras compactas, como el término rg; las interacciones locales se incluyen implícitamente a partir de los [[fragmentos|fragment-file]]). Se calcula sobre pares de átomos solo en los casos en que:
1. la distancia interatómica es menor que la suma de los radios de van der Waals de los átomos, y 
2. la distancia interatómica no depende de los ángulos de torsión de un solo residuo. ([[Rohl et al. 2004|Rosetta-canon#scoring]])

#####rg
El término rg favorece las estructuras compactas y se calcula como la distancia cuadrática media entre los centroides de los residuos. ([[Rohl et al. 2004|Rosetta-canon#scoring]])

#####cenpack

##### hs_pair
El término hs_pair describe el empaquetamiento entre hebras y hélices. Se basa en la probabilidad de que dos pares de residuos (1 par en la lámina y 1 par en la hélice) tengan sus ángulos diedros actuales dada la separación (en la secuencia y en distancia física) entre la hélice y la hebra. ([[Rohl et al. 2004|Rosetta-canon#scoring]])

##### ss_pair
El término ss_pair describe los enlaces de hidrógeno entre hebras beta. 
Suele usarse con la instrucción STRAND_STRAND_WEIGHTS (p. ej. `STRAND_STRAND_WEIGHTS 1 6`):
* Primer valor:  0 o 1 (todos los valores > 0.5 se tratan como 1). Si es 1, incluye un término de distancia para el apareamiento de hebras. 
* Segundo valor: distancia de corte en *secuencia* entre hebras para considerarlas no locales (las hebras locales reciben una bonificación menor por aparearse). ([[Rohl et al. 2004|Rosetta-canon#scoring]])

##### sheet
El término sheet favorece la disposición de hebras beta individuales en láminas. Se deriva de la probabilidad de que una estructura con un número dado de hebras beta tenga el número actual de láminas beta y de hebras beta aisladas. ([[Rohl et al. 2004|Rosetta-canon#scoring]])

###Otros términos de puntuación centroid comunes

#####rsigma
Puntúa los pares de hebras según la distancia entre ellas y el registro de las dos hebras. ([[Shmygelska and Levitt 2008|http://www.pnas.org/content/106/5/1415.full.pdf]])


#####co
Orden de contacto ([[Shmygelska and Levitt 2008|http://www.pnas.org/content/106/5/1415.full.pdf]])


#####rama
Como en la puntuación de todos los átomos, el término rama describe la probabilidad de que un residuo tenga un conjunto dado de ángulos de torsión según su identidad. ([[Shmygelska and Levitt 2008|http://www.pnas.org/content/106/5/1415.full.pdf]])


#####hb_srbb
Término de energía de enlaces de hidrógeno cadena principal-cadena principal de corto alcance ([[Shmygelska and Levitt 2008|http://www.pnas.org/content/106/5/1415.full.pdf]])

#####hb_lrbb
Término de energía de enlaces de hidrógeno cadena principal-cadena principal de largo alcance ([[Shmygelska and Levitt 2008|http://www.pnas.org/content/106/5/1415.full.pdf]])

#####rg_local



###Términos «smooth»
Términos de puntuación centroid que se han optimizado con datos suavizados y un conjunto de datos mayor que el original.
#####cen_env_smooth
#####cen_pair_smooth
#####cenpack_smooth
#####cbeta_smooth

###Términos «interchain»
Estos términos se usan habitualmente en los protocolos de docking centroid.

#####interchain_env
#####interchain_pair
#####interchain_vdw
#####interchain_contact

###Términos cen_rot
Estos términos se usan junto con el modelado de rotámeros centroid (consulta la página [[CenRotModel]]). **NOTA**: para usar estos términos, debes cargar la biblioteca de rotámeros centroid con la opción `-corrections:score:cenrot`.
#####cen_rot_env
Consulta [[env|centroid-score-terms#env]]
#####cen_rot_pair
Consulta [[pair|centroid-score-terms#pair]]
#####cen_rot_pair_ang
???
#####cen_rot_cbeta
Consulta [[cbeta|centroid-score-terms#cbeta]]
#####cen_rot_dun
Término de Dunbrack para el modelado de rotámeros centroid. Puntúa la energía interna de los rotámeros centroid.


###Términos de puntuación centroid de membrana
Estos términos de puntuación están especializados para su uso con proteínas de membrana y aparecen en funciones de puntuación específicas de membrana.  Descripciones tomadas de [[Alford et al. 2015|http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004398]]. 
#####mp_pair
Potencial de interacción por pares basado en conocimiento entre dos residuos separados cierta distancia a una profundidad dada de la membrana. Publicado originalmente en [[Yarov-Yarovoy et al. 2006|http://onlinelibrary.wiley.com/doi/10.1002/prot.20817/full]] (véase la descripción de E<sub>pair</sub>).
#####mp_env
Potencial basado en conocimiento que describe la propensión de un residuo individual a estar a una profundidad dada de la membrana y su enterramiento por otros residuos. Publicado originalmente en [[Yarov-Yarovoy et al. 2006|http://onlinelibrary.wiley.com/doi/10.1002/prot.20817/full]] (véase la descripción de E<sub>env</sub>).
#####mp_cbeta
Potencial de densidad de residuos basado en conocimiento, que depende del número de residuos vecinos y está condicionado por el número de hélices transmembrana.  Publicado originalmente en [[Yarov-Yarovoy et al. 2006|http://onlinelibrary.wiley.com/doi/10.1002/prot.20817/full]] (véase la descripción de E<sub>density</sub>). Consulta también [[Rohl et al. 2004|Rosetta-canon#scoring]] para más información sobre el cálculo de la densidad de residuos. 
#####mp_lipo
Puntúa la concordancia entre la lipofilicidad predicha (del [[servidor LIPS|http://gila.bioe.uic.edu/lab/lips/]]) y el modelo. Consulta [[Adamian et al. 2005|http://onlinelibrary.wiley.com/doi/10.1002/prot.20456/full]] para más información sobre las predicciones de lipofilicidad.
#####mp_nonhelix
Penalización por estructura secundaria no helicoidal en la membrana. Publicado originalmente en [[Yarov-Yarovoy et al. 2006|http://onlinelibrary.wiley.com/doi/10.1002/prot.20817/full]] (véase la sección «Search for Embeddings»).
#####mp_termini
Penalización por residuos fuera de la capa hidrofóbica de la membrana. Publicado originalmente en [[Yarov-Yarovoy et al. 2006|http://onlinelibrary.wiley.com/doi/10.1002/prot.20817/full]] (véase la sección «Search for Embeddings»).
#####mp_tmproj
Penalización por hélices transmembrana que se proyectan fuera de la membrana. Publicado originalmente en [[Yarov-Yarovoy et al. 2006|http://onlinelibrary.wiley.com/doi/10.1002/prot.20817/full]] (véase la sección «Search for Embeddings»).

###Términos de puntuación centroid de ARN
Estos términos de puntuación se usan en el modelado de grano grueso de ARN.
#####rna_rg
Consulta el término rg más arriba.
#####rna_vdw
Consulta el término vdw más arriba.
#####rna_data_backbone
#####rna_base_pair
#####rna_base_axis
#####rna_base_stagger
#####rna_base_stack
#####rna_base_stack_axis
#####rna_base_backbone
#####rna_backbone_backbone
#####rna_repulsive

##Funciones de puntuación centroid

###Funciones de puntuación base

#####cen_std
Función de puntuación centroid que usa solo los términos env, pair, cbeta y vdw con pesos iguales. 
#####score0
Función de puntuación usada en la primera etapa del protocolo ClassicAbInitio. Está pensada para usarse con la inserción de fragmentos; el único término activo es un peso bajo de vdw (repulsivo) para penalizar los choques, y los propios fragmentos deben aportar la mayor parte de la información.

#####score1
Función de puntuación usada en la segunda etapa del protocolo ClassicAbInitio. Usa los términos env, pair, vdw, hs_pair y sheet con pesos iguales y el término ss_pair con un peso menor.
#####score2
Función de puntuación usada en la tercera etapa del protocolo ClassicAbInitio. En comparación con score1, activa los términos cbeta y cenpack con pesos bajos y aumenta el peso del término ss_pair. También reduce la distancia de corte en secuencia de STRAND_STRAND_WEIGHTS de 11 a 6.
#####score3
Función de puntuación usada en la cuarta etapa del protocolo ClassicAbInitio. Aumenta el peso de los términos cbeta y cenpack y activa los términos rg y rsigma. Fija el valor de ss_lowstrand (de STRAND_STRAND_WEIGHTS) en 0 (sin término de distancia para los pares de hebras).
#####score4
Aunque no existe una función de puntuación score4 base, está disponible como parche y en versiones smooth y cenrot. Introduce términos de enlaces de hidrógeno (hbond_lr_bb y hbond_sr_bb) y un término rama (puntuaciones de los residuos basadas en la probabilidad de Ramachandran según los ángulos phi/psi).
#####score5
Función de puntuación usada en la tercera etapa del protocolo ClassicAbInitio. Casi idéntica a score2, pero usa una distancia de corte distinta en STRAND_STRAND_WEIGHTS (véase arriba)
#####RS_centroid
Antes llamada score6. Introduce un término rama, desactiva la puntuación de rg, rsigma, sheet y hs_pair, y reajusta los pesos de varios términos (aumenta cenpack y cbeta; disminuye pair, ss_pair y vdw).
###Específicas de una aplicación
Estas funciones de puntuación están pensadas para usarse con un protocolo concreto o un tipo de muestreo concreto.
#####interchain_cen
De uso común en el docking centroid; básicamente es cen_std, pero evaluada solo entre dos cadenas y no dentro de una misma cadena.
#####loop_fragsample
Función de puntuación muy gruesa usada en SlidingWindowLoopClosure. Incluye solo los términos centroid env, pair y vdw, además de los términos linear_chainbreak y overlap_chainbreak.
#####remodel_cen
#####abinitio_remodel_cen
#####fldsgn_cen

###Casos especiales

####ARN

#####coarse_rna

#####rna_lowres

####Membranas

#####mpframework_cen_2006
Conjunto de pesos estándar para la función de puntuación de baja resolución de membrana.
#####mpframework_docking_cen_2015
Se usa para el docking centroid de proteínas de membrana (protocolo MP_Dock)
#####mpframework_symdock_cen_2015
Se usa para el docking simétrico centroid de proteínas de membrana (protocolo MP_SymDock)
#####mpdocking_cen_14-7-23_no-penalties
Usada antes por el MPDockingMover (reemplazada por mpframework_docking_cen_2015).
#####mpdocking_cen_14-7-25_low-penalties

###Variantes

Pueden verse como sufijos añadidos al nombre de una función de puntuación. También pueden aparecer otros sufijos (relax, design, etc.); estos indican el protocolo para el que está pensada la función de puntuación.
#####smooth
Estas funciones de puntuación usan los pesos centroid «smooth» optimizados descritos arriba.
#####cenrot
Estas funciones de puntuación están pensadas para usarse con el modelado de rotámeros centroid (consulta la sección de términos cen_rot más arriba).
#####rob
Estas funciones de puntuación/parches tienen pesos repulsivos (vdw) aumentados.
#####cartmin/cart
Estas funciones de puntuación/parches están pensados para usarse con minimización cartesiana y tienen fijado el peso de cart_bonded.

###Parches

#####abinitio_rob
Duplica el peso repulsivo (vdw) de la función de puntuación.
#####docking_cen
Fija todos los pesos interchain en los valores que tienen en la función de puntuación interchain_cen. No afecta a otros términos de puntuación.
#####score4L
Activa la puntuación de los enlaces de hidrógeno de la cadena principal de corto y largo alcance, un término de Ramachandran (phi/psi dado el tipo de residuo) y un término de ruptura de cadena; fija el peso de rg en 2. La L es de loop.
#####score0, score1_smooth, score2_smooth, etc.
Fija todos los pesos de los términos de puntuación centroid estándar en los valores que tienen en la función de puntuación indicada. (Curiosamente, el peso de vdw en el parche score0 es 1.0, mientras que en la función de puntuación score0 principal es 0.1. ¿Será un error?)


##¿Qué función de puntuación debo usar?
La mejor función de puntuación centroid para tu protocolo dependerá (por supuesto) del protocolo.
* Cen_std es la función de puntuación centroid predeterminada. Es una función de puntuación base simple y suele usarse con el parche score4L, especialmente para el modelado de loops.
* Score3 se usa mucho e incluye la mayoría de los términos de puntuación centroid comunes. 
* El docking centroid debería usar la función de puntuación interchain_cen o el parche docking_cen. 
* Las funciones de puntuación/parches centroid con un término rama (p. ej. RS_centroid o el parche score4L) son especialmente útiles para protocolos que no dependen mucho de la inserción de fragmentos (p. ej. RS_centroid se usa en el CentroidRelaxMover).





##Véase también

* [[Scoring explained]]
* [[Score types]]
* [[Centroid vs fullatom]]
* [[CenRotModel]]
* [[Scorefunction history]]: historia de la función de puntuación de Rosetta

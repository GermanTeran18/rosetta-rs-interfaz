# Opciones de RosettaMP y del RosettaMembrane anterior

[[_TOC_]]

## Opciones de RosettaMP desde 2014

|**Opción**|**Descripción**|
|:-------|:--------------|
|-mp:setup:spanfiles \<vector of strings\>| Archivo de topología transmembrana convertido a partir de la salida de OCTOPUS; salvo que se indique otra cosa para ciertas aplicaciones, solo debe proporcionarse uno| |
|-mp:setup:spans_from_structure \<bool\>| Usa la topología transmembrana calculada a partir del PDB; ¡requiere que la proteína esté transformada al marco de coordenadas de membrana!||
|-mp:setup:lipsfile \<string\>| Archivo de accesibilidad a lípidos convertido a partir de la salida de LIPS, predeterminado=mypdb.lips4| |
|-mp:setup:center \<vector of reals\>| Centro de la membrana x,y,z||
|-mp:setup:normal \<vector of reals\>| Normal de la membrana x,y,z| |
|-mp:setup:membrane_rsd \<real\>| Número del residuo de membrana para leer un archivo PDB con coordenadas MEM|
|-mp:thickness \<real\>| Grosor de la membrana definido por el usuario. Sobrescribe el grosor predeterminado de 60A.|
|-mp:scoring:hbond \<bool\>| Corrección de la energía de enlaces de hidrógeno para proteínas de membrana|
|-mp:no_interpolate_Mpair \<bool\>| Parámetro de puntuación avanzado de RosettaMembrane; no interpola entre capas para el potencial de pares de la membrana|
|-mp:Hbond_depth_correction \<bool\>| Parámetro de puntuación avanzado de RosettaMembrane; corrige los enlaces de hidrógeno según la profundidad en la membrana|
|-mp:TMprojection \<bool\>| Puntuación avanzada: activa o desactiva la penalización por desajuste hidrofóbico.|
|-mp:wt_TMprojection \<real\>| Puntuación avanzada: peso de la penalización por desajuste hidrofóbico.|
|-mp:non_helix \<bool\>| Puntuación avanzada: activa o desactiva la penalización por residuos que no son de hélice en la membrana.|
|-mp:wt_non_helix \<real\>| Puntuación avanzada: peso de la penalización por residuos que no son de hélice. |
|-mp:termini \<bool\>| Puntuación avanzada: activa o desactiva la penalización por extremos en la membrana.|
|-mp:wt_termini \<real\>| Puntuación avanzada: peso de la penalización por extremos.|
|-mp:secstruct \<bool\>| Puntuación avanzada: activa o desactiva la penalización si la estructura secundaria obtenida de la estructura no coincide con la predicha|
|-mp:wt_secstruct \<real\>| Puntuación avanzada: peso de la penalización por estructura secundaria.|
|-mp:spanning \<bool\>| Puntuación avanzada: activa o desactiva la penalización si los tramos obtenidos de la estructura no coinciden con el spanfile.|
|-mp:wt_spanning \<real\>| Puntuación avanzada: peso de la penalización por tramos.|
|-mp:viewer:thickness \<real\>| Plugin de PyMOL: grosor de la membrana que se visualiza, predeterminado=15 |
|-mp:viewer:num_points \<int\>| Plugin de PyMOL: número de puntos que definen los planos de la membrana. x \>= 3 |
|-mp:visualize:embedding \<bool\>| VisualizeEmbedddingMover: visualiza los centros y las normales de incrustación de cada tramo TM |
|-mp:visualize:spacing \<real\>| VisualizeMembraneMover: separación de los residuos virtuales de membrana que representan los planos de la membrana, predeterminado=5 |
|-mp:visualize:width \<real\>| VisualizeMembraneMover: ancho de los planos de membrana para un plano de n por n, predeterminado=100 |
|-mp:visualize:thickness \<real\>| VisualizeMembraneMover: grosor de la membrana que se visualiza, predeterminado=15 |
|-mp:visualize:plane_radius \<real\>| VisualizeMembraneMover: radio de los planos de membrana que se dibujan en PyMol; forma parte del plugin del visor de PyMol |

## Opciones de RosettaMembrane desde 2006 (pronto quedarán obsoletas)

|**Opción**|**Descripción**|
|:-------|:--------------|
|-membrane <boolean>|Inicializa un Pose como Pose de membrana|
|-in:file:spanfile <string>|Spanfile con la información de los tramos transmembrana, convertido a partir de la salida de OCTOPUS|
|-in:file:lipofile <string>|Archivo de lipofilicidad con las accesibilidades a lípidos, convertido a partir de la salida de LIPS|
|-center_search <bool>|Realiza la búsqueda del centro de la membrana, predeterminado false|
|-normal search <bool>|Realiza la búsqueda de la normal de la membrana, predeterminado false|
|-center_mag <real>|Magnitud de la búsqueda del centro de la normal de la membrana (Angstroms), predeterminado 1|
|-center_max_delta <int>|Magnitud de la desviación máxima del ancho de la membrana durante la búsqueda del centro de la membrana (Angstroms), predeterminado 5|
|-normal_start_angle <int>|magnitud del ángulo inicial durante la búsqueda de la normal de la membrana (grados), predeterminado 10|
|-normal_delta_angle <int>|magnitud de la desviación angular durante la búsqueda de la normal de la membrana (grados), predeterminado 10|
|-normal_cycles <int>|Ciclos para encontrar una buena normal de incrustación, predeterminado 100|
|-normal_max_angle <int>|magnitud de la desviación angular máxima durante la búsqueda de la normal de la membrana (grados), predeterminado 40|
|-normal_mag <real>|Magnitud de la búsqueda angular de la normal de la membrana (grados), predeterminado 5|
|-smooth_move_frac <real>|???, predeterminado 0.5|
|-no_interpolate_Mpair <boolean>|No interpola entre capas para las interacciones de pares, predeterminado false|
|-Menv_penalties <bool>|Activa las penalizaciones, predeterminado false|
|-Mhbond_depth <bool>|Corrección del potencial de enlaces de hidrógeno dependiente de la profundidad en la membrana, predeterminado false|
|-Membed_init <bool>|??? predeterminado false|
|-Fa_Membed_update <bool>|??? predeterminado false|
|-fixed_membrane <bool>|Fija la posición de la membrana; por defecto el centro está en [0,0,0] y la normal de la membrana es el eje z, predeterminado false|
|-membrane_center <vector of reals>|Centro de la membrana x,y,z|
|-membrane_normal <vector of reals>|Normal de la membrana x,y,z|
|-thickness <real>|Grosor de hidrocarburo de una hoja para los cálculos de solvatación (Angstroms), predeterminado 15|
|-view <bool>|Visualiza la membrana durante el protocolo, predeterminado false|
|-debug <bool>|Imprime la salida de depuración, predeterminado false|


## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press


## Contacto

- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

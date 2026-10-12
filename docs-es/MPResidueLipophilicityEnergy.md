# MPResidueLipophilicityEnergy
documentación escrita por Jonathan Weinstein jonathan.weinstein@weizmann.ac.il, noviembre de 2017

[[_TOC_]]

## Fundamento del término de energía
el término de energía principal de la función de energía de proteínas de membrana ref2015_memb.
este término de energía calibra la función de energía para que se comporte de forma similar a los perfiles de inserción en la membrana descritos por Elazar, A. et al. (2016) ‘Mutational scanning reveals the determinants of protein insertion and association energetics in the plasma membrane’, eLife, 5. doi: 10.7554/eLife.12125.

## Calibración del término de energía
este término de energía se basa en splines calibrados externamente cada vez que se crea una nueva función de energía.
por su naturaleza, el término de energía calibrado para una función de energía NO es adecuado para usarse en el contexto de otra función de energía.
la función de energía actual adecuada para este término es ref2015, y el archivo de pesos de la función de energía es ref2015_memb.
el proceso de calibración usa una alfa-hélice idealizada de poli-A insertada en la membrana. En esta hélice, cada posición se muta a cada identidad posible y se calcula el perfil de puntuación total de cada aminoácido en función de la profundidad en la membrana. el término de energía suma la diferencia entre estos perfiles y los perfiles de inserción del artículo mencionado arriba (después de algunas correcciones menores).

## Enterramiento de los residuos
la puntuación de cada residuo para este término se multiplica por una sigmoide que estima el enterramiento del residuo. esto favorece exponer los residuos hidrofóbicos a la membrana y enterrar los residuos polares.

## Simetría
este término de energía funciona con Poses simétricos; basta usar symmetric="1" en la declaración de la función de energía

## Nivel centroid
el término de energía funciona tanto con Poses de todos los átomos como a nivel centroid. se calibró para las funciones de energía de nivel centroid score0-5, que ahora se encuentran en score*_memb.wts
el propio término detecta si el Pose es centroid o no.

## Véase también
* [[MPHelicalityEnergy]]
* [[MPSpanAngleEnergy]]
* [[ResidueLipophilicityFilter]]
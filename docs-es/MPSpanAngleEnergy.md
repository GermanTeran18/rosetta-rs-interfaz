# MPSpanAngleEnergy
documentación escrita por Jonathan Weinstein jonathan.weinstein@weizmann.ac.il, noviembre de 2017

## MPSpanAngleEnergy
Un término de energía que penaliza al Pose por tener segmentos transmembrana (TM) cuyo ángulo con la normal de la membrana es muy distinto de la distribución de ángulos de las proteínas de membrana naturales.
esto mejora considerablemente el muestreo en simulaciones de plegamiento y docking, al evitar que se muestreen TM en ángulos irrelevantes.
este término de energía lo usan la función de energía de membrana ref2015_memb y las funciones de energía de nivel centroid score*_memb

## Véase también
* [[MPHelicalityEnergy]]
* [[MPResidueLipophilicityEnergy]]
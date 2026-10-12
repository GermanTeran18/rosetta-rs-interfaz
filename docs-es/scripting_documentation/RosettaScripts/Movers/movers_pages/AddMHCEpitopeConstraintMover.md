## AddMHCEpitopeConstraintMover

Documentación creada por Brahm Yachnin (brahm.yachnin@rutgers.edu), laboratorio Khare, y Chris Bailey-Kellogg (cbk@cs.dartmouth.edu). Partes de esta documentación están copiadas o adaptadas de la documentación de guía centrada en el diseño de Vikram K. Mulligan (vmullig@uw.edu).
Última edición: 8 de mayo de 2019.

[[_TOC_]]

##Descripción general

En la documentación de [[MHCEpitopeEnergy]] se explica en detalle la desinmunización compatible con el packer en Rosetta. Si tu objetivo es aplicar la desinmunización de forma global a toda una proteína o Pose, basta con configurar el protocolo de desinmunización a nivel de la función de puntuación y usar esa función de puntuación en todos los movers de diseño pertinentes.

Un enfoque alternativo, que intenta conservar la secuencia de la proteína apuntando solo a las regiones inmunogénicas "más calientes", puede implementarse con `AddMHCEpitopeConstraintMover`. Esto también hace viable usar métodos más sofisticados de predicción de epítopos, como el predictor NetMHCII, que requieren una base de datos externa precalculada. Hemos preparado las [[mhc-energy-tools]] para ayudarte a identificar puntos calientes en tu proteína y a generar una base de datos externa si lo deseas.

En general, `AddMHCEpitopeConstraintMover` desinmunizará una Pose solo sobre los residuos especificados con `selector`. La configuración del predictor de epítopos puede ser la misma que la de la función de puntuación, o puede ser distinta si se pasa un archivo `.mhc` propio. (Ten en cuenta que incluso puedes activar el término de energía sin ninguna configuración y aplicar una configuración solo mediante restricciones. En ese caso, la desinmunización solo se realizará en las posiciones y con la configuración especificadas por la restricción.)

También puedes usar `AddMHCEpitopeConstraintMover` para añadir un segundo método de predicción de epítopos a toda la Pose, aplicándolo sin un selector.

Ten en cuenta que, para que la restricción funcione, DEBES USAR UNA FUNCIÓN DE PUNTUACIÓN CON `mhc_epitope` PONDERADO CON UN VALOR DISTINTO DE 0. El parámetro `weight` que se pasa al mover de restricciones se multiplicará por el peso de la función de puntuación para dar el "peso neto". Si tu función de puntuación pondera `mhc_epitope` con 0, el peso neto será, por lo tanto, 0.

##Información de citación

Consulta la página principal de [[MHCEpitopeEnergy|MHCEpitopeEnergy#citation-information]] para ver la información de citación completa si usas `AddMHCEpitopeConstraintMover`. Los usuarios deben citar el siguiente artículo, además de los artículos correspondientes a los predictores que se usen, tal como se describe en la página principal:

Yachnin BJ, Mulligan VK, Khare SD, and Bailey-Kellogg C.  (2021).  MHCEpitopeEnergy, a flexible Rosetta-based biotherapeutic deimmunization platform.  J Chem Inf Model 61(5):2368-2382.  doi: 10.1021/acs.jcim.1c00056.  https://pubmed.ncbi.nlm.nih.gov/33900750/

##Uso

[[include:mover_AddMHCEpitopeConstraintMover_type]]

##Eliminación de restricciones

El mover [[ClearCompositionConstraintsMover]] elimina todas las MHCEpitopeConstraints, junto con cualquier otra restricción de composición. Por supuesto, esto no elimina los predictores configurados a nivel de la función de puntuación, solo los configurados a nivel de la restricción.

##Véase también

* [[MHCEpitopeEnergy]]
* [[mhc-energy-tools]]
* [[ClearCompositionConstraintsMover]]
* [[Términos de guía centrados en el diseño|design-guidance-terms]]
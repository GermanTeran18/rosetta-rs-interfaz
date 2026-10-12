# FavorNativeResidue
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FavorNativeResidue

```xml
<FavorNativeResidue name="" bonus="(1.5 &bool)"/>
```

Añade residue\_type\_constraints a la Pose con la bonificación dada. El nombre es algo engañoso: el residuo "nativo" que se favorece es en realidad la identidad del residuo de la Pose actual en el momento de aplicar el mover (este mover no usa -in:file:native).

Ejecutar este mover varias veces tiene un efecto acumulativo. Por ejemplo, si se llama dos veces a FavorNativeResidue con una bonificación de 1.5 en el mismo protocolo, tras la segunda instancia la bonificación de cada residuo será 3.0.

Para un uso más flexible, consulta [[FavorSequenceProfileMover]] (con "scaling=prob matrix=IDENTITY" mostrará el mismo comportamiento de bonificación nativa).

NOTA IMPORTANTE: este mover actualizará los pesos de todas tus funciones de puntuación al peso indicado en "bonus", salvo que esa función de puntuación ya tenga un peso de restricción distinto de cero. Puede que sea lo que quieres, pero también puede dar lugar a un comportamiento inesperado. Por ejemplo, si quieres determinar la total_score sin restricciones (p. ej., ref2015 "puro") usando una SimpleMetric y defines una función de puntuación sin ningún peso de restricciones (p. ej., "ref2015.wts"), ¡FavorNativeResidue añadirá la residue_type_constraint de 1.5 a esa función de puntuación! Si quieres obtener el mismo efecto sin cambiar los pesos de tu función de puntuación, usa en su lugar el siguiente mover:
```xml
<FavorSequenceProfile name="favournative" weight="1.5" use_current="true" matrix="IDENTITY"/>
```

##Véase también

* [[FavorSequenceProfileMover]]
* [[FavorSymmetricSequenceMover]]
* [[ResidueTypeConstraintMover]]
* [[I want to do x]]: guía para elegir un mover

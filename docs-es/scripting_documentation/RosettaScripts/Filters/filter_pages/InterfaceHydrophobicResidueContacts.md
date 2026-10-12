# InterfaceHydrophobicResidueContacts

Documentación actualizada por última vez el 1 de agosto de 2018 por Brian Coventry (bcov@uw.edu).

*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## InterfaceHydrophobicResidueContacts

Filtra estructuras según el número de residuos hidrofóbicos del objetivo que tienen al menos cierto ddG hidrofóbico.

```xml
<InterfaceHydrophobicResidueContacts name="(&string)" target_selector="(&string)" binder_selector="(&string)" scorefxn="(&string)" threshold="(5 &int)" score_cut="(-0.5 &Real)" apolar_res="(ALA,CYS,CYD,PHE,ILE,LEU,MET,PRO,THR,VAL,TRP,TYR &string)" />
```

-   target\_selector: obligatorio. Qué residuos deben contarse como residuos hidrofóbicos del objetivo.
-   binder\_selector: obligatorio. Qué residuos forman parte de la proteína de unión, para poder definir la interfaz.
-   scorefxn: obligatorio. Qué función de puntuación quieres usar. Solo se conservarán fa_rep, fa_sol y fa_atr. (Las funciones de puntuación suaves como ref2015_soft a menudo funcionan bien también)
-   threshold: cuántos residuos hidrofóbicos deben tener al menos la puntuación umbral.
-   score\_cut: qué umbral de puntuación se debe usar para determinar si un residuo hidrofóbico está en contacto. (Una nota: esta es la energía del objeto pose.energies(); por tanto, el ddG real del residuo puede ser el doble de lo que se escribe aquí, porque pose.energies() solo contiene la mitad de la energía de interacción.)
-   apolar\_res: qué residuos deben contarse como residuos hidrofóbicos (lista de name3 separada por comas).

Este mover busca diseños que aprovechen al máximo el objetivo, con la hipótesis de que las proteínas de unión que usan más residuos hidrofóbicos del objetivo se unen mejor. ¡Pero ten cuidado con tu selector del objetivo! Si seleccionas residuos hidrofóbicos ajenos, todos los diseños con más InterfaceHydrophobicResidueContacts contactarán con esos residuos.



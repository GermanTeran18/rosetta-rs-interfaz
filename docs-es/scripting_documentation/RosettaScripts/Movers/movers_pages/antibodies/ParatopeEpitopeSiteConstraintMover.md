# ParatopeEpitopeConstraintMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ParatopeEpitopeConstraintMover

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

Forma parte del marco de trabajo RosettaAntibody y RosettaAntibodyDesign (RAbD)

###Propósito

Añade SiteConstraints desde el paratopo del anticuerpo hasta el epítopo del antígeno. Se pueden definir residuos individuales del paratopo, o también CDR concretos del paratopo. El epítopo se detecta automáticamente dentro de la distancia de interfaz definida, a menos que se especifiquen los residuos del epítopo.  Estas SiteConstraints ayudan a mantener en contacto con el epítopo del antígeno solo al paratopo (y no el framework ni otras partes del antígeno) durante el movimiento de cuerpo rígido. Consulta la [[Descripción general del archivo de restricciones | constraint-file#constraint-types]] para más información sobre cómo añadir SiteConstraints manualmente.  No olvides añadir el término atom_pair_constraint a tu función de puntuación. Un peso de .01 para las SiteConstraints parece ser el óptimo. El paratopo por defecto se define como los 6 CDR (o 3 si se trabaja con un anticuerpo de camélido).  

####Detalles

Solo añadirá la restricción si todavía no está presente.  Por defecto usa un Linear Harmonic en 0, 1, 10.  Esto significa que el contacto paratopo-epítopo tendrá penalización a más de 10 A. La tolerancia de distancia del Linear Harmonic (el último número) se fija en la distancia de interfaz.

#### ¿Qué es una SiteConstraint?

Es una restricción de que un residuo interactúa con alguna otra cadena o región. Las SiteConstraints son un conjunto de restricciones ambiguas de pares de átomos que evalúan si un residuo interactúa con otra cadena o región; dicho a grandes rasgos, si está (o no está) en un sitio de unión. Más concretamente, si tenemos una SiteConstraint en un residuo concreto, esa SiteConstraint consiste en un conjunto de restricciones de distancia entre el C-alfa de ese residuo y el C-alfa de todos los demás residuos de un conjunto, que normalmente son residuos concretos de otra cadena u otras cadenas. Tras evaluar cada restricción, solo se usa como energía de la SiteConstraint de ese residuo la restricción que da la puntuación más baja.

```xml
<ParatopeEpitopeConstraintMover paratope_cdrs="(&string (ex: L1,L1,L3))" interface_distance="(&real)" />
```

###Opcional

#### Definición del paratopo y del epítopo

-   paratope_cdrs (&string) (Default=all CDRs): Define el paratopo específicamente como estos CDR.
-   paratope_residues_pdb (&string) : Define residuos concretos como el paratopo.  (Ej.: 24L,26L-32L, 44H-44H:A).  Se pueden especificar rangos o residuos individuales, así como códigos de inserción (Ej.: 44H:A, donde A es el código de inserción).  Opcionalmente, define paratope_residues en lugar de paratope_residues_pdb con los números de residuo internos de Rosetta (Ej.: 14,25,26).  El análisis de la numeración interna de Rosetta no admite rangos por ahora.
-   epitope_residues_pdb (&string) : Define residuos concretos como el epítopo.  (Ej.: 24L,26L-32L, 44H-44H:A).  Se pueden especificar rangos o residuos individuales, así como códigos de inserción (Ej.: 44H:A, donde A es el código de inserción).  Opcionalmente, define epitope_residues en lugar de epitope_residues_pdb con los números de residuo internos de Rosetta (Ej.: 14,25,26).  El análisis de la numeración interna de Rosetta no admite rangos por ahora.

#### Otros

-   interface_distance (&real) (Default=10): Distancia en Angstroms para la interfaz, que influye en el punto en que empieza la penalización de la SiteConstraint. 


##Véase también

* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[CDRDihedralConstraintMover]]
* [[ParatopeSiteConstraintMover]]
* [[Descripción general del archivo de restricciones | constraint-file#constraint-types]]
* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[I want to do x]]: Guía para elegir un mover

# CDRDihedralConstraintMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## CDRDihedralConstraintMover

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

Forma parte del marco de trabajo RosettaAntibody y RosettaAntibodyDesign (RAbD)

###Propósito
Añade restricciones diedras armónicas circulares a los ángulos diedros Phi y Psi de un CDR concreto, ya sea usando el clúster de CDR North/Dunbrack calculado para la estructura actual (requiere un anticuerpo con numeración AHo) o restricciones generales.  Estas restricciones evitan que la estructura del CDR se mueva demasiado durante la optimización de la cadena principal, por ejemplo con FastRelax. Consulta la página de [[restricciones | constraint-file#constraint-types]] para más información sobre restricciones y [[esta página | General-Antibody-Options-and-Tips]] para más información sobre la numeración de anticuerpos. 

```xml
<CDRDihedralConstraintMover name="dih_mover" cdr="(&string (ex: L1))" use_cluster_csts="(&bool)" />
```

###Obligatorio

-   cdr (& string): CDR al que se añadirán las restricciones (p. ej.: H1 o h1)

###Opcional

####Configuración de las restricciones basadas en clústeres
-   use_cluster_csts (&bool) (Default=true): ¿Añadir restricciones basadas en clústeres?  Si es false, se usarán restricciones diedras generales. 

-   force_cluster (&string) (Ex: L1-11-1): Fuerza la adición de las restricciones de clúster de este clúster concreto.  Debe tener la misma longitud de CDR que el CDR actual.

-   cluster_data_required (&size) (Default=10): Valor para el cambio de restricciones diedras basadas en clústeres a restricciones diedras generales.  Si el número total de estructuras usadas para las restricciones basadas en clústeres es menor que este valor, se usarán restricciones diedras generales.  Más datos = mejor capacidad de predicción.

-   use_general_constraints_on_failure (&bool) (Default=true): Añade restricciones generales si falla la adición de restricciones basadas en clústeres.  Puede fallar si no se puede determinar el clúster (como en algunos loops H3) o si no hay datos suficientes (consulta la opción cluster_data_required).  Si es false y falla la adición de restricciones basadas en clústeres, no se hará nada.  

-   use_outliers (&bool) (Default=false):  Usa un conjunto de datos aparte para las restricciones basadas en clústeres, que incluía valores atípicos en el cálculo.  Los valores atípicos se definen como los que tienen una distancia diedra > 40 grados y un RMSD > 1.5 A respecto al centro del clúster.  Úsalo para aumentar el muestreo de clústeres pequeños o poco frecuentes.

#### Configuración de las restricciones generales

-   general_phi_sd (&real) (Default=16): Desviación estándar que se usa para phi al emplear restricciones diedras armónicas circulares generales
-   general_psi_sd (&real) (Default=16): Desviación estándar que se usa para psi al emplear restricciones diedras armónicas circulares generales

##Véase también

* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[ParatopeSiteConstraintMover]]
* [[ParatopeEpitopeSiteConstraintMover]]
* [[Descripción general del archivo de restricciones | constraint-file#constraint-types]]
* [[I want to do x]]: Guía para elegir un mover

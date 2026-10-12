# AntibodyDesignProtocol
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AntibodyDesignProtocol

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

Forma parte del marco de trabajo RosettaAntibody y RosettaAntibodyDesign (RAbD)

* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]] 

###Propósito

Ejecuta el protocolo completo de Rosetta Antibody Design (RAbD).  Requiere un anticuerpo con numeración AHo. Ten en cuenta que en RosettaScripts solo el mejor diseño continúa.  Consulta el [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign ]] para más información.  Ten en cuenta que [[AntibodyDesignMover]] permite más control. La configuración por defecto es diseñar todos los CDR.  Cualquier opción de diseño de anticuerpos que se mencione en la documentación de diseño de anticuerpos pero no se defina mediante el XML (como se describe en este documento) se puede definir por línea de comandos. [[AntibodyDesignMover]] dispone de más opciones.


```xml
<AntibodyDesignProtocol seq_design_cdrs="(&string (ex: L1,L1,L3))"  graft_design_cdrs="(&string (ex: L1,L1,L3))"/>
```

###Configuración recomendada

-   seq_design_cdrs (&string): Define los CDR que quieres diseñar.  Esto ejecutará diseño de secuencia durante el protocolo sobre estos CDR, usando por defecto perfiles basados en clústeres si están disponibles para ese CDR concreto. El instruction_file se puede usar para ajustar aún más el diseño. 

-   graft_design_cdrs (&string): Define los CDR que quieres diseñar.  Esto muestreará loops de la base de datos de RAbD.  Se puede usar un archivo de instrucciones para especificar longitudes o clústeres concretos, o para muestrear dentro del clúster actual. 

### Todas las opciones

[[include:mover_AntibodyDesignProtocol_type]]


##Véase también

* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]
* [[Mover principal AntibodyDesign | AntibodyDesignMover]]
* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[AntibodyDesignMover]]
* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[I want to do x]]: Guía para elegir un mover
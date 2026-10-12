# AntibodyDesignMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## AntibodyDesignMover

###Autor
Jared Adolf-Bryfogle; jadolfbr@gmail.com; 
PI: Roland Dunbrack

Forma parte del marco de trabajo RosettaAntibody y RosettaAntibodyDesign (RAbD)
* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]

###Propósito

Ejecuta el mover completo de Rosetta Antibody Design (RAbD).  Requiere un anticuerpo con numeración AHo. Ten en cuenta que en RosettaScripts solo el mejor diseño continúa.  Consulta el [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign ]] para más información.  Ten en cuenta que [[AntibodyDesignProtocol]] ejecuta `AntibodyDesignMover`, pero tiene una interfaz más sencilla.  Cualquier opción de diseño de anticuerpos que se mencione en la documentación de diseño de anticuerpos pero no se defina mediante el XML (como se describe en este documento) se puede definir por línea de comandos.

##Opciones básicas

### Diseño de secuencia

En general, lo que se querrá es una ejecución sencilla que optimice la energía de interfaz y use perfiles basados en clústeres para el diseño de secuencia:

```xml
<AntibodyDesignMover seq_design_cdrs="(&string (ex: L1,L1,L3))" mc_optimize_dG="1"/>
```

### Diseño por injerto

Si quieres explorar distintas conformaciones de loop de diferentes CDR, puedes usar la opción `graft_design_cdrs` para injertarlas desde la base de datos y refinarlas.  Puedes usar cualquier combinación de CDR de diseño de secuencia y de diseño por injerto.  Hay muchas más opciones, como poder limitar la longitud o permanecer dentro del clúster actual.  Para controlarlas, debes pasar un `cdr_instruction_file`.  Consulta el manual completo de RAbD para más información: [[RosettaAntibodyDesign#antibody-design-cdr-instruction-file]]

```xml
<AntibodyDesignMover graft_design_cdrs="(&string (ex: L1,L1,L3))" seq_design_cdrs="(&string (ex: L1,L1,L3))" mc_optimize_dG="1"/>
```

##Todas las opciones



[[include:mover_AntibodyDesignMover_type]]

##Véase también

* [[Manual de Rosetta Antibody Design (RAbD) | RosettaAntibodyDesign]]
* [[Consejos generales sobre anticuerpos | General-Antibody-Options-and-Tips]]
* [[AntibodyDesignProtocol]]
* [[Movers de anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]
* [[TaskOperations de anticuerpos | TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]
* [[I want to do x]]: Guía para elegir un mover
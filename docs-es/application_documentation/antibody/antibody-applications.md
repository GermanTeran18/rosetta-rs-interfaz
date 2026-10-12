RosettaAntibody y RosettaAntibodyDesign (RAbD)
================================================

Este conjunto de aplicaciones y herramientas está diseñado específicamente para trabajar con anticuerpos. Antes de usar estas aplicaciones, te conviene revisar la página [[General Antibody Options and Tips]].

[[_TOC_]]
### Modelado de anticuerpos

- [[Antibody protocol]] (RosettaAntibody3): descripción general del protocolo de modelado de anticuerpos.  
    * [[Antibody Python script]]: el script de configuración.  
    * [[Injerto de loops de CDR|antibody-assemble-cdrs]]: injerta plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo de anticuerpo aproximado.  
    * [[Modelado del CDR H3|antibody-model-CDR-H3]]: determina estructuras de anticuerpos combinando el docking VL-VH y el modelado del loop H3.

### Docking de anticuerpos
- [[Docking de anticuerpos de camélidos|antibody-mode-camelid]]: hace el docking de anticuerpos de camélidos con sus antígenos.
- [[SnugDock|snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno




### Utilidades para anticuerpos

* [[CDR Cluster Identification]]: una aplicación que asigna cada CDR de un anticuerpo a clústeres de CDR de North/Dunbrack según la menor distancia de diedros al centro de cada clúster.

<!---BEGIN_INTERNAL-->

* [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar o comparar estrategias de diseño de anticuerpos.

* [[CDR Cluster Constrained Relax]]: una aplicación para relajar CDR usando restricciones armónicas circulares basadas en los clústeres de CDR identificados.

<!---END_INTERNAL-->

### Uso de RosettaScripts para el modelado y el diseño de anticuerpos

Puedes usar la colección de TaskOperations y Movers para escribir tu propio protocolo de modelado y diseño de anticuerpos.  Por ejemplo, este conjunto de TaskOps diseñaría un conjunto de CDR de la cadena pesada y los residuos vecinos del marco con perfiles de clústeres de CDR de North/Dunbrack, además de muestreo de la secuencia completa del CDR, dejando que H3 se diseñe con todos los residuos.

```
<ROSETTASCRIPTS>
	<SCOREFXNS>
	</SCOREFXNS>
	<TASKOPERATIONS>
	  <RestrictToCDRsAndNeighbors name=to_cdrs/>
	  <DisableCDRsOperations name=disable_L cdrs=L1,L2,L3 />
	  <AddCDRProfilesOperation name=profiles cdrs=H1,H2 />
	  <AddCDRProfileSetsOperation mame=sets cdrs=H1,H2 />
	  <DisableAntibodyRegionOperation name=disable_antigen region=antigen_region/>
	</TASKOPERATIONS>
	<FILTERS>
	</FILTERS>
	<MOVERS>
		<PackRotamersMover name=packrot scorefxn=sf task_operations=to_cdrs,disable_L,profiles,sets,disable_antigen/>
	</MOVERS>
	<APPLY_TO_POSE>
	</APPLY_TO_POSE>
	<PROTOCOLS>
		<Add mover_name=packrot />
	</PROTOCOLS>
	<OUTPUT />
</ROSETTASCRIPTS>
```

#### [[TaskOperations para anticuerpos|TaskOperations-RosettaScripts#antibody-and-cdr-specific-operations]]

#### [[Movers para anticuerpos | Movers-RosettaScripts#antibody-modeling-and-design-movers]]

#### [[Edición de estructuras de anticuerpos | Movers-RosettaScripts#general-movers_insertion-and-deletion-grafting]]
## Véase también

* [[General Antibody Options and Tips]]
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Scripting Documentation]]: interfaces de scripting de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Rosetta Servers]]: servidores web para aplicaciones de Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[TACC]]: información para ejecutar Rosetta en el clúster TACC/Stampede.

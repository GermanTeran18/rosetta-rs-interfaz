# SetupHotspotConstraints
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SetupHotspotConstraints (antes hashing_constraints)

[[include:mover_SetupHotspotConstraints_type]]

* stubfile: un archivo PDB que contiene los residuos hotspot
* redesign_chain: cuál es la cadena anfitriona (host_chain) para el diseño. No se ha probado nada que no sea la cadena 2.
* cb_force: la constante de resorte de la ley de Hooke que se usa para configurar las restricciones armónicas sobre los átomos Cb.
* worst_allowed_stub_bonus: descarta los stubs con energías superiores a este umbral.
* apply_stub_self_energies: evalúa la energía del stub en el contexto del Pose.
* pick_best_energy_constraint: cuando se aplica más de una restricción a un residuo concreto, suma solo la que hace la mayor contribución.
* backbone_stub_constraint_weight: el peso del término de puntuación al evaluar la restricción. Ten en cuenta que este peso puede anularse en las funciones de puntuación individuales.

##Véase también

* [[RosettaScriptsPlacement]]: más información sobre el marco de colocación de hotspots.
* [[I want to do x]]: guía para elegir un mover


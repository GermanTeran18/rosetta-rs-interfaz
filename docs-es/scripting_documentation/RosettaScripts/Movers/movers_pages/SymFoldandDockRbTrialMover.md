# SymFoldandDockRbTrialMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SymFoldandDockRbTrialMover

[[include:mover_SymFoldandDockRbTrialMover_type]]

Aplica una perturbación de orientación de cuerpo rígido de la magnitud dada a los jumps de docking simétrico durante el número de ciclos dado. Si `use_mc` está habilitado, lo hace de forma Monte Carlo, aplicando el criterio de Boltzmann (con la función de puntuación `interchain_cen`) después de cada movimiento.
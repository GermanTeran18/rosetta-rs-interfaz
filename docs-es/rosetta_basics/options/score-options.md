#Opciones de la función de puntuación

Esta es una lista de las opciones de la función de puntuación

```
-score:weights                             Name of weights file (without extension .wts)
                                           Default="talaris2013". [String]
-score:patch                               Name of patch file (without extension)
                                           Default="". [String]
-score:set_weights                         Modification to weights via the command line. 
                                           List of paired strings: -score::set_weights <score_type1> <setting1>         
                                           <score_type2> <setting2> ...
-score:empty                               Make an empty score - i.e. NO scoring. [Boolean]
-score:fa_max_dis                          How far does the FA pair potential go out to.
                                           Default = '6.0'. [Real]
-score:fa_Hatr                             Turn on Lennard Jones attractive term for hydrogen 
                                           atoms. [Boolean]
-score:no_smooth_etables                   Revert to old style etables. [Boolean]
-score:etable_lr                           Lowers energy well at 6.5A. [Real]
-score:input_etables                       Read etables from files with given prefix. [String]
-score:output_etables                      Write out etables to files with given prefix. [String]
-score:rms_target                          Target of RMS optimization for RMS_Energy EnergyMethod' 
                                           Default='0.0' [Real]
-score:ramaneighbors                       Uses neighbor-dependent ramachandran maps
                                           Default='false' [Boolean]
-score:symmetric_gly_tables                Use a symmetric version of the Ramachandran and p_aa_pp tables for glycine
                                           when sampling or scoring.  Useful for sampling or scoring glycine in the
                                           context of a mixed D/L amino acid peptide.  As of 23 February 2016, this
                                           flag also symmetrizes the RamaPrePro tables for glycine.  Default='false'
                                           [Boolean]
-score:optH_weights                        Name of weights file (without extension .wts) to use 
                                           during optH. [String]
-score:optH_patch                          Name of weights file (without extension .wts) to use 
                                           during optH. [String]
-score:hbond_bb_per_residue_energy         In score tables, separate backbone hydrogens bond energies per residue. 
                                           (By default, bb hbonds are included in the total energy, but not per residue                    
                                           energies. Note that this may lead to a slowdown in packing) [Boolean]
```

##Véase también

* [Tutorial de puntuación](https://www.rosettacommons.org/demos/latest/tutorials/scoring/scoring)
* [[Options overview]]: descripción de las opciones de Rosetta
* [[Full options list]]
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Scoring explained]]
* [[Units in Rosetta]]: describe las unidades de energía de Rosetta
* [[Términos de puntuación adicionales|score-types-additional]]
* [[Funciones de puntuación y términos de puntuación|score-types]]
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta

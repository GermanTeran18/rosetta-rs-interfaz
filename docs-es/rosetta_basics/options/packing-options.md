#Opciones de empaquetado de rotámeros

Puedes encontrar un tutorial introductorio sobre empaquetado [aquí](https://www.rosettacommons.org/demos/latest/tutorials/Optimizing_Sidechains_The_Packer/Optimizing_Sidechains_The_Packer), y uno sobre diseño de proteínas [aquí](https://www.rosettacommons.org/demos/latest/tutorials/protein_design/protein_design_tutorial).

Las opciones de empaquetado de rotámeros se pueden usar en el modo de diseño con cadena principal fija y en otros protocolos.
Para la mayoría de los protocolos de Rosetta, las opciones 

* <code> -ex1 </code>
* <code> -ex2 </code>
* <code> -use_input_sc </code> 

son suficientes y deben añadirse a la línea de comandos. Lee la documentación de cada protocolo, ya que esto puede no ser útil para algunos. 

Opciones de subrotámeros chi adicionales
==============================

```
-packing:ex1                      Use extra chi1 sub-rotamers for all residues that pass the extrachi_cutoff. [Boolean]
-packing:ex1:level                Use extra chi1 sub-rotamers for all residues that pass the extrachi_cutoff. [Integer]
                                  legal=[ '0', '1', '2', '3', '4', '5', '6', '7' ]
                                  The integers that follow the ex flags specify the pattern for chi dihedral angle sampling.
                                  There are currently 8 options; they all include the original chi dihedral angle.
                                  NO_EXTRA_CHI_SAMPLES          0          original dihedral only; same as using no flag at all
                                  EX_ONE_STDDEV                 1 Default  +/- one standard deviation (sd); 3 samples
                                  EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 samples
                                  EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 samples
                                  EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 samples
                                  EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 samples
                                  EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 samples
                                  EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 samples.
-packing:ex1:operate              Apply special operations (see RotamerOperation class) on ex1 rotamers. [Boolean]
-packing:ex2                      Use extra chi2 sub-rotamers for all residues that pass the extrachi_cutoff.
-packing:ex2:level                Use extra chi2 sub-rotamers for all residues that pass the extrachi_cutoff.
                                  The integers that follow the ex flags specify the pattern for chi dihedral angle sampling.
                                  There are currently 8 options; they all include the original chi dihedral angle.
                                  NO_EXTRA_CHI_SAMPLES          0          original dihedral only; same as using no flag at all
                                  EX_ONE_STDDEV                 1 Default  +/- one standard deviation (sd); 3 samples
                                  EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 samples
                                  EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 samples
                                  EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 samples
                                  EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 samples
                                  EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 samples
                                  EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 samples
-packing:ex1:operate              Apply special operations (see RotamerOperation class) on ex2 rotamers. [Boolean]
-packing:ex3                      Use extra chi3 sub-rotamers for all residues that pass the extrachi_cutoff.
-packing:ex3:level                Use extra chi3 sub-rotamers for all residues that pass the extrachi_cutoff.
                                  The integers that follow the ex flags specify the pattern for chi dihedral angle sampling.
                                  There are currently 8 options; they all include the original chi dihedral angle.
                                  NO_EXTRA_CHI_SAMPLES          0          original dihedral only; same as using no flag at all
                                  EX_ONE_STDDEV                 1 Default  +/- one standard deviation (sd); 3 samples
                                  EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 samples
                                  EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 samples
                                  EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 samples
                                  EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 samples
                                  EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 samples
                                  EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 samples
-packing:ex3:operate              Apply special operations (see RotamerOperation class) on ex3 rotamers. [Boolean]
-packing:ex4                      Use extra chi4 sub-rotamers for all residues that pass the extrachi_cutoff.
-packing:ex4:level                Use extra chi4 sub-rotamers for all residues that pass the extrachi_cutoff.
                                  The integers that follow the ex flags specify the pattern for chi dihedral angle sampling.
                                  There are currently 8 options; they all include the original chi dihedral angle.
                                  NO_EXTRA_CHI_SAMPLES          0          original dihedral only; same as using no flag at all
                                  EX_ONE_STDDEV                 1 Default  +/- one standard deviation (sd); 3 samples
                                  EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 samples
                                  EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 samples
                                  EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 samples
                                  EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 samples
                                  EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 samples
                                  EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 samples
-packing:ex4:operate              Apply special operations (see RotamerOperation class) on ex4 rotamers. [Boolean]
-packing:extrachi_cutoff          Number of neighbors a residue must have before extra rotamers are used. default: 18 [Integerx]
```

Subrotámeros chi adicionales para residuos aromáticos
============================================

```
-packing:ex1aro                   Use extra chi1 sub-rotamers for aromatic residues that pass the extrachi_cutoff. [Boolean]
-packing:ex1aro:level             Use extra chi1 sub-rotamers for all residues that pass the extrachi_cutoff.
                                  The integers that follow the ex flags specify the pattern for chi dihedral angle sampling.
                                  There are currently 8 options; they all include the original chi dihedral angle.
                                  NO_EXTRA_CHI_SAMPLES          0          original dihedral only; same as using no flag at all
                                  EX_ONE_STDDEV                 1 Default  +/- one standard deviation (sd); 3 samples
                                  EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 samples
                                  EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 samples
                                  EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 samples
                                  EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 samples
                                  EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 samples
                                  EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 samples
-packing:ex2aro                   Use extra chi2 sub-rotamers for aromatic residues that pass the extrachi_cutoff.
-packing:ex2aro:level             Use extra chi2 sub-rotamers for all residues that pass the extrachi_cutoff.
                                  The integers that follow the ex flags specify the pattern for chi dihedral angle sampling.
                                  There are currently 8 options; they all include the original chi dihedral angle.
                                  NO_EXTRA_CHI_SAMPLES          0          original dihedral only; same as using no flag at all
                                  EX_ONE_STDDEV                 1 Default  +/- one standard deviation (sd); 3 samples
                                  EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 samples
                                  EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 samples
                                  EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 samples
                                  EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 samples
                                  EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 samples
                                  EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 samples
-packing:ex1aro_exposed           Use extra chi1 sub-rotamers for all aromatic residues. [Boolean]
-packing:ex1aro_exposed:level     Use extra chi1 sub-rotamers for all aromatic residues that pass the extrachi_cutoff.
                                  The integers that follow the ex flags specify the pattern for chi dihedral angle sampling.
                                  There are currently 8 options; they all include the original chi dihedral angle.
                                  NO_EXTRA_CHI_SAMPLES          0          original dihedral only; same as using no flag at all
                                  EX_ONE_STDDEV                 1 Default  +/- one standard deviation (sd); 3 samples
                                  EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 samples
                                  EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 samples
                                  EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 samples
                                  EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 samples
                                  EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 samples
                                  EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 samples
-packing:ex2aro_exposed           Use extra chi2 sub-rotamers for all aromatic residues. [Boolean]
-packing:ex2xaro_exposed:level    Use extra chi2 sub-rotamers for all aromatic residues that pass the extrachi_cutoff.
                                  The integers that follow the ex flags specify the pattern for chi dihedral angle sampling.
                                  There are currently 8 options; they all include the original chi dihedral angle.
                                  NO_EXTRA_CHI_SAMPLES          0          original dihedral only; same as using no flag at all
                                  EX_ONE_STDDEV                 1 Default  +/- one standard deviation (sd); 3 samples
                                  EX_ONE_HALF_STEP_STDDEV       2          +/- 0.5 sd; 3 samples
                                  EX_TWO_FULL_STEP_STDDEVS      3          +/- 1 & 2 sd; 5 samples
                                  EX_TWO_HALF_STEP_STDDEVS      4          +/- 0.5 & 1 sd; 5 samples
                                  EX_FOUR_HALF_STEP_STDDEVS     5          +/- 0.5, 1, 1.5 & 2 sd; 9 samples
                                  EX_THREE_THIRD_STEP_STDDEVS   6          +/- 0.33, 0.67, 1 sd; 7 samples
                                  EX_SIX_QUARTER_STEP_STDDEVS   7          +/- 0.25, 0.5, 0.75, 1, 1.25 & 1.5 sd; 13 samples
```

Opciones de resfile
===============

```
-packing:resfile                  Resfile filename(s).  Most protocols use only the first and will ignore the rest;
                                  it does not track against -s or -l automatically.
                                  Default='resfile' [FileVector]
```

Varios
====

```
-packing:no_optH                  Do not optimize hydrogen placement at the time of a PDB load. default="true" [Boolean]
-packing:pack_missing_sidechains  Run packer to fix residues with missing sidechain density at PDB load. default="true"
                                  [Boolean]
-packing:fix_his_tautomer         Seqpos numbers of his residus whose tautomer should be fixed during repacking.
                                  [IntegerVecter]
-packing:use_input_sc             Use rotamers from input structure in packing. By default, input sidechain coords are NOT
                                  included in rotamer set but are discarded before the initial pack; with this flag, the input
                                  rotamers will NOT be discarded. Note that once the starting rotamers are replaced by any mechanism,
                                  they are no longer included in the rotamer set. (rotamers included by coordinates)
-packing:linmem_ig                Force the packer to use the linear memory interaction graph; each RPE may be computed more than once,
                                  but recently-computed RPEs are reused.  The integer parameter specifies the number of recent rotamers
                                  to store RPEs for.  10 is the recommended size. Memory use scales linearly with the number of rotamers
                                  at about 200 bytes per rotamer per recent rotamers to store RPEs for(~4 KB per rotamer by default).
                                  default='10' [Integer]
-packing:no_his_his_pairE         Set pair term for His-His to zero. [Boolean]
-packing:solvate                  Add explicit water, but don't try to place water such that it bridges Hbonds, just put it on every
                                  available Hbond donor/acceptor where there's no clash (implies explicit_h2o). [Boolean]
-packing:multi_cool_annealer      Alternate annealer for packing.  Runs multiple quence cycles in a first cooling stage, and tracks the N
                                  best network states it observes. It then runs low-temperature rotamer substitutions with repeated quenching
                                  starting from each of these N best network states. 10 is recommended.
```

##Véase también

* [Tutorial sobre el packer](https://www.rosettacommons.org/demos/latest/tutorials/Optimizing_Sidechains_The_Packer/Optimizing_Sidechains_The_Packer)
* [Tutorial sobre diseño de proteínas](https://www.rosettacommons.org/demos/latest/tutorials/protein_design/protein_design_tutorial)
* [[Options overview]]: descripción de las opciones de Rosetta
* [[Full options list]]
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Application Documentation]]: enlaces a la documentación de diversas aplicaciones de Rosetta
* [[Rosetta overview]]: resumen de los conceptos principales de Rosetta, incluido el empaquetado
* [[RosettaEncyclopedia]]: descripciones detalladas de términos de Rosetta
* [[Glossary]]: definiciones breves de términos de Rosetta
* [[Packer Task]]: información sobre el uso de objetos PackerTask
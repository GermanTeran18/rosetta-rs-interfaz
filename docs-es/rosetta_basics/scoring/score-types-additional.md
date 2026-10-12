#Términos de energía adicionales en Rosetta 

Más términos
=============
Esta sección complementa la sección principal [[Tipos de puntuación|score-types]] con otros términos de energía disponibles en Rosetta.

Términos de energía de dos cuerpos independientes del contexto
=========================================

Términos de puntuación de dos cuerpos de corto alcance independientes del contexto
-----------------------------------------------------

```html
fa_intra_atr
fa_intra_sol
fa_intra_RNA_base_phos_atr                 RNA-specific score term
fa_intra_RNA_base_phos_rep                 RNA-specific score term
fa_intra_RNA_base_phos_sol                 RNA-specific score term
lk_hack
lk_ball
lk_ball_wtd
lk_ball_iso
coarse_fa_atr
coarse_fa_rep
coarse_fa_sol
coarse_beadlj
mm_lj_intra_rep
mm_lj_intra_atr
mm_lj_inter_rep
mm_lj_inter_atr
mm_twist                                   
mm_bend                                    Deviation of bond angles from the mean
mm_stretch                                 
lk_costheta
lk_polar
lk_nonpolar                                Lazaridis-Karplus solvation energy, over nonpolar atoms
lk_polar_intra_RNA                         RNA-specific score term
lk_nonpolar_intra_RNA                      RNA-specific score term
fa_elec_bb_bb
fa_elec_bb_sc
fa_elec_sc_sc
h2o_hbond
dna_dr
dna_bp
dna_bs
peptide_bond
pcs                                        Pseudo-contact Shift energy
pcs2                                       Pseudo-contact Shift energy version 2. This will replace pcs by the end of 2010
fastsaxs                                   Fastsaxs agreement using formulation of Stovgaard et al. [1]
saxs_score                                 Centroid SAXS asessment
saxs_cen_score
saxs_fa_score                              Full-atom SAXS score
pddf_score                                 Score based on pairwise distance distribution function
cen_pair_motifs                            Motif score to determine packing in the protein core. Applied to each residue
```

[1] [[Cálculo de curvas precisas de dispersión de rayos X de ángulo pequeño a partir de modelos de proteínas de grano grueso |http://dx.doi.org/10.1186/1471-2105-11-429]], Stovgaard et al., BMC Bioinformatics. 2010; 11:429.

Términos de membrana de todos los átomos pba
---------------------------

```html
fa_mbenv                                   Depth-dependent reference term
fa_mbsolv                                  Burial + depth dependent term
```

fa_elec dividido para ARN
-------------------------

```html
fa_elec_rna_phos_phos                      fa_elec between rna phosphates only, needed to prevent unrealistic phos-phos interactions
fa_elec_rna_phos_sugr
fa_elec_rna_phos_base
fa_elec_rna_sugr_sugr
fa_elec_rna_sugr_base
fa_elec_rna_base_base
fa_elec_rna_phos_phos_fast
fa_elec_rna_phos_sugr_fast
fa_elec_rna_phos_base_fast
fa_elec_rna_sugr_sugr_fast
fa_elec_rna_sugr_base_fast
fa_elec_rna_base_base_fast
fa_elec_aro_aro
fa_elec_aro_all
hack_aro
rna_fa_atr_base
rna_fa_rep_base
rna_data_backbone                          Using chemical accessibility data for RNA
```

Enlaces carbono-hidrógeno
---------------------

```html
ch_bond                                    
ch_bond_bb_bb
ch_bond_sc_sc
ch_bond_bb_sc
```

Energía de cierre de prolina
----------------------

```html
rama2b
vdw                                        Centroid
cenpack                                    Centroid
cenpack_smooth                             fpd smooth cenpack
cen_hb                                     fpd centroid bb hbonding
hybrid_vdw                                 Hybrid centroid+fa
```

Solapamiento gaussiano
----------------

```html
gauss
rna_vdw                                    Low-resolution clash check for RNA
rna_base_backbone                          Bases to 2'-OH, phosphates, etc
rna_backbone_backbone                      2'-OH to 2'-OH, phosphates, etc
rna_repulsive                              Mainly phosphate-phosphate repulsion
rna_base_pair_pairwise                     Base-base interactions (Watson-Crick and non-Watson-Crick)
rna_base_axis_pairwise                     Force base normals to be parallel
rna_base_stagger_pairwise                  Force base pairs to be in same plane
rna_base_stack_pairwise                    Stacking interactions
rna_base_stack_axis_pairwise               Stacking interactions should involve parallel bases
rna_data_base                              Using chemical accessibility data for RNA
```

Términos de ARN
---------

Esta es una versión filtrada de los términos de ARN por pares de baja resolución de arriba; no permite que el borde de una base forme más de un par de bases, y no permite que dos bases se apilen y se apareen a la vez. 

_Esto no es realmente por pares_, sino que se calcula en un paso finalize_energy al final de una función de puntuación de 2 cuerpos.

```html
rna_base_pair                              Base-base interactions (Watson-Crick and non-Watson-Crick)
rna_base_axis                              Force base normals to be parallel
rna_base_stagger                           Force base pairs to be in same plane
rna_base_stack                             Stacking interactions
rna_base_stack_axis                        Stacking interactions should involve parallel bases
rna_mg                                     Knowledge-based term for mg(2+)RNA interactions for use in low-resolution modeling
rna_mg_rep                                 Ad hoc, empirically validated term to prevent uncommon mg(2+)atom interactions
rna_mg_indirect                            Knowledge-based term for mg(2+)RNA interactions for use in low-resolution modeling
```

Términos de ARN de alta resolución
-------------------------

```html
rna_torsion                                RNA torsional potential
rna_sugar_close                            Constraints to keep RNA sugar closed, and with reasonably ideal geometry
fa_stack                                   Stacking interaction modeled as pairwise atom-atom interactions
fa_stack_aro
stack_elec                                 Distance dependent dielectric between base atoms (attenuated parallel to plane)
stack_elec_base_base
stack_elec_base_bb
```

Potenciales torsionales de ADN basados en restricciones
------------------------------------------

```html
dna_bb_torsion
dna_sugar_close
dna_base_distance
geom_sol_fast                              Context independent version. Currently tested only for RNA case
geom_sol_fast_intra_RNA                    RNA specific score term
fa_cust_pair_dist                          Custom short range two-body
custom_atom_pair
```

Todos los tipos de puntuación de orbitales
---------------------------

```html
orbitals_hpol_bb
pci_cation_pi
pci_pi_pi
pci_salt_bridge
pci_hbond
```

Términos de energía de dos cuerpos dependientes del contexto
=======================================

Términos de puntuación de dos cuerpos de corto alcance independientes del contexto
-----------------------------------------------------

```html
fa_pair_aro_aro
fa_pair_aro_pol
fa_pair_pol_pol
hbond_sr_bb_sc
hbond_lr_bb_sc
hbond_intra                                Currently effects only RNA
```

Puntuaciones de interfaz proteína-proteína
--------------------------------

```html
interface_dd_pair
```

Solvatación geométrica
-------------------

```html
geom_sol                                   Geometric solvation energy for polar atoms
geom_sol_intra_RNA                         RNA-specific score term
occ_sol_fitted
occ_sol_fitted_onebody
occ_sol_exact
```

Par de rotámeros centroid, P(r,ang,dih|aa)
--------------------------------------

```html
cen_rot_pair                               P(r|aa)
cen_rot_pair_ang                           P(ang|r,aa)
cen_rot_pair_dih                           P(dih|r,aa)
pair                                       Centroid
cen_pair_smooth                            fpd smooth centroid pair
Mpair
```

Energía de átomo ventosa (sucker)
------------------

```html
suck
```

Términos de ARN de baja resolución
------------------------

```html
rna_rg                                     Radius of gyration for RNA
```

Termodinámica a resolución de nucleótido
------------------------------------

```html
loop_close                                 Loop closure terms - attempting to model full RNA folding free energy
```

Modelo de solvatación FACTS
---------------------

```html
facts_elec
facts_solv
facts_sasa
```

Puntuaciones centroid de un cuerpo entre cadenas (docking)
---------------------------------------

```html
interchain_pair
interchain_vdw
```

Otros términos de energía
=======================================

Varios
-------------

```html
gb_elec
```

Términos de puente disulfuro de todos los átomos
-------------------------

```html
dslf_cbs_ds                                Replaced by dslf_fa13 in talaris2013
```


Términos de puente disulfuro centroid
------------------------

```html
dslfc_cen_dst
dslfc_cb_dst
dslfc_ang
dslfc_cb_dih
dslfc_bb_dih
```

Términos de emparejamiento de puentes disulfuro
------------------------

```html
dslfc_rot
dslfc_trans
dslfc_RT
```

Términos de restricción
----------------

```html
atom_pair_constraint                       Harmonic constraints between atoms involved in Watson-Crick base pairs specified by the user in the params file
constant_constraint
coordinate_constraint
angle_constraint
dihedral_constraint
big_bin_constraint
dunbrack_constraint
site_constraint
metalhash_constraint                       Rigid body, metal binding constraints for centroid mode
rna_bond_geometry                          Deviations from ideal geometry
```

Varios
-------------

```html
fa_dun_dev
fa_dun_rot
fa_dun_semi
dna_chi
p_aa_pp_offset
yhh_planarity
h2o_intra
ref_nc
seqdep_ref
nmer_ref
nmer_pssm
nmer_svm
envsmooth
e_pH
rna_bulge
mg_ref                                     Chemical potential for mg(2+) ('reference weight' in Rosetta terminology)
free_suite                                 Bonus for virtualizing RNA suite
free_2HOprime                              Bonus for virtualizing RNA 2'-OH
intermol                                   Cost of instantiating a chain form 1 M std state
special_rot
other_pose                                 In preparation for multi-pose stuff
```


Potencial PB
------------

```html
PB_elec
```

Energías centroid de estructura completa
========================

Energías centroid de estructura completa
---------------------------------

```html
cen_env_smooth                             fpd smooth centroid env
cbeta_smooth                               fpd smooth cbeta
cen_pair_motif_degree                      Determines packing in protein core. Only counts the best packed residue over a region. Whole-strucuture version of cen_pair_motifs
cen_rot_env
cen_rot_dun
env
cbeta
DFIRE
Menv
Mcbeta
Menv_non_helix
Menv_termini
Menv_tm_proj
Mlipo
rg                                         Radius of gyration
rg_local                                   Radius of gyration for repeat proteins
co                                         Contact order
hs_pair
ss_pair
rsigma
sheet
burial                                     Informatic burial prediction
abego                                      Informatic torsion-bin prediction
```

Puntuaciones de estructura secundaria
------------------------------------------

```html
natbias_ss
natbias_hs
natbias_hh
natbias_stwist
```

Puntuación de composición de aminoácidos
----------------------------

```html
aa_cmp
dock_ens_conf                              Conformer reference energies for docking
csa                                        NMR chemical shift anisotropy energy
dc                                         NMR dipolar coupling energy
rdc                                        NMR residual dipolar coupling energy
rdc_segments                               Fit alignment on multiple segments independently
rdc_rohl
```

Términos de puntuación adicionales
======================

Varios
-------------

```html
holes
holes_decoy
holes_resl
holes_min
holes_min_mean
rna_chem_shift                             RNA NMR chemical shift pseudo-energy term
dab_sasa                                   Classic 1.4A probe solvant accessible surface area
dab_sev                                    Solvent excluded volume - volume of atoms inflated by 1.4A
sa                                         Nonpolar contribution in GBSA
d2h_sa                                     Correlation between SASA and hydrogen exchange data
ProQM                                      Membrane MQAP
ProQ                                       MQAP
```

Puntuaciones centroid de un cuerpo entre cadenas (docking)
---------------------------------------------

```html
interchain_env
interchain_contact
```

Varios
-------------

```html
chainbreak
linear_chainbreak
overlap_chainbreak
distance_chainbreak
dof_constraint
rama2b_offset
omega2b_offset
cart_bonded                                Cartesian bonded potential
cart_bonded_angle                          Cartesian bonded potential
cart_bonded_length                         Cartesian bonded potential
cart_bonded_torsion                        Cartesian bonded potential
total_score
```


Aproximación de solvatación por vectores de vecinos
---------------------------------------

```html
neigh_vect
neigh_count
neigh_vect_raw
```

Bonificación por simetría
--------------

```html
symE_bonus
```

Interacciones implícitas de ligandos (simetría)
---------------------------------------

```html
sym_lig
```

Energía de puntuación de empaquetamiento
------------------------------------

```html
pack_stat
```

Métricas de calidad del modelo.
----------------------

```html
rms                                        All-heavy-atom RMSD to the native structure
```

Términos ResidueConstraint
---------------------

```html
res_type_constraint
```

Restricción de vinculación de tipo de residuo
-------------------------------

```html
res_type_linking_constraint
```

Términos PocketConstraint
--------------------

```html
pocket_constraint
```

Términos BackboneStubConstraint
--------------------------

```html
backbone_stub_constraint
backbone_stub_linear_constraint
surface
p_aa
unfolded
```

Términos de puntuación de ajuste a la densidad
---------------------

```html
elec_dens_fast
elec_dens_window
elec_dens_whole_structure_ca
elec_dens_whole_structure_allatom
elec_dens_atomwise
```

Términos de puntuación de correlación de Patterson
---------------------

```html
patterson_cc
```

Objetivo cristalográfico de máxima verosimilitud (ML)
--------------------------

```html
xtal_ml
xtal_rwork
xtal_rfree
hpatch
```

Entorno de membrana suavizado
---------------------------

```html
Menv_smooth
```

##Véase también

* [[Scoring explained]]
* [[Funciones de puntuación y términos de puntuación|score-types]]
* [[Términos de guía para el diseño|design-guidance-terms]]
* [[Término de energía de enlaces de hidrógeno|hbonds]]
* [[Funciones de puntuación para residuos y moléculas no canónicos|NC-scorefunction-info]]
* [[Añadir nuevos términos de puntuación|new-energy-method]]

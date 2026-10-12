#Términos de energía en Rosetta 

Puedes encontrar un tutorial introductorio sobre cómo puntuar biomoléculas con Rosetta [aquí](https://www.rosettacommons.org/demos/latest/tutorials/scoring/scoring).

Archivo de pesos estándar
=====================

**REF2015** se desarrolló como beta_nov15 y se convirtió en la función de puntuación predeterminada en julio de 2017. Los principales cambios incluyen la optimización de los parámetros electrostáticos, parámetros de torsión actualizados, parámetros de enlace actualizados y la activación de la atracción LJ para los hidrógenos. Para más información, consulta [beta_nov15_updates](https://www.rosettacommons.org/docs/latest/rosetta_basics/scoring/Updates-beta-nov15) y el siguiente artículo:

[Park H et al., J Chem Theory Comput. 2016](https://pubs.acs.org/doi/abs/10.1021/acs.jctc.6b00819)

[Alford RF et al., J Chem Theory Comput. 2017](https://pubs.acs.org/doi/abs/10.1021/acs.jctc.7b00125)

La función de puntuación anterior, **talaris2014**, es una ligera modificación de la función de energía **talaris2013**. Las funciones de energía **talaris2013** y **talaris2014** y sus correcciones se probaron en los artículos 

[Leaver-Fay et al., Methods in Enzymology 2013](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3724755/)

[O’Meara et al., J. Chem. Theory Comput. 2015](https://dx.doi.org/10.1021/ct500864r)  

Puedes encontrar una descripción completa de los cambios que introduce esta función de energía [aquí](https://www.rosettacommons.org/node/3508#comment-6946).  

La función de energía **talaris2014** es adecuada para puntuar L-aminoácidos canónicos, sus imágenes especulares D-aminoácidos y algunos ligandos rígidos (_p. ej._ iones metálicos, fosfato, _etc._).  También puede funcionar con residuos alfa-aminoácidos no canónicos, siempre que sus archivos params estén configurados correctamente.  Los términos de conformación de la cadena principal ignorarán los beta-aminoácidos, los ligandos flexibles, los ácidos nucleicos, _etc._

Referencias
==========

O'Meara, M. J., Leaver-Fay, A., Tyka, M., Stein, A., Houlihan, K., DiMaio, F., Bradley, P., Kortemme, T., Baker, D., Snoeyink, J.,
_A Combined Covalent-Electrostatic Model of Hydrogen Bonding Improves Structure Prediction with Rosetta. Journal of Chemical Theory and Computation_, 2015.

Leaver-Fay, A., O'Meara, M. J., Tyka, M., Jacak, R., Song, Y., Kellogg, E. H., Thompson, J., Davis, I. W., Pache, R. A., Lyskov, S., Gray, J. J., Kortemme, T., Richardson, J. S., Havranek, J. J., Snoeyink, J., Baker, D., Kuhlman, B., _Scientific benchmarks for guiding macromolecular energy function improvement_. Methods in enzymology, 2013. 523: p. 109.

Rohl, C. A., Strauss, C. EM., Misura, K. MS., Baker, D., Protein structure prediction using Rosetta. Methods in enzymology, 2004. 383: p. 66-93.

Kuhlman, B., Dantas, G., Ireton, G. C., Varani, G., Stoddard, B. L., Baker, D., _Design of a novel globular protein fold with atomic-level accuracy_. Science, 2003. 302(5649): p. 1364-8.

Kuhlman, B. and D. Baker, _Native protein sequences are close to optimal for their structures_. Proceedings of the National Academy of Sciences of the United States of America, 2000. 97(19): p. 10383-8.

Además, existe una [presentación más antigua](http://www.rosettadesigngroup.com/workshops/RCW2007/presentations/GlennRosettacon2007.ppt) sobre funciones de puntuación.

Términos de energía usados en talaris2013.wts
-------------------------------------

```html
fa_atr                                     Lennard-Jones attractive between atoms in different residues.  Supports canonical and noncanonical residue types.
fa_rep                                     Lennard-Jones repulsive between atoms in different residues.  Supports canonical and noncanonical residue types.
fa_sol                                     Lazaridis-Karplus solvation energy.  Supports canonical and noncanonical residue types.
fa_intra_rep                               Lennard-Jones repulsive between atoms in the same residue.  Supports canonical and noncanonical residue types.
fa_elec                                    Coulombic electrostatic potential with a distance-dependent dielectric.  Supports canonical and noncanonical residue types.
pro_close                                  Proline ring closure energy and energy of psi angle of preceding residue.  Supports D- or L-proline, plus D- or L-oligourea-proline.
hbond_sr_bb                                Backbone-backbone hbonds close in primary sequence.  All hydrogen bonding terms support canonical and noncanonical types.
hbond_lr_bb                                Backbone-backbone hbonds distant in primary sequence.
hbond_bb_sc                                Sidechain-backbone hydrogen bond energy.
hbond_sc                                   Sidechain-sidechain hydrogen bond energy.
dslf_fa13                                  Disulfide geometry potential.  Supports D- and L-cysteine disulfides, plus homocysteine disulfides or disulfides involving beta-3-cysteine.
rama                                       Ramachandran preferences.  Supports only the 20 canonical alpha-amino acids and their mirror images.
omega                                      Omega dihedral in the backbone. A Harmonic constraint on planarity with standard deviation of ~6 deg.  Supports alpha-amino acids, beta-amino acids, and oligoureas.  In the case of oligoureas, both amide bonds (called "mu" and "omega" in Rosetta) are constarined to planarity.
fa_dun                                     Internal energy of sidechain rotamers as derived from Dunbrack's statistics (2010 Rotamer Library used in Talaris2013).  Supports any residue type for which a rotamer library is avalable.
p_aa_pp                                    Probability of amino acid at Φ/Ψ.  Supports only the 20 canonical alpha-amino acids and their mirror images.
ref                                        Reference energy for each amino acid. Balances internal energy of amino acid terms.  Plays role in design.  Supports only the 20 canonical alpha-amino acids and their mirror images.
METHOD_WEIGHTS                             Not an energy term itself, but the parameters for each amino acid used by the ref energy term.  A value is provided for each of the 20 canonical alpha-amino acids.  The same value is applied for the equivalent mirror-image D-amino acid.
```

Términos de energía adicionales para las funciones de energía beta <a name="[beta_july15/beta_nov15/beta_nov16]" />
---------------------------------------

```html
lk_ball                                Anisotropic contribution to the solvation.  Supports arbitrary residue types.
lk_ball_iso                            Same as fa_sol; see below.  Supports arbitrary residue types.
lk_ball_wtd                            weighted sum of lk_ball & lk_ball_iso (w1*lk_ball + w2*lk_ball_iso); w2 is negative so that anisotropic contribution(lk_ball) replaces some portion of isotropic contribution (fa_sol=lk_ball_iso).  Supports arbitrary residue types.
lk_ball_bridge                         Bonus to solvation coming from bridging waters, measured by overlap of the "balls" from two interacting polar atoms.  Supports arbitrary residue types.
lk_ball_bridge_uncpl                   Same as lk_ball_bridge, but the value is uncoupled with dGfree (i.e. constant bonus, whereas lk_ball_bridge is proportional to dGfree values).  Supports arbitrary residue types.            
fa_intra_atr_xover4                    Intra-residue LJ attraction, counted for the atom-pairs beyond torsion-relationship.  Supports arbitrary residues types.
fa_intra_rep_xover4                    Intra-residue LJ repulsion, counted for the atom-pairs beyond torsion-relationship.  Supports arbitrary residues types.
fa_intra_sol_xover4                    Intra-residue LK solvation, counted for the atom-pairs beyond torsion-relationship.  Supports arbitrary residues types.                 
fa_intra_elec                          Intra-residue Coulombic interaction, counted for the atom-pairs beyond torsion-relationship.  Supports arbitrary residues types.
rama_prepro                            Backbone torsion preference term that takes into account of whether preceding amono acid is Proline or not.  Currently supports the 20 canonical alpha-amino acids, their mirror-image D-amino acids, oligoureas, and N-methyl amino acids.  Arbitrary new building-blocks can also be supported provided that an N-dimensional mainchain potential can be generated somehow.
hxl_tors                               Sidechain hydroxyl group torsion preference for Ser/Thr/Tyr, supersedes yhh_planarity (that covers L- and D-Tyr only).
```

Términos de energía adicionales para score12 <a name="score12" />
-----------------------------------

Las versiones anteriores de Rosetta usaban la función de energía score12 como función de energía de todos los átomos predeterminada. Muchos de los términos de energía son los mismos que en talaris2013 (aunque con pesos distintos y con parámetros diferentes), si bien también se usaban otros términos:

```html
fa_pair                                    Statistics-based pair term, favors salt bridges (replaced by fa_elec in talaris2013).  Supported only the 20 canonical alpha-amino acids.
fa_plane                                   π-π interaction between aromatic groups, by default = 0.
dslf_ss_dst                                Distance score in current disulfide (replaced by dslf_fa13 in talaris2013).
dslf_cs_ang                                Csangles score in current disulfide (replaced by dslf_fa13 in talaris2013).
dslf_ss_dih                                Dihedral score in current disulfide (replaced by dslf_fa13 in talaris2013).
dslf_ca_dih                                Cα dihedral score in current disulfide (replaced by dslf_fa13 in talaris2013).
```

La función de energía score12 se puede usar en las versiones actuales de Rosetta, pero hay que pasar la opción <code> -restore_pre_talaris_2013_behavior</code>.


Recursos adicionales
=====================

*  [[Función de puntuación MM Std | NC-scorefunction-info#MM-Standard-Scorefunction]]

*  [[Función de puntuación de orbitales | NC-scorefunction-info#Partial-Covalent-Interactions-Energy-Function-(Orbitals)]]

*  [[Descripción general del proyecto de optimización de la función de energía del grupo de Seattle|Overview of Seattle Group energy function optimization project]]: nueva función de puntuación beta (en desarrollo activo)

*  [[Tipos de puntuación adicionales | score-types-additional]]


Shapovalov, M.V. y R.L. Dunbrack, _A smoothed backbone-dependent rotamer library for proteins derived from adaptive kernel density estimates and regressions_. Structure, 2011. 19(6): p. 844-858.

Dunbrack, R.L. y F.E. Cohen, _Bayesian statistical analysis of protein side‐chain rotamer preferences_. Protein Science, 1997. 6(8): p. 1661-1681.

Lazaridis, T. y M. Karplus, _Effective energy function for proteins in solution_. Proteins: Structure, Function, and Bioinformatics, 1999. 35(2): p. 133-152.

##Véase también

* [Tutorial de puntuación](https://www.rosettacommons.org/demos/latest/tutorials/scoring/scoring)
* [[Scoring explained]]
* [[Términos de puntuación adicionales|score-types-additional]]
* [[Términos de guía para el diseño|design-guidance-terms]]
* [[Centroid score terms]]
* [[Units in Rosetta]]: describe las unidades de energía de Rosetta
* [[AACompositionEnergy]]
* [[Término de energía de enlaces de hidrógeno|hbonds]]
* [[Funciones de puntuación para residuos y moléculas no canónicos|NC-scorefunction-info]]
* [[Añadir nuevos términos de puntuación|new-energy-method]]
* [[Scorefunction history]]: historia de la función de puntuación de Rosetta

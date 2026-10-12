#Antibody General

## Numeración de PDB y definiciones de CDR

En la literatura hay muchos esquemas de numeración y definiciones de CDR para anticuerpos.

Para comenzar cualquier protocolo actual de anticuerpos de Rosetta, primero hay que renumerar el PDB de entrada, a menos que el PDB se haya creado a partir de una secuencia con el script antibody.py (que por ahora solo entrega anticuerpos renumerados en Chothia).

- Chothia + Kabat: [AbNum](http://www.bioinf.org.uk/abs/abnum/)
- AHo (necesario para los protocolos de diseño de anticuerpos): [PyIgClassify](http://dunbrack2.fccc.edu/PyIgClassify/)

##Opciones relevantes

```
(antibody group - can be used like: antibody:numbering_scheme)

-input_ab_scheme, String,
The numbering scheme of the PDB file.
Options = 'Chothia','Enhanced_Chothia','AHo','AHO',
'IMGT','Kabat','Chothia_Scheme','Enhanced_Chothia_Scheme', 
'AHo_Scheme', 'AHO_Scheme', 'IMGT_Scheme', 'Kabat_Scheme',

default='Chothia_Scheme'

-output_ab_scheme, String,
Output numbering scheme supported by most antibody apps that output pdbs.  
Please see documentation.
Options = 'Chothia','Enhanced_Chothia','AHo','AHO',
'IMGT','Kabat','Chothia_Scheme','Enhanced_Chothia_Scheme', 
'AHo_Scheme', 'AHO_Scheme', 'IMGT_Scheme', 'Kabat_Scheme',

default='Chothia_Scheme'

-check_cdr_chainbreaks, Boolean,
Check CDRs of input antibody for chainbreaks upon initializing RosettaAntibody 
and RosettaAntibodyDesign. 
Chainbreaks found will result in the model not proceeding. 
A peptide bond in the loop is considered 
broken if its C-N bond is > 2.0 A,
 default=true

-check_cdr_pep_bond_geom, Boolean,
Check CDRs of input antibody for bad peptide bond geometry.  
This checks Ca-C-N and C-N-Ca bond angles for 
-large- deviations from the min max values found in a recent 
analysis of protein geometry  
- Conformation dependence of backbone geometry in proteins. 
Structure -.  

If found, the model will not proceed.  
Use FastRelax with bond angle min to fix issues.  
These issues usually arise from poorly resolved crystal loops 
or incorrectly solved structures.  
Many older antibody structures have some of these issues.,
 default=false

-allow_omega_mismatches_for_north_clusters, Boolean,
Skip first grouping Cis and Trans for North/Dunbrack clusters 
in which a Cis/Trans designation currently does not exist. 
If you get an NA, or a warning when identifying CDRs, 
change this option to true.  
Currently only used for the RosettaAntibodyDesign (RAbD) Framework.,
 default=false

-light_chain, String,
Type of light chain if known.  Only used for design for now.,
 legal = [unknown, lambda, kappa],
 default=unknown

```

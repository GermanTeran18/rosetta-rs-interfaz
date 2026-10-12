# SetTorsion
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## SetTorsion

Fija una torsión dada en un valor especificado. Este mover también puede usarse para aleatorizar una torsión (fijarla en un valor totalmente aleatorio), para aleatorizar las torsiones de la cadena principal de alfa-aminoácidos con sesgo según el mapa de Ramachandran, o para perturbar una torsión (sumar un pequeño valor aleatorio a su valor inicial).

```xml
<SetTorsion name="&string" foldtree_root="(&int)">
     <Torsion residue="(&pdb/rosetta numbering)" torsion_name="(&string)" angle="(&string)" perturbation_type="(&string)" perturbation_magnitude="(&real)" />
     <Torsion residue="pick_atoms" torsion_name="(&string)" angle="(&string)" perturbation_type="(&string)" perturbation_magnitude="(&real)" >
          <Atom1 residue="(pdb/rosetta numbering)" atom="(&string)" />
          <Atom2 residue="(pdb/rosetta numbering)" atom="(&string)" />
          <Atom3 residue="(pdb/rosetta numbering)" atom="(&string)" />
          <Atom4 residue="(pdb/rosetta numbering)" atom="(&string)" />
     </Torsion>
</SetTorsion>
```
Se pueden especificar una o más torsiones con bloques ```<Torsion>```. Las torsiones pueden identificarse por nombre o especificando cuatro átomos en subetiquetas. Las opciones incluyen:

- **foldtree_root**: si se especifica, la cadena se reenraíza temporalmente en el residuo dado. Es útil para evitar movimientos no deseados de la cadena. El FoldTree se restablece al del Pose de entrada tras alterar las torsiones. Opcional.
-   **torsion_name**: "phi", "psi", "omega" o "rama" (que fija tanto phi como psi) para alfa-aminoácidos; "phi", "theta", "psi" u "omega" para beta-aminoácidos. Debe especificarse, a menos que se elija por átomos.
-  **residue**: un número de residuo. Si se especifica ```"pick_atoms"``` dentro de un bloque ```<Torsion>```, la torsión puede seleccionarse con subetiquetas ```<Atom#.../>```. Alternativamente, puede ponerse en "ALL", en cuyo caso la torsión seleccionada se fija en todos los residuos.
- **angle**: el valor (en grados) al que se fijará la torsión, si aquí se da un número. Alternativamente, el usuario puede especificar "random", en cuyo caso la torsión se aleatoriza por completo, o "perturb", en cuyo caso se suma un pequeño valor aleatorio al valor actual de la torsión. Por último, si se usa ```torsion_name="rama"``` con un alfa-aminoácido, el usuario puede especificar ```angle="rama_biased"```, en cuyo caso tanto phi como psi se aleatorizan con sesgo según el mapa de Ramachandran de ese tipo de aminoácido. Si se usa la opción ```angle="rama_biased"```, el usuario puede especificar opcionalmente un mapa de Ramachandran personalizado para el muestreo con la opción ```custom_rama_table=\<string\>```. Los mapas de Ramachandran admitidos actualmente incluyen flat_l_aa_ramatable, flat_d_aa_ramatable, flat_symm_dl_aa_ramatable, flat_symm_gly_ramatable, flat_symm_pro_ramatable, flat_l_aa_ramatable_stringent, flat_d_aa_ramatable_stringent, flat_symm_dl_aa_ramatable_stringent, flat_symm_gly_ramatable_stringent y flat_symm_pro_ramatable_stringent.
- **perturbation_type**: si se usa ```angle="perturb"```, determina cómo se elige el pequeño valor aleatorio que se suma al ángulo actual. Las opciones actuales son ```"uniform"``` y ```"gaussian"```. Si no se especifica, por defecto es ```"gaussian"```.
- **perturbation_magnitude**: si se usa ```angle="perturb"```, determina el tamaño de la perturbación. Si no se especifica, por defecto es 1.0.


##Véase también

* [[SmallMover]]
* [[ShearMover]]
* [[SetTemperatureFactorMover]]
* [[SetSecStructEnergiesMover]]
* [[I want to do x]]: guía para elegir un mover


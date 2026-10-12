# BluePrintBDR
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## BluePrintBDR

Construye una estructura en modo centroide a partir de un blueprint, dado un pdb de entrada.

```xml
<BluePrintBDR name="bdr" blueprint="input.blueprint" use_abego_bias="0" use_sequence_bias="0" scorefxn="scorefxn1"/>
```

Opciones (valor predeterminado):

     num_fragpick ( 200 ), 
     use_sequence_bias ( false ), use sequence bias in fragment picking
     use_abego_bias ( false ), use abego bias in fragment picking
     max_linear_chainbreak ( 0.07 ),
     ss_from_blueprint ( true ),
     constraints_NtoC ( -1.0 ),
     constraints_sheet ( -1.0 ),
     constraint_file ( "" ),
     dump_pdb_when_fail ( "" ),
     rmdl_attempts ( 1 ),
     use_poly_val ( true ),
     tell_vlb_to_not_touch_fold_tree (false),
     invrot_tree_(NULL),
     enzcst_io_(NULL)

Formato del blueprint:

     resnum  residue  (ss_struct)(abego) rebuild
     resnum = consecutive (starting from 1) or 0 (to indicate a new residue not in the input.pdb)
     residue = one letter code amino acid (e.g. V for Valine)
     ss_struct = secondary structure, E,L or H. ss_struct and abego are single-letter and have no space between them.
     abego = abego type (ABEGO), use X if any is allowed
     rebuild = R (rebuild this position) or "." (leave as is)

Ejemplos

     1   V  LE  R   (position 1, Val, loop, abego type E, rebuild)
     0   V  EX  R   (insert a residue, Val, sheet, any abego, rebuild)
     2   V  EB  .   (position 2, Val, sheet, abego type B, do not rebuild)

Ten en cuenta que este mover se usa a menudo junto con un mover SetSecStructEnergies, que se aplicaría primero; ambos llaman al mismo archivo blueprint, con un encabezado que indica el emparejamiento deseado. Consulta [[SetSecStructEnergiesMover]] para más información.


##Véase también

* [[RemodelMover]]
* [[I want to do x]]: guía para elegir un mover

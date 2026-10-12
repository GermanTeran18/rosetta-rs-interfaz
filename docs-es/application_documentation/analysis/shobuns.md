#shobuns: átomos polares enterrados sin satisfacer (UNSatisfied) para el modelo de solvatación SHO
Metadatos
========

Autor: Andrea Bazzoli (ndrbzz [at] gmail.com)

Última actualización: marzo de 2020

Código
====

El código de la aplicación se encuentra en `src/apps/public/analysis/shobuns.cc`.

Propósito de la aplicación
===================

Dado un conjunto objetivo de átomos polares, identifica los que están enterrados sin satisfacer según el modelo SHO de solvatación polar.

Un átomo polar se define como «enterrado sin satisfacer» si tiene una energía SHO superior a un umbral dado y no forma enlace de hidrógeno con ningún átomo del soluto. 

Uso
=====

### Combinaciones de opciones aceptadas
Las opciones específicas de la aplicación solo se aceptan en las siguientes combinaciones:

* La **combinación de opciones n.º 1** selecciona todos los átomos polares del Pose:  
````
[NO OPTIONS]
````

* La **combinación de opciones n.º 2** selecciona todos los átomos polares llamados \<ATOM\> de todos los residuos de tipo \<AMINO\>:
````
-pose_metrics:shobuns:tgt_atom <ATOM>
<ATOM> is the atom name.

-pose_metrics:shobuns:tgt_amino <AMINO>
<AMINO> is the residue type's one-letter code. If <AMINO> is the string "any" (without quotes), then the application selects all polar atoms named <ATOM> from all residues that have one.
````

* La **combinación de opciones n.º 3** selecciona todos los átomos polares de los residuos especificados en el archivo objetivo \<TGTFIL\>:
````
-pose_metrics:shobuns:tgt_res <TGTFIL>
<TGTFIL> is a pathname.
````
El archivo \<TGTFIL\> especifica un residuo objetivo por línea indicando, en ese orden, el ID de cadena del residuo, el número de secuencia y el código de inserción en el archivo PDB de entrada. Por ejemplo, para seleccionar los residuos 50, 52, 54 y 55 de la cadena A, todos con código de inserción en blanco, se especificaría el siguiente archivo \<TGTFIL\>:
````
A 50 _
A 52 _
A 54 _
A 55 _
````
Ten en cuenta que un código de inserción en blanco se especifica con un guion bajo (_).

### Más opciones
Las combinaciones de opciones anteriores se pueden complementar con las siguientes opciones:
````
pose_metrics:shobuns:sho_cutoff <CUTOFF>
<CUTOFF> is the maximum SHO-energy value (kcal/mol) that an atom can have in order to be classified as solvent exposed (i.e., not buried). Defaults to 4.9.
```` 

Salida (en pantalla)
==================
Clasificación de los átomos polares seleccionados en «enterrados sin satisfacer» y «otros». La salida reporta una línea por átomo, cada una con el siguiente formato:
````
ATOM_ID Esho #hb (wEhb wEsho+wEhb)

ATOM_ID: identifier.
Esho: SHO energy (kcal/mol).
#hb: number of H-bonds formed.
wEhb: weighted H-bond energy (secondary information).
wEsho+wEhb: weighted SHO plus H-bond energy (secondary information), not counting the SHO-to-EEF1 scaling (see Ref. 1).
````


Este es un ejemplo de salida:
````
BURIED UNSATISFIED ATOMS:
A55(15)1HH1 Esho:5 #hb:0  (wEhb:0 wEsho+wEhb: 4.6875)
A52(12) H   Esho:5 #hb:0  (wEhb:0 wEsho+wEhb: 4.6875)
A54(14) H   Esho:5 #hb:0  (wEhb:0 wEsho+wEhb: 4.6875)
...

OTHER ATOMS:
A55(15) H   Esho:1.77322 #hb:0  (wEhb:0 wEsho+wEhb: 1.66239)
A55(15) HE  Esho:0.30118 #hb:0  (wEhb:0 wEsho+wEhb: 0.282356)
A55(15)2HH1 Esho:2.82807 #hb:1  (wEhb:-0.310352 wEsho+wEhb: 2.34097)
A55(15)1HH2 Esho:0.165621 #hb:0  (wEhb:0 wEsho+wEhb: 0.15527)
A55(15)2HH2 Esho:0.378151 #hb:0  (wEhb:0 wEsho+wEhb: 0.354516)
A55(15) O   Esho:2.06023 #hb:1  (wEhb:-0.0767224 wEsho+wEhb: 1.85474)
A52(12) O   Esho:0.571469 #hb:0  (wEhb:0 wEsho+wEhb: 0.535752)
...
````

Referencias
==========
[1] Bazzoli A, Karanicolas J. _"Solvent hydrogen-bond occlusion": A new model of polar desolvation for biomolecular energetics_ (2017) J Comput Chem 38:1321–1331. 
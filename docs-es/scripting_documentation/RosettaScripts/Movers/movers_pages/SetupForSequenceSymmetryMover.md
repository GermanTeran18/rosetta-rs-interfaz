# SetupForSequenceSymmetryMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
Última actualización de la página: 25 de enero de 2021.

Este mover no afecta al empaquetado por sí solo. Para imponer simetría de secuencia en cualquier paso de empaquetado debes habilitar la task operation **KeepSequenceSymmetry**.
Para más información sobre el protocolo, consulta la página [[KeepSequenceSymmetry]].

Este mover se usa para definir un sistema simétrico en el que no quieres/no puedes definir simetría geométrica.
Usa selectores de residuos arbitrarios para definir conjuntos de residuos en los que se debe imponer simetría de secuencia.
Los selectores enlazados se definen en subetiquetas **SequenceSymmetry**, que reciben los nombres de selectores de residuos definidos previamente.
Es posible usar distintos tipos de selectores de residuos, pero todos los selectores enlazados deben definir el mismo número de residuos.

Cada subetiqueta **SequenceSymmetry** define un conjunto distinto de regiones para las que se mantiene la simetría de secuencia.
Cuando las analiza el packer, se usa la unión de cualesquiera subetiquetas que se solapen para especificar los residuos enlazados.
Por ejemplo, enlazar la cadena A con la B y luego la A con la C en subetiquetas separadas es funcionalmente equivalente a enlazar A, B y C.

Además, cada **SetupForSequenceSymmetryMover** debe asociarse con una task operation **KeepSequenceSymmetry** concreta mediante la opción *sequence_symmetry_behaviour*.

Ten en cuenta que el mover usa un sistema de caché para almacenar las regiones enlazadas una vez aplicado el mover. Por tanto, si se añaden o eliminan residuos antes del empaquetado, puede producirse un comportamiento no deseado.
Se recomienda aplicar **SetupForSequenceSymmetryMover** inmediatamente antes de un paso de empaquetado.

### Sintaxis
```xml
<SetupForSequenceSymmetryMover name="(&string;)" sequence_symmetry_behaviour="(&string;)" >
  <SequenceSymmetry residue_selectors="(&string)" />
  ...
</SetupForSequenceSymmetryMover>
```
* **sequence_symmetry_behaviour**: nombre de una task operation KeepSequenceSymmetry definida previamente

Subetiqueta **SequenceSymmetry**: un conjunto de ResidueSelectors que definen una región de la proteína con simetría de secuencia
* **residue_selectors**: lista separada por comas de ResidueSelectors definidos previamente.

### Ejemplo
Supón que tienes una proteína de 7 cadenas: 2 dímeros y un trímero, y quieres imponer simetría de secuencia en cada dímero y en el trímero simultáneamente:
```xml
<RESIDUE_SELECTORS>
   Dimer 1 (each monomer is comprised of a single 40 amino acid chain)
  <Index name="dimer1_a" resnums="1-40" />
  <Chain name="dimer1_b" chain="2" />

   Dimer 2
  <Chain name="dimer2_a" chain="3" />
  <Chain name="dimer2_b" chain="4" />
  
   Trimer
  <Chain name="trimer_a" chain="5" />
  <Chain name="trimer_b" chain="6" />
  <Chain name="trimer_c" chain="7" />
</RESIDUE_SELECTORS>
<TASKOPERATIONS>

  <KeepSequenceSymmetry name="keep_seq_sym" setting="true" />

</TASKOPERATIONS>
<MOVERS>

   Will link the chains for each dimer and trimer seperately
  <SetupForSequenceSymmetryMover name="setup_seq_sym" sequence_symmetry_behaviour="keep_seq_sym" >
    <SequenceSymmetry residue_selectors="dimer1_a,dimer1_b" />
    <SequenceSymmetry residue_selectors="dimer2_a,dimer2_b" />
    <SequenceSymmetry residue_selectors="trimer_a,trimer_b,trimer_c" />
  </SetupForSequenceSymmetryMover>

  <PackRotamersMover name="pack" task_operations="keep_seq_sym" />

</MOVERS>
<PROTOCOLS>
  <Add mover_name="setup_seq_sym" />
  <Add mover_name="pack" />
</PROTOCOLS>

```

### Información para desarrolladores

Introducido en el PR 4260, actualizado en el PR 5168.

## Véase también
* [[FavorSymmetricSequence]]
* [[SymDofMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]


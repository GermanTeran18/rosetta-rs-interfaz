# MutateResidue
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## MutateResidue
Actualizado por Parisa Hosseinzadeh (parisah@uw.edu) el 30 de noviembre de 2016.
Actualizado por Vikram K. Mulligan (vmullig@flatironinstitute.org) el 21 de agosto de 2020.

Cambia un solo residuo o un subconjunto de residuos a un tipo distinto. Por ejemplo, muta Arg31 a Asp o muta todas las Pro a Ala.

```xml
<MutateResidue name="(&string)" target="(&string)" new_res="(&string)" preserve_atom_coords="(false &bool)" mutate_self="(false &bool)" update_polymer_bond_dependent="(false &bool)" />
```

o

```xml
<MutateResidue name="(&string)" residue_selector="(&string)" new_res="(&string)" preserve_atom_coords="(false &bool)" mutate_self="(false &bool)" />
```

-   target: la ubicación que se va a mutar. Puede ser un número PDB (<i>p. ej.</i> ```31A```), un índice de Rosetta (<i>p. ej.</i> ```177```) o un índice en un Pose de referencia o en una instantánea almacenada en algún punto del protocolo anterior a que la numeración de residuos cambiara de alguna forma (<i>p. ej.</i> ```refpose(snapshot1,23)```). Consulta la convención sobre índices de residuos en la documentación de **[[RosettaScripts Conventions]]** para más detalles.
- residue_selector: define el subconjunto de residuos que se van a mutar. Consulta la sección **[[ResidueSelectors]]** para más información.
-   new\_res: el nombre del residuo que se va a introducir. Esta cadena debe corresponder a la función ResidueType::name() (p. ej., ASP). *Obligatorio*
-   preserve\_atom\_coords: si es true, los átomos del nuevo residuo cuyos nombres coincidan con los de átomos del residuo antiguo se colocarán en las coordenadas de los átomos del residuo antiguo, y los demás átomos se reconstruirán a partir de coordenadas ideales. Si es false, solo los átomos pesados de la cadena principal se colocan según los átomos pesados de la cadena principal del átomo antiguo; la cadena lateral se construye a partir de coordenadas ideales y después sus valores de torsión se fijan a los de la cadena lateral del residuo antiguo. False si no se especifica.
-   mutate\_self: si es true, mutará el residuo seleccionado a sí mismo, sin importar el valor de new\_res (aunque new\_res sigue siendo obligatorio). Es útil para «limpiar» residuos cuando hay incompatibilidades de residuos de Rosetta (como los residuos terminales) con movers y filtros.
-   update_polymer_bond_dependent: si es true, actualizará las coordenadas de los átomos que dependen de los enlaces poliméricos (como el oxígeno carbonilo, el protón amida o el grupo metilo en los aminoácidos N-metilados). False por defecto (las coordenadas de los átomos se conservan, si es posible, a través de la mutación).
-   break_disulfide_bonds: true por defecto, lo que significa que si una posición mutada participa en un puente disulfuro, tanto ella como su pareja unida por el puente disulfuro se reducirán antes de introducir la mutación. Se desaconseja encarecidamente ponerlo en false, ya que puede dejar disulfuros «colgantes» en los que la pareja cree estar conectada a un residuo que ya no está, lo que provoca un fallo al puntuar.

*NOTA:* puedes usar la opción target o la opción residue_selector, pero no ambas.

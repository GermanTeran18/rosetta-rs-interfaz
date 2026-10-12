# KeepSequenceSymmetry
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]]. Página actualizada por última vez el 25 de enero de 2021.*
## KeepSequenceSymmetry

Esta función se creó para cumplir el mismo propósito que link residues, pero con la esperanza de que sea más fácil de usar. 
Debe combinarse con el [[SetupForSequenceSymmetryMover]] correspondiente para tener algún efecto.

Cuando se usa, el packer obligará a que todas las regiones enlazadas definidas en el **SetupForSequenceSymmetryMover** correspondiente tengan secuencias idénticas.

**NOTA**: si no hay tipos de residuo en común entre los residuos enlazados, el annealer terminará, porque no puede asignar ningún tipo de residuo válido a esas posiciones.

### Sintaxis

```xml
<KeepSequenceSymmetry name="(&string)" setting="true(&bool)"/>
```
* **setting**: Si es verdadero, Rosetta activará el SequenceSymmetricAnnealer. Úsalo cuando quieras diseñar regiones idénticas pero no quieras o no puedas imponer simetría física.

### Lógica de enlace de residuos

La lógica de enlace de la TaskOperation se basa en ResidueSelectors predefinidos, especificados en subtags SequenceSymmetry de un [[SetupForSequenceSymmetryMover]] asociado.
Más concretamente, usa listas, ordenadas por los ID de residuo de Rosetta, de los residuos que define cada selector y enlaza cada entrada correspondiente.
Por tanto, todos los ResidueSelectors definidos en un subtag deben definir el mismo número de residuos.
Además, si algún residuo se define en varios subtags, se usará la unión de todos los enlaces definidos; más abajo hay un ejemplo.
Los residuos que no se definan en ningún tag SequenceSymmetry se tratarán de forma normal.

### Ejemplo

Considera el escenario descrito por el XML siguiente:

```xml
<RESIDUE_SELECTORS>
  <Index name="index1" resnums="1,2,3,4,5" />
  <Index name="index2" resnums="11,15,14,12,13" />

  <Index name="index3" resnums="3-8" />
  <Index name="index4" resnums="20-25" />
</RESIDUE_SELECTORS>
<TASKOPERATIONS>
  <KeepSequenceSymmetry name="keep_seq_sym" setting="true" />
</TASKOPERATIONS>
<MOVERS>
  <SetupForSequenceSymmetryMover name="setup_seq_sym" sequence_symmetry_behaviour="keep_seq_sym" >
    <SequenceSymmetry residue_selectors="index1,index2" />
    <SequenceSymmetry residue_selectors="index3,index4" />
  </SetupForSequenceSymmetryMover>
</MOVERS>
```

Si se recorre cada definición de SequenceSymmetry en orden, se enlazan los residuos 1-5 y 11-15.
En concreto, el residuo 1 se enlazará con el 11, el 2 con el 12, ... y el 5 con el 15, ya que el orden especificado en el ResidueSelector Index se ignora y prevalece la numeración de Rosetta.
A continuación se enlazan los residuos 3-8 y 20-25.
Sin embargo, como los residuos 3-5 también están definidos en el subtag anterior, se usa la unión de todos los enlaces.

Por tanto, los enlaces finales son los siguientes (donde <-> denota un enlace):
- 1 <-> 10
- 2 <-> 11
- 3 <-> 12 <-> 20
- 4 <-> 13 <-> 21
- 5 <-> 14 <-> 22
- 6 <-> 23
- 7 <-> 24
- 7 <-> 25

### Información para desarrolladores

Al activar esta TaskOperation se construirá el SequenceSymmetricAnnealer.
Introducida en el PR 4260, actualizada en el PR 5168. 

##Véase también
* [[FavorSymmetricSequence]]
* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

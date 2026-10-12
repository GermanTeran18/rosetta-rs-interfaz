# StoreResidueSubset
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## StoreResidueSubset

Crea un subconjunto de residuos aplicando el selector de residuos especificado por el usuario al Pose actual y guarda el subconjunto en los datos cacheables del Pose, lo que permite acceder al subconjunto (sin cambios) más adelante en el protocolo. Debe usarse junto con el selector de residuos StoredResidueSubset.

[[include:mover_StoreResidueSubset_type]]


    <StoreResidueSubset name="(&string)" subset_name="(&string)" residue_selector="(&string)" overwrite="(0 &bool)" />

-   subset\_name: el nombre con el que se guardará el subconjunto de residuos en los datos cacheables del Pose. Debe ser idéntico al subset\_name usado para recuperar la tarea con la task operation StoredResidueSubset.
-   residue\_selector: el selector de residuos que se usa para crear el subconjunto de residuos almacenado
-   overwrite: si es true, sobrescribirá un subconjunto existente con el mismo subset\_name, si existe. Si es false, Rosetta terminará con un error si el subconjunto existente se sobrescribe.

**Ejemplo**

    <RESIDUE_SELECTORS>
      <!-- Creates a subset consisting of whatever is currently chain B -->
      <Chain name="chainb" chains="B" />

      <!-- Retrieves the residue subset created by the "StoreResidueSubset" mover -->
      <StoredResidueSubset name="get_original_chain_b" subset_name="original_chain_b" />
    </RESIDUE_SELECTORS>
    <MOVERS>
      <!-- stores a subset consisting of whatever is in chain B when this mover is called -->
      <StoreResidueSubset name="store_subset" residue_selector="chainb" subset_name="original_chain_b" />
    </MOVERS>

##Véase también

* [[StoreTaskMover]]
* [[StoreCompoundTaskMover]]
* [[Task operations en RosettaScripts|TaskOperations-RosettaScripts]]
* [[TaskAwareCstsMover]]
* [[TaskAwareMinMOver]]
* [[TaskAwareSymMinMover]]


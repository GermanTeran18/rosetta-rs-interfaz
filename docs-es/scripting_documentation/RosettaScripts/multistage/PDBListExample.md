#MultistageRosettaScripts

#Ejemplo de PDBList

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

- Escrito por Jack Maguire; envía tus preguntas a jackmaguire1444@gmail.com
- Toda la información de aquí es válida a fecha del 21 de febrero de 2018

La primera etiqueta Job envía varias estructuras de entrada,
una por cada nombre de archivo del pdblist.
La segunda etiqueta Job envía una sola estructura de entrada.

```xml
<JobDefinitionFile>
  <Job>
    <Input>
      <PDB listfile="my_pdblist"/>
    </Input>

    (Optional datamap info)
  </Job>

  <Job>
    <Input>
      <PDB filename="some_other_pose.pdb"/>
    </Input>

    (Optional datamap info)
  </Job>

  <Common>
     (...)
  </Common>

</JobDefinitionFile>
```

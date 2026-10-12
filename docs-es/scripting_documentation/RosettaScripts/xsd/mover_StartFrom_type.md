<!-- ESTE ES UN ARCHIVO GENERADO AUTOMÁTICAMENTE: no lo edites directamente; cambia la definición del esquema en el propio código. -->

_Documentación de sintaxis de etiquetas generada automáticamente:_

---
Mueve una cadena (normalmente un ligando) a una coordenada especificada. Por defecto, el centroide de la cadena especificada (la posición media de todos los átomos/residuos) se centra en la coordenada dada

Referencias e información de autoría del mover StartFrom:

Cita(s) de StartFrom (Mover):
Lemmon G, and Meiler J.  (2012).  Rosetta Ligand docking with flexible XML protocols.  Methods Mol Biol 819:143-55.  doi: 10.1007/978-1-61779-465-0_10.

```xml
<StartFrom name="(&string;)" chain="(&string;)" use_nbr="(false &bool;)" >
    <Coordinates x="(&real;)" y="(&real;)" z="(&real;)" pdb_tag="(default &string;)" />
    <File struct_identifier="(&string;)" filename="(&string;)" />
    <PDB filename="(&string;)" atom_name="(&string;)" pdb_tag="(default &string;)" />
</StartFrom>
```

-   **chain**: (OBLIGATORIO) ID de la cadena
-   **use_nbr**: Coloca el átomo vecino (el átomo que se superpone durante el reempaquetado de conformeros) en la posición indicada


Subetiqueta **Coordinates**:   

-   **x**: (OBLIGATORIO) coordenada x de la coordenada inicial deseada.
-   **y**: (OBLIGATORIO) coordenada y de la coordenada inicial deseada.
-   **z**: (OBLIGATORIO) coordenada z de la coordenada inicial deseada.
-   **pdb_tag**: Etiqueta de trabajo (job-tag) de un pdb.

Subetiqueta **File**:   

-   **struct_identifier**: pdb_tag, file_name o hash
-   **filename**: (OBLIGATORIO) Nombre del archivo en formato SON que contiene las posiciones iniciales

Subetiqueta **PDB**:   

-   **filename**: (OBLIGATORIO) Nombre del archivo pdb
-   **atom_name**: Usa solo las posiciones de los átomos que coincidan con ese nombre de átomo.
-   **pdb_tag**: XRW POR HACER

---

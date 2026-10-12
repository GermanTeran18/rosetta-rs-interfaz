# Representación de la membrana: el residuo MEM (RosettaMP)

[[_TOC_]]

## Descripción

En RosettaMP, la posición y la orientación de la membrana se representan con un residuo especial de tipo MEM, que normalmente se encuentra al final de la secuencia del Pose. Almacena el punto central de la membrana, el vector normal de la membrana y el grosor. El valor del grosor almacenado en MEM es la mitad del grosor «real» de la membrana, ya que actualmente la membrana se considera simétrica alrededor de z = 0, que es el centro de la membrana. 

[[rosettamp_membrane_rep.png]]

El MembraneResidue se imprime automáticamente en el PDB como el residuo MEM en un registro HETATOM. Esto permite visualizar fácilmente la membrana en Pymol. El vector normal se almacena como un «átomo» y tiene longitud unitaria. Ten en cuenta que la normal es un vector en el sistema de coordenadas, pero se almacena como un punto en el archivo PDB. Para facilitar la visualización, la normal se puede escalar al grosor con la opción `-mp:output:normalize_to_thk`

```
HETATM 1323 THKN MEM C  81       1.000   0.000   0.000  1.00  0.00           X  
HETATM 1324 CNTR MEM C  81      -1.425  -1.441   0.354  1.00  0.00           X  
HETATM 1325 NORM MEM C  81       0.065  -0.249   0.966  1.00  0.00           X  
```

En el ejemplo anterior, el vector normal está cerca de la dirección de la coordenada z positiva, aunque el vector normal exacto habría que calcularlo como («punto» normal menos punto central). 

El grosor se almacena en el eje x porque un Stub de residuo (es decir, un sistema de coordenadas) solo puede crearse a partir de tres átomos que no sean coplanares. Para fines de visualización el átomo del grosor no es realmente necesario, pero el valor de grosor que usó el marco de membrana para crear ese decoy se almacena (y por tanto se puede consultar fácilmente) como el átomo THKN en el archivo PDB.

Las coordenadas del MembraneResidue se actualizan automáticamente durante una simulación. Un MembraneResidue existente de un protocolo ejecutado previamente se puede leer para un nuevo protocolo con la opción `-mp::setup::membrane_rsd <membrane residue number>`.

El MembraneResidue está conectado al Pose mediante un jump en el FoldTree, anclado en el primer residuo de la proteína, pero se escribe en el archivo PDB como el último residuo tras la proteína (registro HETATOM de MEM). Según dónde esté la raíz del FoldTree, la membrana o la proteína es flexible o fija: (1) si el MembraneResidue está en la raíz del FoldTree, permanece fijo mientras la proteína se mueve con flexibilidad en este sistema de coordenadas. (2) Si uno de los residuos de la proteína está en la raíz del FoldTree, el MembraneResidue (y por tanto la membrana) se mueve con flexibilidad en el sistema de coordenadas del Pose.


## Opciones

El residuo de membrana (líneas HETATM de MEM en el PDB) es detectado automáticamente por el AddMembraneMover. Si por cualquier motivo (ya que los protocolos aún están en desarrollo) hay más de un residuo, el usuario puede indicar qué residuo debe considerarse con la opción

`-mp::setup::membrane_rsd <membrane residue number>` para leer el residuo MEM. 


## Referencias

Alford RF, Koehler Leman J, Weitzner BD, Duran A, Tiley DC, Gray JJ (2015). An integrated framework advancing membrane protein modeling and design. PLoS Comput. Biol. - In Press


## Contacto

- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- IP responsable: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))


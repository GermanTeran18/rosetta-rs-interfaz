GlycanInfo
==========


Metadatos
========
Aplicación creada por el Dr. Jared-Adolf-Bryfogle (jadolfbr@gmail.com); laboratorio del Dr. William Schief (schief@scripps.edu), en colaboración con el Dr. Sebastian Raemisch (raemisch@scripps.edu) y el Dr. Jason W. Labonte (JWLabonte@JHU.edu); laboratorio del Dr. Jeff Gray (jgray@jhu.edu) 

Referencia
=========
**Growing Glycans in Rosetta: Accurate de novo glycan modeling, density fitting, and rational sequon design**
Jared Adolf-Bryfogle, J. W Labonte, J. C Kraft, M. Shapavolov, S. Raemisch, T. Lutteke, F. Dimaio, C. D Bahl, J. Pallesen, N. P King, J. J Gray, D. W Kulp, W. R Schief
_bioRxiv_ 2021.09.27.462000; [[https://doi.org/10.1101/2021.09.27.462000]]

Descripción
===========
La aplicación imprime información de cada árbol de glicano, incluida la numeración de Rosetta, la numeración PDB, la numeración interna del glicano y las conexiones de cada residuo del árbol.  Es muy útil cuando se trabaja con más de un árbol de glicano o cuando hay que trabajar con componentes concretos del glicano.

Uso
===

Ejemplo de línea de comandos:
```
glycan_clash_check.default.macosclangrelease -include_sugars \
-s pose_with_glycan.pdb 
```

NOTA: No reproduce ningún archivo PDB e imprime la información en pantalla.

Opciones
=======

 - grupo: ```carbohydrates:GlycanInfo```

    ```
    Opt: -res_info 
        Type: StringVector 
        Desc: Only output info for a specific residue or 
              residues (or full glycan roots).  
              Either rosetta resnum or PDBNumChain 
              as in Rosetta Scripts (133A).
        Ex: -res_info 133A 140B 150C
    ```



## Véase también
* [[WorkingWithGlycans]]

### Componentes de RosettaScripts
* [[GlycanTreeModeler]] - modela árboles de glicanos usando información conocida sobre carbohidratos.  Sirve tanto para el modelado de novo completo como para el refinamiento.
* [[SimpleGlycosylateMover]] - glicosila Poses con árboles de glicanos.  
* [[GlycanResidueSelector]] - selecciona residuos concretos de cada árbol de glicano de interés.

### Otros
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comandos de ejemplo para ejecutar los archivos ejecutables de Rosetta

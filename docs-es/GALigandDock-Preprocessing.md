## Descripción general
Esta página explica cómo preprocesar tus entradas para preparar ejecuciones de GALigandDock. Ten en cuenta que muchas de las etapas actuales de preprocesamiento requieren ejecutar programas externos, ya que GALigandDock sigue siendo una aplicación nueva y no se ha hecho mucho esfuerzo por mejorar su interfaz de usuario. En el futuro, muchas de las etapas de preprocesamiento que se enumeran a continuación se simplificarán o se unificarán en un script propio, para que los usuarios puedan preparar fácilmente las ejecuciones de docking.

### 1. Crear un archivo mol2 adecuado
Prepara un archivo mol2 "adecuado" a partir de una cadena SMILES o de un archivo mol2.
(consulta más abajo NOTES:HOW-TO-MAKE-PROPER-MOL2 si no estás seguro del tuyo)

### 2. Asignación de cargas parciales
Añade cargas parciales AM1-BCC a tu archivo mol2. Puedes omitir esta etapa si vas a 
calcular las cargas parciales con mol2genparams.py en la etapa 3 de abajo, aunque todavía es inestable y por ahora recomendamos usar los programas externos que se enumeran a continuación.

#### Con UCSF chimera
- abre UCSF chimera (descárgalo si no lo tienes; es gratuito para uso académico)
- tools -> Add Charges -> cambia "other residues" a "AM1-BCC" -> clic en OK -> asigna la carga neta (Net charge) correcta -> OK

#### Con Antechamber de AMBERTOOLS
- Si tienes AMBERTOOLS instalado, ejecuta:
$AMBERHOME/bin/antechamber -i [input.mol2] -fi mol2 -o [output.mol2] -fo mol2 -c bcc -nc [netcharge] 

### 3. Crear un archivo params de Rosetta con tipos de átomo genéricos

$ROSETTA/source/scripts/python/public/generic_potential/mol2genparams.py -s [your.mol2]

Las salidas esperadas son:
- [your].params y
- [your]_0001.pdb; un archivo pdb del ligando con las coordenadas copiadas del archivo mol2 de entrada.

```html
Usage: python mol2genparams.py [-s mol2file or -l mol2filelist] [options]

Options:
  -h, --help            show this help message and exit
  -s INPUTS, --inputs=INPUTS
  -l L                  
  --nm=RESNAME, --resname=RESNAME
                        Residue name
  --auto_nm=AUTO_RESPREFIX
                        Automatically rename resname starting with argument;
                        default L[00-99]
  --am1bcc              Calculate am1bcc charge (currently am1 part only; bcc will be added soon)
  --prefix=PREFIX       Prefix of output names
                        (prefix.params,prefix_0001.pdb), default as the prefix
                        of input mol2 file
  --debug               Report verbose output for debugging
  --no_output           Do not report params or pdb
  --funcgrp             Report functional group assignment to stdout
  --elec_cp_rep         Report elec-countpair info to [prefix].elec_cp_ref
  --elec_grpdef         Report elec-grp-definition info to [prefix].grpref
  --puckering_chi       Define ring puckering torsions as rotatable CHI
  --amide_chi           Define amide as rotatable CHI
  --freeze_ringring     Define  as rotatable CHI
```

**Notas:**

* Para ejecutar el script se necesitan numpy y scipy instalados.
* La opción --am1bcc requiere tener instalado numba. Se puede instalar fácilmente con Anaconda.

### 4. Crear un archivo de entrada "holo.pdb"
- Traslada las coordenadas del archivo pdb de tu ligando generado en la etapa 3 para que su centro de masa quede en una posición adecuada dentro del bolsillo. Recomendamos __encarecidamente__ ejecutar esta aplicación __cuando conozcas (al menos de forma aproximada) la ubicación del bolsillo__. Si no la conoces, puedes obtener un "holo.pdb" ejecutando el servidor PatchDock (https://bioinfo3d.cs.tau.ac.il/PatchDock/); sigue las instrucciones que allí se indican.
- Asegúrate de que el contenido de tu ligando de interés esté al final de holo.pdb; es decir, las líneas HETATM de cualquier cofactor, metal o molécula de agua deben estar por encima de él.

### NOTAS
#### No es necesario generar confórmeros
¡Omite la generación de confórmeros! Ya no la necesitas. Basta cualquier conformación como entrada, y la herramienta de docking se encargará del resto del muestreo de confórmeros, incluso más allá de lo que podrían generar las herramientas típicas de generación de confórmeros.

#### CÓMO CREAR UN ARCHIVO MOL2 ADECUADO
**1. Si tu entrada está en formato pdb o mol2**
Requiere instalar [OpenBabel](http://openbabel.org/). Si está en formato pdb, primero separa la parte del ligando de tu archivo pdb como "ligand.pdb" y luego ejecuta:
```
obabel -i pdb ligand.pdb -o mol2 -O ligand.mol2 
```

Para añadir los hidrógenos que falten a partir del formato mol2 (se recomienda de todos modos una inspección visual cuidadosa después):
```
obabel -i mol2 ligand.mol2 -o mol2 -O ligandH.mol2 -p [pH of your interest; usually 7.0]
```

**2. Si tu entrada es una cadena SMILES**
Hay varias formas de convertir SMILES a un archivo mol2; también puedes usar Openbabel. Recomendamos la versión de demostración en línea de Corina:
https://www.mn-am.com/online_demos/corina_demo

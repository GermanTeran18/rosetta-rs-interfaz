## Metadatos

El Rosetta Membrane Framework fue desarrollado por Julia Koehler Leman y Rebecca Alford en el laboratorio Gray de JHU. 
Última actualización: 12/12/14. 

Para preguntas, contacta a: 
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Investigador principal correspondiente: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Descripción

Un archivo lips describe la lipofilicidad (es decir, la preferencia por el entorno lipídico) de un residuo en una hélice. Esta información se puede usar para orientar las hélices en la membrana y distinguir los residuos orientados hacia los lípidos de los orientados hacia la proteína. La implementación de Rosetta usa por detrás el servidor LIPS de Adamian y Liang. Pronto habrá actualizaciones. 

### Generar un archivo .lips4.

BRD4.lips4 - archivo de predicción de lipofilicidad creado con el script run\_lips.pl como se indica a continuación (ten en cuenta que se necesitan blastpgp y la base de datos nr para ejecutar el script run\_lips.pl

```
run_lips.pl <fasta file> <span file> <path to blastpgp> <path to nr database> <path to alignblast.pl script>
```

Comando de ejemplo:

```
<path to mini>/mini/src/apps/public/membrane_abinitio/run_lips.pl BRD4.fasta BRD4.span /work/bjornw/Apps/blast/bin/blastpgp /scratch/shared/genomes/nr ~bjornw/mini/src/apps/public/membrane_abinitio/alignblast.pl
```

Archivo lips4 de ejemplo:

```
Lipid exposed data: resnum mean-lipo lipophil entropy
      6  -1.000   3.004   1.211
      9  -1.000   2.268   2.137
     10  -1.000   4.862   1.095
     13  -1.000   1.304   1.552
     16  -1.000   3.328   2.025
  ...
```

## Código y documentación

`core/conformation/membrane` contiene la clase LipidAccInfo, que almacena la información del archivo lips. 

## Opciones

`-mp:setup:lipsfile 1afo.lips4`

NOTA: la opción del RosettaMembrane original es `-in:file:lipofile 1afo.lips4`, pero esta opción quedará obsoleta. ¡Usa la opción nueva!

## Ejemplo

Se puede encontrar un ejemplo de cómo el RosettaMembrane original usaba los archivos lips en `Rosetta/main/tests/integration/tests/membrane_abinitio`. Esta funcionalidad aún no se ha probado en el membrane framework.

## Referencias

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Tilley D, Elazar A, Gray JJ. (2015) An integrated framework enabling computational modeling and design of Membrane Proteins. PlosOne - in preparation 

## Referencias del RosettaMembrane original

* Yarov-Yarovoy V, Schonbrun J, Baker D. (2006 Mar 1) Multipass membrane protein structure prediction using Rosetta. Proteins. 62(4):1010-25.
* Barth P, Schonbrun J, Baker D. (2007 Oct 2) Toward high-resolution prediction and design of transmembrane helical protein structures. Proc Natl Acad Sci U S A. 104(40):15682-7.
* Barth P, Wallner B, Baker D. (2009 Feb 3) Prediction of membrane protein structures with complex topologies using limited constraints. Proc Natl Acad Sci U S A. 106(5):1409-14.

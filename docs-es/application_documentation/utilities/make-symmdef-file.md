#Script de creación de archivos de definición de simetría.

*Última edición el 31 de mayo de 2010 por Frank DiMaio. Código de Frank DiMaio e Ingemar Andre.*

Código y demostración
=============

Todo el código está contenido en el script de Perl src/apps/public/symmetry/make_symmdef_file.pl.

Propósito de la aplicación
===========================================

Este script crea automáticamente archivos de definición de simetría correspondientes a la simetría de algún PDB de plantilla. Si la plantilla no es simétrica, el script la "simetriza".

Limitaciones
===========

Esta rutina no crea archivos de definición de simetría para el modelado simétrico ab initio con fold\_and\_dock. En su lugar, usa [[make_symmdef_file_denovo|make-symmdef-file-denovo]].

Si el PDB de entrada es muy asimétrico, el PDB de salida puede quedar muy lejos del de entrada. Por lo general esto no es deseable; quizá convenga modelar ese sistema de forma asimétrica.

Actualmente el script no admite los siguientes tipos de simetría:

-   El script no entiende las simetrías helicoidales polares (un grupo puntual D *n* en cada traslación helicoidal)
-   Se pueden generar simetrías puntuales tetraédricas, octaédricas e icosaédricas, pero las variaciones asimétricas del archivo de entrada no se "simetrizarán" (como sí ocurre con C *n* y D *n* )
-   El script no crea simetría 2D (de papel pintado). En el modo HELIX se puede generar un número limitado de simetrías 2D (consulta la opción experimental -c).
-   El script no dispone de simetrías 3D generales. El modo CRYST supone un tamaño de celda unidad fijo; el script no crea sistemas en los que el tamaño de la celda unidad pueda cambiar.

Modos
=====

Actualmente el script reconoce tres tipos de simetría distintos: simetrías no cristalográficas (puntuales), simetría cristalográfica y simetría helicoidal. Una cuarta opción (experimental), la "pseudosimetría", modela un sistema no simétrico usando la maquinaria de simetría para intentar reducir el espacio conformacional (y el tiempo de ejecución) de la búsqueda, a costa de algo de precisión.

Opciones
=======

Estas opciones son comunes a todos los modos de simetría:

```
    -m (NCS|CRYST|HELIX|PSEUDO) : [default NCS] which symmetric mode to run
            NCS: generate noncrystallographic (point) symmetries from multiple chains in a PDB file
            CRYST: generate crystallographic symmetry (fixed unit cell) from the CRYST1 line in a PDB file
            HELIX: generate helical/fiber symmetry from multiple chains in a PDB file
            PSEUDO: (EXPERIMENTAL) generate pseudo-symmetric system
    -p <string> : Input PDB file (one of -b or -p _must_ be given)
    -r <real>   : [default 10.0] the max CA-CA distance between two interacting chains
    -f          : [default false] enable fast distance checking (recommended for large systems)
```

Estas opciones son comunes a los modos de simetría no cristalográfica (NCS):

```
    -a <char>   : [default A] the chain ID of the main chain
    -i <char>   : [default B] the chain IDs of one chain in each symmetric subcomplex
```

Estas opciones son específicas de los modos de simetría cristalográfica (CRYST):

```
    -c <real>x6 : override the unit cell parameters in the PDB with these values
    -s <string> : override the spacegroup in the PDB with these values
    -k <real>   : (EXPERIMENTAL) Approximate the protein as a ball of this radius (only if no '-p'!)
```

Estas opciones son específicas de los modos de simetría helicoidal (HELIX):

```
    -a <char>   : [default A] the chain ID of the main chain
    -b <char>   : [default B] the chain ID of the next chain along the fiber/helix
    -i <char>   : the chain ID of a chain in -a's point symmetry group
    -t <real>   : [default 2] the number of helical turns to generate along the -b direction
    -c <char>   : (EXPERIMENTAL) the chain ID of the symm chain perpendicular to the -b chain (simple 2D symmetry)
    -u <real>   : (EXPERIMENTAL) [default 1] the number of repeats to generate along the -c direction
```

Estas opciones son específicas del modo de pseudosimetría (experimental) (PSEUDO):

```
    -a <char>   : [default A] the chain ID of the main chain
```

Salidas esperadas
================

**Modo NCS**

Un ejemplo de comando (para generar simetría D3, con las cadenas A, B y C formando un grupo puntual y las cadenas D, E y F formando un segundo grupo puntual):

```
make_symmdef_file.pl -m NCS -p D3.pdb -a A -i B E -r 12 > D3.symm
```

Se generan varios archivos:

-   **D3.symm** – el archivo de definición de simetría que se envía a Rosetta
-   D3\_symm.pdb – la versión simetrizada del archivo de entrada, que muestra el grupo de simetría puntual completo.
-   D3\_model\_ABE.pdb – igual que el anterior, pero mostrando solo las cadenas que forman una interfaz con la cadena A (donde la interfaz se define como una distancia Ca-Ca menor de 12 (-r 12) A)
-   D3\_INPUT.pdb – el PDB de entrada para el modelado de simetría de Rosetta. Una única cadena del complejo simétrico.
-   D3.kin – una imagen KineMage que muestra la conectividad de las subunidades en Rosetta

**Modo CRYST**

Ejemplo de comando (usando la línea CRYST1 del archivo PDB):

```
make_symmdef_file.pl -m CRYST -p p65.pdb > p65.symm
```

Se generan varios archivos:

-   **p65.symm** – el archivo de definición de simetría que se envía a Rosetta
-   p65\_symm.pdb – la versión simetrizada del archivo de entrada, que muestra la estructura de entrada y todos los contactos cristalinos.

En este caso, el PDB de entrada (para Rosetta) es simplemente 'p65.pdb', el archivo de entrada que se pasó al script.

**Modo HELIX**

Ejemplo de comando (con las cadenas A, C, E, ... recorriendo el eje helicoidal y las cadenas B, D, F, ... formando simetrías C2 a lo largo del eje):

```
make_symmdef_file.pl -m HELIX -p fiber.pdb -a A -b C -i B -r 12 -t 5 > fiber.symm
```

Se generan varios archivos:

-   **fiber.symm** – el archivo de definición de simetría que se envía a Rosetta
-   fiber\_symm.pdb – la versión simetrizada del archivo de entrada, que muestra todas las vueltas '-t' de la hélice
-   fiber\_model\_ACB.pdb – igual que el anterior, pero mostrando solo las cadenas que forman una interfaz con la cadena A (donde la interfaz se define como una distancia Ca-Ca menor de 12 (-r 12) A)
-   fiber\_INPUT.pdb – el PDB de entrada para el modelado de simetría de Rosetta. Una única cadena del complejo simétrico.

Se generan 5 vueltas de la hélice en total (-t 5).

Como alternativa, se puede forzar un giro helicoidal añadiendo : *n* a la cadena helicoidal. Por ejemplo, el comando:

```
make_symmdef_file.pl -m HELIX -p fiber2.pdb -a A -b B:3 > fiber2.symm
```

fuerza a la hélice a tener 3 subunidades por vuelta.

Consejos
====

¡Asegúrate de que el sistema de \*\_symm.pdb tenga buen aspecto antes de enviar un trabajo de refinamiento simétrico!

## Véase también

* [[Tipos de archivos de entrada | file-types-list]] que se usan en Rosetta.
* [[Symmetry]]: sobre el modo de simetría
* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.

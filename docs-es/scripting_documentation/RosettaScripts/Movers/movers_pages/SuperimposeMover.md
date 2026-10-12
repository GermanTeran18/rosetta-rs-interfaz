# Superimpose
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## Superimpose

Superpone el Pose actual sobre un Pose del disco. Es útil para volver a un sistema de coordenadas común después de, p. ej., movimientos de torsión.

```xml
<Superimpose name="(&string)" ref_start="(1 &Integer)" ref_end="(0 &Integer)" target_start="(1 &Integer)" target_end="(0 &Integer)" ref_pose="(see below &string)" CA_only="(1 &integer)"/> 
```
-   CA\_only: superpone solo CA o los átomos de la cadena principal (N,C,CA,O). Por defecto True.
-   ref\_start, target\_start: inicio del segmento que se alinea. Solo acepta numeración de Rosetta.
-   ref\_end, target\_end: final del segmento que se alinea. Si es 0, por defecto es el número de residuos del Pose.
-   ref\_pose: el nombre del archivo de la estructura de referencia con la que se alinea. Si no se especifica ningún Pose, por defecto es la opción de línea de comandos -in:file:native.
-   Requiere que todos los archivos PDB tengan el mismo id de cadena. En ``bash``, el comando ``sed`` puede usarse para alterar rápidamente todos los ID de cadena: ``$ sed -i 's/ B / A /'`` cambia todas las cadenas B a cadenas A y sobrescribe el archivo PDB original. Quita ``-i`` y redirige a un nuevo archivo PDB si no quieres sobrescribir.  


##Véase también

* [[I want to do x]]: guía para elegir un mover
* [[AlignChainMover]]
* [[ExtractSubposeMover]]

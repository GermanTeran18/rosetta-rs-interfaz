# RestrictNativeResidues
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## RestrictNativeResidues

Restringe o impide el reempaquetado de los residuos nativos. Acepta un Pose nativo (Pose de referencia) desde la línea de comandos (mediante in:file:native) o mediante el tag pdbname. Recorre todos los residuos y compara el aminoácido actual de cada posición con el aminoácido de la misma posición en el Pose de referencia. Si la identidad es la misma, se impide que el residuo se reempaquete (si la opción prevent\_repacking es verdadera) o se restringe al reempaquetado. Para invertir el comportamiento hacia los residuos no nativos, usa la opción 'invert'.

     <RestrictNativeResidues name="(&string)" prevent_repacking="(0 &bool)" verbose="(0 &bool)" pdbname="('' &string)" invert="(0 &bool)" />

Ejemplo: permite el diseño solo en posiciones no nativas (impide el reempaquetado de todos los residuos nativos).

     <RestrictNativeResidues name="non_native" prevent_repacking="1" verbose="1" pdbname="input/native.pdb" />

Lista de opciones

-   prevent\_repacking ( por defecto = 0 ) : Opcional. Si es verdadera, se impide que los residuos nativos se reempaqueten.
-   verbose ( por defecto = 0 ) : Opcional. Si es verdadera, escribirá en la salida estándar una cadena de selección de PyMOL con todos los residuos no nativos.
-   pdbname ( por defecto = "" ) : Opcional. Nombre del PDB de referencia que se usará como estructura «nativa». Alternativamente, se puede especificar con la opción in:file:native.
- invert ( por defecto = false ) : Opcional. Invierte el comportamiento para restringir solo los residuos no nativos.


##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

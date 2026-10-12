# SymDofMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*

[[include:mover_SymDofMover_type]]

## SymDofMover

Se usa para configurar sistemas simétricos en los que las estructuras de entrada están alineadas a lo largo del eje x, y o z. 
Toda la funcionalidad, salvo el muestreo en rejilla, puede manejar cualquier número de estructuras de entrada distintas para sistemas simétricos multicomponente (el muestreo en rejilla puede manejar 1 o 2). 
Las subunidades de entrada se giran primero, opcionalmente, 180 grados alrededor de los ejes especificados (x, y o z) para «invertir» las entradas si se desea; luego se trasladan a lo largo de los ejes especificados (x, y o z) según los valores que el usuario indique en la opción radial\_disps y se rotan alrededor de los ejes especificados según el valor que el usuario indique en la opción angles; y por último, si el usuario especifica ejes para la opción align\_input\_axes\_to\_symdof\_axes, entonces para cada subunidad de entrada el eje especificado por el usuario (x, y o z) se alinea con el eje correcto que corresponde al sym\_dof\_name en el archivo de definición de simetría. 
Tras estas manipulaciones iniciales de las estructuras de entrada, se genera un Pose simétrico usando el archivo de definición de simetría especificado por el usuario. 
Si se quiere muestrear alrededor de los radial\_disps y angles definidos por el usuario, esto puede hacerse mediante muestreo en rejilla no aleatorio, muestreo aleatorio de una distribución gaussiana dentro de un rango definido por el usuario o muestreo aleatorio de una distribución uniforme dentro de un rango definido por el usuario. 
Cada método de muestreo se rige por nstruct. 
Si se desea el muestreo en rejilla, el usuario debe especificar radial\_disps\_range\_min, radial\_disps\_range\_max, angles\_range\_min y angle\_range\_max para definir el rango dentro del cual se muestrea alrededor de la configuración acoplada, y los tamaños de bin con los que muestrear estos desplazamientos y ángulos, que se fijan con las opciones radial\_disp\_steps y angle\_steps. 
Si se desea el muestreo uniforme, el usuario debe especificar radial\_disps\_range\_min, radial\_disps\_range\_max, angles\_range\_min y angle\_range\_max. 
Si se desea el muestreo gaussiano, el usuario debe especificar radial\_disp\_deltas y angle\_deltas (un número aleatorio derivado de una distribución gaussiana entre -1 y 1 se multiplicará por estos valores de paso y se sumará a los radial\_disps o angles iniciales). 
Si la opción auto\_range se pone en true, el mover interpretará los rangos fijados por el usuario para el muestreo en rejilla o uniforme de modo que los valores negativos acerquen las estructuras al origen y los valores positivos las alejen del origen (esto es útil si tienes una mezcla de estructuras con desplazamientos iniciales negativos o positivos, para poder usar un xml o un run\_script genérico para todas ellas).

-   symm\_file: archivo de definición de simetría.
-   sym\_dof\_names: nombres de los sym\_dofs del archivo de definición de simetría a lo largo de los cuales se quiere mover o rotar la entrada. NOTA: en sistemas multicomponente, el orden de los desplazamientos, ángulos, rangos y pasos debe corresponder con el orden de sym\_dof\_names. Se pasa como una cadena con una lista separada por comas (p. ej., sym\_dof\_names="JTP1,JDP1")
-   flip\_input\_about\_axes: gira las subunidades 180 grados alrededor de los ejes especificados antes de aplicar traslaciones, rotaciones, alineamiento y simetría; es decir, «invierte» el componente antes de manipularlo más.
-   translation\_axes: ejes (x, y o z) a lo largo de los cuales se traslada cada subunidad antes de aplicar la simetría.
-   rotation\_axes: ejes (x, y o x) alrededor de los cuales se rota cada subunidad antes de aplicar la simetría.
-   align\_input\_axes\_to\_symdof\_axes: si se especifica, alineará el eje especificado de cada subunidad con el eje correspondiente del jump symdof del archivo de definición de simetría.
-   auto\_range: booleano para fijar la manera en que se interpretan los rangos definidos por el usuario para los desplazamientos radiales. Si es true, los valores negativos del desplazamiento mínimo o máximo se interpretan como un acercamiento de la estructura al origen y los positivos como un alejamiento del origen.
-   sampling\_mode: qué modo se usa para muestrear alrededor de la configuración inicial, si se desea. "grid", "uniform" o "gaussian"
-   radial\_disps: desplazamiento(s) inicial(es) con los que se traslada(n) la(s) estructura(s) de entrada a lo largo del eje especificado por el usuario. Se pasa como una cadena con una lista separada por comas (p. ej., radial\_disps="-65.4,109.2")
-   angles: ángulo(s) inicial(es) con los que se rota(n) la(s) estructura(s) de entrada alrededor del eje especificado por el usuario. Se pasa como una lista separada por comas (p. ej., angles="-65.4,109.2")
-   radial\_disps\_range\_min: para usar con muestreo en rejilla o uniforme. Distancia(s) mínima(s) en Å con la(s) que se modifican los radial\_disps iniciales. Se pasa como una cadena con una lista separada por comas (p. ej., radial\_disps\_range\_min="-1,-1".
-   radial\_disps\_range\_max: para usar con muestreo en rejilla o uniforme. Distancia(s) máxima(s) en Å con la(s) que se modifican los radial\_disps iniciales. Se pasa como una cadena con una lista separada por comas (p. ej., radial\_disps\_range\_max="1,1".
-   angles\_range\_min: para usar con muestreo en rejilla o uniforme. Ángulo(s) mínimo(s) en grados con el(los) que se rota la estructura alrededor del(de los) ángulo(s) inicial(es) proporcionado(s) por el usuario. Se pasa como una cadena con una lista separada por comas (p. ej., angles\_range\_min="-1,-1".
-   angles\_range\_max: para usar con muestreo en rejilla o uniforme. Ángulo(s) máximo(s) en grados con el(los) que se rota la estructura alrededor del(de los) ángulo(s) inicial(es) proporcionado(s) por el usuario. Se pasa como una cadena con una lista separada por comas (p. ej., angles\_range\_max="1,1".
-   radial\_disp\_steps: para usar con muestreo en rejilla. Fija el(los) tamaño(s) de bin con el(los) que se muestrea dentro del(de los) rango(s) definido(s) por el usuario. Se pasa como una cadena con una lista separada por comas (p. ej., radial\_disps\_steps="0.5,0.5".
-   angle\_steps: para usar con muestreo en rejilla. Fija el(los) tamaño(s) de bin con el(los) que se muestrea dentro del(de los) rango(s) definido(s) por el usuario. Se pasa como una cadena con una lista separada por comas (p. ej., angle\_steps="0.5,0.5".
-   radial\_disp\_deltas: para usar con muestreo gaussiano. El rango dentro del cual se muestrea hacia dentro y hacia fuera alrededor del(de los) desplazamiento(s) inicial(es) especificado(s) por el usuario. Se pasa como una cadena con una lista separada por comas (p. ej., radial\_disp\_deltas="0.5,0.5".
-   angle\_deltas: para usar con muestreo gaussiano. El rango dentro del cual se muestrea alrededor del(de los) ángulo(s) inicial(es) especificado(s) por el usuario. Se pasa como una cadena con una lista separada por comas (p. ej., angle\_deltas="0.5,0.5".
-   radial\_offsets: puede usarse en cualquier modo de muestreo. Los valores de desfase (offset) se suman a los radial\_disps correspondientes antes de realizar el muestreo en rejilla, uniforme o gaussiano. Funciona con auto\_range. Por ejemplo, si se quiere separar 2 Å ambos symdofs de una estructura dada, se puede pasar radial\_offsets="2,2" y auto\_range=true. Entonces, independientemente del signo de los radial disps, las subunidades se desplazarán 2 Å más lejos del origen (suponiendo que las subunidades de entrada empiezan en el origen).
-   set\_sampler: para usar con el filtro GetRBDOFValues. Si se pone en false, los valores RBDOF no se actualizarán cuando los valores de DOF informados no se vean afectados por SymDofMoverSampler. Por defecto es true.


##Véase también

* [[Symmetry]]: uso de simetría en Rosetta
* [[SetupForSymmetryMover]]
* [[SetupNCSMover]]
* [[DetectSymmetryMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]
* [[SymmetryAndRosettaScripts]]


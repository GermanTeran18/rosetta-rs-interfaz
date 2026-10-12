# ExtractSubpose
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## ExtractSubpose

(Este es un Mover de desarrollo y no está disponible en las versiones publicadas.)

<!--- BEGIN_INTERNAL -->
Se usa para extraer un subconjunto de las subunidades de una Pose simétrica según los contactos con un componente especificado por el usuario (mediante sym\_dof\_name(s)). Esta subPose se guarda como un pdb con el prefijo y el sufijo especificados por el usuario y el nombre base derivado del distribuidor de trabajos. NO MODIFICA LA POSE. Para cada sym\_dof\_name que pase el usuario, se extraen todas las subunidades vecinas (evaluadas por contactos CA o CB con el contact\_distance especificado por el usuario; 10.0 A por defecto). Si extras=true, se extraerá el bloque de construcción completo de cada sym\_dof junto con todos los bloques de construcción que lo tocan.

    <ExtractSubpose name="(&string)" sym_dof_names="(&string)" prefix="('' &string)" suffix="('' &string)" contact_dist="(10.0 &Real)" extras="(0 &bool)" />

-   sym\_dof\_names - nombre(s) de los sym\_dofs correspondientes a los componentes primarios que se extraerán junto con las subunidades/bloques de construcción vecinos. Se pasa como una cadena (opcionalmente, con una lista separada por comas).
-   prefix - prefijo opcional del nombre del pdb de salida.
-   suffix - sufijo opcional del nombre del pdb de salida.
-   contact\_dist - distancia CA o CB máxima entre cualquier residuo del/de los componente(s) primario(s) y cualquier residuo de otro componente para que este se considere un "vecino" y se añada a la subPose extraída.
-   extras - opción booleana que establece si se extraen bloques de construcción completos en lugar de solo subunidades.

<!--- END_INTERNAL --> 

##Véase también

* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]
* [[CutOutDomainMover]]
* [[SymmetryAndRosettaScripts]]
* [[Symmetry]]: uso de la simetría en Rosetta
* [[SetupForSymmetryMover]]
* [[SetupNCSMover]]
* [[DetectSymmetryMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[MakeBundleMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]

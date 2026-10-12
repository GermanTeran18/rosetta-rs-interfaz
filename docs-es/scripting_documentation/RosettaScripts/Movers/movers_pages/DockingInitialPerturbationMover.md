# DockingInitialPerturbation
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Docking Initial Perturbation

Este mover realiza la fase de perturbación inicial del algoritmo RosettaDock.
Contiene las funciones que crean las posiciones iniciales para el docking.
Puedes aleatorizar el compañero 1 o el compañero 2, hacer girar el compañero 2
o realizar una perturbación sencilla.

```xml
<DockingInitialPerturbation randomize1="(bool)" randomize2="(bool)" use_ellipsoidal_randomization="(bool)" dock_pert="(bool,"false")" trans="(real)" rot="(real)" uniform_trans="(real)" spin="(bool)" center_at_interface="(bool)" slide="(bool)" name="(string)"/>
```

|   Opción                      | Descripción |
| ----------------------------- | ----------- |
| randomize1                    | Aleatoriza el primer compañero de docking  |
| randomize2                    | Aleatoriza el segundo compañero de docking |
| use_ellipsoidal_randomization | Usa EllipsoidalRandomizationMover en lugar de RigidBodyRandomizeMover |
| dock_pert                     | Lee las perturbaciones de traslación y rotación y las aplica a la Pose (el valor predeterminado es false) |
| trans                         | Perturbación de traslación que se aplica antes del docking (requiere dock_pert="true") |
| rot                           | Perturbación de rotación que se aplica antes del docking (requiere dock_pert="true") |
| uniform_trans                 | Usa UniformSphereTransMover |
| spin                          | Hace girar el compañero sobre su eje |
| center_at_interface           | Centra el giro en la interfaz |
| slide                         | Desliza los compañeros de docking hasta que entren en contacto |

##Véase también

* [Tutorial de docking proteína-proteína](https://www.rosettacommons.org/demos/latest/tutorials/Protein-Protein-Docking/Protein-Protein-Docking)
* [[DockingMover]]
* [[DockWithHotspotMover]]
* [[FlexPepDockMover]]
* [[HighResDockerMover]]
* [[Docking applications]]: aplicaciones de línea de comandos para docking
* [[I want to do x]]: elegir un mover

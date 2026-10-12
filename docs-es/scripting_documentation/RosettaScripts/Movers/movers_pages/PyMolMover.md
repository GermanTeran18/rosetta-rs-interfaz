# PyMolMover
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PyMOLMover

PyMOLMover enviará un Pose a una instancia del software de visualización molecular PyMol que se esté ejecutando en el host local. Cada llamada al mover sobrescribe el objeto en PyMol. No tiene tantas funciones como la versión integrada en PyRosetta, pero es muy útil para visualizar el flujo de un protocolo o generar fotogramas para una película de un protocolo.

```xml
<PyMOLMover name="&string" keep_history="(0 &bool)" />
```
- keep\_history: cada llamada al mover guarda el Pose en un nuevo estado/fotograma de un objeto en PyMol en lugar de sobrescribirlo. Después, los fotogramas pueden reproducirse como una película para visualizar el flujo de un protocolo.

El siguiente ejemplo enviaría el Pose a PyMol antes y después del empaquetado y guardaría la estructura en 2 estados/fotogramas del mismo objeto.
```xml
  <MOVERS>
    <PyMOLMover name="pmm" keep_history="1"/>
    <PackRotamersMover name="pack"/>
  </MOVERS>

  <PROTOCOLS>
    <Add mover_name="pmm"/>
    <Add mover_name="pack"/>
    <Add mover_name="pmm"/>
  </PROTOCOLS>
```

**Requisitos previos**

Para que PyMol escuche nuevos Poses, debes ejecutar el siguiente script desde dentro de PyMol, sustituyendo *$PATH_TO_ROSETTA* por la ruta de tu instalación de Rosetta.
```sh
run $PATH_TO_ROSETTA/Rosetta/main/source/src/python/PyRosetta/src/PyMOL-RosettaServer.py
```


##Véase también

* [[PyMOL]]: más información sobre la interfaz de Rosetta con PyMOL
* [[Sitio web de PyMOL (externo)|http://www.pymol.org]]
* [[Graphics and GUIs]]: página principal de las interfaces gráficas con Rosetta
* [[Extending the PyMol Viewer]]: cómo añadir nuevas funciones al PyMOL Mover de Rosetta

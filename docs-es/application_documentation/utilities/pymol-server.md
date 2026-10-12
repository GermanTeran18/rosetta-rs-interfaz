#Cómo usar el servidor PyMOL-Rosetta

Metadatos
========

Autor: Steven Lewis (smlewi@gmail.com)

Este documento fue escrito originalmente el 4 de enero de 2012 por Steven Lewis y se actualizó por última vez el 4 de enero de 2012 por Steven Lewis.

NOTA: no escribí ninguna parte de este servidor. Insiste al laboratorio de Gray para que complete este documento.

Propósito de la aplicación
===========================================

El laboratorio de Jeff Gray escribió una herramienta fantástica que te permite ver trayectorias de Rosetta en directo en PyMOL. Es como el visor gráfico, pero todavía mejor.

Cómo usarlo
=============

1. Abre PyMOL 
2. Ejecuta /path/to/rosetta/src/python/bindings/PyMOLPyRosettaServer.py 
3. Inicia una ejecución de Rosetta con la opción -show\_simulation\_in\_pymol X, donde X es el número de segundos que pasan entre actualizaciones de PyMOL. 5 es el valor por defecto; los valores bajos pueden sobrecargar tu ordenador.

## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de las aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.

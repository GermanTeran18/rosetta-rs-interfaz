# Resumen del marco RosettaMembrane

## Información para desarrolladores

### Autores y desarrolladores
- Rebecca Faye Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))

### Metadatos
- Investigador principal correspondiente: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

Última modificación: 8/6/2013

## Acerca de
Rosetta está diseñado en gran parte para usarse con proteínas en solución. Sin embargo, a medida que crece el número de estructuras únicas de proteínas de membrana en el PDB, hay una gran necesidad de nuevos métodos computacionales para modelar y refinar proteínas en membranas. El **RosettaMembrane Framework** proporciona un conjunto de herramientas generalizado para modelar proteínas de membrana en Rosetta. El marco implementa una representación central de una proteína de membrana en las capas de conformación, cinemática y energía. Se puede acceder fácilmente a estas representaciones en el nivel de protocolos a través de la interfaz de movers. 

El marco de membrana está implementado en C++, pero también es compatible con el Resource Manager, PyRosetta y las interfaces de RosettaScripts.

Esta es la página de inicio de la documentación del marco de membrana (y de cualquier aplicación derivada, por ahora). No dudes en escribir a los autores indicados arriba con cualquier pregunta. 

## Código fuente principal 
El código principal del marco de membrana se encuentra en `core/conformation/membrane` y `protocols/membrane.` Todo el código tiene los conjuntos correspondientes de pruebas unitarias y de integración. 

Para usar el marco de membrana en tus protocolos, incluye el `AddmembraneMover` al principio de tu código. A continuación se muestran la sintaxis y un código de ejemplo: 

```
#include <protocols/membrane/AddMembraneMover.hh> 

using namespace protocols::membrane;

AddMembraneMoverOP add_memb = new AddMembraneMover(); 
add_memb->apply( pose ); 

```

## Demos
¡Las demos llegarán pronto! Estarán en el repositorio RosettaCommons/demos, en protocol_capture/2014

## Subpáginas
A continuación puedes encontrar más información sobre el marco de membrana: 

- [[RosettaMembrane: Using the Membrane Framework]]
- [[RosettaMembrane: Configuring Required Inputs]]
- [[RosettaMembrane Low Resolution Energy Function]]
- [[RosettaMembrane High Resolution Energy Function]]
- [[RosettaMembrane: Scripts and Tools]]
- [[RosettaMembrane: How it Works]]

## Código heredado
Se puede acceder a las implementaciones anteriores de proteínas de membrana en Rosetta indicando los pesos de membrana en la línea de comandos con -score::weights membrane_highres.wts junto con las opciones ab initio de membrana (véase el manual de Rosetta 3.5)

## Referencias
* Barth P, Wallner B, Baker D. (2009 Feb 3) Prediciton of membrane protein structures with complex topologies using limited constraints. Proc Natl Acad Sci U S A. 106(5):1409-14.
* Barth P, Schonbrun J, Baker D. (2007 Oct 2) Toward high-resolution prediction and design of transmembrane helical protein structures. Proc Natl Acad Sci U S A. 104(40):15682-7.
* Yarov-Yarovoy V, Schonbrun J, Baker D. (2006 Mar 1) Multipass membrane protein structure prediction using Rosetta. Proteins. 62(4):1010-25.

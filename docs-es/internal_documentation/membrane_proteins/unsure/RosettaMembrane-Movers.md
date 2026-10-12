## Pendiente

- agregar los Movers de las aplicaciones

## Metadatos

El Rosetta Membrane Framework fue desarrollado por Julia Koehler Leman y Rebecca Alford en el laboratorio Gray de JHU. 
Última actualización: 01/22/15. 

Para preguntas, contacta a: 
- Julia Koehler Leman ([julia.koehler1982@gmail.com](julia.koehler1982@gmail.com))
- Rebecca Alford ([rfalford12@gmail.com](rfalford12@gmail.com))
- Investigador principal correspondiente: Jeffrey J. Gray ([jgray@jhu.edu](jgray@jhu.edu))

## Descripción

En el Membrane Framework hay disponibles varios Movers. Ten en cuenta que:
- El **AddMembraneMover** SE NECESITA ejecutar para crear un Pose de membrana a partir de un Pose normal. Instancia el objeto MembraneInfo y el MembraneResidue.
- **Todos los demás Movers (salvo que se indique otra cosa) son sensibles a qué partes se mueven durante un protocolo**, ya sea la membrana o la proteína. Usar el Mover equivocado producirá una salida incorrecta. 

## Código y documentación

`protocols/membrane` contiene la mayoría de los movers sencillos, salvo quizá algunos específicos que dependen de otros protocolos (como el mover MPDocking, por ejemplo).

## Referencias

* Alford RF, Koehler Leman J, Weitzner BD, Duran AM, Tilley DC, Elazar A, Gray JJ. (2015) An integrated framework enabling computational modeling and design of Membrane Proteins. PlosOne - in preparation 

***

## Movers específicos de membrana

### AddMembraneMover

El Mover que invoca el MP_Framework e instancia un Pose de membrana es el AddMembraneMover. Este mover es necesario para el modelado de proteínas de membrana en Rosetta y debe llamarse primero. El AddMembraneMover agrega el residuo de membrana al Pose, configura un FoldTree por defecto e inicializa el objeto MembraneInfo. La configuración correcta de la raíz del FoldTree, ya sea para una membrana fija y una proteína móvil o para una membrana móvil y una proteína fija, es responsabilidad del desarrollador del protocolo.

|**Opción**|**Descripción**|
|:-------|:--------------|
|`-membrane_new::setup::spanfiles <spanfile>` | AddMembraneMover solo usa el primer spanfile. No es obligatorio si se da una estructura que se transforma a coordenadas de membrana: en ese caso usa la opción spans_from_structure.|
|`-membrane_new::setup::spans_from_structure <bool>` | Si no se da un spanfile, el usuario tiene la opción de crear un objeto SpanningTopology a partir de la estructura dada. La estructura debe estar transformada a coordenadas de membrana. Con esta opción se escribe un spanfile: out.span |
|`-membrane_new::setup::lipsfile <lipsfile>` | opcional; la funcionalidad no se ha probado actualmente para el nuevo marco.|
|`-membrane_new::setup::membrane_rsd <residue number for MEM residue>` | opcional; lee el residuo MEM de un PDB del marco generado previamente. Si no se indica, Rosetta lo busca de todos modos y lo usa si lo encuentra.|
|`-membrane_new::setup::center <three real numbers defining the center point>` | opcional; el usuario puede proporcionar la coordenada del centro de la membrana que desee.|
|`-membrane_new::setup::normal <three real numbers defining the normal vector>` | opcional; el usuario puede proporcionar el vector normal de la membrana que desee.|

### FlipMover

Este Mover voltea un Pose o parte del Pose en la membrana y solo se ha probado con una membrana fija y una proteína móvil. Los argumentos posibles son el número de salto (jump) por el cual voltear al compañero situado aguas abajo, el eje de volteo y el ángulo de rotación. Para el constructor por defecto estos valores son el salto de la membrana, un ángulo de 180 grados y el eje x como eje de rotación.  

### MembranePositionFromTopologyMover

Este Mover solo se aplica a una proteína fija y una membrana móvil (es decir, uno de los residuos de la proteína está en la raíz del FoldTree). Usa el conocimiento de los spans transmembrana (almacenados en el objeto SpanningTopology) y las coordenadas Cα para calcular los centros y las normales de cada span transmembrana (es decir, objetos EmbeddingDef), calcula un promedio y establece el centro y la normal de la membrana en esos valores. Cabe señalar que este mover no optimiza continuamente el centro y la normal de la membrana mediante un esquema de minimización, sino que proporciona una primera estimación que se puede refinar después (por ejemplo, usando membrane relax o el MembraneRelaxMover).

### RandomMembranePositionMover

Hace perturbaciones aleatorias en el centro y la normal del MembraneResidue. ¡Solo funciona con una proteína fija y una membrana móvil!

### SetMembranePositionMover

Este Mover solo se aplica a una proteína fija y una membrana móvil (es decir, uno de los residuos de la proteína está en la raíz del FoldTree). Usa el conocimiento de los spans transmembrana (almacenados en el objeto SpanningTopology) y las coordenadas Cα para calcular los centros y las normales de cada span transmembrana (es decir, objetos EmbeddingDef), calcula un promedio y establece el centro y la normal de la membrana en esos valores. Cabe señalar que este mover no optimiza continuamente el centro y la normal de la membrana mediante un esquema de minimización, sino que proporciona una primera estimación que se puede refinar después (por ejemplo, usando membrane relax o el MembraneRelaxMover).

### TransformIntoMembraneMover

Este Mover solo se aplica a una membrana fija y una proteína móvil. De manera similar al MembranePositionFromTopologyMover, usa los spans transmembrana y las coordenadas Cα para calcular el embebido de la proteína completa a partir de las coordenadas de los spans transmembrana. Luego este Mover transforma la proteína a las coordenadas de membrana por defecto (centro en [0, 0, 0] y normal en [0, 0, 15]) o a las proporcionadas por el usuario, de modo que los centros y las normales del EmbeddingDef global y de la membrana coincidan. 

### TranslationRotationMover

Esta clase contiene tres movers: TranslationMover, RotationMover y TranslationRotationMover, todos los cuales solo se probaron con una membrana fija y una proteína móvil. 

El TranslationMover traslada un elemento del Pose según el vector de traslación y un número de salto opcional. El salto por defecto es el salto de la membrana.

El RotationMover rota un elemento del Pose según el vector normal anterior, el nuevo vector normal (es decir, el deseado), el centro de rotación y un número de salto opcional. El salto por defecto también es el salto de la membrana.

El TranslationRotationMover rota y traslada un elemento del Pose según el centro y la normal anteriores, el nuevo centro y la nueva normal (es decir, los deseados) y un número de salto opcional. Esto es útil para mover un elemento del Pose basándose en la comparación entre el centro y la normal de la membrana y su embebido calculado a partir del elemento del Pose. 

## Aplicaciones como Movers

### MPrelaxMover

Por implementar

### MP_ddGMover

Por implementar

### MPDockingSetupMover


### MPDockingMover


### MPSymDockMover

# Documentación interna

[[_TOC_]]

##Introducción


Esta es la página principal de la parte «interna» de la wiki de documentación de Rosetta.
Ofrece acceso cómodo a páginas de documentación que están pensadas principalmente para la comunidad de RosettaCommons, pero que se pueden publicar.
Normalmente son cosas de importancia sobre todo histórica, minucias de desarrollo o documentación en curso que aún no está lista para el consumo general.

La documentación de naturaleza «solo interna» debe colocarse en la wiki interna de RosettaCommons protegida con contraseña (MediaWiki).

Consulta [[cómo escribir documentación|how-to-write-documentation]] para más detalles.


## Sistema de compilación de Rosetta 

- [[Scons Overview and Specifics]]
- [[Cmake Overview and Specifics]]
- [[Building Rosetta on the Argonne "Mira" Blue Gene supercomputer]]

## Modificaciones de clases del núcleo

Si cambias la API de una clase del núcleo (en particular si *eliminas*, *renombras* o *alteras* una función existente), anótalo aquí para que sea fácil comunicarlo a la comunidad de desarrollo y a la comunidad de PyRosetta, y para la futura documentación en las notas de la versión.  Ten en cuenta que esto se aplica a cualquier cambio de API en core.5 o inferior (numeric, basic, _etc._).  Esos cambios deben evitarse si es posible, pero si un cambio así es inevitable, haz lo siguiente:

1.  Envía un correo a la lista de desarrolladores.  Los desarrolladores necesitan saberlo y debe haber una conversación.  No sigas adelante con el cambio sin la aprobación de la comunidad.
2.  Si se aprueba el cambio, asegúrate de que el laboratorio Gray lo sepa.  Los tutoriales de PyRosetta tendrán que cambiar.
3.  Si es posible, conserva una función antigua con la interfaz antigua, con una advertencia del tracer de que esa función quedará obsoleta y de que debe usarse la función nueva en su lugar.
4.  Documenta el cambio aquí, para incluirlo después en las notas de la versión:

| Fecha | Autor | Descripción | Motivo |
| ---- | ------ | ----------- | ------ |
| 31 Aug 2016 | Andy Watkins | [Ejemplo]: core::pose::Pose::n_residue() se renombró a core::pose::Pose::size(). | Una oportunidad para risa maníaca. |

## Cambios en la API de PyRosetta
1. Desde r59466, xyzMatrix tiene propiedades .xy enlazadas como 'data' en lugar de funciones set/get. Por lo tanto, si tu código accedía directamente a estos métodos, tendrás que refactorizarlo como m.xx( m.xy() ) --> m.xx = m.xy


## Documentación para escribir código en Rosetta

### Resumen
#### RosettaAcademy
 - [[RosettaAcademy (o «Rosetta para novatos»)|RosettaAcademy]] - Una guía introductoria para nuevos usuarios y desarrolladores de RosettaCommons.

#### Generación de plantillas de código
- [[Generación de plantillas de código | code_templates ]] - Cómo usar los scripts generadores de plantillas para generar plantillas de código de clases, aplicaciones y pruebas unitarias comunes de Rosetta y ahorrar tiempo de desarrollo

#### Comprobación antes de hacer commit
- [[Comprobación antes de hacer commit|Before commit check]] - Cosas que comprobar antes del envío.

#### Guía de revisión de código
- [[Plantilla para revisores|ReviewerTemplate]] - Una plantilla para los revisores de la documentación de aplicaciones.

#### Plantilla de documentación
- [[App name]] - Plantilla para la documentación de aplicaciones de Rosetta.
- [[Template app documentation page]] - Plantilla alternativa de documentación de aplicaciones.

### [[Writing a New SimpleMetric]]
 - Crear un SimpleMetric en lugar de un Filter, o para análisis general

### [[Objetos globales y singletons en Rosetta | internal_documentation/singletons]]
 - Crear singletons que sean seguros para hilos. Andrew


## Documentación de métodos de Rosetta

### [[Computing SASA in Rosetta]]
 - Método para calcular el SASA en Rosetta, escrito por Jared

### Chemical XRW 2016 ##
#### - [[Resumen del código de E/S de archivos | FileIOOverview ]]
#### - [[Cambios hechos después del XRW | PostChemicalXRWChanges ]]

### JD3: versión 3 del sistema JobDistributor ###
- TODO

## Optimización de la función de energía ##
### Grupo de Seattle 
[[Overview of Seattle Group energy function optimization project]]
[[Updates beta july15]]
[[Updates beta nov15]]




## Documentación de proyectos específicos

### Actualización de ResidueTypeSet para manejar todo el repertorio químico de las macromoléculas
- [[ Overview of ResidueTypeSet ]]
- [[ ResidueTypeFinder ]] es una clase nueva para encontrar de forma eficiente ResidueTypes de un ResidueTypeSet en la mayoría (¿todas?) de las consultas.

### Modelado de proteínas de membrana con RosettaMP

#### Movers y métodos en desarrollo
- [[ Movers | RosettaMP-Internal-Movers ]]
- [[ Métodos | RosettaMP-Internal-Methods ]]

#### Funciones de puntuación

#### Aplicaciones
- Docking: 
    - [[ Docking global en la membrana | RosettaMP-Internal-MPFindInterface ]]
- Relax: 
    - [[ Mutate Relax | RosettaMP-Internal-MPMutateRelax ]]
    - [[ Quick Relax | RosettaMP-Internal-MPQuickRelax ]]
- De novo:
    - [[ Hélice a partir de la secuencia | RosettaMP-Internal-HelixFromSequence ]]
- Otras:
    - [[ Mutate | RosettaMP-Internal-Mutate]]

#### Proyecto de perfiles químicos de membrana
  
 - [[ Organización de la base de datos | RosettaMP-Internal-Chemical-DB ]]
 - [[ Representación de la membrana | RosettaMP-Internal-Chemical-Rep ]]
 - [[ Movers para benchmarking | RosettaMP-Internal-Chemical-Movers ]]
 - [[ Aplicaciones piloto | RosettaMP-Internal-Chemical-Apps ]]


### Términos de puntuación específicos de diseño ###
- [[Energía de tramos repetidos (aa_repeat_energy)|Repeat-stretch-energy]] -- Un término de puntuación que penaliza los tramos largos de secuencia repetida (*p. ej.*, secuencias poli-Q).
- [[Energía de composición de residuos (aa_composition)|AACompositionEnergy]] -- Un término de puntuación que penaliza la desviación respecto de una composición deseada de tipos de residuo (p. ej., no más de un 7% de alaninas; al menos un aromático; al menos un 40% de hidrofóbicos).

### Proyecto de péptidos cíclicos y polímeros con restricciones geométricas
- [[Predicción de estructuras de péptidos con la aplicación simple_cycpep_predict|internal_documentation/simple_cycpep_predict_app]]
- [[Workflow]]
- [[PeptideStubMover]]
- [[DeclareBond]]
- [[SetTorsion]] -- actualizado con nueva funcionalidad; falta escribir la documentación

### Proyecto de ensamblaje stepwise y Monte Carlo
- La [[documentación general de la aplicación|stepwise]] se puede consultar públicamente.
- [[Resumen|stepwise-classes-overview]] de la enumeración stepwise y de Monte Carlo, a las que se accede mediante la aplicación `stepwise`
- [[Movimientos de Monte Carlo|stepwise-classes-moves]] y el calendario de movimientos 
- [[SampleAndScreen|stepwise-sample-and-screen]] es una clase general para enumerar o muestrear estocásticamente residuos (o cuerpos rígidos) 
- Los [[Samplers|stepwise-samplers]] se concatenan para definir el bucle de muestreo y pueden recorrer millones de Poses.
- Los [[Screeners|stepwise-screeners]] son filtros con algunas funciones especializadas para «avanzar rápido» por el bucle de muestreo y evitar efectos de memoria en el Pose. 
- [[FullModelInfo|stepwise-fullmodelinfo]] es un objeto importante de contabilidad que mantiene el Pose y que se usa en todo el código de stepwise. 
- Los [[términos de puntuación|stepwise-score]] calculan energías para un modelo completo aunque solo se instancien subpartes (other_pose, loop_close, free_side_chain).

### Renovación del ensamblaje de fragmentos de ARN (FARNA) y unificación con stepwise
- [[FARNA|farna-refactor]] es el código original de Rosetta para el modelado de novo de ARN (que se remonta a Rosetta++). Está recibiendo algunas actualizaciones en 2015-2016.


### Protocolo S.E.W.I.N.G.
- [[SEWING]]
 * [[Model Generation]] 
 * [[Model comparison with geometric hashing]] 
 * [[Assembly of models]] 
- [[Sidechain Design aided by Sewing]]
- [[SEWING Dictionary]]

## Aplicaciones piloto

Esta es la documentación de aplicaciones que aún no se han publicado

### General 

- [[multi-residue-ligand-dock]] - Docking de varios residuos de ligando

- [[hotspot-hash]] - Documentación de Hotspot hashing
    * [[hshash-utils]] - Utilidades para Hotspot hashing

- [[multistate-design-ga]] - Diseño multiestado de interfaces de ADN  

- [[RosettaPCS]] - Plegamiento de proteínas con restricciones de RMN de desplazamiento por pseudocontacto


# Rosetta (no) en GPU
[[internal_documentation/Rosetta-GPU-conversation-transcription]]

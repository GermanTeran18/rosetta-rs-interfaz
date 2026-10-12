# Scripts de relax en la base de datos

*Volver a la página de [[FastRelax|FastRelaxMover]].*

*Volver a la página de [[FastDesign|FastDesignMover]].*

## Scripts disponibles

| Nombre del script | Descripción |
| ----------- | ----------- |
| default     | Actualmente es un alias de MonomerRelax2019 o de MonomerDesign2019 (si estás diseñando) |
| legacy      | El script de relax por defecto usado hasta el 13 de agosto de 2019 |
| no_cst_ramping | |
| rosettacon2018 | **(obsoleto)** Término repulsivo ligeramente más fuerte en las primeras rondas. Este script se creó para que la gente experimentara con él, pero desde entonces se ha optimizado (véase más abajo). Envía tus preguntas a jack@med.unc.edu |
| MonomerRelax2019 | De la misma familia que rosettacon2018, optimizado para ejecuciones de relax sin interfaz |
| MonomerDesign2019 | De la misma familia que rosettacon2018, optimizado para ejecuciones de diseño sin interfaz |
| InterfaceRelax2019 | De la misma familia que rosettacon2018, optimizado para ejecuciones de relax de interfaz |
| InterfaceDesign2019 | De la misma familia que rosettacon2018, optimizado para ejecuciones de diseño de interfaz |
| KillA2019 | Similar a MonomerDesign2019 (que funciona bien como script válido para todo) pero incorpora una rampa de valores de referencia para asegurar que los diseños tengan distribuciones de aminoácidos similares a las nativas |

Todos los scripts están en `main/database/sampling/relax_scripts`

## Ejemplos

```xml
<FastRelax name="example1" relaxscript="default"/>

<FastDesign name="example2" relaxscript="KillA2019"/>
```

##Véase también
* [[FastRelaxMover]]
* [[FastDesignMover]]
* [[Relax]]: la aplicación relax
* [[Preparing structures]]: página sobre cómo preparar estructuras para usarlas en Rosetta mediante relax.
* [[I want to do x]]: guía para elegir un mover

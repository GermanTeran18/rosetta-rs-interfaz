    <PreProline name="prepro" use_statistical_potential="(&bool)" residue_selector="(&residue selector)" />

El espacio helicoidal (ABEGO de tipo A) está muy desfavorecido antes de una prolina, y la energía de Rosetta puede no captar este efecto.

En el modo por defecto, el filtro simplemente comprueba el ABEGO de todos los residuos anteriores a las prolinas y cuenta los residuos que tienen tipos de abego distintos de B y de E (menor = mejor). Con la opción "use_statistical_potential", el filtro usa un ajuste con spline bicúbico a los datos adjuntos para estimar la favorabilidad de un residuo pre-prolina con los ángulos phi/psi dados; esta favorabilidad se devuelve entonces como puntuación del filtro (menor = mejor).

**Opciones**
* residue_selector - Si se da un selector de residuos, el filtro comprobará el residuo anterior a todas las prolinas de la selección (por defecto = todas las prolinas)
* use_statistical_potential - Si es true, se usará el ajuste con spline bicúbico al potencial estadístico del espacio de Ramachandran para evaluar las torsiones. Si es false, se contarán los residuos que están en intervalos de torsión potencialmente malos. (por defecto = false)

**Ejemplo**

    <PreProline name="prepro" use_statistical_potential="0" />

##Véase también

* [[SecondaryStructureFilter]]
* [[FoldabilityFilter]]
* [[BluePrintBDRMover]]
* [[Definición de ABEGO|Glossary#abego]]




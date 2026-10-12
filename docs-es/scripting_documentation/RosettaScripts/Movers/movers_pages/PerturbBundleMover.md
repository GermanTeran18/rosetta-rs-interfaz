# PerturbBundle
Documentación de Vikram K. Mulligan (vmullig@uw.edu). Última actualización: 12 de octubre de 2018.

[[_TOC_]]

*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## PerturbBundle

Este mover opera sobre un Pose generado con los movers [[MakeBundle|MakeBundleMover]] o [[BundleGridSampler]]. Perturba (<i>es decir</i>, suma un pequeño valor aleatorio a) uno o más parámetros de Crick y luego altera la conformación de la cadena principal para reflejar los parámetros de Crick alterados. Es útil para búsquedas iterativas de Monte Carlo en el espacio de parámetros de Crick. El mover también puede fijar directamente el valor absoluto de un parámetro (_es decir_, sin perturbación aleatoria)

##Uso

[[include:mover_PerturbBundle_type]]

Las opciones por defecto para todas las hélices se fijan en la etiqueta **PerturbBundle**. Con la opción **default_perturbation_type** se puede fijar un tipo de perturbador por defecto para todas las perturbaciones; los valores aceptados actualmente son "gaussian" y "uniform". Se pueden anular parámetro por parámetro con opciones **perturbation_type** individuales. Las magnitudes de perturbación por defecto se fijan con opciones que terminan en **\_perturbation**. Si se omite una opción, ese parámetro de Crick no se perturba. También se pueden anular hélice por hélice añadiendo subetiquetas **Helix**. En las subetiquetas, si se omite una opción, ese grado de libertad no se perturba, a menos que se haya fijado una perturbación por defecto para él en la etiqueta principal. En las subetiquetas, también se puede hacer que las hélices copien los grados de libertad de otras hélices con opciones **copies_helix**. Un caso especial es la opción **pitch_copies_helix**, que fijará omega0 en el valor necesario para garantizar que una hélice copie el paso de la hélice mayor (el avance a lo largo del eje de la hélice mayor por vuelta alrededor de ese eje) de otra hélice.

Desde el 24 de mayo de 2017, este mover también puede usarse para _fijar_ el valor de un parámetro en un valor absoluto deseado. Para fijar el valor de epsilon en 0.75, por ejemplo, se usaría `epsilon="0.75"` (que se usaría _en lugar de_ una opción `epsilon_perturbation`).

##Véase también

* [[El formato de archivo Crick params|Crick-params-files]]
* [[Mover MakeBundle|MakeBundleMover]]
* [[Mover BundleGridSampler|Mover]]
* [[Filtro BundleReporter|BundleReporterFilter]]
# BundleGridSampler
Página creada por Vikram K. Mulligan (vmulligan@flatironinstitute.org). Última actualización: 12 de octubre de 2018.
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## BundleGridSampler

Genera un haz helicoidal (helical bundle) usando las ecuaciones de Crick (que describen un coiled-coil) o las ecuaciones de Crick modificadas (que describen un coiled-coil aplastado lateralmente), muestreando intervalos de parámetros especificados por el usuario y dando como salida el haz de menor energía encontrado (y los valores de parámetros que lo acompañan). Los parámetros muestreados se distribuyen uniformemente en los intervalos especificados por el usuario; si se muestrea más de un parámetro, el mover muestrea una rejilla n-dimensional de valores de muestra. Opcionalmente, este mover también puede escribir archivos PDB de todas las geometrías de haz muestreadas. Los parámetros se almacenan con la Pose y se escriben en líneas REMARK en la salida PDB. Ten en cuenta que, como una hebra es un caso especial de hélice, este mover también puede usarse para muestrear conformaciones de barril beta o estructuras mixtas alfa-beta.

[[include:mover_BundleGridSampler_type]]

Ten en cuenta que los intervalos de parámetros predeterminados se aplican por separado a cada hélice. Por ejemplo, el siguiente script realizaría 16 muestreos (4 para r0 de la hélice 1 y 4 para r0 de la hélice 2):

```xml
<BundleGridSampler name="bgs1" helix_length="20" scorefxn="sfxn1" r0_min="5.0" r0_max="8.0" r0_samples="4" omega0="0.05" delta_omega0="0" delta_omega1="0" delta_t="0">
     <Helix />
     <Helix delta_omega0="3.14" />
</BundleGridSampler>
```

Para muestrear un intervalo de parámetros manteniendo el mismo valor de un parámetro en dos hélices distintas, puede usarse la opción <b>[parameter]\_copies\_helix</b> en una etiqueta <b>Helix</b>. La hélice que se va a copiar debe declararse antes que la hélice que tiene la opción <b>[parameter]\_copies\_helix</b>. El siguiente script, por ejemplo, realiza 4 muestreos, con r0 de ambas hélices variando de 5 a 8 (y siempre igual en las dos hélices):

```xml
<BundleGridSampler name="bgs1" helix_length="20" scorefxn="sfxn1" r0_min="5.0" r0_max="8.0" r0_samples="4" omega0="0.05" delta_omega0="0" delta_omega1="0" delta_t="0">
     <Helix />
     <Helix delta_omega0="3.14" r0_copies_helix="1"/>
</BundleGridSampler>
```

##Véase también

* [[El formato de archivo params de Crick|Crick-params-files]]
* [[Mover MakeBundle|MakeBundleMover]]
* [[Mover PerturbBundle|PerturbBundleMover]]
* [[Filtro BundleReporter|BundleReporterFilter]]
* [[Mover BackboneGridSampler|BackboneGridSamplerMover]]
* [[Symmetry]]: uso de la simetría en Rosetta
* [[SymmetryAndRosettaScripts]]
* [[SetupForSymmetryMover]]
* [[SetupNCSMover]]
* [[DetectSymmetryMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]
* [[I want to do x]]: guía para elegir un mover

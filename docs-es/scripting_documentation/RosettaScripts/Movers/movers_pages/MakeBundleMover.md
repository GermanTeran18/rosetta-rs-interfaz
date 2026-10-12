# MakeBundle
Página creada por Vikram K. Mulligan (vmulligan@flatironinstitute.org). Última modificación: 12 de octubre de 2018.
*Volver a la página de [[Mover|Movers-RosettaScripts]].*

[[_TOC_]]

## MakeBundle

Genera un haz helicoidal usando las ecuaciones de Crick (que describen una hélice de hélices) o ecuaciones de Crick modificadas (que describen una hélice de hélices aplastada lateralmente). Este mover es lo bastante general como para crear hélices arbitrarias con cadenas principales arbitrarias. Como las hebras son un caso especial de hélice (en el que el giro por residuo es de unos 180 grados), el mover también puede generar barriles beta u otros haces de hebras. Los elementos de estructura secundaria generados están desconectados, por lo que hay que invocar movers posteriores (p. ej., <b>GeneralizedKIC</b>) para conectarlos con loops. Los parámetros se almacenan con el Pose y se escriben en líneas REMARK en la salida PDB.

Los tipos de hélice se definen con archivos crick_params, ubicados en la base de datos de Rosetta en database/protocol_data/crick_parameters (o proporcionados por el usuario). Recientemente se ha añadido compatibilidad con archivos de parámetros de Crick que definen hélices cuya unidad repetitiva tiene más de un residuo. Para más información sobre este tipo de archivo, consulta [[esta página|Crick-params-files]].

## Opciones completas

[[include:mover_MakeBundle_type]]

## Archivos Crick params
La base de datos de Rosetta contiene actualmente varios conjuntos de parámetros de hélice menor:<br/>
- "alpha_helix": una hélice alfa dextrógira estándar de L-aminoácidos, con phi=-64.8, psi=-41.0 y omega=180.0. Ten en cuenta que el giro por residuo de esta hélice es de 98.65 grados, no exactamente 100 grados.<br/>
- "alpha_helix_100": una hélice alfa dextrógira de L-aminoácidos, con phi=-62.648, psi=-41.0 y omega=180.0, lo que da un giro por residuo de 100 grados. Se mantiene por compatibilidad con los scripts de Python que se usaban antes para generar haces helicoidales.
- "beta_strand": una hebra beta de L-aminoácidos, con phi=-135.0, psi=135.0 y omega=180.0.<br/>
- "collagen": <b>EXPERIMENTAL</b>. Genera una hélice de colágeno. Es experimental porque la unidad repetitiva de esta hélice es una repetición de tres residuos y no de un solo residuo.
- "neutral_beta_strand": una hebra beta anormalmente recta, con phi=180.0, psi=180.0 y omega=180.0. Tanto los L- como los D-aminoácidos pueden acceder a esta región del espacio de Ramachandran.<br/>
- "L_alpha_helix": una hélice alfa levógira, como la que pueden formar los D-aminoácidos. Phi=64.8, psi=41.0 y omega=180.0.<br/>
- "daa_beta_strand": una hebra beta formada por D-aminoácidos, que es la imagen especular de la formada por L-aminoácidos. Phi=135.0, psi=-135.0 y omega=180.0.<br/>
- "14_helix": una hélice levógira formada por beta-aminoácidos. Phi=-139.9, theta=59.5, psi=-138.7 y omega=180.0.<br/>

## Ejemplo

Este script genera un barril beta antiparalelo con un haz de hélices alfa en su interior.
```xml
<MakeBundle name="bundle1" set_bondlengths="true" set_bondangles="true" residue_name="ALA" crick_params_file="beta_strand" symmetry="16" r0="29" omega0="0.075" helix_length="20" >
        #The parameters set above ensure that by default, each "helix" will actually be a strand:
	<Helix /> #A strand
	<Helix delta_omega0="0.19634954" invert="1" delta_t="0.25" delta_omega1="1.5707963" /> #An offset, inverted strand.
	<Helix r0="21" omega0="0.05" crick_params_file="alpha_helix" helix_length="40" /> #An alpha-helix.
	#The three elements defined above are repeated 16 times about the bundle axis to make the bundle.
</MakeBundle>

```

Ten en cuenta que RosettaScripts necesita alguna entrada sobre la que operar, pero este mover, por defecto, elimina la geometría de entrada y la sustituye por la geometría generada. Al ejecutar RosettaScripts, puedes pasar un archivo PDB ficticio con la opción -in:file:s, o un archivo FASTA ficticio con la opción -in:file:fasta.


##Véase también

* [[El formato de archivo Crick params|Crick-params-files]]
* [[Mover BundleGridSampler|BundleGridSamplerMover]]
* [[Mover PerturbBundle|PerturbBundleMover]]
* [[Filtro BundleReporter|BundleReporterFilter]]
* [[Symmetry]]: uso de simetría en Rosetta
* [[SymmetryAndRosettaScripts]]
* [[SetupForSymmetryMover]]
* [[SetupNCSMover]]
* [[DetectSymmetryMover]]
* [[SymMinMover]]
* [[SymPackRotamersMover]]
* [[ExtractAsymmetricUnitMover]]
* [[ExtractAsymmetricPoseMover]]

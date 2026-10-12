# Mover trRosettaProtocol
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
Documentación añadida el 25 de marzo de 2021 por Vikram K. Mulligan, Flatiron Institute (vmulligan@flatironinstitute.org).

[[_TOC_]]

## Mover trRosettaProtocol

El mover trRosettaProtocol ofrece la misma funcionalidad que la [[aplicación trRosetta|trRosetta]], pero en forma de mover que se puede usar en RosettaScripts, en scripts de PyRosetta o en código C++.  Aunque la mayoría de los movers toman un Pose como entrada, lo manipulan y producen un Pose como salida, el mover trRosettaProtocol descarta el Pose de entrada y construye uno nuevo.  Las entradas son una secuencia o un archivo FASTA y un alineamiento múltiple de secuencias; este último se introduce en la red neuronal de trRosetta para generar restricciones de distancia y orientación entre residuos que guían la predicción de la estructura.  Cada ejecución del mover trRosettaProtocol generará una nueva estructura predicha.  Estas estructuras tienden a mostrar poca variación, por lo que son necesarios niveles de muestreo relativamente bajos.  Por otro lado, esto significa que este protocolo no es ideal para el muestreo conformacional a gran escala (p. ej., para evaluar si el paisaje de energía tiene mínimos alternativos).

### Requisitos de compilación

El mover trRosettaProtocol requiere que Rosetta se compile con soporte de Tensorflow.  Consulta la descripción autogenerada más abajo para ver los detalles sobre cómo compilar Rosetta y enlazar Tensorflow.

## Todas las opciones

[[include:mover_trRosettaProtocol_type]]

### Mejores prácticas

En el momento de escribir esto, se recomienda definir `mutate_gly_to_ala="false"` y `backbone_randomization_mode="ramachandran"`.  Es posible que esto pase a ser el valor por defecto en algún momento.  El resto de los ajustes pueden dejarse por defecto.

## Script de ejemplo

El siguiente script produce predicciones bastante buenas (~2 A de RMSD) de la estructura de la ubiquitina quizá cuatro veces de cada cinco:

```xml
<ROSETTASCRIPTS>
	<SCOREFXNS>
		<ScoreFunction name="r15" weights="ref2015" />
	</SCOREFXNS>
	<RESIDUE_SELECTORS>
	</RESIDUE_SELECTORS>
	<PACKER_PALETTES>
	</PACKER_PALETTES>
	<TASKOPERATIONS>
	</TASKOPERATIONS>
	<MOVE_MAP_FACTORIES>
	</MOVE_MAP_FACTORIES>
	<SIMPLE_METRICS>
	</SIMPLE_METRICS>
	<FILTERS>
	</FILTERS>
	<MOVERS>
		<trRosettaProtocol name="predict_struct" msa_file="inputs/1r6j_msa.a3m"
			sequence="GAMDPRTITMHKDSTGHVGFIFKNGKITSIVKDSSAARNGLLTEHNICEINGQNVIGLKDSQIADILSTSGTVVTITIMPAF"
			mutate_gly_to_ala="false" backbone_randomization_mode="ramachandran"
		/>
	</MOVERS>
	<PROTOCOLS>
		<Add mover="predict_struct" />
	</PROTOCOLS>
	<OUTPUT scorefxn="r15" />
</ROSETTASCRIPTS>

```

En este ejemplo, el alineamiento múltiple de secuencias (MSA) de entrada, que se generó con el servidor HHBlits (https://toolkit.tuebingen.mpg.de/tools/hhblits), tiene este aspecto:

```
>1718255
GAMDPRTITMHKDSTGHVGFIFKNGKITSIVKDSSAARNGLLTEHNICEINGQNVIGLKDSQIADILSTSGTVVTITIMPAF
>UniRef100_A0A2 Putative syntenin-1 n=1 Tax=Stichopus japonicus TaxID=307972 RepID=A0A2G8KW37_STIJA
---FERTITMHKDSTGHVGFIFKNGKITSIVKDSSAARNGLLTEHNICEINGQNVIGLKDSQIADILSTSGTVVTITIMPKF
>UniRef100_UPI0 Syntenin 1 n=2 Tax=Homo sapiens TaxID=9606 RepID=UPI00001B299E
KNMDQfqRTVTMHKDSSGHVGFVFKKGKIVSIAKDSSAARNGLLTHHCICEVNGQNVIGMKDKQITEVLSGSGNVVTITIMPAF
>UniRef100_A0A0 Uncharacterized protein (Fragment) n=1 Tax=Amblyomma triste TaxID=251400 RepID=A0A023GMK5_AMBTT
---FERTVTMHKDSTGHVGFVFKNGKITSLVKDSSAARNGLLTEHYLCEINGQNVIGLKDKQIKDILSTSGNVITITVMPSF
>UniRef100_A0A0 Syntenin-1 n=1 Tax=Fukomys damarensis TaxID=885580 RepID=A0A091E3S4_FUKDA
---FERTVTMHKDSTGHVGFIFKNGKITSIVKDSSAARNGLLTEHNICEINGQNVIGLKDSQIADILSTSGTVVTITIMPAF
>UniRef100_A0A0 Uncharacterized protein n=1 Tax=Aedes albopictus TaxID=7160 RepID=A0A023ENS9_AEDAL
---FERTITMHKDSTGHVGFIFKNGKITSIVKDSSAARNGLLTDHQICEVNGQNVIGLKDKQIADILSTAGNVVTITIMPSF
...
```

Un MSA típico tiene de decenas a cientos de secuencias (aunque incluso un "alineamiento" de una sola secuencia suele poder producir predicciones significativas).

## Organización del código

Consulta la documentación de la [[aplicación trRosetta|trRosetta]] para obtener información sobre la organización del código de trRosetta.

## Referencias

- La red neuronal trRosetta se describe en Yang _et al_. (2020) _Proc Natl Acad Sci USA_ 117(3):1496-1503 (doi 10.1073/pnas.1914677117).
- El mover trRosettaProtocol, [[trRosettaConstraintGenerator]], la [[aplicación trRosetta|trRosetta]] y el resto de la infraestructura en C++ fueron escritos por Vikram K. Mulligan (vmulligan@flatironinstitute.org) y actualmente no están publicados.

## Véase también

* [[aplicación trRosetta|trRosetta]]: Básicamente, este mover en forma de aplicación, de modo que puedes proporcionar un MSA por línea de comandos y obtener una estructura.
* [[trRosettaConstraintGenerator]]:  Un generador de restricciones que usa este mover para crear las restricciones entre residuos que guían la predicción de la estructura.
* [[MinMover]]: Lo usa este mover compuesto para encontrar conformaciones compatibles con las restricciones de trRosetta.
* [[FastRelax|FastRelaxMover]]:  Lo usa este mover compuesto para el refinamiento de todos los átomos.
* [[aplicación AbinitioRelax|abinitio-relax]]:  Predicción de estructuras clásica, basada en fragmentos.

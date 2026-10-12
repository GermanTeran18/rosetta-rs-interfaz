#Puntuación de estructuras con densidad electrónica

Metadatos
========

Última edición: 26/6/09. Código y documentación de Frank DiMaio (dimaio@u.washington.edu).

Descripción general
========

Se han añadido a Rosetta varias funciones de puntuación que describen qué tan bien concuerda una estructura con datos experimentales de densidad. Los datos del mapa de densidad se leen en formato CCP4/MRC (la densidad debe cubrir como mínimo la unidad asimétrica).  Las distintas funciones de puntuación equilibran velocidad frente a precisión, y su uso debe determinarse principalmente por la resolución de los datos del mapa de densidad:

-   **elec\_dens\_fast** se recomienda para la mayoría de los casos.

Además, hay disponible una función de puntuación más lenta pero más precisa.  Solo se recomienda si **elec\_dens\_fast** funciona mal (por ejemplo, si la calidad del mapa varía mucho a lo largo del mapa):
-   **elec\_dens\_window**: usa la suma de las correlaciones de una ventana deslizante de residuos frente a los datos experimentales; la densidad de la estructura usa solo todos los átomos pesados.

Por último, las siguientes funciones de puntuación están obsoletas (se recomienda elec_dens_fast), pero se conservan por razones históricas:
-   **elec\_dens\_whole\_structure\_ca**: usa la correlación de la densidad de toda la estructura frente a los datos experimentales; la densidad de la estructura usa solo los C-alfa.
-   **elec\_dens\_whole\_structure\_allatom**: usa la correlación de la densidad de toda la estructura frente a los datos experimentales; la densidad de la estructura usa solo todos los átomos pesados.

El usuario las controla mediante un conjunto de opciones de línea de comandos (consulta más abajo los ejemplos de líneas de comandos y las opciones). También se pueden especificar en archivos de pesos o de parches, como cualquier otra función de puntuación.  Los pesos que se deben usar varían según la resolución de los datos, pero los siguientes dan rangos razonables:

- **elec\_dens\_fast**: ~25 suele ser bueno; más alto para alta resolución (<3Å) y más bajo para baja resolución (>6Å)
- **elec\_dens\_window**: ~0.2 suele ser bueno; más alto para alta resolución (<3Å) y más bajo para baja resolución (>6Å)

Estas funciones de puntuación se pueden usar como cualquier otra función de puntuación en Rosetta, con una excepción clave: como la puntuación de ajuste a la densidad depende de la orientación global de cuerpo rígido de la molécula, todos los Pose que se vayan a puntuar deben tener como raíz un residuo virtual, con un salto (jump) al resto del Pose. Más abajo se muestran métodos prácticos para configurarlo, y siempre se debe permitir que la orientación de cuerpo rígido se mueva (con la opción **-jump\_move**).

Líneas de comandos de ejemplo
====================

Ejemplo 1: relajar una estructura 1cid.pdb en un mapa 1cid\_5A.mrc :

```
bin/relax.linuxgccrelease \
 -database ~/rosetta/main/database \
 -in:file:s 1cid.pdb \
 -relax:fastrelax_repeats 4 \
 -relax:jump_move true \
 -edensity:mapfile 1cid_5A.mrc \
 -edensity:mapreso 5.0 \
 -edensity:fastdens_wt 0.2 \
 -out::nstruct 5 \
 -ex1 -ex2aro 
```

Ejemplo 2: realizar modelado por homología usando datos de densidad (para la documentación completa del modelado por homología, consulta [[ RosettaCM | RosettaCM ]]:

1) Reemplaza el bloque de funciones de puntuación del archivo XML por:
```
<SCOREFXNS>
    <stage1 weights=score3 symmetric=0>
        <Reweight scoretype=atom_pair_constraint weight=0.5/>
        <Reweight scoretype=elec_dens_fast weight=10.0/>
    </stage1>
    <stage2 weights=score4_smooth_cart symmetric=0>
        <Reweight scoretype=atom_pair_constraint weight=0.5/>
        <Reweight scoretype=elec_dens_fast weight=10.0/>
    </stage2>
    <fullatom weights=talaris2013_cart symmetric=0>
        <Reweight scoretype=atom_pair_constraint weight=0.5/>
        <Reweight scoretype=elec_dens_fast weight=25.0/>
    </fullatom>
</SCOREFXNS>
```

2) Usa la línea de comandos:

```
Rosetta/main/source/bin/rosetta_scripts.linuxclangrelease \
     -database Rosetta/main/database \
     -in:file:fasta target.fasta \
     -parser:protocol hybridize.xml \
     -default_max_cycles 200 \
     -edensity:mapfile 1cid_5A.mrc \
     -edensity:mapreso 5.0 \
     -nstruct 10 \
     -dualspace
```

Opciones de puntuación de densidad
=======================

**Opciones comunes**:

-   -edensity:mapfile

Mapa de entrada en formato CCP4/MRC que cubre la unidad asimétrica.

-   -edensity:mapreso

La resolución de los datos.  Si no se indica, se estima a partir del tamaño de vóxel del mapa de entrada.

-   -edensity:cryoem_scatterers

Usa factores de dispersión de crio-EM (por defecto: rayos X).

-   -edensity:fastdens\_wt
-   -edensity:sliding\_window\_wt

SI EL PROTOCOLO LO ADMITE (consulta más abajo los protocolos admitidos), fija el peso de la función de puntuación correspondiente.

-   -edensity:sliding\_window

Ancho (\# de residuos) que se usa en la puntuación con ventana deslizante.  Debe ser un valor impar; por defecto es 1.  Se recomiendan valores más altos en casos de baja resolución (3, 5 o incluso 7).

**Opciones menos frecuentes**:

-   -edensity:atom\_mask
-   -edensity:ca\_mask

Ancho de la máscara alrededor de cada átomo/CA [por defecto depende de la resolución]

-   -edensity:realign min

Minimiza como cuerpo rígido dentro de la densidad después de cargar el mapa.


Protocolos admitidos
===================

Protocolos admitidos:

-   aplicación score
-   relax
-   loopmodel
-   ca\_to\_allatom
-   ab initio (mediante el topology broker): las puntuaciones de densidad deben fijarse mediante parches (los pesos de densidad de la línea de comandos se ignoran)

Para activar la puntuación de ajuste a la densidad durante ab initio, hay que añadir un claimer al archivo del topology broker:

```
CLAIMER DensityScoringClaimer
anchor 98
END_CLAIMER
```

En general, el residuo ancla debe estar en una región que permanezca fija durante todo el protocolo (para evitar un movimiento de cuerpo rígido involuntario de toda la estructura); por ejemplo, dentro de un fragmento rígido en el RigidChunkClaimer. En general, el peso del ajuste a la densidad no debería activarse hasta muy avanzado el protocolo (etapa 3 o etapa 4).

Cómo añadir la puntuación de densidad a un nuevo protocolo
========================================

Se ha añadido un mover, **protocols::electron\_density::SetupForDensityScoringMover**, que hace lo siguiente como preparación para puntuar una estructura frente a la densidad:

-   Se asegura de que el Pose tenga como raíz un VRT
-   Usa el valor de la opción -edensity:realign para hacer el docking del Pose al mapa de densidad
-   [OPCIONALMENTE] Usa solo un subconjunto de residuos para hacer el docking inicial del Pose

La tercera opción está pensada para casos de modelado comparativo en los que puede faltar densidad en el Pose inicial.

También se ha añadido una función, **core::scoring::electron\_density::add\_dens\_scores\_from\_cmdline\_to\_scorefxn(ScoreFunction&)** , que usa los valores de -edensity:sliding\_window\_wt, edensity:whole\_structure\_ca\_wt y edensity:whole\_structure\_allatom\_wt para actualizar la función de puntuación.

Para los protocolos que no modifican la raíz del FoldTree, esto es todo lo que se necesita para usar la puntuación de ajuste a la densidad (aunque pueden ser necesarios movimientos adicionales que modifiquen la orientación de cuerpo rígido del sistema para obtener resultados significativos).

##Véase también

* [[Aplicaciones de análisis | analysis-applications]]: otras aplicaciones de diseño
* [[Escaneo de mutaciones puntuales| pmut-scan-parallel ]]: detección en paralelo de mutaciones puntuales estabilizadoras mediante diseño
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta

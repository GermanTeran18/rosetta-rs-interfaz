#AbPredict

Metadatos
========

Autores: Gideon Lapidoth (glapidoth@gmail.com), Sarel Fleishman (sarel.fleishman@weizmann.ac.il )

Investigador principal responsable: Sarel Fleishman (sarel.fleishman@weizmann.ac.il ).

Última edición: 26/10/2019, por Gideon Lapidoth (glapidoth@gmail.com) 


Referencias
==========

1. Baran, Dror, M. Gabriele Pszolla, Gideon D. Lapidoth, Christoffer Norn, Orly Dym, Tamar Unger, Shira Albeck, Michael D. Tyka, and Sarel J. Fleishman. 2017. “Principles for Computational Design of Binding Antibodies.” Proceedings of the National Academy of Sciences of the United States of America 114 (41): 10900–905.
2. Lapidoth, Gideon D., Dror Baran, Gabriele M. Pszolla, Christoffer Norn, Assaf Alon, Michael D. Tyka, and Sarel J. Fleishman. 2015. “AbDesign: An Algorithm for Combinatorial Backbone Design Guided by Natural Conformations and Sequences.” Proteins 83 (8): 1385–1406.
3. Norn, Christoffer H., Gideon Lapidoth, and Sarel J. Fleishman. 2017. “High-Accuracy Modeling of Antibody Structures by a Search for Minimum-Energy Recombination of Backbone Fragments.” Proteins 85 (1): 30–38.

Visión general
========
Los métodos de predicción de estructura de anticuerpos se basan en la homología de secuencia con estructuras determinadas experimentalmente. Los modelos resultantes pueden ser precisos, pero a menudo están estereoquímicamente tensionados, lo que limita su utilidad en flujos de trabajo de modelado y diseño. En lugar de usar homología de secuencia, AbPredict realiza una búsqueda basada en Monte Carlo de combinaciones de conformaciones de la cadena principal de baja energía, derivadas de estructuras de anticuerpos resueltas experimentalmente, para obtener estructuras de anticuerpos precisas y sin tensión.
ABpredict usa un algoritmo de optimización combinatoria de la cadena principal que aprovecha el gran número de estructuras moleculares de anticuerpos determinadas experimentalmente para construir nuevos modelos de anticuerpos. En resumen, todas las estructuras de anticuerpos determinadas experimentalmente se descargan del Protein Data Bank (PDB) y se segmentan en posiciones estructuralmente conservadas: las cisteínas de los puentes disulfuro en el núcleo de las cadenas ligera y pesada del dominio variable, lo que crea 4 segmentos que comprenden los CDR 1 y 2 y el andamio intermedio (VH y VL) y el CDR 3 (H3 y L3). Estos cuatro segmentos se recombinan combinatoriamente para producir un conjunto de nuevos modelos de anticuerpos con una gran diversidad conformacional. Luego se hace threading de la secuencia de entrada que se quiere modelar sobre el conjunto de modelos de partida. Después, los modelos se optimizan energéticamente mediante muestreo Monte Carlo. En cada paso se muestrea la conformación de un segmento al azar de una base de datos precalculada (consulta [SpliceOutAntiBody](https://www.rosettacommons.org/docs/latest/scripting_documentation/RosettaScripts/Movers/SpliceOutAntibody)).
Por último, los modelos finales se ordenan por energía.

AbPredict está implementado como un protocolo de rosetta scripts. Aquí se puede encontrar un ejemplo de este protocolo y otros archivos necesarios, como los archivos de la base de datos de torsiones:
\<Rosetta_Directory\>/demos/tutorials/AbPredict/

####Cómo preparar una ejecución de modelado
1. El protocolo está preparado para modelar la región variable de un anticuerpo (Fv)
2. La secuencia de entrada debe pasarse como una variable de script con la siguiente sintaxis, ya sea como argumento de línea de comando o añadida al archivo de opciones:
```
-parser:script_vars sequence=IKMTQSPSSMYASLGERVTITCKASQDIRKYLNWYQQKPWKSPKTLIYYATSLADGVPSRFSGSGSGQDYSLTISSLESDDTATYYCLQHGESPYTFGGGTKLEIQLQQSGAELVRPGALVKLSCKASGFNIKDYYMHWVKQRPEQGLEWIGLIDPENGNTIYDPKFQGKASITADTSSNTAYLQLSSLTSEDTAVYYCARDNSYYFDYWGQGTTLTVS 
```
**Ten en cuenta las siguientes reglas sobre la secuencia de entrada:**

***

* La longitud de la cola N-terminal de la cadena ligera (los residuos anteriores a la primera cisteína del disulfuro, sin incluirla) debe ser exactamente de 21 aa
* La longitud de la cola N-terminal de la cadena pesada (desde el primer residuo después del corte entre las cadenas Vl/Vh hasta la primera cisteína del disulfuro, sin incluirla) debe ser exactamente de 20 aa
* Debe haber exactamente 7 aa después de la fenilalanina conservada de L3 (L98 en la numeración de Chothia)
* Debe haber exactamente 9 aa después del triptófano conservado de H3 (H103 en la numeración de Chothia)
***

3. El siguiente paso es crear una lista de todos los segmentos de la base de datos de conformaciones precalculada que tengan la longitud correcta con respecto a la secuencia de entrada. Las distintas longitudes de segmento corresponden a las reglas indicadas arriba.
4. Para obtener todos los segmentos relevantes de la base de datos de conformaciones puedes usar este script de bash:
`\<Rosetta_Directory\>/demos/tutorials/AbPredict/create_run.sh`

**Para ejecutar:**
```
./create_run.sh <VL length> <L3 length> <HL length> <L3 length>
```

Debes ejecutar el script dentro de la carpeta `\<Rosetta_Directory\>/demos/tutorials/AbPredict/`

5. El archivo de salida "segment_lengths_script_vars" debe tener 500 líneas, y cada línea debe ser así:
```
-parser:script_vars entry_H1_H2="1AHWH" entry_L1_L2="1AHWL" entry_H3="1AHWH" entry_L3="1AHWL"
```
6. Cada línea del archivo corresponde a un proceso de modelado. Normalmente bastan 500 modelos. Puedes aumentar el número de modelos de salida ejecutando más "ntrials" en cada trabajo o creando más trabajos cambiando el número de líneas de 500 a N en el archivo `create_run.sh`.

7. Un trabajo de modelado de Rosetta de ejemplo sería así:
```
<Rosetta_Directory>/main/source/bin/rosetta_scripts.default.linuxgccrelease @flags -parser:script_vars entry_H1_H2=2IBZX entry_L1_L2=3DSFL entry_H3=3V4UH entry_L3=1LO2L  sequence=IKMTQSPSSMYASLGERVTITCKASQDIRKYLNWYQQKPWKSPKTLIYYATSLADGVPSRFSGSGSGQDYSLTISSLESDDTATYYCLQHGESPYTFGGGTKLEIQLQQSGAELVRPGALVKLSCKASGFNIKDYYMHWVKQRPEQGLEWIGLIDPENGNTIYDPKFQGKASITADTSSNTAYLQLSSLTSEDTAVYYCARDNSYYFDYWGQGTTLTVS 
```
8. Los modelos de salida deben ordenarse por la energía total de Rosetta y agruparse. Graficar las energías de los modelos frente al RMSD respecto del modelo de menor energía puede indicar bien si los modelos convergen hacia una única solución. 

**Archivo de opciones:**
```
-nodelay
-use_input_sc
-ignore_unrecognized_res
-overwrite
-out:file:fullatom
-s 2BRR.ppk_ideal.pdb
-parser:protocol AbPredict_xsd.xml
-parser:script_vars template_pdb=2BRR.ppk_ideal.pdb 
-pdb_comments true

-parser:script_vars H1_H2.db=AB_db_files/H1_H2.db H3.db=AB_db_files/H3.db L3.db=AB_db_files/L3.db L1_L2.db=AB_db_files/L1_L2.db
-out:path:pdb pdb/
```




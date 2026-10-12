#MultistageRosettaScripts

#Formato de scripting XML

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

[[_TOC_]]

##Resumen

Cada script de MRS es un monstruo de Frankenstein hecho del
[[formato XML de JD3|https://wiki.rosettacommons.org/index.php/JD3FAQ#XML_Job_definition_files]] y del
[[formato XML de los rosetta scripts tradicionales|RosettaScripts#example-xml-file]].
El formato JD3 consta de una etiqueta `<Common/>` y una o más etiquetas `<Job/>`
(el orden de Common y Job depende de la aplicación concreta),
todo ello dentro de una etiqueta `<JobDefinitionFile/>`, como se muestra aquí:

```xml
<JobDefinitionFile>
    <Job>
        <Input>
        </Input>
        <Output>
        </Output>
    </Job>

    <Job>
        <Input>
        </Input>
        <Output>
        </Output>
    </Job>

    <Common>
    </Common>
</JobDefinitionFile>

```

Los scripts de MRS usan esta base para crear algo como esto:

[[/images/multistage_rosetta_scripts/MRS_xml_overview.png]]

###Información del DataMap
Consiste en todo lo de un rosetta script normal, excepto `<PROTOCOLS>`.
Las funciones de puntuación, los selectores de residuos, las fábricas de movemaps, los selectores de tareas,
los movers, los filtros, etc. pueden ir en `<Common>` o en `<Job>`.
Rosetta dará mayor prioridad a la información del DataMap de `<Job>` en caso de conflicto de nombres,
pero solo para las trayectorias que se generan a partir de esa etiqueta `<Job>`.
Por ejemplo, podrías tener 3 etiquetas `<Job>` y en una de ellas poner:
```xml
  <SCOREFXNS>
    <ScoreFunciton name="sfxn" weights="ref2015_cart.wts"/>
  </SCOREFXNS>
```

y en `<Common>` tienes

```xml
  <SCOREFXNS>
    <ScoreFunciton name="sfxn" weights="ref2015.wts"/>
  </SCOREFXNS>

  <MOVERS>
    <FastRelax name="fr" score_function="sfxn"/>
  </MOVERS>  
```

En este caso, FastRelax usará `ref2015_cart.wts` en un trabajo y `ref2015.wts` en los otros dos.
Todo tipo de información del DataMap se puede sobrecargar de esta forma, incluidos Movers y Filters.
Consulta [[aquí|MultistageRosettaScripts#Features and Tricks]] ejemplos de cómo usar esta función.

###Protocolos
La sección `<PROTOCOLS>` es la única que se comporta de forma muy distinta a la de los rosetta scripts tradicionales.
Ahora, los movers y los filtros se dividen en [[stages|StageOptions]].
Entre cada stage, tienes la oportunidad de filtrar trayectorias según su posición global.

```xml
<PROTOCOLS>
    <Stage num_runs_per_input_struct="10000" total_num_results_to_keep="5000">
        <Add mover="m1"/>
        <Add filter="f1"/>
        <Sort filter="f2"/>
    </Stage>

    <Stage num_runs_per_input_struct="2" total_num_results_to_keep="5000">
        <Add mover="m2" filter="f2"/>
        <Sort filter="f1"/>
    </Stage>

    <Stage num_runs_per_input_struct="1" total_num_results_to_keep="2000">
        <Add mover="m3"/>
        <Sort filter="f2"/>
    </Stage>

    <Stage num_runs_per_input_struct="1" total_num_results_to_keep="1000">
        <Add mover="m4"/>
        <Sort filter="f2"/>
    </Stage>
</PROTOCOLS>
```

Consulta [[aquí|StageOptions]] un análisis más detallado de las opciones de `<Stage>`.

###Entrada/salida
Estas etiquetas las define [[JD3|https://wiki.rosettacommons.org/index.php/JD3FAQ]].
`<Output>` es opcional, pero debes incluir `<Input>` para indicar a Rosetta cómo cargar tu estructura.
Consulta la siguiente sección para ver algunos ejemplos de cómo podría ser una etiqueta `<Input>`.

##Conversión

Este formato puede resultar poco acogedor, pero hay una forma de convertir un rosetta script existente en un multistage rosetta script sin demasiado esfuerzo.
Supón que tenemos el siguiente rosetta script guardado como `test.xml`:
```xml
<ROSETTASCRIPTS>

  <SCOREFXNS>
    <ScoreFunciton name="sfxn"/>
  </SCOREFXNS>

  <RESIDUE_SELECTORS>
    <Something name="res_selector"/>
  </RESIDUE_SELECTORS>

  <TASKOPERATIONS>
    <ReadResfile name="read_resfile"/>
  </TASKOPERATIONS>

  <FILTERS>
    <SomeFilter name="hi" selector="res_selector"/>
  </FILTERS>

  <MOVERS>
    <FastRelax name="fr" score_function="sfxn" task_operations="read_resfile"/>
  </MOVERS>

  <PROTOCOLS>
    <Add mover="fr"/>
    <Add filter="hi"/>
  </PROTOCOLS>

</ROSETTASCRIPTS>
```

Al ejecutar

```
multistage_rosetta_scripts.default.linuxgccrelease -convert -parser:protocol test.xml -job_definition_file msrs.xml
```

(asegúrate de que `-convert` sea el primer argumento) se creará lo siguiente en `msrs.xml`:

```xml
<JobDefinitionFile>

    <Job>
        <Input>
            <PDB filename="TODO"/>
        </Input>
    </Job>

    <Common>

        <SCOREFXNS>
            <ScoreFunciton name="sfxn"/>
        </SCOREFXNS>

        <RESIDUE_SELECTORS>
            <Something name="res_selector"/>
        </RESIDUE_SELECTORS>

        <TASKOPERATIONS>
            <ReadResfile name="read_resfile"/>
        </TASKOPERATIONS>

        <FILTERS>
            <SomeFilter name="hi" selector="res_selector"/>
        </FILTERS>

        <MOVERS>
            <FastRelax name="fr" score_function="sfxn" task_operations="read_resfile"/>
        </MOVERS>

        <PROTOCOLS>
            <Stage num_runs_per_input_struct="TODO" total_num_results_to_keep="TODO">

                <Add mover="fr"/>
                <Add filter="hi"/>
                <Sort filter="TODO"/>

            </Stage>
        </PROTOCOLS>

    </Common>

</JobDefinitionFile>
```

Observa que el conversor colocó TODO donde el usuario aún tiene que tomar una decisión.
Puedes reemplazar estos TODO con un editor de texto, pero algunos se pueden rellenar automáticamente si le das al conversor suficiente información.
Por ejemplo, al ejecutar

```xml
multistage_rosetta_scripts.default.linuxgccrelease -convert -parser:protocol test.xml -nstruct 50 -s 3U3B_A.pdb 3U3B_B.pdb -job_definition_file msrs.xml
```

se crea lo siguiente.
Ahora `num_runs_per_input_struct` se reemplaza por el valor de la línea de comandos para `-nstruct`
y se crea una etiqueta `<Job/>` por cada estructura indicada con las opciones `-s` y `-l`.
Por ahora el conversor no es lo bastante inteligente como para saber si los archivos de entrada son archivos PDB,
así que coloca un comentario TODO para que reemplaces el formato de entrada si es necesario
(consulta las [[opciones de JD3|https://wiki.rosettacommons.org/index.php/JD3FAQ]]).

```xml
<JobDefinitionFile>
    <Job>
        <Input>
            TODO: The script converter is not smart enough to know if this file is actually a pdb file. Please correct this tag if necessary!
            <PDB filename="3U3B_A.pdb"/>
        </Input>
    </Job>

    <Job>
        <Input>
            TODO: The script converter is not smart enough to know if this file is actually a pdb file. Please correct this tag if necessary!
            <PDB filename="3U3B_B.pdb"/>
        </Input>
    </Job>

    <Common>

        <SCOREFXNS>
            <ScoreFunciton name="sfxn"/>
        </SCOREFXNS>

        <RESIDUE_SELECTORS>
            <Something name="res_selector"/>
        </RESIDUE_SELECTORS>

        <TASKOPERATIONS>
            <ReadResfile name="read_resfile"/>
        </TASKOPERATIONS>

        <FILTERS>
            <SomeFilter name="hi" selector="res_selector"/>
        </FILTERS>

        <MOVERS>
            <FastRelax name="fr" score_function="sfxn" task_operations="read_resfile"/>
        </MOVERS>

        <PROTOCOLS>
            <Stage num_runs_per_input_struct="50" total_num_results_to_keep="TODO">

                <Add mover="fr"/>
                <Add filter="hi"/>
                <Sort filter="TODO"/>

            </Stage>
        </PROTOCOLS>

    </Common>

</JobDefinitionFile>
```

[[También hay un método para convertir un multistage rosetta script de nuevo en un rosetta script tradicional, aquí|MRSTools#tools-and-utilities_script-converter_reverse-converter]]

##Esqueleto (incompleto)

Si de verdad quieres escribir un script desde cero en lugar de usar el conversor, aquí tienes un esqueleto.
Le faltan la mayoría de las secciones menos comunes de información del DataMap.

```xml
<JobDefinitionFile>
    <Job>
        <Input>
        </Input>
    </Job>

    <Common>
        <SCOREFXNS>
        </SCOREFXNS>
        <RESIDUE_SELECTORS>
        </RESIDUE_SELECTORS>
        <TASKOPERATIONS>
        </TASKOPERATIONS>
        <FILTERS>
        </FILTERS>
        <MOVERS>
        </MOVERS>
        <PROTOCOLS>
            <Stage>
                <Add/>
                <Sort/>
            </Stage>
            <Stage>
                <Add/>
                <Sort/>
            </Stage>
        </PROTOCOLS>
    </Common>
</JobDefinitionFile>
```

##Véase también

* [[Rosetta Scripts multietapa|MultistageRosettaScripts]]
* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

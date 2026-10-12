#MultistageRosettaScripts

#Herramientas y utilidades

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

[[_TOC_]]

##Conversor de scripts

Puedes convertir un RosettaScript tradicional al formato XML de Multistage Rosetta Scripts con el siguiente comando.
El script convertido se imprimirá en la consola si no se proporciona la opción `-job_definition_file`.
[[Consulta aquí|XML#conversion]] para más información y un ejemplo.

```
multistage_rosetta_scripts.default.linuxgccrelease -convert -parser:protocol existing_script.xml -job_definition_file new_script.xml
```

####Conversor inverso

También puedes convertir un Multistage Rosetta Script en un RosettaScript tradicional con
`-revert` o `-reverse_convert` (ambas hacen lo mismo).
Rosetta cargará el Multistage Rosetta Script con la opción `-job_definition_file`
e imprimirá la conversión en la consola o en el nombre de archivo definido por `parser:protocol`
si se proporciona esa opción.
Rosetta solo pasará al nuevo script los elementos de datos de `<Common/>`.

##Estimar la memoria

(ADVERTENCIA: Esto es experimental y por ahora tiende a subestimar en un factor de aproximadamente 2x)

Puede ser difícil saber de antemano cuántos nodos de archivo necesitas solicitar.
Para ayudarte, puedes ejecutar el siguiente comando y predecirá la cantidad total
de RAM que hay que dedicar a los nodos de archivo. 
Puedes dividir este total entre la cantidad de RAM por CPU
de tu sistema para calcular el número de nodos de archivo que debes solicitar.

También puedes ejecutar con la opción [[archivo en disco|RunningMRS]].

##Desarchivar

Si usas la opción [[archivo en disco|RunningMRS#archive_on_disk]],
puedes usar esta función para convertir archivos de archivo en archivos pdb
si quieres echar un vistazo a unos pocos resultados mientras el trabajo sigue en ejecución.


Supongamos que guardas tus resultados en un directorio llamado `archives`
y, por el motivo que sea, quieres ver `result_400_1`
(la convención de nombres de los resultados podría haber cambiado cuando leas esto).
Puedes ejecutar el siguiente comando y se creará el archivo `archives/result_400_1.pdb`

```
multistage_rosetta_scripts.default.linuxgccrelease -mrs:unarchive archives/result_400_1
```

##Plantilla XML

`-mrs:xml_template` imprime en la consola un esqueleto de plantilla XML, o en un archivo si se proporciona la opción `-job_definition_file`.

```
$> multistage_rosetta_scripts.default.linuxgccrelease -mrs:xml_template

<JobDefinitionFile>

    <Job>
        <Input>
            <PDB filename="TODO"/>
        </Input>
    </Job>
    <Common>

        <SCOREFXNS/>

        <RESIDUE_SELECTORS/>

        <TASKOPERATIONS/>

        <FILTERS/>

        <MOVERS/>

        <PROTOCOLS>
            <Stage num_runs_per_input_struct="TODO" total_num_results_to_keep="TODO">

                <Sort filter="TODO"/>

            </Stage>
        </PROTOCOLS>

    </Common>

</JobDefinitionFile>
```

##Información de movers, filtros, selectores de residuos y operaciones de tarea

Igual que en los RosettaScripts tradicionales, puedes pasar la opción `-info`
seguida del nombre de un mover, filtro, operación de tarea o selector de residuos, y Rosetta
imprimirá en la consola el esquema XML de ese elemento.

Por ejemplo, al ejecutar:

```
multistage_rosetta_scripts.default.linuxgccrelease -info Idealize
```

se obtiene

```
INFORMATION ABOUT MOVER "Idealize":

DESCRIPTION:

Idealizes the bond lengths and angles of a pose. It then minimizes the pose in a stripped-down energy function in the presence of coordinate constraints

USAGE:

<Idealize atom_pair_constraint_weight=(real,"0.0") coordinate_constraint_weight=(real,"0.01") fast=(bool,"false") chainbreaks=(bool,"false") report_CA_rmsd=(bool,"true") ignore_residues_in_csts=(residue_number_cslist) impose_constraints=(bool,"true") constraints_only=(bool,"false") pos_list=(int_cslist) name=(string)>
</Idealize>

OPTIONS:

"Idealize" tag:

	   atom_pair_constraint_weight (real,"0.0"):  Weight for atom pair constraints

	   coordinate_constraint_weight (real,"0.01"):  Weight for coordinate constraints

	   fast (bool,"false"):  Don't minimize or calculate stats after each idealization

	   chainbreaks (bool,"false"):  Keep chainbreaks if they exist

	   report_CA_rmsd (bool,"true"):  Report CA RMSD?

	   ignore_residues_in_csts (residue_number_cslist):  Ignore these residues when applying constraints

	   impose_constraints (bool,"true"):  Impose constraints on the pose?

	   constraints_only (bool,"false"):  Only impose constraints and don't idealize

	   pos_list (int_cslist):  List of positions to idealize

	   name (string):  The name given to this instance.

```

##Véase también

* [[Rosetta Scripts multietapa|MultistageRosettaScripts]]
* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta


#LigandBindingAssemblyMover#

LigandBindingAssemblyMover es un [[AppendAssemblyMover]] derivado, pensado para construir nuevos contactos con un ligando parcialmente coordinado y, al mismo tiempo, construir un nuevo esqueleto proteico con SEWING.

##Descripción

LigandBindingAssemblyMover toma un sitio de unión a ligando parcial y su ligando y, a partir de la información que proporciona el usuario sobre cómo debe coordinarse el ligando, añade nuevos elementos estructurales que podrán completar la coordinación del ligando con la geometría correcta. También realiza las mutaciones necesarias para esta coordinación y genera PDBInfoRemarks que indican todos los residuos coordinantes.

##Uso
**NOTA: Actualmente no está disponible, pero se actualizará automáticamente cuando se incorpore la nueva versión de SEWING.**

[[include:mover_LigandBindingAssemblyMover_type]]

###Definición del entorno de coordinación del ligando

La subetiqueta Coordination de la etiqueta Ligand (que está documentada [[aquí|AppendAssemblyMover#ligands]]) contiene dos tipos de información de coordinación del ligando. Primero, contiene el atributo "coordination_files", que proporciona una lista separada por comas de todos los archivos de coordinación del ligando (descritos más abajo) que se usarán para identificar los contactos del ligando. Segundo, proporciona información sobre la geometría preferida de cada átomo en forma de subetiquetas IdealContacts. **Cada átomo del ligando que forme nuevos contactos tendrá su propia subetiqueta IdealContacts.** 

####IdealContacts

La etiqueta IdealContacts de cada átomo define el nombre del átomo al que se aplica, sus longitudes de enlace preferidas («distance»), los ángulos de enlace alrededor del átomo («angle») y los ángulos diedros ideales alrededor del átomo, tal como se define en el esquema XML anterior. Ten en cuenta que los ángulos y diedros se aceptarán si son cualquier múltiplo del valor introducido; por ejemplo, si el usuario pide un ángulo de 90 grados, también se aceptarán ángulos de enlace de 180 grados. La subetiqueta también indica el número máximo de contactos o enlaces que debe formar el ligando, **incluidos los contactos existentes**.

El último atributo de la etiqueta IdealContacts, el umbral de puntuación de geometría, indica la tolerancia que LigandBindingAssemblyMover debe aplicar al puntuar la geometría de los contactos del ligando recién añadidos. Esta puntuación se calcula así:

```
geometry_score = (delta_distance)^2 + 10*(mod(angle, ideal_angle))^2 + 5*(mod(dihedral_1, ideal_dihedral_1))^2 + 5*(mod(dihedral_2, ideal_dihedral_2))^2
```

Ten en cuenta que todos los ángulos se convierten a radianes para este cálculo.

El umbral de puntuación de geometría recomendado varía según el entorno de coordinación de cada átomo del ligando. Por ejemplo, para un ion de zinc con dos contactos iniciales, un umbral de 5 da el mejor equilibrio entre buena geometría y alta tasa de éxito al añadir un tercer contacto, mientras que un umbral de 20 da los mejores resultados para un cuarto contacto.

####Archivos de coordinación del ligando

Consulta la documentación de la aplicación [[zinc_statistic_generator]] para más información sobre la generación de archivos de coordinación del ligando.

El formato de los archivos de coordinación del ligando se puede consultar [[aquí|SEWING Ligand Coordination Files]].

###Posprocesamiento

En muchos casos, los usuarios querrán añadir elementos estructurales adicionales con [[AppendAssemblyMover]] una vez que sus ligandos estén completamente coordinados. Esto puede hacerse con un mover independiente, para permitir un filtrado o inspección adicionales antes, o puede hacerse automáticamente dentro de LigandBindingAssemblyMover estableciendo la opción "build_site_only" en false. En ese caso, las opciones min_cycles y max_cycles indicarían la duración de la ejecución de AppendAssemblyMover (mientras que "binding_cycles" se usa para determinar la duración de la ejecución de LigandBindingAssemblyMover), y las opciones start_temperature y end_temperature controlarían la rampa de temperatura. Esta opción no se recomienda en la mayoría de los casos, porque AppendAssemblyMover suele funcionar mejor con probabilidades de añadir y eliminar y con temperaturas distintas de las de LigandBindingAssemblyMover. Para el refinamiento posterior a SEWING, consulta la página [[refinement of SEWING assemblies]].

##Ejemplo
A continuación se muestra un ejemplo de RosettaScript que usa LigandBindingAssemblyMover:

```xml
<ROSETTASCRIPTS>
  <SCOREFXNS>
  </SCOREFXNS>
  <RESIDUE_SELECTORS>
    <ResidueName name="select_zn" residue_name3=" ZN" />
  </RESIDUE_SELECTORS>
  <FILTERS>
  </FILTERS>
  <MOVERS>
    <LigandBindingAssemblyMover name="assemble" binding_cycles="20000" model_file_name="/nas02/home/g/u/guffy/netscr/sewing_with_zinc/input_files/smotifs_H_5_40_L_1_6_H_5_40.segment\
s" add_probability="0.05" delete_probability="0.05" hashed="false" segment_distance_cutoff="2" distance_cutoff="8.0" start_temperature="2.0" build_site_only="true" window_width="4" \
>
      <Ligands>
        <Ligand ligand_selector="select_zn" auto_detect_contacts="true" >
          <Coordination coordination_files="/nas02/home/g/u/guffy/netscr/sewing_with_zinc/input_files/H_NEW_stats.txt" geometry_score_threshold="5" >
            <IdealContacts ligand_atom_name="ZN" max_coordinating_atoms="3" angle="109.5" distance="2.2" dihedral_1="30" dihedral_2="120" />
          </Coordination>
        </Ligand>
      </Ligands>
      <AssemblyRequirements>
        <DsspSpecificLengthRequirement dssp_code="L" maximum_length="6" /> Prevents super-long loops                                                                                  
        <DsspSpecificLengthRequirement dssp_code="H" minimum_length="10" /> Prevents super-short helices                                                                              
        <ClashRequirement />
        <SizeInSegmentsRequirement maximum_size="9" minimum_size="5" />
        <LigandClashRequirement />
      </AssemblyRequirements>
    </LigandBindingAssemblyMover>
  </MOVERS>
  <APPLY_TO_POSE>
  </APPLY_TO_POSE>
  <PROTOCOLS>
        <Add mover_name="assemble" />
  </PROTOCOLS>
</ROSETTASCRIPTS>
```
##Pautas de uso

Como el espacio de muestreo de LigandBindingAssemblyMover está muy restringido, se recomienda usar valores de temperatura relativamente altos (entre 2.0 y 3.0) para asegurar un muestreo diverso. Ten en cuenta que este mover no realiza una rampa de temperatura; en cambio, el valor de max_temperature que especifica el usuario fija la temperatura de todo el protocolo. LigandBindingAssemblyMover también ignora las opciones min_cycles y max_cycles; en su lugar, el número de ciclos lo determina la opción ligand_binding_cycles. Se recomienda un valor de 20000 ciclos para añadir un único contacto con el ligando, a fin de asegurar una alta tasa de éxito.

Para evitar muestreo desperdiciado, se recomienda usar una distancia de segmento máxima de no más de dos. Ten en cuenta que este umbral cuenta el número de adiciones y no el número de segmentos añadidos, por lo que los archivos de segmentos con subestructuras mayores pueden tener requisitos distintos. También se recomienda una max_distance de 8.0 Å para evitar cálculos innecesarios en segmentos que no están lo bastante cerca para formar contactos con el ligando.
Los valores recomendados para el umbral de puntuación de geometría que especifica el usuario pueden variar mucho según el entorno de coordinación del átomo especificado. Las puntuaciones más bajas indican en general una geometría más ideal (y, por tanto, un umbral más estricto). Como estas puntuaciones incluyen ángulos y diedros entre todos los pares de contactos con el átomo en cuestión, la puntuación escala de forma no lineal con el número de contactos; por ejemplo, un valor de 5.0 es apropiado para un átomo con coordinación tetraédrica que forma un tercer contacto, mientras que un valor de 20.0 dará geometrías igualmente ideales al formar un cuarto contacto. Las desviaciones de la geometría de coordinación ideal en el sitio inicial también pueden aumentar las puntuaciones. Por eso se recomienda a los usuarios hacer algunos benchmarks para su caso de uso concreto antes de realizar simulaciones a gran escala.

##Véase también
* [[AssemblyMover]]
* [[AppendAssemblyMover]]
* [[SEWING]]







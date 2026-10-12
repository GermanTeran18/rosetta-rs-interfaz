#AppendAssemblyMover

AppendAssemblyMover es un [[AssemblyMover]] derivado que construye un ensamblaje SEWING a partir de una estructura inicial predeterminada.

[[_TOC_]]

##Descripción

AppendAssemblyMover se usa para incorporar un elemento funcional de una estructura nativa a una cadena principal más grande. Se usa sobre todo para diseñar compañeros de unión de una proteína usando un péptido de unión como estructura inicial. También se ha usado para diseñar cadenas principales de proteínas alrededor de un sitio de unión de ligando nativo.

##Uso
**NOTA: esto está actualmente desactualizado, pero se actualizará automáticamente cuando se incorpore la nueva versión de SEWING.**

[[include:mover_AppendAssemblyMover_type]]

###Compañeros de unión
AppendAssemblyMover permite a los usuarios especificar un PDB adicional como compañero de unión de su estructura inicial mediante el atributo partner_pdb del tag AppendAssemblyMover. La estructura proporcionada en este archivo PDB ya debe tener las coordenadas correctas respecto de la estructura inicial proporcionada a AppendAssemblyMover (no se hace docking ni minimización antes ni durante el protocolo). El ClashRequirement comprobará automáticamente si hay choques entre el ensamblaje y el compañero de unión.

En la mayoría de los casos, los usuarios también querrán incluir el PartnerMotifScorer en su conjunto de AssemblyScorers. Este scorer evalúa el posible empaquetado entre el ensamblaje y el compañero de unión. Además de los scorers y requisitos estándar recomendados, otros scorers y requisitos potencialmente útiles para trabajar con PDB de compañeros son:

* SubsetPartnerMotifScorer: Evalúa el posible empaquetado entre el ensamblaje y una región especificada del PDB del compañero

El atributo output_partner de AppendAssemblyMover (por defecto true) activa o desactiva que el compañero de unión se incluya en los archivos PDB de salida de AppendAssemblyMover. Ten en cuenta que el compañero de unión no se modifica ni se mueve durante el ensamblaje.


###Ligandos
El subtag Ligands es una función nueva de AppendAssemblyMover que permite a los usuarios designar residuos que no son de proteína de su estructura inicial como moléculas de ligando. AppendAssemblyMover almacena y rastrea qué residuos del nodo inicial están en contacto con el ligando y los designa automáticamente como residuos requeridos.

Si se incluyen ligandos en un ensamblaje, se recomienda encarecidamente incluir el LigandClashRequirement, ya que el ClashRequirement no detecta choques con ligandos. Los usuarios también pueden querer incluir el LigandScorer en su sección AssemblyScorers; este scorer evalúa el empaquetado hidrofóbico entre el ensamblaje y el ligando.

La sintaxis para definir un ligando es la siguiente:
```xml
<Ligands>
  <Ligand ligand_resnum="(&core::Size;)" ligand_selector="(&string;)" auto_detect_contacts="(true &bool;) pdb_conformers="(&string;) alignment_atoms="(&string;)>
    <Contact contact_resnum="(&core::Size;)" contact_atom_name="(&string;)" ligand_atom_name="(&string;)" />
    . . . (additional Contact subtags)
  </Ligand>
 . . . (additional Ligand subtags)
</Ligands>
```

Cada AppendAssemblyMover puede tener un subtag Ligands que puede contener uno o más subtags Ligand. Cada ligando se puede especificar con un número de residuo o con un selector de residuos. 

La opción auto_detect_contacts (por defecto true) indica que AppendAssemblyMover debe detectar automáticamente los contactos entre el ligando y la estructura inicial. Actualmente, solo se pueden detectar automáticamente los enlaces covalentes y los contactos proteína-metal (incluidos los contactos con átomos de metal en ligandos más grandes). Tenemos la intención de añadir en el futuro la detección de enlaces de hidrógeno. **Si auto_detect_contacts es false o si no existen contactos detectables, el usuario DEBE especificar manualmente al menos un contacto entre el ligando y la estructura inicial.**

Los contactos del ligando también se pueden especificar manualmente con subtags Contact. Cada tag Contact debe especificar los nombres de los dos átomos implicados en el contacto, así como el número de residuo dentro de la estructura inicial (numeración de Rosetta o de PDB) del residuo de contacto. 

AppendAssemblyMover también incluye compatibilidad con el muestreo de confórmeros del ligando. Para activar el muestreo de confórmeros hay que seguir tres pasos: 

1) El usuario debe establecer el atributo conformer_switch_probability del tag AppendAssemblyMover en un valor distinto de cero (el muestreo de confórmeros está desactivado por defecto).
2) El usuario debe proporcionar un archivo de texto con una lista de confórmeros PDB mediante el atributo pdb_conformers del tag Ligand. Cada archivo PDB debe contener una conformación del ligando, sin estructura ni residuos adicionales.
3) El usuario debe especificar tres nombres de átomos del ligando mediante el atributo alignment_atoms del tag Ligand. Estos átomos se usarán para superponer los confórmeros entre sí durante el cambio de confórmero. Se recomienda encarecidamente que el usuario seleccione átomos que conserven la geometría de los átomos implicados en contactos.

Si el muestreo de confórmeros está activado, se recomienda encarecidamente que el usuario incluya el KeepLigandContactsRequirement en el conjunto de requisitos. Este requisito asegura que el muestreo de confórmeros no aumente la distancia entre dos átomos de contacto por encima de cierto umbral definido por el usuario.

##Ejemplo
A continuación se muestra un ejemplo de RosettaScript que usa AppendAssemblyMover:

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
    <AppendAssemblyMover name="assemble" model_file_name="/nas02/home/g/u/guffy/smotifs_H_5_40_L_1_6_H_5_40.segments" add_probability="0.05" hashed="false" minimum_cycles="10000" maximum_cycles="20000" start_temperature="1.5" end_temperature="0.1">
      <Ligands>
        <Ligand ligand_selector="select_zn" auto_detect_contacts="true" />
      </Ligands>
      <AssemblyRequirements>
        <DsspSpecificLengthRequirement dssp_code="L" maximum_length="6" /> Prevents super-long loops, should be unnecessary with this segment file                                                                                                       
        <DsspSpecificLengthRequirement dssp_code="H" maximum_length="25" minimum_length="10" /> Prevents super-short helices                                                                                                                             
        <ClashRequirement />
        <LigandClashRequirement />
        <SizeInSegmentsRequirement maximum_size="9" minimum_size="5" />
      </AssemblyRequirements>
    </AppendAssemblyMover>
  </MOVERS>
  <APPLY_TO_POSE>
  </APPLY_TO_POSE>
  <PROTOCOLS>
        <Add mover_name="assemble" />
  </PROTOCOLS>
</ROSETTASCRIPTS>
```

##Véase también
* [[AssemblyMover]]
* [[LigandBindingAssemblyMover]] Se usa para añadir contactos nuevos a un ligando especificado
* [[SEWING]]
* [[LegacyAppendAssemblyMover]] La versión heredada de SEWING de este mover
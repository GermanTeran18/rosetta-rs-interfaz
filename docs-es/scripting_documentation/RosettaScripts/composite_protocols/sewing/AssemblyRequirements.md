#AssemblyRequirements

Los distintos AssemblyMovers usan los AssemblyRequirements para restringir los ensamblajes construidos de modo que tengan características específicas. A continuación se muestra una lista de los requisitos implementados actualmente. Los AssemblyRequirements son una subetiqueta de los AssemblyMovers y se enumeran dentro de una etiqueta AssemblyRequirements.

Para ver un ejemplo del uso de AssemblyRequirements, consulta la página [[AssemblyMover]].

[[_TOC_]]

###ClashRequirement
Un requisito que comprueba los residuos del ensamblaje entre sí para asegurar que no haya choques. ClashRequirement también comprueba si hay choques entre el ensamblaje y su pdb asociado, cuando corresponde. Este requisito admite dos opciones: ```maximum_clashes_allowed``` y ```clash_radius```. Para no permitir ningún choque en un radio de 5 Angstroms, la etiqueta sería así:

```xml
<ClashRequirement maximum_clashes_allowed="0" clash_radius="5" />
```

###DsspSpecificLengthRequirement
Un requisito que restringe la longitud de varios elementos de estructura secundaria del ensamblaje. Este requisito admite tres opciones: ```dssp_code```, ```minimum_length``` y ```maximum_length```. Por ejemplo, la siguiente etiqueta de requisito obligaría a que todos los segmentos alfa-helicoidales del ensamblaje tuvieran entre 4 y 10 residuos de longitud.

```xml
<DsspSpecificLengthRequirement dssp_code="H" minimum_length="4" maximum_length="10" />
```
###KeepLigandContactsRequirement
Un requisito que asegura que la distancia entre los átomos que participan en un contacto con un ligando no supere un valor especificado por el usuario. Normalmente se usa solo si el muestreo de confórmeros está habilitado. Este requisito admite un único atributo, contact_distance_cutoff, que indica la distancia en Angstroms a partir de la cual se considera roto un contacto (por defecto 2.5). El siguiente requisito fallaría si un átomo de contacto estuviera a más de 3 Angstroms de su átomo de ligando correspondiente:

```xml
<KeepLigandContactsRequirement contact_distance_cutoff="3.0" />
```

###SizeInSegmentsRequirement
Un requisito que restringe el tamaño del ensamblaje generado. Este requisito admite dos argumentos: ```minimum_size``` y ```maximum_size```. Para generar un ensamblaje con al menos 5 segmentos y como máximo 7, se usaría la siguiente etiqueta:

```xml
<SizeInSegmentsRequirement minimum_size="5" maximum_size="7" />
```

###LengthInResiduesRequirement
Un requisito que restringe la longitud (en residuos) del ensamblaje generado. Este requisito admite dos argumentos: ```minimum_length``` y ```maximum_length```. Para generar un ensamblaje con un máximo de 1200 residuos, se usaría la siguiente etiqueta:

```xml
<LengthInResiduesRequirement minimum_length="0" maximum_length="1200" />
```

###LigandClashRequirement
Un requisito que comprueba si hay choques entre los átomos del ligando y el ensamblaje. Este requisito admite dos opciones: ```maximum_clashes_allowed``` y ```clash_radius```. Para no permitir ningún choque en un radio de 4 Angstroms del ligando, la etiqueta sería así:

```xml
<LigandClashRequirement maximum_clashes_allowed="0" clash_radius="4" />
```

###NonTerminalStartingSegmentRequirement
Este requisito asegura que cualquier segmento inicial no sea terminal en el ensamblaje final. Normalmente se usa en ejecuciones de AppendAssemblyMover en las que quieres que se añadan segmentos tanto en el extremo N como en el extremo C del segmento o segmentos iniciales. Este requisito no admite ninguna opción y usa una etiqueta básica:

```xml
<NonTerminalStartingSegmentRequirement />
```

##Véase también
* [[SEWING]] La página principal de SEWING
* [[AssemblyMover]]
* [[AppendAssemblyMover]]
* [[AssemblyScorers]]
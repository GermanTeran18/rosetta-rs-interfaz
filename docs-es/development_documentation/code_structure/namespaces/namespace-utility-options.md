#Referencia del espacio de nombres utility::options

Sistema de opciones del programa.

Descripción detallada
---------------------

El paquete utility::options proporciona un sistema para representar y acceder al valor de las opciones del programa. Este sistema está diseñado para ser cómodo en sintaxis y en tipos, y para ser "enchufable", de modo que los módulos opcionales puedan añadir sus propias opciones. Se accede a las opciones mediante claves con nombre (consulta el paquete options::keys), lo que ofrece un alto nivel de seguridad de tipos y una búsqueda rápida.

**NOTA**: Las opciones y claves de opciones reales se encuentran en el espacio de nombres `basic::options`. El espacio de nombres `utility::options` constituye solo el sistema en sí.

Las opciones se especifican a las aplicaciones de la forma habitual, con las opciones escritas
directamente en la línea de comandos o en archivos indicados en la línea de comandos:
```
  application @flags_file -option1 -option2=value2
```

###Archivos de opciones (flags files) <a name="flagsfile" />

El archivo de opciones (llamado flags_file en el ejemplo anterior) puede contener cualquier número de opciones especificadas con su sintaxis habitual (p. ej. `in::file::s example.pdb` ), con cada opción en una línea aparte. Como alternativa, los espacios de nombres de opciones pueden anidarse dentro de otros espacios de nombres, como se muestra más abajo, con las opciones del mismo espacio de nombres en el mismo nivel de indentación. Por ejemplo, los dos conjuntos de opciones siguientes serían equivalentes:

```
-in::file::s example.pdb
-in::file::native native.pdb
-in::path::database path/to/Rosetta/database
-score::weights talaris2014
```

```
-in
   -file
      -s example.pdb
      -native native.pdb
   -path
      -database path/to/Rosetta/database
-score
   -weights talaris2014
```

También es perfectamente aceptable mezclar los dos estilos en el mismo archivo. Por ejemplo, el siguiente archivo también sería equivalente:

```
-in
   -file
      -s example.pdb
      -native native.pdb
-score::weights talaris2014
-database path/to/Rosetta/database
```

##Véase también

* [[Espacio de nombres utility|namespace-utility]]
  * [[utility::io|namespace-utility-io]]
  * [[utility::factory|namespace-utility-factory]] **YA NO EXISTE**
  * [[utility::keys|namespace-utility-keys]]
* [[Src index page]]: Descripción de la estructura de la biblioteca de Rosetta y de la organización del código en el directorio src
* [[Estructura de directorios de Rosetta|rosetta-library-structure]]: Descripciones del contenido de los principales subdirectorios del directorio `main` de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Development Documentation]]: La página principal de la documentación para desarrolladores

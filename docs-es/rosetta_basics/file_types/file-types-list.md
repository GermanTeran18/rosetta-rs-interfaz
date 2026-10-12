#Lista de tipos de archivo en Rosetta

* **[[Archivos de opciones|namespace-utility-options#flagsfile]]**: Archivo que se usa para especificar varias opciones en la línea de comandos con la sintaxis @flags_file.

##Formatos de entrada/salida de estructuras de proteína
* **[[PDB file]]**: Formato de archivo estándar para la entrada/salida de estructuras de proteína individuales. Consulta la información sobre los requisitos de los archivos PDB [[aquí|preparing-structures]].
* **[[Silent file|silent-file]]**: Útil para la entrada/salida de grandes cantidades de estructuras.

##Archivos de entrada de uso común
* **[[Archivos fasta|fasta-file]]**: Archivo para proporcionar información de secuencia.
* **[[Archivos de fragmentos|fragment-file]]**: De uso común en la predicción de estructuras.
* **[[Resfiles|resfiles]]**: Archivo para especificar los residuos que pueden diseñarse y reempaquetarse.
* **[[Archivos movemap|movemap-file]]**: Archivo (compatible con algunos protocolos; consulta la página para más detalles) para especificar qué ángulos de torsión y grados de libertad de cuerpo rígido podrán cambiar.
* **[[Archivos params de residuos|Residue-Params-file]]**: Almacena información química y geométrica de un residuo o ligando. Útil al ejecutar Rosetta con [[residuos que no son proteínas|non-protein-residues]].
* **[[Archivos de loops|loops-file]]**: Especifica las definiciones de loops usadas en el modelado de loops.
* **[[Archivo de simetría|Symmetry#Symmetry-definition]]**: Tratamiento de proteínas simétricas.
* **[[Constraint file]]**: Proporciona información sobre restricciones para su uso en un protocolo de Rosetta
* **[[FoldTree file]]**: Permite la definición externa de la conectividad de la Pose

##Archivos de entrada específicos de protocolos
* **[[Formato de alineamiento "Grishin"|Grishan-format-alignment]]**: Un formato de alineamiento de secuencias de proteínas usado en el modelado comparativo.
* **[[Archivos de restricciones de matching|match-cstfile-format]]**: Archivo que especifica restricciones geométricas para la [[aplicación match|match]].
* **[[Archivos de desplazamientos químicos|chemical-shift-file]]**: Información de desplazamientos químicos de RMN usada con [[CS-Rosetta|CS-Rosetta]].
* **[[Archivos de probabilidades de transición entre bins|Bin-transition-probabilities-file]]**: Probabilidades de pasar de un bin de torsión de la cadena principal a otro, usadas por algunos esquemas de muestreo.
* Archivos específicos de [[SEWING]]:
  * **[[Archivos de modelo|SEWING model files]]**: Especifican las subestructuras (nodos) que se usarán al generar estructuras
  * **Archivos de aristas**: Especifican las aristas que se usarán al generar estructuras
  * **Archivos Rot**: Almacenan información sobre las identidades de los residuos nativos en los ensamblajes de SEWING. Se usan con el AssemblyConstraintsMover.
<!--- BEGIN_INTERNAL -->
  * **Archivos de alineamiento**: Almacenan alineamientos precalculados cerca de un nodo de partida dado. Opcionales para su uso con [[AppendAssemblyMover]]. 
<!--- END_INTERNAL -->


##Entrada/salida de bases de datos
Rosetta admite la entrada/salida de bases de datos en SQLite3, MySQL y PostgreSQL. 
Puedes encontrar más información sobre la entrada/salida con estos formatos [[aquí|Database-IO]]. 
Puedes encontrar un tutorial sobre cómo enviar información a una base de datos en Rosetta [[aquí|Rosetta-Database-Output-Tutorial]].
La información específica sobre la interfaz con SQLite3 se encuentra [[aquí|sqlite3-interface]], y los detalles avanzados sobre la interfaz de Rosetta con bases de datos se encuentran [[aquí|database-support]]. 

##Véase también

* [[Rosetta Basics]]: La página de inicio de Fundamentos de Rosetta
* [[Options overview]]: Resumen de las opciones de línea de comandos de Rosetta
* [[Glossary]]: Definiciones breves de términos de Rosetta
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos adicionales de Rosetta.
* [[Rosetta overview]]: Resumen de los conceptos principales de Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

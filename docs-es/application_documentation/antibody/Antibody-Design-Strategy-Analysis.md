#Análisis de diseño de anticuerpos

![ ](https://github.com/RosettaCommons/documentation/blob/master/images/antibody_design_strat_analysis_main.png?raw=true)

El análisis de diseño de anticuerpos consta de dos partes: <code>analyze_antibody_design_strategy.py</code> y <code>compare_antibody_design_strategies.py</code>

Con el tiempo se trasladarán a Rosetta/tools/antibody/analysis

##Configuración

Los requisitos incluyen:
- PyRosetta
- Biopython
- Rosetta compilado
- Rosetta Tools
- Clustal Omega

- **Todos los decoys deben tener nombres únicos**

Se necesita un conocimiento básico de cómo editar el perfil de tu shell (si usas zsh, se puede editar en $HOME/.zshrc.  Si usas Bash en linux, el perfil está en $HOME/.bashrc; en mac, en $HOME/.bash_profile).  Recuerda: sin espacios antes ni después de los signos igual.  Hay más información al respecto por toda la web.  [esta](http://docs.oracle.com/cd/E19683-01/806-7612/6jgfmsvrq/index.html), por ejemplo.

### Configuración de PyRosetta
Descarga PyRosetta de <https://www.pyrosetta.org> o compílalo a partir de Rosetta en C++.
Añade el directorio de PyRosetta a tu path, ya sea ejecutando SetPyRosettaEnvironment.sh o añadiendo esto a tu bashrc/zshrc o al perfil de shell que uses, para que SetPyRosettaEnvironment se ejecute cada vez que abras una nueva shell (source path/to/SetPyRosettaEnvironment.sh). Esto es lo preferible.  Así podrás importar PyRosetta y los módulos asociados de PyRosetta Toolkit ubicados en pyrosetta/apps/pyrosetta_toolkit.

### Configuración de BioPython
Biopython se usa para cargar estructuras más rápido que PyRosetta y generar archivos FASTA combinados para ejecutar Clustal Omega.  PyRosetta es excelente, pero la memoria y la velocidad importan cuando tienes cientos o miles de estructuras.  

Para instalar Biopython, ejecuta <code>setup_biopython.sh</code>, que está en el directorio que contiene los scripts de análisis

### Configuración de Rosetta
Rosetta debe estar compilado.  Rosetta se usará para ejecutar los FeaturesReporters mediante RosettaScripts.  El directorio Rosetta/main/bin debe añadirse a tu path en el perfil de tu shell, y debes fijar la base de datos de Rosetta.  Así no tendrás que indicar la ruta de la base de datos al ejecutar Rosetta.  <code>export ROSETTA3_DB=path/to/Rosetta/main/database</code>

### Rosetta Tools
El repositorio Rosetta Tools debe [clonarse](https://github.com/RosettaCommons/tools) (para desarrolladores) o descargarse junto con el resto de Rosetta.
La ruta de este repositorio debe añadirse a tu pythonpath en el perfil de tu shell. Por ejemplo, yo añado esta línea a mi archivo zshrc: <code>export PYTHONPATH=$PYTHONPATH:/Path/to/Rosetta/tools</code>  Tendrás que hacer checkout de la rama antibody_tools hasta que yo la fusione en git. 

### Clustal Omega
Lo último que necesitas para ejecutar todo esto es Clustal Omega.  Sirve para crear alineamientos entre tus mejores diseños y entre tus estrategias.   Consulta <http://www.clustal.org/omega/> para ver las instrucciones de descarga.  El ejecutable binario de clustal debe renombrarse como clustal_omega, y el directorio en el que se encuentra debe añadirse a tu path, por ejemplo: <code>export PATH=$PATH:/path/to/Rosetta/bin</code>

## Análisis de estrategias de diseño de anticuerpos
Este script, <code>analyze_antibody_design_strategy.py</code>, analiza una estrategia a la vez.  Debes ejecutarlo desde el directorio en el que está.  Usa <code>./analyze_antibody_design_strategy.py --help</code> para ver las opciones disponibles.  En general, por ahora solo debería usarse para crear las bases de datos de FeaturesReporter. Estas tendrán un análisis de DG, energías, enlaces de hidrógeno, longitudes de CDR, etc. para cada PDB de la estrategia.  Es útil ejecutar el código mediante un script de shell para todas las estrategias que tengas, ya que se pueden lanzar en segundo plano para analizar varias ejecuciones de estrategias de forma simultánea. 

### Opciones obligatorias:
#### Entrada
La entrada puede ser un archivo txt con una lista de PDB o un directorio de PDB. 

- <code> --PDBLIST path/to/pdblist </code>
- - Este PDBLIST puede tener rutas completas o relativas a los PDB.  Si son relativas, se debe fijar la siguiente opción

- <code> --indir path/to/pdbs </code> 
- - Se debe fijar si quieres analizar un solo directorio (sin recursión) o si tienes rutas relativas en tu PDBLIST

- <code> --rosetta_extension linuxclangrelease for example </code>
- -  Esta es la extensión de Rosetta que se usará para llamar a RosettaScripts y crear las bases de datos de características. Por lo general tiene este formato: sistema - compilador - modo.  El sistema para mac es macos.  El compilador por defecto es gcc, pero puede ser clang en sistemas mac.  Release es mucho más rápido que debug.  Por qué el modo debug es el predeterminado es algo que se me escapa. 


### Salida
- <code> --outdir </code>
- - El directorio de salida, relativo o completo.  Si no existe, se crea.  Las bases de datos se colocarán en outdir/databases

- <code> --out_name </code>
- - El nombre de salida de la base de datos resultante.  

- <code> --out_db_batch </code>
- - El nombre del lote del experimento que irá a la base de datos resultante.

- <code> --score_weights talaris2013 </code>
- - Opcionalmente, fija un archivo de pesos que se usará al añadir características de puntuación o al volver a puntuar. Si tienes un parche, tendrás que crear en su lugar un archivo de pesos completo y colocarlo en la base de datos de Rosetta.  


### Opciones de análisis
Puedes ejecutar todo el análisis pasando la opción <code> --do_all </code>; sin embargo, no se recomienda porque volver a puntuar con PyRosetta tarda mucho.  Usaremos las puntuaciones generadas y escritas en la base de datos de características, además de generar los mejores modelos, escribir sesiones de pymol, etc., durante la comparación.  Se recomienda ejecutar los reporters de antibody_features en todos tus modelos, pero puedes ejecutarlos solo en los de mejor puntuación.  Consulta -help para ver más opciones de puntuación.  Esto no se recomienda, ya que tendrás que volver a puntuar todos los modelos antes de la ejecución. 


Recomendado:

- <code> --do_run_antibody_features_all </code>
 - Pásala para activarla.  Ejecuta AntibodyFeatures para crear bases de datos de la estrategia con todos los PDB

No recomendado:

- <code> --do_run_antibody_features_top </code>
- - Pásala para activarla.    Ejecuta AntibodyFeatures para crear bases de datos de la estrategia con los x mejores PDB.  Si no se ha vuelto a puntuar, lo hará.

- <code> --do_run_cluster_features_all </code>
- - Pásala para activarla. Ejecuta solo el reporter ClusterFeatures sobre todos los PDB de la lista o del directorio

- <code> --do_run_cluster_features_top </code>
- - Pásala para activarla. Ejecuta el reporter ClusterFeatures sobre los x mejores PDB de la estrategia.  Vuelve a puntuar la lista de PDB si es necesario.


## Comparación de estrategias de diseño de anticuerpos
Esta aplicación compara y entrega alineamientos, puntuaciones y sesiones a partir de diseños de anticuerpos ya analizados.  Cada estrategia debe tener asociada una base de datos de características. 
 
Ejecútala en el directorio donde está el programa, pasando opcionalmente la ruta completa o relativa al directorio principal de análisis. El programa buscará dentro de ese directorio un directorio llamado /databases.  Este se crea con el script de análisis. Si no se indica ninguna ruta, puedes fijarla en el menú File.

<code>./compare_antibody_design_strategies.py traztuzimab/strategy_analysis</code>

- Haz doble clic en una estrategia de la izquierda para pasarla al cuadro de la derecha y analizarla. Haz doble clic en una estrategia de la derecha para quitarla de la lista.  

- Selecciona Run Antibody Features para ejecutar el conjunto de scripts de R que grafican todos los datos disponibles y comparan las estrategias.  Esto puede tardar bastante.  Los Cluster Features se usan para la recuperación si se fija una base de datos de referencia en el menú File.  Se usa principalmente para benchmarking.

- - Advertencias: los cálculos de enlaces de hidrógeno pueden ser extremadamente lentos.  Si tardan demasiado, edita el archivo: <code> Rosetta/tools/antibody/analysis/antibody_features.json </code>.  Este archivo tiene la lista de todos los scripts de R que ejecutaremos para el análisis.  Elimina los scripts de enlaces de hidrógeno que veas, especialmente los de enlaces de hidrógeno intra-CDR.  Asegúrate de estar en una rama distinta si eres desarrollador.  Pronto añadiremos una opción para incluir o excluir los cálculos de enlaces de hidrógeno al ejecutar las comparaciones de características. 

### File
![ ](https://github.com/RosettaCommons/documentation/blob/master/images/antibody_design_strat_analysis_file.png?raw=true)

Aquí puedes fijar un nuevo directorio de análisis o añadir una nueva estrategia.  Si tienes un PDB de referencia, conviene fijarlo aquí.  Si usas una función de puntuación distinta de talaris2013, también debe fijarse aquí.  Se usa para buscar la base de datos de interés.  También puedes fijar el Top N.  Se usa en todo el programa y por defecto es 10.  Además, si tienes una base de datos de referencia (por ejemplo, 100 modelos relax del decoy nativo analizados en una base de datos de características con analyze_antibody_design_strategies), se fija aquí y se etiqueta como ref)

### Score
![ ](https://github.com/RosettaCommons/documentation/blob/master/images/antibody_design_strat_analysis_score.png?raw=true)

- Output Score Stats
- - Aquí analizamos las puntuaciones de todos los decoys de las estrategias seleccionadas y entregamos estadísticas, incluidos los promedios y las desviaciones estándar de esas puntuaciones (total, dG y dSASA), así como las de mejor puntuación, tanto combinadas (sobre todas las estrategias) como individualmente.  Con el tiempo podremos fijar términos de puntuación individuales para incluirlos en esta lista.  Espero llegar a esto pronto.  Opcionalmente, puedes copiar los de mejor puntuación a un nuevo directorio y crear con ellos una sesión de pymol que incluya cualquier anticuerpo nativo fijado. 

- Copy All Decoys
- - Esto copiará todos los decoys a un nuevo directorio, con nombres que reflejan las puntuaciones.  Además, puedes entregar los de mejor puntuación como una sesión de pymol, igual que en la otra opción.


### Clustal
![ ](https://github.com/RosettaCommons/documentation/blob/master/images/antibody_design_strat_analysis_clustal.png?raw=true)

Esto ejecuta Clustal Omega.  Puedes ejecutarlo sobre los mejores de cada tipo de puntuación (actualmente total_score, dG, dSASA), o sobre TODOS tus decoys.  Tendrás la oportunidad de añadir opciones adicionales de clustal cuando selecciones el botón para ejecutar.

- Set Max Processors
- - Fija el número máximo de procesadores que se usarán para Clustal Omega.

- Set Output Format
- - Clustal puede entregar muchos formatos.  El predeterminado es clustal.  

- Set Soft Wrap
- - Puedes fijarlo grande o pequeño, e indica a clustal que use solo una cantidad determinada de espacios al escribir la salida.  El valor por defecto es 100.  

Con el tiempo, entregaremos alineamientos de Clustal solo de los CDR de interés o del marco.  

### Enrichments
![ ](https://github.com/RosettaCommons/documentation/blob/master/images/antibody_design_strat_analysis_enrichments.png?raw=true)

- Recovery
- - Entrega las recuperaciones de longitud de CDR y de clúster respecto del anticuerpo de referencia fijado, para las estrategias combinadas y por separado.

- Alignments
- - Entrega los alineamientos de longitud de CDR y de clúster para las estrategias combinadas y por separado.

- Enrichment
- - No está implementado por ahora.  Con el tiempo dará información de enriquecimiento de cada longitud y clúster de CDR.  Quizá incluso información posicional derivada de clustal omega y de estadísticas de varios CDR.

### Filtros
Se accede a ellos desde el menú File.  Puedes fijar filtros de dG, dSASA y puntuación total que se usarán en todo el programa (salvo en los scripts de R de Antibody Features).  También puedes fijar filtros personalizados que usan la sintaxis de sqlite3.  Es útil para excluir ciertas longitudes o exigir un número mínimo de contactos con el antígeno.


##Véase también

* [[General Antibody Options and Tips]]
* [[PyRosetta]]: la página del wiki de PyRosetta
* [[Sitio web de PyRosetta (externo)|http://www.pyrosetta.org]]
* [[Antibody Applications]]: página principal de las aplicaciones de anticuerpos
    * [[Antibody protocol]]: la aplicación principal de modelado de anticuerpos
    * [[Antibody Python script]]: script de configuración de esta aplicación
    * [[Injerto de loops de CDR|antibody-assemble-cdrs]]: injerta plantillas de CDR de anticuerpos sobre la plantilla del marco para crear un modelo de anticuerpo aproximado.  
    * [[Modelado del CDR H3|antibody-model-CDR-H3]]: determina estructuras de anticuerpos combinando el docking VL-VH y el modelado del loop H3.
    - [[Docking de anticuerpos de camélidos|antibody-mode-camelid]]: hace el docking de anticuerpos de camélidos con sus antígenos.
    - [[SnugDock | snugdock]]: optimización de la estructura del paratopo durante el docking anticuerpo-antígeno
    * [[Antibody Design Strategy Analysis]]: una herramienta basada en PyRosetta para analizar o comparar estrategias de diseño de anticuerpos.
    * [[CDR Cluster Identification]]: una aplicación que asigna cada CDR de un anticuerpo a clústeres de CDR de North/Dunbrack según la menor distancia de diedros al centro de cada clúster.
     * [[CDR Cluster Constrained Relax]]: una aplicación para relajar CDR usando restricciones armónicas circulares basadas en los clústeres de CDR identificados.
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
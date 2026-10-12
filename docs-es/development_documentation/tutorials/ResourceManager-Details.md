Detalles del ResourceManager
============================

Documentación del ResourceManager
---------------------------------

La página de documentación del código con **doxygen** del ResourceManager 
describe la arquitectura y el diseño. La página [[ResourceManager]]
describe la implementación de los componentes.

### Desarrolladores

-   Matthew O'Meara
-   Andrew Leaver-Fay
-   Brian Weitzner

### Motivación

Ahora mismo es difícil introducir datos de recursos en un protocolo de Rosetta.
Un ejemplo que lo motiva es usar mapas de densidad electrónica al diseñar
varios andamios (scaffolds). Cada andamio requiere que su mapa de densidad se cargue
desde el disco y se haga accesible. A menudo hay varios resultados (hits) por
andamio que requieren ejecuciones de diseño separadas. Debido al costo de
cargar un mapa de densidad electrónica desde el disco, y a la gran
cantidad de memoria que ocupa una vez cargado, es deseable cargar el recurso
cuando se necesita y descargarlo cuando no. El gestor de recursos es un
sistema independiente del protocolo para gestionar datos estáticos y ponerlos
a disposición de los protocolos. Otros datos estáticos candidatos a ser gestionados
por el gestor de recursos son los Poses nativos, las restricciones experimentales,
los datos de desplazamiento químico, los fragmentos y los archivos de configuración, como las definiciones
de loops, los resfiles y las definiciones de simetría.

Los protocolos actuales abordan este problema de gestión de recursos con las
siguientes soluciones inadecuadas:

-   Sistema de opciones: El sistema de opciones representa las opciones que vienen de
    cosas como la línea de comandos. Está diseñado para ser una estructura
    estática una vez inicializada, y muchos lugares han aprovechado
    eso, por ejemplo leyendo solo durante una etapa de inicialización. Ser estático no permite especificar
    varios valores para un campo, lo que hace incómodo especificar varias instancias de
    un recurso.
-   Procesamiento por lotes de JD2: El sistema de lotes permite modificar el sistema
    de opciones entre distintas estructuras de entrada. Esto permite especificar varios
    recursos a costa de romper la propiedad de que el sistema de opciones
    es estático.
-   Lector de bases de datos: Un recurso se busca en una tabla de la base de datos mediante la
    etiqueta de entrada. Esto sigue exigiendo que el protocolo lleve la cuenta de la
    estructura una vez cargada.
-   DataCache: Los datos se pueden asociar a un Pose y buscarse
    después. Pero puede ser complicado transferir solo la información
    necesaria, por ejemplo entre distintos resultados para el mismo objetivo.
-   JD2::JobInputter: Se pueden crear JobInputters personalizados para gestionar distintos
    tipos de datos de entrada; sin embargo, JD2 está diseñado para dividir las ejecuciones según
    el tipo de entrada, así que resulta enrevesado usarlo para cargar varios
    tipos de datos.

### Objetivos de diseño

-   Permitir a los usuarios especificar recursos de datos externos y opciones que se
    usarán con trabajos concretos
-   Permitir a los desarrolladores de protocolos solicitar recursos fácilmente y obtener recursos
    totalmente inicializados
-   Desacoplar el sistema de opciones de los protocolos para permitir que se usen distintas
    opciones de configuración de protocolo para distintos trabajos
-   Controlar el ciclo de vida de los recursos compartidos para ahorrar memoria

### Tareas de software

TODO:

-   Terminar la página de doxygen
-   Añadir ResourceLocators
    -   SerializationLocator
    -   SilentFileLocator

-   Añadir ResourceLoaders
    -   ResfileLoader (hm, complicado porque el análisis del resfile no está
        separado de su aplicación a un Pose)
    -   FragFile
    -   Constraints
    -   SilentFile (todas las distintas versiones)

Sintaxis de las definiciones de recursos
========================================

Formato XML "esqueleto"
-----------------------

       <JD2ResourceManagerJobInputter>
           <ResourceLocators>
                Describe data stores where resources are located
           </ResourceLocators>
           <ResourceOptions>
                 Describe options needed to initialize and configure resources
           </ResourceOptions>
           <Resources>
                 Define how resource should be loaded
           </Resources>
           <Jobs>
                 Define jobs by indicating resources and options.
           </Jobs>
       </JD2ResourceManagerJobInputter>

Una vez preparado el archivo de definición de recursos, se puede especificar
en la línea de comandos de un protocolo concreto con la opción
-resource\_definition\_files. A continuación hay un ejemplo.

    loopmodel.macosclangrelease @flags -resource_definition_files test.xml

Un ejemplo comentado
--------------------

Un trabajo (job) es la ejecución única de un protocolo, por ejemplo un
protocolo de RosettaScripts o un Mover distribuido mediante el distribuidor de
trabajos JD2. Este ejemplo configura un único trabajo llamado `1xu1FH_D` que
usa como estructura inicial el archivo pdb `1xu1FH_D.pdb` del
directorio `/path/to/input/pdbs` y usa el archivo de definiciones de simetría
`1xu1FH_d.symm`.

    <JD2ResourceManagerJobInputter>

           <ResourceLocators>
                   Each ResourceLocator provides a locator_id -> istreams map to initialize a resource

                   <FileSystemResourceLocator tag="startstruct_locator" base_path="/path/to/input/pdbs"/>
                   The "startstruct_locator" takes path relative to /path/to/input/pdbs
                   and returns the contents of the file. This is referenced below in the
                   Resources block to initialize the starting structure.

                   <FileSystemResourceLocator tag="symmetry_definition_locator" base_path="/path/to/input/symmetry_definitions"/>
                   The "symmetry_definitions_locator" takes a path relative to
                  /path/to/input/symmetry_definitions and returns the contents of the file.
                   This is referenced below in the Resources block to initialize the starting structure.

           </ResourceLocators>

           <ResourceOptions>
                   Each ResourceOptions defines non-default options for how a resource
                   should be constructed from the istream input provided by the ResourceLocator

                   <PoseFromPDBOptions tag="pdb_options" ignore_unrecognized_res=1/>
                    The "pdb_options" is a PoseFromPDBOptions and is used when loading
                    a pose from data in the protein databank PDB format. Here, residues that
                    are not recognized are ignored. Alternatively, the non-standard residue types
                    can be loaded on a per-job basis in the jobs section.

           </ResourceOptions>

           <Resources>
                   A Resource is a fully constructed object whose lifetime and availability
                   is managed by the ResourcManager.

                   <PoseFromPDB tag="1xu1FH_D_startstruct" locator_tag="startstruct_locator" locatorID="1xu1FH_D.pdb" resource_options=pdb_options/>
                   The "1xu1FH_D_startstruct" resource is a Pose object that is Rosetta's
                   central representation of a structure and stores the conformation and
                   energy information. In this case, the Pose is constructed from the pdb file
                   provided by the "startstruct_locator" using "1xu1FH_D.pdb" as the relative path.
                   It uses the "pdb_options" as configuration options for how the pose should
                   be constructed from the pdb file.

                   <SymmData tag="1xu1FH_D_symmetry_definition" locator_tag=symmetry_definition_locator locatorID="1xu1FH_D.symm"/>
                   The "1xu1FH_D_symmetry_definition" resource is a SymmData object that
                   is used to convert an asymmetric unit into a symmetric conformation.
                   The symmetry definition file is created using the perl script in
                   main/source/src/apps/public/symmetry/make_symmdef_file.pl.  

           </Resources>

           <Jobs>
            A job is a unit of work that is processed by the JD2 Job distributor. In this block,
            resources defined in the Resources block are mapped to resource descriptions
            that can be referenced from within the protocol. All jobs must provide the same
            resource descriptions, but can refer to different resources.   All jobs must also contain 
            one field specifying the starting pdb with a data description "startstruct" 

                   <Job name="1xu1FH_D">
                   This job has name "1xu1FH_D". If it produces pdb output, it will have
                   the filename 1xu1FH_D_0001.pdb.
                   
                           <Data desc="startstruct" resource_tag=1xu1FH_D_startstruct/>
                           This tag maps the Pose resource with tag "1xu1FH_D_startstruct"
                           defined in the Resources block to the resource description "startstruct".
                           The "startstruct" resource description is referenced by the JD2 resource
                           manager to be the input Pose for the protocol.

                           <Data desc="symmdata" resource_tag=1xu1FH_D_symmetry_definition/>
                           This tag maps the SymmData resource with tag 
                           "1xu1FH_D_symmetry_definition" defined in the Resources block to the
                           resource description "symmedata". This can be referenced, for example in
                           RosettaScripts with the mover tag <SetupForSymmetry name=(&string)
                           resource_description=symmdata/>.

                   </Job>

           </Jobs>

    </JD2ResourceManagerJobInputter>

ResourceLocators
----------------

Un *ResourceLocator* se usa para interactuar con un almacén de datos y proporcionar
una correspondencia entre *LocatorID* e *istream*. Los resource locators se pueden definir en
el bloque de etiquetas *ResourceLocators'*

       <ResourceLocators>
          <(resource_locator_type) locator_tag=(&string)  (other options to be processed by the resource_locator_type)/>
          ....
       </ResourceLocators>

Por ejemplo, para definir un resource locator que busque archivos en el sistema
de archivos,

       <FileSystemResourceLocator locator_tag="filesys"/>

Por defecto, se crea un FileSystemResourceLocator con la etiqueta de locator "".

### NullResourceLocator

Para los recursos que se pueden inicializar desde cero, el
**NullResourceLocator** es un marcador de posición. Por ejemplo, el
DatabaseSessionResource no lee de un almacén de datos, así que puede
usar el NullResourceLocator

       <NullResourceLocator tag=(&string)/>

### FileSystemResourceLocator

El resource locator del sistema de archivos actúa como una correspondencia: **nombre de archivo** --\> **contenido
del archivo**.

       <FileSystemResourceLocator tag=(&string)/>

Un locator\_id usa la siguiente ruta de búsqueda: primero busca en el
directorio de trabajo actual y luego en los valores especificados con la
opción `-in:path`. Si el nombre del archivo termina en `.gz`, intentará abrir el
archivo como si fuera un archivo gzip con la biblioteca `izstream`.

### DatabaseResourceLocator

El resource locator de bases de datos actúa como una correspondencia: **columna clave** --\> **columna
de valor** en una tabla de resultados de SQL.

       <DatabaseResourceLocator tag=(&string) database_session_tag=(&string) sql_command="SELECT ... ;"/>

-   El `database_session_tag` debe hacer referencia a un
    *resource\_tag* definido previamente en un bloque \<Resources/\>.
-   El `sql_command` debe tener un único *?* que se sustituye por
    el locator\_id.

Como ejemplo, supongamos que rosetta\_inputs.db3 tiene una única tabla

       CREATE TABLE  pdb_file (pdb_code TEXT, pdb_file TEXT, PRIMARY KEY(pdb_code));

Entonces el siguiente archivo de definiciones de recursos carga el contenido de *pdb\_file*
de la fila con *pdb\_code* '1xu1FH\_D' en la descripción de recurso
'startstruct'. Hay una versión completa y funcional de este ejemplo en
la prueba de integración *resource\_database\_locator*.

        <JD2ResourceManagerJobInputter>                                                                                                                                        
            <ResourceOptions>
                <DatabaseSessionOptions tag="input_db_options" database_mode="sqlite3" database_name="rosetta_inputs.db3"/>
            </ResourceOptions>
            <Resources>
                <DatabaseSession tag="rosetta_inputs_db" options="input_db_options" locator=NULL/>
            </Resources>                                                                                                                                                   
                                                                                                                                     
            <ResourceLocators>
                 <DatabaseResourceLocator tag="starting_structures" database_session_tag="rosetta_inputs_db" sql_command="SELECT pdb_file FROM starting_structures WHERE pdb_code = ?;"/>
            </ResourceLocators>

            <Resources>
                <PoseFromPDB tag="1xu1FH_D_starting_struct" locator=starting_structures locatorID="1xu1FH_D"/>
            </Resources>

            <Jobs>
                 <Job name=1xu1FH_D>
                      <Data desc=startstruct resource_tag=1xu1FH_D_starting_struct/>
                  </Job>
            </Jobs>
        </JD2ResourceManagerJobInputter>

### FileListResourceLocator

El FileListResourceLocator acepta como cadena de locator una lista de rutas
a archivos, separadas por espacios (no por tabuladores). Estos archivos se
concatenan luego en un único archivo. Esto es especialmente útil en estudios de docking,
ya que una lista de PDBs se puede concatenar en un único Pose. Hay un
ejemplo funcional en la prueba de integración file\_list\_locator.
A continuación hay un ejemplo de sintaxis:

    <JD2ResourceManagerJobInputter>
      <ResourceLocators>
        <FileListResourceLocator tag="file_list"/>
      </ResourceLocators>
      <Jobs>
        <Job name="example" nstruct="1">
          <Data desc="startstruct" pdb="partner_1.pdb partner_2.pdb" locator="file_list"/>
        </Job>
      </Jobs>
    </JD2ResourceManagerJobInputter>

ResourceLoaders
---------------

Un *ResourceLoader* se encarga de construir e inicializar un objeto
a partir de un istream proporcionado por el ResourceLocator y de unas *ResourceOptions*
específicas del *ResourceLoader*.

       <Resources>
           General Form:
           <(resource_loader_type) resource_tag=(value of locator_id &string) locator_tag=("" &string) locator_id=(&string) options=(default options &string)/>

           File Resource Shortcut:
           <(resource_loader_type) resource_tag=(value of locator_id &string) file=(&string) options=(default options &string)/>
       </Resources>

El **resource\_tag** se referencia en el bloque **Jobs**. Si no se especifica el valor
de *resource\_tag*, se usa el valor del locator\_id.

### DatabaseSessionLoader

Crea un objeto **utility::sql\_database::sessionOP**.

       <DatabaseSession [standard ResourceLoader items]/>

Ten en cuenta que este recurso puede usar el `NullResourceLocator`.

       <DatabaseSessionOptions tag=(&string) database_connection_options/>

### ElectronDensityLoader

Crea un objeto **core::scoring::electron\_density::ElectronDensityOP**
a partir de un mapa de densidad electrónica MRC o CCP4.

       <ElectronDensity [standard ResourceLoader items]/>

       <ElectronDensityOptions tag=(&string) mapreso=(3.0 &real) grid_spacing=(0.0 &real)/>

La documentación sobre la puntuación con mapas de densidad electrónica está disponible en la página
[[Puntuación de estructuras con densidad electrónica|density-map-scoring]]. 

**NOTA:** El término de energía *electron\_density* busca un
recurso ElectronDensity con la descripción `electron_density` y
no lo encontrará de otro modo.

### LoopsFileLoader

Crea un objeto **protocols::loops::LoopsFileDataOP** a partir de un archivo de loops.

       <LoopsFile [standard ResourceLoader items/>

       <LoopsFileOptions tag=(&string) prohibit_single_residue_loops=(1 &bool)/>

### PoseFromPDBLoader

Crea un objeto **core::pose::PoseOP** a partir de un archivo pdb.

       <PoseFromPDB [standard ResourceLoader items]/>

       <PoseFromPDBOptions tag=(&string) termini=(1 &bool) exit_if_missing_heavy_atoms=(0 &bool) ignore_unrecognized_res=(0 &bool) ignore_waters=(0 &bool) ignore_zero_occupancy=(0 &bool) keep_input_protonation_state=(0 &bool) preserve_header=(0 &bool) randomize_missing_coords=(0 &bool) remember_unrecognize_res=(0 &bool) remember_unrecognized_waters=(0 &bool) treat_residues_in_these_chains_as_separate_chemical_entities=(" " &string)/>

### SymmDataLoader

Crea un objeto **core::conformation::symmetry::SymmDataOP** a partir de un
archivo de definiciones de simetría.

       <SymmData [standard ResourceLoader items]/>

      <SymmData tag=(&string)/>

### ResidueTypeLoader

Un ResidueTypeLoader inserta un archivo params en el gestor químico cuando
se inicia un trabajo que requiere ese archivo params. Los recursos ResidueType se
asocian a los trabajos mediante la subetiqueta ResidueType (consulta el
ejemplo más abajo). Cuando ningún trabajo pendiente necesita ya el archivo params,
este se descarga del gestor químico. Esta carga perezosa solo
se aplica a los ResidueTypes introducidos mediante el ResidueTypeLoader. Los residuos
por defecto especificados en la base de datos o mediante las opciones normales de la línea de comandos
no se ven afectados. Hay un ejemplo funcional de este código en la prueba de integración
residue\_data\_resource. A continuación hay un ejemplo de sintaxis:

Nota: Por el momento, solo se puede asociar un único ResidueType
a cada trabajo.


    <JD2ResourceManagerJobInputter>
        <Resources>
            <ResidueType file="new_residue.params"/>
        </Resources>
        <Jobs>
            <Job name="new_job">
                <Data desc="startstruct" pdb="input.pdb"/>
                <ResidueType resource_tag="new_residue.params"/>
            </Job>
        </Jobs>
    </JD2ResourceManagerJobInputter>

Descripciones de recursos
=========================

Propósito
---------

En esta sección se reúne la lista de todas las descripciones de recursos
admitidas, el Resource al que corresponden y sus clases
FallbackConfiguration asociadas

core
----

protocols
---------

-   "LoopsFile" corresponde a un objeto protocols::loops::LoopsFile. Su
    fallback es protocols::loops::LoopsFileFallbackConfiguration

Escribir pruebas unitarias
==========================

(añadido por Rebecca Alford)

Entonces has escrito algunos resource loaders, pero ahora te gustaría
cargar esos recursos en una prueba unitaria. Para hacerlo, sigue estos pasos:

1. Añade la definición XML de tus recursos a la prueba como una cadena (me pareció
más limpio ponerla en una función y devolverla)

       /// @brief Job String
       "<JD2ResourceManagerJobInputter>\n"
       "  <ResourceLocators>\n"
       "    <FileSystemResourceLocator tag=1afo base_path=\"core/membrane/io/\" />\n"
       "  </ResourceLocators>\n"
       "  <Resources>\n"
       "    <PoseFromPDB tag=1afo_startstruct locator=1afo locatorID=\"core/membrane/io/1afo_test.pdb\" />\n"
       "    <LipoFile tag=1afo_lips locator=1afo locatorID=\"core/membrane/io/1afo_test.lips\" />\n"
       "  </Resources>\n"
       "  <Jobs>\n"
       "    <Job name=membrane>\n"
       "      <Data desc=\"startstruct\" resource_tag=1afo_startstruct />\n"
       "      <Data desc=\"lipids\" resource_tag=1afo_lips />\n"
       "    </Job>\n"
       "  </Jobs>\n"
       "</JD2ResourceManagerJobInputter>\n";

2. Rellena un trabajo (consulta JD2JobDistributorSImilifiedInput.cxxtest.hh)

3. Usando un gestor de recursos perezoso (lazy resource manager), carga tu recurso por la etiqueta del trabajo
    (especifica la **descripción de los datos** (no la etiqueta del recurso) y la etiqueta del trabajo)

4. Usa el patrón:

      if (! lazy_resource_manager->has_resource_tag_by_job_tag("lipids", "membrane"))
              {
                  throw utility::excn::EXCN_Msg_Exception(" Either a resource definition file or the command line option "\
                                                          "-in:file:lipofile must be specified");
              }
      basic::resource_manager::ResourceOP lipids = lazy_resource_manager->get_resource_by_job_tag( "lipids", "membrane" );

5. Convierte (downcast) a tu tipo de recurso

       core::membrane::util::LipidAccInfoOP lips_exp = dynamic_cast< LipidAccInfo * >( lipids () );

(Nota: esta sección hace referencia a código de mi rama -
rfalford12/membrane\_frmwk\_w\_db en
test/core/membrane/io/LoadAllResourcesTest.cxxtest.hh)

Posibles preguntas frecuentes
=============================

(añadido por Rebecca Alford)

Para añadir locators, options, loaders y configuraciones fallback,
recuerda registrar tus nuevas clases en los archivos init.ihh adecuados
de protocols/init. Creo que también se pueden registrar en core, pero
a mí no me funcionó. 2. Ten cuidado al copiar código repetitivo (boilerplate) del gestor de recursos.
Algunas plantillas tienen una semilla de RG fija y, si olvidas
cambiarla, todo tu conjunto de pruebas unitarias se caerá. No puede haber dos
semillas equivalentes.

##Véase también

* [[Página principal del ResourceManager|ResourceManager]]
* [[Página de inicio de los tutoriales de desarrollo|devel-tutorials]]
* [[Development Documentation]]: La página de inicio de la documentación para desarrolladores
* [[Application Documentation]]: Información sobre las aplicaciones existentes de Rosetta
* [[RosettaScripts]]: Instrucciones para escribir RosettaScripts, la interfaz XML de Rosetta
* [[Uso del distribuidor de trabajos|jd2]]
* [[RosettaEncyclopedia]]: Descripciones detalladas de conceptos de Rosetta.
* [[Running Rosetta with options]]: Instrucciones para ejecutar los ejecutables de Rosetta


<!--
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager
Resource Manager ResourceManager-->

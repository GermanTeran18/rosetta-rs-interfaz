# ReadResfileFromDB
*Volver a la página de [[TaskOperations|TaskOperations-RosettaScripts]].*
## ReadResfileFromDB

Busca el resfile en la base de datos relacional proporcionada. Es útil para procesar estructuras distintas con resfiles distintos en el mismo protocolo. La base de datos *db* debe tener una tabla *table\_name* con el esquema siguiente:

        CREATE TABLE <table_name> (
            tag TEXT,
            resfile TEXT,
            PRIMARY KEY(tag));

Cuando se aplica esta TaskOperation, intenta buscar la cadena *resfile* asociada con el *tag* definido por

        JobDistributor::get_instance()->current_job()->input_tag()

Esta TaskOperation toma los parámetros siguientes:

-   **[[database_connection_options|RosettaScripts-database-connection-options]]** : Opciones para conectarse a la base de datos relacional
-   table=("resfiles" &string)


##Véase también

* [[RosettaScripts|RosettaScripts]]: uso de RosettaScripts
* [[Task Operations | TaskOperations-RosettaScripts]]: otras TaskOperations de RosettaScripts
* [[Convenciones en RosettaScripts|RosettaScripts-Conventions]]
* [[I want to do x]]: guía para realizar perturbaciones estructurales específicas con RosettaScripts
* [[Interfaces de scripting|scripting_documentation/Scripting-Documentation]]: otras formas de interactuar con Rosetta de manera personalizable
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Rosetta on different scales]]: pautas para escalar tus ejecuciones de Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta

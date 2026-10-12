#Convenciones de la base de datos

[[_TOC_]]

##Añadir archivos y datos a la base de datos de Rosetta
Las actualizaciones de archivos de la base de datos y la adición de archivos nuevos deben ir acompañadas de información sobre los datos añadidos.  Esta puede ser un comentario en el archivo o un archivo notes.txt que lo acompañe.  Los metadatos deben abordar lo siguiente:

* Cómo se generó el archivo.
* De dónde provienen los datos.
* Para qué sirve el archivo.
* Qué formato tiene el archivo (columnas, filas, etc.).

##Añadir pesos y parches de ScoreFunction a la base de datos de Rosetta
Los pesos y parches nuevos deben incluir comentarios con el siguiente formato.  Toda la información debe llevar # al principio de la línea.  Si encuentras uno que no tiene esta información y la conoces, ¡añádela!  Para una descripción más detallada, consulta la página sobre cómo añadir un [[nuevo método de energía|new energy method]]

* #@reference: enumera las referencias asociadas a la función de puntuación o que la describan.

* #@author:  indica tu información de contacto.

* #@purpose: indica el propósito general de la función de puntuación o del parche.  En general, responde a la pregunta '¿Por qué está aquí?'.  
¿Cuándo será beneficioso usarla? En el caso de los parches, ¿qué funciones de puntuación debe parchear?

* #@applications: si no es una función de puntuación general, enumera las aplicaciones para las que se diseñó la función de puntuación.

* #@limitations: describe dónde y cuándo no se recomienda la función de puntuación y por qué. 
Describe los sistemas moleculares (ADN, polímeros, ligandos) con los que no funcionará o no funcionará bien. 
Indica si es experimental y no es de uso general. 
Indica si es solo para Poses centroid, si no se indica en el nombre del archivo.

* #@tips: incluye cualquier consejo que pueda ser útil para un desarrollador o usuario. 
Ejemplos: ¿La función de puntuación requiere una opción específica (-add_orbitals)?  ¿Requiere una dependencia externa? ¿Debe usarse con ella una EnergyMethodOption? 

###Información adicional:
Esta es información adicional que puede ser útil incluir.
* #@optimization: ¿Se ha optimizado la función de puntuación?  ¿Cómo?

* #@updates: ¿Se ha actualizado la función de puntuación y/o los pesos?  ¿Por qué?

##Véase también

* [[Database]]: la base de datos de Rosetta
* [[Tutoriales de desarrollo|devel-tutorials]]
* [[Database IO]]: uso de Rosetta con bases de datos SQL (no la base de datos de Rosetta)
* [[Development documentation]]

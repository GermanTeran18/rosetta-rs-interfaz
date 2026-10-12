#Structure-Set-Fragment-Picker

Metadatos
========

Autores:  
Ingemar André (ingemar.andre@biochemistry.lu.se)  
Sebastian Rämisch (raemisch@scripps.edu)  

Investigador principal responsable: Ingemar André  

Última edición: 26/10/15.

Código 
====

-   Código fuente de la aplicación: `        rosetta/main/source/src/apps/public/struc_set_fragment_picker.cc       `

Referencias
==========

Este generador sencillo de conjuntos de fragmentos se usó por primera vez en:

Sebastian Rämisch, Robert Lizatovic and Ingemar André,   
**Exploring alternate states and oligomerization preferences of coiled-coils by de novo structure modeling**,  
*Proteins* (2015)  
http://onlinelibrary.wiley.com/doi/10.1002/prot.24729/abstract;jsessionid=3B2AAEB6FBFDD42007B1A8DF5EABEA41.f04t03

Propósito
===========================================

Genera conjuntos de fragmentos para el modelado de estructuras de proteínas con Rosetta, usando como fuente de fragmentos un conjunto predefinido de estructuras de proteínas. Los fragmentos se eligen **al azar** de un conjunto de estructuras, **sin importar la secuencia ni la estructura secundaria**.
*La intención original era predecir estructuras de coiled-coil usando exclusivamente fragmentos tomados de estructuras de coiled-coil.*  

Algoritmo
==========

Primero se generan todos los fragmentos posibles a partir de un conjunto dado de archivos PDB. Luego, para cada posición de la secuencia objetivo, se elige al azar un conjunto de fragmentos (por defecto, 200). En ningún momento se consideran la estructura secundaria ni la secuencia.

Notas
======
* No usa el esquema de puntuación del selector de fragmentos estándar
* **No funciona con JD2**

Cómo ejecutarlo
===========================================
1. Descarga a un directorio todos los archivos pdb que quieras usar como fuente. 
2. Prepara un archivo de lista que contenga ruta/nombre.pdb de cada estructura fuente (ver más abajo)
3. Ejecuta struct_set_fragment_picker

Entrada
=====
El único archivo de entrada es una lista con los nombres de los pdb que se van a usar. Por ejemplo:   
```
input/struct_files/1e5t.pdb
input/struct_files/3tg7.pdb
input/struct_files/2guv.pdb
...
```

Opciones
============================================

| Opción | Explicación |
| --- | --- | --- |
| -in::file::l <list file>    | lista de estructuras |
| -frags:n_frags | número de fragmentos por posición (opcional; por defecto = 200) |
| -struc_set_fragment_picker::frag_length <int> | Longitud del fragmento. Normalmente 3 o 9. |
| -struc_set_fragment_picker::sequence_length <int> | Longitud de la secuencia objetivo. |
| -struc_set_fragment_picker::frag_name <string> | Nombre del archivo de fragmentos de salida. Normalmente de 5 caracteres.|

Salida
======
La salida es un archivo de fragmentos estándar de Rosetta, para usarlo en la predicción de estructuras.

Novedades desde la última versión
=============================

Esta es la primera versión pública

## Véase también

* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Selector de fragmentos | app-fragment-picker]]: selección estándar de fragmentos
* [[fragment-file]]: archivos de fragmentos
* [[Selector de fragmentos antiguo | fragment-picking-old]]: el selector de fragmentos antiguo.
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
#MultistageRosettaScripts

#Ejecutar Multistage Rosetta Scripts

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

[[_TOC_]]

##Compilar M.R.S. con MPI

Para ejecutar con mpi, también hay que compilar con serialización:

```sh
./scons.py -j<number of cores> mode=release extras=mpi,serialization bin
```

El ejecutable tendrá un nombre parecido a `multistage_rosetta_scripts.mpiserialization.linuxgccrelease`

##Opciones de línea de comandos relevantes

###job_definition_file

`-in:file:job_definition_file <filename>`

Es similar a `-parser:protocol` en los RosettaScripts tradicionales.
Así es como le pasas tu script a Rosetta.

###n_archive_nodes

`-jd3:n_archive_nodes <int>` (por defecto es 0, lo que significa que los archivos se guardan en el nodo maestro)

No todas las CPU que uses ejecutarán realmente tu script.
Una será la «maestra» y controlará la distribución de trabajos y el almacenamiento de resultados.
Puede que haya demasiados resultados de trabajos para caber en la memoria de este nodo.
Si es así, puedes solicitar nodos de archivo adicionales con esta opción.

Es difícil saber de antemano cuánta memoria necesitarás.
M.R.S. tiene una [[utilidad de estimación de la memoria de archivo|MRSTools#estimate-memory]],
pero sigue siendo experimental y suele subestimar los requisitos de memoria.
La siguiente opción se introdujo por esta dificultad:

###archive_on_disk

`-jd3:archive_on_disk <directory name>`

Los requisitos de memoria de archivo (ver la sección anterior) son difíciles de predecir
y si los subestimas el programa se detiene.
Por este comportamiento poco amigable,
añadimos la opción de guardar los resultados de los trabajos en disco.
Solo tienes que crear un directorio vacío y pasar la
ruta de ese directorio como argumento de esta opción, como se muestra en el ejemplo siguiente.

Acceder a la información en disco es mucho más lento que acceder a elementos en memoria.
Esta lentitud es insignificante en este caso porque se accede a estos elementos con muy poca frecuencia.
Además, esto permite tener más CPU
ejecutando tu protocolo en lugar de ser nodos de archivo
(puedes reducir mucho el valor de `n_archive_nodes` al archivar en disco).

##Ejemplos

###Archivar en disco

```sh
mkdir archives
mpirun -n 200 multistage_rosetta_scripts.mpiserialization.linuxgccrelease -job_definition_file job_def.xml -n_archive_nodes 1 -archive_on_disk archives @other_flags
rm -rf archives
```
Quizá no quieras borrar los archivos de inmediato.
Pueden ser útiles para la [[función de máquina del tiempo|TimeMachineExample]]
y para cargar desde checkpoints (cuando se implemente esa función).

###Archivar en memoria

```sh
mpirun -n 200 multistage_rosetta_scripts.mpiserialization.linuxgccrelease -job_definition_file job_def.xml -n_archive_nodes 10 @other_flags
```


##Véase también

* [[Rosetta Scripts multietapa|MultistageRosettaScripts]]
* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta

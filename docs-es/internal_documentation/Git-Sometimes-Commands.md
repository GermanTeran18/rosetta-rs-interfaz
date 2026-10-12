#Comandos de Git que se usan de vez en cuando

##Ayuda

Además de buscar en la web con Google y similares, git incluye varios comandos de ayuda

* *git <command> -h* : muestra un resumen breve de ayuda de un comando
* *git help <command>* : ofrece una explicación detallada de un comando (equivalente a una página de manual)

##Eliminar una rama
Si tu rama está completamente fusionada y terminada, y ya no la necesitas, puedes eliminarla:
```
 git branch -d smlewis/rosetta_scales
 git push origin --delete smlewis/rosetta_scales
```

El primer comando la elimina localmente y el segundo la elimina en el remoto. El primero fallará si tienes cambios sin fusionar.

También puedes eliminar la rama asociada a un PR una vez fusionado, con el botón de la página del PR. (Eso solo funciona para la rama remota: la rama local seguirá existiendo.)

##Revertir commits

De vez en cuando se sube al repositorio de GitHub un commit defectuoso.  Git permite eliminar commits, lo cual está perfectamente bien cuando trabajas en tu repositorio personal con commits que no se han compartido.  Sin embargo, después de que los commits se han compartido (con push), eliminar un commit hace que los repositorios tengan historiales divergentes.  Aquí es donde entra git revert.  Git revert puede revertir una revisión, varias revisiones o incluso un rango de revisiones.

Revertir un revert es algo más complicado, ya que git revert en realidad no elimina los commits revertidos del historial del código fuente. En su lugar, crea un nuevo commit que simplemente invierte los cambios que hacen esos commits. Esto significa que, para git, los cambios originales ya se fusionaron, y «volver a fusionar» los cambios no los restablece. Normalmente, lo que hay que hacer es revertir el revert. Consulta [[este documento (enlace externo)|https://www.kernel.org/pub/software/scm/git/docs/howto/revert-a-faulty-merge.txt ]] para más detalles.

####Ejemplos
<pre>git revert SHA1</pre>
Revierte los cambios de la revisión con el ID SHA1

<pre>git revert HEAD~3</pre>
Revierte la cuarta revisión más reciente de tu rama.

<pre>git revert first-revision..last-revision</pre>
Revierte los cambios hechos por cada revisión del rango, incluidas las revisiones especificadas.

Al revertir varias revisiones, los cambios se guardarán como una sola revisión nueva en el historial de git. Puedes encontrar más información [[aquí (enlace externo)|http://git-scm.com/docs/git-revert]].

####Ejemplo más largo

[[Revertir un commit: un caso de estudio (media wiki)|https://wiki.rosettacommons.org/index.php/Reverting_a_commit_-_a_case_study]]

##Más comandos de git útiles que pueden venir bien

(Nota sobre lo que va aquí.  Intenta que cada sección sea completa, de modo que contenga una descripción de lo que hace el comando y también describa algunos de los escenarios (quizá en una lista con viñetas de escenarios útiles, a la que la gente puede añadir) en los que podrías querer usarlo.)

Cada uno de estos comandos está documentado por completo en una página de manual.  Por ejemplo, para ver la documentación de git log: 
<code>man git-log</code>.  Las descripciones de abajo son resúmenes breves, no documentación completa. 

###git log
Git log muestra una lista cronológica de los commits de la rama actual, con los más recientes primero. 
```
   git log
```
muestra el ID del commit, la información del autor, la fecha y el mensaje del commit. 

###git diff

Git diff muestra la diferencia entre dos versiones de un archivo en el repositorio.
```
  git diff
```
muestra las diferencias entre las modificaciones actuales del directorio de trabajo y HEAD  
```  
  git diff <filename>
```     
muestra las diferencias entre el archivo especificado en el directorio de trabajo y HEAD
```     
  git diff <branchname>
```  
muestra las diferencias entre las modificaciones actuales del directorio de trabajo y branchname
```
   git diff <commit> <commit>
```      
muestra las diferencias entre dos IDs de commit especificados

###git reset

git reset se usa para restablecer el contenido del directorio de trabajo actual a una revisión dada, y también para restablecer HEAD a esa revisión.  Se puede usar para «deshacer» commits de forma efectiva
```
   git reset --soft
```
restablece el último commit hecho en esta rama y deja los cambios preparados (staged). 
```
   git reset --mixed
```
restablece el último commit hecho en esta rama y deja los cambios sin preparar (unstaged). 
```
   git reset --hard
```
restablece el último commit hecho en esta rama y descarta los cambios
```
   git reset --hard commit_id
```
restablece a commit_id y descarta todos los commits posteriores a commit_id.

###git blame

git blame es similar a svn blame; se puede usar para determinar el último commit que modificó cada línea de un archivo. 
```
   git blame <filename>
```

###git init

git init se usa para crear un repositorio vacío NUEVO.  Al ejecutarse, git init crea un repositorio git en el directorio de trabajo actual. Los repositorios que se descargan de github ya son repositorios y no necesitan usar este comando.
```
   git init
```
##Cambiar el mensaje de un commit que ya hiciste

`git commit --amend` te permite modificar el mensaje del commit más reciente.  Hacer esto cambia el historial, así que debes ejecutarlo antes de hacer push de tu commit. 
```
   git commit --amend
```
###git bisect

git bisect es una herramienta para identificar el commit responsable de introducir algún error en el código base.   Para empezar, haz checkout de un commit en el que exista el error que te interesa y ejecuta
```
   git bisect start
```
para empezar a hacer la bisección.  Ahora, marca el commit actual como malo
```
   git bisect bad
```
y luego marca el último commit conocido en el que el error no existe
```
   git bisect good commit_id
```
Debe haber un camino entre los commits marcados como bueno y como malo.  

En cuanto hagas esto, git empezará a realizar una búsqueda binaria.  Hará checkout de algún commit entre el malo y el bueno.  Cuando lo haya hecho, realiza las pruebas que necesites y marca el commit como malo o bueno.  Tras varias iteraciones de este proceso, te quedará el primer commit malo. 

Cuando termines y quieras limpiar:
```
   git bisect reset
```
Git bisect tiene muchas funciones útiles; [[consulta aquí (enlace externo)|https://www.kernel.org/pub/software/scm/git/docs/git-bisect.html]] la documentación completa. 

###git cherry-pick

git cherry-pick se usa para copiar commits.  
```
   git cherry-pick commit_id
```
copiará el contenido de commit_id en un nuevo commit de la rama actual.  El commit copiado tendrá un commit_id nuevo y el original queda sin cambios. 
```
  git cherry-pick commit_id_1..commit_id_2
```
copiará un rango de commits. 

Los commits copiados con cherry-pick se aplican de forma similar a los parches de diff, con la mayoría de las salvedades asociadas a aplicar parches.  Si existen conflictos, se te pedirá que los resuelvas manualmente. 

###git stash

git stash se usa para retirar temporalmente el conjunto actual de cambios de un directorio de trabajo.  Es útil si empiezas a hacer cambios y te das cuenta de que querías hacerlos en otra rama.  Un uso típico de git stash es:
```
   git stash
   git checkout correct_branch
   git stash pop
```
Esto retirará los cambios, cambiará de rama y luego volverá a poner los cambios en el directorio de trabajo.  
```
   git stash list 
```
mostrará los stashes almacenados actualmente; se pueden almacenar varios a la vez. 

###git diff-tree

git diff-tree muestra los objetos del repositorio modificados por un commit de git específico.    Se ejecuta así
```
   git diff-tree commit_id
```
y produce una serie de líneas como
```
   :100644 100644 85b4ffc6fa9206d6a066b961ba82d3e548f2a2d0 2f1140edf342bbe06ea0ed45a319b04a18c88450 M	rosetta_source/src/pilot_apps.src.settings.all
```
donde los campos son
```
   old_file_permissions new_file_permissions old_object_id new_object_id modification_type file_name
```
donde el tipo de modificación indica adición, eliminación, modificación, etc. 

###git remote

un repositorio git puede tener varios remotos.   para listar los remotos actuales:
```
   git remote -v
```
para agregar un remoto nuevo 
```
   git remote add remote_name remote_path
```
para eliminar un remoto
```
   git remote rm remote_name
```
###git merge-base

git merge-base muestra el ancestro común más reciente de dos commits, para usarlo al fusionar.  Se puede usar para determinar cuándo se creó una rama
```
   git merge-base commit_1 commit_2
```

###git reflog

el reflog es un registro de las posiciones anteriores de HEAD.  
```
   git reflog
```
mostrará una lista de las posiciones anteriores de HEAD.  Este comando es útil para recuperar commits que se perdieron con git reset --hard o al eliminar ramas.  El reflog de git solo se conserva durante los últimos días. 

###git gc

git gc realiza la recolección de basura en el repositorio.  Empaqueta los objetos mediante compresión delta, elimina objetos duplicados y purga los objetos y commits innecesarios.  Se ejecuta automáticamente cuando la cantidad de datos sin empaquetar alcanza ciertos umbrales y normalmente no es necesario.  Puedes ejecutarlo tú mismo con 
```
   git gc
```
###git diff-index

git diff-index es similar a git diff-tree, salvo que compara un commit dado con el contenido del índice actual.  Se ejecuta así
```
   git diff-index commit_id
```
###git prune

git prune (o git prune remote origin ) eliminará todas las referencias locales a ramas remotas que se hayan eliminado en github. 
```
   git remote prune origin
```
Explicación detallada: cuando git descarga una rama (pull, fetch, etc.) descarga todas las referencias a las ramas de ese repositorio. Cuando alguien elimina una rama remota, aunque la rama ya no exista, git sigue teniendo la referencia. 

Git prune origin revisará todas tus referencias locales y eliminará las que ya no existen en el remoto de github. Es una operación segura siempre que no estés usando una rama que se haya eliminado del remoto. Para ver qué referencias se eliminarán, puedes ejecutar: 
```
   git remote prune origin --dry-run
```
###git merge -X ours/theirs

`git merge -X theirs [sha-1/branch]` fusionará el sha-1 o la rama en la rama actual.  En el caso de theirs, si surge algún conflicto tomará el archivo completo de [sha-1/branch] especificado.  Si se usa ours, tomará el de nuestra rama actual.  Esto puede ser muy útil si ya has fusionado otra rama y quieres aplicar ese commit de fusión a la rama actual, por ejemplo si tienes varias subramas del mismo proyecto.  También tiene muchos otros usos.  Ejemplo de cómo fusionar un commit concreto de otra rama en la rama actual, tomando los archivos del otro commit:
```
    git merge -X theirs other_branch_commit_sha-1
```

##Véase también

* [[GithubWorkflow]]
* [[GitNoNoCommands]]
* [[Pull Requests]]
* [[Development Documentation]]

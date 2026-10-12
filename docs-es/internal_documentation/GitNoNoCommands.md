#GitNoNoCommands

##Comandos que debes evitar 

Git es increíblemente potente y ofrece herramientas para hacer cosas muy, muy complicadas. También es muy eficiente.  Juntas, estas dos cualidades te dan la libertad de cortarte las extremidades, y de hacerlo muy rápido.  Lo peor que puedes hacer con git es probar comandos nuevos para ver si hacen lo que esperas.  Recomendamos ejecutar un comando de git solo si sabes con absoluta certeza lo que va a pasar.  A continuación hay una colección de comandos y opciones de git que son especialmente peligrosos y que recomendamos que no uses nunca.


###Git rebase

Git rebase es un comando que se suele usar para linealizar el historial de commits. Dado el siguiente historial de revisiones:

<pre>
A---B---C---D <master>
     \
      \_E___F <feature>
</pre>

los comandos

<pre>
git checkout master
git rebase feature
</pre>

darán como resultado el siguiente historial de commits:

<pre>
A---B---C---D <master>
             \
              \_E___F <feature>
</pre>

Hay circunstancias en las que los rebase son útiles; sin embargo, si se realiza un rebase, todos los usuarios que hayan clonado el repositorio deben saberlo antes de hacer pull, o pueden aparecer commits duplicados y un historial inconsistente.  Para evitar estos problemas, no uses git rebase ni git pull --rebase con los repositorios git de Rosetta.  Tener un historial de revisiones no lineal es una característica de git, no algo que haya que evitar. 

Ten en cuenta que, con el enfoque de squash-merge que usamos ahora en el repositorio RosettaCommons/rosetta, la mayoría de los problemas de Git rebase desaparecen. (Aunque sigue valiendo la pena tener cuidado en los submódulos.)

###--force

por defecto, cualquier commit del que se haga push debe ser hijo (y no padre) de un commit existente. 

En otras palabras, si el historial del repositorio remoto es:

<pre>
A---B---C---D <master>
</pre>

puedes hacer push de un commit E, así:

<pre>
A---B---C---D---E <master>
</pre>

pero no puedes hacer push de cambios a los commits A, B o C.

El comando push  --force desactiva la comprobación que rechaza los cambios en A, B y C, con lo que en la práctica permite reescribir el historial. 

Esta opción a veces es necesaria si se hizo commit de grandes cantidades de datos binarios innecesarios; sin embargo, es un comando muy peligroso porque reescribe el historial, y por eso exige que toda la comunidad sepa que se usó cuando se emplea en ramas compartidas. 

Ten en cuenta que
  git add --force
también puede tener efectos indeseables, como agregar archivos que de otro modo se ignorarían. Normalmente esos archivos se ignoran por una buena razón.

###--squash

git merge --squash branch_name fusionará branch_name en la rama que tengas actualmente en checkout y combinará todos los commits de branch_name en un solo commit «aplastado» (squashed). Esto puede parecer deseable porque hace que el historial de commits quede más «ordenado».  Sin embargo, git maneja muy bien grandes cantidades de commits pequeños, así que no es necesario aplastar las ramas de desarrollo. Si no aplastas tus commits, depurar es más fácil, porque se conserva todo el historial granular del desarrollo.

Ten en cuenta que, cuando tu rama de desarrollo se fusione en master, se aplastará en ese momento, así que no hay mucha razón para aplastar durante el desarrollo.

###filter-branch

git filter-branch es un comando potente para modificar el contenido de commits anteriores.  Permite reescribir el historial de commits de forma arbitraria; se pueden eliminar o mover archivos, y eliminar o mover commits. Como consecuencia, git filter-branch hace que cambien los IDs de los commits, lo que produce un historial inconsistente.  Es muy útil al reorganizar un repositorio, pero no debe usarse con los repositorios de RosettaCommons. 

###replace

git replace se suele usar para modificar la topología de un repositorio.  Permite reemplazar un commit por otro, con lo que se pueden agregar commits de fusión entre commits hechos previamente. Puede producir un historial inconsistente y, por lo tanto, no debe usarse con los repositorios de RosettaCommons.


##Véase también
* [[GithubWorkflow]]: flujo de trabajo típico de Github para los desarrolladores de Rosetta
* [[Git Sometimes Commands]]: otros comandos de Git útiles
* [[Pull Requests]]: cómo hacer un pull request a través de Github

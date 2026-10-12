#Revertir un commit

Bien, cometiste un error al fusionar tu rama en master. O bien fusionaste antes de que estuviera lista, o bien fusionaste y las cosas se rompieron de forma inesperada. ¿Qué haces ahora? Una forma de manejarlo es usar «git revert» para quitar tu commit de master. 

Si usaste un pull request para fusionar tus cambios, simplemente ve a la página de Github del pull request cerrado y busca el botón «revert».

Si no usaste un pull request, o solo quieres revertir *parte* de tu fusión, aún puedes hacerlo manualmente. Este es un ejemplo de cómo hacerlo:

###Ejemplo práctico

Vamos a usar git revert, pero para ello necesitaremos conocer los hashes SHA1 de los commits. 56493 y 56494 son los números de identificación del servidor de pruebas. Podemos ir a  [[http://benchmark.graylab.jhu.edu/revisions]] para obtener la correspondencia. Así que podemos desplazarnos hacia abajo para encontrarlos, o ir a `http://benchmark.graylab.jhu.edu/revision/master/<version_num>` para ir directamente al commit. El hash SHA1 aparece en el «GitHub commit link». Ten en cuenta que también necesitaremos la versión de la línea principal anterior al commit que estamos revirtiendo.

<pre>
56494 - 199441208b2b2f2
56493 - 12a020b263aaafa
56492 - c4ba068409eef69
</pre>

(Nota: los SHA1 de git se pueden abreviar siempre que la parte abreviada sea única en el repositorio.)

Ahora actualiza el repositorio local:

<pre>
git checkout master
git pull
</pre>

Ejecuta un «git show» para asegurarte de que tu directorio de trabajo está limpio.

Por seguridad, haremos la reversión en una rama. Como es rápido, usaremos simplemente una rama local en lugar de la personal-tracked-branch de GitHub

<pre>
git checkout -b kala_revert
</pre>

Ahora revertimos. En git, un revert es simplemente un commit que invierte todos los cambios de un commit anterior. Como tenemos varios commits que revertir, probablemente lo mejor sea trabajar hacia atrás.

<pre>
git revert 199441208b2b2f2
</pre>

Ten en cuenta que esto falla. El commit que estamos revirtiendo es una fusión, así que tenemos que indicarle de qué lado de la fusión queremos conservar los cambios y de cuál queremos revertirlos. (Git trata cada lado de la fusión más o menos de forma equivalente. No tiene noción de un historial «principal» (trunk))

<pre>
git help revert  
</pre>

Esto muestra una página de manual de git revert. Al leerla, vemos que tenemos que indicar con la opción -m el número del *padre* que queremos conservar. Ten en cuenta que esto es distinto del hash SHA1.

<pre>
git show 199441208b2b2f2
</pre>

Esto da un resumen del commit. Fíjate en la línea «Merge: d41f7cf 12a020b» en la parte superior. Muestra los padres de la fusión. El commit anterior de la línea principal es 56493 o 12a020b263aaafa, que es el segundo número de la lista (recuerda que los SHA1 se pueden abreviar), así que es el segundo padre.

<pre>
git revert 199441208b2b2f2 -m 2
</pre>

Esto no hace nada. ¿Por qué? Abre una representación gráfica del árbol de commits

<pre>
gitk
</pre>

Puedes ir a un commit concreto pegando el hash SHA1 en el campo SHA1 ID:.

Al mirarlo, puedes notar que en realidad no hay nada único en este commit. Es una fusión de dos fusiones, cada una de las cuales fusiona los mismos dos commits.  (tanto 12a020b263 como d41f7cf89348307 fusionan 5373993a3 y c4ba068409ee)

Bien, así que revertir 56494 - 199441208b2b2f2 es en la práctica una operación nula. Pasemos al siguiente commit. También es un commit de fusión, así que necesitamos de nuevo el padre.

<pre>
git show 12a020b263aaafa # c4ba068 is parent 2
git revert 12a020b263aaafa -m 2

error: could not revert 12a020b... # [ONE LINE DESCRIPTION OF CHANGE]
hint: after resolving the conflicts, mark the corrected paths
hint: with 'git add <paths>' or 'git rm <paths>'
hint: and commit the result with 'git commit'
</pre>

Vaya. Esto da conflictos de fusión. Significa que algo de lo que se revierte también cambió en commits posteriores. Veamos qué ha cambiado.

<pre>
git status
</pre>

Parece un problema con src/protocols/scoring/methods/pcsTs2/PseudocontactShiftTensor.hh: «deleted by them»

Veamos cuáles son las diferencias.

Cambios entre el commit que estamos revirtiendo y el master actual:

<pre>
git diff 12a020b263aaafa..origin/master -- src/protocols/scoring/methods/pcsTs2/PseudocontactShiftTensor.hh
</pre>

Cambios que estamos revirtiendo (diferencia entre el padre de la línea principal y el commit):

<pre>
git diff c4ba068409ee..12a020b263aaafa -- src/protocols/scoring/methods/pcsTs2/PseudocontactShiftTensor.hh
</pre>

Parece que el commit que estamos revirtiendo agregó el archivo, pero desde entonces se hicieron ediciones menores. No nos importan, así que simplemente eliminamos el archivo (invirtiendo los cambios hechos por el commit que estamos revirtiendo)

<pre>
git rm src/protocols/scoring/methods/pcsTs2/PseudocontactShiftTensor.hh
</pre>

Ya que estoy en esto, debería ejecutar update_options.sh para asegurarme de que todo está bien con el sistema de opciones, ya que el problema del sistema de opciones es la razón principal por la que hacemos la reversión.

Ejecuta un «git status» para comprobar las cosas. Y agrega los archivos actualizados de las opciones con «git add»

Ahora haz commit de la reversión.

<pre>
git commit
</pre>

Esto debería abrir una ventana de editor (vim en mi caso) que me permite editar un mensaje de commit claro y descriptivo.

Ahora recompilo, para asegurarme de que la reversión no rompió nada. En este punto también es muy buena idea ejecutar las pruebas de integración y las pruebas unitarias.

No parece que nada esté roto, pero si hubiera problemas, siempre podría agregar commits adicionales. (Por ejemplo, si no hubiera habido un conflicto de fusión, habría necesitado un segundo commit para la actualización de las opciones.)

Bien, ahora estoy listo para enviar los cambios a GitHub.

<pre>
git checkout master
git pull
git merge kala_revert
</pre>

Esto debería mostrar una ventana de editor que me permite agregar un mensaje de commit bueno y descriptivo. Quiero dedicar tiempo a este mensaje, ya que es el que se enviará a la lista y el que se mostrará para mis cambios en el servidor de pruebas.

Como ya había hecho un buen mensaje de commit, hay un atajo para evitar escribirlo otra vez. Una vez que he guardado una versión corta y descriptiva, puedo enmendar el mensaje del commit (ya que aún no he hecho push). Y con la opción -C puedo copiar el mensaje del commit de otro commit (indicado por SHA1 o nombre de rama).

<pre>
git commit --amend -C kala_revert
</pre>

Bien, antes de hacer push, quiero revisar mi mensaje de commit.

<pre>
git log
</pre>

Ese primer mensaje será el que se muestre sobre mis cambios cuando haga push. Es lo que se envía a la lista y lo que se muestra en el servidor de pruebas. Tengo que asegurarme de que estoy conforme con él. Noto que debería agregar más información, así que enmiendo el commit.

<pre>
git commit --amend
git log
</pre>

Un último «git status» para comprobar que no olvidé nada, y ahora puedo hacer un «git push». Luego puedo ir a [[https://github.com/RosettaCommons/main]] para ver si tuve éxito y comprobar que todo en el servidor está como quiero. Lo está, así que solo espero a que el servidor de pruebas me diga si algo se rompió.

##Deshacer un revert

Resulta que restablecer los cambios que acabas de revertir puede ser más complicado que revertirlos en primer lugar. Consulta [[este documento|https://www.kernel.org/pub/software/scm/git/docs/howto/revert-a-faulty-merge.txt]] para ver los detalles.

Un revert en git en realidad no elimina los commits revertidos del historial del código fuente. En su lugar, crea un nuevo commit que simplemente invierte los cambios que hacen esos commits. La consecuencia es que, si tienes una rama basada en uno de esos commits revertidos e intentas volver a fusionarlos, git piensa que ya se fusionaron y los omite.

Así que, para deshacer un revert, no vuelvas a fusionar tus cambios. En su lugar, querrás revertir el commit del revert. 

Si hiciste el revert a través de Github, simplemente puedes usar el botón revert del pull request del revert.

Si hiciste el revert manualmente, lo más probable es que quieras crear una rama limpia a partir de master. En esta rama, revierte el revert que acabas de hacer. Luego fusiona también la rama basada en los commits antiguos. Arregla la rama para que compile, pase las pruebas y todo se vea como debe. Luego fusiona esa rama de vuelta en master, comprueba y haz push como de costumbre.

Solo tienes que revertir el revert una vez, así que, si tienes varias ramas de este tipo, la primera recibe el revert del revert, pero las siguientes se pueden fusionar sin más, como de costumbre.

##Véase también

* [[Git Sometimes Commands]]
* [[GithubWorkflow]]
* [[GitNoNoCommands]]

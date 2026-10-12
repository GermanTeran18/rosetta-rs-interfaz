#Flujo de trabajo de GitHub para Rosetta


[[_TOC_]]

##Resumen ejecutivo

Usamos un repositorio común de GitHub, [[RosettaCommons/rosetta|http://github.com/RosettaCommons/rosetta]], como nuestro repositorio principal de desarrollo. Contiene el código fuente de Rosetta, así como partes accesorias que están estrechamente acopladas al estado del código fuente (p. ej., las pruebas y la base de datos). Además de este repositorio principal, usamos varios otros repositorios como «submódulos» dentro del repositorio principal, que contienen componentes poco acoplados al código fuente o demasiado grandes para almacenarlos razonablemente en el repositorio principal.

Para trabajar con los repositorios de Rosetta usamos un modelo de fork y PR. Cada desarrollador crea su propio fork del repositorio de Rosetta, en el que hace sus cambios. Cuando tiene algo que quiere aportar de vuelta a Rosetta principal, abre un «Pull Request» (PR) en la interfaz de GitHub con la rama que contiene sus mejoras de código. Este PR se revisa y, si pasa las comprobaciones de calidad y administrativas, se fusiona en el código base principal de Rosetta.

Para aclarar los términos: GIT es un sistema distribuido de control de versiones que instalas en tu computadora para gestionar el código de Rosetta que estás desarrollando, compilando o usando localmente.  GITHUB es un sitio web que ofrece una interfaz amigable para agregar funciones de comunicación alrededor del código base de git (para que podamos esforzarnos juntos por mejorarlo) y herramientas para reunir el código, el servidor de pruebas, etc. 

##Flujo de trabajo para usar git

(Esta sección trata casi por completo de cosas que haces en tu computadora, la mayoría de las cuales funcionan sin conexión, salvo algún comando de git ocasional que se comunica con el servidor.)

###¿Qué es git?

Git es un sistema de gestión de control de código fuente (SCM) distribuido, muy usado, rápido, flexible y robusto. 
A diferencia de las soluciones de SCM centralizadas como subversion, cada copia de trabajo del código es un repositorio completo. 
Cada repositorio contiene el historial completo del proyecto, incluidas las ramas derivadas de la línea principal de desarrollo, que normalmente se llama «main».  
El historial de revisiones de un repositorio se representa como un grafo; en concreto, como un grafo acíclico dirigido (DAG).  Cuando se hace commit de una revisión en un repositorio, se guarda como un nodo con una arista que indica la revisión anterior.  Una «rama» es una revisión con nombre en el vértice terminal de un DAG; el nombre de la rama siempre hace referencia a la revisión más reciente de una rama.  Las revisiones no terminales se pueden nombrar mediante [[etiquetas (tags)|http://git-scm.com/book/en/Git-Basics-Tagging]].  Cada rama se puede rastrear hasta el vértice raíz y, por lo tanto, cada rama se puede considerar un recorrido posible y razonable a través del historial de revisiones.  Un efecto interesante de este diseño es que todos los caminos a través del historial (es decir, todas las ramas) son igualmente válidos. 
La rama «main», por convención, es la que consideramos la rama oficial, lo que en SVN llamaríamos «trunk».

Una metáfora común para describir la estructura de un repositorio git es la hidra.  Hay muchas cabezas (ramas), pero un solo cuerpo (repositorio).  En un momento dado, solo se puede hacer «checkout» de una rama.  Los archivos de esa rama se pueden examinar y editar exactamente como esperarías editarlos.  Harás tus modificaciones, les harás commit en tu rama con checkout y, si luego haces checkout de otra rama, todas las modificaciones que hiciste en la primera rama desaparecerán del árbol de código fuente. 
En git no hace falta tener copias separadas de Rosetta para cada una de tus tareas de desarrollo. 
En su lugar, creas varias ramas a partir de la rama `main`, y puedes desarrollar en esas ramas, hacerles commit y cambiar entre ellas sin necesidad de tener varios repositorios. 
En cualquier momento del desarrollo puedes hacer push de tus ramas a GitHub, lo que protege tu trabajo si falla tu disco duro y te permite compartir fácilmente tus ramas con colaboradores. 
Cuando estés listo para compartir tu proyecto con todos, fusionas tu rama en la rama `main` y haces push a GitHub. 
El historial completo de tu rama se conserva y permanece agrupado.

En un repositorio git, el estado de la rama es «global».  Es decir, si estás en `rosetta/rosetta_source/src/core/scoring` en la rama `a` y cambias a otra rama, `b`, el contenido de `main/source/src/core/pack` también se actualizará al estado de la rama `b`.  Git no dejará el código de `core/pack` sin cambios según el directorio en el que estabas cuando ejecutaste el comando de cambio de rama.

Crear ramas y fusionarlas es el patrón de desarrollo preferido en git, y como estas operaciones ocurren en el repositorio local, y como git se diseñó específicamente pensando en ramificar y fusionar, son muy rápidas.

####Para profundizar
* [[Prueba git|http://try.github.io/levels/1/challenges/1]]
* Ve [[aquí|http://git-scm.com/about]] para aprender más sobre git.  Ten en cuenta que SCM significa gestión de control de código fuente (source control management).

###Primeros pasos

* Necesitas una cuenta de GitHub para trabajar con el código base de Rosetta. Si todavía no tienes una, puedes crear una gratis en <https://github.com/> haciendo clic en el botón de la esquina superior derecha.
    * Al elegir un nombre de cuenta, recomendamos uno que suene «profesional»: tu nombre de usuario de GitHub aparecerá en todas tus comunicaciones relacionadas con GitHub. (Pero no te preocupes demasiado por tu nombre de usuario extravagante si ya tienes una cuenta de GitHub establecida.)
    * Completa tu [perfil de GitHub](https://github.com/settings/profile) con tu nombre completo y tu afiliación (institución y laboratorio).
    * En [Emails](https://github.com/settings/emails), desmarca «Keep my email address private», para que el servidor de pruebas de Rosetta pueda vincular correctamente tu cuenta con tus contribuciones.
* Recomendamos encarecidamente usar claves SSH para trabajar con los repositorios de GitHub. Puedes encontrar instrucciones para esto [[aquí|https://help.github.com/articles/generating-ssh-keys]]. Ten en cuenta que en este punto id_rsa.pub e id_dsa.pub se pueden usar indistintamente, aunque las instrucciones usan id_rsa.pub.
    * Tendrás que aceptar de antemano la huella de la clave RSA de GitHub siguiendo [[el último paso de las instrucciones de SSH|https://help.github.com/articles/generating-ssh-keys]].
* Quienes aporten código tendrán que firmar el [acuerdo de desarrollador]() (para miembros de un laboratorio de RosettaCommons) o el [Acuerdo de licencia de colaborador](insert link) antes de que sus PR puedan ser aceptados.
    * Los miembros de los laboratorios de RosettaCommons deben consultar la wiki interna para obtener más detalles sobre cómo registrarse como miembro de RosettaCommons. (Pide a otros miembros del laboratorio el sitio web y los datos de acceso.)
* Necesitarás algunas de las [[dependencias externas de Rosetta|Build-Documentation]] estándar, como un compilador, etc.

####Obtener Rosetta.

_Nota: con el nuevo esquema de repositorios, el antiguo script rosetta_clone_tools ya no es útil._

Si solo quieres descargar y usar Rosetta, puedes obtenerlo en las [páginas de versiones](https://www.rosettacommons.org/software/license-and-download), o puedes clonarlo directamente del repositorio principal de Rosetta:

        git clone git@github.com:RosettaCommons/rosetta.git   # Uses SSH
 
Sin embargo, si vas a hacer cualquier desarrollo con Rosetta, probablemente querrás clonar desde tu propio fork (véase más abajo).


###Flujo de trabajo recomendado

Con el repositorio de Rosetta de acceso público, usamos el modelo Fork-and-PR, que ya es el estándar, para el desarrollo. La ventaja de este modelo es que es estándar en muchos proyectos de código abierto, así que hay mucha documentación al respecto. (Consulta la [documentación de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests) para empezar.) También permite posibles contribuciones de personas que no son miembros de RosettaCommons y que no tienen acceso de escritura a los repositorios de Rosetta.

Un flujo de desarrollo básico sería el siguiente:

1. Crea un fork del repositorio de Rosetta en tu propio espacio de usuario
    
2. Clona tu repositorio fork en un repositorio local
    Si ya tienes un clon local del repositorio RosettaCommons/rosetta, puedes convertirlo para que haga referencia a tu fork (véase más abajo).

3. Crea una rama de desarrollo en tu repositorio local
    Tu fork es tu propio espacio de trabajo personal, así que puedes ponerle a tu rama el nombre que quieras: no necesitas anteponerle tu nombre de usuario de GitHub
    Solo ten en cuenta que el nombre de la rama será visible para otros cuando finalmente hagas un PR

4. Programa, programa, programa
    Haz tus cambios en el repositorio local

5. Crea pruebas para tu código nuevo
    Ejecuta las pruebas localmente. Revisa también las pruebas existentes para asegurarte de que no rompiste nada por accidente.

6. Haz push de tu rama a tu fork de GitHub
    Tus cambios permanecerán dentro de tu fork hasta que los publiques, así que puedes guardar ahí lo que quieras.

7. Repite los pasos 4-6 hasta que tu rama esté lista

8. Abre un PR contra el repositorio principal RosettaCommons/rosetta usando la interfaz de GitHub
    Un PR es tu forma de devolver a la comunidad tus cambios de código.

9. Tu PR será revisado por otros miembros de RosettaCommons
    Los revisores buscan errores que podrías haber pasado por alto, problemas de calidad del código y otros posibles problemas. 
    El objetivo es hacer una «revisión por pares» de tu código y dejarlo en un estado «publicable».
    Otra cosa que comprobarán es que hayas firmado el acuerdo de desarrollador o de licencia de colaborador.

10. Si tu PR pasa la revisión, se fusionará.
    Solo alguien con acceso de escritura al repositorio principal RosettaCommons/rosetta puede pulsar el botón de fusión: no lo haces tú mismo, otra persona lo hará por ti.

#### Crear un fork

Para crear un fork, ve a <https://github.com/RosettaCommons/rosetta> y haz clic en el botón «Fork» de la esquina superior derecha. (Consulta la [documentación de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) para más información)

NOTA: La licencia de Rosetta te permite crear forks a través del sitio web de GitHub e interactuar con esos forks en tu máquina local. La licencia no permite volver a alojar (públicamente) los repositorios de Rosetta en otros sitios web. No vuelvas a alojar Rosetta en otros servicios (Gitlab, Bitbucket, etc.)

#### Clonar tu fork

Una vez que tengas un fork, puedes clonar desde tu propia copia de Rosetta

        git clone git@github.com:GITHUB_USERNAME/rosetta.git   # Uses SSH
        
La diferencia entre clonar desde la versión principal de RosettaCommons y desde tu versión fork es simplemente qué repositorio figura como `origin` en tu clon local. Puedes cambiarlo más adelante:

        git remote add upstream git@github.com:RosettaCommons/rosetta.git  
        git remote set-url origin git@github.com:GITHUB_USERNAME/rosetta.git

(El primer comando puede ser útil incluso si clonaste originalmente tu fork.)

#### Crear una rama de desarrollo en tu repositorio local

A menos que quieras partir de una revisión en particular, recomendamos crear tu rama a partir de la rama `main`

        git checkout -b <BRANCH_NAME> origin/main

Puedes poner el nombre de rama que quieras. Pero probablemente debería ser descriptivo, ya que el nombre de la rama será visible para otros cuando finalmente hagas un PR.

Ten en cuenta que el comando anterior creará la rama basándose en lo que el repositorio local cree que es el estado de origin/main. 
Eso puede estar actualizado o no, según cuándo lo actualizaste por última vez.

En particular, tu fork de GitHub no se mantiene actualizado automáticamente con el repositorio principal RosettaCommons/rosetta.
Si la rama `main` de tu fork va por detrás de la rama `main` de RosettaCommons/rosetta, cuando vayas a la página web de GitHub de tu fork (https://github.com/GITHUB_USERNAME/rosetta), 
debería haber un aviso cerca de la parte superior que diga «This branch is XYZ commits behind RosettaCommons/rosetta:main» y un botón «Sync Fork».
Al pulsar este botón se actualizará la versión de GitHub de la rama `main` de tu fork con el estado actualizado de la rama `main` de RosettaCommons/rosetta.

Después de hacerlo, puedes actualizar la versión local de `origin/main` ejecutando:

        git fetch origin

Entonces deberías poder hacer checkout o fusionar la rama `origin/main`.

#### Programar, programar, programar

Consulta la documentación de [[RosettaAcademy]] para obtener más ayuda sobre cómo trabajar con el código base de Rosetta, así como sobre cómo compilar Rosetta.

#### Crear pruebas

Crear pruebas para tu nueva funcionalidad o corrección de errores ayudará con el mantenimiento y a asegurar que las cosas no se rompan en el futuro. Consulta la documentación de [[RosettaAcademy]] para obtener más ayuda sobre cómo escribir pruebas.

Además, querrás ejecutar localmente las pruebas existentes para asegurarte de que no rompiste algo sin querer. Consulta [[Development Documentation]] para más información sobre cómo ejecutar las pruebas localmente.

#### Hacer push de tus cambios

Probablemente solo tengas acceso de escritura a tu fork de Rosetta, y no al repositorio principal RosettaCommons/rosetta. Por eso, al hacer push, tendrás que hacerlo a tu fork y no al repositorio principal. 
Por suerte, si lo configuraste correctamente (véase «Clonar tu fork» arriba), tu fork debería figurar como el remoto `origin`.

        # For the first time (-u sets the upstream reference for subsequent pushes)
        git push -u origin

        # Subsequent times
        git push

#### Repetir

A medida que desarrollas, en particular si es una rama de larga duración, la rama `main` de Rosetta probablemente acumulará cambios, algunos de los cuales pueden entrar en conflicto con los tuyos.
Tu PR final no se podrá fusionar a menos que resuelvas esos conflictos.
Para ello, querrás actualizar el estado de `main` en tu repositorio fork y el estado de `origin/main` en tu repositorio local con el estado actualizado de `main` en RosettaCommons/rosetta.
Consulta la información de «Crear una rama de desarrollo en tu repositorio local» para saber cómo hacerlo.

Una vez que hayas descargado toda la información, deberías poder fusionar tu rama con las actualizaciones.

        git merge origin/main

Luego tendrás que resolver los conflictos de fusión (si los hay) y hacer commit de los cambios.

* No te preocupes por el historial de la rama. Usamos un sistema de squash-merge para el repositorio RosettaCommons/rosetta. 
Cuando tu PR se fusione, todo el historial complejo de la rama se aplastará en un único commit.

#### Abrir un PR

Una vez que hayas terminado tus cambios (o al menos estén lo bastante completos como para recibir comentarios razonables), puedes abrir un PR. Consulta la [documentación de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/] para más detalles.

*No abras PR «en curso» contra el repositorio principal RosettaCommons/rosetta.* Para mantener algo limpia la interacción de revisión de los PR, espera a que tu PR esté «listo para revisión». -- Tu fork es un espacio de trabajo privado y contiene toda la funcionalidad del repositorio principal RosettaCommons/rosetta. Si quieres tener PR en borrador o de marcador de posición, siempre puedes cambiar los menús desplegables y abrir un PR contra la rama GITHUB_USERNAME/rosetta:main, lo que debería mantener el PR local a tu rama. Cuando esté listo, no lo fusiones; en su lugar, crea un PR nuevo con la rama contra RosettaCommons/rosetta:main. Como alternativa, también puedes usar la función «project» de GitHub para llevar el seguimiento del trabajo en curso.

Por lo general, habrá un aviso en la página web de tu fork (https://github.com/GITHUB_USERNAME/rosetta) cada vez que hayas hecho push de commits nuevos a una rama, que te permitirá abrir un PR para esa rama. Como alternativa, si vas a esa página web y encuentras la rama que te interesa en el cuadro desplegable, debería haber un botón «Contribute» que te permitirá abrir un Pull Request.

*Puntos importantes al abrir un PR*

En la parte superior de la página de envío del PR hay algunos cuadros desplegables que muestran los repositorios y ramas implicados.
El «base repository» y la «base» (aquello en lo que vas a fusionar) probablemente aparezcan por defecto como RosettaCommons/rosetta:main, pero compruébalo para asegurarte de que las cosas van adonde esperas.

Como Título, escribe algo descriptivo que resuma adecuadamente la intención del PR. Los posibles revisores pueden decidir revisar o no tu PR según si creen que el título es relevante para ellos.
*En particular, el valor por defecto, que es el nombre de la rama, _rara vez_ es útil.*

Como Descripción, sé conciso pero descriptivo sobre el contenido del PR. En particular, ten en cuenta que quien finalmente fusione el PR casi con seguridad usará el cuadro de descripción (p. ej., copiando y pegando) para crear el mensaje del commit de fusión. Con nuestro uso de squash-merge, esto significa que el contenido del cuadro de descripción puede ser el único registro persistente de en qué consistían estos cambios. Ten en cuenta que la descripción se puede editar más tarde. Vale la pena mantener actualizada la descripción principal a medida que cambia el PR.

Deja marcada la casilla «Allow edits by maintainers». Por lo general dejamos que el autor del PR cambie su propio PR, pero poder retocar rápidamente algo que necesita un ajuste y que no requiere ir y venir contigo para cambiarlo es útil.

Si conoces a alguien que podría ser un revisor adecuado, puedes agregarlo. (Pero ten en cuenta que quizá no pueda, por estar ocupado.)

Consulta el menú desplegable Labels y agrega las que consideres relevantes. Solo los usuarios con los permisos adecuados en el repositorio (p. ej., ciertos miembros de RosettaCommons) pueden aplicar etiquetas. 

#### Revisión y fusión

Una vez que abras un PR, un desarrollador de RosettaCommons revisará tu código para buscar errores evidentes, comprobar diversos estándares de calidad y asegurarse de que los aspectos administrativos estén en orden. (Consulta [[reviewertemplate]] para ver un enfoque posible.) El objetivo principal es asegurar que el código que llega a RosettaCommons/rosetta:main sea código de «calidad final», listo para que otros lo usen. Debe, en la medida de nuestras posibilidades, compilar por completo, pasar todas las pruebas automatizadas y estar libre de errores.

Ten en cuenta que, aunque solo ciertos desarrolladores autorizados de RosettaCommons pueden fusionar código, damos la bienvenida y animamos a las revisiones de personas que no están autorizadas para pulsar el botón de fusión.
La atención de las personas con autoridad para fusionar es limitada y, si otros pueden ayudar con el «trabajo preparatorio» en las primeras etapas de la revisión del PR, eso deja más tiempo a quienes pueden fusionar para ocuparse de la parte final de la fusión.

##### Cuestiones legales y administrativas

Una cosa importante que se comprobará es si firmaste correctamente el Acuerdo de desarrollador o el Acuerdo de licencia de colaborador. Como Rosetta también se distribuye comercialmente, necesitamos asegurarnos de que tenemos los derechos adecuados para hacerlo. Los Acuerdos de desarrollador y de licencia de colaborador garantizan que estamos en regla.

* El Acuerdo de desarrollador es para personas que son miembros de laboratorios de RosettaCommons. Consulta la wiki interna de RosettaCommons para más información. (Pide a otros miembros del laboratorio o a tu investigador principal el sitio web y los datos de acceso.)
* El [Acuerdo de licencia de colaborador](INSERT LINK) es para personas que no son miembros de RosettaCommons. Básicamente afirma que estás debidamente autorizado para aportar el código que aportas y que no tienes objeciones legales a que RosettaCommons redistribuya ese código como parte del paquete de software Rosetta, incluso bajo su licencia de uso comercial.

(Ten en cuenta que, aunque el Acuerdo de licencia de colaborador permite a RosettaCommons distribuir el código que aportaste, tú conservas los derechos sobre él y puedes redistribuirlo y licenciarlo por tu cuenta, siempre que no contenga código preexistente de RosettaCommons. Consulta el texto del Acuerdo de licencia de colaborador (CLA.md en el directorio raíz de Rosetta) para ver los detalles exactos.)

Otra cuestión legal que se comprueba es que no se fusione código incompatible con la licencia de Rosetta. La licencia de Rosetta, que existe en formas de uso exclusivamente no comercial y de uso comercial, es incompatible con las licencias de ciertos otros paquetes de software. En particular, las licencias con términos incompatibles con las restricciones de «uso exclusivamente no comercial» o las que tienen cláusulas de «compartir igual», como la GPL (GNU Public License), son incompatibles con Rosetta, y el código con tales licencias no se puede combinar con el software Rosetta. *Esta restricción incluye cualquier redistribución del paquete combinado, incluida la publicación de dicha combinación en un fork de GitHub.* (Ten en cuenta que esta restricción no proviene de la licencia de Rosetta: es principalmente una infracción de la licencia del software con GPL.)

##### Pruebas

Parte del proceso de revisión será poner en cola pruebas en el servidor de pruebas (<https://benchmark.graylab.jhu.edu/>) y asegurarse de que no haya roturas inadvertidas de las pruebas. Si alguna prueba devuelve problemas, incluidas pruebas que no pretendías cambiar, probablemente se te pedirá que rastrees los problemas y te asegures de que la rama quede corregida.

Si prevés que las pruebas cambien, vale la pena mencionarlo en la descripción del pull request.

##### Fusión

Una vez que tu código pase todas las comprobaciones y las pruebas salgan limpias, tu PR se fusionará en RosettaCommons/rosetta:main  
Solo los miembros de RosettaCommons con acceso de escritura al repositorio RosettaCommons/rosetta pueden hacer esta fusión, así que, en lugar de hacerlo tú mismo, otra persona pulsará el botón de fusión por ti.

Para mantener el repositorio (ya demasiado grande) en un tamaño manejable, usamos un sistema de squash-merge. Esto significa que la interfaz de GitHub reescribirá automáticamente cada PR para que conste de un único commit con todos los cambios. Una consecuencia es que todos los mensajes de commit del historial de tu rama dejarán de estar disponibles en el historial de la rama RosettaCommons/rosetta:main. En su lugar, se creará un nuevo mensaje de commit que resuma todo el PR. Para que ese mensaje sea lo más preciso posible, mantén la descripción del PR actualizada y precisa sobre el contenido del PR. La persona que fusione el PR usará la descripción del PR para el nuevo mensaje de commit.

### Submódulos

Rosetta usa submódulos de forma extensiva para las partes que no están estrechamente acopladas al código fuente principal de Rosetta, así como para cosas que serían demasiado voluminosas o incómodas de incluir en el propio repositorio principal de Rosetta.

Los submódulos son repositorios independientes que pueden ser subdirectorios de repositorios existentes. Los submódulos están en un estado de 'detached head', lo que significa que pertenecen a un commit específico al que el puntero HEAD no se actualiza cuando otras personas hacen push a main. Ejemplo rápido: `Rosetta/tests/scientific` está en el repositorio `rosetta` y el directorio `data` que hay ahí es su propio submódulo. El contenido de `data` no se actualiza automáticamente al hacer pull de main (con `git pull`). En su lugar, tienes que actualizar el contenido del directorio con uno de los comandos `git submodule` (por ejemplo, `git submodule update --init --recursive`). 

**Pregunta**: Siempre actualizo todos los submódulos con `git submodule update --init --recursive`, pero en realidad solo uso el de los datos científicos y no me importan todos los demás (quizá `tools`). ¿Cómo puedo mantener los otros en el estado en que estén en un momento dado y no tocarlos, sin que aparezcan constantemente como cambios en git status? ¿Cómo se hace eso? ¿Cuál es el flujo de trabajo y cuáles son los comandos?

**Respuesta de Rocco**: La respuesta corta es que no inicialices los módulos que no necesitas. Puedes actualizar módulos específicos indicando su ruta (p. ej., `git submodule update --init -- tests/scientific/data/` para actualizar solo el de los datos del benchmark científico). Si ya tienes un módulo inicializado, puedes eliminar su contenido para que git lo ignore. (p. ej., `rm -r source/src/python/PyRosetta/binder/*` si no compilas PyRosetta y no quieres que los cambios de binder aparezcan en tus pulls. Nota: es un `rm` normal y NO un `git rm`). Un directorio de trabajo vacío para un submódulo actúa como una señal de «sin cambios» para git. Si más tarde lo quieres, siempre puedes ejecutar `git submodule update --init -- source/src/python/PyRosetta/binder/`. Los datos del submódulo se almacenan fuera del directorio de trabajo, así que hacer rm/init en realidad no es tan pesado.)

Hay varias dependencias de Rosetta que se distribuyen como submódulos y que se necesitan para compilar. Por comodidad (y para evitar tener que actualizar todo con submodule update), hay un script de utilidad en `Rosetta/source/update_submodules.sh` que actualiza automáticamente los submódulos necesarios para la compilación. Este script debería llamarse automáticamente como parte del proceso de compilación. (Ten en cuenta, sin embargo, que esto significa que si tienes cambios sin preparar en submódulos de los que depende la compilación, pueden sobrescribirse.)

#### Modificar submódulos

Una de las peculiaridades de trabajar con submódulos es que el estado del submódulo se representa con un SHA1 fijo, y el repositorio figura con una URL específica. En particular, los submódulos figuran con URL de la versión de RosettaCommons del repositorio del submódulo. Esto debería funcionar si simplemente haces un fork del repositorio principal rosetta y no haces ningún cambio en el contenido de los submódulos. -- Si te interesa cambiar el contenido de un submódulo, la cosa se complica un poco. 

Una cosa que debes tener en cuenta es que el contenido del archivo .gitmodules solo se usa cuando ejecutas `git submodule update --init`. Una vez que el submódulo está «inicializado», funciona como cualquier otro repositorio git. Esto significa que puedes agregar un remoto distinto (p. ej., tu fork) e interactuar con ese remoto «como de costumbre». La única complicación es que el repositorio principal `rosetta` tiene que actualizarse para apuntar al nuevo estado del submódulo en un PR distinto del PR que actualiza el submódulo.

Así que, si tienes cambios en un submódulo:

1. Primero haz un fork del repositorio del submódulo, si todavía no lo has hecho.
    Si ya lo hiciste, haz clic en el botón «Sync fork» para obtener las actualizaciones.

2. Ejecuta el habitual `git submodule update --init -- SUBMODULE_DIR` para hacer checkout del submódulo en tu copia de Rosetta.

3. Entra en el directorio del submódulo
    Mientras estés en el directorio del submódulo, cualquier comando de git se aplicará al repositorio del submódulo, no al repositorio principal `rosetta`.

4. Agrega tu fork como repositorio remoto (p. ej., `git remote add fork git@github.com:GITHUB_USERNAME/SUBMODULE_NAME.git` )
    No tienes que (ni debes) cambiar el archivo .gitmodules para que apunte a tu fork.
    Las direcciones que hay ahí solo se usan para inicializar el submódulo, y al desarrollar quieres que estén disponibles tanto el repositorio oficial como el fork.

5. Crea una rama nueva para tus cambios, basada en el estado actual del submódulo (p. ej., `git checkout -b BRANCHNAME`)

6. Haz tus cambios en el submódulo y hazles commit como lo harías normalmente (con `git add` y `git commit`).

7. Mientras estés en el directorio del submódulo, puedes hacer push de tu rama a tu fork del repositorio del submódulo (p. ej., `git push -u fork`)

8. Vuelve al directorio del repositorio principal rosetta.
    Un `git status` debería mostrar que hay commits nuevos en el directorio del submódulo.

9. Agrega los cambios del directorio del submódulo a una rama nueva del repositorio principal rosetta y haz push a tu fork del repositorio rosetta.
    Consulta las instrucciones anteriores. Prueba localmente todo lo que necesites.

10. Cuando estés listo para hacer un PR, primero haz un PR dentro del repositorio del submódulo, contra la rama `main` de la versión de RosettaCommons del repositorio del submódulo.
    
11. Solo después de haber hecho un PR al submódulo, haz un segundo PR para la rama de tu repositorio `rosetta`, como se indicó antes.
    Al escribir la descripción de tu PR, asegúrate de hacer referencias cruzadas a tus PR de los cambios del submódulo.
    Github reconocerá automáticamente descripciones como «RosettaCommons/tools#14» como un enlace cruzado al PR #14 del repositorio RosettaCommons/tools.
    (Puedes consultar el panel «Preview» para comprobar el enlace.)

GitHub no gestiona realmente la coordinación de la fusión de los cambios de submódulos con los PR. 
Además, como git identifica el estado del submódulo con una combinación de URL del repositorio y SHA1, para que las cosas funcionen necesitamos que el repositorio especificado (RosettaCommons/submodule) contenga el estado SHA1 correcto (la versión que enviaste a tu fork). Esto significa que, al fusionar, necesitamos fusionar tu PR del submódulo en el repositorio del submódulo de RosettaCommons antes de fusionar el PR en el repositorio `rosetta`.

Ten en cuenta que las pruebas de tu PR de `rosetta` fallarán hasta que se fusione el PR del submódulo. Según cuán esenciales sean tus cambios del submódulo para las pruebas, es posible que te pidamos que cambies el destino de tu PR del submódulo a una rama de desarrollo que crearemos para ti, en lugar de `RosettaCommons/submodule:main`. De ese modo, tus cambios se podrán fusionar en la versión de RosettaCommons del submódulo para permitir pruebas adecuadas y, si tienen éxito, podremos fusionar esa rama de desarrollo en `main` cuando fusionemos la rama en `rosetta`.

###Comandos comunes de Git

* Puedes obtener un mensaje de ayuda breve sobre un comando con «git <command> -h» y una ayuda más larga con «git help <command>»

git status: lista los archivos rastreados que han cambiado y el conjunto de archivos visibles que git no está rastreando

git add: prepara (stage) un archivo para hacerle commit

git commit: hace commit de los archivos que se han preparado con el comando git add

git checkout: cambia entre ramas

git clone: crea un repositorio nuevo prácticamente idéntico a uno existente

git branch:
  git branch
muestra en qué rama estás actualmente, o
  git branch <branchname>
crea una rama nueva; lee la sección de abajo sobre git personal-tracked-branch

###Cómo evitar hacer commit de archivos que no quieres

Para empezar, nunca uses
  git add -f
que fuerza la adición de archivos incluso si los has excluido explícitamente con .gitignore (más abajo).

Hay ciertos archivos de los que nunca queremos hacer commit al repositorio. Pueden ser archivos objeto y bibliotecas compilados de C++, archivos de bytecode de Python compilados, contraseñas, archivos de proyecto de IDE y archivos de intercambio de editores de texto, y archivos específicos del sistema operativo, como los directorios .DS_Store de los Mac. Como SVN, git tiene un método para evitar que estos archivos se suban y se les haga push al repositorio: los [[archivos .gitignore|https://help.github.com/articles/ignoring-files]].

Un archivo .gitignore es un archivo de texto simple en el que cada línea especifica archivos que se excluyen. Se permiten comodines. Por ejemplo, parte de un archivo .gitignore puede verse así:
  \*.pyc
  .idea/\*
  .DS_Store
Los archivos .gitignore se pueden crear en cualquier parte del árbol de código fuente y se comportan en relación con su ubicación. Son archivos de texto simples, así que, si se deben aplicar a todos, hay que hacerles commit y push como a cualquier otro archivo del repositorio. *Ten en cuenta que el código fuente de Rosetta ya tiene muchos archivos .gitignore, así que solo deberías necesitar crearlos para tus propias carpetas de aplicaciones.*

git también tiene la noción de un [[archivo .gitignore global|https://help.github.com/articles/ignoring-files#global-gitignore]]. Es un archivo que puedes crear para tu cuenta de usuario en tu estación de trabajo y que evitará que alguna vez hagas commit de ciertos tipos de archivos. Es una función muy útil.

###Uso de las pruebas de integración (o cómo evitar romper cosas en el servidor de pruebas)

Lo mejor es ejecutar las pruebas de integración con tus cambios antes de hacer push a origin.

1) Desarrolla en tu rama, haciendo todos los cambios que quieras, agregando archivos, haciendo commit a tu rama y haciendo push de esos commits a origin/your_branch

2) git checkout main

3) git pull

4) <genera los resultados de referencia de las pruebas de integración>

5) git merge new_branch

6) <genera los nuevos resultados de las pruebas de integración>

###Cómo arreglar las cosas (si desarrollaste en la rama equivocada)

Ejecuta una serie de comandos:

'git stash' pondrá los cambios del directorio de trabajo en el stash; después deberías tener un directorio de trabajo limpio

'git checkout -b my_new_branch' crea una rama nueva

'git stash apply' toma el primer elemento del stash y lo aplica al directorio de trabajo; también puedes tomar un elemento distinto (digamos el número 3) del stash con 'git stash apply stash@{3}'

ahora puedes preparar y hacer commit de tus cambios en tu nueva rama


###Trabajar en varias máquinas###

git es un sistema distribuido de control de versiones, lo que significa que no es necesario un repositorio central.  Como resultado, es posible configurar una computadora como remoto de otra y colaborar sin usar GitHub.

Sin embargo, por varias razones recomendamos encarecidamente no usar este flujo de trabajo.  En su lugar, deberías usar una topología «en estrella», con GitHub como remoto de todos los clones.  Para sincronizar datos entre máquinas, haz push y pull desde GitHub. 

Hay varias razones para ello.   

1. integridad de los datos: el trabajo realizado en proyectos de RosettaCommons debe tener copia de seguridad. Al hacer push a GitHub y pull desde él, te aseguras de que así sea
2. colaboración: al hacer push de tu trabajo a GitHub, permites que otros usuarios sepan que tu trabajo existe, lo que es fundamental en una comunidad colaborativa como esta
3. simplicidad del flujo de trabajo.  Un flujo A->B->C es más complejo de gestionar que un flujo A->C, B->C, ya que cada nodo del sistema tiene una longitud de camino de 1. Hay categorías enteras de salvedades al usar git que no existen si te ciñes a una topología en estrella.

###Herramientas recomendadas

####ZSH

[[ZSH|http://en.wikipedia.org/wiki/Z_shell]]  es un shell potente basado en bash que ofrece una amplia gama de mejoras en la visualización del prompt, los scripts y el autocompletado con tabulador (entre otras cosas). 
Las funciones de autocompletado y de visualización del prompt permiten a Zsh mostrar en el prompt información asociada a los repositorios git y autocompletar comandos de git. [[oh-my-zsh|https://github.com/robbyrussell/oh-my-zsh/]] es un conjunto de temas de prompt y complementos que facilita el uso de estas funciones.

####Herramientas de visualización de git
Puede ser muy útil visualizar el historial no lineal de git, que puede llegar a ser bastante complejo. Se han desarrollado varias herramientas con este fin, y el [[sitio web de git|http://git-scm.com/downloads/guis]] mantiene una lista para varias plataformas.

#####SourceTree
[[SourceTree|http://sourcetreeapp.com/]] es una herramienta de git gratuita para Mac OS X y Windows.  Ofrece integración con GitHub y proporciona una interfaz intuitiva para manejar operaciones comunes de git, buscar en el historial y mostrar las diferencias de los commits.

#####gitk
gitk es la herramienta de visualización de git «por defecto»; se instala por defecto junto con git y funciona en Windows, Mac OS X y Linux. Proporciona una interfaz rudimentaria para explorar y buscar en el historial de commits.


###Equivalencias entre SVN y git

Hay muchos comandos de git con nombres idénticos, pero la funcionalidad de estos comandos con frecuencia es diferente. [[Git SVN Crash Course|http://git.or.cz/course/svn.html]] es una comparación útil de los comandos de git y svn, que ofrece equivalentes aproximados en git de operaciones comunes de svn.  Debido a la naturaleza fundamentalmente distinta de git y svn, las salvedades y limitaciones asociadas a estas equivalencias son completamente diferentes.  Por ejemplo, al copiar un archivo en svn es obligatorio usar 'svn cp' en lugar de 'cp', mientras que el uso de 'git cp' es opcional. El libro electrónico [[Pro Git|http://git-scm.com/book]] es una referencia útil para quienes se interesan por los detalles de los comandos básicos de git.

## Flujo de trabajo para usar GitHub

(Esta sección trata por completo de cosas que haces en el sitio web de GitHub.  Nada de esto funciona sin internet).

###¿Qué es GitHub?
[[GitHub (enlace de wikipedia)|https://en.wikipedia.org/wiki/GitHub]] es un sitio web que:
1. aloja de forma remota y segura nuestro código base con git
2. permite la comunicación sobre dicho código base

Sobre el punto 1: necesitamos una forma de que nuestras computadoras se comuniquen sobre cuál es el código.  Git significa que todos tienen una copia de todas las ramas, pero aun así necesitamos alguna forma de que las computadoras de todos se comuniquen para compartir esas ramas.  En lugar de que todos ejecuten servidores en sus laptops constantemente, dejamos que GitHub centralice el proceso.

Sobre el punto 2: necesitamos una forma de comunicarnos entre nosotros sobre cuál es el código.  Cuando un desarrollador escribe una función nueva y quiere decir «aquí está mi nueva función, quiero fusionarla en main, echémosle un vistazo», GitHub nos permite organizar toda esa comunicación de maneras estrechamente vinculadas al código que se está discutiendo.

###Pull Request (PR)

Como todos escribimos código nuevo simultáneamente, no podemos fusionar todos en main cuando nos apetezca.  Además, necesitamos asegurarnos de que se ejecute el servidor de pruebas con el código que se envía a main.  Por último, necesitamos asegurarnos de que el código que se agrega a main esté libre de errores y cumpla las convenciones de programación.  El sistema de Pull Request nos ayuda a gestionarlo.

Los Pull Requests son una declaración formal de «quiero fusionar mi rama en `main`».  No se puede fusionar en main de ninguna otra forma.  La interfaz de Pull Request permite a la comunidad responder «queremos que tu código se fusione en main» o, alternativamente, «tu código necesita algunas correcciones antes de que lo fusionemos en main».  (No te preocupes, no hay juicio alguno en esta última afirmación.)  La respuesta de la comunidad se expresa a través del sistema de revisión de PR.

Todo el código que entra en main pasa por el sistema de Pull Request para garantizar la integridad del código base.

####Abrir un Pull Request
Si has hecho push de tu rama recientemente, GitHub lo notará y te mostrará un aviso de «¿quieres abrir un PR para tu código?».  Si no, navega hasta tu rama en GitHub y habrá un botón para abrir un PR.

Una vez que se inicie tu PR, verás una pestaña «conversation» que lista los commits de tu PR y tiene lugares para cuadros de comentarios, y «files changed», que mostrará una vista de diferencias con el resumen de cambios de todo tu PR.  También hay controles a la derecha para establecer etiquetas y revisores; de eso hablaremos enseguida.

####Revisión del Pull Request: qué hacer antes de la revisión
La revisión del PR significa que le pides a la comunidad que eche un buen vistazo a tu código. Es un poco como invitarnos a tu casa a una fiesta en tu código.  Antes de dar una fiesta, probablemente quieras ordenar un poco la casa:

0. Escribe código con buena documentación y pruebas unitarias que obedezca las convenciones de programación: son el tipo de problemas que buscarán los revisores y, cuantos menos haya, más fácil será para todos los implicados.

1. ¡Los PR pequeños son mejores!  Enviar PR pequeños con regularidad llevará a revisiones rápidas y fáciles.  Si el revisor puede dedicar 15 minutos o menos a revisar, lo hará como una pausa rápida de otro trabajo.  Si son cientos de líneas y requiere 2 horas de revisión, tiene que reservarlo como un bloque real de su trabajo del día.

2. Separa la refactorización y los traslados de archivos de los cambios en el contenido del código.  GitHub mostrará los archivos trasladados como una eliminación de archivo y una creación de archivo, lo que provoca un número enorme de líneas cambiadas.  Si tienes un archivo trasladado de 300 líneas y puedes decir con honestidad «esto es solo un traslado de archivo sin cambios sustanciales» (las rutas de archivo y los nombres de los tracers no son sustanciales), tu revisor podrá en su mayor parte saltárselo.  Si mezclas cambios reales de código con grandes traslados de archivos, el revisor tiene que recorrer todo el archivo buscando tus cambios.

3. ¡Ejecuta primero las pruebas!  Si el servidor de pruebas va a rechazar tu código de todos modos, trabaja primero con él antes de gastar tiempo de desarrolladores humanos en el problema.  Se puede aplicar la etiqueta `90_standard_tests` para indicarle al servidor de pruebas que estás listo para que examine tu código.  Por lo general, deberías esperar a un estado de pruebas limpio antes de solicitar revisión.

4. ¡Ejecuta primero el beautifier!  Técnicamente esto ya está en «ejecuta primero las pruebas», pero vale la pena reiterarlo.  El beautifier introduce un gran número de cambios que solo afectan a los espacios en blanco de tu código.  Los revisores suelen dejar sus comentarios vinculados a líneas de código concretas.  GitHub asume que cualquier cambio en una línea de código que ocurra después de la revisión invalida (o corrige) un comentario del revisor, de modo que, si primero recibes la revisión y después aplicas el beautifier, GitHub ocultará todos los comentarios de tus revisores. Puedes ejecutar el beautifier localmente con el script `tools/python_cc_reader/beautify_changed_files_in_branch.py`.

####Revisión del PR: cómo conseguir una revisión
Una vez que hayas recibido luz verde del servidor de pruebas y hayas revisado tu propio código en busca de problemas, estás listo para una revisión externa.
* Aplica la etiqueta `ready_for_review` en GitHub.
* Si conoces a algunas personas interesadas en tu código, ya sea porque es código en el que han trabajado o porque comparten un interés científico, puedes solicitar su revisión en los controles de la derecha de tu PR.
* Si no sabes quién sería un buen revisor, publica en rosetta-devel o en slack pidiendo una revisión, y alguien se encargará de ella.
* Si tienes verdaderos problemas para conseguir un revisor, abre una discusión en rosetta-devel o en slack.  El problema podría ser que el PR es demasiado grande y nadie quiere pasar 3 días revisándolo; en ese caso, organizar una teleconferencia con uno o dos revisores acelerará enormemente las cosas (puedes revisar código 10 veces más rápido si el autor te lo explica paso a paso).

####Qué esperar de tu revisión
* Probablemente te rechacen al principio.  Está bien: básicamente todo el código tiene al menos una cosa mal, podrás corregirla y obtener la aprobación.
* Espera que la comunidad señale con amabilidad:
** Errores en tu código
** Código mal comentado
** código que no cumple los estándares, como `const &` que faltan
** código muy ineficiente
** código sin pruebas

####Qué hacer como revisor
* Asegúrate de que el código no rompa nada: mira las pruebas.  Asegúrate también de que el código nuevo TENGA pruebas que demuestren que funciona.  Comprobar que la prueba existe y tiene buen aspecto es mucho más fácil que leer las funciones línea por línea y compilarlas mentalmente.
* Exige cambios para los problemas del código (véase la lista anterior)
* Sugiere mejoras de legibilidad, estabilidad y documentación
* Declina ser revisor si tienes un conflicto de intereses o si sientes la tentación de hacer ataques personales
* Siéntete libre de no revisar una solicitud que no esté en un área de tu interés o experiencia como revisor
* No agregues solicitudes de funcionalidades a los PR («este PR también debería manejar mi caso X»): normalmente eso debe dejarse para PR futuros.  (Es una línea gris difusa).
* No mezcles discusiones sobre el mérito científico con discusiones sobre el código en sí: la revisión de PR no es el lugar adecuado.

####Qué hacer una vez que tu código ha sido revisado
* En términos generales, corrige los problemas identificados por tu revisor.  Una vez que esos cambios se hayan subido y el servidor de pruebas vuelva a aprobar, avisa a tu revisor para que pueda volver a revisar y convertir la X en una marca de verificación.
* Si sientes que la revisión va mal o que te están tratando de forma injusta, puedes y debes llevarlo a la atención de tu asesor.

##Véase también

* [[Git Sometimes Commands]]: otros comandos de Git útiles
* [[GitNoNoCommands]]: comandos de Git que **no** debes usar con los repositorios de RosettaCommons
* [[Reverting a commit]]: caso de estudio sobre cómo revertir un commit defectuoso
* [[Development Documentation]]
* [[Pull Requests]]

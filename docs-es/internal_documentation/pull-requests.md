#Cómo hacer un Pull Request

En lugar de fusionar una rama directamente en la rama master del repositorio principal de Rosetta, ahora cualquier cambio importante se hace mediante pull requests de GitHub. 
Estas solicitudes pueden (y deben) hacerse mucho antes de que la rama en cuestión esté lista para fusionarse, ya que ofrecen a los desarrolladores un mecanismo para:
-	informar a otros desarrolladores del tipo de cambios que están haciendo, 
-	obtener comentarios de otros desarrolladores (en particular de quienes puedan estar familiarizados con las áreas relevantes del código), y 
-	contar con un mecanismo sencillo y directo para asegurarse de que la rama no «rompa» el código, mediante pruebas automáticas a través del [[servidor de pruebas|testing server]].

Antes de hacer un pull request, el desarrollador debe crear primero una rama que tenga seguimiento en GitHub (consulta la página [[GithubWorkflow]] para más detalles).
Todo el código debe confirmarse (commit) en esta rama.
Para crear un pull request, ve primero a la página principal de GitHub del repositorio principal y selecciona tu rama en el menú desplegable.
Al hacer clic en el botón a la izquierda de este menú se abrirá una página que compara la rama con (por defecto) master, y habrá un botón disponible para crear un pull request. 

Cuando se hace un pull request, todos los desarrolladores que estén configurados para seguir el repositorio recibirán una notificación. Se anima a los desarrolladores a revisar y comentar los pull requests de los demás.


##Pull Requests y el servidor de pruebas

Una vez que hayas enviado un pull request para tu rama, puedes hacer que se pruebe automáticamente con el [[servidor de pruebas|testing server]] de Rosetta. Cuando un pull request se etiqueta como «ready for testing», el servidor de pruebas indicará automáticamente si el pull request se puede fusionar automáticamente (es decir, pasa las pruebas), si el pull request provoca cambios en las pruebas de integración («MERGE WITH CAUTION»), o si el commit aún no está listo para fusionarse.  Cuando el pull request pasa las pruebas o provoca cambios en las pruebas de integración, se activará un botón verde que permite a cualquier usuario fusionar el pull request en master.  

##Tutorial

Hay un tutorial disponible como diapositivas en PDF ([[https://drive.google.com/file/d/1NTTcCi_FilNuyq8w16tYbLHsc8JjVcP5/view?usp=sharing]]) y debería haber una grabación en la página de la wiki de WinterRosettaCon 2021. 


##Véase también

* [[Development Documentation]]
* [[GitHubWorkflow]]

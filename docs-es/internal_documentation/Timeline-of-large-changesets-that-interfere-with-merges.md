Esta es una lista de conjuntos de cambios grandes (y sus fechas) que probablemente interfieran con las fusiones.  Si creas una rama en enero, en marzo se hace un cambio grande en todo el código base y quieres fusionar de vuelta en master en abril, es posible que acabes con conflictos de fusión.  A menudo los «conjuntos de cambios grandes» se hacen de forma semiautomática (con ```sed``` o algo similar), así que este sería un buen lugar para documentar lo que se hizo y aproximadamente cómo reproducirlo en una rama independiente para facilitar la fusión.

Agrega las novedades al principio para ver primero lo más reciente.

[Consulta también esta lista en la wiki de mediawiki.](https://wiki.rosettacommons.org/index.php/RecentChanges)

##División de ResidueType.
* [PR de GitHub](https://github.com/RosettaCommons/main/pull/3770) (bastante discusión: haz clic para desplegar los comentarios y verlos todos)
* Los cambios y conflictos de fusión hay que resolverlos manualmente. (Lo sentimos, no hay línea de sed.)
* La clase ResidueType se dividió en tres clases: ResidueTypeBase, ResidueType y MutableResidueType.
* Todo lo que modifique ResidueType ahora debe usar MutableResidueType en su lugar.
* El ResidueTypeSet y el Pose (y la mayoría de las demás cosas) seguirán usando el objeto ResidueType (no modificable).
* La mayor parte del uso de ResidueType que no modifica nada sigue igual. Excepto:
    * los accesores VD/ED ya no están presentes en ResidueType; usa en su lugar el acceso por nombre o por índice
    * los objetos Atom y Bond ya no están disponibles a través de ResidueType. Accede a los datos directamente en ResidueType
        * p. ej., `residue_type.atom(ii).ideal_xyz()` -> `residue_type.ideal_xyz(ii)`


##core::graph a utility::graph
* [github {conjunto de cambios enorme, no hagas clic}](https://github.com/RosettaCommons/main/commit/7b5bf62fea4002c0f3e30412a459b69c95078bca?w=1)
* [servidor de pruebas](http://test.rosettacommons.org/revision?id=58908&branch=master)
* Cómo arreglarlo: ```sed -i "s/core::graph/utility::graph/g"``` según sea necesario.

##pose.total_residue() a pose.size()
* [github (conjunto de cambios enorme, no hagas clic)](https://github.com/RosettaCommons/main/commit/dba6351aa665ff0d3eff950a670078170661bf31?w=1)
* [servidor de pruebas](http://test.rosettacommons.org/revision?id=58904&branch=master)
* sed, pero en realidad no hace falta; el antiguo total_residue no se dejó totalmente obsoleto.  Supongo que el otro accesor sí.

##Modernizaciones de Cxx11
* [[cxx11-merge]]

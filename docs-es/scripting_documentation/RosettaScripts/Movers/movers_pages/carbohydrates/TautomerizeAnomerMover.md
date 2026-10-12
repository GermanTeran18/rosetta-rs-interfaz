##Metadatos

`Mover` creado por Labonte <JWLabonte@jhu.edu>.

##Descripción
Un `Mover` para tautomerizar el carbono anomérico de residuos de sacárido del extremo reductor.

A partir de un [[ResidueSelector]] dado y limitado por un [[MoveMap]], este `Mover` específico de carbohidratos selecciona al azar residuos de sacárido del extremo reductor aplicables ("libres"; es decir, que no son glicósidos) y los sustituye por su anómero. Por ejemplo, los azúcares &alpha; se convertirán en azúcares &beta; y _viceversa_. Los azúcares del extremo reductor se tautomerizan con facilidad entre las dos formas isoméricas en soluciones acuosas, y por lo general no se sabe con certeza cuál de las formas es la preferida (si hay alguna) en proteínas que unen azúcares.

Esto podría considerarse un caso de diseño extremadamente limitado; sin embargo, ¡los extremos reductores se tautomerizan con facilidad en solución, a diferencia de otros casos en los que los residuos no mutan con facilidad en otros! Por lo general no se sabe con certeza cuál de las formas es la preferida (si hay alguna) en proteínas que unen azúcares, y a veces las estructuras cristalográficas asignan arbitrariamente un anómero en lugar de otro al ajustar la densidad, así que este `Mover` puede asegurar que se muestrea cada anómero.

##Detalles de RosettaScripts
[[include:mover_TautomerizeAnomerMover_type]]
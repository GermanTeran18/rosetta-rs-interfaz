#Escribir un nuevo SimpleMetric

<!--- BEGIN_INTERNAL -->

Desde RosettaCon 2019, no se deben añadir nuevos filtros a Rosetta*  

Entonces, ¿qué los reemplaza? Los SimpleMetrics. Los SimpleMetrics son una herramienta que permite calcular alguna propiedad de un Pose, almacenarla y escribir los datos en un scorefile. Estos SimpleMetrics también se pueden usar para Filtros y FeaturesReporters, lo que amplía enormemente su uso en todo Rosetta. 

Para una buena descripción de su uso, consulta la documentación de [[SimpleMetric | SimpleMetrics ]]. Aquí nos centraremos en escribir un RealMetric, pero cualquier métrica se puede usar como filtro mediante el [[SimpleMetricFilter]].

--------
*Excepción: un contenedor (wrapper) de Filtro que llama al SimpleMetric central para hacer su cálculo y que analiza su interfaz XML. Este contenedor delgado solo debe tener código adicional para los valores de corte, nada más.

[[_TOC_]]


##Generación de plantillas

Para escribir un SimpleMetric, la forma más fácil de empezar es usar los [[generadores de plantillas de código | code_templates]]. Cada SimpleMetric tiene un tipo asociado. Por ahora usamos una métrica real y hacemos que el generador coloque los archivos en el directorio principal de SimpleMetric: `core/simple_metrics/metrics`.

Primero, veamos cómo usar las plantillas:
```
cd main/source/code_templates
./generate_templates.py --help
```

Bien, este es un ejemplo de un nuevo RealMetric que vamos a escribir
```

./generate_templates.py --type metric_real --class_name RadiusOfGyrationMetric --brief "A metric to report the radius of gyration of a complex or individual chain within a pose" --namespace core simple_metrics metrics 
```

Abre los archivos hh y cc de nuestra métrica. 

##Programación

Estas son las funciones que tendrás que programar. No te preocupes: ¡son pocas!


### `.calculate(pose)`

Todos los SimpleMetrics hacen sus cálculos principales en el método `calculate`. Es análogo al método apply de un mover. En nuestra métrica real, el método calculate recibe un Pose constante y devuelve un real. Adelante, completa tu método calculate. 


### `.name()` 

Este es el nombre de la clase; debería estar completado por ti mediante la generación de plantillas.


### `.metric()`

Esta es la etiqueta de la métrica. Por ejemplo, `rmsd` para RMSDMetric, `sasa` para SasaMetric, etcétera. Será la etiqueta en el scorefile y se usará para almacenar los datos dentro del Pose (consulta `SimpleMetricData` si quieres ver cómo se hace esto internamente). Si sigues nuestro ejemplo, `radius_of_gyration` serviría aquí: es explícito y no choca con el término de puntuación 'rg'. 

### Interfaz XML: `.parse_my_tag` y `.provide_xml_schema`

Probablemente ya los has visto antes. Son la interfaz con el XML que tendrás que completar. Consulta un SimpleMetric ya escrito, como SASAMetric, para ver un buen ejemplo.  

`.provide_xml_schema` es, en esencia, la documentación de la métrica. Se analiza automáticamente para crear una página de documentación en el wiki de documentación. Probablemente querrás añadir una página en blanco con tu nombre e incluir esto más adelante. Llegaremos a eso enseguida. 

`.parse_my_tag` es donde realmente traes a la clase las opciones definidas en el XML del usuario. Aquí es donde lees y estableces las variables. Sin embargo, debes usar funciones de nivel de código para ESTABLECER las variables privadas. No olvides que tu código debería poder usarse dentro de XML o dentro de código base de C++/Python. Para cada variable privada que establezcas aquí, debes tener una función setter asociada. Tu código puede usar selectores de residuos y otros objetos XML almacenados en el data map. Mira otro código para ver cómo hacerlo. Consulta el RMSDSelector para ver código que lo hace.  

¡Eso es todo! Todo ha sido completado por ti con los generadores. ¡Salud!

##Finalizar: añade tu SimpleMetric a la factory

Por último, tendrás que añadir tu nueva métrica a la factory correspondiente. Sigue a las demás métricas de este archivo, en orden alfabético. Los dos archivos que tendrás que editar son: `source/src/core/protocols/init.SimpleMetricCreators.ihh y `source/src/core/protocols/init.SimpleMetricRegistrators.ihh`

##Documentar

La documentación de tu SimpleMetric es extremadamente importante y la NECESITARÁS para quien revise tu Pull Request.  

Primero, asegúrate de que tu función provide_xml_schema sea tan detallada como sea posible. En lugar de escribir muchísima documentación, esta función hará que tu documentación cambie a medida que cambia el código y esté tan actualizada como sea posible.  

Segundo, edita esta página: [[SimpleMetrics]]
Sigue a las demás métricas y añade tu métrica a la tabla del tipo de métrica correspondiente. En este ejemplo usamos un RealMetric. Usa la sintaxis `[[MyNewMetric]]`. Pulsa guardar. Haz clic en el enlace. Esto creará una nueva página para ti. Asegúrate de añadir 'see other' al final, como en las demás métricas. La sintaxis para añadir automáticamente tu documentación autogenerada desde la página provide_xml_schema es esta:
`[[include:simple_metric_MyNewMetric_type]]` donde `MyNewMetric` es el nombre de la clase que acabas de escribir

##Conclusión

A estas alturas, esto debería haberte mostrado todo lo que necesitas para escribir un nuevo SimpleMetric y usarlo en Rosetta. También querrás escribir una prueba unitaria para tu nueva métrica. Puedes escribir un nuevo archivo de prueba unitaria con el generador de código, o añadir la prueba de tu simple metric como una nueva función dentro de `source/test/protocols/analysis/simple_metrics/SimpleMetricProtocols.cxxtest.hh`  Tu código necesitará una prueba unitaria para la revisión, así que es una excelente forma de comprobar que tu código funciona correctamente. 

Con esto, ya deberías poder usar tu nuevo SimpleMetric como desees. ¡Salud!

<!--- END_INTERNAL -->
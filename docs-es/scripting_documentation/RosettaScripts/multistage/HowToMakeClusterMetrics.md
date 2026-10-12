#MultistageRosettaScripts

#Cómo crear una métrica de agrupamiento

Volver a [[Rosetta Scripts multietapa|MultistageRosettaScripts]]

Volver a [[Agrupamiento en MRS|MRSClustering]]

[[_TOC_]]

##Paso 1: Crear una clase nueva

Tendrás que crear una clase nueva en
`protocols/multistage_rosetta_scripts/cluster/metrics`
que derive de ClusterMetric en
`protocols/multistage_rosetta_scripts/cluster/ClusterMetric.hh`.
Deberías terminar con los siguientes archivos:

- `protocols/multistage_rosetta_scripts/cluster/x.fwd.hh`
- `protocols/multistage_rosetta_scripts/cluster/x.hh`
- `protocols/multistage_rosetta_scripts/cluster/x.cc`
- `protocols/multistage_rosetta_scripts/cluster/xCreator.hh`

Tus clases también deben añadirse a `src/protocols_e.6.src.settings`
para que se compilen.

##Paso 2: Implementar las funciones virtuales de la métrica de agrupamiento

ClusterMetric requiere las siguientes sobrescrituras
(además del destructor, por supuesto):

###distance()

Este método recibe otra métrica y devuelve la distancia entre las dos.
Una distancia grande significa que los dos valores son muy distintos
y una distancia pequeña significa que son muy similares.

Puedes suponer que la otra métrica es del mismo tipo que `this`.
En otras palabras, puedes convertir directamente `other` en una instancia de tu clase.

```c++
platform::Real
distance( ClusterMetric const & other ) const override;
```

###parse_my_tag()

Este método es un poco distinto de los `parse_my_tag()` de otras clases.
Por ese motivo, el nombre podría ser distinto cuando leas esto
(si es así, actualiza esta página).

Se llama cuando la Pose está lista para medirse.
Al final de esta función, la métrica deseada debe
estar guardada en tu clase para que esté disponible cuando se llame a `distance()`.

```c++
void
parse_my_tag (
	     core::pose::Pose const & pose,
	     utility::tag::TagCOP tag,
	     basic::datacache::DataMap & datacache
) override;
```

##Paso 3: Implementar las funciones virtuales del creador de la métrica de agrupamiento

Puedes consultar las clases de métricas de agrupamiento ya creadas para ver cómo se comportan estos métodos.

```c++
// Return a new metric.
ClusterMetricOP create_metric() const override;

// Return the tag name associated with this factory.
std::string keyname() const override;

// Describe the schema for the Cluster Metric that this Creator is responsible for
void provide_xml_schema( utility::tag::XMLSchemaDefinition & xsd ) const override;
```

##Paso 4: Registrar la clase en ClusterMetricFactory

Añade las líneas correspondientes a `src/protocols/init/init.ClusterMetricCreators.ihh`
y `src/protocols/init/init.ClusterMetricRegistrators.ihh`.
Si no sabes qué hacer, basta con seguir el patrón de las líneas que ya hay allí.

##Véase también

* [[Rosetta Scripts multietapa|MultistageRosettaScripts]]
* [Tutorial introductorio de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/scripting_with_rosettascripts/scripting_with_rosettascripts)
* [Tutorial avanzado de RosettaScripting](https://www.rosettacommons.org/demos/latest/tutorials/advanced_scripting_with_rosettascripts/advanced_scripting_with_rosettascripts)
* [[Scripting Documentation]]: La página principal de la documentación de scripting
* [[Getting Started]]: Una página para quienes empiezan con Rosetta
* [[Application Documentation]]: Enlaces a la documentación de diversas aplicaciones de Rosetta


# Restricción SAP (sap_constraint) 

[[_TOC_]]

Autor: Brian Coventry (2020)

## Descripción breve

La puntuación SAP es una propiedad de las proteínas que determina su propensión a agregarse. Se desarrolló originalmente para anticuerpos, pero tiene muchísimos usos para proteínas. Proviene de este artículo:

[Developability Index: A Rapid In Silico Tool for the Screening of Antibody Aggregation Propensity](https://jpharmsci.org/article/S0022-3549(15)31778-0/abstract)


Brian Coventry añadió a Rosetta varias maneras de calcularla, así como de diseñar con ella. Consulta abajo las distintas opciones.


<!-- Al momento de escribir esto, no está publicado, así que no hay nada que citar. Supongo que lo dejamos así hasta que sea lo bastante importante para el trabajo de alguien como para que necesite describirlo en los métodos. En ese momento, esa será la publicación que citar. (Probablemente podrías citar el artículo original del Developability Index. Las SimpleMetrics son triviales. Los movers son el único lugar donde hizo falta algo interesante.) -->

### Notas
El radio que determina qué residuos se consideran al calcular la puntuación SAP de un residuo o región concretos es de 5Å. 
<!-- Editores futuros: consulten este hilo de Slack para más detalles: https://rosettacommons.slack.com/archives/C1YUV43SA/p1752771913618579 -->

<!-- ## Maneras de usarlo

Algún día, esta documentación será mejor. -->

### Simple Metrics

Estas métricas calculan puntuaciones SAP: 

[[SapScoreMetric|scripting_documentation/RosettaScripts/xsd/simple_metric_SapScoreMetric_type]]

[[PerResidueSapScoreMetric|scripting_documentation/RosettaScripts/xsd/simple_metric_PerResidueSapScoreMetric_type]]

### Movers

Para que funcionen, debes habilitar el término de puntuación sap_constraint. Idealmente con weight = 1.

[[AddSapConstraintMover|scripting_documentation/RosettaScripts/xsd/mover_AddSapConstraintMover_type]]

[[AddSapMathConstraintMover|scripting_documentation/RosettaScripts/xsd/mover_AddSapMathConstraintMover_type]]


### Código

Puedes obtener puntuaciones SAP de todo el Pose, por residuo y por átomo con estas funciones.

```
core.pack.guidance_scoreterms.sap.calculate_sap()
core.pack.guidance_scoreterms.sap.calculate_per_res_sap()
core.pack.guidance_scoreterms.sap.calculate_per_atom_sap()
```

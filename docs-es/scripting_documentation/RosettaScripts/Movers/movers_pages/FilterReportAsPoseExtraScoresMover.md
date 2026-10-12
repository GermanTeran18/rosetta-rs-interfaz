# FilterReportAsPoseExtraScoresMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FilterReportAsPoseExtraScoresMover

Por alguna razón, el valor que los [[filtros|Filters-RosettaScripts]] informan en el [[scorefile|Glossary#scorefile]] es su valor al final de la ejecución, no su valor en el momento en que realizan la operación de filtrado. Este Mover guarda el valor informado por un filtro en el momento en que se le llama en PoseExtraScores, para escribirlo después en el scorefile.
Este valor puede extraerse con [[ReadPoseExtraScoreFilter|ReadPoseExtraScoreFilter]].

```xml
<FilterReportAsPoseExtraScoresMover name="&string" report_as="(&string)" filter_name="(&string)"/>
```

- report_as: la etiqueta de texto del informe en el scorefile. No debería ser igual a la etiqueta de informe del filtro; de lo contrario, no estoy seguro de cuál sobrescribe a cuál. Es necesario porque el filtro igualmente va a informar su valor habitual de final de ejecución. 
- filter_name: el objeto Filter que se ejecutará. Espera encontrarlo en el DataMap, por lo que debe haberse declarado en el bloque FILTERS de tu xml.

##Nota 
La etiqueta `Add` de la sección de protocolos acepta el valor `report_at_end`, que evitará que los filtros devuelvan el valor al final de la ejecución. Por ejemplo:

```xml
<Add filter="vbuns" report_at_end="false"  />
```

Junto con la opción `-mute protocols.rosetta_scripts.ParsedProtocol.REPORT`, los filtros se llamarán solo una vez y devolverán el valor esperado.

##Véase también

* [[WriteFiltersToPose]]: úsalo si quieres escribir los valores de todos los filtros (útil para analizar datos). 
* [[I want to do x]]: guía para elegir un mover

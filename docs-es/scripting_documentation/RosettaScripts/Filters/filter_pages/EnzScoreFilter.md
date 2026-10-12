# EnzScore
*Volver a la página de [[Filtros|Filters-RosettaScripts]].*
## EnzScore

Calcula las puntuaciones de un Pose, p. ej., una interfaz ligando-proteína, teniendo en cuenta (o no) la cst\_energy al estilo de enzdes. Se puede acceder a los residuos por res\_num/pdb\_num o por su identificador de restricción. Se puede especificar una y solo una de las etiquetas res/pdb\_num, cstid y whole\_pose. Para pasar, la energía debe ser menor que energy_cutoff.

Si whole_pose=0 y no se especifica ni res_num/pdb_num ni cstid, EnzScore intentará determinar automáticamente el residuo del ligando y calcular la puntuación de ese residuo.  Esto funciona con Poses simples, por ejemplo cuando se trata de una sola cadena polipeptídica y un solo ligando conectado por el último jump del Pose.  Varias cadenas, varios ligandos, simetría, etc. pueden romper esta funcionalidad, así que se recomienda encarecidamente especificar una de las opciones whole_pose, res/pdb_num o cstid siempre que sea posible.

```xml
<EnzScore name="(&string)"  scorefxn="(&string, score12)" whole_pose="(&bool,0)" score_type="(&string)" res_num/pdb_num="(see convention)" cstid="(&string)" energy_cutoff="(0.0 &float)"/>
```

-   cstid: cadena que corresponde a cst\_number+plantilla (A o B, como en los remarks y en los bloques del cstfile). Cada cst de enzdes es entre dos residuos; A o B permite acceder al residuo correspondiente de una restricción dada, p. ej., cstid=1A significa cst \#1 plantilla A (es decir, para la 1.ª restricción, el residuo que corresponde al bloque que se describe primero en el cstfile y a su línea REMARK correspondiente en el encabezado), cstid=4B (para la 4.ª restricción, el residuo que se describe en segundo lugar en el bloque del cstfile y su línea REMARK en el encabezado).
-   score\_type: los score\_types habituales de Rosetta; cstE calcula la energía de restricción al estilo de enzdes
-   whole\_pose: calcula las puntuaciones totales de todo el Pose
-   pdb\_num/res\_num: véase [[RosettaScripts#rosettascripts-conventions_specifying-residues]]

## Véase también

* [[Matching|match]]
* [[Diseño de enzimas|enzyme-design]]
* [[Docking de ligandos|ligand-dock]]
* [[LigInterfaceEnergyFilter]]
* [[RepackWithoutLigandFilter]]

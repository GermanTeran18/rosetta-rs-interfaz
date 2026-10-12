Hay una descripción general de este esfuerzo de optimización de la función de energía [[aquí|Overview-of-Seattle-Group-energy-function-optimization-project]].

Para información sobre el conjunto anterior de actualizaciones de esta función de puntuación, consulta la página de la función de puntuación beta nov15 [[aquí|Updates beta nov15]].


En la mayoría de los protocolos (los que usan _getScoreFunction_ para establecer la función de puntuación del protocolo), la opción **-beta_nov16** _o_ simplemente **-beta** (que siempre cargará la función de energía beta más reciente) cargará esta versión de la función de energía beta.

En los protocolos de _RosettaScripts_ se debe proporcionar la opción **-beta_nov16** _o_ **-beta**, y se debe hacer la siguiente declaración de función de puntuación:

**\<beta weights=beta_nov16/\>** _o_ **\<beta weights=beta/\>**

### Parámetros optimizados 

La optimización siguió el mismo esquema que [[beta_nov15|Updates beta nov16]], con nuevos conjuntos de decoys para docking generados con beta_nov16. Los parámetros optimizados incluyen:

* Todos los dgfree de LK
* Un conjunto de términos que controlan las cargas parciales
* Un conjunto de términos que controlan la geometría de LK_ball (por ejemplo, distancia, ángulo, torsión y atenuación hacia la posición ideal del agua)
* Un conjunto de metaparámetros que controlan los "factores de corrección" torsionales aplicados a rama y fa_dun
* Pesos de todos los subtérminos torsionales y de LK

Se realizaron varias rondas de refinamiento en las que se consideraron subconjuntos de estos términos.

**Potencial de agua puente (lk_bridge y lk_bridge_uncpl)**

En esta variante de la función de puntuación se ha incorporado un término que evalúa la contribución de las moléculas de agua puente. El término coloca aguas virtuales ideales sobre todos los grupos polares, y la superposición entre estas aguas virtuales se otorga como una bonificación (la atenuación a medida que disminuye la superposición se ajusta como un parámetro). Además, el ángulo entre los átomos base controla la intensidad de esta bonificación. Se divide en dos subtérminos:

* lk_bridge: la bonificación se escala según la desolvatación de los dos átomos pesados entre sí
* lk_bridge_uncpl: la bonificación es fija

En beta_nov16, ambos términos tienen el mismo peso, aproximadamente **-0.3**.

**Energías intra-etable y correcciones torsionales**

En beta_nov16, todas las energías etable intrarresiduo y fa_elec intrarresiduo están activadas con el mismo peso que el término interresiduo correspondiente. Todas usan las variantes xover4 de Rhiju para que el comportamiento de count pair sea coherente tanto intrarresiduo como interresiduo. Para evitar el doble conteo, el esquema de corrección torsional de Conway y DiMaio (Prot. Sci. 2016) se aplica tanto a fa_dun como a rama.

Activar estas energías intrarresiduo debería (con suerte) mejorar la interoperabilidad con aminoácidos no canónicos, así como con ligandos y ácidos nucleicos.

**Aceptores de puentes de hidrógeno sp3**

Se ha implementado un potencial modificado para los aceptores de puentes de hidrógeno sp3. En lugar de usar un potencial torsional explícito, usa un potencial "soft-max" entre ambos "átomos base" (por ejemplo, para la serina, el término angular pasa a ser soft-max(f_ang(CB-OG-Hdon),f_ang(HG-OG-Hdon)). Este potencial está **activado por defecto para el agua**, ya que el potencial anterior era incorrecto. Está activado para todos los aceptores sp3 en -beta_nov16.

**Ajuste de los pesos de referencia**

Se usó un nuevo esquema para el ajuste de los pesos de referencia en el que, tras ajustar todos los demás términos, se optimizó la suma ponderada de lo siguiente:
* Recuperación del perfil de secuencia uno a la vez (similar a beta_nov15)
* Distancia de la distribución de aminoácidos nativa frente a la de diseño, uno a la vez
* Recuperación de secuencia todos a la vez
* Distancia de la distribución de aminoácidos nativa frente a la de diseño, todos a la vez
* Predicción de los DDG de protherm (siguiendo [[https://www.ncbi.nlm.nih.gov/pubmed/21287615]])
* Predicción de la resistencia a proteasas de los diseños (de [[https://www.ncbi.nlm.nih.gov/pubmed/28706065]])

Para las dos últimas métricas, la función objetivo fue la correlación de rangos entre experimento y simulación. Los pesos de cada conjunto se eligieron de modo que ninguna prueba individual empeorara significativamente (>1% de recuperación o >0.01 de correlación) durante el ajuste.

**Otros cambios menores**

* Se ha refactorizado el código trie_vs_trie de fa_elec, eliminando las variables mutables del método de energía.
* Se ha actualizado el comportamiento por defecto de RRComparerElecDens tras una inspección visual más detallada de sus resultados
* Se ha eliminado el código envdep_new incorporado como parte de beta_nov15 (no se usó ni en beta_nov15 ni aquí)
* Pequeños cambios en la lógica de carga de los archivos de parámetros de rama_prepro
* Se ha incorporado hxl_tors de Hahnbeom (del parche de beta nov15), que sustituye el potencial de torsión de hidroxilos de cart_bonded.



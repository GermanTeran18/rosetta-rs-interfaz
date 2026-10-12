Hay una descripción general de este esfuerzo de optimización de la función de energía [[aquí|Overview-of-Seattle-Group-energy-function-optimization-project]].

Para información sobre el conjunto anterior de actualizaciones de esta función de puntuación, consulta la página de la función de puntuación beta nov16 [[aquí|Updates beta nov16]].

En la mayoría de los protocolos (los que usan _getScoreFunction_ para establecer la función de puntuación del protocolo), la opción **-gen_potential** _o_ simplemente **-beta** (que siempre cargará la función de energía beta más reciente) cargará esta versión de la función de energía beta.

En los protocolos de _RosettaScripts_ se debe proporcionar la opción **-gen_potential** _o_ **-beta**, y se debe hacer la siguiente declaración de función de puntuación:

**\<ScoreFunction name="beta" weights="beta_genpot"/\>** _o_ **\<ScoreFunction name="beta" weights="beta"/\>**

### Nueva asignación de tipos de átomo

Se ha introducido un esquema alternativo de tipos de átomo. Se ha añadido una aplicación alternativa de generación de archivos params, _scripts/python/public/generic_potential/mol2genparams.py_, para manejar la generación de parámetros con los nuevos tipos de átomo. NOTA: esta nueva asignación de tipos es completamente independiente de la asignación de tipos de átomo de las proteínas. Para más información sobre cómo se definen estos tipos de átomo y cómo funciona, consulta [[aquí|GenericAtomtypes]].
* Se ha añadido un potencial torsional genérico, _gen_bonded_, que usa estos nuevos tipos. Este potencial está _indefinido (devuelve 0) para los residuos que no son ligandos_. 
* Los parámetros LK y LJ se han ajustado para estos nuevos tipos de átomo usando una combinación de datos cristalográficos de moléculas pequeñas y estructuras de proteínas unidas a ligandos.

### Término de torsión generalizado
Un término de torsión generalizado llamado "gen_bonded", componente de la función de energía generalizada, se define según los tipos de átomo y los tipos de enlace en el eje de la torsión. Usa la forma funcional habitual de los campos de fuerza convencionales, que representa la preferencia torsional como una serie de funciones coseno hasta el cuarto orden. Los parámetros asociados con el término se encuentran en el archivo ubicado en la base de datos de Rosetta: database/scoring/score_functions/generic_potential/generic_bonded.round6p.txt

## Docking de ligandos

Se ha añadido un nuevo protocolo de docking de ligandos, [[GALigandDock]], que aprovecha este nuevo potencial genérico. Combina una puntuación rápida sobre una malla precalculada con un algoritmo genético para permitir un docking de ligandos muy preciso en un total de 3-10 minutos de CPU por objetivo (cadenas laterales fijas) o 10-30 minutos de CPU en total (cadenas laterales flexibles).

### Preparación del ligando
El proceso completo de preparación para las ejecuciones de GALigandDock, a partir de una cadena SMILES o de un archivo mol2 y con la asignación de los tipos de átomo generalizados adecuados mediante mol2genparams.py, se encuentra [[aquí|GALigandDockpreprocessing]].
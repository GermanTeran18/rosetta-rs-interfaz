#Docking de UBQ conjugada químicamente 

Metadatos
=========

Autor: Steven Lewis (smlewi@gmail.com)

Última edición el 23/8/13. Código de Steven Lewis. Investigador principal responsable: Brian Kuhlman (bkuhlman@email.unc.edu).

Nota sobre el contenido y la historia
=====================================

Esta página documenta tres aplicaciones: UBQ\_E2\_thioester, UBQ\_Gp\_CYD-CYD y UBQ\_Gp\_LYX-Cterm. El código y la documentación se escribieron originalmente para la versión de tioéster. Las otras versiones son modificaciones de la primera y, vistas desde fuera, se comportan casi igual, así que todas se documentan aquí. Supón que el documento habla del caso del tioéster, pero supón también que lo que dice vale para los demás casos.

Código y demo
=============

El código está en `       rosetta/main/source/src/apps/public/scenarios/chemically_conjugated_docking/      ` ; hay una prueba de integración y demo en `       rosetta/main/tests/integration/tests/UBQ_E2_thioester/      ` . Lo mismo vale para las demás versiones de la aplicación (cambiando la ruta según corresponda). Ten en cuenta que la prueba de integración tiene muchos menos ciclos de los necesarios para conseguir algo útil: el número de ciclos que muestra debería bastar para mostrar algo de remodelado, pero no para llegar a ningún resultado útil. Para ejecutar esa demo, ve a ese directorio y ejecuta `       [path to executeable] -database [path to database] (at-symbol)options      `

Referencias
===========

El código se escribió para este artículo, que trata de la unión de la ubiquitina a una E2. Quizá te convenga consultar la información suplementaria en línea de ese artículo para ver otra presentación de cómo funciona el código.

-   Saha A, Kleiger G, Lewis S, Kuhlman B, Deshaies RJ. Essential role for ubiquitin-ubiquitin-conjugating enzyme interaction in ubiquitin discharge from Cdc34 to substrate. Molecular Cell. 2011 Apr 8;42(1):75-83.

La serie de ejecutables UBQ\_Gp se creó para este artículo, que necesitaba una conexión disulfuro como mimético experimental del enlace isopeptídico nativo de la ubiquitina, y el propio enlace isopeptídico nativo.

-   Baker R, Lewis SM, Sasaki AT, Wilkerson EM, Locasale JW, Cantley LC, Kuhlman B, Dohlman HG, Campbell SL. Site-specific monoubiquitination activates Ras by impeding GTPase-activating protein function. Nat Struct Mol Biol. 2013 Jan;20(1):46-52. doi: 10.1038/nsmb.2430. Epub 2012 Nov 25. PubMed PMID: 23178454; PubMed Central PMCID: PMC3537887.

El código se actualizó más (en particular con el código multiubiquitina escrito para el primer artículo, las generalizaciones escritas para el artículo y el nuevo código multicuerpo) para este artículo:

-   Kamadurai HB, Qiu Y, Deng A, Harrison JS, Macdonald C, Actis M, Rodrigues P, Miller DJ, Souphron J, Lewis SM, Kurinov I, Fujii N, Hammel M, Piper R, Kuhlman B, Schulman BA. Mechanism of ubiquitin ligation and lysine prioritization by a HECT E3. Elife. 2013 Aug 8;2:e00828. doi: 10.7554/eLife.00828. Print 2013. PubMed PMID: 23936628; PubMed Central PMCID: PMC3738095.

Propósito de la aplicación
===========================================

Este código (UBQ\_E2\_thioester) se escribió para una aplicación relativamente singular: modelar el estado unido por tioéster de una enzima E2 cargada con ubiquitina. Teníamos hipótesis sobre cómo podría ser este estado y usamos este código para generar modelos con los que examinar esas hipótesis y generar mutaciones comprobables. Inicialmente se esperaba que sirviera para otros fines. Después de leer la sección anterior, vaya si esa suposición resultó equivocada...

Sobre el código de ese primer proyecto se construyó un segundo experimento, no relacionado. Aquí queríamos examinar cómo se comportaría una proteína G (ras) al conjugarse químicamente con ubiquitina. Las versiones LYX-cterm y CYD-CYD son para imitar las versiones nativa y experimental del enlace. Son ejecutables separados porque las diferencias entre ellos, aunque pequeñas, no se prestan a una modularización y reutilización sencillas del código... en realidad hay que reescribirlo.

Un tercer conjunto de experimentos nos obligó a mejorar el código para que pudiera manejar varios cuerpos «fijos» (es decir, aquello a lo que se une la «ubiquitina» (la cadena móvil) puede ser un complejo multiproteico internamente rígido [salvo que puede tener loops]), así como una segunda ubiquitina que ataca químicamente a la primera en el sitio activo.

Así que... a estas alturas, es un código que tiene una «cosa móvil», unida químicamente por su extremo C-terminal o por un disulfuro terminal a una colección de cosas no móviles, y además puede haber loops que se mueven y una segunda «cosa móvil» que ataca a la primera «cosa móvil».

En TODOS LOS CASOS, el código no requiere el uso de una enzima E2, una GTPasa ni ubiquitina. Usa las proteínas que necesites. Estoy dispuesto a considerar cambios de nombre por otros que reflejen mejor su función.

Algoritmo
=========

Hay dos fragmentos de código novedosos e importantes asociados a este algoritmo.

La estructura unida por tioéster contiene una enzima E2 (tratada como cuerpo rígido) y una molécula de ubiquitina (tratada en su mayor parte como rígida). El extremo C-terminal de la ubiquitina (glicina) está unido químicamente a una cisteína de la E2, lo que da lugar a un enlace tioéster entre las proteínas. Este es el enlace que remodela este protocolo. Phil Bradley merece reconocimiento por ayudar a preparar este código de conjugación química.

El algoritmo de remodelado es sencillo. Usa las herramientas estándar de muestreo aleatorio Metropolis/Monte Carlo de Rosetta. En cada ciclo de Monte Carlo se elige entre una serie de posibles modificaciones del Pose. Estas incluyen la modificación de todas las torsiones cercanas al tioéster, incluidos chi1 y chi2 de la cisteína, el enlace tioéster y los ángulos psi y phi efectivos de la glicina terminal de la ubiquitina. Estas se tratan directamente con TorsionDOFMover en lugar de con los movers de cadena lateral/cadena principal más habituales porque el enlace químico adicional cambia las preferencias torsionales en estos enlaces, lo que significa que las bibliotecas de Ramachandran y de Dunbrack no se aplican. TorsionDOFMover comprueba internamente un término de torsión de enlace de mecánica molecular (aunque este término no está en la función de puntuación general). Otros posibles movimientos de Monte Carlo incluyen los movimientos Small/Shear estándar en los residuos penúltimos de la ubiquitina (el número de residuos móviles se indica con una opción de la línea de comando) y también el modelado de loops con KIC. Tras un movimiento aleatorio, el Pose pasa por Rotamer Trials (para empaquetar rápidamente las cadenas laterales) y por un paso de minimización antes de aplicar el criterio de Metropolis. En una fracción de los ciclos MC se realiza en cambio un reempaquetado completo de la interfaz UBQ/E2.

El código de construcción del tioéster primero reemplaza la cisteína de la E2 por un tipo de residuo CYX, que tiene una conexión de residuo abierta en su átomo de azufre (y no tiene hidrógeno allí). Luego se anexa a este la glicina de la UBQ con un enlace químico, eliminando su tipo de extremo terminal. El resto de la ubiquitina se antepone antes del último residuo, lo que da un orden de residuos normal pero un orden de plegamiento del árbol de átomos invertido (la ubiquitina se pliega desde su extremo C-terminal, en lugar de desde el N-terminal).

El protocolo incluyó en su día maquinaria integrada para generar restricciones basadas en datos experimentales de Saha, Kleiger y Deshaies; ahora se proporcionan en la prueba de integración. (¡Usa -publication para obtener el comportamiento de la publicación original, pero proporciona también esas restricciones!) Lo que queda fijado en el código del sistema original es la geometría inicial del tioéster, basada en el PDB 1FXT, que también es un modelo de un complejo E2/UBQ unido por tioéster.

Al final del protocolo hay maquinaria de filtrado para rechazar automáticamente los modelos sin una interfaz significativa.

Limitaciones
============

Este código no es seguro de usar con salida en silent files. Las contorsiones usadas para construir la unión de la cadena lateral no pueden ser reprocesadas por la entrada y salida de silent files de Rosetta: funciona, pero nunca se pueden volver a leer los archivos. La salida PDB-silent-file *podría* funcionar, pero he comprobado que en general tiene errores, así que no puedo recomendarla.

El código no estaba pensado originalmente para un uso genérico y puede ser frágil en usos nuevos.

Archivos de entrada
===================

Consulta tests/integration/tests/UBQ\_E2\_thioester/ para ver un ejemplo de uso. Básicamente, solo necesitas una estructura de entrada.

-   NO usarás las entradas estándar del distribuidor de trabajos (PDB con -s/-l o silent files). Usa -UBQpdb y -E2pdb (o GTPasepdb) para pasar esas estructuras.
-   Asegúrate de que el código tenga la ruta correcta al tipo de residuo CYX. Estará en tu base de datos de Rosetta; la ruta está en la prueba de integración o demo. %(database)s/chemical/residue\_type\_sets/fa\_standard/residue\_types/sidechain\_conjugation/CYX.params es su ubicación actual. (NOTA: probablemente cambiará después de la 3.5, cuando salga Talaris2013).

Consejos
========

-   El código tiene un modo no compatible que permite el modelado de loops con KIC. Estaba pensado para usarse con el loop de la E2 ausente en el PDB 2OB4. El loop era demasiado largo para que KIC lo resolviera con eficacia, así que tomamos otro camino; el código sigue ahí, pero latente si no se pasa un archivo de loops.

Opciones
========

UBQ\_E2\_thioester admite tres tipos de opciones: opciones generales de Rosetta (empaquetado, etc.), opciones genéricas del protocolo como «cuántos ciclos» tomadas de la aplicación AnchoredDesign, y opciones específicas de UBQ\_E2\_thioester.

Opciones de UBQ\_E2\_thioester

-   -UBQpdb - Archivo - PDB de UBQ de entrada; usamos 1UBQ.
-   -E2pdb - Archivo - PDB de E2 de entrada; usamos una versión recortada de 2OB4. Se llama GTPasepdb en la serie UBQ\_Gp.
-   -E2\_residue - Entero - ¿Qué residuo de la E2 es la cisteína activa? El valor predeterminado es 85; correcto para 2OB4. Se llama GPTase\_residue en la serie UBQ\_Gp.
-   -SASAfilter - Real - valor mínimo del filtro de SASA. Se usó el valor predeterminado 1000 en producción.
-   -scorefilter - Real - valor del filtro de puntuación total máxima. Predeterminado 10; se usó 0 en producción.
-   -publication - Booleano - ¿Modo de publicación? En el modo de publicación, el código ejecuta un paso de análisis adicional para encontrar los vecinos de la I44 de la ubiquitina. Se usa para la prueba de integración y por reproducibilidad, pero no tiene ningún otro propósito. El valor predeterminado es false, pero usa true para reproducir. Si lo usas (porque querías probar el «modo de publicación original»), utiliza los valores de filtro y de restricción sugeridos en la demo de la prueba de integración.
-   -n\_tail\_res - Entero - número de residuos móviles de la cola C-terminal de la proteína unida (ubiquitina). El valor predeterminado es 3, que coincide con la publicación original. No estaba presente en el momento de esa publicación.

Opciones introducidas para el tercer artículo anterior. Opciones experimentales de UBQ\_E2\_thioester

-   -two\_ubiquitins - Booleano - Alucinante: usa dos ubiquitinas (ensambladas para un enlace K48) para intentar examinar el estado de transición.
-   -extra\_bodies - FileVector - estructuras adicionales que se añaden antes del modelado. Deben estar en el marco de coordenadas del compañero no móvil. No se moverán durante el modelado. Se detectarán como parte del cuerpo no móvil a efectos de reempaquetado.
-   -UBQ2\_lys - Entero - qué Lys de la segunda UB se conjugará; predeterminado=48. Creo que el código fallará si este residuo es un extremo.
-   -UBQ2\_pdb - Archivo - PDB de la segunda ubiquitina (segunda cadena móvil). Solo está activo si se usa -two\_ubiquitins; inactivo en caso contrario. Opcional; si no se pasa, toma por defecto el valor de -UBQpdb.
-   -dont\_minimize\_omega - Booleano - desactiva la minimización de los ángulos omega cercanos al tioéster en el MoveMap; no estaba presente en las publicaciones originales (Saha; Baker), predeterminado=false

Opciones experimentales de UBQ\_Gp\*

-   -pdz - Booleano - Para el ejecutable UBQ\_Gp\_LYX-Cterm, si -publication ya está activada, cambia al centro de masa de PDZ en lugar del centro de masa de la ubiquitina para los cálculos estadísticos adicionales. No uses esta opción salvo que intentes reproducir ese segundo artículo anterior. predeterminado=false

Opciones de AnchoredDesign (tomadas por simplicidad, sin ninguna otra relación con AnchoredDesign); todas están en el espacio de nombres AnchoredDesign

-   -AnchoredDesign::refine\_temp - real - temperatura de Monte Carlo de la fase de refinamiento (se usó 0.8 en producción)
-   -AnchoredDesign::refine\_cycles - entero sin signo - número de ciclos de la fase de refinamiento (se usó 20000 en producción)
-   -AnchoredDesign::refine\_repack\_cycles - entero sin signo - realiza un reempaquetado/minimización cada N ciclos del modo de refinamiento (se usó 100 en producción)

Opciones generales: se respetan todas las opciones del espacio de nombres packing que carga el PackerTask. Se respetan las opciones del espacio de nombres jd2, aunque no los modos de entrada. Se respeta todo lo de muy bajo nivel, como las rutas de la base de datos.

-   -run::min\_type - cadena - [[Descripción general y conceptos de la minimización|minimization-overview]] - tipo de minimizador. Se usó dfpmin\_armijo\_nonmonotone en producción.
-   -nblist\_autoupdate - booleano - me dicen que esto acelera la minimización
-   -nstruct - entero - número de estructuras que se generan
-   -packing:repack\_only - booleano - como no quieres hacer diseño, deberías pasar esta opción
-   -generic\_job\_name - archivo - etiqueta la salida con un nombre concreto; es útil porque, al no haber entrada normal del distribuidor de trabajos, da nombres extraños a las salidas.
-   -cst\_fa\_weight - peso de las restricciones. Se implementó originalmente como -constraintweight. Se usó 50 en producción.
-   -cst\_fa\_file - ruta del archivo de restricciones. Originalmente estaban fijadas en el código del archivo; ahora se proporcionan como publication.cst en la prueba de integración o demo.
-   -loops:loop\_file - archivo - un archivo de loops estándar de Rosetta; activará el modelado de ese loop con KIC (intercalado al azar con el resto del modelado). Esto es probablemente MUY frágil ante loops mal elegidos (por ejemplo, si los puntos de conjugación química están en un loop), así que ten cuidado.

Posprocesamiento
================

Elige los mejores modelos por puntuación total y mira el grado de cumplimiento de tus restricciones derivadas de datos experimentales para decidir cuál te parece más plausible. Usamos los modelos para predecir con éxito una mutación que rescataba un defecto causado por UBQ I44A.

Términos adicionales en el scorefile
====================================

La mayoría de los términos del scorefile serán los términos habituales de la función de puntuación. Si ejecutaste con opciones relativamente predeterminadas, será score12; puedes cambiarlo con -weights. A continuación se describen brevemente los términos restantes. No contribuyen a total\_score, pero pueden ser útiles para filtrar o posprocesar. Algunos términos vienen de InterfaceAnalyzer y no son relevantes o aplicables.

-   amide\_CE-NZ-C-CA - torsión de ese enlace, en grados
-   complex\_normalized - puntuación total / número de residuos
-   dG\_cross - energía de unión por el método de términos que cruzan la interfaz
-   dG\_cross/dSASAx100 - energía de unión por el método de términos que cruzan la interfaz, normalizada por la SASA
-   dG\_separated - energía de unión por el método de separación, más preciso
-   dG\_separated/dSASAx100 - energía de unión por el método de separación, más preciso, normalizada por la sasa
-   dSASA\_hphobic - ¿SASA de los residuos hidrofóbicos?
-   dSASA\_int - SASA de la interfaz
-   dSASA\_polar - SASA de los residuos polares
-   delta\_unsatHbonds - número de enlaces de hidrógeno no satisfechos en la interfaz que se satisfarían si las proteínas no estuvieran unidas
-   glycine\_phi\_C-CA-N-C - torsión de ese enlace, en grados
-   glycine\_psi\_NZ-C-CA-N - torsión de ese enlace, en grados
-   hbond\_E\_fraction - fracción de la energía de la interfaz debida a los términos de enlaces de hidrógeno (inútil)
-   lysine\_chi3\_CG-CD-CE-NZ - torsión de ese enlace, en grados
-   lysine\_chi4\_CD-CE-NZ-C - torsión de ese enlace, en grados
-   nres\_all - \# de residuos
-   nres\_int - \# de residuos de la interfaz
-   packstat - puntuación packstat (desactivada)
-   per\_residue\_energy\_int - ¿puntuación total / número de residuos de la interfaz?
-   sc\_value - sc es una puntuación de complementariedad de forma de la que no sé nada
-   side1\_normalized - puntuación de un lado de la interfaz, normalizada por el \# de residuos de ese lado
-   side1\_score - puntuación de un lado de la interfaz
-   side2\_normalized - puntuación de un lado de la interfaz, normalizada por el \# de residuos de ese lado
-   side2\_score - puntuación de un lado de la interfaz

Cambios desde la última versión
===============================

Rosetta 3.3 fue la primera versión. En la versión 3.4 se añadió la serie de aplicaciones UBQ\_Gp. En la 3.5, el código de restricciones se extrajo a un archivo de restricciones publication.cst y se modificaron algunos detalles específicos del sistema en el código para que se ejecuten bajo una opción «publication». Con estos cambios, UBQ\_Gp\_CYX-Cterm quedó obsoleta y se eliminó. Se añadieron los modos de dos ubiquitinas, multicuerpo y loops. También en la 3.5, se corrigió un problema con los ángulos omega cercanos al enlace de conjugación. El omega más cercano al enlace ahora empieza en 180 grados en lugar de 140.

##Véase también

* [[Docking Applications]]: página principal de las aplicaciones de docking
* [[Preparing structures]]: notas sobre la preparación de estructuras para usarlas en Rosetta
* [[Application Documentation]]: lista de aplicaciones de Rosetta
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[RosettaScripts]]: página principal de la interfaz RosettaScripts de Rosetta
* [[Comparing structures]]: ensayo sobre la comparación de estructuras
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Solving a Biological Problem]]: guía para abordar problemas biológicos con Rosetta
* [[Commands collection]]: una lista de líneas de comando de ejemplo para ejecutar los ejecutables de Rosetta

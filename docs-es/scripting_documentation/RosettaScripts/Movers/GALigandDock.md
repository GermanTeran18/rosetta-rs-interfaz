## Descripción general

El mover GALigandDock está pensado para usarse junto con el [[potencial genérico|Updates-beta-genpot]]. Usa un algoritmo genético para muestrear y hacer evolucionar una población de confórmeros del ligando, y aprovecha el precálculo de términos de puntuación en una rejilla para acelerar el docking.

### Mover

El mover de docking se expone a través de la aplicación [[RosettaScripts]], y el formato XML es bastante flexible. 
La etiqueta `<GALigandDock>` define varias opciones asociadas al mover, la mayoría relacionadas con propiedades del cálculo de la rejilla, pero también algunas opciones "globales" del protocolo:

* **scorefxn** - la función de puntuación que se usa en el docking.  ¡_gen_bonded_ debe estar activado con peso 1.0!
* **scorefxn_relax** - la función de puntuación que se usa en la relajación final.  ¡_gen_bonded_ debe estar activado con peso 1.0!
* **runmode** - admite 4 modos de ejecución, cada uno de los cuales llama a parámetros predefinidos para su propio fin:

Un script de ejemplo:
```xml
    <ScoreFunction name="dockscore" weights="beta">
      <Reweight scoretype="fa_rep" weight="0.2"/>
      <Reweight scoretype="coordinate_constraint" weight="0.1"/>
    </ScoreFunction>
    <ScoreFunction name="relaxscore" weights="beta_cart"/>
    <GALigandDock name="dock" runmode="%%runmode%%" scorefxn="dockscore" scorefxn_relax="relaxscore" />

```

A continuación se dan scripts XML de ejemplo que usan el argumento "runmode".

**Self docking**
Self docking, cuando no se espera ningún cambio en la conformación del receptor. Se recomiendan de 1 a 5 repeticiones, cada una de las cuales tarda de 3 a 10 minutos:
```xml
    <GALigandDock name="dock" runmode="dockrigid" scorefxn="dockscore" scorefxn_relax="relaxscore" />
```
**Cross docking**
Cuando se espera un cambio en la conformación del receptor. Se recomiendan de 5 a 10 repeticiones, cada una de las cuales tarda de 15 a 30 minutos:
```xml
    <GALigandDock name="dock" runmode="dockflex" scorefxn="dockscore" scorefxn_relax="relaxscore"/>
```
**Virtual screening de alta precisión** 
Permite flexibilidad del receptor y un cálculo de entropía más riguroso. Por eficiencia se recomienda una sola ejecución. Cada una tarda de 10 a 15 minutos.
```xml
    <GALigandDock name="dock" runmode="VSH" scorefxn="dockscore" scorefxn_relax="relaxscore" nativepdb="holo.pdb"/>
```

**Virtual screening, versión rápida** 
Sin flexibilidad del receptor y con un cálculo de entropía más simple. Por eficiencia se recomienda una sola ejecución. No uses este modo por ahora: está en desarrollo. 
```xml
    <GALigandDock name="dock" runmode="VSX" scorefxn="dockscore" scorefxn_relax="relaxscore" nativepdb="holo.pdb"/>
```

### Opciones más avanzadas:

A continuación se muestra un ejemplo:
```xml    
    <ScoreFunction name="dockscore" weights="beta">
      <Reweight scoretype="fa_rep" weight="0.2"/>
      <Reweight scoretype="coordinate_constraint" weight="0.1"/>
    </ScoreFunction>
    <ScoreFunction name="relaxscore" weights="beta_cart"/>
    <GALigandDock name="dock" scorefxn="dockscore" scorefxn_relax="dock" grid_step="0.25" padding="5.0" hashsize="8.0" subhash="3" nativepdb="holo.pdb" final_exact_minimize="sc" random_oversample="10" rotprob="0.9" rotEcut="100"  sidechains="aniso" initial_pool="holo.pdb" >
        <Stage repeats="100" npool="50" pmut="0.2" smoothing="0.375" rmsdthreshold="2.0" maxiter="50" pack_cycles="100" ramp_schedule="0.1,1.0"/>
    </GALigandDock>
```

#### Parámetros globales del protocolo
Argumentos que se pasan dentro de la línea GALigandDock:

**Configuración de la rejilla**

* **grid_step**, **padding** - al construir una rejilla que cubre el bolsillo de unión, usa este espaciado de rejilla y rellena el área con esta cantidad.  Se recomiendan **0.25** y **5**.
* **hashsize**, **subhash** - parámetros que controlan cómo se gestiona el cálculo de la rejilla.  Con un grid_step de 0.25, **8** y **3**, respectivamente, dan el mejor rendimiento

**Parámetros generales**

* **random_oversample** - sobremuestrea la población inicial por este factor (se recomienda 10)
* **nativepdb** - si se da, el RMS del ligando se informará en la salida
* **multiple_ligands** - separados por comas, da el nombre de los ligandos (que aparece en el archivo params) que se acoplan secuencialmente

**Configuración de la flexibilidad del receptor**

* **sidechains** - estrategia de optimización de cadenas laterales. **none**: solo se acoplan ligandos.  **auto**: selecciona automáticamente todas las cadenas laterales del bolsillo.  **aniso**: lógica de selección automática que tiene en cuenta la forma (no solo el centro de masa) del ligando en la conformación de entrada. **\<residue specifier\>** (p. ej., "22A,25A"): especificación explícita de la flexibilidad de cadenas laterales
* **rotprob**, **rotEcut**: al generar rotámeros para muestrear, usa esta probabilidad acumulada y esta energía de fondo para recortar el conjunto.  Se recomiendan **0.9** y **100**, respectivamente
* **favor_native** - puntuación de bonificación para el rotámero de entrada (solo en la etapa de rejilla); ayuda a preservar el rotámero de cadena lateral de entrada
* **optimize_input_H** - ejecuta optimize_H antes o después del docking.

**Procesamiento final**
* **final_exact_minimize** - opcionalmente, realiza una optimización final fuera de la rejilla.  **none**: no se realiza ninguna optimización. **sc**: solo se realiza la optimización de cadenas laterales.  **bbsc**: se realiza una cart-min de los residuos flexibles.  **bbscN**: cart-min de los residuos flexibles *más N residuos aguas arriba y aguas abajo*
* **cartmin_lig** - ejecuta una cartmin rápida solo del ligando antes y después de final_exact_relax
* **min_neighbor** - también minimiza los vecinos mientras hace cartmin_lig
* **move_water** - permite que las moléculas de agua se muevan durante final_exact_relax
* **fastrelax_script** - da un script de fast relax personalizado por el usuario para el final exact_minimize.
* **estimate_dG** - ejecuta la corrección de entropía al final de la ejecución.

**Docking guiado por referencia**

* **initial_pool** - especifica manualmente un conjunto de estructuras de la primera generación.  Una lista de PDBs _o_ silent files separados por comas.
* **reference_pool** - "input" o el/los nombre(s) pdb del ligando (separados por comas). Asignar "input" invocará la detección de farmacóforos. Asignar pdb(s) de ligandos permitirá ejecutar docking alineado con la referencia.
* **reference_oversample** - fija cuántas veces se muestrea sobre npool*reference_frac.
* **reference_frac** - qué fracción de npool se muestrea de reference_pool.
* **reference_frac_auto** - [Solo para docking con farmacóforos] Fija automáticamente reference_frac según la complejidad del problema. 
* **use_pharmacophore** - Ejecuta docking guiado por farmacóforos. Los argumentos de entrada con reference_pool deben ser compatibles.
Una serie de etiquetas `<Stage>` define el protocolo.  Estas etiquetas, aplicadas en orden, definen el flujo del algoritmo genético.  

####Control por etapa
Argumentos que se pasan con etiquetas "Stage" independientes.
* **repeats**, **npool** - el número de generaciones del AG y el tamaño del conjunto de cada generación.
* **pmut** - probabilidad de mutación (1-pmut da la probabilidad de cruce).  Se recomienda **0.2**.
* **smoothing** - "suaviza" los cálculos de la rejilla en este valor (en A).  Para cross-docking, un valor de 0.375 (con un espaciado de rejilla de 0.25) da resultados notablemente mejores.  Ten en cuenta que esto es distinto de la opción de rampa repulsiva de más abajo.
* **rmsdthreshold** - mantiene la diversidad del conjunto considerando idénticas las estructuras a menos de esta distancia.  Se recomiendan 1.5A.
* **maxiter**, **pack_cycles** - número de pasos de minimización y ciclos del packer en cada generación (**50** y **100** parecen funcionar bien y se ejecutan en un tiempo razonable)
* **ramp_schedule** - el programa de rampa repulsiva de cada generación.  **"0.1,1.0"** parece funcionar bien.

### Entradas y salidas

El archivo de entrada debe ser un pdb con el ligando colocado aproximadamente en el bolsillo que se va a explorar.  El protocolo solo usa el _centro de masa_ y el _radio_ de este ligando. Puedes encontrar más información [[aquí|GALigandDock-Preprocessing]].

Las salidas usan el marco de salida múltiple de RosettaScripts y, por tanto, reconocen cualquier opción de salida de RosettaScripts para controlar la salida.  El mover entrega todo el conjunto (así que una sola entrada tendrá muchas estructuras de salida).

**Posibles problemas delicados**:
* El código idealiza y minimiza inicialmente la geometría de la cadena lateral de todas las cadenas laterales flexibles.  Esto puede causar dos posibles problemas con estructuras que se desvían mucho de la idealidad: 1) las estructuras de "initial_pool" que no están idealizadas se perturbarán ligeramente al principio, cuando se añadan al conjunto.  2) para estructuras de entrada muy poco ideales, esta "corrección" inicial puede producir energías altas en la cadena lateral de entrada.
* El radio del bolsillo se define como el radio del ligando de entrada más el parámetro **padding**.  Hay que tener cuidado al usar ligandos muy pequeños o muy grandes, en particular con la opción de cadenas laterales **"auto"**.  Para ligandos grandes puede ser preferible la opción **"aniso"**.

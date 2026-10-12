#Aplicación de agrupamiento Calibur

Metadatos
========
Desarrollo original de la aplicación e investigadores principales: Yen Kaow Ng (kalngyk@gmail.com) & Shuai Cheng Li (shuaicli@gmail.com)

Port a Rosetta: Yen Kaow Ng, con ayuda de Jared Adolf-Bryfogle (jadolfbr@gmail.com) y Andy Watkins (andy.watkins2@gmail.com)

Documentación y pruebas: Jared Adolf-Bryfogle

Referencia
=========
[Calibur: a tool for clustering large numbers of protein decoys](http://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-11-25)
Shuai Cheng and Yen Kaow Ng
BMC Bioinformatics 2010 11:25
DOI: 10.1186/1471-2105-11-25

Uso
===
Para ejecutar calibur debes proporcionar una lista de PDB con las rutas completas a los decoys, una por línea.
También se entiende la opción in:file:l. 
```
calibur.macosclangrelease -pdb_list decoy_path_list
```

También puedes especificar una lista de cadenas que se usarán (```-chains ABC```), una sola cadena (```-chains A```) o un tramo específico de residuos, como se muestra a continuación
```
calibur.macosclangrelease -pdb_list decoy_path_list -start 10 -end 20 -chains A
```

Calibur entregará entonces cada clúster (del más grande al más pequeño), su decoy central y la lista de decoys que forman ese clúster.  Esta información se puede analizar fácilmente o usar para cargar estructuras en PyMol. 

Algoritmo
=========
Consulta la Referencia para una descripción completa del algoritmo de agrupamiento.

Opciones
=======
```
-input:pdb_list
```
Un archivo que especifica los decoys. Cada línea del archivo especifica una ruta (relativa al directorio de trabajo) al archivo PDB de un decoy (aquí también funciona -in:file:l)


```
-res:start
```
(Opcional) comienza desde el átomo C-alfa de este residuo (en lugar de comenzar desde el primer átomo C-alfa), por defecto = 1
		
```
-res:end
```
(Opcional) termina en el átomo C-alfa de este residuo (en lugar de terminar en el último átomo C-alfa), por defecto = 0

```
-res::chains
```
(Opcional) especifica las cadenas que se usarán. Por defecto se buscan todos los alfanuméricos y la cadena vacía, es decir, 'A', 'C' o ' '
		
```
-strategy::thres_finder
```
(Opcional) especifica la estrategia para encontrar el umbral. Puede que también necesites la opción -nofilter para que algunas de ellas encuentren un clúster (2 y 3). Debe ser uno de 0, 1, 2, 3. (estrategia por defecto: 0) 
			

 -  0: el umbral deja solo un x% de «aristas» entre decoys; por defecto x=100/sqrt(sqrt(#decoys))
			
 -  1: umbral = distancia mínima + x * (distancia más frecuente - distancia mínima); por defecto x=0.666667 (=2/3)
			
 -  2: umbral = distancia mínima + x * min(la distancia promedio de los decoys a un decoy; por defecto x=0.666667 (=2/3)
			
 -  3: encuentra el umbral con el método de ROSETTA (detección automática de parámetros).  Puede que no se forme ningún clúster
		
```
-strategy::nofilter
```
(Opcional) desactiva el filtrado de decoys atípicos.", default=false
 
```
-strategy::thres
```
(Opcional) especifica un número de coma flotante x, que se usa de distinta manera según la estrategia de umbral especificada. x se ignora si la estrategia no lo usa. x se usa como umbral si no se especifica ninguna estrategia de umbral.", default = -1.0);

Limitaciones
===========
 - Por ahora la aplicación solo funciona con residuos de proteína a través de sus átomos C alfa, así que los ligandos y los carbohidratos no funcionan.  Pueden estar en el archivo PDB y simplemente se omitirán.

 - El formato de archivo PDB admitido es (.pdb); no se admiten silent files, mmCIF ni PDB comprimidos con gzip.  Esperamos incorporar esta funcionalidad, pero por ahora tendrás que crear archivos pdb a partir de los silent files que tengas.


## Véase también
* [[La aplicación energy_based_clustering | energy_based_clustering_application]].
* [[Aplicaciones de utilidad | utilities-applications]]: otras aplicaciones de utilidad
* [[Application Documentation]]: página principal de la documentación de aplicaciones
* [[Running Rosetta with options]]: instrucciones para ejecutar los ejecutables de Rosetta.
* [[Analyzing Results]]: consejos para analizar los resultados generados con Rosetta
* [[Preparing structures]]: cómo preparar estructuras para usarlas en Rosetta
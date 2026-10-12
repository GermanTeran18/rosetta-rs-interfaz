# [[ AlignPDBInfoToSequences ]]
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## [[ AlignPDBInfoToSequences ]]

[[include:mover_AlignPDBInfoToSequences_type]]

Propósito:
El objetivo de esta aplicación es poder alinear la secuencia de la Pose (PDBInfo) con secuencias de referencia.
Es especialmente útil al predecir estructuras, es decir:
si estás prediciendo la estructura de los residuos 341-400 con Rosetta, el pdb de salida suele empezar en el residuo 1 y terminar en el residuo 60. Añadir este mover asegura que la numeración del pdb sea correcta al final (es decir, que los residuos se numeren de 341 a 400).

Ejemplo de aplicación:
```
<ROSETTASCRIPTS>
	<MOVERS>
		<AlignPDBInfoToSequences name="apts" mode="multiple" >
			<Target sequence="MKVKIKCWNGVATWLWVANDENCGICRMAFNGCCPDCKVPGDDCPLVWGQCSHCFHMHCILKWLHAQQVQQHCPMCRQEWKFKE" chains="C,D" />\n"
			<Target sequence="LSDYNIQKESTLHLVLRLRGGMQIFVKTLTGKTITLEVEPSDTIENVKA" chains="U,u" />\n"
		</AlignPDBInfoToSequences>
	</MOVERS>
	<PROTOCOLS>
		<Add mover="apts" />
	</PROTOCOLS>
	<OUTPUT />
</ROSETTASCRIPTS>

```
Cada `Target` debe tener definidos `sequence` y `chains`, pero también puede tener definidos `segmentIDs` y/o `insCodes` si quieres definirlos.

Si no quieres usar bloques `Target`, puedes proporcionar uno o más archivos json (separados por comas) con la opción "json_fns".
Los archivos json deben seguir este formato: (lista de diccionarios, con las claves obligatorias `chain`+`sequence` y las claves opcionales `segmentIDs` e `insCodes`)

```
[
	{
		"chains": ["C"],
		"sequence": "MKVKIKCWNGVATWLWVANDENCGICRMAFNGCCPDCKVPGDDCPLVWGQCSHCFHMHCILKWLHAQQVQQHCPMCRQEWKFKE"
	},
	{
		"chains": ["D"],
		"sequence": "MSTLFPSLFPRVTETLWFNLDRPCVEETELQQQEQQHQAWLQSIAEKDNNLVPIGKPASEHYDDEEEEDDEDDEDSEEDSEDDEDMQDMDEMNDYNESPDDGEVNEVDMEGNEQDQDQWMI"
	},
	{
		"chains": ["G", "W"],
		"sequence": "MLRRKPTRLELKLDDIEEFENIRKDLETRKKQKEDVEVVGGSDGEGAIGLSSDPKSREQMINDRIGYKPQPKPNNRSSQFGSLEF"
	},
]

```
## Descripción de las opciones

Como no hay ningún formato estándar que pueda manejar el nivel de control que quiero, he decidido seguir lo siguiente:

en modo 'single':
dado el archivo json (o su bloque `Target` equivalente)
```
[
   {
       "sequence": "SEQ",
       "chains": ["A", "B", "C"],
       "segmentIDs": ["SEQ"]
   },
   {
       "sequence": "HERE",
       "chains": ["D"],
       "segmentIDs": ["HERE"]
   },

]
```
el mover modificará el PDBInfo de una Pose con dos cadenas con las secuencias ["SEQ", "HERE"] de modo que quede así:

la numeración de residuos:
```
[1, 2, 3, 1, 2, 3, 4]
```
cadenas:
```
["A", "B", "C", "D", "D", "D", "D"]
```
segmentIDs:
```
["SEQ", "SEQ", "SEQ", "HERE", "HERE", "HERE", "HERE"]
```

Esto es útil, pero lo normal es tener más de 20 cadenas y que su orden no sea coherente entre experimentos, así que en su lugar sugiero usar el modo 'multiple'.

modo multiple:

dada una Pose con las secuencias ["SEQ", "HERE", "SEQ"]
podrías alinearla con el json (o el bloque `Target` equivalente):

```
[
   {
       "sequence": "SEQ",
       "chains": ["A", "B"],
       "segmentIDs": ["SEQ1", "SEQ2"]
   },
   {
       "sequence": "HERE",
       "chains": ["D"],
       "segmentIDs": ["HERE"]
   },
]
```
y esto dará como resultado:

numeración de residuos:
```
[1, 2, 3, 1, 2, 3, 4, 1, 2, 3]
```
cadenas:
```
["A", "A", "A", "D", "D", "D", "D", "B", "B", "B"]
```
segmentIDs:
```
["SEQ1", "SEQ1", "SEQ1", "HERE", "HERE", "HERE", "HERE", "SEQ2", "SEQ2", "SEQ2"]
```

Es decir, con el modo 'single' tienes más control por 'residuo' pero menos flexibilidad en el orden de la Pose, mientras que en el modo 'multiple' tienes menos control por 'residuo' pero mucha flexibilidad en el orden de la Pose.

Yo mismo uso el formato "multiple" bastante más a menudo.

### Numeración de residuos
```
   {
       "sequence": "HERE",
       "chains": ["D"],
       "segmentIDs": ["HERE"],
       "residue_numbering": [22]
   },
```
Con la configuración anterior, la numeración del pdb resultante sería: `22, 23, 24, 25`
Es decir, al fijar residue_numbering con 1 número puedes establecer el número inicial de la cadena.
Otra cosa que puedes hacer es fijar específicamente la numeración de cada residuo mediante una
lista del mismo tamaño que `sequence`. Por ejemplo:
```
       "residue_numbering": [20, 50, 51, 99]
```
daría una numeración del pdb de `20, 50, 51, 99`

## Advertencias: errores comunes y cuándo no usar este mover

Un gran problema (o característica) de este mover es que las secuencias de las cadenas de la Pose deben coincidir exactamente con las secuencias objetivo. Aunque te falte solo 1 residuo, el SmithWaterman puede fallar y tu Pose no quedará alineada correctamente. ¡Ten mucho cuidado al usar este protocolo a ciegas junto con protocolos posteriores!

 

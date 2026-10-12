#Cómo ignorar residuos

* <code> -ignore_unrecognized_res </code>
 * En general, esto se puede usar si quieres ignorar residuos que Rosetta no puede o no debería cargar (por ejemplo, porque te interesa una región distinta de donde está el ligando, etc.)
<br>
<br>
* <code> -ignore_zero_occupancy false </code>
 * Rosetta ignorará cualquier residuo o átomo que tenga una ocupación de 0.  Normalmente esto significa que el átomo o el residuo no se resolvió lo bastante bien en la estructura.  Para cargar de todos modos estos residuos o átomos en Rosetta (para modelado, diseño, etc.), pasa esta opción.  

##Véase también

* [[Cómo hacer que tu código resista PDB mal formados|robust]]
* [[Guías para entradas que no son proteínas|non-protein-residues]]: notas sobre cómo trabajar con [[aminoácidos no canónicos|Noncanonical Amino Acids]], [[metales|Metals]], [[carbohidratos|Carbohydrates]], _etc._
* [[Opciones en Rosetta|options-overview]]
* [[How to turn on residue types that are off by default]]
* [[Archivos params|Residue Params file]]: notas para añadir nuevos tipos de residuo que no estén ya en la base de datos de Rosetta.

# Cómo trabajar con aminoácidos no canónicos en Rosetta
Referencias incluidas por Vikram K. Mulligan, laboratorio Baker (vmullig@uw.edu) + Jared Adolf-Bryfogle, laboratorio Dunbrack (jpa37@drexel.edu). Creada el 13 de marzo de 2014.
Documentación añadida por Andrew Watkins (XRW3), adaptada en parte de una captura de protocolo de Renfrew et al. (2012).

Resumen
==================
Rosetta puede usar aminoácidos no canónicos en el empaquetado, la minimización y el diseño.
Como los potenciales estadísticos que usa talaris2014 no se han entrenado con los NCAA, en general se emplean en su lugar la función de puntuación mm_std y sus derivadas.
Como usuario, puedes usar software de mecánica cuántica, OpenBabel, el script molfile_to_params_polymer.py y la aplicación MakeRotLib para dejar un nuevo NCAA listo para usar en Rosetta.
La línea ROTAMER_AA del archivo `.params` te permite omitir el paso de MakeRotLib si quieres que tu NCAA relacionado con la tirosina use los rotámeros de la tirosina.
Si usas la línea BACKBONE_AA para asignar de forma análoga un aminoácido canónico relacionado para los términos de puntuación de la cadena principal, puedes usar talaris más o menos sin una energía de referencia para el no canónico, pero este comportamiento no está respaldado.

¿Qué son los aminoácidos no canónicos?
==================

Los aminoácidos no canónicos son, sencillamente, aminoácidos que no están entre los veinte aminoácidos canónicos ni entre sus 19 homólogos D.
Muchos de ellos se siguen encontrando en las proteínas con frecuencia moderada y pueden ser muy eficaces para mejorar las propiedades de plegamiento y unión de proteínas y peptidomiméticos.


Cómo incorporar aminoácidos no canónicos 
==================

Primero, dibuja tu aminoácido acetilado y N-metilamidado en el programa de creación de estructuras que prefieras.
Intenta obtener una estructura físicamente razonable como punto de partida para que el cálculo de QM no falle.
Segundo, usa un programa de mecánica cuántica (la publicación citada usó Gaussian) para optimizar la estructura mencionada al nivel de teoría deseado (Renfrew usó HF/6-31G(d), con las opciones específicas de Gaussian Opt=ModRedundant SCF=Tight Test; OpenBabel puede convertir la estructura del aminoácido en un archivo de entrada de Gaussian).
Tercero, toma la salida y conviértela en un molfile (con OpenBabel y Gaussian: babel -ig09 -omol <output.out > molfile.mol).
Cuarto, añade estas líneas al final del molfile:  

```
M  ROOT \[the number of the N-terminal atom\]  
M  POLY_N_BB \[ditto, unless for some reason the most N terminal atom in your residue type is not N\]  
M  POLY_CA_BB \[the CA atom number\]  
M  POLY_C_BB \[the C atom number\]  
M  POLY_O_BB \[the O atom number\]  
M  POLY_IGNORE \[all the atoms of the capping groups except UPPER and LOWER\]  
M  POLY_UPPER \[the nitrogen atom number of the C-terminal methyl amide\]  
M  POLY_LOWER \[the carbonyl atom number of the N-terminal acetyl\]  
M  POLY_CHG \[the charge\]  
M  POLY_PROPERTIES \[any properties, like PROTEIN and CHARGED, etc.\]  
M  END  
```

Estos números de átomo se pueden obtener fácilmente visualizando la estructura optimizada por QM en pymol y etiquetando por número de átomo. 
Quinto, usa el script de Rosetta molfile_to_params_polymer.py para crear un archivo `.params` y colócalo en la base de datos.

Cómo crear bibliotecas de rotámeros
==================

```
AA_NAME LEU
EPS_RANGE 180 180 1
BB_RANGE -60 -60 1 2
BB_RANGE -40 -40 1 3
OMG_RANGE 180  180 1
NUM_CHI 2
NUM_BB  2
CHI_RANGE 1 0  345  15
CHI_RANGE 2 0  345  15
CENTROID 300 1 300 1
CENTROID 300 1 180 2
CENTROID 300 1  60 3
CENTROID 180 2 300 1
CENTROID 180 2 180 2
CENTROID 180 2  60 3
CENTROID  60 3 300 1
CENTROID  60 3 180 2
CENTROID  60 3  60 3
TEMPERATURE 1
```

Lo anterior es un archivo de opciones que se especifica con:

{Rosetta path}/bin/MakeRotLib.{extension} -options_file LEU.opt

Épsilon y omega son los ángulos omega anterior y posterior, respectivamente.
Para los aminoácidos N-alquilados y los residuos de peptoides, puede ser ventajoso muestrear tanto las conformaciones cis como las trans (y posiblemente más o menos diez grados); en casos particularmente especiales, puede que quieras muestrear todos los valores de omega y crear una biblioteca de rotámeros tridimensional.
El tercer número de cada línea de la cadena principal (1) es el tamaño del paso.
Si los números fueran distintos, el paso debería establecerse en 10 y cada ejecución operaría sobre varios valores de ese ángulo diedro y produciría varios archivos de salida.
El cuarto número presente en las líneas BB_RANGE representa el diedro en cuestión.
El diedro 2 corresponde a phi y el 3 a psi (porque el acetilo antepuesto añade una torsión); se admiten otros números de ángulos de la cadena principal.
Se especifican tanto el número de ángulos chi como el de torsiones de la cadena principal (las que no son de tipo omega).
Los centroides se enumeran para que correspondan a la química del residuo.

En general, son necesarios los siguientes esquemas de centroides:
-	Para un ángulo chi centrado en un enlace sp<sup>3</sup>-sp<sup>3</sup> (por ejemplo, chi2 de la leucina se centra en el enlace CB-CG), hay tres centroides en 300, 180 y 60 (que corresponden a los rotámeros g-, a y g+)
-	Para un ángulo chi centrado en un enlace sp<sup>3</sup>-sp<sup>2</sup> _simétrico_ (por ejemplo, chi2 de la fenilalanina se centra en el enlace CB-CG), hay seis centroides en 330, 300, 270, 240, 210 y 180 grados.
-	Para un ángulo chi centrado en un enlace sp<sup>3</sup>-sp<sup>2</sup> _asimétrico_ (por ejemplo, chi2 de la fenilalanina se centra en el enlace CB-CG), hay seis centroides en 330, 300, 270, 240, 210 y 180 grados.

Se pueden usar líneas ROTWELLS en lugar de la designación CENTROID, donde solo hay que indicar los pozos de rotámeros (rotwells) permitidos para cada chi. El archivo anterior usaría en su lugar:

```
ROTWELLS 1 3  60 180 300
ROTWELLS 2 3  60 180 300
```

Si quieres generar una biblioteca de rotámeros aproximada «de tipo densidad» para aminoácidos semirrotaméricos, añade una línea SEMI_ROTAMERIC al archivo anterior y ejecútalo por separado para crear un archivo con una representación continua del chi terminal no rotamérico.

## Referencias

Drew K, Renfrew PD, Craven TW, Butterfoss GL, Chou F-C, et al. (2013) Adding Diverse Noncanonical Backbones to Rosetta: Enabling Peptidomimetic Design. PLoS ONE 8(7): e67051. doi:10.1371/journal.pone.0067051

Renfrew PD, Choi EJ, Bonneau R, Kuhlman B (2012) Incorporation of Noncanonical Amino Acids into Rosetta and Use in Computational Protein-Peptide Interface Design. PLoS ONE 7(3): e32637. doi:10.1371/journal.pone.0032637


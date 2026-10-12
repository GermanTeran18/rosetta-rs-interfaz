Calcula la probabilidad de Boltzmann de aparición de cada rotámero del Pose dentro del subconjunto de residuos que da el usuario. El método en que se basa este filtro se publica en Fleishman et al. (2011) Protein Sci. 20:753. Este filtro es, en esencia, una extensión del [[RotamerBoltzmannWeightFilter]] original; sus pruebas unitarias comprueban que produce los mismos resultados cuando se ejecuta con opciones similares, y también funciona con simetría. El filtro RotamerBoltzmannWeight original está publicado, así que su uso es (y debería seguir siendo) esencialmente el mismo por motivos de reproducibilidad. Sin embargo, este filtro puede adaptarse a necesidades futuras. Hay tres mejoras fundamentales respecto al filtro RotamerBoltzmannWeight original:

1. En lugar de estar orientado específicamente a interfaces, RotamerBoltzmannWeight2 usa un selector de residuos como único medio para especificar un subconjunto de residuos con los que trabajar, lo que simplifica mucho la lógica interna y es transparente para el usuario.

2. Puede usar varios métodos para calcular la probabilidad de cada rotámero (véase más abajo)

3. Puede informar varios tipos de puntuaciones

4. Opciones simplificadas, con el objetivo de una mayor transparencia para el usuario.

###Cálculo de la puntuación

RotamerBoltzmannWeight2 usa un proceso de dos pasos para calcular una puntuación.  Primero se calculan las probabilidades de los rotámeros de todos los residuos seleccionados con el método especificado en la opción 'probability_type'. Luego esas probabilidades se combinan en un único número con el método especificado en la opción 'score_type'.

Ten en cuenta que este filtro no hace ninguna modificación del Pose antes del cálculo. Si se desean las probabilidades de los rotámeros en el estado 'no unido' (u otros estados modificados), se debe usar [[MoveBeforeFilter]] con RotamerBoltzmannWeight2 como filtro.

###Advertencias

La alanina y la glicina no tienen rotámeros de átomos pesados distintos. Por tanto, la puntuación de probabilidad de ALA y GLY siempre será 1.0. Así que, si usas MAX_PROBABILITY y un subconjunto de residuos que incluye ALA o GLY, la puntuación de todo el subconjunto de residuos será 1.0. Para evitarlo, puedes excluir ALA y GLY en tu selector de residuos como se muestra a continuación:

```xml
<RESIDUE_SELECTORS>
   <ResidueName name="ala_gly" residue_name3="ALA,GLY" />
   <Not name="not_ala_gly" selector="ala_gly" />
   <And name="boltz_subset" selectors="not_ala_gly,your_residue_subset" />
</RESIDUE_SELECTORS>
<FILTERS>
    <RotamerBoltzmann2 name="rot_boltz_skip_ala_gly" residue_selector="boltz_subset" />
</FILTERS>
```

```xml
<RotamerBoltzmannWeight2 name="(&string)"
    residue_selector="('TrueSelector' &string)"
    scorefxn="(talaris2014 &string)"
    probability_type="('ROTAMER_BOLTZMANN' &string)"
    score_type="('MEAN_PROBABILITY' &string)"
    temperature="(0.8 &real)"
    lambda="(0.5 &real)" />
```

**Opciones**

* residue\_selector -- Calcula la probabilidad de los rotámeros de todos los residuos especificados aquí. 

* probability\_type -- El método que se usará para calcular las probabilidades de los rotámeros. Los métodos son los siguientes:

     1. BOLTZMANN_SUM -- Una suma de Boltzmann simple definida por 1/SUM( e^( -(score - score_0)/temp ) ), donde score_0 es la puntuación con el rotámero del Pose de entrada. La puntuación del Pose de entrada se incluye en esta suma, por lo que puede ir de (0, 1].  Todos los rotámeros que no están en el Pose de entrada se consideran, en esencia, igualmente "lejos" de la entrada.

     2. PNEAR -- Probabilidad de estar cerca del estado de entrada, usando una gaussiana para definir la cercanía en el RMSD de átomos pesados de la cadena lateral respecto al estado de entrada, como propuso Vikram Mulligan en el laboratorio Baker. El parámetro lambda define el ancho de la gaussiana.  Con un lambda de 0.5, un rotámero con un RMSD de cadena lateral de 0.5 se puntuará como mitad "cerca" y mitad "lejos" del estado de entrada. PNEAR se define como NUMERADOR/DENOMINADOR, donde NUMERADOR = SUM( e^(-rms^2/lambda^2)*e(-(score - score_0)/temp) ), y DENOMINADOR = SUM( e^( -(score - score_0)/temp ).

* score\_type -- El método que se usa para combinar las probabilidades de los rotámeros en el único número que informa el filtro.  Los tipos de puntuación disponibles son:

    1. MEAN_PROBABILITY -- Devuelve la media de todas las probabilidades calculadas

    2. MAX_PROBABILITY -- Devuelve el máximo de todas las probabilidades calculadas

    3. MODIFIED_DDG -- Devuelve un valor de ddG ponderado por las probabilidades de los rotámeros, como se describe en Fleishman et al. (2011) Protein Sci. 20:753.

* temperature -- La temperatura que se usa para calcular las probabilidades de los rotámeros

* lambda -- El valor "lambda" que se usa para calcular la "cercanía" al estado de entrada durante el cálculo de la probabilidad de los rotámeros. Solo se usa si "PNEAR" es el método de probabilidad.

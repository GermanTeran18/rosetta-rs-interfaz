# Perturbadores de GeneralizedKIC

[[Volver a RosettaScripts|RosettaScripts]]

[[_TOC_]]

## Visión general
Los perturbadores de [[GeneralizedKIC]] alteran de alguna forma la cadena que se va a cerrar antes del cierre cinemático. _Solo_ pueden actuar sobre la cadena que se va a cerrar y no tienen efecto sobre los residuos de cola ni sobre ninguna otra parte de la estructura de entrada. Los perturbadores se aplican en el orden en que se definen. Distintos perturbadores pueden alterar, de forma secuencial, los mismos grados de libertad.

## Uso dentro de RosettaScripts

Ciertos tipos de perturbadores operan sobre residuos y requieren que se especifique una lista de uno o más residuos con tags **AddResidue**. Otros perturbadores operan sobre grados de libertad definidos por conjuntos de átomos y requieren que estos grados de libertad se definan con tags **AddAtoms**, que pueden contener listas de 1, 2, 3 o 4 átomos, según el tipo de grado de libertad. En ambos casos, algunos perturbadores también requieren que se especifiquen uno o más valores con tags **AddValues**. Más abajo se dan los detalles de cada perturbador. Ten en cuenta que existen [[atajos|GeneralizedKICperturber#Shorthands]] para ciertos perturbadores o combinaciones habituales de perturbadores (véase más abajo). Aquí se muestran ejemplos de perturbadores basados en residuos y en átomos:

```xml
<GeneralizedKIC ...>
     ...
     #A residue-based perturber:
     <AddPerturber effect="&string">
          <AddResidue index="(&int)" />
          <AddResidue index="(&int)" />
          <AddResidue index="(&int)" />
          ...
          <AddValue value="(&Real)" />
          <AddValue value="(&Real)" />
          <AddValue value="(&Real)" />
          ...
     </AddPerturber>
     #An atom-based perturber taking four atoms per degree of freedom:
     <AddPerturber effect="&string">
          <AddAtoms res1="(&int)" atom1="&string" res2="(&int)" atom2="&string" res3="(&int)" atom3="&string" res4="(&int)" atom4="&string" />
          <AddAtoms res1="(&int)" atom1="&string" res2="(&int)" atom2="&string" res3="(&int)" atom3="&string" res4="(&int)" atom4="&string" />
          <AddAtoms res1="(&int)" atom1="&string" res2="(&int)" atom2="&string" res3="(&int)" atom3="&string" res4="(&int)" atom4="&string" />
          ...
          <AddValue value="(&Real)" />
          <AddValue value="(&Real)" />
          <AddValue value="(&Real)" />
          ...
     </AddPerturber>
     ...
</GeneralizedKIC>
```

## Tipos de perturbadores
1. Establecer diedro/ángulo de enlace/longitud de enlace (**effect="set_dihedral"**, **effect="set_bondangle"**, **effect="set_bondlength"**)<br/>Estos perturbadores permiten al usuario establecer un ángulo diedro, un ángulo de enlace o una longitud de enlace deseados. El perturbador set_dihedral toma cuatro o dos átomos dentro de cada bloque **AddAtoms**; si se especifican dos átomos, se asumirá que son los dos átomos centrales del conjunto de cuatro que define el ángulo diedro y los otros dos se inferirán. Del mismo modo, el perturbador set_bondangle toma tres o un átomo dentro de cada bloque **AddAtoms**. El perturbador set_bondlength siempre toma dos átomos dentro de cada bloque **AddAtoms**. Para cada grado de libertad especificado con un bloque **AddAtoms**, el usuario puede especificar un valor con **AddValue**. Alternativamente, se puede especificar un único valor para varios grados de libertad, en cuyo caso todos se establecen en el valor especificado.
2.  Aleatorizar diedro (**effect="randomize_dihedral"**)<br/>Este perturbador asigna a cada ángulo diedro especificado un valor aleatorio de distribución uniforme entre -180 grados y 180 grados. Se descarta el valor de la estructura de entrada. Los ángulos diedros se especifican con bloques **AddAtoms** y se definen con dos o cuatro átomos. Este perturbador no toma valores.
3.  Aleatorizar los ángulos diedros de la cadena principal, sesgados por el gráfico de Ramachandran (**effect="randomize_alpha_backbone_by_rama"**)<br/>Este perturbador opera sobre los residuos especificados con bloques **AddResidue**. Aleatoriza los ángulos phi y psi de la cadena principal sesgados por las regiones preferidas de cada residuo dentro del gráfico de Ramachandran. Funciona con alfa-L- y alfa-D-aminoácidos. Al menos uno de los ángulos diedros de la cadena principal debe formar parte de la cadena que se va a cerrar. Opcionalmente, el usuario puede especificar un gráfico de Ramachandran personalizado para el muestreo con la opción **custom_rama_table=\<string\>** dentro del bloque **AddPerturber**. Los gráficos de Ramachandran personalizados admitidos actualmente son: flat_l_aa_ramatable, flat_d_aa_ramatable, flat_symm_dl_aa_ramatable, flat_symm_gly_ramatable, flat_symm_pro_ramatable, flat_l_aa_ramatable_stringent, flat_d_aa_ramatable_stringent, flat_symm_dl_aa_ramatable_stringent, flat_symm_gly_ramatable_stringent y flat_symm_pro_ramatable_stringent.
4.  Aleatorizar los ángulos diedros de la cadena principal, sesgados por los nuevos gráficos de Ramachandran que usa el término de energía `rama_prepro` (**effect="randomize_backbone_by_rama_prepro"**)<br/>Este perturbador opera sobre los residuos especificados con bloques **AddResidue**. Igual que el perturbador **randomize_alpha_backbone_by_rama**, aleatoriza los ángulos de torsión de la cadena principal sesgados por los mapas de Ramachandran de la base de datos. Sin embargo, tiene varias ventajas respecto de **randomize_alpha_backbone_by_rama**. Primero, no se limita a alfa-aminoácidos canónicos, sino que puede trabajar con cualquier tipo de polímero para el que haya mapas de Ramachandran disponibles. Segundo, funciona con tipos de residuo con cualquier número de torsiones rotables de la cadena principal (_es decir_, no se limita a mapas de Ramachandran bidimensionales). Tercero, usa un mapa de Ramachandran distinto en las posiciones que preceden a posiciones N-sustituidas (L-prolina, D-prolina, aminoácidos N-metilados, peptoides, _etc._), lo que captura mejor los efectos estéricos de la N-sustitución del residuo siguiente sobre la conformación.
5.  Perturbar diedro/ángulo de enlace/longitud de enlace (**effect="perturb\_dihedral"**,**effect="perturb\_bondangle"**, **effect="perturb\_bondlength"**)<br/>Estos perturbadores suman un valor pequeño, de distribución gaussiana, a cada valor de diedro, ángulo de enlace o longitud de enlace especificado. Los valores de diedro se especifican con bloques **AddAtoms**, con dos o cuatro átomos listados en cada uno. Los valores de ángulo de enlace se especifican con bloques **AddAtoms**, con uno o tres átomos listados en cada uno. Los valores de longitud de enlace se especifican con bloques **AddAtoms**, con dos átomos listados en cada uno. Se requiere al menos un bloque **AddValue**, cuyo valor especifica la anchura de la gaussiana (en grados en el caso de diedros y ángulos de enlace, o en Angstroms en el caso de longitudes de enlace). Si se especifica más de un bloque **AddValue**, debe listarse uno por cada bloque **AddAtoms**; esto permite tamaños de perturbación distintos para distintos ángulos diedros. A diferencia del perturbador **randomize_dihedral**, este perturbador conserva los valores de diedro, ángulo o longitud de entrada, sumando o restando a cada uno un pequeño valor aleatorio.
6.  Perturbar diedro -- versión gaussiana de la cadena principal (**effect="perturb_dihedral_bbg"**)<br/>Este perturbador usa el mover gaussiano de la cadena principal (backbone Gaussian) para perturbar el loop. Este mover introduce movimientos más grandes de la cadena principal y luego usa una minimización rápida para minimizar la distancia que se mueve el último residuo. Esto da lugar a una gran perturbación en la parte central del loop y a un pequeño hueco que GeneralizedKIC debe cerrar después. Los residuos se especifican con tags **AddResidue**; no se requieren valores.
7.  Muestrear el enlace peptídico _cis_ (**effect="sample_cis_peptide_bond"**)<br/>Este perturbador permite muestrear enlaces peptídicos _cis_ en los residuos listados con tags **AddResidue**, con cierta probabilidad especificada con uno o más tags **AddValue**. Puede ser útil en posiciones que preceden a un residuo de prolina. Ten en cuenta que existe un atajo para este perturbador (véase más abajo).
8.  Aleatorizar torsiones de la cadena principal según las probabilidades de transición entre intervalos de torsión (**effect="randomize_backbone_by_bins"**)<br/>Este perturbador toma un tramo contiguo de cadena principal de un heteropolímero y lo aleatoriza de forma sesgada, según las probabilidades relativas de transición de un intervalo de torsión a otro. Requiere una opción de entrada adicional: un [[archivo de probabilidades de transición entre intervalos|Bin-transition-probabilities-file]] (**bin_params_file="filename.bin_params"**).
9.  Perturbar torsiones de la cadena principal según las probabilidades de transición entre intervalos de torsión (**effect="perturb_backbone_by_bins"**)<br/>Este perturbador toma un tramo contiguo de cadena principal de un heteropolímero y perturba los ángulos de torsión de la cadena principal de un residuo cada vez, de forma sesgada, según los intervalos de torsión de la cadena principal del vecino de ese residuo y las probabilidades relativas de transición de un intervalo de torsión a otro. Este perturbador tiene tres opciones de entrada adicionales: un [[archivo de probabilidades de transición entre intervalos|Bin-transition-probabilities-file]] (**bin_params_file="filename.bin_params"**), un número de iteraciones (**iterations=(1 &int)**) y un interruptor booleano para forzar transiciones a intervalos distintos (**must_switch_bins=(false &bool)**). Si el número de iteraciones es 1, solo se perturbarán las torsiones de la cadena principal de un residuo, elegido al azar de la lista proporcionada. Si es mayor, el algoritmo elige iterativamente un residuo al azar y lo perturba. Si **must_switch_bins** es verdadero, el residuo elegido se fuerza a pasar a un intervalo de torsión distinto; si es falso, tiene cierta probabilidad de permanecer en el mismo intervalo de torsión, en cuyo caso sus valores de torsión de la cadena principal se elegirán al azar (de forma sesgada, si es posible) dentro de ese intervalo.
10.  Elegir al azar torsiones de la cadena principal dentro de un intervalo de torsión de la cadena principal (**effect="set_backbone_bin"**)<br/>Este perturbador toma un intervalo especificado por el usuario y un archivo de probabilidades de transición entre intervalos, y elige al azar torsiones de la cadena principal para los residuos especificados dentro de ese intervalo. El perturbador tiene dos opciones de entrada adicionales: un [[archivo de probabilidades de transición entre intervalos|Bin-transition-probabilities-file]] (**bin_params_file="filename.bin_params"**) y un intervalo (**bin="binname"**), donde el intervalo debe coincidir con uno de los nombrados en el archivo de probabilidades de transición entre intervalos. Ten en cuenta que la selección de ángulos de torsión dentro de un intervalo se basa en la distribución de subintervalos especificada en el archivo de probabilidades de transición entre intervalos; puede ser uniforme o basarse en la distribución de Ramachandran de un alfa-aminoácido. (Consulta la [[documentación del tipo de archivo|Bin-transition-probabilities-file]] para más detalles.)
11.  Copiar los valores de torsión de la cadena principal de otro residuo (**effect="copy_backbone_dihedrals"**)<br/>Este perturbador copiará todos los valores de torsión de la cadena principal de un residuo del loop que se va a cerrar (en cuyo caso, perturbadores anteriores pueden haber alterado los valores diedros de _ese_ residuo) o del resto del Pose al residuo actual del loop. Los perturbadores posteriores pueden alterar luego las torsiones de este residuo. Es útil para el muestreo cuasisimétrico. Este perturbador toma una lista de índices de residuo, donde el primer residuo es aquel del que se copiarán los valores de torsión y el segundo, el tercero, el cuarto, _etc._ son los residuos a los que se copiarán los valores. Todos los residuos listados deben tener el mismo número de torsiones de la cadena principal.
12.  Reflejar los valores de torsión de la cadena principal de otro residuo (**effect="mirror_backbone_dihedrals"**)<br/>Es igual que el efecto **"copy_backbone_dihedrals"**, pero los valores de torsión de la cadena principal se invertirán en el proceso. Es útil para el muestreo cuasisimétrico con simetría especular. Igual que el perturbador **"copy_backbone_dihedrals"**, este toma una lista de residuos, donde las torsiones del primero se reflejan y los valores invertidos se usan para establecer las torsiones del segundo, el tercero, el cuarto, _etc._

## Atajos

Ciertos perturbadores o combinaciones de perturbadores tienen atajos convenientes. Por ejemplo, una operación común es establecer una longitud de enlace y dos ángulos de enlace adyacentes para cerrar un enlace abierto. Los atajos definidos actualmente incluyen:

1.  **CloseBond**<br/>Combina dos perturbadores **set_bondangle** y uno **set_bondlength**, así como un par opcional de perturbadores **randomize_dihedral** para los ángulos diedros adyacentes. Un perturbador **set_torsion** también establece el ángulo de torsión de la conexión según el valor **torsion** especificado por el usuario; si no se especifica, se sustituye por un perturbador **randomize_torsion**. Las opciones **prioratom**, **prioratom_res**, **followingatom** y **followingatom_res** solo deben especificarse si **randomize_flanking_torsions** es **true**.
```xml
<GeneralizedKIC ...>
     ...
     <CloseBond prioratom=&string" prioratom_res="(&int)" atom1="&string" res1="(&int)" atom2="&string" res2="(&int)" followingatom="&string" followingatom_res="(&int)" bondlength="(&Real)" angle1="(&Real)" angle2="(&Real)" torsion="(&Real)" randomze_flanking_torsions="(false, &bool)" />
     ...
</GeneralizedKIC>
```
2.  **SampleCisPeptideBond**<br/>Es un atajo para el perturbador **sample_cis_peptide_bond**.
```xml
<GeneralizedKIC ...>
     ...
     <SampleCisPeptideBond cis_prob="(&Real)">
          <AddResidue index="(&int)" />
          <AddResidue index="(&int)" />
          <AddResidue index="(&int)" />
          ...
     </SampleCisPeptideBond>
     ...
</GeneralizedKIC>
```

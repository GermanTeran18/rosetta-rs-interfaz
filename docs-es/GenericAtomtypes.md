### Motivación
* Un conjunto de tipos de átomo que cubra la mayor parte de la química que nos interesa

El conjunto estándar de tipos de átomo (llamado "fa_standard") se derivó originalmente solo de proteínas y luego se amplió cada vez que hubo una necesidad fuerte de incorporar química de ciertos tipos de átomo que faltaban por completo. En lugar de este enfoque adaptativo, pensamos que valía la pena construir de forma sistemática un conjunto nuevo que cubra la mayor parte de la química necesaria en una amplia gama de estudios de modelado biomolecular.

* Para atender características específicas de la energía de Rosetta

Además, en lugar de copiar los parámetros genéricos de campos de fuerza de mecánica molecular existentes, buscamos nuestras propias definiciones de tipos de átomo, que consideramos que deberían ser óptimas para el modelado y la puntuación de Rosetta. La función de energía de Rosetta tiene varias características únicas (en comparación con otros campos de fuerza o funciones de energía) que deben considerarse con cuidado al definir los tipos de átomo; por ejemplo, el tratamiento implícito de los efectos de solvatación por los hidrógenos (n.º 4 más abajo), la dependencia de la orientación en los términos de solvatación y de puentes de hidrógeno, las definiciones explícitas de donadores y aceptores de puentes de hidrógeno, la distinción entre energía intrarresiduo e interresiduo, etcétera. 

Otra ventaja es que, una vez que establecemos un conjunto propio sobre el que tenemos control, podemos optimizarlo continuamente para nuestros propios fines en cualquier momento.

### Reglas básicas para asignar tipos de átomo genéricos
Las reglas se enumeran por prioridad; por ejemplo, la búsqueda del grupo funcional correspondiente siempre precede al estado de hibridación. 

1) Tipo de elemento (actualmente solo admite H, C, N, O, S, P y halógenos)

2) Dado el tipo de elemento, si pertenece a un grupo funcional común (alcohol, amida, etcétera; detalles más abajo)

3) Si no es así, se asigna un tipo general según el estado de hibridación

- en el caso de los carbonos, se subdivide según si están unidos a algún átomo polar (N, O)

- en el caso de los halógenos, se subdivide según si están unidos a un sistema aromático

4) Por último, se dividen los tipos según el número de hidrógenos unidos; esto es específico de Rosetta, ya que el modelo de solvatación trata los hidrógenos de forma implícita

### Lista y definiciones de los tipos de átomo genéricos
A continuación se muestra la lista de tipos de átomo definidos por las reglas anteriores, a marzo de 2018. Ten en cuenta que la lógica aquí todavía debe optimizarse, y que en el futuro se podrá actualizar, añadir, eliminar, fusionar o dividir.

La lista actualizada se encuentra en source/scripts/python/public/generic_potential/Types.py,

y la lógica detallada en source/scripts/python/public/generic_potential/AtomTypeClassifier.py.

-------------------------------------

```html
**Carbon**
CS  : sp3 aliphatic, 0-H [Maps to CH0] 
CS1 : sp3 aliphatic, 1-H [Maps to CH1]
CS2 : sp3 aliphatic, 2-H [Maps to CH2]
CS3 : sp3 aliphatic, 3-H [Maps to CH3]
CD  : sp2 aliphatic, 0-H [No match]
CD1 : sp2 aliphatic, 1-H [No match]
CD2 : sp2 aliphatic, 2-H [No match]
CT  : sp aliphatic (no #H condition) [No match]
CR  : aromatic, 0or1-H [Maps to aroC]
CSp : sp3 aliphatic, (no #H condition) [Maps to CAbb?] 
CDp : sp2 aliphatic, (no #H condition) [Maps to CObb?] 
CRp : aromatic, (no #H condition) [Maps to CR?] 
CTp : sp, attached to polar atom(s) [No match] 
CRb : Aromatic carbon, as an axis of biaryl dihedrals [No match] 

**Nitrogen**
Nam : N at AMonium/AMine, primary, >= 1-H [Maps to Nlys] 
Nam2: N at AMonium/AMine, secondary~tertiary, >= 1-H (w/o H goes to NG3) [No match] 
Nad : N at AmiDe, primary~secondary, >= 1-H [Maps to Nbb or NH2O] 
Nad3: N at AmiDe, 0-H == tertiary OR w/ lonepair #Azo also goes here [Maps to Npro] 
Nin : N at INdole, 1-H [Maps to Ntrp] 
Nim : N at IMine, w/ lone pair and 0-H [Maps to Nhis]
Ngu1: N at GUanidium, 1-H [Maps to NtrR]
Ngu2: N at GUanidium, 2-H [Maps to Narg]
NG3 : Generic sp3 N; 0-H SHOULD BE non-acceptor/donor [No match]
NG2 : Generic sp2 N; 0-H [No match]
NG21: Generic sp2 N; 1-H [No match]
NG22: Generic sp2 N; 2-H [No match]
NG1 : Generic sp N; 0-H [No match]
NGb : Aromatic N, as an axis of biaryl dihedrals [No match]

**Oxygen**
Ohx : O at HydroXyl (== 1-H) (also -O-H at acids) [Maps to OH]
Oet : O at ETher (== 0-H) [Maps to Oet2,3]
Oal : O at ALdehyde (== 0-H) (also at ketone, acetyl, ester, =O at acids) [No match]
Oad : O at AmiDe [Maps to OCbb, ONH2]
Oat : O at carboxylATe (currently =O at phosphates/sulfonates goes to Oal)
Ofu : O at FUran [Maps to Oaro?]
Ont : O at NiTro [No match]
OG2 : Generic sp2 O; 0-H [No match]
OG3 : Generic sp3 O; 0-H [No match]
OG31: Generic sp3 O; 1-H #excpt. cases with 1H attached and not a hydroxyl [No match]

**Hydrogen**
HC  : H attached to aliphatic C [Maps to Hapo]
HR  : H attached to aromatic C [Maps to Haro]
HO  : H attached to O [Maps to Hpol]
HN  : H attached to N [Maps to Hpol]
HS  : H attached to S [Maps to HS]
HG  : H attached to other elements

**Sulfur/Phosphorus**
Sth : S at THiol (== 1-H) [Maps to SH1]
Ssl : S at SuLfide (== 0-H) [Maps to S]
SG2 : Generic sp2 S (for example, thione) [No match]
SG3 : Generic sp3 S [No match]
SG5 : Generic sp5 S (for example, Sulfonate) [No match]
PG3 : Generic sp3 P [Maps to Pbb or Phos?]
PG5 : Generic sp5 P (for example, Phosphate) [Maps to Pha?]

**Halogens**
F   : Aliphatic Fluorine
Cl  : Aliphatic Chlorine
Br  : Aliphatic Bromine
I   : Aliphatic Iodine
FR  : Aromatic Fluorine [No match]
ClR : Aromatic Chlorine [No match]
Br  : Aromatic Bromine [No match]
IR  : Aromatic Iodine [No match]

```

### Agrupación para la asignación de parámetros de torsión
-------------------------------------

```html

TBA

```

### Cómo generar un archivo params
* mol2genparams.py
ubicado en source/scripts/python/public/generic_potential/

python mol2genparams.py [-s mol2file or -l list-of-mol2files]

Puedes encontrar más información sobre mol2genparams.py y el preprocesamiento de las entradas [[aquí|GALigandDock-Preprocessing]]

### Limitaciones
- Actualmente no admite elementos distintos de H, C, N, O, S, P y halógenos; **no podrá generar el archivo params cuando la molécula incluya Si, Be, B o cualquier metal o ion**
- La parte de configuración del FoldTree a veces es inestable; se puede optimizar en el futuro
- Los tipos de átomo de eje biarilo (CRb y NGb) sustituyen a cualquier tipo existente siempre que se detecte un diedro biarilo (potencial) conectado al átomo. A veces esto puede perjudicar la asignación correcta de tipos de torsión a otras torsiones
- Requiere un archivo mol2 (¡y solo mol2!) para generar el archivo params. Se generalizará para admitir más formatos de archivo si es necesario


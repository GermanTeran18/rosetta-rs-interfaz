# CrankshaftFlipMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## CrankshaftFlip Mover

Este mover realiza movimientos de volteo de tipo cigüeñal (crankshaft flip), un movimiento de muestreo de la cadena principal basado en el análisis de simulaciones de MD de peptoides cíclicos, en el que la inversión de un diedro phi es compatible con el posterior cambio de omega entre cis y trans con una perturbación mínima del resto de la cadena principal.

El mover es generalizable, bajo la hipótesis de que pares similares de movimientos grandes y correlacionados de la cadena principal pueden ser útiles para muestrear otros sistemas muy restringidos (por ejemplo, giros beta).

En las simulaciones de polímeros sobre red, los volteos de tipo cigüeñal son movimientos en los que dos monómeros adyacentes de un loop se mueven juntos (http://aip.scitation.org/doi/abs/10.1063/1.431297). En los péptidos, el equivalente son dos átomos de la cadena principal, C_i y N_(i+1), que se mueven mediante rotaciones correlacionadas en psi_i y phi_(i+1). Este movimiento se ha observado en varios contextos experimentales, incluidas estructuras cristalinas de loops de anticuerpos (http://doi.org/10.1016/j.jmb.2010.10.030) y simulaciones de péptidos cíclicos (https://pubs.acs.org/doi/10.1021/acs.jctc.6b00193). Debería ser útil en el modelado de loops. Nos interesa usar un caso más general para modelar macrociclos con cadenas principales no canónicas. Puedes leer más en nuestro artículo: git https://pubs.acs.org/doi/full/10.1021/acs.jpcb.2c01669

Este mover está diseñado para ser general y compatible con homopolímeros y heteropolímeros de los siguientes tipos: péptidos (no Gly ni Pro), peptoides, glicina, prolina y aminoácidos N-metilados. Las perturbaciones permitidas para las distintas combinaciones en las posiciones i e i+1 y las conformaciones compatibles se describen en la tabla siguiente.


| residuo i    | residuo i+1            | Acción                                                                               | Apodo     |
|--------------|------------------------|--------------------------------------------------------------------------------------|-----------|
| Peptoid, Gly | Peptoid, Pro, N-Methyl | phi_i negate, psi_i negate, omg_i flip by 180                                        | "Peptoid" |
| Any(?)       | Gly                    | psi_i 0<->(-30,180), phi_i+1 180<->(-90,+-60)                                        | "Pre-Gly" |
| Peptide      | Peptide (not P)        | if psi_i/phi_i+1 near -120/-60 or 120/60: psi_i negate, omg_i negate, phi_i+1 negate | "Peptide" |

```xml
<CrankshaftFlipMover name="&string"
    residue_selector="('' &string)"
    allow_peptoid_flips="(1 &bool)"
    allow_peptide_flips="(1 &bool)"
    allow_pre_gly_flips="(1 &bool)"
    tolerance="(20.0 &real)"
</CrankshaftFlipMover>
```

- **residue\_selector**: un [[ResidueSelector|ResidueSelectors]] opcional, definido previamente, que especifica el subconjunto de residuos al que se aplicará el mover. Si no se proporciona, el mover se aplica a todo el Pose. Los índices de residuo permitidos se ordenan al azar y el mover se aplica a la primera posición de residuo que cumpla los criterios. 

- **allow_peptoid_flips**: permite volteos de tipo cigüeñal de peptoide
- **allow_peptide_flips**: permite volteos de tipo cigüeñal de péptido
- **allow_pre_gly_flips**: permite volteos de tipo cigüeñal pre-Gly
- **tolerance**: el valor (en grados) en que el ángulo diedro de un residuo dado puede desviarse de los centros de los intervalos descritos arriba y aun así poder voltearse



##Véase también

* [[SmallMover]]
* [[ShearMover]]
* [[SetTemperatureFactorMover]]
* [[SetSecStructEnergiesMover]]
* [[I want to do x]]: guía para elegir un mover

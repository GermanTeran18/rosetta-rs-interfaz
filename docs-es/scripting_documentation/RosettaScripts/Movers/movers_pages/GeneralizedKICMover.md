# Cierre cinemático generalizado (GeneralizedKIC)
*Volver a la página de [[Movers|Movers-RosettaScripts]].*

Documentación creada por Vikram K. Mulligan, laboratorio Baker. Para preguntas, escribe a vmullig@uw.edu. Última actualización: 24 de octubre de 2015.

## Cierre cinemático generalizado (GeneralizedKIC)

El cierre cinemático es un algoritmo analítico, computacionalmente económico, para cerrar loops. Dado un loop con puntos inicial y final definidos y N grados de libertad, es posible muestrear N-6 de estos grados de libertad y resolver los 6 restantes. GeneralizedKIC es una generalización del algoritmo KIC clásico que permite el cierre y el muestreo conformacional de cualquier cadena de átomos conectados covalentemente. Las cadenas que se cierran pueden incluir segmentos de la cadena principal, cadenas laterales unidas covalentemente (_p. ej._ enlaces disulfuro), ligandos, residuos no canónicos, _etc._ GeneralizedKIC se invoca en RosettaScripts de la siguiente manera:
```xml
<GeneralizedKIC name="(string)" closure_attempts="(2000,int)" stop_if_no_solution="(0,int)" stop_when_n_solutions_found="(0,int)" selector="(string)" selector_scorefunction="(string)" selector_kbt="(1.0,Real)" contingent_filter="(string)" correct_polymer_dependent_atoms="(false,bool)">
     #Define loop residues in order:
     <AddResidue res_index="(int)"/>
     <AddResidue res_index="(int)"/>
     <AddResidue res_index="(int)"/>
     ...
     #List tail residues in any order (see documentation for details):
     <AddTailResidue res_index="(int)"/>
     <AddTailResidue res_index="(int)"/>
     <AddTailResidue res_index="(int)"/>
     ...
     #Pivot atoms are flanked by dihedrals that the KIC algorithm will solve for in order to enforce closure:
     <SetPivots res1="(int)" atom1="(string)" res2="(int)" atom2="(string)" res3="(int)" atom3="(string)" />
     #One or more perturbers may be specified to sample loop conformations:
     <AddPerturber effect="(string)">
          ...
     </AddPerturber>
     ...
     #One or more filters may be specified to discard unwanted or bad closure solutions:
     <AddFilter type="(string)">
          ...
     </AddFilter>
     ...
</GeneralizedKIC>
```
Consulta la [[documentación de GeneralizedKIC|GeneralizedKIC]] para ver los detalles sobre las [[opciones de GeneralizedKIC|GeneralizedKIC]] y sobre los [[perturbadores|GeneralizedKICperturber]], [[filtros|GeneralizedKICfilter]] y [[selectores|GeneralizedKICselector]] de GeneralizedKIC, así como ejemplos de uso. _**Nota:** por ahora GeneralizedKIC debe considerarse una función "beta". Es probable que cambien algunos detalles de la implementación._


##Véase también

* [[KicMover]]: limitado a cadenas principales de proteínas
* [[RosettaScriptsLoopModeling]]
* [[Loops file]]: formato de archivo para especificar loops en el modelado de loops
* [[Algoritmos de modelado de loops|loopmodel-algorithms]]
* [[Structure prediction applications]]: lista de aplicaciones de línea de comandos para la predicción de estructuras, incluido el modelado de loops
* [[I want to do x]]: guía para elegir un mover

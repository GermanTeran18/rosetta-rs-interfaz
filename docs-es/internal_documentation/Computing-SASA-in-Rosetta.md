## Metadatos
* Autor original: Jared Adolf-Bryfogle (jadolfbr@gmail.com)
* Documentación escrita o editada por Rebecca Alford, JKLeman (julia.koehler1982@gmail.com)
* Última edición: 5/16/14

## Aplicaciones disponibles
**per_residue_sc_sasa**

Esta aplicación recibe un Pose (opción `-in:file:s`) y calcula las áreas superficiales accesibles al solvente de la cadena lateral, absolutas y relativas. Los valores absolutos están en Angstrom cuadrados y los valores relativos están en porcentaje respecto a la cadena lateral de ese aminoácido en un tripéptido GXG. Los valores de los tripéptidos se toman de [http://www.proteinsandproteomics.org/content/free/tables_1/table08.pdf]. Por ahora la salida de la aplicación va a la salida estándar, así que revisa tu archivo de registro. 

El código de esta aplicación se encuentra en `pilot/apps/jkleman/per_residue_sc_sasa`, con las funciones subyacentes en `core/scoring/sasa/util`.

**línea de comandos:**

`Rosetta/main/source/bin/per_residue_sc_sasa.macosclangrelease -in:file:s infile.pdb`

## Métodos disponibles en el código
**core/scoring/sasa/SasaCalc.hh**

Clase principal para calcular el SASA de todo el Pose. Para calcular, usa `calculate(pose)` y accede a los métodos de la clase para obtener los resultados de SASA totales, por átomo, por residuo, el componente hidrofóbico, etc. Hay setters disponibles para controlar los radios y la inclusión de hidrógenos. 

**core/pose/metrics/simple_metrics/SasaCalculator2.cc**

Uso de SaSaCalc como métrica del Pose. 

**protocols/analysis/InterfaceAnalyzerMover.cc**

Ejemplo de uso del calculador de métricas del Pose. Ten en cuenta que, para usar el calculador de métricas del Pose, tienes que encapsular cada variable como un 'MetricValue'. Este valor se pasa luego por referencia a los calculadores durante el método pose.metric(). 

Para tener control total sobre el cálculo del SASA (es decir, qué átomos y residuos se calculan) puedes usar directamente el método LeGrandSasa (actualmente el único método que usa Rosetta). Pasa un subconjunto de átomos y usa el método calculate. Actualmente SasaCalc llama a LeGrand pasando todo el Pose como ese «subconjunto de átomos». El radio de sonda por defecto es 1.4A, pero se puede cambiar desde la línea de comandos. 

## Uso de los métodos de SASA

### Nuevo
Usar directamente la maquinaria del núcleo puede ser más sencillo en la mayoría de las circunstancias.  

```
core::scoring::sasa::SasaCalcOP sasa_calc = core::scoring::sasa::SasaCalcOP( new core::scoring::sasa::SasaCalc() );

core::Real total_sasa = sasa_calc->calculate(this_pose);
utility::vector1< core::Real > residue_sasa  = sasa_calc->get_residue_sasa();
```

### Alternativa
Un patrón de código alternativo (pero algo más complicado) es usar una instancia del calculador global de métricas del Pose (con Sasa_ como una cadena de texto, que básicamente es el nombre que le darás a la métrica). Los calculadores de métricas del Pose (PMC, como se usan a continuación) son útiles porque cada vez que obtienes un valor, este se actualiza si el Pose ha cambiado:

```
CalculatorFactory::Instance().register_calculator( Sasa_, new core::pose::metrics::simple_calculators::SasaCalculator2);

```

A continuación hay un ejemplo de cómo obtener los datos con el método PMC: 

```
//Complex Pose values.
basic::MetricValue< Real > mv_complex_sasa;
	
basic::MetricValue< vector1< core::Real > > mv_complex_res_sasa;
basic::MetricValue< vector1< core::Real > > mv_complex_res_sasa_sc;
basic::MetricValue< vector1< core::Real > > mv_complex_res_hsasa;
basic::MetricValue< vector1< core::Real > > mv_complex_res_hsasa_sc;
basic::MetricValue< vector1< core::Real > > mv_complex_res_rel_hsasa;
	
complexed_pose.metric(Sasa_, "total_sasa", mv_complex_sasa);
complexed_pose.metric(Sasa_, "residue_sasa", mv_complex_res_sasa);
complexed_pose.metric(Sasa_, "residue_sasa_sc", mv_complex_res_sasa_sc);
complexed_pose.metric(Sasa_, "residue_hsasa", mv_complex_res_hsasa);
complexed_pose.metric(Sasa_, "residue_hsasa_sc", mv_complex_res_hsasa_sc);
complexed_pose.metric(Sasa_, "residue_rel_hsasa", mv_complex_res_rel_hsasa);
	
```



## Opciones del usuario
|**Opción**|**Descripción**|**Tipo**|
|:-------|:--------------|:-------|
|-sasa:method|El método usado para calcular el SASA.  Ojalá se agreguen más en el futuro. Por defecto, el método de LeGrand|String|
|-sasa:include_hydrogens_explicitly|Incluye los hidrógenos de forma explícita en el cálculo.  Los cálculos explícitos e implícitos usan conjuntos de radios distintos.  Estos conjuntos por defecto se pueden controlar desde la línea de comandos.  Históricamente, los cálculos incluían los hidrógenos de forma implícita.  Algunos protocolos pueden sobrescribir este ajuste según sus necesidades.|Boolean|
|-sasa:probe_radius|'Radio de sonda usado por SasaCalc.  Por defecto es el radio del agua, 1.4.  También se usa comúnmente 1.2.'|Real|
|-sasa:include_probe_radius_in_atom_radii|Esto se hace normalmente en el cálculo del SASA y, de hecho, es una de sus características definitorias.  Desactívalo para calcular el área superficial en su lugar.|Boolean|
|-sasa:include_only_C_S_in_hsasa|Incluye solo carbono o azufre en el cálculo del hsasa.  Esto es lo habitual.  Cambia a falso solo si excluyes los átomos polares por carga, o todo se contará como hidrofóbico. Ten en cuenta que los hidrógenos se manejan automáticamente.|Boolean|
|-sasa:exclude_polar_atoms_by_charge_in_hsasa|Los carbonos polares y otros átomos no deberían incluirse en el hSASA hidrofóbico, aunque históricamente sí se incluían.  Establece esto en falso para obtener el hsasa histórico. default = .4|Boolean|
|-sasa:polar_charge_cutoff|Umbral de carga (valor absoluto) que se aplica a los átomos pesados si se excluyen del cálculo del hSASA los átomos hidrofóbicos por carga. El valor por defecto está optimizado para los tipos de átomo de proteínas (con lo que solo se excluyen los carbonos carbonílicos y carboxílicos).  Por defecto solo se excluyen el carbono y el azufre.|Real|
|-sasa:implicit_hydrogen_radii_set|El conjunto de radios que se usa cuando se incluyen los hidrógenos de forma implícita en lugar de explícita. El programa Naccess usa los radios de Chothia 1976.  chothia=naccess. legal = [chothia, naccess] |String|
|-sasa:explicit_hydrogen_radii_set|El conjunto de radios que se usa cuando se incluyen los hidrógenos de forma explícita. El valor por defecto es reduce, que se acordó de forma general en Minicon 2014 y proviene de datos originales de Bondi (1964) y Gavezzotti (1983).  LJ son los radios de Lennard-Jones de Rosetta, que no son exactamente los de Charmm.  Los radios legacy se optimizaron para un término de energía que ya no está en Rosetta (Jerry Tsai et al 2003). legal = [reduce, LJ, legacy] |String|

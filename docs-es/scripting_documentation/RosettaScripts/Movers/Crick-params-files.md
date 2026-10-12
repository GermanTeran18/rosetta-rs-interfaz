# Formato de los archivos Crick params
Página creada por Vikram K. Mulligan (vmulligan@flatironinstitute.org).  Última modificación: 12 de octubre de 2018.
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Archivos Crick params

[[_TOC_]]

### Descripción del tipo de archivo

Los archivos Crick params son archivos ASCII con extensión `.crick_params`.  Definen los parámetros helicoidales menores de hélices de polímeros, como alfa-hélices, hélices 3-10, hélices de poliprolina de tipo I y II, _etc._  Como las hebras son un caso especial de hélice, en el que el giro por residuo es de unos 180 grados, los archivos Crick params también pueden definir los parámetros helicoidales menores de una hebra.  Los parámetros de la hélice menor se usan, junto con los parámetros de la hélice mayor especificados por el usuario, para generar geometría de coiled-coil mediante las ecuaciones de Crick (descritas por primera vez por Francis Crick en 1953; véase Crick F. (1953) "The Fourier transform of a coiled-coil".  _Acta Cryst._ 6:685-689).

### Ubicación

Los archivos Crick params están en la base de datos de Rosetta, en `database/protocol_data/crick_parameters/`.

### Formato del archivo

Un archivo Crick params consiste en una serie de líneas, cada una de las cuales especifica una propiedad global del tipo de hélice o el valor de un parámetro por átomo.  Las entradas permitidas son:

| Entrada | Descripción | Requisitos | Ejemplo |
| ----- | ----------- | -------------- | ------- |
| Comments | Cualquier línea que empiece con un signo de número ("#").  Sirve para dar información que Rosetta ignora, pero que es útil para desarrolladores o usuarios. | Ninguno, siempre que la línea empiece con un signo de número. | `#Crick params file for a beta-amino acid 14-helix` |
| residues_per_repeat | El número de residuos de cada unidad que se repite en la hélice menor.  Si no se especifica, es 1 por defecto. | Entero positivo. | `residues_per_repeat 4` |
| atoms_per_residue | El número de átomos de cada residuo de la unidad que se repite.  Si residues_per_repeat es 1, se deduce automáticamente del número de líneas r1, delta_omega1 y delta_z1.  Si el número de residuos por repetición es mayor que 1, hay que especificarlo. | Si la unidad que se repite tiene más de 1 residuo, hay que incluir una entrada por cada residuo de la unidad que se repite.  Los valores deben ser enteros positivos. | `atoms_per_residue 4` |
| omega1 | El giro por residuo de la hélice menor, en radianes por residuo. | Hay que dar una única entrada por archivo Crick params. | `omega1 1.30252` |
| z1 | El avance por residuo de la hélice menor, en Angstroms por residuo. | Hay que dar una única entrada por archivo Crick params. | `z1 0.98252` |
| r1 | El radio de la hélice menor por átomo (_es decir_, la distancia de un átomo al eje de la hélice menor). | Debe ser positivo.  Se requiere una entrada por cada átomo de la unidad que se repite. | `r1 1.0231515` |
| delta_omega1 | El desplazamiento angular alrededor del eje de la hélice menor para cada átomo, especificado en radianes, relativo al átomo de referencia. | Se requiere una entrada por cada átomo de la unidad que se repite. | `delta_omega1 0.2352525` |
| delta_z1 | El desplazamiento lineal a lo largo del eje de la hélice menor para cada átomo, especificado en Angstroms, relativo al átomo de referencia. | Se requiere una entrada por cada átomo de la unidad que se repite. | `delta_z1 -0.6352431` |

### Véase también

* [[mover MakeBundle|MakeBundleMover]]
* [[mover PerturbBundle|PerturbBundle]]
* [[mover BundleGridSampler|BundleGridSampler]]

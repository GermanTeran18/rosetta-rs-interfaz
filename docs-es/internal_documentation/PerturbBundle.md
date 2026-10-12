# PerturbBundle
Página creada por Vikram K. Mulligan (vmulligan@flatironinstitute.org).  Última modificación: 12 de octubre de 2018.
[[Volver a la página de Movers|Movers-RosettaScripts]]

[[_TOC_]]

## PerturbBundle

Este mover actúa sobre un Pose generado con el mover MakeBundle.  Perturba (<i>es decir</i>, suma un valor aleatorio pequeño a) uno o más parámetros de Crick y luego altera la conformación de la cadena principal para reflejar los parámetros de Crick modificados.  Es útil para búsquedas iterativas de Monte Carlo en el espacio de parámetros de Crick.

```

<PerturbBundle name=(&string) default_perturbation_type=(&string)
     r0_perturbation=(&real) r0_perturbation_type=(&string)
     omega0_perturbation=(&real) omega0_perturbation_type=(&string)
     delta_omega0_perturbation=(&real) delta_omega0_perturbation_type=(&string)
     delta_omega1_perturbation=(&real) delta_omega1_perturbation_type=(&string)
     delta_t_perturbation=(&real) delta_t_perturbation_type=(&string) >
          <Helix helix_index=(&int)
               r0_perturbation=(&real) r0_perturbation_type=(&string) r0_copies_helix=(&int)
               omega0_perturbation=(&real) omega0_perturbation_type=(&string) omega0_copies_helix=(&int)
               delta_omega0_perturbation=(&real) delta_omega0_perturbation_type=(&string) delta_omega0_copies_helix=(&int)
               delta_omega1_perturbation=(&real) delta_omega1_perturbation_type=(&string) delta_omega1_copies_helix=(&int)
               delta_t_perturbation=(&real) delta_t_perturbation_type=(&string) delta_t_copies_helix=(&int) />
</PerturbBundle>

```

Las opciones por defecto para todas las hélices se establecen en la etiqueta <b>PerturbBundle</b>.  Se puede fijar un tipo de perturbación por defecto para todas las perturbaciones con la opción <b>default_perturbation_type</b>; actualmente se aceptan los valores "gaussian" y "uniform".  Estos se pueden sobrescribir parámetro por parámetro con las opciones individuales <b>*_perturbation_type</b>.  Las magnitudes de perturbación por defecto se establecen con las opciones <b>*_perturbation</b>.  Si se omite una opción, ese parámetro de Crick no se perturba.  También se pueden sobrescribir hélice por hélice agregando subetiquetas <b>Helix</b>.  En las subetiquetas, si se omite una opción, ese grado de libertad no se perturba, a menos que se haya fijado una perturbación por defecto para él en la etiqueta principal.  En las subetiquetas, las hélices también se pueden configurar para copiar los grados de libertad de otras hélices.  Los parámetros de Crick que se pueden perturbar son:

<b>r0</b>: el radio mayor de la hélice.<br/>
<b>omega0</b>: el giro de la hélice mayor por residuo.<br/>
<b>delta_omega0</b>: el desplazamiento radial alrededor del eje de la hélice mayor.<br/>
<b>delta_omega1</b>: la rotación de la hélice menor alrededor del eje de la hélice menor.<br/>
<b>delta_t</b>: un valor para desplazar la hélice un cierto número de residuos de aminoácido a lo largo de su dirección de propagación.<br/>

###Véase también
* [[El formato de archivo de parámetros de Crick|Crick-params-files]]
* Mover [[MakeBundle|MakeBundleMover]]
* Mover [[BundleGridSampler]]

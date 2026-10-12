# BundleGridSampler
Página creada por Vikram K. Mulligan (vmulligan@flatironinstitute.org).  Última modificación: 12 de octubre de 2018.
[[Volver a la página de Movers|Movers-RosettaScripts]]

[[_TOC_]]

## BundleGridSampler

### Descripción

Genera un haz helicoidal, muestreando los rangos de parámetros especificados por el usuario y entregando como salida el haz de menor energía encontrado (junto con sus valores de parámetros).  Opcionalmente, este mover también puede escribir archivos PDB de todas las geometrías de haz muestreadas.  Ten en cuenta que, como una hebra es un caso especial de hélice, este mover también se puede usar para muestrear conformaciones de barril beta o estructuras mixtas alfa-beta.

```
<BundleGridSampler name=(&string) symmetry=(0 &int) symmetry_copies=(0 &int) set_dihedrals=(true &bool)
   set_bondlengths=(false &bool) set_bondangles=(false &bool) residue_name=("ALA" &string)
   crick_params_file=("alpha_helix" &string)  helix_length=(0 &int) invert=(false &bool)
   scorefxn=(&string) selection_type=("low"||"high" &string) pre_selection_mover=(&string)
   dump_pdbs=(false &bool) pdb_prefix=("bgs_out" &string) max_samples=(10000 &int)
    r0=(&real) OR ( r0_min=(&real) r0_max=(&real) r0_samples=(&int) )
    omega0=(&real) OR ( omega0_min=(&real) omega0_max=(&real) omega0_samples=(&int) )
    delta_omega0=(&real) OR ( delta_omega0_min=(&real) delta_omega0_max=(&real) delta_omega0_samples=(&int) )
    delta_omega1=(&real) OR ( delta_omega1_min=(&real) delta_omega1_max=(&real) delta_omega1_samples=(&int) )
    delta_t=(&real) OR ( delta_t_min=(&real) delta_t_max=(&real) delta_t_samples=(&int) )
   >
   <Helix set_dihedrals=(true &bool) set_bondlengths=(false &bool) set_bondangles=(false &bool) invert=(false &bool)
     residue_name=("ALA" &string) crick_params_file=("alpha_helix" &string) helix_length=(0 &int)
     r0=(&real) OR (r0_copies_helix=(&int)) OR ( r0_min=(&real) r0_max=(&real) r0_samples=(&int) )
     omega0=(&real) OR (omega0_copies_helix=(&int)) OR ( omega0_min=(&real) omega0_max=(&real) omega0_samples=(&int) )
     delta_omega0=(&real) OR (delta_omega0_copies_helix=(&int)) OR ( delta_omega0_min=(&real) delta_omega0_max=(&real) delta_omega0_samples=(&int) )
     delta_omega1=(&real) OR (delta_omega1_copies_helix=(&int)) OR ( delta_omega1_min=(&real) delta_omega1_max=(&real) delta_omega1_samples=(&int) )
     delta_t=(&real) OR (delta_t_copies_helix=(&int)) OR ( delta_t_min=(&real) delta_t_max=(&real) delta_t_samples=(&int) )
   >
   <Helix ...>
   <Helix ...>
   ...
</BundleGridSampler>
```

Los valores o rangos de parámetros por defecto se establecen en la etiqueta <b>BundleGridSampler</b>, y las sobrescrituras se establecen en las etiquetas <b>Helix</b> individuales.  Consulta [[MakeBundleMover]] para ver las opciones que ambos movers tienen en común.  Entre las opciones adicionales se encuentran:
- <b>[parameter]\_min</b>, <b>[parameter]_max</b>: valores mínimo y máximo de los parámetros para un rango que se va a muestrear.
- <b>[parameter]\_samples</b>: el número de muestras.  Ten en cuenta que el número total de muestras es el producto de todas las muestras individuales, y esto puede crecer muy rápido.
- <b>[parameter]\_copies\_helix</b>: esta opción solo se puede especificar en una subetiqueta <b>Helix</b>.  Indica que un parámetro concreto de esa hélice siempre se fija en el mismo valor que ese parámetro de una hélice definida previamente.  Más abajo hay un ejemplo.
- <b>max\_samples</b>: el número máximo de muestras permitido.  Si el número total de muestras es mayor, el mover lanza un error en el momento de aplicarse.  Esto es una protección para el usuario, para evitar que se intenten trabajos de muestreo en rejilla excesivamente grandes.  El valor por defecto de 10,000 muestras es conservador y se puede aumentar.
- <b>scorefxn</b>: la función de puntuación que se va a usar.  Debe especificarse, ya que este mover selecciona el haz de menor energía generado.
- <b>selection\_type</b>:  aunque por defecto se selecciona el haz de menor energía ("low"), el usuario puede especificar opcionalmente que se seleccione en su lugar el haz de mayor energía ("high").
- <b>pre\_selection\_mover</b>:  si se especifica, este mover se aplicará a cada haz generado antes de la evaluación de la energía.  Esto puede ser útil para el empaquetado de cadenas laterales o la minimización mientras se muestrean las conformaciones de la cadena principal.  Ten en cuenta que esto puede aumentar mucho el tiempo de ejecución.  Ten en cuenta también que, si se usa un mover que altera la conformación de la cadena principal, es posible que la conformación ya no esté dentro del espacio de parámetros de Crick.
- <b>dump\_pdbs</b>: si es verdadero, se escribe un archivo PDB por cada conformación de haz muestreada.  Falso por defecto.
- <b>pdb\_prefix</b>: el prefijo de los nombres de archivo PDB si se están escribiendo archivos PDB.  Los nombres de archivo tendrán el formato [prefix]\_#####.pdb.  Por defecto es "bgs_out".

Ten en cuenta que los rangos de parámetros por defecto se aplican por separado a cada hélice.  Por ejemplo, el siguiente script realizaría 16 muestras (4 para r0 de la hélice 1 y 4 para r0 de la hélice 2):

```
<BundleGridSampler name="bgs1" helix_length=20 scorefxn="sfxn1" r0_min=5.0 r0_max=8.0 r0_samples=4 omega0=0.05 delta_omega0=0 delta_omega1=0 delta_t=0>
     <Helix />
     <Helix delta_omega0=3.14 />
</BundleGridSampler>
```

Para muestrear un rango de parámetros manteniendo el mismo valor de un parámetro en dos hélices diferentes, se puede usar la opción <b>[parameter]\_copies\_helix</b> en una etiqueta <b>Helix</b>.  La hélice que se va a copiar debe declararse antes que la hélice que tiene la opción <b>[parameter]\_copies\_helix</b>.  Por ejemplo, el siguiente script realiza 4 muestras, con r0 de ambas hélices variando de 5 a 8 (y siempre igual en ambas hélices):

```
<BundleGridSampler name="bgs1" helix_length=20 scorefxn="sfxn1" r0_min=5.0 r0_max=8.0 r0_samples=4 omega0=0.05 delta_omega0=0 delta_omega1=0 delta_t=0>
     <Helix />
     <Helix delta_omega0=3.14 r0_copies_helix=1/>
</BundleGridSampler>
```

###Véase también
* [[El formato de archivo de parámetros de Crick|Crick-params-files]]
* Mover [[MakeBundle|MakeBundleMover]]
* Mover [[PerturbBundle]]

#LegacyAssemblyConstraintsMover
##Nota: esta página es de LegacySEWING.
**Esta página está obsoleta. Para obtener información sobre la versión actual de SEWING, visita las páginas [[AssemblyMover]] y [[AppendAssemblyMover]].**

##Propósito

El AssemblyConstraintsMover se usa en el diseño de estructuras generadas con SEWING. Aunque los movers de SEWING pueden realizar refinamiento, es más habitual filtrar antes las estructuras de salida y refinar un subconjunto de ellas con un protocolo personalizado. Este mover usa el archivo .rot que generan los movers de SEWING para añadir restricciones que favorecen el tipo (o tipos) de residuo nativo en cada posición. 

##Opciones

* native_rotamers_file: Ruta del archivo .rot generado durante el protocolo SEWING (obligatorio)
* native_bonus: Peso de las restricciones de tipo de residuo (será sustituido por los pesos específicos de cada estructura secundaria).
* helix_native_bonus: Peso de la restricción de tipo de residuo para residuos helicoidales. Por defecto 1.
* loop_native_bonus: Peso de la restricción de tipo de residuo para residuos de loop. Por defecto 1.
* strand_native_bonus: Peso de la restricción de tipo de residuo para residuos de hebra beta. Por defecto 1.

##Subetiquetas

El AssemblyConstraintsMover no admite ninguna subetiqueta. 

##Ejemplo
```xml
<MOVERS>
   <AssemblyConstraintsMover name="ACM" native_rotamers_file="test_0001_from_25.rot" native_bonus="1" />
   <FastRelax name="fastrelax" repeats="1" disable_design="false" scorefxn="talaris_cart" cartesian="1" task_operations="resfile,keep_curr,layerdesign" delete_virtual_residues_after_FastRelax="1"/>
</MOVERS>
<PROTOCOLS>
   <Add mover_name="ACM"/>
   <Add mover="fastrelax"/>
</PROTOCOLS>
```

##Véase también
* [[SEWING]]: La página principal de SEWING
* [[Refinement of SEWING Assemblies]]
* [[Assembly of models]]

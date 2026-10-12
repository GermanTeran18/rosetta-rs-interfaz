# CopyRotamerMover
*Volver a la página de [[Movers|Movers-RosettaScripts]].*<br/>
Mover y documentación creados el 17 de octubre de 2016 por Vikram K. Mulligan, laboratorio Baker (vmullig@uw.edu).

## CopyRotamerMover
### Descripción y ejemplo
Este es un mover muy sencillo que copia la identidad del residuo y/o la conformación de la cadena lateral de un residuo de una Pose (la _plantilla_) a otro (el _destino_).

```xml
<CopyRotamer name="(&string)" template_res_index="(&int)" target_res_index="(&int)" copy_identity="(true &bool)" copy_torsions="(true &bool)" />
```

Por ejemplo, el siguiente script copia tanto la identidad como la conformación de la cadena lateral de la posición 32 a la posición 45:

```xml
<ROSETTASCRIPTS>
	<MOVERS>
		<CopyRotamer name="copy_rot" template_res_index="32" target_res_index="45" />
	</MOVERS>
	<PROTOCOLS>
		<Add mover="copy_rot" />
	</PROTOCOLS>
</ROSETTASCRIPTS>
```

Por ahora, el mover solo puede copiar los grados de libertad de torsión de la cadena lateral. Las cadenas laterales con ángulos y longitudes de enlace no ideales no necesariamente tienen su geometría copiada de forma exacta. Si es necesario, puede añadirse compatibilidad para copiar los grados de libertad de ángulos y longitudes de enlace.

### Opciones
|**Opción** | **¿Entrada obligatoria?** | **Descripción** |
|----|---|---|
| **template_res_index** | SÍ | El índice, en la numeración de Pose de Rosetta, del residuo del que se copiará la cadena lateral. Este residuo no se altera con esta operación. |
| **target_res_index** | SÍ | El índice, en la numeración de Pose de Rosetta, del residuo al que se copiará la cadena lateral. La identidad y/o la conformación de la cadena lateral de este residuo se alteran con esta operación. |
| **copy_identity** | NO (por defecto es true) | ¿Debe copiarse la identidad del residuo plantilla al destino? Por defecto es true. Si es false, solo se copian los valores de torsión de la cadena lateral. Esto puede dar resultados extraños si los residuos plantilla y destino tienen distinto número de ángulos chi en la cadena lateral, o si tienen estructuras de cadena lateral muy diferentes. |
| **copy_torsions** | NO (por defecto es true) | ¿Deben copiarse al destino los valores diedros de la cadena lateral del residuo plantilla? Por defecto es true. |

##Véase también

* [[Mover MutateResidue|MutateResidueMover]]
* [[I want to do x]]: guía para elegir un mover
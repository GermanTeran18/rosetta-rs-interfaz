#DefaultPackerPalette

##Historial de la página

La documentación de `DefaultPackerPalette` fue creada por Vikram K. Mulligan (vmulligan@flatironinstitute.org) el 20 de febrero de 2019.

###Descripción

Una `PackerPalette` básica que permite diseñar con los 20 aminoácidos canónicos.  (Ten en cuenta que, para preservar la compatibilidad con versiones anteriores, esta `PackerPalette` también permite diseñar con todos los tipos de ADN en las posiciones de ADN.)  Esta `PackerPalette` no tiene opciones configurables por el usuario.  Como Rosetta crea automáticamente una `DefaultPackerPalette` por defecto cuando el usuario no especifica una `PackerPalette` explícita, rara vez es necesario incluir una `DefaultPackerPalette` de forma explícita en un script.  (La única situación en la que podría darse es si la `PackerPalette` por defecto se hubiera anulado por línea de comandos con la opción `-packer_palette:extra_base_type_file` y un paso de diseño concreto debiera excluir los tipos base adicionales.)

Para diseñar con tipos de residuo adicionales, consulta [[`CustomBaseTypePackerPalette`|CustomBaseTypePackerPalette]].

##Detalles de RosettaScripts
[[include:packer_palette_DefaultPackerPalette_type]]

##Véase también

* [[PackerPalettes|PackerPalette]]
* [[CustomBaseTypePackerPalette]]
* [[NoDesignPackerPalette]]

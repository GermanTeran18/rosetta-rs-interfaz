#NoDesignPackerPalette

##Historial de la página

La documentación de `NoDesignPackerPalette` fue creada por Vikram K. Mulligan (vmulligan@flatironinstitute.org) el 20 de febrero de 2019.

###Descripción

Una `PackerPalette` que permite únicamente el tipo de residuo existente en cada posición.  Esto impide cualquier diseño.

Ten en cuenta que, aunque se puede conseguir el mismo efecto con una [[TaskOperation PreventRepacking|PreventRepackingOperation]] y la [[DefaultPackerPalette]], es ligeramente más eficiente usar una [[NoDesignPackerPalette]].  Por debajo, la primera opción implica crear una lista de los 20 aminoácidos canónicos y luego descartarla, mientras que la segunda solo implica seleccionar el tipo de residuo actual.  Esto solo supone una diferencia en situaciones poco frecuentes en las que la configuración del packer se repite con rapidez.

##Detalles de RosettaScripts
[[include:packer_palette_NoDesignPackerPalette_type]]

##Véase también

* [[PackerPalettes|PackerPalette]]
* [[CustomBaseTypePackerPalette]]
* [[DefaultPackerPalette]]

aplicación revert\_design\_to\_native
----------------------------------

Esta aplicación no es estrictamente parte de RosettaScripts, pero está muy relacionada con los propósitos de diseño de RS.

La aplicación se describió en:

Fleishman et al. Science 332: 816. Este es el extracto relevante:

Para cada diseño que superó los filtros mencionados, se evalúa la contribución de cada sustitución de aminoácido en la interfaz revirtiendo uno a uno los residuos a su identidad de tipo silvestre y probando el efecto de la reversión sobre la energía de unión calculada. Si la diferencia en la energía de unión entre el residuo diseñado y el revertido es menor que 0.5 R.e.u. a favor del diseño, la posición se revierte a su identidad de tipo silvestre. En la versión de Rosetta se incluye una aplicación que calcula estos valores, llamada revert\_design\_to\_native. Se generó un informe con todos los cambios de residuos y cada sugerencia se revisó manualmente.

<code>
Usage: revert\_design\_to\_native -revert\_app:wt \<Native protein PDB\> -revert\_app:design \<Designed PDB\> -ex1 -ex2 -use\_input\_sc -database \<\> \> log
</code>

Conserva el log. Al final encontrarás un resumen de todas las mutaciones probadas y de su relevancia para la energía de unión.

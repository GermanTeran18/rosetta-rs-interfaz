# FlipChirality
Página creada por Parisa Hosseinzadeh (parisah@uw.edu). Última modificación: 16 de junio de 2016.
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## FlipChirality

Refleja (como en un espejo) una Pose o partes seleccionadas de una Pose. Los residuos se reflejan respecto de un plano que el usuario puede definir. Por ejemplo, los L-aminoácidos se cambiarán por sus equivalentes D, lo que significa que los ángulos phi y psi se reflejarán y el nombre cambiará.

```xml
<FlipChirality name="(&string)" residue_selector="(&selector_name)" normalx="(0.0 &real)" normaly="(0.0 &real)" normalz="(0.0 &real)" centerx="(0.0 &real)" centery="(0.0 &real)" centerz="(0.0 &real)"/>
```

Si el usuario proporciona los valores del vector normal (<b>normalx, normaly, normalz</b>) y las coordenadas del centro (<b>centerx, centery, centerz</b>), la Pose se reflejará respecto del plano definido de forma única por ambos. El valor predeterminado del vector normal es (0,0,1) y el punto central predeterminado es el "centro de masa" de la Pose. El usuario puede definir cualquiera de los dos, pero de cada uno deben especificarse los tres componentes. Si no se proporciona ningún residue_selector, se reflejará toda la Pose.

Ejemplo: este script refleja la cadena B de una Pose con la configuración predeterminada:

```xml
<RESIDUE_SELECTORS>
  <Chain name="chainB" chains="2"/>
</RESIDUE_SELECTORS>
<MOVERS>
  <FlipChiralityMover name="mirror" residue_selector="chainB"/>
</MOVERS>
<PROTOCOLS>
   <Add mover="mirror"/> 
</PROTOCOLS>
```

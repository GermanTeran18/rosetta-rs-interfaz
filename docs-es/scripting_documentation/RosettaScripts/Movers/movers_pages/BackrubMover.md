# Backrub
*Volver a la página de [[Movers|Movers-RosettaScripts]].*
## Backrub

Movimientos puramente locales mediante rotaciones alrededor de ejes definidos por dos átomos de la cadena principal.

```xml
<Backrub name="(&string)" pivot_residues="(all residues &string)" pivot_atoms="(CA &string)" min_atoms="(3 &Size)" max_atoms="(34 &Size)" max_angle_disp_4="(40/180*pi &Real)" max_angle_disp_7="(20/180*pi &Real)" max_angle_disp_slope="(-1/3/180*pi &Real)" preserve_detailed_balance="(0 &bool)" require_mm_bend="(1 &bool)"/>
```

-   pivot\_residues: residuos cuyos tramos contiguos pueden contener segmentos (separados por comas); pueden usarse números PDB (\<resnum\>\<chain\>) o números absolutos de Rosetta (entero)
-   pivot\_atoms: átomos de la cadena principal que pueden usarse como pivotes (separados por comas)
-   min\_atoms: tamaño mínimo del segmento de backrub (átomos)
-   max\_atoms: tamaño máximo del segmento de backrub (átomos)
-   max\_angle\_disp\_4: desplazamiento angular máximo para segmentos de 4 átomos (radianes)
-   max\_angle\_disp\_7: desplazamiento angular máximo para segmentos de 7 átomos (radianes)
-   max\_angle\_disp\_slope: pendiente del desplazamiento angular máximo para segmentos de otros tamaños (radianes)
-   preserve\_detailed\_balance: si es true, no cambia los ángulos de los átomos de ramificación durante apply y, si se usa con MetropolisHastings, establece ángulos de ramificación ideales durante la inicialización
-   require\_mm\_bend: si es true y se usa con MetropolisHastings, termina si mm\_bend no está en la función de puntuación
-   movemap\_factory: el nombre de la MoveMapFactory predefinida que se usará para alterar el comportamiento predeterminado del MoveMap. Por defecto, se permite cambiar todos los grados de libertad (DOF) de la cadena principal, de chi y de saltos. Una MoveMapFactory puede usarse para cambiar cuáles de esos DOF están realmente habilitados. Proporcionar una MoveMapFactory permite una asignación dinámica, ya que la fábrica puede tomar residuos de un selector de residuos. Ten cuidado: combinar una MoveMapFactory con un MoveMap puede dar un comportamiento inesperado. El MoveMap proporcionado como subelemento de este elemento se generará y después se aplicarán las modificaciones de DOF especificadas en la MoveMapFactory. Ten en cuenta que, si se definen residuos con la etiqueta pivot_residues, estos prevalecen sobre los residuos definidos tanto por el movemap como por la movemap factory.



##Véase también

* [[BackrubDDMover]]: muestreo de la cadena principal y de las cadenas laterales al estilo backrub
* [[Backrub]]: la aplicación backrub
* [[I want to do x]]: guía para elegir un mover
